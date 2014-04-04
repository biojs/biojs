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
	 * @name Biojs.CircularGenomeFeatureViewer-opt
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
    
    eventTypes: [
        /**
		 * @name Biojs.CircularGenomeFeatureViewer#onAnnotationMouseover
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {Object} target annotation.
		 * @example 
		 * myCircularGenomeFeatureViewer.onAnnotationMouseover(
		 *    function( objEvent ) {
		 *       alert("Annotation: " + objEvent.start + ", " + objEvent.stop );
		 *    }
		 * );
		 * 
		 * */
        'onAnnotationMouseover',
        /**
		 * @name Biojs.CircularGenomeFeatureViewer#onAnnotationMouseout
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {Object} target annotation.
		 * @example 
		 * myCircularGenomeFeatureViewer.onAnnotationMouseout(
		 *    function( objEvent ) {
		 *       alert("Annotation: " + objEvent.start + ", " + objEvent.stop );
		 *    }
		 * );
		 * 
		 * */
        'onAnnotationMouseout',
        /**
		 * @name Biojs.CircularGenomeFeatureViewer#onAnnotationClick
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {Object} target annotation.
		 * @example 
		 * myCircularGenomeFeatureViewer.onAnnotationClick(
		 *    function( objEvent ) {
		 *       alert("Annotation: " + objEvent.start + ", " + objEvent.stop );
		 *    }
		 * );
		 * 
		 * */
        'onAnnotationClick',
        /**
		 * @name Biojs.CircularGenomeFeatureViewer#onAnnotationAdded
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {Object} target annotation.
		 * @example 
		 * myCircularGenomeFeatureViewer.onAnnotationAdded(
		 *    function( objEvent ) {
		 *       alert("Annotation: " + objEvent.start + ", " + objEvent.stop );
		 *    }
		 * );
		 * 
		 * */
        'onAnnotationAdded',
        /**
		 * @name Biojs.CircularGenomeFeatureViewer#onAnnotationRemoved
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {Object} target annotation.
		 * @example 
		 * myCircularGenomeFeatureViewer.onAnnotationRemoved(
		 *    function( objEvent ) {
		 *       alert("Annotation: " + objEvent.start + ", " + objEvent.stop );
		 *    }
		 * );
		 * 
		 * */
        'onAnnotationRemoved'
    ],
    
    // internal members
    _efetch: 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',//NCBI efetch URL
    _database : 'nucleotide',//NCBI database to query
    _format : 'xml',//query result format
    _rettype: 'gb',//query rettype
    
    /**
	 * Rotates all annotations so the desired sequence position is at 12 o'çlock.
	 * @param {int} pos The sequence position.
	 * 
	 * @example 
	 * myCircularGenomeFeatureViewer.goTo(1000);
     *
     * @example 
	 * myCircularGenomeFeatureViewer.goTo(1);
	 * 
	 */
    goTo : function(pos){
        this.base(pos);
    },
    /**
	 * Adds a new annotation.
	 * @param {Object} annotation The annotation.
	 * 
	 * @example 
	 * myCircularGenomeFeatureViewer.addAnnotation({ "id": 14, "start": 351, "stop": 1200, "type": "dolore" });
	 * 
	 */
    addAnnotation : function(annotation){
        this.base(annotation);
    },
    
    /**
	 * Removes an annotation from the visualization.
	 * @param {int} id The annotation id.
	 * 
	 * @example 
	 * myCircularGenomeFeatureViewer.removeAnnotation(1);
	 * 
	 */
    removeAnnotation : function(id){
        this.base(id);
    },
    
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