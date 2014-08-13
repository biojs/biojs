
var epeek_theme_track_orthologues_tree = function() {
    "use strict";

    // The IDs of the divs where the label and the tree are to be put
    var gene_orthologues_label_id;
    var gene_orthologues_tree_id;

    var gBrowser;
    var orthologues_tree;
    var orthologues_tree_update;

    var gene_name;

    var gBrowserTheme = function (gB, div) {
	set_div_id(div);

	// We save the passed genome browser for later use
	gBrowser = gB;

	// Set the gBrowser's callbacks
	gBrowser.gene_info_callback   = gene_info_callback;

	var label_div = d3.select(div)
	    .append("div")
	    .attr("id", gene_orthologues_label_id)
	    .style("height", "20px");

	label_div
	    .append("h3")
	    .text("Gene name goes here");

	// Create the div element where the 
	d3.select(div)
	    .append("div")
	    .attr("class", "ePeek_orthologues_tree")
	    .attr("id", gene_orthologues_tree_id);

	// Create a new tree browser
	orthologues_tree = epeek.species_tree();
	orthologues_tree_update = orthologues_tree.update();

	orthologues_tree(document.getElementById(gene_orthologues_tree_id));

	// Start the genome browser
	gBrowser(div);
	gBrowser.start();
    };

    var set_div_id = function(div) {
	var div_id = d3.select(div).attr("id");
	gene_orthologues_tree_id = "ePeek_" + div_id + "_orthologues_tree_info";
	gene_orthologues_label_id = "ePeek_" + div_id + "_orthologues_label";
    };

    var homologues_cbak = function (homologues) {
	hide_spinner();
	var orthologues_by_species = classify_orthologues_by_species(homologues);
	orthologues_tree_update(orthologues_by_species);
    };

    var gene_info_callback = function (gene) {
	show_spinner();
	gene_name = gene.external_name;
    	gBrowser.homologues(gene.ID, homologues_cbak);
    };

    var classify_orthologues_by_species = function (homs) {
	var orths = homs.orthologues;
	var orths_by_species = {};
	for (var i = 0; i < orths.length; i++) {
	    if (orths_by_species[orths[i].species] === undefined) {
		orths_by_species[orths[i].species] = [];
	    }
	    orths_by_species[orths[i].species].push(orths[i]);
	}
	return orths_by_species;
    };

    var show_spinner = function() {
	d3.selectAll("#" + gene_orthologues_label_id + "> *" ).remove();
	var label_div = d3.select("#" + gene_orthologues_label_id);
	label_div
	    .append("img")
	    .attr("src", "../pics/spinner.gif");

    };

    var hide_spinner = function() {
	d3.selectAll("#" + gene_orthologues_label_id + "> *" ).remove();
	var label_div = d3.select("#" + gene_orthologues_label_id);
	label_div
	    .append("h3")
	    .text(gene_name);
    };


    return gBrowserTheme;

}

