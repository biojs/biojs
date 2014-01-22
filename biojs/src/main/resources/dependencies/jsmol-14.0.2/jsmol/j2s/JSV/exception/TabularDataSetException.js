Clazz.declarePackage ("JSV.exception");
Clazz.load (["JSV.exception.JDXSourceException"], "JSV.exception.TabularDataSetException", null, function () {
c$ = Clazz.declareType (JSV.exception, "TabularDataSetException", JSV.exception.JDXSourceException);
Clazz.makeConstructor (c$, 
function (lineNum) {
Clazz.superConstructor (this, JSV.exception.TabularDataSetException, ["Tabular Data Set Exception at line: " + lineNum]);
}, "~N");
});
