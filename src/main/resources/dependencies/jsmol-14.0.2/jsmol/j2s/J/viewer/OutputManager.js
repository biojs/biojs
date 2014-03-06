Clazz.declarePackage ("J.viewer");
Clazz.load (null, "J.viewer.OutputManager", ["java.lang.Boolean", "java.util.Date", "$.Hashtable", "$.Map", "JU.List", "$.PT", "$.SB", "J.api.Interface", "J.i18n.GT", "J.io.JmolBinary", "J.util.Escape", "$.Logger", "$.Txt", "J.viewer.FileManager", "$.JC", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.privateKey = 0;
Clazz.instantialize (this, arguments);
}, J.viewer, "OutputManager");
$_M(c$, "setViewer", 
function (viewer, privateKey) {
this.viewer = viewer;
this.privateKey = privateKey;
return this;
}, "J.viewer.Viewer,~N");
$_M(c$, "writeToOutputChannel", 
($fz = function (params) {
var type = params.get ("type");
var fileName = params.get ("fileName");
var text = params.get ("text");
var bytes = params.get ("bytes");
var quality = J.viewer.OutputManager.getInt (params, "quality", -2147483648);
var out = params.get ("outputChannel");
var closeStream = (out == null);
var len = -1;
try {
if (!this.viewer.checkPrivateKey (this.privateKey)) return "ERROR: SECURITY";
if (bytes != null) {
if (out == null) out = this.openOutputChannel (this.privateKey, fileName, false, false);
out.write (bytes, 0, bytes.length);
} else if (text != null) {
if (out == null) out = this.openOutputChannel (this.privateKey, fileName, true, false);
out.append (text);
} else {
var errMsg = this.getOrSaveImage (params);
if (errMsg != null) return errMsg;
len = (params.get ("byteCount")).intValue ();
}} catch (exc) {
if (Clazz.exceptionOf (exc, Exception)) {
J.util.Logger.errorEx ("IO Exception", exc);
return exc.toString ();
} else {
throw exc;
}
} finally {
if (out != null) {
if (closeStream) out.closeChannel ();
len = out.getByteCount ();
}}
return (len < 0 ? "Creation of " + fileName + " failed: " + this.viewer.getErrorMessageUn () : "OK " + type + " " + (len > 0 ? len + " " : "") + fileName + (quality == -2147483648 ? "" : "; quality=" + quality));
}, $fz.isPrivate = true, $fz), "java.util.Map");
$_M(c$, "getOrSaveImage", 
($fz = function (params) {
var bytes = null;
var errMsg = null;
var type = (params.get ("type")).toUpperCase ();
var fileName = params.get ("fileName");
var scripts = params.get ("scripts");
var objImage = params.get ("image");
var out = params.get ("outputChannel");
var asBytes = (out == null && fileName == null);
var closeChannel = (out == null && fileName != null);
var releaseImage = (objImage == null);
var image = (objImage == null ? this.viewer.getScreenImageBuffer (null, true) : objImage);
var isOK = false;
try {
if (image == null) return errMsg = this.viewer.getErrorMessage ();
if (out == null) out = this.openOutputChannel (this.privateKey, fileName, false, false);
if (out == null) return errMsg = "ERROR: canceled";
fileName = out.getFileName ();
var comment = null;
var stateData = null;
params.put ("date", this.viewer.apiPlatform.getDateFormat (false));
if (type.startsWith ("JP")) {
type = JU.PT.simpleReplace (type, "E", "");
if (type.equals ("JPG64")) {
params.put ("outputChannelTemp", this.getOutputChannel (null, null));
comment = "";
} else {
comment = (!asBytes ? this.getWrappedState (null, null, image, null) : "");
}} else if (type.equals ("PDF")) {
comment = "";
} else if (type.startsWith ("PNG")) {
comment = "";
var isPngj = type.equals ("PNGJ");
if (isPngj) {
var outTemp = this.getOutputChannel (null, null);
this.getWrappedState (fileName, scripts, image, outTemp);
stateData = outTemp.toByteArray ();
} else if (!asBytes) {
stateData = (this.getWrappedState (null, scripts, image, null)).getBytes ();
}if (stateData != null) {
params.put ("applicationData", stateData);
params.put ("applicationPrefix", "Jmol Type");
}if (type.equals ("PNGT")) params.put ("transparentColor", Integer.$valueOf (this.viewer.getBackgroundArgb ()));
type = "PNG";
}if (comment != null) params.put ("comment", comment.length == 0 ? J.viewer.Viewer.getJmolVersion () : comment);
var errRet =  new Array (1);
isOK = this.createTheImage (image, type, out, params, errRet);
if (closeChannel) out.closeChannel ();
if (isOK) {
if (asBytes) bytes = out.toByteArray ();
 else if (params.containsKey ("captureByteCount")) errMsg = "OK: " + params.get ("captureByteCount").toString () + " bytes";
} else {
errMsg = errRet[0];
}} finally {
if (releaseImage) this.viewer.releaseScreenImage ();
params.put ("byteCount", Integer.$valueOf (bytes != null ? bytes.length : isOK ? out.getByteCount () : -1));
if (objImage != null) {
return fileName;
}}
return (errMsg == null ? bytes : errMsg);
}, $fz.isPrivate = true, $fz), "java.util.Map");
$_M(c$, "getWrappedState", 
function (fileName, scripts, objImage, out) {
var width = this.viewer.apiPlatform.getImageWidth (objImage);
var height = this.viewer.apiPlatform.getImageHeight (objImage);
if (width > 0 && !this.viewer.global.imageState && out == null || !this.viewer.global.preserveState) return "";
var s = this.viewer.getStateInfo3 (null, width, height);
if (out != null) {
if (fileName != null) this.viewer.fileManager.clearPngjCache (fileName);
return this.createZipSet (s, scripts, true, out);
}try {
s = J.viewer.JC.embedScript (J.viewer.FileManager.setScriptFileReferences (s, ".", null, null));
} catch (e) {
J.util.Logger.error ("state could not be saved: " + e.toString ());
s = "Jmol " + J.viewer.Viewer.getJmolVersion ();
}
return s;
}, "~S,~A,~O,JU.OC");
$_M(c$, "createTheImage", 
($fz = function (objImage, type, out, params, errRet) {
type = type.substring (0, 1) + type.substring (1).toLowerCase ();
var ie = J.api.Interface.getInterface ("J.image." + type + "Encoder");
if (ie == null) {
errRet[0] = "Image encoder type " + type + " not available";
return false;
}return ie.createImage (this.viewer.apiPlatform, type, objImage, out, params, errRet);
}, $fz.isPrivate = true, $fz), "~O,~S,JU.OC,java.util.Map,~A");
$_M(c$, "outputToFile", 
function (params) {
return this.handleOutputToFile (params, true);
}, "java.util.Map");
$_M(c$, "getOutputChannel", 
function (fileName, fullPath) {
if (!this.viewer.haveAccess (J.viewer.Viewer.ACCESS.ALL)) return null;
if (fileName != null) {
fileName = this.getOutputFileNameFromDialog (fileName, -2147483648);
if (fileName == null) return null;
}if (fullPath != null) fullPath[0] = fileName;
var localName = (J.viewer.FileManager.isLocal (fileName) ? fileName : null);
try {
return this.openOutputChannel (this.privateKey, localName, false, false);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
J.util.Logger.info (e.toString ());
return null;
} else {
throw e;
}
}
}, "~S,~A");
$_M(c$, "processWriteOrCapture", 
function (params) {
var fileName = params.get ("fileName");
if (fileName == null) return this.viewer.clipImageOrPasteText (params.get ("text"));
var bsFrames = params.get ("bsFrames");
var nVibes = J.viewer.OutputManager.getInt (params, "nVibes", 0);
return (bsFrames != null || nVibes != 0 ? this.processMultiFrameOutput (fileName, bsFrames, nVibes, params) : this.handleOutputToFile (params, true));
}, "java.util.Map");
c$.getInt = $_M(c$, "getInt", 
($fz = function (params, key, def) {
var p = params.get (key);
return (p == null ? def : p.intValue ());
}, $fz.isPrivate = true, $fz), "java.util.Map,~S,~N");
$_M(c$, "processMultiFrameOutput", 
($fz = function (fileName, bsFrames, nVibes, params) {
var info = "";
var n = 0;
var quality = J.viewer.OutputManager.getInt (params, "quality", -1);
fileName = this.setFullPath (params, this.getOutputFileNameFromDialog (fileName, quality));
if (fileName == null) return null;
var ptDot = fileName.indexOf (".");
if (ptDot < 0) ptDot = fileName.length;
var froot = fileName.substring (0, ptDot);
var fext = fileName.substring (ptDot);
var sb =  new JU.SB ();
if (bsFrames == null) {
this.viewer.transformManager.vibrationOn = true;
sb =  new JU.SB ();
for (var i = 0; i < nVibes; i++) {
for (var j = 0; j < 20; j++) {
this.viewer.transformManager.setVibrationT (j / 20 + 0.2501);
if (!this.writeFrame (++n, froot, fext, params, sb)) return "ERROR WRITING FILE SET: \n" + info;
}
}
this.viewer.setVibrationOff ();
} else {
for (var i = bsFrames.nextSetBit (0); i >= 0; i = bsFrames.nextSetBit (i + 1)) {
this.viewer.setCurrentModelIndex (i);
if (!this.writeFrame (++n, froot, fext, params, sb)) return "ERROR WRITING FILE SET: \n" + info;
}
}if (info.length == 0) info = "OK\n";
return info + "\n" + n + " files created";
}, $fz.isPrivate = true, $fz), "~S,JU.BS,~N,java.util.Map");
$_M(c$, "setFullPath", 
($fz = function (params, fileName) {
var fullPath = params.get ("fullPath");
if (fullPath != null) fullPath[0] = fileName;
if (fileName == null) return null;
params.put ("fileName", fileName);
return fileName;
}, $fz.isPrivate = true, $fz), "java.util.Map,~S");
$_M(c$, "getOutputFromExport", 
function (params) {
var width = J.viewer.OutputManager.getInt (params, "width", 0);
var height = J.viewer.OutputManager.getInt (params, "height", 0);
var fileName = params.get ("fileName");
if (fileName != null) {
fileName = this.setFullPath (params, this.getOutputFileNameFromDialog (fileName, -2147483648));
if (fileName == null) return null;
}this.viewer.mustRender = true;
var saveWidth = this.viewer.dimScreen.width;
var saveHeight = this.viewer.dimScreen.height;
this.viewer.resizeImage (width, height, true, true, false);
this.viewer.setModelVisibility ();
var data = this.viewer.repaintManager.renderExport (this.viewer.gdata, this.viewer.modelSet, params);
this.viewer.resizeImage (saveWidth, saveHeight, true, true, true);
return data;
}, "java.util.Map");
$_M(c$, "getImageAsBytes", 
function (type, width, height, quality, errMsg) {
var saveWidth = this.viewer.dimScreen.width;
var saveHeight = this.viewer.dimScreen.height;
this.viewer.mustRender = true;
this.viewer.resizeImage (width, height, true, false, false);
this.viewer.setModelVisibility ();
this.viewer.creatingImage = true;
var bytes = null;
try {
var params =  new java.util.Hashtable ();
params.put ("type", type);
if (quality > 0) params.put ("quality", Integer.$valueOf (quality));
var bytesOrError = this.getOrSaveImage (params);
if (Clazz.instanceOf (bytesOrError, String)) errMsg[0] = bytesOrError;
 else bytes = bytesOrError;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
errMsg[0] = e.toString ();
this.viewer.setErrorMessage ("Error creating image: " + e, null);
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.viewer.handleError (er, false);
this.viewer.setErrorMessage ("Error creating image: " + er, null);
errMsg[0] = this.viewer.getErrorMessage ();
}
} else {
throw e$$;
}
}
this.viewer.creatingImage = false;
this.viewer.resizeImage (saveWidth, saveHeight, true, false, true);
return bytes;
}, "~S,~N,~N,~N,~A");
$_M(c$, "writeFileData", 
function (fileName, type, modelIndex, parameters) {
var fullPath =  new Array (1);
var out = this.getOutputChannel (fileName, fullPath);
if (out == null) return "";
fileName = fullPath[0];
var pathName = (type.equals ("FILE") ? this.viewer.getFullPathName () : null);
var getCurrentFile = (pathName != null && (pathName.equals ("string") || pathName.indexOf ("[]") >= 0 || pathName.equals ("JSNode")));
var asBytes = (pathName != null && !getCurrentFile);
if (asBytes) {
pathName = this.viewer.getModelSetPathName ();
if (pathName == null) return null;
}out.setType (type);
var msg = (type.equals ("PDB") || type.equals ("PQR") ? this.viewer.getPdbAtomData (null, out) : type.startsWith ("PLOT") ? this.viewer.modelSet.getPdbData (modelIndex, type.substring (5), this.viewer.getSelectionSet (false), parameters, out) : getCurrentFile ? out.append (this.viewer.getCurrentFileAsString ()).toString () : this.viewer.getFileAsBytes (pathName, out));
out.closeChannel ();
if (msg != null) msg = "OK " + msg + " " + fileName;
return msg;
}, "~S,~S,~N,~A");
$_M(c$, "writeFrame", 
($fz = function (n, froot, fext, params, sb) {
var fileName = "0000" + n;
fileName = this.setFullPath (params, froot + fileName.substring (fileName.length - 4) + fext);
var msg = this.handleOutputToFile (params, false);
this.viewer.scriptEcho (msg);
sb.append (msg).append ("\n");
return msg.startsWith ("OK");
}, $fz.isPrivate = true, $fz), "~N,~S,~S,java.util.Map,JU.SB");
$_M(c$, "getOutputFileNameFromDialog", 
($fz = function (fileName, quality) {
if (fileName == null || this.viewer.$isKiosk) return null;
var useDialog = (fileName.indexOf ("?") == 0);
if (useDialog) fileName = fileName.substring (1);
useDialog = new Boolean (useDialog | (this.viewer.isApplet () && (fileName.indexOf ("http:") < 0))).valueOf ();
fileName = J.viewer.FileManager.getLocalPathForWritingFile (this.viewer, fileName);
if (useDialog) fileName = this.viewer.dialogAsk (quality == -2147483648 ? "Save" : "Save Image", fileName);
return fileName;
}, $fz.isPrivate = true, $fz), "~S,~N");
$_M(c$, "handleOutputToFile", 
function (params, doCheck) {
var sret = null;
var fileName = params.get ("fileName");
if (fileName == null) return null;
var type = params.get ("type");
var text = params.get ("text");
var width = J.viewer.OutputManager.getInt (params, "width", 0);
var height = J.viewer.OutputManager.getInt (params, "height", 0);
var quality = J.viewer.OutputManager.getInt (params, "quality", -2147483648);
var captureMode = J.viewer.OutputManager.getInt (params, "captureMode", -2147483648);
if (captureMode != -2147483648 && !this.viewer.allowCapture ()) return "ERROR: Cannot capture on this platform.";
var mustRender = (quality != -2147483648);
var localName = null;
if (captureMode != -2147483648) {
doCheck = false;
mustRender = false;
type = "GIF";
}if (doCheck) fileName = this.getOutputFileNameFromDialog (fileName, quality);
fileName = this.setFullPath (params, fileName);
if (fileName == null) return null;
params.put ("fileName", fileName);
if (J.viewer.FileManager.isLocal (fileName)) localName = fileName;
var saveWidth = this.viewer.dimScreen.width;
var saveHeight = this.viewer.dimScreen.height;
this.viewer.creatingImage = true;
if (mustRender) {
this.viewer.mustRender = true;
this.viewer.resizeImage (width, height, true, false, false);
this.viewer.setModelVisibility ();
}try {
if (type.equals ("JMOL")) type = "ZIPALL";
if (type.equals ("ZIP") || type.equals ("ZIPALL")) {
var scripts = params.get ("scripts");
if (scripts != null && type.equals ("ZIP")) type = "ZIPALL";
var out = this.getOutputChannel (fileName, null);
sret = this.createZipSet (text, scripts, type.equals ("ZIPALL"), out);
} else if (type.equals ("SCENE")) {
sret = this.createSceneSet (fileName, text, width, height);
} else {
var bytes = params.get ("bytes");
sret = this.viewer.statusManager.createImage (fileName, type, text, bytes, quality);
if (sret == null) {
var msg = null;
if (captureMode != -2147483648) {
var out = null;
var cparams = this.viewer.captureParams;
switch (captureMode) {
case 1073742032:
if (cparams != null) (cparams.get ("outputChannel")).closeChannel ();
out = this.getOutputChannel (localName, null);
if (out == null) {
sret = msg = "ERROR: capture canceled";
this.viewer.captureParams = null;
} else {
localName = out.getFileName ();
msg = type + "_STREAM_OPEN " + localName;
this.viewer.captureParams = params;
params.put ("captureFileName", localName);
params.put ("captureCount", Integer.$valueOf (1));
params.put ("captureMode", Integer.$valueOf (1073742032));
}break;
default:
if (cparams == null) {
sret = msg = "ERROR: capture not active";
} else {
params = cparams;
switch (captureMode) {
default:
sret = msg = "ERROR: CAPTURE MODE=" + captureMode + "?";
break;
case 1276118017:
if (Boolean.FALSE === params.get ("captureEnabled")) {
sret = msg = "capturing OFF; use CAPTURE ON/END/CANCEL to continue";
} else {
var count = J.viewer.OutputManager.getInt (params, "captureCount", 1);
params.put ("captureCount", Integer.$valueOf (++count));
msg = type + "_STREAM_ADD " + count;
}break;
case 1048589:
case 1048588:
params = cparams;
params.put ("captureEnabled", (captureMode == 1048589 ? Boolean.TRUE : Boolean.FALSE));
sret = type + "_STREAM_" + (captureMode == 1048589 ? "ON" : "OFF");
params.put ("captureMode", Integer.$valueOf (1276118017));
break;
case 1150985:
case 1073741874:
params = cparams;
params.put ("captureMode", Integer.$valueOf (captureMode));
fileName = params.get ("captureFileName");
msg = type + "_STREAM_" + (captureMode == 1150985 ? "CLOSE " : "CANCEL ") + params.get ("captureFileName");
this.viewer.captureParams = null;
this.viewer.prompt (J.i18n.GT._ ("Capture") + ": " + (captureMode == 1073741874 ? J.i18n.GT._ ("canceled") : J.i18n.GT.o (J.i18n.GT._ ("{0} saved"), fileName)), "OK", null, true);
}
break;
}break;
}
if (out != null) params.put ("outputChannel", out);
}params.put ("fileName", localName);
if (sret == null) sret = this.writeToOutputChannel (params);
this.viewer.statusManager.createImage (sret, type, null, null, quality);
if (msg != null) this.viewer.showString (msg + " (" + params.get ("captureByteCount") + " bytes)", false);
}}} catch (er) {
J.util.Logger.error (this.viewer.setErrorMessage (sret = "ERROR creating image??: " + er, null));
} finally {
this.viewer.creatingImage = false;
if (quality != -2147483648) this.viewer.resizeImage (saveWidth, saveHeight, true, false, true);
}
return sret;
}, "java.util.Map,~B");
$_M(c$, "setLogFile", 
function (value) {
var path = null;
var logFilePath = this.viewer.getLogFilePath ();
if (logFilePath == null || value.indexOf ("\\") >= 0) {
value = null;
} else if (value.startsWith ("http://") || value.startsWith ("https://")) {
path = value;
} else if (value.indexOf ("/") >= 0) {
value = null;
} else if (value.length > 0) {
if (!value.startsWith ("JmolLog_")) value = "JmolLog_" + value;
path = this.getLogPath (logFilePath + value);
}if (path == null) value = null;
 else J.util.Logger.info (J.i18n.GT.o (J.i18n.GT._ ("Setting log file to {0}"), path));
if (value == null || !this.viewer.haveAccess (J.viewer.Viewer.ACCESS.ALL)) {
J.util.Logger.info (J.i18n.GT._ ("Cannot set log file path."));
value = null;
} else {
this.viewer.logFileName = path;
this.viewer.global.setS ("_logFile", this.viewer.isApplet () ? value : path);
}return value;
}, "~S");
$_M(c$, "logToFile", 
function (data) {
try {
var doClear = (data.equals ("$CLEAR$"));
if (data.indexOf ("$NOW$") >= 0) data = JU.PT.simpleReplace (data, "$NOW$", this.viewer.apiPlatform.getDateFormat (false));
if (this.viewer.logFileName == null) {
J.util.Logger.info (data);
return;
}var out = (this.viewer.haveAccess (J.viewer.Viewer.ACCESS.ALL) ? this.openOutputChannel (this.privateKey, this.viewer.logFileName, true, !doClear) : null);
if (!doClear) {
var ptEnd = data.indexOf ('\0');
if (ptEnd >= 0) data = data.substring (0, ptEnd);
out.append (data);
if (ptEnd < 0) out.append ("\n");
}var s = out.closeChannel ();
J.util.Logger.info (s);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (J.util.Logger.debugging) J.util.Logger.debug ("cannot log " + data);
} else {
throw e;
}
}
}, "~S");
$_M(c$, "createZipSet", 
($fz = function (script, scripts, includeRemoteFiles, out) {
var v =  new JU.List ();
var fm = this.viewer.fileManager;
var fileNames =  new JU.List ();
var crcMap =  new java.util.Hashtable ();
var haveSceneScript = (scripts != null && scripts.length == 3 && scripts[1].startsWith ("###scene.spt###"));
var sceneScriptOnly = (haveSceneScript && scripts[2].equals ("min"));
if (!sceneScriptOnly) {
J.io.JmolBinary.getFileReferences (script, fileNames);
if (haveSceneScript) J.io.JmolBinary.getFileReferences (scripts[1], fileNames);
}var haveScripts = (!haveSceneScript && scripts != null && scripts.length > 0);
if (haveScripts) {
script = this.wrapPathForAllFiles ("script " + J.util.Escape.eS (scripts[0]), "");
for (var i = 0; i < scripts.length; i++) fileNames.addLast (scripts[i]);

}var nFiles = fileNames.size ();
var newFileNames =  new JU.List ();
for (var iFile = 0; iFile < nFiles; iFile++) {
var name = fileNames.get (iFile);
var isLocal = !this.viewer.isJS && J.viewer.FileManager.isLocal (name);
var newName = name;
if (isLocal || includeRemoteFiles) {
var ptSlash = name.lastIndexOf ("/");
newName = (name.indexOf ("?") > 0 && name.indexOf ("|") < 0 ? JU.PT.replaceAllCharacters (name, "/:?\"'=&", "_") : J.viewer.FileManager.stripPath (name));
newName = JU.PT.replaceAllCharacters (newName, "[]", "_");
var isSparDir = (fm.spardirCache != null && fm.spardirCache.containsKey (name));
if (isLocal && name.indexOf ("|") < 0 && !isSparDir) {
v.addLast (name);
v.addLast (newName);
v.addLast (null);
} else {
var ret = (isSparDir ? fm.spardirCache.get (name) : fm.getFileAsBytes (name, null, true));
if (!JU.PT.isAB (ret)) return ret;
newName = this.addPngFileBytes (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v);
}name = "$SCRIPT_PATH$" + newName;
}crcMap.put (newName, newName);
newFileNames.addLast (name);
}
if (!sceneScriptOnly) {
script = J.util.Txt.replaceQuotedStrings (script, fileNames, newFileNames);
v.addLast ("state.spt");
v.addLast (null);
v.addLast (script.getBytes ());
}if (haveSceneScript) {
if (scripts[0] != null) {
v.addLast ("animate.spt");
v.addLast (null);
v.addLast (scripts[0].getBytes ());
}v.addLast ("scene.spt");
v.addLast (null);
script = J.util.Txt.replaceQuotedStrings (scripts[1], fileNames, newFileNames);
v.addLast (script.getBytes ());
}var sname = (haveSceneScript ? "scene.spt" : "state.spt");
v.addLast ("JmolManifest.txt");
v.addLast (null);
var sinfo = "# Jmol Manifest Zip Format 1.1\n# Created " + ( new java.util.Date ()) + "\n" + "# JmolVersion " + J.viewer.Viewer.getJmolVersion () + "\n" + sname;
v.addLast (sinfo.getBytes ());
v.addLast ("Jmol_version_" + J.viewer.Viewer.getJmolVersion ().$replace (' ', '_').$replace (':', '.'));
v.addLast (null);
v.addLast ( Clazz.newByteArray (0, 0));
if (out.getFileName () != null) {
var bytes = this.viewer.getImageAsBytes ("PNG", 0, 0, -1, null);
if (bytes != null) {
v.addLast ("preview.png");
v.addLast (null);
v.addLast (bytes);
}}return this.writeZipFile (this.privateKey, fm, this.viewer, out, v, "OK JMOL");
}, $fz.isPrivate = true, $fz), "~S,~A,~B,JU.OC");
$_M(c$, "addPngFileBytes", 
($fz = function (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v) {
var crcValue = Integer.$valueOf (J.io.JmolBinary.getCrcValue (ret));
if (crcMap.containsKey (crcValue)) {
newName = crcMap.get (crcValue);
} else {
if (isSparDir) newName = newName.$replace ('.', '_');
if (crcMap.containsKey (newName)) {
var pt = newName.lastIndexOf (".");
if (pt > ptSlash) newName = newName.substring (0, pt) + "[" + iFile + "]" + newName.substring (pt);
 else newName = newName + "[" + iFile + "]";
}v.addLast (name);
v.addLast (newName);
v.addLast (ret);
crcMap.put (crcValue, newName);
}return newName;
}, $fz.isPrivate = true, $fz), "~S,~A,~N,java.util.Hashtable,~B,~S,~N,JU.List");
$_M(c$, "writeZipFile", 
($fz = function (privateKey, fm, viewer, out, fileNamesAndByteArrays, msg) {
var buf =  Clazz.newByteArray (1024, 0);
var nBytesOut = 0;
var nBytes = 0;
var outFileName = out.getFileName ();
J.util.Logger.info ("creating zip file " + (outFileName == null ? "" : outFileName) + "...");
var fileList = "";
try {
var bos;
{
bos = out;
}var zos = J.io.JmolBinary.getZipOutputStream (bos);
for (var i = 0; i < fileNamesAndByteArrays.size (); i += 3) {
var fname = fileNamesAndByteArrays.get (i);
var bytes = null;
var data = fm.cacheGet (fname, false);
if (Clazz.instanceOf (data, java.util.Map)) continue;
if (fname.indexOf ("file:/") == 0) {
fname = fname.substring (5);
if (fname.length > 2 && fname.charAt (2) == ':') fname = fname.substring (1);
} else if (fname.indexOf ("cache://") == 0) {
fname = fname.substring (8);
}var fnameShort = fileNamesAndByteArrays.get (i + 1);
if (fnameShort == null) fnameShort = fname;
if (data != null) bytes = (JU.PT.isAB (data) ? data : (data).getBytes ());
if (bytes == null) bytes = fileNamesAndByteArrays.get (i + 2);
var key = ";" + fnameShort + ";";
if (fileList.indexOf (key) >= 0) {
J.util.Logger.info ("duplicate entry");
continue;
}fileList += key;
J.io.JmolBinary.addZipEntry (zos, fnameShort);
var nOut = 0;
if (bytes == null) {
var $in = viewer.getBufferedInputStream (fname);
var len;
while ((len = $in.read (buf, 0, 1024)) > 0) {
zos.write (buf, 0, len);
nOut += len;
}
$in.close ();
} else {
zos.write (bytes, 0, bytes.length);
nOut += bytes.length;
}nBytesOut += nOut;
J.io.JmolBinary.closeZipEntry (zos);
J.util.Logger.info ("...added " + fname + " (" + nOut + " bytes)");
}
zos.flush ();
zos.close ();
J.util.Logger.info (nBytesOut + " bytes prior to compression");
var ret = out.closeChannel ();
if (ret != null) {
if (ret.indexOf ("Exception") >= 0) return ret;
msg += " " + ret;
}nBytes = out.getByteCount ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
J.util.Logger.info (e.toString ());
return e.toString ();
} else {
throw e;
}
}
var fileName = out.getFileName ();
return (fileName == null ? null : msg + " " + nBytes + " " + fileName);
}, $fz.isPrivate = true, $fz), "~N,J.viewer.FileManager,J.viewer.Viewer,JU.OC,JU.List,~S");
$_M(c$, "wrapPathForAllFiles", 
function (cmd, strCatch) {
var vname = "v__" + ("" + Math.random ()).substring (3);
return "# Jmol script\n{\n\tVar " + vname + " = pathForAllFiles\n\tpathForAllFiles=\"$SCRIPT_PATH$\"\n\ttry{\n\t\t" + cmd + "\n\t}catch(e){" + strCatch + "}\n\tpathForAllFiles = " + vname + "\n}\n";
}, "~S,~S");
Clazz.defineStatics (c$,
"SCENE_TAG", "###scene.spt###");
});
