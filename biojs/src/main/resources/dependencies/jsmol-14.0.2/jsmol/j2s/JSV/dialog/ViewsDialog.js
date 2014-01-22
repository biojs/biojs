Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.ViewsDialog", ["JU.List", "$.PT", "$.SB", "JSV.common.Annotation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeNodes = null;
this.checkBoxes = null;
this.closeSelectedButton = null;
this.combineSelectedButton = null;
this.viewSelectedButton = null;
this.checking = false;
Clazz.instantialize (this, arguments);
}, JSV.dialog, "ViewsDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.ViewsDialog, []);
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
($fz = function (rootNode, level, isViews) {
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
}, $fz.isPrivate = true, $fz), "JSV.api.JSVTreeNode,~N,~B");
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
Clazz.defineStatics (c$,
"posXY", [-2147483648, 0]);
});
