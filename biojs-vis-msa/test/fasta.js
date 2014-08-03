require('coffee-script/register')
var fs = require('fs')

var Fasta = require('../')

require('mocha')
var assert = require("assert")
var nock = require('nock')

var testUrl = 'http://an.msa.url/foo'

var scope = nock('http://an.msa.url')
.get('/foo')
.replyWithFile(200, __dirname + '/foo.fasta');

suite("Fasta");

test('test parsing of sample fasta file', function(done){
    Fasta.parse.read(testUrl, function(seqs){
      assert.equal(13, seqs.length, "wrong seq number");
      assert.equal(seqs[0].seq.substring(0, 60), "MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN");
      assert.equal(seqs[12].seq, "MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCNQ");
      done();
  });
});

test("test parsing of a file with fs", function(done) {
  fs.readFile(__dirname + '/foo.fasta','utf8', function(err,data){
    if (err) {
      return console.log(err);
    }
    var seqs = Fasta.parse.parse(data);
    assert.equal(13, seqs.length, "wrong seq number");
    assert.equal(seqs[0].seq.substring(0, 60), "MASLITTKAMMSHHHVLSSTRITTLYSDNSIGDQQIKTKPQVPHRLFARRIFGVTRAVIN");
    assert.equal(seqs[12].seq, "MKTLLLTLVVVTIVYLDLGYTTKCYNHQSTTPETTEICPDSGYFCYKSSWIDGREGRIERGCTFTCPELTPNGKYVYCCRRDKCNQ");
    done();
  })

})
