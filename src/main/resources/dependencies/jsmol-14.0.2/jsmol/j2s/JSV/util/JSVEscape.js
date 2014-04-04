Clazz.declarePackage ("JSV.util");
Clazz.load (null, "JSV.util.JSVEscape", ["JU.SB"], function () {
c$ = Clazz.declareType (JSV.util, "JSVEscape");
c$.eS = $_M(c$, "eS", 
function (str) {
if (str == null) return "\"\"";
var haveEscape = false;
var i = 0;
for (; i < "\\\\\tt\rr\nn\"\"".length; i += 2) if (str.indexOf ("\\\\\tt\rr\nn\"\"".charAt (i)) >= 0) {
haveEscape = true;
break;
}
if (haveEscape) while (i < "\\\\\tt\rr\nn\"\"".length) {
var pt = -1;
var ch = "\\\\\tt\rr\nn\"\"".charAt (i++);
var ch2 = "\\\\\tt\rr\nn\"\"".charAt (i++);
var sb =  new JU.SB ();
var pt0 = 0;
while ((pt = str.indexOf (ch, pt + 1)) >= 0) {
sb.append (str.substring (pt0, pt)).appendC ('\\').appendC (ch2);
pt0 = pt + 1;
}
sb.append (str.substring (pt0, str.length));
str = sb.toString ();
}
for (i = str.length; --i >= 0; ) if (str.charCodeAt (i) > 0x7F) str = str.substring (0, i) + JSV.util.JSVEscape.unicode (str.charAt (i)) + str.substring (i + 1);

return "\"" + str + "\"";
}, "~S");
c$.unicode = $_M(c$, "unicode", 
($fz = function (c) {
var s = "0000" + Integer.toHexString (c.charCodeAt (0));
return "\\u" + s.substring (s.length - 4);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"escapable", "\\\\\tt\rr\nn\"\"");
});
