var tnt_theme_track_2_data_and_features = function() {

    var theme = function(board, div) {
	board(div);

	board.right (1000);

	// Block Track1
	var block_track = tnt.track()
	    .height(30)
	    .background_color("#FFCFDD")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function () {
			      return {
				  'blocks' : [
				      {
					  start : 20,
					  end   : 100
				      }
				  ],
				  'lines'  : [
				      {
					  pos : 60
				      },
				      {
					  pos : 150
				      }
				  ]
			      }
			  })
		  )
		 )
	    .display(tnt.track.feature.composite()
		     .add ("blocks", tnt.track.feature.block()
			   .foreground_color("blue")
			   .index(function (d) {
			       return d.start;
			   }))
		     .add ("lines", tnt.track.feature.vline()
			   .foreground_color("red")
		     	   .index(function (d) {
		     	       return d.pos;
		     	   }))
		    );

	// Axis Track1
	var axis_track = tnt.track()
	    .height(30)
	    .background_color("white")
	    .display(tnt.track.feature.axis()
		     .orientation("top"));

	// Location Track1
	var loc_track = tnt.track()
	    .height(30)
	    .background_color("white")
	    .display(tnt.track.feature.location());

	board
	    .add_track(loc_track)
	    .add_track(axis_track)
	    .add_track(block_track);

	board.start();
    };

    return theme;
};
