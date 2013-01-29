/** 
 * EBI Global Search
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * @version 1.0.0
 * @category 2
 * 
 * @requires <a href='http://blog.jquery.com/2012/08/09/jquery-1-8-released/'>jQuery Core 1.8.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
 *
 * @requires <a href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/ebi-visual.css">ebi-visual.css</a>
 * @dependency <link rel="stylesheet" href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/ebi-visual.css" type="text/css" />
 * 
 * @requires <a href='../biojs/css/Biojs.EbiGlobalSearch.css'>EbiGlobalSearch.css</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/Biojs.EbiGlobalSearch.css" rel="stylesheet" type="text/css" />
 * 
 * @param {Object} options Component options
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed
 * 
 * @option {string} query [query='keratin']
 * 	  Query to retrieve EBI search results
 *  
 * @option {string} [searchBaseURL='www.ebi.ac.uk/ebisearch/']
 * 	  Base URL of the REST service which provides the data
 * 
 * @option {string} [style='basic']
 * 	  Pptions to display this component: basic, collapsible or expanded
 * 
 * @example
 * var instance = new Biojs.EbiGlobalSearch({
 * 	  target: 'YourOwnDivId',
 * 	  query: 'p53',
 * 	  searchBaseURL: 'http://www.ebi.ac.uk/ebisearch/',
 * 	  style: 'collapsible' // basic | collapsible | expanded
 * });
 * 
 */
