var tree = {};
var utils = {};
utils.api = require('../utils/api');

utils.utils = require('../utils/utils');

tree.node = function (data) {
    "use strict";

    var node = function () {};

    var api = utils.api(node);

    // API
    //     node.nodes = function() {
    // 	if (cluster === undefined) {
    // 	    cluster = d3.layout.cluster()
    // 	    // TODO: length and children should be exposed in the API
    // 	    // i.e. the user should be able to change this defaults via the API
    // 	    // children is the defaults for parse_newick, but maybe we should change that
    // 	    // or at least not assume this is always the case for the data provided
    // 		.value(function(d) {return d.length})
    // 		.children(function(d) {return d.children});
    // 	}
    // 	nodes = cluster.nodes(data);
    // 	return nodes;
    //     };

    var apply_to_data = function (data, cbak) {
        cbak(data);
        if (data.children !== undefined) {
            for (var i = 0; i < data.children.length; i++) {
                apply_to_data(data.children[i], cbak);
            }
        }
    };

    var create_ids = function () {
        var i = utils.utils.iterator(1);
        // We can't use apply because apply creates new trees on every node
        // We should use the direct data instead
        apply_to_data(data, function (d) {
            if (d._id === undefined) {
                d._id = i();
                // TODO: Not sure _inSubTree is strictly necessary
                // d._inSubTree = {prev:true, curr:true};
            }
        });
    };

    var link_parents = function (data) {
        if (data === undefined) {
            return;
        }
        if (data.children === undefined) {
            return;
        }
        for (var i = 0; i < data.children.length; i++) {
            // _parent?
            data.children[i]._parent = data;
            link_parents(data.children[i]);
        }
    };

    var compute_root_dists = function (data) {
        apply_to_data(data, function (d) {
            var l;
            if (d._parent === undefined) {
                d._root_dist = 0;
            } else {
                var l = 0;
                if (d.branch_length) {
                    l = d.branch_length
                }
                d._root_dist = l + d._parent._root_dist;
            }
        });
    };

    // TODO: data can't be rewritten used the api yet. We need finalizers
    node.data = function (new_data) {
        if (!arguments.length) {
            return data
        }
        data = new_data;
        create_ids();
        link_parents(data);
        compute_root_dists(data);
        return node;
    };
    // We bind the data that has been passed
    node.data(data);

    api.method('find_node_by_field', function (value, field) {
        if (typeof (field) === 'function') {
            if (field(data) === value) {
                return node;
            }
        } else {
            if (data[field] === value) {
                return node;
            }
        }
        if (data._children !== undefined) {
            for (var j = 0; j < data._children.length; j++) {
                var c = tree.node(data._children[j]);
                var f = c.find_node_by_field(value, field);
                if (f !== undefined) {
                    return f;
                }
            }
        }

        if (data.children !== undefined) {
            for (var i = 0; i < data.children.length; i++) {
                var n = tree.node(data.children[i]);
                var found = n.find_node_by_field(value, field);
                if (found !== undefined) {
                    return found;
                }
            }
        }
    });

    api.method('find_node_by_name', function (name) {
        return node.find_node_by_field(name, 'name');
    });

    api.method('toggle', function () {
        if (data) {
            if (data.children) { // Uncollapsed -> collapse
                var hidden = 0;
                node.apply(function (n) {
                    var hidden_here = n.n_hidden() || 0;
                    hidden += (n.n_hidden() || 0) + 1;
                });
                node.n_hidden(hidden - 1);
                data._children = data.children;
                data.children = undefined;
            } else { // Collapsed -> uncollapse
                node.n_hidden(0);
                data.children = data._children;
                data._children = undefined;
            }
        }
    });

    api.method('is_collapsed', function () {
        return (data._children !== undefined && data.children === undefined);
    });

    var has_ancestor = function (n, ancestor) {
        // It is better to work at the data level
        n = n.data();
        ancestor = ancestor.data();
        if (n._parent === undefined) {
            return false
        }
        n = n._parent
        for (;;) {
            if (n === undefined) {
                return false;
            }
            if (n === ancestor) {
                return true;
            }
            n = n._parent;
        }
    };

    // This is the easiest way to calculate the LCA I can think of. But it is very inefficient too.
    // It is working fine by now, but in case it needs to be more performant we can implement the LCA
    // algorithm explained here:
    // http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=lowestCommonAncestor
    api.method('lca', function (nodes) {
        if (nodes.length === 1) {
            return nodes[0];
        }
        var lca_node = nodes[0];
        for (var i = 1; i < nodes.length; i++) {
            lca_node = _lca(lca_node, nodes[i]);
        }
        return lca_node;
        // return tree.node(lca_node);
    });

    var _lca = function (node1, node2) {
        if (node1.data() === node2.data()) {
            return node1;
        }
        if (has_ancestor(node1, node2)) {
            return node2;
        }
        return _lca(node1, node2.parent());
    };

    api.method('n_hidden', function (val) {
        if (!arguments.length) {
            return node.property('_hidden');
        }
        node.property('_hidden', val);
        return node
    });

    api.method('get_all_nodes', function () {
        var nodes = [];
        node.apply(function (n) {
            nodes.push(n);
        });
        return nodes;
    });

    api.method('get_all_leaves', function () {
        var leaves = [];
        node.apply(function (n) {
            if (n.is_leaf()) {
                leaves.push(n);
            }
        });
        return leaves;
    });

    api.method('get_all_descendents', function () {
        var leaves = [];
        node.apply(function (n) {
            // if (n.is_leaf()) {
            leaves.push(n);
            // }
        });
        return leaves;
    });

    api.method('upstream', function (cbak) {
        cbak(node);
        var parent = node.parent();
        if (parent !== undefined) {
            parent.upstream(cbak);
        }
        //	tree.node(parent).upstream(cbak);
        // 	node.upstream(node._parent, cbak);
    });

    api.method('subtree', function (nodes) {
        var node_counts = {};
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if (n !== undefined) {
                n.upstream(function (this_node) {
                    var id = this_node.id();
                    if (node_counts[id] === undefined) {
                        node_counts[id] = 0;
                    }
                    node_counts[id]++
                });
            }
        }


        var is_singleton = function (node_data) {
            var n_children = 0;
            if (node_data.children === undefined) {
                return false;
            }
            for (var i = 0; i < node_data.children.length; i++) {
                var id = node_data.children[i]._id;
                if (node_counts[id] > 0) {
                    n_children++;
                }
            }
            return n_children === 1;
        };

        var copy_data = function (orig_data, subtree, condition) {
            if (orig_data === undefined) {
                return;
            }

            if (condition(orig_data)) {
                var copy = copy_node(orig_data);
                if (subtree.children === undefined) {
                    subtree.children = [];
                }
                subtree.children.push(copy);
                if (orig_data.children === undefined) {
                    return;
                }
                for (var i = 0; i < orig_data.children.length; i++) {
                    copy_data(orig_data.children[i], copy, condition);
                }
            } else {
                if (orig_data.children === undefined) {
                    return;
                }
                for (var i = 0; i < orig_data.children.length; i++) {
                    copy_data(orig_data.children[i], subtree, condition);
                }
            }
        };

        var copy_node = function (node_data) {
            var copy = {};
            // copy all the own properties excepts links to other nodes or depth
            for (var param in node_data) {
                if ((param === "children") ||
                    (param === "children") ||
                    (param === "_parent") ||
                    (param === "depth")) {
                    continue;
                }
                if (node_data.hasOwnProperty(param)) {
                    copy[param] = node_data[param];
                }
            }
            return copy;
        };

        var subtree = {};
        copy_data(data, subtree, function (node_data) {
            var node_id = node_data._id;
            var counts = node_counts[node_id];

            if (counts === undefined) {
                return false;
            }
            // 	    if ((node.children !== undefined) && (node.children.length < 2)) {
            // 		return false;
            // 	    }
            if ((counts > 1) && (!is_singleton(node_data))) {
                return true;
            }
            if ((counts > 0) && (node_data.children === undefined)) {
                return true;
            }
            return false;
        });

        return tree.node(subtree.children[0]);
    });

    // TODO: This method visits all the nodes
    // a more performant version should return true
    // the first time cbak(node) is true
    api.method('present', function (cbak) {
        // cbak should return true/false
        var is_true = false;
        node.apply(function (n) {
            if (cbak(n) === true) {
                is_true = true;
            }
        });
        return is_true;
    });

    // cbak is called with two nodes
    // and should return -1,0,1
    api.method('sort', function (cbak) {
        if (data.children === undefined) {
            return;
        }

        var new_children = [];
        for (var i = 0; i < data.children.length; i++) {
            new_children.push(tree.node(data.children[i]));
        }

        new_children.sort(cbak);
        data.children = [];
        for (var i = 0; i < new_children.length; i++) {
            data.children.push(new_children[i].data());
        }

        for (var i = 0; i < data.children.length; i++) {
            tree.node(data.children[i]).sort(cbak);
        }
    });

    api.method('apply', function (cbak) {
        cbak(node);
        if (data.children !== undefined) {
            for (var i = 0; i < data.children.length; i++) {
                var n = tree.node(data.children[i])
                n.apply(cbak);
            }
        }
    });

    // TODO: Not sure if it makes sense to set via a callback:
    // root.property (function (node, val) {
    //    node.deeper.field = val
    // }, 'new_value')
    api.method('property', function (prop, value) {
        if (arguments.length === 1) {
            if ((typeof prop) === 'function') {
                return prop(data)
            }
            return data[prop]
        }
        if ((typeof prop) === 'function') {
            prop(data, value);
        }
        data[prop] = value;
        return node;
    });

    api.method('is_leaf', function () {
        return data.children === undefined;
    });

    // It looks like the cluster can't be used for anything useful here
    // It is now included as an optional parameter to the tree() method call
    // so I'm commenting the getter
    // node.cluster = function() {
    // 	return cluster;
    // };

    // node.depth = function (node) {
    //     return node.depth;
    // };

    //     node.name = function (node) {
    //         return node.name;
    //     };

    api.method('id', function () {
        return node.property('_id');
    });

    api.method('node_name', function () {
        return node.property('name');
    });

    api.method('branch_length', function () {
        return node.property('branch_length');
    });

    api.method('root_dist', function () {
        return node.property('_root_dist');
    });

    api.method('children', function () {
        if (data.children === undefined) {
            return;
        }
        var children = [];
        for (var i = 0; i < data.children.length; i++) {
            children.push(tree.node(data.children[i]));
        }
        return children;
    });

    api.method('parent', function () {
        if (data._parent === undefined) {
            return undefined;
        }
        return tree.node(data._parent);
    });

    return node;

};

module.exports = exports = tree.node;