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
 *    <li>pdbid: PDB entry id containing the protein chain of interest.</li>
 *    <li>chainid: Chain id of the protein chain.</li>
 *    <li>divid: Id of div in which the topology is to be rendered.</li>
 *    <li>size: Dimensions of the square canvas on which topology will be drawn.</li>
 *    </ul>
 *    
 * @example 
 * var mytopo = new Biojs.PDBchainTopology({
 * 		divid:"YourOwnDivId",   pdbid:"1cbs", chainid:"A"
 * });	
 * 
 */

if(typeof PDBchainTopologyRegistry == 'undefined') PDBchainTopologyRegistry = {};
var topoSelectorChanged = function(divid) {
	var topowidget = PDBchainTopologyRegistry[divid];
	topowidget.showDomains();
}
var activesiteClicked = function(divid) {
	var topowidget = PDBchainTopologyRegistry[divid];
	topowidget.showActivesite("square");
	//topowidget.showActivesite("diamond");
	//topowidget.showActivesite("circle");
}

Biojs.PDBchainTopology = Biojs.extend (
/** @lends Biojs.PDBchainTopology# */
{
	/**
	*  Default values for the options
	*  @name Biojs.PDBchainTopology-opt
	*/
	opt: { divid: "YourOwnDivId", chainid:"A", pdbid:"1cbs", size:700 },

	constructor: function (options) {
		var self = this;

		// internal config options - not to be exposed to end-user as of now
		var defconf = {size:700, serverport:"chrystal.ebi.ac.uk:16800" };

		self.config = self.opt;
		for(var akey in defconf) {
			if(!self.config[akey]) self.config[akey] = defconf[akey];
		}

		PDBchainTopologyRegistry[self.config.divid] = self;

		self.config.menudiv = 'topo_menu_'+self.config.divid;
		self.config.resdiv = 'topo_resinfo_'+self.config.divid;
		self.config.domseldiv = 'topo_domsel_'+self.config.divid;
		self.config.ascheckbox = 'topo_ascheckbox_'+self.config.divid;
		var newdivs = "<div id='topo_rapha_"+self.config.divid+"'></div>";
		newdivs += "<div id='"+self.config.menudiv+"'>";
		var selstr = "<select id='"+self.config.domseldiv+"' onchange=topoSelectorChanged('"+self.config.divid+"')>";
		for(domtype in {Domains:1,SCOP:1,CATH:1,PFAM:1}) selstr += "<option value='"+domtype+"'>"+domtype+"</option>"
		selstr += "</select>";
		newdivs += "<span>"+selstr+"</span>";
		newdivs += "      <span><input type='checkbox' id='"+self.config.ascheckbox+"' onchange=activesiteClicked('"+self.config.divid+"')>Active site</input></span>";
		newdivs += "<span id='"+self.config.resdiv+"'></span>";
		newdivs += "</div>";
		document.getElementById(self.config['divid']).innerHTML = newdivs;

		self.config['rapha'] = Raphael('topo_rapha_'+self.config['divid'], self.config['size']+"px", self.config['size']+"px");

		self.previousDomainElems = null; // for clearing out any previous domain rendering
		self.previousActivsiteElems = null;
		self.respaths = []; // essential to store hoverable residue elems so that they can be brought 'up' after rendeing domain
		self.resi2paths = {};
		self.thinssXscale = 0.5; self.allYscale = 1.;
		self.curvyloops = true;
		self.loopdip = 'useArea';

		jQuery.ajax({
			url: 'http://'+self.config.serverport+'/pdbe-apps/widgets/topology',
			data: {'topodata':'topodata', 'pdbid':self.config["pdbid"], 'chain':self.config["chainid"]},
			dataType: 'script',
			crossDomain: 'true',
			type: 'GET',
			success: function(response, callOptions) { self.topodata = topodata; self.topoLayout(); }
		});
	},

	intervalIntersection: function(ssstart,ssstop, fromresindex,tillresindex) {
		var start = ssstop + 10, stop = ssstart - 10;
		for(var ri=ssstart; ri<=ssstop; ri++) {
			if(ri < fromresindex || ri > tillresindex) continue;
			if(start > ri) start = ri;
			if(stop < ri) stop = ri;
		}
		var fracstart = (start-ssstart) *100.00 / (ssstop-ssstart+1)
		var fracstop  = (stop+1-ssstart)*100.00 / (ssstop-ssstart+1)
		return [start, stop, fracstart, fracstop];
	},

	// fill any strands in this range, both ends inclusive
	fillStrands: function(strands, fromresindex, tillresindex) {
		var self = this;
		for(var si=0; si < strands.length; si++) {
			var ass = strands[si];
			if(ass.start > tillresindex || ass.stop < fromresindex) continue;
			var startstop = self.intervalIntersection(ass.start, ass.stop, fromresindex, tillresindex);
			var start = startstop[0], stop = startstop[1], fracstart = startstop[2], fracstop = startstop[3];
			if(ass.direction=="down") { fracstart1 = 100-fracstop; fracstop1 = 100-fracstart; fracstart = fracstart1; fracstop = fracstop1; } 
			var color = self.domcolor, bgcol = '#fff';//, fracstart = 20, fracend = 60;
			//alert(ass.start + " " + ass.stop + " " + fromresindex + " " + tillresindex + " " + start + " " + stop + " " + fracstart + " " + fracstop);
			var halfgradattrib = {'fill-opacity':0.5, 'fill':'90-'+bgcol+':0-'+bgcol+':'+fracstart+'-'+color+':'+fracstart+'-'+color+':'+fracstop+'-'+bgcol+':'+fracstop+'-'+bgcol+':100'};
			ass.gelem.clone().attr(halfgradattrib);
		}
	},

	// fill any loops in this range, both ends inclusive
	fillLoops: function(coils, fromresindex, tillresindex) {
		var self = this;
		for(var si=0; si < coils.length; si++) {
			var ass = coils[si];
			var startstop = self.intervalIntersection(ass.start, ass.stop, fromresindex, tillresindex);
			var fstart = startstop[2], fstop = startstop[3];
			var looppath = self.makeLoopPathArray(ass.path);
			var fulllength = Raphael.getTotalLength(looppath);
			subpath = Raphael.getSubpath(looppath, fstart*fulllength, fstop*fulllength);
			var broadstrokeattr = {'stroke-width':'5px','stroke':self.domcolor};
			self.config.rapha.path(subpath).attr(broadstrokeattr);
		}
	},

	showActivesite: function(marktype) {
		var self = this;
		var topodata = self.topodata;
		if(self.previousActivsiteElems != null) { self.previousActivsiteElems.remove(); self.previousActivsiteElems = null; }
		if(document.getElementById(self.config.ascheckbox).checked == false) return;
		self.config.rapha.setStart();
		var dim = 3;
		for(var ri in self.resi2paths) {
			if(Math.random() > 0.1) continue;
			for(var rpi=0; rpi < self.resi2paths[ri].length; rpi++) {
				var rpk = self.resi2paths[ri][rpi];
				var rp = self.respaths[rpk];
				var xyd = rp.getPointAtLength( rp.getTotalLength()/2 );
				var x = xyd.x, y = xyd.y, alpha = Math.PI/180 * xyd.alpha;
				var ca = Math.cos(alpha), sa = Math.sin(alpha);
				if(marktype=="square")
					self.config.rapha.path(["M",x-dim,y-dim,"L",x-dim,y+dim,"L",x+dim,y+dim,"L",x+dim,y-dim,"Z"]).attr({fill:'blue'});
				else if(marktype=="diamond")
					self.config.rapha.path(["M",x-dim,y,"L",x,y+dim,"L",x+dim,y,"L",x,y-dim,"Z"]).attr({fill:'green'});
				else
					self.config.rapha.circle(x,y,dim).attr({fill:'red'});
			}
		}
		self.previousActivsiteElems = self.config.rapha.setFinish();
		return;
	},

	showDomains: function() {
		var self = this;
		var topodata = self.topodata;
		if(self.previousDomainElems != null) { self.previousDomainElems.remove(); self.previousDomainElems = null; }
		var dstart = null, dstop = null, domtype = document.getElementById(self.config.domseldiv).value;
		if(domtype=="Domains") return;
		eval("var domdata = self.topodata.domains."+domtype+";");
		//alert(self.topodata.domains + " " + domdata);
		self.config.rapha.setStart();
		for(domid in domdata) {
			var dominfo = domdata[domid];
			for(di=0; di < dominfo.length; di++) { // domain instance
				self.domcolor = self.randomDomColor(domtype);
				for(si=0; si < dominfo[di].length; si++) { // segment in instance
					dstart = dominfo[di][si][0]; dstop = dominfo[di][si][1];
					self.fillLoops  (topodata.coils,   dstart, dstop);
					self.fillStrands(topodata.strands, dstart, dstop);
					self.fillStrands(topodata.helices, dstart, dstop);
					self.fillStrands(topodata.terms,   dstart, dstop);
				}
			}
		}
		self.previousDomainElems = self.config.rapha.setFinish();
		for(var spi=0; spi < self.respaths.length; spi++) self.respaths[spi].toFront();
		return;
		self.config.rapha.setStart();
		dstart = Math.floor(Math.random()*100); dstop = Math.floor(dstart + Math.random()*100);
		self.fillLoops  (topodata.coils,   dstart, dstop);
		self.fillStrands(topodata.strands, dstart, dstop);
		self.fillStrands(topodata.helices, dstart, dstop);
		self.fillStrands(topodata.terms,   dstart, dstop);
		self.previousDomainElems = self.config.rapha.setFinish();
	},
		// some sample code for gradient fill
		//var halfgradattrib = {'fill':'90-#000-#000:50-#fff:50-#fff'};
		//var attrib1 = {'stroke-width':1, 'fill':'45-#fff:0-#fff:60-#00f:60-#00f:100-145-#fff:0-#fff:60-#00f:60-#00f:100', 'fill-opacity':0.1, 'opacity':0.1};
		//fstr = '45';
		//for(fi=0; fi < 5; fi++) {
			//fk = 20*fi;
			//fstr += '-#f00:'+(fk+2)+"-#f00:"+(fk+7)
			//fstr += '-#0f0:'+(fk+12)+"-#0f0:"+(fk+17)
		//}
		//var attrib = {'stroke-width':1, 'fill':fstr, 'fill-opacity':0.2, 'opacity':0.1};

	joinDicts: function(d1,d2) {
		var newd = {};
		for(k in d1) newd[k] = d1[k];
		for(k in d2) newd[k] = d2[k];
		return newd;
	},

	makeLoopPathArray: function(path) {
		var self = this;
		if(self.curvyloops == false) return self.spliceMLin(path,"L");
		var looppath = [];
		// get rid of points with same x coordinate
		for(var pi=0; pi < path.length; pi+=2) {
			if(pi < path.length-2 && looppath.length >= 2 && Math.abs(path[pi+2]-path[pi]) < 1e-3 && Math.abs(path[pi]-looppath[looppath.length-2]) < 1e-3) {
				continue;
			}
			looppath.push(path[pi]); looppath.push(path[pi+1]);
		}
		//for(var pi=0; pi < looppath.length; pi+=2) self.config.rapha.circle(looppath[pi], looppath[pi+1], 2);
		// make curves depending on how many points in path
		var IST = "S";
		if(looppath.length == 4)
			looppath = self.spliceMLin(looppath,"L");
		else if(looppath.length == 6)
			//looppath = self.spliceMLin(looppath,"L");
			looppath = self.spliceMLin(looppath,IST);
		else if(looppath.length == 8) {
			scheme = 4;
			if(scheme==1) {
				newpath = []
				midx = (looppath[2]+looppath[4])/2; midy = (looppath[3]+looppath[5])/2;
				newpath = newpath.concat(["M",midx,midy]);
				newpath = newpath.concat([IST,looppath[2],looppath[3],looppath[0],looppath[1]])
				newpath = newpath.concat(["M",midx,midy]);
				newpath = newpath.concat([IST,looppath[4],looppath[5],looppath[6],looppath[7]])
				looppath = newpath;
			}
			else if(scheme==2) {
				newpath = []
				midx = (looppath[2]+looppath[4])/2; midy = (looppath[3]+looppath[5])/2;
				newpath = newpath.concat(["M",looppath[0],looppath[1]]);
				newpath = newpath.concat([IST,looppath[2],looppath[3],midx,midy])
				newpath = newpath.concat(["M",looppath[6],looppath[7]]);
				newpath = newpath.concat([IST,looppath[4],looppath[5],midx,midy])
				looppath = newpath;
			}
			else if(scheme==3) {
				newpath = []
				midx = (looppath[2]+looppath[4])/2; midy = (looppath[3]+looppath[5])/2;
				newpath = newpath.concat(["M",looppath[0],looppath[1]]);
				newpath = newpath.concat([IST,looppath[2],looppath[3],midx,midy])
				newpath = newpath.concat([IST,looppath[4],looppath[5],looppath[6],looppath[7]])
				looppath = newpath;
			}
			else 
				looppath = self.spliceMLin(looppath,"C");
		}
		else if(looppath.length == 12) {
			//looppath = self.spliceMLin(looppath,"L");
			//looppath = self.insertMidpoints(looppath);
			newpath = [];
			newpath = ["M",looppath[0],looppath[1]];
			midx = (looppath[2]+looppath[4])/2; midy = (looppath[3]+looppath[5])/2;
			newpath = newpath.concat([IST,looppath[2],looppath[3],midx,midy]);
			midx = (looppath[4]+looppath[6])/2; midy = (looppath[5]+looppath[7])/2;
			newpath = newpath.concat([IST,looppath[4],looppath[5],midx,midy]);
			midx = (looppath[6]+looppath[8])/2; midy = (looppath[7]+looppath[9])/2;
			newpath = newpath.concat([IST,looppath[6],looppath[7],midx,midy]);
			newpath = newpath.concat([IST,looppath[8],looppath[9],looppath[10],looppath[11]]);
			looppath = newpath;
			//looppath = self.spliceMLin(looppath,"S");
			//midx = (looppath[2]+looppath[4])/2; midy = (looppath[3]+looppath[5])/2;
			//newpath = newpath.concat([IST,looppath[2],looppath[3],midx,midy])
			//midx = (looppath[6]+looppath[8])/2; midy = (looppath[7]+looppath[9])/2;
		}
		else {
			alert("unexpected path legth!! " + looppath.length);
			looppath = self.spliceMLin(looppath,"L");
		}
		return looppath;
	},

	insertMidpoints: function(path) {
		var newpath = [];
		for(var pi=0; pi < path.length; pi+=2) {
			newpath.push( path[pi] ); newpath.push( path[pi+1] );
			if(pi < path.length-2) {
				newpath.push( (path[pi+0]+path[pi+2])/2 );
				newpath.push( (path[pi+1]+path[pi+3])/2 );
			}
		}
		return newpath;
	},


	scaleX: function(x1,x2) {
		var self = this;
		// thin down along X axis
		var xdiff = (x1-x2)/2. * (1-self.thinssXscale);
		return [x1-xdiff, x2+xdiff];
	},


	findExtents: function() {
		var self = this;
		var sstypes = {coils:"red", strands:"green", helices:"blue", terms:'purple'};
		var minx=1e10, miny=1e10, maxx=-1e10, maxy=-1e10;
		for(var st in sstypes) {
			eval("var sselems = self.topodata."+st+";");
			for(var ci=0; ci < sselems.length; ci++) {
				var ass = sselems[ci];
				for(var pi=0; pi < ass.path.length; pi+=2) {
					if(minx > ass.path[pi+0]) minx = ass.path[pi+0];
					if(miny > ass.path[pi+1]) miny = ass.path[pi+1];
					if(maxx < ass.path[pi+0]) maxx = ass.path[pi+0];
					if(maxy < ass.path[pi+1]) maxy = ass.path[pi+1];
				}
			}
		}
		return [minx,miny,maxx,maxy];
	},
	scaleYall: function() {
		var self = this;
		var sstypes = {coils:"red", strands:"green", helices:"blue", terms:'purple'};
		for(var st in sstypes) {
			eval("var sselems = self.topodata."+st+";");
			for(var ci=0; ci < sselems.length; ci++) {
				var ass = sselems[ci];
				for(var pi=0; pi < ass.path.length; pi+=2) {
					ass.path[pi+1] = ass.path[pi+1] * self.allYscale;
				}
			}
		}
	},
	findPathExtents: function(path) {
		var minx=1e10, miny=1e10, maxx=-1e10, maxy=-1e10;
		for(var pi=0; pi < path.length; pi+=2) {
			if(maxx < path[pi+0]) maxx = path[pi+0];
			if(maxy < path[pi+1]) maxy = path[pi+1];
			if(minx > path[pi+0]) minx = path[pi+0];
			if(miny > path[pi+1]) miny = path[pi+1];
		}
		return [minx, miny, maxx, maxy];
	},

	editLoopsHorizontals: function() {
		var self = this;
		for(var ci=0; ci < self.topodata.coils.length; ci++) {
			var ass = self.topodata.coils[ci];
			var ext = self.findPathExtents(ass.path);
			var minx=ext[0], miny=ext[1], maxx=ext[2], maxy=ext[3];
			var area = (maxx-minx) * (maxy-miny);
			for(var pi=0; pi < ass.path.length; pi+=2) {
				if(pi > ass.path.length-4 || pi < 2) continue; // must have 1 point before, 2 after
				if( Math.abs(ass.path[pi+1]-ass.path[pi+3]) > 1e-3 ) continue; // must be in horizontal segment, same Y
				if( Math.abs(ass.path[pi+0]-ass.path[pi-2]) > 1e-3 ) continue; // segment should have vertical nbrs, same X
				if( Math.abs(ass.path[pi+2]-ass.path[pi+4]) > 1e-3 ) continue; // segment should have vertical nbrs, same X
				if( (ass.path[pi+1]-ass.path[pi-1])*(ass.path[pi+3]-ass.path[pi+5]) < 0 ) continue; // nbrs shd go in same Y direction
				var dy = self.loopdip;
				if(self.loopdip == 'useArea') dy = area/2500;
				if( (ass.path[pi+1]-ass.path[pi-1]) < 0 ) { // nbrs go up
					ass.path[pi+1] = ass.path[pi+1] - dy;
					ass.path[pi+3] = ass.path[pi+3] - dy;
				}
				else {
					ass.path[pi+1] = ass.path[pi+1] + dy;
					ass.path[pi+3] = ass.path[pi+3] + dy;
				}
			}
		}
	},

	topoLayout: function() {
		var self = this;
		var topodata = self.topodata;
		self.scaleYall();
		self.editLoopsHorizontals();
		if(self.checkDataSanity(topodata) == false) { alert("Data error!! Cannot continue."); return; }
		var ssattrib = {'stroke-width':1,'stroke':'#aaa'};
		var unmappedattrib = {'stroke-dasharray':'--','stroke':'#aaa'};
		// loops
		for(var ci=0; ci < topodata.coils.length; ci++) {
			var ass = topodata.coils[ci];
			var looppath = [], attribs = {};
			if(ass.start == -1 && ass.stop == -1) attribs = unmappedattrib;
			else attribs = ssattrib;
			var looppath = self.makeLoopPathArray(ass.path);
			self.config.rapha.path(looppath).attr(attribs);
			if(ass.start != -1 && ass.stop != -1) self.makeResidueSubpaths(looppath, ass.start, ass.stop);
		}
		// strand
		for(var ci=0; ci < topodata.strands.length; ci++) {
			var ass = topodata.strands[ci];
			var looppath = [];
			for(var xi=0; xi < 3; xi++) {
				xj = 2*xi; xk = 12-2*xi;
				var sxex = self.scaleX(ass.path[xj],ass.path[xk]);
				ass.path[xj] = sxex[0] ; ass.path[xk] = sxex[1];
			}
			for(var pi=0; pi < ass.path.length; pi+=2) {
				looppath.push(ass.path[pi]); looppath.push(ass.path[pi+1]);
			}
			looppath = self.spliceMLin(looppath); looppath.push("Z");
			ass.gelem = self.config.rapha.path(looppath).attr(ssattrib);
			var respath = [ "M", ass.path[6], ass.path[7], "L",
				(ass.path[0]+ass.path[12])/2, (ass.path[1]+ass.path[13])/2 ];
			if (ass.path[1] > ass.path[7]) ass.direction = "up";
			else ass.direction = "down";
			self.makeResidueSubpaths(respath, ass.start, ass.stop, "yes");
		}
		// helices
		for(var ci=0; ci < topodata.helices.length; ci++) {
			var ass = topodata.helices[ci];
			var sxex = self.scaleX(ass.path[0],ass.path[2]);
			var sx = sxex[0] , ex = sxex[1];
			var sy = ass.path[1]; var ey = ass.path[3];
			var rx = ass.majoraxis*self.thinssXscale; var ry = ass.minoraxis*1.3*self.allYscale;
			lf1 = 0; lf2 = 0; lf3 = 0; // flags for proper elliptical arcs
			sf1 = 0; sf2 = 0; sf3 = 0;
			if(sy < ey) {
				lf1 = 1; lf2 = 1; lf3 = 1;
				sf1 = 1; sf2 = 1; sf3 = 1;
			}
			cylpath = ["M", sx, ey, "L", sx, sy, "A", rx, ry, 180, lf1, sf1, ex, sy, "L", ex, ey,"A", rx, ry, 180, lf3, sf3, sx, ey , "Z"];
			ass.gelem = self.config.rapha.path(cylpath).attr(ssattrib);
			if(sy < ey) { resy1 = sy-ry; resy2 = ey+ry; ass.direction="down"; }
			else        { resy1 = sy+ry; resy2 = ey-ry; ass.direction="up"; }
			var respath = [ "M", (sx+ex)/2, resy1, "L", (sx+ex)/2, resy2 ];
			self.makeResidueSubpaths(respath, ass.start, ass.stop);
		}
		// terms
		for(var ci=0; ci < topodata.terms.length; ci++) {
			var ass = topodata.terms[ci];
			var looppath = [];
			for(var pi=0; pi < ass.path.length; pi+=2) {
				looppath.push(ass.path[pi]); looppath.push(ass.path[pi+1]);
			}
			looppath = self.spliceMLin(looppath); looppath.push("Z");
			ass.gelem = self.config.rapha.path(looppath).attr(ssattrib);
			var respath = [ "M", (ass.path[0]+ass.path[2]+ass.path[4]+ass.path[6])/4, ass.path[7],
			                "L", (ass.path[0]+ass.path[2]+ass.path[4]+ass.path[6])/4, ass.path[3] ];
			if(ass.start != -1 && ass.stop != -1) self.makeResidueSubpaths(respath, ass.start, ass.stop);
		}
		
		// final resizing
		var extents = self.findExtents();
		var minx = extents[0]; var miny = extents[1];
		var maxx = extents[2]; var maxy = extents[3];
		var margin = 50;
		self.config.rapha.setViewBox(minx-margin, miny-margin, maxx-minx+2*margin, maxy-miny+2*margin, true);
	},

	makeResidueSubpaths: function(fullpath, startresi, stopresi, reverse) {
		var self = this;
		var unitlen = Raphael.getTotalLength(fullpath)/(stopresi-startresi+1);
		for(var ri=0; ri < stopresi-startresi+1; ri++) {
			//var subpathattr = {'stroke':self.randomColor(),'stroke-width':14, 'stroke-opacity':0.1};
			var subpathattr = {'stroke':'white', 'stroke-width':14, 'stroke-opacity':0};
			var subpath = Raphael.getSubpath(fullpath, unitlen*ri, unitlen*(ri+1));
			var resindex = startresi + ri;
			if(reverse=="yes") resindex = stopresi - ri;
			var rp = self.config.rapha.path(subpath).attr(subpathattr).data("resindex",resindex).data("topowidget",self)
			.mouseover( function(e) {
				var resinfo = this.data("topowidget").getResInfo(this.data("resindex"));
				document.getElementById(self.config.resdiv).innerHTML = "  "+(resinfo[2]+"("+resinfo[0]+resinfo[1]+")").replace(/ /g,'');
			})
			.mouseout( function(e) {
				document.getElementById(self.config.resdiv).innerHTML = "";
			});
			self.respaths.push(rp);
			if(!self.resi2paths[resindex]) self.resi2paths[resindex] = [];
			self.resi2paths[resindex].push( self.respaths.length-1 );
		}
	},

	getResInfo: function(resindex) {
		var self = this;
		//alert(self.topodata.reslist + " " + resindex);
		return self.topodata.reslist[resindex];
	},

	checkDataSanity: function(topodata) {
		var sstypes = {coils:"red", strands:"green", helices:"blue", terms:'purple'};
		// using only start, stop, path properties of ss elements in json
		var sortedcoils = [];
		for(var st in sstypes) { // just join all sec str elems in an array
			eval("var sselems = topodata."+st+";");
			for(var ci=0; ci < sselems.length; ci++) {
				var ass = topodata['coils'][ci];
				if(ass.start == -1 && ass.stop == -1) ;
				else if(ass.start == -1 || ass.stop == -1) return false;
			}
		}
		return true;
	},

	randomDomColor: function(domtype) {
		var retcol = '#';
		var colspec = {'SCOP':[0,0,7], 'CATH':[0,7,0], 'PFAM':[7,0,0]}[domtype];
		var charB16 = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		for(var ci=0; ci < colspec.length; ci++) {
			var index = colspec[ci] + Math.floor(Math.random()*8);
			//alert(index);
			retcol += charB16[index];
		}
		return retcol;
	},

	randomColor: function() {
		var charB16 = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		var retcol = '#';
		for (var ci=0; ci<6; ci++) retcol += charB16[Math.floor(Math.random()*15.999)];
    	return retcol;
	},

	spliceMLin: function(apath, style) {
		if(!style) {
			apath.splice(0,0,"M"); apath.splice(3,0,"L");
		}
		else {
			apath.splice(0,0,"M"); apath.splice(3,0,style);
		}
		return apath;
	},

	sanitycheckLayout: function() {
		// just draw  few things for sanity check.... not directly useful in topology layout
		var self = this;
		var sanityAttribs = {"checksanity":1};
		self.config['rapha'].setStart();
		if(sanityAttribs.checksanity == 1) {
			self.config['rapha'].text(5,5,"Under construction").attr({'text-anchor':'start'});
			self.config['rapha'].path([ "M", 0, 0, "L", self.config["size"], self.config["size"] ]);
			self.config['rapha'].path([ "M", 0, self.config["size"], "L", self.config["size"], 0 ]);
			// check if an arbit path be drawn to go through a set of points
			self.config.rapha.circle(100,100,10);
			self.config.rapha.circle(150,50,10);
			self.config.rapha.circle(200,100,10);
			mypath = ["M", 100, 100, "T", 150, 50, "T", 200, 100];
			mypath = self.config.rapha.path(mypath);
			//mypath.glow({width:2, offsetx:10, offsety:10});
			c1 = self.config.rapha.path(["M", 100, 100, "L", 100, 150, 150, 150, 150, 100]);
			c2 = self.config.rapha.path(["M", 110, 110, "L", 110, 160, 160, 160, 160, 110]);
			alert( Raphael.pathIntersection(c1,c2) );
		}
		var sanityset = self.config['rapha'].setFinish();
		sanityset.attr(sanityAttribs);
	},

  /**
   * Array containing the supported event names
   * @name Biojs.PDBchainTopology-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.PDBchainTopology#onClick
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} selected Selected character.
	 * @example 
	 * instance.onClick(
	 *    function( objEvent ) {
	 *       alert("The character " + objEvent.selected + " was clicked.");
	 *    }
	 * ); 
	 * 
	 * */
	 "onClick",
	 
	/**
	 * @name Biojs.PDBchainTopology#onHelloSelected
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} textSelected Selected text, will be 'Hello' obviously.
	 * @example 
	 * instance.onHelloSelected(
	 *    function( objEvent ) {
	 *       alert("The word " + objEvent.textSelected + " was selected.");
	 *    }
	 * ); 
	 * 
	 * */
     "onHelloSelected"      
  ] 
});
