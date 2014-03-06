Clazz.declarePackage ("JU");
Clazz.load (null, "JU.A4", ["JU.T3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
this.angle = 0;
Clazz.instantialize (this, arguments);
}, JU, "A4", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
this.z = 1.0;
});
c$.new4 = $_M(c$, "new4", 
function (x, y, z, angle) {
var a =  new JU.A4 ();
a.set4 (x, y, z, angle);
return a;
}, "~N,~N,~N,~N");
c$.newAA = $_M(c$, "newAA", 
function (a1) {
var a =  new JU.A4 ();
a.set4 (a1.x, a1.y, a1.z, a1.angle);
return a;
}, "JU.A4");
c$.newVA = $_M(c$, "newVA", 
function (axis, angle) {
var a =  new JU.A4 ();
a.setVA (axis, angle);
return a;
}, "JU.V3,~N");
$_M(c$, "setVA", 
function (axis, angle) {
this.x = axis.x;
this.y = axis.y;
this.z = axis.z;
this.angle = angle;
}, "JU.V3,~N");
$_M(c$, "set4", 
function (x, y, z, angle) {
this.x = x;
this.y = y;
this.z = z;
this.angle = angle;
}, "~N,~N,~N,~N");
$_M(c$, "setAA", 
function (a) {
this.x = a.x;
this.y = a.y;
this.z = a.z;
this.angle = a.angle;
}, "JU.A4");
$_M(c$, "setM", 
function (m1) {
this.setFromMat (m1.m00, m1.m01, m1.m02, m1.m10, m1.m11, m1.m12, m1.m20, m1.m21, m1.m22);
}, "JU.M3");
$_M(c$, "setFromMat", 
($fz = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
var cos = (m00 + m11 + m22 - 1.0) * 0.5;
this.x = (m21 - m12);
this.y = (m02 - m20);
this.z = (m10 - m01);
var sin = 0.5 * Math.sqrt (this.x * this.x + this.y * this.y + this.z * this.z);
this.angle = Math.atan2 (sin, cos);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.angle + ")";
});
$_V(c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, JU.A4))) return false;
var a1 = o;
return this.x == a1.x && this.y == a1.y && this.z == a1.z && this.angle == a1.angle;
}, "~O");
$_V(c$, "hashCode", 
function () {
return JU.T3.floatToIntBits0 (this.x) ^ JU.T3.floatToIntBits0 (this.y) ^ JU.T3.floatToIntBits0 (this.z) ^ JU.T3.floatToIntBits0 (this.angle);
});
});
