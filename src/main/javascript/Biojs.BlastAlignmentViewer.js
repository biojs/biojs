/** 
 * This is the description of the BlastAlignmentViewer component.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:xwatkins@ebi.ac.uk">Xavier Watkins</a>
 * @version 1.0.0
 * @category 1
 *
 * @requires <a href="http://code.jquery.com/jquery-1.9.1.min.js">jQuery Core 1.9.1</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.9.1.min.js"></script>
 *
 * @requires <a href='http://d3js.org/'>D3</a>
 * @dependency <script src="http://d3js.org/d3.v3.min.js" type="text/javascript"></script>
 *
 * @param {Object} options
 *    An object with the options for BlastAlignmentViewer component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {Object} data
 *    Object with Blast information
 *
 * @example
 *			var instance = new Biojs.BlastAlignmentViewer({
 *				target : "YourOwnDivId",
 *				data: {
 *					id:'P1234',
 *					alignment:[{
 *						identity: 120,
 *						query_start:14,
 *						match_start:43,
 *						query_end:84,
 *						match_end:113,
 *						query_length:100,
 *						match_length:150,
 *						overLapLength:70,
 *						query_gaps:[{start:83,end:87},{start:93,end:94}],
 *						match_gaps:[{start:76,end:87}]
 *					}]
 *				}
 *			});
 *
 */
