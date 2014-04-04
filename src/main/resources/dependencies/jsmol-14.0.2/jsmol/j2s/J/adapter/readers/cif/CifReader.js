Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "J.api.JmolLineReader", "java.util.Hashtable", "JU.List", "$.P3", "J.io.CifDataReader"], "J.adapter.readers.cif.CifReader", ["java.lang.Boolean", "$.Character", "$.Float", "JU.BS", "$.PT", "$.V3", "J.adapter.smarter.Atom", "J.api.Interface", "$.JmolAdapter", "J.io.JmolBinary", "J.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mr = null;
this.pr = null;
this.tokenizer = null;
this.isMolecular = false;
this.filterAssembly = false;
this.allowRotations = true;
this.checkSpecial = true;
this.readIdeal = true;
this.configurationPtr = -2147483648;
this.thisDataSetName = "";
this.chemicalName = "";
this.thisStructuralFormula = "";
this.thisFormula = "";
this.iHaveDesiredModel = false;
this.isPDB = false;
this.isPDBX = false;
this.molecularType = "GEOM_BOND default";
this.lastAltLoc = '\0';
this.haveAromatic = false;
this.conformationIndex = 0;
this.nMolecular = 0;
this.appendedData = null;
this.skipping = false;
this.nAtoms = 0;
this.auditBlockCode = null;
this.lastSpaceGroupName = null;
this.modulated = false;
this.lookingForPDB = true;
this.isCourseGrained = false;
this.htAudit = null;
this.symops = null;
this.key = null;
this.data = null;
this.field = null;
this.firstChar = '\0';
this.propertyOf = null;
this.fieldOf = null;
this.fields = null;
this.propertyCount = 0;
this.atomTypes = null;
this.bondTypes = null;
this.disorderAssembly = ".";
this.lastDisorderAssembly = null;
this.atomRadius = null;
this.bsConnected = null;
this.bsSets = null;
this.ptOffset = null;
this.bsMolecule = null;
this.bsExclude = null;
this.firstAtom = 0;
this.atomCount = 0;
this.atoms = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "CifReader", J.adapter.smarter.AtomSetCollectionReader, J.api.JmolLineReader);
Clazz.prepareFields (c$, function () {
this.tokenizer =  new J.io.CifDataReader (this);
this.propertyOf =  Clazz.newIntArray (100, 0);
this.fieldOf =  Clazz.newIntArray (100, 0);
this.bondTypes =  new JU.List ();
this.ptOffset =  new JU.P3 ();
});
$_V(c$, "initializeReader", 
function () {
this.initializeReaderCif ();
});
$_M(c$, "initializeReaderCif", 
function () {
this.appendedData = this.htParams.get ("appendedData");
var conf = this.getFilter ("CONF ");
if (conf != null) this.configurationPtr = this.parseIntStr (conf);
this.isMolecular = this.checkFilterKey ("MOLECUL") && !this.checkFilterKey ("BIOMOLECULE");
this.readIdeal = !this.checkFilterKey ("NOIDEAL");
this.filterAssembly = this.checkFilterKey ("$");
if (this.isMolecular) {
if (!this.doApplySymmetry) {
this.doApplySymmetry = true;
this.latticeCells[0] = 1;
this.latticeCells[1] = 1;
this.latticeCells[2] = 1;
}this.molecularType = "filter \"MOLECULAR\"";
}this.checkSpecial = !this.checkFilterKey ("NOSPECIAL");
this.atomSetCollection.setCheckSpecial (this.checkSpecial);
this.allowRotations = !this.checkFilterKey ("NOSYM");
this.readCifData ();
this.continuing = false;
});
$_M(c$, "readCifData", 
($fz = function () {
this.line = "";
while ((this.key = this.tokenizer.peekToken ()) != null) if (!this.readAllData ()) break;

if (this.appendedData != null) {
this.tokenizer =  new J.io.CifDataReader (J.io.JmolBinary.getBR (this.appendedData));
while ((this.key = this.tokenizer.peekToken ()) != null) if (!this.readAllData ()) break;

}}, $fz.isPrivate = true, $fz));
$_V(c$, "readNextLine", 
function () {
if (this.readLine () != null && this.line.indexOf ("#jmolscript:") >= 0) this.checkCurrentLineForScript ();
return this.line;
});
$_M(c$, "readAllData", 
($fz = function () {
if (this.key.startsWith ("data_")) {
if (this.iHaveDesiredModel) return false;
this.newModel (++this.modelNumber);
if (!this.skipping) this.processDataParameter ();
this.nAtoms = this.atomSetCollection.getAtomCount ();
return true;
}if (this.lookingForPDB && !this.isPDBX && this.key.indexOf (".pdb") >= 0) this.initializeMMCIF ();
if (this.skipping && this.key.equals ("_audit_block_code")) {
this.iHaveDesiredModel = false;
this.skipping = false;
}if (this.key.startsWith ("loop_")) {
if (this.skipping) {
this.tokenizer.getTokenPeeked ();
this.skipLoop ();
} else {
this.processLoopBlock ();
}return true;
}if (this.key.indexOf ("_") != 0) {
J.util.Logger.warn ("CIF ERROR ? should be an underscore: " + this.key);
this.tokenizer.getTokenPeeked ();
} else if (!this.getData ()) {
return true;
}if (!this.skipping) {
this.key = this.fixKey (this.key);
if (this.key.startsWith ("_chemical_name") || this.key.equals ("_chem_comp_name")) {
this.processChemicalInfo ("name");
} else if (this.key.startsWith ("_chemical_formula_structural")) {
this.processChemicalInfo ("structuralFormula");
} else if (this.key.startsWith ("_chemical_formula_sum") || this.key.equals ("_chem_comp_formula")) {
this.processChemicalInfo ("formula");
} else if (this.key.equals ("_cell_modulation_dimension")) {
this.initializeMSCIF (this.data);
} else if (this.key.equals ("_citation_title")) {
this.appendLoadNote ("TITLE: " + this.tokenizer.fullTrim (this.data));
} else if (this.key.startsWith ("_cell_")) {
this.processCellParameter ();
} else if (this.key.startsWith ("_symmetry_space_group_name_h-m") || this.key.startsWith ("_symmetry_space_group_name_hall") || this.key.contains ("_ssg_name")) {
this.processSymmetrySpaceGroupName ();
} else if (this.key.startsWith ("_atom_sites_fract_tran")) {
this.processUnitCellTransformMatrix ();
} else if (this.key.equals ("_audit_block_code")) {
this.auditBlockCode = this.tokenizer.fullTrim (this.data).toUpperCase ();
this.appendLoadNote (this.auditBlockCode);
if (this.htAudit != null && this.auditBlockCode.contains ("_MOD_")) {
var key = JU.PT.simpleReplace (this.auditBlockCode, "_MOD_", "_REFRNCE_");
if ((this.atomSetCollection.symmetry = this.htAudit.get (key)) != null) {
this.notionalUnitCell = this.atomSetCollection.symmetry.getNotionalUnitCell ();
this.iHaveUnitCell = true;
}} else if (this.htAudit != null && this.symops != null) {
for (var i = 0; i < this.symops.size (); i++) this.setSymmetryOperator (this.symops.get (i));

}if (this.lastSpaceGroupName != null) this.setSpaceGroupName (this.lastSpaceGroupName);
} else if (this.pr != null) {
this.pr.processData (this.key);
}}return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "initializeMMCIF", 
($fz = function () {
this.isPDBX = true;
this.lookingForPDB = false;
if (this.pr == null) this.pr = J.api.Interface.getInterface ("J.adapter.readers.cif.MMCifReader");
this.isCourseGrained = this.pr.initialize (this);
}, $fz.isPrivate = true, $fz));
$_M(c$, "initializeMSCIF", 
($fz = function (data) {
if (this.mr == null) this.mr = J.api.Interface.getInterface ("J.adapter.readers.cif.MSCifReader");
this.modulated = (this.mr.initialize (this, data) > 0);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "fixKey", 
($fz = function (key) {
return JU.PT.simpleReplace (key, ".", "_").toLowerCase ();
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "newModel", 
function (modelNo) {
if (this.isPDB) this.setIsPDB ();
this.skipping = !this.doGetModel (this.modelNumber = modelNo, null);
if (this.skipping) {
this.tokenizer.getTokenPeeked ();
return;
}this.chemicalName = "";
this.thisStructuralFormula = "";
this.thisFormula = "";
if (this.isCourseGrained) this.atomSetCollection.setAtomSetAuxiliaryInfo ("courseGrained", Boolean.TRUE);
if (this.nAtoms == this.atomSetCollection.getAtomCount ()) this.atomSetCollection.removeCurrentAtomSet ();
 else this.applySymmetryAndSetTrajectory ();
this.iHaveDesiredModel = this.isLastModel (this.modelNumber);
}, "~N");
$_V(c$, "finalizeReader", 
function () {
if (this.pr != null) this.pr.finalizeReader (this.nAtoms);
 else this.applySymmetryAndSetTrajectory ();
if (this.mr != null) this.mr.finalizeModulation ();
var n = this.atomSetCollection.getAtomSetCount ();
if (n > 1) this.atomSetCollection.setCollectionName ("<collection of " + n + " models>");
this.finalizeReaderASCR ();
var header = this.tokenizer.getFileHeader ();
if (header.length > 0) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("fileHeader", header);
if (this.haveAromatic) this.addJmolScript ("calculate aromatic");
});
$_V(c$, "applySymmetryAndSetTrajectory", 
function () {
if (this.isPDB) this.atomSetCollection.setCheckSpecial (false);
var doCheck = this.doCheckUnitCell && !this.isPDB;
var sym = this.applySymTrajASCR ();
if (this.auditBlockCode != null && this.auditBlockCode.contains ("REFRNCE") && sym != null) {
if (this.htAudit == null) this.htAudit =  new java.util.Hashtable ();
this.htAudit.put (this.auditBlockCode, sym);
}if (doCheck && (this.bondTypes.size () > 0 || this.isMolecular)) this.setBondingAndMolecules ();
this.atomSetCollection.setAtomSetAuxiliaryInfo ("fileHasUnitCell", Boolean.TRUE);
if (this.mr != null) this.mr.setModulation ();
this.atomSetCollection.symmetry = null;
});
$_M(c$, "processDataParameter", 
($fz = function () {
this.bondTypes.clear ();
this.tokenizer.getTokenPeeked ();
this.thisDataSetName = (this.key.length < 6 ? "" : this.key.substring (5));
this.lookingForPDB = (this.thisDataSetName.length > 0 && !this.thisDataSetName.equals ("global"));
if (this.thisDataSetName.length > 0) this.nextAtomSet ();
if (J.util.Logger.debugging) J.util.Logger.debug (this.key);
}, $fz.isPrivate = true, $fz));
$_M(c$, "nextAtomSet", 
($fz = function () {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isCIF", Boolean.TRUE);
if (this.atomSetCollection.getCurrentAtomSetIndex () >= 0) {
this.atomSetCollection.newAtomSet ();
} else {
this.atomSetCollection.setCollectionName (this.thisDataSetName);
}}, $fz.isPrivate = true, $fz));
$_M(c$, "processChemicalInfo", 
($fz = function (type) {
if (type.equals ("name")) {
this.chemicalName = this.data = this.tokenizer.fullTrim (this.data);
if (!this.data.equals ("?")) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("modelLoadNote", this.data);
} else if (type.equals ("structuralFormula")) {
this.thisStructuralFormula = this.data = this.tokenizer.fullTrim (this.data);
} else if (type.equals ("formula")) {
this.thisFormula = this.data = this.tokenizer.fullTrim (this.data);
}if (J.util.Logger.debugging) {
J.util.Logger.debug (type + " = " + this.data);
}return this.data;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "processSymmetrySpaceGroupName", 
($fz = function () {
if (this.key.indexOf ("_ssg_name") >= 0) this.modulated = true;
 else if (this.modulated) return;
this.data = this.tokenizer.toUnicode (this.data);
this.setSpaceGroupName (this.lastSpaceGroupName = (this.key.indexOf ("h-m") > 0 ? "HM:" : this.modulated ? "SSG:" : "Hall:") + this.data);
}, $fz.isPrivate = true, $fz));
$_M(c$, "processCellParameter", 
($fz = function () {
for (var i = J.api.JmolAdapter.cellParamNames.length; --i >= 0; ) if (this.key.equals (J.api.JmolAdapter.cellParamNames[i])) {
this.setUnitCellItem (i, this.parseFloatStr (this.data));
return;
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "processUnitCellTransformMatrix", 
($fz = function () {
var v = this.parseFloatStr (this.data);
if (Float.isNaN (v)) return;
for (var i = 0; i < J.adapter.readers.cif.CifReader.TransformFields.length; i++) {
if (this.key.indexOf (J.adapter.readers.cif.CifReader.TransformFields[i]) >= 0) {
this.setUnitCellItem (6 + i, v);
return;
}}
}, $fz.isPrivate = true, $fz));
$_M(c$, "getData", 
($fz = function () {
this.key = this.tokenizer.getTokenPeeked ();
this.data = this.tokenizer.getNextToken ();
if (this.data == null) {
J.util.Logger.warn ("CIF ERROR ? end of file; data missing: " + this.key);
return false;
}return (this.data.length == 0 || this.data.charAt (0) != '\0');
}, $fz.isPrivate = true, $fz));
$_M(c$, "processLoopBlock", 
($fz = function () {
this.tokenizer.getTokenPeeked ();
var str = this.tokenizer.peekToken ();
if (str == null) return;
var isLigand = false;
str = this.fixKey (str);
if (this.lookingForPDB && !this.isPDBX && str.indexOf ("_pdb") >= 0) this.initializeMMCIF ();
if (this.modulated && (str.startsWith ("_cell_wave") || str.contains ("fourier") || str.contains ("_special_func"))) {
if (!this.mr.processModulationLoopBlock ()) this.skipLoop ();
return;
}if (str.startsWith ("_atom_site_") || (isLigand = str.equals ("_chem_comp_atom_comp_id"))) {
if (!this.processAtomSiteLoopBlock (isLigand)) return;
this.atomSetCollection.setAtomSetName (this.thisDataSetName);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("chemicalName", this.chemicalName);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("structuralFormula", this.thisStructuralFormula);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("formula", this.thisFormula);
return;
}if (str.startsWith ("_symmetry_equiv_pos") || str.startsWith ("_space_group_symop") || str.startsWith ("_symmetry_ssg_equiv")) {
if (this.ignoreFileSymmetryOperators) {
J.util.Logger.warn ("ignoring file-based symmetry operators");
this.skipLoop ();
} else {
this.processSymmetryOperationsLoopBlock ();
}return;
}if (str.startsWith ("_citation")) {
this.processCitationListBlock ();
return;
}if (this.pr != null && this.pr.processPDBLoops (str)) return;
if (str.startsWith ("_atom_type")) {
this.processAtomTypeLoopBlock ();
return;
}if (this.mr != null && str.equals ("_cell_subsystem_code")) this.mr.processSubsystemLoopBlock ();
if (str.startsWith ("_geom_bond")) {
if (!this.doApplySymmetry) {
this.isMolecular = true;
this.doApplySymmetry = true;
this.latticeCells[0] = this.latticeCells[1] = this.latticeCells[2] = 1;
}if (this.isMolecular) {
this.processGeomBondLoopBlock ();
return;
}}this.skipLoop ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "fieldProperty", 
($fz = function (i) {
return ((this.field = this.tokenizer.loopData[i]).length > 0 && (this.firstChar = this.field.charAt (0)) != '\0' ? this.propertyOf[i] : -1);
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "parseLoopParameters", 
function (fields) {
if (fields == null) {
this.fields =  new Array (100);
} else {
if (!J.adapter.readers.cif.CifReader.htFields.containsKey (fields[0])) for (var i = fields.length; --i >= 0; ) J.adapter.readers.cif.CifReader.htFields.put (fields[i], Integer.$valueOf (i));

for (var i = fields.length; --i >= 0; ) this.fieldOf[i] = -1;

this.propertyCount = fields.length;
}this.tokenizer.fieldCount = 0;
while (true) {
var str = this.tokenizer.peekToken ();
if (str == null) {
this.tokenizer.fieldCount = 0;
break;
}if (str.charAt (0) != '_') break;
var pt = this.tokenizer.fieldCount++;
str = this.fixKey (this.tokenizer.getTokenPeeked ());
if (fields == null) {
this.fields[this.propertyOf[pt] = pt] = str;
this.fieldOf[pt] = pt;
continue;
}var iField = J.adapter.readers.cif.CifReader.htFields.get (str);
var i = (iField == null ? -1 : iField.intValue ());
if ((this.propertyOf[pt] = i) != -1) this.fieldOf[i] = pt;
}
if (this.tokenizer.fieldCount > 0) this.tokenizer.loopData =  new Array (this.tokenizer.fieldCount);
}, "~A");
$_M(c$, "disableField", 
($fz = function (fieldIndex) {
var i = this.fieldOf[fieldIndex];
if (i != -1) this.propertyOf[i] = -1;
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "skipLoop", 
function () {
var str;
while ((str = this.tokenizer.peekToken ()) != null && str.charAt (0) == '_') str = this.tokenizer.getTokenPeeked ();

while (this.tokenizer.getNextDataToken () != null) {
}
});
$_M(c$, "processAtomTypeLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.atomTypeFields);
for (var i = this.propertyCount; --i >= 0; ) if (this.fieldOf[i] == -1) {
this.skipLoop ();
return;
}
while (this.tokenizer.getData ()) {
var atomTypeSymbol = null;
var oxidationNumber = NaN;
for (var i = 0; i < this.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case -1:
break;
case 0:
atomTypeSymbol = this.field;
break;
case 1:
oxidationNumber = this.parseFloatStr (this.field);
break;
}
}
if (atomTypeSymbol == null || Float.isNaN (oxidationNumber)) continue;
if (this.atomTypes == null) this.atomTypes =  new java.util.Hashtable ();
this.atomTypes.put (atomTypeSymbol, Float.$valueOf (oxidationNumber));
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "processAtomSiteLoopBlock", 
function (isLigand) {
this.lookingForPDB = false;
var currentModelNO = -1;
var isAnisoData = false;
var assemblyId = null;
this.parseLoopParameters (J.adapter.readers.cif.CifReader.atomFields);
if (this.fieldOf[55] != -1) {
this.isPDB = false;
this.setFractionalCoordinates (false);
} else if (this.fieldOf[6] != -1 || this.fieldOf[52] != -1) {
this.setFractionalCoordinates (false);
this.disableField (3);
this.disableField (4);
this.disableField (5);
} else if (this.fieldOf[3] != -1) {
this.setFractionalCoordinates (true);
this.disableField (6);
this.disableField (7);
this.disableField (8);
} else if (this.fieldOf[20] != -1) {
isAnisoData = true;
} else if (this.fieldOf[21] != -1) {
isAnisoData = true;
} else {
this.skipLoop ();
return false;
}var iAtom = -1;
var modelField = -1;
var subid = null;
var siteMult = 0;
while (this.tokenizer.getData ()) {
var atom =  new J.adapter.smarter.Atom ();
assemblyId = null;
if (this.isPDBX) {
if (modelField == -1) {
for (var i = 0; i < this.tokenizer.fieldCount; ++i) if (this.fieldProperty (i) == 17) {
modelField = i;
this.isPDB = true;
break;
}
if (modelField == -1) modelField = -2;
}if (modelField >= 0) {
this.fieldProperty (modelField);
var modelNO = this.parseIntStr (this.field);
if (modelNO != currentModelNO) {
if (this.iHaveDesiredModel) {
this.skipLoop ();
this.skipping = false;
this.continuing = true;
break;
}currentModelNO = modelNO;
this.newModel (modelNO);
if (!this.skipping) this.nextAtomSet ();
}if (this.skipping) continue;
}}for (var i = 0; i < this.tokenizer.fieldCount; ++i) {
var tok = this.fieldProperty (i);
switch (tok) {
case -1:
case 17:
break;
case 50:
case 0:
var elementSymbol;
if (this.field.length < 2) {
elementSymbol = this.field;
} else {
var ch1 = Character.toLowerCase (this.field.charAt (1));
if (J.adapter.smarter.Atom.isValidElementSymbol2 (this.firstChar, ch1)) elementSymbol = "" + this.firstChar + ch1;
 else elementSymbol = "" + this.firstChar;
}atom.elementSymbol = elementSymbol;
if (this.atomTypes != null && this.atomTypes.containsKey (this.field)) {
var charge = this.atomTypes.get (this.field).floatValue ();
atom.formalCharge = Math.round (charge);
if (Math.abs (atom.formalCharge - charge) > 0.1) if (J.util.Logger.debugging) {
J.util.Logger.debug ("CIF charge on " + this.field + " was " + charge + "; rounded to " + atom.formalCharge);
}}break;
case 49:
case 1:
case 2:
atom.atomName = this.field;
break;
case 55:
var x = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (x)) atom.x = x;
break;
case 56:
var y = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (y)) atom.y = y;
break;
case 57:
var z = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (z)) atom.z = z;
break;
case 52:
case 6:
case 3:
atom.x = this.parseFloatStr (this.field);
break;
case 53:
case 7:
case 4:
atom.y = this.parseFloatStr (this.field);
break;
case 54:
case 8:
case 5:
atom.z = this.parseFloatStr (this.field);
break;
case 51:
atom.formalCharge = this.parseIntStr (this.field);
break;
case 9:
var floatOccupancy = this.parseFloatStr (this.field);
if (!Float.isNaN (floatOccupancy)) atom.foccupancy = floatOccupancy;
break;
case 10:
atom.bfactor = this.parseFloatStr (this.field) * (this.isPDB ? 1 : 100);
break;
case 48:
case 11:
atom.group3 = this.field;
break;
case 59:
assemblyId = this.field;
break;
case 12:
atom.chainID = this.viewer.getChainID (this.field);
break;
case 13:
atom.sequenceNumber = this.parseIntStr (this.field);
break;
case 14:
atom.insertionCode = this.firstChar;
break;
case 15:
atom.alternateLocationID = this.firstChar;
break;
case 58:
this.disorderAssembly = this.field;
break;
case 19:
if (this.firstChar == '-' && this.field.length > 1) {
atom.alternateLocationID = this.field.charAt (1);
atom.ignoreSymmetry = true;
} else {
atom.alternateLocationID = this.firstChar;
}break;
case 16:
this.isPDB = true;
if ("HETATM".equals (this.field)) atom.isHetero = true;
break;
case 18:
if ("dum".equals (this.field)) {
atom.x = NaN;
continue;
}break;
case 62:
case 47:
if (this.field.equalsIgnoreCase ("Uiso")) {
var j = this.fieldOf[34];
if (j != -1) this.setU (atom, 7, this.parseFloatStr (this.tokenizer.loopData[j]));
}break;
case 20:
iAtom = this.atomSetCollection.getAtomIndexFromName (this.field);
if (iAtom < 0) continue;
atom = this.atomSetCollection.getAtom (iAtom);
break;
case 21:
atom = this.atomSetCollection.getAtom (++iAtom);
break;
case 22:
case 23:
case 24:
case 25:
case 26:
case 27:
case 28:
case 29:
case 30:
case 31:
case 32:
case 33:
this.setU (atom, (this.propertyOf[i] - 22) % 6, this.parseFloatStr (this.field));
break;
case 35:
case 36:
case 37:
case 38:
case 39:
case 40:
this.setU (atom, 6, 4);
this.setU (atom, (this.propertyOf[i] - 35) % 6, this.parseFloatStr (this.field));
break;
case 41:
case 42:
case 43:
case 44:
case 45:
case 46:
this.setU (atom, 6, 0);
this.setU (atom, (this.propertyOf[i] - 41) % 6, this.parseFloatStr (this.field));
break;
case 60:
subid = this.field;
break;
case 61:
if (this.modulated) siteMult = this.parseIntStr (this.field);
}
}
if (isAnisoData) continue;
if (Float.isNaN (atom.x) || Float.isNaN (atom.y) || Float.isNaN (atom.z)) {
J.util.Logger.warn ("atom " + atom.atomName + " has invalid/unknown coordinates");
continue;
}if (!this.filterCIFAtom (atom, iAtom, assemblyId)) continue;
this.setAtomCoord (atom);
if (this.pr != null && !this.pr.checkAtom (atom, assemblyId, this.atomCount)) continue;
if (atom.elementSymbol == null && atom.atomName != null) {
var sym = atom.atomName;
var pt = 0;
while (pt < sym.length && Character.isLetter (sym.charAt (pt))) pt++;

atom.elementSymbol = (pt == 0 || pt > 2 ? "Xx" : sym.substring (0, pt));
}this.atomSetCollection.addAtomWithMappedName (atom);
this.atomCount++;
if (subid != null && this.modulated) this.mr.addSubsystem (subid, null, atom.atomName);
if (siteMult != 0) atom.vib = JU.V3.new3 (siteMult, 0, NaN);
}
if (this.isPDB) this.setIsPDB ();
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isCIF", Boolean.TRUE);
if (this.isPDBX && this.skipping) this.skipping = false;
return true;
}, "~B");
$_M(c$, "filterCIFAtom", 
function (atom, iAtom, assemblyId) {
if (!this.filterAtom (atom, iAtom)) return false;
if (this.filterAssembly && this.filterReject (this.filter, "$", assemblyId)) return false;
if (this.configurationPtr > 0) {
if (!this.disorderAssembly.equals (this.lastDisorderAssembly)) {
this.lastDisorderAssembly = this.disorderAssembly;
this.lastAltLoc = '\0';
this.conformationIndex = this.configurationPtr;
}if (atom.alternateLocationID != '\0') {
if (this.conformationIndex >= 0 && atom.alternateLocationID != this.lastAltLoc) {
this.lastAltLoc = atom.alternateLocationID;
this.conformationIndex--;
}if (this.conformationIndex != 0) {
J.util.Logger.info ("ignoring " + atom.atomName);
return false;
}}}return true;
}, "J.adapter.smarter.Atom,~N,~S");
$_M(c$, "processCitationListBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.citationFields);
var m =  Clazz.newFloatArray (16, 0);
m[15] = 1;
while (this.tokenizer.getData ()) {
for (var i = 0; i < this.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case 0:
break;
case 1:
this.appendLoadNote ("TITLE: " + this.tokenizer.toUnicode (this.field));
break;
}
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "processSymmetryOperationsLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.symmetryOperationsFields);
var nRefs = 0;
this.symops =  new JU.List ();
for (var i = this.propertyCount; --i >= 0; ) if (this.fieldOf[i] != -1) nRefs++;

if (nRefs != 1) {
J.util.Logger.warn ("?que? _symmetry_equiv or _space_group_symop property not found");
this.skipLoop ();
return;
}var n = 0;
while (this.tokenizer.getData ()) {
var ssgop = false;
for (var i = 0; i < this.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case 2:
if (this.field.indexOf ('~') >= 0) this.field = JU.PT.simpleReplace (this.field, "~", "");
case 3:
this.modulated = true;
ssgop = true;
case 0:
case 1:
if (this.allowRotations || ++n == 1) if (!this.modulated || ssgop) {
this.symops.addLast (this.field);
this.setSymmetryOperator (this.field);
}break;
}
}
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "getBondOrder", 
function (field) {
switch (field.charAt (0)) {
default:
J.util.Logger.warn ("unknown CIF bond order: " + field);
case 'S':
return 1;
case 'D':
return 2;
case 'T':
return 3;
case 'A':
this.haveAromatic = true;
return 515;
}
}, "~S");
$_M(c$, "processGeomBondLoopBlock", 
($fz = function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.geomBondFields);
for (var i = this.propertyCount; --i >= 0; ) if (this.propertyOf[i] != 3 && this.fieldOf[i] == -1) {
J.util.Logger.warn ("?que? missing property: " + J.adapter.readers.cif.CifReader.geomBondFields[i]);
this.skipLoop ();
return;
}
var name1 = null;
var name2 = null;
var order = Integer.$valueOf (1);
while (this.tokenizer.getData ()) {
var atomIndex1 = -1;
var atomIndex2 = -1;
var distance = 0;
var dx = 0;
for (var i = 0; i < this.tokenizer.fieldCount; ++i) {
switch (this.fieldProperty (i)) {
case -1:
break;
case 0:
atomIndex1 = this.atomSetCollection.getAtomIndexFromName (name1 = this.field);
break;
case 1:
atomIndex2 = this.atomSetCollection.getAtomIndexFromName (name2 = this.field);
break;
case 2:
distance = this.parseFloatStr (this.field);
var pt = this.field.indexOf ('(');
if (pt >= 0) {
var data = this.field.toCharArray ();
var sdx = this.field.substring (pt + 1, this.field.length - 1);
var n = sdx.length;
for (var j = pt; --j >= 0; ) {
if (data[j] == '.') --j;
data[j] = (--n < 0 ? '0' : sdx.charAt (n));
}
dx = this.parseFloatStr (String.valueOf (data));
if (Float.isNaN (dx)) {
J.util.Logger.info ("error reading uncertainty for " + this.line);
dx = 0.015;
}} else {
dx = 0.015;
}break;
case 3:
order = Integer.$valueOf (this.getBondOrder (this.field));
break;
}
}
if (atomIndex1 < 0 || atomIndex2 < 0) continue;
if (distance > 0) this.bondTypes.addLast ([name1, name2, Float.$valueOf (distance), Float.$valueOf (dx), order]);
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "setBondingAndMolecules", 
($fz = function () {
J.util.Logger.info ("CIF creating molecule " + (this.bondTypes.size () > 0 ? " using GEOM_BOND records" : ""));
this.atoms = this.atomSetCollection.getAtoms ();
this.firstAtom = this.atomSetCollection.getLastAtomSetAtomIndex ();
var nAtoms = this.atomSetCollection.getLastAtomSetAtomCount ();
this.atomCount = this.firstAtom + nAtoms;
this.bsSets =  new Array (nAtoms);
this.symmetry = this.atomSetCollection.getSymmetry ();
for (var i = this.firstAtom; i < this.atomCount; i++) {
var ipt = this.atomSetCollection.getAtomIndexFromName (this.atoms[i].atomName) - this.firstAtom;
if (this.bsSets[ipt] == null) this.bsSets[ipt] =  new JU.BS ();
this.bsSets[ipt].set (i - this.firstAtom);
}
if (this.isMolecular) {
this.atomRadius =  Clazz.newFloatArray (this.atomCount, 0);
for (var i = this.firstAtom; i < this.atomCount; i++) {
var elemnoWithIsotope = J.api.JmolAdapter.getElementNumber (this.atoms[i].getElementSymbol ());
this.atoms[i].elementNumber = elemnoWithIsotope;
var charge = (this.atoms[i].formalCharge == -2147483648 ? 0 : this.atoms[i].formalCharge);
if (elemnoWithIsotope > 0) this.atomRadius[i] = J.api.JmolAdapter.getBondingRadiusFloat (elemnoWithIsotope, charge);
}
this.bsConnected =  new Array (this.atomCount);
for (var i = this.firstAtom; i < this.atomCount; i++) this.bsConnected[i] =  new JU.BS ();

this.bsMolecule =  new JU.BS ();
this.bsExclude =  new JU.BS ();
}var isFirst = true;
while (this.createBonds (isFirst)) {
isFirst = false;
}
if (this.isMolecular) {
if (this.atomSetCollection.bsAtoms == null) this.atomSetCollection.bsAtoms =  new JU.BS ();
this.atomSetCollection.bsAtoms.clearBits (this.firstAtom, this.atomCount);
this.atomSetCollection.bsAtoms.or (this.bsMolecule);
this.atomSetCollection.bsAtoms.andNot (this.bsExclude);
for (var i = this.firstAtom; i < this.atomCount; i++) {
if (this.atomSetCollection.bsAtoms.get (i)) this.symmetry.toCartesian (this.atoms[i], true);
 else if (J.util.Logger.debugging) J.util.Logger.debug (this.molecularType + " removing " + i + " " + this.atoms[i].atomName + " " + this.atoms[i]);
}
this.atomSetCollection.setAtomSetAuxiliaryInfo ("notionalUnitcell", null);
if (this.nMolecular++ == this.atomSetCollection.getCurrentAtomSetIndex ()) {
this.atomSetCollection.clearGlobalBoolean (0);
this.atomSetCollection.clearGlobalBoolean (1);
this.atomSetCollection.clearGlobalBoolean (2);
}}if (this.bondTypes.size () > 0) this.atomSetCollection.setAtomSetAuxiliaryInfo ("hasBonds", Boolean.TRUE);
this.bondTypes.clear ();
this.atomRadius = null;
this.bsSets = null;
this.bsConnected = null;
this.bsMolecule = null;
this.bsExclude = null;
}, $fz.isPrivate = true, $fz));
$_M(c$, "createBonds", 
($fz = function (doInit) {
for (var i = this.bondTypes.size (); --i >= 0; ) {
var o = this.bondTypes.get (i);
var distance = (o[2]).floatValue ();
var dx = (o[3]).floatValue ();
var order = (o[4]).intValue ();
var iatom1 = this.atomSetCollection.getAtomIndexFromName (o[0]);
var iatom2 = this.atomSetCollection.getAtomIndexFromName (o[1]);
var bs1 = this.bsSets[iatom1 - this.firstAtom];
var bs2 = this.bsSets[iatom2 - this.firstAtom];
if (bs1 == null || bs2 == null) continue;
for (var j = bs1.nextSetBit (0); j >= 0; j = bs1.nextSetBit (j + 1)) for (var k = bs2.nextSetBit (0); k >= 0; k = bs2.nextSetBit (k + 1)) {
if ((!this.isMolecular || !this.bsConnected[j + this.firstAtom].get (k)) && this.symmetry.checkDistance (this.atoms[j + this.firstAtom], this.atoms[k + this.firstAtom], distance, dx, 0, 0, 0, this.ptOffset)) this.addNewBond (j + this.firstAtom, k + this.firstAtom, order);
}

}
if (this.bondTypes.size () > 0) for (var i = this.firstAtom; i < this.atomCount; i++) if (this.atoms[i].elementNumber == 1) {
var checkAltLoc = (this.atoms[i].alternateLocationID != '\0');
for (var k = this.firstAtom; k < this.atomCount; k++) if (k != i && this.atoms[k].elementNumber != 1 && (!checkAltLoc || this.atoms[k].alternateLocationID == '\0' || this.atoms[k].alternateLocationID == this.atoms[i].alternateLocationID)) {
if (!this.bsConnected[i].get (k) && this.symmetry.checkDistance (this.atoms[i], this.atoms[k], 1.1, 0, 0, 0, 0, this.ptOffset)) this.addNewBond (i, k, 1);
}
}
if (!this.isMolecular) return false;
if (doInit) for (var i = this.firstAtom; i < this.atomCount; i++) if (this.atoms[i].atomSite + this.firstAtom == i && !this.bsMolecule.get (i)) this.setBs (this.atoms, i, this.bsConnected, this.bsMolecule);

var bondTolerance = this.viewer.getFloat (570425348);
var bsBranch =  new JU.BS ();
var cart1 =  new JU.P3 ();
var cart2 =  new JU.P3 ();
var nFactor = 2;
for (var i = this.firstAtom; i < this.atomCount; i++) if (!this.bsMolecule.get (i) && !this.bsExclude.get (i)) for (var j = this.bsMolecule.nextSetBit (0); j >= 0; j = this.bsMolecule.nextSetBit (j + 1)) if (this.symmetry.checkDistance (this.atoms[j], this.atoms[i], this.atomRadius[i] + this.atomRadius[j] + bondTolerance, 0, nFactor, nFactor, nFactor, this.ptOffset)) {
this.setBs (this.atoms, i, this.bsConnected, bsBranch);
for (var k = bsBranch.nextSetBit (0); k >= 0; k = bsBranch.nextSetBit (k + 1)) {
this.atoms[k].add (this.ptOffset);
cart1.setT (this.atoms[k]);
this.symmetry.toCartesian (cart1, true);
var bs = this.bsSets[this.atomSetCollection.getAtomIndexFromName (this.atoms[k].atomName) - this.firstAtom];
if (bs != null) for (var ii = bs.nextSetBit (0); ii >= 0; ii = bs.nextSetBit (ii + 1)) {
if (ii + this.firstAtom == k) continue;
cart2.setT (this.atoms[ii + this.firstAtom]);
this.symmetry.toCartesian (cart2, true);
if (cart2.distance (cart1) < 0.1) {
this.bsExclude.set (k);
break;
}}
this.bsMolecule.set (k);
}
return true;
}

return false;
}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "addNewBond", 
($fz = function (i, j, order) {
this.atomSetCollection.addNewBondWithOrder (i, j, order);
if (!this.isMolecular) return;
this.bsConnected[i].set (j);
this.bsConnected[j].set (i);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
$_M(c$, "setBs", 
($fz = function (atoms, iatom, bsBonds, bs) {
var bsBond = bsBonds[iatom];
bs.set (iatom);
for (var i = bsBond.nextSetBit (0); i >= 0; i = bsBond.nextSetBit (i + 1)) {
if (!bs.get (i)) this.setBs (atoms, i, bsBonds, bs);
}
}, $fz.isPrivate = true, $fz), "~A,~N,~A,JU.BS");
Clazz.defineStatics (c$,
"TransformFields", ["x[1][1]", "x[1][2]", "x[1][3]", "r[1]", "x[2][1]", "x[2][2]", "x[2][3]", "r[2]", "x[3][1]", "x[3][2]", "x[3][3]", "r[3]"]);
c$.htFields = c$.prototype.htFields =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"ATOM_TYPE_SYMBOL", 0,
"ATOM_TYPE_OXIDATION_NUMBER", 1,
"atomTypeFields", ["_atom_type_symbol", "_atom_type_oxidation_number"],
"NONE", -1,
"TYPE_SYMBOL", 0,
"LABEL", 1,
"AUTH_ATOM", 2,
"FRACT_X", 3,
"FRACT_Y", 4,
"FRACT_Z", 5,
"CARTN_X", 6,
"CARTN_Y", 7,
"CARTN_Z", 8,
"OCCUPANCY", 9,
"B_ISO", 10,
"COMP_ID", 11,
"AUTH_ASYM_ID", 12,
"SEQ_ID", 13,
"INS_CODE", 14,
"ALT_ID", 15,
"GROUP_PDB", 16,
"MODEL_NO", 17,
"DUMMY_ATOM", 18,
"DISORDER_GROUP", 19,
"ANISO_LABEL", 20,
"ANISO_MMCIF_ID", 21,
"ANISO_U11", 22,
"ANISO_U22", 23,
"ANISO_U33", 24,
"ANISO_U12", 25,
"ANISO_U13", 26,
"ANISO_U23", 27,
"ANISO_MMCIF_U11", 28,
"ANISO_MMCIF_U22", 29,
"ANISO_MMCIF_U33", 30,
"ANISO_MMCIF_U12", 31,
"ANISO_MMCIF_U13", 32,
"ANISO_MMCIF_U23", 33,
"U_ISO_OR_EQUIV", 34,
"ANISO_B11", 35,
"ANISO_B22", 36,
"ANISO_B33", 37,
"ANISO_B12", 38,
"ANISO_B13", 39,
"ANISO_B23", 40,
"ANISO_BETA_11", 41,
"ANISO_BETA_22", 42,
"ANISO_BETA_33", 43,
"ANISO_BETA_12", 44,
"ANISO_BETA_13", 45,
"ANISO_BETA_23", 46,
"ADP_TYPE", 47,
"CHEM_COMP_AC_ID", 48,
"CHEM_COMP_AC_NAME", 49,
"CHEM_COMP_AC_SYM", 50,
"CHEM_COMP_AC_CHARGE", 51,
"CHEM_COMP_AC_X", 52,
"CHEM_COMP_AC_Y", 53,
"CHEM_COMP_AC_Z", 54,
"CHEM_COMP_AC_X_IDEAL", 55,
"CHEM_COMP_AC_Y_IDEAL", 56,
"CHEM_COMP_AC_Z_IDEAL", 57,
"DISORDER_ASSEMBLY", 58,
"ASYM_ID", 59,
"SUBSYS_ID", 60,
"SITE_MULT", 61,
"THERMAL_TYPE", 62,
"atomFields", ["_atom_site_type_symbol", "_atom_site_label", "_atom_site_auth_atom_id", "_atom_site_fract_x", "_atom_site_fract_y", "_atom_site_fract_z", "_atom_site_cartn_x", "_atom_site_cartn_y", "_atom_site_cartn_z", "_atom_site_occupancy", "_atom_site_b_iso_or_equiv", "_atom_site_auth_comp_id", "_atom_site_auth_asym_id", "_atom_site_auth_seq_id", "_atom_site_pdbx_pdb_ins_code", "_atom_site_label_alt_id", "_atom_site_group_pdb", "_atom_site_pdbx_pdb_model_num", "_atom_site_calc_flag", "_atom_site_disorder_group", "_atom_site_aniso_label", "_atom_site_anisotrop_id", "_atom_site_aniso_u_11", "_atom_site_aniso_u_22", "_atom_site_aniso_u_33", "_atom_site_aniso_u_12", "_atom_site_aniso_u_13", "_atom_site_aniso_u_23", "_atom_site_anisotrop_u[1][1]", "_atom_site_anisotrop_u[2][2]", "_atom_site_anisotrop_u[3][3]", "_atom_site_anisotrop_u[1][2]", "_atom_site_anisotrop_u[1][3]", "_atom_site_anisotrop_u[2][3]", "_atom_site_u_iso_or_equiv", "_atom_site_aniso_b_11", "_atom_site_aniso_b_22", "_atom_site_aniso_b_33", "_atom_site_aniso_b_12", "_atom_site_aniso_b_13", "_atom_site_aniso_b_23", "_atom_site_aniso_beta_11", "_atom_site_aniso_beta_22", "_atom_site_aniso_beta_33", "_atom_site_aniso_beta_12", "_atom_site_aniso_beta_13", "_atom_site_aniso_beta_23", "_atom_site_adp_type", "_chem_comp_atom_comp_id", "_chem_comp_atom_atom_id", "_chem_comp_atom_type_symbol", "_chem_comp_atom_charge", "_chem_comp_atom_model_cartn_x", "_chem_comp_atom_model_cartn_y", "_chem_comp_atom_model_cartn_z", "_chem_comp_atom_pdbx_model_cartn_x_ideal", "_chem_comp_atom_pdbx_model_cartn_y_ideal", "_chem_comp_atom_pdbx_model_cartn_z_ideal", "_atom_site_disorder_assembly", "_atom_site_label_asym_id", "_atom_site_subsystem_code", "_atom_site_symmetry_multiplicity", "_atom_site_thermal_displace_type"],
"CITATION_ID", 0,
"CITATION_TITLE", 1,
"citationFields", ["_citation_id", "_citation_title"],
"SYMOP_XYZ", 0,
"SYM_EQUIV_XYZ", 1,
"SYM_SSG_XYZ", 2,
"SYM_SSG_OP", 3,
"symmetryOperationsFields", ["_space_group_symop_operation_xyz", "_symmetry_equiv_pos_as_xyz", "_symmetry_ssg_equiv_pos_as_xyz", "_space_group_symop_ssg_operation_algebraic"],
"GEOM_BOND_ATOM_SITE_LABEL_1", 0,
"GEOM_BOND_ATOM_SITE_LABEL_2", 1,
"GEOM_BOND_DISTANCE", 2,
"CCDC_GEOM_BOND_TYPE", 3,
"geomBondFields", ["_geom_bond_atom_site_label_1", "_geom_bond_atom_site_label_2", "_geom_bond_distance", "_ccdc_geom_bond_type"]);
});
