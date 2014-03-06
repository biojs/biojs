Clazz.declarePackage ("J.modelsetbio");
Clazz.load (["J.modelsetbio.ProteinStructure"], "J.modelsetbio.Helix", ["JU.P3", "$.V3", "J.constant.EnumStructure", "J.util.Measure"], function () {
c$ = Clazz.declareType (J.modelsetbio, "Helix", J.modelsetbio.ProteinStructure);
Clazz.makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
Clazz.superConstructor (this, J.modelsetbio.Helix, []);
this.setupPS (apolymer, J.constant.EnumStructure.HELIX, monomerIndex, monomerCount);
this.subtype = subtype;
}, "J.modelsetbio.AlphaPolymer,~N,~N,J.constant.EnumStructure");
$_V(c$, "calcAxis", 
function () {
if (this.axisA != null) return;
var points =  new Array (this.monomerCount + 1);
for (var i = 0; i <= this.monomerCount; i++) {
points[i] =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + i, points[i]);
}
this.axisA =  new JU.P3 ();
this.axisUnitVector =  new JU.V3 ();
J.util.Measure.calcBestAxisThroughPoints (points, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = JU.P3.newP (points[this.monomerCount]);
J.util.Measure.projectOntoAxis (this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
