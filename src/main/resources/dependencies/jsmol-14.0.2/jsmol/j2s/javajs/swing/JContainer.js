Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JComponent"], "javajs.swing.JContainer", ["JU.List"], function () {
c$ = Clazz.decorateAsClass (function () {
this.list = null;
Clazz.instantialize (this, arguments);
}, javajs.swing, "JContainer", javajs.swing.JComponent);
Clazz.makeConstructor (c$, 
function (type) {
Clazz.superConstructor (this, javajs.swing.JContainer, [type]);
this.list =  new JU.List ();
}, "~S");
$_M(c$, "removeAll", 
function () {
this.list.clear ();
});
$_M(c$, "add", 
function (component) {
this.list.addLast (component);
return component;
}, "javajs.swing.JComponent");
$_M(c$, "getSubcomponentWidth", 
function () {
return (this.list.size () == 1 ? this.list.get (0).getSubcomponentWidth () : 0);
});
$_M(c$, "getSubcomponentHeight", 
function () {
return (this.list.size () == 1 ? this.list.get (0).getSubcomponentHeight () : 0);
});
$_V(c$, "toHTML", 
function () {
return null;
});
});
