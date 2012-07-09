Biojs.Kegg = Biojs.Cytoscape.extend(
/** @lends Biojs.Kegg# */
{
	 constructor: function (options) {
	 	//http://www.genome.jp/kegg-bin/download?entry=mmu05210&format=keggml
	 	var instance = this;
		
		var dataSource = {
			url : 'http://www.genome.jp/kegg-bin/download',
			proxyUrl : options.proxyUrl,
			query : options.pathId
		};
		
		// Calling super's constructor
		var fk = instance.base;
		var callback = function(data){
			var ob = instance._decodeToJSON(data);
			
			instance._layout.positions = ob.positions;
			var op = {
				target: options.target,
				elements: ob.elements,
				style: instance._style,
				layout: instance._layout
			}
			fk(op);
		}
		instance._fetchData(dataSource, callback);
	 },
	 /**
	 * Default values for the options
	 * @name Biojs.InteractionsGraph-opt
	 */
	 opt: {
	 	proxyUrl: '../biojs/dependencies/proxy/proxy.php',
		pathId: "mmu05210"
	 },
	 /**
	 * Array containing the supported event names
	 * @name Biojs.InteractionsGraph-eventTypes
	 */
	 eventTypes: [],
	 /**
	  * @private
	  * Private: Fetch the data from kegg
	  */
	_fetchData: function (dataSource, fnCallback) {
		
		var httpRequest = { url: dataSource.psicquicUrl };
    	
    	// Data type expected 
    	httpRequest.dataType = 'xml';
    	httpRequest.type = 'GET';
    	httpRequest.success = fnCallback;
    	
    	// Using proxy?
    	// Redirect using the proxy and encode all params as url data
    	if ( dataSource.proxyUrl != undefined ) {

    		// Redirect to proxy url
    		httpRequest.url = dataSource.proxyUrl;

    		// Encode both url and parameters under the param url
    		httpRequest.data = [{ name: "url", value: dataSource.url+"?entry="+ dataSource.query+"&format=kgml"}];
    	}
		
		jQuery.ajax(httpRequest);
   },
   /**
	  * @private
	  * Private: maps kgml data to cytoscape.js edges and nodes 
	  */
	_decodeToJSON:function(kgmlData){
		var nodes = [];
		var edges = [];
		
		var positions = {};
		
		jQuery(kgmlData).find('entry').each(function(){
    		var self = this;
    		var node = {
    			data:{
    				id: jQuery(self).attr('id'), 
    				kegg_name: jQuery(self).attr('name'),
    				type: jQuery(self).attr('type')
    			},
    			classes: jQuery(self).attr('type')
    		};
    		
    		jQuery(self).find("graphics").each(function(){
			    var name = jQuery(this).attr('name');
			    
			    if(name !== undefined){
			    	node.data.name = name.split(', ')[0];
			    	node.data.names = name.split(', ');
			    }else{
			    	node.data.name = '';
			    	node.data.names = '';
			    }
			    
			    node.data.width = jQuery(this).attr('width');
			    node.data.height = jQuery(this).attr('height');
			    
			    positions[node.data.id] = { x:jQuery(this).attr('x'), y:jQuery(this).attr('y')};
			});

    		nodes.push(node);
  		});
		
		jQuery(kgmlData).find('relation').each(function(){
			var self = this;
			var edge = {
    			data:{
    				source: jQuery(self).attr('entry1'),
    				target: jQuery(self).attr('entry2'),
    				type: jQuery(self).attr('type')
    			}
    		};
    		
    		jQuery(self).find("subtype").each(function(){
				edge.data.name = jQuery(this).attr('name');
				edge.data.value = jQuery(this).attr('value');
				edge.classes = jQuery(this).attr('name').replace(' ','_').replace('/','_');
			});
    		
    		edges.push(edge);
		});
		
		return {elements: {nodes:nodes, edges:edges}, positions: positions};
	},
	_style:{
		selectors:{
			node:{
				//fillColor: "#888",
				labelFontSize: '10px',
				labelValign: 'middle',
				labelText: {
					passthroughMapper: 'name'
				},
				width:{
					continuousMapper:{
						attr:{
							name:'width',
							min: 1,
						    max: 100
						},
						mapped: {
							min: 1,
						    max: 100
						}
					}
				},
				height:{
					continuousMapper:{
						attr:{
							name:'height',
							min: 1,
						    max: 100
						},
						mapped: {
							min: 1,
						    max: 100
						}
					}
				}
			},
			'.gene':{
				fillColor: '#BFFFBF',
				borderColor: '#000000',
				borderWidth: 1,
				shape: 'rectangle'
			},
			'.ortholog':{
				fillColor: '#FFFFFF',
				borderColor: '#000000',
				borderWidth: 1,
				shape: 'rectangle'
			},
			'.compound':{
				fillColor: '#FFFFFF',
				borderColor: '#000000',
				borderWidth: 1
			},
			'.map':{
				fillColor: '#FFFFFF',
				borderColor: '#000000',
				borderWidth: 1,
				shape:'roundrectangle'
			},
			'.group':{
				fillColor: 'transparent',
				borderColor: '#000000',
				borderWidth: 1,
				shape:'roundrectangle',
				visibility:'hidden'
			},
			//transparent
			//enzyme reaction
			edge:{
				lineColor:"#CCC",
				labelFontSize: '10px',
				/*labelText: {
					passthroughMapper: 'name'
				},*/
				targetArrowColor:'#ccc',
				width:1
			},
			'.activation':{
				arrowshape:'triangle',
				lineColor:'#000'
			},
			'.inhibition':{
				arrowshape:'tee',
				lineColor:'#000'
			},
			'.expression':{
				arrowshape:'triangle',
				lineColor:'#000'
			},
			'.repression':{
				arrowshape:'tee',
				lineColor:'#000'
			},
			'.indirect_effect':{
				arrowshape:'triangle',
				lineColor:'#000'
			},
			'.state_change':{
				lineColor:'#000'
			},
			'.binding_association':{
				lineColor:'#000'
			},
			'.dissociation':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.missing_interaction':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.phosphorylation':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.dephosphorylation':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.glycosylation':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.ubiquitination':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			'.methylation':{
				labelText: {
					passthroughMapper: 'value'
				},
				lineColor:'#000'
			},
			"node:selected": {
            	fillColor: "#333"
            },
		    "edge:selected":{
		    	lineColor: "#666"
		    }
		}
	},
	_layout: {
        name: "preset",
        /*fit: false,
        stop: function(){
            cy.reset();
            cy.center();
        }*/
	}
		
});