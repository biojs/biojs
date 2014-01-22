Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JContainer"], "javajs.swing.JScrollPane", ["JU.SB"], function () {
c$ = Clazz.declareType (javajs.swing, "JScrollPane", javajs.swing.JContainer);
Clazz.makeConstructor (c$, 
function (component) {
Clazz.superConstructor (this, javajs.swing.JScrollPane, ["JScP"]);
this.add (component);
}, "javajs.swing.JComponent");
$_V(c$, "toHTML", 
function () {
var c = this.list.get (0);
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JScrollPane' style='" + this.getCSSstyle (98) + "overflow:auto'>\n");
sb.append (c.toHTML ());
sb.append ("\n</div>\n");
return sb.toString ();
});
$_V(c$, "setMinimumSize", 
function (dimension) {
}, "javajs.awt.Dimension");
});
