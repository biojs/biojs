Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.readers.quantum.MOReader", "java.util.Hashtable"], "J.adapter.readers.quantum.NWChemReader", ["java.lang.Character", "$.Float", "JU.AU", "$.List", "J.adapter.readers.quantum.BasisFunctionReader", "J.adapter.smarter.SmarterJmolAdapter", "J.api.JmolAdapter", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.taskNumber = 1;
this.equivalentAtomSets = 0;
this.energyKey = "";
this.energyValue = "";
this.converged = false;
this.haveEnergy = false;
this.haveAt = false;
this.inInput = false;
this.atomTypes = null;
this.htMOs = null;
this.nBasisFunctions = 0;
this.moCount = 0;
this.purging = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.quantum, "NWChemReader", J.adapter.readers.quantum.MOReader);
Clazz.prepareFields (c$, function () {
this.htMOs =  new java.util.Hashtable ();
});
$_V(c$, "initializeReader", 
function () {
this.calculationType = "(NWCHEM)";
});
$_V(c$, "checkLine", 
function () {
if (this.line.trim ().startsWith ("NWChem")) {
this.inInput = (this.line.indexOf ("NWChem Input Module") >= 0);
if (this.inInput) {
this.checkMOs ();
}}if (this.line.startsWith ("          Step")) {
this.init ();
return true;
}if (this.line.indexOf ("  wavefunction    = ") >= 0) {
this.calculationType = this.line.substring (this.line.indexOf ("=") + 1).trim () + "(NWCHEM)";
this.moData.put ("calculationType", this.calculationType);
return true;
}if (this.line.indexOf ("Total") >= 0) {
this.readTotal ();
return true;
}if (this.line.indexOf ("@") >= 0) {
this.readAtSign ();
return true;
}if (this.line.startsWith (" Task  times")) {
this.init ();
this.taskNumber++;
return true;
}if (this.line.startsWith ("      Optimization converged")) {
this.converged = true;
return true;
}if (this.line.startsWith ("      Symmetry information")) {
this.readSymmetry ();
return true;
}if (this.line.indexOf ("Output coordinates in angstroms") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.equivalentAtomSets++;
this.readAtoms ();
return true;
}if (this.line.indexOf ("Vibrational analysis") >= 0) {
this.readFrequencies ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("ENERGY GRADIENTS") >= 0) {
this.equivalentAtomSets++;
this.readGradients ();
return true;
}if (this.line.startsWith ("  Mulliken analysis of the total density")) {
if (this.equivalentAtomSets != 0) this.readPartialCharges ();
return true;
}if (this.line.contains ("Basis \"ao basis\"") && this.doReadMolecularOrbitals) {
return this.readBasis ();
}if (this.line.contains ("Molecular Orbital Analysis")) {
if (this.equivalentAtomSets != 0) this.readMOs ();
return true;
}return true;
});
$_V(c$, "finalizeReader", 
function () {
this.checkMOs ();
this.finalizeReaderASCR ();
});
$_M(c$, "init", 
($fz = function () {
this.haveEnergy = false;
this.haveAt = false;
this.converged = false;
this.inInput = false;
this.equivalentAtomSets = 0;
}, $fz.isPrivate = true, $fz));
$_M(c$, "setEnergies", 
($fz = function (key, value, nAtomSets) {
this.energyKey = key;
this.energyValue = value;
this.atomSetCollection.setAtomSetPropertyForSets (this.energyKey, this.energyValue, this.equivalentAtomSets);
this.atomSetCollection.setAtomSetNames (this.energyKey + " = " + this.energyValue, this.equivalentAtomSets, null);
this.atomSetCollection.setAtomSetEnergy (value, this.parseFloatStr (value));
this.haveEnergy = true;
}, $fz.isPrivate = true, $fz), "~S,~S,~N");
$_M(c$, "setEnergy", 
($fz = function (key, value) {
this.energyKey = key;
this.energyValue = value;
this.atomSetCollection.setAtomSetModelProperty (this.energyKey, this.energyValue);
this.atomSetCollection.setAtomSetName (this.energyKey + " = " + this.energyValue);
this.haveEnergy = true;
}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "readSymmetry", 
($fz = function () {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLines (3));
this.atomSetCollection.setAtomSetPropertyForSets ("Symmetry group name", tokens[tokens.length - 1], this.equivalentAtomSets);
}, $fz.isPrivate = true, $fz));
$_M(c$, "readTotal", 
($fz = function () {
var tokens = this.getTokens ();
try {
if (tokens[2].startsWith ("energy")) {
if (!this.haveAt) this.setEnergies ("E(" + tokens[1] + ")", tokens[tokens.length - 1], this.equivalentAtomSets);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtSign", 
($fz = function () {
if (this.line.charAt (2) == 'S') {
if (this.readLines (2) == null) return;
}var tokens = this.getTokens ();
if (!this.haveEnergy) {
this.setEnergies ("E", tokens[2], this.equivalentAtomSets);
} else {
this.setEnergies (this.energyKey, this.energyValue, this.equivalentAtomSets);
}this.atomSetCollection.setAtomSetPropertyForSets ("Step", tokens[1], this.equivalentAtomSets);
this.haveAt = true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtoms", 
($fz = function () {
this.readLines (3);
var tokens;
this.haveEnergy = false;
this.atomSetCollection.newAtomSet ();
this.atomSetCollection.setAtomSetModelProperty (".PATH", "Task " + this.taskNumber + (this.inInput ? J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Input" : J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Geometry"));
this.atomTypes =  new JU.List ();
while (this.readLine () != null && this.line.length > 0) {
tokens = this.getTokens ();
if (tokens.length < 6) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = this.fixTag (tokens[1]);
this.atomTypes.addLast (atom.atomName);
this.setAtomCoordXYZ (atom, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
}
if (this.converged) {
this.setEnergy (this.energyKey, this.energyValue);
this.atomSetCollection.setAtomSetModelProperty ("Step", "converged");
} else if (this.inInput) {
this.atomSetCollection.setAtomSetName ("Input");
}}, $fz.isPrivate = true, $fz));
$_M(c$, "readGradients", 
($fz = function () {
this.readLines (3);
var tokens;
this.atomSetCollection.newAtomSet ();
if (this.equivalentAtomSets > 1) this.atomSetCollection.cloneLastAtomSetProperties ();
this.atomSetCollection.setAtomSetModelProperty ("vector", "gradient");
this.atomSetCollection.setAtomSetModelProperty (".PATH", "Task " + this.taskNumber + J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Gradients");
while (this.readLine () != null && this.line.length > 0) {
tokens = this.getTokens ();
if (tokens.length < 8) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = this.fixTag (tokens[1]);
this.setAtomCoordXYZ (atom, this.parseFloatStr (tokens[2]) * 0.5291772, this.parseFloatStr (tokens[3]) * 0.5291772, this.parseFloatStr (tokens[4]) * 0.5291772);
this.atomSetCollection.addVibrationVector (atom.index, -this.parseFloatStr (tokens[5]), -this.parseFloatStr (tokens[6]), -this.parseFloatStr (tokens[7]));
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readFrequencies", 
($fz = function () {
var firstFrequencyAtomSetIndex = this.atomSetCollection.getAtomSetCount ();
var path = "Task " + this.taskNumber + J.adapter.smarter.SmarterJmolAdapter.PATH_SEPARATOR + "Frequencies";
this.discardLinesUntilContains ("Atom information");
this.readLines (2);
this.atomSetCollection.newAtomSet ();
var tokens;
while (this.readLine () != null && this.line.indexOf ("---") < 0) {
tokens = this.getTokens ();
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = this.fixTag (tokens[0]);
this.setAtomCoordXYZ (atom, this.parseFloatStr (tokens[2]) * 0.5291772, this.parseFloatStr (tokens[3]) * 0.5291772, this.parseFloatStr (tokens[4]) * 0.5291772);
}
this.discardLinesUntilContains ("(Projected Frequencies expressed in cm-1)");
this.readLines (3);
var firstTime = true;
while (this.readLine () != null && this.line.indexOf ("P.Frequency") >= 0) {
tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensAt (this.line, 12);
var frequencyCount = tokens.length;
var iAtom0 = this.atomSetCollection.getAtomCount ();
var atomCount = this.atomSetCollection.getLastAtomSetAtomCount ();
if (firstTime) iAtom0 -= atomCount;
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
for (var i = 0; i < frequencyCount; ++i) {
ignore[i] = (tokens[i].equals ("0.00") || !this.doGetVibration (++this.vibrationNumber));
if (ignore[i]) continue;
if (!firstTime) this.atomSetCollection.cloneLastAtomSet ();
firstTime = false;
this.atomSetCollection.setAtomSetFrequency (path, null, tokens[i], null);
}
this.readLines (1);
this.fillFrequencyData (iAtom0, atomCount, atomCount, ignore, false, 0, 0, null, 0);
this.readLines (3);
}
try {
this.discardLinesUntilContains ("Projected Infra Red Intensities");
this.readLines (2);
for (var i = this.vibrationNumber, idx = firstFrequencyAtomSetIndex; --i >= 0; ) {
if (this.readLine () == null) return;
if (!this.doGetVibration (i + 1)) continue;
tokens = this.getTokens ();
var iset = this.atomSetCollection.getCurrentAtomSetIndex ();
this.atomSetCollection.setCurrentAtomSetIndex (idx++);
this.atomSetCollection.setAtomSetFrequency (null, null, tokens[i], null);
this.atomSetCollection.setAtomSetModelProperty ("IRIntensity", tokens[5] + " KM/mol");
this.atomSetCollection.setCurrentAtomSetIndex (iset);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "readPartialCharges", 
function () {
var tokens;
this.readLines (4);
var atomCount = this.atomSetCollection.getAtomCount ();
var i0 = this.atomSetCollection.getLastAtomSetAtomIndex ();
var atoms = this.atomSetCollection.getAtoms ();
for (var i = i0; i < atomCount; ++i) {
while (atoms[i].elementNumber == 0) ++i;

do {
if (this.readLine () == null || this.line.length < 3) return;
tokens = this.getTokens ();
} while (tokens[0].indexOf (".") >= 0);
atoms[i].partialCharge = this.parseIntStr (tokens[2]) - this.parseFloatStr (tokens[3]);
}
});
$_M(c$, "fixTag", 
($fz = function (tag) {
if (tag.equalsIgnoreCase ("bq")) return "X";
if (tag.toLowerCase ().startsWith ("bq")) tag = tag.substring (2) + "-Bq";
return "" + Character.toUpperCase (tag.charAt (0)) + (tag.length == 1 ? "" : "" + Character.toLowerCase (tag.charAt (1)));
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "readBasis", 
($fz = function () {
this.gaussianCount = 0;
this.shellCount = 0;
this.nBasisFunctions = 0;
var isD6F10 = (this.line.indexOf ("cartesian") >= 0);
if (isD6F10) {
this.getDFMap (J.adapter.readers.quantum.NWChemReader.$DC_LIST, J.api.JmolAdapter.SHELL_D_CARTESIAN, J.adapter.readers.quantum.BasisFunctionReader.CANONICAL_DC_LIST, 3);
this.getDFMap (J.adapter.readers.quantum.NWChemReader.$FC_LIST, J.api.JmolAdapter.SHELL_F_CARTESIAN, J.adapter.readers.quantum.BasisFunctionReader.CANONICAL_FC_LIST, 3);
} else {
this.getDFMap (J.adapter.readers.quantum.NWChemReader.$DS_LIST, J.api.JmolAdapter.SHELL_D_SPHERICAL, J.adapter.readers.quantum.BasisFunctionReader.CANONICAL_DS_LIST, 2);
this.getDFMap (J.adapter.readers.quantum.NWChemReader.$FS_LIST, J.api.JmolAdapter.SHELL_F_SPHERICAL, J.adapter.readers.quantum.BasisFunctionReader.CANONICAL_FS_LIST, 2);
}this.shells =  new JU.List ();
var atomInfo =  new java.util.Hashtable ();
var atomSym = null;
var atomData = null;
var shellData = null;
while (this.line != null) {
var nBlankLines = 0;
while (this.line.length < 3 || this.line.charAt (2) == ' ') {
shellData =  new JU.List ();
this.readLine ();
if (this.line.length < 3) nBlankLines++;
}
if (nBlankLines >= 2) break;
if (this.parseIntStr (this.line) == -2147483648) {
atomSym = this.getTokens ()[0];
atomData =  new JU.List ();
atomInfo.put (atomSym, atomData);
this.readLine ();
this.readLine ();
continue;
}while (this.line != null && this.line.length > 3) {
var tokens = this.getTokens ();
var o = [tokens[1], [this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3])]];
shellData.addLast (o);
this.readLine ();
}
atomData.addLast (shellData);
}
var nD = (isD6F10 ? 6 : 5);
var nF = (isD6F10 ? 10 : 7);
var gdata =  new JU.List ();
for (var i = 0; i < this.atomTypes.size (); i++) {
atomData = atomInfo.get (this.atomTypes.get (i));
var nShells = atomData.size ();
for (var ishell = 0; ishell < nShells; ishell++) {
this.shellCount++;
shellData = atomData.get (ishell);
var nGaussians = shellData.size ();
var type = shellData.get (0)[0];
switch (type.charAt (0)) {
case 'S':
this.nBasisFunctions += 1;
break;
case 'P':
this.nBasisFunctions += 3;
break;
case 'D':
this.nBasisFunctions += nD;
break;
case 'F':
this.nBasisFunctions += nF;
break;
}
var slater =  Clazz.newIntArray (4, 0);
slater[0] = i;
slater[1] = (isD6F10 ? J.api.JmolAdapter.getQuantumShellTagID (type) : J.api.JmolAdapter.getQuantumShellTagIDSpherical (type));
slater[2] = this.gaussianCount;
slater[3] = nGaussians;
this.shells.addLast (slater);
for (var ifunc = 0; ifunc < nGaussians; ifunc++) gdata.addLast (shellData.get (ifunc)[1]);

this.gaussianCount += nGaussians;
}
}
this.gaussians = JU.AU.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) this.gaussians[i] = gdata.get (i);

J.util.Logger.info (this.gaussianCount + " Gaussians read");
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readMOs", 
($fz = function () {
var lines =  new JU.List ();
this.htMOs.put (this.line, lines);
lines.addLast (this.line);
var nblank = 0;
while (nblank != 2 && this.readLine () != null) {
lines.addLast (this.line);
if (this.line.length < 2) nblank++;
 else nblank = 0;
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "checkMOs", 
($fz = function () {
if (this.shells == null) return;
for (var entry, $entry = this.htMOs.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
this.line = entry.getKey ();
this.alphaBeta = this.line.substring (0, this.line.indexOf ("Final")).trim () + " ";
var moCount = 0;
if (!this.filterMO ()) continue;
var list = entry.getValue ();
var n = list.size ();
J.util.Logger.info (this.line);
for (var i = 3; i < n; i++) {
while (i < n && ((this.line = list.get (i)).length < 2 || this.line.charAt (1) != 'V')) i++;

if (i == n) break;
this.line = this.line.$replace ('=', ' ');
var tokens = this.getTokens ();
var occupancy = this.parseFloatStr (tokens[3]);
var energy = this.parseFloatStr (tokens[5]);
var symmetry = (tokens.length > 7 ? tokens[7] : null);
var mo =  new java.util.Hashtable ();
mo.put ("occupancy", Float.$valueOf (occupancy));
mo.put ("energy", Float.$valueOf (energy));
if (symmetry != null) mo.put ("symmetry", symmetry);
var coefs = null;
this.setMO (mo);
mo.put ("type", this.alphaBeta + (++moCount));
coefs =  Clazz.newFloatArray (this.nBasisFunctions, 0);
mo.put ("coefficients", coefs);
i += 3;
while ((this.line = list.get (++i)) != null && this.line.length > 3) {
tokens = this.getTokens ();
coefs[this.parseIntStr (tokens[0]) - 1] = this.parseFloatStr (tokens[1]);
var pt = Clazz.doubleToInt (tokens.length / 2);
if (pt == 5 || pt == 6) coefs[this.parseIntStr (tokens[pt]) - 1] = this.parseFloatStr (tokens[pt + 1]);
}
}
}
this.energyUnits = "a.u.";
this.setMOData (true);
this.shells = null;
this.htMOs.clear ();
}, $fz.isPrivate = true, $fz));
$_V(c$, "readLine", 
function () {
this.RL ();
if (!this.purging && this.line != null && this.line.startsWith ("--")) {
this.purging = true;
this.discardLinesUntilStartsWith ("*");
this.readLine ();
this.purging = false;
this.RL ();
}return this.line;
});
Clazz.defineStatics (c$,
"$DS_LIST", "d2-   d1-   d0    d1+   d2+",
"$FS_LIST", "f3-   f2-   f1-   f0    f1+   f2+   f3+",
"$DC_LIST", "DXX   DXY   DXZ   DYY   DYZ   DZZ",
"$FC_LIST", "XXX   XXY   XXZ   XYY   XYZ   XZZ   YYY   YYZ   YZZ   ZZZ");
});
