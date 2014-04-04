/**
 * This is the ExpressionAtlas component for displaying baseline expression of genes
 *  based on RNA-seq experiments in the ExpressionAtlas database.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:atlas-developers@ebi.ac.uk">ExpressionAtlas Team</a>
 * @version 1.0.3
 * @category 3
 *
 * @requires <a href='http://code.jquery.com/jquery-1.9.1.min.js'>jQuery Core 1.9.1</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.9.1.min.js"></script>
 *
 * @param {Object} options An object with the options for ExpressionAtlasBaselineSummary component.
 *
 * @option {string} [featuresUrl='http://www.ebi.ac.uk/gxa/widgets/heatmap/protein']
 *    The query URL pointing to the ExpressionAtlas for retrieving gene page results
 *    displayed as part of this widget. It is usually composed to include the identifier
 *    of the gene you are interested in, see example.
 *
 * @option {string} geneQuery
 *    ENSEMBL gene ids or UniProt ids. If more than one identifier follow this format "P00846+P99999"
 *
 * @option {string} [propertyType='']
 *    To narrow to search scope of a query term, please provide a type.
 *
 * @option {string} [geneSetMatch=false]
 *    If true collapse multiple returned gene profiles into one single line of average expression.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} [rootContext='../biojs/dependencies/proxy/proxy.php?url%3dhttp://www.ebi.ac.uk/gxa']
 *    Specifies the root context path to be used by the widget content,
 *    i.e. this is the location of the content proxy pointing to ExpressionAtlas
 *
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    This component needs to request data from a web service. To bypass the same origin policy
 *    (http://en.wikipedia.org/wiki/Same_origin_policy) this component needs a proxy.
 *    You could use your own proxy by modifying this value or one of the BioJS proxies:
 *    '../biojs/dependencies/proxy/proxy.php' or '../biojs/dependencies/proxy/proxy.jsp'
 *
 * @example
 *    var instance = new Biojs.ExpressionAtlasBaselineSummary({
 *      geneQuery:"ENSG00000187003+ENSG00000185264",
 *      propertyType:"bioentity_identifier",
 *      geneSetMatch:false,
 *      target : "YourOwnDivId"
 *    });
 *
 */


