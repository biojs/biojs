var tnt_theme_tree_layout_transition = function() {
    "use strict";

    var width = 760;
    var scale = false;

    var tree_theme = function (tree_vis, div) {
	// In the div, we set up a "select" to transition between a radial and a vertical tree
	var menu_pane = d3.select(div)
	    .append("div")
	    .append("span")
	    .text("Layout:  ");

	var sel = menu_pane
	    .append("select")
	    .on("change", function(d) {
		var layout = tnt.tree.layout[this.value]().width(width).scale(scale)
		tree_vis.layout(layout)
		tree_vis.update();
	    });

	sel
	    .append("option")
	    .attr("value", "vertical")
	    .attr("selected", 1)
	    .text("vertical");
	sel
	    .append("option")
	    .attr("value", "radial")
	    .text("radial");

	var trans_speed = menu_pane
	    .append("span")
	    .style("margin-left", "50px")
	    .text("Transition speed: 100ms ");
	trans_speed
	    .append("input")
	    .attr("type", "range")
	    .attr("min", 100)
	    .attr("max", 5000)
	    .attr("step", 100)
	    .attr("value", 2000)
	    .on("change", function(d) {tree_vis.duration(this.value)});
	trans_speed
	    .append("text")
	    .text("5s");

	// We create the new tree
	var newick = "((((((((((((((((((((((((Homo_sapiens:0.0067,Pan_troglodytes:0.006667):0.00225,Mus_musculus:0.008825):0.00968,Pongo_abelii:0.018318):0.00717,Nomascus_leucogenys:0.025488):0.00717,(Macaca_mulatta:0.007853,?Papio_hamadryas:0.007637):0.029618):0.021965,Callithrix_jacchus:0.066131):0.05759,Tarsius_syrichta:0.137823):0.011062,(Microcebus_murinus:0.092749,Otolemur_garnettii:0.129725):0.035463):0.015494,Tupaia_belangeri:0.186203):0.004937,(((((Mus_musculus:0.084509,Rattus_norvegicus:0.091589):0.197773,Dipodomys_ordii:0.211609):0.022992,Cavia_porcellus:0.225629):0.01015,Ictidomys_tridecemlineatus:0.148468):0.025746,(Oryctolagus_cuniculus:0.114227,Ochotona_princeps:0.201069):0.101463):0.015313):0.020593,((((Vicugna_pacos:0.107275,(Tursiops_truncatus:0.064688,(Bos_taurus:0.061796,?Ovis_aries:0.061796):0.061796):0.025153):0.0201675,Sus_scrofa:0.079):0.0201675,((Equus_caballus:0.109397,(Felis_catus:0.098612,((Ailuropoda_melanoleuca:0.025614,Mustela_putorius_furo:0.0256):0.0256145,Canis_familiaris:0.051229):0.051229):0.049845):0.006219,(Myotis_lucifugus:0.14254,Pteropus_vampyrus:0.113399):0.033706):0.004508):0.011671,(Erinaceus_europaeus:0.221785,Sorex_araneus:0.269562):0.056393):0.021227):0.023664,(((Loxodonta_africana:0.082242,Procavia_capensis:0.155358):0.02699,Echinops_telfairi:0.245936):0.049697,(Dasypus_novemcinctus:0.116664,Choloepus_hoffmanni:0.096357):0.053145):0.006717):0.234728,(Monodelphis_domestica:0.125686,(Macropus_eugenii:0.101004,Sarcophilus_harrisii:0.101004):0.021004):0.2151):0.071664,Ornithorhynchus_anatinus:0.456592):0.109504,(((((Gallus_gallus:0.041384,Meleagris_gallopavo:0.041384):0.041384,Anas_platyrhynchos:0.082768):0.082768,Taeniopygia_guttata:0.171542):0.199223,Anolis_carolinensis:0.489241):0.105143,Pelodiscus_sinensis:0.4989):0.17):0.149,Xenopus_tropicalis:0.855573):0.155677,Latimeria_chalumnae:0.155677):0.155677,(((Oreochromis_niloticus:0.45,(Tetraodon_nigroviridis:0.224159,Takifugu_rubripes:0.203847):0.195181,((Xiphophorus_maculatus:0.1204925,Oryzias_latipes:0.240985):0.240985,Gasterosteus_aculeatus:0.316413):0.05915):0.16282,Gadus_morhua:0.16282):0.16282,Danio_rerio:0.730752):0.147949):0.526688,Petromyzon_marinus:0.526688):0.526688,(Ciona_savignyi:0.8,Ciona_intestinalis:0.8)Cionidae:0.6)Chordata:0.2,(?Apis_mellifera:0.9,(((?Aedes_aegypti:0.25,?Culex_quinquefasciatus:0.25):0.25,?Anopheles_gambiae:0.5)Culicinae:0.2,Drosophila_melanogaster:0.8)Diptera:0.1)Endopterygota:0.7)Coelomata:0.1,Caenorhabditis_elegans:1.7)Bilateria:0.3,Saccharomyces_cerevisiae:1.9)Fungi_Metazoa_group:0.3);";

	tree_vis
	    .data(tnt.tree.parse_newick(newick))
	    .layout(tnt.tree.layout.vertical().width(width).scale(scale))
	    .duration(2000);

	// The visualization is started at this point
	tree_vis(div);
    };

    return tree_theme;
};
