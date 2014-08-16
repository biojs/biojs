"use strict"
var tnt = {};
var utils = require('../utils/utils');
tnt.utils = {};
tnt.utils.api = require("../utils/api");


tnt.board = function () {

    //// Private vars
    var svg;
    var div_id;
    var tracks = [];
    var min_width = 50;
    var height = 0; // This is the global height including all the tracks
    var width = 920;
    var height_offset = 20;
    var loc = {
        species: undefined,
        chr: undefined,
        from: 0,
        to: 500
    };

    // TODO: We have now background color in the tracks. Can this be removed?
    // It looks like it is used in the too-wide pane etc, but it may not be needed anymore
    var bgColor = d3.rgb('#F8FBEF'); //#F8FBEF
    var pane; // Draggable pane
    var svg_g;
    var xScale;
    var zoomEventHandler = d3.behavior.zoom();
    var limits = {
        left: 0,
        right: 1000,
        zoom_out: 1000,
        zoom_in: 100
    };
    var cap_width = 3;
    var dur = 500;
    var drag_allowed = true;

    var exports = {
        ease: d3.ease("cubic-in-out"),
        extend_canvas: {
            left: 0,
            right: 0
        },
        show_frame: true
        // limits        : function () {throw "The limits method should be defined"}	
    };

    // The returned closure / object
    var track_vis = function (div) {
        div_id = d3.select(div).attr("id");

        // The original div is classed with the tnt class
        d3.select(div)
            .classed("tnt", true);

        // TODO: Move the styling to the scss?
        var browserDiv = d3.select(div)
            .append("div")
            .attr("id", "tnt_" + div_id)
            .style("position", "relative")
            .classed("tnt_framed", exports.show_frame ? true : false)
            .style("width", (width + cap_width * 2 + exports.extend_canvas.right + exports.extend_canvas.left) + "px")

        var groupDiv = browserDiv
            .append("div")
            .attr("class", "tnt_groupDiv");

        // The SVG
        svg = groupDiv
            .append("svg")
            .attr("class", "tnt_svg")
            .attr("width", width)
            .attr("height", height)
            .attr("pointer-events", "all");

        svg_g = svg
            .append("g")
            .attr("transform", "translate(0,20)")
            .append("g")
            .attr("class", "tnt_g");

        // caps
        svg_g
            .append("rect")
            .attr("id", "tnt_" + div_id + "_5pcap")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", height)
            .attr("fill", "red");
        svg_g
            .append("rect")
            .attr("id", "tnt_" + div_id + "_3pcap")
            .attr("x", width - cap_width)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", height)
            .attr("fill", "red");

        // The Zooming/Panning Pane
        pane = svg_g
            .append("rect")
            .attr("class", "tnt_pane")
            .attr("id", "tnt_" + div_id + "_pane")
            .attr("width", width)
            .attr("height", height)
            .style("fill", bgColor);

        // ** TODO: Wouldn't be better to have these messages by track?
        // var tooWide_text = svg_g
        //     .append("text")
        //     .attr("class", "tnt_wideOK_text")
        //     .attr("id", "tnt_" + div_id + "_tooWide")
        //     .attr("fill", bgColor)
        //     .text("Region too wide");

        // TODO: I don't know if this is the best way (and portable) way
        // of centering the text in the text area
        // var bb = tooWide_text[0][0].getBBox();
        // tooWide_text
        //     .attr("x", ~~(width/2 - bb.width/2))
        //     .attr("y", ~~(height/2 - bb.height/2));
    };

    // API
    var api = tnt.utils.api(track_vis)
        .getset(exports)
        .getset(limits)
        .getset(loc);

    api.transform(track_vis.extend_canvas, function (val) {
        var prev_val = track_vis.extend_canvas();
        val.left = val.left || prev_val.left;
        val.right = val.right || prev_val.right;
        return val;
    });

    // track_vis always starts on loc.from & loc.to
    api.method('start', function () {

        // Reset the tracks
        for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].g) {
                tracks[i].display().reset.call(tracks[i]);
            }
            _init_track(tracks[i]);
        }

        _place_tracks();

        // The continuation callback
        var cont = function (resp) {
            limits.right = resp;

            //zoomEventHandler.xExtent([limits.left, limits.right]);
            if ((loc.to - loc.from) < limits.zoom_in) {
                if ((loc.from + limits.zoom_in) > limits.zoom_in) {
                    loc.to = limits.right;
                } else {
                    loc.to = loc.from + limits.zoom_in;
                }
            }
            plot();

            for (var i = 0; i < tracks.length; i++) {
                _update_track(tracks[i], loc);
            }
        };

        // If limits.right is a function, we have to call it asynchronously and
        // then starting the plot once we have set the right limit (plot)
        // If not, we assume that it is an objet with new (maybe partially defined)
        // definitions of the limits and we can plot directly
        // TODO: Right now, only right can be called as an async function which is weak
        if (typeof (limits.right) === 'function') {
            limits.right(cont);
        } else {
            cont(limits.right);
        }

    });

    var _update_track = function (track, where) {
        if (track.data()) {
            var data_updater = track.data().update();
            data_updater({
                'loc': where,
                'on_success': function () {
                    track.display().update.call(track, xScale);
                }
            });
        }
    };

    var plot = function () {

        xScale = d3.scale.linear()
            .domain([loc.from, loc.to])
            .range([0, width]);

        if (drag_allowed) {
            svg_g.call(zoomEventHandler
                .x(xScale)
                .scaleExtent([(loc.to - loc.from) / (limits.zoom_out - 1), (loc.to - loc.from) / limits.zoom_in])
                .on("zoom", _move)
            );
        }

    };

    // right/left/zoom pans or zooms the track. These methods are exposed to allow external buttons, etc to interact with the tracks. The argument is the amount of panning/zooming (ie. 1.2 means 20% panning) With left/right only positive numbers are allowed.
    api.method('move_right', function (factor) {
        if (factor > 0) {
            _manual_move(factor, 1);
        }
    });

    api.method('move_left', function (factor) {
        if (factor > 0) {
            _manual_move(factor, -1);
        }
    });

    api.method('zoom', function (factor) {
        _manual_move(factor, 0);
    });

    api.method('find_track_by_id', function (id) {
        for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].id() === id) {
                return tracks[i];
            }
        }
    });

    api.method('reorder', function (new_tracks) {
        // TODO: This is defining a new height, but the global height is used to define the size of several
        // parts. We should do this dynamically

        for (var j = 0; j < new_tracks.length; j++) {
            var found = false;
            for (var i = 0; i < tracks.length; i++) {
                if (tracks[i].id() === new_tracks[j].id()) {
                    found = true;
                    tracks.splice(i, 1);
                    break;
                }
            }
            if (!found) {
                _init_track(new_tracks[j]);
                _update_track(new_tracks[j], {
                    from: loc.from,
                    to: loc.to
                });
            }
        }

        for (var x = 0; x < tracks.length; x++) {
            tracks[x].g.remove();
        }

        tracks = new_tracks;
        _place_tracks();

    });

    api.method('remove_track', function (track) {
        track.g.remove();
    });

    api.method('add_track', function (track) {
        if (track instanceof Array) {
            for (var i = 0; i < track.length; i++) {
                track_vis.add_track(track[i]);
            }
            return track_vis;
        }
        tracks.push(track);
        return track_vis;
    });

    api.method('tracks', function (new_tracks) {
        if (!arguments.length) {
            return tracks
        }
        tracks = new_tracks;
        return track_vis;
    });

    // 
    api.method('width', function (w) {
        // TODO: Allow suffixes like "1000px"?
        // TODO: Test wrong formats
        if (!arguments.length) {
            return width;
        }
        // At least min-width
        if (w < min_width) {
            w = min_width
        }

        // We are resizing
        if (div_id !== undefined) {
            d3.select("#tnt_" + div_id).select("svg").attr("width", w);
            // Resize the zooming/panning pane
            d3.select("#tnt_" + div_id).style("width", (parseInt(w) + cap_width * 2) + "px");
            d3.select("#tnt_" + div_id + "_pane").attr("width", w);

            // Replot
            width = w;
            plot();
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].g.select("rect").attr("width", w);
                tracks[i].display().reset.call(tracks[i]);
                tracks[i].display().update.call(tracks[i], xScale);
            }

        } else {
            width = w;
        }

        return track_vis;
    });

    api.method('allow_drag', function (b) {
        if (!arguments.length) {
            return drag_allowed;
        }
        drag_allowed = b;
        if (drag_allowed) {
            // When this method is called on the object before starting the simulation, we don't have defined xScale
            if (xScale !== undefined) {
                svg_g.call(zoomEventHandler.x(xScale)
                    //.xExtent([0, limits.right])
                    .scaleExtent([(loc.to - loc.from) / (limits.zoom_out - 1), (loc.to - loc.from) / limits.zoom_in])
                    .on("zoom", _move));
            }
        } else {
            // We create a new dummy scale in x to avoid dragging the previous one
            // TODO: There may be a cheaper way of doing this?
            zoomEventHandler.x(d3.scale.linear()).on("zoom", null);
        }
        return track_vis;
    });

    var _place_tracks = function () {
        var h = 0;
        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            if (track.g.attr("transform")) {
                track.g
                    .transition()
                    .duration(dur)
                    .attr("transform", "translate(0," + h + ")");
            } else {
                track.g
                    .attr("transform", "translate(0," + h + ")");
            }

            h += track.height();
        }

        // svg
        svg.attr("height", h + height_offset);

        // div
        d3.select("#tnt_" + div_id)
            .style("height", (h + 10 + height_offset) + "px");

        // caps
        d3.select("#tnt_" + div_id + "_5pcap")
            .attr("height", h)
            .move_to_front();
        d3.select("#tnt_" + div_id + "_3pcap")
            .attr("height", h)
            .move_to_front();

        // pane
        pane
            .attr("height", h + height_offset);

        // tooWide_text. TODO: Is this still needed?
        // var tooWide_text = d3.select("#tnt_" + div_id + "_tooWide");
        // var bb = tooWide_text[0][0].getBBox();
        // tooWide_text
        //     .attr("y", ~~(h/2) - bb.height/2);

        return track_vis;
    }

    var _init_track = function (track) {
        track.g = svg.select("g").select("g")
            .append("g")
            .attr("class", "tnt_track")
            .attr("height", track.height());

        // Rect for the background color
        track.g
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", track_vis.width())
            .attr("height", track.height())
            .style("fill", track.background_color())
            .style("pointer-events", "none");

        if (track.display()) {
            track.display().init.call(track, width);
        }

        return track_vis;
    };

    var _manual_move = function (factor, direction) {
        var oldDomain = xScale.domain();

        var span = oldDomain[1] - oldDomain[0];
        var offset = (span * factor) - span;

        var newDomain;
        switch (direction) {
        case -1:
            newDomain = [(~~oldDomain[0] - offset), ~~ (oldDomain[1] - offset)];
            break;
        case 1:
            newDomain = [(~~oldDomain[0] + offset), ~~ (oldDomain[1] - offset)];
            break;
        case 0:
            newDomain = [oldDomain[0] - ~~(offset / 2), oldDomain[1] + (~~offset / 2)];
        }

        var interpolator = d3.interpolateNumber(oldDomain[0], newDomain[0]);
        var ease = exports.ease;

        var x = 0;
        d3.timer(function () {
            var curr_start = interpolator(ease(x));
            var curr_end;
            switch (direction) {
            case -1:
                curr_end = curr_start + span;
                break;
            case 1:
                curr_end = curr_start + span;
                break;
            case 0:
                curr_end = oldDomain[1] + oldDomain[0] - curr_start;
                break;
            }

            var currDomain = [curr_start, curr_end];
            xScale.domain(currDomain);
            _move(xScale);
            x += 0.02;
            return x > 1;
        });
    };


    var _move_cbak = function () {
        var currDomain = xScale.domain();
        track_vis.from(~~currDomain[0]);
        track_vis.to(~~currDomain[1]);

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            _update_track(track, loc);
        }
    };
    // The deferred_cbak is deferred at least this amount of time or re-scheduled if deferred is called before
    var _deferred = utils.defer_cancel(_move_cbak, 300);

    // api.method('update', function () {
    // 	_move();
    // });

    var _move = function (new_xScale) {
        if (new_xScale !== undefined && drag_allowed) {
            zoomEventHandler.x(new_xScale);
        }

        // Check if we are in the edges
        var domain = xScale.domain();
        if (domain[0] <= 5) {
            d3.select("#tnt_" + div_id + "_5pcap")
                .attr("width", cap_width)
                .transition()
                .duration(200)
                .attr("width", 0);
        }

        if (domain[1] >= (limits.right) - 5) {
            d3.select("#tnt_" + div_id + "_3pcap")
                .attr("width", cap_width)
                .transition()
                .duration(200)
                .attr("width", 0);
        }

        _deferred();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.display().move.call(track, xScale);
        }
    };

    // api.method({
    // 	allow_drag : api_allow_drag,
    // 	width      : api_width,
    // 	add_track  : api_add_track,
    // 	reorder    : api_reorder,
    // 	zoom       : api_zoom,
    // 	left       : api_left,
    // 	right      : api_right,
    // 	start      : api_start
    // });

    return track_vis;
};

module.exports = exports = tnt.board;