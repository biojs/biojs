/**
 * @class
 * @extends Biojs.Cytoscape
 * 
 * @author <a href="mailto:secevalliv@gmail.com">Jos� Villaveces</a>
 * @version 1.0.0_beta
 * 
 * @option {Object} properties 
 * <pre class="brush: js" title="Syntax of the plain object:">
 *    {
 * 		target: &lt;target&gt;,
 * 		dataSource: {dataSource: {
 *  		&lt;psicquicUrl&lt;,
 * 			&lt;proxyUrl&lt;,
 * 			&lt;query&lt;
 *      },
 * 		layout: {&lt;layout&gt;},
 * 		style: {&lt;style&gt;}
 * 	 }
 * </pre>
 * 
 * Where:
 * <ul>
 * 	<li><b>target</b> identifier of the DIV tag where the component should be displayed.</li>
 * 	<li><b>Data Source</b>
 * 		<ul>
 *    		<li>psicquicUrl: string containing the psicquic data source url.</li>
 *    		<li>proxyUrl: optional string containing the url of the proxy.</li>
 *    		<li>query: string containing the psicquic query.</li>
 *    	</ul>
 *  </li> 
 * 	<li><b>layout</b> is an Object that defines the graph <a href='http://cytoscape.github.com/cytoscapeweb/'>layout</a>.</li>
 *  <li><b>style</b> is an Object that defines the <a href='http://cytoscape.github.com/cytoscapeweb/'>style</a> of the different graph elements.</li>
 * </ul>	
 * 
 * 
 * @example 
 * var instance = new Biojs.InteractionsGraph({
 *  	target: "YourOwnDivId",
 *  	dataSource: {
 *  		psicquicUrl: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query',
 *  		proxyUrl: '../biojs/dependencies/proxy/proxy.php',
 *  		query: "brca2"
 *      },
 *      calculateWeight:true
 * });
 */
