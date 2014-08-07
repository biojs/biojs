/** 
 * Uniprot Taxonomy component. A BioJS component for dynamic, multilevel visualisation of proteomes in Uniprot.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:secevalliv@gmail.com">Jose Villaveces</a>
 * @version 1.0.0
 * @category 3
 *
 *
 * @requires <a href='http://underscorejs.org/'>Underscore 1.6.0</a>
 * @dependency <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
 * 
 * @requires <a href='http://d3js.org/'>D3 3.4.6</a>
 * @dependency <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.6/d3.min.js"></script>
 *
 * @requires <a href='../biojs/css/biojs.ProteomeTaxonomyViewer.css'>biojs.ProteomeTaxonomyViewer</a>
 * @dependency <link href="../biojs/css/biojs.ProteomeTaxonomyViewer.css" rel="stylesheet" type="text/css" />
 *
 *
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {boolean} graphReduction 
 *    if true, graph reduction will be applyed
 *
 * @option {int} rootTaxa 
 *    Taxonomy id of the default taxa to be rendered on load.If set to something else than a taxonomy id, 
 *    a selection window will be rendered so the user can choose between superkingdoms.
 *
 *      
 * @option {string[]} nodeColours
 *    Array that defines the node colours. Positions in the array are defined as follows:
 *    <ul>
 *        <li><b>0</b> All nodes descending from Bacteria.</li>
 *        <li><b>1</b> All nodes descending from Eukaryota</li>
 *        <li><b>2</b> All nodes descending from Visuses</li>
 *        <li><b>3</b> All nodes descending from Archaea</li>
 *        <li><b>4</b> All nodes with a 'complete proteome'</li>
 *        <li><b>5</b> All nodes with a 'reference proteome'</li>
 *        <li><b>6</b> All other nodes (e.g. cellular organisms)</li>   
 *    </ul> 
 *    
 * @option {string} taxaURL
 *    URL where the taxonomy data resides. It can link to a <a href="https://github.com/jmVillaveces/uniprot-taxonomy-viewer/blob/master/data/taxa.json">plain JSON file</a> or to the <a href="https://github.com/jmVillaveces/uniprot-taxonomy-viewer-ws">uniport taxonomy web service</a>.

 *
 * @example 
 * var instance = new Biojs.ProteomeTaxonomyViewer({
 * 		target : 'YourOwnDivId',
 *      rootTaxa : 68525
 * });
 */
