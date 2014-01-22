Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVGraphics"], "JSV.js2d.JsG2D", ["javajs.awt.Color", "JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windowWidth = 0;
this.windowHeight = 0;
this.isShifted = false;
this.inPath = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsG2D", null, JSV.api.JSVGraphics);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "getColor4", 
function (r, g, b, a) {
return javajs.awt.Color.get4 (r, g, b, a);
}, "~N,~N,~N,~N");
$_V(c$, "getColor3", 
function (r, g, b) {
return javajs.awt.Color.get3 (r, g, b);
}, "~N,~N,~N");
$_V(c$, "getColor1", 
function (rgb) {
return javajs.awt.Color.get1 (rgb);
}, "~N");
$_V(c$, "newGrayScaleImage", 
function (context, image, width, height, grayBuffer) {
{
var id, canvas;
if (image == null) {
id = ("" + Math.random()).substring(3);
canvas = document.createElement("canvas");
canvas.id = id;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.width = width;
canvas.height = height;
var appId = context.canvas.applet._id;
var layer = document.getElementById(appId + "_imagelayer");
image = new Image();
image.canvas = canvas;
image.appId = appId;
image.id = appId + "_image";
image.layer = layer;
image.w = width;
image.h = height;
image.onload = function(e) {
try {
URL.revokeObjectURL(image.src);
} catch (e) {}
};
var div = document.createElement("div");
image.div = div;
div.style.position="relative";
layer.appendChild(div);
div.appendChild(image);
} else {
canvas = image.canvas;
}
var c = canvas.getContext("2d");
var imageData = c.getImageData(0, 0, width, height);
var buf = imageData.data;
var ng = grayBuffer.length;
var pt = 0;
for (var i = 0; i < ng; i++) {
buf[pt++] = buf[pt++] = buf[pt++] = grayBuffer[i];
buf[pt++] = 0xFF;
}
c.putImageData(imageData, 0, 0);
canvas.toBlob(function(blob){image.src = URL.createObjectURL(blob)});
}return image;
}, "~O,~O,~N,~N,~A");
$_V(c$, "drawGrayScaleImage", 
function (g, image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1) {
var iw;
var ih;
{
iw = image.w;
ih = image.h;
}var dw = (destX1 - destX0 + 1);
var dh = (destY1 - destY0 + 1);
var sw = (srcX1 - srcX0 + 1);
var sh = (srcY1 - srcY0 + 1);
var x = -srcX0 * dw / sw;
var w = iw * dw / sw;
var y = -srcY0 * dh / sh;
var h = ih * dh / sh;
{
image.width = w;
image.height = h;
var div = image.div;
var layer = image.layer;
layer.style.left = destX0 + "px";
layer.style.top = destY0 + "px";
layer.style.width = dw + "px";
layer.style.height = dh+ "px";
div.style.left= x + "px";
div.style.top = y + "px";
div.style.width = w + "px";
div.style.height = h + "px";
}}, "~O,~O,~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "drawLine", 
function (g, x0, y0, x1, y1) {
{
if (!this.inPath) g.beginPath();
g.moveTo(x0, y0);
g.lineTo(x1, y1);
if (!this.inPath) g.stroke();
}}, "~O,~N,~N,~N,~N");
$_V(c$, "drawCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.stroke();
}}, "~O,~N,~N,~N");
$_V(c$, "drawPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, false);
}, "~O,~A,~A,~N");
$_M(c$, "doPoly", 
($fz = function (g, axPoints, ayPoints, nPoints, doFill) {
{
g.beginPath();
g.moveTo(axPoints[0], ayPoints[0]);
for (var i = 1; i < nPoints; i++)
g.lineTo(axPoints[i], ayPoints[i]);
if (doFill)
g.fill();
else
g.stroke();
}}, $fz.isPrivate = true, $fz), "~O,~A,~A,~N,~B");
$_V(c$, "drawRect", 
function (g, x, y, width, height) {
{
g.beginPath();
g.rect(x ,y, width, height);
g.stroke();
}}, "~O,~N,~N,~N,~N");
$_V(c$, "drawString", 
function (g, s, x, y) {
{
g.fillText(s,x,y);
}}, "~O,~S,~N,~N");
$_V(c$, "drawStringRotated", 
function (g, s, x, y, angle) {
}, "~O,~S,~N,~N,~N");
$_V(c$, "fillBackground", 
function (g, bgcolor) {
if (bgcolor == null) {
{
if (!this.isShifted) {
g.translate(-0.5, -0.5);
this.isShifted = true;
}
g.clearRect(0,0, this.windowWidth, this.windowHeight);
return;
}}this.setGraphicsColor (g, bgcolor);
this.fillRect (g, 0, 0, this.windowWidth, this.windowHeight);
}, "~O,javajs.api.GenericColor");
$_V(c$, "fillCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.fill();
}}, "~O,~N,~N,~N");
$_V(c$, "fillPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, true);
}, "~O,~A,~A,~N");
$_V(c$, "fillRect", 
function (g, x, y, width, height) {
{
g.fillRect(x, y, width, height);
}}, "~O,~N,~N,~N,~N");
$_V(c$, "setGraphicsColor", 
function (g, c) {
var s = JU.CU.toCSSString (c);
{
g.fillStyle = g.strokeStyle = s;
}}, "~O,javajs.api.GenericColor");
$_V(c$, "setFont", 
function (g, font) {
var s = font.getInfo ();
var pt = s.indexOf (" ");
s = s.substring (0, pt) + "px" + s.substring (pt);
{
g.font = s;
}return font;
}, "~O,javajs.awt.Font");
$_V(c$, "setStrokeBold", 
function (g, tf) {
{
g.lineWidth = (tf ? 2 : 1);
}}, "~O,~B");
$_V(c$, "setWindowParameters", 
function (width, height) {
this.windowWidth = width;
this.windowHeight = height;
}, "~N,~N");
$_V(c$, "translateScale", 
function (g, x, y, scale) {
}, "~O,~N,~N,~N");
$_V(c$, "canDoLineTo", 
function () {
return true;
});
$_V(c$, "doStroke", 
function (g, isBegin) {
{
this.inPath = isBegin;
if (isBegin) {
g.beginPath();
} else {
g.stroke();
}
}}, "~O,~B");
$_V(c$, "lineTo", 
function (g, x2, y2) {
{
g.lineTo(x2, y2);
}}, "~O,~N,~N");
});
