Clazz.declarePackage ("J.adapter.readers.xtal");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.P3"], "J.adapter.readers.xtal.CrystalReader", ["java.lang.Character", "$.Double", "java.util.Arrays", "JU.BS", "$.DF", "$.List", "$.M3", "$.PT", "$.SB", "$.V3", "J.util.Logger", "$.Quaternion", "$.Tensor", "$.Txt"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isVersion3 = false;
this.isPrimitive = false;
this.isPolymer = false;
this.isSlab = false;
this.isMolecular = false;
this.haveCharges = false;
this.inputOnly = false;
this.isLongMode = false;
this.getLastConventional = false;
this.havePrimitiveMapping = false;
this.isProperties = false;
this.atomCount = 0;
this.atomIndexLast = 0;
this.atomFrag = null;
this.primitiveToIndex = null;
this.nuclearCharges = null;
this.vCoords = null;
this.energy = null;
this.ptOriginShift = null;
this.primitiveToCryst = null;
this.directLatticeVectors = null;
this.spaceGroupName = null;
this.primitiveVolume = 0;
this.primitiveDensity = 0;
this.vPrimitiveMapping = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xtal, "CrystalReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.ptOriginShift =  new JU.P3 ();
});
$_V(c$, "initializeReader", 
function () {
this.doProcessLines = false;
this.inputOnly = this.checkFilterKey ("INPUT");
this.isPrimitive = !this.inputOnly && !this.checkFilterKey ("CONV");
this.addVibrations = new Boolean (this.addVibrations & !this.inputOnly).valueOf ();
this.getLastConventional = (!this.isPrimitive && this.desiredModelNumber == 0);
this.setFractionalCoordinates (this.readHeader ());
this.atomSetCollection.setLatticeOnly (true);
});
$_V(c$, "checkLine", 
function () {
if (this.line.startsWith (" LATTICE PARAMETER")) {
var isConvLattice = (this.line.indexOf ("- CONVENTIONAL") >= 0);
if (isConvLattice) {
if (this.isPrimitive) return true;
this.readLatticeParams (true);
} else if (!this.isPrimitive && !this.havePrimitiveMapping && !this.getLastConventional) {
this.readLines (3);
this.readPrimitiveMapping ();
if (this.setPrimitiveMapping ()) return true;
}this.readLatticeParams (true);
if (!this.isPrimitive) {
this.discardLinesUntilContains (" TRANSFORMATION");
this.readTransformationMatrix ();
this.discardLinesUntilContains (" CRYSTALLOGRAPHIC");
this.readLatticeParams (false);
this.discardLinesUntilContains (" CRYSTALLOGRAPHIC");
this.readCoordLines ();
if (!this.getLastConventional) {
if (this.doGetModel (++this.modelNumber, null)) {
this.createAtomsFromCoordLines ();
} else {
this.vCoords = null;
this.checkLastModel ();
}}}return true;
}if (!this.isPrimitive) {
if (this.line.startsWith (" SHIFT OF THE ORIGIN")) return this.readShift ();
if (this.line.startsWith (" INPUT COORDINATES")) {
this.readCoordLines ();
if (this.inputOnly) this.continuing = false;
return true;
}}if (this.line.startsWith (" DIRECT LATTICE VECTOR")) return this.setDirect ();
if (this.line.indexOf ("DIMENSIONALITY OF THE SYSTEM") >= 0) {
if (this.line.indexOf ("2") >= 0) this.isSlab = true;
if (this.line.indexOf ("1") >= 0) this.isPolymer = true;
return true;
}if (this.addVibrations && this.line.startsWith (" FREQUENCIES COMPUTED ON A FRAGMENT")) return this.readFreqFragments ();
if (this.line.indexOf ("CONSTRUCTION OF A NANOTUBE FROM A SLAB") >= 0) {
this.isPolymer = true;
this.isSlab = false;
return true;
}if (this.line.indexOf ("* CLUSTER CALCULATION") >= 0) {
this.isMolecular = true;
this.isSlab = false;
this.isPolymer = false;
return true;
}if (((this.isPrimitive || this.isMolecular) && this.line.startsWith (" ATOMS IN THE ASYMMETRIC UNIT")) || this.isProperties && this.line.startsWith ("   ATOM N.AT.")) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
return this.readAtoms ();
}if (this.line.startsWith (" * SUPERCELL OPTION")) {
this.discardLinesUntilContains ("GENERATED");
return true;
}if (!this.doProcessLines) return true;
if (this.line.startsWith (" TOTAL ENERGY")) {
this.readEnergy ();
this.readLine ();
if (this.line.startsWith (" ********")) this.discardLinesUntilContains ("SYMMETRY ALLOWED");
 else if (this.line.startsWith (" TTTTTTTT")) this.discardLinesUntilContains2 ("PREDICTED ENERGY CHANGE", "HHHHHHH");
return true;
}if (this.line.startsWith (" TYPE OF CALCULATION")) {
this.calculationType = this.line.substring (this.line.indexOf (":") + 1).trim ();
return true;
}if (this.line.startsWith (" MULLIKEN POPULATION ANALYSIS")) return this.readPartialCharges ();
if (this.line.startsWith (" TOTAL ATOMIC CHARGES")) return this.readTotalAtomicCharges ();
if (this.addVibrations && this.line.contains (this.isVersion3 ? "EIGENVALUES (EV) OF THE MASS" : "EIGENVALUES (EIGV) OF THE MASS") || this.line.indexOf ("LONGITUDINAL OPTICAL (LO)") >= 0) {
this.createAtomsFromCoordLines ();
this.isLongMode = (this.line.indexOf ("LONGITUDINAL OPTICAL (LO)") >= 0);
return this.readFrequencies ();
}if (this.line.startsWith (" MAX GRADIENT")) return this.readGradient ();
if (this.line.startsWith (" ATOMIC SPINS SET")) return this.readData ("spin", 3);
if (this.line.startsWith (" TOTAL ATOMIC SPINS  :")) return this.readData ("magneticMoment", 1);
if (this.line.startsWith (" BORN CHARGE TENSOR.")) return this.readBornChargeTensors ();
if (!this.isProperties) return true;
if (this.line.startsWith (" DEFINITION OF TRACELESS")) return this.getQuadrupoleTensors ();
if (this.line.startsWith (" MULTIPOLE ANALYSIS BY ATOMS")) {
this.appendLoadNote ("Multipole Analysis");
return true;
}return true;
});
$_V(c$, "finalizeReader", 
function () {
this.createAtomsFromCoordLines ();
if (this.energy != null) this.setEnergy ();
this.finalizeReaderASCR ();
});
$_M(c$, "setDirect", 
($fz = function () {
var isBohr = (this.line.indexOf ("(BOHR") >= 0);
this.directLatticeVectors = this.read3Vectors (isBohr);
var a =  new JU.V3 ();
var b =  new JU.V3 ();
if (this.isPrimitive) {
a = this.directLatticeVectors[0];
b = this.directLatticeVectors[1];
} else {
if (this.primitiveToCryst == null) return true;
var mp =  new JU.M3 ();
mp.setColumnV (0, this.directLatticeVectors[0]);
mp.setColumnV (1, this.directLatticeVectors[1]);
mp.setColumnV (2, this.directLatticeVectors[2]);
mp.mul (this.primitiveToCryst);
a =  new JU.V3 ();
b =  new JU.V3 ();
mp.getColumnV (0, a);
mp.getColumnV (1, b);
}this.matUnitCellOrientation = J.util.Quaternion.getQuaternionFrame ( new JU.P3 (), a, b).getMatrix ();
J.util.Logger.info ("oriented unit cell is in model " + this.atomSetCollection.getAtomSetCount ());
return !this.isProperties;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readTransformationMatrix", 
($fz = function () {
this.primitiveToCryst = JU.M3.newA (this.fillFloatArray (null, 0,  Clazz.newFloatArray (9, 0)));
}, $fz.isPrivate = true, $fz));
$_M(c$, "readShift", 
($fz = function () {
var tokens = this.getTokens ();
var pt = tokens.length - 3;
this.ptOriginShift.set (this.fraction (tokens[pt++]), this.fraction (tokens[pt++]), this.fraction (tokens[pt]));
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "fraction", 
($fz = function (f) {
var ab = JU.PT.split (f, "/");
return (ab.length == 2 ? this.parseFloatStr (ab[0]) / this.parseFloatStr (ab[1]) : 0);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "setPrimitiveVolumeAndDensity", 
($fz = function () {
if (this.primitiveVolume != 0) this.atomSetCollection.setAtomSetModelProperty ("volumePrimitive", JU.DF.formatDecimal (this.primitiveVolume, 3));
if (this.primitiveDensity != 0) this.atomSetCollection.setAtomSetModelProperty ("densityPrimitive", JU.DF.formatDecimal (this.primitiveDensity, 3));
}, $fz.isPrivate = true, $fz));
$_M(c$, "readHeader", 
($fz = function () {
this.discardLinesUntilContains ("*                                CRYSTAL");
this.isVersion3 = (this.line.indexOf ("CRYSTAL03") >= 0);
this.discardLinesUntilContains ("EEEEEEEEEE");
var name;
if (this.readLine ().length == 0) {
name = this.readLines (2).trim ();
} else {
name = this.line.trim ();
this.readLine ();
}var type = this.readLine ().trim ();
var pt = type.indexOf ("- PROPERTIES");
if (pt >= 0) {
this.isProperties = true;
type = type.substring (0, pt).trim ();
}if (type.indexOf ("EXTERNAL FILE") >= 0) {
type = this.readLine ().trim ();
this.isPolymer = (type.equals ("1D - POLYMER"));
this.isSlab = (type.equals ("2D - SLAB"));
} else {
this.isPolymer = (type.equals ("POLYMER CALCULATION"));
this.isSlab = (type.equals ("SLAB CALCULATION"));
}this.atomSetCollection.setCollectionName (name + (!this.isProperties && this.desiredModelNumber == 0 ? " (optimized)" : ""));
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("symmetryType", type);
if ((this.isPolymer || this.isSlab) && !this.isPrimitive) {
J.util.Logger.error ("Cannot use FILTER \"conventional\" with POLYMER or SLAB");
this.isPrimitive = true;
}this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("unitCellType", (this.isPrimitive ? "primitive" : "conventional"));
if (type.indexOf ("MOLECULAR") >= 0) {
this.isMolecular = this.doProcessLines = true;
this.readLine ();
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("molecularCalculationPointGroup", this.line.substring (this.line.indexOf (" OR ") + 4).trim ());
return false;
}this.spaceGroupName = "P1";
if (!this.isPrimitive) {
this.discardLinesUntilContains2 ("SPACE GROUP", "****");
pt = this.line.indexOf (":");
if (pt >= 0) this.spaceGroupName = this.line.substring (pt + 1).trim ();
}this.doApplySymmetry = this.isProperties;
return !this.isProperties;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readLatticeParams", 
($fz = function (isNewSet) {
var f = (this.line.indexOf ("(BOHR") >= 0 ? 0.5291772 : 1);
if (isNewSet) this.newAtomSet ();
if (this.isPolymer && !this.isPrimitive) {
this.setUnitCell (this.parseFloatStr (this.line.substring (this.line.indexOf ("CELL") + 4)) * f, -1, -1, 90, 90, 90);
} else {
while (this.readLine ().indexOf ("GAMMA") < 0) if (this.line.indexOf ("VOLUME=") >= 0) {
this.primitiveVolume = this.parseFloatStr (this.line.substring (43));
this.primitiveDensity = this.parseFloatStr (this.line.substring (66));
}
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
if (this.isSlab) {
if (this.isPrimitive) this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, -1, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
 else this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, -1, 90, 90, this.parseFloatStr (tokens[2]));
} else if (this.isPolymer) {
this.setUnitCell (this.parseFloatStr (tokens[0]) * f, -1, -1, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
} else {
this.setUnitCell (this.parseFloatStr (tokens[0]) * f, this.parseFloatStr (tokens[1]) * f, this.parseFloatStr (tokens[2]) * f, this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]), this.parseFloatStr (tokens[5]));
}}}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "readPrimitiveMapping", 
($fz = function () {
if (this.havePrimitiveMapping) return;
this.vPrimitiveMapping =  new JU.List ();
while (this.readLine () != null && this.line.indexOf ("NUMBER") < 0) this.vPrimitiveMapping.addLast (this.line);

}, $fz.isPrivate = true, $fz));
$_M(c$, "setPrimitiveMapping", 
($fz = function () {
if (this.vCoords == null || this.vPrimitiveMapping == null || this.havePrimitiveMapping) return false;
this.havePrimitiveMapping = true;
var bsInputAtomsIgnore =  new JU.BS ();
var n = this.vCoords.size ();
var indexToPrimitive =  Clazz.newIntArray (n, 0);
this.primitiveToIndex =  Clazz.newIntArray (n, 0);
for (var i = 0; i < n; i++) indexToPrimitive[i] = -1;

var nPrim = 0;
for (var iLine = 0; iLine < this.vPrimitiveMapping.size (); iLine++) {
this.line = this.vPrimitiveMapping.get (iLine);
if (this.line.indexOf (" NOT IRREDUCIBLE") >= 0) {
bsInputAtomsIgnore.set (this.parseIntRange (this.line, 21, 25) - 1);
continue;
}while (this.readLine () != null && this.line.indexOf ("NUMBER") < 0) {
if (this.line.length < 2 || this.line.indexOf ("ATOM") >= 0) continue;
var iAtom = this.parseIntRange (this.line, 4, 8) - 1;
if (indexToPrimitive[iAtom] < 0) {
indexToPrimitive[iAtom] = nPrim++;
}}
}
if (bsInputAtomsIgnore.nextSetBit (0) >= 0) for (var i = n; --i >= 0; ) if (bsInputAtomsIgnore.get (i)) this.vCoords.remove (i);

this.atomCount = this.vCoords.size ();
J.util.Logger.info (nPrim + " primitive atoms and " + this.atomCount + " conventionalAtoms");
this.primitiveToIndex =  Clazz.newIntArray (nPrim, 0);
for (var i = 0; i < nPrim; i++) this.primitiveToIndex[i] = -1;

for (var i = this.atomCount; --i >= 0; ) {
var iPrim = indexToPrimitive[this.parseIntStr (this.vCoords.get (i).substring (0, 4)) - 1];
if (iPrim >= 0) this.primitiveToIndex[iPrim] = i;
}
this.vPrimitiveMapping = null;
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtoms", 
($fz = function () {
if (this.isMolecular) this.newAtomSet ();
this.vCoords = null;
while (this.readLine () != null && this.line.indexOf ("*") < 0) {
if (this.line.indexOf ("X(ANGSTROM") >= 0) {
this.setFractionalCoordinates (false);
this.isMolecular = true;
}}
var i = this.atomIndexLast;
var doNormalizePrimitive = false;
this.atomIndexLast = this.atomSetCollection.getAtomCount ();
while (this.readLine () != null && this.line.length > 0 && this.line.indexOf (this.isPrimitive ? "*" : "=") < 0) {
var atom = this.atomSetCollection.addNewAtom ();
var tokens = this.getTokens ();
var pt = (this.isProperties ? 1 : 2);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.getAtomicNumber (tokens[pt++]));
atom.atomName = J.adapter.readers.xtal.CrystalReader.fixAtomName (tokens[pt++]);
if (this.isProperties) pt++;
var x = this.parseFloatStr (tokens[pt++]);
var y = this.parseFloatStr (tokens[pt++]);
var z = this.parseFloatStr (tokens[pt]);
if (this.haveCharges) atom.partialCharge = this.atomSetCollection.getAtom (i++).partialCharge;
if (this.iHaveFractionalCoordinates && !this.isProperties) {
if (x < 0 && (this.isPolymer || this.isSlab || doNormalizePrimitive)) x += 1;
if (y < 0 && (this.isSlab || doNormalizePrimitive)) y += 1;
if (z < 0 && doNormalizePrimitive) z += 1;
}this.setAtomCoordXYZ (atom, x, y, z);
}
this.atomCount = this.atomSetCollection.getAtomCount () - this.atomIndexLast;
return true;
}, $fz.isPrivate = true, $fz));
c$.fixAtomName = $_M(c$, "fixAtomName", 
($fz = function (s) {
return (s.length > 1 && Character.isLetter (s.charAt (1)) ? s.substring (0, 1) + Character.toLowerCase (s.charAt (1)) + s.substring (2) : s);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getAtomicNumber", 
($fz = function (token) {
return this.parseIntStr (token) % 100;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "readCoordLines", 
($fz = function () {
this.readLine ();
this.readLine ();
this.vCoords =  new JU.List ();
while (this.readLine () != null && this.line.length > 0) this.vCoords.addLast (this.line);

}, $fz.isPrivate = true, $fz));
$_M(c$, "createAtomsFromCoordLines", 
($fz = function () {
if (this.vCoords == null) return;
this.atomCount = this.vCoords.size ();
for (var i = 0; i < this.atomCount; i++) {
var atom = this.atomSetCollection.addNewAtom ();
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.vCoords.get (i));
atom.atomSerial = this.parseIntStr (tokens[0]);
var atomicNumber;
var offset;
if (tokens.length == 7) {
atomicNumber = this.getAtomicNumber (tokens[2]);
offset = 2;
} else {
atomicNumber = this.getAtomicNumber (tokens[1]);
offset = 0;
}var x = this.parseFloatStr (tokens[2 + offset]) + this.ptOriginShift.x;
var y = this.parseFloatStr (tokens[3 + offset]) + this.ptOriginShift.y;
var z = this.parseFloatStr (tokens[4 + offset]) + this.ptOriginShift.z;
this.setAtomCoordXYZ (atom, x, y, z);
atom.elementSymbol = J.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atomicNumber);
}
this.vCoords = null;
this.setPrimitiveVolumeAndDensity ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "newAtomSet", 
($fz = function () {
if (this.atomCount > 0 && this.atomSetCollection.getAtomCount () > 0) {
this.applySymmetryAndSetTrajectory ();
this.atomSetCollection.newAtomSet ();
}if (this.spaceGroupName != null) this.setSpaceGroupName (this.spaceGroupName);
this.atomCount = 0;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readEnergy", 
($fz = function () {
this.line = JU.PT.simpleReplace (this.line, "( ", "(");
var tokens = this.getTokens ();
this.energy = Double.$valueOf (Double.parseDouble (tokens[2]));
this.setEnergy ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "setEnergy", 
($fz = function () {
this.atomSetCollection.setAtomSetEnergy ("" + this.energy, this.energy.floatValue ());
this.atomSetCollection.setAtomSetAuxiliaryInfo ("Energy", this.energy);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("Energy", this.energy);
this.atomSetCollection.setAtomSetName ("Energy = " + this.energy + " Hartree");
}, $fz.isPrivate = true, $fz));
$_M(c$, "readPartialCharges", 
($fz = function () {
if (this.haveCharges || this.atomSetCollection.getAtomCount () == 0) return true;
this.haveCharges = true;
this.readLines (3);
var atoms = this.atomSetCollection.getAtoms ();
var i0 = this.atomSetCollection.getLastAtomSetAtomIndex ();
var iPrim = 0;
while (this.readLine () != null && this.line.length > 3) if (this.line.charAt (3) != ' ') {
var iConv = this.getAtomIndexFromPrimitiveIndex (iPrim);
if (iConv >= 0) atoms[i0 + iConv].partialCharge = this.parseFloatRange (this.line, 9, 11) - this.parseFloatRange (this.line, 12, 18);
iPrim++;
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readTotalAtomicCharges", 
($fz = function () {
var data =  new JU.SB ();
while (this.readLine () != null && this.line.indexOf ("T") < 0) data.append (this.line);

var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (data.toString ());
var charges =  Clazz.newFloatArray (tokens.length, 0);
if (this.nuclearCharges == null) this.nuclearCharges = charges;
if (this.atomSetCollection.getAtomCount () == 0) return true;
var atoms = this.atomSetCollection.getAtoms ();
var i0 = this.atomSetCollection.getLastAtomSetAtomIndex ();
for (var i = 0; i < charges.length; i++) {
var iConv = this.getAtomIndexFromPrimitiveIndex (i);
if (iConv >= 0) {
charges[i] = this.parseFloatStr (tokens[i]);
atoms[i0 + iConv].partialCharge = this.nuclearCharges[i] - charges[i];
}}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "getAtomIndexFromPrimitiveIndex", 
($fz = function (iPrim) {
return (this.primitiveToIndex == null ? iPrim : this.primitiveToIndex[iPrim]);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "readFreqFragments", 
($fz = function () {
var numAtomsFrag = this.parseIntRange (this.line, 39, 44);
if (numAtomsFrag < 0) return true;
this.atomFrag =  Clazz.newIntArray (numAtomsFrag, 0);
var Sfrag = "";
while (this.readLine () != null && this.line.indexOf ("(") >= 0) Sfrag += this.line;

Sfrag = JU.PT.simpleReplace (Sfrag, "(", " ");
Sfrag = JU.PT.simpleReplace (Sfrag, ")", " ");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (Sfrag);
for (var i = 0, pos = 0; i < numAtomsFrag; i++, pos += 3) this.atomFrag[i] = this.getAtomIndexFromPrimitiveIndex (this.parseIntStr (tokens[pos]) - 1);

java.util.Arrays.sort (this.atomFrag);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readFrequencies", 
($fz = function () {
this.energy = null;
this.discardLinesUntilContains ("MODES");
var haveIntensities = (this.line.indexOf ("INTENS") >= 0);
this.readLine ();
var vData =  new JU.List ();
var freqAtomCount = this.atomCount;
while (this.readLine () != null && this.line.length > 0) {
var i0 = this.parseIntRange (this.line, 1, 5);
var i1 = this.parseIntRange (this.line, 6, 10);
var irrep = (this.isLongMode ? this.line.substring (48, 51) : this.line.substring (49, 52)).trim ();
var intens = (!haveIntensities ? "not available" : (this.isLongMode ? this.line.substring (53, 61) : this.line.substring (59, 69).$replace (')', ' ')).trim ());
var irActivity = (this.isLongMode ? "A" : this.line.substring (55, 58).trim ());
var ramanActivity = (this.isLongMode ? "I" : this.line.substring (71, 73).trim ());
var data = [irrep, intens, irActivity, ramanActivity];
for (var i = i0; i <= i1; i++) vData.addLast (data);

}
this.discardLinesUntilContains (this.isLongMode ? "LO MODES FOR IRREP" : this.isVersion3 ? "THE CORRESPONDING MODES" : "NORMAL MODES NORMALIZED TO CLASSICAL AMPLITUDES");
this.readLine ();
var lastAtomCount = -1;
while (this.readLine () != null && this.line.startsWith (" FREQ(CM**-1)")) {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line.substring (15));
var frequencies =  Clazz.newFloatArray (tokens.length, 0);
var frequencyCount = frequencies.length;
for (var i = 0; i < frequencyCount; i++) {
frequencies[i] = this.parseFloatStr (tokens[i]);
if (J.util.Logger.debugging) J.util.Logger.debug ((this.vibrationNumber + i) + " frequency=" + frequencies[i]);
}
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
var iAtom0 = 0;
var nData = vData.size ();
for (var i = 0; i < frequencyCount; i++) {
tokens = vData.get (this.vibrationNumber % nData);
ignore[i] = (!this.doGetVibration (++this.vibrationNumber) || tokens == null);
if (ignore[i]) continue;
this.applySymmetryAndSetTrajectory ();
lastAtomCount = this.cloneLastAtomSet (this.atomCount, null);
if (i == 0) iAtom0 = this.atomSetCollection.getLastAtomSetAtomIndex ();
this.setFreqValue (frequencies[i], tokens);
}
this.readLine ();
this.fillFrequencyData (iAtom0, freqAtomCount, lastAtomCount, ignore, false, 14, 10, this.atomFrag, 0);
this.readLine ();
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "setFreqValue", 
($fz = function (freq, data) {
var activity = "IR: " + data[2] + ", Ram.: " + data[3];
this.atomSetCollection.setAtomSetFrequency (null, activity, "" + freq, null);
this.atomSetCollection.setAtomSetModelProperty ("IRintensity", data[1] + " km/Mole");
this.atomSetCollection.setAtomSetModelProperty ("vibrationalSymmetry", data[0]);
this.atomSetCollection.setAtomSetModelProperty ("IRactivity", data[2]);
this.atomSetCollection.setAtomSetModelProperty ("Ramanactivity", data[3]);
this.atomSetCollection.setAtomSetName ((this.isLongMode ? "LO " : "") + data[0] + " " + JU.DF.formatDecimal (freq, 2) + " cm-1 (" + JU.DF.formatDecimal (JU.PT.fVal (data[1]), 0) + " km/Mole), " + activity);
}, $fz.isPrivate = true, $fz), "~N,~A");
$_M(c$, "readGradient", 
($fz = function () {
var key = null;
while (this.line != null) {
var tokens = this.getTokens ();
if (this.line.indexOf ("MAX GRAD") >= 0) key = "maxGradient";
 else if (this.line.indexOf ("RMS GRAD") >= 0) key = "rmsGradient";
 else if (this.line.indexOf ("MAX DISP") >= 0) key = "maxDisplacement";
 else if (this.line.indexOf ("RMS DISP") >= 0) key = "rmsDisplacement";
 else break;
if (this.atomSetCollection.getAtomCount () > 0) this.atomSetCollection.setAtomSetModelProperty (key, tokens[2]);
this.readLine ();
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readData", 
($fz = function (name, nfields) {
this.createAtomsFromCoordLines ();
var s =  new Array (this.atomCount);
for (var i = 0; i < this.atomCount; i++) s[i] = "0";

var data = "";
while (this.readLine () != null && (this.line.length < 4 || Character.isDigit (this.line.charAt (3)))) data += this.line;

data = JU.PT.simpleReplace (data, "-", " -");
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (data);
for (var i = 0, pt = nfields - 1; i < this.atomCount; i++, pt += nfields) {
var iConv = this.getAtomIndexFromPrimitiveIndex (i);
if (iConv >= 0) s[iConv] = tokens[pt];
}
data = J.util.Txt.join (s, '\n', 0);
this.atomSetCollection.setAtomSetAtomProperty (name, data, -1);
return true;
}, $fz.isPrivate = true, $fz), "~S,~N");
$_M(c$, "getQuadrupoleTensors", 
($fz = function () {
this.readLines (6);
var atoms = this.atomSetCollection.getAtoms ();
while (this.readLine () != null && this.line.startsWith (" *** ATOM")) {
var tokens = this.getTokens ();
var index = this.parseIntStr (tokens[3]) - 1;
tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLines (3));
atoms[index].addTensor ( new J.util.Tensor ().setFromEigenVectors (this.directLatticeVectors, [this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[5])], "quadrupole", atoms[index].atomName), null, false);
this.readLine ();
}
this.appendLoadNote ("Ellipsoids set \"quadrupole\": Quadrupole tensors");
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readBornChargeTensors", 
($fz = function () {
this.createAtomsFromCoordLines ();
this.readLine ();
var atoms = this.atomSetCollection.getAtoms ();
while (this.readLine ().startsWith (" ATOM")) {
var index = this.parseIntStr (this.line.substring (5)) - 1;
var atom = atoms[index];
this.readLines (2);
var a =  Clazz.newDoubleArray (3, 3, 0);
for (var i = 0; i < 3; i++) {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
for (var j = 0; j < 3; j++) a[i][j] = this.parseFloatStr (tokens[j + 1]);

}
atom.addTensor ( new J.util.Tensor ().setFromAsymmetricTensor (a, "charge", atom.elementSymbol + (index + 1)), null, false);
this.readLine ();
}
this.appendLoadNote ("Ellipsoids set \"charge\": Born charge tensors");
return false;
}, $fz.isPrivate = true, $fz));
});
