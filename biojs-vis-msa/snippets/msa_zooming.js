require(["cs!msa/msa", "cs!msa/zoombar"], function (MSA, ZoomBar) {

  var msa = new MSA('msa-zooming');
  msa.columnWidth = 15;

  msa.seqmgr.addDummySequences();

  msa.addPlugin(new ZoomBar(msa), "0_zoombar");
});