Biojs.ProteomeTaxonomyViewer = Biojs.extend (
/** @lends Biojs.ProteomeTaxonomyViewer# */
{
    constructor: function (options) {
        
        this._loading(true);//start loading
        
        // Component dimensions
        this._width =  document.getElementById(this.opt.target).clientWidth; // inner width of the target element in pixels
        this._height = document.getElementById(this.opt.target).clientHeight; // inner height of the target element in pixels
        
        this._width = (this._width==0) ? 500 : this._width;
        this._height = (this._height==0) ? 500 : this._height;
        
        var self = this;
        // Initialize the canvas component with defined size, click, mousemove and zoom behavior
        this._canvas = d3.select('#'+this.opt.target).append('canvas')
                .text('your browser doesn\'t support canvas!')
                .attr('id', 'cnvs')
                .attr('width',this._width)
                .attr('height',this._height)
                .call(d3.behavior.zoom().on('zoom', function(){self._zoom()}))
                .on('click', function(){
                    var coords = d3.mouse(this);
                    var node = self._findNode(coords);
                    self._nodeClick(node);
                })
                .on('mousemove', function() {
                    var coords = d3.mouse(this);
                    
                    if(_.isNull(self._toolTip)) return;
                    
                    var node = self._findNode(coords);
                    
                    if(!_.isUndefined(node)){
                        self._toolTip.showTooltip(node.name, coords);
                        self.raiseEvent('onTaxaMouseOver', {source: node});
                    }else{
                        self._toolTip.hideTooltip();
                    }
                });
        
        //Init canvas 2d context
        this._context = this._canvas.node().getContext('2d');
        
        //Init navigation bar
        this._navBar = d3.select('#'+this.opt.target).append('svg')
            .attr('width',this._width)
            .attr('height',50);
        
        // Init the node style scale
        this._styleScale = d3.scale.ordinal()
            .domain(['2', '2759', '10239', '2157', 'CP','RP','-'])
            .range(this.opt.nodeColours);
        
        this._getData();
    },

    /**
	 * Default values for the options
	 * @name Biojs.ProteomeTaxonomyViewer-opt
	 */
    opt: {
        target: 'YourOwnDivId',
        graphReduction: true,
        taxaURL: '../biojs/data/BioJS.ProteomeTaxonomyViewer.taxa.json',
        rootTaxa: -1,
        nodeColours: ['steelblue','orange','green','purple','red','gold','gray']
    },

    eventTypes: [
    
        /**
		 * @name Biojs.ProteomeTaxonomyViewer#onTaxaChanged
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The node which did triggered the event.
		 * @example 
		 * instance.onTaxaChanged(
		 *    function( objEvent ) {
		 *       alert("Clicked: " + objEvent.source.name);
		 *    }
		 * ); 
		 * 
		 * */
		'onTaxaChanged',
        
        /**
		 * @name Biojs.ProteomeTaxonomyViewer#onTaxaMouseOver
		 * @event
		 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The node which did triggered the event.
		 * @example 
		 * instance.onTaxaMouseOver(
		 *    function( objEvent ) {
		 *       alert("MouseOver: " + objEvent.source.name);
		 *    }
		 * ); 
		 * 
		 * */
		'onTaxaMouseOver'
    ],
    
   /**
    * Updates the current visualizaion using taxId as input
    * 
    * @param {string} taxId The tax id of the desired taxa to render the tree
    *
    * @example 
    * instance.setTaxa(2157);
    *
    * @example 
    * instance.setTaxa(9606);
    */
    setTaxa : function(taxId){
        var taxa = this._nodesMap.get(taxId);
        if(!_.isUndefined(taxa)) this._nodeClick(taxa);
    },
    
    // Internal members
    _width : null,// visualization width
    _height : null,// visualization height
    _canvas : null, //canvas tag
    _context : null,//canvas context
    _curLinksData : [], //Data of the displayed links 
    _curNodesData : [], //Data of the displayed nodes 
    _connErrorMsg : 'There was an error fetching the data. Please check your connection or try again later!', // Default error message to show on connection error
    _nodesMap : null, //Map containing all nodes
    _translate : [0,0], //Current translate
    _scale : 1, // Current scale,
    _radiusScale : null,// Scale to calculate the nodes size
    _toolTip : null, //Tooltip
    _aboutPopup : null, //About Popup
    _optionsPopup : null, //Options Popup
    _navBar : null, //Navigation line
    _styleScale : null,//Scale to calculate nodes colour
    
   /**
    * Makes an ajax call and retrieves the taxa data from taxaURL
    */
    _getData : function(){
    
        var self = this, url = this.opt.taxaURL;
        
        //Get taxa json
        d3.json(url,function(error, data){
            
            //If there is an error, show error message
            if(error){
                d3.select('#'+self.opt.target)
                    .attr('class', 'errorMSG')
                    .text(self._connErrorMsg);
                
                return console.warn(error);
            }
            
            //Create nodesMap
            self._nodesMap = d3.map();
            _.each(data, function(n){
                n.grChildren = n.children;
                n.grParentTaxId = n.parentTaxId;
                self._nodesMap.set(n.taxId, n);
            });
            
            //Set selected taxa and root taxa
            var selected =  self._nodesMap.get(self.opt.rootTaxa), 
                root = self._nodesMap.get(1);
            
            //Calculate graph reduction
            self._graphReduction(root, '-');
            self._initControlBar();// Init control bar
            
            self._toolTip = self._tooltip();//Init tooltip
            
            if(_.isUndefined(selected)){ 
                self._selectionWindow();
            }else{
                self._updateViz(selected); //Start visualization with selected taxa
            }
        });
        
    },
    
   /**
    * Updates the current visualizaion using node as input
    * 
    * @param {object} node The starting taxa to render the tree
    */
    _updateViz : function(node){
        this._loading(true);//start loading
        
        var self = this;
        
        // Use a timeout to allow the rest of the page to load first.
        setTimeout(function() {
            self._formatData(node);
            self._updateNavLine(node);

            // Start force
            var force = d3.layout.force()
                    .charge(-90)
                    .linkDistance(5)
                    .size([self._width, self._height])
                    .nodes(self._curNodesData)
                    .links(self._curLinksData);


            // Run the layout a fixed number of times.
            // The ideal number of times scales with graph complexity.
            // Of course, don't run too long—you'll hang the page!
            var n = 90;
            force.start();
            for (var i = n; i > 0; --i) force.tick();
            force.stop();

            //Translate position so center of canvas is root node
            //this._translate = [node.x, node.y];
            
            //Draw the canvas
            self._draw();

            self._loading(false);//stop loading
        }, 10);
    },
    
   /**
    * Draws the graph using canvas. To avoid unnecessary canvas state changes colours are rendered
    * in different paths.
    */
    _draw : function() {
        
        // Start timing now
        console.time("draw");
        
        var self = this;
            
        var context = this._context;
        
        this._context.save();
        this._context.clearRect(0, 0, this._width, this._height);
        this._context.translate(this._translate[0], this._translate[1]);
        this._context.scale(this._scale, this._scale);
        
        // draw links
        context.strokeStyle = '#ccc';
        context.beginPath();
        this._curLinksData.forEach(function(d) {
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
        });
        context.stroke();
        context.closePath();

        // draw nodes
        
        var root = this._curNodesData[0];
        
        //Highlight root
        context.beginPath();
        context.moveTo(root.x, root.y);
        context.arc(root.x, root.y, self._radiusScale(root.r), 0, 2 * Math.PI);
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.closePath();
        context.stroke();
        
        //Its less costly to draw things by colour
        var groups = _.groupBy(this._curNodesData, 'category');
        
        _.each(_.keys(groups), function(cat){
            context.beginPath(); // one path per category
            context.fillStyle = self._styleScale(cat);
            
            _.each(groups[cat], function(d){
                context.moveTo(d.x, d.y);
                context.arc(d.x, d.y, self._radiusScale(d.r), 0, 2 * Math.PI);
            });
            context.closePath();
            context.fill();
        });
        
        context.restore();
        
        console.log('nodes '+this._curNodesData.length);
        
        // ... and stop.
        console.timeEnd("draw");
    },
    
   /**
    * Finds nodes in the defined coordinates.
    * 
    * @param {int[]} array containing x and y coordinates
    *
    * @return {Object} node in coordintes. Returns undefined if there nothing is found
    */
    _findNode : function(coords) {
        var self = this, 
        node = _.find(this._curNodesData, function(n){
            var nCoords = self._getScreenCoords(n.x, n.y);
            var radius = self._radiusScale(n.r); //* self.scale;
            if(coords[0] > nCoords.x-radius && coords[0] < nCoords.x+radius && coords[1] > nCoords.y-radius && coords[1] < nCoords.y+radius ){
                return n;
            }
        });
        
        return node;
    },
    
   /**
    * Geometric zoom using d3 translate and scale values to redraw the canvas
    */
    _zoom : function () {
        this._translate = d3.event.translate;
        this._scale = d3.event.scale;
        
        this._draw();
    },
    
   /**
    * Updates translate and scale values before updating the visualization
    */
    _nodeClick : function(node){
        if(!_.isUndefined(node)) {
            //Reset scale and translate
            this._translate = [0,0];
            this._scale = 1;
            this._updateViz(node);
            
            this.raiseEvent('onTaxaChanged', {source: node});
        };
    },
    
   /**
    * Translates mouse coordinates 
    */
    _getScreenCoords : function (x, y) {
        var xn = this._translate[0] + x*this._scale,
            yn = this._translate[1] + y*this._scale;
        return { x: xn, y: yn };
    },
    
   /**
    * Set the nodes and edges to display
    *
    * @param {object} node The starting taxa to render the tree
    *
    */
    _formatData : function(node){
    
        var self = this, nodes = [], links = [],
            children = (this.opt.graphReduction) ? 'grChildren' : 'children',
            max = 0;
        
        var getNodes = function myself(n){
            nodes.push(n);
            
            _.each(n[children], function(ch){
                myself(self._nodesMap.get(ch));
            });
            
        }(node);
        
        //create links
        _.each(nodes, function(n){
            var source = n;
            
            n.r = n[children].length;
            if(n.r > max) max = n.r;
            _.each(source[children], function(ch){
                var target = self._nodesMap.get(ch);
                links.push({
                    source: source,
                    target: target
                });
            });
        });
        
        this._radiusScale = d3.scale.ordinal().domain([0, max]).range([5,8]);
        
        this._curNodesData = nodes;
        this._curLinksData = links;
    },
    
   /**
    * Initializes the control bar by injecting HTML and handling events
    */
     _initControlBar : function(){
         var self = this;
         
         var tr = d3.select('#'+this.opt.target).append('table')
            .style('position', 'absolute').append('tr');
         
         //Input
         var inputdiv = tr.append('td').append('div').attr('class', 'search');
         
         inputdiv.append('input')
            .attr('type', 'text')
            .attr('placeholder', 'Search...')
            .attr('autocomplete', 'off')
            .on('keyup', function(){
                
                d3.select('.results').html(''); 
                
                if(this.value.length < 3) return;
                    
                var searchRegEx = new RegExp(this.value.toLowerCase());
                var res = _.filter(self._nodesMap.values(), function(d){    
                    var matchName = d.name.toLowerCase().search(searchRegEx);
                    var matchId = d.taxId.toString().toLowerCase().search(searchRegEx);
                        
                    return matchName >= 0 || matchId >= 0;
                });
                 
                _.each(res, function(d){
                    d3.select('.results').append('li')
                        .html('<a href="#">'+d.name+'<br/><span>'+d.taxId+'</span></a>')
                        .on('click', function(){
                            d3.selectAll('table.browse').style('display', 'none');
                            self._updateViz(d)
                        }); 
                });
                    
                if(res.length > 0) d3.select('.results').transition().style('display', 'block');
                    
            })
            .on('focusout', function(){
                setTimeout(function(){d3.select('.results').transition().style('display', 'none');}, 100);
            })
            .on('focusin', function(){
                if (d3.selectAll('.results li').length > 0) d3.select('.results').transition().style('display', 'block');
            });
         
         inputdiv.append('ul').attr('class', 'results');
         
         //Settings
         tr.append('td').attr('class','settings').append('div')
            .attr('class', 'sprite sprite-settings')
            .on('click', function(){
            
                var content = function(div){
                    div.append('p').attr('class','title').html('Options');
                    
                    var cbox = div.append('p').attr('class', 'content').text('Graph Reduction').append('input').attr('type', 'checkbox');
                    
                    if(self.opt.graphReduction) cbox.attr('checked','');
                    
                    cbox.on('click', function(){
                        self.opt.graphReduction = !self.opt.graphReduction;
                        if(self._curNodesData.length > 0) self._nodeClick(self._curNodesData[0]);//update viz
                    });
                }
                
                if(_.isNull(self._optionsPopup)) self._optionsPopup = self._dialog(content);
                
                self._optionsPopup.showDialog();
            
            });
         
         //Download
         tr.append('td').attr('class','settings').append('a')
            .attr('target', '_blank')
            .attr('href', '#')
            .attr('download', 'network.png')
            .on('click', function(){
                var dataURL = document.getElementById('cnvs').toDataURL('image/png');
                this.href = dataURL;
            })
            .append('div')
                .attr('class', 'sprite sprite-save-image');
         
         //About
         tr.append('td').attr('class','settings').append('div')
            .attr('alt', 'About')
            .attr('class', 'sprite sprite-about')
            .on('click', function(){
            
                var str = '<p class="title">About</p>'+
                          '<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
                
                if(_.isNull(self._aboutPopup)) self._aboutPopup = self._dialog(str);
                
                self._aboutPopup.showDialog();
            
            });
     },
   /**
    * Recursive function to calculate graph reduction as well as node categories
    */
    _graphReduction : function(node, cat){
        
        if(node.category === '-'){
            if(_.indexOf([2, 2759, 10239, 2157], node.taxId) !== -1) cat = node.taxId+'';            
            node.category = cat;
        }
        
        var childrenIds = node.grChildren;
        
        if(childrenIds.length === 1){
            
            //update child
            var child = this._nodesMap.get(childrenIds[0]);
            child.grParentTaxId = node.grParentTaxId;
            
            // update parent
            var parent = this._nodesMap.get(node.grParentTaxId);
            parent.grChildren = _.without(parent.grChildren, node.taxId);
            parent.grChildren.push(child.taxId);
            
            //recursion on child
            this._graphReduction(child, cat);
            
        }else if(childrenIds.length > 1){
            var self = this;
            _.each(childrenIds, function(id){
                self._graphReduction(self._nodesMap.get(id), cat);
            });
        } 
    },
    
   /**
    * Changes the mouse style according to bool
    *
    * @param {boolean} bool If true, the cursor is set to wait else is set to default
    *
    */
    _loading : function(bool){
        
        if(bool) {
            d3.select('#'+this.opt.target).style('cursor','wait'); 
            return;
        }
        d3.select('#'+this.opt.target).style('cursor','default'); 
    },
    
   /**
    * Creates a dialog object
    */
    _dialog : function(content){
        
        var popup = d3.select('#'+this.opt.target).append('div')
                        .attr('class', 'dialog')
                        .style('display', 'none');
        
        popup.append('div')
                .attr('class', 'settings sprite sprite-close')
                .style('position','absolute')
                .style('top','0px')
                .style('right','0px')
                .on('click', hideDialog);
        
        var contentDiv = popup.append('div');
        
        if(_.isString(content)){
            contentDiv.html(content);
        }else if(_.isFunction(content)){
            content(contentDiv);
        }
        
        function showDialog(){
            popup.style('display', 'block');
        }
        
        function hideDialog(){
            popup.style('display', 'none');
        }
        
        return { 
            showDialog:showDialog,
            hideDialog:hideDialog
        };
    },
    
   /**
    * Update the navigation line
    *
    * @param {object} node The starting taxa to render the tree
    *
    */
    _updateNavLine : function(node){
    
        var nodes = [], self = this,
            parent = (this.opt.graphReduction) ? 'grParentTaxId' : 'parentTaxId';
        
        var getParents = function myself(node){
            if(node.taxId !== 1){
                nodes.push(node);
                myself(self._nodesMap.get(node[parent]));
            }
        }(node);
        
        nodes = nodes.reverse();
        
        var line = this._navBar.selectAll('line').data([{id:'navLine'}]);
        
        //Enter
        line.enter().append('line');
        
        //Update
        line.attr('x1', 0)
            .attr('y1', 12)
            .attr('x2', nodes.length*20)
            .attr('y2', 12)
            .style('stroke', '#ccc');
        
        //Remove
        line.exit().remove();
        
        var circle = this._navBar.selectAll('circle').data(nodes);
        
        //Enter
        circle.enter().append('circle')
            .on('mouseover', function(d){
                d3.select(this).transition().attr('r', 10).style('cursor','pointer');
            })
            .on('mouseout', function(d){
                d3.select(this).transition().attr('r', 4).style('cursor','default');
            }).on('click', function(d){
                self._nodeClick(d);
            }).append("title").text(function(d) { return d.name + ' ('+d.taxId+')'; });
        
        //Update
        circle.attr('cx', function(d,i){return i*20 + 20;})
            .attr('cy', 12)
            .attr('r', 4)
            .style('fill', function(d){return self._styleScale(d.category);})
            .style('stroke', '#003300')
            .style('stroke-width', function(d){ return (d.taxId === node.taxId) ? 2 : 0; });
        
        //Remove
        circle.exit().remove();
        
        var data =  _.isUndefined(_.last(nodes)) ? [] : [_.last(nodes)];
        var text = this._navBar.selectAll('text').data(data);

        //Enter
        text.enter().append('text');
        
        //Update
        text.text( function (d) { return d.name + ' ('+d.taxId+')'; })
            .attr('x', (nodes.length-1)*20+20)
            .attr('y', 30)
            .attr('text-anchor', 'right')
            .attr('font-size', 12);
        
        //Remove
        text.exit().remove();
    },
    
   /**
    * Creates a tooltip object
    */
    _tooltip : function(){
        
        var  xOffset = 20, yOffset = 10;
        
        var toolt = d3.select('#'+this.opt.target).append('div')
                        .attr('class', 'tooltip')
                        .style('display', 'none');
        
        function showTooltip(content, position){
            toolt.html(content);
            toolt.style('display', 'block');
            
            updatePosition(position);
        }
        
        function hideTooltip(){
            toolt.style('display', 'none');
        }
        
        function updatePosition(position){
            toolt.style('left', position[0] + xOffset);
            toolt.style('top', position[1]+ yOffset);
        }
        
        return { 
            showTooltip:showTooltip,
            hideTooltip:hideTooltip,
            updatePosition:updatePosition
        };  
    },
    
    _selectionWindow : function(){
        var table = d3.select('#'+this.opt.target).append('table').attr('class', 'browse');
        
        var row = table.append('tr');
        
        row.append('td')
            .on('click', function(){browseClick(10239)})
            .attr('class', 'browse-box viruses')
            .html('Viruses').append('div').attr('class', 'virus-bkg');
        row.append('td')
            .on('click', function(){browseClick(2)})
            .attr('class', 'browse-box bacteria')
            .html('Bacteria').append('div').attr('class', 'bacteria-bkg');
        
        row = table.append('tr');
        
        row.append('td')
            .on('click', function(){browseClick(2157)})
            .attr('class', 'browse-box archaea')
            .html('Archaea').append('div').attr('class', 'bacteria-bkg');
        row.append('td')
            .on('click', function(){browseClick(2759)})
            .attr('class', 'browse-box eukaryota')
            .html('Eukaryota').append('div').attr('class', 'eukaryota-bkg');
        
        this._loading(false);
        var self = this;
        function browseClick(taxId){
            var tax = self._nodesMap.get(taxId);
            
            if(! _.isUndefined(tax)){
                table.style('display', 'none');
                self._nodeClick(tax);
            }
        }
    }
});