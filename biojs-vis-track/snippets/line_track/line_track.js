var tnt_theme_track_line_track = function() {

    var theme = function(board, div) {
	board(div);

	board.right (1000)
	    .from (0)
	    .to (1000);

	// Axis Track1
	var axis_track = tnt.track()
	    .height(20)
	    .background_color("white")
	    .display(tnt.track.feature.axis()
		     .orientation("top")
		    );

	// Bezier line track
	var line_track = tnt.track()
	    .height(40)
	    .background_color("#FFCFDD")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function () {
			      return [
				  {
				      pos : 20,
				      val : 0.10
				  },
				  {
				      pos : 100,
				      val : 0.60
				  },
				  {
				      pos : 500,
				      val : 0.20
				  }
			      ]
			  })
		  )
		 )
	    .display(tnt.track.feature.area()
		     .foreground_color("blue")
		     .index (function (d) {
			 return d.pos
		     }));

	board
	    .add_track(axis_track)
	    .add_track(line_track);

	board.start();
    };

    return theme;
};
