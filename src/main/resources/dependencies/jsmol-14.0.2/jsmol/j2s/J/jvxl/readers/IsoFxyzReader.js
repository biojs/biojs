Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.IsoFxyReader"], "J.jvxl.readers.IsoFxyzReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$data = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "IsoFxyzReader", J.jvxl.readers.IsoFxyReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.IsoFxyzReader, []);
});
$_V(c$, "setup", 
function (isMapData) {
if (this.params.functionInfo.size () > 5) this.$data = this.params.functionInfo.get (5);
this.setupType ("functionXYZ");
}, "~B");
$_M(c$, "getValue", 
function (x, y, z) {
return (this.$data == null ? this.evaluateValue (x, y, z) : this.$data[x][y][z]);
}, "~N,~N,~N");
});
