


var JSDAS = require('../src/jsdas.js');

var server_url = 'http://wwwdev.ebi.ac.uk/das-srv/uniprot/das/uniprot/',
	segmentID='P00280',
	source="uniprot-summary",
	sequence='MLAKATLAIVLSAASLPVLAAQCEATIESNDAMQYNLKEMVVDKSCKQFTVHLKHVGKMAKVAMGHNWVLTKEADKQGVATDGMNAGLAQDYVKAGDTRVIAHTKVIGGGESDSVTFDVSKLTPGEAYAYFCSFPGHWAMMKGTLKLSN';
	
var assert = require('chai').assert;

describe('JSDAS', function () {
	var client;
	before(function () {
		client = JSDAS.Simple.getClient(server_url);
	});
	it('should be from the type object', function () {
		assert.equal(typeof client, 'object');
	});
	
	it('should get the sources', function (done) {
		client.sources(
				function (response){
					assert.typeOf(response.SOURCE,"array");
					assert.equal(source,response.SOURCE[0].uri);
			        done();
				},
				function(err){ 
					throw new Error('Connection issue:'+err.id+"("+err.msg+")");;
				}
		);
	});
	it('should get the features', function (done) {
		client.features(
				{segment: segmentID}, 
				function (response){
					assert.typeOf(response.GFF.SEGMENT,"array");
					assert.equal(segmentID,response.GFF.SEGMENT[0].id);
					assert.equal(segmentID,response.GFF.SEGMENT[0].FEATURE[0].id);
			        done();
				},
				function(err){ 
					throw new Error('Connection issue:'+err.id+"("+err.msg+")");;
				}
		);
	});
	it('should get the types', function (done) {
		client.types(
				{}, 
				function (response){
					assert.typeOf(response.GFF.SEGMENT,"array");
					assert.typeOf(response.GFF.SEGMENT[0].TYPE,"array");
			        done();
				},
				function(err){ 
					throw new Error('Connection issue:'+err.id+"("+err.msg+")");;
				}
		);
	});
	it('should get the entry points', function (done) {
		client.entry_points(
				{}, 
				function (response){
					assert.typeOf(response.ENTRY_POINTS,"object");
					assert.equal(response.ENTRY_POINTS.start,"1");
					assert.typeOf(response.ENTRY_POINTS.SEGMENT,"array");
			        done();
				},
				function(err){ 
					throw new Error('Connection issue:'+err.id+"("+err.msg+")");;
				}
		);
	});
	it('should get the sequence', function (done) {
		client.sequence(
				{segment: segmentID}, 
				function (response){
					assert.typeOf(response.SEQUENCE,"array");
					assert.equal(segmentID,response.SEQUENCE[0].id);
					assert.equal(sequence,response.SEQUENCE[0].textContent);
			        done();
				},
				function(err){ 
					throw new Error('Connection issue:'+err.id+"("+err.msg+")");;
				}
		);
	});

});