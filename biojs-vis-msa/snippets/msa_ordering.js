var msa = new biojs.vis.msa.msa('msa-ordering');
msa.log.setConsole('msa-ordering-console');

// define seqs
var seqs = [new biojs.model.seq("MSPFTACAPDRLNAGECTF", "awesome name", 1)
       ,new biojs.model.seq("QQTSPLQQQDILDMTVYCD", "awesome name2", 2)
       ,new biojs.model.seq("FTQHGMSGHEISPPSEPGH", "awesome name3", 3)];

msa.addSeqs(seqs);
msa.ordering.setOrdering([2,3,1]);
