Clazz.declarePackage ("JSV.popup");
Clazz.load (["JSV.api.JSVAbstractMenu", "$.JSVPopupMenu", "java.util.Hashtable", "$.Properties", "JU.List"], "JSV.popup.JSVGenericPopup", ["java.util.StringTokenizer", "JU.PT", "$.SB", "JSV.common.Annotation", "$.JSVersion", "JSV.popup.JSVPopupResourceBundle", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.htCheckbox = null;
this.menuText = null;
this.buttonGroup = null;
this.currentMenuItemId = null;
this.strMenuStructure = null;
this.updateMode = 0;
this.menuName = null;
this.popupMenu = null;
this.thisPopup = null;
this.htMenus = null;
this.SignedOnly = null;
this.AppletOnly = null;
this.allowSignedFeatures = false;
this.isJS = false;
this.isApplet = false;
this.isSigned = false;
this.cnmrPeaks = null;
this.hnmrPeaks = null;
this.aboutComputedMenuBaseCount = 0;
this.pd = null;
this.thisX = 0;
this.thisY = 0;
this.thisJsvp = null;
Clazz.instantialize (this, arguments);
}, JSV.popup, "JSVGenericPopup", null, [JSV.api.JSVPopupMenu, JSV.api.JSVAbstractMenu]);
Clazz.prepareFields (c$, function () {
this.htCheckbox =  new java.util.Hashtable ();
this.menuText =  new java.util.Properties ();
this.htMenus =  new java.util.Hashtable ();
this.SignedOnly =  new JU.List ();
this.AppletOnly =  new JU.List ();
});
Clazz.makeConstructor (c$, 
function () {
});
$_M(c$, "initialize", 
function (viewer, bundle, title) {
this.viewer = viewer;
this.menuName = title;
this.popupMenu = this.menuCreatePopup (title);
this.thisPopup = this.popupMenu;
this.menuSetListeners ();
this.htMenus.put (title, this.popupMenu);
this.isJS = viewer.isJS;
this.allowSignedFeatures = (!viewer.isApplet || viewer.isSigned);
this.addMenuItems ("", title, this.popupMenu, bundle);
try {
this.jpiUpdateComputedMenus ();
} catch (e) {
if (Clazz.exceptionOf (e, NullPointerException)) {
System.out.println ("JSVGenericPopup error " + e);
} else {
throw e;
}
}
}, "JSV.common.JSViewer,JSV.popup.PopupResource,~S");
$_V(c$, "jpiDispose", 
function () {
this.menuClearListeners (this.popupMenu);
this.popupMenu = this.thisPopup = null;
});
$_V(c$, "jpiGetMenuAsObject", 
function () {
return this.popupMenu;
});
$_V(c$, "jpiGetMenuAsString", 
function (title) {
this.updateForShow ();
var pt = title.indexOf ("|");
if (pt >= 0) {
var type = title.substring (pt);
title = title.substring (0, pt);
if (type.indexOf ("current") >= 0) {
var sb =  new JU.SB ();
var menu = this.htMenus.get (this.menuName);
this.menuGetAsText (sb, 0, menu, "PopupMenu");
return sb.toString ();
}}return ( new JSV.popup.JSVPopupResourceBundle ()).getMenuAsText (title);
}, "~S");
$_V(c$, "jpiShow", 
function (x, y) {
this.show (x, y, false);
this.restorePopupMenu ();
this.menuShowPopup (this.popupMenu, this.thisX, this.thisY);
}, "~N,~N");
$_V(c$, "jpiUpdateComputedMenus", 
function () {
if (this.updateMode == -1) return;
this.updateMode = 0;
this.getViewerData ();
this.updateFileMenu ();
this.updateFileTypeDependentMenus ();
this.updateMode = 1;
this.updateAboutSubmenu ();
});
$_M(c$, "getEntryIcon", 
function (ret) {
var entry = ret[0];
if (!entry.startsWith ("<")) return null;
var pt = entry.indexOf (">");
ret[0] = entry.substring (pt + 1);
var fileName = entry.substring (1, pt);
return this.getImageIcon (fileName);
}, "~A");
$_M(c$, "getImageIcon", 
function (fileName) {
return null;
}, "~S");
$_M(c$, "checkBoxStateChanged", 
function (source) {
this.restorePopupMenu ();
this.menuSetCheckBoxValue (source);
var id = this.menuGetId (source);
if (id != null) {
this.currentMenuItemId = id;
}}, "~O");
c$.addItemText = $_M(c$, "addItemText", 
function (sb, type, level, name, label, script, flags) {
sb.appendC (type).appendI (level).appendC ('\t').append (name);
if (label == null) {
sb.append (".\n");
return;
}sb.append ("\t").append (label).append ("\t").append (script == null || script.length == 0 ? "-" : script).append ("\t").append (flags).append ("\n");
}, "JU.SB,~S,~N,~S,~S,~S,~S");
$_M(c$, "fixScript", 
function (id, script) {
return script;
}, "~S,~S");
$_M(c$, "restorePopupMenu", 
function () {
this.thisPopup = this.popupMenu;
});
$_M(c$, "setCheckBoxValue", 
function (item, what, TF) {
this.checkForCheckBoxScript (item, what, TF);
}, "~O,~S,~B");
$_M(c$, "getViewerData", 
($fz = function () {
this.isApplet = this.viewer.isApplet;
this.isSigned = this.viewer.isSigned;
}, $fz.isPrivate = true, $fz));
$_M(c$, "updateFileTypeDependentMenus", 
($fz = function () {
for (var i = this.SignedOnly.size (); --i >= 0; ) this.menuEnable (this.SignedOnly.get (i), this.isSigned || !this.isApplet);

for (var i = this.AppletOnly.size (); --i >= 0; ) this.menuEnable (this.AppletOnly.get (i), this.isApplet);

}, $fz.isPrivate = true, $fz));
$_M(c$, "addMenuItems", 
($fz = function (parentId, key, menu, popupResourceBundle) {
var id = parentId + "." + key;
var value = popupResourceBundle.getStructure (key);
if (J.util.Logger.debugging) J.util.Logger.debug (id + " --- " + value);
if (value == null) {
this.menuCreateItem (menu, "#" + key, "", "");
return;
}var st =  new java.util.StringTokenizer (value);
var item;
while (value.indexOf ("@") >= 0) {
var s = "";
while (st.hasMoreTokens ()) s += " " + ((item = st.nextToken ()).startsWith ("@") ? popupResourceBundle.getStructure (item) : item);

value = s.substring (1);
st =  new java.util.StringTokenizer (value);
}
while (st.hasMoreTokens ()) {
item = st.nextToken ();
if (!this.checkKey (item)) continue;
var label = popupResourceBundle.getWord (item);
var newMenu = null;
var script = "";
var isCB = false;
label = this.fixLabel (label == null ? item : label);
if (label.equals ("null")) {
continue;
} else if (item.indexOf ("Menu") >= 0) {
if (item.indexOf ("more") < 0) this.buttonGroup = null;
var subMenu = this.menuNewSubMenu (label, id + "." + item);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (item, subMenu);
if (item.indexOf ("Computed") < 0) this.addMenuItems (id, item, subMenu, popupResourceBundle);
newMenu = subMenu;
} else if ("-".equals (item)) {
this.menuAddSeparator (menu);
continue;
} else if ((item.contains ("CB") || item.contains ("RD"))) {
isCB = true;
script = popupResourceBundle.getStructure (item);
var basename = label;
var isRadio = (isCB && item.contains ("RD"));
newMenu = this.menuCreateCheckboxItem (menu, label, basename + ":" + script, id + "." + item, false, isRadio);
this.rememberCheckbox (basename, newMenu);
if (isRadio) this.menuAddButtonGroup (newMenu);
} else {
script = popupResourceBundle.getStructure (item);
if (script == null) script = item;
if (!this.isJS && item.contains ("JS")) continue;
newMenu = this.menuCreateItem (menu, label, script, id + "." + item);
}if (!this.allowSignedFeatures && item.contains ("SIGNED")) this.menuEnable (newMenu, false);
if (item.startsWith ("SIGNED")) this.SignedOnly.addLast (newMenu);
this.htMenus.put (item, newMenu);
if (false) {
var str = item.endsWith ("Menu") ? "----" : id + "." + item + "\t" + label + "\t" + this.fixScript (id + "." + item, script);
str = "addMenuItem('\t" + str + "\t')";
J.util.Logger.info (str);
}}
}, $fz.isPrivate = true, $fz), "~S,~S,~O,JSV.popup.PopupResource");
$_M(c$, "fixLabel", 
($fz = function (label) {
if (label.startsWith ("_")) label = label.substring (label.indexOf ("_", 2) + 1);
 else if (label.equals ("VERSION")) label = JSV.common.JSVersion.VERSION;
label = JU.PT.simpleReplace (label, "CB", "");
label = JU.PT.simpleReplace (label, "Menu", "");
label = JU.PT.simpleReplace (label, "_", " ");
return label;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "checkKey", 
($fz = function (key) {
{
return (key.indexOf("JAVA") < 0 && !(key.indexOf("NOGL") &&
this.viewer.isWebGL));
}}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "rememberCheckbox", 
($fz = function (key, checkboxMenuItem) {
this.htCheckbox.put (key + "::" + this.htCheckbox.size (), checkboxMenuItem);
}, $fz.isPrivate = true, $fz), "~S,~O");
$_M(c$, "checkForCheckBoxScript", 
($fz = function (item, what, TF) {
if (!this.menuIsEnabled (item)) return;
if (what.indexOf ("##") < 0) {
var pt = what.indexOf (":");
if (pt < 0) {
J.util.Logger.error ("check box " + item + " IS " + what);
return;
}var basename = what.substring (0, pt);
if (basename.endsWith ("P!")) {
if (basename.indexOf ("??") >= 0) {
what = this.menuSetCheckBoxOption (item, basename, what);
} else {
if (!TF) return;
what = "set picking " + basename.substring (0, basename.length - 2);
}} else {
what = what.substring (pt + 1);
if ((pt = what.indexOf ("|")) >= 0) what = (TF ? what.substring (0, pt) : what.substring (pt + 1)).trim ();
what = JU.PT.simpleReplace (what, "T/F", (TF ? " TRUE" : " FALSE"));
}}this.viewer.runScript (what);
}, $fz.isPrivate = true, $fz), "~O,~S,~B");
$_V(c$, "checkMenuClick", 
function (source, script) {
this.checkMenuClickGP (source, script);
}, "~O,~S");
$_M(c$, "checkMenuClickGP", 
function (source, script) {
this.restorePopupMenu ();
if (script == null || script.length == 0) return;
var id = this.menuGetId (source);
if (id != null) {
script = this.fixScript (id, script);
this.currentMenuItemId = id;
}this.viewer.runScript (script);
}, "~O,~S");
$_M(c$, "updateFileMenu", 
($fz = function () {
var menu = this.htMenus.get ("fileMenu");
if (menu == null) return;
}, $fz.isPrivate = true, $fz));
$_M(c$, "updateSpectraMenu", 
($fz = function () {
var menuh = this.htMenus.get ("hnmrMenu");
var menuc = this.htMenus.get ("cnmrMenu");
if (menuh != null) this.menuRemoveAll (menuh, 0);
if (menuc != null) this.menuRemoveAll (menuc, 0);
var menu = this.htMenus.get ("spectraMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
var isOK =  new Boolean (this.setSpectraMenu (menuh, this.hnmrPeaks) | this.setSpectraMenu (menuc, this.cnmrPeaks)).valueOf ();
if (isOK) {
if (menuh != null) this.menuAddSubMenu (menu, menuh);
if (menuc != null) this.menuAddSubMenu (menu, menuc);
}this.menuEnable (menu, isOK);
}, $fz.isPrivate = true, $fz));
$_M(c$, "setSpectraMenu", 
($fz = function (menu, peaks) {
if (menu == null) return false;
this.menuEnable (menu, false);
var n = (peaks == null ? 0 : peaks.size ());
if (n == 0) return false;
for (var i = 0; i < n; i++) {
var peak = peaks.get (i);
var title = JU.PT.getQuotedAttribute (peak, "title");
var atoms = JU.PT.getQuotedAttribute (peak, "atoms");
if (atoms != null) this.menuCreateItem (menu, title, "select visible & (@" + JU.PT.simpleReplace (atoms, ",", " or @") + ")", "Focus" + i);
}
this.menuEnable (menu, true);
return true;
}, $fz.isPrivate = true, $fz), "~O,JU.List");
$_M(c$, "updateAboutSubmenu", 
($fz = function () {
var menu = this.htMenus.get ("aboutComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, this.aboutComputedMenuBaseCount);
}, $fz.isPrivate = true, $fz));
$_M(c$, "updateForShow", 
($fz = function () {
if (this.updateMode == -1) return;
this.getViewerData ();
this.updateMode = 2;
this.updateSpectraMenu ();
this.updateAboutSubmenu ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "show", 
($fz = function (x, y, doPopup) {
this.thisJsvp = this.viewer.selectedPanel;
this.setEnables (this.thisJsvp);
if (x == -2147483648) {
x = this.thisX;
y = this.thisY;
} else {
this.thisX = x;
this.thisY = y;
}this.updateForShow ();
if (doPopup) this.menuShowPopup (this.popupMenu, this.thisX, this.thisY);
}, $fz.isPrivate = true, $fz), "~N,~N,~B");
$_M(c$, "checkMenuFocus", 
function (name, cmd, isFocus) {
if (name.indexOf ("Focus") < 0) return;
if (isFocus) this.viewer.runScript (cmd);
}, "~S,~S,~B");
$_V(c$, "getSelected", 
function (key) {
return false;
}, "~S");
$_V(c$, "setCompoundMenu", 
function (panelNodes, allowCompoundMenu) {
}, "JU.List,~B");
$_V(c$, "setEnabled", 
function (allowMenu, zoomEnabled) {
if (!allowMenu) {
this.setItemEnabled ("_SIGNED_FileMenu", false);
this.setItemEnabled ("ViewMenu", false);
this.setItemEnabled ("Views", false);
this.setItemEnabled ("Script", false);
this.setItemEnabled ("Print", false);
}this.setItemEnabled ("ZoomMenu", zoomEnabled);
}, "~B,~B");
$_M(c$, "setEnables", 
($fz = function (jsvp) {
this.pd = jsvp.getPanelData ();
var spec0 = this.pd.getSpectrum ();
var isOverlaid = this.pd.isShowAllStacked ();
var isSingle = this.pd.haveSelectedSpectrum ();
this.setItemEnabled ("Integration", this.pd.getSpectrum ().canIntegrate ());
this.setItemEnabled ("Measurements", this.pd.hasCurrentMeasurements (JSV.common.Annotation.AType.Measurements));
this.setItemEnabled ("Peaks", this.pd.getSpectrum ().is1D ());
this.setItemEnabled ("Predicted_Solution_Colour", isSingle && spec0.canShowSolutionColor ());
this.setItemEnabled ("Toggle_Trans/Abs", isSingle && spec0.canConvertTransAbs ());
this.setItemEnabled ("Show_Overlay_Key", isOverlaid && this.pd.getNumberOfGraphSets () == 1);
this.setItemEnabled ("Overlay_Offset...", isOverlaid);
this.setItemEnabled ("JDXMenu", spec0.canSaveAsJDX ());
this.setItemEnabled ("ExportAsMenu", true);
}, $fz.isPrivate = true, $fz), "JSV.api.JSVPanel");
$_M(c$, "setItemEnabled", 
($fz = function (key, TF) {
var item = this.htMenus.get (key);
if (item == null) return;
this.menuEnable (item, TF);
}, $fz.isPrivate = true, $fz), "~S,~B");
$_V(c$, "setSelected", 
function (key, TF) {
var item = this.htMenus.get (key);
if (item == null) return;
this.menuEnable (item, false);
this.menuSetCheckBoxState (item, TF);
this.menuEnable (item, true);
}, "~S,~B");
Clazz.defineStatics (c$,
"dumpList", false,
"UPDATE_NEVER", -1,
"UPDATE_ALL", 0,
"UPDATE_CONFIG", 1,
"UPDATE_SHOW", 2);
});
