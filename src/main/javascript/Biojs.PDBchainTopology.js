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
	opt: { target: "YourOwnDivId", chainid:"A", pdbid:"1cbs" },

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
		self.sanitycheckLayout();
		var chainpath = [];
		var sstypes = {coils:"red", strands:"green", helices:"blue", terms:'purple'};
		// using only start, stop, path properties of ss elements in json
		var sortedcoils = [];
		for(var st in sstypes) { // order ss elems based on start
			eval("var coils = topodata."+st+";");
			for(var ci=0; ci < coils.length; ci++) {
				//if(coils[ci].start == -1 || coils[ci].stop == -1) continue;
				coils[ci].sstype = st;
				sortedcoils.push(coils[ci]);
			}
		}
		for(var ci=0; ci < sortedcoils.length; ci++) { // sort coils
			for(var ck=ci+1; ck < sortedcoils.length; ck++) {
				if(sortedcoils[ci].start < sortedcoils[ck].start) continue;
				var tempcoil = sortedcoils[ci];
				sortedcoils[ci] = sortedcoils[ck];
				sortedcoils[ck] = tempcoil;
			}
		}
		//for(var ci=0; ci < sortedcoils.length; ci++) alert(sortedcoils[ci].start + " " + sortedcoils[ci].st);
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
					if(pi==6) { self.addChainPath(chainpath, acoil, x, y); }
					if(pi==0) { self.addChainPath(chainpath, acoil, 
							((acoil.path[12]+acoil.path[0])/2), ((acoil.path[13]+acoil.path[1])/2) ); }
				}
				if(st=="helices") { // make ss-path and add intersection points to chain path
					ssshape.push(x); ssshape.push(y);
					if(pi==0) {
						var x1 = acoil.path[2]; var y1 = acoil.path[3];
						self.addChainPath(chainpath, acoil, (x+x1)/2, y);
						self.addChainPath(chainpath, acoil, (x+x1)/2, y1);
					}
				}
				if(st=="terms") { // make ss-path and add intersection points to chain path
					ssshape.push(x); ssshape.push(y);
					if(pi==0) {
						self.addChainPath(chainpath, acoil, 
								(acoil.path[0]+acoil.path[2]+acoil.path[4]+acoil.path[6])/4,
								(acoil.path[1]+acoil.path[3]+acoil.path[5]+acoil.path[7])/4 );
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
		var sanityAttribs = {"checksanity":0};
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
