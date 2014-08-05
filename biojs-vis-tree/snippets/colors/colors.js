var tnt_theme_tree_colors = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {
	// In the div, we set up a "select" to transition between a radial and a vertical tree

	tree_vis
	    .data(tree_data.tree)
	    .duration(2000)
	    .layout(biojs.vis.tree.tree.layout.vertical().width(500).scale(false))
	    .link_color(function (source, target) {
		var col = "steelblue";
		var source_data = source.data();
		var target_data = target.data();
		if (source_data.events) {
		    switch (source_data.events.type) {
		    case "speciation" : 
			col = "darkgreen";
			break
		    case "duplication" :
			col = "darkorange";
			break
		    }
		    return col
		}
	    })
	    .node_color(function (node) {
		var d = node.data();
		if (d.events && d.events.type && d.events.type === 'speciation') {
		    return 'green';
		} else if (d.events && d.events.type && d.events.type === 'duplication') {
		    return 'red';
		} else {
		    return 'orange';
		}
	    });

	tree_vis
	    .label()
	    .height(function(){return 20})
	    .text(function (node) {
		var d = node.data();
		if (d.children === undefined) {
		    return d.id.accession;
		}
		return "";
	    });

	// The visualization is started at this point
	tree_vis(div);
    };

    tree_vis
	    .label().height(function(){return 50});

    return tree_theme;
};

