Clazz.declarePackage ("J.render");
Clazz.load (["J.render.ShapeRenderer"], "J.render.HoverRenderer", ["J.render.TextRenderer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tempXY = null;
Clazz.instantialize (this, arguments);
}, J.render, "HoverRenderer", J.render.ShapeRenderer);
Clazz.prepareFields (c$, function () {
this.tempXY =  Clazz.newFloatArray (3, 0);
});
$_V(c$, "render", 
function () {
if (this.viewer.isNavigating ()) return false;
var hover = this.shape;
var antialias = this.g3d.isAntialiased ();
var text = hover.hoverText;
if (hover.atomIndex >= 0) {
var atom = this.modelSet.atoms[hover.atomIndex];
var label = (hover.specialLabel != null ? hover.specialLabel : hover.atomFormats != null && hover.atomFormats[hover.atomIndex] != null ? this.viewer.modelSet.getLabeler ().formatLabel (this.viewer, atom, hover.atomFormats[hover.atomIndex]) : hover.labelFormat != null ? this.viewer.modelSet.getLabeler ().formatLabel (this.viewer, atom, this.fixLabel (atom, hover.labelFormat)) : null);
if (label == null) return false;
text.setText (label);
text.setXYZs (atom.sX, atom.sY, 1, -2147483648);
} else if (hover.text != null) {
text.setText (hover.text);
text.setXYZs (hover.xy.x, hover.xy.y, 1, -2147483648);
} else {
return true;
}J.render.TextRenderer.render (text, this.viewer, this.g3d, 0, antialias ? 2 : 1, false, null, this.tempXY);
return true;
});
$_M(c$, "fixLabel", 
function (atom, label) {
if (label == null) return null;
return (this.viewer.isJmolDataFrameForModel (atom.getModelIndex ()) && label.equals ("%U") ? "%W" : label);
}, "J.modelset.Atom,~S");
});
