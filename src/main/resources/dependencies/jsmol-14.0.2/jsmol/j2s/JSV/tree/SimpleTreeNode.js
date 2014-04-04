Clazz.declarePackage ("JSV.tree");
Clazz.load (["JSV.api.JSVTreeNode"], "JSV.tree.SimpleTreeNode", ["JU.List", "JSV.tree.SimpleTreeEnumeration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.panelNode = null;
this.index = 0;
this.prevNode = null;
this.$children = null;
this.text = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTreeNode", null, JSV.api.JSVTreeNode);
Clazz.makeConstructor (c$, 
function (text, panelNode) {
this.text = text;
this.panelNode = panelNode;
this.$children =  new JU.List ();
}, "~S,JSV.common.PanelNode");
$_V(c$, "getPanelNode", 
function () {
return this.panelNode;
});
$_V(c$, "getIndex", 
function () {
return this.index;
});
$_V(c$, "setIndex", 
function (index) {
this.index = index;
}, "~N");
$_V(c$, "children", 
function () {
return  new JSV.tree.SimpleTreeEnumeration (this);
});
$_V(c$, "getChildCount", 
function () {
return this.$children.size ();
});
$_V(c$, "getPath", 
function () {
var o =  new JU.List ();
var node = this;
o.addLast (node);
while ((node = node.prevNode) != null) o.add (0, node);

return o.toArray ();
});
$_V(c$, "isLeaf", 
function () {
return (this.prevNode != null && this.prevNode.prevNode != null);
});
$_V(c$, "toString", 
function () {
return this.text;
});
});
