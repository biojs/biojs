Clazz.declarePackage ("JU");
Clazz.load (["java.util.ArrayList"], "JU.List", null, function () {
c$ = Clazz.declareType (JU, "List", java.util.ArrayList);
$_M(c$, "addLast", 
function (v) {
{
return this.add1(v);
}}, "~O");
$_M(c$, "removeObj", 
function (v) {
{
return this.removeObject(v);
}}, "~O");
});
