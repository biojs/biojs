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
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.IntegrationDialog", ["java.lang.Double", "JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "IntegrationDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.IntegrationDialog, []);
this.type = JSV.common.Annotation.AType.Integration;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.IntegrationDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtBaselineOffset", "Baseline Offset", null, "%", "" + this.viewer.parameters.integralOffset, true);
this.txt2 = this.dialog.addTextField ("txtScale", "Scale", null, "%", "" + this.viewer.parameters.integralRange, true);
this.dialog.addButton ("btnApply", "Apply");
this.addApplyBtn = false;
this.dialog.addButton ("btnAuto", "Auto");
this.dialog.addButton ("btnDelete", "Delete");
this.dialog.addButton ("btnNormalize", "Normalize");
});
$_V(c$, "applyFromFields", 
function () {
this.apply ([this.dialog.getText (this.txt1), this.dialog.getText (this.txt2)]);
});
$_V(c$, "callback", 
function (id, msg) {
var val;
try {
if (!id.equals ("windowClosing") && (id.equals ("btnAuto") || this.xyData == null || this.xyData.size () == 0)) {
this.viewer.runScript ("integrate auto");
this.eventApply ();
} else if (id.equals ("btnDelete")) {
this.deleteIntegral ();
} else if (id.equals ("btnNormalize")) {
if (!this.checkSelectedIntegral ()) return true;
var ret = this.manager.getDialogInput (this.dialog, "Enter a normalization factor", "Normalize", 3, null, null, "" + this.lastNorm);
val = Double.parseDouble (ret);
if (val > 0) (this.xyData).setSelectedIntegral (this.xyData.get (this.iSelected), this.lastNorm = val);
this.eventApply ();
} else {
return this.callbackAD (id, msg);
}} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
return true;
}, "~S,~S");
$_M(c$, "checkSelectedIntegral", 
function () {
if (this.iSelected < 0) {
this.showMessage ("Select a line on the table first, then click this button.", "Integration", 1);
return false;
}return true;
});
$_M(c$, "deleteIntegral", 
function () {
if (!this.checkSelectedIntegral ()) return;
this.xyData.remove (this.iSelected);
this.iSelected = -1;
this.iRowColSelected = -1;
this.applyFromFields ();
});
Clazz_defineStatics (c$,
"posXY", [-2147483648, 0]);
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.PeakListDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "PeakListDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.PeakListDialog, []);
this.type = JSV.common.Annotation.AType.PeakList;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.PeakListDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtThreshold", "Threshold", null, "", "", true);
this.setThreshold (NaN);
this.combo1 = this.dialog.addSelectOption ("cmbInterpolation", "Interpolation", ["parabolic", "none"], 0, true);
});
$_V(c$, "callback", 
function (id, msg) {
if (id.equals ("cmbInterpolation") || id.equals ("txtThreshold")) id = "btnApply";
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY", [-2147483648, 0]);
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.MeasurementsDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "MeasurementsDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.MeasurementsDialog, []);
this.type = JSV.common.Annotation.AType.Measurements;
});
$_M(c$, "addUniqueControls", 
function () {
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.MeasurementsDialog.posXY;
});
$_V(c$, "callback", 
function (id, msg) {
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY", [-2147483648, 0]);
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.OverlayLegendDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz_declareType (JSV.dialog, "OverlayLegendDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.OverlayLegendDialog, []);
this.type = JSV.common.Annotation.AType.OverlayLegend;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.OverlayLegendDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
});
$_V(c$, "callback", 
function (id, msg) {
return false;
}, "~S,~S");
Clazz_defineStatics (c$,
"posXY", [-2147483648, 0]);
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.dialog.JSVDialog"], "JSV.dialog.ViewsDialog", ["JU.List", "$.PT", "$.SB", "JSV.common.Annotation"], function () {
c$ = Clazz_decorateAsClass (function () {
this.treeNodes = null;
this.checkBoxes = null;
this.closeSelectedButton = null;
this.combineSelectedButton = null;
this.viewSelectedButton = null;
this.checking = false;
Clazz_instantialize (this, arguments);
}, JSV.dialog, "ViewsDialog", JSV.dialog.JSVDialog);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.dialog.ViewsDialog, []);
this.type = JSV.common.Annotation.AType.Views;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.ViewsDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
this.checkBoxes =  new JU.List ();
this.treeNodes =  new JU.List ();
this.dialog.addButton ("btnSelectAll", "Select All");
this.dialog.addButton ("btnSelectNone", "Select None");
this.viewSelectedButton = this.dialog.addButton ("btnViewSelected", "View Selected");
this.combineSelectedButton = this.dialog.addButton ("btnCombineSelected", "Combine Selected");
this.closeSelectedButton = this.dialog.addButton ("btnCloseSelected", "Close Selected");
this.dialog.addButton ("btnDone", "Done");
this.dialog.setPreferredSize (500, 350);
this.dialog.addCheckBox (null, null, 0, false);
this.addCheckBoxes (this.viewer.spectraTree.getRootNode (), 0, true);
this.addCheckBoxes (this.viewer.spectraTree.getRootNode (), 0, false);
});
$_M(c$, "addCheckBoxes", 
function (rootNode, level, isViews) {
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
var node = treeNode.getPanelNode ();
if (node.isView != isViews) continue;
var title = node.toString ();
if (title.indexOf ("\n") >= 0) title = title.substring (0, title.indexOf ('\n'));
var name = "chkBox" + this.treeNodes.size ();
var cb = this.dialog.addCheckBox (name, title, level, node.isSelected);
treeNode.setIndex (this.treeNodes.size ());
this.treeNodes.addLast (treeNode);
this.checkBoxes.addLast (cb);
this.addCheckBoxes (treeNode, level + 1, isViews);
}
}, "JSV.api.JSVTreeNode,~N,~B");
$_V(c$, "checkEnables", 
function () {
var n = 0;
for (var i = 0; i < this.checkBoxes.size (); i++) {
if (this.dialog.isSelected (this.checkBoxes.get (i)) && this.treeNodes.get (i).getPanelNode ().jsvp != null) {
n++;
}}
this.dialog.setEnabled (this.closeSelectedButton, n > 0);
this.dialog.setEnabled (this.combineSelectedButton, n > 1);
this.dialog.setEnabled (this.viewSelectedButton, n == 1);
});
$_M(c$, "check", 
function (name) {
var i = JU.PT.parseInt (name.substring (name.indexOf ("_") + 1));
var node = this.treeNodes.get (i);
var cb = this.checkBoxes.get (i);
var isSelected = this.dialog.isSelected (cb);
if (node.getPanelNode ().jsvp == null) {
if (!this.checking && isSelected && this.dialog.getText (cb).startsWith ("Overlay")) {
this.checking = true;
this.selectAll (false);
this.dialog.setSelected (cb, true);
node.getPanelNode ().isSelected = true;
this.checking = false;
}var enume = node.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
this.dialog.setSelected (this.checkBoxes.get (treeNode.getIndex ()), isSelected);
treeNode.getPanelNode ().isSelected = isSelected;
node.getPanelNode ().isSelected = isSelected;
}
} else {
node.getPanelNode ().isSelected = isSelected;
}if (isSelected) for (i = this.treeNodes.size (); --i >= 0; ) if (this.treeNodes.get (i).getPanelNode ().isView != node.getPanelNode ().isView) {
this.dialog.setSelected (this.checkBoxes.get (this.treeNodes.get (i).getIndex ()), false);
this.treeNodes.get (i).getPanelNode ().isSelected = false;
}
this.checkEnables ();
}, "~S");
$_M(c$, "selectAll", 
function (mode) {
for (var i = this.checkBoxes.size (); --i >= 0; ) {
this.dialog.setSelected (this.checkBoxes.get (i), mode);
this.treeNodes.get (i).getPanelNode ().isSelected = mode;
}
this.checkEnables ();
}, "~B");
$_M(c$, "combineSelected", 
function () {
var sb =  new JU.SB ();
for (var i = 0; i < this.checkBoxes.size (); i++) {
var cb = this.checkBoxes.get (i);
var node = this.treeNodes.get (i).getPanelNode ();
if (this.dialog.isSelected (cb) && node.jsvp != null) {
if (node.isView) {
this.viewer.setNode (node, true);
return;
}var label = this.dialog.getText (cb);
sb.append (" ").append (label.substring (0, label.indexOf (":")));
}}
this.viewer.execView (sb.toString ().trim (), false);
this.layoutDialog ();
});
$_M(c$, "viewSelected", 
function () {
var sb =  new JU.SB ();
for (var i = 0; i < this.checkBoxes.size (); i++) {
var cb = this.checkBoxes.get (i);
var node = this.treeNodes.get (i).getPanelNode ();
if (this.dialog.isSelected (cb) && node.jsvp != null) {
if (node.isView) {
this.viewer.setNode (node, true);
return;
}var label = this.dialog.getText (cb);
sb.append (" ").append (label.substring (0, label.indexOf (":")));
}}
this.viewer.execView (sb.toString ().trim (), false);
this.layoutDialog ();
});
$_M(c$, "closeSelected", 
function () {
this.viewer.runScript ("close !selected");
this.layoutDialog ();
});
$_V(c$, "callback", 
function (id, msg) {
if (id.equals ("btnSelectAll")) {
this.selectAll (true);
} else if (id.equals ("btnSelectNone")) {
this.selectAll (false);
} else if (id.equals ("btnViewSelected")) {
this.viewSelected ();
} else if (id.equals ("btnCombineSelected")) {
this.combineSelected ();
} else if (id.equals ("btnCloseSelected")) {
this.closeSelected ();
} else if (id.equals ("btnDone")) {
this.dispose ();
this.done ();
} else {
return this.callbackAD (id, msg);
}return true;
}, "~S,~S");
$_V(c$, "applyFromFields", 
function () {
});
Clazz_defineStatics (c$,
"posXY", [-2147483648, 0]);
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.dialog.DialogManager"], "JSV.js2d.JsDialogManager", ["javajs.awt.BorderLayout", "$.Dimension", "javajs.swing.JDialog", "$.JEditorPane", "$.JPanel", "$.JScrollPane", "$.JTable", "JU.PT", "JSV.js2d.DialogTableModel", "$.JsDialog"], function () {
c$ = Clazz_declareType (JSV.js2d, "JsDialogManager", JSV.dialog.DialogManager);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.js2d.JsDialogManager, []);
});
$_V(c$, "getDialog", 
function (jsvDialog) {
return  new JSV.js2d.JsDialog (this, jsvDialog, this.registerDialog (jsvDialog));
}, "JSV.dialog.JSVDialog");
$_V(c$, "getDialogInput", 
function (parentComponent, phrase, title, msgType, icon, objects, defaultStr) {
{
return prompt(phrase, defaultStr);
}}, "~O,~S,~S,~N,~O,~A,~S");
$_V(c$, "showMessageDialog", 
function (parentComponent, msg, title, msgType) {
{
alert(msg);
}}, "~O,~S,~S,~N");
$_V(c$, "getLocationOnScreen", 
function (component) {
return  Clazz_newIntArray (2, 0);
}, "~O");
$_V(c$, "getOptionFromDialog", 
function (frame, items, jsvp, dialogName, labelName) {
return 0;
}, "~O,~A,JSV.api.JSVPanel,~S,~S");
$_V(c$, "showProperties", 
function (frame, spectrum) {
var dialog =  new javajs.swing.JDialog ();
dialog.setTitle ("Header Information");
var rowData = spectrum.getHeaderRowDataAsArray ();
var columnNames = ["Label", "Description"];
var tableModel =  new JSV.js2d.DialogTableModel (columnNames, rowData, false, true);
var table =  new javajs.swing.JTable (tableModel);
table.setPreferredScrollableViewportSize ( new javajs.awt.Dimension (400, 195));
var scrollPane =  new javajs.swing.JScrollPane (table);
dialog.getContentPane ().add (scrollPane);
dialog.pack ();
dialog.setVisible (true);
}, "~O,JSV.common.JDXSpectrum");
$_V(c$, "showScrollingText", 
function (frame, title, text) {
var dialog =  new javajs.swing.JDialog ();
var sourcePane =  new javajs.swing.JEditorPane ();
sourcePane.setText (text);
var scrollPane =  new javajs.swing.JScrollPane (sourcePane);
scrollPane.setPreferredSize ( new javajs.awt.Dimension (500, 400));
scrollPane.setMinimumSize ( new javajs.awt.Dimension (500, 400));
var contentPanel =  new javajs.swing.JPanel ( new javajs.awt.BorderLayout ());
contentPanel.add (scrollPane, "Center");
dialog.getContentPane ().add (contentPanel);
dialog.pack ();
dialog.setVisible (true);
dialog.setTitle (title);
var pane =  new javajs.swing.JEditorPane ();
pane.setText (text);
dialog.getContentPane ().add (pane);
dialog.pack ();
dialog.setVisible (true);
}, "~O,~S,~S");
$_M(c$, "actionPerformed", 
function (eventId) {
var pt = eventId.indexOf ("/JT");
if (pt >= 0) {
var pt2 = eventId.lastIndexOf ("_");
var pt1 = eventId.lastIndexOf ("_", pt2 - 1);
var irow = JU.PT.parseInt (eventId.substring (pt1 + 1, pt2));
var icol = JU.PT.parseInt (eventId.substring (pt2 + 1));
this.processTableEvent (eventId.substring (0, pt) + "/ROWCOL", irow, icol, false);
return;
}this.processClick (eventId);
}, "~S");
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (null, "JSV.dialog.DialogManager", ["java.util.Hashtable", "JSV.common.JSVFileManager"], function () {
c$ = Clazz_decorateAsClass (function () {
this.viewer = null;
this.htSelectors = null;
this.htDialogs = null;
this.options = null;
Clazz_instantialize (this, arguments);
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
if (Clazz_exceptionOf (ex, Exception)) {
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
function (dialogId, id, msg) {
var jsvDialog = this.htDialogs.get (dialogId);
if (jsvDialog != null) jsvDialog.callback (id, msg);
}, "~S,~S,~S");
$_M(c$, "getDialogOptions", 
function () {
if (this.options == null) this.options =  new java.util.Hashtable ();
return this.options;
});
Clazz_defineStatics (c$,
"PLAIN_MESSAGE", -1,
"ERROR_MESSAGE", 0,
"INFORMATION_MESSAGE", 1,
"WARNING_MESSAGE", 2,
"QUESTION_MESSAGE", 3);
});
Clazz_declarePackage ("javajs.awt");
Clazz_load (["javajs.awt.LayoutManager"], "javajs.awt.BorderLayout", null, function () {
c$ = Clazz_declareType (javajs.awt, "BorderLayout", javajs.awt.LayoutManager);
Clazz_defineStatics (c$,
"CENTER", "Center",
"NORTH", "North",
"SOUTH", "South",
"EAST", "East",
"WEST", "West");
});
Clazz_declarePackage ("javajs.awt");
c$ = Clazz_declareType (javajs.awt, "LayoutManager");
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JContainer"], "javajs.swing.JDialog", ["javajs.awt.Color", "javajs.swing.JContentPane", "JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.defaultWidth = 600;
this.defaultHeight = 300;
this.contentPane = null;
this.title = null;
this.html = null;
this.zIndex = 9000;
this.loc = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JDialog", javajs.swing.JContainer);
$_M(c$, "setZIndex", 
function (zIndex) {
this.zIndex = zIndex;
}, "~N");
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, javajs.swing.JDialog, ["JD"]);
this.add (this.contentPane =  new javajs.swing.JContentPane ());
this.setBackground (javajs.awt.Color.get3 (210, 210, 240));
this.contentPane.setBackground (javajs.awt.Color.get3 (230, 230, 230));
});
$_M(c$, "setLocation", 
function (loc) {
this.loc = loc;
}, "~A");
$_M(c$, "getContentPane", 
function () {
return this.contentPane;
});
$_M(c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
$_M(c$, "pack", 
function () {
this.html = null;
});
$_M(c$, "validate", 
function () {
this.html = null;
});
$_M(c$, "setVisible", 
function (tf) {
if (tf && this.html == null) this.setDialog ();
Clazz_superCall (this, javajs.swing.JDialog, "setVisible", [tf]);
}, "~B");
$_M(c$, "dispose", 
function () {
{
{
SwingController.dispose(this);
}}});
$_V(c$, "repaint", 
function () {
this.setDialog ();
});
$_M(c$, "setDialog", 
function () {
this.html = this.toHTML ();
{
SwingController.setDialog(this);
}});
$_V(c$, "toHTML", 
function () {
this.renderWidth = this.getSubcomponentWidth ();
if (this.renderWidth == 0) this.renderWidth = this.defaultWidth;
this.renderHeight = this.contentPane.getSubcomponentHeight ();
if (this.renderHeight == 0) this.renderHeight = this.defaultHeight;
var h = this.renderHeight - 25;
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JDialog' style='" + this.getCSSstyle (0) + "z-index:" + this.zIndex + ";position:relative;top:0px;left:0px;reize:both;'>\n");
sb.append ("\n<div id='" + this.id + "_title' class='JDialogTitle' style='width:100%;height:25px;padding:5px 5px 5px 5px;height:" + 25 + "px'>" + "<span style='text-align:center;'>" + this.title + "</span><span style='position:absolute;text-align:right;right:1px;'>" + "<input type=button id='" + this.id + "_closer' onclick='SwingController.windowClosing(this)' value='x' /></span></div>\n");
sb.append ("\n<div id='" + this.id + "_body' class='JDialogBody' style='width:100%;height:" + h + "px;" + "position: relative;left:0px;top:0px'>\n");
sb.append (this.contentPane.toHTML ());
sb.append ("\n</div></div>\n");
return sb.toString ();
});
Clazz_defineStatics (c$,
"headerHeight", 25);
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JContainer", ["JU.List"], function () {
c$ = Clazz_decorateAsClass (function () {
this.list = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JContainer", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (type) {
Clazz_superConstructor (this, javajs.swing.JContainer, [type]);
this.list =  new JU.List ();
}, "~S");
$_M(c$, "removeAll", 
function () {
this.list.clear ();
});
$_M(c$, "add", 
function (component) {
this.list.addLast (component);
return component;
}, "javajs.swing.JComponent");
$_M(c$, "getSubcomponentWidth", 
function () {
return (this.list.size () == 1 ? this.list.get (0).getSubcomponentWidth () : 0);
});
$_M(c$, "getSubcomponentHeight", 
function () {
return (this.list.size () == 1 ? this.list.get (0).getSubcomponentHeight () : 0);
});
$_V(c$, "toHTML", 
function () {
return null;
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.awt.Component"], "javajs.swing.JComponent", null, function () {
c$ = Clazz_declareType (javajs.swing, "JComponent", javajs.awt.Component);
});
Clazz_declarePackage ("javajs.awt");
Clazz_load (null, "javajs.awt.Component", ["JU.CU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.visible = false;
this.enabled = false;
this.text = null;
this.name = null;
this.width = 0;
this.height = 0;
this.id = null;
this.controller = null;
this.actionListener = null;
this.bgcolor = null;
this.minWidth = 30;
this.minHeight = 30;
this.renderWidth = 0;
this.renderHeight = 0;
Clazz_instantialize (this, arguments);
}, javajs.awt, "Component");
Clazz_makeConstructor (c$, 
function (type) {
if (type == null) return;
{
SwingController.register(this, type);
}}, "~S");
$_M(c$, "setBackground", 
function (color) {
this.bgcolor = color;
}, "javajs.api.GenericColor");
$_M(c$, "setText", 
function (text) {
this.text = text;
{
SwingController.setText(this);
}}, "~S");
$_M(c$, "setName", 
function (name) {
this.name = name;
}, "~S");
$_M(c$, "setPreferredSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "javajs.awt.Dimension");
$_M(c$, "addActionListener", 
function (listener) {
this.actionListener = listener;
}, "~O");
$_M(c$, "getText", 
function () {
return this.text;
});
$_M(c$, "setEnabled", 
function (enabled) {
this.enabled = enabled;
}, "~B");
$_M(c$, "isVisible", 
function () {
return this.visible;
});
$_M(c$, "setVisible", 
function (visible) {
this.visible = visible;
}, "~B");
$_M(c$, "getHeight", 
function () {
return this.height;
});
$_M(c$, "getWidth", 
function () {
return this.width;
});
$_M(c$, "setMinimumSize", 
function (d) {
this.minWidth = d.width;
this.minHeight = d.height;
}, "javajs.awt.Dimension");
$_M(c$, "getSubcomponentWidth", 
function () {
return this.width;
});
$_M(c$, "getSubcomponentHeight", 
function () {
return this.height;
});
$_M(c$, "getCSSstyle", 
function (defaultPercent) {
var width = (this.renderWidth > 0 ? this.renderWidth : this.getSubcomponentWidth ());
var height = (this.renderHeight > 0 ? this.renderHeight : this.getSubcomponentHeight ());
return (width > 0 ? "width:" + width + "px;" : defaultPercent > 0 ? "width:" + defaultPercent + "%;" : "") + (height > 0 ? "height:" + height + "px;" : defaultPercent > 0 ? "height:" + defaultPercent + "%;" : "") + (this.bgcolor == null ? "" : "background-color:" + JU.CU.toCSSString (this.bgcolor) + ";");
}, "~N");
$_M(c$, "repaint", 
function () {
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JContainer"], "javajs.swing.JContentPane", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JContentPane", javajs.swing.JContainer);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, javajs.swing.JContentPane, ["JCP"]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JContentPane' style='" + this.getCSSstyle (100) + "'>\n");
for (var i = 0; i < this.list.size (); i++) sb.append (this.list.get (i).toHTML ());

sb.append ("\n</div>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JEditorPane", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JEditorPane", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, javajs.swing.JEditorPane, ["txtJEP"]);
this.text = "";
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<textarea type=text id='" + this.id + "' class='JEditorPane' style='" + this.getCSSstyle (98) + "'>" + this.text + "</textarea>");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JPanel", ["javajs.swing.Grid", "$.GridBagConstraints", "JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.grid = null;
this.nElements = 0;
this.last = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JPanel", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (manager) {
Clazz_superConstructor (this, javajs.swing.JPanel, ["JP"]);
this.grid =  new javajs.swing.Grid (10, 10);
}, "javajs.awt.LayoutManager");
$_M(c$, "add", 
function (btn, c) {
this.last = (++this.nElements == 1 ? btn : null);
if (Clazz_instanceOf (c, String)) {
if (c.equals ("North")) c =  new javajs.swing.GridBagConstraints (0, 0, 3, 1, 0, 0, 10, 0, null, 0, 0);
 else if (c.equals ("South")) c =  new javajs.swing.GridBagConstraints (0, 2, 3, 1, 0, 0, 10, 0, null, 0, 0);
 else if (c.equals ("East")) c =  new javajs.swing.GridBagConstraints (2, 1, 1, 1, 0, 0, 13, 0, null, 0, 0);
 else if (c.equals ("West")) c =  new javajs.swing.GridBagConstraints (0, 1, 1, 1, 0, 0, 17, 0, null, 0, 0);
 else c =  new javajs.swing.GridBagConstraints (1, 1, 1, 1, 0, 0, 10, 0, null, 0, 0);
}this.grid.add (btn, c);
}, "javajs.swing.JComponent,~O");
$_V(c$, "toHTML", 
function () {
if (this.last != null) {
this.grid =  new javajs.swing.Grid (1, 1);
this.grid.add (this.last,  new javajs.swing.GridBagConstraints (0, 0, 1, 1, 0, 0, 10, 0, null, 0, 0));
this.last = null;
}var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JPanel' style='" + this.getCSSstyle (100) + "'>\n");
sb.append ("\n<span id='" + this.id + "_minimizer' style='width:" + this.minWidth + "px;height:" + this.minHeight + "px;'>");
sb.append (this.grid.toHTML (this.id));
sb.append ("</span>");
sb.append ("\n</div>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (null, "javajs.swing.Grid", ["javajs.swing.Cell", "JU.AU", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nrows = 0;
this.ncols = 0;
this.grid = null;
this.renderer = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "Grid");
Clazz_makeConstructor (c$, 
function (rows, cols) {
this.grid =  Clazz_newArray (0, 0, null);
}, "~N,~N");
$_M(c$, "add", 
function (btn, c) {
if (c.gridx >= this.ncols) {
this.ncols = c.gridx + 1;
for (var i = 0; i < this.nrows; i++) {
this.grid[i] = JU.AU.ensureLength (this.grid[i], this.ncols * 2);
}
}if (c.gridy >= this.nrows) {
var g =  new Array (c.gridy * 2 + 1);
for (var i = 0; i < this.nrows; i++) g[i] = this.grid[i];

for (var i = g.length; --i >= this.nrows; ) g[i] =  new Array (this.ncols * 2 + 1);

this.grid = g;
this.nrows = c.gridy + 1;
}this.grid[c.gridy][c.gridx] =  new javajs.swing.Cell (btn, c);
}, "javajs.swing.JComponent,javajs.swing.GridBagConstraints");
$_M(c$, "toHTML", 
function (id) {
var sb =  new JU.SB ();
id += "_grid";
sb.append ("\n<table id='" + id + "' class='Grid' style='width:100%;height:100%'><tr><td style='height:20%;width:20%'></td></tr>");
for (var i = 0; i < this.nrows; i++) {
var rowid = id + "_" + i;
sb.append ("\n<tr id='" + rowid + "'><td></td>");
for (var j = 0; j < this.ncols; j++) if (this.grid[i][j] != null) sb.append (this.grid[i][j].toHTML (rowid + "_" + j));

sb.append ("</tr>");
}
sb.append ("\n<tr><td style='height:20%;width:20%'></td></tr></table>\n");
return sb.toString ();
}, "~S");
});
Clazz_declarePackage ("javajs.swing");
c$ = Clazz_decorateAsClass (function () {
this.component = null;
this.colspan = 0;
this.rowspan = 0;
this.textAlign = 0;
this.c = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "Cell");
Clazz_makeConstructor (c$, 
function (btn, c) {
this.component = btn;
this.colspan = c.gridwidth;
this.rowspan = c.gridheight;
this.c = c;
}, "javajs.swing.JComponent,javajs.swing.GridBagConstraints");
$_M(c$, "toHTML", 
function (id) {
var style = this.c.getStyle (false);
return "<td id='" + id + "' " + (this.colspan < 2 ? "" : "colspan='" + this.colspan + "' ") + style + "><span " + this.c.getStyle (true) + ">" + this.component.toHTML () + "</span></td>";
}, "~S");
Clazz_declarePackage ("javajs.swing");
Clazz_load (null, "javajs.swing.GridBagConstraints", ["javajs.swing.Insets"], function () {
c$ = Clazz_decorateAsClass (function () {
this.gridx = 0;
this.gridy = 0;
this.gridwidth = 0;
this.gridheight = 0;
this.weightx = 0;
this.weighty = 0;
this.anchor = 0;
this.fill = 0;
this.insets = null;
this.ipadx = 0;
this.ipady = 0;
Clazz_instantialize (this, arguments);
}, javajs.swing, "GridBagConstraints");
Clazz_makeConstructor (c$, 
function (gridx, gridy, gridwidth, gridheight, weightx, weighty, anchor, fill, insets, ipadx, ipady) {
this.gridx = gridx;
this.gridy = gridy;
this.gridwidth = gridwidth;
this.gridheight = gridheight;
this.weightx = weightx;
this.weighty = weighty;
this.anchor = anchor;
this.fill = fill;
if (insets == null) insets =  new javajs.swing.Insets (0, 0, 0, 0);
this.insets = insets;
this.ipadx = ipadx;
this.ipady = ipady;
}, "~N,~N,~N,~N,~N,~N,~N,~N,javajs.swing.Insets,~N,~N");
$_M(c$, "getStyle", 
function (margins) {
return "style='" + (margins ? "margin:" + this.insets.top + "px " + (this.ipady + this.insets.right) + "px " + this.insets.bottom + "px " + (this.ipadx + this.insets.left) + "px;" : "text-align:" + (this.anchor == 13 ? "right" : this.anchor == 17 ? "left" : "center")) + "'";
}, "~B");
Clazz_defineStatics (c$,
"NONE", 0,
"CENTER", 10,
"WEST", 17,
"EAST", 13);
});
Clazz_declarePackage ("javajs.swing");
c$ = Clazz_decorateAsClass (function () {
this.top = 0;
this.left = 0;
this.bottom = 0;
this.right = 0;
Clazz_instantialize (this, arguments);
}, javajs.swing, "Insets");
Clazz_makeConstructor (c$, 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.bottom = bottom;
this.right = right;
}, "~N,~N,~N,~N");
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JContainer"], "javajs.swing.JScrollPane", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JScrollPane", javajs.swing.JContainer);
Clazz_makeConstructor (c$, 
function (component) {
Clazz_superConstructor (this, javajs.swing.JScrollPane, ["JScP"]);
this.add (component);
}, "javajs.swing.JComponent");
$_V(c$, "toHTML", 
function () {
var c = this.list.get (0);
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JScrollPane' style='" + this.getCSSstyle (98) + "overflow:auto'>\n");
sb.append (c.toHTML ());
sb.append ("\n</div>\n");
return sb.toString ();
});
$_V(c$, "setMinimumSize", 
function (dimension) {
}, "javajs.awt.Dimension");
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.ColumnSelectionModel", "$.JComponent", "$.ListSelectionModel"], "javajs.swing.JTable", ["JU.BS", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.tableModel = null;
this.bsSelectedCells = null;
this.bsSelectedRows = null;
this.rowSelectionAllowed = false;
this.cellSelectionEnabled = false;
this.selectionListener = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JTable", javajs.swing.JComponent, [javajs.swing.ListSelectionModel, javajs.swing.ColumnSelectionModel]);
Clazz_makeConstructor (c$, 
function (tableModel) {
Clazz_superConstructor (this, javajs.swing.JTable, ["JT"]);
this.tableModel = tableModel;
this.bsSelectedCells =  new JU.BS ();
this.bsSelectedRows =  new JU.BS ();
}, "javajs.swing.AbstractTableModel");
$_V(c$, "getSelectionModel", 
function () {
return this;
});
$_M(c$, "getColumnModel", 
function () {
return this;
});
$_M(c$, "setPreferredScrollableViewportSize", 
function (dimension) {
this.width = dimension.width;
this.height = dimension.height;
}, "javajs.awt.Dimension");
$_M(c$, "clearSelection", 
function () {
this.bsSelectedCells.clearAll ();
this.bsSelectedRows.clearAll ();
});
$_M(c$, "setRowSelectionAllowed", 
function (b) {
this.rowSelectionAllowed = b;
}, "~B");
$_M(c$, "setRowSelectionInterval", 
function (i, j) {
this.bsSelectedRows.clearAll ();
this.bsSelectedRows.setBits (i, j);
this.bsSelectedCells.clearAll ();
}, "~N,~N");
$_M(c$, "setCellSelectionEnabled", 
function (enabled) {
this.cellSelectionEnabled = enabled;
}, "~B");
$_V(c$, "addListSelectionListener", 
function (listener) {
this.selectionListener = listener;
}, "~O");
$_V(c$, "getColumn", 
function (i) {
return this.tableModel.getColumn (i);
}, "~N");
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<table id='" + this.id + "_table' class='JTable' >");
this.tableModel.toHTML (sb, this.id, this.bsSelectedRows);
sb.append ("\n</table>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_declareInterface (javajs.swing, "ColumnSelectionModel");
Clazz_declarePackage ("javajs.swing");
Clazz_declareInterface (javajs.swing, "ListSelectionModel");
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["javajs.swing.AbstractTableModel"], "JSV.js2d.DialogTableModel", ["javajs.api.GenericColor", "JU.CU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.columnNames = null;
this.data = null;
this.asString = false;
this.widths = null;
this.thisCol = 0;
this.tableCellAlignLeft = false;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "DialogTableModel", null, javajs.swing.AbstractTableModel);
Clazz_makeConstructor (c$, 
function (columnNames, data, asString, tableCellAlignLeft) {
this.columnNames = columnNames;
this.data = data;
this.asString = asString;
this.widths = (data.length == 0 ?  Clazz_newIntArray (0, 0) :  Clazz_newIntArray (data[0].length, 0));
this.tableCellAlignLeft = tableCellAlignLeft;
}, "~A,~A,~B,~B");
$_M(c$, "getColumnCount", 
function () {
return this.columnNames.length;
});
$_M(c$, "getRowCount", 
function () {
return this.data.length;
});
$_M(c$, "getColumnName", 
function (col) {
return this.columnNames[col];
}, "~N");
$_M(c$, "getValueAt", 
function (row, col) {
var o = this.data[row][col];
return (this.asString ? " " + o + " " : o);
}, "~N,~N");
$_V(c$, "getColumn", 
function (i) {
this.thisCol = i;
return this;
}, "~N");
$_V(c$, "setPreferredWidth", 
function (n) {
this.widths[this.thisCol] = n;
}, "~N");
$_V(c$, "toHTML", 
function (sb, id, selectedRows) {
if (this.data == null || this.data[0] == null || this.data[0].length == 0) return;
var nrows = this.data.length;
var ncols = this.data[0].length;
for (var i = -1; i < nrows; i++) {
var rowid = id + "_" + i;
sb.append ("\n<tr id='" + rowid + "' class='JTable_" + (i == -1 ? "header" : "row") + "' style='height:25px'>");
for (var j = 0; j < ncols; j++) {
if (i == -1) this.getCellHtml (sb, id + "_h" + j, i, j, this.columnNames[j], false);
 else this.getCellHtml (sb, rowid + "_" + j, i, j, this.data[i][j], selectedRows.get (i));
}
sb.append ("</tr>");
}
}, "JU.SB,~S,JU.BS");
$_M(c$, "getCellHtml", 
function (sb, id, iRow, iCol, o, isSelected) {
var style = this.getCellStyle (id, iRow, iCol, o, isSelected);
sb.append ("<td id='" + id + "'" + style + " onclick=SwingController.click(this)>" + o + "</td>");
}, "JU.SB,~S,~N,~N,~O,~B");
$_M(c$, "getCellStyle", 
function (id, iRow, iCol, o, isSelected) {
var style = "padding:1px 1px 1px 1px";
if (iRow < 0) {
style += ";font-weight:bold";
} else {
if (Clazz_instanceOf (o, javajs.api.GenericColor)) {
style += ";background-color:" + JU.CU.toCSSString (o);
} else {
if (this.asString) o = " " + o + " ";
style += ";text-align:";
if (this.tableCellAlignLeft) style += "left";
 else if (iCol == 0) style += "center";
 else style += "right";
style += ";border:" + (isSelected ? 3 : 1) + "px solid #000";
}}return " style='" + style + "'";
}, "~S,~N,~N,~O,~B");
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.TableColumn"], "javajs.swing.AbstractTableModel", null, function () {
Clazz_declareInterface (javajs.swing, "AbstractTableModel", javajs.swing.TableColumn);
});
Clazz_declarePackage ("javajs.swing");
Clazz_declareInterface (javajs.swing, "TableColumn");
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["javajs.swing.JDialog", "JSV.api.PlatformDialog", "javajs.swing.Insets"], "JSV.js2d.JsDialog", ["java.util.Hashtable", "javajs.awt.Color", "$.Dimension", "javajs.swing.FlowLayout", "$.GridBagConstraints", "$.GridBagLayout", "$.JButton", "$.JCheckBox", "$.JComboBox", "$.JLabel", "$.JPanel", "$.JScrollPane", "$.JSplitPane", "$.JTable", "$.JTextField", "JSV.common.Annotation", "JSV.js2d.DialogTableModel"], function () {
c$ = Clazz_decorateAsClass (function () {
this.optionKey = null;
this.registryKey = null;
this.options = null;
this.manager = null;
this.type = null;
this.leftPanel = null;
this.mainSplitPane = null;
this.rightPanel = null;
this.thisPanel = null;
this.dataTable = null;
this.iRow = 0;
this.haveColors = false;
this.tableCellAlignLeft = false;
this.haveTwoPanels = true;
this.buttonInsets = null;
this.panelInsets = null;
this.$defaultHeight = 350;
this.selectedRow = -1;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsDialog", javajs.swing.JDialog, JSV.api.PlatformDialog);
Clazz_prepareFields (c$, function () {
this.buttonInsets =  new javajs.swing.Insets (5, 5, 5, 5);
this.panelInsets =  new javajs.swing.Insets (0, 0, 2, 2);
});
Clazz_makeConstructor (c$, 
function (manager, jsvDialog, registryKey) {
Clazz_superConstructor (this, JSV.js2d.JsDialog);
this.manager = manager;
this.registryKey = registryKey;
this.optionKey = jsvDialog.optionKey;
this.type = jsvDialog.getAType ();
this.options = jsvDialog.options;
if (this.options == null) this.options =  new java.util.Hashtable ();
this.getContentPane ().setBackground (javajs.awt.Color.get3 (230, 230, 230));
this.setFront ();
}, "JSV.dialog.DialogManager,JSV.dialog.JSVDialog,~S");
$_M(c$, "onFocus", 
function () {
this.setFront ();
});
$_M(c$, "setFront", 
function () {
{
if (this.zIndex != Jmol._z.dialog)
this.zIndex = ++Jmol._z.dialog;
if (this.container)
this.container.style.zIndex = this.zIndex;
}});
$_V(c$, "addButton", 
function (name, text) {
var btn =  new javajs.swing.JButton ();
btn.setPreferredSize ( new javajs.awt.Dimension (120, 25));
btn.setText (text);
btn.setName (this.registryKey + "/" + name);
btn.addActionListener (this.manager);
this.thisPanel.add (btn,  new javajs.swing.GridBagConstraints (0, this.iRow++, 3, 1, 0.0, 0.0, 10, 0, this.buttonInsets, 0, 0));
return btn;
}, "~S,~S");
$_V(c$, "addCheckBox", 
function (name, title, level, isSelected) {
if (name == null) {
this.iRow = 0;
this.thisPanel = this.rightPanel;
return null;
}var cb =  new javajs.swing.JCheckBox ();
cb.setSelected (isSelected);
cb.setText (title);
cb.setName (this.registryKey + "/" + name);
var insets =  new javajs.swing.Insets (0, 20 * level, 2, 2);
this.thisPanel.add (cb,  new javajs.swing.GridBagConstraints (0, this.iRow++, 1, 1, 0.0, 0.0, 17, 0, insets, 0, 0));
return cb;
}, "~S,~S,~N,~B");
$_M(c$, "addPanelLine", 
function (name, label, obj, units) {
this.thisPanel.add ( new javajs.swing.JLabel (label == null ? name : label),  new javajs.swing.GridBagConstraints (0, this.iRow, 1, 1, 0.0, 0.0, 13, 0, this.panelInsets, 0, 0));
if (units == null) {
this.thisPanel.add (obj,  new javajs.swing.GridBagConstraints (1, this.iRow, 2, 1, 0.0, 0.0, 17, 0, this.panelInsets, 0, 0));
} else {
this.thisPanel.add (obj,  new javajs.swing.GridBagConstraints (1, this.iRow, 1, 1, 0.0, 0.0, 10, 0, this.panelInsets, 0, 0));
this.thisPanel.add ( new javajs.swing.JLabel (units),  new javajs.swing.GridBagConstraints (2, this.iRow, 1, 1, 0.0, 0.0, 17, 0, this.panelInsets, 0, 0));
}this.iRow++;
}, "~S,~S,javajs.swing.JComponent,~S");
$_V(c$, "addSelectOption", 
function (name, label, info, iPt, visible) {
var combo =  new javajs.swing.JComboBox (info);
combo.setSelectedIndex (iPt);
combo.setName (this.registryKey + "/" + name);
if (visible) {
combo.addActionListener (this.manager);
this.addPanelLine (name, label, combo, null);
}return combo;
}, "~S,~S,~A,~N,~B");
$_V(c$, "addTextField", 
function (name, label, value, units, defaultValue, visible) {
var key = this.optionKey + "_" + name;
if (value == null) {
value = this.options.get (key);
if (value == null) this.options.put (key, (value = defaultValue));
}var obj =  new javajs.swing.JTextField (value);
obj.setName (this.registryKey + "/" + name);
if (visible) {
obj.setPreferredSize ( new javajs.awt.Dimension (45, 15));
obj.addActionListener (this.manager);
this.addPanelLine (name, label, obj, units);
}return obj;
}, "~S,~S,~S,~S,~S,~B");
$_V(c$, "createTable", 
function (data, header, widths) {
try {
var scrollPane =  new javajs.swing.JScrollPane (this.dataTable = this.getDataTable (data, header, widths, (this.leftPanel == null ? this.$defaultHeight : this.leftPanel.getHeight () - 50)));
if (this.mainSplitPane == null) {
this.getContentPane ().add (scrollPane);
} else {
this.mainSplitPane.setRightComponent (scrollPane);
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.validate ();
this.repaint ();
}, "~A,~A,~A");
$_V(c$, "endLayout", 
function () {
this.getContentPane ().removeAll ();
this.getContentPane ().add (this.mainSplitPane);
this.pack ();
});
$_M(c$, "getDataTable", 
function (data, columnNames, columnWidths, height) {
this.selectedRow = -1;
var tableModel =  new JSV.js2d.DialogTableModel (columnNames, data, !this.haveColors, this.tableCellAlignLeft);
var table =  new javajs.swing.JTable (tableModel);
var selector = table.getSelectionModel ();
selector.addListSelectionListener (this.manager);
this.manager.registerSelector (this.registryKey + "/ROW", selector);
selector = table.getColumnModel ().getSelectionModel ();
selector.addListSelectionListener (this.manager);
this.manager.registerSelector (this.registryKey + "/COLUMN", selector);
var n = 0;
for (var i = 0; i < columnNames.length; i++) {
table.getColumnModel ().getColumn (i).setPreferredWidth (columnWidths[i]);
n += columnWidths[i];
}
return table;
}, "~A,~A,~A,~N");
$_V(c$, "getSelectedIndex", 
function (c) {
return (c).getSelectedIndex ();
}, "~O");
$_V(c$, "getSelectedItem", 
function (combo) {
return (combo).getSelectedItem ();
}, "~O");
$_M(c$, "getText", 
function (o) {
return (o).getText ();
}, "~O");
$_V(c$, "isSelected", 
function (chkbox) {
return (chkbox).isSelected ();
}, "~O");
$_V(c$, "selectTableRow", 
function (i) {
this.selectedRow = i;
this.dataTable.clearSelection ();
if (this.selectedRow >= 0) {
this.dataTable.setRowSelectionAllowed (true);
this.dataTable.setRowSelectionInterval (this.selectedRow, this.selectedRow + 1);
this.repaint ();
}}, "~N");
$_V(c$, "setCellSelectionEnabled", 
function (enabled) {
this.dataTable.setCellSelectionEnabled (enabled);
}, "~B");
$_M(c$, "setEnabled", 
function (btn, b) {
(btn).setEnabled (b);
}, "~O,~B");
$_V(c$, "setIntLocation", 
function (loc) {
var d =  new javajs.awt.Dimension (0, 0);
{
SwingController.getScreenDimensions(d);
}loc[0] = Math.min (d.width - 50, loc[0]);
loc[1] = Math.min (d.height - 50, loc[1]);
this.setLocation (loc);
}, "~A");
$_M(c$, "setPreferredSize", 
function (width, height) {
this.setPreferredSize ( new javajs.awt.Dimension (width, height));
}, "~N,~N");
$_V(c$, "setSelected", 
function (chkbox, b) {
(chkbox).setSelected (b);
}, "~O,~B");
$_V(c$, "setSelectedIndex", 
function (combo, i) {
(combo).setSelectedIndex (i);
}, "~O,~N");
$_M(c$, "setText", 
function (o, text) {
(o).setText (text);
}, "~O,~S");
$_V(c$, "startLayout", 
function () {
this.setPreferredSize ( new javajs.awt.Dimension (600, 370));
this.getContentPane ().removeAll ();
this.thisPanel = this.rightPanel =  new javajs.swing.JPanel ( new javajs.swing.FlowLayout ());
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
case JSV.common.Annotation.AType.Measurements:
case JSV.common.Annotation.AType.PeakList:
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.OverlayLegend:
this.tableCellAlignLeft = true;
this.haveColors = true;
this.haveTwoPanels = false;
break;
case JSV.common.Annotation.AType.Views:
this.rightPanel =  new javajs.swing.JPanel ( new javajs.swing.GridBagLayout ());
}
if (this.haveTwoPanels) {
this.thisPanel = this.leftPanel =  new javajs.swing.JPanel ( new javajs.swing.GridBagLayout ());
this.leftPanel.setMinimumSize ( new javajs.awt.Dimension (200, 300));
this.mainSplitPane =  new javajs.swing.JSplitPane (1);
this.mainSplitPane.setLeftComponent (this.leftPanel);
this.mainSplitPane.setRightComponent ( new javajs.swing.JScrollPane (this.rightPanel));
}});
$_M(c$, "getColumnCentering", 
function (column) {
return this.tableCellAlignLeft ? 2 : column == 0 ? 0 : 4;
}, "~N");
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "PlatformDialog");
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.awt.LayoutManager"], "javajs.swing.FlowLayout", null, function () {
c$ = Clazz_declareType (javajs.swing, "FlowLayout", javajs.awt.LayoutManager);
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.awt.LayoutManager"], "javajs.swing.GridBagLayout", null, function () {
c$ = Clazz_declareType (javajs.swing, "GridBagLayout", javajs.awt.LayoutManager);
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JButton", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JButton", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, javajs.swing.JButton, ["btnJB"]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<input type=button id='" + this.id + "' class='JButton' style='" + this.getCSSstyle (0) + "' onclick='SwingController.click(this)' value='" + this.text + "'/>");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JCheckBox", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.selected = false;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JCheckBox", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, javajs.swing.JCheckBox, ["chkJCB"]);
});
$_M(c$, "setSelected", 
function (selected) {
this.selected = selected;
{
SwingController.setSelected(this);
}}, "~B");
$_M(c$, "isSelected", 
function () {
return this.selected;
});
$_V(c$, "toHTML", 
function () {
var s = "<input type=checkbox id='" + this.id + "' class='JCheckBox' style='" + this.getCSSstyle (0) + "' " + (this.selected ? "checked='checked' " : "") + "onclick='SwingController.click(this)'>" + "<label for='" + this.id + "'>" + this.text + "</label>";
return s;
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JComboBox", ["JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.info = null;
this.selectedIndex = 0;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JComboBox", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (info) {
Clazz_superConstructor (this, javajs.swing.JComboBox, ["cmbJCB"]);
this.info = info;
}, "~A");
$_M(c$, "setSelectedIndex", 
function (i) {
this.selectedIndex = i;
{
SwingController.setSelectedIndex(this);
}}, "~N");
$_M(c$, "getSelectedIndex", 
function () {
return this.selectedIndex;
});
$_M(c$, "getSelectedItem", 
function () {
return (this.selectedIndex < 0 ? null : this.info[this.selectedIndex]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<select id='" + this.id + "' class='JComboBox' onchange='SwingController.click(this)'>\n");
for (var i = 0; i < this.info.length; i++) sb.append ("\n<option class='JComboBox_option'" + (i == this.selectedIndex ? "selected" : "") + ">" + this.info[i] + "</option>");

sb.append ("\n</select>\n");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JLabel", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JLabel", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (text) {
Clazz_superConstructor (this, javajs.swing.JLabel, ["lblJL"]);
this.text = text;
}, "~S");
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<span id='" + this.id + "' class='JLabel' style='" + this.getCSSstyle (0) + "'>");
sb.append (this.text);
sb.append ("</span>");
return sb.toString ();
});
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JSplitPane", ["javajs.swing.JContainer", "JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isH = true;
this.split = 1;
this.right = null;
this.left = null;
Clazz_instantialize (this, arguments);
}, javajs.swing, "JSplitPane", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (split) {
Clazz_superConstructor (this, javajs.swing.JSplitPane, ["JSpP"]);
this.split = split;
this.isH = (split == 1);
}, "~N");
$_M(c$, "setRightComponent", 
function (r) {
this.right =  new javajs.swing.JContainer (null);
this.right.add (r);
}, "javajs.swing.JComponent");
$_M(c$, "setLeftComponent", 
function (l) {
this.left =  new javajs.swing.JContainer (null);
this.left.add (l);
}, "javajs.swing.JComponent");
$_V(c$, "getSubcomponentWidth", 
function () {
var w = this.width;
if (w == 0) {
var wleft = this.left.getSubcomponentWidth ();
var wright = this.right.getSubcomponentWidth ();
if (wleft > 0 && wright > 0) {
if (this.isH) w = wleft + wright;
 else w = Math.max (wleft, wright);
}}return w;
});
$_V(c$, "getSubcomponentHeight", 
function () {
var h = this.height;
if (h == 0) {
var hleft = this.left.getSubcomponentHeight ();
var hright = this.right.getSubcomponentHeight ();
if (hleft > 0 && hright > 0) {
if (this.isH) h = Math.max (hleft, hright);
 else h = hleft + hright;
}}return h;
});
$_M(c$, "toHTML", 
function () {
if (this.left == null || this.right == null) return "";
var isH = (this.split == 1);
if (this.width == 0) this.width = this.getSubcomponentWidth ();
if (this.height == 0) this.height = this.getSubcomponentHeight ();
var sb =  new JU.SB ();
sb.append ("<div id='" + this.id + "' class='JSplitPane' style='" + this.getCSSstyle (100) + "'>");
if (isH) sb.append ("<div id='" + this.id + "_left' style='width:50%;height:100%;position:absolute;top:0%;left:0%'>");
 else sb.append ("<div id='" + this.id + "_top' style='width:100%;height:50%;position:absolute;top:0%;left:0%'>");
sb.append (this.left.list.get (0).toHTML ());
if (isH) sb.append ("</div><div id='" + this.id + "_right' style='width:50%;height:100%;position:absolute;top:0%;left:50%'>");
 else sb.append ("</div><div id='" + this.id + "_bottom' style='width:100%;height:50%;position:absolute;top:50%;left:0%'>");
sb.append (this.right.list.get (0).toHTML ());
sb.append ("</div></div>\n");
return sb.toString ();
});
Clazz_defineStatics (c$,
"HORIZONTAL_SPLIT", 1);
});
Clazz_declarePackage ("javajs.swing");
Clazz_load (["javajs.swing.JComponent"], "javajs.swing.JTextField", ["JU.SB"], function () {
c$ = Clazz_declareType (javajs.swing, "JTextField", javajs.swing.JComponent);
Clazz_makeConstructor (c$, 
function (value) {
Clazz_superConstructor (this, javajs.swing.JTextField, ["txtJT"]);
this.text = value;
}, "~S");
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<input type=text id='" + this.id + "' class='JTextField' style='" + this.getCSSstyle (0) + "' value='" + this.text + "' onkeyup	=SwingController.click(this,event)	>");
return sb.toString ();
});
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
