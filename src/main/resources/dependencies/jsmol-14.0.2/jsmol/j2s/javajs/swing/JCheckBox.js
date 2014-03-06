Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JComponent"], "javajs.swing.JCheckBox", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selected = false;
Clazz.instantialize (this, arguments);
}, javajs.swing, "JCheckBox", javajs.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.swing.JCheckBox, ["chkJCB"]);
});
$_M(c$, "setSelected", 
function (selected) {
this.selected = selected;
{
SwingController.setSelected(this);
}}, "~B");
$_M(c$, "isSelected", 
function () {
return this.selected;
});
$_V(c$, "toHTML", 
function () {
var s = "<input type=checkbox id='" + this.id + "' class='JCheckBox' style='" + this.getCSSstyle (0) + "' " + (this.selected ? "checked='checked' " : "") + "onclick='SwingController.click(this)'>" + "<label for='" + this.id + "'>" + this.text + "</label>";
return s;
});
});
