Clazz.declarePackage ("J.util");
c$ = Clazz.declareType (J.util, "EigenSort", null, java.util.Comparator);
$_V(c$, "compare", 
function (o1, o2) {
var a = (o1[1]).floatValue ();
var b = (o2[1]).floatValue ();
return (a < b ? -1 : a > b ? 1 : 0);
}, "~A,~A");
