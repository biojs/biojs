var tnt_theme_track_dynamic_track = function() {

    var theme = function(board, div) {
	board(div);

	var block_reduce = tnt.utils.reduce.block()
	    .smooth(0)
	    .value("start");

	var line_reduce = tnt.utils.reduce.line()
	    .value("val");

	    // .redundant(function (a, b) {
	    // 	return Math.abs(a-b)<50;
	    // })
	    // .join(function (obj1, obj2) {
	    // 	return {
	    // 	    'object' : {
	    // 		'start' : obj1.object.start,
	    // 		'end'   : obj2.end
	    // 	    },
	    // 	    'value'  : obj2.end
	    // 	}
	    // });

	var filter_line = function (data, loc) {
	    var sub_data = [];
	    var from = loc.from;
	    var to = loc.to;
	    for (var i=0; i<data.length; i++) {
		var item = data[i];
		if ((item.pos >= loc.from) && (item.pos <=loc.to)) {
		    sub_data.push(item);
		}
	    }

	    if ((loc.to - loc.from) < 50) {
		line_reduce
		    .smooth(0)
		    .redundant (function (a, b) {
			return false;
		    });
	    } else if ((loc.to - loc.from) < 200) {
		line_reduce
		    .smooth(2)
		    .redundant (function (a, b) {
			return Math.abs (a-b) < 0.2;
		    })
	    } else {
		line_reduce
		    .smooth(5)
		    .redundant (function (a, b) {
			return Math.abs (a-b) <= 0.3;
		    })
	    }


	    var reduced_data = line_reduce (sub_data);

	    return reduced_data;
	};

	var filter_blocks = function (data, loc) {
	    var sub_data = [];
	    var from = loc.from;
	    var to = loc.to;
	    for (var i=0; i<data.length; i++) {
		var item = data[i];
		if ((item.start >= loc.from && item.start <= loc.to) ||
		    (item.end >= loc.from && item.end <= loc.to)){
		    sub_data.push(item);
		}
	    }
	    
	    if ((loc.to - loc.from) < 50) {
		block_reduce
		    .redundant (function (a, b) {
			return false
		    });
	    } else if ((loc.to - loc.from) < 200) {
		block_reduce
		    .redundant(function (a, b) {
			return Math.abs(a-b)<3;
		    });
	    } else {
		block_reduce
		    .redundant(function (a, b) {
			return Math.abs(a-b)<10;
		    });
	    }

	    return block_reduce(sub_data);
	    // return sub_data;
	};

	// Line Track1
	var line_track = tnt.track()
	    .height(30)
	    .background_color("lightgrey")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function (loc) {
			      return filter_line(data_line, loc);
			  })
		  )
		 )
	    .display(tnt.track.feature.area()
		     .foreground_color("#440044")
		     .index(function (d) {
			 return d.pos;
		     }));

	// Block Track1
	var block_track = tnt.track()
	    .height(30)
	    .background_color("lightgrey")
	    .data(tnt.track.data()
		  .update(
		      tnt.track.retriever.sync()
			  .retriever (function (loc) {
			      return filter_blocks (data_block, loc);
			  })
		  )
		 )
	    .display(tnt.track.feature.block()
		     .foreground_color("blue")
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
	    .from(0)
	    .to(1000)
	    .zoom_in(10)
	    .add_track(loc_track)
	    .add_track(axis_track)
	    .add_track(block_track)
	    .add_track(line_track);

	board.start();
    };

    return theme;
};

var data_block = [
    { start : 540,
      end   : 542
    },
    { start : 544,
      end   : 546
    },
    { start : 548,
      end   : 550
    },
    { start : 552,
      end   : 555
    },
    { start : 558,
      end   : 560
    }
];


var data_line = [
    { pos : 1,
      val : 0.5
    },
    { pos : 2,
      val : 0.4
    },
    { pos : 3,
      val : 0.8
    },
    { pos : 4,
      val : 0.5
    },
    { pos : 5,
      val : 0.7
    },
    { pos : 6,
      val : 0.3
    },
    { pos : 7,
      val : 0.4
    },
    { pos : 8,
      val : 0
    },
    { pos : 9,
      val : 0.7
    },
    { pos : 10,
      val : 0.6
    },
    { pos : 11,
      val : 0.6
    },
    { pos : 12,
      val : 0.5
    },
    { pos : 13,
      val : 0.9
    },
    { pos : 14,
      val : 0.8
    },
    { pos : 15,
      val : 0.4
    },
    { pos : 16,
      val : 0.7
    },
    { pos : 17,
      val : 0.5
    },
    { pos : 18,
      val : 0.6
    },
    { pos : 19,
      val : 0.8
    },
    { pos : 20,
      val : 0.5
    },
    { pos : 21,
      val : 0.5
    },
    { pos : 22,
      val : 0.5
    }
];