var tree_data = {"tree":{"events":{"type":"duplication"},"branch_length":0,"children":[{"events":{"type":"speciation"},"branch_length":0,"children":[{"events":{"type":"speciation"},"branch_length":0.062968,"children":[{"events":{"type":"duplication"},"branch_length":0.028548,"children":[{"events":{"type":"speciation"},"branch_length":0.043337,"children":[{"events":{"type":"speciation"},"branch_length":0.014426,"children":[{"events":{"type":"speciation"},"branch_length":0.008728,"children":[{"sequence":{"location":"19:7319289-7321625","id":[{"source":"EnsEMBL","accession":"ENSORLP00000008760"}]},"branch_length":0.212809,"id":{"source":"EnsEMBL","accession":"ENSORLG00000006976"},"taxonomy":{"scientific_name":"Oryzias latipes","id":8090}},{"sequence":{"location":"JH557415.1:32765-35499","id":[{"source":"EnsEMBL","accession":"ENSXMAP00000007365"}]},"branch_length":0.213072,"id":{"source":"EnsEMBL","accession":"ENSXMAG00000007348"},"taxonomy":{"scientific_name":"Xiphophorus maculatus","id":8083}}],"confidence":{"value":9,"type":"boostrap"},"taxonomy":{"scientific_name":"Atherinomorpha","id":32456}},{"sequence":{"location":"Un_random:87612145-87613047","id":[{"source":"EnsEMBL","accession":"ENSTNIP00000009452"}]},"branch_length":0.17538,"id":{"source":"EnsEMBL","accession":"ENSTNIG00000006673"},"taxonomy":{"scientific_name":"Tetraodon nigroviridis","id":99883}}],"taxonomy":{"scientific_name":"Percomorpha","id":32485}},{"sequence":{"location":"GL831136.1:9106973-9114517","id":[{"source":"EnsEMBL","accession":"ENSONIP00000025246"}]},"branch_length":0.153398,"id":{"source":"EnsEMBL","accession":"ENSONIG00000020044"},"taxonomy":{"scientific_name":"Oreochromis niloticus","id":8128}}],"confidence":{"value":1,"type":"boostrap"},"taxonomy":{"scientific_name":"Percomorpha","id":32485}},{"events":{"type":"speciation"},"branch_length":0.09587,"children":[{"sequence":{"location":"groupV:10013775-10014765","id":[{"source":"EnsEMBL","accession":"ENSGACP00000010723"}]},"branch_length":0.193282,"id":{"source":"EnsEMBL","accession":"ENSGACG00000008107"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"JH557415.1:27577-30879","id":[{"source":"EnsEMBL","accession":"ENSXMAP00000007364"}]},"branch_length":0.39125,"id":{"source":"EnsEMBL","accession":"ENSXMAG00000007346"},"taxonomy":{"scientific_name":"Xiphophorus maculatus","id":8083}}],"confidence":{"value":64,"type":"boostrap"},"taxonomy":{"scientific_name":"Smegmamorpha","id":129949}}],"taxonomy":{"scientific_name":"Percomorpha","id":32485}},{"sequence":{"location":"GeneScaffold_1918:320977-322538","id":[{"source":"EnsEMBL","accession":"ENSGMOP00000013813"}]},"branch_length":0.275591,"id":{"source":"EnsEMBL","accession":"ENSGMOG00000012917"},"taxonomy":{"scientific_name":"Gadus morhua","id":8049}}],"taxonomy":{"scientific_name":"Holacanthopterygii","id":123370}},{"sequence":{"location":"24:39729571-39732797","name":"CU896602.1-201","id":[{"source":"EnsEMBL","accession":"ENSDARP00000104803"}]},"branch_length":0.367283,"id":{"source":"EnsEMBL","accession":"ENSDARG00000090549"},"taxonomy":{"scientific_name":"Danio rerio","id":7955}}],"confidence":{"value":62,"type":"boostrap"},"taxonomy":{"scientific_name":"Clupeocephala","id":186625}},{"events":{"type":"speciation"},"branch_length":0.127175,"children":[{"events":{"type":"speciation"},"branch_length":0.09638,"children":[{"events":{"type":"speciation"},"branch_length":0.069803,"children":[{"events":{"type":"speciation"},"branch_length":0.019176,"children":[{"events":{"type":"speciation"},"branch_length":0.009339,"children":[{"sequence":{"location":"groupXI:13041283-13046376","name":"zgc:195001-201","id":[{"source":"EnsEMBL","accession":"ENSGACP00000017790"}]},"branch_length":0.11,"id":{"source":"EnsEMBL","accession":"ENSGACG00000013455"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"JH556969.1:602934-605110","name":"zgc:195001-201","id":[{"source":"EnsEMBL","accession":"ENSXMAP00000014233"}]},"branch_length":0.146704,"id":{"source":"EnsEMBL","accession":"ENSXMAG00000014215"},"taxonomy":{"scientific_name":"Xiphophorus maculatus","id":8083}}],"confidence":{"value":86,"type":"boostrap"},"taxonomy":{"scientific_name":"Smegmamorpha","id":129949}},{"sequence":{"location":"3:15177100-15177970","name":"zgc:195001-201","id":[{"source":"EnsEMBL","accession":"ENSTNIP00000003817"}]},"branch_length":0.185968,"id":{"source":"EnsEMBL","accession":"ENSTNIG00000000236"},"taxonomy":{"scientific_name":"Tetraodon nigroviridis","id":99883}}],"confidence":{"value":58,"type":"boostrap"},"taxonomy":{"scientific_name":"Percomorpha","id":32485}},{"sequence":{"location":"GL831151.1:5574239-5590480","name":"zgc:195001-201","id":[{"source":"EnsEMBL","accession":"ENSONIP00000012287"}]},"branch_length":0.210468,"id":{"source":"EnsEMBL","accession":"ENSONIG00000009779"},"taxonomy":{"scientific_name":"Oreochromis niloticus","id":8128}}],"confidence":{"value":65,"type":"boostrap"},"taxonomy":{"scientific_name":"Percomorpha","id":32485}},{"sequence":{"location":"GeneScaffold_984:127016-127996","name":"zgc:195001-201","id":[{"source":"EnsEMBL","accession":"ENSGMOP00000007691"}]},"branch_length":0.246699,"id":{"source":"EnsEMBL","accession":"ENSGMOG00000007214"},"taxonomy":{"scientific_name":"Gadus morhua","id":8049}}],"confidence":{"value":97,"type":"boostrap"},"taxonomy":{"scientific_name":"Holacanthopterygii","id":123370}},{"sequence":{"location":"3:30353982-30369623","name":"zgc:195001-001","id":[{"source":"EnsEMBL","accession":"ENSDARP00000094263"}]},"branch_length":0.202372,"id":{"source":"EnsEMBL","accession":"ENSDARG00000070484"},"taxonomy":{"scientific_name":"Danio rerio","id":7955}}],"confidence":{"value":94,"type":"boostrap"},"taxonomy":{"scientific_name":"Clupeocephala","id":186625}}],"taxonomy":{"scientific_name":"Clupeocephala","id":186625}},"rooted":1,"id":"ENSGT00650000093693","type":"gene tree"};
