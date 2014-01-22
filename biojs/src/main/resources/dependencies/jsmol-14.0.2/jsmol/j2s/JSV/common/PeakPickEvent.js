Clazz.declarePackage ("JSV.common");
Clazz.load (["java.util.EventObject"], "JSV.common.PeakPickEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.coord = null;
this.peakInfo = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PeakPickEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, coord, peakInfo) {
Clazz.superConstructor (this, JSV.common.PeakPickEvent, [source]);
this.coord = coord;
this.peakInfo = (peakInfo == null ? null : peakInfo);
}, "~O,JSV.common.Coordinate,JSV.common.PeakInfo");
$_M(c$, "getCoord", 
function () {
return this.coord;
});
$_M(c$, "getPeakInfo", 
function () {
return this.peakInfo;
});
$_V(c$, "toString", 
function () {
return (this.peakInfo == null ? null : this.peakInfo.toString ());
});
});
