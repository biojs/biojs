Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVMainPanel", "$.JSVViewPanel"], "JSV.js2d.JsViewPanel", ["JSV.common.Annotation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectedPanel = null;
this.currentPanelIndex = 0;
this.title = null;
this.visible = false;
this.focusable = false;
this.enabled = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsViewPanel", null, [JSV.api.JSVViewPanel, JSV.api.JSVMainPanel]);
$_V(c$, "getCurrentPanelIndex", 
function () {
return this.currentPanelIndex;
});
$_V(c$, "dispose", 
function () {
});
$_V(c$, "getTitle", 
function () {
return this.title;
});
$_V(c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
$_V(c$, "setSelectedPanel", 
function (jsvp, panelNodes) {
if (jsvp !== this.selectedPanel) {
this.selectedPanel = jsvp;
}for (var i = panelNodes.size (); --i >= 0; ) {
var j = panelNodes.get (i).jsvp;
if (j === jsvp) {
this.currentPanelIndex = i;
} else {
j.setEnabled (false);
j.setFocusable (false);
j.getPanelData ().closeAllDialogsExcept (JSV.common.Annotation.AType.NONE);
}}
this.markSelectedPanels (panelNodes);
this.visible = (jsvp != null);
}, "JSV.api.JSVPanel,JU.List");
$_V(c$, "markSelectedPanels", 
function (panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) panelNodes.get (i).isSelected = (this.currentPanelIndex == i);

}, "JU.List");
$_M(c$, "getHeight", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getHeight ());
});
$_M(c$, "getWidth", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getWidth ());
});
$_V(c$, "isEnabled", 
function () {
return this.enabled;
});
$_V(c$, "isFocusable", 
function () {
return this.focusable;
});
$_V(c$, "isVisible", 
function () {
return this.visible;
});
$_M(c$, "setEnabled", 
function (b) {
this.enabled = b;
}, "~B");
$_M(c$, "setFocusable", 
function (b) {
this.focusable = b;
}, "~B");
});
