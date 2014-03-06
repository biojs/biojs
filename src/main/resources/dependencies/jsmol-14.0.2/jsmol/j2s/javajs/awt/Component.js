Clazz.declarePackage ("javajs.awt");
Clazz.load (null, "javajs.awt.Component", ["JU.CU"], function () {
c$ = Clazz.decorateAsClass (function () {
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
Clazz.instantialize (this, arguments);
}, javajs.awt, "Component");
Clazz.makeConstructor (c$, 
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
