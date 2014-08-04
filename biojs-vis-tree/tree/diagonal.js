var tree = {};
var utils = {};
utils.api = require('../utils/api');

tree.diagonal = function () {

    var d = function (diagonalPath) {
	var source = diagonalPath.source;
        var target = diagonalPath.target;
        var midpointX = (source.x + target.x) / 2;
        var midpointY = (source.y + target.y) / 2;
        var pathData = [source, {x: target.x, y: source.y}, target];
	pathData = pathData.map(d.projection());
	return d.path()(pathData, radial_calc.call(this,pathData))
    };

    var api = utils.api (d)
	.getset ('projection')
	.getset ('path')
    
    var coordinateToAngle = function (coord, radius) {
      	var wholeAngle = 2 * Math.PI,
        quarterAngle = wholeAngle / 4
	
      	var coordQuad = coord[0] >= 0 ? (coord[1] >= 0 ? 1 : 2) : (coord[1] >= 0 ? 4 : 3),
        coordBaseAngle = Math.abs(Math.asin(coord[1] / radius))
	
      	// Since this is just based on the angle of the right triangle formed
      	// by the coordinate and the origin, each quad will have different 
      	// offsets
      	var coordAngle;
      	switch (coordQuad) {
      	case 1:
      	    coordAngle = quarterAngle - coordBaseAngle
      	    break
      	case 2:
      	    coordAngle = quarterAngle + coordBaseAngle
      	    break
      	case 3:
      	    coordAngle = 2*quarterAngle + quarterAngle - coordBaseAngle
      	    break
      	case 4:
      	    coordAngle = 3*quarterAngle + coordBaseAngle
      	}
      	return coordAngle
    };

    var radial_calc = function (pathData) {
	var src = pathData[0];
	var mid = pathData[1];
	var dst = pathData[2];
	var radius = Math.sqrt(src[0]*src[0] + src[1]*src[1]);
	var srcAngle = coordinateToAngle(src, radius);
	var midAngle = coordinateToAngle(mid, radius);
	var clockwise = Math.abs(midAngle - srcAngle) > Math.PI ? midAngle <= srcAngle : midAngle > srcAngle;
	var rotation = 0;
	var largeArc = 0;
	var sweep;
	var curr_sweep = d3.select(this).attr("__sweep");
	if (curr_sweep === null) {
	    sweep = (clockwise ? 0 : 1);
	    d3.select(this).attr("__sweep", sweep);
	} else {
	    sweep = curr_sweep;
	}
	return {
	    rotation : rotation,
	    largeArc : largeArc,
	    radius   : radius,
	    sweep    : sweep
	};
    };

    return d;
};

// vertical diagonal for rect branches
tree.diagonal.vertical = function () {
    var projection = function(d) { 
	return [d.y, d.x];
    }

    var path = function(pathData, obj) {
	var src = pathData[0];
	var mid = pathData[1];
	var dst = pathData[2];

	return "M" + src + ' ' +
	    "A" + src + ' 0 0,' + obj.sweep + ' ' + src +
	    "L" + mid + ' ' +
	    "L" + dst;
    };

    return tree.diagonal()
      	.path(path)
      	.projection(projection);
};

tree.diagonal.radial = function () {
    var path = function(pathData, obj) {
      	var src = pathData[0];
      	var mid = pathData[1];
      	var dst = pathData[2];
	var radius = obj.radius;
	var rotation = obj.rotation;
	var largeArc = obj.largeArc;
	var sweep = obj.sweep;

      	return 'M' + src + ' ' + "A" + [radius,radius] + ' ' + rotation + ' ' + largeArc+','+sweep + ' ' + mid + 'L' + dst + 'L' + dst;
    };

    var projection = function(d) {
      	var r = d.y, a = (d.x - 90) / 180 * Math.PI;
      	return [r * Math.cos(a), r * Math.sin(a)];
    };

    return tree.diagonal()
      	.path(path)
      	.projection(projection)
};

module.exports = exports = tree.diagonal;
