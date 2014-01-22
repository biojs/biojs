/**
 * This component uses the D3 library to visualise contents of a DNA sequence, with panning and zooming functionality.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="http://www.tgac.ac.uk/bioinformatics/sequencing-informatics/core-bioinformatics/anil-thanki/">Anil Thanki</a>, <a href="http://www.tgac.ac.uk/bioinformatics/genome-analysis/shabhonam-caim/">Shabhonam Caim</a>
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
 * @requires <a href=''>biojs.DNAContentViewer.css</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.DNAContentViewer.css" />
 *
 *
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI CSS 1.8.2</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 *
 *
 * @param {Object} options An object with the options for DNAContentViewer component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} [fontFamily='"Andale mono", courier, monospace']
 *    Font list to be applied to the component content.
 *
 * @option {string} [fontColor="white"]
 *    HTML color code for the font.
 *
 * @option {string} [backgroundColor="#7BBFE9"]
 *     Background color for the entire div content.
 *
 * @option {Object} [selectionFontColor="white"]
 *     This color will be used to change the font color of selected text.
 *
 * @option {Object} [selectionBackgroundColor="yellow"]
 *     This color will be used to change the background of selected text.
 *
 * @option {string} dataSet
 *    File in text format including input sequence data in raw format. Example of text file ... <br/>
 *  <pre>ACGACTAGCATCAGCATCGACACGACTAGCACTGGACTGAATCGACATCGACATGC
 *  ...</pre>
 *
 * @example
 * var instance = new Biojs.DNAContentViewer({
 *      target: "YourOwnDivId",
 *      selectionBackgroundColor: '#99FF00',
 *      dataSet: "../biojs/data/DNAContentViewerData.txt"
 * });
 *
 */


