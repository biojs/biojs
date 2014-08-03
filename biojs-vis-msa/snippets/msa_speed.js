require(["jquery", "cs!input/fasta", "cs!msa/msa","cs!msa/zoombar"], function ($, Fasta, MSA, ZoomBar) {
  
  // as a async, non-blocking call
  Fasta.read("dummy/external/PF00072_rp15.txt", function(seqs) {
    $("#msa-file-input-fasta-seq").append(seqs.length+ " sequences read");

    // cut the seqs for demo purpose
    //seqs.forEach(function(seq){
    //  seq.name = seq.name.substring(0,20);
    //});

    //seqs = seqs.slice(0,1000);
    var start = new Date().getTime();

    var msa = new MSA('msa-speed',seqs, {speed: true,
      keyevents: true, visibleElements: { ruler: false }});
    msa.log.setConsole('msa-speed-console');
    
    //msa.addPlugin(new ZoomBar(msa,1,5), "0_zoombar");

    msa.log("Rendering time: " + (new Date().getTime()-start) + " ms");

  });
});
