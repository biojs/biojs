Clazz.declarePackage ("J.io2");
Clazz.load (["J.api.JmolZipUtility"], "J.io2.ZipUtil", ["java.io.BufferedInputStream", "$.BufferedReader", "java.lang.Character", "java.util.Hashtable", "$.StringTokenizer", "java.util.zip.CRC32", "$.GZIPInputStream", "$.ZipEntry", "$.ZipInputStream", "javajs.api.ZInputStream", "JU.List", "$.PT", "$.SB", "J.adapter.smarter.AtomSetCollection", "J.api.Interface", "J.io.JmolBinary", "J.io2.JmolZipInputStream", "J.util.Escape", "$.Logger", "$.Txt"], function () {
c$ = Clazz.declareType (J.io2, "ZipUtil", null, J.api.JmolZipUtility);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "newZipInputStream", 
function (is) {
return J.io2.ZipUtil.newZIS (is);
}, "java.io.InputStream");
c$.newZIS = $_M(c$, "newZIS", 
($fz = function (is) {
return (Clazz.instanceOf (is, javajs.api.ZInputStream) ? is : Clazz.instanceOf (is, java.io.BufferedInputStream) ?  new J.io2.JmolZipInputStream (is) :  new J.io2.JmolZipInputStream ( new java.io.BufferedInputStream (is)));
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
$_V(c$, "getAllZipData", 
function (is, subfileList, name0, binaryFileList, fileData) {
J.io2.ZipUtil.getAllZipDataStatic (is, subfileList, name0, binaryFileList, fileData);
}, "java.io.InputStream,~A,~S,~S,java.util.Map");
c$.getAllZipDataStatic = $_M(c$, "getAllZipDataStatic", 
($fz = function (is, subfileList, name0, binaryFileList, fileData) {
var zis = J.io2.ZipUtil.newZIS (is);
var ze;
var listing =  new JU.SB ();
binaryFileList = "|" + binaryFileList + "|";
var prefix = J.util.Txt.join (subfileList, '/', 1);
var prefixd = null;
if (prefix != null) {
prefixd = prefix.substring (0, prefix.indexOf ("/") + 1);
if (prefixd.length == 0) prefixd = null;
}try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (prefix != null && prefixd != null && !(name.equals (prefix) || name.startsWith (prefixd))) continue;
listing.append (name).appendC ('\n');
var sname = "|" + name.substring (name.lastIndexOf ("/") + 1) + "|";
var asBinaryString = (binaryFileList.indexOf (sname) >= 0);
var bytes = J.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
var str;
if (asBinaryString) {
str = J.io2.ZipUtil.getBinaryStringForBytes (bytes);
name += ":asBinaryString";
} else {
str = J.io.JmolBinary.fixUTF (bytes);
}str = "BEGIN Directory Entry " + name + "\n" + str + "\nEND Directory Entry " + name + "\n";
fileData.put (name0 + "|" + name, str);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
fileData.put ("#Directory_Listing", listing.toString ());
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~A,~S,~S,java.util.Map");
c$.getBinaryStringForBytes = $_M(c$, "getBinaryStringForBytes", 
($fz = function (bytes) {
var ret =  new JU.SB ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}, $fz.isPrivate = true, $fz), "~A");
$_V(c$, "getZipFileContents", 
function (bis, list, listPtr, asBufferedInputStream) {
var ret;
if (list == null || listPtr >= list.length) return this.getZipDirectoryAsStringAndClose (bis);
var fileName = list[listPtr];
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
try {
var isAll = (fileName.equals ("."));
if (isAll || fileName.lastIndexOf ("/") == fileName.length - 1) {
ret =  new JU.SB ();
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (isAll || name.startsWith (fileName)) ret.append (name).appendC ('\n');
}
var str = ret.toString ();
return (asBufferedInputStream ? J.io.JmolBinary.getBIS (str.getBytes ()) : str);
}var pt = fileName.indexOf (":asBinaryString");
var asBinaryString = (pt > 0);
if (asBinaryString) fileName = fileName.substring (0, pt);
while ((ze = zis.getNextEntry ()) != null && !fileName.equals (ze.getName ())) {
}
var bytes = (ze == null ? null : J.io.JmolBinary.getStreamBytes (zis, ze.getSize ()));
ze = null;
zis.close ();
if (bytes == null) return "";
if (J.io.JmolBinary.isZipB (bytes)) return this.getZipFileContents (J.io.JmolBinary.getBIS (bytes), list, ++listPtr, asBufferedInputStream);
if (asBufferedInputStream) return J.io.JmolBinary.getBIS (bytes);
if (asBinaryString) {
ret =  new JU.SB ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}return J.io.JmolBinary.fixUTF (bytes);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "";
} else {
throw e;
}
}
}, "java.io.BufferedInputStream,~A,~N,~B");
$_V(c$, "getZipFileContentsAsBytes", 
function (bis, list, listPtr) {
var ret =  Clazz.newByteArray (0, 0);
var fileName = list[listPtr];
if (fileName.lastIndexOf ("/") == fileName.length - 1) return ret;
try {
bis = J.io.JmolBinary.checkPngZipStream (bis);
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = J.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
return (J.io.JmolBinary.isZipB (bytes) && ++listPtr < list.length ? this.getZipFileContentsAsBytes (J.io.JmolBinary.getBIS (bytes), list, listPtr) : bytes);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return ret;
}, "java.io.BufferedInputStream,~A,~N");
$_V(c$, "getZipDirectoryAsStringAndClose", 
function (bis) {
var sb =  new JU.SB ();
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, false);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error (e.toString ());
} else {
throw e;
}
}
for (var i = 0; i < s.length; i++) sb.append (s[i]).appendC ('\n');

return sb.toString ();
}, "java.io.BufferedInputStream");
$_V(c$, "getZipDirectoryAndClose", 
function (bis, addManifest) {
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, addManifest);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
J.util.Logger.error (e.toString ());
} else {
throw e;
}
}
return s;
}, "java.io.BufferedInputStream,~B");
$_M(c$, "getZipDirectoryOrErrorAndClose", 
($fz = function (bis, addManifest) {
bis = J.io.JmolBinary.checkPngZipStream (bis);
var v =  new JU.List ();
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
var manifest = null;
while ((ze = zis.getNextEntry ()) != null) {
var fileName = ze.getName ();
if (addManifest && J.io2.ZipUtil.isJmolManifest (fileName)) manifest = J.io2.ZipUtil.getStreamAsString (zis);
 else if (!fileName.startsWith ("__MACOS")) v.addLast (fileName);
}
zis.close ();
if (addManifest) v.add (0, manifest == null ? "" : manifest + "\n############\n");
return v.toArray ( new Array (v.size ()));
}, $fz.isPrivate = true, $fz), "java.io.BufferedInputStream,~B");
c$.getStreamAsString = $_M(c$, "getStreamAsString", 
function (is) {
return J.io.JmolBinary.fixUTF (J.io.JmolBinary.getStreamBytes (is, -1));
}, "java.io.InputStream");
c$.isJmolManifest = $_M(c$, "isJmolManifest", 
($fz = function (thisEntry) {
return thisEntry.startsWith ("JmolManifest");
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "cacheZipContents", 
function (bis, fileName, cache) {
var zis = this.newZipInputStream (bis);
var ze;
var listing =  new JU.SB ();
var n = 0;
try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
listing.append (name).appendC ('\n');
var nBytes = ze.getSize ();
var bytes = J.io.JmolBinary.getStreamBytes (zis, nBytes);
n += bytes.length;
cache.put (fileName + "|" + name, bytes);
}
zis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
zis.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
return null;
} else {
throw e;
}
}
if (n == 0) return null;
J.util.Logger.info ("ZipUtil cached " + n + " bytes from " + fileName);
return listing.toString ();
}, "java.io.BufferedInputStream,~S,java.util.Map");
c$.getUnGzippedInputStream = $_M(c$, "getUnGzippedInputStream", 
function (bytes) {
try {
return J.io.JmolBinary.getUnzippedInputStream (J.io.JmolBinary.getBIS (bytes));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~A");
$_V(c$, "newGZIPInputStream", 
function (is) {
return  new java.io.BufferedInputStream ( new java.util.zip.GZIPInputStream (is, 512));
}, "java.io.InputStream");
$_V(c$, "getAtomSetCollectionOrBufferedReaderFromZip", 
function (adapter, is, fileName, zipDirectory, htParams, subFilePtr, asBufferedReader) {
var doCombine = (subFilePtr == 1);
htParams.put ("zipSet", fileName);
var subFileList = htParams.get ("subFileList");
if (subFileList == null) subFileList = J.io2.ZipUtil.checkSpecialInZip (zipDirectory);
var subFileName = (subFileList == null || subFilePtr >= subFileList.length ? null : subFileList[subFilePtr]);
if (subFileName != null && (subFileName.startsWith ("/") || subFileName.startsWith ("\\"))) subFileName = subFileName.substring (1);
var selectedFile = 0;
if (subFileName == null && htParams.containsKey ("modelNumber")) {
selectedFile = (htParams.get ("modelNumber")).intValue ();
if (selectedFile > 0 && doCombine) htParams.remove ("modelNumber");
}var manifest = htParams.get ("manifest");
var useFileManifest = (manifest == null);
if (useFileManifest) manifest = (zipDirectory.length > 0 ? zipDirectory[0] : "");
var haveManifest = (manifest.length > 0);
if (haveManifest) {
if (J.util.Logger.debugging) J.util.Logger.debug ("manifest for  " + fileName + ":\n" + manifest);
}var ignoreErrors = (manifest.indexOf ("IGNORE_ERRORS") >= 0);
var selectAll = (manifest.indexOf ("IGNORE_MANIFEST") >= 0);
var exceptFiles = (manifest.indexOf ("EXCEPT_FILES") >= 0);
if (selectAll || subFileName != null) haveManifest = false;
if (useFileManifest && haveManifest) {
var path = J.io.JmolBinary.getManifestScriptPath (manifest);
if (path != null) return "NOTE: file recognized as a script file: " + fileName + path + "\n";
}var vCollections =  new JU.List ();
var htCollections = (haveManifest ?  new java.util.Hashtable () : null);
var nFiles = 0;
var ret = J.io2.ZipUtil.checkSpecialData (is, zipDirectory);
if (Clazz.instanceOf (ret, String)) return ret;
var data = ret;
try {
if (data != null) {
var reader = J.io.JmolBinary.getBR (data.toString ());
if (asBufferedReader) return reader;
ret = adapter.getAtomSetCollectionFromReader (fileName, reader, htParams);
if (Clazz.instanceOf (ret, String)) return ret;
if (Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection)) {
var atomSetCollection = ret;
if (atomSetCollection.errorMessage != null) {
if (ignoreErrors) return null;
return atomSetCollection.errorMessage;
}return atomSetCollection;
}if (ignoreErrors) return null;
return "unknown reader error";
}if (Clazz.instanceOf (is, java.io.BufferedInputStream)) is = J.io.JmolBinary.checkPngZipStream (is);
var zis = J.io.JmolBinary.newZipInputStream (is);
var ze;
if (haveManifest) manifest = '|' + manifest.$replace ('\r', '|').$replace ('\n', '|') + '|';
while ((ze = zis.getNextEntry ()) != null && (selectedFile <= 0 || vCollections.size () < selectedFile)) {
if (ze.isDirectory ()) continue;
var thisEntry = ze.getName ();
if (subFileName != null && !thisEntry.equals (subFileName)) continue;
if (subFileName != null) htParams.put ("subFileName", subFileName);
if (J.io2.ZipUtil.isJmolManifest (thisEntry) || haveManifest && exceptFiles == manifest.indexOf ("|" + thisEntry + "|") >= 0) continue;
var bytes = J.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
if (J.io.JmolBinary.isGzipB (bytes)) bytes = J.io.JmolBinary.getStreamBytes (J.io2.ZipUtil.getUnGzippedInputStream (bytes), -1);
if (J.io.JmolBinary.isZipB (bytes)) {
var bis = J.io.JmolBinary.getBIS (bytes);
var zipDir2 = J.io.JmolBinary.getZipDirectoryAndClose (bis, true);
bis = J.io.JmolBinary.getBIS (bytes);
var atomSetCollections = this.getAtomSetCollectionOrBufferedReaderFromZip (adapter, bis, fileName + "|" + thisEntry, zipDir2, htParams, ++subFilePtr, asBufferedReader);
if (Clazz.instanceOf (atomSetCollections, String)) {
if (ignoreErrors) continue;
return atomSetCollections;
} else if (Clazz.instanceOf (atomSetCollections, J.adapter.smarter.AtomSetCollection) || Clazz.instanceOf (atomSetCollections, JU.List)) {
if (haveManifest && !exceptFiles) htCollections.put (thisEntry, atomSetCollections);
 else vCollections.addLast (atomSetCollections);
} else if (Clazz.instanceOf (atomSetCollections, java.io.BufferedReader)) {
if (doCombine) zis.close ();
return atomSetCollections;
} else {
if (ignoreErrors) continue;
zis.close ();
return "unknown zip reader error";
}} else if (J.io.JmolBinary.isPickleB (bytes)) {
var bis = J.io.JmolBinary.getBIS (bytes);
if (doCombine) zis.close ();
return bis;
} else {
var sData;
if (J.io.JmolBinary.isCompoundDocumentB (bytes)) {
var jd = J.api.Interface.getInterface ("jmol.util.CompoundDocument");
jd.setStream (J.io.JmolBinary.getBIS (bytes), true);
sData = jd.getAllDataFiles ("Molecule", "Input").toString ();
} else {
sData = J.io.JmolBinary.fixUTF (bytes);
}var reader = J.io.JmolBinary.getBR (sData);
if (asBufferedReader) {
if (doCombine) zis.close ();
return reader;
}var fname = fileName + "|" + ze.getName ();
ret = adapter.getAtomSetCollectionFromReader (fname, reader, htParams);
if (!(Clazz.instanceOf (ret, J.adapter.smarter.AtomSetCollection))) {
if (ignoreErrors) continue;
zis.close ();
return "" + ret;
}if (haveManifest && !exceptFiles) htCollections.put (thisEntry, ret);
 else vCollections.addLast (ret);
var a = ret;
if (a.errorMessage != null) {
if (ignoreErrors) continue;
zis.close ();
return a.errorMessage;
}}}
if (doCombine) zis.close ();
if (haveManifest && !exceptFiles) {
var list = JU.PT.split (manifest, "|");
for (var i = 0; i < list.length; i++) {
var file = list[i];
if (file.length == 0 || file.indexOf ("#") == 0) continue;
if (htCollections.containsKey (file)) vCollections.addLast (htCollections.get (file));
 else if (J.util.Logger.debugging) J.util.Logger.debug ("manifested file " + file + " was not found in " + fileName);
}
}if (!doCombine) return vCollections;
var result =  new J.adapter.smarter.AtomSetCollection ("Array", null, null, vCollections);
if (result.errorMessage != null) {
if (ignoreErrors) return null;
return result.errorMessage;
}if (nFiles == 1) selectedFile = 1;
if (selectedFile > 0 && selectedFile <= vCollections.size ()) return vCollections.get (selectedFile - 1);
return result;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
if (ignoreErrors) return null;
J.util.Logger.error ("" + e);
return "" + e;
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
J.util.Logger.errorEx (null, er);
return "" + er;
}
} else {
throw e$$;
}
}
}, "J.api.JmolAdapter,java.io.InputStream,~S,~A,java.util.Map,~N,~B");
c$.checkSpecialData = $_M(c$, "checkSpecialData", 
($fz = function (is, zipDirectory) {
var isSpartan = false;
for (var i = 1; i < zipDirectory.length; i++) {
if (zipDirectory[i].endsWith (".spardir/") || zipDirectory[i].indexOf ("_spartandir") >= 0) {
isSpartan = true;
break;
}}
if (!isSpartan) return null;
var data =  new JU.SB ();
data.append ("Zip File Directory: ").append ("\n").append (J.util.Escape.eAS (zipDirectory, true)).append ("\n");
var fileData =  new java.util.Hashtable ();
J.io2.ZipUtil.getAllZipDataStatic (is, [], "", "Molecule", fileData);
var prefix = "|";
var outputData = fileData.get (prefix + "output");
if (outputData == null) outputData = fileData.get ((prefix = "|" + zipDirectory[1]) + "output");
data.append (outputData);
var files = J.io2.ZipUtil.getSpartanFileList (prefix, J.io2.ZipUtil.getSpartanDirs (outputData));
for (var i = 2; i < files.length; i++) {
var name = files[i];
if (fileData.containsKey (name)) data.append (fileData.get (name));
 else data.append (name + "\n");
}
return data;
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~A");
$_V(c$, "spartanFileList", 
function (name, type) {
var dirNums = J.io2.ZipUtil.getSpartanDirs (type);
if (dirNums.length == 0 && name.endsWith (".spardir.zip") && type.indexOf (".zip|output") >= 0) {
var sname = name.$replace ('\\', '/');
var pt = name.lastIndexOf (".spardir");
pt = sname.lastIndexOf ("/");
sname = name + "|" + name.substring (pt + 1, name.length - 4);
return ["SpartanSmol", sname, sname + "/output"];
}return J.io2.ZipUtil.getSpartanFileList (name, dirNums);
}, "~S,~S");
c$.getSpartanDirs = $_M(c$, "getSpartanDirs", 
($fz = function (outputFileData) {
if (outputFileData == null) return [];
if (outputFileData.startsWith ("java.io.FileNotFoundException") || outputFileData.startsWith ("FILE NOT FOUND") || outputFileData.indexOf ("<html") >= 0) return ["M0001"];
var v =  new JU.List ();
var token;
var lasttoken = "";
try {
var tokens =  new java.util.StringTokenizer (outputFileData, " \t\r\n");
while (tokens.hasMoreTokens ()) {
if ((token = tokens.nextToken ()).equals (")")) v.addLast (lasttoken);
 else if (token.equals ("Start-") && tokens.nextToken ().equals ("Molecule")) v.addLast (JU.PT.split (tokens.nextToken (), "\"")[1]);
lasttoken = token;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return v.toArray ( new Array (v.size ()));
}, $fz.isPrivate = true, $fz), "~S");
c$.getSpartanFileList = $_M(c$, "getSpartanFileList", 
($fz = function (name, dirNums) {
var files =  new Array (2 + dirNums.length * 5);
files[0] = "SpartanSmol";
files[1] = "Directory Entry ";
var pt = 2;
name = name.$replace ('\\', '/');
if (name.endsWith ("/")) name = name.substring (0, name.length - 1);
for (var i = 0; i < dirNums.length; i++) {
var path = name + (Character.isDigit (dirNums[i].charAt (0)) ? "/Profile." + dirNums[i] : "/" + dirNums[i]);
files[pt++] = path + "/#JMOL_MODEL " + dirNums[i];
files[pt++] = path + "/input";
files[pt++] = path + "/archive";
files[pt++] = path + "/Molecule:asBinaryString";
files[pt++] = path + "/proparc";
}
return files;
}, $fz.isPrivate = true, $fz), "~S,~A");
c$.checkSpecialInZip = $_M(c$, "checkSpecialInZip", 
function (zipDirectory) {
var name;
return (zipDirectory.length < 2 ? null : (name = zipDirectory[1]).endsWith (".spardir/") || zipDirectory.length == 2 ? ["", (name.endsWith ("/") ? name.substring (0, name.length - 1) : name)] : null);
}, "~A");
$_V(c$, "getCachedPngjBytes", 
function (fm, pathName) {
if (pathName.indexOf (".png") < 0) return null;
J.util.Logger.info ("FileManager checking PNGJ cache for " + pathName);
var shortName = J.io2.ZipUtil.shortSceneFilename (pathName);
if (fm.pngjCache == null && !this.cachePngjFile (fm, [pathName, null])) return null;
var pngjCache = fm.pngjCache;
var isMin = (pathName.indexOf (".min.") >= 0);
if (!isMin) {
var cName = fm.getCanonicalName (J.io.JmolBinary.getZipRoot (pathName));
if (!pngjCache.containsKey (cName) && !this.cachePngjFile (fm, [pathName, null])) return null;
if (pathName.indexOf ("|") < 0) shortName = cName;
}if (pngjCache.containsKey (shortName)) {
J.util.Logger.info ("FileManager using memory cache " + shortName);
return pngjCache.get (shortName);
}if (!isMin || !this.cachePngjFile (fm, [pathName, null])) return null;
J.util.Logger.info ("FileManager using memory cache " + shortName);
return pngjCache.get (shortName);
}, "J.viewer.FileManager,~S");
$_V(c$, "cachePngjFile", 
function (fm, data) {
var pngjCache = fm.pngjCache =  new java.util.Hashtable ();
if (data == null) return false;
data[1] = null;
if (data[0] == null) return false;
data[0] = J.io.JmolBinary.getZipRoot (data[0]);
var shortName = J.io2.ZipUtil.shortSceneFilename (data[0]);
try {
data[1] = this.cacheZipContents (J.io.JmolBinary.checkPngZipStream (fm.getBufferedInputStreamOrErrorMessageFromName (data[0], null, false, false, null, false)), shortName, fm.pngjCache);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
if (data[1] == null) return false;
var bytes = data[1].getBytes ();
pngjCache.put (fm.getCanonicalName (data[0]), bytes);
if (shortName.indexOf ("_scene_") >= 0) {
pngjCache.put (J.io2.ZipUtil.shortSceneFilename (data[0]), bytes);
bytes = pngjCache.remove (shortName + "|state.spt");
if (bytes != null) pngjCache.put (J.io2.ZipUtil.shortSceneFilename (data[0] + "|state.spt"), bytes);
}for (var key, $key = pngjCache.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) System.out.println (key);

return true;
}, "J.viewer.FileManager,~A");
c$.shortSceneFilename = $_M(c$, "shortSceneFilename", 
($fz = function (pathName) {
var pt = pathName.indexOf ("_scene_") + 7;
if (pt < 7) return pathName;
var s = "";
if (pathName.endsWith ("|state.spt")) {
var pt1 = pathName.indexOf ('.', pt);
if (pt1 < 0) return pathName;
s = pathName.substring (pt, pt1);
}var pt2 = pathName.lastIndexOf ("|");
return pathName.substring (0, pt) + s + (pt2 > 0 ? pathName.substring (pt2) : "");
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "addZipEntry", 
function (zos, fileName) {
(zos).putNextEntry ( new java.util.zip.ZipEntry (fileName));
}, "~O,~S");
$_V(c$, "closeZipEntry", 
function (zos) {
(zos).closeEntry ();
}, "~O");
$_V(c$, "getZipOutputStream", 
function (bos) {
{
return J.api.Interface.getInterface(
"java.util.zip.ZipOutputStream").setZOS(bos);
}}, "~O");
$_V(c$, "getCrcValue", 
function (bytes) {
var crc =  new java.util.zip.CRC32 ();
crc.update (bytes, 0, bytes.length);
return crc.getValue ();
}, "~A");
});
