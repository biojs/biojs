/** 
 * This is the description of the PDBchainTopology component. This component renders secondary structure topology for a protein chain in a PDB entry.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:swanand@gmail.com">Swanand Gore</a>
 * @version 1.0.0
 * @category 0
 *
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>Raphael 2.1.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael-2.1.0.js"></script>
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for PDBchainTopology component.
 *    
 * @option {list}
 *    Following options are available to configure the component:
 *    <ul>
 *    <li>divid: parent div id.</li>
 *    <li>numrows: rows into which the sequence view is to be split up.</li>
 *    <li>tracks: Description of tracks in each row.</li>
 *    </ul>
 *    
 * @example 
 * var mytopo = new Biojs.PDBchainTopology({
 * 		divid:"YourOwnDivId",   pdbid:"1cbs", chainid:"A"
 * });	
 * 
 */

// using these instead of biojs events because of flexibility! biojs events need both source and listener to be available to make a connection!
Biojs.PDBsequenceViewerEvent = new YAHOO.util.CustomEvent("PDBsequenceViewerEvent", Biojs);

Biojs.BasicSequencePainter = Biojs.extend({
	constructor: function(options) {
		var self = this;
		self.init(options);
	},
	init: function(options) {
		var self = this;
		self.raphadivs = options.raphadivs;
		self.seqlen = options.seqlen;
		self.numIndicesInRow = options.numIndicesInRow;
		self.basedivid = options.basedivid;
	},
	indexCoordinate: function(index) {
		// from raphael objects provided, return raphael object and bounding coordinates of a box corresponding to an index
		var self = this;
		if(index >= self.seqlen) return null;
		var raphaindex = (Math.floor(index/self.numIndicesInRow));
		var rowindex = index-raphaindex*self.numIndicesInRow;
		var rd = self.raphadivs[raphaindex];
		var x0 = rd.extents[0]; var x1 = rd.extents[2]; var y0 = rd.extents[1]; var y1 = rd.extents[3];
		var startx = (x1-x0)/self.numIndicesInRow * rowindex;
		var stopx  = (x1-x0)/self.numIndicesInRow * (rowindex+1);
		return {rapha:rd.rapha, startx:startx, starty:y0, stopx:stopx, stopy:y1};
	},
	breakRangeAtRowBoudary: function(start,stop) {
		var self = this;
		var ri1 = (Math.floor(start/self.numIndicesInRow));
		var ri2 = (Math.floor(stop/self.numIndicesInRow));
		if(ri1==ri2) return [[start,stop]];
		var all = [start];
		for(var ri=ri1; ri < ri2; ri++) {
			all.push((ri+1)*self.numIndicesInRow-1); all.push((ri+1)*self.numIndicesInRow);
		}
		all.push(stop);
		var ret = [];
		for(var ai=0; ai < all.length; ai+=2) ret.push( [all[ai],all[ai+1]] );
		return ret;
	},
	breakDomainRangesAtRowBoundary: function(ranges) {
		var self = this;
		var retranges = [];
		for(var ri=0; ri < ranges.length; ri++) {
			var brokenranges = self.breakRangeAtRowBoudary(ranges[ri][0],ranges[ri][1])
			for(var bi=0; bi < brokenranges.length; bi++) retranges.push(brokenranges[bi]);
		}
		return retranges;
	},
	complementaryRanges: function(ranges) {
		// get ranges that span the whole sequence except given ranges
		var self = this;
		var sr = [];
		for(var ri=0; ri < ranges.length; ri++) sr.push(ranges[ri]);
		for(var ri=0; ri < ranges.length; ri++)
			for(var rk=ri+1; rk < ranges.length; rk++)
				if(sr[ri][0] > sr[rk][0]) {
					var temp = sr[ri];
					sr[ri] = sr[rk];
					sr[rk] = temp;
				}
		var retranges = [];
		if(sr[0][0] > 0) retranges.push([0,sr[0][0]-1]);
		if(sr[sr.length-1][1] < self.seqlen-1) retranges.push([ sr[sr.length-1][1]+1 , self.seqlen-1 ]);
		for(var ri=0; ri < sr.length-1; ri++) {
			retranges.push([ sr[ri][1]+1, sr[ri+1][0]-1 ]);
		}
		return retranges;
	},
	drawHorizontalLine: function(start,stop,ypos,attribs) {
		var self = this;
		var brokenranges = self.breakRangeAtRowBoudary(start,stop);
		for(var bi=0; bi<brokenranges.length; bi++) {
			var rd1 = self.indexCoordinate(brokenranges[bi][1]);
			var rd0 = self.indexCoordinate(brokenranges[bi][0]);
			var sx = rd0.startx; var sy = rd0.starty;
			var ex = rd1.stopx; var ey = rd1.stopy;
			if(ypos.midpercent) {
				my = (sy+ey)/2; py = (ey-sy)/100;
				sy = my - ypos.midpercent/2*py;
				ey = my + ypos.midpercent/2*py;
			}
			else alert("drawHorizontalLine cant understand y-placement for line!");
			rd0.rapha.rect(sx,sy,ex-sx,ey-sy).attr(attribs);
		}
	},
	addClickHoverToAllRaphaParentDivs: function(tooltip, clickurl) {
		var self = this;
		for(var ri=0; ri < self.raphadivs.length; ri++) {
			var rd = self.raphadivs[ri];
			jQuery('#'+rd.trackdiv).css({cursor:'pointer'});
			jQuery('#'+rd.trackdiv).tooltip({
				bodyHandler: function() {return tooltip;},
				track:true,
			});
			jQuery('#'+rd.trackdiv).click( function(e) {
				document.location.href=clickurl;
			} );
		}
	}
});

