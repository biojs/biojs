Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.Shape", "JU.P3i"], "J.shape.Sticks", ["java.util.Hashtable", "JU.BS", "$.P3", "J.constant.EnumPalette", "J.util.BSUtil", "$.C", "$.Escape", "$.JmolEdge"], function () {
c$ = Clazz.decorateAsClass (function () {
this.myMask = 0;
this.reportAll = false;
this.bsOrderSet = null;
this.selectedBonds = null;
this.ptXY = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Sticks", J.shape.Shape);
Clazz.prepareFields (c$, function () {
this.ptXY =  new JU.P3i ();
});
$_M(c$, "initShape", 
function () {
Clazz.superCall (this, J.shape.Sticks, "initShape", []);
this.myMask = 1023;
this.reportAll = false;
});
$_V(c$, "setSize", 
function (size, bsSelected) {
if (size == 2147483647) {
this.selectedBonds = J.util.BSUtil.copy (bsSelected);
return;
}if (size == -2147483648) {
if (this.bsOrderSet == null) this.bsOrderSet =  new JU.BS ();
this.bsOrderSet.or (bsSelected);
return;
}if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var iter = (this.selectedBonds != null ? this.modelSet.getBondIterator (this.selectedBonds) : this.modelSet.getBondIteratorForType (this.myMask, bsSelected));
var mad = size;
while (iter.hasNext ()) {
this.bsSizeSet.set (iter.nextIndex ());
iter.next ().setMad (mad);
}
}, "~N,JU.BS");
$_V(c$, "setProperty", 
function (propertyName, value, bs) {
if ("type" === propertyName) {
this.myMask = (value).intValue ();
return;
}if ("reportAll" === propertyName) {
this.reportAll = true;
return;
}if ("reset" === propertyName) {
this.bsOrderSet = null;
this.bsSizeSet = null;
this.bsColixSet = null;
this.selectedBonds = null;
return;
}if ("bondOrder" === propertyName) {
if (this.bsOrderSet == null) this.bsOrderSet =  new JU.BS ();
var order = (value).shortValue ();
var iter = (this.selectedBonds != null ? this.modelSet.getBondIterator (this.selectedBonds) : this.modelSet.getBondIteratorForType (65535, bs));
while (iter.hasNext ()) {
this.bsOrderSet.set (iter.nextIndex ());
iter.next ().setOrder (order);
}
return;
}if ("color" === propertyName) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var colix = J.util.C.getColixO (value);
var pal = (Clazz.instanceOf (value, J.constant.EnumPalette) ? value : null);
if (pal === J.constant.EnumPalette.TYPE || pal === J.constant.EnumPalette.ENERGY) {
var isEnergy = (pal === J.constant.EnumPalette.ENERGY);
var iter = (this.selectedBonds != null ? this.modelSet.getBondIterator (this.selectedBonds) : this.modelSet.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
this.bsColixSet.set (iter.nextIndex ());
var bond = iter.next ();
if (isEnergy) {
bond.setColix (this.getColixB (colix, pal.id, bond));
bond.setPaletteID (pal.id);
} else {
bond.setColix (J.util.C.getColix (J.util.JmolEdge.getArgbHbondType (bond.order)));
}}
return;
}if (colix == 2 && pal !== J.constant.EnumPalette.CPK) return;
var iter = (this.selectedBonds != null ? this.modelSet.getBondIterator (this.selectedBonds) : this.modelSet.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
var iBond = iter.nextIndex ();
var bond = iter.next ();
bond.setColix (colix);
this.bsColixSet.setBitTo (iBond, (colix != 0 && colix != 2));
}
return;
}if ("translucency" === propertyName) {
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var isTranslucent = ((value).equals ("translucent"));
var iter = (this.selectedBonds != null ? this.modelSet.getBondIterator (this.selectedBonds) : this.modelSet.getBondIteratorForType (this.myMask, bs));
while (iter.hasNext ()) {
this.bsColixSet.set (iter.nextIndex ());
iter.next ().setTranslucent (isTranslucent, this.translucentLevel);
}
return;
}if ("deleteModelAtoms" === propertyName) {
return;
}this.setPropS (propertyName, value, bs);
}, "~S,~O,JU.BS");
$_V(c$, "getProperty", 
function (property, index) {
if (property.equals ("selectionState")) return (this.selectedBonds != null ? "select BONDS " + J.util.Escape.eBS (this.selectedBonds) + "\n" : "");
if (property.equals ("sets")) return [this.bsOrderSet, this.bsSizeSet, this.bsColixSet];
return null;
}, "~S,~N");
$_V(c$, "setModelClickability", 
function () {
var bonds = this.modelSet.bonds;
for (var i = this.modelSet.bondCount; --i >= 0; ) {
var bond = bonds[i];
if ((bond.getShapeVisibilityFlags () & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (bond.getAtomIndex1 ()) || this.modelSet.isAtomHidden (bond.getAtomIndex2 ())) continue;
bond.getAtom1 ().setClickable (this.myVisibilityFlag);
bond.getAtom2 ().setClickable (this.myVisibilityFlag);
}
});
$_V(c$, "getShapeState", 
function () {
return this.viewer.getBondState (this, this.bsOrderSet, this.reportAll);
});
$_V(c$, "checkObjectHovered", 
function (x, y, bsVisible) {
var pt =  new JU.P3 ();
var bond = this.findPickedBond (x, y, bsVisible, pt);
if (bond == null) return false;
this.viewer.highlightBond (bond.index, true);
return true;
}, "~N,~N,JU.BS");
$_V(c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
var pt =  new JU.P3 ();
var bond = this.findPickedBond (x, y, bsVisible, pt);
if (bond == null) return null;
var modelIndex = bond.getAtom1 ().modelIndex;
var info = bond.getIdentity ();
var map =  new java.util.Hashtable ();
map.put ("pt", pt);
map.put ("index", Integer.$valueOf (bond.index));
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.viewer.getModelNumberDotted (modelIndex));
map.put ("type", "bond");
map.put ("info", info);
this.viewer.setStatusAtomPicked (-3, "[\"bond\",\"" + bond.getIdentity () + "\"," + pt.x + "," + pt.y + "," + pt.z + "]");
return map;
}, "~N,~N,~N,JU.BS,~B");
$_M(c$, "findPickedBond", 
($fz = function (x, y, bsVisible, pt) {
var dmin2 = 100;
if (this.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var pickedBond = null;
var v =  new JU.P3 ();
var bonds = this.modelSet.bonds;
for (var i = this.modelSet.bondCount; --i >= 0; ) {
var bond = bonds[i];
if (bond.getShapeVisibilityFlags () == 0) continue;
var atom1 = bond.getAtom1 ();
var atom2 = bond.getAtom2 ();
if (!atom1.isVisible (0) || !atom2.isVisible (0)) continue;
v.ave (atom1, atom2);
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
var f = 1 * (this.ptXY.x - atom1.sX) / (atom2.sX - atom1.sX);
if (f < 0.4 || f > 0.6) continue;
dmin2 = d2;
pickedBond = bond;
pt.setT (v);
}}
return pickedBond;
}, $fz.isPrivate = true, $fz), "~N,~N,JU.BS,JU.P3");
Clazz.defineStatics (c$,
"MAX_BOND_CLICK_DISTANCE_SQUARED", 100);
});
