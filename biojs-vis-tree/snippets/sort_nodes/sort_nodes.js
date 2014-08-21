var sort_tree_theme = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {
	// Selection of sorting criteria
	var menu_pane1 = d3.select(div)
	    .append("div")
	    .append("span")
	    .text("Sort By:  ");

	var sel1 = menu_pane1
	    .append("select")
	    .on("change", function (d) {
		var prop = this.value;
		tree_vis.root().sort(function(node1, node2) {
		    var highest1 = get_highest_val(node1, prop);
		    var highest2 = get_highest_val(node2, prop);
		    return get_highest_val(node1, prop) - get_highest_val(node2, prop);
		});
		tree_vis.update();
	    });

	sel1
	    .append("option")
	    .attr("value", "Chromosome pairs")
	    .attr("selected", 1)
	    .text("Number of chromosome pairs");
	sel1
	    .append("option")
	    .attr("value", "Protein-coding genes")
	    .text("Number of protein-coding genes");

	sel1
	    .append("option")
	    .attr("value", "Genome length")
	    .text("Genome length");

	sel1
	    .append("option")
	    .attr("value", "Cuteness factor")
	    .text("Cuteness factor");

	// Selection of coloring criteria
	var menu_pane2 = d3.select(div)
	    .append("div")
	    .append("span")
	    .text("Color by: ");

	var sel2 = menu_pane2
	    .append("select")
	    .on("change", function (d) {
		var prop = this.value;
		var vals = [];
		for (var sp in species_data) {
		    vals.push(species_data[sp][prop]);
		}
		var extent = d3.extent(vals);
		var scale = d3.scale.linear()
		    .domain(extent)
		    .range(["steelblue", "red"]);

		tree_vis.node_color(function (node) {
		    if (node.is_leaf()) {
			return scale(node.data()[prop]);
		    }
		    return "steelblue";
		});
		tree_vis.update();
	    });

	sel2
	    .append("option")
	    .attr("value", "Chromosome pairs")
	    .attr("selected", 1)
	    .text("Number of chromosome pairs");

	sel2
	    .append("option")
	    .attr("value", "Protein-coding genes")
	    .text("Number of protein-coding genes");

	sel2
	    .append("option")
	    .attr("value", "Genome length")
	    .text("Genome length");

	sel2
	    .append("option")
	    .attr("value", "Cuteness factor")
	    .text("Cuteness factor");


	var newick = "(((((((Mus musculus:0.0845,Rattus norvegicus:0.0916):0.2567,Oryctolagus cuniculus:0.2157):0.0153,(((((Pan troglodytes:0.067,Homo sapiens:0.087):0.052,Gorilla gorilla:0.088):0.097,Pongo abelii:0.0183):0.0143,Macaca mulatta:0.0375):0.0220,Callithrix jacchus:0.0661):0.0891):0.0206,(((Felis catus:0.0986,Canis familiaris:0.1025):0.0498,Equus caballus:0.1094):0.0107,((Ovis aries:0.0618,Bos taurus:0.0618):0.0869,Sus scrofa:0.1073):0.0403):0.0329):0.2584,Monodelphis domestica:0.3408):0.0717,Ornithorhynchus anatinus:0.4566):0.1095,(((Gallus gallus:0.0414,Meleagris gallopavo:0.0414):0.1242,Taeniopygia guttata:0.1715):0.3044,Anolis carolinensis:0.4989):0.1700)";

	var tree_data = biojs.vis.tree.parse_newick(newick);

	var prop = "Chromosome pairs";
	var vals = [];
	for (var sp in species_data) {
	    vals.push(species_data[sp][prop]);
	}
	var extent = d3.extent(vals);
	var scale = d3.scale.linear()
	    .domain(extent)
	    .range(["steelblue", "red"]);
	
	tree_vis
	    .data(tree_data)
	    .duration(2000)
	    .layout(biojs.vis.tree.tree.layout.vertical().width(600).scale(true))
	    .node_color(function (node) {
		if (node.is_leaf()) {
		    return scale(node.data()[prop]);
		}
		return "steelblue";
	    })
	    //.on_click (tree_vis.tooltip(biojs.vis.tree.tooltip.table()));

	tree_vis
	    .label()
	    .height(25);

	var root = tree_vis.root();
	transfer_properties(root, species_data);
	root.sort (function (node1, node2) {
	    var highest1 = get_highest_val(node1, 'Chromosome pairs');
	    var highest2 = get_highest_val(node2, 'Chromosome pairs');
	    return highest1 - highest2;
	});

	// The visualization is started at this point
	tree_vis(div);
    };

    // Helper function to get the lowest value in                                                   
    // the subnode -- this is used in the sort cbak                                                 
    var get_highest_val = function (node, prop) {
        var highest = 0;
        node.apply(function (n) {
            if (n.property(prop) === "") {
		return;
            }
	    var val = parseFloat(n.property(prop));
            if (val > highest) {
                highest = val;
            }
        });
        return highest;
    };

    var transfer_properties = function (root, nodes_data) {
	var leaves = root.get_all_leaves();
	for (var i=0; i<leaves.length; i++) {
	    var sp_data = nodes_data[leaves[i].node_name()]
	    for (var prop in sp_data) {
		if (sp_data.hasOwnProperty(prop)) {
		    leaves[i].property(prop, sp_data[prop]);
		}
	    }
	}
    }

    return tree_theme;
};

