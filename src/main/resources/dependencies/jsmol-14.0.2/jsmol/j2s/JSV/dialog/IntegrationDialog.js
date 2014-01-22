Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.IntegrationDialog", ["java.lang.Double", "JSV.common.Annotation"], function () {
c$ = Clazz.declareType (JSV.dialog, "IntegrationDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.IntegrationDialog, []);
this.type = JSV.common.Annotation.AType.Integration;
});
$_V(c$, "getPosXY", 
function () {
return JSV.dialog.IntegrationDialog.posXY;
});
$_M(c$, "addUniqueControls", 
function () {
this.txt1 = this.dialog.addTextField ("txtBaselineOffset", "Baseline Offset", null, "%", "" + this.viewer.parameters.integralOffset, true);
this.txt2 = this.dialog.addTextField ("txtScale", "Scale", null, "%", "" + this.viewer.parameters.integralRange, true);
this.dialog.addButton ("btnApply", "Apply");
this.addApplyBtn = false;
this.dialog.addButton ("btnAuto", "Auto");
this.dialog.addButton ("btnDelete", "Delete");
this.dialog.addButton ("btnNormalize", "Normalize");
});
$_V(c$, "applyFromFields", 
function () {
this.apply ([this.dialog.getText (this.txt1), this.dialog.getText (this.txt2)]);
});
$_V(c$, "callback", 
function (id, msg) {
var val;
try {
if (!id.equals ("windowClosing") && (id.equals ("btnAuto") || this.xyData == null || this.xyData.size () == 0)) {
this.viewer.runScript ("integrate auto");
this.eventApply ();
} else if (id.equals ("btnDelete")) {
this.deleteIntegral ();
} else if (id.equals ("btnNormalize")) {
if (!this.checkSelectedIntegral ()) return true;
var ret = this.manager.getDialogInput (this.dialog, "Enter a normalization factor", "Normalize", 3, null, null, "" + this.lastNorm);
val = Double.parseDouble (ret);
if (val > 0) (this.xyData).setSelectedIntegral (this.xyData.get (this.iSelected), this.lastNorm = val);
this.eventApply ();
} else {
return this.callbackAD (id, msg);
}} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
return true;
}, "~S,~S");
$_M(c$, "checkSelectedIntegral", 
($fz = function () {
if (this.iSelected < 0) {
this.showMessage ("Select a line on the table first, then click this button.", "Integration", 1);
return false;
}return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "deleteIntegral", 
($fz = function () {
if (!this.checkSelectedIntegral ()) return;
this.xyData.remove (this.iSelected);
this.iSelected = -1;
this.iRowColSelected = -1;
this.applyFromFields ();
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"posXY", [-2147483648, 0]);
});
