Clazz.declarePackage ("J.modelset");
Clazz.load (["JU.BS"], "J.modelset.BondSet", ["J.util.BSUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.associatedAtoms = null;
Clazz.instantialize (this, arguments);
}, J.modelset, "BondSet", JU.BS);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.modelset.BondSet, []);
});
$_M(c$, "getAssociatedAtoms", 
function () {
return this.associatedAtoms;
});
Clazz.makeConstructor (c$, 
function (bs) {
Clazz.superConstructor (this, J.modelset.BondSet, []);
J.util.BSUtil.copy2 (bs, this);
}, "JU.BS");
Clazz.makeConstructor (c$, 
function (bs, atoms) {
this.construct (bs);
this.associatedAtoms = atoms;
}, "JU.BS,~A");
});
