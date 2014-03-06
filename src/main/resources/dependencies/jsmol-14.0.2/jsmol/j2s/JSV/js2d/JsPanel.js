Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVPanel"], "JSV.js2d.JsPanel", ["javajs.awt.Font", "JSV.common.JSViewer", "$.PanelData", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.apiPlatform = null;
this.pd = null;
this.mouse = null;
this.viewer = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsPanel", null, JSV.api.JSVPanel);
$_V(c$, "finalize", 
function () {
J.util.Logger.info ("JSVPanel " + this + " finalized");
});
$_V(c$, "getApiPlatform", 
function () {
return this.apiPlatform;
});
$_V(c$, "getPanelData", 
function () {
return this.pd;
});
c$.getPanelOne = $_M(c$, "getPanelOne", 
function (viewer, spectrum) {
var p =  new JSV.js2d.JsPanel (viewer);
p.pd.initOne (spectrum);
return p;
}, "JSV.common.JSViewer,JSV.common.JDXSpectrum");
c$.getPanelMany = $_M(c$, "getPanelMany", 
function (viewer, spectra, startIndex, endIndex) {
var p =  new JSV.js2d.JsPanel (viewer);
p.pd.initMany (spectra, startIndex, endIndex);
return p;
}, "JSV.common.JSViewer,JU.List,~N,~N");
Clazz.makeConstructor (c$, 
($fz = function (viewer) {
this.viewer = viewer;
this.pd =  new JSV.common.PanelData (this, viewer);
this.apiPlatform = viewer.apiPlatform;
this.mouse = this.apiPlatform.getMouseManager (0, this);
}, $fz.isPrivate = true, $fz), "JSV.common.JSViewer");
$_V(c$, "getTitle", 
function () {
return this.pd.getTitle ();
});
$_V(c$, "dispose", 
function () {
if (this.pd != null) this.pd.dispose ();
this.pd = null;
this.mouse.dispose ();
});
$_V(c$, "setTitle", 
function (title) {
this.pd.title = title;
this.name = title;
}, "~S");
$_M(c$, "setColorOrFont", 
function (ds, st) {
this.pd.setColorOrFont (ds, st);
}, "JSV.common.ColorParameters,JSV.common.ScriptToken");
$_V(c$, "setBackgroundColor", 
function (color) {
}, "javajs.api.GenericColor");
$_V(c$, "getInput", 
function (message, title, sval) {
var ret = null;
{
ret = prompt(message, sval);
}this.getFocusNow (true);
return ret;
}, "~S,~S,~S");
$_V(c$, "showMessage", 
function (msg, title) {
J.util.Logger.info (msg);
{
alert(msg);
}this.getFocusNow (true);
}, "~S,~S");
$_V(c$, "getFocusNow", 
function (asThread) {
this.pd.dialogsToFront ();
}, "~B");
$_V(c$, "getFontFaceID", 
function (name) {
return javajs.awt.Font.getFontFaceID ("SansSerif");
}, "~S");
$_V(c$, "doRepaint", 
function (andTaintAll) {
this.pd.taintedAll = new Boolean (this.pd.taintedAll | andTaintAll).valueOf ();
if (!this.pd.isPrinting) this.viewer.requestRepaint ();
}, "~B");
$_M(c$, "paintComponent", 
function (context) {
if (this.viewer == null || this.pd == null || this.pd.graphSets == null || this.pd.isPrinting) return;
var context2 = null;
{
context2 = context.canvas.topLayer.getContext("2d");
}this.pd.g2d = this.pd.g2d0;
this.pd.drawGraph (context, context2, this.getWidth (), this.getHeight (), false);
this.viewer.repaintDone ();
}, "~O");
$_V(c$, "printPanel", 
function (pl, os, title) {
pl.title = title;
pl.date = this.apiPlatform.getDateFormat (true);
this.pd.setPrint (pl, "Helvetica");
try {
(JSV.common.JSViewer.getInterface ("JSV.common.PDFWriter")).createPdfDocument (this, pl, os);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.showMessage (ex.toString (), "creating PDF");
} else {
throw ex;
}
} finally {
this.pd.setPrint (null, null);
}
}, "JSV.common.PrintLayout,java.io.OutputStream,~S");
$_V(c$, "saveImage", 
function (type, file) {
return null;
}, "~S,javajs.api.GenericFileInterface");
$_V(c$, "hasFocus", 
function () {
return false;
});
$_V(c$, "repaint", 
function () {
});
$_V(c$, "setToolTipText", 
function (s) {
}, "~S");
$_V(c$, "getHeight", 
function () {
return this.viewer.getHeight ();
});
$_V(c$, "getWidth", 
function () {
return this.viewer.getWidth ();
});
$_V(c$, "isEnabled", 
function () {
return false;
});
$_V(c$, "isFocusable", 
function () {
return false;
});
$_V(c$, "isVisible", 
function () {
return false;
});
$_V(c$, "setEnabled", 
function (b) {
}, "~B");
$_V(c$, "setFocusable", 
function (b) {
}, "~B");
$_V(c$, "toString", 
function () {
return this.pd.getSpectrumAt (0).toString ();
});
$_V(c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.mouse.processEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
$_V(c$, "processTwoPointGesture", 
function (touches) {
this.mouse.processTwoPointGesture (touches);
}, "~A");
});
