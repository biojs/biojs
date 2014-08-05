var should = require('should');  
require('mocha');
var assert = require("chai").assert;
var d3 = require("d3");
var _ = require("underscore");

var tnt = {};

tnt.tree = require("../src/tree.js");
tnt.tree.parse_newick = require("biojs-io-newick").newick;
tnt.tree.label = require("../src/label.js");
tnt.tree.diagonal = require("../src/diagonal.js");
tnt.tree.layout = require("../src/layout.js");
tnt.tree.node = require("../src/node.js");

var _t = {"tree":{"events":{"type":"speciation"},"branch_length":0,"children":[{"events":{"type":"speciation"},"branch_length":0.290309,"children":[{"events":{"type":"duplication"},"branch_length":0.553716,"children":[{"sequence":{"location":"groupV:2282380-2283414","id":[{"source":"EnsEMBL","accession":"ENSGACP00000004057"}]},"branch_length":0.009886,"id":{"source":"EnsEMBL","accession":"ENSGACG00000003104"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"groupIV:26610147-26611181","id":[{"source":"EnsEMBL","accession":"ENSGACP00000025919"}]},"branch_length":0.010517,"id":{"source":"EnsEMBL","accession":"ENSGACG00000019610"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}}],"confidence":{"value":100,"type":"boostrap"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"3:10019898-10027054","id":[{"source":"EnsEMBL","accession":"ENSORLP00000002154"}]},"branch_length":0.799164,"id":{"source":"EnsEMBL","accession":"ENSORLG00000001736"},"taxonomy":{"scientific_name":"Oryzias latipes","id":8090}}],"confidence":{"value":100,"type":"boostrap"},"taxonomy":{"scientific_name":"Smegmamorpha","id":129949}},{"events":{"type":"duplication"},"branch_length":0.967267,"children":[{"events":{"type":"duplication"},"branch_length":0.044409,"children":[{"sequence":{"location":"LG11:12303551-12304465","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000005677"}]},"branch_length":0.053459,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000004738"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}},{"sequence":{"location":"LG4:788515-789902","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000001145"}]},"branch_length":0.077798,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000001021"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"confidence":{"value":63,"type":"boostrap"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}},{"sequence":{"location":"LG7:27649875-27652376","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000017148"}]},"branch_length":0.008044,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000013911"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"confidence":{"value":63,"type":"boostrap"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"taxonomy":{"scientific_name":"Neopterygii","id":41665}},"rooted":1,"id":"ENSGT00540000072363","type":"gene tree"};


describe('tnt Tree', function () {
    it("Exists and is called tree", function () {
        assert.isDefined(tnt.tree);
    })

    var newick = "((human, chimp), mouse)";
    var tree = tnt.tree.parse_newick(newick);

    // Newick
    describe ('Newick reader', function () {
	it ("Exists and is called tree.parse_newick", function () {
	    assert.isDefined(tnt.tree.parse_newick);
	});

	it ("Can read a simple tree", function () {
	    assert.isDefined(tree);
	});
	it ("The returned tree has the correct structure", function () {
	    assert.property(tree, "name");
	    assert.property(tree, "children");
	    assert.property(tree.children[0], "name");
	    assert.property(tree.children[0], "children");
	    assert.strictEqual(tree.children[0].children[0].name, "human");
	    assert.notProperty(tree.children[0].children[0], "children");
	});

	it ("Reads the branch lenghts", function () {
	    var newick = "((human:0.2,chimp:0.3),mouse:0.5)";
	    var tree = tnt.tree.parse_newick(newick);
	    assert.closeTo(tree.children[1].branch_length, 0.5, 0.05);
	    assert.closeTo(tree.children[0].children[0].branch_length, 0.2, 0.05);
	    assert.closeTo(tree.children[0].children[1].branch_length, 0.3, 0.05);
	});
    });

    describe ('tnt.tree.node', function () {
	var mytree = tnt.tree.node(tree);
	it ("Can create trees", function () {
	    assert.isDefined(mytree);
	})

	it ("Can create trees from JSON objects", function () {
	    var this_tree = tnt.tree.node(_t.tree);
	    assert.isDefined(this_tree);
	    assert.isDefined(this_tree.children);
	});

	it ("Can return the original data", function () {
	    var mytree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
	    var mynewtree = tnt.tree.node(mytree);
	    assert.property(mytree, "name");
	    var orig_data = mynewtree.data();
	    assert.deepEqual(mytree, orig_data);
	    assert.strictEqual(mynewtree.data().name, "anc2");
	});

	it ('Inserts ids in all the nodes', function () {
	    var nodes_with_ids = 0;
	    var nodes = 0;
	    mytree.apply(function (node) {
		nodes++;
		if (node.property('_id') !== undefined) {
		    nodes_with_ids++;
		}
	    });
	    assert.strictEqual(nodes_with_ids, nodes);
	});

	it ("Doesn't override ids", function () {
	    var node = mytree.find_node_by_name('human');
	    assert.notEqual(node.property('_id'), 1);
	    assert.strictEqual(node.property('_id'), 3);
	});

	it("Can retrieve ids", function () {
	    assert.property(mytree, "id");
	    var id = mytree.id();
	    assert.isDefined(id);
	    assert.strictEqual(id, 1);
	});

	it("Can retrieve names", function () {
	    assert.property(mytree, "node_name");
	    var root_name = mytree.node_name();
	    assert.strictEqual(root_name, "");
	    var node = mytree.find_node_by_name('chimp');
	    var node_name = node.node_name();
	    assert.strictEqual(node_name, 'chimp');
	});

	it('Has the correct number of parents', function () {
	    var parents = 0;
	    var nodes = 0;
	    mytree.apply(function (node) {
		nodes++;
		if (node.property('_parent') !== undefined) {
		    parents++;
		}
	    });
	    assert.strictEqual(parents+1, nodes);
	});

	it('Inserts correct distances to root', function () {
	    var newick = "((human:0.2,chimp:0.3):0.2,mouse:0.5)";
	    var data = tnt.tree.parse_newick(newick);
	    var tree = tnt.tree.node(data);
	    assert.isDefined(tree.root_dist);
	    assert.isFunction(tree.root_dist);
	    var root_dists = [];
	    tree.apply(function (node) {
		root_dists.push(node.root_dist());
	    });
	    var undef_dists = _.filter(root_dists, function(d) {return d === undefined});
	    assert.strictEqual(undef_dists.length, 0);
	    var human = tree.find_node_by_name('human');
	    assert.closeTo(human.root_dist(),0.4, 0.01);
	});

	describe('API', function () {

	    describe('property', function () {
	    	var tree_obj = {
	    	    name: "F",
	    	    deeper : { field : 1 },
	    	    children: [
	    		{name: "A", length: 0.1},
	    		{name: "B", length: 0.2},
	    		{
	    		    name: "E",
	    		    length: 0.5,
	    		    branchset: [
	    		        {name: "C", length: 0.3},
	    			{name: "D", length: 0.4}
	    		    ]
	    		}
	    	    ]
	    	};

	    	var root = tnt.tree.node(tree_obj);

	    	it ('Accesses data properties', function () {
	    	    var prop1 = root.property('name');
	    	    assert.strictEqual (prop1, 'F');
	    	});

		it ('Sets data properties', function () {
		    root.property('new_prop', 'aa');
		    assert.strictEqual (root.property('new_prop'), 'aa');
		});

		it ('Accepts a callback for accessing properties', function () {
		    var deep_prop = root.property(function (node) {
			return node.deeper.field
		    })
		    assert.strictEqual (deep_prop, 1);
		});

		it ('Accepts a callback for setting properties', function () {
		    root.property(function (node, val) {
			node.deeper.new_deep = val
		    }, 'bb');
		    assert.strictEqual (root.property (function (node) {
			console.log(node.deeper);
			return node.deeper.new_deep;
		    }), 'bb');
		});

	    });

	    describe('find_node_by_field', function () {
		var tree_from_newick = tnt.tree.node(tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2"));
		var tree_from_json   = tnt.tree.node(_t.tree);

		it ("Finds a node by name", function () {
		    assert.isDefined (tree_from_newick);
		    assert.typeOf (tree_from_newick, 'function');

		    var node = tree_from_newick.find_node_by_field ('human', 'name');
		    assert.isDefined (node);
		    assert.strictEqual (node.data().name, 'human');
		});

		it ("Accepts a callback as a second argument", function () {
		    var cbak = function (node_data) {
			return node_data.name;
		    };
		    var node = tree_from_newick.find_node_by_field ('human', cbak);
		    assert.isDefined (node);
		    assert.strictEqual (node.data().name, 'human');
		});

		it ("Can reach deep properties", function () {
		    assert.isDefined (tree_from_json);
		    assert.typeOf (tree_from_json, 'function');
		    var cbak = function (node_data) {
			if (node_data.children === undefined) {
			    console.log(node_data.id.accession);
			    return node_data.id.accession;
			}
		    };
		    var node = tree_from_json.find_node_by_field ('ENSGACG00000003104', cbak);
		    assert.isDefined (node);
		    assert.strictEqual (node.data().id.accession, 'ENSGACG00000003104');
		});

		it ("Can find nodes under collapsed nodes");

	    });

	    describe('find_node_by_name', function () {
		var newtree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(newtree);

		it("Returns the correct node", function () {
		    assert.isDefined(newtree);
		    var node = mytree.find_node_by_name("human");
		    assert.isDefined(node);
		    assert.strictEqual(node.data().name, "human");
		    var node2 = mytree.find_node_by_name("mouse");
		    assert.isDefined(node2);
		    assert.strictEqual(node2.data().name, "mouse");
		})
		it("Can search for the root", function () {
		    assert.isDefined(mynewtree);
		    var root = mynewtree.find_node_by_name("anc2");
		    assert.isDefined(root);
		    assert.strictEqual(root.data().name, "anc2");
		})
		it("Returns nodes that are tnt.tree.node's", function () {
		    var node = mynewtree.find_node_by_name('anc1');
		    assert.property(node, 'find_node_by_name');
		})
	    });

	    describe('apply', function () {
		it("Sets a new property on each downstream node", function () {
		    mytree.apply(function (node) {node.property('__test__', 1)})
		    var tested = 0;
		    var with_prop = 0;
		    mytree.apply(function (node) {
			tested++;
			if (node.property('__test__') !== undefined) {
			    with_prop++;
			}
		    });
		    assert.strictEqual(tested, with_prop);
		    assert.strictEqual(with_prop, 5);
		})
	    });

	    describe('lca', function () {
		var newtree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(newtree);

		it("Finds the correct lca node", function () {
		    var nodes = [];
		    nodes.push(mynewtree.find_node_by_name('human'));
		    nodes.push(mynewtree.find_node_by_name('chimp'));
		    var lca = mynewtree.lca(nodes);
		    assert.isDefined(lca);
		    assert.property(lca, "find_node_by_name");
		})
	    });

	    describe('is_leaf', function () {
		var newtree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(newtree);
		it("Returns the correct number of leaves", function () {
		    var leaves = 0;
		    mynewtree.apply(function(node) {
			if (node.is_leaf()) {
			    leaves++;
			}
		    });
		    assert.strictEqual(leaves, 3);
		});
	    });

	    describe('toggle', function () {
		it ("hides nodes");
		it ("un-hides nodes");
	    });
	    describe('is_collapsed', function () {
		it ("Returns true on collapsed nodes");
		it ("Returns false on real leaves");
	    });

	    describe('parent', function () {
		var newtree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(newtree);
		var node = mynewtree.find_node_by_name("anc1");
		var parent = node.parent();
		it("Can take parents from nodes", function () {
		    assert.isDefined(parent);
		});
		it("Returns the right node", function () {
		    assert.strictEqual(parent.data().name, "anc2");
		});
		it("Returns an tnt.tree.node object", function () {
		    assert.property(parent, "is_leaf");
		});
		it("Returns undefined parent on root", function () {
		    var node = mynewtree.parent();
		    assert.isUndefined(node);
		});
	    });

	    describe('children', function () {
		var newtree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(newtree);
		var node = mynewtree.find_node_by_name("anc1");
		var children = node.children();
		it("Can take children from nodes", function () {
		    assert.isDefined(children);
		});
		it("Returns a list of children", function () {
		    assert.isArray(children);
		});
		it("Returns a list of tnt.tree.node's", function () {
		    _.each(children, function (el) {
			assert.property(el, "is_leaf");
		    });
		});
		it("Returns undefined children on leaves", function () {
		    var node = mynewtree.find_node_by_name("mouse");
		    var children = node.children();
		    assert.isUndefined(children);
		});
	    });

	    describe('upstream', function() {
		var mytree = tnt.tree.parse_newick("((human,chimp)anc1,mouse)anc2");
		var mynewtree = tnt.tree.node(mytree);
		var node = mynewtree.find_node_by_name('human');
		it("Visits the correct number of antecesors", function () {
		    var visited_parents = [];
		    node.upstream(function (el) {
			visited_parents.push(el.property('name'));
		    });
		    assert.strictEqual(visited_parents.length, 3);
		    assert.isTrue(_.contains(visited_parents, "human"));
		    assert.isTrue(_.contains(visited_parents, "anc2"));
		    assert.isTrue(_.contains(visited_parents, "anc1"));
		});
		it("Sets properties in the antecesors", function () {
		    node.upstream(function (el) {
			el.property('visited_node', 1);
		    });
		    var visited_nodes = [];
		    mynewtree.apply(function (node) {
			if (node.property('visited_node') === 1) {
			    visited_nodes.push(node.data().name);
			}
		    });
		    assert.strictEqual(visited_nodes.length, 3);
		    assert.isTrue(_.contains(visited_nodes, "human"));
		    assert.isTrue(_.contains(visited_nodes, "anc2"));
		    assert.isTrue(_.contains(visited_nodes, "anc1"));
		});
	    });

	    describe("get_all_nodes", function () {
		it("Returns all the nodes", function () {
		    var nodes = mytree.get_all_nodes();
		    assert.isArray(nodes);
		    assert.lengthOf(nodes, 5);
		});
	    });

	    describe("get_all_leaves", function () {
		it("Returns all the leaves", function () {
		    var leaves = mytree.get_all_leaves();
		    assert.isArray(leaves);
		    assert.lengthOf(leaves, 3);
		});
	    });

	    describe("subtree", function () {
		var subtree;
		it("Creates subtrees", function () {
		    var nodes = [];
		    nodes.push(mytree.find_node_by_name('human'));
		    nodes.push(mytree.find_node_by_name('mouse'));
		    subtree = mytree.subtree(nodes)
		    assert.isDefined(subtree);
		});

		it("Prunes the tree correctly", function () {
		    var ids_in_subtree = [];
		    subtree.apply(function (node) {
			ids_in_subtree.push(node.id());
		    });
		    assert.isArray(ids_in_subtree);
		    assert.lengthOf(ids_in_subtree, 3);
		    assert.isTrue(_.contains(ids_in_subtree, 1));
		    assert.isTrue(_.contains(ids_in_subtree, 3));
		    assert.isTrue(_.contains(ids_in_subtree, 5));
		});

		it("Prunes correcly trees that doesn't include the root", function () {
		    var nodes = [];
		    nodes.push(mytree.find_node_by_name('human'));
		    nodes.push(mytree.find_node_by_name('chimp'));
		    var subtree = mytree.subtree(nodes);
		    assert.isDefined(subtree);
		    var ids_in_subtree = [];
		    subtree.apply(function (node) {
			ids_in_subtree.push(node.id());
		    });
		    assert.isArray(ids_in_subtree);
		    assert.lengthOf(ids_in_subtree, 3);
		    assert.strictEqual(subtree.id(), 2);
		    assert.isTrue(_.contains(ids_in_subtree, 2));
		    assert.isTrue(_.contains(ids_in_subtree, 3));
		    assert.isTrue(_.contains(ids_in_subtree, 4));
		});

		it("Returns an identical copy on a subtree with all the leaves", function () {
		    var leaves = mytree.get_all_leaves();
		    var subtree = mytree.subtree(leaves);
		    assert.isDefined(subtree);
		    var tree_nodes = [];
		    mytree.apply(function (node) {
			tree_nodes.push(node);
		    });
		    var subtree_nodes = [];
		    subtree.apply(function (node) {
			subtree_nodes.push(node);
		    });
		    assert.strictEqual(tree_nodes.length, subtree_nodes.length);
		});
	    });

	    describe("node_present", function () {
		it("Returns true if node is present", function () {
		    var present = mytree.present(function (node) {
			return node.id() === 5;
		    });
		    assert.strictEqual(present, true);
		});

		it("Returns false if node is absent", function () {
		    var present = mytree.present(function (node) {
			return node._id === -1;
		    });
		    assert.strictEqual(present, false);
		});

	    });

	    describe("sort", function () {
		it("Swaps two leaves", function () {
		    var ids = [];
		    mytree.apply(function (node) {
			ids.push(node.id());
		    });

		    // Lets sort
		    mytree.sort(function (node1, node2) {
			if (node1.present(function (n) {
			    return n.id() === 5;
			})) {
			    return -1;
			}
			if (node2.present(function (n) {
			    return n.id() === 5;
			})) {
			    return 1
			}
			return 0
		    });

		    var sorted = [];
		    mytree.apply(function (node) {
			sorted.push(node.id());
		    });
		    assert.notEqual(ids[1], sorted[1]);
		    assert.equal(ids[1], 2);
		    assert.equal(sorted[1], 5);
		});

		it("Sorts based on a numerical value", function () {
		    var newick = "(((4,2),(5,1)),3)";
		    var data = tnt.tree.parse_newick(newick);
		    var tree = tnt.tree.node(data);
		    var ids = [];
		    tree.apply(function (node) {
			ids.push(node.id());
		    });

		    // Helper function to get the lowest value in
		    // the subnode -- this is used in the sort cbak
		    var get_lowest_val = function (node) {
			var lowest = 1000;
			node.apply(function (n) {
			    if (n.node_name() === "") {
			    	return;
			    }
			    var val = parseInt(n.node_name());
			    if (val < lowest) {
				lowest = val;
			    }
			});
			return lowest;
		    };

		    tree.sort(function (node1, node2) {
			return get_lowest_val(node1) - get_lowest_val(node2);
		    });

		    var sorted_ids = [];
		    tree.apply(function (node) {
			sorted_ids.push(node.id());
		    });

		    assert.operator(_.indexOf(ids, 3), '<', _.indexOf(ids, 6));
		    assert.operator(_.indexOf(sorted_ids, 6), '<', _.indexOf(sorted_ids, 3));

		    assert.operator(_.indexOf(ids, 7), '<', _.indexOf(ids, 8));
		    assert.operator(_.indexOf(sorted_ids, 8), '<', _.indexOf(sorted_ids, 7));

		});

	    });

	});

    });
})
