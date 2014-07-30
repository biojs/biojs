/**
 *
 * jHeatmap interactive viewer package
 *
 * @namespace jheatmap
 */
var jheatmap = {};
/**
 * Heatmap actions
 *
 * @namespace jheatmap.actions
 */
jheatmap.actions = {};
/**
 * Values aggregators
 * @namespace jheatmap.aggregators
 */
jheatmap.aggregators = {};
/**
 * Drawers package
 * @namespace jheatmap.drawers
 */
jheatmap.components = {};
/**
 * Cell decorators
 * @namespace jheatmap.decorators
 */
jheatmap.decorators = {};
/**
 * Filters
 * @namespace jheatmap.filters
 */
jheatmap.filters = {};
/**
 * Data readers
 * @namespace jheatmap.readers
 */
jheatmap.readers = {};
/**
 * Sorters packages
 *
 * @namespace jheatmap.sorters
 */
jheatmap.sorters = {};
/**
 * Utils package
 * @namespace jheatmap.utils
 */
jheatmap.utils = {};
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {    string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();


/*
 ---

 script: Array.Array.js

 description: Add a stable sort algorithm for all browsers

 license: MIT-style license.

 authors:
 - Yorick Sijsling

 requires:
 core/1.3: '*'

 provides:
 - [Array.stableSort, Array.mergeSort]

 ...
 */

(function () {

    Array.prototype.remove = function(v) {
        this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1);
    }

    Array.prototype.stableSort = function (compare) {
        // I would love some real feature recognition. Problem is that an unstable algorithm sometimes/often gives the same result as an unstable algorithm.
        return (BrowserDetect.browser == "Chrome") ? this.mergeSort(compare) : this.sort(compare);

    }

    if (!Array.mergeSort) {
        Array.prototype.mergeSort = function (compare, token) {
            compare = compare || function (a, b) {
                return a > b ? 1 : (a < b ? -1 : 0);
            };
            if (this.length > 1) {
                // Split and sort both parts
                var right = this.splice(Math.floor(this.length / 2)).mergeSort(compare);
                var left = this.splice(0).mergeSort(compare); // 'this' is now empty.

                // Merge parts together
                while (left.length > 0 || right.length > 0) {
                    this.push(
                        right.length === 0 ? left.shift()
                            : left.length === 0 ? right.shift()
                            : compare(left[0], right[0]) > 0 ? right.shift()
                            : left.shift());
                }
            }
            return this;
        }
    }

    String.prototype.splitCSV = function (sep) {
        for (var thisCSV = this.split(sep = sep || ","), x = thisCSV.length - 1, tl; x >= 0; x--) {
            if (thisCSV[x].replace(/"\s+$/, '"').charAt(thisCSV[x].length - 1) == '"') {
                if ((tl = thisCSV[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                    thisCSV[x] = thisCSV[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                } else if (x) {
                    thisCSV.splice(x - 1, 2, [ thisCSV[x - 1], thisCSV[x] ].join(sep));
                } else
                    thisCSV = thisCSV.shift().split(sep).concat(thisCSV);
            } else
                thisCSV[x].replace(/""/g, '"');
        }
        return thisCSV;
    };

    String.prototype.startsWith = function (str) {
        return (this.match("^" + str) == str);
    };

})();



/**
 * RGBColor class - Convert a RGB value into Hexadecimal and rgb() HTML color String.
 *
 * @example
 * new jheatmap.utils.RGBColor([255,123,42]);
 *
 * @class
 * @param {Array}   color   RGB color components [r,g,b]
 */
jheatmap.utils.RGBColor = function (color) {

    // Init values;
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];

    // Validate values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
}

/**
 * @return Hexadecimal representation of the color. Example: #FF0323
 */
jheatmap.utils.RGBColor.prototype.toHex = function () {
    var r = this.r.toString(16);
    var g = this.g.toString(16);
    var b = this.b.toString(16);
    if (r.length == 1)
        r = '0' + r;
    if (g.length == 1)
        g = '0' + g;
    if (b.length == 1)
        b = '0' + b;
    return '#' + r + g + b;
};

/**
 * @return RGB representation of the color. Example: rgb(255,123,42)
 */
jheatmap.utils.RGBColor.prototype.toRGB = function () {
    return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
};

jheatmap.utils.reindexArray = function(values, headers) {
    for(var index in values) {
        if (isNaN(index)) {
            i = jQuery.inArray(index, headers);
            values[i] = values[index];
            values[index] = undefined;
        }
    }
};

jheatmap.utils.convertToIndexArray = function(values, headers) {
    for (var index in values) {
        values[index] = this.reindexField(values[index], headers);
    }
};

jheatmap.utils.reindexField = function(value, headers) {
    if (isNaN(value)) {
        i = jQuery.inArray(value, headers);

        if (i > -1) {
            return i;
        }
    }

    return value;
};
/**
 * A text separated value file table reader
 *
 * @example
 * new jheatmap.readers.AnnotationReader({ url: "filename.tsv" });
 *
 * @class
 * @param {string}  p.url                 File url
 * @param {string} [p.separator="tab"]    Value separator character
 */
jheatmap.readers.AnnotationReader = function (p) {
    p = p || {};
    this.url = p.url || "";
    this.separator = p.separator || "\t";
};

/**
 * Asynchronously reads a text separated value file, the result is returned in the 'result' parameter.
 *
 * @param {Array} result.header Returns the file header as a string array.
 * @param {Array} result.values Returns the file values as an array of arrays.
 * @param {function}    initialize  A callback function that is called when the file is loaded.
 *
 */
jheatmap.readers.AnnotationReader.prototype.read = function (result, initialize) {

    var sep = this.separator;
    var url = this.url;

    jQuery.ajax({

        url: url,

        dataType: "text",

        success: function (file) {

            var lines = file.replace('\r', '').split('\n');
            jQuery.each(lines, function (lineCount, line) {
                if (line.length > 0 && !line.startsWith("#")) {
                    if (lineCount == 0) {
                        result.header = line.splitCSV(sep);
                    } else {
                        result.values[result.values.length] = line.splitCSV(sep);
                    }
                }
            });

            result.ready = true;

            initialize.call(this);

        }

    });
};
/**
 * A text separated value GenePattern GCT file matrix reader. The file has to follow this format:
 *
 * <pre><code>
 *    #1.2
 *   Name  Description      col1    col2
 *   row1  row1desc		 	0.11    0.12
 *   row2   row2desc 		0.21    0.22
 * </code></pre>
 *
 * @example
 * new jheatmap.readers.GctHeatmapReader({ url: "filename.gct" });
 *
 * @author Ted Liefeld
 * @class
 * @param {string}  p.url                 File url
 *
 */
jheatmap.readers.GctHeatmapReader = function (p) {
    p = p || {};
    this.url = p.url || "";
    this.separator = p.separator || "\t";
    this.colAnnotationUrl = p.colAnnotationUrl || null;

};

/**
 * Asynchronously reads a text separated value file, the result is loaded in the 'heatmap' parameter.
 *
 * @param {jheatmap.Heatmap}     heatmap     The destination heatmap.
 * @param {function}    initialize  A callback function that is called when the file is loaded.
 *
 */
jheatmap.readers.GctHeatmapReader.prototype.read = function (heatmap, initialize) {

    var sep = this.separator;
    var url = this.url;
    var colAnnotationUrl = this.colAnnotationUrl;

    jQuery.ajax({
        url: url,
        dataType: "text",
        success: function (file) {

            var lines = file.replace('\r', '').split('\n');
            jQuery.each(lines, function (lineCount, line) {
                if (line.length > 0 && !line.startsWith("#")) {
                    if (lineCount < 2) {
                        // skip lines 1,2 with the gct header
                    } else if (lineCount == 2) {
                        var headerLine = line.splitCSV(sep);
                        headerLine.shift();
                        headerLine.shift();
                        heatmap.cells.header = headerLine;
                    } else {
                        var valLine = line.splitCSV(sep);
                        heatmap.cells.values[heatmap.cells.values.length] = valLine;
                    }
                }
            });

            heatmap.cols.header = [ "Samples" ];
            for (var i = 0; i < heatmap.cells.header.length; i++) {
                heatmap.cols.values[heatmap.cols.values.length] = [ heatmap.cells.header[i] ];
            }

            var cellValues = [];
            heatmap.rows.header = [ "Feature Name", "Description" ];
            for (var row = 0; row < heatmap.cells.values.length; row++) {
                heatmap.rows.values[heatmap.rows.values.length] = [ heatmap.cells.values[row][0],  heatmap.cells.values[row][1]];
                for (var col = 0; col < heatmap.cols.values.length; col++) {
                    cellValues[cellValues.length] = [ heatmap.cells.values[row][col + 2] ];
                }
            }

            delete heatmap.cells.header;
            delete heatmap.cells.values;
            heatmap.cells.header = [ "Value" ];
            heatmap.cells.values = cellValues;

            if (colAnnotationUrl != null){
                jQuery.ajax({
                    url: colAnnotationUrl,
                    dataType: "text",
                    success: function (file) {

                        var colHash = {};
                        for (var i = 0; i < heatmap.cols.values.length; i++) {
                            colHash[(heatmap.cols.values[i][0]).toString()] = i;
                        }

                        var lines = file.replace('\r', '').split('\n');
                        heatmap.cols.header = lines[0].split('\t');
                        for (var i = 1; i < lines.length; i++) {
                            var values = lines[i].split('\t');
                            var pos = colHash[values[0]];
                            if (pos != undefined) {
                                heatmap.cols.values[pos] = values;
                            }
                        }
                        heatmap.cells.ready = true;
                        initialize.call(this);
                    }
                });

            } else {
                heatmap.cells.ready = true;
                initialize.call(this);
            }
        }
    });
};
/**
 * A text separated value file matrix reader. The file has to follow this format:
 *
 * <pre><code>
 *          col1    col2
 *   row1   0.11    0.12
 *   row2   0.21    0.22
 * </code></pre>
 *
 * @example
 * new jheatmap.readers.MatrixHeatmapReader({ url: "filename.cdm" });
 *
 * @class
 * @param {string}  p.url                 File url
 * @param {string} [p.separator="tab"]    Value separator character
 */
jheatmap.readers.MatrixHeatmapReader = function (p) {
    p = p || {};
    this.url = p.url || "";
    this.separator = p.separator || "\t";
};

/**
 * Asynchronously reads a text separated value file, the result is loaded in the 'heatmap' parameter.
 *
 * @param {jheatmap.Heatmap}     heatmap     The destination heatmap.
 * @param {function}    initialize  A callback function that is called when the file is loaded.
 *
 */
jheatmap.readers.MatrixHeatmapReader.prototype.read = function (heatmap, initialize) {

    var sep = this.separator;
    var url = this.url;

    jQuery.ajax({

        url: url,

        dataType: "text",

        success: function (file) {

            var lines = file.replace('\r', '').split('\n');
            jQuery.each(lines, function (lineCount, line) {
                if (line.length > 0 && !line.startsWith("#")) {
                    if (lineCount == 0) {
                        heatmap.cells.header = line.splitCSV(sep);
                    } else {
                        heatmap.cells.values[heatmap.cells.values.length] = line.splitCSV(sep);
                    }
                }
            });

            heatmap.cols.header = [ "Column" ];
            for (var i = 0; i < heatmap.cells.header.length; i++) {
                heatmap.cols.values[heatmap.cols.values.length] = [ heatmap.cells.header[i] ];
            }

            var cellValues = [];
            heatmap.rows.header = [ "Row" ];
            for (var row = 0; row < heatmap.cells.values.length; row++) {
                heatmap.rows.values[heatmap.rows.values.length] = [ heatmap.cells.values[row][0] ];
                for (var col = 0; col < heatmap.cols.values.length; col++) {
                    cellValues[cellValues.length] = [ heatmap.cells.values[row][col + 1] ];
                }
            }

            delete heatmap.cells.header;
            delete heatmap.cells.values;
            heatmap.cells.header = [ "Value" ];
            heatmap.cells.values = cellValues;

            heatmap.cells.ready = true;

            initialize.call(this);

        }


    });
};
/**
 * A text separated value file matrix reader.
 *
 * <pre><code>
 *   columns  rows   value1   value2
 *   col1     row1   0.11     0.12
 *   col2     row2   0.21     0.22
 * </code></pre>
 *
 * @example
 * new jheatmap.readers.TableHeatmapReader({ url: "filename.tsv" });
 *
 * @class
 * @param {string}  p.url                 File url
 * @param {string} [p.separator="tab"]    Value separator character
 * @param {boolean} [p.orderedValues="false"]   The values follow exactly the columns and rows order and there is no need to reorder them.
 */
jheatmap.readers.TableHeatmapReader = function (p) {
    p = p || {};
    this.url = p.url || "";
    this.separator = p.separator || "\t";
    this.orderedValues = p.orderedValues || false;
};

/**
 * Asynchronously reads a text separated value file, the result is loaded in the 'heatmap' parameter.
 *
 * @param {jheatmap.Heatmap}     heatmap     The destination heatmap.
 * @param {function}    initialize  A callback function that is called when the file is loaded.
 *
 */
jheatmap.readers.TableHeatmapReader.prototype.read = function (heatmap, initialize) {

    var sep = this.separator;
    var url = this.url;
    var orderedValues = this.orderedValues;

    jQuery.ajax({

        url: url,

        dataType: "text",

        success: function loadCells(file) {

            var lines = file.replace('\r', '').split('\n');
            jQuery.each(lines, function (lineCount, line) {
                if (line.length > 0 && !line.startsWith("#")) {
                    if (lineCount == 0) {
                        heatmap.cells.header = line.splitCSV(sep);
                    } else {
                        heatmap.cells.values[heatmap.cells.values.length] = line.splitCSV(sep);
                    }
                }
            });


            if (!orderedValues) {

                var cellValues = [];

                // Try to deduce with column is the row primary key.
                var rowKey;
                var valuesRowKey;
                if (heatmap.options.data.rows != undefined) {
                    for (var i = 0; i < heatmap.rows.header.length; i++) {
                        if ((valuesRowKey = $.inArray(heatmap.rows.header[i], heatmap.cells.header)) > -1) {
                            rowKey = i;
                            break;
                        }
                    }
                    heatmap.cells.header[valuesRowKey] = undefined;

                } else {
                    rowKey = 0;

                    if (heatmap.options.data.rows_annotations != undefined) {
                        var rowAnn = heatmap.options.data.rows_annotations;

                        valuesRowKey = rowAnn[0];
                        heatmap.rows.header = [];

                        for (var i = 0; i < rowAnn.length; i++) {
                            heatmap.rows.header.push(heatmap.cells.header[rowAnn[i]]);
                            heatmap.cells.header[rowAnn[i]] = undefined;
                        }
                    } else {
                        valuesRowKey = 1;
                        heatmap.rows.header = [ heatmap.cells.header[ valuesRowKey ] ];
                        heatmap.cells.header[valuesRowKey] = undefined;
                    }
                }

                // Try to deduce with column is the column primary
                // key.
                var colKey;
                var valuesColKey;

                if (heatmap.options.data.cols != undefined) {
                    for (var i = 0; i < heatmap.cols.header.length; i++) {
                        if ((valuesColKey = $.inArray(heatmap.cols.header[i], heatmap.cells.header)) > -1) {
                            if (valuesColKey != valuesRowKey) {
                                colKey = i;
                                break;
                            }
                        }
                    }
                    heatmap.cells.header[valuesColKey] = undefined;

                } else {
                    colKey = 0;

                    if (heatmap.options.data.cols_annotations != undefined) {
                        var colAnn = heatmap.options.data.cols_annotations;

                        valuesColKey = colAnn[0];
                        heatmap.cols.header = [];

                        for (var i = 0; i < colAnn.length; i++) {
                            heatmap.cols.header.push(heatmap.cells.header[colAnn[i]]);
                            heatmap.cells.header[colAnn[i]] = undefined;
                        }

                    } else {
                        valuesColKey = 0;
                        heatmap.cols.header = [ heatmap.cells.header[ valuesColKey ]];
                        heatmap.cells.header[valuesColKey] = undefined;
                    }
                }

                // Build hashes
                var rowHash = {};
                var colHash = {};

                if (heatmap.options.data.rows != undefined && heatmap.options.data.cols != undefined) {

                    for (var i = 0; i < heatmap.rows.values.length; i++) {
                        rowHash[(heatmap.rows.values[i][rowKey]).toString()] = i;
                    }

                    for (var i = 0; i < heatmap.cols.values.length; i++) {
                        colHash[(heatmap.cols.values[i][colKey]).toString()] = i;
                    }

                } else {
                    console.log((new Date().getTime()) + " Building columns and rows hashes...");
                    for (var i = 0; i < heatmap.cells.values.length; i++) {
                        var values = heatmap.cells.values[i];

                        if (values != null) {
                            var rowValues;
                            if (heatmap.options.data.rows_annotations != undefined) {
                                rowValues = heatmap.options.data.rows_annotations;
                            } else {
                                rowValues = [ valuesRowKey ];
                            }
                            if (rowHash[(values[valuesRowKey]).toString()] == undefined) {

                                var pos = heatmap.rows.values.length;
                                rowHash[(values[valuesRowKey]).toString()] = pos;
                                heatmap.rows.values[pos] = [];

                                for (var r = 0; r < rowValues.length; r++) {
                                    heatmap.rows.values[pos][r] = values[rowValues[r]];
                                }
                            }

                            var colValues;
                            if (heatmap.options.data.cols_annotations != undefined) {
                                colValues = heatmap.options.data.cols_annotations;
                            } else {
                                colValues = [ valuesColKey ];
                            }
                            if (colHash[(values[valuesColKey]).toString()] == undefined) {
                                var pos = heatmap.cols.values.length;
                                colHash[(values[valuesColKey]).toString()] = pos;
                                heatmap.cols.values[pos] = [];

                                for (var c = 0; c < colValues.length; c++) {
                                    heatmap.cols.values[pos][c] = values[colValues[c]];
                                }
                            }
                        }
                    }
                    console.log((new Date().getTime()) + " Hashes ready");
                }

                // Create a null matrix
                var totalPos = heatmap.rows.values.length * heatmap.cols.values.length;
                for (var pos = 0; pos < totalPos; pos++) {
                    cellValues[pos] = null;
                }

                var cl = heatmap.cols.values.length;

                console.log((new Date().getTime()) + " Loading cell values...");
                for (var i = 0; i < heatmap.cells.values.length; i++) {

                    var value = heatmap.cells.values[i];

                    if (value != null) {
                        var rowIndex = rowHash[value[valuesRowKey]];
                        var colIndex = colHash[value[valuesColKey]];

                        var pos = rowIndex * cl + colIndex;

                        cellValues[pos] = value;
                    }
                }
                console.log((new Date().getTime()) + " Cells ready");

                delete heatmap.cells.values;
                heatmap.cells.values = cellValues;

            }

            heatmap.cells.ready = true;

            initialize.call(this);

        }

    });
};
/**
 * Categorical decorator.
 *
 * @example
 * new jheatmap.decorators.Categorical({
 *                            values: ["F", "M"],
 *                            colors: ["pink", "blue"]
 *                         });
 *
 * @class
 * @param {Array} p.values                All posible values. Specify always in String notation.
 * @param {Array} p.colors                Corresponding colors
 * @param {string} [p.unknown="white"]    Color for values not in options.values
 */
jheatmap.decorators.Categorical = function (p) {
    p = p || {};
    this.values = p.values || [];
    this.colors = p.colors || [];
    this.unknown = p.unknown || "white";

};

/**
 * Convert a value to a color
 * @param {string} value    The cell value
 * @return {string} The corresponding color string definition.
 */
jheatmap.decorators.Categorical.prototype.toColor = function (value) {
    var i = this.values.indexOf(value);
    if (i != -1) {
        return this.colors[i];
    }
    return this.unknown;
};
/**
 * Random Categorical decorator, randomly generates colors for a category.
 *
 * @example
 * new jheatmap.decorators.CategoricalRandom();
 *
 * @author Ted Liefeld
 * @class
 * @param {string} [p.unknown="#FFFFFF"]    Color for null or undefined values
 *
 */
jheatmap.decorators.CategoricalRandom = function (p) {
    this.colors = new Object();
    p = p || {};
    this.unknown = p.unknown || "#FFFFFF";
};

/**
 * Convert a value to a color
 * @param {string} value    The cell value
 * @return {string} The corresponding color string definition.
 */
jheatmap.decorators.CategoricalRandom.prototype.toColor = function (value) {
    if (value == null) return this.unknown;
    if (value == 'undefined') return this.unknown;
    if (value == undefined) return this.unknown;
    if (value.trim().length == 0) return this.unknown;

    if (this.colors[value] == null){
        // assign a random color
        this.colors[value] = '#'+Math.floor(Math.random()*16777215).toString(16);

    }
    return this.colors[value];
};
/**
 * Constant decorator. This decorator returns always the same color
 *
 * @example
 * new jheatmap.decorators.Constant({ color: "red" });
 *
 * @class
 * @param {string}  [p.color="white"] Color for all the values
 */
jheatmap.decorators.Constant = function (p) {
    p = p || {};
    this.color = p.color || "white";

};

/**
 * Convert a value to a color
 */
jheatmap.decorators.Constant.prototype.toColor = function () {
    return this.color;
};
/**
 * Heat decorator
 *
 * @example
 * new jheatmap.decorators.Heat({ minValue: -5, midValue: 0, maxValue: 5 });
 *
 * @class
 * @param {Array}   [p.minColor=[0,0,255]]    Minimum color [r,g,b]
 * @param {number}  [p.minValue=-1]                Minimum value
 * @param {Array}   [p.midColor=[255,255,0]]        Maximum color [r,g,b]
 * @param {number}  [p.midValue=0]                Maximum value
 * @param {Array}   [p.maxColor=[255,0,0]]        Maximum color [r,g,b]
 * @param {number}  [p.maxValue=1]                Maximum value
 * @param {Array}   [p.nullColor=[187,187,187]]   NaN values color [r,g,b]
 *
 */
jheatmap.decorators.Heat = function (p) {
    p = p || {};
    this.minColor = (p.minColor == undefined ? [0, 0, 255] : p.minColor);
    this.minValue = (p.minValue == undefined ? -1 : p.minValue);
    this.midColor = (p.midColor == undefined ? [255, 255, 0]: p.midColor);
    this.midValue = (p.midValue == undefined ? 0 : p.midValue);
    this.maxColor = (p.maxColor == undefined ? [255, 0, 0] : p.maxColor);
    this.maxValue = (p.maxValue == undefined ? 1 : p.maxValue);
    this.nullColor = (p.nullColor == undefined ? [187, 187, 187] : p.nullColor);
};

/**
 * Convert a value to a color
 * @param value The cell value
 * @return The corresponding color string definition.
 */
jheatmap.decorators.Heat.prototype.toColor = function (value) {

    if (isNaN(value)) {
        return (new jheatmap.utils.RGBColor(this.nullColor)).toRGB();
    }

    if (value > this.maxValue) {
        return (new jheatmap.utils.RGBColor(this.maxColor)).toRGB();
    }

    if (value < this.minValue) {
        return (new jheatmap.utils.RGBColor(this.minColor)).toRGB();
    }

    var maxV, minV, maxC, minC;
    if (value < this.midValue) {
        minV = this.minValue;
        minC = this.minColor;
        maxV = this.midValue;
        maxC = this.midColor;
    } else {
        minV = this.midValue;
        minC = this.midColor;
        maxV = this.maxValue;
        maxC = this.maxColor;
    }

    var fact = (value - minV) / (maxV - minV);

    var r, g, b;

    r = minC[0] + Math.round(fact * (maxC[0] - minC[0]));
    g = minC[1] + Math.round(fact * (maxC[1] - minC[1]));
    b = minC[2] + Math.round(fact * (maxC[2] - minC[2]));

    return (new jheatmap.utils.RGBColor([r, g, b])).toRGB();
};
/**
 * Linear decorator
 *
 * @example
 * new jheatmap.decorators.Linear({});
 *
 * @class
 * @param {Array}   [p.ranges=[[-2,0],[0,2]]]              All the ranges wanted starting with the most negative range upwards
 * @param {Array}   [p.colors=[[[0,0,255],[255,255,255]],[[255,255,255],[255,0,0]]]  Min and max colors for each defined range that produce gradient
 * @param {Array}   [p.outColor=[0,0,0]]                   A specific color if the value is out of the range bounds. If not defined by user, the min and max colors will be used.
 * @param {Array}   [p.betweenColor=[187,187,187]]         A specific color if a value is between defined ranges. If not defined user it is set to black or outColor.
 *
 */
jheatmap.decorators.Linear = function (p) {
    p = p || {};

    this.ranges = (p.ranges == undefined ? [[-2,0],[0,2]] : p.ranges);
    this.colors = (p.colors == undefined ? [[[0,0,255],[255,255,255]], [[255,255,255],[255,0,0]]] : p.colors);

    this.nullColor = (p.nullColor == undefined ? [255, 255, 255] : p.nullColor);
    this.outColor = (p.outColor == undefined ?  null : p.outColor);
    this.betweenColor = (p.betweenColor == undefined) ? null : p.betweenColor;
    if (this.betweenColor == null) {
        this.betweenColor = (p.outColor != null) ? p.outColor : [0,0,0];
    }

    this.minValue = this.ranges.reduce(function(min, arr) {
        return Math.min(min, arr[0]);
    }, Infinity);

    this.maxValue = this.ranges.reduce(function(max, arr) {
        return Math.max(max, arr[1]);
    }, -Infinity);

    this.minColor = this.colors[0][0];
    this.maxColor = this.colors[this.colors.length-1][1];

};

/**
 * Convert a value to a color
 * @param value The cell value
 * @return The corresponding color string definition.
 */
jheatmap.decorators.Linear.prototype.toColor = function (value) {

    if (isNaN(value)) {
        return (new jheatmap.utils.RGBColor(this.nullColor)).toRGB();
    }

    if (value > this.maxValue || value < this.minValue) {
        if (this.outColor != null) {
            return (new jheatmap.utils.RGBColor(this.outColor)).toRGB();
        }
        else if (value > this.maxValue) {
            return (new jheatmap.utils.RGBColor(this.maxColor)).toRGB();
        }
        else {
            return (new jheatmap.utils.RGBColor(this.minColor)).toRGB();
        }
    }

    var minColor;
    var rangeMin;
    var maxColor;
    var rangeMax;
    var allColors = this.colors;

    jQuery.each(this.ranges,function(index,range){
        if (value >= range[0] && value <= range[1]) {
            minColor = allColors[index][0];
            rangeMin = range[0];
            maxColor = allColors[index][1];
            rangeMax = range[1];
            return (true);
        }
    });

    if (minColor == undefined || maxColor == undefined)  {
        return (new jheatmap.utils.RGBColor(this.betweenColor)).toRGB();
    }

    var fact = (value - rangeMin) / (rangeMax - rangeMin);

    var r, g, b;

    r = minColor[0] + Math.round(fact * (maxColor[0] - minColor[0]));
    g = minColor[1] + Math.round(fact * (maxColor[1] - minColor[1]));
    b = minColor[2] + Math.round(fact * (maxColor[2] - minColor[2]));

    return (new jheatmap.utils.RGBColor([r, g, b])).toRGB();
};
/**
 * Median decorator
 *
 * @example
 * new jheatmap.decorators.Median({ maxValue: 4 });
 *
 * @class
 * @param {number}  [p.maxValue=3]    Absolute maximum and minimum of the median
 * @param {Array}   [p.nullColor=[255,255,255]]   NaN values color [r,g,b]
 */
jheatmap.decorators.Median = function (p) {
    p = p || {};
    this.maxValue = p.maxValue || 3;
    this.nullColor = p.nullColor || [255,255,255]

};

/**
 * Convert a value to a color
 * @param value The cell value
 * @return The corresponding color string definition.
 */
jheatmap.decorators.Median.prototype.toColor = function (value) {
    var r, g, b;
    if (isNaN(value)) {
        r = this.nullColor[0];
        g = this.nullColor[1];
        b = this.nullColor[2];
    } else if (value < 0) {
        value = Math.abs(value);
        value = (value > this.maxValue ? this.maxValue : value);
        g = (value == 0) ? 255 : (255 - Math.round((value / this.maxValue) * 255));
        r = 85 + Math.round((g / 255) * 170);
        b = 136 + Math.round((g / 255) * 119);
    } else {
        r = 255;
        value = (value > this.maxValue ? this.maxValue : value);
        b = (value == 0) ? 255 : (255 - Math.round((value / this.maxValue) * 255));
        g = 204 + Math.round((b / 255) * 51);
    }

    return (new jheatmap.utils.RGBColor([r, g, b])).toRGB();
};
/**
 * pValue decorator
 * @example
 * new jheatmap.decorators.PValue({ cutoff: 0.01 });
 *
 * @class
 * @param {number}  [p.cutoff=0.05]   Significance cutoff.
 * @param {Array}   [p.nullColor=[255,255,255]]   NaN values color [r,g,b]
 */
jheatmap.decorators.PValue = function (p) {
    p = p || {};
    this.cutoff = p.cutoff || 0.05;
    this.nullColor = p.nullColor || [255,255,255]
};

/**
 * Convert a value to a color
 * @param value The cell value
 * @return The corresponding color string definition.
 */
jheatmap.decorators.PValue.prototype.toColor = function (value) {
    var r, g, b;

    if (!value || isNaN(value)) {
        r = this.nullColor[0];
        g = this.nullColor[1];
        b = this.nullColor[2];
    } else if (value > this.cutoff) {
        r = 187;
        g = 187;
        b = 187;
    } else {
        r = 255;
        g = (value == 0) ? 0 : Math.round((Math.log(value*(9/this.cutoff)+1)/2.3026) *255);
        b = 0;
    }

    return (new jheatmap.utils.RGBColor([r, g, b])).toRGB();
};
/**
 * String to color decorator. The color is calculated from the ASCII code of the String
 *
 * @example
 * new jheatmap.aggregators.StringColor();
 *
 * @class
 */
jheatmap.decorators.StringColor = function () {
};

jheatmap.decorators.StringColor.prototype.toColor = function (value) {
    var color = [0,0,0];

    value = value.toUpperCase();

    var iterations = 0;
    for (var i=0; i < value.length; i=i+3 ) {
        color[0] += ((value.charCodeAt(i) || 65) - 48) * 7;
        color[1] += ((value.charCodeAt(i+1) || 65) - 48) * 7;
        color[2] += ((value.charCodeAt(i+2) || 65) - 48) * 7;
        iterations++;
    }

    color[0] = Math.round( color[0] / iterations );
    color[1] = Math.round( color[1] / iterations );
    color[2] = Math.round( color[2] / iterations );

    return (new jheatmap.utils.RGBColor(color)).toRGB();

};
/**
 * Absolute addition aggregator. This aggregator adds the absolute current value to the accumulated sum.
 *
 * @example
 * new jheatmap.aggregators.AbsoluteAddition();
 *
 * @class
 */
jheatmap.aggregators.AbsoluteAddition = function () {
};

/**
 * Accumulates all the values as absolute
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.AbsoluteAddition.prototype.accumulate = function (values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value && !isNaN(value)) {
            sum += Math.abs(value);
        }
    }
    return sum;
};
/**
 * Addition aggregator. This aggregator add the current value to the accumulated sum.
 *
 * @example
 * new jheatmap.aggregators.Addition();
 *
 * @class
 */
jheatmap.aggregators.Addition = function () {
};

/**
 * accumulates all the values
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.Addition.prototype.accumulate = function (values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value && !isNaN(value)) {
            sum += value;
        }
    }
    return sum;
};
/**
 * Average aggregator.
 *
 * @example
 * new jheatmap.aggregators.Average();
 *
 * @class
 */
jheatmap.aggregators.Average = function (options) {
};

/**
 * Accumulates all the values
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.Average.prototype.accumulate = function (values) {
    var avg = 0;
    var count = 0;
    for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (value && !isNaN(value)) {
            avg += value;
            count++;
        }
    }
    return (count==0 ? -10 : (avg/count));
};
/**
 * Binary string addition aggregator. It assigns a zero to a null, undefined and '-' values, otherwise a one and
 * returns the addition.
 *
 * @example
 * new jheatmap.aggregators.BinaryStringAddition();
 *
 * @class
 */
jheatmap.aggregators.BinaryStringAddition = function () {
};

/**
 * Accumulates all the values
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.BinaryStringAddition.prototype.accumulate = function (values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value && value != null && value!='-') {
            sum += 1;
        }
    }
    return sum;
};
/**
 * Median aggregator.
 *
 * @example
 * new jheatmap.aggregators.Median({ maxValue: 4 });
 *
 * @class
 * @param {number}  [p.maxValue=3]    Absolute maximum and minimum median value.
 */
jheatmap.aggregators.Median = function (p) {
    p = p || {};
    this.maxValue = p.maxValue || 3;
};

/**
 * accumulates all the values
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.Median.prototype.accumulate = function (values) {
    var sum = 0;

    for (var i = 0; i < values.length; i++) {
        var distance = this.maxValue - Math.abs(values[i]);
        distance = (distance < 0 ? 0 : distance);

        sum += (values[i] < 0 ? distance : (this.maxValue * 2) - distance);
    }
    return sum;
};
/**
 * PValue aggregator
 *
 * @example
 * new jheatmap.aggregators.PValue({ cutoff: 0.01 });
 *
 * @class
 * @param   {number}    [p.cutoff=0.05]   Significance cutoff
 */
jheatmap.aggregators.PValue = function (p) {
    p = p || {};
    this.cutoff = p.cutoff || 0.05;
};

/**
 * accumulates all the values
 * @param {Array}   values  The values to accumulate
 */
jheatmap.aggregators.PValue.prototype.accumulate = function (values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] && !isNaN(values[i])) {
            var value = parseFloat(values[i]);
            sum += ((value >= this.cutoff) ? 0 : ((this.cutoff - value) / this.cutoff));

        }
    }
    return sum;
};
/**
 * Set aggregation sorter as default
 *
 * @example
 * new jheatmap.actions.AggregationSort(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.AggregationSort = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "A";
    this.keyCodes = [97, 65];
    this.title = "Sort by value aggregation";
    this.icon = "fa-sort";
};

jheatmap.actions.AggregationSort.prototype.rows = function() {
    var heatmap = this.heatmap;
    heatmap.cols.sorter.asc = !heatmap.cols.sorter.asc;
    if (heatmap.rows.selected.length == 0) {
        indices = heatmap.rows.order.slice(0);
    } else {
        indices = heatmap.rows.selected.slice(0);
    }
    heatmap.cols.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, heatmap.cols.sorter.asc, true, indices);
    heatmap.cols.sorter.sort(heatmap, "columns");
    heatmap.drawer.paint();
};

jheatmap.actions.AggregationSort.prototype.columns = function() {
    var heatmap = this.heatmap;
    heatmap.rows.sorter.asc = !heatmap.rows.sorter.asc;
    if (heatmap.cols.selected.length == 0) {
        indices = heatmap.cols.order.slice(0);
    } else {
        indices = heatmap.cols.selected.slice(0);
    }
    heatmap.rows.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, heatmap.rows.sorter.asc, true, indices);
    heatmap.rows.sorter.sort(heatmap, "rows");
    heatmap.drawer.paint();
};

/**
 * Show hidden rows or columns action.
 *
 * @example
 * new jheatmap.actions.ClearSelection(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.ClearSelection = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "C";
    this.keyCodes = [99, 67];
    this.title = "Clear selection";
    this.icon = "fa-times";
};

/**
 * Execute the action.
 * @private
 */
