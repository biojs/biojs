Clazz.declarePackage ("J.scriptext");
Clazz.load (["J.script.JmolScriptExtension"], "J.scriptext.ScriptExt", ["java.lang.Boolean", "$.Float", "$.Long", "$.Short", "java.util.Date", "$.Hashtable", "JU.AU", "$.BS", "$.CU", "$.List", "$.M3", "$.M4", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "J.api.Interface", "J.atomdata.RadiusData", "J.constant.EnumAxesMode", "$.EnumVdw", "J.i18n.GT", "J.modelset.Atom", "$.AtomCollection", "$.BondSet", "$.LabelToken", "J.script.SV", "$.ScriptCompiler", "$.ScriptEvaluator", "$.ScriptInterruption", "$.ScriptMathProcessor", "$.T", "J.util.BSUtil", "$.BoxInfo", "$.C", "$.ColorEncoder", "$.Elements", "$.Escape", "$.JmolMolecule", "$.Logger", "$.Measure", "$.Parser", "$.Point3fi", "$.Quaternion", "$.TempArray", "$.Txt", "J.viewer.FileManager", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.eval = null;
this.sm = null;
this.chk = false;
this.fullCommand = null;
this.thisCommand = null;
this.st = null;
this.slen = 0;
this.$data = null;
this.pm = null;
Clazz.instantialize (this, arguments);
}, J.scriptext, "ScriptExt", null, J.script.JmolScriptExtension);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "init", 
function (se) {
this.eval = se;
this.viewer = this.eval.viewer;
this.sm = this.eval.sm;
return this;
}, "~O");
$_V(c$, "dispatch", 
function (iTok, b, st) {
this.chk = this.eval.chk;
this.fullCommand = this.eval.fullCommand;
this.thisCommand = this.eval.thisCommand;
this.slen = this.eval.slen;
this.st = st;
switch (iTok) {
case 4102:
this.calculate ();
break;
case 4103:
this.capture ();
break;
case 135270405:
this.compare ();
break;
case 1095766024:
this.configuration ();
break;
case 1052700:
this.mapProperty ();
break;
case 4126:
this.minimize ();
break;
case 1276121113:
this.modulation ();
break;
case 4133:
case 135270418:
case 1052714:
this.plot (st);
break;
case 4131:
this.navigate ();
break;
case 135270407:
this.data ();
break;
case 4148:
this.show ();
break;
case 135270422:
this.write (null);
break;
case 23:
return this.cgo ();
case 25:
return this.contact ();
case 17:
return this.dipole ();
case 22:
return this.draw ();
case 24:
case 29:
case 28:
return this.isosurface (iTok);
case 26:
return this.lcaoCartoon ();
case 6:
this.measure ();
return true;
case 27:
return this.mo (b);
case 21:
return this.polyhedra ();
case 4:
return this.struts ();
}
return false;
}, "~N,~B,~A");
$_M(c$, "atomExpressionAt", 
($fz = function (i) {
return this.eval.atomExpressionAt (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "error", 
($fz = function (err) {
this.eval.error (err);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "invArg", 
($fz = function () {
this.error (22);
}, $fz.isPrivate = true, $fz));
$_M(c$, "invPO", 
($fz = function () {
this.error (23);
}, $fz.isPrivate = true, $fz));
$_M(c$, "getShapeProperty", 
($fz = function (shapeType, propertyName) {
return this.eval.getShapeProperty (shapeType, propertyName);
}, $fz.isPrivate = true, $fz), "~N,~S");
$_M(c$, "parameterAsString", 
($fz = function (i) {
return this.eval.parameterAsString (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "centerParameter", 
($fz = function (i) {
return this.eval.centerParameter (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "floatParameter", 
($fz = function (i) {
return this.eval.floatParameter (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getPoint3f", 
($fz = function (i, allowFractional) {
return this.eval.getPoint3f (i, allowFractional);
}, $fz.isPrivate = true, $fz), "~N,~B");
$_M(c$, "getPoint4f", 
($fz = function (i) {
return this.eval.getPoint4f (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "intParameter", 
($fz = function (index) {
return this.eval.intParameter (index);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "isFloatParameter", 
($fz = function (index) {
return this.eval.isFloatParameter (index);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "setShapeId", 
($fz = function (iShape, i, idSeen) {
return this.eval.setShapeId (iShape, i, idSeen);
}, $fz.isPrivate = true, $fz), "~N,~N,~B");
$_M(c$, "setShapeProperty", 
($fz = function (shapeType, propertyName, propertyValue) {
this.eval.setShapeProperty (shapeType, propertyName, propertyValue);
}, $fz.isPrivate = true, $fz), "~N,~S,~O");
$_M(c$, "stringParameter", 
($fz = function (index) {
return this.eval.stringParameter (index);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getToken", 
($fz = function (i) {
return this.eval.getToken (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "tokAt", 
($fz = function (i) {
return this.eval.tokAt (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "cgo", 
($fz = function () {
var eval = this.eval;
this.sm.loadShape (23);
if (this.tokAt (1) == 1073742001 && this.listIsosurface (23)) return false;
var iptDisplayProperty = 0;
var thisId = this.initIsosurface (23);
var idSeen = (thisId != null);
var isWild = (idSeen && this.getShapeProperty (23, "ID") == null);
var isInitialized = false;
var data = null;
var translucentLevel = 3.4028235E38;
eval.colorArgb[0] = -2147483648;
var intScale = 0;
for (var i = eval.iToken; i < this.slen; ++i) {
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 7:
case 269484096:
case 1073742195:
if (data != null || isWild) this.invArg ();
data = eval.listParameter (i, 2, 2147483647);
i = eval.iToken;
continue;
case 1073742138:
if (++i >= this.slen) this.error (34);
switch (this.getToken (i).tok) {
case 2:
intScale = this.intParameter (i);
continue;
case 3:
intScale = Math.round (this.floatParameter (i) * 100);
continue;
}
this.error (34);
break;
case 1766856708:
case 603979967:
case 1073742074:
translucentLevel = eval.getColorTrans (i, false);
i = eval.iToken;
idSeen = true;
continue;
case 1074790550:
thisId = this.setShapeId (23, ++i, idSeen);
isWild = (this.getShapeProperty (23, "ID") == null);
i = eval.iToken;
break;
default:
if (!eval.setMeshDisplayProperty (23, 0, eval.theTok)) {
if (eval.theTok == 269484209 || J.script.T.tokAttr (eval.theTok, 1073741824)) {
thisId = this.setShapeId (23, i, idSeen);
i = eval.iToken;
break;
}this.invArg ();
}if (iptDisplayProperty == 0) iptDisplayProperty = i;
i = eval.iToken;
continue;
}
idSeen = (eval.theTok != 12291);
if (data != null && !isInitialized) {
propertyName = "points";
propertyValue = Integer.$valueOf (intScale);
isInitialized = true;
intScale = 0;
}if (propertyName != null) this.setShapeProperty (23, propertyName, propertyValue);
}
eval.finalizeObject (23, eval.colorArgb[0], translucentLevel, intScale, data != null, data, iptDisplayProperty, null);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "contact", 
($fz = function () {
var eval = this.eval;
this.sm.loadShape (25);
if (this.tokAt (1) == 1073742001 && this.listIsosurface (25)) return false;
var iptDisplayProperty = 0;
eval.iToken = 1;
var thisId = this.initIsosurface (25);
var idSeen = (thisId != null);
var isWild = (idSeen && this.getShapeProperty (25, "ID") == null);
var bsA = null;
var bsB = null;
var bs = null;
var rd = null;
var params = null;
var colorDensity = false;
var sbCommand =  new JU.SB ();
var minSet = 2147483647;
var displayType = 135266319;
var contactType = 0;
var distance = NaN;
var saProbeRadius = NaN;
var localOnly = true;
var intramolecular = null;
var userSlabObject = null;
var colorpt = 0;
var colorByType = false;
var tok;
var okNoAtoms = (eval.iToken > 1);
for (var i = eval.iToken; i < this.slen; ++i) {
switch (tok = this.getToken (i).tok) {
default:
okNoAtoms = true;
if (!eval.setMeshDisplayProperty (25, 0, eval.theTok)) {
if (eval.theTok != 269484209 && !J.script.T.tokAttr (eval.theTok, 1073741824)) this.invArg ();
thisId = this.setShapeId (25, i, idSeen);
i = eval.iToken;
break;
}if (iptDisplayProperty == 0) iptDisplayProperty = i;
i = eval.iToken;
continue;
case 1074790550:
okNoAtoms = true;
this.setShapeId (25, ++i, idSeen);
isWild = (this.getShapeProperty (25, "ID") == null);
i = eval.iToken;
break;
case 1766856708:
switch (this.tokAt (i + 1)) {
case 1073741914:
tok = 0;
colorDensity = true;
sbCommand.append (" color density");
i++;
break;
case 1141899272:
tok = 0;
colorByType = true;
sbCommand.append (" color type");
i++;
break;
}
if (tok == 0) break;
case 603979967:
case 1073742074:
okNoAtoms = true;
if (colorpt == 0) colorpt = i;
eval.setMeshDisplayProperty (25, i, eval.theTok);
i = eval.iToken;
break;
case 554176565:
okNoAtoms = true;
userSlabObject = this.getCapSlabObject (i, false);
this.setShapeProperty (25, "slab", userSlabObject);
i = eval.iToken;
break;
case 1073741914:
colorDensity = true;
sbCommand.append (" density");
if (this.isFloatParameter (i + 1)) {
if (params == null) params =  Clazz.newFloatArray (1, 0);
params[0] = -Math.abs (this.floatParameter (++i));
sbCommand.append (" " + -params[0]);
}break;
case 1073742122:
var resolution = this.floatParameter (++i);
if (resolution > 0) {
sbCommand.append (" resolution ").appendF (resolution);
this.setShapeProperty (25, "resolution", Float.$valueOf (resolution));
}break;
case 135266325:
case 1276118018:
distance = this.floatParameter (++i);
sbCommand.append (" within ").appendF (distance);
break;
case 269484193:
case 2:
case 3:
rd = eval.encodeRadiusParameter (i, false, false);
sbCommand.append (" ").appendO (rd);
i = eval.iToken;
break;
case 1073741990:
case 1073741989:
intramolecular = (tok == 1073741989 ? Boolean.TRUE : Boolean.FALSE);
sbCommand.append (" ").appendO (eval.theToken.value);
break;
case 1073742020:
minSet = this.intParameter (++i);
break;
case 1612189718:
case 1073741881:
case 1649412120:
contactType = tok;
sbCommand.append (" ").appendO (eval.theToken.value);
break;
case 1073742136:
if (this.isFloatParameter (i + 1)) saProbeRadius = this.floatParameter (++i);
case 1074790451:
case 1073742036:
case 3145756:
localOnly = false;
case 1276117512:
case 1073741961:
case 135266319:
case 4106:
displayType = tok;
sbCommand.append (" ").appendO (eval.theToken.value);
if (tok == 1073742136) sbCommand.append (" ").appendF (saProbeRadius);
break;
case 1073742083:
params = eval.floatParameterSet (++i, 1, 10);
i = eval.iToken;
break;
case 10:
case 1048577:
if (isWild || bsB != null) this.invArg ();
bs = J.util.BSUtil.copy (this.atomExpressionAt (i));
i = eval.iToken;
if (bsA == null) bsA = bs;
 else bsB = bs;
sbCommand.append (" ").append (J.util.Escape.eBS (bs));
break;
}
idSeen = (eval.theTok != 12291);
}
if (!okNoAtoms && bsA == null) this.error (13);
if (this.chk) return false;
if (bsA != null) {
if (contactType == 1649412120 && rd == null) rd =  new J.atomdata.RadiusData (null, 0, J.atomdata.RadiusData.EnumType.OFFSET, J.constant.EnumVdw.AUTO);
var rd1 = (rd == null ?  new J.atomdata.RadiusData (null, 0.26, J.atomdata.RadiusData.EnumType.OFFSET, J.constant.EnumVdw.AUTO) : rd);
if (displayType == 1073742036 && bsB == null && intramolecular != null && intramolecular.booleanValue ()) bsB = bsA;
 else bsB = this.setContactBitSets (bsA, bsB, localOnly, distance, rd1, true);
switch (displayType) {
case 1074790451:
case 1073742136:
var bsSolvent = eval.lookupIdentifierValue ("solvent");
bsA.andNot (bsSolvent);
bsB.andNot (bsSolvent);
bsB.andNot (bsA);
break;
case 3145756:
bsB.andNot (bsA);
break;
case 1073742036:
if (minSet == 2147483647) minSet = 100;
this.setShapeProperty (25, "minset", Integer.$valueOf (minSet));
sbCommand.append (" minSet ").appendI (minSet);
if (params == null) params = [0.5, 2];
}
if (intramolecular != null) {
params = (params == null ?  Clazz.newFloatArray (2, 0) : JU.AU.ensureLengthA (params, 2));
params[1] = (intramolecular.booleanValue () ? 1 : 2);
}if (params != null) sbCommand.append (" parameters ").append (J.util.Escape.eAF (params));
this.setShapeProperty (25, "set", [Integer.$valueOf (contactType), Integer.$valueOf (displayType), Boolean.$valueOf (colorDensity), Boolean.$valueOf (colorByType), bsA, bsB, rd, Float.$valueOf (saProbeRadius), params, sbCommand.toString ()]);
if (colorpt > 0) eval.setMeshDisplayProperty (25, colorpt, 0);
}if (iptDisplayProperty > 0) {
if (!eval.setMeshDisplayProperty (25, iptDisplayProperty, 0)) this.invArg ();
}if (userSlabObject != null && bsA != null) this.setShapeProperty (25, "slab", userSlabObject);
if (bsA != null && (displayType == 1073742036 || localOnly)) {
var volume = this.getShapeProperty (25, "volume");
if (JU.PT.isAD (volume)) {
var vs = volume;
var v = 0;
for (var i = 0; i < vs.length; i++) v += Math.abs (vs[i]);

volume = Float.$valueOf (v);
}var nsets = (this.getShapeProperty (25, "nSets")).intValue ();
if (colorDensity || displayType != 1276117512) {
this.showString ((nsets == 0 ? "" : nsets + " contacts with ") + "net volume " + volume + " A^3");
}}return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "dipole", 
($fz = function () {
var eval = this.eval;
var propertyName = null;
var propertyValue = null;
var iHaveAtoms = false;
var iHaveCoord = false;
var idSeen = false;
this.sm.loadShape (17);
if (this.tokAt (1) == 1073742001 && this.listIsosurface (17)) return false;
this.setShapeProperty (17, "init", null);
if (this.slen == 1) {
this.setShapeProperty (17, "thisID", null);
return false;
}for (var i = 1; i < this.slen; ++i) {
propertyName = null;
propertyValue = null;
switch (this.getToken (i).tok) {
case 1048589:
propertyName = "on";
break;
case 1048588:
propertyName = "off";
break;
case 12291:
propertyName = "delete";
break;
case 2:
case 3:
propertyName = "value";
propertyValue = Float.$valueOf (this.floatParameter (i));
break;
case 10:
propertyName = "atomBitset";
case 1048577:
if (propertyName == null) propertyName = (iHaveAtoms || iHaveCoord ? "endSet" : "startSet");
propertyValue = this.atomExpressionAt (i);
i = eval.iToken;
iHaveAtoms = true;
break;
case 1048586:
case 8:
var pt = this.getPoint3f (i, true);
i = eval.iToken;
propertyName = (iHaveAtoms || iHaveCoord ? "endCoord" : "startCoord");
propertyValue = pt;
iHaveCoord = true;
break;
case 1678770178:
propertyName = "bonds";
break;
case 4102:
propertyName = "calculate";
break;
case 1074790550:
this.setShapeId (17, ++i, idSeen);
i = eval.iToken;
break;
case 135267329:
propertyName = "cross";
propertyValue = Boolean.TRUE;
break;
case 1073742040:
propertyName = "cross";
propertyValue = Boolean.FALSE;
break;
case 1073742066:
var v = this.floatParameter (++i);
if (eval.theTok == 2) {
propertyName = "offsetPercent";
propertyValue = Integer.$valueOf (Clazz.floatToInt (v));
} else {
propertyName = "offset";
propertyValue = Float.$valueOf (v);
}break;
case 1073742068:
propertyName = "offsetSide";
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
case 1073742188:
propertyName = "value";
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
case 1073742196:
propertyName = "width";
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
default:
if (eval.theTok == 269484209 || J.script.T.tokAttr (eval.theTok, 1073741824)) {
this.setShapeId (17, i, idSeen);
i = eval.iToken;
break;
}this.invArg ();
}
idSeen = (eval.theTok != 12291 && eval.theTok != 4102);
if (propertyName != null) this.setShapeProperty (17, propertyName, propertyValue);
}
if (iHaveCoord || iHaveAtoms) this.setShapeProperty (17, "set", null);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "draw", 
($fz = function () {
var eval = this.eval;
this.sm.loadShape (22);
switch (this.tokAt (1)) {
case 1073742001:
if (this.listIsosurface (22)) return false;
break;
case 1073742102:
this.pointGroup ();
return false;
case 137363468:
case 135270418:
case 1052714:
this.plot (this.st);
return false;
}
var havePoints = false;
var isInitialized = false;
var isSavedState = false;
var isIntersect = false;
var isFrame = false;
var plane;
var tokIntersect = 0;
var translucentLevel = 3.4028235E38;
eval.colorArgb[0] = -2147483648;
var intScale = 0;
var swidth = "";
var iptDisplayProperty = 0;
var center = null;
var thisId = this.initIsosurface (22);
var idSeen = (thisId != null);
var isWild = (idSeen && this.getShapeProperty (22, "ID") == null);
var connections = null;
var iConnect = 0;
for (var i = eval.iToken; i < this.slen; ++i) {
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 1614417948:
case 1679429641:
if (this.chk) break;
var vp = this.viewer.getPlaneIntersection (eval.theTok, null, intScale / 100, 0);
intScale = 0;
propertyName = "polygon";
propertyValue = vp;
havePoints = true;
break;
case 4106:
connections =  Clazz.newIntArray (4, 0);
iConnect = 4;
var farray = eval.floatParameterSet (++i, 4, 4);
i = eval.iToken;
for (var j = 0; j < 4; j++) connections[j] = Clazz.floatToInt (farray[j]);

havePoints = true;
break;
case 1678770178:
case 1141899265:
if (connections == null || iConnect > (eval.theTok == 1095761924 ? 2 : 3)) {
iConnect = 0;
connections = [-1, -1, -1, -1];
}connections[iConnect++] = this.atomExpressionAt (++i).nextSetBit (0);
i = eval.iToken;
connections[iConnect++] = (eval.theTok == 1678770178 ? this.atomExpressionAt (++i).nextSetBit (0) : -1);
i = eval.iToken;
havePoints = true;
break;
case 554176565:
switch (this.getToken (++i).tok) {
case 1048583:
propertyName = "slab";
propertyValue = eval.objectNameParameter (++i);
i = eval.iToken;
havePoints = true;
break;
default:
this.invArg ();
}
break;
case 135267842:
switch (this.getToken (++i).tok) {
case 1614417948:
case 1679429641:
tokIntersect = eval.theTok;
isIntersect = true;
continue;
case 1048583:
propertyName = "intersect";
propertyValue = eval.objectNameParameter (++i);
i = eval.iToken;
isIntersect = true;
havePoints = true;
break;
default:
this.invArg ();
}
break;
case 1073742106:
propertyName = "polygon";
havePoints = true;
var v =  new JU.List ();
var nVertices = 0;
var nTriangles = 0;
var points = null;
var vpolygons = null;
if (eval.isArrayParameter (++i)) {
points = eval.getPointArray (i, -1);
nVertices = points.length;
} else {
nVertices = Math.max (0, this.intParameter (i));
points =  new Array (nVertices);
for (var j = 0; j < nVertices; j++) points[j] = this.centerParameter (++eval.iToken);

}switch (this.getToken (++eval.iToken).tok) {
case 11:
case 12:
var sv = J.script.SV.newT (eval.theToken);
sv.toArray ();
vpolygons = sv.getList ();
nTriangles = vpolygons.size ();
break;
case 7:
vpolygons = (eval.theToken).getList ();
nTriangles = vpolygons.size ();
break;
default:
nTriangles = Math.max (0, this.intParameter (eval.iToken));
}
var polygons = JU.AU.newInt2 (nTriangles);
for (var j = 0; j < nTriangles; j++) {
var f = (vpolygons == null ? eval.floatParameterSet (++eval.iToken, 3, 4) : J.script.SV.flistValue (vpolygons.get (j), 0));
if (f.length < 3 || f.length > 4) this.invArg ();
polygons[j] = [Clazz.floatToInt (f[0]), Clazz.floatToInt (f[1]), Clazz.floatToInt (f[2]), (f.length == 3 ? 7 : Clazz.floatToInt (f[3]))];
}
if (nVertices > 0) {
v.addLast (points);
v.addLast (polygons);
} else {
v = null;
}propertyValue = v;
i = eval.iToken;
break;
case 1297090050:
var xyz = null;
var iSym = 0;
plane = null;
var target = null;
switch (this.tokAt (++i)) {
case 4:
xyz = this.stringParameter (i);
break;
case 12:
xyz = J.script.SV.sValue (this.getToken (i));
break;
case 2:
default:
if (!eval.isCenterParameter (i)) iSym = this.intParameter (i++);
if (eval.isCenterParameter (i)) center = this.centerParameter (i);
if (eval.isCenterParameter (eval.iToken + 1)) target = this.centerParameter (++eval.iToken);
if (this.chk) return false;
i = eval.iToken;
}
var bsAtoms = null;
if (center == null && i + 1 < this.slen) {
center = this.centerParameter (++i);
bsAtoms = (this.tokAt (i) == 10 || this.tokAt (i) == 1048577 ? this.atomExpressionAt (i) : null);
i = eval.iToken + 1;
}eval.checkLast (eval.iToken);
if (!this.chk) eval.runScript (this.viewer.getSymmetryInfo (bsAtoms, xyz, iSym, center, target, thisId, 135176));
return false;
case 4115:
isFrame = true;
continue;
case 1048586:
case 9:
case 8:
if (eval.theTok == 9 || !eval.isPoint3f (i)) {
propertyValue = this.getPoint4f (i);
if (isFrame) {
eval.checkLast (eval.iToken);
if (!this.chk) eval.runScript ((J.util.Quaternion.newP4 (propertyValue)).draw ((thisId == null ? "frame" : thisId), " " + swidth, (center == null ?  new JU.P3 () : center), intScale / 100));
return false;
}propertyName = "planedef";
} else {
propertyValue = center = this.getPoint3f (i, true);
propertyName = "coord";
}i = eval.iToken;
havePoints = true;
break;
case 135267841:
case 135266319:
if (!havePoints && !isIntersect && tokIntersect == 0 && eval.theTok != 135267841) {
propertyName = "plane";
break;
}if (eval.theTok == 135266319) {
plane = eval.planeParameter (++i);
} else {
plane = eval.hklParameter (++i);
}i = eval.iToken;
if (tokIntersect != 0) {
if (this.chk) break;
var vpc = this.viewer.getPlaneIntersection (tokIntersect, plane, intScale / 100, 0);
intScale = 0;
propertyName = "polygon";
propertyValue = vpc;
} else {
propertyValue = plane;
propertyName = "planedef";
}havePoints = true;
break;
case 1073742000:
propertyName = "lineData";
propertyValue = eval.floatParameterSet (++i, 0, 2147483647);
i = eval.iToken;
havePoints = true;
break;
case 10:
case 1048577:
propertyName = "atomSet";
propertyValue = this.atomExpressionAt (i);
if (isFrame) center = this.centerParameter (i);
i = eval.iToken;
havePoints = true;
break;
case 7:
propertyName = "modelBasedPoints";
propertyValue = J.script.SV.listValue (eval.theToken);
havePoints = true;
break;
case 1073742195:
case 269484080:
break;
case 269484096:
propertyValue = eval.xypParameter (i);
if (propertyValue != null) {
i = eval.iToken;
propertyName = "coord";
havePoints = true;
break;
}if (isSavedState) this.invArg ();
isSavedState = true;
break;
case 269484097:
if (!isSavedState) this.invArg ();
isSavedState = false;
break;
case 1141899269:
propertyName = "reverse";
break;
case 4:
propertyValue = this.stringParameter (i);
propertyName = "title";
break;
case 135198:
propertyName = "vector";
break;
case 1141899267:
propertyValue = Float.$valueOf (this.floatParameter (++i));
propertyName = "length";
break;
case 3:
propertyValue = Float.$valueOf (this.floatParameter (i));
propertyName = "length";
break;
case 1095761935:
propertyName = "modelIndex";
propertyValue = Integer.$valueOf (this.intParameter (++i));
break;
case 2:
if (isSavedState) {
propertyName = "modelIndex";
propertyValue = Integer.$valueOf (this.intParameter (i));
} else {
intScale = this.intParameter (i);
}break;
case 1073742138:
if (++i >= this.slen) this.error (34);
switch (this.getToken (i).tok) {
case 2:
intScale = this.intParameter (i);
continue;
case 3:
intScale = Math.round (this.floatParameter (i) * 100);
continue;
}
this.error (34);
break;
case 1074790550:
thisId = this.setShapeId (22, ++i, idSeen);
isWild = (this.getShapeProperty (22, "ID") == null);
i = eval.iToken;
break;
case 1073742028:
propertyName = "fixed";
propertyValue = Boolean.FALSE;
break;
case 1060869:
propertyName = "fixed";
propertyValue = Boolean.TRUE;
break;
case 1073742066:
var pt = this.getPoint3f (++i, true);
i = eval.iToken;
propertyName = "offset";
propertyValue = pt;
break;
case 1073741906:
propertyName = "crossed";
break;
case 1073742196:
propertyValue = Float.$valueOf (this.floatParameter (++i));
propertyName = "width";
swidth = propertyName + " " + propertyValue;
break;
case 1073741998:
propertyName = "line";
propertyValue = Boolean.TRUE;
break;
case 1073741908:
propertyName = "curve";
break;
case 1074790416:
propertyName = "arc";
break;
case 1073741846:
propertyName = "arrow";
break;
case 1073741880:
propertyName = "circle";
break;
case 1073741912:
propertyName = "cylinder";
break;
case 1073742194:
propertyName = "vertices";
break;
case 1073742048:
propertyName = "nohead";
break;
case 1073741861:
propertyName = "isbarb";
break;
case 1073742130:
propertyName = "rotate45";
break;
case 1073742092:
propertyName = "perp";
break;
case 1666189314:
case 1073741916:
var isRadius = (eval.theTok == 1666189314);
var f = this.floatParameter (++i);
if (isRadius) f *= 2;
propertyValue = Float.$valueOf (f);
propertyName = (isRadius || this.tokAt (i) == 3 ? "width" : "diameter");
swidth = propertyName + (this.tokAt (i) == 3 ? " " + f : " " + (Clazz.floatToInt (f)));
break;
case 1048583:
if ((this.tokAt (i + 2) == 269484096 || isFrame)) {
var pto = center = this.centerParameter (i);
i = eval.iToken;
propertyName = "coord";
propertyValue = pto;
havePoints = true;
break;
}propertyValue = eval.objectNameParameter (++i);
propertyName = "identifier";
havePoints = true;
break;
case 1766856708:
case 603979967:
case 1073742074:
idSeen = true;
translucentLevel = eval.getColorTrans (i, false);
i = eval.iToken;
continue;
default:
if (!eval.setMeshDisplayProperty (22, 0, eval.theTok)) {
if (eval.theTok == 269484209 || J.script.T.tokAttr (eval.theTok, 1073741824)) {
thisId = this.setShapeId (22, i, idSeen);
i = eval.iToken;
break;
}this.invArg ();
}if (iptDisplayProperty == 0) iptDisplayProperty = i;
i = eval.iToken;
continue;
}
idSeen = (eval.theTok != 12291);
if (havePoints && !isInitialized && !isFrame) {
this.setShapeProperty (22, "points", Integer.$valueOf (intScale));
isInitialized = true;
intScale = 0;
}if (havePoints && isWild) this.invArg ();
if (propertyName != null) this.setShapeProperty (22, propertyName, propertyValue);
}
eval.finalizeObject (22, eval.colorArgb[0], translucentLevel, intScale, havePoints, connections, iptDisplayProperty, null);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "isosurface", 
($fz = function (iShape) {
var eval = this.eval;
this.sm.loadShape (iShape);
if (this.tokAt (1) == 1073742001 && this.listIsosurface (iShape)) return false;
var iptDisplayProperty = 0;
var isIsosurface = (iShape == 24);
var isPmesh = (iShape == 28);
var isPlot3d = (iShape == 29);
var isLcaoCartoon = (iShape == 26);
var surfaceObjectSeen = false;
var planeSeen = false;
var isMapped = false;
var isBicolor = false;
var isPhased = false;
var doCalcArea = false;
var doCalcVolume = false;
var isCavity = false;
var haveRadius = false;
var toCache = false;
var isFxy = false;
var haveSlab = false;
var haveIntersection = false;
var isFrontOnly = false;
var data = null;
var cmd = null;
var thisSetNumber = -2147483648;
var nFiles = 0;
var nX;
var nY;
var nZ;
var ptX;
var ptY;
var sigma = NaN;
var cutoff = NaN;
var ptWithin = 0;
var smoothing = null;
var smoothingPower = 2147483647;
var bs = null;
var bsSelect = null;
var bsIgnore = null;
var sbCommand =  new JU.SB ();
var pt;
var plane = null;
var lattice = null;
var pts;
var color = 0;
var str = null;
var modelIndex = (this.chk ? 0 : -2147483648);
eval.setCursorWait (true);
var idSeen = (this.initIsosurface (iShape) != null);
var isWild = (idSeen && this.getShapeProperty (iShape, "ID") == null);
var isColorSchemeTranslucent = false;
var isInline = false;
var onlyOneModel = null;
var translucency = null;
var colorScheme = null;
var mepOrMlp = null;
var symops = null;
var discreteColixes = null;
var propertyList =  new JU.List ();
var defaultMesh = false;
if (isPmesh || isPlot3d) this.addShapeProperty (propertyList, "fileType", "Pmesh");
for (var i = eval.iToken; i < this.slen; ++i) {
var propertyName = null;
var propertyValue = null;
this.getToken (i);
if (eval.theTok == 1073741824) str = this.parameterAsString (i);
switch (eval.theTok) {
case 603979871:
smoothing = (this.getToken (++i).tok == 1048589 ? Boolean.TRUE : eval.theTok == 1048588 ? Boolean.FALSE : null);
if (smoothing == null) this.invArg ();
continue;
case 553648149:
smoothingPower = this.intParameter (++i);
continue;
case 4128:
propertyName = "moveIsosurface";
if (this.tokAt (++i) != 12) this.invArg ();
propertyValue = this.getToken (i++).value;
break;
case 1297090050:
var ff = this.floatArraySet (i + 2, this.intParameter (i + 1), 16);
symops =  new Array (ff.length);
for (var j = symops.length; --j >= 0; ) symops[j] = JU.M4.newA (ff[j]);

i = eval.iToken;
break;
case 1089470478:
if (modelIndex < 0) modelIndex = Math.min (this.viewer.getCurrentModelIndex (), 0);
var needIgnore = (bsIgnore == null);
if (bsSelect == null) bsSelect = J.util.BSUtil.copy (this.viewer.getSelectionSet (false));
bsSelect.and (this.viewer.getAtomBits (1297090050, Integer.$valueOf (1)));
if (!needIgnore) bsSelect.andNot (bsIgnore);
this.addShapeProperty (propertyList, "select", bsSelect);
if (needIgnore) {
bsIgnore = J.util.BSUtil.copy (bsSelect);
J.util.BSUtil.invertInPlace (bsIgnore, this.viewer.getAtomCount ());
isFrontOnly = true;
this.addShapeProperty (propertyList, "ignore", bsIgnore);
sbCommand.append (" ignore ").append (J.util.Escape.eBS (bsIgnore));
}sbCommand.append (" symmetry");
if (color == 0) this.addShapeProperty (propertyList, "colorRGB", Integer.$valueOf (1297090050));
symops = this.viewer.modelSet.getSymMatrices (modelIndex);
break;
case 1073742066:
propertyName = "offset";
propertyValue = this.centerParameter (++i);
i = eval.iToken;
break;
case 528432:
propertyName = "rotate";
propertyValue = (this.tokAt (eval.iToken = ++i) == 1048587 ? null : this.getPoint4f (i));
i = eval.iToken;
break;
case 1610612740:
propertyName = "scale3d";
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
case 1073742090:
sbCommand.append (" periodic");
propertyName = "periodic";
break;
case 1073742078:
case 266298:
case 135266320:
propertyName = eval.theToken.value.toString ();
sbCommand.append (" ").appendO (eval.theToken.value);
propertyValue = this.centerParameter (++i);
sbCommand.append (" ").append (J.util.Escape.eP (propertyValue));
i = eval.iToken;
break;
case 1679429641:
if (this.fullCommand.indexOf ("# BBOX=") >= 0) {
var bbox = JU.PT.split (JU.PT.getQuotedAttribute (this.fullCommand, "# BBOX"), ",");
pts = [J.util.Escape.uP (bbox[0]), J.util.Escape.uP (bbox[1])];
} else if (eval.isCenterParameter (i + 1)) {
pts = [this.getPoint3f (i + 1, true), this.getPoint3f (eval.iToken + 1, true)];
i = eval.iToken;
} else {
pts = this.viewer.getBoundBoxVertices ();
}sbCommand.append (" boundBox " + J.util.Escape.eP (pts[0]) + " " + J.util.Escape.eP (pts[pts.length - 1]));
propertyName = "boundingBox";
propertyValue = pts;
break;
case 135188:
isPmesh = true;
sbCommand.append (" pmesh");
propertyName = "fileType";
propertyValue = "Pmesh";
break;
case 135267842:
bsSelect = this.atomExpressionAt (++i);
if (this.chk) {
bs =  new JU.BS ();
} else if (this.tokAt (eval.iToken + 1) == 1048577 || this.tokAt (eval.iToken + 1) == 10) {
bs = this.atomExpressionAt (++eval.iToken);
bs.and (this.viewer.getAtomsWithinRadius (5.0, bsSelect, false, null));
} else {
bs = this.viewer.getAtomsWithinRadius (5.0, bsSelect, true, null);
bs.andNot (this.viewer.getAtomBits (1095761936, bsSelect));
}bs.andNot (bsSelect);
sbCommand.append (" intersection ").append (J.util.Escape.eBS (bsSelect)).append (" ").append (J.util.Escape.eBS (bs));
i = eval.iToken;
if (this.tokAt (i + 1) == 135368713) {
i++;
var f = this.getToken (++i).value;
sbCommand.append (" function ").append (J.util.Escape.eS (f));
if (!this.chk) this.addShapeProperty (propertyList, "func", (f.equals ("a+b") || f.equals ("a-b") ? f : this.createFunction ("__iso__", "a,b", f)));
} else {
haveIntersection = true;
}propertyName = "intersection";
propertyValue = [bsSelect, bs];
break;
case 1610625028:
case 135266325:
var isDisplay = (eval.theTok == 1610625028);
if (isDisplay) {
sbCommand.append (" display");
iptDisplayProperty = i;
var tok = this.tokAt (i + 1);
if (tok == 0) continue;
i++;
this.addShapeProperty (propertyList, "token", Integer.$valueOf (1048589));
if (tok == 10 || tok == 1048579) {
propertyName = "bsDisplay";
if (tok == 1048579) {
sbCommand.append (" all");
} else {
propertyValue = this.st[i].value;
sbCommand.append (" ").append (J.util.Escape.eBS (propertyValue));
}eval.checkLast (i);
break;
} else if (tok != 135266325) {
eval.iToken = i;
this.invArg ();
}} else {
ptWithin = i;
}var distance;
var ptc = null;
bs = null;
var havePt = false;
if (this.tokAt (i + 1) == 1048577) {
distance = this.floatParameter (i + 3);
if (eval.isPoint3f (i + 4)) {
ptc = this.centerParameter (i + 4);
havePt = true;
eval.iToken = eval.iToken + 2;
} else if (eval.isPoint3f (i + 5)) {
ptc = this.centerParameter (i + 5);
havePt = true;
eval.iToken = eval.iToken + 2;
} else {
bs = eval.atomExpression (this.st, i + 5, this.slen, true, false, false, true);
if (bs == null) this.invArg ();
}} else {
distance = this.floatParameter (++i);
ptc = this.centerParameter (++i);
}if (isDisplay) eval.checkLast (eval.iToken);
i = eval.iToken;
if (this.fullCommand.indexOf ("# WITHIN=") >= 0) bs = J.util.Escape.uB (JU.PT.getQuotedAttribute (this.fullCommand, "# WITHIN"));
 else if (!havePt) bs = (Clazz.instanceOf (eval.expressionResult, JU.BS) ? eval.expressionResult : null);
if (!this.chk) {
if (bs != null && modelIndex >= 0) {
bs.and (this.viewer.getModelUndeletedAtomsBitSet (modelIndex));
}if (ptc == null) ptc = this.viewer.getAtomSetCenter (bs);
this.getWithinDistanceVector (propertyList, distance, ptc, bs, isDisplay);
sbCommand.append (" within ").appendF (distance).append (" ").append (bs == null ? J.util.Escape.eP (ptc) : J.util.Escape.eBS (bs));
}continue;
case 1073742083:
propertyName = "parameters";
var fparams = eval.floatParameterSet (++i, 1, 10);
i = eval.iToken;
propertyValue = fparams;
sbCommand.append (" parameters ").append (J.util.Escape.eAF (fparams));
break;
case 1716520985:
case 1073742190:
onlyOneModel = eval.theToken.value;
var isVariable = (eval.theTok == 1073742190);
var tokProperty = this.tokAt (i + 1);
if (mepOrMlp == null) {
if (!surfaceObjectSeen && !isMapped && !planeSeen) {
this.addShapeProperty (propertyList, "sasurface", Float.$valueOf (0));
sbCommand.append (" vdw");
surfaceObjectSeen = true;
}propertyName = "property";
if (smoothing == null) {
var allowSmoothing = J.script.T.tokAttr (tokProperty, 1112539136);
smoothing = (allowSmoothing && this.viewer.getIsosurfacePropertySmoothing (false) == 1 ? Boolean.TRUE : Boolean.FALSE);
}this.addShapeProperty (propertyList, "propertySmoothing", smoothing);
sbCommand.append (" isosurfacePropertySmoothing " + smoothing);
if (smoothing === Boolean.TRUE) {
if (smoothingPower == 2147483647) smoothingPower = this.viewer.getIsosurfacePropertySmoothing (true);
this.addShapeProperty (propertyList, "propertySmoothingPower", Integer.$valueOf (smoothingPower));
sbCommand.append (" isosurfacePropertySmoothingPower " + smoothingPower);
}if (this.viewer.global.rangeSelected) this.addShapeProperty (propertyList, "rangeSelected", Boolean.TRUE);
} else {
propertyName = mepOrMlp;
}str = this.parameterAsString (i);
sbCommand.append (" ").append (str);
if (str.toLowerCase ().indexOf ("property_") == 0) {
data =  Clazz.newFloatArray (this.viewer.getAtomCount (), 0);
if (this.chk) continue;
data = this.viewer.getDataFloat (str);
if (data == null) this.invArg ();
this.addShapeProperty (propertyList, propertyName, data);
continue;
}var atomCount = this.viewer.getAtomCount ();
data =  Clazz.newFloatArray (atomCount, 0);
if (isVariable) {
var vname = this.parameterAsString (++i);
if (vname.length == 0) {
data = eval.floatParameterSet (i, atomCount, atomCount);
} else {
data =  Clazz.newFloatArray (atomCount, 0);
if (!this.chk) J.util.Parser.parseStringInfestedFloatArray ("" + eval.getParameter (vname, 4), null, data);
}if (!this.chk) sbCommand.append (" \"\" ").append (J.util.Escape.eAF (data));
} else {
this.getToken (++i);
if (!this.chk) {
sbCommand.append (" " + eval.theToken.value);
var atoms = this.viewer.modelSet.atoms;
this.viewer.autoCalculate (tokProperty);
if (tokProperty != 1766856708) for (var iAtom = atomCount; --iAtom >= 0; ) data[iAtom] = J.modelset.Atom.atomPropertyFloat (this.viewer, atoms[iAtom], tokProperty);

}if (tokProperty == 1766856708) colorScheme = "inherit";
if (this.tokAt (i + 1) == 135266325) {
var d = this.floatParameter (i = i + 2);
sbCommand.append (" within " + d);
this.addShapeProperty (propertyList, "propertyDistanceMax", Float.$valueOf (d));
}}propertyValue = data;
break;
case 1095761935:
case 1095766030:
if (surfaceObjectSeen) this.invArg ();
modelIndex = (eval.theTok == 1095761935 ? this.intParameter (++i) : eval.modelNumberParameter (++i));
sbCommand.append (" modelIndex " + modelIndex);
if (modelIndex < 0) {
propertyName = "fixed";
propertyValue = Boolean.TRUE;
break;
}propertyName = "modelIndex";
propertyValue = Integer.$valueOf (modelIndex);
break;
case 135280132:
propertyName = "select";
var bs1 = this.atomExpressionAt (++i);
propertyValue = bs1;
i = eval.iToken;
var isOnly = (this.tokAt (i + 1) == 1073742072);
if (isOnly) {
i++;
bsIgnore = J.util.BSUtil.copy (bs1);
J.util.BSUtil.invertInPlace (bsIgnore, this.viewer.getAtomCount ());
this.addShapeProperty (propertyList, "ignore", bsIgnore);
sbCommand.append (" ignore ").append (J.util.Escape.eBS (bsIgnore));
isFrontOnly = true;
}if (surfaceObjectSeen || isMapped) {
sbCommand.append (" select " + J.util.Escape.eBS (bs1));
} else {
bsSelect = propertyValue;
if (modelIndex < 0 && bsSelect.nextSetBit (0) >= 0) modelIndex = this.viewer.getAtomModelIndex (bsSelect.nextSetBit (0));
}break;
case 1085443:
thisSetNumber = this.intParameter (++i);
break;
case 12289:
propertyName = "center";
propertyValue = this.centerParameter (++i);
sbCommand.append (" center " + J.util.Escape.eP (propertyValue));
i = eval.iToken;
break;
case 1073742147:
case 1766856708:
idSeen = true;
var isSign = (eval.theTok == 1073742147);
if (isSign) {
sbCommand.append (" sign");
this.addShapeProperty (propertyList, "sign", Boolean.TRUE);
} else {
if (this.tokAt (i + 1) == 1073741914) {
i++;
propertyName = "colorDensity";
sbCommand.append (" color density");
if (this.isFloatParameter (i + 1)) {
var ptSize = this.floatParameter (++i);
sbCommand.append (" " + ptSize);
propertyValue = Float.$valueOf (ptSize);
}break;
}if (this.getToken (i + 1).tok == 4) {
colorScheme = this.parameterAsString (++i);
if (colorScheme.indexOf (" ") > 0) {
discreteColixes = J.util.C.getColixArray (colorScheme);
if (discreteColixes == null) this.error (4);
}} else if (eval.theTok == 1073742018) {
i++;
sbCommand.append (" color mesh");
color = eval.getArgbParam (++i);
this.addShapeProperty (propertyList, "meshcolor", Integer.$valueOf (color));
sbCommand.append (" ").append (J.util.Escape.escapeColor (color));
i = eval.iToken;
continue;
}if ((eval.theTok = this.tokAt (i + 1)) == 603979967 || eval.theTok == 1073742074) {
sbCommand.append (" color");
translucency = this.setColorOptions (sbCommand, i + 1, 24, -2);
i = eval.iToken;
continue;
}switch (this.tokAt (i + 1)) {
case 1073741826:
case 1073742114:
this.getToken (++i);
sbCommand.append (" color range");
this.addShapeProperty (propertyList, "rangeAll", null);
if (this.tokAt (i + 1) == 1048579) {
i++;
sbCommand.append (" all");
continue;
}var min = this.floatParameter (++i);
var max = this.floatParameter (++i);
this.addShapeProperty (propertyList, "red", Float.$valueOf (min));
this.addShapeProperty (propertyList, "blue", Float.$valueOf (max));
sbCommand.append (" ").appendF (min).append (" ").appendF (max);
continue;
}
if (eval.isColorParam (i + 1)) {
color = eval.getArgbParam (i + 1);
if (this.tokAt (i + 2) == 1074790746) {
colorScheme = eval.getColorRange (i + 1);
i = eval.iToken;
break;
}}sbCommand.append (" color");
}if (eval.isColorParam (i + 1)) {
color = eval.getArgbParam (++i);
sbCommand.append (" ").append (J.util.Escape.escapeColor (color));
i = eval.iToken;
this.addShapeProperty (propertyList, "colorRGB", Integer.$valueOf (color));
idSeen = true;
if (eval.isColorParam (i + 1)) {
color = eval.getArgbParam (++i);
i = eval.iToken;
this.addShapeProperty (propertyList, "colorRGB", Integer.$valueOf (color));
sbCommand.append (" ").append (J.util.Escape.escapeColor (color));
isBicolor = true;
} else if (isSign) {
this.invPO ();
}} else if (!isSign && discreteColixes == null) {
this.invPO ();
}continue;
case 135270423:
if (!isIsosurface) this.invArg ();
toCache = !this.chk;
continue;
case 1229984263:
if (this.tokAt (i + 1) != 4) this.invPO ();
continue;
case 1112541195:
case 1649412120:
sbCommand.append (" ").appendO (eval.theToken.value);
var rd = eval.encodeRadiusParameter (i, false, true);
sbCommand.append (" ").appendO (rd);
if (Float.isNaN (rd.value)) rd.value = 100;
propertyValue = rd;
propertyName = "radius";
haveRadius = true;
if (isMapped) surfaceObjectSeen = false;
i = eval.iToken;
break;
case 135266319:
planeSeen = true;
propertyName = "plane";
propertyValue = eval.planeParameter (++i);
i = eval.iToken;
sbCommand.append (" plane ").append (J.util.Escape.eP4 (propertyValue));
break;
case 1073742138:
propertyName = "scale";
propertyValue = Float.$valueOf (this.floatParameter (++i));
sbCommand.append (" scale ").appendO (propertyValue);
break;
case 1048579:
if (idSeen) this.invArg ();
propertyName = "thisID";
break;
case 1113198596:
surfaceObjectSeen = true;
++i;
propertyValue = this.getPoint4f (i);
propertyName = "ellipsoid";
i = eval.iToken;
sbCommand.append (" ellipsoid ").append (J.util.Escape.eP4 (propertyValue));
break;
case 135267841:
planeSeen = true;
propertyName = "plane";
propertyValue = eval.hklParameter (++i);
i = eval.iToken;
sbCommand.append (" plane ").append (J.util.Escape.eP4 (propertyValue));
break;
case 135182:
surfaceObjectSeen = true;
var lcaoType = this.parameterAsString (++i);
this.addShapeProperty (propertyList, "lcaoType", lcaoType);
sbCommand.append (" lcaocartoon ").append (J.util.Escape.eS (lcaoType));
switch (this.getToken (++i).tok) {
case 10:
case 1048577:
propertyName = "lcaoCartoon";
bs = this.atomExpressionAt (i);
i = eval.iToken;
if (this.chk) continue;
var atomIndex = bs.nextSetBit (0);
if (atomIndex < 0) this.error (14);
sbCommand.append (" ({").appendI (atomIndex).append ("})");
modelIndex = this.viewer.getAtomModelIndex (atomIndex);
this.addShapeProperty (propertyList, "modelIndex", Integer.$valueOf (modelIndex));
var axes = [ new JU.V3 (),  new JU.V3 (), JU.V3.newV (this.viewer.getAtomPoint3f (atomIndex)),  new JU.V3 ()];
if (!lcaoType.equalsIgnoreCase ("s") && this.viewer.getHybridizationAndAxes (atomIndex, axes[0], axes[1], lcaoType) == null) return false;
propertyValue = axes;
break;
default:
this.error (14);
}
break;
case 1183762:
var moNumber = 2147483647;
var offset = 2147483647;
var isNegOffset = (this.tokAt (i + 1) == 269484192);
if (isNegOffset) i++;
var linearCombination = null;
switch (this.tokAt (++i)) {
case 0:
this.error (2);
break;
case 1073741914:
sbCommand.append ("mo [1] squared ");
this.addShapeProperty (propertyList, "squareLinear", Boolean.TRUE);
linearCombination = [1];
offset = moNumber = 0;
i++;
break;
case 1073741973:
case 1073742008:
offset = this.moOffset (i);
moNumber = 0;
i = eval.iToken;
sbCommand.append (" mo " + (isNegOffset ? "-" : "") + "HOMO ");
if (offset > 0) sbCommand.append ("+");
if (offset != 0) sbCommand.appendI (offset);
break;
case 2:
moNumber = this.intParameter (i);
sbCommand.append (" mo ").appendI (moNumber);
break;
default:
if (eval.isArrayParameter (i)) {
linearCombination = eval.floatParameterSet (i, 1, 2147483647);
i = eval.iToken;
}}
var squared = (this.tokAt (i + 1) == 1073742156);
if (squared) {
this.addShapeProperty (propertyList, "squareLinear", Boolean.TRUE);
sbCommand.append (" squared");
if (linearCombination == null) linearCombination =  Clazz.newFloatArray (0, 0);
} else if (this.tokAt (i + 1) == 135266320) {
++i;
var monteCarloCount = this.intParameter (++i);
var seed = (this.tokAt (i + 1) == 2 ? this.intParameter (++i) : (-System.currentTimeMillis ()) % 10000);
this.addShapeProperty (propertyList, "monteCarloCount", Integer.$valueOf (monteCarloCount));
this.addShapeProperty (propertyList, "randomSeed", Integer.$valueOf (seed));
sbCommand.append (" points ").appendI (monteCarloCount).appendC (' ').appendI (seed);
}this.setMoData (propertyList, moNumber, linearCombination, offset, isNegOffset, modelIndex, null);
surfaceObjectSeen = true;
continue;
case 1073742036:
propertyName = "nci";
sbCommand.append (" " + propertyName);
var tok = this.tokAt (i + 1);
var isPromolecular = (tok != 1229984263 && tok != 4 && tok != 1073742033);
propertyValue = Boolean.$valueOf (isPromolecular);
if (isPromolecular) surfaceObjectSeen = true;
break;
case 1073742016:
case 1073742022:
var isMep = (eval.theTok == 1073742016);
propertyName = (isMep ? "mep" : "mlp");
sbCommand.append (" " + propertyName);
var fname = null;
var calcType = -1;
surfaceObjectSeen = true;
if (this.tokAt (i + 1) == 2) {
calcType = this.intParameter (++i);
sbCommand.append (" " + calcType);
this.addShapeProperty (propertyList, "mepCalcType", Integer.$valueOf (calcType));
}if (this.tokAt (i + 1) == 4) {
fname = this.stringParameter (++i);
sbCommand.append (" /*file*/" + J.util.Escape.eS (fname));
} else if (this.tokAt (i + 1) == 1716520985) {
mepOrMlp = propertyName;
continue;
}if (!this.chk) try {
data = (fname == null && isMep ? this.viewer.getPartialCharges () : this.getAtomicPotentials (bsSelect, bsIgnore, fname));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (!this.chk && data == null) this.error (32);
propertyValue = data;
break;
case 1313866249:
doCalcVolume = !this.chk;
sbCommand.append (" volume");
break;
case 1074790550:
this.setShapeId (iShape, ++i, idSeen);
isWild = (this.getShapeProperty (iShape, "ID") == null);
i = eval.iToken;
break;
case 1073741888:
if (this.tokAt (i + 1) == 603979967) {
isColorSchemeTranslucent = true;
i++;
}colorScheme = this.parameterAsString (++i).toLowerCase ();
if (colorScheme.equals ("sets")) {
sbCommand.append (" colorScheme \"sets\"");
} else if (eval.isColorParam (i)) {
colorScheme = eval.getColorRange (i);
i = eval.iToken;
}break;
case 1073741828:
propertyName = "addHydrogens";
propertyValue = Boolean.TRUE;
sbCommand.append (" mp.addHydrogens");
break;
case 1073741836:
propertyName = "angstroms";
sbCommand.append (" angstroms");
break;
case 1073741838:
propertyName = "anisotropy";
propertyValue = this.getPoint3f (++i, false);
sbCommand.append (" anisotropy").append (J.util.Escape.eP (propertyValue));
i = eval.iToken;
break;
case 1073741842:
doCalcArea = !this.chk;
sbCommand.append (" area");
break;
case 1073741850:
case 1073742076:
surfaceObjectSeen = true;
if (isBicolor && !isPhased) {
sbCommand.append (" phase \"_orb\"");
this.addShapeProperty (propertyList, "phase", "_orb");
}var nlmZprs =  Clazz.newFloatArray (7, 0);
nlmZprs[0] = this.intParameter (++i);
nlmZprs[1] = this.intParameter (++i);
nlmZprs[2] = this.intParameter (++i);
nlmZprs[3] = (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 6);
sbCommand.append (" atomicOrbital ").appendI (Clazz.floatToInt (nlmZprs[0])).append (" ").appendI (Clazz.floatToInt (nlmZprs[1])).append (" ").appendI (Clazz.floatToInt (nlmZprs[2])).append (" ").appendF (nlmZprs[3]);
if (this.tokAt (i + 1) == 135266320) {
i += 2;
nlmZprs[4] = this.intParameter (i);
nlmZprs[5] = (this.tokAt (i + 1) == 3 ? this.floatParameter (++i) : 0);
nlmZprs[6] = (this.tokAt (i + 1) == 2 ? this.intParameter (++i) : (-System.currentTimeMillis ()) % 10000);
sbCommand.append (" points ").appendI (Clazz.floatToInt (nlmZprs[4])).appendC (' ').appendF (nlmZprs[5]).appendC (' ').appendI (Clazz.floatToInt (nlmZprs[6]));
}propertyName = "hydrogenOrbital";
propertyValue = nlmZprs;
break;
case 1073741866:
sbCommand.append (" binary");
continue;
case 1073741868:
sbCommand.append (" blockData");
propertyName = "blockData";
propertyValue = Boolean.TRUE;
break;
case 1074790451:
case 554176565:
haveSlab = true;
propertyName = eval.theToken.value;
propertyValue = this.getCapSlabObject (i, false);
i = eval.iToken;
break;
case 1073741876:
if (!isIsosurface) this.invArg ();
isCavity = true;
if (this.chk) continue;
var cavityRadius = (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 1.2);
var envelopeRadius = (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 10);
if (envelopeRadius > 10) eval.integerOutOfRange (0, 10);
sbCommand.append (" cavity ").appendF (cavityRadius).append (" ").appendF (envelopeRadius);
this.addShapeProperty (propertyList, "envelopeRadius", Float.$valueOf (envelopeRadius));
this.addShapeProperty (propertyList, "cavityRadius", Float.$valueOf (cavityRadius));
propertyName = "cavity";
break;
case 1073741896:
case 1073741900:
propertyName = "contour";
sbCommand.append (" contour");
switch (this.tokAt (i + 1)) {
case 1073741920:
propertyValue = eval.floatParameterSet (i + 2, 1, 2147483647);
sbCommand.append (" discrete ").append (J.util.Escape.eAF (propertyValue));
i = eval.iToken;
break;
case 1073741981:
pt = this.getPoint3f (i + 2, false);
if (pt.z <= 0 || pt.y < pt.x) this.invArg ();
if (pt.z == Clazz.floatToInt (pt.z) && pt.z > (pt.y - pt.x)) pt.z = (pt.y - pt.x) / pt.z;
propertyValue = pt;
i = eval.iToken;
sbCommand.append (" increment ").append (J.util.Escape.eP (pt));
break;
default:
propertyValue = Integer.$valueOf (this.tokAt (i + 1) == 2 ? this.intParameter (++i) : 0);
sbCommand.append (" ").appendO (propertyValue);
}
break;
case 3:
case 2:
case 269484193:
case 1073741910:
sbCommand.append (" cutoff ");
if (eval.theTok == 1073741910) i++;
if (this.tokAt (i) == 269484193) {
propertyName = "cutoffPositive";
propertyValue = Float.$valueOf (cutoff = this.floatParameter (++i));
sbCommand.append ("+").appendO (propertyValue);
} else if (this.isFloatParameter (i)) {
propertyName = "cutoff";
propertyValue = Float.$valueOf (cutoff = this.floatParameter (i));
sbCommand.appendO (propertyValue);
} else {
propertyName = "cutoffRange";
propertyValue = eval.floatParameterSet (i, 2, 2);
this.addShapeProperty (propertyList, "cutoff", Float.$valueOf (0));
sbCommand.append (J.util.Escape.eAF (propertyValue));
i = eval.iToken;
}break;
case 1073741928:
propertyName = "downsample";
propertyValue = Integer.$valueOf (this.intParameter (++i));
sbCommand.append (" downsample ").appendO (propertyValue);
break;
case 1073741930:
propertyName = "eccentricity";
propertyValue = this.getPoint4f (++i);
sbCommand.append (" eccentricity ").append (J.util.Escape.eP4 (propertyValue));
i = eval.iToken;
break;
case 1074790508:
sbCommand.append (" ed");
this.setMoData (propertyList, -1, null, 0, false, modelIndex, null);
surfaceObjectSeen = true;
continue;
case 536870916:
case 1073742041:
sbCommand.append (" ").appendO (eval.theToken.value);
propertyName = "debug";
propertyValue = (eval.theTok == 536870916 ? Boolean.TRUE : Boolean.FALSE);
break;
case 1060869:
sbCommand.append (" fixed");
propertyName = "fixed";
propertyValue = Boolean.TRUE;
break;
case 1073741962:
sbCommand.append (" fullPlane");
propertyName = "fullPlane";
propertyValue = Boolean.TRUE;
break;
case 1073741966:
case 1073741968:
var isFxyz = (eval.theTok == 1073741968);
propertyName = "" + eval.theToken.value;
var vxy =  new JU.List ();
propertyValue = vxy;
isFxy = surfaceObjectSeen = true;
sbCommand.append (" ").append (propertyName);
var name = this.parameterAsString (++i);
if (name.equals ("=")) {
sbCommand.append (" =");
name = this.parameterAsString (++i);
sbCommand.append (" ").append (J.util.Escape.eS (name));
vxy.addLast (name);
if (!this.chk) this.addShapeProperty (propertyList, "func", this.createFunction ("__iso__", "x,y,z", name));
break;
}var dName = JU.PT.getQuotedAttribute (this.fullCommand, "# DATA" + (isFxy ? "2" : ""));
if (dName == null) dName = "inline";
 else name = dName;
var isXYZ = (name.indexOf ("data2d_") == 0);
var isXYZV = (name.indexOf ("data3d_") == 0);
isInline = name.equals ("inline");
sbCommand.append (" inline");
vxy.addLast (name);
var pt3 = this.getPoint3f (++i, false);
sbCommand.append (" ").append (J.util.Escape.eP (pt3));
vxy.addLast (pt3);
var pt4;
ptX = ++eval.iToken;
vxy.addLast (pt4 = this.getPoint4f (ptX));
sbCommand.append (" ").append (J.util.Escape.eP4 (pt4));
nX = Clazz.floatToInt (pt4.x);
ptY = ++eval.iToken;
vxy.addLast (pt4 = this.getPoint4f (ptY));
sbCommand.append (" ").append (J.util.Escape.eP4 (pt4));
nY = Clazz.floatToInt (pt4.x);
vxy.addLast (pt4 = this.getPoint4f (++eval.iToken));
sbCommand.append (" ").append (J.util.Escape.eP4 (pt4));
nZ = Clazz.floatToInt (pt4.x);
if (nX == 0 || nY == 0 || nZ == 0) this.invArg ();
if (!this.chk) {
var fdata = null;
var xyzdata = null;
if (isFxyz) {
if (isInline) {
nX = Math.abs (nX);
nY = Math.abs (nY);
nZ = Math.abs (nZ);
xyzdata = this.floatArraySetXYZ (++eval.iToken, nX, nY, nZ);
} else if (isXYZV) {
xyzdata = this.viewer.getDataFloat3D (name);
} else {
xyzdata = this.viewer.functionXYZ (name, nX, nY, nZ);
}nX = Math.abs (nX);
nY = Math.abs (nY);
nZ = Math.abs (nZ);
if (xyzdata == null) {
eval.iToken = ptX;
eval.errorStr (53, "xyzdata is null.");
}if (xyzdata.length != nX || xyzdata[0].length != nY || xyzdata[0][0].length != nZ) {
eval.iToken = ptX;
eval.errorStr (53, "xyzdata[" + xyzdata.length + "][" + xyzdata[0].length + "][" + xyzdata[0][0].length + "] is not of size [" + nX + "][" + nY + "][" + nZ + "]");
}vxy.addLast (xyzdata);
sbCommand.append (" ").append (J.util.Escape.e (xyzdata));
} else {
if (isInline) {
nX = Math.abs (nX);
nY = Math.abs (nY);
fdata = this.floatArraySet (++eval.iToken, nX, nY);
} else if (isXYZ) {
fdata = this.viewer.getDataFloat2D (name);
nX = (fdata == null ? 0 : fdata.length);
nY = 3;
} else {
fdata = this.viewer.functionXY (name, nX, nY);
nX = Math.abs (nX);
nY = Math.abs (nY);
}if (fdata == null) {
eval.iToken = ptX;
eval.errorStr (53, "fdata is null.");
}if (fdata.length != nX && !isXYZ) {
eval.iToken = ptX;
eval.errorStr (53, "fdata length is not correct: " + fdata.length + " " + nX + ".");
}for (var j = 0; j < nX; j++) {
if (fdata[j] == null) {
eval.iToken = ptY;
eval.errorStr (53, "fdata[" + j + "] is null.");
}if (fdata[j].length != nY) {
eval.iToken = ptY;
eval.errorStr (53, "fdata[" + j + "] is not the right length: " + fdata[j].length + " " + nY + ".");
}}
vxy.addLast (fdata);
sbCommand.append (" ").append (J.util.Escape.e (fdata));
}}i = eval.iToken;
break;
case 1073741970:
propertyName = "gridPoints";
sbCommand.append (" gridPoints");
break;
case 1073741976:
propertyName = "ignore";
propertyValue = bsIgnore = this.atomExpressionAt (++i);
sbCommand.append (" ignore ").append (J.util.Escape.eBS (bsIgnore));
i = eval.iToken;
break;
case 1073741984:
propertyName = "insideOut";
sbCommand.append (" insideout");
break;
case 1073741988:
case 1073741986:
case 1073742100:
sbCommand.append (" ").appendO (eval.theToken.value);
propertyName = "pocket";
propertyValue = (eval.theTok == 1073742100 ? Boolean.TRUE : Boolean.FALSE);
break;
case 1073742002:
propertyName = "lobe";
propertyValue = this.getPoint4f (++i);
i = eval.iToken;
sbCommand.append (" lobe ").append (J.util.Escape.eP4 (propertyValue));
surfaceObjectSeen = true;
break;
case 1073742004:
case 1073742006:
propertyName = "lp";
propertyValue = this.getPoint4f (++i);
i = eval.iToken;
sbCommand.append (" lp ").append (J.util.Escape.eP4 (propertyValue));
surfaceObjectSeen = true;
break;
case 1052700:
if (isMapped || this.slen == i + 1) this.invArg ();
isMapped = true;
if ((isCavity || haveRadius || haveIntersection) && !surfaceObjectSeen) {
surfaceObjectSeen = true;
this.addShapeProperty (propertyList, "bsSolvent", (haveRadius || haveIntersection ?  new JU.BS () : eval.lookupIdentifierValue ("solvent")));
this.addShapeProperty (propertyList, "sasurface", Float.$valueOf (0));
}if (sbCommand.length () == 0) {
plane = this.getShapeProperty (24, "plane");
if (plane == null) {
if (this.getShapeProperty (24, "contours") != null) {
this.addShapeProperty (propertyList, "nocontour", null);
}} else {
this.addShapeProperty (propertyList, "plane", plane);
sbCommand.append ("plane ").append (J.util.Escape.eP4 (plane));
planeSeen = true;
plane = null;
}} else if (!surfaceObjectSeen && !planeSeen) {
this.invArg ();
}sbCommand.append ("; isosurface map");
this.addShapeProperty (propertyList, "map", (surfaceObjectSeen ? Boolean.TRUE : Boolean.FALSE));
break;
case 1073742014:
propertyName = "maxset";
propertyValue = Integer.$valueOf (this.intParameter (++i));
sbCommand.append (" maxSet ").appendO (propertyValue);
break;
case 1073742020:
propertyName = "minset";
propertyValue = Integer.$valueOf (this.intParameter (++i));
sbCommand.append (" minSet ").appendO (propertyValue);
break;
case 1073742112:
surfaceObjectSeen = true;
propertyName = "rad";
propertyValue = this.getPoint4f (++i);
i = eval.iToken;
sbCommand.append (" radical ").append (J.util.Escape.eP4 (propertyValue));
break;
case 1073742028:
propertyName = "fixed";
propertyValue = Boolean.FALSE;
sbCommand.append (" modelBased");
break;
case 1073742029:
case 1073742136:
case 1613758488:
onlyOneModel = eval.theToken.value;
var radius;
if (eval.theTok == 1073742029) {
propertyName = "molecular";
sbCommand.append (" molecular");
radius = (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 1.4);
} else {
this.addShapeProperty (propertyList, "bsSolvent", eval.lookupIdentifierValue ("solvent"));
propertyName = (eval.theTok == 1073742136 ? "sasurface" : "solvent");
sbCommand.append (" ").appendO (eval.theToken.value);
radius = (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : this.viewer.getFloat (570425394));
}sbCommand.append (" ").appendF (radius);
propertyValue = Float.$valueOf (radius);
if (this.tokAt (i + 1) == 1073741961) {
this.addShapeProperty (propertyList, "doFullMolecular", null);
sbCommand.append (" full");
i++;
}surfaceObjectSeen = true;
break;
case 1073742033:
this.addShapeProperty (propertyList, "fileType", "Mrc");
sbCommand.append (" mrc");
continue;
case 1073742064:
case 1073742062:
this.addShapeProperty (propertyList, "fileType", "Obj");
sbCommand.append (" obj");
continue;
case 1073742034:
this.addShapeProperty (propertyList, "fileType", "Msms");
sbCommand.append (" msms");
continue;
case 1073742094:
if (surfaceObjectSeen) this.invArg ();
propertyName = "phase";
isPhased = true;
propertyValue = (this.tokAt (i + 1) == 4 ? this.stringParameter (++i) : "_orb");
sbCommand.append (" phase ").append (J.util.Escape.eS (propertyValue));
break;
case 1073742104:
case 1073742122:
propertyName = "resolution";
propertyValue = Float.$valueOf (this.floatParameter (++i));
sbCommand.append (" resolution ").appendO (propertyValue);
break;
case 1073742124:
propertyName = "reverseColor";
propertyValue = Boolean.TRUE;
sbCommand.append (" reversecolor");
break;
case 1073742146:
propertyName = "sigma";
propertyValue = Float.$valueOf (sigma = this.floatParameter (++i));
sbCommand.append (" sigma ").appendO (propertyValue);
break;
case 1113198597:
propertyName = "geodesic";
propertyValue = Float.$valueOf (this.floatParameter (++i));
sbCommand.append (" geosurface ").appendO (propertyValue);
surfaceObjectSeen = true;
break;
case 1073742154:
propertyName = "sphere";
propertyValue = Float.$valueOf (this.floatParameter (++i));
sbCommand.append (" sphere ").appendO (propertyValue);
surfaceObjectSeen = true;
break;
case 1073742156:
propertyName = "squareData";
propertyValue = Boolean.TRUE;
sbCommand.append (" squared");
break;
case 1073741983:
propertyName = (!surfaceObjectSeen && !planeSeen && !isMapped ? "readFile" : "mapColor");
str = this.stringParameter (++i);
if (str == null) this.invArg ();
if (isPmesh) str = JU.PT.replaceAllCharacter (str, "{,}|", ' ');
if (eval.logMessages) J.util.Logger.debug ("pmesh inline data:\n" + str);
propertyValue = (this.chk ? null : str);
this.addShapeProperty (propertyList, "fileName", "");
sbCommand.append (" INLINE ").append (J.util.Escape.eS (str));
surfaceObjectSeen = true;
break;
case 4:
var firstPass = (!surfaceObjectSeen && !planeSeen);
propertyName = (firstPass && !isMapped ? "readFile" : "mapColor");
var filename = this.parameterAsString (i);
if (filename.startsWith ("=") && filename.length > 1) {
var info = this.viewer.setLoadFormat (filename, '_', false);
filename = info[0];
var strCutoff = (!firstPass || !Float.isNaN (cutoff) ? null : info[1]);
if (strCutoff != null && !this.chk) {
cutoff = J.script.SV.fValue (J.script.SV.getVariable (this.viewer.evaluateExpression (strCutoff)));
if (cutoff > 0) {
if (!Float.isNaN (sigma)) {
cutoff *= sigma;
sigma = NaN;
this.addShapeProperty (propertyList, "sigma", Float.$valueOf (sigma));
}this.addShapeProperty (propertyList, "cutoff", Float.$valueOf (cutoff));
sbCommand.append (" cutoff ").appendF (cutoff);
}}if (ptWithin == 0) {
onlyOneModel = "=xxxx";
if (modelIndex < 0) modelIndex = this.viewer.getCurrentModelIndex ();
bs = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
this.getWithinDistanceVector (propertyList, 2.0, null, bs, false);
sbCommand.append (" within 2.0 ").append (J.util.Escape.eBS (bs));
}if (firstPass) defaultMesh = true;
}if (firstPass && this.viewer.getParameter ("_fileType").equals ("Pdb") && Float.isNaN (sigma) && Float.isNaN (cutoff)) {
this.addShapeProperty (propertyList, "sigma", Float.$valueOf (-1));
sbCommand.append (" sigma -1.0");
}if (filename.length == 0) {
if (modelIndex < 0) modelIndex = this.viewer.getCurrentModelIndex ();
filename = eval.getFullPathName ();
propertyValue = this.viewer.getModelAuxiliaryInfoValue (modelIndex, "jmolSurfaceInfo");
}var fileIndex = -1;
if (propertyValue == null && this.tokAt (i + 1) == 2) this.addShapeProperty (propertyList, "fileIndex", Integer.$valueOf (fileIndex = this.intParameter (++i)));
var stype = (this.tokAt (i + 1) == 4 ? this.stringParameter (++i) : null);
surfaceObjectSeen = true;
if (this.chk) {
break;
}var fullPathNameOrError;
var localName = null;
if (propertyValue == null) {
if (this.fullCommand.indexOf ("# FILE" + nFiles + "=") >= 0) {
filename = JU.PT.getQuotedAttribute (this.fullCommand, "# FILE" + nFiles);
if (this.tokAt (i + 1) == 1073741848) i += 2;
} else if (this.tokAt (i + 1) == 1073741848) {
localName = this.viewer.getFilePath (this.stringParameter (eval.iToken = (i = i + 2)), false);
fullPathNameOrError = this.viewer.getFullPathNameOrError (localName);
localName = fullPathNameOrError[0];
if (this.viewer.getPathForAllFiles () !== "") {
filename = localName;
localName = null;
} else {
this.addShapeProperty (propertyList, "localName", localName);
}}}if (!filename.startsWith ("cache://") && stype == null) {
fullPathNameOrError = this.viewer.getFullPathNameOrError (filename);
filename = fullPathNameOrError[0];
if (fullPathNameOrError[1] != null) eval.errorStr (17, filename + ":" + fullPathNameOrError[1]);
}J.util.Logger.info ("reading isosurface data from " + filename);
if (stype != null) {
propertyValue = this.viewer.cacheGet (filename);
this.addShapeProperty (propertyList, "calculationType", stype);
}if (propertyValue == null) {
this.addShapeProperty (propertyList, "fileName", filename);
if (localName != null) filename = localName;
if (fileIndex >= 0) sbCommand.append (" ").appendI (fileIndex);
}sbCommand.append (" /*file*/").append (J.util.Escape.eS (filename));
if (stype != null) sbCommand.append (" ").append (J.util.Escape.eS (stype));
break;
case 4106:
propertyName = "connections";
switch (this.tokAt (++i)) {
case 10:
case 1048577:
propertyValue = [this.atomExpressionAt (i).nextSetBit (0)];
break;
default:
propertyValue = [Clazz.floatToInt (eval.floatParameterSet (i, 1, 1)[0])];
break;
}
i = eval.iToken;
break;
case 1095761923:
propertyName = "atomIndex";
propertyValue = Integer.$valueOf (this.intParameter (++i));
break;
case 1073741999:
propertyName = "link";
sbCommand.append (" link");
break;
case 1073741994:
if (iShape != 24) this.invArg ();
pt = this.getPoint3f (eval.iToken + 1, false);
i = eval.iToken;
if (pt.x <= 0 || pt.y <= 0 || pt.z <= 0) break;
pt.x = Clazz.floatToInt (pt.x);
pt.y = Clazz.floatToInt (pt.y);
pt.z = Clazz.floatToInt (pt.z);
sbCommand.append (" lattice ").append (J.util.Escape.eP (pt));
if (isMapped) {
propertyName = "mapLattice";
propertyValue = pt;
} else {
lattice = pt;
}break;
default:
if (eval.theTok == 1073741824) {
propertyName = "thisID";
propertyValue = str;
}if (!eval.setMeshDisplayProperty (iShape, 0, eval.theTok)) {
if (J.script.T.tokAttr (eval.theTok, 1073741824) && !idSeen) {
this.setShapeId (iShape, i, idSeen);
i = eval.iToken;
break;
}this.invArg ();
}if (iptDisplayProperty == 0) iptDisplayProperty = i;
i = this.slen - 1;
break;
}
idSeen = (eval.theTok != 12291);
if (isWild && surfaceObjectSeen) this.invArg ();
if (propertyName != null) this.addShapeProperty (propertyList, propertyName, propertyValue);
}
if (!this.chk) {
if ((isCavity || haveRadius) && !surfaceObjectSeen) {
surfaceObjectSeen = true;
this.addShapeProperty (propertyList, "bsSolvent", (haveRadius ?  new JU.BS () : eval.lookupIdentifierValue ("solvent")));
this.addShapeProperty (propertyList, "sasurface", Float.$valueOf (0));
}if (planeSeen && !surfaceObjectSeen && !isMapped) {
this.addShapeProperty (propertyList, "nomap", Float.$valueOf (0));
surfaceObjectSeen = true;
}if (thisSetNumber >= -1) this.addShapeProperty (propertyList, "getSurfaceSets", Integer.$valueOf (thisSetNumber - 1));
if (discreteColixes != null) {
this.addShapeProperty (propertyList, "colorDiscrete", discreteColixes);
} else if ("sets".equals (colorScheme)) {
this.addShapeProperty (propertyList, "setColorScheme", null);
} else if (colorScheme != null) {
var ce = this.viewer.getColorEncoder (colorScheme);
if (ce != null) {
ce.isTranslucent = isColorSchemeTranslucent;
ce.hi = 3.4028235E38;
this.addShapeProperty (propertyList, "remapColor", ce);
}}if (surfaceObjectSeen && !isLcaoCartoon && sbCommand.indexOf (";") != 0) {
propertyList.add (0, ["newObject", null]);
var needSelect = (bsSelect == null);
if (needSelect) bsSelect = J.util.BSUtil.copy (this.viewer.getSelectionSet (false));
if (modelIndex < 0) modelIndex = this.viewer.getCurrentModelIndex ();
bsSelect.and (this.viewer.getModelUndeletedAtomsBitSet (modelIndex));
if (onlyOneModel != null) {
var bsModels = this.viewer.getModelBitSet (bsSelect, false);
if (bsModels.cardinality () != 1) eval.errorStr (30, "ISOSURFACE " + onlyOneModel);
if (needSelect) {
propertyList.add (0, ["select", bsSelect]);
if (sbCommand.indexOf ("; isosurface map") == 0) {
sbCommand =  new JU.SB ().append ("; isosurface map select ").append (J.util.Escape.eBS (bsSelect)).append (sbCommand.substring (16));
}}}}if (haveIntersection && !haveSlab) {
if (!surfaceObjectSeen) this.addShapeProperty (propertyList, "sasurface", Float.$valueOf (0));
if (!isMapped) {
this.addShapeProperty (propertyList, "map", Boolean.TRUE);
this.addShapeProperty (propertyList, "select", bs);
this.addShapeProperty (propertyList, "sasurface", Float.$valueOf (0));
}this.addShapeProperty (propertyList, "slab", this.getCapSlabObject (-100, false));
}var timeMsg = (surfaceObjectSeen && this.viewer.getBoolean (603979934));
if (timeMsg) J.util.Logger.startTimer ("isosurface");
this.setShapeProperty (iShape, "setProperties", propertyList);
if (timeMsg) this.showString (J.util.Logger.getTimerMsg ("isosurface", 0));
if (defaultMesh) {
this.setShapeProperty (iShape, "token", Integer.$valueOf (1073742018));
this.setShapeProperty (iShape, "token", Integer.$valueOf (1073742046));
isFrontOnly = true;
sbCommand.append (" mesh nofill frontOnly");
}}if (lattice != null) this.setShapeProperty (iShape, "lattice", lattice);
if (symops != null) this.setShapeProperty (iShape, "symops", symops);
if (isFrontOnly) this.setShapeProperty (iShape, "token", Integer.$valueOf (1073741960));
if (iptDisplayProperty > 0) {
if (!eval.setMeshDisplayProperty (iShape, iptDisplayProperty, 0)) this.invArg ();
}if (this.chk) return false;
var area = null;
var volume = null;
if (doCalcArea) {
area = this.getShapeProperty (iShape, "area");
if (Clazz.instanceOf (area, Float)) this.viewer.setFloatProperty ("isosurfaceArea", (area).floatValue ());
 else this.viewer.setUserVariable ("isosurfaceArea", J.script.SV.getVariableAD (area));
}if (doCalcVolume) {
volume = (doCalcVolume ? this.getShapeProperty (iShape, "volume") : null);
if (Clazz.instanceOf (volume, Float)) this.viewer.setFloatProperty ("isosurfaceVolume", (volume).floatValue ());
 else this.viewer.setUserVariable ("isosurfaceVolume", J.script.SV.getVariableAD (volume));
}if (!isLcaoCartoon) {
var s = null;
if (isMapped && !surfaceObjectSeen) {
this.setShapeProperty (iShape, "finalize", sbCommand.toString ());
} else if (surfaceObjectSeen) {
cmd = sbCommand.toString ();
this.setShapeProperty (iShape, "finalize", (cmd.indexOf ("; isosurface map") == 0 ? "" : " select " + J.util.Escape.eBS (bsSelect) + " ") + cmd);
s = this.getShapeProperty (iShape, "ID");
if (s != null && !eval.tQuiet) {
cutoff = (this.getShapeProperty (iShape, "cutoff")).floatValue ();
if (Float.isNaN (cutoff) && !Float.isNaN (sigma)) {
J.util.Logger.error ("sigma not supported");
}s += " created";
if (isIsosurface) s += " with cutoff=" + cutoff;
var minMax = this.getShapeProperty (iShape, "minMaxInfo");
if (minMax[0] != 3.4028235E38) s += " min=" + minMax[0] + " max=" + minMax[1];
s += "; " + J.viewer.JC.shapeClassBases[iShape].toLowerCase () + " count: " + this.getShapeProperty (iShape, "count");
s += eval.getIsosurfaceDataRange (iShape, "\n");
}}var sarea;
var svol;
if (doCalcArea || doCalcVolume) {
sarea = (doCalcArea ? "isosurfaceArea = " + (Clazz.instanceOf (area, Float) ? "" + area : J.util.Escape.eAD (area)) : null);
svol = (doCalcVolume ? "isosurfaceVolume = " + (Clazz.instanceOf (volume, Float) ? "" + volume : J.util.Escape.eAD (volume)) : null);
if (s == null) {
if (doCalcArea) this.showString (sarea);
if (doCalcVolume) this.showString (svol);
} else {
if (doCalcArea) s += "\n" + sarea;
if (doCalcVolume) s += "\n" + svol;
}}if (s != null) this.showString (s);
}if (translucency != null) this.setShapeProperty (iShape, "translucency", translucency);
this.setShapeProperty (iShape, "clear", null);
if (toCache) this.setShapeProperty (iShape, "cache", null);
this.listIsosurface (iShape);
return true;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getAtomicPotentials", 
($fz = function (bsSelected, bsIgnore, fileName) {
var potentials =  Clazz.newFloatArray (this.viewer.getAtomCount (), 0);
var m = J.api.Interface.getOptionInterface ("quantum.MlpCalculation");
m.set (this.viewer);
var data = (fileName == null ? null : this.viewer.getFileAsString (fileName));
m.assignPotentials (this.viewer.modelSet.atoms, potentials, this.viewer.getSmartsMatch ("a", bsSelected), this.viewer.getSmartsMatch ("/noAromatic/[$(C=O),$(O=C),$(NC=O)]", bsSelected), bsIgnore, data);
return potentials;
}, $fz.isPrivate = true, $fz), "JU.BS,JU.BS,~S");
$_M(c$, "lcaoCartoon", 
($fz = function () {
var eval = this.eval;
this.sm.loadShape (26);
if (this.tokAt (1) == 1073742001 && this.listIsosurface (26)) return false;
this.setShapeProperty (26, "init", this.fullCommand);
if (this.slen == 1) {
this.setShapeProperty (26, "lcaoID", null);
return false;
}var idSeen = false;
var translucency = null;
for (var i = 1; i < this.slen; i++) {
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 1074790451:
case 554176565:
propertyName = eval.theToken.value;
if (this.tokAt (i + 1) == 1048588) eval.iToken = i + 1;
propertyValue = this.getCapSlabObject (i, true);
i = eval.iToken;
break;
case 12289:
this.isosurface (26);
return false;
case 528432:
var degx = 0;
var degy = 0;
var degz = 0;
switch (this.getToken (++i).tok) {
case 1112541205:
degx = this.floatParameter (++i) * 0.017453292;
break;
case 1112541206:
degy = this.floatParameter (++i) * 0.017453292;
break;
case 1112541207:
degz = this.floatParameter (++i) * 0.017453292;
break;
default:
this.invArg ();
}
propertyName = "rotationAxis";
propertyValue = JU.V3.new3 (degx, degy, degz);
break;
case 1048589:
case 1610625028:
case 3145768:
propertyName = "on";
break;
case 1048588:
case 12294:
case 3145770:
propertyName = "off";
break;
case 12291:
propertyName = "delete";
break;
case 10:
case 1048577:
propertyName = "select";
propertyValue = this.atomExpressionAt (i);
i = eval.iToken;
break;
case 1766856708:
translucency = this.setColorOptions (null, i + 1, 26, -2);
if (translucency != null) this.setShapeProperty (26, "settranslucency", translucency);
i = eval.iToken;
idSeen = true;
continue;
case 603979967:
case 1073742074:
eval.setMeshDisplayProperty (26, i, eval.theTok);
i = eval.iToken;
idSeen = true;
continue;
case 1113200651:
case 4:
propertyValue = this.parameterAsString (i).toLowerCase ();
if (propertyValue.equals ("spacefill")) propertyValue = "cpk";
propertyName = "create";
if (eval.optParameterAsString (i + 1).equalsIgnoreCase ("molecular")) {
i++;
propertyName = "molecular";
}break;
case 135280132:
if (this.tokAt (i + 1) == 10 || this.tokAt (i + 1) == 1048577) {
propertyName = "select";
propertyValue = this.atomExpressionAt (i + 1);
i = eval.iToken;
} else {
propertyName = "selectType";
propertyValue = this.parameterAsString (++i);
if (propertyValue.equals ("spacefill")) propertyValue = "cpk";
}break;
case 1073742138:
propertyName = "scale";
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
case 1073742004:
case 1073742006:
propertyName = "lonePair";
break;
case 1073742112:
case 1073742111:
propertyName = "radical";
break;
case 1073742029:
propertyName = "molecular";
break;
case 1073741904:
propertyValue = this.parameterAsString (++i);
propertyName = "create";
if (eval.optParameterAsString (i + 1).equalsIgnoreCase ("molecular")) {
i++;
propertyName = "molecular";
}break;
case 1074790550:
propertyValue = eval.getShapeNameParameter (++i);
i = eval.iToken;
if (idSeen) this.invArg ();
propertyName = "lcaoID";
break;
default:
if (eval.theTok == 269484209 || J.script.T.tokAttr (eval.theTok, 1073741824)) {
if (eval.theTok != 269484209) propertyValue = this.parameterAsString (i);
if (idSeen) this.invArg ();
propertyName = "lcaoID";
break;
}break;
}
if (eval.theTok != 12291) idSeen = true;
if (propertyName == null) this.invArg ();
this.setShapeProperty (26, propertyName, propertyValue);
}
this.setShapeProperty (26, "clear", null);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "getCapSlabObject", 
($fz = function (i, isLcaoCartoon) {
if (i < 0) {
return J.util.TempArray.getSlabWithinRange (i, 0);
}var eval = this.eval;
var data = null;
var tok0 = this.tokAt (i);
var isSlab = (tok0 == 554176565);
var tok = this.tokAt (i + 1);
var plane = null;
var pts = null;
var d;
var d2;
var bs = null;
var slabColix = null;
var slabMeshType = null;
if (tok == 603979967) {
var slabTranslucency = (this.isFloatParameter (++i + 1) ? this.floatParameter (++i) : 0.5);
if (eval.isColorParam (i + 1)) {
slabColix = Short.$valueOf (J.util.C.getColixTranslucent3 (J.util.C.getColix (eval.getArgbParam (i + 1)), slabTranslucency != 0, slabTranslucency));
i = eval.iToken;
} else {
slabColix = Short.$valueOf (J.util.C.getColixTranslucent3 (1, slabTranslucency != 0, slabTranslucency));
}switch (tok = this.tokAt (i + 1)) {
case 1073742018:
case 1073741938:
slabMeshType = Integer.$valueOf (tok);
tok = this.tokAt (++i + 1);
break;
default:
slabMeshType = Integer.$valueOf (1073741938);
break;
}
}switch (tok) {
case 10:
case 1048577:
data = this.atomExpressionAt (i + 1);
tok = 3;
eval.iToken++;
break;
case 1048588:
eval.iToken = i + 1;
return Integer.$valueOf (-2147483648);
case 1048587:
eval.iToken = i + 1;
break;
case 1048583:
i++;
data = [Float.$valueOf (1), this.parameterAsString (++i)];
tok = 1073742018;
break;
case 135266325:
i++;
if (this.tokAt (++i) == 1073742114) {
d = this.floatParameter (++i);
d2 = this.floatParameter (++i);
data = [Float.$valueOf (d), Float.$valueOf (d2)];
tok = 1073742114;
} else if (this.isFloatParameter (i)) {
d = this.floatParameter (i);
if (eval.isCenterParameter (++i)) {
var pt = this.centerParameter (i);
if (this.chk || !(Clazz.instanceOf (eval.expressionResult, JU.BS))) {
pts = [pt];
} else {
var atoms = this.viewer.modelSet.atoms;
bs = eval.expressionResult;
pts =  new Array (bs.cardinality ());
for (var k = 0, j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1), k++) pts[k] = atoms[j];

}} else {
pts = eval.getPointArray (i, -1);
}if (pts.length == 0) {
eval.iToken = i;
this.invArg ();
}data = [Float.$valueOf (d), pts, bs];
} else {
data = eval.getPointArray (i, 4);
tok = 1679429641;
}break;
case 1679429641:
eval.iToken = i + 1;
data = J.util.BoxInfo.getCriticalPoints (this.viewer.getBoundBoxVertices (), null);
break;
case 1073741872:
case 1614417948:
eval.iToken = i + 1;
var unitCell = this.viewer.getCurrentUnitCell ();
if (unitCell == null) {
if (tok == 1614417948) this.invArg ();
} else {
pts = J.util.BoxInfo.getCriticalPoints (unitCell.getUnitCellVertices (), unitCell.getCartesianOffset ());
var iType = Clazz.floatToInt (unitCell.getUnitCellInfoType (6));
var v1 = null;
var v2 = null;
switch (iType) {
case 3:
break;
case 1:
v2 = JU.V3.newVsub (pts[2], pts[0]);
v2.scale (1000);
case 2:
v1 = JU.V3.newVsub (pts[1], pts[0]);
v1.scale (1000);
pts[0].sub (v1);
pts[1].scale (2000);
if (iType == 1) {
pts[0].sub (v2);
pts[2].scale (2000);
}break;
}
data = pts;
}break;
default:
if (!isLcaoCartoon && isSlab && this.isFloatParameter (i + 1)) {
d = this.floatParameter (++i);
if (!this.isFloatParameter (i + 1)) return Integer.$valueOf (Clazz.floatToInt (d));
d2 = this.floatParameter (++i);
data = [Float.$valueOf (d), Float.$valueOf (d2)];
tok = 1073742114;
break;
}plane = eval.planeParameter (++i);
var off = (this.isFloatParameter (eval.iToken + 1) ? this.floatParameter (++eval.iToken) : NaN);
if (!Float.isNaN (off)) plane.w -= off;
data = plane;
tok = 135266319;
}
var colorData = (slabMeshType == null ? null : [slabMeshType, slabColix]);
return J.util.TempArray.getSlabObjectType (tok, data, !isSlab, colorData);
}, $fz.isPrivate = true, $fz), "~N,~B");
$_M(c$, "mo", 
($fz = function (isInitOnly) {
var eval = this.eval;
var offset = 2147483647;
var isNegOffset = false;
var bsModels = this.viewer.getVisibleFramesBitSet ();
var propertyList =  new JU.List ();
var i0 = 1;
if (this.tokAt (1) == 1095766030 || this.tokAt (1) == 4115) {
i0 = eval.modelNumberParameter (2);
if (i0 < 0) this.invArg ();
bsModels.clearAll ();
bsModels.set (i0);
i0 = 3;
}for (var iModel = bsModels.nextSetBit (0); iModel >= 0; iModel = bsModels.nextSetBit (iModel + 1)) {
this.sm.loadShape (27);
var i = i0;
if (this.tokAt (i) == 1073742001 && this.listIsosurface (27)) return true;
this.setShapeProperty (27, "init", Integer.$valueOf (iModel));
var title = null;
var moNumber = (this.getShapeProperty (27, "moNumber")).intValue ();
var linearCombination = this.getShapeProperty (27, "moLinearCombination");
if (isInitOnly) return true;
if (moNumber == 0) moNumber = 2147483647;
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 1074790451:
case 554176565:
propertyName = eval.theToken.value;
propertyValue = this.getCapSlabObject (i, false);
i = eval.iToken;
break;
case 1073741914:
propertyName = "squareLinear";
propertyValue = Boolean.TRUE;
linearCombination = [1];
offset = moNumber = 0;
break;
case 2:
moNumber = this.intParameter (i);
linearCombination = this.moCombo (propertyList);
if (linearCombination == null && moNumber < 0) linearCombination = [-100, -moNumber];
break;
case 269484192:
switch (this.tokAt (++i)) {
case 1073741973:
case 1073742008:
break;
default:
this.invArg ();
}
isNegOffset = true;
case 1073741973:
case 1073742008:
if ((offset = this.moOffset (i)) == 2147483647) this.invArg ();
moNumber = 0;
linearCombination = this.moCombo (propertyList);
break;
case 1073742037:
moNumber = 1073742037;
linearCombination = this.moCombo (propertyList);
break;
case 1073742108:
moNumber = 1073742108;
linearCombination = this.moCombo (propertyList);
break;
case 1766856708:
this.setColorOptions (null, i + 1, 27, 2);
break;
case 135266319:
propertyName = "plane";
propertyValue = eval.planeParameter (i + 1);
break;
case 135266320:
this.addShapeProperty (propertyList, "randomSeed", this.tokAt (i + 2) == 2 ? Integer.$valueOf (this.intParameter (i + 2)) : null);
propertyName = "monteCarloCount";
propertyValue = Integer.$valueOf (this.intParameter (i + 1));
break;
case 1073742138:
propertyName = "scale";
propertyValue = Float.$valueOf (this.floatParameter (i + 1));
break;
case 1073741910:
if (this.tokAt (i + 1) == 269484193) {
propertyName = "cutoffPositive";
propertyValue = Float.$valueOf (this.floatParameter (i + 2));
} else {
propertyName = "cutoff";
propertyValue = Float.$valueOf (this.floatParameter (i + 1));
}break;
case 536870916:
propertyName = "debug";
break;
case 1073742054:
propertyName = "plane";
break;
case 1073742104:
case 1073742122:
propertyName = "resolution";
propertyValue = Float.$valueOf (this.floatParameter (i + 1));
break;
case 1073742156:
propertyName = "squareData";
propertyValue = Boolean.TRUE;
break;
case 1073742168:
if (i + 1 < this.slen && this.tokAt (i + 1) == 4) {
propertyName = "titleFormat";
propertyValue = this.parameterAsString (i + 1);
}break;
case 1073741824:
this.invArg ();
break;
default:
if (eval.isArrayParameter (i)) {
linearCombination = eval.floatParameterSet (i, 1, 2147483647);
if (this.tokAt (eval.iToken + 1) == 1073742156) {
this.addShapeProperty (propertyList, "squareLinear", Boolean.TRUE);
eval.iToken++;
}break;
}var ipt = eval.iToken;
if (!eval.setMeshDisplayProperty (27, 0, eval.theTok)) this.invArg ();
this.setShapeProperty (27, "setProperties", propertyList);
eval.setMeshDisplayProperty (27, ipt, this.tokAt (ipt));
return true;
}
if (propertyName != null) this.addShapeProperty (propertyList, propertyName, propertyValue);
if (moNumber != 2147483647 || linearCombination != null) {
if (this.tokAt (eval.iToken + 1) == 4) title = this.parameterAsString (++eval.iToken);
eval.setCursorWait (true);
this.setMoData (propertyList, moNumber, linearCombination, offset, isNegOffset, iModel, title);
this.addShapeProperty (propertyList, "finalize", null);
}if (propertyList.size () > 0) this.setShapeProperty (27, "setProperties", propertyList);
propertyList.clear ();
}
return true;
}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "moCombo", 
($fz = function (propertyList) {
if (this.tokAt (this.eval.iToken + 1) != 1073742156) return null;
this.addShapeProperty (propertyList, "squareLinear", Boolean.TRUE);
this.eval.iToken++;
return  Clazz.newFloatArray (0, 0);
}, $fz.isPrivate = true, $fz), "JU.List");
$_M(c$, "moOffset", 
($fz = function (index) {
var isHomo = (this.getToken (index).tok == 1073741973);
var offset = (isHomo ? 0 : 1);
var tok = this.tokAt (++index);
if (tok == 2 && this.intParameter (index) < 0) offset += this.intParameter (index);
 else if (tok == 269484193) offset += this.intParameter (++index);
 else if (tok == 269484192) offset -= this.intParameter (++index);
return offset;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "setMoData", 
($fz = function (propertyList, moNumber, lc, offset, isNegOffset, modelIndex, title) {
var eval = this.eval;
if (this.chk) return;
if (modelIndex < 0) {
modelIndex = this.viewer.getCurrentModelIndex ();
if (modelIndex < 0) eval.errorStr (30, "MO isosurfaces");
}var moData = this.viewer.getModelAuxiliaryInfoValue (modelIndex, "moData");
var mos = null;
var mo;
var f;
var nOrb = 0;
if (lc == null || lc.length < 2) {
if (lc != null && lc.length == 1) offset = 0;
if (moData == null) this.error (27);
var lastMoNumber = (moData.containsKey ("lastMoNumber") ? (moData.get ("lastMoNumber")).intValue () : 0);
var lastMoCount = (moData.containsKey ("lastMoCount") ? (moData.get ("lastMoCount")).intValue () : 1);
if (moNumber == 1073742108) moNumber = lastMoNumber - 1;
 else if (moNumber == 1073742037) moNumber = lastMoNumber + lastMoCount;
mos = (moData.get ("mos"));
nOrb = (mos == null ? 0 : mos.size ());
if (nOrb == 0) this.error (25);
if (nOrb == 1 && moNumber > 1) this.error (29);
if (offset != 2147483647) {
if (moData.containsKey ("HOMO")) {
moNumber = (moData.get ("HOMO")).intValue () + offset;
} else {
moNumber = -1;
for (var i = 0; i < nOrb; i++) {
mo = mos.get (i);
if ((f = mo.get ("occupancy")) != null) {
if (f.floatValue () < 0.5) {
moNumber = i;
break;
}continue;
} else if ((f = mo.get ("energy")) != null) {
if (f.floatValue () > 0) {
moNumber = i;
break;
}continue;
}break;
}
if (moNumber < 0) this.error (28);
moNumber += offset;
}J.util.Logger.info ("MO " + moNumber);
}if (moNumber < 1 || moNumber > nOrb) eval.errorStr (26, "" + nOrb);
}moNumber = Math.abs (moNumber);
moData.put ("lastMoNumber", Integer.$valueOf (moNumber));
moData.put ("lastMoCount", Integer.$valueOf (1));
if (isNegOffset && lc == null) lc = [-100, moNumber];
if (lc != null && lc.length < 2) {
mo = mos.get (moNumber - 1);
if ((f = mo.get ("energy")) == null) {
lc = [100, moNumber];
} else {
var energy = f.floatValue ();
var bs = JU.BS.newN (nOrb);
var n = 0;
var isAllElectrons = (lc.length == 1 && lc[0] == 1);
for (var i = 0; i < nOrb; i++) {
if ((f = mos.get (i).get ("energy")) == null) continue;
var e = f.floatValue ();
if (isAllElectrons ? e <= energy : e == energy) {
bs.set (i + 1);
n += 2;
}}
lc =  Clazz.newFloatArray (n, 0);
for (var i = 0, pt = 0; i < n; i += 2) {
lc[i] = 1;
lc[i + 1] = (pt = bs.nextSetBit (pt + 1));
}
moData.put ("lastMoNumber", Integer.$valueOf (bs.nextSetBit (0)));
moData.put ("lastMoCount", Integer.$valueOf (Clazz.doubleToInt (n / 2)));
}this.addShapeProperty (propertyList, "squareLinear", Boolean.TRUE);
}this.addShapeProperty (propertyList, "moData", moData);
if (title != null) this.addShapeProperty (propertyList, "title", title);
this.addShapeProperty (propertyList, "molecularOrbital", lc != null ? lc : Integer.$valueOf (Math.abs (moNumber)));
this.addShapeProperty (propertyList, "clear", null);
}, $fz.isPrivate = true, $fz), "JU.List,~N,~A,~N,~B,~N,~S");
$_V(c$, "plot", 
function (args) {
this.st = this.eval.st;
this.chk = this.eval.chk;
var modelIndex = this.viewer.getCurrentModelIndex ();
if (modelIndex < 0) this.eval.errorStr (30, "plot");
modelIndex = this.viewer.getJmolDataSourceFrame (modelIndex);
var pt = args.length - 1;
var isReturnOnly = (args !== this.st);
var statementSave = this.st;
if (isReturnOnly) this.eval.st = this.st = args;
var tokCmd = (isReturnOnly ? 4148 : args[0].tok);
var pt0 = (isReturnOnly || tokCmd == 135270418 || tokCmd == 1052714 ? 0 : 1);
var filename = null;
var makeNewFrame = true;
var isDraw = false;
switch (tokCmd) {
case 4133:
case 135270418:
case 1052714:
break;
case 135176:
makeNewFrame = false;
isDraw = true;
break;
case 4148:
makeNewFrame = false;
break;
case 135270422:
makeNewFrame = false;
if (J.scriptext.ScriptExt.tokAtArray (pt, args) == 4) {
filename = this.stringParameter (pt--);
} else if (J.scriptext.ScriptExt.tokAtArray (pt - 1, args) == 1048584) {
filename = this.parameterAsString (pt - 2) + "." + this.parameterAsString (pt);
pt -= 3;
} else {
this.eval.st = this.st = statementSave;
this.eval.iToken = this.st.length;
this.error (13);
}break;
}
var qFrame = "";
var parameters = null;
var stateScript = "";
var isQuaternion = false;
var isDerivative = false;
var isSecondDerivative = false;
var isRamachandranRelative = false;
var propertyX = 0;
var propertyY = 0;
var propertyZ = 0;
var bs = J.util.BSUtil.copy (this.viewer.getSelectionSet (false));
var preSelected = "; select " + J.util.Escape.eBS (bs) + ";\n ";
var type = this.eval.optParameterAsString (pt).toLowerCase ();
var minXYZ = null;
var maxXYZ = null;
var tok = J.scriptext.ScriptExt.tokAtArray (pt0, args);
if (tok == 4) tok = J.script.T.getTokFromName (args[pt0].value);
switch (tok) {
default:
this.eval.iToken = 1;
this.invArg ();
break;
case 135270407:
this.eval.iToken = 1;
type = "data";
preSelected = "";
break;
case 1716520985:
this.eval.iToken = pt0 + 1;
if (!J.script.T.tokAttr (propertyX = this.tokAt (this.eval.iToken++), 1078984704) || !J.script.T.tokAttr (propertyY = this.tokAt (this.eval.iToken++), 1078984704)) this.invArg ();
if (J.script.T.tokAttr (propertyZ = this.tokAt (this.eval.iToken), 1078984704)) this.eval.iToken++;
 else propertyZ = 0;
if (this.tokAt (this.eval.iToken) == 32) {
minXYZ = this.getPoint3f (++this.eval.iToken, false);
this.eval.iToken++;
}if (this.tokAt (this.eval.iToken) == 64) {
maxXYZ = this.getPoint3f (++this.eval.iToken, false);
this.eval.iToken++;
}type = "property " + J.script.T.nameOf (propertyX) + " " + J.script.T.nameOf (propertyY) + (propertyZ == 0 ? "" : " " + J.script.T.nameOf (propertyZ));
if (bs.nextSetBit (0) < 0) bs = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
stateScript = "select " + J.util.Escape.eBS (bs) + ";\n ";
break;
case 1052714:
if (type.equalsIgnoreCase ("draw")) {
isDraw = true;
type = this.eval.optParameterAsString (--pt).toLowerCase ();
}isRamachandranRelative = (pt > pt0 && type.startsWith ("r"));
type = "ramachandran" + (isRamachandranRelative ? " r" : "") + (tokCmd == 135176 ? " draw" : "");
break;
case 135270418:
case 137363468:
qFrame = " \"" + this.viewer.getQuaternionFrame () + "\"";
stateScript = "set quaternionFrame" + qFrame + ";\n  ";
isQuaternion = true;
if (type.equalsIgnoreCase ("draw")) {
isDraw = true;
type = this.eval.optParameterAsString (--pt).toLowerCase ();
}isDerivative = (type.startsWith ("deriv") || type.startsWith ("diff"));
isSecondDerivative = (isDerivative && type.indexOf ("2") > 0);
if (isDerivative) pt--;
if (type.equalsIgnoreCase ("helix") || type.equalsIgnoreCase ("axis")) {
isDraw = true;
isDerivative = true;
pt = -1;
}type = ((pt <= pt0 ? "" : this.eval.optParameterAsString (pt)) + "w").substring (0, 1);
if (type.equals ("a") || type.equals ("r")) isDerivative = true;
if (!JU.PT.isOneOf (type, ";w;x;y;z;r;a;")) this.eval.evalError ("QUATERNION [w,x,y,z,a,r] [difference][2]", null);
type = "quaternion " + type + (isDerivative ? " difference" : "") + (isSecondDerivative ? "2" : "") + (isDraw ? " draw" : "");
break;
}
this.st = statementSave;
if (this.chk) return "";
if (makeNewFrame) {
stateScript += "plot " + type;
var ptDataFrame = this.viewer.getJmolDataFrameIndex (modelIndex, stateScript);
if (ptDataFrame > 0 && tokCmd != 135270422 && tokCmd != 4148) {
this.viewer.setCurrentModelIndexClear (ptDataFrame, true);
return "";
}}var dataX = null;
var dataY = null;
var dataZ = null;
var factors = JU.P3.new3 (1, 1, 1);
if (tok == 1716520985) {
dataX = this.eval.getBitsetPropertyFloat (bs, propertyX | 224, (minXYZ == null ? NaN : minXYZ.x), (maxXYZ == null ? NaN : maxXYZ.x));
dataY = this.eval.getBitsetPropertyFloat (bs, propertyY | 224, (minXYZ == null ? NaN : minXYZ.y), (maxXYZ == null ? NaN : maxXYZ.y));
if (propertyZ != 0) dataZ = this.eval.getBitsetPropertyFloat (bs, propertyZ | 224, (minXYZ == null ? NaN : minXYZ.z), (maxXYZ == null ? NaN : maxXYZ.z));
if (minXYZ == null) minXYZ = JU.P3.new3 (this.getPlotMinMax (dataX, false, propertyX), this.getPlotMinMax (dataY, false, propertyY), this.getPlotMinMax (dataZ, false, propertyZ));
if (maxXYZ == null) maxXYZ = JU.P3.new3 (this.getPlotMinMax (dataX, true, propertyX), this.getPlotMinMax (dataY, true, propertyY), this.getPlotMinMax (dataZ, true, propertyZ));
J.util.Logger.info ("plot min/max: " + minXYZ + " " + maxXYZ);
var center =  new JU.P3 ();
center.ave (maxXYZ, minXYZ);
factors.sub2 (maxXYZ, minXYZ);
factors.set (factors.x / 200, factors.y / 200, factors.z / 200);
if (J.script.T.tokAttr (propertyX, 1095761920)) {
factors.x = 1;
center.x = 0;
} else if (factors.x > 0.1 && factors.x <= 10) {
factors.x = 1;
}if (J.script.T.tokAttr (propertyY, 1095761920)) {
factors.y = 1;
center.y = 0;
} else if (factors.y > 0.1 && factors.y <= 10) {
factors.y = 1;
}if (J.script.T.tokAttr (propertyZ, 1095761920)) {
factors.z = 1;
center.z = 0;
} else if (factors.z > 0.1 && factors.z <= 10) {
factors.z = 1;
}if (propertyZ == 0) center.z = minXYZ.z = maxXYZ.z = factors.z = 0;
for (var i = 0; i < dataX.length; i++) dataX[i] = (dataX[i] - center.x) / factors.x;

for (var i = 0; i < dataY.length; i++) dataY[i] = (dataY[i] - center.y) / factors.y;

if (propertyZ != 0) for (var i = 0; i < dataZ.length; i++) dataZ[i] = (dataZ[i] - center.z) / factors.z;

parameters = [bs, dataX, dataY, dataZ, minXYZ, maxXYZ, factors, center];
}if (tokCmd == 135270422) return this.viewer.writeFileData (filename, "PLOT_" + type, modelIndex, parameters);
var data = (type.equals ("data") ? "1 0 H 0 0 0 # Jmol PDB-encoded data" : this.viewer.getPdbData (modelIndex, type, parameters));
if (tokCmd == 4148) return data;
if (J.util.Logger.debugging) J.util.Logger.debug (data);
if (tokCmd == 135176) {
this.eval.runScript (data);
return "";
}var savedFileInfo = this.viewer.getFileInfo ();
var oldAppendNew = this.viewer.getBoolean (603979792);
this.viewer.setAppendNew (true);
var isOK = (data != null && this.viewer.openStringInlineParamsAppend (data, null, true) == null);
this.viewer.setAppendNew (oldAppendNew);
this.viewer.setFileInfo (savedFileInfo);
if (!isOK) return "";
var modelCount = this.viewer.getModelCount ();
this.viewer.setJmolDataFrame (stateScript, modelIndex, modelCount - 1);
if (tok != 1716520985) stateScript += ";\n" + preSelected;
var ss = this.viewer.addStateScript (stateScript, true, false);
var radius = 150;
var script;
switch (tok) {
default:
script = "frame 0.0; frame last; reset;select visible;wireframe only;";
radius = 10;
break;
case 1716520985:
this.viewer.setFrameTitle (modelCount - 1, type + " plot for model " + this.viewer.getModelNumberDotted (modelIndex));
var f = 3;
script = "frame 0.0; frame last; reset;select visible; spacefill " + f + "; wireframe 0;" + "draw plotAxisX" + modelCount + " {100 -100 -100} {-100 -100 -100} \"" + J.script.T.nameOf (propertyX) + "\";" + "draw plotAxisY" + modelCount + " {-100 100 -100} {-100 -100 -100} \"" + J.script.T.nameOf (propertyY) + "\";";
if (propertyZ != 0) script += "draw plotAxisZ" + modelCount + " {-100 -100 100} {-100 -100 -100} \"" + J.script.T.nameOf (propertyZ) + "\";";
break;
case 1052714:
this.viewer.setFrameTitle (modelCount - 1, "ramachandran plot for model " + this.viewer.getModelNumberDotted (modelIndex));
script = "frame 0.0; frame last; reset;select visible; color structure; spacefill 3.0; wireframe 0;draw ramaAxisX" + modelCount + " {100 0 0} {-100 0 0} \"phi\";" + "draw ramaAxisY" + modelCount + " {0 100 0} {0 -100 0} \"psi\";";
break;
case 135270418:
case 137363468:
this.viewer.setFrameTitle (modelCount - 1, type.$replace ('w', ' ') + qFrame + " for model " + this.viewer.getModelNumberDotted (modelIndex));
var color = (J.util.C.getHexCode (this.viewer.getColixBackgroundContrast ()));
script = "frame 0.0; frame last; reset;select visible; wireframe 0; spacefill 3.0; isosurface quatSphere" + modelCount + " color " + color + " sphere 100.0 mesh nofill frontonly translucent 0.8;" + "draw quatAxis" + modelCount + "X {100 0 0} {-100 0 0} color red \"x\";" + "draw quatAxis" + modelCount + "Y {0 100 0} {0 -100 0} color green \"y\";" + "draw quatAxis" + modelCount + "Z {0 0 100} {0 0 -100} color blue \"z\";" + "color structure;" + "draw quatCenter" + modelCount + "{0 0 0} scale 0.02;";
break;
}
this.eval.runScript (script + preSelected);
ss.setModelIndex (this.viewer.getCurrentModelIndex ());
this.viewer.setRotationRadius (radius, true);
this.sm.loadShape (30);
this.showString ("frame " + this.viewer.getModelNumberDotted (modelCount - 1) + (type.length > 0 ? " created: " + type + (isQuaternion ? qFrame : "") : ""));
return "";
}, "~A");
$_M(c$, "getPlotMinMax", 
($fz = function (data, isMax, tok) {
if (data == null) return 0;
switch (tok) {
case 1112539144:
case 1112539145:
case 1112539146:
return (isMax ? 180 : -180);
case 1112539141:
case 1112539152:
return (isMax ? 360 : 0);
case 1112539150:
return (isMax ? 1 : -1);
}
var fmax = (isMax ? -1.0E10 : 1E10);
for (var i = data.length; --i >= 0; ) {
var f = data[i];
if (Float.isNaN (f)) continue;
if (isMax == (f > fmax)) fmax = f;
}
return fmax;
}, $fz.isPrivate = true, $fz), "~A,~B,~N");
$_M(c$, "polyhedra", 
($fz = function () {
var eval = this.eval;
var needsGenerating = false;
var onOffDelete = false;
var typeSeen = false;
var edgeParameterSeen = false;
var isDesignParameter = false;
var lighting = 0;
var nAtomSets = 0;
this.sm.loadShape (21);
this.setShapeProperty (21, "init", Boolean.TRUE);
var setPropertyName = "centers";
var decimalPropertyName = "radius_";
var translucentLevel = 3.4028235E38;
eval.colorArgb[0] = -2147483648;
for (var i = 1; i < this.slen; ++i) {
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 12291:
case 1048589:
case 1048588:
if (i + 1 != this.slen || needsGenerating || nAtomSets > 1 || nAtomSets == 0 && "to".equals (setPropertyName)) this.error (18);
propertyName = (eval.theTok == 1048588 ? "off" : eval.theTok == 1048589 ? "on" : "delete");
onOffDelete = true;
break;
case 269484436:
case 269484080:
continue;
case 1678770178:
if (nAtomSets > 0) this.invPO ();
needsGenerating = true;
propertyName = "bonds";
break;
case 1666189314:
decimalPropertyName = "radius";
continue;
case 2:
case 3:
if (nAtomSets > 0 && !isDesignParameter) this.invPO ();
if (eval.theTok == 2) {
if (decimalPropertyName === "radius_") {
propertyName = "nVertices";
propertyValue = Integer.$valueOf (this.intParameter (i));
needsGenerating = true;
break;
}}propertyName = (decimalPropertyName === "radius_" ? "radius" : decimalPropertyName);
propertyValue = Float.$valueOf (this.floatParameter (i));
decimalPropertyName = "radius_";
isDesignParameter = false;
needsGenerating = true;
break;
case 10:
case 1048577:
if (typeSeen) this.invPO ();
if (++nAtomSets > 2) this.error (2);
if ("to".equals (setPropertyName)) needsGenerating = true;
propertyName = setPropertyName;
setPropertyName = "to";
propertyValue = this.atomExpressionAt (i);
i = eval.iToken;
break;
case 1074790746:
if (nAtomSets > 1) this.invPO ();
if (this.tokAt (i + 1) == 10 || this.tokAt (i + 1) == 1048577 && !needsGenerating) {
propertyName = "toBitSet";
propertyValue = this.atomExpressionAt (++i);
i = eval.iToken;
needsGenerating = true;
break;
} else if (!needsGenerating) {
this.error (19);
}setPropertyName = "to";
continue;
case 1073741937:
if (!needsGenerating) this.error (19);
decimalPropertyName = "faceCenterOffset";
isDesignParameter = true;
continue;
case 1073741924:
if (nAtomSets == 0) this.error (19);
decimalPropertyName = "distanceFactor";
isDesignParameter = true;
continue;
case 1766856708:
case 603979967:
case 1073742074:
translucentLevel = eval.getColorTrans (i, true);
i = eval.iToken;
continue;
case 1073741886:
case 1073741948:
propertyName = "collapsed";
propertyValue = (eval.theTok == 1073741886 ? Boolean.TRUE : Boolean.FALSE);
if (typeSeen) this.error (18);
typeSeen = true;
break;
case 1073742044:
case 1073741933:
case 1073741956:
if (edgeParameterSeen) this.error (18);
propertyName = this.parameterAsString (i);
edgeParameterSeen = true;
break;
case 1073741964:
lighting = eval.theTok;
continue;
default:
if (eval.isColorParam (i)) {
eval.colorArgb[0] = eval.getArgbParam (i);
i = eval.iToken;
continue;
}this.invArg ();
}
this.setShapeProperty (21, propertyName, propertyValue);
if (onOffDelete) return false;
}
if (!needsGenerating && !typeSeen && !edgeParameterSeen && lighting == 0) this.error (19);
if (needsGenerating) this.setShapeProperty (21, "generate", null);
if (eval.colorArgb[0] != -2147483648) this.setShapeProperty (21, "colorThis", Integer.$valueOf (eval.colorArgb[0]));
if (translucentLevel != 3.4028235E38) eval.setShapeTranslucency (21, "", "translucentThis", translucentLevel, null);
if (lighting != 0) this.setShapeProperty (21, "token", Integer.$valueOf (lighting));
this.setShapeProperty (21, "init", Boolean.FALSE);
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "struts", 
($fz = function () {
var eval = this.eval;
var defOn = (this.tokAt (1) == 1073742072 || this.tokAt (1) == 1048589 || this.slen == 1);
var mad = eval.getMadParameter ();
if (defOn) mad = Math.round (this.viewer.getFloat (570425406) * 2000);
this.setShapeProperty (1, "type", Integer.$valueOf (32768));
eval.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "initIsosurface", 
($fz = function (iShape) {
var eval = this.eval;
this.setShapeProperty (iShape, "init", this.fullCommand);
eval.iToken = 0;
var tok1 = this.tokAt (1);
var tok2 = this.tokAt (2);
if (tok1 == 12291 || tok2 == 12291 && this.tokAt (++eval.iToken) == 1048579) {
this.setShapeProperty (iShape, "delete", null);
eval.iToken += 2;
if (this.slen > eval.iToken) {
this.setShapeProperty (iShape, "init", this.fullCommand);
this.setShapeProperty (iShape, "thisID", "+PREVIOUS_MESH+");
}return null;
}eval.iToken = 1;
if (!eval.setMeshDisplayProperty (iShape, 0, tok1)) {
this.setShapeProperty (iShape, "thisID", "+PREVIOUS_MESH+");
if (iShape != 22) this.setShapeProperty (iShape, "title", [this.thisCommand]);
if (tok1 != 1074790550 && (tok2 == 269484209 || tok1 == 269484209 && eval.setMeshDisplayProperty (iShape, 0, tok2))) {
var id = this.setShapeId (iShape, 1, false);
eval.iToken++;
return id;
}}return null;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getWithinDistanceVector", 
($fz = function (propertyList, distance, ptc, bs, isShow) {
var v =  new JU.List ();
var pts =  new Array (2);
if (bs == null) {
var pt1 = JU.P3.new3 (distance, distance, distance);
var pt0 = JU.P3.newP (ptc);
pt0.sub (pt1);
pt1.add (ptc);
pts[0] = pt0;
pts[1] = pt1;
v.addLast (ptc);
} else {
var bbox = this.viewer.getBoxInfo (bs, -Math.abs (distance));
pts[0] = bbox.getBoundBoxVertices ()[0];
pts[1] = bbox.getBoundBoxVertices ()[7];
if (bs.cardinality () == 1) v.addLast (this.viewer.getAtomPoint3f (bs.nextSetBit (0)));
}if (v.size () == 1 && !isShow) {
this.addShapeProperty (propertyList, "withinDistance", Float.$valueOf (distance));
this.addShapeProperty (propertyList, "withinPoint", v.get (0));
}this.addShapeProperty (propertyList, (isShow ? "displayWithin" : "withinPoints"), [Float.$valueOf (distance), pts, bs, v]);
}, $fz.isPrivate = true, $fz), "JU.List,~N,JU.P3,JU.BS,~B");
$_M(c$, "setColorOptions", 
($fz = function (sb, index, iShape, nAllowed) {
var eval = this.eval;
this.getToken (index);
var translucency = "opaque";
if (eval.theTok == 603979967) {
translucency = "translucent";
if (nAllowed < 0) {
var value = (this.isFloatParameter (index + 1) ? this.floatParameter (++index) : 3.4028235E38);
eval.setShapeTranslucency (iShape, null, "translucent", value, null);
if (sb != null) {
sb.append (" translucent");
if (value != 3.4028235E38) sb.append (" ").appendF (value);
}} else {
eval.setMeshDisplayProperty (iShape, index, eval.theTok);
}} else if (eval.theTok == 1073742074) {
if (nAllowed >= 0) eval.setMeshDisplayProperty (iShape, index, eval.theTok);
} else {
eval.iToken--;
}nAllowed = Math.abs (nAllowed);
for (var i = 0; i < nAllowed; i++) {
if (eval.isColorParam (eval.iToken + 1)) {
var color = eval.getArgbParam (++eval.iToken);
this.setShapeProperty (iShape, "colorRGB", Integer.$valueOf (color));
if (sb != null) sb.append (" ").append (J.util.Escape.escapeColor (color));
} else if (eval.iToken < index) {
this.invArg ();
} else {
break;
}}
return translucency;
}, $fz.isPrivate = true, $fz), "JU.SB,~N,~N,~N");
$_M(c$, "addShapeProperty", 
($fz = function (propertyList, key, value) {
if (this.chk) return;
propertyList.addLast ([key, value]);
}, $fz.isPrivate = true, $fz), "JU.List,~S,~O");
$_M(c$, "createFunction", 
($fz = function (fname, xyz, ret) {
var e = ( new J.script.ScriptEvaluator ());
e.setViewer (this.viewer);
try {
e.compileScript (null, "function " + fname + "(" + xyz + ") { return " + ret + "}", false);
var params =  new JU.List ();
for (var i = 0; i < xyz.length; i += 2) params.addLast (J.script.SV.newV (3, Float.$valueOf (0)).setName (xyz.substring (i, i + 1)));

return [e.aatoken[0][1].value, params];
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
return null;
} else {
throw ex;
}
}
}, $fz.isPrivate = true, $fz), "~S,~S,~S");
$_M(c$, "floatArraySet", 
($fz = function (i, nX, nY) {
var tok = this.tokAt (i++);
if (tok == 1073742195) tok = this.tokAt (i++);
if (tok != 269484096) this.invArg ();
var fparams = JU.AU.newFloat2 (nX);
var n = 0;
while (tok != 269484097) {
tok = this.getToken (i).tok;
switch (tok) {
case 1073742195:
case 269484097:
continue;
case 269484080:
i++;
break;
case 269484096:
i++;
var f =  Clazz.newFloatArray (nY, 0);
fparams[n++] = f;
for (var j = 0; j < nY; j++) {
f[j] = this.floatParameter (i++);
if (this.tokAt (i) == 269484080) i++;
}
if (this.tokAt (i++) != 269484097) this.invArg ();
tok = 0;
if (n == nX && this.tokAt (i) != 269484097) this.invArg ();
break;
default:
this.invArg ();
}
}
return fparams;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
$_M(c$, "floatArraySetXYZ", 
($fz = function (i, nX, nY, nZ) {
var eval = this.eval;
var tok = this.tokAt (i++);
if (tok == 1073742195) tok = this.tokAt (i++);
if (tok != 269484096 || nX <= 0) this.invArg ();
var fparams = JU.AU.newFloat3 (nX, -1);
var n = 0;
while (tok != 269484097) {
tok = this.getToken (i).tok;
switch (tok) {
case 1073742195:
case 269484097:
continue;
case 269484080:
i++;
break;
case 269484096:
fparams[n++] = this.floatArraySet (i, nY, nZ);
i = ++eval.iToken;
tok = 0;
if (n == nX && this.tokAt (i) != 269484097) this.invArg ();
break;
default:
this.invArg ();
}
}
return fparams;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
$_M(c$, "listIsosurface", 
($fz = function (iShape) {
var s = (this.slen > 3 ? "0" : this.tokAt (2) == 0 ? "" : " " + this.getToken (2).value);
if (!this.chk) this.showString (this.getShapeProperty (iShape, "list" + s));
return true;
}, $fz.isPrivate = true, $fz), "~N");
$_V(c$, "getBitsetIdent", 
function (bs, label, tokenValue, useAtomMap, index, isExplicitlyAll) {
var isAtoms = !(Clazz.instanceOf (tokenValue, J.modelset.BondSet));
if (isAtoms) {
if (label == null) label = this.viewer.getStandardLabelFormat (0);
 else if (label.length == 0) label = "%[label]";
}var pt = (label == null ? -1 : label.indexOf ("%"));
var haveIndex = (index != 2147483647);
if (bs == null || this.chk || isAtoms && pt < 0) {
if (label == null) label = "";
return isExplicitlyAll ? [label] : label;
}var modelSet = this.viewer.modelSet;
var n = 0;
var labeler = modelSet.getLabeler ();
var indices = (isAtoms || !useAtomMap ? null : (tokenValue).getAssociatedAtoms ());
if (indices == null && label != null && label.indexOf ("%D") > 0) indices = this.viewer.getAtomIndices (bs);
var asIdentity = (label == null || label.length == 0);
var htValues = (isAtoms || asIdentity ? null : J.modelset.LabelToken.getBondLabelValues ());
var tokens = (asIdentity ? null : isAtoms ? labeler.compile (this.viewer, label, '\0', null) : labeler.compile (this.viewer, label, '\1', htValues));
var nmax = (haveIndex ? 1 : J.util.BSUtil.cardinalityOf (bs));
var sout =  new Array (nmax);
for (var j = (haveIndex ? index : bs.nextSetBit (0)); j >= 0; j = bs.nextSetBit (j + 1)) {
var str;
if (isAtoms) {
if (asIdentity) str = modelSet.atoms[j].getInfo ();
 else str = labeler.formatLabelAtomArray (this.viewer, modelSet.atoms[j], tokens, '\0', indices);
} else {
var bond = modelSet.getBondAt (j);
if (asIdentity) str = bond.getIdentity ();
 else str = labeler.formatLabelBond (this.viewer, bond, tokens, htValues, indices);
}str = J.util.Txt.formatStringI (str, "#", (n + 1));
sout[n++] = str;
if (haveIndex) break;
}
return nmax == 1 && !isExplicitlyAll ? sout[0] : sout;
}, "JU.BS,~S,~O,~B,~N,~B");
$_M(c$, "data", 
function () {
var eval = this.eval;
var dataString = null;
var dataLabel = null;
var isOneValue = false;
var i;
switch (eval.iToken = this.slen) {
case 5:
dataString = this.parameterAsString (2);
case 4:
case 2:
dataLabel = this.parameterAsString (1);
if (dataLabel.equalsIgnoreCase ("clear")) {
if (!this.chk) this.viewer.setData (null, null, 0, 0, 0, 0, 0);
return;
}if ((i = dataLabel.indexOf ("@")) >= 0) {
dataString = "" + eval.getParameter (dataLabel.substring (i + 1), 4);
dataLabel = dataLabel.substring (0, i).trim ();
} else if (dataString == null && (i = dataLabel.indexOf (" ")) >= 0) {
dataString = dataLabel.substring (i + 1).trim ();
dataLabel = dataLabel.substring (0, i).trim ();
isOneValue = true;
}break;
default:
this.error (2);
}
var dataType = dataLabel + " ";
dataType = dataType.substring (0, dataType.indexOf (" ")).toLowerCase ();
if (dataType.equals ("model") || dataType.equals ("append")) {
eval.load ();
return;
}if (this.chk) return;
var isDefault = (dataLabel.toLowerCase ().indexOf ("(default)") >= 0);
if (dataType.equals ("connect_atoms")) {
this.viewer.connect (J.util.Parser.parseFloatArray2d (dataString));
return;
}if (dataType.indexOf ("ligand_") == 0) {
this.viewer.setLigandModel (dataLabel.substring (7).toUpperCase () + "_data", dataString.trim ());
return;
}if (dataType.indexOf ("file_") == 0) {
this.viewer.setLigandModel (dataLabel.substring (5).toUpperCase () + "_file", dataString.trim ());
return;
}this.$data =  new Array (4);
if (dataType.equals ("element_vdw")) {
this.$data[0] = dataType;
this.$data[1] = dataString.$replace (';', '\n');
var n = J.util.Elements.elementNumberMax;
var eArray =  Clazz.newIntArray (n + 1, 0);
for (var ie = 1; ie <= n; ie++) eArray[ie] = ie;

this.$data[2] = eArray;
this.$data[3] = Integer.$valueOf (0);
this.viewer.setData ("element_vdw", this.$data, n, 0, 0, 0, 0);
return;
}if (dataType.indexOf ("data2d_") == 0) {
this.$data[0] = dataLabel;
this.$data[1] = J.util.Parser.parseFloatArray2d (dataString);
this.$data[3] = Integer.$valueOf (2);
this.viewer.setData (dataLabel, this.$data, 0, 0, 0, 0, 0);
return;
}if (dataType.indexOf ("data3d_") == 0) {
this.$data[0] = dataLabel;
this.$data[1] = J.util.Parser.parseFloatArray3d (dataString);
this.$data[3] = Integer.$valueOf (3);
this.viewer.setData (dataLabel, this.$data, 0, 0, 0, 0, 0);
return;
}var tokens = JU.PT.getTokens (dataLabel);
if (dataType.indexOf ("property_") == 0 && !(tokens.length == 2 && tokens[1].equals ("set"))) {
var bs = this.viewer.getSelectionSet (false);
this.$data[0] = dataType;
var atomNumberField = (isOneValue ? 0 : (this.viewer.getParameter ("propertyAtomNumberField")).intValue ());
var atomNumberFieldColumnCount = (isOneValue ? 0 : (this.viewer.getParameter ("propertyAtomNumberColumnCount")).intValue ());
var propertyField = (isOneValue ? -2147483648 : (this.viewer.getParameter ("propertyDataField")).intValue ());
var propertyFieldColumnCount = (isOneValue ? 0 : (this.viewer.getParameter ("propertyDataColumnCount")).intValue ());
if (!isOneValue && dataLabel.indexOf (" ") >= 0) {
if (tokens.length == 3) {
dataLabel = tokens[0];
atomNumberField = JU.PT.parseInt (tokens[1]);
propertyField = JU.PT.parseInt (tokens[2]);
}if (tokens.length == 5) {
dataLabel = tokens[0];
atomNumberField = JU.PT.parseInt (tokens[1]);
atomNumberFieldColumnCount = JU.PT.parseInt (tokens[2]);
propertyField = JU.PT.parseInt (tokens[3]);
propertyFieldColumnCount = JU.PT.parseInt (tokens[4]);
}}if (atomNumberField < 0) atomNumberField = 0;
if (propertyField < 0) propertyField = 0;
var atomCount = this.viewer.getAtomCount ();
var atomMap = null;
var bsTemp = J.util.BSUtil.newBitSet (atomCount);
if (atomNumberField > 0) {
atomMap =  Clazz.newIntArray (atomCount + 2, 0);
for (var j = 0; j <= atomCount; j++) atomMap[j] = -1;

for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
var atomNo = this.viewer.getAtomNumber (j);
if (atomNo > atomCount + 1 || atomNo < 0 || bsTemp.get (atomNo)) continue;
bsTemp.set (atomNo);
atomMap[atomNo] = j;
}
this.$data[2] = atomMap;
} else {
this.$data[2] = J.util.BSUtil.copy (bs);
}this.$data[1] = dataString;
this.$data[3] = Integer.$valueOf (0);
this.viewer.setData (dataType, this.$data, atomCount, atomNumberField, atomNumberFieldColumnCount, propertyField, propertyFieldColumnCount);
return;
}var userType = J.modelset.AtomCollection.getUserSettableType (dataType);
if (userType >= 0) {
this.viewer.setAtomData (userType, dataType, dataString, isDefault);
return;
}this.$data[0] = dataLabel;
this.$data[1] = dataString;
this.$data[3] = Integer.$valueOf (0);
this.viewer.setData (dataType, this.$data, 0, 0, 0, 0, 0);
});
$_M(c$, "navigate", 
function () {
var eval = this.eval;
if (this.slen == 1) {
eval.setBooleanProperty ("navigationMode", true);
return;
}var rotAxis = JU.V3.new3 (0, 1, 0);
var list =  new JU.List ();
var pt;
if (this.slen == 2) {
switch (this.getToken (1).tok) {
case 1048589:
case 1048588:
if (this.chk) return;
eval.setObjectMad (31, "axes", 1);
this.setShapeProperty (31, "position", JU.P3.new3 (50, 50, 3.4028235E38));
eval.setBooleanProperty ("navigationMode", true);
this.viewer.setNavOn (eval.theTok == 1048589);
return;
case 1073742162:
if (!this.chk) this.viewer.setNavXYZ (0, 0, 0);
return;
case 8:
case 1113200654:
break;
default:
this.invArg ();
}
}if (!this.chk && !this.viewer.getBoolean (603979887)) eval.setBooleanProperty ("navigationMode", true);
for (var i = 1; i < this.slen; i++) {
var timeSec = (this.isFloatParameter (i) ? this.floatParameter (i++) : 2);
if (timeSec < 0) this.invArg ();
if (!this.chk && timeSec > 0) eval.refresh ();
switch (this.getToken (i).tok) {
case 8:
case 1048586:
pt = this.getPoint3f (i, true);
eval.iToken++;
if (eval.iToken != this.slen) this.invArg ();
if (!this.chk) this.viewer.setNavXYZ (pt.x, pt.y, pt.z);
return;
case 554176526:
var depth = this.floatParameter (++i);
if (!this.chk) list.addLast ([Integer.$valueOf (554176526), Float.$valueOf (timeSec), Float.$valueOf (depth)]);
continue;
case 12289:
pt = this.centerParameter (++i);
i = eval.iToken;
if (!this.chk) list.addLast ([Integer.$valueOf (135266320), Float.$valueOf (timeSec), pt]);
continue;
case 528432:
switch (this.getToken (++i).tok) {
case 1112541205:
rotAxis.set (1, 0, 0);
i++;
break;
case 1112541206:
rotAxis.set (0, 1, 0);
i++;
break;
case 1112541207:
rotAxis.set (0, 0, 1);
i++;
break;
case 8:
case 1048586:
rotAxis.setT (this.getPoint3f (i, true));
i = eval.iToken + 1;
break;
case 1073741824:
this.invArg ();
break;
}
var degrees = this.floatParameter (i);
if (!this.chk) list.addLast ([Integer.$valueOf (528432), Float.$valueOf (timeSec), rotAxis, Float.$valueOf (degrees)]);
continue;
case 4160:
var x = NaN;
var y = NaN;
if (this.isFloatParameter (++i)) {
x = this.floatParameter (i);
y = this.floatParameter (++i);
} else {
switch (this.tokAt (i)) {
case 1112541205:
x = this.floatParameter (++i);
break;
case 1112541206:
y = this.floatParameter (++i);
break;
default:
pt = this.centerParameter (i);
i = eval.iToken;
if (!this.chk) list.addLast ([Integer.$valueOf (4160), Float.$valueOf (timeSec), pt]);
continue;
}
}if (!this.chk) list.addLast ([Integer.$valueOf (269484210), Float.$valueOf (timeSec), Float.$valueOf (x), Float.$valueOf (y)]);
continue;
case 269484208:
continue;
case 1113200654:
var pathGuide;
var vp =  new JU.List ();
var bs;
if (this.tokAt (i + 1) == 10 || this.tokAt (i + 1) == 1048577) {
bs = this.atomExpressionAt (++i);
i = eval.iToken;
} else {
bs = this.viewer.getSelectionSet (false);
}if (this.chk) return;
this.viewer.getPolymerPointsAndVectors (bs, vp);
var n;
if ((n = vp.size ()) > 0) {
pathGuide =  new Array (n);
for (var j = 0; j < n; j++) {
pathGuide[j] = vp.get (j);
}
list.addLast ([Integer.$valueOf (1113200654), Float.$valueOf (timeSec), pathGuide]);
continue;
}break;
case 1073742084:
var path;
var theta = null;
if (this.getToken (i + 1).tok == 1048583) {
i++;
var pathID = eval.objectNameParameter (++i);
if (this.chk) return;
this.setShapeProperty (22, "thisID", pathID);
path = this.getShapeProperty (22, "vertices");
eval.refresh ();
if (path == null) this.invArg ();
var indexStart = Clazz.floatToInt (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 0);
var indexEnd = Clazz.floatToInt (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 2147483647);
list.addLast ([Integer.$valueOf (1073742084), Float.$valueOf (timeSec), path, theta, [indexStart, indexEnd]]);
continue;
}var v =  new JU.List ();
while (eval.isCenterParameter (i + 1)) {
v.addLast (this.centerParameter (++i));
i = eval.iToken;
}
if (v.size () > 0) {
path = v.toArray ( new Array (v.size ()));
if (!this.chk) list.addLast ([Integer.$valueOf (1073742084), Float.$valueOf (timeSec), path, theta, [0, 2147483647]]);
continue;
}default:
this.invArg ();
}
}
if (!this.chk) this.viewer.navigateList (eval, list);
});
$_V(c$, "evaluateParallel", 
function (context, shapeManager) {
var e =  new J.script.ScriptEvaluator ();
e.setViewer (this.viewer);
e.historyDisabled = true;
e.compiler =  new J.script.ScriptCompiler (this.viewer);
e.sm = shapeManager;
try {
e.restoreScriptContext (context, true, false, false);
e.allowJSThreads = false;
e.dispatchCommands (false, false);
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
this.eval.viewer.setStringProperty ("_errormessage", "" + ex);
if (e.thisContext == null) {
J.util.Logger.error ("Error evaluating context " + ex);
if (!this.viewer.isJS) ex.printStackTrace ();
}return false;
} else {
throw ex;
}
}
return true;
}, "J.script.ScriptContext,J.viewer.ShapeManager");
$_V(c$, "write", 
function (args) {
var pt = 0;
var pt0 = 0;
var isCommand;
var isShow;
if (args == null) {
args = this.st;
pt = pt0 = 1;
isCommand = true;
isShow = (this.viewer.isApplet () && !this.viewer.isSignedApplet () || !this.viewer.haveAccess (J.viewer.Viewer.ACCESS.ALL) || this.viewer.getPathForAllFiles ().length > 0);
} else {
isCommand = false;
isShow = true;
}var argCount = (isCommand ? this.slen : args.length);
var len = 0;
var nVibes = 0;
var width = -1;
var height = -1;
var quality = -2147483648;
var timeMsg = this.viewer.getBoolean (603979934);
var driverList = this.viewer.getExportDriverList ();
var sceneType = "PNGJ";
var data = null;
var type2 = "";
var fileName = null;
var localPath = null;
var remotePath = null;
var val = null;
var msg = null;
var fullPath =  new Array (1);
var isCoord = false;
var isExport = false;
var isImage = false;
var bsFrames = null;
var scripts = null;
var params;
var type = "SPT";
var tok = (isCommand && args.length == 1 ? 1073741884 : J.scriptext.ScriptExt.tokAtArray (pt, args));
switch (tok) {
case 0:
break;
case 135271429:
if (this.eval.isArrayParameter (pt + 1)) {
scripts = this.eval.stringParameterSet (++pt);
localPath = ".";
remotePath = ".";
pt0 = pt = this.eval.iToken + 1;
tok = this.tokAt (pt);
}break;
default:
type = J.script.SV.sValue (this.tokenAt (pt, args)).toUpperCase ();
}
switch (tok) {
case 0:
break;
case 135270418:
case 1052714:
case 1716520985:
msg = this.plot (args);
if (!isCommand) return msg;
break;
case 1073741983:
type = "INLINE";
data = J.script.SV.sValue (this.tokenAt (++pt, args));
pt++;
break;
case 1073742102:
type = "PGRP";
pt++;
type2 = J.script.SV.sValue (this.tokenAt (pt, args)).toLowerCase ();
if (type2.equals ("draw")) pt++;
break;
case 1048582:
pt++;
isCoord = true;
break;
case 1073742158:
case 135271429:
val = J.script.SV.sValue (this.tokenAt (++pt, args)).toLowerCase ();
while (val.equals ("localpath") || val.equals ("remotepath")) {
if (val.equals ("localpath")) localPath = J.script.SV.sValue (this.tokenAt (++pt, args));
 else remotePath = J.script.SV.sValue (this.tokenAt (++pt, args));
val = J.script.SV.sValue (this.tokenAt (++pt, args)).toLowerCase ();
}
type = "SPT";
break;
case 1229984263:
case 135368713:
case 1610616855:
case 135180:
case 1073742015:
case 1073742018:
case 1183762:
case 135188:
pt++;
break;
case 1073741992:
type = "ZIPALL";
pt++;
break;
case 36868:
type = "VAR";
pt += 2;
break;
case 4115:
case 1073741824:
case 1073741979:
case 1073742139:
case 4:
case 4166:
switch (tok) {
case 1073741979:
pt++;
break;
case 4166:
nVibes = this.eval.intParameterRange (++pt, 1, 10);
if (!this.chk) {
this.viewer.setVibrationOff ();
if (!this.eval.isJS) this.eval.delayScript (100);
}pt++;
break;
case 4115:
var bsAtoms;
if (pt + 1 < argCount && args[++pt].tok == 1048577 || args[pt].tok == 10) {
bsAtoms = this.eval.atomExpression (args, pt, 0, true, false, true, true);
pt = this.eval.iToken + 1;
} else {
bsAtoms = this.viewer.getAllAtoms ();
}if (!this.chk) bsFrames = this.viewer.getModelBitSet (bsAtoms, true);
break;
case 1073742139:
val = J.script.SV.sValue (this.tokenAt (++pt, args)).toUpperCase ();
if (JU.PT.isOneOf (val, ";PNG;PNGJ;")) {
sceneType = val;
pt++;
}break;
default:
tok = 1073741979;
break;
}
if (tok == 1073741979) {
var t = J.script.T.getTokenFromName (J.script.SV.sValue (args[pt]).toLowerCase ());
if (t != null) type = J.script.SV.sValue (t).toUpperCase ();
if (JU.PT.isOneOf (type, driverList.toUpperCase ())) {
pt++;
type = type.substring (0, 1).toUpperCase () + type.substring (1).toLowerCase ();
isExport = true;
if (isCommand) fileName = "Jmol." + type.toLowerCase ();
break;
} else if (JU.PT.isOneOf (type, ";ZIP;ZIPALL;SPT;STATE;")) {
pt++;
break;
} else {
type = "(image)";
}}if (J.scriptext.ScriptExt.tokAtArray (pt, args) == 2) {
width = J.script.SV.iValue (this.tokenAt (pt++, args));
height = J.script.SV.iValue (this.tokenAt (pt++, args));
}break;
}
if (msg == null) {
val = J.script.SV.sValue (this.tokenAt (pt, args));
if (val.equalsIgnoreCase ("clipboard")) {
if (this.chk) return "";
} else if (JU.PT.isOneOf (val.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;pdf;ppm;png;pngj;pngt;")) {
if (J.scriptext.ScriptExt.tokAtArray (pt + 1, args) == 2 && J.scriptext.ScriptExt.tokAtArray (pt + 2, args) == 2) {
width = J.script.SV.iValue (this.tokenAt (++pt, args));
height = J.script.SV.iValue (this.tokenAt (++pt, args));
}if (J.scriptext.ScriptExt.tokAtArray (pt + 1, args) == 2) quality = J.script.SV.iValue (this.tokenAt (++pt, args));
} else if (JU.PT.isOneOf (val.toLowerCase (), ";xyz;xyzrn;xyzvib;mol;sdf;v2000;v3000;json;pdb;pqr;cml;")) {
type = val.toUpperCase ();
if (pt + 1 == argCount) pt++;
}if (type.equals ("(image)") && JU.PT.isOneOf (val.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;pdf;ppm;png;pngj;pngt;scene;")) {
type = val.toUpperCase ();
pt++;
}if (pt + 2 == argCount) {
var s = J.script.SV.sValue (this.tokenAt (++pt, args));
if (s.length > 0 && s.charAt (0) != '.') type = val.toUpperCase ();
}switch (J.scriptext.ScriptExt.tokAtArray (pt, args)) {
case 0:
isShow = true;
break;
case 1073741884:
break;
case 1073741824:
case 4:
fileName = J.script.SV.sValue (this.tokenAt (pt, args));
if (pt == argCount - 3 && J.scriptext.ScriptExt.tokAtArray (pt + 1, args) == 1048584) {
fileName += "." + J.script.SV.sValue (this.tokenAt (pt + 2, args));
}if (type !== "VAR" && pt == pt0) type = "IMAGE";
 else if (fileName.length > 0 && fileName.charAt (0) == '.' && (pt == pt0 + 1 || pt == pt0 + 2)) {
fileName = J.script.SV.sValue (this.tokenAt (pt - 1, args)) + fileName;
if (type !== "VAR" && pt == pt0 + 1) type = "IMAGE";
}if (fileName.equalsIgnoreCase ("clipboard") || !this.viewer.haveAccess (J.viewer.Viewer.ACCESS.ALL)) fileName = null;
break;
default:
this.invArg ();
}
if (type.equals ("IMAGE") || type.equals ("(image)") || type.equals ("FRAME") || type.equals ("VIBRATION")) {
type = (fileName != null && fileName.indexOf (".") >= 0 ? fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase () : "JPG");
}if (type.equals ("MNU")) {
type = "MENU";
} else if (type.equals ("WRL") || type.equals ("VRML")) {
type = "Vrml";
isExport = true;
} else if (type.equals ("X3D")) {
type = "X3d";
isExport = true;
} else if (type.equals ("IDTF")) {
type = "Idtf";
isExport = true;
} else if (type.equals ("MA")) {
type = "Maya";
isExport = true;
} else if (type.equals ("JS")) {
type = "Js";
isExport = true;
} else if (type.equals ("OBJ")) {
type = "Obj";
isExport = true;
} else if (type.equals ("JVXL")) {
type = "ISOSURFACE";
} else if (type.equals ("XJVXL")) {
type = "ISOSURFACE";
} else if (type.equals ("JMOL")) {
type = "ZIPALL";
} else if (type.equals ("HIS")) {
type = "HISTORY";
}if (type.equals ("COORD")) type = (fileName != null && fileName.indexOf (".") >= 0 ? fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase () : "XYZ");
isImage = JU.PT.isOneOf (type.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;pdf;ppm;png;pngj;pngt;scene;");
if (scripts != null) {
if (type.equals ("PNG")) type = "PNGJ";
if (!type.equals ("PNGJ") && !type.equals ("ZIPALL")) this.invArg ();
}if (!isImage && !isExport && !JU.PT.isOneOf (type, ";SCENE;JMOL;ZIP;ZIPALL;SPT;HISTORY;MO;ISOSURFACE;MESH;PMESH;VAR;FILE;FUNCTION;CML;JSON;XYZ;XYZRN;XYZVIB;MENU;MOL;PDB;PGRP;PQR;QUAT;RAMA;SDF;V2000;V3000;INLINE;")) this.eval.errorStr2 (54, "COORDS|FILE|FUNCTIONS|HISTORY|IMAGE|INLINE|ISOSURFACE|JMOL|MENU|MO|POINTGROUP|QUATERNION [w,x,y,z] [derivative]|RAMACHANDRAN|SPT|STATE|VAR x|ZIP|ZIPALL  CLIPBOARD", "CML|GIF|JPG|JPG64|JMOL|JVXL|MESH|MOL|PDB|PMESH|PNG|PNGJ|PNGT|PPM|PQR|SDF|CD|JSON|V2000|V3000|SPT|XJVXL|XYZ|XYZRN|XYZVIB|ZIP" + driverList.toUpperCase ().$replace (';', '|'));
if (this.chk) return "";
var bytes = null;
var doDefer = false;
if (data == null || isExport) {
data = type.intern ();
if (isExport) {
if (timeMsg) J.util.Logger.startTimer ("export");
var eparams =  new java.util.Hashtable ();
eparams.put ("type", data);
if (fileName != null) eparams.put ("fileName", fileName);
if (isCommand || fileName != null) eparams.put ("fullPath", fullPath);
eparams.put ("width", Integer.$valueOf (width));
eparams.put ("height", Integer.$valueOf (height));
data = this.viewer.generateOutputForExport (eparams);
if (data == null || data.length == 0) return "";
if (!isCommand) return data;
if ((type.equals ("Povray") || type.equals ("Idtf")) && fullPath[0] != null) {
var ext = (type.equals ("Idtf") ? ".tex" : ".ini");
fileName = fullPath[0] + ext;
params =  new java.util.Hashtable ();
params.put ("fileName", fileName);
params.put ("type", ext);
params.put ("text", data);
params.put ("fullPath", fullPath);
msg = this.viewer.processWriteOrCapture (params);
if (type.equals ("Idtf")) data = data.substring (0, data.indexOf ("\\begin{comment}"));
data = "Created " + fullPath[0] + ":\n\n" + data;
if (timeMsg) this.showString (J.util.Logger.getTimerMsg ("export", 0));
} else {
msg = data;
}if (msg != null) {
if (!msg.startsWith ("OK")) this.eval.evalError (msg, null);
this.eval.scriptStatusOrBuffer (data);
}return "";
} else if (data === "MENU") {
data = this.viewer.getMenu ("");
} else if (data === "PGRP") {
data = this.viewer.getPointGroupAsString (type2.equals ("draw"), null, 0, 1.0);
} else if (data === "PDB" || data === "PQR") {
if (isShow) {
data = this.viewer.getPdbAtomData (null, null);
} else {
doDefer = true;
}} else if (data === "FILE") {
if (isShow) data = this.viewer.getCurrentFileAsString ();
 else doDefer = true;
if ("?".equals (fileName)) fileName = "?Jmol." + this.viewer.getParameter ("_fileType");
} else if ((data === "SDF" || data === "MOL" || data === "V2000" || data === "V3000" || data === "CD" || data === "JSON") && isCoord) {
data = this.viewer.getModelExtract ("selected", true, false, data);
if (data.startsWith ("ERROR:")) bytes = data;
} else if (data === "XYZ" || data === "XYZRN" || data === "XYZVIB" || data === "MOL" || data === "SDF" || data === "V2000" || data === "V3000" || data === "CML" || data === "CD" || data === "JSON") {
data = this.viewer.getData ("selected", data);
if (data.startsWith ("ERROR:")) bytes = data;
} else if (data === "FUNCTION") {
data = this.viewer.getFunctionCalls (null);
type = "TXT";
} else if (data === "VAR") {
data = (this.eval.getParameter (J.script.SV.sValue (this.tokenAt (isCommand ? 2 : 1, args)), 1073742190)).asString ();
type = "TXT";
} else if (data === "SPT") {
if (isCoord) {
var tainted = this.viewer.getTaintedAtoms (2);
this.viewer.setAtomCoordsRelative (JU.P3.new3 (0, 0, 0), null);
data = this.viewer.getStateInfo ();
this.viewer.setTaintedAtoms (tainted, 2);
} else {
data = this.viewer.getStateInfo ();
if (localPath != null || remotePath != null) data = J.viewer.FileManager.setScriptFileReferences (data, localPath, remotePath, null);
}} else if (data === "ZIP" || data === "ZIPALL") {
if (fileName != null && (bytes = data = this.viewer.createZip (fileName, type, scripts)) == null) this.eval.evalError ("#CANCELED#", null);
} else if (data === "HISTORY") {
data = this.viewer.getSetHistory (2147483647);
type = "SPT";
} else if (data === "MO") {
data = this.getMoJvxl (2147483647);
type = "XJVXL";
} else if (data === "PMESH") {
if ((data = this.getIsosurfaceJvxl (true, 28)) == null) this.error (31);
type = "XJVXL";
} else if (data === "ISOSURFACE" || data === "MESH") {
if ((data = this.getIsosurfaceJvxl (data === "MESH", 24)) == null) this.error (31);
type = (data.indexOf ("<?xml") >= 0 ? "XJVXL" : "JVXL");
if (!isShow) this.showString (this.getShapeProperty (24, "jvxlFileInfo"));
} else {
len = -1;
if (quality < 0) quality = -1;
}if (data == null && !doDefer) data = "";
if (len == 0 && !doDefer) len = (bytes == null ? data.length : Clazz.instanceOf (bytes, String) ? (bytes).length : (bytes).length);
if (isImage) {
this.eval.refresh ();
if (width < 0) width = this.viewer.getScreenWidth ();
if (height < 0) height = this.viewer.getScreenHeight ();
}}if (!isCommand) return data;
if (isShow) {
this.eval.showStringPrint (data, true);
return "";
}if (bytes != null && Clazz.instanceOf (bytes, String)) {
{
if (bytes.indexOf("OK") != 0)alert(bytes);
}this.eval.scriptStatusOrBuffer (bytes);
return bytes;
}if (type.equals ("SCENE")) bytes = sceneType;
 else if (bytes == null && (!isImage || fileName != null)) bytes = data;
if (timeMsg) J.util.Logger.startTimer ("write");
if (doDefer) {
msg = this.viewer.writeFileData (fileName, type, 0, null);
} else {
params =  new java.util.Hashtable ();
if (fileName != null) params.put ("fileName", fileName);
params.put ("type", type);
if (Clazz.instanceOf (bytes, String) && quality == -2147483648) params.put ("text", bytes);
 else if (Clazz.instanceOf (bytes, Array)) params.put ("bytes", bytes);
if (scripts != null) params.put ("scripts", scripts);
if (bsFrames != null) params.put ("bsFrames", bsFrames);
params.put ("fullPath", fullPath);
params.put ("quality", Integer.$valueOf (quality));
params.put ("width", Integer.$valueOf (width));
params.put ("height", Integer.$valueOf (height));
params.put ("nVibes", Integer.$valueOf (nVibes));
msg = this.viewer.processWriteOrCapture (params);
}if (timeMsg) this.showString (J.util.Logger.getTimerMsg ("write", 0));
}if (!this.chk && msg != null) {
if (!msg.startsWith ("OK")) {
this.eval.evalError (msg, null);
{
alert(msg);
}}this.eval.scriptStatusOrBuffer (msg + (isImage ? "; width=" + width + "; height=" + height : ""));
return msg;
}return "";
}, "~A");
$_M(c$, "show", 
($fz = function () {
var value = null;
var str = this.parameterAsString (1);
var msg = null;
var name = null;
var len = 2;
var token = this.getToken (1);
var tok = (Clazz.instanceOf (token, J.script.SV) ? 0 : token.tok);
if (tok == 4) {
token = J.script.T.getTokenFromName (str.toLowerCase ());
if (token != null) tok = token.tok;
}if (tok != 1297090050 && tok != 1073742158) this.checkLength (-3);
if (this.slen == 2 && str.indexOf ("?") >= 0) {
this.showString (this.viewer.getAllSettings (str.substring (0, str.indexOf ("?"))));
return;
}switch (tok) {
case 0:
if (!this.chk) msg = (this.eval.theToken).escape ();
break;
case 135270423:
if (!this.chk) msg = J.util.Escape.e (this.viewer.cacheList ());
break;
case 1073741915:
this.checkLength (2);
if (!this.chk) msg = this.viewer.calculateStructures (null, true, false);
break;
case 545259571:
this.checkLength (2);
if (!this.chk) msg = this.viewer.getPathForAllFiles ();
break;
case 1073742038:
if (this.eval.optParameterAsString (2).equalsIgnoreCase ("1H")) {
len = 3;
if (!this.chk) msg = this.viewer.getNMRPredict (false);
break;
}if (!this.chk) this.viewer.getNMRPredict (true);
return;
case 135267336:
case 1073741929:
case 1073741879:
this.checkLength (tok == 1073741879 ? 3 : 2);
if (this.chk) return;
msg = this.viewer.getSmiles (0, 0, this.viewer.getSelectionSet (false), false, true, false, false);
switch (tok) {
case 1073741929:
if (msg.length > 0) {
this.viewer.show2D (msg);
return;
}msg = "Could not show drawing -- Either insufficient atoms are selected or the model is a PDB file.";
break;
case 1073741879:
len = 3;
var info = null;
if (msg.length > 0) {
var type = '/';
switch (this.getToken (2).tok) {
case 1073741977:
type = 'I';
break;
case 1073741978:
type = 'K';
break;
case 1073742035:
type = 'N';
break;
default:
info = this.parameterAsString (2);
}
msg = this.viewer.getChemicalInfo (msg, type, info);
if (msg.indexOf ("FileNotFound") >= 0) msg = "?";
} else {
msg = "Could not show name -- Either insufficient atoms are selected or the model is a PDB file.";
}}
break;
case 1297090050:
if (this.slen > 3) {
var pt1 = this.centerParameter (2);
var pt2 = this.centerParameter (++this.eval.iToken);
if (!this.chk) msg = this.viewer.getSymmetryOperation (null, 0, pt1, pt2, false);
len = ++this.eval.iToken;
} else {
var iop = (this.eval.checkLength23 () == 2 ? 0 : this.intParameter (2));
if (!this.chk) msg = this.viewer.getSymmetryOperation (null, iop, null, null, false);
len = -3;
}break;
case 1649412120:
var vdwType = null;
if (this.slen > 2) {
vdwType = J.constant.EnumVdw.getVdwType (this.parameterAsString (2));
if (vdwType == null) this.invArg ();
}if (!this.chk) this.showString (this.viewer.getDefaultVdwNameOrData (0, vdwType, null));
return;
case 135368713:
this.eval.checkLength23 ();
if (!this.chk) this.showString (this.viewer.getFunctionCalls (this.eval.optParameterAsString (2)));
return;
case 1085443:
this.checkLength (2);
if (!this.chk) this.showString (this.viewer.getAllSettings (null));
return;
case 1074790760:
if ((len = this.slen) == 2) {
if (!this.chk) this.viewer.showUrl (this.eval.getFullPathName ());
return;
}name = this.parameterAsString (2);
if (!this.chk) this.viewer.showUrl (name);
return;
case 1766856708:
str = "defaultColorScheme";
break;
case 1610612740:
str = "scaleAngstromsPerInch";
break;
case 135270418:
case 1052714:
if (this.chk) return;
var modelIndex = this.viewer.getCurrentModelIndex ();
if (modelIndex < 0) this.eval.errorStr (30, "show " + this.eval.theToken.value);
msg = this.plot (this.st);
len = this.slen;
break;
case 1113200654:
if (!this.chk) msg = this.getContext (false);
break;
case 1073741888:
name = this.eval.optParameterAsString (2);
if (name.length > 0) len = 3;
if (!this.chk) value = this.viewer.getColorSchemeList (name);
break;
case 1073742192:
if (!this.chk) msg = this.viewer.getAtomDefs (this.eval.definedAtomSets) + this.viewer.getVariableList () + this.getContext (true);
break;
case 536870926:
if (!this.chk) msg = this.viewer.getTrajectoryState ();
break;
case 553648148:
value = "" + this.eval.commandHistoryLevelMax;
break;
case 553648150:
value = "" + J.util.Logger.getLogLevel ();
break;
case 603979824:
value = "" + this.viewer.getBoolean (603979824);
break;
case 553648178:
msg = "set strandCountForStrands " + this.viewer.getStrandCount (12) + "; set strandCountForMeshRibbon " + this.viewer.getStrandCount (13);
break;
case 536875070:
msg = this.viewer.showTimeout ((len = this.slen) == 2 ? null : this.parameterAsString (2));
break;
case 536870918:
value = J.util.Escape.eP (this.viewer.getDefaultLattice ());
break;
case 4126:
if (!this.chk) msg = this.viewer.getMinimizationInfo ();
break;
case 1611272194:
switch (this.viewer.getAxesMode ()) {
case J.constant.EnumAxesMode.UNITCELL:
msg = "set axesUnitcell";
break;
case J.constant.EnumAxesMode.BOUNDBOX:
msg = "set axesWindow";
break;
default:
msg = "set axesMolecular";
}
break;
case 1610612737:
msg = "set bondMode " + (this.viewer.getBoolean (603979812) ? "OR" : "AND");
break;
case 1650071565:
if (!this.chk) msg = "set strandCountForStrands " + this.viewer.getStrandCount (12) + "; set strandCountForMeshRibbon " + this.viewer.getStrandCount (13);
break;
case 1612189718:
msg = "set hbondsBackbone " + this.viewer.getBoolean (603979852) + ";set hbondsSolid " + this.viewer.getBoolean (603979854);
break;
case 1611141175:
if (!this.chk) msg = this.viewer.getSpinState ();
break;
case 1611141176:
msg = "set ssbondsBackbone " + this.viewer.getBoolean (603979952);
break;
case 1610625028:
case 1611141171:
msg = "selectionHalos " + (this.viewer.getSelectionHaloEnabled (false) ? "ON" : "OFF");
break;
case 1613758470:
msg = "set selectHetero " + this.viewer.getBoolean (1613758470);
break;
case 1073741828:
msg = J.util.Escape.eAP (this.viewer.getAdditionalHydrogens (null, true, true, null));
break;
case 1613758476:
msg = "set selectHydrogens " + this.viewer.getBoolean (1613758476);
break;
case 553648130:
case 553648142:
case 536870924:
case 553648176:
case 553648172:
case 1073741995:
if (!this.chk) msg = this.viewer.getSpecularState ();
break;
case 4146:
if (!this.chk) msg = this.viewer.listSavedStates ();
break;
case 1614417948:
if (!this.chk) msg = this.viewer.getUnitCellInfoText ();
break;
case 1048582:
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.viewer.getCoordinateState (this.viewer.getSelectionSet (false));
break;
}var nameC = this.parameterAsString (2);
if (!this.chk) msg = this.viewer.getSavedCoordinates (nameC);
break;
case 1073742158:
if (!this.chk) this.viewer.clearConsole ();
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.viewer.getStateInfo ();
break;
}name = this.parameterAsString (2);
if (name.equals ("/") && (len = this.slen) == 4) {
name = this.parameterAsString (3).toLowerCase ();
if (!this.chk) {
var info = JU.PT.split (this.viewer.getStateInfo (), "\n");
var sb =  new JU.SB ();
for (var i = 0; i < info.length; i++) if (info[i].toLowerCase ().indexOf (name) >= 0) sb.append (info[i]).appendC ('\n');

msg = sb.toString ();
}break;
} else if (this.tokAt (2) == 1229984263 && (len = this.slen) == 4) {
if (!this.chk) msg = this.viewer.getEmbeddedFileState (this.parameterAsString (3));
break;
}len = 3;
if (!this.chk) msg = this.viewer.getSavedState (name);
break;
case 1641025539:
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.viewer.getProteinStructureState ();
break;
}var shape = this.parameterAsString (2);
if (!this.chk) msg = this.viewer.getSavedStructure (shape);
break;
case 135270407:
var type = ((len = this.slen) == 3 ? this.parameterAsString (2) : null);
if (!this.chk) {
var data = (type == null ? this.$data : this.viewer.getData (type));
msg = (data == null ? "no data" : J.util.Escape.encapsulateData (data[0], data[1], (data[3]).intValue ()));
}break;
case 1073742152:
var info = null;
if ((len = this.slen) == 2) {
if (!this.chk) {
info = this.viewer.getSpaceGroupInfo (null);
}} else {
var sg = this.parameterAsString (2);
if (!this.chk) info = this.viewer.getSpaceGroupInfo (JU.PT.simpleReplace (sg, "''", "\""));
}if (info != null) msg = "" + info.get ("spaceGroupInfo") + info.get ("symmetryInfo");
break;
case 1048583:
len = 3;
msg = this.eval.setObjectProperty ();
break;
case 1679429641:
if (!this.chk) {
msg = this.viewer.getBoundBoxCommand (true);
}break;
case 12289:
if (!this.chk) msg = "center " + J.util.Escape.eP (this.viewer.getRotationCenter ());
break;
case 135176:
if (!this.chk) msg = this.getShapeProperty (22, "command");
break;
case 1229984263:
if (!this.chk) this.viewer.clearConsole ();
if (this.slen == 2) {
if (!this.chk) msg = this.viewer.getCurrentFileAsString ();
if (msg == null) msg = "<unavailable>";
break;
}len = 3;
value = this.parameterAsString (2);
if (!this.chk) msg = this.viewer.getFileAsString (value);
break;
case 4115:
if (this.tokAt (2) == 1048579 && (len = 3) > 0) msg = this.viewer.getModelFileInfoAll ();
 else msg = this.viewer.getModelFileInfo ();
break;
case 1610616855:
var n = ((len = this.slen) == 2 ? 2147483647 : this.intParameter (2));
if (n < 1) this.invArg ();
if (!this.chk) {
this.viewer.clearConsole ();
if (this.eval.scriptLevel == 0) this.viewer.removeCommand ();
msg = this.viewer.getSetHistory (n);
}break;
case 135180:
if (!this.chk) msg = this.getShapeProperty (24, "jvxlDataXml");
break;
case 1183762:
if (this.eval.optParameterAsString (2).equalsIgnoreCase ("list")) {
msg = this.viewer.getMoInfo (-1);
len = 3;
} else {
var ptMO = ((len = this.slen) == 2 ? -2147483648 : this.intParameter (2));
if (!this.chk) msg = this.getMoJvxl (ptMO);
}break;
case 1095766030:
if (!this.chk) msg = this.viewer.getModelInfoAsString ();
break;
case 537006096:
if (!this.chk) msg = this.viewer.getMeasurementInfoAsString ();
break;
case 1073741863:
len = 3;
if (!this.chk && this.slen == len) msg = this.viewer.getOrientationText (this.tokAt (2), null);
break;
case 1073742132:
tok = this.tokAt (2);
if (tok == 0) tok = 1073742132;
 else len = 3;
case 1073742178:
case 4130:
if (!this.chk) msg = this.viewer.getOrientationText (tok, null);
break;
case 1073742077:
len = 2;
if (this.slen > 3) break;
switch (tok = this.tokAt (2)) {
case 1073742178:
case 1073742132:
case 4130:
case 0:
if (!this.chk) msg = this.viewer.getOrientationText (tok, null);
break;
default:
name = this.eval.optParameterAsString (2);
msg = this.viewer.getOrientationText (1073742035, name);
}
len = this.slen;
break;
case 1073742088:
if (!this.chk) msg = this.viewer.getPDBHeader ();
break;
case 1073742102:
this.pointGroup ();
return;
case 1089470478:
if (!this.chk) msg = this.viewer.getSymmetryInfoAsString ();
break;
case 1073742176:
if (!this.chk) msg = "transform:\n" + this.viewer.getTransformText ();
break;
case 4168:
msg = "zoom " + (this.viewer.getZoomEnabled () ? ("" + this.viewer.getZoomSetting ()) : "off");
break;
case 1611272202:
msg = (this.viewer.getShowFrank () ? "frank ON" : "frank OFF");
break;
case 1666189314:
str = "solventProbeRadius";
break;
case 1073741864:
case 1087373316:
case 1087373320:
case 1073742120:
case 1114638363:
case 1087373318:
case 1141899265:
case 1073741982:
msg = this.viewer.getChimeInfo (tok);
break;
case 537022465:
case 1610612738:
case 1716520985:
case 20482:
case 1613758488:
value = "?";
break;
case 1073741824:
if (str.equalsIgnoreCase ("fileHeader")) {
if (!this.chk) msg = this.viewer.getPDBHeader ();
} else if (str.equalsIgnoreCase ("menu")) {
if (!this.chk) value = this.viewer.getMenu ("");
} else if (str.equalsIgnoreCase ("mouse")) {
var qualifiers = ((len = this.slen) == 2 ? null : this.parameterAsString (2));
if (!this.chk) msg = this.viewer.getBindingInfo (qualifiers);
}break;
}
this.checkLength (len);
if (this.chk) return;
if (msg != null) this.showString (msg);
 else if (value != null) this.showString (str + " = " + value);
 else if (str != null) {
if (str.indexOf (" ") >= 0) this.showString (str);
 else this.showString (str + " = " + this.getParameterEscaped (str));
}}, $fz.isPrivate = true, $fz));
$_M(c$, "showString", 
($fz = function (s) {
this.eval.showString (s);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "checkLength", 
($fz = function (i) {
this.eval.checkLength (i);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getIsosurfaceJvxl", 
($fz = function (asMesh, iShape) {
if (this.chk) return "";
return this.getShapeProperty (iShape, asMesh ? "jvxlMeshX" : "jvxlDataXml");
}, $fz.isPrivate = true, $fz), "~B,~N");
$_M(c$, "getMoJvxl", 
($fz = function (ptMO) {
this.sm.loadShape (27);
var modelIndex = this.viewer.getCurrentModelIndex ();
if (modelIndex < 0) this.eval.errorStr (30, "MO isosurfaces");
var moData = this.viewer.getModelAuxiliaryInfoValue (modelIndex, "moData");
if (moData == null) this.error (27);
var n = this.getShapeProperty (27, "moNumber");
if (n == null || n.intValue () == 0) {
this.setShapeProperty (27, "init", Integer.$valueOf (modelIndex));
}this.setShapeProperty (27, "moData", moData);
return this.getShapePropertyIndex (27, "showMO", ptMO);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "getParameterEscaped", 
($fz = function ($var) {
var v = this.eval.getContextVariableAsVariable ($var);
return (v == null ? "" + this.viewer.getParameterEscaped ($var) : v.escape ());
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getContext", 
($fz = function (withVariables) {
var sb =  new JU.SB ();
var context = this.eval.thisContext;
while (context != null) {
if (withVariables) {
if (context.contextVariables != null) {
sb.append (this.getScriptID (context));
sb.append (J.viewer.StateManager.getVariableList (context.contextVariables, 80, true, false));
}} else {
sb.append (J.script.ScriptEvaluator.getErrorLineMessage (context.functionName, context.scriptFileName, this.eval.getLinenumber (context), context.pc, J.script.ScriptEvaluator.statementAsString (this.viewer, context.statement, -9999, this.eval.logMessages)));
}context = context.parentContext;
}
if (withVariables) {
if (this.eval.contextVariables != null) {
sb.append (this.getScriptID (null));
sb.append (J.viewer.StateManager.getVariableList (this.eval.contextVariables, 80, true, false));
}} else {
sb.append (this.eval.getErrorLineMessage2 ());
}return sb.toString ();
}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "getScriptID", 
($fz = function (context) {
var fuName = (context == null ? this.eval.functionName : "function " + context.functionName);
var fiName = (context == null ? this.eval.scriptFileName : context.scriptFileName);
return "\n# " + fuName + " (file " + fiName + (context == null ? "" : " context " + context.id) + ")\n";
}, $fz.isPrivate = true, $fz), "J.script.ScriptContext");
$_M(c$, "getShapePropertyIndex", 
($fz = function (shapeType, propertyName, index) {
return this.sm.getShapePropertyIndex (shapeType, propertyName, index);
}, $fz.isPrivate = true, $fz), "~N,~S,~N");
$_M(c$, "tokenAt", 
($fz = function (i, args) {
return (i < args.length ? args[i] : null);
}, $fz.isPrivate = true, $fz), "~N,~A");
c$.tokAtArray = $_M(c$, "tokAtArray", 
($fz = function (i, args) {
return (i < args.length && args[i] != null ? args[i].tok : 0);
}, $fz.isPrivate = true, $fz), "~N,~A");
$_M(c$, "calculate", 
($fz = function () {
var isSurface = false;
var asDSSP = false;
var bs1 = null;
var bs2 = null;
var n = -2147483648;
if ((this.eval.iToken = this.eval.slen) >= 2) {
this.eval.clearDefinedVariableAtomSets ();
switch (this.getToken (1).tok) {
case 1073741824:
this.checkLength (2);
break;
case 1632634891:
this.checkLength (2);
if (this.chk) return;
n = this.viewer.calculateFormalCharges (null);
this.showString (J.i18n.GT.i (J.i18n.GT._ ("{0} charges modified"), n));
return;
case 1076887572:
this.checkLength (2);
if (!this.chk) this.viewer.assignAromaticBonds ();
return;
case 1612189718:
if (this.eval.slen != 2) {
asDSSP = (this.tokAt (++this.eval.iToken) == 1641025539);
if (asDSSP) bs1 = this.viewer.getSelectionSet (false);
 else bs1 = this.atomExpressionAt (this.eval.iToken);
if (!asDSSP && !(asDSSP = (this.tokAt (++this.eval.iToken) == 1641025539))) bs2 = this.atomExpressionAt (this.eval.iToken);
}if (this.chk) return;
n = this.viewer.autoHbond (bs1, bs2, false);
if (n != -2147483648) this.eval.scriptStatusOrBuffer (J.i18n.GT.i (J.i18n.GT._ ("{0} hydrogen bonds"), Math.abs (n)));
return;
case 1613758476:
bs1 = (this.slen == 2 ? null : this.atomExpressionAt (2));
this.eval.checkLast (this.eval.iToken);
if (!this.chk) this.viewer.addHydrogens (bs1, false, false);
return;
case 1112541196:
this.eval.iToken = 1;
bs1 = (this.slen == 2 ? null : this.atomExpressionAt (2));
this.eval.checkLast (this.eval.iToken);
if (!this.chk) this.viewer.calculatePartialCharges (bs1);
return;
case 1073742102:
this.pointGroup ();
return;
case 1112539150:
this.checkLength (2);
if (!this.chk) {
this.viewer.calculateStraightness ();
this.viewer.addStateScript ("set quaternionFrame '" + this.viewer.getQuaternionFrame () + "'; calculate straightness", false, true);
}return;
case 1641025539:
bs1 = (this.slen < 4 ? null : this.atomExpressionAt (2));
switch (this.tokAt (++this.eval.iToken)) {
case 1052714:
break;
case 1073741915:
asDSSP = true;
break;
case 0:
asDSSP = this.viewer.getBoolean (603979825);
break;
default:
this.invArg ();
}
if (!this.chk) this.showString (this.viewer.calculateStructures (bs1, asDSSP, true));
return;
case 1708058:
bs1 = (this.eval.iToken + 1 < this.slen ? this.atomExpressionAt (++this.eval.iToken) : null);
bs2 = (this.eval.iToken + 1 < this.slen ? this.atomExpressionAt (++this.eval.iToken) : null);
this.checkLength (++this.eval.iToken);
if (!this.chk) {
n = this.viewer.calculateStruts (bs1, bs2);
if (n > 0) {
this.setShapeProperty (1, "type", Integer.$valueOf (32768));
this.eval.setShapePropertyBs (1, "color", Integer.$valueOf (0x0FFFFFF), null);
this.eval.setShapeTranslucency (1, "", "translucent", 0.5, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
}this.showString (J.i18n.GT.i (J.i18n.GT._ ("{0} struts mp.added"), n));
}return;
case 3145756:
isSurface = true;
case 1112539151:
var isFrom = false;
switch (this.tokAt (2)) {
case 135266325:
this.eval.iToken++;
break;
case 0:
isFrom = !isSurface;
break;
case 1073741952:
isFrom = true;
this.eval.iToken++;
break;
default:
isFrom = true;
}
bs1 = (this.eval.iToken + 1 < this.slen ? this.atomExpressionAt (++this.eval.iToken) : this.viewer.getSelectionSet (false));
this.checkLength (++this.eval.iToken);
if (!this.chk) this.viewer.calculateSurface (bs1, (isFrom ? 3.4028235E38 : -1));
return;
}
}this.eval.errorStr2 (53, "CALCULATE", "aromatic? hbonds? hydrogen? formalCharge? partialCharge? pointgroup? straightness? structure? struts? surfaceDistance FROM? surfaceDistance WITHIN?");
}, $fz.isPrivate = true, $fz));
$_M(c$, "pointGroup", 
($fz = function () {
switch (this.tokAt (0)) {
case 4102:
if (!this.chk) this.showString (this.viewer.calculatePointGroup ());
return;
case 4148:
if (!this.chk) this.showString (this.viewer.getPointGroupAsString (false, null, 0, 0));
return;
}
var pt = 2;
var type = (this.tokAt (pt) == 1073742138 ? "" : this.eval.optParameterAsString (pt));
if (type.equals ("chemicalShift")) type = "cs";
var scale = 1;
var index = 0;
if (type.length > 0) {
if (this.isFloatParameter (++pt)) index = this.intParameter (pt++);
}if (this.tokAt (pt) == 1073742138) scale = this.floatParameter (++pt);
if (!this.chk) this.eval.runScript (this.viewer.getPointGroupAsString (true, type, index, scale));
}, $fz.isPrivate = true, $fz));
$_M(c$, "mapProperty", 
($fz = function () {
var bsFrom;
var bsTo;
var property1;
var property2;
var mapKey;
var tokProp1 = 0;
var tokProp2 = 0;
var tokKey = 0;
while (true) {
if (this.tokAt (1) == 1114638363) {
bsFrom = this.viewer.getSelectionSet (false);
bsTo = this.atomExpressionAt (2);
property1 = property2 = "selected";
} else {
bsFrom = this.atomExpressionAt (1);
if (this.tokAt (++this.eval.iToken) != 1048584 || !J.script.T.tokAttr (tokProp1 = this.tokAt (++this.eval.iToken), 1078984704)) break;
property1 = this.parameterAsString (this.eval.iToken);
bsTo = this.atomExpressionAt (++this.eval.iToken);
if (this.tokAt (++this.eval.iToken) != 1048584 || !J.script.T.tokAttr (tokProp2 = this.tokAt (++this.eval.iToken), 2048)) break;
property2 = this.parameterAsString (this.eval.iToken);
}if (J.script.T.tokAttr (tokKey = this.tokAt (this.eval.iToken + 1), 1078984704)) mapKey = this.parameterAsString (++this.eval.iToken);
 else mapKey = J.script.T.nameOf (tokKey = 1095763969);
this.eval.checkLast (this.eval.iToken);
if (this.chk) return;
var bsOut = null;
this.showString ("mapping " + property1.toUpperCase () + " for " + bsFrom.cardinality () + " atoms to " + property2.toUpperCase () + " for " + bsTo.cardinality () + " atoms using " + mapKey.toUpperCase ());
if (J.script.T.tokAttrOr (tokProp1, 1095761920, 1112539136) && J.script.T.tokAttrOr (tokProp2, 1095761920, 1112539136) && J.script.T.tokAttrOr (tokKey, 1095761920, 1112539136)) {
var data1 = this.eval.getBitsetPropertyFloat (bsFrom, tokProp1 | 224, NaN, NaN);
var data2 = this.eval.getBitsetPropertyFloat (bsFrom, tokKey | 224, NaN, NaN);
var data3 = this.eval.getBitsetPropertyFloat (bsTo, tokKey | 224, NaN, NaN);
var isProperty = (tokProp2 == 1716520985);
var dataOut =  Clazz.newFloatArray (isProperty ? this.viewer.getAtomCount () : data3.length, 0);
bsOut =  new JU.BS ();
if (data1.length == data2.length) {
var ht =  new java.util.Hashtable ();
for (var i = 0; i < data1.length; i++) {
ht.put (Float.$valueOf (data2[i]), Float.$valueOf (data1[i]));
}
var pt = -1;
var nOut = 0;
for (var i = 0; i < data3.length; i++) {
pt = bsTo.nextSetBit (pt + 1);
var F = ht.get (Float.$valueOf (data3[i]));
if (F == null) continue;
bsOut.set (pt);
dataOut[(isProperty ? pt : nOut)] = F.floatValue ();
nOut++;
}
if (isProperty) this.viewer.setData (property2, [property2, dataOut, bsOut, Integer.$valueOf (0), Boolean.TRUE], this.viewer.getAtomCount (), 0, 0, 2147483647, 0);
 else this.viewer.setAtomProperty (bsOut, tokProp2, 0, 0, null, dataOut, null);
}}if (bsOut == null) {
var format = "{" + mapKey + "=%[" + mapKey + "]}." + property2 + " = %[" + property1 + "]";
var data = this.getBitsetIdent (bsFrom, format, null, false, 2147483647, false);
var sb =  new JU.SB ();
for (var i = 0; i < data.length; i++) if (data[i].indexOf ("null") < 0) sb.append (data[i]).appendC ('\n');

if (J.util.Logger.debugging) J.util.Logger.debug (sb.toString ());
var bsSubset = J.util.BSUtil.copy (this.viewer.getSelectionSubset ());
this.viewer.setSelectionSubset (bsTo);
try {
this.eval.runScript (sb.toString ());
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.viewer.setSelectionSubset (bsSubset);
this.eval.errorStr (-1, "Error: " + e.toString ());
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.viewer.setSelectionSubset (bsSubset);
this.eval.errorStr (-1, "Error: " + er.toString ());
}
} else {
throw e$$;
}
}
this.viewer.setSelectionSubset (bsSubset);
}this.showString ("DONE");
return;
}
this.invArg ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "minimize", 
($fz = function () {
var bsSelected = null;
var steps = 2147483647;
var crit = 0;
var addHydrogen = false;
var isSilent = false;
var bsFixed = null;
var isOnly = false;
var minimizer = this.viewer.getMinimizer (false);
for (var i = 1; i < this.slen; i++) switch (this.getToken (i).tok) {
case 1073741828:
addHydrogen = true;
continue;
case 1073741874:
case 1073742162:
this.checkLength (2);
if (this.chk || minimizer == null) return;
minimizer.setProperty (this.parameterAsString (i), null);
return;
case 1073741882:
this.checkLength (2);
if (this.chk || minimizer == null) return;
minimizer.setProperty ("clear", null);
return;
case 1073741894:
if (i != 1) this.invArg ();
var n = 0;
var targetValue = 0;
var aList =  Clazz.newIntArray (5, 0);
if (this.tokAt (++i) == 1073741882) {
this.checkLength (3);
} else {
while (n < 4 && !this.isFloatParameter (i)) {
aList[++n] = this.atomExpressionAt (i).nextSetBit (0);
i = this.eval.iToken + 1;
}
aList[0] = n;
if (n == 1) this.invArg ();
targetValue = this.floatParameter (this.eval.checkLast (i));
}if (!this.chk) this.viewer.getMinimizer (true).setProperty ("constraint", [aList,  Clazz.newIntArray (n, 0), Float.$valueOf (targetValue)]);
return;
case 1073741905:
crit = this.floatParameter (++i);
continue;
case 1073741934:
steps = 0;
continue;
case 1060869:
if (i != 1) this.invArg ();
bsFixed = this.atomExpressionAt (++i);
if (bsFixed.nextSetBit (0) < 0) bsFixed = null;
i = this.eval.iToken;
if (!this.chk) this.viewer.getMinimizer (true).setProperty ("fixed", bsFixed);
if (i + 1 == this.slen) return;
continue;
case 10:
case 1048577:
isOnly = true;
case 135280132:
if (this.eval.theTok == 135280132) i++;
bsSelected = this.atomExpressionAt (i);
i = this.eval.iToken;
if (this.tokAt (i + 1) == 1073742072) {
i++;
isOnly = true;
}continue;
case 1073742148:
isSilent = true;
break;
case 266298:
steps = this.intParameter (++i);
continue;
default:
this.invArg ();
break;
}

if (!this.chk) this.viewer.minimize (steps, crit, bsSelected, bsFixed, 0, addHydrogen, isOnly, isSilent, false);
}, $fz.isPrivate = true, $fz));
$_M(c$, "modulation", 
($fz = function () {
var qtOffset = null;
var mod = true;
var isQ = false;
var bs = null;
switch (this.getToken (1).tok) {
case 1048588:
mod = false;
case 0:
case 1048589:
break;
case 10:
case 1048577:
bs = this.atomExpressionAt (1);
switch (this.tokAt (this.eval.iToken + 1)) {
case 0:
break;
case 1048588:
mod = false;
case 1048589:
this.eval.iToken++;
break;
}
this.eval.checkLast (this.eval.iToken);
break;
case 1048586:
case 8:
qtOffset = this.eval.getPoint3f (1, false);
isQ = (this.tokAt (this.eval.iToken) == 1048589);
break;
case 3:
var t1 = this.floatParameter (1);
qtOffset = JU.P3.new3 (t1, t1, t1);
break;
case 2:
var t = this.intParameter (1);
qtOffset = JU.P3.new3 (t, t, t);
isQ = true;
break;
case 1073742138:
var scale = this.floatParameter (2);
if (!this.chk) this.viewer.setFloatProperty ("modulationScale", scale);
return;
default:
this.invArg ();
}
if (!this.chk) this.viewer.setModulation (bs, mod, qtOffset, isQ);
}, $fz.isPrivate = true, $fz));
$_M(c$, "setContactBitSets", 
($fz = function (bsA, bsB, localOnly, distance, rd, warnMultiModel) {
var withinAllModels;
var bs;
if (bsB == null) {
bsB = J.util.BSUtil.setAll (this.viewer.getAtomCount ());
J.util.BSUtil.andNot (bsB, this.viewer.getDeletedAtoms ());
bsB.andNot (bsA);
withinAllModels = false;
} else {
bs = J.util.BSUtil.copy (bsA);
bs.or (bsB);
var nModels = this.viewer.getModelBitSet (bs, false).cardinality ();
withinAllModels = (nModels > 1);
if (warnMultiModel && nModels > 1 && !this.eval.tQuiet) this.showString (J.i18n.GT._ ("Note: More than one model is involved in this contact!"));
}if (!bsA.equals (bsB)) {
var setBfirst = (!localOnly || bsA.cardinality () < bsB.cardinality ());
if (setBfirst) {
bs = this.viewer.getAtomsWithinRadius (distance, bsA, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsB.and (bs);
}if (localOnly) {
bs = this.viewer.getAtomsWithinRadius (distance, bsB, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsA.and (bs);
if (!setBfirst) {
bs = this.viewer.getAtomsWithinRadius (distance, bsA, withinAllModels, (Float.isNaN (distance) ? rd : null));
bsB.and (bs);
}bs = J.util.BSUtil.copy (bsB);
bs.and (bsA);
if (bs.equals (bsA)) bsB.andNot (bsA);
 else if (bs.equals (bsB)) bsA.andNot (bsB);
}}return bsB;
}, $fz.isPrivate = true, $fz), "JU.BS,JU.BS,~B,~N,J.atomdata.RadiusData,~B");
$_M(c$, "compare", 
($fz = function () {
var isQuaternion = false;
var doRotate = false;
var doTranslate = false;
var doAnimate = false;
var isFlexFit = false;
var data1 = null;
var data2 = null;
var bsAtoms1 = null;
var bsAtoms2 = null;
var vAtomSets = null;
var vQuatSets = null;
this.eval.iToken = 0;
var nSeconds = (this.isFloatParameter (1) ? this.floatParameter (++this.eval.iToken) : NaN);
var bsFrom = this.atomExpressionAt (++this.eval.iToken);
var coordTo = null;
var bsTo = null;
if (this.eval.isArrayParameter (++this.eval.iToken)) {
coordTo = this.eval.getPointArray (this.eval.iToken, -1);
} else if (this.tokAt (this.eval.iToken) != 1141899265) {
bsTo = this.atomExpressionAt (this.eval.iToken);
}var bsSubset = null;
var isSmiles = false;
var strSmiles = null;
var bs = J.util.BSUtil.copy (bsFrom);
if (bsTo != null) bs.or (bsTo);
var isToSubsetOfFrom = (coordTo == null && bsTo != null && bs.equals (bsFrom));
var isFrames = isToSubsetOfFrom;
for (var i = this.eval.iToken + 1; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 4115:
isFrames = true;
break;
case 135267336:
isSmiles = true;
case 135267335:
strSmiles = this.stringParameter (++i);
break;
case 1678770178:
isFlexFit = true;
doRotate = true;
strSmiles = this.parameterAsString (++i);
if (strSmiles.equalsIgnoreCase ("SMILES")) {
isSmiles = true;
strSmiles = this.viewer.getSmiles (0, 0, bsFrom, false, false, false, false);
}break;
case 3:
case 2:
nSeconds = Math.abs (this.floatParameter (i));
if (nSeconds > 0) doAnimate = true;
break;
case 269484080:
break;
case 3158024:
bsSubset = this.atomExpressionAt (++i);
i = this.eval.iToken;
break;
case 10:
case 1048577:
if (vQuatSets != null) this.invArg ();
bsAtoms1 = this.atomExpressionAt (this.eval.iToken);
var tok = (isToSubsetOfFrom ? 0 : this.tokAt (this.eval.iToken + 1));
bsAtoms2 = (coordTo == null && this.eval.isArrayParameter (this.eval.iToken + 1) ? null : (tok == 10 || tok == 1048577 ? this.atomExpressionAt (++this.eval.iToken) : J.util.BSUtil.copy (bsAtoms1)));
if (bsSubset != null) {
bsAtoms1.and (bsSubset);
if (bsAtoms2 != null) bsAtoms2.and (bsSubset);
}if (bsAtoms2 == null) coordTo = this.eval.getPointArray (++this.eval.iToken, -1);
 else bsAtoms2.and (bsTo);
if (vAtomSets == null) vAtomSets =  new JU.List ();
vAtomSets.addLast ([bsAtoms1, bsAtoms2]);
i = this.eval.iToken;
break;
case 7:
if (vAtomSets != null) this.invArg ();
isQuaternion = true;
data1 = this.getQuaternionArray ((this.eval.theToken).getList (), 1073742001);
this.getToken (++i);
data2 = this.getQuaternionArray ((this.eval.theToken).getList (), 1073742001);
if (vQuatSets == null) vQuatSets =  new JU.List ();
vQuatSets.addLast ([data1, data2]);
break;
case 1073742077:
isQuaternion = true;
break;
case 135266320:
case 1141899265:
isQuaternion = false;
break;
case 528432:
doRotate = true;
break;
case 4160:
doTranslate = true;
break;
default:
this.invArg ();
}
}
if (this.chk) return;
if (isFrames) nSeconds = 0;
if (Float.isNaN (nSeconds) || nSeconds < 0) nSeconds = 1;
 else if (!doRotate && !doTranslate) doRotate = doTranslate = true;
doAnimate = (nSeconds != 0);
var isAtoms = (!isQuaternion && strSmiles == null || coordTo != null);
if (vAtomSets == null && vQuatSets == null) {
if (bsSubset == null) {
bsAtoms1 = (isAtoms ? this.viewer.getAtomBitSet ("spine") :  new JU.BS ());
if (bsAtoms1.nextSetBit (0) < 0) {
bsAtoms1 = bsFrom;
bsAtoms2 = bsTo;
} else {
bsAtoms2 = J.util.BSUtil.copy (bsAtoms1);
bsAtoms1.and (bsFrom);
bsAtoms2.and (bsTo);
}} else {
bsAtoms1 = J.util.BSUtil.copy (bsFrom);
bsAtoms2 = J.util.BSUtil.copy (bsTo);
bsAtoms1.and (bsSubset);
bsAtoms2.and (bsSubset);
bsAtoms1.and (bsFrom);
bsAtoms2.and (bsTo);
}vAtomSets =  new JU.List ();
vAtomSets.addLast ([bsAtoms1, bsAtoms2]);
}var bsFrames;
if (isFrames) {
var bsModels = this.viewer.getModelBitSet (bsFrom, false);
bsFrames =  new Array (bsModels.cardinality ());
for (var i = 0, iModel = bsModels.nextSetBit (0); iModel >= 0; iModel = bsModels.nextSetBit (iModel + 1), i++) bsFrames[i] = this.viewer.getModelUndeletedAtomsBitSet (iModel);

} else {
bsFrames = [bsFrom];
}for (var iFrame = 0; iFrame < bsFrames.length; iFrame++) {
bsFrom = bsFrames[iFrame];
var retStddev =  Clazz.newFloatArray (2, 0);
var q = null;
var vQ =  new JU.List ();
var centerAndPoints = null;
var vAtomSets2 = (isFrames ?  new JU.List () : vAtomSets);
for (var i = 0; i < vAtomSets.size (); ++i) {
var bss = vAtomSets.get (i);
if (isFrames) vAtomSets2.addLast (bss = [J.util.BSUtil.copy (bss[0]), bss[1]]);
bss[0].and (bsFrom);
}
var center = null;
var translation = null;
if (isAtoms) {
if (coordTo != null) {
vAtomSets2.clear ();
vAtomSets2.addLast ([bsAtoms1, coordTo]);
}try {
centerAndPoints = this.viewer.getCenterAndPoints (vAtomSets2, true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.invArg ();
} else {
throw e;
}
}
q = J.util.Measure.calculateQuaternionRotation (centerAndPoints, retStddev, true);
var r0 = (Float.isNaN (retStddev[1]) ? NaN : Math.round (retStddev[0] * 100) / 100);
var r1 = (Float.isNaN (retStddev[1]) ? NaN : Math.round (retStddev[1] * 100) / 100);
this.showString ("RMSD " + r0 + " --> " + r1 + " Angstroms");
} else if (isQuaternion) {
if (vQuatSets == null) {
for (var i = 0; i < vAtomSets2.size (); i++) {
var bss = vAtomSets2.get (i);
data1 = this.viewer.getAtomGroupQuaternions (bss[0], 2147483647);
data2 = this.viewer.getAtomGroupQuaternions (bss[1], 2147483647);
for (var j = 0; j < data1.length && j < data2.length; j++) {
vQ.addLast (data2[j].div (data1[j]));
}
}
} else {
for (var j = 0; j < data1.length && j < data2.length; j++) {
vQ.addLast (data2[j].div (data1[j]));
}
}retStddev[0] = 0;
data1 = vQ.toArray ( new Array (vQ.size ()));
q = J.util.Quaternion.sphereMean (data1, retStddev, 0.0001);
this.showString ("RMSD = " + retStddev[0] + " degrees");
} else {
var m4 =  new JU.M4 ();
center =  new JU.P3 ();
if (isFlexFit) {
var list;
if (bsFrom == null || bsTo == null || (list = this.getFlexFitList (bsFrom, bsTo, strSmiles, !isSmiles)) == null) return;
this.viewer.setDihedrals (list, null, 1);
}var stddev = this.getSmilesCorrelation (bsFrom, bsTo, strSmiles, null, null, m4, null, !isSmiles, false, null, center);
if (Float.isNaN (stddev)) this.invArg ();
if (doTranslate) {
translation =  new JU.V3 ();
m4.get (translation);
}if (doRotate) {
var m3 =  new JU.M3 ();
m4.getRotationScale (m3);
q = J.util.Quaternion.newM (m3);
}this.showString ("RMSD = " + stddev + " Angstroms");
}if (centerAndPoints != null) center = centerAndPoints[0][0];
if (center == null) {
centerAndPoints = this.viewer.getCenterAndPoints (vAtomSets2, true);
center = centerAndPoints[0][0];
}var pt1 =  new JU.P3 ();
var endDegrees = NaN;
if (doTranslate) {
if (translation == null) translation = JU.V3.newVsub (centerAndPoints[1][0], center);
endDegrees = 1e10;
}if (doRotate) {
if (q == null) this.eval.evalError ("option not implemented", null);
pt1.add2 (center, q.getNormal ());
endDegrees = q.getTheta ();
if (endDegrees == 0 && doTranslate) {
if (translation.length () > 0.01) endDegrees = 1e10;
 else doRotate = doTranslate = doAnimate = false;
}}if (Float.isNaN (endDegrees) || Float.isNaN (pt1.x)) continue;
var ptsB = null;
if (doRotate && doTranslate && nSeconds != 0) {
var ptsA = this.viewer.getAtomPointVector (bsFrom);
var m4 = J.script.ScriptMathProcessor.getMatrix4f (q.getMatrix (), translation);
ptsB = J.util.Measure.transformPoints (ptsA, m4, center);
}if (!this.eval.useThreads ()) doAnimate = false;
if (this.viewer.rotateAboutPointsInternal (this.eval, center, pt1, endDegrees / nSeconds, endDegrees, doAnimate, bsFrom, translation, ptsB, null) && doAnimate && this.eval.isJS) throw  new J.script.ScriptInterruption (this.eval, "compare", 1);
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "configuration", 
($fz = function () {
var bsAtoms;
if (this.slen == 1) {
bsAtoms = this.viewer.setConformation ();
this.viewer.addStateScriptRet ("select", null, this.viewer.getSelectionSet (false), null, "configuration", true, false);
} else {
var n = this.intParameter (this.eval.checkLast (1));
if (this.chk) return;
bsAtoms = this.viewer.getConformation (this.viewer.getCurrentModelIndex (), n - 1, true);
this.viewer.addStateScript ("configuration " + n + ";", true, false);
}if (this.chk) return;
this.setShapeProperty (1, "type", Integer.$valueOf (30720));
this.eval.setShapeSizeBs (1, 0, bsAtoms);
this.viewer.autoHbond (bsAtoms, bsAtoms, true);
this.viewer.select (bsAtoms, false, 0, this.eval.tQuiet);
}, $fz.isPrivate = true, $fz));
$_M(c$, "measure", 
($fz = function () {
var eval = this.eval;
var id = null;
var pt = 1;
var colix = 0;
var offset = null;
if (this.slen == 2) switch (this.tokAt (1)) {
case 1048588:
this.setShapeProperty (6, "hideAll", Boolean.TRUE);
return;
case 12291:
if (!this.chk) this.viewer.clearAllMeasurements ();
return;
}
this.viewer.loadShape (6);
switch (this.tokAt (1)) {
case 135267335:
var smarts = this.stringParameter (this.slen == 3 ? 2 : 4);
if (this.chk) return;
var atoms = this.viewer.modelSet.atoms;
var atomCount = this.viewer.getAtomCount ();
var maps = this.viewer.getSmilesMatcher ().getCorrelationMaps (smarts, atoms, atomCount, this.viewer.getSelectionSet (false), true, false);
if (maps == null) return;
this.setShapeProperty (6, "maps", maps);
return;
}
switch (this.slen) {
case 2:
switch (this.getToken (pt).tok) {
case 0:
case 1048589:
this.viewer.loadShape (6);
this.setShapeProperty (6, "hideAll", Boolean.FALSE);
return;
case 1073742001:
if (!this.chk) eval.showStringPrint (this.viewer.getMeasurementInfoAsString (), false);
return;
case 4:
this.setShapeProperty (6, "setFormats", this.stringParameter (1));
return;
}
eval.errorStr (24, "ON, OFF, DELETE");
break;
case 3:
switch (this.getToken (1).tok) {
case 12291:
if (this.getToken (2).tok == 1048579) {
if (!this.chk) this.viewer.clearAllMeasurements ();
} else {
var i = this.intParameter (2) - 1;
if (!this.chk) this.viewer.deleteMeasurement (i);
}return;
}
}
var nAtoms = 0;
var expressionCount = 0;
var modelIndex = -1;
var atomIndex = -1;
var ptFloat = -1;
var countPlusIndexes =  Clazz.newIntArray (5, 0);
var rangeMinMax = [3.4028235E38, 3.4028235E38];
var isAll = false;
var isAllConnected = false;
var isNotConnected = false;
var isRange = true;
var rd = null;
var intramolecular = null;
var tokAction = 269484114;
var strFormat = null;
var font = null;
var points =  new JU.List ();
var bs =  new JU.BS ();
var value = null;
var tickInfo = null;
var nBitSets = 0;
var mad = 0;
for (var i = 1; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 1074790550:
if (i != 1) this.invArg ();
id = eval.optParameterAsString (++i);
continue;
case 1073741824:
eval.errorStr (24, "ALL, ALLCONNECTED, DELETE");
break;
default:
this.error (15);
break;
case 269484144:
if (this.tokAt (i + 1) != 135266310) this.invArg ();
i++;
isNotConnected = true;
break;
case 135266310:
case 1073741834:
case 1048579:
isAllConnected = (eval.theTok == 1073741834);
atomIndex = -1;
isAll = true;
if (isAllConnected && isNotConnected) this.invArg ();
break;
case 1766856708:
colix = J.util.C.getColix (eval.getArgbParam (++i));
i = eval.iToken;
break;
case 1073742066:
if (eval.isPoint3f (++i)) {
var p = this.getPoint3f (i, false);
offset = [1, p.x, p.y, p.z, 0, 0, 0];
} else {
offset = eval.floatParameterSet (i, 7, 7);
}i = eval.iToken;
break;
case 1666189314:
case 1073741916:
mad = Clazz.floatToInt ((eval.theTok == 1666189314 ? 2000 : 1000) * this.floatParameter (++i));
if (id != null && mad <= 0) mad = -1;
break;
case 3:
if (rd != null) this.invArg ();
isAll = true;
isRange = true;
ptFloat = (ptFloat + 1) % 2;
rangeMinMax[ptFloat] = this.floatParameter (i);
break;
case 12291:
if (tokAction != 269484114) this.invArg ();
tokAction = 12291;
break;
case 4114:
var fontsize = this.floatParameter (++i);
var fontface = this.parameterAsString (++i);
var fontstyle = this.parameterAsString (++i);
if (!this.chk) font = this.viewer.getFont3D (fontface, fontstyle, fontsize);
break;
case 2:
var iParam = this.intParameter (i);
if (isAll) {
isRange = true;
ptFloat = (ptFloat + 1) % 2;
rangeMinMax[ptFloat] = iParam;
} else {
atomIndex = this.viewer.getAtomIndexFromAtomNumber (iParam);
if (!this.chk && atomIndex < 0) return;
if (value != null) this.invArg ();
if ((countPlusIndexes[0] = ++nAtoms) > 4) this.error (2);
countPlusIndexes[nAtoms] = atomIndex;
}break;
case 1095761935:
modelIndex = this.intParameter (++i);
break;
case 1048588:
if (tokAction != 269484114) this.invArg ();
tokAction = 1048588;
break;
case 1048589:
if (tokAction != 269484114) this.invArg ();
tokAction = 1048589;
break;
case 1073742114:
isAll = true;
isRange = true;
atomIndex = -1;
break;
case 1073741989:
case 1073741990:
intramolecular = Boolean.$valueOf (eval.theTok == 1073741989);
isAll = true;
isNotConnected = (eval.theTok == 1073741990);
break;
case 1649412120:
if (ptFloat >= 0) this.invArg ();
rd = eval.encodeRadiusParameter (i, false, true);
rd.values = rangeMinMax;
i = eval.iToken;
isNotConnected = true;
isAll = true;
intramolecular = Boolean.$valueOf (false);
if (nBitSets == 1) {
nBitSets++;
nAtoms++;
var bs2 = J.util.BSUtil.copy (bs);
J.util.BSUtil.invertInPlace (bs2, this.viewer.getAtomCount ());
bs2.and (this.viewer.getAtomsWithinRadius (5, bs, false, null));
points.addLast (bs2);
}break;
case 10:
case 1048577:
case 1048586:
case 8:
case 1048583:
if (eval.theTok == 10 || eval.theTok == 1048577) nBitSets++;
if (atomIndex >= 0) this.invArg ();
eval.expressionResult = Boolean.FALSE;
value = this.centerParameter (i);
if (Clazz.instanceOf (eval.expressionResult, JU.BS)) {
value = bs = eval.expressionResult;
if (!this.chk && bs.length () == 0) return;
}if (Clazz.instanceOf (value, JU.P3)) {
var v =  new J.util.Point3fi ();
v.setT (value);
v.modelIndex = modelIndex;
value = v;
}if ((nAtoms = ++expressionCount) > 4) this.error (2);
i = eval.iToken;
points.addLast (value);
break;
case 4:
strFormat = this.stringParameter (i);
break;
case 1073742164:
tickInfo = eval.checkTicks (i, false, true, true);
i = eval.iToken;
tokAction = 1060866;
break;
}
}
if (rd != null && (ptFloat >= 0 || nAtoms != 2) || nAtoms < 2 && id == null && (tickInfo == null || nAtoms == 1)) this.error (2);
if (strFormat != null && strFormat.indexOf (nAtoms + ":") != 0) strFormat = nAtoms + ":" + strFormat;
if (isRange) {
if (rangeMinMax[1] < rangeMinMax[0]) {
rangeMinMax[1] = rangeMinMax[0];
rangeMinMax[0] = (rangeMinMax[1] == 3.4028235E38 ? 3.4028235E38 : -200);
}}if (this.chk) return;
if (value != null || tickInfo != null) {
if (rd == null) rd =  new J.atomdata.RadiusData (rangeMinMax, 0, null, null);
if (value == null) tickInfo.id = "default";
if (value != null && strFormat != null && tokAction == 269484114) tokAction = 1060866;
var text = null;
if (font != null) text = (J.api.Interface.getOptionInterface ("modelset.Text")).newLabel (this.viewer.getGraphicsData (), font, "", colix, 0, 0, 0, null);
if (text != null) text.pymolOffset = offset;
this.setShapeProperty (6, "measure", this.newMeasurementData (id, points).set (tokAction, null, rd, strFormat, null, tickInfo, isAllConnected, isNotConnected, intramolecular, isAll, mad, colix, text));
return;
}var propertyValue = (id == null ? countPlusIndexes : id);
switch (tokAction) {
case 12291:
this.setShapeProperty (6, "delete", propertyValue);
break;
case 1048589:
this.setShapeProperty (6, "show", propertyValue);
break;
case 1048588:
this.setShapeProperty (6, "hide", propertyValue);
break;
default:
this.setShapeProperty (6, (strFormat == null ? "toggle" : "toggleOn"), propertyValue);
if (strFormat != null) this.setShapeProperty (6, "setFormats", strFormat);
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "getFlexFitList", 
($fz = function (bs1, bs2, smiles1, isSmarts) {
var mapSet = JU.AU.newInt2 (2);
this.getSmilesCorrelation (bs1, bs2, smiles1, null, null, null, null, isSmarts, false, mapSet, null);
if (mapSet[0] == null) return null;
var bondMap1 = this.viewer.getDihedralMap (mapSet[0]);
var bondMap2 = (bondMap1 == null ? null : this.viewer.getDihedralMap (mapSet[1]));
if (bondMap2 == null || bondMap2.length != bondMap1.length) return null;
var angles =  Clazz.newFloatArray (bondMap1.length, 3, 0);
var atoms = this.viewer.modelSet.atoms;
J.scriptext.ScriptExt.getTorsions (atoms, bondMap2, angles, 0);
J.scriptext.ScriptExt.getTorsions (atoms, bondMap1, angles, 1);
var data =  Clazz.newFloatArray (bondMap1.length * 6, 0);
for (var i = 0, pt = 0; i < bondMap1.length; i++) {
var map = bondMap1[i];
data[pt++] = map[0];
data[pt++] = map[1];
data[pt++] = map[2];
data[pt++] = map[3];
data[pt++] = angles[i][0];
data[pt++] = angles[i][1];
}
return data;
}, $fz.isPrivate = true, $fz), "JU.BS,JU.BS,~S,~B");
c$.getTorsions = $_M(c$, "getTorsions", 
($fz = function (atoms, bondMap, diff, pt) {
for (var i = bondMap.length; --i >= 0; ) {
var map = bondMap[i];
var v = J.util.Measure.computeTorsion (atoms[map[0]], atoms[map[1]], atoms[map[2]], atoms[map[3]], true);
if (pt == 1) {
if (v - diff[i][0] > 180) v -= 360;
 else if (v - diff[i][0] <= -180) v += 360;
}diff[i][pt] = v;
}
}, $fz.isPrivate = true, $fz), "~A,~A,~A,~N");
$_M(c$, "getSmilesCorrelation", 
($fz = function (bsA, bsB, smiles, ptsA, ptsB, m4, vReturn, isSmarts, asMap, mapSet, center) {
var tolerance = (mapSet == null ? 0.1 : 3.4028235E38);
try {
if (ptsA == null) {
ptsA =  new JU.List ();
ptsB =  new JU.List ();
}var m =  new JU.M4 ();
var c =  new JU.P3 ();
var atoms = this.viewer.modelSet.atoms;
var atomCount = this.viewer.getAtomCount ();
var maps = this.viewer.getSmilesMatcher ().getCorrelationMaps (smiles, atoms, atomCount, bsA, isSmarts, true);
if (maps == null) this.eval.evalError (this.viewer.getSmilesMatcher ().getLastException (), null);
if (maps.length == 0) return NaN;
var mapA = maps[0];
for (var i = 0; i < mapA.length; i++) ptsA.addLast (atoms[mapA[i]]);

maps = this.viewer.getSmilesMatcher ().getCorrelationMaps (smiles, atoms, atomCount, bsB, isSmarts, false);
if (maps == null) this.eval.evalError (this.viewer.getSmilesMatcher ().getLastException (), null);
if (maps.length == 0) return NaN;
if (asMap) {
for (var i = 0; i < maps.length; i++) for (var j = 0; j < maps[i].length; j++) ptsB.addLast (atoms[maps[i][j]]);


return 0;
}var lowestStdDev = 3.4028235E38;
var mapB = null;
for (var i = 0; i < maps.length; i++) {
ptsB.clear ();
for (var j = 0; j < maps[i].length; j++) ptsB.addLast (atoms[maps[i][j]]);

var stddev = J.util.Measure.getTransformMatrix4 (ptsA, ptsB, m, c);
J.util.Logger.info ("getSmilesCorrelation stddev=" + stddev);
if (vReturn != null) {
if (stddev < tolerance) {
var bs =  new JU.BS ();
for (var j = 0; j < maps[i].length; j++) bs.set (maps[i][j]);

vReturn.addLast (bs);
}}if (stddev < lowestStdDev) {
mapB = maps[i];
if (m4 != null) m4.setM (m);
if (center != null) center.setT (c);
lowestStdDev = stddev;
}}
if (mapSet != null) {
mapSet[0] = mapA;
mapSet[1] = mapB;
}ptsB.clear ();
for (var i = 0; i < mapB.length; i++) ptsB.addLast (atoms[mapB[i]]);

return lowestStdDev;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.eval.evalError (e.toString (), null);
return 0;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "JU.BS,JU.BS,~S,JU.List,JU.List,JU.M4,JU.List,~B,~B,~A,JU.P3");
$_V(c$, "getSmilesMatches", 
function (pattern, smiles, bsSelected, bsMatch3D, isSmarts, asOneBitset) {
if (this.chk) {
if (asOneBitset) return  new JU.BS ();
return ["({})"];
}if (pattern.length == 0) {
var isBioSmiles = (!asOneBitset);
var ret = this.viewer.getSmiles (0, 0, bsSelected, isBioSmiles, false, true, true);
if (ret == null) this.eval.evalError (this.viewer.getSmilesMatcher ().getLastException (), null);
return ret;
}var asAtoms = true;
var b;
if (bsMatch3D == null) {
asAtoms = (smiles == null);
if (asAtoms) b = this.viewer.getSmilesMatcher ().getSubstructureSetArray (pattern, this.viewer.modelSet.atoms, this.viewer.getAtomCount (), bsSelected, null, isSmarts, false);
 else b = this.viewer.getSmilesMatcher ().find (pattern, smiles, isSmarts, false);
if (b == null) {
this.eval.showStringPrint (this.viewer.getSmilesMatcher ().getLastException (), false);
if (!asAtoms && !isSmarts) return Integer.$valueOf (-1);
return "?";
}} else {
var vReturn =  new JU.List ();
var stddev = this.getSmilesCorrelation (bsMatch3D, bsSelected, pattern, null, null, null, vReturn, isSmarts, false, null, null);
if (Float.isNaN (stddev)) {
if (asOneBitset) return  new JU.BS ();
return [];
}this.showString ("RMSD " + stddev + " Angstroms");
b = vReturn.toArray ( new Array (vReturn.size ()));
}if (asOneBitset) {
var bs =  new JU.BS ();
for (var j = 0; j < b.length; j++) bs.or (b[j]);

if (asAtoms) return bs;
if (!isSmarts) return Integer.$valueOf (bs.cardinality ());
var iarray =  Clazz.newIntArray (bs.cardinality (), 0);
var pt = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) iarray[pt++] = i + 1;

return iarray;
}var matches =  new Array (b.length);
for (var j = 0; j < b.length; j++) matches[j] = (asAtoms ? J.util.Escape.eBS (b[j]) : J.util.Escape.eBond (b[j]));

return matches;
}, "~S,~S,JU.BS,JU.BS,~B,~B");
$_V(c$, "evaluate", 
function (mp, op, args, tok) {
switch (tok) {
case 135266826:
case 135266819:
case 135266821:
case 135266318:
case 135266820:
case 135266822:
return this.evaluateMath (mp, args, tok);
case 1276118017:
case 1276117504:
case 1276117507:
case 1276117508:
case 1276117511:
case 1276383749:
case 1276383249:
return this.evaluateList (mp, op.intValue, args);
case 135266306:
case 269484096:
return this.evaluateArray (mp, args, tok == 269484096);
case 135266307:
case 135270418:
return this.evaluateQuaternion (mp, args, tok);
case 1276118529:
return this.evaluateBin (mp, args);
case 1276117514:
case 1276117515:
return this.evaluateRowCol (mp, args, tok);
case 1766856708:
return this.evaluateColor (mp, args);
case 135270405:
return this.evaluateCompare (mp, args);
case 135266310:
return this.evaluateConnected (mp, args);
case 135267329:
return this.evaluateCross (mp, args);
case 135270407:
return this.evaluateData (mp, args);
case 1276118018:
case 1276117505:
if (op.tok == 269484241) return this.evaluateDot (mp, args, tok, op.intValue);
case 135266305:
case 1746538509:
return this.evaluateMeasure (mp, args, op.tok);
case 1229984263:
case 135271426:
return this.evaluateLoad (mp, args, tok);
case 1276118531:
return this.evaluateFind (mp, args);
case 135368713:
return this.evaluateUserFunction (mp, op.value, args, op.intValue, op.tok == 269484241);
case 1288701960:
case 1826248715:
return this.evaluateLabel (mp, op.intValue, args);
case 135270410:
return this.evaluateGetProperty (mp, args);
case 137363468:
return this.evaluateHelix (mp, args);
case 135267841:
case 135266319:
case 135267842:
return this.evaluatePlane (mp, args, tok);
case 135287308:
case 135271429:
return this.evaluateScript (mp, args, tok);
case 1276117506:
case 1276117510:
case 1276117512:
return this.evaluateString (mp, op.intValue, args);
case 135266320:
return this.evaluatePoint (mp, args);
case 135304707:
return this.evaluatePrompt (mp, args);
case 135267332:
return this.evaluateRandom (mp, args);
case 1276118019:
return this.evaluateReplace (mp, args);
case 135267335:
case 135267336:
case 1238369286:
return this.evaluateSubstructure (mp, args, tok);
case 135270423:
return this.evaluateCache (mp, args);
case 1276121113:
return this.evaluateModulation (mp, args);
case 1276117011:
case 1276117012:
return this.evaluateSort (mp, args, tok);
case 1297090050:
return this.evaluateSymop (mp, args, op.tok == 269484241);
case 1276117016:
return this.evaluateTensor (mp, args);
case 135266325:
return this.evaluateWithin (mp, args);
case 135402505:
return this.evaluateContact (mp, args);
case 135270422:
return this.evaluateWrite (mp, args);
}
return false;
}, "J.script.ScriptMathProcessor,J.script.T,~A,~N");
$_M(c$, "evaluateModulation", 
($fz = function (mp, args) {
var type = "D";
var t = NaN;
var t456 = null;
var pt = -1;
switch (args.length) {
case 0:
break;
case 1:
pt = 0;
break;
case 2:
type = J.script.SV.sValue (args[0]).toUpperCase ();
t = J.script.SV.fValue (args[1]);
break;
default:
return false;
}
if (pt >= 0) {
if (args[pt].tok == 8) t456 = args[pt].value;
 else t = J.script.SV.fValue (args[pt]);
}if (t456 == null && t < 1e6) t456 = JU.P3.new3 (t, t, t);
var bs = J.script.SV.getBitSet (mp.getX (), false);
return mp.addXList (this.viewer.getModulationList (bs, type, t456));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateTensor", 
($fz = function (mp, args) {
if (args.length > 2) return false;
var bs = J.script.SV.getBitSet (mp.getX (), false);
var tensorType = (args.length == 0 ? null : J.script.SV.sValue (args[0]).toLowerCase ());
var calc = this.viewer.getNMRCalculation ();
if ("unique".equals (tensorType)) return mp.addXBs (calc.getUniqueTensorSet (bs));
var infoType = (args.length < 2 ? null : J.script.SV.sValue (args[1]).toLowerCase ());
return mp.addXList (calc.getTensorInfo (tensorType, infoType, bs));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateCache", 
($fz = function (mp, args) {
if (args.length > 0) return false;
return mp.addXMap (this.viewer.cacheList ());
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateCompare", 
($fz = function (mp, args) {
if (args.length < 2 || args.length > 5) return false;
var stddev;
var sOpt = J.script.SV.sValue (args[args.length - 1]);
var isStdDev = sOpt.equalsIgnoreCase ("stddev");
var isIsomer = sOpt.equalsIgnoreCase ("ISOMER");
var isBonds = sOpt.equalsIgnoreCase ("BONDS");
var isSmiles = (!isIsomer && args.length > (isStdDev ? 3 : 2));
var bs1 = (args[0].tok == 10 ? args[0].value : null);
var bs2 = (args[1].tok == 10 ? args[1].value : null);
var smiles1 = (bs1 == null ? J.script.SV.sValue (args[0]) : "");
var smiles2 = (bs2 == null ? J.script.SV.sValue (args[1]) : "");
var m =  new JU.M4 ();
stddev = NaN;
var ptsA;
var ptsB;
if (isSmiles) {
if (bs1 == null || bs2 == null) return false;
}if (isBonds) {
if (args.length != 4) return false;
smiles1 = J.script.SV.sValue (args[2]);
isSmiles = smiles1.equalsIgnoreCase ("SMILES");
if (isSmiles) smiles1 = this.viewer.getSmiles (0, 0, bs1, false, false, false, false);
var data = this.getFlexFitList (bs1, bs2, smiles1, !isSmiles);
return (data == null ? mp.addXStr ("") : mp.addXAF (data));
}if (isIsomer) {
if (args.length != 3) return false;
if (bs1 == null && bs2 == null) return mp.addXStr (this.viewer.getSmilesMatcher ().getRelationship (smiles1, smiles2).toUpperCase ());
var mf1 = (bs1 == null ? this.viewer.getSmilesMatcher ().getMolecularFormula (smiles1, false) : J.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, bs1, false));
var mf2 = (bs2 == null ? this.viewer.getSmilesMatcher ().getMolecularFormula (smiles2, false) : J.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, bs2, false));
if (!mf1.equals (mf2)) return mp.addXStr ("NONE");
if (bs1 != null) smiles1 = this.getSmilesMatches ("", null, bs1, null, false, true);
var check;
if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual (smiles2, smiles1) > 0);
} else {
check = ((this.getSmilesMatches (smiles1, null, bs2, null, false, true)).nextSetBit (0) >= 0);
}if (!check) {
var s = smiles1 + smiles2;
if (s.indexOf ("/") >= 0 || s.indexOf ("\\") >= 0 || s.indexOf ("@") >= 0) {
if (smiles1.indexOf ("@") >= 0 && (bs2 != null || smiles2.indexOf ("@") >= 0)) {
smiles1 = this.viewer.getSmilesMatcher ().reverseChirality (smiles1);
if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual (smiles1, smiles2) > 0);
} else {
check = ((this.getSmilesMatches (smiles1, null, bs2, null, false, true)).nextSetBit (0) >= 0);
}if (check) return mp.addXStr ("ENANTIOMERS");
}if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual ("/nostereo/" + smiles2, smiles1) > 0);
} else {
var ret = this.getSmilesMatches ("/nostereo/" + smiles1, null, bs2, null, false, true);
check = ((ret).nextSetBit (0) >= 0);
}if (check) return mp.addXStr ("DIASTERIOMERS");
}return mp.addXStr ("CONSTITUTIONAL ISOMERS");
}if (bs1 == null || bs2 == null) return mp.addXStr ("IDENTICAL");
stddev = this.getSmilesCorrelation (bs1, bs2, smiles1, null, null, null, null, false, false, null, null);
return mp.addXStr (stddev < 0.2 ? "IDENTICAL" : "IDENTICAL or CONFORMATIONAL ISOMERS (RMSD=" + stddev + ")");
} else if (isSmiles) {
ptsA =  new JU.List ();
ptsB =  new JU.List ();
sOpt = J.script.SV.sValue (args[2]);
var isMap = sOpt.equalsIgnoreCase ("MAP");
isSmiles = (sOpt.equalsIgnoreCase ("SMILES"));
var isSearch = (isMap || sOpt.equalsIgnoreCase ("SMARTS"));
if (isSmiles || isSearch) sOpt = (args.length > 3 ? J.script.SV.sValue (args[3]) : null);
if (sOpt == null) return false;
stddev = this.getSmilesCorrelation (bs1, bs2, sOpt, ptsA, ptsB, m, null, !isSmiles, isMap, null, null);
if (isMap) {
var nAtoms = ptsA.size ();
if (nAtoms == 0) return mp.addXStr ("");
var nMatch = Clazz.doubleToInt (ptsB.size () / nAtoms);
var ret =  new JU.List ();
for (var i = 0, pt = 0; i < nMatch; i++) {
var a = JU.AU.newInt2 (nAtoms);
ret.addLast (a);
for (var j = 0; j < nAtoms; j++, pt++) a[j] = [(ptsA.get (j)).index, (ptsB.get (pt)).index];

}
return mp.addXList (ret);
}} else {
ptsA = this.eval.getPointVector (args[0], 0);
ptsB = this.eval.getPointVector (args[1], 0);
if (ptsA != null && ptsB != null) stddev = J.util.Measure.getTransformMatrix4 (ptsA, ptsB, m, null);
}return (isStdDev || Float.isNaN (stddev) ? mp.addXFloat (stddev) : mp.addXM4 (m));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateContact", 
($fz = function (mp, args) {
if (args.length < 1 || args.length > 3) return false;
var i = 0;
var distance = 100;
var tok = args[0].tok;
switch (tok) {
case 3:
case 2:
distance = J.script.SV.fValue (args[i++]);
break;
case 10:
break;
default:
return false;
}
if (i == args.length || !(Clazz.instanceOf (args[i].value, JU.BS))) return false;
var bsA = J.util.BSUtil.copy (J.script.SV.bsSelectVar (args[i++]));
if (this.chk) return mp.addXBs ( new JU.BS ());
var bsB = (i < args.length ? J.util.BSUtil.copy (J.script.SV.bsSelectVar (args[i])) : null);
var rd =  new J.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? J.atomdata.RadiusData.EnumType.FACTOR : J.atomdata.RadiusData.EnumType.OFFSET), J.constant.EnumVdw.AUTO);
bsB = this.setContactBitSets (bsA, bsB, true, NaN, rd, false);
bsB.or (bsA);
return mp.addXBs (bsB);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateSort", 
($fz = function (mp, args, tok) {
if (args.length > 1) return false;
if (tok == 1276117011) {
var n = (args.length == 0 ? 0 : args[0].asInt ());
return mp.addXVar (mp.getX ().sortOrReverse (n));
}var x = mp.getX ();
var match = (args.length == 0 ? null : args[0]);
if (x.tok == 4) {
var n = 0;
var s = J.script.SV.sValue (x);
if (match == null) return mp.addXInt (0);
var m = J.script.SV.sValue (match);
for (var i = 0; i < s.length; i++) {
var pt = s.indexOf (m, i);
if (pt < 0) break;
n++;
i = pt;
}
return mp.addXInt (n);
}var counts =  new JU.List ();
var last = null;
var count = null;
var xList = J.script.SV.getVariable (x.value).sortOrReverse (0).getList ();
if (xList == null) return (match == null ? mp.addXStr ("") : mp.addXInt (0));
for (var i = 0, nLast = xList.size (); i <= nLast; i++) {
var a = (i == nLast ? null : xList.get (i));
if (match != null && a != null && !J.script.SV.areEqual (a, match)) continue;
if (J.script.SV.areEqual (a, last)) {
count.intValue++;
continue;
} else if (last != null) {
var y =  new JU.List ();
y.addLast (last);
y.addLast (count);
counts.addLast (J.script.SV.getVariableList (y));
}count = J.script.SV.newI (1);
last = a;
}
if (match == null) return mp.addXVar (J.script.SV.getVariableList (counts));
if (counts.isEmpty ()) return mp.addXInt (0);
return mp.addXVar (counts.get (0).getList ().get (1));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateSymop", 
($fz = function (mp, args, haveBitSet) {
if (args.length == 0) return false;
var x1 = (haveBitSet ? mp.getX () : null);
if (x1 != null && x1.tok != 10) return false;
var bs = (x1 != null ? x1.value : args.length > 2 && args[1].tok == 10 ? args[1].value : this.viewer.getAllAtoms ());
var xyz;
switch (args[0].tok) {
case 4:
xyz = J.script.SV.sValue (args[0]);
break;
case 12:
xyz = args[0].escape ();
break;
default:
xyz = null;
}
var iOp = (xyz == null ? args[0].asInt () : 0);
var pt = (args.length > 1 ? mp.ptValue (args[1], true) : null);
if (args.length == 2 && !Float.isNaN (pt.x)) return mp.addXObj (this.viewer.getSymmetryInfo (bs, xyz, iOp, pt, null, null, 135266320));
var desc = (args.length == 1 ? "" : J.script.SV.sValue (args[args.length - 1])).toLowerCase ();
var tok = 135176;
if (args.length == 1 || desc.equalsIgnoreCase ("matrix")) {
tok = 12;
} else if (desc.equalsIgnoreCase ("array") || desc.equalsIgnoreCase ("list")) {
tok = 1073742001;
} else if (desc.equalsIgnoreCase ("description")) {
tok = 1826248715;
} else if (desc.equalsIgnoreCase ("xyz")) {
tok = 1073741982;
} else if (desc.equalsIgnoreCase ("translation")) {
tok = 1073742178;
} else if (desc.equalsIgnoreCase ("axis")) {
tok = 1073741854;
} else if (desc.equalsIgnoreCase ("plane")) {
tok = 135266319;
} else if (desc.equalsIgnoreCase ("angle")) {
tok = 135266305;
} else if (desc.equalsIgnoreCase ("axispoint")) {
tok = 135266320;
} else if (desc.equalsIgnoreCase ("center")) {
tok = 12289;
}return mp.addXObj (this.viewer.getSymmetryInfo (bs, xyz, iOp, pt, null, desc, tok));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~B");
$_M(c$, "evaluateBin", 
($fz = function (mp, args) {
if (args.length != 3) return false;
var x1 = mp.getX ();
var isListf = (x1.tok == 13);
if (!isListf && x1.tok != 7) return mp.addXVar (x1);
var f0 = J.script.SV.fValue (args[0]);
var f1 = J.script.SV.fValue (args[1]);
var df = J.script.SV.fValue (args[2]);
var data;
if (isListf) {
data = x1.value;
} else {
var list = x1.getList ();
data =  Clazz.newFloatArray (list.size (), 0);
for (var i = list.size (); --i >= 0; ) data[i] = J.script.SV.fValue (list.get (i));

}var nbins = Clazz.doubleToInt (Math.floor ((f1 - f0) / df + 0.01));
var array =  Clazz.newIntArray (nbins, 0);
var nPoints = data.length;
for (var i = 0; i < nPoints; i++) {
var v = data[i];
var bin = Clazz.doubleToInt (Math.floor ((v - f0) / df));
if (bin < 0) bin = 0;
 else if (bin >= nbins) bin = nbins - 1;
array[bin]++;
}
return mp.addXAI (array);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateHelix", 
($fz = function (mp, args) {
if (args.length < 1 || args.length > 5) return false;
var pt = (args.length > 2 ? 3 : 1);
var type = (pt >= args.length ? "array" : J.script.SV.sValue (args[pt]));
var tok = J.script.T.getTokFromName (type);
if (args.length > 2) {
var pta = mp.ptValue (args[0], true);
var ptb = mp.ptValue (args[1], true);
if (args[2].tok != 9) return false;
var dq = J.util.Quaternion.newP4 (args[2].value);
switch (tok) {
case 0:
break;
case 135266320:
case 1073741854:
case 1666189314:
case 135266305:
case 1746538509:
return mp.addXObj (J.util.Measure.computeHelicalAxis (null, tok, pta, ptb, dq));
case 135266306:
var data = J.util.Measure.computeHelicalAxis (null, 1073742001, pta, ptb, dq);
if (data == null) return false;
return mp.addXAS (data);
default:
return mp.addXObj (J.util.Measure.computeHelicalAxis (type, 135176, pta, ptb, dq));
}
} else {
var bs = (Clazz.instanceOf (args[0].value, JU.BS) ? args[0].value : this.eval.compareInt (1095761939, 269484436, args[0].asInt ()));
switch (tok) {
case 135266320:
return mp.addXObj (this.viewer.getHelixData (bs, 135266320));
case 1073741854:
return mp.addXObj (this.viewer.getHelixData (bs, 1073741854));
case 1666189314:
return mp.addXObj (this.viewer.getHelixData (bs, 1666189314));
case 135266305:
return mp.addXFloat ((this.viewer.getHelixData (bs, 135266305)).floatValue ());
case 135176:
case 1746538509:
return mp.addXObj (this.viewer.getHelixData (bs, tok));
case 135266306:
var data = this.viewer.getHelixData (bs, 1073742001);
if (data == null) return false;
return mp.addXAS (data);
}
}return false;
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateDot", 
($fz = function (mp, args, tok, intValue) {
if (args.length != 1) return false;
var x1 = mp.getX ();
var x2 = args[0];
var pt2 = (x2.tok == 7 ? null : mp.ptValue (x2, false));
var plane2 = mp.planeValue (x2);
if (tok == 1276118018) {
var minMax = intValue & 480;
switch (x1.tok) {
case 10:
switch (x2.tok) {
case 10:
var bs = J.script.SV.bsSelectVar (x1);
if (minMax == 32 || minMax == 64) {
var bs2 = J.script.SV.bsSelectVar (x2);
var data =  Clazz.newFloatArray (bs.cardinality (), 0);
var atoms = this.viewer.modelSet.atoms;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
pt2 = atoms[i];
data[i] = (this.eval.getBitsetProperty (bs2, intValue, pt2, plane2, x1.value, null, false, x1.index, false)).floatValue ();
}
return mp.addXAF (data);
}return mp.addXObj (this.eval.getBitsetProperty (bs, intValue, pt2, plane2, x1.value, null, false, x1.index, false));
}
}
}return mp.addXFloat (this.getDistance (mp, x1, x2, tok));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N,~N");
$_M(c$, "getDistance", 
($fz = function (mp, x1, x2, tok) {
var pt1 = mp.ptValue (x1, true);
var plane1 = mp.planeValue (x1);
var pt2 = mp.ptValue (x2, true);
var plane2 = mp.planeValue (x2);
if (tok == 1276117505) {
if (plane1 != null && plane2 != null) return plane1.x * plane2.x + plane1.y * plane2.y + plane1.z * plane2.z + plane1.w * plane2.w;
if (plane1 != null) pt1 = JU.P3.new3 (plane1.x, plane1.y, plane1.z);
if (plane2 != null) pt2 = JU.P3.new3 (plane2.x, plane2.y, plane2.z);
return pt1.x * pt2.x + pt1.y * pt2.y + pt1.z * pt2.z;
}if (plane1 == null) return (plane2 == null ? pt2.distance (pt1) : J.util.Measure.distanceToPlane (plane2, pt1));
return J.util.Measure.distanceToPlane (plane1, pt2);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,J.script.SV,J.script.SV,~N");
$_M(c$, "evaluateMeasure", 
($fz = function (mp, args, tok) {
var nPoints = 0;
switch (tok) {
case 1746538509:
var points =  new JU.List ();
var rangeMinMax = [3.4028235E38, 3.4028235E38];
var strFormat = null;
var units = null;
var isAllConnected = false;
var isNotConnected = false;
var rPt = 0;
var isNull = false;
var rd = null;
var nBitSets = 0;
var vdw = 3.4028235E38;
var asMinArray = false;
var asArray = false;
for (var i = 0; i < args.length; i++) {
switch (args[i].tok) {
case 10:
var bs = args[i].value;
if (bs.length () == 0) isNull = true;
points.addLast (bs);
nPoints++;
nBitSets++;
break;
case 8:
var v =  new J.util.Point3fi ();
v.setT (args[i].value);
points.addLast (v);
nPoints++;
break;
case 2:
case 3:
rangeMinMax[rPt++ % 2] = J.script.SV.fValue (args[i]);
break;
case 4:
var s = J.script.SV.sValue (args[i]);
if (s.equalsIgnoreCase ("vdw") || s.equalsIgnoreCase ("vanderwaals")) vdw = (i + 1 < args.length && args[i + 1].tok == 2 ? args[++i].asInt () : 100) / 100;
 else if (s.equalsIgnoreCase ("notConnected")) isNotConnected = true;
 else if (s.equalsIgnoreCase ("connected")) isAllConnected = true;
 else if (s.equalsIgnoreCase ("minArray")) asMinArray = (nBitSets >= 1);
 else if (s.equalsIgnoreCase ("asArray")) asArray = (nBitSets >= 1);
 else if (JU.PT.isOneOf (s.toLowerCase (), ";nm;nanometers;pm;picometers;angstroms;ang;au;") || s.endsWith ("hz")) units = s.toLowerCase ();
 else strFormat = nPoints + ":" + s;
break;
default:
return false;
}
}
if (nPoints < 2 || nPoints > 4 || rPt > 2 || isNotConnected && isAllConnected) return false;
if (isNull) return mp.addXStr ("");
if (vdw != 3.4028235E38 && (nBitSets != 2 || nPoints != 2)) return mp.addXStr ("");
rd = (vdw == 3.4028235E38 ?  new J.atomdata.RadiusData (rangeMinMax, 0, null, null) :  new J.atomdata.RadiusData (null, vdw, J.atomdata.RadiusData.EnumType.FACTOR, J.constant.EnumVdw.AUTO));
return mp.addXObj ((this.newMeasurementData (null, points)).set (0, null, rd, strFormat, units, null, isAllConnected, isNotConnected, null, true, 0, 0, null).getMeasurements (asArray, asMinArray));
case 135266305:
if ((nPoints = args.length) != 3 && nPoints != 4) return false;
break;
default:
if ((nPoints = args.length) != 2) return false;
}
var pts =  new Array (nPoints);
for (var i = 0; i < nPoints; i++) pts[i] = mp.ptValue (args[i], true);

switch (nPoints) {
case 2:
return mp.addXFloat (pts[0].distance (pts[1]));
case 3:
return mp.addXFloat (J.util.Measure.computeAngleABC (pts[0], pts[1], pts[2], true));
case 4:
return mp.addXFloat (J.util.Measure.computeTorsion (pts[0], pts[1], pts[2], pts[3], true));
}
return false;
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "newMeasurementData", 
($fz = function (id, points) {
return (J.api.Interface.getOptionInterface ("modelset.MeasurementData")).init (id, this.viewer, points);
}, $fz.isPrivate = true, $fz), "~S,JU.List");
$_M(c$, "evaluateUserFunction", 
($fz = function (mp, name, args, tok, isSelector) {
var x1 = null;
if (isSelector) {
x1 = mp.getX ();
if (x1.tok != 10) return false;
}mp.wasX = false;
var params =  new JU.List ();
for (var i = 0; i < args.length; i++) {
params.addLast (args[i]);
}
if (isSelector) {
return mp.addXObj (this.eval.getBitsetProperty (J.script.SV.bsSelectVar (x1), tok, null, null, x1.value, [name, params], false, x1.index, false));
}var $var = this.eval.runFunctionRet (null, name, params, null, true, true, false);
return ($var == null ? false : mp.addXVar ($var));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~S,~A,~N,~B");
$_M(c$, "evaluateFind", 
($fz = function (mp, args) {
if (args.length == 0) return false;
var x1 = mp.getX ();
var sFind = J.script.SV.sValue (args[0]);
var flags = (args.length > 1 && args[1].tok != 1048589 && args[1].tok != 1048588 ? J.script.SV.sValue (args[1]) : "");
var isSequence = sFind.equalsIgnoreCase ("SEQUENCE");
var isSmiles = sFind.equalsIgnoreCase ("SMILES");
var isSearch = sFind.equalsIgnoreCase ("SMARTS");
var isMF = sFind.equalsIgnoreCase ("MF");
if (isSmiles || isSearch || x1.tok == 10) {
var iPt = (isSmiles || isSearch ? 2 : 1);
var bs2 = (iPt < args.length && args[iPt].tok == 10 ? args[iPt++].value : null);
var asBonds = ("bonds".equalsIgnoreCase (J.script.SV.sValue (args[args.length - 1])));
var isAll = (asBonds || args[args.length - 1].tok == 1048589);
var ret = null;
switch (x1.tok) {
case 4:
var smiles = J.script.SV.sValue (x1);
if (bs2 != null) return false;
if (flags.equalsIgnoreCase ("mf")) {
ret = this.viewer.getSmilesMatcher ().getMolecularFormula (smiles, isSearch);
if (ret == null) this.eval.evalError (this.viewer.getSmilesMatcher ().getLastException (), null);
} else {
ret = this.getSmilesMatches (flags, smiles, null, null, isSearch, !isAll);
}break;
case 10:
if (isMF) return mp.addXStr (J.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, x1.value, false));
if (isSequence) return mp.addXStr (this.viewer.getSmiles (-1, -1, x1.value, true, isAll, isAll, false));
if (isSmiles || isSearch) sFind = flags;
var bsMatch3D = bs2;
if (asBonds) {
var map = this.viewer.getSmilesMatcher ().getCorrelationMaps (sFind, this.viewer.modelSet.atoms, this.viewer.getAtomCount (), x1.value, !isSmiles, true);
ret = (map.length > 0 ? this.viewer.getDihedralMap (map[0]) :  Clazz.newIntArray (0, 0));
} else {
ret = this.getSmilesMatches (sFind, null, x1.value, bsMatch3D, !isSmiles, !isAll);
}break;
}
if (ret == null) this.eval.error (22);
return mp.addXObj (ret);
}var isReverse = (flags.indexOf ("v") >= 0);
var isCaseInsensitive = (flags.indexOf ("i") >= 0);
var asMatch = (flags.indexOf ("m") >= 0);
var isList = (x1.tok == 7);
var isPattern = (args.length == 2);
if (isList || isPattern) {
var pm = this.getPatternMatcher ();
var pattern = null;
try {
pattern = pm.compile (sFind, isCaseInsensitive);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.eval.evalError (e.toString (), null);
} else {
throw e;
}
}
var list = J.script.SV.listValue (x1);
if (J.util.Logger.debugging) J.util.Logger.debug ("finding " + sFind);
var bs =  new JU.BS ();
var ipt = 0;
var n = 0;
var matcher = null;
var v = (asMatch ?  new JU.List () : null);
for (var i = 0; i < list.length; i++) {
var what = list[i];
matcher = pattern.matcher (what);
var isMatch = matcher.find ();
if (asMatch && isMatch || !asMatch && isMatch == !isReverse) {
n++;
ipt = i;
bs.set (i);
if (asMatch) v.addLast (isReverse ? what.substring (0, matcher.start ()) + what.substring (matcher.end ()) : matcher.group ());
}}
if (!isList) {
return (asMatch ? mp.addXStr (v.size () == 1 ? v.get (0) : "") : isReverse ? mp.addXBool (n == 1) : asMatch ? mp.addXStr (n == 0 ? "" : matcher.group ()) : mp.addXInt (n == 0 ? 0 : matcher.start () + 1));
}if (n == 1) return mp.addXStr (asMatch ? v.get (0) : list[ipt]);
var listNew =  new Array (n);
if (n > 0) for (var i = list.length; --i >= 0; ) if (bs.get (i)) {
--n;
listNew[n] = (asMatch ? v.get (n) : list[i]);
}
return mp.addXAS (listNew);
}return mp.addXInt (J.script.SV.sValue (x1).indexOf (sFind) + 1);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "getPatternMatcher", 
($fz = function () {
return (this.pm == null ? this.pm = J.api.Interface.getOptionInterface ("util.PatternMatcher") : this.pm);
}, $fz.isPrivate = true, $fz));
$_M(c$, "evaluateGetProperty", 
($fz = function (mp, args) {
var pt = 0;
var propertyName = (args.length > pt ? J.script.SV.sValue (args[pt++]).toLowerCase () : "");
var isJSON = false;
if (propertyName.equals ("json") && args.length > pt) {
isJSON = true;
propertyName = J.script.SV.sValue (args[pt++]);
}if (propertyName.startsWith ("$")) {
}var propertyValue = "";
if (propertyName.equalsIgnoreCase ("fileContents") && args.length > 2) {
var s = J.script.SV.sValue (args[1]);
for (var i = 2; i < args.length; i++) s += "|" + J.script.SV.sValue (args[i]);

propertyValue = s;
pt = args.length;
} else if (args.length > pt) {
switch (args[pt].tok) {
case 10:
propertyValue = J.script.SV.bsSelectVar (args[pt++]);
if (propertyName.equalsIgnoreCase ("bondInfo") && args.length > pt && args[pt].tok == 10) propertyValue = [propertyValue, J.script.SV.bsSelectVar (args[pt])];
break;
case 4:
if (this.viewer.checkPropertyParameter (propertyName)) propertyValue = args[pt++].value;
break;
}
}var property = this.viewer.getProperty (null, propertyName, propertyValue);
if (pt < args.length) property = this.viewer.extractProperty (property, args, pt);
return mp.addXObj (isJSON ? JU.PT.toJSON (null, property) : J.script.SV.isVariableType (property) ? property : J.util.Escape.toReadable (propertyName, property));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluatePlane", 
($fz = function (mp, args, tok) {
if (tok == 135267841 && args.length != 3 || tok == 135267842 && args.length != 2 && args.length != 3 || args.length == 0 || args.length > 4) return false;
var pt1;
var pt2;
var pt3;
var plane;
var norm;
var vTemp;
switch (args.length) {
case 1:
if (args[0].tok == 10) {
var bs = J.script.SV.getBitSet (args[0], false);
if (bs.cardinality () == 3) {
var pts = this.viewer.getAtomPointVector (bs);
var vNorm =  new JU.V3 ();
var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
plane =  new JU.P4 ();
J.util.Measure.getPlaneThroughPoints (pts.get (0), pts.get (1), pts.get (2), vNorm, vAB, vAC, plane);
return mp.addXPt4 (plane);
}}var pt = J.util.Escape.uP (J.script.SV.sValue (args[0]));
if (Clazz.instanceOf (pt, JU.P4)) return mp.addXPt4 (pt);
return mp.addXStr ("" + pt);
case 2:
if (tok == 135267842) {
if (args[1].tok != 9) return false;
pt3 =  new JU.P3 ();
norm =  new JU.V3 ();
vTemp =  new JU.V3 ();
plane = args[1].value;
if (args[0].tok == 9) {
var list = J.util.Measure.getIntersectionPP (args[0].value, plane);
if (list == null) return mp.addXStr ("");
return mp.addXList (list);
}pt2 = mp.ptValue (args[0], false);
if (pt2 == null) return mp.addXStr ("");
return mp.addXPt (J.util.Measure.getIntersection (pt2, null, plane, pt3, norm, vTemp));
}case 3:
case 4:
switch (tok) {
case 135267841:
return mp.addXPt4 (this.eval.getHklPlane (JU.P3.new3 (J.script.SV.fValue (args[0]), J.script.SV.fValue (args[1]), J.script.SV.fValue (args[2]))));
case 135267842:
pt1 = mp.ptValue (args[0], false);
pt2 = mp.ptValue (args[1], false);
if (pt1 == null || pt2 == null) return mp.addXStr ("");
var vLine = JU.V3.newV (pt2);
vLine.normalize ();
if (args[2].tok == 9) {
pt3 =  new JU.P3 ();
norm =  new JU.V3 ();
vTemp =  new JU.V3 ();
pt1 = J.util.Measure.getIntersection (pt1, vLine, args[2].value, pt3, norm, vTemp);
if (pt1 == null) return mp.addXStr ("");
return mp.addXPt (pt1);
}pt3 = mp.ptValue (args[2], false);
if (pt3 == null) return mp.addXStr ("");
var v =  new JU.V3 ();
J.util.Measure.projectOntoAxis (pt3, pt1, vLine, v);
return mp.addXPt (pt3);
}
switch (args[0].tok) {
case 2:
case 3:
if (args.length == 3) {
var r = J.script.SV.fValue (args[0]);
var theta = J.script.SV.fValue (args[1]);
var phi = J.script.SV.fValue (args[2]);
norm = JU.V3.new3 (0, 0, 1);
pt2 = JU.P3.new3 (0, 1, 0);
var q = J.util.Quaternion.newVA (pt2, phi);
q.getMatrix ().transform (norm);
pt2.set (0, 0, 1);
q = J.util.Quaternion.newVA (pt2, theta);
q.getMatrix ().transform (norm);
pt2.setT (norm);
pt2.scale (r);
plane =  new JU.P4 ();
J.util.Measure.getPlaneThroughPoint (pt2, norm, plane);
return mp.addXPt4 (plane);
}break;
case 10:
case 8:
pt1 = mp.ptValue (args[0], false);
pt2 = mp.ptValue (args[1], false);
if (pt2 == null) return false;
pt3 = (args.length > 2 && (args[2].tok == 10 || args[2].tok == 8) ? mp.ptValue (args[2], false) : null);
norm = JU.V3.newV (pt2);
if (pt3 == null) {
plane =  new JU.P4 ();
if (args.length == 2 || !args[2].asBoolean ()) {
pt3 = JU.P3.newP (pt1);
pt3.add (pt2);
pt3.scale (0.5);
norm.sub (pt1);
norm.normalize ();
} else {
pt3 = pt1;
}J.util.Measure.getPlaneThroughPoint (pt3, norm, plane);
return mp.addXPt4 (plane);
}var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
var nd = J.util.Measure.getDirectedNormalThroughPoints (pt1, pt2, pt3, (args.length == 4 ? mp.ptValue (args[3], true) : null), norm, vAB, vAC);
return mp.addXPt4 (JU.P4.new4 (norm.x, norm.y, norm.z, nd));
}
}
if (args.length != 4) return false;
var x = J.script.SV.fValue (args[0]);
var y = J.script.SV.fValue (args[1]);
var z = J.script.SV.fValue (args[2]);
var w = J.script.SV.fValue (args[3]);
return mp.addXPt4 (JU.P4.new4 (x, y, z, w));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluatePoint", 
($fz = function (mp, args) {
if (args.length != 1 && args.length != 3 && args.length != 4) return false;
switch (args.length) {
case 1:
if (args[0].tok == 3 || args[0].tok == 2) return mp.addXInt (args[0].asInt ());
var s = J.script.SV.sValue (args[0]);
if (args[0].tok == 7) s = "{" + s + "}";
var pt = J.util.Escape.uP (s);
if (Clazz.instanceOf (pt, JU.P3)) return mp.addXPt (pt);
return mp.addXStr ("" + pt);
case 3:
return mp.addXPt (JU.P3.new3 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat ()));
case 4:
return mp.addXPt4 (JU.P4.new4 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat (), args[3].asFloat ()));
}
return false;
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluatePrompt", 
($fz = function (mp, args) {
if (args.length != 1 && args.length != 2 && args.length != 3) return false;
var label = J.script.SV.sValue (args[0]);
var buttonArray = (args.length > 1 && args[1].tok == 7 ? J.script.SV.listValue (args[1]) : null);
var asButtons = (buttonArray != null || args.length == 1 || args.length == 3 && args[2].asBoolean ());
var input = (buttonArray != null ? null : args.length >= 2 ? J.script.SV.sValue (args[1]) : "OK");
var s = "" + this.viewer.prompt (label, input, buttonArray, asButtons);
return (asButtons && buttonArray != null ? mp.addXInt (Integer.parseInt (s) + 1) : mp.addXStr (s));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateReplace", 
($fz = function (mp, args) {
if (args.length != 2) return false;
var x = mp.getX ();
var sFind = J.script.SV.sValue (args[0]);
var sReplace = J.script.SV.sValue (args[1]);
var s = (x.tok == 7 ? null : J.script.SV.sValue (x));
if (s != null) return mp.addXStr (JU.PT.simpleReplace (s, sFind, sReplace));
var list = J.script.SV.listValue (x);
for (var i = list.length; --i >= 0; ) list[i] = JU.PT.simpleReplace (list[i], sFind, sReplace);

return mp.addXAS (list);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateString", 
($fz = function (mp, tok, args) {
if (args.length > 1) return false;
var x = mp.getX ();
if (x.tok == 7) {
mp.addXVar (x);
return this.evaluateList (mp, tok, args);
}var s = (tok == 1276117510 && x.tok == 10 || tok == 1276117512 && x.tok == 7 ? null : J.script.SV.sValue (x));
var sArg = (args.length == 1 ? J.script.SV.sValue (args[0]) : tok == 1276117512 ? "" : "\n");
switch (tok) {
case 1276117510:
if (x.tok == 10) {
var bsSelected = J.script.SV.bsSelectVar (x);
sArg = "\n";
var modelCount = this.viewer.getModelCount ();
s = "";
for (var i = 0; i < modelCount; i++) {
s += (i == 0 ? "" : "\n");
var bs = this.viewer.getModelUndeletedAtomsBitSet (i);
bs.and (bsSelected);
s += J.util.Escape.eBS (bs);
}
}return mp.addXAS (JU.PT.split (s, sArg));
case 1276117506:
if (s.length > 0 && s.charAt (s.length - 1) == '\n') s = s.substring (0, s.length - 1);
return mp.addXStr (JU.PT.simpleReplace (s, "\n", sArg));
case 1276117512:
if (s != null) return mp.addXStr (JU.PT.trim (s, sArg));
var list = J.script.SV.listValue (x);
for (var i = list.length; --i >= 0; ) list[i] = JU.PT.trim (list[i], sArg);

return mp.addXAS (list);
}
return mp.addXStr ("");
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~N,~A");
$_M(c$, "evaluateList", 
($fz = function (mp, tok, args) {
var len = args.length;
var x1 = mp.getX ();
var x2;
switch (tok) {
case 1276383749:
return (len == 1 && mp.addXVar (x1.pushPop (args[0])));
case 1276383249:
return (len == 0 && mp.addXVar (x1.pushPop (null)));
case 1276118017:
if (len != 1 && len != 2) return false;
break;
default:
if (len != 1) return false;
}
var sList1 = null;
var sList2 = null;
var sList3 = null;
if (len == 2) {
var itab = (args[0].tok == 4 ? 0 : 1);
var tab = J.script.SV.sValue (args[itab]);
sList1 = (x1.tok == 7 ? J.script.SV.listValue (x1) : JU.PT.split (J.script.SV.sValue (x1), "\n"));
x2 = args[1 - itab];
sList2 = (x2.tok == 7 ? J.script.SV.listValue (x2) : JU.PT.split (J.script.SV.sValue (x2), "\n"));
sList3 =  new Array (len = Math.max (sList1.length, sList2.length));
for (var i = 0; i < len; i++) sList3[i] = (i >= sList1.length ? "" : sList1[i]) + tab + (i >= sList2.length ? "" : sList2[i]);

return mp.addXAS (sList3);
}x2 = (len == 0 ? J.script.SV.newV (1048579, "all") : args[0]);
var isAll = (x2.tok == 1048579);
if (x1.tok != 7 && x1.tok != 4) return mp.binaryOp (this.opTokenFor (tok), x1, x2);
var isScalar = J.script.SV.isScalar (x2);
var list1 = null;
var list2 = null;
var alist1 = x1.getList ();
var alist2 = x2.getList ();
if (x1.tok == 7) {
len = alist1.size ();
} else {
sList1 = (JU.PT.split (J.script.SV.sValue (x1), "\n"));
list1 =  Clazz.newFloatArray (len = sList1.length, 0);
JU.PT.parseFloatArrayData (sList1, list1);
}if (isAll) {
var sum = 0;
if (x1.tok == 7) {
for (var i = len; --i >= 0; ) sum += J.script.SV.fValue (alist1.get (i));

} else {
for (var i = len; --i >= 0; ) sum += list1[i];

}return mp.addXFloat (sum);
}if (tok == 1276117506 && x2.tok == 4) {
var sb =  new JU.SB ();
for (var i = 0; i < len; i++) sb.appendO (i > 0 ? x2.value : null).append (J.script.SV.sValue (alist1.get (i)));

return mp.addXStr (sb.toString ());
}var scalar = null;
if (isScalar) {
scalar = x2;
} else if (x2.tok == 7) {
len = Math.min (len, alist2.size ());
} else {
sList2 = JU.PT.split (J.script.SV.sValue (x2), "\n");
list2 =  Clazz.newFloatArray (sList2.length, 0);
JU.PT.parseFloatArrayData (sList2, list2);
len = Math.min (list1.length, list2.length);
}var token = this.opTokenFor (tok);
var olist =  new Array (len);
var a;
var b;
for (var i = 0; i < len; i++) {
if (x1.tok == 7) a = alist1.get (i);
 else if (Float.isNaN (list1[i])) a = J.script.SV.getVariable (J.script.SV.unescapePointOrBitsetAsVariable (sList1[i]));
 else a = J.script.SV.newV (3, Float.$valueOf (list1[i]));
if (isScalar) b = scalar;
 else if (x2.tok == 7) b = alist2.get (i);
 else if (Float.isNaN (list2[i])) b = J.script.SV.getVariable (J.script.SV.unescapePointOrBitsetAsVariable (sList2[i]));
 else b = J.script.SV.newV (3, Float.$valueOf (list2[i]));
if (tok == 1276117506) {
if (a.tok != 7) {
var l =  new JU.List ();
l.addLast (a);
a = J.script.SV.getVariableList (l);
}}if (!mp.binaryOp (token, a, b)) return false;
olist[i] = mp.getX ();
}
return mp.addXAV (olist);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~N,~A");
$_M(c$, "opTokenFor", 
($fz = function (tok) {
switch (tok) {
case 1276118017:
case 1276117506:
return J.script.T.tokenPlus;
case 1276117511:
return J.script.T.tokenMinus;
case 1276117507:
return J.script.T.tokenTimes;
case 1276117508:
return J.script.T.tokenMul3;
case 1276117504:
return J.script.T.tokenDivide;
}
return null;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "evaluateRowCol", 
($fz = function (mp, args, tok) {
if (args.length != 1) return false;
var n = args[0].asInt () - 1;
var x1 = mp.getX ();
var f;
switch (x1.tok) {
case 11:
if (n < 0 || n > 2) return false;
var m = x1.value;
switch (tok) {
case 1276117515:
f =  Clazz.newFloatArray (3, 0);
m.getRow (n, f);
return mp.addXAF (f);
case 1276117514:
default:
f =  Clazz.newFloatArray (3, 0);
m.getColumn (n, f);
return mp.addXAF (f);
}
case 12:
if (n < 0 || n > 2) return false;
var m4 = x1.value;
switch (tok) {
case 1276117515:
f =  Clazz.newFloatArray (4, 0);
m4.getRow (n, f);
return mp.addXAF (f);
case 1276117514:
default:
f =  Clazz.newFloatArray (4, 0);
m4.getColumn (n, f);
return mp.addXAF (f);
}
}
return false;
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateArray", 
($fz = function (mp, args, allowMatrix) {
var len = args.length;
if (allowMatrix && (len == 4 || len == 3)) {
var isMatrix = true;
for (var i = 0; i < len && isMatrix; i++) isMatrix = (args[i].tok == 7 && args[i].getList ().size () == len);

if (isMatrix) {
var m =  Clazz.newFloatArray (len * len, 0);
var pt = 0;
for (var i = 0; i < len && isMatrix; i++) {
var list = args[i].getList ();
for (var j = 0; j < len; j++) {
var x = J.script.SV.fValue (list.get (j));
if (Float.isNaN (x)) {
isMatrix = false;
break;
}m[pt++] = x;
}
}
if (isMatrix) {
if (len == 3) return mp.addXM3 (JU.M3.newA (m));
return mp.addXM4 (JU.M4.newA (m));
}}}var a =  new Array (args.length);
for (var i = a.length; --i >= 0; ) a[i] = J.script.SV.newT (args[i]);

return mp.addXAV (a);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~B");
$_M(c$, "evaluateMath", 
($fz = function (mp, args, tok) {
if (tok == 135266318) {
if (args.length == 1 && args[0].tok == 4) return mp.addXStr (( new java.util.Date ()) + "\t" + J.script.SV.sValue (args[0]));
return mp.addXInt ((System.currentTimeMillis () & 0x7FFFFFFF) - (args.length == 0 ? 0 : args[0].asInt ()));
}if (args.length != 1) return false;
if (tok == 135266826) {
if (args[0].tok == 2) return mp.addXInt (Math.abs (args[0].asInt ()));
return mp.addXFloat (Math.abs (args[0].asFloat ()));
}var x = J.script.SV.fValue (args[0]);
switch (tok) {
case 135266819:
return mp.addXFloat ((Math.acos (x) * 180 / 3.141592653589793));
case 135266821:
return mp.addXFloat (Math.cos (x * 3.141592653589793 / 180));
case 135266820:
return mp.addXFloat (Math.sin (x * 3.141592653589793 / 180));
case 135266822:
return mp.addXFloat (Math.sqrt (x));
}
return false;
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateQuaternion", 
($fz = function (mp, args, tok) {
var pt0 = null;
var nArgs = args.length;
var nMax = 2147483647;
var isRelative = false;
if (tok == 135270418) {
if (nArgs > 1 && args[nArgs - 1].tok == 4 && (args[nArgs - 1].value).equalsIgnoreCase ("relative")) {
nArgs--;
isRelative = true;
}if (nArgs > 1 && args[nArgs - 1].tok == 2 && args[0].tok == 10) {
nMax = args[nArgs - 1].asInt ();
if (nMax <= 0) nMax = 2147483646;
nArgs--;
}}switch (nArgs) {
case 0:
case 1:
case 4:
break;
case 2:
if (tok == 135270418) {
if (args[0].tok == 7 && (args[1].tok == 7 || args[1].tok == 1048589)) break;
if (args[0].tok == 10 && (args[1].tok == 2 || args[1].tok == 10)) break;
}if ((pt0 = mp.ptValue (args[0], false)) == null || tok != 135270418 && args[1].tok == 8) return false;
break;
case 3:
if (tok != 135270418) return false;
if (args[0].tok == 9) {
if (args[2].tok != 8 && args[2].tok != 10) return false;
break;
}for (var i = 0; i < 3; i++) if (args[i].tok != 8 && args[i].tok != 10) return false;

break;
default:
return false;
}
var q = null;
var qs = null;
var p4 = null;
switch (nArgs) {
case 0:
return mp.addXPt4 (J.util.Quaternion.newQ (this.viewer.getRotationQuaternion ()).toPoint4f ());
case 1:
default:
if (tok == 135270418 && args[0].tok == 7) {
var data1 = this.getQuaternionArray (args[0].getList (), 1073742001);
var mean = J.util.Quaternion.sphereMean (data1, null, 0.0001);
q = (Clazz.instanceOf (mean, J.util.Quaternion) ? mean : null);
break;
} else if (tok == 135270418 && args[0].tok == 10) {
qs = this.viewer.getAtomGroupQuaternions (args[0].value, nMax);
} else if (args[0].tok == 11) {
q = J.util.Quaternion.newM (args[0].value);
} else if (args[0].tok == 9) {
p4 = args[0].value;
} else {
var s = J.script.SV.sValue (args[0]);
var v = J.util.Escape.uP (s.equalsIgnoreCase ("best") ? this.viewer.getOrientationText (1073741863, null) : s);
if (!(Clazz.instanceOf (v, JU.P4))) return false;
p4 = v;
}if (tok == 135266307) q = J.util.Quaternion.newVA (JU.P3.new3 (p4.x, p4.y, p4.z), p4.w);
break;
case 2:
if (tok == 135270418) {
if (args[0].tok == 7 && args[1].tok == 7) {
var data1 = this.getQuaternionArray (args[0].getList (), 1073742001);
var data2 = this.getQuaternionArray (args[1].getList (), 1073742001);
qs = J.util.Quaternion.div (data2, data1, nMax, isRelative);
break;
}if (args[0].tok == 7 && args[1].tok == 1048589) {
var data1 = this.getQuaternionArray (args[0].getList (), 1073742001);
var stddev =  Clazz.newFloatArray (1, 0);
J.util.Quaternion.sphereMean (data1, stddev, 0.0001);
return mp.addXFloat (stddev[0]);
}if (args[0].tok == 10 && args[1].tok == 10) {
var data1 = this.viewer.getAtomGroupQuaternions (args[0].value, 2147483647);
var data2 = this.viewer.getAtomGroupQuaternions (args[1].value, 2147483647);
qs = J.util.Quaternion.div (data2, data1, nMax, isRelative);
break;
}}var pt1 = mp.ptValue (args[1], false);
p4 = mp.planeValue (args[0]);
if (pt1 != null) q = J.util.Quaternion.getQuaternionFrame (JU.P3.new3 (0, 0, 0), pt0, pt1);
 else q = J.util.Quaternion.newVA (pt0, J.script.SV.fValue (args[1]));
break;
case 3:
if (args[0].tok == 9) {
var pt = (args[2].tok == 8 ? args[2].value : this.viewer.getAtomSetCenter (args[2].value));
return mp.addXStr ((J.util.Quaternion.newP4 (args[0].value)).draw ("q", J.script.SV.sValue (args[1]), pt, 1));
}var pts =  new Array (3);
for (var i = 0; i < 3; i++) pts[i] = (args[i].tok == 8 ? args[i].value : this.viewer.getAtomSetCenter (args[i].value));

q = J.util.Quaternion.getQuaternionFrame (pts[0], pts[1], pts[2]);
break;
case 4:
if (tok == 135270418) p4 = JU.P4.new4 (J.script.SV.fValue (args[1]), J.script.SV.fValue (args[2]), J.script.SV.fValue (args[3]), J.script.SV.fValue (args[0]));
 else q = J.util.Quaternion.newVA (JU.P3.new3 (J.script.SV.fValue (args[0]), J.script.SV.fValue (args[1]), J.script.SV.fValue (args[2])), J.script.SV.fValue (args[3]));
break;
}
if (qs != null) {
if (nMax != 2147483647) {
var list =  new JU.List ();
for (var i = 0; i < qs.length; i++) list.addLast (qs[i].toPoint4f ());

return mp.addXList (list);
}q = (qs.length > 0 ? qs[0] : null);
}return mp.addXPt4 ((q == null ? J.util.Quaternion.newP4 (p4) : q).toPoint4f ());
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateRandom", 
($fz = function (mp, args) {
if (args.length > 2) return false;
var lower = (args.length < 2 ? 0 : J.script.SV.fValue (args[0]));
var range = (args.length == 0 ? 1 : J.script.SV.fValue (args[args.length - 1]));
range -= lower;
return mp.addXFloat ((Math.random () * range) + lower);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateCross", 
($fz = function (mp, args) {
if (args.length != 2) return false;
var x1 = args[0];
var x2 = args[1];
if (x1.tok != 8 || x2.tok != 8) return false;
var a = JU.V3.newV (x1.value);
var b = JU.V3.newV (x2.value);
a.cross (a, b);
return mp.addXPt (JU.P3.newP (a));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateLoad", 
($fz = function (mp, args, tok) {
if (args.length > 2 || args.length < 1) return false;
var file = J.script.SV.sValue (args[0]);
file = file.$replace ('\\', '/');
var nBytesMax = (args.length == 2 ? args[1].asInt () : -1);
if (this.viewer.isJS && file.startsWith ("?")) {
if (tok == 1229984263) return mp.addXStr ("");
file = this.eval.loadFileAsync ("load()_", file, mp.oPt, true);
}return mp.addXStr (tok == 135271426 ? this.viewer.getFileAsString4 (file, nBytesMax, false, false, true) : this.viewer.getFilePath (file, false));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateWrite", 
($fz = function (mp, args) {
if (args.length == 0) return false;
return mp.addXStr (this.write (args));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateScript", 
($fz = function (mp, args, tok) {
if (tok == 135287308 && args.length != 1 || args.length == 0 || args.length > 2) return false;
var s = J.script.SV.sValue (args[0]);
var sb =  new JU.SB ();
switch (tok) {
case 135271429:
var appID = (args.length == 2 ? J.script.SV.sValue (args[1]) : ".");
if (!appID.equals (".")) sb.append (this.viewer.jsEval (appID + "\1" + s));
if (appID.equals (".") || appID.equals ("*")) this.eval.runScriptBuffer (s, sb);
break;
case 135287308:
sb.append (this.viewer.jsEval (s));
break;
}
s = sb.toString ();
var f;
return (Float.isNaN (f = JU.PT.parseFloatStrict (s)) ? mp.addXStr (s) : s.indexOf (".") >= 0 ? mp.addXFloat (f) : mp.addXInt (JU.PT.parseInt (s)));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "evaluateData", 
($fz = function (mp, args) {
if (args.length != 1 && args.length != 2 && args.length != 4) return false;
var selected = J.script.SV.sValue (args[0]);
var type = (args.length == 2 ? J.script.SV.sValue (args[1]) : "");
if (args.length == 4) {
var iField = args[1].asInt ();
var nBytes = args[2].asInt ();
var firstLine = args[3].asInt ();
var f = J.util.Parser.parseFloatArrayFromMatchAndField (selected, null, 0, 0, null, iField, nBytes, null, firstLine);
return mp.addXStr (J.util.Escape.escapeFloatA (f, false));
}if (selected.indexOf ("data2d_") == 0) {
var f1 = this.viewer.getDataFloat2D (selected);
if (f1 == null) return mp.addXStr ("");
if (args.length == 2 && args[1].tok == 2) {
var pt = args[1].intValue;
if (pt < 0) pt += f1.length;
if (pt >= 0 && pt < f1.length) return mp.addXStr (J.util.Escape.escapeFloatA (f1[pt], false));
return mp.addXStr ("");
}return mp.addXStr (J.util.Escape.escapeFloatAA (f1, false));
}if (selected.indexOf ("property_") == 0) {
var f1 = this.viewer.getDataFloat (selected);
if (f1 == null) return mp.addXStr ("");
var f2 = (type.indexOf ("property_") == 0 ? this.viewer.getDataFloat (type) : null);
if (f2 != null) {
f1 = JU.AU.arrayCopyF (f1, -1);
for (var i = Math.min (f1.length, f2.length); --i >= 0; ) f1[i] += f2[i];

}return mp.addXStr (J.util.Escape.escapeFloatA (f1, false));
}if (args.length == 1) {
var data = this.viewer.getData (selected);
return mp.addXStr (data == null ? "" : "" + data[1]);
}return mp.addXStr (this.viewer.getData (selected, type));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateLabel", 
($fz = function (mp, intValue, args) {
var x1 = (args.length < 2 ? mp.getX () : null);
var format = (args.length == 0 ? "%U" : J.script.SV.sValue (args[0]));
var asArray = J.script.T.tokAttr (intValue, 480);
if (x1 == null) return mp.addXStr (J.script.SV.sprintfArray (args));
var bs = J.script.SV.getBitSet (x1, true);
if (bs == null) return mp.addXObj (J.script.SV.sprintf (J.util.Txt.formatCheck (format), x1));
return mp.addXObj (this.getBitsetIdent (bs, format, x1.value, true, x1.index, asArray));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~N,~A");
$_M(c$, "evaluateWithin", 
($fz = function (mp, args) {
if (args.length < 1 || args.length > 5) return false;
var i = args.length;
var distance = 0;
var withinSpec = args[0].value;
var withinStr = "" + withinSpec;
var tok = args[0].tok;
if (tok == 4) tok = J.script.T.getTokFromName (withinStr);
var isVdw = (tok == 1649412120);
if (isVdw) {
distance = 100;
withinSpec = null;
}var bs;
var isWithinModelSet = false;
var isWithinGroup = false;
var isDistance = (isVdw || tok == 3 || tok == 2);
var rd = null;
switch (tok) {
case 1048580:
if (i != 3 || !(Clazz.instanceOf (args[1].value, JU.BS)) || !(Clazz.instanceOf (args[2].value, JU.BS))) return false;
return mp.addXBs (this.viewer.getBranchBitSet ((args[2].value).nextSetBit (0), (args[1].value).nextSetBit (0), true));
case 135267336:
case 1238369286:
case 135267335:
var bsSelected = null;
var isOK = true;
switch (i) {
case 2:
break;
case 3:
isOK = (args[2].tok == 10);
if (isOK) bsSelected = args[2].value;
break;
default:
isOK = false;
}
if (!isOK) this.eval.error (22);
return mp.addXObj (this.getSmilesMatches (J.script.SV.sValue (args[1]), null, bsSelected, null, tok == 135267335, mp.asBitSet));
}
if (Clazz.instanceOf (withinSpec, String)) {
if (tok == 0) {
tok = 1048614;
if (i > 2) return false;
i = 2;
}} else if (isDistance) {
if (!isVdw) distance = J.script.SV.fValue (args[0]);
if (i < 2) return false;
switch (tok = args[1].tok) {
case 1048589:
case 1048588:
isWithinModelSet = args[1].asBoolean ();
i = 0;
break;
case 4:
var s = J.script.SV.sValue (args[1]);
if (s.startsWith ("$")) return mp.addXBs (this.getAtomsNearSurface (distance, s.substring (1)));
isWithinGroup = (s.equalsIgnoreCase ("group"));
isVdw = (s.equalsIgnoreCase ("vanderwaals"));
if (isVdw) {
withinSpec = null;
tok = 1649412120;
} else {
tok = 1087373318;
}break;
}
} else {
return false;
}var pt = null;
var plane = null;
switch (i) {
case 1:
switch (tok) {
case 137363468:
case 3145760:
case 1679429641:
return mp.addXBs (this.viewer.getAtomBits (tok, null));
case 1073741864:
return mp.addXBs (this.viewer.getAtomBits (tok, ""));
case 1048614:
return mp.addXBs (this.viewer.getAtomBits (1087373320, withinStr));
}
return false;
case 2:
switch (tok) {
case 1048614:
tok = 1087373320;
break;
case 1087375362:
case 1087375361:
case 1073741864:
case 1087373320:
return mp.addXBs (this.viewer.getAtomBits (tok, J.script.SV.sValue (args[args.length - 1])));
}
break;
case 3:
switch (tok) {
case 1048589:
case 1048588:
case 1087373318:
case 1649412120:
case 135266319:
case 135267841:
case 1048582:
break;
case 1087373320:
withinStr = J.script.SV.sValue (args[2]);
break;
default:
return false;
}
break;
}
i = args.length - 1;
if (Clazz.instanceOf (args[i].value, JU.P4)) {
plane = args[i].value;
} else if (Clazz.instanceOf (args[i].value, JU.P3)) {
pt = args[i].value;
if (J.script.SV.sValue (args[1]).equalsIgnoreCase ("hkl")) plane = this.eval.getHklPlane (pt);
}if (i > 0 && plane == null && pt == null && !(Clazz.instanceOf (args[i].value, JU.BS))) return false;
if (plane != null) return mp.addXBs (this.viewer.getAtomsNearPlane (distance, plane));
if (pt != null) return mp.addXBs (this.viewer.getAtomsNearPt (distance, pt));
bs = (args[i].tok == 10 ? J.script.SV.bsSelectVar (args[i]) : null);
if (tok == 1087373320) return mp.addXBs (this.viewer.getSequenceBits (withinStr, bs));
if (bs == null) bs =  new JU.BS ();
if (!isDistance) return mp.addXBs (this.viewer.getAtomBits (tok, bs));
if (isWithinGroup) return mp.addXBs (this.viewer.getGroupsWithin (Clazz.floatToInt (distance), bs));
if (isVdw) rd =  new J.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? J.atomdata.RadiusData.EnumType.FACTOR : J.atomdata.RadiusData.EnumType.OFFSET), J.constant.EnumVdw.AUTO);
return mp.addXBs (this.viewer.getAtomsWithinRadius (distance, bs, isWithinModelSet, rd));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "getAtomsNearSurface", 
($fz = function (distance, surfaceId) {
var data = [surfaceId, null, null];
if (this.chk) return  new JU.BS ();
if (this.eval.getShapePropertyData (24, "getVertices", data)) return this.viewer.getAtomsNearPts (distance, data[1], data[2]);
data[1] = Integer.$valueOf (0);
data[2] = Integer.$valueOf (-1);
if (this.eval.getShapePropertyData (22, "getCenter", data)) return this.viewer.getAtomsNearPt (distance, data[2]);
return  new JU.BS ();
}, $fz.isPrivate = true, $fz), "~N,~S");
$_M(c$, "evaluateColor", 
($fz = function (mp, args) {
var colorScheme = (args.length > 0 ? J.script.SV.sValue (args[0]) : "");
if (colorScheme.equalsIgnoreCase ("hsl") && args.length == 2) {
var pt = JU.P3.newP (J.script.SV.ptValue (args[1]));
var hsl =  Clazz.newFloatArray (3, 0);
J.util.ColorEncoder.RGBtoHSL (pt.x, pt.y, pt.z, hsl);
pt.set (hsl[0] * 360, hsl[1] * 100, hsl[2] * 100);
return mp.addXPt (pt);
}var isIsosurface = colorScheme.startsWith ("$");
var ce = (isIsosurface ? null : this.viewer.getColorEncoder (colorScheme));
if (!isIsosurface && ce == null) return mp.addXStr ("");
var lo = (args.length > 1 ? J.script.SV.fValue (args[1]) : 3.4028235E38);
var hi = (args.length > 2 ? J.script.SV.fValue (args[2]) : 3.4028235E38);
var value = (args.length > 3 ? J.script.SV.fValue (args[3]) : 3.4028235E38);
var getValue = (value != 3.4028235E38 || lo != 3.4028235E38 && hi == 3.4028235E38);
var haveRange = (hi != 3.4028235E38);
if (!haveRange && colorScheme.length == 0) {
value = lo;
var range = this.viewer.getCurrentColorRange ();
lo = range[0];
hi = range[1];
}if (isIsosurface) {
var id = colorScheme.substring (1);
var data = [id, null];
if (!this.viewer.getShapePropertyData (24, "colorEncoder", data)) return mp.addXStr ("");
ce = data[1];
} else {
ce.setRange (lo, hi, lo > hi);
}var key = ce.getColorKey ();
if (getValue) return mp.addXPt (JU.CU.colorPtFromInt2 (ce.getArgb (hi == 3.4028235E38 ? lo : value)));
return mp.addXVar (J.script.SV.getVariableMap (key));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateConnected", 
($fz = function (mp, args) {
if (args.length > 5) return false;
var min = -2147483648;
var max = 2147483647;
var fmin = 0;
var fmax = 3.4028235E38;
var order = 65535;
var atoms1 = null;
var atoms2 = null;
var haveDecimal = false;
var isBonds = false;
for (var i = 0; i < args.length; i++) {
var $var = args[i];
switch ($var.tok) {
case 10:
isBonds = (Clazz.instanceOf ($var.value, J.modelset.BondSet));
if (isBonds && atoms1 != null) return false;
if (atoms1 == null) atoms1 = J.script.SV.bsSelectVar ($var);
 else if (atoms2 == null) atoms2 = J.script.SV.bsSelectVar ($var);
 else return false;
break;
case 4:
var type = J.script.SV.sValue ($var);
if (type.equalsIgnoreCase ("hbond")) order = 30720;
 else order = J.script.ScriptEvaluator.getBondOrderFromString (type);
if (order == 131071) return false;
break;
case 3:
haveDecimal = true;
default:
var n = $var.asInt ();
var f = $var.asFloat ();
if (max != 2147483647) return false;
if (min == -2147483648) {
min = Math.max (n, 0);
fmin = f;
} else {
max = n;
fmax = f;
}}
}
if (min == -2147483648) {
min = 1;
max = 100;
fmin = 0.1;
fmax = 1.0E8;
} else if (max == 2147483647) {
max = min;
fmax = fmin;
fmin = 0.1;
}if (atoms1 == null) atoms1 = this.viewer.getAllAtoms ();
if (haveDecimal && atoms2 == null) atoms2 = atoms1;
if (atoms2 != null) {
var bsBonds =  new JU.BS ();
this.viewer.makeConnections (fmin, fmax, order, 1087373321, atoms1, atoms2, bsBonds, isBonds, false, 0);
return mp.addXVar (J.script.SV.newV (10,  new J.modelset.BondSet (bsBonds, this.viewer.getAtomIndices (this.viewer.getAtomBits (1678770178, bsBonds)))));
}return mp.addXBs (this.viewer.getAtomsConnected (min, max, order, atoms1));
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A");
$_M(c$, "evaluateSubstructure", 
($fz = function (mp, args, tok) {
if (args.length == 0) return false;
var bs =  new JU.BS ();
var pattern = J.script.SV.sValue (args[0]);
if (pattern.length > 0) try {
var bsSelected = (args.length == 2 && args[1].tok == 10 ? J.script.SV.bsSelectVar (args[1]) : null);
bs = this.viewer.getSmilesMatcher ().getSubstructureSet (pattern, this.viewer.getModelSet ().atoms, this.viewer.getAtomCount (), bsSelected, tok != 135267336 && tok != 1238369286, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.eval.evalError (e.toString (), null);
} else {
throw e;
}
}
return mp.addXBs (bs);
}, $fz.isPrivate = true, $fz), "J.script.ScriptMathProcessor,~A,~N");
$_M(c$, "getMinMaxPoint", 
($fz = function (pointOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
if (Clazz.instanceOf (pointOrSVArray, Array)) {
data = pointOrSVArray;
ndata = data.length;
} else if (Clazz.instanceOf (pointOrSVArray, JU.List)) {
sv = pointOrSVArray;
ndata = sv.size ();
}if (sv != null || data != null) {
var result =  new JU.P3 ();
var fdata =  Clazz.newFloatArray (ndata, 0);
var ok = true;
for (var xyz = 0; xyz < 3 && ok; xyz++) {
for (var i = 0; i < ndata; i++) {
var pt = (data == null ? J.script.SV.ptValue (sv.get (i)) : data[i]);
if (pt == null) {
ok = false;
break;
}switch (xyz) {
case 0:
fdata[i] = pt.x;
break;
case 1:
fdata[i] = pt.y;
break;
case 2:
fdata[i] = pt.z;
break;
}
}
if (!ok) break;
var f = this.getMinMax (fdata, tok);
if (Clazz.instanceOf (f, Float)) {
var value = (f).floatValue ();
switch (xyz) {
case 0:
result.x = value;
break;
case 1:
result.y = value;
break;
case 2:
result.z = value;
break;
}
} else {
break;
}}
return result;
}return "NaN";
}, $fz.isPrivate = true, $fz), "~O,~N");
$_M(c$, "getMinMaxQuaternion", 
($fz = function (svData, tok) {
var data;
switch (tok) {
case 32:
case 64:
case 128:
case 160:
return "NaN";
}
while (true) {
data = this.getQuaternionArray (svData, 1073742001);
if (data == null) break;
var retStddev =  Clazz.newFloatArray (1, 0);
var result = J.util.Quaternion.sphereMean (data, retStddev, 0.0001);
switch (tok) {
case 96:
return result;
case 192:
return Float.$valueOf (retStddev[0]);
}
break;
}
return "NaN";
}, $fz.isPrivate = true, $fz), "JU.List,~N");
$_M(c$, "getQuaternionArray", 
($fz = function (quaternionOrSVData, itype) {
var data;
switch (itype) {
case 135270418:
data = quaternionOrSVData;
break;
case 9:
var pts = quaternionOrSVData;
data =  new Array (pts.length);
for (var i = 0; i < pts.length; i++) data[i] = J.util.Quaternion.newP4 (pts[i]);

break;
case 1073742001:
var sv = quaternionOrSVData;
data =  new Array (sv.size ());
for (var i = 0; i < sv.size (); i++) {
var pt = J.script.SV.pt4Value (sv.get (i));
if (pt == null) return null;
data[i] = J.util.Quaternion.newP4 (pt);
}
break;
default:
return null;
}
return data;
}, $fz.isPrivate = true, $fz), "~O,~N");
$_V(c$, "getMinMax", 
function (floatOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
while (true) {
if (JU.PT.isAF (floatOrSVArray)) {
data = floatOrSVArray;
ndata = data.length;
if (ndata == 0) break;
} else if (Clazz.instanceOf (floatOrSVArray, JU.List)) {
sv = floatOrSVArray;
ndata = sv.size ();
if (ndata == 0) break;
var sv0 = sv.get (0);
if (sv0.tok == 4 && (sv0.value).startsWith ("{")) {
var pt = J.script.SV.ptValue (sv0);
if (Clazz.instanceOf (pt, JU.P3)) return this.getMinMaxPoint (sv, tok);
if (Clazz.instanceOf (pt, JU.P4)) return this.getMinMaxQuaternion (sv, tok);
break;
}} else {
break;
}var sum;
switch (tok) {
case 32:
sum = 3.4028235E38;
break;
case 64:
sum = -3.4028235E38;
break;
default:
sum = 0;
}
var sum2 = 0;
var n = 0;
for (var i = ndata; --i >= 0; ) {
var v = (data == null ? J.script.SV.fValue (sv.get (i)) : data[i]);
if (Float.isNaN (v)) continue;
n++;
switch (tok) {
case 160:
case 192:
sum2 += (v) * v;
case 128:
case 96:
sum += v;
break;
case 32:
if (v < sum) sum = v;
break;
case 64:
if (v > sum) sum = v;
break;
}
}
if (n == 0) break;
switch (tok) {
case 96:
sum /= n;
break;
case 192:
if (n == 1) break;
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
case 32:
case 64:
case 128:
break;
case 160:
sum = sum2;
break;
}
return Float.$valueOf (sum);
}
return "NaN";
}, "~O,~N");
$_M(c$, "capture", 
($fz = function () {
if (!this.chk && !this.viewer.allowCapture ()) {
this.showString ("Cannot capture on this platform");
return;
}var fps = this.viewer.getInt (553648132);
var endTime = 10;
var mode = 0;
var fileName = "";
var params = this.viewer.captureParams;
var looping = !this.viewer.getAnimationReplayMode ().name ().equals ("ONCE");
var tok = this.tokAt (1);
var sfps = "";
switch (tok) {
case 0:
mode = 1150985;
break;
case 4:
fileName = this.eval.optParameterAsString (1);
if (fileName.length == 0) {
mode = 1150985;
break;
}if (!fileName.endsWith (".gif")) fileName += ".gif";
var s = null;
var axis = "y";
var i = 2;
switch (this.tokAt (i)) {
case 1073742129:
looping = true;
i = 3;
axis = (this.tokAt (3) == 2 ? "y" : this.eval.optParameterAsString (i++).toLowerCase ());
var n = (this.tokAt (i) == 0 ? 5 : this.intParameter (i++));
s = "; rotate Y 10 10;delay 2.0; rotate Y -10 -10; delay 2.0;rotate Y -10 -10; delay 2.0;rotate Y 10 10;delay 2.0";
s = JU.PT.simpleReplace (s, "10", "" + n);
break;
case 1611141175:
looping = true;
i = 3;
axis = this.eval.optParameterAsString (i).toLowerCase ();
if (axis.length > 0) i++;
s = "; rotate Y 360 30;delay 15.0;";
if (this.tokAt (i) == 2) sfps = " " + (fps = this.intParameter (i++));
break;
case 3:
endTime = this.floatParameter (2);
break;
case 2:
fps = this.intParameter (2);
break;
}
if (s != null) {
if (!this.chk) this.viewer.setNavigationMode (false);
if (axis === "" || "xyz".indexOf (axis) < 0) axis = "y";
s = JU.PT.simpleReplace (s, "Y", axis);
s = "capture " + J.util.Escape.eS (fileName) + sfps + s + ";capture;";
this.eval.script (0, null, s);
return;
}if (params != null) params =  new java.util.Hashtable ();
mode = 1073742032;
params =  new java.util.Hashtable ();
if (!looping) this.showString (J.i18n.GT.o (J.i18n.GT._ ("Note: Enable looping using {0}"), ["ANIMATION MODE LOOP"]));
this.showString (J.i18n.GT.o (J.i18n.GT._ ("Animation delay based on: {0}"), ["ANIMATION FPS " + fps]));
params.put ("captureFps", Integer.$valueOf (fps));
break;
case 1073741874:
case 1048589:
case 1048588:
this.checkLength (2);
mode = tok;
break;
default:
this.invArg ();
}
if (this.chk || params == null) return;
params.put ("type", "GIF");
params.put ("fileName", fileName);
params.put ("quality", Integer.$valueOf (-1));
params.put ("endTime", Long.$valueOf (System.currentTimeMillis () + Clazz.floatToLong (endTime * 1000)));
params.put ("captureMode", Integer.$valueOf (mode));
params.put ("captureLooping", looping ? Boolean.TRUE : Boolean.FALSE);
var msg = this.viewer.processWriteOrCapture (params);
J.util.Logger.info (msg);
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"ERROR_invalidArgument", 22);
});
