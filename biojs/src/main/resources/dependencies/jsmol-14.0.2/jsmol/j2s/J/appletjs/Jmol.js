Clazz.declarePackage ("J.appletjs");
Clazz.load (["J.util.GenericApplet", "java.util.Hashtable"], "J.appletjs.Jmol", ["JU.PT", "J.constant.EnumCallback", "J.util.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htParams = null;
Clazz.instantialize (this, arguments);
}, J.appletjs, "Jmol", J.util.GenericApplet);
Clazz.prepareFields (c$, function () {
this.htParams =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (viewerOptions) {
Clazz.superConstructor (this, J.appletjs.Jmol, []);
if (viewerOptions == null) viewerOptions =  new java.util.Hashtable ();
this.viewerOptions = viewerOptions;
for (var entry, $entry = viewerOptions.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.htParams.put (entry.getKey ().toLowerCase (), entry.getValue ());

this.documentBase = "" + viewerOptions.get ("documentBase");
this.codeBase = "" + viewerOptions.get ("codePath");
this.isJS = true;
this.init (this);
}, "java.util.Map");
$_V(c$, "setStereoGraphics", 
function (isStereo) {
{
if (isStereo)
return viewer.apiPlatform.context;
}return null;
}, "~B");
$_V(c$, "initOptions", 
function () {
this.viewerOptions.remove ("debug");
this.viewerOptions.put ("fullName", this.fullName);
this.haveDocumentAccess = "true".equalsIgnoreCase ("" + this.getValue ("allowjavascript", "true"));
this.mayScript = true;
});
$_V(c$, "getParameter", 
function (paramName) {
var o = this.htParams.get (paramName.toLowerCase ());
return (o == null ? null :  String.instantialize (o.toString ()));
}, "~S");
$_V(c$, "doSendJsTextStatus", 
function (message) {
System.out.println (message);
}, "~S");
$_V(c$, "doSendJsTextareaStatus", 
function (message) {
System.out.println (message);
}, "~S");
$_M(c$, "doNotifySync", 
function (info, appletName) {
var syncCallback = this.b$.get (J.constant.EnumCallback.SYNC);
if (!this.mayScript || syncCallback == null || !this.haveDocumentAccess && !syncCallback.startsWith ("Jmol.")) return info;
J.util.Logger.info ("Jmol.notifySync " + appletName + " >> " + info);
try {
{
if (syncCallback=="Jmol._mySyncCallback") return
Jmol._mySyncCallback(this.htmlName, info, appletName); var f
= eval(syncCallback); return f(this.htmlName, info,
appletName);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!this.haveNotifiedError) if (J.util.Logger.debugging) {
J.util.Logger.debug ("syncCallback call error to " + syncCallback + ": " + e);
}this.haveNotifiedError = true;
} else {
throw e;
}
}
return info;
}, "~S,~S");
$_V(c$, "doFunctionXY", 
function (functionName, nX, nY) {
var fxy =  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), 0);
if (!this.mayScript || !this.haveDocumentAccess || nX == 0 || nY == 0) return fxy;
try {
if (nX > 0 && nY > 0) {
for (var i = 0; i < nX; i++) for (var j = 0; j < nY; j++) {
{
fxy[i][j] = eval(functionName)(this.htmlName, i, j);
}}

} else if (nY > 0) {
var data;
{
data = eval(functionName)(this.htmlName, nX, nY);
}nX = Math.abs (nX);
var fdata =  Clazz.newFloatArray (nX * nY, 0);
J.util.Parser.parseStringInfestedFloatArray (data, null, fdata);
for (var i = 0, ipt = 0; i < nX; i++) {
for (var j = 0; j < nY; j++, ipt++) {
fxy[i][j] = fdata[ipt];
}
}
} else {
{
data = eval(functionName)(htmlName, nX, nY, fxy);
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error ("Exception " + e + " with nX, nY: " + nX + " " + nY);
} else {
throw e;
}
}
return fxy;
}, "~S,~N,~N");
$_V(c$, "doFunctionXYZ", 
function (functionName, nX, nY, nZ) {
var fxyz =  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), Math.abs (nZ), 0);
if (!this.mayScript || !this.haveDocumentAccess || nX == 0 || nY == 0 || nZ == 0) return fxyz;
try {
{
eval(functionName)(this.htmlName, nX, nY, nZ, fxyz);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error ("Exception " + e + " for " + functionName + " with nX, nY, nZ: " + nX + " " + nY + " " + nZ);
} else {
throw e;
}
}
return fxyz;
}, "~S,~N,~N,~N");
$_V(c$, "doShowDocument", 
function (url) {
{
window.open(url.toString());
}}, "java.net.URL");
$_V(c$, "doSendCallback", 
function (callback, data, strInfo) {
if (callback == null || callback.length == 0) {
} else if (callback.equals ("alert")) {
{
alert(strInfo); return "";
}} else {
var tokens = JU.PT.split (callback, ".");
{
try{
var o = window[tokens[0]];
for (var i = 1; i < tokens.length; i++)
o = o[tokens[i]];
for (var i = 0; i < data.length; i++)
data[i] && data[i].booleanValue && (data[i] = data[i].booleanValue());
return o(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7]);
} catch (e) { System.out.println(callback + " failed " + e); }
}}return "";
}, "~S,~A,~S");
$_V(c$, "doEval", 
function (strEval) {
try {
{
return "" + eval(strEval);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error ("# error evaluating " + strEval + ":" + e.toString ());
} else {
throw e;
}
}
return "";
}, "~S");
$_V(c$, "doShowStatus", 
function (message) {
try {
System.out.println (message);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S");
});
