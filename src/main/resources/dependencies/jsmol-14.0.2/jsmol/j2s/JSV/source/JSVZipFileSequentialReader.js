Clazz.declarePackage ("JSV.source");
Clazz.load (["java.io.BufferedReader", "JSV.api.JSVZipReader"], "JSV.source.JSVZipFileSequentialReader", ["java.io.StringReader", "java.util.zip.ZipInputStream", "JU.SB", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.subFileList = null;
this.zis = null;
this.ze = null;
this.ptMark = 0;
this.data = null;
this.startCode = null;
this.lineCount = 0;
this.buf = null;
this.len = 0;
this.pt = 0;
this.cr = '\0';
Clazz.instantialize (this, arguments);
}, JSV.source, "JSVZipFileSequentialReader", java.io.BufferedReader, JSV.api.JSVZipReader);
Clazz.prepareFields (c$, function () {
this.buf =  Clazz.newByteArray (1024, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.source.JSVZipFileSequentialReader, [ new java.io.StringReader ("")]);
});
$_V(c$, "set", 
function (bis, subFileList, startCode) {
this.subFileList = subFileList;
this.zis =  new java.util.zip.ZipInputStream (bis);
this.startCode = startCode;
this.nextEntry ();
return this;
}, "java.io.InputStream,~A,~S");
$_V(c$, "close", 
function () {
try {
this.close ();
this.zis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
$_V(c$, "mark", 
function (limit) {
this.ptMark = this.pt;
if (this.len == 0) {
this.readLine ();
this.pt = this.ptMark;
}}, "~N");
$_V(c$, "reset", 
function () {
this.pt = this.ptMark;
});
$_V(c$, "read", 
function (chars, chPt, chLen) {
var l = Math.min (this.len - this.pt, chLen);
this.data.getChars (0, l, chars, chPt);
return l;
}, "~A,~N,~N");
$_V(c$, "readLine", 
function () {
while (this.ze != null) {
try {
var line = this.getEntryLine ();
if (line != null) return line;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
break;
} else {
throw e;
}
}
this.nextEntry ();
}
return null;
});
$_M(c$, "nextEntry", 
($fz = function () {
this.len = this.pt = 0;
this.cr = '\0';
this.lineCount = 0;
try {
while ((this.ze = this.zis.getNextEntry ()) != null) if (this.isEntryOK (this.ze.getName ())) return;

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.ze = null;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "isEntryOK", 
($fz = function (name) {
if (this.subFileList == null || this.subFileList.length == 1) return true;
for (var i = this.subFileList.length; --i >= 0; ) if (this.subFileList[i].equals (name)) {
J.util.Logger.info ("...reading zip entry " + name);
return true;
}
J.util.Logger.info ("...skipping zip entry " + name);
return false;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getEntryLine", 
($fz = function () {
var line = null;
while (this.len >= 0 && (this.pt < this.len || this.zis.available () == 1)) {
var pt0 = this.pt;
var ch = ' ';
while (this.pt < this.len && ch != this.cr) {
switch (ch = this.data.charAt (this.pt++)) {
case '\n':
if (this.cr == '\r') {
pt0 = this.pt;
continue;
}this.cr = '\n';
break;
case '\r':
if (this.cr == '\n') continue;
this.cr = '\r';
break;
}
}
if (line == null) line =  new JU.SB ();
if (this.pt != pt0) line.append (this.data.substring (pt0, this.pt + (ch == this.cr ? -1 : 0)));
if (ch == this.cr || this.zis.available () != 1 || (this.len = this.zis.read (this.buf, 0, 1024)) < 0) {
if (this.lineCount++ == 0 && this.startCode != null && line.indexOf (this.startCode) < 0) return null;
return line.toString ();
}this.pt = 0;
this.data =  String.instantialize (this.buf, 0, this.len);
if (this.data.indexOf ('\0') >= 0) return null;
}
return (line == null ? null : line.toString ());
}, $fz.isPrivate = true, $fz));
});