Biojs.InteractionsTimeSeries = Biojs.Cytoscape.extend(
/** @lends Biojs.InteractionsTimeSeries# */
{
	 constructor: function (options) {
	 	
			Biojs.console.enable();
			var self = this;
			//take data to opt
			this.opt.interactions = {
				 "i1": ["P1","P2"],
				 "i2": ["P3","P4"],
				 "i3": ["P5","P6"],
				 "i4": ["P2","P6"],
				 "i5": ["P2","P4"],
				 "i6": ["P6","P1"],
				 "i7": ["P2","P6"],
			};
			
			this.opt.timeSeries = {
				 "ts1":["i2","i3","i4"],
				 "ts2":["i2","i5","i6","i7"],
				 "ts3":["i1","i2","i3","i4","i6","i7"]
			};	
			
			self.opt.instanceName = "instance";
			self.opt.nodeWeight	= 1; //option
			self._setCytoscapeElements();	
			self._setDefaultStyle(); // todo: this could be an option
			self._setHtmlTemplate();
			self._createRadioButtons();
			
			

			self._selector = "#cy";
			
			options.layout = (options.layout === undefined) ? self.opt.layout : options.layout,
			options.style = (options.style === undefined) ? self.opt.style : options.style,
			options.elements = (options.elements === undefined) ? self.opt.elements : options.elements
			options.ready = function(cy){
				self.cytoscape = cy;
				self.raiseEvent( "onCytoscapeReady", cy);
			}
			
			jQuery(self._selector).cytoscapeweb(self.opt);	 	
	 },
	/**
	 * Default values for the options
	 * @name Biojs.InteractionsGraph-opt
	 */
	 opt: {
	
	 },
	/**
	 * Array containing the supported event names
	 * @name Biojs.InteractionsGraph-eventTypes
	 */
	eventTypes: [],

	_setCytoscapeElements: function(){
		var self = this;
		var nodes = [];
		var edges = [];
		for(interactionId in self.opt.interactions){
			var interactors = self.opt.interactions[interactionId];
			edges.push({ data: { id: interactionId, source: interactors[0], target: interactors[1]},classes: "alledges"});
			nodes.push({ data: { id: interactors[0], weight: self.opt.nodeWeight }, classes: "allnodes" });
			nodes.push({ data: { id: interactors[1], weight: self.opt.nodeWeight }, classes: "allnodes" });	
		}	
		this.opt.elements = {"nodes": nodes, "edges": edges};
		return this.opt.elements;
		//Biojs.console.log(JSON.stringify(this.opt.elements));
	},		
		


	_setDefaultStyle: function(){			
		var nodeSizeMapper = {
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
		};
		
	

	    // define the layout to use
	    this.opt.layout = {
	        name:"arbor"
	    };
	
	    // define the visual style (like css) of the graph
	    this.opt.style = {
	        selectors: {
	            "node":{
	                shape: "ellipse",
	                fillColor: "#888",
	                height: nodeSizeMapper,
	                width: nodeSizeMapper,
	                labelText: {
	                    passthroughMapper: "id"
	                }
	            },
	            ".unselect": {
	                fillColor: "#888",
	                lineColor: "#ccc"
	            },
	            "edge": {
	                lineColor: "#ccc",
	                targetArrowColor: "#ccc",
	                width: {
	                    continuousMapper: {
	                        attr: {
	                            name: "weight"
	                        },
	                        mapped: {
	                            min: 2,
	                            max: 5
	                        }
	                    }
	                }
	            },
	            "node:selected": {
	                fillColor: "#CC0000"
	            },
	            "edge:selected":{
	                lineColor: "#FF9999",
	            }
	        }
	    };
	},		



	selectTimeSeries: function(timeSeriesName){
		if(timeSeriesName != undefined){
			if(timeSeriesName == 'none'){
				this.elements().unselect();	
			}
			else if(this.opt.timeSeries[timeSeriesName] != undefined){
				var edgeIds = "";
				var nodeIds = "";
				// SELECT EDGES
				for (key in this.opt.timeSeries[timeSeriesName]) {
		        	if (this.opt.timeSeries[timeSeriesName].hasOwnProperty(key)){
		        		var edgeId = this.opt.timeSeries[timeSeriesName][key];
						edgeIds += "#" + edgeId + ", ";
						// SELECT NODES
						if(this.opt.interactions[edgeId] != undefined){
							for (i=0; i<this.opt.interactions[edgeId].length; i++){
								nodeIds += "#" + this.opt.interactions[edgeId][i] + ", ";	
							}
						} else {
							console.log("interaction" + edgeId +" undefined in interactions object"); //CONSOLE-INFO		
						}
		        	}
		        }
				edgeIds = edgeIds.substring(0,edgeIds.length - 2);
				nodeIds = nodeIds.substring(0,nodeIds.length - 2);
				//console.log(edgeIds); //CONSOLE-DEBUG	
				//console.log(nodeIds); //CONSOLE-DEBUG	
				this.elements().unselect();
				this.edges(edgeIds).select();	
				this.nodes(nodeIds).select();	
			} else {
				console.log("timeSeriesName undefined"); //CONSOLE-INFO	
			}
		} else {
				console.log("timeSeriesName undefined"); //CONSOLE-INFO	
		}
	},	

	unselect: function(){
		this.elements().unselect();	
	},
	
	_createRadioButtons: function(){
		for (key in this.opt.timeSeries) {
	        if (this.opt.timeSeries.hasOwnProperty(key)){
	       		var br = jQuery('<br/>');	
				var radioBtn = jQuery('<input type="radio" name="timeSeries" value="'+key+'" onclick="'+this.opt.instanceName+'.selectTimeSeries(\''+key+'\');" />');
				var radioBtnName = jQuery('<span class="tsRadioBtn">'+key+'</span>');
				radioBtn.appendTo('#timeSeriesRadioButtons');
				radioBtnName.appendTo('#timeSeriesRadioButtons');
				//br.appendTo('#timeSeriesRadioButtons');		
	        }
	    }
	    var nondeRadioBtn = jQuery('<input type="radio" name="timeSeries" value="'+key+'" onclick="'+this.opt.instanceName+'.selectTimeSeries(\'none\');" checked="checked" />');
		var noneRadioBtnName = jQuery('<span class="tsRadioBtnNonde">None</span>');
		nondeRadioBtn.appendTo('#timeSeriesRadioButtons');
		noneRadioBtnName.appendTo('#timeSeriesRadioButtons');
	},
	
	_setHtmlTemplate: function(){
		var cytoscape = jQuery('<div id="cy" style="margin-top:2px;background-color:#FAFAFA;height:350px;width:100%;float:left;border:solid #EDEDED 1px;"></div>');
		var timeSeriesRadioButtons = jQuery('<div id="timeSeriesRadioButtons"></div>');
		jQuery("#"+this.opt.target).append(timeSeriesRadioButtons);
		jQuery("#"+this.opt.target).append(cytoscape);
	}
				
		
	
	
});