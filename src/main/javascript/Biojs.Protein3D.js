/** 
 * Pdb file 3D viewer component using JMol
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='http://jmol.sourceforge.net/download/'>jMol 12.0.48</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jmol-12.0.48/Jmol.js"></script>
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, based on the code made 
 * by <a href="mailto:christine.jandrasits@gmail.com">Christine Jandrasits</a>
 * 
 * @param {Object} options An object with the options for Biojs.Protein3D component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {int} [width=597] 
 *    Width in pixels.
 *    
 * @option {int} [height=400] 
 *    Height in pixels .
 *    
 * @option {string} [jmolFolder="{BIOJS_HOME}/dependencies/jmol-12.0.48"] 
 *    Relative path of the jMol library.
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
 * 
 * 
 * @example 
 * var instance = new Biojs.Protein3D({
 * 		target: 'YourOwnDivId'
 * });	
 * 
 * 
 * // Example of loading a pdb file by means of an HTTP request to
 * // 'http://www.ebi.ac.uk/pdbe-srv/view/files/1wq6.pdb' through the local proxy 'proxy.php'.
 * // Note that instance.setPdb(data) is invoked once the data have been arrived. 
 * jQuery.ajax({
 * 		url: '../biojs/dependencies/proxy/proxy.php',
 * 		data: 'url=http://www.ebi.ac.uk/pdbe-srv/view/files/1wq6.pdb',
 * 		dataType: 'text',
 * 		success: function(pdbFile){
 * 			instance.setPdb(pdbFile);
 * 		},
 * 		error: function(qXHR, textStatus, errorThrown){
 * 			alert(textStatus);
 * 		}
 * 	});
 * 
 */
