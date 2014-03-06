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
Clazz_declareInterface (J.api, "SymmetryInterface");
Clazz_declarePackage ("J.symmetry");
Clazz_load (["J.api.SymmetryInterface"], "J.symmetry.Symmetry", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.P3", "$.SB", "J.modelset.Atom", "J.symmetry.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "J.util.Escape", "$.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pointGroup = null;
this.spaceGroup = null;
this.symmetryInfo = null;
this.unitCell = null;
this.$isBio = false;
Clazz_instantialize (this, arguments);
}, J.symmetry, "Symmetry", null, J.api.SymmetryInterface);
Clazz_makeConstructor (c$, 
function () {
});
$_V(c$, "setPointGroup", 
function (siLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
this.pointGroup = J.symmetry.PointGroup.getPointGroup (siLast == null ? null : (siLast).pointGroup, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance);
return this;
}, "J.api.SymmetryInterface,~A,JU.BS,~B,~N,~N");
$_V(c$, "getPointGroupName", 
function () {
return this.pointGroup.getName ();
});
$_V(c$, "getPointGroupInfo", 
function (modelIndex, asDraw, asInfo, type, index, scale) {
if (!asDraw && !asInfo && this.pointGroup.textInfo != null) return this.pointGroup.textInfo;
 else if (asDraw && this.pointGroup.isDrawType (type, index, scale)) return this.pointGroup.drawInfo;
 else if (asInfo && this.pointGroup.info != null) return this.pointGroup.info;
return this.pointGroup.getInfo (modelIndex, asDraw, asInfo, type, index, scale);
}, "~N,~B,~B,~S,~N,~N");
$_M(c$, "setSpaceGroup", 
function (doNormalize) {
if (this.spaceGroup == null) this.spaceGroup = (J.symmetry.SpaceGroup.getNull (true)).set (doNormalize);
}, "~B");
$_M(c$, "addSpaceGroupOperation", 
function (xyz, opId) {
return this.spaceGroup.addSymmetry (xyz, opId);
}, "~S,~N");
$_M(c$, "addBioMoleculeOperation", 
function (mat, isReverse) {
this.$isBio = this.spaceGroup.isBio = true;
return this.spaceGroup.addSymmetry ((isReverse ? "!" : "") + "[[bio" + mat, 0);
}, "JU.M4,~B");
$_V(c$, "setLattice", 
function (latt) {
this.spaceGroup.setLatticeParam (latt);
}, "~N");
$_M(c$, "getSpaceGroupName", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.spaceGroup : this.spaceGroup != null ? this.spaceGroup.getName () : "");
});
$_M(c$, "getSpaceGroup", 
function () {
return this.spaceGroup;
});
$_V(c$, "setSpaceGroupS", 
function (symmetry) {
this.spaceGroup = (symmetry == null ? null : symmetry.getSpaceGroup ());
}, "J.api.SymmetryInterface");
$_V(c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, notionalUnitCell) {
this.spaceGroup = J.symmetry.SpaceGroup.createSpaceGroup (desiredSpaceGroupIndex, name, notionalUnitCell);
if (this.spaceGroup != null && J.util.Logger.debugging) J.util.Logger.debug ("using generated space group " + this.spaceGroup.dumpInfo (null));
return this.spaceGroup != null;
}, "~N,~S,~A");
$_M(c$, "getSpaceGroupInfo", 
function (name, cellInfo) {
return J.symmetry.SpaceGroup.getInfo (name, cellInfo);
}, "~S,J.api.SymmetryInterface");
$_V(c$, "getLatticeDesignation", 
function () {
return this.spaceGroup.getLatticeDesignation ();
});
$_V(c$, "setFinalOperations", 
function (name, atoms, iAtomFirst, noSymmetryCount, doNormalize) {
if (name != null && name.startsWith ("bio")) this.spaceGroup.name = name;
this.spaceGroup.setFinalOperations (atoms, iAtomFirst, noSymmetryCount, doNormalize);
}, "~S,~A,~N,~N,~B");
$_V(c$, "getSpaceGroupOperationCount", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.symmetryOperations.length : this.spaceGroup != null ? this.spaceGroup.finalOperations.length : 0);
});
$_V(c$, "getSpaceGroupOperation", 
function (i) {
return (i < this.spaceGroup.finalOperations.length ? this.spaceGroup.finalOperations[i] : null);
}, "~N");
$_V(c$, "getSpaceGroupXyz", 
function (i, doNormalize) {
return this.spaceGroup.finalOperations[i].getXyz (doNormalize);
}, "~N,~B");
$_M(c$, "newSpaceGroupPoint", 
function (i, atom1, atom2, transX, transY, transZ) {
if (this.spaceGroup.finalOperations == null) {
if (!this.spaceGroup.operations[i].isFinalized) this.spaceGroup.operations[i].doFinalize ();
this.spaceGroup.operations[i].newPoint (atom1, atom2, transX, transY, transZ);
return;
}this.spaceGroup.finalOperations[i].newPoint (atom1, atom2, transX, transY, transZ);
}, "~N,JU.P3,JU.P3,~N,~N,~N");
$_V(c$, "rotateAxes", 
function (iop, axes, ptTemp, mTemp) {
return (iop == 0 ? axes : this.spaceGroup.finalOperations[iop].rotateAxes (axes, this.unitCell, ptTemp, mTemp));
}, "~N,~A,JU.P3,JU.M3");
$_M(c$, "getSymmetryOperationDescription", 
function (modelSet, isym, cellInfo, pt1, pt2, id) {
return this.spaceGroup.operations[isym].getDescription (modelSet, cellInfo, pt1, pt2, id);
}, "J.modelset.ModelSet,~N,J.api.SymmetryInterface,JU.P3,JU.P3,~S");
$_V(c$, "fcoord", 
function (p) {
return J.symmetry.SymmetryOperation.fcoord (p);
}, "JU.T3");
$_V(c$, "getMatrixFromString", 
function (xyz, rotTransMatrix, allowScaling) {
return J.symmetry.SymmetryOperation.getMatrixFromString (null, xyz, rotTransMatrix, allowScaling);
}, "~S,~A,~B");
$_V(c$, "getCoordinatesAreFractional", 
function () {
return this.symmetryInfo.coordinatesAreFractional;
});
$_V(c$, "getCellRange", 
function () {
return this.symmetryInfo.cellRange;
});
$_M(c$, "getSymmetryInfoString", 
function () {
return this.symmetryInfo.symmetryInfoString;
});
$_M(c$, "getSymmetryOperations", 
function () {
return this.symmetryInfo == null ? this.spaceGroup.getOperationList () : this.symmetryInfo.symmetryOperations;
});
$_V(c$, "isPeriodic", 
function () {
return (this.symmetryInfo == null || this.symmetryInfo.isPeriodic ());
});
$_V(c$, "setSymmetryInfo", 
function (modelIndex, modelAuxiliaryInfo) {
this.symmetryInfo =  new J.symmetry.SymmetryInfo ();
var notionalUnitcell = this.symmetryInfo.setSymmetryInfo (modelAuxiliaryInfo);
if (notionalUnitcell == null) return;
this.setUnitCell (notionalUnitcell);
modelAuxiliaryInfo.put ("infoUnitCell", this.getUnitCellAsArray (false));
this.setOffsetPt (modelAuxiliaryInfo.get ("unitCellOffset"));
if (modelAuxiliaryInfo.containsKey ("jmolData")) this.setUnitCellAllFractionalRelative (true);
var matUnitCellOrientation = modelAuxiliaryInfo.get ("matUnitCellOrientation");
if (matUnitCellOrientation != null) this.setUnitCellOrientation (matUnitCellOrientation);
if (J.util.Logger.debugging) J.util.Logger.debug ("symmetryInfos[" + modelIndex + "]:\n" + this.unitCell.dumpInfo (true));
}, "~N,java.util.Map");
$_M(c$, "setUnitCell", 
function (notionalUnitCell) {
this.unitCell = J.symmetry.UnitCell.newA (notionalUnitCell);
}, "~A");
$_V(c$, "haveUnitCell", 
function () {
return (this.unitCell != null);
});
$_M(c$, "getUnitsymmetryInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
$_V(c$, "setUnitCellOrientation", 
function (matUnitCellOrientation) {
this.unitCell.setOrientation (matUnitCellOrientation);
}, "JU.M3");
$_V(c$, "unitize", 
function (ptFrac) {
this.unitCell.unitize (ptFrac);
}, "JU.P3");
$_V(c$, "toUnitCell", 
function (pt, offset) {
this.unitCell.toUnitCell (pt, offset);
}, "JU.P3,JU.P3");
$_M(c$, "toCartesian", 
function (fpt, isAbsolute) {
if (!this.$isBio) this.unitCell.toCartesian (fpt, isAbsolute);
}, "JU.T3,~B");
$_V(c$, "toSupercell", 
function (fpt) {
return this.unitCell.toSupercell (fpt);
}, "JU.P3");
$_M(c$, "toFractional", 
function (pt, isAbsolute) {
if (!this.$isBio) this.unitCell.toFractional (pt, isAbsolute);
}, "JU.T3,~B");
$_M(c$, "getNotionalUnitCell", 
function () {
return this.unitCell.getNotionalUnitCell ();
});
$_V(c$, "getUnitCellAsArray", 
function (vectorsOnly) {
return this.unitCell.getUnitCellAsArray (vectorsOnly);
}, "~B");
$_V(c$, "getTensor", 
function (parBorU) {
if (this.unitCell == null) this.unitCell = J.symmetry.UnitCell.newA ([1, 1, 1, 90, 90, 90]);
return this.unitCell.getTensor (parBorU);
}, "~A");
$_V(c$, "getUnitCellVertices", 
function () {
return this.unitCell.getVertices ();
});
$_V(c$, "getCartesianOffset", 
function () {
return this.unitCell.getCartesianOffset ();
});
$_V(c$, "setCartesianOffset", 
function (origin) {
this.unitCell.setCartesianOffset (origin);
}, "JU.T3");
$_V(c$, "getFractionalOffset", 
function () {
return this.unitCell.getFractionalOffset ();
});
$_V(c$, "setOffsetPt", 
function (pt) {
this.unitCell.setOffset (pt);
}, "JU.P3");
$_V(c$, "setOffset", 
function (nnn) {
var pt =  new JU.P3 ();
J.util.SimpleUnitCell.ijkToPoint3f (nnn, pt, 0);
this.unitCell.setOffset (pt);
}, "~N");
$_V(c$, "getUnitCellMultiplier", 
function () {
return this.unitCell.getUnitCellMultiplier ();
});
$_V(c$, "getCanonicalCopy", 
function (scale) {
return this.unitCell.getCanonicalCopy (scale);
}, "~N");
$_V(c$, "getUnitCellInfoType", 
function (infoType) {
return this.unitCell.getInfo (infoType);
}, "~N");
$_V(c$, "getUnitCellInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
$_V(c$, "isSlab", 
function () {
return this.unitCell.isSlab ();
});
$_V(c$, "isPolymer", 
function () {
return this.unitCell.isPolymer ();
});
$_V(c$, "setMinMaxLatticeParameters", 
function (minXYZ, maxXYZ) {
this.unitCell.setMinMaxLatticeParameters (minXYZ, maxXYZ);
}, "JU.P3i,JU.P3i");
$_V(c$, "setUnitCellAllFractionalRelative", 
function (TF) {
this.unitCell.setAllFractionalRelative (TF);
}, "~B");
$_V(c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
return this.unitCell.checkDistance (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N,JU.P3");
$_V(c$, "getUnitCellVectors", 
function () {
return this.unitCell.getUnitCellVectors ();
});
$_V(c$, "getUnitCell", 
function (points) {
var sym =  new J.symmetry.Symmetry ();
sym.unitCell = J.symmetry.UnitCell.newP (points);
return sym;
}, "~A");
$_V(c$, "isSupercell", 
function () {
return this.unitCell.isSupercell ();
});
$_M(c$, "getSymmetryInfoString", 
function (sginfo, symOp, drawID, labelOnly) {
var infolist = sginfo.get ("operations");
if (infolist == null) return "";
var sb =  new JU.SB ();
symOp--;
for (var i = 0; i < infolist.length; i++) {
if (infolist[i] == null || symOp >= 0 && symOp != i) continue;
if (drawID != null) return infolist[i][3];
if (sb.length () > 0) sb.appendC ('\n');
if (!labelOnly) {
if (symOp < 0) sb.appendI (i + 1).append ("\t");
sb.append (infolist[i][0]).append ("\t");
}sb.append (infolist[i][2]);
}
if (sb.length () == 0 && drawID != null) sb.append ("draw " + drawID + "* delete");
return sb.toString ();
}, "java.util.Map,~N,~S,~B");
$_M(c$, "getSpaceGroupInfo", 
function (modelSet, modelIndex, spaceGroup, symOp, pt1, pt2, drawID) {
var strOperations = null;
var info = null;
var cellInfo = null;
var infolist = null;
if (spaceGroup == null) {
if (modelIndex <= 0) modelIndex = (Clazz_instanceOf (pt1, J.modelset.Atom) ? (pt1).modelIndex : modelSet.viewer.getCurrentModelIndex ());
var isBio = false;
if (modelIndex < 0) strOperations = "no single current model";
 else if (!(isBio = (cellInfo = modelSet.models[modelIndex].biosymmetry) != null) && (cellInfo = modelSet.getUnitCell (modelIndex)) == null) strOperations = "not applicable";
if (strOperations != null) {
info =  new java.util.Hashtable ();
info.put ("spaceGroupInfo", strOperations);
info.put ("symmetryInfo", "");
} else if (pt1 == null && drawID == null && symOp != 0) {
info = modelSet.getModelAuxiliaryInfoValue (modelIndex, "spaceGroupInfo");
}if (info != null) return info;
info =  new java.util.Hashtable ();
if (pt1 == null && drawID == null && symOp == 0) modelSet.setModelAuxiliaryInfo (modelIndex, "spaceGroupInfo", info);
spaceGroup = cellInfo.getSpaceGroupName ();
var list = cellInfo.getSymmetryOperations ();
var sg = (isBio ? (cellInfo).spaceGroup : null);
var jf = "";
if (list == null) {
strOperations = "\n no symmetry operations employed";
} else {
if (isBio) this.spaceGroup = (J.symmetry.SpaceGroup.getNull (false)).set (false);
 else this.setSpaceGroup (false);
strOperations = "\n" + list.length + " symmetry operations employed:";
infolist =  new Array (list.length);
for (var i = 0; i < list.length; i++) {
var iSym = (isBio ? this.addBioMoleculeOperation (sg.finalOperations[i], false) : this.addSpaceGroupOperation ("=" + list[i], i + 1));
if (iSym < 0) continue;
jf += ";" + list[i];
infolist[i] = (symOp > 0 && symOp - 1 != iSym ? null : this.getSymmetryOperationDescription (modelSet, iSym, cellInfo, pt1, pt2, drawID));
if (infolist[i] != null) strOperations += "\n" + (i + 1) + "\t" + infolist[i][0] + "\t" + infolist[i][2];
}
}jf = jf.substring (jf.indexOf (";") + 1);
if (spaceGroup.indexOf ("[--]") >= 0) spaceGroup = jf;
} else {
info =  new java.util.Hashtable ();
}info.put ("spaceGroupName", spaceGroup);
if (infolist != null) {
info.put ("operations", infolist);
info.put ("symmetryInfo", strOperations);
}if (!spaceGroup.startsWith ("bio")) {
var data = this.getSpaceGroupInfo (spaceGroup, cellInfo);
if (data == null || data.equals ("?")) data = "could not identify space group from name: " + spaceGroup + "\nformat: show spacegroup \"2\" or \"P 2c\" " + "or \"C m m m\" or \"x, y, z;-x ,-y, -z\"";
info.put ("spaceGroupInfo", data);
}return info;
}, "J.modelset.ModelSet,~N,~S,~N,JU.P3,JU.P3,~S");
$_V(c$, "getSymmetryInfo", 
function (modelSet, iModel, iAtom, uc, xyz, op, pt, pt2, id, type) {
if (pt2 != null) return modelSet.getSymmetryInfoString (iModel, null, op, pt, pt2, (id == null ? "sym" : id), type == 1826248715);
var symTemp = modelSet.getSymTemp (false);
var isBio = uc.isBio ();
var sym = uc;
var iop = op;
if (xyz == null) {
var ops = sym.getSymmetryOperations ();
if (ops == null || op == 0 || Math.abs (op) > ops.length) return "";
if (op > 0) {
xyz = ops[iop = op - 1];
} else {
xyz = ops[iop = -1 - op];
}} else {
iop = op = 0;
}symTemp.setSpaceGroup (false);
var iSym = (isBio ? symTemp.addBioMoleculeOperation (sym.spaceGroup.finalOperations[iop], op < 0) : symTemp.addSpaceGroupOperation ((op < 0 ? "!" : "=") + xyz, Math.abs (op)));
if (iSym < 0) return "";
var info;
pt = JU.P3.newP (pt == null ? modelSet.atoms[iAtom] : pt);
if (type == 135266320) {
if (isBio) return "";
symTemp.setUnitCell (uc.getNotionalUnitCell ());
uc.toFractional (pt, false);
if (Float.isNaN (pt.x)) return "";
var sympt =  new JU.P3 ();
symTemp.newSpaceGroupPoint (iSym, pt, sympt, 0, 0, 0);
symTemp.toCartesian (sympt, false);
return sympt;
}info = (symTemp).getSymmetryOperationDescription (modelSet, iSym, uc, pt, pt2, (id == null ? "sym" : id));
var ang = (info[9]).intValue ();
switch (type) {
case 135266306:
return info;
case 1073742001:
var sinfo = [info[0], info[1], info[2], J.util.Escape.eP (info[4]), J.util.Escape.eP (info[5]), J.util.Escape.eP (info[6]), J.util.Escape.eP (info[7]), J.util.Escape.eP (info[8]), "" + info[9], "" + J.util.Escape.e (info[10])];
return sinfo;
case 1073741982:
return info[0];
default:
case 1826248715:
return info[2];
case 135176:
return info[3];
case 1073742178:
return info[5];
case 12289:
return info[6];
case 135266320:
return info[7];
case 1073741854:
case 135266319:
return ((ang == 0) == (type == 135266319) ? info[8] : null);
case 135266305:
return info[9];
case 12:
return info[10];
}
}, "J.modelset.ModelSet,~N,~N,J.api.SymmetryInterface,~S,~N,JU.P3,JU.P3,~S,~N");
$_V(c$, "notInCentroid", 
function (modelSet, bsAtoms, minmax) {
try {
var bsDelete =  new JU.BS ();
var iAtom0 = bsAtoms.nextSetBit (0);
var molecules = modelSet.getMolecules ();
var moleculeCount = molecules.length;
var atoms = modelSet.atoms;
var isOneMolecule = (molecules[moleculeCount - 1].firstAtomIndex == modelSet.models[atoms[iAtom0].modelIndex].firstAtomIndex);
var center =  new JU.P3 ();
var centroidPacked = (minmax[6] == 1);
nextMol : for (var i = moleculeCount; --i >= 0 && bsAtoms.get (molecules[i].firstAtomIndex); ) {
var bs = molecules[i].atomList;
center.set (0, 0, 0);
var n = 0;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
if (isOneMolecule || centroidPacked) {
center.setT (atoms[j]);
if (this.isNotCentroid (center, 1, minmax, centroidPacked)) {
if (isOneMolecule) bsDelete.set (j);
} else if (!isOneMolecule) {
continue nextMol;
}} else {
center.add (atoms[j]);
n++;
}}
if (centroidPacked || n > 0 && this.isNotCentroid (center, n, minmax, false)) bsDelete.or (bs);
}
return bsDelete;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "J.modelset.ModelSet,JU.BS,~A");
$_M(c$, "isNotCentroid", 
function (center, n, minmax, centroidPacked) {
center.scale (1 / n);
this.toFractional (center, false);
if (centroidPacked) return (center.x + 0.000005 <= minmax[0] || center.x - 0.000005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y - 0.000005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z - 0.000005 > minmax[5]);
return (center.x + 0.000005 <= minmax[0] || center.x + 0.00005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y + 0.00005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z + 0.00005 > minmax[5]);
}, "JU.P3,~N,~A,~B");
$_V(c$, "checkUnitCell", 
function (uc, cell, ptTemp, isAbsolute) {
uc.toFractional (ptTemp, isAbsolute);
var slop = 0.02;
return (ptTemp.x >= cell.x - 1 - slop && ptTemp.x <= cell.x + slop && ptTemp.y >= cell.y - 1 - slop && ptTemp.y <= cell.y + slop && ptTemp.z >= cell.z - 1 - slop && ptTemp.z <= cell.z + slop);
}, "J.api.SymmetryInterface,JU.P3,JU.P3,~B");
$_V(c$, "unitCellEquals", 
function (uc2) {
return ((uc2)).unitCell.isSameAs (this.unitCell);
}, "J.api.SymmetryInterface");
$_V(c$, "addLatticeVectors", 
function (lattvecs) {
this.spaceGroup.addLatticeVectors (lattvecs);
}, "JU.List");
$_V(c$, "getLatticeOp", 
function () {
return this.spaceGroup.latticeOp;
});
$_V(c$, "getOperationGammaIS", 
function (iop) {
return this.spaceGroup.finalOperations[iop].gammaIS;
}, "~N");
$_V(c$, "getSiteMultiplicity", 
function (pt) {
return this.spaceGroup.getSiteMultiplicity (pt, this.unitCell);
}, "JU.P3");
$_M(c$, "isBio", 
function () {
return this.$isBio;
});
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["JU.P3", "$.V3"], "J.symmetry.PointGroup", ["java.lang.Float", "java.util.Hashtable", "JU.List", "$.SB", "J.util.BSUtil", "$.Escape", "$.Logger", "$.Quaternion", "$.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.drawInfo = null;
this.info = null;
this.textInfo = null;
this.drawType = "";
this.drawIndex = 0;
this.scale = NaN;
this.nAxes = null;
this.axes = null;
this.nAtoms = 0;
this.radius = 0;
this.distanceTolerance = 0.2;
this.linearTolerance = 8;
this.cosTolerance = 0.99;
this.name = "C_1?";
this.principalAxis = null;
this.principalPlane = null;
this.vTemp = null;
this.centerAtomIndex = -1;
this.haveInversionCenter = false;
this.center = null;
this.points = null;
this.atoms = null;
this.elements = null;
this.bsAtoms = null;
this.maxElement = 0;
this.eCounts = null;
this.nOps = 0;
if (!Clazz_isClassDefined ("J.symmetry.PointGroup.Operation")) {
J.symmetry.PointGroup.$PointGroup$Operation$ ();
}
Clazz_instantialize (this, arguments);
}, J.symmetry, "PointGroup");
Clazz_prepareFields (c$, function () {
this.nAxes =  Clazz_newIntArray (J.symmetry.PointGroup.maxAxis, 0);
this.axes =  new Array (J.symmetry.PointGroup.maxAxis);
this.vTemp =  new JU.V3 ();
this.center =  new JU.P3 ();
});
$_M(c$, "getName", 
function () {
return this.name;
});
c$.getPointGroup = $_M(c$, "getPointGroup", 
function (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
var pg =  new J.symmetry.PointGroup ();
return (pg.set (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) ? pg : pgLast);
}, "J.symmetry.PointGroup,~A,JU.BS,~B,~N,~N");
Clazz_makeConstructor (c$, 
function () {
});
$_M(c$, "isEqual", 
function (pg) {
if (pg == null) return false;
if (this.linearTolerance != pg.linearTolerance || this.distanceTolerance != pg.distanceTolerance || this.nAtoms != pg.nAtoms || !this.bsAtoms.equals (pg.bsAtoms)) return false;
for (var i = 0; i < this.nAtoms; i++) {
if (this.elements[i] != pg.elements[i] || this.points[i].distance (pg.points[i]) != 0) return false;
}
return true;
}, "J.symmetry.PointGroup");
$_M(c$, "set", 
function (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
this.distanceTolerance = distanceTolerance;
this.linearTolerance = linearTolerance;
this.bsAtoms = bsAtoms;
this.cosTolerance = (Math.cos (linearTolerance / 180 * 3.141592653589793));
if (!this.getAtomsAndElements (atomset, bsAtoms)) {
J.util.Logger.error ("Too many atoms for point group calculation");
this.name = "point group not determined -- atomCount > 100 -- select fewer atoms and try again.";
return true;
}this.getElementCounts ();
if (haveVibration) {
var atomVibs =  new Array (this.points.length);
for (var i = this.points.length; --i >= 0; ) {
atomVibs[i] = JU.P3.newP (this.points[i]);
var v = this.atoms[i].getVibrationVector ();
if (v != null) atomVibs[i].add (v);
}
this.points = atomVibs;
}if (this.isEqual (pgLast)) return false;
this.findInversionCenter ();
if (this.isLinear (this.points)) {
if (this.haveInversionCenter) {
this.name = "D(infinity)h";
} else {
this.name = "C(infinity)v";
}this.vTemp.sub2 (this.points[1], this.points[0]);
this.addAxis (16, this.vTemp);
this.principalAxis = this.axes[16][0];
if (this.haveInversionCenter) {
this.axes[0] =  new Array (1);
this.principalPlane = this.axes[0][this.nAxes[0]++] = Clazz_innerTypeInstance (J.symmetry.PointGroup.Operation, this, null, this.vTemp);
}return true;
}this.axes[0] =  new Array (15);
var nPlanes = 0;
this.findCAxes ();
nPlanes = this.findPlanes ();
this.findAdditionalAxes (nPlanes);
var n = this.getHighestOrder ();
if (this.nAxes[17] > 1) {
if (this.nAxes[19] > 1) {
if (this.haveInversionCenter) {
this.name = "Ih";
} else {
this.name = "I";
}} else if (this.nAxes[18] > 1) {
if (this.haveInversionCenter) {
this.name = "Oh";
} else {
this.name = "O";
}} else {
if (nPlanes > 0) {
if (this.haveInversionCenter) {
this.name = "Th";
} else {
this.name = "Td";
}} else {
this.name = "T";
}}} else {
if (n < 2) {
if (nPlanes == 1) {
this.name = "Cs";
return true;
}if (this.haveInversionCenter) {
this.name = "Ci";
return true;
}this.name = "C1";
} else if ((n % 2) == 1 && this.nAxes[16] > 0 || (n % 2) == 0 && this.nAxes[16] > 1) {
this.principalAxis = this.setPrincipalAxis (n, nPlanes);
if (nPlanes == 0) {
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "D" + (n - 14);
}} else {
if (n < 14) n = Clazz_doubleToInt (n / 2);
 else n -= 14;
if (nPlanes == n) {
this.name = "D" + n + "d";
} else {
this.name = "D" + n + "h";
}}} else if (nPlanes == 0) {
this.principalAxis = this.axes[n][0];
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "C" + (n - 14);
}} else if (nPlanes == n - 14) {
this.principalAxis = this.axes[n][0];
this.name = "C" + nPlanes + "v";
} else {
this.principalAxis = this.axes[n < 14 ? n + 14 : n][0];
this.principalPlane = this.axes[0][0];
if (n < 14) n /= 2;
 else n -= 14;
this.name = "C" + n + "h";
}}return true;
}, "J.symmetry.PointGroup,~A,JU.BS,~B,~N,~N");
$_M(c$, "setPrincipalAxis", 
function (n, nPlanes) {
var principalPlane = this.setPrincipalPlane (n, nPlanes);
if (nPlanes == 0 && n < 14 || this.nAxes[n] == 1) {
if (nPlanes > 0 && n < 14) n = 14 + Clazz_doubleToInt (n / 2);
return this.axes[n][0];
}if (principalPlane == null) return null;
for (var i = 0; i < this.nAxes[16]; i++) if (this.isParallel (principalPlane.normalOrAxis, this.axes[16][i].normalOrAxis)) {
if (i != 0) {
var o = this.axes[16][0];
this.axes[16][0] = this.axes[16][i];
this.axes[16][i] = o;
}return this.axes[16][0];
}
return null;
}, "~N,~N");
$_M(c$, "setPrincipalPlane", 
function (n, nPlanes) {
if (nPlanes == 1) return this.principalPlane = this.axes[0][0];
if (nPlanes == 0 || nPlanes == n - 14) return null;
for (var i = 0; i < nPlanes; i++) for (var j = 0, nPerp = 0; j < nPlanes; j++) if (this.isPerpendicular (this.axes[0][i].normalOrAxis, this.axes[0][j].normalOrAxis) && ++nPerp > 2) {
if (i != 0) {
var o = this.axes[0][0];
this.axes[0][0] = this.axes[0][i];
this.axes[0][i] = o;
}return this.principalPlane = this.axes[0][0];
}

return null;
}, "~N,~N");
$_M(c$, "getAtomsAndElements", 
function (atomset, bsAtoms) {
var atomCount = J.util.BSUtil.cardinalityOf (bsAtoms);
if (atomCount > 100) return false;
this.points =  new Array (atomCount);
this.atoms =  new Array (atomCount);
this.elements =  Clazz_newIntArray (atomCount, 0);
if (atomCount == 0) return true;
this.nAtoms = 0;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
this.points[this.nAtoms] = JU.P3.newP (atomset[i]);
this.atoms[this.nAtoms] = atomset[i];
var bondIndex = 1 + Math.max (3, atomset[i].getCovalentBondCount ());
this.elements[this.nAtoms] = atomset[i].getElementNumber () * bondIndex;
this.center.add (this.points[this.nAtoms++]);
}
this.center.scale (1 / this.nAtoms);
for (var i = this.nAtoms; --i >= 0; ) {
var r = this.center.distance (this.points[i]);
if (r < this.distanceTolerance) this.centerAtomIndex = i;
this.radius = Math.max (this.radius, r);
}
return true;
}, "~A,JU.BS");
$_M(c$, "findInversionCenter", 
function () {
this.haveInversionCenter = this.checkOperation (null, this.center, -1);
if (this.haveInversionCenter) {
this.axes[1] =  new Array (1);
this.axes[1][0] = Clazz_innerTypeInstance (J.symmetry.PointGroup.Operation, this, null);
}});
$_M(c$, "checkOperation", 
function (q, center, iOrder) {
var pt =  new JU.P3 ();
var nFound = 0;
var isInversion = (iOrder < 14);
out : for (var i = this.points.length; --i >= 0 && nFound < this.points.length; ) if (i == this.centerAtomIndex) {
nFound++;
} else {
var a1 = this.points[i];
var e1 = this.elements[i];
if (q != null) {
pt.sub2 (a1, center);
q.transformP2 (pt, pt).add (center);
} else {
pt.setT (a1);
}if (isInversion) {
this.vTemp.sub2 (center, pt);
pt.scaleAdd2 (2, this.vTemp, pt);
}if ((q != null || isInversion) && pt.distance (a1) < this.distanceTolerance) {
nFound++;
continue;
}for (var j = this.points.length; --j >= 0; ) {
if (j == i || this.elements[j] != e1) continue;
var a2 = this.points[j];
if (pt.distance (a2) < this.distanceTolerance) {
nFound++;
continue out;
}}
}
return nFound == this.points.length;
}, "J.util.Quaternion,JU.P3,~N");
$_M(c$, "isLinear", 
function (atoms) {
var v1 = null;
if (atoms.length < 2) return false;
for (var i = atoms.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
if (v1 == null) {
v1 =  new JU.V3 ();
v1.sub2 (atoms[i], this.center);
v1.normalize ();
this.vTemp.setT (v1);
continue;
}this.vTemp.sub2 (atoms[i], this.center);
this.vTemp.normalize ();
if (!this.isParallel (v1, this.vTemp)) return false;
}
return true;
}, "~A");
$_M(c$, "isParallel", 
function (v1, v2) {
return (Math.abs (v1.dot (v2)) >= this.cosTolerance);
}, "JU.V3,JU.V3");
$_M(c$, "isPerpendicular", 
function (v1, v2) {
return (Math.abs (v1.dot (v2)) <= 1 - this.cosTolerance);
}, "JU.V3,JU.V3");
$_M(c$, "getElementCounts", 
function () {
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (e1 > this.maxElement) this.maxElement = e1;
}
this.eCounts =  Clazz_newIntArray (++this.maxElement, 0);
for (var i = this.points.length; --i >= 0; ) this.eCounts[this.elements[i]]++;

});
$_M(c$, "findCAxes", 
function () {
var v1 =  new JU.V3 ();
var v2 =  new JU.V3 ();
var v3 =  new JU.V3 ();
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
var a2 = this.points[j];
if (this.elements[j] != e1) continue;
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
v1.normalize ();
v2.normalize ();
if (this.isParallel (v1, v2)) {
this.getAllAxes (v1);
continue;
}if (this.nAxes[16] < J.symmetry.PointGroup.axesMaxN[16]) {
v3.ave (a1, a2);
v3.sub (this.center);
this.getAllAxes (v3);
}var order = (6.283185307179586 / v1.angle (v2));
var iOrder = Clazz_doubleToInt (Math.floor (order + 0.01));
var isIntegerOrder = (order - iOrder <= 0.02);
if (!isIntegerOrder || (iOrder = iOrder + 14) >= J.symmetry.PointGroup.maxAxis) continue;
if (this.nAxes[iOrder] < J.symmetry.PointGroup.axesMaxN[iOrder]) {
v3.cross (v1, v2);
this.checkAxisOrder (iOrder, v3, this.center);
}}
}
var vs =  new Array (this.nAxes[16] * 2);
for (var i = 0; i < vs.length; i++) vs[i] =  new JU.V3 ();

