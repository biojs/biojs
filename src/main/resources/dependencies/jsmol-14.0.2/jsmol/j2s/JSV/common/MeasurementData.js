Clazz.declarePackage ("JSV.common");
Clazz.load (["JU.List", "JSV.api.AnnotationData"], "JSV.common.MeasurementData", ["JU.AU", "$.DF", "JSV.common.Annotation", "$.Parameters"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.spec = null;
this.units = null;
this.precision = 0;
this.myParams = null;
this.isON = true;
this.key = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "MeasurementData", JU.List, JSV.api.AnnotationData);
Clazz.makeConstructor (c$, 
function (type, spec) {
Clazz.superConstructor (this, JSV.common.MeasurementData, []);
this.type = type;
this.spec = spec;
this.myParams =  new JSV.common.Parameters ().setName ("MeasurementData");
}, "JSV.common.Annotation.AType,JSV.common.JDXSpectrum");
$_M(c$, "getMeasurements", 
function () {
return this;
});
$_V(c$, "getAType", 
function () {
return this.type;
});
$_V(c$, "getState", 
function () {
return this.isON;
});
$_V(c$, "setState", 
function (b) {
this.isON = b;
}, "~B");
$_M(c$, "setMeasurements", 
function (measurements) {
}, "JU.List");
$_V(c$, "getParameters", 
function () {
return this.myParams;
});
$_M(c$, "getDataHeader", 
function () {
return JSV.common.MeasurementData.HEADER;
});
$_M(c$, "getMeasurementListArray", 
function (units) {
this.units = units;
var ddata = this.getMeasurementListArrayReal (units);
var precisionX = (this.spec.isNMR () ? 4 : 2);
var precisionDX = (this.spec.isHNMR () && units.equals ("ppm") ? 4 : 2);
var data =  new Array (this.size ());
for (var i = this.size (); --i >= 0; ) data[i] = ["" + (i + 1), JU.DF.formatDecimalDbl (ddata[i][0], precisionX), JU.DF.formatDecimalDbl (ddata[i][1], precisionX), JU.DF.formatDecimalDbl (ddata[i][2], precisionDX)];

return data;
}, "~S");
$_M(c$, "getMeasurementListArrayReal", 
function (units) {
var toHz = this.spec.isNMR () && units.equalsIgnoreCase ("HZ");
var data = JU.AU.newDouble2 (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; ) {
var y = this.get (i).getValue ();
if (toHz) y *= this.spec.observedFreq;
data[pt++] = [this.get (i).getXVal (), this.get (i).getXVal2 (), y];
}
return data;
}, "~S");
c$.checkParameters = $_M(c$, "checkParameters", 
function (md, p) {
if (md.size () == 0) return false;
var myParams = md.getParameters ();
switch (md.getAType ()) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.PeakList:
return (p.peakListInterpolation.equals (myParams.peakListInterpolation) && p.peakListThreshold == myParams.peakListThreshold);
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
}
return false;
}, "JSV.common.MeasurementData,JSV.common.ColorParameters");
$_V(c$, "getSpectrum", 
function () {
return this.spec;
});
$_V(c$, "getData", 
function () {
return this;
});
$_M(c$, "clear", 
function (x1, x2) {
for (var i = this.size (); --i >= 0; ) {
var $in = this.get (i);
if ($in.text.length == 0 || $in.overlaps (x1, x2)) {
this.remove (i);
}}
}, "~N,~N");
$_V(c$, "setSpecShift", 
function (dx) {
for (var i = this.size (); --i >= 0; ) {
var m = this.get (i);
var x = m.getXVal () + dx;
m.setXVal (x);
m.setValue (x);
m.text = JU.DF.formatDecimalDbl (x, this.precision);
}
}, "~N");
$_V(c$, "getGraphSetKey", 
function () {
return this.key;
});
$_V(c$, "setGraphSetKey", 
function (key) {
this.key = key;
}, "~S");
$_V(c$, "isVisible", 
function () {
return true;
});
$_M(c$, "getInfo", 
function (info) {
info.put ("header", this.getDataHeader ());
info.put ("table", this.getMeasurementListArrayReal ("ppm"));
if (this.units != null) info.put ("units", this.units);
}, "java.util.Map");
c$.HEADER = c$.prototype.HEADER = ["", "start", "end", "value"];
});