Biojs.Protein3D = Biojs.extend(
/** @lends Biojs.Protein3D# */
{ 
	constructor: function (options) {

		//Biojs.console.enable();
		Biojs.console.log("starting Biojs.Protein3D constructor");
		
		var self = this;
		
		self.image = '<img id="image_' + self.getId() + '" src="' + self.opt.loadingStatusImage + '" style="display:block; margin: 0 auto;" />';
		self._appletId = "jmolApplet" + self.getId();
		self.opt.backgroundColor = (self.opt.backgroundColor)? self.opt.backgroundColor : "white";
		
		jmolInitialize(self.opt.jmolFolder);
		jmolSetAppletColor( self.opt.backgroundColor );
		jmolSetDocument(0);
		
		Biojs.console.log("registring callback for object " + self.getId());
		
		// Jmol needs a global function for executing up whenever a pbd is loaded
		// Name for the function in global scope
		var loadStructCallbackName = self._appletId + "_pdbLoadCallback";
		
		// Register the function _loadStructCallback as global for JmolApplet use 
		Biojs.registerGlobal(loadStructCallbackName, self._loadStructCallback );
		
		// Tell Jmol the name of the function in global scope
		jmolSetCallback("loadStructCallback", loadStructCallbackName );
		
		jQuery("div#"+self.opt.target)
			.css('display', 'block')
			.css("padding","0px")
			.css("width",self.opt.width)
			.css("height",self.opt.height)
			.css("overflow","hidden")
			.html('<div id="div'+self._appletId+'"/><div id="controlSection" />')
			.find('div')
			.css('position','relative')
			.css('float','right')
			.hide();
		
		jQuery("div#"+self.opt.target).append('<div id="loadingImage" />');
		
		jQuery('#' + self.opt.target + ' div#loadingImage')
			.css("padding","0px")
			.css("width",self.opt.width)
			.css("height",self.opt.height)
			.css("overflow","hidden")
			.css('display','table-cell')
			.css('vertical-align','middle')
			.html( self.image );
		
		
		if (jQuery.browser.msie) {
			jQuery('#' + self.opt.target + ' div#loadingImage').css('display','inline');
			jQuery('#' + self.opt.target + ' img#image_' + this.getId()).css('vertical-align','middle');
		}
		
		Biojs.console.log("ending Biojs.Protein3D constructor");
   },
   
   /** 
    * Default options (and its values) for the Protein3D component. 
    * @name Biojs.Protein3D-opt
    * @type Object
    */
   opt: 
   {
	   target: 'component',
	   width: 597,
	   height: 400,
	   jmolFolder: '../biojs/dependencies/jmol-12.0.48',
	   unpolarColor: "salmon",
	   negativeColor: "red",
	   positiveColor: "blue",
	   polarColor: "yellow",
	   backgroundColor: "white",
	   enableControls: true,
	   loadingStatusImage: '../biojs/css/images/ajax-loader-1.gif',
	   surface: "None",
	   style: "Cartoon",
	   colorScheme: "By Chain",
	   antialias: false,
	   rotate: false
   },
   
   /**
	 * Array containing the supported event names
	 * @name Biojs.Protein3D-eventTypes
	 */
	eventTypes : [
		/**
		 * @name Biojs.Protein3D#onPdbLoaded
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} file The name of the loaded file.
		 * @eventData {string} result A string with either value 'success' or 'failure'.
		 * @eventData {string} message Error message in case of result be 'failure'.
		 * 
		 * @example 
		 * instance.onPdbLoaded(
		 *    function( objEvent ) {
		 *       alert( (objEvent.result == "success")? "Pdb file "+ objEvent.file+" loaded."  : objEvent.message );
		 *    }
		 * ); 
		 * 
		 * */
		"onPdbLoaded",
		/**
		 * @name Biojs.Protein3D#onSelection
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} selectionType String with either value 'region' or 'positions'.
		 * @eventData {Object|Array} selection If the type of selection is a region, this will be a Object 
		 * 							with attributes 'start' and 'end'. In other case, this will be an array 
		 * 						    containing the selected positions.
		 * 
		 * @example 
		 * instance.onSelection(
		 *    function( objEvent ) {
		 *       selection = (objEvent.selectionType === "region")? (objEvent.selection.start +" - "+ objEvent.selection.end) : objEvent.selection.join(',');
		 *       alert( "Selected "+objEvent.selectionType+": "+selection );
		 *    }
		 * ); 
		 * 
		 * */
		"onSelection"
	],
   
   /* Internal members */
   _appletId: undefined,
   _controlsReady: false,
   _controlsVisible: false,
   _jmoljarfile: "JmolApplet.jar",
   _jmolAppletInitialized: false,
   _selection: undefined,
   
   _display: { 
	   property: {
		   polar: false,
		   unpolar: false,
		   positive: false,
		   negative: false
	   },
	   surface: false,
	   halos: true
   },

   /**
    * Shows the form of controls.
    * 
    * @example 
    * instance.showControls(); 
    * 
    */
   showControls: function() {
	   if (this.opt.enableControls) {
		   if (!this._controlsReady) {
			   this._buildControls();
		   }
		   if (!this._controlsVisible) {
			   this._toggleControls();
		   }
	   }
   },
   
   /**
    * Hides the form of controls.
    * 
    * @example 
    * instance.hideControls(); 
    * 
    */
   hideControls: function() {
	   if (this.opt.enableControls && this._controlsVisible) {
		   this._toggleControls();		  
	   }
   },
   
   /**
    * Returns the information about the region of the currently PDB file.
    * 
    * @example 
    * //Show the region in an alert window.
    * var selection = instance.getSelection(); 
    * alert("selected: "+ selection );
    *
    * @returns {Object|Array} 
    *   Returns a plain object if the current selection is a region. 
    *   In this case, will contain the fields start and end; where "start" is greater than or equal to "end".
    *   Returns an array if the current selection is a set of positions. 
    *   Returns undefined if there are not selection.
    * 
    */
   	getSelection: function(){
		return Biojs.Utils.clone(this._selection);
	},
	   
   /**
    * Restores the default display settings for the current PDB file.
    * Note: for removing out the current selection use removeSelection().
    *
    * @example instance.reset(); 
    */
	reset: function(){
		jmolScriptWait( this._getDisplayColor( this.opt.colorScheme ) + this._getDisplayStyle( this.opt.style ), this.getId() );
		
		// TODO: use functions instead of jquery
		
		var theTargetDiv = jQuery("#"+this.opt.target);
		theTargetDiv.find("div#controlSection > div#controls > input[type='checkbox']").attr("checked",false);
		theTargetDiv.find('#styleSelect').val("Cartoon");
		theTargetDiv.find('#colorSelect').val( this.opt.colorScheme );
		theTargetDiv.find('#surfaceSelect').val( this.opt.style );
		
		for (var key in this._display.property) {
			this._display.property[key] = false;
		}
		
		this.setHalosVisible(true);
	},
	
	showLoadingImage: function(){
		// Show loading image
		jQuery('#' + this.opt.target ).find('div').hide();
		jQuery("#" + this.opt.target + ' div#loadingImage').show();
	},
	
   /**
    * Sets the pdb file to be displayed.
    * Also triggers the event whenever a new pdb file is loaded.
    * 
    * @param {string} pdb The content of the pdb file.
    *
    * @example 
    * instance.showLoadingImage();
    * 
    * jQuery.ajax({
	* 		url: '../biojs/dependencies/proxy/proxy.php',
	* 		data: 'url=http://www.ebi.ac.uk/pdbe-srv/view/files/3u01.pdb',
	* 		dataType: 'text',
	* 		success: function(pdbFile){
	* 			instance.setPdb(pdbFile);
	* 		},
	* 		error: function(qXHR, textStatus, errorThrown){
	* 			alert(textStatus);
	* 		}
	* 	});
    * 
    */
	setPdb: function( pdb ){
		Biojs.console.log("LOADING pdb:");
		Biojs.console.log(pdb);
		
		var self = this;

		var surfaceCmd = this._getDisplaySurface( this.opt.surface );
		var styleCmd = this._getDisplayStyle( this.opt.style );
		var colorSchemeCmd = this._getDisplayColor( this.opt.colorScheme );
		
		var scr = colorSchemeCmd + styleCmd + surfaceCmd + this._getSelectionScript(this._selection); 

		jQuery('#' + self.opt.target ).find('div').show();
		jQuery("#" + self.opt.target + ' div#loadingImage').hide();
		
		if (this._jmolAppletInitialized) {
			this.reset();	
		} 
		
		this.jmolHTML = jmolAppletInline([this.opt.width, this.opt.height], pdb, scr, this.getId() );
		jQuery("div#" + self.opt.target + ' #div' + self._appletId ).html( self.jmolHTML );

		this.hideControls();
		this.showControls();
		
		this._jmolAppletInitialized = true;		
		Biojs.console.log("setPdb() ending");
	},
	
	/**
    * Reverts the highlighting of a region and removes the current selection.
    *
    * @example 
    * instance.removeSelection();
    * 
    */ 
	removeSelection: function(){
		this._selection = undefined;
        var scr = 'select all; ';
        scr += (!this._display.halos)? 'color translucent 1; ': 'selectionHalos off; ';
        scr += 'select none;'
		jmolScriptWait(scr, this.getId());
	},
	
	// function that highlights the atoms in the given region
	// has the same interface as in Dasty
	
	
   /**
    * Filters the currently provided PDB files: Only PDB files containing a part of the requested region
    * are selectable. The specified region is highlighted in the displayed PDB file.
    *
    * @example 
    * // Selection of the region in the interval [100,150].
    * instance.setSelection({start: 100, end: 150});
    * 
    * @example
    * // Selection of the positions 4, 8 and 100.
    * instance.setSelection([4,8,100]);
    * 
    * @param {Object|Array} selection Can be either a plain object or an array.  
    *        If object, it must have the fields start and end; Where "start" is greater than or equal to "end".
    *        If array, it must contain numbers representing the positions to be selected.
    */ 
	setSelection: function(selection){
		if ( selection instanceof Array ) {
			this._selection = Biojs.Utils.clone(selection);
			this._drawSelection();
			this.raiseEvent( Biojs.Protein3D.EVT_ON_SELECTION, {
				selectionType: "positions",
				selection: Biojs.Utils.clone(selection)
			});
		}
		else if ( selection instanceof Object && selection.start <= selection.end ){
			this._selection = Biojs.Utils.clone(selection);
			this._drawSelection();
			this.raiseEvent( Biojs.Protein3D.EVT_ON_SELECTION, {
				selectionType: "region",
				selection: Biojs.Utils.clone(selection)
			});
		} else {
			Biojs.console.log("selection not valid");
		}
	},

	// highlight given region
	_getSelectionScript: function(selection){
		var scr = "";
		var selectionText = "";
		
		if ( selection ){
			scr = 'select all; color translucent 1;';
			selectionText = (selection instanceof Array)? selection.join(",") : selection.start + "-" + selection.end;
			
	        if ( !this._display.halos ) {
	            scr += 'select not ' + selectionText + '; color translucent 0.8; selectionHalos off;';
	        } else {
	            scr += 'select ' + selectionText + '; selectionHalos on;';
	        }
		} else {
			scr = "select none"; 
		}
		
		Biojs.console.log("Selection script: " + scr);
		
		return scr;		
	},

	_drawSelection: function(){		
		if ( this._selection !== undefined ) {
			result = jmolScriptWait( this._getSelectionScript(this._selection), this.getId() );
			Biojs.console.log("Selection done, result: "+result); 
		} 
	},

   /**
    * Apply antialias rendering filter.
    * 
    * @param {boolean} flag If true, smooth rendering will be applied. 
    * 
    * @example 
    * instance.displayAntialias(true);
    */
	displayAntialias: function ( flag ) {
		// Update the checkbox control
		this._getControl('antialiasCheck').attr("checked", flag ); 
		// Apply the antialiasing
		this.applyJmolCommand('set antialiasDisplay '+ flag );
	},
	
   /**
    * Apply rotation.

    * @example 
    * instance.rotate(true);
    * 
    */
	rotate: function ( flag ) {
		// Update the checkbox control
		this._getControl('rotationCheck').attr("checked", flag ); 
		// Apply the rotation
		this.applyJmolCommand('spin '+ flag );
	},
	
   /**
    * Draws a translucent surface surrounding the protein.
    * 
    * @param {string} name Type of surface wanted. Use one of these: Biojs.Protein3D.SURFACE_NONE, 
    * 	Biojs.Protein3D.SURFACE_ACCESSIBLE, Biojs.Protein3D.SURFACE_EXCLUDED, Biojs.Protein3D.SURFACE_CAVITIES
    *
    * @example 
    * instance.displaySurface( Biojs.Protein3D.SURFACE_CAVITIES );
    * 
    */
	displaySurface: function ( name ) {
		
		var surfaceCmd = this._getDisplaySurface( name );
		
		if ( surfaceCmd === undefined ) {
			Biojs.console.log("Unknown surface name " + name );
			return;
		}
		
		// Update select control
		this._getControl('surfaceSelect').val(name);
		this.applyJmolCommand( surfaceCmd + this._getSelectionScript(this._selection) );
	},
	
   /**
    * Undo the action of method displaySurface.
    *
    * @example 
    * // 
    * instance.hideSurface();
    * 
    */
	hideSurface: function(){
		this.displaySurface( Biojs.Protein3D.SURFACE_NONE );
	},
	
	/**
    * Selects the acidic atoms and do coloring.
    *
    * @param {string} [color="red"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * instance.displayNegative("red");
    * 
    */
	displayNegative: function (color, flag) {
		
		color = ( color !== undefined )? color : this.opt.positiveColor;
		flag = ( flag !== undefined )? flag : true;
		
		// Update the checkbox control
		this._getControl('negativeCheck').attr("checked", flag ); 
		
		// Update the Jmol applet
		(flag) ? this.display('acidic', color) : this.undisplay('acidic');
		this._display.property.negative = flag;
		
	},
	/**
    * Undo the action of method displayNegative.
    *
    * @example 
    * // 
    * instance.hideNegative();
    * 
    */
	hideNegative: function () {
		this.displayNegative(undefined, false);
	},
	
	/**
    * Selects the basic atoms and do coloring.
    *
    * @param {string} [color="blue"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * instance.displayPositive();
    * 
    */
	displayPositive: function ( color, flag ) {
		
		color = ( color !== undefined )? color : this.opt.positiveColor;
		flag = ( flag !== undefined )? flag : true;
		
		// Update the checkbox control
		this._getControl('positiveCheck').attr("checked", flag ); 
		
		// Update the Jmol applet
		(flag) ? this.display('basic', color) : this.undisplay('basic');
		this._display.property.positive = flag;
	},
	
	/**
    * Undo the action of method displayPositive.
    *
    * @example 
    * // 
    * instance.hidePositive();
    * 
    */
	hidePositive: function () {
		this.displayPositive(undefined, false);
	},
	
	/**
    * Selects the polar atoms and do coloring.
    *
    * @param {string} [color="yellow"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * instance.displayPolar();
    * 
    */	
	displayPolar: function ( color, flag ) {
		
		polarColor = ( color !== undefined )? color : this.opt.polarColor;
		flag = ( flag !== undefined )? flag : true;
		
		// Update the checkbox control
		this._getControl('polarCheck').attr("checked", flag ); 
		
		// Update the Jmol applet
		(flag) ? this.display('polar', polarColor) : this.undisplay('polar');
		this._display.property.polar = flag;

	},
	
	_getControl: function ( name ) {
		return jQuery ( jQuery( "#"+this.opt.target ).find( '#'+name )[0] );
	},
	
	/**
    * Undo the action of method displayPolar.
    *
    * @example 
    * // 
    * instance.hidePolar();
    * 
    */	
	hidePolar: function () {
		this.displayPolar( undefined, false );
	},
	
	/**
    * Selects the polar atoms and do coloring.
    *
    * @param {string} [color="salmon"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * instance.displayUnPolar();
    * 
    */	
    // colors the structure depending on the checked check boxes
	displayUnPolar: function ( color, flag ) {
		
		color = ( color !== undefined )? color : this.opt.unpolarColor;
		flag = ( flag !== undefined )? flag : true;
		
		// Update the checkbox control
		this._getControl('unpolarCheck').attr("checked", flag ); 
		
		// Update the Jmol applet
		(flag) ? this.display('hydrophobic', color) : this.undisplay('hydrophobic');
		this._display.property.unpolar = flag;
	},
	
	
	/**
    * Selects the color scheme for the current structure.
    *
    * @param {string} colorScheme Color scheme to be applied to the current structure.
    * 	Use one of these values: Biojs.Protein3D.COLOR_BY_CHAIN, Biojs.Protein3D.COLOR_SECONDARY_STRUCTURE, 
    * 	Biojs.Protein3D.COLOR_RAINBOW, Biojs.Protein3D.COLOR_BY_ELEMENT, Biojs.Protein3D.COLOR_BY_AMINO_ACID, 
    * 	Biojs.Protein3D.COLOR_BY_TEMPERATURE, Biojs.Protein3D.COLOR_HIDROPHOBICITY
    *
    * @example 
    * instance.displayColorScheme(Biojs.Protein3D.COLOR_RAINBOW);
    * 
    */	
	displayColorScheme: function ( colorScheme ) {
		
		colorCmd = this._getDisplayColor( colorScheme );
		
		if ( colorCmd === undefined ) {
			Biojs.console.log("Unknown color scheme " + colorScheme );
			return;
		}
		
		this._getControl("colorSelect").val( colorScheme );
		this.applyJmolCommand( colorCmd + this._getSelectionScript( this._selection ) );		
	},
	/**
    * Selects the style for the current structure.
    *
    * @param {string} style Style of structure to be applied to the current structure.
    * 	Use one of these values: Biojs.Protein3D.STYLE_CARTOON, Biojs.Protein3D.STYLE_BACKBONE, Biojs.Protein3D.STYLE_CPK, 
    * 	Biojs.Protein3D.STYLE_BALL_STICK, Biojs.Protein3D.STYLE_LIGANDS, Biojs.Protein3D.STYLE_LIGANDS_POCKET
    *
    * @example 
    * instance.displayStyle( Biojs.Protein3D.STYLE_CPK );
    * 
    */	
	displayStyle: function ( style ) {
		
		var styleCmd = this._getDisplayStyle( style );
		
		if ( styleCmd === undefined ) {
			Biojs.console.log("Unknown style name " + style );
			return;
		}
		
		this._getControl("styleSelect").val( style );
		this.applyJmolCommand( styleCmd + this._getSelectionScript(this._selection) );
	},
	
	/**
    * Undo the action of method displayUnPolar.
    *
    * @example 
    * // 
    * instance.hideUnPolar();
    * 
    */
	hideUnPolar: function () {
		this.displayUnPolar( undefined, false );
	},
	
	/**
    * Enable/disable the visibility of halos for showing up the current selection. 
    * On halos off, all not selected atoms will be translucent. 
    *
    * @param {boolean} value 'true' for halos on, 'false' for halos off.  
    * 
    * @example 
    * // Sets the halos off
    * instance.setHalosVisible(false);
    * 
    */
	setHalosVisible: function (value) {
		this._display.halos = value;
		if (value) {
			if ( ! jQuery("#"+this.opt.target).find('#halosRadio:checked').val()  ) {
				jQuery("#"+this.opt.target).find('#halosRadio').attr("checked","halosRadio");
				jQuery("#"+this.opt.target).find('#translucentRadio').removeAttr("checked");
			}
		} else {
			if ( jQuery("#"+this.opt.target).find('#halosRadio:checked').val() ) {
				jQuery("#"+this.opt.target).find('#halosRadio').removeAttr("checked");
				jQuery("#"+this.opt.target).find('#translucentRadio').attr("checked","translucentRadio");
			}			
		}
		
		this._drawSelection();
	},
	
	/**
    * Apply a script to the Jmol applet that currently are displayed 
    * 
    * @example
    * // Rotate one time in X-axis.
    * instance.applyJmolCommand('select all; cartoon off; meshribbons on;');
    * 
    * @param {string} The Jmol script.  
    */
	applyJmolCommand: function(cmd){
		jmolScriptWait(cmd, this.getId());
	},
	
	/**
    * Select and coloring atoms. 
    * 
    * @example
    * // Select hetero atoms and coloring with the RGB triplet code [xFF0088].  
    * instance.display("hetero","[xFF0088]");
    * 
    * @param {string} The color. Refer to the Jmol documentation for availables coloring schemes.  
    */
	display: function(property, color) {
		scr = (this._isAnyDisplayed())? '' : 'select all; color lightgrey;';
		scr += 'select '+property+';color '+color+'; select none';
		
		jmolScriptWait(scr, this.getId());
		Biojs.console.log("applied: "+scr);
		
		this._drawSelection();
	},
	
	/**
    * Select and coloring atoms. 
    * 
    * @example
    * // Select hetero atoms and coloring with the RGB triplet code [xFF0088].  
    * instance.changeBackgroundColor("[xFF0088]");
    * 
    * @param {string} color Refer to the Jmol documentation for availables coloring schemes.  
    */
	changeBackgroundColor: function ( color ) {
		this.applyJmolCommand('background '+ ( ( color !== undefined )? color : this.opt.backgroundColor) );
	},
	
	/**
    * Select and remove the coloring atoms.
    * 
    * @example
    * // Select hetero atoms and remove the coloring .  
    * instance.undisplay("hetero");
    * 
    * @param {string} The Jmol script.  
    */
	undisplay: function( property ) {
		scr = 'select '+property+';color lightgrey; select none;'
		scr += (this._isAnyDisplayed())? '' : 'select all; color chain; select none;';
		
		jmolScriptWait(scr, this.getId());
		Biojs.console.log("applied: "+scr);
		
		this._drawSelection();
	},
	
	_isAnyDisplayed: function(){
		for ( var key in this._display.property ){
			if ( this._display.property[key] ) {
				return true;
			}
		}
		return false;
	},
	
	_buildControls : function () {
		if ( this._controlsReady ) {
			return;
		}
		
		this._controlsVisible = false;
		
		Biojs.console.log("_buildControls()");
		
		var self = this;
		var width = Math.round(self.opt.width * 0.3); 
		var height = self.opt.height; 
		
		var controlSectionDiv = jQuery("#"+self.opt.target+" > div#controlSection");
		
		controlSectionDiv.append('<div id="controls" />'+
				'<div id="controlTab">'+
				'<span id="hideButton" title="Hide this control panel">&lt;&lt;</span>'+
				'<span id="showButton" title="Show the control panel">&gt;&gt;</span><br/><br/></div>')
			.css("border", 0)
			.css("margin", 0)
			.css("width",  "auto")
			.css("height", "auto")
			.css('float', 'left')
			.css('font-family','"Heveltica Neue", Arial, "sans serif"')
			.css('font-size','12px');
		
		// Measurements 
		// 
		var padding = 3;
		var tabWidth = 20, tabHeight = height;
		var controlsWidth = width - (2*padding+tabWidth), controlsHeight = height - (padding*2);
		
		//
		// Panel 
		// 
		var controlDiv = controlSectionDiv.find("div#controls");
		
		controlDiv.css({
				"position": "relative",
				"border": 0,
				"margin":  0,
				"background-color": "#000",
				"color": "#fff",
				"float": "left",
				"width": controlsWidth,
				"height": controlsHeight,
				"padding": padding,
				"text-align": "left",
				"line-height": 1,
				"text-shadow": 0
			})
			.append(
				'<b> Display: </b><br/>' +
				'<input id="polarCheck" type="checkbox" name="polarCheck" value="polarCheck"/> Hydrophylic residues<br/>' +
				'<input id="unpolarCheck" type="checkbox" name="unpolarCheck" value="unpolarCheck"/> Hydrophobic residues<br/>' +
				'<input id="positiveCheck" type="checkbox" name="positiveCheck" value="positiveCheck"/> Basic(+) residues<br/>' +
				'<input id="negativeCheck" type="checkbox" name="negativeCheck" value="negativeCheck"/> Acidic(-) residues<br/>' +
				'<input id="antialiasCheck" type="checkbox" name="antialiasCheck" value="antialiasCheck"/> Antialias<br/>'+
				'<input id="backgroundCheck" type="checkbox" name="backgroundCheck" value="backgroundCheck"/> Black background<br/>'+
				'<input id="rotationCheck" type="checkbox" name="rotationCheck" value="rotationCheck"/> Rotation<br/><br/>'+
				
				'Style: <select id="styleSelect">'+
					'<option selected="selected">' + Biojs.Protein3D.STYLE_CARTOON + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_BACKBONE + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_CPK + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_BALL_STICK + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_LIGANDS + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_LIGANDS_POCKET + '</option>'+
				'</select><br/><br/>'+
				
				'Color: <select id="colorSelect">'+			
					'<option selected="selected">' + Biojs.Protein3D.COLOR_BY_CHAIN + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_SECONDARY_STRUCTURE + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_RAINBOW + '</option>'+					
					'<option >' + Biojs.Protein3D.COLOR_BY_ELEMENT + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_BY_AMINO_ACID + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_BY_TEMPERATURE + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_HIDROPHOBICITY + '</option>'+
				'</select><br/><br/>'+

				'Surface: <select  id="surfaceSelect">'+
					'<option selected="selected">' + Biojs.Protein3D.SURFACE_NONE + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_ACCESSIBLE + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_EXCLUDED + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_CAVITIES + '</option>'+
				'</select><br/>'+
				
		        '<br/><b> Show selection using: </b><br/>' +
		        '<input id="translucentRadio" type="radio" name="selection" value="translucentRadio"/> Translucent ' +
		        '<input id="halosRadio" type="radio" name="selection" value="halosRadio" checked="halosRadio"/> Halos<br/><br/>');
		
		controlDiv.find('#polarCheck').click( function( e ) {	
			self.displayPolar( undefined, e.target.checked );
		});

		controlDiv.find('#unpolarCheck').click(function( e ) {	
			self.displayUnPolar( undefined, e.target.checked );
		});
		
		controlDiv.find('#positiveCheck').click( function ( e ){
			self.displayPositive( undefined, e.target.checked );
		});
		
		controlDiv.find('#negativeCheck').click( function ( e ){
			self.displayNegative( undefined, e.target.checked );
		});
		
		controlDiv.find('#antialiasCheck').click( function(event) {
			self.displayAntialias( event.target.checked );
		});
		
		controlDiv.find('#rotationCheck').click( function(event) {
			self.rotate( event.target.checked );
		});

		controlDiv.find('#backgroundCheck').click( function( e ) {
			self.changeBackgroundColor( "black", e.target );
		});
		
		controlDiv.find('#styleSelect').change( function( e ){
			self.displayStyle( e.target.value );
		});
		
		controlDiv.find('#colorSelect').change( function( e ){
			self.displayColorScheme( e.target.value );
		});
		
		controlDiv.find('#surfaceSelect').change( function( e ){
			self.displaySurface( e.target.value );
		});
		
		
//		controlDiv.find('#exportImageButton').click( function(event){
//			self.applyJmolCommand( 'write IMAGE y '+self.opt.pdbId+'.jpg ;' );
//		});
	
		controlDiv.find('input[name="selection"]').change(function(){
			var showHalos = ( jQuery('#halosRadio:checked').val() )? true: false;
	    	self.setHalosVisible(showHalos);
	    });
		
		// 
		// Tab
		//
		var showHideTab = controlSectionDiv.find('#controlTab');

		showHideTab.css("border", 0)
			.css("margin", 0)
			.css("padding", 0)
			.css("float", "left")
			.css("width", tabWidth)
			.css("height", tabHeight)
			.css('background-color', "#000");
		
		/**
		 * @private
		 * @function
		 */
		// This function will hide/show the control panel
		var toggleControls = function (){
			
			showHideTab.find("span").toggle();
			
			if (self._controlsVisible) {
				var appletWidth = self.opt.width - tabWidth;
				jmolResizeApplet([appletWidth, self.opt.height], self.getId());
				jQuery('#div'+self._appletId).css("width", appletWidth);
				controlDiv.hide();
				showHideTab.css('background-color', self.opt.backgroundColor);
				self._controlsVisible = false;
                jQuery('#hideButton').toggle(false);
                jQuery('#showButton').toggle(true);
			} else {
				var appletWidth = self.opt.width - width;
				jmolResizeApplet([appletWidth, self.opt.height], self.getId());
				jQuery('#div'+self._appletId).css("width", appletWidth);
				controlDiv.show();
				showHideTab.css('background-color', "#000");
				self._controlsVisible = true;
                jQuery('#hideButton').toggle(true);
                jQuery('#showButton').toggle(false);
			}
		}
		
		self._toggleControls = toggleControls;
		
		showHideTab.find('#hideButton')
			.click( self._toggleControls )
			.mouseover(function(){
				jQuery(this).css("color","#27C0FF");
			})
			.mouseout(function(){
				jQuery(this).css("color","#fff");
			})
			.css("color","#fff")
			.css("display","none")
			.css("cursor","pointer");
		
		showHideTab.find('#showButton')
			.click( self._toggleControls )
			.mouseover(function(){
				jQuery(this).css("color","#27C0FF");
			})
			.mouseout(function(){
				jQuery(this).css("color","#000");
			})
			.css("color","#000")
			.css("cursor","pointer");
		
		this._controlsReady = true;
		
		Biojs.console.log("_buildControls done");
	}, 
	
	_addControl: function(html){
		jQuery('#' + this.opt.target + ' div#controls').append( html );
	},
	
	_getDisplayStyle: function ( text ) {
	   if (text == Biojs.Protein3D.STYLE_CARTOON ) {
			
		  return "hide null; select all;  spacefill off; wireframe off; backbone off;" +
					" cartoon on; " +
	 				" select ligand; wireframe 0.16;spacefill 0.5; color cpk; " +
	 				" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    } 
	    else if (text == Biojs.Protein3D.STYLE_BACKBONE ) {
		    
	    	return "hide null; select all; spacefill off; wireframe off; backbone 0.4;" +
					" cartoon off; " +
	 				" select ligand; wireframe 0.16;spacefill 0.5; color cpk; " +
	 				" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    	
	    } else if (text == Biojs.Protein3D.STYLE_CPK ) {
		    
	    	return "hide null; select all; spacefill off; wireframe off; backbone off;" +
					" cartoon off; cpk on;" +
	 				" select ligand; wireframe 0.16;spacefill 0.5; color cpk; " +
	 				" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    	
	    } 
	    else if (text == Biojs.Protein3D.STYLE_LIGANDS ) {
	    	return "restrict ligand; cartoon off; wireframe on;  display selected;"+
	    			" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    }

	    else if (text == Biojs.Protein3D.STYLE_LIGANDS_POCKET ) {
	    	return " select within (6.0,true, ligand; cartoon off; wireframe on; backbone off; display selected; " +
	    			" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    } 
	    else if (text == Biojs.Protein3D.STYLE_BALL_STICK ) {
		    
	    	return "hide null; restrict not water;  wireframe 0.2; spacefill 25%;" +
					" cartoon off; backbone off; " +
	 				" select ligand; wireframe 0.16; spacefill 0.5; color cpk; " +
	 				" select *.FE; spacefill 0.7; color cpk ; " +
	 				" select *.CU; spacefill 0.7; color cpk ; " +
	 				" select *.ZN; spacefill 0.7; color cpk ; " +
	 				" select all; ";
	    	
	    } else {
			return undefined;
		}
	},
	
	_getDisplayColor: function ( text ) {
		if ( text == Biojs.Protein3D.COLOR_BY_CHAIN ) {
			return "hide null; select all; cartoon on; wireframe off; spacefill off; color chain; select ligand; wireframe 0.16; spacefill 0.5; color chain ; select all; "; 
		 }
		else if ( text == Biojs.Protein3D.COLOR_BY_TEMPERATURE ) {
		 	return "hide null; select all;spacefill off; wireframe off; backbone 0.4; cartoon off; set defaultColors Jmol; color relativeTemperature; color cartoon relateiveTemperature select ligand;wireframe 0.16;spacefill 0.5; color cpk ;; select all; " ;
		 }
		else if ( text == Biojs.Protein3D.COLOR_RAINBOW ){
			return "hide null; select all; set defaultColors Jmol; color group; color cartoon group; select ligand;wireframe 0.16;spacefill 0.5; color cpk ; select all; " ;
		} 
		else if ( text == Biojs.Protein3D.COLOR_SECONDARY_STRUCTURE ){
			return "hide null; select all; set defaultColors Jmol; color structure; color cartoon structure;select ligand;wireframe 0.16;spacefill 0.5; color cpk ;; select all; " ;					
		} 
		else if ( text == Biojs.Protein3D.COLOR_BY_ELEMENT ){
			return "hide null; select all; set defaultColors Jmol; color cpk; color cartoon cpk; select ligand;wireframe 0.16; spacefill 0.5; color cpk ; select all; " ;
		}
		else if ( text == Biojs.Protein3D.COLOR_BY_AMINO_ACID ){
			return "hide null; select all; set defaultColors Jmol; color amino; color cartoon amino; select ligand;wireframe 0.16;spacefill 0.5; color cpk ;; select all; " ;
		}
		else if ( text == Biojs.Protein3D.COLOR_HIDROPHOBICITY ){
			return "hide null; set defaultColors Jmol; select hydrophobic; color red; color cartoon red; select not hydrophobic ; color blue ; color cartoon blue; select ligand;wireframe 0.16;spacefill 0.5; color cpk ;; select all; " ;
		} else {
			return undefined;
		}
	},
	
	_getDisplaySurface: function ( text ) {
		 if ( text == Biojs.Protein3D.SURFACE_NONE ){
			return "select all; isosurface off; select none;";
		 }
		 else if ( text == Biojs.Protein3D.SURFACE_ACCESSIBLE ){
			return "select all; isosurface sasurface 1.2; color isoSurface translucent 0.8; select none;";
		 }
		 else if ( text == Biojs.Protein3D.SURFACE_EXCLUDED ){
			return "select all; isosurface solvent 1.2; color isoSurface translucent 0.8; select none;";
		 }
		 else if ( text == Biojs.Protein3D.SURFACE_CAVITIES ){
			return "select all; isosurface cavity 1.2 10; color isoSurface translucent 0.8; select none;";
		 } else {
			 return undefined;
		 }
	},
	
	toString: function() { 
		return "Biojs.Protein3D";
	},
	/* 
     * Function: Biojs.Protein3D._loadStructCallback
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
		
		switch (code) {
			case 3  : result = 'success'; break;		
			case 0  : result = 'zapped'; break; 
			case -1 : result = 'failure'; break;
			default : result = 'undefined'; break;
		}
		
		// Ignore the execution of the callback on replacing pdb file.
		if ( "zapped" != result ) {
			var instanceId = parseInt( appletId.replace("jmolApplet",'') );
			var instance = Biojs.getInstance(instanceId);
	
			instance.raiseEvent(Biojs.Protein3D.EVT_ON_PDB_LOADED, {
				"file": title,
				"result": result,
				"message": message
			});

		}
		
		if ( "success" == result ) {
			instance.showControls();
			instance.displayAntialias(instance.opt.antalias);
			instance.rotate(instance.opt.rotate);
		} 

	}
	

},{
	//
	// Coloring Schemes
	//
	COLOR_BY_CHAIN: "By Chain",
	COLOR_SECONDARY_STRUCTURE: "Secondary Structure",
	COLOR_RAINBOW: "Rainbow",
	COLOR_BY_ELEMENT: "By Element",
	COLOR_BY_AMINO_ACID: "By Amino Acid",
	COLOR_BY_TEMPERATURE: "By Temperature",
	COLOR_HIDROPHOBICITY: "Hidrophobicity",
	//
	// Surfaces 
	//
	SURFACE_NONE: "None",
	SURFACE_ACCESSIBLE: "Solvent Accessible",
	SURFACE_EXCLUDED: "Solvent Excluded",
	SURFACE_CAVITIES: "Cavities",
	//
	// Drawing Style 
	//
	STYLE_CARTOON: "Cartoon",
	STYLE_BACKBONE: "Backbone",
	STYLE_CPK: "CPK",
	STYLE_BALL_STICK: "Ball and Stick",
	STYLE_LIGANDS: "Ligands",
	STYLE_LIGANDS_POCKET: "Ligands and Pocket",
	//
	// Events
	// 
	EVT_ON_PDB_LOADED: "onPdbLoaded",
	EVT_ON_SELECTION: "onSelection"
});
