Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JComponent"], "javajs.swing.JComboBox", ["JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.info = null;
this.selectedIndex = 0;
Clazz.instantialize (this, arguments);
}, javajs.swing, "JComboBox", javajs.swing.JComponent);
Clazz.makeConstructor (c$, 
function (info) {
Clazz.superConstructor (this, javajs.swing.JComboBox, ["cmbJCB"]);
this.info = info;
}, "~A");
$_M(c$, "setSelectedIndex", 
function (i) {
this.selectedIndex = i;
{
SwingController.setSelectedIndex(this);
}}, "~N");
$_M(c$, "getSelectedIndex", 
function () {
return this.selectedIndex;
});
$_M(c$, "getSelectedItem", 
function () {
return (this.selectedIndex < 0 ? null : this.info[this.selectedIndex]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<select id='" + this.id + "' class='JComboBox' onchange='SwingController.click(this)'>\n");
for (var i = 0; i < this.info.length; i++) sb.append ("\n<option class='JComboBox_option'" + (i == this.selectedIndex ? "selected" : "") + ">" + this.info[i] + "</option>");

sb.append ("\n</select>\n");
return sb.toString ();
});
});
