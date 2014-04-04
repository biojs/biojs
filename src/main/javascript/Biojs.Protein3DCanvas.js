/** 
 * Pdb file 3D viewer component using JSMol and Canvas HTML5 technology if  available (downgrade to Applet technology otherwise).
 *  
 * 
 * @class
 * @extends Biojs.Protein3D
 *
 * @author <a href="mailto:ftalo@ebi.ac.uk">Francesco Talo</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href='http://blog.jquery.com/2012/09/20/jquery-1-8-2-released/'>jQuery Core 1.8.2 (not necessaty if you import the JSmol.min.js)</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.8.2.js"></script>
 * 
 * @requires <a href='http://sourceforge.net/projects/jsmol/'>jsMol 14.0.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jsmol-14.0.2/jsmol/js/Jmol2.js"></script>
 *  
 * @requires <a href='http://sourceforge.net/projects/jsmol/'>jsMol 14.0.2 (use this if you import separately jQuery)</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jsmol-14.0.2/jsmol/JSmol.min.nojq.js"></script>
 
 * 
 * 
 * @requires <a href='http://sourceforge.net/projects/jsmol/'>jsMol 14.0.2 (use this if you don't import already jQuery in your application)</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jsmol-14.0.2/jsmol/JSmol.min.js"></script>
 *
 *
 *
 * @requires <a href='../biojs/css/Protein3D.css'>Protein3D CSS</a>
 * @dependency <link href="../biojs/css/biojs.Protein3D.css" rel="stylesheet" type="text/css" />
 * 
 * @param {Object} options An object with the options for Biojs.Protein3DCanvas component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {int} [width=597] 
 *    Width in pixels.
 *    
 * @option {int} [height=400] 
 *    Height in pixels.
 *    
 * @option {string} [jsmolFolder="{BIOJS_HOME}/dependencies/jmol-12.0.48"] 
 *    Relative path of the jSMol library.

 * @option {string} [use="HTML5 JAVA"] 
 *      This string determines the various options to be tried (HTML5, Java Applet and surrogates) and the order in which to try them.
 *      The default setting is HTML5 CANVAS and then Java if Canvas is not available.
 *
 *   @option {string} [urlProxy="{BIOJS_HOME}/dependencies/jsmol-14.0.2/jsmol/proxy/jsmol.jsp"] 
 *    Path of the proxy to use for transformation of the gzip file in base64 files for MSIE and CHROME.
 * 
 * @option {string} [loadingStatusImage="{BIOJS_HOME}/css/images/ajax-loader-1.gif"] 
 *    Relative path of the image to be displayed on loading status.
 *    
 * @option {string} [unpolarColor="salmon"] 
 * 	  This value is used by displayUnpolar() method for coloring hydrophobic residues.
 * 
 * @option {string} [negativeColor="red"] 
 * 	  This value is used by displayNegative() method for coloring acidic(-) residues.
 * 
 * @option {string} [positiveColor="blue"] 
 * 	  This value is used by displayNegative() method for coloring basic(+) residues.
 * 
 * @option {string} [polarColor="yellow"] 
 * 	  This value is used by displayNegative() method for coloring hydrophylic residues.
 * 
 * @option {string} [backgroundColor="white"] 
 * 	  Background color of the jMol applet
 * 
 * @option {bool} [enableControls=true] 
 * 	  Enable for showing the control panel. If value is 'false', it disables both methods showControls and hideControls. 
 
 @option {bool} [viewControls=true] 
 * 	  Show/Hide controls panel after the loading of the PDB structure. 
 * 
 * 
 * @example 
 * // Example of loading a pdb file by means of an HTTP request to get the zip file
 * // 'http://www.rcsb.org/pdb/files/"+pdb+".pdb.gz' containing the structure of the protein.
 * //The file id downloaded form the server as a zipped file and then it's unzipped on the client
 *        var instance = new Biojs.Protein3DCanvas({
 *				target: "YourOwnDivId",
 *				jsmolFolder: '/bioJs/dependencies/jsmol-14.0.2/jsmol',
 *				height: 440,
 *		    	width: 440,
 *		    	style: Biojs.Protein3D.STYLE_CARTOON,
 *		    	use:"HTML5 JAVA",
 *				urlProxy:"/bioJs/dependencies/jsmol-14.0.2/jsmol/proxy/jsmol.jsp",
 *              viewControls: true
 *		     });	
 *			instance.onPdbLoaded(
 *			   function( objEvent ) {
 *				    alert('PDB LOADED');
 *			   }
 *			);
 *			//trigger to download the zip file containing the pdb structure from the server and unzip  the file on the client
 *			instance.setPdb('2al6');
 *
 * 
 */
