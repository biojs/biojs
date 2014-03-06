Clazz.declarePackage ("JSV.common");
Clazz.load (["java.lang.Enum"], "JSV.common.ScriptToken", ["java.util.Hashtable", "JU.List", "$.SB", "JSV.common.ScriptTokenizer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tip = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "ScriptToken", Enum);
$_M(c$, "getTip", 
function () {
return "  " + (this.tip === "T" ? "TRUE/FALSE/TOGGLE" : this.tip === "TF" ? "TRUE or FALSE" : this.tip === "C" ? "<color>" : this.tip);
});
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
($fz = function (tip) {
this.tip = tip;
}, $fz.isPrivate = true, $fz), "~S");
c$.getScriptToken = $_M(c$, "getScriptToken", 
function (name) {
if (JSV.common.ScriptToken.htParams == null) {
JSV.common.ScriptToken.htParams =  new java.util.Hashtable ();
for (var item, $item = 0, $$item = JSV.common.ScriptToken.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) JSV.common.ScriptToken.htParams.put (item.name (), item);

}var st = JSV.common.ScriptToken.htParams.get (name.toUpperCase ());
return (st == null ? JSV.common.ScriptToken.UNKNOWN : st);
}, "~S");
c$.getScriptTokenList = $_M(c$, "getScriptTokenList", 
function (name, isExact) {
name = name.toUpperCase ();
var list =  new JU.List ();
var st = JSV.common.ScriptToken.getScriptToken (name);
if (isExact) {
if (st != null) list.addLast (st);
} else {
for (var entry, $entry = JSV.common.ScriptToken.htParams.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) if (entry.getKey ().startsWith (name) && entry.getValue ().tip != null) list.addLast (entry.getValue ());

}return list;
}, "~S,~B");
c$.getValue = $_M(c$, "getValue", 
function (st, params, cmd) {
if (!params.hasMoreTokens ()) return "";
switch (st) {
default:
return JSV.common.ScriptTokenizer.nextStringToken (params, true);
case JSV.common.ScriptToken.CLOSE:
case JSV.common.ScriptToken.GETPROPERTY:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.JMOL:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LOAD:
case JSV.common.ScriptToken.PEAK:
case JSV.common.ScriptToken.PLOTCOLORS:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
return JSV.common.ScriptToken.removeCommandName (cmd);
case JSV.common.ScriptToken.SELECT:
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
case JSV.common.ScriptToken.ZOOM:
return JSV.common.ScriptToken.removeCommandName (cmd).$replace (',', ' ').trim ();
}
}, "JSV.common.ScriptToken,JSV.common.ScriptTokenizer,~S");
c$.removeCommandName = $_M(c$, "removeCommandName", 
($fz = function (cmd) {
var pt = cmd.indexOf (" ");
if (pt < 0) return "";
return cmd.substring (pt).trim ();
}, $fz.isPrivate = true, $fz), "~S");
c$.getKey = $_M(c$, "getKey", 
function (eachParam) {
var key = eachParam.nextToken ();
if (key.startsWith ("#") || key.startsWith ("//")) return null;
if (key.equalsIgnoreCase ("SET")) key = eachParam.nextToken ();
return key.toUpperCase ();
}, "JSV.common.ScriptTokenizer");
c$.getTokens = $_M(c$, "getTokens", 
function (value) {
var tokens =  new JU.List ();
var st =  new JSV.common.ScriptTokenizer (value, false);
while (st.hasMoreTokens ()) {
var s = JSV.common.ScriptTokenizer.nextStringToken (st, false);
if (s.startsWith ("//") || s.startsWith ("#")) break;
tokens.addLast (s);
}
return tokens;
}, "~S");
c$.getNameList = $_M(c$, "getNameList", 
function (list) {
if (list.size () == 0) return "";
var sb =  new JU.SB ();
for (var i = 0; i < list.size (); i++) sb.append (",").append (list.get (i).toString ());

return sb.toString ().substring (1);
}, "JU.List");
c$.htParams = null;
Clazz.defineEnumConstant (c$, "UNKNOWN", 0, []);
Clazz.defineEnumConstant (c$, "APPLETID", 1, []);
Clazz.defineEnumConstant (c$, "APPLETREADYCALLBACKFUNCTIONNAME", 2, []);
Clazz.defineEnumConstant (c$, "AUTOINTEGRATE", 3, ["TF"]);
Clazz.defineEnumConstant (c$, "BACKGROUNDCOLOR", 4, ["C"]);
Clazz.defineEnumConstant (c$, "CLOSE", 5, ["spectrumId or fileName or ALL"]);
Clazz.defineEnumConstant (c$, "COMPOUNDMENUON", 6, ["TF"]);
Clazz.defineEnumConstant (c$, "COORDCALLBACKFUNCTIONNAME", 7, []);
Clazz.defineEnumConstant (c$, "COORDINATESCOLOR", 8, ["C"]);
Clazz.defineEnumConstant (c$, "COORDINATESON", 9, ["T"]);
Clazz.defineEnumConstant (c$, "DEBUG", 10, ["TF"]);
Clazz.defineEnumConstant (c$, "DISPLAYFONTNAME", 11, ["fontName"]);
Clazz.defineEnumConstant (c$, "DISPLAY1D", 12, ["T"]);
Clazz.defineEnumConstant (c$, "DISPLAY2D", 13, ["T"]);
Clazz.defineEnumConstant (c$, "ENABLEZOOM", 14, ["T"]);
Clazz.defineEnumConstant (c$, "ENDINDEX", 15, []);
Clazz.defineEnumConstant (c$, "FINDX", 16, ["x-value"]);
Clazz.defineEnumConstant (c$, "GETPROPERTY", 17, ["[ALL] [propertyName]"]);
Clazz.defineEnumConstant (c$, "GETSOLUTIONCOLOR", 18, []);
Clazz.defineEnumConstant (c$, "GRIDCOLOR", 19, ["C"]);
Clazz.defineEnumConstant (c$, "GRIDON", 20, ["T"]);
Clazz.defineEnumConstant (c$, "HIDDEN", 21, ["TF"]);
Clazz.defineEnumConstant (c$, "HIGHLIGHTCOLOR", 22, ["C"]);
Clazz.defineEnumConstant (c$, "INTEGRALOFFSET", 23, ["percent"]);
Clazz.defineEnumConstant (c$, "INTEGRALRANGE", 24, ["percent"]);
Clazz.defineEnumConstant (c$, "INTEGRATE", 25, []);
Clazz.defineEnumConstant (c$, "INTEGRATION", 26, ["ON/OFF/AUTO/TOGGLE/MIN value/MARK ppm1-ppm2:norm,ppm3-ppm4,... (start with 0-0 to clear)"]);
Clazz.defineEnumConstant (c$, "INTEGRALPLOTCOLOR", 27, []);
Clazz.defineEnumConstant (c$, "INTEGRATIONRATIOS", 28, []);
Clazz.defineEnumConstant (c$, "INTERFACE", 29, []);
Clazz.defineEnumConstant (c$, "IRMODE", 30, ["A or T or TOGGLE"]);
Clazz.defineEnumConstant (c$, "JMOL", 31, ["...Jmol command..."]);
Clazz.defineEnumConstant (c$, "JSV", 32, []);
Clazz.defineEnumConstant (c$, "LABEL", 33, ["x y [color and/or \"text\"]"]);
Clazz.defineEnumConstant (c$, "LINK", 34, ["AB or ABC or NONE or ALL"]);
Clazz.defineEnumConstant (c$, "LOAD", 35, ["[APPEND] \"fileName\" [first] [last]; use \"\" to reload current file"]);
Clazz.defineEnumConstant (c$, "LOADFILECALLBACKFUNCTIONNAME", 36, []);
Clazz.defineEnumConstant (c$, "LOADIMAGINARY", 37, ["T/F - default is to NOT load imaginary spectra"]);
Clazz.defineEnumConstant (c$, "MENUON", 38, []);
Clazz.defineEnumConstant (c$, "OBSCURE", 39, []);
Clazz.defineEnumConstant (c$, "OVERLAY", 40, []);
Clazz.defineEnumConstant (c$, "OVERLAYSTACKED", 41, ["TF"]);
Clazz.defineEnumConstant (c$, "PEAK", 42, ["<type(IR,CNMR,HNMR,MS, etc)> id=xxx or \"match\" [ALL], for example: PEAK HNMR id=3"]);
Clazz.defineEnumConstant (c$, "PEAKCALLBACKFUNCTIONNAME", 43, []);
Clazz.defineEnumConstant (c$, "PEAKLIST", 44, [" Example: PEAKLIST threshold=20 [%, or include=10] skip=0 interpolate=parabolic [or NONE]"]);
Clazz.defineEnumConstant (c$, "PEAKTABCOLOR", 45, ["C"]);
Clazz.defineEnumConstant (c$, "PLOTAREACOLOR", 46, ["C"]);
Clazz.defineEnumConstant (c$, "PLOTCOLOR", 47, ["C"]);
Clazz.defineEnumConstant (c$, "PLOTCOLORS", 48, ["color,color,color,..."]);
Clazz.defineEnumConstant (c$, "PRINT", 49, []);
Clazz.defineEnumConstant (c$, "REVERSEPLOT", 50, ["T"]);
Clazz.defineEnumConstant (c$, "SCALEBY", 51, ["factor"]);
Clazz.defineEnumConstant (c$, "SCALECOLOR", 52, ["C"]);
Clazz.defineEnumConstant (c$, "SCRIPT", 53, ["filename.jsv"]);
Clazz.defineEnumConstant (c$, "SELECT", 54, ["spectrumID, spectrumID,..."]);
Clazz.defineEnumConstant (c$, "SETPEAK", 55, ["x (ppm) or NONE does peak search, unlike SETX -- NMR only"]);
Clazz.defineEnumConstant (c$, "SETX", 56, ["x (ppm) does no peak search, unlike SETPEAK -- NMR only"]);
Clazz.defineEnumConstant (c$, "SHIFTX", 57, ["dx (ppm) or NONE -- NMR only"]);
Clazz.defineEnumConstant (c$, "SHOWERRORS", 58, []);
Clazz.defineEnumConstant (c$, "SHOWINTEGRATION", 59, ["T"]);
Clazz.defineEnumConstant (c$, "SHOWKEY", 60, ["T"]);
Clazz.defineEnumConstant (c$, "SHOWMEASUREMENTS", 61, ["T"]);
Clazz.defineEnumConstant (c$, "SHOWMENU", 62, []);
Clazz.defineEnumConstant (c$, "SHOWPEAKLIST", 63, ["T"]);
Clazz.defineEnumConstant (c$, "SHOWPROPERTIES", 64, []);
Clazz.defineEnumConstant (c$, "SHOWSOURCE", 65, []);
Clazz.defineEnumConstant (c$, "SPECTRUM", 66, ["spectrumID"]);
Clazz.defineEnumConstant (c$, "SPECTRUMNUMBER", 67, []);
Clazz.defineEnumConstant (c$, "STACKOFFSETY", 68, ["percent"]);
Clazz.defineEnumConstant (c$, "STARTINDEX", 69, []);
Clazz.defineEnumConstant (c$, "SYNCCALLBACKFUNCTIONNAME", 70, []);
Clazz.defineEnumConstant (c$, "SYNCID", 71, []);
Clazz.defineEnumConstant (c$, "TEST", 72, []);
Clazz.defineEnumConstant (c$, "TITLEON", 73, ["T"]);
Clazz.defineEnumConstant (c$, "TITLEBOLDON", 74, ["T"]);
Clazz.defineEnumConstant (c$, "TITLECOLOR", 75, ["C"]);
Clazz.defineEnumConstant (c$, "TITLEFONTNAME", 76, ["fontName"]);
Clazz.defineEnumConstant (c$, "UNITSCOLOR", 77, ["C"]);
Clazz.defineEnumConstant (c$, "VERSION", 78, []);
Clazz.defineEnumConstant (c$, "VIEW", 79, ["spectrumID, spectrumID, ... Example: VIEW 3.1, 3.2  or  VIEW \"acetophenone\""]);
Clazz.defineEnumConstant (c$, "XSCALEON", 80, ["T"]);
Clazz.defineEnumConstant (c$, "XUNITSON", 81, ["T"]);
Clazz.defineEnumConstant (c$, "YSCALE", 82, ["[ALL] lowValue highValue"]);
Clazz.defineEnumConstant (c$, "YSCALEON", 83, ["T"]);
Clazz.defineEnumConstant (c$, "YUNITSON", 84, ["T"]);
Clazz.defineEnumConstant (c$, "WINDOW", 85, []);
Clazz.defineEnumConstant (c$, "WRITE", 86, ["[XY,DIF,DIFDUP,PAC,FIX,SQZ,AML,CML,JPG,PDF,PNG,SVG] \"filename\""]);
Clazz.defineEnumConstant (c$, "ZOOM", 87, ["OUT or x1,x2 or x1,y1 x2,y2"]);
Clazz.defineEnumConstant (c$, "ZOOMBOXCOLOR", 88, []);
Clazz.defineEnumConstant (c$, "ZOOMBOXCOLOR2", 89, []);
});
