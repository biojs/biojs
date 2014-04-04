Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.smarter.MSInterface"], "J.adapter.readers.cif.MSReader", ["java.lang.Float", "java.util.Hashtable", "JU.List", "$.M3", "$.M4", "$.P3", "$.SB", "$.V3", "J.util.Escape", "$.Logger", "$.Modulation", "$.ModulationSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cr = null;
this.modVib = false;
this.modAxes = null;
this.modAverage = false;
this.modType = null;
this.modDebug = false;
this.modSelected = -1;
this.modLast = false;
this.modDim = 0;
this.q1 = null;
this.q1Norm = null;
this.htModulation = null;
this.htAtomMods = null;
this.htSubsystems = null;
this.atModel = "@0";
this.q123 = null;
this.haveOccupancy = false;
this.atoms = null;
this.atomCount = 0;
this.qs = null;
this.modCount = 0;
this.iopLast = -1;
this.gammaE = null;
this.gammaIS = null;
this.nOps = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MSReader", null, J.adapter.smarter.MSInterface);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "initialize", 
function (r, data) {
this.cr = r;
this.modDebug = r.checkFilterKey ("MODDEBUG");
this.modLast = r.checkFilterKey ("MODLAST");
this.modAxes = r.getFilter ("MODAXES=");
this.modType = r.getFilter ("MODTYPE=");
this.modSelected = r.parseIntStr ("" + r.getFilter ("MOD="));
this.modVib = r.checkFilterKey ("MODVIB");
this.modAverage = r.checkFilterKey ("MODAVE");
this.setModDim (r.parseIntStr (data));
return this.modDim;
}, "J.adapter.smarter.AtomSetCollectionReader,~S");
$_M(c$, "setModDim", 
function (ndim) {
if (this.modAverage) return;
this.modDim = ndim;
if (this.modDim > 3) {
this.cr.appendLoadNote ("Too high modulation dimension (" + this.modDim + ") -- reading average structure");
this.modDim = 0;
this.modAverage = true;
} else {
this.cr.appendLoadNote ("Modulation dimension = " + this.modDim);
this.htModulation =  new java.util.Hashtable ();
}}, "~N");
$_V(c$, "addModulation", 
function (map, id, pt, iModel) {
var ch = id.charAt (0);
switch (ch) {
case 'O':
case 'D':
case 'U':
if (this.modType != null && this.modType.indexOf (ch) < 0 || this.modSelected > 0 && this.modSelected != 1) return;
break;
}
if (this.modSelected > 0 && id.contains ("_q_")) switch (this.modSelected) {
case 1:
pt.y = pt.z = 0;
break;
case 2:
pt.x = pt.z = 0;
break;
case 3:
pt.x = pt.y = 0;
break;
}
if (pt.x == 0 && pt.y == 0 && pt.z == 0) return;
if (map == null) map = this.htModulation;
id += "@" + (iModel >= 0 ? iModel : this.cr.atomSetCollection.getCurrentAtomSetIndex ());
J.util.Logger.info ("Adding " + id + " " + pt);
map.put (id, pt);
}, "java.util.Map,~S,JU.P3,~N");
$_V(c$, "setModulation", 
function () {
if (this.modDim == 0 || this.htModulation == null) return;
if (this.modDebug) J.util.Logger.debugging = J.util.Logger.debuggingHigh = true;
this.setModulationForStructure (this.cr.atomSetCollection.getCurrentAtomSetIndex ());
if (this.modDebug) J.util.Logger.debugging = J.util.Logger.debuggingHigh = false;
});
$_V(c$, "finalizeModulation", 
function () {
if (this.modDim > 0 && !this.modVib) this.cr.addJmolScript ("modulation on" + (this.haveOccupancy ? ";display occupancy > 0.5" : ""));
});
$_M(c$, "checkKey", 
($fz = function (key, checkQ) {
var pt = key.indexOf (this.atModel);
return (pt < 0 || key.indexOf ("*;*") >= 0 || checkQ && key.indexOf ("?") >= 0 ? null : key.substring (0, pt));
}, $fz.isPrivate = true, $fz), "~S,~B");
$_V(c$, "getMod", 
function (key) {
return this.htModulation.get (key + this.atModel);
}, "~S");
$_M(c$, "setModulationForStructure", 
($fz = function (iModel) {
this.atModel = "@" + iModel;
var key;
if (this.htModulation.containsKey ("X_" + this.atModel)) return;
this.htModulation.put ("X_" + this.atModel,  new JU.P3 ());
this.q123 =  new JU.M3 ();
this.qs = null;
for (var i = 0; i < this.modDim; i++) {
var pt = this.getMod ("W_" + (i + 1));
if (pt == null) {
J.util.Logger.info ("Not enough cell wave vectors for d=" + this.modDim);
return;
}this.cr.appendLoadNote ("W_" + (i + 1) + " = " + pt);
if (i == 0) this.q1 = JU.P3.newP (pt);
this.q123.setRowV (i, pt);
}
this.q1Norm = JU.V3.new3 (this.q1.x == 0 ? 0 : 1, this.q1.y == 0 ? 0 : 1, this.q1.z == 0 ? 0 : 1);
var qlist100 = JU.P3.new3 (1, 0, 0);
var pt;
var n = this.cr.atomSetCollection.getAtomCount ();
var map =  new java.util.Hashtable ();
for (var e, $e = this.htModulation.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if ((key = this.checkKey (e.getKey (), false)) == null) continue;
pt = e.getValue ();
switch (key.charAt (0)) {
case 'O':
this.haveOccupancy = true;
case 'U':
case 'D':
if (pt.z == 1 && key.charAt (2) != 'S') {
var ipt = key.indexOf ("?");
if (ipt >= 0) {
var s = key.substring (ipt + 1);
pt = this.getMod (key.substring (0, 2) + s + "#*;*");
if (pt != null) this.addModulation (map, key = key.substring (0, ipt), pt, iModel);
} else {
var a = pt.x;
var d = 2 * 3.141592653589793 * pt.y;
pt.x = (a * Math.cos (d));
pt.y = (a * Math.sin (-d));
pt.z = 0;
J.util.Logger.info ("msCIF setting " + key + " " + pt);
}}break;
case 'W':
if (this.modDim > 1) {
continue;
}case 'F':
if (key.indexOf ("_q_") >= 0) {
this.cr.appendLoadNote ("Wave vector " + key + "=" + pt);
} else {
var ptHarmonic = this.getQCoefs (pt);
if (ptHarmonic == null) {
this.cr.appendLoadNote ("Cannot match atom wave vector " + key + " " + pt + " to a cell wave vector or its harmonic");
} else {
var k2 = key + "_q_";
if (!this.htModulation.containsKey (k2 + this.atModel)) {
this.addModulation (map, k2, ptHarmonic, iModel);
if (key.startsWith ("F_")) this.cr.appendLoadNote ("atom wave vector " + key + " = " + pt + " fn = " + ptHarmonic);
}}}break;
}
}
if (!map.isEmpty ()) this.htModulation.putAll (map);
var haveAtomMods = false;
for (var e, $e = this.htModulation.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if ((key = this.checkKey (e.getKey (), true)) == null) continue;
var params = e.getValue ();
var atomName = key.substring (key.indexOf (";") + 1);
var pt_ = atomName.indexOf ("#=");
if (pt_ >= 0) {
params = this.getMod (atomName.substring (pt_ + 2));
atomName = atomName.substring (0, pt_);
}if (J.util.Logger.debuggingHigh) J.util.Logger.debug ("SetModulation: " + key + " " + params);
var type = key.charAt (0);
pt_ = key.indexOf ("#") + 1;
var utens = null;
switch (type) {
case 'U':
utens = key.substring (4, key.indexOf (";"));
case 'O':
case 'D':
var id = key.charAt (2);
var axis = key.charAt (pt_);
type = (id == 'S' ? 's' : id == '0' ? 'c' : type == 'O' ? 'o' : type == 'U' ? 'u' : 'f');
if (this.htAtomMods == null) this.htAtomMods =  new java.util.Hashtable ();
var fn = (id == 'S' ? 0 : this.cr.parseIntStr (key.substring (2)));
if (fn == 0) {
this.addAtomModulation (atomName, axis, type, params, utens, qlist100);
} else {
var qlist = this.getMod ("F_" + fn + "_q_");
if (qlist == null) {
J.util.Logger.error ("Missing qlist for F_" + fn);
this.cr.appendLoadNote ("Missing cell wave vector for atom wave vector " + fn + " for " + key + " " + params);
} else {
this.addAtomModulation (atomName, axis, type, params, utens, qlist);
}}haveAtomMods = true;
break;
}
}
if (!haveAtomMods) return;
this.atoms = this.cr.atomSetCollection.getAtoms ();
this.cr.symmetry = this.cr.atomSetCollection.getSymmetry ();
if (this.cr.symmetry != null) this.nOps = this.cr.symmetry.getSpaceGroupOperationCount ();
this.iopLast = -1;
var sb =  new JU.SB ();
for (var i = this.cr.atomSetCollection.getLastAtomSetAtomIndex (); i < n; i++) this.modulateAtom (this.atoms[i], sb);

this.cr.atomSetCollection.setAtomSetAtomProperty ("modt", sb.toString (), -1);
this.cr.appendLoadNote (this.modCount + " modulations for " + this.atomCount + " atoms");
this.htAtomMods = null;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getQCoefs", 
($fz = function (p) {
if (this.qs == null) {
this.qs =  new Array (3);
for (var i = 0; i < 3; i++) this.qs[i] = this.getMod ("W_" + (i + 1));

}var pt =  new JU.P3 ();
for (var i = 0; i < 3; i++) if (this.qs[i] != null) {
var fn = p.dot (this.qs[i]) / this.qs[i].dot (this.qs[i]);
var ifn = Math.round (fn);
if (Math.abs (fn - ifn) < 0.001) {
switch (i) {
case 0:
pt.x = ifn;
break;
case 1:
pt.y = ifn;
break;
case 2:
pt.z = ifn;
break;
}
return pt;
}}
var jmin = (this.modDim < 2 ? 0 : -3);
var jmax = (this.modDim < 2 ? 0 : 3);
var kmin = (this.modDim < 3 ? 0 : -3);
var kmax = (this.modDim < 3 ? 0 : 3);
for (var i = -3; i <= 3; i++) for (var j = jmin; j <= jmax; j++) for (var k = kmin; k <= kmax; k++) {
pt.setT (this.qs[0]);
pt.scale (i);
if (this.qs[1] != null) pt.scaleAdd2 (j, this.qs[1], pt);
if (this.qs[2] != null) pt.scaleAdd2 (k, this.qs[2], pt);
if (pt.distanceSquared (p) < 0.0001) {
pt.set (i, j, 0);
return pt;
}}


return null;
}, $fz.isPrivate = true, $fz), "JU.P3");
$_M(c$, "addAtomModulation", 
($fz = function (atomName, axis, type, params, utens, qcoefs) {
var list = this.htAtomMods.get (atomName);
if (list == null) {
this.atomCount++;
this.htAtomMods.put (atomName, list =  new JU.List ());
}list.addLast ( new J.util.Modulation (axis, type, params, utens, qcoefs));
this.modCount++;
}, $fz.isPrivate = true, $fz), "~S,~S,~S,JU.P3,~S,JU.P3");
$_M(c$, "setSubsystemMatrix", 
($fz = function (atomName, q123w) {
var o;
if (true || this.htSubsystems == null || (o = this.htSubsystems.get (";" + atomName)) == null) return;
var subcode = o;
var wmatrix = this.htSubsystems.get (subcode);
q123w.mulM4 (wmatrix);
}, $fz.isPrivate = true, $fz), "~S,JU.M4");
$_V(c$, "addSubsystem", 
function (code, m4, atomName) {
if (this.htSubsystems == null) this.htSubsystems =  new java.util.Hashtable ();
if (m4 == null) this.htSubsystems.put (";" + atomName, code);
 else this.htSubsystems.put (code, m4);
}, "~S,JU.M4,~S");
$_M(c$, "addUStr", 
($fz = function (atom, id, val) {
var i = Clazz.doubleToInt ("U11U22U33U12U13U23UISO".indexOf (id) / 3);
if (J.util.Logger.debuggingHigh) J.util.Logger.debug ("MOD RDR adding " + id + " " + i + " " + val + " to " + atom.anisoBorU[i]);
if (atom.anisoBorU == null) J.util.Logger.error ("MOD RDR cannot modulate nonexistent atom anisoBorU for atom " + atom.atomName);
 else this.cr.setU (atom, i, val + atom.anisoBorU[i]);
}, $fz.isPrivate = true, $fz), "J.adapter.smarter.Atom,~S,~N");
$_M(c$, "modulateAtom", 
function (a, sb) {
var list = this.htAtomMods.get (a.atomName);
if (list == null || this.cr.symmetry == null || a.bsSymmetry == null) return;
var iop = Math.max (a.bsSymmetry.nextSetBit (0), 0);
if (this.modLast) iop = Math.max ((a.bsSymmetry.length () - 1) % this.nOps, iop);
System.out.println (a.index + " " + a.atomName + " " + iop + " " + a.bsSymmetry);
if (J.util.Logger.debuggingHigh) J.util.Logger.debug ("\nsetModulation: i=" + a.index + " " + a.atomName + " xyz=" + a + " occ=" + a.foccupancy);
if (iop != this.iopLast) {
this.iopLast = iop;
this.gammaE =  new JU.M3 ();
this.cr.symmetry.getSpaceGroupOperation (iop).getRotationScale (this.gammaE);
this.gammaIS = this.cr.symmetry.getOperationGammaIS (iop);
}if (J.util.Logger.debugging) {
J.util.Logger.debug ("setModulation iop = " + iop + " " + this.cr.symmetry.getSpaceGroupXyz (iop, false) + " " + a.bsSymmetry);
}var q123w = JU.M4.newMV (this.q123,  new JU.V3 ());
this.setSubsystemMatrix (a.atomName, q123w);
var ms =  new J.util.ModulationSet ().set (a.index + " " + a.atomName, JU.P3.newP (a), this.modDim, list, this.gammaE, this.gammaIS, q123w, iop);
ms.calculate (null, false);
if (!Float.isNaN (ms.vOcc)) {
var pt = this.getMod ("J_O#0;" + a.atomName);
var occ0 = ms.vOcc0;
var occ;
if (Float.isNaN (occ0)) {
occ = ms.vOcc;
} else if (pt == null) {
occ = a.foccupancy + ms.vOcc;
} else if (a.vib != null) {
var site_mult = a.vib.x;
var o_site = a.foccupancy * site_mult / this.nOps / pt.y;
occ = o_site * (pt.y + ms.vOcc);
} else {
occ = pt.x * (pt.y + ms.vOcc);
}a.foccupancy = Math.min (1, Math.max (0, occ));
}if (ms.htUij != null) {
if (J.util.Logger.debuggingHigh) {
J.util.Logger.debug ("setModulation Uij(initial)=" + J.util.Escape.eAF (a.anisoBorU));
J.util.Logger.debug ("setModulation tensor=" + J.util.Escape.e ((a.tensors.get (0)).getInfo ("all")));
}for (var e, $e = ms.htUij.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.addUStr (a, e.getKey (), e.getValue ().floatValue ());

if (a.tensors != null) (a.tensors.get (0)).isUnmodulated = true;
var t = this.cr.atomSetCollection.addRotatedTensor (a, this.cr.symmetry.getTensor (a.anisoBorU), iop, false);
t.isModulated = true;
if (J.util.Logger.debuggingHigh) {
J.util.Logger.debug ("setModulation Uij(final)=" + J.util.Escape.eAF (a.anisoBorU) + "\n");
J.util.Logger.debug ("setModulation tensor=" + (a.tensors.get (0)).getInfo ("all"));
}}a.vib = ms;
if (this.modVib || a.foccupancy != 0) {
var t = this.q1Norm.dot (a);
if (Math.abs (t - Clazz.floatToInt (t)) > 0.001) t = Clazz.doubleToInt (Math.floor (t));
sb.append ((Clazz.floatToInt (t)) + "\n");
}}, "J.adapter.smarter.Atom,JU.SB");
Clazz.defineStatics (c$,
"U_LIST", "U11U22U33U12U13U23UISO");
});
