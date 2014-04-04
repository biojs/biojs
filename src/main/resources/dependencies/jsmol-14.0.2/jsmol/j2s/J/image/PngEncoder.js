Clazz.declarePackage ("J.image");
Clazz.load (["J.image.CRCEncoder"], "J.image.PngEncoder", ["java.io.ByteArrayOutputStream", "java.util.zip.Deflater", "$.DeflaterOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.encodeAlpha = false;
this.filter = 0;
this.bytesPerPixel = 0;
this.compressionLevel = 0;
this.type = null;
this.transparentColor = null;
this.applicationData = null;
this.applicationPrefix = null;
this.version = null;
this.scanLines = null;
this.byteWidth = 0;
Clazz.instantialize (this, arguments);
}, J.image, "PngEncoder", J.image.CRCEncoder);
$_V(c$, "setParams", 
function (params) {
if (this.quality < 0) this.quality = 2;
 else if (this.quality > 9) this.quality = 9;
this.encodeAlpha = false;
this.filter = 0;
this.compressionLevel = this.quality;
this.transparentColor = params.get ("transparentColor");
this.type = (params.get ("type") + "0000").substring (0, 4);
this.version = params.get ("comment");
this.applicationData = params.get ("applicationData");
this.applicationPrefix = params.get ("applicationPrefix");
}, "java.util.Map");
$_V(c$, "generate", 
function () {
var ptJmol =  Clazz.newIntArray (1, 0);
if (!this.pngEncode (ptJmol)) {
this.out.cancel ();
return;
}var bytes = this.getBytes ();
var len = this.dataLen;
if (this.applicationData != null) {
J.image.PngEncoder.setJmolTypeText (this.applicationPrefix, ptJmol[0], bytes, len, this.applicationData.length, this.type);
this.out.write (bytes, 0, len);
len = (bytes = this.applicationData).length;
}this.out.write (bytes, 0, len);
});
$_M(c$, "pngEncode", 
($fz = function (ptAppTag) {
var pngIdBytes = [-119, 80, 78, 71, 13, 10, 26, 10];
this.writeBytes (pngIdBytes);
this.writeHeader ();
ptAppTag[0] = this.bytePos + 4;
this.writeText (J.image.PngEncoder.getApplicationText (this.applicationPrefix, this.type, 0, 0));
this.writeText ("Software\0Jmol " + this.version);
this.writeText ("Creation Time\0" + this.date);
if (!this.encodeAlpha && this.transparentColor != null) this.writeTransparentColor (this.transparentColor.intValue ());
return this.writeImageData ();
}, $fz.isPrivate = true, $fz), "~A");
c$.setJmolTypeText = $_M(c$, "setJmolTypeText", 
($fz = function (prefix, ptJmolByteText, b, nPNG, nState, type) {
var s = "iTXt" + J.image.PngEncoder.getApplicationText (prefix, type, nPNG, nState);
var encoder =  new J.image.PngEncoder ();
encoder.setData (b, ptJmolByteText);
encoder.writeString (s);
encoder.writeCRC ();
}, $fz.isPrivate = true, $fz), "~S,~N,~A,~N,~N,~S");
c$.getApplicationText = $_M(c$, "getApplicationText", 
($fz = function (prefix, type, nPNG, nState) {
var sPNG = "000000000" + nPNG;
sPNG = sPNG.substring (sPNG.length - 9);
var sState = "000000000" + nState;
sState = sState.substring (sState.length - 9);
return prefix + "\0" + type + (type.equals ("PNG") ? "0" : "") + sPNG + "+" + sState;
}, $fz.isPrivate = true, $fz), "~S,~S,~N,~N");
$_M(c$, "writeHeader", 
($fz = function () {
this.writeInt4 (13);
this.startPos = this.bytePos;
this.writeString ("IHDR");
this.writeInt4 (this.width);
this.writeInt4 (this.height);
this.writeByte (8);
this.writeByte (this.encodeAlpha ? 6 : 2);
this.writeByte (0);
this.writeByte (0);
this.writeByte (0);
this.writeCRC ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeText", 
($fz = function (msg) {
this.writeInt4 (msg.length);
this.startPos = this.bytePos;
this.writeString ("iTXt" + msg);
this.writeCRC ();
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "writeTransparentColor", 
($fz = function (icolor) {
this.writeInt4 (6);
this.startPos = this.bytePos;
this.writeString ("tRNS");
this.writeInt2 ((icolor >> 16) & 0xFF);
this.writeInt2 ((icolor >> 8) & 0xFF);
this.writeInt2 (icolor & 0xFF);
this.writeCRC ();
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "writeImageData", 
($fz = function () {
this.bytesPerPixel = (this.encodeAlpha ? 4 : 3);
this.byteWidth = this.width * this.bytesPerPixel;
var scanWidth = this.byteWidth + 1;
var rowsLeft = this.height;
var nRows;
var scanPos;
var deflater =  new java.util.zip.Deflater (this.compressionLevel);
var outBytes =  new java.io.ByteArrayOutputStream (1024);
var compBytes =  new java.util.zip.DeflaterOutputStream (outBytes, deflater);
var pt = 0;
try {
while (rowsLeft > 0) {
nRows = Math.max (1, Math.min (Clazz.doubleToInt (32767 / scanWidth), rowsLeft));
this.scanLines =  Clazz.newByteArray (scanWidth * nRows, 0);
var nPixels = this.width * nRows;
scanPos = 0;
for (var i = 0; i < nPixels; i++, pt++) {
if (i % this.width == 0) {
this.scanLines[scanPos++] = this.filter;
}this.scanLines[scanPos++] = ((this.pixels[pt] >> 16) & 0xff);
this.scanLines[scanPos++] = ((this.pixels[pt] >> 8) & 0xff);
this.scanLines[scanPos++] = ((this.pixels[pt]) & 0xff);
if (this.encodeAlpha) {
this.scanLines[scanPos++] = ((this.pixels[pt] >> 24) & 0xff);
}}
compBytes.write (this.scanLines, 0, scanPos);
rowsLeft -= nRows;
}
compBytes.close ();
var compressedLines = outBytes.toByteArray ();
this.writeInt4 (compressedLines.length);
this.startPos = this.bytePos;
this.writeString ("IDAT");
this.writeBytes (compressedLines);
this.writeCRC ();
this.writeEnd ();
deflater.finish ();
return true;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.err.println (e.toString ());
return false;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeEnd", 
($fz = function () {
this.writeInt4 (0);
this.startPos = this.bytePos;
this.writeString ("IEND");
this.writeCRC ();
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"FILTER_NONE", 0,
"FILTER_SUB", 1,
"FILTER_UP", 2,
"FILTER_LAST", 2);
});
