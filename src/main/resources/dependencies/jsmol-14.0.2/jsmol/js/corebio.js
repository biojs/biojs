(function(Clazz
,$_A
,$_Ab
,$_AB
,$_AC
,$_AD
,$_AF
,$_AI
,$_AL
,$_AS
,$_B
,$_C
,$_D
,$_E
,$_F
,$_G
,$_H
,$_I
,$_J
,$_K
,$_k
,$_L
,$_M
,$_N
,$_O
,$_P
,$_Q
,$_R
,$_S
,$_s
,$_T
,$_U
,$_V
,$_W
,$_X
,$_Y
,$_Z
,Clazz_doubleToInt
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_supportsNativeObject
,Clazz_extendedObjectMethods
,Clazz_callingStackTraces
,Clazz_clone
,Clazz_doubleToShort
,Clazz_innerFunctions
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
){
var $t$;
//var c$;
Clazz_declarePackage ("J.adapter.readers.pdb");
Clazz_load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable"], "J.adapter.readers.pdb.PdbReader", ["java.lang.Boolean", "$.Character", "$.Float", "JU.List", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.api.Interface", "$.JmolAdapter", "J.constant.EnumStructure", "J.util.Escape", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.serMode = 0;
this.seqMode = 0;
this.serial = 0;
this.lineLength = 0;
this.pdbHeader = null;
this.applySymmetry = false;
this.getTlsGroups = false;
this.isMultiModel = false;
this.haveMappedSerials = false;
this.isConnectStateBug = false;
this.isLegacyModelType = false;
this.gromacsWideFormat = false;
this.isPQR = false;
this.htFormul = null;
this.htHetero = null;
this.htSites = null;
this.htElementsInCurrentGroup = null;
this.htMolIds = null;
this.vCompnds = null;
this.thisBiomolecule = null;
this.vBiomolecules = null;
this.vTlsModels = null;
this.sbTlsErrors = null;
this.chainAtomCounts = null;
this.sbIgnored = null;
this.sbSelected = null;
this.sbConect = null;
this.sb = null;
this.atomCount = 0;
this.maxSerial = 0;
this.nUNK = 0;
this.nRes = 0;
this.currentCompnd = null;
this.currentGroup3 = null;
this.currentKey = null;
this.currentResno = -2147483648;
this.configurationPtr = -2147483648;
this.resetKey = true;
this.$compnd = null;
this.conformationIndex = 0;
this.fileAtomIndex = 0;
this.lastAltLoc = '\0';
this.lastAtomData = null;
this.lastAtomIndex = 0;
this.lastGroup = -2147483648;
this.lastInsertion = '\0';
this.lastSourceSerial = -2147483648;
this.lastTargetSerial = -2147483648;
this.tlsGroupID = 0;
this.atomTypePt0 = 0;
this.atomTypeLen = 0;
this.byChain = false;
this.bySymop = false;
this.isCourseGrained = false;
this.haveDoubleBonds = false;
this.dataT = null;
this.tlsU = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pdb, "PdbReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz_prepareFields (c$, function () {
this.htFormul =  new java.util.Hashtable ();
this.dataT =  Clazz_newFloatArray (8, 0);
});
$_V(c$, "initializeReader", 
function () {
this.setIsPDB ();
this.pdbHeader = (this.getHeader ?  new JU.SB () : null);
this.applySymmetry = !this.checkFilterKey ("NOSYMMETRY");
this.getTlsGroups = this.checkFilterKey ("TLS");
this.byChain = this.checkFilterKey ("BYCHAIN");
this.bySymop = this.checkFilterKey ("BYSYMOP");
this.isCourseGrained = this.byChain || this.bySymop;
if (this.checkFilterKey ("ASSEMBLY")) this.filter = JU.PT.simpleReplace (this.filter, "ASSEMBLY", "BIOMOLECULE");
if (this.htParams.containsKey ("vTlsModels")) {
this.vTlsModels = this.htParams.remove ("vTlsModels");
}var s = this.getFilter ("TYPE ");
if (s != null) {
var tokens = JU.PT.getTokens (s.$replace (',', ' '));
this.atomTypePt0 = Integer.parseInt (tokens[0]) - 1;
var pt = tokens[1].indexOf ("=");
if (pt >= 0) {
this.setFilterAtomTypeStr (tokens[1].substring (pt + 1).toUpperCase ());
} else {
pt = tokens[1].length;
}this.atomTypeLen = Integer.parseInt (tokens[1].substring (0, pt));
}var conf = this.getFilter ("CONF ");
if (conf != null) {
this.configurationPtr = this.parseIntStr (conf);
this.sbIgnored =  new JU.SB ();
this.sbSelected =  new JU.SB ();
}this.isLegacyModelType = (this.stateScriptVersionInt < 120000);
this.isConnectStateBug = (this.stateScriptVersionInt >= 120151 && this.stateScriptVersionInt <= 120220 || this.stateScriptVersionInt >= 120300 && this.stateScriptVersionInt <= 120320);
});
$_V(c$, "checkLine", 
function () {
var ptOption = ((this.lineLength = this.line.length) < 6 ? -1 : "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   ".indexOf (this.line.substring (0, 6))) >> 3;
var isAtom = (ptOption == 0 || ptOption == 1);
var isModel = (ptOption == 2);
this.serial = (isAtom ? this.getSerial (6, 11) : 0);
var isNewModel = ((this.isTrajectory || this.isSequential) && !this.isMultiModel && isAtom && this.serial == 1);
if (this.getHeader) {
if (isAtom || isModel) this.getHeader = false;
 else this.pdbHeader.append (this.line).appendC ('\n');
}if (isModel || isNewModel) {
this.isMultiModel = isModel;
this.getHeader = false;
var modelNo = (isNewModel ? this.modelNumber + 1 : this.getModelNumber ());
this.modelNumber = (this.bsModels == null ? modelNo : this.modelNumber + 1);
if (!this.doGetModel (this.modelNumber, null)) {
this.handleTlsMissingModels ();
return this.checkLastModel ();
}this.atomSetCollection.connectAll (this.maxSerial, this.isConnectStateBug);
if (this.atomCount > 0) this.applySymmetryAndSetTrajectory ();
this.model (modelNo);
if (this.isLegacyModelType || !isAtom) return true;
}if (this.isMultiModel && !this.doProcessLines) return true;
if (isAtom) {
this.getHeader = false;
this.atom ();
return true;
}switch (ptOption) {
case 3:
this.conect ();
return true;
case 4:
case 5:
case 6:
this.structure ();
return true;
case 7:
this.het ();
return true;
case 8:
this.hetnam ();
return true;
case 9:
this.anisou ();
return true;
case 10:
this.site ();
return true;
case 11:
this.cryst1 ();
return true;
case 12:
case 13:
case 14:
this.scale (ptOption - 11);
return true;
case 15:
this.expdta ();
return true;
case 16:
this.formul ();
return true;
case 17:
if (this.line.contains ("The B-factors in this file hold atomic radii")) {
this.isPQR = true;
return true;
}if (this.line.contains ("This file does not adhere to the PDB standard")) {
this.gromacsWideFormat = true;
return true;
}if (this.line.startsWith ("REMARK 350")) {
this.remark350 ();
return false;
}if (this.line.startsWith ("REMARK 290")) {
this.remark290 ();
return false;
}if (this.getTlsGroups) {
if (this.line.indexOf ("TLS DETAILS") > 0) return this.remarkTls ();
}this.checkCurrentLineForScript ();
return true;
case 18:
this.header ();
return true;
case 19:
case 20:
this.compnd (ptOption == 20);
return true;
case 21:
this.title ();
return true;
}
return true;
});
$_V(c$, "finalizeReader", 
function () {
this.finalizeReaderPDB ();
});
$_M(c$, "finalizeReaderPDB", 
function () {
this.checkNotPDB ();
this.atomSetCollection.connectAll (this.maxSerial, this.isConnectStateBug);
var symmetry;
if (this.vBiomolecules != null && this.vBiomolecules.size () > 0 && this.atomSetCollection.getAtomCount () > 0) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("biomolecules", this.vBiomolecules);
this.setBiomoleculeAtomCounts ();
if (this.thisBiomolecule != null && this.applySymmetry) {
this.atomSetCollection.applySymmetryBio (this.thisBiomolecule, this.notionalUnitCell, this.applySymmetryToBonds, this.filter);
this.vTlsModels = null;
}}if (this.vTlsModels != null) {
symmetry = J.api.Interface.getOptionInterface ("symmetry.Symmetry");
var n = this.atomSetCollection.getAtomSetCount ();
if (n == this.vTlsModels.size ()) {
for (var i = n; --i >= 0; ) this.setTlsGroups (i, i, symmetry);

} else {
J.util.Logger.info (n + " models but " + this.vTlsModels.size () + " TLS descriptions");
if (this.vTlsModels.size () == 1) {
J.util.Logger.info (" -- assuming all models have the same TLS description -- check REMARK 3 for details.");
for (var i = n; --i >= 0; ) this.setTlsGroups (0, i, symmetry);

}}this.checkForResidualBFactors (symmetry);
}if (this.sbTlsErrors != null) {
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("tlsErrors", this.sbTlsErrors.toString ());
this.appendLoadNote (this.sbTlsErrors.toString ());
}this.finalizeReaderASCR ();
if (this.vCompnds != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("compoundSource", this.vCompnds);
if (this.htSites != null) {
this.addSites (this.htSites);
}if (this.pdbHeader != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("fileHeader", this.pdbHeader.toString ());
if (this.configurationPtr > 0) {
J.util.Logger.info (this.sbSelected.toString ());
J.util.Logger.info (this.sbIgnored.toString ());
}});
$_M(c$, "checkForResidualBFactors", 
function (symmetry) {
var atoms = this.atomSetCollection.getAtoms ();
var isResidual = false;
for (var i = this.atomSetCollection.getAtomCount (); --i >= 0; ) {
var anisou = this.tlsU.get (atoms[i]);
if (anisou == null) continue;
var resid = anisou[7] - (anisou[0] + anisou[1] + anisou[2]) / 3;
if (resid < 0 || Float.isNaN (resid)) {
isResidual = true;
break;
}}
J.util.Logger.info ("TLS analysis suggests Bfactors are " + (isResidual ? "" : "NOT") + " residuals");
for (var entry, $entry = this.tlsU.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var anisou = entry.getValue ();
var resid = anisou[7];
if (resid == 0) continue;
if (!isResidual) resid -= (anisou[0] + anisou[1] + anisou[2]) / 3;
anisou[0] += resid;
anisou[1] += resid;
anisou[2] += resid;
entry.getKey ().addTensor (symmetry.getTensor (anisou).setType (null), "TLS-R", false);
System.out.println ("TLS-U:  " + J.util.Escape.eAF (anisou));
anisou = (entry.getKey ().anisoBorU);
if (anisou != null) System.out.println ("ANISOU: " + J.util.Escape.eAF (anisou));
}
this.tlsU = null;
}, "J.api.SymmetryInterface");
$_M(c$, "header", 
function () {
if (this.lineLength < 8) return;
this.appendLoadNote (this.line.substring (7).trim ());
var pdbID = (this.lineLength >= 66 ? this.line.substring (62, 66).trim () : "");
if (pdbID.length == 4) {
this.atomSetCollection.setCollectionName (pdbID);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("havePDBHeaderName", Boolean.TRUE);
}if (this.lineLength > 50) this.line = this.line.substring (0, 50);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("CLASSIFICATION", this.line.substring (7).trim ());
});
$_M(c$, "title", 
function () {
if (this.lineLength < 10) return;
this.appendLoadNote (this.line.substring (10).trim ());
});
$_M(c$, "compnd", 
function (isSource) {
if (!isSource) {
if (this.$compnd == null) this.$compnd = "";
 else this.$compnd += " ";
var s = this.line;
if (this.lineLength > 62) s = s.substring (0, 62);
this.$compnd += s.substring (10).trim ();
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("COMPND", this.$compnd);
}if (this.vCompnds == null) {
if (isSource) return;
this.vCompnds =  new JU.List ();
this.htMolIds =  new java.util.Hashtable ();
this.currentCompnd =  new java.util.Hashtable ();
this.currentCompnd.put ("select", "(*)");
this.currentKey = "MOLECULE";
this.htMolIds.put ("", this.currentCompnd);
}if (isSource && this.resetKey) {
this.resetKey = false;
this.currentKey = "SOURCE";
this.currentCompnd = this.htMolIds.get ("");
}this.line = this.line.substring (10, Math.min (this.lineLength, 72)).trim ();
var pt = this.line.indexOf (":");
if (pt < 0 || pt > 0 && this.line.charAt (pt - 1) == '\\') pt = this.line.length;
var key = this.line.substring (0, pt).trim ();
var value = (pt < this.line.length ? this.line.substring (pt + 1) : null);
if (key.equals ("MOL_ID")) {
if (value == null) return;
if (isSource) {
this.currentCompnd = this.htMolIds.remove (value);
return;
}this.currentCompnd =  new java.util.Hashtable ();
this.vCompnds.addLast (this.currentCompnd);
this.htMolIds.put (value, this.currentCompnd);
}if (this.currentCompnd == null) return;
if (value == null) {
value = this.currentCompnd.get (this.currentKey);
if (value == null) value = "";
value += key;
if (this.vCompnds.size () == 0) this.vCompnds.addLast (this.currentCompnd);
} else {
this.currentKey = key;
}if (value.endsWith (";")) value = value.substring (0, value.length - 1);
this.currentCompnd.put (this.currentKey, value);
if (this.currentKey.equals ("CHAIN")) this.currentCompnd.put ("select", "(:" + JU.PT.simpleReplace (JU.PT.simpleReplace (value, ", ", ",:"), " ", "") + ")");
}, "~B");
$_M(c$, "setBiomoleculeAtomCounts", 
function () {
for (var i = this.vBiomolecules.size (); --i >= 0; ) {
var biomolecule = this.vBiomolecules.get (i);
var chain = biomolecule.get ("chains");
var nTransforms = (biomolecule.get ("biomts")).size ();
var nAtoms = 0;
for (var j = chain.length - 1; --j >= 0; ) if (chain.charAt (j) == ':') nAtoms += this.chainAtomCounts[chain.charCodeAt (j + 1)];

biomolecule.put ("atomCount", Integer.$valueOf (nAtoms * nTransforms));
}
});
$_M(c$, "remark350", 
function () {
var biomts = null;
this.vBiomolecules =  new JU.List ();
this.chainAtomCounts =  Clazz_newIntArray (255, 0);
var title = "";
var chainlist = "";
var id = "";
var needLine = true;
var info = null;
var nBiomt = 0;
var mIdent = JU.M4.newM (null);
while (true) {
if (needLine) this.readLine ();
 else needLine = true;
if (this.line == null || !this.line.startsWith ("REMARK 350")) break;
try {
if (this.line.startsWith ("REMARK 350 BIOMOLECULE:")) {
if (nBiomt > 0) J.util.Logger.info ("biomolecule " + id + ": number of transforms: " + nBiomt);
info =  new java.util.Hashtable ();
biomts =  new JU.List ();
id = this.line.substring (this.line.indexOf (":") + 1).trim ();
title = this.line.trim ();
info.put ("name", "biomolecule " + id);
info.put ("molecule", id.length == 3 ? id : Integer.$valueOf (this.parseIntStr (id)));
info.put ("title", title);
info.put ("chains", "");
info.put ("biomts", biomts);
this.vBiomolecules.addLast (info);
nBiomt = 0;
}if (this.line.indexOf ("APPLY THE FOLLOWING TO CHAINS:") >= 0) {
if (info == null) {
needLine = false;
this.line = "REMARK 350 BIOMOLECULE: 1  APPLY THE FOLLOWING TO CHAINS:";
continue;
}var list = this.line.substring (41).trim ();
this.appendLoadNote ("found biomolecule " + id + ": " + list);
chainlist = ":" + list.$replace (' ', ':');
needLine = false;
while (this.readLine () != null && this.line.indexOf ("BIOMT") < 0 && this.line.indexOf ("350") == 7) chainlist += ":" + this.line.substring (11).trim ().$replace (' ', ':');

if (this.checkFilterKey ("BIOMOLECULE " + id + ";")) {
this.setFilter (this.filter.$replace (':', '_') + chainlist);
J.util.Logger.info ("filter set to \"" + this.filter + "\"");
this.thisBiomolecule = info;
}info.put ("chains", chainlist);
continue;
}if (this.line.startsWith ("REMARK 350   BIOMT1 ")) {
nBiomt++;
var mat =  Clazz_newFloatArray (16, 0);
for (var i = 0; i < 12; ) {
var tokens = this.getTokens ();
mat[i++] = this.parseFloatStr (tokens[4]);
mat[i++] = this.parseFloatStr (tokens[5]);
mat[i++] = this.parseFloatStr (tokens[6]);
mat[i++] = this.parseFloatStr (tokens[7]);
if (i == 4 || i == 8) this.readLine ();
}
mat[15] = 1;
var m4 =  new JU.M4 ();
m4.setA (mat, 0);
if (m4.equals (mIdent)) biomts.add (0, m4);
 else biomts.addLast (m4);
continue;
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.thisBiomolecule = null;
this.vBiomolecules = null;
return;
} else {
throw e;
}
}
}
if (nBiomt > 0) J.util.Logger.info ("biomolecule " + id + ": number of transforms: " + nBiomt);
});
$_M(c$, "remark290", 
function () {
while (this.readLine () != null && this.line.startsWith ("REMARK 290")) {
if (this.line.indexOf ("NNNMMM   OPERATOR") >= 0) {
while (this.readLine () != null) {
var tokens = this.getTokens ();
if (tokens.length < 4) break;
this.setSymmetryOperator (tokens[3]);
}
}}
});
$_M(c$, "getSerial", 
function (i, j) {
var c = this.line.charAt (i);
var isBase10 = (c == ' ' || this.line.charAt (j - 1) == ' ');
switch (this.serMode) {
default:
case 0:
if (isBase10) return this.parseIntRange (this.line, i, j);
try {
return this.serial = Integer.parseInt (this.line.substring (i, j));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.serMode = (Character.isDigit (c) ? 1 : 2);
return this.getSerial (i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || Character.isDigit (c) ? this.parseIntRange (this.line, i, j) : JU.PT.parseIntRadix (this.line.substring (i, j), 36) + (Character.isUpperCase (c) ? -16696160 : 26973856));
case 1:
if (!isBase10) return this.serial = JU.PT.parseIntRadix (this.line.substring (i, j), 16);
this.serMode = 0;
return this.getSerial (i, j);
}
}, "~N,~N");
$_M(c$, "getSeqNo", 
function (i, j) {
var c = this.line.charAt (i);
var isBase10 = (c == ' ' || this.line.charAt (j - 1) == ' ');
switch (this.seqMode) {
default:
case 0:
if (isBase10) return this.parseIntRange (this.line, i, j);
try {
return Integer.parseInt (this.line.substring (i, j));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.seqMode = (Character.isDigit (c) ? 1 : 2);
return this.getSeqNo (i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || Character.isDigit (c) ? this.parseIntRange (this.line, i, j) : JU.PT.parseIntRadix (this.line.substring (i, j), 36) + (Character.isUpperCase (c) ? -456560 : 756496));
case 1:
if (!isBase10) return JU.PT.parseIntRadix (this.line.substring (i, j), 16);
this.seqMode = 0;
return this.getSeqNo (i, j);
}
}, "~N,~N");
$_M(c$, "processAtom", 
function (atom, name, altID, group3, chain, seqNo, insCode, isHetero, sym) {
atom.atomName = name;
var ch = altID;
if (ch != ' ') atom.alternateLocationID = ch;
atom.group3 = group3;
ch = chain < 256 ? String.fromCharCode (chain) : 0;
if (this.chainAtomCounts != null) this.chainAtomCounts[ch.charCodeAt (0)]++;
this.setChainID (atom, ch);
atom.sequenceNumber = seqNo;
atom.insertionCode = J.api.JmolAdapter.canonizeInsertionCode (insCode);
atom.isHetero = isHetero;
atom.elementSymbol = sym;
return atom;
}, "J.adapter.smarter.Atom,~S,~S,~S,~N,~N,~S,~B,~S");
$_M(c$, "processAtom2", 
function (atom, serial, x, y, z, charge) {
atom.atomSerial = serial;
if (serial > this.maxSerial) this.maxSerial = serial;
if (atom.group3 == null) {
if (this.currentGroup3 != null) {
this.currentGroup3 = null;
this.currentResno = -2147483648;
this.htElementsInCurrentGroup = null;
}} else if (!atom.group3.equals (this.currentGroup3) || atom.sequenceNumber != this.currentResno) {
this.currentGroup3 = atom.group3;
this.currentResno = atom.sequenceNumber;
this.htElementsInCurrentGroup = this.htFormul.get (atom.group3);
this.nRes++;
if (atom.group3.equals ("UNK")) this.nUNK++;
}this.setAtomCoordXYZ (atom, x, y, z);
atom.formalCharge = charge;
this.setAdditionalAtomParameters (atom);
if (this.haveMappedSerials) this.atomSetCollection.addAtomWithMappedSerialNumber (atom);
 else this.atomSetCollection.addAtom (atom);
if (this.atomCount++ == 0) this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.TRUE);
if (atom.isHetero) {
if (this.htHetero != null) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("hetNames", this.htHetero);
this.htHetero = null;
}}}, "J.adapter.smarter.Atom,~N,~N,~N,~N,~N");
$_M(c$, "atom", 
function () {
var isHetero = this.line.startsWith ("HETATM");
var atom = this.processAtom ( new J.adapter.smarter.Atom (), this.line.substring (12, 16).trim (), this.line.charAt (16), this.parseTokenRange (this.line, 17, 20), this.line.charCodeAt (21), this.getSeqNo (22, 26), this.line.charAt (26), isHetero, this.deduceElementSymbol (isHetero));
if (this.atomTypeLen > 0) {
var s = this.line.substring (this.atomTypePt0, this.atomTypePt0 + this.atomTypeLen).trim ();
if (s.length > 0) atom.atomName += "\0" + s;
}if (!this.filterPDBAtom (atom, this.fileAtomIndex++)) return;
var charge = 0;
var x;
var y;
var z;
if (this.gromacsWideFormat) {
x = this.parseFloatRange (this.line, 30, 40);
y = this.parseFloatRange (this.line, 40, 50);
z = this.parseFloatRange (this.line, 50, 60);
} else {
if (this.lineLength >= 80) {
var chMagnitude = this.line.charAt (78);
var chSign = this.line.charAt (79);
if (chSign >= '0' && chSign <= '7') {
var chT = chSign;
chSign = chMagnitude;
chMagnitude = chT;
}if ((chSign == '+' || chSign == '-' || chSign == ' ') && chMagnitude >= '0' && chMagnitude <= '7') {
charge = chMagnitude.charCodeAt (0) - 48;
if (chSign == '-') charge = -charge;
}}x = this.parseFloatRange (this.line, 30, 38);
y = this.parseFloatRange (this.line, 38, 46);
z = this.parseFloatRange (this.line, 46, 54);
}this.processAtom2 (atom, this.serial, x, y, z, charge);
});
$_M(c$, "filterPDBAtom", 
function (atom, iAtom) {
if (!this.filterAtom (atom, iAtom)) return false;
if (this.configurationPtr > 0) {
if (atom.sequenceNumber != this.lastGroup || atom.insertionCode != this.lastInsertion) {
this.conformationIndex = this.configurationPtr - 1;
this.lastGroup = atom.sequenceNumber;
this.lastInsertion = atom.insertionCode;
this.lastAltLoc = '\0';
}if (atom.alternateLocationID != '\0') {
var msg = " atom [" + atom.group3 + "]" + atom.sequenceNumber + (atom.insertionCode == '\0' ? "" : "^" + atom.insertionCode) + (atom.chainID == 0 ? "" : ":" + this.viewer.getChainIDStr (atom.chainID)) + "." + atom.atomName + "%" + atom.alternateLocationID + "\n";
if (this.conformationIndex >= 0 && atom.alternateLocationID != this.lastAltLoc) {
this.lastAltLoc = atom.alternateLocationID;
this.conformationIndex--;
}if (this.conformationIndex < 0 && atom.alternateLocationID != this.lastAltLoc) {
this.sbIgnored.append ("ignoring").append (msg);
return false;
}this.sbSelected.append ("loading").append (msg);
}}return true;
}, "J.adapter.smarter.Atom,~N");
$_M(c$, "setAdditionalAtomParameters", 
function (atom) {
if (this.isPQR) {
if (this.gromacsWideFormat) {
atom.partialCharge = this.parseFloatRange (this.line, 60, 68);
atom.radius = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
var tokens = this.getTokens ();
var pt = tokens.length - 2 - (this.line.length > 75 ? 1 : 0);
atom.partialCharge = this.parseFloatStr (tokens[pt++]);
atom.radius = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatStr (tokens[pt]));
}return;
}var floatOccupancy;
if (this.gromacsWideFormat) {
floatOccupancy = this.parseFloatRange (this.line, 60, 68);
atom.bfactor = J.adapter.readers.pdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
floatOccupancy = this.parseFloatRange (this.line, 54, 60);
atom.bfactor = this.parseFloatRange (this.line, 60, 66);
}atom.foccupancy = (Float.isNaN (floatOccupancy) ? 1 : floatOccupancy);
}, "J.adapter.smarter.Atom");
$_M(c$, "deduceElementSymbol", 
function (isHetero) {
if (this.lineLength >= 78) {
var ch76 = this.line.charAt (76);
var ch77 = this.line.charAt (77);
if (ch76 == ' ' && J.adapter.smarter.Atom.isValidElementSymbol (ch77)) return "" + ch77;
if (J.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch76, ch77)) return "" + ch76 + ch77;
}var ch12 = this.line.charAt (12);
var ch13 = this.line.charAt (13);
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (12, 14)) != null) && J.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch12, ch13)) return (isHetero || ch12 != 'H' ? "" + ch12 + ch13 : "H");
if (ch12 == 'H') return "H";
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch13) != null) && J.adapter.smarter.Atom.isValidElementSymbol (ch13)) return "" + ch13;
if (ch12 != ' ' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch12) != null) && J.adapter.smarter.Atom.isValidElementSymbol (ch12)) return "" + ch12;
var ch14 = this.line.charAt (14);
if (ch12 == ' ' && ch13 != 'X' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (13, 15)) != null) && J.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch13, ch14)) return "" + ch13 + ch14;
return "Xx";
}, "~B");
$_M(c$, "conect", 
function () {
if (this.sbConect == null) {
this.sbConect =  new JU.SB ();
this.sb =  new JU.SB ();
} else {
this.sb.setLength (0);
}var sourceSerial = -1;
sourceSerial = this.getSerial (6, 11);
if (sourceSerial < 0) return;
for (var i = 0; i < 9; i += (i == 5 ? 2 : 1)) {
var offset = i * 5 + 11;
var offsetEnd = offset + 5;
var targetSerial = (offsetEnd <= this.lineLength ? this.getSerial (offset, offsetEnd) : -1);
if (targetSerial < 0) continue;
var isDoubleBond = (sourceSerial == this.lastSourceSerial && targetSerial == this.lastTargetSerial);
if (isDoubleBond) this.haveDoubleBonds = true;
this.lastSourceSerial = sourceSerial;
this.lastTargetSerial = targetSerial;
var isSwapped = (targetSerial < sourceSerial);
var i1;
if (isSwapped) {
i1 = targetSerial;
targetSerial = sourceSerial;
} else {
i1 = sourceSerial;
}var st = ";" + i1 + " " + targetSerial + ";";
if (this.sbConect.indexOf (st) >= 0 && !isDoubleBond) continue;
if (this.haveDoubleBonds) {
var st1 = "--" + st;
if (this.sbConect.indexOf (st1) >= 0) continue;
this.sbConect.append (st);
this.sb.append (st1);
} else {
this.sbConect.append (st);
}this.atomSetCollection.addConnection ([i1, targetSerial, i < 4 ? 1 : 2048]);
}
this.sbConect.appendSB (this.sb);
});
$_M(c$, "structure", 
function () {
var structureType = J.constant.EnumStructure.NONE;
var substructureType = J.constant.EnumStructure.NONE;
var startChainIDIndex;
var startIndex;
var endChainIDIndex;
var endIndex;
var strandCount = 0;
if (this.line.startsWith ("HELIX ")) {
structureType = J.constant.EnumStructure.HELIX;
startChainIDIndex = 19;
startIndex = 21;
endChainIDIndex = 31;
endIndex = 33;
if (this.line.length >= 40) substructureType = J.adapter.smarter.Structure.getHelixType (this.parseIntRange (this.line, 38, 40));
} else if (this.line.startsWith ("SHEET ")) {
structureType = J.constant.EnumStructure.SHEET;
startChainIDIndex = 21;
startIndex = 22;
endChainIDIndex = 32;
endIndex = 33;
strandCount = this.parseIntRange (this.line, 14, 16);
} else if (this.line.startsWith ("TURN  ")) {
structureType = J.constant.EnumStructure.TURN;
startChainIDIndex = 19;
startIndex = 20;
endChainIDIndex = 30;
endIndex = 31;
} else return;
if (this.lineLength < endIndex + 4) return;
var structureID = this.line.substring (11, 15).trim ();
var serialID = this.parseIntRange (this.line, 7, 10);
var startChainID = this.line.charAt (startChainIDIndex);
var startSequenceNumber = this.parseIntRange (this.line, startIndex, startIndex + 4);
var startInsertionCode = this.line.charAt (startIndex + 4);
var endChainID = this.line.charAt (endChainIDIndex);
var endSequenceNumber = this.parseIntRange (this.line, endIndex, endIndex + 4);
var endInsertionCode = ' ';
if (this.lineLength > endIndex + 4) endInsertionCode = this.line.charAt (endIndex + 4);
if (substructureType === J.constant.EnumStructure.NONE) substructureType = structureType;
var structure =  new J.adapter.smarter.Structure (-1, structureType, substructureType, structureID, serialID, strandCount);
structure.set (startChainID.charCodeAt (0), startSequenceNumber, startInsertionCode, endChainID.charCodeAt (0), endSequenceNumber, endInsertionCode, -2147483648, 2147483647);
this.atomSetCollection.addStructure (structure);
});
$_M(c$, "getModelNumber", 
function () {
var startModelColumn = 6;
var endModelColumn = 14;
if (endModelColumn > this.lineLength) endModelColumn = this.lineLength;
var iModel = this.parseIntRange (this.line, startModelColumn, endModelColumn);
return (iModel == -2147483648 ? 0 : iModel);
});
$_M(c$, "model", 
function (modelNumber) {
this.checkNotPDB ();
this.haveMappedSerials = false;
this.sbConect = null;
this.atomSetCollection.newAtomSet ();
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.TRUE);
this.atomSetCollection.setCurrentAtomSetNumber (modelNumber);
if (this.isCourseGrained) this.atomSetCollection.setAtomSetAuxiliaryInfo ("courseGrained", Boolean.TRUE);
}, "~N");
$_M(c$, "checkNotPDB", 
function () {
var isPDB = (this.nRes == 0 || this.nUNK != this.nRes);
this.atomSetCollection.setCheckSpecial (!isPDB);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", isPDB ? Boolean.TRUE : Boolean.FALSE);
this.nUNK = this.nRes = 0;
this.currentGroup3 = null;
});
$_M(c$, "cryst1", 
function () {
var a = this.getFloat (6, 9);
if (a == 1) a = NaN;
this.setUnitCell (a, this.getFloat (15, 9), this.getFloat (24, 9), this.getFloat (33, 7), this.getFloat (40, 7), this.getFloat (47, 7));
if (this.spaceGroup == null) this.setSpaceGroupName (J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 55, 66));
});
$_M(c$, "getFloat", 
function (ich, cch) {
return this.parseFloatRange (this.line, ich, ich + cch);
}, "~N,~N");
$_M(c$, "scale", 
function (n) {
var pt = n * 4 + 2;
this.setUnitCellItem (pt++, this.getFloat (10, 10));
this.setUnitCellItem (pt++, this.getFloat (20, 10));
this.setUnitCellItem (pt++, this.getFloat (30, 10));
this.setUnitCellItem (pt++, this.getFloat (45, 10));
}, "~N");
$_M(c$, "expdta", 
function () {
if (this.line.toUpperCase ().indexOf ("NMR") >= 0) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("isNMRdata", "true");
});
$_M(c$, "formul", 
function () {
var groupName = this.parseTokenRange (this.line, 12, 15);
var formula = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 19, 70);
var ichLeftParen = formula.indexOf ('(');
if (ichLeftParen >= 0) {
var ichRightParen = formula.indexOf (')');
if (ichRightParen < 0 || ichLeftParen >= ichRightParen || ichLeftParen + 1 == ichRightParen) return;
formula = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (formula, ichLeftParen + 1, ichRightParen);
}var htElementsInGroup = this.htFormul.get (groupName);
if (htElementsInGroup == null) this.htFormul.put (groupName, htElementsInGroup =  new java.util.Hashtable ());
this.next[0] = 0;
var elementWithCount;
while ((elementWithCount = this.parseTokenNext (formula)) != null) {
if (elementWithCount.length < 2) continue;
var chFirst = elementWithCount.charAt (0);
var chSecond = elementWithCount.charAt (1);
if (J.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (chFirst, chSecond)) htElementsInGroup.put ("" + chFirst + chSecond, Boolean.TRUE);
 else if (J.adapter.smarter.Atom.isValidElementSymbol (chFirst)) htElementsInGroup.put ("" + chFirst, Boolean.TRUE);
}
});
$_M(c$, "het", 
function () {
if (this.line.length < 30) {
return;
}if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 7, 10);
if (this.htHetero.containsKey (groupName)) {
return;
}var hetName = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 30, 70);
this.htHetero.put (groupName, hetName);
});
$_M(c$, "hetnam", 
function () {
if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 11, 14);
var hetName = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 15, 70);
if (groupName == null) {
J.util.Logger.error ("ERROR: HETNAM record does not contain a group name: " + this.line);
return;
}var htName = this.htHetero.get (groupName);
if (htName != null) {
hetName = htName + hetName;
}this.htHetero.put (groupName, hetName);
});
$_M(c$, "anisou", 
function () {
var data =  Clazz_newFloatArray (8, 0);
data[6] = 1;
var serial = this.parseIntRange (this.line, 6, 11);
var index;
if (this.line.substring (6, 26).equals (this.lastAtomData)) {
index = this.lastAtomIndex;
} else {
if (!this.haveMappedSerials) this.atomSetCollection.createAtomSerialMap ();
index = this.atomSetCollection.getAtomIndexFromSerial (serial);
this.haveMappedSerials = true;
}if (index < 0) {
return;
}var atom = this.atomSetCollection.getAtom (index);
for (var i = 28, pt = 0; i < 70; i += 7, pt++) data[pt] = this.parseFloatRange (this.line, i, i + 7);

for (var i = 0; i < 6; i++) {
if (Float.isNaN (data[i])) {
J.util.Logger.error ("Bad ANISOU record: " + this.line);
return;
}data[i] /= 10000;
}
this.atomSetCollection.setAnisoBorU (atom, data, 12);
});
$_M(c$, "site", 
function () {
if (this.htSites == null) {
this.htSites =  new java.util.Hashtable ();
}var nResidues = this.parseIntRange (this.line, 15, 17);
var siteID = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 11, 14);
var htSite = this.htSites.get (siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable ();
htSite.put ("nResidues", Integer.$valueOf (nResidues));
htSite.put ("groups", "");
this.htSites.put (siteID, htSite);
}var groups = htSite.get ("groups");
for (var i = 0; i < 4; i++) {
var pt = 18 + i * 11;
var resName = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt, pt + 3);
if (resName.length == 0) break;
var chainID = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 4, pt + 5);
var seq = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 5, pt + 9);
var iCode = J.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 9, pt + 10);
groups += (groups.length == 0 ? "" : ",") + "[" + resName + "]" + seq;
if (iCode.length > 0) groups += "^" + iCode;
if (chainID.length > 0) groups += ":" + chainID;
htSite.put ("groups", groups);
}
});
$_M(c$, "remarkTls", 
function () {
var nGroups = 0;
var iGroup = 0;
var components = null;
var tlsGroups = null;
var tlsGroup = null;
var ranges = null;
var range = null;
var remark = this.line.substring (0, 11);
while (this.readLine () != null && this.line.startsWith (remark)) {
try {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line.substring (10).$replace (':', ' '));
if (tokens.length < 2) continue;
J.util.Logger.info (this.line);
if (tokens[1].equalsIgnoreCase ("GROUP")) {
tlsGroup =  new java.util.Hashtable ();
ranges =  new JU.List ();
tlsGroup.put ("ranges", ranges);
tlsGroups.addLast (tlsGroup);
this.tlsGroupID = this.parseIntStr (tokens[tokens.length - 1]);
tlsGroup.put ("id", Integer.$valueOf (this.tlsGroupID));
} else if (tokens[0].equalsIgnoreCase ("NUMBER")) {
if (tokens[2].equalsIgnoreCase ("COMPONENTS")) {
} else {
nGroups = this.parseIntStr (tokens[tokens.length - 1]);
if (nGroups < 1) break;
if (this.vTlsModels == null) this.vTlsModels =  new JU.List ();
tlsGroups =  new JU.List ();
this.appendLoadNote (this.line.substring (11).trim ());
}} else if (tokens[0].equalsIgnoreCase ("COMPONENTS")) {
components = this.line;
} else if (tokens[0].equalsIgnoreCase ("RESIDUE")) {
range =  new java.util.Hashtable ();
var chain1;
var chain2;
var res1;
var res2;
if (tokens.length == 6) {
chain1 = tokens[2].charAt (0);
chain2 = tokens[4].charAt (0);
res1 = this.parseIntStr (tokens[3]);
res2 = this.parseIntStr (tokens[5]);
} else {
var toC = components.indexOf (" C ");
var fromC = components.indexOf (" C ", toC + 4);
chain1 = this.line.charAt (fromC);
chain2 = this.line.charAt (toC);
res1 = this.parseIntRange (this.line, fromC + 1, toC);
res2 = this.parseIntStr (this.line.substring (toC + 1));
}if (chain1 == chain2) {
range.put ("chains", "" + chain1 + chain2);
if (res1 <= res2) {
range.put ("residues", [res1, res2]);
ranges.addLast (range);
} else {
this.tlsAddError (" TLS group residues are not in order (range ignored)");
}} else {
this.tlsAddError (" TLS group chains are different (range ignored)");
}} else if (tokens[0].equalsIgnoreCase ("SELECTION")) {
var chain = '\u0000';
for (var i = 1; i < tokens.length; i++) {
if (tokens[i].toUpperCase ().indexOf ("CHAIN") >= 0) {
chain = tokens[++i].charAt (0);
continue;
}var resno = this.parseIntStr (tokens[i]);
if (resno == -2147483648) continue;
range =  new java.util.Hashtable ();
range.put ("residues", [resno, this.parseIntStr (tokens[++i])]);
if (chain != '\0') range.put ("chains", "" + chain + chain);
ranges.addLast (range);
}
} else if (tokens[0].equalsIgnoreCase ("ORIGIN")) {
var origin =  new JU.P3 ();
tlsGroup.put ("origin", origin);
if (tokens.length == 8) {
origin.set (this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[7]));
} else {
var n = this.line.length;
origin.set (this.parseFloatRange (this.line, n - 27, n - 18), this.parseFloatRange (this.line, n - 18, n - 9), this.parseFloatRange (this.line, n - 9, n));
}if (Float.isNaN (origin.x) || Float.isNaN (origin.y) || Float.isNaN (origin.z)) {
origin.set (NaN, NaN, NaN);
this.tlsAddError ("invalid origin: " + this.line);
}} else if (tokens[1].equalsIgnoreCase ("TENSOR")) {
var tensorType = tokens[0].charAt (0);
var s = (this.readLine ().substring (10) + this.readLine ().substring (10) + this.readLine ().substring (10)).$replace (tensorType, ' ').$replace (':', ' ');
tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (s);
var data =  Clazz_newFloatArray (3, 3, 0);
tlsGroup.put ("t" + tensorType, data);
for (var i = 0; i < tokens.length; i++) {
var ti = tokens[i].charCodeAt (0) - 49;
var tj = tokens[i].charCodeAt (1) - 49;
data[ti][tj] = this.parseFloatStr (tokens[++i]);
if (ti < tj) data[tj][ti] = data[ti][tj];
}
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) if (Float.isNaN (data[i][j])) this.tlsAddError ("invalid tensor: " + J.util.Escape.escapeFloatAA (data, false));


if (tensorType == 'S' && ++iGroup == nGroups) {
J.util.Logger.info (nGroups + " TLS groups read");
this.readLine ();
break;
}}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
J.util.Logger.error (this.line + "\nError in TLS parser: ");
System.out.println (e.getMessage ());
tlsGroups = null;
break;
} else {
throw e;
}
}
}
if (tlsGroups != null) {
var tlsModel =  new java.util.Hashtable ();
tlsModel.put ("groupCount", Integer.$valueOf (nGroups));
tlsModel.put ("groups", tlsGroups);
this.vTlsModels.addLast (tlsModel);
}return (nGroups < 1);
});
$_M(c$, "handleTlsMissingModels", 
function () {
this.vTlsModels = null;
});
$_M(c$, "setTlsGroups", 
function (iGroup, iModel, symmetry) {
J.util.Logger.info ("TLS model " + (iModel + 1) + " set " + (iGroup + 1));
var tlsGroupInfo = this.vTlsModels.get (iGroup);
var groups = tlsGroupInfo.get ("groups");
var index0 = this.atomSetCollection.getAtomSetAtomIndex (iModel);
var data =  Clazz_newIntArray (this.atomSetCollection.getAtomSetAtomCount (iModel), 0);
var indexMax = index0 + data.length;
var atoms = this.atomSetCollection.getAtoms ();
var nGroups = groups.size ();
for (var i = 0; i < nGroups; i++) {
var group = groups.get (i);
var ranges = group.get ("ranges");
this.tlsGroupID = (group.get ("id")).intValue ();
for (var j = ranges.size (); --j >= 0; ) {
var chains = ranges.get (j).get ("chains");
var residues = ranges.get (j).get ("residues");
var chain0 = 0 + chains.charCodeAt (0);
var chain1 = 0 + chains.charCodeAt (1);
var res0 = residues[0];
var res1 = residues[1];
var index1 = this.findAtomForRange (index0, indexMax, chain0, res0, false);
var index2 = (index1 >= 0 ? this.findAtomForRange (index1, indexMax, chain1, res1, false) : -1);
if (index2 < 0) {
J.util.Logger.info ("TLS processing terminated");
return;
}J.util.Logger.info ("TLS ID=" + this.tlsGroupID + " model atom index range " + index1 + "-" + index2);
var isSameChain = (chain0 == chain1);
for (var iAtom = index0; iAtom < indexMax; iAtom++) {
var atom = atoms[iAtom];
if (isSameChain ? atom.sequenceNumber >= res0 && atom.sequenceNumber <= res1 : atom.chainID > chain0 && atom.chainID < chain1 || atom.chainID == chain0 && atom.sequenceNumber >= res0 || atom.chainID == chain1 && atom.sequenceNumber <= res1) {
data[iAtom - index0] = this.tlsGroupID;
this.setTlsTensor (atom, group, symmetry);
}}
}
}
var sdata =  new JU.SB ();
for (var i = 0; i < data.length; i++) sdata.appendI (data[i]).appendC ('\n');

this.atomSetCollection.setAtomSetAtomProperty ("tlsGroup", sdata.toString (), iModel);
this.atomSetCollection.setAtomSetAuxiliaryInfoForSet ("TLS", tlsGroupInfo, iModel);
this.atomSetCollection.setTensors ();
}, "~N,~N,J.api.SymmetryInterface");
$_M(c$, "findAtomForRange", 
function (atom1, atom2, chain, resno, isLast) {
var iAtom = this.findAtom (atom1, atom2, chain, resno, true);
return (isLast && iAtom >= 0 ? this.findAtom (iAtom, atom2, chain, resno, false) : iAtom);
}, "~N,~N,~N,~N,~B");
$_M(c$, "findAtom", 
function (atom1, atom2, chain, resno, isTrue) {
var atoms = this.atomSetCollection.getAtoms ();
for (var i = atom1; i < atom2; i++) {
var atom = atoms[i];
if ((atom.chainID == chain && atom.sequenceNumber == resno) == isTrue) return i;
}
if (isTrue) {
J.util.Logger.warn ("PdbReader findAtom chain=" + chain + " resno=" + resno + " not found");
this.tlsAddError ("atom not found: chain=" + chain + " resno=" + resno);
}return (isTrue ? -1 : atom2);
}, "~N,~N,~N,~N,~B");
$_M(c$, "setTlsTensor", 
function (atom, group, symmetry) {
var origin = group.get ("origin");
if (Float.isNaN (origin.x)) return;
var T = group.get ("tT");
var L = group.get ("tL");
var S = group.get ("tS");
if (T == null || L == null || S == null) return;
var x = (atom.x - origin.x) * 0.017453292;
var y = (atom.y - origin.y) * 0.017453292;
var z = (atom.z - origin.z) * 0.017453292;
var xx = x * x;
var yy = y * y;
var zz = z * z;
var xy = x * y;
var xz = x * z;
var yz = y * z;
this.dataT[0] = T[0][0];
this.dataT[1] = T[1][1];
this.dataT[2] = T[2][2];
this.dataT[3] = T[0][1];
this.dataT[4] = T[0][2];
this.dataT[5] = T[1][2];
this.dataT[6] = 12;
var anisou =  Clazz_newFloatArray (8, 0);
var bresidual = (Float.isNaN (atom.bfactor) ? 0 : atom.bfactor / 78.95683);
anisou[0] = this.dataT[0] + L[1][1] * zz + L[2][2] * yy - 2 * L[1][2] * yz + 2 * S[1][0] * z - 2 * S[2][0] * y;
anisou[1] = this.dataT[1] + L[0][0] * zz + L[2][2] * xx - 2 * L[2][0] * xz - 2 * S[0][1] * z + 2 * S[2][1] * x;
anisou[2] = this.dataT[2] + L[0][0] * yy + L[1][1] * xx - 2 * L[0][1] * xy - 2 * S[1][2] * x + 2 * S[0][2] * y;
anisou[3] = this.dataT[3] - L[2][2] * xy + L[1][2] * xz + L[2][0] * yz - L[0][1] * zz - S[0][0] * z + S[1][1] * z + S[2][0] * x - S[2][1] * y;
anisou[4] = this.dataT[4] - L[1][1] * xz + L[1][2] * xy - L[2][0] * yy + L[0][1] * yz + S[0][0] * y - S[2][2] * y + S[1][2] * z - S[1][0] * x;
anisou[5] = this.dataT[5] - L[0][0] * yz - L[1][2] * xx + L[2][0] * xy + L[0][1] * xz - S[1][1] * x + S[2][2] * x + S[0][1] * y - S[0][2] * z;
anisou[6] = 12;
anisou[7] = bresidual;
if (this.tlsU == null) this.tlsU =  new java.util.Hashtable ();
this.tlsU.put (atom, anisou);
atom.addTensor (symmetry.getTensor (this.dataT).setType (null), "TLS-U", false);
}, "J.adapter.smarter.Atom,java.util.Map,J.api.SymmetryInterface");
$_M(c$, "tlsAddError", 
function (error) {
if (this.sbTlsErrors == null) this.sbTlsErrors =  new JU.SB ();
this.sbTlsErrors.append (this.fileName).appendC ('\t').append ("TLS group ").appendI (this.tlsGroupID).appendC ('\t').append (error).appendC ('\n');
}, "~S");
c$.fixRadius = $_M(c$, "fixRadius", 
function (r) {
return (r < 0.9 ? 1 : r);
}, "~N");
Clazz_defineStatics (c$,
"MODE_PDB", 0,
"MODE_HEX", 1,
"MODE_HYBRID36", 2,
"lineOptions", "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   ",
"RAD_PER_DEG", (0.017453292519943295),
"_8PI2_", (78.95683520871486));
});
Clazz_declarePackage ("J.adapter.smarter");
Clazz_load (null, "J.adapter.smarter.Structure", ["J.constant.EnumStructure"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structureType = null;
this.substructureType = null;
this.structureID = null;
this.serialID = 0;
this.strandCount = 0;
this.startChainID = 0;
this.startChainStr = null;
this.startInsertionCode = '\0';
this.endChainID = 0;
this.endChainStr = null;
this.endInsertionCode = '\0';
this.startSequenceNumber = 0;
this.endSequenceNumber = 0;
this.atomStartEnd = null;
this.modelStartEnd = null;
Clazz_instantialize (this, arguments);
}, J.adapter.smarter, "Structure");
Clazz_prepareFields (c$, function () {
this.atomStartEnd =  Clazz_newIntArray (2, 0);
this.modelStartEnd = [-1, -1];
});
c$.getHelixType = $_M(c$, "getHelixType", 
function (type) {
switch (type) {
case 1:
return J.constant.EnumStructure.HELIXALPHA;
case 3:
return J.constant.EnumStructure.HELIXPI;
case 5:
return J.constant.EnumStructure.HELIX310;
}
return J.constant.EnumStructure.HELIX;
}, "~N");
Clazz_makeConstructor (c$, 
function (modelIndex, structureType, substructureType, structureID, serialID, strandCount) {
this.structureType = structureType;
this.substructureType = substructureType;
if (structureID == null) return;
this.setModels (modelIndex, 0);
this.structureID = structureID;
this.strandCount = strandCount;
this.serialID = serialID;
}, "~N,J.constant.EnumStructure,J.constant.EnumStructure,~S,~N,~N");
$_M(c$, "set", 
function (startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, istart, iend) {
this.startChainID = startChainID;
this.startSequenceNumber = startSequenceNumber;
this.startInsertionCode = startInsertionCode;
this.endChainID = endChainID;
this.endSequenceNumber = endSequenceNumber;
this.endInsertionCode = endInsertionCode;
this.atomStartEnd[0] = istart;
this.atomStartEnd[1] = iend;
}, "~N,~N,~S,~N,~N,~S,~N,~N");
$_M(c$, "setModels", 
function (model1, model2) {
this.modelStartEnd[0] = model1;
this.modelStartEnd[1] = (model2 == 0 ? model1 : model2);
}, "~N,~N");
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolBioResolver");
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.api.JmolBioResolver"], "J.modelsetbio.Resolver", ["java.lang.Boolean", "$.NullPointerException", "java.util.Arrays", "$.Hashtable", "JU.BS", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "J.constant.EnumStructure", "J.modelset.Group", "J.modelsetbio.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.Monomer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "J.util.BSUtil", "$.Logger", "$.Measure", "$.Txt", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.modelLoader = null;
this.modelSet = null;
this.bsAddedHydrogens = null;
this.bsAtomsForHs = null;
this.htBondMap = null;
this.htGroupBonds = null;
this.hNames = null;
this.lastSetH = -2147483648;
this.maxSerial = 0;
this.baseBondIndex = 0;
this.haveHsAlready = false;
this.vAB = null;
this.vAC = null;
this.vNorm = null;
this.plane = null;
if (!Clazz_isClassDefined ("J.modelsetbio.Resolver.BondSorter")) {
J.modelsetbio.Resolver.$Resolver$BondSorter$ ();
}
this.bsAssigned = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "Resolver", null, J.api.JmolBioResolver);
Clazz_makeConstructor (c$, 
function () {
});
$_V(c$, "getBioModel", 
function (modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) {
return  new J.modelsetbio.BioModel (this.modelSet, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo);
}, "~N,~N,~S,java.util.Properties,java.util.Map");
$_V(c$, "distinguishAndPropagateGroup", 
function (chain, group3, seqcode, firstAtomIndex, maxAtomIndex, modelIndex, specialAtomIndexes, atoms) {
var lastAtomIndex = maxAtomIndex - 1;
var distinguishingBits = 0;
for (var i = J.viewer.JC.ATOMID_MAX; --i >= 0; ) specialAtomIndexes[i] = -2147483648;

for (var i = maxAtomIndex; --i >= firstAtomIndex; ) {
var specialAtomID = atoms[i].getAtomID ();
if (specialAtomID <= 0) continue;
if (specialAtomID < 14) {
distinguishingBits |= (1 << specialAtomID);
}specialAtomIndexes[specialAtomID] = i;
}
if (lastAtomIndex < firstAtomIndex) throw  new NullPointerException ();
var m = null;
if ((distinguishingBits & 14) == 14) m = J.modelsetbio.AminoMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms);
 else if (distinguishingBits == 4) m = J.modelsetbio.AlphaMonomer.validateAndAllocateA (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (((distinguishingBits & 8128) == 8128)) m = J.modelsetbio.NucleicMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (distinguishingBits == 8192) m = J.modelsetbio.PhosphorusMonomer.validateAndAllocateP (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (J.viewer.JC.checkCarbohydrate (group3)) m = J.modelsetbio.CarbohydrateMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
return (m != null && m.leadAtomIndex >= 0 ? m : null);
}, "J.modelset.Chain,~S,~N,~N,~N,~N,~A,~A");
$_V(c$, "setHaveHsAlready", 
function (b) {
this.haveHsAlready = b;
}, "~B");
$_V(c$, "initialize", 
function (modelLoader) {
this.modelLoader = modelLoader;
this.modelSet = modelLoader.modelSet;
}, "J.modelset.ModelLoader");
$_V(c$, "initializeHydrogenAddition", 
function () {
this.baseBondIndex = this.modelLoader.modelSet.bondCount;
this.bsAddedHydrogens =  new JU.BS ();
this.bsAtomsForHs =  new JU.BS ();
this.htBondMap =  new java.util.Hashtable ();
this.htGroupBonds =  new java.util.Hashtable ();
this.hNames =  new Array (3);
this.vAB =  new JU.V3 ();
this.vAC =  new JU.V3 ();
this.vNorm =  new JU.V3 ();
this.plane =  new JU.P4 ();
});
$_V(c$, "addImplicitHydrogenAtoms", 
function (adapter, iGroup, nH) {
var group3 = this.modelLoader.getGroup3 (iGroup);
var nH1;
if (this.haveHsAlready || group3 == null || (nH1 = J.viewer.JC.getStandardPdbHydrogenCount (J.modelset.Group.lookupGroupID (group3))) == 0) return;
nH = (nH1 < 0 ? -1 : nH1 + nH);
var model = null;
var iFirst = this.modelLoader.getFirstAtomIndex (iGroup);
var atomCount = this.modelSet.getAtomCount ();
if (nH < 0) {
if (atomCount - iFirst == 1) return;
model = this.modelSet.viewer.getLigandModel (group3, "ligand_", "_data", null);
if (model == null) return;
nH = adapter.getHydrogenAtomCount (model);
if (nH < 1) return;
}this.getBondInfo (adapter, group3, model);
this.modelSet.models[this.modelSet.atoms[iFirst].modelIndex].isPdbWithMultipleBonds = true;
this.bsAtomsForHs.setBits (iFirst, atomCount);
this.bsAddedHydrogens.setBits (atomCount, atomCount + nH);
var isHetero = this.modelSet.atoms[iFirst].isHetero ();
var xyz = JU.P3.new3 (NaN, NaN, NaN);
for (var i = 0; i < nH; i++) this.modelSet.addAtom (this.modelSet.atoms[iFirst].modelIndex, this.modelSet.atoms[iFirst].getGroup (), 1, "H", 0, 0, xyz, NaN, null, 0, 0, 1, 0, null, isHetero, 0, null).deleteBonds (null);

}, "J.api.JmolAdapter,~N,~N");
$_M(c$, "getBondInfo", 
function (adapter, group3, model) {
if (this.htGroupBonds.get (group3) != null) return;
var bondInfo;
if (model == null) {
bondInfo = this.modelSet.viewer.getPdbBondInfo (group3);
} else {
bondInfo = this.getLigandBondInfo (adapter, model, group3);
}if (bondInfo == null) return;
this.htGroupBonds.put (group3, Boolean.TRUE);
for (var i = 0; i < bondInfo.length; i++) {
if (bondInfo[i] == null) continue;
if (bondInfo[i][1].charAt (0) == 'H') this.htBondMap.put (group3 + "." + bondInfo[i][0], bondInfo[i][1]);
 else this.htBondMap.put (group3 + ":" + bondInfo[i][0] + ":" + bondInfo[i][1], bondInfo[i][2]);
}
}, "J.api.JmolAdapter,~S,~O");
$_M(c$, "getLigandBondInfo", 
function (adapter, model, group3) {
var dataIn = adapter.getBondList (model);
var htAtoms =  new java.util.Hashtable ();
var iterAtom = adapter.getAtomIterator (model);
while (iterAtom.hasNext ()) htAtoms.put (iterAtom.getAtomName (), iterAtom.getXYZ ());

var bondInfo =  new Array (dataIn.length * 2);
var n = 0;
for (var i = 0; i < dataIn.length; i++) {
var b = dataIn[i];
if (b[0].charAt (0) != 'H') bondInfo[n++] = [b[0], b[1], b[2], b[1].startsWith ("H") ? "0" : "1"];
if (b[1].charAt (0) != 'H') bondInfo[n++] = [b[1], b[0], b[2], b[0].startsWith ("H") ? "0" : "1"];
}
java.util.Arrays.sort (bondInfo, Clazz_innerTypeInstance (J.modelsetbio.Resolver.BondSorter, this, null));
var t;
for (var i = 0; i < n; ) {
t = bondInfo[i];
var a1 = t[0];
var nH = 0;
var nC = 0;
for (; i < n && (t = bondInfo[i])[0].equals (a1); i++) {
if (t[3].equals ("0")) {
nH++;
continue;
}if (t[3].equals ("1")) nC++;
}
var pt = i - nH - nC;
if (nH == 1) continue;
switch (nC) {
case 1:
var sep = (nH == 2 ? '@' : '|');
for (var j = 1; j < nH; j++) {
bondInfo[pt][1] += sep + bondInfo[pt + j][1];
bondInfo[pt + j] = null;
}
continue;
case 2:
if (nH != 2) continue;
var name = bondInfo[pt][0];
var name1 = bondInfo[pt + nH][1];
var name2 = bondInfo[pt + nH + 1][1];
var factor = name1.compareTo (name2);
J.util.Measure.getPlaneThroughPoints (htAtoms.get (name1), htAtoms.get (name), htAtoms.get (name2), this.vNorm, this.vAB, this.vAC, this.plane);
var d = J.util.Measure.distanceToPlane (this.plane, htAtoms.get (bondInfo[pt][1])) * factor;
bondInfo[pt][1] = (d > 0 ? bondInfo[pt][1] + "@" + bondInfo[pt + 1][1] : bondInfo[pt + 1][1] + "@" + bondInfo[pt][1]);
bondInfo[pt + 1] = null;
}
}
for (var i = 0; i < n; i++) {
if ((t = bondInfo[i]) != null && t[1].charAt (0) != 'H' && t[0].compareTo (t[1]) > 0) {
bondInfo[i] = null;
continue;
}if (t != null) J.util.Logger.info (" ligand " + group3 + ": " + bondInfo[i][0] + " - " + bondInfo[i][1] + " order " + bondInfo[i][2]);
}
return bondInfo;
}, "J.api.JmolAdapter,~O,~S");
$_V(c$, "finalizeHydrogens", 
function () {
this.modelSet.viewer.getLigandModel (null, null, null, null);
this.finalizePdbMultipleBonds ();
this.addHydrogens ();
});
$_M(c$, "addHydrogens", 
function () {
if (this.bsAddedHydrogens.nextSetBit (0) < 0) return;
this.finalizePdbCharges ();
var nTotal =  Clazz_newIntArray (1, 0);
var pts = this.modelSet.calculateHydrogens (this.bsAtomsForHs, nTotal, true, false, null);
var groupLast = null;
var ipt = 0;
for (var i = 0; i < pts.length; i++) {
if (pts[i] == null) continue;
var atom = this.modelSet.atoms[i];
var g = atom.getGroup ();
if (g !== groupLast) {
groupLast = g;
ipt = g.lastAtomIndex;
while (this.bsAddedHydrogens.get (ipt)) ipt--;

}var gName = atom.getGroup3 (false);
var aName = atom.getAtomName ();
var hName = this.htBondMap.get (gName + "." + aName);
if (hName == null) continue;
var isChiral = hName.contains ("@");
var isMethyl = (hName.endsWith ("?") || hName.indexOf ("|") >= 0);
var n = pts[i].length;
if (n == 3 && !isMethyl && hName.equals ("H@H2")) {
hName = "H|H2|H3";
isMethyl = true;
isChiral = false;
}if (isChiral && n == 3 || isMethyl != (n == 3)) {
J.util.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": " + pts[i].length + " atoms should not be added to " + aName);
continue;
}var pt = hName.indexOf ("@");
switch (pts[i].length) {
case 1:
if (pt > 0) hName = hName.substring (0, pt);
this.setHydrogen (i, ++ipt, hName, pts[i][0]);
break;
case 2:
var hName1;
var hName2;
var d = -1;
var bonds = atom.getBonds ();
if (bonds != null) switch (bonds.length) {
case 2:
var atom1 = bonds[0].getOtherAtom (atom);
var atom2 = bonds[1].getOtherAtom (atom);
var factor = atom1.getAtomName ().compareTo (atom2.getAtomName ());
J.util.Measure.getPlaneThroughPoints (atom1, atom, atom2, this.vNorm, this.vAB, this.vAC, this.plane);
d = J.util.Measure.distanceToPlane (this.plane, pts[i][0]) * factor;
break;
}
if (pt < 0) {
J.util.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": expected to only need 1 H but needed 2");
hName1 = hName2 = "H";
} else if (d < 0) {
hName2 = hName.substring (0, pt);
hName1 = hName.substring (pt + 1);
} else {
hName1 = hName.substring (0, pt);
hName2 = hName.substring (pt + 1);
}this.setHydrogen (i, ++ipt, hName1, pts[i][0]);
this.setHydrogen (i, ++ipt, hName2, pts[i][1]);
break;
case 3:
var pt1 = hName.indexOf ('|');
if (pt1 >= 0) {
var pt2 = hName.lastIndexOf ('|');
this.hNames[0] = hName.substring (0, pt1);
this.hNames[1] = hName.substring (pt1 + 1, pt2);
this.hNames[2] = hName.substring (pt2 + 1);
} else {
this.hNames[0] = hName.$replace ('?', '1');
this.hNames[1] = hName.$replace ('?', '2');
this.hNames[2] = hName.$replace ('?', '3');
}this.setHydrogen (i, ++ipt, this.hNames[0], pts[i][0]);
this.setHydrogen (i, ++ipt, this.hNames[1], pts[i][2]);
this.setHydrogen (i, ++ipt, this.hNames[2], pts[i][1]);
break;
}
}
this.deleteUnneededAtoms ();
this.modelSet.fixFormalCharges (J.util.BSUtil.newBitSet2 (this.modelLoader.baseAtomIndex, this.modelLoader.modelSet.atomCount));
});
$_M(c$, "deleteUnneededAtoms", 
function () {
var bsBondsDeleted =  new JU.BS ();
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var atom = this.modelSet.atoms[i];
if (!atom.isHetero () || atom.getElementNumber () != 8 || atom.getFormalCharge () != 0 || atom.getCovalentBondCount () != 2) continue;
var bonds = atom.getBonds ();
var atom1 = bonds[0].getOtherAtom (atom);
var atomH = bonds[1].getOtherAtom (atom);
if (atom1.getElementNumber () == 1) {
var a = atom1;
atom1 = atomH;
atomH = a;
}if (atomH.getElementNumber () != 1) continue;
var bonds1 = atom1.getBonds ();
for (var j = 0; j < bonds1.length; j++) {
if (bonds1[j].order == 2) {
var atomO = bonds1[j].getOtherAtom (atom1);
if (atomO.getElementNumber () == 8) {
this.bsAddedHydrogens.set (atomH.index);
atomH.deleteBonds (bsBondsDeleted);
break;
}}}
}
this.modelSet.deleteBonds (bsBondsDeleted, true);
this.modelLoader.deleteAtoms (this.bsAddedHydrogens);
});
$_M(c$, "finalizePdbCharges", 
function () {
var atoms = this.modelSet.atoms;
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var a = atoms[i];
if (a.getGroup ().getNitrogenAtom () === a && a.getCovalentBondCount () == 1) a.setFormalCharge (1);
if ((i = this.bsAtomsForHs.nextClearBit (i + 1)) < 0) break;
}
});
$_M(c$, "finalizePdbMultipleBonds", 
function () {
var htKeysUsed =  new java.util.Hashtable ();
var bondCount = this.modelSet.bondCount;
var bonds = this.modelSet.bonds;
for (var i = this.baseBondIndex; i < bondCount; i++) {
var a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
var g = a1.getGroup ();
if (g !== a2.getGroup ()) continue;
var key =  new JU.SB ().append (g.getGroup3 ());
key.append (":");
var n1 = a1.getAtomName ();
var n2 = a2.getAtomName ();
if (n1.compareTo (n2) > 0) key.append (n2).append (":").append (n1);
 else key.append (n1).append (":").append (n2);
var skey = key.toString ();
var type = this.htBondMap.get (skey);
if (type == null) continue;
htKeysUsed.put (skey, Boolean.TRUE);
bonds[i].setOrder (JU.PT.parseInt (type));
}
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
if (key.indexOf (":") < 0) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}var value = this.htBondMap.get (key);
J.util.Logger.info ("bond " + key + " was not used; order=" + value);
if (this.htBondMap.get (key).equals ("1")) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}}
var htKeysBad =  new java.util.Hashtable ();
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
htKeysBad.put (key.substring (0, key.lastIndexOf (":")), this.htBondMap.get (key));
}
if (htKeysBad.isEmpty ()) return;
for (var i = 0; i < bondCount; i++) {
var a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
if (a1.getGroup () === a2.getGroup ()) continue;
var value;
if ((value = htKeysBad.get (a1.getGroup3 (false) + ":" + a1.getAtomName ())) == null && ((value = htKeysBad.get (a2.getGroup3 (false) + ":" + a2.getAtomName ())) == null)) continue;
bonds[i].setOrder (JU.PT.parseInt (value));
J.util.Logger.info ("assigning order " + bonds[i].order + " to bond " + bonds[i]);
}
});
$_M(c$, "setHydrogen", 
function (iTo, iAtom, name, pt) {
if (!this.bsAddedHydrogens.get (iAtom)) return;
var atoms = this.modelSet.atoms;
if (this.lastSetH == -2147483648 || atoms[iAtom].modelIndex != atoms[this.lastSetH].modelIndex) this.maxSerial = (this.modelSet.getModelAuxiliaryInfoValue (atoms[this.lastSetH = iAtom].modelIndex, "PDB_CONECT_firstAtom_count_max"))[2];
this.bsAddedHydrogens.clear (iAtom);
this.modelSet.setAtomName (iAtom, name);
atoms[iAtom].setT (pt);
this.modelSet.setAtomNumber (iAtom, ++this.maxSerial);
atoms[iAtom].setAtomSymmetry (atoms[iTo].getAtomSymmetry ());
this.modelLoader.undeleteAtom (iAtom);
this.modelSet.bondAtoms (atoms[iTo], atoms[iAtom], 1, this.modelSet.getDefaultMadFromOrder (1), null, 0, true, false);
}, "~N,~N,~S,JU.P3");
$_V(c$, "fixPropertyValue", 
function (bsAtoms, data) {
var aData = JU.PT.split (data, "\n");
var atoms = this.modelSet.atoms;
var newData =  new Array (bsAtoms.cardinality ());
var lastData = "";
for (var pt = 0, iAtom = 0, i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i), iAtom++) {
if (atoms[i].getElementNumber () != 1) lastData = aData[pt++];
newData[iAtom] = lastData;
}
return J.util.Txt.join (newData, '\n', 0);
}, "JU.BS,~S");
c$.allocateBioPolymer = $_M(c$, "allocateBioPolymer", 
function (groups, firstGroupIndex, checkConnections) {
var previous = null;
var count = 0;
for (var i = firstGroupIndex; i < groups.length; ++i) {
var group = groups[i];
var current;
if (!(Clazz_instanceOf (group, J.modelsetbio.Monomer)) || (current = group).bioPolymer != null || previous != null && previous.getClass () !== current.getClass () || checkConnections && !current.isConnectedAfter (previous)) break;
previous = current;
count++;
}
if (count == 0) return null;
var monomers =  new Array (count);
for (var j = 0; j < count; ++j) monomers[j] = groups[firstGroupIndex + j];

if (Clazz_instanceOf (previous, J.modelsetbio.AminoMonomer)) return  new J.modelsetbio.AminoPolymer (monomers);
if (Clazz_instanceOf (previous, J.modelsetbio.AlphaMonomer)) return  new J.modelsetbio.AlphaPolymer (monomers);
if (Clazz_instanceOf (previous, J.modelsetbio.NucleicMonomer)) return  new J.modelsetbio.NucleicPolymer (monomers);
if (Clazz_instanceOf (previous, J.modelsetbio.PhosphorusMonomer)) return  new J.modelsetbio.PhosphorusPolymer (monomers);
if (Clazz_instanceOf (previous, J.modelsetbio.CarbohydrateMonomer)) return  new J.modelsetbio.CarbohydratePolymer (monomers);
J.util.Logger.error ("Polymer.allocatePolymer() ... no matching polymer for monomor " + previous);
throw  new NullPointerException ();
}, "~A,~N,~B");
$_V(c$, "iterateOverAllNewStructures", 
function (adapter, atomSetCollection) {
var iterStructure = adapter.getStructureIterator (atomSetCollection);
if (iterStructure == null) return;
var bs = iterStructure.getStructuredModels ();
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.modelLoader.structuresDefinedInFile.set (this.modelLoader.baseModelIndex + i);

while (iterStructure.hasNext ()) if (iterStructure.getStructureType () !== J.constant.EnumStructure.TURN) this.setStructure (iterStructure);

iterStructure = adapter.getStructureIterator (atomSetCollection);
while (iterStructure.hasNext ()) if (iterStructure.getStructureType () === J.constant.EnumStructure.TURN) this.setStructure (iterStructure);

}, "J.api.JmolAdapter,~O");
$_M(c$, "setStructure", 
function (iterStructure) {
var t = iterStructure.getSubstructureType ();
var id = iterStructure.getStructureID ();
var serID = iterStructure.getSerialID ();
var count = iterStructure.getStrandCount ();
var atomRange = iterStructure.getAtomIndices ();
var modelRange = iterStructure.getModelIndices ();
if (this.bsAssigned == null) this.bsAssigned =  new JU.BS ();
this.defineStructure (t, id, serID, count, iterStructure.getStartChainID (), iterStructure.getStartSequenceNumber (), iterStructure.getStartInsertionCode (), iterStructure.getEndChainID (), iterStructure.getEndSequenceNumber (), iterStructure.getEndInsertionCode (), atomRange, modelRange, this.bsAssigned);
}, "J.api.JmolAdapterStructureIterator");
$_M(c$, "defineStructure", 
function (subType, structureID, serialID, strandCount, startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, atomRange, modelRange, bsAssigned) {
var type = (subType === J.constant.EnumStructure.NOT ? J.constant.EnumStructure.NONE : subType);
var startSeqCode = J.modelset.Group.getSeqcodeFor (startSequenceNumber, startInsertionCode);
var endSeqCode = J.modelset.Group.getSeqcodeFor (endSequenceNumber, endInsertionCode);
var models = this.modelSet.models;
if (this.modelLoader.isTrajectory) {
modelRange[1] = modelRange[0];
} else {
modelRange[0] += this.modelLoader.baseModelIndex;
modelRange[1] += this.modelLoader.baseModelIndex;
}this.modelLoader.structuresDefinedInFile.setBits (modelRange[0], modelRange[1] + 1);
for (var i = modelRange[0]; i <= modelRange[1]; i++) {
var i0 = models[i].firstAtomIndex;
if (Clazz_instanceOf (models[i], J.modelsetbio.BioModel)) (models[i]).addSecondaryStructure (type, structureID, serialID, strandCount, startChainID, startSeqCode, endChainID, endSeqCode, i0 + atomRange[0], i0 + atomRange[1], bsAssigned);
}
}, "J.constant.EnumStructure,~S,~N,~N,~N,~N,~S,~N,~N,~S,~A,~A,JU.BS");
c$.$Resolver$BondSorter$ = function () {
Clazz_pu$h ();
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
Clazz_instantialize (this, arguments);
}, J.modelsetbio.Resolver, "BondSorter", null, java.util.Comparator);
$_V(c$, "compare", 
function (a, b) {
return (b == null ? (a == null ? 0 : -1) : a == null ? 1 : a[0].compareTo (b[0]) < 0 ? -1 : a[0].compareTo (b[0]) > 0 ? 1 : a[3].compareTo (b[3]) < 0 ? -1 : a[3].compareTo (b[3]) > 0 ? 1 : a[1].compareTo (b[1]) < 0 ? -1 : a[1].compareTo (b[1]) > 0 ? 1 : 0);
}, "~A,~A");
c$ = Clazz_p0p ();
};
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelset.Group"], "J.modelsetbio.Monomer", ["java.lang.Float", "JU.P3", "J.constant.EnumStructure", "J.util.Logger", "$.Measure", "$.Quaternion", "J.viewer.JC"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bioPolymer = null;
this.offsets = null;
this.monomerIndex = 0;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "Monomer", J.modelset.Group);
c$.have = $_M(c$, "have", 
function (offsets, n) {
return (offsets[n] & 0xFF) != 0xFF;
}, "~A,~N");
$_M(c$, "set2", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, interestingAtomOffsets) {
this.setGroup (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
this.offsets = interestingAtomOffsets;
var offset = this.offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = firstAtomIndex + offset;
return this;
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
$_V(c$, "getGroups", 
function () {
return this.bioPolymer.getGroups ();
});
$_M(c$, "setBioPolymer", 
function (polymer, index) {
this.bioPolymer = polymer;
this.monomerIndex = index;
}, "J.modelsetbio.BioPolymer,~N");
$_V(c$, "getSelectedMonomerCount", 
function () {
return this.bioPolymer.getSelectedMonomerCount ();
});
$_V(c$, "getSelectedMonomerIndex", 
function () {
return (this.monomerIndex >= 0 && this.bioPolymer.isMonomerSelected (this.monomerIndex) ? this.monomerIndex : -1);
});
$_M(c$, "getBioPolymer", 
function () {
return this.bioPolymer;
});
$_V(c$, "getBioPolymerLength", 
function () {
return this.bioPolymer == null ? 0 : this.bioPolymer.monomerCount;
});
$_M(c$, "getMonomerIndex", 
function () {
return this.monomerIndex;
});
$_M(c$, "getBioPolymerIndexInModel", 
function () {
return (this.bioPolymer == null ? -1 : this.bioPolymer.bioPolymerIndexInModel);
});
c$.scanForOffsets = $_M(c$, "scanForOffsets", 
function (firstAtomIndex, specialAtomIndexes, interestingAtomIDs) {
var interestingCount = interestingAtomIDs.length;
var offsets =  Clazz_newByteArray (interestingCount, 0);
for (var i = interestingCount; --i >= 0; ) {
var atomIndex;
var atomID = interestingAtomIDs[i];
if (atomID < 0) {
atomIndex = specialAtomIndexes[~atomID];
} else {
atomIndex = specialAtomIndexes[atomID];
if (atomIndex < 0) return null;
}var offset;
if (atomIndex < 0) offset = 255;
 else {
offset = atomIndex - firstAtomIndex;
if (offset < 0 || offset > 254) {
J.util.Logger.warn ("Monomer.scanForOffsets i=" + i + " atomID=" + atomID + " atomIndex:" + atomIndex + " firstAtomIndex:" + firstAtomIndex + " offset out of 0-254 range. Groups aren't organized correctly. Is this really a protein?: " + offset);
if (atomID < 0) {
offset = 255;
} else {
}}}offsets[i] = offset;
}
return offsets;
}, "~N,~A,~A");
$_M(c$, "setStructure", 
function (proteinstructure) {
}, "J.modelsetbio.ProteinStructure");
$_M(c$, "getProteinStructure", 
function () {
return null;
});
$_V(c$, "getProteinStructureType", 
function () {
return J.constant.EnumStructure.NONE;
});
$_M(c$, "isHelix", 
function () {
return false;
});
$_M(c$, "isSheet", 
function () {
return false;
});
$_V(c$, "setStrucNo", 
function (id) {
}, "~N");
$_M(c$, "getAtomFromOffsetIndex", 
function (offsetIndex) {
if (offsetIndex > this.offsets.length) return null;
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}, "~N");
$_M(c$, "getSpecialAtom", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}}
return null;
}, "~A,~N");
$_M(c$, "getSpecialAtomPoint", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}}
return null;
}, "~A,~N");
$_V(c$, "isLeadAtom", 
function (atomIndex) {
return atomIndex == this.leadAtomIndex;
}, "~N");
$_V(c$, "getLeadAtom", 
function () {
return this.getAtomFromOffsetIndex (0);
});
$_M(c$, "getWingAtom", 
function () {
return this.getAtomFromOffsetIndex (1);
});
$_M(c$, "getInitiatorAtom", 
function () {
return this.getLeadAtom ();
});
$_M(c$, "getTerminatorAtom", 
function () {
return this.getLeadAtom ();
});
$_M(c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
}, "~N,~N,~A,~N,~N");
$_V(c$, "calcBioParameters", 
function () {
return this.bioPolymer.calcParameters ();
});
$_V(c$, "haveParameters", 
function () {
return this.bioPolymer.haveParameters;
});
$_M(c$, "getMyInfo", 
function () {
var info = this.getGroupInfo (this.groupIndex);
info.put ("chain", this.chain.getIDStr ());
var seqNum = this.getResno ();
if (seqNum > 0) info.put ("sequenceNumber", Integer.$valueOf (seqNum));
var insCode = this.getInsertionCode ();
if (insCode.charCodeAt (0) != 0) info.put ("insertionCode", "" + insCode);
var f = this.getGroupParameter (1112539145);
if (!Float.isNaN (f)) info.put ("phi", Float.$valueOf (f));
f = this.getGroupParameter (1112539146);
if (!Float.isNaN (f)) info.put ("psi", Float.$valueOf (f));
f = this.getGroupParameter (1112539141);
if (!Float.isNaN (f)) info.put ("mu", Float.$valueOf (f));
f = this.getGroupParameter (1112539152);
if (!Float.isNaN (f)) info.put ("theta", Float.$valueOf (f));
var structure = this.getProteinStructure ();
if (structure != null) {
info.put ("structureId", Integer.$valueOf (structure.strucNo));
info.put ("structureType", structure.type.getBioStructureTypeName (false));
}info.put ("shapeVisibilityFlags", Integer.$valueOf (this.shapeVisibilityFlags));
return info;
});
$_V(c$, "getStructureId", 
function () {
var structure = this.getProteinStructure ();
return (structure == null ? "" : structure.type.getBioStructureTypeName (false));
});
$_M(c$, "getConformation", 
function (atoms, bsConformation, conformationIndex) {
var ch = '\u0000';
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) {
var atom = atoms[i];
var altloc = atom.getAlternateLocationID ();
if (altloc == '\0') continue;
if (conformationIndex >= 0 && altloc != ch) {
ch = altloc;
conformationIndex--;
}if (conformationIndex < 0 && altloc != ch) bsConformation.clear (i);
}
}, "~A,JU.BS,~N");
$_M(c$, "updateOffsetsForAlternativeLocations", 
function (atoms, bsSelected) {
for (var offsetIndex = this.offsets.length; --offsetIndex >= 0; ) {
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) continue;
var iThis = this.firstAtomIndex + offset;
var atom = atoms[iThis];
var thisID = atom.getAtomID ();
if ((atom.getAlternateLocationID ()).charCodeAt (0) == 0) continue;
var nScan = this.lastAtomIndex - this.firstAtomIndex;
for (var i = 1; i <= nScan; i++) {
var iNew = iThis + i;
if (iNew > this.lastAtomIndex) iNew -= nScan + 1;
var offsetNew = iNew - this.firstAtomIndex;
if (offsetNew < 0 || offsetNew > 255 || iNew == iThis || !bsSelected.get (iNew)) continue;
var atomID = atoms[iNew].getAtomID ();
if (atomID != thisID || atomID == 0 && !atoms[iNew].getAtomName ().equals (atom.getAtomName ())) continue;
if (J.util.Logger.debugging) J.util.Logger.debug ("Chain.udateOffsetsForAlternativeLocation " + atoms[iNew] + " was " + atom);
this.offsets[offsetIndex] = offsetNew;
break;
}
}
}, "~A,JU.BS");
$_M(c$, "getMonomerSequenceAtoms", 
function (bsInclude, bsResult) {
this.selectAtoms (bsResult);
bsResult.and (bsInclude);
}, "JU.BS,JU.BS");
c$.checkOptional = $_M(c$, "checkOptional", 
function (offsets, atom, firstAtomIndex, index) {
if (J.modelsetbio.Monomer.have (offsets, atom)) return true;
if (index < 0) return false;
offsets[atom] = (index - firstAtomIndex);
return true;
}, "~A,~N,~N,~N");
$_M(c$, "getQuaternionFrameCenter", 
function (qtype) {
return null;
}, "~S");
$_M(c$, "getHelixData2", 
function (tokType, qType, mStep) {
var iPrev = this.monomerIndex - mStep;
var prev = (mStep < 1 || this.monomerIndex <= 0 ? null : this.bioPolymer.monomers[iPrev]);
var q2 = this.getQuaternion (qType);
var q1 = (mStep < 1 ? J.util.Quaternion.getQuaternionFrameV (J.viewer.JC.axisX, J.viewer.JC.axisY, J.viewer.JC.axisZ, false) : prev == null ? null : prev.getQuaternion (qType));
if (q1 == null || q2 == null) return this.getHelixData (tokType, qType, mStep);
var a = (mStep < 1 ? JU.P3.new3 (0, 0, 0) : prev.getQuaternionFrameCenter (qType));
var b = this.getQuaternionFrameCenter (qType);
if (a == null || b == null) return this.getHelixData (tokType, qType, mStep);
return J.util.Measure.computeHelicalAxis (tokType == 135176 ? "helixaxis" + this.getUniqueID () : null, tokType, a, b, q2.div (q1));
}, "~N,~S,~N");
$_M(c$, "getUniqueID", 
function () {
var cid = this.getChainID ();
var a = this.getLeadAtom ();
var id = (a == null ? "" : "_" + a.getModelIndex ()) + "_" + this.getResno () + (cid == 0 ? "" : "_" + cid);
var aid = (a == null ? '\0' : this.getLeadAtom ().getAlternateLocationID ());
if (aid != '\0') id += "_" + aid;
return id;
});
$_V(c$, "isCrossLinked", 
function (g) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, null, g)) return true;