jheatmap.actions.ClearSelection.prototype.run = function (dimension) {
    dimension.selected = [];
    this.heatmap.drawer.paint();
};

jheatmap.actions.ClearSelection.prototype.rows = function() {
    this.run(this.heatmap.rows);
};

jheatmap.actions.ClearSelection.prototype.columns = function() {
    this.run(this.heatmap.cols);
};

/**
 * Copy to clipboard selected labels.
 *
 * @example
 * new jheatmap.actions.CopyToClipboard();
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.CopyToClipboard = function (heatmap) {
    this.heatmap = heatmap;
    this.title = "Copy to clipboard";
    this.icon = "fa-clipboard";
};

/**
 * Execute the action. *
 * @private
 */
jheatmap.actions.CopyToClipboard.prototype.run = function (dimension) {
    if (dimension.selected.length > 0) {

        text = "";
        i = 0;
        while (i < dimension.selected.length) {
            var value = dimension.values[dimension.selected[i]][dimension.selectedValue];
            text = text + value;
            i++;
            if (i < dimension.selected.length) {
               text = text + ", ";
            }
        }

        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
};

jheatmap.actions.CopyToClipboard.prototype.rows = function() {
    this.run(this.heatmap.rows);
};

jheatmap.actions.CopyToClipboard.prototype.columns = function() {
    this.run(this.heatmap.cols);
};

/**
 * Hide selected action.
 *
 * @example
 * new jheatmap.actions.HideSelected(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.HideSelected = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "H";
    this.keyCodes = [72, 104];
    this.title = "Hide selected";
    this.icon = "fa-eye-slash";
};

/**
 * Execute the action. *
 * @private
 */
jheatmap.actions.HideSelected.prototype.run = function (dimension) {
    if (dimension.selected.length > 0) {
        dimension.order = $.grep(dimension.order, function (value) {
                return dimension.selected.indexOf(value) == -1;
        });
        this.heatmap.drawer.paint();
    }
};

jheatmap.actions.HideSelected.prototype.rows = function() {
    this.run(this.heatmap.rows);
};

jheatmap.actions.HideSelected.prototype.columns = function() {
    this.run(this.heatmap.cols);
};

/**
 * Invert selection action.
 *
 * @example
 * new jheatmap.actions.InvertSelection(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.InvertSelection = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "H";
    this.keyCodes = [72, 104];
    this.title = "Invert selection";
    this.icon = "fa-exchange";
};

/**
 * Execute the action.
 * @private
 */
jheatmap.actions.InvertSelection.prototype.run = function (dimension) {
    if (dimension.selected.length > 0) {
        newSelection = $.grep(dimension.order, function (value) {
                return dimension.selected.indexOf(value) == -1;
        });
        dimension.selected = newSelection;
        this.heatmap.drawer.paint();
    }
};

jheatmap.actions.InvertSelection.prototype.rows = function() {
    this.run(this.heatmap.rows);
};

jheatmap.actions.InvertSelection.prototype.columns = function() {
    this.run(this.heatmap.cols);
};

/**
 *
 * Set mutual exclusive sorter as default
 *
 * @example
 * new jheatmap.actions.MutualExclusiveSort(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.MutualExclusiveSort = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "M";
    this.keyCodes = [109, 77];
    this.title = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by mutual exclusive";
};

jheatmap.actions.MutualExclusiveSort.prototype.rows = function() {
    var heatmap = this.heatmap;

    heatmap.cols.sorter.asc = !heatmap.cols.sorter.asc;

    if (heatmap.rows.selected.length == 0) {
        indices = heatmap.rows.order.slice(0);
    } else {
        indices = heatmap.rows.selected.slice(0);
    }

    heatmap.cols.sorter = new jheatmap.sorters.MutualExclusiveSorter(heatmap.cells.selectedValue, heatmap.cols.sorter.asc, indices);
    heatmap.cols.sorter.sort(heatmap, "columns");
    heatmap.drawer.paint();
};

jheatmap.actions.MutualExclusiveSort.prototype.columns = function() {
    var heatmap = this.heatmap;
    heatmap.rows.sorter.asc = !heatmap.rows.sorter.asc;

    if (heatmap.cols.selected.length == 0) {
        indices = heatmap.cols.order.slice(0);
    } else {
        indices = heatmap.cols.selected.slice(0);
    }

    heatmap.rows.sorter = new jheatmap.sorters.MutualExclusiveSorter(heatmap.cells.selectedValue, heatmap.rows.sorter.asc, indices);
    heatmap.rows.sorter.sort(heatmap, "rows");
    heatmap.drawer.paint();
};

/**
 * Dummy action to create a menu separator
 *
 * @example
 * new jheatmap.actions.Separator();
 *
 * @class
 */
jheatmap.actions.Separator = function () {
};

/**
 * Show hidden rows or columns action.
 *
 * @example
 * new jheatmap.actions.ShowHidden(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.ShowHidden = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "S";
    this.keyCodes = [83, 115];
    this.title = "Show hidden";
    this.icon = "fa-eye";
};

/**
 * Execute the action. *
 * @private
 */
jheatmap.actions.ShowHidden.prototype.run = function (dimension) {
    dimension.order = [];
    for (var c = 0; c < dimension.values.length; c++) {
        dimension.order[dimension.order.length] = c;
    }
};

jheatmap.actions.ShowHidden.prototype.rows = function() {
    this.run(this.heatmap.rows);
    this.heatmap.rows.sorter.sort(this.heatmap, "rows");
    this.heatmap.drawer.paint();
};

jheatmap.actions.ShowHidden.prototype.columns = function() {
    this.run(this.heatmap.cols);
    this.heatmap.cols.sorter.sort(this.heatmap, "columns");
    this.heatmap.drawer.paint();
};

/**
 * Explicitly hide (or show) rows or columns that all the values are outside [-maxValue, maxValue] range.
 *
 * @example
 * new jheatmap.filters.NonExpressed({ maxValue: 4 });
 *
 * @class
 * @param {number}  [maxValue=3]    Absolute maximum and minimum value
 * @param {boolean} [hide=true]     Hide 
 */
jheatmap.filters.NonExpressed = function (options) {
    options = options || {};
    this.maxValue = options.maxValue || 3;
    this.hide =  (typeof options.hide != 'undefined') ? options.hide : true;
};

/**
 *@param {Array}   values  All the row or column values
 * @returns Returns 'false' if at least one value is inside (-maxValue, maxValue) range,
 * otherwise returns 'true'. If 'hide' is set to false, the contrary is the case.
 */
jheatmap.filters.NonExpressed.prototype.filter = function (values) {
    retbool = this.hide ? true : false;
    for (var i = 0; i < values.length; i++) {
        if (this.hide) {
            if (Math.abs(parseFloat(values[i])) > this.maxValue) {
               return false;
            }
        } else {
            if (Math.abs(parseFloat(values[i])) > this.maxValue) {
               return true;
            }
        }
    }
    return retbool;
};
/**
 * Filter rows or columns with all the values non-significant
 *
 * @example
 * new jheatmap.filters.NonSignificance({ cutoff: 0.01 });
 *
 * @class
 * @param {number}  [cutoff=0.05]   Significance cutoff
 */
jheatmap.filters.NonSignificance = function (options) {
    options = options || {};
    this.cutoff = options.cutoff || 0.05;
};

/**
 * @param {Array}   values  All the row or column values
 * @returns Returns 'false' if at least one value is significant otherwise returns 'true'
 */
jheatmap.filters.NonSignificance.prototype.filter = function (values) {
    for (var i = 0; i < values.length; i++) {
        if (parseFloat(values[i]) < this.cutoff) {
            return false;
        }
    }
    return true;
};
/**
 * Numeric sorter by value of multiple aggregated rows or columns.
 *
 * @example
 * new jheatmap.sorters.AggregationValueSorter(heatmap, "rows", 3, true, [23, 24, 32, 45, 50] );
 * @class
 * @param {int}     field       Value field to aggregate
 * @param {boolean} asc         True to sort ascending, false to sort descending
 * @param {boolean} nullsLast   True to sort null values always to the end. False to treat as zero.
 * @param {Array}   indices     Integer positions of the selected rows/columns to aggregate.
 */
jheatmap.sorters.AggregationValueSorter = function (field, asc, nullsLast, indices) {
    this.field = field;
    this.asc = asc;
    this.indices = indices;
    this.nullsLast = nullsLast;
};

/**
 * Sort the heatmap
 *
 * @param {jheatmap.Heatmap} heatmap     The heatmap to sort
 * @param {string}  sortType            "rows" or "columns"
 */
jheatmap.sorters.AggregationValueSorter.prototype.sort = function(heatmap, sortType) {

    var cells = heatmap.cells;
    var rowsSort = (sortType=="rows");
    var sortDimension = (rowsSort ? heatmap.rows : heatmap.cols);
    var aggregationDimension = (rowsSort ? heatmap.cols : heatmap.rows);
    this.indices = this.indices || aggregationDimension.order;

    var aggregation = [];

    var cl = heatmap.cols.values.length;
    for (var r = 0; r < sortDimension.order.length; r++) {
        var values = [];
        for (var i = 0; i < this.indices.length; i++) {
            var pos = (rowsSort ? sortDimension.order[r] * cl + this.indices[i] : this.indices[i] * cl + sortDimension.order[r]);
            var value = cells.values[pos];
            if (value != null) {
                  v1 = value[this.field];
                  if (v1 != null && v1 != '-') {
                    values.push(v1);
                  }
            }
        }
        if (values.length == 0) {
            aggregation[sortDimension.order[r]] = undefined;
        } else {
            aggregation[sortDimension.order[r]] = cells.aggregators[this.field].accumulate(values);
        }
    }

    var asc = this.asc;
    var nullsLast = this.nullsLast;

    var compareFunction = function (o_a, o_b) {
        var v_a = aggregation[o_a];
        var v_b = aggregation[o_b];
        var val = (asc ? 1 : -1);

        if (v_a == undefined) {
           if (nullsLast) {
               return 1;
           } else {
               v_a = 0;
           }
        }

        if (v_b == undefined) {
            if (nullsLast) {
                return -1;
            } else {
                v_b = 0;
            }
        }

        return (v_a == v_b) ? 0 : (v_a > v_b ? val : -val);
    };


    if (sortDimension.selected.length == 0) {
        sortDimension.order.stableSort(compareFunction);
    } else {

        // Un select all elements that are not visible
        var isVisible = function(x) {return sortDimension.order.indexOf(x)!=-1};
        sortDimension.selected = sortDimension.selected.filter(isVisible);

        // Sort the selected and visible items
        sortDimension.selected.stableSort(compareFunction);

        // Map selected order to all visible items.
        var isNotSelected = function(x) {return sortDimension.selected.indexOf(x)==-1};
        var c=0;
        sortDimension.order = sortDimension.order.map(function(x){
            return isNotSelected(x) ? x : sortDimension.selected[c++];
        });
    }



};
/**
 * Numeric sorter by row or column annotation
 *
 * @example
 * new jheatmap.sorters.AnnotationSorter(heatmapDimension, 2, true);
 *
 * @class
 * @param {int}                 field               Value field to aggregate
 * @param {boolean}             asc                 True to sort ascending, false to sort descending
 */
jheatmap.sorters.AnnotationSorter = function (field, asc) {
    this.field = field;
    this.asc = asc;
    this.indices = [];
};

/**
 * Sort the heatmap
 *
 * @param {jheatmap.Heatmap} heatmap     The heatmap to sort
 * @param {string}  sortType            "rows" or "columns"
 */
jheatmap.sorters.AnnotationSorter.prototype.sort = function(heatmap, sortType) {

    var heatmapDimension = (sortType == "rows" ? heatmap.rows : heatmap.cols);
    var values = heatmapDimension.values;
    var field = this.field;
    var asc = this.asc;

    heatmapDimension.order.stableSort(function (a, b) {

        var v_a = values[a][field];
        var v_b = values[b][field];

        if (!isNaN(v_a)) {
            v_a = parseFloat(v_a);
            v_b = parseFloat(v_b);
        }
        var val = (asc ? 1 : -1);
        return (v_a == v_b) ? 0 : ((v_a > v_b) ? val : -val);
    });
}
/**
 * This is the default sorter. In fact it's a NO sorter, because it don't do anything.
 * It's also the signature that all the sorters must implement.
 *
 * @example
 * new jheatmap.sorters.DefaultSorter();
 *
 * @class
 */
jheatmap.sorters.DefaultSorter = function () {
    this.field = 0;
    this.asc = true;
    this.indices = [];
};

/**
 * Sort the heatmap
 *
 * @param {jheatmap.Heatmap} heatmap     The heatmap to sort
 * @param {string}  sortType    "rows" or "columns"
 */
jheatmap.sorters.DefaultSorter.prototype.sort = function(heatmap, sortType) {
};
/**
 * This is a mutual exclusive sorter.
 *
 * @example
 * new jheatmap.sorters.MutualExclusiveSorter();
 *
 * @class
 */
jheatmap.sorters.MutualExclusiveSorter = function (field, asc, indices) {
    this.field = field;
    this.asc = asc;
    this.indices = indices;
};

/**
 * Sort the heatmap
 *
 * @param {jheatmap.Heatmap} heatmap     The heatmap to sort
 * @param {string}  sortType    "rows" or "columns"
 */
jheatmap.sorters.MutualExclusiveSorter.prototype.sort = function(heatmap, sortType) {

    var otherType = (sortType == "rows" ? "columns" : "rows");
    var sortDimension = (sortType == "rows" ? heatmap.rows : heatmap.cols);

    var sorter = new jheatmap.sorters.AggregationValueSorter(this.field, false, false, this.indices);
    sorter.sort(heatmap, sortType);

    sorter.asc = this.asc;

    sorter.indices = [ 0 ];

    var selection;
    if (sortDimension.selected.length == 0) {
        selection = sortDimension.order;
    } else {
        var isSelected = function(x) {return sortDimension.selected.indexOf(x)>-1};
        selection = sortDimension.order.filter(isSelected);
    }

    for (var i = selection.length - 1; i >= 0; i--) {
        sorter.indices[0] = selection[i];
        sorter.sort(heatmap, otherType);
    }

};

jheatmap.components.CellBodyPanel = function(drawer, heatmap) {
    this.heatmap = heatmap;

    // Create markup
    this.markup = $('<td>');
    this.canvas = $("<canvas width='" + heatmap.size.width + "' height='" + heatmap.size.height + "' tabindex='2'></canvas>");
    this.markup.append(this.canvas);
    this.canvas.bind('contextmenu', function(e){
        return false;
    });

    // Events
    var downX = null;
    var downY = null;
    var lastX = null;
    var lastY = null;
    var eventTarget = this.canvas;

    var onMouseUp = function (e, pageX, pageY) {
        e.preventDefault();

        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
            return;
        }

        var position = eventTarget.offset();
        var pX = pageX - position.left - downX;
        var pY = pageY - position.top - downY;

        var c = Math.round(pX / heatmap.cols.zoom);
        var r = Math.round(pY / heatmap.rows.zoom);

        downX = null;
        downY = null;

        if (r == 0 && c == 0) {
            if (heatmap.focus.row != undefined) {
                heatmap.focus.row = undefined;
                heatmap.focus.col = undefined;
            } else {
                heatmap.focus.row = Math.floor((pageY - position.top) / heatmap.rows.zoom) + heatmap.offset.top;
                heatmap.focus.col = Math.floor((pageX - position.left) / heatmap.cols.zoom) + heatmap.offset.left;
            }
        }
        drawer.paint();
    };

    var onMouseMove = function (e, pageX, pageY) {
        e.preventDefault();

        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
            return;
        }

        if (downX != null) {
            var position = eventTarget.offset();
            var pX = pageX - position.left - lastX;
            var pY = pageY - position.top - lastY;

            var c = Math.round(pX / heatmap.cols.zoom);
            var r = Math.round(pY / heatmap.rows.zoom);

            if (!(r == 0 && c == 0)) {
                heatmap.offset.top -= r;
                heatmap.offset.left -= c;
                drawer.paint();
                lastX = pageX - position.left;
                lastY = pageY - position.top;
            }
        }

    };

    var onMouseDown = function (e, pageX, pageY) {
        e.preventDefault();

        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
              var pos = eventTarget.offset();
              var pageX1 = e.originalEvent.touches[0].pageX;
              var pageY1 = e.originalEvent.touches[0].pageY;
              var pageX2 = e.originalEvent.touches[1].pageX;
              var pageY2 = e.originalEvent.touches[1].pageY;
              x = Math.round(pageX1 + (pageX2 - pageX1)/2 ) - pos.left;
              y = Math.round(pageY1 + (pageY2-pageY1)/2) - pos.top;
              downX = null;
              downY = null;
              return;
        }

        var position = eventTarget.offset();
        downX = pageX - position.left;
        downY = pageY - position.top;
        lastX = downX;
        lastY = downY;
    };

    var col, row;
    var x, y;
    var startWheel = new Date().getTime();

    var zoomHeatmap = function (inc, zoomin, col, row) {

        var ncz = null;
        var nrz = null;

        if (zoomin) {
            ncz = heatmap.cols.zoom + inc;
            nrz = heatmap.rows.zoom + inc;
        } else {
            ncz = heatmap.cols.zoom - inc;
            nrz = heatmap.rows.zoom - inc;
        }

        ncz = ncz < 3 ? 3 : ncz;
        ncz = ncz > 64 ? 64 : ncz;

        nrz = nrz < 3 ? 3 : nrz;
        nrz = nrz > 64 ? 64 : nrz;

        if (!(nrz == heatmap.rows.zoom && ncz == heatmap.cols.zoom)) {

            heatmap.offset.left = col - Math.floor(x / ncz);
            heatmap.offset.top  = row - Math.floor(y / nrz);

            heatmap.cols.zoom = ncz;
            heatmap.rows.zoom = nrz;
            drawer.paint();
        }
    };

    var onGestureEnd = function (e) {
        e.preventDefault();

        col = Math.floor(x / heatmap.cols.zoom) + heatmap.offset.left;
        row = Math.floor(y / heatmap.rows.zoom) + heatmap.offset.top;

        var zoomin = e.originalEvent.scale > 1;

        var inc = 3;
        if (zoomin) {
            inc = Math.round(inc * e.originalEvent.scale * 0.75 );
        } else {
            inc = Math.round(inc * (1 / e.originalEvent.scale) * 0.75);
        }

        zoomHeatmap(inc, zoomin, col, row);

    };

    var onGestureChange = function (e) {
        e.preventDefault();

        return;
    };

    // Bind events
    this.canvas.bind('mousewheel', function (e, delta, deltaX, deltaY) {
        e.preventDefault();

        if (e.shiftKey) {
           // Zoom
	        var currentTime = new Date().getTime();
	        if ((currentTime - startWheel) > 500) {
	            var pos = eventTarget.offset();
	            x = (e.pageX - pos.left);
	            y = (e.pageY - pos.top);
	            col = Math.floor(x / heatmap.cols.zoom) + heatmap.offset.left;
	            row = Math.floor(y / heatmap.rows.zoom) + heatmap.offset.top;
	        }
	        startWheel = currentTime;

	        var zoomin = delta / 120 > 0;
	        zoomHeatmap(3, zoomin, col, row);

        } else {
             // Scroll rows

             // Normal speed
             var momentum = Math.round(heatmap.size.height / (7 * heatmap.rows.zoom));

             // Increase speed when user swipes the wheel (the increment depends on heatmap size).
             momentum = Math.abs(delta) > 1 ? Math.round(heatmap.rows.values.length / (20*Math.abs(delta))) : momentum;

             heatmap.offset.top = heatmap.offset.top - delta * momentum;

	         drawer.paint();

        }
    });
    this.canvas.bind('gesturechange', function (e) {
        onGestureChange(e);
    });
    this.canvas.bind('gestureend', function (e) {
        onGestureEnd(e);
    });
    this.canvas.bind('mousedown', function (e) {
        onMouseDown(e, e.pageX, e.pageY);
    });
    this.canvas.bind('touchstart', function(e) {
        onMouseDown(e, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
    });

    this.canvas.bind('mousemove', function (e) {
        onMouseMove(e, e.pageX, e.pageY);
    });
    this.canvas.bind('touchmove', function(e) {
        onMouseMove(e, e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
    });

    this.canvas.bind('mouseup', function (e) {
        onMouseUp(e, e.pageX, e.pageY);
    });

    this.canvas.bind('touchend touchcancel', function (e) {
        if (downX && downY && (Math.abs(downX - lastX) < 10) && (Math.abs(downY - lastY) < 10))  {
            var pos = eventTarget.offset();
            onMouseUp(e, downX + pos.left, downY + pos.top);
        }
    });

};

jheatmap.components.CellBodyPanel.prototype.paint = function() {

    var heatmap = this.heatmap;
    var rz = heatmap.rows.zoom;
    var cz = heatmap.cols.zoom;
    var startRow = heatmap.offset.top;
    var endRow = heatmap.offset.bottom;
    var startCol = heatmap.offset.left;
    var endCol = heatmap.offset.right;

    var cellCtx = this.canvas.get()[0].getContext('2d');
    cellCtx.clearRect(0, 0, cellCtx.canvas.width, cellCtx.canvas.height)
    for (var row = startRow; row < endRow; row++) {

        for (var col = startCol; col < endCol; col++) {

            // Iterate all values
            var value = heatmap.cells.getValue(row, col, heatmap.cells.selectedValue);

            if (value != null) {
                var color = heatmap.cells.decorators[heatmap.cells.selectedValue].toColor(value);
                cellCtx.fillStyle = color;
                cellCtx.fillRect((col - startCol) * cz, (row - startRow) * rz, cz, rz);
            }
        }

        if ($.inArray(heatmap.rows.order[row], heatmap.rows.selected) > -1) {
            cellCtx.fillStyle = "rgba(0,0,0,0.1)";
            cellCtx.fillRect(0, (row - startRow) * rz, (endCol - startCol) * cz, rz);
            cellCtx.fillStyle = "white";
        }
    }

    // Selected columns
    for (var col = startCol; col < endCol; col++) {
        if ($.inArray(heatmap.cols.order[col], heatmap.cols.selected) > -1) {
            cellCtx.fillStyle = "rgba(0,0,0,0.1)";
            cellCtx.fillRect((col - startCol) * cz, 0, cz, (endRow - startRow) * rz);
            cellCtx.fillStyle = "white";
        }
    }

    // Paint details
    var details = $('table.heatmap div.detailsbox');
    if (heatmap.focus.col != undefined && heatmap.focus.row != undefined) {

        // Paint focus lines
        cellCtx.fillStyle = "#777777";
        cellCtx.fillRect((heatmap.focus.col - startCol) * cz, 0, 1, (endRow - startRow) * rz);
        cellCtx.fillRect((heatmap.focus.col - startCol + 1) * cz, 0, 1, (endRow - startRow) * rz);
        cellCtx.fillRect(0, (heatmap.focus.row - startRow) * rz, (endCol - startCol) * cz, 1);
        cellCtx.fillRect(0, (heatmap.focus.row - startRow + 1) * rz, (endCol - startCol) * cz, 1);
        cellCtx.fillStyle = "white";

        var boxTop = this.canvas.offset().top + ((heatmap.focus.row - heatmap.offset.top) * heatmap.rows.zoom);
        var boxLeft = this.canvas.offset().left + ((heatmap.focus.col - heatmap.offset.left) * heatmap.cols.zoom);

        heatmap.paintCellDetails(heatmap.focus.row, heatmap.focus.col, heatmap, boxTop, boxLeft, details);

    }  else {
        details.css('display', 'none');
    }

};

jheatmap.components.CellSelector = function(drawer, heatmap, container) {

    var div = $("<div class='selector'></div>");
    var selectCell = $("<select>").change(function () {
        heatmap.cells.selectedValue = $(this)[0].value;
        drawer.loading(function () {
            drawer.paint();
        });
    });
    div.append($("<span>Cells</span>"));
    div.append(selectCell);
    container.append(div);

    for (o = 0; o < heatmap.cells.header.length; o++) {
        if (heatmap.cells.header[o] == undefined) {
            continue;
        }
        selectCell.append(new Option(heatmap.cells.header[o], o, o == heatmap.cells.selectedValue));
    }
    selectCell.val(heatmap.cells.selectedValue);

};

jheatmap.components.ColumnAnnotationPanel = function(drawer, heatmap) {
    
    this.heatmap = heatmap;
    this.visible = (heatmap.cols.annotations.length > 0);
    
    this.markup = $("<tr class='annotations'>");

    var colAnnHeaderCell = $("<th>", {
        "class": "border-cols-ann"
    });
    this.canvasHeader = $("<canvas class='header' style='float:right;' width='200' height='" + heatmap.cols.annotationSize * heatmap.cols.annotations.length + "'></canvas>");
    colAnnHeaderCell.append(this.canvasHeader);
    this.markup.append(colAnnHeaderCell);
    this.canvasHeader.bind('contextmenu', function(e){
        return false;
    });

    var colAnnValuesCell = $("<th>");
    this.canvasBody = $("<canvas width='" + heatmap.size.width + "' height='" + heatmap.cols.annotationSize * heatmap.cols.annotations.length + "'></canvas>");
    colAnnValuesCell.append(this.canvasBody);
    this.markup.append(colAnnValuesCell);
    this.canvasBody.bind('contextmenu', function(e){
        return false;
    });

    // Events
    this.canvasBody.click(function (e) {

        var position = $(e.target).offset();
        var col = Math.floor((e.originalEvent.pageX - position.left) / heatmap.cols.zoom) + heatmap.offset.left;

        var details = $('table.heatmap div.detailsbox');
        var boxTop = e.pageY - $(heatmap.options.container).offset().top;
        var boxLeft = e.pageX - $(heatmap.options.container).offset().left;
        var boxWidth;
        var boxHeight;

        var boxHtml = "<dl class='dl-horizontal'>";

        for (var i = 0; i < heatmap.cols.annotations.length; i++) {
            var field = heatmap.cols.annotations[i];
            boxHtml += "<dt>" + heatmap.cols.header[field] + ":</dt><dd>";
            var val = heatmap.cols.getValue(col, field);
            if (!isNaN(val) && (val % 1 != 0)) {
                val = Number(val).toFixed(3);
            }
            boxHtml += val;
            boxHtml += "</dd>";
        }
        boxHtml += "</dl>";

        details.html(boxHtml);
        boxWidth = 300;
        boxHeight = 26 + heatmap.cols.annotations.length * 22;

        var wHeight = $(document).height();
        var wWidth = $(document).width();

        if (boxTop + boxHeight > wHeight) {
            boxTop -= boxHeight;
        }

        if (boxLeft + boxWidth > wWidth) {
            boxLeft -= boxWidth;
        }

        details.css('left', boxLeft);
        details.css('top', boxTop);
        details.css('width', boxWidth);
        details.css('height', boxHeight);

        details.css('display', 'block');
        details.bind('click', function () {
            $(this).css('display', 'none');
        });



    });

    this.canvasHeader.click(function (e) {
        var pos = $(e.target).offset();
        var i = Math.floor((e.pageY - pos.top) / heatmap.cols.annotationSize);
        heatmap.cols.sorter = new jheatmap.sorters.AnnotationSorter(heatmap.cols.annotations[i], !(heatmap.cols.sorter.asc));
        heatmap.cols.sorter.sort(heatmap, "columns");
        drawer.paint();
    });
};

jheatmap.components.ColumnAnnotationPanel.prototype.paint = function() {
    
    if (this.visible) {

        var heatmap = this.heatmap;
        var textSpacing = 5;
        var cz = heatmap.cols.zoom;
        var startCol = heatmap.offset.left;
        var endCol = heatmap.offset.right;
        
        var colAnnHeaderCtx = this.canvasHeader.get()[0].getContext('2d');
        colAnnHeaderCtx.clearRect(0, 0, colAnnHeaderCtx.canvas.width, colAnnHeaderCtx.canvas.height);
        colAnnHeaderCtx.fillStyle = "rgb(51,51,51)";
        colAnnHeaderCtx.textAlign = "right";
        colAnnHeaderCtx.textBaseline = "middle";
        colAnnHeaderCtx.font = "bold 11px Helvetica Neue,Helvetica,Arial,sans-serif";

        for (i = 0; i < heatmap.cols.annotations.length; i++) {
            var value = heatmap.cols.header[heatmap.cols.annotations[i]];
            colAnnHeaderCtx.fillText(value, colAnnHeaderCtx.canvas.width - 5 - textSpacing, (i * heatmap.cols.annotationSize) + (heatmap.cols.annotationSize / 2));

            // Order mark
            colAnnHeaderCtx.save();
            colAnnHeaderCtx.translate(colAnnHeaderCtx.canvas.width - 4, Math.round((i * heatmap.cols.annotationSize) + (heatmap.cols.annotationSize / 2)));
            colAnnHeaderCtx.rotate(-Math.PI / 4);
            if (heatmap.cols.sorter.field == heatmap.cols.annotations[i]) {
                jheatmap.components.OrderSymbol(colAnnHeaderCtx, heatmap.cols.sorter.asc);
            } else {
                if (heatmap.cols.annotationSize < 6) {
                    colAnnHeaderCtx.fillRect(-1, -1, 2, 2);
                } else {
                    colAnnHeaderCtx.fillRect(-2, -2, 4, 4);
                }
            }
            colAnnHeaderCtx.fillStyle = "black";
            colAnnHeaderCtx.restore();
        }

        var colAnnValuesCtx = this.canvasBody.get()[0].getContext('2d');
        colAnnValuesCtx.clearRect(0, 0, colAnnValuesCtx.canvas.width, colAnnValuesCtx.canvas.height);
        for (i = 0; i < heatmap.cols.annotations.length; i++) {
            for (var col = startCol; col < endCol; col++) {

                var field = heatmap.cols.annotations[i];
                value = heatmap.cols.getValue(col, field);

                if (value != null) {
                    var color = heatmap.cols.decorators[field].toColor(value);
                    colAnnValuesCtx.fillStyle = color;
                    colAnnValuesCtx.fillRect((col - startCol) * cz, i * heatmap.cols.annotationSize, cz, heatmap.cols.annotationSize);
                }
            }
        }

        for (var col = startCol; col < endCol; col++) {
            if ($.inArray(heatmap.cols.order[col], heatmap.cols.selected) > -1) {
                colAnnValuesCtx.fillStyle = "rgba(0,0,0,0.1)";
                colAnnValuesCtx.fillRect((col - startCol) * cz, 0, cz, heatmap.cols.annotations.length * heatmap.cols.annotationSize);
                colAnnValuesCtx.fillStyle = "white";
            }
        }
    }
};

jheatmap.components.ColumnHeaderPanel = function(drawer, heatmap) {

    this.heatmap = heatmap;

    // Calculate label size
    if (heatmap.cols.labelSize == undefined) {

    }

    // Create markup
    this.markup = $("<th>");
    this.canvas = $("<canvas class='header' id='colCanvas' width='" + heatmap.size.width + "' height='"+heatmap.cols.labelSize+"' tabindex='3'></canvas>");
    this.markup.append(this.canvas);

    // Context menu
    var menu = {
          selector: 'canvas',
          callback: function(key, options) {
              var action = heatmap.actions[key];
              if (action.columns != undefined) {
                  action.columns();
              }
          },
          items: {}
    }
    for (var key=0; key < heatmap.actions.length; key++) {
            var action = heatmap.actions[key];
            if (action.columns != undefined) {
                menu.items[key] = { name: action.title, icon: action.icon };
            }

            if (action instanceof jheatmap.actions.Separator) {
                menu.items[key] = "---------";
            }
    }
    this.markup.contextMenu(menu);
    this.canvas.bind('hold', function(e){
        e.gesture.preventDefault();
        $(this).contextMenu({ x: e.gesture.center.pageX, y: e.gesture.center.pageY });
    });

    // Event functions
    var eventTarget = this.canvas;

    var onKeyPress = function (e) {
        var charCode = e.which || e.keyCode;
        for (var key=0; key < heatmap.actions.length; key++) {
            var action = heatmap.actions[key];

            if (action.columns != undefined && action.shortCut != undefined && action.keyCodes.indexOf(charCode) != -1) {
                action.columns();
            }
        }
    };

    // Return true if the col is selected
    var isSelected = function(col) {
        return $.inArray(heatmap.cols.order[col], heatmap.cols.selected) > -1;
    };

     // Computes the relative to canvas x, y and the row
     var getCenter = function (e) {
           e.gesture.center.x = e.gesture.center.pageX - eventTarget.offset().left;
           e.gesture.center.y = e.gesture.center.pageY - eventTarget.offset().top;
           e.gesture.center.col = Math.floor(e.gesture.center.x / heatmap.cols.zoom) + heatmap.offset.left;
           return e.gesture.center;
     };

     // Select multiple rows or move the selected rows
     var firstCol;
     var firstX;
     var firstZoom;
     var doingPinch = false;
     var lastMovedCol = null;
     var movingSelection;

     this.canvas.bind('touch', function (e) {
         heatmap.focus.row = undefined;
         heatmap.focus.col = undefined;

         e.gesture.preventDefault();
         var center = getCenter(e);
         firstCol = center.col;
         firstX = center.x;
         firstZoom = heatmap.cols.zoom;

         lastMovedCol = firstCol;
         movingSelection = isSelected(firstCol);
     });
     this.canvas.bind('release', function (e) {
         doingPinch = false;
     });
     this.canvas.bind('drag', function (e) {
         e.gesture.preventDefault();

         if (doingPinch) {
             return;
         }

         var center = getCenter(e);

         if (firstCol == center.col) {
             return;
         }

         if (movingSelection) {
             var diff = center.col - lastMovedCol;
             if (diff != 0) {
                 if (diff > 0) {
                     for (var r=0; r < diff; r++) {
                        if ($.inArray(heatmap.cols.order[heatmap.cols.order.length - 1], heatmap.cols.selected) == -1) {
                            for (var i = heatmap.cols.order.length - 2; i >= 0; i--) {
                                var index = $.inArray(heatmap.cols.order[i], heatmap.cols.selected);
                                if (index != -1) {
                                    var nextCol = heatmap.cols.order[i + 1];
                                    heatmap.cols.order[i + 1] = heatmap.cols.order[i];
                                    heatmap.cols.order[i] = nextCol;
                                }
                            }
                        }
                     }
                 } else {
                     for (var r=0; r < -diff; r++) {
                        if ($.inArray(heatmap.cols.order[0], heatmap.cols.selected) == -1) {
                            for (var i = 1; i < heatmap.cols.order.length; i++) {
                                var index = $.inArray(heatmap.cols.order[i], heatmap.cols.selected);
                                if (index != -1) {
                                    var prevCol = heatmap.cols.order[i - 1];
                                    heatmap.cols.order[i - 1] = heatmap.cols.order[i];
                                    heatmap.cols.order[i] = prevCol;
                                }
                            }
                        }
                     }
                 }
                 lastMovedCol = center.col;
             }
         }
         else
         {
            heatmap.cols.selected = [];
            if (firstCol < center.col) {
                for (var i=firstCol; i<=center.col; i++) {
                    heatmap.cols.selected[heatmap.cols.selected.length] = heatmap.cols.order[i];
                }
            } else {
                for (var i=center.col; i<=firstCol; i++) {
                    heatmap.cols.selected[heatmap.cols.selected.length] = heatmap.cols.order[i];
                }
            }
         }

         drawer.paint();
     });

     this.canvas.bind('tap', function (e) {
         e.gesture.preventDefault();

        var center = getCenter(e);
        if (center.y > (heatmap.cols.labelSize - 10))
        {
            // Sort the col
            heatmap.rows.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, !(heatmap.rows.sorter.asc), true, [ heatmap.cols.order[center.col] ]);
            heatmap.rows.sorter.sort(heatmap, "rows");
        }
        else if (!isSelected(center.col))
        {
            // Select the row
            if (heatmap.cols.selected.length == 0) {
                heatmap.cols.selected = [ heatmap.cols.order[center.col] ];
            } else {
                heatmap.cols.selected = [];
            }
        }

        drawer.paint();
     });

     this.canvas.bind('doubletap', function(e) {
         e.gesture.preventDefault();

        var center = getCenter(e);
        if (isSelected(center.col))
        {
               heatmap.cols.selected = [];
        }

        drawer.paint();
     });

     var zoom = function(scale) {

          var nz = firstZoom * scale;
          nz = nz < 3 ? 3 : nz;
          nz = nz > 64 ? 64 : nz;

          if (nz != heatmap.cols.zoom) {
              heatmap.cols.zoom = Math.round(nz);
              heatmap.offset.left = firstCol - Math.floor(firstX / heatmap.cols.zoom);
          }

     };

     this.canvas.bind('pinch', function (e) {
         e.gesture.preventDefault();
         doingPinch = true;
         zoom(e.gesture.scale);
     });

     this.canvas.bind('transformend', function (e) {
        drawer.paint();
     });

     this.canvas.bind('mousewheel', function (e, delta, deltaX, deltaY) {
              e.preventDefault();

              if (e.shiftKey) {

                 // Zoom
                 firstZoom = heatmap.cols.zoom;
                 firstX = e.pageX - eventTarget.offset().left;
                 firstCol = Math.floor(firstX / heatmap.cols.zoom) + heatmap.offset.left;
                 var scale = delta > 0 ? 1 + (0.2 * delta) : 1 / (1 + (0.2 * -delta));
                 zoom(scale);

              } else {

	              // Normal speed
	              var momentum = Math.round(heatmap.size.width / (7 * heatmap.cols.zoom));

	              // Increase speed when user swipes the wheel (the increment depends on heatmap size).
	              momentum = Math.abs(delta) > 1 ? Math.round(heatmap.cols.values.length / (20*Math.abs(delta))) : momentum;

	              heatmap.offset.left = heatmap.offset.left - delta * momentum;

              }

              drawer.paint();
     });

     this.canvas.bind('mouseover', function(e) {
         drawer.handleFocus(e);
     });
     this.canvas.bind('mouseout', function(e) {
         drawer.handleFocus(e);
     });

     this.canvas.bind('keypress', function (e) {
         onKeyPress(e);
     });
};

