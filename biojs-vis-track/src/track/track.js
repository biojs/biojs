"use strict";

tnt.track = function () {

    var read_conf = {
	// Unique ID for this track
	id : tnt.track.id()
    };

    var display;

    var conf = {
	// foreground_color : d3.rgb('#000000'),
	background_color : d3.rgb('#CCCCCC'),
	height           : 250,
	// data is the object (normally a tnt.track.data object) used to retrieve and update data for the track
	data             : tnt.track.data.empty()
    };

    // The returned object / closure
    var track = function() {
    };

    // API
    var api = tnt.utils.api (track)
	.getset (conf)
	.get (read_conf);

    // TODO: This means that height should be defined before display
    // we shouldn't rely on this
    track.display = function (new_plotter) {
	if (!arguments.length) {
	    return display;
	}
	display = new_plotter;
	if (typeof (display) === 'function') {
	    display.layout && display.layout().height(conf.height);	    
	} else {
	    for (var key in display) {
		if (display.hasOwnProperty(key)) {
		    display[key].layout && display[key].layout().height(conf.height);
		}
	    }
	}

	return track;
    };

    return track;

};
tnt.track.id = tnt.utils.iterator(1);
