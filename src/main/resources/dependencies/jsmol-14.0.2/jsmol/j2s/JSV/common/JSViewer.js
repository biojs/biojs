Clazz.declarePackage ("JSV.common");
Clazz.load (["javajs.api.BytePoster", "$.JSInterface", "$.PlatformViewer", "javajs.awt.Dimension", "JSV.common.JDXSpectrum"], "JSV.common.JSViewer", ["java.lang.Boolean", "$.Double", "$.Float", "$.Thread", "java.net.URL", "java.util.Hashtable", "JU.List", "$.OC", "$.PT", "$.SB", "JSV.common.Annotation", "$.ExportType", "$.JSVFileManager", "$.PanelData", "$.PanelNode", "$.Parameters", "$.PeakInfo", "$.PrintLayout", "$.RepaintManager", "$.ScriptToken", "$.ScriptTokenizer", "JSV.source.JDXSource", "JSV.tree.SimpleTree", "JSV.util.JSVEscape", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.si = null;
this.g2d = null;
this.spectraTree = null;
this.currentSource = null;
this.panelNodes = null;
this.parameters = null;
this.repaintManager = null;
this.selectedPanel = null;
this.viewPanel = null;
this.properties = null;
this.scriptQueue = null;
this.fileHelper = null;
this.jsvpPopupMenu = null;
this.dialogManager = null;
this.viewDialog = null;
this.overlayLegendDialog = null;
this.irMode = null;
this.isSingleThreaded = false;
this.isApplet = false;
this.isJS = false;
this.isSigned = false;
this.recentScript = "";
this.appletID = null;
this.fullName = null;
this.syncID = null;
this.applet = null;
this.display = null;
this.maximumSize = 2147483647;
this.dimScreen = null;
this.apiPlatform = null;
this.popupAllowMenu = true;
this.popupZoomEnabled = true;
this.overlayLegendVisible = false;
this.recentStackPercent = 5;
this.lastPrintLayout = null;
this.offWindowFrame = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "JSViewer", null, [javajs.api.PlatformViewer, javajs.api.JSInterface, javajs.api.BytePoster]);
Clazz.prepareFields (c$, function () {
this.irMode = JSV.common.JDXSpectrum.IRMode.NO_CONVERT;
this.dimScreen =  new javajs.awt.Dimension (0, 0);
});
$_M(c$, "setProperty", 
function (key, value) {
if (this.properties != null) this.properties.setProperty (key, value);
}, "~S,~S");
$_M(c$, "setNode", 
function (node, fromTree) {
this.si.siSetNode (node, fromTree);
}, "JSV.common.PanelNode,~B");
Clazz.makeConstructor (c$, 
function (si, isApplet, isJS) {
this.si = si;
this.isApplet = isApplet;
this.isJS = isApplet && isJS;
this.isSigned = si.isSigned ();
this.apiPlatform = this.getPlatformInterface ("Platform");
this.apiPlatform.setViewer (this, this.display);
this.g2d = this.getPlatformInterface ("G2D");
this.spectraTree =  new JSV.tree.SimpleTree (this);
this.parameters = this.getPlatformInterface ("Parameters");
this.parameters.setName ("applet");
this.fileHelper = (this.getPlatformInterface ("FileHelper")).set (this);
this.isSingleThreaded = this.apiPlatform.isSingleThreaded ();
this.panelNodes =  new JU.List ();
this.repaintManager =  new JSV.common.RepaintManager (this);
if (!isApplet) this.setPopupMenu (true, true);
}, "JSV.api.ScriptInterface,~B,~B");
$_M(c$, "setPopupMenu", 
function (allowMenu, zoomEnabled) {
this.popupAllowMenu = allowMenu;
this.popupZoomEnabled = zoomEnabled;
}, "~B,~B");
$_M(c$, "showMenu", 
function (x, y) {
if (this.jsvpPopupMenu == null) {
try {
this.jsvpPopupMenu = this.getPlatformInterface ("Popup");
this.jsvpPopupMenu.jpiInitialize (this, this.isApplet ? "appletMenu" : "appMenu");
this.jsvpPopupMenu.setEnabled (this.popupAllowMenu, this.popupZoomEnabled);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e + " initializing popup menu");
return;
} else {
throw e;
}
}
}this.jsvpPopupMenu.jpiShow (x, y);
}, "~N,~N");
$_M(c$, "runScriptNow", 
function (script) {
this.si.siIncrementViewCount (1);
if (script == null) script = "";
script = script.trim ();
if (script.startsWith ("!")) script = script.substring (1).trim ();
System.out.println ("RUNSCRIPT " + script);
var isOK = true;
var nErrorsLeft = 10;
var commandTokens =  new JSV.common.ScriptTokenizer (script, true);
var msg = null;
while (commandTokens.hasMoreTokens () && nErrorsLeft > 0 && isOK) {
var token = commandTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = JSV.common.ScriptToken.getKey (eachParam);
if (key == null) continue;
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
System.out.println ("KEY-> " + key + " VALUE-> " + value + " : " + st);
try {
switch (st) {
case JSV.common.ScriptToken.UNKNOWN:
J.util.Logger.info ("Unrecognized parameter: " + key);
--nErrorsLeft;
break;
default:
if (this.selectedPanel == null) break;
this.parameters.set (this.pd (), st, value);
this.si.siUpdateBoolean (st, JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.si.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.si.siExecSetAutoIntegrate (JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.CLOSE:
this.si.siExecClose (value);
break;
case JSV.common.ScriptToken.DEBUG:
J.util.Logger.setLogLevel (value.toLowerCase ().equals ("high") ? 6 : JSV.common.Parameters.isTrue (value) ? 5 : 4);
break;
case JSV.common.ScriptToken.GETPROPERTY:
var info = (this.selectedPanel == null ? null : this.getPropertyAsJavaObject (value));
if (info != null) this.selectedPanel.showMessage (JU.PT.toJSON (null, info), value);
break;
case JSV.common.ScriptToken.HIDDEN:
this.si.siExecHidden (JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.INTEGRATIONRATIOS:
this.si.siSetIntegrationRatios (value);
if (this.selectedPanel != null) this.execIntegrate (null);
break;
case JSV.common.ScriptToken.INTERFACE:
this.si.siExecSetInterface (value);
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
case JSV.common.ScriptToken.INTEGRALRANGE:
this.execSetIntegralParameter (st, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.JMOL:
this.si.syncToJmol (value);
break;
case JSV.common.ScriptToken.JSV:
this.syncScript (JU.PT.trimQuotes (value));
break;
case JSV.common.ScriptToken.LOAD:
msg = this.si.siExecLoad (value);
break;
case JSV.common.ScriptToken.LOADIMAGINARY:
this.si.siSetLoadImaginary (JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PEAK:
this.execPeak (value);
break;
case JSV.common.ScriptToken.PEAKLIST:
this.execPeakList (value);
break;
case JSV.common.ScriptToken.SCALEBY:
this.scaleSelectedBy (this.panelNodes, value);
break;
case JSV.common.ScriptToken.SCRIPT:
if (value.equals ("") || value.toLowerCase ().startsWith ("inline")) {
this.execScriptInline (value);
} else {
var s = this.si.siSetFileAsString (value);
if (s != null && this.si.siIncrementScriptLevelCount (0) < 100) this.runScriptNow (s);
}break;
case JSV.common.ScriptToken.SELECT:
this.execSelect (value);
break;
case JSV.common.ScriptToken.SPECTRUM:
case JSV.common.ScriptToken.SPECTRUMNUMBER:
if (!this.setSpectrum (value)) isOK = false;
break;
case JSV.common.ScriptToken.STACKOFFSETY:
this.execOverlayOffsetY (JU.PT.parseInt ("" + JU.PT.parseFloat (value)));
break;
case JSV.common.ScriptToken.TEST:
this.si.siExecTest (value);
break;
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
this.execView (value, true);
break;
case JSV.common.ScriptToken.FINDX:
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.IRMODE:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LINK:
case JSV.common.ScriptToken.OVERLAYSTACKED:
case JSV.common.ScriptToken.PRINT:
case JSV.common.ScriptToken.SETPEAK:
case JSV.common.ScriptToken.SETX:
case JSV.common.ScriptToken.SHIFTX:
case JSV.common.ScriptToken.SHOWERRORS:
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
case JSV.common.ScriptToken.SHOWMENU:
case JSV.common.ScriptToken.SHOWKEY:
case JSV.common.ScriptToken.SHOWPEAKLIST:
case JSV.common.ScriptToken.SHOWINTEGRATION:
case JSV.common.ScriptToken.SHOWPROPERTIES:
case JSV.common.ScriptToken.SHOWSOURCE:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
case JSV.common.ScriptToken.ZOOM:
if (this.selectedPanel == null) {
isOK = false;
break;
}switch (st) {
default:
break;
case JSV.common.ScriptToken.FINDX:
this.pd ().findX (null, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
this.selectedPanel.showMessage (this.getSolutionColorHtml (), "Predicted Colour");
break;
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
this.execIntegrate (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.execIRMode (value);
break;
case JSV.common.ScriptToken.LABEL:
this.pd ().addAnnotation (JSV.common.ScriptToken.getTokens (value));
break;
case JSV.common.ScriptToken.LINK:
this.pd ().linkSpectra (JSV.common.PanelData.LinkMode.getMode (value));
break;
case JSV.common.ScriptToken.OVERLAYSTACKED:
this.pd ().splitStack (!JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PRINT:
msg = this.execWrite (null);
break;
case JSV.common.ScriptToken.SETPEAK:
this.pd ().shiftSpectrum (NaN, value.equalsIgnoreCase ("NONE") ? 1.7976931348623157E308 : value.equalsIgnoreCase ("?") ? 4.9E-324 : Double.parseDouble (value));
break;
case JSV.common.ScriptToken.SETX:
this.pd ().shiftSpectrum (4.9E-324, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.SHIFTX:
this.pd ().shiftSpectrum (value.equalsIgnoreCase ("NONE") ? 1.7976931348623157E308 : Double.parseDouble (value), NaN);
break;
case JSV.common.ScriptToken.SHOWERRORS:
this.show ("errors");
break;
case JSV.common.ScriptToken.SHOWINTEGRATION:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Integration, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWKEY:
this.setOverlayLegendVisibility (JSV.common.Parameters.getTFToggle (value), true);
break;
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Measurements, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWMENU:
this.showMenu (-2147483648, 0);
break;
case JSV.common.ScriptToken.SHOWPEAKLIST:
this.pd ().showAnnotation (JSV.common.Annotation.AType.PeakList, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWPROPERTIES:
this.show ("properties");
break;
case JSV.common.ScriptToken.SHOWSOURCE:
this.show ("source");
break;
case JSV.common.ScriptToken.YSCALE:
this.setYScale (value);
break;
case JSV.common.ScriptToken.WINDOW:
this.si.siNewWindow (JSV.common.Parameters.isTrue (value), false);
break;
case JSV.common.ScriptToken.WRITE:
msg = this.execWrite (value);
break;
case JSV.common.ScriptToken.ZOOM:
isOK = this.execZoom (value);
break;
}
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
{
alert(e + "\n" + Clazz.getStackTrace())
}isOK = false;
--nErrorsLeft;
} else {
throw e;
}
}
}
this.si.siIncrementViewCount (-1);
this.si.siExecScriptComplete (msg, true);
return isOK;
}, "~S");
$_M(c$, "pd", 
($fz = function () {
return this.selectedPanel.getPanelData ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "execPeak", 
($fz = function (value) {
try {
var tokens = JSV.common.ScriptToken.getTokens (value);
value = " type=\"" + tokens.get (0).toUpperCase () + "\" _match=\"" + JU.PT.trimQuotes (tokens.get (1).toUpperCase ()) + "\"";
if (tokens.size () > 2 && tokens.get (2).equalsIgnoreCase ("all")) value += " title=\"ALL\"";
this.processPeakPickEvent ( new JSV.common.PeakInfo (value), false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "execPeakList", 
($fz = function (value) {
var jsvp = this.selectedPanel;
var p = this.parameters;
var b = JSV.common.Parameters.getTFToggle (value);
if (value.indexOf ("=") < 0) {
if (jsvp != null) jsvp.getPanelData ().getPeakListing (null, b);
} else {
var tokens = JSV.common.ScriptToken.getTokens (value);
for (var i = tokens.size (); --i >= 0; ) {
var token = tokens.get (i);
var pt = token.indexOf ("=");
if (pt <= 0) continue;
var key = token.substring (0, pt);
value = token.substring (pt + 1);
try {
if (key.startsWith ("thr")) {
p.peakListThreshold = Double.$valueOf (value).doubleValue ();
} else if (key.startsWith ("int")) {
p.peakListInterpolation = (value.equalsIgnoreCase ("none") ? "NONE" : "parabolic");
}if (jsvp != null) jsvp.getPanelData ().getPeakListing (p, Boolean.TRUE);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "execZoom", 
($fz = function (value) {
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
var tokens;
tokens = JSV.common.ScriptToken.getTokens (value);
switch (tokens.size ()) {
default:
return false;
case 1:
this.zoomTo (tokens.get (0));
return true;
case 2:
x1 = Double.parseDouble (tokens.get (0));
x2 = Double.parseDouble (tokens.get (1));
break;
case 4:
x1 = Double.parseDouble (tokens.get (0));
y1 = Double.parseDouble (tokens.get (1));
x2 = Double.parseDouble (tokens.get (2));
y2 = Double.parseDouble (tokens.get (3));
}
this.pd ().setZoom (x1, y1, x2, y2);
return true;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "zoomTo", 
($fz = function (value) {
var pd = this.pd ();
if (value.equalsIgnoreCase ("next")) {
pd.nextView ();
} else if (value.toLowerCase ().startsWith ("prev")) {
pd.previousView ();
} else if (value.equalsIgnoreCase ("out")) {
pd.resetView ();
} else if (value.equalsIgnoreCase ("clear")) {
pd.clearAllView ();
}}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "scaleSelectedBy", 
($fz = function (nodes, value) {
try {
var f = Double.parseDouble (value);
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).jsvp.getPanelData ().scaleSelectedBy (f);

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "JU.List,~S");
$_M(c$, "execSelect", 
($fz = function (value) {
var nodes = this.panelNodes;
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).jsvp.getPanelData ().selectFromEntireSet (-2147483648);

var speclist =  new JU.List ();
this.fillSpecList (value, speclist, false);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "execView", 
function (value, fromScript) {
if (value.equals ("")) {
this.checkOverlay ();
return;
}var speclist =  new JU.List ();
var strlist = this.fillSpecList (value, speclist, true);
if (speclist.size () > 0) this.si.siOpenDataOrFile (null, strlist, speclist, strlist, -1, -1, false);
if (!fromScript) {
this.si.siValidateAndRepaint ();
}}, "~S,~B");
$_M(c$, "execIRMode", 
($fz = function (value) {
var mode = JSV.common.JDXSpectrum.IRMode.getMode (value);
var pd = this.pd ();
var spec = pd.getSpectrum ();
var spec2 = JSV.common.JDXSpectrum.taConvert (spec, mode);
if (spec2 === spec) return;
pd.setSpectrum (spec2);
this.setIRmode (value);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "execIntegrate", 
($fz = function (value) {
var jsvp = this.selectedPanel;
if (jsvp == null) return;
jsvp.getPanelData ().checkIntegral (this.parameters, value);
var integrationRatios = this.si.siGetIntegrationRatios ();
if (integrationRatios != null) jsvp.getPanelData ().setIntegrationRatios (integrationRatios);
this.si.siSetIntegrationRatios (null);
jsvp.doRepaint (true);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "execSetIntegralParameter", 
($fz = function (st, value) {
var p = this.parameters;
switch (st) {
case JSV.common.ScriptToken.INTEGRALRANGE:
p.integralRange = value;
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
p.integralOffset = value;
break;
}
var jsvp = this.selectedPanel;
if (jsvp == null) return;
jsvp.getPanelData ().checkIntegral (this.parameters, "update");
}, $fz.isPrivate = true, $fz), "JSV.common.ScriptToken,~N");
$_M(c$, "setYScale", 
($fz = function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var pt = 0;
var isAll = false;
if (tokens.size () > 1 && tokens.get (0).equalsIgnoreCase ("ALL")) {
isAll = true;
pt++;
}var y1 = Double.parseDouble (tokens.get (pt++));
var y2 = Double.parseDouble (tokens.get (pt));
if (isAll) {
var spec = this.pd ().getSpectrum ();
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if (node.source !== this.currentSource) continue;
if (JSV.common.JDXSpectrum.areXScalesCompatible (spec, node.getSpectrum (), false, false)) node.jsvp.getPanelData ().setZoom (0, y1, 0, y2);
}
} else {
this.pd ().setZoom (0, y1, 0, y2);
}}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "setOverlayLegendVisibility", 
($fz = function (tftoggle, doSet) {
if (doSet) this.overlayLegendVisible = (tftoggle == null ? !this.overlayLegendVisible : tftoggle === Boolean.TRUE);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
for (var i = this.panelNodes.size (); --i >= 0; ) this.showOverlayLegend (this.panelNodes.get (i), this.panelNodes.get (i) === node && this.overlayLegendVisible);

}, $fz.isPrivate = true, $fz), "Boolean,~B");
$_M(c$, "showOverlayLegend", 
($fz = function (node, visible) {
var legend = node.legend;
if (legend == null && visible) {
legend = node.setLegend (node.jsvp.getPanelData ().getNumberOfSpectraInCurrentSet () > 1 && node.jsvp.getPanelData ().getNumberOfGraphSets () == 1 ? this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null) : null);
}if (legend != null) legend.setVisible (visible);
}, $fz.isPrivate = true, $fz), "JSV.common.PanelNode,~B");
$_M(c$, "addHighLight", 
function (x1, x2, r, g, b, a) {
var jsvp = this.selectedPanel;
if (jsvp != null) {
jsvp.getPanelData ().addHighlight (null, x1, x2, null, r, g, b, a);
jsvp.doRepaint (false);
}}, "~N,~N,~N,~N,~N,~N");
$_M(c$, "syncScript", 
function (peakScript) {
if (peakScript.equals ("TEST")) peakScript = JSV.common.JSViewer.testScript;
J.util.Logger.info ("JSViewer.syncScript Jmol>JSV " + peakScript);
if (peakScript.indexOf ("<PeakData") < 0) {
this.runScriptNow (peakScript);
if (peakScript.indexOf ("#SYNC_PEAKS") >= 0) {
var source = this.currentSource;
if (source == null) return;
try {
var file = "file=" + JSV.util.JSVEscape.eS (source.getFilePath ());
var peaks = source.getSpectra ().get (0).getPeakList ();
var sb =  new JU.SB ();
sb.append ("[");
var n = peaks.size ();
for (var i = 0; i < n; i++) {
var s = peaks.get (i).toString ();
s = s + " " + file;
sb.append (JSV.util.JSVEscape.eS (s));
if (i > 0) sb.append (",");
}
sb.append ("]");
this.si.syncToJmol ("Peaks: " + sb);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return;
}peakScript = JU.PT.simpleReplace (peakScript, "\\\"", "");
var file = JU.PT.getQuotedAttribute (peakScript, "file");
System.out.println ("file2=" + file);
var index = JU.PT.getQuotedAttribute (peakScript, "index");
if (file == null || index == null) return;
var model = JU.PT.getQuotedAttribute (peakScript, "model");
var jmolSource = JU.PT.getQuotedAttribute (peakScript, "src");
var modelSent = (jmolSource != null && jmolSource.startsWith ("Jmol") ? null : this.si.siGetReturnFromJmolModel ());
if (model != null && modelSent != null && !model.equals (modelSent)) {
J.util.Logger.info ("JSV ignoring model " + model + "; should be " + modelSent);
return;
}this.si.siSetReturnFromJmolModel (null);
if (this.panelNodes.size () == 0 || !this.checkFileAlreadyLoaded (file)) {
J.util.Logger.info ("file " + file + " not found -- JSViewer closing all and reopening");
this.si.siSyncLoad (file);
}var pi = this.selectPanelByPeak (peakScript);
var jsvp = this.selectedPanel;
var type = JU.PT.getQuotedAttribute (peakScript, "type");
jsvp.getPanelData ().selectSpectrum (file, type, model, true);
this.si.siSendPanelChange (jsvp);
jsvp.getPanelData ().addPeakHighlight (pi);
jsvp.doRepaint (true);
if (jmolSource == null || (pi != null && pi.getAtoms () != null)) this.si.syncToJmol (this.jmolSelect (pi));
}, "~S");
$_M(c$, "checkFileAlreadyLoaded", 
($fz = function (fileName) {
var jsvp = this.selectedPanel;
if (jsvp != null && jsvp.getPanelData ().hasFileLoaded (fileName)) return true;
for (var i = this.panelNodes.size (); --i >= 0; ) if (this.panelNodes.get (i).jsvp.getPanelData ().hasFileLoaded (fileName)) {
this.si.siSetSelectedPanel (this.panelNodes.get (i).jsvp);
return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "selectPanelByPeak", 
($fz = function (peakScript) {
if (this.panelNodes == null) return null;
var file = JU.PT.getQuotedAttribute (peakScript, "file");
var index = JU.PT.getQuotedAttribute (peakScript, "index");
var pi = null;
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).jsvp.getPanelData ().addPeakHighlight (null);

var jsvp = this.selectedPanel;
pi = jsvp.getPanelData ().selectPeakByFileIndex (file, index);
System.out.println (Thread.currentThread () + "JSViewer selectPanelByPeak pi = " + pi);
if (pi != null) {
this.setNode (JSV.common.PanelNode.findNode (jsvp, this.panelNodes), false);
} else {
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if ((pi = node.jsvp.getPanelData ().selectPeakByFileIndex (file, index)) != null) {
this.setNode (node, false);
break;
}}
}return pi;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "processPeakPickEvent", 
function (eventObj, isApp) {
var pi;
if (Clazz.instanceOf (eventObj, JSV.common.PeakInfo)) {
pi = eventObj;
var jsvp = this.selectedPanel;
var pi2 = jsvp.getPanelData ().findMatchingPeakInfo (pi);
if (pi2 == null) {
if (!"ALL".equals (pi.getTitle ())) return;
var node = null;
for (var i = 0; i < this.panelNodes.size (); i++) if ((pi2 = this.panelNodes.get (i).jsvp.getPanelData ().findMatchingPeakInfo (pi)) != null) {
node = this.panelNodes.get (i);
break;
}
if (node == null) return;
this.setNode (node, false);
}pi = pi2;
} else {
var e = (eventObj);
this.si.siSetSelectedPanel (e.getSource ());
pi = e.getPeakInfo ();
}this.pd ().addPeakHighlight (pi);
this.syncToJmol (pi);
if (pi.isClearAll ()) this.selectedPanel.doRepaint (false);
 else this.pd ().selectSpectrum (pi.getFilePath (), pi.getType (), pi.getModel (), true);
this.si.siCheckCallbacks (pi.getTitle ());
}, "~O,~B");
$_M(c$, "syncToJmol", 
($fz = function (pi) {
this.si.siSetReturnFromJmolModel (pi.getModel ());
this.si.syncToJmol (this.jmolSelect (pi));
}, $fz.isPrivate = true, $fz), "JSV.common.PeakInfo");
$_M(c$, "sendPanelChange", 
function (jsvp) {
var pd = jsvp.getPanelData ();
var spec = pd.getSpectrum ();
var pi = spec.getSelectedPeak ();
if (pi == null) pi = spec.getModelPeakInfoForAutoSelectOnLoad ();
if (pi == null) pi = spec.getBasePeakInfo ();
pd.addPeakHighlight (pi);
J.util.Logger.info (Thread.currentThread () + "JSViewer sendFrameChange " + jsvp);
this.syncToJmol (pi);
}, "JSV.api.JSVPanel");
$_M(c$, "jmolSelect", 
($fz = function (pi) {
var script = null;
if ("IR".equals (pi.getType ()) || "RAMAN".equals (pi.getType ())) {
script = "vibration ON; selectionHalos OFF;";
} else if (pi.getAtoms () != null) {
script = "vibration OFF; selectionhalos ON;";
} else {
script = "vibration OFF; selectionhalos OFF;";
}script = "Select: " + pi + " script=\"" + script;
System.out.println ("JSViewer.jmolSelect " + script);
return script;
}, $fz.isPrivate = true, $fz), "JSV.common.PeakInfo");
$_M(c$, "getPropertyAsJavaObject", 
function (key) {
var isAll = false;
if (key != null && key.toUpperCase ().startsWith ("ALL ") || "all".equalsIgnoreCase (key)) {
key = key.substring (3).trim ();
isAll = true;
}if ("".equals (key)) key = null;
var map =  new java.util.Hashtable ();
var map0 = this.pd ().getInfo (true, key);
if (!isAll && map0 != null) return map0;
if (map0 != null) map.put ("current", map0);
var info =  new JU.List ();
for (var i = 0; i < this.panelNodes.size (); i++) {
var jsvp = this.panelNodes.get (i).jsvp;
if (jsvp == null) continue;
info.addLast (this.panelNodes.get (i).getInfo (key));
}
map.put ("items", info);
return map;
}, "~S");
$_M(c$, "getCoordinate", 
function () {
if (this.selectedPanel != null) {
var coord = this.pd ().getClickedCoordinate ();
if (coord != null) return coord.getXVal () + " " + coord.getYVal ();
}return "";
});
$_M(c$, "fillSpecList", 
($fz = function (value, speclist, isView) {
var prefix = "1.";
var list;
var list0 = null;
var isNone = (value.equalsIgnoreCase ("NONE"));
if (isNone || value.equalsIgnoreCase ("all")) value = "*";
if (value.indexOf ("*") < 0) {
var tokens = value.$plit (" ");
var sb =  new JU.SB ();
for (var i = 0; i < tokens.length; i++) {
var pt = tokens[i].indexOf ('.');
if (pt != tokens[i].lastIndexOf ('.')) tokens[i] = tokens[i].substring (0, pt + 1) + tokens[i].substring (pt + 1).$replace ('.', '_');
sb.append (tokens[i]).append (" ");
}
value = sb.toString ().trim ();
}if (value.equals ("*")) {
list = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
} else if (value.startsWith ("\"")) {
list = JSV.common.ScriptToken.getTokens (value);
} else {
value = JU.PT.simpleReplace (value, "_", " _ ");
value = JU.PT.simpleReplace (value, "-", " - ");
list = JSV.common.ScriptToken.getTokens (value);
list0 = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
if (list0.size () == 0) return null;
}var id0 = (this.selectedPanel == null ? prefix : JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes).id);
id0 = id0.substring (0, id0.indexOf (".") + 1);
var sb =  new JU.SB ();
var n = list.size ();
var idLast = null;
for (var i = 0; i < n; i++) {
var id = list.get (i);
var userYFactor = NaN;
var isubspec = -1;
if (i + 1 < n && list.get (i + 1).equals ("*")) {
i += 2;
userYFactor = Double.parseDouble (list.get (i));
} else if (i + 1 < n && list.get (i + 1).equals ("_")) {
i += 2;
isubspec = Integer.parseInt (list.get (i));
}if (id.equals ("-")) {
if (idLast == null) idLast = list0.get (0);
id = (i + 1 == n ? list0.get (list0.size () - 1) : list.get (++i));
if (!id.contains (".")) id = id0 + id;
var pt = 0;
while (pt < list0.size () && !list0.get (pt).equals (idLast)) pt++;

pt++;
while (pt < list0.size () && !idLast.equals (id)) {
speclist.addLast (JSV.common.PanelNode.findNodeById (idLast = list0.get (pt++), this.panelNodes).jsvp.getPanelData ().getSpectrumAt (0));
sb.append (",").append (idLast);
}
continue;
}var node;
if (id.startsWith ("\"")) {
id = JU.PT.trim (id, "\"");
for (var j = 0; j < this.panelNodes.size (); j++) {
node = this.panelNodes.get (j);
if (node.fileName != null && node.fileName.startsWith (id) || node.frameTitle != null && node.frameTitle.startsWith (id)) {
this.addSpecToList (node.jsvp.getPanelData (), userYFactor, -1, speclist, isView);
sb.append (",").append (node.id);
}}
continue;
}if (!id.contains (".")) id = id0 + id;
node = JSV.common.PanelNode.findNodeById (id, this.panelNodes);
if (node == null) continue;
idLast = id;
this.addSpecToList (node.jsvp.getPanelData (), userYFactor, isubspec, speclist, isView);
sb.append (",").append (id);
if (isubspec > 0) sb.append (".").appendI (isubspec);
}
if (isView && speclist.size () == 1) {
var node = JSV.common.PanelNode.findNodeById (idLast, this.panelNodes);
if (node != null) {
this.setNode (node, true);
speclist.clear ();
}}return (isNone ? "NONE" : sb.length () > 0 ? sb.toString ().substring (1) : null);
}, $fz.isPrivate = true, $fz), "~S,JU.List,~B");
$_M(c$, "addSpecToList", 
($fz = function (pd, userYFactor, isubspec, list, isView) {
if (isView) {
var spec = pd.getSpectrumAt (0);
spec.setUserYFactor (Double.isNaN (userYFactor) ? 1 : userYFactor);
pd.addToList (isubspec - 1, list);
} else {
pd.selectFromEntireSet (isubspec - 1);
}}, $fz.isPrivate = true, $fz), "JSV.common.PanelData,~N,~N,JU.List,~B");
$_M(c$, "getSolutionColor", 
function () {
var spectrum = this.pd ().getSpectrum ();
return (spectrum.canShowSolutionColor () ? (JSV.common.JSViewer.getInterface ("JSV.common.Visible")).getColour (spectrum.getXYCoords (), spectrum.getYUnits ()) : "255,255,255");
});
$_M(c$, "getSolutionColorHtml", 
function () {
var color = this.getSolutionColor ();
return "<html><body style='background-color:rgb(" + color + ")'><br />Predicted Solution Colour- RGB(" + color + ")<br /><br /></body></html>";
});
$_M(c$, "openDataOrFile", 
function (data, name, specs, strUrl, firstSpec, lastSpec, isAppend) {
if ("NONE".equals (name)) {
this.close ("View*");
return 0;
}this.si.writeStatus ("");
var filePath = null;
var newPath = null;
var fileName = null;
var isView = false;
if (data != null) {
} else if (specs != null) {
isView = true;
newPath = fileName = filePath = "View" + this.si.siIncrementViewCount (1);
} else if (strUrl != null) {
try {
var u =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, strUrl, null);
filePath = u.toString ();
this.si.siSetRecentURL (filePath);
fileName = JSV.common.JSVFileManager.getName (filePath);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
var file = this.apiPlatform.newFile (strUrl);
fileName = file.getName ();
newPath = filePath = file.getFullPath ();
this.si.siSetRecentURL (null);
} else {
throw e;
}
}
}if (!isView) if (JSV.common.PanelNode.isOpen (this.panelNodes, filePath) || JSV.common.PanelNode.isOpen (this.panelNodes, strUrl)) {
this.si.writeStatus (filePath + " is already open");
return -1;
}if (!isAppend && !isView) this.close ("all");
this.si.setCursor (3);
try {
this.si.siSetCurrentSource (isView ? JSV.source.JDXSource.createView (specs) : this.si.siCreateSource (data, filePath, firstSpec, lastSpec));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
{
alert(e + "\n" + Clazz.getStackTrace())
}this.si.setCursor (0);
return -3;
} else {
throw e;
}
}
this.si.setCursor (0);
System.gc ();
if (newPath == null) {
newPath = this.currentSource.getFilePath ();
if (newPath != null) fileName = newPath.substring (newPath.lastIndexOf ("/") + 1);
} else {
this.currentSource.setFilePath (newPath);
}this.si.siSetLoaded (fileName, newPath);
var spec = this.currentSource.getJDXSpectrum (0);
if (spec == null) {
return -4;
}specs = this.currentSource.getSpectra ();
JSV.common.JDXSpectrum.process (specs, this.irMode);
var autoOverlay = this.si.siGetAutoCombine () || spec.isAutoOverlayFromJmolClick ();
var combine = isView || autoOverlay && this.currentSource.isCompoundSource;
if (combine) {
this.combineSpectra ((isView ? strUrl : null));
} else {
this.splitSpectra ();
}this.selectedPanel.getPanelData ().taintedAll = true;
if (!isView) this.si.siUpdateRecentMenus (filePath);
return 0;
}, "~S,~S,JU.List,~S,~N,~N,~B");
$_M(c$, "close", 
function (value) {
if (value == null || value.equalsIgnoreCase ("all") || value.equals ("*")) {
this.si.siCloseSource (null);
return;
}value = value.$replace ('\\', '/');
if (value.endsWith ("*")) {
value = value.substring (0, value.length - 1);
for (var i = this.panelNodes.size (); --i >= 0; ) if (i < this.panelNodes.size () && this.panelNodes.get (i).fileName.startsWith (value)) this.si.siCloseSource (this.panelNodes.get (i).source);

} else if (value.equals ("selected")) {
var list =  new JU.List ();
var lastSource = null;
for (var i = this.panelNodes.size (); --i >= 0; ) {
var source = this.panelNodes.get (i).source;
if (this.panelNodes.get (i).isSelected && (lastSource == null || lastSource !== source)) list.addLast (source);
lastSource = source;
}
for (var i = list.size (); --i >= 0; ) this.si.siCloseSource (list.get (i));

} else {
var source = (value.length == 0 ? this.currentSource : JSV.common.PanelNode.findSourceByNameOrId (value, this.panelNodes));
if (source == null) return;
this.si.siCloseSource (source);
}if (this.selectedPanel == null && this.panelNodes.size () > 0) this.si.siSetSelectedPanel (JSV.common.PanelNode.getLastFileFirstNode (this.panelNodes));
}, "~S");
$_M(c$, "load", 
function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var filename = tokens.get (0);
var pt = 0;
var isAppend = filename.equalsIgnoreCase ("APPEND");
var isCheck = filename.equalsIgnoreCase ("CHECK");
if (isAppend || isCheck) filename = tokens.get (++pt);
var isSimulation = filename.equalsIgnoreCase ("MOL");
if (isSimulation) filename = "http://SIMULATION/" + "MOL=" + JU.PT.trimQuotes (tokens.get (++pt));
if (!isCheck && !isAppend) {
if (filename.equals ("\"\"") && this.currentSource != null) filename = this.currentSource.getFilePath ();
this.close ("all");
}filename = JU.PT.trimQuotes (filename);
if (filename.startsWith ("$")) {
isSimulation = true;
filename = "http://SIMULATION/" + filename;
}var firstSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : -1);
var lastSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : firstSpec);
this.si.siOpenDataOrFile (null, null, null, filename, firstSpec, lastSpec, isAppend);
}, "~S");
$_M(c$, "combineSpectra", 
function (name) {
var source = this.currentSource;
var specs = source.getSpectra ();
var jsvp = this.si.siGetNewJSVPanel2 (specs);
jsvp.setTitle (source.getTitle ());
if (jsvp.getTitle ().equals ("")) {
jsvp.getPanelData ().setViewTitle (source.getFilePath ());
jsvp.setTitle (name);
}this.si.siSetPropertiesFromPreferences (jsvp, true);
this.si.siCreateTree (source, [jsvp]).getPanelNode ().isView = true;
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
node.setFrameTitle (name);
node.isView = true;
if (this.si.siGetAutoShowLegend () && this.pd ().getNumberOfGraphSets () == 1) node.setLegend (this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null));
this.si.siSetMenuEnables (node, false);
}, "~S");
$_M(c$, "closeSource", 
function (source) {
var rootNode = this.spectraTree.getRootNode ();
var fileName = (source == null ? null : source.getFilePath ());
var toDelete =  new JU.List ();
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var node = enume.nextElement ();
if (fileName == null || node.getPanelNode ().source.getFilePath ().equals (fileName)) {
for (var e = node.children (); e.hasMoreElements (); ) {
var childNode = e.nextElement ();
toDelete.addLast (childNode);
this.panelNodes.removeObj (childNode.getPanelNode ());
}
toDelete.addLast (node);
if (fileName != null) break;
}}
this.spectraTree.deleteNodes (toDelete);
if (source == null) {
if (this.currentSource != null) this.currentSource.dispose ();
this.currentSource = null;
if (this.selectedPanel != null) this.selectedPanel.dispose ();
} else {
}if (this.currentSource === source) {
this.si.siSetSelectedPanel (null);
this.si.siSetCurrentSource (null);
}var max = 0;
for (var i = 0; i < this.panelNodes.size (); i++) {
var f = JU.PT.parseFloat (this.panelNodes.get (i).id);
if (f >= max + 1) max = Clazz.doubleToInt (Math.floor (f));
}
this.si.siSetFileCount (max);
System.gc ();
J.util.Logger.checkMemory ();
}, "JSV.source.JDXSource");
$_M(c$, "setFrameAndTreeNode", 
function (i) {
if (this.panelNodes == null || i < 0 || i >= this.panelNodes.size ()) return;
this.setNode (this.panelNodes.get (i), false);
}, "~N");
$_M(c$, "selectFrameNode", 
function (jsvp) {
var node = JSV.common.PanelNode.findNode (jsvp, this.panelNodes);
if (node == null) return null;
this.spectraTree.setPath (this.spectraTree.newTreePath (node.treeNode.getPath ()));
this.setOverlayLegendVisibility (null, false);
return node;
}, "JSV.api.JSVPanel");
$_M(c$, "setSpectrum", 
($fz = function (value) {
if (value.indexOf ('.') >= 0) {
var node = JSV.common.PanelNode.findNodeById (value, this.panelNodes);
if (node == null) return false;
this.setNode (node, false);
} else {
var n = JU.PT.parseInt (value);
if (n <= 0) {
this.checkOverlay ();
return false;
}this.setFrameAndTreeNode (n - 1);
}return true;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "splitSpectra", 
function () {
var source = this.currentSource;
var specs = source.getSpectra ();
var panels =  new Array (specs.size ());
var jsvp = null;
for (var i = 0; i < specs.size (); i++) {
var spec = specs.get (i);
jsvp = this.si.siGetNewJSVPanel (spec);
this.si.siSetPropertiesFromPreferences (jsvp, true);
panels[i] = jsvp;
}
this.si.siCreateTree (source, panels);
this.si.siGetNewJSVPanel (null);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
this.si.siSetMenuEnables (node, true);
});
$_M(c$, "selectedTreeNode", 
function (node) {
if (node == null) {
return;
}if (node.isLeaf ()) {
this.setNode (node.getPanelNode (), true);
} else {
System.out.println ("not a leaf");
}this.si.siSetCurrentSource (node.getPanelNode ().source);
}, "JSV.api.JSVTreeNode");
$_M(c$, "removeAllHighlights", 
function () {
var jsvp = this.selectedPanel;
if (jsvp != null) {
jsvp.getPanelData ().removeAllHighlights ();
jsvp.doRepaint (false);
}});
$_M(c$, "removeHighlight", 
function (x1, x2) {
var jsvp = this.selectedPanel;
if (jsvp != null) {
jsvp.getPanelData ().removeHighlight (x1, x2);
jsvp.doRepaint (false);
}}, "~N,~N");
$_M(c$, "dispose", 
function () {
this.fileHelper = null;
if (this.viewDialog != null) this.viewDialog.dispose ();
this.viewDialog = null;
if (this.overlayLegendDialog != null) this.overlayLegendDialog.dispose ();
this.overlayLegendDialog = null;
if (this.jsvpPopupMenu != null) {
this.jsvpPopupMenu.jpiDispose ();
this.jsvpPopupMenu = null;
}if (this.panelNodes != null) for (var i = this.panelNodes.size (); --i >= 0; ) {
this.panelNodes.get (i).dispose ();
this.panelNodes.remove (i);
}
});
$_M(c$, "runScript", 
function (script) {
if (this.scriptQueue == null) this.si.siProcessCommand (script);
 else this.scriptQueue.addLast (script);
}, "~S");
$_M(c$, "requestRepaint", 
function () {
if (this.selectedPanel != null) this.repaintManager.refresh ();
});
$_M(c$, "repaintDone", 
function () {
this.repaintManager.repaintDone ();
});
$_M(c$, "checkOverlay", 
function () {
if (this.viewPanel != null) this.viewPanel.markSelectedPanels (this.panelNodes);
this.viewDialog = this.getDialog (JSV.common.Annotation.AType.Views, null);
});
$_M(c$, "execOverlayOffsetY", 
($fz = function (offset) {
if (this.selectedPanel == null) return;
if (offset == -2147483648) {
var soffset = this.selectedPanel.getInput ("Enter a vertical offset in percent for stacked plots", "Overlay", "" + this.recentStackPercent);
var f = JU.PT.parseFloat (soffset);
if (Float.isNaN (f)) return;
offset = Clazz.floatToInt (f);
}this.recentStackPercent = offset;
this.pd ().setYStackOffsetPercent (offset);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "execScriptInline", 
($fz = function (script) {
if (script.length > 0) script = script.substring (6).trim ();
if (script.length == 0) script = this.selectedPanel.getInput ("Enter a JSpecView script", "Script", this.recentScript);
if (script == null) return;
this.recentScript = script;
this.runScriptNow (script);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "setDisplay", 
function (canvas) {
this.apiPlatform.setViewer (this, this.display = canvas);
var wh =  Clazz.newIntArray (2, 0);
this.apiPlatform.getFullScreenDimensions (canvas, wh);
this.setScreenDimension (wh[0], wh[1]);
}, "~O");
$_V(c$, "setScreenDimension", 
function (width, height) {
height = Math.min (height, this.maximumSize);
width = Math.min (width, this.maximumSize);
if (this.dimScreen.width == width && this.dimScreen.height == height) return;
this.resizeImage (width, height);
}, "~N,~N");
$_M(c$, "resizeImage", 
function (width, height) {
if (width > 0) {
this.dimScreen.width = width;
this.dimScreen.height = height;
} else {
width = (this.dimScreen.width == 0 ? this.dimScreen.width = 500 : this.dimScreen.width);
height = (this.dimScreen.height == 0 ? this.dimScreen.height = 500 : this.dimScreen.height);
}this.g2d.setWindowParameters (width, height);
}, "~N,~N");
$_V(c$, "updateJS", 
function (width, height) {
if (this.selectedPanel == null) return;
{
this.selectedPanel.paintComponent(this.apiPlatform.context);
}}, "~N,~N");
$_V(c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return (this.selectedPanel != null && this.selectedPanel.processMouseEvent (id, x, y, modifiers, time));
}, "~N,~N,~N,~N,~N");
$_V(c$, "processTwoPointGesture", 
function (touches) {
if (this.selectedPanel != null) this.selectedPanel.processTwoPointGesture (touches);
}, "~A");
$_V(c$, "getApplet", 
function () {
return this.applet;
});
$_V(c$, "startHoverWatcher", 
function (enable) {
}, "~B");
$_V(c$, "cacheFileByName", 
function (fileName, isAdd) {
return 0;
}, "~S,~B");
$_V(c$, "cachePut", 
function (key, data) {
}, "~S,~O");
$_V(c$, "openFileAsyncSpecial", 
function (fileName, flags) {
}, "~S,~N");
$_M(c$, "getHeight", 
function () {
return this.dimScreen.height;
});
$_M(c$, "getWidth", 
function () {
return this.dimScreen.width;
});
$_M(c$, "getPlatformInterface", 
function (type) {
return JSV.common.JSViewer.getInterface ("JSV." + (this.isJS ? "js2d.Js" : "java.Awt") + type);
}, "~S");
$_M(c$, "getDialogManager", 
function () {
if (this.dialogManager != null) return this.dialogManager;
this.dialogManager = this.getPlatformInterface ("DialogManager");
return this.dialogManager.set (this);
});
$_M(c$, "getDialog", 
function (type, spec) {
var root = "JSV.dialog.";
switch (type) {
case JSV.common.Annotation.AType.Integration:
return (JSV.common.JSViewer.getInterface (root + "IntegrationDialog")).setParams ("Integration for " + spec, this, spec);
case JSV.common.Annotation.AType.Measurements:
return (JSV.common.JSViewer.getInterface (root + "MeasurementsDialog")).setParams ("Measurements for " + spec, this, spec);
case JSV.common.Annotation.AType.PeakList:
return (JSV.common.JSViewer.getInterface (root + "PeakListDialog")).setParams ("Peak List for " + spec, this, spec);
case JSV.common.Annotation.AType.OverlayLegend:
return this.overlayLegendDialog = (JSV.common.JSViewer.getInterface (root + "OverlayLegendDialog")).setParams (this.pd ().getViewTitle (), this, null);
case JSV.common.Annotation.AType.Views:
return this.viewDialog = (JSV.common.JSViewer.getInterface (root + "ViewsDialog")).setParams ("View/Combine/Close Spectra", this, null);
default:
return null;
}
}, "JSV.common.Annotation.AType,JSV.common.JDXSpectrum");
$_M(c$, "show", 
($fz = function (what) {
this.getDialogManager ();
if (what.equals ("properties")) {
this.dialogManager.showProperties (null, this.pd ().getSpectrum ());
} else if (what.equals ("errors")) {
this.dialogManager.showSourceErrors (null, this.currentSource);
} else if (what.equals ("source")) {
if (this.currentSource == null) {
if (this.panelNodes.size () > 0) this.dialogManager.showMessageDialog (null, "Please Select a Spectrum", "Select Spectrum", 0);
return;
}this.dialogManager.showSource (this, this.currentSource);
}}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getDialogPrint", 
function (isJob) {
if (!this.isJS) try {
var pl = (this.getPlatformInterface ("PrintDialog")).set (this.offWindowFrame, this.lastPrintLayout, isJob).getPrintLayout ();
if (pl != null) this.lastPrintLayout = pl;
return pl;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return  new JSV.common.PrintLayout ();
}, "~B");
$_M(c$, "setIRmode", 
function (mode) {
if (mode.equals ("AtoT")) {
this.irMode = JSV.common.JDXSpectrum.IRMode.TO_TRANS;
} else if (mode.equals ("TtoA")) {
this.irMode = JSV.common.JDXSpectrum.IRMode.TO_ABS;
} else {
this.irMode = JSV.common.JDXSpectrum.IRMode.getMode (mode);
}}, "~S");
$_M(c$, "getOptionFromDialog", 
function (items, title, label) {
this.getDialogManager ().getOptionFromDialog (null, items, this.selectedPanel, title, label);
return 0;
}, "~A,~S,~S");
$_M(c$, "execWrite", 
($fz = function (value) {
if (this.isJS && value == null) value = "PDF";
var msg = (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).write (this, value == null ? null : JSV.common.ScriptToken.getTokens (value), false);
this.si.writeStatus (msg);
return msg;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "$export", 
function (type, n) {
if (type == null) type = "XY";
var pd = this.pd ();
var nMax = pd.getNumberOfSpectraInCurrentSet ();
if (n < -1 || n >= nMax) return "Maximum spectrum index (0-based) is " + (nMax - 1) + ".";
var spec = (n < 0 ? pd.getSpectrum () : pd.getSpectrumAt (n));
try {
return (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).exportTheSpectrum (this, JSV.common.ExportType.getType (type), null, spec, 0, spec.getXYCoords ().length - 1, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
return null;
} else {
throw e;
}
}
}, "~S,~N");
$_V(c$, "postByteArray", 
function (fileName, bytes) {
return JSV.common.JSVFileManager.postByteArray (fileName, bytes);
}, "~S,~A");
$_M(c$, "getOutputChannel", 
function (fileName, isBinary) {
var os = null;
{
while (fileName.startsWith("/"))
fileName = fileName.substring(1);
}return  new JU.OC ().setParams (this, fileName, !isBinary, os);
}, "~S,~B");
c$.getInterface = $_M(c$, "getInterface", 
function (name) {
try {
var x = Class.forName (name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineStatics (c$,
"sourceLabel", "Original...",
"FILE_OPEN_OK", 0,
"FILE_OPEN_ALREADY", -1,
"FILE_OPEN_ERROR", -3,
"FILE_OPEN_NO_DATA", -4,
"OVERLAY_DIALOG", -1,
"OVERLAY_OFFSET", 99,
"PORTRAIT", 1,
"PAGE_EXISTS", 0,
"NO_SUCH_PAGE", 1,
"noColor", "255,255,255",
"testScript", "<PeakData  index=\"1\" title=\"\" model=\"~1.1\" type=\"1HNMR\" xMin=\"3.2915\" xMax=\"3.2965\" atoms=\"15,16,17,18,19,20\" multiplicity=\"\" integral=\"1\"> src=\"JPECVIEW\" file=\"http://SIMULATION/$caffeine\"",
"NLEVEL_MAX", 100);
});
