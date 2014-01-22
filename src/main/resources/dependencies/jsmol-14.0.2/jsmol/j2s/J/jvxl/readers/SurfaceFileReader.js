Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.SurfaceReader"], "J.jvxl.readers.SurfaceFileReader", ["JU.PT", "J.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.br = null;
this.binarydoc = null;
this.out = null;
this.line = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "SurfaceFileReader", J.jvxl.readers.SurfaceReader);
Clazz.prepareFields (c$, function () {
this.next =  Clazz.newIntArray (1, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.SurfaceFileReader, []);
});
$_V(c$, "init", 
function (sg) {
this.initSR (sg);
}, "J.jvxl.readers.SurfaceGenerator");
$_M(c$, "init2", 
function (sg, br) {
this.init2SFR (sg, br);
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
$_M(c$, "init2SFR", 
function (sg, br) {
this.init (sg);
this.br = br;
}, "J.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
$_M(c$, "newBinaryDocument", 
function () {
return J.api.Interface.getOptionInterface ("io2.BinaryDocument");
});
$_V(c$, "setOutputChannel", 
function (out) {
if (this.binarydoc == null) this.out = out;
 else this.sg.setOutputChannel (this.binarydoc, out);
}, "JU.OC");
$_V(c$, "closeReader", 
function () {
this.closeReaderSFR ();
});
$_M(c$, "closeReaderSFR", 
function () {
if (this.br != null) try {
this.br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.out != null) this.out.closeChannel ();
if (this.binarydoc != null) this.binarydoc.close ();
});
$_V(c$, "discardTempData", 
function (discardAll) {
this.closeReader ();
this.discardTempDataSR (discardAll);
}, "~B");
$_M(c$, "getTokens", 
function () {
return JU.PT.getTokensAt (this.line, 0);
});
$_M(c$, "parseFloat", 
function () {
return JU.PT.parseFloatNext (this.line, this.next);
});
$_M(c$, "parseFloatStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseFloatNext (s, this.next);
}, "~S");
$_M(c$, "parseFloatRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return JU.PT.parseFloatRange (s, iEnd, this.next);
}, "~S,~N,~N");
$_M(c$, "parseInt", 
function () {
return JU.PT.parseIntNext (this.line, this.next);
});
$_M(c$, "parseIntStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseIntNext (s, this.next);
}, "~S");
$_M(c$, "parseIntNext", 
function (s) {
return JU.PT.parseIntNext (s, this.next);
}, "~S");
$_M(c$, "parseFloatArrayStr", 
function (s) {
this.next[0] = 0;
return JU.PT.parseFloatArrayNext (s, this.next, null, null, null);
}, "~S");
$_M(c$, "parseFloatArray", 
function (a, strStart, strEnd) {
return JU.PT.parseFloatArrayNext (this.line, this.next, a, strStart, strEnd);
}, "~A,~S,~S");
$_M(c$, "getQuotedStringNext", 
function () {
return JU.PT.getQuotedStringNext (this.line, this.next);
});
$_M(c$, "skipTo", 
function (info, what) {
if (info != null) while (this.readLine ().indexOf (info) < 0) {
}
if (what != null) this.next[0] = this.line.indexOf (what) + what.length + 2;
}, "~S,~S");
$_M(c$, "readLine", 
function () {
this.line = this.br.readLine ();
if (this.line != null) {
this.nBytes += this.line.length;
if (this.out != null) {
var b = this.line.getBytes ();
this.out.write (b, 0, b.length);
this.out.writeByteAsInt (0x0A);
}}return this.line;
});
});
