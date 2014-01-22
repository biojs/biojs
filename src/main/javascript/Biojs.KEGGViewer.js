/**
 * 
 * Component that renders a KEGGML file and displays a KEGG pathway. It highlights pathway genes according to defined expression values for each experimental condition and allows users to change the threshold parameters for down and up-regulation.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:villaveces@biochem.mpg.de">José Villaveces</a>
 * @version 1.0.0_beta
 * @category 2
 * 
 * @requires <a href='http://blog.jquery.com'>jQuery 1.9.1</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.9.1.min.js"></script>
 *
 * @requires <a href='http://jqueryui.com/download/'>jQuery-UI 1.10.3</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.10.3.custom.min.js"></script>
 * 
 * @requires <a href='http://cytoscape.github.com/cytoscape.js/download/cytoscape.js-2.0.2.zip'>Cytoscape.js v2.0.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/cytoscape/2.0.2/cytoscape.min.js"></script>
 *
 * @dependency <link href="../biojs/css/smoothness/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" /> 
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    id of the div where the component should be displayed
 * 
 * @option {string} pathId
 * 	  KEGG pathway ID
 * 
 * @option {string} proxyUrl
 * 	  url of the proxy to use.
 *
 * @option {Object} expression
 * 	  expression values to highloght in the pathway.
 *
 * @option {string} upColor
 * 	  Prefered color for upregulated genes.
 *
 * @option {string} downColor
 * 	  Prefered color for downregulated genes.
 *
 * @option {string[]} genes
 * 	  Array containing the KEGG id of the genes to highlight.
 *
 * @option {Object[]} conditions
 * 	  Array containing the different conditions.
 *
 * @option {string} name
 * 	  Condition name.
 *
 * @option {string[]} values
 * 	  Array containing the gene expression values for the particular condition.
 *
 * @example
 * var instance = new Biojs.KEGGViewer({
 *      target: 'YourOwnDivId',
 *		pathId: 'hsa04910',
 *      proxyUrl: '../biojs/dependencies/proxy/proxy.php',
 *      expression:{
 *          upColor:'red',
 *          downColor:'blue',
 *          genes: ['hsa:7248', 'hsa:51763', 'hsa:2002', 'hsa:2194'],
 *          conditions: [
 *              {
 *                  name: 'condition 1',
 *                  values: [-1, 0.5, 0.7, -0.3]
 *              },
 *              {
 *                  name: 'condition 2',
 *                  values: [0.5, -0.1, -0.2, 1]
 *              },
 *              {
 *                  name: 'condition 3',
 *                  values: [0, 0.4, -0.2, 0.5]
 *              }
 *            ]
 *      }     
 *
 * });
 */

