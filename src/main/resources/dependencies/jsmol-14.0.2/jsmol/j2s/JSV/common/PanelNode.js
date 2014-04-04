Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.PanelNode", ["JU.SB", "JSV.common.Parameters"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeNode = null;
this.source = null;
this.fileName = null;
this.jsvp = null;
this.id = null;
this.legend = null;
this.isSelected = false;
this.isView = false;
this.frameTitle = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PanelNode");
Clazz.makeConstructor (c$, 
function (id, fileName, source, jsvp) {
this.id = id;
this.source = source;
this.fileName = fileName;
this.jsvp = jsvp;
if (jsvp != null) {
jsvp.getPanelData ().getSpectrumAt (0).setId (id);
this.frameTitle = jsvp.getTitle ();
}}, "~S,~S,JSV.source.JDXSource,JSV.api.JSVPanel");
$_M(c$, "setTreeNode", 
function (node) {
this.treeNode = node;
}, "JSV.api.JSVTreeNode");
$_M(c$, "getTreeNode", 
function () {
return this.treeNode;
});
$_M(c$, "dispose", 
function () {
this.source.dispose ();
if (this.jsvp != null) this.jsvp.dispose ();
this.source = null;
this.jsvp = null;
this.legend = null;
});
$_M(c$, "getSpectrum", 
function () {
return this.jsvp.getPanelData ().getSpectrum ();
});
$_M(c$, "setLegend", 
function (legend) {
if (this.legend != null) this.legend.dispose ();
this.legend = legend;
return legend;
}, "JSV.dialog.JSVDialog");
$_V(c$, "toString", 
function () {
return ((this.id == null ? "" : this.id + ": ") + (this.frameTitle == null ? this.fileName : this.frameTitle));
});
c$.findSourceByNameOrId = $_M(c$, "findSourceByNameOrId", 
function (id, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.id) || id.equalsIgnoreCase (node.source.getFilePath ())) return node.source;
}
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.fileName)) return node.source;
}
return null;
}, "~S,JU.List");
c$.findNodeById = $_M(c$, "findNodeById", 
function (id, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) if (id.equals (panelNodes.get (i).id)) return panelNodes.get (i);

return null;
}, "~S,JU.List");
c$.findNode = $_M(c$, "findNode", 
function (jsvp, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) if (panelNodes.get (i).jsvp === jsvp) return panelNodes.get (i);

return null;
}, "JSV.api.JSVPanel,JU.List");
c$.getSpectrumListAsString = $_M(c$, "getSpectrumListAsString", 
function (panelNodes) {
var sb =  new JU.SB ();
for (var i = 0; i < panelNodes.size (); i++) {
var id = panelNodes.get (i).id;
sb.append (" ").append (id);
}
return sb.toString ().trim ();
}, "JU.List");
c$.isOpen = $_M(c$, "isOpen", 
function (panelNodes, filePath) {
if (filePath != null) for (var i = panelNodes.size (); --i >= 0; ) {
if (filePath.equals (panelNodes.get (i).source.getFilePath ()) || filePath.equals (panelNodes.get (i).frameTitle)) return true;
}
return false;
}, "JU.List,~S");
$_M(c$, "setFrameTitle", 
function (name) {
this.frameTitle = name;
}, "~S");
c$.getLastFileFirstNode = $_M(c$, "getLastFileFirstNode", 
function (panelNodes) {
var n = panelNodes.size ();
var node = (n == 0 ? null : panelNodes.get (n - 1));
for (var i = n - 1; --i >= 0; ) {
if (panelNodes.get (i).source !== node.source) break;
node = panelNodes.get (i);
}
return (node == null ? null : node.jsvp);
}, "JU.List");
$_M(c$, "getInfo", 
function (key) {
var info = this.jsvp.getPanelData ().getInfo (false, key);
JSV.common.Parameters.putInfo (key, info, "panelId", this.id);
JSV.common.Parameters.putInfo (key, info, "panelFileName", this.fileName);
JSV.common.Parameters.putInfo (key, info, "panelSource", this.source.getFilePath ());
return info;
}, "~S");
});
