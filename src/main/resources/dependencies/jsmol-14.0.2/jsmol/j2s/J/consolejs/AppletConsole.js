Clazz.declarePackage ("J.consolejs");
Clazz.load (["J.console.GenericConsole"], "J.consolejs.AppletConsole", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.jsConsole = null;
Clazz.instantialize (this, arguments);
}, J.consolejs, "AppletConsole", J.console.GenericConsole);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.consolejs.AppletConsole, []);
});
$_V(c$, "start", 
function (viewer) {
this.setViewer (viewer);
this.setLabels ();
this.displayConsole ();
}, "J.api.JmolViewer");
$_V(c$, "layoutWindow", 
function (enabledButtons) {
{
this.jsConsole = new Jmol.Console.JSConsole(this);
}this.setTitle ();
}, "~S");
$_V(c$, "setTitle", 
function () {
{
if (this.jsConsole)
this.jsConsole.setTitle(this.getLabel("title"));
}});
$_V(c$, "setVisible", 
function (visible) {
{
this.jsConsole.setVisible(visible);
}}, "~B");
$_V(c$, "setButton", 
function (text) {
{
return new Jmol.Console.Button(text);
}}, "~S");
$_V(c$, "dispose", 
function () {
this.setVisible (false);
});
$_V(c$, "isMenuItem", 
function (source) {
return false;
}, "~O");
$_V(c$, "getScriptEditor", 
function () {
return null;
});
$_V(c$, "nextFileName", 
function (stub, nTab) {
return null;
}, "~S,~N");
});
