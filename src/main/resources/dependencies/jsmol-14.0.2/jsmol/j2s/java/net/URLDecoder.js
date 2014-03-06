$_J("java.net");
$_L(null,"java.net.URLDecoder",["java.lang.NullPointerException"],function(){
c$=$_T(java.net,"URLDecoder");
c$.decode=$_M(c$,"decode",
function(s){
return decodeURIComponent(s);
},"~S");
c$.decode=$_M(c$,"decode",
function(s,enc){
return decodeURIComponent(s);
},"~S,~S");
});