Biojs.ZoombarPainter = Biojs.BasicSequencePainter.extend({
	constructor: function(options) {
		var self = this;
		self.init(options);
		self.pixelwidth = options.pixelwidth;
		self.thumbwidth = options.thumbwidth; self.leftthumb = options.leftthumb; self.rightthumb = options.rightthumb;
		self.initleft = options.initleft; self.initright = options.initright; self.minval = 0; self.maxval = options.seqlen-1;
	},
	paint: function() {
		var self = this;
		if(self.raphadivs.length != 1) {
			alert("Serious error - Cannot implement ZoombarPainter in more than one row!"); return;
		}
		var rd = self.raphadivs[0];
		jQuery("body").addClass("yui-skin-sam");
		jQuery("#"+rd.trackdiv).empty();
		var sliderhtml = '<div id="'+rd.trackdiv+'_sliderdiv" class="yui-h-slider" style="width:'+(self.pixelwidth-self.thumbwidth/2)+'px;">'
		sliderhtml += '    <div id="'+rd.trackdiv+'_leftthumb" class="yui-slider-thumb"><img src="'+self.leftthumb+'"></div>'
		sliderhtml += '    <div id="'+rd.trackdiv+'_rightthumb" class="yui-slider-thumb"><img src="'+self.rightthumb+'"></div>'
		sliderhtml += '</div>'
		jQuery("#"+rd.trackdiv).append(sliderhtml);
    	var convertPixelToValue = function (pval) {
    		var cf = (self.maxval-self.minval)/(self.pixelwidth - self.thumbwidth); // remember to account for width of thumbnail image!
        	return Math.round(pval * cf + self.minval);
    	};
    	var convertValueToPixel = function (val) {
    		var cf = (self.pixelwidth-self.thumbwidth)/(self.maxval-self.minval); // remember to account for width of thumbnail image!
        	return Math.round(val * cf);
    	};
        var slider = YAHOO.widget.Slider.getHorizDualSlider(rd.trackdiv+"_sliderdiv", rd.trackdiv+"_leftthumb", rd.trackdiv+"_rightthumb",
					self.pixelwidth-self.thumbwidth, 0, [convertValueToPixel(self.initleft),convertValueToPixel(self.initright)] );
        slider.minRange = 1; // minimum distance between thumbnails
        var updateUI = function () {
			Biojs.PDBsequenceViewerEvent.fire({basedivid:self.basedivid,type:"onSequenceZoom",start:convertPixelToValue(slider.minVal), stop:convertPixelToValue(slider.maxVal)});
			//console.log("updateUI123 " + slider.minVal + " " + slider.maxVal + " " + convertPixelToValue(slider.minVal) + " " + convertPixelToValue(slider.maxVal) );
		};
        //slider.subscribe('ready', updateUI);
        slider.subscribe('change', updateUI);
	}
});

