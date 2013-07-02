/** 
 * This is the description of the PDBdatabroker component.
 * This component is not graphical but provides a javascript representation of PDB objects.
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
 * @param {Object} options An object with the options for PDBdatabroker component.
 *    
 * @option {String} apiURL
 *    the PDBe API to consume
 *
 * @example 
 * var instance = new Biojs.PDBdatabroker({ apiURL:"http://www.ebi.ac.uk/pdbe/api" });	
 * 
 */

function makeTracksData(pdbid) {
	try {
		var pdb = new Biojs.PDBdatabroker({apiURL:"http://puck.ebi.ac.uk:10000"});
		pdb.getEntry(pdbid,
			new Callback(null, function(entry) {
				console.log("got entry", entry);
				entry.getEntities(
					new Callback(null, function(entities) {
						console.log("got entities", entities);
						pdb.getUniprotMappings(pdbid,
							new Callback(null, function(unpmap) {
								console.log("got unp mappings", unpmap);
								jQuery.each(entities, function(ei,ent) {
									if(!(ent.getEid() in unpmap)) return;
									jQuery.each(unpmap[ent.getEid()], function(si,seg) {
										console.log("segment", seg);
										ent.addUnpMapping(seg);
									});
									console.log("done");
								});
							}, [], [])
						);
						//jQuery.each(entities, function(ei,entity) {
							//console.log("an ent", entity);
							//if(entity.isType("protein"))
								//console.log("prot", entity);
						//});
					}, [], [])
				);
			}, [], [])
		);
		//Biojs.PDBdatabroker.onload(pdb, [["getEntry",["1cbs"]], ["getEntities",[]]], null, function() { console.log("here"); });
	}
	catch(err) {
		console.log(err);
	}
	return null;
}


Biojs.PDBdatabroker = Biojs.extend (
/** @lends Biojs.PDBdatabroker# */
{
  /**
   *  Default values for the options
   *  @name Biojs.PDBdatabroker-opt
   */
	opt: { apiURL:"http://www.ebi.ac.uk/pdbe/api" },
  
	constructor: function (options) {
		var self = this;
		self.apiURL = options.apiURL;
		self.entries = {};
	},

	getEntry: function(pid, cbo) {
		var self = this;
		if(pid in self.entries) { cbo.run(self.entries[pid]); return; }
		jQuery.ajax({
			url: self.apiURL+"/pdb/entry/summary/"+pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				self.entries[pid] = new Biojs.PDBdatabroker.Entry(t, self.apiURL);
				cbo.run([self.entries[pid]]);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
	},

	getUniprotMappings: function(pdbid, cbo) {
		var self = this;
		jQuery.ajax({
			url: self.apiURL+"/mappings/to_uniprot/entry/"+pdbid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) { cbo.run([t]); },
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});

	},

  /**
   * Array containing the supported event names
   * @name Biojs.PDBdatabroker-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.PDBdatabroker#onClick
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
	 * @name Biojs.PDBdatabroker#onHelloSelected
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


Biojs.PDBdatabroker.Entry = Biojs.extend ( {
	constructor: function(data, apiURL) {
		var self = this;
		self.data = data;
		for(k in data) {self.pid = k; break;}
		self.apiURL = apiURL;
	},
	getEntities: function(cbo) {
		var self = this;
		if(self.entities) processCallback([],cbo,[self.entities]);
		jQuery.ajax({
			url: self.apiURL+"/pdb/entry/entities/"+self.pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				self.entities = [];
				jQuery.each(t[self.pid], function(ei,edata) {
					//console.log("see", ei, edata);
					self.entities.push(new Biojs.PDBdatabroker.Entity(edata, self.apiURL, self.pid));
				});
				cbo.run([self.entities]);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
	}
} );


Biojs.PDBdatabroker.Entity = Biojs.extend ( {
	constructor: function(data, apiURL, pid) {
		var self = this;
		self.data = data;
		self.pid = pid;
		self.apiURL = apiURL;
	},
	isType: function(type) {
		var self = this;
		if(self.data.polymer_type == 'P' && type == "protein") return true;
		return false;
	},
	getEid: function() {
		var self = this;
		return self.data.entity_id;
	},
	addUnpMapping: function() {
		var self = this;
		if(!(self.unpmap)) self.unpmap = [];
		self.unpmap.push(seg);
	}
} );
