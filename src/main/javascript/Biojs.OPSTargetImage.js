 /**
  * Displays an image for a target/protein. Requires an app key and ID available from https://dev.openphacts.org
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
  *
  * @example
  * var instance = new Biojs.OPSTargetImage({
  *    appID: '949a7c9c',
  *    appKey: '734a274b418b0dbe57fc40f86e85e20e',
  *    appURL: 'https://beta.openphacts.org/1.3',
  *    URI: 'http://www.conceptwiki.org/concept/5de0f011-68e0-4917-bac2-6d65e8f7effb',
  *    target: 'YourOwnDivId'
  * });
  */
 Biojs.OPSTargetImage = Biojs.extend(
     /** @lends Biojs.OPSTargetImage# */
     {
         constructor: function(options) {

             this.base(options);
             var self = this;

            var searcher = new Openphacts.TargetSearch(this.opt.appURL, this.opt.appID, this.opt.appKey);
             var callback = function(success, status, response) {
                 if (success) {
                     var targetResult = searcher.parseTargetResponse(response);
                     jQuery('#' + self.opt.target);
	var template ='<div>{{target_image_src seeAlso}}</div>';
                     var hbsTemplate = Handlebars.compile(template);
                     var html = hbsTemplate(targetResult);
                     jQuery('#' + self.opt.target).replaceWith(html);
                 } else {
                     self.raiseEvent('onNoTargetFoundError', {
                         message: "No target found with URI " + self.opt.URI
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
          * @name Biojs.OPSTargetImage-eventTypes
          */
         eventTypes: [
             /**
              * @name Biojs.OPSTargetImage#noTargetFoundError
              * @event
              * @param {function} actionPerformed A function which receives an {@link Biojs.Event}
              * object as argument.
              * @eventData {string} message The error message
              * @example
              * instance.onNoTargetFoundError(
              *    function( objEvent ) {
              *       alert(objEvent.message);
              *    }
              * );
              */
             "noTargetFoundError"
         ]
     }
 )
