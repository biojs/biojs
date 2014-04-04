Clazz.declarePackage ("JSV.tree");
Clazz.load (["JSV.api.JSVTree"], "JSV.tree.SimpleTree", ["JSV.common.JSVFileManager", "$.PanelNode", "JSV.tree.SimpleTreeModel", "$.SimpleTreeNode", "$.SimpleTreePath"], function () {
c$ = Clazz.decorateAsClass (function () {
this.si = null;
this.rootNode = null;
this.spectraTreeModel = null;
this.viewer = null;
this.selectedPath = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTree", null, JSV.api.JSVTree);
$_V(c$, "getRootNode", 
function () {
return this.rootNode;
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
this.rootNode =  new JSV.tree.SimpleTreeNode ("Spectra", null);
this.spectraTreeModel =  new JSV.tree.SimpleTreeModel (this.rootNode);
}, "JSV.common.JSViewer");
$_M(c$, "valueChanged", 
function () {
this.viewer.selectedTreeNode (this.getLastSelectedPathComponent ());
});
$_M(c$, "getLastSelectedPathComponent", 
($fz = function () {
return (this.selectedPath == null ? null : this.selectedPath.getLastPathComponent ());
}, $fz.isPrivate = true, $fz));
$_V(c$, "setSelectedPanel", 
function (si, jsvp) {
if (jsvp != null) {
var treeNode = JSV.common.PanelNode.findNode (jsvp, this.viewer.panelNodes).treeNode;
this.setSelectionPath (this.viewer.spectraTree.newTreePath (treeNode.getPath ()));
}}, "JSV.api.ScriptInterface,JSV.api.JSVPanel");
$_M(c$, "setSelectionPath", 
($fz = function (newTreePath) {
this.selectedPath = newTreePath;
this.valueChanged ();
}, $fz.isPrivate = true, $fz), "JSV.api.JSVTreePath");
$_V(c$, "createTree", 
function (si, source, panels) {
var tree = this.viewer.spectraTree;
var rootNode = tree.getRootNode ();
var panelNodes = this.viewer.panelNodes;
var fileName = JSV.common.JSVFileManager.getName (source.getFilePath ());
var panelNode =  new JSV.common.PanelNode (null, fileName, source, null);
var fileNode =  new JSV.tree.SimpleTreeNode (fileName, panelNode);
panelNode.setTreeNode (fileNode);
tree.spectraTreeModel.insertNodeInto (fileNode, rootNode, rootNode.getChildCount ());
var fileCount = si.siGetFileCount () + 1;
si.siSetFileCount (fileCount);
for (var i = 0; i < panels.length; i++) {
var jsvp = panels[i];
var id = fileCount + "." + (i + 1);
panelNode = si.siGetNewPanelNode (id, fileName, source, jsvp);
var treeNode =  new JSV.tree.SimpleTreeNode (panelNode.toString (), panelNode);
panelNode.setTreeNode (treeNode);
panelNodes.addLast (panelNode);
tree.spectraTreeModel.insertNodeInto (treeNode, fileNode, fileNode.getChildCount ());
}
this.viewer.selectFrameNode (panels[0]);
return fileNode;
}, "JSV.api.ScriptInterface,JSV.source.JDXSource,~A");
$_V(c$, "setPath", 
function (path) {
this.setSelectionPath (path);
}, "JSV.api.JSVTreePath");
$_M(c$, "newTreePath", 
function (path) {
return  new JSV.tree.SimpleTreePath (path);
}, "~A");
$_V(c$, "deleteNodes", 
function (toDelete) {
for (var i = 0; i < toDelete.size (); i++) {
this.spectraTreeModel.removeNodeFromParent (toDelete.get (i));
}
}, "JU.List");
});
