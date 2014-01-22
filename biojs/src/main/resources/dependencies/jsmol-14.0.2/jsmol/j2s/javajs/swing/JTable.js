Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.ColumnSelectionModel", "$.JComponent", "$.ListSelectionModel"], "javajs.swing.JTable", ["JU.BS", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tableModel = null;
this.bsSelectedCells = null;
this.bsSelectedRows = null;
this.rowSelectionAllowed = false;
this.cellSelectionEnabled = false;
this.selectionListener = null;
Clazz.instantialize (this, arguments);
}, javajs.swing, "JTable", javajs.swing.JComponent, [javajs.swing.ListSelectionModel, javajs.swing.ColumnSelectionModel]);
Clazz.makeConstructor (c$, 
function (tableModel) {
Clazz.superConstructor (this, javajs.swing.JTable, ["JT"]);
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
