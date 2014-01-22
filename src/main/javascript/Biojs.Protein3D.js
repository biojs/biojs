/** 
 * Pdb file 3D viewer component using JMol
 * 
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, <a href="mailto:christine.jandrasits@gmail.com">Christine Jandrasits</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='http://jmol.sourceforge.net/download/'>jMol 12.0.48</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jmol-12.0.48/Jmol.js"></script>
 * 
 * @requires <a href='../biojs/css/Protein3D.css'>Protein3D CSS</a>
 * @dependency <link href="../biojs/css/biojs.Protein3D.css" rel="stylesheet" type="text/css" />
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
 *    Height in pixels.
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
 * // 'http://www.ebi.ac.uk/pdbe/entry-files/pdb1wq6.ent' through the local proxy 'proxy.php'.
 * // Note that instance.setPdb(data) is invoked once the data have been arrived. 
 * jQuery.ajax({
 * 		url: '../biojs/dependencies/proxy/proxy.php',
 * 		data: 'url=http://www.ebi.ac.uk/pdbe/entry-files/pdb1wq6.ent',
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

		var self = this;
		
		var width = this.opt.width;
		var height = this.opt.height;
		
		this._appletId = "jmolApplet" + self.getId();
		
		this._container = jQuery('#' + this.opt.target).addClass('Protein3D');
		
		// Container Width 
		if ( width == undefined ) {
			width = this._container.css('width');
			
		} else {
			this._container.width( width );
		}
		
		// Container Height
		if ( height == undefined ) {
			height = this._container.css('height');
			
		} else {
			this._container.height( height );
		}

		this.opt.backgroundColor = ( this.opt.backgroundColor !== undefined )? this.opt.backgroundColor : this._container.css('background-color');

		this._container.html('');
		
		this._controlsContainer = jQuery('<div id="controlSection" class="Protein3D_tab"></div>')
			.appendTo( this._container );
		
		this._appletContainer = jQuery('<div id="div'+self._appletId+'" class="Protein3D_applet"></div>')
			.appendTo( this._container );
		
		this._loadingImage = jQuery('<div class="Protein3D_loadingImage" />')
			.appendTo( this._container )
			.hide();

		if (this.opt.loadingStatusImage !== undefined ) {
			this._loadingImage.css( 'background-image', 'url(' + this.opt.loadingStatusImage + ')' );
		}
		
		this._initializeJmolApplet();
		
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
	   loadingStatusImage: undefined,
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
   _jmoljarfile: "JmolApplet.jar",
   _jmolAppletInitialized: false,
   _selection: undefined,
   _selectionType: undefined,

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

   
   _initializeJmolApplet: function() {
	   
	   var self = this;
	   
	   jmolInitialize( self.opt.jmolFolder );
	   jmolSetAppletColor( self.opt.backgroundColor );
	   jmolSetDocument(0);
		
	   // Jmol needs a global function for executing up whenever a pbd is loaded
	   // Name for the function in global scope
	   var functionCbName = self._appletId + "_pdbLoadCb";
		
	   Biojs.console.log("registring callback function loadStructCallback " + functionCbName);
		
	   // Register the function this._loadStructCallback as global for JmolApplet use 
	   Biojs.registerGlobal( functionCbName , self._loadStructCallback );
		
	   // Tell Jmol the name of the function in global scope
	   jmolSetCallback("loadStructCallback", functionCbName );
   },
   
   /**
    * Shows the form of controls.
    * 
    * @example 
    * instance.showControls(); 
    * 
    */
   showControls: function() {
	   this.changeControlsVisiblility(true);
   },
   
   /**
    * Hides the form of controls.
    * 
    * @example 
    * instance.hideControls(); 
    * 
    */
   hideControls: function() {
	   this.changeControlsVisiblility(false);
   },
   
   /**
    * Shows/Hides the form of controls.
    * 
    * @example 
    * instance.changeControlsVisiblility(true); 
    * 
    */
   changeControlsVisiblility: function( flag ) {
	   
	   if (this.opt.enableControls) {
		   
		   if (!this._controlsReady) {
			   this._buildControls();
		   }
		   
		   if ( flag != this._controlsAreVisible() ) {
			   this._toggleControls();
		   }
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
		theTargetDiv.find('#styleSelect').val( this.opt.style );
		theTargetDiv.find('#colorSelect').val( this.opt.colorScheme );
		theTargetDiv.find('#surfaceSelect').val( this.opt.style );

		for (var key in this._display.property) {
			this._display.property[key] = false;
		}
		
		this.setHalosVisible(true);
	},
	
	showLoadingImage: function(flag){
		var visible = (flag === undefined) ? true: flag;

		// Toggle loading image if its status is different than flag
		if ( this._loadingImage.is(':visible') != visible ) {
			this._controlsContainer.toggle();
			this._appletContainer.toggle();
			this._loadingImage.toggle();
		}
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
	* 		data: 'url=http://www.ebi.ac.uk/pdbe/entry-files/pdb3u01.ent',
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
		Biojs.console.log("LOADING pdb content");
		//Biojs.console.log(pdb);
		
		var self = this;
		var surfaceCmd = this._getDisplaySurface( this.opt.surface );
		var styleCmd = this._getDisplayStyle( this.opt.style );
		var colorSchemeCmd = this._getDisplayColor( this.opt.colorScheme );
		
		var scr = colorSchemeCmd + styleCmd + surfaceCmd + this._getSelectionScript( this._selection ); 

		this.showLoadingImage(false);
		
		if ( this._jmolAppletInitialized ) {
			this.reset();	
		}
		
		htmlContent = jmolAppletInline([self._appletContainer.width(), self._appletContainer.height()], pdb, scr, self.getId() );
		
		this._appletContainer.html( htmlContent );
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
    * @example
    * // Selection from 51 to 60, 87, and from 101 to 110
    * instance.setSelection([{start:51,end:60},87,{start:101,end:110}]);
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
                selectionType: this._selectionType,
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
        var singleRegion = false;
        var regionInSelection = false;
        var positionInSelection = false;

        if ( selection ){
			scr = 'select all; color translucent 1;';
			//selectionText = (selection instanceof Array)? selection.join(",") : selection.start + "-" + selection.end;
            if (selection instanceof Array) {
                for (i = 0; i < selection.length; i++) {
                    if (selection[i] instanceof Object) {
                        selectionText = selectionText + selection[i].start + "-" + selection[i].end;
                        regionInSelection = true;
                    } else {
                        selectionText = selectionText + selection[i];
                        positionInSelection = true;
                    }
                    if (i != (selection.length-1)) {
                        selectionText = selectionText + ",";
                    }
                }
            } else {
                selectionText = selection.start + "-" + selection.end;
                singleRegion = true;
            }

            if ( !this._display.halos ) {
                scr += 'select not ' + selectionText + '; color translucent 0.8; selectionHalos off;';
            } else {
                scr += 'select ' + selectionText + '; selectionHalos on;';
            }
        } else {
            scr = "select none";
        }
        Biojs.console.log("Selection script: " + scr);
        if (singleRegion == true) {
            this._selectionType = "region";
        } else if ((regionInSelection == true) && (positionInSelection == true)) {
            this._selectionType = "mixed";
        } else if ((regionInSelection == true) && (positionInSelection == false)) {
            this._selectionType = "multipleRegion";
        } else if ((regionInSelection == false) && (positionInSelection == true)) {
            this._selectionType = "positions";
        } else {
            this._selectionType = "region";
        }
        Biojs.console.log("Selection type: " + this._selectionType);
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
	
	_buildTabPanel: function( container, onVisibilityChangeCb ) {

        container.html('');

        var content = jQuery('<div class="content"></div>').appendTo(container);
        content.expand = jQuery('<div style="display: none;" class="toggle expand"></div>').appendTo(container);
        content.collapse = jQuery('<div class="toggle collapse"/>').appendTo(container);

        var contentWidth = container.width() - content.expand.outerWidth();

        container.css( 'left', 0 )
            .find('.toggle.collapse')
            .click( function(){
                // Animate show/hide this tab
                container.animate({
                        left: ( content.expand.width() - container.outerWidth() ) + "px"
                    },
                    // to call once the animation is complete
                    function() {

                        container.find('.toggle').toggle();

                        // apply callback function if defined
                        if ( "function" == typeof onVisibilityChangeCb ) {
                            onVisibilityChangeCb.call( content, false, content.expand.outerWidth() );
                        }

                        content.hide();
                        container.css( {left: '0px', width: 'auto'});

                    }
                );
            })
            .css({
                'float':'right',
                'position':'relative'
            });

        container
            .find('.toggle.expand')
            .click( function(){

                container.css({ left: ( -contentWidth ) + "px" });
                content.show();

                container.animate({
                        left: '0px'
                    },
                    function() {
                        container.find('.toggle').toggle();

                        // apply callback function if defined
                        if ( "function" == typeof onVisibilityChangeCb ) {
                            onVisibilityChangeCb.call( content, true, container.outerWidth() );
                        }
                    }
                );
            });

        Biojs.console.log('content width '+ contentWidth);

        content.css({
            'width': contentWidth + "px",
            'height': container.height() + "px",
            'word-wrap': 'break-word'
        });

        return content;
    },
	
	_buildControls : function () {
		Biojs.console.log("_buildControls()");
		
		if ( this._controlsReady ) {
			Biojs.console.log("exiting _buildControls(): controls has been built already.");
			return;
		}
		
		var self = this;
		
		jmolResizeApplet([ self._container.width() - self._controlsContainer.outerWidth(), self._container.height()], self.getId());
		
		this._controlsDiv = this._buildTabPanel( 
			this._controlsContainer, 
			function ( isVisible, visibleWidth ) {
				jmolResizeApplet([ self._container.width() - visibleWidth, self._container.height()], self.getId());
				self._appletContainer.css("width", self._container.width() - visibleWidth );
			}
		);

		var controlDiv = this._controlsDiv.append(
				'<h1> Display: </h1>' +
				'<input id="polarCheck" type="checkbox" name="polarCheck" value="polarCheck"/> Hydrophylic residues<br/>' +
				'<input id="unpolarCheck" type="checkbox" name="unpolarCheck" value="unpolarCheck"/> Hydrophobic residues<br/>' +
				'<input id="positiveCheck" type="checkbox" name="positiveCheck" value="positiveCheck"/> Basic(+) residues<br/>' +
				'<input id="negativeCheck" type="checkbox" name="negativeCheck" value="negativeCheck"/> Acidic(-) residues<br/>' +
				'<input id="antialiasCheck" type="checkbox" name="antialiasCheck" value="antialiasCheck"/> Antialias<br/>'+
				'<input id="backgroundCheck" type="checkbox" name="backgroundCheck" value="backgroundCheck"/> Black background<br/>'+
				'<input id="rotationCheck" type="checkbox" name="rotationCheck" value="rotationCheck"/> Rotation'+
				
				'<h1>Style:</h1><select id="styleSelect">'+
					'<option selected="selected">' + Biojs.Protein3D.STYLE_CARTOON + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_BACKBONE + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_CPK + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_BALL_STICK + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_LIGANDS + '</option>'+
					'<option >' + Biojs.Protein3D.STYLE_LIGANDS_POCKET + '</option>'+
				'</select>'+
				
				'<h1>Color:</h1><select id="colorSelect">'+			
					'<option selected="selected">' + Biojs.Protein3D.COLOR_BY_CHAIN + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_SECONDARY_STRUCTURE + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_RAINBOW + '</option>'+					
					'<option >' + Biojs.Protein3D.COLOR_BY_ELEMENT + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_BY_AMINO_ACID + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_BY_TEMPERATURE + '</option>'+
					'<option >' + Biojs.Protein3D.COLOR_HIDROPHOBICITY + '</option>'+
				'</select>'+

				'<h1>Surface:</h1><select  id="surfaceSelect">'+
					'<option selected="selected">' + Biojs.Protein3D.SURFACE_NONE + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_ACCESSIBLE + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_EXCLUDED + '</option>'+
					'<option >' + Biojs.Protein3D.SURFACE_CAVITIES + '</option>'+
				'</select>'+
				
		        '<h1> Show selection using:</h1>' +
		        '<input id="translucentRadio" type="radio" name="selection" value="translucentRadio"/> Translucent ' +
		        '<input id="halosRadio" type="radio" name="selection" value="halosRadio" checked="halosRadio"/> Halos')
		       
        .change( function ( e ) {
        	
        	var targetId = jQuery(e.target).attr('id');
        	
        	switch ( targetId )	{
	        	case "polarCheck": 
	        		self.displayPolar( undefined, e.target.checked );
	        		break;
	        	case "unpolarCheck":
	        		self.displayUnPolar( undefined, e.target.checked );
	        		break;
	        	case "positiveCheck":
	        		self.displayPositive( undefined, e.target.checked ); 
	        		break;
	        	case "negativeCheck": 
	        		self.displayNegative( undefined, e.target.checked );
	        		break;
	        	case "antialiasCheck":
	        		self.displayAntialias( event.target.checked );
	        		break;
	        	case "rotationCheck":
	        		self.rotate( event.target.checked );
	        		break;
	        	case "backgroundCheck":
	        		self.changeBackgroundColor( "black", e.target );
	        		break;
	        	case "styleSelect":
	        		self.displayStyle( e.target.value );
	        		break;
	        	case "colorSelect":
	        		self.displayColorScheme( e.target.value );
	        		break;
	        	case "surfaceSelect":
	        		self.displaySurface( e.target.value );
	        		break;
	        	case "translucentRadio":
	        		self.setHalosVisible(false);
	        		break;
	        	case "halosRadio":
	        		self.setHalosVisible(true);
	        		break;
	        	default: 
	        		;
        	}
        	
        });

		this._controlsReady = true;
		
		Biojs.console.log("_buildControls done");
	}, 
	
	_controlsAreVisible: function () {
		return this._controlsContainer.find('.toggle.collapse').is(':visible');
	},
	
	_toggleControls: function(){
		
		if ( this._controlsAreVisible() ) {
			this._controlsContainer.find('.toggle.collapse').click();
		} else {
			this._controlsContainer.find('.toggle.expand').click();
		}
	},
	
	_addControl: function(html){
		this._controlsDiv.append( html );
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
	    	return " select within (6.0, true, ligand); cartoon off; wireframe on; backbone off; display selected; " +
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
			var instanceId = parseInt( appletId.replace("jmolApplet",'') );
			var instance = Biojs.getInstance(instanceId);
	
			if ( "success" == result ) {
				instance.showControls();
				instance.displayAntialias(instance.opt.antialias);
				instance.rotate(instance.opt.rotate);
			}
			
			instance.raiseEvent(Biojs.Protein3D.EVT_ON_PDB_LOADED, {
				"file": title,
				"result": result,
				"message": message
			});

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
