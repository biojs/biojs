var tnt_theme_tree_ensembl_gene_tree = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {

	var label = tnt.tree.label.text()
	    .text(function (node) {
		if (node.children) {
		    return "";
		} else {
		    return node.id.accession
		}
	    })
	    .fontsize(10);

	tree_vis
	    .layout(tnt.tree.layout.vertical().width(600).scale(false))
	    .label(label);

	var rest = tnt.eRest();

	var gene_tree_id = "ENSGT00390000003602";
	var gene_tree_url = rest.url.gene_tree({
	    id : gene_tree_id
	});
	rest.call ({url : gene_tree_url,
		    success : function (tree) {
			tree_vis.data(tree.tree);
			tree_vis(div);
		    }
		   });
    };

    return tree_theme;
};