jheatmap.components.ColumnHeaderPanel.prototype.paint = function() {

    var heatmap = this.heatmap;

    var cz = heatmap.cols.zoom;
    var textSpacing = 5;
    var startCol = heatmap.offset.left;
    var endCol = heatmap.offset.right;

    var canvas = this.canvas.get()[0];
    var colCtx = canvas.getContext('2d');

    // Bug clear canvas workaround
    androidBug39247 = function() {
      canvas.style.opacity = 0.99;
      setTimeout(function() {
      canvas.style.opacity = 1;
      }, 1);
    }

    colCtx.clearRect(0, 0, colCtx.canvas.width, colCtx.canvas.height);
    androidBug39247();

    colCtx.fillStyle = "black";
    colCtx.textAlign = "right";
    colCtx.textBaseline = "middle";
    colCtx.font = (cz > 12 ? 12 : cz) + "px Helvetica Neue,Helvetica,Arial,sans-serif";

    for (var c = startCol; c < endCol; c++) {
        var value = heatmap.cols.getValue(c, heatmap.cols.selectedValue);
        colCtx.save();
        colCtx.translate((c - startCol) * cz + (cz / 2), heatmap.cols.labelSize - 5);
        colCtx.rotate(Math.PI / 2);
        colCtx.fillText(value, -textSpacing, 0);
        colCtx.restore();

        // Order mark
        colCtx.save();
        colCtx.translate(Math.round(((c - startCol) * cz) + (cz / 2)), heatmap.cols.labelSize - 4)
        colCtx.rotate(Math.PI / 4);
        if (    (heatmap.rows.sorter.field == heatmap.cells.selectedValue) &&
            ($.inArray(heatmap.cols.order[c], heatmap.rows.sorter.indices) > -1)
            ) {
            jheatmap.components.OrderSymbol(colCtx, heatmap.rows.sorter.asc);
        } else {
            if (heatmap.cols.zoom < 6) {
                colCtx.fillRect(-1, -1, 2, 2);
            } else {
                colCtx.fillRect(-2, -2, 4, 4);
            }
        }
        colCtx.fillStyle = "black";
        colCtx.restore();

        if ($.inArray(heatmap.cols.order[c], heatmap.cols.selected) > -1) {
            colCtx.fillStyle = "rgba(0,0,0,0.1)";
            colCtx.fillRect((c - startCol) * cz, 0, cz, heatmap.cols.labelSize);
            colCtx.fillStyle = "black";
        }

        if (heatmap.search != null && value.toUpperCase().indexOf(heatmap.search.toUpperCase()) != -1) {
            colCtx.fillStyle = "rgba(255,255,0,0.3)";
            colCtx.fillRect((c - startCol) * cz, 0, cz, heatmap.cols.labelSize);
            colCtx.fillStyle = "black";
        }
    }

};

jheatmap.components.ColumnSelector = function(drawer, heatmap, container) {

    var div = $("<div class='selector'></div>");
    var selectCol = $("<select>").change(function () {
        heatmap.cols.selectedValue = $(this)[0].value;
        drawer.loading(function () {
            drawer.paint();
        });
    });
    div.append($("<span>Columns</span>"));
    div.append(selectCol);
    for (var o = 0; o < heatmap.cols.header.length; o++) {
        selectCol.append(new Option(heatmap.cols.header[o], o, o == heatmap.cols.selectedValue));
    }
    selectCol.val(heatmap.cols.selectedValue);
    container.append(div);

};

