/**
 * Graph display to highlight molecular interaction data. <strong>NOTE:</strong> <i>The selection 
 * radio button options will just work if the instance of your object is globlal. Example:
 * "var instance; window.onload = function() {instance = new Biojs.InteractionsFilterGraph(...)};" </i>
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael Jimenez</a>
 * @version 1.0.0
 * 
 * @requires <a href='../biojs/css/Biojs.InteractionsFilterGraph.css'>Biojs.InteractionsFilterGraph.css</a>
 * @dependency <link href="../biojs/css/Biojs.InteractionsFilterGraph.css" rel="stylesheet" type="text/css" />
 * 
 * @requires <a href='http://blog.jquery.com'>jQuery 1.7.2</a>
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
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} instanceName
 * 	  Instance name of the object
 * 
 * @option {string} interactions
 * 	  Object with binary interactions including interactors
 * 
 * @option {string} filters
 * 	  Filtering options use to highlight interactions in the graph
 *  
 * @option {string} graphHeight [400]
 * 	  Graph height
 *
 * @option {string} graphWidth [400]
 * 	  Graph width
 * 
 * @example
 * var instance = new Biojs.InteractionsFilterGraph({
 * 	 	target: "YourOwnDivId",
 *      instanceName: "instance",
 *      graphHeight: '350px',
 *      graphWidth: '100%',
 *      interactions: {
 * 		 "i1": ["P1","P2"],
 * 	 	 "i2": ["P3","P4"],
 * 		 "i3": ["P5","P6"],
 * 		 "i4": ["P2","P6"],
 * 		 "i5": ["P2","P4"],
 * 		 "i6": ["P6","P1"],
 * 		 "i7": ["P2","P6"]
 * 		},
 *	 	filters:{
 *	 		timeSeries: {
 * 				title: "Time after Sendai viral infection (hours)",
 * 				presentation: "radio",
 * 				active: true,
 * 				dataType: "edges",
 * 				data: {
 * 				 "2":["i2","i3","i4"],
 * 				 "6":["i2","i5","i6","i7"],
 * 				 "12":["i1","i2","i3","i4","i6","i7"]
 * 			}
 * 		}
 * 	}
 * });
 */


