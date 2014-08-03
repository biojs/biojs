var label = require("./label");
var layout = require("./layout");
var tnode = require("./node");

var tree = function () {
 "use strict";

    var conf = {
	duration         : 500,      // Duration of the transitions
	label            : label.text(),
	layout           : layout.vertical(),
	on_click         : function () {},
	on_dbl_click     : function () {},
	on_mouseover    : function () {},
	link_color       : 'steelblue',
	node_color       : 'steelblue',
	node_circle_size : 4.5,
    };

    // Keep track of the focused node
    // TODO: Would it be better to have multiple focused nodes? (ie use an array)
    var focused_node;

    // Extra delay in the transitions (TODO: Needed?)
    var delay = 0;

    // Ease of the transitions
    var ease = "cubic-in-out";

    // If labels should be skipped
    // TODO: Replace this with a valid tree.label that does nothing
    // var skip_labels = false;

    // TODO: Don't know if this is useful or not
    // Probably this can go and see if this can be set with the API
    var curr_species = "Homo_sapiens";

    // By node data
    var sp_counts = {};
 
    var scale = false;

    // The id of the tree container
    var div_id;

    // The tree visualization (svg)
    var svg;
    var vis;

    // TODO: For now, counts are given only for leaves
    // but it may be good to allow counts for internal nodes
    var counts = {};

    // The full tree
    var base = {
	tree : undefined,
	data : undefined,	
	nodes : undefined,
	links : undefined
    };

    // The curr tree. Needed to re-compute the links / nodes positions of subtrees
    var curr = {
	tree : undefined,
	data : undefined,
	nodes : undefined,
	links : undefined
    };

    // The cbak returned
    var tree = function (div) {
	div_id = d3.select(div).attr("id");

        var tree_div = d3.select(div)
            .append("div")
	    .attr("class", "tnt_groupDiv");

	var cluster = conf.layout.cluster;

	var n_leaves = curr.tree.get_all_leaves().length;

	var max_leaf_label_length = function (tree) {
	    var max = 0;
	    var leaves = tree.get_all_leaves();
	    for (var i=0; i<leaves.length; i++) {
		var label_width = conf.label.width()(leaves[i]);
		if (label_width > max) {
		    max = label_width;
		}
	    }
	    return max;
	};


	var max_label_length = max_leaf_label_length(curr.tree);
	conf.layout.max_leaf_label_width(max_label_length);

	// Cluster size is the result of...
	// total width of the vis - transform for the tree - max_leaf_label_width - horizontal transform of the label
	// TODO: Substitute 15 by the horizontal transform of the nodes
	var cluster_size_params = {
	    n_leaves : n_leaves,
	    label_height : d3.functor(conf.label.height())(),
	    label_padding : 15
	};

	conf.layout.adjust_cluster_size(cluster_size_params);

	var diagonal = conf.layout.diagonal();
	var transform = conf.layout.transform_node;

	svg = tree_div
	    .append("svg")
	    .attr("width", conf.layout.width())
//	    .attr("height", (n_leaves * label.height()()) + 20)
	    .attr("height", conf.layout.height(cluster_size_params) + 30)
	    .attr("fill", "none");

	vis = svg
	    .append("g")
	    .attr("id", "tnt_st_" + div_id)
	    .attr("transform",
		  "translate(" +
		  conf.layout.translate_vis()[0] +
		  "," +
		  conf.layout.translate_vis()[1] +
		  ")");

	curr.nodes = cluster.nodes(curr.data);
	conf.layout.scale_branch_lengths(curr);
	curr.links = cluster.links(curr.nodes);

	// LINKS
	var link = vis.selectAll("path.tree_link")
	    .data(curr.links, function(d){return d.target._id});
	
	link
	    .enter()
	    .append("path")
	    .attr("class", "tree_link")
	    .attr("id", function(d) {
	    	return "tree_link_" + div_id + "_" + d.target._id;
	    })
	    .style("stroke", function (d) {
		return d3.functor(conf.link_color)(tnode(d.source), tnode(d.target));
	    })
	    .attr("d", diagonal);	    

	// NODES
	var node = vis.selectAll("g.tnode")
	    .data(curr.nodes, function(d) {return d._id});

	var new_node = node
	    .enter().append("g")
	    .attr("class", function(n) {
		if (n.children) {
		    if (n.depth == 0) {
			return "root tnode"
		    } else {
			return "inner tnode"
		    }
		} else {
		    return "leaf tnode"
		}
	    })
	    .attr("id", function(d) {
		return "tnode_" + div_id + "_" + d._id
	    })
	    .attr("transform", transform);

	new_node
	    .append('circle')
	    .attr("r", function (d) {
		return d3.functor(conf.node_circle_size)(tnode(d));
	    })	 
	    .attr('fill', function (d) {
		return d3.functor(conf.node_color)(tnode(d));
	    })
	    .attr('stroke', function (d) {
		return d3.functor(conf.node_color)(tnode(d));
	    })
	    .attr('stroke-width', '2px');

	new_node.on("click", function (node) {
	    conf.on_click.call(this, tnode(node));
	});

	new_node.on("mouseover", function (node) {
	    conf.on_mouseover.call(this, tnode(node));
	});

	new_node.on("dblclick", function (node) {
	    conf.on_dbl_click.call(this, tnode(node));
	});

	new_node
	    .each (function (d) {
	    	conf.label.call(this, tnode(d));
	    });

	// Update plots an updated tree
	api.method ('update', function() {
	    var cluster = conf.layout.cluster;
	    var diagonal = conf.layout.diagonal();
	    var transform = conf.layout.transform_node;

	    var max_label_length = max_leaf_label_length(curr.tree);
	    conf.layout.max_leaf_label_width(max_label_length);

	    // Cluster size is the result of...
	    // total width of the vis - transform for the tree - max_leaf_label_width - horizontal transform of the label
	// TODO: Substitute 15 by the transform of the nodes (probably by selecting one node assuming all the nodes have the same transform
	    var n_leaves = curr.tree.get_all_leaves().length;
	    var cluster_size_params = {
		n_leaves : n_leaves,
		label_height : d3.functor(conf.label.height())(),
		label_padding : 15
	    };
	    conf.layout.adjust_cluster_size(cluster_size_params);

	    svg
		.transition()
		.duration(conf.duration)
		.ease(ease)
		.attr("height", conf.layout.height(cluster_size_params) + 30); // height is in the layout

	    vis
		.transition()
		.duration(conf.duration)
		.attr("transform",
		      "translate(" +
		      conf.layout.translate_vis()[0] +
		      "," +
		      conf.layout.translate_vis()[1] +
		      ")");
	    
	    curr.nodes = cluster.nodes(curr.data);
	    conf.layout.scale_branch_lengths(curr);
	    curr.links = cluster.links(curr.nodes);

        // NODES
	    var node = vis.selectAll("g.tnode")
		.data(curr.nodes, function(d) {return d._id});

	    // LINKS
	    var link = vis.selectAll("path.tree_link")
		.data(curr.links, function(d){return d.target._id});

	    var exit_link = link
		.exit()
		.remove();


	    // New links are inserted in the prev positions
	    link
		.enter()
		.append("path")
		.attr("class", "tree_link")
		.attr("id", function (d) {
		    return "tree_link_" + div_id + "_" + d.target._id;
		})
		// .attr("fill", "none")
		.attr("stroke", function (d) {
		    return d3.functor(conf.link_color)(tnode(d.source), tnode(d.target));
		})
		.attr("d", diagonal);

	    link
	    //  TODO: Here we will be moving links that have been already moved in the previous filter
	    //  if transitions are slow, this is a good place to optimize
	    	.transition()
		.ease(ease)
	    	.duration(conf.duration)
	    	.attr("d", diagonal);



	    // New nodes are created without radius
	    // The radius is created after the links
	    var new_node = node
		.enter()
		.append("g")
		.attr("class", function(n) {
		    if (n.children) {
			if (n.depth == 0) {
			    return "root tnode"
			} else {
			    return "inner tnode"
			}
		    } else {
			return "leaf tnode"
		    }
		})
		.attr("id", function (d) {
		    return "tnode_" + div_id + "_" + d._id;
		})
		.attr("transform", transform);
   
	    new_node
		.append('circle')
		.attr("r", 1e-6)
		.attr('stroke', function (d) {
		    return d3.functor(conf.node_color)(tnode(d));
		})
		.attr('stroke-width', '2px')
		.transition()
		.duration(conf.duration)
		.attr("r", function (d) {
		    return d3.functor(conf.node_circle_size)(tnode(d));
		});

	    new_node.on("click", function (node) {
		conf.on_click.call(this, tnode(node));
	    });

	    new_node.on("mouse_over", function (node) {
		conf.on_mouse_over(this, tnode(node));
	    });

	    new_node.on("dblclick", function (node) {
		conf.on_dbl_click.call(this, tnode(node));
	    });


	    // node color, size and labels are dynamic properties
	    node
		.select("circle")
		.transition()
		.attr('fill', function (d) {
		    return d3.functor(conf.node_color)(tnode(d));
		})
		.attr('r', function (d) {
		    return d3.functor(conf.node_circle_size)(tnode(d));
		})
		// node strokes are dynamic properties
		.attr('stroke', function (d) {
		    return d3.functor(conf.node_color)(tnode(d));
		});

	    // TODO: Shouldn't this be done only on new nodes? Old nodes should already have the labels
	    node
		.each (conf.label.remove)
		    .each (function (d) {
			conf.label.call(this, tnode(d));
		    });
	    
	    node
		.transition()
		.ease(ease)
		.duration(conf.duration)
		.attr("transform", transform);

	    // Exiting nodes are just removed
	    node
		.exit()
		.remove();
	});
    };

    // API
    //var api = tnt.utils.api (tree)
    //	.getset (conf)
    
    
    tree.duration         = 500;      // Duration of the transitions
    tree.label            = label.text();
    tree.layout           = layout.vertical();
    tree.on_click         = function () {};
    tree.on_dbl_click     = function () {};
    tree.on_mouseover    = function () {};
    tree.link_color       = 'steelblue';
    tnode_color       = 'steelblue';
    tnode_circle_size = 4.5;




    // TODO: Rewrite data using getset / finalizers & transforms
    tree.data = function (d) {
	if (!arguments.length) {
	    return base.data;
	}

	// The original data is stored as the base and curr data
	base.data = d;
	curr.data = d;

	// Set up a new tree based on the data
	var newtree = tnode(base.data);

	tree.root(newtree);
	return tree;
    };

    // TODO: Rewrite tree using getset / finalizers & transforms
    tree.root = function (t) {
    	if (!arguments.length) {
    	    return curr.tree;
    	}

	// The original tree is stored as the base, prev and curr tree
    	base.tree = t;
	curr.tree = base.tree;
//	prev.tree = base.tree;
    	return tree;
    };

    tree.subtree = function (curr_nodes) {
	var subtree = base.tree.subtree(curr_nodes);
	curr.data = subtree.data();
	curr.tree = subtree;

	return tree;
    };

    tree.focus_node = function (node) {
	// find 
	var found_node = tree.root().find_node_by_field(node.id(), '_id');
	focused_node = found_node
	tree.subtree(found_node.get_all_leaves());

	return tree;
    };

    tree.has_focus = function (node) {
	return ((focused_node !== undefined) && (focused_node.id() === node.id()));
    };

    tree.release_focus = function () {
	tree.data (base.data);
	focused_node = undefined;
	return tree;
    };


//    tree.tooltip = function () {
//	// var tooltip = tnt.tooltip().type("table");
//	var tooltip = tnt.tooltip.table();
//	var tree_tooltip = function (node) {
//	    node = node.data();
//	    var obj = {};
//	    obj.header = {
//		label : "Name",
//		value : node.name
//	    };
//	    obj.rows = [];
//	    obj.rows.push({
//		label : "_id",
//		value : node._id
//	    });
//	    obj.rows.push({
//		label : "Depth",
//		value : node.depth
//	    });
//	    obj.rows.push({
//		label : "Length",
//		value : node.length
//	    });
//	    obj.rows.push({
//		label : "N.Children",
//		value : node.children ? node.children.length : 0
//	    });
//	    tooltip.call(this, obj);
//	};
//
//	return tree_tooltip;
//    });


    return tree;
};

module.exports = tree;
