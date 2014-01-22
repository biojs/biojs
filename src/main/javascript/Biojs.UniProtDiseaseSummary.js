/** 
 * Component to present UniProt disease information.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * @version 1.0.0
 * @category 2
 * 
 * @requires <a href='http://blog.jquery.com'>jQuery 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * 
 * @requires <a href='../biojs/css/Biojs.UniProtDiseaseSummary.css'>Biojs.UniProtDiseaseSummary.css</a>
 * @dependency <link href="../biojs/css/Biojs.UniProtDiseaseSummary.css" rel="stylesheet" type="text/css" />
 * 
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} uniProtDasUrl
 * 	  Url pointing to an XML including UniProt infomration in DAS format
 * 
 * @option {string} keywordFiltereing [['cancer','brain']]
 * 	  List of keywords to filter disease information
 * 
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    Since the same origin policy ({@link http://en.wikipedia.org/wiki/Same_origin_policy}) in the browsers 
 *    Biojs include a proxy script in PHP which redirects Ajax requests from local to any other domain.
 *    You can use tour own proxy script by modifying this value. 
 * 
 * @option {string} width [100%]
 * 	  Defines the width of the component
 * 
 * @option {string} referencesColumnWidth [200px]
 * 	  Defines the width of the columns with reference links
 * 
 * @option {boolean} tableHeader
 * 	  Boolean value to control the display of the table header
 * 
 * @option {boolean} componentTitle
 * 	  Boolean value to control the display of the title of the component
 * 
 * @example
 * var instance = new Biojs.UniProtDiseaseSummary({
 * 	  target: 'YourOwnDivId',
 *		uniProtDasUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/features?segment=P08123;type=BS:01019',
 *		keywordFiltereing: ['osteogenesis','lipoblastoma'],
 *		proxyUrl: '../biojs/dependencies/proxy/proxy.php',		
 *		width: '100%',
 *		referencesColumnWidth: '150px',
 *		tableHeader: false,
 *		componentTitle: false
 * });
 * 
 */


