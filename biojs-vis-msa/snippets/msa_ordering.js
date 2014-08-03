require(["cs!msa/msa", "cs!msa/sequence"], function (MSA, Sequence) {

  var msa = new MSA('msa-ordering');
  msa.log.setConsole('msa-ordering-console');

  // define seqs
  var seqs = [new Sequence("MSPFTACAPDRLNAGECTF", "awesome name", 1)
         ,new Sequence("QQTSPLQQQDILDMTVYCD", "awesome name2", 2)
         ,new Sequence("FTQHGMSGHEISPPSEPGH", "awesome name3", 3)];

  msa.addSeqs(seqs);
  msa.ordering.setOrdering([2,3,1]);
});
