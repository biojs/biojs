require(["cs!msa/msa"], function (MSA) {

  var msa = new MSA('msa-eventlistener', undefined, {registerMoveOvers : true});
  msa.log.setConsole('msa-eventlistener-console');

  msa.seqmgr.addDummySequences();
});
