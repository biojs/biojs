Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.source.XMLReader"], "JSV.source.AnIMLReader", ["java.lang.Double", "JU.BC", "$.Base64", "JSV.source.JDXSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inResult = false;
Clazz.instantialize (this, arguments);
}, JSV.source, "AnIMLReader", JSV.source.XMLReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.source.AnIMLReader, []);
});
$_V(c$, "getXML", 
function (br) {
try {
this.source =  new JSV.source.JDXSource (0, this.filePath);
this.getSimpleXmlReader (br);
this.reader.nextEvent ();
this.processXML (0, 3);
if (!this.checkPointCount ()) return null;
this.xFactor = 1;
this.yFactor = 1;
this.populateVariables ();
} catch (pe) {
if (Clazz.exceptionOf (pe, Exception)) {
System.err.println ("That file may be empty...");
this.errorLog.append ("That file may be empty... \n");
} else {
throw pe;
}
}
this.processErrors ("anIML");
try {
br.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
return this.source;
}, "java.io.BufferedReader");
$_V(c$, "processTag", 
function (tagId) {
switch (tagId) {
case 0:
this.processAuditTrail ();
return true;
case 1:
this.processExperimentStepSet ();
return true;
case 2:
this.processSampleSet ();
return true;
case 11:
this.processAuthor ();
return true;
case 3:
this.inResult = true;
return true;
default:
System.out.println ("AnIMLSource not processing tag " + JSV.source.XMLReader.tagNames[tagId] + "!");
return false;
}
}, "~N");
$_V(c$, "processEndTag", 
function (tagId) {
switch (tagId) {
case 3:
case 1:
this.inResult = false;
break;
}
}, "~N");
$_M(c$, "processAuditTrail", 
($fz = function () {
if (this.tagName.equals ("user")) {
this.reader.qualifiedValue ();
} else if (this.tagName.equals ("timestamp")) {
this.reader.qualifiedValue ();
}}, $fz.isPrivate = true, $fz));
$_M(c$, "processSampleSet", 
($fz = function () {
if (this.tagName.equals ("sample")) this.samplenum++;
 else if (this.tagName.equals ("parameter")) {
this.attrList = this.reader.getAttrValueLC ("name");
if (this.attrList.equals ("name")) {
this.reader.qualifiedValue ();
} else if (this.attrList.equals ("owner")) {
this.reader.qualifiedValue ();
} else if (this.attrList.equals ("molecular formula")) {
this.molForm = this.reader.qualifiedValue ();
} else if (this.attrList.equals ("cas registry number")) {
this.casRN = this.reader.qualifiedValue ();
}}}, $fz.isPrivate = true, $fz));
$_M(c$, "processExperimentStepSet", 
($fz = function () {
System.out.println ("AnIML experiment " + this.tagName);
if (this.tagName.equals ("result")) {
this.inResult = true;
} else if (this.tagName.equals ("sampleref")) {
if (this.reader.getAttrValueLC ("role").contains ("samplemeasurement")) this.sampleID = this.reader.getAttrValue ("sampleID");
} else if (this.tagName.equals ("author")) {
this.process (11, true);
} else if (this.tagName.equals ("timestamp")) {
this.LongDate = this.reader.thisValue ();
} else if (this.tagName.equals ("technique")) {
this.techname = this.reader.getAttrValue ("name").toUpperCase () + " SPECTRUM";
} else if (this.tagName.equals ("vectorset") || this.tagName.equals ("seriesset") && this.inResult) {
this.npoints = Integer.parseInt (this.reader.getAttrValue ("length"));
System.out.println ("AnIML No. of points= " + this.npoints);
this.xaxisData =  Clazz.newDoubleArray (this.npoints, 0);
this.yaxisData =  Clazz.newDoubleArray (this.npoints, 0);
} else if (this.tagName.equals ("vector") || this.tagName.equals ("series") && this.inResult) {
var axisLabel = this.reader.getAttrValue ("name");
var dependency = this.reader.getAttrValueLC ("dependency");
if (dependency.equals ("independent")) {
this.xUnits = axisLabel;
this.getXValues ();
} else if (dependency.equals ("dependent")) {
this.yUnits = axisLabel;
this.getYValues ();
}} else if (this.tagName.equals ("parameter")) {
if ((this.attrList = this.reader.getAttrValueLC ("name")).equals ("identifier")) {
this.title = this.reader.qualifiedValue ();
} else if (this.attrList.equals ("nucleus")) {
this.obNucleus = this.reader.qualifiedValue ();
} else if (this.attrList.equals ("observefrequency")) {
this.StrObFreq = this.reader.qualifiedValue ();
this.obFreq = Double.parseDouble (this.StrObFreq);
} else if (this.attrList.equals ("referencepoint")) {
this.refPoint = Double.parseDouble (this.reader.qualifiedValue ());
} else if (this.attrList.equals ("sample path length")) {
this.pathlength = this.reader.qualifiedValue ();
} else if (this.attrList.equals ("scanmode")) {
this.reader.thisValue ();
} else if (this.attrList.equals ("manufacturer")) {
this.vendor = this.reader.thisValue ();
} else if (this.attrList.equals ("model name")) {
this.modelType = this.reader.thisValue ();
} else if (this.attrList.equals ("resolution")) {
this.resolution = this.reader.qualifiedValue ();
}}}, $fz.isPrivate = true, $fz));
$_M(c$, "getXValues", 
($fz = function () {
this.reader.nextTag ();
if (this.reader.getTagName ().equals ("autoincrementedvalueset")) {
this.reader.nextTag ();
if (this.reader.getTagName ().equals ("startvalue")) this.firstX = Double.parseDouble (this.reader.qualifiedValue ());
this.nextStartTag ();
if (this.reader.getTagName ().equals ("increment")) this.deltaX = Double.parseDouble (this.reader.qualifiedValue ());
}if (!this.inResult) {
this.nextStartTag ();
this.xUnits = this.reader.getAttrValue ("label");
}this.increasing = (this.deltaX > 0 ? true : false);
this.continuous = true;
for (var j = 0; j < this.npoints; j++) this.xaxisData[j] = this.firstX + (this.deltaX * j);

this.lastX = this.xaxisData[this.npoints - 1];
}, $fz.isPrivate = true, $fz));
$_M(c$, "nextStartTag", 
($fz = function () {
this.reader.nextStartTag ();
while (this.reader.getTagType () == 6) {
this.reader.nextStartTag ();
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "getYValues", 
($fz = function () {
var bc =  new JU.BC ();
var vectorType = this.reader.getAttrValueLC ("type");
if (vectorType.length == 0) vectorType = this.reader.getAttrValueLC ("vectorType");
this.reader.nextTag ();
this.tagName = this.reader.getTagName ();
if (this.tagName.equals ("individualvalueset")) {
for (var ii = 0; ii < this.npoints; ii++) this.yaxisData[ii] = Double.parseDouble (this.reader.qualifiedValue ());

System.out.println (this.npoints + " individual Y values now read");
} else if (this.tagName.equals ("encodedvalueset")) {
this.attrList = this.reader.getCharacters ();
var dataArray = JU.Base64.decodeBase64 (this.attrList);
if (dataArray.length != 0) {
if (vectorType.equals ("float64")) {
for (var i = 0, pt = 0; i < this.npoints; i++, pt += 8) this.yaxisData[i] = bc.bytesToDoubleToFloat (dataArray, pt, false);

} else {
for (var i = 0, pt = 0; i < this.npoints; i++, pt += 4) this.yaxisData[i] = bc.bytesToFloat (dataArray, pt, false);

}}}this.reader.nextStartTag ();
this.tagName = this.reader.getTagName ();
this.yUnits = this.reader.getAttrValue ("label");
this.firstY = this.yaxisData[0];
}, $fz.isPrivate = true, $fz));
$_M(c$, "processAuthor", 
($fz = function () {
if (this.tagName.equals ("name")) this.owner = this.reader.thisValue ();
 else if (this.tagName.contains ("location")) this.origin = this.reader.thisValue ();
}, $fz.isPrivate = true, $fz));
});
