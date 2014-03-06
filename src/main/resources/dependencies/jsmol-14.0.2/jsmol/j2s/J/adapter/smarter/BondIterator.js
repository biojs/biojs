Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterBondIterator"], "J.adapter.smarter.BondIterator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bsAtoms = null;
this.bonds = null;
this.ibond = 0;
this.bond = null;
this.bondCount = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "BondIterator", J.api.JmolAdapterBondIterator);
Clazz.makeConstructor (c$, 
function (atomSetCollection) {
Clazz.superConstructor (this, J.adapter.smarter.BondIterator, []);
this.bsAtoms = atomSetCollection.bsAtoms;
this.bonds = atomSetCollection.getBonds ();
this.bondCount = atomSetCollection.getBondCount ();
this.ibond = 0;
}, "J.adapter.smarter.AtomSetCollection");
$_V(c$, "hasNext", 
function () {
if (this.ibond == this.bondCount) return false;
while ((this.bond = this.bonds[this.ibond++]) == null || (this.bsAtoms != null && (!this.bsAtoms.get (this.bond.atomIndex1) || !this.bsAtoms.get (this.bond.atomIndex2)))) if (this.ibond == this.bondCount) return false;

return true;
});
$_V(c$, "getAtomUniqueID1", 
function () {
return Integer.$valueOf (this.bond.atomIndex1);
});
$_V(c$, "getAtomUniqueID2", 
function () {
return Integer.$valueOf (this.bond.atomIndex2);
});
$_V(c$, "getEncodedOrder", 
function () {
return this.bond.order;
});
$_V(c$, "getRadius", 
function () {
return this.bond.radius;
});
$_V(c$, "getColix", 
function () {
return this.bond.colix;
});
});
