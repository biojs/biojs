Clazz.declarePackage ("J.adapter.readers.pdb");
Clazz.load (["J.adapter.readers.pdb.PdbReader", "JU.List"], "J.adapter.readers.pdb.P2nReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.altNames = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pdb, "P2nReader", J.adapter.readers.pdb.PdbReader);
Clazz.prepareFields (c$, function () {
this.altNames =  new JU.List ();
});
$_V(c$, "setAdditionalAtomParameters", 
function (atom) {
var altName = this.line.substring (69, 72).trim ();
if (altName.length == 0) altName = atom.atomName;
if (this.useAltNames) atom.atomName = altName;
 else this.altNames.addLast (altName);
}, "J.adapter.smarter.Atom");
$_V(c$, "finalizeReader", 
function () {
this.finalizeReaderPDB ();
if (!this.useAltNames) this.atomSetCollection.setAtomSetAuxiliaryInfo ("altName", this.altNames.toArray ( new Array (this.altNames.size ())));
});
});
