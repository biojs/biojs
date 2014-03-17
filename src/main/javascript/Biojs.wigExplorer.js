/**
 * This component uses the D3 library to visualise a wig formatted file as an area chart, with panning and zooming functionality.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="http://www.tgac.ac.uk/bioinformatics/sequencing-informatics/core-bioinformatics/anil-thanki/">Anil Thanki</a>
 * @version 1.0.0
 * @category 2
 *
 *
 * @requires <a href='http://d3js.org/'>D3</a>
 * @dependency <script src="http://d3js.org/d3.v2.min.js" type="text/javascript"></script>
 *
 *
 * @requires <a href=''>jQuery UI 1.8.2+</a>
 * @dependency <script type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js"></script>
 *
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 *
 * @requires jQuery UI CSS 1.8.2
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 *
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.js'>jQuery.tooltip</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.tooltip.js"></script>
 *
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.css'>jQuery.tooltip CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery.tooltip.css"/>
 *
 * @requires <a href='../biojs/css/biojs.wigExplorer.css'>biojs.wigExplorer.css</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.wigExplorer.css" />
 *
 *
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI CSS 1.8.2</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 *
 *
 * @param {Object} options An object with the options for wigExplorer component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 *
 * @example
 * var instance = new Biojs.wigExplorer({
 *      target: "YourOwnDivId",
 *      selectionBackgroundColor: 'steelblue',
 *      dataSet: "../biojs/data/wigExplorerDataSet5.txt"
 * });
 *
 * @option {string} dataSet
 *    File in text format including input data. Examples of text file ... <br/>
 *  <pre>variableStep chrom=chr2 span=5
 * 10    34
 * 20    41
 * 30    46
 * 40    49
 * 50    52
 *
 *  ...
 *
 * or
 *
 * fixedStep chrom=chr2 start=10 step=10 span=5
 * 34
 * 41
 * 46
 * 49
 * 52
 *
 *  ...</pre>
 *
 *  @option {string} [selectionBackgroundColor]
 *    Name of the colour to be set as background for area chart
 *
 */


