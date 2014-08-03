require(["cs!msa/msa", "cs!seq"], function (MSA, Sequence) {

  var msa = new MSA('msa-first-example');
  msa.log.setConsole('msa-first-console');
  msa.addSeqs([new Sequence("MSPFTACAPDRLNNPPLKRTRTLSLRNPSETSTLSRSDRRNSMFLEGERIMNAFGQQPSS", "awesome name", 1)
    ,new Sequence("QQTSPLQQQDILDMTVYCDSNFSMYQQNLHHHHHHHHHQRPPAHPSGYGLGEYSSPSTNP", "awesome name3", 2)
    ,new Sequence("YLWMNSPGITSTPYLSSPNGGSYIQSGFGSNQRQFLPPPTGFGSADLGWLSISSQQELFK", "awesome name2", 3)
    ,new Sequence("MVRPPYSYSALIAMAIQNAQDKKLTLSQIYQYVADNFPFYKKSKAGWQNSIRHNLSLNDC", "awesome name5", 4)
    ,new Sequence("FKKVARDEDDPGKGNYWTLDPNCEKMFDNGNFRRKRKRRADGNAMSVKSEDALKLADTSS", "awesome name4", 5)
    ,new Sequence("LMSASPPSLQNSPTSSDPKSSPSPSAEHSPCFSNFIGNMNSIMSGNAVRSRDGSSAHLGD", "awesome name7", 6)
    ,new Sequence("FTQHGMSGHEISPPSEPGHLNTNRLNYYSASHNNSGLINSISNHFSVNNLIYNRDGSEV", "awesome name6", 7)]);
  //	msa.menu.displayMenuElement();
});

