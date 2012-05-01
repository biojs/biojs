/**
 *  
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @requires <a href='../biojs/css/ChEBICompound.css'>ChEBICompound.css</a>
 * @dependency <link href="../biojs/css/ChEBICompound.css" rel="stylesheet" type="text/css" />
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
 * var instance = new Biojs.ChEBICompound({
 * 		target: 'YourOwnDivId',
 * 		id: '2922'
 * });	
 * 
 * 
 */
Biojs.ChEBICompound = Biojs.extend(
/** @lends Biojs.ChEBICompound# */
{
	constructor: function(options){
		Biojs.console.enable();
		//constructor of Biojs.ChEBICompound
		
		this._selector = "#" + this.opt.target;
		this._container = jQuery(this._selector);
		
		this._container.addClass("ChEBICompound")
			.css({
				"width": this.opt.width,
				"height": this.opt.height,
				"padding": 0
			});
		
		this._imageContainer = jQuery('<div class="ChEBICompound_image"></div>').appendTo(this._container);
		this._summaryContainer = jQuery('<div class="ChEBICompound_summary"></div>').appendTo(this._container);
		
		if (this.opt.id !== undefined) {
			this.setId(this.opt.id);
		}
	},
	
	opt: {
	   target: 'YourOwnDivId',
	   id: undefined,
	   imageUrl: 'http://www.ebi.ac.uk/chebi/displayImage.do',
	   chebiDetailsUrl: 'http://www.ebi.ac.uk/webservices/chebi/2.0/test/getCompleteEntity?chebiId=',
	   proxyUrl: '../biojs/dependencies/proxy/proxy.php',
	   
	   height: 400,
	   width: 597,
	   scale: false,
	   imageIndex: 0
	},
	
	eventTypes : [
  		/**
  		 * @name Biojs.ChEBICompound#onRequestError
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
  		 * @name Biojs.ChEBICompound#onImageLoaded
  		 * @event
  		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
  		 * @eventData {Object} source The component which did triggered the event.
  		 * @eventData {string} id The identifier of the loaded file.
  		 * 
  		 * @example 
  		 * instance.onImageLoaded(
  		 *    function( e ) {
  		 *       alert( e.id + " loaded." );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onImageLoaded"
	],

	/**
    * 
    *
    * @example
    * instance.setId('4991');
    * 
    */
	setId: function( chebiId ) {
		
		self = this;
		
		this.opt.id = chebiId;
		
		var width = this._imageContainer.width(); 
		var height = this._imageContainer.height(); 
		var url = this.opt.imageUrl + '?defaultImage=true&imageIndex='+this.opt.imageIndex+'&chebiId='+chebiId+'&dimensions='+width+'&scaleMolecule='+this.opt.scale;
		var image = '<img id="image_' + chebiId + '" src="'+ url +'" class="ChEBICompound" />';
		
		this._imageContainer.html( image );
		
		jQuery('#image_' + chebiId ).load(function() {
			self.raiseEvent( Biojs.ChEBICompound.EVT_ON_IMAGE_LOADED, {
				id: chebiId
			});
		}).css({
			'width': width,
			'height': height
		});
		
		this._requestDetails( this.opt );
	},
	
	_requestDetails: function( opt ){
		var self = this;
		
		var urlSummary = opt.chebiDetailsUrl + opt.id;
		
		Biojs.console.log( "Requesting summary from: " + urlSummary );
		
		var httpRequest = {
			url: urlSummary,
			method: "GET",
			success: function(xml){
				self._dataReceived(xml);
			},
			error: function(qXHR, textStatus, errorThrown) {
				Biojs.console.log("ERROR requesting summary. Response: " + textStatus);
				self.raiseEvent( Biojs.ChEBICompound.EVT_ON_REQUEST_ERROR, {
					message: textStatus
				});
			}
		};
		
		// Using proxy?
	   	// Redirect using the proxy and encode all params as url data
	   	if ( opt.proxyUrl != undefined ) {
	
	   		 // Redirect to proxy url
	   		 httpRequest.url = opt.proxyUrl;
	
	   		 // Encode both url and parameters under the param url
	   		 httpRequest.data = [{ name: "url", value: urlSummary }];
	
	   		 // Data type 
	   		 httpRequest.dataType = "text";
	   	}

		jQuery.ajax(httpRequest);
		
	},
	
	
	// parses the xml file from the request and stores the information in an easy to access way
	_dataReceived: function(xml){
	    var data = {};
	    var i = 0;
		var self = this;
		
		Biojs.console.log("Data received");
		
		if ( xml.length > 0 ) {
			xmlDoc = jQuery.parseXML( xml );
		    xmlResult = jQuery(xmlDoc).find('return');
			
		    data.chebiAsciiName = { name: "Name", value: xmlResult.find(' > chebiAsciiName').text() };
			data.chebiId = { name: "Identifier", value: xmlResult.find('> chebiId').text() };
			data.definition = { name: "Definition", value: xmlResult.find('> definition').text() };
			data.SecondaryChEBIIds = { name: "Other Identifiers", value: xmlResult.find(' > SecondaryChEBIIds').text() };
			data.entityStar = { name: "Stars", value: xmlResult.find(' > entityStar').text() };
			
		}

		this._setSummary( data );
		
	    return data;
	},

	
	_setSummary : function ( data ) {
		Biojs.console.log("_setSummary()");

		this._summaryContainer.html('');
		
		if ( Biojs.Utils.isEmpty(data) ) {
			this._summaryContainer.html('Not information available');
			
		} else {
			
			for (key in data) {
				if ( data[key].value.length > 0 ) {
					if ( key == 'entityStar' ) {
						jQuery('<h2>' + data[key].name + '</h2><div class="star"/>')
							.appendTo(this._summaryContainer)
							.css( 'width', parseInt(data[key].value) * 16 );
					} else {
						this._summaryContainer.append( '<h2>' + data[key].name + '</h2><p>' + data[key].value + '</p>' );
					}
				}
			}
			
			this.raiseEvent( Biojs.ChEBICompound.EVT_ON_SUMMARY_LOADED,{
				id: data.Identifier
			});
		}
		
		Biojs.console.log("_setSummary done");
	}
},{
	//Events 
	EVT_ON_IMAGE_LOADED: "onImageLoaded",
	EVT_ON_SUMMARY_LOADED: "onSummaryLoaded",
	EVT_ON_REQUEST_ERROR: "onRequestError"
	
});