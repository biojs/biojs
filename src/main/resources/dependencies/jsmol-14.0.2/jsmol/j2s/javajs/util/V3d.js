Clazz.declarePackage ("JU");
Clazz.load (["JU.T3d"], "JU.V3d", null, function () {
c$ = Clazz.declareType (JU, "V3d", JU.T3d);
$_M(c$, "cross", 
function (v1, v2) {
this.set (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "JU.V3d,JU.V3d");
$_M(c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
$_M(c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "JU.V3d");
$_M(c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
$_M(c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
});
