/** 
 * Gene expression summary 
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez-Carvajal</a>, <a href="mailto:rafael@ebi.ac.uk">Rafael Jimenez</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='../biojs/css/GeneExpressionSummary.css'>GeneExpressionSummary.css</a>
 * @dependency <link href="../biojs/css/GeneExpressionSummary.css" rel="stylesheet" type="text/css" />
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} identifier 
 * 	  ENSEMBL gene identifier or UniProt Acc needed as input to fetch the Gene expression summary data
 *  
 * @option {string} [featuresUrl='http://www-test.ebi.ac.uk/gxa/das/s4/features']
 * 	  Url of the REST service which provides the summary data.
 * 
 * @option {string} [legend=true]
 *    Option to display the provenance legend.
 *  
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *  This component needs to request data from a web service. To bypass the same origin policy 
 *  (http://en.wikipedia.org/wiki/Same_origin_policy) this component needs a proxy.  
 *  You could use your own proxy by modifying this value or one of the BioJS proxies: 
 *  '../biojs/dependencies/proxy/proxy.php' or '../biojs/dependencies/proxy/proxy.jsp'
 * 
 * @example
 * var instance = new Biojs.GeneExpressionSummary({
 * 	  target: 'YourOwnDivId',
 * 	  identifier: 'ENSG00000066279'
 * });
 * 
 */
