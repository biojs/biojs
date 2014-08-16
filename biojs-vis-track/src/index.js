module.exports.utils = require("../utils/utils");
require("../utils/d3_utils");

module.exports.board = require("./board");
module.exports.track = require("./track");
module.exports.track.data = require("./data");
module.exports.track.layout = require("./layout");
module.exports.track.feature = require("./feature");
module.exports.track.genome = require("./genome");


//TODO: Fix data.js missing rest API
//TODO: Delete all tnt namespaces

var track = module.exports.track;
var test = track()
    .height(30)
    .background_color("#FFCFDD")


// Gene Track1
var gene_track = track()
    .background_color("#cccccc")
    .height(200)
    .data(track.data.gene())
    .display(track.feature.gene()
        .foreground_color("red")
    );

// Gene Track2
var gene_track2 = track()
    .height(100)
    .background_color("#DDDD00")
    .data(track.data.gene())
    .display(track.feature.gene()
        .foreground_color("blue")
    );

// Block Track1
var block_track = track()
    .height(30)
    .background_color("#FFCFDD")

.data(track.data()
    .update(
        track.retriever.sync()
        .retriever(function () {
            return [
                {
                    start: 32890000,
                    end: 32890500
      }
         ]
        })
    )
)
    .display(track.feature.block()
        .foreground_color("blue")
        .index(function (d) {
            return d.start;
        }));