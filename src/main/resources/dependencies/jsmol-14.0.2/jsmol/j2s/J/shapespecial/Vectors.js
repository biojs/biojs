Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.AtomShape"], "J.shapespecial.Vectors", null, function () {
c$ = Clazz.declareType (J.shapespecial, "Vectors", J.shape.AtomShape);
$_M(c$, "initModelSet", 
function () {
if (!(this.isActive = this.modelSet.modelSetHasVibrationVectors ())) return;
Clazz.superCall (this, J.shapespecial.Vectors, "initModelSet", []);
});
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (!this.isActive) return;
this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_V(c$, "getProperty", 
function (propertyName, param) {
if (propertyName === "mad") return Integer.$valueOf (this.mads == null || param < 0 || this.mads.length <= param ? 0 : this.mads[param]);
return null;
}, "~S,~N");
});
