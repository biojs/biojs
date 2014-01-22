Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.SurfaceFileReader"], "J.jvxl.readers.PolygonFileReader", ["java.util.Date", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nVertices = 0;
this.nTriangles = 0;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "PolygonFileReader", J.jvxl.readers.SurfaceFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.PolygonFileReader, []);
});
$_M(c$, "init2PFR", 
function (sg, br) {
this.init2SFR (sg, br);
this.jvxlFileHeaderBuffer =  new JU.SB ();
this.jvxlFileHeaderBuffer.append ("#created ").append ("" +  new java.util.Date ()).append ("\n");
this.vertexDataOnly = true;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
$_V(c$, "readVolumeParameters", 
function (isMapData) {
return true;
}, "~B");
$_V(c$, "readVolumeData", 
function (isMapData) {
return true;
}, "~B");
$_V(c$, "readSurfaceData", 
function (isMapData) {
this.getSurfaceData ();
}, "~B");
});
