Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.api.JSVFileHelper"], "JSV.js2d.JsFileHelper", ["JSV.js2d.JsFile"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsFileHelper", null, JSV.api.JSVFileHelper);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "set", 
function (viewer) {
return this;
}, "JSV.common.JSViewer");
$_V(c$, "getFile", 
function (fileName, panelOrFrame, isSave) {
var f = null;
{
f = prompt("Enter a file name:", fileName);
}return (f == null ? null :  new JSV.js2d.JsFile (f));
}, "~S,~O,~B");
$_V(c$, "setDirLastExported", 
function (name) {
return name;
}, "~S");
$_V(c$, "setFileChooser", 
function (pdf) {
}, "JSV.common.ExportType");
});
