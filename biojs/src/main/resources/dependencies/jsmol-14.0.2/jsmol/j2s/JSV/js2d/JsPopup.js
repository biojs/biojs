Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.popup.JSVGenericPopup"], "JSV.js2d.JsPopup", ["JSV.popup.JSVPopupResourceBundle"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsPopup", JSV.popup.JSVGenericPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsPopup, []);
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
($fz = function (menu, item, text, script, id) {
this.updateButton (item, text, script);
{
if (id != null && id.startsWith("Focus")) {
item.addMouseListener(this); id = menu.getName() + "." + id; }
item.setName(id == null ? menu.getName() + "." : id);
}this.menuAddItem (menu, item);
return item;
}, $fz.isPrivate = true, $fz), "~O,~O,~S,~S,~S");
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