Biojs.DNAContentViewer = Biojs.extend(
    /** @lends Biojs.DNAContentViewer# */


    {
        zoomSlider: '',
        slider_stop: 0,
        slider_start: 0,
        track: [],
        track_bins: [],
        width: 1,
        height: 1,
        data_last_start: 1,
        data_first_start: 1,
        max: 0,
        data: [],
        main_data: [],


        constructor: function (options) {

            var self = this;
            self.vis = null;
            self.color = null;
            self.foci = [];


            this.track; // data
            this.track_bins; // data


            this._container = $("#DNAContentFeaturePainter-holder");
            $(this._container).addClass("graph");


            // Apply options values
            this._container.css({
                'font-family': self.opt.fontFamily, // this is one example of the use of self instead of this
                'background-color': self.opt.backgroundColor,
                'color': self.opt.fontColor,
                'font-size': '36px',
                'text-align': 'center',
                'vertical-align': 'middle',
//                'left':'10px',
                'width': '600px',
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

            this.paintDNAContentContent(self.opt.dataSet);

        },

        /**
         *  Default values for the options
         *  @name Biojs.DNAContentViewer-opt
         */
        opt: {
            target: "YourOwnDivId",
            dataSet: "",
            fontFamily: '"Andale mono", courier, monospace',
            fontColor: "white",
            backgroundColor: "#7BBFE9",
            selectionFontColor: "black",
            selectionBackgroundColor: "yellow",
            width: "100%",
            height: "130",
            radius: 10
        },

        /**
         * Array containing the supported event names
         * @name Biojs.DNAContentViewer-eventTypes
         */
        eventTypes: [
        /**
         * No events added for now but can be added in future
         */
        ],


        /**
         * Repaints everything: ruler, shapes, and legend.
         * @param {boolean} [withoutZoom=false] When false, it zooms according to the slider values.
         * @param {int} [newStart] Zoom from this sequence start value.
         * @param {int} [newStop] Zoom to this sequence end value.
         *
         * @example
         * instance._updateDraw();
         *
         */
        _updateDraw: function (withoutZoom, newStart, newStop) {
            //recalculate start and stop

            if (newStart && newStop) {

                this.slider_start += newStart;
                this.slider_stop += newStop;
                this._calculateContent(this.slider_start, this.slider_stop);
            }
            else {
                this._calculateContent();

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

            this._paintDNAContentGraph(undefined, this.slider_start, this.slider_stop);
        },

        /**
         * Paint the features according to the values specified in the json object defined when creating the object.
         * This method initializes the holder, paints the slider and print button depending on the options, and
         * paints the features and legend.
         *
         * @example
         * instance.paintDNAContentContent("../biojs/data/DNAContentViewerData.txt");
         *
         * @param {string} dataSet Location of the file with the input text file in raw sequence format.
         *  <pre>ACGACTACGACTAGCATCAGCATCAGCACTAGCATCAGCACTAGCACTAGCACTAGCATCAGCACTAGCACTAGCACTGACACT...</pre>
         */
        paintDNAContentContent: function (dataSet) {
            if (dataSet != undefined) {
                this._setDataSource(dataSet);
                this._init();
            } else {
                this.$errorMsg = jQuery('<div id="DNAContentFeaturePainter-errorInit"></div>')
                    .html('There was an unexpected failure, the image cannot be displayed. data is undefined.')
                    .dialog({
                        autoOpen: true,
                        title: 'Error',
                        modal: true
                    });
                throw "Error";
            }

        },

        /**
         * Private: Initializes the component.
         */
        _init: function () {
            Biojs.DNAContentViewer.myself = this;
            //First create the slider, button, and holder
            var painter_div = jQuery("#" + this.opt.target);
            painter_div.text('');
            painter_div.append(this._withSliderOnly(100));

            painter_div.append('<div id="DNAContentPainter-holder" style="overflow: visible; left: 10px; position: relative"></div>');

            var holder = document.getElementById("DNAContentPainter-holder");
            if (!holder) {
                this.$errorMsg = jQuery('<div id="DNAContentPainter-errorInit"></div>')
                    .html('There was an unexpected failure, the image cannot be displayed.')
                    .dialog({
                        autoOpen: true,
                        title: 'Error',
                        modal: true
                    });
                throw "Error";
            }
            holder.innerHTML = "";
            holder.style.height = "200px";
            holder.style.width = "700px";
            var self = this;
            this.width = $("#DNAContentPainter-holder").width(),
                this.height = $("#DNAContentPainter-holder").height(),
                this.r = self.opt.radius;

            self.opt.width = self.opt.width.toString();
            if (self.opt.width.indexOf("%") != -1)
                this.width = this.width * (self.opt.width.substring(0, self.opt.width.length - 1) * 1) / 100.0;
            else
                this.width = self.opt.width * 1;
            self.opt.width = parseInt(this.width);

            self.opt.height = self.opt.height.toString();
            if (self.opt.height.indexOf("%") != -1)
                this.height = this.height * (self.opt.height.substring(0, self.opt.height.length - 1) * 1) / 100.0;
            else
                this.height = self.opt.height * 1;
            self.opt.height = parseInt(this.height);


            self.color = function () {
                return d3.scale.ordinal().range(self.colors);
            }();

            d3.text(self.opt.dataSet, function (data, error) {
                self.track = data;
                var length = data.length - 1;
                self._paintLegend();
                self._updateLegend(self._Statsforchunk(self.track));
                self.slider_start = 0;
                self.slider_stop = length;
                self.data_last_start = length;
                self.data_first_start = 0;

                self._paintSlider();
                self._paintMarkersGraph();
                self._updateDraw();
            });

        },

        /**
         * Private: Function to create slider only.
         * @param {int} sizeX Width.
         * @ignore
         */
        _withSliderOnly: function (sizeX) {
            var text =
                '<table width="' + sizeX + 'px">' +
                    '<tr>' +
                    '<td width="33%" id="DNAContentPainter-slider" style="margin-left: 10px;">' +
                    '</td>' +
                    '<td width="33%" id="Marker-Legend">' +
                    '</td>' +
                    '<td width="33%" id="DNAContentPainter-Legend" style="margin-right: 10px;">' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<br/>';
            return text;
        },


        /**
         * Private: Function to calculate AT/GC content for given positions.
         * @param {string} newStart start position.
         * @param {string} newStop stop position.
         * @ignore
         */
        _calculateContent: function (newStart, newStop) {
            var sequence = this.track;
            if (newStart && newStop) {
                if (newStart < 0) {
                    newStart = 0;
                }
                if (newStop > this.slider_stop) {
                    newStop = this.slider_stop;
                }

                sequence = sequence.substring(newStart, newStop)

            } else {
                newStart = 0;
            }

            var DNAContent_content = []
            var seq_len = sequence.length;
            var i = 0;
            if (seq_len > 100) {
                while (i <= seq_len) {
                    var chunk = sequence.substr(i, Math.floor(seq_len / 100));
                    DNAContent_content.push({start: parseInt(newStart) + parseInt(i), gc_value: this._GCforchunk(chunk), at_value: this._ATforchunk(chunk)});
                    i += Math.floor(seq_len / 100);
                }
                if (i < seq_len) {
                    var chunk = sequence.substr(i);
                    DNAContent_content.push({start: parseInt(newStart) + parseInt(i), gc_value: this._GCforchunk(chunk), at_value: this._ATforchunk(chunk)});
                }
            } else {
                while (i <= seq_len) {
                    var chunk = sequence.substr(i, 10);
                    DNAContent_content.push({start: parseInt(newStart) + parseInt(i), gc_value: this._GCforchunk(chunk), at_value: this._ATforchunk(chunk)});
                    i += 1;
                }
            }

            this.max = 100;
            this.track_bins = DNAContent_content;
        },



        /**
         * Private:  Function to calculate AT/GC stats for chunk..
         * @param {string} chunk sequence.
         * Returns: (int) gc
         * @ignore
         */
        _Statsforchunk: function (chunk) {
            var chunk_array = chunk.split("");
            var gc = 0;
            var at = 0;
            var ot = 0;
            var total = 0;
            for (var a = 0; a < chunk_array.length; a++) {
                if (chunk_array[a].toLocaleLowerCase() == "g" || chunk_array[a].toLocaleLowerCase() == "c") {
                    gc++;
                }
                else if (chunk_array[a].toLocaleLowerCase() == "a" || chunk_array[a].toLocaleLowerCase() == "t") {
                    at++;
                }
                else {
                    ot++;
                }
                total++;
            }
            return ({total: total, gc: gc, at: at, ot: ot});
        },


        /**
         * Private: Function to calculate AT % for chunk.
         * @param {string} chunk sequence.
         * Returns: (int) gc
         * @ignore
         */
        _GCforchunk: function (chunk) {
            var chunk_array = chunk.split("");
            var gc = 0;
            var total = 0;
            for (var a = 0; a < chunk_array.length; a++) {
                if (chunk_array[a].toLocaleLowerCase() == "g" || chunk_array[a].toLocaleLowerCase() == "c") {
                    gc++;
                }
                total++;
            }
            return gc * 100 / total;
        },

        /**
         * Private: Function to calculate AT % for chunk.
         * @param {string} chunk sequence.
         * Returns: (int) at
         * @ignore
         */
        _ATforchunk: function (chunk) {
            var chunk_array = chunk.split("");
            var at = 0;
            var total = 0;

            for (var a = 0; a < chunk_array.length; a++) {
                if (chunk_array[a].toLocaleLowerCase() == "a" || chunk_array[a].toLocaleLowerCase() == "t") {
                    at++;
                }
                total++;
            }
            return at * 100 / total;
        },


        /**
         * Private: Paints the slider
         * Purpose:  set up slider buttons
         * Returns:  -
         * @ignore
         */
        _paintSlider: function () {//holder size, left and right margins of the holder, and number of amino acids
            var sequenceLength = 100;//config.sequenceLength;
            if (!document.getElementById("DNAContentPainter-slider")) {
                return;
            }

            var slider_div = jQuery("#DNAContentPainter-slider");
            slider_div.text('');
            slider_div.append('<label for="DNAContentPainter-slider-values"></label>');
            slider_div.append('<div type="text" id="DNAContentPainter-slider-values" style="margin-bottom:5px" />');
            var self = this;
            var diff = parseInt(self.track.length / 100);
            this.zoomSlider = jQuery('<div id="DNAContentPainter-slider-bar" style="width:300px"></div>').appendTo(slider_div);


            slider_div.html('<b>Controls:</b><br><div class="ui-button ui-widget ui-corner-all ui-button-text-only" onclick=Biojs.DNAContentViewer.myself._updateDraw(undefined,' + (1 * diff) + ',' + (-1 * diff) + ');><span title="Zoom In" class="ui-button ui-icon ui-icon-zoomin"></span></div>' +
                '<div class="ui-button ui-widget ui-corner-all ui-button-text-only"  onclick=Biojs.DNAContentViewer.myself._updateDraw(undefined,' + (-1 * diff) + ',' + (1 * diff) + '); ><span title="Zoom Out" class="ui-button ui-icon ui-icon-zoomout"></span></div>' +
                '<div class="ui-button ui-widget ui-corner-all ui-button-text-only"  onclick=Biojs.DNAContentViewer.myself._updateDraw(undefined,' + (-1 * diff) + ',' + (-1 * diff) + ');><span title="Left" class="ui-button ui-icon ui-icon-arrowthick-1-w"></span></div>' +
                '<div class="ui-button ui-widget ui-corner-all ui-button-text-only"  onclick=Biojs.DNAContentViewer.myself._updateDraw(undefined,' + (1 * diff) + ',' + (1 * diff) + ');><span title="Right" class="ui-button ui-icon ui-icon-arrowthick-1-e"></span></div>')
        },

        /**
         * Private: Paints the AT/GC Legengd and MArker radio buttons
         * Returns:  -
         * @ignore
         */
        _paintLegend: function () {//holder size, left and right margins of the holder, and number of amino acids
            var self = this;

            if (!document.getElementById("DNAContentPainter-slider")) {
                return;
            }

            var slider_div_legend = jQuery("#DNAContentPainter-Legend");

            slider_div_legend.html('<div class=""> <font color="blue">  <input id=gc_checkbox type=checkbox checked> GC Content <span id=gc_perc> </span> </font></div>' +
                '<div class="">  <font color="red"> <input id=at_checkbox type=checkbox checked> AT Content <span id=at_perc> </span></font></div>')

            $("#at_checkbox").change(function () {
                self._toggleAT();
            });


            $("#gc_checkbox").change(function () {
                self._toggleGC();
            });


            var marker_legend = jQuery("#Marker-Legend");

            marker_legend.html('<div class=""> Marker Position: <br> <input type="radio" name="marker-pos" class="marker-pos" value="left" checked> Left <input type="radio" class="marker-pos" name="marker-pos" value="centre"> Centre <input type="radio" class="marker-pos" name="marker-pos" value="right"> Right </div>')

            $(".marker-pos").change(function () {
                self._toggleMarker(this);
            });
        },

        /**
         * Private: Updates percentage values in AT/GC legends
         * Returns:  -
         * @ignore
         */
        _updateLegend: function (stats) {//holder size, left and right margins of the holder, and number of amino acids

            if (!document.getElementById("DNAContentPainter-slider")) {
                return;
            }

            var at_perc = parseFloat(stats.at * 100 / stats.total).toFixed(2);
            var gc_perc = parseFloat(stats.gc * 100 / stats.total).toFixed(2);


            var gc_perc_div = jQuery("#gc_perc");
            var at_perc_div = jQuery("#at_perc");


            gc_perc_div.html(gc_perc + '%')
            at_perc_div.html(at_perc + '%')
        },


        /**
         * Private: Draws area chart from DNA string using D3.js
         * @param {boolean} [withoutZoom=false] When true, this method recalculates the total for each feature type.
         * @param {int} [start=0] When true, this method recalculates the total for each feature type.
         * @param {int} [end=max] When true, this method recalculates the total for each feature type.
         * @ignore
         */
        _paintDNAContentGraph: function (withoutZoom, start, end) {
            var self = this;
            var left = "50px";
            var top = "0px";
            var filtered_track = this.track_bins;

            // filter data if start and end positions are defined
            if (start && end) {
                filtered_track = jQuery.grep(self.track_bins, function (element) {
                    return element.start >= start && element.start <= end; // retain appropriate elements
                });
            }


            var height = this.height;
            var width = this.width;
            var max = Math.ceil(this.max / 100) * 100
            var length = filtered_track.length - 1;

            var space = parseInt(width) / (filtered_track[length].start - filtered_track[0].start);

            if (length > 0) {

                this._clear();

                var svg = d3.select("#DNAContentPainter-holder").select("svg")
                    .append("g")
                    .attr("width", this.width)
                    .attr("height", this.height + 30)
                    .attr("class", "redrawn-path")
                    .attr("transform", "translate(" + left + "," + top + ")");

                this._container = jQuery("#DNAContentPainter-holder");

                var d3line2 = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    })
                    .interpolate("linear");


                var gc_pathinfo = [];
                var at_pathinfo = [];

                var last_start = 0;
                // check for average difference between each positions
                var diff = parseInt(filtered_track[1].start - filtered_track[0].start);


                // loop through each element and calculate x and y axis for chart
                for (var i = 0; i < filtered_track.length - 1;) {


                    var gc_tempx, at_tempx;

                    if (start) {
                        gc_tempx = (filtered_track[i].start - start) * space;
                        at_tempx = (filtered_track[i].start - start) * space;
                    } else {
                        gc_tempx = (filtered_track[i].start) * space;
                        at_tempx = (filtered_track[i].start) * space;

                    }
                    var gc_tempy = height - (filtered_track[i].gc_value * height / max);
                    var at_tempy = height - (filtered_track[i].at_value * height / max);
                    gc_pathinfo.push({ x: gc_tempx, y: gc_tempy});
                    at_pathinfo.push({ x: at_tempx, y: at_tempy});

                    i++;

                    last_start = filtered_track[i].start;

                }

                if (start) {
                    gc_tempx = (filtered_track[filtered_track.length - 1].start - start) * space;
                    at_tempx = (filtered_track[filtered_track.length - 1].start - start) * space;
                }

                var gc_tempy = height - (filtered_track[filtered_track.length - 1].gc_value * height / max);
                var at_tempy = height - (filtered_track[filtered_track.length - 1].at_value * height / max);

                gc_pathinfo.push({ x: gc_tempx, y: gc_tempy});
                at_pathinfo.push({ x: at_tempx, y: at_tempy});

                var path = svg.selectAll("path")
                    .data([1]);

                //select 10 positions to be displayed on x axis
                var filter_track_legend = [];
                for (i = 0; i < filtered_track.length;) {
                    filter_track_legend.push(filtered_track[i]);
                    i += parseInt(length / 10);
                }

                //draw selected 10 positions as legend
                var legendtext = svg.selectAll('text.day')
                    .data(filter_track_legend);

                legendtext.enter().append('svg:text')
                    .attr('x', function (d) {
                        if (start) {
                            return  (d.start - start) * space;

                        } else {
                            return  (d.start ) * space;
                        }
                    })
                    .attr('y', 160)
                    .attr('text-anchor', 'middle')
                    .style("font-size", "10px")
                    .text(function (d) {
                        if (d.start > 1000000) {
                            return parseInt(d.start / 1000000) + "M";
                        } else if (d.start > 1000) {
                            return parseInt(d.start / 1000) + "K";
                        } else {
                            return d.start;
                        }
                    });

                //select 10 positions to be displayed on x axis
                var marker_legend = [];

                for (i = 1; i <= 10; i++) {
                    marker_legend.push((max / 10) * i);

                }

                // lines at bottom of diagram to show the positions
                var line = svg.selectAll("line.bottom")
                    .data(filtered_track);
                line.enter().insert("svg:line")
                    .attr("class", "line")
                    .attr("x1", function (d) {
                        if (start) {
                            return  (d.start - start) * space;

                        } else {
                            return  (d.start ) * space;
                        }
                    })
                    .attr("y1", 130)
                    .attr("x2",function (d) {
                        if (start) {
                            return  (d.start - start) * space;

                        } else {
                            return  (d.start ) * space;
                        }
                    }).attr("y2", function (d, i) {
                        return  140;
                    })
                    .attr('stroke', function () {
                        return "black";
                    });

                var line = svg.selectAll("line.bottom")
                    .data(filter_track_legend);
                line.enter().insert("svg:line")
                    .attr("class", "line")
                    .attr("x1", function (d) {
                        if (start) {
                            return  (d.start - start) * space;

                        } else {
                            return  (d.start ) * space;
                        }
                    })
                    .attr("y1", 130)
                    .attr("x2",function (d) {
                        if (start) {
                            return  (d.start - start) * space;

                        } else {
                            return  (d.start ) * space;
                        }
                    }).attr("y2", function (d, i) {
                        return  150;
                    })
                    .attr('stroke', function () {
                        return "black";
                    });


                var line_base = svg.selectAll("line.bottom")
                    .data([1]);
                line_base.enter().insert("svg:line")
                    .attr("class", "line base")
                    .attr("x1", function (d) {

                        return  0;
                    })
                    .attr("y1", function (d) {
                        return  height;
                    })
                    .attr("x2",function (d) {
                        return  width;
                    }).attr("y2", function (d) {
                        return  height;
                    })
                    .attr('stroke', function () {
                        return "black";
                    });


                //draw path from calculated chart axis
                path.enter().append("svg:path")
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("class", "path gc-path")

                    .attr('stroke', function () {
                        return "blue";
                    })
                    .attr('stroke-width', function () {
                        return "2px";
                    })
                    .attr("fill", function () {
                        return "transparent";
                    })
                    .attr("d", d3line2(gc_pathinfo));


                //draw path from calculated chart axis
                path.enter().append("svg:path")
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("class", "path at-path")

                    .attr('stroke', function () {
                        return "red";
                    })
                    .attr('stroke-width', function () {
                        return "2px";
                    })
                    .attr("fill", function () {
                        return "transparent";
                    })
                    .attr("d", d3line2(at_pathinfo));
            }
        },

        /**
         * Private: Draws percentage markers using D3.js
         * @ignore
         */
        _paintMarkersGraph: function () {
            var left = "50px";
            var top = "0px";
            var height = this.height;
            var width = this.width;
            var max = 100


            this._clear();

            var svg = d3.select("#DNAContentPainter-holder").append("svg")
                .style("overflow", "visible")
                .append("g")
                .attr("class", "marker-base")
                .attr("width", this.width)
                .attr("height", this.height + 30)
                .attr("transform", "translate(" + left + "," + top + ")");

            this._container = jQuery("#DNAContentPainter-holder");


            //select 10 positions to be displayed on x axis
            var marker_legend = [];

            for (var i = 1; i <= 10; i++) {
                marker_legend.push((max / 10) * i);

            }


            var markertext = svg.selectAll('text.marker')
                .data(marker_legend);

            markertext.enter().append('svg:text')
                .attr("class", "text marker")
                .attr('x', function (d) {
                    return  10;
                })
                .attr('y', function (d) {
                    return  height - (d * height / max) + parseInt(5);
                })
                .attr('text-anchor', 'begin')
                .style("font-size", "10px")
                .text(function (d, i) {
                    return ((i + 1) * 10) + "%";
                });

            // lines at bottom of diagram to show the positions
            var marker = svg.selectAll("tick.marker")
                .data(marker_legend);
            marker.enter().insert("svg:line")
                .attr("class", "tick tickmarker")
                .attr("x1", function (d) {
                    return  0;
                })
                .attr("y1", function (d) {
                    return  height - (d * height / max);
                })
                .attr("x2",function (d) {
                    return  5;
                }).attr("y2", function (d) {
                    return  height - (d * height / max);
                })
                .attr('stroke', function () {
                    return "black";
                });

            var marker_base = svg.selectAll("line.bottom")
                .data([1]);
            marker_base.enter().insert("svg:line")
                .attr("class", "line marker base")
                .attr("x1", function (d) {
                    return  1;
                })
                .attr("y1", function (d) {
                    return  0;
                })
                .attr("x2",function (d) {
                    return  1;
                }).attr("y2", function (d) {
                    return  height;
                })
                .attr('stroke', function () {
                    return "black";
                });
        },

        /**
         * Private: Paints the slider
         * Purpose:  set up slider buttons
         * Returns:  -
         * @ignore
         */
        _toggleAT: function () {//holder size, left and right margins of the holder, and number of amino acids
            if (jQuery(".at-path").css('display') == 'none') {
                jQuery(".at-path").show();
            } else {
                jQuery(".at-path").hide();
            }
        },

        /**
         * Private: Paints the slider
         * Purpose:  set up slider buttons
         * Returns:  -
         * @ignore
         */
        _toggleGC: function () {//holder size, left and right margins of the holder, and number of amino acids

            if (jQuery(".gc-path").css('display') == 'none') {
                jQuery(".gc-path").show();
            } else {
                jQuery(".gc-path").hide();
            }
        },

        /**
         * Private: Paints the slider
         * Purpose:  set up slider buttons
         * Returns:  -
         * @ignore
         */
        _toggleMarker: function (self) {//holder size, left and right margins of the holder, and number of amino acids
            console.log(self)
            var svg = d3.select("#DNAContentPainter-holder")
            var width = this.width;
            var marker = svg.selectAll("line.marker");
            var marker_text = svg.selectAll("text.marker");
            var marker_tick = svg.selectAll("line.tick");

            if (self.value == "left") {
                marker.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  1;
                    })
                    .attr("x2", function (d) {
                        return  1;
                    });

                marker_text.transition()
                    .duration(500)
                    .attr('text-anchor', 'begin')
                    .attr('x', function (d) {
                        return  10;
                    });

                marker_tick.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  0;
                    })
                    .attr("x2", function (d) {
                        return  5;
                    })
            } else if (self.value == "centre") {
                marker.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  width / 2;
                    })
                    .attr("x2", function (d) {
                        return  width / 2;
                    });

                marker_text.transition()
                    .duration(500)
                    .attr('text-anchor', 'begin')
                    .attr('x', function (d) {
                        return  parseInt(width / 2) + parseInt(10);
                    });

                marker_tick.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  width / 2;
                    })
                    .attr("x2", function (d) {
                        return  parseInt(width / 2) + parseInt(5);
                    })
            } else {
                marker.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  width;
                    })
                    .attr("x2", function (d) {
                        return  width;
                    });

                marker_text.transition()
                    .duration(500)
                    .attr('text-anchor', 'end')
                    .attr('x', function (d) {
                        return  parseInt(width) - parseInt(10);
                    });

                marker_tick.transition()
                    .duration(500)
                    .attr("x1", function (d) {
                        return  (width - 5);
                    })
                    .attr("x2", function (d) {
                        return  width;
                    })
            }
        },

        /**
         * Private: Clears all divs content.
         * @ignore
         */
        _clear: function () {
            d3.select("#DNAContentPainter-holder").select("svg").select("g.redrawn-path").remove();
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
                    // A letter was clicked!
                    // Let's discover which one was it
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