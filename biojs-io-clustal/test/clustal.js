require('coffee-script/register')
var fs = require('fs')

var Clustal = require('../')

require('mocha')
var assert = require("assert")
var nock = require('nock')

var testUrl = 'http://an.msa.url/p53'

var scope = nock('http://an.msa.url')
.get('/p53')
.replyWithFile(200, __dirname + '/p53.clustalo.clustal');

suite("Clustal");

test('test parsing of sample clustal file', function(done){
  Clustal.read(testUrl, function(seqs) {
    assert.equal(seqs.length, 34, "invalid seq length" + seqs.length);
    done();
  });
});

test("test with fs", function(done) {
  fs.readFile(__dirname + '/p53.clustalo.clustal','utf8', function(err,data){
    if (err) {
      return console.log(err);
    }
    var seqs = Clustal.parse(data);
    assert.equal(seqs.length, 34, "invalid seq length" + seqs.length);
    done();
  })

})
