Clazz.declarePackage ("JSV.popup");
Clazz.load (null, "JSV.popup.PopupResource", ["java.util.Properties"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structure = null;
this.words = null;
Clazz.instantialize (this, arguments);
}, JSV.popup, "PopupResource");
Clazz.makeConstructor (c$, 
function () {
this.structure =  new java.util.Properties ();
this.words =  new java.util.Properties ();
this.buildStructure ();
});
$_M(c$, "getMenuAsText", 
function (title) {
return null;
}, "~S");
$_M(c$, "getStructure", 
function (key) {
return this.structure.getProperty (key);
}, "~S");
$_M(c$, "getWord", 
function (key) {
var str = this.words.getProperty (key);
return (str == null ? key : str);
}, "~S");
$_M(c$, "addItems", 
function (itemPairs) {
var previous = "";
for (var i = 0; i < itemPairs.length; i++) {
var str = itemPairs[i][1];
if (str == null) str = previous;
previous = str;
this.structure.setProperty (itemPairs[i][0], str);
}
}, "~A");
});
