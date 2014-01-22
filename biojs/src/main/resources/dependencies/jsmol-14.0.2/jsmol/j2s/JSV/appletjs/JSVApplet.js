Clazz.declarePackage ("JSV.appletjs");
Clazz.load (["JSV.api.AppletFrame", "$.JSVAppletInterface"], "JSV.appletjs.JSVApplet", ["java.lang.Boolean", "java.net.URL", "java.util.Hashtable", "JU.PT", "JSV.app.JSVApp", "JSV.common.JSVersion", "JSV.js2d.JsPanel", "$.JsViewPanel", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.app = null;
this.viewer = null;
this.isStandalone = false;
this.viewerOptions = null;
this.htParams = null;
Clazz.instantialize (this, arguments);
}, JSV.appletjs, "JSVApplet", null, [JSV.api.JSVAppletInterface, JSV.api.AppletFrame]);
Clazz.makeConstructor (c$, 
function (viewerOptions) {
if (viewerOptions == null) viewerOptions =  new java.util.Hashtable ();
this.viewerOptions = viewerOptions;
this.htParams =  new java.util.Hashtable ();
for (var entry, $entry = viewerOptions.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.htParams.put (entry.getKey ().toLowerCase (), entry.getValue ());

this.init ();
}, "java.util.Map");
$_M(c$, "init", 
function () {
this.app =  new JSV.app.JSVApp (this, true);
this.initViewer ();
if (this.app.appletReadyCallbackFunctionName != null && this.viewer.fullName != null) this.callToJavaScript (this.app.appletReadyCallbackFunctionName, [this.viewer.appletID, this.viewer.fullName, Boolean.TRUE, this]);
});
$_M(c$, "initViewer", 
function () {
this.viewer = this.app.viewer;
this.setLogging ();
this.viewerOptions.remove ("debug");
var o = this.viewerOptions.get ("display");
{
o = document.getElementById(o);
}this.viewer.setDisplay (o);
J.util.Logger.info (this.getAppletInfo ());
});
$_M(c$, "setLogging", 
($fz = function () {
var iLevel = (this.getValue ("logLevel", (this.getBooleanValue ("debug", false) ? "5" : "4"))).charCodeAt (0) - 48;
if (iLevel != 4) System.out.println ("setting logLevel=" + iLevel + " -- To change, use script \"set logLevel [0-5]\"");
J.util.Logger.setLogLevel (iLevel);
}, $fz.isPrivate = true, $fz));
$_M(c$, "getParameter", 
function (paramName) {
var o = this.htParams.get (paramName.toLowerCase ());
return (o == null ? null :  String.instantialize (o.toString ()));
}, "~S");
$_M(c$, "getBooleanValue", 
($fz = function (propertyName, defaultValue) {
var value = this.getValue (propertyName, defaultValue ? "true" : "");
return (value.equalsIgnoreCase ("true") || value.equalsIgnoreCase ("on") || value.equalsIgnoreCase ("yes"));
}, $fz.isPrivate = true, $fz), "~S,~B");
$_M(c$, "getValue", 
($fz = function (propertyName, defaultValue) {
var stringValue = this.getParameter (propertyName);
System.out.println ("getValue " + propertyName + " = " + stringValue);
if (stringValue != null) return stringValue;
return defaultValue;
}, $fz.isPrivate = true, $fz), "~S,~S");
$_V(c$, "isPro", 
function () {
return this.app.isPro ();
});
$_V(c$, "isSigned", 
function () {
return this.app.isSigned ();
});
$_V(c$, "finalize", 
function () {
System.out.println ("JSpecView " + this + " finalized");
});
$_M(c$, "destroy", 
function () {
this.app.dispose ();
this.app = null;
});
$_M(c$, "getParameter", 
function (key, def) {
return this.isStandalone ? System.getProperty (key, def) : (this.getParameter (key) != null ? this.getParameter (key) : def);
}, "~S,~S");
$_V(c$, "getAppletInfo", 
function () {
return "JSpecView Applet " + JSV.common.JSVersion.VERSION;
});
$_V(c$, "getSolnColour", 
function () {
return this.app.getSolnColour ();
});
$_V(c$, "getCoordinate", 
function () {
return this.app.getCoordinate ();
});
$_V(c$, "loadInline", 
function (data) {
this.app.loadInline (data);
}, "~S");
$_M(c$, "$export", 
function (type, n) {
return this.app.exportSpectrum (type, n);
}, "~S,~N");
$_V(c$, "exportSpectrum", 
function (type, n) {
return this.app.exportSpectrum (type, n);
}, "~S,~N");
$_V(c$, "setFilePath", 
function (tmpFilePath) {
this.app.setFilePath (tmpFilePath);
}, "~S");
$_V(c$, "setSpectrumNumber", 
function (i) {
this.app.setSpectrumNumber (i);
}, "~N");
$_V(c$, "toggleGrid", 
function () {
this.app.toggleGrid ();
});
$_V(c$, "toggleCoordinate", 
function () {
this.app.toggleCoordinate ();
});
$_V(c$, "toggleIntegration", 
function () {
this.app.toggleIntegration ();
});
$_V(c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.app.addHighlight (x1, x2, r, g, b, a);
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "removeAllHighlights", 
function () {
this.app.removeAllHighlights ();
});
$_V(c$, "removeHighlight", 
function (x1, x2) {
this.app.removeHighlight (x1, x2);
}, "~N,~N");
$_V(c$, "reversePlot", 
function () {
this.app.reversePlot ();
});
$_M(c$, "script", 
function (script) {
this.app.initParams (script);
}, "~S");
$_V(c$, "runScript", 
function (script) {
this.app.runScript (script);
}, "~S");
$_V(c$, "syncScript", 
function (peakScript) {
this.app.syncScript (peakScript);
}, "~S");
$_V(c$, "writeStatus", 
function (msg) {
this.app.writeStatus (msg);
}, "~S");
$_V(c$, "getPropertyAsJavaObject", 
function (key) {
return this.app.getPropertyAsJavaObject (key);
}, "~S");
$_V(c$, "getPropertyAsJSON", 
function (key) {
return this.app.getPropertyAsJSON (key);
}, "~S");
$_V(c$, "runScriptNow", 
function (script) {
return this.app.runScriptNow (script);
}, "~S");
$_V(c$, "setDropTargetListener", 
function (isSigned, viewer) {
}, "~B,JSV.common.JSViewer");
$_V(c$, "validateContent", 
function (mode) {
}, "~N");
$_V(c$, "addNewPanel", 
function (viewer) {
viewer.viewPanel =  new JSV.js2d.JsViewPanel ();
}, "JSV.common.JSViewer");
$_V(c$, "newWindow", 
function (isSelected) {
}, "~B");
$_V(c$, "callToJavaScript", 
function (callback, data) {
var tokens = JU.PT.split (callback, ".");
{
try{
var o = window[tokens[0]]
for (var i = 1; i < tokens.length; i++){
o = o[tokens[i]]
}
return o(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9]);
} catch (e) {
System.out.println(callback + " failed " + e);
}
}}, "~S,~A");
$_V(c$, "setPanelVisible", 
function (b) {
}, "~B");
$_V(c$, "getJSVPanel", 
function (viewer, specs, initialStartIndex, initialEndIndex) {
return JSV.js2d.JsPanel.getPanelMany (viewer, specs, initialStartIndex, initialEndIndex);
}, "JSV.common.JSViewer,JU.List,~N,~N");
$_V(c$, "setVisible", 
function (b) {
}, "~B");
$_V(c$, "getDocumentBase", 
function () {
try {
return  new java.net.URL (Clazz.castNullAs ("java.net.URL"), this.viewerOptions.get ("documentBase"), null);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
$_V(c$, "repaint", 
function () {
});
$_V(c$, "validate", 
function () {
});
$_V(c$, "doExitJmol", 
function () {
});
$_V(c$, "getApp", 
function () {
return this.app;
});
});
