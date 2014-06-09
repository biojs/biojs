 /**
  * @class
  * @extends Biojs
  * @author <a href = "mailto:ianwdunlop@gmail.com">Ian Dunlop</a>
  * @version 1.0.0
  * @category 2
  * 
  * @param {Object} options An object with the options for the component.
 
  * @option {string} appID
  *    application ID used to access the Open PHACTS API.
  * 
  * @option {string} appKey
  *    application Key used to access the Open PHACTS API. 
  *     
  * @option {string} appURL 
  *    Location of the Open PHACTS API. 
  *
  * @option {string} URI
  *    URI for the compound you are interested in.
  * 
  * 
  * @example
  * var instance = new Biojs.OPSCompoundInfo({
  *    appID: '123456',
  *    appKey: '654321',
  *    appURL: 'http:/ / beta.openphacts.org / 1.3 ',
  *    URI: 'http: //ops.rsc.org/OPS403534'
  * }); 
  */
 Biojs.OPSCompoundInfo = Biojs.extend(
     /** @lends Biojs.OPSCompoundInfo# */
     {
         constructor: function(options) {

             this.base(options);
	     var self = this;
             var searcher = new Openphacts.CompoundSearch(this.opt.appURL, this.opt.appID, this.opt.appKey);
             var callback = function(success, status, response) {
                 var compoundResult = searcher.parseCompoundResponse(response);
                 jQuery('#' + self.opt.target).replaceWith('<div>' + compoundResult.prefLabel + '</div>');
 	     };
             searcher.fetchCompound(this.opt.URI, null, callback);
         },
        opt: {
            target: 'component',
            appID: undefined,
            appKey: undefined,
            appURL: undefined,
            URI: undefined
        }
     }
)