jheatmap.components.ControlsPanel = function(drawer, heatmap) {

    this.markup = $("<th>", {
        "class": "topleft"
    });

    jheatmap.components.DetailsPanel(this.markup);

    if (heatmap.controls.shortcuts) {
        jheatmap.components.HelpPanel(heatmap, this.markup);
    }

    if (heatmap.controls.filters) {
        jheatmap.components.FilterCheckBoxes(drawer, heatmap, this.markup);
    }

    if (heatmap.controls.columnSelector) {
        jheatmap.components.ColumnSelector(drawer, heatmap, this.markup);
    }

    if (heatmap.controls.rowSelector) {
        jheatmap.components.RowSelector(drawer, heatmap, this.markup);
    }

    if (heatmap.controls.cellSelector) {
        jheatmap.components.CellSelector(drawer, heatmap, this.markup);
    }
};

jheatmap.components.ControlsPanel.paint = function() {
    //TODO Update filter checkboxes
};

jheatmap.components.DetailsPanel = function(container) {
    container.append('<td><div class="detailsbox">cell details here</div></td>');
};

jheatmap.components.FilterCheckBoxes = function(drawer, heatmap, container) {
    jheatmap.components._FilterCheckBox(drawer, container, heatmap, "rows");
    jheatmap.components._FilterCheckBox(drawer, container, heatmap, "columns");
};

jheatmap.components._FilterCheckBox = function(drawer, container, heatmap, dimensionType) {

    var dimension = (dimensionType == "rows" ? heatmap.rows : heatmap.cols);

    // Add row filters
    for (var f=0; f < dimension.filters.values.length; f++) {
        var filterDef = dimension.filters.values[f];

        if ($.inArray(heatmap.cells.selectedValue, filterDef.visible) > -1) {

            var checkInput = $('<input type="checkbox">');
            if ($.inArray(heatmap.cells.selectedValue, filterDef.enabled)>-1) {
                checkInput.prop('checked', 'true');
            }
            checkInput.click(function () {
                var checkbox = $(this);
                drawer.loading(function () {
                    if (checkbox.is(':checked')) {
                        filterDef.enabled.push(heatmap.cells.selectedValue);
                    } else {
                        filterDef.enabled.remove(heatmap.cells.selectedValue);
                    }
                    dimension.filters.filter(heatmap, dimensionType);
                    dimension.sorter.sort(heatmap, dimensionType);

                    drawer.paint();
                });
            });

            container.append($('<div>', {
                'class': 'filter'
            }).append(checkInput).append($('<span>').html(filterDef.title)));

        }
    }
};

jheatmap.components.HelpPanel = function(heatmap, container) {

    var actionTips = "";
    for (var key=0; key < heatmap.actions.length; key++) {
        var action = heatmap.actions[key];

        if (action.shortCut != undefined) {
            actionTips += "<dt>"+action.shortCut+"</dt><dd>"+action.title+"</dd>";
        }
    }

    var touchActive = "";
    var compActive = "active"

    container.append(

        "<div class='shortcuts'><a href='#heatmap-details' data-toggle='details'><i style='font-size: 18px;' class='fa fa-question-circle'></i></a></div>" +
        "<div class='details hide' id='heatmap-details' tabindex='-1' role='dialog'>" +
        "<div class='details-header'><button type='button' class='close' data-dismiss='details'>&times;</button>" +
        "<h3>Heatmap controls</h3></div>" +
        "<div class='details-body'>" +

            "<ul class='nav nav-tabs'>" +
              "<li class='active'>" +
                "<a href='#comp' data-toggle='tab'>Computer</a>" +
              "</li>" +
              "<li><a href='#touch' data-toggle='tab'>Tablet</a></li>" +
            "</ul>" +

            "<div class='tab-content'> " +
                "<div id='comp' class='tab-pane " + compActive + "'>" +     
                    "<dl class='dl-horizontal'>" +
                    "<dd><strong>Controls:</strong></dd>" +
                        "<dt>Contextual menu</dt><dd>Left click on rows/columns</dd>" +
                        "<dt>Move heatmap</dt><dd>Mouse drag over cells or use mouse wheel</dd>" +
                        "<dt>Select rows/columns</dt><dd>Mouse drag over rows/columns</dd>" +
                        "<dt>Move selection</dt><dd>Mouse drag selected rows/columns</dd>" +
                        "<dt>Clear selection</dt><dd>Double click selection</dd>" +
                        "<dt>Zoom heatmap</dt><dd>Shift + mouse wheel over heatmap</dd>" +
                        "<dt>Zoom rows/columns</dt><dd>Shift + mouse wheel rows/columns</dd>" +
                    "</dl>" +   
                    "<dl class='dl-horizontal'>" +
                    "<dd><strong>Actions (place the mouse over rows or columns)</strong></dd>" +
                    actionTips +
                    "</dl>" +
                "</div>" +

                "<div id='touch' class='tab-pane " + touchActive + "'>" +        
                    "<dl class='dl-horizontal'>" +
                            "<dd><strong>Controls:</strong></dd>" +
                                "<dt>Contextual menu</dt><dd>Long tap rows/columns</dd>" +
                                "<dt>Move heatmap</dt><dd>Drag heatmap (one finger)</dd>" +
                                "<dt>Select rows/columns</dt><dd>Drag over rows/columns</dd>" +
                                "<dt>Move selection</dt><dd>Drag selected rows/columns</dd>" +
                                "<dt>Clear selection</dt><dd>Double tap selection</dd>" +
                                "<dt>Zoom heatmap</dt><dd>Pinch heatmap</dd>" +
                                "<dt>Zoom rows/columns</dt><dd>Pinch rows/columns</dd>" +
                            "</dl>" +   
                "</div>" +
            "</div>" +

        "</div>" +
        "<div class='details-footer'>" +
        "<button class='btn' data-dismiss='details'>Close</button>" +
        "</div>" +
        "</div>" 
        
    );

};

jheatmap.components.HorizontalScrollBar = function(drawer, heatmap) {

    this.heatmap = heatmap;

    // Create markup
    this.markup = $("<td class='borderT'>");
    this.canvas = $("<canvas class='header' width='" + heatmap.size.width + "' height='10'></canvas>");
    this.markup.append(this.canvas);
    this.canvas.bind('contextmenu', function(e){
        return false;
    });

    // Events
    var hScrollMouseDown = false;
    var vScrollDownOffset = 0;
    var scrollTarget = this.canvas;

    var onScrollClick = function (e) {
        var maxWidth = (heatmap.offset.right - heatmap.offset.left) * heatmap.cols.zoom;
        var iniX = Math.round(maxWidth * (heatmap.offset.left / heatmap.cols.order.length));
        var endX = Math.round(maxWidth * (heatmap.offset.right / heatmap.cols.order.length));
        var pX = e.pageX - $(e.target).offset().left - ((endX - iniX) / 2);
        pX = (pX < 0 ? 0 : pX);
        heatmap.offset.left = Math.round((pX / maxWidth) * heatmap.cols.order.length);
        drawer.paint();
    };

    var onScrollMouseDown = function (e) {
        e.preventDefault();

        var maxWidth = (heatmap.offset.right - heatmap.offset.left) * heatmap.cols.zoom;
        var iniX = Math.round(maxWidth * (heatmap.offset.left / heatmap.cols.order.length));
        var endX = Math.round(maxWidth * (heatmap.offset.right / heatmap.cols.order.length));

        vScrollDownOffset = scrollTarget.offset().left + iniX + ((endX - iniX) / 2) - e.pageX;

        hScrollMouseDown = true;
    };

    var onScrollMouseUp = function (e) {
        e.preventDefault();

        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
            return;
        }

        hScrollMouseDown = false;
        drawer.paint();
    };

    var onScrollMouseMove = function (e) {

        if (hScrollMouseDown) {
            var maxWidth = (heatmap.offset.right - heatmap.offset.left) * heatmap.cols.zoom;
            var iniX = Math.round(maxWidth * (heatmap.offset.left / heatmap.cols.order.length));
            var endX = Math.round(maxWidth * (heatmap.offset.right / heatmap.cols.order.length));
            var pX = e.pageX + vScrollDownOffset - scrollTarget.offset().left - ((endX - iniX) / 2);
            pX = (pX < 0 ? 0 : pX);
            heatmap.offset.left = Math.round((pX / maxWidth) * heatmap.cols.order.length);
            drawer.paint();
        }
    };


    // Bind events
    this.canvas.bind('click', function (e) {
        onScrollClick(e);
    });
    this.canvas.bind('mousedown', function (e) {
        onScrollMouseDown(e);
    });
    $(document).bind('mouseup', function (e) {
        onScrollMouseUp(e);
    });
    $(document).bind('mousemove', function (e) {
        onScrollMouseMove(e);
    });

};

jheatmap.components.HorizontalScrollBar.prototype.paint = function() {

    var heatmap = this.heatmap;

    var startCol = heatmap.offset.left;
    var endCol = heatmap.offset.right;

    var scrollHorCtx = this.canvas.get()[0].getContext('2d');
    scrollHorCtx.clearRect(0, 0, scrollHorCtx.canvas.width, scrollHorCtx.canvas.height)
    scrollHorCtx.fillStyle = "rgba(0,136,204,1)";
    var maxWidth = (endCol - startCol) * heatmap.cols.zoom;
    var iniX = Math.round(maxWidth * (startCol / heatmap.cols.order.length));
    var endX = Math.round(maxWidth * (endCol / heatmap.cols.order.length));
    scrollHorCtx.fillRect(iniX, 0, endX - iniX, 10);

};

jheatmap.components.OrderSymbol = function (ctx, asc) {
    ctx.fillStyle = "rgba(130,2,2,1)";
    ctx.beginPath();
    if (asc) {
        ctx.moveTo(-2, -2);
        ctx.lineTo(-2, 2);
        ctx.lineTo(2, -2);
        ctx.lineTo(-2, -2);
    } else {
        ctx.moveTo(2, 2);
        ctx.lineTo(-2, 2);
        ctx.lineTo(2, -2);
        ctx.lineTo(2, 2);
    }
    ctx.fill();
    ctx.closePath();
};

jheatmap.components.RowAnnotationPanel = function(drawer, heatmap) {

    this.heatmap = heatmap;
    this.span = (heatmap.cols.annotations.length > 0 ? 2 : 1);
    this.visible = (heatmap.rows.annotations.length > 0);

    // Create markup
    this.header = $("<th>", {'class': 'border-rows-ann','rowspan': this.span });
    this.headerCanvas = $("<canvas class='header' width='" + heatmap.rows.annotationSize * heatmap.rows.annotations.length + "' height='150'></canvas>");
    this.header.append(this.headerCanvas);
    this.headerCanvas.bind('contextmenu', function(e){
        return false;
    });

    this.body = $("<td class='borderL'>");
    this.bodyCanvas = $("<canvas width='" + heatmap.rows.annotations.length * heatmap.rows.annotationSize + "' height='" + heatmap.size.height + "'></canvas>");
    this.body.append(this.bodyCanvas);
    this.bodyCanvas.bind('contextmenu', function(e){
        return false;
    });

    // Bind events
    this.bodyCanvas.click(function (e) {

        var position = $(e.target).offset();
        var row = Math.floor((e.originalEvent.pageY - position.top) / heatmap.rows.zoom) + heatmap.offset.top;

        var details = $('table.heatmap div.detailsbox');
        var boxTop = e.pageY - $(heatmap.options.container).offset().top;
        var boxLeft = e.pageX - $(heatmap.options.container).offset().left;
        var boxWidth;
        var boxHeight;

        var boxHtml = "<dl class='dl-horizontal'>";

        for (var i = 0; i < heatmap.rows.annotations.length; i++) {
            var field = heatmap.rows.annotations[i];
            boxHtml += "<dt>" + heatmap.rows.header[field] + ":</dt><dd>";
            var val = heatmap.rows.getValue(row, field);
            if (!isNaN(val) && (val % 1 != 0)) {
                val = Number(val).toFixed(3);
            }
            boxHtml += val;
            boxHtml += "</dd>";
        }
        boxHtml += "</dl>";

        details.html(boxHtml);
        boxWidth = 300;
        boxHeight = 26 + heatmap.rows.annotations.length * 22;

        var wHeight = $(document).height();
        var wWidth = $(document).width();

        if (boxTop + boxHeight > wHeight) {
            boxTop -= boxHeight;
        }

        if (boxLeft + boxWidth > wWidth) {
            boxLeft -= boxWidth;
        }

        details.css('left', boxLeft);
        details.css('top', boxTop);
        details.css('width', boxWidth);
        details.css('height', boxHeight);

        details.css('display', 'block');
        details.bind('click', function () {
            $(this).css('display', 'none');
        });



    });


    this.headerCanvas.click(function (e) {
        var pos = $(e.target).offset();
        var i = Math.floor((e.pageX - pos.left) / heatmap.rows.annotationSize);

        heatmap.rows.sorter = new jheatmap.sorters.AnnotationSorter(heatmap.rows.annotations[i], !(heatmap.rows.sorter.asc));
        heatmap.rows.sorter.sort(heatmap, "rows");
        drawer.paint();
    });

};

jheatmap.components.RowAnnotationPanel.prototype.paint = function() {

    if (this.visible) {

        var heatmap = this.heatmap;
        var rz = heatmap.rows.zoom;
        var startRow = heatmap.offset.top;
        var endRow = heatmap.offset.bottom;

        var textSpacing = 5;
        var annRowHeadCtx = this.headerCanvas.get()[0].getContext('2d');
        
        annRowHeadCtx.clearRect(0, 0, annRowHeadCtx.canvas.width, annRowHeadCtx.canvas.height);
        annRowHeadCtx.fillStyle = "rgb(51,51,51)";
        annRowHeadCtx.textAlign = "right";
        annRowHeadCtx.textBaseline = "middle";
        annRowHeadCtx.font = "bold 11px Helvetica Neue,Helvetica,Arial,sans-serif";

        for (var i = 0; i < heatmap.rows.annotations.length; i++) {

            var value = heatmap.rows.header[heatmap.rows.annotations[i]];
            annRowHeadCtx.save();
            annRowHeadCtx.translate(i * heatmap.rows.annotationSize + (heatmap.rows.annotationSize / 2), 150);
            annRowHeadCtx.rotate(Math.PI / 2);
            annRowHeadCtx.fillText(value, -textSpacing - 5, 0);
            annRowHeadCtx.restore();

            // Order mark
            annRowHeadCtx.save();
            annRowHeadCtx.translate(Math.round((i * heatmap.rows.annotationSize) + (heatmap.rows.annotationSize / 2)), annRowHeadCtx.canvas.height - 4)
            annRowHeadCtx.rotate(Math.PI / 4);
            if (heatmap.rows.sorter.field == heatmap.rows.annotations[i]) {
                jheatmap.components.OrderSymbol(annRowHeadCtx, heatmap.rows.sorter.asc);
            } else {
                if (heatmap.rows.annotationSize < 6) {
                    annRowHeadCtx.fillRect(-1, -1, 2, 2);
                } else {
                    annRowHeadCtx.fillRect(-2, -2, 4, 4);
                }
            }
            annRowHeadCtx.fillStyle = "black";
            annRowHeadCtx.restore();

        }

        var rowsAnnValuesCtx = this.bodyCanvas.get()[0].getContext('2d');
        rowsAnnValuesCtx.clearRect(0, 0, rowsAnnValuesCtx.canvas.width, rowsAnnValuesCtx.canvas.height);
        for (var row = startRow; row < endRow; row++) {

            for (var i = 0; i < heatmap.rows.annotations.length; i++) {
                var field = heatmap.rows.annotations[i];
                var value = heatmap.rows.getValue(row, field);

                if (value != null) {
                    rowsAnnValuesCtx.fillStyle = heatmap.rows.decorators[field].toColor(value);
                    rowsAnnValuesCtx.fillRect(i * heatmap.rows.annotationSize, (row - startRow) * rz, heatmap.rows.annotationSize, rz);
                }

            }

            if ($.inArray(heatmap.rows.order[row], heatmap.rows.selected) > -1) {
                rowsAnnValuesCtx.fillStyle = "rgba(0,0,0,0.1)";
                rowsAnnValuesCtx.fillRect(0, (row - startRow) * rz, heatmap.rows.annotations.length * heatmap.rows.annotationSize, rz);
                rowsAnnValuesCtx.fillStyle = "white";
            }
        }
    }
};

jheatmap.components.RowHeaderPanel = function(drawer, heatmap) {

    this.heatmap = heatmap;

    // Create markup
    this.markup = $("<td>", {"class": "row" });
    this.canvas = $("<canvas class='header' width='" + heatmap.rows.labelSize + "' height='" + heatmap.size.height + "' tabindex='1'></canvas>");
    this.markup.append(this.canvas);

    // Context menu
    var menu = {
          selector: 'canvas',
          callback: function(key, options) {
              var action = heatmap.actions[key];
              if (action.rows != undefined) {
                  action.rows();
              }
          },
          items: {}
    }
    for (var key=0; key < heatmap.actions.length; key++) {
            var action = heatmap.actions[key];
            if (action.rows != undefined) {
                menu.items[key] = { name: action.title, icon: action.icon };
            }

            if (action instanceof jheatmap.actions.Separator) {
                menu.items[key] = "---------";
            }
    }
    this.markup.contextMenu(menu);
    this.canvas.bind('hold', function(e){
        e.gesture.preventDefault();
        $(this).contextMenu({ x: e.gesture.center.pageX, y: e.gesture.center.pageY });
    });

    // Event functions
	var eventTarget = this.canvas;

    // Return true if the row is selected
    var isSelected = function(row) {
        return $.inArray(heatmap.rows.order[row], heatmap.rows.selected) > -1;
    };

    // Computes the relative to canvas x, y and the row
    var getCenter = function (e) {
          e.gesture.center.x = e.gesture.center.pageX - eventTarget.offset().left;
          e.gesture.center.y = e.gesture.center.pageY - eventTarget.offset().top;
          e.gesture.center.row = Math.floor(e.gesture.center.y / heatmap.rows.zoom) + heatmap.offset.top;
          return e.gesture.center;
    };

    // Select multiple rows or move the selected rows
    var firstRow;
    var firstY;
    var firstZoom;
    var doingPinch = false;
    var lastMovedRow = null;
    var movingSelection;

    this.canvas.bind('touch', function (e) {
        heatmap.focus.row = undefined;
        heatmap.focus.col = undefined;

        e.gesture.preventDefault();
        var center = getCenter(e);
        firstRow = center.row;
        firstY = center.y;
        firstZoom = heatmap.rows.zoom;

        lastMovedRow = firstRow;
        movingSelection = isSelected(firstRow);
    });
    this.canvas.bind('release', function (e) {
        doingPinch = false;
    });

    this.canvas.bind('drag', function (e) {
        e.gesture.preventDefault();

        if (doingPinch) {
            return;
        }

        var center = getCenter(e);

        if (firstRow == center.row) {
            return;
        }

        if (movingSelection) {
            var diff = center.row - lastMovedRow;
            if (diff != 0) {
                if (diff > 0) {
                    for (var r=0; r < diff; r++) {
	                    if ($.inArray(heatmap.rows.order[heatmap.rows.order.length - 1], heatmap.rows.selected) == -1) {
	                        for (var i = heatmap.rows.order.length - 2; i >= 0; i--) {
	                            var index = $.inArray(heatmap.rows.order[i], heatmap.rows.selected);
	                            if (index != -1) {
	                                var nextRow = heatmap.rows.order[i + 1];
	                                heatmap.rows.order[i + 1] = heatmap.rows.order[i];
	                                heatmap.rows.order[i] = nextRow;
	                            }
	                        }
	                    }
                    }
                } else {
                    for (var r=0; r < -diff; r++) {
	                    if ($.inArray(heatmap.rows.order[0], heatmap.rows.selected) == -1) {
	                        for (var i = 1; i < heatmap.rows.order.length; i++) {
	                            var index = $.inArray(heatmap.rows.order[i], heatmap.rows.selected);
	                            if (index != -1) {
	                                var prevRow = heatmap.rows.order[i - 1];
	                                heatmap.rows.order[i - 1] = heatmap.rows.order[i];
	                                heatmap.rows.order[i] = prevRow;
	                            }
	                        }
	                    }
                    }
                }
                lastMovedRow = center.row;
            }
        }
        else
        {
			heatmap.rows.selected = [];
			if (firstRow < center.row) {
			    for (var i=firstRow; i<=center.row; i++) {
			        heatmap.rows.selected[heatmap.rows.selected.length] = heatmap.rows.order[i];
			    }
			} else {
			    for (var i=center.row; i<=firstRow; i++) {
			        heatmap.rows.selected[heatmap.rows.selected.length] = heatmap.rows.order[i];
			    }
			}
        }

        drawer.paint();
    });

    this.canvas.bind('tap', function (e) {
        e.gesture.preventDefault();

       var center = getCenter(e);
       if (center.x > (heatmap.rows.labelSize - 10))
       {
           // Sort the row
           heatmap.cols.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, !(heatmap.cols.sorter.asc), true, [heatmap.rows.order[center.row]])
           heatmap.cols.sorter.sort(heatmap, "columns");
       }
       else if (!isSelected(center.row))
       {
           // Select the row
           if (heatmap.rows.selected.length == 0) {
               heatmap.rows.selected = [ heatmap.rows.order[center.row] ];
           } else {
               heatmap.rows.selected = [];
           }
       }

       drawer.paint();
    });

    this.canvas.bind('doubletap', function(e) {
        e.gesture.preventDefault();

       var center = getCenter(e);
       if (isSelected(center.row))
       {
              heatmap.rows.selected = [];
       }

       drawer.paint();
    });

    var zoom = function(scale) {

        var nrz = firstZoom * scale;
        nrz = nrz < 3 ? 3 : nrz;
        nrz = nrz > 64 ? 64 : nrz;

        if (nrz != heatmap.rows.zoom) {
            heatmap.rows.zoom = Math.round(nrz);
            heatmap.offset.top = firstRow - Math.floor(firstY / heatmap.rows.zoom);
        }
    };

    this.canvas.bind('pinch', function (e) {
        e.gesture.preventDefault();
        doingPinch = true;
        zoom(e.gesture.scale)
    });

    this.canvas.bind('transformend', function (e) {
       drawer.paint();
    });

    this.canvas.bind('mousewheel', function (e, delta, deltaX, deltaY) {
         e.preventDefault();

         if (e.shiftKey) {

             // Zoom
             firstZoom = heatmap.rows.zoom;
             firstY = e.pageY - eventTarget.offset().top;
             firstRow = Math.floor(firstY / heatmap.rows.zoom) + heatmap.offset.top;
             var scale = delta > 0 ? 1 + (0.2 * delta) : 1 / (1 + (0.2 * -delta));
             zoom(scale);

         } else {
             // Scroll
             // Normal speed
	         var momentum = Math.round(heatmap.size.height / (7 * heatmap.rows.zoom));

	         // Increase speed when user swipes the wheel (the increment depends on heatmap size).
	         momentum = Math.abs(delta) > 1 ? Math.round(heatmap.rows.values.length / (20*Math.abs(delta))) : momentum;

	         heatmap.offset.top = heatmap.offset.top - delta * momentum;
	     }
         drawer.paint();
    });

    this.canvas.bind('mouseover', function(e) {
        drawer.handleFocus(e);
    });
    this.canvas.bind('mouseout', function(e) {
        drawer.handleFocus(e);
    });

    this.canvas.bind('keypress', function (e) {
        var charCode = e.which || e.keyCode;
        for (var key in heatmap.actions) {
            var action = heatmap.actions[key];

            if (action.rows != undefined && action.shortCut != undefined && action.keyCodes.indexOf(charCode) != -1) {
                action.rows();
            }
        }
    });



};

jheatmap.components.RowHeaderPanel.prototype.paint = function() {

    var heatmap = this.heatmap;

    var rz = heatmap.rows.zoom;
    var textSpacing = 5;
    var startRow = heatmap.offset.top;
    var endRow = heatmap.offset.bottom;

    var canvas = this.canvas.get()[0];
    var rowCtx = canvas.getContext('2d');

    // Bug clear canvas workaround
    androidBug39247 = function() {
      canvas.style.opacity = 0.99;
      setTimeout(function() {
      canvas.style.opacity = 1;
      }, 1);
    }

    rowCtx.clearRect(0, 0, rowCtx.canvas.width, rowCtx.canvas.height);
    androidBug39247();

    rowCtx.fillStyle = "black";
    rowCtx.textAlign = "right";
    rowCtx.textBaseline = "middle";
    rowCtx.font = (rz > 12 ? 12 : rz) + "px Helvetica Neue,Helvetica,Arial,sans-serif";

    for (var row = startRow; row < endRow; row++) {
        var value = heatmap.rows.getValue(row, heatmap.rows.selectedValue);
        rowCtx.fillText(value, (heatmap.rows.labelSize - 5) - textSpacing, ((row - startRow) * rz) + (rz / 2));

        // Order mark
        rowCtx.save();
        rowCtx.translate((heatmap.rows.labelSize - 4), ((row - startRow) * rz) + (rz / 2));
        rowCtx.rotate(-Math.PI / 4);
        if (    (heatmap.cols.sorter.field == heatmap.cells.selectedValue) &&
            ($.inArray(heatmap.rows.order[row], heatmap.cols.sorter.indices) > -1)
            ) {
            jheatmap.components.OrderSymbol(rowCtx, heatmap.cols.sorter.asc);
        } else {
            if (heatmap.rows.zoom < 6) {
                rowCtx.fillRect(-1, -1, 2, 2);
            } else {
                rowCtx.fillRect(-2, -2, 4, 4);
            }
        }
        rowCtx.fillStyle = "black";
        rowCtx.restore();


        if ($.inArray(heatmap.rows.order[row], heatmap.rows.selected) > -1) {
            rowCtx.fillStyle = "rgba(0,0,0,0.1)";
            rowCtx.fillRect(0, ((row - startRow) * rz), heatmap.rows.labelSize, rz);
            rowCtx.fillStyle = "black";
        }

        if (heatmap.search != null && value.toUpperCase().indexOf(heatmap.search.toUpperCase()) != -1) {
            rowCtx.fillStyle = "rgba(255,255,0,0.3)";
            rowCtx.fillRect(0, ((row - startRow) * rz), heatmap.rows.labelSize, rz);
            rowCtx.fillStyle = "black";
        }
    }

};

