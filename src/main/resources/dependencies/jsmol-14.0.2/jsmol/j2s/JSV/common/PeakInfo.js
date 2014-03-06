Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.PeakInfo", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xMin = 0;
this.xMax = 0;
this.yMin = 0;
this.yMax = 0;
this.px0 = 0;
this.px1 = 0;
this.stringInfo = null;
this.type = null;
this.type2 = null;
this.index = null;
this.file = null;
this.filePathForwardSlash = null;
this.title = null;
this.model = null;
this.atoms = null;
this.id = null;
this.spectrum = null;
this._match = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PeakInfo");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (s) {
this.stringInfo = s;
this.type = JU.PT.getQuotedAttribute (s, "type");
if (this.type == null) this.type = "";
this.type = this.type.toUpperCase ();
var pt = this.type.indexOf ('/');
this.type2 = (pt < 0 ? "" : JSV.common.PeakInfo.fixType (this.type.substring (this.type.indexOf ('/') + 1)));
if (pt >= 0) this.type = JSV.common.PeakInfo.fixType (this.type.substring (0, pt)) + "/" + this.type2;
 else this.type = JSV.common.PeakInfo.fixType (this.type);
this.id = JU.PT.getQuotedAttribute (s, "id");
this.index = JU.PT.getQuotedAttribute (s, "index");
this.file = JU.PT.getQuotedAttribute (s, "file");
System.out.println ("pi file=" + this.file);
this.filePathForwardSlash = (this.file == null ? null : this.file.$replace ('\\', '/'));
this.model = JU.PT.getQuotedAttribute (s, "model");
var isBaseModel = s.contains ("baseModel=\"\"");
if (!isBaseModel) this.atoms = JU.PT.getQuotedAttribute (s, "atoms");
this.title = JU.PT.getQuotedAttribute (s, "title");
this._match = JU.PT.getQuotedAttribute (s, "_match");
this.xMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMax"));
this.xMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMin"));
this.yMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMax"));
this.yMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMin"));
}, "~S");
$_M(c$, "isClearAll", 
function () {
return (this.spectrum == null);
});
$_M(c$, "getType", 
function () {
return this.type;
});
$_M(c$, "getAtoms", 
function () {
return this.atoms;
});
$_M(c$, "getXMax", 
function () {
return this.xMax;
});
$_M(c$, "getXMin", 
function () {
return this.xMin;
});
$_M(c$, "getYMin", 
function () {
return this.yMin;
});
$_M(c$, "getYMax", 
function () {
return this.yMax;
});
$_M(c$, "getX", 
function () {
return (this.xMax + this.xMin) / 2;
});
$_M(c$, "getMatch", 
function () {
return this._match;
});
c$.fixType = $_M(c$, "fixType", 
($fz = function (type) {
return (type.equals ("HNMR") ? "1HNMR" : type.equals ("CNMR") ? "13CNMR" : type);
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "toString", 
function () {
return this.stringInfo;
});
$_M(c$, "getIndex", 
function () {
return this.index;
});
$_M(c$, "getTitle", 
function () {
return this.title;
});
$_M(c$, "checkFileIndex", 
function (filePath, sIndex) {
return (sIndex.equals (this.index) && (filePath.equals (this.file) || filePath.equals (this.filePathForwardSlash)));
}, "~S,~S");
$_M(c$, "checkFileTypeModel", 
function (filePath, type, model) {
return filePath.equals (this.file) && this.checkModel (model) && this.type.endsWith (type);
}, "~S,~S,~S");
$_M(c$, "checkTypeModel", 
function (type, model) {
return this.checkType (type) && this.checkModel (model);
}, "~S,~S");
$_M(c$, "checkModel", 
($fz = function (model) {
return (model != null && model.equals (this.model));
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "checkType", 
($fz = function (type) {
return (type.endsWith (this.type));
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "checkTypeMatch", 
function (pi) {
return (this.checkType (pi.type) && (this.checkId (pi._match) || this.checkModel (pi._match) || this.title.toUpperCase ().indexOf (pi._match) >= 0));
}, "JSV.common.PeakInfo");
$_M(c$, "checkId", 
($fz = function (match) {
return (this.id != null && match != null && match.toUpperCase ().startsWith ("ID=") && match.substring (3).equals (this.id));
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getModel", 
function () {
return this.model;
});
$_M(c$, "getFilePath", 
function () {
return this.file;
});
$_M(c$, "autoSelectOnLoad", 
function () {
return (this.type.startsWith ("GC"));
});
$_M(c$, "setPixelRange", 
function (x0, x1) {
this.px0 = x0;
this.px1 = x1;
}, "~N,~N");
$_M(c$, "checkRange", 
function (xPixel, xVal) {
if (xPixel != 2147483647 ? (this.px0 <= xPixel && this.px1 >= xPixel) : xVal >= this.xMin && xVal <= this.xMax) {
return Math.abs (xVal - this.getX ());
}return 1e100;
}, "~N,~N");
$_M(c$, "getXPixel", 
function () {
return Clazz.doubleToInt ((this.px0 + this.px1) / 2);
});
c$.nullPeakInfo = c$.prototype.nullPeakInfo =  new JSV.common.PeakInfo ();
});
