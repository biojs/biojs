Clazz.declarePackage ("JU");
Clazz.load (null, "JU.T3", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz.instantialize (this, arguments);
}, JU, "T3", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
$_M(c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
$_M(c$, "setA", 
function (t) {
this.x = t[0];
this.y = t[1];
this.z = t[2];
}, "~A");
$_M(c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3");
$_M(c$, "add2", 
function (t1, t2) {
this.x = t1.x + t2.x;
this.y = t1.y + t2.y;
this.z = t1.z + t2.z;
}, "JU.T3,JU.T3");
$_M(c$, "add", 
function (t1) {
this.x += t1.x;
this.y += t1.y;
this.z += t1.z;
}, "JU.T3");
$_M(c$, "distanceSquared", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.T3");
$_M(c$, "distance", 
function (p1) {
return Math.sqrt (this.distanceSquared (p1));
}, "JU.T3");
$_M(c$, "sub2", 
function (t1, t2) {
this.x = t1.x - t2.x;
this.y = t1.y - t2.y;
this.z = t1.z - t2.z;
}, "JU.T3,JU.T3");
$_M(c$, "sub", 
function (t1) {
this.x -= t1.x;
this.y -= t1.y;
this.z -= t1.z;
}, "JU.T3");
$_M(c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
}, "~N");
$_M(c$, "scaleAdd2", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3,JU.T3");
$_M(c$, "ave", 
function (a, b) {
this.x = (a.x + b.x) / 2;
this.y = (a.y + b.y) / 2;
this.z = (a.z + b.z) / 2;
}, "JU.T3,JU.T3");
$_M(c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "JU.T3");
$_M(c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
$_M(c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
$_M(c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
$_V(c$, "hashCode", 
function () {
var bits = 1;
bits = 31 * bits + JU.T3.floatToIntBits0 (this.x);
bits = 31 * bits + JU.T3.floatToIntBits0 (this.y);
bits = 31 * bits + JU.T3.floatToIntBits0 (this.z);
return (bits ^ (bits >> 32));
});
c$.floatToIntBits0 = $_M(c$, "floatToIntBits0", 
function (f) {
return (f == 0 ? 0 : Float.floatToIntBits (f));
}, "~N");
$_V(c$, "equals", 
function (t1) {
if (!(Clazz.instanceOf (t1, JU.T3))) return false;
var t2 = t1;
return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
}, "~O");
$_V(c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ")";
});
});