jheatmap.components.RowSelector = function(drawer, heatmap, container) {

    var div = $("<div class='selector'></div>");
    var selectRow = $("<select>").change(function () {
        heatmap.rows.selectedValue = $(this)[0].value;
        drawer.loading(function () {
            drawer.paint();
        });
    });
    div.append($("<span>Rows</span>"));
    div.append(selectRow);
    container.append(div);

    var o;
    for (o = 0; o < heatmap.rows.header.length; o++) {
        selectRow.append(new Option(heatmap.rows.header[o], o, o == heatmap.rows.selectedValue));
    }
    selectRow.val(heatmap.rows.selectedValue);

};

jheatmap.components.VerticalScrollBar = function(drawer, heatmap) {

    this.heatmap = heatmap;

    // Create markup
    this.markup = $("<td class='borderL'>");
    this.canvas = $("<canvas class='header' width='10' height='" + heatmap.size.height + "'></canvas>");
    this.markup.append(this.canvas);
    this.canvas.bind('contextmenu', function(e){
        return false;
    });

    // Events
    var vScrollMouseDown = false;
    var vScrollDownOffset = 0;
    var scrollTarget = this.canvas;

    var onScrollClick = function (e) {
        var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
        var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
        var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

        var pY = e.pageY - $(e.target).offset().top - ((endY - iniY) / 2);
        pY = (pY < 0 ? 0 : pY);
        heatmap.offset.top = Math.round((pY / maxHeight) * heatmap.rows.order.length);
        drawer.paint();
    };

    var onScrollMouseDown = function (e) {
        e.preventDefault();

        vScrollMouseDown = true;

        var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
		var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
		var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

        vScrollDownOffset = scrollTarget.offset().top + iniY + ((endY - iniY) / 2) - e.pageY;

    }

    var onScrollMouseUp = function (e) {

        if (vScrollMouseDown) {
	        e.preventDefault();

	        if (e.originalEvent.touches && e.originalEvent.touches.length > 1) {
	            return;
	        }

	        drawer.paint();
	        vScrollMouseDown = false;
        }
    }


    var onScrollMouseMove = function (e) {

        if (vScrollMouseDown) {
            var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
            var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
            var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));

            var pY = e.pageY + vScrollDownOffset - scrollTarget.offset().top - ((endY - iniY) / 2);
            pY = (pY < 0 ? 0 : pY);
            heatmap.offset.top = Math.round((pY / maxHeight) * heatmap.rows.order.length);
            drawer.paint();
        }

    }

    // Bind events
    this.canvas.bind('click', function (e) {
        onScrollClick(e);
    });
    this.canvas.bind('mousedown', function (e) {
        onScrollMouseDown(e);
    });
    $(document).bind('mouseup', function (e) {
            onScrollMouseUp(e);
    });
    $(document).bind('mousemove', function (e) {
        onScrollMouseMove(e);
    });

};

jheatmap.components.VerticalScrollBar.prototype.paint = function() {
    var heatmap = this.heatmap;
    var maxHeight = (heatmap.offset.bottom - heatmap.offset.top) * heatmap.rows.zoom;
    var iniY = Math.round(maxHeight * (heatmap.offset.top / heatmap.rows.order.length));
    var endY = Math.round(maxHeight * (heatmap.offset.bottom / heatmap.rows.order.length));
    var scrollVertCtx = this.canvas.get()[0].getContext('2d');
    scrollVertCtx.clearRect(0, 0, scrollVertCtx.canvas.width, scrollVertCtx.canvas.height)
    scrollVertCtx.fillStyle = "rgba(0,136,204,1)";
    scrollVertCtx.fillRect(0, iniY, 10, endY - iniY);
};
/**
 *
 * Heatmap interactive viewer
 *
 * @author Jordi Deu-Pons
 * @class
 */
jheatmap.Heatmap = function (options) {

    /**
     * User configuration
     *
     * @type {*|{}}
     */
    this.options = options || {};

    /**
     * Sets the controls visibility.
     *
     * @type {{shortcuts: boolean, filters: boolean, columnSelector: boolean, rowSelector: boolean, cellSelector: boolean, poweredByJHeatmap: boolean}}
     */
    this.controls = {
        "shortcuts" : true,
        "filters": true,
        "columnSelector": true,
        "rowSelector": true,
        "cellSelector": true,
        "poweredByJHeatmap": true
    };

    this.actions = [
        new jheatmap.actions.HideSelected(this),
        new jheatmap.actions.ShowHidden(this),
        new jheatmap.actions.InvertSelection(this),
        new jheatmap.actions.ClearSelection(this),
        new jheatmap.actions.Separator(),
        new jheatmap.actions.AggregationSort(this),
        new jheatmap.actions.Separator(),
        new jheatmap.actions.CopyToClipboard(this)
    ];

    /**
     * Size of the cells panel
     *
     * @type {jheatmap.HeatmapSize}
     */
    this.size = new jheatmap.HeatmapSize(this);

    /**
     * Position of the first cell on the top left corner
     *
     * @property {number}   top     - Position of the first row to show on the top of the heatmap
     * @property {number}   left    - Position of the first column to show on the left of the heatmap
     */
    this.offset = {
        top:0,
        left:0
    };

    /**
     * The cell focused for details.
     */
    this.focus = {
        row: undefined,
        col: undefined
    }

    /**
     * Current search string to highlight matching rows and columns.
     * Default 'null' means no search.
     */
    this.search = null;

    /**
     * Heatmap rows
     *
     * @type {jheatmap.HeatmapDimension}
     */
    this.rows = new jheatmap.HeatmapDimension(this);

    /**
     * Heatmap columns
     *
     * @type {jheatmap.HeatmapDimension}
     */
    this.cols = new jheatmap.HeatmapDimension(this);

    /**
     * Heatmap cells
     *
     * @type {jheatmap.HeatmapCells}
     */
    this.cells = new jheatmap.HeatmapCells(this);

    /**
     * Initialize the Heatmap
     */
    this.init = function () {

        this.rows.init();
        this.cols.init();
        this.cells.init();
        this.size.init();

        // Call user init function
        if (this.options.init != undefined) {
            this.options.init(this);
        }

        // Reindex configuration. Needed to let the user use position or header id interchangeably
        this.rows.reindex(this);
        this.cols.reindex(this);
        this.cells.reindex(this);

        // Filter
        this.rows.filters.filter(this, "rows");
        this.cols.filters.filter(this, "columns");

        // Sort
        this.rows.sorter.sort(this, "rows");
        this.cols.sorter.sort(this, "columns");

        // Build & paint
        this.drawer = new jheatmap.HeatmapDrawer(this);
        this.drawer.build();
        this.drawer.paint();

    };

    /**
     * Paint the cell popup on click.
     *
     * @param row       selected row
     * @param col       selected col
     * @param heatmap   the heatmap object
     * @param boxTop    top position of the details div
     * @param boxLeft   left position of the details div
     * @param details   default details div
     */
    this.paintCellDetails = function(row, col, heatmap, boxTop, boxLeft, details) {

        var value = heatmap.cells.getValues(row, col);

        if (value != null) {

            var boxWidth;
            var boxHeight;

            var boxHtml = "<dl class='dl-horizontal'>";
            boxHtml += "<dt>Column</dt><dd>" + heatmap.cols.getValue(col, heatmap.cols.selectedValue) + "</dd>";
            boxHtml += "<dt>Row</dt><dd>" + heatmap.rows.getValue(row, heatmap.rows.selectedValue) + "</dd>";
            boxHtml += "<hr />";
            for (var i = 0; i < heatmap.cells.header.length; i++) {
                if (heatmap.cells.header[i] == undefined) {
                    continue;
                }
                boxHtml += "<dt>" + heatmap.cells.header[i] + ":</dt><dd>";
                var val = value[i];
                if (!isNaN(val) && (val % 1 != 0)) {
                    val = Number(val).toFixed(3);
                }
                boxHtml += val;
                boxHtml += "</dd>";
            }
            boxHtml += "</dl>";

            details.html(boxHtml);
            boxWidth = 300;
            boxHeight = 70 + (heatmap.cells.header.length * 25);


            var wHeight = $(document).height();
            var wWidth = $(document).width();

            if (boxTop + boxHeight > wHeight) {
                boxTop -= boxHeight;
                boxTop -= heatmap.rows.zoom;
            } else {
                boxTop += heatmap.rows.zoom;
            }

            if (boxLeft + boxWidth > wWidth) {
                boxLeft -= boxWidth;
                boxLeft -= heatmap.cols.zoom;
            } else {
                boxLeft += heatmap.cols.zoom;
            }

            details.css('left', boxLeft);
            details.css('top', boxTop);
            details.css('width', boxWidth);
            details.css('height', boxHeight);

            details.css('display', 'block');

            details.bind('tap', function () {
                heatmap.focus.col = undefined;
                heatmap.focus.row = undefined;
                $(this).css('display', 'none');
            });

            var top, left;
            details.bind('touch', function(e) {
                e.gesture.preventDefault();
                top = e.gesture.center.pageY;
                left = e.gesture.center.pageX;
            });

            details.bind('drag', function (e) {
                e.gesture.preventDefault();
                details.css('left', boxLeft + (e.gesture.center.pageX - left));
                details.css('top', boxTop + (e.gesture.center.pageY - top));
            });
        } else {
            details.css('display', 'none');
        }
    };

};
/**
 *
 * Heatmap cells
 *
 * @class
 */
jheatmap.HeatmapCells = function (heatmap) {

    /**
     * The heatmap
     *
     * @type {jheatmap.Heatmap}
     */
    this.heatmap = heatmap;

    /**
     * Header of the multiple cell values
     * @type {Array}
     */
    this.header = [];

    /**
     * Array of arrays with all the cell values (one array per cell)
     * @type {Array}
     */
    this.values = [];

    /**
     * Index of the current visible cell field (zero it's the first)
     * @type {number}
     */
    this.selectedValue = 0;

    /**
     * Decorators for the cell fields
     * @type {Array}
     */
    this.decorators = [];

    /**
     * Aggregators for the cell fields
     * @type {Array}
     */
    this.aggregators = []

};

jheatmap.HeatmapCells.prototype.init = function () {

    // Initialize decorators & aggregators
    var f;
    var defaultDecorator = new jheatmap.decorators.Linear();
    var defaultAggregator = new jheatmap.aggregators.Addition();
    for (f = 0; f < this.header.length; f++) {
        this.decorators[f] = defaultDecorator;
        this.aggregators[f] = defaultAggregator;
    }

    for (f = 0; f < this.header.length; f++) {
        if (this.header[f] != undefined) {
            this.selectedValue = f;
            break;
        }
    }

};

jheatmap.HeatmapCells.prototype.reindex = function () {
    jheatmap.utils.reindexArray(this.decorators, this.header);
    jheatmap.utils.reindexArray(this.aggregators, this.header);
    this.selectedValue = jheatmap.utils.reindexField(this.selectedValue, this.header);
};

/**
 * Get cell value
 *
 * @param row   Row position
 * @param col   Column position
 * @param field Field position
 * @return The cell value
 */
jheatmap.HeatmapCells.prototype.getValue = function (row, col, field) {

    var value = this.getValues(row, col);

    if (value == null) {
        return null;
    }

    return value[field];
};

/**
 * Get cell values
 *
 * @param row   Row position
 * @param col   Column position
 * @return The cell values array
 */
jheatmap.HeatmapCells.prototype.getValues = function(row, col) {

    var cl = this.heatmap.cols.values.length;
    var pos = this.heatmap.rows.order[row] * cl + this.heatmap.cols.order[col];

    var value = this.values[pos];

    return value;
};
/**
 *
 * Heatmap dimension
 *
 * @class
 */
jheatmap.HeatmapDimension = function (heatmap) {

    /**
     * Height in pixels of one cell (default 12)
     * @type {number}
     */
    this.zoom = 12;

    /**
     * Height or width in pixels of the label canvas.
     *
     * @type {number}
     */
    this.labelSize = 230;

    /**
     * Header of the items values
     * @type {Array}
     */
    this.header = [];

    /**
     * Array with all the items values and annotations (one array per line)
     * @type {Array}
     */
    this.values = [];

    /**
     * Array of index of the visible values sorted as current order
     * @type {Array}
     */
    this.order = [];

    /**
     * Index of the current visible row label (zero it's the first)
     * @type {number}
     */
    this.selectedValue = 0;

    /**
     * type: Type of sort ('none', 'label', 'single' or 'value')
     * field: Index of the field that we are sorting
     * asc: true if ascending order, false if descending
     *
     * @type {jheatmap.sorters.DefaultSorter}
     */
    this.sorter = new jheatmap.sorters.DefaultSorter();

    /**
     * Active user filters on items
     * @type {jheatmap.HeatmapFilters}
     */
    this.filters = new jheatmap.HeatmapFilters(heatmap);

    /**
     * Decorators for the items fields
     * @type {Array}
     */
    this.decorators = [];

    /**
     * Array with the index of the items fields to show as annotations
     * @type {Array}
     */
    this.annotations = [];

    /**
     * Height or width in pixels of each annotation cell.
     * @type {number}
     */
    this.annotationSize = 10;

    /**
     *
     * Index of the selected items
     *
     * @type {Array}
     */
    this.selected = [];

};

jheatmap.HeatmapDimension.prototype.init = function () {

    // Initialize order array
    this.order = [];
    var i;
    for (i = 0; i < this.values.length; i++) {
        this.order[this.order.length] = i;
    }

    // Initialize default decorator
    var defaultDecorator = new jheatmap.decorators.Constant({});
    for (c = 0; c < this.header.length; c++) {
        this.decorators[c] = defaultDecorator;
    }

};

jheatmap.HeatmapDimension.prototype.reindex = function (heatmap) {

    jheatmap.utils.reindexArray(this.decorators, this.header);
    jheatmap.utils.reindexArray(this.aggregators, this.header);
    jheatmap.utils.convertToIndexArray(this.annotations, this.header);

    var key;
    for(key in this.filters) {
        jheatmap.utils.convertToIndexArray(this.filters[key].fields, heatmap.cells.header);
    }

    this.sorter.field = jheatmap.utils.reindexField(this.sorter.field, heatmap.cells.header);
    this.selectedValue = jheatmap.utils.reindexField(this.selectedValue, this.header);

};

jheatmap.HeatmapDimension.prototype.getValue = function (col, field) {
    return this.values[this.order[col]][field];
};

/**
 *
 * Heatmap drawer.
 *
 * @author Jordi Deu-Pons
 * @class
 */
jheatmap.HeatmapDrawer = function (heatmap) {

    var drawer = this;
    var container = heatmap.options.container;

    // Components
    var controlPanel = new jheatmap.components.ControlsPanel(drawer, heatmap);
    var columnHeaderPanel = new jheatmap.components.ColumnHeaderPanel(drawer, heatmap);
    var columnAnnotationPanel = new jheatmap.components.ColumnAnnotationPanel(drawer, heatmap);
    var rowHeaderPanel = new jheatmap.components.RowHeaderPanel(drawer, heatmap);
    var rowAnnotationPanel = new jheatmap.components.RowAnnotationPanel(drawer, heatmap);
    var cellsBodyPanel = new jheatmap.components.CellBodyPanel(drawer, heatmap);
    var verticalScrollBar = new jheatmap.components.VerticalScrollBar(drawer, heatmap);
    var horizontalScrollBar = new jheatmap.components.HorizontalScrollBar(drawer, heatmap);

    /**
     * Build the heatmap.
     */
    this.build = function () {

        // Reset
        container.html('');

        var table = $("<table>", { "class": "heatmap"});
        var firstRow = $("<tr>");
        table.append(firstRow);

        firstRow.append(controlPanel.markup);

        firstRow.append(columnHeaderPanel.markup);

        if (rowAnnotationPanel.visible) {
            firstRow.append(rowAnnotationPanel.header);
        }
        firstRow.append($("<th>", {'class': 'border', 'rowspan': rowAnnotationPanel.span }));
        firstRow.append($("<th>", {'class': 'border', 'rowspan': rowAnnotationPanel.span }));

        if (columnAnnotationPanel.visible) {
            table.append(columnAnnotationPanel.markup);
        }

        // Add left border
        var tableRow = $('<tr>');
        tableRow.append(rowHeaderPanel.markup);
        tableRow.append(cellsBodyPanel.markup);

        if (rowAnnotationPanel.visible) {
            tableRow.append(rowAnnotationPanel.body);
        }

        tableRow.append(verticalScrollBar.markup);
        tableRow.append("<td class='borderL'>&nbsp;</td>");
        table.append(tableRow);

	    var poweredBy = "";
	    if (heatmap.controls.poweredByJHeatmap) {
	        poweredBy = "<span>powered by <a href='http://jheatmap.github.io/jheatmap' target='_blank'>jHeatmap</a></span>";
	    }

        var scrollRow = $("<tr class='horizontalScroll'>");
        scrollRow.append("<td class='border' style='font-size: 9px; vertical-align: right; padding-left: 10px; padding-top: 6px;'>" + poweredBy + "</td>");

        scrollRow.append(horizontalScrollBar.markup);
        scrollRow.append("<td class='border'></td>");

        if (heatmap.rows.annotations.length > 0) {
            scrollRow.append("<td class='border'></td>");
        }

        scrollRow.append("<td class='border'></td>");
        table.append(scrollRow);

        // Last border row
        var lastRow = $('<tr>');
        lastRow.append($("<td class='border'>").append($('<span>&nbsp;</span>')));
        lastRow.append("<td class='borderT'></td>");
        if (heatmap.rows.annotations.length > 0) {
            lastRow.append("<td class='border'></td>");
        }
        lastRow.append("<td class='border'></td>");
        lastRow.append("<td class='border'></td>");
        table.append(lastRow);
        container.append(table);
        $('#heatmap-loader').hide();
        $('.detailsbox').hammer({
             tap_always: false,
             swipe: false
         });
        $('canvas').hammer({
            tap_always: false,
            swipe: false
        });

    };

    /**
     * Paint the heatmap.
     */
    this.paint = function () {

        // Minimum zooms
        var mcz = Math.max(3, Math.round(heatmap.size.width / heatmap.cols.order.length));
        var mrz = Math.max(3, Math.round(heatmap.size.height / heatmap.rows.order.length));

        // Zoom columns
        var cz = heatmap.cols.zoom;
        cz = cz < mcz ? mcz : cz;
        cz = cz > 64 ? 64 : cz;
        heatmap.cols.zoom = cz;

        // Zoom rows
        var rz = heatmap.rows.zoom;
        rz = rz < mrz ? mrz : rz;
        rz = rz > 64 ? 64 : rz;
        heatmap.rows.zoom = rz;

        var maxCols = Math.min(heatmap.cols.order.length, Math.round(heatmap.size.width / cz) + 1);
        var maxRows = Math.min(heatmap.rows.order.length, Math.round(heatmap.size.height / rz) + 1);

        var top = heatmap.offset.top;
        if (top < 0) {
            top = 0;
        }
        if (top > (heatmap.rows.order.length - maxRows + 1)) {
            top = (heatmap.rows.order.length - maxRows + 1);
        }
        heatmap.offset.top = top;

        var left = heatmap.offset.left;
        if (left < 0) {
            left = 0;
        }
        if (left > (heatmap.cols.order.length - maxCols + 1)) {
            left = (heatmap.cols.order.length - maxCols + 1);
        }
        heatmap.offset.left = left;

        heatmap.offset.bottom = Math.min(heatmap.offset.top + maxRows, heatmap.rows.order.length);
        heatmap.offset.right = Math.min(heatmap.offset.left + maxCols, heatmap.cols.order.length);

        // Column headers panel
        columnHeaderPanel.paint();

        // Rows headers
        rowHeaderPanel.paint();

        // Row annotations
        rowAnnotationPanel.paint();

        // Columns annotations
        columnAnnotationPanel.paint();

        // Cells
        cellsBodyPanel.paint();

        // Vertical scroll
        verticalScrollBar.paint();

        // Horizontal scroll
        horizontalScrollBar.paint();

    };

    /**
     * Show loading image while running 'runme'
     *
     * @param runme Function to execute
     */
    this.loading = function (runme) {
        $('#heatmap-loader').show();
        var interval = window.setInterval(function () {
            runme.call(this);
            $('#heatmap-loader').hide();
            window.clearInterval(interval);
        }, 1);
    };

    /**
     *
     * @param e
     * @returns {boolean}
     */
    this.handleFocus = function (e) {

        if (e.type == 'mouseover') {
            e.target.focus();
            return false;
        } else if (e.type == 'mouseout') {
            e.target.blur();
            return false;
        }

        return true;
    };

};
/**
 *
 * Class to manage all the dimension filters.
 *
 * @class
 */
jheatmap.HeatmapFilters = function (heatmap) {
    this.values = [];
    this.heatmap = heatmap;
}

jheatmap.HeatmapFilters.prototype.add = function(title, filter, enabledFields, visibleFields) {

    jheatmap.utils.convertToIndexArray(enabledFields, this.heatmap.cells.header);
    jheatmap.utils.convertToIndexArray(visibleFields, this.heatmap.cells.header);

    this.values[this.values.length] = {
        title : title,
        filter : filter,
        enabled : enabledFields,
        visible : visibleFields
    }
};

/**
 * Apply all the active filters on the rows.
 */
jheatmap.HeatmapFilters.prototype.filter = function (heatmap, filterType) {

    var rowsSort = (filterType=="rows");
    var filterDimension = (rowsSort ? heatmap.rows : heatmap.cols);
    var otherDimension = (rowsSort ? heatmap.cols : heatmap.rows);
    var cl = heatmap.cols.values.length;
    var filtered = false;
    var r;

    filterDimension.order = [];
    nextRow: for (r = 0; r < filterDimension.values.length; r++) {
        for (var field = 0; field < heatmap.cells.header.length; field++) {

            // Get all other dimension values
            var values = [];
            for (var c = 0; c < otherDimension.values.length; c++) {
                var pos = (rowsSort ? r * cl + c : c * cl + r);
                var value = heatmap.cells.values[pos];

                if (value != undefined) {
                    values[values.length] = value[field];
                }
            }

            // Filters
            for (var f=0; f < filterDimension.filters.values.length; f++) {
                var filterDef = filterDimension.filters.values[f];

                if ($.inArray(field, filterDef.enabled) > -1) {
                    filtered = true;
                    if (filterDef.filter.filter(values)) {
                        // This filter is filtering this row, so skip it.
                        continue nextRow;
                    }
                }
            }
        }

        filterDimension.order[filterDimension.order.length] = r;
    }

};
/**
 *
 * Heatmap size
 *
 * @class
 */
jheatmap.HeatmapSize = function (heatmap) {


    /**
     * Heatmap width in pixels
     *
     * @type {number}
     */
    this.width = 400;

    /**
     * Header of the items values
     *
     * @type {number}
     */
    this.height = 400;

    this.heatmap = heatmap;

};

jheatmap.HeatmapSize.prototype.init = function () {

    var top = this.heatmap.options.container.offset().top;
    this.heatmap.options.container.css("overflow", "hidden");
    var wHeight = $(window).height();

    this.width = this.heatmap.options.container.width() - 290;
    this.height = wHeight - top - 291;

    // Check a minimum width
    if (this.width < 100) {
        this.width = 200;
    }

    // Check a maximum width
    var maxWidth = (this.heatmap.cols.values.length * this.heatmap.cols.zoom);
    if (this.width > maxWidth) {
        this.width = maxWidth;
    }

    // Check minimum height
    if (this.height < 100) {
        if (wHeight > 500) {
            this.height = wHeight - 250;
        } else {
            this.height = 200;
        }
    }

    // Check maximum height
    var maxHeight = (this.heatmap.rows.values.length * this.heatmap.rows.zoom);
    if (this.height > maxHeight) {
        this.height = maxHeight;
    }
};
/* =========================================================
 * bootstrap-details.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#detailss
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Details = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="details"]', 'click.dismiss.details', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.details-body').load(this.options.remote)
  }

  Details.prototype = {

      constructor: Details

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move detailss dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.details')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideDetails()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.details', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.details', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.details')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideDetails()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideDetails()
        })
      }

    , hideDetails: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="details-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.details

  $.fn.details = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('details')
        , options = $.extend({}, $.fn.details.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('details', (data = new Details(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.details.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.details.Constructor = Details


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.details.noConflict = function () {
    $.fn.details = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.details.data-api', '[data-toggle="details"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('details') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .details(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);



!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);


/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
    'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
    return new Hammer.Instance(element, options || {});
};

// default settings
Hammer.defaults = {
    // add styles and attributes to the element to prevent the browser from doing
    // its native behavior. this doesnt prevent the scrolling, but cancels
    // the contextmenu, tap highlighting etc
    // set to false to disable this
    stop_browser_behavior: {
		// this also triggers onselectstart=false for IE
        userSelect: 'none',
		// this makes the element blocking in IE10 >, you could experiment with the value
		// see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
        touchAction: 'none',
		touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)'
    }

    // more settings are defined per gesture at gestures.js
};

// detect touchevents
Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Hammer.event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// direction defines
Hammer.DIRECTION_DOWN = 'down';
Hammer.DIRECTION_LEFT = 'left';
Hammer.DIRECTION_UP = 'up';
Hammer.DIRECTION_RIGHT = 'right';

// pointer type
Hammer.POINTER_MOUSE = 'mouse';
Hammer.POINTER_TOUCH = 'touch';
Hammer.POINTER_PEN = 'pen';

// touch event defines
Hammer.EVENT_START = 'start';
Hammer.EVENT_MOVE = 'move';
Hammer.EVENT_END = 'end';

// hammer document where the base events are added at
Hammer.DOCUMENT = document;

// plugins namespace
Hammer.plugins = {};

// if the window events are set...
Hammer.READY = false;

/**
 * setup events to detect gestures on the document
 */
