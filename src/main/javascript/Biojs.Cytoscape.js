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
 * @author <a href="mailto:secevalliv@gmail.com">Jos&eacute; Villaveces</a>
 * 
 * @param {Object} options An object with the options for the cytoscape component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {Object} cyOptions
 *    Cytoscape web options for more information <a href='https://github.com/cytoscape/cytoscapeweb/wiki/Core'>click here</a>  
 * 
 * @example
 * var instance = new Biojs.Cytoscape({
 * 		target: "YourOwnDivId", 
 * 		cyOptions: {
 * 	
 * 			    // define the elements in the graph
 * 			    elements: {
 * 				        nodes: [
 * 			            { data: { id: "a", weight: 43 }, classes: "foo" },
 * 			            { data: { id: "b", weight: 2 }, classes: "bar" },
 * 			            { data: { id: "c", weight: 88 }, classes: "foo bar" }
 * 			        ],
 * 			
 * 			        edges: [
 * 			            { data: { id: "ab", source: "a", target: "b", weight: 32 }, classes: "foo" },
 * 			            { data: { id: "bc", source: "b", target: "c", weight: 12 }, classes: "bar baz" },
 * 			            { data: { id: "ca", source: "c", target: "a", weight: 96 }, classes: "baz foo" },
 * 			            { data: { id: "ac", source: "a", target: "c", weight: 100 }, classes: "bar" }
 * 			        ]
 * 			    },
 * 			
 * 			    // define the layout to use
 * 			    layout: {
 * 					name: "random"
 * 				},
 * 			    // define the visual style (like css) of the graph
 * 		    style: {
 * 				        selectors: {
 * 				            "node":{
 * 				                shape: "ellipse",
 * 			                fillColor: "#888",
 * 			                height: {
 * 								    continuousMapper: {
 * 								        attr: {
 * 								            name: "weight",
 * 							            min: 0,
 * 							            max: 100
 * 							        },
 * 							        mapped: {
 * 								            min: 15,
 * 							            max: 30
 * 							        }
 * 							    }
 * 							},
 * 			                width: {
 * 								    continuousMapper: {
 * 								        attr: {
 * 								            name: "weight",
 * 							            min: 0,
 * 							            max: 100
 * 							        },
 * 							        mapped: {
 * 								            min: 15,
 * 							            max: 30
 * 							        }
 * 							    }
 * 							},
 * 			                labelText: {
 * 				                    passthroughMapper: "id"
 * 			                }
 * 			            },
 * 			            ".yay": {
 * 				            fillColor: "red",
 * 			                lineColor: "red",
 * 			                targetArrowColor: "red"
 * 			            },
 * 			            "edge": {
 * 				                lineColor: "#ccc",
 * 			                targetArrowColor: "#ccc",
 * 			                width: {
 * 				                    continuousMapper: {
 * 				                        attr: {
 * 				                            name: "weight"
 * 			                        },
 * 			                        mapped: {
 * 				                            min: 2,
 * 			                            max: 5
 * 			                        }
 * 			                    }
 * 			                },
 * 			                targetArrowShape: "triangle"
 * 			            },
 * 			            "node:selected": {
 * 				                fillColor: "#333"
 * 			            },
 * 			            "edge:selected":{
 * 				            lineColor: "#666",
 * 			                targetArrowColor: "#666"
 * 			            }
 * 			        }
 * 			    }
 * 			} 
 * });
 * 
 */
Biojs.Cytoscape = Biojs.extend (
	/** @lends Biojs.Cytoscape# */
	{
		constructor: function (options) {
			var self = this;
			self._selector = "#" + this.opt.target;
			
			if(self.opt.cyOptions.ready === undefined){
				self.opt.cyOptions.ready = self._ready;		
			}else{
				var ready = self.opt.cyOptions.ready;
				self.opt.cyOptions.ready = function(cy){
					self._ready(cy);
					ready(cy);
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
			cyOptions: {
				// define the layout to use
				layout: {
					name: "random"
				},
				ready:self._ready
			}
		},
		eventTypes: [
			/**
			 * @name Biojs.Cytoscape#mockEvent
			 * @event
			 * @param {function} mock event, it is never fired!
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {string} type The name of the event.
			 * 
			 * @example
			 * instance.mockEvent(function(objEvent){});
			 */
			"mockEvent"
		],
		/**
	    * Returns the cytoscape instance
	    * @returns {object} cytoscape instance 
	    */
		getCytoscape: function(){
			return self._cy;
		},
		_ready:function(cy){
			self._cy = cy;
			self._cy.zoom(0);
		}
	}
);
