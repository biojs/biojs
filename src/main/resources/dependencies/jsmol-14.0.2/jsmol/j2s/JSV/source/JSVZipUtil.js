Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.api.JSVZipInterface"], "JSV.source.JSVZipUtil", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "java.util.zip.GZIPInputStream", "$.ZipInputStream", "JU.AU", "$.List", "$.SB", "JSV.common.JSViewer", "J.util.Logger"], function () {
c$ = Clazz.declareType (JSV.source, "JSVZipUtil", null, JSV.api.JSVZipInterface);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "newGZIPInputStream", 
function (bis) {
return  new java.util.zip.GZIPInputStream (bis, 512);
}, "java.io.InputStream");
$_V(c$, "newJSVZipFileSequentialReader", 
function ($in, subFileList, startCode) {
return (JSV.common.JSViewer.getInterface ("JSV.source.JSVZipFileSequentialReader")).set ($in, subFileList, startCode);
}, "java.io.InputStream,~A,~S");
c$.isZipFile = $_M(c$, "isZipFile", 
function (bytes) {
return (bytes.length > 4 && bytes[0] == 0x50 && bytes[1] == 0x4B && bytes[2] == 0x03 && bytes[3] == 0x04);
}, "~A");
c$.getZipFileContents = $_M(c$, "getZipFileContents", 
function (is, list, listPtr) {
var ret =  new JU.SB ();
if (list == null || listPtr >= list.length) return JSV.source.JSVZipUtil.getZipDirectoryAsStringAndClose (is);
var fileName = list[listPtr];
var zis =  new java.util.zip.ZipInputStream (is);
var ze;
try {
var isAll = (fileName.equals ("."));
if (isAll || fileName.lastIndexOf ("/") == fileName.length - 1) {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (isAll || name.startsWith (fileName)) ret.append (name).appendC ('\n');
}
return ret.toString ();
}while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = JSV.source.JSVZipUtil.getZipEntryAsBytes (zis);
if (JSV.source.JSVZipUtil.isZipFile (bytes)) return JSV.source.JSVZipUtil.getZipFileContents ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)), list, ++listPtr);
return  String.instantialize (bytes);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return "";
}, "java.io.InputStream,~A,~N");
c$.getZipFileContentsAsBytes = $_M(c$, "getZipFileContentsAsBytes", 
function (is, list, listPtr) {
var ret =  Clazz.newByteArray (0, 0);
var fileName = list[listPtr];
if (fileName.lastIndexOf ("/") == fileName.length - 1) return ret;
var zis =  new java.util.zip.ZipInputStream (is);
var ze;
try {
while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = JSV.source.JSVZipUtil.getZipEntryAsBytes (zis);
if (JSV.source.JSVZipUtil.isZipFile (bytes) && ++listPtr < list.length) return JSV.source.JSVZipUtil.getZipFileContentsAsBytes ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)), list, listPtr);
return bytes;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return ret;
}, "java.io.InputStream,~A,~N");
c$.getZipDirectoryAsStringAndClose = $_M(c$, "getZipDirectoryAsStringAndClose", 
function (is) {
var sb =  new JU.SB ();
var s =  new Array (0);
try {
s = JSV.source.JSVZipUtil.getZipDirectoryOrErrorAndClose (is, false);
is.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error (e.toString ());
} else {
throw e;
}
}
for (var i = 0; i < s.length; i++) sb.append (s[i]).appendC ('\n');

return sb.toString ();
}, "java.io.InputStream");
c$.getZipDirectoryAndClose = $_M(c$, "getZipDirectoryAndClose", 
function (is, addManifest) {
var s =  new Array (0);
try {
s = JSV.source.JSVZipUtil.getZipDirectoryOrErrorAndClose (is, addManifest);
is.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error (e.toString ());
} else {
throw e;
}
}
return s;
}, "java.io.InputStream,~B");
c$.getZipDirectoryOrErrorAndClose = $_M(c$, "getZipDirectoryOrErrorAndClose", 
($fz = function (is, addManifest) {
var v =  new JU.List ();
var zis =  new java.util.zip.ZipInputStream (is);
var ze;
var manifest = null;
while ((ze = zis.getNextEntry ()) != null) {
var fileName = ze.getName ();
if (addManifest && fileName.equals ("JmolManifest")) manifest = JSV.source.JSVZipUtil.getZipEntryAsString (zis);
 else v.addLast (fileName);
}
zis.close ();
if (addManifest) v.add (0, manifest == null ? "" : manifest + "\n############\n");
var len = v.size ();
var dirList =  new Array (len);
for (var i = 0; i < len; i++) dirList[i] = v.get (i);

return dirList;
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~B");
c$.getZipEntryAsString = $_M(c$, "getZipEntryAsString", 
function (zis) {
var sb =  new JU.SB ();
var buf =  Clazz.newByteArray (1024, 0);
var len;
while (zis.available () == 1 && (len = zis.read (buf, 0, 1024)) > 0) sb.append ( String.instantialize (buf, 0, len));

return sb.toString ();
}, "java.util.zip.ZipInputStream");
c$.getZipEntryAsBytes = $_M(c$, "getZipEntryAsBytes", 
function (zis) {
var buf =  Clazz.newByteArray (1024, 0);
var bytes =  Clazz.newByteArray (4096, 0);
var len = 0;
var totalLen = 0;
while (zis.available () == 1 && (len = zis.read (buf, 0, 1024)) > 0) {
totalLen += len;
if (totalLen >= bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
}
buf =  Clazz.newByteArray (totalLen, 0);
System.arraycopy (bytes, 0, buf, 0, totalLen);
return buf;
}, "java.util.zip.ZipInputStream");
c$.getStreamAsBytes = $_M(c$, "getStreamAsBytes", 
function (bis) {
var buf =  Clazz.newByteArray (1024, 0);
var bytes =  Clazz.newByteArray (4096, 0);
var len = 0;
var totalLen = 0;
while ((len = bis.read (buf, 0, 1024)) > 0) {
totalLen += len;
if (totalLen >= bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
}
buf =  Clazz.newByteArray (totalLen, 0);
System.arraycopy (bytes, 0, buf, 0, totalLen);
return buf;
}, "java.io.BufferedInputStream");
});
