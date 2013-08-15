/**
 * This is the description of the HelloWorld component. Here you can set any HTML text
 * for putting on the generated documentation.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="http://www.tgac.ac.uk/bioinformatics/sequencing-informatics/core-bioinformatics/anil-thanki/">Anil Thanki</a>
 * @version 1.0.0
 * @category 1
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
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.InteractionsD3.css'>InteractionsD3 CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.wigExplorer.css" />
 *
 *
 * @param {Object} options An object with the options for HelloWorld component.
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
 *    File in TSV format including input data. Example of TSV file ... <br/>
 *  <pre>start	value
 *  10	34
 *  20	41
 *  30	46
 *  40	49
 *  ...</pre>
 *
 * @example
 * var instance = new Biojs.wigExplorer({
 *                                              target: "YourOwnDivId",
 *                                              selectionBackgroundColor: '#99FF00',
 *                                              dataSet: "../biojs/data/wigExplorerDataSet.tsv"
 *                                          });
 *
 */


Biojs.wigExplorer = Biojs.extend(
        /** @lends Biojs.wigExplorer# */

     //todo: Check @option {string} dataSet is correct. I saw in your example dataSet is part of your input options.
     //todo: I have also moved the test.tsv file from the registry to a data folder src/main/resources/data/wigExplorerDataSet.tsv

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
                                  'background-color': self.opt.backgroundColor,
                                  'color': self.opt.fontColor,
                                  'font-size': '36px',
                                  'text-align': 'center',
                                  'vertical-align': 'middle',
//                                  'display': 'table-cell',
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

            //todo: this.opt.json was undefined. I though this paintFeatures method could have json configuration and the input data. Since I do not know what kind of configuration you mean to use by now I am just providing the data.
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
            backgroundColor: "#7BBFE9",
            selectionFontColor: "black",
            selectionBackgroundColor: "yellow",
            width: "100%",
            height: "130",
            radius: 10
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
             * @param {boolean} [withoutZoom=false] When false, it zooms according to the slider values.
             * @param {int} [newStart] Zoom from this sequence start value.
             * @param {int} [newStop] Zoom to this sequence end value.
             *
             * @example
             * instance._updateDraw();
             *
             */
            _updateDraw: function (withoutZoom, newStart, newStop) {
                var now = new Date();

                //recalculate start and stop
                if (newStart && newStop) {
                    this.slider_start += newStart;
                    this.slider_stop += newStop;
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
                this._clear(withoutZoom);

                this._paintJson(undefined, this.slider_start, this.slider_stop);
            },

          //todo: I change the example to "instance" to make it consistent with the examples above
          /**
           * Paint the features according to the values specified in the json object defined when creating the object.
           * This method initializes the holder, paints the slider and print button depending on the options, and
           * paints the features and legend.
           *
           * @example
           * instance.paintFeatures("../biojs/data/wigExplorerDataSet2.tsv");
           *
           * @param {string} dataSet Location of the file with the input data in TSV format.
           *  <pre>start	value
           *  10	34
           *  20	41
           *  30	46
           *  40	49
           *  ...</pre>
           */
          paintFeatures: function (dataSet) {
            //todo: The json variable was not used. It seems to me it would be useful to pass the input data plus configuration. By now I am just defining the input data since I am not sure about the configuration in json.
            if (dataSet != undefined) {
              this._setDataSource(dataSet);
              this._init();
            } else {
                //todo: output error: no dataSet
            }

          },

          /**
           * Private: Initializes the component.
           */
          _init: function () {
            Biojs.wigExplorer.myself = this;
            //First create the slider, button, and holder
            var painter_div = jQuery("#" + this.opt.target);
            painter_div.text('');
            painter_div.append(this._withSliderOnly(100));

            painter_div.append('<div id="wigFeaturePainter-holder"></div>');

            var holder = document.getElementById("wigFeaturePainter-holder");
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
            holder.style.height = "200px";
            holder.style.width = "700px";
            var self = this;
            this.width = $("#wigFeaturePainter-holder").width(),
                    this.height = $("#wigFeaturePainter-holder").height(),
                    this.r = self.opt.radius;

            //todo: when setting a new file I had problems with "self.opt.width" wich was not defined as string, so indexOf was not working.
            self.opt.width = self.opt.width.toString();
            if (self.opt.width.indexOf("%") != -1)
              this.width = this.width * (self.opt.width.substring(0, self.opt.width.length - 1) * 1) / 100.0;
            else
              this.width = self.opt.width * 1;
            self.opt.width = parseInt(this.width);

            //todo: when setting a new file I had problems with "self.opt.width" wich was not defined as string, so indexOf was not working.
            self.opt.height = self.opt.height.toString();
            if (self.opt.height.indexOf("%") != -1)
              this.height = this.height * (self.opt.height.substring(0, self.opt.height.length - 1) * 1) / 100.0;
            else
              this.height = self.opt.height * 1;
            self.opt.height = parseInt(this.height);


            self.color = function () {
              return d3.scale.ordinal().range(self.colors);
            }();


            d3.tsv(self.opt.dataSet, function (data, error) {
              self.track = data;
              var length = data.length - 1;
              var start = parseInt(data[0].start);//config.requestedStart;
              var stop = parseInt(data[length].start);//config.requestedStop;

              self.slider_start = start;
              self.slider_stop = stop;
              self.data_last_start = stop;
              self.data_first_start = start;

              self.max = Math.max.apply(Math, data.map(function (o) {
                return o.value;
              }));

              self._paintSlider();
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
                    '<td width="75%">' +
                    '<div  id="wigFeaturePainter-slider" style="margin-left: 10px;"></div>' +
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
            if (!document.getElementById("wigFeaturePainter-slider")) {
              return;
            }

            var slider_div = jQuery("#wigFeaturePainter-slider");
            slider_div.text('');
            slider_div.append('<label for="wigFeaturePainter-slider-values"></label>');
            slider_div.append('<div type="text" id="wigFeaturePainter-slider-values" style="margin-bottom:5px" />');
            var self = this;
            var diff = self.track.length / 10;
            this.zoomSlider = jQuery('<div id="wigFeaturePainter-slider-bar" style="width:300px"></div>').appendTo(slider_div);


            slider_div.html('<button id="button_left" onclick=Biojs.wigExplorer.myself._updateDraw(undefined,' + (-1 * diff) + ',' + (-1 * diff) + '); ><-</button>' +
                            ' <button class="ui-button ui-icon ui-icon-arrowthick-1-e" onclick=Biojs.wigExplorer.myself._updateDraw(undefined,' + (1 * diff) + ',' + (1 * diff) + '); >-></button> ' +
                            ' <button class="ui-button ui-icon ui-icon-plus" onclick=Biojs.wigExplorer.myself._updateDraw(undefined,' + (1 * diff) + ',' + (-1 * diff) + '); >+</button>' +
                            ' <button class="ui-button ui-icon ui-icon-minus" onclick=Biojs.wigExplorer.myself._updateDraw(undefined,' + (-1 * diff) + ',' + (1 * diff) + '); >-</button>')
          },



          /**
           * Private: Paints the shapes and rectangles.
           * @param {boolean} [withoutZoom=false] When true, this method recalculates the total for each feature type.
           * @param {int} [start=0] When true, this method recalculates the total for each feature type.
           * @param {int} [end=max] When true, this method recalculates the total for each feature type.
           * @ignore
           */
          _paintJson: function (withoutZoom, start, end) {
            var now = new Date();
            var self = this;
            var left = "50px";
            var top = "0px";
            var svg = d3.select("#wigFeaturePainter-holder").append("svg")
                    .attr("width", this.width)
                    .attr("height", this.height + 20)
                    .append("g")
                    .attr("transform", "translate(" + left + "," + top + ")");

            this._container = jQuery("#wigFeaturePainter-holder");
            var filtered_track = [];

            var d3line2 = d3.svg.line()
                    .x(function (d) {
                         return d.x;
                       })
                    .y(function (d) {
                         return d.y;
                       })
                    .interpolate("linear");


            var height = this.height;
            var width = this.width;
            var max = this.max;

            if (start && end) {
              filtered_track = this.track;
              filtered_track = jQuery.grep(filtered_track, function (element, index) {
                return element.start >= start && element.start <= end; // retain appropriate elements
              });
            }
            else {
              filtered_track = this.track;
              var length = this.track.length - 1;
              end = parseInt(this.track[length].start);
              start = parseInt(tthis.track[0].start);
            }

            var space = parseInt(width) / (end - start);

            var length = filtered_track.length - 1;
            var end_val = parseInt(filtered_track[length].start) + parseInt(filtered_track[1].start - filtered_track[0].start);
            var start_val = parseInt(filtered_track[0].start) - (parseInt(filtered_track[1].start - filtered_track[0].start));

            filtered_track.splice(0, 0, {start: start_val, value: '0'});

            filtered_track.splice(filtered_track.length, 0, {start: end_val, value: '0'});

            var pathinfo = [];

            var last_start = 0;
            var diff = parseInt(filtered_track[1].start - filtered_track[0].start);
            if (diff > parseInt(filtered_track[2].start - filtered_track[1].start) || diff > parseInt(filtered_track[3].start - filtered_track[2].start)) {
              if (diff > parseInt(filtered_track[2].start - filtered_track[1].start)) {
                diff = parseInt(filtered_track[2].start - filtered_track[1].start)
              }
              else {
                diff = parseInt(filtered_track[3].start - filtered_track[2].start)
              }
            }
            else {
            }
            for (var i = 0; i < filtered_track.length - 1;) {
              var tempx;
              if (start > 0) {
                tempx = (filtered_track[i].start - start) * space;
              }
              else {
                tempx = (filtered_track[i].start) * space;
              }
              var tempy = height - (filtered_track[i].value * height / max);
              pathinfo.push({ x: tempx, y: tempy});

              i++;

              if (last_start < filtered_track[i].start - diff) {

                if (start > 0) {
                  tempx = ((parseInt(last_start) + parseInt(diff)) - start) * space;
                }
                else {
                  tempx = ((parseInt(last_start) + parseInt(diff))) * space;
                }

                var tempy = height;

                pathinfo.push({ x: tempx, y: tempy});

                if (start > 0) {
                  tempx = ((parseInt(filtered_track[i].start) - parseInt(diff)) - start) * space;
                }
                else {
                  tempx = ((parseInt(filtered_track[i].start) - parseInt(diff))) * space;
                }
                var tempy = height;

                pathinfo.push({ x: tempx, y: tempy});

              }

              last_start = filtered_track[i].start;

            }

            if (start > 0) {
              tempx = (filtered_track[filtered_track.length - 1].start - start) * space;
            }
            else {
              tempx = (filtered_track[filtered_track.length - 1].start) * space;
            }

            var tempy = height - (filtered_track[filtered_track.length - 1].value * height / max);
            pathinfo.push({ x: tempx, y: tempy});
            var path = svg.selectAll("path")
                    .data([1]);


            var filter_track_legend = [];
            for (i = 0; i < length;) {
              filter_track_legend.push(filtered_track[i]);
              i += Math.floor(length / 10);
            }

            var legendtext = svg.selectAll('text.day')
                    .data(filter_track_legend);

            legendtext.enter().append('svg:text')
                    .attr('x', function (d) {
                            if (start > 0) {
                              return (d.start - start) * space;
                            }
                            else {
                              return  (d.start ) * space;
                            }
                          })
                    .attr('y', 150)
                    .attr('text-anchor', 'middle')
                    .text(function (d) {
                            return d.start;
                          });

            path.enter().append("svg:path")
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("class", "path")

                    .attr('stroke', function () {
                            return "blue";
                          })
                    .attr('stroke-width', function () {
                            return "2px";
                          })
                    .attr("fill", function () {
                            return "lightblue";
                          })
                    .attr("d", d3line2(pathinfo));

          },

          /**
           * Private: Clears all divs content.
           * @param {boolean} [withoutZoom=false] When true, it sets to 0 the total count for all feature types.
           * @ignore
           */
          _clear: function (withoutZoom) {
            //todo: check withoutZoom is not used
            jQuery("#wigFeaturePainter-holder").html("");
          },


          _setDataSource: function (dataSet) {
            //todo: lets make this function private since you already have paintFeatures which makes more sense to have it public
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


        },{
        //todo: Just check you are happy with this change. I am using "Biojs.wigExplorer.myself" instead of Biojs_wigExplorer_myself so the variable myself is still inside BioJS.
            myself: undefined
        });