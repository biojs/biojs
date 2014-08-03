require(["cs!msa/msa", "msa/selection/main"], function (MSA, selection) {

  var msa = new MSA('msa-select-regions', undefined, { allowRectSelect : true });

  msa.seqmgr.addDummySequences(5,50);

  var regSel = new selection.RegionSelect(msa, 1,1, 10, 2);
  //regSel.select();
});
