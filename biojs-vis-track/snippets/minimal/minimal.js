var tnt_theme_track_minimal = function() {

    var theme = function(gB, div) {
	gB(div);

	// Gene Track1
	var gene_track = tnt.track()
	    .background_color("#cccccc")
	    .height(200)
	    .data(tnt.track.data.gene())
	    .display(tnt.track.feature.gene()
		     .foreground_color("red")
		    );

	// Gene Track2
	var gene_track2 = tnt.track()
	    .height(100)
	    .background_color("#DDDD00")
	    .data(tnt.track.data.gene())
	    .display(tnt.track.feature.gene()
		     .foreground_color("blue")
		    );

	// Block Track1
	var block_track = tnt.track()
	    .height(30)
	    .background_color("#FFCFDD")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function () {
			      return [
				  {
				      start : 32890000,
				      end   : 32890500
				  }
			      ]
			  })
		  )
		 )
	    .display(tnt.track.feature.block()
		     .foreground_color("blue")
		     .index(function (d) {
			 return d.start;
		     }));

	// We add the tracks
	gB
	    .add_track(gene_track)
	    .add_track(gene_track2)
	    .add_track(block_track);

	gB.start();
    };

    return theme;
};
