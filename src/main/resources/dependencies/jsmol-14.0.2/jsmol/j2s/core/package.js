// BH 12/15/2012 1:56:28 PM  adds corezip.z.js and corebio.z.js
// later additions include coresym.z.js, coresurface.z.js, coremenu.z.js

// NOTE: Any changes here must also be reflected in buildtojs.xml

if (!window["java.registered"])
 window["java.registered"] = false;

(function () {

if (window["java.packaged"]) return;
window["java.packaged"] = true;

var	base = ClazzLoader.fastGetJ2SLibBase() + "core/";

for (var i = 0; i < Jmol._coreFiles.length; i++)
  ClazzLoader.loadZJar (Jmol._coreFiles[i], ClazzLoader.runtimeKeyClass);

  if (Jmol._debugCode)
    return;

// note - we don't need to list ALL the classes -- only the ones that are entry points.
// several more classe are in each of these files -- see build_03_tojs.xml

	ClazzLoader.jarClasspath (base + "coretext.z.js",	[    
	"J.modelset.Object2d",
	"$.Text",
	"J.shape.Object2dShape",
	"$.TextShape",
	"$.Labels",
	"$.Echo",
	"$.Hover"
	]);

	ClazzLoader.jarClasspath (base + "corescript.z.js",	[  
    "J.api.JmolScriptManager", 
    "$.JmolScriptEvaluator",
    "$.JmolScriptFunction",
    "J.script.ScriptEvaluator", 
    "$.ScriptCompiler", 
    "$.CommandWatcherThread", 
    "$.ScriptQueueThread", 
    "$.ScriptDelayThread", 
    "$.ScriptManager",
    "$.FileLoadThread"
	]);
	
	ClazzLoader.jarClasspath (base + "corescript2.z.js",	[  
	"J.script.JmolScriptExtension", 
	"J.scriptext.ScriptExt"
	]);
	                                                 	
	ClazzLoader.jarClasspath (base + "corestate.z.js",	[  
    "J.api.JmolStateCreator", 
    "J.viewer.StateCreator" 
	]);
	
	ClazzLoader.jarClasspath (base + "coreprop.z.js",	[  
    "J.api.JmolPropertyManager", 
    "J.viewer.PropertyManager" 
	]);  
  
	ClazzLoader.jarClasspath (base + "coreconsole.z.js",	[
		"J.api.JmolAppConsoleInterface",
		"J.console.GenericTextArea",
		"$.GenericConsole",
		"J.consolejs.AppletConsole"
	]);

	ClazzLoader.jarClasspath (base + "coremenu.z.js",	[
		"J.awtjs2d.JSmolPopup",		
		"$.JSPopup",
		"$.JSmolPopup",
		"J.popup.JmolAbstractMenu",
		"$.GenericPopup",
		"$.PopupResource",
		"$.MainPopupResourceBundle"
	]);

	ClazzLoader.jarClasspath (base + "corebinary.z.js",	[
    "java.io.DataInputStream",
    "$.PushbackInputStream",
    "JU.BC",
    "J.api.JmolDocument",
    "J.io2.BinaryDocument"
	]);

	ClazzLoader.jarClasspath (base + "corepymol.z.js",	[
    "J.api.JmolSceneGenerator",
    "J.api.PymolAtomReader", // -- required by J.adapter.readers.pymol.PyMOLReader
    "J.adapter.readers.pymol.PickleReader",
    "$.PyMOL",
    "$.JmolObject",
    "$.PyMOLGroup",
    "$.PyMOLScene",
    "$.PyMOLReader"
	]);

	ClazzLoader.jarClasspath (base + "coremin.z.js",	[
		"J.api.MinimizerInterface", // -- required by J.minimize.Minimizer
		"J.minimize.Minimizer",
		"$.MinObject", // -- required by $.MinAngle
		"$.MinAngle",
		"$.MinAtom",
		"$.MinBond",
		"$.MinTorsion",
		"$.Util",
		"J.minimize.forcefield.AtomType",
		"$.Calculation", // -- required by $.CalculationsMMFF
		"$.Calculations", // -- required by $.CalculationsMMFF
		"$.CalculationsMMFF",
		"$.CalculationsUFF",
		"$.FFParam",
		"$.ForceField", // -- required by $.forcefield.ForceFieldMMFF
		"$.ForceFieldUFF",
		"$.ForceFieldMMFF",
		"J.thread.MinimizationThread"
	]);

	ClazzLoader.jarClasspath (base + "corezip.z.js",	[
		"J.api.JmolZipUtility",
		"$.ZInputStream",
		"J.io2.ZipUtil",
		"$.JmolZipInputStream"
	]);

	ClazzLoader.jarClasspath (base + "corebio.z.js",	[
		"J.adapter.readers.pdb.PdbReader",
		"J.adapter.smarter.Structure",
		"J.api.JmolBioResolver",
		"J.modelsetbio.Resolver",
		"$.BioModel"
 ]);


	ClazzLoader.jarClasspath (base + "coresurface.z.js",	[
		"J.api.VolumeDataInterface",
		"J.jvxl.api.VertexDataServer",
		"$.MeshDataServer",
		"J.jvxl.calc.MarchingCubes",
		"$.MarchingSquares",
		"J.jvxl.data.JvxlCoder",
		"$.VolumeData",
		"$.JvxlData",
		"$.MeshData",
		"J.jvxl.readers.SurfaceGenerator",
		"$.Parameters",
		"$.SurfaceReader",
		"$.VolumeDataReader",
		"$.AtomDataReader",
		"$.IsoSolventReader",
   		"$.SurfaceFileReader",
    	"$.VolumeFileReader",
    	"$.XmlReader",
	    "$.JvxlXmlReader",
		"J.shapesurface.Isosurface",
		"$.IsosurfaceMesh",
		"J.rendersurface.IsosurfaceRenderer"
	]);

	ClazzLoader.jarClasspath (base + "coresym.z.js",	[
		"J.api.SymmetryInterface",
		"J.symmetry.Symmetry",
		"$.PointGroup",
		"$.SpaceGroup",
		"$.HallInfo",
		"$.HallRotationTerm",
		"$.HallRotation",
		"$.HallTranslation",
		"$.SymmetryOperation",
		"$.SymmetryInfo",
		"$.UnitCell"
	]);

	ClazzLoader.jarClasspath (base + "coresmiles.z.js",	[
    "J.api.SmilesMatcherInterface",
    "J.smiles.VTemp",
    "$.SmilesMatcher",
    "$.InvalidSmilesException",
    "$.SmilesSearch",
    "$.SmilesGenerator",
    "$.SmilesAromatic",
    "$.SmilesAtom",
    "$.SmilesBond",
    "$.SmilesMeasure",
    "$.SmilesParser"
	]);

	ClazzLoader.jarClasspath (base + "corejsvmenu.z.js",	[
          	"JSV.js2d.JsPopup"
  ]);

	ClazzLoader.jarClasspath (base + "corejsvexport.z.js",	[
          	"JSV.export.Exporter"
	]);

	ClazzLoader.jarClasspath (base + "corejsvdialog.z.js",	[
        	"JSV.dialog.IntegrationDialog",
        	"$.PeakListDialog",
          "$.MeasurementsDialog",
          "$.OverlayLegendDialog",
          "$.ViewsDialog"
	]);



}) ();
window["java.registered"] = true;
