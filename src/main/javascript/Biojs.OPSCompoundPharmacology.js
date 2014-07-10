 /**
  * Displays pharmacology results for a compound. The results can have various filters applied and be paginated. Requires an app key and ID available from https://dev.openphacts.org
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
  *    URI for the target image you want to display.
  *
  * @option {string} [template]
  *    You can define the look and feel of the display by providing a handlebars HTML template. The variables you can use are defined in the
  *    OPS.js CompoundSearch class
  *
  * @option {string} [assayOrganism]
  *    Only return results which have this Assay Organism eg 'Homo sapiens'
  *
  * @option {string} [targetOrganism]
  *    Only return results which have this Target Organism eg 'Homo sapiens'
  *
  * @option {string} [activity]
  *    Only return results for this activity eg 'IC50'
  *
  * @option {string} [activityCondition]
  *    Only return results which have an activity value corresponding to this limit eg return activities greater than would be '>'
  *
  * @option {string} [activityValue]
  *    Only return results which have this value or use along with activityCondition
  *
  * @option {Array} [activityRelations]
  *    Return results which have the relations provided. Add as many from '>', '<', '>=', '<=', ='
  *
  * @option {String} [pchemblValue]
  *    Return results to those with this pchemblValue
  *
  * @option {string} [pchemblCondition]
  *    Return results with a pchemblValue limited by this condition eg '<'
  *
  * @option {string} [sortBy]
  *    Sort the results by this column
  *
  * @option {string} [sortDirection]
  *    Sort the results in this direction. Choose from 'ascending' or 'descending'.
  *
  * @option {string} [lens]
  *    Apply this scientific lens to the results.
  *
  * @option {string} [page]
  *    Show this page of results
  *
  * @option {string} [pageSize]
  *    The number of results to show in each page.
  *
  * @example
  * var instance = new Biojs.OPSCompoundPharmacology({
  *    appID: '949a7c9c',
  *    appKey: '734a274b418b0dbe57fc40f86e85e20e',
  *    appURL: 'https://beta.openphacts.org/1.3',
  *    URI: 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413',
  *    assayOrganism: 'Homo sapiens',
  *    target: 'YourOwnDivId'
  * });
  */
 Biojs.OPSCompoundPharmacology = Biojs.extend(
     /** @lends Biojs.OPSCompoundPharmacology# */
     {
         page: 1,
         assayOrganism: null,
         targetOrganism: null,
         activity: null,
         activityValue: null,
         minActivityValue: null,
         minExActivityValue: null,
         maxActivityValue: null,
         maxExActivityValue: null,
         unit: null,
         activityRelation: null,
         actualPchemblValue: null,
         minPchemblValue: null,
         minExPchemblValue: null,
         maxPchemblValue: null,
         maxExPchemblValue: null,
         targetType: null,

         constructor: function(options) {

             this.base(options);
             var self = this;
             self.page = self.opt.page != null ? self.opt.page : 1;
             assayOrganism = self.opt.assayOrganism;
             targetOrganism = self.opt.targetOrganism;
             var lens = null;
             activity = self.opt.activity;
             unit = self.opt.activityUnit;
             var condition = self.opt.activityCondition;
             var currentActivityValue = self.opt.activityValue;
             // only set activity filter if all filter boxes have been selected
             if (unit != null && activity != null && condition != null && currentActivityValue != null) {
                 switch (condition) {
                     case '>':
                         minExActivityValue = currentActivityValue;
                         break;
                     case '<':
                         maxExActivityValue = currentActivityValue;
                         break;
                     case '=':
                         activityValue = currentActivityValue;
                         break;
                     case '<=':
                         maxActivityValue = currentActivityValue;
                         break;
                     case '>=':
                         minActivityValue = currentActivityValue;
                         break;
                 }
             }
             // if there are any relations then add them all to the string with the "|" (OR) separator otherwise activityRelation will still be null
             // a trailing "|" is fine according to tests on the LD API
             if (self.opt.activityRelations != null) {
                 activityRelation = "";
                 $.each(self.opt.activityRelations, function(index, relation) {
                     activityRelation = activityRelation + relation + "|";
                 });
             }
             var pchemblCondition = self.opt.pchemblCondition;
             var currentPchemblValue = self.opt.pchemblValue;
             // pchembl filter only valid if all filter bits selected
             if (pchemblCondition != null && currentPchemblValue != null) {
                 switch (pchemblCondition) {
                     case '>':
                         minExPchemblValue = currentPchemblValue;
                         break;
                     case '<':
                         maxExPchemblValue = currentPchemblValue;
                         break;
                     case '=':
                         actualPchemblValue = currentPchemblValue;
                         break;
                     case '<=':
                         maxPchemblValue = currentPchemblValue;
                         break;
                     case '>=':
                         minPchemblValue = currentPchemblValue;
                         break;
                 }
             }
             if (self.opt.sortBy !== null && self.opt.sortDirection !== null) {
                 // we have previously sorted descending on a header and it is still current
                 if (self.opt.sortDirection === "ascending") {
                     sortBy = '?' + self.opt.sortBy;
                 } else if (self.opt.sortDirection === "descending") {
                     sortBy = 'DESC(?' + self.opt.sortBy + ')';

                 }
             }
             var pharmaTemplate;
             if (self.opt.template) {
                 pharmaTemplate = self.opt.template;
             } else {
                 pharmaTemplate = '<table style="border-spacing: 0;"><thead style="border-spacing: 0;" class="headingstyle"><tr><th colspan="2" class="centre" style="border-right: 2px solid white; padding: 7px;">Target</th><th colspan="2" class="centre" style="border-right: 2px solid white; padding: 7px;">Assay</th><th colspan="4" class="centre" style="border-right: 2px solid white; padding: 7px;">Activity</th><th style="border-right: 2px solid white; padding: 7px;"></th><th style="border-right: 2px solid white; padding: 7px;"></th></tr>';
                 pharmaTemplate += '<tr><th style="width: 20%;">Name</th>';
                 pharmaTemplate += '<th style="width: 10%; border-right: 2px solid white; padding: 7px;">Organism</th>';
                 pharmaTemplate += '<th style="width: 10%;">Organism</th>';
                 pharmaTemplate += '<th style="width: 30%;border-right: 2px solid white; padding: 7px;">Description</th>';
                 pharmaTemplate += '<th style="width: 5%;">Type</th>';
                 pharmaTemplate += '<th style="width: 5%;">Relation</th>';
                 pharmaTemplate += '<th style="width: 5%;">Value</th>';
                 pharmaTemplate += '<th style="width: 5%; border-right: 2px solid white; padding: 7px;">Units</th>';
                 pharmaTemplate += '<th style="width: 5%; border-right: 2px solid white; padding: 7px;">PubMed Article</th>';
                 pharmaTemplate += '<th style="width: 5%; border-right: 2px solid white; padding: 7px;">pChembl</th></tr></thead>';
                 pharmaTemplate += '<tbody id="pharmacology-table-body">{{#each pharmacology}}<tr class="record-deco"><td style="vertical-align:middle;" height="70">';
                 pharmaTemplate += '{{#each this.targets}}<p>{{this.title}}</p>{{/each}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{#each this.targetOrganisms}} {{this.organism}} {{/each}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{this.assayOrganism}}</td>';
                 pharmaTemplate += '<td class="cell-longtext">{{this.assayDescription}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityActivityType}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityRelation}}</td>'
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityValue}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityStandardUnits}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{linkablePubmedId this.activityPubmedId}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{this.pChembl}}</td></tr>{{/each}}';
                 pharmaTemplate += '</tbody></table>';
             }
             var searcher = new Openphacts.CompoundSearch(self.opt.appURL, self.opt.appID, self.opt.appKey);
             var pharmaCallback = function(success, status, response) {
                 if (success && response) {
                     var pharmaResults = searcher.parseCompoundPharmacologyResponse(response);
                     //$.each(pharmaResults, function(index, result) {
                     //	     pharmacology.push(result);
                     //   });
                     var hbsTemplate = Handlebars.compile(pharmaTemplate);
                     var html = hbsTemplate({
                         'pharmacology': pharmaResults
                     });
                     jQuery('#' + self.opt.target).replaceWith(html);
                 } else {
                     //throw an error
                 }
             };
             var countCallback = function(success, status, response) {
                 if (success && response) {
                     var count = searcher.parseCompoundPharmacologyCountResponse(response);
                     if (count > 0) {
                         searcher.compoundPharmacology(self.opt.URI, self.assayOrganism, self.targetOrganism, self.activity, self.activityValue, self.minActivityValue, self.minExActivityValue, self.maxActivityValue, self.maxExActivityValue, self.unit, self.activityRelation, self.actualPchemblValue, self.minPchemblValue, self.minExPchemblValue, self.maxPchemblValue, self.maxExPchemblValue, self.targetType, self.opt.page != null ? self.opt.page : '1', self.opt.pageSize != null ? self.opt.pageSize : '50', self.sortBy, self.opt.lens, pharmaCallback);
                     }
                 }
             };
             searcher.compoundPharmacologyCount(self.opt.URI, self.assayOrganism, self.targetOrganism, self.activity, self.activityValue, self.minActivityValue, self.minExActivityValue, self.maxActivityValue, self.maxExActivityValue, self.unit, self.activityRelation, self.actualPchemblValue, self.minPchemblValue, self.minExPchemblValue, self.maxPchemblValue, self.maxExPchemblValue, self.targetType, self.opt.lens, countCallback);

         },
         opt: {
             target: 'YourOwnDivId',
             appID: undefined,
             appKey: undefined,
             appURL: undefined,
             URI: undefined,
             template: undefined,
             assayOrganism: undefined,
             targetOrganism: undefined,
             activity: undefined,
             activityCondition: undefined,
             activityValue: undefined,
             activityRelations: undefined,
             pchemblValue: undefined,
             pchemblCondition: undefined,
             sortBy: undefined,
             sortDirection: undefined,
             lens: undefined,
             page: undefined,
             pageSize: undefined
         },

         /**
          * Array containing the supported event names
          * @name Biojs.OPSCompoundPharmacology-eventTypes
          */
         eventTypes: [
             /**
              * @name Biojs.OPSCompoundPharmacology#error
              * @event
              * @param {function} actionPerformed A function which receives an {@link Biojs.Event}
              * object as argument.
              * @eventData {string} message The error message
              * @example
              * instance.onError(
              *    function( objEvent ) {
              *       alert(objEvent.message);
              *    }
              * );
              */
             "error"
         ],
         /**
          * Fetch more pharmacology results and replace the current ones in the table
          * @param {Number} page
	  *     The required page
          * @param {string} [template]
	  *     Handlebars HTML template to populate with results
          * @param {string} [replaceID]
	  *     The id of the current HTML element to replace. The element which replaces it will be given the same id
	  * @example
	  *     instance.fetchMore(2, null, "pharmacology-table-body")
          */
         fetchPage: function(page, template, replaceID) {
             //fetch pharma for page and replace current results.
             var self = this;
             var searcher = new Openphacts.CompoundSearch(self.opt.appURL, self.opt.appID, self.opt.appKey);
             var pharmaTemplate;
             if (template) {
                 pharmaTemplate = template;
             } else {
                 pharmaTemplate = '<tbody id="pharmacology-table-body">{{#each pharmacology}}<tr class="record-deco"><td style="vertical-align:middle;" height="70">';
                 pharmaTemplate += '{{#each this.targets}}<p>{{this.title}}</p>{{/each}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{#each this.targetOrganisms}} {{this.organism}} {{/each}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{this.assayOrganism}}</td>';
                 pharmaTemplate += '<td class="cell-longtext">{{this.assayDescription}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityActivityType}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityRelation}}</td>'
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityValue}}</td>';
                 pharmaTemplate += '<td class="lead cell-basictext">{{this.activityStandardUnits}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{linkablePubmedId this.activityPubmedId}}</td>';
                 pharmaTemplate += '<td class="cell-basictext">{{this.pChembl}}</td></tr>{{/each}}</tbody>';
             }
             var pharmaCallback = function(success, status, response) {
                 if (success && response) {
                     var pharmaResults = searcher.parseCompoundPharmacologyResponse(response);
                     var hbsTemplate = Handlebars.compile(pharmaTemplate);
                     var html = hbsTemplate({
                         'pharmacology': pharmaResults
                     });
                     jQuery(replaceID != null ? '#' + replaceID : '#pharmacology-table-body').replaceWith(html);
                     self.page = page;
                 } else {
                     //throw an error
                 }
             };
             searcher.compoundPharmacology(self.opt.URI, self.assayOrganism, self.targetOrganism, self.activity, self.activityValue, self.minActivityValue, self.minExActivityValue, self.maxActivityValue, self.maxExActivityValue, self.unit, self.activityRelation, self.actualPchemblValue, self.minPchemblValue, self.minExPchemblValue, self.maxPchemblValue, self.maxExPchemblValue, self.targetType, page, self.opt.pageSize != null ? self.opt.pageSize : '50', self.sortBy, self.opt.lens, pharmaCallback);

         }
     }
 )
