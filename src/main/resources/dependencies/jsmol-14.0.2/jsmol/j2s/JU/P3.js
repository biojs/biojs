Clazz.declarePackage ("JU");
Clazz.load (["JU.T3"], "JU.P3", null, function () {
c$ = Clazz.declareType (JU, "P3", JU.T3);
c$.newP = $_M(c$, "newP", 
function (t) {
var p =  new JU.P3 ();
p.x = t.x;
p.y = t.y;
p.z = t.z;
return p;
}, "JU.T3");
c$.new3 = $_M(c$, "new3", 
function (x, y, z) {
var p =  new JU.P3 ();
p.x = x;
p.y = y;
p.z = z;
return p;
}, "~N,~N,~N");
});
