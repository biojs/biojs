/** 
 * Gene protein summary 
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='../biojs/css/GeneProteinSummary.css'>GeneProteinSummary.css</a>
 * @dependency <link href="../biojs/css/GeneProteinSummary.css" rel="stylesheet" type="text/css" />
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} segmentId 
 * 	  Uniprot segment identifier to fetch the Gene Protein summary data
 *  
 * @option {string} [featuresUrl='http://www.ebi.ac.uk/gxa/das/s4/features']
 * 	  Url of the REST service which provides the summary data.
 *  
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    Since the same origin policy ({@link http://en.wikipedia.org/wiki/Same_origin_policy}) in the browsers 
 *    Biojs include a proxy script in PHP which redirects Ajax requests from local to any other domain.
 *    You can use tour own proxy script by modifying this value. 
 * 
 * @example
 * var instance = new Biojs.GeneProteinSummary({
 * 	  target: 'YourOwnDivId',
 * 	  segmentId: 'ENSG00000135486'
 * });
 * 
 */
Biojs.GeneProteinSummary = Biojs.extend(
/** @lends Biojs.GeneProteinSummary# */
{	
	constructor: function (options) {
		Biojs.console.enable();
		
		this._selector = "#" + this.opt.target;
		this._container = jQuery(this._selector);
		
		this._container.addClass("GeneProteinSummary");
		this._title = jQuery('<h1 class="GeneProteinSummary_title"></h1>').appendTo(this._container);
		this._imageContainer = jQuery('<div class="GeneProteinSummary_image"></div>').appendTo(this._container);
		this._summaryContainer = jQuery('<div class="GeneProteinSummary_summary"></div>').appendTo(this._container);
		this._footerContainer = jQuery('<div class="GeneProteinSummary_footer"></div>').appendTo(this._container);

		this.requestFeatures( this.opt.segmentId );
	},
	
	/**
	 * Default values for the options
	 * @name Biojs.GeneProteinSummary-opt
	 */
	opt: {
		target: "YourOwnDivId",
		segmentId: undefined,
		featuresUrl: 'http://www.ebi.ac.uk/gxa/das/s4/features',
		proxyUrl: '../biojs/dependencies/proxy/proxy.php'
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.GeneProteinSummary-eventTypes
	 */
	eventTypes: [
		/**
		 * @name Biojs.GeneProteinSummary#onRequestError
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
		 **/
		"onRequestError"
	],
	/**
	 * Fetch the data by means of segmentId.
	 * @param {string} segmentId The segment identifier.
	 * 
	 * @example 
	 * instance.requestFeatures("ENSG00000100867");
	 * 
	 */
	requestFeatures: function( segmentId ) {
		if ( undefined !== segmentId ) {
			this.opt.segmentId = segmentId;
			this._requestFeaturesXML(this.opt);
		} else {
			Biojs.console.log("SegmentId value is not valid");
		}
	},
	
	/* 
     * Function: Biojs.GeneProteinSummary._requestFeaturesXML
     * Purpose:  Request data to the server
     * Returns:  -
     * Inputs:   opt -> {Object} options object.
     */
	_requestFeaturesXML: function( opt ){
		var self = this;
		
		var httpRequest = {
			url: opt.featuresUrl,
			data: "segment=" + opt.segmentId,
			methid: "GET",
			success: function(xml){
				Biojs.console.log("SUCCESS: data received");
				self._responseReceived(xml);
			},
			error: function(qXHR, textStatus, errorThrown){
				Biojs.console.log("ERROR: " + textStatus );
				self.raiseEvent( Biojs.GeneProteinSummary.EVT_ON_REQUEST_ERROR, { message: textStatus } );
			}
		};
		
		// Using proxy?
	   	// Redirect using the proxy and encode all params as url data
	   	if ( opt.proxyUrl != undefined ) {
	
	   		 // Redirect to proxy url
	   		 httpRequest.url = opt.proxyUrl;
	
	   		 // Encode both url and parameters under the param url
	   		 httpRequest.data = [{ name: "url", value: opt.featuresUrl },{ name: "segment", value: opt.segmentId }];
	
	   		 // Data type 
	   		 httpRequest.dataType = "text";
	   	}
		
		jQuery.ajax(httpRequest);
		
	},
	
	/* 
     * Function: Biojs.GeneProteinSummary._responseReceived
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
	    
	    Biojs.console.log("Features decoded:");
	    Biojs.console.log(features);
	    
	    this._setFeatures(features);
	},
	
	/* 
     * Function: Biojs.GeneProteinSummary._requestFeaturesXML
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
     * Function: Biojs.GeneProteinSummary._decodeNode
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
     * Function: Biojs.GeneProteinSummary._setFeatures
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
		
		for ( i = 0; i < f.length; i++ ) {
			var feature = f[i];
			
			if ( Biojs.GeneProteinSummary.TYPE_DESCRIPTION == feature.TYPE.id ) {
				this._title.text( feature.NOTE[0].text );
				
			} else if ( Biojs.GeneProteinSummary.TYPE_IMAGE == feature.TYPE.id ) {
				var image = '<p><img src="'+ feature.LINK.href +'" />';
				var caption = '<p>'+ feature.LINK.text;
				
				this._imageContainer.append(image);
				this._imageContainer.append(caption);
				
			} else if ( Biojs.GeneProteinSummary.TYPE_PROVENANCE == feature.TYPE.id ) {
				var footer = '';
				for ( n in feature.NOTE ) {
					footer += feature.NOTE[n].text + '<br/>';
				}
				footer += '<a href="' + feature.LINK.href + '">'+ feature.LINK.href + '</a>';
				this._footerContainer.append(footer);
				
			} else {
				var summary = '<h2>' + feature.label + '</h2>';
				summary += '<p>' + feature.NOTE[0].text + ' <a href="' + feature.LINK.href + '">view all</a></p>';
				
				this._summaryContainer.append(summary);
			}
			
		}
	}
	
	
},{
	// Some static values
	
	// Events
	EVT_ON_REQUEST_ERROR: "onRequestError",
	
	// Feature types
	TYPE_IMAGE: "image",
	TYPE_SUMMARY: "summary",
	TYPE_DESCRIPTION: "description",
	TYPE_PROVENANCE: "atlas-provenance"
	
});