(function(Clazz
,$_A
,$_Ab
,$_AB
,$_AC
,$_AD
,$_AF
,$_AI
,$_AL
,$_AS
,$_B
,$_C
,$_D
,$_E
,$_F
,$_G
,$_H
,$_I
,$_J
,$_K
,$_k
,$_L
,$_M
,$_N
,$_O
,$_P
,$_Q
,$_R
,$_S
,$_s
,$_T
,$_U
,$_V
,$_W
,$_X
,$_Y
,$_Z
,Clazz_doubleToInt
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_supportsNativeObject
,Clazz_extendedObjectMethods
,Clazz_callingStackTraces
,Clazz_clone
,Clazz_doubleToShort
,Clazz_innerFunctions
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
){
var $t$;
//var c$;
Clazz_declarePackage ("J.modelset");
Clazz_load (null, "J.modelset.Object2d", ["java.lang.Float", "J.util.C", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.isLabelOrHover = false;
this.gdata = null;
this.xyz = null;
this.target = null;
this.script = null;
this.colix = 0;
this.bgcolix = 0;
this.pointer = 0;
this.align = 0;
this.valign = 0;
this.atomX = 0;
this.atomY = 0;
this.atomZ = 2147483647;
this.movableX = 0;
this.movableY = 0;
this.movableZ = 0;
this.movableXPercent = 2147483647;
this.movableYPercent = 2147483647;
this.movableZPercent = 2147483647;
this.offsetX = 0;
this.offsetY = 0;
this.z = 1;
this.zSlab = -2147483648;
this.pymolOffset = null;
this.windowWidth = 0;
this.windowHeight = 0;
this.adjustForWindow = false;
this.boxWidth = 0;
this.boxHeight = 0;
this.boxX = 0;
this.boxY = 0;
this.modelIndex = -1;
this.visible = true;
this.hidden = false;
this.boxXY = null;
this.scalePixelsPerMicron = 0;
Clazz_instantialize (this, arguments);
}, J.modelset, "Object2d");
Clazz_prepareFields (c$, function () {
this.boxXY =  Clazz_newFloatArray (5, 0);
});
$_M(c$, "getScalePixelsPerMicron", 
function () {
return this.scalePixelsPerMicron;
});
$_M(c$, "setScalePixelsPerMicron", 
function (scalePixelsPerMicron) {
this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N");
$_M(c$, "setModel", 
function (modelIndex) {
this.modelIndex = modelIndex;
}, "~N");
$_M(c$, "setVisibility", 
function (TF) {
this.visible = TF;
}, "~B");
$_M(c$, "setXYZ", 
function (xyz, doAdjust) {
this.xyz = xyz;
if (xyz == null) this.zSlab = -2147483648;
if (doAdjust) {
this.valign = (xyz == null ? 0 : 4);
this.setAdjustForWindow (xyz == null);
}}, "JU.P3,~B");
$_M(c$, "setAdjustForWindow", 
function (TF) {
this.adjustForWindow = TF;
}, "~B");
$_M(c$, "setColix", 
function (colix) {
this.colix = colix;
}, "~N");
$_M(c$, "setColixO", 
function (value) {
this.colix = J.util.C.getColixO (value);
}, "~O");
$_M(c$, "setTranslucent", 
function (level, isBackground) {
if (isBackground) {
if (this.bgcolix != 0) this.bgcolix = J.util.C.getColixTranslucent3 (this.bgcolix, !Float.isNaN (level), level);
} else {
this.colix = J.util.C.getColixTranslucent3 (this.colix, !Float.isNaN (level), level);
}}, "~N,~B");
$_M(c$, "setBgColix", 
function (colix) {
this.bgcolix = colix;
}, "~N");
$_M(c$, "setBgColixO", 
function (value) {
this.bgcolix = (value == null ? 0 : J.util.C.getColixO (value));
}, "~O");
$_M(c$, "setMovableX", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableX = x;
this.movableXPercent = 2147483647;
}, "~N");
$_M(c$, "setMovableY", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableY = y;
this.movableYPercent = 2147483647;
}, "~N");
$_M(c$, "setMovableXPercent", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableX = 2147483647;
this.movableXPercent = x;
}, "~N");
$_M(c$, "setMovableYPercent", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableY = 2147483647;
this.movableYPercent = y;
}, "~N");
$_M(c$, "setMovableZPercent", 
function (z) {
if (this.valign != 4) this.valign = 0;
this.movableZ = 2147483647;
this.movableZPercent = z;
}, "~N");
$_M(c$, "setZs", 
function (z, zSlab) {
this.z = z;
this.zSlab = zSlab;
}, "~N,~N");
$_M(c$, "setXYZs", 
function (x, y, z, zSlab) {
this.setMovableX (x);
this.setMovableY (y);
this.setZs (z, zSlab);
}, "~N,~N,~N,~N");
$_M(c$, "setScript", 
function (script) {
this.script = (script == null || script.length == 0 ? null : script);
}, "~S");
$_M(c$, "getScript", 
function () {
return this.script;
});
$_M(c$, "setOffset", 
function (offset) {
this.offsetX = J.viewer.JC.getXOffset (offset);
this.offsetY = J.viewer.JC.getYOffset (offset);
this.pymolOffset = null;
this.valign = 0;
}, "~N");
$_M(c$, "setAlignmentLCR", 
function (align) {
if ("left".equals (align)) return this.setAlignment (1);
if ("center".equals (align)) return this.setAlignment (2);
if ("right".equals (align)) return this.setAlignment (3);
return false;
}, "~S");
$_M(c$, "setAlignment", 
function (align) {
if (this.align != align) {
this.align = align;
this.recalc ();
}return true;
}, "~N");
$_M(c$, "setPointer", 
function (pointer) {
this.pointer = pointer;
}, "~N");
$_M(c$, "setBoxOffsetsInWindow", 
function (margin, vMargin, vTop) {
var bw = this.boxWidth + margin;
var x = this.boxX;
if (x + bw > this.windowWidth) x = this.windowWidth - bw;
if (x < margin) x = margin;
this.boxX = x;
var bh = this.boxHeight;
var y = vTop;
if (y + bh > this.windowHeight) y = this.windowHeight - bh;
if (y < vMargin) y = vMargin;
this.boxY = y;
}, "~N,~N,~N");
$_M(c$, "setWindow", 
function (width, height, scalePixelsPerMicron) {
this.windowWidth = width;
this.windowHeight = height;
if (this.pymolOffset == null && this.scalePixelsPerMicron < 0 && scalePixelsPerMicron != 0) this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N,~N,~N");
$_M(c$, "checkObjectClicked", 
function (isAntialiased, x, y, bsVisible) {
if (this.hidden || this.script == null || this.modelIndex >= 0 && !bsVisible.get (this.modelIndex)) return false;
if (isAntialiased) {
x <<= 1;
y <<= 1;
}return (x >= this.boxX && x <= this.boxX + this.boxWidth && y >= this.boxY && y <= this.boxY + this.boxHeight);
}, "~B,~N,~N,JU.BS");
c$.setProperty = $_M(c$, "setProperty", 
function (propertyName, value, currentObject) {
if ("script" === propertyName) {
if (currentObject != null) currentObject.setScript (value);
return true;
}if ("xpos" === propertyName) {
if (currentObject != null) currentObject.setMovableX ((value).intValue ());
return true;
}if ("ypos" === propertyName) {
if (currentObject != null) currentObject.setMovableY ((value).intValue ());
return true;
}if ("%xpos" === propertyName) {
if (currentObject != null) currentObject.setMovableXPercent ((value).intValue ());
return true;
}if ("%ypos" === propertyName) {
if (currentObject != null) currentObject.setMovableYPercent ((value).intValue ());
return true;
}if ("%zpos" === propertyName) {
if (currentObject != null) currentObject.setMovableZPercent ((value).intValue ());
return true;
}if ("xypos" === propertyName) {
if (currentObject == null) return true;
var pt = value;
currentObject.setXYZ (null, true);
if (pt.z == 3.4028235E38) {
currentObject.setMovableX (Clazz_floatToInt (pt.x));
currentObject.setMovableY (Clazz_floatToInt (pt.y));
} else {
currentObject.setMovableXPercent (Clazz_floatToInt (pt.x));
currentObject.setMovableYPercent (Clazz_floatToInt (pt.y));
}return true;
}if ("xyz" === propertyName) {
if (currentObject != null) {
currentObject.setXYZ (value, true);
}return true;
}return false;
}, "~S,~O,J.modelset.Object2d");
});
Clazz_declarePackage ("J.modelset");
Clazz_load (["J.modelset.Object2d"], "J.modelset.Text", ["javajs.awt.Font", "JU.PT"], function () {
c$ = Clazz_decorateAsClass (function () {
this.fontScale = 0;
this.textUnformatted = null;
this.doFormatText = false;
this.lines = null;
this.font = null;
this.fid = 0;
this.ascent = 0;
this.descent = 0;
this.lineHeight = 0;
this.textWidth = 0;
this.textHeight = 0;
this.text = null;
this.widths = null;
this.viewer = null;
this.image = null;
this.imageScale = 1;
this.boxYoff2 = 0;
this.xAdj = 0;
this.yAdj = 0;
this.y0 = 0;
this.pointerPt = null;
Clazz_instantialize (this, arguments);
}, J.modelset, "Text", J.modelset.Object2d);
$_V(c$, "setScalePixelsPerMicron", 
function (scalePixelsPerMicron) {
this.fontScale = 0;
this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N");
$_M(c$, "getText", 
function () {
return this.text;
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.modelset.Text, []);
});
c$.newLabel = $_M(c$, "newLabel", 
function (gdata, font, text, colix, bgcolix, align, scalePixelsPerMicron, value) {
var t =  new J.modelset.Text ();
t.set (gdata, font, colix, align, true, scalePixelsPerMicron, value);
t.setText (text);
t.bgcolix = bgcolix;
return t;
}, "J.util.GData,javajs.awt.Font,~S,~N,~N,~N,~N,~A");
c$.newEcho = $_M(c$, "newEcho", 
function (viewer, gdata, font, target, colix, valign, align, scalePixelsPerMicron) {
var t =  new J.modelset.Text ();
t.set (gdata, font, colix, align, false, scalePixelsPerMicron, null);
t.viewer = viewer;
t.target = target;
if (target.equals ("error")) valign = 1;
t.valign = valign;
t.z = 2;
t.zSlab = -2147483648;
return t;
}, "J.viewer.Viewer,J.util.GData,javajs.awt.Font,~S,~N,~N,~N,~N");
$_M(c$, "set", 
function (gdata, font, colix, align, isLabelOrHover, scalePixelsPerMicron, value) {
this.scalePixelsPerMicron = scalePixelsPerMicron;
this.gdata = gdata;
this.isLabelOrHover = isLabelOrHover;
this.colix = colix;
this.align = align;
this.pymolOffset = value;
this.setFont (font, isLabelOrHover);
}, "J.util.GData,javajs.awt.Font,~N,~N,~B,~N,~A");
$_M(c$, "getFontMetrics", 
function () {
this.descent = this.font.getDescent ();
this.ascent = this.font.getAscent ();
this.lineHeight = this.ascent + this.descent;
});
$_M(c$, "setFontFromFid", 
function (fid) {
if (this.fid == fid) return;
this.fontScale = 0;
this.setFont (javajs.awt.Font.getFont3D (fid), true);
}, "~N");
$_M(c$, "setText", 
function (text) {
if (this.image != null) this.getFontMetrics ();
this.image = null;
text = this.fixText (text);
if (this.text != null && this.text.equals (text)) return;
this.text = text;
this.textUnformatted = text;
this.doFormatText = (this.viewer != null && text != null && (text.indexOf ("%{") >= 0 || text.indexOf ("@{") >= 0));
if (!this.doFormatText) this.recalc ();
}, "~S");
$_M(c$, "setImage", 
function (image) {
this.image = image;
this.recalc ();
}, "~O");
$_M(c$, "setScale", 
function (scale) {
this.imageScale = scale;
this.recalc ();
}, "~N");
$_M(c$, "setFont", 
function (f3d, doAll) {
this.font = f3d;
if (this.font == null) return;
this.getFontMetrics ();
if (!doAll) return;
this.fid = this.font.fid;
this.recalc ();
}, "javajs.awt.Font,~B");
$_M(c$, "setFontScale", 
function (scale) {
if (this.fontScale == scale) return;
this.fontScale = scale;
if (this.fontScale != 0) this.setFont (this.gdata.getFont3DScaled (this.font, scale), true);
}, "~N");
$_M(c$, "fixText", 
function (text) {
if (text == null || text.length == 0) return null;
var pt;
while ((pt = text.indexOf ("\n")) >= 0) text = text.substring (0, pt) + "|" + text.substring (pt + 1);

return text;
}, "~S");
$_V(c$, "recalc", 
function () {
if (this.image != null) {
this.textWidth = this.textHeight = 0;
this.boxWidth = this.viewer.apiPlatform.getImageWidth (this.image) * this.fontScale * this.imageScale;
this.boxHeight = this.viewer.apiPlatform.getImageHeight (this.image) * this.fontScale * this.imageScale;
this.ascent = 0;
return;
}if (this.text == null) {
this.text = null;
this.lines = null;
this.widths = null;
return;
}if (this.font == null) return;
this.lines = JU.PT.split (this.text, "|");
this.textWidth = 0;
this.widths =  Clazz_newIntArray (this.lines.length, 0);
for (var i = this.lines.length; --i >= 0; ) this.textWidth = Math.max (this.textWidth, this.widths[i] = this.stringWidth (this.lines[i]));

this.textHeight = this.lines.length * this.lineHeight;
this.boxWidth = this.textWidth + (this.fontScale >= 2 ? 16 : 8);
this.boxHeight = this.textHeight + (this.fontScale >= 2 ? 16 : 8);
});
$_M(c$, "formatText", 
function () {
this.text = (this.viewer == null ? this.textUnformatted : this.viewer.formatText (this.textUnformatted));
this.recalc ();
});
$_M(c$, "setPosition", 
function (viewer, width, height, scalePixelsPerMicron, imageFontScaling, isExact, boxXY) {
if (boxXY == null) boxXY = this.boxXY;
 else this.boxXY = boxXY;
this.setWindow (width, height, scalePixelsPerMicron);
if (scalePixelsPerMicron != 0 && this.scalePixelsPerMicron != 0) this.setFontScale (scalePixelsPerMicron / this.scalePixelsPerMicron);
 else if (this.fontScale != imageFontScaling) this.setFontScale (imageFontScaling);
if (this.doFormatText) this.formatText ();
var dx = this.offsetX * imageFontScaling;
var dy = this.offsetY * imageFontScaling;
this.xAdj = (this.fontScale >= 2 ? 8 : 4);
this.yAdj = this.ascent - this.lineHeight + this.xAdj;
if (this.isLabelOrHover) {
boxXY[0] = this.movableX;
boxXY[1] = this.movableY;
if (this.pymolOffset != null) {
var pixelsPerAngstrom = viewer.scaleToScreen (this.z, 1000);
var pz = this.pymolOffset[3];
var dz = (pz < 0 ? -1 : 1) * Math.max (0, Math.abs (pz) - 1) * pixelsPerAngstrom;
this.z -= Clazz_floatToInt (dz);
pixelsPerAngstrom = viewer.scaleToScreen (this.z, 1000);
dx = this.getPymolXYOffset (this.pymolOffset[1], this.textWidth, pixelsPerAngstrom);
dy = -this.getPymolXYOffset (-this.pymolOffset[2], this.ascent - this.descent, pixelsPerAngstrom);
this.xAdj = (this.fontScale >= 2 ? 8 : 4);
this.yAdj = 0;
dy += this.descent;
boxXY[0] = this.movableX - this.xAdj;
boxXY[1] = this.movableY - this.yAdj;
this.y0 = this.movableY - dy - this.descent;
isExact = true;
this.boxYoff2 = -2;
} else {
this.boxYoff2 = 0;
}J.modelset.Text.setBoxXY (this.boxWidth, this.boxHeight, dx, dy, boxXY, isExact);
} else {
this.setPos (this.fontScale);
}this.boxX = boxXY[0];
this.boxY = boxXY[1];
if (this.adjustForWindow) this.setBoxOffsetsInWindow (0, this.isLabelOrHover ? 16 * this.fontScale + this.lineHeight : 0, this.boxY - this.textHeight);
if (!isExact) this.y0 = this.boxY + this.yAdj;
}, "J.viewer.Viewer,~N,~N,~N,~N,~B,~A");
$_M(c$, "getPymolXYOffset", 
function (off, width, ppa) {
var f = (off < -1 ? -1 : off > 1 ? 0 : (off - 1) / 2);
off = (off < -1 || off > 1 ? off + (off < 0 ? 1 : -1) : 0);
return f * width + off * ppa;
}, "~N,~N,~N");
$_M(c$, "setPos", 
function (scale) {
var xLeft;
var xCenter;
var xRight;
var is3dEcho = (this.xyz != null);
if (this.valign == 0 || this.valign == 4) {
var x = (this.movableXPercent != 2147483647 ? Clazz_doubleToInt (this.movableXPercent * this.windowWidth / 100) : is3dEcho ? this.movableX : this.movableX * scale);
var offsetX = this.offsetX * scale;
xLeft = xRight = xCenter = x + offsetX;
} else {
xLeft = 5 * scale;
xCenter = Clazz_doubleToInt (this.windowWidth / 2);
xRight = this.windowWidth - xLeft;
}this.boxXY[0] = xLeft;
switch (this.align) {
case 2:
this.boxXY[0] = xCenter - this.boxWidth / 2;
break;
case 3:
this.boxXY[0] = xRight - this.boxWidth;
}
this.boxXY[1] = 0;
switch (this.valign) {
case 1:
break;
case 3:
this.boxXY[1] = Clazz_doubleToInt (this.windowHeight / 2);
break;
case 2:
this.boxXY[1] = this.windowHeight;
break;
default:
var y = (this.movableYPercent != 2147483647 ? Clazz_doubleToInt (this.movableYPercent * this.windowHeight / 100) : is3dEcho ? this.movableY : this.movableY * scale);
this.boxXY[1] = (is3dEcho ? y : (this.windowHeight - y)) + this.offsetY * scale;
}
if (this.align == 2) this.boxXY[1] -= (this.image != null ? this.boxHeight : this.xyz != null ? this.boxHeight : this.ascent - this.boxHeight) / 2;
 else if (this.image != null) this.boxXY[1] -= 0;
 else if (this.xyz != null) this.boxXY[1] -= Clazz_doubleToInt (this.ascent / 2);
}, "~N");
c$.setBoxXY = $_M(c$, "setBoxXY", 
function (boxWidth, boxHeight, xOffset, yOffset, boxXY, isExact) {
var xBoxOffset;
var yBoxOffset;
if (xOffset > 0 || isExact) {
xBoxOffset = xOffset;
} else {
xBoxOffset = -boxWidth;
if (xOffset == 0) xBoxOffset /= 2;
 else xBoxOffset += xOffset;
}if (isExact) {
yBoxOffset = -yOffset;
} else if (yOffset < 0) {
yBoxOffset = -boxHeight + yOffset;
} else if (yOffset == 0) {
yBoxOffset = -boxHeight / 2;
} else {
yBoxOffset = yOffset;
}boxXY[0] += xBoxOffset;
boxXY[1] += yBoxOffset;
boxXY[2] = boxWidth;
boxXY[3] = boxHeight;
}, "~N,~N,~N,~N,~A,~B");
$_M(c$, "stringWidth", 
function (str) {
var w = 0;
var f = 1;
var subscale = 1;
if (str == null) return 0;
if (str.indexOf ("<su") < 0) return this.font.stringWidth (str);
var len = str.length;
var s;
for (var i = 0; i < len; i++) {
if (str.charAt (i) == '<') {
if (i + 4 < len && ((s = str.substring (i, i + 5)).equals ("<sub>") || s.equals ("<sup>"))) {
i += 4;
f = subscale;
continue;
}if (i + 5 < len && ((s = str.substring (i, i + 6)).equals ("</sub>") || s.equals ("</sup>"))) {
i += 5;
f = 1;
continue;
}}w += this.font.stringWidth (str.substring (i, i + 1)) * f;
}
return w;
}, "~S");
$_M(c$, "setXYA", 
function (xy, i) {
if (i == 0) {
xy[2] = this.boxX;
switch (this.align) {
case 2:
xy[2] += this.boxWidth / 2;
break;
case 3:
xy[2] += this.boxWidth - this.xAdj;
break;
default:
xy[2] += this.xAdj;
}
xy[0] = xy[2];
xy[1] = this.y0;
}switch (this.align) {
case 2:
xy[0] = xy[2] - Clazz_doubleToInt (this.widths[i] / 2);
break;
case 3:
xy[0] = xy[2] - this.widths[i];
}
xy[1] += this.lineHeight;
}, "~A,~N");
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.Shape", "java.util.Hashtable"], "J.shape.Object2dShape", ["JU.P3", "J.util.Logger", "$.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.objects = null;
this.currentObject = null;
this.currentFont = null;
this.currentColor = null;
this.currentBgColor = null;
this.currentTranslucentLevel = 0;
this.currentBgTranslucentLevel = 0;
this.thisID = null;
this.isHover = false;
this.isAll = false;
Clazz_instantialize (this, arguments);
}, J.shape, "Object2dShape", J.shape.Shape);
Clazz_prepareFields (c$, function () {
this.objects =  new java.util.Hashtable ();
});
$_M(c$, "setPropOS", 
function (propertyName, value, bsSelected) {
if ("allOff" === propertyName) {
this.currentObject = null;
this.isAll = true;
this.objects =  new java.util.Hashtable ();
return;
}if ("delete" === propertyName) {
if (this.currentObject == null) {
if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || J.util.Txt.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
e.remove ();
}}
}return;
}this.objects.remove (this.currentObject.target);
this.currentObject = null;
return;
}if ("off" === propertyName) {
if (this.isAll) {
this.objects =  new java.util.Hashtable ();
this.isAll = false;
this.currentObject = null;
}if (this.currentObject == null) {
return;
}this.objects.remove (this.currentObject.target);
this.currentObject = null;
return;
}if ("model" === propertyName) {
var modelIndex = (value).intValue ();
if (this.currentObject == null) {
if (this.isAll) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setModel (modelIndex);

return;
}this.currentObject.setModel (modelIndex);
return;
}if ("align" === propertyName) {
var align = value;
if (this.currentObject == null) {
if (this.isAll) for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) obj.setAlignmentLCR (align);

return;
}if (!this.currentObject.setAlignmentLCR (align)) J.util.Logger.error ("unrecognized align:" + align);
return;
}if ("bgcolor" === propertyName) {
this.currentBgColor = value;
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setBgColixO (value);
}
}return;
}this.currentObject.setBgColixO (value);
return;
}if ("color" === propertyName) {
this.currentColor = value;
if (this.currentObject == null) {
if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || J.util.Txt.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
text.setColixO (value);
}}
}return;
}this.currentObject.setColixO (value);
return;
}if ("target" === propertyName) {
var target = value;
this.isAll = target.equals ("all");
if (this.isAll || target.equals ("none")) {
this.currentObject = null;
}return;
}var isBackground;
if ((isBackground = ("bgtranslucency" === propertyName)) || "translucency" === propertyName) {
var isTranslucent = ("translucent" === value);
if (isBackground) this.currentBgTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
 else this.currentTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setTranslucent (this.translucentLevel, isBackground);
}
}return;
}this.currentObject.setTranslucent (this.translucentLevel, isBackground);
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (text.modelIndex == modelIndex) {
e.remove ();
} else if (text.modelIndex > modelIndex) {
text.modelIndex--;
}}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_V(c$, "initModelSet", 
function () {
this.currentObject = null;
this.isAll = false;
});
$_V(c$, "setVisibilityFlags", 
function (bs) {
if (!this.isHover) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setVisibility (t.modelIndex < 0 || bs.get (t.modelIndex));

}, "JU.BS");
$_V(c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
if (this.isHover || modifiers == 0) return null;
var isAntialiased = this.viewer.isAntialiased ();
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
var s = obj.getScript ();
if (s != null) {
this.viewer.evalStringQuiet (s);
}var map =  new java.util.Hashtable ();
map.put ("pt", (obj.xyz == null ?  new JU.P3 () : obj.xyz));
var modelIndex = obj.modelIndex;
if (modelIndex < 0) modelIndex = 0;
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.viewer.getModelNumberDotted (modelIndex));
map.put ("id", obj.target);
map.put ("type", "echo");
return map;
}}
return null;
}, "~N,~N,~N,JU.BS,~B");
$_V(c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (this.isHover) return false;
var haveScripts = false;
var isAntialiased = this.viewer.isAntialiased ();
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
var s = obj.getScript ();
if (s != null) {
haveScripts = true;
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
this.viewer.setCursor (12);
return true;
}}}
if (haveScripts) this.viewer.setCursor (0);
return false;
}, "~N,~N,JU.BS");
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.Object2dShape"], "J.shape.TextShape", null, function () {
c$ = Clazz_declareType (J.shape, "TextShape", J.shape.Object2dShape);
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropTS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_M(c$, "setPropTS", 
function (propertyName, value, bsSelected) {
if ("text" === propertyName) {
var text = value;
if (this.currentObject == null) {
if (this.isAll) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setText (text);

return;
}(this.currentObject).setText (text);
return;
}if ("font" === propertyName) {
this.currentFont = value;
if (this.currentObject == null) {
if (this.isAll) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setFont (this.currentFont, true);

return;
}(this.currentObject).setFont (this.currentFont, true);
(this.currentObject).setFontScale (0);
return;
}this.setPropOS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.AtomShape", "java.util.Hashtable"], "J.shape.Labels", ["javajs.awt.Font", "JU.AU", "$.BS", "J.constant.EnumPalette", "J.modelset.LabelToken", "$.Text", "J.util.BSUtil", "$.C", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.strings = null;
this.formats = null;
this.bgcolixes = null;
this.fids = null;
this.offsets = null;
this.atomLabels = null;
this.text = null;
this.labelBoxes = null;
this.bsFontSet = null;
this.bsBgColixSet = null;
this.defaultOffset = 0;
this.defaultAlignment = 0;
this.defaultZPos = 0;
this.defaultFontId = 0;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultPaletteID = 0;
this.defaultPointer = 0;
this.zeroFontId = 0;
this.defaultsOnlyForNone = true;
this.setDefaults = false;
this.isScaled = false;
this.scalePixelsPerMicron = 0;
this.pickedAtom = -1;
this.pickedOffset = 0;
this.pickedX = 0;
this.pickedY = 0;
Clazz_instantialize (this, arguments);
}, J.shape, "Labels", J.shape.AtomShape);
Clazz_prepareFields (c$, function () {
this.atomLabels =  new java.util.Hashtable ();
});
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shape.Labels, "initShape", []);
this.defaultFontId = this.zeroFontId = this.gdata.getFont3DFSS ("SansSerif", "Plain", 13).fid;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultOffset = J.shape.Labels.zeroOffset;
this.defaultZPos = 0;
this.translucentAllowed = false;
});
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.isActive = true;
if ("setDefaults" === propertyName) {
this.setDefaults = (value).booleanValue ();
return;
}if ("color" === propertyName) {
var pid = J.constant.EnumPalette.pidOf (value);
var colix = J.util.C.getColixO (value);
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setLabelColix (i, colix, pid);

if (this.setDefaults || !this.defaultsOnlyForNone) {
this.defaultColix = colix;
this.defaultPaletteID = pid;
}return;
}if ("scalereference" === propertyName) {
if (this.strings == null) return;
var val = (value).floatValue ();
var scalePixelsPerMicron = (val == 0 ? 0 : 10000 / val);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) {
if (this.strings.length <= i) continue;
this.text = this.getLabel (i);
if (this.text == null) {
this.text = J.modelset.Text.newLabel (this.gdata, null, this.strings[i], 0, 0, 0, scalePixelsPerMicron, null);
this.putLabel (i, this.text);
} else {
this.text.setScalePixelsPerMicron (scalePixelsPerMicron);
}}
return;
}if ("label" === propertyName) {
this.setScaling ();
var strLabel = value;
var tokens = (strLabel == null || strLabel.length == 0 ? J.shape.Labels.nullToken : [null]);
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setLabel (tokens, strLabel, i);

return;
}if ("labels" === propertyName) {
this.setScaling ();
var labels = value;
for (var i = bsSelected.nextSetBit (0), pt = 0; i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) {
var strLabel = labels.get (pt++);
var tokens = (strLabel == null || strLabel.length == 0 ? J.shape.Labels.nullToken : [null]);
this.setLabel (tokens, strLabel, i);
}
return;
}if ("clearBoxes" === propertyName) {
this.labelBoxes = null;
return;
}if ("translucency" === propertyName || "bgtranslucency" === propertyName) {
return;
}if ("bgcolor" === propertyName) {
this.isActive = true;
if (this.bsBgColixSet == null) this.bsBgColixSet =  new JU.BS ();
var bgcolix = J.util.C.getColixO (value);
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setBgcolix (i, bgcolix);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultBgcolix = bgcolix;
return;
}if (this.bsFontSet == null) this.bsFontSet =  new JU.BS ();
if ("textLabels" === propertyName) {
this.setScaling ();
var labels = value;
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setTextLabel (i, labels.get (Integer.$valueOf (i)));

return;
}if ("fontsize" === propertyName) {
var fontsize = (value).intValue ();
if (fontsize < 0) {
this.fids = null;
return;
}var fid = this.gdata.getFontFid (fontsize);
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("font" === propertyName) {
var fid = (value).fid;
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("offset" === propertyName || "offsetexact" === propertyName) {
if (!(Clazz_instanceOf (value, Integer))) {
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setPymolOffset (i, value);

return;
}var offset = (value).intValue ();
var isExact = (propertyName === "offsetexact");
if (offset == 0) offset = 32767;
 else if (offset == J.shape.Labels.zeroOffset) offset = 0;
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setOffsets (i, offset, isExact);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultOffset = offset;
return;
}if ("align" === propertyName) {
var type = value;
var alignment = 1;
if (type.equalsIgnoreCase ("right")) alignment = 3;
 else if (type.equalsIgnoreCase ("center")) alignment = 2;
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setAlignment (i, alignment);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultAlignment = alignment;
return;
}if ("pointer" === propertyName) {
var pointer = (value).intValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setPointer (i, pointer);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultPointer = pointer;
return;
}if ("front" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setFront (i, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 32 : 0);
return;
}if ("group" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) this.setGroup (i, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 16 : 0);
return;
}if ("display" === propertyName || "toggleLabel" === propertyName) {
var mode = ("toggleLabel" === propertyName ? 0 : (value).booleanValue () ? 1 : -1);
if (this.mads == null) this.mads =  Clazz_newShortArray (this.atomCount, 0);
var strLabelPDB = null;
var tokensPDB = null;
var strLabelUNK = null;
var tokensUNK = null;
var strLabel;
var tokens;
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < this.atomCount; i = bsSelected.nextSetBit (i + 1)) {
var atom = this.atoms[i];
if (this.formats == null || i >= this.formats.length) this.formats = JU.AU.ensureLengthS (this.formats, i + 1);
if (this.strings != null && this.strings.length > i && this.strings[i] != null) {
this.mads[i] = (mode == 0 && this.mads[i] < 0 || mode == 1 ? 1 : -1);
} else {
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
this.strings = JU.AU.ensureLengthS (this.strings, i + 1);
if (atom.getGroup3 (false).equals ("UNK")) {
if (strLabelUNK == null) {
strLabelUNK = this.viewer.getStandardLabelFormat (1);
tokensUNK = J.modelset.LabelToken.compile (this.viewer, strLabelUNK, '\0', null);
}strLabel = strLabelUNK;
tokens = tokensUNK;
} else {
if (strLabelPDB == null) {
strLabelPDB = this.viewer.getStandardLabelFormat (2);
tokensPDB = J.modelset.LabelToken.compile (this.viewer, strLabelPDB, '\0', null);
}strLabel = strLabelPDB;
tokens = tokensPDB;
}this.strings[i] = J.modelset.LabelToken.formatLabelAtomArray (this.viewer, atom, tokens, '\0', null);
this.formats[i] = strLabel;
this.bsSizeSet.set (i);
if ((this.bsBgColixSet == null || !this.bsBgColixSet.get (i)) && this.defaultBgcolix != 0) this.setBgcolix (i, this.defaultBgcolix);
this.mads[i] = (mode >= 0 ? 1 : -1);
}atom.setShapeVisibility (this.myVisibilityFlag, this.strings != null && i < this.strings.length && this.strings[i] != null && this.mads[i] >= 0);
}
return;
}if (propertyName.startsWith ("label:")) {
this.setScaling ();
this.setLabel ( new Array (1), propertyName.substring (6), (value).intValue ());
return;
}if (propertyName === "deleteModelAtoms") {
this.labelBoxes = null;
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.fids = JU.AU.deleteElements (this.fids, firstAtomDeleted, nAtomsDeleted);
this.bgcolixes = JU.AU.deleteElements (this.bgcolixes, firstAtomDeleted, nAtomsDeleted);
this.offsets = JU.AU.deleteElements (this.offsets, firstAtomDeleted, nAtomsDeleted);
this.formats = JU.AU.deleteElements (this.formats, firstAtomDeleted, nAtomsDeleted);
this.strings = JU.AU.deleteElements (this.strings, firstAtomDeleted, nAtomsDeleted);
J.util.BSUtil.deleteBits (this.bsFontSet, bsSelected);
J.util.BSUtil.deleteBits (this.bsBgColixSet, bsSelected);
}this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_M(c$, "setPymolOffset", 
function (i, value) {
var text = this.getLabel (i);
if (text == null) {
var fid = (this.bsFontSet != null && this.bsFontSet.get (i) ? this.fids[i] : -1);
if (fid < 0) this.setFont (i, fid = this.defaultFontId);
var font = javajs.awt.Font.getFont3D (fid);
var colix = this.getColix2 (i, this.atoms[i], false);
text = J.modelset.Text.newLabel (this.gdata, font, this.strings[i], colix, this.getColix2 (i, this.atoms[i], true), 0, this.scalePixelsPerMicron, value);
this.setTextLabel (i, text);
} else {
text.pymolOffset = value;
}}, "~N,~A");
$_M(c$, "setScaling", 
function () {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
this.isScaled = this.viewer.getBoolean (603979845);
this.scalePixelsPerMicron = (this.isScaled ? this.viewer.getScalePixelsPerAngstrom (false) * 10000 : 0);
});
$_M(c$, "setTextLabel", 
function (i, t) {
if (t == null) return;
var label = t.getText ();
var atom = this.atoms[i];
this.addString (atom, i, label, label);
atom.setShapeVisibility (this.myVisibilityFlag, true);
if (t.colix >= 0) this.setLabelColix (i, t.colix, J.constant.EnumPalette.UNKNOWN.id);
this.setFont (i, t.font.fid);
this.putLabel (i, t);
}, "~N,J.modelset.Text");
$_M(c$, "setLabel", 
function (temp, strLabel, i) {
var atom = this.atoms[i];
var tokens = temp[0];
if (tokens == null) tokens = temp[0] = J.modelset.LabelToken.compile (this.viewer, strLabel, '\0', null);
var label = (tokens == null ? null : J.modelset.LabelToken.formatLabelAtomArray (this.viewer, atom, tokens, '\0', null));
this.addString (atom, i, label, strLabel);
this.text = this.getLabel (i);
if (this.isScaled) {
this.text = J.modelset.Text.newLabel (this.gdata, null, label, 0, 0, 0, this.scalePixelsPerMicron, null);
this.putLabel (i, this.text);
} else if (this.text != null && label != null) {
this.text.setText (label);
}if (this.defaultOffset != J.shape.Labels.zeroOffset) this.setOffsets (i, this.defaultOffset, false);
if (this.defaultAlignment != 1) this.setAlignment (i, this.defaultAlignment);
if ((this.defaultZPos & 32) != 0) this.setFront (i, true);
 else if ((this.defaultZPos & 16) != 0) this.setGroup (i, true);
if (this.defaultPointer != 0) this.setPointer (i, this.defaultPointer);
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.setLabelColix (i, this.defaultColix, this.defaultPaletteID);
if (this.defaultBgcolix != 0) this.setBgcolix (i, this.defaultBgcolix);
if (this.defaultFontId != this.zeroFontId) this.setFont (i, this.defaultFontId);
}, "~A,~S,~N");
$_M(c$, "addString", 
function (atom, i, label, strLabel) {
atom.setShapeVisibility (this.myVisibilityFlag, label != null);
if (this.strings == null || i >= this.strings.length) this.strings = JU.AU.ensureLengthS (this.strings, i + 1);
if (this.formats == null || i >= this.formats.length) this.formats = JU.AU.ensureLengthS (this.formats, i + 1);
this.strings[i] = label;
this.formats[i] = (strLabel != null && strLabel.indexOf ("%{") >= 0 ? label : strLabel);
this.bsSizeSet.setBitTo (i, (strLabel != null));
}, "J.modelset.Atom,~N,~S,~S");
$_V(c$, "getProperty", 
function (property, index) {
if (property.equals ("offsets")) return this.offsets;
if (property.equals ("label")) return (this.strings != null && index < this.strings.length && this.strings[index] != null ? this.strings[index] : "");
return null;
}, "~S,~N");
$_M(c$, "putLabel", 
function (i, text) {
if (text == null) this.atomLabels.remove (Integer.$valueOf (i));
 else this.atomLabels.put (Integer.$valueOf (i), text);
}, "~N,J.modelset.Text");
$_M(c$, "getLabel", 
function (i) {
return this.atomLabels.get (Integer.$valueOf (i));
}, "~N");
$_M(c$, "putBox", 
function (i, boxXY) {
if (this.labelBoxes == null) this.labelBoxes =  new java.util.Hashtable ();
this.labelBoxes.put (Integer.$valueOf (i), boxXY);
}, "~N,~A");
$_M(c$, "getBox", 
function (i) {
if (this.labelBoxes == null) return null;
return this.labelBoxes.get (Integer.$valueOf (i));
}, "~N");
$_M(c$, "setLabelColix", 
function (i, colix, pid) {
this.setColixAndPalette (colix, pid, i);
if (this.colixes != null && ((this.text = this.getLabel (i)) != null)) this.text.setColix (this.colixes[i]);
}, "~N,~N,~N");
$_M(c$, "setBgcolix", 
function (i, bgcolix) {
if (this.bgcolixes == null || i >= this.bgcolixes.length) {
if (bgcolix == 0) return;
this.bgcolixes = JU.AU.ensureLengthShort (this.bgcolixes, i + 1);
}this.bgcolixes[i] = bgcolix;
this.bsBgColixSet.setBitTo (i, bgcolix != 0);
this.text = this.getLabel (i);
if (this.text != null) this.text.setBgColix (bgcolix);
}, "~N,~N");
$_M(c$, "setOffsets", 
function (i, offset, isExact) {
if (this.offsets == null || i >= this.offsets.length) {
if (offset == 0) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & 255) | (offset << 8);
if (isExact) this.offsets[i] |= 128;
this.text = this.getLabel (i);
if (this.text != null) this.text.setOffset (offset);
}, "~N,~N,~B");
$_M(c$, "setAlignment", 
function (i, alignment) {
if (this.offsets == null || i >= this.offsets.length) {
if (alignment == 1) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -13) | (alignment << 2);
this.text = this.getLabel (i);
if (this.text != null) this.text.setAlignment (alignment);
}, "~N,~N");
c$.getAlignment = $_M(c$, "getAlignment", 
function (offsetFull) {
return (offsetFull & 12) >> 2;
}, "~N");
$_M(c$, "setPointer", 
function (i, pointer) {
if (this.offsets == null || i >= this.offsets.length) {
if (pointer == 0) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -4) + pointer;
this.text = this.getLabel (i);
if (this.text != null) this.text.setPointer (pointer);
}, "~N,~N");
$_M(c$, "setFront", 
function (i, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -49) + (TF ? 32 : 0);
}, "~N,~B");
$_M(c$, "setGroup", 
function (i, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = JU.AU.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -49) + (TF ? 16 : 0);
}, "~N,~B");
$_M(c$, "setFont", 
function (i, fid) {
if (this.fids == null || i >= this.fids.length) {
if (fid == this.zeroFontId) return;
this.fids = JU.AU.ensureLengthByte (this.fids, i + 1);
}this.fids[i] = fid;
this.bsFontSet.set (i);
this.text = this.getLabel (i);
if (this.text != null) {
this.text.setFontFromFid (fid);
}}, "~N,~N");
$_V(c$, "setModelClickability", 
function () {
if (this.strings == null) return;
for (var i = this.strings.length; --i >= 0; ) {
var label = this.strings[i];
if (label != null && this.modelSet.atoms.length > i && !this.modelSet.isAtomHidden (i)) this.modelSet.atoms[i].setClickable (this.myVisibilityFlag);
}
});
$_V(c$, "getShapeState", 
function () {
if (!this.isActive || this.bsSizeSet == null) return "";
return this.viewer.getShapeState (this);
});
$_V(c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
if (this.viewer.getPickingMode () != 2 || this.labelBoxes == null) return false;
if (prevX == -2147483648) {
var iAtom = this.findNearestLabel (x, y);
if (iAtom >= 0) {
this.pickedAtom = iAtom;
this.pickedX = x;
this.pickedY = y;
this.pickedOffset = (this.offsets == null || this.pickedAtom >= this.offsets.length ? 0 : this.offsets[this.pickedAtom]) >> 8;
return true;
}return false;
}if (prevX == 2147483647) {
this.pickedAtom = -1;
return false;
}if (this.pickedAtom < 0) return false;
this.move2D (this.pickedAtom, x, y);
return true;
}, "~N,~N,~N,~N,~N,JU.BS");
$_M(c$, "findNearestLabel", 
function (x, y) {
if (this.labelBoxes == null) return -1;
var dmin = 3.4028235E38;
var imin = -1;
var zmin = 3.4028235E38;
for (var entry, $entry = this.labelBoxes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
if (!this.atoms[entry.getKey ().intValue ()].isVisible (this.myVisibilityFlag)) continue;
var boxXY = entry.getValue ();
var dx = x - boxXY[0];
var dy = y - boxXY[1];
if (dx <= 0 || dy <= 0 || dx >= boxXY[2] || dy >= boxXY[3] || boxXY[4] > zmin) continue;
zmin = boxXY[4];
var d = Math.min (Math.abs (dx - boxXY[2] / 2), Math.abs (dy - boxXY[3] / 2));
if (d <= dmin) {
dmin = d;
imin = entry.getKey ().intValue ();
}}
return imin;
}, "~N,~N");
$_M(c$, "move2D", 
function (pickedAtom, x, y) {
var xOffset = J.viewer.JC.getXOffset (this.pickedOffset);
var yOffset = -J.viewer.JC.getYOffset (this.pickedOffset);
xOffset += x - this.pickedX;
yOffset += this.pickedY - y;
var offset = J.viewer.JC.getOffset (xOffset, yOffset);
if (offset == 0) offset = 32767;
 else if (offset == J.shape.Labels.zeroOffset) offset = 0;
this.setOffsets (pickedAtom, offset, true);
}, "~N,~N,~N");
$_M(c$, "getColix2", 
function (i, atom, isBg) {
var colix;
if (isBg) {
colix = (this.bgcolixes == null || i >= this.bgcolixes.length) ? 0 : this.bgcolixes[i];
} else {
colix = (this.colixes == null || i >= this.colixes.length) ? 0 : this.colixes[i];
colix = J.util.C.getColixInherited (colix, atom.getColix ());
if (J.util.C.isColixTranslucent (colix)) colix = J.util.C.getColixTranslucent3 (colix, false, 0);
}return colix;
}, "~N,J.modelset.Atom,~B");
Clazz_defineStatics (c$,
"zeroOffset", 1028);
c$.nullToken = c$.prototype.nullToken = [null];
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.TextShape"], "J.shape.Echo", ["J.modelset.Object2d", "$.Text", "J.util.Txt"], function () {
c$ = Clazz_declareType (J.shape, "Echo", J.shape.TextShape);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shape.Echo, "initShape", []);
this.setProperty ("target", "top", null);
});
$_V(c$, "setProperty", 
function (propertyName, value, bs) {
if ("scalereference" === propertyName) {
if (this.currentObject != null) {
var val = (value).floatValue ();
this.currentObject.setScalePixelsPerMicron (val == 0 ? 0 : 10000 / val);
}return;
}if ("point" === propertyName) {
if (this.currentObject == null) return;
var t = this.currentObject;
t.pointerPt = (value == null ? null : value);
t.pointer = (value == null ? 0 : 1);
return;
}if ("xyz" === propertyName) {
if (this.currentObject != null && this.viewer.getBoolean (603979845)) this.currentObject.setScalePixelsPerMicron (this.viewer.getScalePixelsPerAngstrom (false) * 10000);
}if ("scale" === propertyName) {
if (this.currentObject == null) {
if (this.isAll) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setScale ((value).floatValue ());

return;
}(this.currentObject).setScale ((value).floatValue ());
return;
}if ("image" === propertyName) {
if (this.currentObject == null) {
if (this.isAll) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setImage (value);

return;
}(this.currentObject).setImage (value);
return;
}if ("thisID" === propertyName) {
var target = value;
this.currentObject = this.objects.get (target);
if (this.currentObject == null && J.util.Txt.isWild (target)) this.thisID = target.toUpperCase ();
return;
}if ("hidden" === propertyName) {
var isHidden = (value).booleanValue ();
if (this.currentObject == null) {
if (this.isAll || this.thisID != null) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) if (this.isAll || J.util.Txt.isMatch (t.target.toUpperCase (), this.thisID, true, true)) t.hidden = isHidden;

return;
}(this.currentObject).hidden = isHidden;
return;
}if (J.modelset.Object2d.setProperty (propertyName, value, this.currentObject)) return;
if ("target" === propertyName) {
this.thisID = null;
var target = (value).intern ().toLowerCase ();
if (target === "none" || target === "all") {
} else {
this.isAll = false;
var text = this.objects.get (target);
if (text == null) {
var valign = 0;
var halign = 1;
if ("top" === target) {
valign = 1;
halign = 2;
} else if ("middle" === target) {
valign = 3;
halign = 2;
} else if ("bottom" === target) {
valign = 2;
}text = J.modelset.Text.newEcho (this.viewer, this.gdata, this.gdata.getFont3DFS ("Serif", 20), target, 10, valign, halign, 0);
text.setAdjustForWindow (true);
this.objects.put (target, text);
if (this.currentFont != null) text.setFont (this.currentFont, true);
if (this.currentColor != null) text.setColixO (this.currentColor);
if (this.currentBgColor != null) text.setBgColixO (this.currentBgColor);
if (this.currentTranslucentLevel != 0) text.setTranslucent (this.currentTranslucentLevel, false);
if (this.currentBgTranslucentLevel != 0) text.setTranslucent (this.currentBgTranslucentLevel, true);
}this.currentObject = text;
return;
}}this.setPropTS (propertyName, value, null);
}, "~S,~O,JU.BS");
$_V(c$, "getPropertyData", 
function (property, data) {
if ("currentTarget" === property) {
return (this.currentObject != null && (data[0] = this.currentObject.target) != null);
}if (property === "checkID") {
var key = (data[0]).toUpperCase ();
var isWild = J.util.Txt.isWild (key);
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
var id = t.target;
if (id.equalsIgnoreCase (key) || isWild && J.util.Txt.isMatch (id.toUpperCase (), key, true, true)) {
data[1] = id;
return true;
}}
return false;
}return false;
}, "~S,~A");
$_V(c$, "getShapeState", 
function () {
return this.viewer.getShapeState (this);
});
Clazz_defineStatics (c$,
"FONTFACE", "Serif",
"FONTSIZE", 20,
"COLOR", 10);
});
Clazz_declarePackage ("J.shape");
Clazz_load (["J.shape.TextShape"], "J.shape.Hover", ["JU.AU", "J.modelset.Text", "J.util.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.hoverText = null;
this.atomIndex = -1;
this.xy = null;
this.text = null;
this.labelFormat = "%U";
this.atomFormats = null;
this.specialLabel = null;
Clazz_instantialize (this, arguments);
}, J.shape, "Hover", J.shape.TextShape);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shape.Hover, "initShape", []);
this.isHover = true;
var font3d = this.gdata.getFont3DFSS ("SansSerif", "Plain", 12);
var bgcolix = J.util.C.getColixS ("#FFFFC3");
var colix = 4;
this.currentObject = this.hoverText = J.modelset.Text.newLabel (this.gdata, font3d, null, colix, bgcolix, 1, 0, null);
this.hoverText.setAdjustForWindow (true);
});
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("target" === propertyName) {
if (value == null) this.atomIndex = -1;
 else {
this.atomIndex = (value).intValue ();
}return;
}if ("text" === propertyName) {
this.text = value;
if (this.text != null && this.text.length == 0) this.text = null;
return;
}if ("specialLabel" === propertyName) {
this.specialLabel = value;
return;
}if ("atomLabel" === propertyName) {
var text = value;
if (text != null && text.length == 0) text = null;
var count = this.viewer.getAtomCount ();
if (this.atomFormats == null || this.atomFormats.length < count) this.atomFormats =  new Array (count);
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) this.atomFormats[i] = text;

