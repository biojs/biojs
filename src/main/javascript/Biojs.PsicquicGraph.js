/**
 * 
 * Graph display of molecular interactions using <a href='http://code.google.com/p/psicquic/'>PSICQUIC</a>.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:villaveces@biochem.mpg.de">José Villaveces</a>
 * @version 1.0.0_beta
 * @category 2
 * 
 * @requires <a href='http://blog.jquery.com'>jQuery 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://cytoscape.github.io/cytoscape.js'>Cytoscape.js (latest version strongly suggested)</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/cytoscape.min.js"></script>
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    id of the div where the component should be displayed
 * 
 * @option {string} psicquicUrl
 * 	  url of the PSICQUIC server to query.
 * 
 * @option {string} proxyUrl
 * 	  url of the proxy to use.
 * 
 * @option {string} query
 * 	  MIQL query.
 *
 * @option {Object} cyoptions
 * 	  cytoscapejs inititlization options more info <a href='http://cytoscape.github.io/cytoscape.js/'>here</a>
 *
 * @example
 * var instance = new Biojs.PsicquicGraph({
 *      target: "YourOwnDivId",
 *	    psicquicUrl: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query',
 *		proxyUrl: '../biojs/dependencies/proxy/proxy.php',
 *      query: 'species:human?firstResult=0&maxResults=100',
 *      cyoptions: {
 *          style: cytoscape.stylesheet().selector('node').css({
 *              'content': 'data(id)',
 *              'font-family': 'helvetica',
 *              'font-size': 14,
 *              'text-outline-width': 3,
 *              'text-outline-color': '#888',
 *              'text-valign': 'center',
 *              'color': '#fff',
 *              'width': 'mapData(weight, 30, 80, 20, 50)',
 *              'height': 'mapData(height, 0, 200, 10, 45)',
 *              'border-color': '#fff'
 *            }).selector(':selected').css({
 *              'background-color': '#000',
 *              'line-color': '#000',
 *              'target-arrow-color': '#000',
 *              'text-outline-color': '#000'
 *           }).selector('edge').css({
 *              'width': 2
 *           }),
 *          layout: {
 *                name: 'circle',
 *                fit: true, // whether to fit the viewport to the graph
 *                ready: undefined, // callback on layoutready
 *                stop: undefined, // callback on layoutstop
 *                rStepSize: 10, // the step size for increasing the radius if the nodes don't fit on screen
 *                padding: 30, // the padding on fit
 *                startAngle: 3/2 * Math.PI, // the position of the first node
 *                counterclockwise: false // whether the layout should go counterclockwise (true) or clockwise (false)
 *            },
 *            ready:function(){
 *                var cy = this;
 *                cy.nodes().click(function(e){
 *                    console.log(e.cyTarget.id());
 *                });
 *            }
 *      }
 * });
 */

Biojs.PsicquicGraph = Biojs.extend(
/** @lends Biojs.PsicquicGraph# */
{
    constructor: function (options) {
        //Biojs.console.enable();
        this._query(this.opt);
	 },
	/**
	 * Default values for the options
	 * @name Biojs.PsicquicGraph-opt
	 */
	opt: {
		target: "YourOwnDivId",
		psicquicUrl: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query',
		proxyUrl: '../biojs/dependencies/proxy/proxy.php',
        query: 'species:human?firstResult=0&maxResults=100',
        cyoptions: {
            //see cytoscapejs inititlization options
            style: cytoscape.stylesheet().selector('node').css({
                'content': 'data(id)',
                'font-family': 'helvetica',
                'font-size': 14,
                'text-outline-width': 3,
                'text-outline-color': '#888',
                'text-valign': 'center',
                'color': '#fff',
                'width': 'mapData(weight, 30, 80, 20, 50)',
                'height': 'mapData(height, 0, 200, 10, 45)',
                'border-color': '#fff'
            }).selector(':selected').css({
                'background-color': '#000',
                'line-color': '#000',
                'target-arrow-color': '#000',
                'text-outline-color': '#000'
            }).selector('edge').css({
                'width': 2
            }),
            layout: {
                name: 'circle',
                fit: true, // whether to fit the viewport to the graph
                ready: undefined, // callback on layoutready
                stop: undefined, // callback on layoutstop
                rStepSize: 10, // the step size for increasing the radius if the nodes don't fit on screen
                padding: 30, // the padding on fit
                startAngle: 3/2 * Math.PI, // the position of the first node
                counterclockwise: false // whether the layout should go counterclockwise (true) or clockwise (false)
            },
            ready:function(){
                var cy = this;
                cy.nodes().click(function(e){
                    console.log(e.cyTarget.id());
                });
            }
        }
	},
	/**
	 * Array containing the supported event names
	 * @name Biojs.PsicquicGraph-eventTypes
	 */
	eventTypes: [],
    /* 
	 * Function: Biojs.PsicquicGraph._query
	 * Purpose:  Queries PSIQUIC using the provided query in MIQL.
	 * Inputs:   dataSet -> {Object} Settings of the data set.
	 */
    _query: function(dataSet){
        
        dataSet.url = dataSet.psicquicUrl + '/' + dataSet.query;
        
        var instance = this;
        jQuery.ajax({ 
			url: dataSet.proxyUrl,
			dataType: "text",
			data: [{ name: "url", value: dataSet.url }],
			success: function ( data ) {
                instance._decodeToJSON(data, instance);
			}
		});
    },
    /* 
	 * Function: Biojs.PsicquicGraph._decodeToJSON
	 * Purpose:  Transforms MiTab data into JSON and renders the graph.
	 * Inputs:   miTabData -> {Object} interactions in MiTab format.
     *           instance -> {Object} a reference to this widget instance.
	 */
    _decodeToJSON: function(miTabData, instance){
        var nodes = [], edges = [], map = {};
        
        var lines = miTabData.split('\n');
        for(var i=0; i<lines.length; i++){
            var line = lines[i].split('\t');
            
            if(line.length > 13){
            
                var idSource = line[0].split('|')[0].split(':')[1];
                
                if(map[idSource] === undefined){
                    map[idSource] = {
                        data:{
                            id: idSource,
                            organism: line[9].split('|')
                        }
                    }
                    nodes.push(map[idSource]);
                }
                
                var idTarget = line[1].split('|')[0].split(':')[1];
                
                if(map[idTarget] === undefined){
                    map[idTarget] = {
                         data:{
                            id: idTarget,
                            organism: line[10].split('|')
                         }
                    }
                    nodes.push(map[idTarget]);
                }
                
                edges.push({
                    data:{
                        source: idSource,
                        target: idTarget,
                        type: line[11].split('|'),
                        score: line[14].split('|')
                    }
                });
            }
        }
        
        instance.opt.cyoptions.elements = {
            nodes: nodes,
            edges: edges
        };

        jQuery('<div style="height:500px;width:100%;"></div>').appendTo('#'+instance.opt.target).cytoscape(instance.opt.cyoptions);
    }
});