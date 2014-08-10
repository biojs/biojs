var tnt_theme_track_swap_tracks = function() {

    var theme = function(board, div) {

	// Block Track1
	var block_track1 = tnt.track()
	    .height(30)
	    .background_color("white")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function () {
			      return [
				  {
				      start : 20,
				      end   : 100
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

	// Block Track1
	var block_track2 = tnt.track()
	    .height(30)
	    .background_color("white")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function () {
			      return [
				  {
				      start : 200,
				      end   : 400
				  }
			      ]
			  })
		  )
		 )
	    .display(tnt.track.feature.block()
		     .foreground_color("red")
		     .index(function (d) {
			 return d.start;
		     }));

	// Axis Track1
	var axis_track = tnt.track()
	    .height(30)
	    .background_color("white")
	    .display(tnt.track.feature.axis()
		     .orientation("top")
		    );

	// Location Track1
	var loc_track = tnt.track()
	    .height(30)
	    .background_color("white")
	    .display(tnt.track.feature.location());

	board
	    .right(1000)
	    .add_track(loc_track)
	    .add_track(axis_track)
	    .add_track(block_track1)
	    .add_track(block_track2);

	var block_ids = [];
	block_ids.push(block_track1.id());
	block_ids.push(block_track2.id());

	var order = [[loc_track, axis_track, block_track2, block_track1],
		     [loc_track, axis_track, block_track1, block_track2]
		    ];

	// var order = [[4,3,2,1],[4,3,1,2]];
	var i = 2;
	var swap_tracks = function () {
	    board.reorder(order[i++%2]);
	};

	d3.select(div).append("button")
	    .on("click", swap_tracks)
	    .text("Swap tracks");


	board (div);
	board.start();
    };

    return theme;
};