Biojs.InteractionsFilterGraph = Biojs.extend(
/** @lends Biojs.InteractionsFilterGraph# */
{
	 constructor: function (options) {
			//Biojs.console.enable();
         //this._setExample();
         if(this._getObjectSize(this.opt.interactions)){
			this._setHtmlTemplate();
            this._createFilterOptions();
            this._setCytoscapeHeight();
			this._startCytoscape();
         }
	 },
	/**
	 * Default values for the options
	 * @name Biojs.InteractionsFilterGraph-opt
	 */
	 opt: {
	 	target: "YourOwnDivId",
	 	instanceName: "instance",
	 	graphHeight: 500,
        graphWidth: 500,
	 	interactions: {},
	 	filters:{}
	 },
	/**
	 * Array containing the supported event names
	 * @name Biojs.InteractionsFilterGraph-eventTypes
	 */
	eventTypes: [],

    _setExample: function(){
        this.opt.interactions = {
        			 "i1": ["P1","P2"],
        			 "i2": ["P3","P4"],
        			 "i3": ["P5","P6"],
        			 "i4": ["P2","P6"],
        			 "i5": ["P2","P4"],
        			 "i6": ["P6","P1"],
        			 "i7": ["P2","P6"]
        		};
        this.opt.filters = {
        	 		timeSeries: {
        				title: "Time after Sendai viral infection (hours)",
        				presentation: "radio",
        				active: true,
        				dataType: "edges",
        				data: {
        				 "2":["i2","i3","i4"],
        				 "6":["i2","i5","i6","i7"],
        				 "12":["i1","i2","i3","i4","i6","i7"]
        				}
        			},
        			interactionTypes: {
        				title: "Interaction types",
        				presentation: "radio",
        				active: true,
        				dataType: "edges",
        				data: {
        				 "association":["i3","i4"],
        				 "physical association":["i2","i5","i6","i7"],
        				 "colocalization":["i1","i2"]
        				}
        			},
        			publications: {
        				title: "Publications",
        				presentation: "checkbox",
        				active: false,
        				dataType: "edges",
        				data: {
        				 "pumned01":["i1","i2","i3","i4","i5","i6","i7"],
        				 "pumned02":["i1","i2","i3","i4","i5","i6"],
        				 "pumned03":["i1","i2","i3","i6"],
        				 "pumned04":["i1","i3"],
        				 "pumned05":["i3"]
        				}
        			}
                };

    },

    _getObjectSize: function(object){
        var count = 0;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                count++;
            }
        }
        return count;
    },

    _setCytoscapeHeight: function(){
        this.opt.graphHeight = this.opt.graphHeight.toString();
        var height = this.opt.graphHeight;
        if(this.opt.graphHeight.indexOf("px") != -1){
            height = this.opt.graphHeight.substring(0,this.opt.graphHeight.length - 2);
        }
        var filterHeight = jQuery("#"+this._filtersTarget).height();
        var cytoscapeHeight =  parseInt(this.opt.graphHeight) -  parseInt(filterHeight) - 5;
        var cytoscape = jQuery("#"+this._cytoscapeTarget);
        cytoscape.height(cytoscapeHeight);
        //cytoscape.width(parseInt(cytoscape.width())-1);
    },
	
	/* 
     * Function: Biojs.HpaSummaryFeatures._getCytoscapeElements
     * Purpose:  Get an elements object defining the data structure of the graph
     * Returns: {Object} elements object used by cytoscape
     * Inputs:  -
     */		
	_getCytoscapeElements: function(){
		var self = this;
		var nodes = [];
		var edges = [];
		var elements = new Object();
		for(interactionId in self.opt.interactions){
			var interactors = self.opt.interactions[interactionId];
			edges.push({ data: { id: interactionId, source: interactors[0], target: interactors[1]},classes: "alledges"});
			nodes.push({ data: { id: interactors[0], weight: self.opt.nodeWeight }, classes: "allnodes" });
			nodes.push({ data: { id: interactors[1], weight: self.opt.nodeWeight }, classes: "allnodes" });	
		}	
		elements = {"nodes": nodes, "edges": edges};
		return elements;
	},		
			
	
	/* 
     * Function: Biojs.HpaSummaryFeatures._startCytoscape
     * Purpose:  Start cytoscape and draw the network
     * Returns: -
     * Inputs:  -
     */		
	_startCytoscape: function(){	
		
		var elements = this._getCytoscapeElements();				
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
		
	
		jQuery("#"+this._cytoscapeTarget).cytoscapeweb({
		
		    // define the elements in the graph
		    elements: elements,
		
		    // define the layout to use
		    layout: {
		        name:"arbor"
		    },
		
		    // define the visual style (like css) of the graph
		    style: {
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
		                lineColor: "#FF9999"
		            }
		        }
		    },
		
		    // define the callback for when cytoscape web is ready
		    ready: function( cy ){
		        window.cy = cy;
		    }
		});
		
			
	},		
	
	
	/**
	 * The idea would be to load some stuff once cytoscape is ready.
	 * However it seems this cannot be done since the cy.ready or cy.done
	 * events of cytoscape do not work on this version.
	 */		
	_onCytoscapeReady: function(){
		alert("asdasdaa");
	},			

	
	/* 
     * Function: Biojs.HpaSummaryFeatures._printInteractionDetails
     * Purpose:  Print node and edges information
     * Returns: -
     * Inputs: nodes -> {String} String of interactors.
     * 		   edges -> {String} String of interactions.
     */				
	_printInteractionDetails: function(nodes, edges){
		var edgesMsg = jQuery('<span class="inInformation"><span class="miGreyText">Interactions: </span><span>'+edges+'</span></span>');
		var nodesMsg = jQuery('<span class="inInformation"><span class="miGreyText">Interactors: </span><span>'+nodes+'</span></span>');
		jQuery("#"+this._informationTarget).append(edgesMsg);
		jQuery("#"+this._informationTarget).append(nodesMsg);	
	},
			

	/**
	 * Highlight a filter option in the graph
	 * @param {string} [dataElement] Data element of one filter option.
	 * @param {string} [filterName] Filter name of one filter option.
	 * 
	 * @example 
	 * instance.highlightFilterOption("6","timeSeries");
	 * 
	 * @example 
	 * instance.highlightFilterOption("2","timeSeries");
	 */	
	highlightFilterOption: function(dataElement,filterName){
		jQuery(".miRadioBtn").not('.'+filterName+'RadioBtn').prop('checked', false);
		//jQuery(".miRadioBtn").attr('checked', false); 
		if(typeof filterName != undefined){
			if(typeof dataElement != undefined){
				if(dataElement == 'none'){
					this.unselect();
				}
				else if(typeof this.opt.filters[filterName].data[dataElement] != undefined){
					var edgeIds = "";
					var nodeIds = "";
					// SELECT EDGES - interactions
					for (key in this.opt.filters[filterName].data[dataElement]) {
			        	if (this.opt.filters[filterName].data[dataElement].hasOwnProperty(key)){
			        		var edgeId = this.opt.filters[filterName].data[dataElement][key];
			        		if(typeof edgeId != 'function'){
			        			edgeIds += "#" + edgeId + ", ";
								// SELECT NODES - interactors
								if(this.opt.interactions[edgeId] != undefined){
									for (i=0; i<this.opt.interactions[edgeId].length; i++){
										nodeIds += "#" + this.opt.interactions[edgeId][i] + ", ";	
									}
								} else {
									console.log("interaction" + edgeId +" undefined in interactions object"); //CONSOLE-INFO		
								}	
			        		}
			        	}
			        }
					edgeIds = edgeIds.substring(0,edgeIds.length - 2);
					nodeIds = nodeIds.substring(0,nodeIds.length - 2);
					//console.log(edgeIds); //CONSOLE-DEBUG	
					//console.log(nodeIds); //CONSOLE-DEBUG	
					this.unselect();
					cy.edges(edgeIds).select();	
					//cy.nodes(nodeIds).select();	
					this._printInteractionDetails(nodeIds.replace(/#/g, ""),edgeIds.replace(/#/g, ""));
				} else {
					console.log("dataElement undefined"); //CONSOLE-INFO	
				}
			} else {
					console.log("dataElement undefined"); //CONSOLE-INFO	
			}
		} else {
			console.log("filterName undefined"); //CONSOLE-INFO		
		}
	},	
	
	/**
	 * Unselect all the interactions in the graph
	 * 
	 * @example 
	 * instance.unselect();
	 * 
	 */		
	unselect: function(){
		cy.elements().unselect();
		jQuery("#"+this._informationTarget).empty();		
	},

	/* 
     * Function: Biojs.HpaSummaryFeatures._createFilterOptions
     * Purpose:  Create filter options
     * Returns:  -
     * Inputs:  -
     */	
	_createFilterOptions: function(){
		for (key in this.opt.filters) {
	        if (this.opt.filters.hasOwnProperty(key)){
	        	if(this.opt.filters[key].active == true){
	        		var filterContainer = jQuery('<div class="miFilter" id="'+key+'Filter"></div>');
	        		var filterTitle = jQuery('<div class="miFilterTitle" id="'+key+'Title">'+this.opt.filters[key].title+'</div>');
	        		var filterOptions = jQuery('<div class="miFilterOptions" id="'+key+'Options"></div>');
	        		filterContainer.append(filterTitle);
	        		filterContainer.append(filterOptions);
	        		jQuery("#"+this._filtersTarget).append(filterContainer);	
	        		if(this.opt.filters[key].presentation == "radio"){
	        			this._createRadioButtons(this.opt.filters[key].data, key, '#'+key+'Options');	
	        		} else if (this.opt.filters[key].presentation == "checkbox"){
	        			// todo
	        		} else {
	        			Biojs.console.log("ERROR: " + "filter presentation value unknown for filter " + key);
	        		}
	        	}	
	        }
	    }
	},
	
	/* 
     * Function: Biojs.HpaSummaryFeatures._createCheckBox
     * Purpose:  Create checkbox options
     * Returns:  -
     * Inputs:  -
     */	
	_createCheckBox: function(data, filterName, target){	
	},
	/* 
     * Function: Biojs.HpaSummaryFeatures._createRadioButtons
     * Purpose:  Create radio button options
     * Returns:  -	
     * Inputs: data -> {Object} Data for one filter.
     * 		   filterName -> {String} Filter name.
     * 		   target -> {String} HTML tag where to draw.
     */	
	_createRadioButtons: function(data, filterName, target){
		for (key in data) {
	        if (data.hasOwnProperty(key)){
	       		var br = jQuery('<br/>');	
	       		var radioBtnContainer = jQuery('<span></span>');
				var radioBtn = jQuery('<input class="miRadioBtn '+filterName+'RadioBtn" type="radio" name="'+filterName+'" value="'+key+'" onclick="'+this.opt.instanceName+'.highlightFilterOption(\''+key+'\',\''+filterName+'\');" />');
				var radioBtnName = jQuery('<span class="miRadioBtnName">'+key+'</span>');
				radioBtnContainer.append(radioBtn);
				radioBtnContainer.append(radioBtnName);
				radioBtnContainer.appendTo(target);
				//br.appendTo('#timeSeriesRadioButtons');		
	        }
	    }
	    var nondeRadioBtn = jQuery('<input class="miRadioBtn '+filterName+'RadioBtn" type="radio" name="'+filterName+'" value="'+key+'" onclick="'+this.opt.instanceName+'.highlightFilterOption(\'none\',\''+filterName+'\');" />'); //checked="checked"
		var noneRadioBtnName = jQuery('<span class="miRadioBtnName miGreyText">None</span>');
		nondeRadioBtn.appendTo(target);
		noneRadioBtnName.appendTo(target);
	},
	
	
	/* 
     * Function: Biojs.HpaSummaryFeatures._setHtmlTemplate
     * Purpose:  Create an HTML template to later on populate with information
     * Returns:  -	
     * Inputs: -
     */				
	_setHtmlTemplate: function(){
        this.opt.graphWidth = this.opt.graphWidth.toString();
        var width = this.opt.graphWidth + "px";
        if(this.opt.graphWidth.indexOf("%") != -1 || this.opt.graphWidth.indexOf("px") != -1){
            width = this.opt.graphWidth;
        }
		var interactionFilters = jQuery('<div id="'+this._filtersTarget+'" style="width:'+width+';"></div>');
		var cytoscape = jQuery('<div class="miDisplay" id="'+this._cytoscapeTarget+'" style="width:'+width+';"></div>');
		var information = jQuery('<div id="'+this._informationTarget+'" style="width:'+width+';"></div>');
		jQuery("#"+this.opt.target).append(interactionFilters);
		jQuery("#"+this.opt.target).append(cytoscape);
		jQuery("#"+this.opt.target).append(information);
	},
	
	/* 
     * Variable: Biojs.HpaSummaryFeatures._setHtmlTemplate
     * Purpose:  Create an HTML template to later on populate with information
     * Returns:  -	
     * Inputs: -
     */				
	_cytoscapeTarget: "miCy",
	_filtersTarget: "miInteractionFilters",
	_informationTarget: "miInformation"	
			
	

	
	
});