/** 
 * This is the description of the Protein3Dastexviewer component. Here you can set any HTML text 
 * for putting on the generated documentation.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for Protein3Dastexviewer component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} [fontFamily=��Andale mono�, courier, monospace�] 
 *    Font list to be applied to the component content.
 *  
 * @option {string} [fontColor="white"] 
 *    HTML color code for the font.
 *    
 * @option {string} [backgroundColor="#7BBFE9"] 
 * 	  Background color for the entire div content.
 * 
 * @option {Object} [selectionFontColor="white"] 
 * 	  This color will be used to change the font color of selected text.
 * 
 * @option {Object} [ selectionBackgroundColor="yellow"] 
 * 	  This color will be used to change the background of selected text.
 *     
 * @example 
 * var instance = new Biojs.Protein3Dastexviewer({
 * 		target : "YourOwnDivId",
 * 		selectionBackgroundColor : '#99FF00'
 * });	
 * 
 */
Biojs.Protein3Dastexviewer = Biojs.extend (
/** @lends Biojs.Protein3Dastexviewer# */
{
  /**
   *  Default values for the options
   *  @name Biojs.Protein3Dastexviewer-opt
   */
  opt: {
	target: "YourOwnDivId", rapha: null, pdbids:['2x9t']
  },
  
	constructor: function (options) {
		var self = this;
	  
		// Make Raphael object if not provided already
		var deldiv = [];
		for(var ci=0; ci < self.opt.targets.length; ci++) {
			var config = self.opt.targets[ci];
			if(!config['rapha']) {
				config['rapha'] = Raphael(config['divid'], 600, 300); // TODO calculate actual sizes
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
		var defconf = {size:40, orient:'h', interval:10, startX:10, startY:10};
		for(var akey in defconf) {
			if(!conf[akey]) conf[akey] = defconf[akey];
		}
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
			if(printsorient == 'v') printstartX += printsize + printsInterval;
			if(printsorient == 'h') printstartY += printsize + printsInterval;
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
									.attr({'cursor':'pointer','title':'a tooltip '+pid}).data("pdbid",pid);
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
		}
	}
});
