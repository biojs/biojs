require(["cs!msa/msa", "cs!msa/seqmgr", "cs!msa/feature", "cs!msa/zoombar"
          ], function (MSA, SeqMgr, Feature, ZoomBar) {

  var msa = new MSA('msa-show-features', undefined, 
    {visibleElements: { features: true }} );


  var f1 = new Feature(2,20,"foo1", "red");
  var f2 = new Feature(1,10,"foo2", "0000ff");
  var f3 = new Feature(15,30,"foo3", "green");
  var f4 = new Feature(22,40,"foo4", "009999");
  var f5 = new Feature(31,43,"foo5", "999999");

  var seqs = SeqMgr.getDummySequences(3,45);
  var f9 = new Feature(2,20,"foo9", "red");
  seqs[0].features = [f9];

  seqs[1].features = [f1,f2,f3,f4,f5];


  msa.addSeqs(seqs);
  msa.addPlugin(new ZoomBar(msa), "0_zoombar");
});
