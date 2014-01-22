Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.OverlayLegendDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "OverlayLegendDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.OverlayLegendDialog, []);
this.type = JSV.common.Annotation.AType.OverlayLegend;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.OverlayLegendDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
});
$_V(c$, "callback", 
function (id, msg) {
return false;
}, "~S,~S");
Clazz.defineStatics (c$,
"posXY", [-2147483648, 0]);
});