Biojs.wigExplorer = Biojs.extend(
    /** @lends Biojs.wigExplorer# */


    {
        zoomSlider: '',
        slider_stop: 0,
        slider_start: 0,
        track: [],
        width: 1,
        height: 1,
        data_last_start: 1,
        data_first_start: 1,
        max: 0,
        span: null,
        chrom: [],
        data: [],
        main_data: [],


        constructor: function (options) {

            var self = this;
            self.vis = null;
            self.color = null;
            self.foci = [];


            this.track; // data


            this._container = $("#wigFeaturePainter-holder");
            $(this._container).addClass("graph");


            // Apply options values
            this._container.css({
                'font-family': self.opt.fontFamily, // this is one example of the use of self instead of this
                'background-color': self.opt.selectionBackgroundColor,
                'color': self.opt.fontColor,
                'font-size': '36px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'width': '700px',
                'height': '100px',
                'bottom': '0px'
            });

            // Disable text selection and
            // Change the selection mouse pointer
            // from text to hand.
            this._container.css({
                '-moz-user-select': 'none',
                '-webkit-user-select': 'none',
                'user-select': 'none'
            });

            this.color = self.opt.selectionBackgroundColor;
            this.paintFeatures(self.opt.dataSet);

        },

        /**
         *  Default values for the options
         *  @name Biojs.wigExplorer-opt
         */
        opt: {
            target: "YourOwnDivId",
            dataSet: "",
            fontFamily: '"Andale mono", courier, monospace',
            fontColor: "white",
            backgroundColor: "",
            selectionFontColor: "black",
            selectionBackgroundColor: "yellow",
            width: "100%",
            height: "130",
            radius: 10,
            reference: null
        },

        /**
         * Array containing the supported event names
         * @name Biojs.wigExplorer-eventTypes
         */
        eventTypes: [
        /**
         * No events added for now but can be added in future
         */
        ],


        /**
         * Repaints everything: ruler, shapes, and legend.
         * @param {int} [newStart] Zoom from this sequence start value.
         * @param {int} [newStop] Zoom to this sequence end value.
         *
         * @example
         * instance._updateDraw();
         *
         */
        _updateDraw: function (newStart, newStop, target) {
            var self = this;
            //recalculate start and stop
            if (newStart && newStop) {
                this.slider_start += newStart;
                this.slider_stop += newStop;
            }

            if (target) {
            } else {
                target = self.opt.target;
            }
            if (this.slider_start < this.data_first_start) {
                if (newStart == newStop) {
                    this.slider_stop += this.data_first_start - this.slider_start;
                }
                this.slider_start = this.data_first_start;

            }

            if (this.slider_stop > this.data_last_start) {

                if (newStart == newStop) {
                    this.slider_start += this.data_last_start - this.slider_stop;
                }
                this.slider_stop = this.data_last_start;
            }
            //recalculate start and stop
            if ((parseFloat(this.slider_start) < parseFloat(this.slider_stop))) {
                this.paintWig(this.slider_start, this.slider_stop, target);
            }
        },

        /**
         * Paint the features according to the values specified in the json object defined when creating the object.
         * This method initializes the holder, paints the slider and print button depending on the options, and
         * paints the features and legend.
         *
         * @example
         * instance.paintFeatures("path-to-wig.txt");
         *
         * @param {string} dataSet Location of the file with the input data in text format.
         *   <pre>variableStep chrom=chr2 span=5
         * 10    34
         * 20    41
         * 30    46
         * 40    49
         * 50    52
         *
         *  ...
         *
         * or
         *
         * fixedStep chrom=chr2 start=10 step=10 span=5
         * 34
         * 41
         * 46
         * 49
         * 52
         *
         *  ...</pre>
         *
         */
        paintFeatures: function (dataSet) {
            if (dataSet != undefined) {
                this._setDataSource(dataSet);
                this._init();
            } else {
                alert('Dataset not defined ');
            }

        },

        /**
         * Private: Initializes the component.
         */
        _init: function () {
            Biojs.wigExplorer.myself = this;
            var self = this;
            var painter_div = jQuery("#" + this.opt.target);
            painter_div.text('');
            painter_div.append(this._withSliderOnly(100));

            painter_div.append('<div id=' + this.opt.target + '_wigFeaturePainter-holder></div>');
            var holder = document.getElementById(this.opt.target + '_wigFeaturePainter-holder');
            if (!holder) {
                this.$errorMsg = jQuery('<div id="wigFeaturePainter-errorInit"></div>')
                    .html('There was an unexpected failure, the image cannot be displayed.')
                    .dialog({
                        autoOpen: true,
                        title: 'Error',
                        modal: true
                    });
                throw "Error";
            }


            holder.innerHTML = "";
            holder.style.height = "250px";
            holder.style.width = "700px";
            this.width = $('#' + self.opt.target + '_wigFeaturePainter-holder').width(),
                this.height = $('#' + self.opt.target + '_wigFeaturePainter-holder').height(),
                this.r = self.opt.radius;

            self.opt.width = self.opt.width.toString();

            if (self.opt.width.indexOf("%") >= 1)
                self.opt.width = self.opt.width.toString();
            else
                self.opt.width = parseInt(this.width);

            //had similar problem before so I used contains and it should works
            self.opt.height = self.opt.height.toString();
            if (self.opt.height.indexOf("%") >= 1)
                self.opt.height = self.opt.height.toString();
            if (self.opt.height.indexOf("%") != -1)
                this.height = this.height * (self.opt.height.substring(0, self.opt.height.length - 1) * 1) / 100.0;
            else
                this.height = self.opt.height * 1;
            self.opt.height = parseInt(this.height);

            self.color = function () {
                return d3.scale.ordinal().range(self.colors);
            }();

            jQuery.ajax({
                type: "GET",
                url: self.opt.dataSet,
                dataType: "text",
                success: function (data) {
                    var wig = [];
                    var max = 0
                    var data_split = data.split("\n")
                    var data_len = data_split.length;
                    if (data.indexOf("variableStep") >= 0 || data.indexOf("fixedStep") >= 0) {
                        self.chrom = []
                        for (var i = 0; i < data_len; i++) {
                            if (data_split[i].indexOf("chrom") >= 0) {
                                var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                                if (self.chrom.indexOf(chr) < 0) {
                                    self.chrom.push(chr);
                                }
                            }
                        }
                        self._buildReferenceSelector();
                    } else {
                        alert("Unknown format detected")
                    }

                },
                error: function (qXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        },


        /**
         * Private: Function to create reference dropdown.
         * @ignore
         */
        _buildReferenceSelector: function () {
            var self = this;

            this._headerDiv = jQuery('#' + self.opt.target + '_selectorMenu');
            this._headerDiv.css({
                'font-family': '"Heveltica Neue", Arial, "sans serif"',
                'font-size': '14px'
            }).append('Reference: ');

            var selector_html = "<select id=" + self.opt.target + "ref_selector>";

            for (var i = 0; i < this.chrom.length; i++) {
                selector_html += "<option value='" + this.chrom[i] + "'>" + this.chrom[i] + "</option>"
            }
            selector_html += "/<select>";

            this._formatSelector = jQuery(selector_html).appendTo(self._headerDiv);

            this._formatSelector.change(function (e) {
                self.opt.reference = jQuery(this).val();
                self.setReference(self.opt.reference, self.opt.target)
            });

            self.setReference(this._formatSelector.val())
        },


        /**
         * Private: Function to create slider only.
         * @param {int} sizeX Width.
         * @ignore
         */
        _withSliderOnly: function (sizeX) {
            var self = this;
            var text =
                '<table width="' + sizeX + 'px">' +
                    '<tr>' +
                    '<td width="75%">' +
                    '<div  id="' + self.opt.target + '_wigFeaturePainter-slider" style="margin-left: 10px;"></div>' +
                    '</td>' +
                    '<td><div id="' + self.opt.target + '_selectorMenu"> </div>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<br/>';
            return text;
        },
        /**
         * Private: Paints the slider
         * Purpose:  set up slider buttons
         * Returns:  -
         * @ignore
         */
        _paintSlider: function () {//holder size, left and right margins of the holder, and number of amino acids
            var sequenceLength = 100;//config.sequenceLength;
            var self = this;
            if (!document.getElementById(self.opt.target + "_wigFeaturePainter-slider")) {
                return;
            }

            var slider_div = jQuery("#" + self.opt.target + "_wigFeaturePainter-slider");
            slider_div.text('');
            slider_div.append('<label for="wigFeaturePainter-slider-values"></label>');
            slider_div.append('<div type="text" id="wigFeaturePainter-slider-values" style="margin-bottom:5px" />');

            var length = this.track.length - 1;
            var difference = parseInt(this.track[length][0]) - parseInt(this.track[0][0]);

            var diff = parseInt(difference / 20);
            this.zoomSlider = jQuery('<div id="wigFeaturePainter-slider-bar" style="width:300px"></div>').appendTo(slider_div);


            var updater_html = '<div id = ' + self.opt.dataSet + ' class="ui-button ui-widget ui-corner-all ui-button-text-only zoomin" ><span title="Zoom In" class="ui-button ui-icon ui-icon-zoomin"></span></div>' +
                '<div id = ' + self.opt.dataSet + ' class="ui-button ui-widget ui-corner-all ui-button-text-only zoomout"  ><span title="Zoom Out" class="ui-button ui-icon ui-icon-zoomout"></span></div>' +
                '<div id = ' + self.opt.dataSet + ' class="ui-button ui-widget ui-corner-all ui-button-text-only left"  ><span title="Left" class="ui-button ui-icon ui-icon-arrowthick-1-w"></span></div>' +
                '<div id = ' + self.opt.dataSet + ' class="ui-button ui-widget ui-corner-all ui-button-text-only right"  ><span title="Right" class="ui-button ui-icon ui-icon-arrowthick-1-e"></span></div>';

            jQuery(slider_div).html("")
            this._updateSelector = jQuery(updater_html).appendTo(slider_div);

            this._updateSelector.click(function (e) {
                if (jQuery(this).hasClass("left")) {
                    self._updateDraw(-1 * diff, -1 * diff, self.opt.target);
                } else if (jQuery(this).hasClass("right")) {
                    self._updateDraw(diff, diff, self.opt.target);
                } else if (jQuery(this).hasClass("zoomin")) {
                    self._updateDraw(diff, -1 * diff, self.opt.target);
                } else if (jQuery(this).hasClass("zoomout")) {
                    self._updateDraw(-1 * diff, diff, self.opt.target);
                }
            });
        },


        /**
         * Select reference from Wig file from the given parameter and then parse Data for reference
         *
         * @example
         * instance.setReference("ref_name")
         *
         */
        setReference: function (ref_chr) {
            var self = this;
            var flag = false;
            jQuery.ajax({
                type: "GET",
                url: self.opt.dataSet,
                dataType: "text",
                success: function (data) {
                    var wig = [];
                    var max = 0
                    var data_split = data.split("\n")
                    var data_len = data_split.length;
                    var span = null;
                    var ref = false;
                    if (data.indexOf("variableStep") >= 0) {

                        var data_split = data.split("\n")
                        var data_len = data_split.length;


                        for (var i = 0; i < data_len; i++) {
                            if (data_split[i].indexOf("chrom") >= 0) {
                                var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                                flag = false;
                                if (chr == ref_chr) {
                                    if (data_split[i].indexOf("span") >= 0) {
                                        span = data_split[i].split(/\s+/)[2].split("=")[1]
                                    }
                                    flag = true;
                                    ref = true;
                                }
                            }
                            else if (data_split[i].indexOf("#") >= 0) {
                                continue;
                            } else if (flag) {
                                var temp_data = data_split[i].split(/\s+/);
                                wig.push([temp_data[0], temp_data[1], span]);
                                if (parseInt(temp_data[1]) > parseInt(max)) {
                                    max = temp_data[1];
                                }
                            }
                        }
                        self.max = max;

                        self.track = wig;
                        if (ref == false) {
                            alert("Selected reference not found")
                        } else if (wig.length > 0) {
                            var start = parseInt(wig[0][0]);//config.requestedStart;
                            var stop = parseInt(wig[wig.length - 1][0]);


                            self.slider_start = start;
                            self.slider_stop = stop;
                            self.data_last_start = stop;
                            self.data_first_start = start;

                        }
                        else {
                            alert("No data for selected reference")
                        }


                    }
                    else if (data.indexOf("fixedStep") >= 0) {
                        var data_split = data.split("\n")
                        var data_len = data_split.length;
                        var start = null;
                        var step = null;
                        var ref = false;

                        for (var i = 0; i < data_len; i++) {
                            if (data_split[i].indexOf("chrom") >= 0) {
                                var line = data_split[i].split(/\s+/);

                                var chr = data_split[i].split(/\s+/)[1].split("=")[1];
                                flag = false;

                                if (chr == ref_chr) {
                                    start = line[2].split("=")[1];
                                    step = line[3].split("=")[1];
                                    if (data_split[i].indexOf("span") >= 0) {
                                        span = line[4].split("=")[1]
                                    }

                                    flag = true;
                                    ref = true;
                                }
                            }
                            else if (data_split[i].indexOf("#") >= 0) {
                                continue;
                            } else if (flag) {
                                var temp_data = data_split[i];
                                start = parseInt(start) + parseInt(step)
                                wig.push([start, temp_data, span]);
                                if (parseInt(temp_data) > parseInt(max)) {
                                    max = temp_data;
                                }
                            }
                        }

                        self.max = max;
                        self.track = wig;

                        if (ref == false) {
                            alert("Selected reference not found")
                        } else if (wig.length > 0) {
                            var start = parseInt(wig[0][0]);//config.requestedStart;
                            var stop = parseInt(wig[wig.length - 1][0]);


                            self.slider_start = start;
                            self.slider_stop = stop;
                            self.data_last_start = stop;
                            self.data_first_start = start;

                        } else if (start == null || step == null) {
                            alert("Unknown format detected")
                        }
                        else {
                            alert("No data for selected reference")
                        }
                    }
                    else {
                        alert("Unknown format detected")
                    }
                },
                error: function (qXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            }).done(function () {
                    self._paintSlider();
                    self._updateDraw();
                });
        },

        /**
         * Draws area chart from wig file using D3.js based on the specified positions
         *
         * @example
         * instance.paintWig(1000,100000,"target-div")
         *
         */
        paintWig: function (start, end, target) {
            var self = this;
            if (this.track.length > 0) {
                var color = this.opt.selectionBackgroundColor
                var left = "50px";
                var top = "0px";
                var filtered_track = [];
                var height = this.height;
                var width = this.width;
                var max = this.max;


                // filter data if start and end positions are defined
                if (start && end) {
                    if (start < self.slider_start) {
                        start = self.slider_start;
                    }
                    if (end > self.slider_stop) {
                        end = self.slider_stop
                    }


                    filtered_track = this.track;
                    filtered_track = jQuery.grep(filtered_track, function (element) {
                        return element[0] >= start && element[0] <= end; // retain appropriate elements
                    });
                }
                else {
                    filtered_track = this.track;
                    var length = this.track.length - 1;
                    end = parseInt(this.track[length][0]);
                    start = parseInt(this.track[0][0]);
                }
                var space = parseInt(width) / (end - start);

                var length = filtered_track.length - 1;
                if (length > 0) {

                    this._clear(target);
                    var svg = d3.select('#' + target + '_wigFeaturePainter-holder').append("svg")
                        .attr("width", this.width + 20)
                        .attr("height", $('#' + target + '_wigFeaturePainter-holder').height())
                        .append("g")
                        .attr("transform", "translate(" + left + "," + top + ")");

                    this._container = jQuery('#' + target + '_wigFeaturePainter-holder');

                    var d3line2 = d3.svg.line()
                        .x(function (d) {
                            return d.x;
                        })
                        .y(function (d) {
                            return d.y;
                        })
                        .interpolate("linear");

                    var end_val = parseInt(filtered_track[length][0]) + parseInt(filtered_track[1][0] - filtered_track[0][0]);
                    var start_val = parseInt(filtered_track[0][0]) - (parseInt(filtered_track[1][0] - filtered_track[0][0]));

                    if (start_val < 0) {
                        start_val = 0;
                    }

                    // add a 0 to start position
                    filtered_track.splice(0, 0, [start_val, 0]);

                    // add a 0 to end position
                    filtered_track.splice(filtered_track.length, 0, [end_val, 0]);

                    var pathinfo = [];

                    var last_start = 0;
                    // check for average difference between each positions
                    var diff = parseInt(filtered_track[1][0] - filtered_track[0][0]);
                    if (diff > parseInt(filtered_track[2][0] - filtered_track[1][0]) || diff > parseInt(filtered_track[3][0] - filtered_track[2][0])) {
                        if (diff > parseInt(filtered_track[2][0] - filtered_track[1][0])) {
                            diff = parseInt(filtered_track[2][0] - filtered_track[1][0])
                        }
                        else {
                            diff = parseInt(filtered_track[3][0] - filtered_track[2][0])
                        }
                    }
                    else {
                    }

                    // loop through each element and calculate x and y axis for chart
                    for (var i = 0; i < filtered_track.length - 1;) {
                        var tempx;
                        if (start > 0) {
                            tempx = (filtered_track[i][0] - start) * space;
                        }
                        else {
                            tempx = (filtered_track[i][0]) * space;
                        }
                        var tempy = height - (filtered_track[i][1] * height / max);
                        pathinfo.push({ x: tempx, y: tempy});

                        i++;

                        if (last_start < filtered_track[i][0] - diff) {

                            if (start > 0) {
                                tempx = ((parseInt(last_start) + parseInt(diff)) - start) * space;
                            }
                            else {
                                tempx = ((parseInt(last_start) + parseInt(diff))) * space;
                            }

                            var tempy = height;

                            pathinfo.push({ x: tempx, y: tempy});

                            if (start > 0) {
                                tempx = ((parseInt(filtered_track[i][0]) - parseInt(diff)) - start) * space;
                            }
                            else {
                                tempx = ((parseInt(filtered_track[i][0]) - parseInt(diff))) * space;
                            }
                            var tempy = height;

                            pathinfo.push({ x: tempx, y: tempy});

                        }

                        last_start = filtered_track[i][0];

                    }

                    if (start > 0) {
                        tempx = (filtered_track[filtered_track.length - 1][0] - start) * space;
                    }
                    else {
                        tempx = (filtered_track[filtered_track.length - 1][0]) * space;
                    }

                    var tempy = height - (filtered_track[filtered_track.length - 1][1] * height / max);

                    pathinfo.push({ x: tempx, y: tempy});
                    var path = svg.selectAll("path")
                        .data([1]);

                    //select 10 positions to be displayed on x axis
                    var filter_track_legend = [];
                    var legend_start = filtered_track[0][0]
                    var diff = (filtered_track[filtered_track.length - 1][0] - filtered_track[0][0]) / 10;

                    for (i = 0; i < 10; i++) {
                        if (filtered_track[i][2]) {
                            filter_track_legend.push([
                                [parseInt(legend_start) + parseInt(i * diff)],
                                [filtered_track[i][2]]
                            ]);
                        } else {
                            filter_track_legend.push([
                                [parseInt(legend_start) + parseInt(i * diff)]
                            ]);
                        }
                    }

                    //draw selected 10 positions as legend
                    var legendtext = svg.selectAll('text.day')
                        .data(filter_track_legend);

                    legendtext.enter().append('svg:text')
                        .attr('x', 40)
                        .attr('y', 155)
                        .attr("transform", function (d, i) {
                            if (start > 0) {
                                return "translate(" + (((d[0] - start) * space) + 150) + "," + 100 + ")rotate(90)";
                            }
                            else {
                                return  "translate(" + (((d[0]) * space) + 150) + "," + 100 + ")rotate(90)";
                            }
                        })
                        .text(function (d) {
                            if (d[0] > 1000000) {
                                return parseFloat(d[0] / 1000000).toFixed(2) + "M";
                            } else if (d[0] > 1000) {
                                return parseFloat(d[0] / 1000).toFixed(2) + "K";
                            } else {
                                if (d[1]) {
                                    return parseInt(d[0]) + " - " + (parseInt(d[0]) + parseInt(d[1]));
                                } else {
                                    return parseInt(d[0]);
                                }
                            }
                        });


// lines at bottom of diagram to show the positions
                    var line = svg.selectAll("line.bottom")
                        .data(filter_track_legend);

                    line.enter().insert("svg:line")
                        .attr("class", "line")
                        .attr("x1", function (d) {
                            if (start > 0) {
                                return parseInt((d[0] - start) * space);
                            }
                            else {
                                return  parseInt((d[0] ) * space);
                            }
                        })
                        .attr("y1", 130)
                        .attr("x2",function (d) {
                            if (start > 0) {
                                return parseInt((d[0] - start) * space);
                            }
                            else {
                                return  parseInt((d[0] ) * space);
                            }
                        }).attr("y2", 140)
                        .attr('stroke', function () {
                            return "black";
                        });

                    //draw path from calculated chart axis
                    path.enter().append("svg:path")
                        .attr("width", 200)
                        .attr("height", 200)
                        .attr("class", "path")

                        .attr('stroke', function () {
                            return "steelblue";
                        })
                        .attr('stroke-width', function () {
                            return "1px";
                        })
                        .attr("fill", function () {
                            return color;
                        })
                        .attr("d", d3line2(pathinfo));

                }
            } else {
                alert("Reference not set: use instance.setReference")
            }


        },

        /**
         * Private: Clears all divs content.
         * @ignore
         */
        _clear: function (target) {
            jQuery('#' + target + '_wigFeaturePainter-holder').html("");
        },

        /**
         * Private: sets data source.
         * @param {string} [dataset], it sets file path to this.opt.dataset.
         * @ignore
         */
        _setDataSource: function (dataSet) {
            this.opt.dataSet = dataSet;
        },

        _addSimpleClickTrigger: function () {

            var self = this;

            // Add the click event to each character in the content
            this._container.find('span')
                .click(function (e) {
                    // TIP: e.target contains the clicked DOM node
                    var selected = jQuery(e.target).text();

                    // Create an event object
                    var evtObject = { "selected": selected };

                    // We're ready to raise the event onClick of our component
                    self.raiseEvent('onClick', evtObject);
                });
        }


    }, {
        myself: undefined
    });