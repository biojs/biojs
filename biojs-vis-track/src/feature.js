var tnt = {};
tnt.track = require('./track');
tnt.utils = {};
tnt.utils.api = require("../utils/api");
tnt.track.layout = require("./layout");

var ensembl_tooltip = require("biojs-vis-tooltip");

// FEATURE VIS
tnt.track.feature = function () {

    ////// Vars exposed in the API
    var exports = {
        create: function () {
            throw "create_elem is not defined in the base feature object"
        },
        mover: function () {
            throw "move_elem is not defined in the base feature object"
        },
        updater: function () {},
        on_click: function () {},
        on_mouseover: function () {},
        guider: function () {},
        index: undefined,
        layout: require('./layout').identity(),
        foreground_color: '#000'
    };

    // The returned object
    var feature = {};

    var reset = function () {
        var track = this;
        track.g.selectAll(".tnt_elem").remove();
        track.g.selectAll(".tnt_guider").remove();
    };

    var init = function (width) {
        var track = this;
        exports.guider.call(track, width);
    };

    var plot = function (new_elems, track, xScale) {
        new_elems.on("click", exports.on_click);
        new_elems.on("mouseover", exports.on_mouseover);
        // new_elem is a g element where the feature is inserted
        exports.create.call(track, new_elems, xScale);
    };

    var update = function (xScale, field) {
        var track = this;
        var svg_g = track.g;
        var layout = exports.layout;

        var elements = track.data().elements();
        if (field !== undefined) {
            elements = elements[field];
        }

        layout(elements, xScale);
        var data_elems = layout.elements();

        var vis_elems;
        // .data(data_elems, exports.index);
        if (field !== undefined) {
            vis_elems = svg_g.selectAll(".tnt_elem_" + field)
                .data(data_elems, exports.index);
        } else {
            if (exports.index) { // Indexing by field
                vis_elems = svg_g.selectAll(".tnt_elem")
                    .data(data_elems, function (d) {
                        if (d !== undefined) {
                            return exports.index(d);
                        }
                    })
            } else { // Indexing by position in array
                vis_elems = svg_g.selectAll(".tnt_elem")
                    .data(data_elems)
            }

        }

        exports.updater.call(track, vis_elems, xScale);

        var new_elem = vis_elems
            .enter();

        new_elem
            .append("g")
            .attr("class", "tnt_elem")
            .classed("tnt_elem_" + field, field)
            .call(feature.plot, track, xScale);

        vis_elems
            .exit()
            .remove();
    };

    var move = function (xScale, field) {
        var track = this;
        var svg_g = track.g;
        var elems;
        // TODO: Is selecting the elements to move too slow?
        // It would be nice to profile
        if (field !== undefined) {
            elems = svg_g.selectAll(".tnt_elem_" + field);
        } else {
            elems = svg_g.selectAll(".tnt_elem");
        }

        exports.mover.call(this, elems, xScale);
    };

    var move_to_front = function (field) {
        if (field !== undefined) {
            var track = this;
            var svg_g = track.g;
            svg_g.selectAll(".tnt_elem_" + field).move_to_front();
        }
    };

    // API
    tnt.utils.api(feature)
        .getset(exports)
        .method({
            reset: reset,
            plot: plot,
            update: update,
            move: move,
            init: init,
            move_to_front: move_to_front
        });

    return feature;
};


tnt.track.feature.composite = function () {
    var displays = {};
    var display_order = [];

    var features = {};

    var reset = function () {
        var track = this;
        for (var i = 0; i < displays.length; i++) {
            displays[i].reset.call(track);
        }
    };

    var init = function (width) {
        var track = this;
        for (var display in displays) {
            if (displays.hasOwnProperty(display)) {
                displays[display].init.call(track, width);
            }
        }
    };

    var update = function (xScale) {
        var track = this;
        for (var i = 0; i < display_order.length; i++) {
            displays[display_order[i]].update.call(track, xScale, display_order[i]);
            displays[display_order[i]].move_to_front.call(track, display_order[i]);
        }
        // for (var display in displays) {
        //     if (displays.hasOwnProperty(display)) {
        // 	displays[display].update.call(track, xScale, display);
        //     }
        // }
    };

    var move = function (xScale) {
        var track = this;
        for (var display in displays) {
            if (displays.hasOwnProperty(display)) {
                displays[display].move.call(track, xScale, display);
            }
        }
    };

    var add = function (key, display) {
        displays[key] = display;
        display_order.push(key);
        return features;
    };

    // API
    tnt.utils.api(features)
        .method({
            reset: reset,
            update: update,
            move: move,
            init: init,
            add: add
        });


    return features;
};

