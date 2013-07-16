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
	opt: { apiURL:"http://www.ebi.ac.uk/pdbe/api", divid:'your-divid', pdbid:'1cbs', width:800 },
  
	constructor: function (options) {
		var self = this;
		jQuery.each(['apiURL','pdbid','divid','width'], function(ki,kk) {
			self[kk] = options[kk];
		});
		self.pdb = new Biojs.PDBdatabroker({apiURL:self.apiURL});
		Q.fcall ( function() {
			return self.pdb.makeEntry(self.pdbid);
		} )
		.then( function(entry) {
			return entry.makeEntities();
		} )
		.then( function(entities) {
			return self.pdb.makeEntry(self.pdbid).makeUniprotMappings();
		} )
		.then( function(unpmap) {
			return self.pdb.makeEntry(self.pdbid).makePfamMappings();
		} ).then( function(pfammap) {
			return self.pdb.makeEntry(self.pdbid).makeStructuralMappings();
		} ).then( function(strmap) {
			console.log("all data acquired, sequence layout begins.");
		} ).then( function() {
			var entry = self.pdb.makeEntry(self.pdbid);
			for(var ei=0; ei < entry.entities.length; ei++) {
				var ent = entry.entities[ei];
				if(ent.isType("protein")==false) continue;
				var mytracks = [];
				var eseq = ent.getSequence(); var elen = eseq.length;
				//for(esi=0; esi<elen; esi++) eseq += 'A';
				mytracks.push({
					height:25, painters:[
						{type:'Biojs.ZoombarPainter', seqlen:elen, numIndicesInRow:elen,
							pixelwidth:self.width, initleft:0, initright:elen-1, thumbwidth:20
						}
					]
				});
				//mytracks.push({
					//height:20, painters:[
						//{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
							//domains:[
								//{
									//ranges:[[0,elen-1]], ypos:{midpercent:80}, attribs:{fill:'none',stroke:'none'},
									//tooltip:{common:'yes',text:'Sequence'}, sequence:eseq
								//},
							//]
						//}
					//]
				//});
				mytracks.push({
					height:50, painters:[
						{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
							domains:[
								{
									ranges:[[0,elen-1]], ypos:{midpercent:20}, attribs:{fill:'green',stroke:null},
									tooltip:{common:'yes',text:'ent ' + ent.getEid()}, glowOnHover:{fill:'blue'}
								},
							].concat(self.makePfamDomsForEntity(ent))
						},
						{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
							domains:[
								{
									ranges:[[0,elen-1]], ypos:{midpercent:80}, attribs:{fill:'none',stroke:'none'},
									tooltip:{common:'yes',text:'Sequence'}, sequence:eseq
								},
							]
						}
					]
				});
				mytracks.push({
					height:50, painters:[
						{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
							domains:self.makeUnpdomForEntity(ent)
						}
					]
				});
				for(var chi=0; chi < ent.instances.length; chi++) {
					var chain = ent.instances[chi];
					var obsranges = chain.getObservedRanges();
					mytracks.push({
						height:50, painters:[
							{ type:'Biojs.DomainPainter', seqlen:elen, numIndicesInRow:elen,
								domains:self.makeDomsForChain(ent, chain)
							}
						]
					});
				}
				var adivid = self.divid+"_"+ei;
				jQuery("#"+self.divid).append("<div id='"+adivid+"'></div>");
				new Biojs.PDBsequenceViewer({divid:adivid, numrows:1, leftwidth:50, width:self.width, rightwidth:50, tracks:mytracks});
			}
		} );
	},

	makeDomsForChain: function(ent, chain) {
		var ret = [];
		// observed
		var obsranges = [];
		jQuery.each(chain.getObservedRanges(), function(ri,rg) {
			obsranges.push([rg.pdb_start-1,rg.pdb_end-1]);
		});
		ret.push( {
				ranges:obsranges, ypos:{rangepercent:[35,65]}, attribs:{fill:'blue',stroke:null},
				tooltip:{common:'yes',text:'chain ' + chain.getAuthAsymId()}, glowOnHover:{fill:'gold'}
		});
		// cath
		var cathranges = chain.getCathRanges();
		if(cathranges) {
			jQuery.each(cathranges, function(ci,cdata) {
				var cranges = [];
				jQuery.each( cdata.ranges, function(ri,rd) {
					cranges.push( [rd.pdb_start-1, rd.pdb_end-1] );
				} );
				ret.push( {
					ranges:cranges, ypos:{rangepercent:[25,45]}, attribs:{fill:'cyan',stroke:null},
					tooltip:{common:'yes',text:'cath ' + cdata.cath_superfamily}, glowOnHover:{fill:'silver'}
				} );
			} );
		}
		// scop
		var scopranges = chain.getScopRanges();
		if(scopranges) {
			jQuery.each(scopranges, function(ci,cdata) {
				var cranges = [];
				jQuery.each( cdata.ranges, function(ri,rd) {
					cranges.push( [rd.pdb_start-1, rd.pdb_end-1] );
				} );
				ret.push( {
					ranges:cranges, ypos:{rangepercent:[55,75]}, attribs:{fill:'violet',stroke:null},
					tooltip:{common:'yes',text:'scop ' + cdata.scop_family}, glowOnHover:{fill:'grey'}
				} );
			} );
		}
		return ret;
	},

	makePfamDomsForEntity: function(ent) {
		var self = this;
		var pfmap = ent.getPfamMapping(), pfdoms = [];
		for(pfid in pfmap) {
			var pfranges = [];
			if(pfid == null) continue;
			jQuery.each(pfmap[pfid], function(ui,ur) {
				if(ur.pdb_start == null || ur.pdb_end == null) return;
				pfranges.push([ur.pdb_start-1,ur.pdb_end-1]);
			});
			pfdoms.push( {
				ranges:pfranges, ypos:{midpercent:60}, attribs:{fill:'green',stroke:null,opacity:0.3},
				tooltip:{common:'yes',text:'pfam accession '+pfid}, glowOnHover:{fill:'magenta'}, displayname:pfid
			} );
		}
		return pfdoms;
	}, 
	makeUnpdomForEntity: function(ent) {
		var self = this;
		var unpmap = ent.getUnpMapping(), unpdoms = [];
		for(unp in unpmap) {
			var uranges = [];
			if(unp == null) continue;
			jQuery.each(unpmap[unp], function(ui,ur) {
				if(ur.pdb_start == null || ur.pdb_end == null) return;
				uranges.push([ur.pdb_start-1,ur.pdb_end-1]);
			});
			unpdoms.push( {
				ranges:uranges, ypos:{midpercent:60}, attribs:{fill:'red',stroke:null,opacity:0.3},
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
