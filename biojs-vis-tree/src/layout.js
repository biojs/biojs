// Based on the code by Ken-ichi Ueda in http://bl.ocks.org/kueda/1036776#d3.phylogram.js

var tree = {};
var utils = {};
utils.api = require('../utils/api');

tree.diagonal = require('./diagonal');

tree.layout = function () {

    var l = function () {};

    var cluster = d3.layout.cluster()
        .sort(null)
        .value(function (d) {
            return d.length
        })
        // .children(function (d) {return d.branchset})
        .separation(function () {
            return 1
        });

    var api = utils.api(l)
        .getset('scale', true)
        .getset('max_leaf_label_width', 0)
        .method("cluster", cluster)
        .method('yscale', function () {
            throw "yscale is not defined in the base object"
        })
        .method('adjust_cluster_size', function () {
            throw "adjust_cluster_size is not defined in the base object"
        })
        .method('width', function () {
            throw "width is not defined in the base object"
        })
        .method('height', function () {
            throw "height is not defined in the base object"
        });

    api.method('scale_branch_lengths', function (curr) {
        if (l.scale() === false) {
            return
        }

        var nodes = curr.nodes;
        var tree = curr.tree;

        var root_dists = nodes.map(function (d) {
            return d._root_dist;
        });

        var yscale = l.yscale(root_dists);
        tree.apply(function (node) {
            node.property("y", yscale(node.root_dist()));
        });
    });

    return l;
};

tree.layout.vertical = function () {
    var layout = tree.layout();

    var api = utils.api(layout)
        .getset('width', 360)
        .get('translate_vis', [20, 20])
        .method('diagonal', tree.diagonal.vertical)
        .method('transform_node', function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    api.method('height', function (params) {
        return (params.n_leaves * params.label_height);
    });

    api.method('yscale', function (dists) {
        return d3.scale.linear()
            .domain([0, d3.max(dists)])
            .range([0, layout.width() - 20 - layout.max_leaf_label_width()]);
    });

    api.method('adjust_cluster_size', function (params) {
        var h = layout.height(params);
        var w = layout.width() - layout.max_leaf_label_width() - layout.translate_vis()[0] - params.label_padding;
        layout.cluster.size([h, w]);
        return layout;
    });

    return layout;
};

tree.layout.radial = function () {
    var layout = tree.layout();
    var default_width = 360;
    var r = default_width / 2;

    var conf = {
        width: 360
    };


    var trans_number = 1.0;

    var api = utils.api(layout)
        .getset(conf)
        .getset('translate_vis', [r, r * trans_number]) // TODO: 1.3 should be replaced by a sensible value
        .method('transform_node', function (d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        })
        .method('diagonal', tree.diagonal.radial)
        .method('height', function () {
            return conf.width
        });

    // Changes in width affect changes in r
    layout.width.transform(function (val) {
        r = val / 2;
        layout.cluster.size([360, r - 120])
        layout.translate_vis([r, r * trans_number]);
        return val;
    });

    api.method("yscale", function (dists) {
        return d3.scale.linear()
            .domain([0, d3.max(dists)])
            .range([0, r]);
    });

    api.method("adjust_cluster_size", function (params) {
        return;
    });

    return layout;
};

module.exports = exports = tree.layout;