Clazz.declarePackage ("J.adapter.readers.xml");
Clazz.load (["J.adapter.readers.xml.XmlReader"], "J.adapter.readers.xml.XmlQEReader", ["J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = 0;
this.b = 0;
this.c = 0;
this.myAttributes = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.xml, "XmlQEReader", J.adapter.readers.xml.XmlReader);
Clazz.prepareFields (c$, function () {
this.myAttributes = ["SPECIES", "TAU"];
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.adapter.readers.xml.XmlQEReader, []);
});
$_V(c$, "getDOMAttributes", 
function () {
return this.myAttributes;
});
$_V(c$, "processXml", 
function (parent, saxReader) {
parent.doProcessLines = true;
this.PX (parent, saxReader);
}, "J.adapter.readers.xml.XmlReader,~O");
$_V(c$, "processStartElement", 
function (localName) {
if (J.util.Logger.debugging) J.util.Logger.debug ("xmlqe: start " + localName);
if (!this.parent.continuing) return;
if ("NUMBER_OF_ATOMS".equalsIgnoreCase (localName) || "CELL_DIMENSIONS".equalsIgnoreCase (localName) || "AT".equalsIgnoreCase (localName)) {
this.keepChars = true;
return;
}if (localName.startsWith ("ATOM.")) {
var xyz = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.atts.get ("TAU"), null, 3);
this.atom = this.atomSetCollection.addNewAtom ();
this.atom.elementSymbol = this.atts.get ("SPECIES").trim ();
this.parent.setAtomCoordXYZ (this.atom, xyz[0] * 0.5291772, xyz[1] * 0.5291772, xyz[2] * 0.5291772);
}if ("structure".equals (localName)) {
if (!this.parent.doGetModel (++this.parent.modelNumber, null)) {
this.parent.checkLastModel ();
return;
}this.parent.setFractionalCoordinates (true);
this.atomSetCollection.setDoFixPeriodic ();
this.atomSetCollection.newAtomSet ();
return;
}if (!this.parent.doProcessLines) return;
}, "~S");
$_V(c$, "processEndElement", 
function (localName) {
if (J.util.Logger.debugging) J.util.Logger.debug ("xmlqe: end " + localName);
while (true) {
if (!this.parent.doProcessLines) break;
if ("CELL_DIMENSIONS".equalsIgnoreCase (localName)) {
this.parent.setFractionalCoordinates (true);
var data = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.chars, null, 6);
this.a = data[0];
this.b = (data[1] == 0 ? this.a : data[1]);
this.c = (data[2] == 0 ? this.a : data[2]);
break;
}if ("AT".equalsIgnoreCase (localName)) {
var m = J.adapter.smarter.AtomSetCollectionReader.getTokensFloat (this.chars, null, 9);
for (var i = 0; i < 9; i += 3) {
m[i] *= this.a;
m[i + 1] *= this.b;
m[i + 2] *= this.c;
}
this.parent.addPrimitiveLatticeVector (0, m, 0);
this.parent.addPrimitiveLatticeVector (1, m, 3);
this.parent.addPrimitiveLatticeVector (2, m, 6);
break;
}if ("GEOMETRY_INFO".equalsIgnoreCase (localName)) {
try {
this.parent.applySymmetryAndSetTrajectory ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
break;
}return;
}
this.chars = null;
this.keepChars = false;
}, "~S");
});
