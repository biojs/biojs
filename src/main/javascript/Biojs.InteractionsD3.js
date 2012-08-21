
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

			this._container = $("#"+self.opt.target);
			this._container.empty();
			$(this._container).addClass("graph");
			
			var width = $(this._container).width(),
				height = 500,
				r=6;
			self.color= d3.scale.category20();
			
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
			    .distance(30)
			    .nodes(self.proteins)
			    .links(self.interactions)
				.charge(-40)
				.linkDistance(20)
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
				tick(); // this is the key to make it work together with updating both px,py,x,y on d !
			}

			function dragend(d, i) {
				d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
				tick();
				self.force.resume();
			}
			
			self.force.on("tick", tick);
			function tick() {
				self.vis.selectAll(".figure")
					.attr("cx", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
					.attr("cy", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
				self.vis.selectAll(".legend")
					.attr("x", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
					.attr("y", function(d) { return d.y = Math.max(r, Math.min(height - r, d.y)); });
				self.vis.selectAll("line.link")
					.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });
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
			"proteinMouseOver",
			"interactionMouseOver"
		], 

		/**
		 * Change the font size. Do nothing it no value is provided.
		 * 
		 * @param {string} [size] The new font size in pixels.
		 *
		 * @example 
		 * instance.setSize("72px");
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
		addProtein: function(protein) {
			var self=this;
			var n = self.proteins.indexOf(self.proteinsA[protein.id]);
			if (n!=-1)
				return n;
			n= self.proteins.push(protein);
			self.proteinsA[protein.id]=protein;
			return n;
		},
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
		getInteraction: function(proteinId1,proteinId2){
			var self =this;
			return self.getInteractionIndex(proteinId1,proteinId2);
		},
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
		removeFreeInteractionsFromProtein: function(proteinId,removeProteins){
			var self=this;
			removeProteins = (typeof removeProteins == "undefined")?true:removeProteins;
			if (typeof self.interactionsA[proteinId] == "undefined"){
				if (removeProteins) self.removeProtein(proteinId);
				return;
			}
			
			if (removeProteins){
				for (var i=0;i<self.interactionsA[proteinId].length;i++){
					var target = self.interactionsA[proteinId][i];
					if (self.interactionsA[target.id].length<2){
						self.removeInteraction(proteinId,target.id);
						i--;
						self.removeProtein(target.id);
					}
				}
				if(self.interactionsA[proteinId].length==0)
					self.removeProtein(proteinId);
			}
		},
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
		resetGraphic: function(){
			var self=this;
			self.proteins=[];
			self.proteinsA=[];
			self.interactions=[];
			self.restart();
		},
		restart: function(){
			var self = this;
			
			self.force
			    .distance(30)
			    .nodes(self.proteins)
			    .links(self.interactions)
				.charge(-40)
				.linkDistance(20).start();

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
				.call(self.node_drag);
			
			node.append("circle")
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
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })
				.attr("r", 4.5)
				.style("fill", function(d) {       	
					return self.color(d.group);   
				});
			
			node
				.append("svg:text")
				.attr("class", "legend")
				.attr("id", function(d) { return "legend_"+d.id; })
				.text(function(d) { return d.id; })
				.attr("stroke","#901")
				.attr("stroke-width","0")
				.attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";})
				.attr("transform","translate(5,4)");

			nodes.exit().remove();
		    
		},
		hide: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'hidden');
			self.vis.selectAll(selector+" .legend").attr("visibility", 'hidden');
		},
		show: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("visibility", 'visible');
			self.vis.selectAll(selector+" .legend").attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";});
		},
		highlight: function(selector){
			var self=this;
			self.vis.selectAll(selector).style("stroke", '#3d6');
		},
		setColor: function(selector,color){
			var self=this;
			self.vis.selectAll(selector).style("stroke", color);
		},
		swapFixed: function(protein){
			var self=this;
			var nodes=self.force.nodes();
			nodes.forEach(function(d, i) {
			  if (d.id==protein)
				  d.fixed = !d.fixed;
			});
		},
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
		}
	});







