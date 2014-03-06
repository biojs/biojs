Clazz.declarePackage ("javajs.export");
Clazz.load (["JU.SB"], "javajs.export.PDFObject", ["java.io.ByteArrayOutputStream", "java.util.Hashtable", "$.Map", "java.util.zip.Deflater", "$.DeflaterOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dictionary = null;
this.stream = null;
this.index = 0;
this.type = null;
this.len = 0;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, javajs["export"], "PDFObject", JU.SB);
Clazz.makeConstructor (c$, 
function (index) {
Clazz.superConstructor (this, javajs["export"].PDFObject, []);
this.index = index;
}, "~N");
$_M(c$, "getRef", 
function () {
return this.index + " 0 R";
});
$_M(c$, "getID", 
function () {
return this.type.substring (0, 1) + this.index;
});
$_M(c$, "isFont", 
function () {
return "Font".equals (this.type);
});
$_M(c$, "setStream", 
function (stream) {
this.stream = stream;
}, "~A");
$_M(c$, "getDef", 
function (key) {
return this.dictionary.get (key);
}, "~S");
$_M(c$, "addDef", 
function (key, value) {
if (this.dictionary == null) this.dictionary =  new java.util.Hashtable ();
this.dictionary.put (key, value);
if (key.equals ("Type")) this.type = (value).substring (1);
}, "~S,~O");
$_M(c$, "setAsStream", 
function () {
this.stream = this.toBytes (0, -1);
this.setLength (0);
});
$_M(c$, "output", 
function (os) {
if (this.index > 0) {
var s = this.index + " 0 obj\n";
this.write (os, s.getBytes (), 0);
}var streamLen = 0;
if (this.dictionary != null) {
if (this.dictionary.containsKey ("Length")) {
if (this.stream == null) this.setAsStream ();
streamLen = this.stream.length;
var doDeflate = (streamLen > 1000);
if (doDeflate) {
var deflater =  new java.util.zip.Deflater (9);
var outBytes =  new java.io.ByteArrayOutputStream (1024);
var compBytes =  new java.util.zip.DeflaterOutputStream (outBytes, deflater);
compBytes.write (this.stream, 0, streamLen);
compBytes.finish ();
this.stream = outBytes.toByteArray ();
this.dictionary.put ("Filter", "/FlateDecode");
streamLen = this.stream.length;
}this.dictionary.put ("Length", "" + streamLen);
}this.write (os, this.getDictionaryText (this.dictionary, "\n").getBytes (), 0);
}if (this.length () > 0) this.write (os, this.toString ().getBytes (), 0);
if (this.stream != null) {
this.write (os, "stream\r\n".getBytes (), 0);
this.write (os, this.stream, streamLen);
this.write (os, "\r\nendstream\r\n".getBytes (), 0);
}if (this.index > 0) this.write (os, "endobj\n".getBytes (), 0);
return this.len;
}, "java.io.OutputStream");
$_M(c$, "write", 
($fz = function (os, bytes, nBytes) {
if (nBytes == 0) nBytes = bytes.length;
this.len += nBytes;
os.write (bytes, 0, nBytes);
}, $fz.isPrivate = true, $fz), "java.io.OutputStream,~A,~N");
$_M(c$, "getDictionaryText", 
($fz = function (d, nl) {
var sb =  new JU.SB ();
sb.append ("<<");
if (d.containsKey ("Type")) sb.append ("/Type").appendO (d.get ("Type"));
for (var e, $e = d.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var s = e.getKey ();
if (s.equals ("Type") || s.startsWith ("!")) continue;
sb.append ("/" + s);
var o = e.getValue ();
if (Clazz.instanceOf (o, java.util.Map)) {
sb.append ((this.getDictionaryText (o, "")));
continue;
}s = e.getValue ();
if (!s.startsWith ("/")) sb.append (" ");
sb.appendO (s);
}
return (sb.length () > 3 ? sb.append (">>").append (nl).toString () : "");
}, $fz.isPrivate = true, $fz), "java.util.Map,~S");
$_M(c$, "createSubdict", 
($fz = function (d0, dict) {
var d = d0.get (dict);
if (d == null) d0.put (dict, d =  new java.util.Hashtable ());
return d;
}, $fz.isPrivate = true, $fz), "java.util.Map,~S");
$_M(c$, "addResource", 
function (type, key, value) {
var r = this.createSubdict (this.dictionary, "Resources");
if (type != null) r = this.createSubdict (r, type);
r.put (key, value);
}, "~S,~S,~S");
});
