(function(Clazz
,$_A
,$_Ab
,$_AB
,$_AC
,$_AD
,$_AF
,$_AI
,$_AL
,$_AS
,$_B
,$_C
,$_D
,$_E
,$_F
,$_G
,$_H
,$_I
,$_J
,$_K
,$_k
,$_L
,$_M
,$_N
,$_O
,$_P
,$_Q
,$_R
,$_S
,$_s
,$_T
,$_U
,$_V
,$_W
,$_X
,$_Y
,$_Z
,Clazz_doubleToInt
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_supportsNativeObject
,Clazz_extendedObjectMethods
,Clazz_callingStackTraces
,Clazz_clone
,Clazz_doubleToShort
,Clazz_innerFunctions
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
){
var $t$;
//var c$;
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "MinimizerInterface");
Clazz_declarePackage ("J.minimize");
Clazz_load (["J.api.MinimizerInterface"], "J.minimize.Minimizer", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.List", "J.i18n.GT", "J.minimize.MinAngle", "$.MinAtom", "$.MinBond", "$.MinTorsion", "$.MinimizationThread", "J.minimize.forcefield.ForceFieldMMFF", "$.ForceFieldUFF", "J.util.BSUtil", "$.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.viewer = null;
this.atoms = null;
this.bonds = null;
this.rawBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.bsMinFixed = null;
this.atomCount = 0;
this.bondCount = 0;
this.atomMap = null;
this.partialCharges = null;
this.steps = 50;
this.crit = 1e-3;
this.units = "kJ/mol";
this.pFF = null;
this.ff = "UFF";
this.bsTaint = null;
this.bsSelected = null;
this.bsAtoms = null;
this.bsFixedDefault = null;
this.bsFixed = null;
this.constraints = null;
this.isSilent = false;
this.constraintMap = null;
this.elemnoMax = 0;
this.$minimizationOn = false;
this.minimizationThread = null;
this.coordSaved = null;
Clazz_instantialize (this, arguments);
}, J.minimize, "Minimizer", null, J.api.MinimizerInterface);
Clazz_makeConstructor (c$, 
function () {
});
$_V(c$, "setProperty", 
function (propertyName, value) {
if (propertyName.equals ("ff")) {
if (!this.ff.equals (value)) {
this.setProperty ("clear", null);
this.ff = value;
}return;
}if (propertyName.equals ("cancel")) {
this.stopMinimization (false);
return;
}if (propertyName.equals ("clear")) {
if (this.minAtoms != null) {
this.stopMinimization (false);
this.clear ();
}return;
}if (propertyName.equals ("constraint")) {
this.addConstraint (value);
return;
}if (propertyName.equals ("fixed")) {
this.bsFixedDefault = value;
return;
}if (propertyName.equals ("stop")) {
this.stopMinimization (true);
return;
}if (propertyName.equals ("viewer")) {
this.viewer = value;
return;
}}, "~S,~O");
$_V(c$, "getProperty", 
function (propertyName, param) {
if (propertyName.equals ("log")) {
return (this.pFF == null ? "" : this.pFF.getLogData ());
}return null;
}, "~S,~N");
$_M(c$, "addConstraint", 
function (c) {
if (c == null) return;
var atoms = c[0];
var nAtoms = atoms[0];
if (nAtoms == 0) {
this.constraints = null;
return;
}if (this.constraints == null) {
this.constraints =  new JU.List ();
this.constraintMap =  new java.util.Hashtable ();
}if (atoms[1] > atoms[nAtoms]) {
JU.AU.swapInt (atoms, 1, nAtoms);
if (nAtoms == 4) JU.AU.swapInt (atoms, 2, 3);
}var id = J.util.Escape.eAI (atoms);
var c1 = this.constraintMap.get (id);
if (c1 != null) {
c1[2] = c[2];
return;
}this.constraintMap.put (id, c);
this.constraints.addLast (c);
}, "~A");
$_M(c$, "clear", 
function () {
this.setMinimizationOn (false);
this.atomCount = 0;
this.bondCount = 0;
this.atoms = null;
this.bonds = null;
this.rawBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.partialCharges = null;
this.coordSaved = null;
this.atomMap = null;
this.bsTaint = null;
this.bsAtoms = null;
this.bsFixed = null;
this.bsFixedDefault = null;
this.bsMinFixed = null;
this.bsSelected = null;
this.constraints = null;
this.constraintMap = null;
this.pFF = null;
});
$_V(c$, "minimize", 
function (steps, crit, bsSelected, bsFixed, haveFixed, forceSilent, ff) {
this.isSilent = (forceSilent || this.viewer.getBooleanProperty ("minimizationSilent"));
var val;
this.setEnergyUnits ();
if (steps == 2147483647) {
val = this.viewer.getParameter ("minimizationSteps");
if (val != null && Clazz_instanceOf (val, Integer)) steps = (val).intValue ();
}this.steps = steps;
if (!haveFixed && this.bsFixedDefault != null) bsFixed.and (this.bsFixedDefault);
if (crit <= 0) {
val = this.viewer.getParameter ("minimizationCriterion");
if (val != null && Clazz_instanceOf (val, Float)) crit = (val).floatValue ();
}this.crit = Math.max (crit, 0.0001);
if (this.$minimizationOn) return false;
var pFF0 = this.pFF;
this.getForceField (ff);
if (this.pFF == null) {
J.util.Logger.error (J.i18n.GT.o (J.i18n.GT._ ("Could not get class for force field {0}"), ff));
return false;
}J.util.Logger.info ("minimize: initializing " + this.pFF.name + " (steps = " + steps + " criterion = " + crit + ") ...");
if (bsSelected.cardinality () == 0) {
J.util.Logger.error (J.i18n.GT._ ("No atoms selected -- nothing to do!"));
return false;
}this.atoms = this.viewer.getModelSet ().atoms;
this.bsAtoms = J.util.BSUtil.copy (bsSelected);
for (var i = this.bsAtoms.nextSetBit (0); i >= 0; i = this.bsAtoms.nextSetBit (i + 1)) if (this.atoms[i].getElementNumber () == 0) this.bsAtoms.clear (i);

if (bsFixed != null) this.bsAtoms.or (bsFixed);
this.atomCount = this.bsAtoms.cardinality ();
var sameAtoms = J.util.BSUtil.areEqual (bsSelected, this.bsSelected);
this.bsSelected = bsSelected;
if (pFF0 != null && this.pFF !== pFF0) sameAtoms = false;
if (!sameAtoms) this.pFF.clear ();
if ((!sameAtoms || !J.util.BSUtil.areEqual (bsFixed, this.bsFixed)) && !this.setupMinimization ()) {
this.clear ();
return false;
}if (steps > 0) {
this.bsTaint = J.util.BSUtil.copy (this.bsAtoms);
J.util.BSUtil.andNot (this.bsTaint, bsFixed);
this.viewer.setTaintedAtoms (this.bsTaint, 2);
}if (bsFixed != null) this.bsFixed = bsFixed;
this.setAtomPositions ();
if (this.constraints != null) {
for (var i = this.constraints.size (); --i >= 0; ) {
var constraint = this.constraints.get (i);
var aList = constraint[0];
var minList = constraint[1];
var nAtoms = aList[0] = Math.abs (aList[0]);
for (var j = 1; j <= nAtoms; j++) {
if (steps <= 0 || !this.bsAtoms.get (aList[j])) {
aList[0] = -nAtoms;
break;
}minList[j - 1] = this.atomMap[aList[j]];
}
}
}this.pFF.setConstraints (this);
if (steps <= 0) this.getEnergyOnly ();
 else if (this.isSilent || !this.viewer.useMinimizationThread ()) this.minimizeWithoutThread ();
 else this.setMinimizationOn (true);
return true;
}, "~N,~N,JU.BS,JU.BS,~B,~B,~S");
$_M(c$, "setEnergyUnits", 
function () {
var s = this.viewer.getEnergyUnits ();
this.units = (s.equalsIgnoreCase ("kcal") ? "kcal" : "kJ");
});
$_M(c$, "setupMinimization", 
function () {
this.coordSaved = null;
this.atomMap =  Clazz_newIntArray (this.atoms.length, 0);
this.minAtoms =  new Array (this.atomCount);
this.elemnoMax = 0;
var bsElements =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) {
var atom = this.atoms[i];
this.atomMap[i] = pt;
var atomicNo = this.atoms[i].getElementNumber ();
this.elemnoMax = Math.max (this.elemnoMax, atomicNo);
bsElements.set (atomicNo);
this.minAtoms[pt] =  new J.minimize.MinAtom (pt, atom, [atom.x, atom.y, atom.z], this.atomCount);
this.minAtoms[pt].sType = atom.getAtomName ();
}
J.util.Logger.info (J.i18n.GT.i (J.i18n.GT._ ("{0} atoms will be minimized."), this.atomCount));
J.util.Logger.info ("minimize: getting bonds...");
this.bonds = this.viewer.modelSet.bonds;
this.rawBondCount = this.viewer.modelSet.bondCount;
this.getBonds ();
J.util.Logger.info ("minimize: getting angles...");
this.getAngles ();
J.util.Logger.info ("minimize: getting torsions...");
this.getTorsions ();
return this.setModel (bsElements);
});
$_M(c$, "setModel", 
function (bsElements) {
if (!this.pFF.setModel (bsElements, this.elemnoMax)) {
J.util.Logger.error (J.i18n.GT.o (J.i18n.GT._ ("could not setup force field {0}"), this.ff));
if (this.ff.equals ("MMFF")) {
this.getForceField ("UFF");
return this.setModel (bsElements);
}return false;
}return true;
}, "JU.BS");
$_M(c$, "setAtomPositions", 
function () {
for (var i = 0; i < this.atomCount; i++) this.minAtoms[i].set ();

this.bsMinFixed = null;
if (this.bsFixed != null) {
this.bsMinFixed =  new JU.BS ();
for (var i = this.bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = this.bsAtoms.nextSetBit (i + 1), pt++) if (this.bsFixed.get (i)) this.bsMinFixed.set (pt);

}});
$_M(c$, "getBonds", 
function () {
var bondInfo =  new JU.List ();
this.bondCount = 0;
var i1;
var i2;
for (var i = 0; i < this.rawBondCount; i++) {
var bond = this.bonds[i];
if (!this.bsAtoms.get (i1 = bond.getAtomIndex1 ()) || !this.bsAtoms.get (i2 = bond.getAtomIndex2 ())) continue;
if (i2 < i1) {
var ii = i1;
i1 = i2;
i2 = ii;
}var bondOrder = bond.getCovalentOrder ();
switch (bondOrder) {
case 1:
case 2:
case 3:
break;
case 515:
bondOrder = 5;
break;
default:
bondOrder = 1;
}
bondInfo.addLast ( new J.minimize.MinBond (i, this.bondCount++, this.atomMap[i1], this.atomMap[i2], bondOrder, 0, null));
}
this.minBonds =  new Array (this.bondCount);
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i] = bondInfo.get (i);
var atom1 = bond.data[0];
var atom2 = bond.data[1];
this.minAtoms[atom1].addBond (bond, atom2);
this.minAtoms[atom2].addBond (bond, atom1);
}
for (var i = 0; i < this.atomCount; i++) this.minAtoms[i].getBondedAtomIndexes ();

});
$_M(c$, "getAngles", 
function () {
var vAngles =  new JU.List ();
var atomList;
var ic;
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i];
var ia = bond.data[0];
var ib = bond.data[1];
if (this.minAtoms[ib].nBonds > 1) {
atomList = this.minAtoms[ib].getBondedAtomIndexes ();
for (var j = atomList.length; --j >= 0; ) if ((ic = atomList[j]) > ia) {
vAngles.addLast ( new J.minimize.MinAngle ([ia, ib, ic, i, this.minAtoms[ib].getBondIndex (j)]));
this.minAtoms[ia].bsVdw.clear (ic);
}
}if (this.minAtoms[ia].nBonds > 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = atomList.length; --j >= 0; ) if ((ic = atomList[j]) < ib && ic > ia) {
vAngles.addLast ( new J.minimize.MinAngle ([ic, ia, ib, this.minAtoms[ia].getBondIndex (j), i]));
this.minAtoms[ic].bsVdw.clear (ib);
}
}}
this.minAngles = vAngles.toArray ( new Array (vAngles.size ()));
J.util.Logger.info (this.minAngles.length + " angles");
});
$_M(c$, "getTorsions", 
function () {
var vTorsions =  new JU.List ();
var id;
for (var i = this.minAngles.length; --i >= 0; ) {
var angle = this.minAngles[i].data;
var ia = angle[0];
var ib = angle[1];
var ic = angle[2];
var atomList;
if (ic > ib && this.minAtoms[ic].nBonds > 1) {
atomList = this.minAtoms[ic].getBondedAtomIndexes ();
for (var j = 0; j < atomList.length; j++) {
id = atomList[j];
if (id != ia && id != ib) {
vTorsions.addLast ( new J.minimize.MinTorsion ([ia, ib, ic, id, angle[3], angle[4], this.minAtoms[ic].getBondIndex (j)]));
this.minAtoms[Math.min (ia, id)].bs14.set (Math.max (ia, id));
}}
}if (ia > ib && this.minAtoms[ia].nBonds != 1) {
atomList = this.minAtoms[ia].getBondedAtomIndexes ();
for (var j = 0; j < atomList.length; j++) {
id = atomList[j];
if (id != ic && id != ib) {
vTorsions.addLast ( new J.minimize.MinTorsion ([ic, ib, ia, id, angle[4], angle[3], this.minAtoms[ia].getBondIndex (j)]));
this.minAtoms[Math.min (ic, id)].bs14.set (Math.max (ic, id));
}}
}}
this.minTorsions = vTorsions.toArray ( new Array (vTorsions.size ()));
J.util.Logger.info (this.minTorsions.length + " torsions");
});
$_M(c$, "getForceField", 
function (ff) {
if (ff.startsWith ("MMFF")) ff = "MMFF";
if (this.pFF == null || !ff.equals (this.ff)) {
if (ff.equals ("UFF")) {
this.pFF =  new J.minimize.forcefield.ForceFieldUFF (this);
} else if (ff.equals ("MMFF")) {
this.pFF =  new J.minimize.forcefield.ForceFieldMMFF (this);
} else {
this.pFF =  new J.minimize.forcefield.ForceFieldUFF (this);
ff = "UFF";
}this.ff = ff;
this.viewer.setStringProperty ("_minimizationForceField", ff);
}return this.pFF;
}, "~S");
$_V(c$, "minimizationOn", 
function () {
return this.$minimizationOn;
});
$_M(c$, "setMinimizationOn", 
function (minimizationOn) {
this.$minimizationOn = minimizationOn;
if (!minimizationOn) {
if (this.minimizationThread != null) {
this.minimizationThread = null;
}return;
}if (this.minimizationThread == null) {
this.minimizationThread =  new J.minimize.MinimizationThread ();
this.minimizationThread.setManager (this, this.viewer, null);
this.minimizationThread.start ();
}}, "~B");
$_M(c$, "getEnergyOnly", 
function () {
if (this.pFF == null || this.viewer == null) return;
this.pFF.steepestDescentInitialize (this.steps, this.crit);
this.viewer.setFloatProperty ("_minimizationEnergyDiff", 0);
this.reportEnergy ();
this.viewer.setStringProperty ("_minimizationStatus", "calculate");
this.viewer.notifyMinimizationStatus ();
});
$_M(c$, "reportEnergy", 
function () {
this.viewer.setFloatProperty ("_minimizationEnergy", this.pFF.toUserUnits (this.pFF.getEnergy ()));
});
$_V(c$, "startMinimization", 
function () {
try {
J.util.Logger.info ("minimizer: startMinimization");
this.viewer.setIntProperty ("_minimizationStep", 0);
this.viewer.setStringProperty ("_minimizationStatus", "starting");
this.viewer.setFloatProperty ("_minimizationEnergy", 0);
this.viewer.setFloatProperty ("_minimizationEnergyDiff", 0);
this.viewer.notifyMinimizationStatus ();
this.viewer.saveCoordinates ("minimize", this.bsTaint);
this.pFF.steepestDescentInitialize (this.steps, this.crit);
this.reportEnergy ();
this.saveCoordinates ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
J.util.Logger.error ("minimization error viewer=" + this.viewer + " pFF = " + this.pFF);
return false;
} else {
throw e;
}
}
this.$minimizationOn = true;
return true;
});
$_V(c$, "stepMinimization", 
function () {
if (!this.$minimizationOn) return false;
var doRefresh = (!this.isSilent && this.viewer.getBooleanProperty ("minimizationRefresh"));
this.viewer.setStringProperty ("_minimizationStatus", "running");
var going = this.pFF.steepestDescentTakeNSteps (1);
var currentStep = this.pFF.getCurrentStep ();
this.viewer.setIntProperty ("_minimizationStep", currentStep);
this.reportEnergy ();
this.viewer.setFloatProperty ("_minimizationEnergyDiff", this.pFF.toUserUnits (this.pFF.getEnergyDiff ()));
this.viewer.notifyMinimizationStatus ();
if (doRefresh) {
this.updateAtomXYZ ();
this.viewer.refresh (3, "minimization step " + currentStep);
}return going;
});
$_V(c$, "endMinimization", 
function () {
this.updateAtomXYZ ();
this.setMinimizationOn (false);
var failed = this.pFF.detectExplosion ();
if (failed) this.restoreCoordinates ();
this.viewer.setIntProperty ("_minimizationStep", this.pFF.getCurrentStep ());
this.reportEnergy ();
this.viewer.setStringProperty ("_minimizationStatus", (failed ? "failed" : "done"));
this.viewer.notifyMinimizationStatus ();
this.viewer.refresh (3, "Minimizer:done" + (failed ? " EXPLODED" : "OK"));
J.util.Logger.info ("minimizer: endMinimization");
});
$_M(c$, "saveCoordinates", 
function () {
if (this.coordSaved == null) this.coordSaved =  Clazz_newDoubleArray (this.atomCount, 3, 0);
for (var i = 0; i < this.atomCount; i++) for (var j = 0; j < 3; j++) this.coordSaved[i][j] = this.minAtoms[i].coord[j];


});
$_M(c$, "restoreCoordinates", 
function () {
if (this.coordSaved == null) return;
for (var i = 0; i < this.atomCount; i++) for (var j = 0; j < 3; j++) this.minAtoms[i].coord[j] = this.coordSaved[i][j];


this.updateAtomXYZ ();
});
$_M(c$, "stopMinimization", 
function (coordAreOK) {
if (!this.$minimizationOn) return;
this.setMinimizationOn (false);
if (coordAreOK) this.endMinimization ();
 else this.restoreCoordinates ();
}, "~B");
$_M(c$, "updateAtomXYZ", 
function () {
if (this.steps <= 0) return;
for (var i = 0; i < this.atomCount; i++) {
var minAtom = this.minAtoms[i];
var atom = minAtom.atom;
atom.x = minAtom.coord[0];
atom.y = minAtom.coord[1];
atom.z = minAtom.coord[2];
}
this.viewer.refreshMeasures (false);
});
$_M(c$, "minimizeWithoutThread", 
function () {
if (!this.startMinimization ()) return;
while (this.stepMinimization ()) {
}
this.endMinimization ();
});
$_M(c$, "report", 
function (msg, isEcho) {
if (this.isSilent) J.util.Logger.info (msg);
 else if (isEcho) this.viewer.showString (msg, false);
 else this.viewer.scriptEcho (msg);
}, "~S,~B");
$_V(c$, "calculatePartialCharges", 
function (bonds, bondCount, atoms, bsAtoms) {
var ff =  new J.minimize.forcefield.ForceFieldMMFF (this);
ff.setArrays (atoms, bsAtoms, bonds, bondCount, true, true);
this.viewer.setAtomProperty (bsAtoms, 1087375361, 0, 0, null, null, ff.getAtomTypeDescriptions ());
this.viewer.setAtomProperty (bsAtoms, 1112541196, 0, 0, null, ff.getPartialCharges (), null);
}, "~A,~N,~A,JU.BS");
});
Clazz_declarePackage ("J.minimize");
c$ = Clazz_decorateAsClass (function () {
this.data = null;
this.type = 0;
this.key = null;
this.ddata = null;
Clazz_instantialize (this, arguments);
}, J.minimize, "MinObject");
$_V(c$, "toString", 
function () {
return this.type + " " + this.data[0] + "," + this.data[1] + (this.data.length > 2 ? "," + this.data[2] + "," + this.data[3] : "") + " " + J.minimize.MinObject.decodeKey (this.key);
});
c$.getKey = $_M(c$, "getKey", 
function (type, a1, a2, a3, a4) {
return Integer.$valueOf ((((((((a4 << 7) + a3) << 7) + a2) << 7) + a1) << 4) + type);
}, "~N,~N,~N,~N,~N");
c$.decodeKey = $_M(c$, "decodeKey", 
function (key) {
if (key == null) return null;
var i = key.intValue ();
var type = i & 0xF;
i >>= 4;
var a = i & 0x7F;
i >>= 7;
var b = i & 0x7F;
i >>= 7;
var c = i & 0x7F;
i >>= 7;
var d = i & 0x7F;
return type + ": " + (a < 10 ? "  " : " ") + a + (b < 10 ? "  " : " ") + b + (c < 10 ? "  " : " ") + c + (d < 10 ? "  " : " ") + d;
}, "Integer");
Clazz_declarePackage ("J.minimize");
Clazz_load (["J.minimize.MinObject"], "J.minimize.MinAngle", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.sbType = 0;
this.sbKey = null;
this.ka = 0;
this.theta0 = NaN;
Clazz_instantialize (this, arguments);
}, J.minimize, "MinAngle", J.minimize.MinObject);
Clazz_makeConstructor (c$, 
function (data) {
Clazz_superConstructor (this, J.minimize.MinAngle, []);
this.data = data;
}, "~A");
});
Clazz_declarePackage ("J.minimize");
Clazz_load (["JU.BS", "$.List"], "J.minimize.MinAtom", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.index = 0;
this.sType = null;
this.atom = null;
this.ffAtomType = null;
this.ffType = 0;
this.vdwKey = null;
this.coord = null;
this.force = null;
this.bonds = null;
this.nBonds = 0;
this.hCount = 0;
this.partialCharge = 0;
this.bsVdw = null;
this.bs14 = null;
this.bondedAtoms = null;
Clazz_instantialize (this, arguments);
}, J.minimize, "MinAtom");
Clazz_prepareFields (c$, function () {
this.coord =  Clazz_newDoubleArray (3, 0);
this.force =  Clazz_newDoubleArray (3, 0);
this.bonds =  new JU.List ();
this.bsVdw =  new JU.BS ();
this.bs14 =  new JU.BS ();
});
$_V(c$, "toString", 
function () {
return "#" + this.index + " " + this.sType;
});
Clazz_makeConstructor (c$, 
function (index, atom, coord, atomCount) {
this.index = index;
this.atom = atom;
this.coord = coord;
this.bsVdw.setBits (index + 1, atomCount);
this.bsVdw.clear (index);
this.hCount = atom.getCovalentHydrogenCount ();
}, "~N,J.modelset.Atom,~A,~N");
$_M(c$, "set", 
function () {
this.coord[0] = this.atom.x;
this.coord[1] = this.atom.y;
this.coord[2] = this.atom.z;
});
$_M(c$, "getBondTo", 
function (iAtom) {
this.getBondedAtomIndexes ();
for (var i = 0; i < this.nBonds; i++) if (this.bondedAtoms[i] == iAtom) return this.bonds.get (i);

return null;
}, "~N");
$_M(c$, "getBondedAtomIndexes", 
function () {
if (this.bondedAtoms == null) {
this.bondedAtoms =  Clazz_newIntArray (this.nBonds, 0);
for (var i = this.nBonds; --i >= 0; ) this.bondedAtoms[i] = this.bonds.get (i).getOtherAtom (this.index);

}return this.bondedAtoms;
});
$_M(c$, "getIdentity", 
function () {
return this.atom.getInfo ();
});
$_M(c$, "addBond", 
function (bond, i) {
this.bonds.addLast (bond);
this.nBonds++;
this.bsVdw.clear (i);
}, "J.minimize.MinBond,~N");
$_M(c$, "getBondIndex", 
function (j) {
return this.bonds.get (j).index;
}, "~N");
c$.isLinear = $_M(c$, "isLinear", 
function (minAtom) {
switch (minAtom.ffType) {
case 4:
case 53:
case 61:
return true;
}
return false;
}, "J.minimize.MinAtom");
});
Clazz_declarePackage ("J.minimize");
Clazz_load (["J.minimize.MinObject"], "J.minimize.MinBond", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.rawIndex = 0;
this.index = 0;
this.order = 0;
this.isAromatic = false;
this.isAmide = false;
Clazz_instantialize (this, arguments);
}, J.minimize, "MinBond", J.minimize.MinObject);
Clazz_makeConstructor (c$, 
function (rawIndex, index, atomIndex1, atomIndex2, order, type, key) {
Clazz_superConstructor (this, J.minimize.MinBond, []);
this.rawIndex = rawIndex;
this.index = index;
this.type = type;
this.data = [atomIndex1, atomIndex2];
this.order = order;
this.key = key;
}, "~N,~N,~N,~N,~N,~N,Integer");
$_M(c$, "getOtherAtom", 
function (index) {
return this.data[this.data[0] == index ? 1 : 0];
}, "~N");
});
Clazz_declarePackage ("J.minimize");
Clazz_load (["J.minimize.MinObject"], "J.minimize.MinTorsion", null, function () {
c$ = Clazz_declareType (J.minimize, "MinTorsion", J.minimize.MinObject);
Clazz_makeConstructor (c$, 
function (data) {
Clazz_superConstructor (this, J.minimize.MinTorsion, []);
this.data = data;
}, "~A");
});
Clazz_declarePackage ("J.minimize");
Clazz_load (null, "J.minimize.Util", ["java.lang.Double", "java.util.Random"], function () {
c$ = Clazz_declareType (J.minimize, "Util");
c$.sub = $_M(c$, "sub", 
function (a, b, result) {
result.set (a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}, "~A,~A,JU.V3d");
c$.putCoord = $_M(c$, "putCoord", 
function (v, c) {
c[0] = v.x;
c[1] = v.y;
c[2] = v.z;
}, "JU.V3d,~A");
c$.distance2 = $_M(c$, "distance2", 
function (a, b) {
var dx = a[0] - b[0];
var dy = a[1] - b[1];
var dz = a[2] - b[2];
return (dx * dx + dy * dy + dz * dz);
}, "~A,~A");
c$.distance2V = $_M(c$, "distance2V", 
function (a, b) {
var dx = a.x - b.x;
var dy = a.y - b.y;
var dz = a.z - b.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.V3d,JU.V3d");
c$.getAngleRadiansABC = $_M(c$, "getAngleRadiansABC", 
function (a, b, c) {
var ab2 = J.minimize.Util.distance2 (a, b);
var bc2 = J.minimize.Util.distance2 (b, c);
var ac2 = J.minimize.Util.distance2 (a, c);
return (J.minimize.Util.isNearZero2 (ab2, 1e-3) || J.minimize.Util.isNearZero2 (bc2, 1e-3) ? 0 : Math.acos ((ab2 + bc2 - ac2) / 2 / Math.sqrt (ab2 * bc2)));
}, "~A,~A,~A");
c$.isApprox = $_M(c$, "isApprox", 
function (a, b, precision) {
return (J.minimize.Util.distance2V (a, b) <= precision * precision * Math.min (a.lengthSquared (), b.lengthSquared ()));
}, "JU.V3d,JU.V3d,~N");
c$.canBeSquared = $_M(c$, "canBeSquared", 
function (x) {
if (x == 0) return true;
return ((x = Math.abs (x)) < 1.0E150 && x > 1.0E-150);
}, "~N");
c$.isNegligible = $_M(c$, "isNegligible", 
function (a, b) {
return J.minimize.Util.isNegligible3 (a, b, 1e-11);
}, "~N,~N");
c$.isFinite = $_M(c$, "isFinite", 
function (a) {
return !Double.isInfinite (a) && !Double.isNaN (a);
}, "~N");
c$.isNegligible3 = $_M(c$, "isNegligible3", 
function (a, b, precision) {
return (Math.abs (a) <= precision * Math.abs (b));
}, "~N,~N,~N");
c$.isNear = $_M(c$, "isNear", 
function (a, b) {
return J.minimize.Util.isNear3 (a, b, 2e-6);
}, "~N,~N");
c$.isNear3 = $_M(c$, "isNear3", 
function (a, b, epsilon) {
return (Math.abs (a - b) < epsilon);
}, "~N,~N,~N");
c$.isNearZero = $_M(c$, "isNearZero", 
function (a) {
return J.minimize.Util.isNearZero2 (a, 2e-6);
}, "~N");
c$.isNearZero2 = $_M(c$, "isNearZero2", 
function (a, epsilon) {
return (Math.abs (a) < epsilon);
}, "~N,~N");
c$.canBeNormalized = $_M(c$, "canBeNormalized", 
function (a) {
if (a.x == 0.0 && a.y == 0.0 && a.z == 0.0) return false;
return (J.minimize.Util.canBeSquared (a.x) && J.minimize.Util.canBeSquared (a.y) && J.minimize.Util.canBeSquared (a.z));
}, "JU.V3d");
c$.pointPlaneAngleRadians = $_M(c$, "pointPlaneAngleRadians", 
function (a, b, c, d, v1, v2, norm, fixTheta) {
v1.sub2 (b, c);
v2.sub2 (b, d);
norm.cross (v1, v2);
v2.add (v1);
v1.sub2 (b, a);
var angleA_CD = (fixTheta ? J.minimize.Util.vectorAngleRadians (v2, v1) : 3.141592653589793);
var angleNorm = J.minimize.Util.vectorAngleRadians (norm, v1);
if (angleNorm > 1.5707963267948966) angleNorm = 3.141592653589793 - angleNorm;
var val = 1.5707963267948966 + (angleA_CD > 1.5707963267948966 ? -angleNorm : angleNorm);
return val;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,~B");
c$.vectorAngleRadians = $_M(c$, "vectorAngleRadians", 
function (v1, v2) {
var l1 = v1.length ();
var l2 = v2.length ();
return (J.minimize.Util.isNearZero (l1) || J.minimize.Util.isNearZero (l2) ? 0 : Math.acos (v1.dot (v2) / (l1 * l2)));
}, "JU.V3d,JU.V3d");
c$.getTorsionAngleRadians = $_M(c$, "getTorsionAngleRadians", 
function (a, b, c, d, r1, r2, r3) {
J.minimize.Util.sub (b, a, r1);
J.minimize.Util.sub (c, b, r2);
r2.normalize ();
r1.cross (r1, r2);
J.minimize.Util.sub (d, c, r3);
r3.cross (r2, r3);
var p1dotp2 = r1.dot (r3);
r1.cross (r3, r1);
var theta = Math.atan2 (-r2.dot (r1), p1dotp2);
return theta;
}, "~A,~A,~A,~A,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndDistance = $_M(c$, "restorativeForceAndDistance", 
function (a, b, vab) {
vab.sub2 (a, b);
var rab = vab.length ();
if (rab < 0.1) {
J.minimize.Util.randomizeUnitVector (vab);
rab = 0.1;
}vab.normalize ();
a.setT (vab);
a.scale (-1);
b.setT (vab);
return rab;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.randomizeUnitVector = $_M(c$, "randomizeUnitVector", 
function (v) {
var ptr =  new java.util.Random ();
var l;
do {
v.set (ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5, ptr.nextFloat () - 0.5);
l = v.lengthSquared ();
} while ((l > 1.0) || (l < 1e-4));
v.normalize ();
}, "JU.V3d");
c$.restorativeForceAndAngleRadians = $_M(c$, "restorativeForceAndAngleRadians", 
function (i, j, k) {
i.sub (j);
k.sub (j);
var length1 = i.length ();
var length2 = k.length ();
if (J.minimize.Util.isNearZero (length1) || J.minimize.Util.isNearZero (length2)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}var inverse_length_v1 = 1.0 / length1;
var inverse_length_v2 = 1.0 / length2;
i.scale (inverse_length_v1);
k.scale (inverse_length_v2);
j.cross (i, k);
var length = j.length ();
if (J.minimize.Util.isNearZero (length)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
return 0.0;
}j.scale (1 / length);
var costheta = i.dot (k);
var theta;
if (costheta > 1.0) {
theta = 0.0;
costheta = 1.0;
} else if (costheta < -1.0) {
theta = 3.141592653589793;
costheta = -1.0;
} else {
theta = Math.acos (costheta);
}i.cross (i, j);
i.normalize ();
j.cross (k, j);
j.normalize ();
i.scale (-inverse_length_v1);
j.scale (inverse_length_v2);
k.setT (j);
j.add (i);
j.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndOutOfPlaneAngleRadians = $_M(c$, "restorativeForceAndOutOfPlaneAngleRadians", 
function (i, j, k, l, an, bn, cn) {
i.sub2 (i, j);
k.sub2 (k, j);
l.sub2 (l, j);
var length_ji = i.length ();
var length_jk = k.length ();
var length_jl = l.length ();
if (J.minimize.Util.isNearZero (length_ji) || J.minimize.Util.isNearZero (length_jk) || J.minimize.Util.isNearZero (length_jl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}i.normalize ();
k.normalize ();
l.normalize ();
var cos_theta = i.dot (k);
var theta = Math.acos (cos_theta);
if (J.minimize.Util.isNearZero (theta) || J.minimize.Util.isNearZero (Math.abs (theta - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var csc_theta = 1 / Math.sin (theta);
an.cross (i, k);
bn.cross (k, l);
cn.cross (l, i);
var sin_dl = an.dot (l) * csc_theta;
var dl = Math.asin (sin_dl);
var cos_dl = Math.cos (dl);
if (cos_dl < 0.0001 || J.minimize.Util.isNearZero (dl) || J.minimize.Util.isNearZero (Math.abs (dl - 3.141592653589793))) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return dl;
}l.scaleAdd (-sin_dl / csc_theta, l, an);
l.scale (csc_theta / length_jl);
j.setT (i);
i.scaleAdd (-cos_theta, k, i);
i.scaleAdd (-sin_dl * csc_theta, i, bn);
i.scale (csc_theta / length_ji);
k.scaleAdd (-cos_theta, j, k);
k.scaleAdd (-sin_dl * csc_theta, k, cn);
k.scale (csc_theta / length_jk);
j.setT (i);
j.add (k);
j.add (l);
j.scale (-1);
return dl;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d,JU.V3d");
c$.restorativeForceAndTorsionAngleRadians = $_M(c$, "restorativeForceAndTorsionAngleRadians", 
function (i, j, k, l) {
i.sub2 (j, i);
j.sub2 (k, j);
k.sub2 (l, k);
var len_ij = i.length ();
var len_jk = j.length ();
var len_kl = k.length ();
if (J.minimize.Util.isNearZero (len_ij) || J.minimize.Util.isNearZero (len_jk) || J.minimize.Util.isNearZero (len_kl)) {
i.set (0, 0, 0);
j.set (0, 0, 0);
k.set (0, 0, 0);
l.set (0, 0, 0);
return 0.0;
}var ang = J.minimize.Util.vectorAngleRadians (i, j);
var sin_j = Math.sin (ang);
var cos_j = Math.cos (ang);
ang = J.minimize.Util.vectorAngleRadians (j, k);
var sin_k = Math.sin (ang);
var cos_k = Math.cos (ang);
i.normalize ();
j.normalize ();
k.normalize ();
i.cross (i, j);
l.cross (j, k);
k.cross (i, l);
var theta = -Math.atan2 (k.dot (j), i.dot (l));
i.scale (1. / len_ij / sin_j / sin_j);
l.scale (-1.0 / len_kl / sin_k / sin_k);
j.setT (i);
j.scale (-len_ij / len_jk * cos_j - 1.);
k.setT (l);
k.scale (-len_kl / len_jk * cos_k);
j.sub (k);
k.setT (i);
k.add (j);
k.add (l);
k.scale (-1);
return theta;
}, "JU.V3d,JU.V3d,JU.V3d,JU.V3d");
Clazz_defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"DEG_TO_RAD", (0.017453292519943295),
"max_squarable_double", 1e150,
"min_squarable_double", 1e-150);
});
Clazz_declarePackage ("J.minimize.forcefield");
c$ = Clazz_decorateAsClass (function () {
this.elemNo = 0;
this.descr = null;
this.smartsCode = null;
this.mmType = 0;
this.hType = 0;
this.formalCharge = 0;
this.fcadj = 0;
this.sbmb = false;
this.arom = false;
this.pilp = false;
this.mltb = 0;
this.val = 0;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "AtomType");
Clazz_makeConstructor (c$, 
function (elemNo, mmType, hType, formalCharge, val, descr, smartsCode) {
this.elemNo = elemNo;
this.mmType = mmType;
this.hType = hType;
this.formalCharge = formalCharge;
this.val = val;
this.descr = descr;
this.smartsCode = smartsCode;
}, "~N,~N,~N,~N,~N,~S,~S");
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (null, "J.minimize.forcefield.ForceField", ["java.lang.Float", "J.io.JmolBinary", "J.minimize.Util", "J.util.Logger", "$.Txt", "J.viewer.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.name = null;
this.calc = null;
this.criterion = 0;
this.e0 = 0;
this.dE = 0;
this.currentStep = 0;
this.stepMax = 0;
this.coordSaved = null;
this.minAtomCount = 0;
this.minBondCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.bsFixed = null;
this.minimizer = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "ForceField");
$_M(c$, "setModelFields", 
function () {
this.minAtoms = this.minimizer.minAtoms;
this.minBonds = this.minimizer.minBonds;
this.minAngles = this.minimizer.minAngles;
this.minTorsions = this.minimizer.minTorsions;
this.bsFixed = this.minimizer.bsMinFixed;
this.minAtomCount = this.minAtoms.length;
this.minBondCount = this.minBonds.length;
});
$_M(c$, "setConstraints", 
function (m) {
this.bsFixed = m.bsMinFixed;
this.calc.setConstraints (m.constraints);
this.coordSaved = null;
}, "J.minimize.Minimizer");
$_M(c$, "steepestDescentInitialize", 
function (stepMax, criterion) {
this.stepMax = stepMax;
this.criterion = criterion / this.toUserUnits (1);
this.currentStep = 0;
this.clearForces ();
this.calc.setLoggingEnabled (true);
this.calc.setLoggingEnabled (stepMax == 0 || J.util.Logger.isActiveLevel (6));
var s = this.name + " " + this.calc.getDebugHeader (-1) + "Jmol Minimization Version " + J.viewer.Viewer.getJmolVersion () + "\n";
this.calc.appendLogData (s);
J.util.Logger.info (s);
this.calc.getConstraintList ();
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("S T E E P E S T   D E S C E N T"));
this.dE = 0;
this.calc.setPreliminary (stepMax > 0);
this.e0 = this.energyFull (false, false);
s = J.util.Txt.sprintf (" Initial " + this.name + " E = %10.3f " + this.minimizer.units + " criterion = %8.6f max steps = " + stepMax, "ff", [Float.$valueOf (this.toUserUnits (this.e0)), Float.$valueOf (this.toUserUnits (criterion))]);
this.minimizer.report (s, false);
this.calc.appendLogData (s);
}, "~N,~N");
$_M(c$, "clearForces", 
function () {
for (var i = 0; i < this.minAtomCount; i++) this.minAtoms[i].force[0] = this.minAtoms[i].force[1] = this.minAtoms[i].force[2] = 0;

});
$_M(c$, "steepestDescentTakeNSteps", 
function (n) {
if (this.stepMax == 0) return false;
var isPreliminary = true;
for (var iStep = 1; iStep <= n; iStep++) {
this.currentStep++;
this.calc.setSilent (true);
for (var i = 0; i < this.minAtomCount; i++) if (this.bsFixed == null || !this.bsFixed.get (i)) this.setForcesUsingNumericalDerivative (this.minAtoms[i], 1);

this.linearSearch ();
this.calc.setSilent (false);
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("S T E P    " + this.currentStep));
var e1 = this.energyFull (false, false);
this.dE = e1 - this.e0;
var done = J.minimize.Util.isNear3 (e1, this.e0, this.criterion);
if (done || this.currentStep % 10 == 0 || this.stepMax <= this.currentStep) {
var s = J.util.Txt.sprintf (this.name + " Step %-4d E = %10.6f    dE = %8.6f ", "Fi", [[e1, (this.dE), this.criterion], Integer.$valueOf (this.currentStep)]);
this.minimizer.report (s, false);
this.calc.appendLogData (s);
}this.e0 = e1;
if (done || this.stepMax <= this.currentStep) {
if (this.calc.loggingEnabled) this.calc.appendLogData (this.calc.getAtomList ("F I N A L  G E O M E T R Y"));
if (done) {
var s = J.util.Txt.formatStringF ("\n    " + this.name + " STEEPEST DESCENT HAS CONVERGED: E = %8.5f " + this.minimizer.units + " after " + this.currentStep + " steps", "f", this.toUserUnits (e1));
this.calc.appendLogData (s);
this.minimizer.report (s, true);
J.util.Logger.info (s);
}return false;
}if (isPreliminary && this.getNormalizedDE () >= 2) {
this.calc.setPreliminary (isPreliminary = false);
this.e0 = this.energyFull (false, false);
}}
return true;
}, "~N");
$_M(c$, "getEnergies", 
function (terms, gradients) {
if ((terms & 1) != 0) return this.energyFull (gradients, true);
var e = 0.0;
if ((terms & 2) != 0) e += this.energyBond (gradients);
if ((terms & 4) != 0) e += this.energyAngle (gradients);
if ((terms & 8) != 0) e += this.energyStretchBend (gradients);
if ((terms & 32) != 0) e += this.energyOOP (gradients);
if ((terms & 16) != 0) e += this.energyTorsion (gradients);
if ((terms & 64) != 0) e += this.energyVDW (gradients);
if ((terms & 128) != 0) e += this.energyES (gradients);
return e;
}, "~N,~B");
$_M(c$, "setForcesUsingNumericalDerivative", 
function (atom, terms) {
var delta = 1.0e-5;
atom.force[0] = -this.getDE (atom, terms, 0, delta);
atom.force[1] = -this.getDE (atom, terms, 1, delta);
atom.force[2] = -this.getDE (atom, terms, 2, delta);
return;
}, "J.minimize.MinAtom,~N");
$_M(c$, "getDE", 
function (atom, terms, i, delta) {
atom.coord[i] += delta;
var e = this.getEnergies (terms, false);
atom.coord[i] -= delta;
return (e - this.e0) / delta;
}, "J.minimize.MinAtom,~N,~N,~N");
$_M(c$, "energyFull", 
function (gradients, isSilent) {
var energy;
if (gradients) this.clearForces ();
energy = this.energyBond (gradients) + this.energyAngle (gradients) + this.energyTorsion (gradients) + this.energyStretchBend (gradients) + this.energyOOP (gradients) + this.energyVDW (gradients) + this.energyES (gradients);
if (!isSilent && this.calc.loggingEnabled) this.calc.appendLogData (J.util.Txt.sprintf ("\nTOTAL %s ENERGY = %8.3f %s/mol\n", "sfs", [this.name, Float.$valueOf (this.toUserUnits (energy)), this.minimizer.units]));
return energy;
}, "~B,~B");
$_M(c$, "energyStretchBend", 
function (gradients) {
return this.calc.energyStretchBend (gradients);
}, "~B");
$_M(c$, "energyBond", 
function (gradients) {
return this.calc.energyBond (gradients);
}, "~B");
$_M(c$, "energyAngle", 
function (gradients) {
return this.calc.energyAngle (gradients);
}, "~B");
$_M(c$, "energyTorsion", 
function (gradients) {
return this.calc.energyTorsion (gradients);
}, "~B");
$_M(c$, "energyOOP", 
function (gradients) {
return this.calc.energyOOP (gradients);
}, "~B");
$_M(c$, "energyVDW", 
function (gradients) {
return this.calc.energyVDW (gradients);
}, "~B");
$_M(c$, "energyES", 
function (gradients) {
return this.calc.energyES (gradients);
}, "~B");
$_M(c$, "linearSearch", 
function () {
var step = 0.23;
var trustRadius = 0.3;
var trustRadius2 = trustRadius * trustRadius;
var e1 = this.energyFull (false, true);
for (var iStep = 0; iStep < 10; iStep++) {
this.saveCoordinates ();
for (var i = 0; i < this.minAtomCount; ++i) if (this.bsFixed == null || !this.bsFixed.get (i)) {
var force = this.minAtoms[i].force;
var coord = this.minAtoms[i].coord;
var f2 = (force[0] * force[0] + force[1] * force[1] + force[2] * force[2]);
if (f2 > trustRadius2 / step / step) {
f2 = trustRadius / Math.sqrt (f2) / step;
force[0] *= f2;
force[1] *= f2;
force[2] *= f2;
}for (var j = 0; j < 3; ++j) {
if (J.minimize.Util.isFinite (force[j])) {
var tempStep = force[j] * step;
if (tempStep > trustRadius) coord[j] += trustRadius;
 else if (tempStep < -trustRadius) coord[j] -= trustRadius;
 else coord[j] += tempStep;
}}
}
var e2 = this.energyFull (false, true);
if (J.minimize.Util.isNear3 (e2, e1, 1.0e-3)) break;
if (e2 > e1) {
step *= 0.1;
this.restoreCoordinates ();
} else if (e2 < e1) {
e1 = e2;
step *= 2.15;
if (step > 1.0) step = 1.0;
}}
});
$_M(c$, "saveCoordinates", 
function () {
if (this.coordSaved == null) this.coordSaved =  Clazz_newDoubleArray (this.minAtomCount, 3, 0);
for (var i = 0; i < this.minAtomCount; i++) for (var j = 0; j < 3; j++) this.coordSaved[i][j] = this.minAtoms[i].coord[j];


});
$_M(c$, "restoreCoordinates", 
function () {
for (var i = 0; i < this.minAtomCount; i++) for (var j = 0; j < 3; j++) this.minAtoms[i].coord[j] = this.coordSaved[i][j];


});
$_M(c$, "detectExplosion", 
function () {
for (var i = 0; i < this.minAtomCount; i++) {
var atom = this.minAtoms[i];
for (var j = 0; j < 3; j++) if (!J.minimize.Util.isFinite (atom.coord[j])) return true;

}
for (var i = 0; i < this.minBondCount; i++) {
var bond = this.minBonds[i];
if (J.minimize.Util.distance2 (this.minAtoms[bond.data[0]].coord, this.minAtoms[bond.data[1]].coord) > 900.0) return true;
}
return false;
});
$_M(c$, "getCurrentStep", 
function () {
return this.currentStep;
});
$_M(c$, "getEnergy", 
function () {
return this.e0;
});
$_M(c$, "getAtomList", 
function (title) {
return this.calc.getAtomList (title);
}, "~S");
$_M(c$, "getEnergyDiff", 
function () {
return this.dE;
});
$_M(c$, "getLogData", 
function () {
return this.calc.getLogData ();
});
$_M(c$, "getNormalizedDE", 
function () {
return Math.abs (this.dE / this.criterion);
});
$_M(c$, "toUserUnits", 
function (energy) {
return this.toUnits (energy, this.calc.getUnits ());
}, "~N");
$_M(c$, "toUnits", 
function (energy, units) {
return (units.equalsIgnoreCase (this.minimizer.units) ? energy : energy * (this.minimizer.units.equals ("kJ") ? 4.1868 : 0.23884589662749595));
}, "~N,~S");
$_M(c$, "log", 
function (s) {
this.calc.appendLogData (s);
}, "~S");
$_M(c$, "getBufferedReader", 
function (resourceName) {
return J.io.JmolBinary.getBufferedReaderForResource (this.minimizer.viewer, this, "J/minimize/forcefield/", "data/" + resourceName);
}, "~S");
Clazz_defineStatics (c$,
"ENERGY", (1),
"EBOND", (2),
"EANGLE", (4),
"ESTRBND", (8),
"ETORSION", (16),
"EOOP", (32),
"EVDW", (64),
"EELECTROSTATIC", (128),
"ABI_IJ", 3,
"ABI_JK", 4,
"TBI_AB", 4,
"TBI_BC", 5,
"TBI_CD", 6,
"R3", 0,
"R4", 1,
"R5", 2,
"R56", 3);
});
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (["J.minimize.forcefield.ForceField"], "J.minimize.forcefield.ForceFieldMMFF", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.List", "$.PT", "J.minimize.MinAtom", "$.MinObject", "J.minimize.forcefield.AtomType", "$.CalculationsMMFF", "J.util.BSUtil", "$.Elements", "$.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.useEmpiricalRules = true;
this.rawAtomTypes = null;
this.rawBondTypes = null;
this.rawMMFF94Charges = null;
this.vRings = null;
this.line = null;
this.typeData = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "ForceFieldMMFF", J.minimize.forcefield.ForceField);
Clazz_prepareFields (c$, function () {
this.typeData =  Clazz_newIntArray (4, 0);
});
$_M(c$, "getAtomTypeDescriptions", 
function () {
return J.minimize.forcefield.ForceFieldMMFF.getAtomTypeDescs (this.rawAtomTypes);
});
$_M(c$, "getPartialCharges", 
function () {
return this.rawMMFF94Charges;
});
Clazz_makeConstructor (c$, 
function (m) {
Clazz_superConstructor (this, J.minimize.forcefield.ForceFieldMMFF, []);
this.minimizer = m;
this.name = "MMFF";
this.getParameters ();
}, "J.minimize.Minimizer");
$_V(c$, "clear", 
function () {
});
$_V(c$, "setModel", 
function (bsElements, elemnoMax) {
var m = this.minimizer;
if (!this.setArrays (m.atoms, m.bsAtoms, m.bonds, m.rawBondCount, false, false)) return false;
this.setModelFields ();
this.fixTypes ();
this.calc =  new J.minimize.forcefield.CalculationsMMFF (this, J.minimize.forcefield.ForceFieldMMFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
this.calc.setLoggingEnabled (true);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
$_M(c$, "setArrays", 
function (atoms, bsAtoms, bonds, rawBondCount, doRound, allowUnknowns) {
var m = this.minimizer;
this.vRings = JU.AU.createArrayOfArrayList (4);
this.rawAtomTypes = J.minimize.forcefield.ForceFieldMMFF.setAtomTypes (atoms, bsAtoms, m.viewer.getSmilesMatcher (), this.vRings, allowUnknowns);
if (this.rawAtomTypes == null) return false;
this.rawBondTypes = this.setBondTypes (bonds, rawBondCount, bsAtoms);
this.rawMMFF94Charges = J.minimize.forcefield.ForceFieldMMFF.calculatePartialCharges (bonds, this.rawBondTypes, atoms, this.rawAtomTypes, bsAtoms, doRound);
return true;
}, "~A,JU.BS,~A,~N,~B,~B");
$_M(c$, "getParameters", 
function () {
if (J.minimize.forcefield.ForceFieldMMFF.ffParams != null) return;
this.getAtomTypes ();
var data =  new java.util.Hashtable ();
var resourceName = "mmff94.par.txt";
if (J.util.Logger.debugging) J.util.Logger.debug ("reading data from " + resourceName);
var br = null;
var line = null;
try {
br = this.getBufferedReader (resourceName);
var pt = 0;
var dataType = 0;
while (true) {
while ((pt = (line = br.readLine ()).indexOf (".PAR")) < 0) {
}
if ((dataType = J.minimize.forcefield.ForceFieldMMFF.types[Clazz_doubleToInt ("END.BCI.CHG.ANG.NDK.OND.OOP.TBN.FSB.TOR.VDW.".indexOf (line.substring (pt - 3, pt + 1)) / 4)]) < 1) break;
this.readParams (br, dataType, data);
}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName + " line=" + line);
} else {
throw e;
}
} finally {
try {
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
J.minimize.forcefield.ForceFieldMMFF.ffParams = data;
});
$_M(c$, "readParams", 
function (br, dataType, data) {
var value = null;
var a1 = 0;
var a2 = 127;
var a3 = 127;
var a4 = 127;
var type = 0;
switch (dataType) {
case 3:
case 5:
case 9:
break;
case 34:
a4 = 124;
break;
case 21:
a4 = 125;
break;
case 546:
a4 = 123;
type = 0;
break;
case 13:
type = 6;
break;
case 1:
type = 0;
break;
case 37:
a4 = 126;
type = 0;
break;
case 17:
a4 = 122;
type = 0;
break;
}
while (!br.readLine ().startsWith ("*")) {
}
while ((this.line = br.readLine ()).startsWith ("*")) {
}
do {
switch (dataType) {
case 546:
case 13:
case 1:
case 37:
break;
case 17:
if (this.line.charAt (5) != ' ') continue;
break;
case 34:
if (this.line.charAt (0) == '4') continue;
case 5:
case 3:
case 21:
case 9:
type = this.line.charCodeAt (0) - 48;
break;
}
switch (dataType) {
case 13:
case 9:
a4 = this.ival (18, 20);
case 5:
case 21:
case 37:
a3 = this.ival (13, 15);
case 546:
case 3:
case 34:
a2 = this.ival (8, 10);
case 1:
case 17:
a1 = this.ival (3, 5);
break;
}
switch (dataType) {
case 546:
value = [this.dval (19, 25), this.dval (13, 18)];
break;
case 3:
value = [this.dval (14, 20), this.dval (25, 31)];
break;
case 5:
case 21:
value = [this.dval (19, 25), this.dval (28, 35)];
break;
case 34:
value = Float.$valueOf (this.fval (10, 20));
break;
case 13:
value = [this.dval (24, 30)];
break;
case 1:
value = Float.$valueOf (this.fval (5, 15));
break;
case 37:
var v1 = this.dval (19, 25);
var v2 = this.dval (28, 35);
value = [v1, v2];
var key = J.minimize.MinObject.getKey (type, a1, a2, a3, a4);
data.put (key, value);
value = [v2, v1];
var a = a1;
a1 = a3;
a3 = a;
break;
case 9:
value = [this.dval (22, 28), this.dval (30, 36), this.dval (38, 44)];
break;
case 17:
value = [this.dval (10, 15), this.dval (20, 25), this.dval (30, 35), this.dval (40, 45), this.line.charAt (46)];
break;
}
var key = J.minimize.MinObject.getKey (type, a1, a2, a3, a4);
data.put (key, value);
if (J.util.Logger.debugging) J.util.Logger.debug (J.minimize.MinObject.decodeKey (key) + " " + (Clazz_instanceOf (value, Float) ? value : J.util.Escape.eAD (value)));
} while (!(this.line = br.readLine ()).startsWith ("$"));
}, "java.io.BufferedReader,~N,java.util.Map");
$_M(c$, "ival", 
function (i, j) {
return JU.PT.parseInt (this.line.substring (i, j).trim ());
}, "~N,~N");
$_M(c$, "fval", 
function (i, j) {
return JU.PT.fVal (this.line.substring (i, j).trim ());
}, "~N,~N");
$_M(c$, "dval", 
function (i, j) {
return JU.PT.dVal (this.line.substring (i, j).trim ());
}, "~N,~N");
$_M(c$, "getAtomTypes", 
function () {
var resourceName = "MMFF94-smarts.txt";
var types =  new JU.List ();
try {
var br = this.getBufferedReader (resourceName);
var at;
types.addLast ( new J.minimize.forcefield.AtomType (0, 0, 0, 0, 1, "H or NOT FOUND", ""));
while ((this.line = br.readLine ()) != null) {
if (this.line.length == 0 || this.line.startsWith ("#")) continue;
var elemNo = this.ival (3, 5);
var mmType = this.ival (6, 8);
var hType = this.ival (9, 11);
var formalCharge = this.fval (12, 15) / 12;
var val = this.ival (16, 18);
var desc = this.line.substring (19, 44).trim ();
var smarts = this.line.substring (45).trim ();
types.addLast (at =  new J.minimize.forcefield.AtomType (elemNo, mmType, hType, formalCharge, val, desc, smarts));
J.minimize.forcefield.ForceFieldMMFF.setFlags (at);
}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName + " line=" + this.line);
} else {
throw e;
}
}
J.util.Logger.info ((types.size () - 1) + " SMARTS-based atom types read");
J.minimize.forcefield.ForceFieldMMFF.atomTypes = types;
});
c$.setFlags = $_M(c$, "setFlags", 
function (at) {
switch (at.mmType) {
case 32:
case 35:
case 72:
at.fcadj = 0.5;
break;
case 62:
case 76:
at.fcadj = 0.25;
break;
}
switch (at.mmType) {
case 37:
case 38:
case 39:
case 44:
case 58:
case 59:
case 63:
case 64:
case 65:
case 66:
case 69:
case 78:
case 79:
case 81:
case 82:
at.arom = true;
}
switch (at.mmType) {
case 2:
case 3:
case 4:
case 9:
case 30:
case 37:
case 39:
case 54:
case 57:
case 58:
case 63:
case 64:
case 67:
case 75:
case 78:
case 80:
case 81:
at.sbmb = true;
}
switch (at.mmType) {
case 6:
case 8:
case 10:
case 11:
case 12:
case 13:
case 14:
case 15:
case 26:
case 32:
case 35:
case 39:
case 40:
case 43:
case 44:
case 59:
case 62:
case 70:
case 72:
case 76:
at.pilp = true;
}
switch (at.mmType) {
case 10:
case 32:
case 35:
case 39:
case 41:
case 44:
case 55:
case 56:
case 58:
case 59:
case 69:
case 72:
case 81:
case 82:
at.mltb = 1;
break;
case 2:
case 3:
case 7:
case 9:
case 16:
case 17:
case 30:
case 37:
case 38:
case 45:
case 46:
case 47:
case 51:
case 53:
case 54:
case 57:
case 63:
case 64:
case 65:
case 66:
case 67:
case 74:
case 75:
case 78:
case 79:
case 80:
at.mltb = 2;
break;
case 4:
case 42:
case 60:
case 61:
at.mltb = 3;
break;
}
}, "J.minimize.forcefield.AtomType");
c$.calculatePartialCharges = $_M(c$, "calculatePartialCharges", 
function (bonds, bTypes, atoms, aTypes, bsAtoms, doRound) {
var partialCharges =  Clazz_newFloatArray (atoms.length, 0);
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) partialCharges[i] = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, aTypes[i])).formalCharge;

var a1 = null;
for (var i = bTypes.length; --i >= 0; ) {
a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
var ok1 = bsAtoms.get (a1.index);
var ok2 = bsAtoms.get (a2.index);
if (!ok1 && !ok2) continue;
var it = aTypes[a1.index];
var at1 = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type1 = (it < 0 ? -it : at1.mmType);
it = aTypes[a2.index];
var at2 = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type2 = (it < 0 ? -it : at2.mmType);
var dq;
try {
var bondType = bTypes[i];
var bFactor = (type1 < type2 ? -1 : 1);
var key = J.minimize.MinObject.getKey (bondType, bFactor == 1 ? type2 : type1, bFactor == 1 ? type1 : type2, 127, 124);
var bciValue = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (key);
var bci;
var msg = (J.util.Logger.debugging ? a1 + "/" + a2 + " mmTypes=" + type1 + "/" + type2 + " formalCharges=" + at1.formalCharge + "/" + at2.formalCharge + " bci = " : null);
if (bciValue == null) {
var pa = (J.minimize.forcefield.ForceFieldMMFF.ffParams.get (J.minimize.MinObject.getKey (0, type1, 127, 127, 127))).floatValue ();
var pb = (J.minimize.forcefield.ForceFieldMMFF.ffParams.get (J.minimize.MinObject.getKey (0, type2, 127, 127, 127))).floatValue ();
bci = pa - pb;
if (J.util.Logger.debugging) msg += pa + " - " + pb + " = ";
} else {
bci = bFactor * bciValue.floatValue ();
}if (J.util.Logger.debugging) {
msg += bci;
J.util.Logger.debug (msg);
}dq = at2.fcadj * at2.formalCharge - at1.fcadj * at1.formalCharge + bci;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
dq = NaN;
} else {
throw e;
}
}
if (ok1) partialCharges[a1.index] += dq;
if (ok2) partialCharges[a2.index] -= dq;
}
if (doRound) {
var abscharge = 0;
for (var i = partialCharges.length; --i >= 0; ) {
partialCharges[i] = (Math.round (partialCharges[i] * 1000)) / 1000;
abscharge += Math.abs (partialCharges[i]);
}
if (abscharge == 0 && a1 != null) {
partialCharges[a1.index] = -0.0;
}}return partialCharges;
}, "~A,~A,~A,~A,JU.BS,~B");
c$.isBondType1 = $_M(c$, "isBondType1", 
function (at1, at2) {
return at1.sbmb && at2.sbmb || at1.arom && at2.arom;
}, "J.minimize.forcefield.AtomType,J.minimize.forcefield.AtomType");
$_M(c$, "getBondType", 
function (bond, at1, at2, index1, index2) {
return (J.minimize.forcefield.ForceFieldMMFF.isBondType1 (at1, at2) && bond.getCovalentOrder () == 1 && !this.isAromaticBond (index1, index2) ? 1 : 0);
}, "J.modelset.Bond,J.minimize.forcefield.AtomType,J.minimize.forcefield.AtomType,~N,~N");
$_M(c$, "isAromaticBond", 
function (a1, a2) {
if (this.vRings[3] != null) for (var i = this.vRings[3].size (); --i >= 0; ) {
var bsRing = this.vRings[3].get (i);
if (bsRing.get (a1) && bsRing.get (a2)) return true;
}
return false;
}, "~N,~N");
c$.getAtomTypeDescs = $_M(c$, "getAtomTypeDescs", 
function (types) {
var stypes =  new Array (types.length);
for (var i = types.length; --i >= 0; ) {
stypes[i] = String.valueOf (types[i] < 0 ? -types[i] : J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (types[i]).mmType);
}
return stypes;
}, "~A");
c$.setAtomTypes = $_M(c$, "setAtomTypes", 
function (atoms, bsAtoms, smartsMatcher, vRings, allowUnknowns) {
var bitSets =  new JU.List ();
var smarts =  new Array (J.minimize.forcefield.ForceFieldMMFF.atomTypes.size ());
var types =  Clazz_newIntArray (atoms.length, 0);
var bsElements =  new JU.BS ();
var bsHydrogen =  new JU.BS ();
var bsConnected = J.util.BSUtil.copy (bsAtoms);
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = atoms[i];
var bonds = a.getBonds ();
if (bonds != null) for (var j = bonds.length; --j >= 0; ) if (bonds[j].isCovalent ()) bsConnected.set (bonds[j].getOtherAtom (a).index);

}
for (var i = bsConnected.nextSetBit (0); i >= 0; i = bsConnected.nextSetBit (i + 1)) {
var n = atoms[i].getElementNumber ();
switch (n) {
case 1:
bsHydrogen.set (i);
break;
default:
bsElements.set (n);
}
}
var nUsed = 0;
for (var i = 1; i < J.minimize.forcefield.ForceFieldMMFF.atomTypes.size (); i++) {
var at = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (i);
if (!bsElements.get (at.elemNo)) continue;
smarts[i] = at.smartsCode;
nUsed++;
}
J.util.Logger.info (nUsed + " SMARTS matches used");
smartsMatcher.getSubstructureSets (smarts, atoms, atoms.length, 20, bsConnected, bitSets, vRings);
var bsDone =  new JU.BS ();
for (var j = 0; j < bitSets.size (); j++) {
var bs = bitSets.get (j);
if (bs == null) continue;
bs.andNot (bsDone);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) types[i] = j;

bsDone.or (bs);
}
for (var i = bsHydrogen.nextSetBit (0); i >= 0; i = bsHydrogen.nextSetBit (i + 1)) {
var bonds = atoms[i].getBonds ();
if (bonds != null) {
var j = types[bonds[0].getOtherAtom (atoms[i]).index];
if (j != 0) bsDone.set (i);
types[i] = -J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (j).hType;
}}
if (J.util.Logger.debugging) for (var i = bsConnected.nextSetBit (0); i >= 0; i = bsConnected.nextSetBit (i + 1)) J.util.Logger.debug ("atom " + atoms[i] + "\ttype " + (types[i] < 0 ? "" + -types[i] : (J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (types[i]).mmType + "\t" + J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (types[i]).smartsCode + "\t" + J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (types[i]).descr)));

if (!allowUnknowns && bsDone.cardinality () != bsConnected.cardinality ()) return null;
return types;
}, "~A,JU.BS,J.api.SmilesMatcherInterface,~A,~B");
$_M(c$, "setBondTypes", 
function (bonds, bondCount, bsAtoms) {
var bTypes =  Clazz_newIntArray (bondCount, 0);
for (var i = bondCount; --i >= 0; ) {
var a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
var ok1 = bsAtoms.get (a1.index);
var ok2 = bsAtoms.get (a2.index);
if (!ok1 && !ok2) continue;
var it = this.rawAtomTypes[a1.index];
var at1 = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
it = this.rawAtomTypes[a2.index];
var at2 = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
bTypes[i] = this.getBondType (bonds[i], at1, at2, a1.index, a2.index);
}
return bTypes;
}, "~A,~N,JU.BS");
$_M(c$, "fixTypes", 
function () {
for (var i = this.minAtomCount; --i >= 0; ) {
var a = this.minAtoms[i];
var rawIndex = a.atom.index;
var it = this.rawAtomTypes[rawIndex];
a.ffAtomType = J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (Math.max (0, it));
var type = (it < 0 ? -it : J.minimize.forcefield.ForceFieldMMFF.atomTypes.get (it).mmType);
a.ffType = type;
a.vdwKey = J.minimize.MinObject.getKey (0, type, 127, 127, 122);
a.partialCharge = this.rawMMFF94Charges[rawIndex];
}
for (var i = this.minBonds.length; --i >= 0; ) {
var bond = this.minBonds[i];
bond.type = this.rawBondTypes[bond.rawIndex];
bond.key = this.getKey (bond, bond.type, 3);
}
for (var i = this.minAngles.length; --i >= 0; ) {
var angle = this.minAngles[i];
angle.key = this.getKey (angle, angle.type, 5);
angle.sbKey = this.getKey (angle, angle.sbType, 21);
}
for (var i = this.minTorsions.length; --i >= 0; ) {
var torsion = this.minTorsions[i];
torsion.key = this.getKey (torsion, torsion.type, 9);
}
});
$_M(c$, "setAngleType", 
function (angle) {
angle.type = this.minBonds[angle.data[3]].type + this.minBonds[angle.data[4]].type;
if (this.checkRings (this.vRings[0], angle.data, 3)) {
angle.type += (angle.type == 0 ? 3 : 4);
} else if (this.checkRings (this.vRings[1], angle.data, 3)) {
angle.type += (angle.type == 0 ? 4 : 6);
}angle.sbType = J.minimize.forcefield.ForceFieldMMFF.sbMap[angle.type];
switch (angle.type) {
case 1:
case 5:
case 7:
angle.sbType += this.minBonds[angle.data[4]].type;
break;
}
return angle.type;
}, "J.minimize.MinAngle");
$_M(c$, "setTorsionType", 
function (t) {
if (this.checkRings (this.vRings[1], t.data, 4)) return (t.type = 4);
t.type = (this.minBonds[t.data[5]].type == 1 ? 1 : this.minBonds[t.data[4]].type == 0 && this.minBonds[t.data[6]].type == 0 ? 0 : 2);
if (t.type == 0 && this.checkRings (this.vRings[2], t.data, 4)) {
t.type = 5;
}return t.type;
}, "J.minimize.MinTorsion");
$_M(c$, "typeOf", 
function (iAtom) {
return this.minAtoms[iAtom].ffType;
}, "~N");
$_M(c$, "checkRings", 
function (v, minlist, n) {
if (v != null) for (var i = v.size (); --i >= 0; ) {
var bs = v.get (i);
if (bs.get (this.minAtoms[minlist[0]].atom.index) && bs.get (this.minAtoms[minlist[1]].atom.index) && (n < 3 || bs.get (this.minAtoms[minlist[2]].atom.index)) && (n < 4 || bs.get (this.minAtoms[minlist[3]].atom.index))) return true;
}
return false;
}, "JU.List,~A,~N");
$_M(c$, "getKey", 
function (obj, type, ktype) {
var o = (Clazz_instanceOf (obj, J.minimize.MinObject) ? obj : null);
var data = (o == null ? obj : o.data);
var n = 4;
switch (ktype) {
case 3:
this.fixOrder (data, 0, 1);
n = 2;
break;
case 5:
if (this.fixOrder (data, 0, 2) == -1) J.minimize.forcefield.ForceFieldMMFF.swap (data, 3, 4);
type = this.setAngleType (o);
n = 3;
break;
case 21:
n = 3;
break;
case 9:
switch (this.fixOrder (data, 1, 2)) {
case 1:
break;
case -1:
J.minimize.forcefield.ForceFieldMMFF.swap (data, 0, 3);
J.minimize.forcefield.ForceFieldMMFF.swap (data, 4, 6);
break;
case 0:
if (this.fixOrder (data, 0, 3) == -1) J.minimize.forcefield.ForceFieldMMFF.swap (data, 4, 6);
break;
}
type = this.setTorsionType (o);
}
var key = null;
for (var i = 0; i < 4; i++) this.typeData[i] = (i < n ? this.typeOf (data[i]) : 127);

switch (ktype) {
case 21:
this.typeData[3] = 125;
break;
case 13:
J.minimize.forcefield.ForceFieldMMFF.sortOop (this.typeData);
break;
}
key = J.minimize.MinObject.getKey (type, this.typeData[0], this.typeData[1], this.typeData[2], this.typeData[3]);
var ddata = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (key);
switch (ktype) {
case 3:
if (!this.useEmpiricalRules) return key;
return (ddata != null && ddata[0] > 0 ? key : this.applyEmpiricalRules (o, ddata, 3));
case 5:
if (ddata != null && ddata[0] != 0) return key;
break;
case 9:
if (ddata == null) {
if (!J.minimize.forcefield.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 0, 2)) && !J.minimize.forcefield.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 2, 0)) && !J.minimize.forcefield.ForceFieldMMFF.ffParams.containsKey (key = this.getTorsionKey (type, 2, 2))) key = this.getTorsionKey (0, 2, 2);
ddata = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (key);
}if (!this.useEmpiricalRules) return key;
return (ddata != null ? key : this.applyEmpiricalRules (o, ddata, 9));
case 21:
if (ddata != null) return key;
var r1 = this.getRowFor (data[0]);
var r2 = this.getRowFor (data[1]);
var r3 = this.getRowFor (data[2]);
return J.minimize.MinObject.getKey (0, r1, r2, r3, 126);
case 13:
if (ddata != null) return key;
}
if (!this.useEmpiricalRules && ddata != null) return key;
var isSwapped = false;
var haveKey = false;
for (var i = 0; i < 3 && !haveKey; i++) {
for (var j = 0, bit = 1; j < n; j++, bit <<= 1) if ((ktype & bit) == bit) this.typeData[j] = J.minimize.forcefield.ForceFieldMMFF.getEquivalentType (this.typeOf (data[j]), i);

switch (ktype) {
case 3:
isSwapped = (J.minimize.forcefield.ForceFieldMMFF.fixTypeOrder (this.typeData, 0, 1));
break;
case 5:
isSwapped = (J.minimize.forcefield.ForceFieldMMFF.fixTypeOrder (this.typeData, 0, 2));
break;
case 13:
J.minimize.forcefield.ForceFieldMMFF.sortOop (this.typeData);
break;
}
key = J.minimize.MinObject.getKey (type, this.typeData[0], this.typeData[1], this.typeData[2], this.typeData[3]);
haveKey = J.minimize.forcefield.ForceFieldMMFF.ffParams.containsKey (key);
}
if (haveKey) {
if (isSwapped) switch (ktype) {
case 5:
J.minimize.forcefield.ForceFieldMMFF.swap (data, 0, 2);
J.minimize.forcefield.ForceFieldMMFF.swap (data, 3, 4);
this.setAngleType (o);
break;
}
} else if (type != 0 && ktype == 5) {
key = Integer.$valueOf (key.intValue () ^ 0xFF);
}if (!this.useEmpiricalRules) return key;
ddata = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (key);
switch (ktype) {
case 5:
return (ddata != null && ddata[0] != 0 ? key : this.applyEmpiricalRules (o, ddata, 5));
}
return key;
}, "~O,~N,~N");
$_M(c$, "getTorsionKey", 
function (type, i, j) {
return J.minimize.MinObject.getKey (type, J.minimize.forcefield.ForceFieldMMFF.getEquivalentType (this.typeData[0], i), this.typeData[1], this.typeData[2], J.minimize.forcefield.ForceFieldMMFF.getEquivalentType (this.typeData[3], j));
}, "~N,~N,~N");
$_M(c$, "applyEmpiricalRules", 
function (o, ddata, ktype) {
var rr;
var rr2;
var beta = 0;
var a;
var b;
var c;
switch (ktype) {
case 3:
a = this.minAtoms[o.data[0]];
b = this.minAtoms[o.data[1]];
var elemno1 = a.atom.getElementNumber ();
var elemno2 = b.atom.getElementNumber ();
var key = J.minimize.MinObject.getKey (0, Math.min (elemno1, elemno2), Math.max (elemno1, elemno2), 127, 123);
ddata = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (key);
if (ddata == null) return null;
var kbref = ddata[0];
var r0ref = ddata[1];
var r0 = J.minimize.forcefield.ForceFieldMMFF.getRuleBondLength (a, b, (o).order, this.isAromaticBond (o.data[0], o.data[1]));
if (r0 == 0) return null;
rr = r0ref / r0;
rr2 = rr * rr;
var rr4 = rr2 * rr2;
var rr6 = rr4 * rr2;
var kb = kbref * rr6;
o.ddata = [kb, r0];
return Integer.$valueOf (-1);
case 5:
var theta0;
if (ddata == null || (theta0 = ddata[1]) == 0) {
b = this.minAtoms[o.data[1]];
var atom = b.atom;
var elemno = atom.getElementNumber ();
switch (o.type) {
case 3:
case 5:
case 6:
theta0 = 60;
beta *= 0.05;
break;
case 4:
case 7:
case 8:
theta0 = 90;
break;
default:
theta0 = 120;
var crd = atom.getCovalentBondCount ();
switch (crd) {
case 2:
if (J.minimize.MinAtom.isLinear (b)) theta0 = 180;
 else if (elemno == 8) theta0 = 105;
 else if (elemno > 10) theta0 = 95.0;
break;
case 3:
if (b.ffAtomType.mltb == 0 && b.ffAtomType.val == 3) theta0 = (elemno == 7 ? 107 : 92);
break;
case 4:
theta0 = 109.45;
break;
}
}
}beta = 1.75;
switch (o.type) {
case 3:
case 5:
case 6:
beta *= 0.05;
break;
case 4:
case 7:
case 8:
beta *= 0.85;
break;
}
var za = J.minimize.forcefield.ForceFieldMMFF.getZParam (this.minAtoms[o.data[0]].atom.getElementNumber ());
var cb = J.minimize.forcefield.ForceFieldMMFF.getCParam (this.minAtoms[o.data[1]].atom.getElementNumber ());
var zc = J.minimize.forcefield.ForceFieldMMFF.getZParam (this.minAtoms[o.data[2]].atom.getElementNumber ());
var r0ab = J.minimize.forcefield.ForceFieldMMFF.getR0 (this.minBonds[o.data[3]]);
var r0bc = J.minimize.forcefield.ForceFieldMMFF.getR0 (this.minBonds[o.data[4]]);
rr = r0ab + r0bc;
rr2 = rr * rr;
var D = (r0ab - r0bc) / rr2;
var theta2 = theta0 * 0.017453292519943295;
theta2 *= theta2;
var ka = (beta * za * cb * zc * Math.exp (-2 * D)) / (rr * theta2);
o.ddata = [ka, theta0];
return Integer.$valueOf (-1);
case 9:
var ib = o.data[1];
var ic = o.data[2];
b = this.minAtoms[ib];
c = this.minAtoms[ic];
if (J.minimize.MinAtom.isLinear (b) || J.minimize.MinAtom.isLinear (c)) return null;
var bondBC = this.minBonds[o.data[5]];
var elemnoB = b.atom.getElementNumber ();
var elemnoC = c.atom.getElementNumber ();
var ub = J.minimize.forcefield.ForceFieldMMFF.getUParam (elemnoB);
var uc = J.minimize.forcefield.ForceFieldMMFF.getUParam (elemnoC);
var vb = J.minimize.forcefield.ForceFieldMMFF.getVParam (elemnoB);
var vc = J.minimize.forcefield.ForceFieldMMFF.getVParam (elemnoC);
var v1 = 0;
var v2 = 0;
var v3 = 0;
var pi_bc = -1;
var n_bc = -1;
var wb = -1;
var wc = 0;
var valB = b.ffAtomType.val;
var valC = c.ffAtomType.val;
var pilpB = b.ffAtomType.pilp;
var pilpC = c.ffAtomType.pilp;
var mltbB = b.ffAtomType.mltb;
var mltbC = c.ffAtomType.mltb;
out : while (true) {
if (this.isAromaticBond (ib, ic)) {
pi_bc = (pilpB || pilpC ? 0.3 : 0.5);
beta = (valB + valC == 7 ? 3 : 6);
break out;
}if (bondBC.order == 2) {
beta = 6;
pi_bc = (mltbB == 2 && mltbC == 2 ? 1.0 : 0.4);
break out;
}var crdB = b.atom.getCovalentBondCount ();
var crdC = c.atom.getCovalentBondCount ();
if (crdB == 4 && crdC == 4) {
vb = J.minimize.forcefield.ForceFieldMMFF.getVParam (elemnoB);
vc = J.minimize.forcefield.ForceFieldMMFF.getVParam (elemnoC);
n_bc = 9;
break out;
}if (crdB != 4 && (valB > crdB || mltbB > 0) || crdC != 4 && (valC > crdC || mltbC > 0)) return null;
var case2 = (pilpB && mltbC > 0);
var case3 = (pilpC && mltbB > 0);
if (bondBC.order == 1 && (mltbB > 0 && mltbC > 0 || case2 || case3)) {
if (pilpB && pilpC) return null;
beta = 6;
if (case2) {
pi_bc = (mltbC == 1 ? 0.5 : elemnoB <= 10 && elemnoC <= 10 ? 0.3 : 0.15);
break out;
}if (case3) {
pi_bc = (mltbB == 1 ? 0.5 : elemnoB <= 10 && elemnoC <= 10 ? 0.3 : 0.15);
break out;
}if ((mltbB == 1 || mltbC == 1) && (elemnoB == 6 || elemnoC == 6)) {
pi_bc = 0.4;
break out;
}pi_bc = 0.15;
break out;
}switch (elemnoB << 8 + elemnoC) {
case 0x808:
wb = wc = 2;
break out;
case 0x810:
wb = 2;
wc = 8;
break out;
case 0x1008:
wb = 8;
wc = 2;
break out;
case 0x1010:
wb = wc = 8;
break out;
}
n_bc = crdB * crdC;
break out;
}
if (pi_bc > 0) v2 = beta * pi_bc * Math.sqrt (ub * uc);
 else if (n_bc > 0) v3 = Math.sqrt (vb * vc) / n_bc;
 else if (wb != 0) v2 = -Math.sqrt (wb * wc);
o.ddata = [v1, v2, v3];
return Integer.$valueOf (-1);
default:
return null;
}
}, "J.minimize.MinObject,~A,~N");
c$.getR0 = $_M(c$, "getR0", 
function (b) {
return (b.ddata == null ? (J.minimize.forcefield.ForceFieldMMFF.ffParams.get (b.key)) : b.ddata)[1];
}, "J.minimize.MinBond");
$_M(c$, "getRowFor", 
function (i) {
var elemno = this.minAtoms[i].atom.getElementNumber ();
return (elemno < 3 ? 0 : elemno < 11 ? 1 : elemno < 19 ? 2 : elemno < 37 ? 3 : 4);
}, "~N");
$_M(c$, "getOutOfPlaneParameter", 
function (data) {
var ddata = J.minimize.forcefield.ForceFieldMMFF.ffParams.get (this.getKey (data, 6, 13));
return (ddata == null ? 0 : ddata[0]);
}, "~A");
c$.sortOop = $_M(c$, "sortOop", 
function (typeData) {
J.minimize.forcefield.ForceFieldMMFF.fixTypeOrder (typeData, 0, 2);
J.minimize.forcefield.ForceFieldMMFF.fixTypeOrder (typeData, 0, 3);
J.minimize.forcefield.ForceFieldMMFF.fixTypeOrder (typeData, 2, 3);
}, "~A");
c$.fixTypeOrder = $_M(c$, "fixTypeOrder", 
function (a, i, j) {
if (a[i] > a[j]) {
J.minimize.forcefield.ForceFieldMMFF.swap (a, i, j);
return true;
}return false;
}, "~A,~N,~N");
$_M(c$, "fixOrder", 
function (a, i, j) {
var test = this.typeOf (a[j]) - this.typeOf (a[i]);
if (test < 0) J.minimize.forcefield.ForceFieldMMFF.swap (a, i, j);
return (test < 0 ? -1 : test > 0 ? 1 : 0);
}, "~A,~N,~N");
c$.swap = $_M(c$, "swap", 
function (a, i, j) {
var t = a[i];
a[i] = a[j];
a[j] = t;
}, "~A,~N,~N");
c$.getEquivalentType = $_M(c$, "getEquivalentType", 
function (type, level) {
return (type == 0 ? 0 : type == 70 || type > 82 ? type : level == 2 ? 0 : J.minimize.forcefield.ForceFieldMMFF.equivalentTypes[((type - 1) << 1) + level]);
}, "~N,~N");
c$.getZParam = $_M(c$, "getZParam", 
function (elemno) {
switch (elemno) {
case 1:
return 1.395;
case 6:
return 2.494;
case 7:
return 2.711;
case 8:
return 3.045;
case 9:
return 2.847;
case 14:
return 2.350;
case 15:
return 2.350;
case 16:
return 2.980;
case 17:
return 2.909;
case 35:
return 3.017;
case 53:
return 3.086;
}
return 0.0;
}, "~N");
c$.getCParam = $_M(c$, "getCParam", 
function (elemno) {
switch (elemno) {
case 5:
return 0.704;
case 6:
return 1.016;
case 7:
return 1.113;
case 8:
return 1.337;
case 14:
return 0.811;
case 15:
return 1.068;
case 16:
return 1.249;
case 17:
return 1.078;
case 33:
return 0.825;
}
return 0.0;
}, "~N");
c$.getUParam = $_M(c$, "getUParam", 
function (elemno) {
switch (elemno) {
case 6:
case 7:
case 8:
return 2.0;
case 14:
case 15:
case 16:
return 1.25;
}
return 0.0;
}, "~N");
c$.getVParam = $_M(c$, "getVParam", 
function (elemno) {
switch (elemno) {
case 6:
return 2.12;
case 7:
return 1.5;
case 8:
return 0.2;
case 14:
return 1.22;
case 15:
return 2.4;
case 16:
return 0.49;
}
return 0.0;
}, "~N");
c$.getCovalentRadius = $_M(c$, "getCovalentRadius", 
function (elemno) {
switch (elemno) {
case 1:
return 0.33;
case 5:
return 0.81;
case 6:
return 0.77;
case 7:
return 0.73;
case 8:
return 0.72;
case 9:
return 0.74;
case 13:
return 1.22;
case 14:
return 1.15;
case 15:
return 1.09;
case 16:
return 1.03;
case 17:
return 1.01;
case 31:
return 1.19;
case 32:
return 1.20;
case 33:
return 1.20;
case 34:
return 1.16;
case 35:
return 1.15;
case 44:
return 1.46;
case 50:
return 1.40;
case 51:
return 1.41;
case 52:
return 1.35;
case 53:
return 1.33;
case 81:
return 1.51;
case 82:
return 1.53;
case 83:
return 1.55;
default:
return J.util.Elements.getBondingRadiusFloat (elemno, 0);
}
}, "~N");
c$.getRuleBondLength = $_M(c$, "getRuleBondLength", 
function (a, b, boAB, isAromatic) {
switch (boAB) {
case 1:
case 2:
case 3:
break;
case 5:
break;
default:
return 0;
}
var elemnoA = a.atom.getElementNumber ();
var elemnoB = b.atom.getElementNumber ();
var r0a = J.minimize.forcefield.ForceFieldMMFF.getCovalentRadius (elemnoA);
var r0b = J.minimize.forcefield.ForceFieldMMFF.getCovalentRadius (elemnoB);
var Xa = J.util.Elements.getAllredRochowElectroNeg (elemnoA);
var Xb = J.util.Elements.getAllredRochowElectroNeg (elemnoB);
var c = (elemnoA == 1 || elemnoB == 1 ? 0.05 : 0.085);
var n = 1.4;
var r = r0a + r0b;
if (isAromatic) boAB = (a.ffAtomType.pilp || b.ffAtomType.pilp ? 5 : 4);
 else switch (a.ffAtomType.mltb << 4 + b.ffAtomType.mltb) {
case 0x11:
boAB = 4;
break;
case 0x12:
case 0x21:
boAB = 5;
break;
}
switch (boAB) {
case 1:
switch (a.ffAtomType.mltb) {
case 0:
break;
case 1:
case 2:
break;
case 3:
break;
}
switch (b.ffAtomType.mltb) {
case 0:
break;
case 1:
case 2:
break;
case 3:
break;
}
break;
default:
break;
}
r -= c * Math.pow (Math.abs (Xa - Xb), n);
return r;
}, "J.minimize.MinAtom,J.minimize.MinAtom,~N,~B");
Clazz_defineStatics (c$,
"A4_VDW", 122,
"A4_BNDK", 123,
"A4_CHRG", 124,
"A4_SB", 125,
"A4_SBDEF", 126,
"KEY_SBDEF", 0,
"KEY_PBCI", 0,
"KEY_VDW", 0,
"KEY_BNDK", 0,
"KEY_OOP", 6,
"TYPE_PBCI", 0x1,
"TYPE_VDW", 0x11,
"TYPE_BNDK", 0x222,
"TYPE_CHRG", 0x22,
"TYPE_BOND", 0x3,
"TYPE_ANGLE", 0x5,
"TYPE_SB", 0x15,
"TYPE_SBDEF", 0x25,
"TYPE_TORSION", 0x9,
"TYPE_OOP", 0xD,
"atomTypes", null,
"ffParams", null,
"names", "END.BCI.CHG.ANG.NDK.OND.OOP.TBN.FSB.TOR.VDW.",
"types", [0, 1, 34, 5, 546, 3, 13, 21, 37, 9, 17],
"sbMap", [0, 1, 3, 5, 4, 6, 8, 9, 11],
"equivalentTypes", [1, 1, 2, 1, 3, 1, 4, 1, 5, 5, 6, 6, 7, 6, 8, 8, 9, 8, 10, 8, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 15, 17, 15, 18, 15, 19, 19, 1, 1, 21, 5, 22, 1, 23, 5, 24, 5, 25, 25, 26, 25, 28, 5, 28, 5, 29, 5, 2, 1, 31, 31, 7, 6, 21, 5, 8, 8, 6, 6, 36, 5, 2, 1, 9, 8, 10, 8, 10, 8, 3, 1, 42, 8, 10, 8, 16, 15, 10, 8, 9, 8, 42, 8, 9, 8, 6, 6, 21, 5, 7, 6, 21, 5, 42, 8, 9, 8, 10, 8, 10, 8, 2, 1, 10, 8, 6, 6, 4, 1, 42, 8, 10, 8, 2, 1, 2, 1, 9, 8, 9, 8, 9, 8, 8, 8, 9, 8, 70, 70, 5, 5, 16, 15, 18, 15, 17, 15, 26, 25, 9, 8, 12, 12, 2, 1, 9, 8, 2, 1, 10, 8, 9, 8]);
});
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (["J.minimize.forcefield.ForceField", "J.script.T"], "J.minimize.forcefield.ForceFieldUFF", ["java.util.Hashtable", "JU.BS", "$.List", "$.PT", "J.minimize.forcefield.CalculationsUFF", "$.FFParam", "J.util.Elements", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bsAromatic = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "ForceFieldUFF", J.minimize.forcefield.ForceField);
Clazz_makeConstructor (c$, 
function (minimizer) {
Clazz_superConstructor (this, J.minimize.forcefield.ForceFieldUFF, []);
this.minimizer = minimizer;
this.name = "UFF";
}, "J.minimize.Minimizer");
$_V(c$, "clear", 
function () {
this.bsAromatic = null;
});
$_V(c$, "setModel", 
function (bsElements, elemnoMax) {
this.setModelFields ();
J.util.Logger.info ("minimize: setting atom types...");
if (J.minimize.forcefield.ForceFieldUFF.atomTypes == null && (J.minimize.forcefield.ForceFieldUFF.atomTypes = this.getAtomTypes ()) == null) return false;
if (J.minimize.forcefield.ForceFieldUFF.ffParams == null && (J.minimize.forcefield.ForceFieldUFF.ffParams = this.getFFParameters ()) == null) return false;
this.setAtomTypes (bsElements, elemnoMax);
this.calc =  new J.minimize.forcefield.CalculationsUFF (this, J.minimize.forcefield.ForceFieldUFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
$_M(c$, "setAtomTypes", 
function (bsElements, elemnoMax) {
var nTypes = J.minimize.forcefield.ForceFieldUFF.atomTypes.size ();
bsElements.clear (0);
for (var i = 0; i < nTypes; i++) {
var data = J.minimize.forcefield.ForceFieldUFF.atomTypes.get (i);
var smarts = data[0];
if (smarts == null) continue;
var search = this.getSearch (smarts, elemnoMax, bsElements);
if (bsElements.get (0)) bsElements.clear (0);
 else if (search == null) break;
 else for (var j = this.minimizer.bsAtoms.nextSetBit (0), pt = 0; j < this.minimizer.atoms.length && j >= 0; j = this.minimizer.bsAtoms.nextSetBit (j + 1), pt++) if (search.get (j)) this.minAtoms[pt].sType = data[1].intern ();

}
}, "JU.BS,~N");
$_M(c$, "getSearch", 
function (smarts, elemnoMax, bsElements) {
var search = null;
var len = smarts.length;
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[0];
var n = smarts.charCodeAt (len - 2) - 48;
var elemNo = 0;
if (n >= 10) n = 0;
var isAromatic = false;
if (smarts.charAt (1) == '#') {
elemNo = JU.PT.parseInt (smarts.substring (2, len - 1));
} else {
var s = smarts.substring (1, (n > 0 ? len - 3 : len - 1));
if (s.equals (s.toLowerCase ())) {
s = s.toUpperCase ();
isAromatic = true;
}elemNo = J.util.Elements.elementNumberFromSymbol (s, false);
}if (elemNo > elemnoMax) return null;
if (!bsElements.get (elemNo)) {
bsElements.set (0);
return null;
}switch (smarts.charAt (len - 3)) {
case 'D':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[2];
search[6].intValue = n;
break;
case '^':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[4 + (n - 1)];
break;
case '+':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = n;
break;
case '-':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = -n;
break;
case 'A':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[6];
break;
}
search[2].intValue = elemNo;
var v = this.minimizer.viewer.evaluateExpression (search);
if (!(Clazz_instanceOf (v, JU.BS))) return null;
var bs = v;
if (isAromatic && bs.cardinality () > 0) {
if (this.bsAromatic == null) this.bsAromatic = this.minimizer.viewer.evaluateExpression (J.minimize.forcefield.ForceFieldUFF.tokenTypes[3]);
bs.and (this.bsAromatic);
}if (J.util.Logger.debugging && bs.cardinality () > 0) J.util.Logger.debug (smarts + " minimize atoms=" + bs);
return bs;
}, "~S,~N,JU.BS");
$_M(c$, "getFFParameters", 
function () {
var ffParam;
var temp =  new java.util.Hashtable ();
var resourceName = "UFF.txt";
var br = null;
try {
br = this.getBufferedReader (resourceName);
var line;
while ((line = br.readLine ()) != null) {
var vs = JU.PT.getTokens (line);
if (vs.length < 13) continue;
if (J.util.Logger.debugging) J.util.Logger.debug (line);
if (line.substring (0, 5).equals ("param")) {
ffParam =  new J.minimize.forcefield.FFParam ();
temp.put (vs[1], ffParam);
ffParam.dVal =  Clazz_newDoubleArray (11, 0);
ffParam.sVal =  new Array (1);
ffParam.sVal[0] = vs[1];
ffParam.dVal[0] = JU.PT.parseFloat (vs[2]);
ffParam.dVal[1] = JU.PT.parseFloat (vs[3]) * 0.017453292519943295;
ffParam.dVal[2] = JU.PT.parseFloat (vs[4]);
ffParam.dVal[3] = JU.PT.parseFloat (vs[5]);
ffParam.dVal[4] = JU.PT.parseFloat (vs[6]);
ffParam.dVal[5] = JU.PT.parseFloat (vs[7]);
ffParam.dVal[6] = JU.PT.parseFloat (vs[8]);
ffParam.dVal[7] = JU.PT.parseFloat (vs[9]);
ffParam.dVal[8] = JU.PT.parseFloat (vs[10]);
ffParam.dVal[9] = JU.PT.parseFloat (vs[11]);
ffParam.dVal[10] = JU.PT.parseFloat (vs[12]);
ffParam.iVal =  Clazz_newIntArray (1, 0);
var coord = (vs[1].length > 2 ? vs[1].charAt (2) : '1');
switch (coord) {
case 'R':
coord = '2';
break;
default:
coord = '1';
break;
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
break;
}
ffParam.iVal[0] = coord.charCodeAt (0) - 48;
}}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName);
try {
br.close ();
} catch (ee) {
if (Clazz_exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
return null;
} else {
throw e;
}
}
J.util.Logger.info (temp.size () + " atom types read from " + resourceName);
return temp;
});
$_M(c$, "getAtomTypes", 
function () {
var types =  new JU.List ();
var fileName = "UFF.txt";
try {
var br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
if (line.length > 4 && line.substring (0, 4).equals ("atom")) {
var vs = JU.PT.getTokens (line);
var info = [vs[1], vs[2]];
types.addLast (info);
}}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
} else {
throw e;
}
}
J.util.Logger.info (types.size () + " UFF parameters read");
return (types.size () > 0 ? types : null);
});
Clazz_defineStatics (c$,
"atomTypes", null,
"ffParams", null,
"TOKEN_ELEMENT_ONLY", 0,
"TOKEN_ELEMENT_CHARGED", 1,
"TOKEN_ELEMENT_CONNECTED", 2,
"TOKEN_AROMATIC", 3,
"TOKEN_ELEMENT_SP", 4,
"TOKEN_ELEMENT_ALLYLIC", 6,
"PT_ELEMENT", 2,
"PT_CHARGE", 5,
"PT_CONNECT", 6);
c$.tokenTypes = c$.prototype.tokenTypes = [[J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.n (269484436, 1632634891), J.script.T.i (0), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (0), J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.o (1073741824, "flatring"), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenLeftParen, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (1), J.script.T.tokenComma, J.script.T.o (4, "triple"), J.script.T.tokenRightParen, J.script.T.tokenOr, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (2), J.script.T.tokenComma, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.o (135266310, "connected"), J.script.T.tokenLeftParen, J.script.T.i (1), J.script.T.tokenComma, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (3), J.script.T.tokenRightParen, J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd]];
});
Clazz_declarePackage ("J.minimize.forcefield");
c$ = Clazz_decorateAsClass (function () {
this.key = null;
this.dE = 0;
this.a = null;
this.b = null;
this.c = null;
this.d = null;
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.id = 0;
this.iData = null;
this.dData = null;
this.delta = 0;
this.rab = 0;
this.theta = 0;
this.energy = 0;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "Calculation");
$_M(c$, "getEnergy", 
function () {
return this.energy;
});
$_M(c$, "getPointers", 
function (dataIn) {
this.dData = dataIn[1];
this.iData = dataIn[0];
switch (this.iData.length) {
default:
this.id = this.iData[3];
case 3:
this.ic = this.iData[2];
case 2:
this.ib = this.iData[1];
case 1:
this.ia = this.iData[0];
case 0:
break;
}
}, "~A");
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (["J.minimize.forcefield.Calculation", "JU.AU", "$.SB", "$.V3d"], "J.minimize.forcefield.Calculations", ["java.lang.Float", "J.minimize.Util", "J.util.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.ff = null;
this.calculations = null;
this.atomCount = 0;
this.bondCount = 0;
this.angleCount = 0;
this.torsionCount = 0;
this.minAtoms = null;
this.minBonds = null;
this.minAngles = null;
this.minTorsions = null;
this.minPositions = null;
this.constraints = null;
this.isPreliminary = false;
this.gradients = false;
this.silent = false;
this.logData = null;
this.logging = false;
this.loggingEnabled = false;
if (!Clazz_isClassDefined ("J.minimize.forcefield.Calculations.PairCalc")) {
J.minimize.forcefield.Calculations.$Calculations$PairCalc$ ();
}
this.da = null;
this.db = null;
this.dc = null;
this.dd = null;
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.id = 0;
this.v1 = null;
this.v2 = null;
this.v3 = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "Calculations");
Clazz_prepareFields (c$, function () {
this.calculations = JU.AU.createArrayOfArrayList (7);
this.logData =  new JU.SB ();
this.da =  new JU.V3d ();
this.db =  new JU.V3d ();
this.dc =  new JU.V3d ();
this.dd =  new JU.V3d ();
this.v1 =  new JU.V3d ();
this.v2 =  new JU.V3d ();
this.v3 =  new JU.V3d ();
});
$_M(c$, "setConstraints", 
function (constraints) {
this.constraints = constraints;
}, "JU.List");
Clazz_makeConstructor (c$, 
function (ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
this.ff = ff;
this.minAtoms = minAtoms;
this.minBonds = minBonds;
this.minAngles = minAngles;
this.minTorsions = minTorsions;
this.minPositions = minPositions;
this.atomCount = minAtoms.length;
this.bondCount = minBonds.length;
this.angleCount = minAngles.length;
this.torsionCount = minTorsions.length;
this.constraints = constraints;
}, "J.minimize.forcefield.ForceField,~A,~A,~A,~A,~A,JU.List");
$_M(c$, "addForce", 
function (v, i, dE) {
this.minAtoms[i].force[0] += v.x * dE;
this.minAtoms[i].force[1] += v.y * dE;
this.minAtoms[i].force[2] += v.z * dE;
}, "JU.V3d,~N,~N");
$_M(c$, "setSilent", 
function (TF) {
this.silent = TF;
}, "~B");
$_M(c$, "getLogData", 
function () {
return this.logData.toString ();
});
$_M(c$, "appendLogData", 
function (s) {
this.logData.append (s).append ("\n");
}, "~S");
$_M(c$, "setLoggingEnabled", 
function (TF) {
this.loggingEnabled = TF;
if (this.loggingEnabled) this.logData =  new JU.SB ();
}, "~B");
$_M(c$, "setPreliminary", 
function (TF) {
this.isPreliminary = TF;
}, "~B");
$_M(c$, "pairSearch", 
function (calc1, pc1, calc2, pc2) {
for (var i = 0; i < this.atomCount - 1; i++) {
var bsVdw = this.minAtoms[i].bsVdw;
for (var j = bsVdw.nextSetBit (0); j >= 0; j = bsVdw.nextSetBit (j + 1)) {
pc1.setData (calc1, i, j);
if (pc2 != null) pc2.setData (calc2, i, j);
}
}
}, "JU.List,J.minimize.forcefield.Calculations.PairCalc,JU.List,J.minimize.forcefield.Calculations.PairCalc");
$_M(c$, "calc", 
function (iType, gradients) {
this.logging = this.loggingEnabled && !this.silent;
this.gradients = gradients;
var calcs = this.calculations[iType];
var nCalc;
var energy = 0;
if (calcs == null || (nCalc = calcs.size ()) == 0) return 0;
if (this.logging) this.appendLogData (this.getDebugHeader (iType));
for (var ii = 0; ii < nCalc; ii++) energy += this.compute (iType, this.calculations[iType].get (ii));

if (this.logging) this.appendLogData (this.getDebugFooter (iType, energy));
if (this.constraints != null && iType <= 3) energy += this.constraintEnergy (iType);
return energy;
}, "~N,~B");
$_M(c$, "energyStrBnd", 
function (gradients) {
return 0.0;
}, "~B");
$_M(c$, "energyBond", 
function (gradients) {
return this.calc (0, gradients);
}, "~B");
$_M(c$, "energyAngle", 
function (gradients) {
return this.calc (1, gradients);
}, "~B");
$_M(c$, "energyTorsion", 
function (gradients) {
return this.calc (3, gradients);
}, "~B");
$_M(c$, "energyStretchBend", 
function (gradients) {
return this.calc (2, gradients);
}, "~B");
$_M(c$, "energyOOP", 
function (gradients) {
return this.calc (4, gradients);
}, "~B");
$_M(c$, "energyVDW", 
function (gradients) {
return this.calc (5, gradients);
}, "~B");
$_M(c$, "energyES", 
function (gradients) {
return this.calc (6, gradients);
}, "~B");
$_M(c$, "constraintEnergy", 
function (iType) {
var value = 0;
var k = 0;
var energy = 0;
for (var i = this.constraints.size (); --i >= 0; ) {
var c = this.constraints.get (i);
var nAtoms = (c[0])[0];
if (nAtoms != iType + 2) continue;
var minList = c[1];
var targetValue = (c[2]).doubleValue ();
switch (iType) {
case 3:
this.id = minList[3];
if (this.gradients) this.dd.setA (this.minAtoms[this.id].coord);
case 1:
this.ic = minList[2];
if (this.gradients) this.dc.setA (this.minAtoms[this.ic].coord);
case 0:
this.ib = minList[1];
this.ia = minList[0];
if (this.gradients) {
this.db.setA (this.minAtoms[this.ib].coord);
this.da.setA (this.minAtoms[this.ia].coord);
}}
k = 10000.0;
switch (iType) {
case 3:
targetValue *= 0.017453292519943295;
value = (this.gradients ? J.minimize.Util.restorativeForceAndTorsionAngleRadians (this.da, this.db, this.dc, this.dd) : J.minimize.Util.getTorsionAngleRadians (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord, this.minAtoms[this.ic].coord, this.minAtoms[this.id].coord, this.v1, this.v2, this.v3));
if (value < 0 && targetValue >= 1.5707963267948966) value += 6.283185307179586;
 else if (value > 0 && targetValue <= -1.5707963267948966) targetValue += 6.283185307179586;
break;
case 1:
targetValue *= 0.017453292519943295;
value = (this.gradients ? J.minimize.Util.restorativeForceAndAngleRadians (this.da, this.db, this.dc) : J.minimize.Util.getAngleRadiansABC (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord, this.minAtoms[this.ic].coord));
break;
case 0:
value = (this.gradients ? J.minimize.Util.restorativeForceAndDistance (this.da, this.db, this.dc) : Math.sqrt (J.minimize.Util.distance2 (this.minAtoms[this.ia].coord, this.minAtoms[this.ib].coord)));
break;
}
energy += this.constrainQuadratic (value, targetValue, k, iType);
}
return energy;
}, "~N");
$_M(c$, "constrainQuadratic", 
function (value, targetValue, k, iType) {
if (!J.minimize.Util.isFinite (value)) return 0;
var delta = value - targetValue;
if (this.gradients) {
var dE = 2.0 * k * delta;
switch (iType) {
case 3:
this.addForce (this.dd, this.id, dE);
case 1:
this.addForce (this.dc, this.ic, dE);
case 0:
this.addForce (this.db, this.ib, dE);
this.addForce (this.da, this.ia, dE);
}
}return k * delta * delta;
}, "~N,~N,~N,~N");
$_M(c$, "getConstraintList", 
function () {
if (this.constraints == null || this.constraints.size () == 0) return;
this.appendLogData ("C O N S T R A I N T S\n---------------------");
for (var i = this.constraints.size (); --i >= 0; ) {
var c = this.constraints.get (i);
var indexes = c[0];
var minList = c[1];
var targetValue = (c[2]).doubleValue ();
var iType = indexes[0] - 2;
switch (iType) {
case 3:
this.id = minList[3];
case 1:
this.ic = minList[2];
case 0:
this.ib = minList[1];
this.ia = minList[0];
}
switch (iType) {
case 0:
this.appendLogData (J.util.Txt.sprintf ("%3d %3d  %-5s %-5s  %12.6f", "ssFI", [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), [targetValue], [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber ()]]));
break;
case 1:
this.appendLogData (J.util.Txt.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %12.6f", "sssFI", [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (), [targetValue], [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber ()]]));
break;
case 3:
this.appendLogData (J.util.Txt.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI", [this.minAtoms[this.ia].atom.getAtomName (), this.minAtoms[this.ib].atom.getAtomName (), this.minAtoms[this.ic].atom.getAtomName (), this.minAtoms[this.id].atom.getAtomName (), [targetValue], [this.minAtoms[this.ia].atom.getAtomNumber (), this.minAtoms[this.ib].atom.getAtomNumber (), this.minAtoms[this.ic].atom.getAtomNumber (), this.minAtoms[this.id].atom.getAtomNumber ()]]));
break;
}
}
this.appendLogData ("---------------------\n");
});
$_M(c$, "getAtomList", 
function (title) {
var trailer = "-----------------------------------------------------------------------------------------------\n";
var sb =  new JU.SB ();
sb.append ("\n" + title + "\n\n" + " ATOM    X        Y        Z    TYPE     GRADX    GRADY    GRADZ  " + "---------BONDED ATOMS--------\n" + trailer);
for (var i = 0; i < this.atomCount; i++) {
var atom = this.minAtoms[i];
var others = atom.getBondedAtomIndexes ();
var iVal =  Clazz_newIntArray (others.length + 1, 0);
iVal[0] = atom.atom.getAtomNumber ();
var s = "   ";
for (var j = 0; j < others.length; j++) {
s += " %3d";
iVal[j + 1] = this.minAtoms[others[j]].atom.getAtomNumber ();
}
sb.append (J.util.Txt.sprintf ("%3d %8.3f %8.3f %8.3f  %-5s %8.3f %8.3f %8.3f" + s + "\n", "sFI", [atom.sType, [atom.coord[0], atom.coord[1], atom.coord[2], atom.force[0], atom.force[1], atom.force[2]], iVal]));
}
sb.append (trailer + "\n\n");
return sb.toString ();
}, "~S");
$_M(c$, "getDebugHeader2", 
function (iType) {
switch (iType) {
case -1:
break;
case 0:
return "\nB O N D   S T R E T C H I N G (" + this.bondCount + " bonds)\n\n" + "  ATOMS  ATOM TYPES   BOND    BOND       IDEAL      FORCE\n" + "  I   J   I     J     TYPE   LENGTH     LENGTH    CONSTANT      DELTA     ENERGY\n" + "--------------------------------------------------------------------------------";
case 1:
return "\nA N G L E   B E N D I N G (" + this.minAngles.length + " angles)\n\n" + "    ATOMS      ATOM TYPES        VALENCE    IDEAL        FORCE\n" + "  I   J   K   I     J     K       ANGLE     ANGLE      CONSTANT     ENERGY\n" + "--------------------------------------------------------------------------";
case 2:
return "\nS T R E T C H   B E N D I N G (" + (this.minAngles.length * 2) + " angles)\n\n" + "    ATOMS      ATOM TYPES        VALENCE    IDEAL        FORCE\n" + "  I   J   K   I     J     K       ANGLE     ANGLE      CONSTANT     ENERGY\n" + "--------------------------------------------------------------------------";
case 3:
return "\nT O R S I O N A L (" + this.minTorsions.length + " torsions)\n\n" + "      ATOMS           ATOM TYPES            n    COS          FORCE      TORSION\n" + "  I   J   K   L   I     J     K     L          (n phi0)      CONSTANT     ANGLE        ENERGY\n" + "---------------------------------------------------------------------------------------------";
case 4:
return "\nO U T - O F - P L A N E   B E N D I N G\n\n      ATOMS           ATOM TYPES             OOP        FORCE \n  I   J   K   L   I     J     K     L       ANGLE     CONSTANT      ENERGY\n--------------------------------------------------------------------------";
case 5:
return "\nV A N   D E R   W A A L S  (partial list)\n\n  ATOMS  ATOM TYPES\n  I   J   I     J      Rij       kij     ENERGY\n-----------------------------------------------";
case 6:
return "\nE L E C T R O S T A T I C   I N T E R A C T I O N S  (partial list)\n\n  ATOMS  ATOM TYPES \n  I   J   I     J      Rij      f          Qi          Qj    ENERGY\n-------------------------------------------------------------------";
}
return "";
}, "~N");
$_M(c$, "getDebugLine", 
function (iType, c) {
return this.getDebugLineC (iType, c);
}, "~N,J.minimize.forcefield.Calculation");
$_M(c$, "getDebugLineC", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 0:
return J.util.Txt.sprintf ("%3d %3d  %-5s %-5s  %4.2f%8.3f   %8.3f     %8.3f   %8.3f   %8.3f", "ssFI", [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, [0, c.rab, c.dData[1], c.dData[0], c.delta, energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()]]);
case 1:
case 2:
return J.util.Txt.sprintf ("%3d %3d %3d  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "sssFI", [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()]]);
case 3:
return J.util.Txt.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %3d %8.3f     %8.3f     %8.3f     %8.3f", "ssssFI", [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType, [c.dData[1], c.dData[0], (c.theta * 57.29577951308232), energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber (), c.iData[4]]]);
case 4:
return J.util.Txt.sprintf ("%3d %3d %3d %3d  %-5s %-5s %-5s %-5s  %8.3f   %8.3f     %8.3f", "ssssFI", [this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType, [(c.theta * 57.29577951308232), c.dData[0], energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber (), this.minAtoms[c.id].atom.getAtomNumber ()]]);
case 5:
return J.util.Txt.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f", "ssFI", [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType, [c.rab, c.dData[0], energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()]]);
case 6:
return J.util.Txt.sprintf ("%3d %3d  %-5s %-5s %6.3f  %8.3f  %8.3f  %8.3f  %8.3f", "ssFI", [this.minAtoms[c.iData[0]].sType, this.minAtoms[c.iData[1]].sType, [c.rab, c.dData[0], c.dData[1], c.dData[2], energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber ()]]);
}
return "";
}, "~N,J.minimize.forcefield.Calculation");
$_M(c$, "getDebugFooter", 
function (iType, energy) {
var s = "";
switch (iType) {
case 0:
s = "BOND STRETCHING";
break;
case 1:
s = "ANGLE BENDING";
break;
case 3:
s = "TORSIONAL";
break;
case 4:
s = "OUT-OF-PLANE BENDING";
break;
case 2:
s = "STRETCH BENDING";
break;
case 5:
s = "VAN DER WAALS";
break;
case 6:
s = "ELECTROSTATIC ENERGY";
break;
}
return J.util.Txt.sprintf ("\n     TOTAL %s ENERGY = %8.3f %s/mol\n", "sfs", [s, Float.$valueOf (this.ff.toUserUnits (energy)), this.ff.minimizer.units]);
}, "~N,~N");
$_M(c$, "setPairVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 2);
c.rab = J.minimize.Util.restorativeForceAndDistance (this.da, this.db, this.dc);
} else {
c.rab = Math.sqrt (J.minimize.Util.distance2 (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord));
}if (J.minimize.Util.isNearZero2 (c.rab, 1.0e-3)) c.rab = 1.0e-3;
}, "J.minimize.forcefield.Calculation");
$_M(c$, "setAngleVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 3);
c.theta = J.minimize.Util.restorativeForceAndAngleRadians (this.da, this.db, this.dc);
} else {
c.theta = J.minimize.Util.getAngleRadiansABC (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord);
}if (!J.minimize.Util.isFinite (c.theta)) c.theta = 0.0;
}, "J.minimize.forcefield.Calculation");
$_M(c$, "setOopVariables", 
function (c, fixTheta) {
this.setCoords (c, 4);
if (this.gradients) {
c.theta = J.minimize.Util.restorativeForceAndOutOfPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3);
} else {
c.theta = J.minimize.Util.pointPlaneAngleRadians (this.da, this.db, this.dc, this.dd, this.v1, this.v2, this.v3, fixTheta);
}if (!J.minimize.Util.isFinite (c.theta)) c.theta = 0.0;
}, "J.minimize.forcefield.Calculation,~B");
$_M(c$, "setTorsionVariables", 
function (c) {
if (this.gradients) {
this.setCoords (c, 4);
c.theta = J.minimize.Util.restorativeForceAndTorsionAngleRadians (this.da, this.db, this.dc, this.dd);
if (!J.minimize.Util.isFinite (c.theta)) c.theta = 1.7453292519943296E-5;
} else {
c.theta = J.minimize.Util.getTorsionAngleRadians (this.minAtoms[c.ia].coord, this.minAtoms[c.ib].coord, this.minAtoms[c.ic].coord, this.minAtoms[c.id].coord, this.v1, this.v2, this.v3);
}}, "J.minimize.forcefield.Calculation");
$_M(c$, "setCoords", 
function (c, n) {
switch (n) {
case 4:
this.da.setA (this.minAtoms[c.ia].coord);
case 3:
this.db.setA (this.minAtoms[c.ib].coord);
case 2:
this.dc.setA (this.minAtoms[c.ic].coord);
case 1:
this.dd.setA (this.minAtoms[c.id].coord);
}
}, "J.minimize.forcefield.Calculation,~N");
$_M(c$, "addForces", 
function (c, n) {
switch (n) {
case 4:
this.addForce (this.dd, c.id, c.dE);
case 3:
this.addForce (this.dc, c.ic, c.dE);
case 2:
this.addForce (this.db, c.ib, c.dE);
case 1:
this.addForce (this.da, c.ia, c.dE);
}
}, "J.minimize.forcefield.Calculation,~N");
c$.$Calculations$PairCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.Calculations, "PairCalc", J.minimize.forcefield.Calculation);
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"RAD_TO_DEG", (57.29577951308232),
"DEG_TO_RAD", (0.017453292519943295),
"KCAL_TO_KJ", 4.1868,
"CALC_DISTANCE", 0,
"CALC_ANGLE", 1,
"CALC_STRETCH_BEND", 2,
"CALC_TORSION", 3,
"CALC_OOP", 4,
"CALC_VDW", 5,
"CALC_ES", 6,
"CALC_MAX", 7,
"PI_OVER_2", 1.5707963267948966,
"TWO_PI", 6.283185307179586);
});
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (["J.minimize.forcefield.Calculation", "$.Calculations"], "J.minimize.forcefield.CalculationsMMFF", ["JU.List", "J.minimize.MinAtom", "$.MinObject", "J.util.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.ffParams = null;
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
this.esCalc = null;
this.sbCalc = null;
this.mmff = null;
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.DistanceCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$DistanceCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.AngleCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$AngleCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.SBCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$SBCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.TorsionCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$TorsionCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.OOPCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$OOPCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.VDWCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$VDWCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsMMFF.ESCalc")) {
J.minimize.forcefield.CalculationsMMFF.$CalculationsMMFF$ESCalc$ ();
}
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "CalculationsMMFF", J.minimize.forcefield.Calculations);
Clazz_makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz_superConstructor (this, J.minimize.forcefield.CalculationsMMFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
this.mmff = ff;
this.ffParams = ffParams;
this.bondCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.DistanceCalc, this, null);
this.angleCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.AngleCalc, this, null);
this.sbCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.SBCalc, this, null);
this.torsionCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.TorsionCalc, this, null);
this.oopCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.OOPCalc, this, null);
this.vdwCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.VDWCalc, this, null);
this.esCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.ESCalc, this, null);
}, "J.minimize.forcefield.ForceField,java.util.Map,~A,~A,~A,~A,~A,JU.List");
$_V(c$, "getUnits", 
function () {
return "kcal";
});
$_V(c$, "setupCalculations", 
function () {
var calc;
var distanceCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.DistanceCalc, this, null);
calc = this.calculations[0] =  new JU.List ();
for (var i = 0; i < this.bondCount; i++) distanceCalc.setData (calc, this.minBonds[i]);

calc = this.calculations[1] =  new JU.List ();
var angleCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.AngleCalc, this, null);
for (var i = 0; i < this.angleCount; i++) angleCalc.setData (calc, this.minAngles[i]);