Biojs.Protein3DCanvas = Biojs.Protein3D.extend(
/** @lends Biojs.Protein3DCanvas# */
{ 
	constructor: function (options) {

		this.opt.jmolFolder= this.opt.jsmolFolder;
		Biojs.Protein3D.call(this, options);
		
		//JMol configuraion
		if ( this.opt.use == undefined ) {
			Jmol.Info["use"] = "HTML5 JAVA";
			
		}else{
			Jmol.Info["use"] = this.opt.use;
		}
		
		
		if ( this.opt.proxyUrl != undefined ) {
			Jmol.Info["serverURL"] = this.opt.proxyUrl;	
		}
		
		Jmol.Info["jarPath"] = this.opt.jsmolFolder+"/java",
		Jmol.Info["jarFile"] = this.opt.jsmolFolder+"/java/JmolApplet0.jar",
		Jmol.Info["j2sPath"] = this.opt.jsmolFolder+"/j2s";
		
		Jmol.Info["addSelectionOptions"]= false;
		Jmol.Info["color"]= "#ffffff";
		Jmol.Info["debug"]= false;
		Jmol.Info["memoryLimit"]= 512;            // Java only
		Jmol.Info["readyFunction"]= null;
		Jmol.Info["src"]= null;
		Jmol.Info["disableInitialConsole"]=true;
		Jmol.Info["disableJ2SLoadMonitor"]= true;
		Jmol.Info["deferUncover"]=true;
		Jmol.Info["deferApplet"]= false;
   },
   
   /** 
    * Default options (and its values) for the Protein3DCanvas component. 
    * @name Biojs.Protein3DCanvas-opt
    * @type Object
    */
   opt: 
   {
	   use: "HTML5 JAVA",
	   jsmolFolder: "../biojs/dependencies/jsmol-14.0.2/jsmol",
	   viewControls: true
   },
   
   /**
	 * Array containing the supported event names
	 * @name Biojs.Protein3DCanvas-eventTypes
	 */
	eventTypes : [],
   
   /**
    * Sets the pdb file to be displayed.
    * Also triggers the event whenever a new pdb file is loaded.
    * It demands entirely to JSMol the download from the server and unzip of of the PDB file on the browser
    * 
    * @param The pdb id to use to download the gz file from the server http://www.rcsb.org/pdb/files/"+pdb+".pdb.gz.
    *
    * @example 
    *  var instance = new Biojs.Protein3DCanvas({
	*		target: "YourOwnDivId",
	*		jsmolFolder: '/bioJs/dependencies/jsmol-14.0.2/jsmol',
	*		height: 440,
	*	    width: 440,
	*	    style: Biojs.Protein3D.STYLE_CARTOON,
	*	    use:"HTML5 JAVA",
			urlProxy:"/bioJs/dependencies/jsmol-14.0.2/jsmol/proxy/jsmol.jsp",
			viewControls: true
	* });	
	*	  
	*	instance.onPdbLoaded(
	*	   function( objEvent ) {
	*		   alert('PDB LOADED');
	*	   }
	*	);
	*	
	*	//trigger the downloading of the zip containing the pdb file from the server and unzip  the file on the client
	*	instance.setPdb('2al6');
    *
    * 
    */
	setPdb: function( pdb ){
		Biojs.console.log("LOADING pdb content");
		
		var self = this;
		
		var surfaceCmd = this._getDisplaySurface( this.opt.surface );
		var styleCmd = this._getDisplayStyle( this.opt.style );
		var colorSchemeCmd = this._getDisplayColor( this.opt.colorScheme );
		
		var scr = colorSchemeCmd + styleCmd + surfaceCmd + this._getSelectionScript( this._selection ); 

		this.showLoadingImage(true);
		
		if ( this._jmolAppletInitialized ) {
			this.reset();	
		}
		Jmol.setDocument(0);
		htmlContent = jmolApplet([self._appletContainer.width(), self._appletContainer.height()], " load 'http://www.rcsb.org/pdb/files/"+pdb+".pdb.gz';"+ scr, self.getId());
		
		this._appletContainer.html(Jmol.getAppletHtml(eval(htmlContent._id)));
		
		this._jmolAppletInitialized = true;
		
		Biojs.console.log("setPdb() ending");
	},
	
	toString: function() { 
		return "Biojs.Protein3DCanvas";
	},
	
	/* 
     * Function: Biojs.Protein3D._functionCbName
     * Purpose:  enable controls an triggers the loading pdb file event. 
     * 			 It is invoked by JmolApplet. 
     * Returns:  -
     * Inputs: 
     *    appletId    -> {string} Applet identifier.
     *    url         -> {string} URL of the loaded file (full path+filename).
     *    file        -> {string} the filename of the loaded file (without the path). 
     *    title       -> {string} the internal title of the model in the loaded file. 
     *    message     -> {string} any error messages generated.
     *    code        -> {int} A numeric code: 
     *                         3 when the file loaded successfully, 
     *                         0 when the model was zapped, 
     *                        -1 when the loading failed.
     *    formerFrame -> {string} a text string with the frame 
     *                        number prior to loading the current model, in file.model syntax 
     *                        (for example, "3.1" or "1.1 - 3.31" if a whole range of models was framed). 
     *    frame       -> {string} A text string with the last frame number after loading the current model, 
     *                        in file.model syntax.
     */
	
	_loadStructCallback: function ( appletId, url, file, title, message, code, formerFrame, frame ) {
		
Biojs.console.log("executing _loadStructCallback for " + appletId);
		
		switch (code) {
			case 3  : result = 'success'; break;		
			case 0  : result = 'zapped'; break; 
			case -1 : result = 'failure'; break;
			default : result = 'undefined'; break;
		}
		
		// Ignore the execution of the callback on replacing pdb file.
		
		if ( "zapped" != result ) {
			//uncover the loading image
			var instanceId = parseInt( appletId.replace("jmolApplet",'') );
			var instance = Biojs.getInstance(instanceId);
			
			if ( "success" == result ) {
				instance.displayAntialias(instance.opt.antialias);
				instance.rotate(instance.opt.rotate);
			}
			
			instance.showLoadingImage(false);
			if (instance.opt.viewControls){
				instance.showControls();
				instance._controlsContainer.css('display','block');
				jmolResizeApplet([ instance._container.width() - instance._controlsContainer.outerWidth(), instance._container.height()], instance.getId());
				instance._appletContainer.css('float','right');
				
			}else{
				instance.hideControls();
				instance._controlsContainer.css('display','none');
				jmolResizeApplet([ instance._container.width(), instance._container.height()], instance.getId());
				instance._appletContainer.css('float','left');
			}
			
			instance.raiseEvent(Biojs.Protein3D.EVT_ON_PDB_LOADED, {
				"file": title,
				"result": result,
				"message": message
			});
			
			instance._appletContainer.css('display','block');
		
			
		}
		
		
	}

});
