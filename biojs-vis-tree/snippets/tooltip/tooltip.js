var tnt_theme_tree_tooltip = function () {
    "use strict";

    var tree_theme = function (tree_vis, div) {

        var newick = "(((Crotalus_oreganus_oreganus_cytochrome_b:0.00800,Crotalus_horridus_cytochrome_b:0.05866):0.04732,(Thamnophis_elegans_terrestris_cytochrome_b:0.00366,Thamnophis_atratus_cytochrome_b:0.00172):0.06255):0.00555,(Pituophis_catenifer_vertebralis_cytochrome_b:0.00552,Lampropeltis_getula_cytochrome_b:0.02035):0.05762,((Diadophis_punctatus_cytochrome_b:0.06486,Contia_tenuis_cytochrome_b:0.05342):0.01037,Hypsiglena_torquata_cytochrome_b:0.05346):0.00779);";

        tree_vis
            .data(biojs.vis.tree.parse_newick(newick))
            .duration(2000)
            .layout(biojs.vis.tree.tree.layout.vertical()
                .width(600)
                .scale(false))
            .on_click(tree_vis.tooltip());

        // The visualization is started at this point
        tree_vis(div);
    };

    return tree_theme;
};