Biojs.EbiGlobalSearch = Biojs.extend(
/** @lends Biojs.EbiGlobalSearch# */
{	
	constructor: function (options) {
		//Biojs.console.enable();
		this.setQuery(this.opt.query);	
	},
	
	/**
	 * Default values for the options
	 * @name Biojs.EbiGlobalSearch-opt
	 */
	opt: {
		target: "YourOwnDivId",
		query: undefined,
		searchBaseURL: 'http://www.ebi.ac.uk/ebisearch/',
		style: 'collapsible'
	},
	
	/**
	 * Set query for the service.
	 * @param {string} query Query.
	 * @param {string} style Style: 'basic', 'collapsible' or 'expanded'.
	 * 
	 * @example 
	 * instance.setQuery("ENSG00000100867");
	 * 
	 * @example 
	 * instance.setQuery("Q61171");
	 * 
	 * @example 
	 * instance.setQuery("actin");
	 * 
	 * @example 
	 * instance.setQuery("keratinnn");
	 * 
	 */
	setQuery: function(query, style){
		this._completedRequest = false;
		if(typeof style != 'undefined'){
			this.opt.style = style;
		}
		if (typeof query != 'undefined') {
			this.opt.query = query;
			this._drawTemplate();
			if(this.opt.style != Biojs.EbiGlobalSearch.VIEW_COLLAPSIBLE){
				this._updateSummary();
			}
		} else {
			var message = "ERROR: Query error: " + Biojs.EbiGlobalSearch.QUERY_ERROR_UNDEFINED;
			Biojs.console.log(message);
			this.raiseEvent( Biojs.EbiGlobalSearch.EVT_ON_ERROR, { message: message} );
		}	
	},

	/**
	 * Test styles for the service.
	 * @param {string} style Style: 'basic', 'collapsible' or 'expanded'.
	 * 
	 * @example 
	 * instance.setStyle('basic');
	 * 
	 * @example 
	 * instance.setStyle('collapsible');
	 * 
	 * @example 
	 * instance.setStyle('expanded');
	 */	
	setStyle: function(style){
		this.setQuery(this.opt.query, style);
	},

	
	/* 
     * Function: Biojs.EbiGlobalSearch._updateSummary
     * Purpose:  It handles the request
     * Returns:  -
     * Inputs:  -
     */
	_updateSummary: function() {
		var self = this;
		var url = this.opt.searchBaseURL+"globalsearchsummary.ebi?query="+this.opt.query;
		jQuery.ajax({
			url: url,
			context: this,
			dataType: "json"
			//crossDomain: true //Does not work in IE 
		}).done(function( response ) {
			Biojs.console.log("SUCCESS: data received");
			self._completedRequest = true;
			self._drawResults(response)
		}).fail(function(jqXHR, textStatus) {
			var errorMessage = "ERROR: Request failed: " + textStatus;
			if(this.opt.query == ""){
				errorMessage = errorMessage + ": Empty query";	
			}
			Biojs.console.log(errorMessage);
			self.raiseEvent(
				Biojs.EbiGlobalSearch.EVT_ON_ERROR,{ "message": errorMessage}
			);
			self._drawResults(errorMessage);
		});
	},

	
	/* 
     * Function: Biojs.EbiGlobalSearch._updateSummary
     * Purpose:  It handles the request
     * Returns:  -
     * Inputs: ul -> {object} ul jquery element.
     * 		   end -> {object} One item result.
     */
    _renderItem: function(ul, item) {
		jQuery( "<li>" )
	    	.append( jQuery( "<a>" ).attr("href", this.opt.searchBaseURL+item.url)
	    					   .text( item.name + " ("+item.numberOfResults+")" )
	    	).appendTo( ul );			
    },
	
	/* 
     * Function: Biojs.EbiGlobalSearch._updateSummary
     * Purpose:  It handles the request
     * Returns:  -
     * Inputs: response -> {object} Results from the service.
     * 		   ul -> {object} ul jquery element.
     */	
    _renderItems: function(response, ul) {
    	var self = this;
		var totalNumberOfResults = 0;
		var totalNumberOfServices = 0;
		var totalNumberOfServicesWithResults = 0;
        jQuery.each(response, function(index, item) {
           totalNumberOfServices++;
		   if(item.numberOfResults != 0){
		   	self._renderItem(ul, item);
		   	totalNumberOfResults += parseInt(item.numberOfResults);
		   	totalNumberOfServicesWithResults++;
		   }
        }); 
        /* display "No results" */
        if(totalNumberOfResults == 0){
			var noResultsMessage = "No results for \""+this.opt.query+"\"";	
			var search_extras = jQuery("#" + Biojs.EbiGlobalSearch.SEARCH_EXTRAS);
			search_extras.find("ul").css("display", "none");
			search_extras.find("p").text(noResultsMessage);
		}        
		/* raise event with number of results */
        this.raiseEvent(
			Biojs.EbiGlobalSearch.EVT_ON_RESULTS, 
			{ "resutls" : totalNumberOfResults, "services" : totalNumberOfServices, "servicesWithResults" : totalNumberOfServicesWithResults, "items" : response }
		);   
    	
        
    },
	
	
	/* 
     * Function: Biojs.EbiGlobalSearch._drawTemplate
     * Purpose:  Draw template
     * Returns:  -
     * Inputs:  -
     */
	_drawTemplate: function(){
		/* BASIC style */
		if(this.opt.style.toLowerCase() == Biojs.EbiGlobalSearch.VIEW_BASIC){	
			var thisElem = jQuery("#" + this.opt.target);
			thisElem.html("");
			var search_extras = jQuery("<aside id='"+Biojs.EbiGlobalSearch.SEARCH_EXTRAS+"'></aside>");
			search_extras.appendTo(thisElem);
			search_extras.removeClass("shortcuts");
			search_extras.text("Loading other results");
			search_extras.addClass("loading");

		/* COLLAPSIBLE style */
		} else if (this.opt.style.toLowerCase() == Biojs.EbiGlobalSearch.VIEW_COLLAPSIBLE) {
			var self = this;
			var thisElem = jQuery("#" + this.opt.target);
			thisElem.html("");
			var search_extras = jQuery("<aside id='"+Biojs.EbiGlobalSearch.SEARCH_EXTRAS+"'></aside>");
			search_extras.appendTo(thisElem);
			search_extras.addClass("shortcuts expander");
			var ebi_search_results = jQuery("<div id='"+Biojs.EbiGlobalSearch.EBI_SEARCH_RESULTS+"'></div>");
			ebi_search_results.appendTo(search_extras);
			var h3 = jQuery("<h3 data-icon='u'>Show more data from EMBL-EBI</h3>");
			h3.addClass("slideToggle icon icon-functional");
			h3.appendTo(ebi_search_results);	
			
	        jQuery('#ebi_search_results .slideToggle[data-icon="u"]').next().hide();
	        jQuery("#ebi_search_results .slideToggle").click(function() {
	            jQuery(this).attr("data-icon") === 'u' ? jQuery(this).attr("data-icon", "w") : jQuery(this).attr("data-icon", "u");
	            if (jQuery(this).attr("data-icon") === 'w') {		
					if(self._completedRequest != true){
						h3.addClass("loading");
						self._updateSummary();	
					}             
	            }
				jQuery(this).parent().find("p").slideToggle(300);
	            jQuery(this).parent().find("ul").slideToggle(300);
	        });
			
		/* EXPANDED style or any other style selected */	
		} else {
			var thisElem = jQuery("#" + this.opt.target);
			thisElem.html("");
			var search_extras = jQuery("<aside id='"+Biojs.EbiGlobalSearch.SEARCH_EXTRAS+"'></aside>");
			search_extras.appendTo(thisElem);
			search_extras.addClass("shortcuts");
			var ebi_search_results = jQuery("<div id='"+Biojs.EbiGlobalSearch.EBI_SEARCH_RESULTS+"'></div>");
			ebi_search_results.appendTo(search_extras);
			var h3 = jQuery("<h3>More data from EMBL-EBI</h3>");
			h3.addClass("loading");
			h3.appendTo(ebi_search_results);	
		}
	},

	
	/* 
     * Function: Biojs.EbiGlobalSearch._drawResults
     * Purpose:  Draw results
     * Returns:  -
     * Inputs: response -> {object} Results from the service.
     */
	_drawResults: function(response){
		var self = this;
		
		/* BASIC style */
		if(this.opt.style.toLowerCase() == Biojs.EbiGlobalSearch.VIEW_BASIC){
			var search_extras = jQuery("#" + Biojs.EbiGlobalSearch.SEARCH_EXTRAS);
			search_extras.html("");
			search_extras.removeClass("loading");
			search_extras.append("<p>EBI global search results</p>");
			//container.blink({delay: 500});
			if(typeof response != "string"){
				/* Print results */
				var ul = jQuery("<ul>").appendTo(search_extras);
	        	self._renderItems(response, ul);	
			} else {
				/* Print error response */
				jQuery("<p>"+response+"</p>").appendTo(search_extras);		
			}
			
			

		/* COLLAPSIBLE style */
		} else if (this.opt.style.toLowerCase() == Biojs.EbiGlobalSearch.VIEW_COLLAPSIBLE) {
			var self = this;
			var ebi_search_results = jQuery("#" + Biojs.EbiGlobalSearch.EBI_SEARCH_RESULTS);
			jQuery(ebi_search_results).find("h3").removeClass("loading");
			jQuery(ebi_search_results).find("ul").remove();
        	jQuery(ebi_search_results).find("p").remove();
			if(typeof response != "string"){
				/* Print results */
				var p = jQuery("<p>Other results for \"" + this.opt.query + "\"</p>");
				p.appendTo(ebi_search_results);
				var ul = jQuery("<ul>");
				ul.attr("id", "global-search-results");
				ul.appendTo(ebi_search_results);
		        self._renderItems(response, ul);
			} else {
				/* Print error response */
				jQuery("<p>"+response+"</p>").appendTo(ebi_search_results);		
			}

		/* EXPANDED style or any other style selected */	
		} else {
			var ebi_search_results = jQuery("#" + Biojs.EbiGlobalSearch.EBI_SEARCH_RESULTS);
			jQuery(ebi_search_results).find("h3").removeClass("loading");
			if(typeof response != "string"){
				/* Print results */
				var p = jQuery("<p>Other results for \"" + this.opt.query + "\"</p>");
				p.appendTo(ebi_search_results);
				var ul = jQuery("<ul>");
				ul.attr("id", "global-search-results");
				ul.appendTo(ebi_search_results);
				self._renderItems(response, ul);
			} else {
				/* Print error response */
				jQuery("<p>"+response+"</p>").appendTo(ebi_search_results);		
			}			
		}


	
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.EbiGlobalSearch-eventTypes
	 */
	eventTypes: [
		/**
		 * @name Biojs.EbiGlobalSearch#onError
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {string} message Error message in case of result be 'failure'.
		 * 
		 * @example 
		 * instance.onError(
		 *    function( e ) {
		 *       alert( e.message );
		 *    }
		 * ); 
		 * 
		 **/
		"onError",
		
		
		/**
		 * @name Biojs.EbiGlobalSearch#onResults
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {int} resutls Number of total results.
		 * @eventData {int} items Number of items.
		 * @example 
		 * instance.onResults(
		 *    function( objEvent ) {
		 *       alert( objEvent.resutls + " results for " + objEvent.servicesWithResults + " services of " + objEvent.services + " services queried" );
		 *    }
		 * ); 
		 * 
		 **/
		"onResults"
	]


	
},{
	// Some static values
	
	// Query errors
	QUERY_ERROR_UNDEFINED: "Query undefined",
	QUERY_ERROR_USER_MESSAGE: "Sorry, we could not process your request",
	
	// Events
	EVT_ON_ERROR: "onError",
	EVT_ON_RESULTS: "onResults",
	
	// IDs
	EBI_SEARCH_RESULTS: 'ebi_search_results',
	SEARCH_EXTRAS: 'search-extras',
	
	//views
	VIEW_BASIC: 'basic',
	VIEW_COLLAPSIBLE: 'collapsible',
	VIEW_EXPANDED: 'expanded'
	

	
});
