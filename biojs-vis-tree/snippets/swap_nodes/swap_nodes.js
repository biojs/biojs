var tnt_theme_tree_swap_nodes = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {

// 	var newick = "(((((homo_sapiens:9,pan_troglodytes:9)207598:34,callithrix_jacchus:43)314293:52,mus_musculus:95)314146:215,taeniopygia_guttata:310)32524:107,danio_rerio:417)117571:135;"

	// var newick = "((homo_sapiens,pan_troglodytes),mus_musculus);";

	var newick = "(((2,4),(5,1)),3)";

	var data = biojs.vis.tree.parse_newick(newick);

	tree_vis
	    .data(data)
	    .duration(2000)
	    .layout(biojs.vis.tree.tree.layout.vertical().width(600).scale(false));

	var root = tree_vis.root();

	// The visualization is started at this point
	tree_vis(div);

	setTimeout(function() {

            // Helper function to get the lowest value in                                                   
            // the subnode -- this is used in the sort cbak
            var get_lowest_val = function (node) {
                var lowest = 1000;
		node.apply(function (n) {
                    if (n.node_name() === "") {
			return;
                    }
                    var val = parseInt(n.node_name());
                    if (val < lowest) {
                        lowest = val;
                    }
                });
                return lowest;
            };

            root.sort(function (node1, node2) {
                var lowest1 = get_lowest_val(node1);
                var lowest2 = get_lowest_val(node2);
                if (lowest1 < lowest2) return -1;
                if (lowest1 > lowest2) return 1;
                return 0;
            });

	    tree_vis.update();
	}, 2000);

    tree_vis
        .label().height(function(){return 50});

    };

    return tree_theme;
};
