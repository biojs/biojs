Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterAtomIterator"], "J.adapter.smarter.AtomIterator", ["java.lang.Float", "J.api.JmolAdapter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iatom = 0;
this.atom = null;
this.atomCount = 0;
this.atoms = null;
this.bsAtoms = null;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "AtomIterator", null, J.api.JmolAdapterAtomIterator);
Clazz.makeConstructor (c$, 
function (atomSetCollection) {
this.atomCount = atomSetCollection.getAtomCount ();
this.atoms = atomSetCollection.getAtoms ();
this.bsAtoms = atomSetCollection.bsAtoms;
this.iatom = 0;
}, "J.adapter.smarter.AtomSetCollection");
$_V(c$, "hasNext", 
function () {
if (this.iatom == this.atomCount) return false;
while ((this.atom = this.atoms[this.iatom++]) == null || (this.bsAtoms != null && !this.bsAtoms.get (this.atom.index))) if (this.iatom == this.atomCount) return false;

this.atoms[this.iatom - 1] = null;
return true;
});
$_V(c$, "getAtomSetIndex", 
function () {
return this.atom.atomSetIndex;
});
$_V(c$, "getAtomSymmetry", 
function () {
return this.atom.bsSymmetry;
});
$_V(c$, "getAtomSite", 
function () {
return this.atom.atomSite + 1;
});
$_V(c$, "getUniqueID", 
function () {
return Integer.$valueOf (this.atom.index);
});
$_V(c$, "getElementNumber", 
function () {
return (this.atom.elementNumber > 0 ? this.atom.elementNumber : J.api.JmolAdapter.getElementNumber (this.atom.getElementSymbol ()));
});
$_V(c$, "getAtomName", 
function () {
return this.atom.atomName;
});
$_V(c$, "getFormalCharge", 
function () {
return this.atom.formalCharge;
});
$_V(c$, "getPartialCharge", 
function () {
return this.atom.partialCharge;
});
$_V(c$, "getTensors", 
function () {
return this.atom.tensors;
});
$_V(c$, "getRadius", 
function () {
return this.atom.radius;
});
$_V(c$, "getVib", 
function () {
return (this.atom.vib == null || Float.isNaN (this.atom.vib.z) ? null : this.atom.vib);
});
$_V(c$, "getBfactor", 
function () {
return Float.isNaN (this.atom.bfactor) && this.atom.anisoBorU != null ? this.atom.anisoBorU[7] * 100 : this.atom.bfactor;
});
$_V(c$, "getOccupancy", 
function () {
return Clazz.floatToInt (this.atom.foccupancy * 100);
});
$_V(c$, "getIsHetero", 
function () {
return this.atom.isHetero;
});
$_V(c$, "getAtomSerial", 
function () {
return this.atom.atomSerial;
});
$_V(c$, "getChainID", 
function () {
return this.atom.chainID;
});
$_V(c$, "getAlternateLocationID", 
function () {
return J.api.JmolAdapter.canonizeAlternateLocationID (this.atom.alternateLocationID);
});
$_V(c$, "getGroup3", 
function () {
return this.atom.group3;
});
$_V(c$, "getSequenceNumber", 
function () {
return this.atom.sequenceNumber;
});
$_V(c$, "getInsertionCode", 
function () {
return J.api.JmolAdapter.canonizeInsertionCode (this.atom.insertionCode);
});
$_V(c$, "getXYZ", 
function () {
return this.atom;
});
});
