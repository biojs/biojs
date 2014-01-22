Clazz.declarePackage ("J.util");
Clazz.load (["J.api.JmolAppletInterface", "$.JmolStatusListener", "java.util.Hashtable"], "J.util.GenericApplet", ["java.lang.Boolean", "java.net.URL", "javajs.awt.Dimension", "JU.List", "$.PT", "$.SB", "J.constant.EnumCallback", "J.i18n.GT", "J.util.Escape", "$.Logger", "J.viewer.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isJS = false;
this.codeBase = null;
this.documentBase = null;
this.isSigned = false;
this.language = null;
this.doTranslate = true;
this.haveDocumentAccess = false;
this.isStereoSlave = false;
this.mayScript = false;
this.htmlName = null;
this.fullName = null;
this.statusForm = null;
this.statusText = null;
this.statusTextarea = null;
this.gRight = null;
this.viewer = null;
this.b$ = null;
this.viewerOptions = null;
this.haveNotifiedError = false;
this.appletObject = null;
this.isJNLP = false;
this.loading = false;
this.syncId = null;
this.outputBuffer = null;
Clazz.instantialize (this, arguments);
}, J.util, "GenericApplet", null, [J.api.JmolAppletInterface, J.api.JmolStatusListener]);
Clazz.prepareFields (c$, function () {
this.b$ =  new java.util.Hashtable ();
});
$_M(c$, "init", 
function (applet) {
this.appletObject = applet;
this.htmlName = this.getParameter ("name");
this.syncId = this.getParameter ("syncId");
this.fullName = this.htmlName + "__" + this.syncId + "__";
System.out.println ("Jmol JavaScript applet " + this.fullName + " initializing");
var iLevel = (this.getValue ("logLevel", (this.getBooleanValue ("debug", false) ? "5" : "4"))).charCodeAt (0) - 48;
if (iLevel != 4) System.out.println ("setting logLevel=" + iLevel + " -- To change, use script \"set logLevel [0-5]\"");
J.util.Logger.setLogLevel (iLevel);
J.i18n.GT.ignoreApplicationBundle ();
this.initOptions ();
J.util.GenericApplet.checkIn (this.fullName, this.appletObject);
this.initApplication ();
}, "~O");
$_M(c$, "initApplication", 
($fz = function () {
this.viewerOptions.put ("applet", Boolean.TRUE);
if (this.getParameter ("statusListener") == null) this.viewerOptions.put ("statusListener", this);
this.viewer =  new J.viewer.Viewer (this.viewerOptions);
this.viewer.pushHoldRepaint ();
var emulate = this.getValueLowerCase ("emulate", "jmol");
this.setStringProperty ("defaults", emulate.equals ("chime") ? "RasMol" : "Jmol");
this.setStringProperty ("backgroundColor", this.getValue ("bgcolor", this.getValue ("boxbgcolor", "black")));
this.viewer.setBooleanProperty ("frank", true);
this.loading = true;
for (var item, $item = 0, $$item = J.constant.EnumCallback.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) this.setValue (item.name () + "Callback", null);

this.loading = false;
this.language = this.getParameter ("language");
 new J.i18n.GT (this.viewer, this.language);
if (this.language != null) System.out.print ("requested language=" + this.language + "; ");
this.doTranslate = (!"none".equals (this.language) && this.getBooleanValue ("doTranslate", true));
this.language = J.i18n.GT.getLanguage ();
System.out.println ("language=" + this.language);
if (this.b$.get (J.constant.EnumCallback.SCRIPT) == null && this.b$.get (J.constant.EnumCallback.ERROR) == null) if (this.b$.get (J.constant.EnumCallback.MESSAGE) != null || this.statusForm != null || this.statusText != null) {
if (this.doTranslate && (this.getValue ("doTranslate", null) == null)) {
this.doTranslate = false;
J.util.Logger.warn ("Note -- Presence of message callback disables disable translation; to enable message translation use jmolSetTranslation(true) prior to jmolApplet()");
}if (this.doTranslate) J.util.Logger.warn ("Note -- Automatic language translation may affect parsing of message callbacks messages; use scriptCallback or errorCallback to process errors");
}if (!this.doTranslate) {
J.i18n.GT.setDoTranslate (false);
J.util.Logger.warn ("Note -- language translation disabled");
}if (!this.getBooleanValue ("popupMenu", true)) this.viewer.getProperty ("DATA_API", "disablePopupMenu", null);
var script = this.getValue ("script", "");
var loadParam = this.getValue ("loadInline", null);
if (loadParam == null) {
if ((loadParam = this.getValue ("load", null)) != null) script = "load \"" + loadParam + "\";" + script;
loadParam = null;
}this.viewer.popHoldRepaint ("applet init");
if (loadParam != null && this.viewer.loadInline (loadParam) != null) script = "";
if (script.length > 0) this.scriptProcessor (script, null, 2);
this.viewer.notifyStatusReady (true);
}, $fz.isPrivate = true, $fz));
$_V(c$, "destroy", 
function () {
this.gRight = null;
this.viewer.notifyStatusReady (false);
this.viewer = null;
J.util.GenericApplet.checkOut (this.fullName);
});
$_M(c$, "getBooleanValue", 
function (propertyName, defaultValue) {
var value = this.getValue (propertyName, defaultValue ? "true" : "");
return (value.equalsIgnoreCase ("true") || value.equalsIgnoreCase ("on") || value.equalsIgnoreCase ("yes"));
}, "~S,~B");
$_M(c$, "getValue", 
function (propertyName, defaultValue) {
var s = this.getParameter (propertyName);
System.out.println ("Jmol getValue " + propertyName + " " + s);
return (s == null ? defaultValue : s);
}, "~S,~S");
$_M(c$, "getValueLowerCase", 
($fz = function (paramName, defaultValue) {
var value = this.getValue (paramName, defaultValue);
if (value != null) {
value = value.trim ().toLowerCase ();
if (value.length == 0) value = null;
}return value;
}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "setValue", 
($fz = function (name, defaultValue) {
this.setStringProperty (name, this.getValue (name, defaultValue));
}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "setStringProperty", 
($fz = function (name, value) {
if (value == null) return;
J.util.Logger.info (name + " = \"" + value + "\"");
this.viewer.setStringProperty (name, value);
}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "scriptProcessor", 
($fz = function (script, statusParams, processType) {
if (script == null || script.length == 0) return "";
switch (processType) {
case 0:
var err = this.viewer.scriptCheck (script);
return (Clazz.instanceOf (err, String) ? err : "");
case 1:
if (statusParams != null) return this.viewer.scriptWaitStatus (script, statusParams).toString ();
return this.viewer.scriptWait (script);
case 2:
default:
return this.viewer.script (script);
}
}, $fz.isPrivate = true, $fz), "~S,~S,~N");
$_V(c$, "register", 
function (id, jsi) {
J.util.GenericApplet.checkIn (id, jsi);
}, "~S,J.api.JmolSyncInterface");
$_V(c$, "getJSpecViewProperty", 
function (key) {
return null;
}, "~S");
$_M(c$, "syncScript", 
function (script) {
this.viewer.syncScript (script, "~", 0);
}, "~S");
$_V(c$, "handleEvent", 
function (e) {
if (this.viewer == null) return false;
return this.viewer.processMouseEvent (e.id, e.x, e.y, e.modifiers, e.when);
}, "java.awt.Event");
$_V(c$, "getAppletInfo", 
function () {
return J.i18n.GT.o (J.i18n.GT._ ("Jmol Applet version {0} {1}.\n\nAn OpenScience project.\n\nSee http://www.jmol.org for more information"), [J.viewer.JC.version, J.viewer.JC.date]) + "\nhtmlName = " + J.util.Escape.eS (this.htmlName) + "\nsyncId = " + J.util.Escape.eS (this.syncId) + "\ndocumentBase = " + J.util.Escape.eS (this.documentBase) + "\ncodeBase = " + J.util.Escape.eS (this.codeBase);
});
$_V(c$, "script", 
function (script) {
this.scriptNoWait (script);
}, "~S");
$_V(c$, "scriptCheck", 
function (script) {
if (script == null || script.length == 0) return "";
return this.scriptProcessor (script, null, 0);
}, "~S");
$_V(c$, "scriptNoWait", 
function (script) {
if (script == null || script.length == 0) return "";
return this.scriptProcessor (script, null, 2);
}, "~S");
$_M(c$, "scriptWait", 
function (script) {
return this.scriptWait (script, null);
}, "~S");
$_M(c$, "scriptWait", 
function (script, statusParams) {
if (script == null || script.length == 0) return "";
this.outputBuffer = null;
return this.scriptProcessor (script, statusParams, 1);
}, "~S,~S");
$_V(c$, "scriptWaitOutput", 
function (script) {
if (script == null || script.length == 0) return "";
this.outputBuffer =  new JU.SB ();
this.viewer.scriptWaitStatus (script, "");
var str = (this.outputBuffer == null ? "" : this.outputBuffer.toString ());
this.outputBuffer = null;
return str;
}, "~S");
$_V(c$, "getProperty", 
function (infoType, paramInfo) {
{
paramInfo || (paramInfo = "");
}return this.viewer.getProperty (null, infoType, paramInfo);
}, "~S,~S");
$_V(c$, "getPropertyAsString", 
function (infoType, paramInfo) {
{
paramInfo || (paramInfo = "");
}return this.viewer.getProperty ("readable", infoType, paramInfo).toString ();
}, "~S,~S");
$_V(c$, "getPropertyAsJSON", 
function (infoType, paramInfo) {
{
paramInfo || (paramInfo = "");
}return this.viewer.getProperty ("JSON", infoType, paramInfo).toString ();
}, "~S,~S");
$_V(c$, "loadInlineString", 
function (strModel, script, isAppend) {
var errMsg = this.viewer.loadInlineAppend (strModel, isAppend);
if (errMsg == null) this.script (script);
return errMsg;
}, "~S,~S,~B");
$_V(c$, "loadInlineArray", 
function (strModels, script, isAppend) {
if (strModels == null || strModels.length == 0) return null;
var errMsg = this.viewer.loadInline (strModels, isAppend);
if (errMsg == null) this.script (script);
return errMsg;
}, "~A,~S,~B");
$_V(c$, "loadDOMNode", 
function (DOMNode) {
return this.viewer.openDOM (DOMNode);
}, "~O");
$_M(c$, "loadInline", 
function (strModel) {
return this.loadInlineString (strModel, "", false);
}, "~S");
$_M(c$, "loadInline", 
function (strModel, script) {
return this.loadInlineString (strModel, script, false);
}, "~S,~S");
$_M(c$, "loadInline", 
function (strModels) {
return this.loadInlineArray (strModels, "", false);
}, "~A");
$_M(c$, "loadInline", 
function (strModels, script) {
return this.loadInlineArray (strModels, script, false);
}, "~A,~S");
$_M(c$, "output", 
function (s) {
if (this.outputBuffer != null && s != null) this.outputBuffer.append (s).appendC ('\n');
}, "~S");
$_V(c$, "setCallbackFunction", 
function (callbackName, callbackFunction) {
if (callbackName.equalsIgnoreCase ("modelkit")) return;
if (callbackName.equalsIgnoreCase ("language")) {
this.consoleMessage ("");
this.consoleMessage (null);
return;
}var callback = J.constant.EnumCallback.getCallback (callbackName);
if (callback != null && (this.loading || callback !== J.constant.EnumCallback.EVAL)) {
if (callbackFunction == null) this.b$.remove (callback);
 else this.b$.put (callback, callbackFunction);
return;
}this.consoleMessage ("Available callbacks include: " + J.constant.EnumCallback.getNameList ().$replace (';', ' ').trim ());
}, "~S,~S");
$_M(c$, "consoleMessage", 
($fz = function (message) {
this.notifyCallback (J.constant.EnumCallback.ECHO, ["", message]);
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "notifyEnabled", 
function (type) {
switch (type) {
case J.constant.EnumCallback.ECHO:
case J.constant.EnumCallback.MESSAGE:
case J.constant.EnumCallback.MEASURE:
case J.constant.EnumCallback.PICK:
case J.constant.EnumCallback.SYNC:
return true;
case J.constant.EnumCallback.ANIMFRAME:
case J.constant.EnumCallback.ERROR:
case J.constant.EnumCallback.EVAL:
case J.constant.EnumCallback.LOADSTRUCT:
case J.constant.EnumCallback.STRUCTUREMODIFIED:
case J.constant.EnumCallback.SCRIPT:
return !this.isJNLP;
case J.constant.EnumCallback.APPLETREADY:
case J.constant.EnumCallback.ATOMMOVED:
case J.constant.EnumCallback.CLICK:
case J.constant.EnumCallback.HOVER:
case J.constant.EnumCallback.MINIMIZATION:
case J.constant.EnumCallback.RESIZE:
break;
}
return (this.b$.get (type) != null);
}, "J.constant.EnumCallback");
$_M(c$, "notifyCallback", 
function (type, data) {
var callback = this.b$.get (type);
var doCallback = (callback != null && (data == null || data[0] == null));
var toConsole = false;
if (data != null) data[0] = this.htmlName;
var strInfo = (data == null || data[1] == null ? null : data[1].toString ());
switch (type) {
case J.constant.EnumCallback.APPLETREADY:
data[3] = this.appletObject;
break;
case J.constant.EnumCallback.ERROR:
case J.constant.EnumCallback.EVAL:
case J.constant.EnumCallback.HOVER:
case J.constant.EnumCallback.MINIMIZATION:
case J.constant.EnumCallback.RESIZE:
break;
case J.constant.EnumCallback.CLICK:
if ("alert".equals (callback)) strInfo = "x=" + data[1] + " y=" + data[2] + " action=" + data[3] + " clickCount=" + data[4];
break;
case J.constant.EnumCallback.ANIMFRAME:
var iData = data[1];
var frameNo = iData[0];
var fileNo = iData[1];
var modelNo = iData[2];
var firstNo = iData[3];
var lastNo = iData[4];
var isAnimationRunning = (frameNo <= -2);
var animationDirection = (firstNo < 0 ? -1 : 1);
var currentDirection = (lastNo < 0 ? -1 : 1);
if (doCallback) {
data = [this.htmlName, Integer.$valueOf (Math.max (frameNo, -2 - frameNo)), Integer.$valueOf (fileNo), Integer.$valueOf (modelNo), Integer.$valueOf (Math.abs (firstNo)), Integer.$valueOf (Math.abs (lastNo)), Integer.$valueOf (isAnimationRunning ? 1 : 0), Integer.$valueOf (animationDirection), Integer.$valueOf (currentDirection)];
}break;
case J.constant.EnumCallback.ECHO:
var isPrivate = (data.length == 2);
var isScriptQueued = (isPrivate || (data[2]).intValue () == 1);
if (!doCallback) {
if (isScriptQueued) toConsole = true;
doCallback = (!isPrivate && (callback = this.b$.get ((type = J.constant.EnumCallback.MESSAGE))) != null);
}if (!toConsole) this.output (strInfo);
break;
case J.constant.EnumCallback.LOADSTRUCT:
var errorMsg = data[4];
if (errorMsg != null) {
errorMsg = (errorMsg.indexOf ("NOTE:") >= 0 ? "" : J.i18n.GT._ ("File Error:")) + errorMsg;
this.doShowStatus (errorMsg);
this.notifyCallback (J.constant.EnumCallback.MESSAGE, ["", errorMsg]);
return;
}break;
case J.constant.EnumCallback.MEASURE:
if (!doCallback) doCallback = ((callback = this.b$.get ((type = J.constant.EnumCallback.MESSAGE))) != null);
var status = data[3];
if (status.indexOf ("Picked") >= 0 || status.indexOf ("Sequence") >= 0) {
this.doShowStatus (strInfo);
toConsole = true;
} else if (status.indexOf ("Completed") >= 0) {
strInfo = status + ": " + strInfo;
toConsole = true;
}break;
case J.constant.EnumCallback.MESSAGE:
toConsole = !doCallback;
doCallback = new Boolean (doCallback & (strInfo != null)).valueOf ();
if (!toConsole) this.output (strInfo);
break;
case J.constant.EnumCallback.PICK:
this.doShowStatus (strInfo);
toConsole = true;
break;
case J.constant.EnumCallback.SCRIPT:
var msWalltime = (data[3]).intValue ();
if (msWalltime > 0) {
} else if (!doCallback) {
doCallback = ((callback = this.b$.get ((type = J.constant.EnumCallback.MESSAGE))) != null);
}this.output (strInfo);
this.doShowStatus (strInfo);
break;
case J.constant.EnumCallback.STRUCTUREMODIFIED:
this.notifyStructureModified ((data[1]).intValue (), (data[2]).intValue ());
break;
case J.constant.EnumCallback.SYNC:
this.sendScript (strInfo, data[2], true, doCallback);
return;
}
if (toConsole) {
var appConsole = this.viewer.getProperty ("DATA_API", "getAppConsole", null);
if (appConsole != null) {
appConsole.notifyCallback (type, data);
this.output (strInfo);
this.doSendJsTextareaStatus (strInfo);
}}if (!doCallback || !this.mayScript) return;
try {
this.doSendCallback (callback, data, strInfo);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!this.haveNotifiedError) if (J.util.Logger.debugging) {
J.util.Logger.debug (type.name () + "Callback call error to " + callback + ": " + e);
}this.haveNotifiedError = true;
} else {
throw e;
}
}
}, "J.constant.EnumCallback,~A");
$_M(c$, "notifyStructureModified", 
($fz = function (modelIndex, mode) {
}, $fz.isPrivate = true, $fz), "~N,~N");
$_M(c$, "sendScript", 
($fz = function (script, appletName, isSync, doCallback) {
if (doCallback) {
script = this.notifySync (script, appletName);
if (script == null || script.length == 0 || script.equals ("0")) return "";
}var apps =  new JU.List ();
J.util.GenericApplet.findApplets (appletName, this.syncId, this.fullName, apps);
var nApplets = apps.size ();
if (nApplets == 0) {
if (!doCallback && !appletName.equals ("*")) J.util.Logger.error (this.fullName + " couldn't find applet " + appletName);
return "";
}var sb = (isSync ? null :  new JU.SB ());
var getGraphics = (isSync && script.equals ("GET_GRAPHICS"));
var setNoGraphics = (isSync && script.equals ("SET_GRAPHICS_OFF"));
if (getGraphics) this.gRight = null;
for (var i = 0; i < nApplets; i++) {
var theApplet = apps.get (i);
var app = J.util.GenericApplet.htRegistry.get (theApplet);
var isScriptable = true;
if (J.util.Logger.debugging) J.util.Logger.debug (this.fullName + " sending to " + theApplet + ": " + script);
try {
if (isScriptable && (getGraphics || setNoGraphics)) {
this.isStereoSlave = getGraphics;
this.gRight = (app).setStereoGraphics (getGraphics);
return "";
}if (isSync) app.syncScript (script);
 else if (isScriptable) sb.append ((app).scriptWait (script, "output")).append ("\n");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
var msg = this.htmlName + " couldn't send to " + theApplet + ": " + script + ": " + e;
J.util.Logger.error (msg);
if (!isSync) sb.append (msg);
} else {
throw e;
}
}
}
return (isSync ? "" : sb.toString ());
}, $fz.isPrivate = true, $fz), "~S,~S,~B,~B");
$_M(c$, "notifySync", 
($fz = function (info, appletName) {
var syncCallback = this.b$.get (J.constant.EnumCallback.SYNC);
if (!this.mayScript || syncCallback == null) return info;
try {
return this.doSendCallback (syncCallback, [this.htmlName, info, appletName], null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!this.haveNotifiedError) if (J.util.Logger.debugging) {
J.util.Logger.debug ("syncCallback call error to " + syncCallback + ": " + e);
}this.haveNotifiedError = true;
} else {
throw e;
}
}
return info;
}, $fz.isPrivate = true, $fz), "~S,~S");
$_V(c$, "eval", 
function (strEval) {
var pt = strEval.indexOf ("\1");
if (pt >= 0) return this.sendScript (strEval.substring (pt + 1), strEval.substring (0, pt), false, false);
if (!this.haveDocumentAccess) return "NO EVAL ALLOWED";
if (this.b$.get (J.constant.EnumCallback.EVAL) != null) {
this.notifyCallback (J.constant.EnumCallback.EVAL, [null, strEval]);
return "";
}return this.doEval (strEval);
}, "~S");
$_V(c$, "functionXY", 
function (functionName, nX, nY) {
return this.doFunctionXY (functionName, nX, nY);
}, "~S,~N,~N");
$_V(c$, "functionXYZ", 
function (functionName, nX, nY, nZ) {
return this.doFunctionXYZ (functionName, nX, nY, nZ);
}, "~S,~N,~N,~N");
$_V(c$, "createImage", 
function (fileName, type, text_or_bytes, quality) {
return null;
}, "~S,~S,~O,~N");
$_V(c$, "getRegistryInfo", 
function () {
J.util.GenericApplet.checkIn (null, null);
return J.util.GenericApplet.htRegistry;
});
$_V(c$, "showUrl", 
function (urlString) {
if (J.util.Logger.debugging) J.util.Logger.debug ("showUrl(" + urlString + ")");
if (urlString != null && urlString.length > 0) try {
this.doShowDocument ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), urlString, null));
} catch (mue) {
if (Clazz.exceptionOf (mue, java.net.MalformedURLException)) {
this.consoleMessage ("Malformed URL:" + urlString);
} else {
throw mue;
}
}
}, "~S");
$_V(c$, "resizeInnerPanel", 
function (data) {
return  new javajs.awt.Dimension (0, 0);
}, "~S");
c$.checkIn = $_M(c$, "checkIn", 
function (name, applet) {
if (name != null) {
J.util.Logger.info ("AppletRegistry.checkIn(" + name + ")");
J.util.GenericApplet.htRegistry.put (name, applet);
}if (J.util.Logger.debugging) {
for (var entry, $entry = J.util.GenericApplet.htRegistry.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var theApplet = entry.getKey ();
J.util.Logger.debug (theApplet + " " + entry.getValue ());
}
}}, "~S,~O");
c$.checkOut = $_M(c$, "checkOut", 
function (name) {
J.util.GenericApplet.htRegistry.remove (name);
}, "~S");
c$.findApplets = $_M(c$, "findApplets", 
function (appletName, mySyncId, excludeName, apps) {
if (appletName != null && appletName.indexOf (",") >= 0) {
var names = JU.PT.split (appletName, ",");
for (var i = 0; i < names.length; i++) J.util.GenericApplet.findApplets (names[i], mySyncId, excludeName, apps);

return;
}var ext = "__" + mySyncId + "__";
if (appletName == null || appletName.equals ("*") || appletName.equals (">")) {
for (var appletName2, $appletName2 = J.util.GenericApplet.htRegistry.keySet ().iterator (); $appletName2.hasNext () && ((appletName2 = $appletName2.next ()) || true);) {
if (!appletName2.equals (excludeName) && appletName2.indexOf (ext) > 0) {
apps.addLast (appletName2);
}}
return;
}if (appletName.indexOf ("__") < 0) appletName += ext;
if (!J.util.GenericApplet.htRegistry.containsKey (appletName)) appletName = "jmolApplet" + appletName;
if (!appletName.equals (excludeName) && J.util.GenericApplet.htRegistry.containsKey (appletName)) {
apps.addLast (appletName);
}}, "~S,~S,~S,JU.List");
c$.htRegistry = c$.prototype.htRegistry =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"SCRIPT_CHECK", 0,
"SCRIPT_WAIT", 1,
"SCRIPT_NOWAIT", 2);
});
