Clazz.declarePackage ("J.adapter.smarter");
Clazz.load (["J.api.JmolAdapterStructureIterator"], "J.adapter.smarter.StructureIterator", ["J.api.JmolAdapter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structureCount = 0;
this.structures = null;
this.structure = null;
this.istructure = 0;
this.bsModelsDefined = null;
Clazz.instantialize (this, arguments);
}, J.adapter.smarter, "StructureIterator", J.api.JmolAdapterStructureIterator);
Clazz.makeConstructor (c$, 
function (atomSetCollection) {
Clazz.superConstructor (this, J.adapter.smarter.StructureIterator, []);
this.structureCount = atomSetCollection.getStructureCount ();
this.structures = atomSetCollection.getStructures ();
this.istructure = 0;
this.bsModelsDefined = atomSetCollection.bsStructuredModels;
}, "J.adapter.smarter.AtomSetCollection");
$_V(c$, "hasNext", 
function () {
if (this.istructure == this.structureCount) return false;
this.structure = this.structures[this.istructure++];
return true;
});
$_V(c$, "getStructureType", 
function () {
return this.structure.structureType;
});
$_V(c$, "getSubstructureType", 
function () {
return this.structure.substructureType;
});
$_V(c$, "getStructureID", 
function () {
return this.structure.structureID;
});
$_V(c$, "getSerialID", 
function () {
return this.structure.serialID;
});
$_V(c$, "getStartChainID", 
function () {
return this.structure.startChainID;
});
$_V(c$, "getStartSequenceNumber", 
function () {
return this.structure.startSequenceNumber;
});
$_V(c$, "getStartInsertionCode", 
function () {
return J.api.JmolAdapter.canonizeInsertionCode (this.structure.startInsertionCode);
});
$_V(c$, "getEndChainID", 
function () {
return this.structure.endChainID;
});
$_V(c$, "getEndSequenceNumber", 
function () {
return this.structure.endSequenceNumber;
});
$_V(c$, "getEndInsertionCode", 
function () {
return this.structure.endInsertionCode;
});
$_V(c$, "getStrandCount", 
function () {
return this.structure.strandCount;
});
$_V(c$, "getStructuredModels", 
function () {
return this.bsModelsDefined;
});
$_V(c$, "getAtomIndices", 
function () {
return this.structure.atomStartEnd;
});
$_V(c$, "getModelIndices", 
function () {
return this.structure.modelStartEnd;
});
});
