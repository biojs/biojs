Clazz.declarePackage ("JSV.js2d");
Clazz.load (["javajs.swing.AbstractTableModel"], "JSV.js2d.DialogTableModel", ["javajs.api.GenericColor", "JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.columnNames = null;
this.data = null;
this.asString = false;
this.widths = null;
this.thisCol = 0;
this.tableCellAlignLeft = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "DialogTableModel", null, javajs.swing.AbstractTableModel);
Clazz.makeConstructor (c$, 
function (columnNames, data, asString, tableCellAlignLeft) {
this.columnNames = columnNames;
this.data = data;
this.asString = asString;
this.widths = (data.length == 0 ?  Clazz.newIntArray (0, 0) :  Clazz.newIntArray (data[0].length, 0));
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
($fz = function (sb, id, iRow, iCol, o, isSelected) {
var style = this.getCellStyle (id, iRow, iCol, o, isSelected);
sb.append ("<td id='" + id + "'" + style + " onclick=SwingController.click(this)>" + o + "</td>");
}, $fz.isPrivate = true, $fz), "JU.SB,~S,~N,~N,~O,~B");
$_M(c$, "getCellStyle", 
($fz = function (id, iRow, iCol, o, isSelected) {
var style = "padding:1px 1px 1px 1px";
if (iRow < 0) {
style += ";font-weight:bold";
} else {
if (Clazz.instanceOf (o, javajs.api.GenericColor)) {
style += ";background-color:" + JU.CU.toCSSString (o);
} else {
if (this.asString) o = " " + o + " ";
style += ";text-align:";
if (this.tableCellAlignLeft) style += "left";
 else if (iCol == 0) style += "center";
 else style += "right";
style += ";border:" + (isSelected ? 3 : 1) + "px solid #000";
}}return " style='" + style + "'";
}, $fz.isPrivate = true, $fz), "~S,~N,~N,~O,~B");
});
