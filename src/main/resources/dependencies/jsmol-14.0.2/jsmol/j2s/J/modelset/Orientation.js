Clazz.declarePackage ("J.modelset");
Clazz.load (["JU.M3", "$.P3"], "J.modelset.Orientation", ["J.util.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.saveName = null;
this.rotationMatrix = null;
this.xTrans = 0;
this.yTrans = 0;
this.zoom = 0;
this.rotationRadius = 0;
this.center = null;
this.navCenter = null;
this.xNav = NaN;
this.yNav = NaN;
this.navDepth = NaN;
this.cameraDepth = NaN;
this.cameraX = NaN;
this.cameraY = NaN;
this.windowCenteredFlag = false;
this.navigationMode = false;
this.moveToText = null;
this.pymolView = null;
this.viewer = null;
Clazz.instantialize (this, arguments);
}, J.modelset, "Orientation");
Clazz.prepareFields (c$, function () {
this.rotationMatrix =  new JU.M3 ();
this.center =  new JU.P3 ();
this.navCenter =  new JU.P3 ();
});
Clazz.makeConstructor (c$, 
function (viewer, asDefault, pymolView) {
this.viewer = viewer;
if (pymolView != null) {
this.pymolView = pymolView;
this.moveToText = "moveTo -1.0 PyMOL " + J.util.Escape.eAF (pymolView);
return;
}viewer.finalizeTransformParameters ();
if (asDefault) {
var rotationMatrix = viewer.getModelSetAuxiliaryInfoValue ("defaultOrientationMatrix");
if (rotationMatrix == null) this.rotationMatrix.setIdentity ();
 else this.rotationMatrix.setM (rotationMatrix);
} else {
viewer.getRotation (this.rotationMatrix);
}this.xTrans = viewer.getTranslationXPercent ();
this.yTrans = viewer.getTranslationYPercent ();
this.zoom = viewer.getZoomSetting ();
this.center.setT (viewer.getRotationCenter ());
this.windowCenteredFlag = viewer.isWindowCentered ();
this.rotationRadius = viewer.getFloat (570425388);
this.navigationMode = viewer.getBoolean (603979887);
this.moveToText = viewer.getMoveToText (-1);
if (this.navigationMode) {
this.xNav = viewer.getNavigationOffsetPercent ('X');
this.yNav = viewer.getNavigationOffsetPercent ('Y');
this.navDepth = viewer.getNavigationDepthPercent ();
this.navCenter = JU.P3.newP (viewer.getNavigationCenter ());
}if (viewer.getCamera ().z != 0) {
this.cameraDepth = viewer.getCameraDepth ();
this.cameraX = viewer.getCamera ().x;
this.cameraY = viewer.getCamera ().y;
}}, "J.viewer.Viewer,~B,~A");
$_M(c$, "getMoveToText", 
function (asCommand) {
return (asCommand ? "   " + this.moveToText + "\n  save orientation " + J.util.Escape.eS (this.saveName.substring (12)) + ";\n" : this.moveToText);
}, "~B");
$_M(c$, "restore", 
function (timeSeconds, isAll) {
if (isAll) {
this.viewer.setBooleanProperty ("windowCentered", this.windowCenteredFlag);
this.viewer.setBooleanProperty ("navigationMode", this.navigationMode);
if (this.pymolView == null) this.viewer.moveTo (this.viewer.eval, timeSeconds, this.center, null, NaN, this.rotationMatrix, this.zoom, this.xTrans, this.yTrans, this.rotationRadius, this.navCenter, this.xNav, this.yNav, this.navDepth, this.cameraDepth, this.cameraX, this.cameraY);
 else this.viewer.movePyMOL (this.viewer.eval, timeSeconds, this.pymolView);
} else {
this.viewer.setRotationMatrix (this.rotationMatrix);
}return true;
}, "~N,~B");
});