Biojs.KEGGViewer = Biojs.extend(
/** @lends Biojs.KEGGViewer# */
{
    constructor: function (options) {
        //Biojs.console.enable();
        var self = this;
        
        if(options.expression && options.expression.conditions.length > 0)
            self._initInfo(this.opt);
        
        self._query(this.opt);
	 },
	/**
	 * Default values for the options
	 * @name Biojs.KEGGViewer-opt
	 */
	opt: {
		target: 'YourOwnDivId',
		pathId: 'hsa04910',
        proxyUrl: '../biojs/dependencies/proxy/proxy.php',
        expression:{
            upColor:'red',
            downColor:'blue',
            genes: ['hsa:7248', 'hsa:51763', 'hsa:2002', 'hsa:2194'],
            conditions: [
                {
                    name: 'condition 1',
                    values: [-1, 0.5, 0.7, -0.3]
                },
                {
                    name: 'condition 2',
                    values: [0.5, -0.1, -0.2, 1]
                },
                {
                    name: 'condition 3',
                    values: [0, 0.4, -0.2, 0.5]
                }
            ]
        }
	},
	/**
	 * Array containing the supported event names
	 * @name Biojs.KEGGViewer-eventTypes
	 */
	eventTypes: [],
    /* 
	 * Function: Biojs.KEGGViewer._initInfo
	 * Purpose:  Initializes the info panel
	 * Inputs:   opt -> {Object} component options.
	 */
    _initInfo: function(opt){
        
        var self = this;
        
        var cond = '<option value="nocondition">No Condition</option>';
        opt.expression.conditions.forEach(function(e, i){
            cond+='<option value="'+e.name+'">'+e.name+'</option>';
        });
        
        jQuery('<div id="toolbar" style="position:relative;z-index:999999;top:20px;float:right;font-size:0.8em"><select id="condition">'+cond+'</select><button id="play">play</button><button id="refresh">refresh</button><p><label for="amount">Expression range:</label><label id="amount" style=" color: #f6931f; font-weight: bold;margin-left:10px;"></label></p><div id="slider-range"></div></div>').appendTo('#'+opt.target);
        
        $( "#play" ).button({
          text: false,
          icons: {
            primary: "ui-icon-play"
          }
        }).click(function() {
            var options;
            if ( $(this).text() === "play" ) {
                options = {
                    label: "stop",
                    icons: {
                        primary: "ui-icon-stop"
                    }
                };
                $("#refresh").button("disable");
                
                self._conditions = $("#condition > option");
                self._interval = setInterval(function(){
                    
                    var conditions = self._conditions;
                    var selected = $('#condition').val();
                    
                    var index;
                    for(var i=0; i<conditions.length; i++){
                        if($(conditions[i]).val() == selected){
                            index = i;
                            break;
                        }
                    }
                    
                    if(index === conditions.length){
                        $('#condition').val($(conditions[0]).val());
                    }else{
                        $('#condition').val($(conditions[index+1]).val());
                    }
                    self._paintExpression(self);
                }, 2000);
                
          }else{
              options = {
                  label: "play",
                  icons: {
                      primary: "ui-icon-play"
                  }
              };
              $( "#refresh" ).button("enable");
              
              window.clearInterval(self._interval);
          }
          $(this).button( "option", options );
        });
        
        $( "#refresh" ).button({
            text: false,
            icons: {
                primary: "ui-icon-refresh"
            }
        }).click(function() {
              self._paintExpression(self);
        });
        
        var min, max;
        for(var i=0; i<opt.expression.conditions.length; i++){
            var condition = opt.expression.conditions[i];
            for(var j=0; j<condition.values.length; j++){
                var val = condition.values[j];
                
                if(min == undefined && max == undefined){
                    min = val;
                    max = val;
                }else if(val<min){
                    min = val;
                }else if(val>max){
                    max = val;
                }
            }
        }
        
        opt.expression.min = min;
        opt.expression.max = max;
        
        $( "#slider-range" ).slider({
            range: true,
            min: min,
            max: max,
            step: 0.01,
            slide: function( event, ui ) {
                $( "#amount" ).text(ui.values[ 0 ] + " , " + ui.values[ 1 ] );
            }
        });
        $("#amount").text($("#slider-range").slider("values", 0) +" , " + $("#slider-range").slider("values", 1));
        
        $('#condition').change(function(){
            self._paintExpression(self);
        });
        
    },
    /* 
	 * Function: Biojs.KEGGViewer._query
	 * Purpose:  Queries KEGG using the provided KEGGId.
	 * Inputs:   dataSet -> {Object} Settings of the data set.
	 */
    _query: function(dataSet){
        
        var self = this;
        $.ajax({
            dataType: 'xml',
            url: dataSet.proxyUrl,
            data: {
                url:'http://rest.kegg.jp/get/'+dataSet.pathId+'/kgml'
            },
            success: function(xml){
                self._renderPathway(xml, self);
            }
        });
    },
    /* 
	 * Function: Biojs.KEGGViewer._clearExpression
	 * Purpose:  Clears the highlighted genes
	 * Inputs:   self -> {Object} component.
	 */
    _clearExpression: function(self){
        var nodes = self._cy.nodes();
        for(var j=0; j<nodes.length; j++){
            for(var k=0; k<self.opt.expression.genes.length; k++){
                if(nodes[j].data().keggId == self.opt.expression.genes[k]){
                    nodes[j].css("background-color", nodes[j].data().bkg_color);
                }
            }
        }
    },
    /* 
	 * Function: Biojs.KEGGViewer._paintExpression
	 * Purpose:  Highlight genes in a particular condition
	 * Inputs:   self -> {Object} component.
	 */
    _paintExpression: function(self){
        
        if($('#condition').val() == 'nocondition')
            self._clearExpression(self);
        
        var min = $("#slider-range").slider("values", 0);
        var max = $("#slider-range").slider("values", 1);
            
        var condition = {};
        for(var i=0; i<self.opt.expression.conditions.length; i++){
            if(self.opt.expression.conditions[i].name == $('#condition').val()){
                condition = self.opt.expression.conditions[i];
                    
                    
                var nodes = self._cy.nodes();
                for(var j=0; j<nodes.length; j++){
                    for(var k=0; k<self.opt.expression.genes.length; k++){
                        
                        var inArray = jQuery.inArray( self.opt.expression.genes[k], nodes[j].data().keggId );
                        if(inArray != -1){
                                
                            var exp = condition.values[k];
                            var color = nodes[j].data().bkg_color;
                            if(exp < min){
                                color = self.opt.expression.downColor;
                            }else if(exp > max){
                                color = self.opt.expression.upColor;
                            }
                            nodes[j].css("background-color", color);
                        }
                    }
                }
                
                break;
            }
        }  
    },
    /* 
	 * Function: Biojs.KEGGViewer._renderPathway
	 * Purpose:  Paints the pathway
	 * Inputs:   data -> {Object} JSON representation of the pathway
     *           self -> {Object} component.
	 */
    _renderPathway: function(data, self){
        var positions = {},
            node_map = {};
        var nodes = [],
            links = [],
            keggIds = [];
        
        $(data).find('entry').each(function(){
            var entry = $(this);
            var type =  entry.attr('type');
            var graphics = entry.find('graphics');
            
            var text_valign = 'center', 
                shape = 'rectangle',
                bkg_color = '#99ff99',
                opacity = 0.9,
                border_width = 0,
                width = $(graphics).attr('width'),
                height = $(graphics).attr('height');
            
            if(type == 'gene'){
                border_width = 2;
            }else if(type == 'ortholog'){
                border_width = 2;
            }else if(type == 'compound'){
                shape = 'ellipse';
                bkg_color = '#aaaaee';
                text_valign = 'bottom';
                opacity = 1
            }else if(type == 'map'){
                shape = 'roundrectangle';
                bkg_color = '#00bfff';
            }else if( type == 'group'){
                //shape = 'roundrectangle';
                //bkg_color = '#ffffff';
                width = undefined;
                height = undefined;
                entry.find('component').each(function(){
                    node_map[$(this).attr('id')].data.parent = entry.attr('id');
                });
            }
            
            var names = [];
            if(graphics.attr('name') !== undefined){
                names = graphics.attr('name').split(',');
            }
            
            var node = {};
            node.data = {
                id: entry.attr('id'),
                keggId: entry.attr('name').split(' '),
                name: names[0],
                names: names,
                type: type,
                link: entry.attr('link'),
                width: width,
                height: height,
                shape: shape,
                bkg_color: bkg_color,
                text_valign: text_valign,
                'border-width': border_width
            }
            
            keggIds.push(entry.attr('name'));
            
            node_map[entry.attr('id')] = node;
            nodes.push(node);
            
            positions[entry.attr('id')] = {
                x : +graphics.attr('x'),
                y : +graphics.attr('y')
            }
            
        });
        
        $(data).find('relation').each(function(){
            var rel = $(this);
            var type =  rel.attr('type');
            
            var subtypes = [];
            rel.find('subtype').each(function(){
                var sub = $(this);
                var name = sub.attr('name'),
                    line_style = 'solid',
                    target_arrow_shape = 'none',
                    text = '';
                
                if(name == 'maplink'){
                    target_arrow_shape = 'diamond';
                }else if(name == 'indirect effect'){
                    line_style = 'dotted';
                    target_arrow_shape = 'diamond'
                }else if(name == 'state change'){
                    line_style = 'dotted';
                }else if(name == 'missing interaction'){
                    line_style = 'dotted';
                    target_arrow_shape = 'triangle';
                }else if(name == 'phosphorylation'){
                    target_arrow_shape = 'triangle';
                    text = 'p+';
                }else if(name == 'dephosphorylation'){
                    target_arrow_shape = 'triangle';
                    text = 'p-';
                }else if(name == 'glycosylation'){
                    line_style = 'dashed';
                    target_arrow_shape = 'circle';
                }else if(name == 'ubiquitination'){
                    line_style = 'dashed';
                    target_arrow_shape = 'circle';
                }else if(name == 'methylation'){
                    line_style = 'dashed';
                    target_arrow_shape = 'circle';
                }else if(name == 'activation'){
                    target_arrow_shape = 'triangle';
                }else if(name == 'inhibition'){
                    target_arrow_shape = 'tee';
                }else if(name == 'expression'){
                    target_arrow_shape = 'triangle';
                }else if(name == 'repression'){
                    target_arrow_shape = 'tee';
                }
                
                links.push({
                    data:{
                        source: rel.attr('entry1'),
                        target: rel.attr('entry2'),
                        name: name,
                        reaction: type,
                        line_style: line_style,
                        target_arrow_shape: target_arrow_shape,
                        text: text
                    }
                });
            });
        });
        
        jQuery('<div style="z-index:9;position:relative;height:500px;width:100%;"></div>').appendTo('#'+self.opt.target).cytoscape({
            elements: {
                nodes : nodes,
                edges : links
            },
            style: cytoscape.stylesheet().selector('node').css({
                'content': 'data(name)',
                'text-valign': 'center',
                'width':  'data(width)',
                'height':  'data(height)',
                'shape':'data(shape)',
                'background-color': 'data(bkg_color)',
                'text-valign': 'data(text_valign)',
                'opacity': 'data(opacity)',
                'border-color': '#000000',
                'border-width': 'data(border-width)',
                'font-size': 11
            }).selector('edge').css({
                'content': 'data(text)',
                'target-arrow-shape': 'data(target_arrow_shape)',
                'line-style': 'data(line_style)',
                'line-color':'#000000',
                'target-arrow-color':'#000000',
                'text-valign' : 'bottom'
            }),
            layout: {
                name: "preset",
                fit: false,
                positions: positions
            },ready:function(){
                var cy = this;
                self._cy = cy;
            }
        });
    }
});