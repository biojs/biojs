(function(Clazz
,$_A
,$_Ab
,$_AB
,$_AC
,$_AD
,$_AF
,$_AI
,$_AL
,$_AS
,$_B
,$_C
,$_D
,$_E
,$_F
,$_G
,$_H
,$_I
,$_J
,$_K
,$_k
,$_L
,$_M
,$_N
,$_O
,$_P
,$_Q
,$_R
,$_S
,$_s
,$_T
,$_U
,$_V
,$_W
,$_X
,$_Y
,$_Z
,Clazz_doubleToInt
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_supportsNativeObject
,Clazz_extendedObjectMethods
,Clazz_callingStackTraces
,Clazz_clone
,Clazz_doubleToShort
,Clazz_innerFunctions
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
){
var $t$;
//var c$;
Clazz_declarePackage ("J.viewer");
c$ = Clazz_declareType (J.viewer, "JmolStateCreator");
Clazz_declarePackage ("J.viewer");
Clazz_load (["J.viewer.JmolStateCreator", "java.util.Hashtable"], "J.viewer.StateCreator", ["java.lang.Boolean", "$.Float", "java.util.Arrays", "$.Date", "javajs.awt.Font", "JU.BS", "$.List", "$.P3", "$.PT", "$.SB", "$.V3", "J.constant.EnumAxesMode", "$.EnumPalette", "$.EnumStereoMode", "$.EnumStructure", "$.EnumVdw", "J.modelset.Atom", "$.AtomCollection", "$.Bond", "$.BondSet", "J.shape.Shape", "J.util.BSUtil", "$.C", "$.ColorEncoder", "$.Escape", "$.JmolEdge", "$.Logger", "J.viewer.AnimationManager", "$.GlobalSettings", "$.JC", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.viewer = null;
this.temp = null;
this.temp2 = null;
this.temp3 = null;
this.undoWorking = false;
Clazz_instantialize (this, arguments);
}, J.viewer, "StateCreator", J.viewer.JmolStateCreator);
Clazz_prepareFields (c$, function () {
this.temp =  new java.util.Hashtable ();
this.temp2 =  new java.util.Hashtable ();
this.temp3 =  new java.util.Hashtable ();
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.viewer.StateCreator, []);
});
$_V(c$, "setViewer", 
function (viewer) {
this.viewer = viewer;
}, "J.viewer.Viewer");
$_V(c$, "getStateScript", 
function (type, width, height) {
var isAll = (type == null || type.equalsIgnoreCase ("all"));
var s =  new JU.SB ();
var sfunc = (isAll ?  new JU.SB ().append ("function _setState() {\n") : null);
if (isAll) s.append ("# Jmol state version " + J.viewer.Viewer.getJmolVersion () + ";\n");
if (this.viewer.isApplet () && isAll) {
J.viewer.StateCreator.appendCmd (s, "# fullName = " + J.util.Escape.eS (this.viewer.fullName));
J.viewer.StateCreator.appendCmd (s, "# documentBase = " + J.util.Escape.eS (this.viewer.appletDocumentBase));
J.viewer.StateCreator.appendCmd (s, "# codeBase = " + J.util.Escape.eS (this.viewer.appletCodeBase));
s.append ("\n");
}var global = this.viewer.global;
if (isAll || type.equalsIgnoreCase ("windowState")) s.append (this.getWindowState (sfunc, width, height));
if (isAll || type.equalsIgnoreCase ("fileState")) s.append (this.getFileState (sfunc));
if (isAll || type.equalsIgnoreCase ("definedState")) s.append (this.getDefinedState (sfunc, true));
if (isAll || type.equalsIgnoreCase ("variableState")) s.append (this.getVariableState (global, sfunc));
if (isAll || type.equalsIgnoreCase ("dataState")) s.append (this.getDataState (sfunc));
if (isAll || type.equalsIgnoreCase ("modelState")) s.append (this.getModelState (sfunc, true, this.viewer.getBooleanProperty ("saveProteinStructureState")));
if (isAll || type.equalsIgnoreCase ("colorState")) s.append (this.getColorState (this.viewer.colorManager, sfunc));
if (isAll || type.equalsIgnoreCase ("frameState")) s.append (this.getAnimState (this.viewer.animationManager, sfunc));
if (isAll || type.equalsIgnoreCase ("perspectiveState")) s.append (this.getViewState (this.viewer.transformManager, sfunc));
if (isAll || type.equalsIgnoreCase ("selectionState")) s.append (this.getSelectionState (this.viewer.selectionManager, sfunc));
if (sfunc != null) {
J.viewer.StateCreator.appendCmd (sfunc, "set refreshing true");
J.viewer.StateCreator.appendCmd (sfunc, "set antialiasDisplay " + global.antialiasDisplay);
J.viewer.StateCreator.appendCmd (sfunc, "set antialiasTranslucent " + global.antialiasTranslucent);
J.viewer.StateCreator.appendCmd (sfunc, "set antialiasImages " + global.antialiasImages);
if (this.viewer.getSpinOn ()) J.viewer.StateCreator.appendCmd (sfunc, "spin on");
sfunc.append ("}\n\n_setState;\n");
}if (isAll) s.appendSB (sfunc);
return s.toString ();
}, "~S,~N,~N");
$_M(c$, "getDataState", 
function (sfunc) {
var commands =  new JU.SB ();
var haveData = false;
var atomProps = this.getAtomicPropertyState (-1, null);
if (atomProps.length > 0) {
haveData = true;
commands.append (atomProps);
}if (this.viewer.userVdws != null) {
var info = this.viewer.getDefaultVdwNameOrData (0, J.constant.EnumVdw.USER, this.viewer.bsUserVdws);
if (info.length > 0) {
haveData = true;
commands.append (info);
}}if (this.viewer.nmrCalculation != null) haveData = new Boolean (haveData | this.viewer.nmrCalculation.getState (commands)).valueOf ();
if (this.viewer.dataManager != null) haveData = new Boolean (haveData | this.viewer.dataManager.getDataState (this, commands)).valueOf ();
if (!haveData) return "";
var cmd = "";
if (sfunc != null) {
sfunc.append ("  _setDataState;\n");
cmd = "function _setDataState() {\n";
commands.append ("}\n\n");
}return cmd + commands.toString ();
}, "JU.SB");
$_M(c$, "getDefinedState", 
function (sfunc, isAll) {
var ms = this.viewer.modelSet;
var len = ms.stateScripts.size ();
if (len == 0) return "";
var haveDefs = false;
var commands =  new JU.SB ();
var cmd;
for (var i = 0; i < len; i++) {
var ss = ms.stateScripts.get (i);
if (ss.inDefinedStateBlock && (cmd = ss.toString ()).length > 0) {
commands.append ("  ").append (cmd).append ("\n");
haveDefs = true;
}}
if (!haveDefs) return "";
cmd = "";
if (isAll && sfunc != null) {
sfunc.append ("  _setDefinedState;\n");
cmd = "function _setDefinedState() {\n\n";
}if (sfunc != null) commands.append ("\n}\n\n");
return cmd + commands.toString ();
}, "JU.SB,~B");
$_V(c$, "getModelState", 
function (sfunc, isAll, withProteinStructure) {
var commands =  new JU.SB ();
if (isAll && sfunc != null) {
sfunc.append ("  _setModelState;\n");
commands.append ("function _setModelState() {\n");
}var cmd;
var ms = this.viewer.modelSet;
var bonds = ms.bonds;
var models = ms.models;
var modelCount = ms.modelCount;
if (isAll) {
var len = ms.stateScripts.size ();
for (var i = 0; i < len; i++) {
var ss = ms.stateScripts.get (i);
if (!ss.inDefinedStateBlock && (cmd = ss.toString ()).length > 0) {
commands.append ("  ").append (cmd).append ("\n");
}}
var sb =  new JU.SB ();
for (var i = 0; i < ms.bondCount; i++) if (!models[bonds[i].atom1.modelIndex].isModelKit) if (bonds[i].isHydrogen () || (bonds[i].order & 131072) != 0) {
var bond = bonds[i];
var index = bond.atom1.index;
if (bond.atom1.getGroup ().isAdded (index)) index = -1 - index;
sb.appendI (index).appendC ('\t').appendI (bond.atom2.index).appendC ('\t').appendI (bond.order & -131073).appendC ('\t').appendF (bond.mad / 1000).appendC ('\t').appendF (bond.getEnergy ()).appendC ('\t').append (J.util.JmolEdge.getBondOrderNameFromOrder (bond.order)).append (";\n");
}
if (sb.length () > 0) commands.append ("data \"connect_atoms\"\n").appendSB (sb).append ("end \"connect_atoms\";\n");
commands.append ("\n");
}if (ms.haveHiddenBonds) {
var bs =  new J.modelset.BondSet ();
for (var i = ms.bondCount; --i >= 0; ) if (bonds[i].mad != 0 && (bonds[i].shapeVisibilityFlags & J.modelset.Bond.myVisibilityFlag) == 0) bs.set (i);

if (bs.isEmpty ()) ms.haveHiddenBonds = false;
 else commands.append ("  hide ").append (J.util.Escape.eBond (bs)).append (";\n");
}this.viewer.setModelVisibility ();
if (withProteinStructure) commands.append (ms.getProteinStructureState (null, isAll, false, 0));
this.getShapeState (commands, isAll, 2147483647);
if (isAll) {
var needOrientations = false;
for (var i = 0; i < modelCount; i++) if (models[i].isJmolDataFrame) {
needOrientations = true;
break;
}
for (var i = 0; i < modelCount; i++) {
var fcmd = "  frame " + ms.getModelNumberDotted (i);
var s = ms.getModelAuxiliaryInfoValue (i, "modelID");
if (s != null && !s.equals (ms.getModelAuxiliaryInfoValue (i, "modelID0"))) commands.append (fcmd).append ("; frame ID ").append (J.util.Escape.eS (s)).append (";\n");
var t = ms.frameTitles[i];
if (t != null && t.length > 0) commands.append (fcmd).append ("; frame title ").append (J.util.Escape.eS (t)).append (";\n");
if (needOrientations && models[i].orientation != null && !ms.isTrajectorySubFrame (i)) commands.append (fcmd).append ("; ").append (models[i].orientation.getMoveToText (false)).append (";\n");
if (models[i].frameDelay != 0 && !ms.isTrajectorySubFrame (i)) commands.append (fcmd).append ("; frame delay ").appendF (models[i].frameDelay / 1000).append (";\n");
if (models[i].simpleCage != null) {
commands.append (fcmd).append ("; unitcell ").append (J.util.Escape.eAP (models[i].simpleCage.getUnitCellVectors ())).append (";\n");
this.getShapeState (commands, isAll, 33);
}}
var loadUC = false;
if (ms.unitCells != null) {
var haveModulation = false;
for (var i = 0; i < modelCount; i++) {
var symmetry = ms.getUnitCell (i);
if (symmetry == null) continue;
commands.append ("  frame ").append (ms.getModelNumberDotted (i));
var pt = symmetry.getFractionalOffset ();
if (pt != null && (pt.x != 0 || pt.y != 0 || pt.z != 0)) {
commands.append ("; set unitcell ").append (J.util.Escape.eP (pt));
loadUC = true;
}pt = symmetry.getUnitCellMultiplier ();
if (pt != null) {
commands.append ("; set unitcell ").append (J.util.Escape.eP (pt));
loadUC = true;
}commands.append (";\n");
haveModulation = new Boolean (haveModulation | (this.viewer.modelGetLastVibrationIndex (i, 1276121113) >= 0)).valueOf ();
}
if (loadUC) this.viewer.loadShape (33);
this.getShapeState (commands, isAll, 33);
if (haveModulation) {
var temp =  new java.util.Hashtable ();
var ivib;
for (var i = modelCount; --i >= 0; ) {
if ((ivib = this.viewer.modelGetLastVibrationIndex (i, 1276121113)) >= 0) for (var j = models[i].firstAtomIndex; j <= ivib; j++) {
var mset = this.viewer.getVibration (j);
if (mset != null && mset.isEnabled ()) {
J.util.BSUtil.setMapBitSet (temp, j, j, mset.getState ());
}}
}
var s = this.getCommands (temp, null, "select");
commands.append (s);
}}commands.append ("  set fontScaling " + this.viewer.getBoolean (603979845) + ";\n");
if (this.viewer.getBoolean (603979883)) commands.append ("  set modelKitMode true;\n");
}if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "JU.SB,~B,~B");
$_M(c$, "getShapeState", 
function (commands, isAll, iShape) {
var shapes = this.viewer.shapeManager.shapes;
if (shapes == null) return;
var cmd;
var shape;
var i;
var imax;
if (iShape == 2147483647) {
i = 0;
imax = 36;
} else {
imax = (i = iShape) + 1;
}for (; i < imax; ++i) if ((shape = shapes[i]) != null && (isAll || J.viewer.JC.isShapeSecondary (i)) && (cmd = shape.getShapeState ()) != null && cmd.length > 1) commands.append (cmd);

commands.append ("  select *;\n");
}, "JU.SB,~B,~N");
$_M(c$, "getWindowState", 
function (sfunc, width, height) {
var global = this.viewer.global;
var str =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  initialize;\n  set refreshing false;\n  _setWindowState;\n");
str.append ("\nfunction _setWindowState() {\n");
}if (width != 0) str.append ("# preferredWidthHeight ").appendI (width).append (" ").appendI (height).append (";\n");
str.append ("# width ").appendI (width == 0 ? this.viewer.getScreenWidth () : width).append (";\n# height ").appendI (height == 0 ? this.viewer.getScreenHeight () : height).append (";\n");
J.viewer.StateCreator.appendCmd (str, "stateVersion = " + global.getParameter ("_version"));
J.viewer.StateCreator.appendCmd (str, "background " + J.util.Escape.escapeColor (global.objColors[0]));
for (var i = 1; i < 8; i++) if (global.objColors[i] != 0) J.viewer.StateCreator.appendCmd (str, J.viewer.StateManager.getObjectNameFromId (i) + "Color = \"" + J.util.Escape.escapeColor (global.objColors[i]) + '"');

if (global.backgroundImageFileName != null) J.viewer.StateCreator.appendCmd (str, "background IMAGE /*file*/" + J.util.Escape.eS (global.backgroundImageFileName));
str.append (this.getSpecularState ());
J.viewer.StateCreator.appendCmd (str, "statusReporting  = " + global.statusReporting);
if (sfunc != null) str.append ("}\n\n");
return str.toString ();
}, "JU.SB,~N,~N");
$_V(c$, "getSpecularState", 
function () {
var str =  new JU.SB ();
var g = this.viewer.gdata;
J.viewer.StateCreator.appendCmd (str, "set ambientPercent " + g.getAmbientPercent ());
J.viewer.StateCreator.appendCmd (str, "set diffusePercent " + g.getDiffusePercent ());
J.viewer.StateCreator.appendCmd (str, "set specular " + g.getSpecular ());
J.viewer.StateCreator.appendCmd (str, "set specularPercent " + g.getSpecularPercent ());
J.viewer.StateCreator.appendCmd (str, "set specularPower " + g.getSpecularPower ());
J.viewer.StateCreator.appendCmd (str, "set celShading " + g.getCel ());
J.viewer.StateCreator.appendCmd (str, "set celShadingPower " + g.getCelPower ());
var se = g.getSpecularExponent ();
var pe = g.getPhongExponent ();
if (Math.pow (2, se) == pe) J.viewer.StateCreator.appendCmd (str, "set specularExponent " + se);
 else J.viewer.StateCreator.appendCmd (str, "set phongExponent " + pe);
J.viewer.StateCreator.appendCmd (str, "set zShadePower " + this.viewer.global.zShadePower);
return str.toString ();
});
$_M(c$, "getFileState", 
function (sfunc) {
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setFileState;\n");
commands.append ("function _setFileState() {\n\n");
}if (commands.indexOf ("append") < 0 && this.viewer.getModelSetFileName ().equals ("zapped")) commands.append ("  zap;\n");
this.appendLoadStates (commands);
if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "JU.SB");
$_M(c$, "appendLoadStates", 
function (cmds) {
var ligandModelSet = this.viewer.ligandModelSet;
if (ligandModelSet != null) {
for (var key, $key = ligandModelSet.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var data = this.viewer.ligandModels.get (key + "_data");
if (data != null) cmds.append ("  ").append (J.util.Escape.encapsulateData ("ligand_" + key, data.trim () + "\n", 0));
data = this.viewer.ligandModels.get (key + "_file");
if (data != null) cmds.append ("  ").append (J.util.Escape.encapsulateData ("file_" + key, data.trim () + "\n", 0));
}
}var commands =  new JU.SB ();
var ms = this.viewer.modelSet;
var models = ms.models;
var modelCount = ms.modelCount;
for (var i = 0; i < modelCount; i++) {
if (ms.isJmolDataFrameForModel (i) || ms.isTrajectorySubFrame (i)) continue;
var m = models[i];
var pt = commands.indexOf (m.loadState);
if (pt < 0 || pt != commands.lastIndexOf (m.loadState)) commands.append (models[i].loadState);
if (models[i].isModelKit) {
var bs = ms.getModelAtomBitSetIncludingDeleted (i, false);
if (ms.tainted != null) {
if (ms.tainted[2] != null) ms.tainted[2].andNot (bs);
if (ms.tainted[3] != null) ms.tainted[3].andNot (bs);
}m.loadScript =  new JU.SB ();
this.getInlineData (commands, this.viewer.getModelExtract (bs, false, true, "MOL"), i > 0, null);
} else {
commands.appendSB (m.loadScript);
}}
var s = commands.toString ();
var i = s.indexOf ("load /*data*/");
var j = s.indexOf ("load /*file*/");
if (j >= 0 && j < i) i = j;
if ((j = s.indexOf ("load \"@")) >= 0 && j < i) i = j;
if (i >= 0) s = s.substring (0, i) + "zap;" + s.substring (i);
cmds.append (s);
}, "JU.SB");
$_V(c$, "getInlineData", 
function (loadScript, strModel, isAppend, loadFilter) {
var tag = (isAppend ? "append" : "model") + " inline";
loadScript.append ("load /*data*/ data \"").append (tag).append ("\"\n").append (strModel).append ("end \"").append (tag).append (loadFilter == null || loadFilter.length == 0 ? "" : " filter" + J.util.Escape.eS (loadFilter)).append ("\";");
}, "JU.SB,~S,~B,~S");
$_M(c$, "getColorState", 
function (cm, sfunc) {
var s =  new JU.SB ();
var n = this.getCEState (cm.propertyColorEncoder, s);
if (n > 0 && sfunc != null) sfunc.append ("\n  _setColorState\n");
return (n > 0 && sfunc != null ? "function _setColorState() {\n" + s.append ("}\n\n").toString () : s.toString ());
}, "J.viewer.ColorManager,JU.SB");
$_M(c$, "getCEState", 
function (p, s) {
var n = 0;
for (var entry, $entry = p.schemes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var name = entry.getKey ();
if ( new Boolean (name.length > 0 & n++ >= 0).valueOf ()) s.append ("color \"" + name + "=" + J.util.ColorEncoder.getColorSchemeList (entry.getValue ()) + "\";\n");
}
return n;
}, "J.util.ColorEncoder,JU.SB");
$_M(c$, "getAnimState", 
function (am, sfunc) {
var modelCount = this.viewer.getModelCount ();
if (modelCount < 2) return "";
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setFrameState;\n");
commands.append ("function _setFrameState() {\n");
}commands.append ("# frame state;\n");
commands.append ("# modelCount ").appendI (modelCount).append (";\n# first ").append (this.viewer.getModelNumberDotted (0)).append (";\n# last ").append (this.viewer.getModelNumberDotted (modelCount - 1)).append (";\n");
if (am.backgroundModelIndex >= 0) J.viewer.StateCreator.appendCmd (commands, "set backgroundModel " + this.viewer.getModelNumberDotted (am.backgroundModelIndex));
var bs = this.viewer.getFrameOffsets ();
if (bs != null) J.viewer.StateCreator.appendCmd (commands, "frame align " + J.util.Escape.eBS (bs));
J.viewer.StateCreator.appendCmd (commands, "frame RANGE " + am.getModelSpecial (-1) + " " + am.getModelSpecial (1));
J.viewer.StateCreator.appendCmd (commands, "animation DIRECTION " + (am.animationDirection == 1 ? "+1" : "-1"));
J.viewer.StateCreator.appendCmd (commands, "animation FPS " + am.animationFps);
J.viewer.StateCreator.appendCmd (commands, "animation MODE " + am.animationReplayMode.name () + " " + am.firstFrameDelay + " " + am.lastFrameDelay);
if (am.morphCount > 0) J.viewer.StateCreator.appendCmd (commands, "animation MORPH " + am.morphCount);
var frames = am.getAnimationFrames ();
var showModel = true;
if (frames != null) {
J.viewer.StateCreator.appendCmd (commands, "anim frames " + J.util.Escape.eAI (frames));
var i = am.getCurrentFrameIndex ();
J.viewer.StateCreator.appendCmd (commands, "frame " + (i + 1));
showModel = (am.getCurrentModelIndex () != am.modelIndexForFrame (i));
}if (showModel) J.viewer.StateCreator.appendCmd (commands, "model " + am.getModelSpecial (0));
J.viewer.StateCreator.appendCmd (commands, "animation " + (!am.animationOn ? "OFF" : am.currentDirection == 1 ? "PLAY" : "PLAYREV"));
if (am.animationOn && am.animationPaused) J.viewer.StateCreator.appendCmd (commands, "animation PAUSE");
if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "J.viewer.AnimationManager,JU.SB");
$_M(c$, "getVariableState", 
function (global, sfunc) {
var list =  new Array (global.htBooleanParameterFlags.size () + global.htNonbooleanParameterValues.size ());
var commands =  new JU.SB ();
var isState = (sfunc != null);
if (isState) {
sfunc.append ("  _setVariableState;\n");
commands.append ("function _setVariableState() {\n\n");
}var n = 0;
for (var key, $key = global.htBooleanParameterFlags.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (J.viewer.GlobalSettings.doReportProperty (key)) list[n++] = "set " + key + " " + global.htBooleanParameterFlags.get (key);

for (var key, $key = global.htNonbooleanParameterValues.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (J.viewer.GlobalSettings.doReportProperty (key)) {
var value = global.htNonbooleanParameterValues.get (key);
if (key.charAt (0) == '=') {
key = key.substring (1);
} else {
if (key.indexOf ("default") == 0) key = " set " + key;
 else key = "set " + key;
value = J.util.Escape.e (value);
}list[n++] = key + " " + value;
}
switch (global.axesMode) {
case J.constant.EnumAxesMode.UNITCELL:
list[n++] = "set axes unitcell";
break;
case J.constant.EnumAxesMode.BOUNDBOX:
list[n++] = "set axes window";
break;
default:
list[n++] = "set axes molecular";
}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) J.viewer.StateCreator.appendCmd (commands, list[i]);

var s = J.viewer.StateManager.getVariableList (global.htUserVariables, 0, false, true);
if (s.length > 0) {
commands.append ("\n#user-defined atom sets; \n");
commands.append (s);
}if (this.viewer.shapeManager.getShape (5) != null) commands.append (this.getDefaultLabelState (this.viewer.shapeManager.shapes[5]));
if (global.haveSetStructureList) {
var slist = global.structureList;
commands.append ("struture HELIX set " + J.util.Escape.eAF (slist.get (J.constant.EnumStructure.HELIX)));
commands.append ("struture SHEET set " + J.util.Escape.eAF (slist.get (J.constant.EnumStructure.SHEET)));
commands.append ("struture TURN set " + J.util.Escape.eAF (slist.get (J.constant.EnumStructure.TURN)));
}if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "J.viewer.GlobalSettings,JU.SB");
$_M(c$, "getDefaultLabelState", 
function (l) {
var s =  new JU.SB ().append ("\n# label defaults;\n");
J.viewer.StateCreator.appendCmd (s, "select none");
J.viewer.StateCreator.appendCmd (s, J.shape.Shape.getColorCommand ("label", l.defaultPaletteID, l.defaultColix, l.translucentAllowed));
J.viewer.StateCreator.appendCmd (s, "background label " + J.shape.Shape.encodeColor (l.defaultBgcolix));
J.viewer.StateCreator.appendCmd (s, "set labelOffset " + J.viewer.JC.getXOffset (l.defaultOffset) + " " + (-J.viewer.JC.getYOffset (l.defaultOffset)));
var align = J.viewer.JC.getAlignmentName (l.defaultAlignment);
J.viewer.StateCreator.appendCmd (s, "set labelAlignment " + (align.length < 5 ? "left" : align));
var pointer = J.viewer.JC.getPointer (l.defaultPointer);
J.viewer.StateCreator.appendCmd (s, "set labelPointer " + (pointer.length == 0 ? "off" : pointer));
if ((l.defaultZPos & 32) != 0) J.viewer.StateCreator.appendCmd (s, "set labelFront");
 else if ((l.defaultZPos & 16) != 0) J.viewer.StateCreator.appendCmd (s, "set labelGroup");
J.viewer.StateCreator.appendCmd (s, J.shape.Shape.getFontCommand ("label", javajs.awt.Font.getFont3D (l.defaultFontId)));
return s.toString ();
}, "J.shape.Labels");
$_M(c$, "getSelectionState", 
function (sm, sfunc) {
var commands =  new JU.SB ();
if (sfunc != null) {
sfunc.append ("  _setSelectionState;\n");
commands.append ("function _setSelectionState() {\n");
}J.viewer.StateCreator.appendCmd (commands, this.getTrajectoryState ());
var temp =  new java.util.Hashtable ();
var cmd = null;
J.viewer.StateCreator.addBs (commands, "hide ", sm.bsHidden);
J.viewer.StateCreator.addBs (commands, "subset ", sm.bsSubset);
J.viewer.StateCreator.addBs (commands, "delete ", sm.bsDeleted);
J.viewer.StateCreator.addBs (commands, "fix ", sm.bsFixed);
temp.put ("-", sm.bsSelection);
cmd = this.getCommands (temp, null, "select");
if (cmd == null) J.viewer.StateCreator.appendCmd (commands, "select none");
 else commands.append (cmd);
J.viewer.StateCreator.appendCmd (commands, "set hideNotSelected " + sm.hideNotSelected);
commands.append (this.viewer.getShapeProperty (1, "selectionState"));
if (this.viewer.getSelectionHaloEnabled (false)) J.viewer.StateCreator.appendCmd (commands, "SelectionHalos ON");
if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "J.viewer.SelectionManager,JU.SB");
$_V(c$, "getTrajectoryState", 
function () {
var s = "";
var m = this.viewer.modelSet;
if (m.trajectorySteps == null) return "";
for (var i = m.modelCount; --i >= 0; ) {
var t = m.models[i].getSelectedTrajectory ();
if (t >= 0) {
s = " or " + m.getModelNumberDotted (t) + s;
i = m.models[i].trajectoryBaseIndex;
}}
if (s.length > 0) s = "set trajectory {" + s.substring (4) + "}";
return s;
});
$_M(c$, "getViewState", 
function (tm, sfunc) {
var commands =  new JU.SB ();
var moveToText = tm.getMoveToText (0, false);
if (sfunc != null) {
sfunc.append ("  _setPerspectiveState;\n");
commands.append ("function _setPerspectiveState() {\n");
}J.viewer.StateCreator.appendCmd (commands, "set perspectiveModel " + tm.perspectiveModel);
J.viewer.StateCreator.appendCmd (commands, "set scaleAngstromsPerInch " + tm.scale3DAngstromsPerInch);
J.viewer.StateCreator.appendCmd (commands, "set perspectiveDepth " + tm.perspectiveDepth);
J.viewer.StateCreator.appendCmd (commands, "set visualRange " + tm.visualRange);
if (!tm.isWindowCentered ()) J.viewer.StateCreator.appendCmd (commands, "set windowCentered false");
J.viewer.StateCreator.appendCmd (commands, "set cameraDepth " + tm.cameraDepth);
var navigating = (tm.mode == 1);
if (navigating) J.viewer.StateCreator.appendCmd (commands, "set navigationMode true");
J.viewer.StateCreator.appendCmd (commands, this.viewer.getBoundBoxCommand (false));
J.viewer.StateCreator.appendCmd (commands, "center " + J.util.Escape.eP (tm.fixedRotationCenter));
commands.append (this.viewer.getOrientationText (1073742035, null));
J.viewer.StateCreator.appendCmd (commands, moveToText);
if (tm.stereoMode !== J.constant.EnumStereoMode.NONE) J.viewer.StateCreator.appendCmd (commands, "stereo " + (tm.stereoColors == null ? tm.stereoMode.getName () : J.util.Escape.escapeColor (tm.stereoColors[0]) + " " + J.util.Escape.escapeColor (tm.stereoColors[1])) + " " + tm.stereoDegrees);
if (!navigating && !tm.zoomEnabled) J.viewer.StateCreator.appendCmd (commands, "zoom off");
commands.append ("  slab ").appendI (tm.slabPercentSetting).append (";depth ").appendI (tm.depthPercentSetting).append (tm.slabEnabled && !navigating ? ";slab on" : "").append (";\n");
commands.append ("  set slabRange ").appendF (tm.slabRange).append (";\n");
if (tm.zShadeEnabled) commands.append ("  set zShade;\n");
try {
if (tm.zSlabPoint != null) commands.append ("  set zSlab ").append (J.util.Escape.eP (tm.zSlabPoint)).append (";\n");
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (tm.slabPlane != null) commands.append ("  slab plane ").append (J.util.Escape.eP4 (tm.slabPlane)).append (";\n");
if (tm.depthPlane != null) commands.append ("  depth plane ").append (J.util.Escape.eP4 (tm.depthPlane)).append (";\n");
commands.append (this.getSpinState (true)).append ("\n");
if (this.viewer.modelSetHasVibrationVectors () && tm.vibrationOn) J.viewer.StateCreator.appendCmd (commands, "set vibrationPeriod " + tm.vibrationPeriod + ";vibration on");
if (navigating) {
commands.append (tm.getNavigationState ());
if (tm.depthPlane != null || tm.slabPlane != null) commands.append ("  slab on;\n");
}if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "J.viewer.TransformManager,JU.SB");
$_V(c$, "getSpinState", 
function (isAll) {
var tm = this.viewer.transformManager;
var s = "  set spinX " + Clazz_floatToInt (tm.spinX) + "; set spinY " + Clazz_floatToInt (tm.spinY) + "; set spinZ " + Clazz_floatToInt (tm.spinZ) + "; set spinFps " + Clazz_floatToInt (tm.spinFps) + ";";
if (!Float.isNaN (tm.navFps)) s += "  set navX " + Clazz_floatToInt (tm.navX) + "; set navY " + Clazz_floatToInt (tm.navY) + "; set navZ " + Clazz_floatToInt (tm.navZ) + "; set navFps " + Clazz_floatToInt (tm.navFps) + ";";
if (tm.navOn) s += " navigation on;";
if (!tm.spinOn) return s;
var prefix = (tm.isSpinSelected ? "\n  select " + J.util.Escape.eBS (this.viewer.getSelectionSet (false)) + ";\n  rotateSelected" : "\n ");
if (tm.isSpinInternal) {
var pt = JU.P3.newP (tm.internalRotationCenter);
pt.sub (tm.rotationAxis);
s += prefix + " spin " + tm.rotationRate + " " + J.util.Escape.eP (tm.internalRotationCenter) + " " + J.util.Escape.eP (pt);
} else if (tm.isSpinFixed) {
s += prefix + " spin axisangle " + J.util.Escape.eP (tm.rotationAxis) + " " + tm.rotationRate;
} else {
s += " spin on";
}return s + ";";
}, "~B");
$_V(c$, "getInfo", 
function (manager) {
if (Clazz_instanceOf (manager, J.viewer.AnimationManager)) return this.getAnimationInfo (manager);
return null;
}, "~O");
$_M(c$, "getAnimationInfo", 
function (am) {
var info =  new java.util.Hashtable ();
info.put ("firstModelIndex", Integer.$valueOf (am.firstFrameIndex));
info.put ("lastModelIndex", Integer.$valueOf (am.lastFrameIndex));
info.put ("animationDirection", Integer.$valueOf (am.animationDirection));
info.put ("currentDirection", Integer.$valueOf (am.currentDirection));
info.put ("displayModelIndex", Integer.$valueOf (am.currentModelIndex));
if (am.animationFrames != null) {
info.put ("isMovie", Boolean.TRUE);
info.put ("frames", J.util.Escape.eAI (am.animationFrames));
info.put ("currentAnimationFrame", Integer.$valueOf (am.currentAnimationFrame));
}info.put ("displayModelNumber", this.viewer.getModelNumberDotted (am.currentModelIndex));
info.put ("displayModelName", (am.currentModelIndex >= 0 ? this.viewer.getModelName (am.currentModelIndex) : ""));
info.put ("animationFps", Integer.$valueOf (am.animationFps));
info.put ("animationReplayMode", am.animationReplayMode.name ());
info.put ("firstFrameDelay", Float.$valueOf (am.firstFrameDelay));
info.put ("lastFrameDelay", Float.$valueOf (am.lastFrameDelay));
info.put ("animationOn", Boolean.$valueOf (am.animationOn));
info.put ("animationPaused", Boolean.$valueOf (am.animationPaused));
return info;
}, "J.viewer.AnimationManager");
$_V(c$, "getCommands", 
function (htDefine, htMore, selectCmd) {
var s =  new JU.SB ();
var setPrev = J.viewer.StateCreator.getCommands2 (htDefine, s, null, selectCmd);
if (htMore != null) J.viewer.StateCreator.getCommands2 (htMore, s, setPrev, "select");
return s.toString ();
}, "java.util.Map,java.util.Map,~S");
c$.getCommands2 = $_M(c$, "getCommands2", 
function (ht, s, setPrev, selectCmd) {
if (ht == null) return "";
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var set = J.util.Escape.eBS (entry.getValue ());
if (set.length < 5) continue;
set = selectCmd + " " + set;
if (!set.equals (setPrev)) J.viewer.StateCreator.appendCmd (s, set);
setPrev = set;
if (key.indexOf ("-") != 0) J.viewer.StateCreator.appendCmd (s, key);
}
return setPrev;
}, "java.util.Map,JU.SB,~S,~S");
c$.appendCmd = $_M(c$, "appendCmd", 
function (s, cmd) {
if (cmd.length == 0) return;
s.append ("  ").append (cmd).append (";\n");
}, "JU.SB,~S");
c$.addBs = $_M(c$, "addBs", 
function (sb, key, bs) {
if (bs == null || bs.length () == 0) return;
J.viewer.StateCreator.appendCmd (sb, key + J.util.Escape.eBS (bs));
}, "JU.SB,~S,JU.BS");
$_V(c$, "getFontState", 
function (myType, font3d) {
var objId = J.viewer.StateManager.getObjectIdFromName (myType.equalsIgnoreCase ("axes") ? "axis" : myType);
if (objId < 0) return "";
var mad = this.viewer.getObjectMad (objId);
var s =  new JU.SB ().append ("\n");
J.viewer.StateCreator.appendCmd (s, myType + (mad == 0 ? " off" : mad == 1 ? " on" : mad == -1 ? " dotted" : mad < 20 ? " " + mad : " " + (mad / 2000)));
if (s.length () < 3) return "";
var fcmd = J.shape.Shape.getFontCommand (myType, font3d);
if (fcmd.length > 0) fcmd = "  " + fcmd + ";\n";
return (s + fcmd);
}, "~S,javajs.awt.Font");
$_V(c$, "getFontLineShapeState", 
function (s, myType, tickInfos) {
var isOff = (s.indexOf (" off") >= 0);
var sb =  new JU.SB ();
sb.append (s);
for (var i = 0; i < 4; i++) if (tickInfos[i] != null) this.appendTickInfo (myType, sb, tickInfos[i]);

if (isOff) sb.append ("  " + myType + " off;\n");
return sb.toString ();
}, "~S,~S,~A");
$_M(c$, "appendTickInfo", 
function (myType, sb, t) {
sb.append ("  ");
sb.append (myType);
J.viewer.StateCreator.addTickInfo (sb, t, false);
sb.append (";\n");
}, "~S,JU.SB,J.modelset.TickInfo");
c$.addTickInfo = $_M(c$, "addTickInfo", 
function (sb, tickInfo, addFirst) {
sb.append (" ticks ").append (tickInfo.type).append (" ").append (J.util.Escape.eP (tickInfo.ticks));
var isUnitCell = (tickInfo.scale != null && Float.isNaN (tickInfo.scale.x));
if (isUnitCell) sb.append (" UNITCELL");
if (tickInfo.tickLabelFormats != null) sb.append (" format ").append (J.util.Escape.eAS (tickInfo.tickLabelFormats, false));
if (!isUnitCell && tickInfo.scale != null) sb.append (" scale ").append (J.util.Escape.eP (tickInfo.scale));
if (addFirst && !Float.isNaN (tickInfo.first) && tickInfo.first != 0) sb.append (" first ").appendF (tickInfo.first);
if (tickInfo.reference != null) sb.append (" point ").append (J.util.Escape.eP (tickInfo.reference));
}, "JU.SB,J.modelset.TickInfo,~B");
$_V(c$, "getShapeSetState", 
function (as, shape, monomerCount, monomers, bsSizeDefault, temp, temp2) {
var type = J.viewer.JC.shapeClassBases[shape.shapeID];
for (var i = 0; i < monomerCount; i++) {
var atomIndex1 = monomers[i].firstAtomIndex;
var atomIndex2 = monomers[i].lastAtomIndex;
if (as.bsSizeSet != null && (as.bsSizeSet.get (i) || as.bsColixSet != null && as.bsColixSet.get (i))) {
if (bsSizeDefault.get (i)) J.util.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + (as.bsSizeSet.get (i) ? " on" : " off"));
 else J.util.BSUtil.setMapBitSet (temp, atomIndex1, atomIndex2, type + " " + (as.mads[i] / 2000));
}if (as.bsColixSet != null && as.bsColixSet.get (i)) J.util.BSUtil.setMapBitSet (temp2, atomIndex1, atomIndex2, J.shape.Shape.getColorCommand (type, as.paletteIDs[i], as.colixes[i], shape.translucentAllowed));
}
}, "J.shape.AtomShape,J.shape.Shape,~N,~A,JU.BS,java.util.Map,java.util.Map");
$_V(c$, "getMeasurementState", 
function (shape, mList, measurementCount, font3d, ti) {
var commands =  new JU.SB ();
J.viewer.StateCreator.appendCmd (commands, "measures delete");
for (var i = 0; i < measurementCount; i++) {
var m = mList.get (i);
var count = m.count;
var sb =  new JU.SB ().append ("measure");
if (m.thisID != null) sb.append (" ID ").append (J.util.Escape.eS (m.thisID));
if (m.mad != 0) sb.append (" radius ").appendF (m.thisID == null || m.mad > 0 ? m.mad / 2000 : 0);
if (m.colix != 0) sb.append (" color ").append (J.util.Escape.escapeColor (J.util.C.getArgb (m.colix)));
if (m.text != null) {
sb.append (" font ").append (m.text.font.getInfo ());
if (m.text.pymolOffset != null) sb.append (" offset ").append (J.util.Escape.eAF (m.text.pymolOffset));
}var tickInfo = m.tickInfo;
if (tickInfo != null) J.viewer.StateCreator.addTickInfo (sb, tickInfo, true);
for (var j = 1; j <= count; j++) sb.append (" ").append (m.getLabel (j, true, true));

sb.append ("; # " + shape.getInfoAsString (i));
J.viewer.StateCreator.appendCmd (commands, sb.toString ());
}
J.viewer.StateCreator.appendCmd (commands, "select *; set measures " + this.viewer.getMeasureDistanceUnits ());
J.viewer.StateCreator.appendCmd (commands, J.shape.Shape.getFontCommand ("measures", font3d));
var nHidden = 0;
var temp =  new java.util.Hashtable ();
var bs = J.util.BSUtil.newBitSet (measurementCount);
for (var i = 0; i < measurementCount; i++) {
var m = mList.get (i);
if (m.isHidden) {
nHidden++;
bs.set (i);
}if (shape.bsColixSet != null && shape.bsColixSet.get (i)) J.util.BSUtil.setMapBitSet (temp, i, i, J.shape.Shape.getColorCommandUnk ("measure", m.colix, shape.translucentAllowed));
if (m.strFormat != null) J.util.BSUtil.setMapBitSet (temp, i, i, "measure " + J.util.Escape.eS (m.strFormat));
}
if (nHidden > 0) if (nHidden == measurementCount) J.viewer.StateCreator.appendCmd (commands, "measures off; # lines and numbers off");
 else for (var i = 0; i < measurementCount; i++) if (bs.get (i)) J.util.BSUtil.setMapBitSet (temp, i, i, "measure off");

if (ti != null) {
commands.append (" measure ");
J.viewer.StateCreator.addTickInfo (commands, ti, true);
commands.append (";\n");
}if (shape.mad >= 0) commands.append (" set measurements " + (shape.mad / 2000)).append (";\n");
var s = this.getCommands (temp, null, "select measures");
if (s != null && s.length != 0) {
commands.append (s);
J.viewer.StateCreator.appendCmd (commands, "select measures ({null})");
}return commands.toString ();
}, "J.shape.Measures,JU.List,~N,javajs.awt.Font,J.modelset.TickInfo");
$_V(c$, "getBondState", 
function (shape, bsOrderSet, reportAll) {
this.clearTemp ();
var modelSet = this.viewer.modelSet;
var haveTainted = false;
var bonds = modelSet.bonds;
var bondCount = modelSet.bondCount;
var r;
if (reportAll || shape.bsSizeSet != null) {
var i0 = (reportAll ? bondCount - 1 : shape.bsSizeSet.nextSetBit (0));
for (var i = i0; i >= 0; i = (reportAll ? i - 1 : shape.bsSizeSet.nextSetBit (i + 1))) J.util.BSUtil.setMapBitSet (this.temp, i, i, "wireframe " + ((r = bonds[i].mad) == 1 ? "on" : "" + (r / 2000)));

}if (reportAll || bsOrderSet != null) {
var i0 = (reportAll ? bondCount - 1 : bsOrderSet.nextSetBit (0));
for (var i = i0; i >= 0; i = (reportAll ? i - 1 : bsOrderSet.nextSetBit (i + 1))) {
var bond = bonds[i];
if (reportAll || (bond.order & 131072) == 0) J.util.BSUtil.setMapBitSet (this.temp, i, i, "bondOrder " + J.util.JmolEdge.getBondOrderNameFromOrder (bond.order));
}
}if (shape.bsColixSet != null) for (var i = shape.bsColixSet.nextSetBit (0); i >= 0; i = shape.bsColixSet.nextSetBit (i + 1)) {
var colix = bonds[i].colix;
if ((colix & -30721) == 2) J.util.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommand ("bonds", J.constant.EnumPalette.CPK.id, colix, shape.translucentAllowed));
 else J.util.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommandUnk ("bonds", colix, shape.translucentAllowed));
}
var s = this.getCommands (this.temp, null, "select BONDS") + "\n" + (haveTainted ? this.getCommands (this.temp2, null, "select BONDS") + "\n" : "");
this.clearTemp ();
return s;
}, "J.shape.Shape,JU.BS,~B");
$_M(c$, "clearTemp", 
function () {
this.temp.clear ();
this.temp2.clear ();
});
$_V(c$, "getAtomShapeSetState", 
function (shape, bioShapes) {
this.clearTemp ();
for (var i = bioShapes.length; --i >= 0; ) {
var bs = bioShapes[i];
if (bs.monomerCount > 0) {
if (!bs.isActive || bs.bsSizeSet == null && bs.bsColixSet == null) continue;
this.viewer.getShapeSetState (bs, shape, bs.monomerCount, bs.getMonomers (), bs.bsSizeDefault, this.temp, this.temp2);
}}
var s = "\n" + this.getCommands (this.temp, this.temp2, shape.shapeID == 9 ? "Backbone" : "select");
this.clearTemp ();
return s;
}, "J.shape.Shape,~A");
$_M(c$, "getShapeState", 
function (shape) {
var s;
switch (shape.shapeID) {
case 30:
var es = shape;
var sb =  new JU.SB ();
sb.append ("\n  set echo off;\n");
for (var t, $t = es.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) {
sb.append (this.getTextState (t));
if (t.hidden) sb.append ("  set echo ID ").append (J.util.Escape.eS (t.target)).append (" hidden;\n");
}
s = sb.toString ();
break;
case 8:
var hs = shape;
s = this.getAtomShapeState (hs) + (hs.colixSelection == 2 ? "" : hs.colixSelection == 0 ? "  color SelectionHalos NONE;\n" : J.shape.Shape.getColorCommandUnk ("selectionHalos", hs.colixSelection, hs.translucentAllowed) + ";\n");
if (hs.bsHighlight != null) s += "  set highlight " + J.util.Escape.eBS (hs.bsHighlight) + "; " + J.shape.Shape.getColorCommandUnk ("highlight", hs.colixHighlight, hs.translucentAllowed) + ";\n";
break;
case 34:
this.clearTemp ();
var h = shape;
if (h.atomFormats != null) for (var i = this.viewer.getAtomCount (); --i >= 0; ) if (h.atomFormats[i] != null) J.util.BSUtil.setMapBitSet (this.temp, i, i, "set hoverLabel " + J.util.Escape.eS (h.atomFormats[i]));

s = "\n  hover " + J.util.Escape.eS ((h.labelFormat == null ? "" : h.labelFormat)) + ";\n" + this.getCommands (this.temp, null, "select");
this.clearTemp ();
break;
case 5:
this.clearTemp ();
var l = shape;
for (var i = l.bsSizeSet.nextSetBit (0); i >= 0; i = l.bsSizeSet.nextSetBit (i + 1)) {
var t = l.getLabel (i);
var cmd = null;
if (t != null) {
cmd = "label " + J.util.Escape.eS (t.textUnformatted);
if (t.pymolOffset != null) cmd += ";set labelOffset " + J.util.Escape.eAF (t.pymolOffset);
}if (cmd == null) cmd = "label " + J.util.Escape.eS (l.formats[i]);
J.util.BSUtil.setMapBitSet (this.temp, i, i, cmd);
if (l.bsColixSet != null && l.bsColixSet.get (i)) J.util.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand ("label", l.paletteIDs[i], l.colixes[i], l.translucentAllowed));
if (l.bsBgColixSet != null && l.bsBgColixSet.get (i)) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "background label " + J.shape.Shape.encodeColor (l.bgcolixes[i]));
var text = l.getLabel (i);
var sppm = (text != null ? text.getScalePixelsPerMicron () : 0);
if (sppm > 0) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set labelScaleReference " + (10000 / sppm));
if (l.offsets != null && l.offsets.length > i) {
var offsetFull = l.offsets[i];
J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set " + ((offsetFull & 128) == 128 ? "labelOffsetExact " : "labelOffset ") + J.viewer.JC.getXOffset (offsetFull >> 8) + " " + (-J.viewer.JC.getYOffset (offsetFull >> 8)));
var align = J.viewer.JC.getAlignmentName (offsetFull >> 2);
var pointer = J.viewer.JC.getPointer (offsetFull);
if (pointer.length > 0) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set labelPointer " + pointer);
if ((offsetFull & 32) != 0) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set labelFront");
 else if ((offsetFull & 16) != 0) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set labelGroup");
if (align.length > 0) J.util.BSUtil.setMapBitSet (this.temp3, i, i, "set labelAlignment " + align);
}if (l.mads != null && l.mads[i] < 0) J.util.BSUtil.setMapBitSet (this.temp2, i, i, "set toggleLabel");
if (l.bsFontSet != null && l.bsFontSet.get (i)) J.util.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getFontCommand ("label", javajs.awt.Font.getFont3D (l.fids[i])));
}
s = this.getCommands (this.temp, this.temp2, "select") + this.getCommands (null, this.temp3, "select");
this.temp3.clear ();
this.clearTemp ();
break;
case 0:
this.clearTemp ();
var atomCount = this.viewer.getAtomCount ();
var atoms = this.viewer.modelSet.atoms;
var balls = shape;
var colixes = balls.colixes;
var pids = balls.paletteIDs;
var r = 0;
for (var i = 0; i < atomCount; i++) {
if (shape.bsSizeSet != null && shape.bsSizeSet.get (i)) {
if ((r = atoms[i].madAtom) < 0) J.util.BSUtil.setMapBitSet (this.temp, i, i, "Spacefill on");
 else J.util.BSUtil.setMapBitSet (this.temp, i, i, "Spacefill " + (r / 2000));
}if (shape.bsColixSet != null && shape.bsColixSet.get (i)) {
var pid = atoms[i].getPaletteID ();
if (pid != J.constant.EnumPalette.CPK.id || atoms[i].isTranslucent ()) J.util.BSUtil.setMapBitSet (this.temp, i, i, J.shape.Shape.getColorCommand ("atoms", pid, atoms[i].getColix (), shape.translucentAllowed));
if (colixes != null && i < colixes.length) J.util.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand ("balls", pids[i], colixes[i], shape.translucentAllowed));
}}
s = this.getCommands (this.temp, this.temp2, "select");
this.clearTemp ();
break;
default:
s = "";
}
return s;
}, "J.shape.Shape");
$_M(c$, "getTextState", 
function (t) {
var s =  new JU.SB ();
var text = t.getText ();
if (text == null || t.isLabelOrHover || t.target.equals ("error")) return "";
var isImage = (t.image != null);
var strOff = null;
var echoCmd = "set echo ID " + J.util.Escape.eS (t.target);
switch (t.valign) {
case 0:
if (t.movableXPercent == 2147483647 || t.movableYPercent == 2147483647) {
strOff = (t.movableXPercent == 2147483647 ? t.movableX + " " : t.movableXPercent + "% ") + (t.movableYPercent == 2147483647 ? t.movableY + "" : t.movableYPercent + "%");
} else {
strOff = "[" + t.movableXPercent + " " + t.movableYPercent + "%]";
}case 4:
if (strOff == null) strOff = J.util.Escape.eP (t.xyz);
s.append ("  ").append (echoCmd).append (" ").append (strOff);
if (t.align != 1) s.append (";  ").append (echoCmd).append (" ").append (J.viewer.JC.hAlignNames[t.align]);
break;
default:
s.append ("  set echo ").append (J.viewer.JC.vAlignNames[t.valign]).append (" ").append (J.viewer.JC.hAlignNames[t.align]);
}
if (t.valign == 0 && t.movableZPercent != 2147483647) s.append (";  ").append (echoCmd).append (" depth ").appendI (t.movableZPercent);
if (isImage) s.append ("; ").append (echoCmd).append (" IMAGE /*file*/");
 else s.append ("; echo ");
s.append (J.util.Escape.eS (text));
s.append (";\n");
if (isImage && t.imageScale != 1) s.append ("  ").append (echoCmd).append (" scale ").appendF (t.imageScale).append (";\n");
if (t.script != null) s.append ("  ").append (echoCmd).append (" script ").append (J.util.Escape.eS (t.script)).append (";\n");
if (t.modelIndex >= 0) s.append ("  ").append (echoCmd).append (" model ").append (this.viewer.getModelNumberDotted (t.modelIndex)).append (";\n");
if (t.pointerPt != null) {
s.append ("  ").append (echoCmd).append (" point ").append (Clazz_instanceOf (t.pointerPt, J.modelset.Atom) ? "({" + (t.pointerPt).index + "})" : J.util.Escape.eP (t.pointerPt)).append (";\n");
}s.append ("  " + J.shape.Shape.getFontCommand ("echo", t.font));
if (t.scalePixelsPerMicron > 0) s.append (" " + (10000 / t.scalePixelsPerMicron));
s.append ("; color echo");
if (J.util.C.isColixTranslucent (t.colix)) s.append (" translucent " + J.util.C.getColixTranslucencyFractional (t.colix));
s.append (" ").append (J.util.C.getHexCode (t.colix));
if (t.bgcolix != 0) {
s.append ("; color echo background");
if (J.util.C.isColixTranslucent (t.bgcolix)) s.append (" translucent " + J.util.C.getColixTranslucencyFractional (t.bgcolix));
s.append (" ").append (J.util.C.getHexCode (t.bgcolix));
}s.append (";\n");
return s.toString ();
}, "J.modelset.Text");
$_V(c$, "getLoadState", 
function (htParams) {
var g = this.viewer.global;
var str =  new JU.SB ();
J.viewer.StateCreator.appendCmd (str, "set allowEmbeddedScripts false");
if (g.allowEmbeddedScripts) g.setB ("allowEmbeddedScripts", true);
J.viewer.StateCreator.appendCmd (str, "set appendNew " + g.appendNew);
J.viewer.StateCreator.appendCmd (str, "set appletProxy " + J.util.Escape.eS (g.appletProxy));
J.viewer.StateCreator.appendCmd (str, "set applySymmetryToBonds " + g.applySymmetryToBonds);
if (g.atomTypes.length > 0) J.viewer.StateCreator.appendCmd (str, "set atomTypes " + J.util.Escape.eS (g.atomTypes));
J.viewer.StateCreator.appendCmd (str, "set autoBond " + g.autoBond);
if (g.axesOrientationRasmol) J.viewer.StateCreator.appendCmd (str, "set axesOrientationRasmol true");
J.viewer.StateCreator.appendCmd (str, "set bondRadiusMilliAngstroms " + g.bondRadiusMilliAngstroms);
J.viewer.StateCreator.appendCmd (str, "set bondTolerance " + g.bondTolerance);
J.viewer.StateCreator.appendCmd (str, "set defaultLattice " + J.util.Escape.eP (g.ptDefaultLattice));
J.viewer.StateCreator.appendCmd (str, "set defaultLoadFilter " + J.util.Escape.eS (g.defaultLoadFilter));
J.viewer.StateCreator.appendCmd (str, "set defaultLoadScript \"\"");
if (g.defaultLoadScript.length > 0) g.setS ("defaultLoadScript", g.defaultLoadScript);
J.viewer.StateCreator.appendCmd (str, "set defaultStructureDssp " + g.defaultStructureDSSP);
var sMode = this.viewer.getDefaultVdwNameOrData (-2147483648, null, null);
J.viewer.StateCreator.appendCmd (str, "set defaultVDW " + sMode);
if (sMode.equals ("User")) J.viewer.StateCreator.appendCmd (str, this.viewer.getDefaultVdwNameOrData (2147483647, null, null));
J.viewer.StateCreator.appendCmd (str, "set forceAutoBond " + g.forceAutoBond);
J.viewer.StateCreator.appendCmd (str, "#set defaultDirectory " + J.util.Escape.eS (g.defaultDirectory));
J.viewer.StateCreator.appendCmd (str, "#set loadFormat " + J.util.Escape.eS (g.loadFormat));
J.viewer.StateCreator.appendCmd (str, "#set loadLigandFormat " + J.util.Escape.eS (g.loadLigandFormat));
J.viewer.StateCreator.appendCmd (str, "#set smilesUrlFormat " + J.util.Escape.eS (g.smilesUrlFormat));
J.viewer.StateCreator.appendCmd (str, "#set nihResolverFormat " + J.util.Escape.eS (g.nihResolverFormat));
J.viewer.StateCreator.appendCmd (str, "#set pubChemFormat " + J.util.Escape.eS (g.pubChemFormat));
J.viewer.StateCreator.appendCmd (str, "#set edsUrlFormat " + J.util.Escape.eS (g.edsUrlFormat));
J.viewer.StateCreator.appendCmd (str, "#set edsUrlCutoff " + J.util.Escape.eS (g.edsUrlCutoff));
J.viewer.StateCreator.appendCmd (str, "set legacyAutoBonding " + g.legacyAutoBonding);
J.viewer.StateCreator.appendCmd (str, "set legacyHAddition " + g.legacyHAddition);
J.viewer.StateCreator.appendCmd (str, "set minBondDistance " + g.minBondDistance);
J.viewer.StateCreator.appendCmd (str, "set minimizationCriterion  " + g.minimizationCriterion);
J.viewer.StateCreator.appendCmd (str, "set minimizationSteps  " + g.minimizationSteps);
J.viewer.StateCreator.appendCmd (str, "set pdbAddHydrogens " + (htParams != null && htParams.get ("pdbNoHydrogens") !== Boolean.TRUE ? g.pdbAddHydrogens : false));
J.viewer.StateCreator.appendCmd (str, "set pdbGetHeader " + g.pdbGetHeader);
J.viewer.StateCreator.appendCmd (str, "set pdbSequential " + g.pdbSequential);
J.viewer.StateCreator.appendCmd (str, "set percentVdwAtom " + g.percentVdwAtom);
J.viewer.StateCreator.appendCmd (str, "set smallMoleculeMaxAtoms " + g.smallMoleculeMaxAtoms);
J.viewer.StateCreator.appendCmd (str, "set smartAromatic " + g.smartAromatic);
if (g.zeroBasedXyzRasmol) J.viewer.StateCreator.appendCmd (str, "set zeroBasedXyzRasmol true");
return str.toString ();
}, "java.util.Map");
$_V(c$, "getAllSettings", 
function (prefix) {
var g = this.viewer.global;
var commands =  new JU.SB ();
var list =  new Array (g.htBooleanParameterFlags.size () + g.htNonbooleanParameterValues.size () + g.htUserVariables.size ());
var n = 0;
var _prefix = "_" + prefix;
for (var key, $key = g.htBooleanParameterFlags.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (prefix == null || key.indexOf (prefix) == 0 || key.indexOf (_prefix) == 0) list[n++] = (key.indexOf ("_") == 0 ? key + " = " : "set " + key + " ") + g.htBooleanParameterFlags.get (key);
}
for (var key, $key = g.htNonbooleanParameterValues.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (key.charAt (0) != '@' && (prefix == null || key.indexOf (prefix) == 0 || key.indexOf (_prefix) == 0)) {
var value = g.htNonbooleanParameterValues.get (key);
if (Clazz_instanceOf (value, String)) value = J.viewer.StateCreator.chop (J.util.Escape.eS (value));
list[n++] = (key.indexOf ("_") == 0 ? key + " = " : "set " + key + " ") + value;
}}
for (var key, $key = g.htUserVariables.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (prefix == null || key.indexOf (prefix) == 0) {
var value = g.htUserVariables.get (key);
var s = value.asString ();
list[n++] = key + " " + (key.startsWith ("@") ? "" : "= ") + (value.tok == 4 ? J.viewer.StateCreator.chop (J.util.Escape.eS (s)) : s);
}}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) J.viewer.StateCreator.appendCmd (commands, list[i]);

commands.append ("\n");
return commands.toString ();
}, "~S");
c$.chop = $_M(c$, "chop", 
function (s) {
var len = s.length;
if (len < 512) return s;
var sb =  new JU.SB ();
var sep = "\"\\\n    + \"";
var pt = 0;
for (var i = 72; i < len; pt = i, i += 72) {
while (s.charAt (i - 1) == '\\') i++;

sb.append ((pt == 0 ? "" : sep)).append (s.substring (pt, i));
}
sb.append (sep).append (s.substring (pt, len));
return sb.toString ();
}, "~S");
$_V(c$, "getAtomShapeState", 
function (shape) {
this.clearTemp ();
var type = J.viewer.JC.shapeClassBases[shape.shapeID];
if (shape.bsSizeSet != null) for (var i = shape.bsSizeSet.nextSetBit (0); i >= 0; i = shape.bsSizeSet.nextSetBit (i + 1)) J.util.BSUtil.setMapBitSet (this.temp, i, i, type + (shape.mads[i] < 0 ? " on" : " " + shape.mads[i] / 2000));

if (shape.bsColixSet != null) for (var i = shape.bsColixSet.nextSetBit (0); i >= 0; i = shape.bsColixSet.nextSetBit (i + 1)) J.util.BSUtil.setMapBitSet (this.temp2, i, i, J.shape.Shape.getColorCommand (type, shape.paletteIDs[i], shape.colixes[i], shape.translucentAllowed));

var s = this.getCommands (this.temp, this.temp2, "select");
this.clearTemp ();
return s;
}, "J.shape.AtomShape");
$_V(c$, "getFunctionCalls", 
function (selectedFunction) {
if (selectedFunction == null) selectedFunction = "";
var s =  new JU.SB ();
var pt = selectedFunction.indexOf ("*");
var isGeneric = (pt >= 0);
var isStatic = (selectedFunction.indexOf ("static_") == 0);
var namesOnly = (selectedFunction.equalsIgnoreCase ("names") || selectedFunction.equalsIgnoreCase ("static_names"));
if (namesOnly) selectedFunction = "";
if (isGeneric) selectedFunction = selectedFunction.substring (0, pt);
selectedFunction = selectedFunction.toLowerCase ();
var ht = (isStatic ? J.viewer.Viewer.staticFunctions : this.viewer.localFunctions);
var names =  new Array (ht.size ());
var n = 0;
for (var name, $name = ht.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) if (selectedFunction.length == 0 && !name.startsWith ("_") || name.equalsIgnoreCase (selectedFunction) || isGeneric && name.toLowerCase ().indexOf (selectedFunction) == 0) names[n++] = name;

java.util.Arrays.sort (names, 0, n);
for (var i = 0; i < n; i++) {
var f = ht.get (names[i]);
s.append (namesOnly ? f.getSignature () : f.toString ());
s.appendC ('\n');
}
return s.toString ();
}, "~S");
c$.isTainted = $_M(c$, "isTainted", 
function (tainted, atomIndex, type) {
return (tainted != null && tainted[type] != null && tainted[type].get (atomIndex));
}, "~A,~N,~N");
$_V(c$, "getAtomicPropertyState", 
function (taintWhat, bsSelected) {
if (!this.viewer.global.preserveState) return "";
var bs;
var commands =  new JU.SB ();
for (var type = 0; type < 14; type++) if (taintWhat < 0 || type == taintWhat) if ((bs = (bsSelected != null ? bsSelected : this.viewer.getTaintedAtoms (type))) != null) this.getAtomicPropertyStateBuffer (commands, type, bs, null, null);

return commands.toString ();
}, "~N,JU.BS");
$_V(c$, "getAtomicPropertyStateBuffer", 
function (commands, type, bs, label, fData) {
if (!this.viewer.global.preserveState) return;
var s =  new JU.SB ();
var dataLabel = (label == null ? J.modelset.AtomCollection.userSettableValues[type] : label) + " set";
var n = 0;
var isDefault = (type == 2);
var atoms = this.viewer.modelSet.atoms;
var tainted = this.viewer.modelSet.tainted;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
s.appendI (i + 1).append (" ").append (atoms[i].getElementSymbol ()).append (" ").append (atoms[i].getInfo ().$replace (' ', '_')).append (" ");
switch (type) {
case 14:
if (i < fData.length) s.appendF (fData[i]);
break;
case 13:
s.appendI (atoms[i].getAtomNumber ());
break;
case 0:
s.append (atoms[i].getAtomName ());
break;
case 1:
s.append (atoms[i].getAtomType ());
break;
case 2:
if (J.viewer.StateCreator.isTainted (tainted, i, 2)) isDefault = false;
s.appendF (atoms[i].x).append (" ").appendF (atoms[i].y).append (" ").appendF (atoms[i].z);
break;
case 12:
var v = atoms[i].getVibrationVector ();
if (v == null) v =  new JU.V3 ();
s.appendF (v.x).append (" ").appendF (v.y).append (" ").appendF (v.z);
break;
case 3:
s.appendI (atoms[i].getAtomicAndIsotopeNumber ());
break;
case 4:
s.appendI (atoms[i].getFormalCharge ());
break;
case 6:
s.appendF (atoms[i].getBondingRadiusFloat ());
break;
case 7:
s.appendI (atoms[i].getOccupancy100 ());
break;
case 8:
s.appendF (atoms[i].getPartialCharge ());
break;
case 9:
s.appendF (atoms[i].getBfactor100 () / 100);
break;
case 10:
s.appendI (atoms[i].getValence ());
break;
case 11:
s.appendF (atoms[i].getVanderwaalsRadiusFloat (this.viewer, J.constant.EnumVdw.AUTO));
break;
}
s.append (" ;\n");
++n;
}
if (n == 0) return;
if (isDefault) dataLabel += "(default)";
commands.append ("\n  DATA \"" + dataLabel + "\"\n").appendI (n).append (" ;\nJmol Property Data Format 1 -- Jmol ").append (J.viewer.Viewer.getJmolVersion ()).append (";\n");
commands.appendSB (s);
commands.append ("  end \"" + dataLabel + "\";\n");
}, "JU.SB,~N,JU.BS,~S,~A");
$_V(c$, "getAtomDefs", 
function (names) {
var sb =  new JU.SB ();
for (var e, $e = names.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if (Clazz_instanceOf (e.getValue (), JU.BS)) sb.append ("{" + e.getKey () + "} <" + (e.getValue ()).cardinality () + " atoms>\n");
}
return sb.append ("\n").toString ();
}, "java.util.Map");
$_V(c$, "undoMoveAction", 
function (action, n) {
switch (action) {
case 4165:
case 4139:
switch (n) {
case -2:
this.viewer.undoClear ();
break;
case -1:
(action == 4165 ? this.viewer.actionStates : this.viewer.actionStatesRedo).clear ();
break;
case 0:
n = 2147483647;
default:
if (n > 100) n = (action == 4165 ? this.viewer.actionStates : this.viewer.actionStatesRedo).size ();
for (var i = 0; i < n; i++) this.undoMoveActionClear (0, action, true);

}
break;
}
}, "~N,~N");
$_V(c$, "undoMoveActionClear", 
function (taintedAtom, type, clearRedo) {
if (!this.viewer.global.preserveState) return;
var modelIndex = (taintedAtom >= 0 ? this.viewer.modelSet.atoms[taintedAtom].modelIndex : this.viewer.modelSet.modelCount - 1);
switch (type) {
case 4139:
case 4165:
this.viewer.stopMinimization ();
var s = "";
var list1;
var list2;
switch (type) {
default:
case 4165:
list1 = this.viewer.actionStates;
list2 = this.viewer.actionStatesRedo;
break;
case 4139:
list1 = this.viewer.actionStatesRedo;
list2 = this.viewer.actionStates;
if (this.viewer.actionStatesRedo.size () == 1) return;
break;
}
if (list1.size () == 0 || this.undoWorking) return;
this.undoWorking = true;
list2.add (0, list1.remove (0));
s = this.viewer.actionStatesRedo.get (0);
if (type == 4165 && list2.size () == 1) {
var pt = [1];
type = JU.PT.parseIntNext (s, pt);
taintedAtom = JU.PT.parseIntNext (s, pt);
this.undoMoveActionClear (taintedAtom, type, false);
}if (this.viewer.modelSet.models[modelIndex].isModelkit () || s.indexOf ("zap ") < 0) {
if (J.util.Logger.debugging) this.viewer.log (s);
this.viewer.evalStringQuiet (s);
} else {
this.viewer.actionStates.clear ();
}break;
default:
if (this.undoWorking && clearRedo) return;
this.undoWorking = true;
var bs;
var sb =  new JU.SB ();
sb.append ("#" + type + " " + taintedAtom + " " + ( new java.util.Date ()) + "\n");
if (taintedAtom >= 0) {
bs = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
this.viewer.modelSet.taintAtoms (bs, type);
sb.append (this.getAtomicPropertyState (-1, null));
} else {
bs = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
sb.append ("zap ");
sb.append (J.util.Escape.eBS (bs)).append (";");
this.getInlineData (sb, this.viewer.getModelExtract (bs, false, true, "MOL"), true, null);
sb.append ("set refreshing false;").append (this.viewer.actionManager.getPickingState ()).append (this.viewer.transformManager.getMoveToText (0, false)).append ("set refreshing true;");
}if (clearRedo) {
this.viewer.actionStates.add (0, sb.toString ());
this.viewer.actionStatesRedo.clear ();
} else {
this.viewer.actionStatesRedo.add (1, sb.toString ());
}if (this.viewer.actionStates.size () == 100) {
this.viewer.actionStates.remove (99);
}}
this.undoWorking = !clearRedo;
}, "~N,~N,~B");
$_V(c$, "syncScript", 
function (script, applet, port) {
var sm = this.viewer.statusManager;
if ("GET_GRAPHICS".equalsIgnoreCase (script)) {
sm.setSyncDriver (5);
sm.syncSend (script, applet, 0);
this.viewer.setBooleanProperty ("_syncMouse", false);
this.viewer.setBooleanProperty ("_syncScript", false);
return;
}if ("=".equals (applet)) {
applet = "~";
sm.setSyncDriver (2);
}var disableSend = "~".equals (applet);
if (port > 0 || !disableSend && !".".equals (applet)) {
sm.syncSend (script, applet, port);
if (!"*".equals (applet) || script.startsWith ("{")) return;
}if (script.equalsIgnoreCase ("on") || script.equalsIgnoreCase ("true")) {
sm.setSyncDriver (1);
return;
}if (script.equalsIgnoreCase ("off") || script.equalsIgnoreCase ("false")) {
sm.setSyncDriver (0);
return;
}if (script.equalsIgnoreCase ("slave")) {
sm.setSyncDriver (2);
return;
}var syncMode = sm.getSyncMode ();
if (syncMode == 0) return;
if (syncMode != 1) disableSend = false;
if (J.util.Logger.debugging) J.util.Logger.debug (this.viewer.htmlName + " syncing with script: " + script);
if (disableSend) sm.setSyncDriver (3);
if (script.indexOf ("Mouse: ") != 0) {
if (script.startsWith ("Peaks: [")) {
var list = J.util.Escape.unescapeStringArray (script.substring (7));
var peaks =  new JU.List ();
for (var i = 0; i < list.length; i++) peaks.addLast (list[i]);

this.viewer.getModelSet ().setModelAuxiliaryInfo (this.viewer.getCurrentModelIndex (), "jdxAtomSelect_1HNMR", peaks);
return;
}if (script.startsWith ("Select: ")) {
var filename = JU.PT.getQuotedAttribute (script, "file");
if (filename.startsWith (J.viewer.StateCreator.SIMULATION_PROTOCOL + "MOL=")) filename = null;
var modelID = JU.PT.getQuotedAttribute (script, "model");
var baseModel = JU.PT.getQuotedAttribute (script, "baseModel");
var atoms = JU.PT.getQuotedAttribute (script, "atoms");
var select = JU.PT.getQuotedAttribute (script, "select");
var script2 = JU.PT.getQuotedAttribute (script, "script");
var isNIH = (modelID != null && modelID.startsWith ("$"));
if (isNIH) filename = this.viewer.setLoadFormat (modelID, '$', false);
var id = (modelID == null ? null : (filename == null ? "" : filename + "#") + modelID);
if ("".equals (baseModel)) id += ".baseModel";
var modelIndex = (id == null ? -3 : this.viewer.getModelIndexFromId (id));
if (modelIndex == -2) return;
script = (modelIndex == -1 && filename != null ? script = "load " + J.util.Escape.eS (filename) : "");
script = JU.PT.simpleReplace (script, J.viewer.StateCreator.SIMULATION_PROTOCOL, "");
if (id != null) script += ";model " + J.util.Escape.eS (id);
if (atoms != null) script += ";select visible & (@" + JU.PT.simpleReplace (atoms, ",", " or @") + ")";
 else if (select != null) script += ";select visible & (" + select + ")";
if (script2 != null) script += ";" + script2;
} else if (script.toUpperCase ().startsWith ("JSPECVIEW")) {
if (!disableSend) sm.syncSend (this.viewer.fullName + "JSpecView" + script.substring (9), ">", 0);
return;
}this.viewer.evalStringQuietSync (script, true, false);
return;
}this.mouseScript (script);
if (disableSend) this.viewer.setSyncDriver (4);
}, "~S,~S,~N");
$_V(c$, "mouseScript", 
function (script) {
var tokens = JU.PT.getTokens (script);
var key = tokens[1];
try {
key = (key.toLowerCase () + "...............").substring (0, 15);
switch (("zoombyfactor...zoomby.........rotatezby......rotatexyby.....translatexyby..rotatemolecule.spinxyby.......rotatearcball..").indexOf (key)) {
case 0:
switch (tokens.length) {
case 3:
this.viewer.zoomByFactor (JU.PT.parseFloat (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.viewer.zoomByFactor (JU.PT.parseFloat (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
return;
}
break;
case 15:
switch (tokens.length) {
case 3:
this.viewer.zoomBy (JU.PT.parseInt (tokens[2]));
return;
}
break;
case 30:
switch (tokens.length) {
case 3:
this.viewer.rotateZBy (JU.PT.parseInt (tokens[2]), 2147483647, 2147483647);
return;
case 5:
this.viewer.rotateZBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseInt (tokens[4]));
}
break;
case 45:
this.viewer.rotateXYBy (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]));
return;
case 60:
this.viewer.translateXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]));
return;
case 75:
this.viewer.rotateSelected (JU.PT.parseFloat (tokens[2]), JU.PT.parseFloat (tokens[3]), null);
return;
case 90:
this.viewer.spinXYBy (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseFloat (tokens[4]));
return;
case 105:
this.viewer.rotateArcBall (JU.PT.parseInt (tokens[2]), JU.PT.parseInt (tokens[3]), JU.PT.parseFloat (tokens[4]));
return;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.viewer.showString ("error reading SYNC command: " + script, false);
}, "~S");
Clazz_defineStatics (c$,
"SIMULATION_PROTOCOL", "http://SIMULATION/",
"MAX_ACTION_UNDO", 100);
});
})(Clazz
,Clazz.newArray
,Clazz.newBooleanArray
,Clazz.newByteArray
,Clazz.newCharArray
,Clazz.newDoubleArray
,Clazz.newFloatArray
,Clazz.newIntArray
,Clazz.newLongArray
,Clazz.newShortArray
,Clazz.prepareCallback
,Clazz.decorateAsClass
,Clazz.isClassDefined
,Clazz.defineEnumConstant
,Clazz.cloneFinals
,Clazz.inheritArgs
,Clazz.pu$h
,Clazz.declareInterface
,Clazz.declarePackage
,Clazz.makeConstructor
,Clazz.overrideConstructor
,Clazz.load
,Clazz.defineMethod
,Clazz.innerTypeInstance
,Clazz.instanceOf
,Clazz.p0p
,Clazz.makeFunction
,Clazz.superConstructor
,Clazz.defineStatics
,Clazz.registerSerializableFields
,Clazz.declareType
,Clazz.superCall
,Clazz.overrideMethod
,Clazz.declareAnonymous
,Clazz.checkPrivateMethod
,Clazz.prepareFields
,Clazz.instantialize
,Clazz.doubleToInt
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.supportsNativeObject
,Clazz.extendedObjectMethods
,Clazz.callingStackTraces
,Clazz.clone
,Clazz.doubleToShort
,Clazz.innerFunctions
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
);
