Clazz.declarePackage ("J.viewer");
Clazz.load (["java.util.Hashtable"], "J.viewer.StateManager", ["java.util.Arrays", "JU.BS", "$.SB", "J.modelset.Orientation", "J.util.BSUtil", "J.viewer.GlobalSettings"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.saved = null;
this.lastOrientation = "";
this.lastConnections = "";
this.lastScene = "";
this.lastSelected = "";
this.lastState = "";
this.lastShape = "";
this.lastCoordinates = "";
if (!Clazz.isClassDefined ("J.viewer.StateManager.Scene")) {
J.viewer.StateManager.$StateManager$Scene$ ();
}
if (!Clazz.isClassDefined ("J.viewer.StateManager.Connections")) {
J.viewer.StateManager.$StateManager$Connections$ ();
}
if (!Clazz.isClassDefined ("J.viewer.StateManager.Connection")) {
J.viewer.StateManager.$StateManager$Connection$ ();
}
Clazz.instantialize (this, arguments);
}, J.viewer, "StateManager");
Clazz.prepareFields (c$, function () {
this.saved =  new java.util.Hashtable ();
});
c$.getVariableList = $_M(c$, "getVariableList", 
function (htVariables, nMax, withSites, definedOnly) {
var sb =  new JU.SB ();
var n = 0;
var list =  new Array (htVariables.size ());
for (var entry, $entry = htVariables.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var $var = entry.getValue ();
if ((withSites || !key.startsWith ("site_")) && (!definedOnly || key.charAt (0) == '@')) list[n++] = key + (key.charAt (0) == '@' ? " " + $var.asString () : " = " + J.viewer.StateManager.varClip (key, $var.escape (), nMax));
}
java.util.Arrays.sort (list, 0, n);
for (var i = 0; i < n; i++) if (list[i] != null) sb.append ("  ").append (list[i]).append (";\n");

if (n == 0 && !definedOnly) sb.append ("# --no global user variables defined--;\n");
return sb.toString ();
}, "java.util.Map,~N,~B,~B");
c$.getObjectIdFromName = $_M(c$, "getObjectIdFromName", 
function (name) {
if (name == null) return -1;
var objID = "background axis1      axis2      axis3      boundbox   unitcell   frank      ".indexOf (name.toLowerCase ());
return (objID < 0 ? objID : Clazz.doubleToInt (objID / 11));
}, "~S");
c$.getObjectNameFromId = $_M(c$, "getObjectNameFromId", 
function (objId) {
if (objId < 0 || objId >= 8) return null;
return "background axis1      axis2      axis3      boundbox   unitcell   frank      ".substring (objId * 11, objId * 11 + 11).trim ();
}, "~N");
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
}, "J.viewer.Viewer");
$_M(c$, "getGlobalSettings", 
function (gsOld, clearUserVariables) {
this.saved.clear ();
return  new J.viewer.GlobalSettings (this.viewer, gsOld, clearUserVariables);
}, "J.viewer.GlobalSettings,~B");
$_M(c$, "clear", 
function (global) {
this.viewer.setShowAxes (false);
this.viewer.setShowBbcage (false);
this.viewer.setShowUnitCell (false);
global.clear ();
}, "J.viewer.GlobalSettings");
$_M(c$, "setCrystallographicDefaults", 
function () {
this.viewer.setAxesModeUnitCell (true);
this.viewer.setShowAxes (true);
this.viewer.setShowUnitCell (true);
this.viewer.setBooleanProperty ("perspectiveDepth", false);
});
$_M(c$, "setCommonDefaults", 
($fz = function () {
this.viewer.setBooleanProperty ("perspectiveDepth", true);
this.viewer.setFloatProperty ("bondTolerance", 0.45);
this.viewer.setFloatProperty ("minBondDistance", 0.4);
this.viewer.setBooleanProperty ("translucent", true);
}, $fz.isPrivate = true, $fz));
$_M(c$, "setJmolDefaults", 
function () {
this.setCommonDefaults ();
this.viewer.setStringProperty ("ColorScheme", "Jmol");
this.viewer.setBooleanProperty ("axesOrientationRasmol", false);
this.viewer.setBooleanProperty ("zeroBasedXyzRasmol", false);
this.viewer.setIntProperty ("percentVdwAtom", 23);
this.viewer.setIntProperty ("bondRadiusMilliAngstroms", 150);
this.viewer.setVdwStr ("auto");
});
$_M(c$, "setRasMolDefaults", 
function () {
this.setCommonDefaults ();
this.viewer.setStringProperty ("defaultColorScheme", "RasMol");
this.viewer.setBooleanProperty ("axesOrientationRasmol", true);
this.viewer.setBooleanProperty ("zeroBasedXyzRasmol", true);
this.viewer.setIntProperty ("percentVdwAtom", 0);
this.viewer.setIntProperty ("bondRadiusMilliAngstroms", 1);
this.viewer.setVdwStr ("Rasmol");
});
$_M(c$, "setPyMOLDefaults", 
function () {
this.setCommonDefaults ();
this.viewer.setStringProperty ("measurementUnits", "ANGSTROMS");
this.viewer.setBooleanProperty ("zoomHeight", true);
});
c$.getNoCase = $_M(c$, "getNoCase", 
($fz = function (saved, name) {
for (var e, $e = saved.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getKey ().equalsIgnoreCase (name)) return e.getValue ();

return null;
}, $fz.isPrivate = true, $fz), "java.util.Map,~S");
$_M(c$, "listSavedStates", 
function () {
var names = "";
for (var name, $name = this.saved.keySet ().iterator (); $name.hasNext () && ((name = $name.next ()) || true);) names += "\n" + name;

return names;
});
$_M(c$, "deleteSavedType", 
($fz = function (type) {
var e = this.saved.keySet ().iterator ();
while (e.hasNext ()) {
var name = e.next ();
if (name.startsWith (type)) {
e.remove ();
}}
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "deleteSaved", 
function (name) {
this.saved.remove (name);
}, "~S");
$_M(c$, "saveSelection", 
function (saveName, bsSelected) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Selected_");
return;
}saveName = this.lastSelected = "Selected_" + saveName;
this.saved.put (saveName, J.util.BSUtil.copy (bsSelected));
}, "~S,JU.BS");
$_M(c$, "restoreSelection", 
function (saveName) {
var name = (saveName.length > 0 ? "Selected_" + saveName : this.lastSelected);
var bsSelected = J.viewer.StateManager.getNoCase (this.saved, name);
if (bsSelected == null) {
this.viewer.select ( new JU.BS (), false, 0, false);
return false;
}this.viewer.select (bsSelected, false, 0, false);
return true;
}, "~S");
$_M(c$, "saveState", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("State_");
return;
}saveName = this.lastState = "State_" + saveName;
this.saved.put (saveName, this.viewer.getStateInfo ());
}, "~S");
$_M(c$, "getSavedState", 
function (saveName) {
var name = (saveName.length > 0 ? "State_" + saveName : this.lastState);
var script = J.viewer.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
$_M(c$, "saveStructure", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Shape_");
return;
}saveName = this.lastShape = "Shape_" + saveName;
this.saved.put (saveName, this.viewer.getStructureState ());
}, "~S");
$_M(c$, "getSavedStructure", 
function (saveName) {
var name = (saveName.length > 0 ? "Shape_" + saveName : this.lastShape);
var script = J.viewer.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
$_M(c$, "saveCoordinates", 
function (saveName, bsSelected) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Coordinates_");
return;
}saveName = this.lastCoordinates = "Coordinates_" + saveName;
this.saved.put (saveName, this.viewer.getCoordinateState (bsSelected));
}, "~S,JU.BS");
$_M(c$, "getSavedCoordinates", 
function (saveName) {
var name = (saveName.length > 0 ? "Coordinates_" + saveName : this.lastCoordinates);
var script = J.viewer.StateManager.getNoCase (this.saved, name);
return (script == null ? "" : script);
}, "~S");
$_M(c$, "getOrientation", 
function () {
return  new J.modelset.Orientation (this.viewer, false, null);
});
$_M(c$, "getSavedOrientationText", 
function (saveName) {
var o;
if (saveName != null) {
o = this.getOrientationFor (saveName);
return (o == null ? "" : o.getMoveToText (true));
}var sb =  new JU.SB ();
for (var e, $e = this.saved.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.startsWith ("Orientation_")) sb.append ((e.getValue ()).getMoveToText (true));
}
return sb.toString ();
}, "~S");
$_M(c$, "saveScene", 
function (saveName, scene) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Scene_");
return;
}var o = Clazz.innerTypeInstance (J.viewer.StateManager.Scene, this, null, scene);
o.saveName = this.lastScene = "Scene_" + saveName;
this.saved.put (o.saveName, o);
}, "~S,java.util.Map");
$_M(c$, "restoreScene", 
function (saveName, timeSeconds) {
var o = this.getSceneFor (saveName);
return (o != null && o.restore (timeSeconds));
}, "~S,~N");
$_M(c$, "getSceneFor", 
($fz = function (saveName) {
var name = (saveName.length > 0 ? "Scene_" + saveName : this.lastScene);
return J.viewer.StateManager.getNoCase (this.saved, name);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "saveOrientation", 
function (saveName, pymolView) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Orientation_");
return;
}var o =  new J.modelset.Orientation (this.viewer, saveName.equalsIgnoreCase ("default"), pymolView);
o.saveName = this.lastOrientation = "Orientation_" + saveName;
this.saved.put (o.saveName, o);
}, "~S,~A");
$_M(c$, "restoreOrientation", 
function (saveName, timeSeconds, isAll) {
var o = this.getOrientationFor (saveName);
return (o != null && o.restore (timeSeconds, isAll));
}, "~S,~N,~B");
$_M(c$, "getOrientationFor", 
($fz = function (saveName) {
var name = (saveName.length > 0 ? "Orientation_" + saveName : this.lastOrientation);
return J.viewer.StateManager.getNoCase (this.saved, name);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "saveBonds", 
function (saveName) {
if (saveName.equalsIgnoreCase ("DELETE")) {
this.deleteSavedType ("Bonds_");
return;
}var b = Clazz.innerTypeInstance (J.viewer.StateManager.Connections, this, null);
b.saveName = this.lastConnections = "Bonds_" + saveName;
this.saved.put (b.saveName, b);
}, "~S");
$_M(c$, "restoreBonds", 
function (saveName) {
var name = (saveName.length > 0 ? "Bonds_" + saveName : this.lastConnections);
var c = J.viewer.StateManager.getNoCase (this.saved, name);
return (c != null && c.restore ());
}, "~S");
c$.varClip = $_M(c$, "varClip", 
function (name, sv, nMax) {
if (nMax > 0 && sv.length > nMax) sv = sv.substring (0, nMax) + " #...more (" + sv.length + " bytes -- use SHOW " + name + " or MESSAGE @" + name + " to view)";
return sv;
}, "~S,~S,~N");
c$.$StateManager$Scene$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.saveName = null;
this.scene = null;
Clazz.instantialize (this, arguments);
}, J.viewer.StateManager, "Scene");
Clazz.makeConstructor (c$, 
function (a) {
this.scene = a;
}, "java.util.Map");
$_M(c$, "restore", 
function (a) {
var b = this.scene.get ("generator");
if (b != null) b.generateScene (this.scene);
var c = this.scene.get ("pymolView");
return (c != null && this.b$["J.viewer.StateManager"].viewer.movePyMOL (this.b$["J.viewer.StateManager"].viewer.eval, a, c));
}, "~N");
c$ = Clazz.p0p ();
};
c$.$StateManager$Connections$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.saveName = null;
this.bondCount = 0;
this.connections = null;
Clazz.instantialize (this, arguments);
}, J.viewer.StateManager, "Connections");
Clazz.makeConstructor (c$, 
function () {
var a = this.b$["J.viewer.StateManager"].viewer.getModelSet ();
if (a == null) return;
this.bondCount = a.bondCount;
this.connections =  new Array (this.bondCount + 1);
var b = a.bonds;
for (var c = this.bondCount; --c >= 0; ) {
var d = b[c];
this.connections[c] = Clazz.innerTypeInstance (J.viewer.StateManager.Connection, this, null, d.getAtomIndex1 (), d.getAtomIndex2 (), d.mad, d.colix, d.order, d.getEnergy (), d.getShapeVisibilityFlags ());
}
});
$_M(c$, "restore", 
function () {
var a = this.b$["J.viewer.StateManager"].viewer.getModelSet ();
if (a == null) return false;
a.deleteAllBonds ();
for (var b = this.bondCount; --b >= 0; ) {
var c = this.connections[b];
var d = a.getAtomCount ();
if (c.atomIndex1 >= d || c.atomIndex2 >= d) continue;
var e = a.bondAtoms (a.atoms[c.atomIndex1], a.atoms[c.atomIndex2], c.order, c.mad, null, c.energy, false, true);
e.setColix (c.colix);
e.setShapeVisibilityFlags (c.shapeVisibilityFlags);
}
for (var c = this.bondCount; --c >= 0; ) a.getBondAt (c).setIndex (c);

this.b$["J.viewer.StateManager"].viewer.setShapeProperty (1, "reportAll", null);
return true;
});
c$ = Clazz.p0p ();
};
c$.$StateManager$Connection$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.atomIndex1 = 0;
this.atomIndex2 = 0;
this.mad = 0;
this.colix = 0;
this.order = 0;
this.energy = 0;
this.shapeVisibilityFlags = 0;
Clazz.instantialize (this, arguments);
}, J.viewer.StateManager, "Connection");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
this.atomIndex1 = a;
this.atomIndex2 = b;
this.mad = c;
this.colix = d;
this.order = e;
this.energy = f;
this.shapeVisibilityFlags = g;
}, "~N,~N,~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"OBJ_BACKGROUND", 0,
"OBJ_AXIS1", 1,
"OBJ_AXIS2", 2,
"OBJ_AXIS3", 3,
"OBJ_BOUNDBOX", 4,
"OBJ_UNITCELL", 5,
"OBJ_FRANK", 6,
"OBJ_MAX", 8,
"objectNameList", "background axis1      axis2      axis3      boundbox   unitcell   frank      ");
});