var species_data = {
    'Homo sapiens' : {
	'Chromosome pairs' : 23,
	'Protein-coding genes' : 20805,
	'Genome length' : 3.1,
	'Ensembl date' : new Date(2001, 07),
	'Cuteness factor' : 6
    },
    'Tetraodon nigroviridis' : {
	'Chromosome pairs' : 21,
	'Protein-coding genes' : 19602,
	'Genome length' : 0.36,
	'Ensembl date' : new Date(2004, 09),
	'Cuteness factor' : 10
    },
    'Monodelphis domestica' : {
	'Chromosome pairs' : 11,
	'Protein-coding genes' : 21327,
	'Genome length' : 3.6,
	'Ensembl date' : new Date(2005, 11),
	'Cuteness factor' : 9
    },
    // 'Drosophila melanogaster' : {
    // 	'Chromosome pairs' : 4,
    // 	'Protein-coding genes' : 13937,
    // 	'Genome length' : 0.17,
    // 	'Ensembl date' : new Date(2003,02),
    // 	'Cuteness factor' : 2
    // },
    'Mus musculus' : {
	'Chromosome pairs' : 20,
	'Protein-coding genes' : 23148,
	'Genome length' : 2.7,
	'Ensembl date' : new Date(2002,01),
	'Cuteness factor' : 7
    },
    'Ornithorhynchus anatinus' : {
	'Chromosome pairs' : 26,
	'Protein-coding genes' : 21698,
	'Genome length' : 2.1,
	'Ensembl date' : new Date(2006,12),
	'Cuteness factor' : 9
    },
    'Pan troglodytes' : {
	'Chromosome pairs' : 24,
	'Protein-coding genes' : 18759,
	'Genome length' : 3.3,
	'Ensembl date' : new Date(2004,05),
	'Cuteness factor' : 6
    },
    'Macaca mulatta' : {
	'Chromosome pairs' : 21,
	'Protein-coding genes' : 21905,
	'Genome length' : 3.1,
	'Ensembl date' : new Date(2005,12),
	'Cuteness factor' : 6
    },
    'Ovis aries' : {
	'Chromosome pairs' : 27,
	'Protein-coding genes' : 20921,
	'Genome length' : 2.6,
	'Ensembl date' : new Date(2013,12),
	'Cuteness factor' : 6
    },
    'Sus scrofa' : {
	'Chromosome pairs' : 19,
	'Protein-coding genes' : 21630,
	'Genome length' : 2.8,
	'Ensembl date' : new Date(2009,09),
	'Cuteness factor' : 5
    },
    'Ciona intestinalis' : {
	'Chromosome pairs' : 14,
	'Protein-coding genes' : 16658,
	'Genome length' : 0.1,
	'Ensembl date' : new Date(2005,05),
	'Cuteness factor' : 3
    },
    'Rattus norvegicus' : {
	'Chromosome pairs' : 21,
	'Protein-coding genes' : 22941,
	'Genome length' : 2.9,
	'Ensembl date' : new Date(2002,11),
	'Cuteness factor' : 5
    },
    'Anolis carolinensis' : {
	'Chromosome pairs' : 14,
	'Protein-coding genes' : 18596,
	'Genome length' : 1.8,
	'Ensembl date' : new Date(2009,03),
	'Cuteness factor' : 7
    },
    'Bos taurus' : {
	'Chromosome pairs' : 30,
	'Protein-coding genes' : 19994,
	'Genome length' : 2.7,
	'Ensembl date' : new Date(2005,07),
	'Cuteness factor' : 6
    },
    // 'Danio rerio' : {
    // 	'Chromosome pairs' : 25,
    // 	'Protein-coding genes' : 26247,
    // 	'Genome length' : 1.4,
    // 	'Ensembl date' : new Date(2002,03),
    // 	'Cuteness factor' : 3
    // },
    'Pongo abelii' : {
	'Chromosome pairs' : 24,
	'Protein-coding genes' : 20424,
	'Genome length' : 3.4,
	'Ensenbl date' : new Date(2011,04),
	'Cuteness factor' : 8
    },
    'Callithrix jacchus' : {
	'Chromosome pairs' : 23,
	'Protein-coding genes' : 20993,
	'Genome length' : 2.9,
	'Ensembl date' : new Date(2009,09),
	'Cuteness factor' : 8
    },
    'Equus caballus' : {
	'Chromosome pairs' : 32,
	'Protein-coding genes' : 20449,
	'Genome length' : 2.5,
	'Ensembl date' : new Date(2008,03),
	'Cuteness factor' : 6
    },
    // 'Canorhabditis elegans' : {
    // 	'Chromosome pairs' : 6,
    // 	'Protein-coding genes' : 20532,
    // 	'Genome length' : 0.1,
    // 	'Ensembl date' : new Date(2003,02),
    // 	'Cuteness factor' : 1
    // },
    // 'Saccharomyzes cerevisiae' : {
    // 	'Chromosome pairs' : 16,
    // 	'Protein-coding genes' : 6692,
    // 	'Genome length' : 0.01,
    // 	'Ensembl date' : new Date(2007,12),
    // 	'Cuteness factor' : 6
    // },
    // 'Oryzias latipes' : {
    // 	'Chromosome pairs' : 24,
    // 	'Protein-coding genes' : 19699,
    // 	'Genome length' : 0.87,
    // 	'Ensembl date' : new Date(2006,10),
    // 	'Cuteness factor' : 4
    // },
    'Taeniopygia guttata' : {
	'Chromosome pairs' : 40,
	'Protein-coding genes' : 17488,
	'Genome length' : 1.2,
	'Ensembl date' : new Date(2009,03),
	'Cuteness factor' : 8
    },
    'Gasterosteus aculeatus' : {
	'Chromosome pairs' : 22,
	'Protein-coding genes' : 20787,
	'Genome length' : 0.46,
	'Ensembl date' : new Date(2006,08),
	'Cuteness factor' : 3
    },
    'Gallus gallus' : {
	'Chromosome pairs' : 39,
	'Protein-coding genes' : 15508,
	'Genome length' : 1,
	'Ensembl date' : new Date(2004,06),
	'Cuteness factor' : 4
    },
    'Felis catus' : {
	'Chromosome pairs' : 19,
	'Protein-coding genes' : 19493,
	'Genome length' : 2.5,
	'Ensembl date' : new Date(2007,02),
	'Cuteness factor' : 9
    },
    'Gorilla gorilla' : {
	'Chromosome pairs' : 24,
	'Protein-coding genes' : 20962,
	'Genome length' : 3,
	'Ensembl date' : new Date(2008,12),
	'Cuteness factor' : 4
    },
    'Oryctolagus cuniculus' : {
	'Chromosome pairs' : 22,
	'Protein-coding genes' : 19293,
	'Genome length' : 2.7,
	'Ensembl date' : new Date(2006,08),
	'Cuteness factor' : 10
    },
    'Meleagris gallopavo' : {
	'Chromosome pairs' : 40,
	'Protein-coding genes' : 14125,
	'Genome length' : 1.1,
	'Ensembl date' : new Date(2010,03),
	'Cuteness factor' : 2
    },
    'Canis familiaris' : {
	'Chromosome pairs' : 39,
	'Protein-coding genes' : 19856,
	'Genome length' : 2.4,
	'Ensembl date' : new Date(2004,12),
	'Cuteness factor' : 6
    }
};
