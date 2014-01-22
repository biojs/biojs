Clazz.declarePackage ("J.symmetry");
Clazz.load (["J.api.SymmetryInterface"], "J.symmetry.Symmetry", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.P3", "$.SB", "J.modelset.Atom", "J.symmetry.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "J.util.Escape", "$.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pointGroup = null;
this.spaceGroup = null;
this.symmetryInfo = null;
this.unitCell = null;
this.$isBio = false;
Clazz.instantialize (this, arguments);
}, J.symmetry, "Symmetry", null, J.api.SymmetryInterface);
Clazz.makeConstructor (c$, 
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
if (modelIndex <= 0) modelIndex = (Clazz.instanceOf (pt1, J.modelset.Atom) ? (pt1).modelIndex : modelSet.viewer.getCurrentModelIndex ());
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
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "J.modelset.ModelSet,JU.BS,~A");
$_M(c$, "isNotCentroid", 
($fz = function (center, n, minmax, centroidPacked) {
center.scale (1 / n);
this.toFractional (center, false);
if (centroidPacked) return (center.x + 0.000005 <= minmax[0] || center.x - 0.000005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y - 0.000005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z - 0.000005 > minmax[5]);
return (center.x + 0.000005 <= minmax[0] || center.x + 0.00005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y + 0.00005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z + 0.00005 > minmax[5]);
}, $fz.isPrivate = true, $fz), "JU.P3,~N,~A,~B");
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
