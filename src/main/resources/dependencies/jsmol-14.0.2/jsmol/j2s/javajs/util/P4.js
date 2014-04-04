Clazz.declarePackage ("JU");
Clazz.load (["JU.T4"], "JU.P4", null, function () {
c$ = Clazz.declareType (JU, "P4", JU.T4);
c$.new4 = $_M(c$, "new4", 
function (x, y, z, w) {
var pt =  new JU.P4 ();
pt.set (x, y, z, w);
return pt;
}, "~N,~N,~N,~N");
c$.newPt = $_M(c$, "newPt", 
function (value) {
var pt =  new JU.P4 ();
pt.set (value.x, value.y, value.z, value.w);
return pt;
}, "JU.P4");
$_M(c$, "distance", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
var dw = this.w - p1.w;
return Math.sqrt (dx * dx + dy * dy + dz * dz + dw * dw);
}, "JU.P4");
});
