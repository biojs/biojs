/** 
 * Component to represent Human Protein Atlas summary protein expression 
 * information from a DAS XML
 * 
 * @class
 * @extends Biojs.HpaSummaryFeature
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * @version 1.0.0
 * @category 2
 * 
 * @requires <a href='../biojs/css/Biojs.HpaSummaryFeatures.css'>Biojs.HpaSummaryFeature.css</a>
 * @dependency <link href="../biojs/css/Biojs.HpaSummaryFeatures.css" rel="stylesheet" type="text/css" />
 * 
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} hpaDasUrl
 * 	  Url pointing to an XML including HPA infomration in DAS format
 * 
 * @option {string} width [900px]
 * 	  List of points including summary information for this feature
 * 
 * @option {string} imageWidth [200px]
 * 	  List of points including summary information for this feature
 * 
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    Proxy to bypass the same origin policy ({@link http://en.wikipedia.org/wiki/Same_origin_policy})
 * 
 * @example
 * var instance = new Biojs.HpaSummaryFeatures({
 * 	  target: 'YourOwnDivId',
 * 	  hpaDasUrl: 'http://das.proteinatlas.org/das/proteinatlas/features?segment=Q9NTI5',
 * 	  width: '585px',
 * 	  imageWidth: '150px'
 * });
 * 
 */

