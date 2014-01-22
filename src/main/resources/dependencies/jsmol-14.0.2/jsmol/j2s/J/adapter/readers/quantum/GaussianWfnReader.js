Clazz.declarePackage ("J.adapter.readers.quantum");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.quantum.GaussianWfnReader", null, function () {
c$ = Clazz.declareType (J.adapter.readers.quantum, "GaussianWfnReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.continuing = false;
});
});