return false;
}, "J.modelset.Group");
$_V(c$, "getCrossLinkLead", 
function (vReturn) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLink (i, vReturn) && vReturn == null) return true;

return false;
}, "JU.List");
$_M(c$, "getCrossLink", 
function (i, vReturn) {
return this.getCrossLinkGroup (i, vReturn, null);
}, "~N,JU.List");
$_M(c$, "getCrossLinkGroup", 
function (i, vReturn, group) {
var atom = this.chain.getAtom (i);
var bonds = atom.getBonds ();
var ibp = this.getBioPolymerIndexInModel ();
if (ibp < 0 || bonds == null) return false;
var haveCrossLink = false;
var checkPrevious = (vReturn == null && group == null);
for (var j = 0; j < bonds.length; j++) {
var a = bonds[j].getOtherAtom (atom);
var g = a.getGroup ();
if (group != null && g !== group) continue;
var iPolymer = g.getBioPolymerIndexInModel ();
var igroup = g.getMonomerIndex ();
if (checkPrevious) {
if (iPolymer == ibp && igroup == this.monomerIndex - 1) return true;
} else if (iPolymer >= 0 && igroup >= 0 && (iPolymer != ibp || igroup < this.monomerIndex - 1 || igroup > this.monomerIndex + 1)) {
haveCrossLink = true;
if (group != null) break;
vReturn.addLast (Integer.$valueOf (g.leadAtomIndex));
}}
return haveCrossLink;
}, "~N,JU.List,J.modelset.Group");
$_V(c$, "isConnectedPrevious", 
function () {
return true;
});
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.Monomer"], "J.modelsetbio.AlphaMonomer", ["JU.V3", "J.constant.EnumStructure", "J.modelsetbio.Helix", "$.Sheet", "$.Turn", "J.util.Quaternion"], function () {
c$ = Clazz_decorateAsClass (function () {
this.proteinStructure = null;
this.nitrogenHydrogenPoint = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "AlphaMonomer", J.modelsetbio.Monomer);
$_V(c$, "isProtein", 
function () {
return true;
});
c$.validateAndAllocateA = $_M(c$, "validateAndAllocateA", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[2] != firstIndex ? null :  new J.modelsetbio.AlphaMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, J.modelsetbio.AlphaMonomer.alphaOffsets));
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
Clazz_overrideConstructor (c$, 
function () {
});
$_M(c$, "isAlphaMonomer", 
function () {
return true;
});
$_V(c$, "getProteinStructure", 
function () {
return this.proteinStructure;
});
$_V(c$, "getStructure", 
function () {
return this.getProteinStructure ();
});
$_V(c$, "setStructure", 
function (proteinStructure) {
this.proteinStructure = proteinStructure;
if (proteinStructure == null) this.nitrogenHydrogenPoint = null;
}, "J.modelsetbio.ProteinStructure");
$_V(c$, "setStrucNo", 
function (n) {
if (this.proteinStructure != null) this.proteinStructure.strucNo = n;
}, "~N");
$_V(c$, "getProteinStructureType", 
function () {
return this.proteinStructure == null ? J.constant.EnumStructure.NONE : this.proteinStructure.type;
});
$_V(c$, "getProteinStructureSubType", 
function () {
return this.proteinStructure == null ? J.constant.EnumStructure.NONE : this.proteinStructure.subtype;
});
$_V(c$, "getStrucNo", 
function () {
return this.proteinStructure != null ? this.proteinStructure.strucNo : 0;
});
$_V(c$, "isHelix", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === J.constant.EnumStructure.HELIX;
});
$_V(c$, "isSheet", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === J.constant.EnumStructure.SHEET;
});
$_V(c$, "setProteinStructureType", 
function (type, monomerIndexCurrent) {
if (monomerIndexCurrent < 0 || monomerIndexCurrent > 0 && this.monomerIndex == 0) {
if (this.proteinStructure != null) {
var nAbandoned = this.proteinStructure.removeMonomer (this.monomerIndex);
if (nAbandoned > 0) this.getBioPolymer ().removeProteinStructure (this.monomerIndex + 1, nAbandoned);
}switch (type) {
case J.constant.EnumStructure.HELIX:
case J.constant.EnumStructure.HELIXALPHA:
case J.constant.EnumStructure.HELIX310:
case J.constant.EnumStructure.HELIXPI:
this.setStructure ( new J.modelsetbio.Helix (this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.constant.EnumStructure.SHEET:
this.setStructure ( new J.modelsetbio.Sheet (this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.constant.EnumStructure.TURN:
this.setStructure ( new J.modelsetbio.Turn (this.bioPolymer, this.monomerIndex, 1));
break;
case J.constant.EnumStructure.NONE:
this.setStructure (null);
}
} else {
this.setStructure (this.getBioPolymer ().getProteinStructure (monomerIndexCurrent));
if (this.proteinStructure != null) this.proteinStructure.addMonomer (this.monomerIndex);
}return this.monomerIndex;
}, "J.constant.EnumStructure,~N");
$_M(c$, "getAtom", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
$_M(c$, "getAtomPoint", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var atom1 = this.getLeadAtom ();
var atom2 = possiblyPreviousMonomer.getLeadAtom ();
return atom1.isBonded (atom2) || atom1.distance (atom2) <= 4.2;
}, "J.modelsetbio.Monomer");
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getQuaternionFrameCenterAlpha (qType);
}, "~S");
$_V(c$, "isWithinStructure", 
function (type) {
var s = this.getStructure ();
return (s != null && s.type === type && s.isWithin (this.monomerIndex));
}, "J.constant.EnumStructure");
$_M(c$, "getQuaternionFrameCenterAlpha", 
function (qType) {
switch (qType) {
case 'b':
case 'c':
case 'C':
case 'x':
return this.getLeadAtom ();
default:
case 'a':
case 'n':
case 'p':
case 'P':
case 'q':
return null;
}
}, "~S");
$_V(c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
$_V(c$, "getQuaternion", 
function (qType) {
return this.getQuaternionAlpha (qType);
}, "~S");
$_M(c$, "getQuaternionAlpha", 
function (qType) {
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
default:
case 'a':
case 'n':
case 'p':
case 'q':
return null;
case 'b':
case 'c':
case 'x':
if (this.monomerIndex == 0 || this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var ptCa = this.getLeadAtom ();
var ptCaNext = this.bioPolymer.getLeadPoint (this.monomerIndex + 1);
var ptCaPrev = this.bioPolymer.getLeadPoint (this.monomerIndex - 1);
vA.sub2 (ptCaNext, ptCa);
vB.sub2 (ptCaPrev, ptCa);
break;
}
return J.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz_defineStatics (c$,
"alphaOffsets", [0]);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["JU.V3"], "J.modelsetbio.ProteinStructure", ["JU.AU", "$.P3", "J.util.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.type = null;
this.subtype = null;
this.structureID = null;
this.strucNo = 0;
this.serialID = 0;
this.strandCount = 0;
this.apolymer = null;
this.monomerIndexFirst = 0;
this.monomerCount = 0;
this.axisA = null;
this.axisB = null;
this.axisUnitVector = null;
this.vectorProjection = null;
this.monomerIndexLast = 0;
this.segments = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "ProteinStructure");
Clazz_prepareFields (c$, function () {
this.vectorProjection =  new JU.V3 ();
});
$_M(c$, "setupPS", 
function (apolymer, type, monomerIndex, monomerCount) {
this.strucNo = ++J.modelsetbio.ProteinStructure.globalStrucNo;
this.apolymer = apolymer;
this.type = type;
this.monomerIndexFirst = monomerIndex;
this.addMonomer (monomerIndex + monomerCount - 1);
if (J.util.Logger.debugging) J.util.Logger.debug ("Creating ProteinStructure " + this.strucNo + " " + type.getBioStructureTypeName (false) + " from " + this.monomerIndexFirst + " through " + this.monomerIndexLast + " in polymer " + apolymer);
}, "J.modelsetbio.AlphaPolymer,J.constant.EnumStructure,~N,~N");
$_M(c$, "addMonomer", 
function (index) {
this.monomerIndexFirst = Math.min (this.monomerIndexFirst, index);
this.monomerIndexLast = Math.max (this.monomerIndexLast, index);
this.monomerCount = this.monomerIndexLast - this.monomerIndexFirst + 1;
}, "~N");
$_M(c$, "removeMonomer", 
function (monomerIndex) {
if (monomerIndex > this.monomerIndexLast || monomerIndex < this.monomerIndexFirst) return 0;
var ret = this.monomerIndexLast - monomerIndex;
this.monomerIndexLast = Math.max (this.monomerIndexFirst, monomerIndex) - 1;
this.monomerCount = this.monomerIndexLast - this.monomerIndexFirst + 1;
return ret;
}, "~N");
$_M(c$, "calcAxis", 
function () {
});
$_M(c$, "calcSegments", 
function () {
if (this.segments != null) return;
this.calcAxis ();
this.segments =  new Array (this.monomerCount + 1);
this.segments[this.monomerCount] = this.axisB;
this.segments[0] = this.axisA;
var axis = JU.V3.newV (this.axisUnitVector);
axis.scale (this.axisB.distance (this.axisA) / this.monomerCount);
for (var i = 1; i < this.monomerCount; i++) {
var point = this.segments[i] =  new JU.P3 ();
point.add2 (this.segments[i - 1], axis);
}
});
$_M(c$, "lowerNeighborIsHelixOrSheet", 
function () {
if (this.monomerIndexFirst == 0) return false;
return this.apolymer.monomers[this.monomerIndexFirst - 1].isHelix () || this.apolymer.monomers[this.monomerIndexFirst - 1].isSheet ();
});
$_M(c$, "upperNeighborIsHelixOrSheet", 
function () {
var upperNeighborIndex = this.monomerIndexFirst + this.monomerCount;
if (upperNeighborIndex == this.apolymer.monomerCount) return false;
return this.apolymer.monomers[upperNeighborIndex].isHelix () || this.apolymer.monomers[upperNeighborIndex].isSheet ();
});
$_M(c$, "getMonomerCount", 
function () {
return this.monomerCount;
});
$_M(c$, "isWithin", 
function (monomerIndex) {
return (monomerIndex > this.monomerIndexFirst && monomerIndex < this.monomerIndexLast);
}, "~N");
$_M(c$, "getMonomerIndex", 
function () {
return this.monomerIndexFirst;
});
$_M(c$, "getIndex", 
function (monomer) {
var monomers = this.apolymer.monomers;
var i;
for (i = this.monomerCount; --i >= 0; ) if (monomers[this.monomerIndexFirst + i] === monomer) break;

return i;
}, "J.modelsetbio.Monomer");
$_M(c$, "getSegments", 
function () {
if (this.segments == null) this.calcSegments ();
return this.segments;
});
$_M(c$, "getAxisStartPoint", 
function () {
this.calcAxis ();
return this.axisA;
});
$_M(c$, "getAxisEndPoint", 
function () {
this.calcAxis ();
return this.axisB;
});
$_M(c$, "getStructureMidPoint", 
function (index) {
if (this.segments == null) this.calcSegments ();
return this.segments[index];
}, "~N");
$_M(c$, "getInfo", 
function (info) {
info.put ("type", this.type.getBioStructureTypeName (false));
var leadAtomIndices = this.apolymer.getLeadAtomIndices ();
var iArray = JU.AU.arrayCopyRangeI (leadAtomIndices, this.monomerIndexFirst, this.monomerIndexFirst + this.monomerCount);
info.put ("leadAtomIndices", iArray);
this.calcAxis ();
if (this.axisA == null) return;
info.put ("axisA", this.axisA);
info.put ("axisB", this.axisB);
info.put ("axisUnitVector", this.axisUnitVector);
}, "java.util.Map");
$_M(c$, "resetAxes", 
function () {
this.axisA = null;
this.segments = null;
});
Clazz_defineStatics (c$,
"globalStrucNo", 1000);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.ProteinStructure"], "J.modelsetbio.Helix", ["JU.P3", "$.V3", "J.constant.EnumStructure", "J.util.Measure"], function () {
c$ = Clazz_declareType (J.modelsetbio, "Helix", J.modelsetbio.ProteinStructure);
Clazz_makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
Clazz_superConstructor (this, J.modelsetbio.Helix, []);
this.setupPS (apolymer, J.constant.EnumStructure.HELIX, monomerIndex, monomerCount);
this.subtype = subtype;
}, "J.modelsetbio.AlphaPolymer,~N,~N,J.constant.EnumStructure");
$_V(c$, "calcAxis", 
function () {
if (this.axisA != null) return;
var points =  new Array (this.monomerCount + 1);
for (var i = 0; i <= this.monomerCount; i++) {
points[i] =  new JU.P3 ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + i, points[i]);
}
this.axisA =  new JU.P3 ();
this.axisUnitVector =  new JU.V3 ();
J.util.Measure.calcBestAxisThroughPoints (points, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = JU.P3.newP (points[this.monomerCount]);
J.util.Measure.projectOntoAxis (this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.ProteinStructure"], "J.modelsetbio.Sheet", ["JU.P3", "$.V3", "J.constant.EnumStructure", "J.modelsetbio.AminoPolymer", "J.util.Measure"], function () {
c$ = Clazz_decorateAsClass (function () {
this.alphaPolymer = null;
this.widthUnitVector = null;
this.heightUnitVector = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "Sheet", J.modelsetbio.ProteinStructure);
Clazz_makeConstructor (c$, 
function (alphaPolymer, monomerIndex, monomerCount, subtype) {
Clazz_superConstructor (this, J.modelsetbio.Sheet, []);
this.setupPS (alphaPolymer, J.constant.EnumStructure.SHEET, monomerIndex, monomerCount);
this.alphaPolymer = alphaPolymer;
this.subtype = subtype;
}, "J.modelsetbio.AlphaPolymer,~N,~N,J.constant.EnumStructure");
$_V(c$, "calcAxis", 
function () {
if (this.axisA != null) return;
if (this.monomerCount == 2) {
this.axisA = this.alphaPolymer.getLeadPoint (this.monomerIndexFirst);
this.axisB = this.alphaPolymer.getLeadPoint (this.monomerIndexFirst + 1);
} else {
this.axisA =  new JU.P3 ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + 1, this.axisA);
this.axisB =  new JU.P3 ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + this.monomerCount - 1, this.axisB);
}this.axisUnitVector =  new JU.V3 ();
this.axisUnitVector.sub2 (this.axisB, this.axisA);
this.axisUnitVector.normalize ();
var tempA =  new JU.P3 ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst, tempA);
if (this.lowerNeighborIsHelixOrSheet ()) {
} else {
J.util.Measure.projectOntoAxis (tempA, this.axisA, this.axisUnitVector, this.vectorProjection);
}var tempB =  new JU.P3 ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + this.monomerCount, tempB);
if (this.upperNeighborIsHelixOrSheet ()) {
} else {
J.util.Measure.projectOntoAxis (tempB, this.axisA, this.axisUnitVector, this.vectorProjection);
}this.axisA = tempA;
this.axisB = tempB;
});
$_M(c$, "calcSheetUnitVectors", 
function () {
if (!(Clazz_instanceOf (this.alphaPolymer, J.modelsetbio.AminoPolymer))) return;
if (this.widthUnitVector == null) {
var vectorCO =  new JU.V3 ();
var vectorCOSum =  new JU.V3 ();
var amino = this.alphaPolymer.monomers[this.monomerIndexFirst];
vectorCOSum.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
for (var i = this.monomerCount; --i > this.monomerIndexFirst; ) {
amino = this.alphaPolymer.monomers[i];
vectorCO.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
if (vectorCOSum.angle (vectorCO) < 1.5707964) vectorCOSum.add (vectorCO);
 else vectorCOSum.sub (vectorCO);
}
this.heightUnitVector = vectorCO;
this.heightUnitVector.cross (this.axisUnitVector, vectorCOSum);
this.heightUnitVector.normalize ();
this.widthUnitVector = vectorCOSum;
this.widthUnitVector.cross (this.axisUnitVector, this.heightUnitVector);
}});
$_M(c$, "getWidthUnitVector", 
function () {
if (this.widthUnitVector == null) this.calcSheetUnitVectors ();
return this.widthUnitVector;
});
$_M(c$, "getHeightUnitVector", 
function () {
if (this.heightUnitVector == null) this.calcSheetUnitVectors ();
return this.heightUnitVector;
});
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.ProteinStructure"], "J.modelsetbio.Turn", ["J.constant.EnumStructure"], function () {
c$ = Clazz_declareType (J.modelsetbio, "Turn", J.modelsetbio.ProteinStructure);
Clazz_makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount) {
Clazz_superConstructor (this, J.modelsetbio.Turn, []);
this.setupPS (apolymer, J.constant.EnumStructure.TURN, monomerIndex, monomerCount);
this.subtype = J.constant.EnumStructure.TURN;
}, "J.modelsetbio.AlphaPolymer,~N,~N");
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["JU.V3"], "J.modelsetbio.BioPolymer", ["java.lang.Float", "java.util.Hashtable", "JU.BS", "$.List", "$.P3", "J.util.Escape", "$.Logger", "$.Quaternion", "$.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.monomers = null;
this.model = null;
this.leadMidpoints = null;
this.leadPoints = null;
this.controlPoints = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.type = 0;
this.bioPolymerIndexInModel = 0;
this.monomerCount = 0;
this.invalidLead = false;
this.invalidControl = false;
this.sheetSmoothing = 0;
this.hasWingPoints = false;
this.reversed = null;
this.twistedSheets = false;
this.unitVectorX = null;
this.selectedMonomerCount = 0;
this.bsSelectedMonomers = null;
this.haveParameters = false;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "BioPolymer");
Clazz_prepareFields (c$, function () {
this.unitVectorX = JU.V3.new3 (1, 0, 0);
});
$_M(c$, "getGroups", 
function () {
return this.monomers;
});
Clazz_makeConstructor (c$, 
function (monomers) {
this.monomers = monomers;
this.monomerCount = monomers.length;
for (var i = this.monomerCount; --i >= 0; ) monomers[i].setBioPolymer (this, i);

this.model = monomers[0].getModel ();
}, "~A");
$_M(c$, "getRange", 
function (bs) {
if (this.monomerCount == 0) return;
bs.setBits (this.monomers[0].firstAtomIndex, this.monomers[this.monomerCount - 1].lastAtomIndex + 1);
}, "JU.BS");
$_M(c$, "clearStructures", 
function () {
for (var i = 0; i < this.monomerCount; i++) this.monomers[i].setStructure (null);

});
$_M(c$, "removeProteinStructure", 
function (monomerIndex, count) {
var m = this.monomers[monomerIndex];
var type = m.getProteinStructureType ();
var mLast = -1;
for (var i = 0, pt = monomerIndex; i < count && pt < this.monomerCount; i++, pt++) {
this.monomers[pt].setStructure (null);
mLast = this.monomers[pt].setProteinStructureType (type, mLast);
}
}, "~N,~N");
$_M(c$, "getLeadAtomIndices", 
function () {
if (this.leadAtomIndices == null) {
this.leadAtomIndices =  Clazz_newIntArray (this.monomerCount, 0);
this.invalidLead = true;
}if (this.invalidLead) {
for (var i = this.monomerCount; --i >= 0; ) this.leadAtomIndices[i] = this.monomers[i].leadAtomIndex;

this.invalidLead = false;
}return this.leadAtomIndices;
});
$_M(c$, "getIndex", 
function (chainID, seqcode, istart, iend) {
var i;
for (i = this.monomerCount; --i >= 0; ) {
var m = this.monomers[i];
if (m.chain.chainID == chainID && m.seqcode == seqcode && (istart < 0 || istart == m.firstAtomIndex || iend == m.lastAtomIndex)) break;
}
return i;
}, "~N,~N,~N,~N");
$_M(c$, "getLeadPoint", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
$_M(c$, "getInitiatorPoint", 
function () {
return this.monomers[0].getInitiatorAtom ();
});
$_M(c$, "getTerminatorPoint", 
function () {
return this.monomers[this.monomerCount - 1].getTerminatorAtom ();
});
$_M(c$, "getLeadMidPoint", 
function (groupIndex, midPoint) {
if (groupIndex == this.monomerCount) {
--groupIndex;
} else if (groupIndex > 0) {
midPoint.ave (this.getLeadPoint (groupIndex), this.getLeadPoint (groupIndex - 1));
return;
}midPoint.setT (this.getLeadPoint (groupIndex));
}, "~N,JU.P3");
$_M(c$, "getWingPoint", 
function (polymerIndex) {
return this.monomers[polymerIndex].getWingAtom ();
}, "~N");
$_M(c$, "getConformation", 
function (bsConformation, conformationIndex) {
var atoms = this.model.getModelSet ().atoms;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].getConformation (atoms, bsConformation, conformationIndex);

this.recalculateLeadMidpointsAndWingVectors ();
}, "JU.BS,~N");
$_M(c$, "setConformation", 
function (bsSelected) {
var atoms = this.model.getModelSet ().atoms;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].updateOffsetsForAlternativeLocations (atoms, bsSelected);

this.recalculateLeadMidpointsAndWingVectors ();
}, "JU.BS");
$_M(c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
this.invalidLead = this.invalidControl = true;
this.getLeadAtomIndices ();
this.resetHydrogenPoints ();
this.calcLeadMidpointsAndWingVectors ();
});
$_M(c$, "resetHydrogenPoints", 
function () {
});
$_M(c$, "getLeadMidpoints", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadMidpoints;
});
$_M(c$, "getLeadPoints", 
function () {
if (this.leadPoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadPoints;
});
$_M(c$, "getControlPoints", 
function (isTraceAlpha, sheetSmoothing, invalidate) {
if (invalidate) this.invalidControl = true;
return (!isTraceAlpha ? this.leadMidpoints : sheetSmoothing == 0 ? this.leadPoints : this.getControlPoints2 (sheetSmoothing));
}, "~B,~N,~B");
$_M(c$, "getControlPoints2", 
function (sheetSmoothing) {
if (!this.invalidControl && sheetSmoothing == this.sheetSmoothing) return this.controlPoints;
this.getLeadPoints ();
var v =  new JU.V3 ();
if (this.controlPoints == null) this.controlPoints =  new Array (this.monomerCount + 1);
if (!Float.isNaN (sheetSmoothing)) this.sheetSmoothing = sheetSmoothing;
for (var i = 0; i < this.monomerCount; i++) this.controlPoints[i] = this.getControlPoint (i, v);

this.controlPoints[this.monomerCount] = this.getTerminatorPoint ();
this.invalidControl = false;
return this.controlPoints;
}, "~N");
$_M(c$, "getControlPoint", 
function (i, v) {
return this.leadPoints[i];
}, "~N,JU.V3");
$_M(c$, "getWingVectors", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.wingVectors;
});
$_M(c$, "calcLeadMidpointsAndWingVectors", 
function () {
if (this.leadMidpoints == null) {
this.leadMidpoints =  new Array (this.monomerCount + 1);
this.leadPoints =  new Array (this.monomerCount + 1);
this.wingVectors =  new Array (this.monomerCount + 1);
this.sheetSmoothing = 1.4E-45;
}if (this.reversed == null) this.reversed = JU.BS.newN (this.monomerCount);
 else this.reversed.clearAll ();
this.twistedSheets = this.model.modelSet.viewer.getBoolean (603979968);
var vectorA =  new JU.V3 ();
var vectorB =  new JU.V3 ();
var vectorC =  new JU.V3 ();
var vectorD =  new JU.V3 ();
var leadPointPrev;
var leadPoint;
this.leadMidpoints[0] = this.getInitiatorPoint ();
this.leadPoints[0] = leadPoint = this.getLeadPoint (0);
var previousVectorD = null;
for (var i = 1; i < this.monomerCount; ++i) {
leadPointPrev = leadPoint;
this.leadPoints[i] = leadPoint = this.getLeadPoint (i);
var midpoint =  new JU.P3 ();
midpoint.ave (leadPoint, leadPointPrev);
this.leadMidpoints[i] = midpoint;
if (this.hasWingPoints) {
vectorA.sub2 (leadPoint, leadPointPrev);
vectorB.sub2 (leadPointPrev, this.getWingPoint (i - 1));
vectorC.cross (vectorA, vectorB);
vectorD.cross (vectorA, vectorC);
vectorD.normalize ();
if (!this.twistedSheets && previousVectorD != null && previousVectorD.angle (vectorD) > 1.5707963267948966) {
this.reversed.set (i);
vectorD.scale (-1);
}previousVectorD = this.wingVectors[i] = JU.V3.newV (vectorD);
}}
this.leadPoints[this.monomerCount] = this.leadMidpoints[this.monomerCount] = this.getTerminatorPoint ();
if (!this.hasWingPoints) {
if (this.monomerCount < 3) {
this.wingVectors[1] = this.unitVectorX;
} else {
var previousVectorC = null;
for (var i = 1; i < this.monomerCount; ++i) {
vectorA.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
vectorB.sub2 (this.leadPoints[i], this.leadMidpoints[i + 1]);
vectorC.cross (vectorA, vectorB);
vectorC.normalize ();
if (previousVectorC != null && previousVectorC.angle (vectorC) > 1.5707963267948966) vectorC.scale (-1);
previousVectorC = this.wingVectors[i] = JU.V3.newV (vectorC);
}
}}this.wingVectors[0] = this.wingVectors[1];
this.wingVectors[this.monomerCount] = this.wingVectors[this.monomerCount - 1];
});
$_M(c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, mads, myVisibilityFlag, bsNot) {
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & myVisibilityFlag) == 0) continue;
var a = this.monomers[i].getLeadAtom ();
if (!a.isVisible (0) || bsNot != null && bsNot.get (a.index)) continue;
if (mads[i] > 0 || mads[i + 1] > 0) this.monomers[i].findNearestAtomIndex (xMouse, yMouse, closest, mads[i], mads[i + 1]);
}
}, "~N,~N,~A,~A,~N,JU.BS");
$_M(c$, "getSelectedMonomerCount", 
function () {
return this.selectedMonomerCount;
});
$_M(c$, "calcSelectedMonomersCount", 
function (bsSelected) {
this.selectedMonomerCount = 0;
if (this.bsSelectedMonomers == null) this.bsSelectedMonomers =  new JU.BS ();
this.bsSelectedMonomers.clearAll ();
for (var i = 0; i < this.monomerCount; i++) {
if (this.monomers[i].isSelected (bsSelected)) {
++this.selectedMonomerCount;
this.bsSelectedMonomers.set (i);
}}
}, "JU.BS");
$_M(c$, "isMonomerSelected", 
function (i) {
return (i >= 0 && this.bsSelectedMonomers.get (i));
}, "~N");
$_M(c$, "getPolymerPointsAndVectors", 
function (last, bs, vList, isTraceAlpha, sheetSmoothing) {
var points = this.getControlPoints (isTraceAlpha, sheetSmoothing, false);
var vectors = this.getWingVectors ();
var count = this.monomerCount;
for (var j = 0; j < count; j++) if (bs.get (this.monomers[j].leadAtomIndex)) {
vList.addLast ([points[j], JU.P3.newP (vectors[j])]);
last = j;
} else if (last != 2147483646) {
vList.addLast ([points[j], JU.P3.newP (vectors[j])]);
last = 2147483646;
}
if (last + 1 < count) vList.addLast ([points[last + 1], JU.P3.newP (vectors[last + 1])]);
return last;
}, "~N,JU.BS,JU.List,~B,~N");
$_M(c$, "getSequence", 
function () {
var buf =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount; i++) buf[i] = this.monomers[i].getGroup1 ();

return String.valueOf (buf);
});
$_M(c$, "getPolymerInfo", 
function (bs) {
var returnInfo =  new java.util.Hashtable ();
var info =  new JU.List ();
var structureInfo = null;
var ps;
var psLast = null;
var n = 0;
for (var i = 0; i < this.monomerCount; i++) {
if (bs.get (this.monomers[i].leadAtomIndex)) {
var monomerInfo = this.monomers[i].getMyInfo ();
monomerInfo.put ("monomerIndex", Integer.$valueOf (i));
info.addLast (monomerInfo);
if ((ps = this.getProteinStructure (i)) != null && ps !== psLast) {
var psInfo =  new java.util.Hashtable ();
(psLast = ps).getInfo (psInfo);
if (structureInfo == null) {
structureInfo =  new JU.List ();
}psInfo.put ("index", Integer.$valueOf (n++));
structureInfo.addLast (psInfo);
}}}
if (info.size () > 0) {
returnInfo.put ("sequence", this.getSequence ());
returnInfo.put ("monomers", info);
if (structureInfo != null) returnInfo.put ("structures", structureInfo);
}return returnInfo;
}, "JU.BS");
$_M(c$, "getPolymerSequenceAtoms", 
function (group1, nGroups, bsInclude, bsResult) {
for (var i = Math.min (this.monomerCount, group1 + nGroups); --i >= group1; ) this.monomers[i].getMonomerSequenceAtoms (bsInclude, bsResult);

}, "~N,~N,JU.BS,JU.BS");
$_M(c$, "getProteinStructure", 
function (monomerIndex) {
return this.monomers[monomerIndex].getProteinStructure ();
}, "~N");
$_M(c$, "calcParameters", 
function () {
this.haveParameters = true;
return this.calcEtaThetaAngles () || this.calcPhiPsiAngles ();
});
$_M(c$, "calcEtaThetaAngles", 
function () {
return false;
});
$_M(c$, "calcPhiPsiAngles", 
function () {
return false;
});
c$.getPdbData = $_M(c$, "getPdbData", 
function (viewer, p, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
var calcRamachandranStraightness = (qtype == 'C' || qtype == 'P');
var isRamachandran = (ctype == 'R' || ctype == 'S' && calcRamachandranStraightness);
if (isRamachandran && !p.calcPhiPsiAngles ()) return;
var isAmino = (Clazz_instanceOf (p, J.modelsetbio.AminoPolymer));
var isRelativeAlias = (ctype == 'r');
var quaternionStraightness = (!isRamachandran && ctype == 'S');
if (derivType == 2 && isRelativeAlias) ctype = 'w';
if (quaternionStraightness) derivType = 2;
var useQuaternionStraightness = (ctype == 'S');
var writeRamachandranStraightness = ("rcpCP".indexOf (qtype) >= 0);
if (J.util.Logger.debugging && (quaternionStraightness || calcRamachandranStraightness)) {
J.util.Logger.debug ("For straightness calculation: useQuaternionStraightness = " + useQuaternionStraightness + " and quaternionFrame = " + qtype);
}if (addHeader && !isDraw) {
pdbATOM.append ("REMARK   6    AT GRP CH RESNO  ");
switch (ctype) {
default:
case 'w':
pdbATOM.append ("x*10___ y*10___ z*10___      w*10__       ");
break;
case 'x':
pdbATOM.append ("y*10___ z*10___ w*10___      x*10__       ");
break;
case 'y':
pdbATOM.append ("z*10___ w*10___ x*10___      y*10__       ");
break;
case 'z':
pdbATOM.append ("w*10___ x*10___ y*10___      z*10__       ");
break;
case 'R':
if (writeRamachandranStraightness) pdbATOM.append ("phi____ psi____ theta         Straightness");
 else pdbATOM.append ("phi____ psi____ omega-180    PartialCharge");
break;
}
pdbATOM.append ("    Sym   q0_______ q1_______ q2_______ q3_______");
pdbATOM.append ("  theta_  aaX_______ aaY_______ aaZ_______");
if (ctype != 'R') pdbATOM.append ("  centerX___ centerY___ centerZ___");
if (qtype == 'n') pdbATOM.append ("  NHX_______ NHY_______ NHZ_______");
pdbATOM.append ("\n\n");
}var factor = (ctype == 'R' ? 1 : 10);
bothEnds = false;
for (var j = 0; j < (bothEnds ? 2 : 1); j++, factor *= -1) for (var i = 0; i < (mStep < 1 ? 1 : mStep); i++) J.modelsetbio.BioPolymer.getData (viewer, i, mStep, p, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten);


}, "J.viewer.Viewer,J.modelsetbio.BioPolymer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS");
c$.getData = $_M(c$, "getData", 
function (viewer, m0, mStep, p, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten) {
var prefix = (derivType > 0 ? "dq" + (derivType == 2 ? "2" : "") : "q");
var q;
var aprev = null;
var qprev = null;
var dq = null;
var dqprev = null;
var qref = null;
var atomLast = null;
var x = 0;
var y = 0;
var z = 0;
var w = 0;
var strExtra = "";
var val1 = NaN;
var val2 = NaN;
var pt = (isDraw ?  new JU.P3 () : null);
var dm = (mStep <= 1 ? 1 : mStep);
for (var m = m0; m < p.monomerCount; m += dm) {
var monomer = p.monomers[m];
if (bsAtoms == null || bsAtoms.get (monomer.leadAtomIndex)) {
var a = monomer.getLeadAtom ();
var id = monomer.getUniqueID ();
if (isRamachandran) {
if (ctype == 'S') monomer.setGroupParameter (1112539150, NaN);
x = monomer.getGroupParameter (1112539145);
y = monomer.getGroupParameter (1112539146);
z = monomer.getGroupParameter (1112539144);
if (z < -90) z += 360;
z -= 180;
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) {
if (bsAtoms != null) bsAtoms.clear (a.getIndex ());
continue;
}var angledeg = (writeRamachandranStraightness ? p.calculateRamachandranHelixAngle (m, qtype) : 0);
var straightness = (calcRamachandranStraightness || writeRamachandranStraightness ? J.modelsetbio.BioPolymer.getStraightness (Math.cos (angledeg / 2 / 180 * 3.141592653589793)) : 0);
if (ctype == 'S') {
monomer.setGroupParameter (1112539150, straightness);
continue;
}if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var aa = monomer;
pt.set (-x, x, 0.5);
pdbATOM.append ("draw ID \"phi").append (id).append ("\" ARROW ARC ").append (J.util.Escape.eP (aa.getNitrogenAtom ())).append (J.util.Escape.eP (a)).append (J.util.Escape.eP (aa.getCarbonylCarbonAtom ())).append (J.util.Escape.eP (pt)).append (" \"phi = ").append (String.valueOf (Math.round (x))).append ("\" color ").append (J.modelsetbio.BioPolymer.qColor[2]).append ("\n");
pt.set (0, y, 0.5);
pdbATOM.append ("draw ID \"psi").append (id).append ("\" ARROW ARC ").append (J.util.Escape.eP (a)).append (J.util.Escape.eP (aa.getCarbonylCarbonAtom ())).append (J.util.Escape.eP (aa.getNitrogenAtom ())).append (J.util.Escape.eP (pt)).append (" \"psi = ").append (String.valueOf (Math.round (y))).append ("\" color ").append (J.modelsetbio.BioPolymer.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeNCC").append (id).append ("\" ").append (J.util.Escape.eP (aa.getNitrogenAtom ())).append (J.util.Escape.eP (a)).append (J.util.Escape.eP (aa.getCarbonylCarbonAtom ())).append (" color ").append (J.modelsetbio.BioPolymer.qColor[0]).append ("\n");
pdbATOM.append ("draw ID \"planeCNC").append (id).append ("\" ").append (J.util.Escape.eP ((p.monomers[m - 1]).getCarbonylCarbonAtom ())).append (J.util.Escape.eP (aa.getNitrogenAtom ())).append (J.util.Escape.eP (a)).append (" color ").append (J.modelsetbio.BioPolymer.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeCCN").append (id).append ("\" ").append (J.util.Escape.eP (a)).append (J.util.Escape.eP (aa.getCarbonylCarbonAtom ())).append (J.util.Escape.eP ((p.monomers[m + 1]).getNitrogenAtom ())).append (" color ").append (J.modelsetbio.BioPolymer.qColor[2]).append ("\n");
continue;
}if (Float.isNaN (angledeg)) {
strExtra = "";
if (writeRamachandranStraightness) continue;
} else {
q = J.util.Quaternion.newVA (JU.P3.new3 (1, 0, 0), angledeg);
strExtra = q.getInfo ();
if (writeRamachandranStraightness) {
z = angledeg;
w = straightness;
} else {
w = a.getPartialCharge ();
}}} else {
q = monomer.getQuaternion (qtype);
if (q != null) {
q.setRef (qref);
qref = J.util.Quaternion.newQ (q);
}if (derivType == 2) monomer.setGroupParameter (1112539150, NaN);
if (q == null) {
qprev = null;
qref = null;
} else if (derivType > 0) {
var anext = a;
var qnext = q;
if (qprev == null) {
q = null;
dqprev = null;
} else {
if (isRelativeAlias) {
dq = qprev.leftDifference (q);
} else {
dq = q.rightDifference (qprev);
}if (derivType == 1) {
q = dq;
} else if (dqprev == null) {
q = null;
} else {
q = dq.rightDifference (dqprev);
val1 = J.modelsetbio.BioPolymer.getQuaternionStraightness (id, dqprev, dq);
val2 = J.modelsetbio.BioPolymer.get3DStraightness (id, dqprev, dq);
aprev.getGroup ().setGroupParameter (1112539150, useQuaternionStraightness ? val1 : val2);
}dqprev = dq;
}aprev = anext;
qprev = qnext;
}if (q == null) {
atomLast = null;
continue;
}switch (ctype) {
default:
x = q.q1;
y = q.q2;
z = q.q3;
w = q.q0;
break;
case 'x':
x = q.q0;
y = q.q1;
z = q.q2;
w = q.q3;
break;
case 'y':
x = q.q3;
y = q.q0;
z = q.q1;
w = q.q2;
break;
case 'z':
x = q.q2;
y = q.q3;
z = q.q0;
w = q.q1;
break;
}
var ptCenter = monomer.getQuaternionFrameCenter (qtype);
if (ptCenter == null) ptCenter =  new JU.P3 ();
if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var deg = Clazz_doubleToInt (Math.floor (Math.acos (w) * 360 / 3.141592653589793));
if (derivType == 0) {
pdbATOM.append (q.draw (prefix, id, ptCenter, 1));
if (qtype == 'n' && isAmino) {
var ptH = (monomer).getNitrogenHydrogenPoint ();
if (ptH != null) pdbATOM.append ("draw ID \"").append (prefix).append ("nh").append (id).append ("\" width 0.1 ").append (J.util.Escape.eP (ptH)).append ("\n");
}}if (derivType == 1) {
pdbATOM.append (monomer.getHelixData (135176, qtype, mStep)).append ("\n");
continue;
}pt.set (x * 2, y * 2, z * 2);
pdbATOM.append ("draw ID \"").append (prefix).append ("a").append (id).append ("\" VECTOR ").append (J.util.Escape.eP (ptCenter)).append (J.util.Escape.eP (pt)).append (" \">").append (String.valueOf (deg)).append ("\" color ").append (J.modelsetbio.BioPolymer.qColor[derivType]).append ("\n");
continue;
}strExtra = q.getInfo () + J.util.Txt.sprintf ("  %10.5p %10.5p %10.5p", "p", [ptCenter]);
if (qtype == 'n' && isAmino) {
strExtra += J.util.Txt.sprintf ("  %10.5p %10.5p %10.5p", "p", [(monomer).getNitrogenHydrogenPoint ()]);
} else if (derivType == 2 && !Float.isNaN (val1)) {
strExtra += J.util.Txt.sprintf (" %10.5f %10.5f", "F", [[val1, val2]]);
}}if (pdbATOM == null) continue;
bsWritten.set ((a.getGroup ()).leadAtomIndex);
pdbATOM.append (viewer.modelSet.getLabeler ().formatLabelAtomArray (viewer, a, tokens, '\0', null));
pdbATOM.append (J.util.Txt.sprintf ("%8.2f%8.2f%8.2f      %6.3f          %2s    %s\n", "ssF", [a.getElementSymbolIso (false).toUpperCase (), strExtra, [x * factor, y * factor, z * factor, w * factor]]));
if (atomLast != null && atomLast.getPolymerIndexInModel () == a.getPolymerIndexInModel ()) {
pdbCONECT.append ("CONECT").append (J.util.Txt.formatStringI ("%5i", "i", atomLast.getAtomNumber ())).append (J.util.Txt.formatStringI ("%5i", "i", a.getAtomNumber ())).appendC ('\n');
}atomLast = a;
}}
}, "J.viewer.Viewer,~N,~N,J.modelsetbio.BioPolymer,~S,~S,~N,JU.BS,JU.BS,~B,~B,~B,~B,~B,~B,~N,~B,~B,~A,JU.OC,JU.SB,JU.BS");
$_M(c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
return NaN;
}, "~N,~S");
c$.get3DStraightness = $_M(c$, "get3DStraightness", 
function (id, dq, dqnext) {
return dq.getNormal ().dot (dqnext.getNormal ());
}, "~S,J.util.Quaternion,J.util.Quaternion");
c$.getQuaternionStraightness = $_M(c$, "getQuaternionStraightness", 
function (id, dq, dqnext) {
return J.modelsetbio.BioPolymer.getStraightness (dq.dot (dqnext));
}, "~S,J.util.Quaternion,J.util.Quaternion");
c$.getStraightness = $_M(c$, "getStraightness", 
function (cosHalfTheta) {
return (1 - 2 * Math.acos (Math.abs (cosHalfTheta)) / 3.141592653589793);
}, "~N");
$_M(c$, "isDna", 
function () {
return (this.monomerCount > 0 && this.monomers[0].isDna ());
});
$_M(c$, "isRna", 
function () {
return (this.monomerCount > 0 && this.monomers[0].isRna ());
});
$_M(c$, "getRangeGroups", 
function (nResidues, bsAtoms, bsResult) {
var bsTemp =  new JU.BS ();
for (var i = 0; i < this.monomerCount; i++) {
if (!this.monomers[i].isSelected (bsAtoms)) continue;
bsTemp.setBits (Math.max (0, i - nResidues), i + nResidues + 1);
i += nResidues - 1;
}
for (var i = bsTemp.nextSetBit (0); i >= 0 && i < this.monomerCount; i = bsTemp.nextSetBit (i + 1)) this.monomers[i].selectAtoms (bsResult);

}, "~N,JU.BS,JU.BS");
$_M(c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
}, "J.modelsetbio.BioPolymer,JU.BS,JU.BS,JU.List,~N,~A,~B,~B");
$_M(c$, "setStructureList", 
function (structureList) {
}, "java.util.Map");
$_M(c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
return;
}, "J.viewer.Viewer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS");
$_M(c$, "getType", 
function () {
return this.type;
});
$_M(c$, "calculateStruts", 
function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
return null;
}, "J.modelset.ModelSet,JU.BS,JU.BS,JU.List,~N,~N,~B");
Clazz_defineStatics (c$,
"TYPE_NOBONDING", 0,
"TYPE_AMINO", 1,
"TYPE_NUCLEIC", 2,
"TYPE_CARBOHYDRATE", 3,
"qColor", ["yellow", "orange", "purple"]);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["java.lang.Enum", "J.modelsetbio.BioPolymer"], "J.modelsetbio.AlphaPolymer", ["JU.BS", "$.List", "$.P3", "J.constant.EnumStructure", "J.modelsetbio.Helix", "$.Sheet", "$.Turn", "J.util.Logger", "$.Measure"], function () {
c$ = Clazz_declareType (J.modelsetbio, "AlphaPolymer", J.modelsetbio.BioPolymer);
$_V(c$, "getControlPoint", 
function (i, v) {
if (!this.monomers[i].isSheet ()) return this.leadPoints[i];
v.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
v.scale (this.sheetSmoothing);
var pt = JU.P3.newP (this.leadPoints[i]);
pt.add (v);
return pt;
}, "~N,JU.V3");
$_M(c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
J.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "J.viewer.Viewer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS");
$_M(c$, "addStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
var i0 = -1;
var i1 = -1;
if (istart < iend) {
if (this.monomers[0].firstAtomIndex > iend || this.monomers[this.monomerCount - 1].lastAtomIndex < istart) return;
i0 = istart;
i1 = iend;
}var indexStart;
var indexEnd;
if ((indexStart = this.getIndex (startChainID, startSeqcode, i0, i1)) == -1 || (indexEnd = this.getIndex (endChainID, endSeqcode, i0, i1)) == -1) return;
if (istart >= 0 && bsAssigned != null) {
var pt = bsAssigned.nextSetBit (this.monomers[indexStart].firstAtomIndex);
if (pt >= 0 && pt < this.monomers[indexEnd].lastAtomIndex) return;
}this.addStructureProtected (type, structureID, serialID, strandCount, indexStart, indexEnd);
if (istart >= 0) bsAssigned.setBits (istart, iend + 1);
}, "J.constant.EnumStructure,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
$_M(c$, "addStructureProtected", 
function (type, structureID, serialID, strandCount, indexStart, indexEnd) {
if (indexEnd < indexStart) {
J.util.Logger.error ("AlphaPolymer:addSecondaryStructure error:  indexStart:" + indexStart + " indexEnd:" + indexEnd);
return;
}var structureCount = indexEnd - indexStart + 1;
var proteinstructure = null;
switch (type) {
case J.constant.EnumStructure.HELIX:
case J.constant.EnumStructure.HELIXALPHA:
case J.constant.EnumStructure.HELIX310:
case J.constant.EnumStructure.HELIXPI:
proteinstructure =  new J.modelsetbio.Helix (this, indexStart, structureCount, type);
break;
case J.constant.EnumStructure.SHEET:
proteinstructure =  new J.modelsetbio.Sheet (this, indexStart, structureCount, type);
break;
case J.constant.EnumStructure.TURN:
proteinstructure =  new J.modelsetbio.Turn (this, indexStart, structureCount);
break;
default:
J.util.Logger.error ("unrecognized secondary structure type");
return;
}
proteinstructure.structureID = structureID;
proteinstructure.serialID = serialID;
proteinstructure.strandCount = strandCount;
for (var i = indexStart; i <= indexEnd; ++i) {
this.monomers[i].setStructure (proteinstructure);
}
}, "J.constant.EnumStructure,~S,~N,~N,~N,~N");
$_V(c$, "calculateStruts", 
function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
return this.calculateStrutsStatic (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple);
}, "J.modelset.ModelSet,JU.BS,JU.BS,JU.List,~N,~N,~B");
$_M(c$, "calculateStrutsStatic", 
function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
var vStruts =  new JU.List ();
var thresh2 = thresh * thresh;
var n = vCA.size ();
var nEndMin = 3;
var bsStruts =  new JU.BS ();
var bsNotAvailable =  new JU.BS ();
var bsNearbyResidues =  new JU.BS ();
var a1 = vCA.get (0);
var a2;
var nBiopolymers = modelSet.getBioPolymerCountInModel (a1.modelIndex);
var biopolymerStartsEnds =  Clazz_newIntArray (nBiopolymers, nEndMin * 2, 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
var polymerIndex = a1.getPolymerIndexInModel ();
var monomerIndex = a1.getMonomerIndex ();
var bpt = monomerIndex;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][bpt] = i + 1;
bpt = (a1.getGroup ()).getBioPolymerLength () - monomerIndex - 1;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][nEndMin + bpt] = i + 1;
}
var d2 =  Clazz_newFloatArray (Clazz_doubleToInt (n * (n - 1) / 2), 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
for (var j = i + 1; j < n; j++) {
var ipt = J.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
a2 = vCA.get (j);
var resno1 = a1.getResno ();
var polymerIndex1 = a1.getPolymerIndexInModel ();
var resno2 = a2.getResno ();
var polymerIndex2 = a2.getPolymerIndexInModel ();
if (polymerIndex1 == polymerIndex2 && Math.abs (resno2 - resno1) < delta) bsNearbyResidues.set (ipt);
var d = d2[ipt] = a1.distanceSquared (a2);
if (d >= thresh2) bsNotAvailable.set (ipt);
}
}
for (var t = 5; --t >= 0; ) {
thresh2 = (thresh - t) * (thresh - t);
for (var i = 0; i < n; i++) if (allowMultiple || !bsStruts.get (i)) for (var j = i + 1; j < n; j++) {
var ipt = J.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
if (!bsNotAvailable.get (ipt) && !bsNearbyResidues.get (ipt) && (allowMultiple || !bsStruts.get (j)) && d2[ipt] <= thresh2) J.modelsetbio.AlphaPolymer.setStrut (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}

}
for (var b = 0; b < nBiopolymers; b++) {
for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i >= 0 && bsStruts.get (i)) {
for (var j = 0; j < nEndMin; j++) {
var pt = (Clazz_doubleToInt (k / nEndMin)) * nEndMin + j;
if ((i = biopolymerStartsEnds[b][pt] - 1) >= 0) bsStruts.set (i);
biopolymerStartsEnds[b][pt] = -1;
}
}}
if (biopolymerStartsEnds[b][0] == -1 && biopolymerStartsEnds[b][nEndMin] == -1) continue;
var okN = false;
var okC = false;
var iN = 0;
var jN = 0;
var iC = 0;
var jC = 0;
var minN = 3.4028235E38;
var minC = 3.4028235E38;
for (var j = 0; j < n; j++) for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i == -2) {
k = (Clazz_doubleToInt (k / nEndMin) + 1) * nEndMin - 1;
continue;
}if (j == i || i == -1) continue;
var ipt = J.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
if (bsNearbyResidues.get (ipt) || d2[ipt] > (k < nEndMin ? minN : minC)) continue;
if (k < nEndMin) {
if (bsNotAvailable.get (ipt)) okN = true;
jN = j;
iN = i;
minN = d2[ipt];
} else {
if (bsNotAvailable.get (ipt)) okC = true;
jC = j;
iC = i;
minC = d2[ipt];
}}

