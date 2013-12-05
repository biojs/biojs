
// Basic components
	function draw_circles(args){
		var nodeEnter = args.nodeEnter;
		var circle_size = args.circle_size;
		var genePresence = args.genePresence || false;
		
		////console.log("drawing with size "+circle_size);
		
		
		/*var circles = nodeEnter.append("svg:circle")
          .attr("r", function(d){ 
			  return d.children ? circle_size : 0; })
          .attr("fill", function(d){return d.duplication == "Y"? "red":"green"})
          //.on("click", click)
          //.on("click", focus)
          */
          //.on("click", get_all_children)
          //.on("click", color_subtree)
          //.on("contextmenu", function(data, index) {
          	//	////console.log("right-clicked on node");
              //  d3.select('#my_custom_menu')
              //    .style('position', 'absolute')
              //    .style('left', d3.event.x + "px")
              //    .style('top', d3.event.y + "px")
              //    .style('display', 'block');
            //d3.event.preventDefault();
	    	//})
		//;
		
		nodeEnter.append("path")
    	//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		.attr("d", get_right_symbol)
		.style("fill", function(d){
			if(d.children){
				if (genePresence){
					if(!genePresence.hasOwnProperty(d.name)){
						return "grey";
					}
				}
				if(d.duplication == "Y"){return "red";}
				else{return "green";}
			}
		});
		          //.on("click", click)
		
		//return circles;	
	}	
	function get_right_symbol(d){
		////console.log("current "+d.name+" gets symbol ");
		if(d._children){
			////console.log("2");
			return d3.svg.symbol().type(d3.svg.symbolTypes[1]).size([100])();
		}
		if(d.children){
			if(d.duplication == "Y"){
			//	//console.log("4");
				return d3.svg.symbol().type(d3.svg.symbolTypes[4]).size([50])();
			}
			else{
			//	//console.log("0");
				return d3.svg.symbol().type(d3.svg.symbolTypes[0]).size(50)();
			}
		}
		else{
			////console.log("3");
			return d3.svg.symbol().type(d3.svg.symbolTypes[3]).size([25])();
		}
		
		
	}
	function draw_nodes(args){
		var nodeEnter = args.nodeEnter;
		var node = args.node;
		var source = args.source;
		var circle_size = args.circle_size;
		var duration = args.duration;
		var availablewidth = args.availablewidth;//.replace("px","");
		//availablewidth = 700;
		var tree_representation_type = args.tree_representation_type;
		var nodeindex = args.nodeindex;
		var right2left = args.right2left; 
		var two_window = args.two_window;
		//console.log("tree reprensentation is "+tree_representation_type);
		if (tree_representation_type == "radial"){
		// Transition nodes to their new position.
	        nodeEnter.transition()
	            .duration(duration)
	            .attr("transform", function(d) { 
			if(two_window){
					return "rotate(" + (20,90) + ")translate(70)";
				
			}
			    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
		    })
	            .style("opacity", 1)
	            .select("circle");
          
	        node.transition()
	            .duration(duration)
	            .attr("transform", function(d) { 
				if(two_window){
					return "rotate(" + (nodeindex[d.name] - 90) + ")translate(" + d.y + ")";	
				}
			    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
		    })
	            .style("opacity", 1);
    
	        node.exit().transition()
	            .duration(duration)
	            .attr("transform", function(d) { 
			    if(two_window){
			   	return "rotate(" + (nodeindex[d.name] - 90) + ")translate(" + d.y + ")"; 
			    }
					////console.log("uff, this node is leaving "+d.name);
					return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
	            .style("opacity", 1e-6)
	            .remove();
		}
		else{
			
			var nodeUpdate = node.transition()
			      .duration(duration)
			      //.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
				  ;

			  nodeUpdate.select("circle")
			      .attr("r", function(d){
						  if(d._children){ return 10;}
						  return d.children ? circle_size : 0; 
						  //return d.children ? circle_size : 0;
				  })
				  
				  nodeUpdate.select("path")
				  .attr("d", get_right_symbol)
			      //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

			  nodeUpdate.select(".innerNode_label")
			      //.style("fill-opacity", 1)
				  .attr("visibility", "")
	              .attr("x", function(d) { 
	  				if(d._children){return 15;}
	  				return d.children ? -5 : 35; })
	              .attr("y", function(d) { 
	  				if(d._children){return 3;}
	  				return d.children ? -3 : 4; })
				  
				  .attr("text-anchor", function(d){if(d._children){ return "start"}})
				  .text(function(d){ 
					  if(d._children){
						  //console.log("change text to collapsed");
						  return d.name+": "+d._collapsed_children+" homologs";
					  }
						else if(d.children){
							"int node";
						}
	  					else{
							  //console.log("change text to "+get_right_leaf_name(d));
							  return get_right_leaf_name(d);
							
						}
				  });
			
			
	// Transition nodes to their new position.
        nodeEnter.transition()
            .duration(duration)
            .attr("transform", function(d) { 
				////console.log("well, node entering at "+d.y+" and "+d.x+"("+availablewidth+")");
				if(two_window){
					var y_value = nodeindex[d.name];
						////console.log("looking at node "+d.name+" in transform enter --> "+y_value) 
									//return "translate(0,65.54166412353516)";	
									return "translate(0," + (y_value+20) + ")"; 
				}
				if(right2left){
					////console.log(d);
					var y = availablewidth - d.y;
					var x = d.x;
					////console.log("right2left: "+d.y+" - "+availablewidth+" "+y+" "+x);
					return "translate(" + y + "," + x + ")"; 
					return test_translate; 
				}
				return "translate(" + d.y + "," + d.x + ")"; 
			})
            .style("opacity", 1)
            .select("circle");
          
        node.transition()
            .duration(duration)
            .attr("transform", function(d) { 
				if(two_window){
					return "translate(0," + (nodeindex[d.name] + 20) + ")"; 
				}
				if(right2left){
					var y = availablewidth - d.y;
					var x = d.x;
					////console.log("right2left: "+d.y+" - "+availablewidth+" "+y+" "+x);
					return "translate(" + y + "," + x + ")"; 
				}
				return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1);
    
        node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { 
				if(two_window){
					return "translate(" + d.y + "," + nodeindex[d.name]+ 20 + ")";
				}
				////console.log("uff, this node is leaving "+d.name);
				if(right2left){
					var y = availablewidth - d.y;
					var x = d.x;
					////console.log("right2left: "+d.y+" - "+availablewidth+" "+y+" "+x);
					return "translate(" + y + "," + x + ")"; 
				}
				return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1e-6)
            .remove();
		}
	}
	function draw_taxon_names(args){
			var nodeEnter = args.nodeEnter;
			var show_taxa = args.show_taxa;
			var highlight_gene = args.highlight_gene;
			var model_organisms = args.model_organisms;
			var right2left = args.right2left;
			var genePresence = args.genePresence || false;
			var color_nodes = true;
			var ID2Color = new Object();
			var symbol_counter = {};
			var how_to_color_hash = {};
			var total_number_of_leaves = 0;
			var n_available_value = "N/A";
			////console.log("highlight gene: "+highlight_gene);
	 		var texts = nodeEnter
			.append("a")
			.attr("xlink:href", function(d) {
				if(!d.children){
				////console.log("species : "+d.taxon+", identifier: "+d.name);
				var url = species2sourceDB_mapping({species : d.taxon, identifier: d.name});
					return url;
			}
			})
			.attr("target", "_blank")
			.append("svg:text")
            .attr("x", function(d) { 
				if(right2left){ return -17;}
				if(d._children){return 15;}
				return d.children ? -5 : 35; })
            .attr("y", function(d) { 
				if(d._children){return 3;}
				return d.children ? -3 : 4; })
            //.attr("class","innerNode_label")
            .attr("text-anchor", function(d){ 
				if(right2left){ return "end"}
				return d.children ? "end" : "start";})
            //.attr("font-style", "italic")
			
			.attr("visibility",function(d){
				if(d.children){  
					return "hidden";
				}
				else{
					return "";
				}})
            .attr("class",function(d){ 
                
				if(genePresence){
					if(!genePresence.hasOwnProperty(d.name)){
						return "missing_species";
					}
				}
				
				if(d.children){ 
						return "innerNode_label"}
                else{ 
					if(d.name == highlight_gene || d.uniprot_name == highlight_gene){
						return "leaf_label species_name highlight_gene";
				}
					else{
						//if(model_organisms.hasOwnProperty(d.taxon)){
						//	return "leaf_label species_name model_organism";
						//}
						//else{				
							return "leaf_label";
							//}
                	}
				}
            })
            
            .attr("fill", function(d){
            		if(d.name == highlight_gene){
            			return "red";
            		}
            		else{
            			return "";
            		}
            })
            .text(function(d) { 
				////console.log("looking at name: "+d.name);
				return get_right_leaf_name(d,right2left);
				})
		return texts;                        
	}
	function draw_bootstraps(args){
		 	var nodeEnter = args.nodeEnter;
			var show_taxa = args.show_taxa;
			var visibility = args.visibility;

	 		var texts = nodeEnter.append("svg:text")
            .attr("x", function(d) { if(d.children){return -5; }})
            .attr("y", function(d) { if(d.children){return 13; }})
            .attr("text-anchor", function(d){ return d.children ? "end" : "start";})
            .attr("class",function(d){ if(d.children){ return "bootstrap"; }})
            .attr("visibility",visibility)
            .text(function(d) { 
                        if(d.children){
                           return d.bootstrap;
                        }
                });
                        
		return texts;                      
	}
    function set_links(args){
		var link = args.link;
		var link_type = args.link_type;
		var node_thickness = args.node_thickness;
		var duration = args.duration;
		var right2left = args.right2left;
		var availablewidth = args.availablewidth;
		var species_silhouette	 = args.species_silhouette;
		var genePresence = args.genePresence || false;
		var opacity = args.opacity || 1.0;
		link_type = "elbow";
		var class_type = args.class_type || "link";
		var x = d3.svg.diagonal.radial().projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
		var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", 
		  	function(d){
				
				var target_node = d.target;
				if (genePresence){
					if(genePresence.hasOwnProperty(target_node.name)){
						return class_type;
					}
					else{
						return "absent_species_link";
					}
				}
				else{
					return class_type;
				}
				
			})
          .attr("stroke-width", function(d){
              ////console.log("drawing line with thickness "+node_thickness);
                return node_thickness;
          })
		  .attr("stroke-opacity", opacity)
          .attr("stroke", function(d){
              
              return "black";
                //return taxon_colors.hasOwnProperty(d.name)? taxon_colors[d.name]: "black";
          })      
          .attr("d", function(d){ 
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
        .transition()
          .duration(duration)
          .attr("d", function(d){
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  } 
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          ;
    
      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", function(d){ 
			  //console.log("about to transition");
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          ;
    
      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d){ 
			  //console.log("about to exit");
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          //.attr("d", function(d) {
             //   var o = {x: source.x, y: source.y};
            //    return diagonal({source: o, target: o});
          //})
          .remove();
    }



	function collect_data_from_plotted_tree(args){
		var target = args.target;
		
		d3.select("#"+target).selectAll("g.node").each(function(d) {
			var name_copy = d.name;
			name_copy=name_copy.replace(/_\d+/g, '');
				var curr_y = d.y;
				var curr_x = d.x;
				var node_height = d.height;
				var available_height = 100;
				var rect_data = [];
				
				
				if(node_height == 0){
					
				}
				var line1 = {"start_x":"","end_x":"","":"",}
				var line2 = {"start_x":"","end_x":"","":"",}
				// max_x, min_x, | ranges for all 
				//
				//console.log("looking at plotted_node "+name_copy);
				//if(level2color.hasOwnProperty(name_copy)){
					//rect_data[d.name] = {"rect_x" : rect_x,"rect_y": rect_y, "rect_height": rect_height, "rect_width": rect_width};
		
		//	}
		
		
			
		});
		return rect_data;
	}

	function print_species_tree_silhouette(args){
		//var nodeEnter = args.nodeEnter;
		//var node = args.node;
		
		// collect data for each 
		var link = args.link;
		var link_type = args.link_type;
		var node_thickness = args.node_thickness;
		var duration = args.duration;
		var right2left = args.right2left;
		var availablewidth = args.availablewidth;
		var species_silhouette = args.species_silhouette;
		link_type = "elbow";
		var x = d3.svg.diagonal.radial().projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
		var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "silhouette")
		  .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 30)
          .attr("stroke", "grey")
          .attr("d", function(d){ 
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
         //.attr("d", function(d) {
            //   var o = {x: source.x0, y: source.y0};
         //      return diagonal({source: o, target: o});
         //})
        .transition()
          .duration(duration)
		  .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 30)
          .attr("stroke", "red")
		  
          .attr("d", function(d){
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  } 
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          ;
    
      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", function(d){ 
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          ;
    
      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
		  .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 30)
          .attr("stroke", "red")
		  
          .attr("d", function(d){ 
			  if(species_silhouette){
				  //console.log("getting diagonal");
				  return diagonal(d);
			  }
			  return elbow({d:d,right2left:right2left,availablewidth:availablewidth});
		  })
          //.attr("d", diagonal)
          //.attr("d", function(d) {
             //   var o = {x: source.x, y: source.y};
            //    return diagonal({source: o, target: o});
          //})
          .remove();
		
		
	}
// For lines between nodes
    function elbow(args) {
		var d = args.d;
		var right2left = args.right2left;
		var availablewidth = args.availablewidth;
		
		   // //console.log("use M" + d.source.y + "," + d.source.x
          // + "H" + d.target.y + "V" + d.target.x
          // + (d.target.children ? "" : "h"));
      if(right2left){
      	return "M" + (availablewidth - d.source.y) + "," + d.source.x + "V" + d.target.x + "H" + (availablewidth - d.target.y);
      } 
	  else{    
           return "M" + d.source.y + "," + d.source.x + "V" + d.target.x + "H" + d.target.y;
	   }
	  
	  	 
	  
    }
    function redraw() {
      ////console.log("here", d3.event.translate, d3.event.scale);
          vis.attr("transform", "translate(" + d3.event.translate + ")"+ " scale(" + d3.event.scale + ")");
    }

// Toggle children on click.
    function click(d) {
		var circle_size = 4;
		var duplication_circle_size = 15;
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		//console.log("clicked on "+d.name);
      ////console.log(d);
      //d3.select(this).text("hahaha");
	  //console.log("this node data: "+this.parentNode.__data__ );
      //var dad = this.parentNode;
      //d3.select(this).select("text").text(function(d){
          ////console.log("trying to select: "+d.name)
      //    return "hahhaaa";
      //});
      // update node
        d3.select(this) .append("svg:path")
						.attr("d", function(d){
							var x = 200, y = 100;
							return 'M ' + x +' '+ y + ' l 4 4 l -8 0 z';
							})
						.attr("r",function(d){return d.duplication == "Y"? duplication_circle_size:circle_size;})
						.attr("class", "collapsed")    
						.attr("fill",function(d){return d.children? "":"white";})
						.attr("stroke",function(d){return d.children? "":"black";})
						.attr("stroke-width", function(d){return d.children? "":"2.5px";});
      
						//console.log("clicked updating");
      //gTree.update(d);
      update(d);
    }
    function focus(d) {
    	var duplication_circle_size = 15;
    	var circle_size = 4;
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      //console.log("clicked on "+d.name);
      ////console.log(d);
      d3.select(this).text("hahaha");
      //console.log("this node data: "+this.parentNode.__data__ );
      //var dad = this.parentNode;
      d3.select(this).select("text").text(function(d){
          ////console.log("trying to select: "+d.name)
          return "hahhaaa";
      });
      // update node
        d3.select(this).append("svg:path")
        .attr("d", function(d){
                var x = 200, y = 100;
                return 'M ' + x +' '+ y + ' l 4 4 l -8 0 z';
                })
            .attr("r",function(d){return d.duplication == "Y"? duplication_circle_size:circle_size;})
            .attr("class", "collapsed")    
            .attr("fill",function(d){return d.children? "":"white";})
            .attr("stroke",function(d){return d.children? "":"black";})
            .attr("stroke-width", function(d){return d.children? "":"2.5px";});
      update(d);
    }
    function collapse(d) {
            if (d.children) {
              d._children = d.children;
              d._children.forEach(collapse);
              d.children = null;
            }
    }



    function draw_alignment_sequences(args){
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var alignment_patterns = args.alignment_patterns;
    	var domainScale = args.domainScale;
		var two_window = args.two_window;
		var visibility = args.visibility;
		var font_size = args.alignment_font_size;
		var offset = new Array;
		
		var all_patterns =  alignment_patterns.enter();
		////console.log(all_patterns);
		//all_patterns.append("svg:tspan")
		
		// let's draw rects first
        all_patterns.append("svg:rect")
		//.on('mouseover', show_gene_information)
        .attr("x", -6)
        .attr("y", function(d,i,j){
			var string_width = d.seq.length;
			if (typeof offset[j] == 'undefined') {
				offset[j] = 0;
			}
			var final_y = offset[j]* (font_size-1);
			offset[j] += string_width;
			return final_y;
        })
        .attr("class", "align_rect")
        .attr("width", 15)
		
        .attr("height", function(d,i){
			offset += d.seq.length;
			////console.log("height is: "+(d.seq.length * font_size));
			return d.seq.length * (font_size-1);
        })
		.attr("class", function(d){ 
			////console.log("looking at cat:"+d.category+" seq: "+d.seq);
			//tst
			return d.category;
		})
       .attr("transform", "rotate(-90)")
       //.attr("fill", "url(#line_gradient)")
	   //.attr("fill","red")
	   //.attr("fill-opacity", "0.3")
	   ;

	   var text_offset = new Array;

		// now plot the text onto the rects
		all_patterns.append("svg:text")
		.attr("x", function(d,i,j) { 
			////console.log("plotting at "+d+" and "+i);
			var string_width = d.seq.length * (font_size-1);
			if (typeof text_offset[j] == 'undefined') {
				text_offset[j] = 0;
			}
			var final_x = text_offset[j];
			text_offset[j] += string_width;
			////console.log("string width is "+string_width);
			return final_x;
		})
		.attr("y", "4")
		.attr("class", "alignment_text")
		//.attr("fill", function(d){
		//.style("background-color", function(d){
		//	if(d.category == "A"){return "white";}
		//	if(d.category == "B"){return "blue";}
		//	if(d.category == "C"){return "red";}
		//	if(d.category == "D"){return "black";}
			//})
		.text(function(d){ return d.seq;})
    }

// Alignments 
    function draw_alignments(args){
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var nodeEnter = args.nodeEnter;
    	var domainScale = args.domainScale;
		var visibility = args.visibility;
		var alignment_length = 4000;
    	//var rects = nodeEnter.filter(function(d){ return d.type == "leaf"});
		var rects = nodeEnter.filter(function(d){ return typeof d.children == 'undefined' });
                rects.append("rect")
				//.on('mouseover', show_gene_information)
                .attr("x", leaf_group_x +8)
                .attr("y", sequence_start_y)
                .attr("class", "seq_string")
				.attr("visibility",visibility)
                .attr("width", function(d){return d.children ? "":"10";})
                .attr("height", function(d){
                        if(!d.children){
                                        ////console.log("draw sequence from "+sequence_start_y+" to "+(sequence_start_y + sequenceScale(d.seq_length))+"("+d.seq_length+")");
                                        ////console.log("transform "+d.seq_length+" to "+sequenceScale(d.seq_length)+" (start drawing at: "+sequence_start_y+")");
                        }
                       return d.children ? "": domainScale(alignment_length);
                })
               .attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
               //.attr("fill", "url(#line_gradient)")
			   .attr("fill","white")
			   .attr("stroke","black")
			   .attr("stroke-width","5px");
			   ;
            //   function(d){return d.children ? "":"grey";});
		return rects;
    }
	function draw_alignment_patterns(args){
		var alignment_patterns = args.alignment_patterns;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var domain_colors = args.domain_colors;
		var sequence_rect_width = args.sequence_rect_width;
		var max_seq_representation = args.max_seq_representation;
		var visibility = args.visibility;
		var domain2color = {};
		var alignment_pattern_length = 5;
		var alignment_pattern_counter = 1;
		
		////console.log("we have "+alignment_patterns.length+" or "+alignment_patterns[0].length+" splits")
		//console.log("we have "+alignment_patterns.length);
		//console.log(alignment_patterns);
		var max_value;
		if(alignment_patterns.length == 0){
			max_value = 2;
		}
		else{ max_value =alignment_patterns[0].length;}
		var domain_scale = d3.scale.linear().domain([1,max_value]).range([1, max_seq_representation]);

		//console.log("sequence start: "+sequence_start_y);
		var all_alignment_patterns =  alignment_patterns.enter()
		//.append("a")
		//.attr("xlink:href", function(d) {return "http://pfam.sanger.ac.uk//family/"+d.name})
		.append("rect")
		.attr("x", function(d){
			return 195;
			return sequence_start_y;
		})
		.attr("y", function(d, i){
			////console.log("draw domain from "+sequence_start_y+" to "+(sequence_start_y + domainOnlyScale(d.domain_start))+"("+d.domain_start+")");
			var x_value = Number(sequence_start_y) + Number(domain_scale(i));
			////console.log(alignment_pattern_counter);
			////console.log(d);
			//blaaa
			////console.log("first: "+Number(sequence_start_y)+" second: "+Number(domain_scale(i)));
			//alignment_pattern_counter = i + 2;
			return x_value;
		})
		.attr("class", "alignment_pattern")
		//.attr("visibility",visibility)
		//.attr("rx", 5)
		//.attr("ry", 5)
		//.attr("transform", "matrix(1,0,0,1,100,0)")
		//.attr("stroke", "none")
		.attr("width", function(d){return sequence_rect_width;})
		.attr("height", function(d){
			return alignment_pattern_length;
		})
		.attr("transform", "rotate(-90 100 100)")
		.attr("fill", 
		//                        "url(#domain_gradient)")
		//                        ;
		function(d,i){
				if( d == "1") {
					return "white";
				}
				else{
					return "green";
				}
				//                            return "url(#"+domain_colors[i]+")";
			})
			//.on('mouseover', show_domain_information);          
			return all_alignment_patterns;
	}
	
// Domains 
    function draw_sequences(args){
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var nodeEnter = args.nodeEnter;
    	var domainScale = args.domainScale;
		var two_window = args.two_window;
		var visibility = args.visibility;

		// collect all leaf
		var rects = nodeEnter.filter(function(d){ return typeof d.children == 'undefined' });
    	//var rects = nodeEnter.filter(function(d){ return d.type == "leaf"});
                rects.append("rect")
				//.on('mouseover', show_gene_information)
                .attr("x", leaf_group_x +9)
                .attr("y", function(d){
					if(two_window){
						return 0;
					}
					return sequence_start_y;
				})
                .attr("class", "seq_string")
				.attr("visibility",visibility)
                .attr("width", function(d){return d.children ? "":"5";})
                .attr("height", function(d){
					//console.log("name: "+d.name+" sequence length: "+domainScale(d.seq_length)+" --> "+d.seq_length);
                        //if(!d.children){
                                        ////console.log("draw sequence from "+sequence_start_y+" to "+(sequence_start_y + sequenceScale(d.seq_length))+"("+d.seq_length+")");
                                        ////console.log("transform "+d.seq_length+" to "+sequenceScale(d.seq_length)+" (start drawing at: "+sequence_start_y+")");
                        //}
                       return d.children ? "": domainScale(d.seq_length);
                })
               .attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
               .attr("fill", "url(#line_gradient)");
            //   function(d){return d.children ? "":"grey";});
		return rects;
    }
	
	
    function draw_cigar_borders(args){
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var nodeEnter = args.nodeEnter;
    	var domainScale = args.domainScale;
		var two_window = args.two_window;
		var alignment_length = args.alignment_length;
		var visibility = args.visibility;

		// collect all leaf
		var rects = nodeEnter.filter(function(d){ return typeof d.children == 'undefined' });
    	//var rects = nodeEnter.filter(function(d){ return d.type == "leaf"});
                rects.append("rect")
				//.on('mouseover', show_gene_information)
                .attr("x", leaf_group_x +4)
                .attr("y", function(d){
					if(two_window){
						return 0;
					}
					return sequence_start_y;
				})
                .attr("class", "seq_string")
				.attr("visibility",visibility)
                .attr("width", function(d){return d.children ? "":"10";})
                .attr("height", function(d){
					//console.log("name: "+d.name+" sequence length: "+domainScale(d.seq_length)+" --> "+d.seq_length);
                        //if(!d.children){
                                        ////console.log("draw sequence from "+sequence_start_y+" to "+(sequence_start_y + sequenceScale(d.seq_length))+"("+d.seq_length+")");
                                        ////console.log("transform "+d.seq_length+" to "+sequenceScale(d.seq_length)+" (start drawing at: "+sequence_start_y+")");
                        //}
                       return domainScale(alignment_length);
                })
               .attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
               .attr("fill", "white")
			   .attr("stroke","green");
            //   function(d){return d.children ? "":"grey";});
		return rects;
    }
	
	function draw_cigar_sequences(args){
		var domains = args.domains;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var domain_colors = args.domain_colors;
		var two_window = args.two_window;
		
		var sequence_rect_width = args.sequence_rect_width;
		var visibility = args.visibility;
		var diff_domain_counter = 0;
		
		////console.log(domains);
		//console.log("drawing cigar_stuff");
		var domain2color = {};
		
		//var domainsExit = domains.exit().remove();
		var all_domains =  domains.enter()
									.append("rect")
									.attr("x", function(d){
										////console.log("I am even here");
										if(two_window){
											leaf_group_x + 13;
										}
										return leaf_group_x + 3
										})
									.attr("y", function(d){
										////console.log("but are we here?")
										if(two_window){
											var chosen = domainScale(d.offset);
											return chosen;
										}
										if(d.domain_start == 3){
										//	//console.log("draw domain from "+sequence_start_y+" and "+domainScale(d.domain_start)+" to "+(sequence_start_y + domainScale(d.domain_start))+"("+d.domain_start+")");
										//	//console.log(sequence_start_y + domainScale(d.domain_start));
										}
										return sequence_start_y + domainScale(d.domain_start);
									})
									.attr("class", "cigar_rect")
									.attr("visibility",visibility)
									//.attr("rx", 5)
									//.attr("ry", 5)
									.attr("transform", "matrix(1,0,0,1,100,0)")
									//.attr("stroke", "none")
									.attr("width", function(d){
										////console.log("width is "+sequence_rect_width + 4);
										return sequence_rect_width;})
									.attr("height", function(d){
										var length = d.length;
										return domainScale(length);
									})
									.attr("transform", "rotate(-90 100 100)")
									.attr("fill", 
									function(d,i){
											if(d.type == "M") {
												return "green";
											}
											else{
												return "white";
											}
										})
										.on('mouseover', show_domain_information);          
			////console.log("finished?")
			return all_domains;
			
	}
	
	function draw_domains(args){
		var domains = args.domains;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var domain_colors = args.domain_colors;
		var two_window = args.two_window;
		
		var sequence_rect_width = args.sequence_rect_width;
		var visibility = args.visibility;
		var diff_domain_counter = 0;
		
		//console.log(domains);
		//console.log("drawing domains");
		var domain2color = {};
		
		//var domainsExit = domains.exit().remove();
		var all_domains =  domains.enter()
									.append("a")
									.attr("xlink:href", function(d) {
										//console.log("am I here?"+d.name);
										return "http://pfam.sanger.ac.uk/family/"+d.name})
									.attr("target", "_blank")
									.append("rect")
									.attr("x", function(d){
										//console.log("I am even here");
										if(two_window){
											leaf_group_x + 13;
										}
										return leaf_group_x + 3
										})
									.attr("y", function(d){
										//console.log("but are we here?")
										if(two_window){
											return domainScale(d.domain_start);
										}
										if(d.domain_start == 3){
											//console.log("draw domain from "+sequence_start_y+" and "+domainScale(d.domain_start)+" to "+(sequence_start_y + domainScale(d.domain_start))+"("+d.domain_start+")");
											//console.log(sequence_start_y + domainScale(d.domain_start));
										}
										return sequence_start_y + domainScale(d.domain_start);
									})
									.attr("class", "domain")
									.attr("visibility",visibility)
									.attr("rx", 5)
									.attr("ry", 5)
									.attr("transform", "matrix(1,0,0,1,100,0)")
									.attr("stroke", "none")
									.attr("width", function(d){
										////console.log("width is "+sequence_rect_width + 4);
										return sequence_rect_width + 4;})
									.attr("height", function(d){
			
										var length = domainScale(d.domain_stop - d.domain_start);
										////console.log("sequence_rect: appending source is "+length);
										//console.log("transform domain length "+(d.domain_stop - d.domain_start)+" to "+length);
										return length;
									})
									.attr("transform", "rotate(-90 100 100)")
									.attr("fill-opacity",0.8) 
									.attr("fill", 
									//                        "url(#domain_gradient)")
									//                        ;
									function(d,i){
										////console.log("checking for "+d.name+" in domain2color");
										//                                if( d.name in domain2color ) {
											if( domain2color[d.name] === undefined ) {
												////console.log("not found");
												domain2color[d.name] = domain_colors[diff_domain_counter % 6];
												////console.log(d.name+" is "+diff_domain_counter+" and will use: "+domain2color[d.name]+ " length is "+domain_colors.length);
												diff_domain_counter++;
												return "url(#"+domain2color[d.name]+")";
											}
											else{
												////console.log("found! using "+domain2color[d.name]);
												return "url(#"+domain2color[d.name]+")";
											}
											//                            return "url(#"+domain_colors[i]+")";
										})
										.on('mouseover', show_domain_information);          
			////console.log("finished?")
			return all_domains;
			
	}
	
	
	function get_right_leaf_name(d,right2left){
		var display_name;
		
		if(right2left){
			return d.name;
		}
        if(d.children){
				return d.name;
        }
        else{
			
			if(d.sequences){
				return d.taxon+", "+d.sequences.length+" genes"; 
			}
			else{
				if(d.swissprot_protein_name && ! d.swissprot_protein_name == "N/A"){
					////console.log("has swissprot_name: "+d.swissprot_protein_name);
					display_name = d.swissprot_protein_name;
				}
				else {
					if(d.display_label && !d.display_label == "") {
						////console.log("add display_label: "+d.display_label);
						if(d.display_label.length > 20 ){
							display_name = d.display_label.substring(0,15);
						}
						else{
							display_name = d.display_label;
						}
					}
					else{
						display_name = "N/A";
					}
				}
				////console.log("display_name is "+display_name);
				if(d.common_name == "NaN" || d.common_name == "N/A"){
						display_name = display_name + ", " + d.name;
				}
				else{
					display_name = display_name + ", " + d.common_name +"";
					//return d.common_name; 
				}
				////console.log("display_name before returning is "+display_name);
				
				return display_name;
			}
		
		}
	}
// Conservation 
    function draw_aligned_sequences(args){
    
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var nodeEnter = args.nodeEnter;
    	var domainScale = args.domainScale;
		var visibility = args.visibility;
    	var rects = nodeEnter.filter(function(d){ return d.type == "leaf"});
                rects.append("rect")
                .attr("x", leaf_group_x +8)
                .attr("y", sequence_start_y)
                .attr("class", "aligned_seq_string")
				.attr("visibility",visibility)
                .attr("width", function(d){return d.children ? "":"10";})
                .attr("height", function(d){
                        if(!d.children){
                                        ////console.log("draw sequence from "+sequence_start_y+" to "+(sequence_start_y + sequenceScale(d.seq_length))+"("+d.seq_length+")");
                                        ////console.log("transform "+d.seq_length+" to "+sequenceScale(d.seq_length)+" (start drawing at: "+sequence_start_y+")");
                        }
                       return d.children ? "": domainScale(4000);
                       return d.children ? "": domainScale(d.seq_length);
                })
               .attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
               .attr("fill", 
               "green");
            //   function(d){return d.children ? "":"grey";});

		return rects;
    }   
	function draw_gaps(args){
		var gaps = args.gaps;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var sequence_rect_width = args.sequence_rect_width;
		var visibility = args.visibility;
		var all_gaps =  gaps.enter().append("rect")
                       .attr("x", leaf_group_x + 9)
                       .attr("y", function(d){
                                   ////console.log("draw domain from "+sequence_start_y+" to "+(sequence_start_y + domainOnlyScale(d.domain_start))+"("+d.domain_start+")");
                                   return sequence_start_y + domainScale(d.domain_start);
                           })
                       .attr("class", "gap")
					   .attr("visibility",visibility)
                       //.attr("rx", 5)
                       //.attr("ry", 5)
                       //.attr("transform", "matrix(1,0,0,1,100,0)")
                       //.attr("stroke", "none")
                       .attr("width", function(d){return sequence_rect_width - 4;})
                       .attr("height", function(d){
                               var length = domainScale(d.domain_stop - d.domain_start);
                                   ////console.log("sequence_rect: appending source is "+d.x);
                                ////console.log("transform domain length "+(d.domain_stop - d.domain_start)+" to "+length);
                               return length;
                        })
                        .attr("transform", "rotate(-90 100 100)")
                        .attr("fill", "white");
		return all_gaps;
 }
// Synteny
function draw_synteny_seqs(args){
    
    	var leaf_group_x = args.leaf_group_x;
    	var sequence_start_y = args.sequence_start_y;
    	var nodeEnter = args.nodeEnter;
    	var domainScale = args.domainScale;
		var visibility = args.visibility;

    	var synteny_rects = nodeEnter.filter(function(d){ return d.type == "leaf"});
                synteny_rects.append("rect")
                .attr("x", leaf_group_x +11)
                .attr("y", sequence_start_y)
                .attr("class", "synteny_seq_string")
				.attr("visibility",visibility)
                .attr("width", function(d){return d.children ? "":"2";})
                .attr("height", function(d){
                        if(!d.children){
                                        ////console.log("draw sequence from "+sequence_start_y+" to "+(sequence_start_y + sequenceScale(d.seq_length))+"("+d.seq_length+")");
                                        ////console.log("transform "+d.seq_length+" to "+sequenceScale(d.seq_length)+" (start drawing at: "+sequence_start_y+")");
                        }
                       return d.children ? "": domainScale(4000);
                       return d.children ? "": domainScale(d.seq_length);
                })
               .attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
               .attr("fill", "grey");
            //   function(d){return d.children ? "":"grey";});

		return synteny_rects;
}   
function draw_synteny(args){
		var syntenties = args.syntenties;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var sequence_rect_width = args.sequence_rect_width;
		var visibility = args.visibility;

		var all_syntenies =  syntenties.enter().append("rect")
                       .attr("x", leaf_group_x + 6)
                       .attr("y", function(d){
                                   ////console.log("draw domain from "+sequence_start_y+" to "+(sequence_start_y + domainOnlyScale(d.domain_start))+"("+d.domain_start+")");
                                   return sequence_start_y + domainScale(d.length);
                        })
                       .attr("class", "synteny")
					   .attr("visibility",visibility)
                       //.attr("rx", 5)
                       //.attr("ry", 5)
                       //.attr("transform", "matrix(1,0,0,1,100,0)")
                       //.attr("stroke", "none")
                       .attr("width", function(d){return sequence_rect_width;})
                       .attr("height", function(d){
                               var length = domainScale(d.length);
                                   ////console.log("sequence_rect: appending source is "+d.x);
                                ////console.log("transform domain length "+(d.domain_stop - d.domain_start)+" to "+length);
                               return length;
                        })
                        .attr("transform", "rotate(-90 100 100)")
                        .attr("fill", "green");
		return all_syntenies;
}
// Images    
function draw_images(args){
     	var nodeEnter = args.nodeEnter;
     	var image_path = args.image_path;
		var right2left = args.right2left;
		
		//var value2use = args.value2use || taxon;
     	
     	var images = nodeEnter.append("svg:image")
            .attr("y", -10)
            .attr("x", function(d){
				if(right2left){return -15;}
				return 12.5;
			})
            .attr("text-anchor", function(d){ return  "end";})
            .attr("width", 20).attr("height", 20)
            //.attr("xlink:href", function(d) { return d.children == null? image_path+"/thumb_"+d.taxon+".png" : "";  });
			.attr("xlink:href", function(d) { 
				var image_file;
				if(d.taxon == "NaN"){
					image_file = image_path+"/thumb_"+d.name+".png";
				}
				else{
					image_file = image_path+"/thumb_"+d.taxon+".png";
				}
				////console.log("plotting image for "+d.taxon+" "+image_path+" -> "+image_file);
				if(!d.children  || typeof d.children === 'undefined' || !d.taxon == "NaN"){
					return image_file;
				}
				else{return "";}
				return d.children == null? "":image_file; 
			});
    }


	function draw_bootstrap_ticks(args){
	     	var nodeEnter = args.nodeEnter;

            var bootstrap_ticks = nodeEnter.append("rect")
			//.on('mouseover', show_gene_information)
            .attr("x", -10)
            .attr("y", -5)
            .attr("class", "seq_string")
			//.attr("visibility",visibility)
            .attr("width", function(d){return d.children ? "2":"";})
            .attr("height", 10)
			//.attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
           //.attr("fill", "url(#line_gradient)")
		   .attr("fill",function(d){
			   if(!d.bootstrap){
				   return "";
			   }
			   else if (d.bootstrap < 50){
					return "red";
			   }
			   else if (d.bootstrap > 50 && d.bootstrap < 85){
			   		return "orange";
				}
				else{
					return "green"
				}
		   })
		   //.attr("stroke","black")
		   .attr("stroke-width","5px");
		   ;
     	
    }

	function get_subtree_color_data(args){
	     	var nodeEnter = args.nodeEnter;
			var target = args.target;
			var level2color = new Object();
			var previous_taxon = "";
			level2color["Primates"] = "1";
			//level2color["Murinae"] = "1";
			level2color["Euarchontoglires"]  = "1";
			level2color["Vertebrata"]  = "1";
			
			//level2color["Protostomia"] = "1";
			level2color["Lophotrochozoa"] = "1";
			level2color["Ecdysozoa"] = "1";

			level2color["Laurasiatheria"] = "1";
			level2color["Clupeocephala"] = "1";
			level2color["Laurasiatheria"] = "1";
			
			
			
			
			// iterate over internal nodes
			// have a set of nodes to annotate
			rect_data = [];
			
			d3.select("#"+target).selectAll("g.node").each(function(d) {
				if(d.children){
					////console.log("checking name: "+d.name);
					var name_copy = d.name;
					name_copy=name_copy.replace(/_\d+/g, '');
					////console.log("looking at replaced: "+name_copy+" dupl?: "+d.duplication);
					if(level2color.hasOwnProperty(name_copy)){
						////console.log("should be colered");
						
						if(previous_taxon == name_copy){
							////console.log("well, it is equal. do nothing for "+d.name+"!!!");
							return "";
						}
						
						var all_childs = get_all_childs(d);
						////console.log("have "+all_childs.length+" childen");
						////console.log(all_childs);
						var min_x =9000, max_x =0, curr_y,max_y;
						curr_y = d.y;
						jQuery.each(all_childs, function(t,node){
							////console.log(t);
							////console.log(k);
							////console.log("source: "+d.name+" and curr_node: "+node.name);
							if(node.name === d.name){
								////console.log(node.name+" has coord: x:"+node.x+" and y:"+node.y);
							}
							else{
								////console.log(node.name+" has coord: x:"+node.x+" and y:"+node.y);
								if(node.x < min_x){
									min_x = node.x;
								}
								if(node.x > max_x ){
									max_x = node.x;
								}
								max_y = node.y;
							}
						})
						var rect_y = 0;
						var rect_width = max_x - min_x + 16;
						var rect_height = max_y - curr_y + 550;
						var rect_x = max_x - d.x+8;
						rect_x = -rect_x;
						
						
						//console.log("plot a rect from "+rect_y+" heigth: "+rect_height+"("+max_y+"-"+curr_y+") width: "+rect_width+" min_x:"+min_x+" max_x:"+max_x);
						rect_data[d.name] = {"rect_x" : rect_x,"rect_y": rect_y, "rect_height": rect_height, "rect_width": rect_width};
						previous_taxon = name_copy;
					}
				}
			})
			return rect_data;
    }

	function draw_vertical_taxon_labels(args){
	     	var nodeEnter = args.nodeEnter;
	    	var leaf_group_x = args.leaf_group_x;
	    	var sequence_start_y = args.sequence_start_y;
			

            var bootstrap_ticks = nodeEnter.append("rect")
			//.on('mouseover', show_gene_information)
            .attr("x", sequence_start_y -5)
            .attr("y", -9)
            .attr("class", "bootstrap_ticks")
			//.attr("visibility",visibility)
            .attr("width", function(d){return d.children ? "":"5";})
            .attr("height", 17)
			//.attr("transform", function(d){return d.children ? "":"rotate(-90 100 100)";})
           //.attr("fill", "url(#line_gradient)")
		   .attr("fill",function(d){
			   if(!d.bootstrap){
				   return "";
			   }
			   else if (d.bootstrap < 50){
					return "red";
			   }
			   else if (d.bootstrap > 50 && d.bootstrap < 85){
			   		return "orange";
				}
				else{
					return "green"
				}
		   })
		   //.attr("stroke","black")
		   .attr("stroke-width","5px");
		   ;
     	
    }	
	
	
// ToolTip
	function add_tipsy(args){
			var where = args.where;
			//console.log("where is "+where);
			if(where == ".leaf_label"){
					//console.log("in leaf label");
					jQuery(where).tipsy({ 
					gravity: 'se', 
					html: true, 
					title: function() {
					   var c = "red";
					   var e = this.__data__;
					  return 'Taxon: '+e.taxon+'<br>ID: '+e.name+"<br>Common name: "+e.common_name+"<br>Gene name: "+e.display_label+"<br>"; 
					}
				  });

			}
			else if(where == ".domain"){
					jQuery(where).tipsy({ 
					gravity: 'se', 
					html: true, 
					title: function() {
					   var c = "red";
					   var e = this.__data__;
					   var length = e.domain_stop - e.domain_start;
					  return 'Domain: '+e.name+'<br>Length: '+length+" AA<br> E-value: "+e.evalue+"<br>Start: "+e.domain_start+" End: "+e.domain_stop; 
					}
				  });
			}
			else if(where == ".clade_tax_rect"){
					jQuery(where).tipsy({ 
					gravity: 'se', 
					html: true, 
					title: function() {
						
					   var c = "red";
					   var e = this.__data__;
   						var name_copy = e.name;
   						name_copy=name_copy.replace(/_\d+/g, '');
					  return 'Clade: '+name_copy+'<br>'; 
					}
				  });
			}
			
			
	}
	Array.prototype.insert = function (index, item) {
	  this.splice(index, 0, item);
	};
	
	function toggleAll(d) {
	        if (d.children) {
	          d.children.forEach(toggle);
	          click(d);
	        }
	}
      
// Toggle children.
	function toggle(d) {
	  if (d.children) {
	    d._children = d.children;
	    d.children = null;
	  } else {
	    d.children = d._children;
	    d._children = null;
	  }
	}  
	  
	  
	function draw_blank_rects(args){
				
				////console.log("one color is "+p(0));
				//d3.select("#tree svg").selectAll(".leaf_label")
				d3.select("#tree svg").selectAll("g.node").append("rect")
					//.on('mouseover', show_gene_information)
	                .attr("x", function(d){
						if(!d.children){
							return -8;
						}
					})
	                .attr("y", function(d){
						if(!d.children){
							return 12;
						}
					})
	                .attr("class", function(d){
						if(!d.children){
							return "blank_rect";
						}
					})
					//.attr("visibility",visibility)
	                .attr("width", function(d){
						
						if(!d.children){
							return "15";
						}
					})
	                .attr("height", function(d){
	                	if(!d.children){
							return 263;
						}
	                })
	               .attr("transform", "rotate(-90)")
	               .attr("fill", "white")
	               .attr("fill-opacity",1);
               
	               
	}
	  
	function draw_leaf_colors(args){
				var how_to_color_hash = args.how_to_color_hash;
				var target = args.target;
				var SwissProt2colorDictionary = new Object();
				var Taxa2colorDictionary = new Object();
				var p=d3.scale.category20b();
				var r=p.range(); // ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", 
	                      // "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
				var i = 0;
				var i_taxa = 0;
				var html ="";

				
				////console.log("one color is "+p(0));
				//d3.select("#tree svg").selectAll(".leaf_label")
				var all_available_node = d3.select("#"+target).selectAll("g.node").filter(function(d){return !d.children});
				all_available_node.append("rect")
					//.on('mouseover', show_gene_information)
	                .attr("x", function(d){
						return -6;
					})
	                .attr("y", function(d){
						return 33;
					})
	                .attr("class", function(d){
						return "tax_color_rect";
					})
					//.attr("visibility",visibility)
	                .attr("width", function(d){
							return "12";
					})
	                .attr("height", function(d){
	                       return d.children ? "0": 240;
	                })
	               .attr("transform", function(d){
					   return d.children ? "1":"rotate(-90)";
				   })
	               .attr("fill", function(d){
			               	////console.log("looking at "+d.swissprot_protein_name);
							if(how_to_color_hash.hasOwnProperty(d.display_label)){
									if(how_to_color_hash[d.display_label] == "N/A" || how_to_color_hash[d.display_label] == ""){
						               	//console.log("white");
										return "white";
									}
									else if(how_to_color_hash[d.display_label] == "other"){
						               	//console.log("grey");
										return "grey";
									}
									else{
							               	//if(d.swissprot_gene_name == 'N/A' || d.swissprot_gene_name == "undefined"){
							               	//		////console.log("no color");
									        //       	return "none";
							               	//}
											if( SwissProt2colorDictionary[d.display_label] === undefined ) {
					                                    SwissProt2colorDictionary[d.display_label] = p(i % p.range().length);
								               			html  = html + "<span style='opacity:0.6; background-color:"+SwissProt2colorDictionary[d.display_label]+"'>";
														html = html + "<a href='http://www.uniprot.org/uniprot/?query="+d.display_label+"+AND+reviewed%3Ayes&sort=score'>";
														html = html + d.swissprot_gene_name+"</a></span>: "+d.display_label+"</div><br>";
					                                    i++;
					                                    return SwissProt2colorDictionary[d.display_label];
					                				}
					                else{
					                                    ////console.log("found! using "+domain2color[d.name]);
					                                    //ID2Color[d.name] = SwissProt2colorDictionary[d.swissprot_gene_name];
					                                    return SwissProt2colorDictionary[d.display_label];
									}	
								}
							}
							else{
								return "";
							}
			               })
	               .attr("fill-opacity",
				   function(d){
					   return 0.2
				   });
               
	               
	               // draw legend
				   
				  // show_general_information({swissprot_annotation: html});
               
	}
	function color_subtrees(args){
				var subtree_colors = args.subtree_colors;
				var target = args.target;
				var SwissProt2colorDictionary = new Object();
				var Taxa2colorDictionary = new Object();
				var p=d3.scale.category20b();
				var r=p.range(); // ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", 
	                      // "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
		  		var p_taxa=d3.scale.category10();
		  		var r_taxa=p_taxa.range();		  
				
				var i = 0;
				var i_taxa = 0;
				var html ="";
				var previous_taxon = "";
				//console.log(subtree_colors);
				//test
				
				
				////console.log("one color is "+p(0));
				//d3.select("#tree svg").selectAll(".leaf_label")
				var all_available_node = d3.select("#"+target).selectAll("g.node").filter(function(d){return subtree_colors.hasOwnProperty(d.name)});
				all_available_node.append("rect")
					//.on('mouseover', show_gene_information)
	                .attr("x", function(d){
							return subtree_colors[d.name].rect_x;
					})
	                .attr("y", 0)
	                .attr("class", "clade_tax_rect")
					//.attr("visibility",visibility)
	                .attr("width", function(d){
							return subtree_colors[d.name].rect_width;
					})
	                .attr("height", function(d){
							return subtree_colors[d.name].rect_height;
	                })
	               .attr("transform", function(d){
							return "rotate(-90)";
				   })
	               .attr("fill", function(d){
			               	////console.log("looking at "+d.swissprot_protein_name);
							// avoid duplicates
								var name_copy = d.name;
								name_copy=name_copy.replace(/_\d+/g, '');
								////console.log("check if "+previous_taxon+" == "+name_copy);
								if( Taxa2colorDictionary[d.name] === undefined ) {
									Taxa2colorDictionary[d.name] = p_taxa(i_taxa % p_taxa.range().length);
									i_taxa++;
								}
								
								////console.log("setting "+previous_taxon+" == "+name_copy);
								return Taxa2colorDictionary[d.name];
			               })
	               .attr("fill-opacity",function(d){return 0.3;});
				   
				 return Taxa2colorDictionary;  
				   
	}

	function show_general_information(args){
		// will populate the following fields
		var swissprot_annotation = args.swissprot_annotation|| "NaN";
		// room for more annotation
        // draw legend
		////console.log('ID: '+id+'<br>Taxon: '+taxon+" <br>Gene name: "+gene_name+"<br>Swiss-Prot annotation: "+swissprot_annotation+"");
        jQuery("#swissprot_annotation_container").html(swissprot_annotation);
	}

	function show_gene_information(d){
		//d3.select("#domain_annotation_container").style("visibility", "hidden");
		//d3.select("#sequence_annotation_container").attr("visibility", "");
		
		// will populate the following fields
		var id = d.name|| "NaN";
		var taxon = d.taxon|| "NaN";
		var gene_name = d.swissprot_gene_name|| "NaN";
		var swissprot_annotation =  d.swissprot_protein_name|| "NaN";
        // draw legend
		
		var url = species2sourceDB_mapping({species : taxon, identifier: id});
		////console.log('ID: '+id+'<br>Taxon: '+taxon+" <br>Gene name: "+gene_name+"<br>Swiss-Prot annotation: "+swissprot_annotation+"");
        jQuery("#container_seq_id").html("<a href='"+url+"' target='_blank')>"+id+"</a> ");
        jQuery("#container_taxon_id").html("<font font-style='italic'>"+taxon+"</font>");
        jQuery("#container_gene_name").html(gene_name);
        jQuery("#container_swissprot_annotation").html(swissprot_annotation);
		
	}
	function show_domain_information(d){
		
		// hide gene_information
		//d3.select("#sequence_annotation_container").style("visibility", "hidden");
		//d3.select("#domain_annotation_container").style("visibility", "");
		
		// will populate the following fields
		var name = d.name|| "NaN";
		var start = d.domain_start|| "NaN";
		var stop = d.domain_stop|| "NaN";
		var annotation =  d.swissprot_protein_name|| "NaN";
		var evalue =  d.evalue|| "NaN";
		var length = d.domain_stop - d.domain_start || "NaN";
        // draw legend
		
		//	//console.log('Domain: '+name+'<br>Length: '+length+" AA<br> E-value: "+evalue+"<br>Start: "+start+" End: "+stop);
        jQuery("#container_domain_name").html("<a href='http://pfam.sanger.ac.uk/family/"+name+"'>"+name+"</a>");
        jQuery("#container_domain_coord").html(start+"-"+stop);
		jQuery("#container_evalue_stop").html(evalue);
        //jQuery("#container_domain_annotation").html(annotation);
        jQuery("#container_domain_length").html(length);
	}
	
	function draw_gene_copies(args){
		var gene_copies = args.gene_copies;
		var sequence_start_y = args.sequence_start_y;
		var domainScale = args.domainScale;
		var leaf_group_x = args.leaf_group_x;
		var domain_colors = args.domain_colors;
		var sequence_rect_width = args.sequence_rect_width;
		var visibility = args.visibility;
		var domain2color = {};
		
		//var sequences = nodeEnter.selectAll(".sequences").data(function(d) { return d.domains; });
		//console.log(gene_copies);
		//var all_genes =  sequences.append("rect")
		
		var all_gene_copies =  gene_copies.enter().append("rect")

		.attr("x", leaf_group_x + 4)
		.attr("y", function(d, i){
			////console.log("draw domain from "+sequence_start_y+" to "+(sequence_start_y + domainOnlyScale(d.domain_start))+"("+d.domain_start+")");
			return sequence_start_y + 40 + (i * 50);
		})
		.attr("class", "domain")
		.attr("visibility",visibility)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("transform", "matrix(1,0,0,1,100,0)")
		.attr("stroke", "none")
		.attr("width", function(d){return sequence_rect_width;})
		.attr("height", function(d){
			var length = 40;
			////console.log("sequence_rect: appending source is "+d.x);
			////console.log("transform domain length "+(d.domain_stop - d.domain_start)+" to "+length);
			return length;
		})
		.attr("transform", "rotate(-90 100 100)")
		.attr("fill", 
		//                        "url(#domain_gradient)")
		//                        ;
		function(d,i){
			////console.log("checking for "+d.name+" in domain2color");
			//                                if( d.name in domain2color ) {
				if( domain2color[d.name] === undefined ) {
					////console.log("not found");
					domain2color[d.name] = domain_colors[i % 5];
					////console.log(d.name+" is "+i+" and will use: "+domain_colors[i]+ " length is "+domain_colors);
					return "url(#"+domain_colors[i % 5]+")";
				}
				else{
					////console.log("found! using "+domain2color[d.name]);
					return "url(#"+domain2color[d.name]+")";
				}
				//                            return "url(#"+domain_colors[i]+")";
			})
			.on('mouseover', show_gene_information);          
			return all_gene_copies;
	}
	
//
// interactive functions  
//

// Internal text
	function hide_internal_text(d) {
	         d3.select("#tree svg").selectAll(".innerNode_label").text(function(d){
	                return d.children ? "": d.taxon; 
	        });
	}
	function show_internal_text(d) {
	        ////console.log("we are here");
	         d3.select("#tree svg").selectAll(".innerNode_label").text(function(d) { 
	        if(d.duplication == "Y"){
	                return "";
	        }
	        else{
	                    return d.children ? d.name:d.taxon; 
	        }
	        });
	}
	function show_internal_text_important(d) {
	         d3.select("#tree svg").selectAll(".innerNode_label").text(function(d) { 
	            if(d.children){
	                if(show_taxa.hasOwnProperty(d.name)){
	                    if(d.duplication == "Y"){
	                        return "";
	                    }
	                else{
	                    return d.name;
	                }
	            }
	        }
	        else{
	            return d.taxon; 
	        }
	        });
	}
    
// show/hide IDS
    function show_leaf_ids(d) {
	     d3.select("#tree svg").selectAll(".tax_color_rect").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".leaf_label").text(function(d) { return  d.name; })
														.classed("species_name", false);
    }
	function show_leaf_taxa(d) {
  	     d3.select("#tree svg").selectAll(".tax_color_rect").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".leaf_label").text(function(d) { 
            return d.children ? d.name:d.taxon; 
        })
		.classed("species_name", true);
    }
	function show_leaf_common_name(args) {
		var target = args.target;
		
  	     d3.select("#"+target+" svg").selectAll(".tax_color_rect").attr("visibility", "hidden");
         d3.select("#"+target+" svg").selectAll(".leaf_label").text(function(d) { 
			 return get_right_leaf_name(d);
        });
    }
	function show_leaf_uniprot(args) {
			var target = args.target;
			d3.select("#"+target+" svg").selectAll(".tax_color_rect").attr("visibility", "hidden");
		     //d3.select("#tree svg").selectAll(".tax_color_rect").attr("visibility", "hidden");


			var UniProt2color = ["grey","lightblue","lightgreen", "blue","green"];
			var UniProt2colorDictionary = new Object();
			d3.select("#"+target+" svg").selectAll(".leaf_label")
         	//d3.select("#tree svg").selectAll(".leaf_label")
			.classed("species_name", false)
         	.text(function(d) { 
					var return_string;
         			if(d.uniprot_name == "NaN" || d.uniprot_name == "N/A"){
         				return_string = "not mapped";
         			}
					else{
						return_string = d.uniprot_name;
					}
					if(d.children){
						return "";
						return_string = return_string +", "+d.name;
					}
					else{
						return_string = return_string +", "+d.common_name;
					}
					return return_string;
         	})
         	.style("fill", function(d,i){
				//if(!d.children){
// 			        var matches = d.uniprot_name.match(/(.*)_(.*)/); // Match uniprot KB
// 					if(matches){
// 		    		    //console.log("looking at: "+d.uniprot_name+" with "+matches.length);
// 						if(typeof matches[1] !== 'undefined') {
// 							var uniprot_id = matches[1];
// 							//console.log("found first part: "+uniprot_id);
// 							if( UniProt2colorDictionary[uniprot_id] === undefined ) {
//                                     ////console.log("not found");
//                                     UniProt2colorDictionary[uniprot_id] = UniProt2color[i % UniProt2color.length];
//                                     //console.log("will use: "+UniProt2color[i % UniProt2color.length]);
//                                     //return "red";
//                                     return UniProt2color[i % UniProt2color.length];
//                                 }
//                                 else{
//                                     ////console.log("found! using "+domain2color[d.name]);
//                                     return UniProt2colorDictionary[uniprot_id];
//                                 }
// 							}
// 						if(typeof matches[2] !== 'undefined') {
// 							//console.log("found second part: "+matches[2]);
// 						}
// 						
// 					}
// 			      //  //console.log("matches: "+firstPart+" and: "+secondPart);
// 				
// 				}
				});
	        // color uniprotkb ids
	        // e.g. BRCA2_HUMAN
	        // e.g all BRCA2 make color x
	        
	        
    }
    function show_leaf_swissprot(d) {
			var SwissProt2color = ["darkgreen","red","blue","grey"];
			var SwissProt2colorDictionary = new Object();
			var ID2Color = new Object();
			
            d3.select("#tree svg").selectAll(".leaf_label")
          	 .text(function(d) { 
          	 		if(d.swissprot_gene_name == "NaN"){
          	 			d.swissprot_gene_name = "not mapped";
          	 		}
 		         	return d.children ? d.name : ""+d.swissprot_gene_name+" ("+d.taxon+")"; 
          	 });
			draw_taxon_colors({ID2Color: ID2Color});
	}
    
	function get_gene_color_stats(args) {
			var nodes = args.nodeEnter;
			var target = args.target;
			var SwissProt2color = ["darkgreen","red","blue","grey"];
			var SwissProt2colorDictionary = new Object();
			var symbol_counter = {};
			var how_to_color_hash = {};
			var total_number_of_leaves = 0;
			var n_available_value = "N/A";
			////console.log(nodes);
			d3.select("#"+target).selectAll("g.node").each(function(d) {
				var display_name = "N/A";
				
				if(!d.children){
					if( symbol_counter[d.display_label] === undefined ) {
						symbol_counter[d.display_label] = 1;
					}
					else{
						symbol_counter[d.display_label]++;
					}
					////console.log("looking at label "+d.display_label + " --> "+symbol_counter[d.display_label]);
					////console.log(d);
					total_number_of_leaves++;
				}

			})
				jQuery.each(symbol_counter, function(key,value){
					if(key === n_available_value || key === ""){
						////console.log("symbol_counter: "+key+" with "+value+" --> N/A");
						how_to_color_hash[key] = "N/A";
					}
					else if(value >= 2){
						////console.log("symbol_counter: "+key+" with "+value+" --> top");
						how_to_color_hash[key] = "top";
					}
					else{
						////console.log("symbol_counter: "+key+" with "+value+" --> other");
						how_to_color_hash[key] = "other";
					}

				});
				return how_to_color_hash;
				//draw_taxon_colors({ID2Color: ID2Color, how_to_color_hash : how_to_color_hash});		
	}
	
    
// show/hide Domains
    function hide_domains(d) {
		//console.log("hiding domains");
         d3.select("#tree svg").selectAll(".domain").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".seq_string").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "hidden");
    }
    function show_domains(d) {
		//console.log("showing domains");
    
		hide_conservation();
    	hide_synteny();
         d3.select("#tree svg").selectAll(".domain").attr("visibility", "");
         d3.select("#tree svg").selectAll(".seq_string").attr("visibility", "");
         d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "");
    }
    
