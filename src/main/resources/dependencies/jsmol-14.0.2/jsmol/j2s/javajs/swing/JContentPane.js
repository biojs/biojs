Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JContainer"], "javajs.swing.JContentPane", ["JU.SB"], function () {
c$ = Clazz.declareType (javajs.swing, "JContentPane", javajs.swing.JContainer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.swing.JContentPane, ["JCP"]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JContentPane' style='" + this.getCSSstyle (100) + "'>\n");
for (var i = 0; i < this.list.size (); i++) sb.append (this.list.get (i).toHTML ());

sb.append ("\n</div>\n");
return sb.toString ();
});
});
