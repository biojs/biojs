
require('mocha');
var should = require('should');
var parser = require('./newick');

var assert = require('chai').assert;


describe('BioJS2 Tree Test', function () {
   
  
 

    var newick = "((human, chimp), mouse)";
    var tree = parser(newick);

    // Newick
    describe ('Newick reader', function () {
	it ("Exists and is called tree.parse_newick", function () {
	    assert.isDefined(parser);
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
	    var tree = parser(newick);
	    assert.closeTo(tree.children[1].branch_length, 0.5, 0.05);
	    assert.closeTo(tree.children[0].children[0].branch_length, 0.2, 0.05);
	    assert.closeTo(tree.children[0].children[1].branch_length, 0.3, 0.05);
	});
    });

});