var n = 0;
for (var i = 0; i < this.nAxes[16]; i++) {
vs[n++].setT (this.axes[16][i].normalOrAxis);
vs[n].setT (this.axes[16][i].normalOrAxis);
vs[n++].scale (-1);
}
for (var i = vs.length; --i >= 2; ) for (var j = i; --j >= 1; ) for (var k = j; --k >= 0; ) {
v3.add2 (vs[i], vs[j]);
v3.add (vs[k]);
if (v3.length () < 1.0) continue;
this.checkAxisOrder (17, v3, this.center);
}


var nMin = 2147483647;
var iMin = -1;
for (var i = 0; i < this.maxElement; i++) {
if (this.eCounts[i] < nMin && this.eCounts[i] > 2) {
nMin = this.eCounts[i];
iMin = i;
}}
out : for (var i = 0; i < this.points.length - 2; i++) if (this.elements[i] == iMin) for (var j = i + 1; j < this.points.length - 1; j++) if (this.elements[j] == iMin) for (var k = j + 1; k < this.points.length; k++) if (this.elements[k] == iMin) {
v1.sub2 (this.points[i], this.points[j]);
v2.sub2 (this.points[i], this.points[k]);
v1.normalize ();
v2.normalize ();
v3.cross (v1, v2);
this.getAllAxes (v3);
v1.add2 (this.points[i], this.points[j]);
v1.add (this.points[k]);
v1.normalize ();
if (!this.isParallel (v1, v3)) this.getAllAxes (v1);
if (this.nAxes[19] == J.symmetry.PointGroup.axesMaxN[19]) break out;
}


vs =  new Array (this.maxElement);
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (vs[e1] == null) vs[e1] =  new JU.V3 ();
 else if (this.haveInversionCenter) continue;
vs[e1].add (this.points[i]);
}
if (!this.haveInversionCenter) for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) vs[i].scale (1 / this.eCounts[i]);

for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) for (var j = 0; j < this.maxElement; j++) {
if (i == j || vs[j] == null) continue;
if (this.haveInversionCenter) v1.cross (vs[i], vs[j]);
 else v1.sub2 (vs[i], vs[j]);
this.checkAxisOrder (16, v1, this.center);
}

return this.getHighestOrder ();
});
$_M(c$, "getAllAxes", 
function (v3) {
for (var o = 16; o < J.symmetry.PointGroup.maxAxis; o++) if (this.nAxes[o] < J.symmetry.PointGroup.axesMaxN[o]) this.checkAxisOrder (o, v3, this.center);

}, "JU.V3");
$_M(c$, "getHighestOrder", 
function () {
var n = 0;
for (n = 14; --n > 1 && this.nAxes[n] == 0; ) {
}
if (n > 1) return (n + 14 < J.symmetry.PointGroup.maxAxis && this.nAxes[n + 14] > 0 ? n + 14 : n);
for (n = J.symmetry.PointGroup.maxAxis; --n > 1 && this.nAxes[n] == 0; ) {
}
return n;
});
$_M(c$, "checkAxisOrder", 
function (iOrder, v, center) {
switch (iOrder) {
case 22:
if (this.nAxes[17] > 0) return false;
case 20:
case 18:
if (this.nAxes[19] > 0) return false;
break;
case 17:
if (this.nAxes[22] > 0) return false;
break;
case 19:
if (this.nAxes[18] > 0 || this.nAxes[20] > 0 || this.nAxes[22] > 0) return false;
break;
}
v.normalize ();
if (this.haveAxis (iOrder, v)) return false;
var q = J.util.Quaternion.newVA (v, (iOrder < 14 ? 180 : 0) + Clazz_doubleToInt (360 / (iOrder % 14)));
if (!this.checkOperation (q, center, iOrder)) return false;
this.addAxis (iOrder, v);
switch (iOrder) {
case 16:
this.checkAxisOrder (4, v, center);
break;
case 17:
this.checkAxisOrder (3, v, center);
if (this.haveInversionCenter) this.addAxis (6, v);
break;
case 18:
this.addAxis (16, v);
this.checkAxisOrder (4, v, center);
this.checkAxisOrder (8, v, center);
break;
case 19:
this.checkAxisOrder (5, v, center);
if (this.haveInversionCenter) this.addAxis (10, v);
break;
case 20:
this.addAxis (16, v);
this.addAxis (17, v);
this.checkAxisOrder (3, v, center);
this.checkAxisOrder (6, v, center);
this.checkAxisOrder (12, v, center);
break;
case 22:
this.addAxis (16, v);
this.addAxis (18, v);
break;
}
return true;
}, "~N,JU.V3,JU.P3");
$_M(c$, "addAxis", 
function (iOrder, v) {
if (this.haveAxis (iOrder, v)) return;
if (this.axes[iOrder] == null) this.axes[iOrder] =  new Array (J.symmetry.PointGroup.axesMaxN[iOrder]);
this.axes[iOrder][this.nAxes[iOrder]++] = Clazz_innerTypeInstance (J.symmetry.PointGroup.Operation, this, null, v, iOrder);
}, "~N,JU.V3");
$_M(c$, "haveAxis", 
function (iOrder, v) {
if (this.nAxes[iOrder] == J.symmetry.PointGroup.axesMaxN[iOrder]) {
return true;
}if (this.nAxes[iOrder] > 0) for (var i = this.nAxes[iOrder]; --i >= 0; ) {
if (this.isParallel (v, this.axes[iOrder][i].normalOrAxis)) return true;
}
return false;
}, "~N,JU.V3");
$_M(c$, "findPlanes", 
function () {
var pt =  new JU.P3 ();
var v1 =  new JU.V3 ();
var v2 =  new JU.V3 ();
var v3 =  new JU.V3 ();
var nPlanes = 0;
var haveAxes = (this.getHighestOrder () > 1);
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
if (haveAxes && this.elements[j] != e1) continue;
var a2 = this.points[j];
pt.add2 (a1, a2);
pt.scale (0.5);
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
if (!this.isParallel (v1, v2)) {
v3.cross (v1, v2);
v3.normalize ();
nPlanes = this.getPlane (v3);
}v3.sub2 (a2, a1);
v3.normalize ();
nPlanes = this.getPlane (v3);
if (nPlanes == J.symmetry.PointGroup.axesMaxN[0]) return nPlanes;
}
}
if (haveAxes) for (var i = 16; i < J.symmetry.PointGroup.maxAxis; i++) for (var j = 0; j < this.nAxes[i]; j++) nPlanes = this.getPlane (this.axes[i][j].normalOrAxis);


