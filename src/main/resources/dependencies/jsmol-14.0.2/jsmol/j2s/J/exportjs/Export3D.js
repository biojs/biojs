Clazz.declarePackage ("J.exportjs");
Clazz.load (["J.api.JmolRendererInterface", "JU.P3", "$.P3i"], "J.exportjs.Export3D", ["J.g3d.HermiteRenderer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.exporter = null;
this.privateKey = 0;
this.g3d = null;
this.colix = 0;
this.hermite3d = null;
this.width = 0;
this.height = 0;
this.slab = 0;
this.exportName = null;
this.ptA = null;
this.ptB = null;
this.ptC = null;
this.ptD = null;
this.ptAi = null;
this.ptBi = null;
Clazz.instantialize (this, arguments);
}, J.exportjs, "Export3D", null, J.api.JmolRendererInterface);
Clazz.prepareFields (c$, function () {
this.ptA =  new JU.P3 ();
this.ptB =  new JU.P3 ();
this.ptC =  new JU.P3 ();
this.ptD =  new JU.P3 ();
this.ptAi =  new JU.P3i ();
this.ptBi =  new JU.P3i ();
});
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "getExportType", 
function () {
return this.exporter.exportType;
});
$_V(c$, "getExportName", 
function () {
return this.exportName;
});
$_V(c$, "initializeExporter", 
function (viewer, privateKey, gdata, params) {
this.exportName = params.get ("type");
try {
var name = "J.exportjs." + this.exportName + "Exporter";
var exporterClass = Class.forName (name);
this.exporter = exporterClass.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
this.g3d = gdata;
this.exporter.setRenderer (this);
this.g3d.setNewWindowParametersForExport ();
this.slab = this.g3d.getSlab ();
this.width = this.g3d.getRenderWidth ();
this.height = this.g3d.getRenderHeight ();
this.privateKey = privateKey;
return (this.exporter.initializeOutput (viewer, privateKey, this.g3d, params) ? this.exporter : null);
}, "J.viewer.Viewer,~N,J.util.GData,java.util.Map");
$_V(c$, "initializeOutput", 
function (viewer, privateKey, gdata, params) {
return this.exporter.initializeOutput (viewer, privateKey, this.g3d, params);
}, "J.viewer.Viewer,~N,J.util.GData,java.util.Map");
$_V(c$, "finalizeOutput", 
function () {
return this.exporter.finalizeOutput ();
});
$_V(c$, "setSlab", 
function (slabValue) {
this.slab = slabValue;
this.g3d.setSlab (slabValue);
}, "~N");
$_V(c$, "setDepth", 
function (depthValue) {
this.g3d.setDepth (depthValue);
}, "~N");
$_V(c$, "renderBackground", 
function (me) {
if (this.exporter.exportType == 2) this.g3d.renderBackground (me);
}, "J.api.JmolRendererInterface");
$_V(c$, "drawAtom", 
function (atom) {
this.exporter.drawAtom (atom);
}, "J.modelset.Atom");
$_V(c$, "drawFilledCircle", 
function (colixRing, colixFill, diameter, x, y, z) {
if (this.isClippedZ (z)) return;
this.exporter.drawFilledCircle (colixRing, colixFill, diameter, x, y, z);
}, "~N,~N,~N,~N,~N,~N");
$_M(c$, "drawCircle", 
function (colix, diameter, x, y, z, doFill) {
if (this.isClippedZ (z)) return;
this.exporter.drawCircle (x, y, z, diameter, colix, doFill);
}, "~N,~N,~N,~N,~N,~B");
$_V(c$, "fillSphereXYZ", 
function (diameter, x, y, z) {
this.ptA.set (x, y, z);
this.fillSphere (diameter, this.ptA);
}, "~N,~N,~N,~N");
$_V(c$, "fillSphereI", 
function (diameter, center) {
this.ptA.set (center.x, center.y, center.z);
this.fillSphere (diameter, this.ptA);
}, "~N,JU.P3i");
$_V(c$, "fillSphere", 
function (diameter, center) {
if (diameter == 0) return;
this.exporter.fillSphere (this.colix, diameter, center);
}, "~N,JU.P3");
$_V(c$, "drawRect", 
function (x, y, z, zSlab, rWidth, rHeight) {
if (zSlab != 0 && this.isClippedZ (zSlab)) return;
var w = rWidth - 1;
var h = rHeight - 1;
var xRight = x + w;
var yBottom = y + h;
if (y >= 0 && y < this.height) this.drawHLine (x, y, z, w);
if (yBottom >= 0 && yBottom < this.height) this.drawHLine (x, yBottom, z, w);
if (x >= 0 && x < this.width) this.drawVLine (x, y, z, h);
if (xRight >= 0 && xRight < this.width) this.drawVLine (xRight, y, z, h);
}, "~N,~N,~N,~N,~N,~N");
$_M(c$, "drawHLine", 
($fz = function (x, y, z, w) {
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
$_M(c$, "drawVLine", 
($fz = function (x, y, z, h) {
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
$_V(c$, "fillRect", 
function (x, y, z, zSlab, widthFill, heightFill) {
if (this.isClippedZ (zSlab)) return;
this.ptA.set (x, y, z);
this.ptB.set (x + widthFill, y, z);
this.ptC.set (x + widthFill, y + heightFill, z);
this.ptD.set (x, y + heightFill, z);
this.fillQuadrilateral (this.ptA, this.ptB, this.ptC, this.ptD);
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "drawString", 
function (str, font3d, xBaseline, yBaseline, z, zSlab, bgcolix) {
if (str == null) return;
if (this.isClippedZ (zSlab)) return;
this.drawStringNoSlab (str, font3d, xBaseline, yBaseline, z, bgcolix);
}, "~S,javajs.awt.Font,~N,~N,~N,~N,~N");
$_V(c$, "drawStringNoSlab", 
function (str, font3d, xBaseline, yBaseline, z, bgColix) {
if (str == null) return;
z = Math.max (this.slab, z);
if (font3d == null) font3d = this.g3d.getFont3DCurrent ();
 else this.g3d.setFont (font3d);
this.exporter.plotText (xBaseline, yBaseline, z, this.colix, str, font3d);
}, "~S,javajs.awt.Font,~N,~N,~N,~N");
$_V(c$, "drawImage", 
function (objImage, x, y, z, zSlab, bgcolix, width, height) {
if (objImage == null || width == 0 || height == 0) return;
if (this.isClippedZ (zSlab)) return;
z = Math.max (this.slab, z);
this.exporter.plotImage (x, y, z, objImage, bgcolix, width, height);
}, "~O,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "drawPixel", 
function (x, y, z) {
this.plotPixelClipped (x, y, z);
}, "~N,~N,~N");
$_M(c$, "plotPixelClipped", 
function (x, y, z) {
if (this.isClipped (x, y, z)) return;
this.exporter.drawPixel (this.colix, x, y, z, 1);
}, "~N,~N,~N");
$_V(c$, "plotImagePixel", 
function (argb, x, y, z, shade, bgargb) {
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "plotPixelClippedP3i", 
function (screen) {
if (this.isClipped (screen.x, screen.y, screen.z)) return;
this.exporter.drawPixel (this.colix, screen.x, screen.y, screen.z, 1);
}, "JU.P3i");
$_V(c$, "drawPoints", 
function (count, coordinates, scale) {
for (var i = count * 3; i > 0; ) {
var z = coordinates[--i];
var y = coordinates[--i];
var x = coordinates[--i];
if (this.isClipped (x, y, z)) continue;
this.exporter.drawPixel (this.colix, x, y, z, scale);
}
}, "~N,~A,~N");
$_V(c$, "drawDashedLine", 
function (run, rise, pointA, pointB) {
this.drawLineAB (pointA, pointB);
}, "~N,~N,JU.P3i,JU.P3i");
$_V(c$, "drawDottedLine", 
function (pointA, pointB) {
this.drawLineAB (pointA, pointB);
}, "JU.P3i,JU.P3i");
$_V(c$, "drawLineXYZ", 
function (x1, y1, z1, x2, y2, z2) {
this.ptAi.set (x1, y1, z1);
this.ptBi.set (x2, y2, z2);
this.drawLineAB (this.ptAi, this.ptBi);
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "drawLine", 
function (colixA, colixB, xA, yA, zA, xB, yB, zB) {
this.fillCylinderXYZ (colixA, colixB, 2, this.exporter.lineWidthMad, xA, yA, zA, xB, yB, zB);
}, "~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "drawLineAB", 
function (pointA, pointB) {
this.ptA.set (pointA.x, pointA.y, pointA.z);
this.ptB.set (pointB.x, pointB.y, pointB.z);
this.exporter.fillCylinderScreenMad (this.colix, 2, this.exporter.lineWidthMad, this.ptA, this.ptB);
}, "JU.P3i,JU.P3i");
$_V(c$, "drawBond", 
function (atomA, atomB, colixA, colixB, endcaps, mad, bondOrder) {
if (mad == 1) mad = this.exporter.lineWidthMad;
this.exporter.drawCylinder (atomA, atomB, colixA, colixB, endcaps, mad, bondOrder);
}, "JU.P3,JU.P3,~N,~N,~N,~N,~N");
$_V(c$, "fillCylinderXYZ", 
function (colixA, colixB, endcaps, mad, xA, yA, zA, xB, yB, zB) {
this.ptA.set (xA, yA, zA);
this.ptB.set (xB, yB, zB);
this.exporter.drawCylinder (this.ptA, this.ptB, colixA, colixB, endcaps, mad, 1);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "fillCylinderScreen", 
function (endcaps, screenDiameter, xA, yA, zA, xB, yB, zB) {
this.ptA.set (xA, yA, zA);
this.ptB.set (xB, yB, zB);
this.exporter.fillCylinderScreen (this.colix, endcaps, screenDiameter, this.ptA, this.ptB, null, null, 0);
}, "~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "fillCylinderScreen3I", 
function (endcaps, diameter, pointA, pointB, pt0f, pt1f, radius) {
if (diameter <= 0) return;
this.ptA.set (pointA.x, pointA.y, pointA.z);
this.ptB.set (pointB.x, pointB.y, pointB.z);
this.exporter.fillCylinderScreen (this.colix, endcaps, diameter, this.ptA, this.ptB, pt0f, pt1f, radius);
}, "~N,~N,JU.P3i,JU.P3i,JU.P3,JU.P3,~N");
$_V(c$, "fillCylinder", 
function (endcaps, diameter, pointA, pointB) {
if (diameter <= 0) return;
this.ptA.set (pointA.x, pointA.y, pointA.z);
this.ptB.set (pointB.x, pointB.y, pointB.z);
this.exporter.fillCylinderScreenMad (this.colix, endcaps, diameter, this.ptA, this.ptB);
}, "~N,~N,JU.P3i,JU.P3i");
$_V(c$, "fillCylinderBits", 
function (endcaps, diameter, pointA, pointB) {
if (diameter <= 0) return;
this.exporter.fillCylinderScreenMad (this.colix, endcaps, diameter, pointA, pointB);
}, "~N,~N,JU.P3,JU.P3");
$_V(c$, "fillConeScreen", 
function (endcap, screenDiameter, pointBase, screenTip, isBarb) {
this.ptA.set (pointBase.x, pointBase.y, pointBase.z);
this.ptB.set (screenTip.x, screenTip.y, screenTip.z);
this.exporter.fillConeScreen (this.colix, endcap, screenDiameter, this.ptA, this.ptB, isBarb);
}, "~N,~N,JU.P3i,JU.P3i,~B");
$_V(c$, "fillConeSceen3f", 
function (endcap, screenDiameter, pointBase, screenTip) {
this.exporter.fillConeScreen (this.colix, endcap, screenDiameter, pointBase, screenTip, false);
}, "~N,~N,JU.P3,JU.P3");
$_V(c$, "drawHermite4", 
function (tension, s0, s1, s2, s3) {
this.hermite3d.renderHermiteRope (false, tension, 0, 0, 0, s0, s1, s2, s3);
}, "~N,JU.P3i,JU.P3i,JU.P3i,JU.P3i");
$_V(c$, "fillHermite", 
function (tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3) {
this.hermite3d.renderHermiteRope (true, tension, diameterBeg, diameterMid, diameterEnd, s0, s1, s2, s3);
}, "~N,~N,~N,~N,JU.P3i,JU.P3i,JU.P3i,JU.P3i");
$_V(c$, "drawHermite7", 
function (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, colixBack) {
this.hermite3d.renderHermiteRibbon (fill, border, tension, s0, s1, s2, s3, s4, s5, s6, s7, aspectRatio, 0);
}, "~B,~B,~N,JU.P3i,JU.P3i,JU.P3i,JU.P3i,JU.P3i,JU.P3i,JU.P3i,JU.P3i,~N,~N");
$_V(c$, "drawTriangle3C", 
function (screenA, colixA, screenB, colixB, screenC, colixC, check) {
if ((check & 1) == 1) this.drawLine (colixA, colixB, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
if ((check & 2) == 2) this.drawLine (colixB, colixC, screenB.x, screenB.y, screenB.z, screenC.x, screenC.y, screenC.z);
if ((check & 4) == 4) this.drawLine (colixA, colixC, screenA.x, screenA.y, screenA.z, screenC.x, screenC.y, screenC.z);
}, "JU.P3i,~N,JU.P3i,~N,JU.P3i,~N,~N");
$_V(c$, "drawTriangle3I", 
function (screenA, screenB, screenC, check) {
if ((check & 1) == 1) this.drawLine (this.colix, this.colix, screenA.x, screenA.y, screenA.z, screenB.x, screenB.y, screenB.z);
if ((check & 2) == 2) this.drawLine (this.colix, this.colix, screenB.x, screenB.y, screenB.z, screenC.x, screenC.y, screenC.z);
if ((check & 4) == 4) this.drawLine (this.colix, this.colix, screenA.x, screenA.y, screenA.z, screenC.x, screenC.y, screenC.z);
}, "JU.P3i,JU.P3i,JU.P3i,~N");
$_V(c$, "fillTriangle3CN", 
function (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC) {
if (colixA != colixB || colixB != colixC) {
return;
}this.ptA.set (pointA.x, pointA.y, pointA.z);
this.ptB.set (pointB.x, pointB.y, pointB.z);
this.ptC.set (pointC.x, pointC.y, pointC.z);
this.exporter.fillTriangle (colixA, this.ptA, this.ptB, this.ptC, false, false);
}, "JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N");
$_V(c$, "fillTriangleTwoSided", 
function (normix, xpointA, ypointA, zpointA, xpointB, ypointB, zpointB, xpointC, ypointC, zpointC) {
this.ptA.set (xpointA, ypointA, zpointA);
this.ptB.set (xpointB, ypointB, zpointB);
this.ptC.set (xpointC, ypointC, zpointC);
this.exporter.fillTriangle (this.colix, this.ptA, this.ptB, this.ptC, true, false);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
$_V(c$, "fillTriangle3f", 
function (pointA, pointB, pointC, setNoisy) {
this.exporter.fillTriangle (this.colix, pointA, pointB, pointC, false, false);
}, "JU.P3,JU.P3,JU.P3,~B");
$_V(c$, "fillTriangle3i", 
function (pointA, pointB, pointC, ptA, ptB, ptC) {
this.exporter.fillTriangle (this.colix, ptA, ptB, ptC, true, true);
}, "JU.P3i,JU.P3i,JU.P3i,JU.P3,JU.P3,JU.P3");
$_V(c$, "fillTriangle", 
function (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC, factor) {
this.fillTriangle3CN (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC);
}, "JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N,~N");
$_V(c$, "drawQuadrilateral", 
function (colix, pointA, pointB, pointC, screenD) {
this.setColix (colix);
this.drawLineAB (pointA, pointB);
this.drawLineAB (pointB, pointC);
this.drawLineAB (pointC, screenD);
this.drawLineAB (screenD, pointA);
}, "~N,JU.P3i,JU.P3i,JU.P3i,JU.P3i");
$_V(c$, "fillQuadrilateral", 
function (pointA, pointB, pointC, pointD) {
this.exporter.fillTriangle (this.colix, pointA, pointB, pointC, false, false);
this.exporter.fillTriangle (this.colix, pointA, pointC, pointD, false, false);
}, "JU.P3,JU.P3,JU.P3,JU.P3");
$_V(c$, "fillQuadrilateral3i", 
function (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC, screenD, colixD, normixD) {
this.fillTriangle3CN (pointA, colixA, normixA, pointB, colixB, normixB, pointC, colixC, normixC);
this.fillTriangle3CN (pointA, colixA, normixA, pointC, colixC, normixC, screenD, colixD, normixD);
}, "JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N,JU.P3i,~N,~N");
$_V(c$, "drawSurface", 
function (meshSurface, colix) {
this.exporter.drawSurface (meshSurface, colix);
}, "J.util.MeshSurface,~N");
$_V(c$, "getBgColixes", 
function (bgcolixes) {
return this.exporter.exportType == 1 ? null : bgcolixes;
}, "~A");
$_V(c$, "fillEllipsoid", 
function (center, points, x, y, z, diameter, mToEllipsoidal, coef, mDeriv, selectedOctant, octantPoints) {
this.exporter.fillEllipsoid (center, points, this.colix, x, y, z, diameter, mToEllipsoidal, coef, mDeriv, octantPoints);
}, "JU.P3,~A,~N,~N,~N,~N,JU.M3,~A,JU.M4,~N,~A");
$_V(c$, "drawEllipse", 
function (ptAtom, ptX, ptY, fillArc, wireframeOnly) {
return this.exporter.drawEllipse (ptAtom, ptX, ptY, this.colix, fillArc);
}, "JU.P3,JU.P3,JU.P3,~B,~B");
$_V(c$, "getGData", 
function () {
return this.g3d;
});
$_V(c$, "isAntialiased", 
function () {
return false;
});
$_V(c$, "checkTranslucent", 
function (isAlphaTranslucent) {
return true;
}, "~B");
$_V(c$, "haveTranslucentObjects", 
function () {
return true;
});
$_V(c$, "setColor", 
function (color) {
this.g3d.setColor (color);
}, "~N");
$_V(c$, "getRenderWidth", 
function () {
return this.g3d.getRenderWidth ();
});
$_V(c$, "getRenderHeight", 
function () {
return this.g3d.getRenderHeight ();
});
$_V(c$, "isPass2", 
function () {
return this.g3d.isPass2 ();
});
$_V(c$, "getSlab", 
function () {
return this.g3d.getSlab ();
});
$_V(c$, "getDepth", 
function () {
return this.g3d.getDepth ();
});
$_V(c$, "setColix", 
function (colix) {
this.colix = colix;
this.g3d.setColix (colix);
return true;
}, "~N");
$_V(c$, "setFontFid", 
function (fid) {
this.g3d.setFontFid (fid);
}, "~N");
$_V(c$, "getFont3DCurrent", 
function () {
return this.g3d.getFont3DCurrent ();
});
$_V(c$, "isInDisplayRange", 
function (x, y) {
if (this.exporter.exportType == 1) return true;
return this.g3d.isInDisplayRange (x, y);
}, "~N,~N");
$_V(c$, "isClippedZ", 
function (z) {
return this.g3d.isClippedZ (z);
}, "~N");
$_M(c$, "clipCode", 
function (x, y, z) {
return (this.exporter.exportType == 1 ? this.g3d.clipCode (z) : this.g3d.clipCode3 (x, y, z));
}, "~N,~N,~N");
$_V(c$, "isClippedXY", 
function (diameter, x, y) {
if (this.exporter.exportType == 1) return false;
return this.g3d.isClippedXY (diameter, x, y);
}, "~N,~N,~N");
$_M(c$, "isClipped", 
function (x, y, z) {
return (this.g3d.isClippedZ (z) || this.isClipped (x, y));
}, "~N,~N,~N");
$_M(c$, "isClipped", 
function (x, y) {
if (this.exporter.exportType == 1) return false;
return this.g3d.isClipped (x, y);
}, "~N,~N");
$_V(c$, "getColorArgbOrGray", 
function (colix) {
return this.g3d.getColorArgbOrGray (colix);
}, "~N");
$_V(c$, "setNoisySurfaceShade", 
function (pointA, pointB, pointC) {
this.g3d.setNoisySurfaceShade (pointA, pointB, pointC);
}, "JU.P3i,JU.P3i,JU.P3i");
$_V(c$, "getFontFidFS", 
function (fontFace, fontSize) {
return this.g3d.getFontFidFS (fontFace, fontSize);
}, "~S,~N");
$_V(c$, "isDirectedTowardsCamera", 
function (normix) {
return this.g3d.isDirectedTowardsCamera (normix);
}, "~N");
$_V(c$, "getTransformedVertexVectors", 
function () {
return this.g3d.getTransformedVertexVectors ();
});
$_V(c$, "getFont3DScaled", 
function (font, scale) {
return this.g3d.getFont3DScaled (font, scale);
}, "javajs.awt.Font,~N");
$_V(c$, "getFontFid", 
function (fontSize) {
return this.g3d.getFontFid (fontSize);
}, "~N");
$_V(c$, "setTranslucentCoverOnly", 
function (TF) {
}, "~B");
$_M(c$, "getPrivateKey", 
function () {
return this.privateKey;
});
$_V(c$, "volumeRender4", 
function (diam, x, y, z) {
this.fillSphereXYZ (diam, x, y, z);
}, "~N,~N,~N,~N");
$_V(c$, "currentlyRendering", 
function () {
return false;
});
$_V(c$, "renderCrossHairs", 
function (minMax, screenWidth, screenHeight, navigationOffset, navigationDepthPercent) {
}, "~A,~N,~N,JU.P3,~N");
$_V(c$, "volumeRender", 
function (TF) {
}, "~B");
$_V(c$, "renderAllStrings", 
function (jmolRenderer) {
}, "~O");
$_V(c$, "getTranslucentCoverOnly", 
function () {
return this.g3d.getTranslucentCoverOnly ();
});
$_V(c$, "addRenderer", 
function (tok) {
if (tok == 553648147) this.hermite3d =  new J.g3d.HermiteRenderer ().set (this);
}, "~N");
$_V(c$, "setAmbientOcclusion", 
function (value) {
}, "~N");
});
