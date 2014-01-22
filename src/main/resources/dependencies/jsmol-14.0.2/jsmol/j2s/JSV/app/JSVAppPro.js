Clazz.declarePackage ("JSV.app");
Clazz.load (["JSV.app.JSVApp", "J.api.JSVInterface"], "JSV.app.JSVAppPro", null, function () {
c$ = Clazz.declareType (JSV.app, "JSVAppPro", JSV.app.JSVApp, J.api.JSVInterface);
$_V(c$, "isSigned", 
function () {
return true;
});
$_V(c$, "isPro", 
function () {
return true;
});
$_V(c$, "exitJSpecView", 
function (withDialog, frame) {
this.appletFrame.doExitJmol ();
}, "~B,~O");
$_V(c$, "siProcessCommand", 
function (script) {
this.appletFrame.getApp ().runScriptNow (script);
}, "~S");
$_V(c$, "saveProperties", 
function (properties) {
}, "java.util.Properties");
$_V(c$, "setProperties", 
function (properties) {
}, "java.util.Properties");
});
