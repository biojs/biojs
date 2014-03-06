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
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.popup.JSVGenericPopup"], "JSV.js2d.JsPopup", ["JSV.popup.JSVPopupResourceBundle"], function () {
c$ = Clazz_declareType (JSV.js2d, "JsPopup", JSV.popup.JSVGenericPopup);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.js2d.JsPopup, []);
});
$_V(c$, "jpiInitialize", 
function (viewer, menu) {
var bundle =  new JSV.popup.JSVPopupResourceBundle ();
this.initialize (viewer, bundle, menu);
}, "javajs.api.PlatformViewer,~S");
$_M(c$, "updateButton", 
function (b, entry, script) {
var ret = [entry];
entry = ret[0];
var icon = this.getEntryIcon (ret);
{
if (icon != null) b.setIcon(icon);
if (entry != null) b.setText(entry);
if (script != null) b.setActionCommand(script);
this.thisPopup.tainted = true;
}}, "~O,~S,~S");
$_M(c$, "newMenuItem", 
function (menu, item, text, script, id) {
this.updateButton (item, text, script);
{
if (id != null && id.startsWith("Focus")) {
item.addMouseListener(this); id = menu.getName() + "." + id; }
item.setName(id == null ? menu.getName() + "." : id);
}this.menuAddItem (menu, item);
return item;
}, "~O,~O,~S,~S,~S");
$_V(c$, "menuAddButtonGroup", 
function (newMenu) {
{
if (this.buttonGroup == null) this.buttonGroup = new
Jmol.Menu.ButtonGroup(this.thisPopup);
this.buttonGroup.add(newMenu);
}}, "~O");
$_V(c$, "menuAddItem", 
function (menu, item) {
{
menu.add(item); this.thisPopup.tainted = true;
}}, "~O,~O");
$_V(c$, "menuAddSeparator", 
function (menu) {
{
menu.add(new Jmol.Menu.MenuItem(this.thisPopup, null, false,
false)); this.thisPopup.tainted = true;
}}, "~O");
$_V(c$, "menuAddSubMenu", 
function (menu, subMenu) {
this.menuAddItem (menu, subMenu);
}, "~O,~O");
$_V(c$, "menuClearListeners", 
function (menu) {
{
menu.dispose();
}}, "~O");
$_V(c$, "menuCreateCheckboxItem", 
function (menu, entry, basename, id, state, isRadio) {
var item = null;
{
item = new Jmol.Menu.MenuItem(this.thisPopup, entry, !isRadio,
isRadio); item.setSelected(state); item.addItemListener(this);
}return this.newMenuItem (menu, item, entry, basename, id);
}, "~O,~S,~S,~S,~B,~B");
$_V(c$, "menuCreateItem", 
function (menu, entry, script, id) {
var item = null;
{
item = new Jmol.Menu.MenuItem(this.thisPopup, entry);
item.addActionListener(this);
}return this.newMenuItem (menu, item, entry, script, id);
}, "~O,~S,~S,~S");
$_V(c$, "menuCreatePopup", 
function (name) {
{
return new Jmol.Menu.PopupMenu(this.viewer.applet, name);
}}, "~S");
$_V(c$, "menuEnable", 
function (menu, enable) {
{
if (menu.isItem) { this.menuEnableItem(menu, enable); return;
} try { menu.setEnabled(enable); } catch (e) {
}
this.thisPopup.tainted = true;
}}, "~O,~B");
$_V(c$, "menuEnableItem", 
function (item, enable) {
{
try { item.setEnabled(enable); } catch (e) { }
this.thisPopup.tainted = true;
}}, "~O,~B");
$_V(c$, "menuGetAsText", 
function (sb, level, menu, menuName) {
{
var name = menuName; var subMenus = menu.getComponents(); for
(var i = 0; i < subMenus.length; i++) { var m = subMenus[i];
var flags = null; if (m.isMenu) { name = m.getName(); flags =
"enabled:" + m.isEnabled(); this.addItemText(sb, 'M', level,
name, m.getText(), null, flags); this.menuGetAsText(sb, level
+ 1, m.getPopupMenu(), name); } else if (m.isItem) { flags =
"enabled:" + m.isEnabled(); if (m.isCheckBox) flags +=
";checked:" + m.getState(); var script =
this.fixScript(m.getName(), m.getActionCommand());
this.addItemText(sb, 'I', level, m.getName(), m.getText(),
script, flags); } else { this.addItemText(sb, 'S', level,
name, null, null, null); } }
}}, "JU.SB,~N,~O,~S");
$_V(c$, "menuGetId", 
function (menu) {
{
return menu.getName();
}}, "~O");
$_V(c$, "menuGetItemCount", 
function (menu) {
{
return menu.getItemCount();
}}, "~O");
$_V(c$, "menuGetParent", 
function (menu) {
{
return menu.getParent();
}}, "~O");
$_V(c$, "menuGetPosition", 
function (menu) {
{
var p = menuGetParent(menu); if (p != null) for (var i =
p.getItemCount(); --i >= 0;) if (p.getItem(i) == menu) return
i;
}return -1;
}, "~O");
$_V(c$, "menuInsertSubMenu", 
function (menu, subMenu, index) {
}, "~O,~O,~N");
$_V(c$, "menuNewSubMenu", 
function (entry, id) {
{
var menu = new Jmol.Menu.SubMenu(this.thisPopup, entry);
this.updateButton(menu, entry, null); menu.setName(id);
menu.setAutoscrolls(true); return menu;
}}, "~S,~S");
$_V(c$, "menuRemoveAll", 
function (menu, indexFrom) {
{
menu.removeAll(indexFrom); this.thisPopup.tainted = true;
}}, "~O,~N");
$_V(c$, "menuSetAutoscrolls", 
function (menu) {
{
menu.setAutoscrolls(true); this.thisPopup.tainted = true;
}}, "~O");
$_V(c$, "menuSetCheckBoxState", 
function (item, state) {
{
item.setSelected(state); this.thisPopup.tainted = true;
}}, "~O,~B");
$_V(c$, "menuSetCheckBoxOption", 
function (item, name, what) {
return null;
}, "~O,~S,~S");
$_V(c$, "menuSetCheckBoxValue", 
function (source) {
{
this.setCheckBoxValue(source, source.getActionCommand(),
source.isSelected()); if(this.thisPopup)this.thisPopup.tainted = true;
}}, "~O");
$_V(c$, "menuSetLabel", 
function (menu, entry) {
{
menu.setText(entry); this.thisPopup.tainted = true;
}}, "~O,~S");
$_V(c$, "menuSetListeners", 
function () {
});
$_V(c$, "menuShowPopup", 
function (popup, x, y) {
{
popup.menuShowPopup(x, y);
}}, "~O,~N,~N");
$_V(c$, "updateSpecialMenuItem", 
function (m) {
{
m.setText(this.getSpecialLabel(m.getName(), m.getText()));
}}, "~O");
$_V(c$, "menuIsEnabled", 
function (item) {
{
return item.isEnabled();
}return false;
}, "~O");
});
Clazz_declarePackage ("JSV.popup");
Clazz_load (["JSV.api.JSVAbstractMenu", "$.JSVPopupMenu", "java.util.Hashtable", "$.Properties", "JU.List"], "JSV.popup.JSVGenericPopup", ["java.util.StringTokenizer", "JU.PT", "$.SB", "JSV.common.Annotation", "$.JSVersion", "JSV.popup.JSVPopupResourceBundle", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, JSV.popup, "JSVGenericPopup", null, [JSV.api.JSVPopupMenu, JSV.api.JSVAbstractMenu]);
Clazz_prepareFields (c$, function () {
this.htCheckbox =  new java.util.Hashtable ();
this.menuText =  new java.util.Properties ();
this.htMenus =  new java.util.Hashtable ();
this.SignedOnly =  new JU.List ();
this.AppletOnly =  new JU.List ();
});
Clazz_makeConstructor (c$, 
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
if (Clazz_exceptionOf (e, NullPointerException)) {
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
function () {
this.isApplet = this.viewer.isApplet;
this.isSigned = this.viewer.isSigned;
});
$_M(c$, "updateFileTypeDependentMenus", 
function () {
for (var i = this.SignedOnly.size (); --i >= 0; ) this.menuEnable (this.SignedOnly.get (i), this.isSigned || !this.isApplet);

for (var i = this.AppletOnly.size (); --i >= 0; ) this.menuEnable (this.AppletOnly.get (i), this.isApplet);

});
$_M(c$, "addMenuItems", 
function (parentId, key, menu, popupResourceBundle) {
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
}, "~S,~S,~O,JSV.popup.PopupResource");
$_M(c$, "fixLabel", 
function (label) {
if (label.startsWith ("_")) label = label.substring (label.indexOf ("_", 2) + 1);
 else if (label.equals ("VERSION")) label = JSV.common.JSVersion.VERSION;
label = JU.PT.simpleReplace (label, "CB", "");
label = JU.PT.simpleReplace (label, "Menu", "");
label = JU.PT.simpleReplace (label, "_", " ");
return label;
}, "~S");
$_M(c$, "checkKey", 
function (key) {
{
return (key.indexOf("JAVA") < 0 && !(key.indexOf("NOGL") &&
this.viewer.isWebGL));
}}, "~S");
$_M(c$, "rememberCheckbox", 
function (key, checkboxMenuItem) {
this.htCheckbox.put (key + "::" + this.htCheckbox.size (), checkboxMenuItem);
}, "~S,~O");
$_M(c$, "checkForCheckBoxScript", 
function (item, what, TF) {
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
}, "~O,~S,~B");
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
function () {
var menu = this.htMenus.get ("fileMenu");
if (menu == null) return;
});
$_M(c$, "updateSpectraMenu", 
function () {
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
});
$_M(c$, "setSpectraMenu", 
function (menu, peaks) {
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
}, "~O,JU.List");
$_M(c$, "updateAboutSubmenu", 
function () {
var menu = this.htMenus.get ("aboutComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, this.aboutComputedMenuBaseCount);
});
$_M(c$, "updateForShow", 
function () {
if (this.updateMode == -1) return;
this.getViewerData ();
this.updateMode = 2;
this.updateSpectraMenu ();
this.updateAboutSubmenu ();
});
$_M(c$, "show", 
function (x, y, doPopup) {
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
}, "~N,~N,~B");
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
function (jsvp) {
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
}, "JSV.api.JSVPanel");
$_M(c$, "setItemEnabled", 
function (key, TF) {
var item = this.htMenus.get (key);
if (item == null) return;
this.menuEnable (item, TF);
}, "~S,~B");
$_V(c$, "setSelected", 
function (key, TF) {
var item = this.htMenus.get (key);
if (item == null) return;
this.menuEnable (item, false);
this.menuSetCheckBoxState (item, TF);
this.menuEnable (item, true);
}, "~S,~B");
Clazz_defineStatics (c$,
"dumpList", false,
"UPDATE_NEVER", -1,
"UPDATE_ALL", 0,
"UPDATE_CONFIG", 1,
"UPDATE_SHOW", 2);
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVAbstractMenu");
Clazz_declarePackage ("JSV.api");
Clazz_load (["javajs.api.GenericMenuInterface"], "JSV.api.JSVPopupMenu", null, function () {
Clazz_declareInterface (JSV.api, "JSVPopupMenu", javajs.api.GenericMenuInterface);
});
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "GenericMenuInterface");
Clazz_declarePackage ("JSV.popup");
Clazz_load (["JSV.popup.PopupResource"], "JSV.popup.JSVPopupResourceBundle", ["JU.SB"], function () {
c$ = Clazz_declareType (JSV.popup, "JSVPopupResourceBundle", JSV.popup.PopupResource);
$_V(c$, "getMenuName", 
function () {
return "appMenu";
});
$_V(c$, "buildStructure", 
function () {
this.addItems (JSV.popup.JSVPopupResourceBundle.menuContents);
this.addItems (JSV.popup.JSVPopupResourceBundle.structureContents);
});
$_V(c$, "getWordContents", 
function () {
var words = [];
return words;
});
$_V(c$, "getMenuAsText", 
function (title) {
return "# Jmol.mnu " + title + "\n\n" + "# Part I -- Menu Structure\n" + "# ------------------------\n\n" + this.dumpStructure (JSV.popup.JSVPopupResourceBundle.menuContents) + "\n\n" + "# Part II -- Key Definitions\n" + "# --------------------------\n\n" + this.dumpStructure (JSV.popup.JSVPopupResourceBundle.structureContents) + "\n\n" + "# Part III -- Word Translations\n" + "# -----------------------------\n\n" + this.dumpWords ();
}, "~S");
$_M(c$, "dumpWords", 
function () {
var wordContents = this.getWordContents ();
var s =  new JU.SB ();
for (var i = 0; i < wordContents.length; i++) {
var key = wordContents[i++];
if (this.structure.getProperty (key) == null) s.append (key).append (" | ").append (wordContents[i]).appendC ('\n');
}
return s.toString ();
});
$_M(c$, "dumpStructure", 
function (items) {
var previous = "";
var s =  new JU.SB ();
for (var i = 0; i < items.length; i++) {
var key = items[i][0];
var label = this.words.getProperty (key);
if (label != null) key += " | " + label;
s.append (key).append (" = ").append (items[i][1] == null ? previous : (previous = items[i][1])).appendC ('\n');
}
return s.toString ();
}, "~A");
Clazz_defineStatics (c$,
"menuContents", [["appMenu", "Toggle_Grid Toggle_X_Axis Toggle_Y_Axis Toggle_Coordinates Reverse_Plot - Next_View Previous_View Clear_Views Reset_View Set_Zoom... - Views... Overlay_Offset... Script... - Properties"], ["appletMenu", "_SIGNED_FileMenu ViewMenu ZoomMenu Views... Overlay_Offset... - Measurements Peaks Integration Toggle_Trans/Abs Predicted_Solution_Colour - Script... - Print... - AboutMenu"], ["_SIGNED_FileMenu", "SaveAsMenu ExportAsMenu"], ["SaveAsMenu", "Original... JDXMenu CML XML(AnIML)"], ["JDXMenu", "XY DIF DIFDUP FIX PAC SQZ"], ["ExportAsMenu", "JPG PNG SVG PDF"], ["ViewMenu", "Toggle_Grid Toggle_X_Axis Toggle_Y_Axis Toggle_Coordinates Reverse_Plot Show_Header... Show_Overlay_Key... Window"], ["ZoomMenu", "Next_View Previous_View Reset_View Clear_Views Set_Zoom..."], ["AboutMenu", "VERSION"]],
"structureContents", [["Show_Header...", "showProperties"], ["Window", "window"], ["Show_Overlay_Key...", "showKey"], ["Next_View", "zoom next;showMenu"], ["Previous_View", "zoom prev;showMenu"], ["Clear_Views", "zoom clear"], ["Reset_View", "zoom out"], ["Views...", "view"], ["Overlay_Offset...", "stackOffsetY"], ["Script...", "script INLINE"], ["Set_Zoom...", "zoom"], ["Properties", "showProperties"], ["Toggle_X_Axis", "XSCALEON toggle;showMenu"], ["Toggle_Y_Axis", "YSCALEON toggle;showMenu"], ["Toggle_Grid", "GRIDON toggle;showMenu"], ["Toggle_Coordinates", "COORDINATESON toggle;showMenu"], ["Reverse_Plot", "REVERSEPLOT toggle;showMenu"], ["Measurements", "SHOWMEASUREMENTS"], ["Peaks", "SHOWPEAKLIST"], ["Integration", "SHOWINTEGRATION"], ["Toggle_Trans/Abs", "IRMODE TOGGLE"], ["Predicted_Solution_Colour", "GETSOLUTIONCOLOR"], ["Print...", "print"], ["Original...", "write SOURCE"], ["CML", "write CML"], ["XML(AnIML)", "write XML"], ["XY", "write XY"], ["DIF", "write DIF"], ["DIFDUP", "write DIFDUP"], ["FIX", "write FIX"], ["PAC", "write PAC"], ["SQZ", "write SQZ"], ["JPG", "write JPG"], ["SVG", "write SVG"], ["PNG", "write PNG"], ["PDF", "write PDF"]]);
});
Clazz_declarePackage ("JSV.popup");
Clazz_load (null, "JSV.popup.PopupResource", ["java.util.Properties"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structure = null;
this.words = null;
Clazz_instantialize (this, arguments);
}, JSV.popup, "PopupResource");
Clazz_makeConstructor (c$, 
function () {
this.structure =  new java.util.Properties ();
this.words =  new java.util.Properties ();
this.buildStructure ();
});
$_M(c$, "getMenuAsText", 
function (title) {
return null;
}, "~S");
$_M(c$, "getStructure", 
function (key) {
return this.structure.getProperty (key);
}, "~S");
$_M(c$, "getWord", 
function (key) {
var str = this.words.getProperty (key);
return (str == null ? key : str);
}, "~S");
$_M(c$, "addItems", 
function (itemPairs) {
var previous = "";
for (var i = 0; i < itemPairs.length; i++) {
var str = itemPairs[i][1];
if (str == null) str = previous;
previous = str;
this.structure.setProperty (itemPairs[i][0], str);
}
}, "~A");
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
