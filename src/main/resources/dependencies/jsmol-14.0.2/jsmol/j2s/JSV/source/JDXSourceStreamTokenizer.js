Clazz.declarePackage ("JSV.source");
Clazz.load (null, "JSV.source.JDXSourceStreamTokenizer", ["java.lang.Character", "JU.SB", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.br = null;
this.label = null;
this.value = null;
this.labelLineNo = 0;
this.line = null;
this.lineNo = 0;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXSourceStreamTokenizer");
Clazz.makeConstructor (c$, 
function (br) {
this.br = br;
}, "java.io.BufferedReader");
$_M(c$, "peakLabel", 
function () {
return this.nextLabel (false);
});
$_M(c$, "getLabel", 
function () {
return this.nextLabel (true);
});
$_M(c$, "nextLabel", 
($fz = function (isGet) {
this.label = null;
this.value = null;
while (this.line == null) {
try {
this.readLine ();
if (this.line == null) {
this.line = "";
return null;
}this.line = this.line.trim ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
this.line = "";
return null;
} else {
throw e;
}
}
if (this.line.startsWith ("##")) break;
this.line = null;
}
var pt = this.line.indexOf ("=");
if (pt < 0) {
if (isGet) J.util.Logger.info ("BAD JDX LINE -- no '=' (line " + this.lineNo + "): " + this.line);
this.label = this.line;
if (!isGet) this.line = "";
} else {
this.label = this.line.substring (0, pt).trim ();
if (isGet) this.line = this.line.substring (pt + 1);
}this.labelLineNo = this.lineNo;
if (J.util.Logger.debugging) J.util.Logger.info (this.label);
return JSV.source.JDXSourceStreamTokenizer.cleanLabel (this.label);
}, $fz.isPrivate = true, $fz), "~B");
c$.cleanLabel = $_M(c$, "cleanLabel", 
function (label) {
if (label == null) return null;
var i;
var str =  new JU.SB ();
for (i = 0; i < label.length; i++) {
switch (label.charAt (i)) {
case '/':
case '\\':
case ' ':
case '-':
case '_':
break;
default:
str.appendC (label.charAt (i));
break;
}
}
return str.toString ().toUpperCase ();
}, "~S");
$_M(c$, "getRawLabel", 
function () {
return this.label;
});
$_M(c$, "getLabelLineNo", 
function () {
return this.labelLineNo;
});
$_M(c$, "getValue", 
function () {
if (this.value != null) return this.value;
var sb =  new JU.SB ().append (this.line);
if (sb.length () > 0) sb.appendC ('\n');
try {
while (this.readLine () != null) {
if (this.line.indexOf ("##") >= 0 && this.line.trim ().startsWith ("##")) break;
sb.append (this.line).appendC ('\n');
}
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.value = JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
if (J.util.Logger.debugging) J.util.Logger.info (this.value);
return this.value;
});
$_M(c$, "readLineTrimmed", 
function () {
this.readLine ();
if (this.line == null) return null;
if (this.line.indexOf ("$$") < 0) return this.line.trim ();
var sb =  new JU.SB ().append (this.line);
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
$_M(c$, "flushLine", 
function () {
var sb =  new JU.SB ().append (this.line);
this.line = null;
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
$_M(c$, "readLine", 
($fz = function () {
this.line = this.br.readLine ();
this.lineNo++;
return this.line;
}, $fz.isPrivate = true, $fz));
c$.trimLines = $_M(c$, "trimLines", 
($fz = function (v) {
var n = v.length ();
var ilast = n - 1;
var vpt = JSV.source.JDXSourceStreamTokenizer.ptNonWhite (v, 0, n);
if (vpt >= n) return "";
if (v.charAt (vpt) == '<') {
n = v.lastIndexOf (">") + 1;
if (n == 0) n = v.length ();
return v.toString ().substring (vpt, n);
}var buffer =  Clazz.newCharArray (n - vpt, '\0');
var pt = 0;
for (; vpt < n; vpt++) {
var ch;
switch (ch = v.charAt (vpt)) {
case '\r':
if (vpt < ilast && v.charAt (vpt + 1) == '\n') continue;
ch = '\n';
break;
case '\n':
if (pt > 0 && buffer[pt - 1] != '\n') pt -= vpt - JSV.source.JDXSourceStreamTokenizer.ptNonSpaceRev (v, vpt) - 1;
vpt = JSV.source.JDXSourceStreamTokenizer.ptNonSpace (v, ++vpt, n) - 1;
break;
case '$':
if (vpt < ilast && v.charAt (vpt + 1) == '$') {
vpt++;
while (++vpt < n && "\n\r".indexOf (v.charAt (vpt)) < 0) {
}
continue;
}break;
}
if (ch == '\n' && pt > 0 && buffer[pt - 1] == '\n') continue;
buffer[pt++] = ch;
}
if (pt > 0 && buffer[pt - 1] == '\n') --pt;
return ( String.instantialize (buffer)).substring (0, pt).trim ();
}, $fz.isPrivate = true, $fz), "JU.SB");
c$.ptNonWhite = $_M(c$, "ptNonWhite", 
($fz = function (v, pt, n) {
while (pt < n && Character.isWhitespace (v.charAt (pt))) pt++;

return pt;
}, $fz.isPrivate = true, $fz), "JU.SB,~N,~N");
c$.ptNonSpace = $_M(c$, "ptNonSpace", 
($fz = function (v, pt, n) {
while (pt < n && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) pt++;

return pt;
}, $fz.isPrivate = true, $fz), "JU.SB,~N,~N");
c$.ptNonSpaceRev = $_M(c$, "ptNonSpaceRev", 
($fz = function (v, pt) {
while (--pt >= 0 && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) {
}
return pt;
}, $fz.isPrivate = true, $fz), "JU.SB,~N");
});
