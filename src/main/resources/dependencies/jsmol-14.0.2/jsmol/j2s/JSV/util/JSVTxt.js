Clazz.declarePackage ("JSV.util");
Clazz.load (null, "JSV.util.JSVTxt", ["JU.DF", "$.PT"], function () {
c$ = Clazz.declareType (JSV.util, "JSVTxt");
c$.fixExponentInt = $_M(c$, "fixExponentInt", 
function (x) {
return (x == Math.floor (x) ? String.valueOf (Clazz.doubleToInt (x)) : JU.PT.simpleReplace (JSV.util.JSVTxt.fixExponent (x), "E+00", ""));
}, "~N");
c$.fixIntNoExponent = $_M(c$, "fixIntNoExponent", 
function (x) {
return (x == Math.floor (x) ? String.valueOf (Clazz.doubleToInt (x)) : JU.DF.formatDecimalTrimmed (x, 10));
}, "~N");
c$.isAlmostInteger = $_M(c$, "isAlmostInteger", 
function (x) {
return (x != 0 && Math.abs (x - Math.floor (x)) / x > 1e-8);
}, "~N");
c$.fixExponent = $_M(c$, "fixExponent", 
($fz = function (x) {
var s = JU.DF.formatDecimalDbl (x, -7);
var pt = s.indexOf ("E");
if (pt < 0) {
return s;
}switch (s.length - pt) {
case 2:
s = s.substring (0, pt + 1) + "0" + s.substring (pt + 1);
break;
case 3:
if (s.charAt (pt + 1) == '-') s = s.substring (0, pt + 2) + "0" + s.substring (pt + 2);
break;
}
if (s.indexOf ("E-") < 0) s = s.substring (0, pt + 1) + "+" + s.substring (pt + 1);
return s;
}, $fz.isPrivate = true, $fz), "~N");
c$.newLine = c$.prototype.newLine = System.getProperty ("line.separator");
});
