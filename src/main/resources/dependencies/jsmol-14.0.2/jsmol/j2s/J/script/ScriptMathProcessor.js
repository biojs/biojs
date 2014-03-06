Clazz.declarePackage ("J.script");
Clazz.load (null, "J.script.ScriptMathProcessor", ["java.lang.Float", "java.util.Arrays", "$.Hashtable", "JU.A4", "$.AU", "$.CU", "$.DF", "$.List", "$.M3", "$.M4", "$.P3", "$.P4", "$.PT", "$.V3", "J.modelset.BondSet", "J.script.SV", "$.T", "J.util.BSUtil", "$.Escape", "$.Logger", "$.Quaternion"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chk = false;
this.wasSyntaxCheck = false;
this.logMessages = false;
this.eval = null;
this.viewer = null;
this.oStack = null;
this.xStack = null;
this.ifStack = null;
this.ifPt = -1;
this.oPt = -1;
this.xPt = -1;
this.parenCount = 0;
this.squareCount = 0;
this.braceCount = 0;
this.wasX = false;
this.incrementX = 0;
this.isArrayItem = false;
this.asVector = false;
this.asBitSet = false;
this.ptid = 0;
this.ptx = 2147483647;
this.skipping = false;
this.haveSpaceBeforeSquare = false;
this.equalCount = 0;
Clazz.instantialize (this, arguments);
}, J.script, "ScriptMathProcessor");
Clazz.prepareFields (c$, function () {
this.oStack =  new Array (8);
this.xStack =  new Array (8);
this.ifStack =  Clazz.newCharArray (8, '\0');
});
Clazz.makeConstructor (c$, 
function (eval, isArrayItem, asVector, asBitSet) {
this.eval = eval;
this.viewer = eval.viewer;
this.logMessages = eval.logMessages;
this.chk = this.wasSyntaxCheck = eval.chk;
this.isArrayItem = isArrayItem;
this.asVector = asVector || isArrayItem;
this.asBitSet = asBitSet;
this.wasX = isArrayItem;
if (this.logMessages) J.util.Logger.debug ("initialize RPN");
}, "J.script.ScriptEvaluator,~B,~B,~B");
$_M(c$, "getResult", 
function (allowUnderflow) {
var isOK = true;
while (isOK && this.oPt >= 0) isOK = this.operate ();

if (isOK) {
if (this.asVector) {
var result =  new JU.List ();
for (var i = 0; i <= this.xPt; i++) result.addLast (J.script.SV.selectItemVar (this.xStack[i]));

return J.script.SV.newV (135198, result);
}if (this.xPt == 0) {
var x = this.xStack[0];
if (x.tok == 10 || x.tok == 7 || x.tok == 4 || x.tok == 11 || x.tok == 12) x = J.script.SV.selectItemVar (x);
if (this.asBitSet && x.tok == 7) x = J.script.SV.newV (10, J.script.SV.unEscapeBitSetArray (x.value, false));
return x;
}}if (!allowUnderflow && (this.xPt >= 0 || this.oPt >= 0)) {
this.eval.error (22);
}return null;
}, "~B");
$_M(c$, "putX", 
($fz = function (x) {
if (this.skipping) return;
if (++this.xPt == this.xStack.length) this.xStack = JU.AU.doubleLength (this.xStack);
if (this.logMessages) {
J.util.Logger.debug ("\nputX: " + x);
}this.xStack[this.xPt] = x;
this.ptx = ++this.ptid;
}, $fz.isPrivate = true, $fz), "J.script.SV");
$_M(c$, "putOp", 
($fz = function (op) {
if (++this.oPt >= this.oStack.length) this.oStack = JU.AU.doubleLength (this.oStack);
this.oStack[this.oPt] = op;
this.ptid++;
}, $fz.isPrivate = true, $fz), "J.script.T");
$_M(c$, "putIf", 
($fz = function (c) {
if (++this.ifPt >= this.ifStack.length) this.ifStack = JU.AU.doubleLength (this.ifStack);
this.ifStack[this.ifPt] = c;
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "addXVar", 
function (x) {
this.putX (x);
return this.wasX = true;
}, "J.script.SV");
$_M(c$, "addXObj", 
function (x) {
var v = J.script.SV.getVariable (x);
if (v == null) return false;
this.putX (v);
return this.wasX = true;
}, "~O");
$_M(c$, "addXStr", 
function (x) {
this.putX (J.script.SV.newS (x));
return this.wasX = true;
}, "~S");
$_M(c$, "addXBool", 
function (x) {
this.putX (J.script.SV.getBoolean (x));
return this.wasX = true;
}, "~B");
$_M(c$, "addXInt", 
function (x) {
this.putX (J.script.SV.newI (x));
return this.wasX = true;
}, "~N");
$_M(c$, "addXList", 
function (x) {
this.putX (J.script.SV.getVariableList (x));
return this.wasX = true;
}, "JU.List");
$_M(c$, "addXMap", 
function (x) {
this.putX (J.script.SV.getVariableMap (x));
return this.wasX = true;
}, "java.util.Map");
$_M(c$, "addXM3", 
function (x) {
this.putX (J.script.SV.newV (11, x));
return this.wasX = true;
}, "JU.M3");
$_M(c$, "addXM4", 
function (x) {
this.putX (J.script.SV.newV (12, x));
return this.wasX = true;
}, "JU.M4");
$_M(c$, "addXFloat", 
function (x) {
if (Float.isNaN (x)) return this.addXStr ("NaN");
this.putX (J.script.SV.newV (3, Float.$valueOf (x)));
return this.wasX = true;
}, "~N");
$_M(c$, "addXBs", 
function (bs) {
this.putX (J.script.SV.newV (10, bs));
return this.wasX = true;
}, "JU.BS");
$_M(c$, "addXPt", 
function (pt) {
this.putX (J.script.SV.newV (8, pt));
return this.wasX = true;
}, "JU.P3");
$_M(c$, "addXPt4", 
function (pt) {
this.putX (J.script.SV.newV (9, pt));
return this.wasX = true;
}, "JU.P4");
$_M(c$, "addXNum", 
function (x) {
if (this.wasX) switch (x.tok) {
case 2:
if (x.intValue < 0) {
this.addOp (J.script.T.tokenMinus);
x = J.script.SV.newI (-x.intValue);
}break;
case 3:
var f = (x.value).floatValue ();
if (f < 0 || f == 0 && 1 / f == -Infinity) {
this.addOp (J.script.T.tokenMinus);
x = J.script.SV.newV (3, Float.$valueOf (-f));
}break;
}
this.putX (x);
return this.wasX = true;
}, "J.script.SV");
$_M(c$, "addXAV", 
function (x) {
this.putX (J.script.SV.getVariableAV (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAD", 
function (x) {
this.putX (J.script.SV.getVariableAD (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAS", 
function (x) {
this.putX (J.script.SV.getVariableAS (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAI", 
function (x) {
this.putX (J.script.SV.getVariableAI (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAII", 
function (x) {
this.putX (J.script.SV.getVariableAII (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAF", 
function (x) {
this.putX (J.script.SV.getVariableAF (x));
return this.wasX = true;
}, "~A");
$_M(c$, "addXAFF", 
function (x) {
this.putX (J.script.SV.getVariableAFF (x));
return this.wasX = true;
}, "~A");
c$.isOpFunc = $_M(c$, "isOpFunc", 
($fz = function (op) {
return (J.script.T.tokAttr (op.tok, 135266304) && op !== J.script.T.tokenArraySquare || op.tok == 269484241 && J.script.T.tokAttr (op.intValue, 135266304));
}, $fz.isPrivate = true, $fz), "J.script.T");
$_M(c$, "addOp", 
function (op) {
return this.addOpAllowMath (op, true);
}, "J.script.T");
$_M(c$, "addOpAllowMath", 
function (op, allowMathFunc) {
if (this.logMessages) {
J.util.Logger.debug ("addOp entry\naddOp: " + op);
}var tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
this.skipping = (this.ifPt >= 0 && (this.ifStack[this.ifPt] == 'F' || this.ifStack[this.ifPt] == 'X'));
if (this.skipping) {
switch (op.tok) {
case 269484048:
this.putOp (op);
return true;
case 269484066:
if (tok0 != 269484066 || this.ifStack[this.ifPt] == 'X') return true;
this.ifStack[this.ifPt] = 'T';
this.wasX = false;
this.skipping = false;
return true;
case 269484049:
if (tok0 == 269484048) {
this.oPt--;
return true;
}if (tok0 != 269484066) {
this.putOp (op);
return true;
}this.wasX = true;
this.ifPt--;
this.oPt -= 2;
this.skipping = false;
return true;
default:
return true;
}
}var newOp = null;
var tok;
var isLeftOp = false;
var isDotSelector = (op.tok == 269484241);
if (isDotSelector && !this.wasX) return false;
var isMathFunc = (allowMathFunc && J.script.ScriptMathProcessor.isOpFunc (op));
if (this.oPt >= 1 && op.tok != 269484048 && tok0 == 135266319) tok0 = this.oStack[--this.oPt].tok;
var isArgument = (this.oPt >= 1 && tok0 == 269484048);
switch (op.tok) {
case 1073742195:
this.haveSpaceBeforeSquare = true;
return true;
case 269484080:
if (!this.wasX) return false;
break;
case 32:
case 64:
case 96:
case 128:
case 160:
case 192:
case 480:
tok = (this.oPt < 0 ? 0 : tok0);
if (!this.wasX || !(tok == 269484241 || tok == 1678770178 || tok == 1141899265)) return false;
this.oStack[this.oPt].intValue |= op.tok;
return true;
case 269484096:
isLeftOp = true;
if (!this.wasX || this.haveSpaceBeforeSquare) {
this.squareCount++;
op = newOp = J.script.T.tokenArraySquare;
this.haveSpaceBeforeSquare = false;
}break;
case 269484097:
break;
case 269484225:
case 269484226:
this.incrementX = (op.tok == 269484226 ? 1 : -1);
if (this.ptid == this.ptx) {
if (this.chk) return true;
var x = this.xStack[this.xPt];
this.xStack[this.xPt] = J.script.SV.newS ("").setv (x, false);
return x.increment (this.incrementX);
}break;
case 269484192:
if (this.wasX) break;
this.addXInt (0);
op = J.script.SV.newV (269484224, "-");
break;
case 269484049:
if (!this.wasX && this.oPt >= 1 && tok0 == 269484048 && !J.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt - 1])) return false;
break;
case 269484144:
case 269484048:
isLeftOp = true;
default:
if (isMathFunc) {
if (!isDotSelector && this.wasX && !isArgument) return false;
newOp = op;
isLeftOp = true;
break;
}if (this.wasX == isLeftOp && tok0 != 269484241) return false;
break;
}
while (this.oPt >= 0 && tok0 != 269484066 && (!isLeftOp || tok0 == 269484241 && (op.tok == 269484241 || op.tok == 269484096)) && J.script.T.getPrecedence (tok0) >= J.script.T.getPrecedence (op.tok)) {
if (this.logMessages) {
J.util.Logger.debug ("\noperating, oPt=" + this.oPt + " isLeftOp=" + isLeftOp + " oStack[oPt]=" + J.script.T.nameOf (tok0) + "        prec=" + J.script.T.getPrecedence (tok0) + " pending op=\"" + J.script.T.nameOf (op.tok) + "\" prec=" + J.script.T.getPrecedence (op.tok));
this.dumpStacks ("operating");
}if (op.tok == 269484049 && tok0 == 269484048) {
if (this.xPt >= 0) this.xStack[this.xPt] = J.script.SV.selectItemVar (this.xStack[this.xPt]);
break;
}if (op.tok == 269484097 && tok0 == 135266306) {
break;
}if (op.tok == 269484097 && tok0 == 269484096) {
if (this.isArrayItem && this.squareCount == 1 && this.equalCount == 0) {
this.addXVar (J.script.SV.newT (J.script.T.tokenArraySelector));
break;
}if (!this.doBitsetSelect ()) return false;
break;
}if (!this.operate ()) return false;
tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
}
if (newOp != null) this.addXVar (J.script.SV.newV (269484436, newOp));
switch (op.tok) {
case 269484048:
this.parenCount++;
this.wasX = false;
break;
case 806354977:
var isFirst = this.getX ().asBoolean ();
if (tok0 == 269484066) this.ifPt--;
 else this.putOp (J.script.T.tokenColon);
this.putIf (isFirst ? 'T' : 'F');
this.skipping = !isFirst;
this.wasX = false;
return true;
case 269484066:
if (tok0 != 269484066) return false;
if (this.ifPt < 0) return false;
this.ifStack[this.ifPt] = 'X';
this.wasX = false;
this.skipping = true;
return true;
case 269484049:
this.wasX = true;
if (this.parenCount-- <= 0) return false;
if (tok0 == 269484066) {
this.ifPt--;
this.oPt--;
}this.oPt--;
if (this.oPt < 0) return true;
if (J.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt]) && !this.evaluateFunction (0)) return false;
this.skipping = (this.ifPt >= 0 && this.ifStack[this.ifPt] == 'X');
return true;
case 269484080:
this.wasX = false;
return true;
case 269484096:
this.squareCount++;
this.wasX = false;
break;
case 269484097:
this.wasX = true;
if (this.squareCount-- <= 0 || this.oPt < 0) return false;
if (this.oStack[this.oPt].tok == 135266306) return this.evaluateFunction (269484096);
this.oPt--;
return true;
case 269484241:
this.wasX = (!allowMathFunc || !J.script.T.tokAttr (op.intValue, 135266304));
break;
case 1048586:
this.braceCount++;
this.wasX = false;
break;
case 1048590:
if (this.braceCount-- <= 0) return false;
this.wasX = false;
break;
case 269484128:
case 269484112:
if (!this.wasSyntaxCheck && this.xPt < 0) return false;
if (!this.wasSyntaxCheck && this.xStack[this.xPt].tok != 10 && this.xStack[this.xPt].tok != 7) {
var tf = this.getX ().asBoolean ();
this.addXVar (J.script.SV.getBoolean (tf));
if (tf == (op.tok == 269484112)) {
this.chk = true;
op = (op.tok == 269484112 ? J.script.T.tokenOrTRUE : J.script.T.tokenAndFALSE);
}}this.wasX = false;
break;
case 269484436:
if (this.squareCount == 0) this.equalCount++;
this.wasX = false;
break;
default:
this.wasX = false;
}
this.putOp (op);
if (op.tok == 269484241 && (op.intValue & -481) == 135368713 && op.intValue != 135368713) {
return this.evaluateFunction (0);
}return true;
}, "J.script.T,~B");
$_M(c$, "doBitsetSelect", 
($fz = function () {
if (this.xPt < 0 || this.xPt == 0 && !this.isArrayItem) {
return false;
}var var1 = this.xStack[this.xPt--];
var $var = this.xStack[this.xPt];
if ($var.tok == 7 && var1.tok == 4 && $var.intValue != 2147483647) {
$var = J.script.SV.selectItemTok ($var, -2147483648);
}if ($var.tok == 6) {
var v = $var.mapValue (J.script.SV.sValue (var1));
this.xStack[this.xPt] = (v == null ? J.script.SV.newS ("") : v);
return true;
}var i = var1.asInt ();
switch ($var.tok) {
default:
$var = J.script.SV.newS (J.script.SV.sValue ($var));
case 10:
case 7:
case 4:
case 11:
case 12:
this.xStack[this.xPt] = J.script.SV.selectItemTok ($var, i);
break;
}
return true;
}, $fz.isPrivate = true, $fz));
$_M(c$, "dumpStacks", 
function (message) {
J.util.Logger.debug ("\n\n------------------\nRPN stacks: " + message + "\n");
for (var i = 0; i <= this.xPt; i++) J.util.Logger.debug ("x[" + i + "]: " + this.xStack[i]);

J.util.Logger.debug ("\n");
for (var i = 0; i <= this.oPt; i++) J.util.Logger.debug ("o[" + i + "]: " + this.oStack[i] + " prec=" + J.script.T.getPrecedence (this.oStack[i].tok));

J.util.Logger.debug (" ifStack = " + ( String.instantialize (this.ifStack)).substring (0, this.ifPt + 1));
}, "~S");
$_M(c$, "getX", 
function () {
if (this.xPt < 0) this.eval.error (13);
var v = J.script.SV.selectItemVar (this.xStack[this.xPt]);
this.xStack[this.xPt--] = null;
return v;
});
$_M(c$, "evaluateFunction", 
($fz = function (tok) {
var op = this.oStack[this.oPt--];
if (tok == 0) tok = (op.tok == 269484241 ? op.intValue & -481 : op.tok);
var nParamMax = J.script.T.getMaxMathParams (tok);
var nParam = 0;
var pt = this.xPt;
while (pt >= 0 && this.xStack[pt--].value !== op) nParam++;

if (nParamMax > 0 && nParam > nParamMax) return false;
var args =  new Array (nParam);
for (var i = nParam; --i >= 0; ) args[i] = this.getX ();

this.xPt--;
return (!this.chk ? this.eval.getExtension ().evaluate (this, op, args, tok) : op.tok == 269484241 ? true : this.addXBool (true));
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "operate", 
($fz = function () {
var op = this.oStack[this.oPt--];
var pt;
var m;
var s;
if (this.logMessages) {
this.dumpStacks ("operate: " + op);
}if (this.isArrayItem && this.squareCount == 0 && this.equalCount == 1 && this.oPt < 0 && (op.tok == 269484436)) {
return true;
}var x2 = this.getX ();
if (x2 === J.script.T.tokenArraySelector) return false;
if (op.tok == 269484225 || op.tok == 269484226) {
if (!this.chk && !x2.increment (this.incrementX)) return false;
this.wasX = true;
this.putX (x2);
return true;
}if (op.tok == 269484144) {
if (this.chk) return this.addXBool (true);
switch (x2.tok) {
case 9:
return this.addXPt4 ((J.util.Quaternion.newP4 (x2.value)).inv ().toPoint4f ());
case 11:
m = JU.M3.newM (x2.value);
m.invert ();
return this.addXM3 (m);
case 12:
var m4 = JU.M4.newM (x2.value);
m4.invert ();
return this.addXM4 (m4);
case 10:
return this.addXBs (J.util.BSUtil.copyInvert (J.script.SV.bsSelectVar (x2), (Clazz.instanceOf (x2.value, J.modelset.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
default:
return this.addXBool (!x2.asBoolean ());
}
}var iv = op.intValue & -481;
if (op.tok == 269484241) {
switch (iv) {
case 1073741824:
return this.getAllProperties (x2, op.value);
case 1141899267:
case 1276117012:
case 1141899270:
if (iv == 1141899267 && Clazz.instanceOf (x2.value, J.modelset.BondSet)) break;
return this.addXInt (J.script.SV.sizeOf (x2));
case 1141899272:
return this.addXStr (J.script.ScriptMathProcessor.typeOf (x2));
case 1141899281:
if (x2.tok != 6) return this.addXStr ("");
var keyset = (x2.value).keySet ();
var keys = keyset.toArray ( new Array (keyset.size ()));
java.util.Arrays.sort (keys);
return this.addXAS (keys);
case 1141899268:
switch (x2.tok) {
case 11:
case 12:
s = J.script.SV.sValue (x2);
s = JU.PT.simpleReplace (s.substring (1, s.length - 1), "],[", "]\n[");
break;
case 4:
s = x2.value;
break;
default:
s = J.script.SV.sValue (x2);
}
s = JU.PT.simpleReplace (s, "\n\r", "\n").$replace ('\r', '\n');
return this.addXAS (JU.PT.split (s, "\n"));
case 1766856708:
switch (x2.tok) {
case 4:
case 7:
s = J.script.SV.sValue (x2);
pt =  new JU.P3 ();
return this.addXPt (JU.CU.colorPtFromString (s, pt));
case 2:
case 3:
return this.addXPt (this.viewer.getColorPointForPropertyValue (J.script.SV.fValue (x2)));
case 8:
return this.addXStr (J.util.Escape.escapeColor (JU.CU.colorPtToFFRGB (x2.value)));
default:
}
break;
case 1679429641:
return (this.chk ? this.addXStr ("x") : this.getBoundBox (x2));
}
if (this.chk) return this.addXStr (J.script.SV.sValue (x2));
if (x2.tok == 4) {
var v = J.script.SV.unescapePointOrBitsetAsVariable (J.script.SV.sValue (x2));
if (!(Clazz.instanceOf (v, J.script.SV))) return false;
x2 = v;
}if (op.tok == x2.tok) x2 = this.getX ();
return this.getPointOrBitsetOperation (op, x2);
}var x1 = this.getX ();
if (this.chk) {
if (op === J.script.T.tokenAndFALSE || op === J.script.T.tokenOrTRUE) this.chk = false;
return this.addXVar (J.script.SV.newT (x1));
}return this.binaryOp (op, x1, x2);
}, $fz.isPrivate = true, $fz));
$_M(c$, "binaryOp", 
function (op, x1, x2) {
var pt;
var pt4;
var m;
var s;
var f;
switch (op.tok) {
case 269484160:
case 269484128:
switch (x1.tok) {
case 10:
var bs = J.script.SV.bsSelectVar (x1);
switch (x2.tok) {
case 10:
bs = J.util.BSUtil.copy (bs);
bs.and (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
return (this.addXBool (x < 0 ? false : bs.get (x)));
}
break;
}
return this.addXBool (x1.asBoolean () && x2.asBoolean ());
case 269484112:
switch (x1.tok) {
case 10:
var bs = J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1));
switch (x2.tok) {
case 10:
bs.or (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
if (x < 0) break;
bs.set (x);
return this.addXBs (bs);
case 7:
var sv = x2.value;
for (var i = sv.size (); --i >= 0; ) {
var b = sv.get (i).asInt ();
if (b >= 0) bs.set (b);
}
return this.addXBs (bs);
}
break;
case 7:
return this.addXVar (J.script.SV.concatList (x1, x2, false));
}
return this.addXBool (x1.asBoolean () || x2.asBoolean ());
case 269484113:
if (x1.tok == 10 && x2.tok == 10) {
var bs = J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1));
bs.xor (J.script.SV.bsSelectVar (x2));
return this.addXBs (bs);
}var a = x1.asBoolean ();
var b = x2.asBoolean ();
return this.addXBool (a && !b || b && !a);
case 269484114:
if (x1.tok != 10 || x2.tok != 10) return false;
return this.addXBs (J.util.BSUtil.toggleInPlace (J.util.BSUtil.copy (J.script.SV.bsSelectVar (x1)), J.script.SV.bsSelectVar (x2)));
case 269484434:
return this.addXBool (x1.asFloat () <= x2.asFloat ());
case 269484433:
return this.addXBool (x1.asFloat () >= x2.asFloat ());
case 269484432:
return this.addXBool (x1.asFloat () > x2.asFloat ());
case 269484435:
return this.addXBool (x1.asFloat () < x2.asFloat ());
case 269484436:
return this.addXBool (J.script.SV.areEqual (x1, x2));
case 269484438:
return this.addXBool (!J.script.SV.areEqual (x1, x2));
case 269484193:
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 7:
return this.addXVar (J.script.SV.concatList (x1, x2, true));
case 2:
switch (x2.tok) {
case 4:
if ((s = J.script.SV.sValue (x2).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue + x2.asInt ());
break;
case 3:
return this.addXFloat (x1.intValue + x2.asFloat ());
}
return this.addXInt (x1.intValue + x2.asInt ());
case 4:
return this.addXVar (J.script.SV.newS (J.script.SV.sValue (x1) + J.script.SV.sValue (x2)));
case 9:
var q1 = J.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (x2.asFloat ()).toPoint4f ());
case 9:
return this.addXPt4 (q1.mulQ (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
pt.add (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.add (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x + f, pt.y + f, pt.z + f));
}
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 11:
m = JU.M3.newM (x1.value);
m.add (x2.value);
return this.addXM3 (m);
case 8:
return this.addXM4 (J.script.ScriptMathProcessor.getMatrix4f (x1.value, x2.value));
}
}
case 269484192:
if (x1.tok == 2) {
if (x2.tok == 4) {
if ((s = (J.script.SV.sValue (x2)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue - x2.asInt ());
} else if (x2.tok != 3) return this.addXInt (x1.intValue - x2.asInt ());
}if (x1.tok == 4 && x2.tok == 2) {
if ((s = (J.script.SV.sValue (x1)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.asInt () - x2.intValue);
}switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 6:
var ht =  new java.util.Hashtable (x1.value);
ht.remove (J.script.SV.sValue (x2));
return this.addXVar (J.script.SV.getVariableMap (ht));
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 11:
m = JU.M3.newM (x1.value);
m.sub (x2.value);
return this.addXM3 (m);
}
case 12:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 12:
var m4 = JU.M4.newM (x1.value);
m4.sub (x2.value);
return this.addXM4 (m4);
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x - f, pt.y - f, pt.z - f));
case 8:
pt.sub (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.sub (JU.P3.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
}
case 9:
var q1 = J.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (-x2.asFloat ()).toPoint4f ());
case 9:
var q2 = J.util.Quaternion.newP4 (x2.value);
return this.addXPt4 (q2.mulQ (q1.inv ()).toPoint4f ());
}
}
case 269484224:
switch (x2.tok) {
default:
return this.addXFloat (-x2.asFloat ());
case 2:
return this.addXInt (-x2.asInt ());
case 8:
pt = JU.P3.newP (x2.value);
pt.scale (-1.0);
return this.addXPt (pt);
case 9:
pt4 = JU.P4.newPt (x2.value);
pt4.scale (-1.0);
return this.addXPt4 (pt4);
case 11:
m = JU.M3.newM (x2.value);
m.transpose ();
return this.addXM3 (m);
case 12:
var m4 = JU.M4.newM (x2.value);
m4.transpose ();
return this.addXM4 (m4);
case 10:
return this.addXBs (J.util.BSUtil.copyInvert (J.script.SV.bsSelectVar (x2), (Clazz.instanceOf (x2.value, J.modelset.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
}
case 1276117508:
if (x1.tok == 8 && x2.tok == 8) {
pt = x1.value;
var pt2 = x2.value;
return this.addXPt (JU.P3.new3 (pt.x * pt2.x, pt.y * pt2.y, pt.z * pt2.z));
}case 269484209:
if (x1.tok == 2 && x2.tok != 3) return this.addXInt (x1.intValue * x2.asInt ());
pt = (x1.tok == 11 ? this.ptValue (x2, false) : x2.tok == 11 ? this.ptValue (x1, false) : null);
pt4 = (x1.tok == 12 ? this.planeValue (x2) : x2.tok == 12 ? this.planeValue (x1) : null);
switch (x2.tok) {
case 11:
if (pt != null) {
var m3b = JU.M3.newM (x2.value);
m3b.transpose ();
m3b.transform (pt);
if (x1.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
return this.addXPt4 ((J.util.Quaternion.newP4 (pt4).mulQ (J.util.Quaternion.newM (x2.value))).toPoint4f ());
}break;
case 12:
if (pt4 != null) {
var m4b = JU.M4.newM (x2.value);
m4b.transpose ();
m4b.transform4 (pt4);
if (x1.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}break;
}
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () * x2.asFloat ());
case 11:
var m3 = x1.value;
if (pt != null) {
m3.transform (pt);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}switch (x2.tok) {
case 11:
m = JU.M3.newM (x2.value);
m.mul2 (m3, m);
return this.addXM3 (m);
case 9:
return this.addXM3 (J.util.Quaternion.newM (m3).mulQ (J.util.Quaternion.newP4 (x2.value)).getMatrix ());
default:
f = x2.asFloat ();
var aa =  new JU.A4 ();
aa.setM (m3);
aa.angle *= f;
var m2 =  new JU.M3 ();
m2.setAA (aa);
return this.addXM3 (m2);
}
case 12:
var m4 = x1.value;
if (pt != null) {
m4.transform (pt);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
m4.transform4 (pt4);
if (x2.tok == 7) return this.addXVar (J.script.SV.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}switch (x2.tok) {
case 12:
var m4b = JU.M4.newM (x2.value);
m4b.mul2 (m4, m4b);
return this.addXM4 (m4b);
default:
return this.addXStr ("NaN");
}
case 8:
pt = JU.P3.newP (x1.value);
switch (x2.tok) {
case 8:
var pt2 = (x2.value);
return this.addXFloat (pt.x * pt2.x + pt.y * pt2.y + pt.z * pt2.z);
default:
f = x2.asFloat ();
return this.addXPt (JU.P3.new3 (pt.x * f, pt.y * f, pt.z * f));
}
case 9:
switch (x2.tok) {
case 9:
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mulQ (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (x2.asFloat ()).toPoint4f ());
}
case 269484210:
s = null;
var n = x2.asInt ();
switch (x1.tok) {
case 1048589:
case 1048588:
case 2:
default:
if (n == 0) return this.addXInt (0);
return this.addXInt (x1.asInt () % n);
case 3:
f = x1.asFloat ();
if (n == 0) return this.addXInt (Math.round (f));
s = JU.DF.formatDecimal (f, n);
return this.addXStr (s);
case 4:
s = x1.value;
if (n == 0) return this.addXStr (JU.PT.trim (s, "\n\t "));
if (n == 9999) return this.addXStr (s.toUpperCase ());
if (n == -9999) return this.addXStr (s.toLowerCase ());
if (n > 0) return this.addXStr (JU.PT.formatS (s, n, n, false, false));
return this.addXStr (JU.PT.formatS (s, n, n - 1, true, false));
case 7:
var list = J.script.SV.listValue (x1);
for (var i = 0; i < list.length; i++) {
if (n == 0) list[i] = list[i].trim ();
 else if (n > 0) list[i] = JU.PT.formatS (list[i], n, n, true, false);
 else list[i] = JU.PT.formatS (s, -n, n, false, false);
}
return this.addXAS (list);
case 8:
pt = JU.P3.newP (x1.value);
this.viewer.toUnitCell (pt, JU.P3.new3 (n, n, n));
return this.addXPt (pt);
case 9:
pt4 = x1.value;
if (x2.tok == 8) return this.addXPt ((J.util.Quaternion.newP4 (pt4)).transformPt (x2.value));
if (x2.tok == 9) {
var v4 = JU.P4.newPt (x2.value);
(J.util.Quaternion.newP4 (pt4)).getThetaDirected (v4);
return this.addXPt4 (v4);
}if (n == 0 && x2.tok == 4) {
s = " " + x2.value.toString ().trim ().toLowerCase () + ":";
var i = " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".indexOf (s);
n = (i >= 0 ? JU.PT.parseInt (" w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9".substring (i + s.length)) : -99);
}switch (n) {
case 0:
return this.addXFloat (pt4.w);
case 1:
return this.addXFloat (pt4.x);
case 2:
return this.addXFloat (pt4.y);
case 3:
return this.addXFloat (pt4.z);
}
var q = J.util.Quaternion.newP4 (pt4);
switch (n) {
case 4:
return this.addXPt (JU.P3.newP (q.getNormal ()));
case 5:
return this.addXAF (q.getEulerZXZ ());
case 6:
return this.addXAF (q.getEulerZYZ ());
case -1:
return this.addXPt (JU.P3.newP (q.getVector (-1)));
case -2:
return this.addXFloat (q.getTheta ());
case -3:
return this.addXPt (JU.P3.newP (q.getVector (0)));
case -4:
return this.addXPt (JU.P3.newP (q.getVector (1)));
case -5:
return this.addXPt (JU.P3.newP (q.getVector (2)));
case -6:
var ax = q.toAxisAngle4f ();
return this.addXPt4 (JU.P4.new4 (ax.x, ax.y, ax.z, (ax.angle * 180 / 3.141592653589793)));
case -9:
return this.addXM3 (q.getMatrix ());
default:
return this.addXStr ("NaN");
}
case 12:
var m4 = x1.value;
switch (n) {
case 1:
var m3 =  new JU.M3 ();
m4.getRotationScale (m3);
return this.addXM3 (m3);
case 2:
var v3 =  new JU.V3 ();
m4.get (v3);
return this.addXPt (JU.P3.newP (v3));
default:
return false;
}
case 10:
return this.addXBs (J.script.SV.bsSelectRange (x1, n));
}
case 269484208:
if (x1.tok == 2 && x2.tok == 2 && x2.intValue != 0) return this.addXInt (Clazz.doubleToInt (x1.intValue / x2.intValue));
var f2 = x2.asFloat ();
switch (x1.tok) {
default:
var f1 = x1.asFloat ();
return this.addXFloat (f1 / f2);
case 8:
pt = JU.P3.newP (x1.value);
if (f2 == 0) return this.addXPt (JU.P3.new3 (NaN, NaN, NaN));
return this.addXPt (JU.P3.new3 (pt.x / f2, pt.y / f2, pt.z / f2));
case 9:
if (x2.tok == 9) return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).div (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
if (f2 == 0) return this.addXPt4 (JU.P4.new4 (NaN, NaN, NaN, NaN));
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (1 / f2).toPoint4f ());
}
case 269484211:
f = x2.asFloat ();
switch (x1.tok) {
default:
return this.addXInt (f == 0 ? 0 : Clazz.doubleToInt (Math.floor (x1.asFloat () / x2.asFloat ())));
case 9:
if (f == 0) return this.addXPt4 (JU.P4.new4 (NaN, NaN, NaN, NaN));
if (x2.tok == 9) return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).divLeft (J.util.Quaternion.newP4 (x2.value)).toPoint4f ());
return this.addXPt4 (J.util.Quaternion.newP4 (x1.value).mul (1 / f).toPoint4f ());
}
case 269484227:
f = Math.pow (x1.asFloat (), x2.asFloat ());
return (x1.tok == 2 && x2.tok == 2 ? this.addXInt (Clazz.floatToInt (f)) : this.addXFloat (f));
}
return true;
}, "J.script.T,J.script.SV,J.script.SV");
$_M(c$, "ptValue", 
function (x, allowFloat) {
var pt;
if (this.chk) return  new JU.P3 ();
switch (x.tok) {
case 8:
return x.value;
case 10:
return this.eval.getBitsetProperty (J.script.SV.bsSelectVar (x), 1146095626, null, null, x.value, null, false, 2147483647, false);
case 4:
pt = J.util.Escape.uP (J.script.SV.sValue (x));
if (Clazz.instanceOf (pt, JU.P3)) return pt;
break;
case 7:
pt = J.util.Escape.uP ("{" + J.script.SV.sValue (x) + "}");
if (Clazz.instanceOf (pt, JU.P3)) return pt;
break;
}
if (!allowFloat) return null;
var f = J.script.SV.fValue (x);
return JU.P3.new3 (f, f, f);
}, "J.script.SV,~B");
$_M(c$, "planeValue", 
function (x) {
if (this.chk) return  new JU.P4 ();
switch (x.tok) {
case 9:
return x.value;
case 7:
case 4:
var pt = J.util.Escape.uP (J.script.SV.sValue (x));
return (Clazz.instanceOf (pt, JU.P4) ? pt : null);
case 10:
break;
}
return null;
}, "J.script.T");
c$.typeOf = $_M(c$, "typeOf", 
($fz = function (x) {
var tok = (x == null ? 0 : x.tok);
switch (tok) {
case 1048589:
case 1048588:
return "boolean";
case 10:
return (Clazz.instanceOf (x.value, J.modelset.BondSet) ? "bondset" : "bitset");
case 2:
case 3:
case 8:
case 9:
case 4:
case 7:
case 6:
case 11:
case 12:
return J.script.T.astrType[tok];
}
return "?";
}, $fz.isPrivate = true, $fz), "J.script.SV");
$_M(c$, "getAllProperties", 
($fz = function (x2, abbr) {
if (x2.tok != 10) return false;
if (this.chk) return this.addXStr ("");
var bs = J.script.SV.bsSelectVar (x2);
var tokens;
var n = bs.cardinality ();
if (n == 0 || (tokens = J.script.T.getAtomPropertiesLike (abbr.substring (0, abbr.length - 1))) == null) return this.addXStr ("");
var ht =  new java.util.Hashtable ();
var index = (n == 1 ? bs.nextSetBit (0) : 2147483647);
for (var i = tokens.size (); --i >= 0; ) {
var t = tokens.get (i);
var tok = t.tok;
switch (tok) {
case 1095766024:
case 1095761925:
continue;
default:
if (index == 2147483647) tok |= 480;
ht.put (t.value, J.script.SV.getVariable (this.eval.getBitsetProperty (bs, tok, null, null, null, null, false, index, true)));
}
}
return this.addXMap (ht);
}, $fz.isPrivate = true, $fz), "J.script.SV,~S");
c$.getMatrix4f = $_M(c$, "getMatrix4f", 
function (matRotate, vTranslate) {
return JU.M4.newMV (matRotate, vTranslate == null ?  new JU.V3 () : JU.V3.newV (vTranslate));
}, "JU.M3,JU.T3");
$_M(c$, "getBoundBox", 
($fz = function (x2) {
if (x2.tok != 10) return false;
if (this.chk) return this.addXStr ("");
var b = this.viewer.getBoxInfo (J.script.SV.bsSelectVar (x2), 1);
var pts = b.getBoundBoxPoints (true);
var list =  new JU.List ();
for (var i = 0; i < 4; i++) list.addLast (pts[i]);

return this.addXList (list);
}, $fz.isPrivate = true, $fz), "J.script.SV");
$_M(c$, "getPointOrBitsetOperation", 
($fz = function (op, x2) {
switch (x2.tok) {
case 7:
switch (op.intValue) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
return this.addXObj (this.eval.getExtension ().getMinMax (x2.getList (), op.intValue));
case 1276117011:
case 1141899269:
return this.addXVar (x2.sortOrReverse (op.intValue == 1141899269 ? -2147483648 : 1));
}
var list2 =  new Array (x2.getList ().size ());
for (var i = 0; i < list2.length; i++) {
var v = J.script.SV.unescapePointOrBitsetAsVariable (x2.getList ().get (i));
if (!(Clazz.instanceOf (v, J.script.SV)) || !this.getPointOrBitsetOperation (op, v)) return false;
list2[i] = this.xStack[this.xPt--];
}
return this.addXAV (list2);
case 8:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1146095626:
var pt = JU.P3.newP (x2.value);
this.viewer.toCartesian (pt, true);
return this.addXPt (pt);
case 1112541188:
case 1112541189:
case 1112541190:
case 1146095627:
var ptf = JU.P3.newP (x2.value);
this.viewer.toFractional (ptf, true);
return (op.intValue == 1146095627 ? this.addXPt (ptf) : this.addXFloat (op.intValue == 1112541188 ? ptf.x : op.intValue == 1112541189 ? ptf.y : ptf.z));
case 1112541191:
case 1112541192:
case 1112541193:
case 1146095629:
var ptfu = JU.P3.newP (x2.value);
this.viewer.toFractional (ptfu, false);
return (op.intValue == 1146095627 ? this.addXPt (ptfu) : this.addXFloat (op.intValue == 1112541191 ? ptfu.x : op.intValue == 1112541192 ? ptfu.y : ptfu.z));
case 1112539153:
case 1112539154:
case 1112539155:
case 1146093582:
var ptu = JU.P3.newP (x2.value);
this.viewer.toUnitCell (ptu, null);
this.viewer.toFractional (ptu, false);
return (op.intValue == 1146093582 ? this.addXPt (ptu) : this.addXFloat (op.intValue == 1112539153 ? ptu.x : op.intValue == 1112539154 ? ptu.y : ptu.z));
}
break;
case 9:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1141899280:
return this.addXFloat ((x2.value).w);
}
break;
case 10:
if (op.intValue == 1678770178 && Clazz.instanceOf (x2.value, J.modelset.BondSet)) return this.addXVar (x2);
var bs = J.script.SV.bsSelectVar (x2);
if (bs.cardinality () == 1 && (op.intValue & 480) == 0) op.intValue |= 32;
var val = this.eval.getBitsetProperty (bs, op.intValue, null, null, x2.value, op.value, false, x2.index, true);
if (op.intValue != 1678770178) return this.addXObj (val);
return this.addXVar (J.script.SV.newV (10,  new J.modelset.BondSet (val, this.viewer.getAtomIndices (bs))));
}
return false;
}, $fz.isPrivate = true, $fz), "J.script.T,J.script.SV");
$_M(c$, "evalOp", 
function (token) {
if (!this.addOp (token) || !this.operate ()) return null;
return this.xStack[this.xPt--];
}, "J.script.T");
Clazz.defineStatics (c$,
"qMods", " w:0 x:1 y:2 z:3 normal:4 eulerzxz:5 eulerzyz:6 vector:-1 theta:-2 axisx:-3 axisy:-4 axisz:-5 axisangle:-6 matrix:-9");
});
