Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.PeakListDialog", ["JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "PeakListDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.PeakListDialog, []);
this.type = JSV.common.Annotation.AType.PeakList;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.PeakListDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtThreshold", "Threshold", null, "", "", true);
this.setThreshold (NaN);
this.combo1 = this.dialog.addSelectOption ("cmbInterpolation", "Interpolation", ["parabolic", "none"], 0, true);
});
$_V(c$, "callback", 
function (id, msg) {
if (id.equals ("cmbInterpolation") || id.equals ("txtThreshold")) id = "btnApply";
return this.callbackAD (id, msg);
}, "~S,~S");
Clazz.defineStatics (c$,
"posXY", [-2147483648, 0]);
});
