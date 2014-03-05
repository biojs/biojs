/** 
 * The Cytoscape.js component is a wrapper that allows you to use Cytoscape.js in BioJS.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:cytoscape-discuss@googlegroups.com">Max Franz</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href='http://cytoscape.github.io/cytoscape.js/'>Cytoscape.js (latest version strongly recommended)</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/cytoscape.min.js"></script>
 * 
 * @param {Object} options An object with the options for Cytoscape.js.
 *    
 * @option {string} container 
 *    The ID of the HTML DOM element in which Cytoscape.js will be placed.
 *    
 *     
 * @example 
 * var cy;
 * var instance = new Biojs.Cytoscape({
 * 		container: window.document.getElementById('some-div-id'),
 * 		ready: function(){
 * 			cy = this; // now you can use cytoscape.js as normal
 * 		}
 * });
 * 
 * 
 */
Biojs.Cytoscape = Biojs.extend(
/** @lends Biojs.Cytoscape# */
{
  constructor: function(options){
    cytoscape( options );
  },

  /**
   *  Default values for the options
   *  @name Biojs.Cytoscape-opt
   */
  opt: {
     container: undefined
  },
  
  /**
   * Array containing the supported event names
   * @name Biojs.Cytoscape-eventTypes
   */
  eventTypes: [    
  ]
  
});
