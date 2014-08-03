require(["cs!msa/msa", "cs!msa/colorator"], function (MSA, Colorator) {

  var msa = new MSA('msa-colorscheme');
  // currently only zappo, taylor and hydrophobicity
  msa.colorscheme.setScheme('zappo');
  msa.seqmgr.addDummySequences();

  var msa2 = new MSA('msa-colorscheme2');
  msa2.colorscheme.setScheme('hydrophobicity');
  msa2.seqmgr.addDummySequences();

  var msaOwn = new MSA('msa-colorscheme-own');
  // inheritance in JS
  AwesomeScheme = function(){};
  AwesomeScheme.prototype = new Colorator();
  
  // choosing between two colors depending on the numerical value of the char
  AwesomeScheme.prototype.colorResidue = function (aminoGroup, tSeq, pos){

    var residue = tSeq.seq[pos];
    var intOfResidue = residue.charCodeAt(0) - 65;
    if( intOfResidue < 10){
      aminoGroup.style.backgroundColor = "rgba(255, 0, 0,0.3)";
    }else if( intOfResidue < 20){
      aminoGroup.style.backgroundColor = "rgba(0, 255, 0,0.3)";
    }else{
      aminoGroup.style.backgroundColor = "rgba(0, 0, 255,0.3)";
    }

    aminoGroup.className = "biojs_msa_single_residue";
  }; 
  
  // overwrite selection callbacks
  var simpleRed = function (aminoGroup, tSeq, pos){
    aminoGroup.style.backgroundColor = "rgba(255, 0, 0,0.7)";
  };

  AwesomeScheme.prototype.colorSelectedResidue =   simpleRed;
  AwesomeScheme.prototype.colorSelectedResidueSingle =  simpleRed;
  AwesomeScheme.prototype.colorSelectedResidueColumn = simpleRed;

  msaOwn.colorscheme = new AwesomeScheme();
  msaOwn.seqmgr.addDummySequences();
});
