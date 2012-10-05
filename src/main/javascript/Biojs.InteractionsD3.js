/**
 * This component uses the D3 library and specifically its implementation of the force algorithm to 
 * represent a network of protein interactions.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 0.9.0_alpha
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
 * 
 * @example
 * 			var instance = new Biojs.InteractionsD3({
 * 				target: "YourOwnDivId",
 * 			});	
 * 			var pid=1;
 *			instance.addProtein({id:'p'+pid++,group:1});
 *			instance.addProtein({id:'p'+pid++,group:1});
 *			instance.addProtein({id:'p'+pid++,group:1});
 * 			instance.addInteraction("p"+(pid-1),"p"+(pid-2),{id:"p"+(pid-1)+"_p"+(pid-2),feature1:"value"});
 * 			instance.restart();
 */
Biojs.InteractionsD3 = Biojs.extend (
	/** @lends Biojs.InteractionsD3# */
	{
		force:null,
		vis:null,
		interactions:[],
		interactionsA:[],
		proteins:[],
		proteinsA:[],
		node_drag:null,
		color: null,
		foci: [],
		organisms: {},
		
		constructor: function (options) {
			var self 	= this;
			self.force	=null;
			self.vis	=null;
			self.interactions=[];
			self.interactionsA=[];
			self.proteins=[];
			self.proteinsA=[];
			self.node_drag=null;
			self.color= null;
			self.foci=[];
			self.organisms={};

			this._container = $("#"+self.opt.target);
			this._container.empty();
			$(this._container).addClass("graph");
			
			var	width = $(this._container).width(),
				height = $(this._container).height(),
				r=self.opt.radius;

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
			
			self.color = function() {
			    return d3.scale.ordinal().range(self.colors);
			  }();
			
			self.vis = d3.select("#"+self.opt.target).append("svg")
			    .attr("width", width)
			    .attr("height", height)
			    .attr("pointer-events", "all")
			    .append('svg:g')
			    .call(d3.behavior.zoom().on("zoom", redraw)).append('svg:g');
			
			self.vis.append('svg:rect')
			    .attr('width', width)
			    .attr('height', height)
			    .attr('fill', 'white')
			    .attr('stroke','grey')
			    .attr("stroke-dasharray","5,5");

			function redraw() {
				  trans=d3.event.translate;
				  scale=d3.event.scale;
				  self.vis.attr("transform",
				      "translate(" + trans + ")"
				      + " scale(" + scale + ")");
			};
			
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
				self.vis.selectAll("circle.figure")
					.attr("cx", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
					.attr("cy", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
				self.vis.selectAll("rect.figure")
					.attr("x", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
					.attr("y", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
				self.vis.selectAll(".legend")
					.attr("x", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
					.attr("y", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
				self.vis.selectAll("line.link")
					.attr("x1", function(d) { return (self.organisms[d.source.organism]==0)?d.source.x:d.source.x+r; })
					.attr("y1", function(d) { return (self.organisms[d.source.organism]==0)?d.source.y:d.source.y+r; })
					.attr("x2", function(d) { return (self.organisms[d.target.organism]==0)?d.target.x:d.target.x+r; })
					.attr("y2", function(d) { return (self.organisms[d.target.organism]==0)?d.target.y:d.target.y+r; });
			};
			//Binding the _resize method when resizing the window! 
			d3.select(window).on("resize", function(){self._resize(self);});
			
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
			radius: 10
		},

		/**
		 * Array containing the supported event names
		 * @name Biojs.InteractionsD3-eventTypes
		 */
		eventTypes : [
			/**
			 * @name Biojs.InteractionsD3#proteinClick
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} protein the information of the protein that has been clicked.
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
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} protein the information of the protein that has been mouseover.
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
			 * @name Biojs.InteractionsD3#interactionClick
			 * @event
			 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been clicked.
			 * @example 
			 * instance.interactionClick(
			 *    function( objEvent ) {
			 *       alert("Click on the interaction " + objEvent.interaction.id);
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
			 *       alert("The mouse is over the interaction " + objEvent.interaction.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionMouseOver"
		], 

		/**
		 * Adds an interaction between 2 proteins that are already in the graphic using their IDs
		 * 
		 * @param {string} proteinId1 Id of the first protein in the interaction
		 * @param {string} proteinId2 Id of the second protein in the interaction
		 * @param {Object} [extraAtributes={}] An object containing meta information of the interaction 
		 * 					to be stored in the interaction itself. useful for triggered events
		 *
		 * @example 
		 * instance.addInteraction("p"+(pid-1),"p"+(pid-2),{id:"p"+(pid-1)+"_p"+(pid-2),feature1:"new"});
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
		 * instance.addProtein({id:'p'+pid++,group:2});
		 * instance.restart();
		 */
		addProtein: function(protein) {
			var self=this;
			var n = self.proteins.indexOf(self.proteinsA[protein.id]);
			if (n!=-1)
				return n;
			n= self.proteins.push(protein);
			self.proteinsA[protein.id]=protein;
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
		 * gets the protein object by its id
		 * 
		 * @param {string} proteinId The id of the protein
		 *  
		 * @return {Object} protein An object containing information of the protein 
		 *
		 * @example 
		 * instance.getProtein('p3');
		 */
		getProtein: function(proteinId) {
			var self=this;
			return self.proteinsA[proteinId];
		},
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
		 * instance.getInteraction('p1','p3');
		 */
		getInteraction: function(proteinId1,proteinId2){
			var self =this;
			return self.getInteractionIndex(proteinId1,proteinId2);
		},
		/**
		 * removes from the graphic the interaction by the id of its proteins
		 * 
		 * @param {string} proteinId1 The id of the first protein
		 * @param {string} proteinId2 The id of the second protein
		 *  
		 * @example 
		 * instance.removeInteraction('p2','p3');
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
		 * instance.removeProtein('p2');
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
		},
		/**
		 * 
		 * Resets the graphic to zero proteins zero interactions
		 * 
		 *  
		 * @example 
		 * instance.resetGraphic();
		 */
		resetGraphic: function(){
			var self=this;
			self.proteins=[];
			self.proteinsA=[];
			self.interactions=[];
			self.restart();
		},
		/**
		 * Restart the graphic to materialize the changes don on it(e.g. add/remove proteins)
		 * 
		 * @example 
		 * instance.restart();
		 * 
		 */
		restart: function(){
			var self = this;
			
			self.force
			    .nodes(self.proteins)
			    .links(self.interactions)
				.charge(-self.opt.radius*20)
				.linkDistance(self.opt.radius*5).start();

			var link =self.vis.selectAll("line.link")
				.data(self.interactions, function(d) { return d.source.id + "-" + d.target.id; });
			
			link.enter().insert("line" , ".node") //insert before the .node so lines won't hide the nodes
				.attr("class", "link")
				.attr("id", function(d) { return "link_"+d.source.id+"_"+d.target.id; })
				.on("mouseover", function(d){ 
					self.raiseEvent('interactionMouseOver', {
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
	
			var nodes= self.vis.selectAll(".node")
				.data(self.proteins, function(d) { return d.id;});
			
			var node=nodes
				.enter().append("g")
				.attr("class", "node")
				.attr("id", function(d) { return "node_"+d.id; })
				.attr("organism", function(d) { return d.organism; })
				.call(self.node_drag);
			
			node.filter(function(d) { return self.organisms[d.organism] == 1; }).append("rect")
				.attr("class", "figure")
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
				.attr("width", self.opt.radius*2)
				.attr("height", self.opt.radius*2)
				.attr("stroke-width",self.opt.radius*0.3);
//				.style("fill", function(d) {       	
//					return self.color(d.group);   
//				});
			
			node.filter(function(d) { return self.organisms[d.organism] == 0; }).append("circle")
				.attr("class", "figure")
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
				.attr("r", self.opt.radius)
				.attr("stroke-width",self.opt.radius*0.3);
//				.style("fill", function(d) {       	
//					return self.color(d.group);   
//				});
				
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
				.attr("stroke","#901")
				.style("font-size", self.opt.radius+"px")
				.attr("stroke-width","0")
				.attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";})
				.attr("transform",function(d) {
					return (self.organisms[d.organism] == 0)?"translate(-"+(self.opt.radius*1.9)+","+(self.opt.radius*0.4)+")":"translate(-"+(self.opt.radius*0.9)+","+(self.opt.radius*1.3)+")";
				});

			nodes.exit().remove();
		    
		},
		/**
		 * Hides the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.hide("[id = node_p"+(pid-1)+"]");
		 */
		hide: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'hidden');
			self.vis.selectAll(selector+" .legend").attr("visibility", 'hidden');
		},
		/**
		 * Shows the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.show("[id = node_p"+(pid-1)+"]");
		 */
		show: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'visible');
			self.vis.selectAll(selector+" .legend").attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";});
		},
		/**
		 * Highlight the elements on the graphic that match the selector. 
		 * Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string 
		 * 
		 * @param {string} selector a string to represent a set of elements. Check the <a href="http://www.w3.org/TR/css3-selectors/">CSS3 selectors documentation</a> to build a selector string
		 *  
		 * @example 
		 * instance.highlight("[id = node_p"+(pid-1)+"]");
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
		 * instance.setFillColor("[id = node_p"+(pid-1)+"]","#FF0000");
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
		 * instance.setColor("[id = node_p"+(pid-1)+"]","#FF0000");
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
		 * instance.swapFixed("p"+(pid-1));
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
		 * Shows/Hide the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node_p"+(pid-1)+" .legend");
		 */
		showLegend: function(selector,typeLegend){
			var self=this;
			self.vis.selectAll(selector).selectAll(".legend").attr("visibility", "visible").text(function(d) {
				d.typeLegend=typeLegend;
				if (d.typeLegend=="id") 
					return d.id;
				else if (d.typeLegend.indexOf("features.")==0)
					return d.features[d.typeLegend.substr(9)];
				else
					return d[d.typeLegend];
				});
//			self.restart();
		}, 
		/**
		 * Shows/Hide the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node_p"+(pid-1)+" .legend");
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
		 * instance.swapShowLegend("#node_p"+(pid-1)+" .legend");
		 */
		swapShowLegend: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", function(d) {
				d.showLegend = !d.showLegend;
				return (d.showLegend)?"visible":"hidden";
			});
		},
		/**
		 * 
		 * Resizing the graph depending on the size of the window.
		 * 
		 * @param self
		 */
		_resize:  function (self) {
			var width = window.innerWidth, height = window.innerHeight;
			self.vis.attr("width", width).attr("height", height);
			self.force.size([width, height]).resume();
		},
		colors: [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
		          "#0077b4", "#11c7e8", "#227f0e", "#33bb78", "#44a02c", "#55df8a", "#662728", "#779896", "#8867bd", "#99b0d5", "#AA564b", "#BB9c94", "#CC77c2", "#DDb6d2", "#EE7f7f", "#FFc7c7", "#00bd22", "#11db8d", "#22becf", "#33dae5",
		          "#1f00b4", "#ae11e8", "#ff220e", "#ff3378", "#2c442c", "#98558a", "#d66628", "#ff7796", "#9488bd", "#c599d5", "#8cAA4b", "#c4BB94", "#e3CCc2", "#f7DDd2", "#7fEE7f", "#c7FFc7", "#bc0022", "#db118d", "#1722cf", "#9e33e5",
		          "#1f7700", "#aec711", "#ff7f22", "#ffbb33", "#2ca044", "#98df55", "#d62766", "#ff9877", "#946788", "#c5b099", "#8c56AA", "#c49cBB", "#e377FC", "#f7b6FD", "#7f7fEE", "#c7c7FF", "#bcbd00", "#dbdb11", "#17be22", "#9eda33"
		          ]
	});







