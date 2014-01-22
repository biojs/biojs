(function(Clazz
,$_A
,$_Ab
,$_AB
,$_AC
,$_AD
,$_AF
,$_AI
,$_AL
,$_AS
,$_B
,$_C
,$_D
,$_E
,$_F
,$_G
,$_H
,$_I
,$_J
,$_K
,$_k
,$_L
,$_M
,$_N
,$_O
,$_P
,$_Q
,$_R
,$_S
,$_s
,$_T
,$_U
,$_V
,$_W
,$_X
,$_Y
,$_Z
,Clazz_doubleToInt
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_supportsNativeObject
,Clazz_extendedObjectMethods
,Clazz_callingStackTraces
,Clazz_clone
,Clazz_doubleToShort
,Clazz_innerFunctions
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
){
var $t$;
//var c$;
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptManager");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptEvaluator");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolScriptFunction");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolParallelProcessor");
Clazz_declarePackage ("J.script");
Clazz_load (["J.thread.JmolThread"], "J.script.FileLoadThread", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.fileName = null;
this.cacheName = null;
this.key = null;
Clazz_instantialize (this, arguments);
}, J.script, "FileLoadThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (eval, viewer, fileName, key, cacheName) {
Clazz_superConstructor (this, J.script.FileLoadThread, []);
this.setViewer (viewer, "FileLoadThread");
this.fileName = fileName;
this.key = key;
this.cacheName = cacheName;
this.setEval (eval);
this.sc.pc--;
}, "J.api.JmolScriptEvaluator,J.viewer.Viewer,~S,~S,~S");
$_V(c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
mode = 0;
break;
case 0:
if (this.stopped || this.eval.isStopped ()) {
mode = -2;
break;
}{
return Jmol._loadFileAsynchronously(this, this.viewer.applet, this.fileName);
}break;
case -2:
this.resumeEval ();
return;
}

}, "~N");
$_M(c$, "setData", 
function (fileName, data) {
if (fileName != null) this.sc.parentContext.htFileCache.put (this.key, this.cacheName = this.cacheName.substring (0, this.cacheName.lastIndexOf ("_") + 1) + fileName);
this.viewer.cachePut (this.cacheName, data);
this.run1 (-2);
}, "~S,~O");
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.thread.JmolThread"], "J.script.ScriptQueueThread", ["J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.scriptManager = null;
this.startedByCommandThread = false;
this.pt = 0;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptQueueThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (scriptManager, viewer, startedByCommandThread, pt) {
Clazz_superConstructor (this, J.script.ScriptQueueThread);
this.setViewer (viewer, "QueueThread" + pt);
this.scriptManager = scriptManager;
this.viewer = viewer;
this.startedByCommandThread = startedByCommandThread;
this.pt = pt;
}, "J.api.JmolScriptManager,J.viewer.Viewer,~B,~N");
$_V(c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
mode = 0;
break;
case 0:
if (this.stopped || this.scriptManager.getScriptQueue ().size () == 0) {
mode = -2;
break;
}if (!this.runNextScript () && !this.runSleep (100, 0)) return;
break;
case -2:
this.scriptManager.queueThreadFinished (this.pt);
return;
}

}, "~N");
$_M(c$, "runNextScript", 
function () {
var queue = this.scriptManager.getScriptQueue ();
if (queue.size () == 0) return false;
var scriptItem = this.scriptManager.getScriptItem (false, this.startedByCommandThread);
if (scriptItem == null) return false;
var script = scriptItem.get (0);
var statusList = scriptItem.get (1);
var returnType = scriptItem.get (2);
var isScriptFile = (scriptItem.get (3)).booleanValue ();
var isQuiet = (scriptItem.get (4)).booleanValue ();
if (J.util.Logger.debugging) {
J.util.Logger.debug ("Queue[" + this.pt + "][" + queue.size () + "] scripts; running: " + script);
}queue.remove (0);
this.viewer.evalStringWaitStatusQueued (returnType, script, statusList, isScriptFile, isQuiet, true);
if (queue.size () == 0) {
return false;
}return true;
});
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.thread.JmolThread"], "J.script.ScriptDelayThread", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.millis = 0;
this.seconds = 0;
this.doPopPush = false;
this.isPauseDelay = false;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptDelayThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function (eval, viewer, millis) {
Clazz_superConstructor (this, J.script.ScriptDelayThread, []);
this.setViewer (viewer, "ScriptDelayThread");
this.millis = millis;
this.setEval (eval);
}, "J.api.JmolScriptEvaluator,J.viewer.Viewer,~N");
$_V(c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
var delayMax;
this.doPopPush = (this.millis > 0);
this.isPauseDelay = (this.millis == -100);
if (!this.doPopPush) this.millis = -this.millis;
 else if ((delayMax = this.viewer.getDelayMaximumMs ()) > 0 && this.millis > delayMax) this.millis = delayMax;
this.millis -= System.currentTimeMillis () - this.startTime;
if (this.isJS) {
this.seconds = 0;
} else {
this.seconds = Clazz_doubleToInt (this.millis / 1000);
this.millis -= this.seconds * 1000;
if (this.millis <= 0) this.millis = 1;
}if (this.doPopPush) this.viewer.popHoldRepaint ("scriptDelayThread INIT");
mode = 0;
break;
case 0:
if (this.stopped || this.eval.isStopped ()) {
mode = -2;
break;
}if (!this.runSleep (this.seconds-- > 0 ? 1000 : this.millis, -2)) return;
if (this.seconds < 0) this.millis = 0;
mode = (this.seconds > 0 || this.millis > 0 ? 0 : -2);
break;
case -2:
if (this.doPopPush) this.viewer.pushHoldRepaintWhy ("delay FINISH");
if (this.isPauseDelay) this.eval.notifyResumeStatus ();
this.resumeEval ();
return;
}

}, "~N");
Clazz_defineStatics (c$,
"PAUSE_DELAY", -100);
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.thread.JmolThread"], "J.script.CommandWatcherThread", ["java.lang.Thread", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.scriptManager = null;
Clazz_instantialize (this, arguments);
}, J.script, "CommandWatcherThread", J.thread.JmolThread);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.script.CommandWatcherThread, []);
});
$_V(c$, "setManager", 
function (manager, viewer, params) {
this.scriptManager = manager;
this.setViewer (viewer, "CommmandWatcherThread");
return 0;
}, "~O,J.viewer.Viewer,~O");
$_V(c$, "run", 
function () {
Thread.currentThread ().setPriority (1);
while (!this.stopped) {
try {
Thread.sleep (50);
if (!this.stopped) {
this.scriptManager.runScriptNow ();
}} catch (e$$) {
if (Clazz_exceptionOf (e$$, InterruptedException)) {
var ie = e$$;
{
J.util.Logger.warn ("CommandWatcher InterruptedException! " + this);
break;
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var ie = e$$;
{
var s = "script processing ERROR:\n\n" + ie.toString ();
for (var i = 0; i < ie.getStackTrace ().length; i++) {
s += "\n" + ie.getStackTrace ()[i].toString ();
}
J.util.Logger.warn ("CommandWatcher Exception! " + s);
break;
}
} else {
throw e$$;
}
}
}
});
$_V(c$, "run1", 
function (mode) {
}, "~N");
Clazz_defineStatics (c$,
"commandDelay", 50);
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.api.JmolScriptManager", "JU.List"], "J.script.ScriptManager", ["java.io.BufferedReader", "java.lang.Boolean", "$.Thread", "javajs.api.ZInputStream", "JU.PT", "$.SB", "J.api.Interface", "J.io.JmolBinary", "J.script.ScriptQueueThread", "J.util.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.viewer = null;
this.eval = null;
this.evalTemp = null;
this.queueThreads = null;
this.scriptQueueRunning = null;
this.commandWatcherThread = null;
this.scriptQueue = null;
this.useCommandWatcherThread = false;
this.scriptIndex = 0;
this.$isScriptQueued = true;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptManager", null, J.api.JmolScriptManager);
Clazz_prepareFields (c$, function () {
this.queueThreads =  new Array (2);
this.scriptQueueRunning =  Clazz_newBooleanArray (2, false);
this.scriptQueue =  new JU.List ();
});
$_V(c$, "getEval", 
function () {
return this.eval;
});
$_V(c$, "getScriptQueue", 
function () {
return this.scriptQueue;
});
$_V(c$, "isScriptQueued", 
function () {
return this.$isScriptQueued;
});
Clazz_makeConstructor (c$, 
function () {
});
$_V(c$, "setViewer", 
function (viewer) {
this.viewer = viewer;
this.eval = this.newScriptEvaluator ();
this.eval.setCompiler ();
}, "J.viewer.Viewer");
$_M(c$, "newScriptEvaluator", 
function () {
return (J.api.Interface.getOptionInterface ("script.ScriptEvaluator")).setViewer (this.viewer);
});
$_V(c$, "clear", 
function (isAll) {
if (!isAll) {
this.evalTemp = null;
return;
}this.startCommandWatcher (false);
this.interruptQueueThreads ();
}, "~B");
$_V(c$, "addScript", 
function (strScript, isScriptFile, isQuiet) {
return this.addScr ("String", strScript, "", isScriptFile, isQuiet);
}, "~S,~B,~B");
$_M(c$, "addScr", 
function (returnType, strScript, statusList, isScriptFile, isQuiet) {
{
this.useCommandWatcherThread = false;
}if (!this.viewer.global.useScriptQueue) {
this.clearQueue ();
this.viewer.haltScriptExecution ();
}if (this.commandWatcherThread == null && this.useCommandWatcherThread) this.startCommandWatcher (true);
if (this.commandWatcherThread != null && strScript.indexOf ("/*SPLIT*/") >= 0) {
var scripts = JU.PT.split (strScript, "/*SPLIT*/");
for (var i = 0; i < scripts.length; i++) this.addScr (returnType, scripts[i], statusList, isScriptFile, isQuiet);

return "split into " + scripts.length + " sections for processing";
}var useCommandThread = (this.commandWatcherThread != null && (strScript.indexOf ("javascript") < 0 || strScript.indexOf ("#javascript ") >= 0));
var scriptItem =  new JU.List ();
scriptItem.addLast (strScript);
scriptItem.addLast (statusList);
scriptItem.addLast (returnType);
scriptItem.addLast (isScriptFile ? Boolean.TRUE : Boolean.FALSE);
scriptItem.addLast (isQuiet ? Boolean.TRUE : Boolean.FALSE);
scriptItem.addLast (Integer.$valueOf (useCommandThread ? -1 : 1));
this.scriptQueue.addLast (scriptItem);
this.startScriptQueue (false);
return "pending";
}, "~S,~S,~S,~B,~B");
$_V(c$, "clearQueue", 
function () {
this.scriptQueue.clear ();
});
$_V(c$, "waitForQueue", 
function () {
if (this.viewer.isSingleThreaded) return;
var n = 0;
while (this.isQueueProcessing ()) {
try {
Thread.sleep (100);
if (((n++) % 10) == 0) if (J.util.Logger.debugging) {
J.util.Logger.debug ("...scriptManager waiting for queue: " + this.scriptQueue.size () + " thread=" + Thread.currentThread ().getName ());
}} catch (e) {
if (Clazz_exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
$_V(c$, "isQueueProcessing", 
function () {
return this.queueThreads[0] != null || this.queueThreads[1] != null;
});
$_M(c$, "flushQueue", 
function (command) {
for (var i = this.scriptQueue.size (); --i >= 0; ) {
var strScript = (this.scriptQueue.get (i).get (0));
if (strScript.indexOf (command) == 0) {
this.scriptQueue.remove (i);
if (J.util.Logger.debugging) J.util.Logger.debug (this.scriptQueue.size () + " scripts; removed: " + strScript);
}}
}, "~S");
$_M(c$, "startScriptQueue", 
function (startedByCommandWatcher) {
var pt = (startedByCommandWatcher ? 1 : 0);
if (this.scriptQueueRunning[pt]) return;
this.scriptQueueRunning[pt] = true;
this.queueThreads[pt] =  new J.script.ScriptQueueThread (this, this.viewer, startedByCommandWatcher, pt);
this.queueThreads[pt].start ();
}, "~B");
$_V(c$, "getScriptItem", 
function (watching, isByCommandWatcher) {
if (this.viewer.isSingleThreaded && this.viewer.queueOnHold) return null;
var scriptItem = this.scriptQueue.get (0);
var flag = ((scriptItem.get (5)).intValue ());
var isOK = (watching ? flag < 0 : isByCommandWatcher ? flag == 0 : flag == 1);
return (isOK ? scriptItem : null);
}, "~B,~B");
$_V(c$, "startCommandWatcher", 
function (isStart) {
this.useCommandWatcherThread = isStart;
if (isStart) {
if (this.commandWatcherThread != null) return;
this.commandWatcherThread = J.api.Interface.getOptionInterface ("script.CommandWatcherThread");
this.commandWatcherThread.setManager (this, this.viewer, null);
this.commandWatcherThread.start ();
} else {
if (this.commandWatcherThread == null) return;
this.clearCommandWatcherThread ();
}if (J.util.Logger.debugging) {
J.util.Logger.debug ("command watcher " + (isStart ? "started" : "stopped") + this.commandWatcherThread);
}}, "~B");
$_M(c$, "interruptQueueThreads", 
function () {
for (var i = 0; i < this.queueThreads.length; i++) {
if (this.queueThreads[i] != null) this.queueThreads[i].interrupt ();
}
});
$_M(c$, "clearCommandWatcherThread", 
function () {
if (this.commandWatcherThread == null) return;
this.commandWatcherThread.interrupt ();
this.commandWatcherThread = null;
});
$_V(c$, "queueThreadFinished", 
function (pt) {
this.queueThreads[pt].interrupt ();
this.scriptQueueRunning[pt] = false;
this.queueThreads[pt] = null;
this.viewer.setSyncDriver (4);
this.viewer.queueOnHold = false;
}, "~N");
$_M(c$, "runScriptNow", 
function () {
if (this.scriptQueue.size () > 0) {
var scriptItem = this.getScriptItem (true, true);
if (scriptItem != null) {
scriptItem.set (5, Integer.$valueOf (0));
this.startScriptQueue (true);
}}});
$_V(c$, "evalStringWaitStatusQueued", 
function (returnType, strScript, statusList, isScriptFile, isQuiet, isQueued) {
if (strScript == null) return null;
var str = this.checkScriptExecution (strScript, false);
if (str != null) return str;
var outputBuffer = (statusList == null || statusList.equals ("output") ?  new JU.SB () : null);
var oldStatusList = this.viewer.statusManager.getStatusList ();
this.viewer.getStatusChanged (statusList);
if (this.viewer.isSyntaxCheck) J.util.Logger.info ("--checking script:\n" + this.eval.getScript () + "\n----\n");
var historyDisabled = (strScript.indexOf (")") == 0);
if (historyDisabled) strScript = strScript.substring (1);
historyDisabled = historyDisabled || !isQueued;
this.viewer.setErrorMessage (null, null);
var isOK = (isScriptFile ? this.eval.compileScriptFile (strScript, isQuiet) : this.eval.compileScriptString (strScript, isQuiet));
var strErrorMessage = this.eval.getErrorMessage ();
var strErrorMessageUntranslated = this.eval.getErrorMessageUntranslated ();
this.viewer.setErrorMessage (strErrorMessage, strErrorMessageUntranslated);
this.viewer.refresh (7, "script complete");
if (isOK) {
this.$isScriptQueued = isQueued;
if (!isQuiet) this.viewer.setScriptStatus (null, strScript, -2 - (++this.scriptIndex), null);
this.eval.evaluateCompiledScript (this.viewer.isSyntaxCheck, this.viewer.isSyntaxAndFileCheck, historyDisabled, this.viewer.listCommands, outputBuffer, isQueued || !this.viewer.isSingleThreaded);
} else {
this.viewer.scriptStatus (strErrorMessage);
this.viewer.setScriptStatus ("Jmol script terminated", strErrorMessage, 1, strErrorMessageUntranslated);
this.viewer.setStateScriptVersion (null);
}if (strErrorMessage != null && this.viewer.autoExit) this.viewer.exitJmol ();
if (this.viewer.isSyntaxCheck) {
if (strErrorMessage == null) J.util.Logger.info ("--script check ok");
 else J.util.Logger.error ("--script check error\n" + strErrorMessageUntranslated);
J.util.Logger.info ("(use 'exit' to stop checking)");
}this.$isScriptQueued = true;
if (returnType.equalsIgnoreCase ("String")) return strErrorMessageUntranslated;
if (outputBuffer != null) return (strErrorMessageUntranslated == null ? outputBuffer.toString () : strErrorMessageUntranslated);
var info = this.viewer.getProperty (returnType, "jmolStatus", statusList);
this.viewer.getStatusChanged (oldStatusList);
return info;
}, "~S,~S,~S,~B,~B,~B");
$_M(c$, "checkScriptExecution", 
function (strScript, isInsert) {
var str = strScript;
if (str.indexOf ("\1##") >= 0) str = str.substring (0, str.indexOf ("\1##"));
if (this.checkResume (str)) return "script processing resumed";
if (this.checkStepping (str)) return "script processing stepped";
if (this.checkHalt (str, isInsert)) return "script execution halted";
return null;
}, "~S,~B");
$_M(c$, "checkResume", 
function (str) {
if (str.equalsIgnoreCase ("resume")) {
this.viewer.setScriptStatus ("", "execution resumed", 0, null);
this.eval.resumePausedExecution ();
return true;
}return false;
}, "~S");
$_M(c$, "checkStepping", 
function (str) {
if (str.equalsIgnoreCase ("step")) {
this.eval.stepPausedExecution ();
return true;
}if (str.equalsIgnoreCase ("?")) {
this.viewer.scriptStatus (this.eval.getNextStatement ());
return true;
}return false;
}, "~S");
$_V(c$, "evalStringQuietSync", 
function (strScript, isQuiet, allowSyncScript) {
if (allowSyncScript && this.viewer.statusManager.syncingScripts && strScript.indexOf ("#NOSYNC;") < 0) this.viewer.syncScript (strScript + " #NOSYNC;", null, 0);
if (this.eval.isPaused () && strScript.charAt (0) != '!') strScript = '!' + JU.PT.trim (strScript, "\n\r\t ");
var isInsert = (strScript.length > 0 && strScript.charAt (0) == '!');
if (isInsert) strScript = strScript.substring (1);
var msg = this.checkScriptExecution (strScript, isInsert);
if (msg != null) return msg;
if (this.viewer.isScriptExecuting () && (isInsert || this.eval.isPaused ())) {
this.viewer.setInsertedCommand (strScript);
if (strScript.indexOf ("moveto ") == 0) this.flushQueue ("moveto ");
return "!" + strScript;
}this.viewer.setInsertedCommand ("");
if (isQuiet) strScript += "\u0001## EDITOR_IGNORE ##";
return this.addScript (strScript, false, isQuiet && !this.viewer.getBoolean (603979880));
}, "~S,~B,~B");
$_V(c$, "checkHalt", 
function (str, isInsert) {
if (str.equalsIgnoreCase ("pause")) {
this.viewer.pauseScriptExecution ();
if (this.viewer.scriptEditorVisible) this.viewer.setScriptStatus ("", "paused -- type RESUME to continue", 0, null);
return true;
}if (str.equalsIgnoreCase ("menu")) {
this.viewer.getProperty ("DATA_API", "getPopupMenu", "\0");
return true;
}str = str.toLowerCase ();
var exitScript = false;
var haltType = null;
if (str.startsWith ("exit")) {
this.viewer.haltScriptExecution ();
this.viewer.clearScriptQueue ();
this.viewer.clearTimeouts ();
exitScript = str.equals (haltType = "exit");
} else if (str.startsWith ("quit")) {
this.viewer.haltScriptExecution ();
exitScript = str.equals (haltType = "quit");
}if (haltType == null) return false;
if (isInsert) {
this.viewer.clearThreads ();
this.viewer.queueOnHold = false;
}if (isInsert || this.viewer.global.waitForMoveTo) {
this.viewer.stopMotion ();
}J.util.Logger.info (this.viewer.isSyntaxCheck ? haltType + " -- stops script checking" : (isInsert ? "!" : "") + haltType + " received");
this.viewer.isSyntaxCheck = false;
return exitScript;
}, "~S,~B");
$_V(c$, "getAtomBitSetEval", 
function (eval, atomExpression) {
if (eval == null) {
eval = this.evalTemp;
if (eval == null) eval = this.evalTemp = this.newScriptEvaluator ();
}return eval.getAtomBitSet (atomExpression);
}, "J.api.JmolScriptEvaluator,~O");
$_V(c$, "scriptCheckRet", 
function (strScript, returnContext) {
if (strScript.indexOf (")") == 0 || strScript.indexOf ("!") == 0) strScript = strScript.substring (1);
var sc = this.newScriptEvaluator ().checkScriptSilent (strScript);
if (returnContext || sc.errorMessage == null) return sc;
return sc.errorMessage;
}, "~S,~B");
$_V(c$, "openFileAsync", 
function (fileName, flags) {
var pdbCartoons = (flags == 1);
var cmd = null;
fileName = fileName.trim ();
var allowScript = (!fileName.startsWith ("\t"));
if (!allowScript) fileName = fileName.substring (1);
fileName = fileName.$replace ('\\', '/');
var isCached = fileName.startsWith ("cache://");
if (this.viewer.isApplet () && fileName.indexOf ("://") < 0) fileName = "file://" + (fileName.startsWith ("/") ? "" : "/") + fileName;
try {
if (fileName.endsWith (".pse")) {
cmd = (isCached ? "" : "zap;") + "load SYNC " + J.util.Escape.eS (fileName) + " filter 'DORESIZE'";
return;
}if (fileName.endsWith ("jvxl")) {
cmd = "isosurface ";
return;
}if (!fileName.endsWith (".spt")) {
var type = this.getFileTypeName (fileName);
if (type == null) {
type = J.io.JmolBinary.determineSurfaceTypeIs (this.viewer.getBufferedInputStream (fileName));
if (type != null) cmd = "if (_filetype == 'Pdb') { isosurface sigma 1.0 within 2.0 {*} " + J.util.Escape.eS (fileName) + " mesh nofill }; else; { isosurface " + J.util.Escape.eS (fileName) + "}";
return;
} else if (type.equals ("Jmol")) {
cmd = "script ";
} else if (type.equals ("Cube")) {
cmd = "isosurface sign red blue ";
} else if (!type.equals ("spt")) {
cmd = this.viewer.global.defaultDropScript;
cmd = JU.PT.simpleReplace (cmd, "%FILE", fileName);
cmd = JU.PT.simpleReplace (cmd, "%ALLOWCARTOONS", "" + pdbCartoons);
if (cmd.toLowerCase ().startsWith ("zap") && isCached) cmd = cmd.substring (3);
return;
}}if (allowScript && this.viewer.scriptEditorVisible && cmd == null) this.viewer.showEditor ([fileName, this.viewer.getFileAsString (fileName)]);
 else cmd = (cmd == null ? "script " : cmd) + J.util.Escape.eS (fileName);
} finally {
if (cmd != null) this.viewer.evalString (cmd);
}
}, "~S,~N");
$_M(c$, "getFileTypeName", 
function (fileName) {
var pt = fileName.indexOf ("::");
if (pt >= 0) return fileName.substring (0, pt);
if (fileName.startsWith ("=")) return "pdb";
var br = this.viewer.fileManager.getUnzippedReaderOrStreamFromName (fileName, null, true, false, true, true, null);
if (Clazz_instanceOf (br, java.io.BufferedReader)) return this.viewer.getModelAdapter ().getFileTypeName (br);
if (Clazz_instanceOf (br, javajs.api.ZInputStream)) {
var zipDirectory = this.getZipDirectoryAsString (fileName);
if (zipDirectory.indexOf ("JmolManifest") >= 0) return "Jmol";
return this.viewer.getModelAdapter ().getFileTypeName (J.io.JmolBinary.getBR (zipDirectory));
}if (JU.PT.isAS (br)) {
return (br)[0];
}return null;
}, "~S");
$_M(c$, "getZipDirectoryAsString", 
function (fileName) {
var t = this.viewer.fileManager.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false);
return J.io.JmolBinary.getZipDirectoryAsStringAndClose (t);
}, "~S");
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.api.JmolScriptEvaluator"], "J.script.ScriptEvaluator", ["java.lang.Boolean", "$.Float", "$.NullPointerException", "$.Thread", "java.util.Hashtable", "$.Map", "JU.BS", "$.CU", "$.List", "$.M3", "$.M4", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "J.api.Interface", "$.JmolParallelProcessor", "J.atomdata.RadiusData", "J.constant.EnumAnimationMode", "$.EnumPalette", "$.EnumStereoMode", "$.EnumStructure", "$.EnumVdw", "J.i18n.GT", "J.io.JmolBinary", "J.modelset.Atom", "$.BondSet", "$.Group", "$.ModelCollection", "$.TickInfo", "J.script.FileLoadThread", "$.SV", "$.ScriptCompiler", "$.ScriptContext", "$.ScriptDelayThread", "$.ScriptException", "$.ScriptInterruption", "$.ScriptMathProcessor", "$.T", "J.util.BSUtil", "$.ColorEncoder", "$.Elements", "$.Escape", "$.GData", "$.JmolEdge", "$.Logger", "$.Measure", "$.Parser", "$.Quaternion", "$.SimpleUnitCell", "$.Txt", "J.viewer.ActionManager", "$.FileManager", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.allowJSThreads = true;
this.listCommands = false;
this.isJS = false;
this.tQuiet = false;
this.chk = false;
this.isCmdLine_C_Option = false;
this.isCmdLine_c_or_C_Option = false;
this.historyDisabled = false;
this.logMessages = false;
this.debugScript = false;
this.executionStopped = false;
this.executionPaused = false;
this.executionStepping = false;
this.executing = false;
this.timeBeginExecution = 0;
this.timeEndExecution = 0;
this.mustResumeEval = false;
this.sm = null;
this.currentThread = null;
this.viewer = null;
this.compiler = null;
this.definedAtomSets = null;
this.outputBuffer = null;
this.contextPath = "";
this.scriptFileName = null;
this.functionName = null;
this.isStateScript = false;
this.scriptLevel = 0;
this.scriptReportingLevel = 0;
this.commandHistoryLevelMax = 0;
this.aatoken = null;
this.lineNumbers = null;
this.lineIndices = null;
this.contextVariables = null;
this.$script = null;
this.pc = 0;
this.thisCommand = null;
this.fullCommand = null;
this.st = null;
this.slen = 0;
this.iToken = 0;
this.lineEnd = 0;
this.pcEnd = 0;
this.scriptExtensions = null;
this.forceNoAddHydrogens = false;
this.parallelProcessor = null;
this.thisContext = null;
this.$error = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorType = null;
this.iCommandError = 0;
this.ignoreError = false;
this.tempStatement = null;
this.isBondSet = false;
this.expressionResult = null;
this.theTok = 0;
this.theToken = null;
this.coordinatesAreFractional = false;
this.fractionalPoint = null;
this.scriptExt = null;
this.colorArgb = null;
this.scriptDelayThread = null;
this.fileLoadThread = null;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptEvaluator", null, J.api.JmolScriptEvaluator);
Clazz_prepareFields (c$, function () {
this.colorArgb = [-2147483648];
});
$_V(c$, "getAllowJSThreads", 
function () {
return this.allowJSThreads;
});
$_V(c$, "setViewer", 
function (viewer) {
this.viewer = viewer;
this.compiler = (this.compiler == null ? viewer.compiler : this.compiler);
this.isJS = viewer.isSingleThreaded;
this.definedAtomSets = viewer.definedAtomSets;
return this;
}, "J.viewer.Viewer");
Clazz_makeConstructor (c$, 
function () {
this.currentThread = Thread.currentThread ();
});
$_V(c$, "setCompiler", 
function () {
this.viewer.compiler = this.compiler =  new J.script.ScriptCompiler (this.viewer);
});
$_V(c$, "compileScriptString", 
function (script, tQuiet) {
this.clearState (tQuiet);
this.contextPath = "[script]";
return this.compileScript (null, script, this.debugScript);
}, "~S,~B");
$_V(c$, "compileScriptFile", 
function (filename, tQuiet) {
this.clearState (tQuiet);
this.contextPath = filename;
return this.compileScriptFileInternal (filename, null, null, null);
}, "~S,~B");
$_V(c$, "evaluateCompiledScript", 
function (isCmdLine_c_or_C_Option, isCmdLine_C_Option, historyDisabled, listCommands, outputBuffer, allowThreads) {
var tempOpen = this.isCmdLine_C_Option;
this.isCmdLine_C_Option = isCmdLine_C_Option;
this.chk = this.isCmdLine_c_or_C_Option = isCmdLine_c_or_C_Option;
this.historyDisabled = historyDisabled;
this.outputBuffer = outputBuffer;
this.currentThread = Thread.currentThread ();
this.allowJSThreads = allowThreads;
this.listCommands = listCommands;
this.startEval ();
this.isCmdLine_C_Option = tempOpen;
this.viewer.setStateScriptVersion (null);
}, "~B,~B,~B,~B,JU.SB,~B");
$_M(c$, "useThreads", 
function () {
return (!this.viewer.autoExit && this.viewer.haveDisplay && this.outputBuffer == null && this.allowJSThreads);
});
$_M(c$, "startEval", 
function () {
this.timeBeginExecution = System.currentTimeMillis ();
this.executionStopped = this.executionPaused = false;
this.executionStepping = false;
this.executing = true;
this.viewer.pushHoldRepaintWhy ("runEval");
this.setScriptExtensions ();
this.executeCommands (false);
});
$_M(c$, "executeCommands", 
function (isTry) {
var haveError = false;
try {
if (!this.dispatchCommands (false, false)) return;
} catch (e$$) {
if (Clazz_exceptionOf (e$$, Error)) {
var er = e$$;
{
this.viewer.handleError (er, false);
this.setErrorMessage ("" + er + " " + this.viewer.getShapeErrorState ());
this.errorMessageUntranslated = "" + er;
this.scriptStatusOrBuffer (this.errorMessage);
haveError = true;
}
} else if (Clazz_exceptionOf (e$$, J.script.ScriptException)) {
var e = e$$;
{
if (Clazz_instanceOf (e, J.script.ScriptInterruption)) {
return;
}if (isTry) {
this.viewer.setStringProperty ("_errormessage", "" + e);
return;
}this.setErrorMessage (e.toString ());
this.errorMessageUntranslated = e.getErrorMessageUntranslated ();
this.scriptStatusOrBuffer (this.errorMessage);
this.viewer.notifyError ((this.errorMessage != null && this.errorMessage.indexOf ("java.lang.OutOfMemoryError") >= 0 ? "Error" : "ScriptException"), this.errorMessage, this.errorMessageUntranslated);
haveError = true;
}
} else {
throw e$$;
}
}
if (haveError || !this.isJS || !this.allowJSThreads) {
this.viewer.setTainted (true);
this.viewer.popHoldRepaint ("executeCommands" + " " + (this.scriptLevel > 0 ? "\u0001## REPAINT_IGNORE ##" : ""));
}this.timeEndExecution = System.currentTimeMillis ();
if (this.errorMessage == null && this.executionStopped) this.setErrorMessage ("execution interrupted");
 else if (!this.tQuiet && !this.chk) this.viewer.scriptStatus ("Script completed");
this.executing = this.chk = this.isCmdLine_c_or_C_Option = this.historyDisabled = false;
var msg = this.getErrorMessageUntranslated ();
this.viewer.setErrorMessage (this.errorMessage, msg);
if (!this.tQuiet) this.viewer.setScriptStatus ("Jmol script terminated", this.errorMessage, 1 + this.getExecutionWalltime (), msg);
}, "~B");
$_V(c$, "resumeEval", 
function (sc) {
this.setErrorMessage (null);
if (this.executionStopped || sc == null || !sc.mustResumeEval) {
this.viewer.setTainted (true);
this.viewer.popHoldRepaint ("resumeEval");
this.viewer.queueOnHold = false;
return;
}if (!this.executionPaused) sc.pc++;
this.thisContext = sc;
if (sc.scriptLevel > 0) this.scriptLevel = sc.scriptLevel - 1;
this.restoreScriptContext (sc, true, false, false);
this.executeCommands (sc.isTryCatch);
}, "J.script.ScriptContext");
$_V(c$, "runScript", 
function (script) {
if (!this.viewer.isPreviewOnly ()) this.runScriptBuffer (script, this.outputBuffer);
}, "~S");
$_V(c$, "runScriptBuffer", 
function (script, outputBuffer) {
this.pushContext (null, "runScriptBuffer");
this.contextPath += " >> script() ";
this.outputBuffer = outputBuffer;
this.allowJSThreads = false;
if (this.compileScript (null, script + "\u0001## EDITOR_IGNORE ##" + "\u0001## REPAINT_IGNORE ##", false)) this.dispatchCommands (false, false);
this.popContext (false, false);
}, "~S,JU.SB");
$_V(c$, "checkScriptSilent", 
function (script) {
var sc = this.compiler.compile (null, script, false, true, false, true);
if (sc.errorType != null) return sc;
this.restoreScriptContext (sc, false, false, false);
this.chk = true;
this.isCmdLine_c_or_C_Option = this.isCmdLine_C_Option = false;
this.pc = 0;
try {
this.dispatchCommands (false, false);
} catch (e) {
if (Clazz_exceptionOf (e, J.script.ScriptException)) {
this.setErrorMessage (e.toString ());
sc = this.getScriptContext ("checkScriptSilent");
} else {
throw e;
}
}
this.chk = false;
return sc;
}, "~S");
c$.getContextTrace = $_M(c$, "getContextTrace", 
function (viewer, sc, sb, isTop) {
if (sb == null) sb =  new JU.SB ();
sb.append (J.script.ScriptEvaluator.getErrorLineMessage (sc.functionName, sc.scriptFileName, sc.lineNumbers[sc.pc], sc.pc, J.script.ScriptEvaluator.statementAsString (viewer, sc.statement, (isTop ? sc.iToken : 9999), false)));
if (sc.parentContext != null) J.script.ScriptEvaluator.getContextTrace (viewer, sc.parentContext, sb, false);
return sb;
}, "J.viewer.Viewer,J.script.ScriptContext,JU.SB,~B");
$_V(c$, "setDebugging", 
function () {
this.debugScript = this.viewer.getBoolean (603979824);
this.logMessages = (this.debugScript && J.util.Logger.debugging);
});
$_M(c$, "getExecutionWalltime", 
function () {
return (this.timeEndExecution - this.timeBeginExecution);
});
$_V(c$, "haltExecution", 
function () {
this.resumePausedExecution ();
this.executionStopped = true;
});
$_V(c$, "pauseExecution", 
function (withDelay) {
if (this.chk || this.viewer.isHeadless ()) return;
if (withDelay && !this.isJS) this.delayScript (-100);
this.viewer.popHoldRepaint ("pauseExecution " + withDelay);
this.executionStepping = false;
this.executionPaused = true;
}, "~B");
$_V(c$, "stepPausedExecution", 
function () {
this.executionStepping = true;
this.executionPaused = false;
});
$_V(c$, "resumePausedExecution", 
function () {
this.executionPaused = false;
this.executionStepping = false;
});
$_V(c$, "isExecuting", 
function () {
return this.executing && !this.executionStopped;
});
$_V(c$, "isPaused", 
function () {
return this.executionPaused;
});
$_V(c$, "isStepping", 
function () {
return this.executionStepping;
});
$_V(c$, "isStopped", 
function () {
return this.executionStopped || !this.isJS && this.currentThread !== Thread.currentThread ();
});
$_V(c$, "getNextStatement", 
function () {
return (this.pc < this.aatoken.length ? J.script.ScriptEvaluator.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, J.script.ScriptEvaluator.statementAsString (this.viewer, this.aatoken[this.pc], -9999, this.logMessages)) : "");
});
$_M(c$, "getCommand", 
function (pc, allThisLine, addSemi) {
if (pc >= this.lineIndices.length) return "";
if (allThisLine) {
var pt0 = -1;
var pt1 = this.$script.length;
for (var i = 0; i < this.lineNumbers.length; i++) if (this.lineNumbers[i] == this.lineNumbers[pc]) {
if (pt0 < 0) pt0 = this.lineIndices[i][0];
pt1 = this.lineIndices[i][1];
} else if (this.lineNumbers[i] == 0 || this.lineNumbers[i] > this.lineNumbers[pc]) {
break;
}
var s = this.$script;
if (s.indexOf ('\1') >= 0) s = s.substring (0, s.indexOf ('\1'));
if (pt1 == s.length - 1 && s.endsWith ("}")) pt1++;
return (pt0 == s.length || pt1 < pt0 ? "" : s.substring (Math.max (pt0, 0), Math.min (s.length, pt1)));
}var ichBegin = this.lineIndices[pc][0];
var ichEnd = this.lineIndices[pc][1];
var s = "";
if (ichBegin < 0 || ichEnd <= ichBegin || ichEnd > this.$script.length) return "";
try {
s = this.$script.substring (ichBegin, ichEnd);
if (s.indexOf ("\\\n") >= 0) s = JU.PT.simpleReplace (s, "\\\n", "  ");
if (s.indexOf ("\\\r") >= 0) s = JU.PT.simpleReplace (s, "\\\r", "  ");
if (s.length > 0 && !s.endsWith (";")) s += ";";
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
J.util.Logger.error ("darn problem in Eval getCommand: ichBegin=" + ichBegin + " ichEnd=" + ichEnd + " len = " + this.$script.length + "\n" + e);
} else {
throw e;
}
}
return s;
}, "~N,~B,~B");
$_M(c$, "logDebugScript", 
function (ifLevel) {
if (this.logMessages) {
if (this.st.length > 0) J.util.Logger.debug (this.st[0].toString ());
for (var i = 1; i < this.slen; ++i) J.util.Logger.debug (this.st[i].toString ());

}this.iToken = -9999;
if (this.logMessages) {
var strbufLog =  new JU.SB ();
var s = (ifLevel > 0 ? "                          ".substring (0, ifLevel * 2) : "");
strbufLog.append (s).append (J.script.ScriptEvaluator.statementAsString (this.viewer, this.st, this.iToken, this.logMessages));
this.viewer.scriptStatus (strbufLog.toString ());
} else {
var cmd = this.getCommand (this.pc, false, false);
if (cmd !== "") this.viewer.scriptStatus (cmd);
}}, "~N");
$_V(c$, "evaluateExpression", 
function (expr, asVariable) {
var e = ( new J.script.ScriptEvaluator ()).setViewer (this.viewer);
try {
e.pushContext (null, "evalExp");
e.allowJSThreads = false;
} catch (e1) {
if (Clazz_exceptionOf (e1, J.script.ScriptException)) {
} else {
throw e1;
}
}
return (e.evaluate (expr, asVariable));
}, "~O,~B");
$_M(c$, "evaluate", 
function (expr, asVariable) {
try {
if (Clazz_instanceOf (expr, String)) {
if (this.compileScript (null, "e_x_p_r_e_s_s_i_o_n" + " = " + expr, false)) {
this.contextVariables = this.viewer.getContextVariables ();
this.setStatement (0);
return (asVariable ? this.parameterExpressionList (2, -1, false).get (0) : this.parameterExpressionString (2, 0));
}} else if (Clazz_instanceOf (expr, Array)) {
this.contextVariables = this.viewer.getContextVariables ();
var bs = this.atomExpression (expr, 0, 0, true, false, true, false);
return (asVariable ? J.script.SV.newV (10, bs) : bs);
}} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
J.util.Logger.error ("Error evaluating: " + expr + "\n" + ex);
} else {
throw ex;
}
}
return (asVariable ? J.script.SV.getVariable ("ERROR") : "ERROR");
}, "~O,~B");
$_V(c$, "getAtomBitSet", 
function (atomExpression) {
if (Clazz_instanceOf (atomExpression, JU.BS)) return atomExpression;
var bs =  new JU.BS ();
try {
this.pushContext (null, "getAtomBitSet");
var scr = "select (" + atomExpression + ")";
scr = JU.PT.replaceAllCharacters (scr, "\n\r", "),(");
scr = JU.PT.simpleReplace (scr, "()", "(none)");
if (this.compileScript (null, scr, false)) {
this.st = this.aatoken[0];
bs = this.atomExpression (this.st, 1, 0, false, false, true, true);
}this.popContext (false, false);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
J.util.Logger.error ("getAtomBitSet " + atomExpression + "\n" + ex);
} else {
throw ex;
}
}
return bs;
}, "~O");
$_V(c$, "getAtomBitSetVector", 
function (atomCount, atomExpression) {
var V =  new JU.List ();
var bs = this.getAtomBitSet (atomExpression);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
V.addLast (Integer.$valueOf (i));
}
return V;
}, "~N,~O");
$_M(c$, "parameterExpressionList", 
function (pt, ptAtom, isArrayItem) {
return this.parameterExpression (pt, -1, null, true, true, ptAtom, isArrayItem, null, null);
}, "~N,~N,~B");
$_M(c$, "parameterExpressionString", 
function (pt, ptMax) {
return this.parameterExpression (pt, ptMax, "", true, false, -1, false, null, null);
}, "~N,~N");
$_M(c$, "parameterExpressionBoolean", 
function (pt, ptMax) {
return (this.parameterExpression (pt, ptMax, null, true, false, -1, false, null, null)).booleanValue ();
}, "~N,~N");
$_M(c$, "parameterExpressionToken", 
function (pt) {
var result = this.parameterExpressionList (pt, -1, false);
return (result.size () > 0 ? result.get (0) : J.script.SV.newS (""));
}, "~N");
$_M(c$, "parameterExpression", 
function (pt, ptMax, key, ignoreComma, asVector, ptAtom, isArrayItem, localVars, localVar) {
var v;
var res;
var isImplicitAtomProperty = (localVar != null);
var isOneExpressionOnly = (pt < 0);
var returnBoolean = (!asVector && key == null);
var returnString = (!asVector && key != null && key.length == 0);
var nSquare = 0;
if (isOneExpressionOnly) pt = -pt;
var nParen = 0;
var rpn =  new J.script.ScriptMathProcessor (this, isArrayItem, asVector, false);
if (pt == 0 && ptMax == 0) pt = 2;
if (ptMax < pt) ptMax = this.slen;
out : for (var i = pt; i < ptMax; i++) {
v = null;
var tok = this.getToken (i).tok;
if (isImplicitAtomProperty && this.tokAt (i + 1) != 1048584) {
var token = (localVars != null && localVars.containsKey (this.theToken.value) ? null : this.getBitsetPropertySelector (i, false));
if (token != null) {
rpn.addXVar (localVars.get (localVar));
if (!rpn.addOpAllowMath (token, (this.tokAt (i + 1) == 269484048))) this.invArg ();
if ((token.intValue == 135368713 || token.intValue == 102436) && this.tokAt (this.iToken + 1) != 269484048) {
rpn.addOp (J.script.T.tokenLeftParen);
rpn.addOp (J.script.T.tokenRightParen);
}i = this.iToken;
continue;
}}switch (tok) {
case 1060866:
if (this.tokAt (++i) == 1048577) {
v = this.parameterExpressionToken (++i);
i = this.iToken;
} else if (this.tokAt (i) == 2) {
v = this.viewer.getAtomBits (1095763969, Integer.$valueOf (this.st[i].intValue));
break;
} else {
v = this.getParameter (J.script.SV.sValue (this.st[i]), 1073742190);
}v = this.getParameter ((v).asString (), 1073742190);
break;
case 135369225:
if (this.getToken (++i).tok != 269484048) this.invArg ();
if (localVars == null) localVars =  new java.util.Hashtable ();
res = this.parameterExpression (++i, -1, null, ignoreComma, false, -1, false, localVars, localVar);
var TF = (res).booleanValue ();
var iT = this.iToken;
if (this.getToken (iT++).tok != 1048591) this.invArg ();
this.parameterExpressionBoolean (iT, -1);
var iF = this.iToken;
if (this.tokAt (iF++) != 1048591) this.invArg ();
this.parameterExpression (-iF, -1, null, ignoreComma, false, 1, false, localVars, localVar);
var iEnd = this.iToken;
if (this.tokAt (iEnd) != 269484049) this.invArg ();
v = this.parameterExpression (TF ? iT : iF, TF ? iF : iEnd, "XXX", ignoreComma, false, 1, false, localVars, localVar);
i = iEnd;
break;
case 135369224:
case 135280132:
var isFunctionOfX = (pt > 0);
var isFor = (isFunctionOfX && tok == 135369224);
var dummy;
if (isFunctionOfX) {
if (this.getToken (++i).tok != 269484048 || !J.script.T.tokAttr (this.getToken (++i).tok, 1073741824)) this.invArg ();
dummy = this.parameterAsString (i);
if (this.getToken (++i).tok != 1048591) this.invArg ();
} else {
dummy = "_x";
}v = this.parameterExpressionToken (-(++i)).value;
if (!(Clazz_instanceOf (v, JU.BS))) this.invArg ();
var bsAtoms = v;
i = this.iToken;
if (isFunctionOfX && this.getToken (i++).tok != 1048591) this.invArg ();
var bsSelect =  new JU.BS ();
var bsX =  new JU.BS ();
var sout = (isFor ?  new Array (J.util.BSUtil.cardinalityOf (bsAtoms)) : null);
if (localVars == null) localVars =  new java.util.Hashtable ();
bsX.set (0);
var t = J.script.SV.newV (10, bsX);
t.index = 0;
localVars.put (dummy, t.setName (dummy));
var pt2 = -1;
if (isFunctionOfX) {
pt2 = i - 1;
var np = 0;
var tok2;
while (np >= 0 && ++pt2 < ptMax) {
if ((tok2 = this.tokAt (pt2)) == 269484049) np--;
 else if (tok2 == 269484048) np++;
}
}var p = 0;
var jlast = 0;
var j = bsAtoms.nextSetBit (0);
if (j < 0) {
this.iToken = pt2 - 1;
} else if (!this.chk) {
for (; j >= 0; j = bsAtoms.nextSetBit (j + 1)) {
if (jlast >= 0) bsX.clear (jlast);
jlast = j;
bsX.set (j);
t.index = j;
res = this.parameterExpression (i, pt2, (isFor ? "XXX" : null), ignoreComma, isFor, j, false, localVars, isFunctionOfX ? null : dummy);
if (isFor) {
if (res == null || (res).size () == 0) this.invArg ();
sout[p++] = ((res).get (0)).asString ();
} else if ((res).booleanValue ()) {
bsSelect.set (j);
}}
}if (isFor) {
v = sout;
} else if (isFunctionOfX) {
v = bsSelect;
} else {
return this.bitsetVariableVector (bsSelect);
}i = this.iToken + 1;
break;
case 1048591:
break out;
case 3:
rpn.addXNum (J.script.SV.newV (3, this.theToken.value));
break;
case 1048614:
case 2:
rpn.addXNum (J.script.SV.newI (this.theToken.intValue));
break;
case 135266319:
if (this.tokAt (this.iToken + 1) == 269484048) {
if (!rpn.addOpAllowMath (this.theToken, true)) this.invArg ();
break;
}rpn.addXVar (J.script.SV.newT (this.theToken));
break;
case 1087375362:
case 1087375361:
case 1048580:
case 1679429641:
case 1087373316:
case 1048582:
case 1087375365:
case 1087373318:
case 1095766030:
case 1095761936:
case 1087373320:
case 1095761940:
case 135267335:
case 135267336:
case 1238369286:
case 1641025539:
case 1048589:
case 1048588:
case 4:
case 8:
case 9:
case 11:
case 12:
case 10:
case 6:
rpn.addXVar (J.script.SV.newT (this.theToken));
break;
case 1048583:
this.ignoreError = true;
var ptc;
try {
ptc = this.centerParameter (i);
rpn.addXVar (J.script.SV.newV (8, ptc));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
rpn.addXStr ("");
} else {
throw e;
}
}
this.ignoreError = false;
i = this.iToken;
break;
case 1048586:
if (this.tokAt (i + 1) == 4) v = this.getHash (i);
 else v = this.getPointOrPlane (i, false, true, true, false, 3, 4);
i = this.iToken;
break;
case 1048577:
if (this.tokAt (i + 1) == 1048578) {
v =  new java.util.Hashtable ();
i++;
break;
} else if (this.tokAt (i + 1) == 1048579 && this.tokAt (i + 2) == 1048578) {
tok = 1048579;
this.iToken += 2;
}case 1048579:
if (tok == 1048579) v = this.viewer.getAllAtoms ();
 else v = this.atomExpression (this.st, i, 0, true, true, true, true);
i = this.iToken;
if (nParen == 0 && isOneExpressionOnly) {
this.iToken++;
return this.bitsetVariableVector (v);
}break;
case 1073742195:
rpn.addOp (this.theToken);
continue;
case 1048578:
i++;
break out;
case 1048590:
if (!ignoreComma && nParen == 0 && nSquare == 0) break out;
this.invArg ();
break;
case 269484080:
if (!ignoreComma && nParen == 0 && nSquare == 0) {
break out;
}if (!rpn.addOp (this.theToken)) this.invArg ();
break;
case 1048584:
var token = this.getBitsetPropertySelector (i + 1, false);
if (token == null) this.invArg ();
var isUserFunction = (token.intValue == 135368713);
var allowMathFunc = true;
var tok2 = this.tokAt (this.iToken + 2);
if (this.tokAt (this.iToken + 1) == 1048584) {
switch (tok2) {
case 1048579:
tok2 = 480;
if (this.tokAt (this.iToken + 3) == 1048584 && this.tokAt (this.iToken + 4) == 1276118529) tok2 = 224;
case 32:
case 64:
case 192:
case 128:
case 160:
case 96:
allowMathFunc = (isUserFunction || token.intValue == 1276118018 || tok2 == 480 || tok2 == 224);
token.intValue |= tok2;
this.getToken (this.iToken + 2);
}
}allowMathFunc = new Boolean (allowMathFunc & (this.tokAt (this.iToken + 1) == 269484048 || isUserFunction)).valueOf ();
if (!rpn.addOpAllowMath (token, allowMathFunc)) this.invArg ();
i = this.iToken;
if (token.intValue == 135368713 && this.tokAt (i + 1) != 269484048) {
rpn.addOp (J.script.T.tokenLeftParen);
rpn.addOp (J.script.T.tokenRightParen);
}break;
default:
if (J.script.T.tokAttr (this.theTok, 269484032) || J.script.T.tokAttr (this.theTok, 135266304) && this.tokAt (this.iToken + 1) == 269484048) {
if (!rpn.addOp (this.theToken)) {
if (ptAtom >= 0) {
break out;
}this.invArg ();
}switch (this.theTok) {
case 269484048:
nParen++;
break;
case 269484049:
if (--nParen <= 0 && nSquare == 0 && isOneExpressionOnly) {
this.iToken++;
break out;
}break;
case 269484096:
nSquare++;
break;
case 269484097:
if (--nSquare == 0 && nParen == 0 && isOneExpressionOnly) {
this.iToken++;
break out;
}break;
}
} else {
var name = this.parameterAsString (i).toLowerCase ();
var haveParens = (this.tokAt (i + 1) == 269484048);
if (this.chk) {
v = name;
} else if (!haveParens && (localVars == null || (v = localVars.get (name)) == null)) {
v = this.getContextVariableAsVariable (name);
}if (v == null) {
if (J.script.T.tokAttr (this.theTok, 1073741824) && this.viewer.isFunction (name)) {
if (!rpn.addOp (J.script.SV.newV (135368713, this.theToken.value))) this.invArg ();
if (!haveParens) {
rpn.addOp (J.script.T.tokenLeftParen);
rpn.addOp (J.script.T.tokenRightParen);
}} else {
rpn.addXVar (this.viewer.getOrSetNewVariable (name, false));
}}}}
if (v != null) {
if (Clazz_instanceOf (v, JU.BS)) rpn.addXBs (v);
 else rpn.addXObj (v);
}}
var result = rpn.getResult (false);
if (result == null) {
if (!this.chk) rpn.dumpStacks ("null result");
this.error (13);
}if (result.tok == 135198) return result.value;
if (returnBoolean) return Boolean.$valueOf (result.asBoolean ());
if (returnString) {
if (result.tok == 4) result.intValue = 2147483647;
return result.asString ();
}switch (result.tok) {
case 1048589:
case 1048588:
return Boolean.$valueOf (result.intValue == 1);
case 2:
return Integer.$valueOf (result.intValue);
case 10:
case 3:
case 4:
case 8:
default:
return result.value;
}
}, "~N,~N,~S,~B,~B,~N,~B,java.util.Map,~S");
$_M(c$, "getHash", 
function (i) {
var ht =  new java.util.Hashtable ();
for (i = i + 1; i < this.slen; i++) {
if (this.tokAt (i) == 1048590) break;
var key = this.stringParameter (i++);
if (this.tokAt (i++) != 269484066) this.invArg ();
var v = this.parameterExpression (i, 0, null, false, true, -1, false, null, null);
ht.put (key, v.get (0));
i = this.iToken;
if (this.tokAt (i) != 269484080) break;
}
this.iToken = i;
if (this.tokAt (i) != 1048590) this.invArg ();
return ht;
}, "~N");
$_M(c$, "bitsetVariableVector", 
function (v) {
var resx =  new JU.List ();
if (Clazz_instanceOf (v, JU.BS)) {
resx.addLast (J.script.SV.newV (10, v));
}return resx;
}, "~O");
$_M(c$, "getBitsetPropertySelector", 
function (i, mustBeSettable) {
var tok = this.getToken (i).tok;
switch (tok) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
case 1716520985:
break;
default:
if (J.script.T.tokAttrOr (tok, 1078984704, 1141899264)) break;
if (tok != 806354977 && !J.script.T.tokAttr (tok, 1073741824)) return null;
var name = this.parameterAsString (i);
if (!mustBeSettable && this.viewer.isFunction (name)) {
tok = 135368713;
break;
}if (!name.endsWith ("?")) return null;
tok = 1073741824;
}
if (mustBeSettable && !J.script.T.tokAttr (tok, 2048)) return null;
return J.script.SV.newSV (269484241, tok, this.parameterAsString (i).toLowerCase ());
}, "~N,~B");
$_M(c$, "getBitsetPropertyFloat", 
function (bs, tok, min, max) {
var data = this.getBitsetProperty (bs, tok, null, null, null, null, false, 2147483647, false);
if (!Float.isNaN (min)) for (var i = 0; i < data.length; i++) if (data[i] < min) data[i] = NaN;

if (!Float.isNaN (max)) for (var i = 0; i < data.length; i++) if (data[i] > max) data[i] = NaN;

return data;
}, "JU.BS,~N,~N,~N");
$_M(c$, "getBitsetProperty", 
function (bs, tok, ptRef, planeRef, tokenValue, opValue, useAtomMap, index, asVectorIfAll) {
var haveIndex = (index != 2147483647);
var isAtoms = haveIndex || !(Clazz_instanceOf (tokenValue, J.modelset.BondSet));
var minmaxtype = tok & 480;
var selectedFloat = (minmaxtype == 224);
var atomCount = this.viewer.getAtomCount ();
var fout = (minmaxtype == 256 ?  Clazz_newFloatArray (atomCount, 0) : null);
var isExplicitlyAll = (minmaxtype == 480 || selectedFloat);
tok &= -481;
if (tok == 0) tok = (isAtoms ? 1141899265 : 1678770178);
var isPt = false;
var isInt = false;
var isString = false;
switch (tok) {
case 1146095626:
case 1146095631:
case 1146095627:
case 1146095629:
case 1146093582:
case 1766856708:
case 1146095628:
isPt = true;
break;
case 135368713:
case 1276118018:
break;
default:
isInt = J.script.T.tokAttr (tok, 1095761920) && !J.script.T.tokAttr (tok, 1112539136);
isString = !isInt && J.script.T.tokAttr (tok, 1087373312);
}
var pt = (isPt || !isAtoms ?  new JU.P3 () : null);
if (isExplicitlyAll || isString && !haveIndex && minmaxtype != 256 && minmaxtype != 32) minmaxtype = 1048579;
var vout = (minmaxtype == 1048579 ?  new JU.List () : null);
var bsNew = null;
var userFunction = null;
var params = null;
var bsAtom = null;
var tokenAtom = null;
var ptT = null;
var data = null;
switch (tok) {
case 1141899265:
case 1678770178:
if (this.chk) return bs;
bsNew = (tok == 1141899265 ? (isAtoms ? bs : this.viewer.getAtomBits (1678770178, bs)) : (isAtoms ?  new J.modelset.BondSet (this.viewer.getBondsForSelectedAtoms (bs)) : bs));
var i;
switch (minmaxtype) {
case 32:
i = bsNew.nextSetBit (0);
break;
case 64:
i = bsNew.length () - 1;
break;
case 192:
case 128:
case 160:
return Float.$valueOf (NaN);
default:
return bsNew;
}
bsNew.clearAll ();
if (i >= 0) bsNew.set (i);
return bsNew;
case 1087373321:
switch (minmaxtype) {
case 0:
case 1048579:
return this.getExtension ().getBitsetIdent (bs, null, tokenValue, useAtomMap, index, isExplicitlyAll);
}
return "";
case 135368713:
userFunction = (opValue)[0];
params = (opValue)[1];
bsAtom = J.util.BSUtil.newBitSet (atomCount);
tokenAtom = J.script.SV.newV (10, bsAtom);
break;
case 1112539150:
case 1112539151:
this.viewer.autoCalculate (tok);
break;
case 1276118018:
if (ptRef == null && planeRef == null) return  new JU.P3 ();
break;
case 1766856708:
ptT =  new JU.P3 ();
break;
case 1716520985:
data = this.viewer.getDataFloat (opValue);
break;
}
var n = 0;
var ivMinMax = 0;
var fvMinMax = 0;
var sum = 0;
var sum2 = 0;
switch (minmaxtype) {
case 32:
ivMinMax = 2147483647;
fvMinMax = 3.4028235E38;
break;
case 64:
ivMinMax = -2147483648;
fvMinMax = -3.4028235E38;
break;
}
var modelSet = this.viewer.modelSet;
var mode = (isPt ? 3 : isString ? 2 : isInt ? 1 : 0);
if (isAtoms) {
var haveBitSet = (bs != null);
var i0;
var i1;
if (haveIndex) {
i0 = index;
i1 = index + 1;
} else if (haveBitSet) {
i0 = bs.nextSetBit (0);
i1 = Math.min (atomCount, bs.length ());
} else {
i0 = 0;
i1 = atomCount;
}if (this.chk) i1 = 0;
for (var i = i0; i >= 0 && i < i1; i = (haveBitSet ? bs.nextSetBit (i + 1) : i + 1)) {
n++;
var atom = modelSet.atoms[i];
switch (mode) {
case 0:
var fv = 3.4028235E38;
switch (tok) {
case 135368713:
bsAtom.set (i);
fv = J.script.SV.fValue (this.runFunctionRet (null, userFunction, params, tokenAtom, true, true, false));
bsAtom.clear (i);
break;
case 1716520985:
fv = (data == null ? 0 : data[i]);
break;
case 1276118018:
if (planeRef != null) fv = J.util.Measure.distanceToPlane (planeRef, atom);
 else fv = atom.distance (ptRef);
break;
default:
fv = J.modelset.Atom.atomPropertyFloat (this.viewer, atom, tok);
}
if (fv == 3.4028235E38 || Float.isNaN (fv) && minmaxtype != 1048579) {
n--;
continue;
}switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 256:
fout[i] = fv;
break;
case 1048579:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += (fv) * fv;
case 128:
default:
sum += fv;
}
break;
case 1:
var iv = 0;
switch (tok) {
case 1095766024:
case 1095761925:
this.errorStr (45, J.script.T.nameOf (tok));
break;
default:
iv = J.modelset.Atom.atomPropertyInt (atom, tok);
}
switch (minmaxtype) {
case 32:
if (iv < ivMinMax) ivMinMax = iv;
break;
case 64:
if (iv > ivMinMax) ivMinMax = iv;
break;
case 256:
fout[i] = iv;
break;
case 1048579:
vout.addLast (Integer.$valueOf (iv));
break;
case 160:
case 192:
sum2 += (iv) * iv;
case 128:
default:
sum += iv;
}
break;
case 2:
var s = J.modelset.Atom.atomPropertyString (this.viewer, atom, tok);
switch (minmaxtype) {
case 256:
fout[i] = JU.PT.parseFloat (s);
break;
default:
if (vout == null) return s;
vout.addLast (s);
}
break;
case 3:
var t = J.modelset.Atom.atomPropertyTuple (atom, tok);
if (t == null) this.errorStr (45, J.script.T.nameOf (tok));
switch (minmaxtype) {
case 256:
fout[i] = Math.sqrt (t.x * t.x + t.y * t.y + t.z * t.z);
break;
case 1048579:
vout.addLast (JU.P3.newP (t));
break;
default:
pt.add (t);
}
break;
}
if (haveIndex) break;
}
} else {
var isAll = (bs == null);
var i0 = (isAll ? 0 : bs.nextSetBit (0));
var i1 = this.viewer.getBondCount ();
for (var i = i0; i >= 0 && i < i1; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) {
n++;
var bond = modelSet.getBondAt (i);
switch (tok) {
case 1141899267:
var fv = bond.getAtom1 ().distance (bond.getAtom2 ());
switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 1048579:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += fv * fv;
case 128:
default:
sum += fv;
}
break;
case 1146095626:
switch (minmaxtype) {
case 1048579:
pt.ave (bond.getAtom1 (), bond.getAtom2 ());
vout.addLast (JU.P3.newP (pt));
break;
default:
pt.add (bond.getAtom1 ());
pt.add (bond.getAtom2 ());
n++;
}
break;
case 1766856708:
JU.CU.toRGBpt (this.viewer.getColorArgbOrGray (bond.colix), ptT);
switch (minmaxtype) {
case 1048579:
vout.addLast (JU.P3.newP (ptT));
break;
default:
pt.add (ptT);
}
break;
default:
this.errorStr (46, J.script.T.nameOf (tok));
}
}
}if (minmaxtype == 256) return fout;
if (minmaxtype == 1048579) {
if (asVectorIfAll) return vout;
var len = vout.size ();
if (isString && !isExplicitlyAll && len == 1) return vout.get (0);
if (selectedFloat) {
fout =  Clazz_newFloatArray (len, 0);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
switch (mode) {
case 0:
fout[i] = (v).floatValue ();
break;
case 1:
fout[i] = (v).floatValue ();
break;
case 2:
fout[i] = JU.PT.parseFloat (v);
break;
case 3:
fout[i] = (v).length ();
break;
}
}
return fout;
}if (tok == 1087373320) {
var sb =  new JU.SB ();
for (var i = 0; i < len; i++) sb.append (vout.get (i));

return sb.toString ();
}var sout =  new Array (len);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
if (Clazz_instanceOf (v, JU.P3)) sout[i] = J.util.Escape.eP (v);
 else sout[i] = "" + vout.get (i);
}
return sout;
}if (isPt) return (n == 0 ? pt : JU.P3.new3 (pt.x / n, pt.y / n, pt.z / n));
if (n == 0 || n == 1 && minmaxtype == 192) return Float.$valueOf (NaN);
if (isInt) {
switch (minmaxtype) {
case 32:
case 64:
return Integer.$valueOf (ivMinMax);
case 160:
case 192:
break;
case 128:
return Integer.$valueOf (Clazz_doubleToInt (sum));
default:
if (sum / n == Clazz_doubleToInt (sum / n)) return Integer.$valueOf (Clazz_doubleToInt (sum / n));
return Float.$valueOf ((sum / n));
}
}switch (minmaxtype) {
case 32:
case 64:
sum = fvMinMax;
break;
case 128:
break;
case 160:
sum = sum2;
break;
case 192:
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
default:
sum /= n;
break;
}
return Float.$valueOf (sum);
}, "JU.BS,~N,JU.P3,JU.P4,~O,~O,~B,~N,~B");
$_M(c$, "setBitsetProperty", 
function (bs, tok, iValue, fValue, tokenValue) {
if (this.chk || J.util.BSUtil.cardinalityOf (bs) == 0) return;
var list = null;
var sValue = null;
var fvalues = null;
var pt;
var sv = null;
var nValues = 0;
var isStrProperty = J.script.T.tokAttr (tok, 1087373312);
if (tokenValue.tok == 7) {
sv = (tokenValue).getList ();
if ((nValues = sv.size ()) == 0) return;
}switch (tok) {
case 1146095626:
case 1146095627:
case 1146095629:
case 1146095631:
switch (tokenValue.tok) {
case 8:
this.viewer.setAtomCoords (bs, tok, tokenValue.value);
break;
case 7:
this.theToken = tokenValue;
this.viewer.setAtomCoords (bs, tok, this.getPointArray (-1, nValues));
break;
}
return;
case 1766856708:
var value = null;
var prop = "color";
switch (tokenValue.tok) {
case 7:
var values =  Clazz_newIntArray (nValues, 0);
for (var i = nValues; --i >= 0; ) {
var svi = sv.get (i);
pt = J.script.SV.ptValue (svi);
if (pt != null) {
values[i] = JU.CU.colorPtToFFRGB (pt);
} else if (svi.tok == 2) {
values[i] = svi.intValue;
} else {
values[i] = JU.CU.getArgbFromString (svi.asString ());
if (values[i] == 0) values[i] = svi.asInt ();
}if (values[i] == 0) this.errorStr2 (50, "ARRAY", svi.asString ());
}
value = values;
prop = "colorValues";
break;
case 8:
value = Integer.$valueOf (JU.CU.colorPtToFFRGB (tokenValue.value));
break;
case 4:
value = tokenValue.value;
break;
default:
value = Integer.$valueOf (J.script.SV.iValue (tokenValue));
break;
}
this.setShapePropertyBs (0, prop, value, bs);
return;
case 1826248715:
case 1288701960:
if (tokenValue.tok != 7) sValue = J.script.SV.sValue (tokenValue);
break;
case 1087375365:
case 1095763978:
this.clearDefinedVariableAtomSets ();
isStrProperty = false;
break;
}
switch (tokenValue.tok) {
case 7:
if (isStrProperty) list = J.script.SV.listValue (tokenValue);
 else fvalues = J.script.SV.flistValue (tokenValue, nValues);
break;
case 4:
if (sValue == null) list = JU.PT.getTokens (J.script.SV.sValue (tokenValue));
break;
}
if (list != null) {
nValues = list.length;
if (!isStrProperty) {
fvalues =  Clazz_newFloatArray (nValues, 0);
for (var i = nValues; --i >= 0; ) fvalues[i] = (tok == 1087375365 ? J.util.Elements.elementNumberFromSymbol (list[i], false) : JU.PT.parseFloat (list[i]));

}if (tokenValue.tok != 7 && nValues == 1) {
if (isStrProperty) sValue = list[0];
 else fValue = fvalues[0];
iValue = Clazz_floatToInt (fValue);
list = null;
fvalues = null;
}}this.viewer.setAtomProperty (bs, tok, iValue, fValue, sValue, fvalues, list);
}, "JU.BS,~N,~N,~N,J.script.T");
$_V(c$, "getDefinedAtomSets", 
function () {
return this.definedAtomSets;
});
$_V(c$, "getContextVariables", 
function () {
return this.contextVariables;
});
$_V(c$, "getScript", 
function () {
return this.$script;
});
$_M(c$, "compileScript", 
function (filename, strScript, debugCompiler) {
this.scriptFileName = filename;
strScript = this.fixScriptPath (strScript, filename);
this.restoreScriptContext (this.compiler.compile (filename, strScript, false, false, debugCompiler, false), false, false, false);
this.isStateScript = (this.$script.indexOf ("# Jmol state version ") >= 0);
this.forceNoAddHydrogens = (this.isStateScript && this.$script.indexOf ("pdbAddHydrogens") < 0);
var s = this.$script;
this.pc = this.setScriptExtensions ();
if (!this.chk && this.viewer.scriptEditorVisible && strScript.indexOf ("\u0001## EDITOR_IGNORE ##") < 0) this.viewer.scriptStatus ("");
this.$script = s;
return !this.$error;
}, "~S,~S,~B");
$_M(c$, "fixScriptPath", 
function (strScript, filename) {
if (filename != null && strScript.indexOf ("$SCRIPT_PATH$") >= 0) {
var path = filename;
var pt = Math.max (filename.lastIndexOf ("|"), filename.lastIndexOf ("/"));
path = path.substring (0, pt + 1);
strScript = JU.PT.simpleReplace (strScript, "$SCRIPT_PATH$/", path);
strScript = JU.PT.simpleReplace (strScript, "$SCRIPT_PATH$", path);
}return strScript;
}, "~S,~S");
$_M(c$, "setScriptExtensions", 
function () {
var extensions = this.scriptExtensions;
if (extensions == null) return 0;
var pt = extensions.indexOf ("##SCRIPT_STEP");
if (pt >= 0) {
this.executionStepping = true;
}pt = extensions.indexOf ("##SCRIPT_START=");
if (pt < 0) return 0;
pt = JU.PT.parseInt (extensions.substring (pt + 15));
if (pt == -2147483648) return 0;
for (this.pc = 0; this.pc < this.lineIndices.length; this.pc++) {
if (this.lineIndices[this.pc][0] > pt || this.lineIndices[this.pc][1] >= pt) break;
}
if (this.pc > 0 && this.pc < this.lineIndices.length && this.lineIndices[this.pc][0] > pt) --this.pc;
return this.pc;
});
$_M(c$, "compileScriptFileInternal", 
function (filename, localPath, remotePath, scriptPath) {
if (filename.toLowerCase ().indexOf ("javascript:") == 0) return this.compileScript (filename, this.viewer.jsEval (filename.substring (11)), this.debugScript);
var data =  new Array (2);
data[0] = filename;
if (!this.viewer.getFileAsStringBin (data)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}if (("\n" + data[1]).indexOf ("\nJmolManifest.txt\n") >= 0) {
var path;
if (filename.endsWith (".all.pngj") || filename.endsWith (".all.png")) {
path = "|state.spt";
filename += "|";
} else {
data[0] = filename += "|JmolManifest.txt";
if (!this.viewer.getFileAsStringBin (data)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}path = J.io.JmolBinary.getManifestScriptPath (data[1]);
}if (path != null && path.length > 0) {
data[0] = filename = filename.substring (0, filename.lastIndexOf ("|")) + path;
if (!this.viewer.getFileAsStringBin (data)) {
this.setErrorMessage ("io error reading " + data[0] + ": " + data[1]);
return false;
}}}this.scriptFileName = filename;
data[1] = J.io.JmolBinary.getEmbeddedScript (data[1]);
var script = this.fixScriptPath (data[1], data[0]);
if (scriptPath == null) {
scriptPath = this.viewer.getFilePath (filename, false);
scriptPath = scriptPath.substring (0, Math.max (scriptPath.lastIndexOf ("|"), scriptPath.lastIndexOf ("/")));
}script = J.viewer.FileManager.setScriptFileReferences (script, localPath, remotePath, scriptPath);
return this.compileScript (filename, script, this.debugScript);
}, "~S,~S,~S,~S");
$_M(c$, "getParameter", 
function (key, tokType) {
var v = this.getContextVariableAsVariable (key);
if (v == null) v = this.viewer.getParameter (key);
switch (tokType) {
case 1073742190:
return J.script.SV.getVariable (v);
case 4:
if (!(Clazz_instanceOf (v, JU.List))) break;
var sv = v;
var sb =  new JU.SB ();
for (var i = 0; i < sv.size (); i++) sb.append (sv.get (i).asString ()).appendC ('\n');

return sb.toString ();
}
return (Clazz_instanceOf (v, J.script.SV) ? J.script.SV.oValue (v) : v);
}, "~S,~N");
$_M(c$, "getStringParameter", 
function ($var, orReturnName) {
var v = this.getContextVariableAsVariable ($var);
if (v != null) return v.asString ();
var val = "" + this.viewer.getParameter ($var);
return (val.length == 0 && orReturnName ? $var : val);
}, "~S,~B");
$_M(c$, "getNumericParameter", 
function ($var) {
if ($var.equalsIgnoreCase ("_modelNumber")) {
var modelIndex = this.viewer.getCurrentModelIndex ();
return Integer.$valueOf (modelIndex < 0 ? 0 : this.viewer.getModelFileNumber (modelIndex));
}var v = this.getContextVariableAsVariable ($var);
if (v == null) {
var val = this.viewer.getParameter ($var);
if (!(Clazz_instanceOf (val, String))) return val;
v = J.script.SV.newS (val);
}return J.script.SV.nValue (v);
}, "~S");
$_M(c$, "getContextVariableAsVariable", 
function ($var) {
if ($var.equals ("expressionBegin")) return null;
$var = $var.toLowerCase ();
if (this.contextVariables != null && this.contextVariables.containsKey ($var)) return this.contextVariables.get ($var);
var context = this.thisContext;
while (context != null) {
if (context.isFunction == true) return null;
if (context.contextVariables != null && context.contextVariables.containsKey ($var)) return context.contextVariables.get ($var);
context = context.parentContext;
}
return null;
}, "~S");
$_M(c$, "getStringObjectAsVariable", 
function (s, key) {
if (s == null || s.length == 0) return s;
var v = J.script.SV.unescapePointOrBitsetAsVariable (s);
if (Clazz_instanceOf (v, String) && key != null) v = this.viewer.setUserVariable (key, J.script.SV.newS (v));
return v;
}, "~S,~S");
$_V(c$, "evalFunctionFloat", 
function (func, params, values) {
try {
var p = params;
for (var i = 0; i < values.length; i++) p.get (i).value = Float.$valueOf (values[i]);

var f = func;
return J.script.SV.fValue (this.runFunctionRet (f, f.name, p, null, true, false, false));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return NaN;
} else {
throw e;
}
}
}, "~O,~O,~A");
$_M(c$, "runFunctionRet", 
function ($function, name, params, tokenAtom, getReturn, setContextPath, allowThreads) {
if ($function == null) {
$function = this.viewer.getFunction (name);
if ($function == null) return null;
if (setContextPath) this.contextPath += " >> function " + name;
} else if (setContextPath) {
this.contextPath += " >> " + name;
}this.pushContext (null, "funcRet");
if (this.allowJSThreads) this.allowJSThreads = allowThreads;
var isTry = ($function.getTok () == 364558);
this.thisContext.isTryCatch = isTry;
this.thisContext.isFunction = !isTry;
this.functionName = name;
if (isTry) {
this.viewer.resetError ();
this.thisContext.displayLoadErrorsSave = this.viewer.displayLoadErrors;
this.thisContext.tryPt = ++J.script.ScriptEvaluator.tryPt;
this.viewer.displayLoadErrors = false;
this.restoreFunction ($function, params, tokenAtom);
this.contextVariables.put ("_breakval", J.script.SV.newI (2147483647));
this.contextVariables.put ("_errorval", J.script.SV.newS (""));
var cv = this.contextVariables;
this.executeCommands (true);
while (this.thisContext.tryPt > J.script.ScriptEvaluator.tryPt) this.popContext (false, false);

this.processTry (cv);
return null;
} else if (Clazz_instanceOf ($function, J.api.JmolParallelProcessor)) {
{
this.parallelProcessor = $function;
this.restoreFunction ($function, params, tokenAtom);
this.dispatchCommands (false, true);
($function).runAllProcesses (this.viewer);
}} else {
this.restoreFunction ($function, params, tokenAtom);
this.dispatchCommands (false, true);
}var v = (getReturn ? this.getContextVariableAsVariable ("_retval") : null);
this.popContext (false, false);
return v;
}, "J.api.JmolScriptFunction,~S,JU.List,J.script.SV,~B,~B,~B");
$_M(c$, "processTry", 
function (cv) {
this.viewer.displayLoadErrors = this.thisContext.displayLoadErrorsSave;
this.popContext (false, false);
var err = this.viewer.getParameter ("_errormessage");
if (err.length > 0) {
cv.put ("_errorval", J.script.SV.newS (err));
this.viewer.resetError ();
}cv.put ("_tryret", cv.get ("_retval"));
var ret = cv.get ("_tryret");
if (ret.value != null || ret.intValue != 2147483647) {
this.returnCmd (ret);
return;
}var errMsg = (cv.get ("_errorval")).value;
if (errMsg.length == 0) {
var iBreak = (cv.get ("_breakval")).intValue;
if (iBreak != 2147483647) {
this.breakCmd (this.pc - iBreak);
return;
}}if (this.pc + 1 < this.aatoken.length && this.aatoken[this.pc + 1][0].tok == 102412) {
var ct = this.aatoken[this.pc + 1][0];
if (ct.contextVariables != null && ct.name0 != null) ct.contextVariables.put (ct.name0, J.script.SV.newS (errMsg));
ct.intValue = (errMsg.length > 0 ? 1 : -1) * Math.abs (ct.intValue);
}}, "java.util.Map");
$_M(c$, "restoreFunction", 
function (f, params, tokenAtom) {
var $function = f;
this.aatoken = $function.aatoken;
this.lineNumbers = $function.lineNumbers;
this.lineIndices = $function.lineIndices;
this.$script = $function.script;
this.pc = 0;
if ($function.names != null) {
this.contextVariables =  new java.util.Hashtable ();
$function.setVariables (this.contextVariables, params);
}if (tokenAtom != null) this.contextVariables.put ("_x", tokenAtom);
}, "J.api.JmolScriptFunction,JU.List,J.script.SV");
$_M(c$, "clearDefinedVariableAtomSets", 
function () {
this.definedAtomSets.remove ("# variable");
});
$_M(c$, "defineSets", 
function () {
if (!this.definedAtomSets.containsKey ("# static")) {
for (var i = 0; i < J.viewer.JC.predefinedStatic.length; i++) this.defineAtomSet (J.viewer.JC.predefinedStatic[i]);

this.defineAtomSet ("# static");
}if (this.definedAtomSets.containsKey ("# variable")) return;
for (var i = 0; i < J.viewer.JC.predefinedVariable.length; i++) this.defineAtomSet (J.viewer.JC.predefinedVariable[i]);

for (var i = J.util.Elements.elementNumberMax; --i >= 0; ) {
var definition = " elemno=" + i;
this.defineAtomSet ("@" + J.util.Elements.elementNameFromNumber (i) + definition);
this.defineAtomSet ("@_" + J.util.Elements.elementSymbolFromNumber (i) + definition);
}
for (var i = 4; --i >= 0; ) {
var definition = "@" + J.util.Elements.altElementNameFromIndex (i) + " _e=" + J.util.Elements.altElementNumberFromIndex (i);
this.defineAtomSet (definition);
}
for (var i = J.util.Elements.altElementMax; --i >= 4; ) {
var ei = J.util.Elements.altElementNumberFromIndex (i);
var def = " _e=" + ei;
var definition = "@_" + J.util.Elements.altElementSymbolFromIndex (i);
this.defineAtomSet (definition + def);
definition = "@_" + J.util.Elements.altIsotopeSymbolFromIndex (i);
this.defineAtomSet (definition + def);
definition = "@_" + J.util.Elements.altIsotopeSymbolFromIndex2 (i);
this.defineAtomSet (definition + def);
definition = "@" + J.util.Elements.altElementNameFromIndex (i);
if (definition.length > 1) this.defineAtomSet (definition + def);
var e = J.util.Elements.getElementNumber (ei);
ei = J.util.Elements.getNaturalIsotope (e);
if (ei > 0) {
def = J.util.Elements.elementSymbolFromNumber (e);
this.defineAtomSet ("@_" + def + ei + " _e=" + e);
this.defineAtomSet ("@_" + ei + def + " _e=" + e);
}}
this.defineAtomSet ("# variable");
});
$_M(c$, "defineAtomSet", 
function (script) {
if (script.indexOf ("#") == 0) {
this.definedAtomSets.put (script, Boolean.TRUE);
return;
}var sc = this.compiler.compile ("#predefine", script, true, false, false, false);
if (sc.errorType != null) {
this.viewer.scriptStatus ("JmolConstants.java ERROR: predefined set compile error:" + script + "\ncompile error:" + sc.errorMessageUntranslated);
return;
}if (sc.aatoken.length != 1) {
this.viewer.scriptStatus ("JmolConstants.java ERROR: predefinition does not have exactly 1 command:" + script);
return;
}var statement = sc.aatoken[0];
if (statement.length <= 2) {
this.viewer.scriptStatus ("JmolConstants.java ERROR: bad predefinition length:" + script);
return;
}var tok = statement[1].tok;
if (!J.script.T.tokAttr (tok, 1073741824) && !J.script.T.tokAttr (tok, 3145728)) {
this.viewer.scriptStatus ("JmolConstants.java ERROR: invalid variable name:" + script);
return;
}var name = (statement[1].value).toLowerCase ();
if (name.startsWith ("dynamic_")) name = "!" + name.substring (8);
this.definedAtomSets.put (name, statement);
}, "~S");
$_M(c$, "lookupIdentifierValue", 
function (identifier) {
var bs = this.lookupValue (identifier, false);
if (bs != null) return J.util.BSUtil.copy (bs);
bs = this.getAtomBits (1073741824, identifier);
return (bs == null ?  new JU.BS () : bs);
}, "~S");
$_M(c$, "lookupValue", 
function (setName, plurals) {
if (this.chk) {
return  new JU.BS ();
}this.defineSets ();
setName = setName.toLowerCase ();
var value = this.definedAtomSets.get (setName);
var isDynamic = false;
if (value == null) {
value = this.definedAtomSets.get ("!" + setName);
isDynamic = (value != null);
}if (Clazz_instanceOf (value, JU.BS)) return value;
if (Clazz_instanceOf (value, Array)) {
this.pushContext (null, "lookupValue");
var bs = this.atomExpression (value, -2, 0, true, false, true, true);
this.popContext (false, false);
if (!isDynamic) this.definedAtomSets.put (setName, bs);
return bs;
}if (plurals) return null;
var len = setName.length;
if (len < 5) return null;
if (setName.charAt (len - 1) != 's') return null;
if (setName.endsWith ("ies")) setName = setName.substring (0, len - 3) + 'y';
 else setName = setName.substring (0, len - 1);
return this.lookupValue (setName, true);
}, "~S,~B");
$_V(c$, "deleteAtomsInVariables", 
function (bsDeleted) {
for (var entry, $entry = this.definedAtomSets.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var value = entry.getValue ();
if (Clazz_instanceOf (value, JU.BS)) {
J.util.BSUtil.deleteBits (value, bsDeleted);
if (!entry.getKey ().startsWith ("!")) this.viewer.setUserVariable ("@" + entry.getKey (), J.script.SV.newV (10, value));
}}
}, "JU.BS");
$_M(c$, "setStatement", 
function (pc) {
this.st = this.aatoken[pc];
this.slen = this.st.length;
if (this.slen == 0) return true;
var fixed;
var i;
var tok;
for (i = 1; i < this.slen; i++) {
if (this.st[i] == null) {
this.slen = i;
return true;
}if (this.st[i].tok == 1060866) break;
}
if (i == this.slen) return i == this.slen;
switch (this.st[0].tok) {
case 102436:
case 135368713:
case 1073741824:
if (this.tokAt (1) == 269484048) return true;
}
fixed =  new Array (this.slen);
fixed[0] = this.st[0];
var isExpression = false;
var j = 1;
for (i = 1; i < this.slen; i++) {
if (this.st[i] == null) continue;
switch (tok = this.getToken (i).tok) {
default:
fixed[j] = this.st[i];
break;
case 1048577:
case 1048578:
isExpression = (tok == 1048577);
fixed[j] = this.st[i];
break;
case 1060866:
if (++i == this.slen) this.invArg ();
var v;
var forceString = (this.theToken.intValue == 4);
var s;
var $var = this.parameterAsString (i);
var isClauseDefine = (this.tokAt (i) == 1048577);
var isSetAt = (j == 1 && this.st[0] === J.script.T.tokenSetCmd);
if (isClauseDefine) {
var vt = this.parameterExpressionToken (++i);
i = this.iToken;
v = (vt.tok == 7 ? vt : J.script.SV.oValue (vt));
} else {
if (this.tokAt (i) == 2) {
v = this.viewer.getAtomBits (1095763969, Integer.$valueOf (this.st[i].intValue));
} else {
v = this.getParameter ($var, 0);
}if (!isExpression && !isSetAt) isClauseDefine = true;
}tok = this.tokAt (0);
forceString = new Boolean (forceString | (J.script.T.tokAttr (tok, 20480) || tok == 135271429)).valueOf ();
if (Clazz_instanceOf (v, J.script.SV)) {
fixed[j] = v;
if (isExpression && fixed[j].tok == 7) {
var bs = J.script.SV.getBitSet (v, true);
fixed[j] = J.script.SV.newV (10, bs == null ? this.getAtomBitSet (J.script.SV.sValue (fixed[j])) : bs);
}} else if (Clazz_instanceOf (v, Boolean)) {
fixed[j] = ((v).booleanValue () ? J.script.T.tokenOn : J.script.T.tokenOff);
} else if (Clazz_instanceOf (v, Integer)) {
fixed[j] = J.script.T.tv (2, (v).intValue (), v);
} else if (Clazz_instanceOf (v, Float)) {
fixed[j] = J.script.T.tv (3, J.script.ScriptEvaluator.getFloatEncodedInt ("" + v), v);
} else if (Clazz_instanceOf (v, String)) {
if (!forceString) {
if ((tok != 1085443 || j > 1 && this.st[1].tok != 537022465) && J.script.T.tokAttr (tok, 36864)) {
v = this.getParameter (v, 1073742190);
}if (Clazz_instanceOf (v, String)) {
v = this.getStringObjectAsVariable (v, null);
}}if (Clazz_instanceOf (v, J.script.SV)) {
fixed[j] = v;
} else {
s = v;
if (isExpression && !forceString) {
fixed[j] = J.script.T.o (10, this.getAtomBitSet (s));
} else {
tok = (isSetAt ? J.script.T.getTokFromName (s) : isClauseDefine || forceString || s.length == 0 || s.indexOf (".") >= 0 || s.indexOf (" ") >= 0 || s.indexOf ("=") >= 0 || s.indexOf (";") >= 0 || s.indexOf ("[") >= 0 || s.indexOf ("{") >= 0 ? 4 : 1073741824);
fixed[j] = J.script.T.o (tok, v);
}}} else if (Clazz_instanceOf (v, JU.BS)) {
fixed[j] = J.script.SV.newV (10, v);
} else if (Clazz_instanceOf (v, JU.P3)) {
fixed[j] = J.script.SV.newV (8, v);
} else if (Clazz_instanceOf (v, JU.P4)) {
fixed[j] = J.script.SV.newV (9, v);
} else if (Clazz_instanceOf (v, JU.M3)) {
fixed[j] = J.script.SV.newV (11, v);
} else if (Clazz_instanceOf (v, JU.M4)) {
fixed[j] = J.script.SV.newV (12, v);
} else if (Clazz_instanceOf (v, java.util.Map)) {
fixed[j] = J.script.SV.newV (6, v);
} else if (Clazz_instanceOf (v, JU.List)) {
var sv = v;
var bs = null;
for (var k = 0; k < sv.size (); k++) {
var svk = sv.get (k);
if (svk.tok != 10) {
bs = null;
break;
}if (bs == null) bs =  new JU.BS ();
bs.or (svk.value);
}
fixed[j] = (bs == null ? J.script.SV.getVariable (v) : J.script.T.o (10, bs));
} else {
var center = this.getObjectCenter ($var, -2147483648, -2147483648);
if (center == null) this.invArg ();
fixed[j] = J.script.T.o (8, center);
}if (isSetAt && !J.script.T.tokAttr (fixed[j].tok, 536870912)) this.invArg ();
break;
}
j++;
}
this.st = fixed;
for (i = j; i < this.st.length; i++) this.st[i] = null;

this.slen = j;
return true;
}, "~N");
$_M(c$, "clearState", 
function (tQuiet) {
this.thisContext = null;
this.scriptLevel = 0;
this.setErrorMessage (null);
this.contextPath = "";
this.tQuiet = tQuiet;
}, "~B");
$_V(c$, "getThisContext", 
function () {
return this.thisContext;
});
$_V(c$, "pushContextDown", 
function (why) {
this.scriptLevel--;
this.pushContext2 (null, why);
}, "~S");
$_M(c$, "pushContext", 
function (token, why) {
if (this.scriptLevel == 100) this.error (44);
this.pushContext2 (token, why);
}, "J.script.ContextToken,~S");
$_M(c$, "pushContext2", 
function (token, why) {
this.thisContext = this.getScriptContext (why);
this.thisContext.token = token;
if (token == null) {
this.scriptLevel = ++this.thisContext.scriptLevel;
} else {
this.thisContext.scriptLevel = -1;
this.contextVariables =  new java.util.Hashtable ();
if (token.contextVariables != null) for (var key, $key = token.contextVariables.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) J.script.ScriptCompiler.addContextVariable (this.contextVariables, key);

}if (this.debugScript || this.isCmdLine_c_or_C_Option) J.util.Logger.info ("-->>-------------".substring (0, Math.max (17, this.scriptLevel + 5)) + this.scriptLevel + " " + this.scriptFileName + " " + token + " " + this.thisContext.id);
}, "J.script.ContextToken,~S");
$_V(c$, "getScriptContext", 
function (why) {
var context =  new J.script.ScriptContext ();
if (this.debugScript) J.util.Logger.info ("creating context " + context.id + " for " + why);
context.scriptLevel = this.scriptLevel;
context.parentContext = this.thisContext;
context.contextPath = this.contextPath;
context.scriptFileName = this.scriptFileName;
context.parallelProcessor = this.parallelProcessor;
context.functionName = this.functionName;
context.script = this.$script;
context.lineNumbers = this.lineNumbers;
context.lineIndices = this.lineIndices;
context.aatoken = this.aatoken;
context.statement = this.st;
context.statementLength = this.slen;
context.pc = this.pc;
context.lineEnd = this.lineEnd;
context.pcEnd = this.pcEnd;
context.iToken = this.iToken;
context.theToken = this.theToken;
context.theTok = this.theTok;
context.outputBuffer = this.outputBuffer;
context.contextVariables = this.contextVariables;
context.isStateScript = this.isStateScript;
context.errorMessage = this.errorMessage;
context.errorType = this.errorType;
context.iCommandError = this.iCommandError;
context.chk = this.chk;
context.executionStepping = this.executionStepping;
context.executionPaused = this.executionPaused;
context.scriptExtensions = this.scriptExtensions;
context.mustResumeEval = this.mustResumeEval;
context.allowJSThreads = this.allowJSThreads;
return context;
}, "~S");
$_M(c$, "popContext", 
function (isFlowCommand, statementOnly) {
if (this.thisContext == null) return;
if (this.thisContext.scriptLevel > 0) this.scriptLevel = this.thisContext.scriptLevel - 1;
var scTemp = (isFlowCommand ? this.getScriptContext ("popFlow") : null);
this.restoreScriptContext (this.thisContext, true, isFlowCommand, statementOnly);
if (scTemp != null) this.restoreScriptContext (scTemp, true, false, true);
if (this.debugScript || this.isCmdLine_c_or_C_Option) J.util.Logger.info ("--<<-------------".substring (0, Math.max (17, this.scriptLevel + 5)) + this.scriptLevel + " " + this.scriptFileName + " " + (this.thisContext == null ? "" : "" + this.thisContext.id));
}, "~B,~B");
$_M(c$, "restoreScriptContext", 
function (context, isPopContext, isFlowCommand, statementOnly) {
this.executing = !this.chk;
if (context == null) return;
if (this.debugScript || this.isCmdLine_c_or_C_Option) J.util.Logger.info ("--<<-------------".substring (0, Math.max (17, this.scriptLevel + 5)) + this.scriptLevel + " " + this.scriptFileName + " isPop " + isPopContext + " " + context.id);
if (!isFlowCommand) {
this.st = context.statement;
this.slen = context.statementLength;
this.pc = context.pc;
this.lineEnd = context.lineEnd;
this.pcEnd = context.pcEnd;
if (statementOnly) return;
}this.mustResumeEval = context.mustResumeEval;
this.$script = context.script;
this.lineNumbers = context.lineNumbers;
this.lineIndices = context.lineIndices;
this.aatoken = context.aatoken;
this.contextVariables = context.contextVariables;
this.scriptExtensions = context.scriptExtensions;
if (isPopContext) {
this.contextPath = context.contextPath;
this.scriptFileName = context.scriptFileName;
this.parallelProcessor = context.parallelProcessor;
this.functionName = context.functionName;
this.iToken = context.iToken;
this.theToken = context.theToken;
this.theTok = context.theTok;
this.outputBuffer = context.outputBuffer;
this.isStateScript = context.isStateScript;
this.thisContext = context.parentContext;
this.allowJSThreads = context.allowJSThreads;
} else {
this.$error = (context.errorType != null);
this.errorMessage = context.errorMessage;
this.errorMessageUntranslated = context.errorMessageUntranslated;
this.iCommandError = context.iCommandError;
this.errorType = context.errorType;
}}, "J.script.ScriptContext,~B,~B,~B");
$_M(c$, "getLinenumber", 
function (c) {
return (c == null ? this.lineNumbers[this.pc] : c.lineNumbers[c.pc]);
}, "J.script.ScriptContext");
$_V(c$, "setException", 
function (sx, msg, untranslated) {
sx.untranslated = (untranslated == null ? msg : untranslated);
this.errorType = msg;
this.iCommandError = this.pc;
if (sx.message == null) {
sx.message = "";
return;
}var s = J.script.ScriptEvaluator.getContextTrace (this.viewer, this.getScriptContext ("setException"), null, true).toString ();
while (this.thisContext != null && !this.thisContext.isTryCatch) this.popContext (false, false);

sx.message += s;
sx.untranslated += s;
if (this.thisContext != null || this.chk || msg.indexOf ("NOTE: file recognized as a script file: ") >= 0) return;
J.util.Logger.error ("eval ERROR: " + this.toString ());
if (this.viewer.autoExit) this.viewer.exitJmol ();
}, "J.script.ScriptException,~S,~S");
$_V(c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
$_V(c$, "getErrorMessageUntranslated", 
function () {
return this.errorMessageUntranslated == null ? this.errorMessage : this.errorMessageUntranslated;
});
$_M(c$, "setErrorMessage", 
function (err) {
this.errorMessageUntranslated = null;
if (err == null) {
this.$error = false;
this.errorType = null;
this.errorMessage = null;
this.iCommandError = -1;
return;
}this.$error = true;
if (this.errorMessage == null) this.errorMessage = J.i18n.GT._ ("script ERROR: ");
this.errorMessage += err;
}, "~S");
$_M(c$, "planeExpected", 
function () {
this.errorMore (38, "{a b c d}", "\"xy\" \"xz\" \"yz\" \"x=...\" \"y=...\" \"z=...\"", "$xxxxx");
});
$_M(c$, "integerOutOfRange", 
function (min, max) {
this.errorStr2 (21, "" + min, "" + max);
}, "~N,~N");
$_M(c$, "numberOutOfRange", 
function (min, max) {
this.errorStr2 (36, "" + min, "" + max);
}, "~N,~N");
$_M(c$, "errorAt", 
function (iError, i) {
this.iToken = i;
this.errorOrWarn (iError, null, null, null, false);
}, "~N,~N");
$_M(c$, "invArg", 
function () {
this.error (22);
});
$_M(c$, "error", 
function (iError) {
this.errorOrWarn (iError, null, null, null, false);
}, "~N");
$_M(c$, "errorStr", 
function (iError, value) {
this.errorOrWarn (iError, value, null, null, false);
}, "~N,~S");
$_M(c$, "errorStr2", 
function (iError, value, more) {
this.errorOrWarn (iError, value, more, null, false);
}, "~N,~S,~S");
$_M(c$, "errorMore", 
function (iError, value, more, more2) {
this.errorOrWarn (iError, value, more, more2, false);
}, "~N,~S,~S,~S");
$_M(c$, "warning", 
function (iError, value, more) {
this.errorOrWarn (iError, value, more, null, true);
}, "~N,~S,~S");
$_M(c$, "errorOrWarn", 
function (iError, value, more, more2, warningOnly) {
var strError = this.ignoreError ? null : J.script.ScriptEvaluator.errorString (iError, value, more, more2, true);
var strUntranslated = (!this.ignoreError && J.i18n.GT.getDoTranslate () ? J.script.ScriptEvaluator.errorString (iError, value, more, more2, false) : null);
if (!warningOnly) this.evalError (strError, strUntranslated);
this.showString (strError);
}, "~N,~S,~S,~S,~B");
$_M(c$, "evalError", 
function (message, strUntranslated) {
if (this.ignoreError) throw  new NullPointerException ();
if (!this.chk) {
this.setCursorWait (false);
this.viewer.setBooleanProperty ("refreshing", true);
this.viewer.setStringProperty ("_errormessage", strUntranslated);
}throw  new J.script.ScriptException (this, message, strUntranslated, true);
}, "~S,~S");
c$.errorString = $_M(c$, "errorString", 
function (iError, value, more, more2, translated) {
var doTranslate = false;
if (!translated && (doTranslate = J.i18n.GT.getDoTranslate ()) == true) J.i18n.GT.setDoTranslate (false);
var msg;
switch (iError) {
default:
msg = "Unknown error message number: " + iError;
break;
case 0:
msg = J.i18n.GT._ ("x y z axis expected");
break;
case 1:
msg = J.i18n.GT._ ("{0} not allowed with background model displayed");
break;
case 2:
msg = J.i18n.GT._ ("bad argument count");
break;
case 3:
msg = J.i18n.GT._ ("Miller indices cannot all be zero.");
break;
case 4:
msg = J.i18n.GT._ ("bad [R,G,B] color");
break;
case 5:
msg = J.i18n.GT._ ("boolean expected");
break;
case 6:
msg = J.i18n.GT._ ("boolean or number expected");
break;
case 7:
msg = J.i18n.GT._ ("boolean, number, or {0} expected");
break;
case 56:
msg = J.i18n.GT._ ("cannot set value");
break;
case 8:
msg = J.i18n.GT._ ("color expected");
break;
case 9:
msg = J.i18n.GT._ ("a color or palette name (Jmol, Rasmol) is required");
break;
case 10:
msg = J.i18n.GT._ ("command expected");
break;
case 11:
msg = J.i18n.GT._ ("{x y z} or $name or (atom expression) required");
break;
case 12:
msg = J.i18n.GT._ ("draw object not defined");
break;
case 13:
msg = J.i18n.GT._ ("unexpected end of script command");
break;
case 14:
msg = J.i18n.GT._ ("valid (atom expression) expected");
break;
case 15:
msg = J.i18n.GT._ ("(atom expression) or integer expected");
break;
case 16:
msg = J.i18n.GT._ ("filename expected");
break;
case 17:
msg = J.i18n.GT._ ("file not found");
break;
case 18:
msg = J.i18n.GT._ ("incompatible arguments");
break;
case 19:
msg = J.i18n.GT._ ("insufficient arguments");
break;
case 20:
msg = J.i18n.GT._ ("integer expected");
break;
case 21:
msg = J.i18n.GT._ ("integer out of range ({0} - {1})");
break;
case 22:
msg = J.i18n.GT._ ("invalid argument");
break;
case 23:
msg = J.i18n.GT._ ("invalid parameter order");
break;
case 24:
msg = J.i18n.GT._ ("keyword expected");
break;
case 25:
msg = J.i18n.GT._ ("no MO coefficient data available");
break;
case 26:
msg = J.i18n.GT._ ("An MO index from 1 to {0} is required");
break;
case 27:
msg = J.i18n.GT._ ("no MO basis/coefficient data available for this frame");
break;
case 28:
msg = J.i18n.GT._ ("no MO occupancy data available");
break;
case 29:
msg = J.i18n.GT._ ("Only one molecular orbital is available in this file");
break;
case 30:
msg = J.i18n.GT._ ("{0} require that only one model be displayed");
break;
case 55:
msg = J.i18n.GT._ ("{0} requires that only one model be loaded");
break;
case 31:
msg = J.i18n.GT._ ("No data available");
break;
case 32:
msg = J.i18n.GT._ ("No partial charges were read from the file; Jmol needs these to render the MEP data.");
break;
case 33:
msg = J.i18n.GT._ ("No unit cell");
break;
case 34:
msg = J.i18n.GT._ ("number expected");
break;
case 35:
msg = J.i18n.GT._ ("number must be ({0} or {1})");
break;
case 36:
msg = J.i18n.GT._ ("decimal number out of range ({0} - {1})");
break;
case 37:
msg = J.i18n.GT._ ("object name expected after '$'");
break;
case 38:
msg = J.i18n.GT._ ("plane expected -- either three points or atom expressions or {0} or {1} or {2}");
break;
case 39:
msg = J.i18n.GT._ ("property name expected");
break;
case 40:
msg = J.i18n.GT._ ("space group {0} was not found.");
break;
case 41:
msg = J.i18n.GT._ ("quoted string expected");
break;
case 42:
msg = J.i18n.GT._ ("quoted string or identifier expected");
break;
case 43:
msg = J.i18n.GT._ ("too many rotation points were specified");
break;
case 44:
msg = J.i18n.GT._ ("too many script levels");
break;
case 45:
msg = J.i18n.GT._ ("unrecognized atom property");
break;
case 46:
msg = J.i18n.GT._ ("unrecognized bond property");
break;
case 47:
msg = J.i18n.GT._ ("unrecognized command");
break;
case 48:
msg = J.i18n.GT._ ("runtime unrecognized expression");
break;
case 49:
msg = J.i18n.GT._ ("unrecognized object");
break;
case 50:
msg = J.i18n.GT._ ("unrecognized {0} parameter");
break;
case 51:
msg = J.i18n.GT._ ("unrecognized {0} parameter in Jmol state script (set anyway)");
break;
case 52:
msg = J.i18n.GT._ ("unrecognized SHOW parameter --  use {0}");
break;
case 53:
msg = "{0}";
break;
case 54:
msg = J.i18n.GT._ ("write what? {0} or {1} \"filename\"");
break;
}
if (msg.indexOf ("{0}") < 0) {
if (value != null) msg += ": " + value;
} else {
msg = JU.PT.simpleReplace (msg, "{0}", value);
if (msg.indexOf ("{1}") >= 0) msg = JU.PT.simpleReplace (msg, "{1}", more);
 else if (more != null) msg += ": " + more;
if (msg.indexOf ("{2}") >= 0) msg = JU.PT.simpleReplace (msg, "{2}", more);
}if (doTranslate) J.i18n.GT.setDoTranslate (true);
return msg;
}, "~N,~S,~S,~S,~B");
c$.getErrorLineMessage = $_M(c$, "getErrorLineMessage", 
function (functionName, filename, lineCurrent, pcCurrent, lineInfo) {
var err = "\n----";
if (filename != null || functionName != null) err += "line " + lineCurrent + " command " + (pcCurrent + 1) + " of " + (functionName == null ? filename : functionName.equals ("try") ? "try" : "function " + functionName) + ":";
err += "\n         " + lineInfo;
return err;
}, "~S,~S,~N,~N,~S");
$_M(c$, "toString", 
function () {
var str =  new JU.SB ();
str.append ("Eval\n pc:");
str.appendI (this.pc);
str.append ("\n");
str.appendI (this.aatoken.length);
str.append (" statements\n");
for (var i = 0; i < this.aatoken.length; ++i) {
str.append ("----\n");
var atoken = this.aatoken[i];
for (var j = 0; j < atoken.length; ++j) {
str.appendO (atoken[j]);
str.appendC ('\n');
}
str.appendC ('\n');
}
str.append ("END\n");
return str.toString ();
});
c$.statementAsString = $_M(c$, "statementAsString", 
function (viewer, statement, iTok, doLogMessages) {
if (statement.length == 0) return "";
var sb =  new JU.SB ();
var tok = statement[0].tok;
switch (tok) {
case 0:
return statement[0].value;
case 1150985:
if (statement.length == 2 && (statement[1].tok == 135368713 || statement[1].tok == 102436)) return ((statement[1].value)).toString ();
}
var useBraces = true;
var inBrace = false;
var inClauseDefine = false;
var setEquals = (statement.length > 1 && tok == 1085443 && statement[0].value.equals ("") && (statement[0].intValue == 61 || statement[0].intValue == 35) && statement[1].tok != 1048577);
var len = statement.length;
for (var i = 0; i < len; ++i) {
var token = statement[i];
if (token == null) {
len = i;
break;
}if (iTok == i - 1) sb.append (" <<");
if (i != 0) sb.appendC (' ');
if (i == 2 && setEquals) {
if ((setEquals = (token.tok != 269484436)) || statement[0].intValue == 35) {
sb.append (setEquals ? "= " : "== ");
if (!setEquals) continue;
}}if (iTok == i && token.tok != 1048578) sb.append (">> ");
switch (token.tok) {
case 1048577:
if (useBraces) sb.append ("{");
continue;
case 1048578:
if (inClauseDefine && i == statement.length - 1) useBraces = false;
if (useBraces) sb.append ("}");
continue;
case 269484096:
case 269484097:
break;
case 1048586:
case 1048590:
inBrace = (token.tok == 1048586);
break;
case 1060866:
if (i > 0 && (token.value).equals ("define")) {
sb.append ("@");
if (i + 1 < statement.length && statement[i + 1].tok == 1048577) {
if (!useBraces) inClauseDefine = true;
useBraces = true;
}continue;
}break;
case 1048589:
sb.append ("true");
continue;
case 1048588:
sb.append ("false");
continue;
case 135280132:
break;
case 2:
sb.appendI (token.intValue);
continue;
case 8:
case 9:
case 10:
sb.append (J.script.SV.sValue (token));
continue;
case 7:
case 6:
sb.append ((token).escape ());
continue;
case 5:
sb.appendC ('^');
continue;
case 1048615:
if (token.intValue != 2147483647) sb.appendI (token.intValue);
 else sb.append (J.modelset.Group.getSeqcodeStringFor (J.script.ScriptEvaluator.getSeqCode (token)));
token = statement[++i];
sb.appendC (' ');
sb.append (inBrace ? "-" : "- ");
case 1048614:
if (token.intValue != 2147483647) sb.appendI (token.intValue);
 else sb.append (J.modelset.Group.getSeqcodeStringFor (J.script.ScriptEvaluator.getSeqCode (token)));
continue;
case 1048609:
sb.append ("*:");
sb.append (viewer.getChainIDStr (token.intValue));
continue;
case 1048607:
sb.append ("*%");
if (token.value != null) sb.append (token.value.toString ());
continue;
case 1048610:
sb.append ("*/");
case 1048611:
case 3:
if (token.intValue < 2147483647) {
sb.append (J.util.Escape.escapeModelFileNumber (token.intValue));
} else {
sb.append ("" + token.value);
}continue;
case 1048613:
sb.appendC ('[');
sb.append (J.modelset.Group.getGroup3For (token.intValue));
sb.appendC (']');
continue;
case 1048612:
sb.appendC ('[');
sb.appendO (token.value);
sb.appendC (']');
continue;
case 1048608:
sb.append ("*.");
break;
case 1095761925:
if (Clazz_instanceOf (token.value, JU.P3)) {
var pt = token.value;
sb.append ("cell=").append (J.util.Escape.eP (pt));
continue;
}break;
case 4:
sb.append ("\"").appendO (token.value).append ("\"");
continue;
case 269484436:
case 269484434:
case 269484433:
case 269484432:
case 269484435:
case 269484438:
if (token.intValue == 1716520985) {
sb.append (statement[++i].value).append (" ");
} else if (token.intValue != 2147483647) sb.append (J.script.T.nameOf (token.intValue)).append (" ");
break;
case 364558:
continue;
case 1150985:
sb.append ("end");
continue;
default:
if (J.script.T.tokAttr (token.tok, 1073741824) || !doLogMessages) break;
sb.appendC ('\n').append (token.toString ()).appendC ('\n');
continue;
}
if (token.value != null) sb.append (token.value.toString ());
}
if (iTok >= len - 1 && iTok != 9999) sb.append (" <<");
return sb.toString ();
}, "J.viewer.Viewer,~A,~N,~B");
$_M(c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.sm.getShapePropertyIndex (shapeType, propertyName, -2147483648);
}, "~N,~S");
$_M(c$, "getShapePropertyData", 
function (shapeType, propertyName, data) {
return this.sm.getShapePropertyData (shapeType, propertyName, data);
}, "~N,~S,~A");
$_M(c$, "setObjectMad", 
function (iShape, name, mad) {
if (this.chk) return;
this.viewer.setObjectMad (iShape, name, mad);
}, "~N,~S,~N");
$_M(c$, "setObjectArgb", 
function (str, argb) {
if (this.chk) return;
this.viewer.setObjectArgb (str, argb);
}, "~S,~N");
$_M(c$, "setShapeProperty", 
function (shapeType, propertyName, propertyValue) {
if (!this.chk) this.sm.setShapePropertyBs (shapeType, propertyName, propertyValue, null);
}, "~N,~S,~O");
$_M(c$, "setShapePropertyBs", 
function (iShape, propertyName, propertyValue, bs) {
if (!this.chk) this.sm.setShapePropertyBs (iShape, propertyName, propertyValue, bs);
}, "~N,~S,~O,JU.BS");
$_M(c$, "setShapeSizeBs", 
function (shapeType, size, bs) {
if (this.chk) return;
this.sm.setShapeSizeBs (shapeType, size, null, bs);
}, "~N,~N,JU.BS");
$_M(c$, "setShapeSize", 
function (shapeType, rd) {
if (this.chk) return;
this.sm.setShapeSizeBs (shapeType, 0, rd, null);
}, "~N,J.atomdata.RadiusData");
$_M(c$, "setBooleanProperty", 
function (key, value) {
if (!this.chk) this.viewer.setBooleanProperty (key, value);
}, "~S,~B");
$_M(c$, "setIntProperty", 
function (key, value) {
if (!this.chk) this.viewer.setIntProperty (key, value);
return true;
}, "~S,~N");
$_M(c$, "setFloatProperty", 
function (key, value) {
if (!this.chk) this.viewer.setFloatProperty (key, value);
return true;
}, "~S,~N");
$_M(c$, "setStringProperty", 
function (key, value) {
if (!this.chk) this.viewer.setStringProperty (key, value);
}, "~S,~S");
$_M(c$, "showString", 
function (str) {
this.showStringPrint (str, false);
}, "~S");
$_M(c$, "showStringPrint", 
function (str, isPrint) {
if (this.chk || str == null) return;
if (this.outputBuffer != null) this.outputBuffer.append (str).appendC ('\n');
 else this.viewer.showString (str, isPrint);
}, "~S,~B");
$_M(c$, "scriptStatusOrBuffer", 
function (s) {
if (this.chk) return;
if (this.outputBuffer != null) {
this.outputBuffer.append (s).appendC ('\n');
return;
}this.viewer.scriptStatus (s);
}, "~S");
$_M(c$, "atomExpressionAt", 
function (index) {
if (!this.checkToken (index)) this.errorAt (2, index);
return this.atomExpression (this.st, index, 0, true, false, true, true);
}, "~N");
$_M(c$, "atomExpression", 
function (code, pcStart, pcStop, allowRefresh, allowUnderflow, mustBeBitSet, andNotDeleted) {
this.isBondSet = false;
if (code !== this.st) {
this.tempStatement = this.st;
this.st = code;
}var rpn =  new J.script.ScriptMathProcessor (this, false, false, mustBeBitSet);
var val;
var comparisonValue = 2147483647;
var refreshed = false;
this.iToken = 1000;
var ignoreSubset = (pcStart < 0);
var isInMath = false;
var nExpress = 0;
var atomCount = this.viewer.getAtomCount ();
if (ignoreSubset) pcStart = -pcStart;
ignoreSubset = new Boolean (ignoreSubset | this.chk).valueOf ();
if (pcStop == 0 && code.length > pcStart) pcStop = pcStart + 1;
expression_loop : for (var pc = pcStart; pc < pcStop; ++pc) {
this.iToken = pc;
var instruction = code[pc];
if (instruction == null) break;
var value = instruction.value;
switch (instruction.tok) {
case 1048577:
pcStart = pc;
pcStop = code.length;
nExpress++;
break;
case 1048578:
nExpress--;
if (nExpress > 0) continue;
break expression_loop;
case 1048586:
if (this.isPoint3f (pc)) {
var pt = this.getPoint3f (pc, true);
if (pt != null) {
rpn.addXPt (pt);
pc = this.iToken;
break;
}}break;
case 1048590:
if (pc > 0 && code[pc - 1].tok == 1048586) rpn.addXBs ( new JU.BS ());
break;
case 269484096:
isInMath = true;
rpn.addOp (instruction);
break;
case 269484097:
isInMath = false;
rpn.addOp (instruction);
break;
case 1060866:
rpn.addXBs (this.getAtomBitSet (value));
break;
case 135267841:
rpn.addXVar (J.script.SV.newT (instruction));
rpn.addXVar (J.script.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
break;
case 135266319:
rpn.addXVar (J.script.SV.newT (instruction));
rpn.addXVar (J.script.SV.newV (9, this.planeParameter (pc + 2)));
pc = this.iToken;
break;
case 1048582:
rpn.addXVar (J.script.SV.newT (instruction));
rpn.addXPt (this.getPoint3f (pc + 2, true));
pc = this.iToken;
break;
case 4:
var s = value;
if (s.indexOf ("({") == 0) {
var bs = J.util.Escape.uB (s);
if (bs != null) {
rpn.addXBs (bs);
break;
}}rpn.addXVar (J.script.SV.newT (instruction));
if (s.equals ("hkl")) {
rpn.addXVar (J.script.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
}break;
case 135267336:
case 135267335:
case 1238369286:
case 135266325:
case 135402505:
case 135266310:
case 269484080:
rpn.addOp (instruction);
break;
case 1048579:
rpn.addXBs (this.viewer.getAllAtoms ());
break;
case 1048587:
rpn.addXBs ( new JU.BS ());
break;
case 1048589:
case 1048588:
rpn.addXVar (J.script.SV.newT (instruction));
break;
case 1114638363:
rpn.addXBs (J.util.BSUtil.copy (this.viewer.getSelectionSet (false)));
break;
case 3145770:
rpn.addXBs (J.util.BSUtil.copy (this.viewer.getHiddenSet ()));
break;
case 1060869:
rpn.addXBs (J.util.BSUtil.copy (this.viewer.getMotionFixedAtoms ()));
break;
case 3145768:
rpn.addXBs (J.util.BSUtil.copyInvert (this.viewer.getHiddenSet (), atomCount));
break;
case 3145776:
rpn.addXBs (this.viewer.getBaseModelBitSet ());
break;
case 3145774:
if (!this.chk && !refreshed) this.viewer.setModelVisibility ();
refreshed = true;
rpn.addXBs (this.viewer.getVisibleSet ());
break;
case 3145766:
if (!this.chk && allowRefresh) this.refresh ();
rpn.addXBs (this.viewer.getClickableSet ());
break;
case 1048608:
if (this.viewer.allowSpecAtom ()) {
var atomID = instruction.intValue;
if (atomID > 0) rpn.addXBs (this.compareInt (1095761922, 269484436, atomID));
 else rpn.addXBs (this.getAtomBits (instruction.tok, value));
} else {
rpn.addXBs (this.lookupIdentifierValue ("_" + value));
}break;
case 3145764:
case 3145732:
case 1613758470:
case 1048585:
case 3145742:
case 3145744:
case 3145746:
case 3145748:
case 3145750:
case 1048612:
case 1048607:
case 3145772:
case 1089470478:
case 3145778:
case 1614417948:
rpn.addXBs (this.getAtomBits (instruction.tok, value));
break;
case 1048610:
case 1048611:
var iModel = instruction.intValue;
if (iModel == 2147483647 && Clazz_instanceOf (value, Integer)) {
iModel = (value).intValue ();
if (!this.viewer.haveFileSet ()) {
rpn.addXBs (this.getAtomBits (1048610, Integer.$valueOf (iModel)));
break;
}if (iModel <= 2147) iModel = iModel * 1000000;
}rpn.addXBs (this.bitSetForModelFileNumber (iModel));
break;
case 1048613:
case 1048609:
rpn.addXBs (this.getAtomBits (instruction.tok, Integer.$valueOf (instruction.intValue)));
break;
case 1048614:
if (isInMath) rpn.addXNum (J.script.SV.newI (instruction.intValue));
 else rpn.addXBs (this.getAtomBits (1048614, Integer.$valueOf (J.script.ScriptEvaluator.getSeqCode (instruction))));
break;
case 1048615:
if (isInMath) {
rpn.addXNum (J.script.SV.newI (instruction.intValue));
rpn.addOp (J.script.T.tokenMinus);
rpn.addXNum (J.script.SV.newI (code[++pc].intValue));
break;
}var chainID = (pc + 3 < code.length && code[pc + 2].tok == 269484160 && code[pc + 3].tok == 1048609 ? code[pc + 3].intValue : -1);
rpn.addXBs (this.getAtomBits (1048615, [J.script.ScriptEvaluator.getSeqCode (instruction), J.script.ScriptEvaluator.getSeqCode (code[++pc]), chainID]));
if (chainID != -1) pc += 2;
break;
case 1095761926:
case 1095761925:
var pt = value;
rpn.addXBs (this.getAtomBits (instruction.tok, [Clazz_doubleToInt (Math.floor (pt.x * 1000)), Clazz_doubleToInt (Math.floor (pt.y * 1000)), Clazz_doubleToInt (Math.floor (pt.z * 1000))]));
break;
case 3145758:
rpn.addXBs (this.viewer.getModelUndeletedAtomsBitSet (this.viewer.getCurrentModelIndex ()));
break;
case 1613758476:
case 3145730:
case 1115297793:
case 1613758488:
case 137363468:
case 3145735:
case 3145736:
case 3145738:
case 3145754:
case 3145756:
rpn.addXBs (this.lookupIdentifierValue (value));
break;
case 269484435:
case 269484434:
case 269484433:
case 269484432:
case 269484436:
case 269484438:
if (pc + 1 == code.length) this.invArg ();
val = code[++pc].value;
var tokOperator = instruction.tok;
var tokWhat = instruction.intValue;
var property = (tokWhat == 1716520985 ? val : null);
if (property != null) {
if (pc + 1 == code.length) this.invArg ();
val = code[++pc].value;
}if (tokWhat == 1095766024 && tokOperator != 269484436) this.invArg ();
if (this.chk) {
rpn.addXBs ( new JU.BS ());
break;
}var isModel = (tokWhat == 1095766030);
var isIntProperty = J.script.T.tokAttr (tokWhat, 1095761920);
var isFloatProperty = J.script.T.tokAttr (tokWhat, 1112539136);
var isIntOrFloat = isIntProperty && isFloatProperty;
var isStringProperty = !isIntProperty && J.script.T.tokAttr (tokWhat, 1087373312);
if (tokWhat == 1087375365) isIntProperty = !(isStringProperty = false);
var tokValue = code[pc].tok;
comparisonValue = code[pc].intValue;
var comparisonFloat = NaN;
if (Clazz_instanceOf (val, JU.P3)) {
if (tokWhat == 1766856708) {
comparisonValue = JU.CU.colorPtToFFRGB (val);
tokValue = 2;
isIntProperty = true;
}} else if (Clazz_instanceOf (val, String)) {
if (tokWhat == 1766856708) {
comparisonValue = JU.CU.getArgbFromString (val);
if (comparisonValue == 0 && J.script.T.tokAttr (tokValue, 1073741824)) {
val = this.getStringParameter (val, true);
if ((val).startsWith ("{")) {
val = J.util.Escape.uP (val);
if (Clazz_instanceOf (val, JU.P3)) comparisonValue = JU.CU.colorPtToFFRGB (val);
 else comparisonValue = 0;
} else {
comparisonValue = JU.CU.getArgbFromString (val);
}}tokValue = 2;
isIntProperty = true;
} else if (isStringProperty) {
if (J.script.T.tokAttr (tokValue, 1073741824)) val = this.getStringParameter (val, true);
} else {
if (J.script.T.tokAttr (tokValue, 1073741824)) val = this.getNumericParameter (val);
if (Clazz_instanceOf (val, String)) {
if (tokWhat == 1641025539 || tokWhat == 1238369286 || tokWhat == 1087375365) isStringProperty = !(isIntProperty = (comparisonValue != 2147483647));
 else val = J.script.SV.nValue (code[pc]);
}if (Clazz_instanceOf (val, Integer)) comparisonFloat = comparisonValue = (val).intValue ();
 else if (Clazz_instanceOf (val, Float) && isModel) comparisonValue = J.modelset.ModelCollection.modelFileNumberFromFloat ((val).floatValue ());
}}if (isStringProperty && !(Clazz_instanceOf (val, String))) {
val = "" + val;
}if (Clazz_instanceOf (val, Integer) || tokValue == 2) {
if (isModel) {
if (comparisonValue >= 1000000) tokWhat = -1095766030;
} else if (isIntOrFloat) {
isFloatProperty = false;
} else if (isFloatProperty) {
comparisonFloat = comparisonValue;
}} else if (Clazz_instanceOf (val, Float)) {
if (isModel) {
tokWhat = -1095766030;
} else {
comparisonFloat = (val).floatValue ();
if (isIntOrFloat) {
isIntProperty = false;
} else if (isIntProperty) {
comparisonValue = Clazz_floatToInt (comparisonFloat);
}}} else if (!isStringProperty) {
this.iToken++;
this.invArg ();
}if (isModel && comparisonValue >= 1000000 && comparisonValue % 1000000 == 0) {
comparisonValue /= 1000000;
tokWhat = 1229984263;
isModel = false;
}if (tokWhat == -1095766030 && tokOperator == 269484436) {
rpn.addXBs (this.bitSetForModelFileNumber (comparisonValue));
break;
}if (value != null && (value).indexOf ("-") >= 0) {
if (isIntProperty) comparisonValue = -comparisonValue;
 else if (!Float.isNaN (comparisonFloat)) comparisonFloat = -comparisonFloat;
}var data = (tokWhat == 1716520985 ? this.viewer.getDataFloat (property) : null);
rpn.addXBs (isIntProperty ? this.compareInt (tokWhat, tokOperator, comparisonValue) : isStringProperty ? this.compareString (tokWhat, tokOperator, val) : this.compareFloatData (tokWhat, data, tokOperator, comparisonFloat));
break;
case 3:
case 2:
rpn.addXNum (J.script.SV.newT (instruction));
break;
case 10:
var bs1 = J.util.BSUtil.copy (value);
rpn.addXBs (bs1);
break;
case 8:
rpn.addXPt (value);
break;
default:
if (J.script.T.tokAttr (instruction.tok, 269484032)) {
if (!rpn.addOp (instruction)) this.invArg ();
break;
}if (!(Clazz_instanceOf (value, String))) {
rpn.addXObj (value);
break;
}val = this.getParameter (value, 0);
if (isInMath) {
rpn.addXObj (val);
break;
}if (Clazz_instanceOf (val, String)) val = this.getStringObjectAsVariable (val, null);
if (Clazz_instanceOf (val, JU.List)) {
var bs = J.script.SV.unEscapeBitSetArray (val, true);
if (bs == null) val = value;
 else val = bs;
}if (Clazz_instanceOf (val, String)) val = this.lookupIdentifierValue (value);
rpn.addXObj (val);
break;
}
}
this.expressionResult = rpn.getResult (allowUnderflow);
if (this.expressionResult == null) {
if (allowUnderflow) return null;
if (!this.chk) rpn.dumpStacks ("after getResult");
this.error (13);
}this.expressionResult = (this.expressionResult).value;
if (Clazz_instanceOf (this.expressionResult, String) && (mustBeBitSet || (this.expressionResult).startsWith ("({"))) {
this.expressionResult = (this.chk ?  new JU.BS () : this.getAtomBitSet (this.expressionResult));
}if (!mustBeBitSet && !(Clazz_instanceOf (this.expressionResult, JU.BS))) return null;
var bs = (Clazz_instanceOf (this.expressionResult, JU.BS) ? this.expressionResult :  new JU.BS ());
this.isBondSet = (Clazz_instanceOf (this.expressionResult, J.modelset.BondSet));
if (!this.isBondSet) {
this.viewer.excludeAtoms (bs, ignoreSubset);
if (bs.length () > this.viewer.getAtomCount ()) bs.clearAll ();
}if (this.tempStatement != null) {
this.st = this.tempStatement;
this.tempStatement = null;
}return bs;
}, "~A,~N,~N,~B,~B,~B,~B");
$_M(c$, "compareFloatData", 
function (tokWhat, data, tokOperator, comparisonFloat) {
var bs =  new JU.BS ();
var atomCount = this.viewer.getAtomCount ();
var modelSet = this.viewer.modelSet;
var atoms = modelSet.atoms;
var propertyFloat = 0;
this.viewer.autoCalculate (tokWhat);
for (var i = atomCount; --i >= 0; ) {
var match = false;
var atom = atoms[i];
switch (tokWhat) {
default:
propertyFloat = J.modelset.Atom.atomPropertyFloat (this.viewer, atom, tokWhat);
break;
case 1716520985:
if (data == null || data.length <= i) continue;
propertyFloat = data[i];
}
match = J.script.ScriptEvaluator.compareFloat (tokOperator, propertyFloat, comparisonFloat);
if (match) bs.set (i);
}
return bs;
}, "~N,~A,~N,~N");
$_M(c$, "compareString", 
function (tokWhat, tokOperator, comparisonString) {
var bs =  new JU.BS ();
var atoms = this.viewer.modelSet.atoms;
var atomCount = this.viewer.getAtomCount ();
var isCaseSensitive = (tokWhat == 1087373316 && this.viewer.getBoolean (603979822));
if (!isCaseSensitive) comparisonString = comparisonString.toLowerCase ();
for (var i = atomCount; --i >= 0; ) {
var propertyString = J.modelset.Atom.atomPropertyString (this.viewer, atoms[i], tokWhat);
if (!isCaseSensitive) propertyString = propertyString.toLowerCase ();
if (this.compareStringValues (tokOperator, propertyString, comparisonString)) bs.set (i);
}
return bs;
}, "~N,~N,~S");
$_M(c$, "compareInt", 
function (tokWhat, tokOperator, comparisonValue) {
var propertyValue = 2147483647;
var propertyBitSet = null;
var bitsetComparator = tokOperator;
var bitsetBaseValue = comparisonValue;
var atomCount = this.viewer.getAtomCount ();
var modelSet = this.viewer.modelSet;
var atoms = modelSet.atoms;
var imax = -1;
var imin = 0;
var iModel = -1;
var cellRange = null;
var nOps = 0;
var bs;
switch (tokWhat) {
case 1297090050:
switch (bitsetComparator) {
case 269484433:
case 269484432:
imax = 2147483647;
break;
}
break;
case 1095761923:
try {
switch (tokOperator) {
case 269484435:
return J.util.BSUtil.newBitSet2 (0, comparisonValue);
case 269484434:
return J.util.BSUtil.newBitSet2 (0, comparisonValue + 1);
case 269484433:
return J.util.BSUtil.newBitSet2 (comparisonValue, atomCount);
case 269484432:
return J.util.BSUtil.newBitSet2 (comparisonValue + 1, atomCount);
case 269484436:
return (comparisonValue < atomCount ? J.util.BSUtil.newBitSet2 (comparisonValue, comparisonValue + 1) :  new JU.BS ());
case 269484438:
default:
bs = J.util.BSUtil.setAll (atomCount);
if (comparisonValue >= 0) bs.clear (comparisonValue);
return bs;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return  new JU.BS ();
} else {
throw e;
}
}
}
bs = J.util.BSUtil.newBitSet (atomCount);
for (var i = 0; i < atomCount; ++i) {
var match = false;
var atom = atoms[i];
switch (tokWhat) {
default:
propertyValue = J.modelset.Atom.atomPropertyInt (atom, tokWhat);
break;
case 1095766024:
return J.util.BSUtil.copy (this.viewer.getConformation (-1, comparisonValue - 1, false));
case 1297090050:
propertyBitSet = atom.getAtomSymmetry ();
if (propertyBitSet == null) continue;
if (atom.getModelIndex () != iModel) {
iModel = atom.getModelIndex ();
cellRange = modelSet.getModelCellRange (iModel);
nOps = modelSet.getModelSymmetryCount (iModel);
}if (bitsetBaseValue >= 200) {
if (cellRange == null) continue;
comparisonValue = bitsetBaseValue % 1000;
var symop = Clazz_doubleToInt (bitsetBaseValue / 1000) - 1;
if (symop < 0) {
match = true;
} else if (nOps == 0 || symop >= 0 && !(match = propertyBitSet.get (symop))) {
continue;
}bitsetComparator = 1048587;
if (symop < 0) propertyValue = atom.getCellTranslation (comparisonValue, cellRange, nOps);
 else propertyValue = atom.getSymmetryTranslation (symop, cellRange, nOps);
} else if (nOps > 0) {
if (comparisonValue > nOps) {
if (bitsetComparator != 269484435 && bitsetComparator != 269484434) continue;
}if (bitsetComparator == 269484438) {
if (comparisonValue > 0 && comparisonValue <= nOps && !propertyBitSet.get (comparisonValue)) {
bs.set (i);
}continue;
}}switch (bitsetComparator) {
case 269484435:
imax = comparisonValue - 1;
break;
case 269484434:
imax = comparisonValue;
break;
case 269484433:
imin = comparisonValue - 1;
break;
case 269484432:
imin = comparisonValue;
break;
case 269484436:
imax = comparisonValue;
imin = comparisonValue - 1;
break;
case 269484438:
match = !propertyBitSet.get (comparisonValue);
break;
}
if (imin < 0) imin = 0;
if (imin < imax) {
var pt = propertyBitSet.nextSetBit (imin);
if (pt >= 0 && pt < imax) match = true;
}if (!match || propertyValue == 2147483647) tokOperator = 1048587;
}
switch (tokOperator) {
case 1048587:
break;
case 269484435:
match = (propertyValue < comparisonValue);
break;
case 269484434:
match = (propertyValue <= comparisonValue);
break;
case 269484433:
match = (propertyValue >= comparisonValue);
break;
case 269484432:
match = (propertyValue > comparisonValue);
break;
case 269484436:
match = (propertyValue == comparisonValue);
break;
case 269484438:
match = (propertyValue != comparisonValue);
break;
}
if (match) bs.set (i);
}
return bs;
}, "~N,~N,~N");
$_M(c$, "compareStringValues", 
function (tokOperator, propertyValue, comparisonValue) {
switch (tokOperator) {
case 269484436:
case 269484438:
return (J.util.Txt.isMatch (propertyValue, comparisonValue, true, true) == (tokOperator == 269484436));
default:
this.invArg ();
}
return false;
}, "~N,~S,~S");
c$.compareFloat = $_M(c$, "compareFloat", 
function (tokOperator, propertyFloat, comparisonFloat) {
switch (tokOperator) {
case 269484435:
return propertyFloat < comparisonFloat;
case 269484434:
return propertyFloat <= comparisonFloat;
case 269484433:
return propertyFloat >= comparisonFloat;
case 269484432:
return propertyFloat > comparisonFloat;
case 269484436:
return propertyFloat == comparisonFloat;
case 269484438:
return propertyFloat != comparisonFloat;
}
return false;
}, "~N,~N,~N");
$_M(c$, "getAtomBits", 
function (tokType, specInfo) {
return (this.chk ?  new JU.BS () : this.viewer.getAtomBits (tokType, specInfo));
}, "~N,~O");
c$.getSeqCode = $_M(c$, "getSeqCode", 
function (instruction) {
return (instruction.intValue == 2147483647 ? (instruction.value).intValue () : J.modelset.Group.getSeqcodeFor (instruction.intValue, ' '));
}, "J.script.T");
$_M(c$, "checkLast", 
function (i) {
return this.checkLength (i + 1) - 1;
}, "~N");
$_M(c$, "checkLength", 
function (length) {
if (length >= 0) return this.checkLengthErrorPt (length, 0);
if (this.slen > -length) {
this.iToken = -length;
this.error (2);
}return this.slen;
}, "~N");
$_M(c$, "checkLengthErrorPt", 
function (length, errorPt) {
if (this.slen != length) {
this.iToken = errorPt > 0 ? errorPt : this.slen;
this.error (errorPt > 0 ? 22 : 2);
}return this.slen;
}, "~N,~N");
$_M(c$, "checkLength23", 
function () {
this.iToken = this.slen;
if (this.slen != 2 && this.slen != 3) this.error (2);
return this.slen;
});
$_M(c$, "checkLength34", 
function () {
this.iToken = this.slen;
if (this.slen != 3 && this.slen != 4) this.error (2);
return this.slen;
});
$_M(c$, "getToken", 
function (i) {
if (!this.checkToken (i)) this.error (13);
this.theToken = this.st[i];
this.theTok = this.theToken.tok;
return this.theToken;
}, "~N");
$_M(c$, "tokAt", 
function (i) {
return (i < this.slen && this.st[i] != null ? this.st[i].tok : 0);
}, "~N");
$_M(c$, "checkToken", 
function (i) {
return (this.iToken = i) < this.slen;
}, "~N");
$_M(c$, "modelNumberParameter", 
function (index) {
var iFrame = 0;
var useModelNumber = false;
switch (this.tokAt (index)) {
case 2:
useModelNumber = true;
case 3:
iFrame = this.getToken (index).intValue;
break;
case 4:
iFrame = J.script.ScriptEvaluator.getFloatEncodedInt (this.stringParameter (index));
break;
default:
this.invArg ();
}
return this.viewer.getModelNumberIndex (iFrame, useModelNumber, true);
}, "~N");
$_M(c$, "optParameterAsString", 
function (i) {
if (i >= this.slen) return "";
return this.parameterAsString (i);
}, "~N");
$_M(c$, "parameterAsString", 
function (i) {
this.getToken (i);
if (this.theToken == null) this.error (13);
return J.script.SV.sValue (this.theToken);
}, "~N");
$_M(c$, "intParameter", 
function (index) {
if (this.checkToken (index)) if (this.getToken (index).tok == 2) return this.theToken.intValue;
this.error (20);
return 0;
}, "~N");
$_M(c$, "intParameterRange", 
function (i, min, max) {
var val = this.intParameter (i);
if (val < min || val > max) this.integerOutOfRange (min, max);
return val;
}, "~N,~N,~N");
$_M(c$, "isFloatParameter", 
function (index) {
switch (this.tokAt (index)) {
case 2:
case 3:
return true;
}
return false;
}, "~N");
$_M(c$, "floatParameterRange", 
function (i, min, max) {
var val = this.floatParameter (i);
if (val < min || val > max) this.numberOutOfRange (min, max);
return val;
}, "~N,~N,~N");
$_M(c$, "floatParameter", 
function (index) {
if (this.checkToken (index)) {
this.getToken (index);
switch (this.theTok) {
case 1048615:
return -this.theToken.intValue;
case 1048614:
case 2:
return this.theToken.intValue;
case 1048611:
case 3:
return (this.theToken.value).floatValue ();
}
}this.error (34);
return 0;
}, "~N");
$_M(c$, "listParameter", 
function (i, nMin, nMax) {
var v =  new JU.List ();
var pt;
var tok = this.tokAt (i);
if (tok == 1073742195) tok = this.tokAt (++i);
var haveBrace = (tok == 1048586);
var haveSquare = (tok == 269484096);
if (haveBrace || haveSquare) i++;
var n = 0;
while (n < nMax) {
tok = this.tokAt (i);
if (haveBrace && tok == 1048590 || haveSquare && tok == 269484097) break;
switch (tok) {
case 269484080:
case 1048586:
case 1048590:
break;
case 4:
break;
case 8:
pt = this.getPoint3f (i, false);
v.addLast (Float.$valueOf (pt.x));
v.addLast (Float.$valueOf (pt.y));
v.addLast (Float.$valueOf (pt.z));
n += 3;
break;
case 9:
var pt4 = this.getPoint4f (i);
v.addLast (Float.$valueOf (pt4.x));
v.addLast (Float.$valueOf (pt4.y));
v.addLast (Float.$valueOf (pt4.z));
v.addLast (Float.$valueOf (pt4.w));
n += 4;
break;
default:
v.addLast (Float.$valueOf (this.floatParameter (i)));
n++;
if (n == nMax && haveSquare && this.tokAt (i + 1) == 1048590) i++;
}
i++;
}
if (haveBrace && this.tokAt (i++) != 1048590 || haveSquare && this.tokAt (i++) != 269484097 || n < nMin || n > nMax) this.invArg ();
this.iToken = i - 1;
return v;
}, "~N,~N,~N");
$_M(c$, "floatParameterSet", 
function (i, nMin, nMax) {
var v = null;
var fparams = null;
var n = 0;
var s = null;
this.iToken = i;
switch (this.tokAt (i)) {
case 4:
s = J.script.SV.sValue (this.st[i]);
s = JU.PT.replaceAllCharacter (s, "{},[]\"'", ' ');
fparams = JU.PT.parseFloatArray (s);
n = fparams.length;
break;
case 7:
fparams = J.script.SV.flistValue (this.st[i], 0);
n = fparams.length;
break;
default:
v = this.listParameter (i, nMin, nMax);
n = v.size ();
}
if (n < nMin || n > nMax) this.invArg ();
if (fparams == null) {
fparams =  Clazz_newFloatArray (n, 0);
for (var j = 0; j < n; j++) fparams[j] = (v.get (j)).floatValue ();

}return fparams;
}, "~N,~N,~N");
$_M(c$, "isArrayParameter", 
function (i) {
switch (this.tokAt (i)) {
case 7:
case 11:
case 12:
case 1073742195:
case 269484096:
return true;
}
return false;
}, "~N");
$_M(c$, "getPointArray", 
function (i, nPoints) {
var points = (nPoints < 0 ? null :  new Array (nPoints));
var vp = (nPoints < 0 ?  new JU.List () : null);
var tok = (i < 0 ? 7 : this.getToken (i++).tok);
switch (tok) {
case 7:
var v = (this.theToken).getList ();
if (nPoints >= 0 && v.size () != nPoints) this.invArg ();
nPoints = v.size ();
if (points == null) points =  new Array (nPoints);
for (var j = 0; j < nPoints; j++) if ((points[j] = J.script.SV.ptValue (v.get (j))) == null) this.invArg ();

return points;
case 1073742195:
tok = this.tokAt (i++);
break;
}
if (tok != 269484096) this.invArg ();
var n = 0;
while (tok != 269484097 && tok != 0) {
tok = this.getToken (i).tok;
switch (tok) {
case 0:
case 269484097:
break;
case 269484080:
i++;
break;
default:
if (nPoints >= 0 && n == nPoints) {
tok = 0;
break;
}var pt = this.getPoint3f (i, true);
if (points == null) vp.addLast (pt);
 else points[n] = pt;
n++;
i = this.iToken + 1;
}
}
if (tok != 269484097) this.invArg ();
if (points == null) points = vp.toArray ( new Array (vp.size ()));
return points;
}, "~N,~N");
$_M(c$, "stringParameter", 
function (index) {
if (!this.checkToken (index) || this.getToken (index).tok != 4) this.error (41);
return this.theToken.value;
}, "~N");
$_M(c$, "stringParameterSet", 
function (i) {
switch (this.tokAt (i)) {
case 4:
var s = this.stringParameter (i);
if (s.startsWith ("[\"")) {
var o = this.viewer.evaluateExpression (s);
if (Clazz_instanceOf (o, String)) return JU.PT.split (o, "\n");
}return [s];
case 1073742195:
i += 2;
break;
case 269484096:
++i;
break;
case 7:
return J.script.SV.listValue (this.getToken (i));
default:
this.invArg ();
}
var tok;
var v =  new JU.List ();
while ((tok = this.tokAt (i)) != 269484097) {
switch (tok) {
case 269484080:
break;
case 4:
v.addLast (this.stringParameter (i));
break;
default:
case 0:
this.invArg ();
}
i++;
}
this.iToken = i;
var n = v.size ();
var sParams =  new Array (n);
for (var j = 0; j < n; j++) {
sParams[j] = v.get (j);
}
return sParams;
}, "~N");
$_M(c$, "objectNameParameter", 
function (index) {
if (!this.checkToken (index)) this.error (37);
return this.parameterAsString (index);
}, "~N");
$_M(c$, "booleanParameter", 
function (i) {
if (this.slen == i) return true;
switch (this.getToken (this.checkLast (i)).tok) {
case 1048589:
return true;
case 1048588:
return false;
default:
this.error (5);
}
return false;
}, "~N");
$_M(c$, "atomCenterOrCoordinateParameter", 
function (i) {
switch (this.getToken (i).tok) {
case 10:
case 1048577:
var bs = this.atomExpression (this.st, i, 0, true, false, false, true);
if (bs != null && bs.cardinality () == 1) return this.viewer.getAtomPoint3f (bs.nextSetBit (0));
if (bs != null) return this.viewer.getAtomSetCenter (bs);
if (Clazz_instanceOf (this.expressionResult, JU.P3)) return this.expressionResult;
this.invArg ();
break;
case 1048586:
case 8:
return this.getPoint3f (i, true);
}
this.invArg ();
return null;
}, "~N");
$_M(c$, "isCenterParameter", 
function (i) {
var tok = this.tokAt (i);
return (tok == 1048583 || tok == 1048586 || tok == 1048577 || tok == 8 || tok == 10);
}, "~N");
$_M(c$, "centerParameter", 
function (i) {
return this.centerParameterForModel (i, -2147483648);
}, "~N");
$_M(c$, "centerParameterForModel", 
function (i, modelIndex) {
var center = null;
this.expressionResult = null;
if (this.checkToken (i)) {
switch (this.getToken (i).tok) {
case 1048583:
var id = this.objectNameParameter (++i);
var index = -2147483648;
if (this.tokAt (i + 1) == 269484096) {
index = this.parameterExpressionList (-i - 1, -1, true).get (0).asInt ();
if (this.getToken (--this.iToken).tok != 269484097) this.invArg ();
}if (this.chk) return  new JU.P3 ();
if (this.tokAt (i + 1) == 1048584 && (this.tokAt (i + 2) == 1141899267 || this.tokAt (i + 2) == 1141899270)) {
index = 2147483647;
this.iToken = i + 2;
}if ((center = this.getObjectCenter (id, index, modelIndex)) == null) this.errorStr (12, id);
break;
case 10:
case 1048577:
case 1048586:
case 8:
center = this.atomCenterOrCoordinateParameter (i);
break;
}
}if (center == null) this.error (11);
return center;
}, "~N,~N");
$_M(c$, "planeParameter", 
function (i) {
var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
var plane = null;
var isNegated = (this.tokAt (i) == 269484192);
if (isNegated) i++;
if (i < this.slen) switch (this.getToken (i).tok) {
case 9:
plane = JU.P4.newPt (this.theToken.value);
break;
case 1048583:
var id = this.objectNameParameter (++i);
if (this.chk) return  new JU.P4 ();
var shapeType = this.sm.getShapeIdFromObjectName (id);
switch (shapeType) {
case 22:
this.setShapeProperty (22, "thisID", id);
var points = this.getShapeProperty (22, "vertices");
if (points == null || points.length < 3 || points[0] == null || points[1] == null || points[2] == null) break;
J.util.Measure.getPlaneThroughPoints (points[0], points[1], points[2],  new JU.V3 (), vAB, vAC, plane =  new JU.P4 ());
break;
case 24:
this.setShapeProperty (24, "thisID", id);
plane = this.getShapeProperty (24, "plane");
break;
}
break;
case 1112541205:
if (!this.checkToken (++i) || this.getToken (i++).tok != 269484436) this.evalError ("x=?", null);
plane = JU.P4.new4 (1, 0, 0, -this.floatParameter (i));
break;
case 1112541206:
if (!this.checkToken (++i) || this.getToken (i++).tok != 269484436) this.evalError ("y=?", null);
plane = JU.P4.new4 (0, 1, 0, -this.floatParameter (i));
break;
case 1112541207:
if (!this.checkToken (++i) || this.getToken (i++).tok != 269484436) this.evalError ("z=?", null);
plane = JU.P4.new4 (0, 0, 1, -this.floatParameter (i));
break;
case 1073741824:
case 4:
var str = this.parameterAsString (i);
if (str.equalsIgnoreCase ("xy")) return JU.P4.new4 (0, 0, 1, 0);
if (str.equalsIgnoreCase ("xz")) return JU.P4.new4 (0, 1, 0, 0);
if (str.equalsIgnoreCase ("yz")) return JU.P4.new4 (1, 0, 0, 0);
this.iToken += 2;
break;
case 1048586:
if (!this.isPoint3f (i)) {
plane = this.getPoint4f (i);
break;
}case 10:
case 1048577:
var pt1 = this.atomCenterOrCoordinateParameter (i);
if (this.getToken (++this.iToken).tok == 269484080) ++this.iToken;
var pt2 = this.atomCenterOrCoordinateParameter (this.iToken);
if (this.getToken (++this.iToken).tok == 269484080) ++this.iToken;
var pt3 = this.atomCenterOrCoordinateParameter (this.iToken);
i = this.iToken;
var norm =  new JU.V3 ();
var w = J.util.Measure.getNormalThroughPoints (pt1, pt2, pt3, norm, vAB, vAC);
plane =  new JU.P4 ();
plane.set (norm.x, norm.y, norm.z, w);
if (!this.chk && J.util.Logger.debugging) J.util.Logger.debug ("points: " + pt1 + pt2 + pt3 + " defined plane: " + plane);
break;
}
if (plane == null) this.planeExpected ();
if (isNegated) {
plane.scale (-1);
}return plane;
}, "~N");
$_M(c$, "hklParameter", 
function (i) {
if (!this.chk && this.viewer.getCurrentUnitCell () == null) this.error (33);
var pt = this.getPointOrPlane (i, false, true, false, true, 3, 3);
var p = this.getHklPlane (pt);
if (p == null) this.error (3);
if (!this.chk && J.util.Logger.debugging) J.util.Logger.debug ("defined plane: " + p);
return p;
}, "~N");
$_M(c$, "getHklPlane", 
function (pt) {
var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
var pt1 = JU.P3.new3 (pt.x == 0 ? 1 : 1 / pt.x, 0, 0);
var pt2 = JU.P3.new3 (0, pt.y == 0 ? 1 : 1 / pt.y, 0);
var pt3 = JU.P3.new3 (0, 0, pt.z == 0 ? 1 : 1 / pt.z);
if (pt.x == 0 && pt.y == 0 && pt.z == 0) {
return null;
} else if (pt.x == 0 && pt.y == 0) {
pt1.set (1, 0, pt3.z);
pt2.set (0, 1, pt3.z);
} else if (pt.y == 0 && pt.z == 0) {
pt2.set (pt1.x, 0, 1);
pt3.set (pt1.x, 1, 0);
} else if (pt.z == 0 && pt.x == 0) {
pt3.set (0, pt2.y, 1);
pt1.set (1, pt2.y, 0);
} else if (pt.x == 0) {
pt1.set (1, pt2.y, 0);
} else if (pt.y == 0) {
pt2.set (0, 1, pt3.z);
} else if (pt.z == 0) {
pt3.set (pt1.x, 0, 1);
}this.viewer.toCartesian (pt1, false);
this.viewer.toCartesian (pt2, false);
this.viewer.toCartesian (pt3, false);
var plane =  new JU.V3 ();
var w = J.util.Measure.getNormalThroughPoints (pt1, pt2, pt3, plane, vAB, vAC);
var pt4 =  new JU.P4 ();
pt4.set (plane.x, plane.y, plane.z, w);
return pt4;
}, "JU.P3");
$_M(c$, "getMadParameter", 
function () {
var mad = 1;
switch (this.getToken (1).tok) {
case 1073742072:
this.restrictSelected (false, false);
break;
case 1048589:
break;
case 1048588:
mad = 0;
break;
case 2:
var radiusRasMol = this.intParameterRange (1, 0, 750);
mad = radiusRasMol * 4 * 2;
break;
case 3:
mad = Clazz_doubleToInt (Math.floor (this.floatParameterRange (1, -3, 3) * 1000 * 2));
if (mad < 0) {
this.restrictSelected (false, false);
mad = -mad;
}break;
default:
this.error (6);
}
return mad;
});
$_M(c$, "getSetAxesTypeMad", 
function (index) {
if (index == this.slen) return 1;
switch (this.getToken (this.checkLast (index)).tok) {
case 1048589:
return 1;
case 1048588:
return 0;
case 1073741926:
return -1;
case 2:
return this.intParameterRange (index, -1, 19);
case 3:
var angstroms = this.floatParameterRange (index, 0, 2);
return Clazz_doubleToInt (Math.floor (angstroms * 1000 * 2));
}
this.errorStr (7, "\"DOTTED\"");
return 0;
}, "~N");
$_M(c$, "isColorParam", 
function (i) {
var tok = this.tokAt (i);
return (tok == 570425378 || tok == 1073742195 || tok == 269484096 || tok == 7 || tok == 8 || this.isPoint3f (i) || (tok == 4 || J.script.T.tokAttr (tok, 1073741824)) && JU.CU.getArgbFromString (this.st[i].value) != 0);
}, "~N");
$_M(c$, "getArgbParam", 
function (index) {
return this.getArgbParamOrNone (index, false);
}, "~N");
$_M(c$, "getArgbParamLast", 
function (index, allowNone) {
var icolor = this.getArgbParamOrNone (index, allowNone);
this.checkLast (this.iToken);
return icolor;
}, "~N,~B");
$_M(c$, "getArgbParamOrNone", 
function (index, allowNone) {
var pt = null;
if (this.checkToken (index)) {
switch (this.getToken (index).tok) {
default:
if (!J.script.T.tokAttr (this.theTok, 1073741824)) break;
case 570425378:
case 4:
return JU.CU.getArgbFromString (this.parameterAsString (index));
case 1073742195:
return this.getColorTriad (index + 2);
case 269484096:
return this.getColorTriad (++index);
case 7:
var rgb = J.script.SV.flistValue (this.theToken, 3);
if (rgb != null && rgb.length != 3) pt = JU.P3.new3 (rgb[0], rgb[1], rgb[2]);
break;
case 8:
pt = this.theToken.value;
break;
case 1048586:
pt = this.getPoint3f (index, false);
break;
case 1048587:
if (allowNone) return 0;
}
}if (pt == null) this.error (8);
return JU.CU.colorPtToFFRGB (pt);
}, "~N,~B");
$_M(c$, "getColorTriad", 
function (i) {
var colors =  Clazz_newFloatArray (3, 0);
var n = 0;
var hex = "";
this.getToken (i);
var pt = null;
var val = 0;
out : switch (this.theTok) {
case 2:
case 1048614:
case 3:
for (; i < this.slen; i++) {
switch (this.getToken (i).tok) {
case 269484080:
continue;
case 1073741824:
if (n != 1 || colors[0] != 0) this.error (4);
hex = "0" + this.parameterAsString (i);
break out;
case 3:
if (n > 2) this.error (4);
val = this.floatParameter (i);
break;
case 2:
if (n > 2) this.error (4);
val = this.theToken.intValue;
break;
case 1048614:
if (n > 2) this.error (4);
val = (this.theToken.value).intValue () % 256;
break;
case 269484097:
if (n != 3) this.error (4);
--i;
pt = JU.P3.new3 (colors[0], colors[1], colors[2]);
break out;
default:
this.error (4);
}
colors[n++] = val;
}
this.error (4);
break;
case 8:
pt = this.theToken.value;
break;
case 1073741824:
hex = this.parameterAsString (i);
break;
default:
this.error (4);
}
if (this.getToken (++i).tok != 269484097) this.error (4);
if (pt != null) return JU.CU.colorPtToFFRGB (pt);
if ((n = JU.CU.getArgbFromString ("[" + hex + "]")) == 0) this.error (4);
return n;
}, "~N");
$_M(c$, "isPoint3f", 
function (i) {
var isOK;
if ((isOK = (this.tokAt (i) == 8)) || this.tokAt (i) == 9 || this.isFloatParameter (i + 1) && this.isFloatParameter (i + 2) && this.isFloatParameter (i + 3) && this.isFloatParameter (i + 4)) return isOK;
this.ignoreError = true;
var t = this.iToken;
isOK = true;
try {
this.getPoint3f (i, true);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
isOK = false;
} else {
throw e;
}
}
this.ignoreError = false;
this.iToken = t;
return isOK;
}, "~N");
$_M(c$, "getPoint3f", 
function (i, allowFractional) {
return this.getPointOrPlane (i, false, allowFractional, true, false, 3, 3);
}, "~N,~B");
$_M(c$, "getPoint4f", 
function (i) {
return this.getPointOrPlane (i, false, false, false, false, 4, 4);
}, "~N");
$_M(c$, "getPointOrPlane", 
function (index, integerOnly, allowFractional, doConvert, implicitFractional, minDim, maxDim) {
var coord =  Clazz_newFloatArray (6, 0);
var n = 0;
this.coordinatesAreFractional = implicitFractional;
if (this.tokAt (index) == 8) {
if (minDim <= 3 && maxDim >= 3) return this.getToken (index).value;
this.invArg ();
}if (this.tokAt (index) == 9) {
if (minDim <= 4 && maxDim >= 4) return this.getToken (index).value;
this.invArg ();
}var multiplier = 1;
out : for (var i = index; i < this.st.length; i++) {
switch (this.getToken (i).tok) {
case 1048586:
case 269484080:
case 269484128:
case 269484160:
break;
case 1048590:
break out;
case 269484192:
multiplier = -1;
break;
case 1048615:
if (n == 6) this.invArg ();
coord[n++] = this.theToken.intValue;
multiplier = -1;
break;
case 2:
case 1048614:
if (n == 6) this.invArg ();
coord[n++] = this.theToken.intValue * multiplier;
multiplier = 1;
break;
case 269484208:
case 1048610:
if (!allowFractional) this.invArg ();
if (this.theTok == 269484208) this.getToken (++i);
n--;
if (n < 0 || integerOnly) this.invArg ();
if (Clazz_instanceOf (this.theToken.value, Integer) || this.theTok == 2) {
coord[n++] /= (this.theToken.intValue == 2147483647 ? (this.theToken.value).intValue () : this.theToken.intValue);
} else if (Clazz_instanceOf (this.theToken.value, Float)) {
coord[n++] /= (this.theToken.value).floatValue ();
}this.coordinatesAreFractional = true;
break;
case 1048609:
case 1073741824:
coord[n++] = NaN;
break;
case 3:
case 1048611:
if (integerOnly) this.invArg ();
if (n == 6) this.invArg ();
coord[n++] = (this.theToken.value).floatValue ();
break;
default:
this.invArg ();
}
}
if (n < minDim || n > maxDim) this.invArg ();
if (n == 3) {
var pt = JU.P3.new3 (coord[0], coord[1], coord[2]);
if (this.coordinatesAreFractional && doConvert) {
this.fractionalPoint = JU.P3.newP (pt);
if (!this.chk) this.viewer.toCartesian (pt, !this.viewer.getBoolean (603979848));
}return pt;
}if (n == 4) {
if (this.coordinatesAreFractional) this.invArg ();
var plane = JU.P4.new4 (coord[0], coord[1], coord[2], coord[3]);
return plane;
}return coord;
}, "~N,~B,~B,~B,~B,~N,~N");
$_M(c$, "xypParameter", 
function (index) {
var tok = this.tokAt (index);
if (tok == 1073742195) tok = this.tokAt (++index);
if (tok != 269484096 || !this.isFloatParameter (++index)) return null;
var pt =  new JU.P3 ();
pt.x = this.floatParameter (index);
if (this.tokAt (++index) == 269484080) index++;
if (!this.isFloatParameter (index)) return null;
pt.y = this.floatParameter (index);
var isPercent = (this.tokAt (++index) == 269484210);
if (isPercent) ++index;
if (this.tokAt (index) != 269484097) return null;
this.iToken = index;
pt.z = (isPercent ? -1 : 1) * 3.4028235E38;
return pt;
}, "~N");
$_M(c$, "isCommandDisplayable", 
function (i) {
if (i >= this.aatoken.length || i >= this.pcEnd || this.aatoken[i] == null) return false;
return (this.lineIndices[i][1] > this.lineIndices[i][0]);
}, "~N");
$_M(c$, "checkContinue", 
function () {
if (this.executionStopped) return false;
if (this.executionStepping && this.isCommandDisplayable (this.pc)) {
this.viewer.setScriptStatus ("Next: " + this.getNextStatement (), "stepping -- type RESUME to continue", 0, null);
this.executionPaused = true;
} else if (!this.executionPaused) {
return true;
}if (J.util.Logger.debugging) {
J.util.Logger.debug ("script execution paused at command " + (this.pc + 1) + " level " + this.scriptLevel + ": " + this.thisCommand);
}this.refresh ();
while (this.executionPaused) {
this.viewer.popHoldRepaint ("pause \u0001## REPAINT_IGNORE ##");
var script = this.viewer.getInsertedCommand ();
if (script.length > 0) {
this.resumePausedExecution ();
this.setErrorMessage (null);
var scSave = this.getScriptContext ("script insertion");
this.pc--;
try {
this.runScript (script);
} catch (e$$) {
if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.setErrorMessage ("" + e);
}
} else if (Clazz_exceptionOf (e$$, Error)) {
var er = e$$;
{
this.setErrorMessage ("" + er);
}
} else {
throw e$$;
}
}
if (this.$error) {
this.scriptStatusOrBuffer (this.errorMessage);
this.setErrorMessage (null);
}this.restoreScriptContext (scSave, true, false, false);
this.pauseExecution (false);
}this.doDelay (-100);
this.viewer.pushHoldRepaintWhy ("pause");
}
this.notifyResumeStatus ();
return !this.$error && !this.executionStopped;
});
$_V(c$, "notifyResumeStatus", 
function () {
if (!this.chk && !this.executionStopped && !this.executionStepping) {
this.viewer.scriptStatus ("script execution " + (this.$error || this.executionStopped ? "interrupted" : "resumed"));
}if (J.util.Logger.debugging) J.util.Logger.debug ("script execution resumed");
});
$_M(c$, "doDelay", 
function (millis) {
if (!this.useThreads ()) return;
if (this.isJS && this.allowJSThreads) throw  new J.script.ScriptInterruption (this, "delay", millis);
this.delayScript (millis);
}, "~N");
$_M(c$, "dispatchCommands", 
function (isSpt, fromFunc) {
if (this.sm == null) this.sm = this.viewer.getShapeManager ();
this.debugScript = this.logMessages = false;
if (!this.chk) this.setDebugging ();
if (this.pcEnd == 0) this.pcEnd = 2147483647;
if (this.lineEnd == 0) this.lineEnd = 2147483647;
if (this.aatoken == null) return true;
this.commandLoop (fromFunc);
if (this.chk) return true;
var script = this.viewer.getInsertedCommand ();
if (!"".equals (script)) {
this.runScriptBuffer (script, null);
} else if (isSpt && this.debugScript && this.viewer.getBoolean (603979880)) {
this.viewer.scriptStatus ("script <exiting>");
}if (!this.isJS || !this.allowJSThreads || fromFunc) return true;
if (this.mustResumeEval || this.thisContext == null) {
var done = (this.thisContext == null);
this.resumeEval (this.thisContext);
this.mustResumeEval = false;
return done;
}return true;
}, "~B,~B");
$_M(c$, "commandLoop", 
function (fromFunc) {
var lastCommand = "";
var isForCheck = false;
var vProcess = null;
var lastTime = System.currentTimeMillis ();
for (; this.pc < this.aatoken.length && this.pc < this.pcEnd; this.pc++) {
if (!this.chk && this.isJS && this.useThreads () && !fromFunc) {
if (!this.executionPaused && System.currentTimeMillis () - lastTime > 1000) {
this.pc--;
this.doDelay (-1);
}lastTime = System.currentTimeMillis ();
}if (!this.chk && !this.checkContinue ()) break;
if (this.lineNumbers[this.pc] > this.lineEnd) break;
if (this.logMessages) {
var timeBegin = 0;
timeBegin = System.currentTimeMillis ();
this.viewer.scriptStatus ("Eval.dispatchCommands():" + timeBegin);
this.viewer.scriptStatus (this.$script);
}if (this.debugScript && !this.chk) J.util.Logger.info ("Command " + this.pc);
this.theToken = (this.aatoken[this.pc].length == 0 ? null : this.aatoken[this.pc][0]);
if (!this.historyDisabled && !this.chk && this.scriptLevel <= this.commandHistoryLevelMax && !this.tQuiet) {
var cmdLine = this.getCommand (this.pc, true, true);
if (this.theToken != null && cmdLine.length > 0 && !cmdLine.equals (lastCommand) && (this.theToken.tok == 135368713 || this.theToken.tok == 102436 || !J.script.T.tokAttr (this.theToken.tok, 102400))) this.viewer.addCommand (lastCommand = cmdLine);
}if (!this.chk) {
var script = this.viewer.getInsertedCommand ();
if (!"".equals (script)) this.runScript (script);
}if (!this.setStatement (this.pc)) {
J.util.Logger.info (this.getCommand (this.pc, true, false) + " -- STATEMENT CONTAINING @{} SKIPPED");
continue;
}this.thisCommand = this.getCommand (this.pc, false, true);
var nextCommand = this.getCommand (this.pc + 1, false, true);
this.fullCommand = this.thisCommand + (nextCommand.startsWith ("#") ? nextCommand : "");
this.getToken (0);
this.iToken = 0;
if ((this.listCommands || !this.chk && this.scriptLevel > 0) && !this.isJS) {
var milliSecDelay = this.viewer.getInt (536870922);
if (this.listCommands || milliSecDelay > 0) {
if (milliSecDelay > 0) this.delayScript (-milliSecDelay);
this.viewer.scriptEcho ("$[" + this.scriptLevel + "." + this.lineNumbers[this.pc] + "." + (this.pc + 1) + "] " + this.thisCommand);
}}if (vProcess != null && (this.theTok != 1150985 || this.slen < 2 || this.st[1].tok != 102439)) {
vProcess.addLast (this.st);
continue;
}if (this.chk) {
if (this.isCmdLine_c_or_C_Option) J.util.Logger.info (this.thisCommand);
if (this.slen == 1 && this.st[0].tok != 135368713 && this.st[0].tok != 102436) continue;
} else {
if (this.debugScript) this.logDebugScript (0);
if (this.scriptLevel == 0 && this.viewer.global.logCommands) this.viewer.log (this.thisCommand);
if (this.logMessages && this.theToken != null) J.util.Logger.debug (this.theToken.toString ());
}if (this.theToken == null) continue;
if (J.script.T.tokAttr (this.theToken.tok, 135168)) this.processShapeCommand (this.theToken.tok);
 else switch (this.theToken.tok) {
case 0:
if (this.chk || !this.viewer.getBoolean (603979880)) break;
var s = this.theToken.value;
if (s == null) break;
if (this.outputBuffer == null) this.viewer.showMessage (s);
this.scriptStatusOrBuffer (s);
break;
case 1276383749:
this.pushContext (this.theToken, "PUSH");
break;
case 1276383249:
this.popContext (true, false);
break;
case 269484066:
break;
case 20500:
case 528410:
if (this.viewer.isHeadless ()) break;
case 102412:
case 102407:
case 102408:
case 364547:
case 102402:
case 1150985:
case 364548:
case 135369224:
case 135369225:
case 102410:
case 102411:
case 102413:
case 102406:
isForCheck = this.flowControl (this.theToken.tok, isForCheck, vProcess);
if (this.theTok == 102439) vProcess = null;
break;
case 4097:
this.animation ();
break;
case 4098:
this.assign ();
break;
case 1610616835:
this.background (1);
break;
case 4100:
this.bind ();
break;
case 4101:
this.bondorder ();
break;
case 135270423:
this.cache ();
break;
case 1069064:
this.cd ();
break;
case 12289:
this.center (1);
break;
case 4105:
this.centerAt ();
break;
case 1766856708:
this.color ();
break;
case 4106:
this.connect (1);
break;
case 528395:
this.console ();
break;
case 1060866:
this.define ();
break;
case 528397:
this.delay ();
break;
case 12291:
this.$delete ();
break;
case 554176526:
this.slab (true);
break;
case 1610625028:
this.display (true);
break;
case 266255:
case 266281:
if (this.chk) break;
if (this.pc > 0 && this.theToken.tok == 266255) this.viewer.clearScriptQueue ();
this.executionStopped = (this.pc > 0 || !this.viewer.global.useScriptQueue);
break;
case 266256:
if (this.chk) return;
this.viewer.exitJmol ();
break;
case 1229984263:
this.file ();
break;
case 1060869:
this.fixed ();
break;
case 4114:
this.font (-1, 0);
break;
case 4115:
case 1095766030:
this.model (1);
break;
case 102436:
case 135368713:
case 1073741824:
this.$function ();
break;
case 135270410:
this.getProperty ();
break;
case 20482:
this.help ();
break;
case 12294:
this.display (false);
break;
case 1612189718:
this.hbond ();
break;
case 1610616855:
this.history (1);
break;
case 544771:
this.hover ();
break;
case 266264:
if (!this.chk) this.viewer.initialize (!this.isStateScript);
break;
case 4121:
this.invertSelected ();
break;
case 135287308:
this.script (135287308, null, null);
break;
case 135271426:
this.load ();
break;
case 36869:
this.log ();
break;
case 20485:
this.message ();
break;
case 4128:
this.move ();
break;
case 4130:
this.moveto ();
break;
case 20487:
this.pause ();
break;
case 36865:
this.print ();
break;
case 102439:
this.pushContext (this.theToken, "PROCESS");
if (this.parallelProcessor != null) vProcess =  new JU.List ();
break;
case 135304707:
this.prompt ();
break;
case 4139:
case 4165:
this.undoRedoMove ();
break;
case 266284:
this.refresh ();
break;
case 4141:
this.reset ();
break;
case 4142:
this.restore ();
break;
case 12295:
this.restrict ();
break;
case 266287:
if (!this.chk) this.resumePausedExecution ();
break;
case 36866:
this.returnCmd (null);
break;
case 528432:
this.rotate (false, false);
break;
case 4145:
this.rotate (false, true);
break;
case 4146:
this.save ();
break;
case 1085443:
this.set ();
break;
case 135271429:
this.script (135271429, null, null);
break;
case 135280132:
this.select (1);
break;
case 1611141171:
this.selectionHalo (1);
break;
case 554176565:
this.slab (false);
break;
case 1611141175:
this.rotate (true, false);
break;
case 1611141176:
this.ssbond ();
break;
case 266298:
if (this.pause ()) this.stepPausedExecution ();
break;
case 528443:
this.stereo ();
break;
case 1641025539:
this.structure ();
break;
case 3158024:
this.subset ();
break;
case 4156:
this.sync ();
break;
case 536875070:
this.timeout (1);
break;
case 4160:
this.translate (false);
break;
case 4162:
this.translate (true);
break;
case 4164:
this.unbind ();
break;
case 4166:
this.vibration ();
break;
case 1060873:
this.zap (true);
break;
case 4168:
this.zoom (false);
break;
case 4170:
this.zoom (true);
break;
case 4102:
case 4103:
case 135270405:
case 1095766024:
case 1052700:
case 4126:
case 1276121113:
case 4133:
case 135270418:
case 1052714:
case 135270407:
case 4131:
case 4148:
case 135270422:
this.getExtension ().dispatch (this.theToken.tok, false, this.st);
break;
default:
this.error (47);
}
this.setCursorWait (false);
if (this.executionStepping) {
this.executionPaused = (this.isCommandDisplayable (this.pc + 1));
}}
}, "~B");
$_M(c$, "cache", 
function () {
var tok = this.tokAt (1);
var fileName = null;
var n = 2;
switch (tok) {
case 1276118017:
case 1073742119:
fileName = this.optParameterAsString (n++);
case 1073741882:
this.checkLength (n);
if (!this.chk) {
if ("all".equals (fileName)) fileName = null;
var nBytes = this.viewer.cacheFileByName (fileName, tok == 1276118017);
this.showString (nBytes < 0 ? "cache cleared" : nBytes + " bytes " + (tok == 1276118017 ? " cached" : " removed"));
}break;
default:
this.invArg ();
}
});
$_M(c$, "setCursorWait", 
function (TF) {
if (!this.chk) this.viewer.setCursor (TF ? 3 : 0);
}, "~B");
$_M(c$, "processShapeCommand", 
function (tok) {
var iShape = 0;
switch (tok) {
case 1611272194:
iShape = 31;
break;
case 1115297793:
iShape = 9;
break;
case 1679429641:
iShape = 32;
break;
case 1113200642:
iShape = 11;
break;
case 135174:
iShape = 23;
break;
case 135402505:
iShape = 25;
break;
case 135175:
iShape = 17;
break;
case 1113198595:
iShape = 16;
break;
case 135176:
iShape = 22;
break;
case 537022465:
iShape = 30;
break;
case 1113198596:
iShape = 20;
break;
case 1611272202:
iShape = 35;
break;
case 1113198597:
iShape = 19;
break;
case 1113200646:
iShape = 8;
break;
case 135180:
iShape = 24;
break;
case 1826248715:
iShape = 5;
break;
case 135182:
iShape = 26;
break;
case 537006096:
case 1746538509:
iShape = 6;
break;
case 1113200647:
iShape = 13;
break;
case 1183762:
iShape = 27;
break;
case 135190:
iShape = 29;
break;
case 135188:
iShape = 28;
break;
case 135192:
iShape = 21;
break;
case 1113200649:
iShape = 14;
break;
case 1113200650:
iShape = 15;
break;
case 1113200651:
iShape = 0;
break;
case 1113200652:
iShape = 7;
break;
case 1650071565:
iShape = 12;
break;
case 1708058:
iShape = 4;
break;
case 1113200654:
iShape = 10;
break;
case 1614417948:
iShape = 33;
break;
case 135198:
iShape = 18;
break;
case 659488:
iShape = 1;
break;
default:
this.error (47);
}
if (this.sm.getShape (iShape) == null && this.slen == 2) {
switch (this.st[1].tok) {
case 1048588:
case 12291:
case 1048587:
return;
}
}switch (tok) {
case 1115297793:
case 1113200642:
case 1113200647:
case 1113200649:
case 1113200650:
case 1650071565:
case 1113200654:
this.proteinShape (iShape);
return;
case 1113198595:
case 1113198597:
this.dots (iShape);
return;
case 1113198596:
this.ellipsoid ();
return;
case 1113200646:
case 1113200651:
case 1113200652:
this.setAtomShapeSize (iShape, (tok == 1113200646 ? -1.0 : 1));
return;
case 1826248715:
this.label (1);
return;
case 135198:
this.vector ();
return;
case 659488:
this.wireframe ();
return;
}
switch (tok) {
case 1611272194:
this.axes (1);
return;
case 1679429641:
this.boundbox (1);
return;
case 537022465:
this.echo (1, null, false);
return;
case 1611272202:
this.frank (1);
return;
case 1614417948:
this.unitcell (1);
return;
case 135174:
case 135402505:
case 135175:
case 135176:
case 135180:
case 135182:
case 537006096:
case 1746538509:
case 1183762:
case 135190:
case 135188:
case 135192:
case 1708058:
this.getExtension ().dispatch (iShape, false, this.st);
return;
}
}, "~N");
$_M(c$, "getExtension", 
function () {
return (this.scriptExt == null ? (this.scriptExt = J.api.Interface.getOptionInterface ("scriptext.ScriptExt")).init (this) : this.scriptExt);
});
$_M(c$, "flowControl", 
function (tok, isForCheck, vProcess) {
var ct;
switch (tok) {
case 20500:
this.gotoCmd (this.parameterAsString (this.checkLast (1)));
return isForCheck;
case 528410:
if (!this.chk) this.pc = -1;
this.delay ();
return isForCheck;
}
var pt = this.st[0].intValue;
var isDone = (pt < 0 && !this.chk);
var isOK = true;
var ptNext = 0;
switch (tok) {
case 102412:
ct = this.theToken;
this.pushContext (ct, "CATCH");
if (!isDone && ct.name0 != null) this.contextVariables.put (ct.name0, ct.contextVariables.get (ct.name0));
isOK = !isDone;
break;
case 102410:
case 102413:
case 102411:
ptNext = Math.abs (this.aatoken[Math.abs (pt)][0].intValue);
switch (isDone ? 0 : this.switchCmd (this.theToken, tok)) {
case 0:
ptNext = -ptNext;
isOK = false;
break;
case -1:
isOK = false;
break;
case 1:
}
this.aatoken[this.pc][0].intValue = Math.abs (pt);
this.theToken = this.aatoken[Math.abs (pt)][0];
if (this.theToken.tok != 1150985) this.theToken.intValue = ptNext;
break;
case 135369225:
case 102402:
isOK = (!isDone && this.ifCmd ());
if (this.chk) break;
ptNext = Math.abs (this.aatoken[Math.abs (pt)][0].intValue);
ptNext = (isDone || isOK ? -ptNext : ptNext);
this.aatoken[Math.abs (pt)][0].intValue = ptNext;
if (tok == 102412) this.aatoken[this.pc][0].intValue = -pt;
break;
case 364547:
this.checkLength (1);
if (pt < 0 && !this.chk) this.pc = -pt - 1;
break;
case 364548:
this.checkLength (1);
break;
case 102406:
if (!isForCheck) this.pushContext (this.theToken, "WHILE");
isForCheck = false;
if (!this.ifCmd () && !this.chk) {
this.pc = pt;
this.popContext (true, false);
}break;
case 102407:
if (!this.chk) {
this.breakCmd (pt);
break;
}if (this.slen == 1) break;
var n = this.intParameter (this.checkLast (1));
if (this.chk) break;
for (var i = 0; i < n; i++) this.popContext (true, false);

break;
case 102408:
isForCheck = true;
if (!this.chk) this.pc = pt - 1;
if (this.slen > 1) this.intParameter (this.checkLast (1));
break;
case 135369224:
var token = this.theToken;
var pts =  Clazz_newIntArray (2, 0);
var j = 0;
var bsOrList = null;
for (var i = 1, nSkip = 0; i < this.slen && j < 2; i++) {
switch (this.tokAt (i)) {
case 1048591:
if (nSkip > 0) nSkip--;
 else pts[j++] = i;
break;
case 1073741980:
nSkip -= 2;
if (this.tokAt (++i) == 1048577 || this.tokAt (i) == 10) {
bsOrList = this.atomExpressionAt (i);
if (this.isBondSet) bsOrList =  new J.modelset.BondSet (bsOrList);
} else {
var what = this.parameterExpressionList (-i, 1, false);
if (what == null || what.size () < 1) this.invArg ();
var vl = what.get (0);
switch (vl.tok) {
case 10:
bsOrList = J.script.SV.getBitSet (vl, false);
break;
case 7:
bsOrList = vl.getList ();
break;
default:
this.invArg ();
}
}i = this.iToken;
break;
case 135280132:
nSkip += 2;
break;
}
}
if (isForCheck) {
j = (bsOrList == null ? pts[1] + 1 : 2);
} else {
this.pushContext (token, "FOR");
j = 2;
}if (this.tokAt (j) == 36868) j++;
var key = this.parameterAsString (j);
var isMinusMinus = key.equals ("--") || key.equals ("++");
if (isMinusMinus) {
key = this.parameterAsString (++j);
}var v = null;
if (J.script.T.tokAttr (this.tokAt (j), 1073741824) || (v = this.getContextVariableAsVariable (key)) != null) {
if (bsOrList == null && !isMinusMinus && this.getToken (++j).tok != 269484436) this.invArg ();
if (bsOrList == null) {
if (isMinusMinus) j -= 2;
this.setVariable (++j, this.slen - 1, key, 0);
} else {
isOK = true;
var key_incr = (key + "_incr");
if (v == null) v = this.getContextVariableAsVariable (key_incr);
if (v == null) {
if (key.startsWith ("_")) this.invArg ();
v = this.viewer.getOrSetNewVariable (key_incr, true);
}if (!isForCheck || v.tok != 10 && v.tok != 7 || v.intValue == 2147483647) {
if (isForCheck) {
isOK = false;
} else {
v.setv (J.script.SV.getVariable (bsOrList), false);
v.intValue = 1;
}} else {
v.intValue++;
}isOK = isOK && (Clazz_instanceOf (bsOrList, JU.BS) ? J.script.SV.bsSelectVar (v).cardinality () == 1 : v.intValue <= v.getList ().size ());
if (isOK) {
v = J.script.SV.selectItemVar (v);
var t = this.getContextVariableAsVariable (key);
if (t == null) t = this.viewer.getOrSetNewVariable (key, true);
t.setv (v, false);
}}}if (bsOrList == null) isOK = this.parameterExpressionBoolean (pts[0] + 1, pts[1]);
pt++;
if (!isOK) this.popContext (true, false);
isForCheck = false;
break;
case 1150985:
switch (this.getToken (this.checkLast (1)).tok) {
case 364558:
var trycmd = this.getToken (1).value;
if (this.chk) return false;
this.runFunctionRet (trycmd, "try", null, null, true, true, true);
return false;
case 102412:
this.popContext (true, false);
break;
case 135368713:
case 102436:
this.viewer.addFunction (this.theToken.value);
return isForCheck;
case 102439:
this.addProcess (vProcess, pt, this.pc);
this.popContext (true, false);
break;
case 102410:
if (pt > 0 && this.switchCmd (this.aatoken[pt][0], 0) == -1) {
for (; pt < this.pc; pt++) if ((tok = this.aatoken[pt][0].tok) != 102413 && tok != 102411) break;

isOK = (this.pc == pt);
}break;
}
if (isOK) isOK = (this.theTok == 102412 || this.theTok == 102439 || this.theTok == 135369225 || this.theTok == 102410);
isForCheck = (this.theTok == 135369224 || this.theTok == 102406);
break;
}
if (!isOK && !this.chk) this.pc = Math.abs (pt) - 1;
return isForCheck;
}, "~N,~B,JU.List");
$_M(c$, "gotoCmd", 
function (strTo) {
var pcTo = (strTo == null ? this.aatoken.length - 1 : -1);
var s = null;
for (var i = pcTo + 1; i < this.aatoken.length; i++) {
var tokens = this.aatoken[i];
var tok = tokens[0].tok;
switch (tok) {
case 20485:
case 0:
s = tokens[tokens.length - 1].value;
if (tok == 0) s = s.substring (s.startsWith ("#") ? 1 : 2);
break;
default:
continue;
}
if (s.equalsIgnoreCase (strTo)) {
pcTo = i;
break;
}}
if (pcTo < 0) this.invArg ();
if (strTo == null) pcTo = 0;
var di = (pcTo < this.pc ? 1 : -1);
var nPush = 0;
for (var i = pcTo; i != this.pc; i += di) {
switch (this.aatoken[i][0].tok) {
case 1276383749:
case 102439:
case 135369224:
case 102412:
case 102406:
nPush++;
break;
case 1276383249:
nPush--;
break;
case 1150985:
switch (this.aatoken[i][1].tok) {
case 102439:
case 135369224:
case 102412:
case 102406:
nPush--;
}
break;
}
}
if (strTo == null) {
pcTo = 2147483647;
for (; nPush > 0; --nPush) this.popContext (false, false);

}if (nPush != 0) this.invArg ();
if (!this.chk) this.pc = pcTo - 1;
}, "~S");
$_M(c$, "breakCmd", 
function (pt) {
if (pt < 0) {
this.getContextVariableAsVariable ("_breakval").intValue = -pt;
this.pcEnd = this.pc;
return;
}this.pc = Math.abs (this.aatoken[pt][0].intValue);
var tok = this.aatoken[pt][0].tok;
if (tok == 102411 || tok == 102413) {
this.theToken = this.aatoken[this.pc--][0];
var ptNext = Math.abs (this.theToken.intValue);
if (this.theToken.tok != 1150985) this.theToken.intValue = -ptNext;
} else {
while (this.thisContext != null && !J.script.ScriptCompiler.isBreakableContext (this.thisContext.token.tok)) this.popContext (true, false);

this.popContext (true, false);
}}, "~N");
$_M(c$, "addProcess", 
function (vProcess, pc, pt) {
if (this.parallelProcessor == null) return;
var statements =  new Array (pt);
for (var i = 0; i < vProcess.size (); i++) statements[i + 1 - pc] = vProcess.get (i);

var context = this.getScriptContext ("addProcess");
context.aatoken = statements;
context.pc = 1 - pc;
context.pcEnd = pt;
this.parallelProcessor.addProcess ("p" + (++J.script.ScriptEvaluator.iProcess), context);
}, "JU.List,~N,~N");
$_M(c$, "switchCmd", 
function (c, tok) {
if (tok == 102410) c.addName ("_var");
var $var = c.contextVariables.get ("_var");
if ($var == null) return 1;
if (tok == 0) {
c.contextVariables.remove ("_var");
return -1;
}if (tok == 102413) return -1;
var v = this.parameterExpressionToken (1);
if (tok == 102411) {
var isOK = J.script.SV.areEqual ($var, v);
if (isOK) c.contextVariables.remove ("_var");
return isOK ? 1 : -1;
}c.contextVariables.put ("_var", v);
return 1;
}, "J.script.ContextToken,~N");
$_M(c$, "ifCmd", 
function () {
return this.parameterExpressionBoolean (1, 0);
});
$_M(c$, "returnCmd", 
function (tv) {
var t = this.getContextVariableAsVariable ("_retval");
if (t == null) {
if (!this.chk) this.gotoCmd (null);
return;
}var v = (tv != null || this.slen == 1 ? null : this.parameterExpressionToken (1));
if (this.chk) return;
if (tv == null) tv = (v == null ? J.script.SV.newI (0) : v);
t.value = tv.value;
t.intValue = tv.intValue;
t.tok = tv.tok;
this.gotoCmd (null);
}, "J.script.SV");
$_M(c$, "help", 
function () {
if (this.chk) return;
var what = this.optParameterAsString (1).toLowerCase ();
var pt = 0;
if (what.startsWith ("mouse") && (pt = what.indexOf (" ")) >= 0 && pt == what.lastIndexOf (" ")) {
this.showString (this.viewer.getBindingInfo (what.substring (pt + 1)));
return;
}if (J.script.T.tokAttr (J.script.T.getTokFromName (what), 4096)) what = "?command=" + what;
this.viewer.getHelp (what);
});
$_M(c$, "move", 
function () {
this.checkLength (-11);
var dRot = JU.V3.new3 (this.floatParameter (1), this.floatParameter (2), this.floatParameter (3));
var dZoom = this.floatParameter (4);
var dTrans = JU.V3.new3 (this.intParameter (5), this.intParameter (6), this.intParameter (7));
var dSlab = this.floatParameter (8);
var floatSecondsTotal = this.floatParameter (9);
var fps = (this.slen == 11 ? this.intParameter (10) : 30);
if (this.chk) return;
this.refresh ();
if (!this.useThreads ()) floatSecondsTotal = 0;
this.viewer.move (this, dRot, dZoom, dTrans, dSlab, floatSecondsTotal, fps);
if (floatSecondsTotal > 0 && this.isJS) throw  new J.script.ScriptInterruption (this, "move", 1);
});
$_M(c$, "moveto", 
function () {
if (this.slen == 2 && this.tokAt (1) == 1073742162) {
if (!this.chk) this.viewer.stopMotion ();
return;
}var floatSecondsTotal;
if (this.slen == 2 && this.isFloatParameter (1)) {
floatSecondsTotal = this.floatParameter (1);
if (this.chk) return;
if (!this.useThreads ()) floatSecondsTotal = 0;
if (floatSecondsTotal > 0) this.refresh ();
this.viewer.moveTo (this, floatSecondsTotal, null, J.viewer.JC.axisZ, 0, null, 100, 0, 0, 0, null, NaN, NaN, NaN, NaN, NaN, NaN);
if (this.isJS && floatSecondsTotal > 0 && this.viewer.global.waitForMoveTo) throw  new J.script.ScriptInterruption (this, "moveTo", 1);
return;
}var axis = JU.V3.new3 (NaN, 0, 0);
var center = null;
var i = 1;
floatSecondsTotal = (this.isFloatParameter (i) ? this.floatParameter (i++) : 2.0);
var degrees = 90;
var bsCenter = null;
var isChange = true;
var xTrans = 0;
var yTrans = 0;
var zoom = NaN;
var rotationRadius = NaN;
var zoom0 = this.viewer.getZoomSetting ();
var navCenter = null;
var xNav = NaN;
var yNav = NaN;
var navDepth = NaN;
var cameraDepth = NaN;
var cameraX = NaN;
var cameraY = NaN;
var pymolView = null;
switch (this.getToken (i).tok) {
case 1073742110:
pymolView = this.floatParameterSet (++i, 18, 21);
i = this.iToken + 1;
if (this.chk && this.checkLength (i) > 0) return;
break;
case 135270418:
var q;
var isMolecular = false;
if (this.tokAt (++i) == 1073742029) {
isMolecular = true;
i++;
}if (this.tokAt (i) == 10 || this.tokAt (i) == 1048577) {
isMolecular = true;
center = this.centerParameter (i);
if (!(Clazz_instanceOf (this.expressionResult, JU.BS))) this.invArg ();
bsCenter = this.expressionResult;
q = (this.chk ?  new J.util.Quaternion () : this.viewer.getAtomQuaternion (bsCenter.nextSetBit (0)));
} else {
q = this.getQuaternionParameter (i);
}i = this.iToken + 1;
if (q == null) this.invArg ();
var aa = q.toAxisAngle4f ();
axis.set (aa.x, aa.y, aa.z);
degrees = (isMolecular ? -1 : 1) * (aa.angle * 180.0 / 3.141592653589793);
break;
case 9:
case 8:
case 1048586:
if (this.isPoint3f (i)) {
axis.setT (this.getPoint3f (i, true));
i = this.iToken + 1;
degrees = this.floatParameter (i++);
} else {
var pt4 = this.getPoint4f (i);
i = this.iToken + 1;
axis.set (pt4.x, pt4.y, pt4.z);
degrees = (pt4.x == 0 && pt4.y == 0 && pt4.z == 0 ? NaN : pt4.w);
}break;
case 1073741954:
axis.set (1, 0, 0);
degrees = 0;
this.checkLength (++i);
break;
case 1073741859:
axis.set (0, 1, 0);
degrees = 180;
this.checkLength (++i);
break;
case 1073741996:
axis.set (0, 1, 0);
this.checkLength (++i);
break;
case 1073742128:
axis.set (0, -1, 0);
this.checkLength (++i);
break;
case 1074790748:
axis.set (1, 0, 0);
this.checkLength (++i);
break;
case 1073741871:
axis.set (-1, 0, 0);
this.checkLength (++i);
break;
default:
axis = JU.V3.new3 (this.floatParameter (i++), this.floatParameter (i++), this.floatParameter (i++));
degrees = this.floatParameter (i++);
}
if (Float.isNaN (axis.x) || Float.isNaN (axis.y) || Float.isNaN (axis.z)) axis.set (0, 0, 0);
 else if (axis.length () == 0 && degrees == 0) degrees = NaN;
isChange = !this.viewer.isInPosition (axis, degrees);
if (this.isFloatParameter (i)) zoom = this.floatParameter (i++);
if (this.isFloatParameter (i) && !this.isCenterParameter (i)) {
xTrans = this.floatParameter (i++);
yTrans = this.floatParameter (i++);
if (!isChange && Math.abs (xTrans - this.viewer.getTranslationXPercent ()) >= 1) isChange = true;
if (!isChange && Math.abs (yTrans - this.viewer.getTranslationYPercent ()) >= 1) isChange = true;
}if (bsCenter == null && i != this.slen) {
center = this.centerParameter (i);
if (Clazz_instanceOf (this.expressionResult, JU.BS)) bsCenter = this.expressionResult;
i = this.iToken + 1;
}if (center != null) {
if (!isChange && center.distance (this.viewer.getRotationCenter ()) >= 0.1) isChange = true;
if (this.isFloatParameter (i)) rotationRadius = this.floatParameter (i++);
if (!this.isCenterParameter (i)) {
if ((rotationRadius == 0 || Float.isNaN (rotationRadius)) && (zoom == 0 || Float.isNaN (zoom))) {
var newZoom = Math.abs (this.getZoom (0, i, bsCenter, (zoom == 0 ? 0 : zoom0)));
i = this.iToken + 1;
zoom = newZoom;
} else {
if (!isChange && Math.abs (rotationRadius - this.viewer.getFloat (570425388)) >= 0.1) isChange = true;
}}if (zoom == 0 || Float.isNaN (zoom)) zoom = 100;
if (Float.isNaN (rotationRadius)) rotationRadius = 0;
if (!isChange && Math.abs (zoom - zoom0) >= 1) isChange = true;
if (i != this.slen) {
navCenter = this.centerParameter (i);
i = this.iToken + 1;
if (i != this.slen) {
xNav = this.floatParameter (i++);
yNav = this.floatParameter (i++);
}if (i != this.slen) navDepth = this.floatParameter (i++);
if (i != this.slen) {
cameraDepth = this.floatParameter (i++);
if (!isChange && Math.abs (cameraDepth - this.viewer.getCameraDepth ()) >= 0.01) isChange = true;
}if (i + 1 < this.slen) {
cameraX = this.floatParameter (i++);
cameraY = this.floatParameter (i++);
if (!isChange && Math.abs (cameraX - this.viewer.getCamera ().x) >= 0.01) isChange = true;
if (!isChange && Math.abs (cameraY - this.viewer.getCamera ().y) >= 0.01) isChange = true;
}}}this.checkLength (i);
if (this.chk) return;
if (!isChange) floatSecondsTotal = 0;
if (floatSecondsTotal > 0) this.refresh ();
if (!this.useThreads ()) floatSecondsTotal = 0;
if (cameraDepth == 0) {
cameraDepth = cameraX = cameraY = NaN;
}if (pymolView != null) this.viewer.movePyMOL (this, floatSecondsTotal, pymolView);
 else this.viewer.moveTo (this, floatSecondsTotal, center, axis, degrees, null, zoom, xTrans, yTrans, rotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY);
if (this.isJS && floatSecondsTotal > 0 && this.viewer.global.waitForMoveTo) throw  new J.script.ScriptInterruption (this, "moveTo", 1);
});
$_M(c$, "bondorder", 
function () {
this.checkLength (-3);
var order = 0;
switch (this.getToken (1).tok) {
case 2:
case 3:
if ((order = J.util.JmolEdge.getBondOrderFromFloat (this.floatParameter (1))) == 131071) this.invArg ();
break;
default:
if ((order = J.script.ScriptEvaluator.getBondOrderFromString (this.parameterAsString (1))) == 131071) this.invArg ();
if (order == 33 && this.tokAt (2) == 3) {
order = J.script.ScriptEvaluator.getPartialBondOrderFromFloatEncodedInt (this.st[2].intValue);
}}
this.setShapeProperty (1, "bondOrder", Integer.$valueOf (order));
});
$_M(c$, "console", 
function () {
switch (this.getToken (1).tok) {
case 1048588:
if (!this.chk) this.viewer.showConsole (false);
break;
case 1048589:
if (!this.chk) this.viewer.showConsole (true);
break;
case 1073741882:
if (!this.chk) this.viewer.clearConsole ();
break;
case 135270422:
this.showString (this.stringParameter (2));
break;
default:
this.invArg ();
}
});
$_M(c$, "centerAt", 
function () {
var relativeTo = null;
switch (this.getToken (1).tok) {
case 1073741826:
relativeTo = "absolute";
break;
case 96:
relativeTo = "average";
break;
case 1679429641:
relativeTo = "boundbox";
break;
default:
this.invArg ();
}
var pt = JU.P3.new3 (0, 0, 0);
if (this.slen == 5) {
pt.x = this.floatParameter (2);
pt.y = this.floatParameter (3);
pt.z = this.floatParameter (4);
} else if (this.isCenterParameter (2)) {
pt = this.centerParameter (2);
this.checkLast (this.iToken);
} else {
this.checkLength (2);
}if (!this.chk) this.viewer.setCenterAt (relativeTo, pt);
});
$_M(c$, "stereo", 
function () {
var stereoMode = J.constant.EnumStereoMode.DOUBLE;
var degrees = -5;
var degreesSeen = false;
var colors = null;
var colorpt = 0;
for (var i = 1; i < this.slen; ++i) {
if (this.isColorParam (i)) {
if (colorpt > 1) this.error (2);
if (colorpt == 0) colors =  Clazz_newIntArray (2, 0);
if (!degreesSeen) degrees = 3;
colors[colorpt] = this.getArgbParam (i);
if (colorpt++ == 0) colors[1] = ~colors[0];
i = this.iToken;
continue;
}switch (this.getToken (i).tok) {
case 1048589:
this.checkLast (this.iToken = 1);
this.iToken = 1;
break;
case 1048588:
this.checkLast (this.iToken = 1);
stereoMode = J.constant.EnumStereoMode.NONE;
break;
case 2:
case 3:
degrees = this.floatParameter (i);
degreesSeen = true;
break;
case 1073741824:
if (!degreesSeen) degrees = 3;
stereoMode = J.constant.EnumStereoMode.getStereoMode (this.parameterAsString (i));
if (stereoMode != null) break;
default:
this.invArg ();
}
}
if (this.chk) return;
this.viewer.setStereoMode (colors, stereoMode, degrees);
});
$_M(c$, "connect", 
function (index) {
var distances =  Clazz_newFloatArray (2, 0);
var atomSets =  new Array (2);
atomSets[0] = atomSets[1] = this.viewer.getSelectionSet (false);
var radius = NaN;
this.colorArgb[0] = -2147483648;
var distanceCount = 0;
var bondOrder = 131071;
var bo;
var operation = 1073742026;
var isDelete = false;
var haveType = false;
var haveOperation = false;
var translucentLevel = 3.4028235E38;
var isColorOrRadius = false;
var nAtomSets = 0;
var nDistances = 0;
var bsBonds =  new JU.BS ();
var isBonds = false;
var expression2 = 0;
var ptColor = 0;
var energy = 0;
var addGroup = false;
if (this.slen == 1) {
if (!this.chk) this.viewer.rebondState (this.isStateScript);
return;
}for (var i = index; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 1048589:
case 1048588:
this.checkLength (2);
if (!this.chk) this.viewer.rebondState (this.isStateScript);
return;
case 2:
case 3:
if (nAtomSets > 0) {
if (haveType || isColorOrRadius) this.error (23);
bo = J.util.JmolEdge.getBondOrderFromFloat (this.floatParameter (i));
if (bo == 131071) this.invArg ();
bondOrder = bo;
haveType = true;
break;
}if (++nDistances > 2) this.error (2);
var dist = this.floatParameter (i);
if (this.tokAt (i + 1) == 269484210) {
dist = -dist / 100;
i++;
}distances[distanceCount++] = dist;
break;
case 10:
case 1048577:
if (nAtomSets > 2 || isBonds && nAtomSets > 0) this.error (2);
if (haveType || isColorOrRadius) this.error (23);
atomSets[nAtomSets++] = this.atomExpressionAt (i);
isBonds = this.isBondSet;
if (nAtomSets == 2) {
var pt = this.iToken;
for (var j = i; j < pt; j++) if (this.tokAt (j) == 1073741824 && this.parameterAsString (j).equals ("_1")) {
expression2 = i;
break;
}
this.iToken = pt;
}i = this.iToken;
break;
case 1087373318:
addGroup = true;
break;
case 1766856708:
case 603979967:
case 1073742074:
isColorOrRadius = true;
translucentLevel = this.getColorTrans (i, false);
i = this.iToken;
break;
case 1074790662:
var isAuto = (this.tokAt (2) == 1073741852);
this.checkLength (isAuto ? 3 : 2);
if (!this.chk) this.viewer.setPdbConectBonding (isAuto, this.isStateScript);
return;
case 1073741830:
case 1073741852:
case 1073741904:
case 1073742025:
case 1073742026:
haveOperation = true;
if (++i != this.slen) this.error (23);
operation = this.theTok;
if (this.theTok == 1073741852 && !(bondOrder == 131071 || bondOrder == 2048 || bondOrder == 515)) this.invArg ();
break;
case 1708058:
if (!isColorOrRadius) {
this.colorArgb[0] = 0xFFFFFF;
translucentLevel = 0.5;
radius = this.viewer.getFloat (570425406);
isColorOrRadius = true;
}if (!haveOperation) operation = 1073742026;
haveOperation = true;
case 1073741824:
if (this.isColorParam (i)) {
ptColor = -i;
break;
}case 1076887572:
case 1612189718:
var cmd = this.parameterAsString (i);
if ((bo = J.script.ScriptEvaluator.getBondOrderFromString (cmd)) == 131071) {
this.invArg ();
}if (haveType) this.error (18);
haveType = true;
switch (bo) {
case 33:
switch (this.tokAt (i + 1)) {
case 3:
bo = J.script.ScriptEvaluator.getPartialBondOrderFromFloatEncodedInt (this.st[++i].intValue);
break;
case 2:
bo = this.intParameter (++i);
break;
}
break;
case 2048:
if (this.tokAt (i + 1) == 2) {
bo = (this.intParameter (++i) << 11);
energy = this.floatParameter (++i);
}break;
}
bondOrder = bo;
break;
case 1666189314:
radius = this.floatParameter (++i);
isColorOrRadius = true;
break;
case 1048587:
case 12291:
if (++i != this.slen) this.error (23);
operation = 12291;
isDelete = true;
isColorOrRadius = false;
break;
default:
ptColor = i;
break;
}
if (i > 0) {
if (ptColor == -i || ptColor == i && this.isColorParam (i)) {
isColorOrRadius = true;
this.colorArgb[0] = this.getArgbParam (i);
i = this.iToken;
} else if (ptColor == i) {
this.invArg ();
}}}
if (this.chk) return;
if (distanceCount < 2) {
if (distanceCount == 0) distances[0] = 1.0E8;
distances[1] = distances[0];
distances[0] = 0.1;
}if (isColorOrRadius) {
if (!haveType) bondOrder = 65535;
if (!haveOperation) operation = 1073742025;
}var nNew = 0;
var nModified = 0;
var result;
if (expression2 > 0) {
var bs =  new JU.BS ();
this.definedAtomSets.put ("_1", bs);
var bs0 = atomSets[0];
for (var atom1 = bs0.nextSetBit (0); atom1 >= 0; atom1 = bs0.nextSetBit (atom1 + 1)) {
bs.set (atom1);
result = this.viewer.makeConnections (distances[0], distances[1], bondOrder, operation, bs, this.atomExpressionAt (expression2), bsBonds, isBonds, false, 0);
nNew += Math.abs (result[0]);
nModified += result[1];
bs.clear (atom1);
}
} else {
result = this.viewer.makeConnections (distances[0], distances[1], bondOrder, operation, atomSets[0], atomSets[1], bsBonds, isBonds, addGroup, energy);
nNew += Math.abs (result[0]);
nModified += result[1];
}if (isDelete) {
if (!(this.tQuiet || this.scriptLevel > this.scriptReportingLevel)) this.scriptStatusOrBuffer (J.i18n.GT.i (J.i18n.GT._ ("{0} connections deleted"), nModified));
return;
}if (isColorOrRadius) {
this.viewer.selectBonds (bsBonds);
if (!Float.isNaN (radius)) this.setShapeSizeBs (1, Math.round (radius * 2000), null);
this.finalizeObject (1, this.colorArgb[0], translucentLevel, 0, false, null, 0, bsBonds);
this.viewer.selectBonds (null);
}if (!(this.tQuiet || this.scriptLevel > this.scriptReportingLevel)) this.scriptStatusOrBuffer (J.i18n.GT.o (J.i18n.GT._ ("{0} new bonds; {1} modified"), [Integer.$valueOf (nNew), Integer.$valueOf (nModified)]));
}, "~N");
$_M(c$, "getTranslucentLevel", 
function (i) {
var f = this.floatParameter (i);
return (this.theTok == 2 && f > 0 && f < 9 ? f + 1 : f);
}, "~N");
$_M(c$, "getProperty", 
function () {
if (this.chk) return;
var retValue = "";
var property = this.optParameterAsString (1);
var name = property;
if (name.indexOf (".") >= 0) name = name.substring (0, name.indexOf ("."));
if (name.indexOf ("[") >= 0) name = name.substring (0, name.indexOf ("["));
var propertyID = this.viewer.getPropertyNumber (name);
var param = "";
switch (this.tokAt (2)) {
default:
param = this.optParameterAsString (2);
break;
case 1048577:
case 10:
param = this.atomExpressionAt (2);
if (property.equalsIgnoreCase ("bondInfo")) {
switch (this.tokAt (++this.iToken)) {
case 1048577:
case 10:
param = [param, this.atomExpressionAt (this.iToken)];
break;
}
}break;
}
if (property.length > 0 && propertyID < 0) {
property = "";
param = "";
} else if (propertyID >= 0 && this.slen < 3) {
param = this.viewer.getDefaultPropertyParam (propertyID);
if (param.equals ("(visible)")) {
this.viewer.setModelVisibility ();
param = this.viewer.getVisibleSet ();
}} else if (propertyID == this.viewer.getPropertyNumber ("fileContents")) {
var s = param.toString ();
for (var i = 3; i < this.slen; i++) s += this.parameterAsString (i);

param = s;
}retValue = this.viewer.getProperty ("readable", property, param);
this.showString (retValue);
});
$_M(c$, "background", 
function (i) {
this.getToken (i);
var argb;
if (this.theTok == 1073741979) {
var file = this.parameterAsString (this.checkLast (++i));
if (!this.chk && !file.equalsIgnoreCase ("none") && file.length > 0) this.viewer.loadImage (file, null);
return;
}if (this.isColorParam (i) || this.theTok == 1048587) {
argb = this.getArgbParamLast (i, true);
if (this.chk) return;
this.setObjectArgb ("background", argb);
this.viewer.setBackgroundImage (null, null);
return;
}var iShape = this.getShapeType (this.theTok);
this.colorShape (iShape, i + 1, true);
}, "~N");
$_M(c$, "center", 
function (i) {
if (this.slen == 1) {
this.viewer.setNewRotationCenter (null);
return;
}var center = this.centerParameter (i);
if (center == null) this.invArg ();
if (!this.chk) this.viewer.setNewRotationCenter (center);
}, "~N");
$_M(c$, "setObjectProperty", 
function () {
var id = this.getShapeNameParameter (2);
if (this.chk) return "";
var iTok = this.iToken;
var tokCommand = this.tokAt (0);
return this.setObjectProp (id, tokCommand, iTok);
});
$_V(c$, "setObjectPropSafe", 
function (id, tokCommand, iTok) {
try {
return this.setObjectProp (id, tokCommand, iTok);
} catch (e) {
if (Clazz_exceptionOf (e, J.script.ScriptException)) {
return null;
} else {
throw e;
}
}
}, "~S,~N,~N");
$_M(c$, "setObjectProp", 
function (id, tokCommand, iTok) {
var data = [id, null];
var s = "";
var isWild = J.util.Txt.isWild (id);
for (var iShape = 17; ; ) {
if (iShape != 27 && this.getShapePropertyData (iShape, "checkID", data)) {
this.setShapeProperty (iShape, "thisID", id);
switch (tokCommand) {
case 12291:
this.setShapeProperty (iShape, "delete", null);
break;
case 12294:
case 1610625028:
this.setShapeProperty (iShape, "hidden", tokCommand == 1610625028 ? Boolean.FALSE : Boolean.TRUE);
break;
case 4148:
s += this.getShapeProperty (iShape, "command") + "\n";
break;
case 1766856708:
if (iTok >= 0) this.colorShape (iShape, iTok + 1, false);
break;
}
if (!isWild) break;
}if (iShape == 17) iShape = 31;
if (--iShape < 22) break;
}
return s;
}, "~S,~N,~N");
$_M(c$, "color", 
function () {
var i = 1;
if (this.isColorParam (1)) {
this.theTok = 1141899265;
} else {
var argb = 0;
i = 2;
var tok = this.getToken (1).tok;
switch (tok) {
case 1048583:
this.setObjectProperty ();
return;
case 1087373315:
case 3145730:
case 1087373316:
case 1073741946:
case 1632634891:
case 1087373318:
case 1114638362:
case 1087373322:
case 1073741992:
case 1095761936:
case 1073742030:
case 1048587:
case 1073742074:
case 1112541196:
case 1095761937:
case 1716520985:
case 1073742116:
case 1113200651:
case 1073742144:
case 1112539150:
case 1641025539:
case 1112539151:
case 1112541199:
case 603979967:
case 1073742186:
case 1649412120:
this.theTok = 1141899265;
i = 1;
break;
case 4:
i = 1;
var strColor = this.stringParameter (i++);
if (this.isArrayParameter (i)) {
strColor = strColor += "=" + J.script.SV.sValue (J.script.SV.getVariableAS (this.stringParameterSet (i))).$replace ('\n', ' ');
i = this.iToken + 1;
}var isTranslucent = (this.tokAt (i) == 603979967);
if (!this.chk) this.viewer.setPropertyColorScheme (strColor, isTranslucent, true);
if (isTranslucent) ++i;
if (this.tokAt (i) == 1073742114 || this.tokAt (i) == 1073741826) {
var min = this.floatParameter (++i);
var max = this.floatParameter (++i);
if (!this.chk) this.viewer.setCurrentColorRange (min, max);
}return;
case 1073742114:
case 1073741826:
var min = this.floatParameter (2);
var max = this.floatParameter (this.checkLast (3));
if (!this.chk) this.viewer.setCurrentColorRange (min, max);
return;
case 1610616835:
argb = this.getArgbParamLast (2, true);
if (!this.chk) this.setObjectArgb ("background", argb);
return;
case 10:
case 1048577:
i = -1;
this.theTok = 1141899265;
break;
case 1073742134:
argb = this.getArgbParamLast (2, false);
if (!this.chk) this.viewer.setRubberbandArgb (argb);
return;
case 536870920:
case 1611141171:
i = 2;
if (this.tokAt (2) == 1073742074) i++;
argb = this.getArgbParamLast (i, true);
if (this.chk) return;
this.sm.loadShape (8);
this.setShapeProperty (8, (tok == 1611141171 ? "argbSelection" : "argbHighlight"), Integer.$valueOf (argb));
return;
case 1611272194:
case 1679429641:
case 1614417948:
case 1073741824:
case 1613758476:
var str = this.parameterAsString (1);
if (this.checkToken (2)) {
switch (this.getToken (2).tok) {
case 1073742116:
argb = 1073742116;
break;
case 1048587:
case 1073741992:
argb = 1073741992;
break;
default:
argb = this.getArgbParam (2);
}
}if (argb == 0) this.error (9);
this.checkLast (this.iToken);
if (str.equalsIgnoreCase ("axes") || J.viewer.StateManager.getObjectIdFromName (str) >= 0) {
this.setObjectArgb (str, argb);
return;
}if (this.changeElementColor (str, argb)) return;
this.invArg ();
break;
case 135180:
case 135402505:
this.setShapeProperty (J.viewer.JC.shapeTokenIndex (tok), "thisID", "+PREVIOUS_MESH+");
break;
}
}this.colorShape (this.getShapeType (this.theTok), i, false);
});
$_M(c$, "changeElementColor", 
function (str, argb) {
for (var i = J.util.Elements.elementNumberMax; --i >= 0; ) {
if (str.equalsIgnoreCase (J.util.Elements.elementNameFromNumber (i))) {
if (!this.chk) this.viewer.setElementArgb (i, argb);
return true;
}}
for (var i = J.util.Elements.altElementMax; --i >= 0; ) {
if (str.equalsIgnoreCase (J.util.Elements.altElementNameFromIndex (i))) {
if (!this.chk) this.viewer.setElementArgb (J.util.Elements.altElementNumberFromIndex (i), argb);
return true;
}}
if (str.charAt (0) != '_') return false;
for (var i = J.util.Elements.elementNumberMax; --i >= 0; ) {
if (str.equalsIgnoreCase ("_" + J.util.Elements.elementSymbolFromNumber (i))) {
if (!this.chk) this.viewer.setElementArgb (i, argb);
return true;
}}
for (var i = J.util.Elements.altElementMax; --i >= 4; ) {
if (str.equalsIgnoreCase ("_" + J.util.Elements.altElementSymbolFromIndex (i))) {
if (!this.chk) this.viewer.setElementArgb (J.util.Elements.altElementNumberFromIndex (i), argb);
return true;
}if (str.equalsIgnoreCase ("_" + J.util.Elements.altIsotopeSymbolFromIndex (i))) {
if (!this.chk) this.viewer.setElementArgb (J.util.Elements.altElementNumberFromIndex (i), argb);
return true;
}}
return false;
}, "~S,~N");
$_M(c$, "colorShape", 
function (shapeType, index, isBackground) {
var translucency = null;
var colorvalue = null;
var colorvalue1 = null;
var bs = null;
var prefix = (index == 2 && this.tokAt (1) == 1073741860 ? "ball" : "");
var isColor = false;
var isIsosurface = (shapeType == 24 || shapeType == 25);
var typeMask = 0;
var doClearBondSet = false;
var translucentLevel = 3.4028235E38;
if (index < 0) {
bs = this.atomExpressionAt (-index);
index = this.iToken + 1;
if (this.isBondSet) {
doClearBondSet = true;
shapeType = 1;
}}var tok = this.getToken (index).tok;
if (isBackground) this.getToken (index);
 else if ((isBackground = (tok == 1610616835)) == true) this.getToken (++index);
if (isBackground) prefix = "bg";
 else if (isIsosurface) {
switch (this.theTok) {
case 1073742018:
this.getToken (++index);
prefix = "mesh";
break;
case 1073742094:
var argb = this.getArgbParamOrNone (++index, false);
colorvalue1 = (argb == 0 ? null : Integer.$valueOf (argb));
this.getToken (index = this.iToken + 1);
break;
case 10:
case 1048577:
if (Clazz_instanceOf (this.theToken.value, J.modelset.BondSet)) {
bs = this.theToken.value;
prefix = "vertex";
} else {
bs = this.atomExpressionAt (index);
prefix = "atom";
}this.getToken (index = this.iToken + 1);
break;
}
}if (!this.chk && shapeType == 27 && !this.getExtension ().dispatch (27, true, this.st)) return;
var isTranslucent = (this.theTok == 603979967);
if (isTranslucent || this.theTok == 1073742074) {
if (translucentLevel == 1.4E-45) this.invArg ();
translucency = this.parameterAsString (index++);
if (isTranslucent && this.isFloatParameter (index)) translucentLevel = this.getTranslucentLevel (index++);
}tok = 0;
if (index < this.slen && this.tokAt (index) != 1048589 && this.tokAt (index) != 1048588) {
isColor = true;
tok = this.getToken (index).tok;
if ((!isIsosurface || this.tokAt (index + 1) != 1074790746) && this.isColorParam (index)) {
var argb = this.getArgbParamOrNone (index, false);
colorvalue = (argb == 0 ? null : Integer.$valueOf (argb));
if (translucency == null && this.tokAt (index = this.iToken + 1) != 0) {
this.getToken (index);
isTranslucent = (this.theTok == 603979967);
if (isTranslucent || this.theTok == 1073742074) {
translucency = this.parameterAsString (index);
if (isTranslucent && this.isFloatParameter (index + 1)) translucentLevel = this.getTranslucentLevel (++index);
} else if (this.isColorParam (index)) {
argb = this.getArgbParamOrNone (index, false);
colorvalue1 = (argb == 0 ? null : Integer.$valueOf (argb));
}}} else if (shapeType == 26) {
this.iToken--;
} else {
var name = this.parameterAsString (index).toLowerCase ();
var isByElement = (name.indexOf ("byelement") == 0);
var isColorIndex = (isByElement || name.indexOf ("byresidue") == 0);
var pal = (isColorIndex || isIsosurface ? J.constant.EnumPalette.PROPERTY : tok == 1113200651 ? J.constant.EnumPalette.CPK : J.constant.EnumPalette.getPalette (name));
if (pal === J.constant.EnumPalette.UNKNOWN || (pal === J.constant.EnumPalette.TYPE || pal === J.constant.EnumPalette.ENERGY) && shapeType != 2) this.invArg ();
var data = null;
var bsSelected = (pal !== J.constant.EnumPalette.PROPERTY && pal !== J.constant.EnumPalette.VARIABLE || !this.viewer.global.rangeSelected ? null : this.viewer.getSelectionSet (false));
if (pal === J.constant.EnumPalette.PROPERTY) {
if (isColorIndex) {
if (!this.chk) {
data = this.getBitsetPropertyFloat (bsSelected, (isByElement ? 1095763978 : 1095761932) | 256, NaN, NaN);
}} else {
if (!isColorIndex && !isIsosurface) index++;
if (name.equals ("property") && J.script.T.tokAttr ((tok = this.getToken (index).tok), 1078984704) && !J.script.T.tokAttr (tok, 1087373312)) {
if (!this.chk) {
data = this.getBitsetPropertyFloat (bsSelected, this.getToken (index++).tok | 256, NaN, NaN);
}}}} else if (pal === J.constant.EnumPalette.VARIABLE) {
index++;
name = this.parameterAsString (index++);
data =  Clazz_newFloatArray (this.viewer.getAtomCount (), 0);
J.util.Parser.parseStringInfestedFloatArray ("" + this.getParameter (name, 4), null, data);
pal = J.constant.EnumPalette.PROPERTY;
}if (pal === J.constant.EnumPalette.PROPERTY) {
var scheme = null;
if (this.tokAt (index) == 4) {
scheme = this.parameterAsString (index++).toLowerCase ();
if (this.isArrayParameter (index)) {
scheme += "=" + J.script.SV.sValue (J.script.SV.getVariableAS (this.stringParameterSet (index))).$replace ('\n', ' ');
index = this.iToken + 1;
}} else if (isIsosurface && this.isColorParam (index)) {
scheme = this.getColorRange (index);
index = this.iToken + 1;
}if (scheme != null && !isIsosurface) {
this.setStringProperty ("propertyColorScheme", (isTranslucent && translucentLevel == 3.4028235E38 ? "translucent " : "") + scheme);
isColorIndex = (scheme.indexOf ("byelement") == 0 || scheme.indexOf ("byresidue") == 0);
}var min = 0;
var max = 3.4028235E38;
if (!isColorIndex && (this.tokAt (index) == 1073741826 || this.tokAt (index) == 1073742114)) {
min = this.floatParameter (index + 1);
max = this.floatParameter (index + 2);
index += 3;
if (min == max && isIsosurface) {
var range = this.getShapeProperty (shapeType, "dataRange");
if (range != null) {
min = range[0];
max = range[1];
}} else if (min == max) {
max = 3.4028235E38;
}}if (!this.chk) {
if (isIsosurface) {
} else if (data == null) {
this.viewer.setCurrentColorRange (name);
} else {
this.viewer.setCurrentColorRangeData (data, bsSelected);
}if (isIsosurface) {
this.checkLength (index);
isColor = false;
var ce = this.viewer.getColorEncoder (scheme);
if (ce == null) return;
ce.isTranslucent = (isTranslucent && translucentLevel == 3.4028235E38);
ce.setRange (min, max, min > max);
if (max == 3.4028235E38) ce.hi = max;
this.setShapeProperty (shapeType, "remapColor", ce);
this.showString (this.getIsosurfaceDataRange (shapeType, ""));
if (translucentLevel == 3.4028235E38) return;
} else if (max != 3.4028235E38) {
this.viewer.setCurrentColorRange (min, max);
}}} else {
index++;
}this.checkLength (index);
colorvalue = pal;
}}if (this.chk || shapeType < 0) return;
switch (shapeType) {
case 4:
typeMask = 32768;
break;
case 2:
typeMask = 30720;
break;
case 3:
typeMask = 256;
break;
case 1:
typeMask = 1023;
break;
default:
typeMask = 0;
}
if (typeMask == 0) {
this.sm.loadShape (shapeType);
if (shapeType == 5) this.setShapeProperty (5, "setDefaults", this.viewer.getNoneSelected ());
} else {
if (bs != null) {
this.viewer.selectBonds (bs);
bs = null;
}shapeType = 1;
this.setShapeProperty (shapeType, "type", Integer.$valueOf (typeMask));
}if (isColor) {
switch (tok) {
case 1112539151:
case 1112539150:
this.viewer.autoCalculate (tok);
break;
case 1112541199:
if (this.viewer.global.rangeSelected) this.viewer.clearBfactorRange ();
break;
case 1087373318:
this.viewer.calcSelectedGroupsCount ();
break;
case 1095761937:
case 1073742030:
this.viewer.calcSelectedMonomersCount ();
break;
case 1095761936:
this.viewer.calcSelectedMoleculesCount ();
break;
}
if (colorvalue1 != null && (isIsosurface || shapeType == 11 || shapeType == 14)) this.setShapeProperty (shapeType, "colorPhase", [colorvalue1, colorvalue]);
 else if (bs == null) this.setShapeProperty (shapeType, prefix + "color", colorvalue);
 else this.setShapePropertyBs (shapeType, prefix + "color", colorvalue, bs);
}if (translucency != null) this.setShapeTranslucency (shapeType, prefix, translucency, translucentLevel, bs);
if (typeMask != 0) this.setShapeProperty (1, "type", Integer.$valueOf (1023));
if (doClearBondSet) this.viewer.selectBonds (null);
if (shapeType == 0) this.viewer.checkInheritedShapes ();
}, "~N,~N,~B");
$_M(c$, "setShapeTranslucency", 
function (shapeType, prefix, translucency, translucentLevel, bs) {
if (translucentLevel == 3.4028235E38) translucentLevel = this.viewer.getFloat (570425354);
this.setShapeProperty (shapeType, "translucentLevel", Float.$valueOf (translucentLevel));
if (prefix == null) return;
if (bs == null) this.setShapeProperty (shapeType, prefix + "translucency", translucency);
 else if (!this.chk) this.setShapePropertyBs (shapeType, prefix + "translucency", translucency, bs);
}, "~N,~S,~S,~N,JU.BS");
$_M(c$, "cd", 
function () {
if (this.chk) return;
var dir = (this.slen == 1 ? null : this.parameterAsString (1));
this.showString (this.viewer.cd (dir));
});
$_M(c$, "define", 
function () {
if (this.slen < 3 || !(Clazz_instanceOf (this.getToken (1).value, String))) this.invArg ();
var setName = (this.getToken (1).value).toLowerCase ();
if (JU.PT.parseInt (setName) != -2147483648) this.invArg ();
if (this.chk) return;
var isSite = setName.startsWith ("site_");
var isDynamic = (setName.indexOf ("dynamic_") == 0);
if (isDynamic || isSite) {
var code =  new Array (this.slen);
for (var i = this.slen; --i >= 0; ) code[i] = this.st[i];

this.definedAtomSets.put ("!" + (isSite ? setName : setName.substring (8)), code);
} else {
var bs = this.atomExpressionAt (2);
this.definedAtomSets.put (setName, bs);
if (!this.chk) this.viewer.setUserVariable ("@" + setName, J.script.SV.newV (10, bs));
}});
$_M(c$, "echo", 
function (index, id, isImage) {
if (this.chk) return;
var text = this.optParameterAsString (index);
if (this.viewer.getEchoStateActive ()) {
if (isImage) {
this.viewer.loadImage (text, id);
return;
} else if (text.startsWith ("\1")) {
text = text.substring (1);
isImage = true;
}if (text != null) this.setShapeProperty (30, "text", text);
}if (!isImage && this.viewer.getRefreshing ()) this.showString (this.viewer.formatText (text));
}, "~N,~S,~B");
$_M(c$, "message", 
function () {
var text = this.parameterAsString (this.checkLast (1));
if (this.chk) return;
var s = this.viewer.formatText (text);
if (this.outputBuffer == null) this.viewer.showMessage (s);
if (!s.startsWith ("_")) this.scriptStatusOrBuffer (s);
});
$_M(c$, "log", 
function () {
if (this.slen == 1) this.error (2);
if (this.chk) return;
var s = this.parameterExpressionString (1, 0);
if (this.tokAt (1) == 1048588) this.setStringProperty ("logFile", "");
 else this.viewer.log (s);
});
$_M(c$, "label", 
function (index) {
if (this.chk) return;
this.sm.loadShape (5);
var strLabel = null;
switch (this.getToken (index).tok) {
case 1048589:
strLabel = this.viewer.getStandardLabelFormat (0);
break;
case 1048588:
break;
case 12294:
case 1610625028:
this.setShapeProperty (5, "display", this.theTok == 1610625028 ? Boolean.TRUE : Boolean.FALSE);
return;
default:
strLabel = this.parameterAsString (index);
}
this.sm.setLabel (strLabel, this.viewer.getSelectionSet (false));
}, "~N");
$_M(c$, "hover", 
function () {
if (this.chk) return;
var strLabel = this.parameterAsString (1);
if (strLabel.equalsIgnoreCase ("on")) strLabel = "%U";
 else if (strLabel.equalsIgnoreCase ("off")) strLabel = null;
this.viewer.setHoverLabel (strLabel);
});
$_M(c$, "load", 
function () {
var doLoadFiles = (!this.chk || this.isCmdLine_C_Option);
var isAppend = false;
var isInline = false;
var isSmiles = false;
var isData = false;
var bsModels;
var i = (this.tokAt (0) == 135270407 ? 0 : 1);
var appendNew = this.viewer.getBoolean (603979792);
var filter = null;
var firstLastSteps = null;
var modelCount0 = this.viewer.getModelCount () - (this.viewer.getFileName ().equals ("zapped") ? 1 : 0);
var atomCount0 = this.viewer.getAtomCount ();
var loadScript =  new JU.SB ().append ("load");
var nFiles = 1;
var htParams =  new java.util.Hashtable ();
if (this.isStateScript) {
htParams.put ("isStateScript", Boolean.TRUE);
if (this.forceNoAddHydrogens) htParams.put ("doNotAddHydrogens", Boolean.TRUE);
}var modelName = null;
var filenames = null;
var tempFileInfo = null;
var errMsg = null;
var sOptions = "";
var tokType = 0;
var tok;
if (this.slen == 1) {
i = 0;
} else {
modelName = this.parameterAsString (i);
if (this.slen == 2 && !this.chk) {
if (modelName.endsWith (".spt") || modelName.endsWith (".png") || modelName.endsWith (".pngj")) {
this.script (0, modelName, null);
return;
}}switch (tok = this.tokAt (i)) {
case 1073742015:
var m = this.parameterAsString (this.checkLast (2));
if (!this.chk) this.viewer.setMenu (m, true);
return;
case 135270407:
isData = true;
loadScript.append (" /*data*/ data");
var key = this.stringParameter (++i).toLowerCase ();
loadScript.append (" ").append (J.util.Escape.eS (key));
isAppend = key.startsWith ("append");
var strModel = (key.indexOf ("@") >= 0 ? "" + this.getParameter (key.substring (key.indexOf ("@") + 1), 4) : this.parameterAsString (++i));
strModel = J.viewer.Viewer.fixInlineString (strModel, this.viewer.getInlineChar ());
htParams.put ("fileData", strModel);
htParams.put ("isData", Boolean.TRUE);
loadScript.appendC ('\n');
loadScript.append (strModel);
if (key.indexOf ("@") < 0) {
loadScript.append (" end ").append (J.util.Escape.eS (key));
i += 2;
}break;
case 1073741839:
isAppend = true;
loadScript.append (" append");
modelName = this.optParameterAsString (++i);
tok = J.script.T.getTokFromName (modelName);
break;
case 1073741824:
i++;
loadScript.append (" " + modelName);
tokType = (tok == 1073741824 && JU.PT.isOneOf (modelName.toLowerCase (), ";xyz;vxyz;vibration;temperature;occupancy;partialcharge;") ? J.script.T.getTokFromName (modelName) : 0);
if (tokType != 0) {
htParams.put ("atomDataOnly", Boolean.TRUE);
htParams.put ("modelNumber", Integer.$valueOf (1));
if (tokType == 4166) tokType = 1146095631;
tempFileInfo = this.viewer.getFileInfo ();
isAppend = true;
}}
switch (tok) {
case 1229984263:
i++;
loadScript.append (" " + modelName);
if (this.tokAt (i) == 7) {
filenames = this.stringParameterSet (i);
i = this.iToken;
if (i + 1 != this.slen) this.invArg ();
if (filenames != null) nFiles = filenames.length;
}break;
case 1073741983:
isInline = true;
i++;
loadScript.append (" " + modelName);
break;
case 135267336:
isSmiles = true;
i++;
break;
case 4156:
htParams.put ("async", Boolean.TRUE);
i++;
break;
case 536870926:
case 1095766030:
i++;
loadScript.append (" " + modelName);
if (tok == 536870926) htParams.put ("isTrajectory", Boolean.TRUE);
if (this.isPoint3f (i)) {
var pt = this.getPoint3f (i, false);
i = this.iToken + 1;
htParams.put ("firstLastStep", [Clazz_floatToInt (pt.x), Clazz_floatToInt (pt.y), Clazz_floatToInt (pt.z)]);
loadScript.append (" " + J.util.Escape.eP (pt));
} else if (this.tokAt (i) == 10) {
bsModels = this.getToken (i++).value;
htParams.put ("bsModels", bsModels);
loadScript.append (" " + J.util.Escape.eBS (bsModels));
} else {
htParams.put ("firstLastStep", [0, -1, 1]);
}break;
case 1073741824:
break;
default:
modelName = "fileset";
}
if (filenames == null && this.getToken (i).tok != 4) this.error (16);
}var filePt = i;
var localName = null;
if (this.tokAt (filePt + 1) == 1073741848) {
localName = this.stringParameter (i = i + 2);
if (this.viewer.getPathForAllFiles () !== "") {
localName = null;
filePt = i;
}}var filename = null;
var appendedData = null;
var appendedKey = null;
if (this.slen == i + 1) {
if (i == 0 || filenames == null && (filename = this.parameterAsString (filePt)).length == 0) filename = this.viewer.getFullPathName ();
if (filename == null && filenames == null) {
this.zap (false);
return;
}if (filenames == null && !isInline) {
if (isSmiles) {
filename = "$" + filename;
} else {
if (filename.indexOf ("[]") >= 0) return;
if (filename.indexOf ("[") == 0) {
filenames = J.util.Escape.unescapeStringArray (filename);
if (filenames != null) {
if (i == 1) loadScript.append (" files");
nFiles = filenames.length;
}}}}if (filenames != null) for (var j = 0; j < nFiles; j++) loadScript.append (" /*file*/").append (J.util.Escape.eS (filenames[j]));

} else if (this.getToken (i + 1).tok == 1073742010 || this.theTok == 2 || this.theTok == 7 || this.theTok == 269484096 || this.theTok == 1073742195 || this.theTok == 1048586 || this.theTok == 8 || this.theTok == 1073742080 || this.theTok == 1095761926 || this.theTok == 1073742163 || this.theTok == 1073742114 || this.theTok == 1073742152 || this.theTok == 1614417948 || this.theTok == 1073742066 || this.theTok == 1073741940 && this.tokAt (i + 3) != 1048582 || this.theTok == 1073741839 || this.theTok == 1073741824 && this.tokAt (i + 3) != 1048582) {
if ((filename = this.parameterAsString (filePt)).length == 0 && (filename = this.viewer.getFullPathName ()) == null) {
this.zap (false);
return;
}if (filePt == i) i++;
if (filename.indexOf ("[]") >= 0) return;
if ((tok = this.tokAt (i)) == 1073742010) {
var manifest = this.stringParameter (++i);
htParams.put ("manifest", manifest);
sOptions += " MANIFEST " + J.util.Escape.eS (manifest);
tok = this.tokAt (++i);
}switch (tok) {
case 2:
var n = this.intParameter (i);
sOptions += " " + n;
if (n < 0) htParams.put ("vibrationNumber", Integer.$valueOf (-n));
 else htParams.put ("modelNumber", Integer.$valueOf (n));
tok = this.tokAt (++i);
break;
case 7:
case 269484096:
case 1073742195:
var data = this.floatParameterSet (i, 1, 2147483647);
i = this.iToken;
var bs =  new JU.BS ();
for (var j = 0; j < data.length; j++) if (data[j] >= 1 && data[j] == Clazz_floatToInt (data[j])) bs.set (Clazz_floatToInt (data[j]) - 1);

htParams.put ("bsModels", bs);
var iArray =  Clazz_newIntArray (bs.cardinality (), 0);
for (var pt = 0, j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) iArray[pt++] = j + 1;

sOptions += " " + J.util.Escape.eAI (iArray);
tok = this.tokAt (i);
break;
}
var lattice = null;
if (tok == 1048586 || tok == 8) {
lattice = this.getPoint3f (i, false);
i = this.iToken + 1;
tok = this.tokAt (i);
}switch (tok) {
case 1073742080:
case 1095761926:
case 1073742163:
case 1073742114:
case 1073742152:
case 1614417948:
if (lattice == null) lattice = JU.P3.new3 (555, 555, -1);
this.iToken = i - 1;
}
var offset = null;
if (lattice != null) {
htParams.put ("lattice", lattice);
i = this.iToken + 1;
sOptions += " {" + Clazz_floatToInt (lattice.x) + " " + Clazz_floatToInt (lattice.y) + " " + Clazz_floatToInt (lattice.z) + "}";
if (this.tokAt (i) == 1073742080) {
htParams.put ("packed", Boolean.TRUE);
sOptions += " PACKED";
i++;
}if (this.tokAt (i) == 1095761926) {
htParams.put ("centroid", Boolean.TRUE);
sOptions += " CENTROID";
i++;
if (this.tokAt (i) == 1073742080 && !htParams.containsKey ("packed")) {
htParams.put ("packed", Boolean.TRUE);
sOptions += " PACKED";
i++;
}}if (this.tokAt (i) == 1073742163) {
var supercell;
if (this.isPoint3f (++i)) {
var pt = this.getPoint3f (i, false);
if (pt.x != Clazz_floatToInt (pt.x) || pt.y != Clazz_floatToInt (pt.y) || pt.z != Clazz_floatToInt (pt.z) || pt.x < 1 || pt.y < 1 || pt.z < 1) {
this.iToken = i;
this.invArg ();
}supercell = pt;
i = this.iToken + 1;
} else {
supercell = this.stringParameter (i++);
}htParams.put ("supercell", supercell);
}var distance = 0;
if (this.tokAt (i) == 1073742114) {
i++;
distance = this.floatParameter (i++);
sOptions += " range " + distance;
}htParams.put ("symmetryRange", Float.$valueOf (distance));
var spacegroup = null;
var sg;
var iGroup = -2147483648;
if (this.tokAt (i) == 1073742152) {
++i;
spacegroup = JU.PT.simpleReplace (this.parameterAsString (i++), "''", "\"");
sOptions += " spacegroup " + J.util.Escape.eS (spacegroup);
if (spacegroup.equalsIgnoreCase ("ignoreOperators")) {
iGroup = -999;
} else {
if (spacegroup.length == 0) {
sg = this.viewer.getCurrentUnitCell ();
if (sg != null) spacegroup = sg.getSpaceGroupName ();
} else {
if (spacegroup.indexOf (",") >= 0) if ((lattice.x < 9 && lattice.y < 9 && lattice.z == 0)) spacegroup += "#doNormalize=0";
}htParams.put ("spaceGroupName", spacegroup);
iGroup = -2;
}}var fparams = null;
if (this.tokAt (i) == 1614417948) {
++i;
if (this.optParameterAsString (i).length == 0) {
sg = this.viewer.getCurrentUnitCell ();
if (sg != null) {
fparams = sg.getUnitCellAsArray (true);
offset = sg.getCartesianOffset ();
}} else {
fparams = this.floatParameterSet (i, 6, 9);
}if (fparams == null || fparams.length != 6 && fparams.length != 9) this.invArg ();
sOptions += " unitcell {";
for (var j = 0; j < fparams.length; j++) sOptions += (j == 0 ? "" : " ") + fparams[j];

sOptions += "}";
htParams.put ("unitcell", fparams);
if (iGroup == -2147483648) iGroup = -1;
i = this.iToken + 1;
}if (iGroup != -2147483648) htParams.put ("spaceGroupIndex", Integer.$valueOf (iGroup));
}if (offset != null) this.coordinatesAreFractional = false;
 else if (this.tokAt (i) == 1073742066) offset = this.getPoint3f (++i, true);
if (offset != null) {
if (this.coordinatesAreFractional) {
offset.setT (this.fractionalPoint);
htParams.put ("unitCellOffsetFractional", (this.coordinatesAreFractional ? Boolean.TRUE : Boolean.FALSE));
sOptions += " offset {" + offset.x + " " + offset.y + " " + offset.z + "/1}";
} else {
sOptions += " offset " + J.util.Escape.eP (offset);
}htParams.put ("unitCellOffset", offset);
i = this.iToken + 1;
}if (this.tokAt (i) == 1073741839) {
if (this.tokAt (++i) == 135270407) {
i += 2;
appendedData = this.getToken (i++).value;
appendedKey = this.stringParameter (++i);
++i;
} else {
appendedKey = this.stringParameter (i++);
appendedData = this.stringParameter (i++);
}htParams.put (appendedKey, appendedData);
}if (this.tokAt (i) == 1073741940) filter = this.stringParameter (++i);
} else {
if (i == 1) {
i++;
loadScript.append (" " + modelName);
}var pt = null;
var bs = null;
var fNames =  new JU.List ();
while (i < this.slen) {
switch (this.tokAt (i)) {
case 1073741940:
filter = this.stringParameter (++i);
++i;
continue;
case 1048582:
htParams.remove ("isTrajectory");
if (firstLastSteps == null) {
firstLastSteps =  new JU.List ();
pt = JU.P3.new3 (0, -1, 1);
}if (this.isPoint3f (++i)) {
pt = this.getPoint3f (i, false);
i = this.iToken + 1;
} else if (this.tokAt (i) == 10) {
bs = this.getToken (i).value;
pt = null;
i = this.iToken + 1;
}break;
case 1073741824:
this.invArg ();
}
fNames.addLast (filename = this.parameterAsString (i++));
if (pt != null) {
firstLastSteps.addLast ([Clazz_floatToInt (pt.x), Clazz_floatToInt (pt.y), Clazz_floatToInt (pt.z)]);
loadScript.append (" COORD " + J.util.Escape.eP (pt));
} else if (bs != null) {
firstLastSteps.addLast (bs);
loadScript.append (" COORD " + J.util.Escape.eBS (bs));
}loadScript.append (" /*file*/$FILENAME" + fNames.size () + "$");
}
if (firstLastSteps != null) {
htParams.put ("firstLastSteps", firstLastSteps);
}nFiles = fNames.size ();
filenames = fNames.toArray ( new Array (nFiles));
}if (!doLoadFiles) return;
if (filenames != null) filename = "fileSet";
if (appendedData != null) {
sOptions += " APPEND data \"" + appendedKey + "\"\n" + appendedData + (appendedData.endsWith ("\n") ? "" : "\n") + "end \"" + appendedKey + "\"";
}if (filter == null) filter = this.viewer.getDefaultLoadFilter ();
if (filter.length > 0) {
if (filter.toUpperCase ().indexOf ("DOCACHE") >= 0) {
if (!this.isStateScript && !isAppend) this.viewer.cacheClear ();
}htParams.put ("filter", filter);
if (filter.equalsIgnoreCase ("2d")) filter = "2D-noMin";
sOptions += " FILTER " + J.util.Escape.eS (filter);
}var isVariable = false;
if (filenames == null) {
if (isInline) {
htParams.put ("fileData", filename);
} else if (filename.startsWith ("@") && filename.length > 1) {
isVariable = true;
var s = this.getStringParameter (filename.substring (1), false);
htParams.put ("fileData", s);
loadScript =  new JU.SB ().append ("{\n    var ").append (filename.substring (1)).append (" = ").append (J.util.Escape.eS (s)).append (";\n    ").appendSB (loadScript);
} else if (filename.startsWith ("?") && this.viewer.isJS) {
localName = null;
filename = this.loadFileAsync ("LOAD" + (isAppend ? "_APPEND_" : "_"), filename, i, !isAppend);
}}var out = null;
if (localName != null) {
if (localName.equals (".")) localName = this.viewer.getFilePath (filename, true);
if (localName.length == 0 || this.viewer.getFilePath (localName, false).equalsIgnoreCase (this.viewer.getFilePath (filename, false))) this.invArg ();
var fullPath = [localName];
out = this.viewer.getOutputChannel (localName, fullPath);
if (out == null) J.util.Logger.error ("Could not create output stream for " + fullPath[0]);
 else htParams.put ("outputChannel", out);
}if (filenames == null && tokType == 0) {
loadScript.append (" ");
if (isVariable || isInline) {
loadScript.append (J.util.Escape.eS (filename));
} else if (!isData) {
if (!filename.equals ("string") && !filename.equals ("string[]")) loadScript.append ("/*file*/");
if (localName != null) localName = this.viewer.getFilePath (localName, false);
loadScript.append ((localName != null ? J.util.Escape.eS (localName) : "$FILENAME$"));
}if (sOptions.length > 0) loadScript.append (" /*options*/ ").append (sOptions);
if (isVariable) loadScript.append ("\n  }");
htParams.put ("loadScript", loadScript);
}this.setCursorWait (true);
var timeMsg = this.viewer.getBoolean (603979934);
if (timeMsg) J.util.Logger.startTimer ("load");
errMsg = this.viewer.loadModelFromFile (null, filename, filenames, null, isAppend, htParams, loadScript, tokType);
if (out != null) {
this.viewer.setFileInfo ([localName, localName, localName]);
J.util.Logger.info (J.i18n.GT.o (J.i18n.GT._ ("file {0} created"), localName));
this.showString (this.viewer.getFilePath (localName, false) + " created");
out.closeChannel ();
}if (tokType > 0) {
this.viewer.setFileInfo (tempFileInfo);
if (errMsg != null && !this.isCmdLine_c_or_C_Option) this.evalError (errMsg, null);
return;
}if (errMsg != null && !this.isCmdLine_c_or_C_Option) {
if (errMsg.indexOf ("NOTE: file recognized as a script file: ") == 0) {
filename = errMsg.substring ("NOTE: file recognized as a script file: ".length).trim ();
this.script (0, filename, null);
return;
}this.evalError (errMsg, null);
}if (isAppend && (appendNew || nFiles > 1)) {
this.viewer.setAnimationRange (-1, -1);
this.viewer.setCurrentModelIndex (modelCount0);
}if (this.scriptLevel == 0 && !isAppend && nFiles < 2) this.showString (this.viewer.getModelSetAuxiliaryInfoValue ("modelLoadNote"));
if (this.logMessages) this.scriptStatusOrBuffer ("Successfully loaded:" + (filenames == null ? htParams.get ("fullPathName") : modelName));
var info = this.viewer.getModelSetAuxiliaryInfo ();
if (info != null && info.containsKey ("centroidMinMax") && this.viewer.getAtomCount () > 0) {
var bs = J.util.BSUtil.newBitSet2 (isAppend ? atomCount0 : 0, this.viewer.getAtomCount ());
this.viewer.setCentroid (bs, info.get ("centroidMinMax"));
}var script = this.viewer.getDefaultLoadScript ();
var msg = "";
if (script.length > 0) msg += "\nUsing defaultLoadScript: " + script;
if (info != null && this.viewer.allowEmbeddedScripts ()) {
var embeddedScript = info.remove ("jmolscript");
if (embeddedScript != null && embeddedScript.length > 0) {
msg += "\nAdding embedded #jmolscript: " + embeddedScript;
script += ";" + embeddedScript;
this.setStringProperty ("_loadScript", script);
script = "allowEmbeddedScripts = false;try{" + script + "} allowEmbeddedScripts = true;";
}} else {
this.setStringProperty ("_loadScript", "");
}this.logLoadInfo (msg);
var siteScript = (info == null ? null : info.remove ("sitescript"));
if (siteScript != null) script = siteScript + ";" + script;
if (script.length > 0 && !this.isCmdLine_c_or_C_Option) this.runScript (script);
if (timeMsg) this.showString (J.util.Logger.getTimerMsg ("load", 0));
});
$_M(c$, "loadFileAsync", 
function (prefix, filename, i, doClear) {
prefix = "cache://local" + prefix;
var key = this.pc + "_" + i;
var cacheName;
if (this.thisContext == null || this.thisContext.htFileCache == null) {
this.pushContext (null, "loadFileAsync");
this.thisContext.htFileCache =  new java.util.Hashtable ();
}cacheName = this.thisContext.htFileCache.get (key);
if (cacheName != null && cacheName.length > 0) {
this.fileLoadThread = null;
this.popContext (false, false);
this.viewer.queueOnHold = false;
if ("#CANCELED#".equals (this.viewer.cacheGet (cacheName))) this.evalError ("#CANCELED#", null);
return cacheName;
}this.thisContext.htFileCache.put (key, cacheName = prefix + System.currentTimeMillis ());
if (this.fileLoadThread != null) this.evalError ("#CANCELED#", null);
if (doClear) this.viewer.cacheFileByName (prefix + "*", false);
this.fileLoadThread =  new J.script.FileLoadThread (this, this.viewer, filename, key, cacheName);
this.fileLoadThread.run ();
throw  new J.script.ScriptInterruption (this, "load", 1);
}, "~S,~S,~N,~B");
$_M(c$, "logLoadInfo", 
function (msg) {
if (msg.length > 0) J.util.Logger.info (msg);
var sb =  new JU.SB ();
var modelCount = this.viewer.getModelCount ();
if (modelCount > 1) sb.append ((this.viewer.isMovie () ? this.viewer.getFrameCount () + " frames" : modelCount + " models") + "\n");
for (var i = 0; i < modelCount; i++) {
var moData = this.viewer.getModelAuxiliaryInfoValue (i, "moData");
if (moData == null) continue;
sb.appendI ((moData.get ("mos")).size ()).append (" molecular orbitals in model ").append (this.viewer.getModelNumberDotted (i)).append ("\n");
}
if (sb.length () > 0) this.showString (sb.toString ());
}, "~S");
$_M(c$, "getFullPathName", 
function () {
var filename = (!this.chk || this.isCmdLine_C_Option ? this.viewer.getFullPathName () : "test.xyz");
if (filename == null) this.invArg ();
return filename;
});
$_M(c$, "pause", 
function () {
if (this.chk || this.isJS && !this.allowJSThreads) return false;
var msg = this.optParameterAsString (1);
if (!this.viewer.getBooleanProperty ("_useCommandThread")) {
}if (this.viewer.autoExit || !this.viewer.haveDisplay && !this.viewer.isWebGL) return false;
if (this.scriptLevel == 0 && this.pc == this.aatoken.length - 1) {
this.viewer.scriptStatus ("nothing to pause: " + msg);
return false;
}msg = (msg.length == 0 ? ": RESUME to continue." : ": " + this.viewer.formatText (msg));
this.pauseExecution (true);
this.viewer.scriptStatusMsg ("script execution paused" + msg, "script paused for RESUME");
return true;
});
$_M(c$, "print", 
function () {
if (this.slen == 1) this.error (2);
this.showStringPrint (this.parameterExpressionString (1, 0), true);
});
$_M(c$, "prompt", 
function () {
var msg = null;
if (this.slen == 1) {
if (!this.chk) msg = J.script.ScriptEvaluator.getContextTrace (this.viewer, this.getScriptContext ("prompt"), null, true).toString ();
} else {
msg = this.parameterExpressionString (1, 0);
}if (!this.chk) this.viewer.prompt (msg, "OK", null, true);
});
$_M(c$, "refresh", 
function () {
if (this.chk) return;
this.viewer.setTainted (true);
this.viewer.requestRepaintAndWait ("refresh cmd");
});
$_M(c$, "reset", 
function () {
if (this.slen == 3 && this.tokAt (1) == 135368713) {
if (!this.chk) this.viewer.removeFunction (this.stringParameter (2));
return;
}this.checkLength (-2);
if (this.chk) return;
if (this.slen == 1) {
this.viewer.reset (false);
return;
}switch (this.tokAt (1)) {
case 135270423:
this.viewer.cacheClear ();
return;
case 1073741935:
this.viewer.resetError ();
return;
case 1087373323:
this.viewer.resetShapes (true);
return;
case 135368713:
this.viewer.clearFunctions ();
return;
case 1641025539:
var bsAllAtoms =  new JU.BS ();
this.runScript (this.viewer.getDefaultStructure (null, bsAllAtoms));
this.viewer.resetBioshapes (bsAllAtoms);
return;
case 1649412120:
this.viewer.setData ("element_vdw", [null, ""], 0, 0, 0, 0, 0);
return;
case 1076887572:
this.viewer.resetAromatic ();
return;
case 1611141175:
this.viewer.reset (true);
return;
}
var $var = this.parameterAsString (1);
if ($var.charAt (0) == '_') this.invArg ();
this.viewer.unsetProperty ($var);
});
$_M(c$, "restrict", 
function () {
var isBond = (this.tokAt (1) == 1678770178);
this.select (isBond ? 2 : 1);
this.restrictSelected (isBond, true);
});
$_M(c$, "restrictSelected", 
function (isBond, doInvert) {
if (!this.chk) this.sm.restrictSelected (isBond, doInvert);
}, "~B,~B");
$_M(c$, "rotate", 
function (isSpin, isSelected) {
if (this.slen == 2) switch (this.getToken (1).tok) {
case 1048589:
if (!this.chk) this.viewer.setSpinOn (true);
return;
case 1048588:
if (!this.chk) this.viewer.setSpinOn (false);
return;
}
var bsAtoms = null;
var degreesPerSecond = 1.4E-45;
var nPoints = 0;
var endDegrees = 3.4028235E38;
var isMolecular = false;
var haveRotation = false;
var dihedralList = null;
var ptsA = null;
var points =  new Array (2);
var rotAxis = JU.V3.new3 (0, 1, 0);
var translation = null;
var m4 = null;
var m3 = null;
var direction = 1;
var tok;
var q = null;
var helicalPath = false;
var ptsB = null;
var bsCompare = null;
var invPoint = null;
var invPlane = null;
var axesOrientationRasmol = this.viewer.getBoolean (603979806);
for (var i = 1; i < this.slen; ++i) {
switch (tok = this.getToken (i).tok) {
case 10:
case 1048577:
case 1048586:
case 8:
case 1048583:
if (tok == 10 || tok == 1048577) {
if (translation != null || q != null || nPoints == 2) {
bsAtoms = this.atomExpressionAt (i);
ptsB = null;
isSelected = true;
break;
}}haveRotation = true;
if (nPoints == 2) nPoints = 0;
var pt1 = this.centerParameterForModel (i, this.viewer.getCurrentModelIndex ());
if (!this.chk && tok == 1048583 && this.tokAt (i + 2) != 269484096) {
isMolecular = true;
rotAxis = this.getDrawObjectAxis (this.objectNameParameter (++i), this.viewer.getCurrentModelIndex ());
}points[nPoints++] = pt1;
break;
case 1611141175:
isSpin = true;
continue;
case 1073741988:
case 1073742029:
isMolecular = true;
continue;
case 1114638363:
isSelected = true;
break;
case 269484080:
continue;
case 2:
case 3:
if (isSpin) {
if (degreesPerSecond == 1.4E-45) {
degreesPerSecond = this.floatParameter (i);
continue;
} else if (endDegrees == 3.4028235E38) {
endDegrees = degreesPerSecond;
degreesPerSecond = this.floatParameter (i);
continue;
}} else {
if (endDegrees == 3.4028235E38) {
endDegrees = this.floatParameter (i);
continue;
} else if (degreesPerSecond == 1.4E-45) {
degreesPerSecond = this.floatParameter (i);
isSpin = true;
continue;
}}this.invArg ();
break;
case 269484192:
direction = -1;
continue;
case 1112541205:
haveRotation = true;
rotAxis.set (direction, 0, 0);
continue;
case 1112541206:
haveRotation = true;
rotAxis.set (0, direction, 0);
continue;
case 1112541207:
haveRotation = true;
rotAxis.set (0, 0, (axesOrientationRasmol && !isMolecular ? -direction : direction));
continue;
case 9:
case 135270418:
case 1073741863:
if (tok == 135270418) i++;
haveRotation = true;
q = this.getQuaternionParameter (i);
if (q != null) {
if (tok == 1073741863 && !(isMolecular = isSelected)) q = q.mulQ (this.viewer.getRotationQuaternion ().mul (-1));
rotAxis.setT (q.getNormal ());
endDegrees = q.getTheta ();
}break;
case 135266307:
haveRotation = true;
if (this.isPoint3f (++i)) {
rotAxis.setT (this.centerParameter (i));
break;
}var p4 = this.getPoint4f (i);
rotAxis.set (p4.x, p4.y, p4.z);
endDegrees = p4.w;
q = J.util.Quaternion.newVA (rotAxis, endDegrees);
break;
case 1048580:
isSelected = true;
isMolecular = true;
haveRotation = true;
if (this.isArrayParameter (++i)) {
dihedralList = this.floatParameterSet (i, 6, 2147483647);
i = this.iToken;
} else {
var iAtom1 = this.atomExpressionAt (i).nextSetBit (0);
var iAtom2 = this.atomExpressionAt (++this.iToken).nextSetBit (0);
if (iAtom1 < 0 || iAtom2 < 0) return;
bsAtoms = this.viewer.getBranchBitSet (iAtom2, iAtom1, true);
points[0] = this.viewer.getAtomPoint3f (iAtom1);
points[1] = this.viewer.getAtomPoint3f (iAtom2);
nPoints = 2;
}break;
case 4160:
translation = JU.V3.newV (this.centerParameter (++i));
isMolecular = isSelected = true;
break;
case 137363468:
helicalPath = true;
continue;
case 1297090050:
var symop = this.intParameter (++i);
if (this.chk) continue;
var info = this.viewer.getSpaceGroupInfo (null);
var op = (info == null ? null : info.get ("operations"));
if (symop == 0 || op == null || op.length < Math.abs (symop)) this.invArg ();
op = op[Math.abs (symop) - 1];
translation = op[5];
invPoint = op[6];
points[0] = op[7];
if (op[8] != null) rotAxis = op[8];
endDegrees = (op[9]).intValue ();
if (symop < 0) {
endDegrees = -endDegrees;
if (translation != null) translation.scale (-1);
}if (endDegrees == 0 && points[0] != null) {
rotAxis.normalize ();
J.util.Measure.getPlaneThroughPoint (points[0], rotAxis, invPlane =  new JU.P4 ());
}q = J.util.Quaternion.newVA (rotAxis, endDegrees);
nPoints = (points[0] == null ? 0 : 1);
isMolecular = true;
haveRotation = true;
isSelected = true;
continue;
case 135270405:
case 12:
case 11:
haveRotation = true;
if (tok == 135270405) {
bsCompare = this.atomExpressionAt (++i);
ptsA = this.viewer.getAtomPointVector (bsCompare);
if (ptsA == null) this.errorAt (22, i);
i = this.iToken;
ptsB = this.getPointVector (this.getToken (++i), i);
if (ptsB == null || ptsA.size () != ptsB.size ()) this.errorAt (22, i);
m4 =  new JU.M4 ();
points[0] =  new JU.P3 ();
nPoints = 1;
var stddev = (this.chk ? 0 : J.util.Measure.getTransformMatrix4 (ptsA, ptsB, m4, points[0]));
if (stddev > 0.001) ptsB = null;
} else if (tok == 12) {
m4 = this.theToken.value;
}m3 =  new JU.M3 ();
if (m4 != null) {
translation =  new JU.V3 ();
m4.get (translation);
m4.getRotationScale (m3);
} else {
m3 = this.theToken.value;
}q = (this.chk ?  new J.util.Quaternion () : J.util.Quaternion.newM (m3));
rotAxis.setT (q.getNormal ());
endDegrees = q.getTheta ();
isMolecular = true;
break;
default:
this.invArg ();
}
i = this.iToken;
}
if (this.chk) return;
if (dihedralList != null) {
if (endDegrees != 3.4028235E38) {
isSpin = true;
degreesPerSecond = endDegrees;
}}if (isSelected && bsAtoms == null) bsAtoms = this.viewer.getSelectionSet (false);
if (bsCompare != null) {
isSelected = true;
if (bsAtoms == null) bsAtoms = bsCompare;
}var rate = (degreesPerSecond == 1.4E-45 ? 10 : endDegrees == 3.4028235E38 ? degreesPerSecond : (degreesPerSecond < 0) == (endDegrees > 0) ? -endDegrees / degreesPerSecond : degreesPerSecond);
if (dihedralList != null) {
if (!isSpin) {
this.viewer.setDihedrals (dihedralList, null, 1);
return;
}translation = null;
}if (q != null) {
if (nPoints == 0 && translation != null) points[0] = this.viewer.getAtomSetCenter (bsAtoms != null ? bsAtoms : isSelected ? this.viewer.getSelectionSet (false) : this.viewer.getAllAtoms ());
if (helicalPath && translation != null) {
points[1] = JU.P3.newP (points[0]);
points[1].add (translation);
var ret = J.util.Measure.computeHelicalAxis (null, 135266306, points[0], points[1], q);
points[0] = ret[0];
var theta = (ret[3]).x;
if (theta != 0) {
translation = ret[1];
rotAxis = JU.V3.newV (translation);
if (theta < 0) rotAxis.scale (-1);
}m4 = null;
}if (isSpin && m4 == null) m4 = J.script.ScriptMathProcessor.getMatrix4f (q.getMatrix (), translation);
if (points[0] != null) nPoints = 1;
}if (invPoint != null) {
this.viewer.invertAtomCoordPt (invPoint, bsAtoms);
if (rotAxis == null) return;
}if (invPlane != null) {
this.viewer.invertAtomCoordPlane (invPlane, bsAtoms);
if (rotAxis == null) return;
}if (nPoints < 2 && dihedralList == null) {
if (!isMolecular) {
if (isSpin && bsAtoms == null && !this.useThreads ()) return;
if (this.viewer.rotateAxisAngleAtCenter (this, points[0], rotAxis, rate, endDegrees, isSpin, bsAtoms) && this.isJS && isSpin && bsAtoms == null) throw  new J.script.ScriptInterruption (this, "rotate", 1);
return;
}if (nPoints == 0) points[0] =  new JU.P3 ();
points[1] = JU.P3.newP (points[0]);
points[1].add (rotAxis);
nPoints = 2;
}if (nPoints == 0) points[0] =  new JU.P3 ();
if (nPoints < 2 || points[0].distance (points[1]) == 0) {
points[1] = JU.P3.newP (points[0]);
points[1].y += 1.0;
}if (endDegrees == 3.4028235E38) endDegrees = 0;
if (endDegrees != 0 && translation != null && !haveRotation) translation.scale (endDegrees / translation.length ());
if (isSpin && translation != null && (endDegrees == 0 || degreesPerSecond == 0)) {
endDegrees = 0.01;
rate = (degreesPerSecond == 1.4E-45 ? 0.01 : degreesPerSecond < 0 ? -endDegrees / degreesPerSecond : degreesPerSecond * 0.01 / translation.length ());
degreesPerSecond = 0.01;
}if (bsAtoms != null && isSpin && ptsB == null && m4 != null) {
ptsA = this.viewer.getAtomPointVector (bsAtoms);
ptsB = J.util.Measure.transformPoints (ptsA, m4, points[0]);
}if (bsAtoms != null && !isSpin && ptsB != null) {
this.viewer.setAtomCoords (bsAtoms, 1146095626, ptsB);
} else {
if (!this.useThreads ()) return;
if (this.viewer.rotateAboutPointsInternal (this, points[0], points[1], rate, endDegrees, isSpin, bsAtoms, translation, ptsB, dihedralList) && this.isJS && isSpin) throw  new J.script.ScriptInterruption (this, "rotate", 1);
}}, "~B,~B");
$_M(c$, "getQuaternionParameter", 
function (i) {
switch (this.tokAt (i)) {
case 7:
var sv = (this.getToken (i)).getList ();
var p4 = null;
if (sv.size () == 0 || (p4 = J.script.SV.pt4Value (sv.get (0))) == null) this.invArg ();
return J.util.Quaternion.newP4 (p4);
case 1073741863:
return (this.chk ? null : J.util.Quaternion.newP4 (J.util.Escape.uP (this.viewer.getOrientationText (1073741863, null))));
default:
return J.util.Quaternion.newP4 (this.getPoint4f (i));
}
}, "~N");
$_M(c$, "getPointVector", 
function (t, i) {
switch (t.tok) {
case 10:
return this.viewer.getAtomPointVector (t.value);
case 7:
var data =  new JU.List ();
var pt;
var pts = (t).getList ();
for (var j = 0; j < pts.size (); j++) if ((pt = J.script.SV.ptValue (pts.get (j))) != null) data.addLast (pt);
 else return null;

return data;
}
if (i > 0) return this.viewer.getAtomPointVector (this.atomExpressionAt (i));
return null;
}, "J.script.T,~N");
$_M(c$, "getObjectCenter", 
function (axisID, index, modelIndex) {
var data = [axisID, Integer.$valueOf (index), Integer.$valueOf (modelIndex)];
return (this.getShapePropertyData (22, "getCenter", data) || this.getShapePropertyData (24, "getCenter", data) || this.getShapePropertyData (28, "getCenter", data) || this.getShapePropertyData (25, "getCenter", data) || this.getShapePropertyData (27, "getCenter", data) ? data[2] : null);
}, "~S,~N,~N");
$_M(c$, "getObjectBoundingBox", 
function (id) {
var data = [id, null, null];
return (this.getShapePropertyData (24, "getBoundingBox", data) || this.getShapePropertyData (28, "getBoundingBox", data) || this.getShapePropertyData (25, "getBoundingBox", data) || this.getShapePropertyData (27, "getBoundingBox", data) ? data[2] : null);
}, "~S");
$_M(c$, "getDrawObjectAxis", 
function (axisID, index) {
var data = [axisID, Integer.$valueOf (index), null];
return (this.getShapePropertyData (22, "getSpinAxis", data) ? data[2] : null);
}, "~S,~N");
$_M(c$, "script", 
function (tok, filename, theScript) {
var loadCheck = true;
var isCheck = false;
var doStep = false;
var lineNumber = 0;
var pc = 0;
var lineEnd = 0;
var pcEnd = 0;
var i = 2;
var localPath = null;
var remotePath = null;
var scriptPath = null;
var params = null;
if (tok == 135287308) {
this.checkLength (2);
if (!this.chk) this.viewer.jsEval (this.parameterAsString (1));
return;
}if (filename == null && theScript == null) {
tok = this.tokAt (1);
if (tok != 4) this.error (16);
filename = this.parameterAsString (1);
if (filename.equalsIgnoreCase ("applet")) {
var appID = this.parameterAsString (2);
theScript = this.parameterExpressionString (3, 0);
this.checkLast (this.iToken);
if (this.chk) return;
if (appID.length == 0 || appID.equals ("all")) appID = "*";
if (!appID.equals (".")) {
this.viewer.jsEval (appID + "\1" + theScript);
if (!appID.equals ("*")) return;
}} else {
tok = this.tokAt (this.slen - 1);
doStep = (tok == 266298);
if (filename.equalsIgnoreCase ("inline")) {
theScript = this.parameterExpressionString (2, (doStep ? this.slen - 1 : 0));
i = this.iToken + 1;
}while (filename.equalsIgnoreCase ("localPath") || filename.equalsIgnoreCase ("remotePath") || filename.equalsIgnoreCase ("scriptPath")) {
if (filename.equalsIgnoreCase ("localPath")) localPath = this.parameterAsString (i++);
 else if (filename.equalsIgnoreCase ("scriptPath")) scriptPath = this.parameterAsString (i++);
 else remotePath = this.parameterAsString (i++);
filename = this.parameterAsString (i++);
}
if (filename.startsWith ("?") && this.viewer.isJS) {
filename = this.loadFileAsync ("SCRIPT_", filename, i, true);
}if ((tok = this.tokAt (i)) == 1073741878) {
isCheck = true;
tok = this.tokAt (++i);
}if (tok == 1073742050) {
loadCheck = false;
tok = this.tokAt (++i);
}if (tok == 1073741998 || tok == 1141899268) {
i++;
lineEnd = lineNumber = Math.max (this.intParameter (i++), 0);
if (this.checkToken (i)) {
if (this.getToken (i).tok == 269484192) lineEnd = (this.checkToken (++i) ? this.intParameter (i++) : 0);
 else lineEnd = -this.intParameter (i++);
if (lineEnd <= 0) this.invArg ();
}} else if (tok == 1073741890 || tok == 1073741892) {
i++;
pc = Math.max (this.intParameter (i++) - 1, 0);
pcEnd = pc + 1;
if (this.checkToken (i)) {
if (this.getToken (i).tok == 269484192) pcEnd = (this.checkToken (++i) ? this.intParameter (i++) : 0);
 else pcEnd = -this.intParameter (i++);
if (pcEnd <= 0) this.invArg ();
}}if (this.tokAt (i) == 269484048) {
params = this.parameterExpressionList (i, -1, false);
i = this.iToken + 1;
}this.checkLength (doStep ? i + 1 : i);
}}if (this.chk && !this.isCmdLine_c_or_C_Option) return;
if (this.isCmdLine_c_or_C_Option) isCheck = true;
var wasSyntaxCheck = this.chk;
var wasScriptCheck = this.isCmdLine_c_or_C_Option;
if (isCheck) this.chk = this.isCmdLine_c_or_C_Option = true;
this.pushContext (null, "SCRIPT");
this.contextPath += " >> " + filename;
if (theScript == null ? this.compileScriptFileInternal (filename, localPath, remotePath, scriptPath) : this.compileScript (null, theScript, false)) {
this.pcEnd = pcEnd;
this.lineEnd = lineEnd;
while (pc < this.lineNumbers.length && this.lineNumbers[pc] < lineNumber) pc++;

this.pc = pc;
var saveLoadCheck = this.isCmdLine_C_Option;
this.isCmdLine_C_Option = new Boolean (this.isCmdLine_C_Option & loadCheck).valueOf ();
this.executionStepping = new Boolean (this.executionStepping | doStep).valueOf ();
this.contextVariables =  new java.util.Hashtable ();
this.contextVariables.put ("_arguments", (params == null ? J.script.SV.getVariableAI ([]) : J.script.SV.getVariableList (params)));
if (isCheck) this.listCommands = true;
var timeMsg = this.viewer.getBoolean (603979934);
if (timeMsg) J.util.Logger.startTimer ("script");
this.dispatchCommands (false, false);
if (timeMsg) this.showString (J.util.Logger.getTimerMsg ("script", 0));
this.isCmdLine_C_Option = saveLoadCheck;
this.popContext (false, false);
} else {
J.util.Logger.error (J.i18n.GT._ ("script ERROR: ") + this.errorMessage);
this.popContext (false, false);
if (wasScriptCheck) {
this.setErrorMessage (null);
} else {
this.evalError (null, null);
}}this.chk = wasSyntaxCheck;
this.isCmdLine_c_or_C_Option = wasScriptCheck;
}, "~N,~S,~S");
$_M(c$, "$function", 
function () {
if (this.chk && !this.isCmdLine_c_or_C_Option) return;
var name = this.getToken (0).value;
if (!this.viewer.isFunction (name)) this.error (10);
var params = (this.slen == 1 || this.slen == 3 && this.tokAt (1) == 269484048 && this.tokAt (2) == 269484049 ? null : this.parameterExpressionList (1, -1, false));
if (this.chk) return;
this.runFunctionRet (null, name, params, null, false, true, true);
});
$_M(c$, "sync", 
function () {
this.checkLength (-3);
var text = "";
var applet = "";
var port = JU.PT.parseInt (this.optParameterAsString (1));
if (port == -2147483648) {
port = 0;
switch (this.slen) {
case 1:
applet = "*";
text = "ON";
break;
case 2:
applet = this.parameterAsString (1);
if (applet.indexOf ("jmolApplet") == 0 || JU.PT.isOneOf (applet, ";*;.;^;")) {
text = "ON";
if (!this.chk) this.viewer.syncScript (text, applet, 0);
applet = ".";
break;
}text = applet;
applet = "*";
break;
case 3:
applet = this.parameterAsString (1);
text = (this.tokAt (2) == 528443 ? "GET_GRAPHICS" : this.parameterAsString (2));
break;
}
} else {
text = (this.slen == 2 ? null : this.parameterAsString (2));
applet = null;
}if (this.chk) return;
this.viewer.syncScript (text, applet, port);
});
$_M(c$, "history", 
function (pt) {
if (this.slen == 1) {
this.showString (this.viewer.getSetHistory (2147483647));
return;
}if (pt == 2) {
var n = this.intParameter (this.checkLast (2));
if (n < 0) this.invArg ();
if (!this.chk) this.viewer.getSetHistory (n == 0 ? 0 : -2 - n);
return;
}switch (this.getToken (this.checkLast (1)).tok) {
case 1048589:
case 1073741882:
if (!this.chk) this.viewer.getSetHistory (-2147483648);
return;
case 1048588:
if (!this.chk) this.viewer.getSetHistory (0);
break;
default:
this.errorStr (24, "ON, OFF, CLEAR");
}
}, "~N");
$_M(c$, "display", 
function (isDisplay) {
var bs = null;
var addRemove = 0;
var i = 1;
var tok;
switch (tok = this.tokAt (1)) {
case 1276118017:
case 1073742119:
addRemove = tok;
tok = this.tokAt (++i);
break;
}
var isGroup = (tok == 1087373318);
if (isGroup) tok = this.tokAt (++i);
switch (tok) {
case 1048583:
this.setObjectProperty ();
return;
case 0:
break;
default:
if (this.slen == 4 && this.tokAt (2) == 1678770178) bs =  new J.modelset.BondSet (J.util.BSUtil.newBitSet2 (0, this.viewer.modelSet.bondCount));
 else bs = this.atomExpressionAt (i);
}
if (this.chk) return;
if (Clazz_instanceOf (bs, J.modelset.BondSet)) {
this.viewer.displayBonds (bs, isDisplay);
return;
}this.viewer.displayAtoms (bs, isDisplay, isGroup, addRemove, this.tQuiet);
}, "~B");
$_M(c$, "$delete", 
function () {
if (this.tokAt (1) == 1048583) {
this.setObjectProperty ();
return;
}var bs = (this.slen == 1 ? null : this.atomExpression (this.st, 1, 0, true, false, true, false));
if (this.chk) return;
if (bs == null) bs = this.viewer.getAllAtoms ();
var nDeleted = this.viewer.deleteAtoms (bs, false);
if (!(this.tQuiet || this.scriptLevel > this.scriptReportingLevel)) this.scriptStatusOrBuffer (J.i18n.GT.i (J.i18n.GT._ ("{0} atoms deleted"), nDeleted));
});
$_M(c$, "select", 
function (i) {
if (this.slen == 1) {
this.viewer.select (null, false, 0, this.tQuiet || this.scriptLevel > this.scriptReportingLevel);
return;
}if (this.slen == 2 && this.tokAt (1) == 1073742072) return;
this.viewer.setNoneSelected (this.slen == 4 && this.tokAt (2) == 1048587);
if (this.tokAt (2) == 10 && Clazz_instanceOf (this.getToken (2).value, J.modelset.BondSet) || this.getToken (2).tok == 1678770178 && this.getToken (3).tok == 10) {
if (this.slen == this.iToken + 2) {
if (!this.chk) this.viewer.selectBonds (this.theToken.value);
return;
}this.invArg ();
}if (this.getToken (2).tok == 1746538509) {
if (this.slen == 5 && this.getToken (3).tok == 10) {
if (!this.chk) this.setShapeProperty (6, "select", this.theToken.value);
return;
}this.invArg ();
}var bs;
var addRemove = 0;
var isGroup = false;
if (this.getToken (1).intValue == 0 && this.theTok != 1048588) {
var v = this.parameterExpressionToken (0).value;
if (!(Clazz_instanceOf (v, JU.BS))) this.invArg ();
this.checkLast (this.iToken);
bs = v;
} else {
var tok = this.tokAt (i);
switch (tok) {
case 1048589:
case 1048588:
if (!this.chk) this.viewer.setSelectionHalos (tok == 1048589);
tok = this.tokAt (++i);
break;
}
switch (tok) {
case 1276118017:
case 1073742119:
addRemove = tok;
tok = this.tokAt (++i);
}
isGroup = (tok == 1087373318);
if (isGroup) tok = this.tokAt (++i);
bs = this.atomExpressionAt (i);
}if (this.chk) return;
if (this.isBondSet) {
this.viewer.selectBonds (bs);
} else {
if (bs.length () > this.viewer.getAtomCount ()) {
var bs1 = this.viewer.getAllAtoms ();
bs1.and (bs);
bs = bs1;
}this.viewer.select (bs, isGroup, addRemove, this.tQuiet || this.scriptLevel > this.scriptReportingLevel);
}}, "~N");
$_M(c$, "subset", 
function () {
var bs = null;
if (!this.chk) this.viewer.setSelectionSubset (null);
if (this.slen != 1 && (this.slen != 4 || !this.getToken (2).value.equals ("off"))) bs = this.atomExpressionAt (1);
if (!this.chk) this.viewer.setSelectionSubset (bs);
});
$_M(c$, "invertSelected", 
function () {
var pt = null;
var plane = null;
var bs = null;
var iAtom = -2147483648;
switch (this.tokAt (1)) {
case 0:
if (this.chk) return;
bs = this.viewer.getSelectionSet (false);
pt = this.viewer.getAtomSetCenter (bs);
this.viewer.invertAtomCoordPt (pt, bs);
return;
case 528443:
iAtom = this.atomExpressionAt (2).nextSetBit (0);
bs = this.atomExpressionAt (this.iToken + 1);
break;
case 135266320:
pt = this.centerParameter (2);
break;
case 135266319:
plane = this.planeParameter (2);
break;
case 135267841:
plane = this.hklParameter (2);
break;
}
this.checkLengthErrorPt (this.iToken + 1, 1);
if (plane == null && pt == null && iAtom == -2147483648) this.invArg ();
if (this.chk) return;
if (iAtom == -1) return;
this.viewer.invertSelected (pt, plane, iAtom, bs);
});
$_M(c$, "translate", 
function (isSelected) {
var bs = null;
var i = 1;
var i0 = 0;
if (this.tokAt (1) == 1114638363) {
isSelected = true;
i0 = 1;
i = 2;
}if (this.isPoint3f (i)) {
var pt = this.getPoint3f (i, true);
bs = (!isSelected && this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (!this.chk) this.viewer.setAtomCoordsRelative (pt, bs);
return;
}var xyz = (this.parameterAsString (i).toLowerCase () + " ").charAt (0);
if ("xyz".indexOf (xyz) < 0) this.error (0);
var amount = this.floatParameter (++i);
var type;
switch (this.tokAt (++i)) {
case 0:
case 10:
case 1048577:
type = '\0';
break;
default:
type = (this.optParameterAsString (i).toLowerCase () + '\0').charAt (0);
}
if (amount == 0 && type != '\0') return;
this.iToken = i0 + (type == '\0' ? 2 : 3);
bs = (isSelected ? this.viewer.getSelectionSet (false) : this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (!this.chk) this.viewer.translate (xyz, amount, type, bs);
}, "~B");
$_M(c$, "zap", 
function (isZapCommand) {
if (this.slen == 1 || !isZapCommand) {
var doAll = (isZapCommand && !this.isStateScript);
if (doAll) this.viewer.cacheFileByName (null, false);
this.viewer.zap (true, doAll, true);
this.refresh ();
return;
}var bs = this.atomExpressionAt (1);
if (this.chk) return;
var nDeleted = this.viewer.deleteAtoms (bs, true);
var isQuiet = (this.tQuiet || this.scriptLevel > this.scriptReportingLevel);
if (!isQuiet) this.scriptStatusOrBuffer (J.i18n.GT.i (J.i18n.GT._ ("{0} atoms deleted"), nDeleted));
this.viewer.select (null, false, 0, isQuiet);
}, "~B");
$_M(c$, "zoom", 
function (isZoomTo) {
if (!isZoomTo) {
var tok = (this.slen > 1 ? this.getToken (1).tok : 1048589);
switch (tok) {
case 1073741980:
case 1073742079:
break;
case 1048589:
case 1048588:
if (this.slen > 2) this.error (2);
if (!this.chk) this.setBooleanProperty ("zoomEnabled", tok == 1048589);
return;
}
}var center = null;
var i = 1;
var floatSecondsTotal = (isZoomTo ? (this.isFloatParameter (i) ? this.floatParameter (i++) : 2) : 0);
if (floatSecondsTotal < 0) {
i--;
floatSecondsTotal = 0;
}var ptCenter = 0;
var bsCenter = null;
if (this.isCenterParameter (i)) {
ptCenter = i;
center = this.centerParameter (i);
if (Clazz_instanceOf (this.expressionResult, JU.BS)) bsCenter = this.expressionResult;
i = this.iToken + 1;
} else if (this.tokAt (i) == 2 && this.getToken (i).intValue == 0) {
bsCenter = this.viewer.getAtomBitSet ("visible");
center = this.viewer.getAtomSetCenter (bsCenter);
}var isSameAtom = false;
var zoom = this.viewer.getZoomSetting ();
var newZoom = this.getZoom (ptCenter, i, bsCenter, zoom);
i = this.iToken + 1;
var xTrans = NaN;
var yTrans = NaN;
if (i != this.slen) {
xTrans = this.floatParameter (i++);
yTrans = this.floatParameter (i++);
}if (i != this.slen) this.invArg ();
if (newZoom < 0) {
newZoom = -newZoom;
if (isZoomTo) {
if (this.slen == 1 || isSameAtom) newZoom *= 2;
 else if (center == null) newZoom /= 2;
}}var max = this.viewer.getMaxZoomPercent ();
if (newZoom < 5 || newZoom > max) this.numberOutOfRange (5, max);
if (!this.viewer.isWindowCentered ()) {
if (center != null) {
var bs = this.atomExpressionAt (ptCenter);
if (!this.chk) this.viewer.setCenterBitSet (bs, false);
}center = this.viewer.getRotationCenter ();
if (Float.isNaN (xTrans)) xTrans = this.viewer.getTranslationXPercent ();
if (Float.isNaN (yTrans)) yTrans = this.viewer.getTranslationYPercent ();
}if (this.chk) return;
if (isSameAtom && Math.abs (zoom - newZoom) < 1) floatSecondsTotal = 0;
this.viewer.moveTo (this, floatSecondsTotal, center, J.viewer.JC.center, NaN, null, newZoom, xTrans, yTrans, NaN, null, NaN, NaN, NaN, NaN, NaN, NaN);
if (this.isJS && floatSecondsTotal > 0 && this.viewer.global.waitForMoveTo) throw  new J.script.ScriptInterruption (this, "zoomTo", 1);
}, "~B");
$_M(c$, "getZoom", 
function (ptCenter, i, bs, currentZoom) {
var zoom = (this.isFloatParameter (i) ? this.floatParameter (i++) : NaN);
if (zoom == 0 || currentZoom == 0) {
var r = NaN;
if (bs == null) {
if (this.tokAt (ptCenter) == 1048583) {
var bbox = this.getObjectBoundingBox (this.objectNameParameter (ptCenter + 1));
if (bbox == null || (r = bbox[0].distance (bbox[1]) / 2) == 0) this.invArg ();
}} else {
r = this.viewer.calcRotationRadiusBs (bs);
}if (Float.isNaN (r)) this.invArg ();
currentZoom = this.viewer.getFloat (570425388) / r * 100;
zoom = NaN;
}if (zoom < 0) {
zoom += currentZoom;
} else if (Float.isNaN (zoom)) {
var tok = this.tokAt (i);
switch (tok) {
case 1073742079:
case 1073741980:
zoom = currentZoom * (tok == 1073742079 ? 0.5 : 2);
i++;
break;
case 269484208:
case 269484209:
case 269484193:
var value = this.floatParameter (++i);
i++;
switch (tok) {
case 269484208:
zoom = currentZoom / value;
break;
case 269484209:
zoom = currentZoom * value;
break;
case 269484193:
zoom = currentZoom + value;
break;
}
break;
default:
zoom = (bs == null ? -currentZoom : currentZoom);
}
}this.iToken = i - 1;
return zoom;
}, "~N,~N,JU.BS,~N");
$_M(c$, "delay", 
function () {
var millis = 0;
switch (this.getToken (1).tok) {
case 1048589:
millis = 1;
break;
case 2:
millis = this.intParameter (1) * 1000;
break;
case 3:
millis = Clazz_floatToInt (this.floatParameter (1) * 1000);
break;
default:
this.error (34);
}
if (this.chk || this.viewer.isHeadless () || this.viewer.autoExit) return;
this.refresh ();
this.doDelay (Math.abs (millis));
});
$_M(c$, "slab", 
function (isDepth) {
var TF = false;
var plane = null;
var str;
if (this.isCenterParameter (1) || this.tokAt (1) == 9) plane = this.planeParameter (1);
 else switch (this.getToken (1).tok) {
case 2:
var percent = this.intParameter (this.checkLast (1));
if (!this.chk) if (isDepth) this.viewer.depthToPercent (percent);
 else this.viewer.slabToPercent (percent);
return;
case 1048589:
this.checkLength (2);
TF = true;
case 1048588:
this.checkLength (2);
this.setBooleanProperty ("slabEnabled", TF);
return;
case 4141:
this.checkLength (2);
if (this.chk) return;
this.viewer.slabReset ();
this.setBooleanProperty ("slabEnabled", true);
return;
case 1085443:
this.checkLength (2);
if (this.chk) return;
this.viewer.setSlabDepthInternal (isDepth);
this.setBooleanProperty ("slabEnabled", true);
return;
case 269484192:
str = this.parameterAsString (2);
if (str.equalsIgnoreCase ("hkl")) plane = this.hklParameter (3);
 else if (str.equalsIgnoreCase ("plane")) plane = this.planeParameter (3);
if (plane == null) this.invArg ();
plane.scale (-1);
break;
case 135266319:
switch (this.getToken (2).tok) {
case 1048587:
break;
default:
plane = this.planeParameter (2);
}
break;
case 135267841:
plane = (this.getToken (2).tok == 1048587 ? null : this.hklParameter (2));
break;
case 1073742118:
return;
default:
this.invArg ();
}
if (!this.chk) this.viewer.slabInternal (plane, isDepth);
}, "~B");
$_M(c$, "ellipsoid", 
function () {
var mad = 0;
var i = 1;
var translucentLevel = 3.4028235E38;
var checkMore = false;
var isSet = false;
this.setShapeProperty (20, "thisID", null);
switch (this.getToken (1).tok) {
case 1048589:
mad = 2147483647;
break;
case 1048588:
break;
case 2:
mad = this.intParameter (1);
break;
case 1085443:
this.sm.loadShape (20);
this.setShapeProperty (20, "select", this.parameterAsString (2));
i = this.iToken;
checkMore = true;
isSet = true;
break;
case 1074790550:
case 269484209:
case 1073741824:
this.sm.loadShape (20);
if (this.theTok == 1074790550) i++;
this.setShapeId (20, i, false);
i = this.iToken;
checkMore = true;
break;
default:
this.invArg ();
}
if (!checkMore) {
this.setShapeSizeBs (20, mad, null);
return;
}while (++i < this.slen) {
var key = this.parameterAsString (i);
var value = null;
this.getToken (i);
if (!isSet) switch (this.theTok) {
case 1048583:
key = "points";
var data =  new Array (3);
data[0] = this.objectNameParameter (++i);
if (this.chk) continue;
this.getShapePropertyData (24, "getVertices", data);
value = data;
break;
case 1611272194:
var axes =  new Array (3);
for (var j = 0; j < 3; j++) {
axes[j] =  new JU.V3 ();
axes[j].setT (this.centerParameter (++i));
i = this.iToken;
}
value = axes;
break;
case 12289:
value = this.centerParameter (++i);
i = this.iToken;
break;
case 1095761935:
value = Integer.$valueOf (this.intParameter (++i));
break;
case 12291:
value = Boolean.TRUE;
this.checkLength (i + 1);
break;
}
if (value == null) switch (this.theTok) {
case 1048589:
key = "on";
value = Boolean.TRUE;
break;
case 1048588:
key = "on";
value = Boolean.FALSE;
break;
case 1073742138:
value = Float.$valueOf (this.floatParameter (++i));
break;
case 10:
case 1048577:
key = "atoms";
value = this.atomExpressionAt (i);
i = this.iToken;
break;
case 1766856708:
case 603979967:
case 1073742074:
translucentLevel = this.getColorTrans (i, true);
i = this.iToken;
continue;
case 1073742075:
value = this.parameterAsString (++i);
break;
}
if (value == null) this.invArg ();
this.setShapeProperty (20, key.toLowerCase (), value);
}
this.finalizeObject (20, this.colorArgb[0], translucentLevel, 0, false, null, 0, null);
this.setShapeProperty (20, "thisID", null);
});
$_M(c$, "getShapeNameParameter", 
function (i) {
var id = this.parameterAsString (i);
var isWild = id.equals ("*");
if (id.length == 0) this.invArg ();
if (isWild) {
switch (this.tokAt (i + 1)) {
case 0:
case 1048589:
case 1048588:
case 3145768:
case 3145770:
case 1766856708:
case 12291:
break;
default:
if (this.setMeshDisplayProperty (-1, 0, this.tokAt (i + 1))) break;
id += this.optParameterAsString (++i);
}
}if (this.tokAt (i + 1) == 269484209) id += this.parameterAsString (++i);
this.iToken = i;
return id;
}, "~N");
$_M(c$, "setShapeId", 
function (iShape, i, idSeen) {
if (idSeen) this.invArg ();
var name = this.getShapeNameParameter (i).toLowerCase ();
this.setShapeProperty (iShape, "thisID", name);
return name;
}, "~N,~N,~B");
$_M(c$, "setAtomShapeSize", 
function (shape, scale) {
var rd = null;
var tok = this.tokAt (1);
var isOnly = false;
switch (tok) {
case 1073742072:
this.restrictSelected (false, false);
break;
case 1048589:
break;
case 1048588:
scale = 0;
break;
case 3:
isOnly = (this.floatParameter (1) < 0);
case 2:
default:
rd = this.encodeRadiusParameter (1, isOnly, true);
if (Float.isNaN (rd.value)) this.invArg ();
}
if (rd == null) rd =  new J.atomdata.RadiusData (null, scale, J.atomdata.RadiusData.EnumType.FACTOR, J.constant.EnumVdw.AUTO);
if (isOnly) this.restrictSelected (false, false);
this.setShapeSize (shape, rd);
}, "~N,~N");
$_M(c$, "encodeRadiusParameter", 
function (index, isOnly, allowAbsolute) {
var value = NaN;
var factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
var vdwType = null;
var tok = (index == -1 ? 1649412120 : this.getToken (index).tok);
switch (tok) {
case 1112539137:
case 1112539138:
case 1112541195:
case 1114638362:
case 1112541199:
case 1649412120:
value = 1;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
vdwType = (tok == 1649412120 ? null : J.constant.EnumVdw.getVdwType2 (J.script.T.nameOf (tok)));
tok = this.tokAt (++index);
break;
}
switch (tok) {
case 4141:
return this.viewer.getDefaultRadiusData ();
case 1073741852:
case 1073742116:
case 1073741856:
case 1073741858:
case 1073741992:
value = 1;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
this.iToken = index - 1;
break;
case 269484193:
case 2:
case 3:
if (tok == 269484193) {
index++;
} else if (this.tokAt (index + 1) == 269484210) {
value = Math.round (this.floatParameter (index));
this.iToken = ++index;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
if (value < 0 || value > 200) this.integerOutOfRange (0, 200);
value /= 100;
break;
} else if (tok == 2) {
value = this.intParameter (index);
if (value > 749 || value < -200) this.integerOutOfRange (-200, 749);
if (value > 0) {
value /= 250;
factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
} else {
value /= -100;
factorType = J.atomdata.RadiusData.EnumType.FACTOR;
}break;
}var max;
if (tok == 269484193 || !allowAbsolute) {
factorType = J.atomdata.RadiusData.EnumType.OFFSET;
max = 16;
} else {
factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
vdwType = J.constant.EnumVdw.NADA;
max = 100;
}value = this.floatParameterRange (index, (isOnly || !allowAbsolute ? -max : 0), max);
if (isOnly) value = -value;
if (value > 16) value = 16.1;
break;
default:
if (value == 1) index--;
}
if (vdwType == null) {
vdwType = J.constant.EnumVdw.getVdwType (this.optParameterAsString (++this.iToken));
if (vdwType == null) {
this.iToken = index;
vdwType = J.constant.EnumVdw.AUTO;
}}return  new J.atomdata.RadiusData (null, value, factorType, vdwType);
}, "~N,~B,~B");
$_M(c$, "structure", 
function () {
var type = J.constant.EnumStructure.getProteinStructureType (this.parameterAsString (1));
if (type === J.constant.EnumStructure.NOT) this.invArg ();
var bs = null;
switch (this.tokAt (2)) {
case 10:
case 1048577:
bs = this.atomExpressionAt (2);
this.checkLast (this.iToken);
break;
default:
this.checkLength (2);
}
if (this.chk) return;
this.clearDefinedVariableAtomSets ();
this.viewer.setProteinType (type, bs);
});
$_M(c$, "wireframe", 
function () {
var mad = -2147483648;
if (this.tokAt (1) == 4141) this.checkLast (1);
 else mad = this.getMadParameter ();
if (this.chk) return;
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
this.setShapeSizeBs (1, mad == -2147483648 ? 300 : mad, null);
});
$_M(c$, "ssbond", 
function () {
var mad = this.getMadParameter ();
this.setShapeProperty (1, "type", Integer.$valueOf (256));
this.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
});
$_M(c$, "hbond", 
function () {
if (this.slen == 2 && this.getToken (1).tok == 4102) {
if (this.chk) return;
var n = this.viewer.autoHbond (null, null, false);
this.scriptStatusOrBuffer (J.i18n.GT.i (J.i18n.GT._ ("{0} hydrogen bonds"), Math.abs (n)));
return;
}if (this.slen == 2 && this.getToken (1).tok == 12291) {
if (this.chk) return;
this.connect (0);
return;
}var mad = this.getMadParameter ();
this.setShapeProperty (1, "type", Integer.$valueOf (30720));
this.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
});
$_M(c$, "vector", 
function () {
var type = J.atomdata.RadiusData.EnumType.SCREEN;
var value = 1;
this.checkLength (-3);
switch (this.iToken = this.slen) {
case 1:
break;
case 2:
switch (this.getToken (1).tok) {
case 1048589:
break;
case 1048588:
value = 0;
break;
case 2:
value = this.intParameterRange (1, 0, 19);
break;
case 3:
type = J.atomdata.RadiusData.EnumType.ABSOLUTE;
value = this.floatParameterRange (1, 0, 3);
break;
default:
this.error (6);
}
break;
case 3:
if (this.tokAt (1) == 1073742138) {
this.setFloatProperty ("vectorScale", this.floatParameterRange (2, -100, 100));
return;
}}
this.setShapeSize (18,  new J.atomdata.RadiusData (null, value, type, null));
});
$_M(c$, "vibration", 
function () {
this.checkLength (-3);
var period = 0;
switch (this.getToken (1).tok) {
case 1048589:
this.checkLength (2);
period = this.viewer.getFloat (570425412);
break;
case 1048588:
this.checkLength (2);
period = 0;
break;
case 2:
case 3:
this.checkLength (2);
period = this.floatParameter (1);
break;
case 1073742138:
this.setFloatProperty ("vibrationScale", this.floatParameterRange (2, -100, 100));
return;
case 1073742090:
this.setFloatProperty ("vibrationPeriod", this.floatParameter (2));
return;
case 1073741824:
this.invArg ();
break;
default:
period = -1;
}
if (period < 0) this.invArg ();
if (this.chk) return;
if (period == 0) {
this.viewer.setVibrationOff ();
return;
}this.viewer.setVibrationPeriod (-period);
});
$_M(c$, "dots", 
function (iShape) {
if (!this.chk) this.sm.loadShape (iShape);
this.setShapeProperty (iShape, "init", null);
var value = NaN;
var type = J.atomdata.RadiusData.EnumType.ABSOLUTE;
var ipt = 1;
while (true) {
switch (this.getToken (ipt).tok) {
case 1073742072:
this.restrictSelected (false, false);
value = 1;
type = J.atomdata.RadiusData.EnumType.FACTOR;
break;
case 1048589:
value = 1;
type = J.atomdata.RadiusData.EnumType.FACTOR;
break;
case 1048588:
value = 0;
break;
case 1073741976:
this.setShapeProperty (iShape, "ignore", this.atomExpressionAt (ipt + 1));
ipt = this.iToken + 1;
continue;
case 2:
var dotsParam = this.intParameter (ipt);
if (this.tokAt (ipt + 1) == 1666189314) {
ipt++;
this.setShapeProperty (iShape, "atom", Integer.$valueOf (dotsParam));
this.setShapeProperty (iShape, "radius", Float.$valueOf (this.floatParameter (++ipt)));
if (this.tokAt (++ipt) == 1766856708) {
this.setShapeProperty (iShape, "colorRGB", Integer.$valueOf (this.getArgbParam (++ipt)));
ipt++;
}if (this.getToken (ipt).tok != 10) this.invArg ();
this.setShapeProperty (iShape, "dots", this.st[ipt].value);
return;
}break;
}
break;
}
var rd = (Float.isNaN (value) ? this.encodeRadiusParameter (ipt, false, true) :  new J.atomdata.RadiusData (null, value, type, J.constant.EnumVdw.AUTO));
if (Float.isNaN (rd.value)) this.invArg ();
this.setShapeSize (iShape, rd);
}, "~N");
$_M(c$, "proteinShape", 
function (shapeType) {
var mad = 0;
switch (this.getToken (1).tok) {
case 1073742072:
if (this.chk) return;
this.restrictSelected (false, false);
mad = -1;
break;
case 1048589:
mad = -1;
break;
case 1048588:
break;
case 1641025539:
mad = -2;
break;
case 1112541199:
case 1073741922:
mad = -4;
break;
case 2:
mad = (this.intParameterRange (1, 0, 1000) * 8);
break;
case 3:
mad = Math.round (this.floatParameterRange (1, -4.0, 4.0) * 2000);
if (mad < 0) {
this.restrictSelected (false, false);
mad = -mad;
}break;
case 10:
if (!this.chk) this.sm.loadShape (shapeType);
this.setShapeProperty (shapeType, "bitset", this.theToken.value);
return;
default:
this.error (6);
}
this.setShapeSizeBs (shapeType, mad, null);
}, "~N");
$_M(c$, "animation", 
function () {
var animate = false;
switch (this.getToken (1).tok) {
case 1048589:
animate = true;
case 1048588:
if (!this.chk) this.viewer.setAnimationOn (animate);
break;
case 1073742031:
var morphCount = Clazz_floatToInt (this.floatParameter (2));
if (!this.chk) this.viewer.setAnimMorphCount (Math.abs (morphCount));
break;
case 1610625028:
this.iToken = 2;
var bs = (this.tokAt (2) == 1048579 ? null : this.atomExpressionAt (2));
this.checkLength (this.iToken + 1);
if (!this.chk) this.viewer.setAnimDisplay (bs);
return;
case 4115:
if (this.isArrayParameter (2)) {
var f = this.floatParameterSet (2, 0, 2147483647);
this.checkLength (this.iToken + 1);
if (this.chk) return;
var frames =  Clazz_newIntArray (f.length, 0);
for (var i = f.length; --i >= 0; ) frames[i] = Clazz_floatToInt (f[i]);

var movie =  new java.util.Hashtable ();
movie.put ("frames", frames);
movie.put ("currentFrame", Integer.$valueOf (0));
this.viewer.setMovie (movie);
} else {
this.model (2);
}break;
case 1073742024:
var startDelay = 1;
var endDelay = 1;
if (this.slen > 5) this.error (2);
var animationMode = null;
switch (J.script.T.getTokFromName (this.parameterAsString (2))) {
case 1073742070:
animationMode = J.constant.EnumAnimationMode.ONCE;
startDelay = endDelay = 0;
break;
case 528410:
animationMode = J.constant.EnumAnimationMode.LOOP;
break;
case 1073742082:
animationMode = J.constant.EnumAnimationMode.PALINDROME;
break;
default:
this.invArg ();
}
if (this.slen >= 4) {
startDelay = endDelay = this.floatParameter (3);
if (this.slen == 5) endDelay = this.floatParameter (4);
}if (!this.chk) this.viewer.setAnimationReplayMode (animationMode, startDelay, endDelay);
break;
case 1073741918:
var i = 2;
var direction = 0;
switch (this.tokAt (i)) {
case 269484192:
direction = -this.intParameter (++i);
break;
case 269484193:
direction = this.intParameter (++i);
break;
case 2:
direction = this.intParameter (i);
break;
default:
this.invArg ();
}
this.checkLength (++i);
if (direction != 1 && direction != -1) this.errorStr2 (35, "-1", "1");
if (!this.chk) this.viewer.setAnimationDirection (direction);
break;
case 1074790526:
this.setIntProperty ("animationFps", this.intParameter (this.checkLast (2)));
break;
default:
this.frameControl (1);
}
});
$_M(c$, "assign", 
function () {
var atomsOrBonds = this.tokAt (1);
var index = this.atomExpressionAt (2).nextSetBit (0);
var index2 = -1;
var type = null;
if (index < 0) return;
if (atomsOrBonds == 4106) {
index2 = this.atomExpressionAt (++this.iToken).nextSetBit (0);
} else {
type = this.parameterAsString (++this.iToken);
}var pt = (++this.iToken < this.slen ? this.centerParameter (this.iToken) : null);
if (this.chk) return;
switch (atomsOrBonds) {
case 1141899265:
this.clearDefinedVariableAtomSets ();
this.viewer.assignAtom (index, pt, type);
break;
case 1678770178:
this.viewer.assignBond (index, (type + "p").charAt (0));
break;
case 4106:
this.viewer.assignConnect (index, index2);
}
});
$_M(c$, "file", 
function () {
var file = this.intParameter (this.checkLast (1));
if (this.chk) return;
var modelIndex = this.viewer.getModelNumberIndex (file * 1000000 + 1, false, false);
var modelIndex2 = -1;
if (modelIndex >= 0) {
modelIndex2 = this.viewer.getModelNumberIndex ((file + 1) * 1000000 + 1, false, false);
if (modelIndex2 < 0) modelIndex2 = this.viewer.getModelCount ();
modelIndex2--;
}this.viewer.setAnimationOn (false);
this.viewer.setAnimationDirection (1);
this.viewer.setAnimationRange (modelIndex, modelIndex2);
this.viewer.setCurrentModelIndex (-1);
});
$_M(c$, "fixed", 
function () {
var bs = (this.slen == 1 ? null : this.atomExpressionAt (1));
if (this.chk) return;
this.viewer.setMotionFixedAtoms (bs);
});
$_M(c$, "model", 
function (offset) {
var isFrame = (this.theTok == 4115);
var useModelNumber = true;
if (this.slen == 1 && offset == 1) {
var modelIndex = this.viewer.getCurrentModelIndex ();
var m;
if (!this.chk && modelIndex >= 0 && (m = this.viewer.getJmolDataSourceFrame (modelIndex)) >= 0) this.viewer.setCurrentModelIndex (m == modelIndex ? -2147483648 : m);
return;
}switch (this.tokAt (1)) {
case 2:
if (isFrame && this.slen == 2) {
if (!this.chk) this.viewer.setFrame (this.intParameter (1));
return;
}break;
case 1048577:
case 10:
var i = this.atomExpressionAt (1).nextSetBit (0);
this.checkLength (this.iToken + 1);
if (this.chk || i < 0) return;
var bsa =  new JU.BS ();
bsa.set (i);
this.viewer.setCurrentModelIndex (this.viewer.getModelBitSet (bsa, false).nextSetBit (0));
return;
case 1073741904:
this.iToken = 1;
var n = (this.tokAt (2) == 2 ? this.intParameter (++this.iToken) : 1);
this.checkLength (this.iToken + 1);
if (!this.chk && n > 0) this.viewer.createModels (n);
return;
case 1074790550:
this.checkLength (3);
var id = this.stringParameter (2);
if (!this.chk) this.viewer.setCurrentModelID (id);
return;
case 528397:
var millis = 0;
this.checkLength (3);
switch (this.getToken (2).tok) {
case 2:
case 3:
millis = Clazz_floatToLong (this.floatParameter (2) * 1000);
break;
default:
this.error (20);
}
if (!this.chk) this.viewer.setFrameDelayMs (millis);
return;
case 1073742166:
if (this.checkLength23 () > 0) if (!this.chk) this.viewer.setFrameTitleObj (this.slen == 2 ? "@{_modelName}" : (this.tokAt (2) == 7 ? J.script.SV.listValue (this.st[2]) : this.parameterAsString (2)));
return;
case 1073741832:
var bs = (this.slen == 2 || this.tokAt (2) == 1048587 ? null : this.atomExpressionAt (2));
if (!this.chk) this.viewer.setFrameOffsets (bs);
return;
}
if (this.getToken (offset).tok == 269484192) {
++offset;
if (this.getToken (this.checkLast (offset)).tok != 2 || this.intParameter (offset) != 1) this.invArg ();
if (!this.chk) this.viewer.setAnimation (1073742108);
return;
}var isPlay = false;
var isRange = false;
var isAll = false;
var isHyphen = false;
var frameList = [-1, -1];
var nFrames = 0;
var fFrame = 0;
var haveFileSet = this.viewer.haveFileSet ();
for (var i = offset; i < this.slen; i++) {
switch (this.getToken (i).tok) {
case 1048579:
case 269484209:
this.checkLength (offset + (isRange ? 2 : 1));
isAll = true;
break;
case 269484192:
if (nFrames != 1) this.invArg ();
isHyphen = true;
break;
case 1048587:
this.checkLength (offset + 1);
break;
case 3:
useModelNumber = false;
if ((fFrame = this.floatParameter (i)) < 0) {
this.checkLength (i + 1);
if (!this.chk) this.viewer.morph (-fFrame);
return;
}case 2:
case 4:
if (nFrames == 2) this.invArg ();
var iFrame = (this.theTok == 4 ? J.script.ScriptEvaluator.getFloatEncodedInt (this.theToken.value) : this.theToken.intValue);
if (iFrame < 0 && nFrames == 1) {
isHyphen = true;
iFrame = -iFrame;
if (haveFileSet && iFrame < 1000000) iFrame *= 1000000;
}if (this.theTok == 3 && haveFileSet && fFrame == Clazz_floatToInt (fFrame)) iFrame = Clazz_floatToInt (fFrame) * 1000000;
if (iFrame == 2147483647) {
if (i == 1) {
var id = this.theToken.value.toString ();
var modelIndex = (this.chk ? -1 : this.viewer.getModelIndexFromId (id));
if (modelIndex >= 0) {
this.checkLength (2);
this.viewer.setCurrentModelIndex (modelIndex);
return;
}}iFrame = 0;
}if (iFrame == -1) {
this.checkLength (offset + 1);
if (!this.chk) this.viewer.setAnimation (1073742108);
return;
}if (iFrame >= 1000 && iFrame < 1000000 && haveFileSet) iFrame = (Clazz_doubleToInt (iFrame / 1000)) * 1000000 + (iFrame % 1000);
if (!useModelNumber && iFrame == 0 && nFrames == 0) isAll = true;
if (iFrame >= 1000000) useModelNumber = false;
frameList[nFrames++] = iFrame;
break;
case 1073742096:
isPlay = true;
break;
case 1073742114:
isRange = true;
break;
default:
this.frameControl (offset);
return;
}
}
if (isRange && nFrames == 0) isAll = true;
if (this.chk) return;
if (isAll) {
this.viewer.setAnimationOn (false);
this.viewer.setAnimationRange (-1, -1);
if (!isRange) this.viewer.setCurrentModelIndex (-1);
return;
}if (nFrames == 2 && !isRange) isHyphen = true;
if (haveFileSet) useModelNumber = false;
 else if (useModelNumber) for (var i = 0; i < nFrames; i++) if (frameList[i] >= 0) frameList[i] %= 1000000;

var modelIndex = this.viewer.getModelNumberIndex (frameList[0], useModelNumber, false);
var modelIndex2 = -1;
if (haveFileSet && modelIndex < 0 && frameList[0] != 0) {
if (frameList[0] < 1000000) frameList[0] *= 1000000;
if (nFrames == 2 && frameList[1] < 1000000) frameList[1] *= 1000000;
if (frameList[0] % 1000000 == 0) {
frameList[0]++;
modelIndex = this.viewer.getModelNumberIndex (frameList[0], false, false);
if (modelIndex >= 0) {
var i2 = (nFrames == 1 ? frameList[0] + 1000000 : frameList[1] == 0 ? -1 : frameList[1] % 1000000 == 0 ? frameList[1] + 1000001 : frameList[1] + 1);
modelIndex2 = this.viewer.getModelNumberIndex (i2, false, false);
if (modelIndex2 < 0) modelIndex2 = this.viewer.getModelCount ();
modelIndex2--;
if (isRange) nFrames = 2;
 else if (!isHyphen && modelIndex2 != modelIndex) isHyphen = true;
isRange = isRange || modelIndex == modelIndex2;
}} else {
return;
}}if (!isPlay && !isRange || modelIndex >= 0) this.viewer.setCurrentModelIndexClear (modelIndex, false);
if (isPlay && nFrames == 2 || isRange || isHyphen) {
if (modelIndex2 < 0) modelIndex2 = this.viewer.getModelNumberIndex (frameList[1], useModelNumber, false);
this.viewer.setAnimationOn (false);
this.viewer.setAnimationDirection (1);
this.viewer.setAnimationRange (modelIndex, modelIndex2);
this.viewer.setCurrentModelIndexClear (isHyphen && !isRange ? -1 : modelIndex >= 0 ? modelIndex : 0, false);
}if (isPlay) this.viewer.setAnimation (266287);
}, "~N");
$_M(c$, "bitSetForModelFileNumber", 
function (m) {
var bs = J.util.BSUtil.newBitSet (this.viewer.getAtomCount ());
if (this.chk) return bs;
var modelCount = this.viewer.getModelCount ();
var haveFileSet = this.viewer.haveFileSet ();
if (m < 1000000 && haveFileSet) m *= 1000000;
var pt = m % 1000000;
if (pt == 0) {
var model1 = this.viewer.getModelNumberIndex (m + 1, false, false);
if (model1 < 0) return bs;
var model2 = (m == 0 ? modelCount : this.viewer.getModelNumberIndex (m + 1000001, false, false));
if (model1 < 0) model1 = 0;
if (model2 < 0) model2 = modelCount;
if (this.viewer.isTrajectory (model1)) model2 = model1 + 1;
for (var j = model1; j < model2; j++) bs.or (this.viewer.getModelUndeletedAtomsBitSet (j));

} else {
var modelIndex = this.viewer.getModelNumberIndex (m, false, true);
if (modelIndex >= 0) bs.or (this.viewer.getModelUndeletedAtomsBitSet (modelIndex));
}return bs;
}, "~N");
$_M(c$, "frameControl", 
function (i) {
switch (this.getToken (this.checkLast (i)).tok) {
case 1073742098:
case 1073742096:
case 266287:
case 20487:
case 1073742037:
case 1073742108:
case 1073742126:
case 1073741942:
case 1073741993:
if (!this.chk) this.viewer.setAnimation (this.theTok);
return;
}
this.invArg ();
}, "~N");
$_M(c$, "getShapeType", 
function (tok) {
var iShape = J.viewer.JC.shapeTokenIndex (tok);
if (iShape < 0) this.error (49);
return iShape;
}, "~N");
$_M(c$, "font", 
function (shapeType, fontsize) {
var fontface = "SansSerif";
var fontstyle = "Plain";
var sizeAdjust = 0;
var scaleAngstromsPerPixel = -1;
switch (this.iToken = this.slen) {
case 6:
scaleAngstromsPerPixel = this.floatParameter (5);
if (scaleAngstromsPerPixel >= 5) scaleAngstromsPerPixel = this.viewer.getZoomSetting () / scaleAngstromsPerPixel / this.viewer.getScalePixelsPerAngstrom (false);
case 5:
if (this.getToken (4).tok != 1073741824) this.invArg ();
fontstyle = this.parameterAsString (4);
case 4:
if (this.getToken (3).tok != 1073741824) this.invArg ();
fontface = this.parameterAsString (3);
if (!this.isFloatParameter (2)) this.error (34);
fontsize = this.floatParameter (2);
shapeType = this.getShapeType (this.getToken (1).tok);
break;
case 3:
if (!this.isFloatParameter (2)) this.error (34);
if (shapeType == -1) {
shapeType = this.getShapeType (this.getToken (1).tok);
fontsize = this.floatParameter (2);
} else {
if (fontsize >= 1) fontsize += (sizeAdjust = 5);
}break;
case 2:
default:
if (shapeType == 5) {
fontsize = 13;
break;
}this.error (2);
}
if (shapeType == 5) {
if (fontsize < 0 || fontsize >= 1 && (fontsize < 6 || fontsize > 63)) this.integerOutOfRange (6 - sizeAdjust, 63 - sizeAdjust);
this.setShapeProperty (5, "setDefaults", this.viewer.getNoneSelected ());
}if (this.chk) return;
if (J.util.GData.getFontStyleID (fontface) >= 0) {
fontstyle = fontface;
fontface = "SansSerif";
}var font3d = this.viewer.getFont3D (fontface, fontstyle, fontsize);
this.sm.loadShape (shapeType);
this.setShapeProperty (shapeType, "font", font3d);
if (scaleAngstromsPerPixel >= 0) this.setShapeProperty (shapeType, "scalereference", Float.$valueOf (scaleAngstromsPerPixel));
}, "~N,~N");
$_M(c$, "set", 
function () {
if (this.slen == 1) {
this.showString (this.viewer.getAllSettings (null));
return;
}var isJmolSet = (this.parameterAsString (0).equals ("set"));
var key = this.optParameterAsString (1);
if (isJmolSet && this.slen == 2 && key.indexOf ("?") >= 0) {
this.showString (this.viewer.getAllSettings (key.substring (0, key.indexOf ("?"))));
return;
}var tok = this.getToken (1).tok;
var newTok = 0;
var sval;
var ival = 2147483647;
var showing = (!this.chk && !this.tQuiet && this.scriptLevel <= this.scriptReportingLevel && !(this.st[0].value).equals ("var"));
switch (tok) {
case 1611272194:
this.axes (2);
return;
case 1610616835:
this.background (2);
return;
case 1679429641:
this.boundbox (2);
return;
case 1611272202:
this.frank (2);
return;
case 1610616855:
this.history (2);
return;
case 1826248715:
this.label (2);
return;
case 1614417948:
this.unitcell (2);
return;
case 536870920:
this.sm.loadShape (8);
this.setShapeProperty (8, "highlight", (this.tokAt (2) == 1048588 ? null : this.atomExpressionAt (2)));
return;
case 1610625028:
case 1611141171:
this.selectionHalo (2);
return;
case 536875070:
this.timeout (2);
return;
}
switch (tok) {
case 1641025539:
var type = J.constant.EnumStructure.getProteinStructureType (this.parameterAsString (2));
if (type === J.constant.EnumStructure.NOT) this.invArg ();
var data = this.floatParameterSet (3, 0, 2147483647);
if (data.length % 4 != 0) this.invArg ();
this.viewer.setStructureList (data, type);
this.checkLast (this.iToken);
return;
case 545259526:
ival = this.getArgbParam (2);
if (!this.chk) this.setObjectArgb ("axes", ival);
return;
case 1610612737:
this.setBondmode ();
return;
case 536870916:
if (this.chk) return;
var iLevel = (this.tokAt (2) == 1048588 || this.tokAt (2) == 2 && this.intParameter (2) == 0 ? 4 : 5);
J.util.Logger.setLogLevel (iLevel);
this.setIntProperty ("logLevel", iLevel);
if (iLevel == 4) {
this.viewer.setDebugScript (false);
if (showing) this.viewer.showParameter ("debugScript", true, 80);
}this.setDebugging ();
if (showing) this.viewer.showParameter ("logLevel", true, 80);
return;
case 537022465:
this.setEcho ();
return;
case 1610612738:
this.font (5, this.checkLength23 () == 2 ? 0 : this.floatParameter (2));
return;
case 1612189718:
this.setHbond ();
return;
case 1746538509:
case 537006096:
this.setMonitor ();
return;
case 1611141176:
this.setSsbond ();
return;
case 1610612741:
this.setLabel ("toggle");
return;
case 536870930:
this.setUserColors ();
return;
case 553648188:
this.setZslab ();
return;
}
var justShow = true;
switch (tok) {
case 536870914:
if (this.slen > 2) {
var modelDotted = this.stringSetting (2, false);
var modelNumber;
var useModelNumber = false;
if (modelDotted.indexOf (".") < 0) {
modelNumber = JU.PT.parseInt (modelDotted);
useModelNumber = true;
} else {
modelNumber = J.script.ScriptEvaluator.getFloatEncodedInt (modelDotted);
}if (this.chk) return;
var modelIndex = this.viewer.getModelNumberIndex (modelNumber, useModelNumber, true);
this.viewer.setBackgroundModelIndex (modelIndex);
return;
}break;
case 1649412120:
if (this.chk) return;
this.viewer.setAtomProperty (this.viewer.getAllAtoms (), 1649412120, -1, NaN, null, null, null);
switch (this.tokAt (2)) {
case 1073742109:
this.runScript ("#VDW radii for PROBE;{_H}.vdw = 1.0;{_H and connected(_C) and not connected(within(smiles,\'[a]\'))}.vdw = 1.17;{_C}.vdw = 1.75;{_C and connected(3) and connected(_O)}.vdw = 1.65;{_N}.vdw = 1.55;{_O}.vdw = 1.4;{_P}.vdw = 1.8;{_S}.vdw = 1.8;message VDW radii for H, C, N, O, P, and S set according to Word, et al., J. Mol. Biol. (1999) 285, 1711-1733");
return;
}
newTok = 545259555;
case 545259555:
if (this.slen > 2) {
sval = (this.slen == 3 && J.constant.EnumVdw.getVdwType (this.parameterAsString (2)) == null ? this.stringSetting (2, false) : this.parameterAsString (2));
if (J.constant.EnumVdw.getVdwType (sval) == null) this.invArg ();
this.setStringProperty (key, sval);
}break;
case 536870918:
if (this.slen > 2) {
var pt;
var $var = this.parameterExpressionToken (2);
if ($var.tok == 8) pt = $var.value;
 else {
var ijk = $var.asInt ();
pt =  new JU.P3 ();
if (ijk >= 555) J.util.SimpleUnitCell.ijkToPoint3f (ijk + 111, pt, 0);
}if (!this.chk) this.viewer.setDefaultLattice (pt);
}break;
case 545259552:
case 545259545:
if (this.slen > 2) {
if ((this.theTok = this.tokAt (2)) == 1073741992 || this.theTok == 1073742116) {
sval = this.parameterAsString (this.checkLast (2));
} else {
sval = this.stringSetting (2, false);
}this.setStringProperty (key, sval);
}break;
case 1632634891:
ival = this.intSetting (2);
if (ival == -2147483648) this.invArg ();
if (!this.chk) this.viewer.setFormalCharges (ival);
return;
case 553648148:
ival = this.intSetting (2);
if (!this.chk) {
if (ival != -2147483648) this.commandHistoryLevelMax = ival;
this.setIntProperty (key, ival);
}break;
case 545259564:
if (this.slen > 2) this.setStringProperty (key, this.stringSetting (2, isJmolSet));
break;
case 545259568:
case 545259558:
if (this.slen > 2) this.setUnits (this.stringSetting (2, isJmolSet), tok);
break;
case 545259572:
if (!this.chk) this.viewer.setPicked (-1);
if (this.slen > 2) {
this.setPicking ();
return;
}break;
case 545259574:
if (this.slen > 2) {
this.setPickingStyle ();
return;
}break;
case 1716520985:
break;
case 553648168:
ival = this.intSetting (2);
if (!this.chk && ival != -2147483648) this.setIntProperty (key, this.scriptReportingLevel = ival);
break;
case 536870924:
ival = this.intSetting (2);
if (ival == -2147483648 || ival == 0 || ival == 1) {
justShow = false;
break;
}tok = 553648174;
key = "specularPercent";
this.setIntProperty (key, ival);
break;
case 1650071565:
tok = 553648178;
key = "strandCount";
this.setIntProperty (key, this.intSetting (2));
break;
default:
justShow = false;
}
if (justShow && !showing) return;
var isContextVariable = (!justShow && !isJmolSet && this.getContextVariableAsVariable (key) != null);
if (!justShow && !isContextVariable) {
switch (tok) {
case 1678770178:
newTok = 603979928;
break;
case 1613758470:
newTok = 603979908;
break;
case 1613758476:
newTok = 603979910;
break;
case 1610612739:
newTok = 603979879;
break;
case 1666189314:
newTok = 570425394;
this.setFloatProperty ("solventProbeRadius", this.floatSetting (2));
justShow = true;
break;
case 1610612740:
newTok = 570425390;
break;
case 1613758488:
newTok = 603979948;
break;
case 1766856708:
newTok = 545259545;
break;
case 1611141175:
sval = this.parameterAsString (2).toLowerCase ();
switch ("x;y;z;fps".indexOf (sval + ";")) {
case 0:
newTok = 570425398;
break;
case 2:
newTok = 570425400;
break;
case 4:
newTok = 570425402;
break;
case 6:
newTok = 570425396;
break;
default:
this.errorStr2 (50, "set SPIN ", sval);
}
if (!this.chk) this.viewer.setSpin (sval, Clazz_floatToInt (this.floatParameter (this.checkLast (3))));
justShow = true;
break;
}
}if (newTok != 0) {
key = J.script.T.nameOf (tok = newTok);
} else if (!justShow && !isContextVariable) {
if (key.length == 0 || key.charAt (0) == '_') this.error (56);
var lckey = key.toLowerCase ();
if (lckey.indexOf ("label") == 0 && JU.PT.isOneOf (key.substring (5).toLowerCase (), ";front;group;atom;offset;offsetexact;pointer;alignment;toggle;scalereference;")) {
if (this.setLabel (key.substring (5))) return;
}if (isJmolSet && lckey.indexOf ("shift_") == 0) {
var f = this.floatParameter (2);
this.checkLength (3);
if (!this.chk) this.viewer.getNMRCalculation ().setChemicalShiftReference (lckey.substring (6), f);
return;
}if (lckey.endsWith ("callback")) tok = 536870912;
}if (isJmolSet && !J.script.T.tokAttr (tok, 536870912)) {
this.iToken = 1;
if (!this.isStateScript) this.errorStr2 (50, "SET", key);
this.warning (51, "SET", key);
}if (!justShow && isJmolSet) {
switch (this.slen) {
case 2:
this.setBooleanProperty (key, true);
justShow = true;
break;
case 3:
if (ival != 2147483647) {
this.setIntProperty (key, ival);
justShow = true;
}break;
}
}if (!justShow && !isJmolSet && this.tokAt (2) == 1048587) {
if (!this.chk) this.viewer.removeUserVariable (key.toLowerCase ());
justShow = true;
}if (!justShow) {
var tok2 = (this.tokAt (1) == 1048577 ? 0 : this.tokAt (2));
var setType = this.st[0].intValue;
var pt = (tok2 == 269484436 ? 3 : setType == 61 && !key.equals ("return") && tok2 != 269484436 ? 0 : 2);
this.setVariable (pt, 0, key, setType);
if (!isJmolSet) return;
}if (showing) this.viewer.showParameter (key, true, 80);
});
$_M(c$, "setZslab", 
function () {
var pt = null;
if (this.isFloatParameter (2)) {
this.checkLength (3);
this.setIntProperty ("zSlab", Clazz_floatToInt (this.floatParameter (2)));
} else {
if (!this.isCenterParameter (2)) this.invArg ();
pt = this.centerParameter (2);
this.checkLength (this.iToken + 1);
}if (!this.chk) this.viewer.setZslabPoint (pt);
});
$_M(c$, "setBondmode", 
function () {
var bondmodeOr = false;
switch (this.getToken (this.checkLast (2)).tok) {
case 269484128:
break;
case 269484112:
bondmodeOr = true;
break;
default:
this.invArg ();
}
this.setBooleanProperty ("bondModeOr", bondmodeOr);
});
$_M(c$, "setEcho", 
function () {
var propertyName = null;
var propertyValue = null;
var id = null;
var echoShapeActive = true;
var pt = 2;
switch (this.getToken (2).tok) {
case 1048588:
id = propertyName = "allOff";
this.checkLength (++pt);
break;
case 1048587:
echoShapeActive = false;
case 1048579:
id = this.parameterAsString (2);
this.checkLength (++pt);
break;
case 1073741996:
case 12289:
case 1073742128:
case 1074790748:
case 1073742019:
case 1073741871:
case 1073741824:
case 4:
case 1074790550:
if (this.theTok == 1074790550) pt++;
id = this.parameterAsString (pt++);
break;
}
if (!this.chk) {
this.viewer.setEchoStateActive (echoShapeActive);
this.sm.loadShape (30);
if (id != null) this.setShapeProperty (30, propertyName == null ? "target" : propertyName, id);
}if (pt < this.slen) {
switch (this.getToken (pt++).tok) {
case 1073741832:
propertyName = "align";
switch (this.getToken (pt).tok) {
case 1073741996:
case 1073742128:
case 12289:
propertyValue = this.parameterAsString (pt++);
break;
default:
this.invArg ();
}
break;
case 12289:
case 1073741996:
case 1073742128:
propertyName = "align";
propertyValue = this.parameterAsString (pt - 1);
break;
case 554176526:
propertyName = "%zpos";
propertyValue = Integer.$valueOf (Clazz_floatToInt (this.floatParameter (pt++)));
break;
case 1610625028:
case 3145768:
case 1048589:
propertyName = "hidden";
propertyValue = Boolean.FALSE;
break;
case 12294:
case 3145770:
propertyName = "hidden";
propertyValue = Boolean.TRUE;
break;
case 1095766030:
var modelIndex = (this.chk ? 0 : this.modelNumberParameter (pt++));
if (modelIndex >= this.viewer.getModelCount ()) this.invArg ();
propertyName = "model";
propertyValue = Integer.$valueOf (modelIndex);
break;
case 269484096:
case 1073742195:
propertyName = "xypos";
propertyValue = this.xypParameter (--pt);
if (propertyValue == null) pt--;
 else pt = this.iToken + 1;
break;
case 2:
pt--;
var posx = this.intParameter (pt++);
var namex = "xpos";
if (this.tokAt (pt) == 269484210) {
namex = "%xpos";
pt++;
}propertyName = "ypos";
propertyValue = Integer.$valueOf (this.intParameter (pt++));
if (this.tokAt (pt) == 269484210) {
propertyName = "%ypos";
pt++;
}this.checkLength (pt);
this.setShapeProperty (30, namex, Integer.$valueOf (posx));
break;
case 1048588:
propertyName = "off";
break;
case 1073742138:
propertyName = "scale";
propertyValue = Float.$valueOf (this.floatParameter (pt++));
break;
case 135271429:
propertyName = "script";
propertyValue = this.parameterAsString (pt++);
break;
case 4:
case 1073741979:
var isImage = (this.theTok == 1073741979);
if (isImage) pt++;
this.checkLength (pt);
if (id == null && isImage) {
var data =  new Array (1);
this.getShapePropertyData (30, "currentTarget", data);
id = data[0];
}this.echo (pt - 1, id, isImage);
return;
case 135266320:
propertyName = "point";
propertyValue = (this.isCenterParameter (pt) ? this.centerParameter (pt) : null);
pt = this.iToken + 1;
break;
default:
if (this.isCenterParameter (pt - 1)) {
propertyName = "xyz";
propertyValue = this.centerParameter (pt - 1);
pt = this.iToken + 1;
break;
}this.invArg ();
}
}this.checkLength (pt);
if (!this.chk && propertyName != null) this.setShapeProperty (30, propertyName, propertyValue);
});
$_M(c$, "intSetting", 
function (pt) {
if (pt == this.slen) return -2147483648;
return this.parameterExpressionToken (pt).asInt ();
}, "~N");
$_M(c$, "floatSetting", 
function (pt) {
if (pt == this.slen) return NaN;
return J.script.SV.fValue (this.parameterExpressionToken (pt));
}, "~N");
$_M(c$, "stringSetting", 
function (pt, isJmolSet) {
if (isJmolSet && this.slen == pt + 1) return this.parameterAsString (pt);
return this.parameterExpressionToken (pt).asString ();
}, "~N,~B");
$_M(c$, "setLabel", 
function (str) {
this.sm.loadShape (5);
var propertyValue = null;
this.setShapeProperty (5, "setDefaults", this.viewer.getNoneSelected ());
while (true) {
if (str.equals ("scalereference")) {
var scaleAngstromsPerPixel = this.floatParameter (2);
if (scaleAngstromsPerPixel >= 5) scaleAngstromsPerPixel = this.viewer.getZoomSetting () / scaleAngstromsPerPixel / this.viewer.getScalePixelsPerAngstrom (false);
propertyValue = Float.$valueOf (scaleAngstromsPerPixel);
break;
}if (str.equals ("offset") || str.equals ("offsetexact")) {
if (this.isPoint3f (2)) {
var pt = this.getPoint3f (2, false);
propertyValue = [1, pt.x, pt.y, pt.z, 0, 0, 0];
} else if (this.isArrayParameter (2)) {
propertyValue = this.floatParameterSet (2, 7, 7);
} else {
var xOffset = this.intParameterRange (2, -127, 127);
var yOffset = this.intParameterRange (3, -127, 127);
propertyValue = Integer.$valueOf (J.viewer.JC.getOffset (xOffset, yOffset));
}break;
}if (str.equals ("alignment")) {
switch (this.getToken (2).tok) {
case 1073741996:
case 1073742128:
case 12289:
str = "align";
propertyValue = this.theToken.value;
break;
default:
this.invArg ();
}
break;
}if (str.equals ("pointer")) {
var flags = 0;
switch (this.getToken (2).tok) {
case 1048588:
case 1048587:
break;
case 1610616835:
flags |= 2;
case 1048589:
flags |= 1;
break;
default:
this.invArg ();
}
propertyValue = Integer.$valueOf (flags);
break;
}if (str.equals ("toggle")) {
this.iToken = 1;
var bs = (this.slen == 2 ? null : this.atomExpressionAt (2));
this.checkLast (this.iToken);
if (!this.chk) this.viewer.togglePickingLabel (bs);
return true;
}this.iToken = 1;
var TF = (this.slen == 2 || this.getToken (2).tok == 1048589);
if (str.equals ("front") || str.equals ("group")) {
if (!TF && this.tokAt (2) != 1048588) this.invArg ();
if (!TF) str = "front";
propertyValue = (TF ? Boolean.TRUE : Boolean.FALSE);
break;
}if (str.equals ("atom")) {
if (!TF && this.tokAt (2) != 1048588) this.invArg ();
str = "front";
propertyValue = (TF ? Boolean.FALSE : Boolean.TRUE);
break;
}return false;
}
var bs = (this.iToken + 1 < this.slen ? this.atomExpressionAt (++this.iToken) : null);
this.checkLast (this.iToken);
if (this.chk) return true;
if (bs == null) this.setShapeProperty (5, str, propertyValue);
 else this.setShapePropertyBs (5, str, propertyValue, bs);
return true;
}, "~S");
$_M(c$, "setMonitor", 
function () {
var tok = this.tokAt (this.checkLast (2));
switch (tok) {
case 1048589:
case 1048588:
this.setBooleanProperty ("measurementlabels", tok == 1048589);
return;
case 1073741926:
case 2:
case 3:
this.viewer.loadShape (6);
this.setShapeSizeBs (6, this.getSetAxesTypeMad (2), null);
return;
}
this.setUnits (this.parameterAsString (2), 545259568);
});
$_M(c$, "setUnits", 
function (units, tok) {
if (tok == 545259568 && (units.endsWith ("hz") || JU.PT.isOneOf (units.toLowerCase (), ";angstroms;au;bohr;nanometers;nm;picometers;pm;vanderwaals;vdw;"))) {
if (!this.chk) this.viewer.setUnits (units, true);
} else if (tok == 545259558 && JU.PT.isOneOf (units.toLowerCase (), ";kcal;kj;")) {
if (!this.chk) this.viewer.setUnits (units, false);
} else {
this.errorStr2 (50, "set " + J.script.T.nameOf (tok), units);
}return true;
}, "~S,~N");
$_M(c$, "setSsbond", 
function () {
var ssbondsBackbone = false;
switch (this.tokAt (this.checkLast (2))) {
case 1115297793:
ssbondsBackbone = true;
break;
case 3145754:
break;
default:
this.invArg ();
}
this.setBooleanProperty ("ssbondsBackbone", ssbondsBackbone);
});
$_M(c$, "setHbond", 
function () {
var bool = false;
switch (this.tokAt (this.checkLast (2))) {
case 1115297793:
bool = true;
case 3145754:
this.setBooleanProperty ("hbondsBackbone", bool);
break;
case 1073742150:
bool = true;
case 1073741926:
this.setBooleanProperty ("hbondsSolid", bool);
break;
default:
this.invArg ();
}
});
$_M(c$, "setPicking", 
function () {
if (this.slen == 2) {
this.setStringProperty ("picking", "identify");
return;
}if (this.slen > 4 || this.tokAt (2) == 4) {
this.setStringProperty ("picking", this.stringSetting (2, false));
return;
}var i = 2;
var type = "SELECT";
switch (this.getToken (2).tok) {
case 135280132:
case 1746538509:
case 1611141175:
if (this.checkLength34 () == 4) {
type = this.parameterAsString (2).toUpperCase ();
if (type.equals ("SPIN")) this.setIntProperty ("pickingSpinRate", this.intParameter (3));
 else i = 3;
}break;
case 12291:
break;
default:
this.checkLength (3);
}
var str = this.parameterAsString (i);
switch (this.getToken (i).tok) {
case 1048589:
case 1073742056:
str = "identify";
break;
case 1048588:
case 1048587:
str = "off";
break;
case 135280132:
str = "atom";
break;
case 1826248715:
str = "label";
break;
case 1678770178:
str = "bond";
break;
case 12291:
this.checkLength (4);
if (this.tokAt (3) != 1678770178) this.invArg ();
str = "deleteBond";
break;
}
var mode = ((mode = str.indexOf ("_")) >= 0 ? mode : str.length);
mode = J.viewer.ActionManager.getPickingMode (str.substring (0, mode));
if (mode < 0) this.errorStr2 (50, "SET PICKING " + type, str);
this.setStringProperty ("picking", str);
});
$_M(c$, "setPickingStyle", 
function () {
if (this.slen > 4 || this.tokAt (2) == 4) {
this.setStringProperty ("pickingStyle", this.stringSetting (2, false));
return;
}var i = 2;
var isMeasure = false;
var type = "SELECT";
switch (this.getToken (2).tok) {
case 1746538509:
isMeasure = true;
type = "MEASURE";
case 135280132:
if (this.checkLength34 () == 4) i = 3;
break;
default:
this.checkLength (3);
}
var str = this.parameterAsString (i);
switch (this.getToken (i).tok) {
case 1048587:
case 1048588:
str = (isMeasure ? "measureoff" : "toggle");
break;
case 1048589:
if (isMeasure) str = "measure";
break;
}
if (J.viewer.ActionManager.getPickingStyleIndex (str) < 0) this.errorStr2 (50, "SET PICKINGSTYLE " + type, str);
this.setStringProperty ("pickingStyle", str);
});
$_M(c$, "timeout", 
function (index) {
var name = null;
var script = null;
var mSec = 0;
if (this.slen == index) {
this.showString (this.viewer.showTimeout (null));
return;
}for (var i = index; i < this.slen; i++) switch (this.getToken (i).tok) {
case 1074790550:
name = this.parameterAsString (++i);
if (this.slen == 3) {
if (!this.chk) this.viewer.triggerTimeout (name);
return;
}break;
case 1048588:
break;
case 2:
mSec = this.intParameter (i);
break;
case 3:
mSec = Math.round (this.floatParameter (i) * 1000);
break;
default:
if (name == null) name = this.parameterAsString (i);
 else if (script == null) script = this.parameterAsString (i);
 else this.invArg ();
break;
}

if (!this.chk) this.viewer.setTimeout (name, mSec, script);
}, "~N");
$_M(c$, "setUserColors", 
function () {
var v =  new JU.List ();
for (var i = 2; i < this.slen; i++) {
var argb = this.getArgbParam (i);
v.addLast (Integer.$valueOf (argb));
i = this.iToken;
}
if (this.chk) return;
var n = v.size ();
var scale =  Clazz_newIntArray (n, 0);
for (var i = n; --i >= 0; ) scale[i] = v.get (i).intValue ();

this.viewer.setUserScale (scale);
});
$_M(c$, "setVariable", 
function (pt, ptMax, key, setType) {
var bs = null;
var propertyName = "";
var tokProperty = 0;
var isArrayItem = (setType == 91);
var settingProperty = false;
var isExpression = false;
var settingData = (key.startsWith ("property_"));
var isNull = key.equals ("all");
var t = (settingData || isNull ? null : this.getContextVariableAsVariable (key));
var isUserVariable = (t != null);
if (pt > 0 && this.tokAt (pt - 1) == 1048577) {
bs = this.atomExpressionAt (pt - 1);
pt = this.iToken + 1;
isExpression = true;
}if (this.tokAt (pt) == 1048584) {
settingProperty = true;
var token = this.getBitsetPropertySelector (++pt, true);
if (token == null) this.invArg ();
if (this.tokAt (++pt) != 269484436) this.invArg ();
pt++;
tokProperty = token.intValue;
propertyName = token.value;
}if (isExpression && !settingProperty) this.invArg ();
var v = this.parameterExpression (pt, ptMax, key, true, true, -1, isArrayItem, null, null);
if (isNull) return;
var nv = v.size ();
if (nv == 0 || !isArrayItem && nv > 1 || isArrayItem && (nv < 3 || nv % 2 != 1)) this.invArg ();
if (this.chk) return;
var tv = v.get (isArrayItem ? v.size () - 1 : 0);
var needVariable = (!isUserVariable && !isExpression && !settingData && (isArrayItem || settingProperty || !(Clazz_instanceOf (tv.value, String) || tv.tok == 2 || Clazz_instanceOf (tv.value, Integer) || Clazz_instanceOf (tv.value, Float) || Clazz_instanceOf (tv.value, Boolean))));
if (needVariable) {
if (key.startsWith ("_")) this.errorStr (22, key);
t = this.viewer.getOrSetNewVariable (key, true);
isUserVariable = true;
}if (isArrayItem) {
var tnew = J.script.SV.newS ("").setv (tv, false);
var nParam = Clazz_doubleToInt (v.size () / 2);
for (var i = 0; i < nParam; i++) {
var isLast = (i + 1 == nParam);
var vv = v.get (i * 2);
if (t.tok == 10) {
t.tok = 6;
t.value =  new java.util.Hashtable ();
}if (t.tok == 6) {
var hkey = vv.asString ();
var tmap = t.value;
if (isLast) {
tmap.put (hkey, tnew);
break;
}t = tmap.get (hkey);
} else {
var ipt = vv.asInt ();
if (t.tok == 7) t = J.script.SV.selectItemVar (t);
switch (t.tok) {
case 7:
var list = t.getList ();
if (ipt > list.size () || isLast) break;
if (ipt <= 0) ipt = list.size () + ipt;
if (--ipt < 0) ipt = 0;
t = list.get (ipt);
continue;
case 11:
case 12:
var dim = (t.tok == 11 ? 3 : 4);
if (nParam == 1 && Math.abs (ipt) >= 1 && Math.abs (ipt) <= dim && tnew.tok == 7 && tnew.getList ().size () == dim) break;
if (nParam == 2) {
var ipt2 = v.get (2).asInt ();
if (ipt2 >= 1 && ipt2 <= dim && (tnew.tok == 2 || tnew.tok == 3)) {
i++;
ipt = ipt * 10 + ipt2;
break;
}}t.toArray ();
--i;
continue;
}
t.setSelectedValue (ipt, tnew);
break;
}}
return;
}if (settingProperty) {
if (!isExpression) {
bs = J.script.SV.getBitSet (t, true);
if (bs == null) this.invArg ();
}if (propertyName.startsWith ("property_")) {
this.viewer.setData (propertyName, [propertyName, (tv.tok == 7 ? J.script.SV.flistValue (tv, (tv.value).size () == bs.cardinality () ? bs.cardinality () : this.viewer.getAtomCount ()) : tv.asString ()), J.util.BSUtil.copy (bs), Integer.$valueOf (tv.tok == 7 ? 1 : 0)], this.viewer.getAtomCount (), 0, 0, tv.tok == 7 ? 2147483647 : -2147483648, 0);
return;
}this.setBitsetProperty (bs, tokProperty, tv.asInt (), tv.asFloat (), tv);
return;
}if (isUserVariable) {
t.setv (tv, false);
return;
}var vv = J.script.SV.oValue (tv);
if (key.startsWith ("property_")) {
if (tv.tok == 7) vv = tv.asString ();
this.viewer.setData (key, [key, "" + vv, J.util.BSUtil.copy (this.viewer.getSelectionSet (false)), Integer.$valueOf (0)], this.viewer.getAtomCount (), 0, 0, -2147483648, 0);
return;
}if (Clazz_instanceOf (vv, Boolean)) {
this.setBooleanProperty (key, (vv).booleanValue ());
} else if (Clazz_instanceOf (vv, Integer)) {
this.setIntProperty (key, (vv).intValue ());
} else if (Clazz_instanceOf (vv, Float)) {
this.setFloatProperty (key, (vv).floatValue ());
} else if (Clazz_instanceOf (vv, String)) {
this.setStringProperty (key, vv);
} else if (Clazz_instanceOf (vv, J.modelset.BondSet)) {
this.setStringProperty (key, J.util.Escape.eBond (vv));
} else if (Clazz_instanceOf (vv, JU.BS) || Clazz_instanceOf (vv, JU.P3) || Clazz_instanceOf (vv, JU.P4)) {
this.setStringProperty (key, J.util.Escape.e (vv));
} else {
J.util.Logger.error ("ERROR -- return from propertyExpression was " + vv);
}}, "~N,~N,~S,~N");
$_M(c$, "axes", 
function (index) {
var tickInfo = this.checkTicks (index, true, true, false);
index = this.iToken + 1;
var tok = this.tokAt (index);
var type = this.optParameterAsString (index).toLowerCase ();
if (this.slen == index + 1 && JU.PT.isOneOf (type, ";window;unitcell;molecular;")) {
this.setBooleanProperty ("axes" + type, true);
return;
}switch (tok) {
case 12289:
var center = this.centerParameter (index + 1);
this.setShapeProperty (31, "origin", center);
this.checkLast (this.iToken);
return;
case 1073742138:
this.setFloatProperty ("axesScale", this.floatParameter (this.checkLast (++index)));
return;
case 1826248715:
switch (tok = this.tokAt (index + 1)) {
case 1048588:
case 1048589:
this.checkLength (index + 2);
this.setShapeProperty (31, "labels" + (tok == 1048589 ? "On" : "Off"), null);
return;
}
var sOrigin = null;
switch (this.slen - index) {
case 7:
this.setShapeProperty (31, "labels", [this.parameterAsString (++index), this.parameterAsString (++index), this.parameterAsString (++index), this.parameterAsString (++index), this.parameterAsString (++index), this.parameterAsString (++index)]);
break;
case 5:
sOrigin = this.parameterAsString (index + 4);
case 4:
this.setShapeProperty (31, "labels", [this.parameterAsString (++index), this.parameterAsString (++index), this.parameterAsString (++index), sOrigin]);
break;
default:
this.error (2);
}
return;
}
if (type.equals ("position")) {
var xyp;
if (this.tokAt (++index) == 1048588) {
xyp =  new JU.P3 ();
} else {
xyp = this.xypParameter (index);
if (xyp == null) this.invArg ();
index = this.iToken;
}this.setShapeProperty (31, "position", xyp);
return;
}var mad = this.getSetAxesTypeMad (index);
if (this.chk) return;
this.setObjectMad (31, "axes", mad);
if (tickInfo != null) this.setShapeProperty (31, "tickInfo", tickInfo);
}, "~N");
$_M(c$, "boundbox", 
function (index) {
var tickInfo = this.checkTicks (index, false, true, false);
index = this.iToken + 1;
var scale = 1;
if (this.tokAt (index) == 1073742138) {
scale = this.floatParameter (++index);
if (!this.chk && scale == 0) this.invArg ();
index++;
if (index == this.slen) {
if (!this.chk) this.viewer.setBoundBox (null, null, true, scale);
return;
}}var byCorner = (this.tokAt (index) == 1073741902);
if (byCorner) index++;
if (this.isCenterParameter (index)) {
this.expressionResult = null;
var index0 = index;
var pt1 = this.centerParameter (index);
index = this.iToken + 1;
if (byCorner || this.isCenterParameter (index)) {
var pt2 = (byCorner ? this.centerParameter (index) : this.getPoint3f (index, true));
index = this.iToken + 1;
if (!this.chk) this.viewer.setBoundBox (pt1, pt2, byCorner, scale);
} else if (this.expressionResult != null && Clazz_instanceOf (this.expressionResult, JU.BS)) {
if (!this.chk) this.viewer.calcBoundBoxDimensions (this.expressionResult, scale);
} else if (this.expressionResult == null && this.tokAt (index0) == 1048583) {
if (this.chk) return;
var bbox = this.getObjectBoundingBox (this.objectNameParameter (++index0));
if (bbox == null) this.invArg ();
this.viewer.setBoundBox (bbox[0], bbox[1], true, scale);
index = this.iToken + 1;
} else {
this.invArg ();
}if (index == this.slen) return;
}var mad = this.getSetAxesTypeMad (index);
if (this.chk) return;
if (tickInfo != null) this.setShapeProperty (32, "tickInfo", tickInfo);
this.setObjectMad (32, "boundbox", mad);
}, "~N");
$_M(c$, "checkTicks", 
function (index, allowUnitCell, allowScale, allowFirst) {
this.iToken = index - 1;
if (this.tokAt (index) != 1073742164) return null;
var tickInfo;
var str = " ";
switch (this.tokAt (index + 1)) {
case 1112541205:
case 1112541206:
case 1112541207:
str = this.parameterAsString (++index).toLowerCase ();
break;
case 1073741824:
this.invArg ();
}
if (this.tokAt (++index) == 1048587) {
tickInfo =  new J.modelset.TickInfo (null);
tickInfo.type = str;
this.iToken = index;
return tickInfo;
}tickInfo =  new J.modelset.TickInfo (this.getPointOrPlane (index, false, true, false, false, 3, 3));
if (this.coordinatesAreFractional || this.tokAt (this.iToken + 1) == 1614417948) {
tickInfo.scale = JU.P3.new3 (NaN, NaN, NaN);
allowScale = false;
}if (this.tokAt (this.iToken + 1) == 1614417948) this.iToken++;
tickInfo.type = str;
if (this.tokAt (this.iToken + 1) == 1288701960) tickInfo.tickLabelFormats = this.stringParameterSet (this.iToken + 2);
if (!allowScale) return tickInfo;
if (this.tokAt (this.iToken + 1) == 1073742138) {
if (this.isFloatParameter (this.iToken + 2)) {
var f = this.floatParameter (this.iToken + 2);
tickInfo.scale = JU.P3.new3 (f, f, f);
} else {
tickInfo.scale = this.getPoint3f (this.iToken + 2, true);
}}if (allowFirst) if (this.tokAt (this.iToken + 1) == 1073741942) tickInfo.first = this.floatParameter (this.iToken + 2);
return tickInfo;
}, "~N,~B,~B,~B");
$_M(c$, "unitcell", 
function (index) {
var icell = 2147483647;
var mad = 2147483647;
var pt = null;
var tickInfo = this.checkTicks (index, true, false, false);
index = this.iToken;
var id = null;
var points = null;
switch (this.tokAt (index + 1)) {
case 4:
id = this.objectNameParameter (++index);
break;
case 1048583:
index++;
id = this.objectNameParameter (++index);
break;
case 12289:
++index;
switch (this.tokAt (++index)) {
case 10:
case 1048577:
pt = JU.P3.newP (this.viewer.getAtomSetCenter (this.atomExpressionAt (index)));
this.viewer.toFractional (pt, true);
index = this.iToken;
break;
default:
if (this.isCenterParameter (index)) {
pt = this.centerParameter (index);
index = this.iToken;
break;
}this.invArg ();
}
pt.x -= 0.5;
pt.y -= 0.5;
pt.z -= 0.5;
break;
default:
if (this.isArrayParameter (index + 1)) {
points = this.getPointArray (++index, 4);
index = this.iToken;
} else if (this.slen == index + 2) {
if (this.getToken (index + 1).tok == 2 && this.intParameter (index + 1) >= 111) icell = this.intParameter (++index);
} else if (this.slen > index + 1) {
pt = this.getPointOrPlane (++index, false, true, false, true, 3, 3);
index = this.iToken;
}}
mad = this.getSetAxesTypeMad (++index);
this.checkLast (this.iToken);
if (this.chk) return;
if (icell != 2147483647) this.viewer.setCurrentUnitCellOffset (icell);
 else if (id != null) this.viewer.setCurrentCage (id);
 else if (points != null) this.viewer.setCurrentCagePts (points);
this.setObjectMad (33, "unitCell", mad);
if (pt != null) this.viewer.setCurrentUnitCellOffsetPt (pt);
if (tickInfo != null) this.setShapeProperty (33, "tickInfo", tickInfo);
}, "~N");
$_M(c$, "frank", 
function (index) {
this.setBooleanProperty ("frank", this.booleanParameter (index));
}, "~N");
$_M(c$, "selectionHalo", 
function (pt) {
var showHalo = false;
switch (pt == this.slen ? 1048589 : this.getToken (pt).tok) {
case 1048589:
case 1114638363:
showHalo = true;
case 1048588:
case 1048587:
case 1073742056:
this.setBooleanProperty ("selectionHalos", showHalo);
break;
default:
this.invArg ();
}
}, "~N");
$_M(c$, "save", 
function () {
if (this.slen > 1) {
var saveName = this.optParameterAsString (2);
switch (this.tokAt (1)) {
case 1073742077:
case 1073742132:
if (!this.chk) this.viewer.saveOrientation (saveName, null);
return;
case 1678770178:
if (!this.chk) this.viewer.saveBonds (saveName);
return;
case 1073742158:
if (!this.chk) this.viewer.saveState (saveName);
return;
case 1641025539:
if (!this.chk) this.viewer.saveStructure (saveName);
return;
case 1048582:
if (!this.chk) this.viewer.saveCoordinates (saveName, this.viewer.getSelectionSet (false));
return;
case 1073742140:
if (!this.chk) this.viewer.saveSelection (saveName);
return;
}
}this.errorStr2 (53, "SAVE", "bonds? coordinates? orientation? selection? state? structure?");
});
$_M(c$, "restore", 
function () {
if (this.slen > 1) {
var saveName = this.optParameterAsString (2);
var tok = this.tokAt (1);
switch (tok) {
case 1073742077:
case 1073742132:
case 1073742139:
var floatSecondsTotal = (this.slen > 3 ? this.floatParameter (3) : 0);
if (floatSecondsTotal < 0) this.invArg ();
if (this.chk) return;
var type = "";
switch (tok) {
case 1073742077:
type = "Orientation";
this.viewer.restoreOrientation (saveName, floatSecondsTotal);
break;
case 1073742132:
type = "Rotation";
this.viewer.restoreRotation (saveName, floatSecondsTotal);
break;
case 1073742139:
type = "Scene";
this.viewer.restoreScene (saveName, floatSecondsTotal);
break;
}
if (this.isJS && floatSecondsTotal > 0 && this.viewer.global.waitForMoveTo) throw  new J.script.ScriptInterruption (this, "restore" + type, 1);
return;
}
this.checkLength23 ();
switch (tok) {
case 1678770178:
if (!this.chk) this.viewer.restoreBonds (saveName);
return;
case 1048582:
if (this.chk) return;
var script = this.viewer.getSavedCoordinates (saveName);
if (script == null) this.invArg ();
this.runScript (script);
this.viewer.checkCoordinatesChanged ();
return;
case 1073742140:
if (!this.chk) this.viewer.restoreSelection (saveName);
return;
case 1073742158:
if (this.chk) return;
var state = this.viewer.getSavedState (saveName);
if (state == null) this.invArg ();
this.runScript (state);
return;
case 1641025539:
if (this.chk) return;
var shape = this.viewer.getSavedStructure (saveName);
if (shape == null) this.invArg ();
this.runScript (shape);
return;
}
}this.errorStr2 (53, "RESTORE", "bonds? coords? orientation? rotation? scene? selection? state? structure?");
});
$_M(c$, "getColorTrans", 
function (i, allowNone) {
var translucentLevel = 3.4028235E38;
if (this.theTok != 1766856708) --i;
switch (this.tokAt (i + 1)) {
case 603979967:
i++;
translucentLevel = (this.isFloatParameter (i + 1) ? this.getTranslucentLevel (++i) : this.viewer.getFloat (570425354));
break;
case 1073742074:
i++;
translucentLevel = 0;
break;
}
if (this.isColorParam (i + 1)) {
this.colorArgb[0] = this.getArgbParam (++i);
} else if (this.tokAt (i + 1) == 1048587) {
this.colorArgb[0] = 0;
this.iToken = i + 1;
} else if (translucentLevel == 3.4028235E38) {
this.invArg ();
} else {
this.colorArgb[0] = -2147483648;
}i = this.iToken;
return translucentLevel;
}, "~N,~B");
$_M(c$, "finalizeObject", 
function (shapeID, colorArgb, translucentLevel, intScale, doSet, data, iptDisplayProperty, bs) {
if (doSet) {
this.setShapeProperty (shapeID, "set", data);
}if (colorArgb != -2147483648) this.setShapePropertyBs (shapeID, "color", Integer.$valueOf (colorArgb), bs);
if (translucentLevel != 3.4028235E38) this.setShapeTranslucency (shapeID, "", "translucent", translucentLevel, bs);
if (intScale != 0) {
this.setShapeProperty (shapeID, "scale", Integer.$valueOf (intScale));
}if (iptDisplayProperty > 0) {
if (!this.setMeshDisplayProperty (shapeID, iptDisplayProperty, 0)) this.invArg ();
}}, "~N,~N,~N,~N,~B,~O,~N,JU.BS");
$_M(c$, "getColorRange", 
function (i) {
var color1 = this.getArgbParam (i);
if (this.tokAt (++this.iToken) != 1074790746) this.invArg ();
var color2 = this.getArgbParam (++this.iToken);
var nColors = (this.tokAt (this.iToken + 1) == 2 ? this.intParameter (++this.iToken) : 0);
return J.util.ColorEncoder.getColorSchemeList (J.util.ColorEncoder.getPaletteAtoB (color1, color2, nColors));
}, "~N");
$_M(c$, "getIsosurfaceDataRange", 
function (iShape, sep) {
var dataRange = this.getShapeProperty (iShape, "dataRange");
return (dataRange != null && dataRange[0] != 3.4028235E38 && dataRange[0] != dataRange[1] ? sep + "isosurface" + " full data range " + dataRange[0] + " to " + dataRange[1] + " with color scheme spanning " + dataRange[2] + " to " + dataRange[3] : "");
}, "~N,~S");
$_M(c$, "setMeshDisplayProperty", 
function (shape, i, tok) {
var propertyName = null;
var propertyValue = null;
var allowCOLOR = (shape == 25);
var checkOnly = (i == 0);
if (!checkOnly) tok = this.getToken (i).tok;
switch (tok) {
case 1766856708:
if (allowCOLOR) this.iToken++;
 else break;
case 1073742074:
case 603979967:
if (!checkOnly) this.colorShape (shape, this.iToken, false);
return true;
case 0:
case 12291:
case 1048589:
case 1048588:
case 12294:
case 3145770:
case 1610625028:
case 3145768:
if (this.iToken == 1 && shape >= 0 && this.tokAt (2) == 0) this.setShapeProperty (shape, "thisID", null);
if (tok == 0) return (this.iToken == 1);
if (checkOnly) return true;
switch (tok) {
case 12291:
this.setShapeProperty (shape, "delete", null);
return true;
case 3145770:
case 12294:
tok = 1048588;
break;
case 3145768:
tok = 1048589;
break;
case 1610625028:
if (i + 1 == this.slen) tok = 1048589;
break;
}
case 1073741958:
case 1073741862:
case 1073741964:
case 1073741898:
case 1073742039:
case 1113198595:
case 1073742042:
case 1073742018:
case 1073742052:
case 1073741938:
case 1073742046:
case 1073742182:
case 1073742060:
case 1073741960:
case 1073742058:
propertyName = "token";
propertyValue = Integer.$valueOf (tok);
break;
}
if (propertyName == null) return false;
if (checkOnly) return true;
this.setShapeProperty (shape, propertyName, propertyValue);
if ((this.tokAt (this.iToken + 1)) != 0) {
if (!this.setMeshDisplayProperty (shape, ++this.iToken, 0)) --this.iToken;
}return true;
}, "~N,~N,~N");
$_M(c$, "bind", 
function () {
var mouseAction = this.stringParameter (1);
var name = this.parameterAsString (2);
this.checkLength (3);
if (!this.chk) this.viewer.bindAction (mouseAction, name);
});
$_M(c$, "unbind", 
function () {
if (this.slen != 1) this.checkLength23 ();
var mouseAction = this.optParameterAsString (1);
var name = this.optParameterAsString (2);
if (mouseAction.length == 0 || this.tokAt (1) == 1048579) mouseAction = null;
if (name.length == 0 || this.tokAt (2) == 1048579) name = null;
if (name == null && mouseAction != null && J.viewer.ActionManager.getActionFromName (mouseAction) >= 0) {
name = mouseAction;
mouseAction = null;
}if (!this.chk) this.viewer.unBindAction (mouseAction, name);
});
$_M(c$, "undoRedoMove", 
function () {
var n = 1;
var len = 2;
switch (this.tokAt (1)) {
case 0:
len = 1;
break;
case 1048579:
n = 0;
break;
case 2:
n = this.intParameter (1);
break;
default:
this.invArg ();
}
this.checkLength (len);
if (!this.chk) this.viewer.undoMoveAction (this.tokAt (0), n);
});
c$.getFloatEncodedInt = $_M(c$, "getFloatEncodedInt", 
function (strDecimal) {
var pt = strDecimal.indexOf (".");
if (pt < 1 || strDecimal.charAt (0) == '-' || strDecimal.endsWith (".") || strDecimal.contains (".0")) return 2147483647;
var i = 0;
var j = 0;
if (pt > 0) {
try {
i = Integer.parseInt (strDecimal.substring (0, pt));
if (i < 0) i = -i;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
i = -1;
} else {
throw e;
}
}
}if (pt < strDecimal.length - 1) try {
j = Integer.parseInt (strDecimal.substring (pt + 1));
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
i = i * 1000000 + j;
return (i < 0 ? 2147483647 : i);
}, "~S");
c$.getPartialBondOrderFromFloatEncodedInt = $_M(c$, "getPartialBondOrderFromFloatEncodedInt", 
function (bondOrderInteger) {
return (((Clazz_doubleToInt (bondOrderInteger / 1000000)) % 6) << 5) + ((bondOrderInteger % 1000000) & 0x1F);
}, "~N");
c$.getBondOrderFromString = $_M(c$, "getBondOrderFromString", 
function (s) {
return (s.indexOf (' ') < 0 ? J.util.JmolEdge.getBondOrderFromString (s) : s.toLowerCase ().indexOf ("partial ") == 0 ? J.script.ScriptEvaluator.getPartialBondOrderFromString (s.substring (8).trim ()) : 131071);
}, "~S");
c$.getPartialBondOrderFromString = $_M(c$, "getPartialBondOrderFromString", 
function (s) {
return J.script.ScriptEvaluator.getPartialBondOrderFromFloatEncodedInt (J.script.ScriptEvaluator.getFloatEncodedInt (s));
}, "~S");
$_V(c$, "addHydrogensInline", 
function (bsAtoms, vConnections, pts) {
var modelIndex = this.viewer.getAtomModelIndex (bsAtoms.nextSetBit (0));
if (modelIndex != this.viewer.modelSet.modelCount - 1) return  new JU.BS ();
var bsA = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
this.viewer.setAppendNew (false);
var atomIndex = this.viewer.modelSet.getAtomCount ();
var atomno = this.viewer.modelSet.getAtomCountInModel (modelIndex);
var sbConnect =  new JU.SB ();
for (var i = 0; i < vConnections.size (); i++) {
var a = vConnections.get (i);
sbConnect.append (";  connect 0 100 ").append ("({" + (atomIndex++) + "}) ").append ("({" + a.index + "}) group;");
}
var sb =  new JU.SB ();
sb.appendI (pts.length).append ("\n").append ("Viewer.AddHydrogens").append ("#noautobond").append ("\n");
for (var i = 0; i < pts.length; i++) sb.append ("H ").appendF (pts[i].x).append (" ").appendF (pts[i].y).append (" ").appendF (pts[i].z).append (" - - - - ").appendI (++atomno).appendC ('\n');

this.viewer.openStringInlineParamsAppend (sb.toString (), null, true);
this.runScriptBuffer (sbConnect.toString (), null);
var bsB = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
bsB.andNot (bsA);
return bsB;
}, "JU.BS,JU.List,~A");
$_V(c$, "stopScriptThreads", 
function () {
if (this.scriptDelayThread != null) {
this.scriptDelayThread.interrupt ();
this.scriptDelayThread = null;
}if (this.fileLoadThread != null) {
this.fileLoadThread.interrupt ();
this.fileLoadThread.resumeEval ();
if (this.thisContext != null) this.popContext (false, false);
this.fileLoadThread = null;
}});
$_M(c$, "delayScript", 
function (millis) {
if (this.viewer.autoExit) return;
this.stopScriptThreads ();
this.scriptDelayThread =  new J.script.ScriptDelayThread (this, this.viewer, millis);
this.scriptDelayThread.run ();
}, "~N");
$_M(c$, "getErrorLineMessage2", 
function () {
return J.script.ScriptEvaluator.getErrorLineMessage (this.functionName, this.scriptFileName, this.getLinenumber (null), this.pc, J.script.ScriptEvaluator.statementAsString (this.viewer, this.st, -9999, this.logMessages));
});
$_V(c$, "evaluateParallel", 
function (context, shapeManager) {
return this.getExtension ().evaluateParallel (context, shapeManager);
}, "J.script.ScriptContext,J.viewer.ShapeManager");
Clazz_defineStatics (c$,
"EXPRESSION_KEY", "e_x_p_r_e_s_s_i_o_n",
"scriptLevelMax", 100,
"tryPt", 0,
"ERROR_axisExpected", 0,
"ERROR_backgroundModelError", 1,
"ERROR_badArgumentCount", 2,
"ERROR_badMillerIndices", 3,
"ERROR_badRGBColor", 4,
"ERROR_booleanExpected", 5,
"ERROR_booleanOrNumberExpected", 6,
"ERROR_booleanOrWhateverExpected", 7,
"ERROR_colorExpected", 8,
"ERROR_colorOrPaletteRequired", 9,
"ERROR_commandExpected", 10,
"ERROR_coordinateOrNameOrExpressionRequired", 11,
"ERROR_drawObjectNotDefined", 12,
"ERROR_endOfStatementUnexpected", 13,
"ERROR_expressionExpected", 14,
"ERROR_expressionOrIntegerExpected", 15,
"ERROR_filenameExpected", 16,
"ERROR_fileNotFoundException", 17,
"ERROR_incompatibleArguments", 18,
"ERROR_insufficientArguments", 19,
"ERROR_integerExpected", 20,
"ERROR_integerOutOfRange", 21,
"ERROR_invalidArgument", 22,
"ERROR_invalidParameterOrder", 23,
"ERROR_keywordExpected", 24,
"ERROR_moCoefficients", 25,
"ERROR_moIndex", 26,
"ERROR_moModelError", 27,
"ERROR_moOccupancy", 28,
"ERROR_moOnlyOne", 29,
"ERROR_multipleModelsDisplayedNotOK", 30,
"ERROR_noData", 31,
"ERROR_noPartialCharges", 32,
"ERROR_noUnitCell", 33,
"ERROR_numberExpected", 34,
"ERROR_numberMustBe", 35,
"ERROR_numberOutOfRange", 36,
"ERROR_objectNameExpected", 37,
"ERROR_planeExpected", 38,
"ERROR_propertyNameExpected", 39,
"ERROR_spaceGroupNotFound", 40,
"ERROR_stringExpected", 41,
"ERROR_stringOrIdentifierExpected", 42,
"ERROR_tooManyPoints", 43,
"ERROR_tooManyScriptLevels", 44,
"ERROR_unrecognizedAtomProperty", 45,
"ERROR_unrecognizedBondProperty", 46,
"ERROR_unrecognizedCommand", 47,
"ERROR_unrecognizedExpression", 48,
"ERROR_unrecognizedObject", 49,
"ERROR_unrecognizedParameter", 50,
"ERROR_unrecognizedParameterWarning", 51,
"ERROR_unrecognizedShowParameter", 52,
"ERROR_what", 53,
"ERROR_writeWhat", 54,
"ERROR_multipleModelsNotOK", 55,
"ERROR_cannotSet", 56,
"iProcess", 0);
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.script.ScriptCompilationTokenParser", "JU.List"], "J.script.ScriptCompiler", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.M3", "$.M4", "$.PT", "$.SB", "J.api.Interface", "J.i18n.GT", "J.io.JmolBinary", "J.modelset.BondSet", "$.Group", "J.script.ContextToken", "$.SV", "$.ScriptContext", "$.ScriptEvaluator", "$.ScriptFlowContext", "$.ScriptFunction", "$.T", "J.util.Escape", "$.Logger", "$.Txt", "J.viewer.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.filename = null;
this.isSilent = false;
this.contextVariables = null;
this.aatokenCompiled = null;
this.lineNumbers = null;
this.lineIndices = null;
this.lnLength = 8;
this.preDefining = false;
this.isShowScriptOutput = false;
this.isCheckOnly = false;
this.haveComments = false;
this.scriptExtensions = null;
this.thisFunction = null;
this.flowContext = null;
this.ltoken = null;
this.lltoken = null;
this.vBraces = null;
this.ichBrace = 0;
this.cchToken = 0;
this.cchScript = 0;
this.nSemiSkip = 0;
this.parenCount = 0;
this.braceCount = 0;
this.setBraceCount = 0;
this.bracketCount = 0;
this.ptSemi = 0;
this.forPoint3 = 0;
this.setEqualPt = 0;
this.iBrace = 0;
this.iHaveQuotedString = false;
this.isEndOfCommand = false;
this.needRightParen = false;
this.endOfLine = false;
this.comment = null;
this.tokLastMath = 0;
this.checkImpliedScriptCmd = false;
this.vFunctionStack = null;
this.allowMissingEnd = false;
this.isShowCommand = false;
this.isComment = false;
this.isUserToken = false;
this.implicitString = false;
this.tokInitialPlusPlus = 0;
this.vPush = null;
this.pushCount = 0;
this.chFirst = '\0';
Clazz_instantialize (this, arguments);
}, J.script, "ScriptCompiler", J.script.ScriptCompilationTokenParser);
Clazz_prepareFields (c$, function () {
this.vPush =  new JU.List ();
});
Clazz_makeConstructor (c$, 
function (viewer) {
Clazz_superConstructor (this, J.script.ScriptCompiler, []);
this.viewer = viewer;
}, "J.viewer.Viewer");
$_M(c$, "compile", 
function (filename, script, isPredefining, isSilent, debugScript, isCheckOnly) {
this.isCheckOnly = isCheckOnly;
this.filename = filename;
this.isSilent = isSilent;
this.script = script;
this.logMessages = (!isSilent && !isPredefining && debugScript);
this.preDefining = (filename === "#predefine");
var doFull = true;
var isOK = this.compile0 (doFull);
if (!isOK) this.handleError ();
var sc =  new J.script.ScriptContext ();
isOK = (this.iBrace == 0 && this.parenCount == 0 && this.braceCount == 0 && this.bracketCount == 0);
sc.isComplete = isOK;
sc.script = script;
sc.scriptExtensions = this.scriptExtensions;
sc.errorType = this.errorType;
if (this.errorType != null) {
sc.iCommandError = this.iCommand;
this.setAaTokenCompiled ();
}sc.aatoken = this.aatokenCompiled;
sc.errorMessage = this.errorMessage;
sc.errorMessageUntranslated = (this.errorMessageUntranslated == null ? this.errorMessage : this.errorMessageUntranslated);
if (this.allowMissingEnd && sc.errorMessage != null && sc.errorMessageUntranslated.indexOf ("missing END") >= 0) sc.errorMessage = sc.errorMessageUntranslated;
sc.lineIndices = this.lineIndices;
sc.lineNumbers = this.lineNumbers;
sc.contextVariables = this.contextVariables;
return sc;
}, "~S,~S,~B,~B,~B,~B");
$_M(c$, "addContextVariable", 
function (ident) {
this.theToken = J.script.T.o (1073741824, ident);
if (this.pushCount > 0) {
var ct = this.vPush.get (this.pushCount - 1);
ct.addName (ident);
if (ct.tok != 364558) return;
}if (this.thisFunction == null) {
if (this.contextVariables == null) this.contextVariables =  new java.util.Hashtable ();
J.script.ScriptCompiler.addContextVariable (this.contextVariables, ident);
} else {
this.thisFunction.addVariable (ident, false);
}}, "~S");
c$.addContextVariable = $_M(c$, "addContextVariable", 
function (contextVariables, name) {
contextVariables.put (name, J.script.SV.newS ("").setName (name));
}, "java.util.Map,~S");
$_M(c$, "isContextVariable", 
function (ident) {
for (var i = this.vPush.size (); --i >= 0; ) {
var ct = this.vPush.get (i);
if (ct.contextVariables != null && ct.contextVariables.containsKey (ident)) return true;
}
return (this.thisFunction != null ? this.thisFunction.isVariable (ident) : this.contextVariables != null && this.contextVariables.containsKey (ident));
}, "~S");
$_M(c$, "cleanScriptComments", 
function (script) {
if (script.indexOf ('\u201C') >= 0) script = script.$replace ('\u201C', '"');
if (script.indexOf ('\u201D') >= 0) script = script.$replace ('\u201D', '"');
if (script.indexOf ('\uFEFF') >= 0) script = script.$replace ('\uFEFF', ' ');
var pt = (script.indexOf ("\1##"));
if (pt >= 0) {
this.scriptExtensions = script.substring (pt + 1);
script = script.substring (0, pt);
this.allowMissingEnd = (this.scriptExtensions.indexOf ("##noendcheck") >= 0);
}this.haveComments = (script.indexOf ("#") >= 0);
return J.io.JmolBinary.getEmbeddedScript (script);
}, "~S");
$_M(c$, "addTokenToPrefix", 
function (token) {
if (this.logMessages) J.util.Logger.debug ("addTokenToPrefix" + token);
this.ltoken.addLast (token);
if (token.tok != 0) this.lastToken = token;
}, "J.script.T");
$_M(c$, "compile0", 
function (isFull) {
this.vFunctionStack =  new JU.List ();
this.htUserFunctions =  new java.util.Hashtable ();
this.script = this.cleanScriptComments (this.script);
this.ichToken = this.script.indexOf ("# Jmol state version ");
this.isStateScript = (this.ichToken >= 0);
if (this.isStateScript) {
this.ptSemi = this.script.indexOf (";", this.ichToken);
if (this.ptSemi >= this.ichToken) this.viewer.setStateScriptVersion (this.script.substring (this.ichToken + "# Jmol state version ".length, this.ptSemi).trim ());
}this.cchScript = this.script.length;
this.contextVariables = null;
this.lineNumbers = null;
this.lineIndices = null;
this.aatokenCompiled = null;
this.thisFunction = null;
this.flowContext = null;
this.errorType = null;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorLine = null;
this.nSemiSkip = 0;
this.ichToken = 0;
this.ichCurrentCommand = 0;
this.ichComment = 0;
this.ichBrace = 0;
this.lineCurrent = 1;
this.iCommand = 0;
this.tokLastMath = 0;
this.lastToken = J.script.T.tokenOff;
this.vBraces =  new JU.List ();
this.vPush =  new JU.List ();
this.pushCount = 0;
this.iBrace = 0;
this.braceCount = 0;
this.parenCount = 0;
this.ptSemi = -10;
this.cchToken = 0;
this.lnLength = 8;
this.lineNumbers =  Clazz_newShortArray (this.lnLength, 0);
this.lineIndices =  Clazz_newIntArray (this.lnLength, 2, 0);
this.isNewSet = this.isSetBrace = false;
this.ptNewSetModifier = 1;
this.isShowScriptOutput = false;
this.iHaveQuotedString = false;
this.checkImpliedScriptCmd = false;
this.lltoken =  new JU.List ();
this.ltoken =  new JU.List ();
this.tokCommand = 0;
this.lastFlowCommand = null;
this.tokenAndEquals = null;
this.tokInitialPlusPlus = 0;
this.setBraceCount = 0;
this.bracketCount = 0;
this.forPoint3 = -1;
this.setEqualPt = 2147483647;
this.endOfLine = false;
this.comment = null;
this.isEndOfCommand = false;
this.needRightParen = false;
this.theTok = 0;
var iLine = 1;
for (; true; this.ichToken += this.cchToken) {
if ((this.nTokens = this.ltoken.size ()) == 0) {
if (this.thisFunction != null && this.thisFunction.chpt0 == 0) this.thisFunction.chpt0 = this.ichToken;
this.ichCurrentCommand = this.ichToken;
iLine = this.lineCurrent;
}if (this.lookingAtLeadingWhitespace ()) continue;
this.endOfLine = false;
if (!this.isEndOfCommand) {
this.endOfLine = this.lookingAtEndOfLine ();
switch (this.endOfLine ? 0 : this.lookingAtComment ()) {
case 2:
continue;
case 3:
this.isEndOfCommand = true;
continue;
case 1:
this.isEndOfCommand = true;
this.comment = this.script.substring (this.ichToken, this.ichToken + this.cchToken).trim ();
break;
}
this.isEndOfCommand = this.isEndOfCommand || this.endOfLine || this.lookingAtTerminator ();
}if (this.isEndOfCommand) {
this.isEndOfCommand = false;
switch (this.processTokenList (iLine, isFull)) {
case 2:
continue;
case 4:
return false;
}
this.checkImpliedScriptCmd = false;
if (this.ichToken < this.cchScript) continue;
this.setAaTokenCompiled ();
return (this.flowContext == null || this.errorStr (11, J.script.T.nameOf (this.flowContext.token.tok)));
}if (this.nTokens > 0) {
switch (this.checkSpecialParameterSyntax ()) {
case 2:
continue;
case 4:
return false;
}
}if (this.lookingAtLookupToken (this.ichToken)) {
var ident = this.getPrefixToken ();
switch (this.parseKnownToken (ident)) {
case 2:
continue;
case 4:
return false;
}
switch (this.parseCommandParameter (ident)) {
case 2:
continue;
case 4:
return false;
}
this.addTokenToPrefix (this.theToken);
continue;
}if (this.nTokens == 0 || (this.isNewSet || this.isSetBrace) && this.nTokens == this.ptNewSetModifier) {
if (this.nTokens == 0) {
if (this.lookingAtString (true)) {
this.addTokenToPrefix (this.setCommand (J.script.T.tokenScript));
this.cchToken = 0;
continue;
}if (this.lookingAtImpliedString (true, true, true)) this.ichEnd = this.ichToken + this.cchToken;
}return this.commandExpected ();
}return this.errorStr (19, this.script.substring (this.ichToken, this.ichToken + 1));
}
}, "~B");
$_M(c$, "setAaTokenCompiled", 
function () {
this.aatokenCompiled = this.lltoken.toArray ( new Array (this.lltoken.size ()));
});
$_M(c$, "lookingAtLeadingWhitespace", 
function () {
var ichT = this.ichToken;
while (J.script.ScriptCompiler.isSpaceOrTab (this.charAt (ichT))) ++ichT;

if (this.isLineContinuation (ichT, true)) ichT += 1 + this.nCharNewLine (ichT + 1);
this.cchToken = ichT - this.ichToken;
return this.cchToken > 0;
});
$_M(c$, "isLineContinuation", 
function (ichT, checkMathop) {
var isEscaped = (ichT + 2 < this.cchScript && this.script.charAt (ichT) == '\\' && this.nCharNewLine (ichT + 1) > 0 || checkMathop && this.lookingAtMathContinuation (ichT));
if (isEscaped) this.lineCurrent++;
return isEscaped;
}, "~N,~B");
$_M(c$, "lookingAtMathContinuation", 
function (ichT) {
var n;
if ((n = this.nCharNewLine (ichT)) == 0 || this.lastToken.tok == 1048586) return false;
if (this.parenCount > 0 || this.bracketCount > 0) return true;
if ((this.tokCommand != 1085443 || !this.isNewSet) && this.tokCommand != 36865 && this.tokCommand != 36869) return false;
if (this.lastToken.tok == this.tokLastMath) return true;
ichT += n;
while (J.script.ScriptCompiler.isSpaceOrTab (this.charAt (ichT))) ++ichT;

return (this.lookingAtLookupToken (ichT) && this.tokLastMath == 1);
}, "~N");
$_M(c$, "lookingAtEndOfLine", 
function () {
if (this.ichToken >= this.cchScript) {
this.ichEnd = this.cchScript;
return true;
}return ((this.cchToken = this.nCharNewLine (this.ichEnd = this.ichToken)) > 0);
});
$_M(c$, "nCharNewLine", 
function (ichT) {
var ch;
return ((ch = this.charAt (ichT)) != '\r' ? (ch == '\n' ? 1 : 0) : this.charAt (++ichT) == '\n' ? 2 : 1);
}, "~N");
$_M(c$, "lookingAtTerminator", 
function () {
var isSemi = (this.script.charAt (this.ichToken) == ';');
if (isSemi && this.nTokens > 0) this.ptSemi = this.nTokens;
if (!isSemi || this.nSemiSkip-- > 0) return false;
this.cchToken = 1;
return true;
});
$_M(c$, "lookingAtComment", 
function () {
var ch = this.script.charAt (this.ichToken);
var ichT = this.ichToken;
var ichFirstSharp = -1;
if (this.ichToken == this.ichCurrentCommand && ch == '$' && (this.isShowScriptOutput || this.ichToken == 0)) {
this.isShowScriptOutput = true;
this.isShowCommand = true;
if (this.charAt (++ichT) == '[') while (ch != ']' && !this.eol (ch = this.charAt (ichT))) ++ichT;

this.cchToken = ichT - this.ichToken;
return 2;
} else if (this.isShowScriptOutput && !this.isShowCommand) {
ichFirstSharp = ichT;
}if (ch == '/' && ichT + 1 < this.cchScript) switch (this.script.charAt (++ichT)) {
case '/':
ichFirstSharp = this.ichToken;
this.ichEnd = ichT - 1;
break;
case '*':
this.ichEnd = ichT - 1;
var terminator = ((ch = this.charAt (++ichT)) == '*' ? "**/" : "*/");
ichT = this.script.indexOf (terminator, this.ichToken + 2);
if (ichT < 0) {
this.ichToken = this.cchScript;
return 3;
}this.incrementLineCount (this.script.substring (this.ichToken, ichT));
this.cchToken = ichT + (ch == '*' ? 3 : 2) - this.ichToken;
return 2;
default:
return 0;
}
var isSharp = (ichFirstSharp < 0);
if (isSharp && !this.haveComments) return 0;
if (this.ichComment > ichT) ichT = this.ichComment;
for (; ichT < this.cchScript; ichT++) {
if (this.eol (ch = this.script.charAt (ichT))) {
this.ichEnd = ichT;
if (ichT > 0 && this.isLineContinuation (ichT - 1, false)) {
ichT += this.nCharNewLine (ichT);
continue;
}if (!isSharp && ch == ';') continue;
break;
}if (ichFirstSharp >= 0) continue;
if (ch == '#') ichFirstSharp = ichT;
}
if (ichFirstSharp < 0) return 0;
this.ichComment = ichFirstSharp;
if (isSharp && this.nTokens == 0 && this.cchScript - ichFirstSharp >= 3 && this.script.charAt (ichFirstSharp + 1) == 'j' && this.script.charAt (ichFirstSharp + 2) == 'c') {
this.cchToken = ichT - this.ichToken;
return 2;
}if (ichFirstSharp != this.ichToken) return 0;
if (isSharp && this.cchScript > this.ichToken + 3 && this.script.charAt (this.ichToken + 1) == 'j' && this.script.charAt (this.ichToken + 2) == 'x' && J.script.ScriptCompiler.isSpaceOrTab (this.script.charAt (this.ichToken + 3))) {
this.cchToken = 4;
return 2;
}if (ichT == this.ichToken) return 0;
this.cchToken = ichT - this.ichToken;
return (this.nTokens == 0 ? 1 : 2);
});
$_M(c$, "charAt", 
function (i) {
return (i < this.cchScript ? this.script.charAt (i) : '\0');
}, "~N");
$_M(c$, "processTokenList", 
function (iLine, doCompile) {
if (this.nTokens > 0 || this.comment != null) {
if (this.nTokens == 0) {
this.ichCurrentCommand = this.ichToken;
if (this.comment != null) {
this.isComment = true;
this.addTokenToPrefix (J.script.T.o (0, this.comment));
}} else if (this.setBraceCount > 0 && this.endOfLine && this.ichToken < this.cchScript) {
return 2;
}if (this.tokCommand == 135271429 && this.checkImpliedScriptCmd) {
var s = (this.nTokens == 2 ? this.lastToken.value.toString ().toUpperCase () : null);
if (this.nTokens > 2 && !(this.tokAt (2) == 269484048 && this.ltoken.get (1).value.toString ().endsWith (".spt")) || s != null && (s.endsWith (".SORT") || s.endsWith (".REVERSE") || s.indexOf (".SORT(") >= 0 || s.indexOf (".REVERSE(") >= 0 || s.indexOf (".POP(") >= 0 || s.indexOf (".PUSH(") >= 0)) {
this.ichToken = this.ichCurrentCommand;
this.nTokens = 0;
this.ltoken.clear ();
this.cchToken = 0;
this.tokCommand = 0;
return 2;
}}if (this.isNewSet && this.nTokens > 2 && this.tokAt (2) == 1048584 && (this.tokAt (3) == 1276117011 || this.tokAt (3) == 1141899269 || this.tokAt (3) == 1276383749 || this.tokAt (3) == 1276383249)) {
this.ltoken.set (0, J.script.T.tokenSet);
this.ltoken.add (1, this.tokAt (3) == 1276383249 ? J.script.T.tokenAll : this.ltoken.get (1));
} else if (this.tokInitialPlusPlus != 0) {
if (!this.isNewSet) this.checkNewSetCommand ();
this.tokenizePlusPlus (this.tokInitialPlusPlus, true);
}this.iCommand = this.lltoken.size ();
if (this.thisFunction != null && this.thisFunction.cmdpt0 < 0) {
this.thisFunction.cmdpt0 = this.iCommand;
}if (this.nTokens == 1 && this.braceCount == 1) {
if (this.lastFlowCommand == null) {
this.parenCount = this.setBraceCount = this.braceCount = 0;
this.ltoken.remove (0);
this.iBrace++;
var t = J.script.ContextToken.newContext (true);
this.addTokenToPrefix (this.setCommand (t));
this.pushCount++;
this.vPush.addLast (t);
this.vBraces.addLast (this.tokenCommand);
} else {
this.parenCount = this.setBraceCount = 0;
this.setCommand (this.lastFlowCommand);
if (this.lastFlowCommand.tok != 102439 && (this.tokAt (0) == 1048586)) this.ltoken.remove (0);
this.lastFlowCommand = null;
}}if (this.bracketCount > 0 || this.setBraceCount > 0 || this.parenCount > 0 || this.braceCount == 1 && !this.checkFlowStartBrace (true)) {
this.error (this.nTokens == 1 ? 2 : 4);
return 4;
}if (this.needRightParen) {
this.addTokenToPrefix (J.script.T.tokenRightParen);
this.needRightParen = false;
}if (this.ltoken.size () > 0) {
if (doCompile && !this.compileCommand ()) return 4;
if (this.logMessages) {
J.util.Logger.debug ("-------------------------------------");
}var doEval = true;
switch (this.tokCommand) {
case 364558:
case 102436:
case 135368713:
case 1150985:
doEval = (this.atokenInfix.length > 0 && this.atokenInfix[0].intValue != 2147483647);
break;
}
if (doEval) {
if (this.iCommand == this.lnLength) {
this.lineNumbers = JU.AU.doubleLengthShort (this.lineNumbers);
var lnI =  Clazz_newIntArray (this.lnLength * 2, 2, 0);
System.arraycopy (this.lineIndices, 0, lnI, 0, this.lnLength);
this.lineIndices = lnI;
this.lnLength *= 2;
}this.lineNumbers[this.iCommand] = iLine;
this.lineIndices[this.iCommand][0] = this.ichCurrentCommand;
this.lineIndices[this.iCommand][1] = Math.max (this.ichCurrentCommand, Math.min (this.cchScript, this.ichEnd == this.ichCurrentCommand ? this.ichToken : this.ichEnd));
this.lltoken.addLast (this.atokenInfix);
this.iCommand = this.lltoken.size ();
}if (this.tokCommand == 1085443) this.lastFlowCommand = null;
}this.setCommand (null);
this.comment = null;
this.iHaveQuotedString = this.isNewSet = this.isSetBrace = this.needRightParen = false;
this.ptNewSetModifier = 1;
this.ltoken.clear ();
this.nTokens = this.nSemiSkip = 0;
this.tokInitialPlusPlus = 0;
this.tokenAndEquals = null;
this.ptSemi = -10;
this.forPoint3 = -1;
this.setEqualPt = 2147483647;
}if (this.endOfLine) {
if (this.flowContext != null && this.flowContext.checkForceEndIf ()) {
if (!this.isComment) this.forceFlowEnd (this.flowContext.token);
this.isEndOfCommand = true;
this.cchToken = 0;
this.ichCurrentCommand = this.ichToken;
this.lineCurrent--;
return 2;
}this.isComment = false;
this.isShowCommand = false;
++this.lineCurrent;
}if (this.ichToken >= this.cchScript) {
this.setCommand (J.script.T.tokenAll);
this.theTok = 0;
switch (this.checkFlowEndBrace ()) {
case 4:
return 4;
case 2:
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}
this.ichToken = this.cchScript;
return 0;
}return 0;
}, "~N,~B");
$_M(c$, "compileCommand", 
function () {
switch (this.ltoken.size ()) {
case 0:
this.atokenInfix =  new Array (0);
return true;
case 4:
if (this.isNewSet && this.tokenAt (2).value.equals (".") && this.tokenAt (3).value.equals ("spt")) {
var fname = this.tokenAt (1).value + "." + this.tokenAt (3).value;
this.ltoken.clear ();
this.addTokenToPrefix (J.script.T.tokenScript);
this.addTokenToPrefix (J.script.T.o (4, fname));
this.isNewSet = false;
}}
this.setCommand (this.tokenAt (0));
var size = this.ltoken.size ();
if (size == 1 && J.script.T.tokAttr (this.tokCommand, 524288)) this.addTokenToPrefix (J.script.T.tokenOn);
if (this.tokenAndEquals != null) {
var j;
var i = 0;
for (i = 1; i < size; i++) {
if ((j = this.tokAt (i)) == 269484242) break;
}
size = i;
i++;
if (this.ltoken.size () < i) {
J.util.Logger.error ("COMPILER ERROR! - andEquals ");
} else {
for (j = 1; j < size; j++, i++) this.ltoken.add (i, this.tokenAt (j));

this.ltoken.set (size, J.script.T.tokenEquals);
this.ltoken.add (i, this.tokenAndEquals);
this.ltoken.add (++i, J.script.T.tokenLeftParen);
this.addTokenToPrefix (J.script.T.tokenRightParen);
}}this.atokenInfix = this.ltoken.toArray ( new Array (size = this.ltoken.size ()));
if (this.logMessages) {
J.util.Logger.debug ("token list:");
for (var i = 0; i < this.atokenInfix.length; i++) J.util.Logger.debug (i + ": " + this.atokenInfix[i]);

J.util.Logger.debug ("vBraces list:");
for (var i = 0; i < this.vBraces.size (); i++) J.util.Logger.debug (i + ": " + this.vBraces.get (i));

J.util.Logger.debug ("-------------------------------------");
}return this.compileExpressions ();
});
$_M(c$, "tokenAt", 
function (i) {
return this.ltoken.get (i);
}, "~N");
$_V(c$, "tokAt", 
function (i) {
return (i < this.ltoken.size () ? this.tokenAt (i).tok : 0);
}, "~N");
$_M(c$, "setCommand", 
function (token) {
this.tokenCommand = token;
if (token == null) {
this.tokCommand = 0;
} else {
this.tokCommand = this.tokenCommand.tok;
this.isMathExpressionCommand = (this.tokCommand == 1073741824 || J.script.T.tokAttr (this.tokCommand, 36864));
this.isSetOrDefine = (this.tokCommand == 1085443 || this.tokCommand == 1060866);
this.isCommaAsOrAllowed = J.script.T.tokAttr (this.tokCommand, 12288);
this.implicitString = J.script.T.tokAttr (this.tokCommand, 20480);
}return token;
}, "J.script.T");
$_M(c$, "replaceCommand", 
function (token) {
this.ltoken.remove (0);
this.ltoken.add (0, this.setCommand (token));
}, "J.script.T");
$_M(c$, "getPrefixToken", 
function () {
var ident = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var identLC = ident.toLowerCase ();
var isUserVar = this.isContextVariable (identLC);
if (this.nTokens == 0) this.isUserToken = isUserVar;
if (this.nTokens == 1 && (this.tokCommand == 135368713 || this.tokCommand == 102436 || this.tokCommand == 36868) || this.nTokens != 0 && isUserVar || this.isUserFunction (identLC) && (this.thisFunction == null || !this.thisFunction.name.equals (identLC))) {
ident = identLC;
this.theToken = null;
} else if (ident.length == 1 || this.lastToken.tok == 269484066) {
if ((this.theToken = J.script.T.getTokenFromName (ident)) == null && (this.theToken = J.script.T.getTokenFromName (identLC)) != null) this.theToken = J.script.T.tv (this.theToken.tok, this.theToken.intValue, ident);
} else {
ident = identLC;
this.theToken = J.script.T.getTokenFromName (ident);
}if (this.theToken == null) {
if (ident.indexOf ("property_") == 0) this.theToken = J.script.T.o (1716520985, ident);
 else this.theToken = J.script.T.o (1073741824, ident);
}this.theTok = this.theToken.tok;
return ident;
});
$_M(c$, "checkSpecialParameterSyntax", 
function () {
if (this.lookingAtString (!this.implicitString)) {
if (this.cchToken < 0) return this.ERROR (4);
var str = this.getUnescapedStringLiteral (this.lastToken != null && !this.iHaveQuotedString && this.lastToken.tok != 1073741983 && (this.tokCommand == 1085443 && this.nTokens == 2 && this.lastToken.tok == 545259546 || this.tokCommand == 135271426 || this.tokCommand == 1610616835 || this.tokCommand == 135271429));
this.iHaveQuotedString = true;
if (this.tokCommand == 135271426 && this.lastToken.tok == 135270407 || this.tokCommand == 135270407 && str.indexOf ("@") < 0) {
if (!this.getData (str)) {
return this.ERROR (11, "data");
}} else {
this.addTokenToPrefix (J.script.T.o (4, str));
if (this.implicitString) {
this.ichEnd = this.ichToken + this.cchToken;
this.isEndOfCommand = true;
}}return 2;
}if (this.lastToken.tok == 1074790550 && this.lookingAtImpliedString (false, false, false)) {
this.addTokenToPrefix (J.script.T.o (4, this.script.substring (this.ichToken, this.ichToken + this.cchToken)));
return 2;
}var ch;
if (this.nTokens == this.ptNewSetModifier) {
ch = this.script.charAt (this.ichToken);
var isAndEquals = ("+-\\*/&|=".indexOf (ch) >= 0);
var isOperation = (isAndEquals || ch == '.' || ch == '[');
var ch2 = this.charAt (this.ichToken + 1);
if (!this.isNewSet && this.isUserToken && isOperation && (ch == '=' || ch2 == ch || ch2 == '=')) {
this.isNewSet = true;
}if (this.isNewSet || this.tokCommand == 1085443 || J.script.T.tokAttr (this.tokCommand, 536870912)) {
if (ch == '=') this.setEqualPt = this.ichToken;
if (J.script.T.tokAttr (this.tokCommand, 536870912) && ch == '=' || (this.isNewSet || this.isSetBrace) && isOperation) {
this.setCommand (isAndEquals ? J.script.T.tokenSet : ch == '[' && !this.isSetBrace ? J.script.T.tokenSetArray : J.script.T.tokenSetProperty);
this.ltoken.add (0, this.tokenCommand);
this.cchToken = 1;
switch (ch) {
case '[':
this.addTokenToPrefix (J.script.T.o (269484096, "["));
this.bracketCount++;
return 2;
case '.':
this.addTokenToPrefix (J.script.T.o (1048584, "."));
return 2;
case '-':
case '+':
case '*':
case '/':
case '\\':
case '&':
case '|':
if (ch2.charCodeAt (0) == 0) return this.ERROR (4);
if (ch2 != ch && ch2 != '=') return this.ERROR (1, "\"" + ch + "\"");
break;
default:
this.lastToken = J.script.T.tokenMinus;
return 2;
}
}}}switch (this.tokCommand) {
case 135271426:
case 135271429:
case 135270410:
if (this.script.charAt (this.ichToken) == '@') {
this.iHaveQuotedString = true;
return 0;
}if (this.tokCommand == 135271426) {
if ((this.nTokens == 1 || this.nTokens == 2 && this.tokAt (1) == 1073741839) && this.lookingAtLoadFormat ()) {
var strFormat = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var token = J.script.T.getTokenFromName (strFormat.toLowerCase ());
switch (token == null ? 0 : token.tok) {
case 1073742015:
case 1073741839:
if (this.nTokens != 1) return 4;
case 135270407:
case 1229984263:
case 1073741983:
case 1095766030:
case 135267336:
case 536870926:
case 4156:
this.addTokenToPrefix (token);
break;
default:
var tok = (strFormat.indexOf ("=") == 0 || strFormat.indexOf ("$") == 0 ? 4 : JU.PT.isOneOf (strFormat = strFormat.toLowerCase (), ";xyz;vxyz;vibration;temperature;occupancy;partialcharge;") ? 1073741824 : 0);
if (tok != 0) {
this.addTokenToPrefix (J.script.T.o (tok, strFormat));
this.iHaveQuotedString = (tok == 4);
}}
return 2;
}var bs;
if (this.script.charAt (this.ichToken) == '{' || this.parenCount > 0) break;
if ((bs = this.lookingAtBitset ()) != null) {
this.addTokenToPrefix (J.script.T.o (10, bs));
return 2;
}}if (!this.iHaveQuotedString && this.lookingAtImpliedString (false, this.tokCommand == 135271426, this.nTokens > 1 || this.tokCommand != 135271429)) {
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 135271429) {
if (str.startsWith ("javascript:")) {
this.lookingAtImpliedString (true, true, true);
str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
} else if (str.toUpperCase ().indexOf (".PUSH(") >= 0) {
this.cchToken = 0;
this.iHaveQuotedString = true;
return 2;
}}this.iHaveQuotedString = true;
this.addTokenToPrefix (J.script.T.o (4, str));
return 2;
}break;
case 4156:
if (this.nTokens == 1 && this.lookForSyncID ()) {
var ident = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
var iident = JU.PT.parseInt (ident);
if (iident == -2147483648 || Math.abs (iident) < 1000) this.addTokenToPrefix (J.script.T.o (1073741824, ident));
 else this.addTokenToPrefix (J.script.T.i (iident));
return 2;
}break;
case 135270422:
if (this.nTokens == 2 && this.lastToken.tok == 4115) this.iHaveQuotedString = true;
if (!this.iHaveQuotedString) {
if (this.script.charAt (this.ichToken) == '@') {
this.iHaveQuotedString = true;
return 0;
}if (this.lookingAtImpliedString (true, true, true)) {
var pt = this.cchToken;
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (str.indexOf (" ") < 0) {
this.addTokenToPrefix (J.script.T.o (4, str));
this.iHaveQuotedString = true;
return 2;
}this.cchToken = pt;
}}break;
}
if (this.implicitString && !(this.tokCommand == 135271429 && this.iHaveQuotedString) && this.lookingAtImpliedString (true, true, true)) {
var str = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 1826248715 && JU.PT.isOneOf (str.toLowerCase (), "on;off;hide;display")) this.addTokenToPrefix (J.script.T.getTokenFromName (str.toLowerCase ()));
 else this.addTokenToPrefix (J.script.T.o (4, str));
return 2;
}if (this.lookingAtObjectID ()) {
this.addTokenToPrefix (J.script.T.getTokenFromName ("$"));
this.addTokenToPrefix (J.script.T.o (1073741824, this.script.substring (this.ichToken, this.ichToken + this.cchToken)));
return 2;
}var value;
if (!Float.isNaN (value = this.lookingAtExponential ())) {
this.addTokenToPrefix (J.script.T.o (3, Float.$valueOf (value)));
return 2;
}if (this.lookingAtDecimal ()) {
value = JU.PT.fVal (this.script.substring (this.ichToken, this.ichToken + this.cchToken));
var intValue = (J.script.ScriptEvaluator.getFloatEncodedInt (this.script.substring (this.ichToken, this.ichToken + this.cchToken)));
this.addTokenToPrefix (J.script.T.tv (3, intValue, Float.$valueOf (value)));
return 2;
}if (this.lookingAtSeqcode ()) {
ch = this.script.charAt (this.ichToken);
try {
var seqNum = (ch == '*' || ch == '^' ? 2147483647 : Integer.parseInt (this.script.substring (this.ichToken, this.ichToken + this.cchToken - 2)));
var insertionCode = this.script.charAt (this.ichToken + this.cchToken - 1);
if (insertionCode == '^') insertionCode = ' ';
if (seqNum < 0) {
seqNum = -seqNum;
this.addTokenToPrefix (J.script.T.tokenMinus);
}var seqcode = J.modelset.Group.getSeqcodeFor (seqNum, insertionCode);
this.addTokenToPrefix (J.script.T.tv (5, seqcode, "seqcode"));
} catch (nfe) {
if (Clazz_exceptionOf (nfe, NumberFormatException)) {
return this.ERROR (9, "" + ch);
} else {
throw nfe;
}
}
return 2;
}var val = this.lookingAtInteger ();
if (val != 2147483647) {
var intString = this.script.substring (this.ichToken, this.ichToken + this.cchToken);
if (this.tokCommand == 102407 || this.tokCommand == 102408) {
if (this.nTokens != 1) return this.ERROR (0);
var f = (this.flowContext == null ? null : this.flowContext.getBreakableContext (val = Math.abs (val)));
if (f == null) return this.ERROR (1, this.tokenCommand.value);
this.tokenAt (0).intValue = f.pt0;
}if (val == 0 && intString.equals ("-0")) this.addTokenToPrefix (J.script.T.tokenMinus);
this.addTokenToPrefix (J.script.T.tv (2, val, intString));
return 2;
}if (!this.isMathExpressionCommand && this.parenCount == 0 || this.lastToken.tok != 1073741824 && !J.script.ScriptCompilationTokenParser.tokenAttr (this.lastToken, 135266304)) {
var isBondOrMatrix = (this.script.charAt (this.ichToken) == '[');
var bs = this.lookingAtBitset ();
if (bs != null) {
this.addTokenToPrefix (J.script.T.o (10, isBondOrMatrix ?  new J.modelset.BondSet (bs) : bs));
return 2;
}if (isBondOrMatrix) {
var m = this.lookingAtMatrix ();
if (Clazz_instanceOf (m, JU.M3) || Clazz_instanceOf (m, JU.M4)) {
this.addTokenToPrefix (J.script.T.o ((Clazz_instanceOf (m, JU.M3) ? 11 : 12), m));
return 2;
}}}return 0;
});
$_M(c$, "lookingAtMatrix", 
function () {
var ipt;
var m;
if (this.ichToken + 4 >= this.cchScript || this.script.charAt (this.ichToken) != '[' || this.script.charAt (this.ichToken + 1) != '[' || (ipt = this.script.indexOf ("]]", this.ichToken)) < 0 || (m = J.util.Escape.unescapeMatrix (this.script.substring (this.ichToken, ipt + 2))) == null) return null;
this.cchToken = ipt + 2 - this.ichToken;
return m;
});
$_M(c$, "parseKnownToken", 
function (ident) {
var token;
if (this.tokLastMath != 0) this.tokLastMath = this.theTok;
if (this.flowContext != null && this.flowContext.token.tok == 102410 && this.flowContext.$var != null && this.theTok != 102411 && this.theTok != 102413 && this.lastToken.tok != 102410) return this.ERROR (1, ident);
if (this.lastToken.tok == 1060866 && this.theTok != 1048586 && this.nTokens != 1) {
this.addTokenToPrefix (J.script.T.o (4, ident));
return 2;
}switch (this.theTok) {
case 1073741824:
if (this.nTokens == 0 && !this.checkImpliedScriptCmd) {
if (ident.charAt (0) == '\'') {
this.addTokenToPrefix (this.setCommand (J.script.T.tokenScript));
this.cchToken = 0;
return 2;
}if (this.charAt (this.ichToken + this.cchToken) == '.') {
this.addTokenToPrefix (this.setCommand (J.script.T.tokenScript));
this.nTokens = 1;
this.cchToken = 0;
this.checkImpliedScriptCmd = true;
return 2;
}}break;
case 269484242:
if (this.nSemiSkip == this.forPoint3 && this.nTokens == this.ptSemi + 2) {
token = this.lastToken;
this.addTokenToPrefix (J.script.T.tokenEquals);
this.addTokenToPrefix (token);
token = J.script.T.getTokenFromName (ident.substring (0, 1));
this.addTokenToPrefix (token);
this.addTokenToPrefix (J.script.T.tokenLeftParen);
this.needRightParen = true;
return 2;
}this.checkNewSetCommand ();
if (this.tokCommand == 1085443) {
this.tokenAndEquals = J.script.T.getTokenFromName (ident.substring (0, 1));
this.setEqualPt = this.ichToken;
return 0;
}if (this.tokCommand == 554176565 || this.tokCommand == 554176526) {
this.addTokenToPrefix (this.tokenCommand);
this.replaceCommand (J.script.T.tokenSet);
this.tokenAndEquals = J.script.T.getTokenFromName (ident.substring (0, 1));
this.setEqualPt = this.ichToken;
return 0;
}return 2;
case 1150985:
case 364548:
if (this.flowContext != null) this.flowContext.forceEndIf = false;
case 364547:
if (this.nTokens > 0) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 135369224:
if (this.bracketCount > 0) break;
case 102411:
case 102413:
case 102402:
case 135369225:
case 102410:
case 102406:
case 102412:
if (this.nTokens > 1 && this.tokCommand != 1085443) {
this.isEndOfCommand = true;
if (this.flowContext != null) this.flowContext.forceEndIf = true;
this.cchToken = 0;
return 2;
}break;
case 269484225:
case 269484226:
if (!this.isNewSet && this.nTokens == 1) this.checkNewSetCommand ();
if (this.isNewSet && this.parenCount == 0 && this.bracketCount == 0 && this.ichToken <= this.setEqualPt) {
this.tokenizePlusPlus (this.theTok, false);
return 2;
} else if (this.nSemiSkip == this.forPoint3 && this.nTokens == this.ptSemi + 2) {
token = this.lastToken;
this.addTokenToPrefix (J.script.T.tokenEquals);
this.addTokenToPrefix (token);
this.addTokenToPrefix (this.theTok == 269484225 ? J.script.T.tokenMinus : J.script.T.tokenPlus);
this.addTokenToPrefix (J.script.T.i (1));
return 2;
}break;
case 269484436:
if (this.parenCount == 0 && this.bracketCount == 0) this.setEqualPt = this.ichToken;
break;
case 1048584:
if (this.tokCommand == 1085443 && this.parenCount == 0 && this.bracketCount == 0 && this.ichToken < this.setEqualPt) {
this.ltoken.add (1, J.script.T.tokenExpressionBegin);
this.addTokenToPrefix (J.script.T.tokenExpressionEnd);
this.ltoken.set (0, J.script.T.tokenSetProperty);
this.setEqualPt = 0;
}break;
case 1048586:
this.braceCount++;
if (this.braceCount == 1 && this.parenCount == 0 && this.checkFlowStartBrace (false)) {
this.isEndOfCommand = true;
if (this.flowContext != null) this.flowContext.forceEndIf = false;
return 2;
}case 269484048:
this.parenCount++;
if (this.nTokens > 1 && (this.lastToken.tok == 135280132 || this.lastToken.tok == 135369224 || this.lastToken.tok == 135369225)) this.nSemiSkip += 2;
break;
case 1048590:
if (this.iBrace > 0 && this.parenCount == 0 && this.braceCount == 0) {
this.ichBrace = this.ichToken;
if (this.nTokens == 0) {
this.braceCount = this.parenCount = 1;
} else {
this.braceCount = this.parenCount = this.nSemiSkip = 0;
if (this.theToken.tok != 102411 && this.theToken.tok != 102413) this.vBraces.addLast (this.theToken);
this.iBrace++;
this.isEndOfCommand = true;
this.ichEnd = this.ichToken;
return 2;
}}this.braceCount--;
case 269484049:
this.parenCount--;
if (this.parenCount < 0) return this.ERROR (16, ident);
if (this.parenCount == 0) this.nSemiSkip = 0;
if (this.needRightParen) {
this.addTokenToPrefix (J.script.T.tokenRightParen);
this.needRightParen = false;
}break;
case 269484096:
if (this.ichToken > 0 && Character.isWhitespace (this.script.charAt (this.ichToken - 1))) this.addTokenToPrefix (J.script.T.tokenSpaceBeforeSquare);
this.bracketCount++;
break;
case 269484097:
this.bracketCount--;
if (this.bracketCount < 0) return this.ERROR (16, "]");
}
return 0;
}, "~S");
$_M(c$, "tokenizePlusPlus", 
function (tok, isPlusPlusX) {
if (isPlusPlusX) {
this.setCommand (J.script.T.tokenSet);
this.ltoken.add (0, this.tokenCommand);
}this.nTokens = this.ltoken.size ();
this.addTokenToPrefix (J.script.T.tokenEquals);
this.setEqualPt = 0;
for (var i = 1; i < this.nTokens; i++) this.addTokenToPrefix (this.ltoken.get (i));

this.addTokenToPrefix (tok == 269484225 ? J.script.T.tokenMinus : J.script.T.tokenPlus);
this.addTokenToPrefix (J.script.T.i (1));
}, "~N,~B");
$_M(c$, "checkNewSetCommand", 
function () {
var name = this.ltoken.get (0).value.toString ();
if (!this.isContextVariable (name.toLowerCase ())) return false;
var t = this.setNewSetCommand (false, name);
this.setCommand (J.script.T.tokenSet);
this.ltoken.add (0, this.tokenCommand);
this.ltoken.set (1, t);
return true;
});
$_M(c$, "parseCommandParameter", 
function (ident) {
this.nTokens = this.ltoken.size ();
switch (this.tokCommand) {
case 0:
this.lastToken = J.script.T.tokenOff;
this.ichCurrentCommand = this.ichEnd = this.ichToken;
this.setCommand (this.theToken);
if (J.script.T.tokAttr (this.tokCommand, 102400)) {
this.lastFlowCommand = this.tokenCommand;
}var ret = this.checkFlowEndBrace ();
if (ret == 4) return 4;
 else if (ret == 2) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}if (J.script.T.tokAttr (this.tokCommand, 102400)) {
if (!this.checkFlowCommand (this.tokenCommand.value)) return 4;
this.theToken = this.tokenCommand;
if (this.theTok == 102411) {
this.addTokenToPrefix (this.tokenCommand);
this.theToken = J.script.T.tokenLeftParen;
}break;
}if (this.theTok == 269484066) {
this.braceCount++;
this.isEndOfCommand = true;
break;
}if (this.theTok == 1048590) {
this.vBraces.addLast (this.tokenCommand);
this.iBrace++;
this.tokCommand = 0;
return 2;
}if (this.theTok != 1048586) this.lastFlowCommand = null;
if (J.script.T.tokAttr (this.tokCommand, 4096)) break;
this.isSetBrace = (this.theTok == 1048586);
if (this.isSetBrace) {
if (!this.lookingAtSetBraceSyntax ()) {
this.isEndOfCommand = true;
if (this.flowContext != null) this.flowContext.forceEndIf = false;
}} else {
switch (this.theTok) {
case 269484226:
case 269484225:
this.tokInitialPlusPlus = this.theTok;
this.tokCommand = 0;
return 2;
case 1073741824:
case 36868:
case 1060866:
case 269484048:
break;
default:
if (!J.script.T.tokAttr (this.theTok, 1073741824) && !J.script.T.tokAttr (this.theTok, 536870912) && !this.isContextVariable (ident)) {
this.commandExpected ();
return 4;
}}
}this.theToken = this.setNewSetCommand (this.isSetBrace, ident);
break;
case 102412:
switch (this.nTokens) {
case 1:
if (this.theTok != 269484048) return this.ERROR (15, "(");
break;
case 2:
if (this.theTok != 269484049) (this.tokenCommand).name0 = ident;
this.addContextVariable (ident);
break;
case 3:
if (this.theTok != 269484049) return this.ERROR (15, ")");
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
break;
default:
return this.ERROR (0);
}
break;
case 102436:
case 135368713:
if (this.tokenCommand.intValue == 0) {
if (this.nTokens != 1) break;
this.tokenCommand.value = ident;
return 2;
}if (this.nTokens == 1) {
if (this.thisFunction != null) this.vFunctionStack.add (0, this.thisFunction);
this.thisFunction = (this.tokCommand == 102436 ? J.script.ScriptCompiler.newScriptParallelProcessor (ident, this.tokCommand) :  new J.script.ScriptFunction (ident, this.tokCommand));
this.htUserFunctions.put (ident, Boolean.TRUE);
this.flowContext.setFunction (this.thisFunction);
break;
}if (this.nTokens == 2) {
if (this.theTok != 269484048) return this.ERROR (15, "(");
break;
}if (this.nTokens == 3 && this.theTok == 269484049) break;
if (this.nTokens % 2 == 0) {
if (this.theTok != 269484080 && this.theTok != 269484049) return this.ERROR (15, ")");
break;
}this.thisFunction.addVariable (ident, true);
break;
case 102411:
if (this.nTokens > 1 && this.parenCount == 0 && this.braceCount == 0 && this.theTok == 269484066) {
this.addTokenToPrefix (J.script.T.tokenRightParen);
this.braceCount = 1;
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 102413:
if (this.nTokens > 1) {
this.braceCount = 1;
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}break;
case 364547:
if (this.nTokens == 1 && this.theTok != 135369225) {
this.isEndOfCommand = true;
this.cchToken = 0;
return 2;
}if (this.nTokens != 1 || this.theTok != 135369225 && this.theTok != 1048586) return this.ERROR (0);
this.replaceCommand (this.flowContext.token = J.script.ContextToken.newCmd (102402, "elseif"));
this.tokCommand = 102402;
return 2;
case 36868:
if (this.nTokens != 1) break;
this.addContextVariable (ident);
this.replaceCommand (J.script.T.tokenSetVar);
this.tokCommand = 1085443;
break;
case 1150985:
if (this.nTokens != 1) return this.ERROR (0);
if (!this.checkFlowEnd (this.theTok, ident, this.ichCurrentCommand)) return 4;
if (this.theTok == 135368713 || this.theTok == 102436) {
return 2;
}break;
case 102410:
case 102406:
if (this.nTokens > 2 && this.braceCount == 0 && this.parenCount == 0) {
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
}break;
case 102402:
case 135369225:
if (this.nTokens > 2 && this.braceCount == 0 && this.parenCount == 0) {
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
}break;
case 102439:
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
break;
case 135369224:
if (this.nTokens == 1) {
if (this.theTok != 269484048) return this.ERROR (19, ident);
this.forPoint3 = this.nSemiSkip = 0;
this.nSemiSkip += 2;
} else if (this.nTokens == 3 && this.tokAt (2) == 36868) {
this.addContextVariable (ident);
} else if ((this.nTokens == 3 || this.nTokens == 4) && this.theTok == 1073741980) {
this.nSemiSkip -= 2;
this.forPoint3 = 2;
this.addTokenToPrefix (this.theToken);
this.theToken = J.script.T.tokenLeftParen;
} else if (this.braceCount == 0 && this.parenCount == 0) {
this.isEndOfCommand = true;
this.ichEnd = this.ichToken + 1;
this.flowContext.setLine ();
}break;
case 1085443:
if (this.theTok == 1048586) this.setBraceCount++;
 else if (this.theTok == 1048590) {
this.setBraceCount--;
if (this.isSetBrace && this.setBraceCount == 0 && this.ptNewSetModifier == 2147483647) this.ptNewSetModifier = this.nTokens + 1;
}if (this.nTokens == this.ptNewSetModifier) {
var token = this.tokenAt (0);
if (this.theTok == 269484048 || this.isUserFunction (token.value.toString ())) {
this.ltoken.set (0, this.setCommand (J.script.T.tv (1073741824, 0, token.value)));
this.setBraceCount = 0;
break;
}if (this.theTok != 1073741824 && this.theTok != 269484242 && this.theTok != 1060866 && (!J.script.T.tokAttr (this.theTok, 536870912))) {
if (this.isNewSet) this.commandExpected ();
 else this.errorIntStr2 (18, "SET", ": " + ident);
return 4;
}if (this.nTokens == 1 && (this.lastToken.tok == 269484226 || this.lastToken.tok == 269484225)) {
this.replaceCommand (J.script.T.tokenSet);
this.addTokenToPrefix (this.lastToken);
break;
}}break;
case 135271426:
if (this.theTok == 1060866 && (this.nTokens == 1 || this.lastToken.tok == 1073741940 || this.lastToken.tok == 1073742152)) {
this.addTokenToPrefix (J.script.T.tokenDefineString);
return 2;
}if (this.theTok == 1073741848) this.iHaveQuotedString = false;
break;
case 1610625028:
case 12294:
case 12295:
case 135280132:
case 12291:
case 1060866:
if (this.tokCommand == 1060866) {
if (this.nTokens == 1) {
if (this.theTok != 1073741824) {
if (this.preDefining) {
if (!J.script.T.tokAttr (this.theTok, 3145728)) {
this.errorStr2 ("ERROR IN Token.java or JmolConstants.java -- the following term was used in JmolConstants.java but not listed as predefinedset in Token.java: " + ident, null);
return 4;
}} else if (J.script.T.tokAttr (this.theTok, 3145728)) {
J.util.Logger.warn ("WARNING: predefined term '" + ident + "' has been redefined by the user until the next file load.");
} else if (!this.isCheckOnly && ident.length > 1) {
J.util.Logger.warn ("WARNING: redefining " + ident + "; was " + this.theToken + "not all commands may continue to be functional for the life of the applet!");
this.theTok = this.theToken.tok = 1073741824;
J.script.T.addToken (ident, this.theToken);
}}this.addTokenToPrefix (this.theToken);
this.lastToken = J.script.T.tokenComma;
return 2;
}if (this.nTokens == 2) {
if (this.theTok == 269484436) {
this.ltoken.add (0, J.script.T.tokenSet);
return 2;
}}}if (this.bracketCount == 0 && this.theTok != 1073741824 && !J.script.T.tokAttr (this.theTok, 1048576) && !J.script.T.tokAttr (this.theTok, 1073741824) && (this.theTok & 480) != this.theTok) return this.ERROR (9, ident);
break;
case 12289:
if (this.theTok != 1073741824 && this.theTok != 1048583 && !J.script.T.tokAttr (this.theTok, 1048576)) return this.ERROR (9, ident);
break;
case 135190:
case 135188:
case 135180:
var ch = this.charAt (this.ichToken + this.cchToken);
if (this.parenCount == 0 && this.bracketCount == 0 && ".:/\\+-!?".indexOf (ch) >= 0 && !(ch == '-' && ident.equals ("="))) this.checkUnquotedFileName ();
break;
case 4148:
if (this.nTokens == 2 && this.tokAt (1) == 1073742158 && this.theTok == 269484208) this.implicitString = true;
break;
}
return 0;
}, "~S");
c$.newScriptParallelProcessor = $_M(c$, "newScriptParallelProcessor", 
function (name, tok) {
var jpp = J.api.Interface.getOptionInterface ("parallel.ScriptParallelProcessor");
jpp.set (name, tok);
return jpp;
}, "~S,~N");
$_M(c$, "setNewSetCommand", 
function (isSetBrace, ident) {
this.tokCommand = 1085443;
this.isNewSet = (!isSetBrace && !this.isUserFunction (ident));
this.setBraceCount = (isSetBrace ? 1 : 0);
this.bracketCount = 0;
this.setEqualPt = 2147483647;
this.ptNewSetModifier = (this.isNewSet ? (ident.equals ("(") ? 2 : 1) : 2147483647);
return ((isSetBrace || this.theToken.tok == 269484226 || this.theToken.tok == 269484225) ? this.theToken : J.script.T.o (1073741824, ident));
}, "~B,~S");
$_M(c$, "checkUnquotedFileName", 
function () {
var ichT = this.ichToken;
var ch;
while (++ichT < this.cchScript && !Character.isWhitespace (ch = this.script.charAt (ichT)) && ch != '#' && ch != ';' && ch != '}') {
}
var name = this.script.substring (this.ichToken, ichT).$replace ('\\', '/');
this.cchToken = ichT - this.ichToken;
this.theToken = J.script.T.o (4, name);
});
$_M(c$, "checkFlowStartBrace", 
function (atEnd) {
if ((!J.script.T.tokAttr (this.tokCommand, 102400) || this.tokCommand == 102407 || this.tokCommand == 102408)) return false;
if (atEnd) {
if (this.tokenCommand.tok != 102411 && this.tokenCommand.tok != 102413) {
this.iBrace++;
this.vBraces.addLast (this.tokenCommand);
this.lastFlowCommand = null;
}this.parenCount = this.braceCount = 0;
}return true;
}, "~B");
$_M(c$, "checkFlowEndBrace", 
function () {
if (this.iBrace <= 0 || this.vBraces.get (this.iBrace - 1).tok != 1048590) return 0;
this.vBraces.remove (--this.iBrace);
var token = this.vBraces.remove (--this.iBrace);
if (this.theTok == 1048586) {
this.braceCount--;
this.parenCount--;
}if (token.tok == 1276383749) {
this.vPush.remove (--this.pushCount);
this.addTokenToPrefix (this.setCommand (J.script.ContextToken.newContext (true)));
this.isEndOfCommand = true;
return 2;
}switch (this.flowContext == null ? 0 : this.flowContext.token.tok) {
case 135369225:
case 102402:
case 364547:
if (this.tokCommand == 364547 || this.tokCommand == 102402) return 0;
break;
case 102410:
case 102411:
case 102413:
if (this.tokCommand == 102411 || this.tokCommand == 102413) return 0;
}
return this.forceFlowEnd (token);
});
$_M(c$, "forceFlowEnd", 
function (token) {
var t0 = this.tokenCommand;
this.setCommand (J.script.T.o (1150985, "end"));
if (!this.checkFlowCommand ("end")) return 0;
this.addTokenToPrefix (this.tokenCommand);
switch (token.tok) {
case 135369225:
case 364547:
case 102402:
token = J.script.T.tokenIf;
break;
case 102413:
case 102411:
token = J.script.T.tokenSwitch;
break;
default:
token = J.script.T.getTokenFromName (token.value);
break;
}
if (!this.checkFlowEnd (token.tok, token.value, this.ichBrace)) return 4;
if (token.tok != 135368713 && token.tok != 102436 && token.tok != 364558) this.addTokenToPrefix (token);
this.setCommand (t0);
return 2;
}, "J.script.T");
c$.isBreakableContext = $_M(c$, "isBreakableContext", 
function (tok) {
return tok == 135369224 || tok == 102439 || tok == 102406 || tok == 102411 || tok == 102413;
}, "~N");
$_M(c$, "checkFlowCommand", 
function (ident) {
var pt = this.lltoken.size ();
var isEnd = false;
var isNew = true;
switch (this.tokCommand) {
case 135368713:
case 102436:
if (this.flowContext != null) return this.errorStr (1, J.script.T.nameOf (this.tokCommand));
break;
case 1150985:
if (this.flowContext == null) return this.errorStr (1, ident);
isEnd = true;
if (this.flowContext.token.tok != 135368713 && this.flowContext.token.tok != 102436 && this.flowContext.token.tok != 364558) this.setCommand (J.script.T.tv (this.tokCommand, (this.flowContext.ptDefault > 0 ? this.flowContext.ptDefault : -this.flowContext.pt0), ident));
break;
case 364558:
case 102412:
break;
case 135369224:
case 135369225:
case 102439:
case 102410:
case 102406:
break;
case 364548:
isEnd = true;
if (this.flowContext == null || this.flowContext.token.tok != 135369225 && this.flowContext.token.tok != 102439 && this.flowContext.token.tok != 364547 && this.flowContext.token.tok != 102402) return this.errorStr (1, ident);
break;
case 364547:
if (this.flowContext == null || this.flowContext.token.tok != 135369225 && this.flowContext.token.tok != 102402) return this.errorStr (1, ident);
this.flowContext.token.intValue = this.flowContext.setPt0 (pt, false);
break;
case 102407:
case 102408:
isNew = false;
var f = (this.flowContext == null ? null : this.flowContext.getBreakableContext (0));
if (this.tokCommand == 102408) while (f != null && f.token.tok != 135369224 && f.token.tok != 102406) f = f.getParent ();

if (f == null) return this.errorStr (1, ident);
this.setCommand (J.script.T.tv (this.tokCommand, f.pt0, ident));
break;
case 102413:
if (this.flowContext == null || this.flowContext.token.tok != 102410 && this.flowContext.token.tok != 102411 && this.flowContext.ptDefault > 0) return this.errorStr (1, ident);
this.flowContext.token.intValue = this.flowContext.setPt0 (pt, true);
break;
case 102411:
if (this.flowContext == null || this.flowContext.token.tok != 102410 && this.flowContext.token.tok != 102411 && this.flowContext.token.tok != 102413) return this.errorStr (1, ident);
this.flowContext.token.intValue = this.flowContext.setPt0 (pt, false);
break;
case 102402:
if (this.flowContext == null || this.flowContext.token.tok != 135369225 && this.flowContext.token.tok != 102402 && this.flowContext.token.tok != 364547) return this.errorStr (1, "elseif");
this.flowContext.token.intValue = this.flowContext.setPt0 (pt, false);
break;
}
if (isEnd) {
this.flowContext.token.intValue = (this.tokCommand == 102412 ? -pt : pt);
if (this.tokCommand == 364548) this.flowContext = this.flowContext.getParent ();
} else if (isNew) {
var ct = J.script.ContextToken.newCmd (this.tokCommand, this.tokenCommand.value);
if (this.tokCommand == 102410) ct.addName ("_var");
this.setCommand (ct);
switch (this.tokCommand) {
case 364558:
this.flowContext =  new J.script.ScriptFlowContext (this, ct, pt, this.flowContext);
if (this.thisFunction != null) this.vFunctionStack.add (0, this.thisFunction);
this.thisFunction = J.script.ScriptCompiler.newScriptParallelProcessor ("", this.tokCommand);
this.flowContext.setFunction (this.thisFunction);
this.pushCount++;
this.vPush.addLast (ct);
break;
case 364547:
case 102402:
this.flowContext.token = ct;
break;
case 102411:
case 102413:
ct.contextVariables = this.flowContext.token.contextVariables;
this.flowContext.token = ct;
break;
case 102439:
case 135369224:
case 102406:
case 102412:
this.pushCount++;
this.vPush.addLast (ct);
case 135369225:
case 102410:
default:
this.flowContext =  new J.script.ScriptFlowContext (this, ct, pt, this.flowContext);
break;
}
}return true;
}, "~S");
$_M(c$, "checkFlowEnd", 
function (tok, ident, pt1) {
if (this.flowContext == null || this.flowContext.token.tok != tok) {
var isOK = true;
switch (tok) {
case 135369225:
isOK = (this.flowContext.token.tok == 364547 || this.flowContext.token.tok == 102402);
break;
case 102410:
isOK = (this.flowContext.token.tok == 102411 || this.flowContext.token.tok == 102413);
break;
default:
isOK = false;
}
if (!isOK) return this.errorStr (1, "end " + ident);
}switch (tok) {
case 135369225:
case 102410:
break;
case 102412:
case 135369224:
case 102439:
case 102406:
this.vPush.remove (--this.pushCount);
break;
case 102436:
case 135368713:
case 364558:
if (!this.isCheckOnly) {
this.addTokenToPrefix (J.script.T.o (tok, this.thisFunction));
J.script.ScriptFunction.setFunction (this.thisFunction, this.script, pt1, this.lltoken.size (), this.lineNumbers, this.lineIndices, this.lltoken);
}this.thisFunction = (this.vFunctionStack.size () == 0 ? null : this.vFunctionStack.remove (0));
this.tokenCommand.intValue = 0;
if (tok == 364558) this.vPush.remove (--this.pushCount);
break;
default:
return this.errorStr (19, "end " + ident);
}
this.flowContext = this.flowContext.getParent ();
return true;
}, "~N,~S,~N");
$_M(c$, "getData", 
function (key) {
this.addTokenToPrefix (J.script.T.o (4, key));
this.ichToken += key.length + 2;
if (this.charAt (this.ichToken) == '\r') {
this.lineCurrent++;
this.ichToken++;
}if (this.charAt (this.ichToken) == '\n') {
this.lineCurrent++;
this.ichToken++;
}var i = this.script.indexOf (this.chFirst + key + this.chFirst, this.ichToken) - 4;
if (i < 0 || !this.script.substring (i, i + 4).equalsIgnoreCase ("END ")) return false;
var str = this.script.substring (this.ichToken, i);
this.incrementLineCount (str);
this.addTokenToPrefix (J.script.T.o (135270407, str));
this.addTokenToPrefix (J.script.T.o (1073741824, "end"));
this.addTokenToPrefix (J.script.T.o (4, key));
this.cchToken = i - this.ichToken + key.length + 6;
return true;
}, "~S");
$_M(c$, "incrementLineCount", 
function (str) {
var ch;
var pt = str.indexOf ('\r');
var pt2 = str.indexOf ('\n');
if (pt < 0 && pt2 < 0) return 0;
var n = this.lineCurrent;
if (pt < 0 || pt2 < pt) pt = pt2;
for (var i = str.length; --i >= pt; ) {
if ((ch = str.charAt (i)) == '\n' || ch == '\r') this.lineCurrent++;
}
return this.lineCurrent - n;
}, "~S");
c$.isSpaceOrTab = $_M(c$, "isSpaceOrTab", 
function (ch) {
return ch == ' ' || ch == '\t';
}, "~S");
$_M(c$, "eol", 
function (ch) {
return (ch == '\0' || ch == '\r' || ch == '\n' || ch == ';' && this.nSemiSkip <= 0);
}, "~S");
$_M(c$, "lookingAtSetBraceSyntax", 
function () {
var ichT = this.ichToken;
var nParen = 1;
while (++ichT < this.cchScript && nParen > 0) {
switch (this.script.charAt (ichT)) {
case '{':
nParen++;
break;
case '}':
nParen--;
break;
}
}
if (this.charAt (ichT) == '[' && ++nParen == 1) while (++ichT < this.cchScript && nParen > 0) {
switch (this.script.charAt (ichT)) {
case '[':
nParen++;
break;
case ']':
nParen--;
break;
}
}
if (this.charAt (ichT) == '.' && nParen == 0) {
return true;
}return false;
});
$_M(c$, "lookingAtString", 
function (allowPrime) {
if (this.ichToken + 2 > this.cchScript) return false;
this.chFirst = this.script.charAt (this.ichToken);
if (this.chFirst != '"' && (!allowPrime || this.chFirst != '\'')) return false;
var ichT = this.ichToken;
var ch;
var previousCharBackslash = false;
while (++ichT < this.cchScript) {
ch = this.script.charAt (ichT);
if (ch == this.chFirst && !previousCharBackslash) break;
previousCharBackslash = (ch == '\\' ? !previousCharBackslash : false);
}
if (ichT == this.cchScript) {
this.cchToken = -1;
this.ichEnd = this.cchScript;
} else {
this.cchToken = ++ichT - this.ichToken;
}return true;
}, "~B");
$_M(c$, "getUnescapedStringLiteral", 
function (isFileName) {
if (isFileName) {
var s = this.script.substring (this.ichToken + 1, this.ichToken + this.cchToken - 1);
if (s.indexOf ("\\u") >= 0) s = J.util.Escape.unescapeUnicode (s);
return s;
}var sb = JU.SB.newN (this.cchToken - 2);
var ichMax = this.ichToken + this.cchToken - 1;
var ich = this.ichToken + 1;
while (ich < ichMax) {
var ch = this.script.charAt (ich++);
if (ch == '\\' && ich < ichMax) {
ch = this.script.charAt (ich++);
switch (ch) {
case 'n':
ch = '\n';
break;
case 't':
ch = '\t';
break;
case 'r':
ch = '\r';
case '"':
case '\\':
case '\'':
break;
case 'x':
case 'u':
var digitCount = ch == 'x' ? 2 : 4;
if (ich < ichMax) {
var unicode = 0;
for (var k = digitCount; --k >= 0 && ich < ichMax; ) {
var chT = this.script.charAt (ich);
var hexit = J.util.Escape.getHexitValue (chT);
if (hexit < 0) break;
unicode <<= 4;
unicode += hexit;
++ich;
}
ch = String.fromCharCode (unicode);
}}
}sb.appendC (ch);
}
return sb.toString ();
}, "~B");
$_M(c$, "lookingAtLoadFormat", 
function () {
var ichT = this.ichToken;
var allchar = J.viewer.Viewer.isDatabaseCode (this.charAt (ichT));
var ch;
while ((Character.isLetterOrDigit (ch = this.charAt (ichT)) && (allchar || Character.isLetter (ch)) || allchar && (!this.eol (ch) && !Character.isWhitespace (ch)))) ++ichT;

if (!allchar && ichT == this.ichToken || !J.script.ScriptCompiler.isSpaceOrTab (ch)) return false;
this.cchToken = ichT - this.ichToken;
return true;
});
$_M(c$, "lookingAtImpliedString", 
function (allowSpace, allowEquals, allowSptParen) {
var ichT = this.ichToken;
var ch = this.script.charAt (ichT);
var isID = (this.lastToken.tok == 1074790550);
var parseVariables = (isID || !J.script.T.tokAttr (this.tokCommand, 20480) && (this.tokCommand & 1) == 1);
var isVariable = (ch == '@');
var isMath = (isVariable && ichT + 3 < this.cchScript && this.script.charAt (ichT + 1) == '{');
if (isMath && parseVariables) {
ichT = J.util.Txt.ichMathTerminator (this.script, this.ichToken + 1, this.cchScript);
return (!isID && ichT != this.cchScript && (this.cchToken = ichT + 1 - this.ichToken) > 0);
}var ptSpace = -1;
var ptLastChar = -1;
var isOK = true;
var parenpt = 0;
while (isOK && !this.eol (ch = this.charAt (ichT))) {
switch (ch) {
case '(':
if (!allowSptParen) {
if (ichT >= 5 && (this.script.substring (ichT - 4, ichT).equals (".spt") || this.script.substring (ichT - 4, ichT).equals (".png") || this.script.substring (ichT - 5, ichT).equals (".pngj"))) {
isOK = false;
continue;
}}break;
case '=':
if (!allowEquals) {
isOK = false;
continue;
}break;
case '{':
parenpt++;
break;
case '}':
parenpt--;
if (parenpt < 0 && (this.braceCount > 0 || this.iBrace > 0)) {
isOK = false;
continue;
}break;
default:
if (Character.isWhitespace (ch)) {
if (ptSpace < 0) ptSpace = ichT;
} else {
ptLastChar = ichT;
}break;
}
++ichT;
}
if (allowSpace) ichT = ptLastChar + 1;
 else if (ptSpace > 0) ichT = ptSpace;
if (isVariable && (!allowSpace || ptSpace < 0 && parenpt <= 0 && ichT - this.ichToken > 1)) {
return false;
}return (this.cchToken = ichT - this.ichToken) > 0;
}, "~B,~B,~B");
$_M(c$, "lookingAtExponential", 
function () {
if (this.ichToken == this.cchScript) return NaN;
var ichT = this.ichToken;
var pt0 = ichT;
if (this.script.charAt (ichT) == '-') ++ichT;
var isOK = false;
var ch = 'X';
while (Character.isDigit (ch = this.charAt (ichT))) {
++ichT;
isOK = true;
}
if (ichT < this.cchScript && ch == '.') ++ichT;
while (Character.isDigit (ch = this.charAt (ichT))) {
++ichT;
isOK = true;
}
if (ichT == this.cchScript || !isOK) return NaN;
isOK = (ch != 'E' && ch != 'e');
if (isOK || ++ichT == this.cchScript) return NaN;
ch = this.script.charAt (ichT);
if (ch == '-' || ch == '+') ichT++;
while (Character.isDigit (this.charAt (ichT))) {
ichT++;
isOK = true;
}
if (!isOK) return NaN;
this.cchToken = ichT - this.ichToken;
return JU.PT.dVal (this.script.substring (pt0, ichT));
});
$_M(c$, "lookingAtDecimal", 
function () {
if (this.ichToken == this.cchScript) return false;
var ichT = this.ichToken;
if (this.script.charAt (ichT) == '-') ++ichT;
var digitSeen = false;
var ch;
while (Character.isDigit (ch = this.charAt (ichT++))) digitSeen = true;

if (ch != '.') return false;
var ch1;
if (!this.eol (ch1 = this.charAt (ichT))) {
if (Character.isLetter (ch1) || ch1 == '?' || ch1 == '*') return false;
if (Character.isLetter (ch1 = this.charAt (ichT + 1)) || ch1 == '?') return false;
}while (Character.isDigit (this.charAt (ichT))) {
++ichT;
digitSeen = true;
}
this.cchToken = ichT - this.ichToken;
return digitSeen;
});
$_M(c$, "lookingAtSeqcode", 
function () {
var ichT = this.ichToken;
var ch;
if (this.charAt (ichT + 1) == '^' && this.script.charAt (ichT) == '*') {
ch = '^';
++ichT;
} else {
if (this.script.charAt (ichT) == '-') ++ichT;
while (Character.isDigit (ch = this.charAt (ichT))) ++ichT;

}if (ch != '^') return false;
ichT++;
if (ichT == this.cchScript) ch = ' ';
 else ch = this.script.charAt (ichT++);
if (ch != ' ' && ch != '*' && ch != '?' && !Character.isLetter (ch)) return false;
this.cchToken = ichT - this.ichToken;
return true;
});
$_M(c$, "lookingAtInteger", 
function () {
if (this.ichToken == this.cchScript) return 2147483647;
var ichT = this.ichToken;
if (this.script.charAt (this.ichToken) == '-') ++ichT;
var ichBeginDigits = ichT;
while (Character.isDigit (this.charAt (ichT))) ++ichT;

if (ichBeginDigits == ichT) return 2147483647;
this.cchToken = ichT - this.ichToken;
try {
var val = Integer.parseInt (this.script.substring (this.ichToken, ichT));
return val;
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return 2147483647;
});
$_M(c$, "lookingAtBitset", 
function () {
if (this.script.indexOf ("({null})", this.ichToken) == this.ichToken) {
this.cchToken = 8;
return  new JU.BS ();
}var ichT;
if (this.ichToken + 4 > this.cchScript || this.script.charAt (this.ichToken + 1) != '{' || (ichT = this.script.indexOf ("}", this.ichToken)) < 0 || ichT + 1 == this.cchScript) return null;
var bs = J.util.Escape.uB (this.script.substring (this.ichToken, ichT + 2));
if (bs != null) this.cchToken = ichT + 2 - this.ichToken;
return bs;
});
$_M(c$, "lookingAtObjectID", 
function () {
var allowWildID = (this.nTokens == 1);
var ichT = this.ichToken;
if (this.charAt (ichT) != '$') return false;
if (this.charAt (++ichT) == '"') return false;
while (ichT < this.cchScript) {
var ch;
if (Character.isWhitespace (ch = this.script.charAt (ichT))) {
if (ichT == this.ichToken + 1) return false;
break;
}if (!Character.isLetterOrDigit (ch)) {
switch (ch) {
default:
return false;
case '*':
if (!allowWildID) return false;
break;
case '~':
case '_':
break;
}
}ichT++;
}
this.cchToken = ichT - (++this.ichToken);
return true;
});
$_M(c$, "lookingAtLookupToken", 
function (ichT) {
if (ichT == this.cchScript) return false;
var ichT0 = ichT;
this.tokLastMath = 0;
var ch;
switch (ch = this.script.charAt (ichT++)) {
case '-':
case '+':
case '&':
case '|':
case '*':
if (ichT < this.cchScript) {
if (this.script.charAt (ichT) == ch) {
++ichT;
if (ch == '-' || ch == '+') break;
if (ch == '&' && this.charAt (ichT) == ch) ++ichT;
} else if (this.script.charAt (ichT) == '=') {
++ichT;
}}this.tokLastMath = 1;
break;
case '/':
if (this.charAt (ichT) == '/') break;
case '\\':
case '!':
if (this.charAt (ichT) == '=') ++ichT;
this.tokLastMath = 1;
break;
case ')':
case ']':
case '}':
case '.':
break;
case '@':
case '{':
this.tokLastMath = 2;
break;
case ':':
this.tokLastMath = 1;
break;
case '(':
case ',':
case '$':
case ';':
case '[':
case '%':
this.tokLastMath = 1;
break;
case '<':
case '=':
case '>':
if ((ch = this.charAt (ichT)) == '<' || ch == '=' || ch == '>') ++ichT;
this.tokLastMath = 1;
break;
default:
if (!Character.isLetter (ch)) return false;
case '~':
case '_':
case '\'':
case '?':
if (ch == '?') this.tokLastMath = 1;
while (Character.isLetterOrDigit (ch = this.charAt (ichT)) || ch == '_' || ch == '?' || ch == '~' || ch == '\'' || ch == '\\' && this.charAt (ichT + 1) == '?' || ch == '^' && ichT > ichT0 && Character.isDigit (this.charAt (ichT - 1))) ++ichT;

break;
}
this.cchToken = ichT - ichT0;
return true;
}, "~N");
$_M(c$, "lookForSyncID", 
function () {
var ch;
if ((ch = this.charAt (this.ichToken)) == '"' || ch == '@' || ch == '\0') return false;
var ichT = this.ichToken;
while (!J.script.ScriptCompiler.isSpaceOrTab (ch = this.charAt (ichT)) && ch != '#' && ch != '}' && !this.eol (ch)) ++ichT;

this.cchToken = ichT - this.ichToken;
return true;
});
$_M(c$, "ERROR", 
function (error) {
this.errorIntStr2 (error, null, null);
return 4;
}, "~N");
$_M(c$, "ERROR", 
function (error, value) {
this.errorStr (error, value);
return 4;
}, "~N,~S");
$_M(c$, "handleError", 
function () {
this.errorType = this.errorMessage;
this.errorLine = this.script.substring (this.ichCurrentCommand, this.ichEnd <= this.ichCurrentCommand ? this.ichToken : this.ichEnd);
var lineInfo = (this.ichToken < this.ichEnd ? this.errorLine.substring (0, this.ichToken - this.ichCurrentCommand) + " >>>> " + this.errorLine.substring (this.ichToken - this.ichCurrentCommand) : this.errorLine) + " <<<<";
this.errorMessage = J.i18n.GT._ ("script compiler ERROR: ") + this.errorMessage + J.script.ScriptEvaluator.getErrorLineMessage (null, this.filename, this.lineCurrent, this.iCommand, lineInfo);
if (!this.isSilent) {
this.ichToken = Math.max (this.ichEnd, this.ichToken);
while (!this.lookingAtEndOfLine () && !this.lookingAtTerminator ()) this.ichToken++;

this.errorLine = this.script.substring (this.ichCurrentCommand, this.ichToken);
this.viewer.addCommand (this.errorLine + "#??");
J.util.Logger.error (this.errorMessage);
}return false;
});
Clazz_defineStatics (c$,
"OK", 0,
"OK2", 1,
"CONTINUE", 2,
"EOL", 3,
"$ERROR", 4);
});
Clazz_declarePackage ("J.script");
Clazz_load (null, "J.script.ScriptCompilationTokenParser", ["java.lang.Float", "JU.List", "$.P3", "$.PT", "J.i18n.GT", "J.script.ScriptEvaluator", "$.T", "J.util.Logger", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.viewer = null;
this.script = null;
this.isStateScript = false;
this.lineCurrent = 0;
this.iCommand = 0;
this.ichCurrentCommand = 0;
this.ichComment = 0;
this.ichEnd = 0;
this.ichToken = 0;
this.theToken = null;
this.lastFlowCommand = null;
this.tokenCommand = null;
this.lastToken = null;
this.tokenAndEquals = null;
this.theTok = 0;
this.nTokens = 0;
this.tokCommand = 0;
this.ptNewSetModifier = 0;
this.isNewSet = false;
this.logMessages = false;
this.atokenInfix = null;
this.itokenInfix = 0;
this.isSetBrace = false;
this.isMathExpressionCommand = false;
this.isSetOrDefine = false;
this.ltokenPostfix = null;
this.isEmbeddedExpression = false;
this.isCommaAsOrAllowed = false;
this.theValue = null;
this.htUserFunctions = null;
this.haveString = false;
this.residueSpecCodeGenerated = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.errorLine = null;
this.errorType = null;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptCompilationTokenParser");
$_M(c$, "compileExpressions", 
function () {
var isScriptExpression = (this.tokCommand == 135271429 && this.tokAt (2) == 269484048);
this.isEmbeddedExpression = isScriptExpression || (this.tokCommand != 0 && (this.tokCommand != 135368713 && this.tokCommand != 102436 && this.tokCommand != 364558 && this.tokCommand != 102412 || this.tokenCommand.intValue != 2147483647) && this.tokCommand != 1150985 && !J.script.T.tokAttrOr (this.tokCommand, 12288, 20480));
this.isMathExpressionCommand = (this.tokCommand == 1073741824 || isScriptExpression || J.script.T.tokAttr (this.tokCommand, 36864));
var checkExpression = this.isEmbeddedExpression || (J.script.T.tokAttr (this.tokCommand, 12288));
if (this.tokAt (1) == 1048583 && J.script.T.tokAttr (this.tokCommand, 12288)) checkExpression = false;
if (checkExpression && !this.compileExpression ()) return false;
var size = this.atokenInfix.length;
var nDefined = 0;
for (var i = 1; i < size; i++) {
if (this.tokAt (i) == 1060866) nDefined++;
}
size -= nDefined;
if (this.isNewSet) {
if (size == 1) {
this.atokenInfix[0] = J.script.T.tv (135368713, 0, this.atokenInfix[0].value);
this.isNewSet = false;
}}if ((this.isNewSet || this.isSetBrace) && size < this.ptNewSetModifier + 2) return this.commandExpected ();
return (size == 1 || !J.script.T.tokAttr (this.tokCommand, 262144) ? true : this.error (0));
});
$_M(c$, "compileExpression", 
function () {
var firstToken = (this.isSetOrDefine && !this.isSetBrace ? 2 : 1);
this.ltokenPostfix =  new JU.List ();
this.itokenInfix = 0;
var tokenBegin = null;
var tok = this.tokAt (1);
switch (this.tokCommand) {
case 1060866:
if (this.tokAt (1) == 2 && this.tokAt (2) == 1048584 && this.tokAt (4) == 269484436) {
this.tokCommand = 1085443;
this.isSetBrace = true;
this.ptNewSetModifier = 4;
this.isMathExpressionCommand = true;
this.isEmbeddedExpression = true;
this.addTokenToPostfixToken (J.script.T.tokenSetProperty);
this.addTokenToPostfixToken (J.script.T.tokenExpressionBegin);
this.addNextToken ();
this.addNextToken ();
this.addTokenToPostfixToken (J.script.T.tokenExpressionEnd);
firstToken = 0;
}break;
case 12295:
if (tok == 1678770178) firstToken = 2;
break;
case 135280132:
switch (tok) {
case 1048589:
case 1048588:
tok = this.tokAt (++firstToken);
break;
}
case 12294:
case 1610625028:
switch (tok) {
case 1276118017:
case 1073742119:
tok = this.tokAt (++firstToken);
break;
}
if (tok == 1087373318) firstToken++;
}
for (var i = 0; i < firstToken && this.addNextToken (); i++) {
}
while (this.moreTokens ()) {
if (this.isEmbeddedExpression) {
while (!this.isExpressionNext ()) {
if (this.tokPeekIs (1073741824) && !(this.tokCommand == 135271426 && this.itokenInfix == 1)) {
var name = this.atokenInfix[this.itokenInfix].value;
var t = J.script.T.getTokenFromName (name);
if (t != null) if (!this.isMathExpressionCommand && this.lastToken.tok != 1060866 || (this.lastToken.tok == 1048584 || this.tokAt (this.itokenInfix + 1) == 269484048) && !this.isUserFunction (name)) {
this.atokenInfix[this.itokenInfix] = t;
}}if (!this.addNextToken ()) break;
}
if (!this.moreTokens ()) break;
}if (this.lastToken.tok == 1060866) {
if (!this.clauseDefine (true, false)) return false;
continue;
}if (!this.isMathExpressionCommand) this.addTokenToPostfixToken (tokenBegin = J.script.T.o (1048577, "implicitExpressionBegin"));
if (!this.clauseOr (this.isCommaAsOrAllowed || !this.isMathExpressionCommand && this.tokPeekIs (269484048))) return false;
if (!this.isMathExpressionCommand && !(this.isEmbeddedExpression && this.lastToken === J.script.T.tokenCoordinateEnd)) {
this.addTokenToPostfixToken (J.script.T.tokenExpressionEnd);
}if (this.moreTokens ()) {
if (this.tokCommand != 135280132 && !this.isEmbeddedExpression) return this.error (5);
if (this.tokCommand == 135280132) {
tokenBegin.intValue = 0;
this.tokCommand = 0;
this.isEmbeddedExpression = true;
this.isMathExpressionCommand = true;
this.isCommaAsOrAllowed = false;
}}}
this.atokenInfix = this.ltokenPostfix.toArray ( new Array (this.ltokenPostfix.size ()));
return true;
});
$_M(c$, "isUserFunction", 
function (name) {
return (!this.isStateScript && (this.viewer.isFunction (name) || this.htUserFunctions.containsKey (name)));
}, "~S");
$_M(c$, "isExpressionNext", 
function () {
return this.tokPeekIs (1048586) && !(this.tokAt (this.itokenInfix + 1) == 4 && this.tokAt (this.itokenInfix + 2) == 269484066) || !this.isMathExpressionCommand && this.tokPeekIs (269484048);
});
c$.tokenAttr = $_M(c$, "tokenAttr", 
function (token, tok) {
return token != null && J.script.T.tokAttr (token.tok, tok);
}, "J.script.T,~N");
$_M(c$, "moreTokens", 
function () {
return (this.itokenInfix < this.atokenInfix.length);
});
$_M(c$, "tokAt", 
function (i) {
return (i < this.atokenInfix.length ? this.atokenInfix[i].tok : 0);
}, "~N");
$_M(c$, "tokPeek", 
function () {
return (this.itokenInfix >= this.atokenInfix.length ? 0 : this.atokenInfix[this.itokenInfix].tok);
});
$_M(c$, "tokPeekIs", 
function (tok) {
return (this.tokAt (this.itokenInfix) == tok);
}, "~N");
$_M(c$, "intPeek", 
function () {
return (this.itokenInfix >= this.atokenInfix.length ? 2147483647 : this.atokenInfix[this.itokenInfix].intValue);
});
$_M(c$, "valuePeek", 
function () {
return (this.moreTokens () ? this.atokenInfix[this.itokenInfix].value : "");
});
$_M(c$, "tokenNext", 
function () {
return (this.itokenInfix >= this.atokenInfix.length ? null : this.atokenInfix[this.itokenInfix++]);
});
$_M(c$, "tokenNextTok", 
function (tok) {
var token = this.tokenNext ();
return (token != null && token.tok == tok);
}, "~N");
$_M(c$, "returnToken", 
function () {
this.itokenInfix--;
return false;
});
$_M(c$, "getToken", 
function () {
this.theValue = ((this.theToken = this.tokenNext ()) == null ? null : this.theToken.value);
return this.theToken;
});
$_M(c$, "isToken", 
function (tok) {
return this.theToken != null && this.theToken.tok == tok;
}, "~N");
$_M(c$, "getNumericalToken", 
function () {
return (this.getToken () != null && (this.isToken (2) || this.isToken (3)));
});
$_M(c$, "floatValue", 
function () {
switch (this.theToken.tok) {
case 2:
return this.theToken.intValue;
case 3:
return (this.theValue).floatValue ();
}
return 0;
});
$_M(c$, "addTokenToPostfix", 
function (tok, value) {
return this.addTokenToPostfixToken (J.script.T.o (tok, value));
}, "~N,~O");
$_M(c$, "addTokenToPostfixInt", 
function (tok, intValue, value) {
return this.addTokenToPostfixToken (J.script.T.tv (tok, intValue, value));
}, "~N,~N,~O");
$_M(c$, "addTokenToPostfixToken", 
function (token) {
if (token == null) return false;
if (this.logMessages) J.util.Logger.debug ("addTokenToPostfix" + token);
this.ltokenPostfix.addLast (token);
this.lastToken = token;
return true;
}, "J.script.T");
$_M(c$, "addNextToken", 
function () {
return this.addTokenToPostfixToken (this.tokenNext ());
});
$_M(c$, "addNextTokenIf", 
function (tok) {
return (this.tokPeekIs (tok) && this.addNextToken ());
}, "~N");
$_M(c$, "addSubstituteTokenIf", 
function (tok, token) {
if (!this.tokPeekIs (tok)) return false;
this.itokenInfix++;
return this.addTokenToPostfixToken (token);
}, "~N,J.script.T");
$_M(c$, "clauseOr", 
function (allowComma) {
this.haveString = false;
if (!this.clauseAnd ()) return false;
if (this.isEmbeddedExpression && this.lastToken.tok == 1048578) return true;
var tok;
while ((tok = this.tokPeek ()) == 269484112 || tok == 269484113 || tok == 269484114 || allowComma && tok == 269484080) {
if (tok == 269484080 && !this.haveString) this.addSubstituteTokenIf (269484080, J.script.T.tokenOr);
 else this.addNextToken ();
if (!this.clauseAnd ()) return false;
if (allowComma && (this.lastToken.tok == 1048590 || this.lastToken.tok == 10)) this.haveString = true;
}
return true;
}, "~B");
$_M(c$, "clauseAnd", 
function () {
if (!this.clauseNot ()) return false;
if (this.isEmbeddedExpression && this.lastToken.tok == 1048578) return true;
while (this.tokPeekIs (269484128)) {
this.addNextToken ();
if (!this.clauseNot ()) return false;
}
return true;
});
$_M(c$, "clauseNot", 
function () {
if (this.tokPeekIs (269484144)) {
this.addNextToken ();
return this.clauseNot ();
}return (this.clausePrimitive ());
});
$_M(c$, "clausePrimitive", 
function () {
var tok = this.tokPeek ();
switch (tok) {
case 1073742195:
this.itokenInfix++;
return this.clausePrimitive ();
case 0:
return this.error (4);
case 1048579:
case 10:
case 269484208:
case 137363468:
case 3145736:
case 3145735:
case 3145738:
case 1048585:
case 1048587:
case 3145760:
return this.addNextToken ();
case 4:
this.haveString = true;
return this.addNextToken ();
case 3:
return this.addTokenToPostfixInt (1048611, this.fixModelSpec (this.getToken ()), this.theValue);
case 1095761925:
case 1095761926:
return this.clauseCell (tok);
case 135266310:
return this.clauseConnected ();
case 135267335:
case 135267336:
return this.clauseSubstructure ();
case 135266325:
case 135402505:
return this.clauseWithin (tok == 135266325);
case 1060866:
return this.clauseDefine (false, false);
case 1678770178:
case 1746538509:
this.addNextToken ();
if (this.tokPeekIs (10)) this.addNextToken ();
 else if (this.tokPeekIs (1060866)) return this.clauseDefine (false, false);
return true;
case 269484048:
this.addNextToken ();
if (!this.clauseOr (true)) return false;
if (!this.addNextTokenIf (269484049)) return this.errorStr (15, ")");
return this.checkForItemSelector (true);
case 1048586:
return this.checkForCoordinate (this.isMathExpressionCommand);
default:
if (this.clauseResidueSpec ()) return true;
if (this.isError ()) return false;
if (J.script.T.tokAttr (tok, 1078984704)) {
var itemp = this.itokenInfix;
var isOK = this.clauseComparator (true);
if (isOK || this.itokenInfix != itemp) return isOK;
if (tok == 1238369286) {
return this.clauseSubstructure ();
}}return this.addNextToken ();
}
});
$_M(c$, "checkForCoordinate", 
function (isImplicitExpression) {
var isCoordinate = false;
var pt = this.ltokenPostfix.size ();
if (isImplicitExpression) {
this.addTokenToPostfixToken (J.script.T.tokenExpressionBegin);
this.tokenNext ();
} else if (this.isEmbeddedExpression) {
this.tokenNext ();
pt--;
} else {
this.addNextToken ();
}var isHash = this.tokPeekIs (4);
if (isHash) {
isImplicitExpression = false;
this.returnToken ();
this.ltokenPostfix.remove (this.ltokenPostfix.size () - 1);
this.addNextToken ();
var nBrace = 1;
while (nBrace != 0) {
if (this.tokPeekIs (1048586)) {
if (this.isExpressionNext ()) {
this.addTokenToPostfixToken (J.script.T.o (1048577, "implicitExpressionBegin"));
if (!this.clauseOr (true)) return false;
if (this.lastToken !== J.script.T.tokenCoordinateEnd) {
this.addTokenToPostfixToken (J.script.T.tokenExpressionEnd);
}} else {
nBrace++;
}}if (this.tokPeekIs (1048590)) nBrace--;
this.addNextToken ();
}
} else {
if (!this.tokPeekIs (1048590) && !this.clauseOr (false)) return false;
var n = 1;
while (!this.tokPeekIs (1048590)) {
var haveComma = this.addNextTokenIf (269484080);
if (!this.clauseOr (false)) return (haveComma || n < 3 ? false : this.errorStr (15, "}"));
n++;
}
isCoordinate = (n >= 2);
}if (isCoordinate && (isImplicitExpression || this.isEmbeddedExpression)) {
this.ltokenPostfix.set (pt, J.script.T.tokenCoordinateBegin);
this.addTokenToPostfixToken (J.script.T.tokenCoordinateEnd);
this.tokenNext ();
} else if (isImplicitExpression) {
this.addTokenToPostfixToken (J.script.T.tokenExpressionEnd);
this.tokenNext ();
} else if (this.isEmbeddedExpression && !isHash) {
this.tokenNext ();
} else {
this.addNextToken ();
}return this.checkForItemSelector (!isHash);
}, "~B");
$_M(c$, "checkForItemSelector", 
function (allowNumeric) {
var tok;
if ((tok = this.tokAt (this.itokenInfix + 1)) == 269484096 || allowNumeric && tok == 1048586) return true;
while (true) {
if (!this.addNextTokenIf (269484096)) break;
if (!this.clauseItemSelector ()) return false;
if (!this.addNextTokenIf (269484097)) return this.errorStr (15, "]");
}
return true;
}, "~B");
$_M(c$, "clauseWithin", 
function (isWithin) {
this.addNextToken ();
if (!this.addNextTokenIf (269484048)) return false;
if (this.getToken () == null) return false;
var distance = 3.4028235E38;
var key = null;
var allowComma = isWithin;
var tok;
var tok0 = this.theToken.tok;
if (!isWithin) {
tok = -1;
for (var i = this.itokenInfix; tok != 0; i++) {
switch (tok = this.tokAt (i)) {
case 269484080:
tok = 0;
break;
case 1048586:
case 269484048:
case 269484049:
distance = 100;
this.returnToken ();
tok0 = tok = 0;
break;
}
}
}switch (tok0) {
case 269484192:
if (this.getToken () == null) return false;
if (this.theToken.tok != 2) return this.error (12);
distance = -this.theToken.intValue;
break;
case 2:
case 3:
distance = this.floatValue ();
break;
case 1060866:
this.addTokenToPostfixToken (this.theToken);
if (!this.clauseDefine (true, false)) return false;
key = "";
allowComma = false;
break;
}
if (isWithin && distance == 3.4028235E38) switch (tok0) {
case 1060866:
break;
case 135267335:
case 135267336:
case 1238369286:
this.addTokenToPostfix (4, this.theValue);
if (!this.addNextTokenIf (269484080)) return false;
allowComma = false;
tok = this.tokPeek ();
switch (tok) {
case 0:
return false;
case 4:
this.addNextToken ();
key = "";
break;
case 1060866:
if (!this.clauseDefine (false, true)) return false;
key = "";
break;
default:
return false;
}
break;
case 1048580:
allowComma = false;
case 1087375361:
case 1087375362:
case 1073741864:
case 1679429641:
case 1087373316:
case 1048582:
case 1087375365:
case 1087373318:
case 137363468:
case 1095766030:
case 1095761936:
case 135266319:
case 135267841:
case 1095761937:
case 1087373320:
case 3145760:
case 1095761940:
case 1641025539:
case 4:
case 1649412120:
key = this.theValue;
break;
case 1073741824:
key = (this.theValue).toLowerCase ();
break;
default:
return this.errorIntStr2 (18, "WITHIN", ": " + this.theToken.value);
}
if (key == null) this.addTokenToPostfix (3, Float.$valueOf (distance));
 else if (key.length > 0) this.addTokenToPostfix (4, key);
var done = false;
while (!done) {
if (tok0 != 0 && !this.addNextTokenIf (269484080)) break;
if (tok0 == 0) tok0 = 135402505;
var isCoordOrPlane = false;
tok = this.tokPeek ();
if (isWithin) {
switch (tok0) {
case 2:
case 3:
if (tok == 1048589 || tok == 1048588) {
this.addTokenToPostfixToken (this.getToken ());
if (!this.addNextTokenIf (269484080)) break;
tok = this.tokPeek ();
}break;
}
if (key == null) {
switch (tok) {
case 135267841:
case 1048582:
case 135266319:
isCoordOrPlane = true;
this.addNextToken ();
break;
case 1048583:
this.getToken ();
this.getToken ();
this.addTokenToPostfix (4, "$" + this.theValue);
done = true;
break;
case 1087373318:
case 1649412120:
this.getToken ();
this.addTokenToPostfix (4, J.script.T.nameOf (tok));
break;
case 1048586:
this.returnToken ();
isCoordOrPlane = true;
this.addTokenToPostfixToken (J.script.T.getTokenFromName (distance == 3.4028235E38 ? "plane" : "coord"));
}
if (!done) this.addNextTokenIf (269484080);
}}tok = this.tokPeek ();
if (done) break;
if (isCoordOrPlane) {
while (!this.tokPeekIs (269484049)) {
switch (this.tokPeek ()) {
case 0:
return this.error (4);
case 269484048:
this.addTokenToPostfixToken (J.script.T.tokenExpressionBegin);
this.addNextToken ();
if (!this.clauseOr (false)) return this.errorIntStr2 (18, "WITHIN", ": ?");
if (!this.addNextTokenIf (269484049)) return this.errorStr (15, ", / )");
this.addTokenToPostfixToken (J.script.T.tokenExpressionEnd);
break;
case 1060866:
if (!this.clauseDefine (false, false)) return false;
break;
default:
this.addTokenToPostfixToken (this.getToken ());
}
}
} else if (!this.clauseOr (allowComma)) {
}}
if (!this.addNextTokenIf (269484049)) return this.errorStr (15, ")");
return true;
}, "~B");
$_M(c$, "clauseConnected", 
function () {
this.addNextToken ();
if (!this.addNextTokenIf (269484048)) {
this.addTokenToPostfixToken (J.script.T.tokenLeftParen);
this.addTokenToPostfixToken (J.script.T.tokenRightParen);
return true;
}while (true) {
if (this.addNextTokenIf (2)) if (!this.addNextTokenIf (269484080)) break;
if (this.addNextTokenIf (2)) if (!this.addNextTokenIf (269484080)) break;
if (this.addNextTokenIf (3)) if (!this.addNextTokenIf (269484080)) break;
if (this.addNextTokenIf (3)) if (!this.addNextTokenIf (269484080)) break;
var o = this.getToken ().value;
var strOrder = (Clazz_instanceOf (o, String) ? o : " ");
var intType = J.script.ScriptEvaluator.getBondOrderFromString (strOrder);
if (intType == 131071) {
this.returnToken ();
} else {
this.addTokenToPostfix (4, strOrder);
if (!this.addNextTokenIf (269484080)) break;
}if (this.addNextTokenIf (269484049)) return true;
if (!this.clauseOr (this.tokPeekIs (269484048))) return false;
if (this.addNextTokenIf (269484049)) return true;
if (!this.addNextTokenIf (269484080)) return false;
if (!this.clauseOr (this.tokPeekIs (269484048))) return false;
break;
}
if (!this.addNextTokenIf (269484049)) return this.errorStr (15, ")");
return true;
});
$_M(c$, "clauseSubstructure", 
function () {
this.addNextToken ();
if (!this.addNextTokenIf (269484048)) return false;
if (this.tokPeekIs (1060866)) {
if (!this.clauseDefine (false, true)) return false;
} else if (!this.addNextTokenIf (4)) {
return this.errorStr (15, "\"...\"");
}if (this.addNextTokenIf (269484080)) if (!this.clauseOr (this.tokPeekIs (269484048))) return false;
if (!this.addNextTokenIf (269484049)) return this.errorStr (15, ")");
return true;
});
$_M(c$, "clauseItemSelector", 
function () {
var tok;
var nparen = 0;
while ((tok = this.tokPeek ()) != 0 && tok != 269484097) {
this.addNextToken ();
if (tok == 269484096) nparen++;
if (this.tokPeek () == 269484097 && nparen-- > 0) this.addNextToken ();
}
return true;
});
$_M(c$, "clauseComparator", 
function (isOptional) {
var tokenAtomProperty = this.tokenNext ();
var tokenComparator = this.tokenNext ();
if (!J.script.ScriptCompilationTokenParser.tokenAttr (tokenComparator, 269484288)) {
if (!isOptional) return this.errorStr (15, "== != < > <= >=");
if (tokenComparator != null) this.returnToken ();
this.returnToken ();
return false;
}if (J.script.ScriptCompilationTokenParser.tokenAttr (tokenAtomProperty, 1087373312) && tokenComparator.tok != 269484436 && tokenComparator.tok != 269484438) return this.errorStr (15, "== !=");
if (this.getToken () == null) return this.errorStr (17, "" + this.valuePeek ());
var isNegative = (this.isToken (269484192));
if (isNegative && this.getToken () == null) return this.error (12);
switch (this.theToken.tok) {
case 2:
case 3:
case 1073741824:
case 4:
case 1048586:
case 1060866:
break;
default:
if (!J.script.T.tokAttr (this.theToken.tok, 1073741824)) return this.error (13);
}
this.addTokenToPostfixInt (tokenComparator.tok, tokenAtomProperty.tok, tokenComparator.value + (isNegative ? " -" : ""));
if (tokenAtomProperty.tok == 1716520985) this.addTokenToPostfixToken (tokenAtomProperty);
if (this.isToken (1048586)) {
this.returnToken ();
return this.clausePrimitive ();
}this.addTokenToPostfixToken (this.theToken);
if (this.theToken.tok == 1060866) return this.clauseDefine (true, false);
return true;
}, "~B");
$_M(c$, "clauseCell", 
function (tok) {
var cell =  new JU.P3 ();
this.tokenNext ();
if (!this.tokenNextTok (269484436)) return this.errorStr (15, "=");
if (this.getToken () == null) return this.error (3);
if (this.isToken (2)) {
var nnn = this.theToken.intValue;
cell.x = Clazz_doubleToInt (nnn / 100) - 4;
cell.y = Clazz_doubleToInt ((nnn % 100) / 10) - 4;
cell.z = (nnn % 10) - 4;
return this.addTokenToPostfix (tok, cell);
}if (!this.isToken (1048586) || !this.getNumericalToken ()) return this.error (3);
cell.x = this.floatValue ();
if (this.tokPeekIs (269484080)) this.tokenNext ();
if (!this.getNumericalToken ()) return this.error (3);
cell.y = this.floatValue ();
if (this.tokPeekIs (269484080)) this.tokenNext ();
if (!this.getNumericalToken () || !this.tokenNextTok (1048590)) return this.error (3);
cell.z = this.floatValue ();
return this.addTokenToPostfix (tok, cell);
}, "~N");
$_M(c$, "clauseDefine", 
function (haveToken, forceString) {
if (!haveToken) {
var token = this.tokenNext ();
if (forceString) token = J.script.T.tokenDefineString;
this.addTokenToPostfixToken (token);
}if (this.tokPeek () == 0) return this.error (4);
if (!this.addSubstituteTokenIf (1048586, J.script.T.tokenExpressionBegin)) return this.addNextToken () && this.checkForItemSelector (true);
while (this.moreTokens () && !this.tokPeekIs (1048590)) {
if (this.tokPeekIs (1048586)) {
if (!this.checkForCoordinate (true)) return false;
} else {
this.addNextToken ();
}}
return this.addSubstituteTokenIf (1048590, J.script.T.tokenExpressionEnd) && this.checkForItemSelector (true);
}, "~B,~B");
$_M(c$, "generateResidueSpecCode", 
function (token) {
if (this.residueSpecCodeGenerated) this.addTokenToPostfixToken (J.script.T.tokenAND);
this.addTokenToPostfixToken (token);
this.residueSpecCodeGenerated = true;
return true;
}, "J.script.T");
$_M(c$, "clauseResidueSpec", 
function () {
var tok = this.tokPeek ();
this.residueSpecCodeGenerated = false;
var checkResNameSpec = false;
switch (tok) {
case 0:
case 3145732:
case 3145750:
return false;
case 269484066:
case 2:
case 269484210:
case 5:
break;
case 269484209:
case 269484096:
case 1073741824:
checkResNameSpec = true;
break;
default:
if (J.script.T.tokAttr (tok, 269484288)) return false;
var str = "" + this.valuePeek ();
checkResNameSpec = (str.length == 2 || str.length == 3);
if (!checkResNameSpec) return false;
}
var specSeen = false;
if (checkResNameSpec) {
if (!this.clauseResNameSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
if (J.script.T.tokAttr (tok, 269484288)) {
this.returnToken ();
this.ltokenPostfix.remove (this.ltokenPostfix.size () - 1);
return false;
}}var wasInteger = false;
if (tok == 269484209 || tok == 2 || tok == 5) {
wasInteger = (tok == 2);
if (this.tokPeekIs (269484209)) this.getToken ();
 else if (!this.clauseSequenceSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 269484066 || tok == 269484209 || tok == 1073741824 || tok == 1112541205 || tok == 1112541206 || tok == 1112541207 || tok == 1141899280 || tok == 2 && !wasInteger) {
if (!this.clauseChainSpec (tok)) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 1048584) {
if (!this.clauseAtomSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 269484210) {
if (!this.clauseAlternateSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (tok == 269484066 || tok == 269484208) {
if (!this.clauseModelSpec ()) return false;
specSeen = true;
tok = this.tokPeek ();
}if (!specSeen) return this.error (14);
if (!this.residueSpecCodeGenerated) {
this.addTokenToPostfixToken (J.script.T.tokenAll);
}return true;
});
$_M(c$, "clauseResNameSpec", 
function () {
this.getToken ();
switch (this.theToken.tok) {
case 269484209:
return true;
case 269484096:
var strSpec = "";
while (this.getToken () != null && !this.isToken (269484097)) strSpec += this.theValue;

if (!this.isToken (269484097)) return false;
if (strSpec === "") return true;
var pt;
if (strSpec.length > 0 && (pt = strSpec.indexOf ("*")) >= 0 && pt != strSpec.length - 1) return this.error (14);
strSpec = strSpec.toUpperCase ();
return this.generateResidueSpecCode (J.script.T.o (1048612, strSpec));
default:
var res = this.theValue;
if (this.tokPeekIs (269484209)) {
res = this.theValue + "*";
this.getToken ();
}return this.generateResidueSpecCode (J.script.T.o (1073741824, res));
}
});
$_M(c$, "clauseSequenceSpec", 
function () {
var seqToken = this.getSequenceCode (false);
if (seqToken == null) return false;
var tok = this.tokPeek ();
if (tok == 269484192 || tok == 2 && this.intPeek () < 0) {
if (tok == 269484192) {
this.tokenNext ();
} else {
var i = -this.intPeek ();
this.tokenNext ().intValue = i;
this.returnToken ();
}seqToken.tok = 1048615;
this.generateResidueSpecCode (seqToken);
return this.addTokenToPostfixToken (this.getSequenceCode (true));
}return this.generateResidueSpecCode (seqToken);
});
$_M(c$, "getSequenceCode", 
function (isSecond) {
var seqcode = 2147483647;
var seqvalue = 2147483647;
var tokPeek = this.tokPeek ();
if (tokPeek == 5) seqcode = this.tokenNext ().intValue;
 else if (tokPeek == 2) seqvalue = this.tokenNext ().intValue;
 else if (!isSecond) {
return null;
}return J.script.T.tv (1048614, seqvalue, Integer.$valueOf (seqcode));
}, "~B");
$_M(c$, "clauseChainSpec", 
function (tok) {
if (tok == 269484066) {
this.tokenNext ();
tok = this.tokPeek ();
if (this.isSpecTerminator (tok)) return this.generateResidueSpecCode (J.script.T.tv (1048609, 0, "spec_chain"));
}var chain;
switch (tok) {
case 269484209:
return (this.getToken () != null);
case 2:
this.getToken ();
var val = this.theToken.intValue;
if (val < 0 || val > 9999) return this.error (8);
chain = this.viewer.getChainID ("" + val);
break;
default:
var strChain = "" + this.getToken ().value;
if (strChain.equals ("?")) return true;
chain = this.viewer.getChainID (strChain);
break;
}
return this.generateResidueSpecCode (J.script.T.tv (1048609, chain, "spec_chain"));
}, "~N");
$_M(c$, "isSpecTerminator", 
function (tok) {
switch (tok) {
case 0:
case 269484208:
case 269484128:
case 269484112:
case 269484144:
case 269484080:
case 269484210:
case 269484049:
case 1048590:
return true;
}
return false;
}, "~N");
$_M(c$, "clauseAlternateSpec", 
function () {
this.tokenNext ();
var tok = this.tokPeek ();
if (this.isSpecTerminator (tok)) return this.generateResidueSpecCode (J.script.T.o (1048607, null));
var alternate = this.getToken ().value;
switch (this.theToken.tok) {
case 269484209:
case 4:
case 2:
case 1073741824:
break;
default:
return this.error (10);
}
return this.generateResidueSpecCode (J.script.T.o (1048607, alternate));
});
$_M(c$, "clauseModelSpec", 
function () {
this.getToken ();
if (this.tokPeekIs (269484209)) {
this.getToken ();
return true;
}switch (this.tokPeek ()) {
case 2:
return this.generateResidueSpecCode (J.script.T.o (1048610, Integer.$valueOf (this.getToken ().intValue)));
case 3:
return this.generateResidueSpecCode (J.script.T.tv (1048610, this.fixModelSpec (this.getToken ()), this.theValue));
case 269484080:
case 1048590:
case 0:
return this.generateResidueSpecCode (J.script.T.o (1048610, Integer.$valueOf (1)));
}
return this.error (10);
});
$_M(c$, "fixModelSpec", 
function (token) {
var ival = token.intValue;
if (ival == 2147483647) {
var f = (this.theValue).floatValue ();
if (f == Clazz_floatToInt (f)) ival = (Clazz_floatToInt (f)) * 1000000;
if (ival < 0) ival = 2147483647;
}return ival;
}, "J.script.T");
$_M(c$, "clauseAtomSpec", 
function () {
if (!this.tokenNextTok (1048584)) return this.error (7);
if (this.getToken () == null) return true;
var atomSpec = "";
if (this.isToken (2)) {
atomSpec += "" + this.theToken.intValue;
if (this.getToken () == null) return this.error (7);
}switch (this.theToken.tok) {
case 269484209:
return true;
}
atomSpec += "" + this.theToken.value;
if (this.tokPeekIs (269484209)) {
this.tokenNext ();
atomSpec += "'";
}var atomID = J.viewer.JC.lookupSpecialAtomID (atomSpec.toUpperCase ());
return this.generateResidueSpecCode (J.script.T.tv (1048608, atomID, atomSpec));
});
c$.errorString = $_M(c$, "errorString", 
function (iError, value, more, translated) {
var doTranslate = false;
if (!translated && (doTranslate = J.i18n.GT.getDoTranslate ()) == true) J.i18n.GT.setDoTranslate (false);
var msg;
switch (iError) {
default:
msg = "Unknown compiler error message number: " + iError;
break;
case 0:
msg = J.i18n.GT._ ("bad argument count");
break;
case 1:
msg = J.i18n.GT._ ("invalid context for {0}");
break;
case 2:
msg = J.i18n.GT._ ("command expected");
break;
case 3:
msg = J.i18n.GT._ ("{ number number number } expected");
break;
case 4:
msg = J.i18n.GT._ ("unexpected end of script command");
break;
case 5:
msg = J.i18n.GT._ ("end of expression expected");
break;
case 6:
msg = J.i18n.GT._ ("identifier or residue specification expected");
break;
case 7:
msg = J.i18n.GT._ ("invalid atom specification");
break;
case 8:
msg = J.i18n.GT._ ("invalid chain specification");
break;
case 9:
msg = J.i18n.GT._ ("invalid expression token: {0}");
break;
case 10:
msg = J.i18n.GT._ ("invalid model specification");
break;
case 11:
msg = J.i18n.GT._ ("missing END for {0}");
break;
case 12:
msg = J.i18n.GT._ ("number expected");
break;
case 13:
msg = J.i18n.GT._ ("number or variable name expected");
break;
case 14:
msg = J.i18n.GT._ ("residue specification (ALA, AL?, A*) expected");
break;
case 15:
msg = J.i18n.GT._ ("{0} expected");
break;
case 16:
msg = J.i18n.GT._ ("{0} unexpected");
break;
case 17:
msg = J.i18n.GT._ ("unrecognized expression token: {0}");
break;
case 18:
msg = J.i18n.GT._ ("unrecognized {0} parameter");
break;
case 19:
msg = J.i18n.GT._ ("unrecognized token: {0}");
break;
}
if (msg.indexOf ("{0}") < 0) {
if (value != null) msg += ": " + value;
} else {
msg = JU.PT.simpleReplace (msg, "{0}", value);
if (msg.indexOf ("{1}") >= 0) msg = JU.PT.simpleReplace (msg, "{1}", more);
 else if (more != null) msg += ": " + more;
}if (!translated) J.i18n.GT.setDoTranslate (doTranslate);
return msg;
}, "~N,~S,~S,~B");
$_M(c$, "commandExpected", 
function () {
this.ichToken = this.ichCurrentCommand;
return this.error (2);
});
$_M(c$, "error", 
function (error) {
return this.errorIntStr2 (error, null, null);
}, "~N");
$_M(c$, "errorStr", 
function (error, value) {
return this.errorIntStr2 (error, value, null);
}, "~N,~S");
$_M(c$, "errorIntStr2", 
function (iError, value, more) {
var strError = J.script.ScriptCompilationTokenParser.errorString (iError, value, more, true);
var strUntranslated = (J.i18n.GT.getDoTranslate () ? J.script.ScriptCompilationTokenParser.errorString (iError, value, more, false) : null);
return this.errorStr2 (strError, strUntranslated);
}, "~N,~S,~S");
$_M(c$, "isError", 
function () {
return this.errorMessage != null;
});
$_M(c$, "errorStr2", 
function (errorMessage, strUntranslated) {
this.errorMessage = errorMessage;
this.errorMessageUntranslated = strUntranslated;
return false;
}, "~S,~S");
Clazz_defineStatics (c$,
"ERROR_badArgumentCount", 0,
"ERROR_badContext", 1,
"ERROR_commandExpected", 2,
"ERROR_endOfCommandUnexpected", 4,
"ERROR_invalidExpressionToken", 9,
"ERROR_missingEnd", 11,
"ERROR_tokenExpected", 15,
"ERROR_tokenUnexpected", 16,
"ERROR_unrecognizedParameter", 18,
"ERROR_unrecognizedToken", 19,
"ERROR_coordinateExpected", 3,
"ERROR_endOfExpressionExpected", 5,
"ERROR_identifierOrResidueSpecificationExpected", 6,
"ERROR_invalidAtomSpecification", 7,
"ERROR_invalidChainSpecification", 8,
"ERROR_invalidModelSpecification", 10,
"ERROR_numberExpected", 12,
"ERROR_numberOrVariableNameExpected", 13,
"ERROR_residueSpecificationExpected", 14,
"ERROR_unrecognizedExpressionToken", 17);
});
Clazz_declarePackage ("J.script");
Clazz_load (null, "J.script.ScriptFlowContext", ["J.script.ScriptCompiler"], function () {
c$ = Clazz_decorateAsClass (function () {
this.compiler = null;
this.token = null;
this.pt0 = 0;
this.ptDefault = 0;
this.$function = null;
this.$var = null;
this.parent = null;
this.lineStart = 0;
this.commandStart = 0;
this.ptLine = 0;
this.ptCommand = 0;
this.forceEndIf = true;
this.ident = null;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptFlowContext");
Clazz_makeConstructor (c$, 
function (compiler, token, pt0, parent) {
this.compiler = compiler;
this.token = token;
this.ident = token.value;
this.pt0 = pt0;
this.parent = parent;
this.lineStart = this.ptLine = this.compiler.lineCurrent;
this.commandStart = this.ptCommand = this.compiler.iCommand;
}, "J.script.ScriptCompiler,J.script.ContextToken,~N,J.script.ScriptFlowContext");
$_M(c$, "getBreakableContext", 
function (nLevelsUp) {
var f = this;
while (f != null && (!J.script.ScriptCompiler.isBreakableContext (f.token.tok) || nLevelsUp-- > 0)) f = f.getParent ();

return f;
}, "~N");
$_M(c$, "checkForceEndIf", 
function () {
var test = this.forceEndIf && this.ptCommand < this.compiler.iCommand && this.ptLine == this.compiler.lineCurrent;
if (test) this.forceEndIf = false;
return test;
});
$_M(c$, "setPt0", 
function (pt0, isDefault) {
this.pt0 = pt0;
if (isDefault) this.ptDefault = pt0;
this.setLine ();
return pt0;
}, "~N,~B");
$_M(c$, "setLine", 
function () {
this.ptLine = this.compiler.lineCurrent;
this.ptCommand = this.compiler.iCommand + 1;
});
$_V(c$, "toString", 
function () {
return "ident " + this.ident + " line " + this.lineStart + " command " + this.commandStart;
});
$_M(c$, "getParent", 
function () {
return this.parent;
});
$_M(c$, "path", 
function () {
var s = "";
var f = this;
while (f != null) {
s = f.ident + "-" + s;
f = f.parent;
}
return "[" + s + "]";
});
$_M(c$, "setFunction", 
function ($function) {
this.$function = $function;
}, "J.script.ScriptFunction");
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.api.JmolScriptFunction", "java.util.Hashtable", "JU.List"], "J.script.ScriptFunction", ["JU.AU", "$.SB", "J.script.SV", "$.T"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pt0 = 0;
this.chpt0 = 0;
this.cmdpt0 = -1;
this.typeName = null;
this.name = null;
this.nParameters = 0;
this.names = null;
this.tok = 0;
this.variables = null;
this.returnValue = null;
this.aatoken = null;
this.lineIndices = null;
this.lineNumbers = null;
this.script = null;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptFunction", null, J.api.JmolScriptFunction);
Clazz_prepareFields (c$, function () {
this.names =  new JU.List ();
this.variables =  new java.util.Hashtable ();
});
$_M(c$, "isVariable", 
function (ident) {
return this.variables.containsKey (ident);
}, "~S");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_makeConstructor (c$, 
function (name, tok) {
this.set (name, tok);
this.typeName = J.script.T.nameOf (tok);
}, "~S,~N");
$_M(c$, "set", 
function (name, tok) {
this.name = name;
this.tok = tok;
}, "~S,~N");
$_M(c$, "setVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
for (var i = this.names.size (); --i >= 0; ) {
var name = this.names.get (i).toLowerCase ();
var $var = (i < this.nParameters && i < nParams ? params.get (i) : null);
if ($var != null && $var.tok != 7) $var = J.script.SV.newT ($var);
contextVariables.put (name, ($var == null ? J.script.SV.newS ("").setName (name) : $var));
}
contextVariables.put ("_retval", J.script.SV.newI (this.tok == 364558 ? 2147483647 : 0));
}, "java.util.Map,JU.List");
$_M(c$, "unsetVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
var nNames = this.names.size ();
if (nParams == 0 || nNames == 0) return;
for (var i = 0; i < nNames && i < nParams; i++) {
var global = params.get (i);
if (global.tok != 7) continue;
var local = contextVariables.get (this.names.get (i).toLowerCase ());
if (local.tok != 7) continue;
global.value = local.value;
}
}, "java.util.Map,JU.List");
$_M(c$, "addVariable", 
function (name, isParameter) {
this.variables.put (name, name);
this.names.addLast (name);
if (isParameter) this.nParameters++;
}, "~S,~B");
c$.setFunction = $_M(c$, "setFunction", 
function ($function, script, ichCurrentCommand, pt, lineNumbers, lineIndices, lltoken) {
var cmdpt0 = $function.cmdpt0;
var chpt0 = $function.chpt0;
var nCommands = pt - cmdpt0;
$function.setScript (script.substring (chpt0, ichCurrentCommand));
var aatoken = $function.aatoken =  new Array (nCommands);
$function.lineIndices = JU.AU.newInt2 (nCommands);
$function.lineNumbers =  Clazz_newShortArray (nCommands, 0);
var line0 = (lineNumbers[cmdpt0] - 1);
for (var i = 0; i < nCommands; i++) {
$function.lineNumbers[i] = (lineNumbers[cmdpt0 + i] - line0);
$function.lineIndices[i] = [lineIndices[cmdpt0 + i][0] - chpt0, lineIndices[cmdpt0 + i][1] - chpt0];
aatoken[i] = lltoken.get (cmdpt0 + i);
if (aatoken[i].length > 0) {
var tokenCommand = aatoken[i][0];
if (J.script.T.tokAttr (tokenCommand.tok, 102400)) tokenCommand.intValue -= (tokenCommand.intValue < 0 ? -cmdpt0 : cmdpt0);
}}
for (var i = pt; --i >= cmdpt0; ) {
lltoken.remove (i);
lineIndices[i][0] = lineIndices[i][1] = 0;
}
}, "J.script.ScriptFunction,~S,~N,~N,~A,~A,JU.List");
$_M(c$, "setScript", 
function (s) {
this.script = s;
if (this.script != null && this.script !== "" && !this.script.endsWith ("\n")) this.script += "\n";
}, "~S");
$_V(c$, "toString", 
function () {
var s =  new JU.SB ().append ("/*\n * ").append (this.name).append ("\n */\n").append (this.getSignature ()).append ("{\n");
if (this.script != null) s.append (this.script);
s.append ("}\n");
return s.toString ();
});
$_V(c$, "getSignature", 
function () {
var s =  new JU.SB ().append (this.typeName).append (" ").append (this.name).append (" (");
for (var i = 0; i < this.nParameters; i++) {
if (i > 0) s.append (", ");
s.append (this.names.get (i));
}
s.append (")");
return s.toString ();
});
$_V(c$, "geTokens", 
function () {
return this.aatoken;
});
$_V(c$, "getName", 
function () {
return this.name;
});
$_V(c$, "getTok", 
function () {
return this.tok;
});
});
Clazz_declarePackage ("J.script");
Clazz_load (["J.script.ScriptException"], "J.script.ScriptInterruption", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.willResume = false;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptInterruption", J.script.ScriptException);
Clazz_makeConstructor (c$, 
function (eval, why, millis) {
Clazz_superConstructor (this, J.script.ScriptInterruption, [eval, why, "!", eval.viewer.autoExit]);
this.willResume = (millis != 2147483647);
if (why.equals ("delay")) eval.delayScript (millis);
}, "J.script.ScriptEvaluator,~S,~N");
});
Clazz_declarePackage ("J.script");
Clazz_load (null, "J.script.ScriptMathProcessor", ["java.lang.Float", "java.util.Arrays", "$.Hashtable", "JU.A4", "$.AU", "$.CU", "$.DF", "$.List", "$.M3", "$.M4", "$.P3", "$.P4", "$.PT", "$.V3", "J.modelset.BondSet", "J.script.SV", "$.T", "J.util.BSUtil", "$.Escape", "$.Logger", "$.Quaternion"], function () {
c$ = Clazz_decorateAsClass (function () {
this.chk = false;
this.wasSyntaxCheck = false;
this.logMessages = false;
this.eval = null;
this.viewer = null;
this.oStack = null;
this.xStack = null;
this.ifStack = null;
this.ifPt = -1;
this.oPt = -1;
this.xPt = -1;
this.parenCount = 0;
this.squareCount = 0;
this.braceCount = 0;
this.wasX = false;
this.incrementX = 0;
this.isArrayItem = false;
this.asVector = false;
this.asBitSet = false;
this.ptid = 0;
this.ptx = 2147483647;
this.skipping = false;
this.haveSpaceBeforeSquare = false;
this.equalCount = 0;
Clazz_instantialize (this, arguments);
}, J.script, "ScriptMathProcessor");
Clazz_prepareFields (c$, function () {
this.oStack =  new Array (8);
this.xStack =  new Array (8);
this.ifStack =  Clazz_newCharArray (8, '\0');
});
Clazz_makeConstructor (c$, 
function (eval, isArrayItem, asVector, asBitSet) {
this.eval = eval;
this.viewer = eval.viewer;
this.logMessages = eval.logMessages;
this.chk = this.wasSyntaxCheck = eval.chk;
this.isArrayItem = isArrayItem;
this.asVector = asVector || isArrayItem;
this.asBitSet = asBitSet;
this.wasX = isArrayItem;
if (this.logMessages) J.util.Logger.debug ("initialize RPN");
}, "J.script.ScriptEvaluator,~B,~B,~B");
$_M(c$, "getResult", 
function (allowUnderflow) {
var isOK = true;
while (isOK && this.oPt >= 0) isOK = this.operate ();

if (isOK) {
if (this.asVector) {
var result =  new JU.List ();
for (var i = 0; i <= this.xPt; i++) result.addLast (J.script.SV.selectItemVar (this.xStack[i]));

return J.script.SV.newV (135198, result);
}if (this.xPt == 0) {
var x = this.xStack[0];
if (x.tok == 10 || x.tok == 7 || x.tok == 4 || x.tok == 11 || x.tok == 12) x = J.script.SV.selectItemVar (x);
if (this.asBitSet && x.tok == 7) x = J.script.SV.newV (10, J.script.SV.unEscapeBitSetArray (x.value, false));
return x;
}}if (!allowUnderflow && (this.xPt >= 0 || this.oPt >= 0)) {
this.eval.error (22);
}return null;
}, "~B");
$_M(c$, "putX", 
function (x) {
if (this.skipping) return;
if (++this.xPt == this.xStack.length) this.xStack = JU.AU.doubleLength (this.xStack);
if (this.logMessages) {
J.util.Logger.debug ("\nputX: " + x);
}this.xStack[this.xPt] = x;
this.ptx = ++this.ptid;
}, "J.script.SV");
$_M(c$, "putOp", 
function (op) {
if (++this.oPt >= this.oStack.length) this.oStack = JU.AU.doubleLength (this.oStack);
this.oStack[this.oPt] = op;
this.ptid++;
}, "J.script.T");
$_M(c$, "putIf", 
function (c) {
if (++this.ifPt >= this.ifStack.length) this.ifStack = JU.AU.doubleLength (this.ifStack);
this.ifStack[this.ifPt] = c;
}, "~S");
$_M(c$, "addXVar", 
function (x) {
this.putX (x);
return this.wasX = true;
}, "J.script.SV");
$_M(c$, "addXObj", 
function (x) {
var v = J.script.SV.getVariable (x);
if (v == null) return false;
this.putX (v);
return this.wasX = true;
}, "~O");
$_M(c$, "addXStr", 
function (x) {
this.putX (J.script.SV.newS (x));
return this.wasX = true;
}, "~S");
$_M(c$, "addXBool", 
function (x) {
this.putX (J.script.SV.getBoolean (x));
return this.wasX = true;
}, "~B");
$_M(c$, "addXInt", 
function (x) {
this.putX (J.script.SV.newI (x));
return this.wasX = true;
}, "~N");
$_M(c$, "addXList", 
function (x) {
this.putX (J.script.SV.getVariableList (x));
return this.wasX = true;
}, "JU.List");
$_M(c$, "addXMap", 
function (x) {
this.putX (J.script.SV.getVariableMap (x));
return this.wasX = true;
}, "java.util.Map");
$_M(c$, "addXM3", 
function (x) {
this.putX (J.script.SV.newV (11, x));
return this.wasX = true;
}, "JU.M3");
$_M(c$, "addXM4", 
function (x) {
this.putX (J.script.SV.newV (12, x));
return this.wasX = true;
}, "JU.M4");
$_M(c$, "addXFloat", 
function (x) {
if (Float.isNaN (x)) return this.addXStr ("NaN");
this.putX (J.script.SV.newV (3, Float.$valueOf (x)));
return this.wasX = true;
}, "~N");
$_M(c$, "addXBs", 
function (bs) {
this.putX (J.script.SV.newV (10, bs));
return this.wasX = true;
}, "JU.BS");
$_M(c$, "addXPt", 
function (pt) {
this.putX (J.script.SV.newV (8, pt));
return this.wasX = true;
}, "JU.P3");
$_M(c$, "addXPt4", 
function (pt) {
this.putX (J.script.SV.newV (9, pt));
return this.wasX = true;
}, "JU.P4");
$_M(c$, "addXNum", 
function (x) {
if (this.wasX) switch (x.tok) {
case 2:
if (x.intValue < 0) {
this.addOp (J.script.T.tokenMinus);
x = J.script.SV.newI (-x.intValue);
}break;
case 3:
var f = (x.value).floatValue ();
if (f < 0 || f == 0 && 1 / f == -Infinity) {
this.addOp (J.script.T.tokenMinus);
x = J.script.SV.newV (3, Float.$valueOf (-f));
}break;
}
this.putX (x);
return this.wasX = true;
}, "J.script.SV");
$_M(c$, "addXAV", 
function (x) {
this.putX (J.script.SV.getVariableAV (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAD", 
function (x) {
this.putX (J.script.SV.getVariableAD (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAS", 
function (x) {
this.putX (J.script.SV.getVariableAS (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAI", 
function (x) {
this.putX (J.script.SV.getVariableAI (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAII", 
function (x) {
this.putX (J.script.SV.getVariableAII (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAF", 
function (x) {
this.putX (J.script.SV.getVariableAF (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAFF", 
function (x) {
this.putX (J.script.SV.getVariableAFF (x));
return this.wasX = true;
}, "~A");
c$.isOpFunc = $_M(c$, "isOpFunc", 
function (op) {
return (J.script.T.tokAttr (op.tok, 135266304) && op !== J.script.T.tokenArraySquare || op.tok == 269484241 && J.script.T.tokAttr (op.intValue, 135266304));
}, "J.script.T");
$_M(c$, "addOp", 
function (op) {
return this.addOpAllowMath (op, true);
}, "J.script.T");
$_M(c$, "addOpAllowMath", 
function (op, allowMathFunc) {
if (this.logMessages) {
J.util.Logger.debug ("addOp entry\naddOp: " + op);
}var tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
this.skipping = (this.ifPt >= 0 && (this.ifStack[this.ifPt] == 'F' || this.ifStack[this.ifPt] == 'X'));
if (this.skipping) {
switch (op.tok) {
case 269484048:
this.putOp (op);
return true;
case 269484066:
if (tok0 != 269484066 || this.ifStack[this.ifPt] == 'X') return true;
this.ifStack[this.ifPt] = 'T';
this.wasX = false;
this.skipping = false;
return true;
case 269484049:
if (tok0 == 269484048) {
this.oPt--;
return true;
}if (tok0 != 269484066) {
this.putOp (op);
return true;
}this.wasX = true;
this.ifPt--;
this.oPt -= 2;
this.skipping = false;
return true;
default:
return true;
}
}var newOp = null;
var tok;
var isLeftOp = false;
var isDotSelector = (op.tok == 269484241);
if (isDotSelector && !this.wasX) return false;
var isMathFunc = (allowMathFunc && J.script.ScriptMathProcessor.isOpFunc (op));
if (this.oPt >= 1 && op.tok != 269484048 && tok0 == 135266319) tok0 = this.oStack[--this.oPt].tok;
var isArgument = (this.oPt >= 1 && tok0 == 269484048);
switch (op.tok) {
case 1073742195:
this.haveSpaceBeforeSquare = true;
return true;
case 269484080:
if (!this.wasX) return false;
break;
case 32:
case 64:
case 96:
case 128:
case 160:
case 192:
case 480:
tok = (this.oPt < 0 ? 0 : tok0);
if (!this.wasX || !(tok == 269484241 || tok == 1678770178 || tok == 1141899265)) return false;
this.oStack[this.oPt].intValue |= op.tok;
return true;
case 269484096:
isLeftOp = true;
if (!this.wasX || this.haveSpaceBeforeSquare) {
this.squareCount++;
op = newOp = J.script.T.tokenArraySquare;
this.haveSpaceBeforeSquare = false;
}break;
case 269484097:
break;
case 269484225:
case 269484226:
this.incrementX = (op.tok == 269484226 ? 1 : -1);
if (this.ptid == this.ptx) {
if (this.chk) return true;
var x = this.xStack[this.xPt];
this.xStack[this.xPt] = J.script.SV.newS ("").setv (x, false);
return x.increment (this.incrementX);
}break;
case 269484192:
if (this.wasX) break;
this.addXInt (0);
op = J.script.SV.newV (269484224, "-");
break;
case 269484049:
if (!this.wasX && this.oPt >= 1 && tok0 == 269484048 && !J.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt - 1])) return false;
break;
case 269484144:
case 269484048:
isLeftOp = true;
default:
if (isMathFunc) {
if (!isDotSelector && this.wasX && !isArgument) return false;
newOp = op;
isLeftOp = true;
break;
}if (this.wasX == isLeftOp && tok0 != 269484241) return false;
break;
}
while (this.oPt >= 0 && tok0 != 269484066 && (!isLeftOp || tok0 == 269484241 && (op.tok == 269484241 || op.tok == 269484096)) && J.script.T.getPrecedence (tok0) >= J.script.T.getPrecedence (op.tok)) {
if (this.logMessages) {
J.util.Logger.debug ("\noperating, oPt=" + this.oPt + " isLeftOp=" + isLeftOp + " oStack[oPt]=" + J.script.T.nameOf (tok0) + "        prec=" + J.script.T.getPrecedence (tok0) + " pending op=\"" + J.script.T.nameOf (op.tok) + "\" prec=" + J.script.T.getPrecedence (op.tok));
this.dumpStacks ("operating");
}if (op.tok == 269484049 && tok0 == 269484048) {
if (this.xPt >= 0) this.xStack[this.xPt] = J.script.SV.selectItemVar (this.xStack[this.xPt]);
break;
}if (op.tok == 269484097 && tok0 == 135266306) {
break;
}if (op.tok == 269484097 && tok0 == 269484096) {
if (this.isArrayItem && this.squareCount == 1 && this.equalCount == 0) {
this.addXVar (J.script.SV.newT (J.script.T.tokenArraySelector));
break;
}if (!this.doBitsetSelect ()) return false;
break;
}if (!this.operate ()) return false;
tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
}
if (newOp != null) this.addXVar (J.script.SV.newV (269484436, newOp));
switch (op.tok) {
case 269484048:
this.parenCount++;
this.wasX = false;
break;
case 806354977:
var isFirst = this.getX ().asBoolean ();
if (tok0 == 269484066) this.ifPt--;
 else this.putOp (J.script.T.tokenColon);
this.putIf (isFirst ? 'T' : 'F');
this.skipping = !isFirst;
this.wasX = false;
return true;
case 269484066:
if (tok0 != 269484066) return false;
if (this.ifPt < 0) return false;
this.ifStack[this.ifPt] = 'X';
this.wasX = false;
this.skipping = true;
return true;
case 269484049:
this.wasX = true;
if (this.parenCount-- <= 0) return false;
if (tok0 == 269484066) {
this.ifPt--;
this.oPt--;
}this.oPt--;
if (this.oPt < 0) return true;
if (J.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt]) && !this.evaluateFunction (0)) return false;
this.skipping = (this.ifPt >= 0 && this.ifStack[this.ifPt] == 'X');
return true;
case 269484080:
this.wasX = false;
return true;
case 269484096:
this.squareCount++;
this.wasX = false;
break;
case 269484097:
this.wasX = true;
if (this.squareCount-- <= 0 || this.oPt < 0) return false;
if (this.oStack[this.oPt].tok == 135266306) return this.evaluateFunction (269484096);
this.oPt--;
return true;
case 269484241:
this.wasX = (!allowMathFunc || !J.script.T.tokAttr (op.intValue, 135266304));
break;
case 1048586:
this.braceCount++;
this.wasX = false;
break;
case 1048590:
if (this.braceCount-- <= 0) return false;
this.wasX = false;
break;
case 269484128:
case 269484112:
if (!this.wasSyntaxCheck && this.xPt < 0) return false;
if (!this.wasSyntaxCheck && this.xStack[this.xPt].tok != 10 && this.xStack[this.xPt].tok != 7) {
var tf = this.getX ().asBoolean ();
this.addXVar (J.script.SV.getBoolean (tf));
if (tf == (op.tok == 269484112)) {
this.chk = true;
op = (op.tok == 269484112 ? J.script.T.tokenOrTRUE : J.script.T.tokenAndFALSE);
}}this.wasX = false;
break;
case 269484436:
if (this.squareCount == 0) this.equalCount++;
this.wasX = false;
break;
default:
this.wasX = false;
}
this.putOp (op);
if (op.tok == 269484241 && (op.intValue & -481) == 135368713 && op.intValue != 135368713) {
return this.evaluateFunction (0);
}return true;
}, "J.script.T,~B");
$_M(c$, "doBitsetSelect", 
function () {
if (this.xPt < 0 || this.xPt == 0 && !this.isArrayItem) {
return false;
}var var1 = this.xStack[this.xPt--];
var $var = this.xStack[this.xPt];
if ($var.tok == 7 && var1.tok == 4 && $var.intValue != 2147483647) {
$var = J.script.SV.selectItemTok ($var, -2147483648);
}if ($var.tok == 6) {
var v = $var.mapValue (J.script.SV.sValue (var1));
this.xStack[this.xPt] = (v == null ? J.script.SV.newS ("") : v);
return true;
}var i = var1.asInt ();
switch ($var.tok) {
default:
$var = J.script.SV.newS (J.script.SV.sValue ($var));
case 10:
case 7:
case 4:
case 11:
case 12:
this.xStack[this.xPt] = J.script.SV.selectItemTok ($var, i);
break;
}
return true;
});
$_M(c$, "dumpStacks", 
function (message) {
J.util.Logger.debug ("\n\n------------------\nRPN stacks: " + message + "\n");
for (var i = 0; i <= this.xPt; i++) J.util.Logger.debug ("x[" + i + "]: " + this.xStack[i]);

J.util.Logger.debug ("\n");
for (var i = 0; i <= this.oPt; i++) J.util.Logger.debug ("o[" + i + "]: " + this.oStack[i] + " prec=" + J.script.T.getPrecedence (this.oStack[i].tok));

J.util.Logger.debug (" ifStack = " + ( String.instantialize (this.ifStack)).substring (0, this.ifPt + 1));
}, "~S");
$_M(c$, "getX", 
function () {
if (this.xPt < 0) this.eval.error (13);
var v = J.script.SV.selectItemVar (this.xStack[this.xPt]);
this.xStack[this.xPt--] = null;
return v;
});
$_M(c$, "evaluateFunction", 
function (tok) {
var op = this.oStack[this.oPt--];
if (tok == 0) tok = (op.tok == 269484241 ? op.intValue & -481 : op.tok);
var nParamMax = J.script.T.getMaxMathParams (tok);
var nParam = 0;
var pt = this.xPt;
while (pt >= 0 && this.xStack[pt--].value !== op) nParam++;

if (nParamMax > 0 && nParam > nParamMax) return false;
var args =  new Array (nParam);
for (var i = nParam; --i >= 0; ) args[i] = this.getX ();

this.xPt--;
return (!this.chk ? this.eval.getExtension ().evaluate (this, op, args, tok) : op.tok == 269484241 ? true : this.addXBool (true));
}, "~N");
$_M(c$, "operate", 
function () {
var op = this.oStack[this.oPt--];
var pt;
var m;
var s;
if (this.logMessages) {
this.dumpStacks ("operate: " + op);
}if (this.isArrayItem && this.squareCount == 0 && this.equalCount == 1 && this.oPt < 0 && (op.tok == 269484436)) {
return true;
}var x2 = this.getX ();
if (x2 === J.script.T.tokenArraySelector) return false;
if (op.tok == 269484225 || op.tok == 269484226) {
if (!this.chk && !x2.increment (this.incrementX)) return false;
this.wasX = true;
this.putX (x2);
return true;
}if (op.tok == 269484144) {
if (this.chk) return this.addXBool (true);
switch (x2.tok) {
case 9:
return this.addXPt4 ((J.util.Quaternion.newP4 (x2.value)).inv ().toPoint4f ());
case 11:
m = JU.M3.newM (x2.value);
m.invert ();
return this.addXM3 (m);
case 12:
var m4 = JU.M4.newM (x2.value);
m4.invert ();
return this.addXM4 (m4);
case 10:
return this.addXBs (J.util.BSUtil.copyInvert (J.script.SV.bsSelectVar (x2), (Clazz_instanceOf (x2.value, J.modelset.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
default:
return this.addXBool (!x2.asBoolean ());
}
}var iv = op.intValue & -481;
if (op.tok == 269484241) {
switch (iv) {
case 1073741824:
return this.getAllProperties (x2, op.value);
case 1141899267:
case 1276117012:
case 1141899270:
if (iv == 1141899267 && Clazz_instanceOf (x2.value, J.modelset.BondSet)) break;
return this.addXInt (J.script.SV.sizeOf (x2));
case 1141899272:
return this.addXStr (J.script.ScriptMathProcessor.typeOf (x2));
case 1141899281:
if (x2.tok != 6) return this.addXStr ("");
var keyset = (x2.value).keySet ();
var keys = keyset.toArray ( new Array (keyset.size ()));
java.util.Arrays.sort (keys);
return this.addXAS (keys);
case 1141899268:
switch (x2.tok) {
case 11:
case 12:
s = J.script.SV.sValue (x2);
s = JU.PT.simpleReplace (s.substring (1, s.length - 1), "],[", "]\n[");
break;
case 4:
s = x2.value;
break;
default:
s = J.script.SV.sValue (x2);
}
s = JU.PT.simpleReplace (s, "\n\r", "\n").$replace ('\r', '\n');
return this.addXAS (JU.PT.split (s, "\n"));
case 1766856708:
switch (x2.tok) {
case 4:
case 7:
s = J.script.SV.sValue (x2);
pt =  new JU.P3 ();
return this.addXPt (JU.CU.colorPtFromString (s, pt));
case 2:
case 3:
return this.addXPt (this.viewer.getColorPointForPropertyValue (J.script.SV.fValue (x2)));
case 8:
return this.addXStr (J.util.Escape.escapeColor (JU.CU.colorPtToFFRGB (x2.value)));
default:
}
break;
case 1679429641:
return (this.chk ? this.addXStr ("x") : this.getBoundBox (x2));
}
if (this.chk) return this.addXStr (J.script.SV.sValue (x2));
if (x2.tok == 4) {
var v = J.script.SV.unescapePointOrBitsetAsVariable (J.script.SV.sValue (x2));
if (!(Clazz_instanceOf (v, J.script.SV))) return false;
x2 = v;
}if (op.tok == x2.tok) x2 = this.getX ();
return this.getPointOrBitsetOperation (op, x2);
}var x1 = this.getX ();
if (this.chk) {
if (op === J.script.T.tokenAndFALSE || op === J.script.T.tokenOrTRUE) this.chk = false;
return this.addXVar (J.script.SV.newT (x1));
}return this.binaryOp (op, x1, x2);
});
$_M(c$, "binaryOp", 
function (op, x1, x2) {
var pt;
var pt4;
var m;
var s;
var f;
switch (op.tok) {
case 269484160:
case 269484128:
switch (x1.tok) {
case 10:
var bs = J.script.SV.bsSelectVar (x1);
switch (x2.tok) {
case 10:
bs = J.util.BSUtil.copy (bs);
bs.and (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
return (this.addXBool (x < 0 ? false : bs.get (x)));
}
break;
}
return this.addXBool (x1.asBoolean () && x2.asBoolean ());
case 269484112:
switch (x1.tok) {
case 10:
var bs = J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1));
switch (x2.tok) {
case 10:
bs.or (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
if (x < 0) break;
bs.set (x);
return this.addXBs (bs);
case 7:
var sv = x2.value;
for (var i = sv.size (); --i >= 0; ) {
var b = sv.get (i).asInt ();
if (b >= 0) bs.set (b);
}
return this.addXBs (bs);
}
break;
case 7:
return this.addXVar (J.script.SV.concatList (x1, x2, false));
}
return this.addXBool (x1.asBoolean () || x2.asBoolean ());
case 269484113:
if (x1.tok == 10 && x2.tok == 10) {
var bs = J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1));
bs.xor (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
}var a = x1.asBoolean ();
var b = x2.asBoolean ();
return this.addXBool (a && !b || b && !a);
case 269484114:
if (x1.tok != 10 || x2.tok != 10) return false;
return this.addXBs (J.util.BSUtil.toggleInPlace (J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1)), J.script.SV.bsSelectVar (x2)));
case 269484434:
return this.addXBool (x1.asFloat () <= x2.asFloat ());
case 269484433:
return this.addXBool (x1.asFloat () >= x2.asFloat ());
case 269484432:
return this.addXBool (x1.asFloat () > x2.asFloat ());
case 269484435:
return this.addXBool (x1.asFloat () < x2.asFloat ());
case 269484436:
return this.addXBool (J.script.SV.areEqual (x1, x2));
case 269484438:
return this.addXBool (!J.script.SV.areEqual (x1, x2));
case 269484193:
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 7:
return this.addXVar (J.script.SV.concatList (x1, x2, true));
case 2:
switch (x2.tok) {
case 4:
if ((s = J.script.SV.sValue (x2).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue + x2.asInt ());
break;
case 3:
return this.addXFloat (x1.intValue + x2.asFloat ());
}
return this.addXInt (x1.intValue + x2.asInt ());
case 4:
return this.addXVar (J.script.SV.newS (J.script.SV.sValue (x1) + J.script.SV.sValue (x2)));
case 9:
var q1 = J.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (x2.asFloat ()).toPoint4f ());
case 9:
return this.addXPt4 (q1.mulQ (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
pt.add (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.add (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x + f, pt.y + f, pt.z + f));
}
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 11:
m = JU.M3.newM (x1.value);
m.add (x2.value);
return this.addXM3 (m);
case 8:
return this.addXM4 (J.script.ScriptMathProcessor.getMatrix4f (x1.value, x2.value));
}
}
case 269484192:
if (x1.tok == 2) {
if (x2.tok == 4) {
if ((s = (J.script.SV.sValue (x2)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue - x2.asInt ());
} else if (x2.tok != 3) return this.addXInt (x1.intValue - x2.asInt ());
}if (x1.tok == 4 && x2.tok == 2) {
if ((s = (J.script.SV.sValue (x1)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.asInt () - x2.intValue);
}switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 6:
var ht =  new java.util.Hashtable (x1.value);
ht.remove (J.script.SV.sValue (x2));
return this.addXVar (J.script.SV.getVariableMap (ht));
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 11:
m = JU.M3.newM (x1.value);
m.sub (x2.value);
return this.addXM3 (m);
}
case 12:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 12:
var m4 = JU.M4.newM (x1.value);
m4.sub (x2.value);
return this.addXM4 (m4);
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x - f, pt.y - f, pt.z - f));
case 8:
pt.sub (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.sub (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
}
case 9:
var q1 = J.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (-x2.asFloat ()).toPoint4f ());
case 9:
var q2 = J.util.Quaternion.newP4 (x2.value);
return this.addXPt4 (q2.mulQ (q1.inv ()).toPoint4f ());
}
}
case 269484224:
switch (x2.tok) {
default:
return this.addXFloat (-x2.asFloat ());
case 2:
return this.addXInt (-x2.asInt ());
case 8:
pt = JU.P3.newP (x2.value);
pt.scale (-1.0);
return this.addXPt (pt);
case 9:
pt4 = JU.P4.newPt (x2.value);
pt4.scale (-1.0);
return this.addXPt4 (pt4);
case 11:
m = JU.M3.newM (x2.value);
m.transpose ();
return this.addXM3 (m);
case 12:
var m4 = JU.M4.newM (x2.value);
m4.transpose ();
return this.addXM4 (m4);
case 10:
return this.addXBs (J.util.BSUtil.copyInvert (J.script.SV.bsSelectVar (x2), (Clazz_instanceOf (x2.value, J.modelset.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
}
case 1276117508:
if (x1.tok == 8 && x2.tok == 8) {
pt = x1.value;
var pt2 = x2.value;
return this.addXPt (JU.P3.new3 (pt.x * pt2.x, pt.y * pt2.y, pt.z * pt2.z));
}case 269484209:
if (x1.tok == 2 && x2.tok != 3) return this.addXInt (x1.intValue * x2.asInt ());
pt = (x1.tok == 11 ? this.ptValue (x2, false) : x2.tok == 11 ? this.ptValue (x1, false) : null);
pt4 = (x1.tok == 12 ? this.planeValue (x2) : x2.tok == 12 ? this.planeValue (x1) : null);
switch (x2.tok) {
case 11:
if (pt != null) {
var m3b = JU.M3.newM (x2.value);
m3b.transpose ();
m3b.transform (pt);
if (x1.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
return this.addXPt4 ((J.util.Quaternion.newP4 (pt4).mulQ (J.util.Quaternion.newM (x2.value))).toPoint4f ());
}break;
case 12:
if (pt4 != null) {
var m4b = JU.M4.newM (x2.value);
m4b.transpose ();
m4b.transform4 (pt4);
if (x1.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}break;
}
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () * x2.asFloat ());
case 11:
var m3 = x1.value;
if (pt != null) {
m3.transform (pt);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}switch (x2.tok) {
case 11:
m = JU.M3.newM (x2.value);
m.mul2 (m3, m);
return this.addXM3 (m);
case 9:
return this.addXM3 (J.util.Quaternion.newM (m3).mulQ (J.util.Quaternion.newP4 (x2.value)).getMatrix ());
default:
f = x2.asFloat ();
var aa =  new JU.A4 ();
aa.setM (m3);
aa.angle *= f;
var m2 =  new JU.M3 ();
m2.setAA (aa);
return this.addXM3 (m2);
}
case 12:
var m4 = x1.value;
if (pt != null) {
m4.transform (pt);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
m4.transform4 (pt4);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}switch (x2.tok) {
case 12:
var m4b = JU.M4.newM (x2.value);
m4b.mul2 (m4, m4b);
return this.addXM4 (m4b);
default:
return this.addXStr ("NaN");
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
var pt2 = (x2.value);
return this.addXFloat (pt.x * pt2.x + pt.y * pt2.y + pt.z * pt2.z);
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x * f, pt.y * f, pt.z * f));
}
case 9:
switch (x2.tok) {
case 9:
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mulQ (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (x2.asFloat ()).toPoint4f ());
}
case 269484210:
s = null;
var n = x2.asInt ();
switch (x1.tok) {
case 1048589:
case 1048588:
case 2:
default:
if (n == 0) return this.addXInt (0);
return this.addXInt (x1.asInt () % n);
case 3:
f = x1.asFloat ();
if (n == 0) return this.addXInt (Math.round (f));
s = JU.DF.formatDecimal (f, n);
return this.addXStr (s);
case 4:
s = x1.value;
if (n == 0) return this.addXStr (JU.PT.trim (s, "\n\t "));
if (n == 9999) return this.addXStr (s.toUpperCase ());
if (n == -9999) return this.addXStr (s.toLowerCase ());
if (n > 0) return this.addXStr (JU.PT.formatS (s, n, n, false, false));
return this.addXStr (JU.PT.formatS (s, n, n - 1, true, false));
case 7:
var list = J.script.SV.listValue (x1);
for (var i = 0; i < list.length; i++) {
if (n == 0) list[i] = list[i].trim ();
 else if (n > 0) list[i] = JU.PT.formatS (list[i], n, n, true, false);
 else list[i] = JU.PT.formatS (s, -n, n, false, false);
}
return this.addXAS (list);
case 8:
pt = JU.P3.newP (x1.value);
this.viewer.toUnitCell (pt, JU.P3.new3 (n, n, n));
return this.addXPt (pt);
case 9:
pt4 = x1.value;
if (x2.tok == 8) return this.addXPt ((J.util.Quaternion.newP4 (pt4)).transformPt (x2.value));
if (x2.tok == 9) {
var v4 = JU.P4.newPt (x2.value);
(J.util.Quaternion.newP4 (pt4)).getThetaDirected (v4);
return this.addXPt4 (v4);
}if (n == 0 && x2.tok == 4) {
s = " " + x2.value.toString ().trim ().toLowerCase () + ":";
var i = " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".indexOf (s);
n = (i >= 0 ? JU.PT.parseInt (" w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".substring (i + s.length)) : -99);
}switch (n) {
case 0:
return this.addXFloat (pt4.w);
case 1:
return this.addXFloat (pt4.x);
case 2:
return this.addXFloat (pt4.y);
case 3:
return this.addXFloat (pt4.z);
}
var q = J.util.Quaternion.newP4 (pt4);
switch (n) {
case 4:
return this.addXPt (JU.P3.newP (q.getNormal ()));
case 5:
return this.addXAF (q.getEulerZXZ ());
case 6:
return this.addXAF (q.getEulerZYZ ());
case -1:
return this.addXPt (JU.P3.newP (q.getVector (-1)));
case -2:
return this.addXFloat (q.getTheta ());
case -3:
return this.addXPt (JU.P3.newP (q.getVector (0)));
case -4:
return this.addXPt (JU.P3.newP (q.getVector (1)));
case -5:
return this.addXPt (JU.P3.newP (q.getVector (2)));
case -6:
var ax = q.toAxisAngle4f ();
return this.addXPt4 (JU.P4.new4 (ax.x, ax.y, ax.z, (ax.angle * 180 / 3.141592653589793)));
case -9:
return this.addXM3 (q.getMatrix ());
default:
return this.addXStr ("NaN");
}
case 12:
var m4 = x1.value;
switch (n) {
case 1:
var m3 =  new JU.M3 ();
m4.getRotationScale (m3);
return this.addXM3 (m3);
case 2:
var v3 =  new JU.V3 ();
m4.get (v3);
return this.addXPt (JU.P3.newP (v3));
default:
return false;
}
case 10:
return this.addXBs (J.script.SV.bsSelectRange (x1, n));
}
case 269484208:
if (x1.tok == 2 && x2.tok == 2 && x2.intValue != 0) return this.addXInt (Clazz_doubleToInt (x1.intValue / x2.intValue));
var f2 = x2.asFloat ();
switch (x1.tok) {
default:
var f1 = x1.asFloat ();
return this.addXFloat (f1 / f2);
case 8:
pt = JU.P3.newP (x1.value);
if (f2 == 0) return this.addXPt (JU.P3.new3 (NaN, NaN, NaN));
return this.addXPt (JU.P3.new3 (pt.x / f2, pt.y / f2, pt.z / f2));
case 9:
if (x2.tok == 9) return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).div (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
if (f2 == 0) return this.addXPt4 (JU.P4.new4 (NaN, NaN, NaN, NaN));
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (1 / f2).toPoint4f ());
}
case 269484211:
f = x2.asFloat ();
switch (x1.tok) {
default:
return this.addXInt (f == 0 ? 0 : Clazz_doubleToInt (Math.floor (x1.asFloat () / x2.asFloat ())));
case 9:
if (f == 0) return this.addXPt4 (JU.P4.new4 (NaN, NaN, NaN, NaN));
if (x2.tok == 9) return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).divLeft (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (1 / f).toPoint4f ());
}
case 269484227:
f = Math.pow (x1.asFloat (), x2.asFloat ());
return (x1.tok == 2 && x2.tok == 2 ? this.addXInt (Clazz_floatToInt (f)) : this.addXFloat (f));
}
return true;
}, "J.script.T,J.script.SV,J.script.SV");
$_M(c$, "ptValue", 
function (x, allowFloat) {
var pt;
if (this.chk) return  new JU.P3 ();
switch (x.tok) {
case 8:
return x.value;
case 10:
return this.eval.getBitsetProperty (J.script.SV.bsSelectVar (x), 1146095626, null, null, x.value, null, false, 2147483647, false);
case 4:
pt = J.util.Escape.uP (J.script.SV.sValue (x));
if (Clazz_instanceOf (pt, JU.P3)) return pt;
break;
case 7:
pt = J.util.Escape.uP ("{" + J.script.SV.sValue (x) + "}");
if (Clazz_instanceOf (pt, JU.P3)) return pt;
break;
}
if (!allowFloat) return null;
var f = J.script.SV.fValue (x);
return JU.P3.new3 (f, f, f);
}, "J.script.SV,~B");
$_M(c$, "planeValue", 
function (x) {
if (this.chk) return  new JU.P4 ();
switch (x.tok) {
case 9:
return x.value;
case 7:
case 4:
var pt = J.util.Escape.uP (J.script.SV.sValue (x));
return (Clazz_instanceOf (pt, JU.P4) ? pt : null);
case 10:
break;
}
return null;
}, "J.script.T");
c$.typeOf = $_M(c$, "typeOf", 
function (x) {
var tok = (x == null ? 0 : x.tok);
switch (tok) {
case 1048589:
case 1048588:
return "boolean";
case 10:
return (Clazz_instanceOf (x.value, J.modelset.BondSet) ? "bondset" : "bitset");
case 2:
case 3:
case 8:
case 9:
case 4:
case 7:
case 6:
case 11:
case 12:
return J.script.T.astrType[tok];
}
return "?";
}, "J.script.SV");
$_M(c$, "getAllProperties", 
function (x2, abbr) {
if (x2.tok != 10) return false;
if (this.chk) return this.addXStr ("");
var bs = J.script.SV.bsSelectVar (x2);
var tokens;
var n = bs.cardinality ();
if (n == 0 || (tokens = J.script.T.getAtomPropertiesLike (abbr.substring (0, abbr.length - 1))) == null) return this.addXStr ("");
var ht =  new java.util.Hashtable ();
var index = (n == 1 ? bs.nextSetBit (0) : 2147483647);
for (var i = tokens.size (); --i >= 0; ) {
var t = tokens.get (i);
var tok = t.tok;
switch (tok) {
case 1095766024:
case 1095761925:
continue;
default:
if (index == 2147483647) tok |= 480;
ht.put (t.value, J.script.SV.getVariable (this.eval.getBitsetProperty (bs, tok, null, null, null, null, false, index, true)));
}
}
return this.addXMap (ht);
}, "J.script.SV,~S");
c$.getMatrix4f = $_M(c$, "getMatrix4f", 
function (matRotate, vTranslate) {
return JU.M4.newMV (matRotate, vTranslate == null ?  new JU.V3 () : JU.V3.newV (vTranslate));
}, "JU.M3,JU.T3");
$_M(c$, "getBoundBox", 
function (x2) {
if (x2.tok != 10) return false;
if (this.chk) return this.addXStr ("");
var b = this.viewer.getBoxInfo (J.script.SV.bsSelectVar (x2), 1);
var pts = b.getBoundBoxPoints (true);
var list =  new JU.List ();
for (var i = 0; i < 4; i++) list.addLast (pts[i]);

return this.addXList (list);
}, "J.script.SV");
$_M(c$, "getPointOrBitsetOperation", 
function (op, x2) {
switch (x2.tok) {
case 7:
switch (op.intValue) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
return this.addXObj (this.eval.getExtension ().getMinMax (x2.getList (), op.intValue));
case 1276117011:
case 1141899269:
return this.addXVar (x2.sortOrReverse (op.intValue == 1141899269 ? -2147483648 : 1));
}
var list2 =  new Array (x2.getList ().size ());
for (var i = 0; i < list2.length; i++) {
var v = J.script.SV.unescapePointOrBitsetAsVariable (x2.getList ().get (i));
if (!(Clazz_instanceOf (v, J.script.SV)) || !this.getPointOrBitsetOperation (op, v)) return false;
list2[i] = this.xStack[this.xPt--];
}
return this.addXAV (list2);
case 8:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1146095626:
var pt = JU.P3.newP (x2.value);
this.viewer.toCartesian (pt, true);
return this.addXPt (pt);
case 1112541188:
case 1112541189:
case 1112541190:
case 1146095627:
var ptf = JU.P3.newP (x2.value);
this.viewer.toFractional (ptf, true);
return (op.intValue == 1146095627 ? this.addXPt (ptf) : this.addXFloat (op.intValue == 1112541188 ? ptf.x : op.intValue == 1112541189 ? ptf.y : ptf.z));
case 1112541191:
case 1112541192:
case 1112541193:
case 1146095629:
var ptfu = JU.P3.newP (x2.value);
this.viewer.toFractional (ptfu, false);
return (op.intValue == 1146095627 ? this.addXPt (ptfu) : this.addXFloat (op.intValue == 1112541191 ? ptfu.x : op.intValue == 1112541192 ? ptfu.y : ptfu.z));
case 1112539153:
case 1112539154:
case 1112539155:
case 1146093582:
var ptu = JU.P3.newP (x2.value);
this.viewer.toUnitCell (ptu, null);
this.viewer.toFractional (ptu, false);
return (op.intValue == 1146093582 ? this.addXPt (ptu) : this.addXFloat (op.intValue == 1112539153 ? ptu.x : op.intValue == 1112539154 ? ptu.y : ptu.z));
}
break;
case 9:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1141899280:
return this.addXFloat ((x2.value).w);
}
break;
case 10:
if (op.intValue == 1678770178 && Clazz_instanceOf (x2.value, J.modelset.BondSet)) return this.addXVar (x2);
var bs = J.script.SV.bsSelectVar (x2);
if (bs.cardinality () == 1 && (op.intValue & 480) == 0) op.intValue |= 32;
var val = this.eval.getBitsetProperty (bs, op.intValue, null, null, x2.value, op.value, false, x2.index, true);
if (op.intValue != 1678770178) return this.addXObj (val);
return this.addXVar (J.script.SV.newV (10,  new J.modelset.BondSet (val, this.viewer.getAtomIndices (bs))));
}
return false;
}, "J.script.T,J.script.SV");
$_M(c$, "evalOp", 
function (token) {
if (!this.addOp (token) || !this.operate ()) return null;
return this.xStack[this.xPt--];
}, "J.script.T");
Clazz_defineStatics (c$,
"qMods", " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9");
});
})(Clazz
,Clazz.newArray
,Clazz.newBooleanArray
,Clazz.newByteArray
,Clazz.newCharArray
,Clazz.newDoubleArray
,Clazz.newFloatArray
,Clazz.newIntArray
,Clazz.newLongArray
,Clazz.newShortArray
,Clazz.prepareCallback
,Clazz.decorateAsClass
,Clazz.isClassDefined
,Clazz.defineEnumConstant
,Clazz.cloneFinals
,Clazz.inheritArgs
,Clazz.pu$h
,Clazz.declareInterface
,Clazz.declarePackage
,Clazz.makeConstructor
,Clazz.overrideConstructor
,Clazz.load
,Clazz.defineMethod
,Clazz.innerTypeInstance
,Clazz.instanceOf
,Clazz.p0p
,Clazz.makeFunction
,Clazz.superConstructor
,Clazz.defineStatics
,Clazz.registerSerializableFields
,Clazz.declareType
,Clazz.superCall
,Clazz.overrideMethod
,Clazz.declareAnonymous
,Clazz.checkPrivateMethod
,Clazz.prepareFields
,Clazz.instantialize
,Clazz.doubleToInt
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.supportsNativeObject
,Clazz.extendedObjectMethods
,Clazz.callingStackTraces
,Clazz.clone
,Clazz.doubleToShort
,Clazz.innerFunctions
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
);
