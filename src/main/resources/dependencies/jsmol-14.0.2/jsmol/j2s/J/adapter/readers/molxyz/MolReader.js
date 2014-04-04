Clazz.declarePackage ("J.adapter.readers.molxyz");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.molxyz.MolReader", ["java.lang.Exception", "$.Float", "J.adapter.smarter.Atom", "J.api.JmolAdapter", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.is2D = false;
this.isV3000 = false;
this.haveAtomSerials = false;
this.dimension = null;
this.allow2D = true;
this.iatom0 = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.molxyz, "MolReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.is2D = this.checkFilterKey ("2D");
});
$_V(c$, "checkLine", 
function () {
var isMDL = (this.line.startsWith ("$MDL"));
if (isMDL) {
this.discardLinesUntilStartsWith ("$HDR");
this.readLine ();
if (this.line == null) {
J.util.Logger.warn ("$HDR not found in MDL RG file");
this.continuing = false;
return false;
}}if (this.doGetModel (++this.modelNumber, null)) {
this.processMolSdHeader ();
this.processCtab (isMDL);
this.iatom0 = this.atomSetCollection.getAtomCount ();
this.isV3000 = false;
if (this.isLastModel (this.modelNumber)) {
this.continuing = false;
return false;
}return true;
}this.discardLinesUntilStartsWith ("$$$$");
return true;
});
$_M(c$, "readUserData", 
($fz = function (atom0) {
if (this.isV3000) return;
while (this.readLine () != null && this.line.indexOf ("$$$$") != 0) {
if (this.line.toUpperCase ().contains ("_PARTIAL_CHARGES")) {
try {
var atoms = this.atomSetCollection.getAtoms ();
for (var i = this.parseIntStr (this.readLine ()); --i >= 0; ) {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
var atomIndex = this.parseIntStr (tokens[0]) + atom0 - 1;
var partialCharge = this.parseFloatStr (tokens[1]);
if (!Float.isNaN (partialCharge)) atoms[atomIndex].partialCharge = partialCharge;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return;
} else {
throw e;
}
}
}}
}, $fz.isPrivate = true, $fz), "~N");
$_V(c$, "finalizeReader", 
function () {
this.finalizeReaderMR ();
});
$_M(c$, "finalizeReaderMR", 
function () {
if (this.is2D) this.set2D ();
this.isTrajectory = false;
this.finalizeReaderASCR ();
});
$_M(c$, "processMolSdHeader", 
($fz = function () {
var header = "";
var thisDataSetName = this.line;
header += this.line + "\n";
this.atomSetCollection.setCollectionName (this.line);
this.readLine ();
if (this.line == null) return;
header += this.line + "\n";
this.dimension = (this.line.length < 22 ? "3D" : this.line.substring (20, 22));
if (!this.allow2D && this.dimension.equals ("2D")) throw  new Exception ("File is 2D, not 3D");
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("dimension", this.dimension);
this.readLine ();
if (this.line == null) return;
header += this.line + "\n";
J.util.Logger.info (header);
this.checkCurrentLineForScript ();
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("fileHeader", header);
this.newAtomSet (thisDataSetName);
}, $fz.isPrivate = true, $fz));
$_M(c$, "processCtab", 
($fz = function (isMDL) {
var tokens = null;
if (isMDL) this.discardLinesUntilStartsWith ("$CTAB");
this.isV3000 = (this.readLine () != null && this.line.indexOf ("V3000") >= 0);
if (this.isV3000) {
this.is2D = (this.dimension.equals ("2D"));
this.discardLinesUntilContains ("COUNTS");
tokens = this.getTokens ();
}if (this.line == null) return;
var atomCount = (this.isV3000 ? this.parseIntStr (tokens[3]) : this.parseIntRange (this.line, 0, 3));
var bondCount = (this.isV3000 ? this.parseIntStr (tokens[4]) : this.parseIntRange (this.line, 3, 6));
var atom0 = this.atomSetCollection.getAtomCount ();
this.readAtoms (atomCount);
this.readBonds (bondCount);
this.readUserData (atom0);
if (this.isV3000) this.discardLinesUntilContains ("END CTAB");
this.applySymmetryAndSetTrajectory ();
}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "readAtoms", 
($fz = function (atomCount) {
if (this.isV3000) this.discardLinesUntilContains ("BEGIN ATOM");
for (var i = 0; i < atomCount; ++i) {
this.readLine ();
var len = this.line.length;
var elementSymbol;
var x;
var y;
var z;
var charge = 0;
var isotope = 0;
var iAtom = -2147483648;
if (this.isV3000) {
this.checkLineContinuation ();
var tokens = this.getTokens ();
iAtom = this.parseIntStr (tokens[2]);
elementSymbol = tokens[3];
if (elementSymbol.equals ("*")) continue;
x = this.parseFloatStr (tokens[4]);
y = this.parseFloatStr (tokens[5]);
z = this.parseFloatStr (tokens[6]);
for (var j = 7; j < tokens.length; j++) {
var s = tokens[j].toUpperCase ();
if (s.startsWith ("CHG=")) charge = this.parseIntStr (tokens[j].substring (4));
 else if (s.startsWith ("MASS=")) isotope = this.parseIntStr (tokens[j].substring (5));
}
if (isotope > 1 && elementSymbol.equals ("H")) isotope = 1 - isotope;
} else {
x = this.parseFloatRange (this.line, 0, 10);
y = this.parseFloatRange (this.line, 10, 20);
z = this.parseFloatRange (this.line, 20, 30);
if (len < 34) {
elementSymbol = this.line.substring (31).trim ();
} else {
elementSymbol = this.line.substring (31, 34).trim ();
if (len >= 39) {
var code = this.parseIntRange (this.line, 36, 39);
if (code >= 1 && code <= 7) charge = 4 - code;
code = this.parseIntRange (this.line, 34, 36);
if (code != 0 && code >= -3 && code <= 4) {
isotope = J.api.JmolAdapter.getNaturalIsotope (J.api.JmolAdapter.getElementNumber (elementSymbol));
switch (isotope) {
case 0:
break;
case 1:
isotope = -code;
break;
default:
isotope += code;
}
}if (iAtom == -2147483648 && this.haveAtomSerials) iAtom = i + 1;
}}}switch (isotope) {
case 0:
break;
case -1:
elementSymbol = "D";
break;
case -2:
elementSymbol = "T";
break;
default:
elementSymbol = isotope + elementSymbol;
}
if (this.is2D && z != 0) this.is2D = false;
var atom =  new J.adapter.smarter.Atom ();
atom.elementSymbol = elementSymbol;
atom.formalCharge = charge;
this.setAtomCoordXYZ (atom, x, y, z);
if (iAtom == -2147483648) {
this.atomSetCollection.addAtom (atom);
} else {
this.haveAtomSerials = true;
atom.atomSerial = iAtom;
this.atomSetCollection.addAtomWithMappedSerialNumber (atom);
}}
if (this.isV3000) this.discardLinesUntilContains ("END ATOM");
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "checkLineContinuation", 
($fz = function () {
while (this.line.endsWith ("-")) {
var s = this.line;
this.readLine ();
this.line = s + this.line;
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readBonds", 
($fz = function (bondCount) {
if (this.isV3000) this.discardLinesUntilContains ("BEGIN BOND");
for (var i = 0; i < bondCount; ++i) {
this.readLine ();
var iAtom1;
var iAtom2;
var order;
var stereo = 0;
if (this.isV3000) {
this.checkLineContinuation ();
var tokens = this.getTokens ();
order = this.parseIntStr (tokens[3]);
iAtom1 = this.parseIntStr (tokens[4]);
iAtom2 = this.parseIntStr (tokens[5]);
for (var j = 6; j < tokens.length; j++) {
var s = tokens[j].toUpperCase ();
if (s.startsWith ("CFG=")) {
stereo = this.parseIntStr (tokens[j].substring (4));
break;
} else if (s.startsWith ("ENDPTS=")) {
if (this.line.indexOf ("ATTACH=ALL") < 0) continue;
tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensAt (this.line, this.line.indexOf ("ENDPTS=") + 8);
var n = this.parseIntStr (tokens[0]);
order = this.fixOrder (order, 0);
for (var k = 1; k <= n; k++) {
iAtom2 = this.parseIntStr (tokens[k]);
this.atomSetCollection.addNewBondWithMappedSerialNumbers (iAtom1, iAtom2, order);
}
break;
}}
} else {
iAtom1 = this.parseIntRange (this.line, 0, 3);
iAtom2 = this.parseIntRange (this.line, 3, 6);
order = this.parseIntRange (this.line, 6, 9);
if (this.is2D && order == 1 && this.line.length >= 12) stereo = this.parseIntRange (this.line, 9, 12);
}order = this.fixOrder (order, stereo);
if (this.haveAtomSerials) this.atomSetCollection.addNewBondWithMappedSerialNumbers (iAtom1, iAtom2, order);
 else this.atomSetCollection.addNewBondWithOrder (this.iatom0 + iAtom1 - 1, this.iatom0 + iAtom2 - 1, order);
}
if (this.isV3000) this.discardLinesUntilContains ("END BOND");
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "fixOrder", 
($fz = function (order, stereo) {
switch (order) {
default:
case 0:
case -10:
return 1;
case 1:
switch (stereo) {
case 1:
return 1025;
case 3:
case 6:
return 1041;
}
break;
case 2:
case 3:
break;
case 4:
return 515;
case 5:
return 66;
case 6:
return 513;
case 7:
return 514;
case 8:
case 9:
return 33;
}
return order;
}, $fz.isPrivate = true, $fz), "~N,~N");
});
