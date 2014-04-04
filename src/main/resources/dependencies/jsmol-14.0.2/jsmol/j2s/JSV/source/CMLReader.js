Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.source.XMLReader"], "JSV.source.CMLReader", ["java.lang.Double", "java.util.Vector", "JU.PT", "JSV.source.JDXSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.specfound = false;
this.Ydelim = "";
this.peakData = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "CMLReader", JSV.source.XMLReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.source.CMLReader, []);
});
$_V(c$, "getXML", 
function (br) {
try {
this.source =  new JSV.source.JDXSource (0, this.filePath);
this.getSimpleXmlReader (br);
this.processXML (4, 10);
if (!this.checkPointCount ()) return null;
this.populateVariables ();
} catch (pe) {
if (Clazz.exceptionOf (pe, Exception)) {
System.err.println ("Error: " + pe);
pe.printStackTrace ();
} else {
throw pe;
}
}
this.processErrors ("CML");
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
case 4:
this.processSpectrum ();
return false;
case 9:
this.processSpectrumData ();
return true;
case 10:
this.processPeaks ();
return false;
case 8:
this.processSample ();
return true;
case 5:
this.processMetadataList ();
return true;
case 6:
this.processConditionList ();
return true;
case 7:
this.processParameterList ();
return true;
case 12:
this.processPeakList ();
return true;
default:
System.out.println ("CMLSource not processing tag " + JSV.source.XMLReader.tagNames[tagId] + "!");
return false;
}
}, "~N");
$_V(c$, "processEndTag", 
function (tagId) {
}, "~N");
$_M(c$, "processSpectrum", 
($fz = function () {
if (this.attrList.contains ("title")) this.title = this.reader.getAttrValue ("title");
 else if (this.attrList.contains ("id")) this.title = this.reader.getAttrValue ("id");
if (this.attrList.contains ("type")) this.techname = this.reader.getAttrValue ("type").toUpperCase () + " SPECTRUM";
}, $fz.isPrivate = true, $fz));
$_M(c$, "processMetadataList", 
($fz = function () {
if (this.tagName.equals ("metadata")) {
this.tagName = this.reader.getAttrValueLC ("name");
if (this.tagName.contains (":origin")) {
if (this.attrList.contains ("content")) this.origin = this.reader.getAttrValue ("content");
 else this.origin = this.reader.thisValue ();
} else if (this.tagName.contains (":owner")) {
if (this.attrList.contains ("content")) this.owner = this.reader.getAttrValue ("content");
 else this.owner = this.reader.thisValue ();
} else if (this.tagName.contains ("observenucleus")) {
if (this.attrList.contains ("content")) this.obNucleus = this.reader.getAttrValue ("content");
 else this.obNucleus = this.reader.thisValue ();
}}}, $fz.isPrivate = true, $fz));
$_M(c$, "processParameterList", 
($fz = function () {
if (this.tagName.equals ("parameter")) {
var title = this.reader.getAttrValueLC ("title");
if (title.equals ("nmr.observe frequency")) {
this.StrObFreq = this.reader.qualifiedValue ();
this.obFreq = Double.parseDouble (this.StrObFreq);
} else if (title.equals ("nmr.observe nucleus")) {
this.obNucleus = this.reader.getAttrValue ("value");
} else if (title.equals ("spectrometer/data system")) {
this.modelType = this.reader.getAttrValue ("value");
} else if (title.equals ("resolution")) {
this.resolution = this.reader.qualifiedValue ();
}}}, $fz.isPrivate = true, $fz));
$_M(c$, "processConditionList", 
($fz = function () {
if (this.tagName.equals ("scalar")) {
var dictRef = this.reader.getAttrValueLC ("dictRef");
if (dictRef.contains (":field")) {
this.StrObFreq = this.reader.thisValue ();
if (this.StrObFreq.charCodeAt (0) > 47 && this.StrObFreq.charCodeAt (0) < 58) this.obFreq = Double.parseDouble (this.StrObFreq);
}}}, $fz.isPrivate = true, $fz));
$_M(c$, "processSample", 
($fz = function () {
if (this.tagName.equals ("formula")) {
if (this.attrList.contains ("concise")) this.molForm = this.reader.getAttrValue ("concise");
 else if (this.attrList.contains ("inline")) this.molForm = this.reader.getAttrValue ("inline");
} else if (this.tagName.equals ("name")) {
this.casName = this.reader.thisValue ();
}}, $fz.isPrivate = true, $fz));
$_M(c$, "processSpectrumData", 
($fz = function () {
if (this.tagName.equals ("xaxis")) {
if (this.attrList.contains ("multipliertodata")) this.xFactor = Double.parseDouble (this.reader.getAttrValue ("multiplierToData"));
this.reader.nextTag ();
this.tagName = this.reader.getTagName ();
this.attrList = this.reader.getAttributeList ();
if (this.tagName.equals ("array")) {
this.xUnits = JSV.source.CMLReader.checkUnits (this.reader.getAttrValue ("units"));
this.npoints = Integer.parseInt (this.reader.getAttrValue ("size"));
this.xaxisData =  Clazz.newDoubleArray (this.npoints, 0);
if (this.attrList.contains ("start")) {
this.firstX = Double.parseDouble (this.reader.getAttrValue ("start"));
this.lastX = Double.parseDouble (this.reader.getAttrValue ("end"));
this.deltaX = (this.lastX - this.firstX) / (this.npoints - 1);
this.increasing = this.deltaX > 0 ? true : false;
this.continuous = true;
for (var j = 0; j < this.npoints; j++) this.xaxisData[j] = this.firstX + (this.deltaX * j);

} else {
var posDelim = 0;
var jj = -1;
var tempX = "";
this.Ydelim = " ";
this.attrList = this.reader.getCharacters ().$replace ('\n', ' ').$replace ('\r', ' ').trim ();
do {
jj++;
posDelim = this.attrList.indexOf (this.Ydelim);
tempX = this.attrList.substring (0, posDelim);
this.xaxisData[jj] = Double.parseDouble (tempX) * this.xFactor;
this.attrList = this.attrList.substring (posDelim + 1, this.attrList.length).trim ();
posDelim = this.attrList.indexOf (this.Ydelim);
while (posDelim > 0) {
jj++;
tempX = this.attrList.substring (0, posDelim);
this.xaxisData[jj] = Double.parseDouble (tempX) * this.xFactor;
this.attrList = this.attrList.substring (posDelim + 1, this.attrList.length).trim ();
posDelim = this.attrList.indexOf (this.Ydelim);
}
if (jj < this.npoints - 1) {
jj++;
this.xaxisData[jj] = Double.parseDouble (this.attrList) * this.xFactor;
}} while (jj < this.npoints - 1);
this.firstX = this.xaxisData[0];
this.lastX = this.xaxisData[this.npoints - 1];
this.continuous = true;
}}} else if (this.tagName.equals ("yaxis")) {
if (this.attrList.contains ("multipliertodata")) this.yFactor = Double.parseDouble (this.reader.getAttrValue ("multiplierToData"));
this.reader.nextTag ();
this.tagName = this.reader.getTagName ();
this.attrList = this.reader.getAttributeList ();
if (this.tagName.equals ("array")) {
this.yUnits = JSV.source.CMLReader.checkUnits (this.reader.getAttrValue ("units"));
var npointsY = Integer.$valueOf (this.reader.getAttrValue ("size"));
if (this.npoints != npointsY.intValue ()) System.err.println ("npoints variation between X and Y arrays");
this.yaxisData =  Clazz.newDoubleArray (this.npoints, 0);
this.Ydelim = this.reader.getAttrValue ("delimeter");
if (this.Ydelim.equals ("")) this.Ydelim = " ";
var posDelim = 0;
var jj = -1;
var tempY = "";
this.attrList = this.reader.getCharacters ().$replace ('\n', ' ').$replace ('\r', ' ').trim ();
do {
jj++;
posDelim = this.attrList.indexOf (this.Ydelim);
tempY = this.attrList.substring (0, posDelim);
this.yaxisData[jj] = Double.parseDouble (tempY) * this.yFactor;
this.attrList = this.attrList.substring (posDelim + 1, this.attrList.length).trim ();
posDelim = this.attrList.indexOf (this.Ydelim);
while (posDelim > 0) {
jj++;
tempY = this.attrList.substring (0, posDelim);
this.yaxisData[jj] = Double.parseDouble (tempY) * this.yFactor;
this.attrList = this.attrList.substring (posDelim + 1, this.attrList.length).trim ();
posDelim = this.attrList.indexOf (this.Ydelim);
}
if (jj < this.npoints - 1) {
jj++;
this.yaxisData[jj] = Double.parseDouble (this.attrList) * this.yFactor;
}} while (jj < this.npoints - 1);
}this.firstY = this.yaxisData[0];
this.specfound = true;
}}, $fz.isPrivate = true, $fz));
$_M(c$, "processPeaks", 
($fz = function () {
if (this.specfound) return;
this.peakData =  new java.util.Vector ();
this.process (12, true);
this.npoints = this.peakData.size ();
this.xaxisData =  Clazz.newDoubleArray (this.npoints, 0);
this.yaxisData =  Clazz.newDoubleArray (this.npoints, 0);
for (var i = 0; i < this.npoints; i++) {
var xy = this.peakData.get (i);
this.xaxisData[i] = xy[0];
this.yaxisData[i] = xy[1];
}
this.peakData = null;
this.firstX = this.xaxisData[0];
this.lastX = this.xaxisData[this.npoints - 1];
this.firstY = this.yaxisData[0];
this.increasing = (this.lastX > this.firstX);
this.continuous = false;
}, $fz.isPrivate = true, $fz));
$_M(c$, "processPeakList", 
function () {
if (this.tagName.equals ("peak")) {
if (this.attrList.contains ("xvalue")) {
var xy =  Clazz.newDoubleArray (2, 0);
xy[1] = 50;
xy[0] = Double.parseDouble (this.reader.getAttrValue ("xValue"));
if (this.attrList.contains ("xunits")) this.xUnits = JSV.source.CMLReader.checkUnits (this.reader.getAttrValue ("xUnits"));
if (this.attrList.contains ("yvalue")) xy[1] = Double.parseDouble (this.reader.getAttrValue ("yValue"));
if (this.attrList.contains ("yunits")) this.yUnits = JSV.source.CMLReader.checkUnits (this.reader.getAttrValue ("yUnits"));
if (this.attrList.contains ("atomrefs")) xy[1] = 49 * JU.PT.getTokens (this.reader.getAttrValue ("atomRefs")).length;
this.peakData.add (xy);
}}});
c$.checkUnits = $_M(c$, "checkUnits", 
($fz = function (units) {
units = units.substring (units.indexOf (":") + 1).toUpperCase ();
return (units.equals ("RELABUNDANCE") ? "RELATIVE ABUNDANCE" : units.contains ("ARBITRARY") ? "ARBITRARY UNITS" : units.equals ("MOVERZ") ? "M/Z" : units.equals ("CM-1") ? "1/CM" : units.equals ("NM") ? "NANOMETERS" : units);
}, $fz.isPrivate = true, $fz), "~S");
});