tnt.track.feature.sequence = function () {
    // 'Inherit' from tnt.track.feature
    var feature = tnt.track.feature();

    var config = {
        fontsize: 10,
        sequence: function (d) {
            return d.sequence
        }
    };

    var api = tnt.utils.api(feature)
        .getset(config);


    feature.create(function (new_nts, xScale) {
        var track = this;

        new_nts
            .append("text")
            .attr("fill", track.background_color())
            .style('font-size', config.fontsize + "px")
            .attr("x", function (d) {
                return xScale(d.pos);
            })
            .attr("y", function (d) {
                return~~ (track.height() / 2) + 5;
            })
            .text(config.sequence)
            .transition()
            .duration(500)
            .attr('fill', feature.foreground_color());
    });

    feature.mover(function (nts, xScale) {
        nts.select("text")
            .attr("x", function (d) {
                return xScale(d.pos);
            });
    });

    return feature;
};

tnt.track.feature.gene = function () {

    // 'Inherit' from tnt.track.feature
    var feature = tnt.track.feature()
        .layout(tnt.track.layout.feature())
        .index(function (d) {
            return d.ID;
        });

    var tooltip = function () {
        var tooltip = ensembl_tooltip.table();
        var gene_tooltip = function (gene) {
            var obj = {};
            obj.header = {
                label: "HGNC Symbol",
                value: gene.external_name
            };
            obj.rows = [];
            obj.rows.push({
                label: "Name",
                value: "<a href=''>" + gene.ID + "</a>"
            });
            obj.rows.push({
                label: "Gene Type",
                value: gene.biotype
            });
            obj.rows.push({
                label: "Location",
                value: "<a href=''>" + gene.seq_region_name + ":" + gene.start + "-" + gene.end + "</a>"
            });
            obj.rows.push({
                label: "Strand",
                value: (gene.strand === 1 ? "Forward" : "Reverse")
            });
            obj.rows.push({
                label: "Description",
                value: gene.description
            });

            tooltip.call(this, obj);
        };

        return gene_tooltip;
    };


    feature.create(function (new_elems, xScale) {
        var track = this;

        new_elems
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("y", function (d) {
                return feature.layout().gene_slot().slot_height * d.slot;
            })
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start));
            })
            .attr("height", feature.layout().gene_slot().gene_height)
            .attr("fill", track.background_color())
            .transition()
            .duration(500)
            .attr("fill", function (d) {
                if (d.color === undefined) {
                    return feature.foreground_color();
                } else {
                    return d.color
                }
            });

        new_elems
            .append("text")
            .attr("class", "tnt_name")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("y", function (d) {
                return (feature.layout().gene_slot().slot_height * d.slot) + 25;
            })
            .attr("fill", track.background_color())
            .text(function (d) {
                if (feature.layout().gene_slot().show_label) {
                    return d.display_label
                } else {
                    return ""
                }
            })
            .style("font-weight", "normal")
            .transition()
            .duration(500)
            .attr("fill", function () {
                return feature.foreground_color();
            });
    });

    feature.updater(function (genes) {
        var track = this;
        genes
            .select("rect")
            .transition()
            .duration(500)
            .attr("y", function (d) {
                return (feature.layout().gene_slot().slot_height * d.slot);
            })
            .attr("height", feature.layout().gene_slot().gene_height);

        genes
            .select("text")
            .transition()
            .duration(500)
            .attr("y", function (d) {
                return (feature.layout().gene_slot().slot_height * d.slot) + 25;
            })
            .text(function (d) {
                if (feature.layout().gene_slot().show_label) {
                    return d.display_label;
                } else {
                    return "";
                }
            });
    });

    feature.mover(function (genes, xScale) {
        genes.select("rect")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start));
            });

        genes.select("text")
            .attr("x", function (d) {
                return xScale(d.start);
            })
    });

    tnt.utils.api(feature)
        .method({
            tooltip: tooltip
        });


    return feature;
};

