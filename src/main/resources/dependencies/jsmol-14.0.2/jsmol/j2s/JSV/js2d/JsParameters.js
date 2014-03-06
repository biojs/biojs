Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.common.ColorParameters"], "JSV.js2d.JsParameters", ["javajs.awt.Color"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsParameters", JSV.common.ColorParameters);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsParameters, []);
});
$_V(c$, "isValidFontName", 
function (name) {
return true;
}, "~S");
$_V(c$, "getColor1", 
function (rgb) {
return javajs.awt.Color.get1 (rgb);
}, "~N");
$_V(c$, "getColor3", 
function (r, g, b) {
return javajs.awt.Color.get3 (r, g, b);
}, "~N,~N,~N");
$_M(c$, "copy", 
function (newName) {
return ( new JSV.js2d.JsParameters ().setName (newName)).setElementColors (this);
}, "~S");
});
