var tnt_theme_track_local_data = function() {

    var theme = function(board, div) {
	board(div);

	var fg_color = "#1873CC";
	var bg_color = "#D1E3F5";

	board.right (1000);

	var axis = tnt.track()
	    .height(30)
	    .foreground_color("black")
	    .background_color("white")
	    .display(tnt.track.feature.axis()
		     .orientation("top")
		    );

	// Location Track1
	var location = tnt.track()
	    .height(30)
	    .foreground_color("black")
	    .background_color("white")
	    .display(tnt.track.feature.location());

	// Block Track1
	var block_track1 = tnt.track()
	    .height(20)
	    .foreground_color(fg_color)
	    .background_color(bg_color)
	    .data(tnt.track.data()
		  .index("start")
		  .update(
		      tnt.track.retriever.async()
			  .url('/themes/local_data/track1.json')
		  )
		 )
	    .display(tnt.track.feature.block());

	// Block Track2
	var block_track2 = tnt.track()
	    .height(20)
	    .foreground_color(fg_color)
	    .background_color(bg_color)
	    .data(tnt.track.data()
		  .index("start")
		  .update(
		      tnt.track.retriever.async()
			  .url('/themes/local_data/track2.json')
		  )
		 )
	    .display(tnt.track.feature.block());

	// Block Track3
	var block_track3 = tnt.track()
	    .height(20)
	    .foreground_color(fg_color)
	    .background_color(bg_color)
	    .data(tnt.track.data()
		  .index("start")
		  .update(
		      tnt.track.retriever.async()
			  .url('/themes/local_data/track3.json')
		  )
		 )
	    .display(tnt.track.feature.block());

	// Block Track4
	var block_track4 = tnt.track()
	    .height(20)
	    .foreground_color(fg_color)
	    .background_color(bg_color)
	    .data(tnt.track.data()
		  .index("start")
		  .update(
		      tnt.track.retriever.async()
			  .url('/themes/local_data/track4.json')
		  )
		 )
	    .display(tnt.track.feature.block());

	// Block Track5
	var block_track5 = tnt.track()
	    .height(20)
	    .foreground_color(fg_color)
	    .background_color(bg_color)
	    .data(tnt.track.data()
		  .index("start")
		  .update(
		      tnt.track.retriever.async()
			  .url('/themes/local_data/track5.json')
		  )
		 )
	    .display(tnt.track.feature.block());

	// We add the tracks
	board
	    .add_track(location)
	    .add_track(axis)
	    .add_track(block_track1)
	    .add_track(block_track2)
	    .add_track(block_track3)
	    .add_track(block_track4)
	    .add_track(block_track5);

	board.start();
    };

    return theme;
};