return nPlanes;
});
$_M(c$, "getPlane", 
function (v3) {
if (!this.haveAxis (0, v3) && this.checkOperation (J.util.Quaternion.newVA (v3, 180), this.center, -1)) this.axes[0][this.nAxes[0]++] = Clazz_innerTypeInstance (J.symmetry.PointGroup.Operation, this, null, v3);
return this.nAxes[0];
}, "JU.V3");
$_M(c$, "findAdditionalAxes", 
function (nPlanes) {
var planes = this.axes[0];
var Cn = 0;
if (nPlanes > 1 && ((Cn = nPlanes + 14) < J.symmetry.PointGroup.maxAxis) && this.nAxes[Cn] == 0) {
this.vTemp.cross (planes[0].normalOrAxis, planes[1].normalOrAxis);
if (!this.checkAxisOrder (Cn, this.vTemp, this.center) && nPlanes > 2) {
this.vTemp.cross (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (Cn - 1, this.vTemp, this.center);
}}if (this.nAxes[16] == 0 && nPlanes > 2) {
for (var i = 0; i < nPlanes - 1; i++) {
for (var j = i + 1; j < nPlanes; j++) {
this.vTemp.add2 (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (16, this.vTemp, this.center);
}
}
}}, "~N");
$_M(c$, "getInfo", 
function (modelIndex, asDraw, asInfo, type, index, scaleFactor) {
this.info = (asInfo ?  new java.util.Hashtable () : null);
var v =  new JU.V3 ();
var op;
if (scaleFactor == 0) scaleFactor = 1;
this.scale = scaleFactor;
var nType =  Clazz_newIntArray (4, 2, 0);
for (var i = 1; i < J.symmetry.PointGroup.maxAxis; i++) for (var j = this.nAxes[i]; --j >= 0; ) nType[this.axes[i][j].type][0]++;


var sb =  new JU.SB ().append ("# ").appendI (this.nAtoms).append (" atoms\n");
if (asDraw) {
var haveType = (type != null && type.length > 0);
this.drawType = type = (haveType ? type : "");
this.drawIndex = index;
var anyProperAxis = (type.equalsIgnoreCase ("Cn"));
var anyImproperAxis = (type.equalsIgnoreCase ("Sn"));
sb.append ("set perspectivedepth off;\n");
var m = "_" + modelIndex + "_";
if (!haveType) sb.append ("draw pg0").append (m).append ("* delete;draw pgva").append (m).append ("* delete;draw pgvp").append (m).append ("* delete;");
if (!haveType || type.equalsIgnoreCase ("Ci")) sb.append ("draw pg0").append (m).append (this.haveInversionCenter ? "inv " : " ").append (J.util.Escape.eP (this.center)).append (this.haveInversionCenter ? "\"i\";\n" : ";\n");
var offset = 0.1;
for (var i = 2; i < J.symmetry.PointGroup.maxAxis; i++) {
if (i == 14) offset = 0.1;
if (this.nAxes[i] == 0) continue;
var label = this.axes[i][0].getLabel ();
offset += 0.25;
var scale = scaleFactor * this.radius + offset;
if (!haveType || type.equalsIgnoreCase (label) || anyProperAxis && i >= 14 || anyImproperAxis && i < 14) for (var j = 0; j < this.nAxes[i]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[i][j];
v.add2 (op.normalOrAxis, this.center);
if (op.type == 2) scale = -scale;
sb.append ("draw pgva").append (m).append (label).append ("_").appendI (j + 1).append (" width 0.05 scale ").appendF (scale).append (" ").append (J.util.Escape.eP (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
var isPA = (this.principalAxis != null && op.index == this.principalAxis.index);
sb.append (J.util.Escape.eP (v)).append ("\"").append (label).append (isPA ? "*" : "").append ("\" color ").append (isPA ? "red" : op.type == 2 ? "blue" : "yellow").append (";\n");
}
}
if (!haveType || type.equalsIgnoreCase ("Cs")) for (var j = 0; j < this.nAxes[0]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[0][j];
sb.append ("draw pgvp").append (m).appendI (j + 1).append ("disk scale ").appendF (scaleFactor * this.radius * 2).append (" CIRCLE PLANE ").append (J.util.Escape.eP (this.center));
v.add2 (op.normalOrAxis, this.center);
sb.append (J.util.Escape.eP (v)).append (" color translucent yellow;\n");
v.add2 (op.normalOrAxis, this.center);
sb.append ("draw pgvp").append (m).appendI (j + 1).append ("ring width 0.05 scale ").appendF (scaleFactor * this.radius * 2).append (" arc ").append (J.util.Escape.eP (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
sb.append (J.util.Escape.eP (v));
v.x += 0.011;
v.y += 0.012;
v.z += 0.013;
sb.append (J.util.Escape.eP (v)).append ("{0 360 0.5} color ").append (this.principalPlane != null && op.index == this.principalPlane.index ? "red" : "blue").append (";\n");
}
sb.append ("# name=").append (this.name);
sb.append (", nCi=").appendI (this.haveInversionCenter ? 1 : 0);
sb.append (", nCs=").appendI (this.nAxes[0]);
sb.append (", nCn=").appendI (nType[1][0]);
sb.append (", nSn=").appendI (nType[2][0]);
sb.append (": ");
for (var i = J.symmetry.PointGroup.maxAxis; --i >= 2; ) if (this.nAxes[i] > 0) {
sb.append (" n").append (i < 14 ? "S" : "C").appendI (i % 14);
sb.append ("=").appendI (this.nAxes[i]);
}
sb.append (";\n");
this.drawInfo = sb.toString ();
return this.drawInfo;
}var n = 0;
var nTotal = 1;
var ctype = (this.haveInversionCenter ? "Ci" : "center");
if (this.haveInversionCenter) nTotal++;
if (this.info == null) sb.append ("\n\n").append (this.name).append ("\t").append (ctype).append ("\t").append (J.util.Escape.eP (this.center));
 else this.info.put (ctype, this.center);
for (var i = J.symmetry.PointGroup.maxAxis; --i >= 0; ) {
if (this.nAxes[i] > 0) {
n = J.symmetry.PointGroup.nUnique[i];
var label = this.axes[i][0].getLabel ();
if (this.info == null) sb.append ("\n\n").append (this.name).append ("\tn").append (label).append ("\t").appendI (this.nAxes[i]).append ("\t").appendI (n);
 else this.info.put ("n" + label, Integer.$valueOf (this.nAxes[i]));
n *= this.nAxes[i];
nTotal += n;
nType[this.axes[i][0].type][1] += n;
var vinfo = (this.info == null ? null :  new JU.List ());
for (var j = 0; j < this.nAxes[i]; j++) {
if (vinfo == null) sb.append ("\n").append (this.name).append ("\t").append (label).append ("_").appendI (j + 1).append ("\t").appendO (this.axes[i][j].normalOrAxis);
 else vinfo.addLast (this.axes[i][j].normalOrAxis);
}
if (this.info != null) this.info.put (label, vinfo);
}}
if (this.info == null) {
sb.append ("\n");
sb.append ("\n").append (this.name).append ("\ttype\tnType\tnUnique");
sb.append ("\n").append (this.name).append ("\tE\t  1\t  1");
n = (this.haveInversionCenter ? 1 : 0);
sb.append ("\n").append (this.name).append ("\tCi\t  ").appendI (n).append ("\t  ").appendI (n);
sb.append ("\n").append (this.name).append ("\tCs\t");
J.util.Txt.rightJustify (sb, "    ", this.nAxes[0] + "\t");
J.util.Txt.rightJustify (sb, "    ", this.nAxes[0] + "\n");
sb.append (this.name).append ("\tCn\t");
J.util.Txt.rightJustify (sb, "    ", nType[1][0] + "\t");
J.util.Txt.rightJustify (sb, "    ", nType[1][1] + "\n");
sb.append (this.name).append ("\tSn\t");
J.util.Txt.rightJustify (sb, "    ", nType[2][0] + "\t");
J.util.Txt.rightJustify (sb, "    ", nType[2][1] + "\n");
sb.append (this.name).append ("\t\tTOTAL\t");
J.util.Txt.rightJustify (sb, "    ", nTotal + "\n");
this.textInfo = sb.toString ();
return this.textInfo;
}this.info.put ("name", this.name);
this.info.put ("nAtoms", Integer.$valueOf (this.nAtoms));
this.info.put ("nTotal", Integer.$valueOf (nTotal));
this.info.put ("nCi", Integer.$valueOf (this.haveInversionCenter ? 1 : 0));
this.info.put ("nCs", Integer.$valueOf (this.nAxes[0]));
this.info.put ("nCn", Integer.$valueOf (nType[1][0]));
this.info.put ("nSn", Integer.$valueOf (nType[2][0]));
this.info.put ("distanceTolerance", Float.$valueOf (this.distanceTolerance));
this.info.put ("linearTolerance", Float.$valueOf (this.linearTolerance));
this.info.put ("detail", sb.toString ().$replace ('\n', ';'));
if (this.principalAxis != null && this.principalAxis.index > 0) this.info.put ("principalAxis", this.principalAxis.normalOrAxis);
if (this.principalPlane != null && this.principalPlane.index > 0) this.info.put ("principalPlane", this.principalPlane.normalOrAxis);
return this.info;
}, "~N,~B,~B,~S,~N,~N");
$_M(c$, "isDrawType", 
function (type, index, scale) {
return (this.drawInfo != null && this.drawType.equals (type == null ? "" : type) && this.drawIndex == index && this.scale == scale);
}, "~S,~N,~N");
c$.$PointGroup$Operation$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.type = 0;
this.order = 0;
this.index = 0;
this.normalOrAxis = null;
Clazz_instantialize (this, arguments);
}, J.symmetry.PointGroup, "Operation");
Clazz_makeConstructor (c$, 
function () {
this.index = ++this.b$["J.symmetry.PointGroup"].nOps;
this.type = 3;
this.order = 1;
if (J.util.Logger.debugging) J.util.Logger.debug ("new operation -- " + J.symmetry.PointGroup.typeNames[this.type]);
});
Clazz_makeConstructor (c$, 
function (a, b) {
this.index = ++this.b$["J.symmetry.PointGroup"].nOps;
this.type = (b < 14 ? 2 : 1);
this.order = b % 14;
this.normalOrAxis = J.util.Quaternion.newVA (a, 180).getNormal ();
if (J.util.Logger.debugging) J.util.Logger.debug ("new operation -- " + (this.order == b ? "S" : "C") + this.order + " " + this.normalOrAxis);
}, "JU.V3,~N");
Clazz_makeConstructor (c$, 
function (a) {
if (a == null) return;
this.index = ++this.b$["J.symmetry.PointGroup"].nOps;
this.type = 0;
this.normalOrAxis = J.util.Quaternion.newVA (a, 180).getNormal ();
if (J.util.Logger.debugging) J.util.Logger.debug ("new operation -- plane " + this.normalOrAxis);
}, "JU.V3");
$_M(c$, "getLabel", 
function () {
switch (this.type) {
case 0:
return "Cs";
case 2:
return "S" + this.order;
default:
return "C" + this.order;
}
});
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"axesMaxN", [15, 0, 0, 1, 3, 1, 10, 0, 1, 0, 6, 0, 1, 0, 0, 0, 15, 10, 6, 6, 10, 0, 1],
"nUnique", [1, 0, 0, 2, 2, 4, 2, 0, 4, 0, 4, 0, 4, 0, 0, 0, 1, 2, 2, 4, 2, 0, 4],
"s3", 3,
"s4", 4,
"s5", 5,
"s6", 6,
"s8", 8,
"s10", 10,
"s12", 12,
"firstProper", 14,
"c2", 16,
"c3", 17,
"c4", 18,
"c5", 19,
"c6", 20,
"c8", 22);
c$.maxAxis = c$.prototype.maxAxis = J.symmetry.PointGroup.axesMaxN.length;
Clazz_defineStatics (c$,
"ATOM_COUNT_MAX", 100,
"OPERATION_PLANE", 0,
"OPERATION_PROPER_AXIS", 1,
"OPERATION_IMPROPER_AXIS", 2,
"OPERATION_INVERSION_CENTER", 3,
"typeNames", ["plane", "proper axis", "improper axis", "center of inversion"]);
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["java.util.Hashtable"], "J.symmetry.SpaceGroup", ["java.lang.Character", "java.util.Arrays", "JU.AU", "$.List", "$.M4", "$.P3", "$.PT", "$.SB", "J.symmetry.HallInfo", "$.HallTranslation", "$.SymmetryOperation", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.index = 0;
this.name = "unknown!";
this.hallSymbol = null;
this.hmSymbol = null;
this.hmSymbolFull = null;
this.hmSymbolExt = null;
this.hmSymbolAbbr = null;
this.hmSymbolAlternative = null;
this.hmSymbolAbbrShort = null;
this.ambiguityType = '\0';
this.uniqueAxis = '\0';
this.axisChoice = '\0';
this.intlTableNumber = null;
this.intlTableNumberFull = null;
this.intlTableNumberExt = null;
this.hallInfo = null;
this.latticeParameter = 0;
this.latticeCode = '\0';
this.operations = null;
this.finalOperations = null;
this.operationCount = 0;
this.latticeOp = -1;
this.xyzList = null;
this.modulationDimension = 0;
this.doNormalize = true;
this.isBio = false;
this.operationList = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "SpaceGroup");
Clazz_prepareFields (c$, function () {
this.xyzList =  new java.util.Hashtable ();
});
c$.getNull = $_M(c$, "getNull", 
function (doInit) {
J.symmetry.SpaceGroup.getSpaceGroups ();
return  new J.symmetry.SpaceGroup (null, doInit);
}, "~B");
Clazz_makeConstructor (c$, 
function (cifLine, doInit) {
this.index = ++J.symmetry.SpaceGroup.sgIndex;
if (!doInit) return;
if (cifLine == null) {
this.addSymmetry ("x,y,z", 0);
} else {
this.buildSpaceGroup (cifLine);
}}, "~S,~B");
$_M(c$, "set", 
function (doNormalize) {
this.doNormalize = doNormalize;
return this;
}, "~B");
c$.createSpaceGroup = $_M(c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, data) {
var sg = null;
if (desiredSpaceGroupIndex >= 0) {
sg = J.symmetry.SpaceGroup.getSpaceGroups ()[desiredSpaceGroupIndex];
} else {
if (Clazz_instanceOf (data, JU.List)) sg = J.symmetry.SpaceGroup.createSGFromList (name, data);
 else sg = J.symmetry.SpaceGroup.determineSpaceGroupNA (name, data);
if (sg == null) sg = J.symmetry.SpaceGroup.createSpaceGroupN (name);
}if (sg != null) sg.generateAllOperators (null);
return sg;
}, "~N,~S,~O");
c$.createSGFromList = $_M(c$, "createSGFromList", 
function (name, data) {
var sg =  new J.symmetry.SpaceGroup ("0;--;--;--", true);
sg.doNormalize = false;
sg.name = name;
var n = data.size ();
for (var i = 0; i < n; i++) {
var operation = data.get (i);
var xyz = "xyz matrix:" + operation;
sg.addSymmetrySM (xyz, operation);
}
return sg;
}, "~S,JU.List");
$_M(c$, "addSymmetry", 
function (xyz, opId) {
xyz = xyz.toLowerCase ();
if (xyz.indexOf ("[[") < 0 && xyz.indexOf ("x4") < 0 && (xyz.indexOf ("x") < 0 || xyz.indexOf ("y") < 0 || xyz.indexOf ("z") < 0)) return -1;
return this.addOperation (xyz, opId);
}, "~S,~N");
$_M(c$, "setFinalOperations", 
function (atoms, atomIndex, count, doNormalize) {
if (this.hallInfo == null && this.latticeParameter != 0) {
var h =  new J.symmetry.HallInfo (J.symmetry.HallTranslation.getHallLatticeEquivalent (this.latticeParameter));
this.generateAllOperators (h);
}this.finalOperations = null;
this.isBio = (this.name.indexOf ("bio") >= 0);
if (this.index >= J.symmetry.SpaceGroup.getSpaceGroups ().length && !this.isBio) {
var sg = this.getDerivedSpaceGroup ();
if (sg != null) this.name = sg.getName ();
}this.finalOperations =  new Array (this.operationCount);
if (doNormalize && count > 0 && atoms != null) {
this.finalOperations[0] =  new J.symmetry.SymmetryOperation (this.operations[0], atoms, atomIndex, count, true);
var atom = atoms[atomIndex];
var c = JU.P3.newP (atom);
this.finalOperations[0].transform (c);
if (c.distance (atom) > 0.0001) for (var i = 0; i < count; i++) {
atom = atoms[atomIndex + i];
c.setT (atom);
this.finalOperations[0].transform (c);
atom.setT (c);
}
}for (var i = 0; i < this.operationCount; i++) {
this.finalOperations[i] =  new J.symmetry.SymmetryOperation (this.operations[i], atoms, atomIndex, count, doNormalize);
}
}, "~A,~N,~N,~B");
$_M(c$, "getOperationCount", 
function () {
return this.finalOperations.length;
});
$_M(c$, "getOperation", 
function (i) {
return this.finalOperations[i];
}, "~N");
$_M(c$, "getXyz", 
function (i, doNormalize) {
return this.finalOperations[i].getXyz (doNormalize);
}, "~N,~B");
$_M(c$, "newPoint", 
function (i, atom1, atom2, transX, transY, transZ) {
this.finalOperations[i].newPoint (atom1, atom2, transX, transY, transZ);
}, "~N,JU.P3,JU.P3,~N,~N,~N");
c$.getInfo = $_M(c$, "getInfo", 
function (spaceGroup, cellInfo) {
var sg;
if (cellInfo != null) {
if (spaceGroup.indexOf ("[") >= 0) spaceGroup = spaceGroup.substring (0, spaceGroup.indexOf ("[")).trim ();
if (spaceGroup.equals ("unspecified!")) return "no space group identified in file";
sg = J.symmetry.SpaceGroup.determineSpaceGroupNA (spaceGroup, cellInfo.getNotionalUnitCell ());
} else if (spaceGroup.equalsIgnoreCase ("ALL")) {
return J.symmetry.SpaceGroup.dumpAll ();
} else if (spaceGroup.equalsIgnoreCase ("ALLSEITZ")) {
return J.symmetry.SpaceGroup.dumpAllSeitz ();
} else {
sg = J.symmetry.SpaceGroup.determineSpaceGroupN (spaceGroup);
if (sg == null) {
sg = J.symmetry.SpaceGroup.createSpaceGroupN (spaceGroup);
} else {
var sb =  new JU.SB ();
while (sg != null) {
sb.append (sg.dumpInfo (null));
sg = J.symmetry.SpaceGroup.determineSpaceGroupNS (spaceGroup, sg);
}
return sb.toString ();
}}return sg == null ? "?" : sg.dumpInfo (cellInfo);
}, "~S,J.api.SymmetryInterface");
$_M(c$, "dumpInfo", 
function (cellInfo) {
var info = this.dumpCanonicalSeitzList ();
if (Clazz_instanceOf (info, J.symmetry.SpaceGroup)) return (info).dumpInfo (null);
var sb =  new JU.SB ().append ("\nHermann-Mauguin symbol: ");
sb.append (this.hmSymbol).append (this.hmSymbolExt.length > 0 ? ":" + this.hmSymbolExt : "").append ("\ninternational table number: ").append (this.intlTableNumber).append (this.intlTableNumberExt.length > 0 ? ":" + this.intlTableNumberExt : "").append ("\n\n").appendI (this.operationCount).append (" operators").append (!this.hallInfo.hallSymbol.equals ("--") ? " from Hall symbol " + this.hallInfo.hallSymbol : "").append (": ");
for (var i = 0; i < this.operationCount; i++) {
sb.append ("\n").append (this.operations[i].xyz);
}
sb.append ("\n\n").append (this.hallInfo == null ? "invalid Hall symbol" : this.hallInfo.dumpInfo ());
sb.append ("\n\ncanonical Seitz: ").append (info).append ("\n----------------------------------------------------\n");
return sb.toString ();
}, "J.api.SymmetryInterface");
$_M(c$, "getName", 
function () {
return this.name;
});
$_M(c$, "getLatticeDesignation", 
function () {
return this.latticeCode + ": " + J.symmetry.HallTranslation.getLatticeDesignation (this.latticeParameter);
});
$_M(c$, "setLatticeParam", 
function (latticeParameter) {
this.latticeParameter = latticeParameter;
this.latticeCode = J.symmetry.HallTranslation.getLatticeCode (latticeParameter);
if (latticeParameter > 10) {
this.latticeParameter = -J.symmetry.HallTranslation.getLatticeIndex (this.latticeCode);
}}, "~N");
$_M(c$, "dumpCanonicalSeitzList", 
function () {
if (this.hallInfo == null) this.hallInfo =  new J.symmetry.HallInfo (this.hallSymbol);
this.generateAllOperators (null);
var s = this.getCanonicalSeitzList ();
if (this.index >= J.symmetry.SpaceGroup.spaceGroupDefinitions.length) {
var sgDerived = J.symmetry.SpaceGroup.findSpaceGroup (s);
if (sgDerived != null) return sgDerived;
}return (this.index >= 0 && this.index < J.symmetry.SpaceGroup.spaceGroupDefinitions.length ? this.hallSymbol + " = " : "") + s;
});
$_M(c$, "getDerivedSpaceGroup", 
function () {
if (this.index >= 0 && this.index < J.symmetry.SpaceGroup.spaceGroupDefinitions.length) return this;
if (this.finalOperations != null) this.setFinalOperations (null, 0, 0, false);
var s = this.getCanonicalSeitzList ();
return J.symmetry.SpaceGroup.findSpaceGroup (s);
});
$_M(c$, "getCanonicalSeitzList", 
function () {
var list =  new Array (this.operationCount);
for (var i = 0; i < this.operationCount; i++) list[i] = J.symmetry.SymmetryOperation.dumpCanonicalSeitz (this.operations[i]);

java.util.Arrays.sort (list, 0, this.operationCount);
var sb =  new JU.SB ().append ("\n[");
for (var i = 0; i < this.operationCount; i++) sb.append (list[i].$replace ('\t', ' ').$replace ('\n', ' ')).append ("; ");

sb.append ("]");
return sb.toString ();
});
c$.findSpaceGroup = $_M(c$, "findSpaceGroup", 
function (s) {
J.symmetry.SpaceGroup.getSpaceGroups ();
if (J.symmetry.SpaceGroup.canonicalSeitzList == null) J.symmetry.SpaceGroup.canonicalSeitzList =  new Array (J.symmetry.SpaceGroup.spaceGroupDefinitions.length);
for (var i = 0; i < J.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) {
if (J.symmetry.SpaceGroup.canonicalSeitzList[i] == null) J.symmetry.SpaceGroup.canonicalSeitzList[i] = J.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpCanonicalSeitzList ();
if (J.symmetry.SpaceGroup.canonicalSeitzList[i].indexOf (s) >= 0) return J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
}
return null;
}, "~S");
c$.dumpAll = $_M(c$, "dumpAll", 
function () {
var sb =  new JU.SB ();
J.symmetry.SpaceGroup.getSpaceGroups ();
for (var i = 0; i < J.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) sb.append ("\n----------------------\n" + J.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpInfo (null));

return sb.toString ();
});
c$.dumpAllSeitz = $_M(c$, "dumpAllSeitz", 
function () {
J.symmetry.SpaceGroup.getSpaceGroups ();
var sb =  new JU.SB ();
for (var i = 0; i < J.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) sb.append ("\n").appendO (J.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpCanonicalSeitzList ());

return sb.toString ();
});
$_M(c$, "setLattice", 
function (latticeCode, isCentrosymmetric) {
this.latticeCode = latticeCode;
this.latticeParameter = J.symmetry.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) this.latticeParameter = -this.latticeParameter;
}, "~S,~B");
c$.createSpaceGroupN = $_M(c$, "createSpaceGroupN", 
function (name) {
J.symmetry.SpaceGroup.getSpaceGroups ();
name = name.trim ();
var sg = J.symmetry.SpaceGroup.determineSpaceGroupN (name);
var hallInfo;
if (sg == null) {
hallInfo =  new J.symmetry.HallInfo (name);
if (hallInfo.nRotations > 0) {
sg =  new J.symmetry.SpaceGroup ("0;--;--;" + name, true);
sg.hallInfo = hallInfo;
} else if (name.indexOf (",") >= 0) {
sg =  new J.symmetry.SpaceGroup ("0;--;--;--", true);
sg.doNormalize = false;
sg.generateOperatorsFromXyzInfo (name);
}}if (sg != null) sg.generateAllOperators (null);
return sg;
}, "~S");
$_M(c$, "addOperation", 
function (xyz0, opId) {
if (xyz0 == null || xyz0.length < 3) {
this.xyzList =  new java.util.Hashtable ();
return -1;
}var isSpecial = (xyz0.charAt (0) == '=');
if (isSpecial) xyz0 = xyz0.substring (1);
if (this.xyzList.containsKey (xyz0)) return this.xyzList.get (xyz0).intValue ();
if (xyz0.startsWith ("x1,x2,x3,x4") && this.modulationDimension == 0) {
this.xyzList.clear ();
this.operationCount = 0;
this.modulationDimension = JU.PT.parseInt (xyz0.substring (xyz0.lastIndexOf ("x") + 1)) - 3;
}var op =  new J.symmetry.SymmetryOperation (null, null, 0, opId, this.doNormalize);
if (!op.setMatrixFromXYZ (xyz0, this.modulationDimension)) {
J.util.Logger.error ("couldn't interpret symmetry operation: " + xyz0);
return -1;
}return this.addOp (op, xyz0, isSpecial);
}, "~S,~N");
$_M(c$, "addOp", 
function (op, xyz0, isSpecial) {
var xyz = op.xyz;
if (!isSpecial) {
if (this.xyzList.containsKey (xyz)) return this.xyzList.get (xyz).intValue ();
if (this.latticeOp < 0 && this.xyzList.containsKey (JU.PT.simpleReplace (JU.PT.simpleReplace (xyz, "+1/2", ""), "+1/2", ""))) this.latticeOp = this.operationCount;
this.xyzList.put (xyz, Integer.$valueOf (this.operationCount));
}if (xyz != null && !xyz.equals (xyz0)) this.xyzList.put (xyz0, Integer.$valueOf (this.operationCount));
if (this.operations == null) this.operations =  new Array (4);
if (this.operationCount == this.operations.length) this.operations = JU.AU.arrayCopyObject (this.operations, this.operationCount * 2);
this.operations[this.operationCount++] = op;
if (J.util.Logger.debugging) J.util.Logger.debug ("\naddOperation " + this.operationCount + op.dumpInfo ());
return this.operationCount - 1;
}, "J.symmetry.SymmetryOperation,~S,~B");
$_M(c$, "generateOperatorsFromXyzInfo", 
function (xyzInfo) {
this.addOperation (null, 0);
this.addSymmetry ("x,y,z", 0);
var terms = JU.PT.split (xyzInfo.toLowerCase (), ";");
for (var i = 0; i < terms.length; i++) this.addSymmetry (terms[i], 0);

}, "~S");
$_M(c$, "generateAllOperators", 
function (h) {
if (h == null) {
h = this.hallInfo;
if (this.operationCount > 0) return;
this.operations =  new Array (4);
if (this.hallInfo == null || this.hallInfo.nRotations == 0) h = this.hallInfo =  new J.symmetry.HallInfo (this.hallSymbol);
this.setLattice (this.hallInfo.latticeCode, this.hallInfo.isCentrosymmetric);
this.addOperation (null, 0);
this.addSymmetry ("x,y,z", 0);
}var mat1 =  new JU.M4 ();
var operation =  new JU.M4 ();
var newOps =  new Array (7);
for (var i = 0; i < 7; i++) newOps[i] =  new JU.M4 ();

for (var i = 0; i < h.nRotations; i++) {
mat1.setM (h.rotationTerms[i].seitzMatrix12ths);
var nRot = h.rotationTerms[i].order;
newOps[0].setIdentity ();
var nOps = this.operationCount;
for (var j = 1; j <= nRot; j++) {
newOps[j].mul2 (mat1, newOps[0]);
newOps[0].setM (newOps[j]);
for (var k = 0; k < nOps; k++) {
operation.mul2 (newOps[j], this.operations[k]);
J.symmetry.SymmetryOperation.normalizeTranslation (operation);
var xyz = J.symmetry.SymmetryOperation.getXYZFromMatrix (operation, true, true, true);
this.addSymmetrySM (xyz, operation);
}
}
}
}, "J.symmetry.HallInfo");
$_M(c$, "addSymmetrySM", 
function (xyz, operation) {
var iop = this.addOperation (xyz, 0);
if (iop >= 0) {
var symmetryOperation = this.operations[iop];
symmetryOperation.setM (operation);
}return iop;
}, "~S,JU.M4");
c$.determineSpaceGroupN = $_M(c$, "determineSpaceGroupN", 
function (name) {
return J.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1);
}, "~S");
c$.determineSpaceGroupNS = $_M(c$, "determineSpaceGroupNS", 
function (name, sg) {
return J.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, sg.index);
}, "~S,J.symmetry.SpaceGroup");
c$.determineSpaceGroupNA = $_M(c$, "determineSpaceGroupNA", 
function (name, notionalUnitcell) {
if (notionalUnitcell == null) return J.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1);
return J.symmetry.SpaceGroup.determineSpaceGroup (name, notionalUnitcell[0], notionalUnitcell[1], notionalUnitcell[2], notionalUnitcell[3], notionalUnitcell[4], notionalUnitcell[5], -1);
}, "~S,~A");
c$.determineSpaceGroup = $_M(c$, "determineSpaceGroup", 
function (name, a, b, c, alpha, beta, gamma, lastIndex) {
var i = J.symmetry.SpaceGroup.determineSpaceGroupIndex (name, a, b, c, alpha, beta, gamma, lastIndex);
return (i >= 0 ? J.symmetry.SpaceGroup.spaceGroupDefinitions[i] : null);
}, "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineSpaceGroupIndex = $_M(c$, "determineSpaceGroupIndex", 
function (name, a, b, c, alpha, beta, gamma, lastIndex) {
J.symmetry.SpaceGroup.getSpaceGroups ();
if (lastIndex < 0) lastIndex = J.symmetry.SpaceGroup.spaceGroupDefinitions.length;
name = name.trim ().toLowerCase ();
var nameType = (name.startsWith ("hall:") ? 5 : name.startsWith ("hm:") ? 3 : 0);
if (nameType > 0) name = name.substring (nameType);
 else if (name.contains ("[")) {
nameType = 5;
name = name.substring (0, name.indexOf ("[")).trim ();
}var nameExt = name;
var i;
var haveExtension = false;
name = name.$replace ('_', ' ');
if (name.length >= 2) {
i = (name.indexOf ("-") == 0 ? 2 : 1);
if (i < name.length && name.charAt (i) != ' ') name = name.substring (0, i) + " " + name.substring (i);
name = name.substring (0, 2).toUpperCase () + name.substring (2);
}var ext = "";
if ((i = name.indexOf (":")) > 0) {
ext = name.substring (i + 1);
name = name.substring (0, i).trim ();
haveExtension = true;
}if (nameType != 5 && !haveExtension && JU.PT.isOneOf (name, J.symmetry.SpaceGroup.ambiguousNames)) {
ext = "?";
haveExtension = true;
}var abbr = JU.PT.replaceAllCharacters (name, " ()", "");
var s;
if (nameType != 3 && !haveExtension) for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hallSymbol.equals (name)) return i;
}
if (nameType != 5) {
if (nameType != 3) for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.intlTableNumberFull.equals (nameExt)) return i;
}
for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolFull.equals (nameExt)) return i;
}
for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAlternative != null && s.hmSymbolAlternative.equals (nameExt)) return i;
}
if (haveExtension) for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbr.equals (abbr) && s.intlTableNumberExt.equals (ext)) return i;
}
if (haveExtension) for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbrShort.equals (abbr) && s.intlTableNumberExt.equals (ext)) return i;
}
var uniqueAxis = J.symmetry.SpaceGroup.determineUniqueAxis (a, b, c, alpha, beta, gamma);
if (!haveExtension || ext.charAt (0) == '?') for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbr.equals (abbr) || s.hmSymbolAbbrShort.equals (abbr)) {
switch (s.ambiguityType) {
case '\0':
return i;
case 'a':
if (s.uniqueAxis == uniqueAxis || uniqueAxis == '\0') return i;
break;
case 'o':
if (ext.length == 0) {
if (s.hmSymbolExt.equals ("2")) return i;
} else if (s.hmSymbolExt.equals (ext)) return i;
break;
case 't':
if (ext.length == 0) {
if (s.axisChoice == 'h') return i;
} else if ((s.axisChoice + "").equals (ext)) return i;
break;
}
}}
}if (ext.length == 0) for (i = lastIndex; --i >= 0; ) {
s = J.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.intlTableNumber.equals (nameExt)) return i;
}
return -1;
}, "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineUniqueAxis = $_M(c$, "determineUniqueAxis", 
function (a, b, c, alpha, beta, gamma) {
if (a == b) return (b == c ? '\0' : 'c');
if (b == c) return 'a';
if (c == a) return 'b';
if (alpha == beta) return (beta == gamma ? '\0' : 'c');
if (beta == gamma) return 'a';
if (gamma == alpha) return 'b';
return '\0';
}, "~N,~N,~N,~N,~N,~N");
$_M(c$, "buildSpaceGroup", 
function (cifLine) {
var terms = JU.PT.split (cifLine.toLowerCase (), ";");
var parts;
this.intlTableNumberFull = terms[0].trim ();
parts = JU.PT.split (this.intlTableNumberFull, ":");
this.intlTableNumber = parts[0];
this.intlTableNumberExt = (parts.length == 1 ? "" : parts[1]);
this.ambiguityType = '\0';
if (this.intlTableNumberExt.length > 0) {
var term = this.intlTableNumberExt;
if (term.startsWith ("-")) term = term.substring (1);
if (term.equals ("h") || term.equals ("r")) {
this.ambiguityType = 't';
this.axisChoice = this.intlTableNumberExt.charAt (0);
} else if (this.intlTableNumberExt.startsWith ("1") || this.intlTableNumberExt.startsWith ("2")) {
this.ambiguityType = 'o';
} else if (this.intlTableNumberExt.length <= 2) {
this.ambiguityType = 'a';
this.uniqueAxis = this.intlTableNumberExt.charAt (0);
}}this.hmSymbolFull = Character.toUpperCase (terms[2].charAt (0)) + terms[2].substring (1);
parts = JU.PT.split (this.hmSymbolFull, ":");
this.hmSymbol = parts[0];
this.hmSymbolExt = (parts.length == 1 ? "" : parts[1]);
var pt = this.hmSymbol.indexOf (" -3");
if (pt >= 1) if ("admn".indexOf (this.hmSymbol.charAt (pt - 1)) >= 0) {
this.hmSymbolAlternative = (this.hmSymbol.substring (0, pt) + " 3" + this.hmSymbol.substring (pt + 3)).toLowerCase ();
}this.hmSymbolAbbr = JU.PT.simpleReplace (this.hmSymbol, " ", "");
this.hmSymbolAbbrShort = JU.PT.simpleReplace (this.hmSymbol, " 1", "");
this.hmSymbolAbbrShort = JU.PT.simpleReplace (this.hmSymbolAbbrShort, " ", "");
this.hallSymbol = terms[3];
if (this.hallSymbol.length > 1) this.hallSymbol = this.hallSymbol.substring (0, 2).toUpperCase () + this.hallSymbol.substring (2);
var info = this.intlTableNumber + this.hallSymbol;
if (this.intlTableNumber.charAt (0) != '0' && J.symmetry.SpaceGroup.lastInfo.equals (info)) J.symmetry.SpaceGroup.ambiguousNames += this.hmSymbol + ";";
J.symmetry.SpaceGroup.lastInfo = info;
this.name = this.hallSymbol + " [" + this.hmSymbolFull + "] #" + this.intlTableNumber;
}, "~S");
c$.getSpaceGroups = $_M(c$, "getSpaceGroups", 
function () {
return (J.symmetry.SpaceGroup.spaceGroupDefinitions == null ? J.symmetry.SpaceGroup.spaceGroupDefinitions = [ new J.symmetry.SpaceGroup ("1;c1^1;p 1;p 1", true),  new J.symmetry.SpaceGroup ("2;ci^1;p -1;-p 1", true),  new J.symmetry.SpaceGroup ("3:b;c2^1;p 1 2 1;p 2y", true),  new J.symmetry.SpaceGroup ("3:b;c2^1;p 2;p 2y", true),  new J.symmetry.SpaceGroup ("3:c;c2^1;p 1 1 2;p 2", true),  new J.symmetry.SpaceGroup ("3:a;c2^1;p 2 1 1;p 2x", true),  new J.symmetry.SpaceGroup ("4:b;c2^2;p 1 21 1;p 2yb", true),  new J.symmetry.SpaceGroup ("4:b;c2^2;p 21;p 2yb", true),  new J.symmetry.SpaceGroup ("4:b*;c2^2;p 1 21 1*;p 2y1", true),  new J.symmetry.SpaceGroup ("4:c;c2^2;p 1 1 21;p 2c", true),  new J.symmetry.SpaceGroup ("4:c*;c2^2;p 1 1 21*;p 21", true),  new J.symmetry.SpaceGroup ("4:a;c2^2;p 21 1 1;p 2xa", true),  new J.symmetry.SpaceGroup ("4:a*;c2^2;p 21 1 1*;p 2x1", true),  new J.symmetry.SpaceGroup ("5:b1;c2^3;c 1 2 1;c 2y", true),  new J.symmetry.SpaceGroup ("5:b1;c2^3;c 2;c 2y", true),  new J.symmetry.SpaceGroup ("5:b2;c2^3;a 1 2 1;a 2y", true),  new J.symmetry.SpaceGroup ("5:b3;c2^3;i 1 2 1;i 2y", true),  new J.symmetry.SpaceGroup ("5:c1;c2^3;a 1 1 2;a 2", true),  new J.symmetry.SpaceGroup ("5:c2;c2^3;b 1 1 2;b 2", true),  new J.symmetry.SpaceGroup ("5:c3;c2^3;i 1 1 2;i 2", true),  new J.symmetry.SpaceGroup ("5:a1;c2^3;b 2 1 1;b 2x", true),  new J.symmetry.SpaceGroup ("5:a2;c2^3;c 2 1 1;c 2x", true),  new J.symmetry.SpaceGroup ("5:a3;c2^3;i 2 1 1;i 2x", true),  new J.symmetry.SpaceGroup ("6:b;cs^1;p 1 m 1;p -2y", true),  new J.symmetry.SpaceGroup ("6:b;cs^1;p m;p -2y", true),  new J.symmetry.SpaceGroup ("6:c;cs^1;p 1 1 m;p -2", true),  new J.symmetry.SpaceGroup ("6:a;cs^1;p m 1 1;p -2x", true),  new J.symmetry.SpaceGroup ("7:b1;cs^2;p 1 c 1;p -2yc", true),  new J.symmetry.SpaceGroup ("7:b1;cs^2;p c;p -2yc", true),  new J.symmetry.SpaceGroup ("7:b2;cs^2;p 1 n 1;p -2yac", true),  new J.symmetry.SpaceGroup ("7:b2;cs^2;p n;p -2yac", true),  new J.symmetry.SpaceGroup ("7:b3;cs^2;p 1 a 1;p -2ya", true),  new J.symmetry.SpaceGroup ("7:b3;cs^2;p a;p -2ya", true),  new J.symmetry.SpaceGroup ("7:c1;cs^2;p 1 1 a;p -2a", true),  new J.symmetry.SpaceGroup ("7:c2;cs^2;p 1 1 n;p -2ab", true),  new J.symmetry.SpaceGroup ("7:c3;cs^2;p 1 1 b;p -2b", true),  new J.symmetry.SpaceGroup ("7:a1;cs^2;p b 1 1;p -2xb", true),  new J.symmetry.SpaceGroup ("7:a2;cs^2;p n 1 1;p -2xbc", true),  new J.symmetry.SpaceGroup ("7:a3;cs^2;p c 1 1;p -2xc", true),  new J.symmetry.SpaceGroup ("8:b1;cs^3;c 1 m 1;c -2y", true),  new J.symmetry.SpaceGroup ("8:b1;cs^3;c m;c -2y", true),  new J.symmetry.SpaceGroup ("8:b2;cs^3;a 1 m 1;a -2y", true),  new J.symmetry.SpaceGroup ("8:b3;cs^3;i 1 m 1;i -2y", true),  new J.symmetry.SpaceGroup ("8:b3;cs^3;i m;i -2y", true),  new J.symmetry.SpaceGroup ("8:c1;cs^3;a 1 1 m;a -2", true),  new J.symmetry.SpaceGroup ("8:c2;cs^3;b 1 1 m;b -2", true),  new J.symmetry.SpaceGroup ("8:c3;cs^3;i 1 1 m;i -2", true),  new J.symmetry.SpaceGroup ("8:a1;cs^3;b m 1 1;b -2x", true),  new J.symmetry.SpaceGroup ("8:a2;cs^3;c m 1 1;c -2x", true),  new J.symmetry.SpaceGroup ("8:a3;cs^3;i m 1 1;i -2x", true),  new J.symmetry.SpaceGroup ("9:b1;cs^4;c 1 c 1;c -2yc", true),  new J.symmetry.SpaceGroup ("9:b1;cs^4;c c;c -2yc", true),  new J.symmetry.SpaceGroup ("9:b2;cs^4;a 1 n 1;a -2yab", true),  new J.symmetry.SpaceGroup ("9:b3;cs^4;i 1 a 1;i -2ya", true),  new J.symmetry.SpaceGroup ("9:-b1;cs^4;a 1 a 1;a -2ya", true),  new J.symmetry.SpaceGroup ("9:-b2;cs^4;c 1 n 1;c -2yac", true),  new J.symmetry.SpaceGroup ("9:-b3;cs^4;i 1 c 1;i -2yc", true),  new J.symmetry.SpaceGroup ("9:c1;cs^4;a 1 1 a;a -2a", true),  new J.symmetry.SpaceGroup ("9:c2;cs^4;b 1 1 n;b -2ab", true),  new J.symmetry.SpaceGroup ("9:c3;cs^4;i 1 1 b;i -2b", true),  new J.symmetry.SpaceGroup ("9:-c1;cs^4;b 1 1 b;b -2b", true),  new J.symmetry.SpaceGroup ("9:-c2;cs^4;a 1 1 n;a -2ab", true),  new J.symmetry.SpaceGroup ("9:-c3;cs^4;i 1 1 a;i -2a", true),  new J.symmetry.SpaceGroup ("9:a1;cs^4;b b 1 1;b -2xb", true),  new J.symmetry.SpaceGroup ("9:a2;cs^4;c n 1 1;c -2xac", true),  new J.symmetry.SpaceGroup ("9:a3;cs^4;i c 1 1;i -2xc", true),  new J.symmetry.SpaceGroup ("9:-a1;cs^4;c c 1 1;c -2xc", true),  new J.symmetry.SpaceGroup ("9:-a2;cs^4;b n 1 1;b -2xab", true),  new J.symmetry.SpaceGroup ("9:-a3;cs^4;i b 1 1;i -2xb", true),  new J.symmetry.SpaceGroup ("10:b;c2h^1;p 1 2/m 1;-p 2y", true),  new J.symmetry.SpaceGroup ("10:b;c2h^1;p 2/m;-p 2y", true),  new J.symmetry.SpaceGroup ("10:c;c2h^1;p 1 1 2/m;-p 2", true),  new J.symmetry.SpaceGroup ("10:a;c2h^1;p 2/m 1 1;-p 2x", true),  new J.symmetry.SpaceGroup ("11:b;c2h^2;p 1 21/m 1;-p 2yb", true),  new J.symmetry.SpaceGroup ("11:b;c2h^2;p 21/m;-p 2yb", true),  new J.symmetry.SpaceGroup ("11:b*;c2h^2;p 1 21/m 1*;-p 2y1", true),  new J.symmetry.SpaceGroup ("11:c;c2h^2;p 1 1 21/m;-p 2c", true),  new J.symmetry.SpaceGroup ("11:c*;c2h^2;p 1 1 21/m*;-p 21", true),  new J.symmetry.SpaceGroup ("11:a;c2h^2;p 21/m 1 1;-p 2xa", true),  new J.symmetry.SpaceGroup ("11:a*;c2h^2;p 21/m 1 1*;-p 2x1", true),  new J.symmetry.SpaceGroup ("12:b1;c2h^3;c 1 2/m 1;-c 2y", true),  new J.symmetry.SpaceGroup ("12:b1;c2h^3;c 2/m;-c 2y", true),  new J.symmetry.SpaceGroup ("12:b2;c2h^3;a 1 2/m 1;-a 2y", true),  new J.symmetry.SpaceGroup ("12:b3;c2h^3;i 1 2/m 1;-i 2y", true),  new J.symmetry.SpaceGroup ("12:b3;c2h^3;i 2/m;-i 2y", true),  new J.symmetry.SpaceGroup ("12:c1;c2h^3;a 1 1 2/m;-a 2", true),  new J.symmetry.SpaceGroup ("12:c2;c2h^3;b 1 1 2/m;-b 2", true),  new J.symmetry.SpaceGroup ("12:c3;c2h^3;i 1 1 2/m;-i 2", true),  new J.symmetry.SpaceGroup ("12:a1;c2h^3;b 2/m 1 1;-b 2x", true),  new J.symmetry.SpaceGroup ("12:a2;c2h^3;c 2/m 1 1;-c 2x", true),  new J.symmetry.SpaceGroup ("12:a3;c2h^3;i 2/m 1 1;-i 2x", true),  new J.symmetry.SpaceGroup ("13:b1;c2h^4;p 1 2/c 1;-p 2yc", true),  new J.symmetry.SpaceGroup ("13:b1;c2h^4;p 2/c;-p 2yc", true),  new J.symmetry.SpaceGroup ("13:b2;c2h^4;p 1 2/n 1;-p 2yac", true),  new J.symmetry.SpaceGroup ("13:b2;c2h^4;p 2/n;-p 2yac", true),  new J.symmetry.SpaceGroup ("13:b3;c2h^4;p 1 2/a 1;-p 2ya", true),  new J.symmetry.SpaceGroup ("13:b3;c2h^4;p 2/a;-p 2ya", true),  new J.symmetry.SpaceGroup ("13:c1;c2h^4;p 1 1 2/a;-p 2a", true),  new J.symmetry.SpaceGroup ("13:c2;c2h^4;p 1 1 2/n;-p 2ab", true),  new J.symmetry.SpaceGroup ("13:c3;c2h^4;p 1 1 2/b;-p 2b", true),  new J.symmetry.SpaceGroup ("13:a1;c2h^4;p 2/b 1 1;-p 2xb", true),  new J.symmetry.SpaceGroup ("13:a2;c2h^4;p 2/n 1 1;-p 2xbc", true),  new J.symmetry.SpaceGroup ("13:a3;c2h^4;p 2/c 1 1;-p 2xc", true),  new J.symmetry.SpaceGroup ("14:b1;c2h^5;p 1 21/c 1;-p 2ybc", true),  new J.symmetry.SpaceGroup ("14:b1;c2h^5;p 21/c;-p 2ybc", true),  new J.symmetry.SpaceGroup ("14:b2;c2h^5;p 1 21/n 1;-p 2yn", true),  new J.symmetry.SpaceGroup ("14:b2;c2h^5;p 21/n;-p 2yn", true),  new J.symmetry.SpaceGroup ("14:b3;c2h^5;p 1 21/a 1;-p 2yab", true),  new J.symmetry.SpaceGroup ("14:b3;c2h^5;p 21/a;-p 2yab", true),  new J.symmetry.SpaceGroup ("14:c1;c2h^5;p 1 1 21/a;-p 2ac", true),  new J.symmetry.SpaceGroup ("14:c2;c2h^5;p 1 1 21/n;-p 2n", true),  new J.symmetry.SpaceGroup ("14:c3;c2h^5;p 1 1 21/b;-p 2bc", true),  new J.symmetry.SpaceGroup ("14:a1;c2h^5;p 21/b 1 1;-p 2xab", true),  new J.symmetry.SpaceGroup ("14:a2;c2h^5;p 21/n 1 1;-p 2xn", true),  new J.symmetry.SpaceGroup ("14:a3;c2h^5;p 21/c 1 1;-p 2xac", true),  new J.symmetry.SpaceGroup ("15:b1;c2h^6;c 1 2/c 1;-c 2yc", true),  new J.symmetry.SpaceGroup ("15:b1;c2h^6;c 2/c;-c 2yc", true),  new J.symmetry.SpaceGroup ("15:b2;c2h^6;a 1 2/n 1;-a 2yab", true),  new J.symmetry.SpaceGroup ("15:b3;c2h^6;i 1 2/a 1;-i 2ya", true),  new J.symmetry.SpaceGroup ("15:b3;c2h^6;i 2/a;-i 2ya", true),  new J.symmetry.SpaceGroup ("15:-b1;c2h^6;a 1 2/a 1;-a 2ya", true),  new J.symmetry.SpaceGroup ("15:-b2;c2h^6;c 1 2/n 1;-c 2yac", true),  new J.symmetry.SpaceGroup ("15:-b2;c2h^6;c 2/n;-c 2yac", true),  new J.symmetry.SpaceGroup ("15:-b3;c2h^6;i 1 2/c 1;-i 2yc", true),  new J.symmetry.SpaceGroup ("15:-b3;c2h^6;i 2/c;-i 2yc", true),  new J.symmetry.SpaceGroup ("15:c1;c2h^6;a 1 1 2/a;-a 2a", true),  new J.symmetry.SpaceGroup ("15:c2;c2h^6;b 1 1 2/n;-b 2ab", true),  new J.symmetry.SpaceGroup ("15:c3;c2h^6;i 1 1 2/b;-i 2b", true),  new J.symmetry.SpaceGroup ("15:-c1;c2h^6;b 1 1 2/b;-b 2b", true),  new J.symmetry.SpaceGroup ("15:-c2;c2h^6;a 1 1 2/n;-a 2ab", true),  new J.symmetry.SpaceGroup ("15:-c3;c2h^6;i 1 1 2/a;-i 2a", true),  new J.symmetry.SpaceGroup ("15:a1;c2h^6;b 2/b 1 1;-b 2xb", true),  new J.symmetry.SpaceGroup ("15:a2;c2h^6;c 2/n 1 1;-c 2xac", true),  new J.symmetry.SpaceGroup ("15:a3;c2h^6;i 2/c 1 1;-i 2xc", true),  new J.symmetry.SpaceGroup ("15:-a1;c2h^6;c 2/c 1 1;-c 2xc", true),  new J.symmetry.SpaceGroup ("15:-a2;c2h^6;b 2/n 1 1;-b 2xab", true),  new J.symmetry.SpaceGroup ("15:-a3;c2h^6;i 2/b 1 1;-i 2xb", true),  new J.symmetry.SpaceGroup ("16;d2^1;p 2 2 2;p 2 2", true),  new J.symmetry.SpaceGroup ("17;d2^2;p 2 2 21;p 2c 2", true),  new J.symmetry.SpaceGroup ("17*;d2^2;p 2 2 21*;p 21 2", true),  new J.symmetry.SpaceGroup ("17:cab;d2^2;p 21 2 2;p 2a 2a", true),  new J.symmetry.SpaceGroup ("17:bca;d2^2;p 2 21 2;p 2 2b", true),  new J.symmetry.SpaceGroup ("18;d2^3;p 21 21 2;p 2 2ab", true),  new J.symmetry.SpaceGroup ("18:cab;d2^3;p 2 21 21;p 2bc 2", true),  new J.symmetry.SpaceGroup ("18:bca;d2^3;p 21 2 21;p 2ac 2ac", true),  new J.symmetry.SpaceGroup ("19;d2^4;p 21 21 21;p 2ac 2ab", true),  new J.symmetry.SpaceGroup ("20;d2^5;c 2 2 21;c 2c 2", true),  new J.symmetry.SpaceGroup ("20*;d2^5;c 2 2 21*;c 21 2", true),  new J.symmetry.SpaceGroup ("20:cab;d2^5;a 21 2 2;a 2a 2a", true),  new J.symmetry.SpaceGroup ("20:cab*;d2^5;a 21 2 2*;a 2a 21", true),  new J.symmetry.SpaceGroup ("20:bca;d2^5;b 2 21 2;b 2 2b", true),  new J.symmetry.SpaceGroup ("21;d2^6;c 2 2 2;c 2 2", true),  new J.symmetry.SpaceGroup ("21:cab;d2^6;a 2 2 2;a 2 2", true),  new J.symmetry.SpaceGroup ("21:bca;d2^6;b 2 2 2;b 2 2", true),  new J.symmetry.SpaceGroup ("22;d2^7;f 2 2 2;f 2 2", true),  new J.symmetry.SpaceGroup ("23;d2^8;i 2 2 2;i 2 2", true),  new J.symmetry.SpaceGroup ("24;d2^9;i 21 21 21;i 2b 2c", true),  new J.symmetry.SpaceGroup ("25;c2v^1;p m m 2;p 2 -2", true),  new J.symmetry.SpaceGroup ("25:cab;c2v^1;p 2 m m;p -2 2", true),  new J.symmetry.SpaceGroup ("25:bca;c2v^1;p m 2 m;p -2 -2", true),  new J.symmetry.SpaceGroup ("26;c2v^2;p m c 21;p 2c -2", true),  new J.symmetry.SpaceGroup ("26*;c2v^2;p m c 21*;p 21 -2", true),  new J.symmetry.SpaceGroup ("26:ba-c;c2v^2;p c m 21;p 2c -2c", true),  new J.symmetry.SpaceGroup ("26:ba-c*;c2v^2;p c m 21*;p 21 -2c", true),  new J.symmetry.SpaceGroup ("26:cab;c2v^2;p 21 m a;p -2a 2a", true),  new J.symmetry.SpaceGroup ("26:-cba;c2v^2;p 21 a m;p -2 2a", true),  new J.symmetry.SpaceGroup ("26:bca;c2v^2;p b 21 m;p -2 -2b", true),  new J.symmetry.SpaceGroup ("26:a-cb;c2v^2;p m 21 b;p -2b -2", true),  new J.symmetry.SpaceGroup ("27;c2v^3;p c c 2;p 2 -2c", true),  new J.symmetry.SpaceGroup ("27:cab;c2v^3;p 2 a a;p -2a 2", true),  new J.symmetry.SpaceGroup ("27:bca;c2v^3;p b 2 b;p -2b -2b", true),  new J.symmetry.SpaceGroup ("28;c2v^4;p m a 2;p 2 -2a", true),  new J.symmetry.SpaceGroup ("28*;c2v^4;p m a 2*;p 2 -21", true),  new J.symmetry.SpaceGroup ("28:ba-c;c2v^4;p b m 2;p 2 -2b", true),  new J.symmetry.SpaceGroup ("28:cab;c2v^4;p 2 m b;p -2b 2", true),  new J.symmetry.SpaceGroup ("28:-cba;c2v^4;p 2 c m;p -2c 2", true),  new J.symmetry.SpaceGroup ("28:-cba*;c2v^4;p 2 c m*;p -21 2", true),  new J.symmetry.SpaceGroup ("28:bca;c2v^4;p c 2 m;p -2c -2c", true),  new J.symmetry.SpaceGroup ("28:a-cb;c2v^4;p m 2 a;p -2a -2a", true),  new J.symmetry.SpaceGroup ("29;c2v^5;p c a 21;p 2c -2ac", true),  new J.symmetry.SpaceGroup ("29:ba-c;c2v^5;p b c 21;p 2c -2b", true),  new J.symmetry.SpaceGroup ("29:cab;c2v^5;p 21 a b;p -2b 2a", true),  new J.symmetry.SpaceGroup ("29:-cba;c2v^5;p 21 c a;p -2ac 2a", true),  new J.symmetry.SpaceGroup ("29:bca;c2v^5;p c 21 b;p -2bc -2c", true),  new J.symmetry.SpaceGroup ("29:a-cb;c2v^5;p b 21 a;p -2a -2ab", true),  new J.symmetry.SpaceGroup ("30;c2v^6;p n c 2;p 2 -2bc", true),  new J.symmetry.SpaceGroup ("30:ba-c;c2v^6;p c n 2;p 2 -2ac", true),  new J.symmetry.SpaceGroup ("30:cab;c2v^6;p 2 n a;p -2ac 2", true),  new J.symmetry.SpaceGroup ("30:-cba;c2v^6;p 2 a n;p -2ab 2", true),  new J.symmetry.SpaceGroup ("30:bca;c2v^6;p b 2 n;p -2ab -2ab", true),  new J.symmetry.SpaceGroup ("30:a-cb;c2v^6;p n 2 b;p -2bc -2bc", true),  new J.symmetry.SpaceGroup ("31;c2v^7;p m n 21;p 2ac -2", true),  new J.symmetry.SpaceGroup ("31:ba-c;c2v^7;p n m 21;p 2bc -2bc", true),  new J.symmetry.SpaceGroup ("31:cab;c2v^7;p 21 m n;p -2ab 2ab", true),  new J.symmetry.SpaceGroup ("31:-cba;c2v^7;p 21 n m;p -2 2ac", true),  new J.symmetry.SpaceGroup ("31:bca;c2v^7;p n 21 m;p -2 -2bc", true),  new J.symmetry.SpaceGroup ("31:a-cb;c2v^7;p m 21 n;p -2ab -2", true),  new J.symmetry.SpaceGroup ("32;c2v^8;p b a 2;p 2 -2ab", true),  new J.symmetry.SpaceGroup ("32:cab;c2v^8;p 2 c b;p -2bc 2", true),  new J.symmetry.SpaceGroup ("32:bca;c2v^8;p c 2 a;p -2ac -2ac", true),  new J.symmetry.SpaceGroup ("33;c2v^9;p n a 21;p 2c -2n", true),  new J.symmetry.SpaceGroup ("33*;c2v^9;p n a 21*;p 21 -2n", true),  new J.symmetry.SpaceGroup ("33:ba-c;c2v^9;p b n 21;p 2c -2ab", true),  new J.symmetry.SpaceGroup ("33:ba-c*;c2v^9;p b n 21*;p 21 -2ab", true),  new J.symmetry.SpaceGroup ("33:cab;c2v^9;p 21 n b;p -2bc 2a", true),  new J.symmetry.SpaceGroup ("33:cab*;c2v^9;p 21 n b*;p -2bc 21", true),  new J.symmetry.SpaceGroup ("33:-cba;c2v^9;p 21 c n;p -2n 2a", true),  new J.symmetry.SpaceGroup ("33:-cba*;c2v^9;p 21 c n*;p -2n 21", true),  new J.symmetry.SpaceGroup ("33:bca;c2v^9;p c 21 n;p -2n -2ac", true),  new J.symmetry.SpaceGroup ("33:a-cb;c2v^9;p n 21 a;p -2ac -2n", true),  new J.symmetry.SpaceGroup ("34;c2v^10;p n n 2;p 2 -2n", true),  new J.symmetry.SpaceGroup ("34:cab;c2v^10;p 2 n n;p -2n 2", true),  new J.symmetry.SpaceGroup ("34:bca;c2v^10;p n 2 n;p -2n -2n", true),  new J.symmetry.SpaceGroup ("35;c2v^11;c m m 2;c 2 -2", true),  new J.symmetry.SpaceGroup ("35:cab;c2v^11;a 2 m m;a -2 2", true),  new J.symmetry.SpaceGroup ("35:bca;c2v^11;b m 2 m;b -2 -2", true),  new J.symmetry.SpaceGroup ("36;c2v^12;c m c 21;c 2c -2", true),  new J.symmetry.SpaceGroup ("36*;c2v^12;c m c 21*;c 21 -2", true),  new J.symmetry.SpaceGroup ("36:ba-c;c2v^12;c c m 21;c 2c -2c", true),  new J.symmetry.SpaceGroup ("36:ba-c*;c2v^12;c c m 21*;c 21 -2c", true),  new J.symmetry.SpaceGroup ("36:cab;c2v^12;a 21 m a;a -2a 2a", true),  new J.symmetry.SpaceGroup ("36:cab*;c2v^12;a 21 m a*;a -2a 21", true),  new J.symmetry.SpaceGroup ("36:-cba;c2v^12;a 21 a m;a -2 2a", true),  new J.symmetry.SpaceGroup ("36:-cba*;c2v^12;a 21 a m*;a -2 21", true),  new J.symmetry.SpaceGroup ("36:bca;c2v^12;b b 21 m;b -2 -2b", true),  new J.symmetry.SpaceGroup ("36:a-cb;c2v^12;b m 21 b;b -2b -2", true),  new J.symmetry.SpaceGroup ("37;c2v^13;c c c 2;c 2 -2c", true),  new J.symmetry.SpaceGroup ("37:cab;c2v^13;a 2 a a;a -2a 2", true),  new J.symmetry.SpaceGroup ("37:bca;c2v^13;b b 2 b;b -2b -2b", true),  new J.symmetry.SpaceGroup ("38;c2v^14;a m m 2;a 2 -2", true),  new J.symmetry.SpaceGroup ("38:ba-c;c2v^14;b m m 2;b 2 -2", true),  new J.symmetry.SpaceGroup ("38:cab;c2v^14;b 2 m m;b -2 2", true),  new J.symmetry.SpaceGroup ("38:-cba;c2v^14;c 2 m m;c -2 2", true),  new J.symmetry.SpaceGroup ("38:bca;c2v^14;c m 2 m;c -2 -2", true),  new J.symmetry.SpaceGroup ("38:a-cb;c2v^14;a m 2 m;a -2 -2", true),  new J.symmetry.SpaceGroup ("39;c2v^15;a b m 2;a 2 -2b", true),  new J.symmetry.SpaceGroup ("39:ba-c;c2v^15;b m a 2;b 2 -2a", true),  new J.symmetry.SpaceGroup ("39:cab;c2v^15;b 2 c m;b -2a 2", true),  new J.symmetry.SpaceGroup ("39:-cba;c2v^15;c 2 m b;c -2a 2", true),  new J.symmetry.SpaceGroup ("39:bca;c2v^15;c m 2 a;c -2a -2a", true),  new J.symmetry.SpaceGroup ("39:a-cb;c2v^15;a c 2 m;a -2b -2b", true),  new J.symmetry.SpaceGroup ("40;c2v^16;a m a 2;a 2 -2a", true),  new J.symmetry.SpaceGroup ("40:ba-c;c2v^16;b b m 2;b 2 -2b", true),  new J.symmetry.SpaceGroup ("40:cab;c2v^16;b 2 m b;b -2b 2", true),  new J.symmetry.SpaceGroup ("40:-cba;c2v^16;c 2 c m;c -2c 2", true),  new J.symmetry.SpaceGroup ("40:bca;c2v^16;c c 2 m;c -2c -2c", true),  new J.symmetry.SpaceGroup ("40:a-cb;c2v^16;a m 2 a;a -2a -2a", true),  new J.symmetry.SpaceGroup ("41;c2v^17;a b a 2;a 2 -2ab", true),  new J.symmetry.SpaceGroup ("41:ba-c;c2v^17;b b a 2;b 2 -2ab", true),  new J.symmetry.SpaceGroup ("41:cab;c2v^17;b 2 c b;b -2ab 2", true),  new J.symmetry.SpaceGroup ("41:-cba;c2v^17;c 2 c b;c -2ac 2", true),  new J.symmetry.SpaceGroup ("41:bca;c2v^17;c c 2 a;c -2ac -2ac", true),  new J.symmetry.SpaceGroup ("41:a-cb;c2v^17;a c 2 a;a -2ab -2ab", true),  new J.symmetry.SpaceGroup ("42;c2v^18;f m m 2;f 2 -2", true),  new J.symmetry.SpaceGroup ("42:cab;c2v^18;f 2 m m;f -2 2", true),  new J.symmetry.SpaceGroup ("42:bca;c2v^18;f m 2 m;f -2 -2", true),  new J.symmetry.SpaceGroup ("43;c2v^19;f d d 2;f 2 -2d", true),  new J.symmetry.SpaceGroup ("43:cab;c2v^19;f 2 d d;f -2d 2", true),  new J.symmetry.SpaceGroup ("43:bca;c2v^19;f d 2 d;f -2d -2d", true),  new J.symmetry.SpaceGroup ("44;c2v^20;i m m 2;i 2 -2", true),  new J.symmetry.SpaceGroup ("44:cab;c2v^20;i 2 m m;i -2 2", true),  new J.symmetry.SpaceGroup ("44:bca;c2v^20;i m 2 m;i -2 -2", true),  new J.symmetry.SpaceGroup ("45;c2v^21;i b a 2;i 2 -2c", true),  new J.symmetry.SpaceGroup ("45:cab;c2v^21;i 2 c b;i -2a 2", true),  new J.symmetry.SpaceGroup ("45:bca;c2v^21;i c 2 a;i -2b -2b", true),  new J.symmetry.SpaceGroup ("46;c2v^22;i m a 2;i 2 -2a", true),  new J.symmetry.SpaceGroup ("46:ba-c;c2v^22;i b m 2;i 2 -2b", true),  new J.symmetry.SpaceGroup ("46:cab;c2v^22;i 2 m b;i -2b 2", true),  new J.symmetry.SpaceGroup ("46:-cba;c2v^22;i 2 c m;i -2c 2", true),  new J.symmetry.SpaceGroup ("46:bca;c2v^22;i c 2 m;i -2c -2c", true),  new J.symmetry.SpaceGroup ("46:a-cb;c2v^22;i m 2 a;i -2a -2a", true),  new J.symmetry.SpaceGroup ("47;d2h^1;p m m m;-p 2 2", true),  new J.symmetry.SpaceGroup ("48:1;d2h^2;p n n n:1;p 2 2 -1n", true),  new J.symmetry.SpaceGroup ("48:2;d2h^2;p n n n:2;-p 2ab 2bc", true),  new J.symmetry.SpaceGroup ("49;d2h^3;p c c m;-p 2 2c", true),  new J.symmetry.SpaceGroup ("49:cab;d2h^3;p m a a;-p 2a 2", true),  new J.symmetry.SpaceGroup ("49:bca;d2h^3;p b m b;-p 2b 2b", true),  new J.symmetry.SpaceGroup ("50:1;d2h^4;p b a n:1;p 2 2 -1ab", true),  new J.symmetry.SpaceGroup ("50:2;d2h^4;p b a n:2;-p 2ab 2b", true),  new J.symmetry.SpaceGroup ("50:1cab;d2h^4;p n c b:1;p 2 2 -1bc", true),  new J.symmetry.SpaceGroup ("50:2cab;d2h^4;p n c b:2;-p 2b 2bc", true),  new J.symmetry.SpaceGroup ("50:1bca;d2h^4;p c n a:1;p 2 2 -1ac", true),  new J.symmetry.SpaceGroup ("50:2bca;d2h^4;p c n a:2;-p 2a 2c", true),  new J.symmetry.SpaceGroup ("51;d2h^5;p m m a;-p 2a 2a", true),  new J.symmetry.SpaceGroup ("51:ba-c;d2h^5;p m m b;-p 2b 2", true),  new J.symmetry.SpaceGroup ("51:cab;d2h^5;p b m m;-p 2 2b", true),  new J.symmetry.SpaceGroup ("51:-cba;d2h^5;p c m m;-p 2c 2c", true),  new J.symmetry.SpaceGroup ("51:bca;d2h^5;p m c m;-p 2c 2", true),  new J.symmetry.SpaceGroup ("51:a-cb;d2h^5;p m a m;-p 2 2a", true),  new J.symmetry.SpaceGroup ("52;d2h^6;p n n a;-p 2a 2bc", true),  new J.symmetry.SpaceGroup ("52:ba-c;d2h^6;p n n b;-p 2b 2n", true),  new J.symmetry.SpaceGroup ("52:cab;d2h^6;p b n n;-p 2n 2b", true),  new J.symmetry.SpaceGroup ("52:-cba;d2h^6;p c n n;-p 2ab 2c", true),  new J.symmetry.SpaceGroup ("52:bca;d2h^6;p n c n;-p 2ab 2n", true),  new J.symmetry.SpaceGroup ("52:a-cb;d2h^6;p n a n;-p 2n 2bc", true),  new J.symmetry.SpaceGroup ("53;d2h^7;p m n a;-p 2ac 2", true),  new J.symmetry.SpaceGroup ("53:ba-c;d2h^7;p n m b;-p 2bc 2bc", true),  new J.symmetry.SpaceGroup ("53:cab;d2h^7;p b m n;-p 2ab 2ab", true),  new J.symmetry.SpaceGroup ("53:-cba;d2h^7;p c n m;-p 2 2ac", true),  new J.symmetry.SpaceGroup ("53:bca;d2h^7;p n c m;-p 2 2bc", true),  new J.symmetry.SpaceGroup ("53:a-cb;d2h^7;p m a n;-p 2ab 2", true),  new J.symmetry.SpaceGroup ("54;d2h^8;p c c a;-p 2a 2ac", true),  new J.symmetry.SpaceGroup ("54:ba-c;d2h^8;p c c b;-p 2b 2c", true),  new J.symmetry.SpaceGroup ("54:cab;d2h^8;p b a a;-p 2a 2b", true),  new J.symmetry.SpaceGroup ("54:-cba;d2h^8;p c a a;-p 2ac 2c", true),  new J.symmetry.SpaceGroup ("54:bca;d2h^8;p b c b;-p 2bc 2b", true),  new J.symmetry.SpaceGroup ("54:a-cb;d2h^8;p b a b;-p 2b 2ab", true),  new J.symmetry.SpaceGroup ("55;d2h^9;p b a m;-p 2 2ab", true),  new J.symmetry.SpaceGroup ("55:cab;d2h^9;p m c b;-p 2bc 2", true),  new J.symmetry.SpaceGroup ("55:bca;d2h^9;p c m a;-p 2ac 2ac", true),  new J.symmetry.SpaceGroup ("56;d2h^10;p c c n;-p 2ab 2ac", true),  new J.symmetry.SpaceGroup ("56:cab;d2h^10;p n a a;-p 2ac 2bc", true),  new J.symmetry.SpaceGroup ("56:bca;d2h^10;p b n b;-p 2bc 2ab", true),  new J.symmetry.SpaceGroup ("57;d2h^11;p b c m;-p 2c 2b", true),  new J.symmetry.SpaceGroup ("57:ba-c;d2h^11;p c a m;-p 2c 2ac", true),  new J.symmetry.SpaceGroup ("57:cab;d2h^11;p m c a;-p 2ac 2a", true),  new J.symmetry.SpaceGroup ("57:-cba;d2h^11;p m a b;-p 2b 2a", true),  new J.symmetry.SpaceGroup ("57:bca;d2h^11;p b m a;-p 2a 2ab", true),  new J.symmetry.SpaceGroup ("57:a-cb;d2h^11;p c m b;-p 2bc 2c", true),  new J.symmetry.SpaceGroup ("58;d2h^12;p n n m;-p 2 2n", true),  new J.symmetry.SpaceGroup ("58:cab;d2h^12;p m n n;-p 2n 2", true),  new J.symmetry.SpaceGroup ("58:bca;d2h^12;p n m n;-p 2n 2n", true),  new J.symmetry.SpaceGroup ("59:1;d2h^13;p m m n:1;p 2 2ab -1ab", true),  new J.symmetry.SpaceGroup ("59:2;d2h^13;p m m n:2;-p 2ab 2a", true),  new J.symmetry.SpaceGroup ("59:1cab;d2h^13;p n m m:1;p 2bc 2 -1bc", true),  new J.symmetry.SpaceGroup ("59:2cab;d2h^13;p n m m:2;-p 2c 2bc", true),  new J.symmetry.SpaceGroup ("59:1bca;d2h^13;p m n m:1;p 2ac 2ac -1ac", true),  new J.symmetry.SpaceGroup ("59:2bca;d2h^13;p m n m:2;-p 2c 2a", true),  new J.symmetry.SpaceGroup ("60;d2h^14;p b c n;-p 2n 2ab", true),  new J.symmetry.SpaceGroup ("60:ba-c;d2h^14;p c a n;-p 2n 2c", true),  new J.symmetry.SpaceGroup ("60:cab;d2h^14;p n c a;-p 2a 2n", true),  new J.symmetry.SpaceGroup ("60:-cba;d2h^14;p n a b;-p 2bc 2n", true),  new J.symmetry.SpaceGroup ("60:bca;d2h^14;p b n a;-p 2ac 2b", true),  new J.symmetry.SpaceGroup ("60:a-cb;d2h^14;p c n b;-p 2b 2ac", true),  new J.symmetry.SpaceGroup ("61;d2h^15;p b c a;-p 2ac 2ab", true),  new J.symmetry.SpaceGroup ("61:ba-c;d2h^15;p c a b;-p 2bc 2ac", true),  new J.symmetry.SpaceGroup ("62;d2h^16;p n m a;-p 2ac 2n", true),  new J.symmetry.SpaceGroup ("62:ba-c;d2h^16;p m n b;-p 2bc 2a", true),  new J.symmetry.SpaceGroup ("62:cab;d2h^16;p b n m;-p 2c 2ab", true),  new J.symmetry.SpaceGroup ("62:-cba;d2h^16;p c m n;-p 2n 2ac", true),  new J.symmetry.SpaceGroup ("62:bca;d2h^16;p m c n;-p 2n 2a", true),  new J.symmetry.SpaceGroup ("62:a-cb;d2h^16;p n a m;-p 2c 2n", true),  new J.symmetry.SpaceGroup ("63;d2h^17;c m c m;-c 2c 2", true),  new J.symmetry.SpaceGroup ("63:ba-c;d2h^17;c c m m;-c 2c 2c", true),  new J.symmetry.SpaceGroup ("63:cab;d2h^17;a m m a;-a 2a 2a", true),  new J.symmetry.SpaceGroup ("63:-cba;d2h^17;a m a m;-a 2 2a", true),  new J.symmetry.SpaceGroup ("63:bca;d2h^17;b b m m;-b 2 2b", true),  new J.symmetry.SpaceGroup ("63:a-cb;d2h^17;b m m b;-b 2b 2", true),  new J.symmetry.SpaceGroup ("64;d2h^18;c m c a;-c 2ac 2", true),  new J.symmetry.SpaceGroup ("64:ba-c;d2h^18;c c m b;-c 2ac 2ac", true),  new J.symmetry.SpaceGroup ("64:cab;d2h^18;a b m a;-a 2ab 2ab", true),  new J.symmetry.SpaceGroup ("64:-cba;d2h^18;a c a m;-a 2 2ab", true),  new J.symmetry.SpaceGroup ("64:bca;d2h^18;b b c m;-b 2 2ab", true),  new J.symmetry.SpaceGroup ("64:a-cb;d2h^18;b m a b;-b 2ab 2", true),  new J.symmetry.SpaceGroup ("65;d2h^19;c m m m;-c 2 2", true),  new J.symmetry.SpaceGroup ("65:cab;d2h^19;a m m m;-a 2 2", true),  new J.symmetry.SpaceGroup ("65:bca;d2h^19;b m m m;-b 2 2", true),  new J.symmetry.SpaceGroup ("66;d2h^20;c c c m;-c 2 2c", true),  new J.symmetry.SpaceGroup ("66:cab;d2h^20;a m a a;-a 2a 2", true),  new J.symmetry.SpaceGroup ("66:bca;d2h^20;b b m b;-b 2b 2b", true),  new J.symmetry.SpaceGroup ("67;d2h^21;c m m a;-c 2a 2", true),  new J.symmetry.SpaceGroup ("67:ba-c;d2h^21;c m m b;-c 2a 2a", true),  new J.symmetry.SpaceGroup ("67:cab;d2h^21;a b m m;-a 2b 2b", true),  new J.symmetry.SpaceGroup ("67:-cba;d2h^21;a c m m;-a 2 2b", true),  new J.symmetry.SpaceGroup ("67:bca;d2h^21;b m c m;-b 2 2a", true),  new J.symmetry.SpaceGroup ("67:a-cb;d2h^21;b m a m;-b 2a 2", true),  new J.symmetry.SpaceGroup ("68:1;d2h^22;c c c a:1;c 2 2 -1ac", true),  new J.symmetry.SpaceGroup ("68:2;d2h^22;c c c a:2;-c 2a 2ac", true),  new J.symmetry.SpaceGroup ("68:1ba-c;d2h^22;c c c b:1;c 2 2 -1ac", true),  new J.symmetry.SpaceGroup ("68:2ba-c;d2h^22;c c c b:2;-c 2a 2c", true),  new J.symmetry.SpaceGroup ("68:1cab;d2h^22;a b a a:1;a 2 2 -1ab", true),  new J.symmetry.SpaceGroup ("68:2cab;d2h^22;a b a a:2;-a 2a 2b", true),  new J.symmetry.SpaceGroup ("68:1-cba;d2h^22;a c a a:1;a 2 2 -1ab", true),  new J.symmetry.SpaceGroup ("68:2-cba;d2h^22;a c a a:2;-a 2ab 2b", true),  new J.symmetry.SpaceGroup ("68:1bca;d2h^22;b b c b:1;b 2 2 -1ab", true),  new J.symmetry.SpaceGroup ("68:2bca;d2h^22;b b c b:2;-b 2ab 2b", true),  new J.symmetry.SpaceGroup ("68:1a-cb;d2h^22;b b a b:1;b 2 2 -1ab", true),  new J.symmetry.SpaceGroup ("68:2a-cb;d2h^22;b b a b:2;-b 2b 2ab", true),  new J.symmetry.SpaceGroup ("69;d2h^23;f m m m;-f 2 2", true),  new J.symmetry.SpaceGroup ("70:1;d2h^24;f d d d:1;f 2 2 -1d", true),  new J.symmetry.SpaceGroup ("70:2;d2h^24;f d d d:2;-f 2uv 2vw", true),  new J.symmetry.SpaceGroup ("71;d2h^25;i m m m;-i 2 2", true),  new J.symmetry.SpaceGroup ("72;d2h^26;i b a m;-i 2 2c", true),  new J.symmetry.SpaceGroup ("72:cab;d2h^26;i m c b;-i 2a 2", true),  new J.symmetry.SpaceGroup ("72:bca;d2h^26;i c m a;-i 2b 2b", true),  new J.symmetry.SpaceGroup ("73;d2h^27;i b c a;-i 2b 2c", true),  new J.symmetry.SpaceGroup ("73:ba-c;d2h^27;i c a b;-i 2a 2b", true),  new J.symmetry.SpaceGroup ("74;d2h^28;i m m a;-i 2b 2", true),  new J.symmetry.SpaceGroup ("74:ba-c;d2h^28;i m m b;-i 2a 2a", true),  new J.symmetry.SpaceGroup ("74:cab;d2h^28;i b m m;-i 2c 2c", true),  new J.symmetry.SpaceGroup ("74:-cba;d2h^28;i c m m;-i 2 2b", true),  new J.symmetry.SpaceGroup ("74:bca;d2h^28;i m c m;-i 2 2a", true),  new J.symmetry.SpaceGroup ("74:a-cb;d2h^28;i m a m;-i 2c 2", true),  new J.symmetry.SpaceGroup ("75;c4^1;p 4;p 4", true),  new J.symmetry.SpaceGroup ("76;c4^2;p 41;p 4w", true),  new J.symmetry.SpaceGroup ("76*;c4^2;p 41*;p 41", true),  new J.symmetry.SpaceGroup ("77;c4^3;p 42;p 4c", true),  new J.symmetry.SpaceGroup ("77*;c4^3;p 42*;p 42", true),  new J.symmetry.SpaceGroup ("78;c4^4;p 43;p 4cw", true),  new J.symmetry.SpaceGroup ("78*;c4^4;p 43*;p 43", true),  new J.symmetry.SpaceGroup ("79;c4^5;i 4;i 4", true),  new J.symmetry.SpaceGroup ("80;c4^6;i 41;i 4bw", true),  new J.symmetry.SpaceGroup ("81;s4^1;p -4;p -4", true),  new J.symmetry.SpaceGroup ("82;s4^2;i -4;i -4", true),  new J.symmetry.SpaceGroup ("83;c4h^1;p 4/m;-p 4", true),  new J.symmetry.SpaceGroup ("84;c4h^2;p 42/m;-p 4c", true),  new J.symmetry.SpaceGroup ("84*;c4h^2;p 42/m*;-p 42", true),  new J.symmetry.SpaceGroup ("85:1;c4h^3;p 4/n:1;p 4ab -1ab", true),  new J.symmetry.SpaceGroup ("85:2;c4h^3;p 4/n:2;-p 4a", true),  new J.symmetry.SpaceGroup ("86:1;c4h^4;p 42/n:1;p 4n -1n", true),  new J.symmetry.SpaceGroup ("86:2;c4h^4;p 42/n:2;-p 4bc", true),  new J.symmetry.SpaceGroup ("87;c4h^5;i 4/m;-i 4", true),  new J.symmetry.SpaceGroup ("88:1;c4h^6;i 41/a:1;i 4bw -1bw", true),  new J.symmetry.SpaceGroup ("88:2;c4h^6;i 41/a:2;-i 4ad", true),  new J.symmetry.SpaceGroup ("89;d4^1;p 4 2 2;p 4 2", true),  new J.symmetry.SpaceGroup ("90;d4^2;p 4 21 2;p 4ab 2ab", true),  new J.symmetry.SpaceGroup ("91;d4^3;p 41 2 2;p 4w 2c", true),  new J.symmetry.SpaceGroup ("91*;d4^3;p 41 2 2*;p 41 2c", true),  new J.symmetry.SpaceGroup ("92;d4^4;p 41 21 2;p 4abw 2nw", true),  new J.symmetry.SpaceGroup ("93;d4^5;p 42 2 2;p 4c 2", true),  new J.symmetry.SpaceGroup ("93*;d4^5;p 42 2 2*;p 42 2", true),  new J.symmetry.SpaceGroup ("94;d4^6;p 42 21 2;p 4n 2n", true),  new J.symmetry.SpaceGroup ("95;d4^7;p 43 2 2;p 4cw 2c", true),  new J.symmetry.SpaceGroup ("95*;d4^7;p 43 2 2*;p 43 2c", true),  new J.symmetry.SpaceGroup ("96;d4^8;p 43 21 2;p 4nw 2abw", true),  new J.symmetry.SpaceGroup ("97;d4^9;i 4 2 2;i 4 2", true),  new J.symmetry.SpaceGroup ("98;d4^10;i 41 2 2;i 4bw 2bw", true),  new J.symmetry.SpaceGroup ("99;c4v^1;p 4 m m;p 4 -2", true),  new J.symmetry.SpaceGroup ("100;c4v^2;p 4 b m;p 4 -2ab", true),  new J.symmetry.SpaceGroup ("101;c4v^3;p 42 c m;p 4c -2c", true),  new J.symmetry.SpaceGroup ("101*;c4v^3;p 42 c m*;p 42 -2c", true),  new J.symmetry.SpaceGroup ("102;c4v^4;p 42 n m;p 4n -2n", true),  new J.symmetry.SpaceGroup ("103;c4v^5;p 4 c c;p 4 -2c", true),  new J.symmetry.SpaceGroup ("104;c4v^6;p 4 n c;p 4 -2n", true),  new J.symmetry.SpaceGroup ("105;c4v^7;p 42 m c;p 4c -2", true),  new J.symmetry.SpaceGroup ("105*;c4v^7;p 42 m c*;p 42 -2", true),  new J.symmetry.SpaceGroup ("106;c4v^8;p 42 b c;p 4c -2ab", true),  new J.symmetry.SpaceGroup ("106*;c4v^8;p 42 b c*;p 42 -2ab", true),  new J.symmetry.SpaceGroup ("107;c4v^9;i 4 m m;i 4 -2", true),  new J.symmetry.SpaceGroup ("108;c4v^10;i 4 c m;i 4 -2c", true),  new J.symmetry.SpaceGroup ("109;c4v^11;i 41 m d;i 4bw -2", true),  new J.symmetry.SpaceGroup ("110;c4v^12;i 41 c d;i 4bw -2c", true),  new J.symmetry.SpaceGroup ("111;d2d^1;p -4 2 m;p -4 2", true),  new J.symmetry.SpaceGroup ("112;d2d^2;p -4 2 c;p -4 2c", true),  new J.symmetry.SpaceGroup ("113;d2d^3;p -4 21 m;p -4 2ab", true),  new J.symmetry.SpaceGroup ("114;d2d^4;p -4 21 c;p -4 2n", true),  new J.symmetry.SpaceGroup ("115;d2d^5;p -4 m 2;p -4 -2", true),  new J.symmetry.SpaceGroup ("116;d2d^6;p -4 c 2;p -4 -2c", true),  new J.symmetry.SpaceGroup ("117;d2d^7;p -4 b 2;p -4 -2ab", true),  new J.symmetry.SpaceGroup ("118;d2d^8;p -4 n 2;p -4 -2n", true),  new J.symmetry.SpaceGroup ("119;d2d^9;i -4 m 2;i -4 -2", true),  new J.symmetry.SpaceGroup ("120;d2d^10;i -4 c 2;i -4 -2c", true),  new J.symmetry.SpaceGroup ("121;d2d^11;i -4 2 m;i -4 2", true),  new J.symmetry.SpaceGroup ("122;d2d^12;i -4 2 d;i -4 2bw", true),  new J.symmetry.SpaceGroup ("123;d4h^1;p 4/m m m;-p 4 2", true),  new J.symmetry.SpaceGroup ("124;d4h^2;p 4/m c c;-p 4 2c", true),  new J.symmetry.SpaceGroup ("125:1;d4h^3;p 4/n b m:1;p 4 2 -1ab", true),  new J.symmetry.SpaceGroup ("125:2;d4h^3;p 4/n b m:2;-p 4a 2b", true),  new J.symmetry.SpaceGroup ("126:1;d4h^4;p 4/n n c:1;p 4 2 -1n", true),  new J.symmetry.SpaceGroup ("126:2;d4h^4;p 4/n n c:2;-p 4a 2bc", true),  new J.symmetry.SpaceGroup ("127;d4h^5;p 4/m b m;-p 4 2ab", true),  new J.symmetry.SpaceGroup ("128;d4h^6;p 4/m n c;-p 4 2n", true),  new J.symmetry.SpaceGroup ("129:1;d4h^7;p 4/n m m:1;p 4ab 2ab -1ab", true),  new J.symmetry.SpaceGroup ("129:2;d4h^7;p 4/n m m:2;-p 4a 2a", true),  new J.symmetry.SpaceGroup ("130:1;d4h^8;p 4/n c c:1;p 4ab 2n -1ab", true),  new J.symmetry.SpaceGroup ("130:2;d4h^8;p 4/n c c:2;-p 4a 2ac", true),  new J.symmetry.SpaceGroup ("131;d4h^9;p 42/m m c;-p 4c 2", true),  new J.symmetry.SpaceGroup ("132;d4h^10;p 42/m c m;-p 4c 2c", true),  new J.symmetry.SpaceGroup ("133:1;d4h^11;p 42/n b c:1;p 4n 2c -1n", true),  new J.symmetry.SpaceGroup ("133:2;d4h^11;p 42/n b c:2;-p 4ac 2b", true),  new J.symmetry.SpaceGroup ("134:1;d4h^12;p 42/n n m:1;p 4n 2 -1n", true),  new J.symmetry.SpaceGroup ("134:2;d4h^12;p 42/n n m:2;-p 4ac 2bc", true),  new J.symmetry.SpaceGroup ("135;d4h^13;p 42/m b c;-p 4c 2ab", true),  new J.symmetry.SpaceGroup ("135*;d4h^13;p 42/m b c*;-p 42 2ab", true),  new J.symmetry.SpaceGroup ("136;d4h^14;p 42/m n m;-p 4n 2n", true),  new J.symmetry.SpaceGroup ("137:1;d4h^15;p 42/n m c:1;p 4n 2n -1n", true),  new J.symmetry.SpaceGroup ("137:2;d4h^15;p 42/n m c:2;-p 4ac 2a", true),  new J.symmetry.SpaceGroup ("138:1;d4h^16;p 42/n c m:1;p 4n 2ab -1n", true),  new J.symmetry.SpaceGroup ("138:2;d4h^16;p 42/n c m:2;-p 4ac 2ac", true),  new J.symmetry.SpaceGroup ("139;d4h^17;i 4/m m m;-i 4 2", true),  new J.symmetry.SpaceGroup ("140;d4h^18;i 4/m c m;-i 4 2c", true),  new J.symmetry.SpaceGroup ("141:1;d4h^19;i 41/a m d:1;i 4bw 2bw -1bw", true),  new J.symmetry.SpaceGroup ("141:2;d4h^19;i 41/a m d:2;-i 4bd 2", true),  new J.symmetry.SpaceGroup ("142:1;d4h^20;i 41/a c d:1;i 4bw 2aw -1bw", true),  new J.symmetry.SpaceGroup ("142:2;d4h^20;i 41/a c d:2;-i 4bd 2c", true),  new J.symmetry.SpaceGroup ("143;c3^1;p 3;p 3", true),  new J.symmetry.SpaceGroup ("144;c3^2;p 31;p 31", true),  new J.symmetry.SpaceGroup ("145;c3^3;p 32;p 32", true),  new J.symmetry.SpaceGroup ("146:h;c3^4;r 3:h;r 3", true),  new J.symmetry.SpaceGroup ("146:r;c3^4;r 3:r;p 3*", true),  new J.symmetry.SpaceGroup ("147;c3i^1;p -3;-p 3", true),  new J.symmetry.SpaceGroup ("148:h;c3i^2;r -3:h;-r 3", true),  new J.symmetry.SpaceGroup ("148:r;c3i^2;r -3:r;-p 3*", true),  new J.symmetry.SpaceGroup ("149;d3^1;p 3 1 2;p 3 2", true),  new J.symmetry.SpaceGroup ("150;d3^2;p 3 2 1;p 3 2\"", true),  new J.symmetry.SpaceGroup ("151;d3^3;p 31 1 2;p 31 2 (0 0 4)", true),  new J.symmetry.SpaceGroup ("152;d3^4;p 31 2 1;p 31 2\"", true),  new J.symmetry.SpaceGroup ("153;d3^5;p 32 1 2;p 32 2 (0 0 2)", true),  new J.symmetry.SpaceGroup ("154;d3^6;p 32 2 1;p 32 2\"", true),  new J.symmetry.SpaceGroup ("155:h;d3^7;r 3 2:h;r 3 2\"", true),  new J.symmetry.SpaceGroup ("155:r;d3^7;r 3 2:r;p 3* 2", true),  new J.symmetry.SpaceGroup ("156;c3v^1;p 3 m 1;p 3 -2\"", true),  new J.symmetry.SpaceGroup ("157;c3v^2;p 3 1 m;p 3 -2", true),  new J.symmetry.SpaceGroup ("158;c3v^3;p 3 c 1;p 3 -2\"c", true),  new J.symmetry.SpaceGroup ("159;c3v^4;p 3 1 c;p 3 -2c", true),  new J.symmetry.SpaceGroup ("160:h;c3v^5;r 3 m:h;r 3 -2\"", true),  new J.symmetry.SpaceGroup ("160:r;c3v^5;r 3 m:r;p 3* -2", true),  new J.symmetry.SpaceGroup ("161:h;c3v^6;r 3 c:h;r 3 -2\"c", true),  new J.symmetry.SpaceGroup ("161:r;c3v^6;r 3 c:r;p 3* -2n", true),  new J.symmetry.SpaceGroup ("162;d3d^1;p -3 1 m;-p 3 2", true),  new J.symmetry.SpaceGroup ("163;d3d^2;p -3 1 c;-p 3 2c", true),  new J.symmetry.SpaceGroup ("164;d3d^3;p -3 m 1;-p 3 2\"", true),  new J.symmetry.SpaceGroup ("165;d3d^4;p -3 c 1;-p 3 2\"c", true),  new J.symmetry.SpaceGroup ("166:h;d3d^5;r -3 m:h;-r 3 2\"", true),  new J.symmetry.SpaceGroup ("166:r;d3d^5;r -3 m:r;-p 3* 2", true),  new J.symmetry.SpaceGroup ("167:h;d3d^6;r -3 c:h;-r 3 2\"c", true),  new J.symmetry.SpaceGroup ("167:r;d3d^6;r -3 c:r;-p 3* 2n", true),  new J.symmetry.SpaceGroup ("168;c6^1;p 6;p 6", true),  new J.symmetry.SpaceGroup ("169;c6^2;p 61;p 61", true),  new J.symmetry.SpaceGroup ("170;c6^3;p 65;p 65", true),  new J.symmetry.SpaceGroup ("171;c6^4;p 62;p 62", true),  new J.symmetry.SpaceGroup ("172;c6^5;p 64;p 64", true),  new J.symmetry.SpaceGroup ("173;c6^6;p 63;p 6c", true),  new J.symmetry.SpaceGroup ("173*;c6^6;p 63*;p 63 ", true),  new J.symmetry.SpaceGroup ("174;c3h^1;p -6;p -6", true),  new J.symmetry.SpaceGroup ("175;c6h^1;p 6/m;-p 6", true),  new J.symmetry.SpaceGroup ("176;c6h^2;p 63/m;-p 6c", true),  new J.symmetry.SpaceGroup ("176*;c6h^2;p 63/m*;-p 63", true),  new J.symmetry.SpaceGroup ("177;d6^1;p 6 2 2;p 6 2", true),  new J.symmetry.SpaceGroup ("178;d6^2;p 61 2 2;p 61 2 (0 0 5)", true),  new J.symmetry.SpaceGroup ("179;d6^3;p 65 2 2;p 65 2 (0 0 1)", true),  new J.symmetry.SpaceGroup ("180;d6^4;p 62 2 2;p 62 2 (0 0 4)", true),  new J.symmetry.SpaceGroup ("181;d6^5;p 64 2 2;p 64 2 (0 0 2)", true),  new J.symmetry.SpaceGroup ("182;d6^6;p 63 2 2;p 6c 2c", true),  new J.symmetry.SpaceGroup ("182*;d6^6;p 63 2 2*;p 63 2c", true),  new J.symmetry.SpaceGroup ("183;c6v^1;p 6 m m;p 6 -2", true),  new J.symmetry.SpaceGroup ("184;c6v^2;p 6 c c;p 6 -2c", true),  new J.symmetry.SpaceGroup ("185;c6v^3;p 63 c m;p 6c -2", true),  new J.symmetry.SpaceGroup ("185*;c6v^3;p 63 c m*;p 63 -2", true),  new J.symmetry.SpaceGroup ("186;c6v^4;p 63 m c;p 6c -2c", true),  new J.symmetry.SpaceGroup ("186*;c6v^4;p 63 m c*;p 63 -2c", true),  new J.symmetry.SpaceGroup ("187;d3h^1;p -6 m 2;p -6 2", true),  new J.symmetry.SpaceGroup ("188;d3h^2;p -6 c 2;p -6c 2", true),  new J.symmetry.SpaceGroup ("189;d3h^3;p -6 2 m;p -6 -2", true),  new J.symmetry.SpaceGroup ("190;d3h^4;p -6 2 c;p -6c -2c", true),  new J.symmetry.SpaceGroup ("191;d6h^1;p 6/m m m;-p 6 2", true),  new J.symmetry.SpaceGroup ("192;d6h^2;p 6/m c c;-p 6 2c", true),  new J.symmetry.SpaceGroup ("193;d6h^3;p 63/m c m;-p 6c 2", true),  new J.symmetry.SpaceGroup ("193*;d6h^3;p 63/m c m*;-p 63 2", true),  new J.symmetry.SpaceGroup ("194;d6h^4;p 63/m m c;-p 6c 2c", true),  new J.symmetry.SpaceGroup ("194*;d6h^4;p 63/m m c*;-p 63 2c", true),  new J.symmetry.SpaceGroup ("195;t^1;p 2 3;p 2 2 3", true),  new J.symmetry.SpaceGroup ("196;t^2;f 2 3;f 2 2 3", true),  new J.symmetry.SpaceGroup ("197;t^3;i 2 3;i 2 2 3", true),  new J.symmetry.SpaceGroup ("198;t^4;p 21 3;p 2ac 2ab 3", true),  new J.symmetry.SpaceGroup ("199;t^5;i 21 3;i 2b 2c 3", true),  new J.symmetry.SpaceGroup ("200;th^1;p m -3;-p 2 2 3", true),  new J.symmetry.SpaceGroup ("201:1;th^2;p n -3:1;p 2 2 3 -1n", true),  new J.symmetry.SpaceGroup ("201:2;th^2;p n -3:2;-p 2ab 2bc 3", true),  new J.symmetry.SpaceGroup ("202;th^3;f m -3;-f 2 2 3", true),  new J.symmetry.SpaceGroup ("203:1;th^4;f d -3:1;f 2 2 3 -1d", true),  new J.symmetry.SpaceGroup ("203:2;th^4;f d -3:2;-f 2uv 2vw 3", true),  new J.symmetry.SpaceGroup ("204;th^5;i m -3;-i 2 2 3", true),  new J.symmetry.SpaceGroup ("205;th^6;p a -3;-p 2ac 2ab 3", true),  new J.symmetry.SpaceGroup ("206;th^7;i a -3;-i 2b 2c 3", true),  new J.symmetry.SpaceGroup ("207;o^1;p 4 3 2;p 4 2 3", true),  new J.symmetry.SpaceGroup ("208;o^2;p 42 3 2;p 4n 2 3", true),  new J.symmetry.SpaceGroup ("209;o^3;f 4 3 2;f 4 2 3", true),  new J.symmetry.SpaceGroup ("210;o^4;f 41 3 2;f 4d 2 3", true),  new J.symmetry.SpaceGroup ("211;o^5;i 4 3 2;i 4 2 3", true),  new J.symmetry.SpaceGroup ("212;o^6;p 43 3 2;p 4acd 2ab 3", true),  new J.symmetry.SpaceGroup ("213;o^7;p 41 3 2;p 4bd 2ab 3", true),  new J.symmetry.SpaceGroup ("214;o^8;i 41 3 2;i 4bd 2c 3", true),  new J.symmetry.SpaceGroup ("215;td^1;p -4 3 m;p -4 2 3", true),  new J.symmetry.SpaceGroup ("216;td^2;f -4 3 m;f -4 2 3", true),  new J.symmetry.SpaceGroup ("217;td^3;i -4 3 m;i -4 2 3", true),  new J.symmetry.SpaceGroup ("218;td^4;p -4 3 n;p -4n 2 3", true),  new J.symmetry.SpaceGroup ("219;td^5;f -4 3 c;f -4a 2 3", true),  new J.symmetry.SpaceGroup ("220;td^6;i -4 3 d;i -4bd 2c 3", true),  new J.symmetry.SpaceGroup ("221;oh^1;p m -3 m;-p 4 2 3", true),  new J.symmetry.SpaceGroup ("222:1;oh^2;p n -3 n:1;p 4 2 3 -1n", true),  new J.symmetry.SpaceGroup ("222:2;oh^2;p n -3 n:2;-p 4a 2bc 3", true),  new J.symmetry.SpaceGroup ("223;oh^3;p m -3 n;-p 4n 2 3", true),  new J.symmetry.SpaceGroup ("224:1;oh^4;p n -3 m:1;p 4n 2 3 -1n", true),  new J.symmetry.SpaceGroup ("224:2;oh^4;p n -3 m:2;-p 4bc 2bc 3", true),  new J.symmetry.SpaceGroup ("225;oh^5;f m -3 m;-f 4 2 3", true),  new J.symmetry.SpaceGroup ("226;oh^6;f m -3 c;-f 4a 2 3", true),  new J.symmetry.SpaceGroup ("227:1;oh^7;f d -3 m:1;f 4d 2 3 -1d", true),  new J.symmetry.SpaceGroup ("227:2;oh^7;f d -3 m:2;-f 4vw 2vw 3", true),  new J.symmetry.SpaceGroup ("228:1;oh^8;f d -3 c:1;f 4d 2 3 -1ad", true),  new J.symmetry.SpaceGroup ("228:2;oh^8;f d -3 c:2;-f 4ud 2vw 3", true),  new J.symmetry.SpaceGroup ("229;oh^9;i m -3 m;-i 4 2 3", true),  new J.symmetry.SpaceGroup ("230;oh^10;i a -3 d;-i 4bd 2c 3", true)] : J.symmetry.SpaceGroup.spaceGroupDefinitions);
});
$_M(c$, "addLatticeVectors", 
function (lattvecs) {
var nOps = this.latticeOp = this.operationCount;
for (var j = 0; j < lattvecs.size (); j++) {
var data = lattvecs.get (j);
if (data.length > this.modulationDimension + 3) return;
for (var i = 0; i < nOps; i++) {
var op = this.operations[i];
var rotTrans = op.rotTransMatrix;
var newOp =  new J.symmetry.SymmetryOperation (null, null, 0, 0, this.doNormalize);
newOp.modDim = this.modulationDimension;
newOp.rotTransMatrix = JU.AU.arrayCopyF (rotTrans, -1);
newOp.setFromMatrix (data, false);
newOp.xyzOriginal = newOp.xyz;
this.addOp (newOp, newOp.xyz, true);
}
}
}, "JU.List");
$_M(c$, "getSiteMultiplicity", 
function (pt, unitCell) {
var n = this.finalOperations.length;
var pts =  new JU.List ();
for (var i = n; --i >= 0; ) {
var pt1 = JU.P3.newP (pt);
this.finalOperations[i].transform (pt1);
unitCell.unitize (pt1);
for (var j = pts.size (); --j >= 0; ) {
var pt0 = pts.get (j);
if (pt1.distanceSquared (pt0) < 0.000001) {
pt1 = null;
break;
}}
if (pt1 != null) {
pts.addLast (pt1);
}}
return Clazz_doubleToInt (n / pts.size ());
}, "JU.P3,J.symmetry.UnitCell");
$_M(c$, "getOperationList", 
function () {
if (this.operationList == null) {
this.operationList =  new Array (this.finalOperations.length);
for (var i = 0; i < this.operationList.length; i++) this.operationList[i] = this.finalOperations[i].toString ();

}return this.operationList;
});
Clazz_defineStatics (c$,
"canonicalSeitzList", null,
"NAME_HALL", 5,
"NAME_HM", 3,
"sgIndex", -1,
"ambiguousNames", "",
"lastInfo", "",
"spaceGroupDefinitions", null);
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (null, "J.symmetry.HallInfo", ["JU.P3i", "$.SB", "J.symmetry.HallRotationTerm", "$.HallTranslation", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.isCentrosymmetric = false;
this.nRotations = 0;
this.rotationTerms = null;
this.vector12ths = null;
this.vectorCode = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "HallInfo");
Clazz_prepareFields (c$, function () {
this.rotationTerms =  new Array (16);
});
Clazz_makeConstructor (c$, 
function (hallSymbol) {
try {
var str = this.hallSymbol = hallSymbol.trim ();
str = this.extractLatticeInfo (str);
if (J.symmetry.HallTranslation.getLatticeIndex (this.latticeCode) == 0) return;
this.latticeExtension = J.symmetry.HallTranslation.getLatticeExtension (this.latticeCode, this.isCentrosymmetric);
str = this.extractVectorInfo (str) + this.latticeExtension;
if (J.util.Logger.debugging) J.util.Logger.debug ("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo (str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
J.util.Logger.error ("Invalid Hall symbol " + e);
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
$_M(c$, "dumpInfo", 
function () {
var sb =  new JU.SB ();
sb.append ("\nHall symbol: ").append (this.hallSymbol).append ("\nprimitive Hall symbol: ").append (this.primitiveHallSymbol).append ("\nlattice type: ").append (this.getLatticeDesignation ());
for (var i = 0; i < this.nRotations; i++) {
sb.append ("\n\nrotation term ").appendI (i + 1).append (this.rotationTerms[i].dumpInfo (this.vectorCode));
}
return sb.toString ();
});
$_M(c$, "getLatticeDesignation", 
function () {
return J.symmetry.HallTranslation.getLatticeDesignation2 (this.latticeCode, this.isCentrosymmetric);
});
$_M(c$, "extractLatticeInfo", 
function (name) {
var i = name.indexOf (" ");
if (i < 0) return "";
var term = name.substring (0, i).toUpperCase ();
this.latticeCode = term.charAt (0);
if (this.latticeCode == '-') {
this.isCentrosymmetric = true;
this.latticeCode = term.charAt (1);
}return name.substring (i + 1).trim ();
}, "~S");
$_M(c$, "extractVectorInfo", 
function (name) {
this.vector12ths =  new JU.P3i ();
this.vectorCode = "";
var i = name.indexOf ("(");
var j = name.indexOf (")", i);
if (i > 0 && j > i) {
var term = name.substring (i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring (0, i).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
}}this.vector12ths.z = Integer.parseInt (term);
}return name;
}, "~S");
$_M(c$, "extractRotationInfo", 
function (name, prevOrder, prevAxisType) {
var i = name.indexOf (" ");
var code;
if (i >= 0) {
code = name.substring (0, i);
name = name.substring (i + 1).trim ();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] =  new J.symmetry.HallRotationTerm (this, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, "~S,~N,~S");
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["JU.M4"], "J.symmetry.HallRotationTerm", ["JU.SB", "J.symmetry.HallRotation", "$.HallTranslation", "$.SymmetryOperation", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.inputCode = null;
this.primitiveCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.seitzMatrix12ths = null;
this.isImproper = false;
this.order = 0;
this.axisType = '\0';
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz_instantialize (this, arguments);
}, J.symmetry, "HallRotationTerm");
Clazz_prepareFields (c$, function () {
this.seitzMatrix12ths =  new JU.M4 ();
});
Clazz_makeConstructor (c$, 
function (hallInfo, code, prevOrder, prevAxisType) {
this.inputCode = code;
code += "   ";
if (code.charAt (0) == '-') {
this.isImproper = true;
code = code.substring (1);
}this.primitiveCode = "";
this.order = code.charCodeAt (0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var ptr = 2;
var c;
switch (c = code.charAt (1)) {
case 'x':
case 'y':
case 'z':
switch (code.charAt (2)) {
case '\'':
case '"':
this.diagonalReferenceAxis = c;
c = code.charAt (2);
ptr++;
}
case '*':
this.axisType = c;
break;
case '\'':
case '"':
this.axisType = c;
switch (code.charAt (2)) {
case 'x':
case 'y':
case 'z':
this.diagonalReferenceAxis = code.charAt (2);
ptr++;
break;
default:
this.diagonalReferenceAxis = prevAxisType;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : hallInfo.nRotations == 0 ? 'z' : hallInfo.nRotations == 2 ? '*' : prevOrder == 2 || prevOrder == 4 ? 'x' : '\'');
code = code.substring (0, 1) + this.axisType + code.substring (1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : code.substring (0, 2));
if (this.diagonalReferenceAxis != '\0') {
code = code.substring (0, 1) + this.diagonalReferenceAxis + this.axisType + code.substring (ptr);
this.primitiveCode += this.diagonalReferenceAxis;
ptr = 3;
}this.lookupCode = code.substring (0, ptr);
this.rotation = J.symmetry.HallRotation.lookup (this.lookupCode);
if (this.rotation == null) {
J.util.Logger.error ("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new J.symmetry.HallTranslation ('\0', null);
this.translationString = "";
var len = code.length;
for (var i = ptr; i < len; i++) {
var translationCode = code.charAt (i);
var t = J.symmetry.HallTranslation.getHallTranslation (translationCode, this.order);
if (t != null) {
this.translationString += "" + t.translationCode;
this.translation.rotationShift12ths += t.rotationShift12ths;
this.translation.vectorShift12ths.add (t.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
if (this.isImproper) {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrixInv);
} else {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrix);
}this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch (this.axisType) {
case 'x':
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 'y':
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 'z':
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (hallInfo.vectorCode.length > 0) {
var m1 = JU.M4.newM (null);
var m2 = JU.M4.newM (null);
var v = hallInfo.vector12ths;
m1.m03 = v.x;
m1.m13 = v.y;
m1.m23 = v.z;
m2.m03 = -v.x;
m2.m13 = -v.y;
m2.m23 = -v.z;
this.seitzMatrix12ths.mul2 (m1, this.seitzMatrix12ths);
this.seitzMatrix12ths.mulM4 (m2);
}if (J.util.Logger.debugging) {
J.util.Logger.debug ("code = " + code + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, "J.symmetry.HallInfo,~S,~N,~S");
$_M(c$, "dumpInfo", 
function (vectorCode) {
var sb =  new JU.SB ();
sb.append ("\ninput code: ").append (this.inputCode).append ("; primitive code: ").append (this.primitiveCode).append ("\norder: ").appendI (this.order).append (this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
sb.append ("; axisType: ").appendC (this.axisType);
if (this.diagonalReferenceAxis != '\0') sb.appendC (this.diagonalReferenceAxis);
}if (this.translationString.length > 0) sb.append ("; translation: ").append (this.translationString);
if (vectorCode.length > 0) sb.append ("; vector offset: ").append (vectorCode);
if (this.rotation != null) sb.append ("\noperator: ").append (this.getXYZ (this.allPositive)).append ("\nSeitz matrix:\n").append (J.symmetry.SymmetryOperation.dumpSeitz (this.seitzMatrix12ths));
return sb.toString ();
}, "~S");
$_M(c$, "getXYZ", 
function (allPositive) {
return J.symmetry.SymmetryOperation.getXYZFromMatrix (this.seitzMatrix12ths, true, allPositive, true);
}, "~B");
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["JU.M4"], "J.symmetry.HallRotation", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.rotCode = null;
this.seitzMatrix = null;
this.seitzMatrixInv = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "HallRotation");
Clazz_prepareFields (c$, function () {
this.seitzMatrix =  new JU.M4 ();
this.seitzMatrixInv =  new JU.M4 ();
});
Clazz_makeConstructor (c$, 
function (code, matrixData) {
this.rotCode = code;
var data =  Clazz_newFloatArray (16, 0);
var dataInv =  Clazz_newFloatArray (16, 0);
data[15] = dataInv[15] = 1;
for (var i = 0, ipt = 0; ipt < 11; i++) {
var value = 0;
switch (matrixData.charAt (i)) {
case ' ':
ipt++;
continue;
case '+':
case '1':
value = 1;
break;
case '-':
value = -1;
break;
}
data[ipt] = value;
dataInv[ipt] = -value;
ipt++;
}
this.seitzMatrix.setA (data, 0);
this.seitzMatrixInv.setA (dataInv, 0);
}, "~S,~S");
c$.lookup = $_M(c$, "lookup", 
function (code) {
for (var i = J.symmetry.HallRotation.getHallTerms ().length; --i >= 0; ) if (J.symmetry.HallRotation.hallRotationTerms[i].rotCode.equals (code)) return J.symmetry.HallRotation.hallRotationTerms[i];

return null;
}, "~S");
c$.getHallTerms = $_M(c$, "getHallTerms", 
function () {
return (J.symmetry.HallRotation.hallRotationTerms == null ? J.symmetry.HallRotation.hallRotationTerms = [ new J.symmetry.HallRotation ("1_", "+00 0+0 00+"),  new J.symmetry.HallRotation ("2x", "+00 0-0 00-"),  new J.symmetry.HallRotation ("2y", "-00 0+0 00-"),  new J.symmetry.HallRotation ("2z", "-00 0-0 00+"),  new J.symmetry.HallRotation ("2\'", "0-0 -00 00-"),  new J.symmetry.HallRotation ("2\"", "0+0 +00 00-"),  new J.symmetry.HallRotation ("2x\'", "-00 00- 0-0"),  new J.symmetry.HallRotation ("2x\"", "-00 00+ 0+0"),  new J.symmetry.HallRotation ("2y\'", "00- 0-0 -00"),  new J.symmetry.HallRotation ("2y\"", "00+ 0-0 +00"),  new J.symmetry.HallRotation ("2z\'", "0-0 -00 00-"),  new J.symmetry.HallRotation ("2z\"", "0+0 +00 00-"),  new J.symmetry.HallRotation ("3x", "+00 00- 0+-"),  new J.symmetry.HallRotation ("3y", "-0+ 0+0 -00"),  new J.symmetry.HallRotation ("3z", "0-0 +-0 00+"),  new J.symmetry.HallRotation ("3*", "00+ +00 0+0"),  new J.symmetry.HallRotation ("4x", "+00 00- 0+0"),  new J.symmetry.HallRotation ("4y", "00+ 0+0 -00"),  new J.symmetry.HallRotation ("4z", "0-0 +00 00+"),  new J.symmetry.HallRotation ("6x", "+00 0+- 0+0"),  new J.symmetry.HallRotation ("6y", "00+ 0+0 -0+"),  new J.symmetry.HallRotation ("6z", "+-0 +00 00+")] : J.symmetry.HallRotation.hallRotationTerms);
});
Clazz_defineStatics (c$,
"hallRotationTerms", null);
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (null, "J.symmetry.HallTranslation", ["JU.P3i"], function () {
c$ = Clazz_decorateAsClass (function () {
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "HallTranslation");
Clazz_makeConstructor (c$, 
function (translationCode, params) {
this.translationCode = translationCode;
if (params != null) {
if (params.z >= 0) {
this.vectorShift12ths = params;
return;
}this.rotationOrder = params.x;
this.rotationShift12ths = params.y;
}this.vectorShift12ths =  new JU.P3i ();
}, "~S,JU.P3i");
c$.getHallLatticeEquivalent = $_M(c$, "getHallLatticeEquivalent", 
function (latticeParameter) {
var latticeCode = J.symmetry.HallTranslation.getLatticeCode (latticeParameter);
var isCentrosymmetric = (latticeParameter > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeIndex = $_M(c$, "getLatticeIndex", 
function (latt) {
for (var i = 1, ipt = 3; i <= J.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (J.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = $_M(c$, "getLatticeCode", 
function (latt) {
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > J.symmetry.HallTranslation.nLatticeTypes ? J.symmetry.HallTranslation.getLatticeCode (J.symmetry.HallTranslation.getLatticeIndex (String.fromCharCode (latt))) : J.symmetry.HallTranslation.latticeTranslationData[latt * 3].charAt (0));
}, "~N");
c$.getLatticeDesignation = $_M(c$, "getLatticeDesignation", 
function (latt) {
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > J.symmetry.HallTranslation.nLatticeTypes) return "";
return str + J.symmetry.HallTranslation.getLatticeCode (latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + J.symmetry.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation2 = $_M(c$, "getLatticeDesignation2", 
function (latticeCode, isCentrosymmetric) {
var latt = J.symmetry.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) latt = -latt;
return J.symmetry.HallTranslation.getLatticeDesignation (latt);
}, "~S,~B");
c$.getLatticeExtension = $_M(c$, "getLatticeExtension", 
function (latt, isCentrosymmetric) {
for (var i = 1, ipt = 3; i <= J.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (J.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return J.symmetry.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
c$.getHallTerms = $_M(c$, "getHallTerms", 
function () {
return (J.symmetry.HallTranslation.hallTranslationTerms == null ? J.symmetry.HallTranslation.hallTranslationTerms = [ new J.symmetry.HallTranslation ('a', JU.P3i.new3 (6, 0, 0)),  new J.symmetry.HallTranslation ('b', JU.P3i.new3 (0, 6, 0)),  new J.symmetry.HallTranslation ('c', JU.P3i.new3 (0, 0, 6)),  new J.symmetry.HallTranslation ('n', JU.P3i.new3 (6, 6, 6)),  new J.symmetry.HallTranslation ('u', JU.P3i.new3 (3, 0, 0)),  new J.symmetry.HallTranslation ('v', JU.P3i.new3 (0, 3, 0)),  new J.symmetry.HallTranslation ('w', JU.P3i.new3 (0, 0, 3)),  new J.symmetry.HallTranslation ('d', JU.P3i.new3 (3, 3, 3)),  new J.symmetry.HallTranslation ('1', JU.P3i.new3 (2, 6, -1)),  new J.symmetry.HallTranslation ('1', JU.P3i.new3 (3, 4, -1)),  new J.symmetry.HallTranslation ('2', JU.P3i.new3 (3, 8, -1)),  new J.symmetry.HallTranslation ('1', JU.P3i.new3 (4, 3, -1)),  new J.symmetry.HallTranslation ('3', JU.P3i.new3 (4, 9, -1)),  new J.symmetry.HallTranslation ('1', JU.P3i.new3 (6, 2, -1)),  new J.symmetry.HallTranslation ('2', JU.P3i.new3 (6, 4, -1)),  new J.symmetry.HallTranslation ('4', JU.P3i.new3 (6, 8, -1)),  new J.symmetry.HallTranslation ('5', JU.P3i.new3 (6, 10, -1)),  new J.symmetry.HallTranslation ('r', JU.P3i.new3 (4, 8, 8)),  new J.symmetry.HallTranslation ('s', JU.P3i.new3 (8, 8, 4)),  new J.symmetry.HallTranslation ('t', JU.P3i.new3 (8, 4, 8))] : J.symmetry.HallTranslation.hallTranslationTerms);
});
c$.getHallTranslation = $_M(c$, "getHallTranslation", 
function (translationCode, order) {
var ht = null;
for (var i = J.symmetry.HallTranslation.getHallTerms ().length; --i >= 0; ) {
var h = J.symmetry.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
ht =  new J.symmetry.HallTranslation (translationCode, null);
ht.translationCode = translationCode;
ht.rotationShift12ths = h.rotationShift12ths;
ht.vectorShift12ths = h.vectorShift12ths;
return ht;
}}}
return ht;
}, "~S,~N");
Clazz_defineStatics (c$,
"latticeTranslationData", ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]);
c$.nLatticeTypes = c$.prototype.nLatticeTypes = Clazz_doubleToInt (J.symmetry.HallTranslation.latticeTranslationData.length / 3) - 1;
Clazz_defineStatics (c$,
"hallTranslationTerms", null);
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["JU.M4"], "J.symmetry.SymmetryOperation", ["java.lang.Float", "JU.List", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "J.util.Escape", "$.Logger", "$.Measure", "$.Parser", "$.Quaternion"], function () {
c$ = Clazz_decorateAsClass (function () {
this.xyzOriginal = null;
this.xyz = null;
this.doNormalize = true;
this.isFinalized = false;
this.opId = 0;
this.atomTest = null;
this.temp3 = null;
this.myLabels = null;
this.modDim = 0;
this.rotTransMatrix = null;
this.gammaIS = null;
this.isBio = false;
Clazz_instantialize (this, arguments);
}, J.symmetry, "SymmetryOperation", JU.M4);
Clazz_overrideConstructor (c$, 
function (op, atoms, atomIndex, countOrId, doNormalize) {
this.doNormalize = doNormalize;
if (op == null) {
this.opId = countOrId;
return;
}this.xyzOriginal = op.xyzOriginal;
this.xyz = op.xyz;
this.opId = op.opId;
this.modDim = op.modDim;
this.myLabels = op.myLabels;
this.rotTransMatrix = op.rotTransMatrix;
this.setM (op);
if (op.rotTransMatrix.length == 32) this.setMod456 ();
if (!op.isFinalized) this.doFinalize ();
if (doNormalize) this.setOffset (atoms, atomIndex, countOrId);
}, "J.symmetry.SymmetryOperation,~A,~N,~N,~B");
$_M(c$, "setMod456", 
function () {
(this.gammaIS =  new JU.M4 ()).setA (this.rotTransMatrix, 16);
});
$_M(c$, "doFinalize", 
function () {
this.m03 /= 12;
this.m13 /= 12;
this.m23 /= 12;
if (this.modDim > 0) {
this.gammaIS.m03 /= 12;
this.gammaIS.m13 /= 12;
this.gammaIS.m23 /= 12;
}this.isFinalized = true;
});
$_M(c$, "getXyz", 
function (normalized) {
return (normalized && this.modDim == 0 || this.xyzOriginal == null ? this.xyz : this.xyzOriginal);
}, "~B");
$_M(c$, "newPoint", 
function (atom1, atom2, transX, transY, transZ) {
if (this.temp3 == null) this.temp3 =  new JU.P3 ();
this.temp3.setT (atom1);
this.transform2 (this.temp3, this.temp3);
atom2.set (this.temp3.x + transX, this.temp3.y + transY, this.temp3.z + transZ);
}, "JU.P3,JU.P3,~N,~N,~N");
$_M(c$, "dumpInfo", 
function () {
return "\n" + this.xyz + "\ninternal matrix representation:\n" + this.toString ();
});
c$.dumpSeitz = $_M(c$, "dumpSeitz", 
function (s) {
return  new JU.SB ().append ("{\t").appendI (Clazz_floatToInt (s.m00)).append ("\t").appendI (Clazz_floatToInt (s.m01)).append ("\t").appendI (Clazz_floatToInt (s.m02)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf (s.m03)).append ("\t}\n").append ("{\t").appendI (Clazz_floatToInt (s.m10)).append ("\t").appendI (Clazz_floatToInt (s.m11)).append ("\t").appendI (Clazz_floatToInt (s.m12)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf (s.m13)).append ("\t}\n").append ("{\t").appendI (Clazz_floatToInt (s.m20)).append ("\t").appendI (Clazz_floatToInt (s.m21)).append ("\t").appendI (Clazz_floatToInt (s.m22)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf (s.m23)).append ("\t}\n").append ("{\t0\t0\t0\t1\t}\n").toString ();
}, "JU.M4");
c$.dumpCanonicalSeitz = $_M(c$, "dumpCanonicalSeitz", 
function (s) {
return  new JU.SB ().append ("{\t").appendI (Clazz_floatToInt (s.m00)).append ("\t").appendI (Clazz_floatToInt (s.m01)).append ("\t").appendI (Clazz_floatToInt (s.m02)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf ((s.m03 + 12) % 12)).append ("\t}\n").append ("{\t").appendI (Clazz_floatToInt (s.m10)).append ("\t").appendI (Clazz_floatToInt (s.m11)).append ("\t").appendI (Clazz_floatToInt (s.m12)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf ((s.m13 + 12) % 12)).append ("\t}\n").append ("{\t").appendI (Clazz_floatToInt (s.m20)).append ("\t").appendI (Clazz_floatToInt (s.m21)).append ("\t").appendI (Clazz_floatToInt (s.m22)).append ("\t").append (J.symmetry.SymmetryOperation.twelfthsOf ((s.m23 + 12) % 12)).append ("\t}\n").append ("{\t0\t0\t0\t1\t}\n").toString ();
}, "JU.M4");
$_M(c$, "setMatrixFromXYZ", 
function (xyz, modDim) {
if (xyz == null) return false;
this.xyzOriginal = xyz;
xyz = xyz.toLowerCase ();
var n = 16;
this.modDim = modDim;
if (modDim > 0) {
n = 32;
this.myLabels = J.symmetry.SymmetryOperation.labelsX1_6;
}this.rotTransMatrix =  Clazz_newFloatArray (n, 0);
var isReverse = (xyz.startsWith ("!"));
if (isReverse) xyz = xyz.substring (1);
if (xyz.indexOf ("xyz matrix:") == 0) {
this.xyz = xyz;
J.util.Parser.parseStringInfestedFloatArray (xyz, null, this.rotTransMatrix);
return this.setFromMatrix (null, isReverse);
}if (xyz.indexOf ("[[") == 0) {
xyz = xyz.$replace ('[', ' ').$replace (']', ' ').$replace (',', ' ');
J.util.Parser.parseStringInfestedFloatArray (xyz, null, this.rotTransMatrix);
for (var i = 0; i < n; i++) {
var v = this.rotTransMatrix[i];
if (Float.isNaN (v)) return false;
}
this.setA (this.rotTransMatrix, 0);
if (n == 32) this.setMod456 ();
this.isFinalized = true;
if (isReverse) this.invertM (this);
this.isBio = (xyz.indexOf ("bio") >= 0);
this.xyz = (this.isBio ? this.toString () : J.symmetry.SymmetryOperation.getXYZFromMatrix (this, false, false, false));
return true;
}var strOut = J.symmetry.SymmetryOperation.getMatrixFromString (this, xyz, this.rotTransMatrix, false);
if (strOut == null) return false;
this.setA (this.rotTransMatrix, 0);
if (n == 32) this.setMod456 ();
if (isReverse) {
this.invertM (this);
this.xyz = J.symmetry.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
} else {
this.xyz = strOut;
}if (J.util.Logger.debugging) J.util.Logger.debug ("" + this);
return true;
}, "~S,~N");
$_M(c$, "setFromMatrix", 
function (offset, isReverse) {
var v = 0;
var pt = 0;
this.myLabels = (this.modDim == 0 ? J.symmetry.SymmetryOperation.labelsXYZ : J.symmetry.SymmetryOperation.labelsX1_6);
for (var i = 0; i < this.rotTransMatrix.length; i++) {
if (Float.isNaN (this.rotTransMatrix[i])) return false;
v = this.rotTransMatrix[i];
if (Math.abs (v) < 0.00001) v = 0;
if (i % 4 == 3) {
if (offset != null) {
v /= 12;
if (pt < offset.length) v += offset[pt++];
}v = J.symmetry.SymmetryOperation.normalizeTwelfths ((v < 0 ? -1 : 1) * Math.round (Math.abs (v * 12)) / 12, this.doNormalize);
}this.rotTransMatrix[i] = v;
if (i == 11 || i == 27) i += 4;
}
this.rotTransMatrix[15] = 1;
this.setA (this.rotTransMatrix, 0);
if (this.rotTransMatrix.length == 32) {
this.rotTransMatrix[31] = 1;
(this.gammaIS =  new JU.M4 ()).setA (this.rotTransMatrix, 16);
}this.isFinalized = true;
if (isReverse) this.invertM (this);
this.xyz = J.symmetry.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
return true;
}, "~A,~B");
c$.getMatrixFromString = $_M(c$, "getMatrixFromString", 
function (op, xyz, rotTransMatrix, allowScaling) {
var isDenominator = false;
var isDecimal = false;
var isNegative = false;
var incommensurate = (op != null && op.modDim > 0);
var nRows = (incommensurate ? 4 + op.modDim : 4);
var doNormalize = (op != null && op.doNormalize);
rotTransMatrix[15] = 1;
if (incommensurate) {
for (var i = nRows, pt = nRows * 5 - 4; i < 7; i++, pt += 5) rotTransMatrix[pt] = 1;

rotTransMatrix[31] = 1;
}var myLabels = (op == null || !incommensurate ? null : op.myLabels);
if (myLabels == null) myLabels = J.symmetry.SymmetryOperation.labelsXYZ;
var ch;
var x = 0;
var y = 0;
var z = 0;
var iValue = 0;
var strOut = "";
var strT;
var rowPt = -1;
var decimalMultiplier = 1;
xyz += ",";
if (incommensurate) {
xyz = JU.PT.simpleReplace (xyz, "x1", "x");
xyz = JU.PT.simpleReplace (xyz, "x2", "y");
xyz = JU.PT.simpleReplace (xyz, "x3", "z");
xyz = JU.PT.simpleReplace (xyz, "x4", "x");
xyz = JU.PT.simpleReplace (xyz, "x5", "y");
xyz = JU.PT.simpleReplace (xyz, "x6", "z");
}for (var i = 0; i < xyz.length; i++) {
ch = xyz.charAt (i);
switch (ch) {
case '\'':
case ' ':
case '{':
case '}':
case '!':
continue;
case '-':
isNegative = true;
continue;
case '+':
isNegative = false;
continue;
case '/':
isDenominator = true;
continue;
case 'X':
case 'x':
var val = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
val *= iValue;
iValue = 0;
}x = val;
break;
case 'Y':
case 'y':
y = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
y *= iValue;
iValue = 0;
}break;
case 'Z':
case 'z':
z = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
z *= iValue;
iValue = 0;
}break;
case ',':
if (++rowPt > 2 && !incommensurate) {
J.util.Logger.warn ("Symmetry Operation? " + xyz);
return null;
}iValue = J.symmetry.SymmetryOperation.normalizeTwelfths (iValue, doNormalize);
var tpt = rowPt * 4 + (rowPt > 2 ? 4 : 0);
rotTransMatrix[tpt++] = x;
rotTransMatrix[tpt++] = y;
rotTransMatrix[tpt++] = z;
rotTransMatrix[tpt] = iValue;
strT = "";
var pt = (rowPt < 3 ? 0 : 3);
strT += J.symmetry.SymmetryOperation.plusMinus (strT, x, myLabels[pt++]);
strT += J.symmetry.SymmetryOperation.plusMinus (strT, y, myLabels[pt++]);
strT += J.symmetry.SymmetryOperation.plusMinus (strT, z, myLabels[pt++]);
strT += J.symmetry.SymmetryOperation.xyzFraction (iValue, false, true);
strOut += (strOut === "" ? "" : ",") + strT;
if (rowPt == nRows - 2) return strOut;
x = y = z = 0;
iValue = 0;
break;
case '.':
isDecimal = true;
decimalMultiplier = 1;
continue;
case '0':
if (!isDecimal && (isDenominator || !allowScaling)) continue;
default:
var ich = ch.charCodeAt (0) - 48;
if (isDecimal && ich >= 0 && ich <= 9) {
decimalMultiplier /= 10;
if (iValue < 0) isNegative = true;
iValue += decimalMultiplier * ich * (isNegative ? -1 : 1);
continue;
}if (ich >= 0 && ich <= 9) {
if (isDenominator) {
iValue /= ich;
} else {
iValue = iValue * 10 + (isNegative ? -1 : 1) * ich;
isNegative = false;
}} else {
J.util.Logger.warn ("symmetry character?" + ch);
}}
isDecimal = isDenominator = isNegative = false;
}
return null;
}, "J.symmetry.SymmetryOperation,~S,~A,~B");
c$.plusMinus = $_M(c$, "plusMinus", 
function (strT, x, sx) {
return (x == 0 ? "" : (x < 0 ? "-" : strT.length == 0 ? "" : "+") + sx);
}, "~S,~N,~S");
c$.normalizeTwelfths = $_M(c$, "normalizeTwelfths", 
function (iValue, doNormalize) {
iValue *= 12;
if (doNormalize) {
while (iValue > 6) iValue -= 12;

while (iValue <= -6) iValue += 12;

}return iValue;
}, "~N,~B");
c$.getXYZFromMatrix = $_M(c$, "getXYZFromMatrix", 
function (mat, is12ths, allPositive, halfOrLess) {
var str = "";
var op = (Clazz_instanceOf (mat, J.symmetry.SymmetryOperation) ? mat : null);
var thisLabels = (op == null ? null : op.myLabels);
if (thisLabels == null) thisLabels = J.symmetry.SymmetryOperation.labelsXYZ;
var row =  Clazz_newFloatArray (4, 0);
var n = (op == null ? 3 : op.modDim + 3);
for (var i = 0; i < n; i++) {
var lpt = (i < 3 ? 0 : 3);
if (i < 3) mat.getRow (i, row);
 else for (var j = 0, pt = i * 4 + 4; j < 4; j++, pt++) row[j] = op.rotTransMatrix[pt];

var term = "";
for (var j = 0; j < 3; j++) if (row[j] != 0) term += J.symmetry.SymmetryOperation.plusMinus (term, row[j], thisLabels[j + lpt]);

term += J.symmetry.SymmetryOperation.xyzFraction ((is12ths ? row[3] : row[3] * 12), allPositive, halfOrLess);
str += "," + term;
}
return str.substring (1);
}, "JU.M4,~B,~B,~B");
c$.twelfthsOf = $_M(c$, "twelfthsOf", 
function (n12ths) {
var str = "";
var i12ths = Math.round (n12ths);
if (i12ths == 12) return "1";
if (i12ths == -12) return "-1";
if (i12ths < 0) {
i12ths = -i12ths;
if (i12ths % 12 != 0) str = "-";
}var n = Clazz_doubleToInt (i12ths / 12);
if (n < 1) return str + J.symmetry.SymmetryOperation.twelfths[i12ths % 12];
var m = 0;
switch (i12ths % 12) {
case 0:
return str + n;
case 1:
case 5:
case 7:
case 11:
m = 12;
break;
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
}
return str + (Clazz_doubleToInt (i12ths * m / 12)) + "/" + m;
}, "~N");
c$.xyzFraction = $_M(c$, "xyzFraction", 
function (n12ths, allPositive, halfOrLess) {
n12ths = Math.round (n12ths);
if (allPositive) {
while (n12ths < 0) n12ths += 12;

} else if (halfOrLess && n12ths > 6) {
n12ths -= 12;
}var s = J.symmetry.SymmetryOperation.twelfthsOf (n12ths);
return (s.charAt (0) == '0' ? "" : n12ths > 0 ? "+" + s : s);
}, "~N,~B,~B");
$_M(c$, "setOffset", 
function (atoms, atomIndex, count) {
var i1 = atomIndex;
var i2 = i1 + count;
var x = 0;
var y = 0;
var z = 0;
if (this.atomTest == null) this.atomTest =  new JU.P3 ();
for (var i = i1; i < i2; i++) {
this.newPoint (atoms[i], this.atomTest, 0, 0, 0);
x += this.atomTest.x;
y += this.atomTest.y;
z += this.atomTest.z;
}
while (x < -0.001 || x >= count + 0.001) {
this.m03 += (x < 0 ? 1 : -1);
x += (x < 0 ? count : -count);
}
while (y < -0.001 || y >= count + 0.001) {
this.m13 += (y < 0 ? 1 : -1);
y += (y < 0 ? count : -count);
}
while (z < -0.001 || z >= count + 0.001) {
this.m23 += (z < 0 ? 1 : -1);
z += (z < 0 ? count : -count);
}
}, "~A,~N,~N");
$_M(c$, "rotateAxes", 
function (vectors, unitcell, ptTemp, mTemp) {
var vRot =  new Array (3);
this.getRotationScale (mTemp);
for (var i = vectors.length; --i >= 0; ) {
ptTemp.setT (vectors[i]);
unitcell.toFractional (ptTemp, true);
mTemp.transform (ptTemp);
unitcell.toCartesian (ptTemp, true);
vRot[i] = JU.V3.newV (ptTemp);
}
return vRot;
}, "~A,J.symmetry.UnitCell,JU.P3,JU.M3");
$_M(c$, "getDescription", 
function (modelSet, uc, pt00, ptTarget, id) {
if (!this.isFinalized) this.doFinalize ();
var vtemp =  new JU.V3 ();
var ptemp =  new JU.P3 ();
var pt01 =  new JU.P3 ();
var pt02 =  new JU.P3 ();
var pt03 =  new JU.P3 ();
var ftrans =  new JU.V3 ();
var vtrans =  new JU.V3 ();
var xyz = (this.isBio ? this.xyzOriginal : J.symmetry.SymmetryOperation.getXYZFromMatrix (this, false, false, false));
var typeOnly = (id == null);
if (pt00 == null || Float.isNaN (pt00.x)) pt00 =  new JU.P3 ();
if (ptTarget != null) {
pt01.setT (pt00);
pt02.setT (ptTarget);
uc.toUnitCell (pt01, ptemp);
uc.toUnitCell (pt02, ptemp);
uc.toFractional (pt01, false);
this.transform (pt01);
uc.toCartesian (pt01, false);
uc.toUnitCell (pt01, ptemp);
if (pt01.distance (pt02) > 0.1) return null;
pt01.setT (pt00);
pt02.setT (ptTarget);
uc.toFractional (pt01, false);
uc.toFractional (pt02, false);
this.transform (pt01);
vtrans.sub2 (pt02, pt01);
pt01.set (0, 0, 0);
pt02.set (0, 0, 0);
}pt01.x = pt02.y = pt03.z = 1;
pt01.add (pt00);
pt02.add (pt00);
pt03.add (pt00);
var p0 = JU.P3.newP (pt00);
var p1 = JU.P3.newP (pt01);
var p2 = JU.P3.newP (pt02);
var p3 = JU.P3.newP (pt03);
uc.toFractional (p0, false);
uc.toFractional (p1, false);
uc.toFractional (p2, false);
uc.toFractional (p3, false);
this.transform2 (p0, p0);
this.transform2 (p1, p1);
this.transform2 (p2, p2);
this.transform2 (p3, p3);
p0.add (vtrans);
p1.add (vtrans);
p2.add (vtrans);
p3.add (vtrans);
J.symmetry.SymmetryOperation.approx (vtrans);
uc.toCartesian (p0, false);
uc.toCartesian (p1, false);
uc.toCartesian (p2, false);
uc.toCartesian (p3, false);
var v01 =  new JU.V3 ();
v01.sub2 (p1, p0);
var v02 =  new JU.V3 ();
v02.sub2 (p2, p0);
var v03 =  new JU.V3 ();
v03.sub2 (p3, p0);
vtemp.cross (v01, v02);
var haveinversion = (vtemp.dot (v03) < 0);
if (haveinversion) {
p1.scaleAdd2 (-2, v01, p1);
p2.scaleAdd2 (-2, v02, p2);
p3.scaleAdd2 (-2, v03, p3);
}var info;
info = J.util.Measure.computeHelicalAxis (null, 135266306, pt00, p0, J.util.Quaternion.getQuaternionFrame (p0, p1, p2).div (J.util.Quaternion.getQuaternionFrame (pt00, pt01, pt02)));
var pa1 = info[0];
var ax1 = info[1];
var ang1 = Clazz_floatToInt (Math.abs (JU.PT.approx ((info[3]).x, 1)));
var pitch1 = J.symmetry.SymmetryOperation.approxF ((info[3]).y);
if (haveinversion) {
p1.scaleAdd2 (2, v01, p1);
p2.scaleAdd2 (2, v02, p2);
p3.scaleAdd2 (2, v03, p3);
}var trans = JU.V3.newVsub (p0, pt00);
if (trans.length () < 0.1) trans = null;
var ptinv = null;
var ipt = null;
var pt0 = null;
var istranslation = (ang1 == 0);
var isrotation = !istranslation;
var isinversion = false;
var ismirrorplane = false;
if (isrotation || haveinversion) trans = null;
if (haveinversion && istranslation) {
ipt = JU.P3.newP (pt00);
ipt.add (p0);
ipt.scale (0.5);
ptinv = p0;
isinversion = true;
} else if (haveinversion) {
var d = (pitch1 == 0 ?  new JU.V3 () : ax1);
var f = 0;
switch (ang1) {
case 60:
f = 0.6666667;
break;
case 120:
f = 2;
break;
case 90:
f = 1;
break;
case 180:
pt0 = JU.P3.newP (pt00);
pt0.add (d);
pa1.scaleAdd2 (0.5, d, pt00);
if (pt0.distance (p0) > 0.1) {
trans = JU.V3.newVsub (p0, pt0);
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans.setT (ptemp);
} else {
trans = null;
}isrotation = false;
haveinversion = false;
ismirrorplane = true;
}
if (f != 0) {
vtemp.sub2 (pt00, pa1);
vtemp.add (p0);
vtemp.sub (pa1);
vtemp.sub (d);
vtemp.scale (f);
pa1.add (vtemp);
ipt =  new JU.P3 ();
ipt.scaleAdd2 (0.5, d, pa1);
ptinv =  new JU.P3 ();
ptinv.scaleAdd2 (-2, ipt, pt00);
ptinv.scale (-1);
}} else if (trans != null) {
ptemp.setT (trans);
uc.toFractional (ptemp, false);
if (J.symmetry.SymmetryOperation.approxF (ptemp.x) == 1) {
ptemp.x = 0;
}if (J.symmetry.SymmetryOperation.approxF (ptemp.y) == 1) {
ptemp.y = 0;
}if (J.symmetry.SymmetryOperation.approxF (ptemp.z) == 1) {
ptemp.z = 0;
}ftrans.setT (ptemp);
uc.toCartesian (ptemp, false);
trans.setT (ptemp);
}var ang = ang1;
J.symmetry.SymmetryOperation.approx0 (ax1);
if (isrotation) {
var pt1 =  new JU.P3 ();
vtemp.setT (ax1);
var ang2 = ang1;
if (haveinversion) {
pt1.add2 (pa1, vtemp);
ang2 = Math.round (J.util.Measure.computeTorsion (ptinv, pa1, pt1, p0, true));
} else if (pitch1 == 0) {
pt1.setT (pa1);
ptemp.scaleAdd2 (1, pt1, vtemp);
ang2 = Math.round (J.util.Measure.computeTorsion (pt00, pa1, ptemp, p0, true));
} else {
ptemp.add2 (pa1, vtemp);
pt1.scaleAdd2 (0.5, vtemp, pa1);
ang2 = Math.round (J.util.Measure.computeTorsion (pt00, pa1, ptemp, p0, true));
}if (ang2 != 0) ang1 = ang2;
}if (isrotation && !haveinversion && pitch1 == 0) {
if (ax1.z < 0 || ax1.z == 0 && (ax1.y < 0 || ax1.y == 0 && ax1.x < 0)) {
ax1.scale (-1);
ang1 = -ang1;
}}var info1 = "identity";
var draw1 =  new JU.SB ();
var drawid;
if (isinversion) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 = "inversion center|" + this.coord (ptemp);
} else if (isrotation) {
if (haveinversion) {
info1 = "" + (Clazz_doubleToInt (360 / ang)) + "-bar axis";
} else if (pitch1 != 0) {
info1 = "" + (Clazz_doubleToInt (360 / ang)) + "-fold screw axis";
ptemp.setT (ax1);
uc.toFractional (ptemp, false);
info1 += "|translation: " + this.coord (ptemp);
} else {
info1 = "C" + (Clazz_doubleToInt (360 / ang)) + " axis";
}} else if (trans != null) {
var s = " " + this.coord (ftrans);
if (istranslation) {
info1 = "translation:" + s;
} else if (ismirrorplane) {
var fx = J.symmetry.SymmetryOperation.approxF (ftrans.x);
var fy = J.symmetry.SymmetryOperation.approxF (ftrans.y);
var fz = J.symmetry.SymmetryOperation.approxF (ftrans.z);
s = " " + this.coord (ftrans);
if (fx != 0 && fy != 0 && fz != 0) info1 = "d-";
 else if (fx != 0 && fy != 0 || fy != 0 && fz != 0 || fz != 0 && fx != 0) info1 = "n-";
 else if (fx != 0) info1 = "a-";
 else if (fy != 0) info1 = "b-";
 else info1 = "c-";
info1 += "glide plane |translation:" + s;
}} else if (ismirrorplane) {
info1 = "mirror plane";
}if (haveinversion && !isinversion) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 += "|inversion center at " + this.coord (ptemp);
}var cmds = null;
if (!typeOnly) {
drawid = "\ndraw ID " + id + "_";
draw1 =  new JU.SB ();
draw1.append (("// " + this.xyzOriginal + "|" + xyz + "|" + info1).$replace ('\n', ' ')).append ("\n");
draw1.append (drawid).append ("* delete");
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1X", 0.15, pt00, pt01, "red");
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1Y", 0.15, pt00, pt02, "green");
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1Z", 0.15, pt00, pt03, "blue");
ptemp.sub2 (p1, p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2X", 0.2, p0, ptemp, "red");
ptemp.sub2 (p2, p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2Y", 0.2, p0, ptemp, "green");
ptemp.sub2 (p3, p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2Z", 0.2, p0, ptemp, "purple");
var color;
if (isrotation) {
var pt1 =  new JU.P3 ();
color = "red";
ang = ang1;
var scale = 1.0;
vtemp.setT (ax1);
if (haveinversion) {
pt1.add2 (pa1, vtemp);
if (pitch1 == 0) {
pt1.setT (ipt);
vtemp.scale (3);
ptemp.scaleAdd2 (-1, vtemp, pa1);
draw1.append (drawid).append ("rotVector2 diameter 0.1 ").append (J.util.Escape.eP (pa1)).append (J.util.Escape.eP (ptemp)).append (" color red");
}scale = p0.distance (pt1);
draw1.append (drawid).append ("rotLine1 ").append (J.util.Escape.eP (pt1)).append (J.util.Escape.eP (ptinv)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (J.util.Escape.eP (pt1)).append (J.util.Escape.eP (p0)).append (" color red");
} else if (pitch1 == 0) {
var isSpecial = (pt00.distance (p0) < 0.2);
if (!isSpecial) {
draw1.append (drawid).append ("rotLine1 ").append (J.util.Escape.eP (pt00)).append (J.util.Escape.eP (pa1)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (J.util.Escape.eP (p0)).append (J.util.Escape.eP (pa1)).append (" color red");
}vtemp.scale (3);
ptemp.scaleAdd2 (-1, vtemp, pa1);
draw1.append (drawid).append ("rotVector2 diameter 0.1 ").append (J.util.Escape.eP (pa1)).append (J.util.Escape.eP (ptemp)).append (" color red");
pt1.setT (pa1);
if (pitch1 == 0 && pt00.distance (p0) < 0.2) pt1.scaleAdd2 (0.5, pt1, vtemp);
} else {
color = "orange";
draw1.append (drawid).append ("rotLine1 ").append (J.util.Escape.eP (pt00)).append (J.util.Escape.eP (pa1)).append (" color red");
ptemp.add2 (pa1, vtemp);
draw1.append (drawid).append ("rotLine2 ").append (J.util.Escape.eP (p0)).append (J.util.Escape.eP (ptemp)).append (" color red");
pt1.scaleAdd2 (0.5, vtemp, pa1);
}ptemp.add2 (pt1, vtemp);
if (haveinversion && pitch1 != 0) {
draw1.append (drawid).append ("rotRotLine1").append (J.util.Escape.eP (pt1)).append (J.util.Escape.eP (ptinv)).append (" color red");
draw1.append (drawid).append ("rotRotLine2").append (J.util.Escape.eP (pt1)).append (J.util.Escape.eP (p0)).append (" color red");
}draw1.append (drawid).append ("rotRotArrow arrow width 0.10 scale " + scale + " arc ").append (J.util.Escape.eP (pt1)).append (J.util.Escape.eP (ptemp));
ptemp.setT (haveinversion ? ptinv : pt00);
if (ptemp.distance (p0) < 0.1) ptemp.set (Math.random (), Math.random (), Math.random ());
draw1.append (J.util.Escape.eP (ptemp));
ptemp.set (0, ang, 0);
draw1.append (J.util.Escape.eP (ptemp)).append (" color red");
draw1.append (drawid).append ("rotVector1 vector diameter 0.1 ").append (J.util.Escape.eP (pa1)).append (J.util.Escape.eP (vtemp)).append ("color ").append (color);
}if (ismirrorplane) {
if (pt00.distance (pt0) > 0.2) draw1.append (drawid).append ("planeVector arrow ").append (J.util.Escape.eP (pt00)).append (J.util.Escape.eP (pt0)).append (" color indigo");
if (trans != null) {
ptemp.scaleAdd2 (-1, p0, p1);
ptemp.add (pt0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameX", 0.15, pt0, ptemp, "translucent red");
ptemp.scaleAdd2 (-1, p0, p2);
ptemp.add (pt0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameY", 0.15, pt0, ptemp, "translucent green");
ptemp.scaleAdd2 (-1, p0, p3);
ptemp.add (pt0);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameZ", 0.15, pt0, ptemp, "translucent blue");
}color = (trans == null ? "green" : "blue");
vtemp.setT (ax1);
vtemp.normalize ();
var w = -vtemp.x * pa1.x - vtemp.y * pa1.y - vtemp.z * pa1.z;
var plane = JU.P4.new4 (vtemp.x, vtemp.y, vtemp.z, w);
var v =  new JU.List ();
v.addLast (uc.getCanonicalCopy (1.05));
modelSet.intersectPlane (plane, v, 3);
for (var i = v.size (); --i >= 0; ) {
var pts = v.get (i);
draw1.append (drawid).append ("planep").appendI (i).append (" ").append (J.util.Escape.eP (pts[0])).append (J.util.Escape.eP (pts[1]));
if (pts.length == 3) draw1.append (J.util.Escape.eP (pts[2]));
draw1.append (" color translucent ").append (color);
}
if (v.size () == 0) {
ptemp.add2 (pa1, ax1);
draw1.append (drawid).append ("planeCircle scale 2.0 circle ").append (J.util.Escape.eP (pa1)).append (J.util.Escape.eP (ptemp)).append (" color translucent ").append (color).append (" mesh fill");
}}if (haveinversion) {
draw1.append (drawid).append ("invPoint diameter 0.4 ").append (J.util.Escape.eP (ipt));
draw1.append (drawid).append ("invArrow arrow ").append (J.util.Escape.eP (pt00)).append (J.util.Escape.eP (ptinv)).append (" color indigo");
if (!isinversion) {
ptemp.add2 (ptinv, pt00);
ptemp.sub (pt01);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameX", 0.15, ptinv, ptemp, "translucent red");
ptemp.add2 (ptinv, pt00);
ptemp.sub (pt02);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameY", 0.15, ptinv, ptemp, "translucent green");
ptemp.add2 (ptinv, pt00);
ptemp.sub (pt03);
J.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameZ", 0.15, ptinv, ptemp, "translucent blue");
}}if (trans != null) {
if (pt0 == null) pt0 = JU.P3.newP (pt00);
draw1.append (drawid).append ("transVector vector ").append (J.util.Escape.eP (pt0)).append (J.util.Escape.eP (trans));
}draw1.append ("\nvar pt00 = " + J.util.Escape.eP (pt00));
draw1.append ("\nvar p0 = " + J.util.Escape.eP (p0));
draw1.append ("\nif (within(0.2,p0).length == 0) {");
draw1.append ("\nvar set2 = within(0.2,p0.uxyz.xyz)");
draw1.append ("\nif (set2) {");
draw1.append (drawid).append ("cellOffsetVector arrow @p0 @set2 color grey");
draw1.append (drawid).append ("offsetFrameX diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (J.util.Escape.eP (v01)).append ("*0.9} color red");
draw1.append (drawid).append ("offsetFrameY diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (J.util.Escape.eP (v02)).append ("*0.9} color green");
draw1.append (drawid).append ("offsetFrameZ diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (J.util.Escape.eP (v03)).append ("*0.9} color purple");
draw1.append ("\n}}\n");
cmds = draw1.toString ();
draw1 = null;
drawid = null;
}if (trans == null) ftrans = null;
if (isrotation) {
if (haveinversion) {
} else if (pitch1 == 0) {
} else {
trans = JU.V3.newV (ax1);
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans = JU.V3.newV (ptemp);
}}if (ismirrorplane) {
ang1 = 0;
}if (haveinversion) {
if (isinversion) {
pa1 = null;
ax1 = null;
trans = null;
ftrans = null;
}} else if (istranslation) {
pa1 = null;
ax1 = null;
}if (ax1 != null) ax1.normalize ();
var m2 = null;
m2 = JU.M4.newM (this);
if (vtrans.length () != 0) {
m2.m03 += vtrans.x;
m2.m13 += vtrans.y;
m2.m23 += vtrans.z;
}xyz = (this.isBio ? m2.toString () : J.symmetry.SymmetryOperation.getXYZFromMatrix (m2, false, false, false));
return [xyz, this.xyzOriginal, info1, cmds, J.symmetry.SymmetryOperation.approx0 (ftrans), J.symmetry.SymmetryOperation.approx0 (trans), J.symmetry.SymmetryOperation.approx0 (ipt), J.symmetry.SymmetryOperation.approx0 (pa1), J.symmetry.SymmetryOperation.approx0 (ax1), Integer.$valueOf (ang1), m2, vtrans];
}, "J.modelset.ModelSet,J.api.SymmetryInterface,JU.P3,JU.P3,~S");
$_M(c$, "coord", 
function (p) {
J.symmetry.SymmetryOperation.approx0 (p);
return (this.isBio ? p.x + " " + p.y + " " + p.z : J.symmetry.SymmetryOperation.fcoord (p));
}, "JU.T3");
c$.drawLine = $_M(c$, "drawLine", 
function (s, id, diameter, pt0, pt1, color) {
s.append (id).append (" diameter ").appendF (diameter).append (J.util.Escape.eP (pt0)).append (J.util.Escape.eP (pt1)).append (" color ").append (color);
}, "JU.SB,~S,~N,JU.P3,JU.P3,~S");
c$.fcoord = $_M(c$, "fcoord", 
function (p) {
return J.symmetry.SymmetryOperation.fc (p.x) + " " + J.symmetry.SymmetryOperation.fc (p.y) + " " + J.symmetry.SymmetryOperation.fc (p.z);
}, "JU.T3");
c$.fc = $_M(c$, "fc", 
function (x) {
var xabs = Math.abs (x);
var x24 = Clazz_floatToInt (J.symmetry.SymmetryOperation.approxF (xabs * 24));
var m = (x < 0 ? "-" : "");
if (x24 % 8 != 0) return m + J.symmetry.SymmetryOperation.twelfthsOf (x24 >> 1);
return (x24 == 0 ? "0" : x24 == 24 ? m + "1" : m + (Clazz_doubleToInt (x24 / 8)) + "/3");
}, "~N");
c$.approx0 = $_M(c$, "approx0", 
function (pt) {
if (pt != null) {
if (Math.abs (pt.x) < 0.0001) pt.x = 0;
if (Math.abs (pt.y) < 0.0001) pt.y = 0;
if (Math.abs (pt.z) < 0.0001) pt.z = 0;
}return pt;
}, "JU.T3");
c$.approx = $_M(c$, "approx", 
function (pt) {
if (pt != null) {
pt.x = J.symmetry.SymmetryOperation.approxF (pt.x);
pt.y = J.symmetry.SymmetryOperation.approxF (pt.y);
pt.z = J.symmetry.SymmetryOperation.approxF (pt.z);
}return pt;
}, "JU.T3");
c$.approxF = $_M(c$, "approxF", 
function (f) {
return JU.PT.approx (f, 100);
}, "~N");
c$.normalizeTranslation = $_M(c$, "normalizeTranslation", 
function (operation) {
operation.m03 = (Clazz_floatToInt (operation.m03) + 12) % 12;
operation.m13 = (Clazz_floatToInt (operation.m13) + 12) % 12;
operation.m23 = (Clazz_floatToInt (operation.m23) + 12) % 12;
}, "JU.M4");
c$.labelsXYZ = c$.prototype.labelsXYZ = ["x", "y", "z"];
c$.labelsX1_6 = c$.prototype.labelsX1_6 = ["x1", "x2", "x3", "x4", "x5", "x6"];
Clazz_defineStatics (c$,
"twelfths", ["0", "1/12", "1/6", "1/4", "1/3", "5/12", "1/2", "7/12", "2/3", "3/4", "5/6", "11/12"]);
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (null, "J.symmetry.SymmetryInfo", ["J.util.SimpleUnitCell"], function () {
c$ = Clazz_decorateAsClass (function () {
this.coordinatesAreFractional = false;
this.isMultiCell = false;
this.spaceGroup = null;
this.symmetryOperations = null;
this.symmetryInfoString = null;
this.cellRange = null;
this.periodicOriginXyz = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "SymmetryInfo");
$_M(c$, "isPeriodic", 
function () {
return this.periodicOriginXyz != null;
});
Clazz_makeConstructor (c$, 
function () {
});
$_M(c$, "setSymmetryInfo", 
function (info) {
this.cellRange = info.get ("unitCellRange");
this.periodicOriginXyz = info.get ("periodicOriginXyz");
this.spaceGroup = info.get ("spaceGroup");
if (this.spaceGroup == null || this.spaceGroup === "") this.spaceGroup = "spacegroup unspecified";
var symmetryCount = info.containsKey ("symmetryCount") ? (info.get ("symmetryCount")).intValue () : 0;
this.symmetryOperations = info.get ("symmetryOperations");
this.symmetryInfoString = "Spacegroup: " + this.spaceGroup;
if (this.symmetryOperations == null) {
this.symmetryInfoString += "\nNumber of symmetry operations: ?\nSymmetry Operations: unspecified\n";
} else {
this.symmetryInfoString += "\nNumber of symmetry operations: " + (symmetryCount == 0 ? 1 : symmetryCount) + "\nSymmetry Operations:";
for (var i = 0; i < symmetryCount; i++) this.symmetryInfoString += "\n" + this.symmetryOperations[i];

}this.symmetryInfoString += "\n";
var notionalUnitcell = info.get ("notionalUnitcell");
if (!J.util.SimpleUnitCell.isValid (notionalUnitcell)) return null;
this.coordinatesAreFractional = info.containsKey ("coordinatesAreFractional") ? (info.get ("coordinatesAreFractional")).booleanValue () : false;
this.isMultiCell = (this.coordinatesAreFractional && this.symmetryOperations != null);
return notionalUnitcell;
}, "java.util.Map");
});
Clazz_declarePackage ("J.symmetry");
Clazz_load (["J.util.SimpleUnitCell", "JU.P3", "J.viewer.JC"], "J.symmetry.UnitCell", ["java.lang.Float", "JU.M4", "J.api.Interface", "J.util.BoxInfo", "$.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vertices = null;
this.cartesianOffset = null;
this.fractionalOffset = null;
this.allFractionalRelative = false;
this.unitCellMultiplier = null;
Clazz_instantialize (this, arguments);
}, J.symmetry, "UnitCell", J.util.SimpleUnitCell);
Clazz_prepareFields (c$, function () {
this.cartesianOffset =  new JU.P3 ();
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.symmetry.UnitCell, []);
});
c$.newP = $_M(c$, "newP", 
function (points) {
var c =  new J.symmetry.UnitCell ();
var parameters = [-1, 0, 0, 0, 0, 0, points[1].x, points[1].y, points[1].z, points[2].x, points[2].y, points[2].z, points[3].x, points[3].y, points[3].z];
c.set (parameters);
c.allFractionalRelative = true;
c.calcUnitcellVertices ();
c.setCartesianOffset (points[0]);
return c;
}, "~A");
c$.newA = $_V(c$, "newA", 
function (notionalUnitcell) {
var c =  new J.symmetry.UnitCell ();
c.set (notionalUnitcell);
c.calcUnitcellVertices ();
return c;
}, "~A");
$_M(c$, "setOrientation", 
function (mat) {
if (mat == null) return;
var m =  new JU.M4 ();
m.setM3 (mat);
this.matrixFractionalToCartesian.mul2 (m, this.matrixFractionalToCartesian);
this.matrixCartesianToFractional.invertM (this.matrixFractionalToCartesian);
this.calcUnitcellVertices ();
}, "JU.M3");
$_M(c$, "toUnitCell", 
function (pt, offset) {
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.transform (pt);
this.unitize (pt);
this.matrixFractionalToCartesian.transform (pt);
} else {
this.matrixCtoFAbsolute.transform (pt);
this.unitize (pt);
pt.add (offset);
this.matrixFtoCAbsolute.transform (pt);
}}, "JU.P3,JU.P3");
$_M(c$, "unitize", 
function (pt) {
switch (this.dimension) {
case 3:
pt.z = J.symmetry.UnitCell.toFractionalX (pt.z);
case 2:
pt.y = J.symmetry.UnitCell.toFractionalX (pt.y);
case 1:
pt.x = J.symmetry.UnitCell.toFractionalX (pt.x);
}
}, "JU.P3");
$_M(c$, "setAllFractionalRelative", 
function (TF) {
this.allFractionalRelative = TF;
}, "~B");
$_M(c$, "setOffset", 
function (pt) {
if (pt == null) return;
if (pt.x >= 100 || pt.y >= 100) {
this.unitCellMultiplier = (pt.z == 0 ? null : JU.P3.newP (pt));
return;
}this.fractionalOffset =  new JU.P3 ();
this.fractionalOffset.setT (pt);
this.matrixCartesianToFractional.m03 = -pt.x;
this.matrixCartesianToFractional.m13 = -pt.y;
this.matrixCartesianToFractional.m23 = -pt.z;
this.cartesianOffset.setT (pt);
this.matrixFractionalToCartesian.m03 = 0;
this.matrixFractionalToCartesian.m13 = 0;
this.matrixFractionalToCartesian.m23 = 0;
this.matrixFractionalToCartesian.transform (this.cartesianOffset);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "JU.P3");
$_M(c$, "setCartesianOffset", 
function (origin) {
this.cartesianOffset.setT (origin);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
this.fractionalOffset =  new JU.P3 ();
this.fractionalOffset.setT (this.cartesianOffset);
this.matrixCartesianToFractional.m03 = 0;
this.matrixCartesianToFractional.m13 = 0;
this.matrixCartesianToFractional.m23 = 0;
this.matrixCartesianToFractional.transform (this.fractionalOffset);
this.matrixCartesianToFractional.m03 = -this.fractionalOffset.x;
this.matrixCartesianToFractional.m13 = -this.fractionalOffset.y;
this.matrixCartesianToFractional.m23 = -this.fractionalOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "JU.T3");
$_M(c$, "setMinMaxLatticeParameters", 
function (minXYZ, maxXYZ) {
if (maxXYZ.x <= 555 && maxXYZ.y >= 555) {
var pt =  new JU.P3 ();
J.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.x, pt, 0);
minXYZ.x = Clazz_floatToInt (pt.x);
minXYZ.y = Clazz_floatToInt (pt.y);
minXYZ.z = Clazz_floatToInt (pt.z);
J.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.y, pt, 1);
maxXYZ.x = Clazz_floatToInt (pt.x);
maxXYZ.y = Clazz_floatToInt (pt.y);
maxXYZ.z = Clazz_floatToInt (pt.z);
}switch (this.dimension) {
case 1:
minXYZ.y = 0;
maxXYZ.y = 1;
case 2:
minXYZ.z = 0;
maxXYZ.z = 1;
}
}, "JU.P3i,JU.P3i");
$_M(c$, "dumpInfo", 
function (isFull) {
return "a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", alpha=" + this.alpha + ", beta=" + this.beta + ", gamma=" + this.gamma + (isFull ? "\nfractional to cartesian: " + this.matrixFractionalToCartesian + "\ncartesian to fractional: " + this.matrixCartesianToFractional : "");
}, "~B");
$_M(c$, "getVertices", 
function () {
return this.vertices;
});
$_M(c$, "getCartesianOffset", 
function () {
return this.cartesianOffset;
});
$_M(c$, "getFractionalOffset", 
function () {
return this.fractionalOffset;
});
$_M(c$, "getTensor", 
function (parBorU) {
if (parBorU == null) return null;
var t = (J.api.Interface.getOptionInterface ("util.Tensor"));
if (parBorU[0] == 0) {
var f = parBorU[7];
var eigenValues = [f, f, f];
return t.setFromEigenVectors (J.symmetry.UnitCell.unitVectors, eigenValues, "iso", "Uiso=" + f);
}var Bcart =  Clazz_newDoubleArray (6, 0);
var ortepType = Clazz_floatToInt (parBorU[6]);
if (ortepType == 12) {
Bcart[0] = parBorU[0] * 19.739208802178716;
Bcart[1] = parBorU[1] * 19.739208802178716;
Bcart[2] = parBorU[2] * 19.739208802178716;
Bcart[3] = parBorU[3] * 19.739208802178716 * 2;
Bcart[4] = parBorU[4] * 19.739208802178716 * 2;
Bcart[5] = parBorU[5] * 19.739208802178716 * 2;
parBorU[7] = (parBorU[0] + parBorU[1] + parBorU[3]) / 3;
} else {
var isFractional = (ortepType == 4 || ortepType == 5 || ortepType == 8 || ortepType == 9);
var cc = 2 - (ortepType % 2);
var dd = (ortepType == 8 || ortepType == 9 || ortepType == 10 ? 19.739208802178716 : ortepType == 4 || ortepType == 5 ? 0.25 : ortepType == 2 || ortepType == 3 ? Math.log (2) : 1);
var B11 = parBorU[0] * dd * (isFractional ? this.a_ * this.a_ : 1);
var B22 = parBorU[1] * dd * (isFractional ? this.b_ * this.b_ : 1);
var B33 = parBorU[2] * dd * (isFractional ? this.c_ * this.c_ : 1);
var B12 = parBorU[3] * dd * (isFractional ? this.a_ * this.b_ : 1) * cc;
var B13 = parBorU[4] * dd * (isFractional ? this.a_ * this.c_ : 1) * cc;
var B23 = parBorU[5] * dd * (isFractional ? this.b_ * this.c_ : 1) * cc;
parBorU[7] = Math.pow (B11 / 19.739208802178716 / this.a_ / this.a_ * B22 / 19.739208802178716 / this.b_ / this.b_ * B33 / 19.739208802178716 / this.c_ / this.c_, 0.3333);
Bcart[0] = this.a * this.a * B11 + this.b * this.b * this.cosGamma * this.cosGamma * B22 + this.c * this.c * this.cosBeta * this.cosBeta * B33 + this.a * this.b * this.cosGamma * B12 + this.b * this.c * this.cosGamma * this.cosBeta * B23 + this.a * this.c * this.cosBeta * B13;
Bcart[1] = this.b * this.b * this.sinGamma * this.sinGamma * B22 + this.c * this.c * this.cA_ * this.cA_ * B33 + this.b * this.c * this.cA_ * this.sinGamma * B23;
Bcart[2] = this.c * this.c * this.cB_ * this.cB_ * B33;
Bcart[3] = 2 * this.b * this.b * this.cosGamma * this.sinGamma * B22 + 2 * this.c * this.c * this.cA_ * this.cosBeta * B33 + this.a * this.b * this.sinGamma * B12 + this.b * this.c * (this.cA_ * this.cosGamma + this.sinGamma * this.cosBeta) * B23 + this.a * this.c * this.cA_ * B13;
Bcart[4] = 2 * this.c * this.c * this.cB_ * this.cosBeta * B33 + this.b * this.c * this.cosGamma * B23 + this.a * this.c * this.cB_ * B13;
Bcart[5] = 2 * this.c * this.c * this.cA_ * this.cB_ * B33 + this.b * this.c * this.cB_ * this.sinGamma * B23;
}return t.setFromThermalEquation (Bcart, J.util.Escape.eAF (parBorU));
}, "~A");
$_M(c$, "getCanonicalCopy", 
function (scale) {
var pts =  new Array (8);
for (var i = 0; i < 8; i++) {
pts[i] = JU.P3.newP (J.util.BoxInfo.unitCubePoints[i]);
this.matrixFractionalToCartesian.transform (pts[i]);
}
return J.util.BoxInfo.getCanonicalCopy (pts, scale);
}, "~N");
c$.toFractionalX = $_M(c$, "toFractionalX", 
function (x) {
x = (x - Math.floor (x));
if (x > 0.9999 || x < 0.0001) x = 0;
return x;
}, "~N");
$_M(c$, "calcUnitcellVertices", 
function () {
if (this.matrixFractionalToCartesian == null) return;
this.matrixCtoFAbsolute = JU.M4.newM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute = JU.M4.newM (this.matrixFractionalToCartesian);
this.vertices =  new Array (8);
for (var i = 8; --i >= 0; ) {
this.vertices[i] =  new JU.P3 ();
this.matrixFractionalToCartesian.transform2 (J.util.BoxInfo.unitCubePoints[i], this.vertices[i]);
}
});
$_M(c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
var p1 = JU.P3.newP (f1);
this.toCartesian (p1, true);
for (var i = -iRange; i <= iRange; i++) for (var j = -jRange; j <= jRange; j++) for (var k = -kRange; k <= kRange; k++) {
ptOffset.set (f2.x + i, f2.y + j, f2.z + k);
this.toCartesian (ptOffset, true);
var d = p1.distance (ptOffset);
if (dx > 0 ? Math.abs (d - distance) <= dx : d <= distance && d > 0.1) {
ptOffset.set (i, j, k);
return true;
}}


return false;
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N,JU.P3");
$_M(c$, "getUnitCellMultiplier", 
function () {
return this.unitCellMultiplier;
});
$_M(c$, "getUnitCellVectors", 
function () {
var m = this.matrixFractionalToCartesian;
return [JU.P3.newP (this.cartesianOffset), JU.P3.new3 (m.m00, m.m10, m.m20), JU.P3.new3 (m.m01, m.m11, m.m21), JU.P3.new3 (m.m02, m.m12, m.m22)];
});
$_M(c$, "isSameAs", 
function (uc) {
if (uc.notionalUnitcell.length != this.notionalUnitcell.length) return false;
for (var i = this.notionalUnitcell.length; --i >= 0; ) if (this.notionalUnitcell[i] != uc.notionalUnitcell[i] && !(Float.isNaN (this.notionalUnitcell[i]) && Float.isNaN (uc.notionalUnitcell[i]))) return false;

if (this.fractionalOffset == null) return (uc.fractionalOffset == null);
if (uc.fractionalOffset == null) return false;
if (this.fractionalOffset.distanceSquared (uc.fractionalOffset) != 0) return false;
return true;
}, "J.symmetry.UnitCell");
Clazz_defineStatics (c$,
"twoP2", 19.739208802178716);
c$.unitVectors = c$.prototype.unitVectors = [J.viewer.JC.axisX, J.viewer.JC.axisY, J.viewer.JC.axisZ];
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