tnt.track.feature.area = function () {
    var feature = tnt.track.feature.line();
    var line = feature.line();

    var area = d3.svg.area()
        .interpolate(line.interpolate())
        .tension(feature.tension());

    var data_points;

    var line_create = feature.create(); // We 'save' line creation
    feature.create(function (points, xScale) {
        var track = this;

        if (data_points !== undefined) {
            //	     return;
            track.g.select("path").remove();
        }

        line_create.call(track, points, xScale);

        area
            .x(line.x())
            .y1(line.y())
            .y0(track.height());

        data_points = points.data();
        points.remove();

        track.g
            .append("path")
            .attr("class", "tnt_area")
            .classed("tnt_elem", true)
            .datum(data_points)
            .attr("d", area)
            .attr("fill", d3.rgb(feature.foreground_color()).brighter());

    });

    var line_mover = feature.mover();
    feature.mover(function (path, xScale) {
        var track = this;
        line_mover.call(track, path, xScale);

        area.x(line.x());
        track.g
            .select(".tnt_area")
            .datum(data_points)
            .attr("d", area);
    });

    return feature;

};

tnt.track.feature.line = function () {
    var feature = tnt.track.feature();

    var x = function (d) {
        return d.pos;
    };
    var y = function (d) {
        return d.val;
    };
    var tension = 0.7;
    var yScale = d3.scale.linear();
    var line = d3.svg.line()
        .interpolate("basis");

    // line getter. TODO: Setter?
    feature.line = function () {
        return line;
    };

    feature.x = function (cbak) {
        if (!arguments.length) {
            return x;
        }
        x = cbak;
        return feature;
    };

    feature.y = function (cbak) {
        if (!arguments.length) {
            return y;
        }
        y = cbak;
        return feature;
    };

    feature.tension = function (t) {
        if (!arguments.length) {
            return tension;
        }
        tension = t;
        return feature;
    };

    var data_points;

    // For now, create is a one-off event
    // TODO: Make it work with partial paths, ie. creating and displaying only the path that is being displayed
    feature.create(function (points, xScale) {
        var track = this;

        if (data_points !== undefined) {
            // return;
            track.g.select("path").remove();
        }

        line
            .tension(tension)
            .x(function (d) {
                return xScale(x(d))
            })
            .y(function (d) {
                return track.height() - yScale(y(d))
            })

        data_points = points.data();
        points.remove();

        yScale
            .domain([0, 1])
        // .domain([0, d3.max(data_points, function (d) {
        // 	return y(d);
        // })])
        .range([0, track.height() - 2]);

        track.g
            .append("path")
            .attr("class", "tnt_elem")
            .attr("d", line(data_points))
            .style("stroke", feature.foreground_color())
            .style("stroke-width", 4)
            .style("fill", "none");

    });

    feature.mover(function (path, xScale) {
        var track = this;

        line.x(function (d) {
            return xScale(x(d))
        });
        track.g.select("path")
            .attr("d", line(data_points));
    });

    return feature;
};

tnt.track.feature.conservation = function () {
    // 'Inherit' from tnt.track.feature.area
    var feature = tnt.track.feature.area();

    var area_create = feature.create(); // We 'save' area creation
    feature.create(function (points, xScale) {
        var track = this;

        area_create.call(track, d3.select(points[0][0]), xScale)
    });

    return feature;
};

tnt.track.feature.ensembl = function () {
    // 'Inherit' from tnt.track.feature
    var feature = tnt.track.feature();

    var foreground_color2 = "#7FFF00";

    feature.guider(function (width) {
        var track = this;
        var height_offset = ~~ (track.height() - (track.height() * .8)) / 2;

        track.g
            .append("line")
            .attr("class", "tnt_guider")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", height_offset)
            .attr("y2", height_offset)
            .style("stroke", feature.foreground_color())
            .style("stroke-width", 1);

        track.g
            .append("line")
            .attr("class", "tnt_guider")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", track.height() - height_offset)
            .attr("y2", track.height() - height_offset)
            .style("stroke", feature.foreground_color())
            .style("stroke-width", 1);

    });

    feature.create(function (new_elems, xScale) {
        var track = this;

        var height_offset = ~~ (track.height() - (track.height() * .8)) / 2;

        new_elems
            .append("rect")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("y", height_offset)
        // 	    .attr("rx", 3)
        // 	    .attr("ry", 3)
        .attr("width", function (d) {
            return (xScale(d.end) - xScale(d.start));
        })
            .attr("height", track.height() - ~~(height_offset * 2))
            .attr("fill", track.background_color())
            .transition()
            .duration(500)
            .attr("fill", function (d) {
                if (d.type === 'high') {
                    return d3.rgb(feature.foreground_color());
                }
                return d3.rgb(feature.foreground_color2())
            });
    });

    feature.updater(function (blocks, xScale) {
        blocks
            .select("rect")
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start))
            });
    });

    feature.mover(function (blocks, xScale) {
        blocks
            .select("rect")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start));
            });
    });

    feature.foreground_color2 = function (col) {
        if (!arguments.length) {
            return foreground_color2;
        }
        foreground_color2 = col;
        return feature;
    };

    return feature;
};

