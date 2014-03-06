Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.JSVFileManager", ["java.io.BufferedInputStream", "$.BufferedReader", "$.IOException", "$.InputStreamReader", "$.StringReader", "java.net.URL", "java.util.Hashtable", "JU.AU", "$.Encoding", "$.PT", "$.SB", "JSV.common.JSVersion", "$.JSViewer", "JSV.util.JSVEscape", "J.util.Logger"], function () {
c$ = Clazz.declareType (JSV.common, "JSVFileManager");
$_M(c$, "isApplet", 
function () {
return (JSV.common.JSVFileManager.appletDocumentBase != null);
});
c$.getFileAsString = $_M(c$, "getFileAsString", 
function (name) {
if (name == null) return null;
var br;
var sb =  new JU.SB ();
try {
br = JSV.common.JSVFileManager.getBufferedReaderFromName (name, null);
var line;
while ((line = br.readLine ()) != null) {
sb.append (line);
sb.appendC ('\n');
}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return sb.toString ();
}, "~S");
c$.getBufferedReaderForInputStream = $_M(c$, "getBufferedReaderForInputStream", 
function ($in) {
try {
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return null;
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.getBufferedReaderForString = $_M(c$, "getBufferedReaderForString", 
function (data) {
return (data == null ? null :  new java.io.BufferedReader ( new java.io.StringReader (data)));
}, "~S");
c$.getBufferedReaderFromName = $_M(c$, "getBufferedReaderFromName", 
function (name, startCode) {
if (name == null) throw  new java.io.IOException ("Cannot find " + name);
J.util.Logger.info ("JSVFileManager getBufferedReaderFromName " + name);
var path = JSV.common.JSVFileManager.getFullPathName (name);
J.util.Logger.info ("JSVFileManager getBufferedReaderFromName " + path);
return JSV.common.JSVFileManager.getUnzippedBufferedReaderFromName (path, startCode);
}, "~S,~S");
c$.getFullPathName = $_M(c$, "getFullPathName", 
function (name) {
if (JSV.common.JSVFileManager.appletDocumentBase == null) {
if (JSV.common.JSVFileManager.isURL (name)) {
var url =  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null);
return url.toString ();
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (name).getFullPath ();
}if (name.indexOf (":\\") == 1 || name.indexOf (":/") == 1) name = "file:///" + name;
var url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
return url.toString ();
}, "~S");
c$.isURL = $_M(c$, "isURL", 
function (name) {
for (var i = JSV.common.JSVFileManager.urlPrefixes.length; --i >= 0; ) if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) return true;

return false;
}, "~S");
c$.urlTypeIndex = $_M(c$, "urlTypeIndex", 
function (name) {
for (var i = 0; i < JSV.common.JSVFileManager.urlPrefixes.length; ++i) {
if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
c$.isLocal = $_M(c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = JSV.common.JSVFileManager.urlTypeIndex (fileName);
return (itype < 0 || itype == 4);
}, "~S");
c$.getUnzippedBufferedReaderFromName = $_M(c$, "getUnzippedBufferedReaderFromName", 
($fz = function (name, startCode) {
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name, "|");
if (subFileList != null && subFileList.length > 0) name = subFileList[0];
}if (name.startsWith ("http://SIMULATION/")) return JSV.common.JSVFileManager.getBufferedReaderForString (JSV.common.JSVFileManager.getNMRSimulationJCampDX (name.substring ("http://SIMULATION/".length)));
if (JSV.common.JSVFileManager.viewer.isApplet) {
var ret = JSV.common.JSVFileManager.viewer.apiPlatform.getBufferedURLInputStream ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null), null, null);
if (Clazz.instanceOf (ret, JU.SB) || Clazz.instanceOf (ret, String)) {
return  new java.io.BufferedReader ( new java.io.StringReader (ret.toString ()));
} else if (JSV.common.JSVFileManager.isAB (ret)) {
return  new java.io.BufferedReader ( new java.io.StringReader ( String.instantialize (ret)));
} else {
return  new java.io.BufferedReader ( new java.io.InputStreamReader (ret, "UTF-8"));
}}var $in = JSV.common.JSVFileManager.getInputStream (name, true, null);
var bis =  new java.io.BufferedInputStream ($in);
$in = bis;
if (JSV.common.JSVFileManager.isZipFile (bis)) return (JSV.common.JSViewer.getInterface ("JSV.util.JSVZipUtil")).newJSVZipFileSequentialReader ($in, subFileList, startCode);
if (JSV.common.JSVFileManager.isGzip (bis)) $in = (JSV.common.JSViewer.getInterface ("JSV.util.JSVZipUtil")).newGZIPInputStream ($in);
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.isAB = $_M(c$, "isAB", 
function (x) {
{
return Clazz.isAI(x);
}}, "~O");
c$.isZipFile = $_M(c$, "isZipFile", 
function (is) {
var abMagic =  Clazz.newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x50 && abMagic[1] == 0x4B && abMagic[2] == 0x03 && abMagic[3] == 0x04);
}, "java.io.InputStream");
c$.isGzip = $_M(c$, "isGzip", 
($fz = function (is) {
var abMagic =  Clazz.newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x1F && abMagic[1] == 0x8B);
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
c$.getStreamAsBytes = $_M(c$, "getStreamAsBytes", 
function (bis, out) {
var buf =  Clazz.newByteArray (1024, 0);
var bytes = (out == null ?  Clazz.newByteArray (4096, 0) : null);
var len = 0;
var totalLen = 0;
while ((len = bis.read (buf, 0, 1024)) > 0) {
totalLen += len;
if (out == null) {
if (totalLen >= bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
} else {
out.write (buf, 0, len);
}}
bis.close ();
if (out == null) {
return JU.AU.arrayCopyByte (bytes, totalLen);
}return totalLen + " bytes";
}, "java.io.BufferedInputStream,JU.OC");
c$.postByteArray = $_M(c$, "postByteArray", 
function (fileName, bytes) {
var ret = null;
try {
ret = JSV.common.JSVFileManager.getInputStream (fileName, false, bytes);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return e.toString ();
} else {
throw e;
}
}
if (Clazz.instanceOf (ret, String)) return ret;
try {
ret = JSV.common.JSVFileManager.getStreamAsBytes (ret, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
try {
(ret).close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
} else {
throw e;
}
}
return (ret == null ? "" : JSV.common.JSVFileManager.fixUTF (ret));
}, "~S,~A");
c$.getUTFEncoding = $_M(c$, "getUTFEncoding", 
($fz = function (bytes) {
if (bytes.length >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) return JU.Encoding.UTF8;
if (bytes.length >= 4 && bytes[0] == 0 && bytes[1] == 0 && bytes[2] == 0xFE && bytes[3] == 0xFF) return JU.Encoding.UTF_32BE;
if (bytes.length >= 4 && bytes[0] == 0xFF && bytes[1] == 0xFE && bytes[2] == 0 && bytes[3] == 0) return JU.Encoding.UTF_32LE;
if (bytes.length >= 2 && bytes[0] == 0xFF && bytes[1] == 0xFE) return JU.Encoding.UTF_16LE;
if (bytes.length >= 2 && bytes[0] == 0xFE && bytes[1] == 0xFF) return JU.Encoding.UTF_16BE;
return JU.Encoding.NONE;
}, $fz.isPrivate = true, $fz), "~A");
c$.fixUTF = $_M(c$, "fixUTF", 
function (bytes) {
var encoding = JSV.common.JSVFileManager.getUTFEncoding (bytes);
if (encoding !== JU.Encoding.NONE) try {
var s =  String.instantialize (bytes, encoding.name ().$replace ('_', '-'));
switch (encoding) {
case JU.Encoding.UTF8:
case JU.Encoding.UTF_16BE:
case JU.Encoding.UTF_16LE:
s = s.substring (1);
break;
default:
break;
}
return s;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
System.out.println (e);
} else {
throw e;
}
}
return  String.instantialize (bytes);
}, "~A");
c$.getInputStream = $_M(c$, "getInputStream", 
function (name, showMsg, postBytes) {
var isURL = JSV.common.JSVFileManager.isURL (name);
var isApplet = (JSV.common.JSVFileManager.appletDocumentBase != null);
var $in = null;
var post = null;
var iurl;
if (isURL && (iurl = name.indexOf ("?POST?")) >= 0) {
post = name.substring (iurl + 6);
name = name.substring (0, iurl);
}if (isApplet || isURL) {
var url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
J.util.Logger.info ("JSVFileManager opening URL " + url + (post == null ? "" : " with POST of " + post.length + " bytes"));
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getBufferedURLInputStream (url, postBytes, post);
if (Clazz.instanceOf ($in, String)) {
J.util.Logger.info ("JSVFileManager could not get this URL:" + $in);
return null;
}} else {
if (showMsg) J.util.Logger.info ("JSVFileManager opening file " + name);
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getBufferedFileInputStream (name);
}return $in;
}, "~S,~B,~A");
c$.getNMRSimulationJCampDX = $_M(c$, "getNMRSimulationJCampDX", 
($fz = function (name) {
if (JSV.common.JSVFileManager.htSimulate == null) JSV.common.JSVFileManager.htSimulate =  new java.util.Hashtable ();
var key = "" + name.substring (name.indexOf ("V2000") + 1).hashCode ();
var jcamp = JSV.common.JSVFileManager.htSimulate.get (key);
if (jcamp != null) return jcamp;
var isInline = name.startsWith ("MOL=");
var molFile;
if ((molFile = (isInline ? JU.PT.simpleReplace (name.substring (4), "\\n", "\n") : JSV.common.JSVFileManager.getFileAsString (JU.PT.simpleReplace (JSV.common.JSVFileManager.nciResolver, "%FILE", JU.PT.escapeUrl (name.substring (1)))))) == null) J.util.Logger.info ("no data returned");
var pt = molFile.indexOf ("\n");
molFile = "/JSpecView " + JSV.common.JSVersion.VERSION + molFile.substring (pt);
molFile = JU.PT.simpleReplace (molFile, "?", "_");
var json = JSV.common.JSVFileManager.getFileAsString (JSV.common.JSVFileManager.nmrdbServer + molFile);
System.out.println (json);
json = JU.PT.simpleReplace (json, "\\r\\n", "\n");
json = JU.PT.simpleReplace (json, "\\t", "\t");
json = JU.PT.simpleReplace (json, "\\n", "\n");
molFile = JSV.common.JSVFileManager.getQuotedJSONAttribute (json, "molfile", null);
var xml = JSV.common.JSVFileManager.getQuotedJSONAttribute (json, "xml", null);
xml = JU.PT.simpleReplace (xml, "</", "\n</");
xml = JU.PT.simpleReplace (xml, "><", ">\n<");
xml = JU.PT.simpleReplace (xml, "\\\"", "\"");
jcamp = JSV.common.JSVFileManager.getQuotedJSONAttribute (json, "jcamp", null);
jcamp = "##TITLE=" + (isInline ? "JMOL SIMULATION" : name) + "\n" + jcamp.substring (jcamp.indexOf ("\n##") + 1);
J.util.Logger.info (jcamp.substring (0, jcamp.indexOf ("##XYDATA") + 40) + "...");
pt = 0;
pt = jcamp.indexOf ("##.");
var id = name;
var pt1 = id.indexOf ("id='");
if (isInline && pt1 > 0) id = id.substring (pt1 + 4, (id + "'").indexOf ("'", pt1 + 4));
jcamp = jcamp.substring (0, pt) + "##$MODELS=\n<Models>\n" + "<ModelData id=" + JSV.util.JSVEscape.eS (id) + "\n type=\"MOL\">\n" + molFile + "</ModelData>\n</Models>\n" + "##$SIGNALS=\n" + xml + "\n" + jcamp.substring (pt);
JSV.common.JSVFileManager.htSimulate.put (key, jcamp);
return jcamp;
}, $fz.isPrivate = true, $fz), "~S");
c$.getResource = $_M(c$, "getResource", 
($fz = function (object, fileName, error) {
var url = null;
try {
if ((url = object.getClass ().getResource (fileName)) == null) error[0] = "Couldn't find file: " + fileName;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
error[0] = "Exception " + e + " in getResource " + fileName;
} else {
throw e;
}
}
return url;
}, $fz.isPrivate = true, $fz), "~O,~S,~A");
c$.getResourceString = $_M(c$, "getResourceString", 
function (object, name, error) {
var url = JSV.common.JSVFileManager.getResource (object, name, error);
if (url == null) {
error[0] = "Error loading resource " + name;
return null;
}if (Clazz.instanceOf (url, String)) {
return JSV.common.JSVFileManager.getFileAsString (url);
}var sb =  new JU.SB ();
try {
var br =  new java.io.BufferedReader ( new java.io.InputStreamReader ((url).getContent (), "UTF-8"));
var line;
while ((line = br.readLine ()) != null) sb.append (line).append ("\n");

br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
error[0] = e.toString ();
} else {
throw e;
}
}
return sb.toString ();
}, "~O,~S,~A");
c$.getJmolFilePath = $_M(c$, "getJmolFilePath", 
function (filePath) {
try {
filePath = JSV.common.JSVFileManager.getFullPathName (filePath);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
return (JSV.common.JSVFileManager.appletDocumentBase == null ? filePath.$replace ('\\', '/') : filePath);
}, "~S");
c$.getName = $_M(c$, "getName", 
function (fileName) {
if (fileName == null) return "String" + (++JSV.common.JSVFileManager.stringCount);
if (JSV.common.JSVFileManager.isURL (fileName)) {
try {
if (fileName.startsWith ("http://SIMULATION/") && fileName.length > 100) return fileName.substring (0, Math.min (fileName.length, 30)) + "...";
var name = ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), fileName, null)).getFile ();
return name.substring (name.lastIndexOf ('/') + 1);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (fileName).getName ();
}, "~S");
c$.getQuotedJSONAttribute = $_M(c$, "getQuotedJSONAttribute", 
function (json, key1, key2) {
if (key2 == null) key2 = key1;
key1 = "\"" + key1 + "\":";
key2 = "\"" + key2 + "\":";
var pt1 = json.indexOf (key1);
var pt2 = json.indexOf (key2, pt1);
return (pt1 < 0 || pt2 < 0 ? null : JU.PT.getQuotedStringAt (json, pt2 + key2.length));
}, "~S,~S,~S");
c$.setDocumentBase = $_M(c$, "setDocumentBase", 
function (v, documentBase) {
JSV.common.JSVFileManager.viewer = v;
JSV.common.JSVFileManager.appletDocumentBase = documentBase;
}, "JSV.common.JSViewer,java.net.URL");
Clazz.defineStatics (c$,
"SIMULATION_PROTOCOL", "http://SIMULATION/",
"appletDocumentBase", null,
"viewer", null,
"jsDocumentBase", "");
c$.urlPrefixes = c$.prototype.urlPrefixes = ["http:", "https:", "ftp:", "http://SIMULATION/", "file:"];
Clazz.defineStatics (c$,
"URL_LOCAL", 4,
"nciResolver", "http://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf",
"nmrdbServer", "http://www.nmrdb.org/tools/jmol/predict.php?POST?molfile=",
"htSimulate", null,
"stringCount", 0);
});
