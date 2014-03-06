Clazz.declarePackage ("J.minimize.forcefield");
Clazz.load (["J.minimize.forcefield.ForceField", "J.script.T"], "J.minimize.forcefield.ForceFieldUFF", ["java.util.Hashtable", "JU.BS", "$.List", "$.PT", "J.minimize.forcefield.CalculationsUFF", "$.FFParam", "J.util.Elements", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsAromatic = null;
Clazz.instantialize (this, arguments);
}, J.minimize.forcefield, "ForceFieldUFF", J.minimize.forcefield.ForceField);
Clazz.makeConstructor (c$, 
function (minimizer) {
Clazz.superConstructor (this, J.minimize.forcefield.ForceFieldUFF, []);
this.minimizer = minimizer;
this.name = "UFF";
}, "J.minimize.Minimizer");
$_V(c$, "clear", 
function () {
this.bsAromatic = null;
});
$_V(c$, "setModel", 
function (bsElements, elemnoMax) {
this.setModelFields ();
J.util.Logger.info ("minimize: setting atom types...");
if (J.minimize.forcefield.ForceFieldUFF.atomTypes == null && (J.minimize.forcefield.ForceFieldUFF.atomTypes = this.getAtomTypes ()) == null) return false;
if (J.minimize.forcefield.ForceFieldUFF.ffParams == null && (J.minimize.forcefield.ForceFieldUFF.ffParams = this.getFFParameters ()) == null) return false;
this.setAtomTypes (bsElements, elemnoMax);
this.calc =  new J.minimize.forcefield.CalculationsUFF (this, J.minimize.forcefield.ForceFieldUFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
$_M(c$, "setAtomTypes", 
($fz = function (bsElements, elemnoMax) {
var nTypes = J.minimize.forcefield.ForceFieldUFF.atomTypes.size ();
bsElements.clear (0);
for (var i = 0; i < nTypes; i++) {
var data = J.minimize.forcefield.ForceFieldUFF.atomTypes.get (i);
var smarts = data[0];
if (smarts == null) continue;
var search = this.getSearch (smarts, elemnoMax, bsElements);
if (bsElements.get (0)) bsElements.clear (0);
 else if (search == null) break;
 else for (var j = this.minimizer.bsAtoms.nextSetBit (0), pt = 0; j < this.minimizer.atoms.length && j >= 0; j = this.minimizer.bsAtoms.nextSetBit (j + 1), pt++) if (search.get (j)) this.minAtoms[pt].sType = data[1].intern ();

}
}, $fz.isPrivate = true, $fz), "JU.BS,~N");
$_M(c$, "getSearch", 
($fz = function (smarts, elemnoMax, bsElements) {
var search = null;
var len = smarts.length;
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[0];
var n = smarts.charCodeAt (len - 2) - 48;
var elemNo = 0;
if (n >= 10) n = 0;
var isAromatic = false;
if (smarts.charAt (1) == '#') {
elemNo = JU.PT.parseInt (smarts.substring (2, len - 1));
} else {
var s = smarts.substring (1, (n > 0 ? len - 3 : len - 1));
if (s.equals (s.toLowerCase ())) {
s = s.toUpperCase ();
isAromatic = true;
}elemNo = J.util.Elements.elementNumberFromSymbol (s, false);
}if (elemNo > elemnoMax) return null;
if (!bsElements.get (elemNo)) {
bsElements.set (0);
return null;
}switch (smarts.charAt (len - 3)) {
case 'D':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[2];
search[6].intValue = n;
break;
case '^':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[4 + (n - 1)];
break;
case '+':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = n;
break;
case '-':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = -n;
break;
case 'A':
search = J.minimize.forcefield.ForceFieldUFF.tokenTypes[6];
break;
}
search[2].intValue = elemNo;
var v = this.minimizer.viewer.evaluateExpression (search);
if (!(Clazz.instanceOf (v, JU.BS))) return null;
var bs = v;
if (isAromatic && bs.cardinality () > 0) {
if (this.bsAromatic == null) this.bsAromatic = this.minimizer.viewer.evaluateExpression (J.minimize.forcefield.ForceFieldUFF.tokenTypes[3]);
bs.and (this.bsAromatic);
}if (J.util.Logger.debugging && bs.cardinality () > 0) J.util.Logger.debug (smarts + " minimize atoms=" + bs);
return bs;
}, $fz.isPrivate = true, $fz), "~S,~N,JU.BS");
$_M(c$, "getFFParameters", 
($fz = function () {
var ffParam;
var temp =  new java.util.Hashtable ();
var resourceName = "UFF.txt";
var br = null;
try {
br = this.getBufferedReader (resourceName);
var line;
while ((line = br.readLine ()) != null) {
var vs = JU.PT.getTokens (line);
if (vs.length < 13) continue;
if (J.util.Logger.debugging) J.util.Logger.debug (line);
if (line.substring (0, 5).equals ("param")) {
ffParam =  new J.minimize.forcefield.FFParam ();
temp.put (vs[1], ffParam);
ffParam.dVal =  Clazz.newDoubleArray (11, 0);
ffParam.sVal =  new Array (1);
ffParam.sVal[0] = vs[1];
ffParam.dVal[0] = JU.PT.parseFloat (vs[2]);
ffParam.dVal[1] = JU.PT.parseFloat (vs[3]) * 0.017453292519943295;
ffParam.dVal[2] = JU.PT.parseFloat (vs[4]);
ffParam.dVal[3] = JU.PT.parseFloat (vs[5]);
ffParam.dVal[4] = JU.PT.parseFloat (vs[6]);
ffParam.dVal[5] = JU.PT.parseFloat (vs[7]);
ffParam.dVal[6] = JU.PT.parseFloat (vs[8]);
ffParam.dVal[7] = JU.PT.parseFloat (vs[9]);
ffParam.dVal[8] = JU.PT.parseFloat (vs[10]);
ffParam.dVal[9] = JU.PT.parseFloat (vs[11]);
ffParam.dVal[10] = JU.PT.parseFloat (vs[12]);
ffParam.iVal =  Clazz.newIntArray (1, 0);
var coord = (vs[1].length > 2 ? vs[1].charAt (2) : '1');
switch (coord) {
case 'R':
coord = '2';
break;
default:
coord = '1';
break;
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
break;
}
ffParam.iVal[0] = coord.charCodeAt (0) - 48;
}}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName);
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
return null;
} else {
throw e;
}
}
J.util.Logger.info (temp.size () + " atom types read from " + resourceName);
return temp;
}, $fz.isPrivate = true, $fz));
$_M(c$, "getAtomTypes", 
($fz = function () {
var types =  new JU.List ();
var fileName = "UFF.txt";
try {
var br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
if (line.length > 4 && line.substring (0, 4).equals ("atom")) {
var vs = JU.PT.getTokens (line);
var info = [vs[1], vs[2]];
types.addLast (info);
}}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
} else {
throw e;
}
}
J.util.Logger.info (types.size () + " UFF parameters read");
return (types.size () > 0 ? types : null);
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"atomTypes", null,
"ffParams", null,
"TOKEN_ELEMENT_ONLY", 0,
"TOKEN_ELEMENT_CHARGED", 1,
"TOKEN_ELEMENT_CONNECTED", 2,
"TOKEN_AROMATIC", 3,
"TOKEN_ELEMENT_SP", 4,
"TOKEN_ELEMENT_ALLYLIC", 6,
"PT_ELEMENT", 2,
"PT_CHARGE", 5,
"PT_CONNECT", 6);
c$.tokenTypes = c$.prototype.tokenTypes = [[J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.n (269484436, 1632634891), J.script.T.i (0), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (0), J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.o (1073741824, "flatring"), J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenLeftParen, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (1), J.script.T.tokenComma, J.script.T.o (4, "triple"), J.script.T.tokenRightParen, J.script.T.tokenOr, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (2), J.script.T.tokenComma, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.o (135266310, "connected"), J.script.T.tokenLeftParen, J.script.T.i (1), J.script.T.tokenComma, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd], [J.script.T.tokenExpressionBegin, J.script.T.n (269484436, 1095763978), J.script.T.i (0), J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.i (3), J.script.T.tokenRightParen, J.script.T.tokenAnd, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.tokenConnected, J.script.T.tokenLeftParen, J.script.T.o (4, "double"), J.script.T.tokenRightParen, J.script.T.tokenRightParen, J.script.T.tokenExpressionEnd]];
});
