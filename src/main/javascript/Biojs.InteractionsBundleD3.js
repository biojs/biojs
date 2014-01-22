/**
 * This component uses the D3 library and specifically its implementation of the bundle algorithm to 
 * represent a network of protein interactions.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 0.9.0_alpha
 * @category 1
 * 
 * @requires <a href='http://code.jquery.com/query-1.7.2.min.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://d3js.org/'>D3</a>
 * @dependency <script src="http://d3js.org/d3.v2.min.js" type="text/javascript"></script>
 *
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.interactionsBundleD3.css'>InteractionsD3 CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.InteractionsBundleD3.css" />
 * 
 * @param {Object} options An object with the options for the InteractionsD3 component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 * @option {string} width
 *    Width of the SVG element, if given in percentage, it will use it on proportion of the container 
 * @option {string} height
 *    Height of the SVG element, if given in percentage, it will use it on proportion of the container 
 * @option {string} radius
 *    Radius of the nodes representing the proteins
 * @option {string} textLength
 *    Space in pixels to be reserved for the labels around the circle 
 * 
 * @example
 * 			var instance = new Biojs.InteractionsBundleD3({
 * 				target: "YourOwnDivId",
 * 			});	
 * 			var pid=1;
 * 			for (var i=0;i<100;i++)
 *				instance.addProtein({id:'p'+pid++,group:1,organism:"human"});
 * 			for (var i=0;i<100;i++)
 *				instance.addProtein({id:'p'+pid++,group:1,organism:"TB"});
 * 			for (var i=1;i<200;i++){
 *	 			instance.addInteraction("p"+(i),"p"+(100+i),{id:"p"+(i)+"_p"+(100+i),feature1:"value"});
 *				instance.addInteraction("p"+(i),"p"+(i%17),{id:"p"+(i)+"_p"+(i%17),feature1:"value"});
 *			}
 * 			instance.restart();
 */
