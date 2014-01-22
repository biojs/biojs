Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.xtal.AbinitReader", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cellLattice = null;
this.atomList = null;
this.nAtom = 0;
this.nType = 0;
this.typeArray = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "AbinitReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.setSpaceGroupName ("P1");
this.doApplySymmetry = true;
});
$_V(c$, "checkLine", 
function () {
if (this.line.contains ("natom")) {
this.readNoatom ();
} else if (this.line.contains ("ntypat") || this.line.contains ("ntype")) {
this.readNotypes ();
} else if (this.line.contains ("typat") || this.line.contains ("type")) {
this.readTypesequence ();
} else if (this.line.contains ("Pseudopotential")) {
this.readAtomSpecies ();
} else if (this.line.contains ("Symmetries :")) {
this.readSpaceGroup ();
} else if (this.line.contains ("Real(R)+Recip(G)")) {
this.readIntiallattice ();
} else if (this.line.contains ("xred")) {
this.readIntitfinalCoord ();
}return true;
});
$_M(c$, "readNoatom", 
($fz = function () {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
if (tokens.length <= 2) this.nAtom = this.parseIntStr (tokens[1]);
}, $fz.isPrivate = true, $fz));
$_M(c$, "readNotypes", 
($fz = function () {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
if (tokens.length <= 2) this.nType = this.parseIntStr (tokens[1]);
}, $fz.isPrivate = true, $fz));
$_M(c$, "readTypesequence", 
($fz = function () {
this.typeArray =  Clazz.newIntArray (this.nAtom, 0);
var i = 0;
while (this.line != null && this.line.indexOf ("wtk") < 0) {
var tmp = this.line;
if (this.line.contains ("type")) tmp = JU.PT.simpleReplace (tmp, "type", "");
if (this.line.contains ("typat")) tmp = JU.PT.simpleReplace (tmp, "typat", "");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (tmp);
for (var j = 0; j < tokens.length; j++) {
this.typeArray[i] = this.parseIntStr (tokens[j]);
i++;
}
this.readLine ();
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtomSpecies", 
($fz = function () {
this.atomList =  new Array (this.nAtom);
this.readLine ();
var pseudo = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
var pseudoType = this.parseIntStr (pseudo[4]);
for (var i = 0; i < this.nType; i++) {
var tokenIndex = 0;
this.discardLinesUntilContains ("zion");
var tmp = JU.PT.simpleReplace (this.line, ".", " ");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (tmp);
if (tokens[0] === "-") tokenIndex = 1;
var atomicNo = this.parseIntStr (tokens[tokenIndex]);
if (pseudoType == atomicNo) {
for (var j = 0; j < this.typeArray.length; j++) {
this.atomList[j] = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atomicNo);
}
}}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readSpaceGroup", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
$_M(c$, "readIntiallattice", 
($fz = function () {
this.cellLattice =  Clazz.newFloatArray (9, 0);
var data = "";
var counter = 0;
while (this.readLine () != null && this.line.indexOf ("Unit cell volume") < 0) {
data = this.line;
data = JU.PT.simpleReplace (data, "=", "= ");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (data);
this.cellLattice[counter++] = this.parseFloatStr (tokens[1]) * 0.5291772;
this.cellLattice[counter++] = this.parseFloatStr (tokens[2]) * 0.5291772;
this.cellLattice[counter++] = this.parseFloatStr (tokens[3]) * 0.5291772;
}
this.setSymmetry ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "setSymmetry", 
($fz = function () {
this.applySymmetryAndSetTrajectory ();
this.setSpaceGroupName ("P1");
this.setFractionalCoordinates (false);
}, $fz.isPrivate = true, $fz));
$_M(c$, "readIntitfinalCoord", 
($fz = function () {
var data = "";
var count = 0;
while (this.readLine () != null && this.line.contains ("znucl")) {
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = this.atomList[count++];
data = this.line;
if (data.contains ("xred")) JU.PT.simpleReplace (data, "xred", "");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (data);
var x = this.parseFloatStr (tokens[0]);
var y = this.parseFloatStr (tokens[1]);
var z = this.parseFloatStr (tokens[2]);
this.setAtomCoordXYZ (atom, x, y, z);
}
}, $fz.isPrivate = true, $fz));
});
