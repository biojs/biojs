Clazz.declarePackage ("JSV.source");
Clazz.load (["JU.List"], "JSV.source.JDXHeader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.title = "";
this.jcampdx = "5.01";
this.dataType = "";
this.dataClass = "";
this.origin = "";
this.owner = "PUBLIC DOMAIN";
this.longDate = "";
this.date = "";
this.time = "";
this.qualifiedType = null;
this.headerTable = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXHeader");
Clazz.prepareFields (c$, function () {
this.headerTable =  new JU.List ();
});
$_M(c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
$_M(c$, "setJcampdx", 
function (versionNum) {
this.jcampdx = versionNum;
}, "~S");
$_M(c$, "setDataType", 
function (dataType) {
this.dataType = dataType;
}, "~S");
$_M(c$, "setDataClass", 
function (dataClass) {
this.dataClass = dataClass;
}, "~S");
$_M(c$, "setOrigin", 
function (origin) {
this.origin = origin;
}, "~S");
$_M(c$, "setOwner", 
function (owner) {
this.owner = owner;
}, "~S");
$_M(c$, "setLongDate", 
function (longDate) {
this.longDate = longDate;
}, "~S");
$_M(c$, "setDate", 
function (date) {
this.date = date;
}, "~S");
$_M(c$, "setTime", 
function (time) {
this.time = time;
}, "~S");
$_M(c$, "getTitle", 
function () {
return this.title;
});
c$.getTypeName = $_M(c$, "getTypeName", 
function (type) {
type = type.toUpperCase ();
for (var i = 0; i < JSV.source.JDXHeader.typeNames.length; i++) if (JSV.source.JDXHeader.typeNames[i].startsWith (type)) {
return JSV.source.JDXHeader.typeNames[i].substring (18);
}
return type;
}, "~S");
$_M(c$, "getQualifiedDataType", 
function () {
return (this.qualifiedType == null ? (this.qualifiedType = JSV.source.JDXHeader.getTypeName (this.dataType)) : this.qualifiedType);
});
$_M(c$, "getJcampdx", 
function () {
return this.jcampdx;
});
$_M(c$, "getDataType", 
function () {
return this.dataType;
});
$_M(c$, "getOrigin", 
function () {
return this.origin;
});
$_M(c$, "getOwner", 
function () {
return this.owner;
});
$_M(c$, "getLongDate", 
function () {
return this.longDate;
});
$_M(c$, "getDate", 
function () {
return this.date;
});
$_M(c$, "getTime", 
function () {
return this.time;
});
$_M(c$, "getDataClass", 
function () {
return this.dataClass;
});
$_M(c$, "setHeaderTable", 
function (table) {
this.headerTable = table;
}, "JU.List");
$_M(c$, "getHeaderTable", 
function () {
return this.headerTable;
});
$_M(c$, "getHeaderRowDataAsArray", 
function (addDataClass, nMore) {
var rowData =  new Array ((addDataClass ? 6 : 5) + this.headerTable.size () + nMore);
var i = 0;
rowData[i++] = ["##TITLE", this.title];
rowData[i++] = ["##JCAMP-DX", this.jcampdx];
rowData[i++] = ["##DATA TYPE", this.dataType];
if (addDataClass) rowData[i++] = ["##DATA CLASS", this.dataClass];
rowData[i++] = ["##ORIGIN", this.origin];
rowData[i++] = ["##OWNER", this.owner];
for (var j = 0; j < this.headerTable.size (); j++) rowData[i++] = this.headerTable.get (j);

return rowData;
}, "~B,~N");
Clazz.defineStatics (c$,
"typeNames", ["ND NMR SPECTRUM   NMR", "NMR SPECTRUM      NMR", "INFRARED SPECTRUM IR", "MASS SPECTRUM     MS", "RAMAN SPECTRUM    RAMAN", "GAS CHROMATOGRAM  GC", "UV/VIS SPECTRUM   UV/VIS"]);
});