// show/hide Conservation
    function hide_conservation(d) {
         d3.select("#tree svg").selectAll(".gap").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".aligned_seq_string").attr("visibility", "hidden");
         //d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "hidden");
    }
    function show_conservation(d) {
	    hide_domains();
	    hide_synteny();
         d3.select("#tree svg").selectAll(".gap").attr("visibility", "");
         d3.select("#tree svg").selectAll(".aligned_seq_string").attr("visibility", "");
         //d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "");
    }

// show/hide Gene neighborhood
    function hide_synteny(d) {
         d3.select("#tree svg").selectAll(".synteny").attr("visibility", "hidden");
         d3.select("#tree svg").selectAll(".synteny_seq_string").attr("visibility", "hidden");
         //d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "hidden");
    }
    function show_synteny(d) {
	    hide_domains();
	    hide_conservation();
         d3.select("#tree svg").selectAll(".synteny").attr("visibility", "");
         d3.select("#tree svg").selectAll(".synteny_seq_string").attr("visibility", "");
         //d3.select("#tree svg").selectAll(".domainlabel").attr("visibility", "");
    }

// show/hide Bootstrap
	function show_bootstrap(d){
		d3.select("#tree svg").selectAll(".bootstrap").attr("visibility", "");
	}
	function hide_bootstrap(d){
		d3.select("#tree svg").selectAll(".bootstrap").attr("visibility", "hidden");
	}
    
