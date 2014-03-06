Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum", "JSV.source.JDXDataObject", "JU.List"], "JSV.common.JDXSpectrum", ["java.lang.Boolean", "$.Double", "java.util.Hashtable", "JSV.common.Coordinate", "$.Parameters", "$.PeakInfo", "JSV.source.JDXSourceStreamTokenizer", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.subSpectra = null;
this.peakList = null;
this.piUnitsX = null;
this.piUnitsY = null;
this.selectedPeak = null;
this.highlightedPeak = null;
this.specShift = 0;
this.currentSubSpectrumIndex = 0;
this.$isForcedSubset = false;
this.id = "";
this.convertedSpectrum = null;
this.userYFactor = 1;
this.exportXAxisLeftToRight = false;
Clazz.instantialize (this, arguments);
}, JSV.common, "JDXSpectrum", JSV.source.JDXDataObject);
Clazz.prepareFields (c$, function () {
this.peakList =  new JU.List ();
});
$_V(c$, "finalize", 
function () {
System.out.println ("JDXSpectrum " + this + " finalized " + this.title);
});
$_M(c$, "dispose", 
function () {
});
$_M(c$, "isForcedSubset", 
function () {
return this.$isForcedSubset;
});
$_M(c$, "setId", 
function (id) {
this.id = id;
}, "~S");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.common.JDXSpectrum, []);
this.headerTable =  new JU.List ();
this.xyCoords =  new Array (0);
this.parent = this;
});
$_M(c$, "copy", 
function () {
var newSpectrum =  new JSV.common.JDXSpectrum ();
this.copyTo (newSpectrum);
newSpectrum.setPeakList (this.peakList, this.piUnitsX, null);
return newSpectrum;
});
$_M(c$, "getXYCoords", 
function () {
return this.getCurrentSubSpectrum ().xyCoords;
});
$_M(c$, "getPeakList", 
function () {
return this.peakList;
});
$_M(c$, "setPeakList", 
function (list, piUnitsX, piUnitsY) {
this.peakList = list;
System.out.println ("setting peaklist for " + this + " to " + list);
if (this.peakList == null) System.out.println ("ohoh");
this.piUnitsX = piUnitsX;
this.piUnitsY = piUnitsY;
for (var i = list.size (); --i >= 0; ) this.peakList.get (i).spectrum = this;

if (J.util.Logger.debugging) J.util.Logger.info ("Spectrum " + this.getTitle () + " peaks: " + list.size ());
return list.size ();
}, "JU.List,~S,~S");
$_M(c$, "selectPeakByFileIndex", 
function (filePath, index) {
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileIndex (filePath, index)) {
System.out.println ("selecting peak in " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S");
$_M(c$, "selectPeakByFilePathTypeModel", 
function (filePath, type, model) {
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileTypeModel (filePath, type, model)) {
System.out.println ("selecting peak in " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S,~S");
$_M(c$, "matchesPeakTypeModel", 
function (type, model) {
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeModel (type, model)) return true;

return false;
}, "~S,~S");
$_M(c$, "setSelectedPeak", 
function (peak) {
this.selectedPeak = peak;
}, "JSV.common.PeakInfo");
$_M(c$, "setHighlightedPeak", 
function (peak) {
this.highlightedPeak = peak;
}, "JSV.common.PeakInfo");
$_M(c$, "getSelectedPeak", 
function () {
return this.selectedPeak;
});
$_M(c$, "getModelPeakInfoForAutoSelectOnLoad", 
function () {
if (this.peakList != null) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).autoSelectOnLoad ()) return this.peakList.get (i);

return null;
});
$_M(c$, "getAssociatedPeakInfo", 
function (xPixel, coord) {
this.selectedPeak = this.findPeakByCoord (xPixel, coord);
return (this.selectedPeak == null ? this.getBasePeakInfo () : this.selectedPeak);
}, "~N,JSV.common.Coordinate");
$_M(c$, "findPeakByCoord", 
function (xPixel, coord) {
if (coord != null && this.peakList != null && this.peakList.size () > 0) {
var xVal = coord.getXVal ();
var iBest = -1;
var dBest = 1e100;
for (var i = 0; i < this.peakList.size (); i++) {
var d = this.peakList.get (i).checkRange (xPixel, xVal);
if (d < dBest) {
dBest = d;
iBest = i;
}}
if (iBest >= 0) return this.peakList.get (iBest);
}return null;
}, "~N,JSV.common.Coordinate");
$_M(c$, "getPeakTitle", 
function () {
return (this.selectedPeak != null ? this.selectedPeak.getTitle () : this.highlightedPeak != null ? this.highlightedPeak.getTitle () : this.getTitleLabel ());
});
$_M(c$, "getTitleLabel", 
function () {
var type = (this.peakList == null || this.peakList.size () == 0 ? this.getQualifiedDataType () : this.peakList.get (0).getType ());
return (type != null && type.length > 0 ? type + " " : "") + this.getTitle ();
});
$_M(c$, "setNextPeak", 
function (coord, istep) {
if (this.peakList == null || this.peakList.size () == 0) return -1;
var x0 = coord.getXVal () + istep * 0.000001;
var ipt1 = -1;
var ipt2 = -1;
var dmin1 = 1.7976931348623157E308 * istep;
var dmin2 = 0;
for (var i = this.peakList.size (); --i >= 0; ) {
var x = this.peakList.get (i).getX ();
if (istep > 0) {
if (x > x0 && x < dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x < x0 && x - x0 < dmin2) {
ipt2 = i;
dmin2 = x - x0;
}} else {
if (x < x0 && x > dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x > x0 && x - x0 > dmin2) {
ipt2 = i;
dmin2 = x - x0;
}}}
if (ipt1 < 0) {
if (ipt2 < 0) return -1;
ipt1 = ipt2;
}return ipt1;
}, "JSV.common.Coordinate,~N");
$_M(c$, "getPercentYValueAt", 
function (x) {
if (!this.isContinuous ()) return NaN;
return this.getYValueAt (x);
}, "~N");
$_M(c$, "getYValueAt", 
function (x) {
return JSV.common.Coordinate.getYValueAt (this.xyCoords, x);
}, "~N");
$_M(c$, "setUserYFactor", 
function (userYFactor) {
this.userYFactor = userYFactor;
}, "~N");
$_M(c$, "getUserYFactor", 
function () {
return this.userYFactor;
});
$_M(c$, "getConvertedSpectrum", 
function () {
return this.convertedSpectrum;
});
$_M(c$, "setConvertedSpectrum", 
function (spectrum) {
this.convertedSpectrum = spectrum;
}, "JSV.common.JDXSpectrum");
c$.taConvert = $_M(c$, "taConvert", 
function (spectrum, mode) {
if (!spectrum.isContinuous ()) return spectrum;
switch (mode) {
case JSV.common.JDXSpectrum.IRMode.NO_CONVERT:
return spectrum;
case JSV.common.JDXSpectrum.IRMode.TO_ABS:
if (!spectrum.isTransmittance ()) return spectrum;
break;
case JSV.common.JDXSpectrum.IRMode.TO_TRANS:
if (!spectrum.isAbsorbance ()) return spectrum;
break;
case JSV.common.JDXSpectrum.IRMode.TOGGLE:
break;
}
var spec = spectrum.getConvertedSpectrum ();
return (spec != null ? spec : spectrum.isAbsorbance () ? JSV.common.JDXSpectrum.toT (spectrum) : JSV.common.JDXSpectrum.toA (spectrum));
}, "JSV.common.JDXSpectrum,JSV.common.JDXSpectrum.IRMode");
c$.toT = $_M(c$, "toT", 
($fz = function (spectrum) {
if (!spectrum.isAbsorbance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
if (!JSV.common.Coordinate.isYInRange (xyCoords, 0, 4.0)) xyCoords = JSV.common.Coordinate.normalise (xyCoords, 0, 4.0);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.JDXSpectrum.toTransmittance (xyCoords[i].getYVal ()));

return JSV.common.JDXSpectrum.newSpectrum (spectrum, newXYCoords, "TRANSMITTANCE");
}, $fz.isPrivate = true, $fz), "JSV.common.JDXSpectrum");
c$.toA = $_M(c$, "toA", 
($fz = function (spectrum) {
if (!spectrum.isTransmittance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
var isPercent = JSV.common.Coordinate.isYInRange (xyCoords, -2, 2);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.JDXSpectrum.toAbsorbance (xyCoords[i].getYVal (), isPercent));

return JSV.common.JDXSpectrum.newSpectrum (spectrum, newXYCoords, "ABSORBANCE");
}, $fz.isPrivate = true, $fz), "JSV.common.JDXSpectrum");
c$.newSpectrum = $_M(c$, "newSpectrum", 
function (spectrum, newXYCoords, units) {
var specNew = spectrum.copy ();
specNew.setOrigin ("JSpecView Converted");
specNew.setOwner ("JSpecView Generated");
specNew.setXYCoords (newXYCoords);
specNew.setYUnits (units);
spectrum.setConvertedSpectrum (specNew);
specNew.setConvertedSpectrum (spectrum);
return specNew;
}, "JSV.common.JDXSpectrum,~A,~S");
c$.toAbsorbance = $_M(c$, "toAbsorbance", 
($fz = function (x, isPercent) {
return (Math.min (4.0, isPercent ? 2 - JSV.common.JDXSpectrum.log10 (x) : -JSV.common.JDXSpectrum.log10 (x)));
}, $fz.isPrivate = true, $fz), "~N,~B");
c$.toTransmittance = $_M(c$, "toTransmittance", 
($fz = function (x) {
return (x <= 0 ? 1 : Math.pow (10, -x));
}, $fz.isPrivate = true, $fz), "~N");
c$.log10 = $_M(c$, "log10", 
($fz = function (value) {
return Math.log (value) / Math.log (10);
}, $fz.isPrivate = true, $fz), "~N");
c$.process = $_M(c$, "process", 
function (specs, irMode) {
if (irMode === JSV.common.JDXSpectrum.IRMode.TO_ABS || irMode === JSV.common.JDXSpectrum.IRMode.TO_TRANS) for (var i = 0; i < specs.size (); i++) specs.set (i, JSV.common.JDXSpectrum.taConvert (specs.get (i), irMode));

return true;
}, "JU.List,JSV.common.JDXSpectrum.IRMode");
$_M(c$, "getSubSpectra", 
function () {
return this.subSpectra;
});
$_M(c$, "getCurrentSubSpectrum", 
function () {
return (this.subSpectra == null ? this : this.subSpectra.get (this.currentSubSpectrumIndex));
});
$_M(c$, "advanceSubSpectrum", 
function (dir) {
return this.setCurrentSubSpectrum (this.currentSubSpectrumIndex + dir);
}, "~N");
$_M(c$, "setCurrentSubSpectrum", 
function (n) {
return (this.currentSubSpectrumIndex = JSV.common.Coordinate.intoRange (n, 0, this.subSpectra.size () - 1));
}, "~N");
$_M(c$, "addSubSpectrum", 
function (spectrum, forceSub) {
if (!forceSub && (this.numDim < 2 || this.blockID != spectrum.blockID) || !JSV.common.JDXSpectrum.allowSubSpec (this, spectrum)) return false;
this.$isForcedSubset = forceSub;
if (this.subSpectra == null) {
this.subSpectra =  new JU.List ();
this.addSubSpectrum (this, true);
}this.subSpectra.addLast (spectrum);
spectrum.parent = this;
return true;
}, "JSV.common.JDXSpectrum,~B");
$_M(c$, "getSubIndex", 
function () {
return (this.subSpectra == null ? -1 : this.currentSubSpectrumIndex);
});
$_M(c$, "setExportXAxisDirection", 
function (leftToRight) {
this.exportXAxisLeftToRight = leftToRight;
}, "~B");
$_M(c$, "isExportXAxisLeftToRight", 
function () {
return this.exportXAxisLeftToRight;
});
$_M(c$, "getInfo", 
function (key) {
var info =  new java.util.Hashtable ();
if ("id".equalsIgnoreCase (key)) {
info.put (key, this.id);
return info;
}info.put ("id", this.id);
JSV.common.Parameters.putInfo (key, info, "specShift", Double.$valueOf (this.specShift));
var justHeader = ("header".equals (key));
if (!justHeader && key != null) {
for (var i = this.headerTable.size (); --i >= 0; ) {
var entry = this.headerTable.get (i);
if (entry[0].equalsIgnoreCase (key) || entry[2].equalsIgnoreCase (key)) {
info.put (key, entry[1]);
return info;
}}
}var head =  new java.util.Hashtable ();
var list = this.getHeaderRowDataAsArray ();
for (var i = 0; i < list.length; i++) {
var label = JSV.source.JDXSourceStreamTokenizer.cleanLabel (list[i][0]);
if (key != null && !justHeader && !label.equals (key)) continue;
var val = JSV.common.JDXSpectrum.fixInfoValue (list[i][1]);
if (key == null) {
var data =  new java.util.Hashtable ();
data.put ("value", val);
data.put ("index", Integer.$valueOf (i + 1));
info.put (label, data);
} else {
info.put (label, val);
}}
if (head.size () > 0) info.put ("header", head);
if (!justHeader) {
JSV.common.Parameters.putInfo (key, info, "titleLabel", this.getTitleLabel ());
JSV.common.Parameters.putInfo (key, info, "type", this.getDataType ());
JSV.common.Parameters.putInfo (key, info, "isHZToPPM", Boolean.$valueOf (this.$isHZtoPPM));
JSV.common.Parameters.putInfo (key, info, "subSpectrumCount", Integer.$valueOf (this.subSpectra == null ? 0 : this.subSpectra.size ()));
}return info;
}, "~S");
c$.fixInfoValue = $_M(c$, "fixInfoValue", 
($fz = function (info) {
try {
return (Integer.$valueOf (info));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
return (Double.$valueOf (info));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return info;
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "toString", 
function () {
return this.getTitleLabel ();
});
$_M(c$, "findMatchingPeakInfo", 
function (pi) {
for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeMatch (pi)) return this.peakList.get (i);

return null;
}, "JSV.common.PeakInfo");
$_M(c$, "getBasePeakInfo", 
function () {
return (this.peakList.size () == 0 ?  new JSV.common.PeakInfo () :  new JSV.common.PeakInfo (" baseModel=\"\" " + this.peakList.get (0)));
});
$_M(c$, "getAxisLabel", 
function (isX) {
var units = (isX ? this.piUnitsX : this.piUnitsY);
if (units == null) units = (isX ? this.xLabel : this.yLabel);
if (units == null) units = (isX ? this.xUnits : this.yUnits);
return (units == null ? "" : units.equalsIgnoreCase ("WAVENUMBERS") ? "1/cm" : units.equalsIgnoreCase ("nanometers") ? "nm" : units);
}, "~B");
$_M(c$, "findXForPeakNearest", 
function (x) {
return JSV.common.Coordinate.findXForPeakNearest (this.xyCoords, x, this.isInverted ());
}, "~N");
$_M(c$, "addSpecShift", 
function (dx) {
if (dx != 0) {
this.specShift += dx;
JSV.common.Coordinate.shiftX (this.xyCoords, dx);
if (this.subSpectra != null) for (var i = this.subSpectra.size (); --i >= 0; ) {
var spec = this.subSpectra.get (i);
if (spec !== this && spec !== this.parent) spec.addSpecShift (dx);
}
}return this.specShift;
}, "~N");
c$.allowSubSpec = $_M(c$, "allowSubSpec", 
function (s1, s2) {
return (s1.is1D () == s2.is1D () && s1.xUnits.equalsIgnoreCase (s2.xUnits) && s1.isHNMR () == s2.isHNMR ());
}, "JSV.common.JDXSpectrum,JSV.common.JDXSpectrum");
c$.areXScalesCompatible = $_M(c$, "areXScalesCompatible", 
function (s1, s2, isSubspecCheck, isLinkCheck) {
var isNMR1 = s1.isNMR ();
if (isNMR1 != s2.isNMR ()) return false;
if (!isLinkCheck && !s1.xUnits.equalsIgnoreCase (s2.xUnits)) return false;
if (isSubspecCheck) {
if (s1.is1D () != s2.is1D ()) return false;
} else if (isLinkCheck) {
if (!isNMR1) return true;
} else if (!s1.is1D () || !s2.is1D ()) {
return false;
}return (!isNMR1 || s2.is1D () && s1.parent.nucleusX.equals (s2.parent.nucleusX));
}, "JSV.common.JDXSpectrum,JSV.common.JDXSpectrum,~B,~B");
c$.areLinkableX = $_M(c$, "areLinkableX", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusX));
}, "JSV.common.JDXSpectrum,JSV.common.JDXSpectrum");
c$.areLinkableY = $_M(c$, "areLinkableY", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusY));
}, "JSV.common.JDXSpectrum,JSV.common.JDXSpectrum");
$_M(c$, "setNHydrogens", 
function (nH) {
this.nH = nH;
}, "~N");
Clazz.pu$h ();
c$ = Clazz.declareType (JSV.common.JDXSpectrum, "IRMode", Enum);
c$.getMode = $_M(c$, "getMode", 
function (a) {
switch (a == null ? 'I' : a.toUpperCase ().charAt (0)) {
case 'A':
return JSV.common.JDXSpectrum.IRMode.TO_ABS;
case 'T':
return (a.equalsIgnoreCase ("TOGGLE") ? JSV.common.JDXSpectrum.IRMode.TOGGLE : JSV.common.JDXSpectrum.IRMode.TO_TRANS);
case 'N':
return JSV.common.JDXSpectrum.IRMode.NO_CONVERT;
default:
return JSV.common.JDXSpectrum.IRMode.TOGGLE;
}
}, "~S");
Clazz.defineEnumConstant (c$, "NO_CONVERT", 0, []);
Clazz.defineEnumConstant (c$, "TO_TRANS", 1, []);
Clazz.defineEnumConstant (c$, "TO_ABS", 2, []);
Clazz.defineEnumConstant (c$, "TOGGLE", 3, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MAXABS", 4);
});