return;
}if ("xy" === propertyName) {
this.xy = value;
return;
}if ("label" === propertyName) {
this.labelFormat = value;
if (this.labelFormat != null && this.labelFormat.length == 0) this.labelFormat = null;
return;
}if (propertyName === "deleteModelAtoms") {
if (this.atomFormats != null) {
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.atomFormats = JU.AU.deleteElements (this.atomFormats, firstAtomDeleted, nAtomsDeleted);
}this.atomIndex = -1;
return;
}this.setPropTS (propertyName, value, null);
}, "~S,~O,JU.BS");
$_V(c$, "getShapeState", 
function () {
return this.viewer.getShapeState (this);
});
Clazz_defineStatics (c$,
"FONTFACE", "SansSerif",
"FONTSTYLE", "Plain",
"FONTSIZE", 12);
});
Clazz_declarePackage ("J.render");
Clazz_load (null, "J.render.TextRenderer", ["java.lang.Float", "J.modelset.Text"], function () {
c$ = Clazz_declareType (J.render, "TextRenderer");
c$.render = $_M(c$, "render", 
function (text, viewer, g3d, scalePixelsPerMicron, imageFontScaling, isExact, boxXY, temp) {
if (text == null || text.image == null && text.lines == null) return;
var showText = g3d.setColix (text.colix);
if (!showText && (text.image == null && (text.bgcolix == 0 || !g3d.setColix (text.bgcolix)))) return;
text.setPosition (viewer, g3d.getRenderWidth (), g3d.getRenderHeight (), scalePixelsPerMicron, imageFontScaling, isExact, boxXY);
if (text.image == null && text.bgcolix != 0) {
if (showText) g3d.setColix (text.bgcolix);
J.render.TextRenderer.showBox (g3d, text.colix, Clazz_floatToInt (text.boxX), Clazz_floatToInt (text.boxY) + text.boxYoff2 * 2, text.z + 2, text.zSlab, Clazz_floatToInt (text.boxWidth), Clazz_floatToInt (text.boxHeight), text.fontScale, text.isLabelOrHover);
if (!showText) return;
}if (text.image == null) {
for (var i = 0; i < text.lines.length; i++) {
text.setXYA (temp, i);
g3d.drawString (text.lines[i], text.font, Clazz_floatToInt (temp[0]), Clazz_floatToInt (temp[1]), text.z, text.zSlab, text.bgcolix);
}
} else {
g3d.drawImage (text.image, Clazz_floatToInt (text.boxX), Clazz_floatToInt (text.boxY), text.z, text.zSlab, text.bgcolix, Clazz_floatToInt (text.boxWidth), Clazz_floatToInt (text.boxHeight));
}J.render.TextRenderer.drawPointer (text, g3d);
return;
}, "J.modelset.Text,J.viewer.Viewer,J.api.JmolRendererInterface,~N,~N,~B,~A,~A");
c$.drawPointer = $_M(c$, "drawPointer", 
function (text, g3d) {
if ((text.pointer & 1) == 0 || !g3d.setColix ((text.pointer & 2) != 0 && text.bgcolix != 0 ? text.bgcolix : text.colix)) return;
var w = text.boxWidth;
var h = text.boxHeight;
var pt = NaN;
var x = text.boxX + (text.boxX > text.atomX + w ? 0 : text.boxX + w < text.atomX - w ? w : (pt = w / 2));
var setY = !Float.isNaN (pt);
var y = text.boxY + (setY && text.boxY > text.atomY ? 0 : setY && text.boxY + h < text.atomY ? h : h / 2);
g3d.drawLineXYZ (text.atomX, text.atomY, text.atomZ, Clazz_floatToInt (x), Clazz_floatToInt (y), text.zSlab);
}, "J.modelset.Text,J.api.JmolRendererInterface");
c$.renderSimpleLabel = $_M(c$, "renderSimpleLabel", 
function (g3d, font, strLabel, colix, bgcolix, boxXY, z, zSlab, xOffset, yOffset, ascent, descent, doPointer, pointerColix, isExact) {
var boxWidth = font.stringWidth (strLabel) + 8;
var boxHeight = ascent + descent + 8;
var x0 = Clazz_floatToInt (boxXY[0]);
var y0 = Clazz_floatToInt (boxXY[1]);
J.modelset.Text.setBoxXY (boxWidth, boxHeight, xOffset, yOffset, boxXY, isExact);
var x = boxXY[0];
var y = boxXY[1];
if (bgcolix != 0 && g3d.setColix (bgcolix)) J.render.TextRenderer.showBox (g3d, colix, Clazz_floatToInt (x), Clazz_floatToInt (y), z, zSlab, Clazz_floatToInt (boxWidth), Clazz_floatToInt (boxHeight), 1, true);
 else g3d.setColix (colix);
g3d.drawString (strLabel, font, Clazz_floatToInt (x + 4), Clazz_floatToInt (y + 4 + ascent), z - 1, zSlab, bgcolix);
if (doPointer) {
g3d.setColix (pointerColix);
if (xOffset > 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz_floatToInt (x), Clazz_floatToInt (y + boxHeight / 2), zSlab);
 else if (xOffset < 0) g3d.drawLineXYZ (x0, y0, zSlab, Clazz_floatToInt (x + boxWidth), Clazz_floatToInt (y + boxHeight / 2), zSlab);
}}, "J.api.JmolRendererInterface,javajs.awt.Font,~S,~N,~N,~A,~N,~N,~N,~N,~N,~N,~B,~N,~B");
c$.showBox = $_M(c$, "showBox", 
function (g3d, colix, x, y, z, zSlab, boxWidth, boxHeight, imageFontScaling, atomBased) {
g3d.fillRect (x, y, z, zSlab, boxWidth, boxHeight);
g3d.setColix (colix);
if (!atomBased) return;
if (imageFontScaling >= 2) {
g3d.drawRect (x + 3, y + 3, z - 1, zSlab, boxWidth - 6, boxHeight - 6);
} else {
g3d.drawRect (x + 1, y + 1, z - 1, zSlab, boxWidth - 2, boxHeight - 2);
}}, "J.api.JmolRendererInterface,~N,~N,~N,~N,~N,~N,~N,~N,~B");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.FontLineShapeRenderer", "JU.P3", "$.P3i"], "J.render.LabelsRenderer", ["J.modelset.Text", "J.render.TextRenderer", "J.shape.Labels", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.minZ = null;
this.ascent = 0;
this.descent = 0;
this.sppm = 0;
this.xy = null;
this.screen = null;
this.fidPrevious = 0;
this.zCutoff = 0;
this.pTemp = null;
this.bgcolix = 0;
this.labelColix = 0;
this.fid = 0;
this.atom = null;
this.atomPt = null;
this.isExact = false;
this.offset = 0;
this.textAlign = 0;
this.pointer = 0;
this.zSlab = -2147483648;
this.zBox = 0;
this.boxXY = null;
this.scalePixelsPerMicron = 0;
Clazz_instantialize (this, arguments);
}, J.render, "LabelsRenderer", J.render.FontLineShapeRenderer);
Clazz_prepareFields (c$, function () {
this.minZ =  Clazz_newIntArray (1, 0);
this.xy =  Clazz_newFloatArray (3, 0);
this.screen =  new JU.P3i ();
this.pTemp =  new JU.P3 ();
});
$_V(c$, "render", 
function () {
this.fidPrevious = 0;
this.zCutoff = this.viewer.getZShadeStart ();
var labels = this.shape;
var labelStrings = labels.strings;
var bgcolixes = labels.bgcolixes;
if (this.isExport) bgcolixes = this.g3d.getBgColixes (bgcolixes);
var fids = labels.fids;
var offsets = labels.offsets;
if (labelStrings == null) return false;
var atoms = this.modelSet.atoms;
var backgroundColixContrast = this.viewer.getColixBackgroundContrast ();
var backgroundColor = this.viewer.getBackgroundArgb ();
this.sppm = this.viewer.getScalePixelsPerAngstrom (true);
this.scalePixelsPerMicron = (this.viewer.getBoolean (603979845) ? this.sppm * 10000 : 0);
this.imageFontScaling = this.viewer.getImageFontScaling ();
var iGroup = -1;
this.minZ[0] = 2147483647;
var isAntialiased = this.g3d.isAntialiased ();
for (var i = labelStrings.length; --i >= 0; ) {
this.atomPt = this.atom = atoms[i];
if (!this.atom.isVisible (this.myVisibilityFlag)) continue;
var label = labelStrings[i];
if (label == null || label.length == 0 || labels.mads != null && labels.mads[i] < 0) continue;
this.labelColix = labels.getColix2 (i, this.atom, false);
this.bgcolix = labels.getColix2 (i, this.atom, true);
if (this.bgcolix == 0 && this.g3d.getColorArgbOrGray (this.labelColix) == backgroundColor) this.labelColix = backgroundColixContrast;
this.fid = ((fids == null || i >= fids.length || fids[i] == 0) ? labels.zeroFontId : fids[i]);
var offsetFull = (offsets == null || i >= offsets.length ? 0 : offsets[i]);
var labelsFront = ((offsetFull & 32) != 0);
var labelsGroup = ((offsetFull & 16) != 0);
this.isExact = ((offsetFull & 128) != 0);
this.offset = offsetFull >> 8;
this.textAlign = J.shape.Labels.getAlignment (offsetFull);
this.pointer = offsetFull & 3;
this.zSlab = this.atom.sZ - Clazz_doubleToInt (this.atom.sD / 2) - 3;
if (this.zCutoff > 0 && this.zSlab > this.zCutoff) continue;
if (this.zSlab < 1) this.zSlab = 1;
this.zBox = this.zSlab;
if (labelsGroup) {
var group = this.atom.getGroup ();
var ig = group.getGroupIndex ();
if (ig != iGroup) {
group.getMinZ (atoms, this.minZ);
iGroup = ig;
}this.zBox = this.minZ[0];
} else if (labelsFront) {
this.zBox = 1;
}if (this.zBox < 1) this.zBox = 1;
var text = labels.getLabel (i);
this.boxXY = (!this.isExport || this.viewer.creatingImage ? labels.getBox (i) :  Clazz_newFloatArray (5, 0));
if (this.boxXY == null) labels.putBox (i, this.boxXY =  Clazz_newFloatArray (5, 0));
text = this.renderLabelOrMeasure (text, label);
if (text != null) labels.putLabel (i, text);
if (isAntialiased) {
this.boxXY[0] /= 2;
this.boxXY[1] /= 2;
}this.boxXY[4] = this.zBox;
}
return false;
});
$_M(c$, "renderLabelOrMeasure", 
function (text, label) {
var newText = false;
if (text != null) {
if (text.font == null) text.setFontFromFid (this.fid);
text.atomX = this.atomPt.sX;
text.atomY = this.atomPt.sY;
text.atomZ = this.zSlab;
if (text.pymolOffset == null) {
text.setXYZs (this.atomPt.sX, this.atomPt.sY, this.zBox, this.zSlab);
text.setColix (this.labelColix);
text.setBgColix (this.bgcolix);
} else {
if (text.pymolOffset[0] == 1) this.pTemp.setT (this.atomPt);
 else this.pTemp.set (0, 0, 0);
this.pTemp.x += text.pymolOffset[4];
this.pTemp.y += text.pymolOffset[5];
this.pTemp.z += text.pymolOffset[6];
this.viewer.transformPtScr (this.pTemp, this.screen);
text.setXYZs (this.screen.x, this.screen.y, this.screen.z, this.zSlab);
text.setScalePixelsPerMicron (this.sppm);
}} else {
var isLeft = (this.textAlign == 1 || this.textAlign == 0);
if (this.fid != this.fidPrevious || this.ascent == 0) {
this.g3d.setFontFid (this.fid);
this.fidPrevious = this.fid;
this.font3d = this.g3d.getFont3DCurrent ();
if (isLeft) {
this.ascent = this.font3d.getAscent ();
this.descent = this.font3d.getDescent ();
}}var isSimple = isLeft && (this.imageFontScaling == 1 && this.scalePixelsPerMicron == 0 && label.indexOf ("|") < 0 && label.indexOf ("<su") < 0);
if (isSimple) {
var doPointer = ((this.pointer & 1) != 0);
var pointerColix = ((this.pointer & 2) != 0 && this.bgcolix != 0 ? this.bgcolix : this.labelColix);
this.boxXY[0] = this.atomPt.sX;
this.boxXY[1] = this.atomPt.sY;
J.render.TextRenderer.renderSimpleLabel (this.g3d, this.font3d, label, this.labelColix, this.bgcolix, this.boxXY, this.zBox, this.zSlab, J.viewer.JC.getXOffset (this.offset), J.viewer.JC.getYOffset (this.offset), this.ascent, this.descent, doPointer, pointerColix, this.isExact);
this.atomPt = null;
} else {
text = J.modelset.Text.newLabel (this.g3d.getGData (), this.font3d, label, this.labelColix, this.bgcolix, this.textAlign, 0, null);
text.atomX = this.atomPt.sX;
text.atomY = this.atomPt.sY;
text.atomZ = this.zSlab;
text.setXYZs (this.atomPt.sX, this.atomPt.sY, this.zBox, this.zSlab);
newText = true;
}}if (this.atomPt != null) {
if (text.pymolOffset == null) {
text.setOffset (this.offset);
if (this.textAlign != 0) text.setAlignment (this.textAlign);
}text.setPointer (this.pointer);
J.render.TextRenderer.render (text, this.viewer, this.g3d, this.scalePixelsPerMicron, this.imageFontScaling, this.isExact, this.boxXY, this.xy);
}return (newText ? text : null);
}, "J.modelset.Text,~S");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.LabelsRenderer"], "J.render.EchoRenderer", ["J.modelset.Atom", "J.render.TextRenderer", "J.util.C"], function () {
c$ = Clazz_declareType (J.render, "EchoRenderer", J.render.LabelsRenderer);
$_V(c$, "render", 
function () {
if (this.viewer.isPreviewOnly ()) return false;
var echo = this.shape;
var scalePixelsPerMicron = (this.viewer.getBoolean (603979845) ? this.viewer.getScalePixelsPerAngstrom (true) * 10000 : 0);
this.imageFontScaling = this.viewer.getImageFontScaling ();
var haveTranslucent = false;
for (var t, $t = echo.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
if (!t.visible || t.hidden) {
continue;
}if (Clazz_instanceOf (t.pointerPt, J.modelset.Atom)) {
if (!(t.pointerPt).isVisible (-1)) continue;
}if (t.valign == 4) {
this.viewer.transformPtScr (t.xyz, this.pt0i);
t.setXYZs (this.pt0i.x, this.pt0i.y, this.pt0i.z, this.pt0i.z);
} else if (t.movableZPercent != 2147483647) {
var z = this.viewer.zValueFromPercent (t.movableZPercent);
t.setZs (z, z);
}if (t.pointerPt == null) {
t.pointer = 0;
} else {
t.pointer = 1;
this.viewer.transformPtScr (t.pointerPt, this.pt0i);
t.atomX = this.pt0i.x;
t.atomY = this.pt0i.y;
t.atomZ = this.pt0i.z;
if (t.zSlab == -2147483648) t.zSlab = 1;
}J.render.TextRenderer.render (t, this.viewer, this.g3d, scalePixelsPerMicron, this.imageFontScaling, false, null, this.xy);
if (J.util.C.isColixTranslucent (t.bgcolix) || J.util.C.isColixTranslucent (t.colix)) haveTranslucent = true;
}
if (!this.isExport) {
var frameTitle = this.viewer.getFrameTitle ();
if (frameTitle != null && frameTitle.length > 0) {
if (this.g3d.setColix (this.viewer.getColixBackgroundContrast ())) {
if (frameTitle.indexOf ("%{") >= 0 || frameTitle.indexOf ("@{") >= 0) frameTitle = this.viewer.formatText (frameTitle);
this.renderFrameTitle (frameTitle);
}}}return haveTranslucent;
});
$_M(c$, "renderFrameTitle", 
function (frameTitle) {
var fid = this.g3d.getFontFidFS ("Serif", 14 * this.imageFontScaling);
this.g3d.setFontFid (fid);
var y = Clazz_doubleToInt (Math.floor (this.viewer.getScreenHeight () * (this.g3d.isAntialiased () ? 2 : 1) - 10 * this.imageFontScaling));
var x = Clazz_doubleToInt (Math.floor (5 * this.imageFontScaling));
this.g3d.drawStringNoSlab (frameTitle, null, x, y, 0, 0);
}, "~S");
});
Clazz_declarePackage ("J.render");
Clazz_load (["J.render.ShapeRenderer"], "J.render.HoverRenderer", ["J.render.TextRenderer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.tempXY = null;
Clazz_instantialize (this, arguments);
}, J.render, "HoverRenderer", J.render.ShapeRenderer);
Clazz_prepareFields (c$, function () {
this.tempXY =  Clazz_newFloatArray (3, 0);
});
$_V(c$, "render", 
function () {
if (this.viewer.isNavigating ()) return false;
var hover = this.shape;
var antialias = this.g3d.isAntialiased ();
var text = hover.hoverText;
if (hover.atomIndex >= 0) {
var atom = this.modelSet.atoms[hover.atomIndex];
var label = (hover.specialLabel != null ? hover.specialLabel : hover.atomFormats != null && hover.atomFormats[hover.atomIndex] != null ? this.viewer.modelSet.getLabeler ().formatLabel (this.viewer, atom, hover.atomFormats[hover.atomIndex]) : hover.labelFormat != null ? this.viewer.modelSet.getLabeler ().formatLabel (this.viewer, atom, this.fixLabel (atom, hover.labelFormat)) : null);
if (label == null) return false;
text.setText (label);
text.setXYZs (atom.sX, atom.sY, 1, -2147483648);
} else if (hover.text != null) {
text.setText (hover.text);
text.setXYZs (hover.xy.x, hover.xy.y, 1, -2147483648);
} else {
return true;
}J.render.TextRenderer.render (text, this.viewer, this.g3d, 0, antialias ? 2 : 1, false, null, this.tempXY);
return true;
});
$_M(c$, "fixLabel", 
function (atom, label) {
if (label == null) return null;
return (this.viewer.isJmolDataFrameForModel (atom.getModelIndex ()) && label.equals ("%U") ? "%W" : label);
}, "J.modelset.Atom,~S");
});
})(Clazz
,Clazz.newArray
,Clazz.newBooleanArray
,Clazz.newByteArray
,Clazz.newCharArray
,Clazz.newDoubleArray
,Clazz.newFloatArray
,Clazz.newIntArray
,Clazz.newLongArray
,Clazz.newShortArray
,Clazz.prepareCallback
,Clazz.decorateAsClass
,Clazz.isClassDefined
,Clazz.defineEnumConstant
,Clazz.cloneFinals
,Clazz.inheritArgs
,Clazz.pu$h
,Clazz.declareInterface
,Clazz.declarePackage
,Clazz.makeConstructor
,Clazz.overrideConstructor
,Clazz.load
,Clazz.defineMethod
,Clazz.innerTypeInstance
,Clazz.instanceOf
,Clazz.p0p
,Clazz.makeFunction
,Clazz.superConstructor
,Clazz.defineStatics
,Clazz.registerSerializableFields
,Clazz.declareType
,Clazz.superCall
,Clazz.overrideMethod
,Clazz.declareAnonymous
,Clazz.checkPrivateMethod
,Clazz.prepareFields
,Clazz.instantialize
,Clazz.doubleToInt
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.supportsNativeObject
,Clazz.extendedObjectMethods
,Clazz.callingStackTraces
,Clazz.clone
,Clazz.doubleToShort
,Clazz.innerFunctions
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
);
