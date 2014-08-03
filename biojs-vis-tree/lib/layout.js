// Based on the code by Ken-ichi Ueda in http://bl.ocks.org/kueda/1036776#d3.phylogram.js
var diagonal = require("./diagonal");

var elayout = function () {

    var l = function () {
    };

    var cluster = d3.layout.cluster()
	.sort(null)
	.value(function (d) {return d.length} )
	// .children(function (d) {return d.branchset})
	.separation(function () {return 1});

    //var api = tnt.utils.api (l)
	l.scale = true;
	l.max_leaf_label_width = 0;
	l.cluster = cluster;
	l.yscale = function () {throw "yscale is not defined in the base object"};
	l.adjust_cluster_size = function () {throw "adjust_cluster_size is not defined in the base object" };
	l.width = function () {throw "width is not defined in the base object"};
	l.height = function () {throw "height is not defined in the base object"};

    l.scale_branch_lengths = function (curr) {
	if (l.scale() === false) {
	    return
	}

	var nodes = curr.nodes;
	var tree = curr.tree;

	var root_dists = nodes.map (function (d) {
	    return d._root_dist;
	});

	var yscale = l.yscale(root_dists);
	tree.apply (function (node) {
	    node.property("y", yscale(node.root_dist()));
	});
    };

    return l;
};

elayout.vertical = function () {
    var layout = elayout();

    //var api = tnt.utils.api (layout)
	layout.width = 360;
	layout.translate_vis = [20,20];
	layout.diagonal = diagonal.vertical;
	layout.transform_node = function (d) {
    	    return "translate(" + d.y + "," + d.x + ")";
	};

    layout.height = function (params) {
    	return (params.n_leaves * params.label_height);
    }; 

    layout.yscale = function (dists) {
    	return d3.scale.linear()
    	    .domain([0, d3.max(dists)])
    	    .range([0, layout.width() - 20 - layout.max_leaf_label_width()]);
    };

    layout.adjust_cluster_size = function (params) {
    	var h = layout.height(params);
    	var w = layout.width() - layout.max_leaf_label_width() - layout.translate_vis()[0] - params.label_padding;
    	layout.cluster.size ([h,w]);
    	return layout;
    };

    return layout;
};

elayout.radial = function () {
    var layout = elayout();
    var default_width = 360;
    var r = default_width / 2;

    var conf = {
    	width : 360
    };

    //var api = tnt.utils.api (layout)
	layout.width = 360;
	layout.translate_vis = [r, r*1.3]; // TODO: 1.3 should be replaced by a sensible value
	layout.transform_node = function (d) {
	    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
	};
	layout.diagonal = diagonal.radial;
	layout.height = function () { return conf.width };

    // Changes in width affect changes in r
    layout.width.transform (function (val) {
    	r = val / 2;
    	layout.cluster.size([360, r-120])
    	layout.translate_vis([r, r*1.3]);
    	return val;
    });

    layout.yscale = function (dists) {
	return d3.scale.linear()
	    .domain([0,d3.max(dists)])
	    .range([0, r]);
    };

    layout.adjust_cluster_size = function (params) {
	return;
    };

    return layout;
};

module.exports = elayout;
