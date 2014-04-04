Clazz.declarePackage ("J.util");
Clazz.load (null, "J.util.Txt", ["java.lang.Character", "$.Double", "$.Float", "JU.PT", "$.SB"], function () {
c$ = Clazz.declareType (J.util, "Txt");
c$.formatStringS = $_M(c$, "formatStringS", 
function (strFormat, key, strT) {
return J.util.Txt.formatString (strFormat, key, strT, NaN, NaN, false);
}, "~S,~S,~S");
c$.formatStringF = $_M(c$, "formatStringF", 
function (strFormat, key, floatT) {
return J.util.Txt.formatString (strFormat, key, null, floatT, NaN, false);
}, "~S,~S,~N");
c$.formatStringI = $_M(c$, "formatStringI", 
function (strFormat, key, intT) {
return J.util.Txt.formatString (strFormat, key, "" + intT, NaN, NaN, false);
}, "~S,~S,~N");
c$.sprintf = $_M(c$, "sprintf", 
function (strFormat, list, values) {
if (values == null) return strFormat;
var n = list.length;
if (n == values.length) try {
for (var o = 0; o < n; o++) {
if (values[o] == null) continue;
switch (list.charAt (o)) {
case 's':
strFormat = J.util.Txt.formatString (strFormat, "s", values[o], NaN, NaN, true);
break;
case 'f':
strFormat = J.util.Txt.formatString (strFormat, "f", null, (values[o]).floatValue (), NaN, true);
break;
case 'i':
strFormat = J.util.Txt.formatString (strFormat, "d", "" + values[o], NaN, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "i", "" + values[o], NaN, NaN, true);
break;
case 'd':
strFormat = J.util.Txt.formatString (strFormat, "e", null, NaN, (values[o]).doubleValue (), true);
break;
case 'p':
var pVal = values[o];
strFormat = J.util.Txt.formatString (strFormat, "p", null, pVal.x, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "p", null, pVal.y, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "p", null, pVal.z, NaN, true);
break;
case 'q':
var qVal = values[o];
strFormat = J.util.Txt.formatString (strFormat, "q", null, qVal.x, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "q", null, qVal.y, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "q", null, qVal.z, NaN, true);
strFormat = J.util.Txt.formatString (strFormat, "q", null, qVal.w, NaN, true);
break;
case 'S':
var sVal = values[o];
for (var i = 0; i < sVal.length; i++) strFormat = J.util.Txt.formatString (strFormat, "s", sVal[i], NaN, NaN, true);

break;
case 'F':
var fVal = values[o];
for (var i = 0; i < fVal.length; i++) strFormat = J.util.Txt.formatString (strFormat, "f", null, fVal[i], NaN, true);

break;
case 'I':
var iVal = values[o];
for (var i = 0; i < iVal.length; i++) strFormat = J.util.Txt.formatString (strFormat, "d", "" + iVal[i], NaN, NaN, true);

for (var i = 0; i < iVal.length; i++) strFormat = J.util.Txt.formatString (strFormat, "i", "" + iVal[i], NaN, NaN, true);

break;
case 'D':
var dVal = values[o];
for (var i = 0; i < dVal.length; i++) strFormat = J.util.Txt.formatString (strFormat, "e", null, NaN, dVal[i], true);

}
}
return JU.PT.simpleReplace (strFormat, "%%", "%");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
System.out.println ("TextFormat.sprintf error " + list + " " + strFormat);
return JU.PT.simpleReplace (strFormat, "%", "?");
}, "~S,~S,~A");
c$.formatString = $_M(c$, "formatString", 
($fz = function (strFormat, key, strT, floatT, doubleT, doOne) {
if (strFormat == null) return null;
if ("".equals (strFormat)) return "";
var len = key.length;
if (strFormat.indexOf ("%") < 0 || len == 0 || strFormat.indexOf (key) < 0) return strFormat;
var strLabel = "";
var ich;
var ichPercent;
var ichKey;
for (ich = 0; (ichPercent = strFormat.indexOf ('%', ich)) >= 0 && (ichKey = strFormat.indexOf (key, ichPercent + 1)) >= 0; ) {
if (ich != ichPercent) strLabel += strFormat.substring (ich, ichPercent);
ich = ichPercent + 1;
if (ichKey > ichPercent + 6) {
strLabel += '%';
continue;
}try {
var alignLeft = false;
if (strFormat.charAt (ich) == '-') {
alignLeft = true;
++ich;
}var zeroPad = false;
if (strFormat.charAt (ich) == '0') {
zeroPad = true;
++ich;
}var ch;
var width = 0;
while ((ch = strFormat.charAt (ich)) >= '0' && (ch <= '9')) {
width = (10 * width) + (ch.charCodeAt (0) - 48);
++ich;
}
var precision = 2147483647;
var isExponential = false;
if (strFormat.charAt (ich) == '.') {
++ich;
if ((ch = strFormat.charAt (ich)) == '-') {
isExponential = true;
++ich;
}if ((ch = strFormat.charAt (ich)) >= '0' && ch <= '9') {
precision = ch.charCodeAt (0) - 48;
++ich;
}if (isExponential) precision = -precision - (strT == null ? 1 : 0);
}var st = strFormat.substring (ich, ich + len);
if (!st.equals (key)) {
ich = ichPercent + 1;
strLabel += '%';
continue;
}ich += len;
if (!Float.isNaN (floatT)) strLabel += JU.PT.formatF (floatT, width, precision, alignLeft, zeroPad);
 else if (strT != null) strLabel += JU.PT.formatS (strT, width, precision, alignLeft, zeroPad);
 else if (!Double.isNaN (doubleT)) strLabel += JU.PT.formatD (doubleT, width, precision, alignLeft, zeroPad, true);
if (doOne) break;
} catch (ioobe) {
if (Clazz.exceptionOf (ioobe, IndexOutOfBoundsException)) {
ich = ichPercent;
break;
} else {
throw ioobe;
}
}
}
strLabel += strFormat.substring (ich);
return strLabel;
}, $fz.isPrivate = true, $fz), "~S,~S,~S,~N,~N,~B");
c$.formatCheck = $_M(c$, "formatCheck", 
function (strFormat) {
if (strFormat == null || strFormat.indexOf ('p') < 0 && strFormat.indexOf ('q') < 0) return strFormat;
strFormat = JU.PT.simpleReplace (strFormat, "%%", "\1");
strFormat = JU.PT.simpleReplace (strFormat, "%p", "%6.2p");
strFormat = JU.PT.simpleReplace (strFormat, "%q", "%6.2q");
var format = JU.PT.split (strFormat, "%");
var sb =  new JU.SB ();
sb.append (format[0]);
for (var i = 1; i < format.length; i++) {
var f = "%" + format[i];
var pt;
if (f.length >= 3) {
if ((pt = f.indexOf ('p')) >= 0) f = J.util.Txt.fdup (f, pt, 3);
if ((pt = f.indexOf ('q')) >= 0) f = J.util.Txt.fdup (f, pt, 4);
}sb.append (f);
}
return sb.toString ().$replace ('\1', '%');
}, "~S");
c$.fdup = $_M(c$, "fdup", 
($fz = function (f, pt, n) {
var ch;
var count = 0;
for (var i = pt; --i >= 1; ) {
if (Character.isDigit (ch = f.charAt (i))) continue;
switch (ch) {
case '.':
if (count++ != 0) return f;
continue;
case '-':
if (i != 1) return f;
continue;
default:
return f;
}
}
var s = f.substring (0, pt + 1);
var sb =  new JU.SB ();
for (var i = 0; i < n; i++) sb.append (s);

sb.append (f.substring (pt + 1));
return sb.toString ();
}, $fz.isPrivate = true, $fz), "~S,~N,~N");
c$.leftJustify = $_M(c$, "leftJustify", 
function (s, s1, s2) {
s.append (s2);
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
}, "JU.SB,~S,~S");
c$.rightJustify = $_M(c$, "rightJustify", 
function (s, s1, s2) {
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
s.append (s2);
}, "JU.SB,~S,~S");
c$.safeTruncate = $_M(c$, "safeTruncate", 
function (f, n) {
if (f > -0.001 && f < 0.001) f = 0;
return (f + "         ").substring (0, n);
}, "~N,~N");
c$.isWild = $_M(c$, "isWild", 
function (s) {
return s != null && (s.indexOf ("*") >= 0 || s.indexOf ("?") >= 0);
}, "~S");
c$.isMatch = $_M(c$, "isMatch", 
function (s, strWildcard, checkStar, allowInitialStar) {
var ich = 0;
var cchWildcard = strWildcard.length;
var cchs = s.length;
if (cchs == 0 || cchWildcard == 0) return (cchs == cchWildcard || cchWildcard == 1 && strWildcard.charAt (0) == '*');
var isStar0 = (checkStar && allowInitialStar ? strWildcard.charAt (0) == '*' : false);
if (isStar0 && strWildcard.charAt (cchWildcard - 1) == '*') return (cchWildcard < 3 || s.indexOf (strWildcard.substring (1, cchWildcard - 1)) >= 0);
var qqq = "????";
while (qqq.length < s.length) qqq += qqq;

if (checkStar) {
if (allowInitialStar && isStar0) strWildcard = qqq + strWildcard.substring (1);
if (strWildcard.charAt (ich = strWildcard.length - 1) == '*') strWildcard = strWildcard.substring (0, ich) + qqq;
cchWildcard = strWildcard.length;
}if (cchWildcard < cchs) return false;
ich = 0;
while (cchWildcard > cchs) {
if (allowInitialStar && strWildcard.charAt (ich) == '?') {
++ich;
} else if (strWildcard.charAt (ich + cchWildcard - 1) != '?') {
return false;
}--cchWildcard;
}
for (var i = cchs; --i >= 0; ) {
var charWild = strWildcard.charAt (ich + i);
if (charWild == '?') continue;
if (charWild != s.charAt (i) && (charWild != '\1' || s.charAt (i) != '?')) return false;
}
return true;
}, "~S,~S,~B,~B");
c$.join = $_M(c$, "join", 
function (s, c, i0) {
if (s.length < i0) return null;
var sb =  new JU.SB ();
sb.append (s[i0++]);
for (var i = i0; i < s.length; i++) sb.appendC (c).append (s[i]);

return sb.toString ();
}, "~A,~S,~N");
c$.replaceQuotedStrings = $_M(c$, "replaceQuotedStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.simpleReplace (s, "\"" + name + "\"", "\"" + newName + "\"");
}
return s;
}, "~S,java.util.List,java.util.List");
c$.replaceStrings = $_M(c$, "replaceStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.simpleReplace (s, name, newName);
}
return s;
}, "~S,java.util.List,java.util.List");
c$.ichMathTerminator = $_M(c$, "ichMathTerminator", 
function (script, ichT, len) {
var nP = 1;
var chFirst = '\u0000';
var chLast = '\u0000';
while (nP > 0 && ++ichT < len) {
var ch = script.charAt (ichT);
if (chFirst != '\0') {
if (chLast == '\\') {
ch = '\0';
} else if (ch == chFirst) {
chFirst = '\0';
}chLast = ch;
continue;
}switch (ch) {
case '\'':
case '"':
chFirst = ch;
break;
case '{':
nP++;
break;
case '}':
nP--;
break;
}
}
return ichT;
}, "~S,~N,~N");
});
