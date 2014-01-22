Clazz.declarePackage ("JSV.dialog");
Clazz.load (null, "JSV.dialog.DialogManager", ["java.util.Hashtable", "JSV.common.JSVFileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.htSelectors = null;
this.htDialogs = null;
this.options = null;
Clazz.instantialize (this, arguments);
}, JSV.dialog, "DialogManager");
$_M(c$, "set", 
function (viewer) {
this.viewer = viewer;
this.htSelectors =  new java.util.Hashtable ();
this.htDialogs =  new java.util.Hashtable ();
return this;
}, "JSV.common.JSViewer");
$_M(c$, "registerDialog", 
function (jsvDialog) {
var id = jsvDialog.optionKey;
if (!id.endsWith ("!")) id += " " + ("" + Math.random ()).substring (3);
if (this.htDialogs.containsKey (id)) this.htDialogs.get (id).dispose ();
this.htDialogs.put (id, jsvDialog);
return id;
}, "JSV.dialog.JSVDialog");
$_M(c$, "registerSelector", 
function (selectorName, columnSelector) {
this.htSelectors.put (columnSelector, selectorName);
}, "~S,~O");
$_M(c$, "getSelectorName", 
function (selector) {
return this.htSelectors.get (selector);
}, "~O");
$_M(c$, "showSourceErrors", 
function (frame, currentSource) {
if (currentSource == null) {
this.showMessageDialog (frame, "Please Select a Spectrum.", "Select Spectrum", 2);
return;
}var errorLog = currentSource.getErrorLog ();
if (errorLog != null && errorLog.length > 0) this.showScrollingText (frame, currentSource.getFilePath (), errorLog);
 else this.showMessageDialog (frame, "No errors found.", "Error Log", 1);
}, "~O,JSV.source.JDXSource");
$_M(c$, "showSource", 
function (frame, currentSource) {
if (currentSource == null) {
this.showMessageDialog (frame, "Please Select a Spectrum", "Select Spectrum", 2);
return;
}try {
var f = currentSource.getFilePath ();
this.showScrollingText (null, f, JSV.common.JSVFileManager.getFileAsString (f));
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.showMessageDialog (frame, "File Not Found", "SHOWSOURCE", 0);
} else {
throw ex;
}
}
}, "~O,JSV.source.JDXSource");
$_M(c$, "processClick", 
function (eventId) {
var pt = eventId.lastIndexOf ("/");
var id = eventId.substring (pt + 1);
var dialog = eventId.substring (0, pt);
this.dialogCallback (dialog, id, null);
}, "~S");
$_M(c$, "processTableEvent", 
function (eventId, index1, index2, adjusting) {
var pt = eventId.lastIndexOf ("/");
var dialog = eventId.substring (0, pt);
var selector = eventId.substring (pt + 1);
var msg = "&selector=" + selector + "&index=" + index1 + (index2 < 0 ? "&adjusting=" + adjusting : "&index2=" + index2);
this.dialogCallback (dialog, "tableSelect", msg);
}, "~S,~N,~N,~B");
$_M(c$, "processWindowClosing", 
function (dialogId) {
this.dialogCallback (dialogId, "windowClosing", null);
this.htDialogs.remove (dialogId);
}, "~S");
$_M(c$, "dialogCallback", 
($fz = function (dialogId, id, msg) {
var jsvDialog = this.htDialogs.get (dialogId);
if (jsvDialog != null) jsvDialog.callback (id, msg);
}, $fz.isPrivate = true, $fz), "~S,~S,~S");
$_M(c$, "getDialogOptions", 
function () {
if (this.options == null) this.options =  new java.util.Hashtable ();
return this.options;
});
Clazz.defineStatics (c$,
"PLAIN_MESSAGE", -1,
"ERROR_MESSAGE", 0,
"INFORMATION_MESSAGE", 1,
"WARNING_MESSAGE", 2,
"QUESTION_MESSAGE", 3);
});
