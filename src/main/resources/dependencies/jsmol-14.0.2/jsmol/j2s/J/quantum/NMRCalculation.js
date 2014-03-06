Clazz.declarePackage ("J.quantum");
Clazz.load (["J.api.JmolNMRInterface", "java.util.Hashtable"], "J.quantum.NMRCalculation", ["java.lang.Character", "$.Double", "$.Float", "$.NullPointerException", "JU.BS", "$.List", "$.PT", "$.V3", "J.io.JmolBinary", "J.util.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.isotopeData = null;
this.shiftRefsPPM = null;
Clazz.instantialize (this, arguments);
}, J.quantum, "NMRCalculation", null, J.api.JmolNMRInterface);
Clazz.prepareFields (c$, function () {
this.shiftRefsPPM =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "setViewer", 
function (viewer) {
this.viewer = viewer;
this.getData ();
return this;
}, "J.viewer.Viewer");
$_V(c$, "getQuadrupolarConstant", 
function (efg) {
if (efg == null) return 0;
var a = this.viewer.modelSet.atoms[efg.atomIndex1];
return (this.getIsotopeData (a, 2) * efg.eigenValues[2] * 2.349647144641375E8);
}, "J.util.Tensor");
$_M(c$, "getInteractionTensorList", 
($fz = function (type, bsA) {
if (type != null) type = type.toLowerCase ();
var bsModels = this.viewer.getModelBitSet (bsA, false);
var bs1 = this.getAtomSiteBS (bsA);
var iAtom = (bs1.cardinality () == 1 ? bs1.nextSetBit (0) : -1);
var list =  new JU.List ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var tensors = this.viewer.getModelAuxiliaryInfoValue (i, "interactionTensors");
if (tensors == null) continue;
var n = tensors.size ();
for (var j = 0; j < n; j++) {
var t = tensors.get (j);
if (type == null || t.type.equals (type) && t.isSelected (bs1, iAtom)) list.addLast (t);
}
}
return list;
}, $fz.isPrivate = true, $fz), "~S,JU.BS");
$_M(c$, "getAtomSiteBS", 
($fz = function (bsA) {
if (bsA == null) return null;
var bs =  new JU.BS ();
var atoms = this.viewer.modelSet.atoms;
var models = this.viewer.modelSet.models;
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) {
if (!bsA.get (i)) continue;
var a = atoms[i];
bs.set (models[a.modelIndex].firstAtomIndex - 1 + a.atomSite);
}
return bs;
}, $fz.isPrivate = true, $fz), "JU.BS");
$_V(c$, "getUniqueTensorSet", 
function (bsAtoms) {
var bs =  new JU.BS ();
var atoms = this.viewer.modelSet.atoms;
for (var i = this.viewer.getModelCount (); --i >= 0; ) {
var bsModelAtoms = this.viewer.getModelUndeletedAtomsBitSet (i);
bsModelAtoms.and (bsAtoms);
if (this.viewer.getModelUnitCell (i) == null) continue;
for (var j = bsModelAtoms.nextSetBit (0); j >= 0; j = bsModelAtoms.nextSetBit (j + 1)) if (atoms[j].atomSite != atoms[j].index + 1) bsModelAtoms.clear (j);

bs.or (bsModelAtoms);
for (var j = bsModelAtoms.nextSetBit (0); j >= 0; j = bsModelAtoms.nextSetBit (j + 1)) {
var ta = atoms[j].getTensors ();
if (ta == null) continue;
for (var jj = ta.length; --jj >= 0; ) {
var t = ta[jj];
if (t == null) continue;
for (var k = bsModelAtoms.nextSetBit (j + 1); k >= 0; k = bsModelAtoms.nextSetBit (k + 1)) {
var tb = atoms[k].getTensors ();
if (tb == null) continue;
for (var kk = tb.length; --kk >= 0; ) {
if (t.isEquiv (tb[kk])) {
bsModelAtoms.clear (k);
bs.clear (k);
break;
}}
}
}
}
}
return bs;
}, "JU.BS");
$_M(c$, "getJCouplingHz", 
function (a1, a2, type, isc) {
return this.getIsoOrAnisoHz (true, a1, a2, type, isc);
}, "J.modelset.Atom,J.modelset.Atom,~S,J.util.Tensor");
$_V(c$, "getIsoOrAnisoHz", 
function (isIso, a1, a2, type, isc) {
if (isc == null) {
type = this.getISCtype (a1, type);
if (type == null || a1.modelIndex != a2.modelIndex) return 0;
var bs =  new JU.BS ();
bs.set (a1.index);
bs.set (a2.index);
var list = this.getInteractionTensorList (type, bs);
if (list.size () == 0) return NaN;
isc = list.get (0);
} else {
a1 = this.viewer.modelSet.atoms[isc.atomIndex1];
a2 = this.viewer.modelSet.atoms[isc.atomIndex2];
}return (this.getIsotopeData (a1, 1) * this.getIsotopeData (a2, 1) * (isIso ? isc.isotropy () : isc.anisotropy ()) * 0.0167840302932219);
}, "~B,J.modelset.Atom,J.modelset.Atom,~S,J.util.Tensor");
$_M(c$, "getISCtype", 
($fz = function (a1, type) {
var tensors = this.viewer.getModelAuxiliaryInfoValue (a1.modelIndex, "interactionTensors");
if (tensors == null) return null;
type = (type == null ? "" : type.toLowerCase ());
var pt = -1;
if ((pt = type.indexOf ("_hz")) >= 0 || (pt = type.indexOf ("_khz")) >= 0 || (pt = type.indexOf ("hz")) >= 0 || (pt = type.indexOf ("khz")) >= 0) type = type.substring (0, pt);
if (type.length == 0) type = "isc";
return type;
}, $fz.isPrivate = true, $fz), "J.modelset.Atom,~S");
$_V(c$, "getDipolarConstantHz", 
function (a1, a2) {
if (J.util.Logger.debugging) J.util.Logger.debug (a1 + " g=" + this.getIsotopeData (a1, 1) + "; " + a2 + " g=" + this.getIsotopeData (a2, 1));
var v = (-this.getIsotopeData (a1, 1) * this.getIsotopeData (a2, 1) / Math.pow (a1.distance (a2), 3) * 1054.5717253362893);
return (v == 0 || a1 === a2 ? NaN : v);
}, "J.modelset.Atom,J.modelset.Atom");
$_V(c$, "getDipolarCouplingHz", 
function (a1, a2, vField) {
var v12 = JU.V3.newVsub (a2, a1);
var r = v12.length ();
var costheta = v12.dot (vField) / r / vField.length ();
return (this.getDipolarConstantHz (a1, a2) * (3 * costheta - 1) / 2);
}, "J.modelset.Atom,J.modelset.Atom,JU.V3");
$_M(c$, "getIsotopeData", 
($fz = function (a, iType) {
var iso = a.getIsotopeNumber ();
var sym = a.getElementSymbolIso (false);
var d = this.isotopeData.get (iso == 0 ? sym : "" + iso + sym);
return (d == null ? 0 : d[iType]);
}, $fz.isPrivate = true, $fz), "J.modelset.Atom,~N");
$_M(c$, "getData", 
($fz = function () {
var br = null;
try {
var debugging = J.util.Logger.debugging;
br = J.io.JmolBinary.getBufferedReaderForResource (this.viewer, this, "J/quantum/", "nmr_data.txt");
this.isotopeData =  new java.util.Hashtable ();
var line;
while ((line = br.readLine ()) != null) {
if (debugging) J.util.Logger.info (line);
if (line.indexOf ("#") >= 0) continue;
var tokens = JU.PT.getTokens (line);
var name = tokens[0];
var defaultIso = tokens[2] + name;
if (debugging) J.util.Logger.info (name + " default isotope " + defaultIso);
for (var i = 3; i < tokens.length; i += 3) {
var n = Integer.parseInt (tokens[i]);
var isoname = n + name;
var dataGQ = [n, Double.parseDouble (tokens[i + 1]), Double.parseDouble (tokens[i + 2])];
if (debugging) J.util.Logger.info (isoname + "  " + J.util.Escape.eAD (dataGQ));
this.isotopeData.put (isoname, dataGQ);
}
var defdata = this.isotopeData.get (defaultIso);
if (defdata == null) {
J.util.Logger.error ("Cannot find default NMR data in nmr_data.txt for " + defaultIso);
throw  new NullPointerException ();
}defdata[0] = -defdata[0];
this.isotopeData.put (name, defdata);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error ("Exception " + e.toString () + " reading " + "nmr_data.txt");
} else {
throw e;
}
} finally {
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
}
}, $fz.isPrivate = true, $fz));
$_V(c$, "getInfo", 
function (what) {
if (what.equals ("all")) {
var map =  new java.util.Hashtable ();
map.put ("isotopes", this.isotopeData);
map.put ("shiftRefsPPM", this.shiftRefsPPM);
return map;
}if (Character.isDigit (what.charAt (0))) return this.isotopeData.get (what);
var info =  new JU.List ();
for (var e, $e = this.isotopeData.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (Character.isDigit (key.charAt (0)) && key.endsWith (what)) info.addLast (e.getValue ());
}
return info;
}, "~S");
$_V(c$, "getChemicalShift", 
function (atom) {
var v = this.getMagneticShielding (atom);
if (Float.isNaN (v)) return v;
var ref = this.shiftRefsPPM.get (atom.getElementSymbol ());
return (ref == null ? 0 : ref.floatValue ()) - v;
}, "J.modelset.Atom");
$_V(c$, "getMagneticShielding", 
function (atom) {
var t = this.viewer.modelSet.getAtomTensor (atom.index, "ms");
return (t == null ? NaN : t.isotropy ());
}, "J.modelset.Atom");
$_V(c$, "getState", 
function (sb) {
if (this.shiftRefsPPM.isEmpty ()) return false;
for (var nuc, $nuc = this.shiftRefsPPM.entrySet ().iterator (); $nuc.hasNext () && ((nuc = $nuc.next ()) || true);) sb.append ("  set shift_").append (nuc.getKey ()).append (" ").appendO (nuc.getValue ()).append ("\n");

return true;
}, "JU.SB");
$_V(c$, "setChemicalShiftReference", 
function (element, value) {
if (element == null) {
this.shiftRefsPPM.clear ();
return false;
}element = element.substring (0, 1).toUpperCase () + element.substring (1);
this.shiftRefsPPM.put (element, Float.$valueOf (value));
return true;
}, "~S,~N");
$_V(c$, "getTensorInfo", 
function (tensorType, infoType, bs) {
if ("".equals (tensorType)) tensorType = null;
infoType = (infoType == null ? ";all." : ";" + infoType + ".");
var data =  new JU.List ();
var list1;
if (";dc.".equals (infoType)) {
var atoms = this.viewer.modelSet.atoms;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) for (var j = bs.nextSetBit (i + 1); j >= 0; j = bs.nextSetBit (j + 1)) {
list1 =  new JU.List ();
list1.addLast (Integer.$valueOf (atoms[i].index));
list1.addLast (Integer.$valueOf (atoms[j].index));
list1.addLast (Float.$valueOf (this.getDipolarConstantHz (atoms[i], atoms[j])));
data.addLast (list1);
}

return data;
}if (tensorType == null || tensorType.startsWith ("isc")) {
var isJ = infoType.equals (";j.");
var isEta = infoType.equals (";eta.");
var list = this.getInteractionTensorList (tensorType, bs);
var n = (list == null ? 0 : list.size ());
for (var i = 0; i < n; i++) {
var t = list.get (i);
list1 =  new JU.List ();
list1.addLast (Integer.$valueOf (t.atomIndex1));
list1.addLast (Integer.$valueOf (t.atomIndex2));
list1.addLast (isEta || isJ ? Float.$valueOf (this.getIsoOrAnisoHz (isJ, null, null, null, t)) : t.getInfo (infoType));
data.addLast (list1);
}
if (tensorType != null) return data;
}var isChi = tensorType != null && tensorType.startsWith ("efg") && infoType.equals (";chi.");
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (tensorType == null) {
var a = this.viewer.modelSet.getAtomTensorList (i);
if (a != null) for (var j = 0; j < a.length; j++) data.addLast ((a[j]).getInfo (infoType));

} else {
var t = this.viewer.modelSet.getAtomTensor (i, tensorType);
if (t != null) data.addLast (isChi ? Float.$valueOf (this.getQuadrupolarConstant (t)) : t.getInfo (infoType));
}}
return data;
}, "~S,~S,JU.BS");
$_V(c$, "getMinDistances", 
function (md) {
var bsPoints1 = md.points.get (0);
var n1 = bsPoints1.cardinality ();
if (n1 == 0 || !(Clazz.instanceOf (md.points.get (1), JU.BS))) return null;
var bsPoints2 = md.points.get (1);
var n2 = bsPoints2.cardinality ();
if (n1 < 2 && n2 < 2) return null;
var htMin =  new java.util.Hashtable ();
var atoms = this.viewer.modelSet.atoms;
for (var i = bsPoints1.nextSetBit (0); i >= 0; i = bsPoints1.nextSetBit (i + 1)) {
var a1 = atoms[i];
var name = a1.getAtomName ();
for (var j = bsPoints2.nextSetBit (0); j >= 0; j = bsPoints2.nextSetBit (j + 1)) {
var a2 = atoms[j];
var d = Clazz.floatToInt (a2.distanceSquared (a1) * 100);
if (d == 0) continue;
var name1 = a2.getAtomName ();
var key = (name.compareTo (name1) < 0 ? name + name1 : name1 + name);
var min = htMin.get (key);
if (min == null) {
min = Integer.$valueOf (d);
htMin.put (key, min);
continue;
}if (d < min.intValue ()) htMin.put (key, Integer.$valueOf (d));
}
}
return htMin;
}, "J.modelset.MeasurementData");
Clazz.defineStatics (c$,
"MAGNETOGYRIC_RATIO", 1,
"QUADRUPOLE_MOMENT", 2,
"e_charge", 1.60217646e-19,
"h_planck", 6.62606957e-34,
"h_bar_planck", 1.0545717253362894E-34,
"DIPOLAR_FACTOR", 1054.5717253362893,
"J_FACTOR", 0.0167840302932219,
"Q_FACTOR", 2.349647144641375E8,
"resource", "nmr_data.txt");
});
