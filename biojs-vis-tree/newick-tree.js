var newick_tree = function () {
	
	var tree = biojs.vis.tree();

	var theme = function(ta,div) {
		var newick = '((A,B),C);'
		
		biojs.vis.tree.data(biojs.io.newick.parse_newick(newick));
		biojs.vis.tree.width = 600;
		biojs.vis.tree.scale = false;
		biojs.vis.tree.layout (biojs.vis.tree.layout.vertical());
	
		ta(div);

	}

	return theme;
}
