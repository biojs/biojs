Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["javajs.api.GenericFileInterface"], "J.awtjs2d.JSFile", ["JU.PT", "J.viewer.FileManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.fullName = null;
Clazz.instantialize (this, arguments);
}, J.awtjs2d, "JSFile", null, javajs.api.GenericFileInterface);
c$.newFile = $_M(c$, "newFile", 
function (name) {
return  new J.awtjs2d.JSFile (name);
}, "~S");
Clazz.makeConstructor (c$, 
function (name) {
this.name = name.$replace ('\\', '/');
this.fullName = name;
if (!this.fullName.startsWith ("/") && J.viewer.FileManager.urlTypeIndex (name) < 0) this.fullName = J.viewer.Viewer.jsDocumentBase + "/" + this.fullName;
this.fullName = JU.PT.simpleReplace (this.fullName, "/./", "/");
name = name.substring (name.lastIndexOf ("/") + 1);
}, "~S");
$_V(c$, "getParentAsFile", 
function () {
var pt = this.fullName.lastIndexOf ("/");
return (pt < 0 ? null :  new J.awtjs2d.JSFile (this.fullName.substring (0, pt)));
});
$_V(c$, "getFullPath", 
function () {
return this.fullName;
});
$_V(c$, "getName", 
function () {
return this.name;
});
$_V(c$, "isDirectory", 
function () {
return this.fullName.endsWith ("/");
});
$_V(c$, "length", 
function () {
return 0;
});
c$.getBufferedURLInputStream = $_M(c$, "getBufferedURLInputStream", 
function (url, outputBytes, post) {
try {
var conn = url.openConnection ();
if (outputBytes != null) conn.outputBytes (outputBytes);
 else if (post != null) conn.outputString (post);
return conn.getSB ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return e.toString ();
} else {
throw e;
}
}
}, "java.net.URL,~A,~S");
});
