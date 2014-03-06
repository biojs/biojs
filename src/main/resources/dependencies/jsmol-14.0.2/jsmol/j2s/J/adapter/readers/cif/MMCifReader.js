Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.smarter.MMCifInterface"], "J.adapter.readers.cif.MMCifReader", ["java.util.Hashtable", "JU.BS", "$.List", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.api.JmolAdapter", "J.constant.EnumStructure", "J.util.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cr = null;
this.isBiomolecule = false;
this.byChain = false;
this.bySymop = false;
this.isCourseGrained = false;
this.chainAtomMap = null;
this.chainAtomCounts = null;
this.vBiomolecules = null;
this.thisBiomolecule = null;
this.htBiomts = null;
this.htSites = null;
this.assemblyIdAtoms = null;
this.thisChain = -1;
this.chainSum = null;
this.chainAtomCount = null;
this.assem = null;
this.data = null;
this.key = null;
this.hetatmData = null;
this.field = null;
this.firstChar = '\0';
this.htHetero = null;
this.propertyCount = 0;
this.fieldOf = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MMCifReader", null, J.adapter.smarter.MMCifInterface);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "initialize", 
function (r) {
this.cr = r;
this.byChain = r.checkFilterKey ("BYCHAIN");
this.bySymop = r.checkFilterKey ("BYSYMOP");
this.isCourseGrained = this.byChain || this.bySymop;
if (this.byChain) {
this.chainAtomMap =  new java.util.Hashtable ();
this.chainAtomCounts =  new java.util.Hashtable ();
}if (this.cr.checkFilterKey ("BIOMOLECULE")) this.cr.filter = JU.PT.simpleReplace (this.cr.filter, "BIOMOLECULE", "ASSEMBLY");
this.isBiomolecule = this.cr.checkFilterKey ("ASSEMBLY");
return this.isCourseGrained;
}, "J.adapter.readers.cif.CifReader");
$_V(c$, "finalizeReader", 
function (nAtoms) {
if (this.byChain && !this.isBiomolecule) for (var id, $id = this.chainAtomMap.keySet ().iterator (); $id.hasNext () && ((id = $id.next ()) || true);) this.createParticle (id);

var ac = this.cr.atomSetCollection;
if (!this.isCourseGrained && ac.getAtomCount () == nAtoms) ac.removeCurrentAtomSet ();
 else this.cr.applySymmetryAndSetTrajectory ();
if (this.htSites != null) this.cr.addSites (this.htSites);
if (this.vBiomolecules != null && this.vBiomolecules.size () == 1 && (this.isCourseGrained || ac.getAtomCount () > 0)) {
ac.setAtomSetAuxiliaryInfo ("biomolecules", this.vBiomolecules);
var ht = this.vBiomolecules.get (0);
this.cr.appendLoadNote ("Constructing " + ht.get ("name"));
this.setBiomolecules (ht);
if (this.thisBiomolecule != null) ac.applySymmetryBio (this.thisBiomolecule, this.cr.notionalUnitCell, this.cr.applySymmetryToBonds, this.cr.filter);
}}, "~N");
$_V(c$, "processData", 
function (key) {
if (key.startsWith ("_pdbx_entity_nonpoly")) this.processDataNonpoly ();
 else if (key.startsWith ("_pdbx_struct_assembly_gen")) this.processDataAssemblyGen ();
}, "~S");
$_M(c$, "processDataNonpoly", 
($fz = function () {
if (this.hetatmData == null) this.hetatmData =  new Array (3);
for (var i = J.adapter.readers.cif.MMCifReader.nonpolyFields.length; --i >= 0; ) if (this.cr.key.equals (J.adapter.readers.cif.MMCifReader.nonpolyFields[i])) {
this.hetatmData[i] = this.cr.data;
break;
}
if (this.hetatmData[1] == null || this.hetatmData[2] == null) return;
this.addHetero (this.hetatmData[2], this.hetatmData[1]);
this.hetatmData = null;
}, $fz.isPrivate = true, $fz));
$_M(c$, "processDataAssemblyGen", 
($fz = function () {
this.data = this.cr.data;
this.key = this.cr.key;
if (this.assem == null) this.assem =  new Array (3);
if (this.key.indexOf ("assembly_id") >= 0) this.assem[0] = this.data = this.cr.tokenizer.fullTrim (this.data);
 else if (this.key.indexOf ("oper_expression") >= 0) this.assem[1] = this.data = this.cr.tokenizer.fullTrim (this.data);
 else if (this.key.indexOf ("asym_id_list") >= 0) this.assem[2] = this.data = this.cr.tokenizer.fullTrim (this.data);
if (this.assem[0] != null && this.assem[1] != null && this.assem[2] != null) this.addAssembly ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "processAssemblyGenBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.assemblyFields);
while (this.cr.tokenizer.getData ()) {
this.assem =  new Array (3);
var count = 0;
var p;
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (p = this.fieldProperty (i)) {
case 0:
case 1:
case 2:
count++;
this.assem[p] = this.field;
break;
}
}
if (count == 3) this.addAssembly ();
}
this.assem = null;
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "addAssembly", 
($fz = function () {
var id = this.assem[0];
var iMolecule = this.cr.parseIntStr (id);
var list = this.assem[2];
this.cr.appendLoadNote ("found biomolecule " + id + ": " + list);
if (!this.cr.checkFilterKey ("ASSEMBLY " + id + ";")) return;
if (this.vBiomolecules == null) {
this.vBiomolecules =  new JU.List ();
}var info =  new java.util.Hashtable ();
info.put ("name", "biomolecule " + id);
info.put ("molecule", iMolecule == -2147483648 ? id : Integer.$valueOf (iMolecule));
info.put ("assemblies", "$" + list.$replace (',', '$'));
info.put ("operators", this.decodeAssemblyOperators (this.assem[1]));
info.put ("biomts",  new JU.List ());
this.thisBiomolecule = info;
J.util.Logger.info ("assembly " + id + " operators " + this.assem[1] + " ASYM_IDs " + this.assem[2]);
this.vBiomolecules.addLast (info);
this.assem = null;
}, $fz.isPrivate = true, $fz));
$_M(c$, "decodeAssemblyOperators", 
($fz = function (ops) {
var pt = ops.indexOf (")(");
if (pt >= 0) return this.crossBinary (this.decodeAssemblyOperators (ops.substring (0, pt + 1)), this.decodeAssemblyOperators (ops.substring (pt + 1)));
if (ops.startsWith ("(")) {
if (ops.indexOf ("-") >= 0) ops = J.util.Escape.uB ("({" + ops.substring (1, ops.length - 1).$replace ('-', ':') + "})").toString ();
ops = JU.PT.simpleReplace (ops, " ", "");
ops = ops.substring (1, ops.length - 1);
}return ops;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "crossBinary", 
($fz = function (ops1, ops2) {
var sb =  new JU.SB ();
var opsLeft = JU.PT.split (ops1, ",");
var opsRight = JU.PT.split (ops2, ",");
for (var i = 0; i < opsLeft.length; i++) for (var j = 0; j < opsRight.length; j++) sb.append (",").append (opsLeft[i]).append ("|").append (opsRight[j]);


return sb.toString ().substring (1);
}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "processStructOperListBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.operFields);
var m =  Clazz.newFloatArray (16, 0);
m[15] = 1;
while (this.cr.tokenizer.getData ()) {
var count = 0;
var id = null;
var xyz = null;
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
var p = this.fieldProperty (i);
switch (p) {
case -1:
break;
case 12:
id = this.field;
break;
case 13:
xyz = this.field;
break;
default:
m[p] = this.cr.parseFloatStr (this.field);
++count;
}
}
if (id != null && (count == 12 || xyz != null && this.cr.symmetry != null)) {
J.util.Logger.info ("assembly operator " + id + " " + xyz);
var m4 =  new JU.M4 ();
if (count != 12) {
this.cr.symmetry.getMatrixFromString (xyz, m, false);
m[3] *= this.cr.symmetry.getUnitCellInfoType (0) / 12;
m[7] *= this.cr.symmetry.getUnitCellInfoType (1) / 12;
m[11] *= this.cr.symmetry.getUnitCellInfoType (2) / 12;
}m4.setA (m, 0);
if (this.htBiomts == null) this.htBiomts =  new java.util.Hashtable ();
this.htBiomts.put (id, m4);
}}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "processChemCompLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.chemCompFields);
while (this.cr.tokenizer.getData ()) {
var groupName = null;
var hetName = null;
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case -1:
break;
case 0:
groupName = this.field;
break;
case 1:
hetName = this.field;
break;
}
}
if (groupName != null && hetName != null) this.addHetero (groupName, hetName);
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "processNonpolyLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.nonpolyFields);
while (this.cr.tokenizer.getData ()) {
var groupName = null;
var hetName = null;
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case -1:
case 0:
break;
case 2:
groupName = this.field;
break;
case 1:
hetName = this.field;
break;
}
}
if (groupName == null || hetName == null) return false;
this.addHetero (groupName, hetName);
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "addHetero", 
($fz = function (groupName, hetName) {
if (!J.api.JmolAdapter.isHetero (groupName)) return;
if (this.htHetero == null) this.htHetero =  new java.util.Hashtable ();
this.htHetero.put (groupName, hetName);
if (J.util.Logger.debugging) {
J.util.Logger.debug ("hetero: " + groupName + " = " + hetName);
}}, $fz.isPrivate = true, $fz), "~S,~S");
$_M(c$, "processStructConfLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.structConfFields);
for (var i = this.propertyCount; --i >= 0; ) if (this.fieldOf[i] == -1) {
J.util.Logger.warn ("?que? missing property: " + J.adapter.readers.cif.MMCifReader.structConfFields[i]);
return false;
}
while (this.cr.tokenizer.getData ()) {
var structure =  new J.adapter.smarter.Structure (-1, J.constant.EnumStructure.HELIX, J.constant.EnumStructure.HELIX, null, 0, 0);
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case -1:
break;
case 0:
if (this.field.startsWith ("TURN")) structure.structureType = structure.substructureType = J.constant.EnumStructure.TURN;
 else if (!this.field.startsWith ("HELX")) structure.structureType = structure.substructureType = J.constant.EnumStructure.NONE;
break;
case 1:
structure.startChainStr = this.field;
structure.startChainID = this.cr.viewer.getChainID (this.field);
break;
case 2:
structure.startSequenceNumber = this.cr.parseIntStr (this.field);
break;
case 3:
structure.startInsertionCode = this.firstChar;
break;
case 4:
structure.endChainStr = this.field;
structure.endChainID = this.cr.viewer.getChainID (this.field);
break;
case 5:
structure.endSequenceNumber = this.cr.parseIntStr (this.field);
break;
case 9:
structure.substructureType = J.adapter.smarter.Structure.getHelixType (this.cr.parseIntStr (this.field));
break;
case 6:
structure.endInsertionCode = this.firstChar;
break;
case 7:
structure.structureID = this.field;
break;
case 8:
structure.serialID = this.cr.parseIntStr (this.field);
break;
}
}
this.cr.atomSetCollection.addStructure (structure);
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "processStructSheetRangeLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.structSheetRangeFields);
for (var i = this.propertyCount; --i >= 0; ) if (this.fieldOf[i] == -1) {
J.util.Logger.warn ("?que? missing property:" + J.adapter.readers.cif.MMCifReader.structSheetRangeFields[i]);
return false;
}
while (this.cr.tokenizer.getData ()) {
var structure =  new J.adapter.smarter.Structure (-1, J.constant.EnumStructure.SHEET, J.constant.EnumStructure.SHEET, null, 0, 0);
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case 1:
structure.startChainID = this.cr.viewer.getChainID (this.field);
break;
case 2:
structure.startSequenceNumber = this.cr.parseIntStr (this.field);
break;
case 3:
structure.startInsertionCode = this.firstChar;
break;
case 4:
structure.endChainID = this.cr.viewer.getChainID (this.field);
break;
case 5:
structure.endSequenceNumber = this.cr.parseIntStr (this.field);
break;
case 6:
structure.endInsertionCode = this.firstChar;
break;
case 0:
structure.strandCount = 1;
structure.structureID = this.field;
break;
case 7:
structure.serialID = this.cr.parseIntStr (this.field);
break;
}
}
this.cr.atomSetCollection.addStructure (structure);
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "parseLoopParameters", 
($fz = function (fields) {
this.cr.parseLoopParameters (fields);
this.propertyCount = fields.length;
this.fieldOf = this.cr.fieldOf;
}, $fz.isPrivate = true, $fz), "~A");
$_M(c$, "processStructSiteBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.structSiteRangeFields);
for (var i = 3; --i >= 0; ) if (this.fieldOf[i] == -1) {
J.util.Logger.warn ("?que? missing property: " + J.adapter.readers.cif.MMCifReader.structSiteRangeFields[i]);
return false;
}
var siteID = "";
var seqNum = "";
var insCode = "";
var chainID = "";
var resID = "";
var group = "";
var htSite = null;
this.htSites =  new java.util.Hashtable ();
while (this.cr.tokenizer.getData ()) {
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case 0:
if (group !== "") {
var groups = htSite.get ("groups");
groups += (groups.length == 0 ? "" : ",") + group;
group = "";
htSite.put ("groups", groups);
}siteID = this.field;
htSite = this.htSites.get (siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable ();
htSite.put ("groups", "");
this.htSites.put (siteID, htSite);
}seqNum = "";
insCode = "";
chainID = "";
resID = "";
break;
case 1:
resID = this.field;
break;
case 2:
chainID = this.field;
break;
case 3:
seqNum = this.field;
break;
case 4:
insCode = this.field;
break;
}
if (seqNum !== "" && resID !== "") group = "[" + resID + "]" + seqNum + (insCode.length > 0 ? "^" + insCode : "") + (chainID.length > 0 ? ":" + chainID : "");
}
}
if (group !== "") {
var groups = htSite.get ("groups");
groups += (groups.length == 0 ? "" : ",") + group;
group = "";
htSite.put ("groups", groups);
}return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "fieldProperty", 
($fz = function (i) {
return ((this.field = this.cr.tokenizer.loopData[i]).length > 0 && (this.firstChar = this.field.charAt (0)) != '\0' ? this.cr.propertyOf[i] : -1);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "setBiomolecules", 
($fz = function (biomolecule) {
if (!this.isBiomolecule || this.assemblyIdAtoms == null && this.chainAtomCounts == null) return;
var mident = JU.M4.newM (null);
var ops = JU.PT.split (biomolecule.get ("operators"), ",");
var assemblies = biomolecule.get ("assemblies");
var biomts =  new JU.List ();
biomolecule.put ("biomts", biomts);
biomts.addLast (mident);
for (var j = 0; j < ops.length; j++) {
var m = this.getOpMatrix (ops[j]);
if (m != null && !m.equals (mident)) biomts.addLast (m);
}
var bsAll =  new JU.BS ();
var sum =  new JU.P3 ();
var count = 0;
var nAtoms = 0;
var ids = JU.PT.split (assemblies, "$");
for (var j = 1; j < ids.length; j++) {
var id = ids[j];
if (this.assemblyIdAtoms != null) {
var bs = this.assemblyIdAtoms.get (id);
if (bs != null) {
System.out.println (id + " " + bs.cardinality ());
bsAll.or (bs);
}} else if (this.isCourseGrained) {
var asum = this.chainAtomMap.get (id);
var c = this.chainAtomCounts.get (id)[0];
if (asum != null) {
if (this.bySymop) {
sum.add (asum);
count += c;
} else {
this.createParticle (id);
nAtoms++;
}}}}
if (this.isCourseGrained) {
if (this.bySymop) {
nAtoms = 1;
var a1 =  new J.adapter.smarter.Atom ();
a1.setT (sum);
a1.scale (1 / count);
a1.radius = 16;
}} else {
nAtoms = bsAll.cardinality ();
if (nAtoms < this.cr.atomSetCollection.getAtomCount ()) this.cr.atomSetCollection.bsAtoms = bsAll;
}biomolecule.put ("atomCount", Integer.$valueOf (nAtoms * ops.length));
}, $fz.isPrivate = true, $fz), "java.util.Map");
$_M(c$, "createParticle", 
($fz = function (id) {
var asum = this.chainAtomMap.get (id);
var c = this.chainAtomCounts.get (id)[0];
var a =  new J.adapter.smarter.Atom ();
a.setT (asum);
a.scale (1 / c);
a.elementSymbol = "Pt";
a.chainID = this.cr.viewer.getChainID (id);
a.radius = 16;
this.cr.atomSetCollection.addAtom (a);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "getOpMatrix", 
($fz = function (ops) {
if (this.htBiomts == null) return JU.M4.newM (null);
var pt = ops.indexOf ("|");
if (pt >= 0) {
var m = JU.M4.newM (this.htBiomts.get (ops.substring (0, pt)));
m.mulM4 (this.htBiomts.get (ops.substring (pt + 1)));
return m;
}return this.htBiomts.get (ops);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "processLigandBondLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.chemCompBondFields);
for (var i = this.propertyCount; --i >= 0; ) if (this.fieldOf[i] == -1) {
J.util.Logger.warn ("?que? missing property: " + J.adapter.readers.cif.MMCifReader.chemCompBondFields[i]);
return false;
}
var order = 0;
var isAromatic = false;
while (this.cr.tokenizer.getData ()) {
var atomIndex1 = -1;
var atomIndex2 = -1;
order = 0;
isAromatic = false;
for (var i = 0; i < this.cr.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case 0:
atomIndex1 = this.cr.atomSetCollection.getAtomIndexFromName (this.field);
break;
case 1:
atomIndex2 = this.cr.atomSetCollection.getAtomIndexFromName (this.field);
break;
case 3:
isAromatic = (this.field.charAt (0) == 'Y');
break;
case 2:
order = this.cr.getBondOrder (this.field);
break;
}
}
if (atomIndex1 < 0 || atomIndex2 < 0) continue;
if (isAromatic) switch (order) {
case 1:
order = 513;
break;
case 2:
order = 514;
break;
}
this.cr.atomSetCollection.addNewBondWithOrder (atomIndex1, atomIndex2, order);
}
return true;
}, $fz.isPrivate = true, $fz));
$_V(c$, "checkAtom", 
function (atom, assemblyId, index) {
if (this.byChain && !this.isBiomolecule) {
if (this.thisChain != atom.chainID) {
this.thisChain = atom.chainID;
var id = "" + atom.chainID;
this.chainSum = this.chainAtomMap.get (id);
if (this.chainSum == null) {
this.chainAtomMap.put (id, this.chainSum =  new JU.P3 ());
this.chainAtomCounts.put (id, this.chainAtomCount =  Clazz.newIntArray (1, 0));
}}this.chainSum.add (atom);
this.chainAtomCount[0]++;
return false;
}if (this.isBiomolecule && this.isCourseGrained) {
var sum = this.chainAtomMap.get (assemblyId);
if (sum == null) {
this.chainAtomMap.put (assemblyId, sum =  new JU.P3 ());
this.chainAtomCounts.put (assemblyId,  Clazz.newIntArray (1, 0));
}this.chainAtomCounts.get (assemblyId)[0]++;
sum.add (atom);
return false;
}if (assemblyId != null) {
if (this.assemblyIdAtoms == null) this.assemblyIdAtoms =  new java.util.Hashtable ();
var bs = this.assemblyIdAtoms.get (assemblyId);
if (bs == null) this.assemblyIdAtoms.put (assemblyId, bs =  new JU.BS ());
bs.set (index);
}if (atom.isHetero && this.htHetero != null) {
this.cr.atomSetCollection.setAtomSetAuxiliaryInfo ("hetNames", this.htHetero);
this.cr.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("hetNames", this.htHetero);
this.htHetero = null;
}return true;
}, "J.adapter.smarter.Atom,~S,~N");
$_V(c$, "processPDBLoops", 
function (str) {
if (str.startsWith ("_pdbx_struct_oper_list")) return this.processStructOperListBlock ();
if (str.startsWith ("_pdbx_struct_assembly_gen")) return this.processAssemblyGenBlock ();
if (this.isCourseGrained) return false;
if (str.startsWith ("_struct_site_gen")) return this.processStructSiteBlock ();
if (str.startsWith ("_chem_comp_bond")) return this.processLigandBondLoopBlock ();
if (str.startsWith ("_chem_comp")) return this.processChemCompLoopBlock ();
if (str.startsWith ("_pdbx_entity_nonpoly")) return this.processNonpolyLoopBlock ();
if (str.startsWith ("_struct_conf") && !str.startsWith ("_struct_conf_type")) return this.processStructConfLoopBlock ();
if (str.startsWith ("_struct_sheet_range")) return this.processStructSheetRangeLoopBlock ();
return false;
}, "~S");
Clazz.defineStatics (c$,
"NONE", -1,
"OPER_ID", 12,
"OPER_XYZ", 13,
"operFields", ["_pdbx_struct_oper_list_matrix[1][1]", "_pdbx_struct_oper_list_matrix[1][2]", "_pdbx_struct_oper_list_matrix[1][3]", "_pdbx_struct_oper_list_vector[1]", "_pdbx_struct_oper_list_matrix[2][1]", "_pdbx_struct_oper_list_matrix[2][2]", "_pdbx_struct_oper_list_matrix[2][3]", "_pdbx_struct_oper_list_vector[2]", "_pdbx_struct_oper_list_matrix[3][1]", "_pdbx_struct_oper_list_matrix[3][2]", "_pdbx_struct_oper_list_matrix[3][3]", "_pdbx_struct_oper_list_vector[3]", "_pdbx_struct_oper_list_id", "_pdbx_struct_oper_list_symmetry_operation"],
"ASSEM_ID", 0,
"ASSEM_OPERS", 1,
"ASSEM_LIST", 2,
"assemblyFields", ["_pdbx_struct_assembly_gen_assembly_id", "_pdbx_struct_assembly_gen_oper_expression", "_pdbx_struct_assembly_gen_asym_id_list"],
"NONPOLY_ENTITY_ID", 0,
"NONPOLY_NAME", 1,
"NONPOLY_COMP_ID", 2,
"nonpolyFields", ["_pdbx_entity_nonpoly_entity_id", "_pdbx_entity_nonpoly_name", "_pdbx_entity_nonpoly_comp_id"],
"CHEM_COMP_ID", 0,
"CHEM_COMP_NAME", 1,
"chemCompFields", ["_chem_comp_id", "_chem_comp_name"],
"CONF_TYPE_ID", 0,
"BEG_ASYM_ID", 1,
"BEG_SEQ_ID", 2,
"BEG_INS_CODE", 3,
"END_ASYM_ID", 4,
"END_SEQ_ID", 5,
"END_INS_CODE", 6,
"STRUCT_ID", 7,
"SERIAL_NO", 8,
"HELIX_CLASS", 9,
"structConfFields", ["_struct_conf_conf_type_id", "_struct_conf_beg_auth_asym_id", "_struct_conf_beg_auth_seq_id", "_struct_conf_pdbx_beg_pdb_ins_code", "_struct_conf_end_auth_asym_id", "_struct_conf_end_auth_seq_id", "_struct_conf_pdbx_end_pdb_ins_code", "_struct_conf_id", "_struct_conf_pdbx_pdb_helix_id", "_struct_conf_pdbx_pdb_helix_class"],
"SHEET_ID", 0,
"STRAND_ID", 7,
"structSheetRangeFields", ["_struct_sheet_range_sheet_id", "_struct_sheet_range_beg_auth_asym_id", "_struct_sheet_range_beg_auth_seq_id", "_struct_sheet_range_pdbx_beg_pdb_ins_code", "_struct_sheet_range_end_auth_asym_id", "_struct_sheet_range_end_auth_seq_id", "_struct_sheet_range_pdbx_end_pdb_ins_code", "_struct_sheet_range_id"],
"SITE_ID", 0,
"SITE_COMP_ID", 1,
"SITE_ASYM_ID", 2,
"SITE_SEQ_ID", 3,
"SITE_INS_CODE", 4,
"structSiteRangeFields", ["_struct_site_gen_site_id", "_struct_site_gen_auth_comp_id", "_struct_site_gen_auth_asym_id", "_struct_site_gen_auth_seq_id", "_struct_site_gen_label_alt_id"],
"CHEM_COMP_BOND_ATOM_ID_1", 0,
"CHEM_COMP_BOND_ATOM_ID_2", 1,
"CHEM_COMP_BOND_VALUE_ORDER", 2,
"CHEM_COMP_BOND_AROMATIC_FLAG", 3,
"chemCompBondFields", ["_chem_comp_bond_atom_id_1", "_chem_comp_bond_atom_id_2", "_chem_comp_bond_value_order", "_chem_comp_bond_pdbx_aromatic_flag"]);
});
