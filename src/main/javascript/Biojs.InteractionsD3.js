/**
 * This component uses the D3 library and specifically its implementation of the force algorithm to 
 * represent a network of protein interactions.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 0.9.1_beta
 * @category 1
 * 
 * @requires <a href='http://code.jquery.com/query-1.7.2.min.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://d3js.org/'>D3</a>
 * @dependency <script src="http://d3js.org/d3.v2.min.js" type="text/javascript"></script>
 *
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.InteractionsD3.css'>InteractionsD3 CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.InteractionsD3.css" />
 * 
 * @param {Object} options An object with the options for the InteractionsD3 component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 * @option {string} width
 *    Width of the SVG element, if given in percentage it will use it on proportion of the container 
 * @option {string} height
 *    Height of the SVG element, if given in percentage it will use it on proportion of the container 
 * @option {string} radius
 *    Radius of the nodes representing the proteins
 * @option {string} enableEdges
 * 	  Force the proteins to stay in the defined area of the SVG
 * 
 * @example
 * 			var instance = new Biojs.InteractionsD3({
 * 				target: "YourOwnDivId",
 * 			});	
 * 			for (var pid=1;pid<=15;pid++)
 *				instance.addProtein({ "id":pid,"name":pid,"showLegend":false,"typeLegend":"id","organism":"human"+pid%3,"features":{"f1":"val1","f2":"val2","f3":"val3"}});
 *			
 * 			for (var pid=1;pid<=30;pid++)
 *				instance.addInteraction(Math.floor((Math.random()*15)+1),Math.floor((Math.random()*15)+1) ,{score:Math.random()});
 * 			instance.restart();
 */
