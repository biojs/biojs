Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.CoordComparator"], "JSV.common.Coordinate", ["java.lang.Double", "java.util.Arrays", "$.StringTokenizer", "JU.DF", "$.List"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xVal = 0;
this.yVal = 0;
Clazz.instantialize (this, arguments);
}, JSV.common, "Coordinate");
Clazz.makeConstructor (c$, 
function () {
});
$_M(c$, "set", 
function (x, y) {
this.xVal = x;
this.yVal = y;
return this;
}, "~N,~N");
$_M(c$, "getXVal", 
function () {
return this.xVal;
});
$_M(c$, "getYVal", 
function () {
return this.yVal;
});
$_M(c$, "getXString", 
function () {
return JU.DF.formatDecimalTrimmed (this.xVal, 8);
});
$_M(c$, "getYString", 
function () {
return JU.DF.formatDecimalTrimmed (this.yVal, 8);
});
$_M(c$, "setXVal", 
function (val) {
this.xVal = val;
}, "~N");
$_M(c$, "setYVal", 
function (val) {
this.yVal = val;
}, "~N");
$_M(c$, "copy", 
function () {
return  new JSV.common.Coordinate ().set (this.xVal, this.yVal);
});
$_M(c$, "equals", 
function (coord) {
return (coord.xVal == this.xVal && coord.yVal == this.yVal);
}, "JSV.common.Coordinate");
$_V(c$, "toString", 
function () {
return "[" + this.xVal + ", " + this.yVal + "]";
});
c$.isYInRange = $_M(c$, "isYInRange", 
function (xyCoords, min, max) {
return (JSV.common.Coordinate.getMinY (xyCoords, 0, xyCoords.length) >= min && JSV.common.Coordinate.getMaxY (xyCoords, 0, xyCoords.length) >= max);
}, "~A,~N,~N");
c$.normalise = $_M(c$, "normalise", 
function (xyCoords, min, max) {
var newXYCoords =  new Array (xyCoords.length);
var minY = JSV.common.Coordinate.getMinY (xyCoords, 0, xyCoords.length);
var maxY = JSV.common.Coordinate.getMaxY (xyCoords, 0, xyCoords.length);
var factor = (maxY - minY) / (max - min);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), ((xyCoords[i].getYVal () - minY) / factor) - min);

