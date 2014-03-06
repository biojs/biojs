Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.JSONReader", ["JU.P3", "$.PT", "J.adapter.smarter.Bond", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scale = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "JSONReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.atomSetCollection.setCollectionName ("JSON");
this.atomSetCollection.newAtomSet ();
var s = "";
while (this.readLine () != null) s += this.line;

s = JU.PT.replaceAllCharacters (s, "\" ", "").$replace (',', ':');
if (s.contains ("_is2D:true")) this.set2D ();
if (s.contains ("_scale:")) this.getScaling (this.getSection (s, "_scale", false));
s = JU.PT.replaceAllCharacters (s, "}", "").$replace (',', ':');
this.readAtoms (this.getSection (s, "a", true));
this.readBonds (this.getSection (s, "b", true));
this.continuing = false;
});
$_M(c$, "getScaling", 
($fz = function (s) {
var xyz = s[0].$plit (":");
this.scale = JU.P3.new3 (1, 1, 1);
for (var j = 0; j < xyz.length; j += 2) if (xyz[j].length == 1) switch (xyz[j].charAt (0)) {
case 'x':
this.scale.x = this.parseFloatStr (xyz[j + 1]);
break;
case 'y':
this.scale.y = this.parseFloatStr (xyz[j + 1]);
break;
case 'z':
this.scale.z = this.parseFloatStr (xyz[j + 1]);
break;
}

J.util.Logger.info ("scale set to " + this.scale);
}, $fz.isPrivate = true, $fz), "~A");
$_M(c$, "getSection", 
($fz = function (json, key, isArray) {
var a = JU.PT.split (json, key + ":" + (isArray ? "[" : "") + "{");
if (a.length < 2) return a;
var data = a[1];
data = data.substring (0, data.indexOf ((isArray ? "]" : "}"))) + ":";
return JU.PT.split (data, "{");
}, $fz.isPrivate = true, $fz), "~S,~S,~B");
$_M(c$, "readAtoms", 
($fz = function (atoms) {
for (var i = 0; i < atoms.length; ++i) {
var lxyz = atoms[i].$plit (":");
var atom = this.atomSetCollection.addNewAtom ();
var x = 0;
var y = 0;
var z = 0;
var l = "C";
for (var j = 0; j < lxyz.length; j += 2) if (lxyz[j].length == 1) switch (lxyz[j].charAt (0)) {
case 'x':
x = this.parseFloatStr (lxyz[j + 1]);
break;
case 'y':
y = this.parseFloatStr (lxyz[j + 1]);
break;
case 'z':
z = this.parseFloatStr (lxyz[j + 1]);
break;
case 'l':
l = lxyz[j + 1];
break;
}

if (this.scale != null) {
x /= this.scale.x;
y /= this.scale.y;
z /= this.scale.z;
}this.setAtomCoordXYZ (atom, x, y, z);
atom.elementSymbol = l;
}
}, $fz.isPrivate = true, $fz), "~A");
$_M(c$, "readBonds", 
($fz = function (bonds) {
for (var i = 0; i < bonds.length; ++i) {
var beo = bonds[i].$plit (":");
var b = 0;
var e = 0;
var order = 1;
for (var j = 0; j < beo.length; j += 2) if (beo[j].length == 1) switch (beo[j].charAt (0)) {
case 'b':
b = this.parseIntStr (beo[j + 1]);
break;
case 'e':
e = this.parseIntStr (beo[j + 1]);
break;
case 'o':
var o = Clazz.floatToInt (this.parseFloatStr (beo[j + 1]) * 2);
switch (o) {
case 0:
continue;
case 2:
case 4:
case 6:
case 8:
order = Clazz.doubleToInt (o / 2);
break;
case 1:
order = 33;
break;
case 3:
order = 66;
break;
case 5:
order = 97;
break;
default:
order = 1;
break;
}
break;
}

this.atomSetCollection.addBond ( new J.adapter.smarter.Bond (b, e, order));
}
}, $fz.isPrivate = true, $fz), "~A");
});
