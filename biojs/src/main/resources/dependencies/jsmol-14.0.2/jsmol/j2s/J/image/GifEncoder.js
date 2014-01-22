Clazz.declarePackage ("J.image");
Clazz.load (["JU.List", "J.image.ImageEncoder"], "J.image.GifEncoder", ["java.lang.Boolean", "java.util.Collections", "$.Hashtable", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colorMap = null;
this.red = null;
this.green = null;
this.blue = null;
if (!Clazz.isClassDefined ("J.image.GifEncoder.ColorItem")) {
J.image.GifEncoder.$GifEncoder$ColorItem$ ();
}
if (!Clazz.isClassDefined ("J.image.GifEncoder.ColorVector")) {
J.image.GifEncoder.$GifEncoder$ColorVector$ ();
}
if (!Clazz.isClassDefined ("J.image.GifEncoder.AdaptiveColorCollection")) {
J.image.GifEncoder.$GifEncoder$AdaptiveColorCollection$ ();
}
this.interlaced = false;
this.addHeader = true;
this.addImage = true;
this.addTrailer = true;
this.delayTime100ths = -1;
this.looping = false;
this.params = null;
this.byteCount = 0;
this.bitsPerPixel = 1;
this.transparentIndex = -1;
this.initCodeSize = 0;
this.curpt = 0;
this.nBits = 0;
this.maxbits = 12;
this.maxcode = 0;
this.maxmaxcode = 4096;
this.htab = null;
this.codetab = null;
this.hsize = 5003;
this.freeEnt = 0;
this.clearFlag = false;
this.clearCode = 0;
this.EOFCode = 0;
this.countDown = 0;
this.pass = 0;
this.curx = 0;
this.cury = 0;
this.curAccum = 0;
this.curBits = 0;
this.masks = null;
this.bufPt = 0;
this.buf = null;
Clazz.instantialize (this, arguments);
}, J.image, "GifEncoder", J.image.ImageEncoder);
Clazz.prepareFields (c$, function () {
this.htab =  Clazz.newIntArray (5003, 0);
this.codetab =  Clazz.newIntArray (5003, 0);
this.masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
this.buf =  Clazz.newByteArray (256, 0);
});
$_V(c$, "setParams", 
function (params) {
this.params = params;
this.interlaced = Boolean.TRUE === params.get ("interlaced");
if (this.interlaced || !params.containsKey ("captureMode")) return;
try {
this.byteCount = (params.get ("captureByteCount")).intValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
switch ((params.get ("captureMode")).intValue ()) {
case 1073742032:
params.put ("captureMode", Integer.$valueOf (1276118017));
this.addImage = false;
this.addTrailer = false;
break;
case 1276118017:
this.addHeader = false;
this.addTrailer = false;
var fps = Math.abs ((params.get ("captureFps")).intValue ());
this.delayTime100ths = (fps == 0 ? 0 : Clazz.doubleToInt (100 / fps));
this.looping = (Boolean.FALSE !== params.get ("captureLooping"));
break;
case 1150985:
this.addHeader = false;
this.addImage = false;
break;
case 1073741874:
this.addHeader = false;
this.addImage = false;
{
this.out.cancel();
}}
}, "java.util.Map");
$_V(c$, "generate", 
function () {
if (this.addHeader) this.writeHeader ();
this.addHeader = false;
if (this.addImage) {
this.createColorTable ();
this.writeGraphicControlExtension ();
if (this.delayTime100ths >= 0 && this.looping) this.writeNetscapeLoopExtension ();
this.writeImage ();
}});
$_M(c$, "close", 
function () {
if (this.addTrailer) {
this.writeTrailer ();
Clazz.superCall (this, J.image.GifEncoder, "close", []);
}this.params.put ("captureByteCount", Integer.$valueOf (this.byteCount));
});
$_M(c$, "writeHeader", 
($fz = function () {
this.putString ("GIF89a");
this.putWord (this.width);
this.putWord (this.height);
this.putByte (0);
this.putByte (0);
this.putByte (0);
}, $fz.isPrivate = true, $fz));
$_M(c$, "createColorTable", 
($fz = function () {
var colors = this.getColors ();
var colors256 = this.getBest256 (colors);
var nTotal = colors256.size ();
this.bitsPerPixel = (nTotal <= 2 ? 1 : nTotal <= 4 ? 2 : nTotal <= 16 ? 4 : 8);
this.colorMap = this.finalizeColorMap (colors, colors256);
}, $fz.isPrivate = true, $fz));
$_M(c$, "getColors", 
($fz = function () {
var colorVector = Clazz.innerTypeInstance (J.image.GifEncoder.ColorVector, this, null);
var ciHash =  new java.util.Hashtable ();
var nColors = 0;
var key;
var ptTransparent = -1;
for (var pt = 0, row = 0, transparentRgb = -1; row < this.height; ++row) {
for (var col = 0; col < this.width; ++col, pt++) {
var rgb = this.pixels[pt];
var isTransparent = (rgb >= 0);
if (isTransparent) {
if (ptTransparent < 0) {
ptTransparent = nColors;
transparentRgb = rgb;
} else if (rgb != transparentRgb) {
this.pixels[pt] = rgb = transparentRgb;
}}var item = ciHash.get (key = Integer.$valueOf (rgb));
if (item == null) {
item = Clazz.innerTypeInstance (J.image.GifEncoder.ColorItem, this, null, rgb, 1);
ciHash.put (key, item);
colorVector.addLast (item);
nColors++;
} else {
item.count++;
}}
}
ciHash = null;
if (J.util.Logger.debugging) J.util.Logger.debug ("# total image colors = " + nColors);
colorVector.sort ();
return colorVector;
}, $fz.isPrivate = true, $fz));
$_M(c$, "getBest256", 
($fz = function (colorVector) {
var mask = 0x010101;
var nColors = colorVector.size ();
var nMax = Math.max (nColors - 1, 0);
var nTotal = 2147483647;
var index = 0;
var ht = null;
while (nTotal > 255) {
nTotal = nColors;
index = 0;
ht =  new java.util.Hashtable ();
for (var i = 0; i < nMax; i++) {
var item = colorVector.get (i);
var rgb = (nTotal < 256 ? item.rgb : item.rgb & ~mask);
var key = Integer.$valueOf (rgb);
if ((item.acc = ht.get (key)) == null) ht.put (key, item.acc = Clazz.innerTypeInstance (J.image.GifEncoder.AdaptiveColorCollection, this, null, rgb, index++));
 else nTotal--;
}
mask |= (mask <<= 1);
}
var item = colorVector.get (nMax);
ht.put (Integer.$valueOf (item.rgb), item.acc = Clazz.innerTypeInstance (J.image.GifEncoder.AdaptiveColorCollection, this, null, item.rgb, index++));
if (J.util.Logger.debugging) J.util.Logger.debug ("# GIF colors = " + ht.size ());
return ht;
}, $fz.isPrivate = true, $fz), "J.image.GifEncoder.ColorVector");
$_M(c$, "finalizeColorMap", 
($fz = function (colors, colors256) {
var mapSize = 1 << this.bitsPerPixel;
this.red =  Clazz.newIntArray (mapSize, 0);
this.green =  Clazz.newIntArray (mapSize, 0);
this.blue =  Clazz.newIntArray (mapSize, 0);
var nColors = colors.size ();
var ht =  new java.util.Hashtable ();
for (var i = 0; i < nColors; i++) {
var item = colors.get (i);
var rgb = item.rgb;
item.acc.addRgb (rgb, item.count);
ht.put (Integer.$valueOf (rgb), item.acc);
}
for (var acc, $acc = colors256.values ().iterator (); $acc.hasNext () && ((acc = $acc.next ()) || true);) acc.setRgb ();

return ht;
}, $fz.isPrivate = true, $fz), "JU.List,java.util.Map");
$_M(c$, "writeGraphicControlExtension", 
($fz = function () {
if (this.transparentIndex != -1 || this.delayTime100ths >= 0) {
this.putByte (0x21);
this.putByte (0xf9);
this.putByte (4);
var packedBytes = (this.transparentIndex == -1 ? 0 : 1) | (this.delayTime100ths > 0 ? 2 : 0);
this.putByte (packedBytes);
this.putWord (this.delayTime100ths > 0 ? this.delayTime100ths : 0);
this.putByte (this.transparentIndex == -1 ? 0 : this.transparentIndex);
this.putByte (0);
}}, $fz.isPrivate = true, $fz));
$_M(c$, "writeNetscapeLoopExtension", 
($fz = function () {
this.putByte (0x21);
this.putByte (0xff);
this.putByte (0x0B);
this.putString ("NETSCAPE2.0");
this.putByte (3);
this.putByte (1);
this.putWord (0);
this.putByte (0);
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeImage", 
($fz = function () {
this.putByte (0x2C);
this.putWord (0);
this.putWord (0);
this.putWord (this.width);
this.putWord (this.height);
var packedFields = 0x80 | (this.interlaced ? 0x40 : 0) | (this.bitsPerPixel - 1);
this.putByte (packedFields);
var colorMapSize = 1 << this.bitsPerPixel;
for (var i = 0; i < colorMapSize; i++) {
this.putByte (this.red[i]);
this.putByte (this.green[i]);
this.putByte (this.blue[i]);
}
this.putByte (this.initCodeSize = (this.bitsPerPixel <= 1 ? 2 : this.bitsPerPixel));
this.compress ();
this.putByte (0);
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeTrailer", 
($fz = function () {
this.putByte (0x3B);
}, $fz.isPrivate = true, $fz));
$_M(c$, "nextPixel", 
($fz = function () {
if (this.countDown-- == 0) return -1;
var colorIndex = this.colorMap.get (Integer.$valueOf (this.pixels[this.curpt])).index;
++this.curx;
if (this.curx == this.width) {
this.curx = 0;
if (this.interlaced) this.updateY (J.image.GifEncoder.INTERLACE_PARAMS[this.pass], J.image.GifEncoder.INTERLACE_PARAMS[this.pass + 4]);
 else ++this.cury;
}this.curpt = this.cury * this.width + this.curx;
return colorIndex & 0xff;
}, $fz.isPrivate = true, $fz));
$_M(c$, "updateY", 
($fz = function (yNext, yNew) {
this.cury += yNext;
if (yNew >= 0 && this.cury >= this.height) {
this.cury = yNew;
++this.pass;
}}, $fz.isPrivate = true, $fz), "~N,~N");
$_M(c$, "putWord", 
($fz = function (w) {
this.putByte (w);
this.putByte (w >> 8);
}, $fz.isPrivate = true, $fz), "~N");
c$.MAXCODE = $_M(c$, "MAXCODE", 
($fz = function (nBits) {
return (1 << nBits) - 1;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "compress", 
($fz = function () {
this.countDown = this.width * this.height;
this.pass = 0;
this.curx = 0;
this.cury = 0;
this.clearFlag = false;
this.nBits = this.initCodeSize + 1;
this.maxcode = J.image.GifEncoder.MAXCODE (this.nBits);
this.clearCode = 1 << this.initCodeSize;
this.EOFCode = this.clearCode + 1;
this.freeEnt = this.clearCode + 2;
this.bufPt = 0;
var ent = this.nextPixel ();
var hshift = 0;
var fcode;
for (fcode = this.hsize; fcode < 65536; fcode *= 2) ++hshift;

hshift = 8 - hshift;
var hsizeReg = this.hsize;
this.clearHash (hsizeReg);
this.output (this.clearCode);
var c;
outer_loop : while ((c = this.nextPixel ()) != -1) {
fcode = (c << this.maxbits) + ent;
var i = (c << hshift) ^ ent;
if (this.htab[i] == fcode) {
ent = this.codetab[i];
continue;
} else if (this.htab[i] >= 0) {
var disp = hsizeReg - i;
if (i == 0) disp = 1;
do {
if ((i -= disp) < 0) i += hsizeReg;
if (this.htab[i] == fcode) {
ent = this.codetab[i];
continue outer_loop;
}} while (this.htab[i] >= 0);
}this.output (ent);
ent = c;
if (this.freeEnt < this.maxmaxcode) {
this.codetab[i] = this.freeEnt++;
this.htab[i] = fcode;
} else {
this.clearBlock ();
}}
this.output (ent);
this.output (this.EOFCode);
}, $fz.isPrivate = true, $fz));
$_M(c$, "output", 
($fz = function (code) {
this.curAccum &= this.masks[this.curBits];
if (this.curBits > 0) this.curAccum |= (code << this.curBits);
 else this.curAccum = code;
this.curBits += this.nBits;
while (this.curBits >= 8) {
this.byteOut ((this.curAccum & 0xff));
this.curAccum >>= 8;
this.curBits -= 8;
}
if (this.freeEnt > this.maxcode || this.clearFlag) {
if (this.clearFlag) {
this.maxcode = J.image.GifEncoder.MAXCODE (this.nBits = this.initCodeSize + 1);
this.clearFlag = false;
} else {
++this.nBits;
if (this.nBits == this.maxbits) this.maxcode = this.maxmaxcode;
 else this.maxcode = J.image.GifEncoder.MAXCODE (this.nBits);
}}if (code == this.EOFCode) {
while (this.curBits > 0) {
this.byteOut ((this.curAccum & 0xff));
this.curAccum >>= 8;
this.curBits -= 8;
}
this.flushBytes ();
}}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "clearBlock", 
($fz = function () {
this.clearHash (this.hsize);
this.freeEnt = this.clearCode + 2;
this.clearFlag = true;
this.output (this.clearCode);
}, $fz.isPrivate = true, $fz));
$_M(c$, "clearHash", 
($fz = function (hsize) {
for (var i = 0; i < hsize; ++i) this.htab[i] = -1;

}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "byteOut", 
($fz = function (c) {
this.buf[this.bufPt++] = c;
if (this.bufPt >= 254) this.flushBytes ();
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "flushBytes", 
function () {
if (this.bufPt > 0) {
this.putByte (this.bufPt);
this.out.write (this.buf, 0, this.bufPt);
this.byteCount += this.bufPt;
this.bufPt = 0;
}});
c$.$GifEncoder$ColorItem$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.acc = null;
this.rgb = 0;
this.count = 0;
Clazz.instantialize (this, arguments);
}, J.image.GifEncoder, "ColorItem");
Clazz.makeConstructor (c$, 
function (a, b) {
this.rgb = a;
this.count = b;
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$GifEncoder$ColorVector$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
if (!Clazz.isClassDefined ("J.image.GifEncoder.ColorVector.CountComparator")) {
J.image.GifEncoder.ColorVector.$GifEncoder$ColorVector$CountComparator$ ();
}
Clazz.instantialize (this, arguments);
}, J.image.GifEncoder, "ColorVector", JU.List);
$_M(c$, "sort", 
function () {
var a = Clazz.innerTypeInstance (J.image.GifEncoder.ColorVector.CountComparator, this, null);
java.util.Collections.sort (this, a);
});
c$.$GifEncoder$ColorVector$CountComparator$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, J.image.GifEncoder.ColorVector, "CountComparator", null, java.util.Comparator);
$_V(c$, "compare", 
function (a, b) {
return (a == null ? 1 : b == null ? -1 : a.count < b.count ? -1 : a.count > b.count ? 1 : 0);
}, "J.image.GifEncoder.ColorItem,J.image.GifEncoder.ColorItem");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$.$GifEncoder$AdaptiveColorCollection$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.index = 0;
this.r = 0;
this.g = 0;
this.b = 0;
this.count = 0;
Clazz.instantialize (this, arguments);
}, J.image.GifEncoder, "AdaptiveColorCollection");
Clazz.makeConstructor (c$, 
function (a, b) {
this.index = b;
if (a >= 0) this.b$["J.image.GifEncoder"].transparentIndex = b;
}, "~N,~N");
$_M(c$, "addRgb", 
function (a, b) {
this.count += b;
this.b += (a & 0xFF) * b;
this.g += ((a >> 8) & 0xFF) * b;
this.r += ((a >> 16) & 0xFF) * b;
}, "~N,~N");
$_M(c$, "setRgb", 
function () {
this.b$["J.image.GifEncoder"].red[this.index] = (Clazz.doubleToInt (this.r / this.count)) & 0xff;
this.b$["J.image.GifEncoder"].green[this.index] = (Clazz.doubleToInt (this.g / this.count)) & 0xff;
this.b$["J.image.GifEncoder"].blue[this.index] = (Clazz.doubleToInt (this.b / this.count)) & 0xff;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"EOF", -1,
"INTERLACE_PARAMS", [8, 8, 4, 2, 4, 2, 1, 0],
"BITS", 12,
"HSIZE", 5003);
});
