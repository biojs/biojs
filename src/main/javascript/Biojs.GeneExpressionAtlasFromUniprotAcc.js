/** 
 * Visualize gene expression summary information from 
 * the Human Protein Atlas using as input a UniProt ID 
 * 
 * @class
 * @extends Biojs.GeneProteinSummary
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} uniprotAcc 
 * 	  Uniprot accession needed to fetch the Gene expression summary data
 *  
 * @option {string} [featuresUrl='http://www.ebi.ac.uk/gxa/das/s4/features']
 * 	  Url of the REST service which provides the summary data.
 * 
 * @option {string} [legend=true]
 *    Option to display the provenance legend.
 *  
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    Since the same origin policy ({@link http://en.wikipedia.org/wiki/Same_origin_policy}) in the browsers 
 *    Biojs include a proxy script in PHP which redirects Ajax requests from local to any other domain.
 *    You can use tour own proxy script by modifying this value. 
 * 
 * @example
 * var instance = new Biojs.GeneExpressionAtlasFromUniprotAcc({
 * 	  target: 'YourOwnDivId',
 * 	  segmentId: 'Q61171'
 * });
 * 
 */

Biojs.GeneExpressionAtlasFromUniprotAcc = Biojs.extend (
	/** @lends Biojs.GeneExpressionAtlasFromUniprotAcc# */
	{
	constructor: function (options) {
		var self = this;
		
		/* URL where to get the mapping to an EMSEMBL id */	
		self._serviceUrl = "http://www.ebi.ac.uk/uniprot/biomart/martservice?query=%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3C!DOCTYPE%20Query%3E%3CQuery%20%20virtualSchemaName%20=%20%22default%22%20formatter%20=%20%22TSV%22%20header%20=%20%220%22%20uniqueRows%20=%20%221%22%20count%20=%20%22%22%20datasetConfigVersion%20=%20%220.6%22%20%3E%3CDataset%20name%20=%20%22uniprot%22%20interface%20=%20%22default%22%20%3E%3CFilter%20name%20=%20%22accession%22%20value%20=%20%22"
		self._serviceUrl += self.opt.uniprotAcc;
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
		    success: drawSummary,
			error: processErrorRequest
	    });
		
		/* Draw GXA summary */
		function drawSummary(ensemblId)
		{
			var instance = new Biojs.GeneProteinSummary({
			      target: self.opt.target,
			      segmentId: ensemblId,
				  featuresUrl: self.opt.featuresUrl,
				  legend: self.opt.legend,
				  proxyUrl: self.opt.proxyUrl
			});
		}
		
				
		/* Process request error */
		function processErrorRequest(qXHR, textStatus, errorThrown){
			Biojs.console.log("ERROR: " + textStatus );
			self.raiseEvent( Biojs.GeneExpressionAtlasFromUniprotAcc.EVT_ON_REQUEST_ERROR, { message: textStatus } );
		}

	},
	/**
	 * Default values for the options
	 * @name Biojs.GeneExpressionAtlasFromUniprotAcc-opt
	 */
	opt: {
		target: '',
		uniprotAcc: '',
		featuresUrl: 'http://www.ebi.ac.uk/gxa/das/s4/features',
		legend: true,
		proxyUrl: ''
	},
	/**
	* Array containing the supported event names
	* @name Biojs.GeneExpressionAtlasFromUniprotAcc-eventTypes
	*/
	eventTypes: [
		/**
		 * @name Biojs.GeneExpressionAtlasFromUniprotAcc#onRequestError
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
	]
},{
	// Some static values
	
	// Events
	EVT_ON_REQUEST_ERROR: "onRequestError",
});