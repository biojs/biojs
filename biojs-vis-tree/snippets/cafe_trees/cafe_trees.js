var tnt_theme_tree_cafe_tree = function() {
    "use strict";

    var theme = function (tree_vis, div) {

        var label = tnt.tree.label.text()
	    .color(function (d) {
		if (d.n_members === 0) {
		    return 'lightgrey'
		}
		return 'black';
	    })
            .text(function (node) {
                if (node.children) {
                    return node.n_members;
                } else {
                    return node.n_members + " " + node.tax.scientific_name;
                }
            })
            .fontsize(10)
	    .height(15);

	var tooltip = tnt.tooltip.table()
	    .allow_drag(false);
	var cafe_tooltip = function (node) {
	    var node_data = node.data();
	    var obj = {};
	    obj.header = {
		label : "Taxon",
		value : node_data.tax.alias_name +
		    (node_data.tax.timetree_mya ? (" ~" + node_data.tax.timetree_mya +
						     " MYA" ) : '') +
		    " (" +
		    node_data.tax.scientific_name +
		    ")"

	    };
	    obj.rows = [
		{ label : "Node ID",
		  value : node_data.id
		},
		{ label : "Members",
		  value : node_data.n_members
		},
		{ label : "p-value",
		  value : node_data.pvalue
		},
		{ label : "Lambda",
		  value : node_data.lambda
		},
		{ label : "Taxon ID:",
		  value : node_data.tax.id
		},
		{ label : "Scientific Name:",
		  value : node_data.tax.scientific_name
		}
	    ];
	    tooltip.call(this, obj);
	};

	d3.json('/themes/tree/cafe_trees/ENSGT00550000074414.json',
		function (err, resp) {
		    deploy_vis(resp);
		});

	// TREE SIDE
	var deploy_vis = function (tree_obj) {
	    tree_vis
		.data (tree_obj.tree)
		.layout (tnt.tree.layout.vertical()
			 .width(630)
			 .scale(false)
			)
		.label (label)
		.link_color (function (link) {
		    var target_node = link.target;
		    if (target_node && target_node.is_node_significant) {
			if (target_node.is_expansion) {
			    return "red";
			} else {
			    return "green";
			}
		    }
		    if (target_node.n_members === 0) {
			return "lightgrey";
		    }
		    return "black";
		})
		.node_color (function (node) {
		    if (node.n_members === 0) {
			return 'lightgrey';
		    }
		    return 'steelblue';
		})
		.on_click (cafe_tooltip);


	    tree_vis(div);
	}
    }

    return theme;
};
