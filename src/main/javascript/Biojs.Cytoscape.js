/**
 * Cytoscape Wrapper
 * A Wrapper for cytoscape.js (cytoscape web 2)
 * For more information go to http://cytoscape.github.com/cytoscape.js/
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:secevalliv@gmail.com">Jos&eacute; M. Villaveces</a>
 * 
 * @version 1.0.1_beta
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='https://github.com/downloads/cytoscape/cytoscapeweb/jquery.cytoscapeweb-2.0-prerelease-snapshot-2012.05.14-12.35.01.zip'>Cytoscape web 2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/jquery.cytoscapeweb.all.js"></script>
 *      
 * @requires <a href='https://github.com/downloads/cytoscape/cytoscapeweb/jquery.cytoscapeweb-2.0-prerelease-snapshot-2012.05.14-12.35.01.zip'>Arbor JS</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/arbor.js"></script>
 * 
 * @requires <a href='https://github.com/downloads/cytoscape/cytoscapeweb/jquery.cytoscapeweb-2.0-prerelease-snapshot-2012.05.14-12.35.01.zip'> Arbor Layout </a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/jquery.cytoscapeweb.layout.arbor.js"></script>
 * 
 * @option {Object} properties 
 * <pre class="brush: js" title="Syntax of the plain object:">
 *    {
 *              target: &lt;target&gt;,
 *              elements: {&lt;elements&gt;},
 *              layout: {&lt;layout&gt;},
 *              style: {&lt;style&gt;}
 *       }
 * </pre>
 * 
 * Where:
 * <ul>
 *      <li><b>target</b> identifier of the DIV tag where the component should be displayed.</li>
 *      <li><b>elements</b> is an Object that contains the graph <a href='http://cytoscape.github.com/cytoscapeweb/'>nodes and edges</a> 
 *      <li><b>layout</b> is an Object that defines the graph <a href='http://cytoscape.github.com/cytoscapeweb/'>layout</a>.</li>
 *  <li><b>style</b> is an Object that defines the <a href='http://cytoscape.github.com/cytoscapeweb/'>style</a> of the different graph elements.</li>
 * </ul>        
 * 
 * @example 
 * var instance = new Biojs.Cytoscape({
 *      target: "YourOwnDivId"
 * });
 */
