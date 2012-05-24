/** 
 * Biojs Wrapper for cytoscape web 2.0
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='https://github.com/downloads/cytoscape/cytoscapeweb/jquery.cytoscapeweb-2.0-prerelease-snapshot-2012.05.14-12.35.01.zip'>Cytoscape web 2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/jquery.cytoscapeweb.all.js"></script>
 * 
 * @author <a href="mailto:secevalliv@gmail.com">José Villaveces</a>
 * 
 * @param {Object} options An object with the options for NetworkViewer component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {Object} cyOptions
 *    Cytoscape web options
 */
Biojs.Cytoscape = Biojs.extend (
	/** @lends Biojs.Cytoscape# */
	{
		constructor: function (options) {
			var self = this;
			self._selector = "#" + this.opt.target;
			
			if(self.opt.cyOptions.ready === undefined){
				self.opt.cyOptions.ready = function(cy){
					self._cy = cy;	
				}
			}else{
				var ready = function(cy){
					self._cy = cy;	
				
				}
			}
			
			$(self._selector).cytoscapeweb(self.opt.cyOptions);
		},
		/**
		 * Default values for the options
		 * @name Biojs.Cytoscape-opt
		 */
		opt: {
			target: "YourOwnDivId",
			cyOptions: {}
		},
		eventTypes: [],
		/**
	    * Returns the cytoscape instance
	    * @returns {object} cytoscape instance 
	    */
		getCytoscape: function(){
			return self._cy;
		}
	}
);