function setup() {
    if(Hammer.READY) {
        return;
    }

    // find what eventtypes we add listeners to
    Hammer.event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    for(var name in Hammer.gestures) {
        if(Hammer.gestures.hasOwnProperty(name)) {
            Hammer.detection.register(Hammer.gestures[name]);
        }
    }

    // Add touch events on the document
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
}

/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    this.element = element;

    // start/stop detection option
    this.enabled = true;

    // merge options
    this.options = Hammer.utils.extend(
        Hammer.utils.extend({}, Hammer.defaults),
        options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.stop_browser_behavior) {
        Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
    }

    // start detection on touchstart
    Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
        if(self.enabled) {
            Hammer.detection.startDetect(self, ev);
        }
    });

    // return instance
    return this;
};


Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    on: function onEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.addEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * unbind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    off: function offEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.removeEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * trigger gesture event
     * @param   {String}      gesture
     * @param   {Object}      eventData
     * @returns {Hammer.Instance}
     */
    trigger: function triggerEvent(gesture, eventData){
        // create DOM event
        var event = Hammer.DOCUMENT.createEvent('Event');
		event.initEvent(gesture, true, true);
		event.gesture = eventData;

        // trigger on the target if it is in the instance element,
        // this is for event delegation tricks
        var element = this.element;
        if(Hammer.utils.hasParent(eventData.target, element)) {
            element = eventData.target;
        }

        element.dispatchEvent(event);
        return this;
    },


    /**
     * enable of disable hammer.js detection
     * @param   {Boolean}   state
     * @returns {Hammer.Instance}
     */
    enable: function enable(state) {
        this.enabled = state;
        return this;
    }
};

/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;


/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var enable_detect = false;


/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


Hammer.event = {
    /**
     * simple addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        type
     * @param   {Function}      handler
     */
    bindDom: function(element, type, handler) {
        var types = type.split(' ');
        for(var t=0; t<types.length; t++) {
            element.addEventListener(types[t], handler, false);
        }
    },


    /**
     * touch events with mouse fallback
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Function}      handler
     */
    onTouch: function onTouch(element, eventType, handler) {
		var self = this;

        this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
            var sourceEventType = ev.type.toLowerCase();

            // onmouseup, but when touchend has been fired we do nothing.
            // this is for touchdevices which also fire a mouseup on touchend
            if(sourceEventType.match(/mouse/) && touch_triggered) {
                return;
            }

            // mousebutton must be down or a touch event
            else if( sourceEventType.match(/touch/) ||   // touch events are always on screen
                sourceEventType.match(/pointerdown/) || // pointerevents touch
                (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
            ){
                enable_detect = true;
            }

            // we are in a touch event, set the touch triggered bool to true,
            // this for the conflicts that may occur on ios and android
            if(sourceEventType.match(/touch|pointer/)) {
                touch_triggered = true;
            }

            // count the total touches on the screen
            var count_touches = 0;

            // when touch has been triggered in this detection session
            // and we are now handling a mouse event, we stop that to prevent conflicts
            if(enable_detect) {
                // update pointerevent
                if(Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
                // touch
                else if(sourceEventType.match(/touch/)) {
                    count_touches = ev.touches.length;
                }
                // mouse
                else if(!touch_triggered) {
                    count_touches = sourceEventType.match(/up/) ? 0 : 1;
                }

                // if we are in a end event, but when we remove one touch and
                // we still have enough, set eventType to move
                if(count_touches > 0 && eventType == Hammer.EVENT_END) {
                    eventType = Hammer.EVENT_MOVE;
                }
                // no touches, force the end event
                else if(!count_touches) {
                    eventType = Hammer.EVENT_END;
                }

                // because touchend has no touches, and we often want to use these in our gestures,
                // we send the last move event as our eventData in touchend
                if(!count_touches && last_move_event !== null) {
                    ev = last_move_event;
                }
                // store the last move event
                else {
                    last_move_event = ev;
                }

                // trigger the handler
                handler.call(Hammer.detection, self.collectEventData(element, eventType, ev));

                // remove pointerevent from list
                if(Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
            }

            //debug(sourceEventType +" "+ eventType);

            // on the end we reset everything
            if(!count_touches) {
                last_move_event = null;
                enable_detect = false;
                touch_triggered = false;
                Hammer.PointerEvent.reset();
            }
        });
    },


    /**
     * we have different events for each device/browser
     * determine what we need and set them in the Hammer.EVENT_TYPES constant
     */
    determineEventTypes: function determineEventTypes() {
        // determine the eventtype we want to set
        var types;

        // pointerEvents magic
        if(Hammer.HAS_POINTEREVENTS) {
            types = Hammer.PointerEvent.getEvents();
        }
        // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
        else if(Hammer.NO_MOUSEEVENTS) {
            types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'];
        }
        // for non pointer events browsers and mixed browsers,
        // like chrome on windows8 touch laptop
        else {
            types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'];
        }

        Hammer.EVENT_TYPES[Hammer.EVENT_START]  = types[0];
        Hammer.EVENT_TYPES[Hammer.EVENT_MOVE]   = types[1];
        Hammer.EVENT_TYPES[Hammer.EVENT_END]    = types[2];
    },


    /**
     * create touchlist depending on the event
     * @param   {Object}    ev
     * @param   {String}    eventType   used by the fakemultitouch plugin
     */
    getTouchList: function getTouchList(ev/*, eventType*/) {
        // get the fake pointerEvent touchlist
        if(Hammer.HAS_POINTEREVENTS) {
            return Hammer.PointerEvent.getTouchList();
        }
        // get the touchlist
        else if(ev.touches) {
            return ev.touches;
        }
        // make fake touchlist from mouse position
        else {
            return [{
                identifier: 1,
                pageX: ev.pageX,
                pageY: ev.pageY,
                target: ev.target
            }];
        }
    },


    /**
     * collect event data for Hammer js
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Object}        eventData
     */
    collectEventData: function collectEventData(element, eventType, ev) {
        var touches = this.getTouchList(ev, eventType);

        // find out pointerType
        var pointerType = Hammer.POINTER_TOUCH;
        if(ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
            pointerType = Hammer.POINTER_MOUSE;
        }

        return {
            center      : Hammer.utils.getCenter(touches),
            timeStamp   : new Date().getTime(),
            target      : ev.target,
            touches     : touches,
            eventType   : eventType,
            pointerType : pointerType,
            srcEvent    : ev,

            /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
            preventDefault: function() {
                if(this.srcEvent.preventManipulation) {
                    this.srcEvent.preventManipulation();
                }

                if(this.srcEvent.preventDefault) {
                    this.srcEvent.preventDefault();
                }
            },

            /**
             * stop bubbling the event up to its parents
             */
            stopPropagation: function() {
                this.srcEvent.stopPropagation();
            },

            /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
            stopDetect: function() {
                return Hammer.detection.stopDetect();
            }
        };
    }
};

Hammer.PointerEvent = {
    /**
     * holds all pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get a list of pointers
     * @returns {Array}     touchlist
     */
    getTouchList: function() {
        var self = this;
        var touchlist = [];

        // we can use forEach since pointerEvents only is in IE10
        Object.keys(self.pointers).sort().forEach(function(id) {
            touchlist.push(self.pointers[id]);
        });
        return touchlist;
    },

    /**
     * update the position of a pointer
     * @param   {String}   type             Hammer.EVENT_END
     * @param   {Object}   pointerEvent
     */
    updatePointer: function(type, pointerEvent) {
        if(type == Hammer.EVENT_END) {
            this.pointers = {};
        }
        else {
            pointerEvent.identifier = pointerEvent.pointerId;
            this.pointers[pointerEvent.pointerId] = pointerEvent;
        }

        return Object.keys(this.pointers).length;
    },

    /**
     * check if ev matches pointertype
     * @param   {String}        pointerType     Hammer.POINTER_MOUSE
     * @param   {PointerEvent}  ev
     */
    matchType: function(pointerType, ev) {
        if(!ev.pointerType) {
            return false;
        }

        var types = {};
        types[Hammer.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == Hammer.POINTER_MOUSE);
        types[Hammer.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == Hammer.POINTER_TOUCH);
        types[Hammer.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == Hammer.POINTER_PEN);
        return types[pointerType];
    },


    /**
     * get events
     */
    getEvents: function() {
        return [
            'pointerdown MSPointerDown',
            'pointermove MSPointerMove',
            'pointerup pointercancel MSPointerUp MSPointerCancel'
        ];
    },

    /**
     * reset the list
     */
    reset: function() {
        this.pointers = {};
    }
};


Hammer.utils = {
    /**
     * extend method,
     * also used for cloning when dest is an empty object
     * @param   {Object}    dest
     * @param   {Object}    src
	 * @parm	{Boolean}	merge		do a merge
     * @returns {Object}    dest
     */
    extend: function extend(dest, src, merge) {
        for (var key in src) {
			if(dest[key] !== undefined && merge) {
				continue;
			}
            dest[key] = src[key];
        }
        return dest;
    },


    /**
     * find if a node is in the given parent
     * used for event delegation tricks
     * @param   {HTMLElement}   node
     * @param   {HTMLElement}   parent
     * @returns {boolean}       has_parent
     */
    hasParent: function(node, parent) {
        while(node){
            if(node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },


    /**
     * get the center of all the touches
     * @param   {Array}     touches
     * @returns {Object}    center
     */
    getCenter: function getCenter(touches) {
        var valuesX = [], valuesY = [];

        for(var t= 0,len=touches.length; t<len; t++) {
            valuesX.push(touches[t].pageX);
            valuesY.push(touches[t].pageY);
        }

        return {
            pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
            pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
        };
    },


    /**
     * calculate the velocity between two points
     * @param   {Number}    delta_time
     * @param   {Number}    delta_x
     * @param   {Number}    delta_y
     * @returns {Object}    velocity
     */
    getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
        return {
            x: Math.abs(delta_x / delta_time) || 0,
            y: Math.abs(delta_y / delta_time) || 0
        };
    },


    /**
     * calculate the angle between two coordinates
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    angle
     */
    getAngle: function getAngle(touch1, touch2) {
        var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
        return Math.atan2(y, x) * 180 / Math.PI;
    },


    /**
     * angle to direction define
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {String}    direction constant, like Hammer.DIRECTION_LEFT
     */
    getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);

        if(x >= y) {
            return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
        }
        else {
            return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
        }
    },


    /**
     * calculate the distance between two touches
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    distance
     */
    getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x*x) + (y*y));
    },


    /**
     * calculate the scale factor between two touchLists (fingers)
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    scale
     */
    getScale: function getScale(start, end) {
        // need two fingers...
        if(start.length >= 2 && end.length >= 2) {
            return this.getDistance(end[0], end[1]) /
                this.getDistance(start[0], start[1]);
        }
        return 1;
    },


    /**
     * calculate the rotation degrees between two touchLists (fingers)
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    rotation
     */
    getRotation: function getRotation(start, end) {
        // need two fingers
        if(start.length >= 2 && end.length >= 2) {
            return this.getAngle(end[1], end[0]) -
                this.getAngle(start[1], start[0]);
        }
        return 0;
    },


    /**
     * boolean if the direction is vertical
     * @param    {String}    direction
     * @returns  {Boolean}   is_vertical
     */
    isVertical: function isVertical(direction) {
        return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN);
    },


    /**
     * stop browser default behavior with css props
     * @param   {HtmlElement}   element
     * @param   {Object}        css_props
     */
    stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
        var prop,
            vendors = ['webkit','khtml','moz','ms','o',''];

        if(!css_props || !element.style) {
            return;
        }

        // with css properties for modern browsers
        for(var i = 0; i < vendors.length; i++) {
            for(var p in css_props) {
                if(css_props.hasOwnProperty(p)) {
                    prop = p;

                    // vender prefix at the property
                    if(vendors[i]) {
                        prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                    }

                    // set the style
                    element.style[prop] = css_props[p];
                }
            }
        }

        // also the disable onselectstart
        if(css_props.userSelect == 'none') {
            element.onselectstart = function() {
                return false;
            };
        }
    }
};

Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,


    /**
     * start Hammer.gesture detection
     * @param   {Hammer.Instance}   inst
     * @param   {Object}            eventData
     */
    startDetect: function startDetect(inst, eventData) {
        // already busy with a Hammer.gesture detection on an element
        if(this.current) {
            return;
        }

        this.stopped = false;

        this.current = {
            inst        : inst, // reference to HammerInstance we're working for
            startEvent  : Hammer.utils.extend({}, eventData), // start eventData for distances, timing etc
            lastEvent   : false, // last eventData
            name        : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
        };

        this.detect(eventData);
    },


    /**
     * Hammer.gesture detection
     * @param   {Object}    eventData
     * @param   {Object}    eventData
     */
    detect: function detect(eventData) {
        if(!this.current || this.stopped) {
            return;
        }

        // extend event data with calculations about scale, distance etc
        eventData = this.extendEventData(eventData);

        // instance options
        var inst_options = this.current.inst.options;

        // call Hammer.gesture handlers
        for(var g=0,len=this.gestures.length; g<len; g++) {
            var gesture = this.gestures[g];

            // only when the instance options have enabled this gesture
            if(!this.stopped && inst_options[gesture.name] !== false) {
                // if a handler returns false, we stop with the detection
                if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                    this.stopDetect();
                    break;
                }
            }
        }

        // store as previous event event
        if(this.current) {
            this.current.lastEvent = eventData;
        }

        // endevent, but not the last touch, so dont stop
        if(eventData.eventType == Hammer.EVENT_END && !eventData.touches.length-1) {
            this.stopDetect();
        }

        return eventData;
    },


    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     */
    stopDetect: function stopDetect() {
        // clone current data to the store as the previous gesture
        // used for the double tap gesture, since this is an other gesture detect session
        this.previous = Hammer.utils.extend({}, this.current);

        // reset the current
        this.current = null;

        // stopped!
        this.stopped = true;
    },


    /**
     * extend eventData for Hammer.gestures
     * @param   {Object}   ev
     * @returns {Object}   ev
     */
    extendEventData: function extendEventData(ev) {
        var startEv = this.current.startEvent;

        // if the touches change, set the new touches over the startEvent touches
        // this because touchevents don't have all the touches on touchstart, or the
        // user must place his fingers at the EXACT same time on the screen, which is not realistic
        // but, sometimes it happens that both fingers are touching at the EXACT same time
        if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
            // extend 1 level deep to get the touchlist with the touch objects
            startEv.touches = [];
            for(var i=0,len=ev.touches.length; i<len; i++) {
                startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]));
            }
        }

        var delta_time = ev.timeStamp - startEv.timeStamp,
            delta_x = ev.center.pageX - startEv.center.pageX,
            delta_y = ev.center.pageY - startEv.center.pageY,
            velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);

        Hammer.utils.extend(ev, {
            deltaTime   : delta_time,

            deltaX      : delta_x,
            deltaY      : delta_y,

            velocityX   : velocity.x,
            velocityY   : velocity.y,

            distance    : Hammer.utils.getDistance(startEv.center, ev.center),
            angle       : Hammer.utils.getAngle(startEv.center, ev.center),
            direction   : Hammer.utils.getDirection(startEv.center, ev.center),

            scale       : Hammer.utils.getScale(startEv.touches, ev.touches),
            rotation    : Hammer.utils.getRotation(startEv.touches, ev.touches),

            startEvent  : startEv
        });

        return ev;
    },


    /**
     * register new gesture
     * @param   {Object}    gesture object, see gestures.js for documentation
     * @returns {Array}     gestures
     */
    register: function register(gesture) {
        // add an enable gesture options if there is no given
        var options = gesture.defaults || {};
        if(options[gesture.name] === undefined) {
            options[gesture.name] = true;
        }

        // extend Hammer default options with the Hammer.gesture options
        Hammer.utils.extend(Hammer.defaults, options, true);

        // set its index
        gesture.index = gesture.index || 1000;

        // add Hammer.gesture to the list
        this.gestures.push(gesture);

        // sort the list by index
        this.gestures.sort(function(a, b) {
            if (a.index < b.index) {
                return -1;
            }
            if (a.index > b.index) {
                return 1;
            }
            return 0;
        });

        return this.gestures;
    }
};


Hammer.gestures = Hammer.gestures || {};

/**
 * Custom gestures
 * ==============================
 *
 * Gesture object
 * --------------------
 * The object structure of a gesture:
 *
 * { name: 'mygesture',
 *   index: 1337,
 *   defaults: {
 *     mygesture_option: true
 *   }
 *   handler: function(type, ev, inst) {
 *     // trigger gesture event
 *     inst.trigger(this.name, ev);
 *   }
 * }

 * @param   {String}    name
 * this should be the name of the gesture, lowercase
 * it is also being used to disable/enable the gesture per instance config.
 *
 * @param   {Number}    [index=1000]
 * the index of the gesture, where it is going to be in the stack of gestures detection
 * like when you build an gesture that depends on the drag gesture, it is a good
 * idea to place it after the index of the drag gesture.
 *
 * @param   {Object}    [defaults={}]
 * the default settings of the gesture. these are added to the instance settings,
 * and can be overruled per instance. you can also add the name of the gesture,
 * but this is also added by default (and set to true).
 *
 * @param   {Function}  handler
 * this handles the gesture detection of your custom gesture and receives the
 * following arguments:
 *
 *      @param  {Object}    eventData
 *      event data containing the following properties:
 *          timeStamp   {Number}        time the event occurred
 *          target      {HTMLElement}   target element
 *          touches     {Array}         touches (fingers, pointers, mouse) on the screen
 *          pointerType {String}        kind of pointer that was used. matches Hammer.POINTER_MOUSE|TOUCH
 *          center      {Object}        center position of the touches. contains pageX and pageY
 *          deltaTime   {Number}        the total time of the touches in the screen
 *          deltaX      {Number}        the delta on x axis we haved moved
 *          deltaY      {Number}        the delta on y axis we haved moved
 *          velocityX   {Number}        the velocity on the x
 *          velocityY   {Number}        the velocity on y
 *          angle       {Number}        the angle we are moving
 *          direction   {String}        the direction we are moving. matches Hammer.DIRECTION_UP|DOWN|LEFT|RIGHT
 *          distance    {Number}        the distance we haved moved
 *          scale       {Number}        scaling of the touches, needs 2 touches
 *          rotation    {Number}        rotation of the touches, needs 2 touches *
 *          eventType   {String}        matches Hammer.EVENT_START|MOVE|END
 *          srcEvent    {Object}        the source event, like TouchStart or MouseDown *
 *          startEvent  {Object}        contains the same properties as above,
 *                                      but from the first touch. this is used to calculate
 *                                      distances, deltaTime, scaling etc
 *
 *      @param  {Hammer.Instance}    inst
 *      the instance we are doing the detection for. you can get the options from
 *      the inst.options object and trigger the gesture event by calling inst.trigger
 *
 *
 * Handle gestures
 * --------------------
 * inside the handler you can get/set Hammer.detection.current. This is the current
 * detection session. It has the following properties
 *      @param  {String}    name
 *      contains the name of the gesture we have detected. it has not a real function,
 *      only to check in other gestures if something is detected.
 *      like in the drag gesture we set it to 'drag' and in the swipe gesture we can
 *      check if the current gesture is 'drag' by accessing Hammer.detection.current.name
 *
 *      @readonly
 *      @param  {Hammer.Instance}    inst
 *      the instance we do the detection for
 *
 *      @readonly
 *      @param  {Object}    startEvent
 *      contains the properties of the first gesture detection in this session.
 *      Used for calculations about timing, distance, etc.
 *
 *      @readonly
 *      @param  {Object}    lastEvent
 *      contains all the properties of the last gesture detect in this session.
 *
 * after the gesture detection session has been completed (user has released the screen)
 * the Hammer.detection.current object is copied into Hammer.detection.previous,
 * this is usefull for gestures like doubletap, where you need to know if the
 * previous gesture was a tap
 *
 * options that have been set by the instance can be received by calling inst.options
 *
 * You can trigger a gesture event by calling inst.trigger("mygesture", event).
 * The first param is the name of your gesture, the second the event argument
 *
 *
 * Register gestures
 * --------------------
 * When an gesture is added to the Hammer.gestures object, it is auto registered
 * at the setup of the first Hammer instance. You can also call Hammer.detection.register
 * manually and pass your gesture object as a param
 *
 */

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
    name: 'hold',
    index: 10,
    defaults: {
        hold_timeout	: 500,
        hold_threshold	: 1
    },
    timer: null,
    handler: function holdGesture(ev, inst) {
        switch(ev.eventType) {
            case Hammer.EVENT_START:
                // clear any running timers
                clearTimeout(this.timer);

                // set the gesture so we can check in the timeout if it still is
                Hammer.detection.current.name = this.name;

                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                this.timer = setTimeout(function() {
                    if(Hammer.detection.current.name == 'hold') {
                        inst.trigger('hold', ev);
                    }
                }, inst.options.hold_timeout);
                break;

            // when you move or end we clear the timer
            case Hammer.EVENT_MOVE:
                if(ev.distance > inst.options.hold_threshold) {
                    clearTimeout(this.timer);
                }
                break;

            case Hammer.EVENT_END:
                clearTimeout(this.timer);
                break;
        }
    }
};


/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
    name: 'tap',
    index: 100,
    defaults: {
        tap_max_touchtime	: 250,
        tap_max_distance	: 10,
		tap_always			: true,
        doubletap_distance	: 20,
        doubletap_interval	: 300
    },
    handler: function tapGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // previous gesture, for the double tap since these are two different gesture detections
            var prev = Hammer.detection.previous,
				did_doubletap = false;

            // when the touchtime is higher then the max touch time
            // or when the moving distance is too much
            if(ev.deltaTime > inst.options.tap_max_touchtime ||
                ev.distance > inst.options.tap_max_distance) {
                return;
            }

            // check if double tap
            if(prev && prev.name == 'tap' &&
                (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
                ev.distance < inst.options.doubletap_distance) {
				inst.trigger('doubletap', ev);
				did_doubletap = true;
            }

			// do a single tap
			if(!did_doubletap || inst.options.tap_always) {
				Hammer.detection.current.name = 'tap';
				inst.trigger(Hammer.detection.current.name, ev);
			}
        }
    }
};


/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
        // set 0 for unlimited, but this can conflict with transform
        swipe_max_touches  : 1,
        swipe_velocity     : 0.7
    },
    handler: function swipeGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // max touches
            if(inst.options.swipe_max_touches > 0 &&
                ev.touches.length > inst.options.swipe_max_touches) {
                return;
            }

            // when the distance we moved is too small we skip this gesture
            // or we can be already in dragging
            if(ev.velocityX > inst.options.swipe_velocity ||
                ev.velocityY > inst.options.swipe_velocity) {
                // trigger swipe events
                inst.trigger(this.name, ev);
                inst.trigger(this.name + ev.direction, ev);
            }
        }
    }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
    name: 'drag',
    index: 50,
    defaults: {
        drag_min_distance : 10,
        // set 0 for unlimited, but this can conflict with transform
        drag_max_touches  : 1,
        // prevent default browser behavior when dragging occurs
        // be careful with it, it makes the element a blocking element
        // when you are using the drag gesture, it is a good practice to set this true
        drag_block_horizontal   : false,
        drag_block_vertical     : false,
        // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
        // It disallows vertical directions if the initial direction was horizontal, and vice versa.
        drag_lock_to_axis       : false,
        // drag lock only kicks in when distance > drag_lock_min_distance
        // This way, locking occurs only when the distance has become large enough to reliably determine the direction
        drag_lock_min_distance : 25
    },
    triggered: false,
    handler: function dragGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // max touches
        if(inst.options.drag_max_touches > 0 &&
            ev.touches.length > inst.options.drag_max_touches) {
            return;
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    Hammer.detection.current.name != this.name) {
                    return;
                }

                // we are dragging!
                Hammer.detection.current.name = this.name;

                // lock drag to axis?
                if(Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance<=ev.distance)) {
                    ev.drag_locked_to_axis = true;
                }
                var last_direction = Hammer.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                    // keep direction on the axis that the drag gesture started on
                    if(Hammer.utils.isVertical(last_direction)) {
                        ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
                    }
                    else {
                        ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                // trigger normal event
                inst.trigger(this.name, ev);

                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);

                // block the browser events
                if( (inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
                    ev.preventDefault();
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
    name: 'transform',
    index: 45,
    defaults: {
        // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
        transform_min_scale     : 0.01,
        // rotation in degrees
        transform_min_rotation  : 1,
        // prevent default browser behavior when two touches are on the screen
        // but it makes the element a blocking element
        // when you are using the transform gesture, it is a good practice to set this true
        transform_always_block  : false
    },
    triggered: false,
    handler: function transformGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // atleast multitouch
        if(ev.touches.length < 2) {
            return;
        }

        // prevent default when two fingers are on the screen
        if(inst.options.transform_always_block) {
            ev.preventDefault();
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                var scale_threshold = Math.abs(1-ev.scale);
                var rotation_threshold = Math.abs(ev.rotation);

                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scale_threshold < inst.options.transform_min_scale &&
                    rotation_threshold < inst.options.transform_min_rotation) {
                    return;
                }

                // we are transforming!
                Hammer.detection.current.name = this.name;

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                inst.trigger(this.name, ev); // basic transform event

                // trigger rotate event
                if(rotation_threshold > inst.options.transform_min_rotation) {
                    inst.trigger('rotate', ev);
                }

                // trigger pinch event
                if(scale_threshold > inst.options.transform_min_scale) {
                    inst.trigger('pinch', ev);
                    inst.trigger('pinch'+ ((ev.scale < 1) ? 'in' : 'out'), ev);
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
        // call preventDefault at touchstart, and makes the element blocking by
        // disabling the scrolling of the page, but it improves gestures like
        // transforming and dragging.
        // be careful with using this, it can be very annoying for users to be stuck
        // on the page
        prevent_default: false,

        // disable mouse events, so only touch (or pen!) input triggers events
        prevent_mouseevents: false
    },
    handler: function touchGesture(ev, inst) {
        if(inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE) {
            ev.stopDetect();
            return;
        }

        if(inst.options.prevent_default) {
            ev.preventDefault();
        }

        if(ev.eventType ==  Hammer.EVENT_START) {
            inst.trigger(this.name, ev);
        }
    }
};


/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
        if(ev.eventType ==  Hammer.EVENT_END) {
            inst.trigger(this.name, ev);
        }
    }
};

