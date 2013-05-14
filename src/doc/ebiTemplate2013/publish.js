/** Called automatically by JsDoc Toolkit. */
function publish(symbolSet) {
	publish.conf = {  // trailing slash expected for dirs
		ext:         ".html",
		outDir:      JSDOC.opt.d || SYS.pwd+"../out/jsdoc/",
		templatesDir: JSDOC.opt.t || SYS.pwd+"../templates/jsdoc/",
		symbolsDir:  "symbols/",
		srcDir:      "symbols/src/",
		registryDir:  "registry/",
		registrySrcDir: "registry/src/",
		biojsDir: ""
	};
	
	// is source output is suppressed, just display the links to the source file
	if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
		Link.prototype._makeSrcLink = function(srcFilePath) {
			return "&lt;"+srcFilePath+"&gt;";
		}
	}
	
	// create the folders and subfolders to hold the output
	IO.mkPath((publish.conf.outDir+"jsdoc/"+publish.conf.srcDir).split("/"));
	IO.mkPath((publish.conf.outDir+publish.conf.registrySrcDir).split("/"));
		
	// used to allow Link to check the details of things being linked to
	Link.symbolSet = symbolSet;

	// create the required templates
	try {
		var classTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"class.tmpl");
		var classesTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allclasses.tmpl");
		var overviewTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"registryOverview.tmpl");
	}
	catch(e) {
		print("Couldn't create the required templates: "+e);
		quit();
	}
	
	// some ustility filters
	function hasNoParent($) {return ($.memberOf == "")}
	function isaFile($) {return ($.is("FILE"))}
	function isaClass($) {return ($.is("CONSTRUCTOR") || $.isNamespace)}
	
	// get an array version of the symbolset, useful for filtering
	var symbols = symbolSet.toArray();
	
	// create the hilited source code files
	var files = JSDOC.opt.srcFiles;
 	for (var i = 0, l = files.length; i < l; i++) {
 		var file = files[i];
 		var srcDir = publish.conf.outDir + "jsdoc/" +publish.conf.srcDir;
		makeSrcFile(file, srcDir);
		IO.copyFile(file, publish.conf.outDir + publish.conf.registrySrcDir );
 	}
 	
 	// get a list of all the classes in the symbolset
 	var classes = symbols.filter(isaClass).sort(makeSortby("alias"));
	
	// create a filemap in which outfiles must be to be named uniquely, ignoring case
	if (JSDOC.opt.u) {
		var filemapCounts = {};
		Link.filemap = {};
		for (var i = 0, l = classes.length; i < l; i++) {
			var lcAlias = classes[i].alias.toLowerCase();
			
			if (!filemapCounts[lcAlias]) filemapCounts[lcAlias] = 1;
			else filemapCounts[lcAlias]++;
			
			Link.filemap[classes[i].alias] = 
				(filemapCounts[lcAlias] > 1)?
				lcAlias+"_"+filemapCounts[lcAlias] : lcAlias;
		}
	}
	
	// create a class index, displayed in the left-hand column of every class page
	Link.base = "../";
 	publish.classesIndex = classesTemplate.process(classes); // kept in memory
	
 	var components = [];
	// create each of the class pages
	for (var i = 0, l = classes.length; i < l; i++) {
		var symbol = classes[i];
		
		symbol.events = symbol.getEvents();   // 1 order matters
		symbol.methods = symbol.getMethods(); // 2
		
		Link.currentSymbol= symbol;
		var output = "";
		output = classTemplate.process(symbol);
		
		IO.saveFile(publish.conf.outDir + "jsdoc/" + publish.conf.symbolsDir, ((JSDOC.opt.u)? Link.filemap[symbol.alias] : symbol.alias) + publish.conf.ext, output);
		
		if (isAComponent(symbol)) {
			components.push(symbol);
		}
	}
	
	copyInheritedMembers(components);
	// create each of the component' registry pages
	for (var i = 0; i < components.length; i++) {
		var symbol = components[i];
		// Overview
		IO.saveFile(publish.conf.outDir+publish.conf.registryDir, symbol.alias + publish.conf.ext, overviewTemplate.process(symbol));
	}
	
	
	// regenerate the index with different relative links, used in the index pages
	Link.base = "";
	publish.classesIndex = classesTemplate.process(classes);
	
	// create the class index page
	try {
		var classesindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"index.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var classesIndex = classesindexTemplate.process(classes);
	IO.saveFile(publish.conf.outDir + "jsdoc/", "index"+publish.conf.ext, classesIndex);
	classesindexTemplate = classesIndex = classes = null;
	
	// create the file index page
	try {
		var fileindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allfiles.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var documentedFiles = symbols.filter(isaFile); // files that have file-level docs
	var allFiles = []; // not all files have file-level docs, but we need to list every one
	
	for (var i = 0; i < files.length; i++) {
		allFiles.push(new JSDOC.Symbol(files[i], [], "FILE", new JSDOC.DocComment("/** */")));
	}
	
	for (var i = 0; i < documentedFiles.length; i++) {
		var offset = files.indexOf(documentedFiles[i].alias);
		allFiles[offset] = documentedFiles[i];
	}
		
	allFiles = allFiles.sort(makeSortby("name"));

	// output the file index page
	var filesIndex = fileindexTemplate.process(allFiles);
	IO.saveFile(publish.conf.outDir + "jsdoc/", "files"+publish.conf.ext, filesIndex);
	fileindexTemplate = filesIndex = files = null;

	
	// create the Registry index page
	try {
		var registryIndexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"registryIndex.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var registryIndex = registryIndexTemplate.process(components);
	IO.saveFile(publish.conf.outDir + publish.conf.registryDir, "index"+publish.conf.ext, registryIndex);
    
	// create BioJS index page redirecting to the registry index page
	try {
		var biojsIndexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"biojsIndex.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var biojsIndex = biojsIndexTemplate.process(components);
	IO.saveFile(publish.conf.outDir + publish.conf.biojsDir, "index"+publish.conf.ext, biojsIndex);
    	
	
    // create the Components page
	try {
		var registryComponentsTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"registryComponents.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var registryComponents = registryComponentsTemplate.process(components);
	IO.saveFile(publish.conf.outDir + publish.conf.registryDir, "components"+publish.conf.ext, registryComponents);

	
	// copy files from resources
	var resourcesFilesPath = publish.conf.templatesDir+"resources/";
	var registryFilesPath = publish.conf.outDir + publish.conf.registryDir;
	var jsdocFilesPath = publish.conf.outDir + "jsdoc/";
	var staticFiles = IO.ls(resourcesFilesPath, 10);
	
	for (var i=0; i<staticFiles.length; i++){
		
		var destRegistryFile = staticFiles[i].replace(resourcesFilesPath, registryFilesPath);
		var destRegistryPath = destRegistryFile.split("/"); destRegistryPath.pop();
		
		var destJsdocFile = staticFiles[i].replace(resourcesFilesPath, jsdocFilesPath);
		var destJsdocPath = destJsdocFile.split("/"); destJsdocPath.pop();
		
		IO.mkPath(destRegistryPath);
		IO.copyFile(staticFiles[i], destRegistryPath.join("/"));
		
		IO.mkPath(destJsdocPath);
		IO.copyFile(staticFiles[i], destJsdocPath.join("/"));
	}

}


/** Just the first sentence (up to a full stop). Should not break on dotted variable names. */
function summarize(desc) {
	if (typeof desc != "undefined")
		return desc.match(/([\w\W]+?\.)[^a-z0-9_$]/i)? RegExp.$1 : desc;
}

/** Make a symbol sorter by some attribute. */
function makeSortby(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute].toLowerCase();
			b = b[attribute].toLowerCase();
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}

/** Pull in the contents of an external file at the given path. */
function include(path) {
	var path = publish.conf.templatesDir+path;
	return IO.readFile(path);
}

/** Turn a raw source file into a code-hilited page in the docs. */
function makeSrcFile(path, srcDir, name) {
	if (JSDOC.opt.s) return;
	
	if (!name) {
		name = path.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
		name = name.replace(/\:/g, "_");
	}
	
	var src = {path: path, name:name, charset: IO.encoding, hilited: ""};
	
	if (defined(JSDOC.PluginManager)) {
		JSDOC.PluginManager.run("onPublishSrc", src);
	}

	if (src.hilited) {
		IO.saveFile(srcDir, name+publish.conf.ext, src.hilited);
	}
}

/** Build output for displaying function parameters. */
function makeSignature(params) {
	if (!params) return "()";
	var signature = "("
	+
	params.filter(
		function($) {
			return $.name.indexOf(".") == -1; // don't show config params in signature
		}
	).map(
		function($) {
			return $.name;
		}
	).join(", ")
	+
	")";
	return signature;
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
	str = str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return new Link().toSymbol(symbolName);
		}
	);
	
	return str;
}

function isAComponent(symbol) {
	var methods = symbol.getMethods();
	
	for ( var i=0; i<methods.length; i++ ) {
		if ( methods[i].name == "constructor" ) return true; 
	}
	
	return false;
}


function copyInheritedMembers(components) {
	var remain = [];
	for ( i in components ){
		remain.push(i);
	}
	inheritedMembers(components, remain);
}

function inheritedMembers(components, remain ) {
	if ( remain.length == 0 ) {
		return;
		
	} else {
		
		var r = remain[0];
		var node = components[r];
		
		if ( node.inheritsFrom[0] == "Biojs" ) { // node hasn't parent, remove it
			inheritedMembers(components, remain.slice(1));
			
		} else { 
			// search for node's parent in remain 
			var i=-1;
			var parent = undefined;
			for ( key in remain ) {
				if ( node.inheritsFrom.indexOf(components[remain[key]].alias) >= 0 ) {
					parent = components[remain[key]];
					i = key;
					break;
				}
			}
			
			if ( parent != undefined ) { // found! put parent heading remain 
				remain[0] = remain[i];
				remain[i] = r;
				inheritedMembers(components, remain);
				
			} else { // not found in remain! 
				
				// search for node's parent in components
				for ( var key in components ) {
					if ( node.inheritsFrom.indexOf(components[key].alias) >= 0 ) {
						parent = components[key];
						break;
					}
				}
				
				// copy both dependencies and options from the parent to this 
				parent.requires.map( function($) { node.requires.push($) } );  
				parent.comment.getTag('dependency').map( function($) { node.comment.tags.push($) } );
				parent.comment.getTag('option').map( function($) { node.comment.tags.push($) } );
				
				// create a dependency to the parent
				var tag = new JSDOC.DocTag();
				tag.title = 'dependency';
				tag.desc = '<script language="JavaScript" type="text/javascript" src="src/'+parent.alias+'.js"></script>';
				node.comment.tags.push( tag );

				node.requires.push( 
					new JSDOC.DocTag('@requires <a href="' + parent.alias + '.html">' + parent.alias +'</a>')  
				);
				
				// Remove the first
				inheritedMembers(components, remain.slice(1));
			}
		}
	}	
}



