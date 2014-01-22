Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.dialog.DialogManager"], "JSV.js2d.JsDialogManager", ["javajs.awt.BorderLayout", "$.Dimension", "javajs.swing.JDialog", "$.JEditorPane", "$.JPanel", "$.JScrollPane", "$.JTable", "JU.PT", "JSV.js2d.DialogTableModel", "$.JsDialog"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsDialogManager", JSV.dialog.DialogManager);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsDialogManager, []);
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
return  Clazz.newIntArray (2, 0);
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
