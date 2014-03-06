Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JComponent"], "javajs.swing.JButton", ["JU.SB"], function () {
c$ = Clazz.declareType (javajs.swing, "JButton", javajs.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.swing.JButton, ["btnJB"]);
});
$_V(c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("<input type=button id='" + this.id + "' class='JButton' style='" + this.getCSSstyle (0) + "' onclick='SwingController.click(this)' value='" + this.text + "'/>");
return sb.toString ();
});
});