Biojs.Cytoscape = Biojs.extend(
/** @lends Biojs.Cytoscape# */
{
	constructor: function (options) {
                        
        var self = this;
        self._selector = "#" + options.target;
        
        var opt = {}; 
        opt.layout = (options.layout === undefined) ? self.opt.layout : options.layout,
        opt.style = (options.style === undefined) ? self.opt.style : options.style,
        opt.elements = (options.elements === undefined) ? self.opt.elements : options.elements
        opt.ready = function(cy){
  			self.cy = cy;
  			self.raiseEvent( "onCytoscapeReady", cy);
  			
  			if(typeof options.ready === 'function'){
  				options.ready(cy);
  			}
        }
        jQuery(self._selector).cytoscapeweb(opt);
 	},
	 /**
	  * Default values for the options
	  * @name Biojs.Cytoscape-opt
	  */
	 opt: {
	 	target: "YourOwnDivId",
	    // define the elements in the graph
	    elements: {
	    	nodes: [
	        	{ data: { id: "a", weight: 43 }, classes: "foo" },
	            { data: { id: "b", weight: 2 }, classes: "bar" },
	            { data: { id: "c", weight: 88 }, classes: "foo bar" }
	        ],
	 
	        edges: [
	        	{ data: { id: "ab", source: "a", target: "b", weight: 32 }, classes: "foo" },
	            { data: { id: "bc", source: "b", target: "c", weight: 12 }, classes: "bar baz" },
	            { data: { id: "ca", source: "c", target: "a", weight: 96 }, classes: "baz foo" },
	            { data: { id: "ac", source: "a", target: "c", weight: 65 }, classes: "bar" }
	        ]
	    },
	    layout: {
	    	name:"arbor"
	    },
	    style: {
	    	selectors:{
	        	node:{
	            	fillColor: "#888",
	                height: {
	                    continuousMapper: {
	                        attr: {
	                            name: "weight",
	                            min: 0,
	                            max: 100
	                        },
	                        mapped: {
	                        	min: 15,
	                            max: 30
	                        }
	                	}
	            	},
	            	width: {
	            		continuousMapper: {
	                		attr: {
	                    		name: "weight",
	                    		min: 0,
	                    		max: 100
	                 		},
	                		mapped: {
	                    		min: 15,
	                    		max: 30
	                 		}
	             		}
	     			},
	         		labelText: {
	            		passthroughMapper: "id"
	 				}
	 			},
	 			edge:{
	         		lineColor:"#CCC"
	 			}, 
	 			"node:selected": {
	            	fillColor: "#333"
	            },
	            "edge:selected":{
	            	lineColor: "#666"
	            }
			}
		}
	},
	 /**
	  * Array containing the supported event names
	  * @name Biojs.Cytoscape-eventTypes
	  */
	 eventTypes: [
	 /**
	  * @name Biojs.Cytoscape#onCytoscapeReady
	  * @event
	  * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
	  * @eventData {Object} cytoscape The current cytoscape instance.
	  * @example
	  * instance.onCytoscapeReady(
	  *    function( cy ) {
	  *       cy.center();
	  *    }
	  * );
	  *
	  **/
	 "onCytoscapeReady"
	 ],
	  
	 //Viewport Manipulation
	 
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-center'>Centre</a> the graph on an element or a collection.
	  * @param {Object} collection
	  * 
	  * @example
	  * instance.center(instance.node("a"));
	  */
	 center: function(collection){return  this.cy.center(collection)},
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-fit'>Fit</a> the graph to an element or a collection.
	  * @param {Object} collection
	  * 
	  * @example
	  * instance.fit(instance.node("a"));
	  */
	 fit: function(collection){return  this.cy.fit(collection)},
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-pan'>Pan</a> the graph to an absolute position.
	  * @param {Object} renderedPosition
	  * 
	  * @example
	  * instance.pan({x: 100, y: 100});
	  */
	 pan: function(renderedPosition){return  this.cy.pan(renderedPosition)},
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-panBy'>Pan</a> the graph relatively from its current position.
	  * @param {Object} renderedPosition
	  * 
	  * @example
	  * instance.panBy({x: 100, y: 100});
	  */
	 panby: function(renderedPosition){return  this.cy.panby(renderedPosition)},
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-reset'>Reset</a> the graph to the default zoom level and the default position for panning.
	  * @example
	  * instance.reset();
	  */
	 reset: function(){return  this.cy.reset()},
	 /**
	  * Adjust the <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-zoom'>zoom</a> level of the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.zoom({level: 2.0, renderedPosition: { x: 100, y: 100}});
	  */
	 zoom: function(options){return  this.cy.zoom(options)},
	 
	 //Graph Manilupation
	 
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-add'>Add</a> elements to the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.add([ { group: "nodes", data: { id: "n0" }},{ group: "nodes", data: { id: "n1" }},{ group: "edges", data: { id: "e0", source: "n0", target: "n1" }}]));
	  */
	 add: function(options){
	 	return  this.cy.add(options);
	 },
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-remove'>Remove</a> elements from the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.remove(instance.nodes("#n0"));
	  */
	 remove: function(options){return  this.cy.remove(options)},
	 /**
	  * <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-load'>Load</a> a graph into Cytoscape Web.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.load([{ data: { id: "n1" }, group: "nodes" },{ data: { id: "n2" }, group: "nodes" },{ data: { id: "e1", source: "n1", target: "n2" }, group: "edges" }]);
	  */
	 load: function(options){return  this.cy.load(options)},
	 /**
	  * Get particular <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-nodes'>nodes</a> with a selector.
	  * @param {Object} options
	  * 
	  * @example
	  * var collection = instance.nodes("[weight>50]");
	  */
	 nodes: function(options){return  this.cy.nodes(options)},
	 /**
	  * Get particular <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-edges'>edges</a> with a selector.
	  * @param {Object} options
	  * 
	  * @example
	  * var collection = instance.edges("[source=n0]");
	  */
	 edges: function(options){return  this.cy.edges(options)},
	 /**
	  * Get particular <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-elements'>elements</a> (nodes and edges) with a selector.
	  * @param {Object} options
	  * 
	  * @example
	  * var collection = instance.elements("[weight>50]");
	  */
	 elements: function(options){return  this.cy.elements(options)},
	 /**
	  * Get particular elements (nodes and edges) with a selector or a <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-filter'>filter</a> function.
	  * @param {Object} options
	  * 
	  * @example
	  * var collection = instance.filter("[weight>50]");
	  */
	 filter: function(options){return  this.cy.filter(options)},
	 /**
	  * Get an empty <a target='_blank' href='https://github.com/cytoscape/cytoscape.js/wiki/Core-collection'>collection</a>.
	  * 
	  * @example
	  * var collection = instance.collection();
	  */
	 collection: function(){return  this.cy.collection()},
	 
	 //Events
	 
	 /**
	  * Bind to an event that happens anywhere in the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.bind("click", function(){alert("clicked on cytoweb")});
	  */
	 bind: function(options){return  this.cy.bind(options)},
	 /**
	  * Remove a previous binding to an event that happens anywhere in the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.unbind("click", function(){alert("clicked on cytoweb")});
	  */
	 unbind: function(options){return  this.cy.unbind(options)},
	 /**
	  * Add a callback function to be called one time when an event first occurs anywhere on the graph.
	  * @param {Object} options
	  * 
	  * @example
	         * instance.one("click", function(){alert("clicked on cytoweb")});
	  */
	 one: function(options){return  this.cy.one(options)},
	 /**
	  * Trigger an event on the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.trigger("click");
	  */
	 trigger: function(options){return  this.cy.trigger(options)},
	 
	 //Background events
	 
	 /**
	  * Bind to an event that happens specifically on the background of the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.backgroundBind("click", function(){alert("clicked on cytoweb")});
	  */
	 backgroundBind: function(options){return  this.cy.background().bind(options)},
	 /**
	  * Remove a previous binding to an event that happens specifically on the background of the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.backgroundUnbind("click", function(){alert("clicked on cytoweb")});
	  */
	 backgroundUnbind: function(options){return  this.cy.background().unbind(options)},
	 /**
	  * Add a callback function to be called one time when an event first occurs on the background of the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.backgroundOne("click", function(){alert("clicked on cytoweb")});
	  */
	 backgroundOne: function(options){return  this.cy.background().one(options)},
	 /**
	  * Trigger an event that happens specifically on the background of the graph.
	  * @param {Object} options
	  * 
	  * @example
	  * instance.backgroundTrigger("click");
	  */
	 backgroundTrigger: function(options){return  this.cy.background().trigger(options)}
});