tnt.track.feature.vline = function () {
    // 'Inherit' from tnt.track.feature
    var feature = tnt.track.feature();

    feature.create(function (new_elems, xScale) {
        var track = this;
        new_elems
            .append("line")
            .attr("x1", function (d) {
                // TODO: Should use the index value?
                return xScale(feature.index()(d))
            })
            .attr("x2", function (d) {
                return xScale(feature.index()(d))
            })
            .attr("y1", 0)
            .attr("y2", track.height())
            .attr("stroke", feature.foreground_color())
            .attr("stroke-width", 1);
    });

    feature.mover(function (vlines, xScale) {
        vlines
            .select("line")
            .attr("x1", function (d) {
                return xScale(feature.index()(d));
            })
            .attr("x2", function (d) {
                return xScale(feature.index()(d));
            });
    });

    return feature;

};

tnt.track.feature.block = function () {
    // 'Inherit' from tnt.track.feature
    var feature = tnt.track.feature();

    tnt.utils.api(feature)
        .getset('from', function (d) {
            return d.start;
        })
        .getset('to', function (d) {
            return d.end;
        });

    feature.create(function (new_elems, xScale) {
        var track = this;
        new_elems
            .append("rect")
            .attr("x", function (d, i) {
                // TODO: start, end should be adjustable via the tracks API
                return xScale(feature.from()(d, i));
            })
            .attr("y", 0)
            .attr("width", function (d, i) {
                return (xScale(feature.to()(d, i)) - xScale(feature.from()(d, i)));
            })
            .attr("height", track.height())
            .attr("fill", track.background_color())
            .transition()
            .duration(500)
            .attr("fill", function (d) {
                if (d.color === undefined) {
                    return feature.foreground_color();
                } else {
                    return d.color;
                }
            });
    });

    feature.updater(function (elems, xScale) {
        elems
            .select("rect")
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start));
            });
    });

    feature.mover(function (blocks, xScale) {
        blocks
            .select("rect")
            .attr("x", function (d) {
                return xScale(d.start);
            })
            .attr("width", function (d) {
                return (xScale(d.end) - xScale(d.start));
            });
    });

    return feature;

};


tnt.track.feature.axis = function () {
    var xAxis;
    var orientation = "top";

    // Axis doesn't inherit from tnt.track.feature
    var feature = {};
    feature.reset = function () {
        xAxis = undefined;
        var track = this;
        track.g.selectAll("rect").remove();
        track.g.selectAll(".tick").remove();
    };
    feature.plot = function () {};
    feature.move = function () {
        var track = this;
        var svg_g = track.g;
        svg_g.call(xAxis);
    }

    feature.init = function () {};

    feature.update = function (xScale) {
        // Create Axis if it doesn't exist
        if (xAxis === undefined) {
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient(orientation);
        }

        var track = this;
        var svg_g = track.g;
        svg_g.call(xAxis);
    };

    feature.orientation = function (pos) {
        if (!arguments.length) {
            return orientation;
        }
        orientation = pos;
        return feature;
    };

    return feature;
};

tnt.track.feature.location = function () {
    var row;

    var feature = {};
    feature.reset = function () {};
    feature.plot = function () {};
    feature.init = function () {};
    feature.move = function (xScale) {
        var domain = xScale.domain();
        row.select("text")
            .text("Location: " + ~~domain[0] + "-" + ~~domain[1]);
    };

    feature.update = function (xScale) {
        var track = this;
        var svg_g = track.g;
        var domain = xScale.domain();
        if (row === undefined) {
            row = svg_g;
            row
                .append("text")
                .text("Location: " + ~~domain[0] + "-" + ~~domain[1]);
        }
    };

    return feature;
};

module.exports = exports = tnt.track.feature;