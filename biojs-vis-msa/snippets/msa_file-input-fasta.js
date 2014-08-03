require(["jquery", "cs!input/fasta", "cs!msa/msa","cs!msa/zoombar"], function ($, Fasta, MSA, ZoomBar) {
  
  // as a async, non-blocking call
  Fasta.read("dummy/PF00072.fasta", function(seqs) {
    $("#msa-file-input-fasta-seq").append(seqs.length+ " sequences read");

    // cut the seqs for demo purpose
    seqs.forEach(function(seq){
      seq.name = seq.name.substring(0,20);
    });

    var msa = new MSA('msa-file-input-fasta',seqs);
    msa.addPlugin(new ZoomBar(msa), "0_zoombar");
  });
});
