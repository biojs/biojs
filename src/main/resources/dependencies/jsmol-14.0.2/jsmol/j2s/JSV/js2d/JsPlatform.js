Clazz.declarePackage ("JSV.js2d");
Clazz.load (["javajs.api.GenericPlatform"], "JSV.js2d.JsPlatform", ["java.net.URL", "JU.AjaxURLStreamHandlerFactory", "JSV.js2d.Display", "$.Image", "$.JsFile", "$.JsFont", "$.Mouse"], function () {
c$ = Clazz.decorateAsClass (function () {
this.canvas = null;
this.viewer = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsPlatform", null, javajs.api.GenericPlatform);
$_V(c$, "setViewer", 
function (viewer, canvas) {
{
this.viewer = viewer;
this.canvas = canvas;
if (canvas != null) {
this.context = canvas.getContext("2d");
canvas.imgdata = this.context.getImageData(0, 0, canvas.width, canvas.height);
canvas.buf8 = canvas.imgdata.data;
}
}try {
java.net.URL.setURLStreamHandlerFactory ( new JU.AjaxURLStreamHandlerFactory ());
} catch (e) {
}
}, "javajs.api.PlatformViewer,~O");
$_V(c$, "isSingleThreaded", 
function () {
return true;
});
$_V(c$, "getJsObjectInfo", 
function (jsObject, method, args) {
{
if (method == "localName")return jsObject[0]["nodeName"];
return (args == null ? jsObject[0][method] : jsObject[0][method](args[0]));
}}, "~A,~S,~A");
$_V(c$, "isHeadless", 
function () {
return false;
});
$_M(c$, "getMouseManager", 
function (privateKey, jsvp) {
return  new JSV.js2d.Mouse (jsvp);
}, "~N,~O");
$_V(c$, "convertPointFromScreen", 
function (canvas, ptTemp) {
JSV.js2d.Display.convertPointFromScreen (canvas, ptTemp);
}, "~O,JU.P3");
$_V(c$, "getFullScreenDimensions", 
function (canvas, widthHeight) {
JSV.js2d.Display.getFullScreenDimensions (canvas, widthHeight);
}, "~O,~A");
$_V(c$, "getMenuPopup", 
function (menuStructure, type) {
return null;
}, "~S,~S");
$_V(c$, "hasFocus", 
function (canvas) {
return JSV.js2d.Display.hasFocus (canvas);
}, "~O");
$_V(c$, "prompt", 
function (label, data, list, asButtons) {
return JSV.js2d.Display.prompt (label, data, list, asButtons);
}, "~S,~S,~A,~B");
$_V(c$, "renderScreenImage", 
function (context, size) {
JSV.js2d.Display.renderScreenImage (this.viewer, context, size);
}, "~O,~O");
$_V(c$, "drawImage", 
function (context, canvas, x, y, width, height) {
JSV.js2d.Image.drawImage (context, canvas, x, y, width, height);
}, "~O,~O,~N,~N,~N,~N");
$_V(c$, "requestFocusInWindow", 
function (canvas) {
JSV.js2d.Display.requestFocusInWindow (canvas);
}, "~O");
$_V(c$, "repaint", 
function (canvas) {
JSV.js2d.Display.repaint (canvas);
}, "~O");
$_V(c$, "setTransparentCursor", 
function (canvas) {
JSV.js2d.Display.setTransparentCursor (canvas);
}, "~O");
$_V(c$, "setCursor", 
function (c, canvas) {
JSV.js2d.Display.setCursor (c, canvas);
}, "~N,~O");
$_V(c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, isImageWrite) {
return JSV.js2d.Image.allocateRgbImage (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, (isImageWrite ? null : this.canvas));
}, "~N,~N,~A,~N,~B,~B");
$_V(c$, "notifyEndOfRendering", 
function () {
});
$_V(c$, "createImage", 
function (data) {
return null;
}, "~O");
$_V(c$, "disposeGraphics", 
function (gOffscreen) {
}, "~O");
$_V(c$, "grabPixels", 
function (canvas, width, height, pixels, startRow, nRows) {
{
if (canvas.image && (width != canvas.width || height != canvas.height))
Jmol._setCanvasImage(canvas, width, height);
if (canvas.buf32) return canvas.buf32;
}var buf = JSV.js2d.Image.grabPixels (JSV.js2d.Image.getGraphics (canvas), width, height);
{
canvas.buf32 = buf;
}return buf;
}, "~O,~N,~N,~A,~N,~N");
$_V(c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, canvas, width, height, bgcolor) {
return this.grabPixels (canvas, width, height, null, 0, 0);
}, "~O,~O,~O,~N,~N,~N");
$_V(c$, "getTextPixels", 
function (text, font3d, context, image, width, height, ascent) {
return JSV.js2d.Image.getTextPixels (text, font3d, context, width, height, ascent);
}, "~S,javajs.awt.Font,~O,~O,~N,~N,~N");
$_V(c$, "flushImage", 
function (imagePixelBuffer) {
}, "~O");
$_V(c$, "getGraphics", 
function (image) {
return JSV.js2d.Image.getGraphics (image);
}, "~O");
$_V(c$, "getImageHeight", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getHeight (canvas));
}, "~O");
$_V(c$, "getImageWidth", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getWidth (canvas));
}, "~O");
$_V(c$, "getStaticGraphics", 
function (image, backgroundTransparent) {
return JSV.js2d.Image.getStaticGraphics (image, backgroundTransparent);
}, "~O,~B");
$_V(c$, "newBufferedImage", 
function (image, w, h) {
{
if (typeof Jmol != "undefined" && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.viewer.applet, "stereoImage", w, h);
}return null;
}, "~O,~N,~N");
$_V(c$, "newOffScreenImage", 
function (w, h) {
{
if (typeof Jmol != "undefined" && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.viewer.applet, "textImage", w, h);
}return null;
}, "~N,~N");
$_V(c$, "waitForDisplay", 
function (echoNameAndPath, zipBytes) {
{
if (typeof Jmol == "undefined" || !Jmol._getHiddenCanvas) return false;
var viewer = this.viewer;
var sc = viewer.getEvalContextAndHoldQueue(viewer.eval);
var echoName = echoNameAndPath[0];
return Jmol._loadImage(this, echoNameAndPath, zipBytes,
function(canvas, pathOrError) { viewer.loadImageData(canvas, pathOrError, echoName, sc) }
);
}}, "~O,~O");
$_V(c$, "fontStringWidth", 
function (font, text) {
return JSV.js2d.JsFont.stringWidth (font, text);
}, "javajs.awt.Font,~S");
$_V(c$, "getFontAscent", 
function (context) {
return JSV.js2d.JsFont.getAscent (context);
}, "~O");
$_V(c$, "getFontDescent", 
function (context) {
return JSV.js2d.JsFont.getDescent (context);
}, "~O");
$_V(c$, "getFontMetrics", 
function (font, context) {
return JSV.js2d.JsFont.getFontMetrics (font, context);
}, "javajs.awt.Font,~O");
$_V(c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return JSV.js2d.JsFont.newFont (fontFace, isBold, isItalic, fontSize, "px");
}, "~S,~B,~B,~N");
$_V(c$, "getDateFormat", 
function (isoiec8824) {
{
if (isoiec8824) {
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + d.getMonth(); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
}
return ("" + (new Date())).split(" (")[0];
}}, "~B");
$_V(c$, "newFile", 
function (name) {
return  new JSV.js2d.JsFile (name);
}, "~S");
$_V(c$, "getBufferedFileInputStream", 
function (name) {
return null;
}, "~S");
$_V(c$, "getBufferedURLInputStream", 
function (url, outputBytes, post) {
return JSV.js2d.JsFile.getBufferedURLInputStream (url, outputBytes, post);
}, "java.net.URL,~A,~S");
$_M(c$, "getMouseManager", 
function (jsvp) {
return  new JSV.js2d.Mouse (jsvp);
}, "JSV.api.JSVPanel");
$_V(c$, "getLocalUrl", 
function (fileName) {
return null;
}, "~S");
});
