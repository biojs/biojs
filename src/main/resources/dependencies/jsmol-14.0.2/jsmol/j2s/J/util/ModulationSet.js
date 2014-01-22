Clazz.declarePackage ("J.util");
Clazz.load (["J.api.JmolModulationSet", "J.util.Vibration", "JU.P3"], "J.util.ModulationSet", ["java.lang.Float", "java.util.Hashtable", "JU.List", "$.M3", "$.V3", "J.util.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vOcc = NaN;
this.htUij = null;
this.vOcc0 = 0;
this.id = null;
this.x456 = null;
this.mods = null;
this.gammaE = null;
this.qtOffset = null;
this.modDim = 0;
this.enabled = false;
this.r0 = null;
this.modTemp = null;
this.iop = 0;
this.gammaIinv = null;
this.q123w = null;
this.sI = null;
this.$scale = 1;
this.tinv = null;
this.unitCell = null;
this.isQ = false;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, J.util, "ModulationSet", J.util.Vibration, J.api.JmolModulationSet);
Clazz.prepareFields (c$, function () {
this.qtOffset =  new JU.P3 ();
this.tinv =  new JU.P3 ();
this.ptTemp =  new JU.P3 ();
});
$_V(c$, "getScale", 
function () {
return this.$scale;
});
$_V(c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.util.ModulationSet, []);
});
$_M(c$, "set", 
function (id, r, modDim, mods, gammaE, gammaIS, q123w, iop) {
this.id = id;
this.modDim = modDim;
this.mods = mods;
this.gammaE = gammaE;
this.iop = iop;
this.gammaIinv =  new JU.M3 ();
gammaIS.getRotationScale (this.gammaIinv);
this.sI =  new JU.V3 ();
gammaIS.get (this.sI);
this.gammaIinv.invert ();
this.q123w = q123w;
this.r0 = JU.P3.newP (r);
this.x456 = JU.V3.newV (this.r0);
q123w.transform (this.x456);
this.x456.sub (this.sI);
this.gammaIinv.transform (this.x456);
if (J.util.Logger.debuggingHigh) J.util.Logger.debug ("MODSET create r=" + J.util.Escape.eP (r) + " si=" + J.util.Escape.eP (this.sI) + " ginv=" + this.gammaIinv.toString ().$replace ('\n', ' ') + " x4=" + this.x456.x);
return this;
}, "~S,JU.P3,~N,JU.List,JU.M3,JU.M4,JU.M4,~N");
$_M(c$, "calculate", 
function (fracT, isQ) {
this.x = this.y = this.z = 0;
this.htUij = null;
this.vOcc = NaN;
this.tinv.set (0, 0, 0);
if (isQ && this.qtOffset != null) {
this.tinv.setT (this.qtOffset);
this.q123w.transform (this.tinv);
}if (fracT != null) this.tinv.add (fracT);
this.gammaIinv.transform (this.tinv);
this.tinv.add (this.x456);
for (var i = this.mods.size (); --i >= 0; ) this.mods.get (i).apply (this, this.tinv);

this.gammaE.transform (this);
return this;
}, "JU.T3,~B");
$_M(c$, "addUTens", 
function (utens, v) {
if (this.htUij == null) this.htUij =  new java.util.Hashtable ();
var f = this.htUij.get (utens);
if (J.util.Logger.debuggingHigh) J.util.Logger.debug ("MODSET " + this.id + " utens=" + utens + " f=" + f + " v=" + v);
if (f != null) v += f.floatValue ();
this.htUij.put (utens, Float.$valueOf (v));
}, "~S,~N");
$_V(c$, "setModTQ", 
function (a, isOn, qtOffset, isQ, scale, uc) {
if (this.enabled) this.addTo (a, -1);
this.enabled = false;
this.$scale = scale;
this.unitCell = uc;
if (qtOffset != null) {
if (isQ) {
this.isQ = isQ;
this.qtOffset.setT (qtOffset);
qtOffset = null;
}this.calculate (qtOffset, isQ);
}if (isOn) {
this.addTo (a, 1);
this.enabled = true;
}}, "JU.T3,~B,JU.T3,~B,~N,J.api.SymmetryInterface");
$_V(c$, "addTo", 
function (a, scale) {
this.ptTemp.setT (this);
this.ptTemp.scale (this.$scale * scale);
this.unitCell.toCartesian (this.ptTemp, true);
a.add (this.ptTemp);
}, "JU.T3,~N");
$_V(c$, "getState", 
function () {
return "modulation " + (!this.enabled ? "OFF" : this.qtOffset == null ? "ON" : J.util.Escape.eP (this.qtOffset) + " " + this.isQ);
});
$_V(c$, "getModulation", 
function (type, t456) {
this.getModTemp ();
if (type.equals ("D")) {
return JU.P3.newP (t456 == null ? this.r0 : this.modTemp.calculate (t456, false));
}return null;
}, "~S,JU.T3");
$_V(c$, "setTempPoint", 
function (a, t456, vibScale, scale) {
if (!this.enabled) return;
this.getModTemp ();
this.addTo (a, -1);
this.modTemp.calculate (t456, false).addTo (a, scale);
}, "JU.T3,JU.T3,~N,~N");
$_M(c$, "getModTemp", 
($fz = function () {
if (this.modTemp != null) return;
this.modTemp =  new J.util.ModulationSet ();
this.modTemp.id = this.id;
this.modTemp.x456 = this.x456;
this.modTemp.mods = this.mods;
this.modTemp.gammaE = this.gammaE;
this.modTemp.modDim = this.modDim;
this.modTemp.gammaIinv = this.gammaIinv;
this.modTemp.q123w = this.q123w;
this.modTemp.r0 = this.r0;
this.modTemp.unitCell = this.unitCell;
}, $fz.isPrivate = true, $fz));
$_V(c$, "getInfo", 
function (info) {
var modInfo =  new java.util.Hashtable ();
modInfo.put ("id", this.id);
modInfo.put ("r0", this.r0);
modInfo.put ("x456", this.x456);
modInfo.put ("modDim", Integer.$valueOf (this.modDim));
modInfo.put ("gammaE", this.gammaE);
modInfo.put ("gammaIinv", this.gammaIinv);
modInfo.put ("sI", this.sI);
modInfo.put ("q123w", this.q123w);
modInfo.put ("symop", Integer.$valueOf (this.iop + 1));
var mInfo =  new JU.List ();
for (var i = 0; i < this.mods.size (); i++) mInfo.addLast (this.mods.get (i).getInfo ());

modInfo.put ("mods", mInfo);
info.put ("modulation", modInfo);
}, "java.util.Map");
});
