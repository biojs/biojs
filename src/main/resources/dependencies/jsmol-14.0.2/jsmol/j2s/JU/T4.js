Clazz.declarePackage ("JU");
Clazz.load (null, "JU.T4", ["JU.T3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
this.w = 0;
Clazz.instantialize (this, arguments);
}, JU, "T4", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
$_M(c$, "set", 
function (x, y, z, w) {
this.x = x;
this.y = y;
this.z = z;
this.w = w;
}, "~N,~N,~N,~N");
$_M(c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
this.w *= s;
}, "~N");
$_V(c$, "hashCode", 
function () {
return JU.T3.floatToIntBits0 (this.x) ^ JU.T3.floatToIntBits0 (this.y) ^ JU.T3.floatToIntBits0 (this.z) ^ JU.T3.floatToIntBits0 (this.w);
});
$_V(c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.T4))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z && this.w == t.w);
}, "~O");
$_V(c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
});
});
