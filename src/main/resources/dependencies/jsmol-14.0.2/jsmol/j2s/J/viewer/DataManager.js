Clazz.declarePackage ("J.viewer");
Clazz.load (["J.api.JmolDataManager", "java.util.Hashtable"], "J.viewer.DataManager", ["java.lang.Boolean", "JU.AU", "$.BS", "$.PT", "$.SB", "J.constant.EnumVdw", "J.script.T", "J.util.BSUtil", "$.Elements", "$.Escape", "$.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataValues = null;
this.viewer = null;
Clazz.instantialize (this, arguments);
}, J.viewer, "DataManager", null, J.api.JmolDataManager);
Clazz.prepareFields (c$, function () {
this.dataValues =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "set", 
function (viewer) {
this.viewer = viewer;
return this;
}, "J.viewer.Viewer");
$_V(c$, "clear", 
function () {
this.dataValues.clear ();
});
$_V(c$, "setData", 
function (type, data, arrayCount, actualAtomCount, matchField, matchFieldColumnCount, field, fieldColumnCount) {
if (type == null) {
this.clear ();
return;
}type = type.toLowerCase ();
if (type.equals ("element_vdw")) {
var stringData = (data[1]).trim ();
if (stringData.length == 0) {
this.viewer.userVdwMars = null;
this.viewer.userVdws = null;
this.viewer.bsUserVdws = null;
return;
}if (this.viewer.bsUserVdws == null) this.viewer.setUserVdw (this.viewer.defaultVdw);
J.util.Parser.parseFloatArrayFromMatchAndField (stringData, this.viewer.bsUserVdws, 1, 0, data[2], 2, 0, this.viewer.userVdws, 1);
for (var i = this.viewer.userVdws.length; --i >= 0; ) this.viewer.userVdwMars[i] = Clazz.doubleToInt (Math.floor (this.viewer.userVdws[i] * 1000));

return;
}if (data[2] != null && arrayCount > 0) {
var createNew = (matchField != 0 || field != -2147483648 && field != 2147483647);
var oldData = this.dataValues.get (type);
var bs;
var f = (oldData == null || createNew ?  Clazz.newFloatArray (actualAtomCount, 0) : JU.AU.ensureLengthA ((oldData[1]), actualAtomCount));
var depth = (data[3]).intValue ();
var stringData = (depth == 0 ? data[1] : null);
var floatData = (depth == 1 ? data[1] : null);
var strData = null;
if (field == -2147483648 && (strData = JU.PT.getTokens (stringData)).length > 1) field = 0;
if (field == -2147483648) {
bs = data[2];
J.viewer.DataManager.setSelectedFloats (JU.PT.parseFloat (stringData), bs, f);
} else if (field == 0 || field == 2147483647) {
bs = data[2];
if (floatData != null) {
if (floatData.length == bs.cardinality ()) for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1), pt++) f[i] = floatData[pt];

 else for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) f[i] = floatData[i];

} else {
J.util.Parser.parseFloatArrayBsData (strData == null ? JU.PT.getTokens (stringData) : strData, bs, f);
}} else if (matchField <= 0) {
bs = data[2];
J.util.Parser.parseFloatArrayFromMatchAndField (stringData, bs, 0, 0, null, field, fieldColumnCount, f, 1);
} else {
var iData = data[2];
J.util.Parser.parseFloatArrayFromMatchAndField (stringData, null, matchField, matchFieldColumnCount, iData, field, fieldColumnCount, f, 1);
bs =  new JU.BS ();
for (var i = iData.length; --i >= 0; ) if (iData[i] >= 0) bs.set (iData[i]);

}if (oldData != null && Clazz.instanceOf (oldData[2], JU.BS) && !createNew) bs.or ((oldData[2]));
data[3] = Integer.$valueOf (1);
data[2] = bs;
data[1] = f;
if (type.indexOf ("property_atom.") == 0) {
var tok = J.script.T.getSettableTokFromString (type = type.substring (14));
if (tok == 0) {
J.util.Logger.error ("Unknown atom property: " + type);
return;
}var nValues = bs.cardinality ();
var fValues =  Clazz.newFloatArray (nValues, 0);
for (var n = 0, i = bs.nextSetBit (0); n < nValues; i = bs.nextSetBit (i + 1)) fValues[n++] = f[i];

this.viewer.setAtomProperty (bs, tok, 0, 0, null, fValues, null);
return;
}}this.dataValues.put (type, data);
}, "~S,~A,~N,~N,~N,~N,~N,~N");
c$.setSelectedFloats = $_M(c$, "setSelectedFloats", 
($fz = function (f, bs, data) {
var isAll = (bs == null);
var i0 = (isAll ? 0 : bs.nextSetBit (0));
for (var i = i0; i >= 0 && i < data.length; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) data[i] = f;

}, $fz.isPrivate = true, $fz), "~N,JU.BS,~A");
$_V(c$, "getData", 
function (type) {
if (this.dataValues.size () == 0 || type == null) return null;
if (!type.equalsIgnoreCase ("types")) return this.dataValues.get (type);
var info =  new Array (2);
info[0] = "types";
info[1] = "";
var n = 0;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) info[1] += (n++ > 0 ? "\n" : "") + name;

return info;
}, "~S");
$_V(c$, "getDataFloatA", 
function (label) {
if (this.dataValues.size () == 0) return null;
var data = this.getData (label);
if (data == null || (data[3]).intValue () != 1) return null;
return data[1];
}, "~S");
$_V(c$, "getDataFloat", 
function (label, atomIndex) {
if (this.dataValues.size () > 0) {
var data = this.getData (label);
if (data != null && (data[3]).intValue () == 1) {
var f = data[1];
if (atomIndex < f.length) return f[atomIndex];
}}return NaN;
}, "~S,~N");
$_V(c$, "getDataFloat2D", 
function (label) {
if (this.dataValues.size () == 0) return null;
var data = this.getData (label);
if (data == null || (data[3]).intValue () != 2) return null;
return data[1];
}, "~S");
$_V(c$, "getDataFloat3D", 
function (label) {
if (this.dataValues.size () == 0) return null;
var data = this.getData (label);
if (data == null || (data[3]).intValue () != 3) return null;
return data[1];
}, "~S");
$_V(c$, "deleteModelAtoms", 
function (firstAtomIndex, nAtoms, bsDeleted) {
if (this.dataValues.size () == 0) return;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) {
if (name.indexOf ("property_") == 0) {
var obj = this.dataValues.get (name);
J.util.BSUtil.deleteBits (obj[2], bsDeleted);
switch ((obj[3]).intValue ()) {
case 1:
obj[1] = JU.AU.deleteElements (obj[1], firstAtomIndex, nAtoms);
break;
case 2:
obj[1] = JU.AU.deleteElements (obj[1], firstAtomIndex, nAtoms);
break;
default:
break;
}
}}
}, "~N,~N,JU.BS");
$_V(c$, "getDefaultVdwNameOrData", 
function (type, bs) {
var sb =  new JU.SB ();
sb.append (type.getVdwLabel ()).append ("\n");
var isAll = (bs == null);
var i0 = (isAll ? 1 : bs.nextSetBit (0));
var i1 = (isAll ? J.util.Elements.elementNumberMax : bs.length ());
for (var i = i0; i < i1 && i >= 0; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) sb.appendI (i).appendC ('\t').appendF (type === J.constant.EnumVdw.USER ? this.viewer.userVdws[i] : J.util.Elements.getVanderwaalsMar (i, type) / 1000).appendC ('\t').append (J.util.Elements.elementSymbolFromNumber (i)).appendC ('\n');

return (bs == null ? sb.toString () : "\n  DATA \"element_vdw\"\n" + sb.append ("  end \"element_vdw\";\n\n").toString ());
}, "J.constant.EnumVdw,JU.BS");
$_V(c$, "getDataState", 
function (sc, sb) {
if (this.dataValues.size () == 0) return false;
var haveData = false;
for (var name, $name = this.dataValues.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) {
if (name.indexOf ("property_") == 0) {
var obj = this.dataValues.get (name);
if (obj.length > 4 && obj[4] === Boolean.FALSE) continue;
haveData = true;
var data = obj[1];
if (data != null && (obj[3]).intValue () == 1) {
sc.getAtomicPropertyStateBuffer (sb, 14, obj[2], name, data);
sb.append ("\n");
} else {
sb.append ("\n").append (J.util.Escape.encapsulateData (name, data, 0));
}} else if (name.indexOf ("data2d") == 0) {
var obj = this.dataValues.get (name);
var data = obj[1];
if (data != null && (obj[3]).intValue () == 2) {
haveData = true;
sb.append ("\n").append (J.util.Escape.encapsulateData (name, data, 2));
}} else if (name.indexOf ("data3d") == 0) {
var obj = this.dataValues.get (name);
var data = obj[1];
if (data != null && (obj[3]).intValue () == 3) {
haveData = true;
sb.append ("\n").append (J.util.Escape.encapsulateData (name, data, 3));
}}}
return haveData;
}, "J.viewer.JmolStateCreator,JU.SB");
Clazz.defineStatics (c$,
"DATA_TYPE_STRING", 0,
"DATA_TYPE_AF", 1,
"DATA_ARRAY_FF", 2,
"DATA_ARRAY_FFF", 3,
"DATA_VALUE", 1,
"DATA_SELECTION_MAP", 2,
"DATA_TYPE", 3,
"DATA_SAVE_IN_STATE", 4);
});
