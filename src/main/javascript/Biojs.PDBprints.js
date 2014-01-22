/** 
 * This is the description of the PDBprints component. This component renders a set of icons to give a quick summary of salient features of a PDB entry.
 * See more info on PDBprints at http://pdbe.org/prints
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
 * @param {Object} options An object with the options for PDBprints component.
 *    
 * @option {list} targets
 *    This is a list of configuration options, each corresponding to PDBprints to be rendered in a div.
 *    Each config consists of following:
 *    <ul>
 *    <li>pdbids: PDB entry ids for which prints are to be rendered.</li>
 *    <li>divid: the id of div in which the prints are to be rendered.</li>
 *    <li>rapha: A Raphael object instead of div to render PDBprints into.</li>
 *    <li>startX: X-coordinate of point where rendering the array of PDBprints will start in the Raphael canvas
 *    <li>startY: Y-coordinate of point point where rendering the array of PDBprints will start in the Raphael canvas
 *    <li>interval: gap between successive PDBprints in a vertical or horizontal array
 *    <li>size: length of an icon logo in PDBprints
 *    <li>orient: vertical or horizontal rendering fo PDBprints
 *    </ul>
 *    
 * @example 
 * var instance = new Biojs.PDBprints({
 * 		targets : [
 *          {divid:"YourOwnDivId",     pdbids:["1aac","1cbs"]}
 *      ]
 * });	
 * 
 */
Biojs.PDBprints = Biojs.extend (
/** @lends Biojs.PDBprints# */
{
  /**
   *  Default values for the options
   *  @name Biojs.PDBprints-opt
   */
  opt: {
	target: "YourOwnDivId", rapha: null, pdbids:['2x9t']
  },
  
	constructor: function (options) {
		var self = this;
	  
		var defconf = {size:40, orient:'h', interval:10, startX:10, startY:10};

		// Make Raphael object if not provided already
		var deldiv = [];
		for(var ci=0; ci < self.opt.targets.length; ci++) {
			var config = self.opt.targets[ci];
			for(var akey in defconf) {
				if(!config[akey]) config[akey] = defconf[akey];
			}
			if(!config['rapha']) {
				var sizex = config.startX + config.size*8;
				var sizey = config.startY + (config.interval+config.size)*config.pdbids.length;
				if(config.orient == "v") {
					sizey = config.startY + config.size*8;
					sizex = config.startX + (config.interval+config.size)*config.pdbids.length;
				}
				config['rapha'] = Raphael(config['divid'], sizex, sizey);
			}
		}
		var pdbids = '';
		for(var rapha in self.opt.targets) {
			for(var pi=0; pi < self.opt.targets[rapha]['pdbids'].length; pi++)
			pdbids += self.opt.targets[rapha]['pdbids'][pi]+",";
		}
		pdbids = pdbids.replace(/,$/,"");

		jQuery.ajax({
			url: 'http://www.ebi.ac.uk/pdbe-apps/widgets/pdbprints',
			data: {'varname':'printsdata', 'pdbid':pdbids},
			dataType: 'script',
			crossDomain: 'true',
			type: 'GET',
			success: function(response, callOptions) { self.printsLayout(printsdata); }
		});
	},

	printsLayout: function(printsdata) {
		var self = this;
		for(var ci=0; ci < self.opt.targets.length; ci++) {
			var config = self.opt.targets[ci];
			self.printsLayout1(config, printsdata)
		}
	},
	printsLayout1: function(conf, printsdata) {
		var self = this;
		var printsize = 50, printsorient = 'h', printstartX = 10, printstartY = 10, printsInterval = 5;
		printsize = conf.size;
		printsorient = conf.orient;
		printsInterval = conf.interval;
		printstartX = conf.startX;
		printstartY = conf.startY;

		var printscats = [ "PDBeLogo", "PrimaryCitation", "Taxonomy", "Expressed", "Experimental", "Protein", "NucleicAcid", "Ligands" ];
		var catsinfo = {
			"PDBeLogo":        [""],
			"PrimaryCitation": ["citation"],
			"Taxonomy":        ["taxonomy"],
			"Expressed":       ["taxonomy"],
			"Experimental":    ["experimental"],
			"Protein":         ["primary"],
			"NucleicAcid":     ["primary"],
			"Ligands":         ["ligands"]
		};
		for(var pi=0; pi < conf['pdbids'].length; pi++) {
			var pid = conf['pdbids'][pi];
			for(var ci=0; ci < printscats.length; ci++) {
				var cat = printscats[ci];
				var ix = printstartX + printsize*ci;
				var iy = printstartY;
				if(printsorient == 'v') {
					ix = printstartX;
					iy = printstartY + printsize*ci;
				}
				var imgurl = printsdata[pid][cat][0], isizeY = printsize, isizeX = printsize;
				var printsURL = "http://pdbe.org";
				if(cat=="PDBeLogo") {
					var pidlink = conf.rapha.text(ix,iy+printsize/4,pid).attr({'font-family':'Mono', 'text-anchor':'start', 'font-size':printsize/3})
									.attr({'cursor':'pointer','title':'a tooltip '+pid}).data("pdbid",pid); // TODO tooltips
					pidlink.mouseup( function() { window.open("http://pdbe.org/"+this.data("pdbid")); } );
					imgurl = "http://www.ebi.ac.uk/pdbe-apps/widgets/html/PDBeWatermark_horizontal_128.png";
					isizeX = printsize*0.9; isizeY = printsize/2; iy += printsize/2;
				}
				else printsURL += "/"+pid+"/"+catsinfo[cat][0];
				var printsLogo = conf.rapha.image(imgurl,ix,iy,isizeX,isizeY).attr({'cursor':'pointer','title':'a tooltip '+cat});
				printsLogo.data("printsURL", printsURL);
				printsLogo.mouseup( function() { window.open(this.data("printsURL")); } );
				printsLogo.mouseover( function() { } );
			}
			if(printsorient == 'v') printstartX += printsize + printsInterval;
			if(printsorient == 'h') printstartY += printsize + printsInterval;
		}
	},
  /**
   * Array containing the supported event names
   * @name Biojs.PDBprints-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.PDBprints#onClick
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
	 * @name Biojs.PDBprints#onHelloSelected
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
