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
		self.config['rapha'] = Raphael(self.config['divid'], self.config['size']+"px", self.config['size']+"px");

		jQuery.ajax({
			url: 'http://'+self.config.serverport+'/pdbe-apps/widgets/topology',
			data: {'topodata':'topodata', 'pdbid':self.config["pdbid"], 'chain':self.config["chainid"]},
			dataType: 'script',
			crossDomain: 'true',
			type: 'GET',
			success: function(response, callOptions) { self.topoLayout(topodata); }
		});
	},

	topoLayout: function(topodata) {
		var self = this;
		if(self.checkDataSanity(topodata) == false) { alert("Data error!! Cannot continue."); return; }
		// loops
		for(var ci=0; ci < topodata.coils.length; ci++) {
			var ass = topodata.coils[ci];
			var looppath = [];
			var attrib = {'stroke-width':1};
			if(ass.start == -1 && ass.stop == -1) attrib = {'stroke-dasharray':'--'};
			for(var pi=0; pi < ass.path.length; pi+=2) {
				looppath.push(ass.path[pi]); looppath.push(ass.path[pi+1]);
			}
			looppath = self.spliceMLin(looppath);
			self.config.rapha.path(looppath).attr(attrib);
			if(ass.start != -1 && ass.stop != -1) self.makeResidueSubpaths(looppath, ass.start, ass.stop);
		}
		// strand
		for(var ci=0; ci < topodata.strands.length; ci++) {
			var ass = topodata.strands[ci];
			var looppath = [];
			var attrib = {'stroke-width':1, 'fill':'90-#000-#000:50-#fff:50-#fff'};
			for(var pi=0; pi < ass.path.length; pi+=2) {
				looppath.push(ass.path[pi]); looppath.push(ass.path[pi+1]);
			}
			looppath = self.spliceMLin(looppath); looppath.push("Z");
			self.config.rapha.path(looppath).attr(attrib);
			var respath = [ "M", ass.path[6], ass.path[7], "L",
				(ass.path[0]+ass.path[12])/2, (ass.path[1]+ass.path[13])/2 ];
			self.makeResidueSubpaths(respath, ass.start, ass.stop);
		}
		// helices
		for(var ci=0; ci < topodata.helices.length; ci++) {
			var ass = topodata.helices[ci];
			var attrib = {'stroke-width':1, 'fill':'90-#000-#000:50-#fff:50-#fff'};
			var sx = ass.path[0]; var sy = ass.path[1];
			var ex = ass.path[2]; var ey = ass.path[3];
			var rx = ass.majoraxis; var ry = ass.minoraxis*1.3;
			lf1 = 0; lf2 = 0; lf3 = 0; // flags for proper elliptical arcs
			sf1 = 0; sf2 = 0; sf3 = 0;
			if(sy < ey) {
				lf1 = 1; lf2 = 1; lf3 = 1;
				sf1 = 1; sf2 = 1; sf3 = 1;
			}
			cylpath = ["M", sx, ey, "L", sx, sy, "A", rx, ry, 180, lf1, sf1, ex, sy, "L", ex, ey,"A", rx, ry, 180, lf3, sf3, sx, ey , "Z"];
			self.config.rapha.path(cylpath).attr(attrib);
			if(sy < ey) { resy1 = sy-ry; resy2 = ey+ry; }
			else        { resy1 = sy+ry; resy2 = ey-ry; }
			var respath = [ "M", (sx+ex)/2, resy1, "L", (sx+ex)/2, resy2 ];
			self.makeResidueSubpaths(respath, ass.start, ass.stop);
		}
		// terms
		for(var ci=0; ci < topodata.terms.length; ci++) {
			var ass = topodata.terms[ci];
			var attrib = {'stroke-width':1};
			var looppath = [];
			for(var pi=0; pi < ass.path.length; pi+=2) {
				looppath.push(ass.path[pi]); looppath.push(ass.path[pi+1]);
			}
			looppath = self.spliceMLin(looppath); looppath.push("Z");
			self.config.rapha.path(looppath).attr(attrib);
			self.config.rapha.path(looppath).attr(attrib);
			var respath = [ "M", (ass.path[0]+ass.path[2]+ass.path[4]+ass.path[6])/4, ass.path[7],
			                "L", (ass.path[0]+ass.path[2]+ass.path[4]+ass.path[6])/4, ass.path[3] ];
			if(ass.start != -1 && ass.stop != -1) self.makeResidueSubpaths(respath, ass.start, ass.stop);
		}
		
		// final resizing
		var minx = topodata.extents[0]; var miny = topodata.extents[1];
		var maxx = topodata.extents[2]; var maxy = topodata.extents[3];
		var margin = 50;
		self.config.rapha.setViewBox(minx-margin, miny-margin, maxx-minx+2*margin, maxy-miny+2*margin, true);
	},

	makeResidueSubpaths: function(fullpath, startresi, stopresi) {
		var self = this;
		var unitlen = Raphael.getTotalLength(fullpath)/(stopresi-startresi+1);
		for(var ri=0; ri < stopresi-startresi+1; ri++) {
			var subpath = Raphael.getSubpath(fullpath, unitlen*ri, unitlen*(ri+1));
			self.config.rapha.path(subpath).attr({'stroke':self.randomColor(),'stroke-width':10, 'stroke-opacity':0.3});
		}
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

	topoLayout_1: function(topodata) {
		var self = this;
		//self.sanitycheckLayout(); return;
		var chainpath = [];
		var sstypes = {coils:"red", strands:"green", helices:"blue", terms:'purple'};
		// using only start, stop, path properties of ss elements in json
		var sortedcoils = [];
		for(var st in sstypes) { // just join all sec str elems in an array
			eval("var sselems = topodata."+st+";");
			for(var ci=0; ci < sselems.length; ci++) {
				var ass = sselems[ci];
				ass.sstype = st;
			}
		}
		//sortedcoils = self.sortSSonStart(sortedcoils);
		for(var ci=0; ci < sortedcoils.length; ci++) { // using only start, stop, path properties of ss elements in json
			var acoil = sortedcoils[ci];
			var st = acoil.sstype;
			//alert(acoil.start + " " + acoil.stop);
			var ssshape = [];
			for(var pi=0; pi < acoil.path.length; pi+=2) {
				var x = acoil.path[pi];
				var y = acoil.path[pi+1];
				//self.config.rapha.circle(x,y,Math.random(5)+5).attr({'fill':sstypes[st],'fill-opacity':0.5});
				if(st=="coils") { // merely add to the overall chain path
					self.addChainPath(chainpath, acoil, x, y);
				}
				if(st=="strands") { // make ss-path and add intersection points to chain path
					ssshape.push(x); ssshape.push(y);
					//if(pi==6) { self.addChainPath(chainpath, acoil, x, y); }
					//if(pi==0) { self.addChainPath(chainpath, acoil, 
							//((acoil.path[12]+acoil.path[0])/2), ((acoil.path[13]+acoil.path[1])/2) ); }
				}
				if(st=="helices") { // make ss-path and add intersection points to chain path
					ssshape.push(x); ssshape.push(y);
					if(pi==0) {
						var x1 = acoil.path[2]; var y1 = acoil.path[3];
						//self.addChainPath(chainpath, acoil, (x+x1)/2, y);
						//self.addChainPath(chainpath, acoil, (x+x1)/2, y1);
					}
				}
				if(st=="terms") { // make ss-path and add intersection points to chain path
					ssshape.push(x); ssshape.push(y);
					if(pi==0) {
						//self.addChainPath(chainpath, acoil, 
								//(acoil.path[0]+acoil.path[2]+acoil.path[4]+acoil.path[6])/4,
								//(acoil.path[1]+acoil.path[3]+acoil.path[5]+acoil.path[7])/4 );
					}
				}
			}
			if(st=="strands" || st=="terms") {
				ssshape = self.spliceMLin(ssshape);
				//if(st=="terms") alert(ssshape);
				ssshape.push("Z");
				self.config.rapha.path(ssshape);
			}
			if(st=="helices") {
				ssshape.push("Z");
				x1 = ssshape[0]; y1 = ssshape[1];
				x2 = ssshape[2]; y2 = ssshape[3];
				ssshape = ["M", x1,y1, "L", x1,y2, "L", x2,y2, "L", x2,y1, "Z"];
				self.config.rapha.path(ssshape);
			}
		}
		//for(var ci=0; ci<chainpath.length; ci+=2) self.config.rapha.circle(chainpath[ci],chainpath[ci+1],Math.random(5)+5);
		// make residue-wise highlight elements
		for(var ci=0; ci < sortedcoils.length; ci++) {
			var acoil = sortedcoils[ci];
			if(!("cpi" in acoil) || acoil.start < 0) continue;
			//alert("SS " + ci + " has " + acoil.sstype + " " + acoil.cpi + " " + acoil.start + ":" + acoil.stop);
			var numres = acoil.stop-acoil.start+1;
			var apath = [];
			for(var crdi=0; crdi < acoil.cpi.length; crdi++) {
				apath.push(chainpath[ acoil.cpi[crdi] ]);
				apath.push(chainpath[ acoil.cpi[crdi]+1 ]);
			}
			//alert("HERE 1 " + apath);
			apath = self.spliceMLin(apath);
			//alert("HERE 1 " + apath);
			var unitlen = Raphael.getTotalLength(apath)/numres;
			//apath = self.config.rapha.path(apath).attr({'stroke-width':2,'stroke':'black'});
			//alert("UNITLEN " + unitlen + " "  + numres);
			for(var ri=0; ri<=acoil.stop-acoil.start; ri++) {
				var subpath = Raphael.getSubpath(apath, unitlen*ri, unitlen*(ri+1));
			//alert("SPATH " + unitlen + " " + ri);
				self.config.rapha.path(subpath).attr({'stroke':self.randomColor(),'stroke-width':4});
			}
		}
		// make chain-wide path
		chainpath = self.spliceMLin(chainpath); //.splice(0,0,"M"); chainpath.splice(3,0,"L");
		var chainpathelem = self.config.rapha.path(chainpath).attr({'stroke-width':1});
		// resize to bounding box of chainpath, leave margins
		bbox = chainpathelem.getBBox();
		self.config.rapha.setViewBox(bbox.x-50, bbox.y-50, bbox.width+100, bbox.height+100, true);
	},

	sortSSonStart: function(sortedcoils) {
		for(var ci=0; ci < sortedcoils.length; ci++) { // sort coils
			for(var ck=ci+1; ck < sortedcoils.length; ck++) {
				if(sortedcoils[ci].start < sortedcoils[ck].start) continue;
				var tempcoil = sortedcoils[ci];
				sortedcoils[ci] = sortedcoils[ck];
				sortedcoils[ck] = tempcoil;
			}
		}
//		for(var ci=0; ci < sortedcoils.length; ci++) alert(sortedcoils[ci].start + " " + sortedcoils[ci].st);
	},

	addChainPath: function(chainpath, ass, x, y) {
		chainpath.push(x);
		chainpath.push(y);
		try { ass.cpi.push(chainpath.length-2); }
		catch(err) { ass.cpi = [chainpath.length-2]; }
	},

	randomColor: function() {
		var charB16 = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		var retcol = '#';
		for (var ci=0; ci<6; ci++) retcol += charB16[Math.floor(Math.random()*15.999)];
    	return retcol;
	},

	spliceMLin: function(apath) {
		apath.splice(0,0,"M"); apath.splice(3,0,"L");
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
