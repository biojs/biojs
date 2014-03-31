/**
 * 
 * Component that renders NCBI annotations for circular genomes such as bacterial genomes or mitocondria.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:villaveces@biochem.mpg.de">José Villaveces</a>
 * @version 1.0.0_beta
 * @category 2
 *
 *
 * @requires <a href='http://d3js.org/'>D3 Data-Driven Documents</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js"></script>
 *
 * @requires <a href='http://underscorejs.org/'>underscore.js</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
 *
 * @requires <a href='http://jquery.com/'>jQuery</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
 *
 * @requires <a href='Biojs.CircularFeatureViewer.html'>Circular Feature Viewer</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="src/Biojs.CircularFeatureViewer.js"></script>
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    id of the div where the component should be displayed.
 * 
 * @option {string} nucleotide
 * 	  The NCBI nucleotide id.
 * 
 * @option {int} width
 * 	  desired width of the component.
 *
 * @option {int} height
 * 	  desired height of the component.
 *
 * @option {string[]} elementsToDisplay
 * 	  desired annotation types to display. Possible values include : source, gene, STS, rRNA, D-loop
 *
 * @option {boolean} mergeAnnotations
 * 	  wether NCBI annotations should be merged or not
 *
 * @option {Object[]} features
 * 	  Array containing additional annotations to be rendered.
 *
 * @option {int} id
 * 	  Annotation identifier.
 *
 * @option {int} start
 * 	  Position at wich the annotation starts.
 *
 * @option {int} stop
 * 	  Position at wich the annotation terminates.
 *
 * @option {string[] || string} type
 * 	  Annotation type, annotation color is decided uppon the annotation type
 *
 * @example
 * var myCircularGenomeFeatureViewer = new Biojs.CircularGenomeFeatureViewer({
 *      target: 'YourOwnDivId',
 *		nucleotide: 'NC_012920.1',// Human Mitochondrion
 *      features:[
 *          { "id": 0, "start": 19, "stop": 305, "type": "voluptate", "color":"green" },
 *          { "id": 1, "start": 143, "stop": 283, "type": "non", "color":"red"}
 *      ],
 *      width:715,
 *      height:505,
 *      mergeAnnotations:false
 * });
 */
Biojs.CircularGenomeFeatureViewer = Biojs.CircularFeatureViewer.extend (
/** @lends Biojs.CircularGenomeFeatureViewer# */
{
    constructor: function (options) {
        
        this._getNCBIAnnotations(this.opt.nucleotide);
        // Calling super's constructor
		this.base(this.opt);
    },

    /**
	 * Default values for the options
	 * @name Biojs.CircularFeatureViewer-opt
	 */
    opt: {
        target: 'YourOwnDivId',
        nucleotide: 'NC_012920.1',
        features: [],
        elementsToDisplay: ['source', 'gene', 'STS', 'rRNA', 'D-loop'],
        width: 500,
        height: 500,
        mergeAnnotations: true
    },
    
    eventTypes: [],
    // internal members
    _efetch: 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',//NCBI efetch URL
    _database : 'nucleotide',//NCBI database to query
    _format : 'xml',//query result format
    _rettype: 'gb',//query rettype
    
    /* 
     * Function: Biojs.CircularGenomeFeatureViewer._getNCBIAnnotations
     * Purpose:  Queries the NCBI in order to retrieve nucleotide annotations
     * Returns:  -
     * Inputs: nucleotide -> {String} The nucleotide.
     */
    _getNCBIAnnotations: function(nucleotide){
        var xml = null;
        $.ajax({
            url: this._efetch,
            data: { db: this._database, rettype: this._rettype, retmode: this._format, id: nucleotide},
            async: false,
            dataType: "xml",
            success: function(res){
                xml = res;
            }
        });
        
        this.opt.sequence = $(xml).first().find('GBSeq_sequence').text();
        
        var self = this, feats = [];
        _.each($(xml).find('GBFeature'), function(feat){
            var key = $(feat).find('GBFeature_key').text();
            
            if(_.contains(self.opt.elementsToDisplay, key))
                self._mapFeature(feat, feats);
        });
        
        if(self.opt.mergeAnnotations){
            
            feats = _.groupBy(feats, function(feat){
                return feat.start+'-'+feat.stop;
            });
            
            feats = _.map(feats,function(arr){
                return _.reduce(arr, function(prev, now){ prev.type.push(now.type[0]); return prev; });
            });
        }
        
        this.opt.features = feats.concat(this.opt.features);
    },
    /* 
     * Function: Biojs.CircularGenomeFeatureViewer._mapFeature
     * Purpose:  Transforms an XML annotation into a JSON one and adds it to an array
     * Returns:  -
     * Inputs: feature -> {Object} The XML annotation.
     *         array -> the array to add the json annotation.
     */
    _mapFeature: function(feature, array){
        var key = $(feature).find('GBFeature_key').text();
        _.each($(feature).find('GBInterval'), function(interval){
            var isComp = $(interval).find('GBInterval_iscomp').attr('value'), 
                start = +$(interval).find('GBInterval_from').text(), 
                stop = +$(interval).find('GBInterval_to').text();
            
            var feat = {};
            if(isComp === undefined){
                feat = { start : start, stop : stop, type : [key], text : $(interval).find('GBInterval_accession').text()}
            }else{
                feat = { start : stop, stop : start, type : [key], text : $(interval).find('GBInterval_accession').text()}
            }
            
            array.push(feat)
        });
    }
});