Biojs.UniProtDiseaseSummary = Biojs.extend (
	/** @lends Biojs.UniProtDiseaseSummary# */
	{
	constructor: function (options) {
		//Biojs.console.enable();
		this.setUniProtDasUrl(this.opt.uniProtDasUrl);
		this._component_wrapper_id = "UDS_component_wrapper";
	},

	/**
	 * Set an URL to start the query and visualization
	 * @param {string} uniProtDasUrl DAS XML
	 * 
	 * @example 
	 * instance.setUniProtDasUrl("http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/features?segment=P37173;type=BS:01019");
	 *
	 * @example 
	 * instance.setUniProtDasUrl("http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/features?segment=P08123;type=BS:01019");
	 * 
	 */

	setUniProtDasUrl: function(uniProtDasUrl){
		var self = this;
		self._clearHtmlTemplate();
		/* URL where to get DAS XML */
		self._url;
		if(self.opt.proxyUrl != ""){
			self._url= self.opt.proxyUrl + "?url=" + uniProtDasUrl;
		} else {
			self._url= uniProtDasUrl;	
		}

		/* get XML */
	    jQuery.ajax({
		    type: "GET",
		    url: self._url,
		    dataType: "xml",
		    success: function(a){self._processDasUniProtXml(a);},
			error: function(a){self._processErrorRequest(a);}
	    });
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._processErrorRequest
     * Purpose:  Process request error
     * Returns:  -
     * Inputs:   textStatus -> {String} Text satus
     */
	_processErrorRequest: function (textStatus){
		var self = this;
		Biojs.console.log("ERROR: " + textStatus );
		self.raiseEvent( Biojs.UniProtDiseaseSummary.EVT_ON_REQUEST_ERROR, { message: textStatus } );
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._drawHtmlTemplate
     * Purpose:  Create HTML template
     * Returns:  -
     * Inputs:  -
     */
	_drawHtmlTemplate: function (){
		var _selector = "#" + this.opt.target;
		var _container = jQuery(_selector);
		var _tableTitle = jQuery('<div style="width:' + this.opt.width + '" id="'+this._component_wrapper_id+'"></div>').appendTo(_container);
		jQuery("<div id='UDS_info'></div>").appendTo(_tableTitle);
		jQuery("<div id='UDS_warnings'></div>").appendTo(_tableTitle);
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._clearHtmlTemplate
     * Purpose:  Remove component content
     * Returns:  -
     * Inputs:  -
     */
	_clearHtmlTemplate: function (){
		var _selector = "#" + this.opt.target;
		var _container = jQuery(_selector).html('');
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._drawComponentTitle
     * Purpose:  Draw component title
     * Returns:  -
     * Inputs:  -
     */
	_drawComponentTitle: function (){
		if(this.opt.componentTitle){
			var _selector = "#" + this._component_wrapper_id;
			var _container = jQuery(_selector);
			var _tableTitle = jQuery("<div class='UDS_table_title'>Involvement in disease</div>").appendTo(_container);
		}
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._drawComments
     * Purpose:  Draw disease main summary using UniProt disease comments
     * Returns:  -
     * Inputs:  -
     */
	_drawComments: function (){
		var _container = jQuery("#UDS_info");
		var _tableWrapper = jQuery("<div class='UDS_table_wrapper'></div>");
		var _table = jQuery('<table class="UDS_table"></table>').appendTo(_tableWrapper);
		if(this.opt.tableHeader){
			var _fisrtRow = jQuery("<tr class='UDS_header'></tr>").appendTo(_table);
			jQuery("<td>Notes</td>").appendTo(_fisrtRow);
			jQuery("<td>References</td>").appendTo(_fisrtRow);			
		}
		/* Print table */
		var isVisible = true;
		var rowType = "UDS_even";
		var commmentsDisplayed = 0;
		for(i=0; i<this._comments.length; i++){
			/* Check keywords */
			isVisible = true;
			if (this.opt.keywordFiltereing.length > 0) {
				isVisible = this._isAnyKewordInText(this.opt.keywordFiltereing, this._comments[i].notes[0]);
			}
			/* Print table */
			if (isVisible) {
				if (rowType == "UDS_odd") {
					rowType = "UDS_even";
				}
				else {
					rowType = "UDS_odd";
				}
				var _row = jQuery("<tr class='" + rowType + "'></tr>").appendTo(_table);
				jQuery("<td class='UDS_notes'>" + this._comments[i].notes[0] + "</td>").appendTo(_row);
				var reference = "";
				var omimAccs = "";
				var pubmedAccs = "";
				/* Display OMIM */
				for (j = 0; j < this._comments[i].omimAccs.length; j++) {
					omimAccs += '<a target="_blank" href="http://www.omim.org/entry/' + this._comments[i].omimAccs[j] + '">' + this._comments[i].omimAccs[j] + '</a>, ';
				}
				if (omimAccs.length > 0) {
					omimAccs = omimAccs.substring(0, omimAccs.length - 2);
					omimAccs = "<span class='UDS_omim_title'>Links to OMIM:</span><div class='UDS_accs'>" + omimAccs + "</div>";
					
				}
				/* Display Pubmed */
				for (k = 0; k < this._comments[i].pubmedAccs.length; k++) {
					pubmedAccs += '<a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/' + this._comments[i].pubmedAccs[k] + '">' + this._comments[i].pubmedAccs[k] + '</a>, ';
				}
				if (pubmedAccs.length > 0) {
					pubmedAccs = pubmedAccs.substring(0, pubmedAccs.length - 2);
					pubmedAccs = "<span class='UDS_pubmed_title'>Links to Pubmed:</span><div class='UDS_accs'>" + pubmedAccs + "</div>";
					
				}
				jQuery("<td class='UDS_references' style='width:" + this.opt.referencesColumnWidth + "'>" + omimAccs + pubmedAccs + "</td>").appendTo(_row);
				commmentsDisplayed++;
			}
		}
		if (commmentsDisplayed == 0) {
			jQuery("#UDS_warnings").html("No disease notes found for this query");
		} else {
			_tableWrapper.appendTo(_container);
		}
		
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._isAnyKewordInText
     * Purpose:  Check if a keyword from a list is present in a text
     * Returns:  -
     * Inputs:  -
     */	
	_isAnyKewordInText: function (keywords, text){
		/* Check keywords */
		var found = false;
		keyword_loop:
		for(j=0; j<keywords.length; j++){
			if (text.toLowerCase().indexOf(keywords[j].toLowerCase()) != -1) {
				found = true;
				break keyword_loop; 	
			}
		}
		return found;
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._drawKeywords
     * Purpose:  Draw a list of disease keywords
     * Returns:  -
     * Inputs:  -
     */	
	_drawKeywords: function (){
		var _container = jQuery("#UDS_info");
		var links = "";
		var isVisible = true;
		for (i = 0; i < this._keywords.length; i++) {
			/* Check keywords */
			isVisible = true;
			if (this.opt.keywordFiltereing.length > 0) {
				isVisible = this._isAnyKewordInText(this.opt.keywordFiltereing, this._keywords[i].label);
			}
			if (isVisible) {
				links += "<a target='_blank' href='"+this._keywords[i].link+"'>"+this._keywords[i].label+"</a>, ";
			}
		}	
		if (links.length > 0) {
			links = links.substring(0, links.length - 2);
			links = "<div class='UDS_keywords_wrapper'><span class='UDS_keywords_title'>Keywords: </span><span class='UDS_keywords'>" + links + "</span></div>";
			jQuery(links).appendTo(_container);
		} else {
			var _info = jQuery("#UDS_info").html();
			if(_info.length > 0){
				jQuery("#UDS_warnings").html("No disease keywords or notes found for this query");
			} else {
				jQuery("#UDS_warnings").html("No disease keywords found for this query");	
			}
		}
		
	},


	/* 
     * Function: Biojs.UniProtDiseaseSummary._processUniProtXml
     * Purpose:  process XML
     * Returns:  -
     * Inputs:  xml -> {String} DAS XML
     */
	_processDasUniProtXml: function (xml){
		Biojs.console.log("SUCCESS: data received");
		this._keywords = new Array();
		this._comments = new Array();
		var self = this;
		jQuery(xml).find("FEATURE").each(function(){
			var xmlType = jQuery(this).find("TYPE")[0];
			var featureCategory = jQuery(xmlType).attr("category");
			if(featureCategory.toLowerCase() == "keyword"){
				self._setKeyword(this);		
			} else if (featureCategory.toLowerCase() == "comment"){
				self._setComment(this);			
			}
			
		});
		this._drawHtmlTemplate();
		this._drawComponentTitle()
		this._drawComments();
		this._drawKeywords();
	},
	/* 
     * Function: Biojs.UniProtDiseaseSummary._setKeyword
     * Purpose:  parse keyword information
     * Returns:  -
     * Inputs:  featureXml -> {String} DAS XML
     */	
	_setKeyword: function (featureXml){
		var keyword = new Object();
		keyword.label = jQuery(featureXml).attr("label");
		keyword.link = "http://www.uniprot.org/keywords/?query=" + jQuery(featureXml).attr("label"); 
		this._keywords.push(keyword);
	},	
	/* 
     * Function: Biojs.UniProtDiseaseSummary._setComment
     * Purpose:  parse comment information
     * Returns:  -
     * Inputs:  featureXml -> {String} DAS XML
     */		
	_setComment: function (featureXml){
		/* Find OMIM accs and notes */
		var diseaseHeader = "DISEASE: ";
		var comment = new Object();
		comment.omimAccs = new Array();
		comment.pubmedAccs = new Array();
		comment.notes = new Array();
		jQuery(featureXml).find("NOTE").each(function(){
			var omimPatern = /\[MIM\:[0-9]*\]/i; //[MIM:166200]
			var note = jQuery(this).text();
			if (note.indexOf(diseaseHeader) == 0) {
				note = note.substring(diseaseHeader.length,note.length);
			}
			if(note.match(omimPatern) != null){
				var omim = note.match(omimPatern)[0];
				var omimIndexStart = note.indexOf(omim);
				var omimIndexEnd = parseInt(omimIndexStart) + omim.length;
				note = note.substring(0,omimIndexStart-1) + note.substring(omimIndexEnd,note.length);
				comment.omimAccs.push(omim.substring(5,omim.length-1));	
			}	
			comment.notes.push(note);			
		});	
		/* Find Pubmed accs */	
		jQuery(featureXml).find("LINK").each(function(){
			var linkHref = jQuery(this).attr("href");
			pubmedAcc ="";
			var pubmedUrl = "http://www.ncbi.nlm.nih.gov/pubmed/";
			var pubmedUrlIndex = linkHref.indexOf(pubmedUrl);
			if(pubmedUrlIndex == 0){
				pubmedAcc = linkHref.substring(pubmedUrl.length,linkHref.length);
				comment.pubmedAccs.push(pubmedAcc);		
			}	
		});	
		this._comments.push(comment);
		Biojs.console.log(comment.omimAccs);	
		Biojs.console.log(comment.pubmedAccs);
		Biojs.console.log(comment.notes);		
	},		
	


	/**
	* Default values for the options
	* @name Biojs.UniProtDiseaseSummary-opt
	*/
	opt: {
		target: 'uniprotDiseaseSummary',
		uniProtDasUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/features?segment=P08123;type=BS:01019',
		keywordFiltereing: [],
		proxyUrl: '../biojs/dependencies/proxy/proxy.php',		
		width: '100%',
		referencesColumnWidth: '150px',
		tableHeader: false,
		componentTitle: false
	},
   /**
    * Array containing the supported event names
    * @name Biojs.UniProtDiseaseSummary-eventTypes
    */
	eventTypes: []
});