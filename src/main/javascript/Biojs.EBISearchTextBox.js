/**
 * 
 * This is a component that provides EBISearch capabilities to a page/portal.
 *
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:webprod@ebi.ac.uk">Web Production Team</a>, <a href="mailto:nbuso@ebi.ac.uk">Nicola Buso</a> 
 * @version 0.0.4
 * @category 1
 *
 * @requires <a href='http://code.jquery.com/jquery-1.10.2.js'>jQuery Core 1.10.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.10.2.js"></script>
 *
 * @requires <a href='http://code.jquery.com/jquery-1.4.4.js'>jQuery Core 1.4.4</a> In case of projects depending on older version of JQuery
 * @dependency <script language="JavaScript" type="text/javascript" src="#http://code.jquery.com/jquery-1.4.4.js#"></script>
 *
 * @requires <a href='../biojs/dependencies/jquery/jquery-ui-1.10.4.custom.min.js'>jQuery UI 1.10.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.10.4.custom.min.js"></script>
 *
 * @requires <a href='http://code.jquery.com/ui/1.8.7/jquery-ui.js'>jQuery UI 1.8.7</a> In case of projects depending on older version of JQuery
 * @dependency <script language="JavaScript" type="text/javascript" src="#http://code.jquery.com/ui/1.8.7/jquery-ui.js#"></script>
 *
 * @requires <a href='../biojs/dependencies/jquery/jquery-ui-1.10.4.custom.min.css'>jquery-ui 1.10.4 CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.10.4.custom.min.css" type="text/css">
 *
 * @requires <a href='http://code.jquery.com/ui/1.8.7/themes/smoothness/jquery-ui.css'>jquery-ui 1.8.7 CSS</a> In case of projects depending on older version of JQuery
 * @dependency <link rel="stylesheet" href="#http://code.jquery.com/ui/1.8.7/themes/smoothness/jquery-ui.css#" type="text/css">
 *
 * @requires <a href='../biojs/css/Biojs.EBISearchTextBox.css'>EBISearchTextBox.css</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/Biojs.EBISearchTextBox.css" type="text/css">
 *
 * @requires <a href='../biojs/data/BioJS.EBISearchTextBox.tmpl.html'>BioJS.EBISearchTextBox.tmpl.html</a>
 * @dependency <link rel="template" href="../biojs/data/BioJS.EBISearchTextBox.tmpl.html" type="text/html">
 * 
 * 
 *
 * @param {Object} options An object with the options for the EBISearchTextBox component.
 *
 * @option {string} [targetType="div"] the type of element to start decorate; can be:
 * 	<ul>
 *    <li>'div': a &lt;div/&gt; element where will be added the form to submit the request to EBISearch and the text box decorated with EBISearch capacities</li>
 *    <li>'inputtext': an &lt;input type="text" /&gt; to be deocorated. In this case the user of this component need to create the appropriate form</li>
 *  </ul>
 * @option {string} [target="ebi-searchbox"]
 *    Identifier of the element where the component should be displayed.
 *
 * @option {string} [ebisearch-baseURL="http://www.ebi.ac.uk/ebisearch/"]
 * 	  The EBISearch application URL to be queried via the component.
 *
 * @option {string} [completeCategories=]
 * 	  Colon separated list of categories to use for suggestions
 *
 * @option {string} [completeDomains=]
 * 	  Colon separated list of domains to use for suggestions
 *
 * @example
 *  var instance = new Biojs.EBISearchTextBox({
 *  		targetType: "div",
 *          target: "YourOwnDivId",
 *  });
 *
 *
 */

 /*
 * 	<ul>
 * 		<li><p>0.0.4:</p>
 * 		  	<ul>
 * 				<li>added some validation tests at instantiation time</li>
 * 				<li>added jquery 1.8.x and > 1.8.x code differentiation</li>
 * 				<li>support jQuery $ symbol hidden</li>
 * 		  	</ul>
 * 		</li>
 * 	</ul>
 */

