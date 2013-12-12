/*
 * jQuery Autocomplete plugin 1.1-ma
 *
 * Copyright (c) 2009 Jšrn Zaefferer
 * Portions written by European Molecular Biology Laboratory
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Based on revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */

(function($) {

    $.fn.extend({
        autocomplete: function(urlOrData, options) {
            var isUrl = typeof urlOrData == "string";
            options = $.extend({}, $.Autocompleter.defaults, {
                url: isUrl ? urlOrData : null,
                data: isUrl ? null : urlOrData,
                delay: isUrl ? $.Autocompleter.defaults.delay : 10,
                max: options && !options.scroll ? 10 : 150
            }, options);

            // if highlight is set to false, replace it with a do-nothing function
            options.highlight = options.highlight || function(value) { return value; };

            // if ontology id is set
            if (options.ontologyId == "all") {
                options.ontologyId = null;
            }

            return this.each(function() {
                new $.Autocompleter(this, options);
            });
        },
        result: function(handler) {
            return this.bind("result", handler);
        },
        search: function(handler) {
            return this.trigger("search", [handler]);
        },
        flushCache: function() {
            return this.trigger("flushCache");
        },
        setOptions: function(options){
            return this.trigger("setOptions", [options]);
        },
        unautocomplete: function() {
            return this.trigger("unautocomplete");
        }
    });

    $.Autocompleter = function(input, options) {

        var KEY = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        };

        // Create $ object for input element
        var $input = $(input).addClass(options.inputClass);

        var timeout;
        var previousValue = "";
        var cache = $.Autocompleter.Cache(options);
        var hasFocus = 0;
        var lastKeyPressCode;
        var config = {
            mouseDownOnSelect: false
        };
        var select = $.Autocompleter.Select(options, input, selectCurrent, config);

        var blockSubmit;

        // prevent form submit in opera when selecting with return key
        $.browser.opera && $(input.form).bind("submit.autocomplete", function() {
            if (blockSubmit) {
                blockSubmit = false;
                return false;
            }
        });

        // only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
        $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
            // a keypress means the input has focus
            // avoids issue where input had focus before the autocomplete was applied
            hasFocus = 1;
            // track last key pressed
            lastKeyPressCode = event.keyCode;
            switch(event.keyCode) {

                case KEY.UP:
                    event.preventDefault();
                    if ( select.visible() ) {
                        select.prev();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.DOWN:
                    event.preventDefault();
                    if ( select.visible() ) {
                        select.next();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.LEFT:
                    if ( select.visible() ) {
                        if (select.collapseTree()) {
                            event.preventDefault();
                        }
                    }
                    break;

                case KEY.RIGHT:
                    if ( select.visible() ) {
                        if (select.expandTree()) {
                            event.preventDefault();
                        }
                    }
                    break;

                case KEY.PAGEUP:
                    event.preventDefault();
                    if ( select.visible() ) {
                        select.pageUp();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.PAGEDOWN:
                    event.preventDefault();
                    if ( select.visible() ) {
                        select.pageDown();
                    } else {
                        onChange(0, true);
                    }
                    break;

                case KEY.TAB:
                case KEY.RETURN:
                    if( selectCurrent() ) {
                        // stop default to prevent a form submit, Opera needs special handling
                        event.preventDefault();
                        blockSubmit = true;
                        return false;
                    }
                    break;

                case KEY.ESC:
                    select.hide();
                    break;

                default:
                    clearTimeout(timeout);
                    timeout = setTimeout(onChange, options.delay);
                    break;
            }
        }).focus(function(){
                // track whether the field has focus, we shouldn't process any
                // results if the field no longer has focus
                hasFocus++;
            }).blur(function() {
                hasFocus = 0;
                if (!config.mouseDownOnSelect) {
                    hideResults();
                }
            }).click(function() {
                // show select when clicking in a focused field
                if ( hasFocus++ > 1 && !select.visible() ) {
                    onChange(0, true);
                }
            }).bind("search", function() {
                // TODO why not just specifying both arguments?
                var fn = (arguments.length > 1) ? arguments[1] : null;
                function findValueCallback(q, data) {
                    var result;
                    if( data && data.length ) {
                        for (var i=0; i < data.length; i++) {
                            if( data[i].result.toLowerCase() == q.toLowerCase() ) {
                                result = data[i];
                                break;
                            }
                        }
                    }
                    if( typeof fn == "function" ) fn(result);
                    else $input.trigger("result", result && [result.data, result.value]);
                }
                $.each(trimWords($input.val()), function(i, value) {
                    request(value, findValueCallback, findValueCallback);
                });
            }).bind("flushCache", function() {
                cache.flush();
            }).bind("setOptions", function() {
                $.extend(options, arguments[1]);
                // if we've updated the data, repopulate
                if ( "data" in arguments[1] )
                    cache.populate();
            }).bind("unautocomplete", function() {
                select.unbind();
                $input.unbind();
                $(input.form).unbind(".autocomplete");
            });

        function debugLog(text) {
            //  if ($.browser.safari) {
            //      window.console.log(text);
            //  }
        }

        function selectCurrent() {
            var selected = select.selected();
            if( !selected )
                return false;

            var v = selected.result;
            previousValue = v;

            var value = $input.val();
            var term = currentTerm(value);
            var newTerm = replaceTermText(term, v);
            var pos = 0;
            var lastPos = 0;
            var cursorPos = $input.caret().start;
            var shouldAppendSuffix = cursorPos == value.length;

            do {
                pos = value.indexOf(term, lastPos);
                if (-1 != pos && pos <= cursorPos && cursorPos <= pos + term.length) {
                    var beforePos = value.substring(0, pos);
                    var afterPos = value.substring(pos).replace(term, newTerm);
                    value = beforePos + afterPos;
                    break;
                }
                lastPos = pos + term.length;

            } while(-1 != pos);

            if (shouldAppendSuffix) {
                value += ("f" == selected.type ? ":" : " ");
            }

            $input.val(value);

            hideResultsNow();
            $input.trigger("result", [selected.data, selected.value]);
            return true;
        }

        function onChange(crap, skipPrevCheck) {
            // not sure why this was included?
            //if( lastKeyPressCode == KEY.DEL ) {
            //	select.hide();
            //	return;
            //}

            var currentValue = $input.val();

            if ( !skipPrevCheck && currentValue == previousValue )
                return;

            previousValue = currentValue;

            debugLog("[onChange] currentValue: [" + currentValue + "]");
            var term = currentTerm(currentValue);
            debugLog("[onChange] term: [" + term + "]");
            var text = getTermText(term);
            debugLog("[onChange] text: [" + text + "]");
            if ( text.length >= options.minChars) {
                $input.addClass(options.loadingClass);
                request(term, receiveData, hideResultsNow);
            } else {
                stopLoading();
                select.hide();
            }
        }

        function trimWords(value) {
            if (!value)
                return [""];
            return $.map(value.split(" "), function(word) {
                return $.trim(value).length ? $.trim(word) : null;
            });
        }

        function getTermModifier(term)
        {
            return matchFirst(term, /^[+-]/);
        }

        function getTermField(term)
        {
            if (-1 != term.indexOf(":")) {
                term = term.replace(/^[+-]/, "");
                return matchFirst(term, /([^:]+)/);
            } else {
                return "";
            }
        }

        function getTermText(term)
        {
            var quotePos = term.indexOf("\"");
            if (-1 != quotePos) {
                return substringBeforeFirst(term.substring(quotePos + 1), "\"");
            } else {
                term = term.replace(/^[+-]/, "");
                term = term.replace(/^\w+:/, "");
                return term;
            }
        }

        function replaceTermText(term, text)
        {
            var field = getTermField(term);

            var isTextMultiWord = -1 != text.indexOf(" ");
            return getTermModifier(term)
                + (field.length > 0 ? field + ":" : "")
                + (isTextMultiWord ? "\"" : "") + text + (isTextMultiWord ? "\"" : "");
        }

        function currentTerm(value, position)
        {
            var cursorPosition = $(input).caret().start;
            var beforeCursor = cursorPosition > 0 ? value.substring(0, cursorPosition) : "";
            var afterCursor = value.substring(cursorPosition);
            debugLog("[currentTerm] beforeCursor: [" + beforeCursor + "]");
            debugLog("[currentTerm] lastTerm(beforeCursor): [" + lastTerm(beforeCursor) + "]");
            debugLog("[currentTerm] afterCursor: [" + afterCursor + "]");
            value = firstTerm(lastTerm(beforeCursor) + afterCursor);

            return value;
        }

        function stripQuotes(text)
        {
            return String(text).replace("\"", "");
        }

        function firstTerm(value)
        {
            debugLog("[firstTerm] value(1): [" + value + "]");
            if (/^[^ ]*\"/.test(value)) { // term is multi-worded
                var openQuotePos = value.indexOf("\"");
                var beforeQuote = value.substring(0, openQuotePos);
                var afterQuote = value.substring(openQuotePos + 1);
                value = beforeQuote
                    + "\""
                    + substringBeforeFirst(afterQuote, "\"")
                    + (-1 != afterQuote.indexOf("\"") ? "\"" : "");
                debugLog("[firstTerm] value(2): [" + value + "]");
            } else {
                value = substringBeforeRegex(value, /AND|OR|NOT|\s\+|\s\-/g).replace(/\s*$/, "");
                debugLog("[firstTerm] value(3): [" + value + "]");
            }
            return value;
        }

        function lastTerm(value)
        {
            debugLog("[lastTerm] value(1): [" + value + "]");
            value = value.replace(/\"$/, "").replace(/\"[^\"]*\"/g, "");
            debugLog("[lastTerm] value(2): [" + value + "]");
            if (-1 != value.indexOf("\"")) {
                value = matchFirst(value, /([^ ]*\".*)$/);
                debugLog("[lastTerm] value(3): [" + value + "]");
            } else {
                value = substringAfterRegex(value, /AND|OR|NOT|\s\+|\s\-/g);
                debugLog("[lastTerm] value(4): [" + value + "]");
            }
            return value;
        }

        function matchFirst(string, regex)
        {
            var matches = string.match(regex);
            if (null != matches && matches.length > 0) {
                return matches[0];
            } else {
                return "";
            }
        }

        function substringBeforeRegex(string, regex)
        {
            var pos = string.search(regex);
            if (-1 == pos) {
                return string;
            } else {
                var matches = string.split(regex);
                return matches[0];
            }
        }

        function substringAfterRegex(string, regex)
        {
            var pos = string.search(regex);
            if (-1 == pos) {
                return string;
            } else {
                var matches = string.split(regex);
                return matches[matches.length - 1];
            }
        }

        function substringBeforeFirst(string, searchstring)
        {
            var pos = string.indexOf(searchstring);
            if (-1 == pos) {
                return string;
            } else {
                return string.substring(0, pos);
            }
        }

        function substringAfterLast(string, searchstring)
        {
            var pos = string.lastIndexOf(searchstring);
            if (-1 == pos) {
                return string;
            } else {
                return string.substring(pos + 1);
            }
        }

        function hideResults() {
            clearTimeout(timeout);
            timeout = setTimeout(hideResultsNow, 200);
        }

        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide();
            clearTimeout(timeout);
            stopLoading();
            if (options.mustMatch) {
                // call search and run callback
                $input.search(
                    function (result) {
                        // if no value found, clear the input box
                        if( !result ) {
                            var words = trimWords($input.val()).slice(0, -1);
                            $input.val( words.join(" ") + (words.length ? " " : "") );
                        }
                    }
                );
            }
        }

        function receiveData(q, data) {
            if ( data && data.length && hasFocus ) {
                stopLoading();
                select.display(data, q);
                select.show();
            } else {
                hideResultsNow();
            }
        }

        function request(term, success, failure) {
            var text = getTermText(term);
            var field = getTermField(term);
            if (!options.matchCase)
                text = text.toLowerCase();
            var data = cache.load(term);
            // recieve the cached data
            if (data && data.length) {
                success(text, data);
                // if an AJAX url has been supplied, try loading the data now
            } else if( (typeof options.url == "string") && (options.url.length > 0) ){

                var extraParams = {
                    timestamp: +new Date()
                };
                $.each(options.extraParams, function(key, param) {
                    extraParams[key] = typeof param == "function" ? param() : param;
                });

                $.ajax({
                    // try to leverage ajaxQueue plugin to abort previous requests
                    mode: "abort",
                    // limit abortion to this input
                    port: "autocomplete" + input.name,
                    dataType: options.dataType,
                    url: options.url,
                    data: $.extend({
                        termname: text,
                        field: field,
                        ontologyname: options.ontologyId,
                        q: "termautocomplete",
                        limit: options.max
                    }, extraParams),
                    success: function(data) {
                        var olsData = parseOlsOutput(data);
                        var parsed = options.parse(olsData);
                        cache.add(text, parsed);
                        success(text, parsed);
                    }
                });
            } else {
                // if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
                select.emptyList();
                failure(text);
            }
        }

        function parseOlsOutput(data) {

            var results = "";
            $(data).find("item").each(function () {
                var term = $(this).find('name').text();
                var id = $(this).find('value').text();
                results += term + "|o|" + id + "\n";
            });
            return results;

        }


        function stopLoading() {
            $input.removeClass(options.loadingClass);
        }
    };

    $.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        cacheLength: 10,
        max: 100,
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        width: 0,
        highlight: function(value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
        },
        parse: function(data) {
            var parsed = [];
            var rows = data.split("\n");
            for (var i=0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                if (row) {
                    row = row.split("|");
                    parsed[parsed.length] = {
                        data: row,
                        value: "f" == row[1] ? row[0] + ":" : row[0],
                        result: row[0],
                        type: row[1],
                        fieldName: "f" == row[1] ? row[2] : null,
                        treeId: "o" == row[1] ? row[2] : null,
                        treeLevel: "o" == row[1] ? 0 : null,
                        treeIsExpanded: false
                    };
                }
            }
            return parsed;
        },
        formatItem: function(data, pos, max, value, term, ontologyId) {
            var result = value;
            if ("f" == data.data[1]) {
                value = value + "<span class=\"ac_field\">Filter " + data.data[2] + "</span>";
            } else if ("o" == data.data[1]) {

                var regex = /([^:]*):(.*)/;
                var res = regex.exec(value);
                var namespace = "ONTOLOGY"
                if (res != undefined) {
                    namespace = res[1];
                }
                if (ontologyId != null) {
                    namespace = ontologyId;
                }
                value = value + "<span class=\"ac_efo\">" + namespace + "</span>";

                if (null != data.treeLevel) {
                    if (data.treeId) {
                        value = "<a href=\"javascript:void(0);\"><div class=\"ac_tree_control\"><div/></div></a>" + value;
                    } else if (0 < data.treeLevel) {
                        value = "<div class=\"ac_tree_level\"/>" + value;
                    }
                    for(var j = 0; j < data.treeLevel; j++) {
                        value = "<div class=\"ac_tree_level\"/>" + value;
                    }
                }
            }
            return value;
        },
        scroll: true,
        scrollHeight: 242 // that is a really magic number, hehe :)
    };

    $.Autocompleter.Cache = function(options) {

        var data = {};
        var length = 0;

        function matchSubset(s, sub) {
            if (!options.matchCase)
                s = s.toLowerCase();
            var i = s.indexOf(sub);
            if (options.matchContains == "word"){
                i = s.toLowerCase().search("\\b" + sub.toLowerCase());
            }
            if (i == -1) return false;
            return i == 0 || options.matchContains;
        }

        function add(q, value) {
            if (length > options.cacheLength) {
                flush();
            }
            if (!data[q]){
                length++;
            }
            data[q] = value;
        }

        function populate() {
            if( !options.data ) return false;
            // track the matches
            var stMatchSets = {},
                nullData = 0;

            // no url was specified, we need to adjust the cache length to make sure it fits the local data store
            if( !options.url ) options.cacheLength = 1;

            // track all options for minChars = 0
            stMatchSets[""] = [];

            // loop through the array and create a lookup structure
            for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
                var rawValue = options.data[i];
                // if rawValue is a string, make an array otherwise just reference the array
                rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;

                var value = options.formatItem(rawValue, i+1, options.data.length);
                if ( value === false )
                    continue;

                var firstChar = value.charAt(0).toLowerCase();
                // if no lookup array for this character exists, look it up now
                if( !stMatchSets[firstChar] )
                    stMatchSets[firstChar] = [];

                // if the match is a string
                var row = {
                    value: value,
                    data: rawValue,
                    result: options.formatResult && options.formatResult(rawValue) || value
                };

                // push the current match into the set list
                stMatchSets[firstChar].push(row);

                // keep track of minChars zero items
                if ( nullData++ < options.max ) {
                    stMatchSets[""].push(row);
                }
            };

            // add the data items to the cache
            $.each(stMatchSets, function(i, value) {
                // increase the cache size
                options.cacheLength++;
                // add to the cache
                add(i, value);
            });
        }

        // populate any existing data
        setTimeout(populate, 25);

        function flush() {
            data = {};
            length = 0;
        }

        return {
            flush: flush,
            add: add,
            populate: populate,
            load: function(q) {
                if (!options.cacheLength || !length)
                    return null;
                /*
                 * if dealing w/local data and matchContains than we must make sure
                 * to loop through all the data collections looking for matches
                 */
                if( !options.url && options.matchContains ){
                    // track all matches
                    var csub = [];
                    // loop through all the data grids for matches
                    for( var k in data ){
                        // don't search through the stMatchSets[""] (minChars: 0) cache
                        // this prevents duplicates
                        if( k.length > 0 ){
                            var c = data[k];
                            $.each(c, function(i, x) {
                                // if we've got a match, add it to the array
                                if (matchSubset(x.value, q)) {
                                    csub.push(x);
                                }
                            });
                        }
                    }
                    return csub;
                } else
                // if the exact item exists, use it
                if (data[q]){
                    return data[q];
                } else
                if (options.matchSubset) {
                    for (var i = q.length - 1; i >= options.minChars; i--) {
                        var c = data[q.substr(0, i)];
                        if (c) {
                            var csub = [];
                            $.each(c, function(i, x) {
                                if (matchSubset(x.value, q)) {
                                    csub[csub.length] = x;
                                }
                            });
                            return csub;
                        }
                    }
                }
                return null;
            }
        };
    };

    $.Autocompleter.Select = function (options, input, select, config) {
        var CLASSES = {
            ACTIVE: "ac_over"
        };

        var listItems,
            active = -1,
            data,
            term = "",
            needsInit = true,
            element,
            list;

        // Create results
        function init() {
            if (!needsInit)
                return;
            element = $("<div class='ac_outer'><div class='ac_inner'></div></div>")
                .hide()
                .addClass(options.resultsClass)
                .css("position", "absolute")
                .appendTo(document.body);

            list = $("<ul/>").appendTo(element.find(".ac_inner")).mouseover( function(event) {
                if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
                    active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
                    $(target(event)).addClass(CLASSES.ACTIVE);
                }
            }).click(function(event) {
                    if (isTreeControlHit(event)) {
                        expandCollapseTree(event);
                        input.focus();
                    } else {
                        $(target(event)).addClass(CLASSES.ACTIVE);
                        select();
                        // TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
                        input.focus();
                    }
                    return false;
                }).mousedown(function() {
                    config.mouseDownOnSelect = true;
                }).mouseup(function() {
                    config.mouseDownOnSelect = false;
                });

            if( options.width > 0 )
                element.css("width", options.width);

            needsInit = false;
        }

        function target(event) {
            var element = event.target;
            while(element && element.tagName != "LI")
                element = element.parentNode;
            // more fun with IE, sometimes event.target is empty, just ignore it then
            if(!element)
                return [];
            return element;
        }

        function isTreeControlHit(event) {
            var element = event.target;
            while(element && element.tagName == "DIV") {
                if ("ac_tree_control" == element.className) {
                    return true;
                } else {
                    element = element.parentNode;
                }
            }
            return (element && element.className == "ac_tree_control");
        }

        function getElementData(element) {
            return element && element.length && $.data(element[0], "ac_data");
        }

        function getElementOntology(element) {
            return $(element).find("span.ac_efo").text();
        }

        function expandCollapseTree(event) {
            var element = target(event);
            if ($(element).hasClass("ac_tree_collapsed")) {
                //expand
                expandSubTree(element);
            } else {
                // collapse
                collapseSubTree(element);
            }
        }

        function collapseSubTree(element) {
            if ($(element).hasClass("ac_tree_expanded")) {
                removeSubTree($(element));
                return true;
            }
            return false;
        }

        function expandSubTree(element) {
            if ($(element).hasClass("ac_tree_collapsed")) {
                requestSubTree($(element), appendSubTree, appendSubTree);
                return true;
            }
            return false;
        }

        function appendSubTree(element, newData) {
            var eltData = getElementData(element);
            var dataInsertPosition = 0;
            for (; dataInsertPosition < data.length; ++dataInsertPosition) {
                if (eltData.treeId == data[dataInsertPosition].treeId) {
                    break;
                }
            }
            if (dataInsertPosition < data.length) {
                for (var i = newData.length - 1; i >= 0; --i) {
                    if (!newData[i])
                        continue;
                    newData[i].treeLevel = eltData.treeLevel + 1;
                    if (dataInsertPosition < data.length - 1) {
                        data.splice(dataInsertPosition + 1, 0, newData[i]);
                    } else {
                        data.push(newData[i]);
                    }
                }
                eltData.treeIsExpanded = true;
                fillList();
                highlightActive();
            }
        }

        function removeSubTree(element) {
            var eltData = getElementData(element);
            var dataRemovePosition = 0;
            for (; dataRemovePosition < data.length; ++dataRemovePosition) {
                if (eltData.treeId == data[dataRemovePosition].treeId) {
                    break;
                }
            }
            if (dataRemovePosition < data.length - 1) {
                for (var i = dataRemovePosition + 1; i < data.length; ) {
                    if (eltData.treeLevel < data[i].treeLevel) {
                        data.splice(i, 1);
                    } else {
                        break;
                    }
                }
                eltData.treeIsExpanded = false;
                fillList();
                highlightActive();
            }
        }

        function highlightActive() {
            if (-1 != active) {
                listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            }
        }

        function requestSubTree(element, success, failure) {
            elt = element;  // TODO: remove this!!!
            var eltData = getElementData(element);
            var ontoId = null;
            if (options.ontologyId == null) {
                ontoId = getElementOntology(element);
            }
            else {
                ontoId = options.ontologyId;
            }


            $.ajax({
                // try to leverage ajaxQueue plugin to abort previous requests
                mode: "abort",
                // limit abortion to this input
                port: "autocomplete" + input.name,
                url: options.requestTreeUrl + "?termId=" + eltData.treeId + "&ontology=" + ontoId,
                dataType: "json",
//                processData: false,
//                data: {
//                    termId: eltData.treeId,
//                    ontology: "EFO"
//                },
                success: function(data, status, response) {
                    var olsData = parseOlsChildData(data);
                    var parsed = options.parse(olsData);
                    success(elt, parsed);
                }
            });
        }

        function parseOlsChildData (data) {

            var results = "";
            if (data.children && data.children.length > 0) {
                for (var i = 0; i < data.children.length; i ++) {
                    var childid = "";
                    if (!data.children[i].isLeaf) {
                        childid =  data.children[i].id;
                    }

                    var prefix = "";
                    if (options.ontologyId == "all") {
                        prefix = data.children[i].ontology + ":";
                    }
                    results += prefix + data.children[i].name + "|o|" + childid + "\n";
                }
            }
            return results;
        }

        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
            movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if(options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function() {
                    offset += this.offsetHeight;
                });
                if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
                } else if(offset < list.scrollTop()) {
                    list.scrollTop(offset);
                }
            }
        }

        function movePosition(step) {
            active += step;
            if (active < 0) {
                active = listItems.size() - 1;
            } else if (active >= listItems.size()) {
                active = 0;
            }
        }

        function limitNumberOfItems(available) {
            return options.max && options.max < available
                ? options.max
                : available;
        }

        // ok, for this first iteration we will abuse internal code in order to process tree items
        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            for (var i=0; i < max; i++) {
                if (!data[i])
                    continue;
                var html = options.highlight(data[i].value, term);
                var formatted = options.formatItem(data[i], i+1, max, html, term, options.ontologyId);
                if ( formatted === false )
                    continue;
                var li = $("<li/>").html(formatted).addClass(i%2 == 0 ? "ac_even" : "ac_odd").addClass(data[i].treeId ? (data[i].treeIsExpanded ? "ac_tree_expanded" : "ac_tree_collapsed") : "").appendTo(list)[0];
                $.data(li, "ac_data", data[i]);
            }
            listItems = list.find("li");
            if ( options.selectFirst ) {
                listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
                active = 0;
            }
            // apply bgiframe if available
            if ( $.fn.bgiframe )
                list.bgiframe();
        }

        function onWinResize() {
            var adjust = $.browser.mozilla ? 2 : 4;
            element.width($(input).width() + adjust);
        }

        return {
            display: function(d, q) {
                init();
                data = d;
                term = q;
                fillList();
            },
            next: function() {
                moveSelect(1);
            },
            prev: function() {
                moveSelect(-1);
            },
            pageUp: function() {
                if (active != 0 && active - 8 < 0) {
                    moveSelect( -active );
                } else {
                    moveSelect(-8);
                }
            },
            pageDown: function() {
                if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
                    moveSelect( listItems.size() - 1 - active );
                } else {
                    moveSelect(8);
                }
            },
            hide: function() {
                //$(window).unbind("resize", onWinResize);

                element && element.hide();
                listItems && listItems.removeClass(CLASSES.ACTIVE);
                active = -1;
            },
            visible : function() {
                return element && element.is(":visible");
            },
            current: function() {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
            },
            collapseTree: function() {
                return collapseSubTree(this.current());
            },
            expandTree: function() {
                return expandSubTree(this.current());
            },
            show: function() {
                var offset = $(input).offset();
                onWinResize();
                element.css({
                    top: offset.top + input.offsetHeight + 2, // that looks much cooler visually
                    left: offset.left
                }).show();
                $(window).bind('resize', onWinResize);
                if (options.scroll) {
                    list.scrollTop(0);
                    list.css({
                        maxHeight: options.scrollHeight,
                        overflow: 'auto'
                    });

                    if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var listHeight = 0;
                        listItems.each(function() {
                            listHeight += this.offsetHeight;
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
                        if (!scrollbarsVisible) {
                            // IE doesn't recalculate width when scrollbar disappears
                            listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
                        }
                    }
                }
            },
            selected: function() {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
                return selected && selected.length && $.data(selected[0], "ac_data");
            },
            emptyList: function (){
                list && list.empty();
            },
            unbind: function() {
                element && element.remove();
            }
        }
    }
})(jQuery);