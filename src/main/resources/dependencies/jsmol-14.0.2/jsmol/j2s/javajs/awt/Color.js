Clazz.declarePackage ("javajs.awt");
Clazz.load (["javajs.api.GenericColor"], "javajs.awt.Color", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.argb = 0;
Clazz.instantialize (this, arguments);
}, javajs.awt, "Color", null, javajs.api.GenericColor);
$_V(c$, "getRGB", 
function () {
return this.argb & 0x00FFFFFF;
});
$_V(c$, "getOpacity255", 
function () {
return ((this.argb >> 24) & 0xFF);
});
$_V(c$, "setOpacity255", 
function (a) {
this.argb = this.argb & 0xFFFFFF | ((a & 0xFF) << 24);
}, "~N");
c$.get1 = $_M(c$, "get1", 
function (rgb) {
var c =  new javajs.awt.Color ();
c.argb = rgb | 0xFF000000;
return c;
}, "~N");
c$.get3 = $_M(c$, "get3", 
function (r, g, b) {
return  new javajs.awt.Color ().set4 (r, g, b, 0xFF);
}, "~N,~N,~N");
c$.get4 = $_M(c$, "get4", 
function (r, g, b, a) {
return  new javajs.awt.Color ().set4 (r, g, b, a);
}, "~N,~N,~N,~N");
$_M(c$, "set4", 
($fz = function (r, g, b, a) {
this.argb = ((a << 24) | (r << 16) | (g << 8) | b) & 0xFFFFFFFF;
return this;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
});
