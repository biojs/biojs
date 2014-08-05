var msa = new biojs.vis.msa.msa('msa-show-features', undefined, 
    {visibleElements: { features: true }} );


var f1 = new biojs.vis.msa.feature(2,20,"foo1", "red");
var f2 = new biojs.vis.msa.feature(1,10,"foo2", "0000ff");
var f3 = new biojs.vis.msa.feature(15,30,"foo3", "green");
var f4 = new biojs.vis.msa.feature(22,40,"foo4", "009999");
var f5 = new biojs.vis.msa.feature(31,43,"foo5", "999999");

var seqs = biojs.vis.msa.seqmgr.getDummySequences(3,45);
var f9 = new biojs.vis.msa.feature(2,20,"foo9", "red");
seqs[0].features = [f9];

seqs[1].features = [f1,f2,f3,f4,f5];


msa.addSeqs(seqs);
msa.addPlugin(new biojs.vis.msa.zoombar(msa), "0_zoombar");