Biojs.HpaSummaryFeatures = Biojs.HpaSummaryFeature.extend (
	/** @lends Biojs.HpaSummaryFeatures# */
	{
	constructor: function (options) {
		var self = this;
		this.setHpaDasUrl(self.opt.hpaDasUrl);
	},
	/* 
     * Function: Biojs.HpaSummaryFeatures.setHpaDasUrl
     * Purpose:  Set an URL with HPA DAS XML to start the query and visualization of HPA summary features
     * Returns:  -
     * Inputs:   hpaDasUrl -> {String} DAS XML with HPA summary information
     */
	
	/**
	 * Set an URL with HPA DAS XML to start the query and visualization of HPA summary features
	 * @param {string} hpaDasUrl DAS XML with HPA summary information
	 * 
	 * @example 
	 * instance.setHpaDasUrl("http://www.ebi.ac.uk/~rafael/web/copa/biojs/src/test/data/Q9NTI5_hpa_summary.xml");
	 *
	 * @example 
	 * instance.setHpaDasUrl("http://www.ebi.ac.uk/~rafael/web/copa/biojs/src/test/data/unknownsegment.xml");
	 * 
	 */
	setHpaDasUrl: function(hpaDasUrl){
		var self = this;
		/* URL where to get DAS XML */
		self._url;
		if(self.opt.proxyUrl != ""){
			self._url= self.opt.proxyUrl + "?url=" + hpaDasUrl;
		} else {
			self._url= hpaDasUrl;	
		}

		/* get XML */
	    jQuery.ajax({
		    type: "GET",
		    url: self._url,
		    dataType: "xml",
		    success: function(a){self._processDasHpaXml(a);},
			error: function(a){self._processErrorRequest(a);}
	    });
	},
	/* 
     * Function: Biojs.HpaSummaryFeatures._processDasHpaXml
     * Purpose:  process HPA XML
     * Returns:  -
     * Inputs:  xml -> {String} DAS XML with HPA summary information
     */
	_processDasHpaXml: function (xml)
	{
		var self = this;
		Biojs.console.log("SUCCESS: data received");
		var antibodies = this._getAntibodiesAccessions(xml);
		if(antibodies.length > 0){
			var html = this._createHtmlContainer(antibodies);
			jQuery('#'+self.opt.target+'').html(html);
			this._displayHpaSummaries(xml,antibodies)	
		} else {
			jQuery('#'+self.opt.target+'').html(Biojs.HpaSummaryFeatures.MESSAGE_NODATA);
		}

	},
	/* 
     * Function: Biojs.HpaSummaryFeatures._processErrorRequest
     * Purpose:  Process request error
     * Returns:  -
     * Inputs:   textStatus -> {String} Text satus
     */
	_processErrorRequest: function (textStatus){
		var self = this;
		Biojs.console.log("ERROR: " + textStatus );
		self.raiseEvent( Biojs.HpaSummaryFeatures.EVT_ON_REQUEST_ERROR, { message: textStatus } );
	},
	/* 
     * Function: Biojs.HpaSummaryFeatures._getAntibodiesAccessions
     * Purpose:  get antibodies accessions
     * Returns:  -
     * Inputs: xml -> {String} DAS XML with HPA summary information
     */
	_getAntibodiesAccessions: function (xml){
		var tempSet = new Object();
		jQuery(xml).find("PARENT").each(function(){
			var antibodyTextSplit = jQuery(this).attr("id").split("_");
			if(antibodyTextSplit.length == 2){
				tempSet[antibodyTextSplit[0]] = true;	
			}
		});
		var antibodies = new Array();
		for (var a in tempSet){
			antibodies.push(a);	
		}
		return antibodies;
	},	
	/* 
     * Function: Biojs.HpaSummaryFeatures._createHtmlContainer
     * Purpose:  create HTML container to later populate HPA data
     * Returns:  -
     * Inputs: antibodies -> {Array} List of antibodies
     */
        _createHtmlContainer: function(antibodies) {
            var self = this;
            var html = '';
            jQuery.each(antibodies, function(key, value){
                html += '<div style="width:'+self.opt.width+';" class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'antibodyTitle">Antibody '+value+'</div>'
                html += '<div class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'summary" id="'+value+'_cell_line_immunofluorescence_summary"></div>';
                html += '<div class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'summary" id="'+value+'_cell_line_immunohistochemistry_summary"></div>';
                html += '<div class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'summary" id="'+value+'_cell_line_immunohistochemistry_summary"></div>';
                html += '<div class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'summary" id="'+value+'_cancer_tissue_immunohistochemistry_summary"></div>';
                html += '<div class="'+Biojs.HpaSummaryFeatures.COMPONENT_PREFIX+'summary" id="'+value+'_normal_tissue_immunohistochemistry_summary"></div>';
            });
            return html;
        },
	/* 
     * Function: Biojs.HpaSummaryFeatures._displayHpaSummaries
     * Purpose:  Disaply HPA summaries inside the HTML container
     * Returns:  -
     * Inputs:  xml -> {String} DAS XML with HPA summary information
     */
	_displayHpaSummaries: function(xml){
		var self = this;
		jQuery(xml).find("FEATURE").each(function(){
			if (jQuery(this).attr("id").indexOf("_summary") != -1) {
				/* Get notes */
				var notes = new Array();
				var xmlNotes = jQuery(this).find("NOTE");
				xmlNotes.each(function(){
					notes.push(jQuery(this).text());
				});
				/* Get links */
				var imageUrl = "";
				var imageTitle = "";
				var linkUrl = "";
				var linkTitle = "";
				var xmlLinks = jQuery(this).find("LINK");
				xmlLinks.each(function(){
					if (jQuery(this).attr("href").indexOf(".jpg") != -1 || jQuery(this).attr("href").indexOf(".png") != -1) {
						imageUrl = jQuery(this).attr("href");
						imageTitle = jQuery(this).text();
					}
					else 
						if (jQuery(this).text().indexOf("original source") != -1) {
							linkUrl = jQuery(this).attr("href");
							linkTitle = jQuery(this).text();
						}
				});
				new Biojs.HpaSummaryFeature({
					target: jQuery(this).attr("id"),
					title: jQuery(this).attr("label"),
					imageUrl: imageUrl,
					imageTitle: imageTitle,
					notes: notes,
					linkUrl: linkUrl,
					linkTitle: linkTitle,
					width: self.opt.width,
					imageWidth: self.opt.imageWidth
				});
			}
		});

	},

	/**
	* Default values for the options
	* @name Biojs.HpaSummaryFeatures-opt
	*/
	opt: {
		target: 'hpaSummaryFeatues',
		hpaDasUrl: '',
		proxyUrl: '../biojs/dependencies/proxy/proxy.php',		
		width: '900px',
		imageWidth: '200px'
	},
   /**
    * Array containing the supported event names
    * @name Biojs.HpaSummaryFeatures-eventTypes
    */
	eventTypes: [
		/**
		 * @name Biojs.HpaSummaryFeatures#onRequestError
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
		"onRequestError"
	]
},{
	// Some static values
	COMPONENT_PREFIX: "hpaSummaryFeatures_",
	MESSAGE_NODATA: "Sorry, we could not find summary data for your request",
	// Events
	EVT_ON_REQUEST_ERROR: "onRequestError",
});
