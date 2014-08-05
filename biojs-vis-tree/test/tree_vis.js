var should = require('should');  
require('mocha');
var assert = require("chai").assert;
require("d3");

var tnt = {};

tnt.tree = require("../src/tree.js");

tnt.tree.label = require("../src/label.js");
tnt.tree.diagonal = require("../src/diagonal.js");
tnt.tree.layout = require("../src/layout.js");
tnt.tree.node = require("../src/node.js");



var tree_data = {"tree":{"events":{"type":"speciation"},"branch_length":0,"children":[{"events":{"type":"speciation"},"branch_length":0.290309,"children":[{"events":{"type":"duplication"},"branch_length":0.553716,"children":[{"sequence":{"location":"groupV:2282380-2283414","id":[{"source":"EnsEMBL","accession":"ENSGACP00000004057"}]},"branch_length":0.009886,"id":{"source":"EnsEMBL","accession":"ENSGACG00000003104"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"groupIV:26610147-26611181","id":[{"source":"EnsEMBL","accession":"ENSGACP00000025919"}]},"branch_length":0.010517,"id":{"source":"EnsEMBL","accession":"ENSGACG00000019610"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}}],"confidence":{"value":100,"type":"boostrap"},"taxonomy":{"scientific_name":"Gasterosteus aculeatus","id":69293}},{"sequence":{"location":"3:10019898-10027054","id":[{"source":"EnsEMBL","accession":"ENSORLP00000002154"}]},"branch_length":0.799164,"id":{"source":"EnsEMBL","accession":"ENSORLG00000001736"},"taxonomy":{"scientific_name":"Oryzias latipes","id":8090}}],"confidence":{"value":100,"type":"boostrap"},"taxonomy":{"scientific_name":"Smegmamorpha","id":129949}},{"events":{"type":"duplication"},"branch_length":0.967267,"children":[{"events":{"type":"duplication"},"branch_length":0.044409,"children":[{"sequence":{"location":"LG11:12303551-12304465","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000005677"}]},"branch_length":0.053459,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000004738"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}},{"sequence":{"location":"LG4:788515-789902","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000001145"}]},"branch_length":0.077798,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000001021"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"confidence":{"value":63,"type":"boostrap"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}},{"sequence":{"location":"LG7:27649875-27652376","id":[{"source":"EnsEMBL","accession":"ENSLOCP00000017148"}]},"branch_length":0.008044,"id":{"source":"EnsEMBL","accession":"ENSLOCG00000013911"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"confidence":{"value":63,"type":"boostrap"},"taxonomy":{"scientific_name":"Lepisosteus oculatus","id":7918}}],"taxonomy":{"scientific_name":"Neopterygii","id":41665}},"rooted":1,"id":"ENSGT00540000072363","type":"gene tree"};

describe ('tnt tree_vis', function () {

    it ('Exists and is called tree', function () {
	assert.isDefined (tnt.tree);
	assert.isFunction (tnt.tree);
    });

    var label = tnt.tree.label.text()
	.text (function (node) {
	    if (node.children) {
		return "";
	    } else {
		return node.id.accession
	    }
	})
	.fontsize(10);

    var tree = tnt.tree()
	.layout (tnt.tree.layout.vertical().width(600).scale(false))
	.data (tree_data.tree)
	.label(label);

    it ('Accepts data', function () {
	assert.isDefined (tree);
    });

   
});


