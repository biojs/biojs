/**
 *  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 2
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @param {Object} options An object with the options for the component.
 * 
 * @option {string} [imageUrl="http://www.ebi.ac.uk/chebi/displayImage.do"] 
 *    Url of the web service in order to require the compound image. 
 *    To get a compound image, 'imageUrl + id' will be used as URI.
 * 
 * @option {string} id
 *    ChEBI identifier of the compound to be displayed (i.e. '4991'). 
 *     
 * @option {int} [height=400] 
 *    The height in pixels of how big this image should be displayed.
 * 
 * @option {int} [width=400]
 *    The width in pixels of how big this image should be displayed.
 * 
 * @example
 * var instance = new Biojs.ChEMBLCompound({
 * 		target: 'YourOwnDivId',
 * 		id: 'CHEMBL67'
 * });	
 * 
 * 
 */
Biojs.ChEMBLCompound = Biojs.extend(
/** @lends Biojs.ChEMBLCompound# */
{
	constructor: function(options){
		Biojs.console.enable();
		//constructor of Biojs.ChEMBLCompound
		
		jQuery("#"+this.opt.target).css("padding","0px")
			.css("width",this.opt.width)
			.css("height",this.opt.height)
			.css("overflow","hidden");
		
		if (this.opt.id !== undefined) {
			this.setId(this.opt.id);
		}
	},
	
	opt: {
	   target: 'YourOwnDivId',
	   id: undefined,
	   imageUrl: 'https://www.ebi.ac.uk/chembldb/index.php/compound/displayimage/',
	   detailsUrl: 'https://www.ebi.ac.uk/chemblws/compounds/',
	   proxyUrl: '../biojs/dependencies/proxy/proxy.php',
	   
	   height: 400,
	   width: 597,
	   scale: false,
	   imageIndex: 0
	},
	
	eventTypes : [
  		/**
  		 * @name Biojs.ChEMBLCompound#onRequestError
  		 * @event
  		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
  		 * @eventData {Object} source The component which did triggered the event.
  		 * @eventData {string} file The name of the loaded file.
  		 * @eventData {string} result A string with either value 'success' or 'failure'.
  		 * @eventData {string} message Error message in case of result be 'failure'.
  		 * 
  		 * @example 
  		 * instance.onRequestError(
  		 *    function( e ) {
  		 *       alert( e.message );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onRequestError",
  		/**
  		 * @name Biojs.ChEMBLCompound#onLoadedImage
  		 * @event
  		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
  		 * @eventData {Object} source The component which did triggered the event.
  		 * @eventData {string} id The identifier of the loaded file.
  		 * 
  		 * @example 
  		 * instance.onLoadedImage(
  		 *    function( e ) {
  		 *       alert( e.id + " loaded." );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onLoadedImage"
	],

	/**
    * 
    *
    * @example
    * instance.setId('4991');
    * 
    */
	setId: function(chEMBLId) {
		self = this;
		self.opt.id = chEMBLId;
		
		var dimension = Math.round(self.opt.width * 0.7);
		var url = self.opt.imageUrl + chEMBLId;
		var image = '<img id="image_' + chEMBLId + '" src="'+ url +'"   />';
		
		jQuery("div#"+this.opt.target).html(
				'<div id="div'+chEMBLId+'" style="position:relative; float:right;">'+ image +'</div>'+
				'<div id="controlSection'+chEMBLId+'" style="position:relative; float:right;"/>'
		);
		
		jQuery('#image_' + chEMBLId ).load(function() {
			self.raiseEvent('onLoadedImage', {id: chEMBLId});
		})
		.css('height',self.opt.height)
		.css('width',dimension);
		
		this._requestDetails(chEMBLId);
	},
	
	_requestDetails: function(chEMBLId){
		var self = this;
		
		Biojs.console.log('url=' + self.opt.detailsUrl + chEMBLId + '.json' );
	
		jQuery.ajax({
			url: self.opt.proxyUrl,
			dataType: 'json',
			data: 'url=' + self.opt.detailsUrl + chEMBLId + '.json',
			success: function(json){
				Biojs.console.log("SUCCESS: data received from "+this.data);
				self._buildPanel(json.compounds);
			},
			async: false,
			error: function(qXHR, textStatus, errorThrown){
				Biojs.console.log(textStatus);
				self.raiseEvent('onRequestError', {message: textStatus});
			}
		});
	},
	
	
//	// parses the xml file from the request and stores the information in an easy to access way
//	_parseResponse: function(xml){
//	    var data = {};
//	    var i = 0;
//		var self = this;
//		
//		xmlDoc = jQuery.parseXML( xml );
//	    xmlResult = jQuery(xmlDoc).find('return');
//		
//		data.Identifier = xmlResult.find('> chEMBLId').text();
//		data.Definition = xmlResult.find('> definition').text();
//		data.Name = xmlResult.find(' > chebiAsciiName').text();
//		data.Stars = xmlResult.find(' > entityStar').text();
//		data.SecondaryIds = xmlResult.find(' > SecondaryChEBIIds').text();
////		data.Synonyms = xmlResult.find(' > Synonyms > data').map(function(){
////		      return jQuery(this).text();
////	    	}).get().join(", ");
//		
//	    Biojs.console.log("Details decoded:");
//	    Biojs.console.log(data);
//	    return data;
//	},

	
	_buildPanel : function (details) {
		
		this._controlsVisible = false;
		
		Biojs.console.log(details);
		
		var self = this;
		var width = Math.round(self.opt.width * 0.3); 
		var height = self.opt.height; 
		
		var controlSectionDiv = jQuery("#"+self.opt.target+" > div#controlSection"+self.opt.id);
		
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
		var padding = 5;
		var tabWidth = 20, tabHeight = height;
		var controlsWidth = width - (2*padding+tabWidth), controlsHeight = height - (padding*2);
		
		//
		// Panel 
		// 
		var controlDiv = controlSectionDiv.find("div#controls");
		
		var detailsHTML = '';
		for (key in details) {
			if ( details[key].length > 0 ) {
				detailsHTML += '<b>' + key + ':</b><br/>' + details[key] + '<br/><br/>';
			}
		}

		controlDiv.css("position","relative")
			.css("border", 0)
			.css("margin", 0)
			.css('background-color', "#000")
			.css('color', "#fff" )
			.css('float', 'left')
			.css("width", controlsWidth )
			.css("height", controlsHeight)
			.css("padding", padding)
			.append( detailsHTML );

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
				controlDiv.hide();
				//showHideTab.css('background-color', self.opt.backgroundColor);
				self._controlsVisible = false;
			} else {
				controlDiv.show();
				//showHideTab.css('background-color', "#000");
				self._controlsVisible = true;
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
		
		Biojs.console.log("_buildPanel done");
	}

	
	

});