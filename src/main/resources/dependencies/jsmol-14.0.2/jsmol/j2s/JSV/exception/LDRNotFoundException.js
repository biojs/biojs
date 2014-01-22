Clazz.declarePackage ("JSV.exception");
Clazz.load (["JSV.exception.JDXSourceException"], "JSV.exception.LDRNotFoundException", null, function () {
c$ = Clazz.declareType (JSV.exception, "LDRNotFoundException", JSV.exception.JDXSourceException);
Clazz.makeConstructor (c$, 
function (label) {
Clazz.superConstructor (this, JSV.exception.LDRNotFoundException, ["Label Data Record for " + label + " Not Found"]);
}, "~S");
});
