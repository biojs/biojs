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

	makeEntry: function(pid) {
		var self = this;
		if(pid in self.entries) return self.entries[pid];
		var d = Q.defer();
		jQuery.ajax({
			url: self.apiURL+"/pdb/entry/summary/"+pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				console.log("entry/summary resulted in", t);
				self.entries[pid] = new Biojs.PDBdatabroker.Entry(t, self.apiURL);
				d.resolve(self.entries[pid]);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
		return d.promise;
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
		for(k in data) {
			self.pid = k;
			self.data = data[k];
			break;
		}
		self.apiURL = apiURL;
	},
	makeEntities: function(cbo) {
		var self = this;
		if(self.entities) return self.entities;
		var d = Q.defer();
		jQuery.ajax({
			url: self.apiURL+"/pdb/entry/entities/"+self.pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				console.log("entry/entities resulted in", t);
				self.entities = [];
				jQuery.each(t[self.pid], function(ei,edata) {
					self.entities.push(new Biojs.PDBdatabroker.Entity(edata, self.apiURL, self.pid));
				});
				d.resolve(self.entities);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
		return d.promise;
	},
	makeUniprotMappings: function() {
		var self = this;
		var d = Q.defer();
		jQuery.ajax({
			url: self.apiURL+"/mappings/to_uniprot/entry/"+self.pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				console.log("mappings/to_uniprot resulted in", t);
				t = t[self.pid];
				jQuery.each(self.entities, function(ei,ent) {
					if(!(ent.getEid() in t)) return;
					jQuery.each(t[ent.getEid()], function(si,seg) {
						ent.addUniprotMapping(seg,"accession");
					});
				});
				d.resolve(t);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
		return d.promise;
	},
	makePfamMappings: function() {
		var self = this;
		var d = Q.defer();
		jQuery.ajax({
			url: self.apiURL+"/mappings/to_pfam/entry/"+self.pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				console.log("mappings/to_pfam resulted in", t);
				t = t[self.pid];
				jQuery.each(self.entities, function(ei,ent) {
					if(!(ent.getEid() in t)) return;
					jQuery.each(t[ent.getEid()], function(si,seg) {
						if(!(ent.getEid() in t)) return;
						ent.addPfamMapping(seg,"pfam_accession");
					});
				});
				d.resolve(t);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
		return d.promise;
	},
	getEntity: function(eid) {
		var self = this;
		for(var ei=0; ei < self.entities.length; ei++) {
			if(self.entities[ei].getEid() == eid) return self.entities[ei];
		}
		return null;
	},
	makeStructuralMappings: function() {
		var self = this;
		var d = Q.defer();
		jQuery.ajax({
			url: self.apiURL+"/mappings/structural_domains/entry/"+self.pid,
			data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
			success: function(response, callOptions) {
				console.log("mappings/structural_domains resulted in", t);
				t = t[self.pid];
				jQuery.each(t, function(eid,einfo) {
					jQuery.each(einfo, function(chid,chinfo) {
						self.getEntity(eid).getInstanceFromAuthAsym(chid).addStructuralDomainAnnots(chinfo);
					});
				});
				d.resolve(t);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
			}
		});
		return d.promise;
	}
} );

function makeAjaxCall(theurl, cbo) {
	var d = Q.defer();
	jQuery.ajax({
		url: theurl,
		data: {varname:'t'}, dataType: 'script', crossDomain: true, type: 'GET',
		success: function(response, callOptions) {
			d.resolve(cbo.run());
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("There was an unidentified error - please report to pdbehelp@ebi.ac.uk");
		}
	});
}



Biojs.PDBdatabroker.EntityInstance = Biojs.extend ( {
	constructor: function(data, apiURL, pid) {
		var self = this;
		self.apiURL = apiURL; self.pid = pid;
		self.eid = data.eid; self.chid = data.auth_asym_id;
	},
	addStructuralDomainAnnots: function(chinfo) { // api call structural_domains
		var self = this;
		self.strmap = chinfo;
	},
	getObservedRanges: function() {
		var self = this;
		return self.strmap.observed.ranges;
	},
	getScopRanges: function() {
		var self = this;
		return self.strmap.scop;
	},
	getCathRanges: function() {
		var self = this;
		return self.strmap.cath;
	},
	getAuthAsymId: function() {
		var self = this;
		return self.chid;
	}
} );


Biojs.PDBdatabroker.Entity = Biojs.extend ( {
	constructor: function(data, apiURL, pid) {
		var self = this;
		self.data = data;
		self.pid = pid;
		self.apiURL = apiURL;
		self.instances = [];
		jQuery.each(self.data.in_chains, function(ci,chid) {
			self.instances.push( new Biojs.PDBdatabroker.EntityInstance({eid:self.getEid(), auth_asym_id:chid}, self.apiURL, self.pid) );
		});
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
	getInstanceFromAuthAsym: function(chid) {
		var self = this;
		for(var ii=0; ii < self.instances.length; ii++) {
			if(self.instances[ii].getAuthAsymId() == chid) return self.instances[ii];
		}
		return null;
	},
	addPfamMapping: function(seg) { // for unp or pfam mappings only
		var self = this;
		if(seg.pfam_accession==null) return;
		if(!(self.pfammap)) self.pfammap = {};
		if(!(seg.pfam_accession in self.pfammap)) self.pfammap[seg.pfam_accession] = [];
		self.pfammap[seg.pfam_accession].push({
			'pdb_start':seg['pdb_start'],
			'pdb_end':seg['pdb_end']
		});
	},
	addUniprotMapping: function(seg) { // for unp or pfam mappings only
		var self = this;
		if(seg.accession==null) return;
		if(!(self.unpmap)) self.unpmap = {};
		if(!(seg.accession in self.unpmap)) self.unpmap[seg.accession] = [];
		self.unpmap[seg.accession].push({
			'pdb_start':seg['pdb_start'],
			'pdb_end':seg['pdb_end'],
			'unp_start':seg['unp_start'],
			'unp_end':seg['unp_end']
		});
	},
	getLength: function() {
		var self = this;
		if( jQuery.isNumeric(self.data.length) ) return parseInt(self.data.length);
		return self.data.length;
	},
	getSequence: function() {
		var self = this;
		return self.data.sequence;
	},
	getUnpMapping: function() {
		var self = this;
		return self.unpmap;
	},
	getPfamMapping: function() {
		var self = this;
		return self.pfammap;
	},
	convert2int: function(numstr) {
		if(numstr==null) return numstr;
		if( jQuery.isNumeric(numstr) ) return parseInt(numstr);
		return numstr;
	}
} );
