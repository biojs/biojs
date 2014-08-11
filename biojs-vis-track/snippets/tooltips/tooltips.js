var tnt_theme_track_tooltips = function() {
    "use strict";

    var theme = function(gB, div) {

	var gene_track = tnt.track()
	    .background_color('#EEEEEE')
	    .height(200)
	    .data(tnt.track.data.gene())
	    .display(tnt.track.feature.gene()
		     .foreground_color('green')
		    );

	gene_track.display().on_click(gene_track.display().tooltip());

	gB(div);
	gB.add_track(gene_track);
	gB.start();
    };

    return theme;
};
