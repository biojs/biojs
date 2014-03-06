Clazz.declarePackage ("J.shapecgo");
Clazz.load (["J.shapespecial.Draw"], "J.shapecgo.CGO", ["JU.AU", "$.SB", "J.shapecgo.CGOMesh", "J.util.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cmeshes = null;
this.cgoMesh = null;
this.useColix = false;
Clazz.instantialize (this, arguments);
}, J.shapecgo, "CGO", J.shapespecial.Draw);
Clazz.prepareFields (c$, function () {
this.cmeshes =  new Array (4);
});
$_M(c$, "initCGO", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
$_V(c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = this.cmeshes = JU.AU.ensureLength (this.cmeshes, this.meshCount * 2);
this.currentMesh = this.thisMesh = this.cgoMesh = this.cmeshes[index] = (m == null ?  new J.shapecgo.CGOMesh (thisID, this.colix, index) : m);
this.currentMesh.color = this.color;
this.currentMesh.index = index;
this.currentMesh.useColix = this.useColix;
if (thisID != null && thisID !== "+PREVIOUS_MESH+" && this.htObjects != null) this.htObjects.put (thisID.toUpperCase (), this.currentMesh);
}, "~S,J.shape.Mesh");
$_V(c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.initCGO ();
this.setPropertySuper ("init", value, bs);
return;
}if ("setCGO" === propertyName) {
var list = value;
this.setProperty ("init", null, null);
var n = list.size () - 1;
this.setProperty ("thisID", list.get (n), null);
propertyName = "set";
this.setProperty ("set", value, null);
return;
}if ("set" === propertyName) {
if (this.cgoMesh == null) {
this.allocMesh (null, null);
this.cgoMesh.colix = this.colix;
this.cgoMesh.color = this.color;
this.cgoMesh.useColix = this.useColix;
}this.cgoMesh.isValid = this.setCGO (value);
if (this.cgoMesh.isValid) {
this.scale (this.cgoMesh, this.newScale);
this.cgoMesh.initialize (1073741964, null, null);
this.cgoMesh.title = this.title;
this.cgoMesh.visible = true;
}this.clean ();
return;
}this.setPropertySuper (propertyName, value, bs);
}, "~S,~O,JU.BS");
$_V(c$, "deleteMeshElement", 
function (i) {
if (this.meshes[i] === this.currentMesh) this.currentMesh = this.cgoMesh = null;
this.meshes = this.cmeshes = JU.AU.deleteElements (this.meshes, i, 1);
}, "~N");
$_V(c$, "setPropertySuper", 
function (propertyName, value, bs) {
this.currentMesh = this.cgoMesh;
this.setPropMC (propertyName, value, bs);
this.cgoMesh = this.currentMesh;
}, "~S,~O,JU.BS");
$_V(c$, "clean", 
function () {
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i] == null || this.cmeshes[i].cmds == null || this.cmeshes[i].cmds.size () == 0) this.deleteMeshI (i);

});
$_M(c$, "setCGO", 
($fz = function (data) {
if (this.cgoMesh == null) this.allocMesh (null, null);
this.cgoMesh.clear ("cgo");
return this.cgoMesh.set (data);
}, $fz.isPrivate = true, $fz), "JU.List");
$_V(c$, "scale", 
function (mesh, newScale) {
}, "J.shape.Mesh,~N");
$_V(c$, "getShapeState", 
function () {
var s =  new JU.SB ();
s.append ("\n");
J.shape.Shape.appendCmd (s, this.myType + " delete");
for (var i = 0; i < this.meshCount; i++) {
var mesh = this.cmeshes[i];
s.append (this.getCommand2 (mesh, mesh.modelIndex));
if (!mesh.visible) s.append (" " + this.myType + " ID " + J.util.Escape.eS (mesh.thisID) + " off;\n");
}
return s.toString ();
});
$_V(c$, "getCommand2", 
function (mesh, iModel) {
var cmesh = mesh;
var str =  new JU.SB ();
var modelCount = this.viewer.getModelCount ();
if (iModel >= 0 && modelCount > 1) J.shape.Shape.appendCmd (str, "frame " + this.viewer.getModelNumberDotted (iModel));
str.append ("  CGO ID ").append (J.util.Escape.eS (mesh.thisID));
if (iModel < 0) iModel = 0;
str.append (" [");
var n = cmesh.cmds.size ();
for (var i = 0; i < n; i++) str.append (" " + cmesh.cmds.get (i));

str.append (" ];\n");
J.shape.Shape.appendCmd (str, cmesh.getState ("cgo"));
if (cmesh.useColix) J.shape.Shape.appendCmd (str, J.shape.Shape.getColorCommandUnk ("cgo", cmesh.colix, this.translucentAllowed));
return str.toString ();
}, "J.shape.Mesh,~N");
});