if (okN) J.modelsetbio.AlphaPolymer.setStrut (iN, jN, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
if (okC) J.modelsetbio.AlphaPolymer.setStrut (iC, jC, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}
return vStruts;
}, "J.modelset.ModelSet,JU.BS,JU.BS,JU.List,~N,~N,~B");
c$.strutPoint = $_M(c$, "strutPoint", 
function (i, j, n) {
return (j < i ? Clazz_doubleToInt (j * (2 * n - j - 1) / 2) + i - j - 1 : Clazz_doubleToInt (i * (2 * n - i - 1) / 2) + j - i - 1);
}, "~N,~N,~N");
c$.setStrut = $_M(c$, "setStrut", 
function (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta) {
var a1 = vCA.get (i);
var a2 = vCA.get (j);
if (!bs1.get (a1.index) || !bs2.get (a2.index)) return;
vStruts.addLast ([a1, a2]);
bsStruts.set (i);
bsStruts.set (j);
for (var k1 = Math.max (0, i - delta); k1 <= i + delta && k1 < n; k1++) {
for (var k2 = Math.max (0, j - delta); k2 <= j + delta && k2 < n; k2++) {
if (k1 == k2) {
continue;
}var ipt = J.modelsetbio.AlphaPolymer.strutPoint (k1, k2, n);
if (!bsNearbyResidues.get (ipt)) {
bsNotAvailable.set (ipt);
}}
}
}, "~N,~N,~N,JU.List,JU.BS,JU.BS,JU.List,JU.BS,JU.BS,JU.BS,~N");
$_M(c$, "calculateStructures", 
function (alphaOnly) {
if (this.monomerCount < 4) return;
var angles = this.calculateAnglesInDegrees ();
var codes = this.calculateCodes (angles);
this.checkBetaSheetAlphaHelixOverlap (codes, angles);
var tags = this.calculateRunsFourOrMore (codes);
this.extendRuns (tags);
this.searchForTurns (codes, angles, tags);
this.addStructuresFromTags (tags);
}, "~B");
$_M(c$, "calculateAnglesInDegrees", 
function () {
var angles =  Clazz_newFloatArray (this.monomerCount, 0);
for (var i = this.monomerCount - 1; --i >= 2; ) angles[i] = J.util.Measure.computeTorsion (this.monomers[i - 2].getLeadAtom (), this.monomers[i - 1].getLeadAtom (), this.monomers[i].getLeadAtom (), this.monomers[i + 1].getLeadAtom (), true);

return angles;
});
$_M(c$, "calculateCodes", 
function (angles) {
var codes =  new Array (this.monomerCount);
for (var i = this.monomerCount - 1; --i >= 2; ) {
var degrees = angles[i];
codes[i] = ((degrees >= 10 && degrees < 120) ? J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX : ((degrees >= 120 || degrees < -90) ? J.modelsetbio.AlphaPolymer.Code.BETA_SHEET : ((degrees >= -90 && degrees < 0) ? J.modelsetbio.AlphaPolymer.Code.LEFT_HELIX : J.modelsetbio.AlphaPolymer.Code.NADA)));
}
return codes;
}, "~A");
$_M(c$, "checkBetaSheetAlphaHelixOverlap", 
function (codes, angles) {
for (var i = this.monomerCount - 2; --i >= 2; ) if (codes[i] === J.modelsetbio.AlphaPolymer.Code.BETA_SHEET && angles[i] <= 140 && codes[i - 2] === J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i - 1] === J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 1] === J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 2] === J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX) codes[i] = J.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX;

}, "~A,~A");
$_M(c$, "calculateRunsFourOrMore", 
function (codes) {
var tags =  new Array (this.monomerCount);
var tag = J.constant.EnumStructure.NONE;
var code = J.modelsetbio.AlphaPolymer.Code.NADA;
var runLength = 0;
for (var i = 0; i < this.monomerCount; ++i) {
if (codes[i] === code && code !== J.modelsetbio.AlphaPolymer.Code.NADA && code !== J.modelsetbio.AlphaPolymer.Code.BETA_SHEET) {
++runLength;
if (runLength == 4) {
tag = (code === J.modelsetbio.AlphaPolymer.Code.BETA_SHEET ? J.constant.EnumStructure.SHEET : J.constant.EnumStructure.HELIX);
for (var j = 4; --j >= 0; ) tags[i - j] = tag;

} else if (runLength > 4) tags[i] = tag;
} else {
runLength = 1;
code = codes[i];
}}
return tags;
}, "~A");
$_M(c$, "extendRuns", 
function (tags) {
for (var i = 1; i < this.monomerCount - 4; ++i) if (tags[i] === J.constant.EnumStructure.NONE && tags[i + 1] !== J.constant.EnumStructure.NONE) tags[i] = tags[i + 1];

tags[0] = tags[1];
tags[this.monomerCount - 1] = tags[this.monomerCount - 2];
}, "~A");
$_M(c$, "searchForTurns", 
function (codes, angles, tags) {
for (var i = this.monomerCount - 1; --i >= 2; ) {
codes[i] = J.modelsetbio.AlphaPolymer.Code.NADA;
if (tags[i] == null || tags[i] === J.constant.EnumStructure.NONE) {
var angle = angles[i];
if (angle >= -90 && angle < 0) codes[i] = J.modelsetbio.AlphaPolymer.Code.LEFT_TURN;
 else if (angle >= 0 && angle < 90) codes[i] = J.modelsetbio.AlphaPolymer.Code.RIGHT_TURN;
}}
for (var i = this.monomerCount - 1; --i >= 0; ) {
if (codes[i] !== J.modelsetbio.AlphaPolymer.Code.NADA && codes[i + 1] === codes[i] && tags[i] === J.constant.EnumStructure.NONE) tags[i] = J.constant.EnumStructure.TURN;
}
}, "~A,~A,~A");
$_M(c$, "addStructuresFromTags", 
function (tags) {
var i = 0;
while (i < this.monomerCount) {
var tag = tags[i];
if (tag == null || tag === J.constant.EnumStructure.NONE) {
++i;
continue;
}var iMax;
for (iMax = i + 1; iMax < this.monomerCount && tags[iMax] === tag; ++iMax) {
}
this.addStructureProtected (tag, null, 0, 0, i, iMax - 1);
i = iMax;
}
}, "~A");
Clazz_pu$h ();
c$ = Clazz_declareType (J.modelsetbio.AlphaPolymer, "Code", Enum);
Clazz_defineEnumConstant (c$, "NADA", 0, []);
Clazz_defineEnumConstant (c$, "RIGHT_HELIX", 1, []);
Clazz_defineEnumConstant (c$, "BETA_SHEET", 2, []);
Clazz_defineEnumConstant (c$, "LEFT_HELIX", 3, []);
Clazz_defineEnumConstant (c$, "LEFT_TURN", 4, []);
Clazz_defineEnumConstant (c$, "RIGHT_TURN", 5, []);
c$ = Clazz_p0p ();
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.AlphaMonomer"], "J.modelsetbio.AminoMonomer", ["JU.A4", "$.M3", "$.P3", "$.V3", "J.constant.EnumStructure", "J.util.Escape", "$.Logger", "$.Quaternion", "$.Txt"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nhChecked = false;
this.ptTemp = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "AminoMonomer", J.modelsetbio.AlphaMonomer);
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = $_M(c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var offsets = J.modelsetbio.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, J.modelsetbio.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
J.modelsetbio.Monomer.checkOptional (offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero () && !J.modelsetbio.AminoMonomer.isBondedCorrectly (firstAtomIndex, offsets, atoms)) return null;
return  new J.modelsetbio.AminoMonomer ().set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "J.modelset.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = $_M(c$, "isBondedCorrectlyRange", 
function (offset1, offset2, firstAtomIndex, offsets, atoms) {
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded (atoms[atomIndex2]));
}, "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = $_M(c$, "isBondedCorrectly", 
function (firstAtomIndex, offsets, atoms) {
return (J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (2, 0, firstAtomIndex, offsets, atoms) && J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (0, 3, firstAtomIndex, offsets, atoms) && (!J.modelsetbio.Monomer.have (offsets, 1) || J.modelsetbio.AminoMonomer.isBondedCorrectlyRange (3, 1, firstAtomIndex, offsets, atoms)));
}, "~N,~A,~A");
$_M(c$, "isAminoMonomer", 
function () {
return true;
});
$_V(c$, "getNitrogenAtom", 
function () {
return this.getAtomFromOffsetIndex (2);
});
$_M(c$, "getCarbonylCarbonAtom", 
function () {
return this.getAtomFromOffsetIndex (3);
});
$_V(c$, "getCarbonylOxygenAtom", 
function () {
return this.getWingAtom ();
});
$_V(c$, "getInitiatorAtom", 
function () {
return this.getNitrogenAtom ();
});
$_V(c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (J.modelsetbio.Monomer.have (this.offsets, 4) ? 4 : 3);
});
$_M(c$, "hasOAtom", 
function () {
return J.modelsetbio.Monomer.have (this.offsets, 1);
});
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom ().isBonded (this.getNitrogenAtom ());
}, "J.modelsetbio.Monomer");
$_V(c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom ();
var marBegin = (Clazz_doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.sZ == 0) return;
var radiusBegin = Clazz_floatToInt (this.scaleToScreen (nitrogen.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom ();
var marEnd = (Clazz_doubleToInt (madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = Clazz_floatToInt (this.scaleToScreen (nitrogen.sZ, marEnd));
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom ();
if (this.isCursorOnTopOf (alpha, x, y, Clazz_doubleToInt ((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf (nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf (ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
$_M(c$, "resetHydrogenPoint", 
function () {
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
$_M(c$, "getNitrogenHydrogenPoint", 
function () {
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH ();
}return this.nitrogenHydrogenPoint;
});
$_M(c$, "getExplicitNH", 
function () {
var nitrogen = this.getNitrogenAtom ();
var h = null;
var bonds = nitrogen.getBonds ();
if (bonds == null) return null;
for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom (nitrogen)).getElementNumber () == 1) return h;

return null;
});
$_M(c$, "getNHPoint", 
function (aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens) {
if (this.monomerIndex == 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom ();
var nhPoint = this.getNitrogenHydrogenPoint ();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2 (nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT (nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2 (nitrogenPoint, this.getLeadAtom ());
vNH.normalize ();
var v = JU.V3.newVsub (nitrogenPoint, prev.getCarbonylCarbonAtom ());
v.normalize ();
vNH.add (v);
} else {
var oxygen = prev.getCarbonylOxygenAtom ();
if (oxygen == null) return false;
vNH.sub2 (prev.getCarbonylCarbonAtom (), oxygen);
}vNH.normalize ();
aminoHydrogenPoint.add2 (nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = JU.P3.newP (aminoHydrogenPoint);
if (J.util.Logger.debugging) J.util.Logger.debug ("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.index + "\" " + J.util.Escape.eP (nitrogenPoint) + J.util.Escape.eP (aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "JU.P3,JU.V3,~B,~B");
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
default:
case 'a':
case 'b':
case 'c':
case 'C':
return this.getQuaternionFrameCenterAlpha (qType);
case 'n':
return this.getNitrogenAtom ();
case 'p':
case 'P':
return this.getCarbonylCarbonAtom ();
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
var pt =  new JU.P3 ();
pt.ave (this.getCarbonylCarbonAtom (), mNext.getNitrogenAtom ());
return pt;
}
}, "~S");
$_V(c$, "getQuaternion", 
function (qType) {
var ptC = this.getCarbonylCarbonAtom ();
var ptCa = this.getLeadAtom ();
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
var vC = null;
switch (qType) {
case 'a':
case 'n':
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new JU.V3 ();
if (this.ptTemp == null) this.ptTemp =  new JU.P3 ();
this.getNHPoint (this.ptTemp, vC, true, false);
vB.sub2 (ptCa, this.getNitrogenAtom ());
vB.cross (vC, vB);
var mat =  new JU.M3 ();
mat.setAA (JU.A4.newVA (vB, -0.29670596));
mat.transform (vC);
vA.cross (vB, vC);
break;
case 'b':
return this.getQuaternionAlpha ('b');
case 'c':
vA.sub2 (ptC, ptCa);
vB.sub2 (this.getNitrogenAtom (), ptCa);
break;
case 'p':
case 'x':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2 (ptCa, ptC);
vB.sub2 ((this.bioPolymer.getGroups ()[this.monomerIndex + 1]).getNitrogenAtom (), ptC);
break;
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
vB.sub2 (mNext.getLeadAtom (), mNext.getNitrogenAtom ());
vA.sub2 (ptCa, ptC);
break;
default:
return null;
}
return J.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
$_V(c$, "getStructureId", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
$_V(c$, "getProteinStructureTag", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = J.util.Txt.formatStringI (tag, "N", this.proteinStructure.serialID);
tag = J.util.Txt.formatStringS (tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === J.constant.EnumStructure.SHEET) tag += J.util.Txt.formatStringI ("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz_defineStatics (c$,
"CA", 0,
"O", 1,
"N", 2,
"C", 3,
"OT", 4,
"interestingAminoAtomIDs", [2, -5, 1, 3, -65],
"beta", (0.29670597283903605));
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.AlphaPolymer"], "J.modelsetbio.AminoPolymer", ["JU.P3", "$.V3", "J.constant.EnumStructure", "J.modelset.HBond", "J.util.Logger", "$.Measure"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structureList = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "AminoPolymer", J.modelsetbio.AlphaPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, J.modelsetbio.AminoPolymer, [monomers]);
this.type = 1;
for (var i = 0; i < this.monomerCount; ++i) if (!(monomers[i]).hasOAtom ()) return;

this.hasWingPoints = true;
}, "~A");
$_V(c$, "resetHydrogenPoints", 
function () {
var ps;
var psLast = null;
for (var i = 0; i < this.monomerCount; i++) {
if ((ps = this.getProteinStructure (i)) != null && ps !== psLast) (psLast = ps).resetAxes ();
(this.monomers[i]).resetHydrogenPoint ();
}
});
$_V(c$, "calcPhiPsiAngles", 
function () {
for (var i = 0; i < this.monomerCount - 1; ++i) this.calcPhiPsiAngles2 (this.monomers[i], this.monomers[i + 1]);

return true;
});
$_M(c$, "calcPhiPsiAngles2", 
function (residue1, residue2) {
var nitrogen1 = residue1.getNitrogenAtom ();
var alphacarbon1 = residue1.getLeadAtom ();
var carbon1 = residue1.getCarbonylCarbonAtom ();
var nitrogen2 = residue2.getNitrogenAtom ();
var alphacarbon2 = residue2.getLeadAtom ();
var carbon2 = residue2.getCarbonylCarbonAtom ();
residue2.setGroupParameter (1112539145, J.util.Measure.computeTorsion (carbon1, nitrogen2, alphacarbon2, carbon2, true));
residue1.setGroupParameter (1112539146, J.util.Measure.computeTorsion (nitrogen1, alphacarbon1, carbon1, nitrogen2, true));
residue1.setGroupParameter (1112539144, J.util.Measure.computeTorsion (alphacarbon1, carbon1, nitrogen2, alphacarbon2, true));
}, "J.modelsetbio.AminoMonomer,J.modelsetbio.AminoMonomer");
$_V(c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
var psiLast = (m == 0 ? NaN : this.monomers[m - 1].getGroupParameter (1112539146));
var psi = this.monomers[m].getGroupParameter (1112539146);
var phi = this.monomers[m].getGroupParameter (1112539145);
var phiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1112539145));
var psiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1112539146));
switch (qtype) {
default:
case 'p':
case 'r':
case 'P':
var dPhi = ((phiNext - phi) / 2 * 3.141592653589793 / 180);
var dPsi = ((psiNext - psi) / 2 * 3.141592653589793 / 180);
return (57.29577951308232 * 2 * Math.acos (Math.cos (dPsi) * Math.cos (dPhi) - Math.sin (dPsi) * Math.sin (dPhi) / 3));
case 'c':
case 'C':
return (psi - psiLast + phiNext - phi);
}
}, "~N,~S");
$_V(c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
if (polymer == null) polymer = this;
if (!(Clazz_instanceOf (polymer, J.modelsetbio.AminoPolymer))) return;
var pt =  new JU.P3 ();
var vNH =  new JU.V3 ();
var source;
var min1 = (min == null ?  Clazz_newIntArray (2, 3, 0) : null);
for (var i = 1; i < this.monomerCount; ++i) {
if (min == null) {
min1[0][0] = min1[1][0] = this.bioPolymerIndexInModel;
min1[0][1] = min1[1][1] = -2147483648;
min1[0][2] = min1[1][2] = 0;
} else {
min1 = min[i];
}if ((source = (this.monomers[i])).getNHPoint (pt, vNH, checkDistances, dsspIgnoreHydrogens)) {
var isInA = (bsA == null || bsA.get (source.getNitrogenAtom ().index));
if (!isInA) continue;
if (!checkDistances && source.getCarbonylOxygenAtom () == null) continue;
this.checkRasmolHydrogenBond (source, polymer, i, pt, (isInA ? bsB : bsA), vHBonds, min1, checkDistances);
}}
}, "J.modelsetbio.BioPolymer,JU.BS,JU.BS,JU.List,~N,~A,~B,~B");
$_M(c$, "checkRasmolHydrogenBond", 
function (source, polymer, indexDonor, hydrogenPoint, bsB, vHBonds, min, checkDistances) {
var sourceAlphaPoint = source.getLeadAtom ();
var sourceNitrogenPoint = source.getNitrogenAtom ();
var nitrogen = source.getNitrogenAtom ();
var m;
for (var i = polymer.monomerCount; --i >= 0; ) {
if (polymer === this && (i == indexDonor || i + 1 == indexDonor)) continue;
var target = polymer.monomers[i];
var oxygen = target.getCarbonylOxygenAtom ();
if (oxygen == null || bsB != null && !bsB.get (oxygen.index)) continue;
var targetAlphaPoint = target.getLeadAtom ();
var dist2 = sourceAlphaPoint.distanceSquared (targetAlphaPoint);
if (dist2 >= 81.0) continue;
var energy = this.calcHbondEnergy (sourceNitrogenPoint, hydrogenPoint, target, checkDistances);
if (energy < min[0][2]) {
m = min[1];
min[1] = min[0];
min[0] = m;
} else if (energy < min[1][2]) {
m = min[1];
} else {
continue;
}m[0] = polymer.bioPolymerIndexInModel;
m[1] = (energy < -500 ? i : -1 - i);
m[2] = energy;
}
if (vHBonds != null) for (var i = 0; i < 2; i++) if (min[i][1] >= 0) this.addResidueHydrogenBond (nitrogen, ((polymer).monomers[min[i][1]]).getCarbonylOxygenAtom (), (polymer === this ? indexDonor : -99), min[i][1], min[i][2] / 1000, vHBonds);

}, "J.modelsetbio.AminoMonomer,J.modelsetbio.BioPolymer,~N,JU.P3,JU.BS,JU.List,~A,~B");
$_M(c$, "calcHbondEnergy", 
function (nitrogenPoint, hydrogenPoint, target, checkDistances) {
var targetOxygenPoint = target.getCarbonylOxygenAtom ();
if (targetOxygenPoint == null) return 0;
var distON2 = targetOxygenPoint.distanceSquared (nitrogenPoint);
if (distON2 < 0.25) return 0;
var distOH2 = targetOxygenPoint.distanceSquared (hydrogenPoint);
if (distOH2 < 0.25) return 0;
var targetCarbonPoint = target.getCarbonylCarbonAtom ();
var distCH2 = targetCarbonPoint.distanceSquared (hydrogenPoint);
if (distCH2 < 0.25) return 0;
var distCN2 = targetCarbonPoint.distanceSquared (nitrogenPoint);
if (distCN2 < 0.25) return 0;
var distOH = Math.sqrt (distOH2);
var distCH = Math.sqrt (distCH2);
var distCN = Math.sqrt (distCN2);
var distON = Math.sqrt (distON2);
var energy = J.modelset.HBond.getEnergy (distOH, distCH, distCN, distON);
var isHbond = (energy < -500 && (!checkDistances || distCN > distCH && distOH <= 3.0));
return (!isHbond && checkDistances || energy < -9900 ? 0 : energy);
}, "JU.P3,JU.P3,J.modelsetbio.AminoMonomer,~B");
$_M(c$, "addResidueHydrogenBond", 
function (nitrogen, oxygen, indexAminoGroup, indexCarbonylGroup, energy, vHBonds) {
var order;
switch (indexAminoGroup - indexCarbonylGroup) {
case 2:
order = 6144;
break;
case 3:
order = 8192;
break;
case 4:
order = 10240;
break;
case 5:
order = 12288;
break;
case -3:
order = 14336;
break;
case -4:
order = 16384;
break;
default:
order = 4096;
}
vHBonds.addLast ( new J.modelset.HBond (nitrogen, oxygen, order, 1, 0, energy));
}, "J.modelset.Atom,J.modelset.Atom,~N,~N,~N,JU.List");
$_V(c$, "calculateStructures", 
function (alphaOnly) {
if (alphaOnly) return;
if (this.structureList == null) this.structureList = this.model.getModelSet ().getStructureList ();
var structureTags =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount - 1; ++i) {
var leadingResidue = this.monomers[i];
var trailingResidue = this.monomers[i + 1];
var phi = trailingResidue.getGroupParameter (1112539145);
var psi = leadingResidue.getGroupParameter (1112539146);
if (this.isHelix (psi, phi)) {
structureTags[i] = (phi < 0 && psi < 25 ? '4' : '3');
} else if (this.isSheet (psi, phi)) {
structureTags[i] = 's';
} else if (this.isTurn (psi, phi)) {
structureTags[i] = 't';
} else {
structureTags[i] = 'n';
}if (J.util.Logger.debugging) J.util.Logger.debug ((0 + this.monomers[0].getChainID ()) + " aminopolymer:" + i + " " + trailingResidue.getGroupParameter (1112539145) + "," + leadingResidue.getGroupParameter (1112539146) + " " + structureTags[i]);
}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '4') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '4'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (J.constant.EnumStructure.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '3') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '3'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (J.constant.EnumStructure.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 's') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 's'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (J.constant.EnumStructure.SHEET, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 't') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 't'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (J.constant.EnumStructure.TURN, null, 0, 0, start, end);
}start = end;
}}
}, "~B");
$_M(c$, "isTurn", 
function (psi, phi) {
return J.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (J.constant.EnumStructure.TURN), psi, phi);
}, "~N,~N");
$_M(c$, "isSheet", 
function (psi, phi) {
return J.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (J.constant.EnumStructure.SHEET), psi, phi);
}, "~N,~N");
$_M(c$, "isHelix", 
function (psi, phi) {
return J.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (J.constant.EnumStructure.HELIX), psi, phi);
}, "~N,~N");
c$.checkPhiPsi = $_M(c$, "checkPhiPsi", 
function (list, psi, phi) {
for (var i = 0; i < list.length; i += 4) if (phi >= list[i] && phi <= list[i + 1] && psi >= list[i + 2] && psi <= list[i + 3]) return true;

return false;
}, "~A,~N,~N");
$_V(c$, "setStructureList", 
function (structureList) {
this.structureList = structureList;
}, "java.util.Map");
Clazz_defineStatics (c$,
"maxHbondAlphaDistance", 9,
"maxHbondAlphaDistance2", 81.0,
"minimumHbondDistance2", 0.25);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelset.Model"], "J.modelsetbio.BioModel", ["java.lang.Float", "java.util.Hashtable", "JU.AU", "$.BS", "$.List", "$.SB", "J.api.Interface", "J.constant.EnumStructure", "J.modelset.AtomCollection", "J.modelsetbio.AlphaPolymer", "$.Monomer", "$.Resolver", "J.util.BSUtil", "$.Escape", "$.Txt", "J.viewer.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bioPolymerCount = 0;
this.bioPolymers = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "BioModel", J.modelset.Model);
Clazz_makeConstructor (c$, 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
Clazz_superConstructor (this, J.modelsetbio.BioModel, [modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo]);
this.isBioModel = true;
this.clearBioPolymers ();
}, "J.modelset.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
$_V(c$, "freeze", 
function () {
this.freezeM ();
this.bioPolymers = JU.AU.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
});
$_M(c$, "addSecondaryStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf (this.bioPolymers[i], J.modelsetbio.AlphaPolymer)) (this.bioPolymers[i]).addStructure (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned);

}, "J.constant.EnumStructure,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
$_V(c$, "calculateStructures", 
function (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha) {
if (this.bioPolymerCount == 0 || !setStructure && !asDSSP) return "";
this.modelSet.proteinStructureTainted = this.structureTainted = true;
if (setStructure) for (var i = this.bioPolymerCount; --i >= 0; ) if (!asDSSP || this.bioPolymers[i].getGroups ()[0].getNitrogenAtom () != null) this.bioPolymers[i].clearStructures ();

if (!asDSSP || includeAlpha) for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf (this.bioPolymers[i], J.modelsetbio.AlphaPolymer)) (this.bioPolymers[i]).calculateStructures (includeAlpha);

return (asDSSP ? this.calculateDssp (null, doReport, dsspIgnoreHydrogen, setStructure) : "");
}, "~B,~B,~B,~B,~B");
$_M(c$, "calculateDssp", 
function (vHBonds, doReport, dsspIgnoreHydrogen, setStructure) {
return (J.api.Interface.getOptionInterface ("dssx.DSSP")).calculateDssp (this.bioPolymers, this.bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogen, setStructure);
}, "JU.List,~B,~B,~B");
$_V(c$, "setConformation", 
function (bsConformation) {
if (this.nAltLocs > 0) for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].setConformation (bsConformation);

}, "JU.BS");
$_V(c$, "getPdbConformation", 
function (bsConformation, conformationIndex) {
if (this.nAltLocs > 0) for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].getConformation (bsConformation, conformationIndex);

return true;
}, "JU.BS,~N");
$_V(c$, "getBioPolymerCount", 
function () {
return this.bioPolymerCount;
});
$_V(c$, "calcSelectedMonomersCount", 
function (bsSelected) {
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].calcSelectedMonomersCount (bsSelected);

}, "JU.BS");
$_M(c$, "getBioPolymer", 
function (polymerIndex) {
return this.bioPolymers[polymerIndex];
}, "~N");
$_V(c$, "getDefaultLargePDBRendering", 
function (sb, maxAtoms) {
var bs =  new JU.BS ();
if (this.getBondCount () == 0) bs = this.bsAtoms;
if (bs !== this.bsAtoms) for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].getRange (bs);

if (bs.nextSetBit (0) < 0) return;
var bs2 =  new JU.BS ();
if (bs === this.bsAtoms) {
bs2 = bs;
} else {
for (var i = 0; i < this.bioPolymerCount; i++) if (this.bioPolymers[i].getType () == 0) this.bioPolymers[i].getRange (bs2);

}if (bs2.nextSetBit (0) >= 0) sb.append ("select ").append (J.util.Escape.eBS (bs2)).append (";backbone only;");
if (this.atomCount <= maxAtoms) return;
sb.append ("select ").append (J.util.Escape.eBS (bs)).append (" & connected; wireframe only;");
if (bs !== this.bsAtoms) {
bs2.clearAll ();
bs2.or (this.bsAtoms);
bs2.andNot (bs);
if (bs2.nextSetBit (0) >= 0) sb.append ("select " + J.util.Escape.eBS (bs2) + " & !connected;stars 0.5;");
}}, "JU.SB,~N");
$_V(c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
this.fixIndicesM (modelIndex, nAtomsDeleted, bsDeleted);
for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].recalculateLeadMidpointsAndWingVectors ();

}, "~N,~N,JU.BS");
$_V(c$, "calculateStruts", 
function (modelSet, bs1, bs2) {
var vCA =  new JU.List ();
var a1 = null;
var bsCheck;
if (bs1.equals (bs2)) {
bsCheck = bs1;
} else {
bsCheck = J.util.BSUtil.copy (bs1);
bsCheck.or (bs2);
}var atoms = modelSet.atoms;
var viewer = modelSet.viewer;
bsCheck.and (viewer.getModelUndeletedAtomsBitSet (this.modelIndex));
for (var i = bsCheck.nextSetBit (0); i >= 0; i = bsCheck.nextSetBit (i + 1)) if (atoms[i].isVisible (0) && atoms[i].atomID == 2 && atoms[i].getGroupID () != 5) vCA.addLast ((a1 = atoms[i]));

if (vCA.size () == 0) return 0;
var thresh = viewer.getFloat (570425408);
var mad = Clazz_floatToShort (viewer.getFloat (570425406) * 2000);
var delta = viewer.getInt (553648184);
var strutsMultiple = viewer.getBoolean (603979955);
var struts = this.getBioPolymer (a1.getPolymerIndexInModel ()).calculateStruts (modelSet, bs1, bs2, vCA, thresh, delta, strutsMultiple);
for (var i = 0; i < struts.size (); i++) {
var o = struts.get (i);
modelSet.bondAtoms (o[0], o[1], 32768, mad, null, 0, false, true);
}
return struts.size ();
}, "J.modelset.ModelSet,JU.BS,JU.BS");
$_V(c$, "setStructureList", 
function (structureList) {
this.bioPolymers = JU.AU.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].setStructureList (structureList);

}, "java.util.Map");
$_V(c$, "calculateStraightness", 
function (viewer, ctype, qtype, mStep) {
for (var p = 0; p < this.bioPolymerCount; p++) this.bioPolymers[p].getPdbData (viewer, ctype, qtype, mStep, 2, null, null, false, false, false, null, null, null,  new JU.BS ());

}, "J.viewer.Viewer,~S,~S,~N");
$_V(c$, "getPolymerPointsAndVectors", 
function (bs, vList, isTraceAlpha, sheetSmoothing) {
var last = 2147483646;
for (var ip = 0; ip < this.bioPolymerCount; ip++) last = this.bioPolymers[ip].getPolymerPointsAndVectors (last, bs, vList, isTraceAlpha, sheetSmoothing);

}, "JU.BS,JU.List,~B,~N");
$_V(c$, "getPolymerLeadMidPoints", 
function (iPolymer) {
return this.bioPolymers[iPolymer].getLeadMidpoints ();
}, "~N");
$_V(c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
for (var ip = 0; ip < this.bioPolymerCount; ip++) this.bioPolymers[ip].recalculateLeadMidpointsAndWingVectors ();

});
$_V(c$, "getBioBranches", 
function (biobranches) {
var bsBranch;
for (var j = 0; j < this.bioPolymerCount; j++) {
bsBranch =  new JU.BS ();
this.bioPolymers[j].getRange (bsBranch);
var iAtom = bsBranch.nextSetBit (0);
if (iAtom >= 0) {
if (biobranches == null) biobranches =  new JU.List ();
biobranches.addLast (bsBranch);
}}
return biobranches;
}, "JU.List");
$_V(c$, "getGroupsWithin", 
function (nResidues, bs, bsResult) {
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].getRangeGroups (nResidues, bs, bsResult);

}, "~N,JU.BS,JU.BS");
$_V(c$, "getSequenceBits", 
function (specInfo, bs, bsResult) {
var lenInfo = specInfo.length;
for (var ip = 0; ip < this.bioPolymerCount; ip++) {
var sequence = this.bioPolymers[ip].getSequence ();
var j = -1;
while ((j = sequence.indexOf (specInfo, ++j)) >= 0) this.bioPolymers[ip].getPolymerSequenceAtoms (j, lenInfo, bs, bsResult);

}
}, "~S,JU.BS,JU.BS");
$_V(c$, "selectSeqcodeRange", 
function (seqcodeA, seqcodeB, chainID, bs, caseSensitive) {
var id;
for (var i = this.chainCount; --i >= 0; ) {
var chain = this.chains[i];
if (chainID == -1 || chainID == (id = chain.chainID) || !caseSensitive && id < 256 && chainID == J.modelset.AtomCollection.chainToUpper (id)) for (var index = 0; index >= 0; ) index = this.chains[i].selectSeqcodeRange (index, seqcodeA, seqcodeB, bs);

}
}, "~N,~N,~N,JU.BS,~B");
$_V(c$, "getRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds) {
var doAdd = (vHBonds == null);
if (doAdd) vHBonds =  new JU.List ();
if (nMax < 0) nMax = 2147483647;
var asDSSP = (bsB == null);
var bp;
var bp1;
if (asDSSP && this.bioPolymerCount > 0) {
this.calculateDssp (vHBonds, false, dsspIgnoreHydrogens, false);
} else {
for (var i = this.bioPolymerCount; --i >= 0; ) {
bp = this.bioPolymers[i];
var type = bp.getType ();
if ((nucleicOnly || type != 1) && type != 2) continue;
var isRNA = bp.isRna ();
var isAmino = (type == 1);
if (isAmino) bp.calcRasmolHydrogenBonds (null, bsA, bsB, vHBonds, nMax, null, true, false);
for (var j = this.bioPolymerCount; --j >= 0; ) {
if ((bp1 = this.bioPolymers[j]) != null && (isRNA || i != j) && type == bp1.getType ()) {
bp1.calcRasmolHydrogenBonds (bp, bsA, bsB, vHBonds, nMax, null, true, false);
}}
}
}if (vHBonds.size () == 0 || !doAdd) return;
this.hasRasmolHBonds = true;
for (var i = 0; i < vHBonds.size (); i++) {
var bond = vHBonds.get (i);
var atom1 = bond.getAtom1 ();
var atom2 = bond.getAtom2 ();
if (atom1.isBonded (atom2)) continue;
var index = this.modelSet.addHBond (atom1, atom2, bond.order, bond.getEnergy ());
if (bsHBonds != null) bsHBonds.set (index);
}
}, "JU.BS,JU.BS,JU.List,~B,~N,~B,JU.BS");
$_V(c$, "clearRasmolHydrogenBonds", 
function (bsAtoms) {
var bsDelete =  new JU.BS ();
this.hasRasmolHBonds = false;
var models = this.modelSet.models;
var bonds = this.modelSet.bonds;
for (var i = this.modelSet.bondCount; --i >= 0; ) {
var bond = bonds[i];
var atom1 = bond.getAtom1 ();
var m = models[atom1.modelIndex];
if (!m.isBioModel || m.trajectoryBaseIndex != this.modelIndex || (bond.order & 28672) == 0) continue;
if (bsAtoms != null && !bsAtoms.get (atom1.index)) {
this.hasRasmolHBonds = true;
continue;
}bsDelete.set (i);
}
if (bsDelete.nextSetBit (0) >= 0) this.modelSet.deleteBonds (bsDelete, false);
}, "JU.BS");
$_V(c$, "calculatePolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded, checkConnections) {
if (groups == null) {
groups = this.modelSet.getGroups ();
groupCount = groups.length;
}if (modelsExcluded != null) for (var i = 0; i < groupCount; ++i) {
var group = groups[i];
if (Clazz_instanceOf (group, J.modelsetbio.Monomer)) {
var monomer = group;
if (monomer.getBioPolymer () != null && (!modelsExcluded.get (monomer.getModelIndex ()))) monomer.setBioPolymer (null, -1);
}}
for (var i = baseGroupIndex; i < groupCount; ++i) {
var g = groups[i];
var model = g.getModel ();
if (!model.isBioModel || !(Clazz_instanceOf (g, J.modelsetbio.Monomer))) continue;
var doCheck = checkConnections && !this.modelSet.isJmolDataFrameForModel (this.modelSet.atoms[g.firstAtomIndex].modelIndex);
var bp = ((g).getBioPolymer () == null ? J.modelsetbio.Resolver.allocateBioPolymer (groups, i, doCheck) : null);
if (bp == null || bp.monomerCount == 0) continue;
(model).addBioPolymer (bp);
i += bp.monomerCount - 1;
}
}, "~A,~N,~N,JU.BS,~B");
$_M(c$, "addBioPolymer", 
function (polymer) {
if (this.bioPolymers.length == 0) this.clearBioPolymers ();
if (this.bioPolymerCount == this.bioPolymers.length) this.bioPolymers = JU.AU.doubleLength (this.bioPolymers);
polymer.bioPolymerIndexInModel = this.bioPolymerCount;
this.bioPolymers[this.bioPolymerCount++] = polymer;
}, "J.modelsetbio.BioPolymer");
$_V(c$, "clearBioPolymers", 
function () {
this.bioPolymers =  new Array (8);
this.bioPolymerCount = 0;
});
$_V(c$, "getAllPolymerInfo", 
function (bs, finalInfo, modelVector) {
var modelInfo =  new java.util.Hashtable ();
var info =  new JU.List ();
for (var ip = 0; ip < this.bioPolymerCount; ip++) {
var polyInfo = this.bioPolymers[ip].getPolymerInfo (bs);
if (!polyInfo.isEmpty ()) info.addLast (polyInfo);
}
if (info.size () > 0) {
modelInfo.put ("modelIndex", Integer.$valueOf (this.modelIndex));
modelInfo.put ("polymers", info);
modelVector.addLast (modelInfo);
}}, "JU.BS,java.util.Map,JU.List");
$_V(c$, "getChimeInfo", 
function (sb, nHetero) {
var n = 0;
var models = this.modelSet.models;
var modelCount = this.modelSet.modelCount;
var atomCount = this.modelSet.getAtomCount ();
var atoms = this.modelSet.atoms;
sb.append ("\nMolecule name ....... " + this.modelSet.getModelSetAuxiliaryInfoValue ("COMPND"));
sb.append ("\nSecondary Structure . PDB Data Records");
sb.append ("\nBrookhaven Code ..... " + this.modelSet.modelSetName);
for (var i = modelCount; --i >= 0; ) n += models[i].getChainCount (false);

sb.append ("\nNumber of Chains .... " + n);
n = 0;
for (var i = modelCount; --i >= 0; ) n += models[i].getGroupCountHetero (false);

nHetero = 0;
for (var i = modelCount; --i >= 0; ) nHetero += models[i].getGroupCountHetero (true);

sb.append ("\nNumber of Groups .... " + n);
if (nHetero > 0) sb.append (" (" + nHetero + ")");
for (var i = atomCount; --i >= 0; ) if (atoms[i].isHetero ()) nHetero++;

this.getChimeInfoM (sb, nHetero);
var nH = 0;
var nS = 0;
var nT = 0;
var id;
var lastid = -1;
for (var i = 0; i < atomCount; i++) {
if (atoms[i].modelIndex != 0) break;
if ((id = atoms[i].getStrucNo ()) != lastid && id != 0) {
lastid = id;
switch (atoms[i].getProteinStructureType ()) {
case J.constant.EnumStructure.HELIX:
nH++;
break;
case J.constant.EnumStructure.SHEET:
nS++;
break;
case J.constant.EnumStructure.TURN:
nT++;
break;
}
}}
sb.append ("\nNumber of Helices ... " + nH);
sb.append ("\nNumber of Strands ... " + nS);
sb.append ("\nNumber of Turns ..... " + nT);
}, "JU.SB,~N");
$_V(c$, "getProteinStructureState", 
function (bsAtoms, taintedOnly, needPhiPsi, mode) {
var showMode = (mode == 3);
var pdbFileMode = (mode == 1);
var scriptMode = (mode == 0);
var bs = null;
var cmd =  new JU.SB ();
var sbTurn =  new JU.SB ();
var sbHelix =  new JU.SB ();
var sbSheet =  new JU.SB ();
var type = J.constant.EnumStructure.NONE;
var subtype = J.constant.EnumStructure.NONE;
var id = 0;
var iLastAtom = 0;
var iLastModel = -1;
var lastId = -1;
var res1 = 0;
var res2 = 0;
var sid = "";
var group1 = "";
var group2 = "";
var chain1 = "";
var chain2 = "";
var n = 0;
var nHelix = 0;
var nTurn = 0;
var nSheet = 0;
var bsTainted = null;
var models = this.modelSet.models;
var atoms = this.modelSet.atoms;
var atomCount = this.modelSet.getAtomCount ();
if (taintedOnly) {
if (!this.modelSet.proteinStructureTainted) return "";
bsTainted =  new JU.BS ();
for (var i = this.firstAtomIndex; i < atomCount; i++) if (models[atoms[i].modelIndex].isStructureTainted ()) bsTainted.set (i);

bsTainted.set (atomCount);
}for (var i = 0; i <= atomCount; i++) if (i == atomCount || bsAtoms == null || bsAtoms.get (i)) {
if (taintedOnly && !bsTainted.get (i)) continue;
id = 0;
if (i == atomCount || (id = atoms[i].getStrucNo ()) != lastId) {
if (bs != null) {
switch (type) {
case J.constant.EnumStructure.HELIX:
case J.constant.EnumStructure.TURN:
case J.constant.EnumStructure.SHEET:
n++;
if (scriptMode) {
var iModel = atoms[iLastAtom].modelIndex;
var comment = "    \t# model=" + this.modelSet.getModelNumberDotted (iModel);
if (iLastModel != iModel) {
iLastModel = iModel;
cmd.append ("  structure none ").append (J.util.Escape.eBS (this.modelSet.getModelAtomBitSetIncludingDeleted (iModel, false))).append (comment).append (";\n");
}comment += " & (" + res1 + " - " + res2 + ")";
var stype = subtype.getBioStructureTypeName (false);
cmd.append ("  structure ").append (stype).append (" ").append (J.util.Escape.eBS (bs)).append (comment).append (";\n");
} else {
var str;
var nx;
var sb;
switch (type) {
case J.constant.EnumStructure.HELIX:
nx = ++nHelix;
if (sid == null || pdbFileMode) sid = J.util.Txt.formatStringI ("%3N %3N", "N", nx);
str = "HELIX  %ID %3GROUPA %1CA %4RESA  %3GROUPB %1CB %4RESB";
sb = sbHelix;
var stype = null;
switch (subtype) {
case J.constant.EnumStructure.HELIX:
case J.constant.EnumStructure.HELIXALPHA:
stype = "  1";
break;
case J.constant.EnumStructure.HELIX310:
stype = "  5";
break;
case J.constant.EnumStructure.HELIXPI:
stype = "  3";
break;
}
if (stype != null) str += stype;
break;
case J.constant.EnumStructure.SHEET:
nx = ++nSheet;
if (sid == null || pdbFileMode) {
sid = J.util.Txt.formatStringI ("%3N %3A 0", "N", nx);
sid = J.util.Txt.formatStringS (sid, "A", "S" + nx);
}str = "SHEET  %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
sb = sbSheet;
break;
case J.constant.EnumStructure.TURN:
default:
nx = ++nTurn;
if (sid == null || pdbFileMode) sid = J.util.Txt.formatStringI ("%3N %3N", "N", nx);
str = "TURN   %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
sb = sbTurn;
break;
}
str = J.util.Txt.formatStringS (str, "ID", sid);
str = J.util.Txt.formatStringS (str, "GROUPA", group1);
str = J.util.Txt.formatStringS (str, "CA", chain1);
str = J.util.Txt.formatStringI (str, "RESA", res1);
str = J.util.Txt.formatStringS (str, "GROUPB", group2);
str = J.util.Txt.formatStringS (str, "CB", chain2);
str = J.util.Txt.formatStringI (str, "RESB", res2);
sb.append (str);
if (showMode) sb.append (" strucno= ").appendI (lastId);
sb.append ("\n");
}}
bs = null;
}if (id == 0 || bsAtoms != null && needPhiPsi && (Float.isNaN (atoms[i].getGroupParameter (1112539145)) || Float.isNaN (atoms[i].getGroupParameter (1112539146)))) continue;
}var ch = atoms[i].getChainIDStr ();
if (bs == null) {
bs =  new JU.BS ();
res1 = atoms[i].getResno ();
group1 = atoms[i].getGroup3 (false);
chain1 = ch;
}type = atoms[i].getProteinStructureType ();
subtype = atoms[i].getProteinStructureSubType ();
sid = atoms[i].getProteinStructureTag ();
bs.set (i);
lastId = id;
res2 = atoms[i].getResno ();
group2 = atoms[i].getGroup3 (false);
chain2 = ch;
iLastAtom = i;
}
if (n > 0) cmd.append ("\n");
return (scriptMode ? cmd.toString () : sbHelix.appendSB (sbSheet).appendSB (sbTurn).appendSB (cmd).toString ());
}, "JU.BS,~B,~B,~N");
$_V(c$, "getFullPDBHeader", 
function () {
if (this.modelIndex < 0) return "";
var info = this.auxiliaryInfo.get ("fileHeader");
if (info != null) return info;
info = this.modelSet.viewer.getCurrentFileAsString ();
var ichMin = info.length;
for (var i = J.modelsetbio.BioModel.pdbRecords.length; --i >= 0; ) {
var ichFound;
var strRecord = J.modelsetbio.BioModel.pdbRecords[i];
switch (ichFound = (info.startsWith (strRecord) ? 0 : info.indexOf ("\n" + strRecord))) {
case -1:
continue;
case 0:
this.auxiliaryInfo.put ("fileHeader", "");
return "";
default:
if (ichFound < ichMin) ichMin = ++ichFound;
}
}
info = info.substring (0, ichMin);
this.auxiliaryInfo.put ("fileHeader", info);
return info;
});
$_V(c$, "getPdbData", 
function (viewer, type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten) {
var bothEnds = false;
var qtype = (ctype != 'R' ? 'r' : type.length > 13 && type.indexOf ("ramachandran ") >= 0 ? type.charAt (13) : 'R');
if (qtype == 'r') qtype = viewer.getQuaternionFrame ();
var mStep = viewer.getInt (553648146);
var derivType = (type.indexOf ("diff") < 0 ? 0 : type.indexOf ("2") < 0 ? 1 : 2);
if (!isDraw) {
out.append ("REMARK   6 Jmol PDB-encoded data: " + type + ";");
if (ctype != 'R') {
out.append ("  quaternionFrame = \"" + qtype + "\"");
bothEnds = true;
}out.append ("\nREMARK   6 Jmol Version ").append (J.viewer.Viewer.getJmolVersion ()).append ("\n");
if (ctype == 'R') out.append ("REMARK   6 Jmol data min = {-180 -180 -180} max = {180 180 180} unScaledXyz = xyz * {1 1 1} + {0 0 0} plotScale = {100 100 100}\n");
 else out.append ("REMARK   6 Jmol data min = {-1 -1 -1} max = {1 1 1} unScaledXyz = xyz * {0.1 0.1 0.1} + {0 0 0} plotScale = {100 100 100}\n");
}for (var p = 0; p < this.bioPolymerCount; p++) this.bioPolymers[p].getPdbData (viewer, ctype, qtype, mStep, derivType, this.bsAtoms, bsSelected, bothEnds, isDraw, p == 0, tokens, out, pdbCONECT, bsWritten);

}, "J.viewer.Viewer,~S,~S,~B,JU.BS,JU.OC,~A,JU.SB,JU.BS");
Clazz_defineStatics (c$,
"pdbRecords", ["ATOM  ", "MODEL ", "HETATM"]);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.Monomer"], "J.modelsetbio.CarbohydrateMonomer", ["J.constant.EnumStructure"], function () {
c$ = Clazz_declareType (J.modelsetbio, "CarbohydrateMonomer", J.modelsetbio.Monomer);
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = $_M(c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstIndex, lastIndex) {
return  new J.modelsetbio.CarbohydrateMonomer ().set2 (chain, group3, seqcode, firstIndex, lastIndex, J.modelsetbio.CarbohydrateMonomer.alphaOffsets);
}, "J.modelset.Chain,~S,~N,~N,~N");
$_V(c$, "isCarbohydrate", 
function () {
return true;
});
$_V(c$, "getProteinStructureType", 
function () {
return J.constant.EnumStructure.CARBOHYDRATE;
});
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) for (var j = possiblyPreviousMonomer.firstAtomIndex; j <= possiblyPreviousMonomer.lastAtomIndex; j++) {
var a = this.chain.getAtom (i);
var b = this.chain.getAtom (j);
if (a.getElementNumber () + b.getElementNumber () == 14 && a.distanceSquared (b) < 3.24) return true;
}

