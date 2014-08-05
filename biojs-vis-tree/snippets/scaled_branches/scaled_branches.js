var tnt_theme_tree_scaled_branches = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {
	// In the div, we set up a "select" to transition between scaled and non-scaled branches
	var menu_pane = d3.select(div)
	    .append("div")
	    .append("span")
	    .text("Layout:  ");

	var sel = menu_pane
	    .append("select")
	    .on("change", function(d) {
		switch (this.value) {
		case "unscaled" :
		    tree_vis.layout().scale(false);
		    break;
		case "scaled" :
		    tree_vis.layout().scale(true);
		    break;
		};
		tree_vis.update();
	    });

	sel
	    .append("option")
	    .attr("value", "unscaled")
	    .attr("selected", 1)
	    .text("Unscaled");
	sel
	    .append("option")
	    .attr("value", "scaled")
	    .text("Scaled");


	var newick = "(((Crotalus_oreganus_oreganus_cytochrome_b:0.00800,Crotalus_horridus_cytochrome_b:0.05866):0.04732,(Thamnophis_elegans_terrestris_cytochrome_b:0.00366,Thamnophis_atratus_cytochrome_b:0.00172):0.06255):0.00555,(Pituophis_catenifer_vertebralis_cytochrome_b:0.00552,Lampropeltis_getula_cytochrome_b:0.02035):0.05762,((Diadophis_punctatus_cytochrome_b:0.06486,Contia_tenuis_cytochrome_b:0.05342):0.01037,Hypsiglena_torquata_cytochrome_b:0.05346):0.00779);";

	tree_vis
	    .data(biojs.vis.tree.parse_newick(newick))
	    .duration(2000)
	    .layout(biojs.vis.tree.tree.layout.vertical().width(600).scale(false));

	tree_vis
	    .label().height(function(){return 50});

	// The visualization is started at this point
	tree_vis(div);
    };

    return tree_theme;
};
