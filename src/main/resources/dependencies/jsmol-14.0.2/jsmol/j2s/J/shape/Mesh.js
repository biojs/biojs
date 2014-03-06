Clazz.declarePackage ("J.shape");
Clazz.load (["J.util.MeshSurface", "JU.P3", "$.V3"], "J.shape.Mesh", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.M3", "$.M4", "$.SB", "J.script.T", "J.util.BSUtil", "$.C", "$.Escape", "$.Measure", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.title = null;
this.meshColix = 0;
this.normixes = null;
this.lineData = null;
this.thisID = null;
this.isValid = true;
this.scriptCommand = null;
this.colorCommand = null;
this.lattice = null;
this.symops = null;
this.symopNormixes = null;
this.visible = true;
this.lighting = 1073741958;
this.colorType = 0;
this.haveXyPoints = false;
this.diameter = 0;
this.width = 0;
this.ptCenter = null;
this.linkedMesh = null;
this.vertexColorMap = null;
this.color = 0;
this.useColix = true;
this.unitCell = null;
this.scale3d = 0;
this.index = 0;
this.atomIndex = -1;
this.modelIndex = -1;
this.visibilityFlags = 0;
this.insideOut = false;
this.checkByteCount = 0;
this.showContourLines = false;
this.showPoints = false;
this.drawTriangles = false;
this.fillTriangles = true;
this.showTriangles = false;
this.frontOnly = false;
this.isTwoSided = true;
this.havePlanarContours = false;
this.bsTemp = null;
this.vAB = null;
this.vAC = null;
this.vTemp = null;
this.colorDensity = false;
this.cappingObject = null;
this.slabbingObject = null;
this.volumeRenderPointSize = 0.15;
this.connections = null;
this.recalcAltVertices = false;
this.symopColixes = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Mesh", J.util.MeshSurface);
Clazz.prepareFields (c$, function () {
this.ptCenter = JU.P3.new3 (0, 0, 0);
this.vAB =  new JU.V3 ();
this.vAC =  new JU.V3 ();
this.vTemp =  new JU.V3 ();
});
$_M(c$, "setVisibilityFlags", 
function (n) {
this.visibilityFlags = n;
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.shape.Mesh, []);
});
$_M(c$, "mesh1", 
function (thisID, colix, index) {
if ("+PREVIOUS_MESH+".equals (thisID)) thisID = null;
this.thisID = thisID;
this.colix = colix;
this.index = index;
return this;
}, "~S,~N,~N");
$_M(c$, "clear", 
function (meshType) {
this.clearMesh (meshType);
}, "~S");
$_M(c$, "clearMesh", 
function (meshType) {
this.altVertices = null;
this.bsDisplay = null;
this.bsSlabDisplay = null;
this.bsSlabGhost = null;
this.symops = null;
this.symopColixes = null;
this.bsTransPolygons = null;
this.cappingObject = null;
this.colix = 23;
this.colorDensity = false;
this.connections = null;
this.diameter = 0;
this.drawTriangles = false;
this.fillTriangles = true;
this.frontOnly = false;
this.havePlanarContours = false;
this.haveXyPoints = false;
this.isTriangleSet = false;
this.isTwoSided = false;
this.lattice = null;
this.mat4 = null;
this.normixes = null;
this.polygonIndexes = null;
this.polygonTranslucencies = null;
this.scale3d = 0;
this.showContourLines = false;
this.showPoints = false;
this.showTriangles = false;
this.slabbingObject = null;
this.slabOptions = null;
this.spanningVectors = null;
this.symopNormixes = null;
this.title = null;
this.unitCell = null;
this.useColix = true;
this.vertexCount0 = this.polygonCount0 = this.vertexCount = this.polygonCount = 0;
this.vertices = null;
this.volumeRenderPointSize = 0.15;
this.meshType = meshType;
}, "~S");
$_M(c$, "initialize", 
function (lighting, vertices, plane) {
if (vertices == null) vertices = this.vertices;
var normals = this.getNormals (vertices, plane);
this.setNormixes (normals);
this.lighting = 1073741958;
if (this.insideOut) this.invertNormixes ();
this.setLighting (lighting);
}, "~N,~A,JU.P4");
$_M(c$, "setNormixes", 
function (normals) {
this.normixes =  Clazz.newShortArray (this.normixCount, 0);
if (this.bsTemp == null) this.bsTemp = J.util.Normix.newVertexBitSet ();
if (this.haveXyPoints) for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = 9999;

 else for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = J.util.Normix.getNormixV (normals[i], this.bsTemp);

return this.normixes;
}, "~A");
$_M(c$, "getNormals", 
function (vertices, plane) {
this.normixCount = (this.isTriangleSet ? this.polygonCount : this.vertexCount);
var normals =  new Array (this.normixCount);
for (var i = this.normixCount; --i >= 0; ) normals[i] =  new JU.V3 ();

if (plane == null) {
this.sumVertexNormals (vertices, normals);
} else {
var normal = JU.V3.new3 (plane.x, plane.y, plane.z);
for (var i = this.normixCount; --i >= 0; ) normals[i] = normal;

}if (!this.isTriangleSet) for (var i = this.normixCount; --i >= 0; ) {
normals[i].normalize ();
}
return normals;
}, "~A,JU.P4");
$_M(c$, "setLighting", 
function (lighting) {
this.isTwoSided = (lighting == 1073741964);
if (lighting == this.lighting) return;
this.flipLighting (this.lighting);
this.flipLighting (this.lighting = lighting);
}, "~N");
$_M(c$, "flipLighting", 
($fz = function (lighting) {
if (lighting == 1073741964) for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = ~this.normixes[i];

 else if ((lighting == 1073741958) == this.insideOut) this.invertNormixes ();
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "invertNormixes", 
($fz = function () {
J.util.Normix.setInverseNormixes ();
for (var i = this.normixCount; --i >= 0; ) this.normixes[i] = J.util.Normix.getInverseNormix (this.normixes[i]);

}, $fz.isPrivate = true, $fz));
$_M(c$, "setTranslucent", 
function (isTranslucent, iLevel) {
this.colix = J.util.C.getColixTranslucent3 (this.colix, isTranslucent, iLevel);
}, "~B,~N");
$_M(c$, "sumVertexNormals", 
function (vertices, normals) {
this.sumVertexNormals2 (vertices, normals);
}, "~A,~A");
$_M(c$, "sumVertexNormals2", 
function (vertices, normals) {
var adjustment = this.checkByteCount;
var min = this.getMinDistance2ForVertexGrouping ();
for (var i = this.polygonCount; --i >= 0; ) {
try {
if (!this.setABC (i)) continue;
var vA = vertices[this.iA];
var vB = vertices[this.iB];
var vC = vertices[this.iC];
if (vA.distanceSquared (vB) < min || vB.distanceSquared (vC) < min || vA.distanceSquared (vC) < min) continue;
J.util.Measure.calcNormalizedNormal (vA, vB, vC, this.vTemp, this.vAB, this.vAC);
if (this.isTriangleSet) {
normals[i].setT (this.vTemp);
continue;
}var l = this.vTemp.length ();
if (l > 0.9 && l < 1.1) for (var j = this.polygonIndexes[i].length - adjustment; --j >= 0; ) {
var k = this.polygonIndexes[i][j];
normals[k].add (this.vTemp);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e);
} else {
throw e;
}
}
}
}, "~A,~A");
$_M(c$, "getMinDistance2ForVertexGrouping", 
function () {
return 1e-8;
});
$_M(c$, "getState", 
function (type) {
var s =  new JU.SB ();
s.append (type);
if (!type.equals ("mo")) s.append (" ID ").append (J.util.Escape.eS (this.thisID));
if (this.lattice != null) s.append (" lattice ").append (J.util.Escape.eP (this.lattice));
if (this.meshColix != 0) s.append (" color mesh ").append (J.util.C.getHexCode (this.meshColix));
s.append (this.getRendering ());
if (!this.visible) s.append (" hidden");
if (this.bsDisplay != null) {
s.append (";\n  ").append (type);
if (!type.equals ("mo")) s.append (" ID ").append (J.util.Escape.eS (this.thisID));
s.append (" display " + J.util.Escape.eBS (this.bsDisplay));
}return s.toString ();
}, "~S");
$_M(c$, "getRendering", 
function () {
var s =  new JU.SB ();
s.append (this.fillTriangles ? " fill" : " noFill");
s.append (this.drawTriangles ? " mesh" : " noMesh");
s.append (this.showPoints ? " dots" : " noDots");
s.append (this.frontOnly ? " frontOnly" : " notFrontOnly");
if (this.showContourLines) s.append (" contourlines");
if (this.showTriangles) s.append (" triangles");
s.append (" ").append (J.script.T.nameOf (this.lighting));
return s.toString ();
});
$_M(c$, "getOffsetVertices", 
function (thePlane) {
if (this.altVertices != null && !this.recalcAltVertices) return this.altVertices;
this.altVertices =  new Array (this.vertexCount);
for (var i = 0; i < this.vertexCount; i++) this.altVertices[i] = JU.P3.newP (this.vertices[i]);

var normal = null;
var val = 0;
if (this.scale3d != 0 && this.vertexValues != null && thePlane != null) {
normal = JU.V3.new3 (thePlane.x, thePlane.y, thePlane.z);
normal.normalize ();
normal.scale (this.scale3d);
if (this.mat4 != null) {
var m3 =  new JU.M3 ();
this.mat4.getRotationScale (m3);
m3.transform (normal);
}}for (var i = 0; i < this.vertexCount; i++) {
if (this.vertexValues != null && Float.isNaN (val = this.vertexValues[i])) continue;
if (this.mat4 != null) this.mat4.transform (this.altVertices[i]);
var pt = this.altVertices[i];
if (normal != null && val != 0) pt.scaleAdd2 (val, normal, pt);
}
this.initialize (this.lighting, this.altVertices, null);
this.recalcAltVertices = false;
return this.altVertices;
}, "JU.P4");
$_M(c$, "setShowWithin", 
function (showWithinPoints, showWithinDistance2, isWithinNot) {
if (showWithinPoints.size () == 0) {
this.bsDisplay = (isWithinNot ? J.util.BSUtil.newBitSet2 (0, this.vertexCount) : null);
return;
}this.bsDisplay =  new JU.BS ();
for (var i = 0; i < this.vertexCount; i++) if (J.shape.Mesh.checkWithin (this.vertices[i], showWithinPoints, showWithinDistance2, isWithinNot)) this.bsDisplay.set (i);

}, "JU.List,~N,~B");
c$.checkWithin = $_M(c$, "checkWithin", 
function (pti, withinPoints, withinDistance2, isWithinNot) {
if (withinPoints.size () != 0) for (var i = withinPoints.size (); --i >= 0; ) if (pti.distanceSquared (withinPoints.get (i)) <= withinDistance2) return !isWithinNot;

return isWithinNot;
}, "JU.P3,JU.List,~N,~B");
$_M(c$, "getVertexIndexFromNumber", 
function (vertexIndex) {
if (--vertexIndex < 0) vertexIndex = this.vertexCount + vertexIndex;
return (this.vertexCount <= vertexIndex ? this.vertexCount - 1 : vertexIndex < 0 ? 0 : vertexIndex);
}, "~N");
$_M(c$, "getVisibleVertexBitSet", 
function () {
return this.getVisibleVBS ();
});
$_M(c$, "getVisibleVBS", 
function () {
var bs =  new JU.BS ();
if (this.polygonCount == 0 && this.bsSlabDisplay != null) J.util.BSUtil.copy2 (this.bsSlabDisplay, bs);
 else for (var i = this.polygonCount; --i >= 0; ) if (this.bsSlabDisplay == null || this.bsSlabDisplay.get (i)) {
var vertexIndexes = this.polygonIndexes[i];
if (vertexIndexes == null) continue;
bs.set (vertexIndexes[0]);
bs.set (vertexIndexes[1]);
bs.set (vertexIndexes[2]);
}
return bs;
});
$_M(c$, "setTokenProperty", 
function (tokProp, bProp) {
switch (tokProp) {
case 1073742058:
case 1073741960:
this.frontOnly = (tokProp == 1073741960 ? bProp : !bProp);
return;
case 1073741958:
case 1073741862:
case 1073741964:
this.setLighting (tokProp);
return;
case 1073742042:
case 1113198595:
this.showPoints = (tokProp == 1113198595 ? bProp : !bProp);
return;
case 1073742052:
case 1073742018:
this.drawTriangles = (tokProp == 1073742018 ? bProp : !bProp);
return;
case 1073742046:
case 1073741938:
this.fillTriangles = (tokProp == 1073741938 ? bProp : !bProp);
return;
case 1073742060:
case 1073742182:
this.showTriangles = (tokProp == 1073742182 ? bProp : !bProp);
return;
case 1073742039:
case 1073741898:
this.showContourLines = (tokProp == 1073741898 ? bProp : !bProp);
return;
}
}, "~N,~B");
$_M(c$, "getInfo", 
function (isAll) {
var info =  new java.util.Hashtable ();
info.put ("id", this.thisID);
info.put ("vertexCount", Integer.$valueOf (this.vertexCount));
info.put ("polygonCount", Integer.$valueOf (this.polygonCount));
info.put ("haveQuads", Boolean.$valueOf (this.haveQuads));
info.put ("haveValues", Boolean.$valueOf (this.vertexValues != null));
if (this.vertexCount > 0 && isAll) info.put ("vertices", JU.AU.arrayCopyPt (this.vertices, this.vertexCount));
if (this.vertexValues != null && isAll) info.put ("vertexValues", JU.AU.arrayCopyF (this.vertexValues, this.vertexCount));
if (this.polygonCount > 0 && isAll) info.put ("polygons", JU.AU.arrayCopyII (this.polygonIndexes, this.polygonCount));
return info;
}, "~B");
$_M(c$, "getBoundingBox", 
function () {
return null;
});
$_M(c$, "getUnitCell", 
function () {
return null;
});
$_M(c$, "rotateTranslate", 
function (q, offset, isAbsolute) {
if (q == null && offset == null) {
this.mat4 = null;
return;
}var m3 =  new JU.M3 ();
var v =  new JU.V3 ();
if (this.mat4 == null) this.mat4 = JU.M4.newM (null);
this.mat4.getRotationScale (m3);
this.mat4.get (v);
if (q == null) {
if (isAbsolute) v.setT (offset);
 else v.add (offset);
} else {
m3.mul (q.getMatrix ());
}this.mat4 = JU.M4.newMV (m3, v);
this.recalcAltVertices = true;
}, "J.util.Quaternion,JU.T3,~B");
$_M(c$, "getNormalsTemp", 
function () {
return (this.normalsTemp == null ? (this.normalsTemp = this.getNormals (this.vertices, null)) : this.normalsTemp);
});
Clazz.defineStatics (c$,
"PREVIOUS_MESH_ID", "+PREVIOUS_MESH+");
});
