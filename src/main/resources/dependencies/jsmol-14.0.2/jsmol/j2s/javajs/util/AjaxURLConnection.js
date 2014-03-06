Clazz.declarePackage ("JU");
Clazz.load (["java.net.URLConnection"], "JU.AjaxURLConnection", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bytesOut = null;
this.postOut = "";
Clazz.instantialize (this, arguments);
}, JU, "AjaxURLConnection", java.net.URLConnection);
$_M(c$, "doAjax", 
($fz = function () {
{
return Jmol._doAjax(this.url, this.postOut, this.bytesOut);
}}, $fz.isPrivate = true, $fz));
$_V(c$, "connect", 
function () {
});
$_M(c$, "outputBytes", 
function (bytes) {
this.bytesOut = bytes;
}, "~A");
$_M(c$, "outputString", 
function (post) {
this.postOut = post;
}, "~S");
$_M(c$, "getSB", 
function () {
return this.doAjax ();
});
});