Biojs.InteractionsBundleD3 = Biojs.extend (
	/** @lends Biojs.InteractionsBundleD3# */
	{
		cluster:null,
		bundle:null,
		vis:null,
		splines:[],
		model:{},
		organisms:{},
		proteins:[],
		interactions:[],
		interactionsA:{},
		svg:null,
		
		//Transformation values
		tTranslate:null,
		tScale:null,
		
		constructor: function (options) {
			var self 	= this;
			self.cluster=null;
			self.bundle=null;
			self.vis=null;
			self.splines=[];
			self.model={"name":"", "children":[] };
			self.organisms={};
			self.proteins=[];
			self.interactions=[];
			self.svg=null;
			self.interactionsA={};
			
			this._container = $("#"+self.opt.target);
			this._container.empty();
			$(this._container).addClass("graphCircle");

			var	w = $(this._container).width(),
			h = $(this._container).height();

			w = (self.opt.width.indexOf("%")!=-1)?w*(self.opt.width.substring(0, self.opt.width.length-1)*1)/100.0:self.opt.width*1;
			self.opt.width=w;
		
			h = (self.opt.height.indexOf("%")!=-1)?h*(self.opt.height.substring(0, self.opt.height.length-1)*1)/100.0:self.opt.height*1;
			self.opt.height=h;

			var rx = w / 2,
		    	ry = h / 2;
		    
		    var tmpR=(rx<ry)?rx:ry;
			self.cluster = d3.layout.cluster()
				.size([360, tmpR-self.opt.textLength] )
				.sort(function(a, b) { return d3.ascending(a.key, b.key); });

			self.bundle = d3.layout.bundle();
			self.line = d3.svg.line.radial()
			    .interpolate("bundle")
			    .tension(.45)
			    .radius(function(d) { return d.y; })
			    .angle(function(d) { return d.x / 180 * Math.PI; });

			this._container.width(w);
			this._container.height(h);

			self.color = function() {
			    return d3.scale.ordinal().range(self.colors);
			  }();
			
			self.vis = d3.select("#"+self.opt.target).insert("div", "h2")
			    .style("width", w + "px")
			    .style("height", h + "px");

			self.zoom=d3.behavior.zoom().
	    		scaleExtent([1, 10])
	    		.on("zoom", redraw);
			self.svg=self.vis.append('svg:svg')
				    .attr("width", w)
				    .attr("height", h)
				    .append("svg:g")
				    	.attr("id", "innergroup")
				    	.attr("transform", "translate(" + rx + "," + ry + ")")
				    .attr("pointer-events", "all")
				    .call(self.zoom)
				    .append('svg:g');
		
			self.rect=self.svg.append('svg:rect')
				.attr("class", "frame")
			    .attr('width', w)
			    .attr('height', h)
			    .attr('fill', 'white')
			    .attr('stroke','grey')
		    	.attr("transform", "translate(-" + rx + ", -" + ry + ")")
			    .attr("stroke-dasharray","5,5");
			
			self.svg.append("svg:path")
			    .attr("class", "arc")
			    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI));

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
				  var W = self.rect[0][0].width.animVal.value, H= self.rect[0][0].height.animVal.value;
				  var Ws = W*scale, Hs = H*scale;
				  if (Ws/2<W/2+trans[0]) trans[0]=(Ws-W)/2;
				  if (Hs/2<H/2+trans[1]) trans[1]=(Hs-H)/2;
				  if (Ws/2<W/2-trans[0]) trans[0]=(W-Ws)/2;
				  if (Hs/2<H/2-trans[1]) trans[1]=(H-Hs)/2;
				  self.svg.attr("transform",
				      "translate(" + trans + ")"
				      + " scale(" + scale + ")");
			};
			self.redraw=redraw;
		    
			self.restart();
		},
		/**
		 *  Default values for the options
		 *  @name Biojs.InteractionsBundleD3-opt
		 */
		opt: {
			target: "YourOwnDivId",
			width: "100%",
			height: "500", 
			radius: 4,
			textLength: 120
		},

		/**
		 * Array containing the supported event names
		 * @name Biojs.InteractionsBundleD3-eventTypes
		 */
		eventTypes : [
			/**
			 * @name Biojs.InteractionsBundleD3#proteinClick
			 * @event
			 * @param {function} actionPerformed It is triggered when the user clicks on a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been clicked.
			 * @example 
			 * instance.proteinClick(
			 *    function( objEvent ) {
			 *      instance.swapShowLegend("#node-" + objEvent.protein.key + " .legend",'#FF0000');
			 *      alert("The protein " + objEvent.protein.id + " was clicked.");
			 *    }
			 * ); 
			 * 
			 * */
			"proteinClick",
			/**
			 * @name Biojs.InteractionsBundleD3#proteinMouseOver
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer is over a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been mouseover.
			 * @example 
			 * instance.proteinMouseOver(
			 *    function( objEvent ) {
			 *      instance.highlight("path.link.target-" + objEvent.protein.key);
			 *      instance.highlight("path.link.target-" + objEvent.protein.key);
			 *      instance.setColor("#node-" + objEvent.protein.key,'#0f0');
			 *      alert("The mouse is over of the protein " + objEvent.protein.id);
			 *    }
			 * ); 
			 * 
			 * */
			"proteinMouseOver",
			/**
			 * @name Biojs.InteractionsBundleD3#proteinMouseOut
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer leave the area of a protein
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.protein the information of the protein that has been mouseout.
			 * @example 
			 * instance.proteinMouseOut(
			 *    function( objEvent ) {
			 *      instance.setColor("#node-" + objEvent.protein.key,'');
			 *      instance.setColor("path.link.target-" + objEvent.protein.key,"");
			 *      instance.setColor("path.link.target-" + objEvent.protein.key,"");
			 *      alert("The mouse is out the protein " + objEvent.protein.id);
			 *    }
			 * ); 
			 * 
			 * */
			"proteinMouseOut",
			/**
			 * @name Biojs.InteractionsBundleD3#interactionClick
			 * @event
			 * @param {function} actionPerformed It is triggered when the user clicks over an interaction path
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} objEvent.source The component which did triggered the event.
			 * @eventData {Object} objEvent.interaction the information of the interaction that has been clicked.
			 * @example 
			 * instance.interactionClick(
			 *    function( objEvent ) {
			 *      instance.swapShowLegend("#node-" + objEvent.interaction.source.key + " .legend",'#FF0000');
			 *      instance.swapShowLegend("#node-" + objEvent.interaction.target.key + " .legend",'#FF0000');
			 *      alert("Click on the interaction " + objEvent.interaction.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionClick",
			/**
			 * @name Biojs.InteractionsBundleD3#interactionMouseOver
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer is over an interaction
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been mouseover.
			 * @example 
			 * instance.interactionMouseOver(
			 *    function( objEvent ) {
			 *      instance.highlight("#link-" + objEvent.interaction.source.key +"-"+ objEvent.interaction.target.key);
			 *      instance.highlight("#link-" + objEvent.interaction.target.key +"-"+ objEvent.interaction.source.key );
			 *      instance.setColor("#node-" + objEvent.interaction.source.key,'#0f0');
			 *      instance.setColor("#node-" + objEvent.interaction.target.key,'#0f0');
			 *      alert("The mouse is over the interaction " + objEvent.interaction.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionMouseOver",
			/**
			 * @name Biojs.InteractionsBundleD3#interactionMouseOut
			 * @event
			 * @param {function} actionPerformed It is triggered when the mouse pointer leave an interaction
			 * @eventData {@link Biojs.Event} objEvent Object containing the information of the event
			 * @eventData {Object} source The component which did triggered the event.
			 * @eventData {Object} interaction the information of the interaction that has been mouseout.
			 * @example 
			 * instance.interactionMouseOut(
			 *    function( objEvent ) {
			 *      instance.setColor("#link-" + objEvent.interaction.source.key +"-"+ objEvent.interaction.target.key,"");
			 *      instance.setColor("#link-" + objEvent.interaction.target.key +"-"+ objEvent.interaction.source.key,"");
			 *      instance.setColor("#node-" + objEvent.interaction.source.key,'');
			 *      instance.setColor("#node-" + objEvent.interaction.target.key,'');
			 *      alert("The mouse is out of the interaction " + objEvent.interaction.id);
			 *    }
			 * ); 
			 * 
			 * */
			"interactionMouseOut",
			/**
			 * @name Biojs.InteractionsBundleD3#sizeChanged
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
			    .attr('height', height)
				.attr("transform", "translate(-" + self.opt.width/2 + ",-" + self.opt.height/2 + ")");
			self._container.width(width);
			self._container.height(height);
			var radious=self.opt.height;
			if (radious<self.opt.width) radious=self.opt.width;
			self.cluster.size([360, radious/2 - self.opt.textLength] );
			d3.select("#innergroup")
	    		.attr("transform", "translate(" + self.opt.width/2 + "," + self.opt.height/2 + ")");
	    			
			self.svg.selectAll("path.link").remove();
			self.svg.selectAll("g.node").remove();
			self.svg.selectAll("circle.figure").remove();
			
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
		 * 
		 * for (var i=1;i<200;i++){
		 *   instance.addInteraction("p"+(i),"p"+(i%23),{id:"p"+(i)+"_p"+(i%23),feature1:"value"});
		 * }
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

			if (self.proteins[protein1.id].imports.indexOf(protein2.id)==-1)
				self.proteins[protein1.id].imports.push(protein2.id);
			
			if (self.proteins[protein2.id].imports.indexOf(protein1.id)==-1)
				self.proteins[protein2.id].imports.push(protein1.id);
			
			//creating and adding an interaction
			var interaction = {source:protein1,target:protein2,id:protein1.id+"-"+protein2.id};
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
		addOrganism: function(organism){
			var self=this;
			if (!self.organisms.hasOwnProperty(organism)){
				self.organisms[organism] = {"key":organism,"name":organism,"parent":self.model,"children":[]};
				self.model.children.push(self.organisms[organism]);
			}
		},

		/**
		 * Adds a protein to the graphic
		 * 
		 * @param {Object} protein An object containing information of the protein 
		 *
		 * @example 
		 * for (var i=0;i<50;i++)
		 *   instance.addProtein({id:'new'+pid++,group:1,organism:"human"});
		 * instance.restart();
		 */
		addProtein: function(protein) {
			var self=this;
			if(typeof protein.size == "undefined") protein.size=1;
			self.addOrganism(protein.organism);
			if (!self.proteins.hasOwnProperty(protein.id)){
				self.proteins[protein.id] = protein;
				self.proteins[protein.id].key =protein.id;
				self.proteins[protein.id].name =protein.id;
				self.proteins[protein.id].parent = self.organisms[protein.organism];
				self.proteins[protein.id].imports=[];
				
				self.organisms[protein.organism].children.push(self.proteins[protein.id]);
				if (typeof self.interactionsA[protein.id] == "undefined")
					self.interactionsA[protein.id]=[];
				
			}

//			var n = self.proteins.indexOf(self.proteinsA[protein.id]);
//			if (n!=-1)
//				return n;
//			n= self.proteins.push(protein);
//			self.proteinsA[protein.id]=protein;
//			if (typeof self.organisms[protein.organism] == 'undefined'){
//				var numberOfOrganism =Object.keys(self.organisms).length;
//				self.organisms[protein.organism] = numberOfOrganism++;
//				self.foci=[];
//				for (var i=0; i<numberOfOrganism; i++){
//					self.foci.push({x: (self.opt.width/(numberOfOrganism+1))*(i+1), y:self.opt.height/2});
//				}
//			}
//			return n;
		},
		/**
		 * gets the protein object by its id
		 * 
		 * @param {string} proteinId The id of the protein
		 *  
		 * @return {Object} protein An object containing information of the protein 
		 *
		 * @example 
		 * alert(instance.getProtein('p3'));
		 */
		getProtein: function(proteinId) {
			var self=this;
			return self.proteins[proteinId];
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
		 *alert( instance.getInteraction('p1','p3'));
		 */
		getInteraction: function(proteinId1,proteinId2){
			var self =this;
			var i = self.getInteractionIndex(proteinId1,proteinId2);
			return (i==null)?i:self.interactions[i];
		},
		/**
		 * removes from the graphic the interaction by the id of its proteins
		 * 
		 * @param {string} proteinId1 The id of the first protein
		 * @param {string} proteinId2 The id of the second protein
		 *  
		 * @example 
		 * for (var i=1;i<100;i+=1)
		 *   instance.removeInteraction('p'+i,'p'+(100+i));
		 * instance.restart();
		 */
		removeInteraction: function(proteinId1,proteinId2){
			var self = this;
			var intIndex = self.getInteractionIndex(proteinId1,proteinId2);
			self.interactions.splice(intIndex--, 1);
			
			var pos = self.proteins[proteinId2].imports.indexOf(proteinId1);
			if (pos!=-1)
				self.proteins[proteinId2].imports.splice(pos,1);
			pos = self.proteins[proteinId1].imports.indexOf(proteinId2);
			if (pos!=-1)
				self.proteins[proteinId1].imports.splice(pos,1);
				
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
		 * instance.restart();
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
					for(var i in self.proteins) {
						if(self.proteins[i].id == proteinId) {
							self.proteins.splice(i, 1);
							break;
						}
					}
					for(var i in self.organisms) {
						var prots = self.organisms[i].children;
						for(var j in prots) {
							if(prots[j].id == proteinId) {
								self.organisms[i].children.splice(j, 1);
							}
						}
					}
					delete self.proteins[proteinId];
				}
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
			self.interactions=[];
			self.interactionsA={};
			self.restart();
		},
		clearAndRestartGraphic:function(){
			var self=this;
			self.svg.selectAll("path.link").remove();
			self.svg.selectAll("g.node").remove();
			self.restart();
		},
	    imports: function(nodes) {
	    	var self =this;
	        var map = {},
	            imports = [];

	        // Compute a map from name to node.
	        nodes.forEach(function(d) {
	          map[d.name] = d;
	        });

	        // For each import, construct a link from the source to target node.
	        nodes.forEach(function(d) {
	          if (d.imports) d.imports.forEach(function(i) {
	        	var inter =self.getInteraction(map[d["name"]].id,map[i].id);
	            if (inter!=null && imports.indexOf(inter)==-1)
	            	imports.push(inter);
	          });
	        });

	        return imports;
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

			var nodes = self.cluster.nodes(self.model),
				links = self.imports(nodes);
			
			self.splines = self.bundle(links);

			var path = self.svg.selectAll("path.link")
				.data(links);
			
			path.enter().append("svg:path")
				.attr("id", function(d) { return "link-" + d.source.key + "-" + d.target.key; })
				.attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
				.attr("d", function(d, i) { return self.line(self.splines[i]); })
				.style("pointer-events","visibleStroke")
				.on("mouseover",  function(d){ 
					self.raiseEvent('interactionMouseOver', {
						interaction: d
					});
				})
				.on("mouseout",  function(d){ 
					self.raiseEvent('interactionMouseOut', {
						interaction: d
					});
				})
				.on("click",  function(d){ 
					self.raiseEvent('interactionClick', {
						interaction: d
					});
				});

			path.exit().remove();

			var gnodes=self.svg.selectAll("g.node")
				.data(nodes.filter(function(n) { return !n.children; }));
			
			var svgNode=gnodes.enter().append("svg:g")
					.attr("class", "node")
					.attr("id", function(d) { return "node-" + d.key; })
					.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });
			
			svgNode.append("svg:text")
						.attr("class", "legend")
						.attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
						.attr("dy", ".31em")
						.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
						.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
						.attr("visibility",function(d) { return (d.showLegend)?"visible":"hidden";})
						.text(function(d) { return d.key; });

			svgNode.append("circle")
				.attr("class", "figure")
				.attr("id", function(d) { return "figure_"+d.id; })
				.attr("r", function(d) { return self.opt.radius*Math.sqrt(d.size); })
				.attr("stroke-width",self.opt.radius*0.3)
				.on("mouseover",  function(d){ 
					self.raiseEvent('proteinMouseOver', {
						protein: d
					});
				})
				.on("mouseout",  function(d){ 
					self.raiseEvent('proteinMouseOut', {
						protein: d
					});
				})
				.on("click",  function(d){ 
					self.raiseEvent('proteinClick', {
						protein: d
					});
				});
			gnodes.exit().remove();