// Images
    function hide_images(d) {
         d3.select("#tree svg").selectAll("image").attr("visibility", "hidden");
    }
    function show_images(d) {
         d3.select("#tree svg").selectAll("image").attr("visibility", "");
    }

// evolutionary events
    function hide_evol_nodes(d) {
        d3.select("#tree svg").selectAll("circle").attr("fill", "black");
    }
    function show_evol_nodes(d) {
        d3.select("#tree svg").selectAll("image").attr("visibility", "");
        d3.select("#tree svg").selectAll("circle")
        //.attr("r", function(d){
        //        if(d.children){
        //            return d.duplication == "Y"? 10:5;
        //        }
        //})
        .attr("fill", function(d){return d.duplication == "Y"? "red":"green"})
        .on("click", click);
    }    

// Taxon colors
    function show_taxon_colors(d){
         d3.select("#tree svg").selectAll(".tax_color").attr("visibility", "");
    }
    function hide_taxon_colors(d){
        d3.select("#tree svg").selectAll(".tax_color").attr("visibility", "hidden");
    }

// Font size

	function decrease_font_size(d){
		//console.log("decrease ");
		 d3.select("svg").selectAll(".text").attr("font-size", "4");
	}

	function zoom_slider(args) {
		var scale	=		args.scale;
		//var translation = args.translation;

	    var test = d3.select(".drawarea").transition().duration(1000)
	        .attr("transform"," scale(" + scale + ")");
	}


	function zoom(args) {
//		var two_window = false || args.two_window;
		////console.log("trying to zoom");
		var m = [40, 240, 40, 240],
		    w = 1000 -m[0] -m[0],
		    h = 1760 -m[0] -m[2],
		    i = 0,
		    root;
			
			//var scale	=		args.scalex;
			//var translation = args.translatex;
	    var scale = d3.event.scale,
	        translation = d3.event.translate,
	        tbound = -h * scale,
	        bbound = h * scale,
	        lbound = (-w + m[1]) * scale,
	        rbound = (w - m[3]) * scale;
	    // limit translation to thresholds
	    //translation = [
	      //  Math.max(Math.min(translation[0], rbound), lbound),
	      // Math.max(Math.min(translation[1], bbound), tbound)
	    //];
//		if(two_window){
			var test = d3.select(".annot_area").attr("transform", " scale(" + scale + ")");
			var test = d3.select(".drawarea").attr("transform", " scale(" + scale + ")");
			
				//"translate(" + translation + ")" +
	             // " scale(" + scale + ")");
	       
	    	
//		}
//		else{
			//var test = d3.select(".drawarea")
	        //.attr("transform", "translate(" + translation + ")" +
	          //    " scale(" + scale + ")");
//		}
		////console.log(test);
	}

