 /**
  * Displays the information available in the Open PHACTS Linked Data cache about a compound. Requires an app key and ID available from https://dev.openphacts.org
  *
  * @class
  * @extends Biojs
  * @author <a href = "mailto:ianwdunlop@gmail.com">Ian Dunlop</a>
  * @version 1.0.0
  * @license MIT http://opensource.org/licenses/MIT
  *
  * @requires <a href='http://code.jquery.com/jquery-1.9.1.js'>jQuery Core 1.9.1</a>
  * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.9.1.min.js"></script>
  *
  * @requires <a href='https://github.com/openphacts/ops.js'>OPS.js</a>
  * @dependency <script src="../biojs/dependencies/openphacts/ops.js" type="text/javascript"></script>
  *
  * @requires <a href='https://github.com/openphacts/ops.js'>OPS.js</a>
  * @dependency <script src="../biojs/dependencies/openphacts/ops.js" type="text/javascript"></script>
  *
  * @requires <a href='http://handlebarsjs.com/'>Handlebars</a>
  * @dependency <script src="../biojs/dependencies/handlebars/handlebars-v1.3.0.js" type="text/javascript"></script>
  *
  * @requires <a href='../biojs/dependencies/openphacts/helpers.js'>Handlebars helpers</a>
  * @dependency <script src="../biojs/dependencies/openphacts/helpers.js" type="text/javascript"></script>
  *
  * @requires <a href='../biojs/css/biojs.openphacts.css'>Open PHACTS CSS</a>
  * @dependency <link href="../biojs/css/biojs.openphacts.css" rel="stylesheet" type="text/css" />
  *
  * @param {Object} options An object with the options for the component.
  *
  * @option {string} appID
  *    Application ID used to access the Open PHACTS API.
  *
  * @option {string} appKey
  *    Application Key used to access the Open PHACTS API.
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
  *    appID: '949a7c9c',
  *    appKey: '734a274b418b0dbe57fc40f86e85e20e',
  *    appURL: 'https://beta.openphacts.org/1.3',
  *    URI: 'http://ops.rsc.org/OPS403534',
  *    target: 'YourOwnDivId'
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
                 if (success) {
                     var compoundResult = searcher.parseCompoundResponse(response);
                     jQuery('#' + self.opt.target);
                     var template = '<div><div><div class="large-top-spacing"><div"><div class="left"><div style="padding:0 0 0 20px;background:white;">{{cs_image_src csURI}}</div>';
                     template += '<div id="boxes" class="small-top-spacing">{{#if logp}}<div class="summary-box"><div class="inner-property-content"><p><small>AlogP</small></p><p class="lead">{{logp}}</p></div></div>{{/if}}';
                     template += '{{#if hba}}<div class="summary-box"><div class="inner-property-content"><p><small># H-Bond Acceptors</small></p><p class="lead">{{hba}}</p></div></div>{{/if}}';
                     template += '{{#if hbd}}<div class="summary-box"><div class="inner-property-content"><p><small># H-Bond Donors</small></p><p class="lead">{{hbd}}</p></div></div>{{/if}}';
                     template += '{{#if fullMWT}}<div class="summary-box"><div class="inner-property-content"><p><small>Mol Weight</small></p><p class="lead">{{fullMWT}}</p></div></div>{{/if}}';
                     template += '{{#if mwFreebase}}<div class="summary-box"><div class="inner-property-content"><p><small>Mol Weight Freebase</small></p><p class="lead">{{mwFreebase}}</p></div></div>{{/if}}';
                     template += '{{#if psa}}<div class="summary-box"><div class="inner-property-content"><p><small>Polar Surface Area</small></p><p class="lead">{{psa}}</p></div></div>{{/if}}';
                     template += '{{#if rtb}}<div class="summary-box"><div class="inner-property-content"><p><small># Rotatable Bonds</small></p><p class="lead">{{rtb}}</p></div></div>{{/if}}</div></div>';
                     template += '<div><div><div><h1>{{prefLabel}}</h1></div><p class="pull-left">{{formatMolecularFormula molform}}</p></div>';
                     template += '<div class="summary-descriptive-text large-top-spacing">{{#if description}}<p>{{description}}</p>{{/if}}</div>';
                     template += '<div class="summary-descriptive-text small-top-spacing">{{#if biotransformation}}<p>{{biotransformationItem}}</p>{{/if}}</div>';
                     template += '<div class="dl-horizontal" style="font-size:13px;"><dl>{{#if csURI}}<dt class="medium-padding-top big-font bold-font">ChemSpider ID</dt><dd class="medium-padding-top">{{linkableChemspiderID csURI}}</dd>{{/if}}';
                     template += '{{#if smiles}}<dt class="medium-padding-top big-font bold-font">SMILES</dt><dd class="medium-padding-top">{{smiles}}</dd>{{/if}}';
                     template += '{{#if inchi}}<dt class="medium-padding-top big-font bold-font">Standard  InChI</dt><dd class="medium-padding-top">{{inchi}}</dd>{{/if}}';
                     template += '{{#if inchiKey}}<dt class="medium-padding-top big-font bold-font">Standard InChIKey</dt><dd class="medium-padding-top">{{inchiKey}}</dd>{{/if}}';
                     template += '{{#if proteinBinding}}<dt class="medium-padding-top big-font bold-font">Protein Binding</dt><dd class="medium-padding-top">{{proteinBinding}}</dd>{{/if}}';
                     template += '{{#if toxicity}}<dt class="medium-padding-top big-font bold-font">Toxicity</dt><dd class="medium-padding-top">{{toxicity}}</dd>{{/if}}</dl></div></div></div></div></div></div>';
                     var hbsTemplate = Handlebars.compile(template);
                     var html = hbsTemplate(compoundResult);
                     jQuery('#' + self.opt.target).replaceWith(html);
                 } else {
                     self.raiseEvent('onNetworkError', {
                         code: status,
                         message: response
                     });
                 }

             };
             searcher.fetchCompound(this.opt.URI, null, callback);
         },
         opt: {
             target: 'YourOwnDivId',
             appID: undefined,
             appKey: undefined,
             appURL: undefined,
             URI: undefined
         },

         /**
          * Array containing the supported event names
          * @name Biojs.OPSCompoundInfo-eventTypes
          */
         eventTypes: [
             /**
              * @name Biojs.OPSCompoundInfo#onNetworkError
              * @event
              * @param {function} actionPerformed A function which receives an {@link Biojs.Event}
              * object as argument.
              * @eventData {string} code The http error status code.
              * @eventData {string} message The error message
              * @example
              * instance.onNetworkError(
              *    function( objEvent ) {
              *       alert("Network error: HTTP status code: " + objEvent.code + ", error: " + objEvent.message);
              *    }
              * );
              */
             "onNetworkError"
         ]
     }
 )
