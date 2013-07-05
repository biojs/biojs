/** 
 * This is the description of the PDBsequenceLayout component. It prepares PDBsequenceViewer's input data using PDBdatabroker.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:swanand@gmail.com">Swanand Gore</a>
 * @version 1.0.0
 * @category 0
 *
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for PDBsequenceLayout component.
 *    
 * @option {String} apiURL
 *    the PDBe API to consume
 *
 * @example 
 * var instance = new Biojs.PDBsequenceLayout({ apiURL:"http://www.ebi.ac.uk/pdbe/api" });	
 * 
 */


Biojs.PDBsequenceLayout = Biojs.extend (
/** @lends Biojs.PDBsequenceLayout# */
{
  /**
   *  Default values for the options
   *  @name Biojs.PDBsequenceLayout-opt
   */
	opt: { apiURL:"http://www.ebi.ac.uk/pdbe/api", divid:'your-divid', pdbid:'1cbs' },
  
	constructor: function (options) {
		var self = this;
		jQuery.each(['apiURL','pdbid','divid'], function(ki,kk) {
			self[kk] = options[kk];
		});
		self.pdb = new Biojs.PDBdatabroker({apiURL:self.apiURL});
		Q.fcall ( function() {
			return self.pdb.makeEntry(self.pdbid);
		} )
		.then( function(entry) {
			console.log("see entry", entry);
			return entry.makeEntities();
		} )
		.then( function(entities) {
			console.log("see entities", entities);
			return self.pdb.makeEntry(self.pdbid).makeUniprotMappings(self.pdbid);
		} )
		.then( function(unpmap) {
			console.log("see unpmap", unpmap);
		} ).then( function() {
			var entry = self.pdb.makeEntry(self.pdbid);
			for(var ei=0; ei < entry.entities.length; ei++) {
				var ent = entry.entities[ei];
				if(ent.isType("protein")==false) continue;
				var mytracks = [];
				var elen = ent.getLength();
				console.log("protein length", ent.isType("protein"), elen);
				//var unpmap = ent.getUnpMapping(), unpdoms = [];
				var unpdoms = self.makeUnpdomForEntity(ent);
				console.log("unpdoms", unpdoms);
				mytracks.push({
					height:25, painters:[
						{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
							domains:[
								{
									ranges:[[0,elen-1]], ypos:{midpercent:20}, attribs:{fill:'green',stroke:null},
									tooltip:{common:'yes',text:'entity'}, glowOnHover:{fill:'blue'}
								},
							].concat(unpdoms)
						}
					]
				});
				console.log("tracks", mytracks);
				new Biojs.PDBsequenceViewer({divid:self.divid, numrows:1, leftwidth:50, width:500, rightwidth:50, tracks:mytracks});
				break;
			}
		} );
	},

	makeUnpdomForEntity: function(ent) {
		var self = this;
		var unpmap = ent.getUnpMapping(), unpdoms = [];
		for(unp in ent.getUnpMapping()) {
			var uranges = [];
			console.log("UNPPPPP", unp);
			if(unp == null) continue;
			jQuery.each(unpmap[unp], function(ui,ur) {
		console.log(unp, ur.pdb_start, ur.pdb_end);
				if(ur.pdb_start == null || ur.pdb_end == null) return;
				uranges.push([ur.pdb_start-1,ur.pdb_end-1]);
			});
			console.log("URANGE", uranges);
			unpdoms.push( {
				ranges:uranges, ypos:{midpercent:80}, attribs:{fill:'red',stroke:null,opacity:0.3},
				tooltip:{common:'yes',text:'uniprot accession '+unp}, glowOnHover:{fill:'blue'}, displayname:unp
			} );
		}
		return unpdoms;
	}, 

  /**
   * Array containing the supported event names
   * @name Biojs.PDBsequenceLayout-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.PDBsequenceLayout#onClick
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
	 * @name Biojs.PDBsequenceLayout#onHelloSelected
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

function Callback(obj, method, preargs, postargs) {
	var me = this;
	me.run = function(args) {
		return method.apply(obj, preargs.concat(args.concat(postargs)));
	}
}