return false;
}, "J.modelsetbio.Monomer");
$_V(c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var anomericO = this.getLeadAtom ();
var marBegin = (Clazz_doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (anomericO.sZ == 0) return;
var radiusBegin = Clazz_floatToInt (this.scaleToScreen (anomericO.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
if (this.isCursorOnTopOf (anomericO, x, y, radiusBegin, competitor)) closest[0] = anomericO;
}, "~N,~N,~A,~N,~N");
$_V(c$, "isConnectedPrevious", 
function () {
if (this.monomerIndex <= 0) return false;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) {
if (this.getCrossLink (i, null)) return true;
}
return false;
});
Clazz_defineStatics (c$,
"alphaOffsets", [0]);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.BioPolymer"], "J.modelsetbio.CarbohydratePolymer", null, function () {
c$ = Clazz_declareType (J.modelsetbio, "CarbohydratePolymer", J.modelsetbio.BioPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, J.modelsetbio.CarbohydratePolymer, [monomers]);
this.type = 3;
}, "~A");
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.Monomer"], "J.modelsetbio.PhosphorusMonomer", ["JU.V3", "J.constant.EnumStructure", "J.util.Quaternion"], function () {
c$ = Clazz_decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "PhosphorusMonomer", J.modelsetbio.Monomer);
$_V(c$, "isNucleic", 
function () {
return true;
});
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocateP = $_M(c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex ? null :  new J.modelsetbio.PhosphorusMonomer ().set3 (chain, group3, seqcode, firstIndex, lastIndex, J.modelsetbio.PhosphorusMonomer.phosphorusOffsets));
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
$_M(c$, "set3", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
this.set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
if (group3.indexOf ('T') >= 0) chain.isDna = true;
if (group3.indexOf ('U') + group3.indexOf ('I') > -2) chain.isRna = true;
this.$isPurine = (group3.indexOf ('A') + group3.indexOf ('G') + group3.indexOf ('I') > -3);
this.$isPyrimidine = (group3.indexOf ('T') + group3.indexOf ('C') + group3.indexOf ('U') > -3);
return this;
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
$_M(c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
$_M(c$, "isPhosphorusMonomer", 
function () {
return true;
});
$_V(c$, "isDna", 
function () {
return this.chain.isDna;
});
$_V(c$, "isRna", 
function () {
return this.chain.isRna;
});
$_V(c$, "isPurine", 
function () {
return this.$isPurine;
});
$_V(c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
$_V(c$, "getStructure", 
function () {
return this.chain;
});
$_V(c$, "getProteinStructureType", 
function () {
return J.constant.EnumStructure.NONE;
});
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
return this.isCA2 (possiblyPreviousMonomer);
}, "J.modelsetbio.Monomer");
$_M(c$, "isCA2", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= J.modelsetbio.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "J.modelsetbio.Monomer");
$_V(c$, "getQuaternion", 
function (qType) {
return this.getQuaternionP ();
}, "~S");
$_M(c$, "getQuaternionP", 
function () {
var i = this.monomerIndex;
if (i == 0 || i >= this.bioPolymer.monomerCount - 1) return null;
var ptP = this.bioPolymer.monomers[i].getAtomFromOffsetIndex (0);
var ptA;
var ptB;
ptA = this.bioPolymer.monomers[i + 1].getAtomFromOffsetIndex (0);
ptB = this.bioPolymer.monomers[i - 1].getAtomFromOffsetIndex (0);
if (ptP == null || ptA == null || ptB == null) return null;
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
vA.sub2 (ptA, ptP);
vB.sub2 (ptB, ptP);
return J.util.Quaternion.getQuaternionFrameV (vA, vB, null, false);
});
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
$_V(c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_defineStatics (c$,
"P", 0,
"phosphorusOffsets", [0],
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.PhosphorusMonomer", "J.viewer.JC"], "J.modelsetbio.NucleicMonomer", ["JU.P3", "$.V3", "J.constant.EnumStructure", "J.util.Quaternion"], function () {
c$ = Clazz_decorateAsClass (function () {
this.hasRnaO2Prime = false;
this.baseCenter = null;
Clazz_instantialize (this, arguments);
}, J.modelsetbio, "NucleicMonomer", J.modelsetbio.PhosphorusMonomer);
Clazz_overrideConstructor (c$, 
function () {
});
c$.validateAndAllocate = $_M(c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes) {
var offsets = J.modelsetbio.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, J.modelsetbio.NucleicMonomer.interestingNucleicAtomIDs);
if (offsets == null) return null;
if (!J.modelsetbio.Monomer.checkOptional (offsets, 19, firstAtomIndex, specialAtomIndexes[73])) return null;
J.modelsetbio.Monomer.checkOptional (offsets, 20, firstAtomIndex, specialAtomIndexes[89]);
J.modelsetbio.Monomer.checkOptional (offsets, 18, firstAtomIndex, specialAtomIndexes[90]);
J.modelsetbio.Monomer.checkOptional (offsets, 23, firstAtomIndex, specialAtomIndexes[75]);
J.modelsetbio.Monomer.checkOptional (offsets, 24, firstAtomIndex, specialAtomIndexes[77]);
return ( new J.modelsetbio.NucleicMonomer ()).set4 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
$_M(c$, "set4", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
this.set3 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
if (!J.modelsetbio.Monomer.have (offsets, 15)) {
offsets[0] = offsets[19];
var offset = offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = firstAtomIndex + offset;
}this.hasRnaO2Prime = J.modelsetbio.Monomer.have (offsets, 2);
this.$isPyrimidine = J.modelsetbio.Monomer.have (offsets, 8);
this.$isPurine = J.modelsetbio.Monomer.have (offsets, 9) && J.modelsetbio.Monomer.have (offsets, 10) && J.modelsetbio.Monomer.have (offsets, 11);
return this;
}, "J.modelset.Chain,~S,~N,~N,~N,~A");
$_M(c$, "isNucleicMonomer", 
function () {
return true;
});
$_V(c$, "isDna", 
function () {
return !this.hasRnaO2Prime;
});
$_V(c$, "isRna", 
function () {
return this.hasRnaO2Prime;
});
$_V(c$, "isPurine", 
function () {
return this.$isPurine;
});
$_V(c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
$_M(c$, "isGuanine", 
function () {
return J.modelsetbio.Monomer.have (this.offsets, 17);
});
$_V(c$, "getProteinStructureType", 
function () {
return (this.hasRnaO2Prime ? J.constant.EnumStructure.RNA : J.constant.EnumStructure.DNA);
});
$_M(c$, "getC1P", 
function () {
return this.getAtomFromOffsetIndex (25);
});
$_M(c$, "getC2", 
function () {
return this.getAtomFromOffsetIndex (5);
});
$_M(c$, "getC4P", 
function () {
return this.getAtomFromOffsetIndex (26);
});
$_M(c$, "getN1", 
function () {
return this.getAtomFromOffsetIndex (4);
});
$_M(c$, "getN3", 
function () {
return this.getAtomFromOffsetIndex (6);
});
$_M(c$, "getN2", 
function () {
return this.getAtomFromOffsetIndex (17);
});
$_M(c$, "getN4", 
function () {
return this.getAtomFromOffsetIndex (14);
});
$_M(c$, "getN6", 
function () {
return this.getAtomFromOffsetIndex (16);
});
$_M(c$, "getO2", 
function () {
return this.getAtomFromOffsetIndex (8);
});
$_M(c$, "getO4", 
function () {
return this.getAtomFromOffsetIndex (12);
});
$_M(c$, "getO6", 
function () {
return this.getAtomFromOffsetIndex (13);
});
$_V(c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (J.modelsetbio.Monomer.have (this.offsets, 20) ? 20 : 21);
});
$_M(c$, "getBaseRing6Points", 
function (ring6Points) {
for (var i = 6; --i >= 0; ) ring6Points[i] = this.getAtomFromOffsetIndex (J.modelsetbio.NucleicMonomer.ring6OffsetIndexes[i]);

}, "~A");
$_M(c$, "maybeGetBaseRing5Points", 
function (ring5Points) {
if (this.$isPurine) for (var i = 5; --i >= 0; ) ring5Points[i] = this.getAtomFromOffsetIndex (J.modelsetbio.NucleicMonomer.ring5OffsetIndexes[i]);

return this.$isPurine;
}, "~A");
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var myPhosphorusAtom = this.getAtomFromOffsetIndex (15);
if (myPhosphorusAtom == null) return false;
return ((possiblyPreviousMonomer).getAtomFromOffsetIndex (21).isBonded (myPhosphorusAtom) || this.isCA2 (possiblyPreviousMonomer));
}, "J.modelsetbio.Monomer");
$_V(c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var lead = this.getLeadAtom ();
var o5prime = this.getAtomFromOffsetIndex (19);
var c3prime = this.getAtomFromOffsetIndex (22);
var mar = (Clazz_doubleToInt (madBegin / 2));
if (mar < 1900) mar = 1900;
var radius = Clazz_floatToInt (this.scaleToScreen (lead.sZ, mar));
if (radius < 4) radius = 4;
if (this.isCursorOnTopOf (lead, x, y, radius, competitor) || this.isCursorOnTopOf (o5prime, x, y, radius, competitor) || this.isCursorOnTopOf (c3prime, x, y, radius, competitor)) closest[0] = lead;
}, "~N,~N,~A,~N,~N");
$_M(c$, "setModelClickability", 
function () {
var atom;
if (this.isAtomHidden (this.leadAtomIndex)) return;
for (var i = 6; --i >= 0; ) {
atom = this.getAtomFromOffsetIndex (J.modelsetbio.NucleicMonomer.ring6OffsetIndexes[i]);
atom.setClickable (J.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG);
}
if (this.$isPurine) for (var i = 4; --i >= 1; ) {
atom = this.getAtomFromOffsetIndex (J.modelsetbio.NucleicMonomer.ring5OffsetIndexes[i]);
atom.setClickable (J.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG);
}
});
$_M(c$, "getN0", 
function () {
return (this.getAtomFromOffsetIndex (this.$isPurine ? 11 : 4));
});
$_V(c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
case 'x':
case 'a':
case 'b':
case 'p':
return this.getP ();
case 'c':
if (this.baseCenter == null) {
var n = 0;
this.baseCenter =  new JU.P3 ();
for (var i = 0; i < J.modelsetbio.NucleicMonomer.heavyAtomIndexes.length; i++) {
var a = this.getAtomFromOffsetIndex (J.modelsetbio.NucleicMonomer.heavyAtomIndexes[i]);
if (a == null) continue;
this.baseCenter.add (a);
n++;
}
this.baseCenter.scale (1 / n);
}return this.baseCenter;
case 'n':
default:
return this.getN0 ();
}
}, "~S");
$_V(c$, "getQuaternion", 
function (qType) {
var ptA = null;
var ptB = null;
var ptNorP;
var yBased = false;
var reverseY = false;
switch (qType) {
case 'a':
ptNorP = this.getP ();
if (this.monomerIndex == 0 || ptNorP == null) return null;
yBased = true;
ptA = (this.bioPolymer.monomers[this.monomerIndex - 1]).getC4P ();
ptB = this.getC4P ();
break;
case 'x':
ptNorP = this.getP ();
if (this.monomerIndex == this.bioPolymer.monomerCount - 1 || ptNorP == null) return null;
ptA = (this.bioPolymer.monomers[this.monomerIndex + 1]).getP ();
ptB = this.getC4P ();
break;
case 'b':
return this.getQuaternionP ();
case 'c':
case 'n':
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
yBased = true;
reverseY = true;
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (25);
break;
case 'p':
ptNorP = this.getP ();
if (ptNorP == null) return null;
var p1 = this.getAtomFromOffsetIndex (23);
var p2 = this.getAtomFromOffsetIndex (24);
var bonds = ptNorP.getBonds ();
if (bonds == null) return null;
var g = ptNorP.getGroup ();
for (var i = 0; i < bonds.length; i++) {
var atom = bonds[i].getOtherAtom (ptNorP);
if (p1 != null && atom.index == p1.index) continue;
if (p2 != null && atom.index == p2.index) continue;
if (atom.getGroup () === g) ptB = atom;
 else ptA = atom;
}
break;
case 'q':
return null;
default:
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
if (this.$isPurine) {
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (9);
} else {
ptA = this.getAtomFromOffsetIndex (6);
ptB = this.getAtomFromOffsetIndex (1);
}break;
}
if (ptA == null || ptB == null) return null;
var vA = JU.V3.newVsub (ptA, ptNorP);
var vB = JU.V3.newVsub (ptB, ptNorP);
if (reverseY) vB.scale (-1);
return J.util.Quaternion.getQuaternionFrameV (vA, vB, null, yBased);
}, "~S");
$_V(c$, "isCrossLinked", 
function (g) {
if (!(Clazz_instanceOf (g, J.modelsetbio.NucleicMonomer)) || this.$isPurine == g.isPurine ()) return false;
var otherNucleotide = (this.$isPurine ? g : this);
var myNucleotide = (this.$isPurine ? this : g);
var myN1 = myNucleotide.getN1 ();
var otherN3 = otherNucleotide.getN3 ();
return (myN1.isBonded (otherN3));
}, "J.modelset.Group");
$_V(c$, "getCrossLinkLead", 
function (vReturn) {
var N = (this.$isPurine ? this.getN1 () : this.getN3 ());
var bonds = N.getBonds ();
if (bonds == null) return false;
var haveCrossLinks = false;
for (var i = 0; i < bonds.length; i++) {
if (bonds[i].isHydrogen ()) {
var N2 = bonds[i].getOtherAtom (N);
var g = N2.getGroup ();
if (!(Clazz_instanceOf (g, J.modelsetbio.NucleicMonomer))) continue;
var m = g;
if ((this.$isPurine ? m.getN3 () : m.getN1 ()) === N2) {
if (vReturn == null) return true;
vReturn.addLast (Integer.$valueOf (m.leadAtomIndex));
haveCrossLinks = true;
}}}
return haveCrossLinks;
}, "JU.List");
$_M(c$, "getEdgePoints", 
function (pts) {
pts[0] = this.getLeadAtom ();
pts[1] = this.getC4P ();
pts[2] = pts[5] = this.getC1P ();
switch (this.getGroup1 ()) {
case 'C':
pts[3] = this.getO2 ();
pts[4] = this.getN4 ();
return true;
case 'A':
pts[3] = this.getC2 ();
pts[4] = this.getN6 ();
return true;
case 'G':
case 'I':
pts[3] = this.getC2 ();
pts[4] = this.getO6 ();
return true;
case 'T':
case 'U':
pts[3] = this.getO2 ();
pts[4] = this.getO4 ();
return true;
default:
return false;
}
}, "~A");
Clazz_defineStatics (c$,
"C6", 1,
"O2Pr", 2,
"C5", 3,
"N1", 4,
"C2", 5,
"N3", 6,
"C4", 7,
"O2", 8,
"N7", 9,
"C8", 10,
"N9", 11,
"O4", 12,
"O6", 13,
"N4", 14,
"NP", 15,
"N6", 16,
"N2", 17,
"H5T", 18,
"O5Pr", 19,
"H3T", 20,
"O3Pr", 21,
"C3Pr", 22,
"O1P", 23,
"O2P", 24,
"C1P", 25,
"C4P", 26,
"interestingNucleicAtomIDs", [-14, 37, -80, 36, 32, 33, 34, 35, -39, -40, -41, -42, -48, -47, -43, -14, -45, -44, -73, -7, -89, 10, 9, -75, -77, -13, -9],
"ring6OffsetIndexes", [3, 1, 4, 5, 6, 7],
"ring5OffsetIndexes", [3, 9, 10, 11, 7],
"heavyAtomIndexes", [3, 1, 4, 5, 6, 7, 11, 10, 9, 16, 14, 8, 12, 17, 13]);
c$.CARTOON_VISIBILITY_FLAG = c$.prototype.CARTOON_VISIBILITY_FLAG = J.viewer.JC.getShapeVisibilityFlag (11);
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.BioPolymer"], "J.modelsetbio.NucleicPolymer", ["JU.P4", "$.V3", "J.modelset.HBond", "J.util.Measure"], function () {
c$ = Clazz_declareType (J.modelsetbio, "NucleicPolymer", J.modelsetbio.BioPolymer);
Clazz_makeConstructor (c$, 
function (monomers) {
Clazz_superConstructor (this, J.modelsetbio.NucleicPolymer, [monomers]);
this.type = 2;
this.hasWingPoints = true;
}, "~A");
$_M(c$, "getNucleicPhosphorusAtom", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
$_V(c$, "calcEtaThetaAngles", 
function () {
var eta = NaN;
for (var i = 0; i < this.monomerCount - 2; ++i) {
var m1 = this.monomers[i];
var m2 = this.monomers[i + 1];
var p1 = m1.getP ();
var c41 = m1.getC4P ();
var p2 = m2.getP ();
var c42 = m2.getC4P ();
if (i > 0) {
var m0 = this.monomers[i - 1];
var c40 = m0.getC4P ();
eta = J.util.Measure.computeTorsion (c40, p1, c41, p2, true);
}var theta = J.util.Measure.computeTorsion (p1, c41, p2, c42, true);
if (eta < 0) eta += 360;
if (theta < 0) theta += 360;
m1.setGroupParameter (1112539141, eta);
m1.setGroupParameter (1112539152, theta);
}
return true;
});
$_V(c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vAtoms, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
var other = polymer;
var vNorm =  new JU.V3 ();
var vAB =  new JU.V3 ();
var vAC =  new JU.V3 ();
for (var i = this.monomerCount; --i >= 0; ) {
var myNucleotide = this.monomers[i];
if (!myNucleotide.isPurine ()) continue;
var myN3 = myNucleotide.getN3 ();
var isInA = bsA.get (myN3.index);
if (!isInA && !bsB.get (myN3.index)) continue;
var myN1 = myNucleotide.getN1 ();
var myN9 = myNucleotide.getN0 ();
var plane =  new JU.P4 ();
J.util.Measure.getPlaneThroughPoints (myN3, myN1, myN9, vNorm, vAB, vAC, plane);
var bestN3 = null;
var minDist2 = 25;
var bestNucleotide = null;
for (var j = other.monomerCount; --j >= 0; ) {
var otherNucleotide = other.monomers[j];
if (!otherNucleotide.isPyrimidine ()) continue;
var otherN3 = otherNucleotide.getN3 ();
if (isInA ? !bsB.get (otherN3.index) : !bsA.get (otherN3.index)) continue;
var otherN1 = otherNucleotide.getN0 ();
var dist2 = myN1.distanceSquared (otherN3);
if (dist2 < minDist2 && myN9.distanceSquared (otherN1) > 50 && Math.abs (J.util.Measure.distanceToPlane (plane, otherN3)) < 1) {
bestNucleotide = otherNucleotide;
bestN3 = otherN3;
minDist2 = dist2;
}}
var n = 0;
if (bestN3 != null) {
n += J.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myN1, bestN3);
if (n >= nMaxPerResidue) continue;
if (myNucleotide.isGuanine ()) {
n += J.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN2 (), bestNucleotide.getO2 ());
if (n >= nMaxPerResidue) continue;
n += J.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getO6 (), bestNucleotide.getN4 ());
if (n >= nMaxPerResidue) continue;
} else {
n += J.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN6 (), bestNucleotide.getO4 ());
}}}
}, "J.modelsetbio.BioPolymer,JU.BS,JU.BS,JU.List,~N,~A,~B,~B");
c$.addHydrogenBond = $_M(c$, "addHydrogenBond", 
function (vAtoms, atom1, atom2) {
if (atom1 == null || atom2 == null) return 0;
vAtoms.addLast ( new J.modelset.HBond (atom1, atom2, 18432, 1, 0, 0));
return 1;
}, "JU.List,J.modelset.Atom,J.modelset.Atom");
$_M(c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
J.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "J.viewer.Viewer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS");
});
Clazz_declarePackage ("J.modelsetbio");
Clazz_load (["J.modelsetbio.BioPolymer"], "J.modelsetbio.PhosphorusPolymer", null, function () {
c$ = Clazz_declareType (J.modelsetbio, "PhosphorusPolymer", J.modelsetbio.BioPolymer);
$_M(c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
J.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "J.viewer.Viewer,~S,~S,~N,~N,JU.BS,JU.BS,~B,~B,~B,~A,JU.OC,JU.SB,JU.BS");
});
Clazz_declarePackage ("J.dssx");
Clazz_load (null, "J.dssx.Bridge", ["java.lang.Boolean", "J.util.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.a = null;
this.b = null;
this.ladder = null;
this.isAntiparallel = false;
Clazz_instantialize (this, arguments);
}, J.dssx, "Bridge");
Clazz_makeConstructor (c$, 
function (a, b, htLadders) {
this.a = a;
this.b = b;
this.ladder =  Clazz_newIntArray (2, 2, 0);
this.ladder[0][0] = this.ladder[0][1] = Math.min (a.index, b.index);
this.ladder[1][0] = this.ladder[1][1] = Math.max (a.index, b.index);
this.addLadder (htLadders);
}, "J.modelset.Atom,J.modelset.Atom,java.util.Map");
$_M(c$, "addBridge", 
function (bridge, htLadders) {
if (bridge.isAntiparallel != this.isAntiparallel || !this.canAdd (bridge) || !bridge.canAdd (this)) return false;
this.extendLadder (bridge.ladder[0][0], bridge.ladder[1][0]);
this.extendLadder (bridge.ladder[0][1], bridge.ladder[1][1]);
bridge.ladder = this.ladder;
if (bridge.ladder !== this.ladder) {
htLadders.remove (bridge.ladder);
this.addLadder (htLadders);
}return true;
}, "J.dssx.Bridge,java.util.Map");
$_M(c$, "addLadder", 
function (htLadders) {
htLadders.put (this.ladder, (this.isAntiparallel ? Boolean.TRUE : Boolean.FALSE));
}, "java.util.Map");
$_M(c$, "canAdd", 
function (bridge) {
var index1 = bridge.a.index;
var index2 = bridge.b.index;
return (this.isAntiparallel ? (index1 >= this.ladder[0][1] && index2 <= this.ladder[1][0] || index1 <= this.ladder[0][0] && index2 >= this.ladder[1][1]) : (index1 <= this.ladder[0][0] && index2 <= this.ladder[1][0] || index1 >= this.ladder[0][1] && index2 >= this.ladder[1][1]));
}, "J.dssx.Bridge");
$_M(c$, "extendLadder", 
function (index1, index2) {
if (this.ladder[0][0] > index1) this.ladder[0][0] = index1;
if (this.ladder[0][1] < index1) this.ladder[0][1] = index1;
if (this.ladder[1][0] > index2) this.ladder[1][0] = index2;
if (this.ladder[1][1] < index2) this.ladder[1][1] = index2;
}, "~N,~N");
$_V(c$, "toString", 
function () {
return (this.isAntiparallel ? "a " : "p ") + this.a + " - " + this.b + "\t" + J.util.Escape.e (this.ladder);
});
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "DSSPInterface");
Clazz_declarePackage ("J.dssx");
Clazz_load (["J.api.DSSPInterface"], "J.dssx.DSSP", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.BS", "$.List", "$.PT", "$.SB", "J.constant.EnumStructure", "J.dssx.Bridge", "J.i18n.GT", "J.modelset.HBond", "J.modelsetbio.AminoPolymer", "J.util.Escape", "$.Logger", "J.viewer.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bioPolymers = null;
this.vHBonds = null;
this.done = null;
this.doReport = false;
this.dsspIgnoreHydrogens = false;
this.$setStructure = false;
this.labels = null;
this.bsBad = null;
this.bioPolymerCount = 0;
this.htBridges = null;
this.htLadders = null;
this.bridgesA = null;
this.bridgesP = null;
this.sheetOffsets = null;
Clazz_instantialize (this, arguments);
}, J.dssx, "DSSP", null, J.api.DSSPInterface);
Clazz_prepareFields (c$, function () {
this.sheetOffsets = [[0, -1, 1, 0, 1, 0, 0, -1], [0, 0, 0, 0, 1, -1, 1, -1]];
});
Clazz_makeConstructor (c$, 
function () {
});
$_V(c$, "calculateDssp", 
function (objBioPolymers, bioPolymerCount, objVHBonds, doReport, dsspIgnoreHydrogens, setStructure) {
this.bioPolymers = objBioPolymers;
this.bioPolymerCount = bioPolymerCount;
this.vHBonds = objVHBonds;
this.doReport = doReport;
this.dsspIgnoreHydrogens = dsspIgnoreHydrogens;
this.$setStructure = setStructure;
var bsAmino =  new JU.BS ();
for (var i = 0; i < bioPolymerCount; i++) if (Clazz_instanceOf (this.bioPolymers[i], J.modelsetbio.AminoPolymer)) bsAmino.set (i);

if (bsAmino.isEmpty ()) return "";
var m = this.bioPolymers[0].model;
var sb =  new JU.SB ();
sb.append ("Jmol ").append (J.viewer.Viewer.getJmolVersion ()).append (" DSSP analysis for model ").append (m.getModelNumberDotted ()).append (" - ").append (m.getModelTitle ()).append ("\n");
if (m.modelIndex == 0) sb.append ("\nW. Kabsch and C. Sander, Biopolymers, vol 22, 1983, pp 2577-2637\n").append ("\nWe thank Wolfgang Kabsch and Chris Sander for writing the DSSP software,\n").append ("and we thank the CMBI for maintaining it to the extent that it was easy to\n").append ("re-engineer for our purposes. At this point in time, we make no guarantee\n").append ("that this code gives precisely the same analysis as the code available via license\n").append ("from CMBI at http://swift.cmbi.ru.nl/gv/dssp\n");
if (setStructure && m.modelIndex == 0) sb.append ("\nAll bioshapes have been deleted and must be regenerated.\n");
if (m.nAltLocs > 0) sb.append ("\nNote: This model contains alternative locations. Use  'CONFIGURATION 1' to be consistent with CMBI DSSP.\n");
this.labels =  Clazz_newCharArray (bioPolymerCount, '\0');
this.done =  new Array (bioPolymerCount);
this.bsBad =  new JU.BS ();
var haveWarned = false;
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) {
var ap = this.bioPolymers[i];
if (!haveWarned && (ap.monomers[0]).getExplicitNH () != null) {
if (dsspIgnoreHydrogens) sb.append (J.i18n.GT.o (J.i18n.GT._ ("NOTE: Backbone amide hydrogen positions are present and will be ignored. Their positions will be approximated, as in standard DSSP analysis.\nUse {0} to not use this approximation.\n\n"), "SET dsspCalculateHydrogenAlways FALSE"));
 else sb.append (J.i18n.GT.o (J.i18n.GT._ ("NOTE: Backbone amide hydrogen positions are present and will be used. Results may differ significantly from standard DSSP analysis.\nUse {0} to ignore these hydrogen positions.\n\n"), "SET dsspCalculateHydrogenAlways TRUE"));
haveWarned = true;
}ap.recalculateLeadMidpointsAndWingVectors ();
var n = ap.monomerCount;
this.labels[i] =  Clazz_newCharArray (n, '\0');
this.done[i] =  new JU.BS ();
for (var j = 0; j < n; j++) if ((ap.monomers[j]).getCarbonylOxygenAtom () == null) this.bsBad.set (ap.monomers[j].leadAtomIndex);

}
var min = this.getDualHydrogenBondArray ();
this.bridgesA =  new JU.List ();
this.bridgesP =  new JU.List ();
this.htBridges =  new java.util.Hashtable ();
this.htLadders =  new java.util.Hashtable ();
this.getBridges (min);
this.getSheetStructures ();
var reports =  new Array (bioPolymerCount);
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) if (min[i] != null) reports[i] = this.findHelixes (i, min[i]);

