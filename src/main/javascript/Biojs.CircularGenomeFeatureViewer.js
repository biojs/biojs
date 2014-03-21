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
        nucleotide: '251831106',
        features: [],
        width: 500,
        height: 500
    },
    eventTypes: [],
    _efetch: 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
    _database : 'nuccore',
    _format : 'xml',
    _getNCBIAnnotations: function(nucleotide){
        var xml = null;
        $.ajax({
            url: this._efetch,
            data: { db: this._database, id: nucleotide, retmode:this._format },
            async: false,
            dataType: "xml",
            success: function(res){
                xml = res;
            }
        });
        console.log(xml);
        
        this.opt.sequence = $(xml).first().find('GBSeq_sequence').text();
        
        var feats = _.filter($(xml).find('GBFeature'), function(feat){
            var key = $(feat).find('GBFeature_key').text();
            return  key != 'source' && key != 'STS' && key != 'misc_feature'; 
        });
        
        feats = _.map(feats, function(feat, i){
            console.log(feat);
            
            var start = +$(feat).find('GBInterval_from').text(), stop = +$(feat).find('GBInterval_to').text();
            
            return {
                id : -i-1,
                start : start,
                stop : stop,
                type : $(feat).find('GBFeature_key').text(),
                text : $(feat).find('GBInterval_accession').text()
            };
        });
        
        console.log(feats);
        this.opt.features = feats;
    }
});