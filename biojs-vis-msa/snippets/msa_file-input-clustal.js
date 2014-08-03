require(["jquery", "cs!input/clustal", "cs!msa/msa"], function ($, Clustal, MSA) {
  
  // as a async, non-blocking call
  Clustal.read("dummy/samples/p53.clustalo.clustal", function(seqs) {
    $("#msa-file-input-clustal-seq").append(seqs.length+ " sequences read");

    // cut the seqs for demo purpose
    /*
    seqs.forEach(function(seq){
      seq.seq = seq.seq.substring(0,50);
    });
    */

    // only display ten seqs
    //seqs = seqs.slice(0,10);

    var msa = new MSA('msa-file-input-clustal',seqs);
  });
});
