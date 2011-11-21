/** 
 * Pdb file 3D viewer component using JMol
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://jmol.sourceforge.net/download/'>jMol 12.0.48</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jmol-12.0.48/Jmol.js"></script>
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, based on the code made 
 * by <a href="mailto:christine.jandrasits@gmail.com">Christine Jandrasits</a>
 * 
 * @param {Object} options An object with the options for Biojs.PdbViewer component.
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
 * @option {string} [jmolFolder="biojs/dependencies/jmol-12.0.48"] 
 *    The relative path of the jMol library.
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
 * @example 
 * var myPdbViewer = new Biojs.PdbViewer({
 * 		target: 'YourOwnDivId'
 * });	
 * 
 * 
 * 
 * // Example of loading a pdb file by means a HTTP request.
 * // Note that myPdbViewer.setPdb(data) receives the data as argument,
 * // no matter the source where came up. 
 * $.ajax({
 * 		url: '../biojs/dependencies/proxy/proxy.php',
 * 		data: 'url=http://www.ebi.ac.uk/pdbe-srv/view/files/3nuc.pdb',
 * 		dataType: 'text',
 * 		success: function(pdbFile){
 * 			myPdbViewer.setPdb(pdbFile);
 * 		},
 * 		error: function(qXHR, textStatus, errorThrown){
 * 			alert(textStatus);
 * 		}
 * 	});
 * 
 */
