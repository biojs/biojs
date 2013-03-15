/**
 * BioJS component to display Rhea reactions.
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:rafael.alcantara@ebi.ac.uk">Rafael Alcántara</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='../biojs/css/Rheaction.css'>Rheaction.css</a>
 * @dependency <link href="../biojs/css/biojs.Rheaction.css" rel="stylesheet" type="text/css" />
 * 
 * @param {Object} options An object with the options for the component.
 *
 * @option {string} target
 *  The ID of the DIV tag where the component should be displayed.
 *
 * @option {string} id
 *  The Rhea ID, with or without 'RHEA:' prefix.
 *
 * @option {string} [dimensions='200']
 *  The dimensions of compound structure images (side of the square) in pixels.
 *
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *  This component needs to request data from a web service. To bypass the same origin policy 
 *  (http://en.wikipedia.org/wiki/Same_origin_policy) this component needs a proxy.  
 *  You could use your own proxy by modifying this value or one of the BioJS proxies: 
 *  '../biojs/dependencies/proxy/proxy.php' or '../biojs/dependencies/proxy/proxy.jsp'
 *  
 *
 * @example
 * var instance = new Biojs.Rheaction({
 *  target: 'YourOwnDivId',
 *  id: '21881'
 * });
 */
Biojs.Rheaction = Biojs.extend (
/** @lends Biojs.Rheaction# */
{
    constructor: function (options){
		//Biojs.console.enable();
		this.setId(this.opt.id);
    },
	/**
	 * Sets and displays data for a new identifier.
	 * @param {string} id The identifier.
	 * 
	 * @example 
	 * instance.setId("RHEA:10280");
	 * 
	 * @example 
	 * instance.setId("10735");
	 * 
	 * @example 
	 * instance.setId("RHEA:18476");
	 * 
	 * @example 
	 * instance.setId("XXXXX");
	 * 
	 */
	setId: function(id){
		this._clearContent();
        var self = this;
		var rheaId = id.replace('RHEA:', '');
        this._rheaIdLabel = 'RHEA_' + rheaId;
        if ( "string" == (typeof this.opt.target) ) {
			this._container = jQuery( "#" + this.opt.target );
		} else {
			this.opt.target = "biojs_Rheaction_" + rheaId;
			this._container = jQuery('<div id="'+ this.opt.target +'"></div>');
		}
        this._container.addClass('scrollpane');
        this._reactionRow = jQuery('<div/>',{"class":'reactionRow'});
        this._container.append(this._reactionRow);
        this._getCml(rheaId);		
	},

    /** 
     * Default values for the options.
     * @name Biojs.Rheaction-opt
     */
    opt: {
        target: undefined,
        id: undefined,
        dimensions: '200',
        proxyUrl: '../biojs/dependencies/proxy/proxy.php',
        rheaWsUrl: 'http://www.ebi.ac.uk/rhea/rest/1.0/ws/reaction/cmlreact/',
        chebiUrl: 'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
        chebiImgUrl: 'http://www.ebi.ac.uk/chebi/displayImage.do?defaultImage=true&scaleMolecule=true&chebiId='
    },
	
	_clearContent: function(){
		jQuery("#" + this.opt.target).html("");
	},
	
	_displayNoDataMessage: function(){
		jQuery('#'+this.opt.target+'').html(Biojs.Rheaction.MESSAGE_NODATA);
	},

    _getCml: function(rheaId){
        var self = this;
        var reactionUrl = this.opt.rheaWsUrl + rheaId;
        var httpRequest = {
            url: reactionUrl,
            method: 'GET',
			/** @ignore No need to document this object */
            success: function(xml){
                self._dataReceived(xml);
            },
            error: function(qXHR, textStatus, errorThrown){
				Biojs.console.log("ERROR requesting reaction. Response: " + textStatus);
            }
        };

		// Using proxy?
	   	// Redirect using the proxy and encode all params as url data
	   	if ( this.opt.proxyUrl != undefined ) {
	   		 // Redirect to proxy url
	   		 httpRequest.url = this.opt.proxyUrl;
	   		 // Encode both url and parameters under the param url
	   		 httpRequest.data = [{ name: "url", value: reactionUrl }];
	   		 // Data type 
	   		 httpRequest.dataType = "text";
	   	}

		jQuery.ajax(httpRequest);
    },

    _dataReceived: function(xml){
        var self = this;
        var data = {};
		var xmlDoc = "";
        if (xml.length > 0){
			try {
				xmlDoc = jQuery.parseXML(xml);
				xmlResult = jQuery(xmlDoc).find('reaction');
	            var reactants = xmlResult.find('reactant');
	            for (var i = 0; i < reactants.length; i++){
	                if (i > 0) self._addPlus();
	                self._addParticipant(reactants[i]);
	            }
	            self._addDirection(xmlResult.attr('convention'));
	            var products = xmlResult.find('product');
	            for (var i = 0; i < products.length; i++){
	                if (i > 0) self._addPlus();
	                self._addParticipant(products[i]);
	            }
			} catch (e) {
				Biojs.console.log("ERROR decoding ");
				Biojs.console.log(e);
				this._displayNoDataMessage();
			}
        }
    },
	

    _addPlus: function(){
        jQuery('<div/>', { "class": 'direction', html: '+' })
                .appendTo(this._reactionRow);
    },

    _addDirection: function(convention){
        var direction = convention.replace('rhea:direction.', '');
        var dirLabel = undefined;
        switch (direction){
        case 'UN':
            dirLabel = '&lt;?&gt;';
            break;
        case 'BI':
            dirLabel = '&lt;=&gt;';
            break;
        default:
            dirLabel = '=&gt;';
            break;
        }
        jQuery('<div/>', { "class": 'direction', html: dirLabel })
                .appendTo(this._reactionRow);
    },

    _addParticipant: function(participant){
        var coef = parseInt(participant.attributes['count'].value);
        var molecule = jQuery(participant).find('molecule')[0];
        var compoundName = molecule.attributes['title'].value;
        var chebiId = molecule.attributes['id'].value.replace('CHEBI:', '');
        var compDivId = this._rheaIdLabel + '_CHEBI_' + chebiId;

        jQuery('<div/>', {
                id: compDivId,
                "class": 'compound',
                css: { width: this.opt.dimensions }
        }).appendTo(this._reactionRow);
        if (coef > 1){
            $('#'+compDivId).append(jQuery('<span/>', {
                "class": 'stoichCoef',
                html: coef
            }));
        }
        $('#'+compDivId).append(jQuery('<a/>', {
                "class": 'compoundName',
                html: compoundName,
                href: this.opt.chebiUrl + chebiId,
                title: 'CHEBI:' + chebiId
        }));
        $('#'+compDivId).append(jQuery('<br/>'));
        var imgUrl = this.opt.chebiImgUrl + chebiId
                + '&dimensions=' + this.opt.dimensions;
        $('#'+compDivId).append(jQuery('<img/>', {
                src: imgUrl,
                "class": 'compoundStructure',
                title: 'CHEBI:' + chebiId
        }));
    }
},{
	MESSAGE_NODATA: "Sorry, no results for your request",
});

