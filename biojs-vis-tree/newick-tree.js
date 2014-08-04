var newick_tree = function () {
	
	var tree = biojs.vis.tree.tree();

	var theme = function(ta,div) {
		var newick = '((A,B),C);';
		
		ta.data(biojs.io.newick.newick(newick));
		ta.width = 600;
		ta.scale = false;
		//tree.layout (tree.layout.vertical());
	
		ta(div);

	}

	return theme;
}