Biojs.GeneExpressionSummary = Biojs.extend(
/** @lends Biojs.GeneExpressionSummary# */
{	
	constructor: function (options) {
		//Biojs.console.enable();
		this.setIdentifier(this.opt.identifier);	
	},
	
	/**
	 * Default values for the options
	 * @name Biojs.GeneExpressionSummary-opt
	 */
	opt: {
		target: "YourOwnDivId",
		identifier: undefined,
		featuresUrl: 'http://www-test.ebi.ac.uk/gxa/das/s4/features',
		legend: true,
		proxyUrl: '../biojs/dependencies/proxy/proxy.php'
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.GeneExpressionSummary-eventTypes
	 */
	eventTypes: [
		/**
		 * @name Biojs.GeneExpressionSummary#onRequestError
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
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
		 **/
		"onRequestError",
		/**
		 * @name Biojs.GeneExpressionSummary#onDbError
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} file The name of the loaded file.
		 * @eventData {string} result A string with either value 'success' or 'failure'.
		 * @eventData {string} message Error message in case of result be 'failure'.
		 * 
		 * @example 
		 * instance.onDbError(
		 *    function( e ) {
		 *       alert( e.message );
		 *    }
		 * ); 
		 * 
		 **/
		"onDbError"
	],
	/**
	 * Fetch the data by means of identifier.
	 * @param {string} identifier The segment identifier.
	 * 
	 * @example 
	 * instance.setIdentifier("ENSG00000100867");
	 * 
	 * @example 
	 * instance.setIdentifier("Q61171");
	 * 
	 * @example 
	 * instance.setIdentifier("ENSG000000000000");
	 * 
	 * @example 
	 * instance.setIdentifier("P00000");
	 * 
	 */
	setIdentifier: function(id){
		this._drawTemplate();
		/* Uniprot or Ensembl ID? */
		this._identifierDb = this._checkIdentifier(id);
		if(this._identifierDb == Biojs.GeneExpressionSummary.ID_UNIPROT){
			this._requestFeaturesFromUniprotAcc(id);
		} else if (this._identifierDb == Biojs.GeneExpressionSummary.ID_ENSEMBL){
			this._requestFeatures(id);	
		} else {
			this._processDbError(id);
		}	
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._drawTemplate
     * Purpose:  Draw HTML template used for placing the data afterwards
     * Returns:  -
     * Inputs:  -
     */
	_drawTemplate: function(){
		this._selector = "#" + this.opt.target;
		this._container = jQuery(this._selector);
		this._container.html("");
		
		this._container.addClass("GeneExpressionSummary");
		this._title = jQuery('<div class="GeneExpressionSummary_title"></div>').appendTo(this._container);
		
		this._table = jQuery('<table class="GeneExpressionSummary_title"></table>').appendTo(this._container);
		this._row = jQuery("<tr></tr>").appendTo(this._table);
		this._leftColumn = jQuery("<td></td>").appendTo(this._row);
		this._rightColumn = jQuery("<td></td>").appendTo(this._row);

		
		
		this._imageContainer = jQuery('<div class="GeneExpressionSummary_image"></div>').appendTo(this._rightColumn);
		this._summaryContainer = jQuery('<div class="GeneExpressionSummary_summary"></div>').appendTo(this._leftColumn);
		this._footerContainer = jQuery('<div class="GeneExpressionSummary_footer"></div>').appendTo(this._container);
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._checkIdentifier
     * Purpose:  Check if the indetifier provided by the user is ENSEMBL or UniProt
     * Returns:  Database name (uniprot or ensembl)
     * Inputs:   id -> {String} Identifier.
     */
	_checkIdentifier: function(id){
		var self = this;
		self._re = /^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])$/;
		if (id.search(self._re) != -1){
			return Biojs.GeneExpressionSummary.ID_UNIPROT;
		} else if(id.substring(0,4) == "ENSG"){
			return Biojs.GeneExpressionSummary.ID_ENSEMBL;
		}	
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._requestFeatures
     * Purpose:  Start a request using an ENSEMBL identifier
     * Returns:  -
     * Inputs:   id -> {String} Identifier.
     */
	_requestFeatures: function( identifier ) {
		if ( undefined !== identifier) {
			if (identifier.length > 0) {
				this.opt.identifier = identifier;
				this._requestFeaturesXML(this.opt);
			} else {
				Biojs.console.log("no identifier value available");
				this._displayNoDataMessage();	
			}
		} else {
			Biojs.console.log("identifier value is not valid");
			this._displayNoDataMessage();
		}
	},
	
	/* 
     * Function: Biojs.GeneExpressionSummary._requestFeaturesXML
     * Purpose:  Request data to the server
     * Returns:  -
     * Inputs:   opt -> {Object} options object.
     */
	_requestFeaturesXML: function( opt ){
		var self = this;
		var httpRequest = {
			url: opt.featuresUrl,
			data: "segment=" + opt.identifier,
			methid: "GET",
			/** @ignore No need to document this object */
			success: function(xml){
				Biojs.console.log("SUCCESS: data received");
				self._responseReceived(xml);
			},
			error: this._processErrorRequest
		};
		
		// Using proxy?
	   	// Redirect using the proxy and encode all params as url data
	   	if ( opt.proxyUrl != undefined ) {
	
	   		 // Redirect to proxy url
	   		 httpRequest.url = opt.proxyUrl;
	
	   		 // Encode both url and parameters under the param url
	   		 httpRequest.data = [{ name: "url", value: opt.featuresUrl + "?segment="+opt.identifier }];
	
	   		 // Data type 
	   		 httpRequest.dataType = "text";
	   	}
		
		jQuery.ajax(httpRequest);
		
	},
	
	/* 
     * Function: Biojs.GeneExpressionSummary._responseReceived
     * Purpose:  Parses the xml file from the request and stores the information in an easy to access way
     * Returns:  {object[]} -> decoded features
     * Inputs:   xml -> {string} xml with the features.
     */
	_responseReceived: function( xml ){
		var self = this;
		var xmlDoc = "";
		var features = [];
		
		Biojs.console.log("Decoding " + xml);
		
		try {
			xmlDoc = jQuery.parseXML( xml );
			
		} catch (e) {
			Biojs.console.log("ERROR decoding ");
			Biojs.console.log(e);
		}
		
	    jQuery(xmlDoc).find('FEATURE')
	    	.each( function(){
	    		features.push( self._decodeFeature(this) );
	    	});
	    
		if (features.length > 0) {
			Biojs.console.log("Features decoded:");
			Biojs.console.log(features);
			this._setFeatures(features);
		} else {
			this._displayNoDataMessage();
		}
	},
	_displayNoDataMessage: function(){
		jQuery('#'+this.opt.target+'').html(Biojs.GeneExpressionSummary.MESSAGE_NODATA);
	},
	
	/* 
     * Function: Biojs.GeneExpressionSummary._requestFeaturesXML
     * Purpose:  Convert a feature from XML to js object 
     * Returns:  {object} js object containing the data of the feature 
     * Inputs:   featureNode -> {Node} The DOM Node
     */
	_decodeFeature: function ( featureNode ) {
		
	    Biojs.console.log("Decoding feature" + featureNode );
		
		var feature = this._decodeNode( featureNode );
	    
	    // Get the children of the feature node
	    var children = jQuery( featureNode ).children();
	    
	    // Decode each child 
	    for ( i = 0; i < children.length; i++ ) {
	    	var objChild = this._decodeNode(children[i]);
	    	
	    	// Add child to the feature
	    	if ( "NOTE" == children[i].nodeName ) {
	    		if (feature[ children[i].nodeName ] == undefined ) feature[ children[i].nodeName ] = []; 
	    		feature[ children[i].nodeName ].push( objChild );
	    	} else {
	    		feature[ children[i].nodeName ] = objChild;
	    	}
	    }
	    
	    return feature;
	},
	
	/* 
     * Function: Biojs.GeneExpressionSummary._decodeNode
     * Purpose:  Convert a node to a js object 
     * Returns:  {object} js object containing the data of the node 
     * Inputs:   node -> {Node} The DOM Node
     */
	_decodeNode: function (node) {
		var obj = {}

    	// Get attributes
    	jQuery.each( node.attributes, function(index, attr) {
            obj[ attr.nodeName ] = attr.nodeValue;
	    });
    	obj["text"] = jQuery(node).text();
    	
    	return obj;
	},
	
	/* 
     * Function: Biojs.GeneExpressionSummary._setFeatures
     * Purpose:  Build the HTML in this container using the provided features object.
     * Returns:  -
     * Inputs:   f -> {object} Features to be displayed
     */
	_setFeatures: function ( f ) {
		
		// Flush the containers
		this._title.text('');
		this._imageContainer.text('');
		this._summaryContainer.text('');
		this._footerContainer.text('');
		
		var self = this;
		for ( i = 0; i < f.length; i++ ) {
			var feature = f[i];
			if ( Biojs.GeneExpressionSummary.TYPE_DESCRIPTION == feature.TYPE.id ) {
				this._title.text( feature.NOTE[0].text );
				
			} else if ( Biojs.GeneExpressionSummary.TYPE_IMAGE == feature.TYPE.id ) {
				var image = jQuery('<img src="'+ feature.LINK.href +'" />').appendTo(this._imageContainer);
				image.css("width","100%");
				image.css("height","auto");
				var caption = '<p>'+ feature.LINK.text;
				this._imageContainer.append(caption);
			} else if ( Biojs.GeneExpressionSummary.TYPE_PROVENANCE == feature.TYPE.id && self.opt.legend == true) {
				var footer = '';
				for ( n in feature.NOTE ) {
					footer += feature.NOTE[n].text + ' ';
				}
				footer += '<a href="' + feature.LINK.href + '">'+ feature.LINK.href + '</a>';
				this._footerContainer.append(footer);
				
			} else {
				var summary = '<div class="GeneExpressionSummary_subtitle">' + feature.label + '</div>';
				summary += '<div class="GeneExpressionSummary_feature">' + feature.NOTE[0].text;
				if(typeof feature.LINK != 'undefined'){
					summary += ' <a href="' + feature.LINK.href + '">view all</a></div>';	
				}
				this._summaryContainer.append(summary);
			}
			
		}
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._requestFeaturesFromUniprotAcc
     * Purpose:  Start a request using a UniProt identifier
     * Returns:  -
     * Inputs:   id -> {String} UniProt identifier.
     */
	_requestFeaturesFromUniprotAcc: function(id){
		var self = this;
		/* URL where to get the mapping to an EMSEMBL id */	
		self._serviceUrl = "http://www.ebi.ac.uk/uniprot/biomart/martservice?query=%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3C!DOCTYPE%20Query%3E%3CQuery%20%20virtualSchemaName%20=%20%22default%22%20formatter%20=%20%22TSV%22%20header%20=%20%220%22%20uniqueRows%20=%20%221%22%20count%20=%20%22%22%20datasetConfigVersion%20=%20%220.6%22%20%3E%3CDataset%20name%20=%20%22uniprot%22%20interface%20=%20%22default%22%20%3E%3CFilter%20name%20=%20%22accession%22%20value%20=%20%22"
		self._serviceUrl += id;
		self._serviceUrl += "%22/%3E%3CAttribute%20name%20=%20%22ensembl_id%22%20/%3E%3C/Dataset%3E%3C/Query%3E";
		self._url = "";
		if(self.opt.proxyUrl != ""){
			self._url= self.opt.proxyUrl + "?url=" + self._serviceUrl;
		} else {
			self._url= self._serviceUrl;	
		}
		
		/* process service */
	    jQuery.ajax({
		    type: "GET",
		    url: self._url,
			dataType: "text",
		    success: function(a){self._requestFeatures(a);},
			error: function(a){self._processErrorRequest(a);}
	    });
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._processErrorRequest
     * Purpose:  Process request error
     * Returns:  -
     * Inputs:   textStatus -> {String} Text status
     */
	_processErrorRequest: function (textStatus){
		Biojs.console.log("ERROR: " + textStatus );
		self.raiseEvent( Biojs.GeneExpressionSummary.EVT_ON_REQUEST_ERROR, { message: textStatus } );
	},
	/* 
     * Function: Biojs.GeneExpressionSummary._processDbError
     * Purpose:  Process DB error
     * Returns:  -
     * Inputs:   id -> {String} Identifier.
     */
	_processDbError: function (id){
		var self = this;
		self._message = "Not recognize identifier: " + id;
		Biojs.console.log("ERROR: " + self._message );
		self.raiseEvent( Biojs.GeneExpressionSummary.EVT_ON_DB_ERROR, { message: self._message } );
	}
	
},{
	// Some static values
	
	// Events
	EVT_ON_REQUEST_ERROR: "onRequestError",
	EVT_ON_DB_ERROR: "onDbError",
	
	ID_UNIPROT: "uniprot",
	ID_ENSEMBL: "ensembl",
	MESSAGE_NODATA: "Sorry, we could not find summary data for your request",
	
	// Feature types
	TYPE_IMAGE: "image",
	TYPE_SUMMARY: "summary",
	TYPE_DESCRIPTION: "description",
	TYPE_PROVENANCE: "atlas-provenance"
	
});