//			self.hide("g.node .legend");
			self.svg.selectAll(".legendBlock").remove();
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
				.attr("x", self.opt.width/2 - 6)
				.attr("y", 7-self.opt.height/2)
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
						return "translate(" +  (self.opt.width/2 - 18 - 2*self.opt.radius*Math.sqrt(d[0][2])) + ", -" +  self.opt.height/2 + ")"; 
					})
					.style("fill", "transparent")
					.style("stroke", "black");
				legend.filter(function(d) { return d[0]!="label" && d[1]== type; }).append("text")
					.attr("x", function(d) { 
						return (self.opt.width/2 - 22 - 5*self.opt.radius); 
					})
					.attr("y", 7-self.opt.height/2 )
					.attr("dy", ".35em")
					.style("text-anchor", "end")
					.text(function(d) { return (d[0][1]*1.0).toFixed(2); });
				
			}else{
				
				legend.filter(function(d) { return d[0]!="label" && d[1]==type; }).append("rect")
					.attr("x", self.opt.width/2 - 18) 
					.attr("y", -self.opt.height/2)
					.attr("width", 13)
					.attr("height", 13)
					.style("fill", function(d,i) {
						if (typeof d[2]== "undefined")
							return self.color(i);
						return d[2];
					});
				legend.filter(function(d) { return d[0]!="label" && d[1]== type; }).append("text")
					.attr("x", self.opt.width/2 - 24)
					.attr("y", 7-self.opt.height/2)
					.attr("dy", ".35em")
					.style("text-anchor", "end")
					.text(function(d) { return d[0]; });
			}
		},
		_paintLegends: function(){
			var self = this;
			var w=18 + self.longestLegend*7 + 10;
			var legendBlock = self.svg.insert("g",".link")
				.attr("class", "legendBlock");
			self._sortLegends();
			legendBlock.append("rect")
				.attr("x", self.opt.width/2 -w)
				.attr("y", -self.opt.height/2)
				.attr("height", 6 + self.legends.length *16)
				.attr("width", w)
				.style("fill", "#ddd")
				.style("fill-opacity","0.4");

			var legend = legendBlock.selectAll(".mainLegend") 
				.data(self.legends)
				.enter().insert("g")
				.attr("class", "mainLegend")
				.attr("transform", function(d, i) { return "translate(0," + (3 + i * 16) + ")"; });
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
		 * instance.hide('[id *="node-p1"]');
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
		 * instance.show('[id *="node-p1"]');
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
		 * instance.highlight(".figure");
		 */
		highlight: function(selector){
			var self=this;
			self.vis.selectAll(selector).style("stroke", '#0f0');
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
		 * instance.setColor(".figure","#FF0000");
		 */
		setColor: function(selector,color){
			var self=this;
			self.vis.selectAll(selector).style("stroke", color);
		},
		/**
		 * Shows/Hide the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node-p"+(pid-1)+" .legend");
		 */
		showLegend: function(selector,typeLegend){
			var self=this;
			self.vis.selectAll(selector).selectAll(".legend").attr("visibility", "visible").text(function(d) {
				d.typeLegend=typeLegend;
				if (d.typeLegend=="id") 
					return d.id;
//				else if (d.typeLegend.indexOf("features.")==0)
//					return d.features[d.typeLegend.substr(9)];
				else
					return d.features[d.typeLegend];
				});
		}, 
		
		/**
		 * Scales the area of a protein
		 * 
		 * @param {string} protein the id of the protein to scale
		 * @param {integer} scale value to scale a node
		 *  
		 * @example 
		 * instance.setSizeScale("#figure_p188",4);
		 */
		setSizeScale: function(selector,scale){
			var self=this;
			

			self.vis.selectAll(selector).attr("r", function(d) { 
				d.size=scale;
				return self.opt.radius*Math.sqrt(d.size); 
			});
		}, 
		/**
		 * Scales the size of the proteins which value has been modify by other means
		 * 
		 * @param {string} selector a CSS3 selector to choose the nodes to resize
		 *  
		 * @example 
		 * var j=0;
		 * for (var i in instance.proteins)
		 * 	instance.proteins[i].size=1+(j++)%4;
		 * instance.refreshSizeScale(".figure");
		 */
		refreshSizeScale: function(selector){
			var self=this;
			self.vis.selectAll(selector).attr("r", function(d) { 
				return self.opt.radius*Math.sqrt(d.size); 
			});
		}, 

		
		/**
		 * Shows/Hide the legend(id) of the protein
		 * 
		 * @param {string} protein the id of the protein to swap the visibility of the legend
		 *  
		 * @example 
		 * instance.swapShowLegend("#node-p"+(pid-1)+" .legend");
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
		 * instance.swapShowLegend("#node-p"+(pid-1)+" .legend");
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