calc = this.calculations[2] =  new JU.List ();
var sbCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.SBCalc, this, null);
for (var i = 0; i < this.angleCount; i++) sbCalc.setData (calc, this.minAngles[i]);

calc = this.calculations[3] =  new JU.List ();
var torsionCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.TorsionCalc, this, null);
for (var i = 0; i < this.torsionCount; i++) torsionCalc.setData (calc, this.minTorsions[i]);

calc = this.calculations[4] =  new JU.List ();
var oopCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.OOPCalc, this, null);
for (var i = 0; i < this.atomCount; i++) if (J.minimize.forcefield.CalculationsMMFF.isInvertible (this.minAtoms[i])) oopCalc.setData (calc, i);

this.pairSearch (this.calculations[5] =  new JU.List (), Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.VDWCalc, this, null), this.calculations[6] =  new JU.List (), Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsMMFF.ESCalc, this, null));
return true;
});
$_M(c$, "isLinear", 
function (i) {
return J.minimize.MinAtom.isLinear (this.minAtoms[i]);
}, "~N");
c$.isInvertible = $_M(c$, "isInvertible", 
function (a) {
switch (a.ffType) {
default:
return false;
case 2:
case 3:
case 10:
case 30:
case 37:
case 39:
case 40:
case 41:
case 45:
case 49:
case 54:
case 55:
case 56:
case 57:
case 58:
case 63:
case 64:
case 67:
case 69:
case 78:
case 80:
case 81:
return true;
}
}, "J.minimize.MinAtom");
$_V(c$, "compute", 
function (iType, dataIn) {
switch (iType) {
case 0:
return this.bondCalc.compute (dataIn);
case 1:
return this.angleCalc.compute (dataIn);
case 2:
return this.sbCalc.compute (dataIn);
case 3:
return this.torsionCalc.compute (dataIn);
case 4:
return this.oopCalc.compute (dataIn);
case 5:
return this.vdwCalc.compute (dataIn);
case 6:
return this.esCalc.compute (dataIn);
}
return 0.0;
}, "~N,~A");
$_M(c$, "getParameterObj", 
function (a) {
return (a.key == null || a.ddata != null ? a.ddata : this.ffParams.get (a.key));
}, "J.minimize.MinObject");
$_M(c$, "getParameter", 
function (key) {
return this.ffParams.get (key);
}, "Integer");
$_V(c$, "getDebugHeader", 
function (iType) {
switch (iType) {
case -1:
return "MMFF94 Force Field -- T. A. Halgren, J. Comp. Chem. 5 & 6 490-519ff (1996).\n";
case 3:
return "\nT O R S I O N A L (" + this.minTorsions.length + " torsions)\n\n" + "      ATOMS           ATOM TYPES          TORSION\n" + "  I   J   K   L   I     J     K     L      ANGLE       V1       V2       V3     ENERGY\n" + "--------------------------------------------------------------------------------------\n";
default:
return this.getDebugHeader2 (iType);
}
}, "~N");
$_V(c$, "getDebugLine", 
function (iType, c) {
var energy = this.ff.toUserUnits (c.energy);
switch (iType) {
case 1:
case 2:
return J.util.Txt.sprintf ("%15s  %-5s %-5s %-5s  %8.3f  %8.3f     %8.3f   %8.3f", "ssssFI", [J.minimize.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, [(c.theta * 57.29577951308232), c.dData[1], c.dData[0], energy], [this.minAtoms[c.ia].atom.getAtomNumber (), this.minAtoms[c.ib].atom.getAtomNumber (), this.minAtoms[c.ic].atom.getAtomNumber ()]]);
case 3:
return J.util.Txt.sprintf ("%15s  %-5s %-5s %-5s %-5s  %8.3f %8.3f %8.3f %8.3f %8.3f", "sssssF", [J.minimize.MinObject.decodeKey (c.key), this.minAtoms[c.ia].sType, this.minAtoms[c.ib].sType, this.minAtoms[c.ic].sType, this.minAtoms[c.id].sType, [(c.theta * 57.29577951308232), c.dData[0], c.dData[1], c.dData[2], energy]]);
default:
return this.getDebugLineC (iType, c);
}
}, "~N,J.minimize.forcefield.Calculation");
c$.$CalculationsMMFF$DistanceCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.r0 = 0;
this.kb = 0;
this.delta2 = 0;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "DistanceCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
this.ia = b.data[0];
this.ib = b.data[1];
var c = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (b);
if (c == null) return;
a.addLast ([[this.ia, this.ib], c]);
}, "JU.List,J.minimize.MinBond");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
this.kb = this.dData[0];
this.r0 = this.dData[1];
this.b$["J.minimize.forcefield.CalculationsMMFF"].setPairVariables (this);
this.delta = this.rab - this.r0;
this.delta2 = this.delta * this.delta;
this.energy = 71.96625 * this.kb * this.delta2 * (1 + -2.0 * this.delta + 2.3333333333333335 * (this.delta2));
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
this.dE = 71.96625 * this.kb * this.delta * (2 + 3 * -2.0 * this.delta + 4 * 2.3333333333333335 * this.delta2);
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 2);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (0, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"FSTRETCH", 71.96625,
"CS", -2.0,
"CS2", (2.3333333333333335));
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$AngleCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "AngleCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
var c = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (b);
if (c == null) return;
a.addLast ([b.data, c, b.key]);
}, "JU.List,J.minimize.MinAngle");
$_V(c$, "compute", 
function (a) {
this.key = a[2];
this.getPointers (a);
var b = this.dData[0];
var c = this.dData[1];
this.b$["J.minimize.forcefield.CalculationsMMFF"].setAngleVariables (this);
var d = (this.theta * 57.29577951308232 - c);
if (c == 180) {
this.energy = 143.9325 * b * (1 + Math.cos (this.theta));
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) this.dE = -143.9325 * b * Math.sin (this.theta);
} else {
this.energy = 0.021922 * b * Math.pow (d, 2) * (1 + -0.006981317007977318 * d);
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) this.dE = 0.021922 * b * d * (2 + 3 * -0.006981317007977318 * d);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 3);
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (1, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"CB", -0.006981317007977318);
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$SBCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "SBCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].isLinear (b.data[1])) return;
var c = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameter (b.sbKey);
var d = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (b);
var e = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (this.b$["J.minimize.forcefield.CalculationsMMFF"].minBonds[b.data[3]]);
var f = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (this.b$["J.minimize.forcefield.CalculationsMMFF"].minBonds[b.data[4]]);
if (c == null || d == null || e == null || f == null) return;
var g = d[1];
var h = e[1];
var i = f[1];
a.addLast ([b.data, [c[0], g, h]]);
a.addLast ([[b.data[2], b.data[1], b.data[0]], [c[1], g, i]]);
}, "JU.List,J.minimize.MinAngle");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = 2.51210 * this.dData[0];
var c = this.dData[1];
var d = this.dData[2];
this.b$["J.minimize.forcefield.CalculationsMMFF"].setPairVariables (this);
this.b$["J.minimize.forcefield.CalculationsMMFF"].setAngleVariables (this);
var e = this.rab - d;
this.delta = this.theta * 57.29577951308232 - c;
this.energy = b * e * this.delta;
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (2, this));
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
this.dE = b * e;
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 3);
this.b$["J.minimize.forcefield.CalculationsMMFF"].setPairVariables (this);
this.dE = b * this.delta;
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 2);
}return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$TorsionCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "TorsionCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].isLinear (b.data[1]) || this.b$["J.minimize.forcefield.CalculationsMMFF"].isLinear (b.data[2])) return;
var c = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameterObj (b);
if (c == null) return;
a.addLast ([b.data, c, b.key]);
}, "JU.List,J.minimize.MinTorsion");
$_V(c$, "compute", 
function (a) {
this.key = a[2];
this.getPointers (a);
var b = this.dData[0];
var c = this.dData[1];
var d = this.dData[2];
this.b$["J.minimize.forcefield.CalculationsMMFF"].setTorsionVariables (this);
var e = Math.cos (this.theta);
var f = e * e;
this.energy = 0.5 * (b * (1 + e) + c * (2 - 2 * f) + d * (1 + e * (4 * f - 3)));
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
var g = Math.sin (this.theta);
this.dE = 0.5 * (-b * g + 4 * c * g * e + 3 * d * g * (1 - 4 * f));
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 4);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (3, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$OOPCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.list = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "OOPCalc", J.minimize.forcefield.Calculation);
Clazz_prepareFields (c$, function () {
this.list =  Clazz_newIntArray (4, 0);
});
$_M(c$, "setData", 
function (a, b) {
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b].nBonds != 3) return;
var c = this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b].getBondedAtomIndexes ();
this.list[0] = c[2];
this.list[1] = b;
this.list[2] = c[1];
this.list[3] = c[0];
var d = this.b$["J.minimize.forcefield.CalculationsMMFF"].mmff.getOutOfPlaneParameter (this.list);
if (d == 0) return;
var e = [d];
a.addLast ([[c[0], b, c[1], c[2]], e]);
a.addLast ([[c[1], b, c[2], c[0]], e]);
a.addLast ([[c[2], b, c[0], c[1]], e]);
}, "JU.List,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
this.b$["J.minimize.forcefield.CalculationsMMFF"].setOopVariables (this, false);
var b = this.dData[0];
this.energy = 71.96568080495746 * b * this.theta * this.theta;
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
this.dE = 2.5120761569715815 * b * this.theta;
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 4);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (4, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"FOOPD", 2.5120761569715815,
"FOOP", 71.96568080495746);
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$VDWCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "VDWCalc", J.minimize.forcefield.Calculations.PairCalc, null, Clazz_innerTypeInstance (J.minimize.forcefield.Calculations.PairCalc, this, null, Clazz_inheritArgs));
$_V(c$, "setData", 
function (a, b, c) {
this.a = this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b];
this.b = this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[c];
var d = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameter (this.a.vdwKey);
var e = this.b$["J.minimize.forcefield.CalculationsMMFF"].getParameter (this.b.vdwKey);
if (d == null || e == null) return;
var f = d[0];
var g = d[1];
var h = d[2];
var i = d[3];
var j = Clazz_doubleToInt (d[4]);
var k = e[0];
var l = e[1];
var m = e[2];
var n = e[3];
var o = Clazz_doubleToInt (e[4]);
var p = h * Math.pow (f, 0.25);
var q = m * Math.pow (k, 0.25);
var r = (p - q) / (p + q);
var s = 0.5 * (p + q);
if (j != 68 && o != 68) s *= (1.0 + 0.2 * (1.0 - Math.exp (-12.0 * r * r)));
var t = ((181.16 * i * n * f * k) / (Math.sqrt (f / g) + Math.sqrt (k / l))) * Math.pow (s, -6.0);
if (j + o == 133) {
s *= 0.8;
t *= 0.5;
}a.addLast ([[b, c], [s, t]]);
}, "JU.List,~N,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
this.b$["J.minimize.forcefield.CalculationsMMFF"].setPairVariables (this);
var b = this.dData[0];
var c = this.dData[1];
var d = this.rab / b;
var e = 1.07 / (d + 0.07);
var f = 1.12 / (Math.pow (d, 7) + 0.12);
this.energy = c * Math.pow (e, 7) * (f - 2);
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
this.dE = -7 * c * Math.pow (e, 7) / b * (e / 1.07 * (f - 2) + f * f * Math.pow (d, 6));
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 2);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging && Math.abs (this.energy) > 0.1) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (5, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsMMFF$ESCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsMMFF, "ESCalc", J.minimize.forcefield.Calculations.PairCalc, null, Clazz_innerTypeInstance (J.minimize.forcefield.Calculations.PairCalc, this, null, Clazz_inheritArgs));
$_V(c$, "setData", 
function (a, b, c) {
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b].partialCharge == 0 || this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[c].partialCharge == 0) return;
a.addLast ([[b, c], [this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b].partialCharge, this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[c].partialCharge, (this.b$["J.minimize.forcefield.CalculationsMMFF"].minAtoms[b].bs14.get (c) ? 249.0537 : 332.0716)]]);
}, "JU.List,~N,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = this.dData[0] * this.dData[1] * this.dData[2];
this.b$["J.minimize.forcefield.CalculationsMMFF"].setPairVariables (this);
var c = this.rab + 0.05;
this.energy = b / c;
if (this.b$["J.minimize.forcefield.CalculationsMMFF"].gradients) {
this.dE = -this.energy / c;
this.b$["J.minimize.forcefield.CalculationsMMFF"].addForces (this, 2);
}if (this.b$["J.minimize.forcefield.CalculationsMMFF"].logging && Math.abs (this.energy) > 20) this.b$["J.minimize.forcefield.CalculationsMMFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsMMFF"].getDebugLine (6, this));
return this.energy;
}, "~A");
Clazz_defineStatics (c$,
"BUFF", 0.05);
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"FPAR", 143.9325,
"DA_D", 'D',
"DA_DA", 133);
});
Clazz_declarePackage ("J.minimize.forcefield");
Clazz_load (["J.minimize.forcefield.Calculation", "$.Calculations"], "J.minimize.forcefield.CalculationsUFF", ["JU.List", "J.minimize.Util"], function () {
c$ = Clazz_decorateAsClass (function () {
this.ffParams = null;
this.parA = null;
this.parB = null;
this.parC = null;
this.bondCalc = null;
this.angleCalc = null;
this.torsionCalc = null;
this.oopCalc = null;
this.vdwCalc = null;
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsUFF.DistanceCalc")) {
J.minimize.forcefield.CalculationsUFF.$CalculationsUFF$DistanceCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsUFF.AngleCalc")) {
J.minimize.forcefield.CalculationsUFF.$CalculationsUFF$AngleCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsUFF.TorsionCalc")) {
J.minimize.forcefield.CalculationsUFF.$CalculationsUFF$TorsionCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsUFF.OOPCalc")) {
J.minimize.forcefield.CalculationsUFF.$CalculationsUFF$OOPCalc$ ();
}
if (!Clazz_isClassDefined ("J.minimize.forcefield.CalculationsUFF.VDWCalc")) {
J.minimize.forcefield.CalculationsUFF.$CalculationsUFF$VDWCalc$ ();
}
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "CalculationsUFF", J.minimize.forcefield.Calculations);
Clazz_makeConstructor (c$, 
function (ff, ffParams, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints) {
Clazz_superConstructor (this, J.minimize.forcefield.CalculationsUFF, [ff, minAtoms, minBonds, minAngles, minTorsions, minPositions, constraints]);
this.ffParams = ffParams;
this.bondCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.DistanceCalc, this, null);
this.angleCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.AngleCalc, this, null);
this.torsionCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.TorsionCalc, this, null);
this.oopCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.OOPCalc, this, null);
this.vdwCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.VDWCalc, this, null);
}, "J.minimize.forcefield.ForceField,java.util.Map,~A,~A,~A,~A,~A,JU.List");
$_V(c$, "getUnits", 
function () {
return "kJ";
});
$_V(c$, "setupCalculations", 
function () {
var calc;
var distanceCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.DistanceCalc, this, null);
calc = this.calculations[0] =  new JU.List ();
for (var i = 0; i < this.bondCount; i++) {
var bond = this.minBonds[i];
var bondOrder = bond.order;
if (bond.isAromatic) bondOrder = 1.5;
if (bond.isAmide) bondOrder = 1.41;
distanceCalc.setData (calc, bond.data[0], bond.data[1], bondOrder);
}
calc = this.calculations[1] =  new JU.List ();
var angleCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.AngleCalc, this, null);
for (var i = this.minAngles.length; --i >= 0; ) angleCalc.setData (calc, this.minAngles[i].data);

