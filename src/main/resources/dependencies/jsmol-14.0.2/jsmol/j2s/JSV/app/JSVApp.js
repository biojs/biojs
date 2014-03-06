Clazz.declarePackage ("JSV.app");
Clazz.load (["JSV.api.JSVAppInterface", "$.PanelListener"], "JSV.app.JSVApp", ["java.lang.Boolean", "$.Double", "JU.List", "$.PT", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSViewer", "$.PanelNode", "$.Parameters", "$.PeakPickEvent", "$.ScriptToken", "$.ScriptTokenizer", "$.SubSpecChangeEvent", "$.ZoomEvent", "JSV.source.FileReader", "JSV.util.JSVEscape", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.appletFrame = null;
this.fileCount = 0;
this.nViews = 0;
this.scriptLevelCount = 0;
this.isNewWindow = false;
this.allowCompoundMenu = true;
this.allowMenu = true;
this.autoIntegrate = false;
this.interfaceOverlaid = false;
this.loadImaginary = false;
this.obscureTitleFromUser = null;
this.initialStartIndex = -1;
this.initialEndIndex = -1;
this.integrationRatios = null;
this.appletReadyCallbackFunctionName = null;
this.coordCallbackFunctionName = null;
this.loadFileCallbackFunctionName = null;
this.peakCallbackFunctionName = null;
this.syncCallbackFunctionName = null;
this.viewer = null;
this.prevPanel = null;
this.returnFromJmolModel = null;
Clazz.instantialize (this, arguments);
}, JSV.app, "JSVApp", null, [JSV.api.PanelListener, JSV.api.JSVAppInterface]);
Clazz.makeConstructor (c$, 
function (appletFrame, isJS) {
this.appletFrame = appletFrame;
this.initViewer (isJS);
this.init ();
}, "JSV.api.AppletFrame,~B");
$_M(c$, "initViewer", 
($fz = function (isJS) {
this.viewer =  new JSV.common.JSViewer (this, true, isJS);
this.appletFrame.setDropTargetListener (this.isSigned (), this.viewer);
var path = this.appletFrame.getDocumentBase ();
JSV.common.JSVFileManager.setDocumentBase (this.viewer, path);
}, $fz.isPrivate = true, $fz), "~B");
$_V(c$, "isPro", 
function () {
return this.isSigned ();
});
$_V(c$, "isSigned", 
function () {
{
return true;
}});
$_V(c$, "siSetCurrentSource", 
function (source) {
this.viewer.currentSource = source;
}, "JSV.source.JDXSource");
$_V(c$, "siGetFileCount", 
function () {
return this.fileCount;
});
$_V(c$, "siSetFileCount", 
function (n) {
this.fileCount = n;
}, "~N");
$_V(c$, "siSetIntegrationRatios", 
function (value) {
this.integrationRatios = value;
}, "~S");
$_V(c$, "siGetIntegrationRatios", 
function () {
return this.integrationRatios;
});
$_M(c$, "getAppletFrame", 
function () {
return this.appletFrame;
});
$_V(c$, "siSetLoadImaginary", 
function (TF) {
this.loadImaginary = TF;
}, "~B");
$_V(c$, "siIncrementScriptLevelCount", 
function (n) {
return this.scriptLevelCount += n;
}, "~N");
$_V(c$, "siIncrementViewCount", 
function (n) {
return this.nViews += n;
}, "~N");
$_M(c$, "dispose", 
function () {
try {
this.viewer.dispose ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
$_V(c$, "getPropertyAsJavaObject", 
function (key) {
return this.viewer.getPropertyAsJavaObject (key);
}, "~S");
$_V(c$, "getPropertyAsJSON", 
function (key) {
return JU.PT.toJSON (null, this.getPropertyAsJavaObject (key));
}, "~S");
$_V(c$, "getCoordinate", 
function () {
return this.viewer.getCoordinate ();
});
$_V(c$, "loadInline", 
function (data) {
this.siOpenDataOrFile (data, null, null, null, -1, -1, true);
this.appletFrame.validateContent (3);
}, "~S");
$_V(c$, "exportSpectrum", 
function (type, n) {
return this.viewer.$export (type, n);
}, "~S,~N");
$_V(c$, "setFilePath", 
function (tmpFilePath) {
this.runScript ("load " + JSV.util.JSVEscape.eS (tmpFilePath));
}, "~S");
$_V(c$, "setSpectrumNumber", 
function (n) {
this.runScript (JSV.common.ScriptToken.SPECTRUMNUMBER + " " + n);
}, "~N");
$_V(c$, "reversePlot", 
function () {
this.toggle (JSV.common.ScriptToken.REVERSEPLOT);
});
$_V(c$, "toggleGrid", 
function () {
this.toggle (JSV.common.ScriptToken.GRIDON);
});
$_V(c$, "toggleCoordinate", 
function () {
this.toggle (JSV.common.ScriptToken.COORDINATESON);
});
$_V(c$, "toggleIntegration", 
function () {
this.toggle (JSV.common.ScriptToken.INTEGRATE);
});
$_M(c$, "toggle", 
($fz = function (st) {
var jsvp = this.viewer.selectedPanel;
if (jsvp != null) this.runScript (st + " TOGGLE");
}, $fz.isPrivate = true, $fz), "JSV.common.ScriptToken");
$_V(c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.viewer.addHighLight (x1, x2, r, g, b, a);
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "removeAllHighlights", 
function () {
this.viewer.removeAllHighlights ();
});
$_V(c$, "removeHighlight", 
function (x1, x2) {
this.viewer.removeHighlight (x1, x2);
}, "~N,~N");
$_V(c$, "syncScript", 
function (peakScript) {
this.viewer.syncScript (peakScript);
}, "~S");
$_V(c$, "writeStatus", 
function (msg) {
J.util.Logger.info (msg);
}, "~S");
$_M(c$, "init", 
($fz = function () {
this.initParams (this.appletFrame.getParameter ("script"));
}, $fz.isPrivate = true, $fz));
$_M(c$, "initParams", 
function (params) {
this.parseInitScript (params);
this.newAppletPanel ();
this.viewer.setPopupMenu (this.allowMenu, this.viewer.parameters.getBoolean (JSV.common.ScriptToken.ENABLEZOOM));
this.runScriptNow (params);
}, "~S");
$_M(c$, "newAppletPanel", 
($fz = function () {
J.util.Logger.info ("newAppletPanel");
this.appletFrame.addNewPanel (this.viewer);
}, $fz.isPrivate = true, $fz));
$_V(c$, "siSendPanelChange", 
function (jsvp) {
if (jsvp === this.prevPanel) return;
this.prevPanel = jsvp;
this.viewer.sendPanelChange (jsvp);
}, "JSV.api.JSVPanel");
$_V(c$, "siNewWindow", 
function (isSelected, fromFrame) {
this.isNewWindow = isSelected;
if (fromFrame) {
if (this.viewer.jsvpPopupMenu != null) this.viewer.jsvpPopupMenu.setSelected ("Window", false);
} else {
this.appletFrame.newWindow (isSelected);
}}, "~B,~B");
$_V(c$, "repaint", 
function () {
{
if (typeof Jmol != "undefined" && Jmol._repaint && this.viewer.applet)
Jmol._repaint(this.viewer.applet,true);
}});
$_M(c$, "updateJS", 
function (width, height) {
}, "~N,~N");
$_V(c$, "siValidateAndRepaint", 
function () {
if (this.viewer.selectedPanel != null) this.viewer.selectedPanel.getPanelData ().taintedAll = true;
this.appletFrame.validate ();
this.repaint ();
});
$_V(c$, "siSyncLoad", 
function (filePath) {
this.newAppletPanel ();
J.util.Logger.info ("JSVP syncLoad reading " + filePath);
this.siOpenDataOrFile (null, null, null, filePath, -1, -1, false);
this.appletFrame.validateContent (3);
}, "~S");
$_M(c$, "parseInitScript", 
($fz = function (params) {
if (params == null) params = "";
var allParamTokens =  new JSV.common.ScriptTokenizer (params, true);
if (J.util.Logger.debugging) {
J.util.Logger.info ("Running in DEBUG mode");
}while (allParamTokens.hasMoreTokens ()) {
var token = allParamTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = eachParam.nextToken ();
if (key.equalsIgnoreCase ("SET")) key = eachParam.nextToken ();
key = key.toUpperCase ();
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
J.util.Logger.info ("KEY-> " + key + " VALUE-> " + value + " : " + st);
try {
switch (st) {
default:
this.viewer.parameters.set (null, st, value);
break;
case JSV.common.ScriptToken.UNKNOWN:
break;
case JSV.common.ScriptToken.APPLETID:
this.viewer.appletID = value;
this.viewer.fullName = this.viewer.appletID + "__" + this.viewer.syncID + "__";
{
if(typeof Jmol != "undefined") this.viewer.applet =
Jmol._applets[value];
}break;
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
this.appletReadyCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.autoIntegrate = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.COMPOUNDMENUON:
this.allowCompoundMenu = Boolean.parseBoolean (value);
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.ENDINDEX:
this.initialEndIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.INTERFACE:
this.siExecSetInterface (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.viewer.setIRmode (value);
break;
case JSV.common.ScriptToken.MENUON:
this.allowMenu = Boolean.parseBoolean (value);
break;
case JSV.common.ScriptToken.OBSCURE:
if (this.obscureTitleFromUser == null) this.obscureTitleFromUser = Boolean.$valueOf (value);
break;
case JSV.common.ScriptToken.STARTINDEX:
this.initialStartIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.SYNCID:
this.viewer.syncID = value;
this.viewer.fullName = this.viewer.appletID + "__" + this.viewer.syncID + "__";
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "siOpenDataOrFile", 
function (data, name, specs, url, firstSpec, lastSpec, isAppend) {
var status = this.viewer.openDataOrFile (data, name, specs, url, firstSpec, lastSpec, isAppend);
if (status == -1) return;
if (status != 0) {
this.siSetSelectedPanel (null);
return;
}if (this.viewer.jsvpPopupMenu != null) this.viewer.jsvpPopupMenu.setCompoundMenu (this.viewer.panelNodes, this.allowCompoundMenu);
J.util.Logger.info (this.appletFrame.getAppletInfo () + " File " + this.viewer.currentSource.getFilePath () + " Loaded Successfully");
}, "~S,~S,JU.List,~S,~N,~N,~B");
$_V(c$, "siProcessCommand", 
function (scriptItem) {
this.viewer.runScriptNow (scriptItem);
}, "~S");
$_V(c$, "runScriptNow", 
function (params) {
return this.viewer.runScriptNow (params);
}, "~S");
$_M(c$, "checkCallbacks", 
($fz = function () {
if (this.coordCallbackFunctionName == null && this.peakCallbackFunctionName == null) return;
var coord =  new JSV.common.Coordinate ();
var actualCoord = (this.peakCallbackFunctionName == null ? null :  new JSV.common.Coordinate ());
if (!this.viewer.selectedPanel.getPanelData ().getPickedCoordinates (coord, actualCoord)) return;
var iSpec = this.viewer.viewPanel.getCurrentPanelIndex ();
if (actualCoord == null) this.appletFrame.callToJavaScript (this.coordCallbackFunctionName, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Integer.$valueOf (iSpec + 1)]);
 else this.appletFrame.callToJavaScript (this.peakCallbackFunctionName, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Double.$valueOf (actualCoord.getXVal ()), Double.$valueOf (actualCoord.getYVal ()), Integer.$valueOf (iSpec + 1)]);
}, $fz.isPrivate = true, $fz));
$_V(c$, "siSetSelectedPanel", 
function (jsvp) {
this.viewer.viewPanel.setSelectedPanel (jsvp, this.viewer.panelNodes);
this.viewer.selectedPanel = jsvp;
this.viewer.spectraTree.setSelectedPanel (this, jsvp);
this.appletFrame.validate ();
if (jsvp != null) {
jsvp.setEnabled (true);
jsvp.setFocusable (true);
}}, "JSV.api.JSVPanel");
$_M(c$, "doAdvanced", 
function (filePath) {
}, "~S");
$_V(c$, "panelEvent", 
function (eventObj) {
if (Clazz.instanceOf (eventObj, JSV.common.PeakPickEvent)) {
this.viewer.processPeakPickEvent (eventObj, false);
} else if (Clazz.instanceOf (eventObj, JSV.common.ZoomEvent)) {
} else if (Clazz.instanceOf (eventObj, JSV.common.SubSpecChangeEvent)) {
}}, "~O");
$_V(c$, "siExecSetCallback", 
function (st, value) {
switch (st) {
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.loadFileCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
this.peakCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.syncCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
this.coordCallbackFunctionName = value;
break;
}
}, "JSV.common.ScriptToken,~S");
$_V(c$, "getSolnColour", 
function () {
return this.viewer.getSolutionColor ();
});
$_V(c$, "siExecClose", 
function (value) {
var fromScript = (!value.startsWith ("!"));
if (fromScript) value = value.substring (1);
this.viewer.close (value);
if (!fromScript) this.siValidateAndRepaint ();
}, "~S");
$_V(c$, "siExecLoad", 
function (value) {
this.viewer.load (value);
if (this.viewer.selectedPanel == null) return null;
if (this.loadFileCallbackFunctionName != null) this.appletFrame.callToJavaScript (this.loadFileCallbackFunctionName, [this.viewer.appletID, value]);
return null;
}, "~S");
$_V(c$, "siExecHidden", 
function (b) {
}, "~B");
$_V(c$, "siExecSetInterface", 
function (value) {
this.interfaceOverlaid = (value.equalsIgnoreCase ("single") || value.equalsIgnoreCase ("overlay"));
}, "~S");
$_V(c$, "siExecScriptComplete", 
function (msg, isOK) {
this.siValidateAndRepaint ();
}, "~S,~B");
$_V(c$, "siExecSetAutoIntegrate", 
function (b) {
this.autoIntegrate = b;
}, "~B");
$_V(c$, "syncToJmol", 
function (msg) {
if (this.syncCallbackFunctionName == null) return;
J.util.Logger.info ("JSVApp.syncToJmol JSV>Jmol " + msg);
this.appletFrame.callToJavaScript (this.syncCallbackFunctionName, [this.viewer.fullName, msg]);
}, "~S");
$_V(c$, "setVisible", 
function (b) {
this.appletFrame.setPanelVisible (b);
}, "~B");
$_V(c$, "siUpdateBoolean", 
function (st, TF) {
}, "JSV.common.ScriptToken,~B");
$_V(c$, "siCheckCallbacks", 
function (title) {
this.checkCallbacks ();
}, "~S");
$_V(c$, "siSetNode", 
function (panelNode, fromTree) {
if (panelNode.jsvp !== this.viewer.selectedPanel) this.siSetSelectedPanel (panelNode.jsvp);
this.siSendPanelChange (panelNode.jsvp);
this.appletFrame.validateContent (2);
this.siValidateAndRepaint ();
}, "JSV.common.PanelNode,~B");
$_V(c$, "siCloseSource", 
function (source) {
this.viewer.closeSource (source);
}, "JSV.source.JDXSource");
$_V(c$, "setCursor", 
function (id) {
this.viewer.apiPlatform.setCursor (id, this.appletFrame);
}, "~N");
$_V(c$, "siGetAutoCombine", 
function () {
return this.interfaceOverlaid;
});
$_V(c$, "siCreateSource", 
function (data, filePath, firstSpec, lastSpec) {
return JSV.source.FileReader.createJDXSource (JSV.common.JSVFileManager.getBufferedReaderForString (data), filePath, this.obscureTitleFromUser === Boolean.TRUE, this.loadImaginary, -1, -1);
}, "~S,~S,~N,~N");
$_V(c$, "siGetNewJSVPanel2", 
function (specs) {
var jsvp = this.appletFrame.getJSVPanel (this.viewer, specs, this.initialStartIndex, this.initialEndIndex);
this.initialEndIndex = this.initialStartIndex = -1;
jsvp.getPanelData ().addListener (this);
this.viewer.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JU.List");
$_V(c$, "siGetNewJSVPanel", 
function (spec) {
if (spec == null) {
this.initialEndIndex = this.initialStartIndex = -1;
return null;
}var specs =  new JU.List ();
specs.addLast (spec);
var jsvp = this.appletFrame.getJSVPanel (this.viewer, specs, this.initialStartIndex, this.initialEndIndex);
jsvp.getPanelData ().addListener (this);
this.viewer.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JSV.common.JDXSpectrum");
$_V(c$, "siGetNewPanelNode", 
function (id, fileName, source, jsvp) {
return  new JSV.common.PanelNode (id, fileName, source, jsvp);
}, "~S,~S,JSV.source.JDXSource,JSV.api.JSVPanel");
$_V(c$, "siGetAutoShowLegend", 
function () {
return false;
});
$_V(c$, "siSetReturnFromJmolModel", 
function (model) {
this.returnFromJmolModel = model;
}, "~S");
$_V(c$, "siGetReturnFromJmolModel", 
function () {
return this.returnFromJmolModel;
});
$_V(c$, "siSetPropertiesFromPreferences", 
function (jsvp, includeMeasures) {
if (this.autoIntegrate) jsvp.getPanelData ().integrateAll (this.viewer.parameters);
}, "JSV.api.JSVPanel,~B");
$_V(c$, "siSetLoaded", 
function (fileName, filePath) {
}, "~S,~S");
$_V(c$, "siSetMenuEnables", 
function (node, isSplit) {
}, "JSV.common.PanelNode,~B");
$_V(c$, "siSetRecentURL", 
function (filePath) {
}, "~S");
$_V(c$, "siUpdateRecentMenus", 
function (filePath) {
}, "~S");
$_V(c$, "siExecTest", 
function (value) {
var data = "##TITLE= Acetophenone\n##JCAMP-DX= 5.01\n##DATA TYPE= MASS SPECTRUM\n##DATA CLASS= XYPOINTS\n##ORIGIN= UWI, Mona, JAMAICA\n##OWNER= public domain\n##LONGDATE= 2012/02/19 22:20:06.0416 -0600 $$ export date from JSpecView\n##BLOCK_ID= 4\n##$URL= http://wwwchem.uwimona.edu.jm/spectra\n##SPECTROMETER/DATA SYSTEM= Finnigan\n##.INSTRUMENT PARAMETERS= LOW RESOLUTION\n##.SPECTROMETER TYPE= TRAP\n##.INLET= GC\n##.IONIZATION MODE= EI+\n##MOLFORM= C 8 H 8 O\n##$MODELS= \n<Models>\n<ModelData id=\"acetophenone\" type=\"MOL\">\nacetophenone\nDSViewer          3D                             0\n\n17 17  0  0  0  0  0  0  0  0999 V2000\n-1.6931    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  1\n-0.2141    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  2\n2.5839    0.0872    0.0000 C   0  0  0  0  0  0  0  0  0  3\n0.4615    1.2373   -0.0005 C   0  0  0  0  0  0  0  0  0  4\n0.5257   -1.1809    0.0001 C   0  0  0  0  0  0  0  0  0  5\n1.9188   -1.1393    0.0005 C   0  0  0  0  0  0  0  0  0  6\n1.8539    1.2756   -0.0001 C   0  0  0  0  0  0  0  0  0  7\n-0.1262    2.1703   -0.0009 H   0  0  0  0  0  0  0  0  0  8\n0.0144   -2.1556    0.0002 H   0  0  0  0  0  0  0  0  0  9\n2.4947   -2.0764    0.0009 H   0  0  0  0  0  0  0  0  0 10\n2.3756    2.2439   -0.0001 H   0  0  0  0  0  0  0  0  0 11\n3.6838    0.1161    0.0003 H   0  0  0  0  0  0  0  0  0 12\n-2.3403    1.0639    0.0008 O   0  0  0  0  0  0  0  0  0 13\n-2.3832   -1.3197   -0.0010 C   0  0  0  0  0  0  0  0  0 14\n-2.0973   -1.8988    0.9105 H   0  0  0  0  0  0  0  0  0 15\n-2.0899   -1.9018   -0.9082 H   0  0  0  0  0  0  0  0  0 16\n-3.4920   -1.1799   -0.0059 H   0  0  0  0  0  0  0  0  0 17\n1  2  1  0  0  0\n2  5  4  0  0  0\n2  4  4  0  0  0\n3 12  1  0  0  0\n4  7  4  0  0  0\n5  6  4  0  0  0\n6 10  1  0  0  0\n6  3  4  0  0  0\n7  3  4  0  0  0\n7 11  1  0  0  0\n8  4  1  0  0  0\n9  5  1  0  0  0\n13  1  2  0  0  0\n14 16  1  0  0  0\n14  1  1  0  0  0\n14 15  1  0  0  0\n17 14  1  0  0  0\nM  END\n</ModelData>\n<ModelData id=\"2\" type=\"MOL\">\nacetophenone m/z 120\nDSViewer          3D                             0\n\n17 17  0  0  0  0  0  0  0  0999 V2000\n-1.6931    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  1\n-0.2141    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  2\n2.5839    0.0872    0.0000 C   0  0  0  0  0  0  0  0  0  3\n0.4615    1.2373   -0.0005 C   0  0  0  0  0  0  0  0  0  4\n0.5257   -1.1809    0.0001 C   0  0  0  0  0  0  0  0  0  5\n1.9188   -1.1393    0.0005 C   0  0  0  0  0  0  0  0  0  6\n1.8539    1.2756   -0.0001 C   0  0  0  0  0  0  0  0  0  7\n-0.1262    2.1703   -0.0009 H   0  0  0  0  0  0  0  0  0  8\n0.0144   -2.1556    0.0002 H   0  0  0  0  0  0  0  0  0  9\n2.4947   -2.0764    0.0009 H   0  0  0  0  0  0  0  0  0 10\n2.3756    2.2439   -0.0001 H   0  0  0  0  0  0  0  0  0 11\n3.6838    0.1161    0.0003 H   0  0  0  0  0  0  0  0  0 12\n-2.3403    1.0639    0.0008 O   0  0  0  0  0  0  0  0  0 13\n-2.3832   -1.3197   -0.0010 C   0  0  0  0  0  0  0  0  0 14\n-2.0973   -1.8988    0.9105 H   0  0  0  0  0  0  0  0  0 15\n-2.0899   -1.9018   -0.9082 H   0  0  0  0  0  0  0  0  0 16\n-3.4920   -1.1799   -0.0059 H   0  0  0  0  0  0  0  0  0 17\n1  2  1  0  0  0\n2  5  4  0  0  0\n2  4  4  0  0  0\n3 12  1  0  0  0\n4  7  4  0  0  0\n5  6  4  0  0  0\n6 10  1  0  0  0\n6  3  4  0  0  0\n7  3  4  0  0  0\n7 11  1  0  0  0\n8  4  1  0  0  0\n9  5  1  0  0  0\n13  1  2  0  0  0\n14 16  1  0  0  0\n14  1  1  0  0  0\n14 15  1  0  0  0\n17 14  1  0  0  0\nM  END\nacetophenone m/z 105\n\ncreated with ArgusLab version 4.0.1\n13 13  0  0  0  0  0  0  0  0  0 V2000\n-1.6931    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n-0.2141    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n2.5839    0.0872    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n0.4615    1.2373   -0.0005 C   0  0  0  0  0  0  0  0  0  0  0  0\n0.5257   -1.1809    0.0001 C   0  0  0  0  0  0  0  0  0  0  0  0\n1.9188   -1.1393    0.0005 C   0  0  0  0  0  0  0  0  0  0  0  0\n1.8539    1.2756   -0.0001 C   0  0  0  0  0  0  0  0  0  0  0  0\n-2.3403    1.0639    0.0008 O   0  0  0  0  0  0  0  0  0  0  0  0\n-0.1262    2.1703   -0.0009 H   0  0  0  0  0  0  0  0  0  0  0  0\n0.0144   -2.1556    0.0002 H   0  0  0  0  0  0  0  0  0  0  0  0\n2.4947   -2.0764    0.0009 H   0  0  0  0  0  0  0  0  0  0  0  0\n2.3756    2.2439   -0.0001 H   0  0  0  0  0  0  0  0  0  0  0  0\n3.6838    0.1161    0.0003 H   0  0  0  0  0  0  0  0  0  0  0  0\n1  2  1  0  0  0  0\n1  8  2  0  0  0  0\n2  4  4  0  0  0  0\n2  5  4  0  0  0  0\n3  6  4  0  0  0  0\n3  7  4  0  0  0  0\n3 13  1  0  0  0  0\n4  7  4  0  0  0  0\n4  9  1  0  0  0  0\n5  6  4  0  0  0  0\n5 10  1  0  0  0  0\n6 11  1  0  0  0  0\n7 12  1  0  0  0  0\nM  END\nacetophenone m/z 77\n\ncreated with ArgusLab version 4.0.1\n11 11  0  0  0  0  0  0  0  0  0 V2000\n-0.2141    0.0078    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n2.5839    0.0872    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n0.4615    1.2373   -0.0005 C   0  0  0  0  0  0  0  0  0  0  0  0\n0.5257   -1.1809    0.0001 C   0  0  0  0  0  0  0  0  0  0  0  0\n1.9188   -1.1393    0.0005 C   0  0  0  0  0  0  0  0  0  0  0  0\n1.8539    1.2756   -0.0001 C   0  0  0  0  0  0  0  0  0  0  0  0\n-0.1262    2.1703   -0.0009 H   0  0  0  0  0  0  0  0  0  0  0  0\n0.0144   -2.1556    0.0002 H   0  0  0  0  0  0  0  0  0  0  0  0\n2.4947   -2.0764    0.0009 H   0  0  0  0  0  0  0  0  0  0  0  0\n2.3756    2.2439   -0.0001 H   0  0  0  0  0  0  0  0  0  0  0  0\n3.6838    0.1161    0.0003 H   0  0  0  0  0  0  0  0  0  0  0  0\n1  3  4  0  0  0  0\n1  4  4  0  0  0  0\n2  5  4  0  0  0  0\n2  6  4  0  0  0  0\n2 11  1  0  0  0  0\n3  6  4  0  0  0  0\n3  7  1  0  0  0  0\n4  5  4  0  0  0  0\n4  8  1  0  0  0  0\n5  9  1  0  0  0  0\n6 10  1  0  0  0  0\nM  END\n</ModelData>\n</Models>\n##$PEAKS= \n<Peaks type=\"MS\" xUnits=\"M/Z\" yUnits=\"RELATIVE ABUNDANCE\" >\n<PeakData id=\"1\" title=\"molecular ion (~120)\" peakShape=\"sharp\" model=\"2.1\"  xMax=\"121\" xMin=\"119\"  yMax=\"100\" yMin=\"0\" />\n<PeakData id=\"2\" title=\"fragment 1 (~105)\" peakShape=\"sharp\" model=\"2.2\"  xMax=\"106\" xMin=\"104\"  yMax=\"100\" yMin=\"0\" />\n<PeakData id=\"3\" title=\"fragment 2 (~77)\" peakShape=\"sharp\" model=\"2.3\"  xMax=\"78\" xMin=\"76\"  yMax=\"100\" yMin=\"0\" />\n</Peaks>\n##XUNITS= M/Z\n##YUNITS= RELATIVE ABUNDANCE\n##XFACTOR= 1E0\n##YFACTOR= 1E0\n##FIRSTX= 0\n##FIRSTY= 0\n##LASTX= 121\n##NPOINTS= 19\n##XYPOINTS= (XY..XY)\n0.000000, 0.000000 \n38.000000, 5.200000 \n39.000000, 8.000000 \n43.000000, 21.900000 \n50.000000, 20.200000 \n51.000000, 41.900000 \n52.000000, 4.000000 \n63.000000, 3.800000 \n74.000000, 6.600000 \n75.000000, 3.700000 \n76.000000, 4.600000 \n77.000000, 100.000000 \n78.000000, 10.400000 \n89.000000, 1.000000 \n91.000000, 1.000000 \n105.000000, 80.800000 \n106.000000, 6.000000 \n120.000000, 23.100000 \n121.000000, 2.000000 \n##END=";
this.loadInline (data);
}, "~S");
$_V(c$, "siSetFileAsString", 
function (value) {
return JSV.common.JSVFileManager.getFileAsString (value);
}, "~S");
$_V(c$, "siCreateTree", 
function (source, jsvPanels) {
return this.viewer.spectraTree.createTree (this, source, jsvPanels);
}, "JSV.source.JDXSource,~A");
$_V(c$, "siGetViewer", 
function () {
return this.viewer;
});
$_V(c$, "runScript", 
function (script) {
this.viewer.runScript (script);
}, "~S");
$_V(c$, "getScriptQueue", 
function () {
return this.viewer.scriptQueue;
});
});
