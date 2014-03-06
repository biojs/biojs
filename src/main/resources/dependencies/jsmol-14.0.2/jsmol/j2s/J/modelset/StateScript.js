Clazz.declarePackage ("J.modelset");
Clazz.load (null, "J.modelset.StateScript", ["JU.SB", "J.util.BSUtil", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.bsBonds = null;
this.bsAtoms1 = null;
this.bsAtoms2 = null;
this.script1 = null;
this.script2 = null;
this.inDefinedStateBlock = false;
Clazz.instantialize (this, arguments);
}, J.modelset, "StateScript");
Clazz.makeConstructor (c$, 
function (modelIndex, script1, bsBonds, bsAtoms1, bsAtoms2, script2, inDefinedStateBlock) {
this.modelIndex = modelIndex;
this.script1 = script1;
this.bsBonds = J.util.BSUtil.copy (bsBonds);
this.bsAtoms1 = J.util.BSUtil.copy (bsAtoms1);
this.bsAtoms2 = J.util.BSUtil.copy (bsAtoms2);
this.script2 = script2;
this.inDefinedStateBlock = inDefinedStateBlock;
}, "~N,~S,JU.BS,JU.BS,JU.BS,~S,~B");
$_M(c$, "isValid", 
function () {
return this.script1 != null && this.script1.length > 0 && (this.bsBonds == null || this.bsBonds.nextSetBit (0) >= 0) && (this.bsAtoms1 == null || this.bsAtoms1.nextSetBit (0) >= 0) && (this.bsAtoms2 == null || this.bsAtoms2.nextSetBit (0) >= 0);
});
$_V(c$, "toString", 
function () {
if (!this.isValid ()) return "";
var sb = JU.SB.newS (this.script1);
if (this.bsBonds != null) sb.append (" ").append (J.util.Escape.eBond (this.bsBonds));
if (this.bsAtoms1 != null) sb.append (" ").append (J.util.Escape.eBS (this.bsAtoms1));
if (this.bsAtoms2 != null) sb.append (" ").append (J.util.Escape.eBS (this.bsAtoms2));
if (this.script2 != null) sb.append (" ").append (this.script2);
var s = sb.toString ();
if (!s.endsWith (";")) s += ";";
return s;
});
$_M(c$, "isConnect", 
function () {
return (this.script1.indexOf ("connect") >= 0);
});
$_M(c$, "deleteAtoms", 
function (modelIndex, bsBonds, bsAtoms) {
if (modelIndex == this.modelIndex) return false;
if (modelIndex > this.modelIndex) {
return true;
}J.util.BSUtil.deleteBits (this.bsBonds, bsBonds);
J.util.BSUtil.deleteBits (this.bsAtoms1, bsAtoms);
J.util.BSUtil.deleteBits (this.bsAtoms2, bsAtoms);
return this.isValid ();
}, "~N,JU.BS,JU.BS");
$_M(c$, "setModelIndex", 
function (index) {
this.modelIndex = index;
}, "~N");
});
