require(["cs!msa/msa", "cs!msa/seqmgr"], function (MSA, SeqMgr) {

  var msa = new MSA('msa-mark-column');

  var seqs = SeqMgr.getDummySequences(4,40);

  // labels
  seqs[0].special = true;
  seqs[2].special = true;

  // markers
  msa.plugs.marker.specials = [0,3,10,20];

  msa.addSeqs(seqs);
});
