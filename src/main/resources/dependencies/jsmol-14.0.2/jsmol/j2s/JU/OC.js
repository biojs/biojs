Clazz.declarePackage ("JU");
Clazz.load (["java.io.OutputStream"], "JU.OC", ["java.io.BufferedWriter", "$.ByteArrayOutputStream", "$.OutputStreamWriter", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bytePoster = null;
this.fileName = null;
this.bw = null;
this.isLocalFile = false;
this.byteCount = 0;
this.isCanceled = false;
this.closed = false;
this.os = null;
this.sb = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, JU, "OC", java.io.OutputStream);
$_M(c$, "setParams", 
function (bytePoster, fileName, asWriter, os) {
this.bytePoster = bytePoster;
this.fileName = fileName;
this.os = os;
this.isLocalFile = (fileName != null && !(fileName.startsWith ("http://") || fileName.startsWith ("https://")));
if (asWriter && os != null) this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (os));
return this;
}, "javajs.api.BytePoster,~S,~B,java.io.OutputStream");
$_M(c$, "getFileName", 
function () {
return this.fileName;
});
$_M(c$, "getByteCount", 
function () {
return this.byteCount;
});
$_M(c$, "setType", 
function (type) {
this.type = type;
}, "~S");
$_M(c$, "getType", 
function () {
return this.type;
});
$_M(c$, "append", 
function (s) {
try {
if (this.bw != null) {
this.bw.write (s);
} else if (this.os == null) {
if (this.sb == null) this.sb =  new JU.SB ();
this.sb.append (s);
} else {
var b = s.getBytes ();
this.os.write (b, 0, b.length);
this.byteCount += b.length;
return this;
}} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += s.length;
return this;
}, "~S");
$_V(c$, "write", 
function (buf, i, len) {
if (this.os == null) this.os =  new java.io.ByteArrayOutputStream ();
{
this.os.write(buf, i, len);
}this.byteCount += len;
}, "~A,~N,~N");
$_V(c$, "writeByteAsInt", 
function (b) {
if (this.os == null) this.os =  new java.io.ByteArrayOutputStream ();
{
this.os.writeByteAsInt(b);
}this.byteCount++;
}, "~N");
$_M(c$, "cancel", 
function () {
this.isCanceled = true;
this.closeChannel ();
});
$_M(c$, "closeChannel", 
function () {
if (this.closed) return null;
try {
if (this.bw != null) {
this.bw.flush ();
this.bw.close ();
} else if (this.os != null) {
this.os.flush ();
this.os.close ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.isCanceled) {
this.closed = true;
return null;
}if (this.fileName == null || this.closed) return (this.sb == null ? null : this.sb.toString ());
this.closed = true;
{
var data = (this.sb == null ? this.toByteArray() :
this.sb.toString()); if (typeof this.fileName == "function") {
this.fileName(data); } else { Jmol._doAjax(this.fileName,
null, data); }
}return null;
});
$_M(c$, "toByteArray", 
function () {
return (Clazz.instanceOf (this.os, java.io.ByteArrayOutputStream) ? (this.os).toByteArray () : null);
});
$_M(c$, "close", 
function () {
this.closeChannel ();
});
$_V(c$, "toString", 
function () {
if (this.bw != null) try {
this.bw.flush ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.sb != null) return this.closeChannel ();
return this.byteCount + " bytes";
});
$_M(c$, "postByteArray", 
($fz = function () {
var bytes = (this.sb == null ? this.toByteArray () : this.sb.toString ().getBytes ());
return this.bytePoster.postByteArray (this.fileName, bytes);
}, $fz.isPrivate = true, $fz));
});
