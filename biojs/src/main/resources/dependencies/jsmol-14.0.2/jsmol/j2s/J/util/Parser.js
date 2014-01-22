Clazz.declarePackage ("J.util");
Clazz.load (null, "J.util.Parser", ["java.lang.Float", "JU.AU", "$.PT"], function () {
c$ = Clazz.declareType (J.util, "Parser");
c$.parseStringInfestedFloatArray = $_M(c$, "parseStringInfestedFloatArray", 
function (str, bs, data) {
return J.util.Parser.parseFloatArrayBsData (JU.PT.getTokens (str), bs, data);
}, "~S,JU.BS,~A");
c$.parseFloatArrayBsData = $_M(c$, "parseFloatArrayBsData", 
function (tokens, bs, data) {
var len = data.length;
var nTokens = tokens.length;
var n = 0;
var max = 0;
var haveBitSet = (bs != null);
for (var i = (haveBitSet ? bs.nextSetBit (0) : 0); i >= 0 && i < len && n < nTokens; i = (haveBitSet ? bs.nextSetBit (i + 1) : i + 1)) {
var f;
while (Float.isNaN (f = JU.PT.parseFloat (tokens[n++])) && n < nTokens) {
}
if (!Float.isNaN (f)) data[(max = i)] = f;
if (n == nTokens) break;
}
return max + 1;
}, "~A,JU.BS,~A");
c$.parseFloatArrayFromMatchAndField = $_M(c$, "parseFloatArrayFromMatchAndField", 
function (str, bs, fieldMatch, fieldMatchColumnCount, matchData, field, fieldColumnCount, data, firstLine) {
var f;
var i = -1;
var isMatch = (matchData != null);
var lines = J.util.Parser.markLines (str, (str.indexOf ('\n') >= 0 ? '\n' : ';'));
var iLine = (firstLine <= 1 || firstLine >= lines.length ? 0 : firstLine - 1);
var pt = (iLine == 0 ? 0 : lines[iLine - 1]);
var nLines = lines.length;
if (data == null) data =  Clazz.newFloatArray (nLines - iLine, 0);
var len = data.length;
var minLen = (fieldColumnCount <= 0 ? Math.max (field, fieldMatch) : Math.max (field + fieldColumnCount, fieldMatch + fieldMatchColumnCount) - 1);
var haveBitSet = (bs != null);
for (; iLine < nLines; iLine++) {
var line = str.substring (pt, lines[iLine]).trim ();
pt = lines[iLine];
var tokens = (fieldColumnCount <= 0 ? JU.PT.getTokens (line) : null);
if (fieldColumnCount <= 0) {
if (tokens.length < minLen || Float.isNaN (f = JU.PT.parseFloat (tokens[field - 1]))) continue;
} else {
if (line.length < minLen || Float.isNaN (f = JU.PT.parseFloat (line.substring (field - 1, field + fieldColumnCount - 1)))) continue;
}var iData;
if (isMatch) {
iData = JU.PT.parseInt (tokens == null ? line.substring (fieldMatch - 1, fieldMatch + fieldMatchColumnCount - 1) : tokens[fieldMatch - 1]);
if (iData == -2147483648 || iData < 0 || iData >= len || (iData = matchData[iData]) < 0) continue;
if (haveBitSet) bs.set (iData);
} else {
if (haveBitSet) i = bs.nextSetBit (i + 1);
 else i++;
if (i < 0 || i >= len) return data;
iData = i;
}data[iData] = f;
}
return data;
}, "~S,JU.BS,~N,~N,~A,~N,~N,~A,~N");
c$.fixDataString = $_M(c$, "fixDataString", 
function (str) {
str = str.$replace (';', str.indexOf ('\n') < 0 ? '\n' : ' ');
str = JU.PT.trim (str, "\n \t");
str = JU.PT.simpleReplace (str, "\n ", "\n");
str = JU.PT.simpleReplace (str, "\n\n", "\n");
return str;
}, "~S");
c$.parseFloatArray2d = $_M(c$, "parseFloatArray2d", 
function (str) {
str = J.util.Parser.fixDataString (str);
var lines = J.util.Parser.markLines (str, '\n');
var nLines = lines.length;
var data = JU.AU.newFloat2 (nLines);
for (var iLine = 0, pt = 0; iLine < nLines; pt = lines[iLine++]) {
var tokens = JU.PT.getTokens (str.substring (pt, lines[iLine]));
JU.PT.parseFloatArrayData (tokens, data[iLine] =  Clazz.newFloatArray (tokens.length, 0));
}
return data;
}, "~S");
c$.parseFloatArray3d = $_M(c$, "parseFloatArray3d", 
function (str) {
str = J.util.Parser.fixDataString (str);
var lines = J.util.Parser.markLines (str, '\n');
var nLines = lines.length;
var tokens = JU.PT.getTokens (str.substring (0, lines[0]));
if (tokens.length != 3) return  Clazz.newFloatArray (0, 0, 0, 0);
var nX = JU.PT.parseInt (tokens[0]);
var nY = JU.PT.parseInt (tokens[1]);
var nZ = JU.PT.parseInt (tokens[2]);
if (nX < 1 || nY < 1 || nZ < 1) return  Clazz.newFloatArray (1, 1, 1, 0);
var data = JU.AU.newFloat3 (nX, nY);
var iX = 0;
var iY = 0;
for (var iLine = 1, pt = lines[0]; iLine < nLines && iX < nX; pt = lines[iLine++]) {
tokens = JU.PT.getTokens (str.substring (pt, lines[iLine]));
if (tokens.length < nZ) continue;
JU.PT.parseFloatArrayData (tokens, data[iX][iY] =  Clazz.newFloatArray (tokens.length, 0));
if (++iY == nY) {
iX++;
iY = 0;
}}
if (iX != nX) {
System.out.println ("Error reading 3D data -- nX = " + nX + ", but only " + iX + " blocks read");
return  Clazz.newFloatArray (1, 1, 1, 0);
}return data;
}, "~S");
c$.markLines = $_M(c$, "markLines", 
function (data, eol) {
var nLines = 0;
for (var i = data.length; --i >= 0; ) if (data.charAt (i) == eol) nLines++;

var lines =  Clazz.newIntArray (nLines + 1, 0);
nLines = 0;
var pt = 0;
while ((pt = data.indexOf (eol, pt)) >= 0) lines[nLines++] = ++pt;

lines[nLines] = data.length;
return lines;
}, "~S,~S");
});
