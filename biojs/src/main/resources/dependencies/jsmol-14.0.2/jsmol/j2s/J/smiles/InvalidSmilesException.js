Clazz.declarePackage ("J.smiles");
Clazz.load (["java.lang.Exception"], "J.smiles.InvalidSmilesException", null, function () {
c$ = Clazz.declareType (J.smiles, "InvalidSmilesException", Exception);
c$.getLastError = $_M(c$, "getLastError", 
function () {
return J.smiles.InvalidSmilesException.lastError;
});
c$.setLastError = $_M(c$, "setLastError", 
function (message) {
J.smiles.InvalidSmilesException.lastError = message;
}, "~S");
Clazz.makeConstructor (c$, 
function (message) {
Clazz.superConstructor (this, J.smiles.InvalidSmilesException, [message]);
J.smiles.InvalidSmilesException.lastError = message;
}, "~S");
Clazz.makeConstructor (c$, 
function (cause) {
Clazz.superConstructor (this, J.smiles.InvalidSmilesException, [cause]);
J.smiles.InvalidSmilesException.lastError = cause.toString ();
}, "Throwable");
Clazz.makeConstructor (c$, 
function (message, cause) {
Clazz.superConstructor (this, J.smiles.InvalidSmilesException, [message, cause]);
J.smiles.InvalidSmilesException.lastError = message + "\n" + cause.getCause ();
}, "~S,Throwable");
Clazz.defineStatics (c$,
"lastError", null);
});
