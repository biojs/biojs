    var f1 = new biojs.msa.feature(2,20,"foo1", "red");
    var f2 = new biojs.msa.feature(1,10,"foo2", "0000ff");
    var f3 = new biojs.msa.feature(15,30,"foo3", "green");
    var f4 = new biojs.msa.feature(22,40,"foo4", "009999");
    var f5 = new biojs.msa.feature(31,43,"foo5", "999999");
    var f9 = new biojs.msa.feature(2,20,"foo9", "red");

    // alternatively you can also load a FASTA or Clustal file
    var seqs = biojs.msa.seqmgr.getDummySequences(8,45);

    // add the features to a sequence
    seqs[1].features = [f9];
    seqs[2].features = [f1,f2,f3,f4,f5];


    var msa = new biojs.msa.msa('msa-show-features', seqs, 
    {visibleElements: { features: true }} );

    msa.addPlugin(new biojs.msa.zoombar(msa), "0_zoombar");

    var defMenu = new biojs.msa.menu.defaultmenu("msa-show-menubar", msa);
    defMenu.createMenu();

