require(["cs!msa/msa", "msa/selection/main"], function (MSA, selection) {

  var msa = new MSA('msa-highlighting');
  msa.log.setConsole('msa-highlighting-console');
  msa.seqmgr.addDummySequences();

  var selList = new selection.SelectionList();
  selList.addSelection(new selection.VerticalSelection(msa,2));
  selList.addSelection(new selection.HorizontalSelection(msa,3));

});
