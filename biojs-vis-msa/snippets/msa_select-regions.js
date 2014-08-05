var msa = new biojs.vis.msa.msa('msa-select-regions', undefined, { allowRectSelect : true });

msa.seqmgr.addDummySequences(5,50);

var regSel = new selection.RegionSelect(msa, 1,1, 10, 2);
//regSel.select();