return newXYCoords;
}, "~A,~N,~N");
c$.reverse = $_M(c$, "reverse", 
function (x) {
var n = x.length;
for (var i = 0; i < n; i++) {
var v = x[i];
x[i] = x[--n];
x[n] = v;
}
return x;
}, "~A");
c$.parseDSV = $_M(c$, "parseDSV", 
function (dataPoints, xFactor, yFactor) {
var point;
var xval = 0;
var yval = 0;
var xyCoords =  new JU.List ();
var delim = " \t\n\r\f,;";
var st =  new java.util.StringTokenizer (dataPoints, delim);
var tmp1;
var tmp2;
while (st.hasMoreTokens ()) {
tmp1 = st.nextToken ().trim ();
tmp2 = st.nextToken ().trim ();
xval = Double.parseDouble (tmp1);
yval = Double.parseDouble (tmp2);
point =  new JSV.common.Coordinate ().set (xval * xFactor, yval * yFactor);
xyCoords.addLast (point);
}
var coord =  new Array (xyCoords.size ());
return xyCoords.toArray (coord);
}, "~S,~N,~N");
c$.deltaX = $_M(c$, "deltaX", 
function (last, first, numPoints) {
var test = (last - first) / (numPoints - 1);
return test;
}, "~N,~N,~N");
c$.removeScale = $_M(c$, "removeScale", 
function (xyCoords, xScale, yScale) {
JSV.common.Coordinate.applyScale (xyCoords, (1 / xScale), (1 / yScale));
}, "~A,~N,~N");
c$.applyScale = $_M(c$, "applyScale", 
function (xyCoords, xScale, yScale) {
if (xScale != 1 || yScale != 1) {
for (var i = 0; i < xyCoords.length; i++) {
xyCoords[i].setXVal (xyCoords[i].getXVal () * xScale);
xyCoords[i].setYVal (xyCoords[i].getYVal () * yScale);
}
}}, "~A,~N,~N");
c$.applyShiftReference = $_M(c$, "applyShiftReference", 
function (xyCoords, dataPointNum, firstX, lastX, offset, observedFreq, shiftRefType) {
if (dataPointNum > xyCoords.length || dataPointNum < 0) return;
var coord;
switch (shiftRefType) {
case 0:
offset = xyCoords[xyCoords.length - dataPointNum].getXVal () - offset * observedFreq;
break;
case 1:
offset = firstX - offset * observedFreq;
break;
case 2:
offset = lastX + offset;
break;
}
for (var index = 0; index < xyCoords.length; index++) {
coord = xyCoords[index];
coord.setXVal (coord.getXVal () - offset);
xyCoords[index] = coord;
}
firstX -= offset;
lastX -= offset;
}, "~A,~N,~N,~N,~N,~N,~N");
c$.getMinX = $_M(c$, "getMinX", 
function (coords, start, end) {
var min = 1.7976931348623157E308;
for (var index = start; index < end; index++) {
var tmp = coords[index].getXVal ();
if (tmp < min) min = tmp;
}
return min;
}, "~A,~N,~N");
c$.getMinX = $_M(c$, "getMinX", 
function (spectra, vd) {
var min = 1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = JSV.common.Coordinate.getMinX (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i));
if (tmp < min) min = tmp;
}
return min;
}, "JU.List,JSV.common.ViewData");
c$.getMaxX = $_M(c$, "getMaxX", 
function (coords, start, end) {
var max = -1.7976931348623157E308;
for (var index = start; index < end; index++) {
var tmp = coords[index].getXVal ();
if (tmp > max) max = tmp;
}
return max;
}, "~A,~N,~N");
c$.getMaxX = $_M(c$, "getMaxX", 
function (spectra, vd) {
var max = -1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = JSV.common.Coordinate.getMaxX (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i));
if (tmp > max) max = tmp;
}
return max;
}, "JU.List,JSV.common.ViewData");
c$.getMinY = $_M(c$, "getMinY", 
function (coords, start, end) {
var min = 1.7976931348623157E308;
for (var index = start; index < end; index++) {
var tmp = coords[index].getYVal ();
if (tmp < min) min = tmp;
}
return min;
}, "~A,~N,~N");
c$.getMinYUser = $_M(c$, "getMinYUser", 
function (spectra, vd) {
var min = 1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var u = spectra.get (i).getUserYFactor ();
var yref = spectra.get (i).getYRef ();
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = (JSV.common.Coordinate.getMinY (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i)) - yref) * u + yref;
if (tmp < min) min = tmp;
}
return min;
}, "JU.List,JSV.common.ViewData");
c$.getMaxY = $_M(c$, "getMaxY", 
function (coords, start, end) {
var max = -1.7976931348623157E308;
for (var index = start; index < end; index++) {
var tmp = coords[index].getYVal ();
if (tmp > max) max = tmp;
}
return max;
}, "~A,~N,~N");
c$.getMaxYUser = $_M(c$, "getMaxYUser", 
function (spectra, vd) {
var max = -1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var u = spectra.get (i).getUserYFactor ();
var yref = spectra.get (i).getYRef ();
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = (JSV.common.Coordinate.getMaxY (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i)) - yref) * u + yref;
if (tmp > max) max = tmp;
}
return max;
}, "JU.List,JSV.common.ViewData");
c$.getYValueAt = $_M(c$, "getYValueAt", 
function (xyCoords, xPt) {
var i = JSV.common.Coordinate.getNearestIndexForX (xyCoords, xPt);
if (i == 0 || i == xyCoords.length) return NaN;
var x1 = xyCoords[i].getXVal ();
var x0 = xyCoords[i - 1].getXVal ();
var y1 = xyCoords[i].getYVal ();
var y0 = xyCoords[i - 1].getYVal ();
if (x1 == x0) return y1;
return y0 + (y1 - y0) / (x1 - x0) * (xPt - x0);
}, "~A,~N");
c$.intoRange = $_M(c$, "intoRange", 
function (i, i0, i1) {
return Math.max (Math.min (i, i1), i0);
}, "~N,~N,~N");
c$.intoRange = $_M(c$, "intoRange", 
function (x, x0, x1) {
return Math.max (Math.min (x, x1), x0);
}, "~N,~N,~N");
c$.getNearestIndexForX = $_M(c$, "getNearestIndexForX", 
function (xyCoords, xPt) {
var x =  new JSV.common.Coordinate ().set (xPt, 0);
var i = java.util.Arrays.binarySearch (xyCoords, x, JSV.common.Coordinate.c);
if (i < 0) i = -1 - i;
if (i < 0) return 0;
if (i > xyCoords.length - 1) return xyCoords.length - 1;
return i;
}, "~A,~N");
c$.findXForPeakNearest = $_M(c$, "findXForPeakNearest", 
function (xyCoords, x, isMin) {
var pt = JSV.common.Coordinate.getNearestIndexForX (xyCoords, x);
var f = (isMin ? -1 : 1);
while (pt < xyCoords.length - 1 && f * (xyCoords[pt + 1].yVal - xyCoords[pt].yVal) > 0) pt++;

while (pt >= 1 && f * (xyCoords[pt - 1].yVal - xyCoords[pt].yVal) > 0) pt--;

if (pt == 0 || pt == xyCoords.length - 1) return xyCoords[pt].xVal;
return JSV.common.Coordinate.parabolicInterpolation (xyCoords, pt);
}, "~A,~N,~B");
c$.parabolicInterpolation = $_M(c$, "parabolicInterpolation", 
function (xyCoords, pt) {
var alpha = xyCoords[pt - 1].yVal;
var beta = xyCoords[pt].yVal;
var gamma = xyCoords[pt + 1].yVal;
var p = (alpha - gamma) / 2 / (alpha - 2 * beta + gamma);
return xyCoords[pt].xVal + p * (xyCoords[pt + 1].xVal - xyCoords[pt].xVal);
}, "~A,~N");
c$.getPickedCoordinates = $_M(c$, "getPickedCoordinates", 
function (coordsClicked, coordClicked, coord, actualCoord) {
if (coordClicked == null) return false;
var x = coordClicked.getXVal ();
coord.setXVal (x);
coord.setYVal (coordClicked.getYVal ());
if (actualCoord == null) return true;
var pt = JSV.common.Coordinate.getNearestIndexForX (coordsClicked, x);
actualCoord.setXVal (coordsClicked[pt].getXVal ());
actualCoord.setYVal (coordsClicked[pt].getYVal ());
return true;
}, "~A,JSV.common.Coordinate,JSV.common.Coordinate,JSV.common.Coordinate");
c$.shiftX = $_M(c$, "shiftX", 
function (xyCoords, dx) {
for (var i = xyCoords.length; --i >= 0; ) xyCoords[i].xVal += dx;

}, "~A,~N");
c$.getNearestXWithYAbove = $_M(c$, "getNearestXWithYAbove", 
function (xyCoords, x, y, inverted, andGreaterThanX) {
var pt = JSV.common.Coordinate.getNearestIndexForX (xyCoords, x);
var f = (inverted ? -1 : 1);
if (andGreaterThanX) while (pt < xyCoords.length && f * (xyCoords[pt].yVal - y) < 0) pt++;

 else while (pt >= 0 && f * (xyCoords[pt].yVal - y) < 0) pt--;

if (pt == -1 || pt == xyCoords.length) return NaN;
return JSV.common.Coordinate.findXForPeakNearest (xyCoords, xyCoords[pt].getXVal (), inverted);
}, "~A,~N,~N,~B,~B");
c$.c = c$.prototype.c =  new JSV.common.CoordComparator ();
});