if (doReport) {
var sbSummary =  new JU.SB ();
sb.append ("\n------------------------------\n");
for (var i = bsAmino.nextSetBit (0); i >= 0; i = bsAmino.nextSetBit (i + 1)) if (this.labels[i] != null) {
var ap = this.bioPolymers[i];
sbSummary.append (this.dumpSummary (ap, this.labels[i]));
sb.append (reports[i]).append (this.dumpTags (ap, "$.1: " + String.valueOf (this.labels[i]), this.bsBad, 2));
}
if (this.bsBad.nextSetBit (0) >= 0) sb.append ("\nNOTE: '!' indicates a residue that is missing a backbone carbonyl oxygen atom.\n");
sb.append ("\n").append ("SUMMARY:" + sbSummary);
}return sb.toString ();
}, "~A,~N,~O,~B,~B,~B");
$_M(c$, "getDualHydrogenBondArray", 
function () {
var min = JU.AU.newInt4 (this.bioPolymerCount);
for (var i = 0; i < this.bioPolymerCount; i++) {
if (!(Clazz_instanceOf (this.bioPolymers[i], J.modelsetbio.AminoPolymer))) continue;
var n = this.bioPolymers[i].monomerCount;
min[i] =  Clazz_newIntArray (n, 2, 3, 0);
for (var j = 0; j < n; ++j) {
min[i][j][0][1] = min[i][j][1][1] = -2147483648;
min[i][j][0][2] = min[i][j][1][2] = 0;
}
}
for (var i = 0; i < this.bioPolymerCount; i++) if (min[i] != null) for (var j = 0; j < this.bioPolymerCount; j++) if (min[j] != null) this.bioPolymers[i].calcRasmolHydrogenBonds (this.bioPolymers[j], null, null, null, 2, min[i], false, this.dsspIgnoreHydrogens);


return min;
});
$_M(c$, "getBridges", 
function (min) {
var atoms = this.bioPolymers[0].model.getModelSet ().atoms;
var bridge = null;
var htTemp =  new java.util.Hashtable ();
for (var p1 = 0; p1 < min.length; p1++) if (Clazz_instanceOf (this.bioPolymers[p1], J.modelsetbio.AminoPolymer)) {
var ap1 = (this.bioPolymers[p1]);
var n = min[p1].length - 1;
for (var a = 1; a < n; a++) {
var ia = ap1.monomers[a].leadAtomIndex;
if (this.bsBad.get (ia)) continue;
for (var p2 = p1; p2 < min.length; p2++) if (Clazz_instanceOf (this.bioPolymers[p2], J.modelsetbio.AminoPolymer)) for (var b = (p1 == p2 ? a + 3 : 1); b < min[p2].length - 1; b++) {
var ap2 = this.bioPolymers[p2];
var ib = ap2.monomers[b].leadAtomIndex;
if (this.bsBad.get (ib)) continue;
if ((bridge = this.getBridge (min, p1, a, p2, b, this.bridgesP, atoms[ia], atoms[ib], ap1, ap2, htTemp, false)) != null) {
} else if ((bridge = this.getBridge (min, p1, a, p2, b, this.bridgesA, atoms[ia], atoms[ib], ap1, ap2, htTemp, true)) != null) {
bridge.isAntiparallel = true;
} else {
continue;
}if (J.util.Logger.debugging) J.util.Logger.debug ("Bridge found " + bridge);
this.done[p1].set (a);
this.done[p2].set (b);
this.htBridges.put (ia + "-" + ib, bridge);
}

}
}
}, "~A");
$_M(c$, "getBridge", 
function (min, p1, a, p2, b, bridges, atom1, atom2, ap1, ap2, htTemp, isAntiparallel) {
var b1 = null;
var b2 = null;
var ipt = 0;
var offsets = (isAntiparallel ? this.sheetOffsets[1] : this.sheetOffsets[0]);
if ((b1 = this.isHbonded (a + offsets[0], b + offsets[1], p1, p2, min)) != null && (b2 = this.isHbonded (b + offsets[2], a + offsets[3], p2, p1, min)) != null || (b1 = this.isHbonded (a + offsets[ipt = 4], b + offsets[5], p1, p2, min)) != null && (b2 = this.isHbonded (b + offsets[6], a + offsets[7], p2, p1, min)) != null) {
var bridge =  new J.dssx.Bridge (atom1, atom2, this.htLadders);
bridges.addLast (bridge);
if (this.vHBonds != null) {
var type = (isAntiparallel ? 14336 : 6144);
this.addHbond (ap1.monomers[a + offsets[ipt]], ap2.monomers[b + offsets[++ipt]], b1[2], type, htTemp);
this.addHbond (ap2.monomers[b + offsets[++ipt]], ap1.monomers[a + offsets[++ipt]], b2[2], type, htTemp);
}return bridge;
}return null;
}, "~A,~N,~N,~N,~N,JU.List,J.modelset.Atom,J.modelset.Atom,J.modelsetbio.AminoPolymer,J.modelsetbio.AminoPolymer,java.util.Map,~B");
$_M(c$, "addHbond", 
function (donor, acceptor, iEnergy, type, htTemp) {
var nitrogen = (donor).getNitrogenAtom ();
var oxygen = (acceptor).getCarbonylOxygenAtom ();
if (htTemp != null) {
var key = nitrogen.index + " " + oxygen.index;
if (htTemp.containsKey (key)) return;
htTemp.put (key, Boolean.TRUE);
}this.vHBonds.addLast ( new J.modelset.HBond (nitrogen, oxygen, type, 1, 0, iEnergy / 1000));
}, "J.modelsetbio.Monomer,J.modelsetbio.Monomer,~N,~N,java.util.Map");
$_M(c$, "getSheetStructures", 
function () {
if (this.bridgesA.size () == 0 && this.bridgesP.size () == 0) return;
this.createLadders (this.bridgesA, true);
this.createLadders (this.bridgesP, false);
var bsEEE =  new JU.BS ();
var bsB =  new JU.BS ();
for (var ladder, $ladder = this.htLadders.keySet ().iterator (); $ladder.hasNext () && ((ladder = $ladder.next ()) || true);) {
if (ladder[0][0] == ladder[0][1] && ladder[1][0] == ladder[1][1]) {
bsB.set (ladder[0][0]);
bsB.set (ladder[1][0]);
} else {
bsEEE.setBits (ladder[0][0], ladder[0][1] + 1);
bsEEE.setBits (ladder[1][0], ladder[1][1] + 1);
}}
var bsSheet =  new JU.BS ();
var bsBridge =  new JU.BS ();
for (var i = this.bioPolymers.length; --i >= 0; ) {
if (!(Clazz_instanceOf (this.bioPolymers[i], J.modelsetbio.AminoPolymer))) continue;
bsSheet.clearAll ();
bsBridge.clearAll ();
var ap = this.bioPolymers[i];
for (var iStart = 0; iStart < ap.monomerCount; ) {
var index = ap.monomers[iStart].leadAtomIndex;
if (bsEEE.get (index)) {
var iEnd = iStart + 1;
while (iEnd < ap.monomerCount && bsEEE.get (ap.monomers[iEnd].leadAtomIndex)) iEnd++;

bsSheet.setBits (iStart, iEnd);
iStart = iEnd;
} else {
if (bsB.get (index)) bsBridge.set (iStart);
++iStart;
}}
if (this.doReport) {
this.setTag (this.labels[i], bsBridge, 'B');
this.setTag (this.labels[i], bsSheet, 'E');
}if (this.$setStructure) {
this.setStructure (ap, bsSheet, J.constant.EnumStructure.SHEET);
}this.done[i].or (bsSheet);
this.done[i].or (bsBridge);
}
});
$_M(c$, "createLadders", 
function (bridges, isAntiparallel) {
var dir = (isAntiparallel ? -1 : 1);
var n = bridges.size ();
for (var i = 0; i < n; i++) this.checkBridge (bridges.get (i), isAntiparallel, 1, dir);

for (var i = 0; i < n; i++) this.checkBulge (bridges.get (i), isAntiparallel, 1);

}, "JU.List,~B");
$_M(c$, "checkBridge", 
function (bridge, isAntiparallel, n1, n2) {
var b = this.htBridges.get (bridge.a.getOffsetResidueAtom ("0", n1) + "-" + bridge.b.getOffsetResidueAtom ("0", n2));
return (b != null && bridge.addBridge (b, this.htLadders));
}, "J.dssx.Bridge,~B,~N,~N");
$_M(c$, "checkBulge", 
function (bridge, isAntiparallel, dir) {
var dir1 = (isAntiparallel ? -1 : 1);
for (var i = 0; i < 3; i++) for (var j = (i == 0 ? 1 : 0); j < 6; j++) {
this.checkBridge (bridge, isAntiparallel, i * dir, j * dir1);
if (j > i) this.checkBridge (bridge, isAntiparallel, j * dir, i * dir1);
}

}, "J.dssx.Bridge,~B,~N");
$_M(c$, "dumpSummary", 
function (ap, labels) {
var a = ap.monomers[0].getLeadAtom ();
var id = a.getChainID ();
var prefix = (id == 0 ? "" : a.getChainIDStr () + ":");
var sb =  new JU.SB ();
var lastChar = '\u0000';
var insCode1 = '\u0000';
var insCode2 = '\u0000';
var firstResno = -1;
var lastResno = -1;
var n = ap.monomerCount;
var m = ap.monomers;
for (var i = 0; i <= n; i++) {
if (i == n || labels[i] != lastChar) {
if (lastChar != '\0') sb.appendC ('\n').appendC (lastChar).append (" : ").append (prefix).appendI (firstResno).append (insCode1 == '\0' ? "" : String.valueOf (insCode1)).append ("_").append (prefix).appendI (lastResno).append (insCode2 == '\0' ? "" : String.valueOf (insCode2));
if (i == n) break;
lastChar = labels[i];
firstResno = m[i].getResno ();
insCode1 = m[i].getInsertionCode ();
}lastResno = m[i].getResno ();
insCode2 = m[i].getInsertionCode ();
}
return sb.toString ();
}, "J.modelsetbio.AminoPolymer,~A");
$_M(c$, "dumpTags", 
function (ap, lines, bsBad, mode) {
var prefix = ap.monomers[0].getLeadAtom ().getChainID () + "." + (ap.bioPolymerIndexInModel + 1);
lines = JU.PT.simpleReplace (lines, "$", prefix);
var iFirst = ap.monomers[0].getResno ();
var pre = "\n" + prefix;
var sb =  new JU.SB ();
var sb0 =  new JU.SB ().append (pre + ".8: ");
var sb1 =  new JU.SB ().append (pre + ".7: ");
var sb2 =  new JU.SB ().append (pre + ".6: ");
var sb3 =  new JU.SB ().append (pre + ".0: ");
var i = iFirst;
var n = ap.monomerCount;
for (var ii = 0; ii < n; ii++) {
i = ap.monomers[ii].getResno ();
sb0.append (i % 100 == 0 ? "" + ((Clazz_doubleToInt (i / 100)) % 100) : " ");
sb1.append (i % 10 == 0 ? "" + ((Clazz_doubleToInt (i / 10)) % 10) : " ");
sb2.appendI (i % 10);
sb3.appendC (bsBad.get (ap.monomers[ii].leadAtomIndex) ? '!' : ap.monomers[ii].getGroup1 ());
}
if ((mode & 1) == 1) sb.appendSB (sb0).appendSB (sb1).appendSB (sb2);
sb.append ("\n");
sb.append (lines);
if ((mode & 2) == 2) {
sb.appendSB (sb3);
sb.append ("\n\n");
}return sb.toString ().$replace ('\0', '.');
}, "J.modelsetbio.AminoPolymer,~S,JU.BS,~N");
$_M(c$, "isHbonded", 
function (indexDonor, indexAcceptor, pDonor, pAcceptor, min) {
if (indexDonor < 0 || indexAcceptor < 0) return null;
var min1 = min[pDonor];
var min2 = min[pAcceptor];
if (indexDonor >= min1.length || indexAcceptor >= min2.length) return null;
return (min1[indexDonor][0][0] == pAcceptor && min1[indexDonor][0][1] == indexAcceptor ? min1[indexDonor][0] : min1[indexDonor][1][0] == pAcceptor && min1[indexDonor][1][1] == indexAcceptor ? min1[indexDonor][1] : null);
}, "~N,~N,~N,~N,~A");
$_M(c$, "findHelixes", 
function (iPolymer, min) {
var ap = this.bioPolymers[iPolymer];
if (J.util.Logger.debugging) for (var j = 0; j < ap.monomerCount; j++) J.util.Logger.debug (iPolymer + "." + ap.monomers[j].getResno () + "\t" + J.util.Escape.e (min[j]));

var bsTurn =  new JU.BS ();
var line4 = this.findHelixes2 (iPolymer, 4, min, J.constant.EnumStructure.HELIXALPHA, 10240, bsTurn);
var line3 = this.findHelixes2 (iPolymer, 3, min, J.constant.EnumStructure.HELIX310, 8192, bsTurn);
var line5 = this.findHelixes2 (iPolymer, 5, min, J.constant.EnumStructure.HELIXPI, 12288, bsTurn);
if (this.$setStructure) this.setStructure (ap, bsTurn, J.constant.EnumStructure.TURN);
if (this.doReport) {
this.setTag (this.labels[iPolymer], bsTurn, 'T');
return this.dumpTags (ap, "$.5: " + line5 + "\n" + "$.4: " + line4 + "\n" + "$.3: " + line3, this.bsBad, 1);
}return "";
}, "~N,~A");
$_M(c$, "findHelixes2", 
function (iPolymer, pitch, min, subtype, type, bsTurn) {
var ap = this.bioPolymers[iPolymer];
var bsStart =  new JU.BS ();
var bsNNN =  new JU.BS ();
var bsX =  new JU.BS ();
var bsStop =  new JU.BS ();
var bsHelix =  new JU.BS ();
var bsDone = this.done[iPolymer];
var warning = "";
var n = ap.monomerCount;
for (var i = pitch; i < n; ++i) {
var i0 = i - pitch;
var bpt = 0;
if (min[i][0][0] == iPolymer && min[i][0][1] == i0 || min[i][bpt = 1][0] == iPolymer && min[i][1][1] == i0) {
var ia = ap.monomers[i0].leadAtomIndex;
var ipt = this.bsBad.nextSetBit (ia);
var m = ap.monomers[i];
if (ipt >= ia && ipt <= m.leadAtomIndex) continue;
bsStart.set (i0);
bsNNN.setBits (i0 + 1, i);
bsStop.set (i);
ipt = bsDone.nextSetBit (i0);
var isClear = (ipt < 0 || ipt >= i);
var addH = false;
if (i0 > 0 && bsStart.get (i0 - 1) && (pitch == 4 || isClear)) {
bsHelix.setBits (i0, i);
if (!isClear) warning += "  WARNING! Bridge to helix at " + ap.monomers[ipt];
addH = true;
} else if (isClear || bsDone.nextClearBit (ipt) < i) {
addH = true;
}if (bsStop.get (i0)) bsX.set (i0);
if (addH && this.vHBonds != null) {
this.addHbond (m, ap.monomers[i0], min[i][bpt][2], type, null);
}}}
var taglines;
if (this.doReport) {
taglines =  Clazz_newCharArray (n, '\0');
this.setTag (taglines, bsNNN, String.fromCharCode (48 + pitch));
this.setTag (taglines, bsStart, '>');
this.setTag (taglines, bsStop, '<');
this.setTag (taglines, bsX, 'X');
} else {
taglines = null;
}bsDone.or (bsHelix);
bsNNN.andNot (bsDone);
bsTurn.or (bsNNN);
bsTurn.andNot (bsHelix);
if (this.$setStructure) this.setStructure (ap, bsHelix, subtype);
if (this.doReport) {
this.setTag (this.labels[iPolymer], bsHelix, String.fromCharCode (68 + pitch));
return String.valueOf (taglines) + warning;
}return "";
}, "~N,~N,~A,J.constant.EnumStructure,~N,JU.BS");
$_M(c$, "setTag", 
function (tags, bs, ch) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) tags[i] = ch;

}, "~A,JU.BS,~S");
$_M(c$, "setStructure", 
function (ap, bs, type) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var i2 = bs.nextClearBit (i);
if (i2 < 0) i2 = ap.monomerCount;
ap.addStructureProtected (type, null, 0, 0, i, i2 - 1);
i = i2;
}
}, "J.modelsetbio.AminoPolymer,JU.BS,J.constant.EnumStructure");
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shape.AtomShape", "J.modelset.Atom", "J.modelsetbio.NucleicMonomer", "J.viewer.JC"], "J.shapebio.BioShape", ["java.lang.Float", "JU.AU", "$.BS", "J.constant.EnumPalette", "$.EnumStructure", "J.modelsetbio.NucleicPolymer", "J.util.C", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.modelIndex = 0;
this.modelVisibilityFlags = 0;
this.shape = null;
this.bioPolymer = null;
this.meshes = null;
this.meshReady = null;
this.colixesBack = null;
this.monomers = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.hasBfactorRange = false;
this.bfactorMin = 0;
this.bfactorMax = 0;
this.range = 0;
this.floatRange = 0;
Clazz_instantialize (this, arguments);
}, J.shapebio, "BioShape", J.shape.AtomShape);
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_V(c$, "getMonomers", 
function () {
return this.monomers;
});
Clazz_makeConstructor (c$, 
function (shape, modelIndex, bioPolymer) {
Clazz_superConstructor (this, J.shapebio.BioShape, []);
this.shape = shape;
this.modelIndex = modelIndex;
this.bioPolymer = bioPolymer;
this.isActive = shape.isActive;
this.bsSizeDefault =  new JU.BS ();
this.monomerCount = bioPolymer.monomerCount;
if (this.monomerCount > 0) {
this.colixes =  Clazz_newShortArray (this.monomerCount, 0);
this.paletteIDs =  Clazz_newByteArray (this.monomerCount, 0);
this.mads =  Clazz_newShortArray (this.monomerCount + 1, 0);
this.monomers = bioPolymer.getGroups ();
this.meshReady =  Clazz_newBooleanArray (this.monomerCount, false);
this.meshes =  new Array (this.monomerCount);
this.wingVectors = bioPolymer.getWingVectors ();
this.leadAtomIndices = bioPolymer.getLeadAtomIndices ();
}}, "J.shapebio.BioShapeCollection,~N,J.modelsetbio.BioPolymer");
$_M(c$, "calcBfactorRange", 
function () {
this.bfactorMin = this.bfactorMax = this.monomers[0].getLeadAtom ().getBfactor100 ();
for (var i = this.monomerCount; --i > 0; ) {
var bfactor = this.monomers[i].getLeadAtom ().getBfactor100 ();
if (bfactor < this.bfactorMin) this.bfactorMin = bfactor;
 else if (bfactor > this.bfactorMax) this.bfactorMax = bfactor;
}
this.range = this.bfactorMax - this.bfactorMin;
this.floatRange = this.range;
this.hasBfactorRange = true;
});
$_M(c$, "calcMeanPositionalDisplacement", 
function (bFactor100) {
return Clazz_doubleToShort (Math.sqrt (bFactor100 / 7895.6835208714865) * 1000);
}, "~N");
$_V(c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
this.bioPolymer.findNearestAtomIndex (xMouse, yMouse, closest, this.mads, this.shape.myVisibilityFlag, bsNot);
}, "~N,~N,~A,JU.BS");
$_M(c$, "setMad", 
function (mad, bsSelected, values) {
if (this.monomerCount < 2) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new JU.BS ();
var flag = this.shape.myVisibilityFlag;
for (var i = this.monomerCount; --i >= 0; ) {
var leadAtomIndex = this.leadAtomIndices[i];
if (bsSelected.get (leadAtomIndex)) {
if (values != null && leadAtomIndex < values.length) {
if (Float.isNaN (values[leadAtomIndex])) continue;
mad = Clazz_floatToShort (values[leadAtomIndex] * 2000);
}var isVisible = ((this.mads[i] = this.getMad (i, mad)) > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.monomers[i].setShapeVisibility (flag, isVisible);
this.shape.atoms[leadAtomIndex].setShapeVisibility (flag, isVisible);
this.falsifyNearbyMesh (i);
}}
if (this.monomerCount > 1) this.mads[this.monomerCount] = this.mads[this.monomerCount - 1];
}, "~N,JU.BS,~A");
$_M(c$, "getMad", 
function (groupIndex, mad) {
this.bsSizeDefault.setBitTo (groupIndex, mad == -1 || mad == -2);
if (mad >= 0) return mad;
switch (mad) {
case -1:
case -2:
if (mad == -1 && this.shape.madOn >= 0) return this.shape.madOn;
switch (this.monomers[groupIndex].getProteinStructureType ()) {
case J.constant.EnumStructure.SHEET:
case J.constant.EnumStructure.HELIX:
return this.shape.madHelixSheet;
case J.constant.EnumStructure.DNA:
case J.constant.EnumStructure.RNA:
return this.shape.madDnaRna;
default:
return this.shape.madTurnRandom;
}
case -3:
{
if (!this.hasBfactorRange) this.calcBfactorRange ();
var atom = this.monomers[groupIndex].getLeadAtom ();
var bfactor100 = atom.getBfactor100 ();
var scaled = bfactor100 - this.bfactorMin;
if (this.range == 0) return 0;
var percentile = scaled / this.floatRange;
if (percentile < 0 || percentile > 1) J.util.Logger.error ("Que ha ocurrido? " + percentile);
return Clazz_floatToShort ((1750 * percentile) + 250);
}case -4:
{
var atom = this.monomers[groupIndex].getLeadAtom ();
return (2 * this.calcMeanPositionalDisplacement (atom.getBfactor100 ()));
}}
J.util.Logger.error ("unrecognized setMad(" + mad + ")");
return 0;
}, "~N,~N");
$_M(c$, "falsifyMesh", 
function () {
if (this.meshReady == null) return;
for (var i = 0; i < this.monomerCount; i++) this.meshReady[i] = false;

});
$_M(c$, "falsifyNearbyMesh", 
function (index) {
if (this.meshReady == null) return;
this.meshReady[index] = false;
if (index > 0) this.meshReady[index - 1] = false;
if (index < this.monomerCount - 1) this.meshReady[index + 1] = false;
}, "~N");
$_M(c$, "setColixBS", 
function (colix, pid, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
this.colixes[i] = this.shape.getColixI (colix, pid, atomIndex);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = 0;
this.paletteIDs[i] = pid;
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}}
}, "~N,~N,JU.BS");
$_M(c$, "setColixes", 
function (atomColixes, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < atomColixes.length) {
this.colixes[i] = this.shape.getColixI (atomColixes[atomIndex], J.constant.EnumPalette.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.constant.EnumPalette.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,JU.BS");
$_M(c$, "setParams", 
function (data, atomMap, bsSelected) {
if (this.monomerCount == 0) return;
var c = data[0];
var atrans = data[1];
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
var n = atomMap.length;
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex) && i < this.colixes.length && atomIndex < n) {
var pt = atomMap[atomIndex];
var colix = (c == null ? 0 : c[pt]);
var f = (atrans == null ? 0 : atrans[pt]);
if (f > 0.01) colix = J.util.C.getColixTranslucent3 (colix, true, f);
this.colixes[i] = this.shape.getColixI (colix, J.constant.EnumPalette.UNKNOWN.id, atomIndex);
if (this.colixesBack != null && i < this.colixesBack.length) this.colixesBack[i] = 0;
this.paletteIDs[i] = J.constant.EnumPalette.UNKNOWN.id;
this.bsColixSet.set (i);
}}
}, "~A,~A,JU.BS");
$_M(c$, "setColixBack", 
function (colix, bsSelected) {
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
if (this.colixesBack == null) this.colixesBack =  Clazz_newShortArray (this.colixes.length, 0);
if (this.colixesBack.length < this.colixes.length) this.colixesBack = JU.AU.ensureLengthShort (this.colixesBack, this.colixes.length);
this.colixesBack[i] = colix;
}}
}, "~N,JU.BS");
$_M(c$, "setTranslucent", 
function (isTranslucent, bsSelected, translucentLevel) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new JU.BS ();
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) {
this.colixes[i] = J.util.C.getColixTranslucent3 (this.colixes[i], isTranslucent, translucentLevel);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = J.util.C.getColixTranslucent3 (this.colixesBack[i], isTranslucent, translucentLevel);
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}
}, "~B,JU.BS,~N");
$_V(c$, "setModelClickability", 
function () {
if (!this.isActive || this.wingVectors == null) return;
var isNucleicPolymer = Clazz_instanceOf (this.bioPolymer, J.modelsetbio.NucleicPolymer);
for (var i = this.monomerCount; --i >= 0; ) {
if (this.mads[i] <= 0) continue;
var iAtom = this.leadAtomIndices[i];
if (this.monomers[i].chain.model.modelSet.isAtomHidden (iAtom)) continue;
this.shape.atoms[iAtom].setClickable (J.shapebio.BioShape.ALPHA_CARBON_VISIBILITY_FLAG);
if (isNucleicPolymer) (this.monomers[i]).setModelClickability ();
}
});
c$.ALPHA_CARBON_VISIBILITY_FLAG = c$.prototype.ALPHA_CARBON_VISIBILITY_FLAG = J.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG | J.modelset.Atom.BACKBONE_VISIBILITY_FLAG | J.viewer.JC.getShapeVisibilityFlag (10) | J.viewer.JC.getShapeVisibilityFlag (12) | J.viewer.JC.getShapeVisibilityFlag (13) | J.viewer.JC.getShapeVisibilityFlag (14);
Clazz_defineStatics (c$,
"eightPiSquared100", 7895.6835208714865);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shape.Shape"], "J.shapebio.BioShapeCollection", ["JU.AU", "J.constant.EnumPalette", "J.shapebio.BioShape", "J.util.BSUtil", "$.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.atoms = null;
this.madOn = -2;
this.madHelixSheet = 3000;
this.madTurnRandom = 800;
this.madDnaRna = 5000;
this.isActive = false;
this.bioShapes = null;
Clazz_instantialize (this, arguments);
}, J.shapebio, "BioShapeCollection", J.shape.Shape);
$_V(c$, "initModelSet", 
function () {
this.isBioShape = true;
this.atoms = this.modelSet.atoms;
this.initialize ();
});
$_V(c$, "getSizeG", 
function (group) {
var m = group;
var groupIndex = m.getGroupIndex ();
var leadAtomIndex = m.getLeadAtom ().getIndex ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) {
if (bioShape.monomers[j].getGroupIndex () == groupIndex && bioShape.monomers[j].getLeadAtom ().getIndex () == leadAtomIndex) return bioShape.mads[j];
}
}
return 0;
}, "J.modelset.Group");
$_V(c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setMad (mad, bsSelected, (rd == null ? null : rd.values));
}
}, "~N,J.atomdata.RadiusData,JU.BS");
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_M(c$, "setPropBSC", 
function (propertyName, value, bsSelected) {
if (propertyName === "refreshTrajectories") {
var modelIndex = ((value)[0]).intValue ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex == modelIndex) b.falsifyMesh ();
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex > modelIndex) {
b.modelIndex--;
b.leadAtomIndices = b.bioPolymer.getLeadAtomIndices ();
} else if (b.modelIndex == modelIndex) {
this.bioShapes = JU.AU.deleteElements (this.bioShapes, i, 1);
}}
return;
}this.initialize ();
if ("color" === propertyName) {
var pid = J.constant.EnumPalette.pidOf (value);
var colix = J.util.C.getColixO (value);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setColixBS (colix, pid, bsSelected);
}
return;
}if ("params" === propertyName) {
var n = bsSelected.length ();
var atomMap =  Clazz_newIntArray (n, 0);
for (var pt = 0, i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1), pt++) atomMap[i] = pt;

