Clazz.declarePackage ("JSV.common");
c$ = Clazz.decorateAsClass (function () {
this.isub = 0;
this.title = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "SubSpecChangeEvent");
Clazz.makeConstructor (c$, 
function (isub, title) {
this.isub = isub;
this.title = title;
}, "~N,~S");
$_M(c$, "isValid", 
function () {
return (this.title != null);
});
$_M(c$, "getSubIndex", 
function () {
return this.isub;
});
$_V(c$, "toString", 
function () {
return this.title;
});
