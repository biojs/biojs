/**
 * @class
 * @extends Biojs.Cytoscape
 * 
 * @author <a href="mailto:secevalliv@gmail.com">José Villaveces</a>
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
Biojs.InteractionsGraph = Biojs.Cytoscape.extend(
/** @lends Biojs.InteractionsGraph# */
{
	 constructor: function (options) {
	 	
		var instance = this;
		
		
		options.layout = (options.layout === undefined) ? instance.opt.layout : options.layout;
		options.style = (options.style === undefined) ? instance.opt.style : options.style;
		options.calculateWeight = (options.calculateWeight === undefined) ? instance.opt.calculateWeight : options.calculateWeight;
		
		// Calling super's constructor
		var fk = instance.base;
		var callback = function(data){
			options.elements = instance._decodeToJSON(data);
			fk(options);
		}
		instance._options = options;
		instance._fetchData(options.dataSource, callback);
	 },
	/**
	 * Default values for the options
	 * @name Biojs.InteractionsGraph-opt
	 */
	 opt: {
	 	target: "YourOwnDivId",
	 	dataSource:{
			psicquicUrl: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query',
			proxyUrl: '../biojs/dependencies/proxy/proxy.php',
			query: "brca2"
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
               		width:  {
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
		},
        calculateWeight:true
	 },
	/**
	 * Array containing the supported event names
	 * @name Biojs.InteractionsGraph-eventTypes
	 */
	eventTypes: [],
	/**
	  * @private
	  * Private: Fetch the data from psicquic server
	  */
	_fetchData: function (dataSource, fnCallback) {
		
		var httpRequest = { url: dataSource.psicquicUrl };
    	
    	// Data type expected 
    	httpRequest.dataType = 'text';
    	httpRequest.type = 'GET';
    	httpRequest.success = fnCallback;
    	
    	// Using proxy?
    	// Redirect using the proxy and encode all params as url data
    	if ( dataSource.proxyUrl != undefined ) {

    		// Redirect to proxy url
    		httpRequest.url = dataSource.proxyUrl;

    		// Encode both url and parameters under the param url
    		httpRequest.data = [{ name: "url", value: dataSource.psicquicUrl+"/"+ dataSource.query}];
    	}
		
		jQuery.ajax(httpRequest);
    },
    /**
	  * @private
	  * Private: maps mitab data to cytoscape.js edges and nodes 
	  */
	_decodeToJSON:function(mitabData){
		var node_names = [];
		var nodes = [];
		var edges = [];
		
		var lines = mitabData.split('\n');
		for(var i=0; i<lines.length; i++){
			var line = lines[i].split('\t');
			
			if(line.length>1){
				var idA = this._addNode(this._extractId(line[0]), node_names, nodes);
				var idB = this._addNode(this._extractId(line[1]), node_names, nodes);
				
				var edge = { data: { id: i, source: idA, target: idB}};
				edges.push(edge);
			}
		}
		return {nodes:nodes, edges:edges};
	},
	/**
	  * @private
	  * Private: Add a node to the graph
	  */
	_addNode:function(id, node_names, nodes){
		var pos = jQuery.inArray(id, node_names);
		if(pos === -1){
			node_names.push(id);
			nodes.push({data:{id:id, weight: 10}});
		}else{
			if(this._options.calculateWeight){
				nodes[pos].data.weight += 10;
			}
		}
		
		return id;
	},
	/**
	  * @private
	  * Private: extracts the protein id
	  */
	_extractId:function(str){
		str = str.split('|')[0];
		str = (str.indexOf(':') == -1) ? str : str.substring(str.indexOf(':')+1);
		return str;
	}
});