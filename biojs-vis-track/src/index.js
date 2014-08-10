require("d3");

module.exports = require("./board");
var track = module.exports = require("./track");
module.exports = require("./data");
module.exports = require("./layout");
module.exports = require("./feature");
module.exports = require("./genome");


var test = track()
			.height(30)
		    .background_color("#FFCFDD")
