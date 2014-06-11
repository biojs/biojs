 /**
  * Displays the information available in the Open PHACTS Linked Data cache about a target. Requires an app key and ID available from https://dev.openphacts.org
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
  *    URI for the target you are interested in.
  *
  *
  * @example
  * var instance = new Biojs.OPSTargetInfo({
  *    appID: '949a7c9c',
  *    appKey: '734a274b418b0dbe57fc40f86e85e20e',
  *    appURL: 'https://beta.openphacts.org/1.3',
  *    URI: 'http://www.conceptwiki.org/concept/5de0f011-68e0-4917-bac2-6d65e8f7effb',
  *    target: 'YourOwnDivId'
  * });
  */
 Biojs.OPSTargetInfo = Biojs.extend(
     /** @lends Biojs.OPSTargetInfo# */
     {
         constructor: function(options) {

             this.base(options);
             var self = this;
             var searcher = new Openphacts.TargetSearch(this.opt.appURL, this.opt.appID, this.opt.appKey);
             var callback = function(success, status, response) {
                 if (success) {
                     var targetResult = searcher.parseTargetResponse(response);
                     jQuery('#' + self.opt.target);
	var template ='<div><div class="large-top-spacing"><div><div class="left"><div class="medium-padding-left">{{target_image_src seeAlso}}</div>';
      			template += '<div id="boxes" class="small-top-spacing">{{#if molecularWeight}}<div class="summary-box"><div class="inner-property-content"><p><small>Molecular Weight</small></p><p class="lead">{{molecularWeight}}</p></div></div>{{/if}}';
      			template += '{{#if numberOfResidues}}<div class="summary-box"><div class="inner-property-content"><p><small># of Residues</small></p><p class="lead">{{numberOfResidues}}</p></div></div>{{/if}}';
	template += '{{#if theoreticalPi}}<div class="summary-box"><div class="inner-property-content"><p><small>Theoretical Pi</small></p><p class="lead">{{theoreticalPi}}</p></div></div>{{/if}}</div></div>';
    		template += '<div class="medium-padding-top right"><div><div class="medium-padding-top">{{#if showProvenance}}<h1>{{prefLabel}} {{provenanceLinkout conceptwikiProvenance.prefLabel conceptwikiProvenance.source}}</h1>{{else}}<h1>{{prefLabel}}</h1>{{/if}}</div>';
                template += '{{#if alternativeName}}<div class="summary-descriptive-text large-top-spacing"><em>{{alternativeName}}</em></div>{{/if}}</div>';
                template += '<div class="dl-horizontal" style="font-size: 13px;"><dl>{{#if organism}}<dt class="big-font bold-font">Organism</dt><dd>{{linkableOrganism organism}}</dd>{{/if}}';
                template += '{{#if existence}}<dt class="big-font bold-font">Existence</dt><dd>{{linkableOrganism existence}}</dd>{{/if}}';
                  template += '{{#if functionAnnotation}}<dt class="big-font bold-font">Specific Function</dt><dd>{{functionAnnotation}}</dd>{{/if}}';
                 template += '{{#if cellularLocation}}<dt class="big-font bold-font">Cellular Location</dt><dd>{{cellularLocation}}</dd>{{/if}}';
                  template += '{{#if keywords}}<dt class="big-font bold-font">Keywords</dt><dd>{{keywords}}</dd>{{/if}}';
                 template += '{{#if seeAlso}}<dt class="big-font bold-font">PDB</dt><dd>{{#each seeAlso}} {{pdbLink this}} {{/each}}</dd>{{/if}}';        
                  template += '{{#if sequence}}<dt class="big-font bold-font">Sequence</dt><dd><div style="max-width:500px;word-wrap:break-word;">{{sequence}}</div></dd>{{/if}}</dl></div></div></div></div></div>';
                     var hbsTemplate = Handlebars.compile(template);
                     var html = hbsTemplate(targetResult);
                     jQuery('#' + self.opt.target).replaceWith(html);
                 } else {
                     self.raiseEvent('onNetworkError', {
                         code: status,
                         message: response
                     });
                 }

             };
             searcher.fetchTarget(this.opt.URI, null, callback);
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
          * @name Biojs.OPSTargetInfo-eventTypes
          */
         eventTypes: [
             /**
              * @name Biojs.OPSTargetInfo#onNetworkError
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