Biojs.ObservedSequencePainter = Biojs.BasicSequencePainter.extend({
	constructor: function(options) {
		var self = this;
		self.init(options);
		self.unobserved = options.unobserved;
		self.midribAttrib = options.midribAttrib;
		self.obsbarAttrib = options.obsbarAttrib;
		self.tooltip = options.tooltip;
		self.clickURL = options.clickURL;
	},
	paint: function() {
		var self = this;
		Biojs.PDBsequenceViewerEvent.subscribe(self.onSequenceZoom, self);
		self.drawHorizontalLine(0, self.seqlen-1, {midpercent:20}, self.midribAttrib);
		cranges = self.complementaryRanges(self.unobserved);
		for(var ci=0; ci < cranges.length; ci++) {
			self.drawHorizontalLine(cranges[ci][0], cranges[ci][1], {midpercent:80}, self.obsbarAttrib);
		}
		self.addClickHoverToAllRaphaParentDivs(self.tooltip, self.clickURL);
	},
	zoomOnSequenceRange: function(start,stop) {
		// changes viewbox so that the sequence between start and stop occupies the whole raphael canvas
		var self = this;
		if(self.raphadivs.length != 1) { alert("Serious error - zoom is not possible if painter spans more than a row!"); return; }
		var rd = self.raphadivs[0];
		var startx = self.indexCoordinate(start).startx, stopx = self.indexCoordinate(stop).stopx;
		//console.log("hi " + start + " " + stop + " : " + startx + " " + stopx);
		rd.rapha.setViewBox(startx, 0, stopx-startx, rd.rapha.height, false);
		rd.rapha.canvas.setAttribute('preserveAspectRatio', 'none'); // TODO no equivalent fix for IE 6/7/8?
	},
	onSequenceZoom: function(type, args, me) {
		//console.log(me.basedivid + " " + args[0].basedivid);
		if(me.basedivid != args[0].basedivid) return;
		//console.log(args[0].start);
		me.zoomOnSequenceRange(args[0].start, args[0].stop);
	}
});

Biojs.PDBsequenceViewer = Biojs.extend ({
	constructor: function (options) {
		var self = this;
		self.divid = options.divid;
		self.makeLayout(options.divid, options.numrows, options.leftwidth, options.width, options.rightwidth, options.tracks);
		self.drawTracks(options.tracks, options.numrows);
	},
	makeLayout: function(divid, numrows, leftwidth, width, rightwidth, tracks) {
		// the aim here is to make divs for rapha objects necessary, and assign a raphael object (and area therein) to a row/track
		// to implement another kind of layout, this method should be overridden in a subclass
		var self = this;
		var rowheight = 0;
		for(var ti=0; ti < tracks.length; ti++) rowheight += tracks[ti].height;
		var totwidth = leftwidth + width + rightwidth;
		for(var ri=0; ri < numrows; ri++) // make rows
			jQuery('#'+divid).append("<div id='"+divid+"_row_"+ri+"' style='width:"+totwidth+"px;height:"+rowheight+"px;'></div>");
		for(var ri=0; ri < numrows; ri++) { // make left/right/tracks within rows
			for(var ti=0; ti < tracks.length; ti++) {
				jQuery('#'+divid+"_row_"+ri).append("<span id='"+divid+"_row_"+ri+"_left_"+ ti+"' style='width:"+leftwidth+"px;height:"+tracks[ti].height+"px;'></span>");
				jQuery('#'+divid+"_row_"+ri).append("<span id='"+divid+"_row_"+ri+"_track_"+ti+"' style='width:"+width+"px;height:"+tracks[ti].height+"px;'></span>");
				jQuery('#'+divid+"_row_"+ri).append("<span id='"+divid+"_row_"+ri+"_right_"+ti+"' style='width:"+rightwidth+"px;height:"+tracks[ti].height+"px;'></span>");
			}
		}
		self.rowtrackRapha = [];
		for(var ri=0; ri < numrows; ri++) { // make raphael canvas within each row-track-div
			self.rowtrackRapha.push([]);
			for(var ti=0; ti < tracks.length; ti++) {
				var rightdiv = divid+"_row_"+ri+"_right_"+ti; var leftdiv = divid+"_row_"+ri+"_left_"+ti;
				var trackdiv = divid+"_row_"+ri+"_track_"+ti;
				self.rowtrackRapha[ri].push( {rapha:Raphael(divid+"_row_"+ri+"_track_"+ti, width, tracks[ti].height), extents:[0,0,width,tracks[ti].height], leftdivid:leftdiv, rightdivid:rightdiv, trackdiv:trackdiv} );
			}
		}
	},
	getRowTrackAssets: function(ri,ti) {
		// returns assets created in makeLayout - this will need to be overridden in a subclass that overrides makeLayout
		var self = this;
		return self.rowtrackRapha[ri][ti];
	},
	drawTracks: function(tracks, numrows) {
		var self = this;
		for(var ti=0; ti < tracks.length; ti++) {
			var raphadivs = [];
			for(var ri=0; ri < numrows; ri++) {
				raphadivs.push(self.getRowTrackAssets(ri,ti));
			}
			for(var pi=0; pi < tracks[ti].painters.length; pi++) {
				var ap = tracks[ti].painters[pi];
				ap.raphadivs = raphadivs; ap.basedivid = self.divid;
				if(ap.type=="Biojs.ObservedSequencePainter") {
					var painter = new Biojs.ObservedSequencePainter(ap);
					painter.paint();
				}
				else if(ap.type=="Biojs.ZoombarPainter") {
					var painter = new Biojs.ZoombarPainter(ap);
					painter.paint();
				}
			}
		}
	}
});
