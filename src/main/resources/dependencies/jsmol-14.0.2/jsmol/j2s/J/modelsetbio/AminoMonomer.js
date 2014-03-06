Clazz.declarePackage ("J.modelsetbio");
Clazz.load (["J.modelsetbio.AlphaMonomer"], "J.modelsetbio.AminoMonomer", ["JU.A4", "$.M3", "$.P3", "$.V3", "J.constant.EnumStructure", "J.util.Escape", "$.Logger", "$.Quaternion", "$.Txt"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nhChecked = false;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, J.modelsetbio, "AminoMonomer", J.modelsetbio.AlphaMonomer);
Clazz.overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = $_M(c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var offsets = J.modelsetbio.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, J.modelsetbio.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
J.modelsetbio.Monomer.checkOptional (offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero () && !J.modelsetbio.AminoMonomer.isBondedCorrectly (firstAtomIndex, offsets, atoms)) return null;
return  new J.modelsetbio.AminoMonomer ().set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "J.modelset.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = $_M(c$, "isBondedCorrectlyRange", 
($fz = function (offset1, offset2, firstAtomIndex, offsets, atoms) {
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded (atoms[atomIndex2]));
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = $_M(c$, "isBondedCorrectly", 
($fz = function (firstAtomIndex, offsets, atoms) {
return (J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (2, 0, firstAtomIndex, offsets, atoms) && J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (0, 3, firstAtomIndex, offsets, atoms) && (!J.modelsetbio.Monomer.have (offsets, 1) || J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (3, 1, firstAtomIndex, offsets, atoms)));
}, $fz.isPrivate = true, $fz), "~N,~A,~A");
$_M(c$, "isAminoMonomer", 
function () {
return true;
});
$_V(c$, "getNitrogenAtom", 
function () {
return this.getAtomFromOffsetIndex (2);
});
$_M(c$, "getCarbonylCarbonAtom", 
function () {
return this.getAtomFromOffsetIndex (3);
});
$_V(c$, "getCarbonylOxygenAtom", 
function () {
return this.getWingAtom ();
});
$_V(c$, "getInitiatorAtom", 
function () {
return this.getNitrogenAtom ();
});
$_V(c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (J.modelsetbio.Monomer.have (this.offsets, 4) ? 4 : 3);
});
$_M(c$, "hasOAtom", 
function () {
return J.modelsetbio.Monomer.have (this.offsets, 1);
});
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom ().isBonded (this.getNitrogenAtom ());
}, "J.modelsetbio.Monomer");
$_V(c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom ();
var marBegin = (Clazz.doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.sZ == 0) return;
var radiusBegin = Clazz.floatToInt (this.scaleToScreen (nitrogen.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom ();
var marEnd = (Clazz.doubleToInt (madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = Clazz.floatToInt (this.scaleToScreen (nitrogen.sZ, marEnd));
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom ();
if (this.isCursorOnTopOf (alpha, x, y, Clazz.doubleToInt ((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf (nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf (ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
$_M(c$, "resetHydrogenPoint", 
function () {
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
$_M(c$, "getNitrogenHydrogenPoint", 
function () {
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH ();
}return this.nitrogenHydrogenPoint;
});
$_M(c$, "getExplicitNH", 
function () {
var nitrogen = this.getNitrogenAtom ();
var h = null;
var bonds = nitrogen.getBonds ();
if (bonds == null) return null;
for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom (nitrogen)).getElementNumber () == 1) return h;

return null;
});
$_M(c$, "getNHPoint", 
function (aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens) {
if (this.monomerIndex == 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom ();
var nhPoint = this.getNitrogenHydrogenPoint ();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2 (nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT (nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2 (nitrogenPoint, this.getLeadAtom ());
vNH.normalize ();
var v = JU.V3.newVsub (nitrogenPoint, prev.getCarbonylCarbonAtom ());
v.normalize ();
vNH.add (v);
} else {
var oxygen = prev.getCarbonylOxygenAtom ();
if (oxygen == null) return false;
vNH.sub2 (prev.getCarbonylCarbonAtom (), oxygen);
}vNH.normalize ();
aminoHydrogenPoint.add2 (nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = JU.P3.newP (aminoHydrogenPoint);
if (J.util.Logger.debugging) J.util.Logger.debug ("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.index + "\" " + J.util.Escape.eP (nitrogenPoint) + J.util.Escape.eP (aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "JU.P3,JU.V3,~B,~B");
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
default:
case 'a':
case 'b':
case 'c':
case 'C':
return this.getQuaternionFrameCenterAlpha (qType);
case 'n':
return this.getNitrogenAtom ();
case 'p':
case 'P':
return this.getCarbonylCarbonAtom ();
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
var pt =  new JU.P3 ();
pt.ave (this.getCarbonylCarbonAtom (), mNext.getNitrogenAtom ());
return pt;
}
}, "~S");
$_V(c$, "getQuaternion", 
function (qType) {
var ptC = this.getCarbonylCarbonAtom ();
var ptCa = this.getLeadAtom ();
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
case 'a':
case 'n':
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new JU.V3 ();
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
this.getNHPoint (this.ptTemp, vC, true, false);
vB.sub2 (ptCa, this.getNitrogenAtom ());
vB.cross (vC, vB);
var mat =  new JU.M3 ();
mat.setAA (JU.A4.newVA (vB, -0.29670596));
mat.transform (vC);
vA.cross (vB, vC);
break;
case 'b':
return this.getQuaternionAlpha ('b');
case 'c':
vA.sub2 (ptC, ptCa);
vB.sub2 (this.getNitrogenAtom (), ptCa);
break;
case 'p':
case 'x':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2 (ptCa, ptC);
vB.sub2 ((this.bioPolymer.getGroups ()[this.monomerIndex + 1]).getNitrogenAtom (), ptC);
break;
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
vB.sub2 (mNext.getLeadAtom (), mNext.getNitrogenAtom ());
vA.sub2 (ptCa, ptC);
break;
default:
return null;
}
return J.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
$_V(c$, "getStructureId", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
$_V(c$, "getProteinStructureTag", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = J.util.Txt.formatStringI (tag, "N", this.proteinStructure.serialID);
tag = J.util.Txt.formatStringS (tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === J.constant.EnumStructure.SHEET) tag += J.util.Txt.formatStringI ("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz.defineStatics (c$,
"CA", 0,
"O", 1,
"N", 2,
"C", 3,
"OT", 4,
"interestingAminoAtomIDs", [2, -5, 1, 3, -65],
"beta", (0.29670597283903605));
});