// node export
if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = Hammer;
}
// just window export
else {
    window.Hammer = Hammer;

    // requireJS module definition
    if(typeof window.define === 'function' && window.define.amd) {
        window.define('hammer', [], function() {
            return Hammer;
        });
    }
}
})(this);

(function($, undefined) {
    'use strict';

    // no jQuery or Zepto!
    if($ === undefined) {
        return;
    }

    /**
     * bind dom events
     * this overwrites addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        eventTypes
     * @param   {Function}      handler
     */
    Hammer.event.bindDom = function(element, eventTypes, handler) {
        $(element).on(eventTypes, function(ev) {
            var data = ev.originalEvent || ev;

            // IE pageX fix
            if(data.pageX === undefined) {
                data.pageX = ev.pageX;
                data.pageY = ev.pageY;
            }

            // IE target fix
            if(!data.target) {
                data.target = ev.target;
            }

            // IE button fix
            if(data.which === undefined) {
                data.which = data.button;
            }

            // IE preventDefault
            if(!data.preventDefault) {
                data.preventDefault = ev.preventDefault;
            }

            // IE stopPropagation
            if(!data.stopPropagation) {
                data.stopPropagation = ev.stopPropagation;
            }

            handler.call(this, data);
        });
    };

    /**
     * the methods are called by the instance, but with the jquery plugin
     * we use the jquery event methods instead.
     * @this    {Hammer.Instance}
     * @return  {jQuery}
     */
    Hammer.Instance.prototype.on = function(types, handler) {
        return $(this.element).on(types, handler);
    };
    Hammer.Instance.prototype.off = function(types, handler) {
        return $(this.element).off(types, handler);
    };


    /**
     * trigger events
     * this is called by the gestures to trigger an event like 'tap'
     * @this    {Hammer.Instance}
     * @param   {String}    gesture
     * @param   {Object}    eventData
     * @return  {jQuery}
     */
    Hammer.Instance.prototype.trigger = function(gesture, eventData){
        var el = $(this.element);
        if(el.has(eventData.target).length) {
            el = $(eventData.target);
        }

        return el.trigger({
            type: gesture,
            gesture: eventData
        });
    };


    /**
     * jQuery plugin
     * create instance of Hammer and watch for gestures,
     * and when called again you can change the options
     * @param   {Object}    [options={}]
     * @return  {jQuery}
     */
    $.fn.hammer = function(options) {
        return this.each(function() {
            var el = $(this);
            var inst = el.data('hammer');
            // start new hammer instance
            if(!inst) {
                el.data('hammer', new Hammer(this, options || {}));
            }
            // change the options
            else if(inst && options) {
                Hammer.utils.extend(inst.options, options);
            }
        });
    };

})(window.jQuery || window.Zepto);
/*!
 * jQuery contextMenu - Plugin for simple contextMenu handling
 *
 * Version: git-master
 *
 * Authors: Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://medialize.github.com/jQuery-contextMenu/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function($, undefined){
    
    // TODO: -
        // ARIA stuff: menuitem, menuitemcheckbox und menuitemradio
        // create <menu> structure if $.support[htmlCommand || htmlMenuitem] and !opt.disableNative

// determine html5 compatibility
$.support.htmlMenuitem = ('HTMLMenuItemElement' in window);
$.support.htmlCommand = ('HTMLCommandElement' in window);
$.support.eventSelectstart = ("onselectstart" in document.documentElement);
/* // should the need arise, test for css user-select
$.support.cssUserSelect = (function(){
    var t = false,
        e = document.createElement('div');
    
    $.each('Moz|Webkit|Khtml|O|ms|Icab|'.split('|'), function(i, prefix) {
        var propCC = prefix + (prefix ? 'U' : 'u') + 'serSelect',
            prop = (prefix ? ('-' + prefix.toLowerCase() + '-') : '') + 'user-select';
            
        e.style.cssText = prop + ': text;';
        if (e.style[propCC] == 'text') {
            t = true;
            return false;
        }
        
        return true;
    });
    
    return t;
})();
*/

if (!$.ui || !$.ui.widget) {
    // duck punch $.cleanData like jQueryUI does to get that remove event
    // https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js#L16-24
    var _cleanData = $.cleanData;
    $.cleanData = function( elems ) {
        for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
            try {
                $( elem ).triggerHandler( "remove" );
                // http://bugs.jquery.com/ticket/8235
            } catch( e ) {}
        }
        _cleanData( elems );
    };
}