// Functions to be tested
    function show_orthologs(d){
       // Walk parent chain
            var ancestors = [];
            var parent = d;
            while (!_.isUndefined(parent) && parent.duplication != "Y") {
                ancestors.push(parent);
                parent = parent.parent;
            }
            // //console.log(parent);
//             //console.log("(before: Found "+ancestors.length+" ancestors");
//             ancestors = ancestors.slice(0,ancestors.length -1);
//             //console.log("(sliced: "+ancestors.length+" ancestors");
//             //console.log(ancestors);
//             //console.log("getting children for "+parent.name+"");
// 
//             var additional_children = get_all_children(parent);
//             if(additional_children != null){
//                 //console.log("(from children: Found "+additional_children.length+" children");
//                 additional_children.forEach(function(node){
//                     //console.log(node);
//                     ancestors.push(node);
//                 })
//             }
            // ok, we now have all parents, but lets now collect all children
            //while (!_.isUndefined(parent.children)) {
            //    parent.children.forEach(function(d) {
            //        while (!_.isUndefined(d.children)) {
            //    }
            //    ancestors.push(parent.children)
                
            //}
            ////console.log("(after: Found "+ancestors.length+" ancestors");
            
            // Get the matched links
            var matchedLinks = [];
            d3.selectAll('path.link')
                .filter(function(d, i)
                {
                    return _.any(ancestors, function(p)
                    {
                        return p === d.target;
                    });
                })
                .each(function(d)
                {
                    matchedLinks.push(d);
                });
             ////console.log("found "+matchedLinks.length+" links");           
             ////console.log("found "+ancestors.length+" ancestors");           
     
             
             animateParentChain(matchedLinks, ancestors);
            //matchedLinks.attr("stroke-width", "2.5px");
    }
    function animateParentChain(links, nodes, color){

                //console.log("coloring with "+color);
                    d3.selectAll("circle")
                    .data(nodes)
                    .enter().append("svg:circle")
                    .attr("r", function(d){ return d.children ? circle_size : 0; })
                    .attr("fill", color);
            
                var linkRenderer = d3.svg.diagonal()
                    .projection(function(d)
                    {
                        return [d.y, d.x];
                    });
            
                // Links
                ui.animGroup.selectAll("path.selected")
                    .data([])
                    .exit().remove();
            
                ////console.log("removed previous links");
            
                ui.animGroup
                    .selectAll("path.selected")
                    .data(links)
                    .enter().append("svg:path")
                    .attr("class", "selected link")
                    .attr("d", elbow);
        
//           .attr("stroke-width", function(d){
//                 return "3.5px";
//           })
//           .attr("stroke", function(d){
//               ////console.log("has property for "+d.source.name);
//               return "black";
//                 //return taxon_colors.hasOwnProperty(d.name)? taxon_colors[d.name]: "black";
//           })      
//           .attr("d", elbow)
        
        

	    ////console.log("selected new links");

	    // Animate the clipping path
	    var overlayBox = ui.svgRoot.node().getBBox();
	    ////console.log("initiated overlay box");

	    ui.svgRoot.select("#clip-rect")
	        .attr("x", overlayBox.x + overlayBox.width)
	        .attr("y", overlayBox.y)
	        .attr("width", 0)
	        .attr("height", overlayBox.height)
	        .transition().duration(500)
	        .attr("x", overlayBox.x)
	        .attr("width", overlayBox.width);
	        ////console.log("attached animation");
	}
    function show_tax_group(d){
        // have predefined set of inner nodes
        // iterate over those nodes and find them in the tree
        for(var taxon in show_taxa){
            //console.log("ok, collect them all for "+taxon);
            var chosen_nodes = d3.select("#tree svg").selectAll("[name=Eutheria]");
                //console.log(chosen_nodes);
                chosen_nodes.each(function(chosen_node){
                        var collected_nodes = get_all_children(chosen_node);
                        if(collected_nodes != null){
                            //console.log("end, collected: "+collected_nodes.length+" elements");
                        }
                })
                ////console.log("well, we return after the first one");
                        return;
            
        }
        // get all children for 
    }
    function color_subtree(d, color){
					//console.log("Color subtree for "+d.name);
                    var collected_nodes = get_all_children(d);
                    if(collected_nodes != null){
                            //console.log("end, collected: "+collected_nodes.length+" elements");
                    }
                    // Get the matched links
					var matchedLinks = [];
					d3.selectAll('path.link')
						.filter(function(d, i)
						{
							return _.any(collected_nodes, function(p)
							{
								return p === d.target;
							});
						})
						.each(function(d)
						{
							matchedLinks.push(d);
						});
                    color = "darkgreen";
                    animateParentChain(matchedLinks, collected_nodes, color);
    }
    
    function get_all_children(d){
        var all_children = new Array;
        //return ;
        all_children = get_all_childs(d);
        if(all_children != null){
            ////console.log("end, our array has: "+all_children.length+" elements");
            all_children.forEach(function(elem){
                ////console.log(elem);
            });
        }
        else{
            //console.log("Could not find children");
        }
        return all_children;
    }
    function get_all_childs(d){
        var temp_array  = new Array;
        ////console.log("in the get_all_childs for "+d.name+" with id: "+d.id);
        if(d.children){
                var children = d.children;
                for (var i = 0; i < children.length; i++) {
                    var temp_array_child = new Array;
                    if(temp_array_child != null){
                        temp_array_child = get_all_childs(children[i]);
                       // //console.log("got from child: : "+temp_array_child.length+" children");
                        temp_array_child.forEach(function(elem){
                            ////console.log(elem);
                            temp_array.push(elem);
                        })
                    }
                    //temp_array.push(temp_array_child);
                }
                temp_array.push(d);
        }
        else{
            ////console.log("well, this is a child, return its name: "+d);
            temp_array.push(d);
            return temp_array;
        }
        return temp_array;
    }
    function submit_download_form(output_format){
		// Get the d3js SVG element
		var tmp = document.getElementById("tree");
		var svg = tmp.getElementsByTagName("svg")[0];
		// Extract the data as SVG text string
		var svg_xml = (new XMLSerializer).serializeToString(svg);

		// Submit the <FORM> to the server.
		// The result will be an attachment file to download.
		var form = document.getElementById("svgform");
		form['output_format'].value = output_format;
		form['data'].value = svg_xml ;
		form.submit();
	}
	function show_svg_code(){
		// Get the d3js SVG element
		var tmp  = document.getElementById("tree");
		var svg = tmp.getElementsByTagName("svg")[0];

		// Extract the data as SVG text string
		var svg_xml = (new XMLSerializer).serializeToString(svg);

		//Optional: prettify the XML with proper indentations
		svg_xml = vkbeautify.xml(svg_xml);

		// Set the content of the <pre> element with the XML
		jQuery("#svg_code").text(svg_xml);

		//Optional: Use Google-Code-Prettifier to add colors.
		prettyPrint();
	}
    
    
    function search_gene(d, highlight_gene){
		////console.log("we are here");
         d3.select("#tree svg").selectAll(".leaf_label").text(function(d) { 
			//console.log("checking "+highlight_gene+" = "+d.name);
       		 if(d.name == highlight_gene){
                return "";
			}
	        else{
                    return d.children ? d.name:d.taxon; 
           }
        });
    }
	
	
	function species2sourceDB_mapping(args){
		
		var species = args.species;
		var id = args.identifier;
		
		////console.log("in url lookup with "+species+" and id: "+id);
		var ensembl_species = new Object();
		
		var ensembl_genomes_species = new Object();
		var species2db = new Object();
		var url = "";
		species2db["acyrthosiphon_pisum"] = "http://metazoa.ensembl.org/id/";
		species2db["aedes_aegypti"] = "http://metazoa.ensembl.org/id/";
		species2db["ailuropoda_melanoleuca"] = "http://www.ensembl.org/id/";
		species2db["amphimedon_queenslandica"] = "http://metazoa.ensembl.org/id/";
		species2db["anolis_carolinensis"] = "http://www.ensembl.org/id/";
		species2db["anopheles_darlingi"] = "http://metazoa.ensembl.org/id/";
		species2db["anopheles_gambiae"] = "http://metazoa.ensembl.org/id/";
		species2db["apis_mellifera"] = "http://metazoa.ensembl.org/id/";
		species2db["arabidopsis_thaliana"] = "http://plants.ensembl.org/id/";
		species2db["atta_cephalotes"] = "http://metazoa.ensembl.org/id/";
		species2db["bombyx_mori"] = "http://metazoa.ensembl.org/id/";
		species2db["bos_taurus"] = "http://www.ensembl.org/id/";
		species2db["bursaphelenchus_xylophilus"] = "http://www.wormbase.org/search/gene/";
		species2db["caenorhabditis_brenneri"] = "http://metazoa.ensembl.org/id/";
		species2db["caenorhabditis_briggsae"] = "http://metazoa.ensembl.org/id/";
		species2db["caenorhabditis_elegans"] = "http://metazoa.ensembl.org/id/";
		species2db["caenorhabditis_japonica"] = "http://metazoa.ensembl.org/id/";
		species2db["caenorhabditis_remanei"] = "http://metazoa.ensembl.org/id/";
		species2db["callithrix_jacchus"] = "http://www.ensembl.org/id/";
		species2db["canis_familiaris"] = "http://www.ensembl.org/id/";
		species2db["capitella_teleta"] = "http://genome.jgi-psf.org/cgi-bin/dispGeneModel?db=Capca1&id=";
		species2db["cavia_porcellus"] = "http://www.ensembl.org/id/";
		species2db["choloepus_hoffmanni"] = "http://www.ensembl.org/id/";
		species2db["ciona_intestinalis"] = "http://www.ensembl.org/id/";
		species2db["ciona_savignyi"] = "http://www.ensembl.org/id/";
		species2db["culex_quinquefasciatus"] = "http://metazoa.ensembl.org/id/";
		species2db["danaus_plexippus"] = "http://metazoa.ensembl.org/id/";
		species2db["danio_rerio"] = "http://www.ensembl.org/id/";
		species2db["daphnia_pulex"] = "http://metazoa.ensembl.org/id/";
		species2db["dasypus_novemcinctus"] = "http://www.ensembl.org/id/";
		species2db["dipodomys_ordii"] = "http://www.ensembl.org/id/";
		species2db["drosophila_ananassae"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_erecta"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_grimshawi"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_melanogaster"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_mojavensis"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_persimilis"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_pseudoobscura"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_sechellia"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_simulans"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_virilis"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_willistoni"] = "http://metazoa.ensembl.org/id/";
		species2db["drosophila_yakuba"] = "http://metazoa.ensembl.org/id/";
		species2db["echinops_telfairi"] = "http://www.ensembl.org/id/";
		species2db["equus_caballus"] = "http://www.ensembl.org/id/";
		species2db["erinaceus_europaeus"] = "http://www.ensembl.org/id/";
		species2db["felis_catus"] = "http://www.ensembl.org/id/";
		species2db["gadus_morhua"] = "http://www.ensembl.org/id/";
		species2db["gallus_gallus"] = "http://www.ensembl.org/id/";
		species2db["gasterosteus_aculeatus"] = "http://www.ensembl.org/id/";
		species2db["gorilla_gorilla"] = "http://www.ensembl.org/id/";
		species2db["heliconius_melpomene"] = "http://metazoa.ensembl.org/id/";
		species2db["helobdella_robusta"] = "http://genome.jgi-psf.org/cgi-bin/dispGeneModel?db=Helro1&id=";
		species2db["heterorhabditis_bacteriophora"] = "http://www.wormbase.org/search/gene/";
		species2db["homo_sapiens"] = "http://www.ensembl.org/id/";
		species2db["ictidomys_tridecemlineatus"] = "http://www.ensembl.org/id/";
		species2db["ixodes_scapularis"] = "http://metazoa.ensembl.org/id/";
		species2db["latimeria_chalumnae"] = "http://www.ensembl.org/id/";
		species2db["lottia_gigantea"] = "http://genome.jgi-psf.org/cgi-bin/dispGeneModel?db=Lotgi1&id=";
		species2db["loxodonta_africana"] = "http://www.ensembl.org/id/";
		species2db["macaca_mulatta"] = "http://www.ensembl.org/id/";
		species2db["macropus_eugenii"] = "http://www.ensembl.org/id/";
		species2db["meleagris_gallopavo"] = "http://www.ensembl.org/id/";
		species2db["meloidogyne_hapla"] = "http://www.wormbase.org/search/gene/";
		species2db["microcebus_murinus"] = "http://www.ensembl.org/id/";
		species2db["monodelphis_domestica"] = "http://www.ensembl.org/id/";
		species2db["monosiga_brevicollis"] = "http://genome.jgi-psf.org/cgi-bin/dispGeneModel?db=Monbr1&id=";
		species2db["mustela_putorius_furo"] = "http://www.ensembl.org/id/";
		species2db["mus_musculus"] = "http://www.ensembl.org/id/";
		species2db["myotis_lucifugus"] = "http://www.ensembl.org/id/";
		species2db["nasonia_vitripennis"] = "http://metazoa.ensembl.org/id/";
		species2db["nematostella_vectensis"] = "http://metazoa.ensembl.org/id/";
		species2db["nomascus_leucogenys"] = "http://www.ensembl.org/id/";
		species2db["ochotona_princeps"] = "http://www.ensembl.org/id/";
		species2db["oreochromis_niloticus"] = "http://www.ensembl.org/id/";
		species2db["ornithorhynchus_anatinus"] = "http://www.ensembl.org/id/";
		species2db["oryctolagus_cuniculus"] = "http://www.ensembl.org/id/";
		species2db["oryzias_latipes"] = "http://www.ensembl.org/id/";
		species2db["otolemur_garnettii"] = "http://www.ensembl.org/id/";
		species2db["pan_troglodytes"] = "http://www.ensembl.org/id/";
		species2db["pediculus_humanus"] = "http://metazoa.ensembl.org/id/";
		species2db["pelodiscus_sinensis"] = "http://www.ensembl.org/id/";
		species2db["petromyzon_marinus"] = "http://www.ensembl.org/id/";
		species2db["pongo_abelii"] = "http://www.ensembl.org/id/";
		species2db["pristionchus_pacificus"] = "http://metazoa.ensembl.org/id/";
		species2db["procavia_capensis"] = "http://www.ensembl.org/id/";
		species2db["proterospongia_sp"] = "nle_MAKER_updated_Ensembl";
		species2db["pteropus_vampyrus"] = "http://www.ensembl.org/id/";
		species2db["rattus_norvegicus"] = "http://www.ensembl.org/id/";
		species2db["saccharomyces_cerevisiae"] = "http://fungi.ensembl.org/id/";
		species2db["sarcophilus_harrisii"] = "http://www.ensembl.org/id/";
		species2db["schistosoma_mansoni"] = "http://metazoa.ensembl.org/id/";
		species2db["schizosaccharomyces_pombe"] = "http://metazoa.ensembl.org/id/";
		species2db["sorex_araneus"] = "http://www.ensembl.org/id/";
		species2db["strongylocentrotus_purpuratus"] = "http://metazoa.ensembl.org/id/";
		species2db["strongyloides_ratti"] = "http://www.wormbase.org/search/gene/";
		species2db["sus_scrofa"] = "http://www.ensembl.org/id/";
		species2db["taeniopygia_guttata"] = "http://www.ensembl.org/id/";
		species2db["takifugu_rubripes"] = "http://www.ensembl.org/id/";
		species2db["tarsius_syrichta"] = "http://www.ensembl.org/id/";
		species2db["tetraodon_nigroviridis"] = "http://www.ensembl.org/id/";
		species2db["tribolium_castaneum"] = "http://metazoa.ensembl.org/id/";
		species2db["trichinella_spiralis"] = "http://metazoa.ensembl.org/id/";
		species2db["trichoplax_adhaerens"] = "http://metazoa.ensembl.org/id/";
		species2db["tupaia_belangeri"] = "http://www.ensembl.org/id/";
		species2db["tursiops_truncatus"] = "http://www.ensembl.org/id/";
		species2db["vicugna_pacos"] = "http://www.ensembl.org/id/";
		species2db["xenopus_tropicalis"] = "http://www.ensembl.org/id/";
		species2db["xiphophorus_maculatus"] = "http://www.ensembl.org/id/";
		
		
		if(species == "capitella_teleta"){
		}
		
		////console.log("Looking at id "+id+" from species "+species);
		if(species == undefined){
			return "";
		}
		
		url = species2db[species.toLowerCase()]+id;
		////console.log("url is "+url);
		
		// return URL for given ID
		return url;
	}
	
	
	
    
