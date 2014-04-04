Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.api.VisibleInterface"], "JSV.common.Visible", null, function () {
c$ = Clazz.declareType (JSV.common, "Visible", null, JSV.api.VisibleInterface);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "getColour", 
function (xyCoords, Yunits) {
var ind400 = 0;
var ind437 = 0;
var ind499 = 0;
var ind700 = 0;
for (var i = 0; i < xyCoords.length; i++) {
if (xyCoords[i].getXVal () < 401) {
ind400 = i;
}if (xyCoords[i].getXVal () < 438) {
ind437 = i;
}if (xyCoords[i].getXVal () < 500) {
ind499 = i;
}if (xyCoords[i].getXVal () < 701) {
ind700 = i;
}}
var firstX = xyCoords[0].getXVal ();
var lastX = xyCoords[xyCoords.length - 1].getXVal ();
var matrixx =  Clazz.newDoubleArray (1000, 0);
var matrixy =  Clazz.newDoubleArray (1000, 0);
var matrixz =  Clazz.newDoubleArray (1000, 0);
var matrixcie =  Clazz.newDoubleArray (1000, 0);
if ((ind700 - ind400) <= 30 || firstX >= 401 || lastX <= 699) return null;
for (var i = ind400; i < ind437; i++) {
var x = xyCoords[i].getXVal ();
matrixx[(i - ind400)] = 0.335681 * Math.exp (-9.98224E-4 * (Math.pow ((x - 441.96), 2)));
matrixy[(i - ind400)] = 1.01832 * Math.exp (-2.8466E-4 * (Math.pow ((x - 559.04), 2)));
matrixz[(i - ind400)] = 1.63045 * Math.exp (-0.001586 * (Math.pow ((x - 437.406), 2)));
matrixcie[(i - ind400)] = 115.195 * Math.exp (-8.33988E-5 * (Math.pow ((x - 472.727), 2)));
}
for (var i = ind437; i < ind499; i++) {
var x = xyCoords[i].getXVal ();
matrixx[(i - ind400)] = 0.335681 * Math.exp (-9.98224E-4 * (Math.pow ((x - 441.96), 2)));
matrixy[(i - ind400)] = 1.01832 * Math.exp (-2.8466E-4 * (Math.pow ((x - 559.04), 2)));
matrixz[(i - ind400)] = 1.63045 * Math.exp (-4.3647E-4 * (Math.pow ((x - 437.406), 2)));
matrixcie[(i - ind400)] = 115.195 * Math.exp (-8.33988E-5 * (Math.pow ((x - 472.727), 2)));
}
for (var i = ind499; i < ind700; i++) {
var x = xyCoords[i].getXVal ();
matrixx[(i - ind400)] = 1.05583 * Math.exp (-4.4156E-4 * (Math.pow ((x - 596.124), 2)));
matrixy[(i - ind400)] = 1.01832 * Math.exp (-2.8466E-4 * (Math.pow ((x - 559.04), 2)));
matrixz[(i - ind400)] = 1.63045 * Math.exp (-4.3647E-4 * (Math.pow ((x - 437.406), 2)));
matrixcie[(i - ind400)] = 208.375 - (0.195278 * x);
}
var xup = 0;
var yup = 0;
var zup = 0;
var xdwn = 0;
var ydwn = 0;
var zdwn = 0;
if (Yunits.toLowerCase ().contains ("trans")) for (var i = ind400; i < ind700; i++) {
var y = xyCoords[i].getYVal ();
xup += (y * matrixx[(i - ind400)] * matrixcie[(i - ind400)]);
xdwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
yup += (y * matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
ydwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
zup += (y * matrixz[(i - ind400)] * matrixcie[(i - ind400)]);
zdwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
}
 else for (var i = ind400; i <= ind700; i++) {
var y = -Math.max (xyCoords[i].getYVal (), 0);
xup += (Math.pow (10, y) * matrixx[(i - ind400)] * matrixcie[(i - ind400)]);
xdwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
yup += (Math.pow (10, y) * matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
ydwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
zup += (Math.pow (10, y) * matrixz[(i - ind400)] * matrixcie[(i - ind400)]);
zdwn += (matrixy[(i - ind400)] * matrixcie[(i - ind400)]);
}
var x = xup / xdwn;
var y = yup / ydwn;
var z = zup / zdwn;
var matrixRGB = [(x * 3.241) + (y * (-1.5374)) + (z * (-0.4986)), (x * (-0.9692)) + (y * 1.876) + (z * 0.0416), (x * 0.0556) + (y * (-0.204)) + (z * 1.057)];
for (var i = 0; i < 3; i++) matrixRGB[i] = (matrixRGB[i] > 0.00304 ? (1.055 * (Math.pow (matrixRGB[i], 0.4166666666666667))) - 0.055 : 12.92 * matrixRGB[i]);

var red = JSV.common.Visible.fix (matrixRGB[0]);
var green = JSV.common.Visible.fix (matrixRGB[1]);
var blue = JSV.common.Visible.fix (matrixRGB[2]);
return ("" + red + "," + green + "," + blue);
}, "~A,~S");
c$.fix = $_M(c$, "fix", 
($fz = function (d) {
return (d <= 0 ? 0 : d >= 1 ? 255 : Math.round (255 * d));
}, $fz.isPrivate = true, $fz), "~N");
});