Biojs.BlastAlignmentViewer = Biojs.extend(
    /** @lends Biojs.BlastAlignmentViewer# */
    {
        constructor: function(options) {
            var self = this,
                data = options.data;

            var translated_data = this._computeOffsets(data.alignment[0]);

            var scale = d3.scale.linear()
                .domain([1, translated_data.totalaa])
                .range([0, this.opt._width]);

            // draw parent SVG element
            var svg = d3.select('#' + this.opt.target)
                .append("svg")
                .attr("width", this.opt._width)
                .attr("height", this.opt._height)
                .attr("name", data.id)
                .selectAll("g")
                .data(data.alignment).enter()
                .append("g");

            // make query rectangle
            var query = svg.append("rect").attr(self._queryAttr(scale, translated_data));

            // make sub rectangle
            var subject = svg.append("rect").attr(self._subAttr(scale, translated_data));

            //add gaps
            svg.append("g")
                .selectAll("rect")
                .data(function(d) {
                    return d.query_gaps;
                }).enter()
                .append("rect")
                .attr("x", function(d) {
                    return scale(d.start + translated_data.qGapOffSet);
                })
                .attr("y", this.opt._bar_height)
                .attr("width", function(d) {
                    return scale(d.end - d.start);
                })
                .attr("height", this.opt._bar_height)
                .attr("fill", "white");
            //
            svg.append("g")
                .selectAll("rect")
                .data(function(d) {
                    return d.match_gaps;
                }).enter()
                .append("rect")
                .attr("x", function(d) {
                    return scale(d.start + translated_data.mGapOffSet);
                })
                .attr("y", 2 * this.opt._padding + this.opt._bar_height)
                .attr("width", function(d) {
                    return scale(d.end - d.start);
                })
                .attr("height", this.opt._bar_height)
                .attr("fill", "white");
            //
            //		// Draw lines
            svg.append("line")
                .attr("x1", function(d) {
                    return scale(translated_data.qStartaa);
                })
                .attr("y1", this.opt._bar_height + (this.opt._bar_height / 2))
                .attr("x2", function(d) {
                    return scale(translated_data.qStartaa + translated_data.qLengthaa - 1);
                })
                .attr("y2", this.opt._bar_height + (this.opt._bar_height / 2))
                .attr("stroke", "#000000");

            svg.append("line")
                .attr("x1", function(d) {
                    return scale(translated_data.mStartaa);
                })
                .attr("y1", this.opt._bar_height * 3)
                .attr("x2", function(d) {
                    return scale(translated_data.mStartaa + translated_data.mLengthaa - 1);
                })
                .attr("y2", this.opt._bar_height * 3)
                .attr("stroke", function(d) {
                    return self._colorScale(100 - d.identity);
                });
            // make match box
            var match = svg.append("rect").attr(self._matchAttr(scale, translated_data));
            //		
            // left mask
            if (translated_data.prefixaa > 1) {
                var config = {};
                config = $.extend(this._mask(), config);
                config.x = function(d) {
                    return 0;
                };
                config.width = function(d) {
                    return scale(translated_data.overLapStartaa);
                };
                svg.append("rect").attr(config);
            }
            //		// right mask
            if (translated_data.suffixaa > 0) {
                var config = {};
                config = $.extend(this._mask(), config);
                config.x = function(d) {
                    return scale(translated_data.prefixaa + translated_data.overLapLength);
                };
                config.width = function(d) {
                    return self.opt._width - scale(translated_data.prefixaa + translated_data.overLapLength);
                };
                svg.append("rect").attr(config);
            }


        },

        /**
         * Default values for the options
         * @name Biojs.BlastAlignmentViewer-opt
         */
        opt: {
            target: "alignment-container",
            data: {},
            _width: 600,
            _height: 40,
            _padding: 7,
            _bar_height: 10
        },

        _colorScale: d3.scale.linear()
            .domain([1, 50, 100])
            .range(['#FF0000', '#00FF00', '#0000FF']),

        _queryAttr: function(scale, translated_data) {
            return {
                "x": function(d) {
                    return scale(translated_data.qStartaa);
                },
                "y": this.opt._bar_height,
                "width": function(d) {
                    return scale(translated_data.qLengthaa);
                },
                "height": this.opt._bar_height,
                "class": "query"
            };
        },

        _subAttr: function(scale, translated_data) {
            var self = this;
            var y1 = 2 * this.opt._padding + this.opt._bar_height;
            var y2 = 2 * this.opt._padding + this.opt._bar_height + this.opt._bar_height;
            return {
                "x": function(d) {
                    return scale(translated_data.mStartaa);
                },
                "y": 2 * this.opt._padding + this.opt._bar_height,
                "width": function(d) {
                    return scale(translated_data.mLengthaa);
                },
                "fill": function(d) {
                    return self._colorScale(100 - d.identity);
                },
                "height": this.opt._bar_height,
                "class": "subject"
            };
        },


        _matchAttr: function(scale, translated_data) {
            var height = this.opt._height - this.opt._padding;
            return {
                "x": function(d) {
                    return scale(translated_data.overLapStartaa);
                },
                "y": this.opt._padding - 1,
                "width": function(d) {
                    return scale(translated_data.overLapLength);
                },
                "height": height,
                "fill": "none",
                "stroke-width": "1px",
                "stroke": "#000000",
                "class": "match"
            };
        },

        _mask: function() {
            return {
                "y": this.opt._padding - 1,
                "height": this.opt._height,
                "opacity": "0.7",
                "fill": "#FFFFFF",
                "class": "mask"
            };
        },

        _getTotalGapSize: function(gaps) {
            var counter = 0;
            for (var i = 0; i < gaps.length; i++) {
                counter += (gaps[i].end - gaps[i].start);
            }
            return counter;
        },

        _computeOffsets: function(d) {
            var translated_data = {};
            /*
             * 	aa: amino acid count
             *
             *  ____________ ______________________________________________ _________
             * |qPrefixaa   |					overLapLength			   |qsuffixaa|			<< query
             * |____________|______________________________________________|_________|
             *     _________ ______________________________________________ ____________
             *    |mPrefixaa|					overLapLength			   |msuffixaa	|		<< match
             *    |_________|______________________________________________|____________|
             *
             * |------------------------------qLengthaa------------------------------|
             *    |--------------------------mLengthaa----------------------------------|
             * |--prefixaa--|-------------------overlapaa------------------|--suffixaa--|
             * |-----------------------------totalaa------------------------------------|
             *
             */
            translated_data.qPrefixaa = d.query_start - 1;
            translated_data.mPrefixaa = d.match_start - 1;
            translated_data.prefixaa = Math.max(translated_data.qPrefixaa, translated_data.mPrefixaa);

            translated_data.qsuffixaa = d.query_length - d.query_end;
            translated_data.msuffixaa = d.match_length - d.match_end;
            translated_data.suffixaa = Math.max(translated_data.qsuffixaa, translated_data.msuffixaa);

            translated_data.totalaa = translated_data.prefixaa + d.overLapLength + translated_data.suffixaa;
            translated_data.qLengthaa = translated_data.qPrefixaa + d.overLapLength + translated_data.qsuffixaa;
            translated_data.mLengthaa = translated_data.mPrefixaa + d.overLapLength + translated_data.msuffixaa;

            var prefixDiff = translated_data.qPrefixaa - translated_data.mPrefixaa;
            if (prefixDiff > 0) {
                translated_data.qStartaa = 1;
                translated_data.overLapStartaa = d.query_start;
                translated_data.mStartaa = prefixDiff;
                translated_data.qGapOffSet = 0;
                translated_data.mGapOffSet = prefixDiff;
            } else {
                translated_data.mStartaa = 1;
                translated_data.overLapStartaa = d.match_start;
                translated_data.qStartaa = prefixDiff === 0 ? 1 : Math.abs(prefixDiff);
                translated_data.mGapOffSet = 0;
                translated_data.qGapOffSet = prefixDiff;
            }
            translated_data.overLapLength = d.overLapLength;
            return translated_data;
        }

    });