Biojs.EBISearchTextBox = (function($){
var jqueryVer = jQuery.fn.jquery;
Biojs.EBISearchTextBox = Biojs.extend (
    /** @lends Biojs.EBISearchTextBox# */
	{
        constructor: function (options) {
        	//Biojs.console.enable();
            var self = this;

            switch (self.opt.targetType) {
			case "div":
	            this._divbox = jQuery("#" + self.opt.target);
	            
	            // load the form from a template
	            var tmplFile = "../biojs/data/BioJS.EBISearchTextBox.tmpl.html #local-search";
	            if (self.opt.demoPgContent == true) {
	            	tmplFile = "../biojs/data/BioJS.EBISearchTextBox-demo.tmpl.html";
	            }
	            $.get(tmplFile, function( data ) {
					// substitute values
	            	var tmplValued = data.replace("$(baseURL)", self.opt.ebisearchBaseURL);

	            	$(self._divbox).html(tmplValued);
					var textbox = $(self._divbox).find("#local-searchbox");
					self._textbox = textbox;
					self._decorate();
	            })
	            	.fail(function( jqXHR, textStatus, errorThrown ) {
	            		var msg = "Error loading template: status: "+textStatus+" message: "+jqXHR.statusText;
	            		console.log(msg);
						self.raiseEvent(
							"onError",{ "message": msg}
						);
	            		
	            	});

				break;
			case "inputtext":
	            this._textbox = jQuery("#" + self.opt.target);
	            if ($(this._textbox) == undefined && $(this._textbox)[0].tagName != "INPUT") {
					var msg = "Component attached to unsupported DOM element: "+$(this._textbox)[0].tagName+" should be 'input'";
					console.error(msg);
					self.raiseEvent(
							"onError",{ "message": msg}
					);
	            }
	            // do some checks it should be an input text
	            if ($(this._textbox)[0] == undefined || $(this._textbox)[0].tagName != "INPUT") {
	            	var msg = "";
	            	try {
	            		msg = "Component attached to unsupported DOM element: "+$(this._textbox)[0].tagName+" should be 'input'";
	            	} catch (err) {
	            		msg = "Component attached to unsupported DOM element; should be 'input' type 'text";
	            	}
					console.error(msg);
					self.raiseEvent(
							"onError",{ "message": msg}
					);
					break;
	            }
	            var domTypeAttr = $(this._textbox).attr("type");
	            if (domTypeAttr != "text") {
					var msg = "Component attached to unsupported DOM element, wrong attribute 'type': "+domTypeAttr+" should be 'text'";
					console.error(msg);
					self.raiseEvent(
							"onError",{ "message": msg}
					);
	            }
	            $(this._textbox).addClass("ebi-autocomplete-input");
	            this._decorate();
				break;
			default:
				var msg = "The targetType: "+self.opt.targetType+" is not allowed";
				console.error(msg);
				self.raiseEvent(
						"onError",{ "message": msg}
					);
				break;
			}

        },
        _decorate: function() {
        	var self = this;
            // decorate the text input with autocomplete
    		$(this._textbox).catcomplete({
    			position: { my : "right top", at: "right bottom" },
    			select: function(event, ui) {
    				$(this).val(ui.item.value);
    				var form = $(this).parents('form')[0];
    				self.raiseEvent("onSelect", {"term": ui.item.value} );
    				
    				// add a diagnostic parameter to the form
    				$("<input>").attr({
    					type: "hidden",
    					name: "autocomplete",
    					value: "1"
    				}).appendTo($(this).parents('form'));
    				if (self.opt.selectSubmit == true) {
    					form.submit();
    				}
    				return true;
    			},
    			baseSearchURL: self.opt.ebisearchBaseURL,
    			enableExtended: self.opt.enableExtended,
    			ebiSearchTextBox: self,
    			completeCategories: self.opt.completeCategories,
    			completeDomains: self.opt.completeDomains
    		});
            self.raiseEvent("onDecorate", {"message": "done"});
        },


        /**
         *  Default values for the options
         *  @name Biojs.EBISearchTextBox-opt
         */
        opt: {
            target: "ebi-searchbox",
            ebisearchBaseURL: "http://www.ebi.ac.uk/ebisearch/",
            selectSubmit: true,
            enableExtended: false
        },

        /**
       	 * Array containing the supported event names
       	 * @name Biojs.EBISearchTextBox-eventTypes
       	 */
       	eventTypes: [
/* probably the user is not interested in these events       	             
			"onSuggest",
*/

			/**
			 * @name Biojs.EBISearchTextBox#onSelect
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {string} term selected from the suggested ones.
			 * 
			 * @example 
			 * instance.onSelect(
			 *    function( e ) {
			 *       alert( e.term );
			 *    }
			 * ); 
			 * 
			 */
			"onSelect",

			/**
			 * @name Biojs.EBISearchTextBox#onError
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {string} message Error message in case of result be 'failure'.
			 * 
			 * @example 
			 * instance.onError(
			 *    function( e ) {
			 *       alert( e.message );
			 *    }
			 * ); 
			 * 
			 **/
			"onError"
       	             ]

    }
    
);

var uiVer = jQuery.ui.version;
$.widget("custom.catcomplete", $.ui.autocomplete, {
		
		_create: function (obj, arguments) {
			if (jqueryVer.split('.')[1] >= 7) {
				if (this.options.enableExtended == true) {
					$(this.element).css("position", "absolute");
					$(this.element).on("dblclick", this.dblclick);
					this.expanded = false;
				}
				$(this.element).on("keypress", this.keypress);
			} else {
				if (this.options.enableExtended == true) {
					$(this.element).css("position", "absolute");
					$(this.element).bind("dblclick", this.dblclick);
					this.expanded = false;
				}
				$(this.element).bind("keypress", this.keypress)
			}
			
			$.ui.autocomplete.prototype._create.call(this);
		},
		options: {
			delay: 800,
			minLength: 3,
			source: function( request, response ) {
				var thisElem = this.element;
				var baseSearchURL = this.options.baseSearchURL+"suggest.ebi?type=FIELD_VALUE";
				var suggCategories = this.options.completeCategories;
				var suggDomains = this.options.completeDomains;
				if (suggCategories) {
					baseSearchURL += "&categories="+suggCategories;
				} else if (suggDomains) {
					baseSearchURL += "&domains="+suggDomains
				}
				
				var ebiSTBox = this.options.ebiSearchTextBox;
				var replied = false;
				$.ajax({
					url: baseSearchURL+"&term="+request.term,
					timeout: 10000,
					dataType: "json",
					crossdomain: true, // no MSIE compatible?
					success: function( data, status, request ) {
						var obj = $.parseJSON(request.responseText);
						var message = "success: URL: " + this.url;
						Biojs.console.log(message);
						
						if (obj != null) { // the service is not currently returning good error messages
							if (obj['error']) {
								var msg = "Error: message ["+obj['error']['message']+"] type ["+obj['error']['type']+"]";
								Biojs.console.log(msg);
								ebiSTBox.raiseEvent(
										"onError",{ "error": msg }
									);
								replied = false;
								return;
							}
						
							response(obj, request.term);
							ebiSTBox.raiseEvent(
									"onSuggest",{ "list": obj}
								);
							replied = true;
						}
					},
					complete: function(jqXHR, textStatus) {
						var message = "complete: Query: " + request + ", status: " + textStatus + ", msg: " + jqXHR.textStatus;
						Biojs.console.log(message);
						if (!replied) { // some error occurred
							response();
						}
						if (uiVer.split(".")[1] > 8) {
							$(ebiSTBox).removeClass("ui-autocomplete-loading");
						}
					}
				}); 
			}
		},
		dblclick: function () {
			Biojs.console.log("resizing...");
			if (!this.expanded) {
				originalWidth = $(this).width();
				originalHeight = $(this).height();
				$(this).animate({ width: "30em", height: "4.5em", right: "+=0" });
				this.expanded = true;
			} else {
				$(this).animate({ width: originalWidth, height: originalHeight, right: "+=0" });
				this.expanded = false;
			}
		},
		/**
		 * TODO Not able to call this method from outside
		 */
		setCompleteCategories: function(categories) {
			this.options.completeCategories = categories;
		},
		// Emulate the input text behavior when minimized and add a ctrl+enter shortcut when maximized
		keypress: function(event) {
			if (!this.expanded && event.keyCode == 13) { /* simulate the input text behavior */
				$(this.form).submit();
				return false;
			}
			if (this.expanded && event.keyCode == 13 && event.ctrlKey) { /* submit shortcut for textarea */
				$(this.form).submit();
				return false;
			}
		},
		_renderMenu: function(ul, items) {
		    var self = this, currentCategory = "";
		    $.each(items, function(index, item) {
		    	if (uiVer.split(".")[1] > 8) {
		    		self._renderItemData(ul, item);
		    	} else {
		    		self._renderItem(ul, item);
		    	}
		    });
		},
		_renderItem : function (ul, item) {
			var term = item.terms.join(" ");
			item.value = term;
			if (uiVer.split(".")[1] > 8) {
				return $( "<li>" ).data("ui-autocomplete-item", item)
			    	.append( $( "<a>" ).attr("title", "Categories: "+item.categories.join(", ")).html( item.formatted ) )
			    	.appendTo( ul );
			} else {
				return $( "<li>" ).data("item.autocomplete", item)
			    	.append( $( "<a>" ).attr("title", "Categories: "+item.categories.join(", ")).html( item.formatted ) )
			    	.appendTo( ul );
			}
		}
	});

	return Biojs.EBISearchTextBox;
}(jQuery));