calc = this.calculations[3] =  new JU.List ();
var torsionCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.TorsionCalc, this, null);
for (var i = this.minTorsions.length; --i >= 0; ) torsionCalc.setData (calc, this.minTorsions[i].data);

calc = this.calculations[4] =  new JU.List ();
var oopCalc = Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.OOPCalc, this, null);
var elemNo;
for (var i = 0; i < this.atomCount; i++) {
var a = this.minAtoms[i];
if (a.nBonds == 3 && J.minimize.forcefield.CalculationsUFF.isInvertible (elemNo = a.atom.getElementNumber ())) oopCalc.setData (calc, i, elemNo);
}
this.pairSearch (this.calculations[5] =  new JU.List (), Clazz_innerTypeInstance (J.minimize.forcefield.CalculationsUFF.VDWCalc, this, null), null, null);
return true;
});
c$.isInvertible = $_M(c$, "isInvertible", 
function (n) {
switch (n) {
case 6:
case 7:
case 8:
case 15:
case 33:
case 51:
case 83:
return true;
default:
return false;
}
}, "~N");
c$.calculateR0 = $_M(c$, "calculateR0", 
function (ri, rj, chiI, chiJ, bondorder) {
var rbo = -0.1332 * (ri + rj) * Math.log (bondorder);
var dchi = Math.sqrt (chiI) - Math.sqrt (chiJ);
var ren = ri * rj * dchi * dchi / (chiI * ri + chiJ * rj);
return (ri + rj + rbo - ren);
}, "~N,~N,~N,~N,~N");
$_V(c$, "compute", 
function (iType, dataIn) {
switch (iType) {
case 0:
return this.bondCalc.compute (dataIn);
case 1:
return this.angleCalc.compute (dataIn);
case 3:
return this.torsionCalc.compute (dataIn);
case 4:
return this.oopCalc.compute (dataIn);
case 5:
return this.vdwCalc.compute (dataIn);
}
return 0.0;
}, "~N,~A");
$_M(c$, "getParameter", 
function (a) {
return this.ffParams.get (a);
}, "~O");
$_V(c$, "getDebugHeader", 
function (iType) {
switch (iType) {
case -1:
return "Universal Force Field -- Rappe, A. K., et. al.; J. Am. Chem. Soc. (1992) 114(25) p. 10024-10035\n";
default:
return this.getDebugHeader2 (iType);
}
}, "~N");
c$.$CalculationsUFF$DistanceCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.r0 = 0;
this.kb = 0;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsUFF, "DistanceCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b, c, d) {
this.b$["J.minimize.forcefield.CalculationsUFF"].parA = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[b].sType);
this.b$["J.minimize.forcefield.CalculationsUFF"].parB = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[c].sType);
this.r0 = J.minimize.forcefield.CalculationsUFF.calculateR0 (this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[8], this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[8], d);
this.kb = 1390.2842991599998 * this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[5] * this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[5] / (this.r0 * this.r0 * this.r0);
a.addLast ([[b, c], [this.r0, this.kb, d]]);
}, "JU.List,~N,~N,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
this.r0 = this.dData[0];
this.kb = this.dData[1];
this.b$["J.minimize.forcefield.CalculationsUFF"].setPairVariables (this);
this.delta = this.rab - this.r0;
this.energy = this.kb * this.delta * this.delta;
if (this.b$["J.minimize.forcefield.CalculationsUFF"].gradients) {
this.dE = 2.0 * this.kb * this.delta;
this.b$["J.minimize.forcefield.CalculationsUFF"].addForces (this, 2);
}if (this.b$["J.minimize.forcefield.CalculationsUFF"].logging) this.b$["J.minimize.forcefield.CalculationsUFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsUFF"].getDebugLine (0, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsUFF$AngleCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsUFF, "AngleCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
this.a = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ia = b[0]];
this.b = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ib = b[1]];
this.c = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ic = b[2]];
var c = (this.a.sType === "H_" && this.c.sType === "H_" ? 10 : 1);
this.b$["J.minimize.forcefield.CalculationsUFF"].parA = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.a.sType);
this.b$["J.minimize.forcefield.CalculationsUFF"].parB = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.b.sType);
this.b$["J.minimize.forcefield.CalculationsUFF"].parC = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.c.sType);
var d = this.b$["J.minimize.forcefield.CalculationsUFF"].parB.iVal[0];
var e = this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[5];
var f = this.b$["J.minimize.forcefield.CalculationsUFF"].parC.dVal[5];
var g = this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[1];
var h = Math.cos (g);
var i = Math.sin (g);
var j;
var k;
var l;
switch (d) {
case 1:
case 2:
case 4:
case 6:
j = k = l = 0;
break;
default:
l = 1.0 / (4.0 * i * i);
k = -4.0 * l * h;
j = l * (2.0 * h * h + 1.0);
}
var m = this.a.getBondTo (this.ib);
var n = m.order;
if (m.isAromatic) n = 1.5;
if (m.isAmide) n = 1.41;
this.rab = J.minimize.forcefield.CalculationsUFF.calculateR0 (this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parA.dVal[8], this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[8], n);
m = this.c.getBondTo (this.ib);
n = m.order;
if (m.isAromatic) n = 1.5;
if (m.isAmide) n = 1.41;
var o = J.minimize.forcefield.CalculationsUFF.calculateR0 (this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parC.dVal[0], this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[8], this.b$["J.minimize.forcefield.CalculationsUFF"].parC.dVal[8], n);
var p = Math.sqrt (this.rab * this.rab + o * o - 2.0 * this.rab * o * h);
var q = (2696.8016159999997) * (e * f / (Math.pow (p, 5.0))) * (3.0 * this.rab * o * (1.0 - h * h) - p * p * h);
a.addLast ([[this.ia, this.ib, this.ic, d], [q, g * 57.29577951308232, j - l, k, 2 * l, c * q]]);
}, "JU.List,~A");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = this.iData[3];
var c = (this.b$["J.minimize.forcefield.CalculationsUFF"].isPreliminary ? this.dData[5] : this.dData[0]);
var d = this.dData[2];
var e = this.dData[3];
var f = this.dData[4];
this.b$["J.minimize.forcefield.CalculationsUFF"].setAngleVariables (this);
if ((b == 4 || b == 6) && (this.theta > 2.35619 || this.theta < 0.785398)) b = 1;
var g = Math.cos (this.theta);
var h = Math.sin (this.theta);
switch (b) {
case 0:
case 1:
this.energy = c * (1.0 + g) * (1.0 + g) / 4.0;
break;
case 2:
this.energy = c * (1.0 + (4.0 * g) * (1.0 + g)) / 9.0;
break;
case 4:
case 6:
this.energy = c * g * g;
break;
default:
this.energy = c * (d + e * g + f * g * g);
}
if (this.b$["J.minimize.forcefield.CalculationsUFF"].gradients) {
switch (b) {
case 0:
case 1:
this.dE = -0.5 * c * h * (1 + g);
break;
case 2:
this.dE = -4.0 * h * c * (1.0 - 2.0 * g) / 9.0;
break;
case 4:
case 6:
this.dE = -c * h * g;
break;
default:
this.dE = -c * (e * h - 2.0 * f * g * h);
}
this.b$["J.minimize.forcefield.CalculationsUFF"].addForces (this, 3);
}if (this.b$["J.minimize.forcefield.CalculationsUFF"].logging) this.b$["J.minimize.forcefield.CalculationsUFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsUFF"].getDebugLine (1, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsUFF$TorsionCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsUFF, "TorsionCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b) {
var c = -1;
var d = 0;
var e = 0;
this.a = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ia = b[0]];
this.b = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ib = b[1]];
this.c = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ic = b[2]];
this.d = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.id = b[3]];
var f = this.c.getBondTo (this.ib);
var g = f.order;
if (f.isAromatic) g = 1.5;
if (f.isAmide) g = 1.41;
this.b$["J.minimize.forcefield.CalculationsUFF"].parB = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.b.sType);
this.b$["J.minimize.forcefield.CalculationsUFF"].parC = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.c.sType);
switch (this.b$["J.minimize.forcefield.CalculationsUFF"].parB.iVal[0] * this.b$["J.minimize.forcefield.CalculationsUFF"].parC.iVal[0]) {
case 9:
d = 3;
var h = this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[6];
var i = this.b$["J.minimize.forcefield.CalculationsUFF"].parC.dVal[6];
var j = 0;
switch (this.b.atom.getElementNumber ()) {
case 8:
j = 2.0;
break;
case 16:
case 34:
case 52:
case 84:
j = 6.8;
}
if (j != 0) switch (this.c.atom.getElementNumber ()) {
case 8:
h = j;
i = 2.0;
d = 2;
break;
case 16:
case 34:
case 52:
case 84:
h = j;
i = 6.8;
d = 2;
}
e = 0.5 * 4.1868 * Math.sqrt (h * i);
break;
case 4:
c = 1;
d = 2;
e = 0.5 * 4.1868 * 5.0 * Math.sqrt (this.b$["J.minimize.forcefield.CalculationsUFF"].parB.dVal[7] * this.b$["J.minimize.forcefield.CalculationsUFF"].parC.dVal[7]) * (1.0 + 4.18 * Math.log (g));
break;
case 6:
c = 1;
d = 6;
var k = (this.b$["J.minimize.forcefield.CalculationsUFF"].parC.iVal[0] == 3);
switch ((k ? this.c : this.b).atom.getElementNumber ()) {
case 8:
case 16:
case 34:
case 52:
case 84:
switch ((k ? this.b : this.c).atom.getElementNumber ()) {
case 8:
case 16:
case 34:
case 52:
case 84:
break;
default:
d = 2;
c = -1;
}
break;
}
e = 2.0934;
}
if (J.minimize.Util.isNearZero (e)) return;
a.addLast ([[this.ia, this.ib, this.ic, this.id, d], [e, c]]);
}, "JU.List,~A");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = this.iData[4];
var c = this.dData[0];
var d = this.dData[1];
this.b$["J.minimize.forcefield.CalculationsUFF"].setTorsionVariables (this);
this.energy = c * (1.0 - d * Math.cos (this.theta * b));
if (this.b$["J.minimize.forcefield.CalculationsUFF"].gradients) {
this.dE = c * b * d * Math.sin (b * this.theta);
this.b$["J.minimize.forcefield.CalculationsUFF"].addForces (this, 4);
}if (this.b$["J.minimize.forcefield.CalculationsUFF"].logging) this.b$["J.minimize.forcefield.CalculationsUFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsUFF"].getDebugLine (3, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsUFF$OOPCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsUFF, "OOPCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (a, b, c) {
this.b = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[b];
var d = this.b.getBondedAtomIndexes ();
this.a = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ia = d[0]];
this.c = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.ic = d[1]];
this.d = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[this.id = d[2]];
var e = 1.0;
var f = -1.0;
var g = 0.0;
var h = 25.1208;
switch (c) {
case 6:
if (this.b.sType === "C_2" && this.b.hCount > 1 || this.b.sType === "C_2+" || this.a.sType === "O_2" || this.c.sType === "O_2" || this.d.sType === "O_2") {
h += 184.2192;
break;
}break;
case 7:
case 8:
break;
default:
h = 92.1096;
var i = 0.017453292519943295;
switch (c) {
case 15:
i *= 84.4339;
break;
case 33:
i *= 86.9735;
break;
case 51:
i *= 87.7047;
break;
case 83:
i *= 90.0;
break;
}
var j = Math.cos (i);
e = j * j;
f = -2.0 * j;
g = 1.0;
}
h /= 3.0;
a.addLast ([[this.ia, b, this.ic, this.id], [h, e, f, g, h * 10]]);
a.addLast ([[this.ic, b, this.id, this.ia], [h, e, f, g, h * 10]]);
a.addLast ([[this.id, b, this.ia, this.ic], [h, e, f, g, h * 10]]);
}, "JU.List,~N,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = (this.b$["J.minimize.forcefield.CalculationsUFF"].isPreliminary ? this.dData[4] : this.dData[0]);
var c = this.dData[1];
var d = this.dData[2];
var e = this.dData[3];
this.b$["J.minimize.forcefield.CalculationsUFF"].setOopVariables (this, true);
var f = Math.cos (this.theta);
this.energy = b * (c + d * f + e * f * f);
if (this.b$["J.minimize.forcefield.CalculationsUFF"].gradients) {
this.dE = b * (d * Math.sin (this.theta) + e * 2.0 * Math.sin (this.theta) * f);
this.b$["J.minimize.forcefield.CalculationsUFF"].addForces (this, 4);
}if (this.b$["J.minimize.forcefield.CalculationsUFF"].logging) this.b$["J.minimize.forcefield.CalculationsUFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsUFF"].getDebugLine (4, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
c$.$CalculationsUFF$VDWCalc$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield.CalculationsUFF, "VDWCalc", J.minimize.forcefield.Calculations.PairCalc, null, Clazz_innerTypeInstance (J.minimize.forcefield.Calculations.PairCalc, this, null, Clazz_inheritArgs));
$_V(c$, "setData", 
function (a, b, c) {
this.a = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[b];
this.b = this.b$["J.minimize.forcefield.CalculationsUFF"].minAtoms[c];
var d = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.a.sType);
var e = this.b$["J.minimize.forcefield.CalculationsUFF"].getParameter (this.b.sType);
var f = d.dVal[2];
var g = d.dVal[3];
if (e == null || e.dVal == null) System.out.println ("OHOH");
var h = e.dVal[2];
var i = e.dVal[3];
var j = 4.1868 * Math.sqrt (g * i);
var k = Math.sqrt (f * h);
a.addLast ([[b, c], [k, j]]);
}, "JU.List,~N,~N");
$_V(c$, "compute", 
function (a) {
this.getPointers (a);
var b = this.dData[0];
var c = this.dData[1];
this.b$["J.minimize.forcefield.CalculationsUFF"].setPairVariables (this);
var d = b / this.rab;
var e = d * d * d;
e *= e;
this.energy = c * e * (e - 2.0);
if (this.b$["J.minimize.forcefield.CalculationsUFF"].gradients) {
this.dE = c * 12.0 * (1.0 - e) * e * d / b;
this.b$["J.minimize.forcefield.CalculationsUFF"].addForces (this, 2);
}if (this.b$["J.minimize.forcefield.CalculationsUFF"].logging) this.b$["J.minimize.forcefield.CalculationsUFF"].appendLogData (this.b$["J.minimize.forcefield.CalculationsUFF"].getDebugLine (5, this));
return this.energy;
}, "~A");
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"PAR_R", 0,
"PAR_THETA", 1,
"PAR_X", 2,
"PAR_D", 3,
"PAR_ZETA", 4,
"PAR_Z", 5,
"PAR_V", 6,
"PAR_U", 7,
"PAR_XI", 8,
"PAR_HARD", 9,
"PAR_RADIUS", 10,
"KCAL332", 1390.2842991599998,
"KCAL644", 2696.8016159999997,
"KCAL6", 25.1208,
"KCAL22", 92.1096,
"KCAL44", 184.2192);
});
Clazz_declarePackage ("J.minimize.forcefield");
c$ = Clazz_decorateAsClass (function () {
this.iVal = null;
this.dVal = null;
this.sVal = null;
Clazz_instantialize (this, arguments);
}, J.minimize.forcefield, "FFParam");
Clazz_declarePackage ("J.minimize");
Clazz_load (["J.thread.JmolThread"], "J.minimize.MinimizationThread", ["J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.minimizer = null;
Clazz_instantialize (this, arguments);
}, J.minimize, "MinimizationThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.minimize.MinimizationThread, []);
});
$_V(c$, "setManager", 
function (manager, viewer, options) {
this.minimizer = manager;
this.setViewer (viewer, "MinimizationThread");
return 0;
}, "~O,J.viewer.Viewer,~O");
$_V(c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
this.lastRepaintTime = this.startTime;
if (!this.minimizer.startMinimization ()) return;
this.viewer.startHoverWatcher (false);
mode = 0;
break;
case 0:
if (!this.minimizer.minimizationOn () || this.checkInterrupted ()) {
mode = -2;
break;
}this.currentTime = System.currentTimeMillis ();
var elapsed = (this.currentTime - this.lastRepaintTime);
var sleepTime = 33 - elapsed;
if (!this.runSleep (sleepTime, 1)) return;
mode = 1;
break;
case 1:
this.lastRepaintTime = this.currentTime = System.currentTimeMillis ();
mode = (this.minimizer.stepMinimization () ? 0 : -2);
break;
case -2:
this.minimizer.endMinimization ();
this.viewer.startHoverWatcher (true);
return;
}

}, "~N");
$_V(c$, "oops", 
function (e) {
if (this.minimizer.minimizationOn ()) J.util.Logger.error (e.toString ());
}, "Exception");
});
})(Clazz
,Clazz.newArray
,Clazz.newBooleanArray
,Clazz.newByteArray
,Clazz.newCharArray
,Clazz.newDoubleArray
,Clazz.newFloatArray
,Clazz.newIntArray
,Clazz.newLongArray
,Clazz.newShortArray
,Clazz.prepareCallback
,Clazz.decorateAsClass
,Clazz.isClassDefined
,Clazz.defineEnumConstant
,Clazz.cloneFinals
,Clazz.inheritArgs
,Clazz.pu$h
,Clazz.declareInterface
,Clazz.declarePackage
,Clazz.makeConstructor
,Clazz.overrideConstructor
,Clazz.load
,Clazz.defineMethod
,Clazz.innerTypeInstance
,Clazz.instanceOf
,Clazz.p0p
,Clazz.makeFunction
,Clazz.superConstructor
,Clazz.defineStatics
,Clazz.registerSerializableFields
,Clazz.declareType
,Clazz.superCall
,Clazz.overrideMethod
,Clazz.declareAnonymous
,Clazz.checkPrivateMethod
,Clazz.prepareFields
,Clazz.instantialize
,Clazz.doubleToInt
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.supportsNativeObject
,Clazz.extendedObjectMethods
,Clazz.callingStackTraces
,Clazz.clone
,Clazz.doubleToShort
,Clazz.innerFunctions
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
);
