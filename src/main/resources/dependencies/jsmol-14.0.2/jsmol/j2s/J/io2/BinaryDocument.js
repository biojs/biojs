Clazz.declarePackage ("J.io2");
Clazz.load (["JU.BC", "J.api.JmolDocument"], "J.io2.BinaryDocument", ["java.io.DataInputStream", "java.lang.Double", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stream = null;
this.isRandom = false;
this.isBigEndian = true;
this.t8 = null;
this.nBytes = 0;
this.out = null;
Clazz.instantialize (this, arguments);
}, J.io2, "BinaryDocument", JU.BC, J.api.JmolDocument);
Clazz.prepareFields (c$, function () {
this.t8 =  Clazz.newByteArray (8, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.io2.BinaryDocument, []);
});
$_V(c$, "close", 
function () {
if (this.stream != null) try {
this.stream.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.out != null) this.out.closeChannel ();
});
$_V(c$, "setStream", 
function (bis, isBigEndian) {
if (bis != null) this.stream =  new java.io.DataInputStream (bis);
this.isBigEndian = isBigEndian;
}, "java.io.BufferedInputStream,~B");
$_V(c$, "setStreamData", 
function (stream, isBigEndian) {
if (stream != null) this.stream = stream;
this.isBigEndian = isBigEndian;
}, "java.io.DataInputStream,~B");
$_M(c$, "setRandom", 
function (TF) {
this.isRandom = TF;
}, "~B");
$_V(c$, "readByte", 
function () {
this.nBytes++;
return this.ioReadByte ();
});
$_M(c$, "ioReadByte", 
($fz = function () {
var b = this.stream.readByte ();
if (this.out != null) this.out.writeByteAsInt (b);
return b;
}, $fz.isPrivate = true, $fz));
$_V(c$, "readByteArray", 
function (b, off, len) {
var n = this.ioRead (b, off, len);
if (n > 0) this.nBytes += n;
var nBytesRead = n;
if (n > 0 && n < len) {
while (nBytesRead < len && n > 0) {
n = this.ioRead (b, nBytesRead, len - nBytesRead);
if (n > 0) {
this.nBytes += n;
nBytesRead += n;
}}
}return nBytesRead;
}, "~A,~N,~N");
$_M(c$, "ioRead", 
($fz = function (b, off, len) {
var n = this.stream.read (b, off, len);
if (n > 0 && this.out != null) this.writeBytes (b, off, n);
return n;
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
$_M(c$, "writeBytes", 
function (b, off, n) {
this.out.write (b, off, n);
}, "~A,~N,~N");
$_V(c$, "readString", 
function (nChar) {
var temp =  Clazz.newByteArray (nChar, 0);
var n = this.readByteArray (temp, 0, nChar);
return  String.instantialize (temp, 0, n, "UTF-8");
}, "~N");
$_V(c$, "readShort", 
function () {
this.nBytes += 2;
return (this.isBigEndian ? this.ioReadShort () : ((this.ioReadByte () & 0xff) | (this.ioReadByte () & 0xff) << 8));
});
$_M(c$, "ioReadShort", 
($fz = function () {
var b = this.stream.readShort ();
if (this.out != null) this.writeShort (b);
return b;
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeShort", 
function (i) {
this.out.writeByteAsInt (i >> 8);
this.out.writeByteAsInt (i);
}, "~N");
$_V(c$, "readIntLE", 
function () {
this.nBytes += 4;
return this.readLEInt ();
});
$_V(c$, "readInt", 
function () {
this.nBytes += 4;
return (this.isBigEndian ? this.ioReadInt () : this.readLEInt ());
});
$_M(c$, "ioReadInt", 
($fz = function () {
var i = this.stream.readInt ();
if (this.out != null) this.writeInt (i);
return i;
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeInt", 
function (i) {
this.out.writeByteAsInt (i >> 24);
this.out.writeByteAsInt (i >> 16);
this.out.writeByteAsInt (i >> 8);
this.out.writeByteAsInt (i);
}, "~N");
$_V(c$, "swapBytesI", 
function (n) {
return (((n >> 24) & 0xff) | ((n >> 16) & 0xff) << 8 | ((n >> 8) & 0xff) << 16 | (n & 0xff) << 24);
}, "~N");
$_V(c$, "swapBytesS", 
function (n) {
return ((((n >> 8) & 0xff) | (n & 0xff) << 8));
}, "~N");
$_V(c$, "readUnsignedShort", 
function () {
this.nBytes += 2;
var a = (this.ioReadByte () & 0xff);
var b = (this.ioReadByte () & 0xff);
return (this.isBigEndian ? (a << 8) + b : (b << 8) + a);
});
$_V(c$, "readLong", 
function () {
this.nBytes += 8;
return (this.isBigEndian ? this.ioReadLong () : (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 54));
});
$_M(c$, "ioReadLong", 
($fz = function () {
var b = this.stream.readLong ();
if (this.out != null) this.writeLong (b);
return b;
}, $fz.isPrivate = true, $fz));
$_M(c$, "writeLong", 
function (b) {
this.writeInt (((b >> 32) & 0xFFFFFFFF));
this.writeInt ((b & 0xFFFFFFFF));
}, "~N");
$_M(c$, "readLEInt", 
($fz = function () {
this.ioRead (this.t8, 0, 4);
return this.bytesToInt (this.t8, 0, false);
}, $fz.isPrivate = true, $fz));
$_V(c$, "readFloat", 
function () {
return this.intToFloat (this.readInt ());
});
$_V(c$, "readDouble", 
function () {
{
this.readByteArray(this.t8, 0, 8);
return this.bytesToDoubleToFloat(this.t8, 0, this.isBigEndian);
}});
$_M(c$, "ioReadDouble", 
($fz = function () {
var d = this.stream.readDouble ();
if (this.out != null) this.writeLong (Double.doubleToRawLongBits (d));
return d;
}, $fz.isPrivate = true, $fz));
$_M(c$, "readLELong", 
($fz = function () {
return (((this.ioReadByte ()) & 0xff) | ((this.ioReadByte ()) & 0xff) << 8 | ((this.ioReadByte ()) & 0xff) << 16 | ((this.ioReadByte ()) & 0xff) << 24 | ((this.ioReadByte ()) & 0xff) << 32 | ((this.ioReadByte ()) & 0xff) << 40 | ((this.ioReadByte ()) & 0xff) << 48 | ((this.ioReadByte ()) & 0xff) << 56);
}, $fz.isPrivate = true, $fz));
$_V(c$, "seek", 
function (offset) {
try {
if (offset == this.nBytes) return;
if (offset < this.nBytes) {
this.stream.reset ();
this.nBytes = 0;
} else {
offset -= this.nBytes;
}this.stream.skipBytes (offset);
this.nBytes += offset;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.errorEx (null, e);
} else {
throw e;
}
}
}, "~N");
$_V(c$, "getPosition", 
function () {
return this.nBytes;
});
$_V(c$, "setOutputChannel", 
function (out) {
this.out = out;
}, "JU.OC");
$_V(c$, "getAllDataFiles", 
function (binaryFileList, firstFile) {
return null;
}, "~S,~S");
$_V(c$, "getAllDataMapped", 
function (replace, string, fileData) {
}, "~S,~S,java.util.Map");
});
