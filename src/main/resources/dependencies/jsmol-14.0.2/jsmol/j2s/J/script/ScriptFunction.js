Clazz.declarePackage ("J.script");
Clazz.load (["J.api.JmolScriptFunction", "java.util.Hashtable", "JU.List"], "J.script.ScriptFunction", ["JU.AU", "$.SB", "J.script.SV", "$.T"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pt0 = 0;
this.chpt0 = 0;
this.cmdpt0 = -1;
this.typeName = null;
this.name = null;
this.nParameters = 0;
this.names = null;
this.tok = 0;
this.variables = null;
this.returnValue = null;
this.aatoken = null;
this.lineIndices = null;
this.lineNumbers = null;
this.script = null;
Clazz.instantialize (this, arguments);
}, J.script, "ScriptFunction", null, J.api.JmolScriptFunction);
Clazz.prepareFields (c$, function () {
this.names =  new JU.List ();
this.variables =  new java.util.Hashtable ();
});
$_M(c$, "isVariable", 
function (ident) {
return this.variables.containsKey (ident);
}, "~S");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (name, tok) {
this.set (name, tok);
this.typeName = J.script.T.nameOf (tok);
}, "~S,~N");
$_M(c$, "set", 
function (name, tok) {
this.name = name;
this.tok = tok;
}, "~S,~N");
$_M(c$, "setVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
for (var i = this.names.size (); --i >= 0; ) {
var name = this.names.get (i).toLowerCase ();
var $var = (i < this.nParameters && i < nParams ? params.get (i) : null);
if ($var != null && $var.tok != 7) $var = J.script.SV.newT ($var);
contextVariables.put (name, ($var == null ? J.script.SV.newS ("").setName (name) : $var));
}
contextVariables.put ("_retval", J.script.SV.newI (this.tok == 364558 ? 2147483647 : 0));
}, "java.util.Map,JU.List");
$_M(c$, "unsetVariables", 
function (contextVariables, params) {
var nParams = (params == null ? 0 : params.size ());
var nNames = this.names.size ();
if (nParams == 0 || nNames == 0) return;
for (var i = 0; i < nNames && i < nParams; i++) {
var global = params.get (i);
if (global.tok != 7) continue;
var local = contextVariables.get (this.names.get (i).toLowerCase ());
if (local.tok != 7) continue;
global.value = local.value;
}
}, "java.util.Map,JU.List");
$_M(c$, "addVariable", 
function (name, isParameter) {
this.variables.put (name, name);
this.names.addLast (name);
if (isParameter) this.nParameters++;
}, "~S,~B");
c$.setFunction = $_M(c$, "setFunction", 
function ($function, script, ichCurrentCommand, pt, lineNumbers, lineIndices, lltoken) {
var cmdpt0 = $function.cmdpt0;
var chpt0 = $function.chpt0;
var nCommands = pt - cmdpt0;
$function.setScript (script.substring (chpt0, ichCurrentCommand));
var aatoken = $function.aatoken =  new Array (nCommands);
$function.lineIndices = JU.AU.newInt2 (nCommands);
$function.lineNumbers =  Clazz.newShortArray (nCommands, 0);
var line0 = (lineNumbers[cmdpt0] - 1);
for (var i = 0; i < nCommands; i++) {
$function.lineNumbers[i] = (lineNumbers[cmdpt0 + i] - line0);
$function.lineIndices[i] = [lineIndices[cmdpt0 + i][0] - chpt0, lineIndices[cmdpt0 + i][1] - chpt0];
aatoken[i] = lltoken.get (cmdpt0 + i);
if (aatoken[i].length > 0) {
var tokenCommand = aatoken[i][0];
if (J.script.T.tokAttr (tokenCommand.tok, 102400)) tokenCommand.intValue -= (tokenCommand.intValue < 0 ? -cmdpt0 : cmdpt0);
}}
for (var i = pt; --i >= cmdpt0; ) {
lltoken.remove (i);
lineIndices[i][0] = lineIndices[i][1] = 0;
}
}, "J.script.ScriptFunction,~S,~N,~N,~A,~A,JU.List");
$_M(c$, "setScript", 
($fz = function (s) {
this.script = s;
if (this.script != null && this.script !== "" && !this.script.endsWith ("\n")) this.script += "\n";
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "toString", 
function () {
var s =  new JU.SB ().append ("/*\n * ").append (this.name).append ("\n */\n").append (this.getSignature ()).append ("{\n");
if (this.script != null) s.append (this.script);
s.append ("}\n");
return s.toString ();
});
$_V(c$, "getSignature", 
function () {
var s =  new JU.SB ().append (this.typeName).append (" ").append (this.name).append (" (");
for (var i = 0; i < this.nParameters; i++) {
if (i > 0) s.append (", ");
s.append (this.names.get (i));
}
s.append (")");
return s.toString ();
});
$_V(c$, "geTokens", 
function () {
return this.aatoken;
});
$_V(c$, "getName", 
function () {
return this.name;
});
$_V(c$, "getTok", 
function () {
return this.tok;
});
});