var // currently active contextMenu trigger
    $currentTrigger = null,
    // is contextMenu initialized with at least one menu?
    initialized = false,
    // window handle
    $win = $(window),
    // number of registered menus
    counter = 0,
    // mapping selector to namespace
    namespaces = {},
    // mapping namespace to options
    menus = {},
    // custom command type handlers
    types = {},
    // default values
    defaults = {
        // selector of contextMenu trigger
        selector: null,
        // where to append the menu to
        appendTo: null,
        // method to trigger context menu ["right", "left", "hover"]
        trigger: "right",
        // hide menu when mouse leaves trigger / menu elements
        autoHide: false,
        // ms to wait before showing a hover-triggered context menu
        delay: 200,
        // flag denoting if a second trigger should simply move (true) or rebuild (false) an open menu
        // as long as the trigger happened on one of the trigger-element's child nodes
        reposition: true,
        // determine position to show menu at
        determinePosition: function($menu) {
            // position to the lower middle of the trigger element
            if ($.ui && $.ui.position) {
                // .position() is provided as a jQuery UI utility
                // (...and it won't work on hidden elements)
                $menu.css('display', 'block').position({
                    my: "center top",
                    at: "center bottom",
                    of: this,
                    offset: "0 5",
                    collision: "fit"
                }).css('display', 'none');
            } else {
                // determine contextMenu position
                var offset = this.offset();
                offset.top += this.outerHeight();
                offset.left += this.outerWidth() / 2 - $menu.outerWidth() / 2;
                $menu.css(offset);
            }
        },
        // position menu
        position: function(opt, x, y) {
            var $this = this,
                offset;
            // determine contextMenu position
            if (!x && !y) {
                opt.determinePosition.call(this, opt.$menu);
                return;
            } else if (x === "maintain" && y === "maintain") {
                // x and y must not be changed (after re-show on command click)
                offset = opt.$menu.position();
            } else {
                // x and y are given (by mouse event)
                offset = {top: y, left: x};
            }
            
            // correct offset if viewport demands it
            var bottom = $win.scrollTop() + $win.height(),
                right = $win.scrollLeft() + $win.width(),
                height = opt.$menu.height(),
                width = opt.$menu.width();
            
            if (offset.top + height > bottom) {
                offset.top -= height;
            }
            
            if (offset.left + width > right) {
                offset.left -= width;
            }
            
            opt.$menu.css(offset);
        },
        // position the sub-menu
        positionSubmenu: function($menu) {
            if ($.ui && $.ui.position) {
                // .position() is provided as a jQuery UI utility
                // (...and it won't work on hidden elements)
                $menu.css('display', 'block').position({
                    my: "left top",
                    at: "right top",
                    of: this,
                    collision: "flipfit fit"
                }).css('display', '');
            } else {
                // determine contextMenu position
                var offset = {
                    top: 0,
                    left: this.outerWidth()
                };
                $menu.css(offset);
            }
        },
        // offset to add to zIndex
        zIndex: 1,
        // show hide animation settings
        animation: {
            duration: 50,
            show: 'slideDown',
            hide: 'slideUp'
        },
        // events
        events: {
            show: $.noop,
            hide: $.noop
        },
        // default callback
        callback: null,
        // list of contextMenu items
        items: {}
    },
    // mouse position for hover activation
    hoveract = {
        timer: null,
        pageX: null,
        pageY: null
    },
    // determine zIndex
    zindex = function($t) {
        var zin = 0,
            $tt = $t;

        while (true) {
            zin = Math.max(zin, parseInt($tt.css('z-index'), 10) || 0);
            $tt = $tt.parent();
            if (!$tt || !$tt.length || "html body".indexOf($tt.prop('nodeName').toLowerCase()) > -1 ) {
                break;
            }
        }
        
        return zin;
    },
    // event handlers
    handle = {
        // abort anything
        abortevent: function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
        },
        
        // contextmenu show dispatcher
        contextmenu: function(e) {
            var $this = $(this);
            
            // disable actual context-menu
            e.preventDefault();
            e.stopImmediatePropagation();
            
            // abort native-triggered events unless we're triggering on right click
            if (e.data.trigger != 'right' && e.originalEvent) {
                return;
            }
            
            // abort event if menu is visible for this trigger
            if ($this.hasClass('context-menu-active')) {
                return;
            }
            
            if (!$this.hasClass('context-menu-disabled')) {
                // theoretically need to fire a show event at <menu>
                // http://www.whatwg.org/specs/web-apps/current-work/multipage/interactive-elements.html#context-menus
                // var evt = jQuery.Event("show", { data: data, pageX: e.pageX, pageY: e.pageY, relatedTarget: this });
                // e.data.$menu.trigger(evt);
                
                $currentTrigger = $this;
                if (e.data.build) {
                    var built = e.data.build($currentTrigger, e);
                    // abort if build() returned false
                    if (built === false) {
                        return;
                    }
                    
                    // dynamically build menu on invocation
                    e.data = $.extend(true, {}, defaults, e.data, built || {});

                    // abort if there are no items to display
                    if (!e.data.items || $.isEmptyObject(e.data.items)) {
                        // Note: jQuery captures and ignores errors from event handlers
                        if (window.console) {
                            (console.error || console.log)("No items specified to show in contextMenu");
                        }
                        
                        throw new Error('No Items specified');
                    }
                    
                    // backreference for custom command type creation
                    e.data.$trigger = $currentTrigger;
                    
                    op.create(e.data);
                }
                // show menu
                op.show.call($this, e.data, e.pageX, e.pageY);
            }
        },
        // contextMenu left-click trigger
        click: function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).trigger($.Event("contextmenu", { data: e.data, pageX: e.pageX, pageY: e.pageY }));
        },
        // contextMenu right-click trigger
        mousedown: function(e) {
            // register mouse down
            var $this = $(this);
            
            // hide any previous menus
            if ($currentTrigger && $currentTrigger.length && !$currentTrigger.is($this)) {
                $currentTrigger.data('contextMenu').$menu.trigger('contextmenu:hide');
            }
            
            // activate on right click
            if (e.button == 2) {
                $currentTrigger = $this.data('contextMenuActive', true);
            }
        },
        // contextMenu right-click trigger
        mouseup: function(e) {
            // show menu
            var $this = $(this);
            if ($this.data('contextMenuActive') && $currentTrigger && $currentTrigger.length && $currentTrigger.is($this) && !$this.hasClass('context-menu-disabled')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $currentTrigger = $this;
                $this.trigger($.Event("contextmenu", { data: e.data, pageX: e.pageX, pageY: e.pageY }));
            }
            
            $this.removeData('contextMenuActive');
        },
        // contextMenu hover trigger
        mouseenter: function(e) {
            var $this = $(this),
                $related = $(e.relatedTarget),
                $document = $(document);
            
            // abort if we're coming from a menu
            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }
            
            // abort if a menu is shown
            if ($currentTrigger && $currentTrigger.length) {
                return;
            }
            
            hoveract.pageX = e.pageX;
            hoveract.pageY = e.pageY;
            hoveract.data = e.data;
            $document.on('mousemove.contextMenuShow', handle.mousemove);
            hoveract.timer = setTimeout(function() {
                hoveract.timer = null;
                $document.off('mousemove.contextMenuShow');
                $currentTrigger = $this;
                $this.trigger($.Event("contextmenu", { data: hoveract.data, pageX: hoveract.pageX, pageY: hoveract.pageY }));
            }, e.data.delay );
        },
        // contextMenu hover trigger
        mousemove: function(e) {
            hoveract.pageX = e.pageX;
            hoveract.pageY = e.pageY;
        },
        // contextMenu hover trigger
        mouseleave: function(e) {
            // abort if we're leaving for a menu
            var $related = $(e.relatedTarget);
            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }
            
            try {
                clearTimeout(hoveract.timer);
            } catch(e) {}
            
            hoveract.timer = null;
        },
        
        // click on layer to hide contextMenu
        layerClick: function(e) {
            var $this = $(this),
                root = $this.data('contextMenuRoot'),
                mouseup = false,
                button = e.button,
                x = e.pageX,
                y = e.pageY,
                target, 
                offset,
                selectors;
                
            e.preventDefault();
            e.stopImmediatePropagation();
            
            setTimeout(function() {
                var $window, hideshow, possibleTarget;
                var triggerAction = ((root.trigger == 'left' && button === 0) || (root.trigger == 'right' && button === 2));
                
                // find the element that would've been clicked, wasn't the layer in the way
                if (document.elementFromPoint) {
                    root.$layer.hide();
                    target = document.elementFromPoint(x - $win.scrollLeft(), y - $win.scrollTop());
                    root.$layer.show();
                }
                
                if (root.reposition && triggerAction) {
                    if (document.elementFromPoint) {
                        if (root.$trigger.is(target) || root.$trigger.has(target).length) {
                            root.position.call(root.$trigger, root, x, y);
                            return;
                        }
                    } else {
                        offset = root.$trigger.offset();
                        $window = $(window);
                        // while this looks kinda awful, it's the best way to avoid
                        // unnecessarily calculating any positions
                        offset.top += $window.scrollTop();
                        if (offset.top <= e.pageY) {
                            offset.left += $window.scrollLeft();
                            if (offset.left <= e.pageX) {
                                offset.bottom = offset.top + root.$trigger.outerHeight();
                                if (offset.bottom >= e.pageY) {
                                    offset.right = offset.left + root.$trigger.outerWidth();
                                    if (offset.right >= e.pageX) {
                                        // reposition
                                        root.position.call(root.$trigger, root, x, y);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                
                if (target && triggerAction) {
                    root.$trigger.one('contextmenu:hidden', function() {
                        $(target).contextMenu({x: x, y: y});
                    });
                }

                root.$menu.trigger('contextmenu:hide');
            }, 50);
        },
        // key handled :hover
        keyStop: function(e, opt) {
            if (!opt.isInput) {
                e.preventDefault();
            }
            
            e.stopPropagation();
        },
        key: function(e) {
            var opt = $currentTrigger.data('contextMenu') || {};

            switch (e.keyCode) {
                case 9:
                case 38: // up
                    handle.keyStop(e, opt);
                    // if keyCode is [38 (up)] or [9 (tab) with shift]
                    if (opt.isInput) {
                        if (e.keyCode == 9 && e.shiftKey) {
                            e.preventDefault();
                            opt.$selected && opt.$selected.find('input, textarea, select').blur();
                            opt.$menu.trigger('prevcommand');
                            return;
                        } else if (e.keyCode == 38 && opt.$selected.find('input, textarea, select').prop('type') == 'checkbox') {
                            // checkboxes don't capture this key
                            e.preventDefault();
                            return;
                        }
                    } else if (e.keyCode != 9 || e.shiftKey) {
                        opt.$menu.trigger('prevcommand');
                        return;
                    }
                    // omitting break;
                    
                // case 9: // tab - reached through omitted break;
                case 40: // down
                    handle.keyStop(e, opt);
                    if (opt.isInput) {
                        if (e.keyCode == 9) {
                            e.preventDefault();
                            opt.$selected && opt.$selected.find('input, textarea, select').blur();
                            opt.$menu.trigger('nextcommand');
                            return;
                        } else if (e.keyCode == 40 && opt.$selected.find('input, textarea, select').prop('type') == 'checkbox') {
                            // checkboxes don't capture this key
                            e.preventDefault();
                            return;
                        }
                    } else {
                        opt.$menu.trigger('nextcommand');
                        return;
                    }
                    break;
                
                case 37: // left
                    handle.keyStop(e, opt);
                    if (opt.isInput || !opt.$selected || !opt.$selected.length) {
                        break;
                    }
                
                    if (!opt.$selected.parent().hasClass('context-menu-root')) {
                        var $parent = opt.$selected.parent().parent();
                        opt.$selected.trigger('contextmenu:blur');
                        opt.$selected = $parent;
                        return;
                    }
                    break;
                    
                case 39: // right
                    handle.keyStop(e, opt);
                    if (opt.isInput || !opt.$selected || !opt.$selected.length) {
                        break;
                    }
                    
                    var itemdata = opt.$selected.data('contextMenu') || {};
                    if (itemdata.$menu && opt.$selected.hasClass('context-menu-submenu')) {
                        opt.$selected = null;
                        itemdata.$selected = null;
                        itemdata.$menu.trigger('nextcommand');
                        return;
                    }
                    break;
                
                case 35: // end
                case 36: // home
                    if (opt.$selected && opt.$selected.find('input, textarea, select').length) {
                        return;
                    } else {
                        (opt.$selected && opt.$selected.parent() || opt.$menu)
                            .children(':not(.disabled, .not-selectable)')[e.keyCode == 36 ? 'first' : 'last']()
                            .trigger('contextmenu:focus');
                        e.preventDefault();
                        return;
                    }
                    break;
                    
                case 13: // enter
                    handle.keyStop(e, opt);
                    if (opt.isInput) {
                        if (opt.$selected && !opt.$selected.is('textarea, select')) {
                            e.preventDefault();
                            return;
                        }
                        break;
                    }
                    opt.$selected && opt.$selected.trigger('mouseup');
                    return;
                    
                case 32: // space
                case 33: // page up
                case 34: // page down
                    // prevent browser from scrolling down while menu is visible
                    handle.keyStop(e, opt);
                    return;
                    
                case 27: // esc
                    handle.keyStop(e, opt);
                    opt.$menu.trigger('contextmenu:hide');
                    return;
                    
                default: // 0-9, a-z
                    var k = (String.fromCharCode(e.keyCode)).toUpperCase();
                    if (opt.accesskeys[k]) {
                        // according to the specs accesskeys must be invoked immediately
                        opt.accesskeys[k].$node.trigger(opt.accesskeys[k].$menu
                            ? 'contextmenu:focus'
                            : 'mouseup'
                        );
                        return;
                    }
                    break;
            }
            // pass event to selected item, 
            // stop propagation to avoid endless recursion
            e.stopPropagation();
            opt.$selected && opt.$selected.trigger(e);
        },

        // select previous possible command in menu
        prevItem: function(e) {
            e.stopPropagation();
            var opt = $(this).data('contextMenu') || {};

            // obtain currently selected menu
            if (opt.$selected) {
                var $s = opt.$selected;
                opt = opt.$selected.parent().data('contextMenu') || {};
                opt.$selected = $s;
            }
            
            var $children = opt.$menu.children(),
                $prev = !opt.$selected || !opt.$selected.prev().length ? $children.last() : opt.$selected.prev(),
                $round = $prev;
            
            // skip disabled
            while ($prev.hasClass('disabled') || $prev.hasClass('not-selectable')) {
                if ($prev.prev().length) {
                    $prev = $prev.prev();
                } else {
                    $prev = $children.last();
                }
                if ($prev.is($round)) {
                    // break endless loop
                    return;
                }
            }
            
            // leave current
            if (opt.$selected) {
                handle.itemMouseleave.call(opt.$selected.get(0), e);
            }
            
            // activate next
            handle.itemMouseenter.call($prev.get(0), e);
            
            // focus input
            var $input = $prev.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        },
        // select next possible command in menu
        nextItem: function(e) {
            e.stopPropagation();
            var opt = $(this).data('contextMenu') || {};

            // obtain currently selected menu
            if (opt.$selected) {
                var $s = opt.$selected;
                opt = opt.$selected.parent().data('contextMenu') || {};
                opt.$selected = $s;
            }

            var $children = opt.$menu.children(),
                $next = !opt.$selected || !opt.$selected.next().length ? $children.first() : opt.$selected.next(),
                $round = $next;

            // skip disabled
            while ($next.hasClass('disabled') || $next.hasClass('not-selectable')) {
                if ($next.next().length) {
                    $next = $next.next();
                } else {
                    $next = $children.first();
                }
                if ($next.is($round)) {
                    // break endless loop
                    return;
                }
            }
            
            // leave current
            if (opt.$selected) {
                handle.itemMouseleave.call(opt.$selected.get(0), e);
            }
            
            // activate next
            handle.itemMouseenter.call($next.get(0), e);
            
            // focus input
            var $input = $next.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        },
        
        // flag that we're inside an input so the key handler can act accordingly
        focusInput: function(e) {
            var $this = $(this).closest('.context-menu-item'),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;

            root.$selected = opt.$selected = $this;
            root.isInput = opt.isInput = true;
        },
        // flag that we're inside an input so the key handler can act accordingly
        blurInput: function(e) {
            var $this = $(this).closest('.context-menu-item'),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;

            root.isInput = opt.isInput = false;
        },
        
        // :hover on menu
        menuMouseenter: function(e) {
            var root = $(this).data().contextMenuRoot;
            root.hovering = true;
        },
        // :hover on menu
        menuMouseleave: function(e) {
            var root = $(this).data().contextMenuRoot;
            if (root.$layer && root.$layer.is(e.relatedTarget)) {
                root.hovering = false;
            }
        },
        
        // :hover done manually so key handling is possible
        itemMouseenter: function(e) {
            var $this = $(this),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;
            
            root.hovering = true;

            // abort if we're re-entering
            if (e && root.$layer && root.$layer.is(e.relatedTarget)) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            // make sure only one item is selected
            (opt.$menu ? opt : root).$menu
                .children('.hover').trigger('contextmenu:blur');

            if ($this.hasClass('disabled') || $this.hasClass('not-selectable')) {
                opt.$selected = null;
                return;
            }
            
            $this.trigger('contextmenu:focus');
        },
        // :hover done manually so key handling is possible
        itemMouseleave: function(e) {
            var $this = $(this),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;

            if (root !== opt && root.$layer && root.$layer.is(e.relatedTarget)) {
                root.$selected && root.$selected.trigger('contextmenu:blur');
                e.preventDefault();
                e.stopImmediatePropagation();
                root.$selected = opt.$selected = opt.$node;
                return;
            }
            
            $this.trigger('contextmenu:blur');
        },
        // contextMenu item click
        itemClick: function(e) {
            var $this = $(this),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot,
                key = data.contextMenuKey,
                callback;

            // abort if the key is unknown or disabled or is a menu
            if (!opt.items[key] || $this.is('.disabled, .context-menu-submenu, .context-menu-separator, .not-selectable')) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            if ($.isFunction(root.callbacks[key]) && Object.prototype.hasOwnProperty.call(root.callbacks, key)) {
                // item-specific callback
                callback = root.callbacks[key];
            } else if ($.isFunction(root.callback)) {
                // default callback
                callback = root.callback;                
            } else {
                // no callback, no action
                return;
            }

            // hide menu if callback doesn't stop that
            if (callback.call(root.$trigger, key, root) !== false) {
                root.$menu.trigger('contextmenu:hide');
            } else if (root.$menu.parent().length) {
                op.update.call(root.$trigger, root);
            }
        },
        // ignore click events on input elements
        inputClick: function(e) {
            e.stopImmediatePropagation();
        },
        
        // hide <menu>
        hideMenu: function(e, data) {
            var root = $(this).data('contextMenuRoot');
            op.hide.call(root.$trigger, root, data && data.force);
        },
        // focus <command>
        focusItem: function(e) {
            e.stopPropagation();
            var $this = $(this),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;

            $this.addClass('hover')
                .siblings('.hover').trigger('contextmenu:blur');
            
            // remember selected
            opt.$selected = root.$selected = $this;
            
            // position sub-menu - do after show so dumb $.ui.position can keep up
            if (opt.$node) {
                root.positionSubmenu.call(opt.$node, opt.$menu);
            }
        },
        // blur <command>
        blurItem: function(e) {
            e.stopPropagation();
            var $this = $(this),
                data = $this.data(),
                opt = data.contextMenu,
                root = data.contextMenuRoot;
            
            $this.removeClass('hover');
            opt.$selected = null;
        }
    },
    // operations
    op = {
        show: function(opt, x, y) {
            var $trigger = $(this),
                offset,
                css = {};

            // hide any open menus
            $('#context-menu-layer').trigger('mousedown');

            // backreference for callbacks
            opt.$trigger = $trigger;

            // show event
            if (opt.events.show.call($trigger, opt) === false) {
                $currentTrigger = null;
                return;
            }

            // create or update context menu
            op.update.call($trigger, opt);
            
            // position menu
            opt.position.call($trigger, opt, x, y);

            // make sure we're in front
            if (opt.zIndex) {
                css.zIndex = zindex($trigger) + opt.zIndex;
            }
            
            // add layer
            op.layer.call(opt.$menu, opt, css.zIndex);
            
            // adjust sub-menu zIndexes
            opt.$menu.find('ul').css('zIndex', css.zIndex + 1);
            
            // position and show context menu
            opt.$menu.css( css )[opt.animation.show](opt.animation.duration, function() {
                $trigger.trigger('contextmenu:visible');
            });
            // make options available and set state
            $trigger
                .data('contextMenu', opt)
                .addClass("context-menu-active");
            
            // register key handler
            $(document).off('keydown.contextMenu').on('keydown.contextMenu', handle.key);
            // register autoHide handler
            if (opt.autoHide) {
                // mouse position handler
                $(document).on('mousemove.contextMenuAutoHide', function(e) {
                    // need to capture the offset on mousemove,
                    // since the page might've been scrolled since activation
                    var pos = $trigger.offset();
                    pos.right = pos.left + $trigger.outerWidth();
                    pos.bottom = pos.top + $trigger.outerHeight();
                    
                    if (opt.$layer && !opt.hovering && (!(e.pageX >= pos.left && e.pageX <= pos.right) || !(e.pageY >= pos.top && e.pageY <= pos.bottom))) {
                        // if mouse in menu...
                        opt.$menu.trigger('contextmenu:hide');
                    }
                });
            }
        },
        hide: function(opt, force) {
            var $trigger = $(this);
            if (!opt) {
                opt = $trigger.data('contextMenu') || {};
            }
            
            // hide event
            if (!force && opt.events && opt.events.hide.call($trigger, opt) === false) {
                return;
            }
            
            // remove options and revert state
            $trigger
                .removeData('contextMenu')
                .removeClass("context-menu-active");
            
            if (opt.$layer) {
                // keep layer for a bit so the contextmenu event can be aborted properly by opera
                setTimeout((function($layer) {
                    return function(){
                        $layer.remove();
                    };
                })(opt.$layer), 10);
                
                try {
                    delete opt.$layer;
                } catch(e) {
                    opt.$layer = null;
                }
            }
            
            // remove handle
            $currentTrigger = null;
            // remove selected
            opt.$menu.find('.hover').trigger('contextmenu:blur');
            opt.$selected = null;
            // unregister key and mouse handlers
            //$(document).off('.contextMenuAutoHide keydown.contextMenu'); // http://bugs.jquery.com/ticket/10705
            $(document).off('.contextMenuAutoHide').off('keydown.contextMenu');
            // hide menu
            opt.$menu && opt.$menu[opt.animation.hide](opt.animation.duration, function (){
                // tear down dynamically built menu after animation is completed.
                if (opt.build) {
                    opt.$menu.remove();
                    $.each(opt, function(key, value) {
                        switch (key) {
                            case 'ns':
                            case 'selector':
                            case 'build':
                            case 'trigger':
                                return true;

                            default:
                                opt[key] = undefined;
                                try {
                                    delete opt[key];
                                } catch (e) {}
                                return true;
                        }
                    });
                }
                
                setTimeout(function() {
                    $trigger.trigger('contextmenu:hidden');
                }, 10);
            });
        },
        create: function(opt, root) {
            if (root === undefined) {
                root = opt;
            }
            // create contextMenu
            opt.$menu = $('<ul class="context-menu-list"></ul>').addClass(opt.className || "").data({
                'contextMenu': opt,
                'contextMenuRoot': root
            });
            
            $.each(['callbacks', 'commands', 'inputs'], function(i,k){
                opt[k] = {};
                if (!root[k]) {
                    root[k] = {};
                }
            });
            
            root.accesskeys || (root.accesskeys = {});
            
            // create contextMenu items
            $.each(opt.items, function(key, item){
                var $t = $('<li class="context-menu-item"></li>').addClass(item.className || ""),
                    $label = null,
                    $input = null;
                
                // iOS needs to see a click-event bound to an element to actually
                // have the TouchEvents infrastructure trigger the click event
                $t.on('click', $.noop);
                
                item.$node = $t.data({
                    'contextMenu': opt,
                    'contextMenuRoot': root,
                    'contextMenuKey': key
                });
                
                // register accesskey
                // NOTE: the accesskey attribute should be applicable to any element, but Safari5 and Chrome13 still can't do that
                if (item.accesskey) {
                    var aks = splitAccesskey(item.accesskey);
                    for (var i=0, ak; ak = aks[i]; i++) {
                        if (!root.accesskeys[ak]) {
                            root.accesskeys[ak] = item;
                            item._name = item.name.replace(new RegExp('(' + ak + ')', 'i'), '<span class="context-menu-accesskey">$1</span>');
                            break;
                        }
                    }
                }
                
                if (typeof item == "string") {
                    $t.addClass('context-menu-separator not-selectable');
                } else if (item.type && types[item.type]) {
                    // run custom type handler
                    types[item.type].call($t, item, opt, root);
                    // register commands
                    $.each([opt, root], function(i,k){
                        k.commands[key] = item;
                        if ($.isFunction(item.callback)) {
                            k.callbacks[key] = item.callback;
                        }
                    });
                } else {
                    // add label for input
                    if (item.type == 'html') {
                        $t.addClass('context-menu-html not-selectable');
                    } else if (item.type) {
                        $label = $('<label></label>').appendTo($t);
                        $('<span></span>').html(item._name || item.name).appendTo($label);
                        $t.addClass('context-menu-input');
                        opt.hasTypes = true;
                        $.each([opt, root], function(i,k){
                            k.commands[key] = item;
                            k.inputs[key] = item;
                        });
                    } else if (item.items) {
                        item.type = 'sub';
                    }
                
                    switch (item.type) {
                        case 'text':
                            $input = $('<input type="text" value="1" name="" value="">')
                                .attr('name', 'context-menu-input-' + key)
                                .val(item.value || "")
                                .appendTo($label);
                            break;
                    
                        case 'textarea':
                            $input = $('<textarea name=""></textarea>')
                                .attr('name', 'context-menu-input-' + key)
                                .val(item.value || "")
                                .appendTo($label);

                            if (item.height) {
                                $input.height(item.height);
                            }
                            break;

                        case 'checkbox':
                            $input = $('<input type="checkbox" value="1" name="" value="">')
                                .attr('name', 'context-menu-input-' + key)
                                .val(item.value || "")
                                .prop("checked", !!item.selected)
                                .prependTo($label);
                            break;

                        case 'radio':
                            $input = $('<input type="radio" value="1" name="" value="">')
                                .attr('name', 'context-menu-input-' + item.radio)
                                .val(item.value || "")
                                .prop("checked", !!item.selected)
                                .prependTo($label);
                            break;
                    
                        case 'select':
                            $input = $('<select name="">')
                                .attr('name', 'context-menu-input-' + key)
                                .appendTo($label);
                            if (item.options) {
                                $.each(item.options, function(value, text) {
                                    $('<option></option>').val(value).text(text).appendTo($input);
                                });
                                $input.val(item.selected);
                            }
                            break;
                        
                        case 'sub':
                            // FIXME: shouldn't this .html() be a .text()?
                            $('<span></span>').html(item._name || item.name).appendTo($t);
                            item.appendTo = item.$node;
                            op.create(item, root);
                            $t.data('contextMenu', item).addClass('context-menu-submenu');
                            item.callback = null;
                            break;
                        
                        case 'html':
                            $(item.html).appendTo($t);
                            break;
                        
                        default:
                            $.each([opt, root], function(i,k){
                                k.commands[key] = item;
                                if ($.isFunction(item.callback)) {
                                    k.callbacks[key] = item.callback;
                                }
                            });
                            // FIXME: shouldn't this .html() be a .text()?
                            $('<span></span>').html(item._name || item.name || "").appendTo($t);
                            break;
                    }
                    
                    // disable key listener in <input>
                    if (item.type && item.type != 'sub' && item.type != 'html') {
                        $input
                            .on('focus', handle.focusInput)
                            .on('blur', handle.blurInput);
                        
                        if (item.events) {
                            $input.on(item.events, opt);
                        }
                    }
                
                    // add icons
                    if (item.icon) {
                        $t.addClass("icon " + item.icon);
                    }
                }
                
                // cache contained elements
                item.$input = $input;
                item.$label = $label;

                // attach item to menu
                $t.appendTo(opt.$menu);
                
                // Disable text selection
                if (!opt.hasTypes && $.support.eventSelectstart) {
                    // browsers support user-select: none, 
                    // IE has a special event for text-selection
                    // browsers supporting neither will not be preventing text-selection
                    $t.on('selectstart.disableTextSelect', handle.abortevent);
                }
            });
            // attach contextMenu to <body> (to bypass any possible overflow:hidden issues on parents of the trigger element)
            if (!opt.$node) {
                opt.$menu.css('display', 'none').addClass('context-menu-root');
            }
            opt.$menu.appendTo(opt.appendTo || document.body);
        },
        resize: function($menu, nested) {
            // determine widths of submenus, as CSS won't grow them automatically
            // position:absolute within position:absolute; min-width:100; max-width:200; results in width: 100;
            // kinda sucks hard...

            // determine width of absolutely positioned element
            $menu.css({position: 'absolute', display: 'block'});
            // don't apply yet, because that would break nested elements' widths
            // add a pixel to circumvent word-break issue in IE9 - #80
            $menu.data('width', Math.ceil($menu.width()) + 1);
            // reset styles so they allow nested elements to grow/shrink naturally
            $menu.css({
                position: 'static',
                minWidth: '0px',
                maxWidth: '100000px'
            });
            // identify width of nested menus
            $menu.find('> li > ul').each(function() {
                op.resize($(this), true);
            });
            // reset and apply changes in the end because nested
            // elements' widths wouldn't be calculatable otherwise
            if (!nested) {
                $menu.find('ul').andSelf().css({
                    position: '', 
                    display: '',
                    minWidth: '',
                    maxWidth: ''
                }).width(function() {
                    return $(this).data('width');
                });
            }
        },
        update: function(opt, root) {
            var $trigger = this;
            if (root === undefined) {
                root = opt;
                op.resize(opt.$menu);
            }
            // re-check disabled for each item
            opt.$menu.children().each(function(){
                var $item = $(this),
                    key = $item.data('contextMenuKey'),
                    item = opt.items[key],
                    disabled = ($.isFunction(item.disabled) && item.disabled.call($trigger, key, root)) || item.disabled === true;

                // dis- / enable item
                $item[disabled ? 'addClass' : 'removeClass']('disabled');
                
                if (item.type) {
                    // dis- / enable input elements
                    $item.find('input, select, textarea').prop('disabled', disabled);
                    
                    // update input states
                    switch (item.type) {
                        case 'text':
                        case 'textarea':
                            item.$input.val(item.value || "");
                            break;
                            
                        case 'checkbox':
                        case 'radio':
                            item.$input.val(item.value || "").prop('checked', !!item.selected);
                            break;
                            
                        case 'select':
                            item.$input.val(item.selected || "");
                            break;
                    }
                }
                
                if (item.$menu) {
                    // update sub-menu
                    op.update.call($trigger, item, root);
                }
            });
        },
        layer: function(opt, zIndex) {
            // add transparent layer for click area
            // filter and background for Internet Explorer, Issue #23
            var $layer = opt.$layer = $('<div id="context-menu-layer" style="position:fixed; z-index:' + zIndex + '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>')
                .css({height: $win.height(), width: $win.width(), display: 'block'})
                .data('contextMenuRoot', opt)
                .insertBefore(this)
                .on('contextmenu', handle.abortevent)
                .on('mousedown', handle.layerClick);
            
            // IE6 doesn't know position:fixed;
            if (!$.support.fixedPosition) {
                $layer.css({
                    'position' : 'absolute',
                    'height' : $(document).height()
                });
            }
            
            return $layer;
        }
    };

// split accesskey according to http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#assigned-access-key
function splitAccesskey(val) {
    var t = val.split(/\s+/),
        keys = [];
        
    for (var i=0, k; k = t[i]; i++) {
        k = k[0].toUpperCase(); // first character only
        // theoretically non-accessible characters should be ignored, but different systems, different keyboard layouts, ... screw it.
        // a map to look up already used access keys would be nice
        keys.push(k);
    }
    
    return keys;
}

// handle contextMenu triggers
$.fn.contextMenu = function(operation) {
    if (operation === undefined) {
        this.first().trigger('contextmenu');
    } else if (operation.x && operation.y) {
        this.first().trigger($.Event("contextmenu", {pageX: operation.x, pageY: operation.y}));
    } else if (operation === "hide") {
        var $menu = this.data('contextMenu').$menu;
        $menu && $menu.trigger('contextmenu:hide');
    } else if (operation === "destroy") {
        $.contextMenu("destroy", {context: this});
    } else if ($.isPlainObject(operation)) {
        operation.context = this;
        $.contextMenu("create", operation);
    } else if (operation) {
        this.removeClass('context-menu-disabled');
    } else if (!operation) {
        this.addClass('context-menu-disabled');
    }
    
    return this;
};

// manage contextMenu instances
$.contextMenu = function(operation, options) {
    if (typeof operation != 'string') {
        options = operation;
        operation = 'create';
    }
    
    if (typeof options == 'string') {
        options = {selector: options};
    } else if (options === undefined) {
        options = {};
    }
    
    // merge with default options
    var o = $.extend(true, {}, defaults, options || {});
    var $document = $(document);
    var $context = $document;
    var _hasContext = false;
    
    if (!o.context || !o.context.length) {
        o.context = document;
    } else {
        // you never know what they throw at you...
        $context = $(o.context).first();
        o.context = $context.get(0);
        _hasContext = o.context !== document;
    }
    
    switch (operation) {
        case 'create':
            // no selector no joy
            if (!o.selector) {
                throw new Error('No selector specified');
            }
            // make sure internal classes are not bound to
            if (o.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                throw new Error('Cannot bind to selector "' + o.selector + '" as it contains a reserved className');
            }
            if (!o.build && (!o.items || $.isEmptyObject(o.items))) {
                throw new Error('No Items specified');
            }
            counter ++;
            o.ns = '.contextMenu' + counter;
            if (!_hasContext) {
                namespaces[o.selector] = o.ns;
            }
            menus[o.ns] = o;
            
            // default to right click
            if (!o.trigger) {
                o.trigger = 'right';
            }
            
            if (!initialized) {
                // make sure item click is registered first
                $document
                    .on({
                        'contextmenu:hide.contextMenu': handle.hideMenu,
                        'prevcommand.contextMenu': handle.prevItem,
                        'nextcommand.contextMenu': handle.nextItem,
                        'contextmenu.contextMenu': handle.abortevent,
                        'mouseenter.contextMenu': handle.menuMouseenter,
                        'mouseleave.contextMenu': handle.menuMouseleave
                    }, '.context-menu-list')
                    .on('mouseup.contextMenu', '.context-menu-input', handle.inputClick)
                    .on({
                        'mouseup.contextMenu': handle.itemClick,
                        'contextmenu:focus.contextMenu': handle.focusItem,
                        'contextmenu:blur.contextMenu': handle.blurItem,
                        'contextmenu.contextMenu': handle.abortevent,
                        'mouseenter.contextMenu': handle.itemMouseenter,
                        'mouseleave.contextMenu': handle.itemMouseleave
                    }, '.context-menu-item');

                initialized = true;
            }
            
            // engage native contextmenu event
            $context
                .on('contextmenu' + o.ns, o.selector, o, handle.contextmenu);
            
            if (_hasContext) {
                // add remove hook, just in case
                $context.on('remove' + o.ns, function() {
                    $(this).contextMenu("destroy");
                });
            }
            
            switch (o.trigger) {
                case 'hover':
                        $context
                            .on('mouseenter' + o.ns, o.selector, o, handle.mouseenter)
                            .on('mouseleave' + o.ns, o.selector, o, handle.mouseleave);                    
                    break;
                    
                case 'left':
                        $context.on('click' + o.ns, o.selector, o, handle.click);
                    break;
                /*
                default:
                    // http://www.quirksmode.org/dom/events/contextmenu.html
                    $document
                        .on('mousedown' + o.ns, o.selector, o, handle.mousedown)
                        .on('mouseup' + o.ns, o.selector, o, handle.mouseup);
                    break;
                */
            }
            
            // create menu
            if (!o.build) {
                op.create(o);
            }
            break;
        
        case 'destroy':
            var $visibleMenu;
            if (_hasContext) {
                // get proper options 
                var context = o.context;
                $.each(menus, function(ns, o) {
                    if (o.context !== context) {
                        return true;
                    }
                    
                    $visibleMenu = $('.context-menu-list').filter(':visible');
                    if ($visibleMenu.length && $visibleMenu.data().contextMenuRoot.$trigger.is($(o.context).find(o.selector))) {
                        $visibleMenu.trigger('contextmenu:hide', {force: true});
                    }

                    try {
                        if (menus[o.ns].$menu) {
                            menus[o.ns].$menu.remove();
                        }

                        delete menus[o.ns];
                    } catch(e) {
                        menus[o.ns] = null;
                    }

                    $(o.context).off(o.ns);
                    
                    return true;
                });
            } else if (!o.selector) {
                $document.off('.contextMenu .contextMenuAutoHide');
                $.each(menus, function(ns, o) {
                    $(o.context).off(o.ns);
                });
                
                namespaces = {};
                menus = {};
                counter = 0;
                initialized = false;
                
                $('#context-menu-layer, .context-menu-list').remove();
            } else if (namespaces[o.selector]) {
                $visibleMenu = $('.context-menu-list').filter(':visible');
                if ($visibleMenu.length && $visibleMenu.data().contextMenuRoot.$trigger.is(o.selector)) {
                    $visibleMenu.trigger('contextmenu:hide', {force: true});
                }
                
                try {
                    if (menus[namespaces[o.selector]].$menu) {
                        menus[namespaces[o.selector]].$menu.remove();
                    }
                    
                    delete menus[namespaces[o.selector]];
                } catch(e) {
                    menus[namespaces[o.selector]] = null;
                }
                
                $document.off(namespaces[o.selector]);
            }
            break;
        
        case 'html5':
            // if <command> or <menuitem> are not handled by the browser,
            // or options was a bool true,
            // initialize $.contextMenu for them
            if ((!$.support.htmlCommand && !$.support.htmlMenuitem) || (typeof options == "boolean" && options)) {
                $('menu[type="context"]').each(function() {
                    if (this.id) {
                        $.contextMenu({
                            selector: '[contextmenu=' + this.id +']',
                            items: $.contextMenu.fromMenu(this)
                        });
                    }
                }).css('display', 'none');
            }
            break;
        
        default:
            throw new Error('Unknown operation "' + operation + '"');
    }
    
    return this;
};

// import values into <input> commands
$.contextMenu.setInputValues = function(opt, data) {
    if (data === undefined) {
        data = {};
    }
    
    $.each(opt.inputs, function(key, item) {
        switch (item.type) {
            case 'text':
            case 'textarea':
                item.value = data[key] || "";
                break;

            case 'checkbox':
                item.selected = data[key] ? true : false;
                break;
                
            case 'radio':
                item.selected = (data[item.radio] || "") == item.value ? true : false;
                break;
            
            case 'select':
                item.selected = data[key] || "";
                break;
        }
    });
};

// export values from <input> commands
$.contextMenu.getInputValues = function(opt, data) {
    if (data === undefined) {
        data = {};
    }
    
    $.each(opt.inputs, function(key, item) {
        switch (item.type) {
            case 'text':
            case 'textarea':
            case 'select':
                data[key] = item.$input.val();
                break;

            case 'checkbox':
                data[key] = item.$input.prop('checked');
                break;
                
            case 'radio':
                if (item.$input.prop('checked')) {
                    data[item.radio] = item.value;
                }
                break;
        }
    });
    
    return data;
};

// find <label for="xyz">
function inputLabel(node) {
    return (node.id && $('label[for="'+ node.id +'"]').val()) || node.name;
}

// convert <menu> to items object
function menuChildren(items, $children, counter) {
    if (!counter) {
        counter = 0;
    }
    
    $children.each(function() {
        var $node = $(this),
            node = this,
            nodeName = this.nodeName.toLowerCase(),
            label,
            item;
        
        // extract <label><input>
        if (nodeName == 'label' && $node.find('input, textarea, select').length) {
            label = $node.text();
            $node = $node.children().first();
            node = $node.get(0);
            nodeName = node.nodeName.toLowerCase();
        }
        
        /*
         * <menu> accepts flow-content as children. that means <embed>, <canvas> and such are valid menu items.
         * Not being the sadistic kind, $.contextMenu only accepts:
         * <command>, <menuitem>, <hr>, <span>, <p> <input [text, radio, checkbox]>, <textarea>, <select> and of course <menu>.
         * Everything else will be imported as an html node, which is not interfaced with contextMenu.
         */
        
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#concept-command
        switch (nodeName) {
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/interactive-elements.html#the-menu-element
            case 'menu':
                item = {name: $node.attr('label'), items: {}};
                counter = menuChildren(item.items, $node.children(), counter);
                break;
            
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-a-element-to-define-a-command
            case 'a':
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-button-element-to-define-a-command
            case 'button':
                item = {
                    name: $node.text(),
                    disabled: !!$node.attr('disabled'),
                    callback: (function(){ return function(){ $node.click(); }; })()
                };
                break;
            
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-command-element-to-define-a-command

            case 'menuitem':
            case 'command':
                switch ($node.attr('type')) {
                    case undefined:
                    case 'command':
                    case 'menuitem':
                        item = {
                            name: $node.attr('label'),
                            disabled: !!$node.attr('disabled'),
                            callback: (function(){ return function(){ $node.click(); }; })()
                        };
                        break;
                        
                    case 'checkbox':
                        item = {
                            type: 'checkbox',
                            disabled: !!$node.attr('disabled'),
                            name: $node.attr('label'),
                            selected: !!$node.attr('checked')
                        };
                        break;
                        
                    case 'radio':
                        item = {
                            type: 'radio',
                            disabled: !!$node.attr('disabled'),
                            name: $node.attr('label'),
                            radio: $node.attr('radiogroup'),
                            value: $node.attr('id'),
                            selected: !!$node.attr('checked')
                        };
                        break;
                        
                    default:
                        item = undefined;
                }
                break;
 
            case 'hr':
                item = '-------';
                break;
                
            case 'input':
                switch ($node.attr('type')) {
                    case 'text':
                        item = {
                            type: 'text',
                            name: label || inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            value: $node.val()
                        };
                        break;
                        
                    case 'checkbox':
                        item = {
                            type: 'checkbox',
                            name: label || inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            selected: !!$node.attr('checked')
                        };
                        break;
                        
                    case 'radio':
                        item = {
                            type: 'radio',
                            name: label || inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            radio: !!$node.attr('name'),
                            value: $node.val(),
                            selected: !!$node.attr('checked')
                        };
                        break;
                    
                    default:
                        item = undefined;
                        break;
                }
                break;
                
            case 'select':
                item = {
                    type: 'select',
                    name: label || inputLabel(node),
                    disabled: !!$node.attr('disabled'),
                    selected: $node.val(),
                    options: {}
                };
                $node.children().each(function(){
                    item.options[this.value] = $(this).text();
                });
                break;
                
            case 'textarea':
                item = {
                    type: 'textarea',
                    name: label || inputLabel(node),
                    disabled: !!$node.attr('disabled'),
                    value: $node.val()
                };
                break;
            
            case 'label':
                break;
            
            default:
                item = {type: 'html', html: $node.clone(true)};
                break;
        }
        
        if (item) {
            counter++;
            items['key' + counter] = item;
        }
    });
    
    return counter;
}

// convert html5 menu
$.contextMenu.fromMenu = function(element) {
    var $this = $(element),
        items = {};
        
    menuChildren(items, $this.children());
    
    return items;
};

// make defaults accessible
$.contextMenu.defaults = defaults;
$.contextMenu.types = types;
// export internal functions - undocumented, for hacking only!
$.contextMenu.handle = handle;
$.contextMenu.op = op;
$.contextMenu.menus = menus;

})(jQuery);
var scripts = document.getElementsByTagName("script");
if (!basePath) {
    var basePath = scripts[scripts.length - 1].src.replace(/js\/jheatmap-(.*)\.js/g, "");
}
var console = console || {"log":function () {
}};

(function ($) {

    $.fn.heatmap = function (options) {

        return this.each(function () {

            options.container = $(this);
            var heatmap = new jheatmap.Heatmap(options);

            var initialize = function() {

                if (options.data.rows != undefined && heatmap.rows.ready == undefined) {
                    return;
                }

                if (options.data.cols != undefined && heatmap.cols.ready == undefined) {
                    return;
                }

                if (options.data.values != undefined) {
                     options.data.values.read(heatmap, function() {
                         // Initialize heatmap
                         heatmap.init();
                     });
                }

            };

            if (options.data.rows != undefined) {
                options.data.rows.read(heatmap.rows, initialize);
            }

            if (options.data.cols != undefined) {
                options.data.cols.read(heatmap.cols, initialize);
            }

            if (options.data.rows == undefined && options.data.cols == undefined) {
                initialize.call(this);
            }

        });
    };

})(jQuery);
