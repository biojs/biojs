Clazz.declarePackage ("JSV.js2d");
Clazz.load (["javajs.api.GenericMouseInterface", "javajs.awt.event.Event"], "JSV.js2d.Mouse", ["J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pd = null;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
this.isMouseDown = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "Mouse", null, javajs.api.GenericMouseInterface);
Clazz.makeConstructor (c$, 
function (viewer) {
this.pd = viewer.getPanelData ();
}, "JSV.api.JSVPanel");
$_V(c$, "clear", 
function () {
});
$_V(c$, "dispose", 
function () {
});
$_V(c$, "processEvent", 
function (id, x, y, modifiers, time) {
if (id != -1) modifiers = JSV.js2d.Mouse.applyLeftMouse (modifiers);
switch (id) {
case -1:
this.wheeled (time, x, modifiers | 32);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.pressed (time, x, y, modifiers, false);
break;
case 506:
this.dragged (time, x, y, modifiers);
break;
case 504:
this.entered (time, x, y);
break;
case 505:
this.exited (time, x, y);
break;
case 503:
this.moved (time, x, y, modifiers);
break;
case 502:
this.released (time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.clicked (time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N");
$_M(c$, "mouseClicked", 
function (e) {
this.clicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseEntered", 
function (e) {
this.entered (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseExited", 
function (e) {
this.exited (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mousePressed", 
function (e) {
this.pressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseReleased", 
function (e) {
this.released (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseMoved", 
function (e) {
this.moved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
$_M(c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.wheeled (e.getWhen (), e.getWheelRotation (), e.getModifiers () | 32);
}, "java.awt.event.MouseWheelEvent");
$_M(c$, "keyTyped", 
function (ke) {
var ch = ke.getKeyChar ();
var modifiers = ke.getModifiers ();
if (J.util.Logger.debuggingHigh || true) J.util.Logger.info ("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt (0)) + " " + modifiers);
if (this.pd.keyTyped (ch.charCodeAt (0), modifiers)) ke.consume ();
}, "java.awt.event.KeyEvent");
$_M(c$, "keyPressed", 
function (ke) {
if (this.pd.keyPressed (ke.getKeyCode (), ke.getModifiers ())) ke.consume ();
}, "java.awt.event.KeyEvent");
$_M(c$, "keyReleased", 
function (ke) {
this.pd.keyReleased (ke.getKeyCode ());
}, "java.awt.event.KeyEvent");
$_M(c$, "entered", 
($fz = function (time, x, y) {
this.pd.mouseEnterExit (time, x, y, false);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
$_M(c$, "exited", 
($fz = function (time, x, y) {
this.pd.mouseEnterExit (time, x, y, true);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
$_M(c$, "clicked", 
($fz = function (time, x, y, modifiers, clickCount) {
this.pd.mouseAction (2, time, x, y, 1, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
$_M(c$, "moved", 
($fz = function (time, x, y, modifiers) {
if (this.isMouseDown) this.pd.mouseAction (1, time, x, y, 0, JSV.js2d.Mouse.applyLeftMouse (modifiers));
 else this.pd.mouseAction (0, time, x, y, 0, modifiers & -29);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
$_M(c$, "wheeled", 
($fz = function (time, rotation, modifiers) {
this.pd.mouseAction (3, time, 0, rotation, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
$_M(c$, "pressed", 
($fz = function (time, x, y, modifiers, isPopupTrigger) {
this.isMouseDown = true;
this.pd.mouseAction (4, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~B");
$_M(c$, "released", 
($fz = function (time, x, y, modifiers) {
this.isMouseDown = false;
this.pd.mouseAction (5, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
$_M(c$, "dragged", 
($fz = function (time, x, y, modifiers) {
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.pd.mouseAction (1, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
c$.applyLeftMouse = $_M(c$, "applyLeftMouse", 
($fz = function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, $fz.isPrivate = true, $fz), "~N");
$_V(c$, "processTwoPointGesture", 
function (touches) {
}, "~A");
});
