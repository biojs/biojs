Clazz.declarePackage ("J.util");
Clazz.load (["JU.V3"], "J.util.Vibration", null, function () {
c$ = Clazz.declareType (J.util, "Vibration", JU.V3);
$_M(c$, "setTempPoint", 
function (pt, t456, scale, modulationScale) {
pt.scaleAdd2 ((Math.cos (t456.x * 6.283185307179586) * scale), this, pt);
}, "JU.T3,JU.T3,~N,~N");
$_M(c$, "getInfo", 
function (info) {
info.put ("vibVector", JU.V3.newV (this));
}, "java.util.Map");
Clazz.defineStatics (c$,
"twoPI", 6.283185307179586);
});