Biojs.PdbViewer = Biojs.extend(
/** @lends Biojs.PdbViewer# */
{ 
	constructor: function (options) {
		//constructor of Biojs.PdbViewer
		Biojs.console.log("starting Biojs.PdbViewer constructor");
		
		var self = this;
		
		jmolInitialize(this.opt.jmolFolder);
		jmolSetAppletColor( (this.opt.backgroundColor)? this.opt.backgroundColor : "white");
		jmolSetDocument(0);
		
		Biojs.console.log("registring callback for object " + this.getId());
		
		this._appletId = "jmolApplet" + this.getId();
		var loadStructCallbackName = this._appletId+"_pdbLoadCallback";
		
		Biojs.registerGlobal(this._appletId,this);
		Biojs.registerGlobal(loadStructCallbackName, 
				function ( appletId, url, file, title, message, code, formerFrame, frame ) {
					if ( Biojs.getGlobal(appletId).opt.enableControls ) {
						Biojs.getGlobal(appletId).showControls();
					}
					if (file!==null) {
						window[appletId].raiseEvent("onPdbLoaded", {
							file: title,
							result: (code==3)? 'success' : 'failure',
							message: message
						});
					}
				});
		
		jmolSetCallback("loadStructCallback", loadStructCallbackName );
		
		$("#"+this.opt.target).css("padding","0px");
		$("#"+this.opt.target).css("width",this.opt.width);
		$("#"+this.opt.target).css("height",this.opt.height);
		$("#"+this.opt.target).css("overflow","hidden");
		$("#"+this.opt.target).html(
			'<div id="div'+this._appletId+'" style="position:relative; float:right;"/>'+
			'<div id="controlSection" style="position:relative; float:right;"/>'
		);
		
		Biojs.console.log("ending Biojs.PdbViewer constructor");
   },
   
   /** 
    * Default options (and its values) for the PdbViewer component. 
    * @name Biojs.PdbViewer-opt
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
	   enableControls: true
   },
   
   /**
	 * Array containing the supported event names
	 * @name Biojs.PdbViewer-eventTypes
	 */
	eventTypes : [
		/**
		 * @name Biojs.PdbViewer#onPdbLoaded
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} file The name of the loaded file.
		 * @eventData {string} result A string with either value 'success' or 'failure'.
		 * @eventData {string} message Error message in case of result be 'failure'.
		 * 
		 * @example 
		 * myPdbViewer.onPdbLoaded(
		 *    function( objEvent ) {
		 *       alert( (objEvent.result == "success")? "Pdb file "+ objEvent.file+" loaded."  : objEvent.message );
		 *    }
		 * ); 
		 * 
		 * */
		"onPdbLoaded",
		/**
		 * @name Biojs.PdbViewer#onSelection
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} selectionType String with either value 'region' or 'positions'.
		 * @eventData {Object|Array} selection If the type of selection is a region, this will be a Object 
		 * 							with attributes 'start' and 'end'. In other case, this will be an array 
		 * 						    containing the selected positions.
		 * 
		 * @example 
		 * myPdbViewer.onSelection(
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
    * myPdbViewer.showControls(); 
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
    * myPdbViewer.hideControls(); 
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
    * var selection = myPdbViewer.getSelection(); 
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
    * Resets all selected regions or positions and removes the displayed PDB file from the applet.
    *
    * @example myPdbViewer.reset(); 
    */
	reset: function(){
		jmolScriptWait('select all; cartoon on; wireframe off; spacefill off; color chain; select none;');
		
		for (var key in this._display.property) {
			this._display.property[key] = false;
		}
		
		this.hideSurface();
		this.removeSelection();
		this.setHalosVisible(true);
	},
	
	   
   /**
    * Sets the pdb file to be displayed.
    * Also triggers the event that a new pdb file was loaded.
    *
    * @example 
    * $.ajax({
	* 		url: '../biojs/dependencies/proxy/proxy.php',
	* 		data: 'url=http://www.ebi.ac.uk/pdbe-srv/view/files/1j3s.pdb',
	* 		dataType: 'text',
	* 		success: function(pdbFile){
	* 			myPdbViewer.setPdb(pdbFile);
	* 		},
	* 		error: function(qXHR, textStatus, errorThrown){
	* 			alert(textStatus);
	* 		}
	* 	});
    * 
    */
	setPdb: function( pdb ){
		Biojs.console.log("setPdb() starting");
		
		var scr = 'select all; cartoon on; wireframe off; spacefill off; color chain; select none;'
		
		if (this._jmolAppletInitialized) {			
			jmolLoadInlineScript(pdb, scr);
			
		} else {
			html = jmolAppletInline([this.opt.width, this.opt.height], pdb, scr, this.getId() );
			$("div#div"+this._appletId).html(html);
		}
		this._jmolAppletInitialized = true;		
		Biojs.console.log("setPdb() ending");
	},
	
	/**
    * Reverts the highlighting of a region and removes the current selection.
    *
    * @example 
    * myPdbViewer.removeSelection();
    * 
    */ 
	removeSelection: function(){
		this._selection = undefined;
        var scr = 'select all; ';
        scr += (!this._display.halos)? 'color translucent 1; ': 'selectionHalos off; ';
        scr += 'select none;'
		jmolScriptWait(scr);
	},
	
	// function that highlights the atoms in the given region
	// has the same interface as in Dasty
	
	
   /**
    * Filters the currently provided PDB files: Only PDB files containing a part of the requested region
    * are selectable. The specified region is highlighted in the displayed PDB file.
    *
    * @example 
    * // Selection of the region in the interval [100,150].
    * myPdbViewer.setSelection({start: 100, end: 150});
    * 
    * @example
    * // Selection of the positions 4, 8 and 100.
    * myPdbViewer.setSelection([4,8,100]);
    * 
    * @param {Object|Array} selection Can be either a plain object or an array.  
    *        If object, it must have the fields start and end; Where "start" is greater than or equal to "end".
    *        If array, it must contain numbers representing the positions to be selected.
    */ 
	setSelection: function(selection){
		if ( selection instanceof Array ) {
			this._selection = Biojs.Utils.clone(selection);
			this._drawSelection();
			this.raiseEvent("onSelection", {
				selectionType: "positions",
				selection: Biojs.Utils.clone(selection)
			});
		}
		else if ( !isNaN(selection.start) && !isNaN(selection.end) && selection.start <= selection.end ){
			this._selection = Biojs.Utils.clone(selection);
			this._drawSelection();
			this.raiseEvent("onSelection", {
				selectionType: "region",
				selection: Biojs.Utils.clone(selection)
			});
		} else {
			Biojs.console.log("selection not valid");
		}
	},

	// highlight given region
	_getSelectionScript: function(positionText){
		var scr = 'select all; color translucent 1;';
        if ( !this._display.halos ) {
            scr += 'select not ' + positionText + '; color translucent 0.8; selectionHalos off;';
        } else {
            scr += 'select ' + positionText + '; selectionHalos on;';
        }
		return scr;		
	},

	_drawSelection: function(){		
		if ( this._selection !== undefined ) {
			if ( this._selection instanceof Array ) {
				selectionText = this._getSelectionScript(this._selection.join(","));
			}
			else {
				selectionText = this._getSelectionScript(this._selection.start+"-"+this._selection.end);
			}
			result = jmolScriptWait(selectionText);
			Biojs.console.log("applied: "+selectionText); 
		} 
	},
	
   /**
    * Draws a translucent surface surrounding the protein.
    *
    * @example 
    * // 
    * myPdbViewer.displaySurface();
    * 
    */
	displaySurface: function(){
		if (!this._display.surface) {
			$("#"+this.opt.target).find('#surfaceCheck').attr("checked","surfaceCheck");
			this._display.surface = true;
			jmolScriptWait('select all; isoSurface solvent 1.4; color isoSurface translucent 0.8;select none');
		}
	},
	
   /**
    * Undo the action of method displaySurface.
    *
    * @example 
    * // 
    * myPdbViewer.hideSurface();
    * 
    */
	hideSurface: function(){
		if (this._display.surface) {
			this._display.surface = false;
			$("#"+this.opt.target).find('#surfaceCheck').removeAttr("checked");
			jmolScriptWait('select all; isoSurface off; select none');
		}
	},
	
	/**
    * Selects the acidic atoms and do coloring.
    *
    * @param {string} [color="red"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * myPdbViewer.displayNegative("red");
    * 
    */
	displayNegative: function (color) {
		$("#"+this.opt.target).find('#negativeCheck').attr("checked","negativeCheck");
		negativeColor = (color)? color : this.opt.negativeColor;
		this.display('acidic', negativeColor);
		this._display.property.negative = true;
	},
	/**
    * Undo the action of method displayNegative.
    *
    * @example 
    * // 
    * myPdbViewer.hideNegative();
    * 
    */
	hideNegative: function () {
		if (this._display.property.negative) {
			$("#"+this.opt.target).find('#negativeCheck').removeAttr("checked");
			this._display.property.negative = false;
			this.undisplay('acidic');
		}
	},
	
	/**
    * Selects the basic atoms and do coloring.
    *
    * @param {string} [color="blue"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * myPdbViewer.displayPositive();
    * 
    */
	displayPositive: function (color) {
		positiveColor = (color)? color : this.opt.positiveColor;
		$("#"+this.opt.target).find('#positiveCheck').attr("checked","positiveCheck");
		this.display('basic', positiveColor);
		this._display.property.positive = true;
	},
	
	/**
    * Undo the action of method displayPositive.
    *
    * @example 
    * // 
    * myPdbViewer.hidePositive();
    * 
    */
	hidePositive: function () {
		if (this._display.property.positive) {
			$("#"+this.opt.target).find('#positiveCheck').removeAttr("checked");
			this._display.property.positive = false;
			this.undisplay('basic');
		}
	},
	
	/**
    * Selects the polar atoms and do coloring.
    *
    * @param {string} [color="yellow"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * myPdbViewer.displayPolar();
    * 
    */	
	displayPolar: function (color) {
		$("#"+this.opt.target).find('#polarCheck').attr("checked","polarCheck");
		polarColor = (color)? color : this.opt.polarColor;
		this.display('polar', polarColor);
		this._display.property.polar = true;
	},
	
	/**
    * Undo the action of method displayPolar.
    *
    * @example 
    * // 
    * myPdbViewer.hidePolar();
    * 
    */	
	hidePolar: function () {
		if (this._display.property.polar) {
			$("#"+this.opt.target).find('#polarCheck').removeAttr("checked");
			this._display.property.polar = false;
			this.undisplay('polar');
		}
	},
	
	/**
    * Selects the polar atoms and do coloring.
    *
    * @param {string} [color="salmon"] Refer to the Jmol documentation for availables coloring schemes. 
    *
    * @example 
    * // 
    * myPdbViewer.displayUnPolar();
    * 
    */	
    // colors the structure depending on the checked check boxes
	displayUnPolar: function ( color ) {
		unPolarColor = (color)? color : this.opt.unpolarColor;
		$("#"+this.opt.target).find('#unpolarCheck').attr("checked","unpolarCheck");
		this.display('hydrophobic', unPolarColor);
		this._display.property.unpolar = true;
	},
	/**
    * Undo the action of method displayUnPolar.
    *
    * @example 
    * // 
    * myPdbViewer.hideUnPolar();
    * 
    */
	hideUnPolar: function () {
		if (this._display.property.unpolar) {
			$("#"+this.opt.target).find('#unpolarCheck').removeAttr("checked");
			this._display.property.unpolar = false;
			this.undisplay('hydrophobic');
		}
	},
	
	/**
    * Enable/disable the visibility of halos for showing up the current selection. 
    * On halos off, all not selected atoms will be translucent. 
    *
    * @param {boolean} value 'true' for halos on, 'false' for halos off.  
    * 
    * @example 
    * // Sets the halos off
    * myPdbViewer.setHalosVisible(false);
    * 
    */
	setHalosVisible: function (value) {
		this._display.halos = value;
		if (value) {
			if ( ! $("#"+this.opt.target).find('#halosRadio:checked').val()  ) {
				$("#"+this.opt.target).find('#halosRadio').attr("checked","halosRadio");
				$("#"+this.opt.target).find('#translucentRadio').removeAttr("checked");
			}
		} else {
			if ( $("#"+this.opt.target).find('#halosRadio:checked').val() ) {
				$("#"+this.opt.target).find('#halosRadio').removeAttr("checked");
				$("#"+this.opt.target).find('#translucentRadio').attr("checked","translucentRadio");
			}			
		}
		
		this._drawSelection();
	},
	
	/**
    * Apply a script to the Jmol applet that currently are displayed 
    * 
    * @example
    * // Rotate one time in X-axis.
    * myPdbViewer.applyJmolCommand('select all; cartoon off; meshribbons on; select none;');
    * 
    * @param {string} The Jmol script.  
    */
	applyJmolCommand: function(cmd){
		jmolScriptWait(cmd);
	},
	
	
	/**
    * Select and coloring atoms. 
    * 
    * @example
    * // Select hetero atoms and coloring with the RGB triplet code [xFF0088].  
    * myPdbViewer.display("hetero","[xFF0088]");
    * 
    * @param {string} The color. Refer to the Jmol documentation for availables coloring schemes.  
    */
	display: function(property, color) {
		scr = (this._isAnyDisplayed())? '' : 'select all; color lightgrey;';
		scr += 'select '+property+';color '+color+'; select none';
		
		jmolScriptWait(scr);
		Biojs.console.log("applied: "+scr);
		
		this._drawSelection();
	},
	
	/**
    * Select and remove the coloring atoms.
    * 
    * @example
    * // Select hetero atoms and remove the coloring .  
    * myPdbViewer.undisplay("hetero");
    * 
    * @param {string} The Jmol script.  
    */
	undisplay: function( property ) {
		scr = 'select '+property+';color lightgrey; select none;'
		scr += (this._isAnyDisplayed())? '' : 'select all; color chain; select none;';
		
		jmolScriptWait(scr);
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
		
		var controlSectionDiv = $("#"+self.opt.target+" > div#controlSection");
		
		controlSectionDiv.append('<div id="controls" />'+
				'<div id="controlTab">'+
				'<span id="hideButton" title="Hide this control panel">&lt;&lt;</span>'+
				'<span id="showButton" title="Show the control panel">&gt;&gt;</span><br/><br/></div>')
			.css("border", 0)
			.css("margin", 0)
			.css("width",  "auto")
			.css("height", "auto")
			.css('float', 'left');
		
		// Measurements 
		// 
		var padding = 5;
		var tabWidth = 20, tabHeight = height;
		var controlsWidth = width - (2*padding+tabWidth), controlsHeight = height - (padding*2);
		
		//
		// Panel 
		// 
		var controlDiv = controlSectionDiv.find("div#controls");
		
		controlDiv.css("position","relative")
			.css("border", 0)
			.css("margin", 0)
			.css('background-color', "#000")
			.css('color', "#fff" )
			.css('float', 'left')
			.css("width", controlsWidth )
			.css("height", controlsHeight)
			.css("padding", padding)
			.append(
				'<b> Display: </b><br/>' +
				'<input id="surfaceCheck" type="checkbox" name="surfaceCheck" value="surfaceCheck"> Surface<br/>' +
				'<input id="polarCheck" type="checkbox" name="polarCheck" value="polarCheck"/> Hydrophylic residues<br/>' +
				'<input id="unpolarCheck" type="checkbox" name="unpolarCheck" value="unpolarCheck"/> Hydrophobic residues<br/>' +
				'<input id="positiveCheck" type="checkbox" name="positiveCheck" value="positiveCheck"/> Basic(+) residues<br/>' +
				'<input id="negativeCheck" type="checkbox" name="negativeCheck" value="negativeCheck"/> Acidic(-) residues<br/>' +
		        '<br/><b> Show selection using: </b><br/>' +
		        '<input id="translucentRadio" type="radio" name="selection" value="translucentRadio"/> Translucent ' +
		        '<input id="halosRadio" type="radio" name="selection" value="halosRadio" checked="halosRadio"/> Halos<br/><br/>');
		
		Biojs.console.log("luego de controlDiv.append");
		
		controlDiv.find('#surfaceCheck').click( function(event){
			if ($('#surfaceCheck:checked').val()) {
				self.displaySurface();
			} else {
				self.hideSurface();
			}
		});
		
		controlDiv.find('#polarCheck').click(function(){
			if ($('#polarCheck:checked').val()) {
				self.displayPolar();
			} else {
				self.hidePolar();
			}
		});
		
		controlDiv.find('#unpolarCheck').click(function(){
			if ($('#unpolarCheck:checked').val()) {
				self.displayUnPolar();
			} else {
				self.hideUnPolar();
			}
		});
		
		controlDiv.find('#positiveCheck').click(function(){
			if ($('#positiveCheck:checked').val()) {
				self.displayPositive();
			} else {
				self.hidePositive();
			}
		});
		
		controlDiv.find('#negativeCheck').click(function(){
			if ($('#negativeCheck:checked').val()) {
				self.displayNegative();
			} else {
				self.hideNegative();
			}
		});
	
		controlDiv.find('input[name="selection"]').change(function(){
			var showHalos = ( $('#halosRadio:checked').val() )? true: false;
	    	self.setHalosVisible(showHalos);
	    });
		
		Biojs.console.log("luego de append controls");
		
		// 
		// Tab
		//
		var showHideTab = controlSectionDiv.find('#controlTab');
		var backgroundColor = (this.opt.backgroundColor)? this.opt.backgroundColor : "white";

		showHideTab.css("border", 0)
			.css("margin", 0)
			.css("padding", 0)
			.css("float", "left")
			.css("width", tabWidth)
			.css("height", tabHeight)
			.css('background-color', "#000");
		
		Biojs.console.log("Creating the toggleControls function");
		
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
				$('#div'+self._appletId).css("width", appletWidth);
				controlDiv.hide();
				showHideTab.css('background-color', backgroundColor);
				self._controlsVisible = false;
			} else {
				var appletWidth = self.opt.width - width;
				jmolResizeApplet([appletWidth, self.opt.height], self.getId());
				$('#div'+self._appletId).css("width", appletWidth);
				controlDiv.show();
				showHideTab.css('background-color', "#000");
				self._controlsVisible = true;
			}
		}
		
		self._toggleControls = toggleControls;

		showHideTab.find('#hideButton')
			.click( self._toggleControls )
			.mouseover(function(){
				$(this).css("color","#27C0FF");
			})
			.mouseout(function(){
				$(this).css("color","#fff");
			})
			.css("color","#fff")
			.css("display","none")
			.css("cursor","pointer");
		
		showHideTab.find('#showButton')
			.click( self._toggleControls )
			.mouseover(function(){
				$(this).css("color","#27C0FF");
			})
			.mouseout(function(){
				$(this).css("color","#000");
			})
			.css("color","#000")
			.css("cursor","pointer");
		
		this._controlsReady = true;
		
		Biojs.console.log("_buildControls done");
	}, 
	
	toString: function() { 
		return "Biojs.PdbViewer";
	}
	
	
});