Biojs.InteractionsD3 = Biojs.extend (
	/** @lends Biojs.InteractionsD3# */
	{
		force:null,
		vis:null,
		interactions:[],
		interactionsA:{},
		proteins:[],
		proteinsA:{},
		node_drag:null,
		color: null,
		foci: [],
		organisms: {},
		
		//Transformation values
		tTranslate:null,
		tScale:null,
		
		constructor: function (options) {
			var self 	= this;
			self.force	=null;
			self.vis	=null;
			self.interactions=[];
			self.interactionsA={};
			self.proteins=[];
			self.proteinsA={};
			self.node_drag=null;
			self.color= null;
			self.foci=[];
			self.organisms={};

			this._container = $("#"+self.opt.target);
			this._container.empty();
			$(this._container).addClass("graphNetwork");
			
			var	width = $(this._container).width(),
				height = $(this._container).height();

			if (self.opt.width.indexOf("%")!=-1)
				width = width*(self.opt.width.substring(0, self.opt.width.length-1)*1)/100.0;
			else
				width=self.opt.width*1;
			self.opt.width=width;
			
			if (self.opt.height.indexOf("%")!=-1)
				height = height*(self.opt.height.substring(0, self.opt.height.length-1)*1)/100.0;
			else
				height=self.opt.height*1;
			self.opt.height=height;
			
			this._container.width(width);
			this._container.height(height);
			
			self.color = function() {
			    return d3.scale.ordinal().range(self.colors);
			}();

			self.zoom=d3.behavior.zoom().
    		scaleExtent([(self.opt.enableEdges)?1:0.1, 10])
    		.on("zoom", redraw);
			self.vis = d3.select("#"+self.opt.target).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			    .attr("pointer-events", "all")
			    .call(self.zoom)
			    .append('svg:g');
			
			self.vis.append('svg:rect')
			    .attr('width', width*20)
			    .attr('height', height*20)
			    .attr('x', -width*10)
			    .attr('y', -height*10)
			    .attr('fill', 'white')
			    .attr('stroke','white');

			self.rect= self.vis.append('svg:rect')
				.attr("class", "frame")
			    .attr('width', width)
			    .attr('height', height)
			    .attr('fill', 'white')
			    .attr('stroke','white')
			    .attr("stroke-dasharray","5,5");


			self.perspective=d3.select("#"+self.opt.target + " svg").append('svg:g');
			
			 
			
			function redraw(x,y,scaleP) {
				var trans=null,scale=null;
				if (typeof x!="undefined" && typeof y!="undefined"){
					trans=[x,y];
					scale = scaleP;
				}else{
					trans=d3.event.translate;
					scale = d3.event.scale;
				}
				self.tTranslate=trans;
				self.tScale=scale;
				if (self.opt.enableEdges) {
					if(scale<1)scale=1;
					d3.behavior.zoom().scaleExtent([1, Infinity]);
					  if (trans[0]>0)trans[0]=0;
					  if (trans[1]>0)trans[1]=0;
	
					  var W = self.rect[0][0].width.animVal.value, H= self.rect[0][0].height.animVal.value;
					  var Ws = W*scale, Hs = H*scale;
					  if (Ws<W-trans[0]) trans[0]=W-Ws;
					  if (Hs<H-trans[1]) trans[1]=H-Hs;
				}
				  self.vis.attr("transform",
				      "translate(" + trans + ")"
				      + " scale(" + scale + ")");
			};
			self.redraw=redraw;
			
			self.force = d3.layout.force()
			    .nodes(self.proteins)
			    .links(self.interactions)
			    .size([width, height]);
			
			
			self.node_drag = d3.behavior.drag()
				.on("dragstart", dragstart)
				.on("drag", dragmove)
				.on("dragend", dragend);

			function dragstart(d, i) {
				self.force.stop(); // stops the force auto positioning before you start dragging
			}

			function dragmove(d, i) {
				d.px += d3.event.dx;
				d.py += d3.event.dy;
				d.x += d3.event.dx;
				d.y += d3.event.dy; 
				tick(d3.event); // this is the key to make it work together with updating both px,py,x,y on d !
			}

			function dragend(d, i) {
				d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
				tick(d3.event);
				self.force.resume();
			}
			self.force.on("tick", tick);
			function tick(e) {
				if (e.type=="tick"){
					var k = .1 * e.alpha;
					self.proteins.forEach(function(o, i) {
						o.y += (self.foci[self.organisms[o.organism]].y - o.y) * k;
						o.x += (self.foci[self.organisms[o.organism]].x - o.x) * k;
					});
				}
				self.vis.selectAll("path.figure")
						.attr("transform", function(d) { 
							if (self.opt.enableEdges)
								return "translate(" + Math.max(r, Math.min(self.opt.width , d.x+r)) + "," + Math.max(r, Math.min(self.opt.height, d.y+r)) + ")";
							else
								return "translate(" + d.x + "," +  d.y + ")"; 
						});

				if (self.opt.enableEdges) 
					self.vis.selectAll(".legend")
						.attr("x", function(d) { return d.x = Math.max(r, Math.min(self.opt.width - r, d.x)); })
						.attr("y", function(d) { return d.y = Math.max(r, Math.min(self.opt.height - r, d.y)); });
				else
					self.vis.selectAll(".legend")
						.attr("x", function(d) { return d.x; })
						.attr("y", function(d) { return d.y; });
				if (self.opt.enableEdges) 
					self.vis.selectAll("line.link")
						.attr("x1", function(d) { return d.source.x+r; })
						.attr("y1", function(d) { return d.source.y+r; })
						.attr("x2", function(d) { return d.target.x+r; })
						.attr("y2", function(d) { return d.target.y+r; });
				else
					self.vis.selectAll("line.link")
						.attr("x1", function(d) { return d.source.x; })
						.attr("y1", function(d) { return d.source.y; })
						.attr("x2", function(d) { return d.target.x; })
						.attr("y2", function(d) { return d.target.y; });
			};
			self.tick=tick;
			//Binding the _resize method when resizing the window! 
			//d3.select(window).on("resize", function(){self._resize(self);});
			
			self.restart();
		},
		/**
		 *  Default values for the options
		 *  @name Biojs.InteractionsD3-opt
		 */
		opt: {
			target: "YourOwnDivId",
			width: "100%",
			height: "500", 
			radius: 10,
			enableEdges:false
		},

		/**
		 * Array containing the supported event names
		 * @name Biojs.InteractionsD3-eventTypes
		 */
		eventTypes : [
			/**
			 * @name Biojs.InteractionsD3#proteinClick
			 * @event
			 * @param {function} actionPerformed It is triggered when the user clicks on a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been clicked.
			 * @example 
			 * instance.proteinClick(
			 *    function( objEvent ) {
			 *       alert("The protein " + objEvent.protein.id + " was clicked.");
			 *    }
			 * ); 
			 * 
			 * */
			"proteinClick",
			/**
			 * @name Biojs.InteractionsD3#proteinMouseOver
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer is over a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been mouseover.
			 * @example 
			 * instance.proteinMouseOver(
			 *    function( objEvent ) {
			 *       alert("The mouse is over the protein " + objEvent.protein.id);
			 *    }
			 * ); 
			 * 
			 * */
			"proteinMouseOver",
			/**
			 * @name Biojs.InteractionsD3#proteinMouseOut
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer leave the area of a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been mouseout.
			 * @example 
			 * instance.proteinMouseOut(
			 *    function( objEvent ) {
			 *       alert("The mouse is out the protein " + objEvent.protein.id);
			 *    }
			 * ); 
			 * 
			 * */
			"proteinMouseOut",
			/**
			 * @name Biojs.InteractionsD3#interactionClick
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been clicked.
			 * @example 
			 * instance.interactionClick(
			 *    function( objEvent ) {
			 *       alert("Click on the interaction " + objEvent.interaction.source.id +" - "+ objEvent.interaction.target.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionClick",
			/**
			 * @name Biojs.InteractionsD3#interactionMouseOver
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been mouseover.
			 * @example 
			 * instance.interactionMouseOver(
			 *    function( objEvent ) {
			 *       alert("The mouse is over the interaction " + objEvent.interaction.source.id +" - "+ objEvent.interaction.target.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionMouseOver",
			/**
			 * @name Biojs.InteractionsD3#interactionMouseOut
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer leave an interaction
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been mouseout.
			 * @example 
			 * instance.interactionMouseOut(
			 *    function( objEvent ) {
			 *      alert("The mouse is out of the interaction " + objEvent.interaction.source.id +" - "+ objEvent.interaction.target.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionMouseOut",
			/**
			 * @name Biojs.InteractionsD3#sizeChanged
			 * @event
			 * @param {function} actionPerformed It is triggered when the size of the SVG element has been changed. 
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} width The width of the new size
			 * @eventData {Object} height The height of the new size
			 * @example 
			 * instance.sizeChanged(
			 *    function( objEvent ) {
			 *      alert("The size has changed: ("+objEvent.width+","+objEvent.height+")" );
			 *    }
			 * ); 
			 * 
			 * */
			"sizeChanged"
		], 
		/**
		 * 
		 * allows to resize the SVG element updating the gravity points
		 * @param {string} width value of width to be assign to the SVG
		 * @param {string} height value of height to be assign to the SVG
		 *
		 * @example 
		 * instance.setSize(400,400);
		 * instance.restart();
		 */
		setSize:function(width,height){
			var self =this;
			self.opt.width=width;
			self.opt.height=height;
			d3.select("#"+self.opt.target+" svg")
			    .attr('width', width)
			    .attr('height', height);
			d3.select("#"+self.opt.target+" .frame")
			    .attr('width', width)
			    .attr('height', height);

			self._container.width(width);
			self._container.height(height);
			var numberOfOrganism =Object.keys(self.organisms).length;
			self.foci=[];
			for (var i=0; i<numberOfOrganism; i++){
				self.foci.push({x: (self.opt.width/(numberOfOrganism+1))*(i+1), y:self.opt.height/2});
			}
			if (self.tTranslate!=null) self.redraw(self.tTranslate[0], self.tTranslate[1], self.tScale);
			self.restart();
			self.raiseEvent('sizeChanged', {
				width:width,
				height:height
			});
		},
		/**
		 * Adds an interaction between 2 proteins that are already in the graphic using their IDs
		 * 
		 * @param {string} proteinId1 Id of the first protein in the interaction
		 * @param {string} proteinId2 Id of the second protein in the interaction
		 * @param {Object} [extraAtributes={}] An object containing meta information of the interaction 
		 * 					to be stored in the interaction itself. useful for triggered events
		 *
		 * @example 
		 * instance.addInteraction(Math.floor((Math.random()*15)+1),Math.floor((Math.random()*15)+1) ,{score:Math.random()});
		 * instance.restart();
		 */
		addInteraction: function(proteinId1,proteinId2,extraAtributes) {
			var self=this;

			// Getting the protein with the first id and checking exists in the graphic
			var protein1= self.getProtein(proteinId1);
			if (typeof protein1=="undefined")return false;
			
			// Getting the protein with the second id and checking exists in the graphic
			var protein2= self.getProtein(proteinId2);
			if (typeof protein2=="undefined")return false;
			
			//Checking there is not an interaction between those proteins already in the graphic
			if (typeof self.interactionsA[proteinId1]!="undefined" && self.interactionsA[proteinId1].indexOf(protein2)!=-1)
				return self.interactionsA[proteinId1].indexOf(protein2);
				
			//creating and adding an interaction
			var interaction = {source:protein1,target:protein2};
			//adding any parameters from the object extraAtributes to the interaction object
			if (typeof extraAtributes!="undefined")
				for (var key in extraAtributes)
					interaction[key]=extraAtributes[key];

			var n= self.interactions.push(interaction);
			
			//Saving the interaction in the associative array
			if (typeof self.interactionsA[interaction.source.id] == "undefined")
				self.interactionsA[interaction.source.id]=[interaction.target];
			else
				self.interactionsA[interaction.source.id].push(interaction.target);
			if (typeof self.interactionsA[interaction.target.id] == "undefined")
				self.interactionsA[interaction.target.id]=[interaction.source];
			else
				self.interactionsA[interaction.target.id].push(interaction.source);

			return n;
		},
		/**
		 * Adds a protein to the graphic
		 * 
		 * @param {Object} protein An object containing information of the protein 
		 *
		 * @example 
		 *  instance.addProtein({ "id":"new","name":"new","showLegend":true,"typeLegend":"id","organism":"human"+pid%3,"features":{"f1":"val1","f2":"val2","f3":"val3"}});
		 * instance.restart();
		 */
		addProtein: function(protein) {
			var self=this;
			var n = self.proteins.indexOf(self.proteinsA[protein.id]);
			if (n!=-1)
				return n;
			if (typeof self.fixedProteins[protein.id]=="undefined"){
				protein.x=Math.floor((Math.random()*self.opt.width));
				protein.y=Math.floor((Math.random()*self.opt.width));
			}else{
				protein.x=self.fixedProteins[protein.id][0];
				protein.y=self.fixedProteins[protein.id][1];
				protein.fixed=true;
			}
			if(typeof protein.size == "undefined") protein.size=1;
			n= self.proteins.push(protein);
			self.proteinsA[protein.id]=protein;
			if (typeof self.interactionsA[protein.id] == "undefined")
				self.interactionsA[protein.id]=[];
			if (typeof self.organisms[protein.organism] == 'undefined'){
				var numberOfOrganism =Object.keys(self.organisms).length;
				self.organisms[protein.organism] = numberOfOrganism++;
				self.foci=[];
				for (var i=0; i<numberOfOrganism; i++){
					self.foci.push({x: (self.opt.width/(numberOfOrganism+1))*(i+1), y:self.opt.height/2});
				}
			}
			return n;
		},
		/**
		 * Gets the protein object by its id
		 * 
		 * @param {string} proteinId The id of the protein
		 *  
		 * @return {Object} protein An object containing information of the protein 
		 *
		 * @example 
		 * alert(instance.getProtein('3'));
		 */
		getProtein: function(proteinId) {
			var self=this;
			return self.proteinsA[proteinId];
		},
		/**
		 * Gets the array index of the interaction object by the ids of the interactors
		 * 
		 * @param {string} proteinId1 The id of the first protein interacting
		 * @param {string} proteinId2 The id of the second protein interacting
		 *  
		 * @return {Integer} An int value indicating the index of the interaction in the array this.interactions 
		 *
		 * @example 
		 * alert(instance.getInteractionIndex('3','5'));
		 */
		getInteractionIndex: function(proteinId1,proteinId2){
			var self =this;
			for (var i=0; i<self.interactions.length; i++){
				var sourceId=self.interactions[i].source.id;
				var targetId=self.interactions[i].target.id;
				if ((sourceId==proteinId1 && targetId==proteinId2)||(sourceId==proteinId2 && targetId==proteinId1))
					return i;
			}
			return null;
		},
		/**
		 * gets the interaction object by the id of its proteins
		 * 
		 * @param {string} proteinId1 The id of the first protein
		 * @param {string} proteinId2 The id of the second protein
		 *  
		 * @return {Object} An object containing information of the interaction 
		 *
		 * @example 
		 * alert(instance.getInteraction('1','3'));
		 */
		getInteraction: function(proteinId1,proteinId2){
			var self =this;
			return self.getInteractionIndex(proteinId1,proteinId2);
		},
		/**
		 * Removes from the graphic the interaction by the id of its proteins
		 * 
		 * @param {string} proteinId1 The id of the first protein
		 * @param {string} proteinId2 The id of the second protein
		 *  
		 * @example 
		 * instance.removeInteraction('2','3');
		 */
		removeInteraction: function(proteinId1,proteinId2){
			var self = this;
			var intIndex = self.getInteractionIndex(proteinId1,proteinId2);
			self.interactions.splice(intIndex--, 1);
			
			var p1=self.getProtein(proteinId1),
				p2=self.getProtein(proteinId2);
			
			intIndex = self.interactionsA[proteinId1].indexOf(p2);
			if (intIndex!=-1) self.interactionsA[proteinId1].splice(intIndex--, 1);

			intIndex = self.interactionsA[proteinId2].indexOf(p1);
			if (intIndex!=-1) self.interactionsA[proteinId2].splice(intIndex--, 1);
		},
		/**
		 * removes a protein from the graphic with all the interactions unless the interactor 
		 * is also interacting with another protein that is visible. 
		 * 
		 * @param {string} proteinId The id of the protein to delete
		 *  
		 * @example 
		 * instance.removeProtein('2');
		 */
		removeProtein: function(proteinId, excludelist){
			var self=this;
			excludelist = (typeof excludelist == "undefined")?[]:excludelist;

			if (typeof self.interactionsA[proteinId] != "undefined"){
				for (var i=0;i<self.interactionsA[proteinId].length;i++){
					var targetid=self.interactionsA[proteinId][i].id;
					if (excludelist.indexOf(targetid) == -1){
						self.removeInteraction(proteinId,targetid);
						i--;
						if (self.interactionsA[targetid].length==0)
							self.removeProtein(targetid);
					}
				}
				if (self.interactionsA[proteinId].length==0){
					delete self.interactionsA[proteinId];
					for(var i=0; i<self.proteins.length; i++) {
						if(self.proteins[i].id == proteinId) {
							self.proteins.splice(i, 1);
							break;
						}
					}
					delete self.proteinsA[proteinId];
				}else{
					self.proteinsA[proteinId].fixed=false;
				}
			}
		},
		/**
		 * 
		 * Resets the graphic to zero proteins - zero interactions
		 * 
		 * @example 
		 * instance.resetGraphic();
		 */
		resetGraphic: function(){
			var self=this;
			self.proteins=[];
			self.proteinsA={};
			self.interactions=[];
			self.restart();
		},
		_figuresOrder:[0,3,2,5,4,1],
		/**
		 * Restart the graphic to materialize the changes done on it(e.g. add/remove proteins)
		 * It is here where the SVG elemnts are created.
		 * 
		 * @example 
		 * instance.restart();
		 */
		restart: function(){
			var self = this;
			
			self.force
			    .nodes(self.proteins)
			    .links(self.interactions)
				.charge(-self.opt.radius*(3+self.proteins.length))
				.linkDistance(self.opt.radius*(3+self.proteins.length*0.05)).start();

			var link =self.vis.selectAll(".graphNetwork line.link")
				.data(self.interactions, function(d) { return d.source.id + "-" + d.target.id; });
			
			link.enter().insert("line" , ".node") //insert before the .node so lines won't hide the nodes
				.attr("class", "link")
				.attr("id", function(d) { return "link_"+d.source.id+"_"+d.target.id; })
				.on("mouseover", function(d){ 
					self.raiseEvent('interactionMouseOver', {
						interaction: d
					});
				})
				.on("mouseout",  function(d){ 
					self.raiseEvent('interactionMouseOut', {
						interaction: d
					});
				})
				.on("click", function(d){ 
					self.raiseEvent('interactionClick', {
						interaction: d
					});
				})
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
			
			link.exit().remove();
	
			var nodes= self.vis.selectAll(".graphNetwork .node")
				.data(self.proteins, function(d) { return d.id;});
			
			var node=nodes
				.enter().append("g")
				.attr("class", "node")
				.attr("id", function(d) { return "node_"+d.id; })
				.attr("organism", function(d) { return d.organism; })
				.call(self.node_drag);
			
			node.append("path")
				.attr("class", "figure")
				.attr("d", d3.svg.symbol()
						.size(function(d) {
							return (2*self.opt.radius)*(2*self.opt.radius)*d.size*d.size;
						})
						.type(function(d) {
							return d3.svg.symbolTypes[self._figuresOrder[self.organisms[d.organism]]];
						})
					)
				.attr("id", function(d) { return "figure_"+d.id; })
				.on("click", function(d){ 
					self.raiseEvent('proteinClick', {
						protein: d
					});
				})
				.on("mouseover", function(d){ 
					self.raiseEvent('proteinMouseOver', {
						protein: d
					});
				})
				.on("mouseout",  function(d){ 
					self.raiseEvent('proteinMouseOut', {
						protein: d
					});
				})
				.attr("stroke-width",self.opt.radius*0.3);
			

			node
				.append("svg:text")
				.attr("class", "legend")
				.attr("id", function(d) { return "legend_"+d.id; })
				.text(function(d) { 
					if (d.typeLegend=="id") 
						return d.id;
					else if (d.typeLegend.indexOf("features.")==0)
						return d.features[d.typeLegend.substr(9)];
					else
						return d[d.typeLegend];
					})
				.attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";})
				.attr("transform",function(d) {
					return (self.organisms[d.organism] == 0)?"translate(-"+(self.opt.radius*1.9)+","+(self.opt.radius*0.4)+")":"translate(-"+(self.opt.radius*0.9)+","+(self.opt.radius*1.3)+")";
				});

			nodes.exit().remove();
			
			self.perspective.selectAll(".legendBlock").remove();
			if (typeof self.legends!="undefined" && self.legends!=null)
				self._paintLegends();
		},
		_sortLegends:function(){
			var self = this;
			self.legends.sort(function(a,b){
				if (a[1]==b[1]){
					if (a[0]=="label") return -1;
					if (b[0]=="label") return 1;
				}else if (a[1]>b[1]){
					return -1;
				}else
					return 1;
				return 0;
			});
		},
		_paintLegend:function(legend,type){
			var self = this;
			legend.filter(function(d) { return d[0]== "label" && d[1]==type; }).append("text")
				.attr("x", self.opt.width - 6)
				.attr("y", 7)
				.attr("dy", ".35em")
				.style("text-anchor", "end")
				.style("font-size", "1.2em")
				.text(type+":");
			if (type.indexOf("Resize By")==0){

				legend.filter(function(d) { return d[0]!="label" && d[1]==type; }).append("path")
					.attr("class", "figure")
					.attr("d", function(d) {
							var h=2*self.opt.radius*Math.sqrt(d[0][2]);
							return "M0,0L0,10M0,5L"+h+",5M"+h+",0L"+h+",10 ";
					})
					.attr("transform", function(d) { 
						return "translate(" +  (self.opt.width - 18 - 2*self.opt.radius*Math.sqrt(d[0][2])) + "," +  0 + ")"; 
					})
					.style("fill", "transparent")
					.style("stroke", "black");
				legend.filter(function(d) { return d[0]!="label" && d[1]== type; }).append("text")
					.attr("x", function(d) { 
						return (self.opt.width - 22 - 5*self.opt.radius); 
					})
					.attr("y", 7)
					.attr("dy", ".35em")
					.style("text-anchor", "end")
					.text(function(d) { return (d[0][1]*1.0).toFixed(2); });
				
			}else{
				legend.filter(function(d) { return d[0]!="label" && d[1]==type; }).append("rect")
					.attr("x", self.opt.width - 18) 
					.attr("width", 13)
					.attr("height", 13)
					.style("fill", function(d,i) {
						if (typeof d[2]== "undefined")
							return self.color(i);
						return d[2];
					});
				legend.filter(function(d) { return d[0]!="label" && d[1]== type; }).append("text")
					.attr("x", self.opt.width - 24)
					.attr("y", 7)
					.attr("dy", ".35em")
					.style("text-anchor", "end")
					.text(function(d) { return d[0]; });
			}
		},
		_paintLegends: function(){
			var self = this;
			var w=18 + self.longestLegend*7 + 10;
			var legendBlock = self.perspective.insert("g",".link")
				.attr("class", "legendBlock");
			self._sortLegends();
			legendBlock.append("rect")
				.attr("x", self.opt.width -w)
				.attr("height", 6 + self.legends.length *16)
				.attr("width", w)
				.style("fill", "#ddd")
				.style("fill-opacity","0.4");

			var legend = legendBlock.selectAll(".mainLegend") 
				.data(self.legends)
				.enter().insert("g")
				.attr("class", "mainLegend")
				.attr("transform", function(d, i) { 
					return "translate(0," + (3 + i * 16) + ")"; 
				});
			for (var i=0; i< self.legendTypes.length; i++)
				self._paintLegend(legend,self.legendTypes[i]);

		},
		longestLegend:4,
		legendTypes:[],
		/**
		 * Adds a legend to the graphic
		 * 
		 * @example 						
		 * instance.addLegends(["Legend red"],"Color","#FF0000");
		 * instance.restart();
		 */
		addLegends:function(legends,type,color){
			var self = this;
			if (self.legends==null) self.legends=[],self.legendTypes=[];
			
			if (legends==null) {
				self.legends = null;
				self.legendTypes=[];
				self.longestLegend=4;
				return;
			}
			if (type=="Resize By") 
				type = type+ " "+legends[0];
			if (self.legendTypes.indexOf(type)==-1) {
				self.legends.push(["label",type]);
				self.legendTypes.push(type);
				if (type.length>self.longestLegend)
					self.longestLegend=type.length;
			}
			
			if (type.indexOf("Resize By")==0){ //is a size label
				self.legends.push([legends,type]);
			} else //is a color label
				for (var i=0;i<legends.length;i++){
					if (typeof color=="undefined")
						self.legends.push([legends[i],type]);
					else
						self.legends.push([legends[i],type,color]);
					
					if (legends[i].length>self.longestLegend)
						self.longestLegend=legends[i].length;
				}
		},
		/**
		 * Hides the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.hide("[id = node_10]");
		 */
		hide: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'hidden');
			self.vis.selectAll(selector).selectAll(" .legend").attr("visibility", 'hidden');
		},
		/**
		 * Shows the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.show("[id = node_10]");
		 */
		show: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'visible');
			self.vis.selectAll(selector).selectAll(" .legend").attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";});
		},
		/**
		 * Highlight the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.highlight("[id *= node_1]");
		 */
		highlight: function(selector){
			var self=this;
			self.vis.selectAll(selector).style("stroke", '#3d6');
		},
		/**
		 * Set the fill's color of the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 * @param {string} color a color in web format eg. #FF0000
		 *  
		 * @example 
		 * instance.setFillColor(".figure","#FF0000");
		 */
		setFillColor: function(selector,color){
			var self=this;
			self.vis.selectAll(selector).style("fill", color);
		},
		/**
		 * Set the stroke's color of the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 * @param {string} color a color in web format eg. #FF0000
		 *  
		 * @example 
		 * instance.setColor("[id *= node_2]","#FF0000");
		 */
		setColor: function(selector,color){
			var self=this;
			self.vis.selectAll(selector).style("stroke", color);
		},
		/**
		 * If the protein has a fixed position in the graphic it gets released, or viceversa other wise
		 * 
		 * @param {string} protein the id of the protein to swap is position on the graphic
		 *  
		 * @example 
		 * instance.swapFixed("3");
		 */
		swapFixed: function(protein){
			var self=this;
			var nodes=self.force.nodes();
			nodes.forEach(function(d, i) {
			  if (d.id==protein)
				  d.fixed = !d.fixed;
			});
		},
		/**
		 * Shows the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node_5 .legend");
		 */
		showLegend: function(selector,typeLegend){
			var self=this;
			self.vis.selectAll(selector).selectAll(".legend").attr("visibility", "visible").text(function(d) {
				d.typeLegend=typeLegend;
				if (d.typeLegend=="id") 
					return d.id;
				else //if (d.typeLegend.indexOf("features.")==0)
					return d.features[d.typeLegend];
//				else
//					return d[d.typeLegend];
				});
//			self.restart();
		}, 
		/**
		 * Scales the area of a protein
		 * 
		 * @param {string} protein the id of the protein to scale
		 * @param {integer} scale value to scale a node
		 *  
		 * @example 
		 * instance.setSizeScale("#figure_1",4);
		 */
		setSizeScale: function(selector,scale){
			var self=this;
			self.vis.selectAll(selector).attr("d", d3.svg.symbol()
					.size(function(d) {
						d.size=scale;
						return (2*self.opt.radius)*(2*self.opt.radius)*scale;
					})
					.type(function(d) {
						return d3.svg.symbolTypes[self._figuresOrder[self.organisms[d.organism]]];
					})
				);
		}, 
		/**
		 * Scales the size of the proteins which value has been modify by other means
		 * 
		 * @param {string} selector a CSS3 selector to choose the nodes to resize
		 *  
		 * @example 
		 * for (var i=0;i<instance.proteins.length;i++)
		 * 	instance.proteins[i].size=1+i%4;
		 * instance.refreshSizeScale(".figure");
		 */
		refreshSizeScale: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("d", d3.svg.symbol()
					.size(function(d) {
						return (2*self.opt.radius)*(2*self.opt.radius)*d.size;
					})
					.type(function(d) {
						return d3.svg.symbolTypes[self._figuresOrder[self.organisms[d.organism]]];
					})
				);
		}, 
		/**
		 * Hide the legend(id) of the protein
		 * 
		 * @param {string} selector a CSS3 selector to choose the nodes to hide its legend
		 *  
		 * @example 
		 * instance.hideLegend("#node_5 .legend");
		 */
		hideLegend: function(selector){
			var self=this;
			self.vis.selectAll(selector).selectAll(".legend").attr("visibility", "hidden");
		},
		/**
		 * Shows/Hide the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node_5 .legend");
		 */
		swapShowLegend: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", function(d) {
				d.showLegend = !d.showLegend;
				return (d.showLegend)?"visible":"hidden";
			});
		},
		/**
		 * gets an array of objects with the list of proteins which poition has been fixed into the graphic
		 * 
		 * @example 
		 * alert(instance.getFixedProteins());
		 */
		getFixedProteins:function(){
			var self = this;
			var prots=[];
			for (var prot in self.proteinsA){
				if (self.proteinsA[prot].fixed){
					prots.push({
						"protein":prot,
						"x":self.proteinsA[prot].x,
						"y":self.proteinsA[prot].y });
				}
			}
			return prots;
		},
		fixedProteins:{},
		/**
		 * fix into the graphic a protein in a determined position
		 * 
		 * @example 
		 * instance.fixProteinAt("7",10,10);
		 * instance.restart();
		 */
		fixProteinAt:function(protein,x,y){
			var self = this;
			if (typeof self.proteinsA[protein] == "undefined") {
				self.fixedProteins[protein]=[x,y];
				return;
			}
			self.proteinsA[protein].x=x;
			self.proteinsA[protein].y=y;
			self.proteinsA[protein].px=x;
			self.proteinsA[protein].py=y;
			self.proteinsA[protein].fixed=true;
		//	self.tick();
		},

		colors: [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", 
		          "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
		          '#3399FF', '#99FF66', '#66FF99', '#CCFF00', '#6699CC', '#99CC00', '#99FFCC', '#993399', '#33FFFF', '#33CC33', 
		         '#66CCFF', '#009999', '#00FFFF', '#CC66CC', '#FF9966', '#CC3300', '#009966', '#660000', '#99FF33', '#330066', 
		         '#FFFF00', '#0099FF', '#FF6699', '#33FF00', '#FFFFCC', '#990000', '#99CC33', '#0033CC', '#006699', '#6699FF', 
		         '#FFCC00', '#330099', '#999999', '#666633', '#FFCC99', '#00CCCC', '#006633', '#CCCC99', '#3300FF', '#33CC66', 
		         '#339999', '#6666FF', '#33FF66', '#990033', '#33CC99', '#993300', '#00FF00', '#666699', '#00CC00', '#FF66CC', 
		         '#00FFCC', '#FF9999', '#66FF00', '#003366', '#CCFF33', '#660066', '#6633CC', '#FF3366', '#99FF00', '#FF33CC', 
		         '#CCFFCC', '#99CCCC', '#3300CC', '#0066FF', '#66CC33', '#3366CC', '#CCCCCC', '#FF0000', '#6666CC', '#336699', 
		         '#999966', '#FFFF99', '#66CC99', '#FF0033', '#999933', '#CC99FF', '#FF0099', '#6600CC', '#CC9966', '#00CC66', 
		         '#33CC00', '#666666', '#33CCCC', '#FF0066', '#00CC33', '#FFCC66', '#FF6600', '#9999FF', '#CC66FF', '#9933FF', 
		         '#FF00CC', '#CC3399', '#CC6633', '#33FFCC', '#FF33FF', '#009900', '#660099', '#669999', '#CC3366', '#0099CC', 
		         '#9900FF', '#669933', '#FFFFFF', '#CCCCFF', '#66CCCC', '#669966', '#0066CC', '#CC9900', '#663300', '#33FF99', 
		         '#996666', '#3399CC', '#99FF99', '#66CC66', '#CC0066', '#CCFF66', '#663366', '#99CC66', '#000033', '#003333', 
		         '#FF6666', '#009933', '#FFFF66', '#996699', '#FFCCCC', '#00CCFF', '#339966', '#3366FF', '#00CC99', '#336633', 
		         '#FF99FF', '#663333', '#CCFF99', '#CC99CC', '#339933', '#33CCFF', '#333366', '#006666', '#CC6600', '#333300', 
		         '#FFCC33', '#9966CC', '#003300', '#9966FF', '#996600', '#CC9933', '#9999CC', '#FF9933', '#006600', '#6633FF', 
		         '#CC6699', '#FF3399', '#993333', '#CCFFFF', '#330033', '#FFCCFF', '#FFFF33', '#990066', '#CCCC66', '#CC0099', 
		         '#CCCC00', '#339900', '#660033', '#FF00FF', '#333333', '#99CC99', '#66FFCC', '#003399', '#999900', '#99FFFF', 
		         '#990099', '#3333FF', '#CC33CC', '#CC6666', '#3333CC', '#9900CC', '#9933CC', '#CC0033', '#CC00FF', '#FF99CC', 
		         '#FF66FF', '#66FFFF', '#6600FF', '#66FF66', '#996633', '#669900', '#00FF99', '#CC9999', '#993366', '#CC33FF', 
		         '#336666', '#0033FF', '#336600', '#CC0000', '#FF9900', '#33FF33', '#000000', '#99CCFF', '#000066', '#0000CC', 
		         '#000099', '#00FF33', '#666600', '#66FF33', '#CCCC33', '#66CC00', '#FF3333', '#CC3333', '#663399', '#333399', 
		         '#FF3300', '#0000FF', '#CC00CC', '#00FF66', '#330000', '#FF6633']

	});