Biojs.ExpressionAtlasBaselineSummary = Biojs.extend(
    /** @lends Biojs.ExpressionAtlasBaselineSummary# */
    {

        /**
         * Constructor to initialize the component
         * @name Biojs.ExpressionAtlasBaselineSummary-constructor
         */
        constructor:function (options) {
            //Biojs.console.enable();
	    this._containerDiv = jQuery("#" + this.opt.target);
	    this.setQuery(this.opt.geneQuery, this.opt.propertyType, this.opt.geneSetMatch);
        },

	/**
	 * Set ENSEMBL gene ids or UniProt ids.
	 * @param {string} geneQuery ENSEMBL gene ids or UniProt ids. If more than one identifier follow this format "P00846+P99999".
	 * @param {string} propertyType Property to narrow to search scope of a query term, please provide a type.
	 * @param {boolean} geneSetMatch If true collapse multiple returned gene profiles into one single line of average expression.
	 * 
	 * @example 
	 * instance.setQuery("ENSG00000187003+ENSG00000185264","bioentity_identifier",false);
	 * 
	 * @example 
	 * instance.setQuery("Q61171","",false);
	 * 
	 * @example 
	 * instance.setQuery("P37173+Q9UER7+P10600+P35243+Q93074+P16234","",false);
	 * 
	 * @example 
	 * instance.setQuery("ENSG000000000000","bioentity_identifier",false);
	 * 
	 */
	setQuery: function(geneQuery, propertyType, geneSetMatch){
		this.opt.geneQuery = geneQuery;
		this.opt.propertyType = propertyType;
		this.opt.geneSetMatch = geneSetMatch;
		this._containerDiv.empty();

		/* Check if it is Uniprot or Ensembl ID. Correct propertyType if necessary */
		var listOfIds = geneQuery.split("+");
		this._identifierDb = this._checkIdentifier(listOfIds[0]);
		if(this._identifierDb == Biojs.ExpressionAtlasBaselineSummary.ID_UNIPROT){
			this.opt.propertyType = "";
		} else if (this._identifierDb == Biojs.ExpressionAtlasBaselineSummary.ID_ENSEMBL){
			this.opt.propertyType = "bioentity_identifier";
		}	

		/* Set url */
		var url = this.opt.featuresUrl + "?geneQuery=" + this.opt.geneQuery;
		if(this.opt.propertyType != ""){
			url = url + "&propertyType=" + this.opt.propertyType;
		}
		if(this.opt.geneSetMatch == true){
			url = url + "&geneSetMatch=true";
		}
		if (this.opt.proxyUrl != "") {
			url = this.opt.proxyUrl + "?url=" + url;
		}

		/* Set url and start the request */
		var self = this;
		var httpRequest = {
		url:url,
		data:{rootContext:this.opt.rootContext},
		method:"GET",
		/** @ignore No need to document this object */
		beforeSend:function () {
		    self._containerDiv.html("<img src='http://www.ebi.ac.uk/gxa/resources/images/loading.gif' />");
		},
		/** @ignore No need to document this object */
		success:function (htmlResponse) {
		    Biojs.console.log("SUCCESS: data received");
		    Biojs.console.log(htmlResponse);
		    self._containerDiv.html(htmlResponse);
		},
		/** @ignore No need to document this object */
		error:function (xhr, ajaxOptions, thrownError) {
		    Biojs.console.log("ERROR: " + xhr.status);
		    self._containerDiv.html("An error occurred while retrieving the data: " + xhr.status + " - " + xhr.statusText);
		    self.raiseEvent(
		    	"onError",
			{ "message": "AJAX request failed", "jqXHR":xhr, "textStatus":ajaxOptions, "errorThrown":thrownError }
		    );
		}
		};

		jQuery.ajax(httpRequest);
	},

    /* 
     * Function: Biojs.ExpressionAtlasBaselineSummary._checkIdentifier
     * Purpose:  Check if the indetifier provided by the user is ENSEMBL or UniProt
     * Returns:  Database name (uniprot or ensembl)
     * Inputs:   id -> {String} Identifier.
     */
	_checkIdentifier: function(id){
		var self = this;
		self._re = /^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])$/;
		if (id.search(self._re) != -1){
			return Biojs.ExpressionAtlasBaselineSummary.ID_UNIPROT;
		} else if(id.substring(0,4) == "ENSG"){
			return Biojs.ExpressionAtlasBaselineSummary.ID_ENSEMBL;
		}	
	},

        /**
         *  Default values for the options
         *  @name Biojs.ExpressionAtlasBaselineSummary-opt
         */
        opt:{
	    /* Features URL
	     This consists of service url used to query for a particular
	     gene or genes by given their properties. For a single gene query,
	     please use a unique accession (e.g. ENSEMBL gene id or UniProt id).
	     For example search with UniProt id P00846 returns the gene mt-atp6,
	     a search for REACT_6900 returns genes belonging to this pathway.
	     To narrow to search scope of a query term, please provide a type:
	     &propertyType=bioentity_identifier (here only the identifier property is searched)
	     An additional parameter (&geneSetMatch=true) can be appended after
	     the query term to collapse multiple returned gene profiles into one
	     single line of average expression (this feature is still experimental).
	     For multiple identifiers of the same species please use:
	     geneQuery=ENSG00000187003+ENSG00000185264&propertyType=bioentity_identifier
	     */
	    featuresUrl:'http://www.ebi.ac.uk/gxa/widgets/heatmap/protein',
            geneQuery:"",
	    propertyType:"",
	    geneSetMatch:"",
            /* Target DIV
             This mandatory parameter is the identifier of the DIV tag where the
             component should be displayed. Use this value to draw your
             component into. */
            target:"YourOwnDivId",
            /* Root context
             This is an optional parameter to specify the root context path to
             be used by the widget content, i.e. this is pointing to the
             content proxy where required.
             */
            rootContext:'../biojs/dependencies/proxy/proxy.php?url=http://www.ebi.ac.uk/gxa',
            /* Proxy URL
             To bypass the same origin policy this component needs a proxy, which
             can be set here.
             */
            proxyUrl:"../biojs/dependencies/proxy/proxy.php"
        },


        /**
         * Array containing the supported event names
         * @name Biojs.ExpressionAtlasBaselineSummary-eventTypes
         */
        eventTypes:[
        		/**
        		 * @name Biojs.ExpressionAtlasBaselineSummary#onError
        		 * @event
        		 * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
			 * @eventData {string} message Error message in case of result be 'failure'.
			 * @eventData {Object} jqXHR XMLHttpRequest object
			 * @eventData {string} textStatus It describes the type of error that occurred and an optional exception object, if one occurred
			 * @eventData {string} errorThrown When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error." 
			 * 
        		 * @example 
        		 * instance.onError(
        		 *    function( error ) {
        		 *       alert( error.message );
        		 *    }
        		 * ); 
        		 * 
        		 **/
        		"onError"
        ]

    },{
	ID_UNIPROT: "uniprot",
	ID_ENSEMBL: "ensembl"	
});
