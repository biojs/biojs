Clazz.declarePackage ("JSV.tree");
c$ = Clazz.decorateAsClass (function () {
this.rootNode = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTreeModel");
Clazz.makeConstructor (c$, 
function (rootNode) {
this.rootNode = rootNode;
}, "JSV.api.JSVTreeNode");
$_M(c$, "insertNodeInto", 
function (fileNode, rootNode, i) {
var node = rootNode;
node.$children.add (i, fileNode);
(fileNode).prevNode = node;
}, "JSV.api.JSVTreeNode,JSV.api.JSVTreeNode,~N");
$_M(c$, "removeNodeFromParent", 
function (node) {
(node).prevNode.$children.removeObj (node);
}, "JSV.api.JSVTreeNode");