for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setParams (value, atomMap, bsSelected);

return;
}if ("colorPhase" === propertyName) {
var twoColors = value;
var colixBack = J.util.C.getColixO (twoColors[0]);
var colix = J.util.C.getColixO (twoColors[1]);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) {
bioShape.setColixBS (colix, 0, bsSelected);
bioShape.setColixBack (colixBack, bsSelected);
}}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ("translucent".equals (value));
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setTranslucent (isTranslucent, bsSelected, this.translucentLevel);
}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_V(c$, "getShapeState", 
function () {
return this.viewer.getAtomShapeSetState (this, this.bioShapes);
});
$_M(c$, "initialize", 
function () {
var modelCount = this.modelSet.modelCount;
var models = this.modelSet.models;
var n = this.modelSet.getBioPolymerCount ();
var shapes =  new Array (n--);
for (var i = modelCount; --i >= 0; ) for (var j = this.modelSet.getBioPolymerCountInModel (i); --j >= 0; n--) {
var bp = (models[i]).getBioPolymer (j);
shapes[n] = (this.bioShapes == null || this.bioShapes.length <= n || this.bioShapes[n] == null || this.bioShapes[n].bioPolymer !== bp ?  new J.shapebio.BioShape (this, i, bp) : this.bioShapes[n]);
}

this.bioShapes = shapes;
});
$_V(c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].findNearestAtomIndex (xMouse, yMouse, closest, bsNot);

}, "~N,~N,~A,JU.BS");
$_V(c$, "setVisibilityFlags", 
function (bs) {
if (this.bioShapes == null) return;
bs = J.util.BSUtil.copy (bs);
for (var i = this.modelSet.modelCount; --i >= 0; ) if (bs.get (i) && this.modelSet.isTrajectory (i)) bs.set (this.modelSet.getTrajectoryIndex (i));

for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
b.modelVisibilityFlags = (bs.get (b.modelIndex) ? this.myVisibilityFlag : 0);
}
}, "JU.BS");
$_V(c$, "setModelClickability", 
function () {
if (this.bioShapes == null) return;
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setModelClickability ();

});
$_M(c$, "getMpsShapeCount", 
function () {
return this.bioShapes.length;
});
$_M(c$, "getBioShape", 
function (i) {
return this.bioShapes[i];
}, "~N");
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Rockets", null, function () {
c$ = Clazz_declareType (J.shapebio, "Rockets", J.shapebio.BioShapeCollection);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.Rockets, "initShape", []);
this.madTurnRandom = 500;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.Rockets"], "J.shapebio.Cartoon", null, function () {
c$ = Clazz_declareType (J.shapebio, "Cartoon", J.shapebio.Rockets);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.Cartoon, "initShape", []);
this.madDnaRna = 1000;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Backbone", ["java.lang.Float", "JU.BS"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bsSelected = null;
Clazz_instantialize (this, arguments);
}, J.shapebio, "Backbone", J.shapebio.BioShapeCollection);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.Backbone, "initShape", []);
this.madOn = 1;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 2000;
this.isActive = true;
});
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("bitset" === propertyName) {
this.bsSelected = value;
return;
}this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_V(c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
var useThisBsSelected = (this.bsSelected != null);
if (useThisBsSelected) bsSelected = this.bsSelected;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
if (bioShape.monomerCount == 0) continue;
var bondSelectionModeOr = this.viewer.getBoolean (603979812);
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
var isVisible = (mad != 0);
if (bioShape.bsSizeSet == null) bioShape.bsSizeSet =  new JU.BS ();
bioShape.isActive = true;
for (var i = bioShape.monomerCount - 1; --i >= 0; ) {
var index1 = atomIndices[i];
var index2 = atomIndices[i + 1];
var isAtom1 = bsSelected.get (index1);
var isAtom2 = bsSelected.get (index2);
if (isAtom1 && isAtom2 || useThisBsSelected && isAtom1 || bondSelectionModeOr && (isAtom1 || isAtom2)) {
bioShape.monomers[i].setShapeVisibility (this.myVisibilityFlag, isVisible);
var atomA = this.modelSet.atoms[index1];
if (rd != null) {
if (Float.isNaN (rd.values[index1]) || Float.isNaN (rd.values[index2])) continue;
mad = Clazz_floatToShort ((rd.values[index1] + rd.values[index2]) * 1000);
isVisible = (mad != 0);
}var atomB = this.modelSet.atoms[index2];
var wasVisible = (bioShape.mads[i] != 0);
if (wasVisible != isVisible) {
atomA.addDisplayedBackbone (this.myVisibilityFlag, isVisible);
atomB.addDisplayedBackbone (this.myVisibilityFlag, isVisible);
}bioShape.mads[i] = mad;
bioShape.bsSizeSet.setBitTo (i, isVisible);
bioShape.bsSizeDefault.setBitTo (i, mad == -1);
}}
}
if (useThisBsSelected) this.bsSelected = null;
}, "~N,J.atomdata.RadiusData,JU.BS");
$_V(c$, "setModelClickability", 
function () {
if (this.bioShapes == null) return;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
for (var i = bioShape.monomerCount; --i >= 0; ) {
var atom = this.modelSet.atoms[atomIndices[i]];
if (atom.getNBackbonesDisplayed () > 0 && !this.modelSet.isAtomHidden (i)) atom.setClickable (this.myVisibilityFlag);
}
}
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Strands", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.isMesh = false;
Clazz_instantialize (this, arguments);
}, J.shapebio, "Strands", J.shapebio.BioShapeCollection);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Ribbons", null, function () {
c$ = Clazz_declareType (J.shapebio, "Ribbons", J.shapebio.BioShapeCollection);
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.Strands"], "J.shapebio.MeshRibbon", null, function () {
c$ = Clazz_declareType (J.shapebio, "MeshRibbon", J.shapebio.Strands);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.MeshRibbon, "initShape", []);
this.isMesh = true;
});
});
Clazz_declarePackage ("J.shapebio");
Clazz_load (["J.shapebio.BioShapeCollection"], "J.shapebio.Trace", ["J.atomdata.RadiusData", "J.constant.EnumVdw", "J.modelset.Atom"], function () {
c$ = Clazz_declareType (J.shapebio, "Trace", J.shapebio.BioShapeCollection);
$_M(c$, "initShape", 
function () {
Clazz_superCall (this, J.shapebio.Trace, "initShape", []);
this.madOn = 600;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 1500;
});
$_V(c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "putty") {
this.setPutty (value, bsSelected);
return;
}this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
$_M(c$, "setPutty", 
function (info, bsAtoms) {
var n = bsAtoms.cardinality ();
if (n == 0) return;
var data =  Clazz_newFloatArray (bsAtoms.length (), 0);
var sum = 0.0;
var sumsq = 0.0;
var min = 3.4028235E38;
var max = 0;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var value = J.modelset.Atom.atomPropertyFloat (null, this.atoms[i], 1112541199);
sum += value;
sumsq += (value * value);
if (value < min) min = value;
if (value > max) max = value;
}
var mean = (sum / n);
var stdev = Math.sqrt ((sumsq - (sum * sum / n)) / n);
var rad = info[1];
var range = info[2];
var scale_min = info[3];
var scale_max = info[4];
var power = info[5];
var transform = Clazz_floatToInt (info[6]);
var data_range = max - min;
var nonlinear = false;
switch (transform) {
case 0:
case 1:
case 2:
case 3:
nonlinear = true;
break;
}
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var scale = J.modelset.Atom.atomPropertyFloat (null, this.atoms[i], 1112541199);
switch (transform) {
case 3:
case 7:
default:
break;
case 0:
case 4:
scale = 1 + (scale - mean) / range / stdev;
break;
case 1:
case 5:
scale = (scale - min) / data_range / range;
break;
case 2:
case 6:
scale /= range;
break;
case 8:
if (scale < 0.0) scale = 0.0;
scale = (Math.sqrt (scale / 8.0) / 3.141592653589793);
break;
}
if (scale < 0.0) scale = 0.0;
if (nonlinear) scale = Math.pow (scale, power);
if ((scale < scale_min) && (scale_min >= 0.0)) scale = scale_min;
if ((scale > scale_max) && (scale_max >= 0.0)) scale = scale_max;
data[i] = scale * rad;
}
var rd =  new J.atomdata.RadiusData (data, 0, J.atomdata.RadiusData.EnumType.ABSOLUTE, J.constant.EnumVdw.AUTO);
this.setShapeSizeRD (0, rd, bsAtoms);
}, "~A,JU.BS");
Clazz_defineStatics (c$,
"PUTTY_NormalizedNonlinear", 0,
"PUTTY_RelativeNonlinear", 1,
"PUTTY_ScaledNonlinear", 2,
"PUTTY_AbsoluteNonlinear", 3,
"PUTTY_NormalizedLinear", 4,
"PUTTY_RelativeLinear", 5,
"PUTTY_ScaledLinear", 6,
"PUTTY_AbsoluteLinear", 7,
"PUTTY_ImpliedRMS", 8);
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.render.MeshRenderer", "JU.A4", "$.BS", "$.M3", "$.P3", "$.P3i", "$.V3"], "J.renderbio.BioShapeRenderer", ["J.constant.EnumStructure", "J.modelsetbio.CarbohydratePolymer", "$.NucleicPolymer", "J.shape.Mesh", "J.util.C", "$.Hermite", "$.Logger", "$.Normix"], function () {
c$ = Clazz_decorateAsClass (function () {
this.invalidateMesh = false;
this.invalidateSheets = false;
this.isHighRes = false;
this.isTraceAlpha = false;
this.ribbonBorder = false;
this.haveControlPointScreens = false;
this.aspectRatio = 0;
this.hermiteLevel = 0;
this.sheetSmoothing = 0;
this.cartoonsFancy = false;
this.meshes = null;
this.meshReady = null;
this.bsRenderMesh = null;
this.monomerCount = 0;
this.monomers = null;
this.isNucleic = false;
this.isCarbohydrate = false;
this.bsVisible = null;
this.ribbonTopScreens = null;
this.ribbonBottomScreens = null;
this.controlPoints = null;
this.controlPointScreens = null;
this.leadAtomIndices = null;
this.wingVectors = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.structureTypes = null;
this.isPass2 = false;
this.wireframeOnly = false;
this.pointT = null;
this.iPrev = 0;
this.iNext = 0;
this.iNext2 = 0;
this.iNext3 = 0;
this.diameterBeg = 0;
this.diameterMid = 0;
this.diameterEnd = 0;
this.doCap0 = false;
this.doCap1 = false;
this.colixBack = 0;
this.reversed = null;
this.screenArrowTop = null;
this.screenArrowTopPrev = null;
this.screenArrowBot = null;
this.screenArrowBotPrev = null;
this.controlHermites = null;
this.wingHermites = null;
this.radiusHermites = null;
this.norm = null;
this.wing = null;
this.wing1 = null;
this.wingT = null;
this.aa = null;
this.pt = null;
this.pt1 = null;
this.ptPrev = null;
this.ptNext = null;
this.mat = null;
this.bsTemp = null;
this.norml = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "BioShapeRenderer", J.render.MeshRenderer);
Clazz_prepareFields (c$, function () {
this.bsVisible =  new JU.BS ();
this.pointT =  new JU.P3 ();
this.screenArrowTop =  new JU.P3i ();
this.screenArrowTopPrev =  new JU.P3i ();
this.screenArrowBot =  new JU.P3i ();
this.screenArrowBotPrev =  new JU.P3i ();
this.norm =  new JU.V3 ();
this.wing =  new JU.V3 ();
this.wing1 =  new JU.V3 ();
this.wingT =  new JU.V3 ();
this.aa =  new JU.A4 ();
this.pt =  new JU.P3 ();
this.pt1 =  new JU.P3 ();
this.ptPrev =  new JU.P3 ();
this.ptNext =  new JU.P3 ();
this.mat =  new JU.M3 ();
this.norml =  new JU.V3 ();
});
$_V(c$, "render", 
function () {
if (this.shape == null) return false;
this.setGlobals ();
this.renderShapes ();
return this.needTranslucent;
});
$_M(c$, "setGlobals", 
function () {
this.isPass2 = this.g3d.isPass2 ();
this.invalidateMesh = false;
this.needTranslucent = false;
this.g3d.addRenderer (553648147);
var TF = (!this.isExport && !this.viewer.checkMotionRendering (1113200642));
if (TF != this.wireframeOnly) this.invalidateMesh = true;
this.wireframeOnly = TF;
TF = (this.isExport || !this.wireframeOnly && this.viewer.getBoolean (603979864));
if (TF != this.isHighRes) this.invalidateMesh = true;
this.isHighRes = TF;
TF = !this.wireframeOnly && this.viewer.getBoolean (603979819);
if (this.cartoonsFancy != TF) {
this.invalidateMesh = true;
this.cartoonsFancy = TF;
}var val1 = this.viewer.getHermiteLevel ();
val1 = (val1 <= 0 ? -val1 : this.viewer.getInMotion (true) ? 0 : val1);
if (this.cartoonsFancy && !this.wireframeOnly) val1 = Math.max (val1, 3);
if (val1 != this.hermiteLevel) this.invalidateMesh = true;
this.hermiteLevel = Math.min (val1, 8);
var val = this.viewer.getInt (553648166);
val = Math.min (Math.max (0, val), 20);
if (this.cartoonsFancy && val >= 16) val = 4;
if (this.wireframeOnly || this.hermiteLevel == 0) val = 0;
if (val != this.aspectRatio && val != 0 && val1 != 0) this.invalidateMesh = true;
this.aspectRatio = val;
TF = this.viewer.getBoolean (603979966);
if (TF != this.isTraceAlpha) this.invalidateMesh = true;
this.isTraceAlpha = TF;
this.invalidateSheets = false;
var fval = this.viewer.getFloat (570425392);
if (fval != this.sheetSmoothing && this.isTraceAlpha) {
this.sheetSmoothing = fval;
this.invalidateMesh = true;
this.invalidateSheets = true;
}});
$_M(c$, "renderShapes", 
function () {
var mps = this.shape;
for (var c = mps.bioShapes.length; --c >= 0; ) {
var bioShape = mps.getBioShape (c);
if ((bioShape.modelVisibilityFlags & this.myVisibilityFlag) == 0) continue;
if (bioShape.monomerCount >= 2 && this.initializePolymer (bioShape)) {
this.bsRenderMesh.clearAll ();
this.renderBioShape (bioShape);
this.renderMeshes ();
this.freeTempArrays ();
}}
});
$_M(c$, "setBioColix", 
function (colix) {
if (this.g3d.setColix (colix)) return true;
this.needTranslucent = true;
return false;
}, "~N");
$_M(c$, "freeTempArrays", 
function () {
if (this.haveControlPointScreens) this.viewer.freeTempScreens (this.controlPointScreens);
this.viewer.freeTempEnum (this.structureTypes);
});
$_M(c$, "initializePolymer", 
function (bioShape) {
var bsDeleted = this.viewer.getDeletedAtoms ();
if (this.viewer.isJmolDataFrameForModel (bioShape.modelIndex)) {
this.controlPoints = bioShape.bioPolymer.getControlPoints (true, 0, false);
} else {
this.controlPoints = bioShape.bioPolymer.getControlPoints (this.isTraceAlpha, this.sheetSmoothing, this.invalidateSheets);
}this.monomerCount = bioShape.monomerCount;
this.bsRenderMesh = JU.BS.newN (this.monomerCount);
this.monomers = bioShape.monomers;
this.reversed = bioShape.bioPolymer.reversed;
this.leadAtomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
this.bsVisible.clearAll ();
var haveVisible = false;
if (this.invalidateMesh) bioShape.falsifyMesh ();
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (this.leadAtomIndices[i]) || bsDeleted != null && bsDeleted.get (this.leadAtomIndices[i])) continue;
var lead = this.modelSet.atoms[this.leadAtomIndices[i]];
if (!this.g3d.isInDisplayRange (lead.sX, lead.sY)) continue;
this.bsVisible.set (i);
haveVisible = true;
}
if (!haveVisible) return false;
this.ribbonBorder = this.viewer.getBoolean (603979898);
this.isNucleic = Clazz_instanceOf (bioShape.bioPolymer, J.modelsetbio.NucleicPolymer);
this.isCarbohydrate = Clazz_instanceOf (bioShape.bioPolymer, J.modelsetbio.CarbohydratePolymer);
this.haveControlPointScreens = false;
this.wingVectors = bioShape.wingVectors;
this.meshReady = bioShape.meshReady;
this.meshes = bioShape.meshes;
this.mads = bioShape.mads;
this.colixes = bioShape.colixes;
this.colixesBack = bioShape.colixesBack;
this.setStructureTypes ();
return true;
}, "J.shapebio.BioShape");
$_M(c$, "setStructureTypes", 
function () {
this.structureTypes = this.viewer.allocTempEnum (this.monomerCount + 1);
for (var i = this.monomerCount; --i >= 0; ) {
this.structureTypes[i] = this.monomers[i].getProteinStructureType ();
if (this.structureTypes[i] === J.constant.EnumStructure.TURN) this.structureTypes[i] = J.constant.EnumStructure.NONE;
}
this.structureTypes[this.monomerCount] = this.structureTypes[this.monomerCount - 1];
});
$_M(c$, "isHelix", 
function (i) {
return this.structureTypes[i] === J.constant.EnumStructure.HELIX;
}, "~N");
$_M(c$, "getScreenControlPoints", 
function () {
this.calcScreenControlPoints (this.controlPoints);
});
$_M(c$, "calcScreenControlPoints", 
function (points) {
var count = this.monomerCount + 1;
this.controlPointScreens = this.viewer.allocTempScreens (count);
for (var i = count; --i >= 0; ) {
this.viewer.transformPtScr (points[i], this.controlPointScreens[i]);
}
this.haveControlPointScreens = true;
}, "~A");
$_M(c$, "calcScreens", 
function (offsetFraction) {
var count = this.controlPoints.length;
var screens = this.viewer.allocTempScreens (count);
if (offsetFraction == 0) {
for (var i = count; --i >= 0; ) this.viewer.transformPtScr (this.controlPoints[i], screens[i]);

} else {
var offset_1000 = offsetFraction / 1000;
for (var i = count; --i >= 0; ) this.calc1Screen (this.controlPoints[i], this.wingVectors[i], (this.mads[i] == 0 && i > 0 ? this.mads[i - 1] : this.mads[i]), offset_1000, screens[i]);

}return screens;
}, "~N");
$_M(c$, "calc1Screen", 
function (center, vector, mad, offset_1000, screen) {
this.pointT.scaleAdd2 (mad * offset_1000, vector, center);
this.viewer.transformPtScr (this.pointT, screen);
}, "JU.P3,JU.V3,~N,~N,JU.P3i");
$_M(c$, "getLeadColix", 
function (i) {
return J.util.C.getColixInherited (this.colixes[i], this.monomers[i].getLeadAtom ().getColix ());
}, "~N");
$_M(c$, "getLeadColixBack", 
function (i) {
return (this.colixesBack == null || this.colixesBack.length <= i ? 0 : this.colixesBack[i]);
}, "~N");
$_M(c$, "setNeighbors", 
function (i) {
this.iPrev = Math.max (i - 1, 0);
this.iNext = Math.min (i + 1, this.monomerCount);
this.iNext2 = Math.min (i + 2, this.monomerCount);
this.iNext3 = Math.min (i + 3, this.monomerCount);
}, "~N");
$_M(c$, "setMads", 
function (i, thisTypeOnly) {
this.madMid = this.madBeg = this.madEnd = this.mads[i];
if (this.isTraceAlpha) {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) {
this.madEnd = this.mads[this.iNext];
if (this.madEnd == 0) {
if (Clazz_instanceOf (this, J.renderbio.TraceRenderer)) {
this.madEnd = this.madBeg;
} else {
this.madEnd = this.madBeg;
}}this.madMid = ((this.madBeg + this.madEnd) >> 1);
}} else {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iPrev]) this.madBeg = (((this.mads[this.iPrev] == 0 ? this.madMid : this.mads[this.iPrev]) + this.madMid) >> 1);
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) this.madEnd = (((this.mads[this.iNext] == 0 ? this.madMid : this.mads[this.iNext]) + this.madMid) >> 1);
}this.diameterBeg = Clazz_floatToInt (this.viewer.scaleToScreen (this.controlPointScreens[i].z, this.madBeg));
this.diameterMid = Clazz_floatToInt (this.viewer.scaleToScreen (this.monomers[i].getLeadAtom ().sZ, this.madMid));
this.diameterEnd = Clazz_floatToInt (this.viewer.scaleToScreen (this.controlPointScreens[this.iNext].z, this.madEnd));
this.doCap0 = (i == this.iPrev || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iPrev]);
this.doCap1 = (this.iNext == this.iNext2 || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iNext]);
return ((this.aspectRatio > 0 && (this.exportType == 1 || this.checkDiameter (this.diameterBeg) || this.checkDiameter (this.diameterMid) || this.checkDiameter (this.diameterEnd))));
}, "~N,~B");
$_M(c$, "checkDiameter", 
function (d) {
return ( new Boolean ( new Boolean (this.isHighRes & d > 3).valueOf () || d >= 8).valueOf ());
}, "~N");
$_M(c$, "renderHermiteCylinder", 
function (screens, i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.setNeighbors (i);
this.g3d.drawHermite4 (this.isNucleic ? 4 : 7, screens[this.iPrev], screens[i], screens[this.iNext], screens[this.iNext2]);
}, "~A,~N");
$_M(c$, "renderHermiteConic", 
function (i, thisTypeOnly) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
if (this.setMads (i, thisTypeOnly) || this.isExport) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.madBeg, this.madMid, this.madEnd, 1)) return;
this.meshes[i].setColix (this.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
J.util.Logger.error ("render mesh error hermiteConic: " + e.toString ());
} else {
throw e;
}
}
}if (this.diameterBeg == 0 && this.diameterEnd == 0 || this.wireframeOnly) this.g3d.drawLineAB (this.controlPointScreens[i], this.controlPointScreens[this.iNext]);
 else {
this.g3d.fillHermite (this.isNucleic ? 4 : 7, this.diameterBeg, this.diameterMid, this.diameterEnd, this.controlPointScreens[this.iPrev], this.controlPointScreens[i], this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2]);
}}, "~N,~B");
$_M(c$, "renderHermiteRibbon", 
function (doFill, i, thisTypeOnly) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
if (doFill && (this.aspectRatio != 0 || this.isExport)) {
if (this.setMads (i, thisTypeOnly) || this.isExport) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.madBeg, this.madMid, this.madEnd, this.aspectRatio)) return;
this.meshes[i].setColix (this.colix);
this.meshes[i].setColixBack (this.colixBack);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
J.util.Logger.error ("render mesh error hermiteRibbon: " + e.toString ());
} else {
throw e;
}
}
}}this.g3d.drawHermite7 (doFill, this.ribbonBorder, (this.reversed.get (i) ? -1 : 1) * (this.isNucleic ? 4 : 7), this.ribbonTopScreens[this.iPrev], this.ribbonTopScreens[i], this.ribbonTopScreens[this.iNext], this.ribbonTopScreens[this.iNext2], this.ribbonBottomScreens[this.iPrev], this.ribbonBottomScreens[i], this.ribbonBottomScreens[this.iNext], this.ribbonBottomScreens[this.iNext2], Clazz_floatToInt (this.aspectRatio), this.colixBack);
}, "~B,~N,~B");
$_M(c$, "renderHermiteArrowHead", 
function (i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
this.setNeighbors (i);
if (this.setMads (i, false) || this.isExport) {
try {
this.doCap0 = true;
this.doCap1 = false;
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, Clazz_doubleToInt (Math.floor (this.madBeg * 1.2)), Clazz_doubleToInt (Math.floor (this.madBeg * 0.6)), 0, (this.aspectRatio == 1 ? this.aspectRatio : this.aspectRatio / 2))) return;
this.meshes[i].setColix (this.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
J.util.Logger.error ("render mesh error hermiteArrowHead: " + e.toString ());
} else {
throw e;
}
}
}this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, .0007, this.screenArrowTop);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, -7.0E-4, this.screenArrowBot);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, 0.001, this.screenArrowTopPrev);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, -0.001, this.screenArrowBotPrev);
this.g3d.drawHermite7 (true, this.ribbonBorder, this.isNucleic ? 4 : 7, this.screenArrowTopPrev, this.screenArrowTop, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], this.screenArrowBotPrev, this.screenArrowBot, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], Clazz_floatToInt (this.aspectRatio), this.colixBack);
if (this.ribbonBorder && this.aspectRatio == 0) {
this.g3d.fillCylinderXYZ (this.colix, this.colix, 3, (this.exportType == 1 ? 50 : 3), this.screenArrowTop.x, this.screenArrowTop.y, this.screenArrowTop.z, this.screenArrowBot.x, this.screenArrowBot.y, this.screenArrowBot.z);
}}, "~N");
$_M(c$, "createMesh", 
function (i, madBeg, madMid, madEnd, aspectRatio) {
this.setNeighbors (i);
if (this.controlPoints[i].distance (this.controlPoints[this.iNext]) == 0) return false;
var isEccentric = (aspectRatio != 1 && this.wingVectors != null);
var isFlatMesh = (aspectRatio == 0);
var isElliptical = (this.cartoonsFancy || this.hermiteLevel >= 6);
var nHermites = (this.hermiteLevel + 1) * 2 + 1;
var nPer = (isFlatMesh ? 4 : (this.hermiteLevel + 1) * 4 - 2);
var angle = ((isFlatMesh ? 3.141592653589793 / (nPer - 1) : 6.283185307179586 / nPer));
var mesh = this.meshes[i] =  new J.shape.Mesh ().mesh1 ("mesh_" + this.shapeID + "_" + i, 0, i);
var variableRadius = (madBeg != madMid || madMid != madEnd);
if (this.controlHermites == null || this.controlHermites.length < nHermites + 1) {
this.controlHermites =  new Array (nHermites + 1);
}J.util.Hermite.getHermiteList (this.isNucleic ? 4 : 7, this.controlPoints[this.iPrev], this.controlPoints[i], this.controlPoints[this.iNext], this.controlPoints[this.iNext2], this.controlPoints[this.iNext3], this.controlHermites, 0, nHermites, true);
if (this.wingHermites == null || this.wingHermites.length < nHermites + 1) {
this.wingHermites =  new Array (nHermites + 1);
}this.wing.setT (this.wingVectors[this.iPrev]);
if (madEnd == 0) this.wing.scale (2.0);
J.util.Hermite.getHermiteList (this.isNucleic ? 4 : 7, this.wing, this.wingVectors[i], this.wingVectors[this.iNext], this.wingVectors[this.iNext2], this.wingVectors[this.iNext3], this.wingHermites, 0, nHermites, false);
var radius1 = madBeg / 2000;
var radius2 = madMid / 2000;
var radius3 = madEnd / 2000;
if (variableRadius) {
if (this.radiusHermites == null || this.radiusHermites.length < ((nHermites + 1) >> 1) + 1) {
this.radiusHermites =  new Array (((nHermites + 1) >> 1) + 1);
}this.ptPrev.set (radius1, radius1, 0);
this.pt.set (radius1, radius2, 0);
this.pt1.set (radius2, radius3, 0);
this.ptNext.set (radius3, radius3, 0);
J.util.Hermite.getHermiteList (4, this.ptPrev, this.pt, this.pt1, this.ptNext, this.ptNext, this.radiusHermites, 0, (nHermites + 1) >> 1, true);
}var nPoints = 0;
var iMid = nHermites >> 1;
var kpt1 = Clazz_doubleToInt ((nPer + 2) / 4);
var kpt2 = Clazz_doubleToInt ((3 * nPer + 2) / 4);
var mode = (!isEccentric ? 0 : isFlatMesh ? 1 : isElliptical ? 2 : 3);
var useMat = (mode == 0 || mode == 3);
for (var p = 0; p < nHermites; p++) {
this.norm.sub2 (this.controlHermites[p + 1], this.controlHermites[p]);
var scale = (!variableRadius ? radius1 : p < iMid ? this.radiusHermites[p].x : this.radiusHermites[p - iMid].y);
this.wing.setT (this.wingHermites[p]);
this.wing1.setT (this.wing);
switch (mode) {
case 1:
break;
case 2:
this.wing1.cross (this.norm, this.wing);
this.wing1.normalize ();
this.wing1.scale (this.wing.length () / aspectRatio);
break;
case 3:
this.wing.scale (2 / aspectRatio);
this.wing1.sub (this.wing);
break;
case 0:
this.wing.cross (this.wing, this.norm);
this.wing.normalize ();
break;
}
this.wing.scale (scale);
this.wing1.scale (scale);
if (useMat) {
this.aa.setVA (this.norm, angle);
this.mat.setAA (this.aa);
}this.pt1.setT (this.controlHermites[p]);
var theta = (isFlatMesh ? 0 : angle);
for (var k = 0; k < nPer; k++, theta += angle) {
if (useMat && k > 0) this.mat.transform (this.wing);
switch (mode) {
case 1:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.cos (theta));
break;
case 2:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.sin (theta));
this.wingT.scaleAdd2 (Math.cos (theta), this.wing, this.wingT);
break;
case 3:
this.wingT.setT (this.wing);
if (k == kpt1 || k == kpt2) this.wing1.scale (-1);
this.wingT.add (this.wing1);
break;
case 0:
this.wingT.setT (this.wing);
break;
}
this.pt.add2 (this.pt1, this.wingT);
mesh.addV (this.pt);
}
if (p > 0) {
var nLast = (isFlatMesh ? nPer - 1 : nPer);
for (var k = 0; k < nLast; k++) {
var a = nPoints - nPer + k;
var b = nPoints - nPer + ((k + 1) % nPer);
var c = nPoints + ((k + 1) % nPer);
var d = nPoints + k;
if (k < Clazz_doubleToInt (nLast / 2)) mesh.addQuad (a, b, c, d);
 else mesh.addQuad (b, c, d, a);
}
}nPoints += nPer;
}
if (!isFlatMesh) {
var nPointsPreCap = nPoints;
if (this.doCap0) {
for (var l = 0; l < nPer; l++) mesh.addV (mesh.vertices[l]);

nPoints += nPer;
for (var k = this.hermiteLevel * 2; --k >= 0; ) mesh.addQuad (nPoints - nPer + k + 2, nPoints - nPer + k + 1, nPoints - nPer + (nPer - k) % nPer, nPoints - k - 1);

}if (this.doCap1) {
for (var l = 0; l < nPer; l++) mesh.addV (mesh.vertices[nPointsPreCap - nPer + l]);

nPoints += nPer;
for (var k = this.hermiteLevel * 2; --k >= 0; ) mesh.addQuad (nPoints - k - 1, nPoints - nPer + (nPer - k) % nPer, nPoints - nPer + k + 1, nPoints - nPer + k + 2);

}}this.meshReady[i] = true;
this.adjustCartoonSeamNormals (i, nPer);
mesh.setVisibilityFlags (1);
return true;
}, "~N,~N,~N,~N,~N");
$_M(c$, "adjustCartoonSeamNormals", 
function (i, nPer) {
if (this.bsTemp == null) this.bsTemp = J.util.Normix.newVertexBitSet ();
if (i == this.iNext - 1 && this.iNext < this.monomerCount && this.monomers[i].getStrucNo () == this.monomers[this.iNext].getStrucNo () && this.meshReady[i] && this.meshReady[this.iNext]) {
try {
var normals2 = this.meshes[this.iNext].getNormalsTemp ();
var normals = this.meshes[i].getNormalsTemp ();
var normixCount = normals.length;
if (this.doCap0) normixCount -= nPer;
for (var j = 1; j <= nPer; ++j) {
this.norml.add2 (normals[normixCount - j], normals2[nPer - j]);
this.norml.normalize ();
this.meshes[i].normalsTemp[normixCount - j].setT (this.norml);
this.meshes[this.iNext].normalsTemp[nPer - j].setT (this.norml);
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}, "~N,~N");
$_M(c$, "renderMeshes", 
function () {
for (var i = this.bsRenderMesh.nextSetBit (0); i >= 0; i = this.bsRenderMesh.nextSetBit (i + 1)) {
if (this.meshes[i].normalsTemp != null) {
this.meshes[i].setNormixes (this.meshes[i].normalsTemp);
this.meshes[i].normalsTemp = null;
} else if (this.meshes[i].normixes == null) {
this.meshes[i].initialize (1073741958, null, null);
}this.renderMesh (this.meshes[i]);
}
});
Clazz_defineStatics (c$,
"ABSOLUTE_MIN_MESH_SIZE", 3,
"MIN_MESH_RENDER_SIZE", 8,
"MODE_TUBE", 0,
"MODE_FLAT", 1,
"MODE_ELLIPTICAL", 2,
"MODE_NONELLIPTICAL", 3);
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.BioShapeRenderer"], "J.renderbio.StrandsRenderer", ["J.shapebio.Strands"], function () {
c$ = Clazz_decorateAsClass (function () {
this.strandCount = 1;
this.strandSeparation = 0;
this.baseStrandOffset = 0;
Clazz_instantialize (this, arguments);
}, J.renderbio, "StrandsRenderer", J.renderbio.BioShapeRenderer);
$_V(c$, "renderBioShape", 
function (bioShape) {
this.renderStrandShape ();
}, "J.shapebio.BioShape");
$_M(c$, "renderStrandShape", 
function () {
if (!this.setStrandCount ()) return;
this.renderStrands ();
});
$_M(c$, "setStrandCount", 
function () {
if (this.wingVectors == null) return false;
this.strandCount = (Clazz_instanceOf (this.shape, J.shapebio.Strands) ? this.viewer.getStrandCount ((this.shape).shapeID) : 10);
this.strandSeparation = (this.strandCount <= 1) ? 0 : 1 / (this.strandCount - 1);
this.baseStrandOffset = ((this.strandCount & 1) == 0 ? this.strandSeparation / 2 : this.strandSeparation);
return true;
});
$_M(c$, "renderStrands", 
function () {
var screens;
for (var i = this.strandCount >> 1; --i >= 0; ) {
var f = (i * this.strandSeparation) + this.baseStrandOffset;
screens = this.calcScreens (f);
this.renderStrand (screens);
this.viewer.freeTempScreens (screens);
screens = this.calcScreens (-f);
this.renderStrand (screens);
this.viewer.freeTempScreens (screens);
}
if (this.strandCount % 2 == 1) {
screens = this.calcScreens (0);
this.renderStrand (screens);
this.viewer.freeTempScreens (screens);
}});
$_M(c$, "renderStrand", 
function (screens) {
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteCylinder (screens, i);

}, "~A");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.MeshRibbonRenderer"], "J.renderbio.RibbonsRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "RibbonsRenderer", J.renderbio.MeshRibbonRenderer);
$_V(c$, "renderBioShape", 
function (bioShape) {
if (this.wingVectors == null) return;
if (this.wireframeOnly) this.renderStrands ();
 else this.render2Strand (true, this.isNucleic ? 1 : 0.5, this.isNucleic ? 0 : 0.5);
}, "J.shapebio.BioShape");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer"], "J.renderbio.MeshRibbonRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "MeshRibbonRenderer", J.renderbio.StrandsRenderer);
$_V(c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderMeshRibbon ();
}, "J.shapebio.BioShape");
$_M(c$, "renderMeshRibbon", 
function () {
if (!this.setStrandCount ()) return;
var offset = ((this.strandCount >> 1) * this.strandSeparation) + this.baseStrandOffset;
this.render2Strand (false, offset, offset);
this.renderStrands ();
});
$_M(c$, "render2Strand", 
function (doFill, offsetTop, offsetBottom) {
this.getScreenControlPoints ();
this.ribbonTopScreens = this.calcScreens (offsetTop);
this.ribbonBottomScreens = this.calcScreens (-offsetBottom);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteRibbon (doFill, i, false);

this.viewer.freeTempScreens (this.ribbonTopScreens);
this.viewer.freeTempScreens (this.ribbonBottomScreens);
}, "~B,~N,~N");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer", "JU.P3", "$.V3"], "J.renderbio.RocketsRenderer", ["J.constant.EnumStructure", "J.modelsetbio.AlphaPolymer", "$.Helix", "$.Sheet"], function () {
c$ = Clazz_decorateAsClass (function () {
this.newRockets = false;
this.renderArrowHeads = false;
this.cordMidPoints = null;
this.tPending = false;
this.proteinstructurePending = null;
this.startIndexPending = 0;
this.endIndexPending = 0;
this.screenA = null;
this.screenB = null;
this.screenC = null;
this.vtemp = null;
this.corners = null;
this.screenCorners = null;
this.pointTipOffset = null;
this.scaledWidthVector = null;
this.scaledHeightVector = null;
this.lengthVector = null;
this.pointCorner = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "RocketsRenderer", J.renderbio.StrandsRenderer);
Clazz_prepareFields (c$, function () {
this.screenA =  new JU.P3 ();
this.screenB =  new JU.P3 ();
this.screenC =  new JU.P3 ();
this.vtemp =  new JU.V3 ();
this.corners =  new Array (8);
this.screenCorners =  new Array (8);
{
for (var i = 8; --i >= 0; ) {
this.screenCorners[i] =  new JU.P3 ();
this.corners[i] =  new JU.P3 ();
}
}this.pointTipOffset =  new JU.P3 ();
this.scaledWidthVector =  new JU.V3 ();
this.scaledHeightVector =  new JU.V3 ();
this.lengthVector =  new JU.V3 ();
this.pointCorner =  new JU.P3 ();
});
$_V(c$, "renderBioShape", 
function (bioShape) {
if (!(Clazz_instanceOf (bioShape.bioPolymer, J.modelsetbio.AlphaPolymer))) return;
if (this.wireframeOnly) {
this.renderStrands ();
return;
}var val = !this.viewer.getBoolean (603979900);
if (this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}this.calcRopeMidPoints (this.newRockets);
this.calcScreenControlPoints (this.cordMidPoints);
this.controlPoints = this.cordMidPoints;
this.renderRockets ();
this.viewer.freeTempPoints (this.cordMidPoints);
}, "J.shapebio.BioShape");
$_M(c$, "isSheet", 
function (i) {
return this.structureTypes[i] === J.constant.EnumStructure.SHEET;
}, "~N");
$_M(c$, "calcRopeMidPoints", 
function (isNewStyle) {
var midPointCount = this.monomerCount + 1;
this.cordMidPoints = this.viewer.allocTempPoints (midPointCount);
var proteinstructurePrev = null;
var point;
for (var i = 0; i < this.monomerCount; ++i) {
point = this.cordMidPoints[i];
var residue = this.monomers[i];
if (isNewStyle && this.renderArrowHeads) {
point.setT (this.controlPoints[i]);
} else if (this.isHelix (i) || !isNewStyle && this.isSheet (i)) {
var proteinstructure = residue.getProteinStructure ();
point.setT (i - 1 != proteinstructure.getMonomerIndex () ? proteinstructure.getAxisStartPoint () : proteinstructure.getAxisEndPoint ());
proteinstructurePrev = proteinstructure;
} else {
if (proteinstructurePrev != null) point.setT (proteinstructurePrev.getAxisEndPoint ());
 else {
point.setT (this.controlPoints[i]);
}proteinstructurePrev = null;
}}
point = this.cordMidPoints[this.monomerCount];
if (proteinstructurePrev != null) point.setT (proteinstructurePrev.getAxisEndPoint ());
 else {
point.setT (this.controlPoints[this.monomerCount]);
}}, "~B");
$_M(c$, "renderRockets", 
function () {
this.tPending = false;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var monomer = this.monomers[i];
if (this.isHelix (i) || this.isSheet (i)) {
this.renderSpecialSegment (monomer, this.getLeadColix (i), this.mads[i]);
} else {
this.renderPending ();
this.renderHermiteConic (i, true);
}}
this.renderPending ();
});
$_M(c$, "renderSpecialSegment", 
function (monomer, thisColix, thisMad) {
var proteinstructure = monomer.getProteinStructure ();
if (this.tPending) {
if (proteinstructure === this.proteinstructurePending && thisMad == this.mad && thisColix == this.colix && proteinstructure.getIndex (monomer) == this.endIndexPending + 1) {
++this.endIndexPending;
return;
}this.renderPending ();
}this.proteinstructurePending = proteinstructure;
this.startIndexPending = this.endIndexPending = proteinstructure.getIndex (monomer);
this.colix = thisColix;
this.mad = thisMad;
this.tPending = true;
}, "J.modelsetbio.Monomer,~N,~N");
$_M(c$, "renderPending", 
function () {
if (!this.tPending) return;
var segments = this.proteinstructurePending.getSegments ();
var tEnd = (this.endIndexPending == this.proteinstructurePending.getMonomerCount () - 1);
if (Clazz_instanceOf (this.proteinstructurePending, J.modelsetbio.Helix)) this.renderPendingRocketSegment (this.endIndexPending, segments[this.startIndexPending], segments[this.endIndexPending], segments[this.endIndexPending + 1], tEnd);
 else if (Clazz_instanceOf (this.proteinstructurePending, J.modelsetbio.Sheet)) this.renderPendingSheet (segments[this.startIndexPending], segments[this.endIndexPending], segments[this.endIndexPending + 1], tEnd);
this.tPending = false;
});
$_M(c$, "renderPendingRocketSegment", 
function (i, pointStart, pointBeforeEnd, pointEnd, tEnd) {
this.viewer.transformPt3f (pointStart, this.screenA);
this.viewer.transformPt3f (pointEnd, this.screenB);
var zMid = Clazz_doubleToInt (Math.floor ((this.screenA.z + this.screenB.z) / 2));
var diameter = Clazz_floatToInt (this.viewer.scaleToScreen (zMid, this.mad));
if (this.g3d.setColix (this.colix)) {
this.g3d.fillCylinderBits (2, diameter, this.screenA, this.screenB);
if (tEnd && this.renderArrowHeads) {
this.vtemp.sub2 (pointEnd, pointStart);
this.vtemp.normalize ();
this.screenA.scaleAdd2 (4.0, this.vtemp, pointEnd);
this.viewer.transformPt3f (this.screenA, this.screenC);
this.renderCone (i, pointEnd, this.screenA, this.screenB, this.screenC);
}if (this.startIndexPending == this.endIndexPending) return;
var t = this.screenB;
this.screenB = this.screenC;
this.screenC = t;
}}, "~N,JU.P3,JU.P3,JU.P3,~B");
$_M(c$, "renderCone", 
function (i, pointBegin, pointEnd, screenPtBegin, screenPtEnd) {
var coneDiameter = (this.mad << 1) - (this.mad >> 1);
coneDiameter = Clazz_floatToInt (this.viewer.scaleToScreen (Clazz_doubleToInt (Math.floor (screenPtBegin.z)), coneDiameter));
this.g3d.fillConeSceen3f (2, coneDiameter, screenPtBegin, screenPtEnd);
}, "~N,JU.P3,JU.P3,JU.P3,JU.P3");
$_M(c$, "renderPendingSheet", 
function (pointStart, pointBeforeEnd, pointEnd, tEnd) {
if (!this.g3d.setColix (this.colix)) return;
if (tEnd && this.renderArrowHeads) {
this.drawArrowHeadBox (pointBeforeEnd, pointEnd);
this.drawBox (pointStart, pointBeforeEnd);
} else {
this.drawBox (pointStart, pointEnd);
}}, "JU.P3,JU.P3,JU.P3,~B");
$_M(c$, "buildBox", 
function (pointCorner, scaledWidthVector, scaledHeightVector, lengthVector) {
for (var i = 8; --i >= 0; ) {
var corner = this.corners[i];
corner.setT (pointCorner);
if ((i & 1) != 0) corner.add (scaledWidthVector);
if ((i & 2) != 0) corner.add (scaledHeightVector);
if ((i & 4) != 0) corner.add (lengthVector);
this.viewer.transformPt3f (corner, this.screenCorners[i]);
}
}, "JU.P3,JU.V3,JU.V3,JU.V3");
$_M(c$, "buildArrowHeadBox", 
function (pointCorner, scaledWidthVector, scaledHeightVector, pointTip) {
for (var i = 4; --i >= 0; ) {
var corner = this.corners[i];
corner.setT (pointCorner);
if ((i & 1) != 0) corner.add (scaledWidthVector);
if ((i & 2) != 0) corner.add (scaledHeightVector);
this.viewer.transformPt3f (corner, this.screenCorners[i]);
}
this.corners[4].setT (pointTip);
this.viewer.transformPt3f (pointTip, this.screenCorners[4]);
this.corners[5].add2 (pointTip, scaledHeightVector);
this.viewer.transformPt3f (this.corners[5], this.screenCorners[5]);
}, "JU.P3,JU.V3,JU.V3,JU.P3");
$_M(c$, "drawBox", 
function (pointA, pointB) {
this.setBox (1, 0.25, pointA);
this.lengthVector.sub2 (pointB, pointA);
this.buildBox (this.pointCorner, this.scaledWidthVector, this.scaledHeightVector, this.lengthVector);
for (var i = 0; i < 6; ++i) {
var i0 = J.renderbio.RocketsRenderer.boxFaces[i * 4];
var i1 = J.renderbio.RocketsRenderer.boxFaces[i * 4 + 1];
var i2 = J.renderbio.RocketsRenderer.boxFaces[i * 4 + 2];
var i3 = J.renderbio.RocketsRenderer.boxFaces[i * 4 + 3];
this.g3d.fillQuadrilateral (this.screenCorners[i0], this.screenCorners[i1], this.screenCorners[i2], this.screenCorners[i3]);
}
}, "JU.P3,JU.P3");
$_M(c$, "setBox", 
function (width, height, pt) {
var sheet = this.proteinstructurePending;
var scale = this.mad / 1000;
this.scaledWidthVector.setT (sheet.getWidthUnitVector ());
this.scaledWidthVector.scale (scale * width);
this.scaledHeightVector.setT (sheet.getHeightUnitVector ());
this.scaledHeightVector.scale (scale * height);
this.pointCorner.scaleAdd2 (-0.5, pt, this.scaledHeightVector);
this.pointCorner.add (this.scaledWidthVector);
}, "~N,~N,JU.P3");
$_M(c$, "drawArrowHeadBox", 
function (base, tip) {
this.setBox (1.25, 0.333, base);
this.pointTipOffset.scaleAdd2 (-0.5, tip, this.scaledHeightVector);
this.buildArrowHeadBox (this.pointCorner, this.scaledWidthVector, this.scaledHeightVector, this.pointTipOffset);
this.g3d.fillTriangle3f (this.screenCorners[0], this.screenCorners[1], this.screenCorners[4], true);
this.g3d.fillTriangle3f (this.screenCorners[2], this.screenCorners[3], this.screenCorners[5], true);
for (var i = 0; i < 12; i += 4) {
var i0 = J.renderbio.RocketsRenderer.arrowHeadFaces[i];
var i1 = J.renderbio.RocketsRenderer.arrowHeadFaces[i + 1];
var i2 = J.renderbio.RocketsRenderer.arrowHeadFaces[i + 2];
var i3 = J.renderbio.RocketsRenderer.arrowHeadFaces[i + 3];
this.g3d.fillQuadrilateral (this.screenCorners[i0], this.screenCorners[i1], this.screenCorners[i2], this.screenCorners[i3]);
}
}, "JU.P3,JU.P3");
Clazz_defineStatics (c$,
"boxFaces", [0, 1, 3, 2, 0, 2, 6, 4, 0, 4, 5, 1, 7, 5, 4, 6, 7, 6, 2, 3, 7, 3, 1, 5]);
Clazz_defineStatics (c$,
"arrowHeadFaces", [0, 1, 3, 2, 0, 4, 5, 2, 1, 4, 5, 3]);
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.RocketsRenderer", "JU.P3", "$.P3i"], "J.renderbio.CartoonRenderer", ["J.util.C"], function () {
c$ = Clazz_decorateAsClass (function () {
this.renderAsRockets = false;
this.renderEdges = false;
this.ladderOnly = false;
this.ptConnectScr = null;
this.ptConnect = null;
this.ring6Points = null;
this.ring6Screens = null;
this.ring5Points = null;
this.ring5Screens = null;
Clazz_instantialize (this, arguments);
}, J.renderbio, "CartoonRenderer", J.renderbio.RocketsRenderer);
Clazz_prepareFields (c$, function () {
this.ptConnectScr =  new JU.P3i ();
this.ptConnect =  new JU.P3 ();
this.ring6Points =  new Array (6);
this.ring6Screens =  new Array (6);
this.ring5Points =  new Array (5);
this.ring5Screens =  new Array (5);
{
this.ring6Screens[5] =  new JU.P3i ();
for (var i = 5; --i >= 0; ) {
this.ring5Screens[i] =  new JU.P3i ();
this.ring6Screens[i] =  new JU.P3i ();
}
}});
$_V(c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) {
this.renderStrands ();
return;
}this.newRockets = true;
if (this.wingVectors == null || this.isCarbohydrate) return;
this.getScreenControlPoints ();
if (this.isNucleic) {
this.renderNucleic ();
return;
}var val = this.viewer.getBoolean (603979818);
if (this.renderAsRockets != val) {
bioShape.falsifyMesh ();
this.renderAsRockets = val;
}val = !this.viewer.getBoolean (603979900);
if (this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}this.ribbonTopScreens = this.calcScreens (0.5);
this.ribbonBottomScreens = this.calcScreens (-0.5);
this.calcRopeMidPoints (this.newRockets);
if (!this.renderArrowHeads) {
this.calcScreenControlPoints (this.cordMidPoints);
this.controlPoints = this.cordMidPoints;
}this.renderRockets ();
this.viewer.freeTempPoints (this.cordMidPoints);
this.viewer.freeTempScreens (this.ribbonTopScreens);
this.viewer.freeTempScreens (this.ribbonBottomScreens);
}, "J.shapebio.BioShape");
$_M(c$, "renderNucleic", 
function () {
this.renderEdges = this.viewer.getBoolean (603979817);
this.ladderOnly = this.viewer.getBoolean (603979820);
var isTraceAlpha = this.viewer.getBoolean (603979966);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
if (isTraceAlpha) {
this.ptConnectScr.set (Clazz_doubleToInt ((this.controlPointScreens[i].x + this.controlPointScreens[i + 1].x) / 2), Clazz_doubleToInt ((this.controlPointScreens[i].y + this.controlPointScreens[i + 1].y) / 2), Clazz_doubleToInt ((this.controlPointScreens[i].z + this.controlPointScreens[i + 1].z) / 2));
this.ptConnect.ave (this.controlPoints[i], this.controlPoints[i + 1]);
} else {
this.ptConnectScr.setT (this.controlPointScreens[i + 1]);
this.ptConnect.setT (this.controlPoints[i + 1]);
}this.renderHermiteConic (i, false);
this.colix = this.getLeadColix (i);
if (this.setBioColix (this.colix)) this.renderNucleicBaseStep (this.monomers[i], this.mads[i], this.ptConnectScr, this.ptConnect);
}
});
$_V(c$, "renderRockets", 
function () {
var lastWasSheet = false;
var lastWasHelix = false;
var previousStructure = null;
var thisStructure;
for (var i = this.monomerCount; --i >= 0; ) {
thisStructure = this.monomers[i].getProteinStructure ();
if (thisStructure !== previousStructure) {
if (this.renderAsRockets) lastWasHelix = false;
lastWasSheet = false;
}previousStructure = thisStructure;
var isHelix = this.isHelix (i);
var isSheet = this.isSheet (i);
var isHelixRocket = (this.renderAsRockets || !this.renderArrowHeads ? isHelix : false);
if (this.bsVisible.get (i)) {
if (isHelixRocket) {
} else if (isSheet || isHelix) {
if (lastWasSheet && isSheet || lastWasHelix && isHelix) {
this.renderHermiteRibbon (true, i, true);
} else {
this.renderHermiteArrowHead (i);
}} else {
this.renderHermiteConic (i, true);
}}lastWasSheet = isSheet;
lastWasHelix = isHelix;
}
if (this.renderAsRockets || !this.renderArrowHeads) this.renderCartoonRockets ();
});
$_M(c$, "renderCartoonRockets", 
function () {
this.tPending = false;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) if (this.isHelix (i)) this.renderSpecialSegment (this.monomers[i], this.getLeadColix (i), this.mads[i]);

this.renderPending ();
});
$_M(c$, "renderNucleicBaseStep", 
function (nucleotide, thisMad, backboneScreen, ptConnect) {
if (this.renderEdges) {
this.renderLeontisWesthofEdges (nucleotide, thisMad);
return;
}nucleotide.getBaseRing6Points (this.ring6Points);
this.viewer.transformPoints (this.ring6Points, this.ring6Screens);
this.renderRing6 ();
var hasRing5 = nucleotide.maybeGetBaseRing5Points (this.ring5Points);
var stepScreen;
var stepPt;
var pt;
if (hasRing5) {
this.viewer.transformPoints (this.ring5Points, this.ring5Screens);
this.renderRing5 ();
if (this.ladderOnly) {
stepScreen = this.ring6Screens[2];
stepPt = this.ring6Points[2];
} else {
stepScreen = this.ring5Screens[3];
stepPt = this.ring5Points[3];
}} else {
pt = (this.ladderOnly ? 4 : 2);
stepScreen = this.ring6Screens[pt];
stepPt = this.ring6Points[pt];
}this.mad = (thisMad > 1 ? Clazz_doubleToInt (thisMad / 2) : thisMad);
this.g3d.fillCylinderScreen3I (3, Clazz_floatToInt (this.viewer.scaleToScreen (backboneScreen.z, this.mad)), backboneScreen, stepScreen, ptConnect, stepPt, this.mad / 2000);
if (this.ladderOnly) return;
--this.ring6Screens[5].z;
for (var i = 5; --i >= 0; ) {
--this.ring6Screens[i].z;
if (hasRing5) --this.ring5Screens[i].z;
}
for (var i = 6; --i > 0; ) this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[i], this.ring6Screens[i - 1], this.ring6Points[i], this.ring6Points[i - 1], 0.005);

if (hasRing5) {
for (var i = 5; --i > 0; ) this.g3d.fillCylinderScreen3I (3, 3, this.ring5Screens[i], this.ring5Screens[i - 1], this.ring5Points[i], this.ring5Points[i - 1], 0.005);

} else {
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[5], this.ring6Screens[0], this.ring6Points[5], this.ring6Points[0], 0.005);
}}, "J.modelsetbio.NucleicMonomer,~N,JU.P3i,JU.P3");
$_M(c$, "renderLeontisWesthofEdges", 
function (nucleotide, thisMad) {
if (!nucleotide.getEdgePoints (this.ring6Points)) return;
this.viewer.transformPoints (this.ring6Points, this.ring6Screens);
this.renderTriangle ();
this.mad = (thisMad > 1 ? Clazz_doubleToInt (thisMad / 2) : thisMad);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[0], this.ring6Screens[1], this.ring6Points[0], this.ring6Points[1], 0.005);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[1], this.ring6Screens[2], this.ring6Points[1], this.ring6Points[2], 0.005);
var isTranslucent = J.util.C.isColixTranslucent (this.colix);
var tl = J.util.C.getColixTranslucencyLevel (this.colix);
var colixSugarEdge = J.util.C.getColixTranslucent3 (10, isTranslucent, tl);
var colixWatsonCrickEdge = J.util.C.getColixTranslucent3 (11, isTranslucent, tl);
var colixHoogsteenEdge = J.util.C.getColixTranslucent3 (7, isTranslucent, tl);
this.g3d.setColix (colixSugarEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[2], this.ring6Screens[3], this.ring6Points[2], this.ring6Points[3], 0.005);
this.g3d.setColix (colixWatsonCrickEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[3], this.ring6Points[4], 0.005);
this.g3d.setColix (colixHoogsteenEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[4], this.ring6Screens[5], this.ring6Points[4], this.ring6Points[5], 0.005);
}, "J.modelsetbio.NucleicMonomer,~N");
$_M(c$, "renderTriangle", 
function () {
this.g3d.setNoisySurfaceShade (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4]);
this.g3d.fillTriangle3i (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[2], this.ring6Points[3], this.ring6Points[4]);
});
$_M(c$, "renderRing6", 
function () {
if (this.ladderOnly) return;
this.g3d.setNoisySurfaceShade (this.ring6Screens[0], this.ring6Screens[2], this.ring6Screens[4]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[2], this.ring6Screens[4], this.ring6Points[0], this.ring6Points[2], this.ring6Points[4]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[1], this.ring6Screens[2], this.ring6Points[0], this.ring6Points[1], this.ring6Points[2]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[4], this.ring6Screens[5], this.ring6Points[0], this.ring6Points[4], this.ring6Points[5]);
this.g3d.fillTriangle3i (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[2], this.ring6Points[3], this.ring6Points[4]);
});
$_M(c$, "renderRing5", 
function () {
if (this.ladderOnly) return;
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[2], this.ring5Screens[3], this.ring5Points[0], this.ring5Points[2], this.ring5Points[3]);
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[1], this.ring5Screens[2], this.ring5Points[0], this.ring5Points[1], this.ring5Points[2]);
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[3], this.ring5Screens[4], this.ring5Points[0], this.ring5Points[3], this.ring5Points[4]);
});
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.BioShapeRenderer"], "J.renderbio.BackboneRenderer", ["J.util.C"], function () {
c$ = Clazz_declareType (J.renderbio, "BackboneRenderer", J.renderbio.BioShapeRenderer);
$_V(c$, "renderBioShape", 
function (bioShape) {
var isDataFrame = this.viewer.isJmolDataFrameForModel (bioShape.modelIndex);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var atomA = this.modelSet.atoms[this.leadAtomIndices[i]];
var atomB = this.modelSet.atoms[this.leadAtomIndices[i + 1]];
if (atomA.getNBackbonesDisplayed () == 0 || atomB.getNBackbonesDisplayed () == 0 || this.modelSet.isAtomHidden (atomB.getIndex ())) continue;
if (!isDataFrame && atomA.distance (atomB) > 10) continue;
var colixA = J.util.C.getColixInherited (this.colixes[i], atomA.getColix ());
var colixB = J.util.C.getColixInherited (this.colixes[i + 1], atomB.getColix ());
if (!this.isExport && !this.isPass2) {
var doA = !J.util.C.isColixTranslucent (colixA);
var doB = !J.util.C.isColixTranslucent (colixB);
if (!doA || !doB) {
if (!doA && !doB) continue;
this.needTranslucent = true;
}}var xA = atomA.sX;
var yA = atomA.sY;
var zA = atomA.sZ;
var xB = atomB.sX;
var yB = atomB.sY;
var zB = atomB.sZ;
this.mad = this.mads[i];
if (this.mad < 0) {
this.g3d.drawLine (colixA, colixB, xA, yA, zA, xB, yB, zB);
} else {
var width = Clazz_floatToInt (this.exportType == 1 ? this.mad : this.viewer.scaleToScreen (Clazz_doubleToInt ((zA + zB) / 2), this.mad));
this.g3d.fillCylinderXYZ (colixA, colixB, 3, width, xA, yA, zA, xB, yB, zB);
}}
}, "J.shapebio.BioShape");
});
Clazz_declarePackage ("J.renderbio");
Clazz_load (["J.renderbio.StrandsRenderer"], "J.renderbio.TraceRenderer", null, function () {
c$ = Clazz_declareType (J.renderbio, "TraceRenderer", J.renderbio.StrandsRenderer);
$_V(c$, "renderBioShape", 
function (bioShape) {
if (this.wireframeOnly) this.renderStrands ();
 else this.renderTrace ();
}, "J.shapebio.BioShape");
$_M(c$, "renderTrace", 
function () {
this.getScreenControlPoints ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteConic (i, false);

});
});
})(Clazz
,Clazz.newArray
,Clazz.newBooleanArray
,Clazz.newByteArray
,Clazz.newCharArray
,Clazz.newDoubleArray
,Clazz.newFloatArray
,Clazz.newIntArray
,Clazz.newLongArray
,Clazz.newShortArray
,Clazz.prepareCallback
,Clazz.decorateAsClass
,Clazz.isClassDefined
,Clazz.defineEnumConstant
,Clazz.cloneFinals
,Clazz.inheritArgs
,Clazz.pu$h
,Clazz.declareInterface
,Clazz.declarePackage
,Clazz.makeConstructor
,Clazz.overrideConstructor
,Clazz.load
,Clazz.defineMethod
,Clazz.innerTypeInstance
,Clazz.instanceOf
,Clazz.p0p
,Clazz.makeFunction
,Clazz.superConstructor
,Clazz.defineStatics
,Clazz.registerSerializableFields
,Clazz.declareType
,Clazz.superCall
,Clazz.overrideMethod
,Clazz.declareAnonymous
,Clazz.checkPrivateMethod
,Clazz.prepareFields
,Clazz.instantialize
,Clazz.doubleToInt
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.supportsNativeObject
,Clazz.extendedObjectMethods
,Clazz.callingStackTraces
,Clazz.clone
,Clazz.doubleToShort
,Clazz.innerFunctions
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
);
