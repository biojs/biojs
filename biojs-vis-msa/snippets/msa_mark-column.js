var msa = new biojs.vis.msa.msa('msa-mark-column');

var seqs = biojs.vis.msa.seqmgr.getDummySequences(4,40);

// labels
seqs[0].special = true;
seqs[2].special = true;

// markers
msa.plugs.marker.specials = [0,3,10,20];

msa.addSeqs(seqs);
