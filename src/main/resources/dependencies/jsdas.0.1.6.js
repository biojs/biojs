/* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var JSDAS = function() {
	//Private attributes
	var version = '0.1';

	//Flags
	var _debug= true;

	//Private methods
	/**Given a valid DAS XML, it returns its translation to JSON*/
	var parseResponse = function(xml, command, version) {
		var formatVersion = version || JSDAS.Formats.current;
		var format = JSDAS.Formats[formatVersion][command];
		var json = JSDAS.Parser.parseElement(xml, format);
		return json;
	};

	//Public API
	var jsdas = {
		//Attributes
		
		
		//Methods
		version: function() {
			return version;
		},
		debug: function(debug) {
			if(debug) this._debug = debug;
			return this._debug;
		},
		/**JSDAS comes with its proxy based XMLLoader. However, any object with a load function with the same signature 
		 * as the default one (url, sucess_callback, error_callback) can be used. (i.e. using other means to retreive it, 
		 * adding caching if necessary, etc...)
		 * 
		 * @param {Object} loader
		 */
		setXMLLoader: function(loader) {
			if (loader && typeof(loader.load) == 'function') {
				this.XMLLoader = loader;
				return true;
			}
			else 
				return false;
		},
		//Standard Interface
			//returns a straight translation of the DAS XML to JSON
		//SOURCES
		sources: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseSources(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		/**Get the types info from the given url (which MUST be a valid DAS SOURCE) and 
		 * creates a JSON structure mimmicking the XML.
		 * The callback function is called with that JSON structure as a parameter.
		 * 
		 * @param {Object} url - the URL of a DAS Source with types capability
		 * @param {Object} callback - the callback function to be invoked
		 * @param {Object} version - the version of the DAS protocol to use when fetching the types data. Defaults to the latest version in the library.
		 */
		types: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseTypes(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		//DSN (v1.53 used) http://www.wormbase.org/db/das/dsn
		dsn: function(url, callback) {
			JSDAS.XMLLoader.load(url, function(xml) {
				callback(JSDAS.parseDSN(xml, 'v153'));
			});
		},
		sequence: function(url, callback, error_callback, version) {
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var resp=JSDAS.parseSequence(xml, version);
				//Remove newlines from sequences
				var seqs = resp.SEQUENCE;
				if(typeof seqs == 'undefined'){
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}else{
					for(var i=0, l=seqs.length; i<l; ++i) {
						var seq = seqs[i];
						seq.textContent = seq.textContent.replace(/\n/gi,'');	
					}
					callback(resp);	
				}
			}, error_callback);
		},
		features: function(url, callback, error_callback, version) {
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseFeatures(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		entry_points: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseEntry_points(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		alignment: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseAlignment(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		stylesheet: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseStylesheet(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		coordinate_systems: function(url, callback, error_callback, version) {
			
			JSDAS.XMLLoader.load(url, function(xml) {
				
				var response =(!JSDAS.error)?JSDAS.parseCoordinate_systems(xml, version):undefined;
				if (JSDAS.error) {
					if(error_callback && typeof(error_callback)=='FUNCTION') error_callback();
				}
				else{
					callback(response);
				}
			}, error_callback);
		},
		//PARSERS
		parseSources: function(xml, version) {
			return parseResponse(xml, 'sources', version);
		},
		parseDSN: function(xml, version) {
			return parseResponse(xml, 'dsn', version);
		},
		parseTypes: function(xml, version) {
			return parseResponse(xml, 'types', version);
		},
		parseSequence: function(xml, version) {
			return parseResponse(xml, 'sequence', version);
		},
		parseFeatures: function(xml, version) {
			return parseResponse(xml, 'features', version);
		},
		parseEntry_points: function(xml, version) {
			return parseResponse(xml, 'entry_points', version);
		},
		parseAlignment: function(xml, version) {
			return parseResponse(xml, 'alignment', version);
		},
		parseStylesheet: function(xml, version) {
			return parseResponse(xml, 'stylesheet', version);
		},
		parseCoordinate_systems: function(xml, version) {
			return parseResponse(xml, 'coordinate_systems', version);
		},
			
		errors: [],
		
		error: false,
		
		flushErrors: function(){
			this.errors = [];
			jsdas.error = false;
		},
		
		addError: function(id, comment){	
			if(id){
				jsdas.errors[jsdas.errors.length] = {
					id: id,
					comment: comment
				}
				jsdas.error = true;
			}			
		}
	};
	return jsdas;
}();










/* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @author Bernat Gel <bgel@lsi.upc.edu>
 * 
 * formatdescriptor.js - Description of the DAS XML formats in a JSON XML description language
 */

JSDAS = JSDAS || {};

(function() {
	//private
	//Commomly used description parts
	var segment_properties = [{
						name: 'id',
						type: 'string',
						mandatory: false
					}, {
						name: 'start',
						type: 'string',
						mandatory: false
					}, {
						name: 'stop',
						type: 'string',
						mandatory: false
					}, {
						name: 'type',
						type: 'string',
						mandatory: false
					}, {
						name: 'version',
						type: 'string',
						mandatory: false
					}, {
						name: 'label',
						type: 'string',
						mandatory: false
					}];
	
	
	//public 
	var formats = {
		current: 'v16',
		//************** VERSION 1.6
		v16: {
			//************BEGIN SOURCES
			sources: {
				tagname: "SOURCES",
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'SOURCE',
					multiple: true,
					mandatory: true,
					properties: [{
						name: 'uri',
						type: 'string',
						mandatory: true
					}, {
						name: 'title',
						type: 'string',
						mandatory: true
					}, {
						name: 'description',
						type: 'string',
						mandatory: false
					}, {
						name: 'doc_href',
						type: 'string',
						mandatory: false
					}],
					childs: [{
						tagname: 'MAINTAINER',
						multiple: false,
						mandatory: false,
						properties: [{
							name: 'email',
							type: 'string',
							mandatory: true
						}],
						childs: []
					}, {
						tagname: 'VERSION',
						multiple: true,
						mandatory: true,
						properties: [{
							name: 'uri',
							type: 'string',
							mandatory: false
						}, {
							name: 'created',
							type: 'date',
							mandatory: false
						}],
						childs: [{
							tagname: 'COORDINATES',
							multiple: true,
							mandatory: true,
							properties: [{
								name: 'uri',
								type: 'string',
								mandatory: true
							}, {
								name: 'source',
								type: 'string',
								mandatory: true
							}, {
								name: 'authority',
								type: 'string',
								mandatory: true
							}, {
								name: 'version',
								type: 'string',
								mandatory: false
							}],
							childs: 'text'
						}, {
							tagname: 'CAPABILITY',
							multiple: true,
							mandatory: true,
							properties: [{
								name: 'type',
								type: 'string',
								mandatory: true
							}, {
								name: 'query_uri',
								type: 'string',
								mandatory: true
							}],
							childs: []
						}, {
							tagname: 'PROP',
							multiple: true,
							mandatory: false,
							properties: [{
								name: 'name',
								type: 'string',
								mandatory: true
							}, {
								name: 'value',
								type: 'string',
								mandatory: true
							}],
							childs: []
						}]
					}]
				}]
			},
			//************END SOURCES
			//************BEGIN TYPES
			types: {
				tagname: 'DASTYPES',
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'GFF',
					multiple: false,
					mandatory: true,
					properties: [{
						name: 'version',
						type: 'string',
						mandatory: true
					}, {
						name: 'href',
						type: 'string',
						mandatory: true
					}],
					childs: [{
					tagname: 'SEGMENT',
					multiple: true,
					mandatory: true,
					properties: segment_properties,
					childs: [{
						tagname: 'TYPE',
						multiple: true,
						mandatory: false,
						properties: [{
							name: 'id',
							type: 'string',
							mandatory: true
						}, {
							name: 'category',
							type: 'string',
							mandatory: false
						}, {
							name: 'method',
							type: 'string',
							mandatory: false
						},{
							name: 'cvId',
							type: 'string',
							mandatory: false
						}],
						childs: 'text'
					}]
				}]
				}]
			},
			/*******END TYPES*/
			/*******BEGIN SEQUENCE*/
			sequence: {
				tagname: 'DASSEQUENCE',
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'SEQUENCE',
					multiple: true,
					mandatory: true,
					childs: 'text',
					properties: [{
						name: 'id',
						type: 'string',
						mandatory: true
					}, {
						name: 'start',
						type: 'string',
						mandatory: true
					}, {
						name: 'stop',
						type: 'string',
						mandatory: true
					}, {
						name: 'version',
						type: 'string',
						mandatory: false
					}, {
						name: 'label',
						type: 'string',
						mandatory: false
					}, { //Deprecated
						name: 'moltype',
						type: 'string',
						mandatory: false
					}]
				}] //end 'DASSEQUENCE' child array
			}, //end of DASSEQUENCE
			/*******END SEQUENCE*/
			/*******BEGIN FEATURES*/
			features: {
				tagname: 'DASGFF',
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'GFF',
					multiple: false,
					mandatory: true,
					properties: [],
					childs: [{
						tagname: 'SEGMENT',
						multiple: true,
						mandatory: true,
						properties: segment_properties,
						childs: [{
							tagname: 'FEATURE',
							multiple: true,
							mandatory: false,
							properties: [{
								name: 'id',
								type: 'string',
								mandatory: true
							}, {
								name: 'label',
								type: 'string',
								mandatory: false
							}],
							childs: [{
								tagname: 'TYPE',
								multiple: false,
								mandatory: true,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}, {
									name: 'category',
									type: 'string',
									mandatory: true
								}, {
									name: 'method',
									type: 'string',
									mandatory: false
								}, {
									name: 'cvId',
									type: 'string',
									mandatory: false
								}, {
									name: 'reference',
									type: 'string',
									mandatory: false
								}, {
									name: 'subparts',
									type: 'string',
									mandatory: false
								}, {
									name: 'superparts',
									type: 'string',
									mandatory: false
								}],
								childs: 'text'
							}, //End of TYPE definition
							{
								tagname: 'METHOD',
								multiple: false,
								mandatory: true,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}, {
									name: 'cvId',
									type: 'string',
									mandatory: false
								}],
								childs: 'text'
							}, //End of METHOD description 
							{
								tagname: 'START',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of START description 
							{
								tagname: 'END',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of START description
							{
								tagname: 'SCORE',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of SCORE description
							{
								tagname: 'ORIENTATION',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of ORIENTATION description
							{
								tagname: 'PHASE',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of PHASE description
							{
								tagname: 'NOTE',
								multiple: true,
								mandatory: false,
								properties: [],
								childs: 'text'
							}, //End of NOTE description
							{
								tagname: 'LINK',
								multiple: true,
								mandatory: false,
								properties: [{
									name: 'href',
									type: 'string',
									mandatory: true
								}],
								childs: 'text'
							}, //End of LINK description
							{
								tagname: 'TARGET',
								multiple: true,
								mandatory: false,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}, {
									name: 'start',
									type: 'string',
									mandatory: true
								}, {
									name: 'stop',
									type: 'string',
									mandatory: true
								}],
								childs: 'text'
							}, //End of TARGET description
							{
								tagname: 'GROUP',
								multiple: true,
								mandatory: false,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}, {
									name: 'label',
									type: 'string',
									mandatory: true
								}, {
									name: 'type',
									type: 'string',
									mandatory: true
								}],
								childs: [{
									tagname: 'NOTE',
									multiple: true,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, //End of NOTE description
								{
									tagname: 'LINK',
									multiple: true,
									mandatory: false,
									properties: [{
										name: 'href',
										type: 'string',
										mandatory: true
									}],
									childs: 'text'
								}, //End of LINK description
								{
									tagname: 'TARGET',
									multiple: true,
									mandatory: false,
									properties: [{
										name: 'id',
										type: 'string',
										mandatory: true
									}, {
										name: 'start',
										type: 'string',
										mandatory: true
									}, {
										name: 'stop',
										type: 'string',
										mandatory: true
									}],
									childs: 'text'
								}] //End of TARGET description and end of GROUP child array
							}, //End of GROUP description
							{
								tagname: 'PARENT',
								multiple: true,
								mandatory: false,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}],
								childs: []
							}, //End of PARENT description 
							{
								tagname: 'PART',
								multiple: true,
								mandatory: false,
								properties: [{
									name: 'id',
									type: 'string',
									mandatory: true
								}],
								childs: []
							}] //End of PARENT description and //end FEATURE childs array 
						}]//end of SEGMENT childs array
					}] //End of SEGMENT description and GFF childs array
				}] //End of GFF description  and  End of DASGFF childs array
			}, //end of features
		/*******END FEATURES*/
		/*******BEGIN ALIGNMENT*/
		alignment:{
			tagname:'DASALIGNMENT',
			multiple: false,
			mandatory: true,
			properties: [],
			childs: [{
				tagname:'alignment',
				multiple: true,
				mandatory: false,
				properties: [{
								name: 'aligntype',
								type: 'string',
								mandatory: false
							},{
								name: 'name',
								type: 'string',
								mandatory: false
							},{
								name: 'description',
								type: 'string',
								mandatory: false
							},{
								name: 'position',
								type: 'string',
								mandatory: false
							},{
								name: 'max',
								type: 'string',
								mandatory: false
							}],
				childs: [{
					tagname:'alignobject',
					multiple: true,
					mandatory: true,
					properties: [{
								name: 'dbaccessionid',
								type: 'string',
								mandatory: true
							},{
								name: 'objectversion',
								type: 'string',
								mandatory: true
							},{
								name: 'chain',
								type: 'string',
								mandatory: false
							},{
								name: 'intobjectid',
								type: 'string',
								mandatory: true
							},{
								name: 'dbsource',
								type: 'string',
								mandatory: true
							},{
								name: 'dbversion',
								type: 'string',
								mandatory: true
							},{
								name: 'dbcoordsys',
								type: 'string',
								mandatory: true
							}],
					childs: [{
						tagname:'alignobjectdetail',
						multiple: true,
						mandatory: false,
						properties: [{
									name: 'dbsource',
									type: 'string',
									mandatory: true
								},{
									name: 'property',
									type: 'string',
									mandatory: true
								}],
						childs: 'text'
					}, {
						tagname:'sequence',
						multiple: true,
						mandatory: false,
						properties: [],
						childs: 'text'
					}]
				}, {
					tagname:'score',
					multiple: true,
					mandatory: false,
					properties:[{
							name: 'methodname',
							type: 'string',
							mandatory: true
							},{
							name: 'value',
							type: 'string',
							mandatory: true
							}],
					childs:[]
				},{
					tagname:'block',
					multiple: true,
					mandatory: false,
					properties:[{
						name: 'blockorder',
						type: 'string',
						mandatory: true
					}, {
						name: 'blockscore',
						type: 'string',
						mandatory: true
					}],
					clilds:[{
						tagname:'segment',
						multiple: true,
						mandatory: true,
						properties:[{
							name: 'intobjectid',
							type: 'string',
							mandatory: true
						}, {
							name: 'end',
							type: 'string',
							mandatory: false
						}, {
							name: 'orientation',
							type: 'string',
							mandatory: false
						}, {
							name: 'start',
							type: 'string',
							mandatory: false
						}],
						childs:[{
							tagname:'cigar',
							multiple: true,
							mandatory: false,
							properties:[],
							childs: 'text'
						}]
					}]
				},{
					tagname:'geo3d',
					multiple: true,
					mandatory: false,
					properties: [{
							name: 'intobjectid',
							type: 'string',
							mandatory: false
						}],
					childs: [{
							tagname:'vector',
							multiple: false,
							mandatory: true,
							properties:[{
									name: 'x',
									type: 'string',
									mandatory: true
								},{ 
									name: 'y',
									type: 'string',
									mandatory: true
								},{
									name: 'z',
									type: 'string',
									mandatory: true
								}],
							childs: []
						},{
							tagname:'matrix',
							multiple: false,
							mandatory: true,
							properties:[{    
										name: 'mat11',
										type: 'string',
										mandatory: true
									},{
										name: 'mat12',
										type: 'string',
										mandatory: true
									},{
										name: 'mat13',
										type: 'string',
										mandatory: true
									},{
										name: 'mat21',
										type: 'string',
										mandatory: true
									},{
										name: 'mat22',
										type: 'string',
										mandatory: true
									},{
										name: 'mat23',
										type: 'string',
										mandatory: true
									},{
										name: 'mat31',
										type: 'string',
										mandatory: true
									},{
										name: 'mat32',
										type: 'string',
										mandatory: true
									},{
										name: 'mat33',
										type: 'string',
										mandatory: true
									}],
							childs: []
					}]
				}]
			}]
		},
		/*******END ALIGNMENT*/
		/*******BEGIN STYLESHEET*/
		stylesheet: {
			tagname:'DASSTYLE',
			multiple: false,
			mandatory: true,
			properties: [],
			childs: [{
				tagname:'STYLESHEET',
				multiple: false,
				mandatory: true,
				properties: [{
					name: 'version',
					type: 'string',
					mandatory: true
				}],
				childs: [{
					tagname:'CATEGORY',
					multiple: true,
					mandatory: true,
					properties: [{
						name: 'id',
						type: 'string',
						mandatory: true
					}],
					childs: [{
						tagname:'TYPE',
						multiple: true,
						mandatory: true,
						properties: [{
							name: 'id',
							type: 'string',
							mandatory: true
						}],
						childs: [{
							tagname:'GLYPH',
							multiple: true,
							mandatory: true,
							properties: [{
								name: 'zoom',
								type: 'string',
								mandatory: false
							}],
							childs: [{
								tagname:'ARROW',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'PARALLEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'SOUTHWEST',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'NORTHEAST',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							}, {
								tagname:'ANCHORED_ARROW',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'PARALLEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'BOX',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'LINEWITH',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}, {
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							}, {
								tagname:'CROSS',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'DOT',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'EX',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'HIDDEN',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: []
							},{
								tagname:'LINE',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'STYLE',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'SPAN',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'TEXT',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'FONT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FONTSIZE',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'STRING',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'STYLE',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'PRIMERS',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'TOOMANY',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'LINEWIDTH',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'TRIANGLE',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'DIRECTION',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LINEWIDTH',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'FGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BGCOLOR',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'LABEL',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'BUMP',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'GRADIENT',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR1',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR2',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR3',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MIN',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MAX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'STEPS',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'HISTOGRAM',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR1',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR2',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR3',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MIN',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MAX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'STEPS',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							},{
								tagname:'LINEPLOT',
								multiple: false,
								mandatory: false,
								properties: [],
								childs: [{
									tagname:'HEIGHT',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR1',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR2',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'COLOR3',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MIN',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'MAX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'STEPS',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								},{
									tagname:'ZINDEX',
									multiple: false,
									mandatory: false,
									properties: [],
									childs: 'text'
								}]
							}]
						}]
					}]
				}]
			}]
		},
		/*******END STYLESHEET*/
		/*******BEGIN STRUCTURE*/
		structure: {
			tagname:'dasstructure',
			multiple: false,
			mandatory: true,
			properties: [],
			childs: [{
				tagname:'object',
				multiple: true,
				mandatory: true,
				properties: [{
								name: 'dbaccessionid',
								type: 'string',
								mandatory: true
							}, {
								name: 'objectversion',
								type: 'string',
								mandatory: true
							}, {
								name: 'dbsource',
								type: 'string',
								mandatory: true
							}, {
								name: 'dbversion',
								type: 'string',
								mandatory: true
							}, {
								name: 'dbcoordsys',
								type: 'string',
								mandatory: true
							}],
				childs:[]
			}, {
				tagname:'objectdetail',
				multiple: true,
				mandatory: false,
				properties:[{
					name: 'dbsource',
					type: 'string',
					mandatory: true
				}, {
					name: 'property',
					type: 'string',
					mandatory: true
				}],
				childs:'text'
			}, {
				tagname:'chainid',
				multiple: true,
				mandatory: false,
				properties:[{
					name: 'id',
					type: 'string',
					mandatory: true
				}, {
					name: 'model',
					type: 'string',
					mandatory: false
				}, {
					name: 'swissprot',
					type: 'string',
					mandatory: false
				}],
				childs:[{
					tagname:'group',
					multiple: true,
					mandatory: false,
					properties:[{
						name: 'name',
						type: 'string',
						mandatory: true
					}, {
						name: 'type',
						type: 'string',
						mandatory: true
					}, {
						name: 'groupid',
						type: 'string',
						mandatory: true
					}, {
						name: 'insetcode',
						type: 'string',
						mandatory: false
					}],
					childs:[{
						tagname:'atom',
						multiple: true,
						mandatory: true,
						properties:[{
							name:'x',
							type: 'string',
							mandatory: true
						}, {
							name:'y',
							type: 'string',
							mandatory: true
						}, {
							name:'z',
							type: 'string',
							mandatory: true
						}, {
							name:'atomname',
							type: 'string',
							mandatory: true
						}, {
							name:'atomid',
							type: 'string',
							mandatory: true
						}, {
							name:'occupancy',
							type: 'string',
							mandatory: false
						}, {
							name:'tempfactor',
							type: 'string',
							mandatory: false
						}, {
							name:'altloc',
							type: 'string',
							mandatory: false
						}]
					}]
				}]
			},{
				tagname:'connect',
				multiple: true,
				mandatory: false,
				properties:[{
							name:'typr',
							type: 'string',
							mandatory: false
						}, {
							name:'atomserial',
							type: 'string',
							mandatory: false
						}],
				childs:[{
					tagname:'atomid',
					multiple: true,
					mandatory: false,
					properties:[{
						name:'atomid',
						type: 'string',
						mandatory: false
					}],
					childs:[]
				}]
			}]
		},
		/*******END STRUCTURE*/
		/*******BEGIN ENTRY_POINTS*/
		entry_points: {
				tagname: 'DASEP',
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'ENTRY_POINTS',
					multiple: false,
					mandatory: true,
					childs: [{
								tagname: 'SEGMENT',
						 		multiple: true,
								mandatory: false,
								properties: [{
												name: 'id',
												type: 'string',
												mandatory: false
											}, {
												name: 'start',
												type: 'string',
												mandatory: false
											}, {
												name: 'stop',
												type: 'string',
												mandatory: false
											}, {
												name: 'type',
												type: 'string',
												mandatory: false
											}, {
												name: 'orientation',
												type: 'string',
												mandatory: false
											}, {
												name: 'subparts',
												type: 'string',
												mandatory: false
											}],
						   		childs: 'text'
						 	}],
					properties: [{
						name: 'href',
						type: 'string',
						mandatory: true
					}, {
						name: 'start',
						type: 'string',
						mandatory: false
					}, {
						name: 'end',
						type: 'string',
						mandatory: false
					}, {
						name: 'version',
						type: 'string',
						mandatory: false
					}, {
						name: 'orientation',
						type: 'string',
						mandatory: false
					}, {
						name: 'label',
						type: 'string',
						mandatory: false
					}]
				}] /****end 'ENTRY_POINTS' child array*/
			} /****end of ENTRY_POINTS*/
		
		},
		//END VERSION v16
		//BEGIN VERSION v153
		v153: {
			//BEGIN DSN
			dsn: {
				tagname: 'DASDSN',
				multiple: false,
				mandatory: true,
				properties: [],
				childs: [{
					tagname: 'DSN',
					multiple: true,
					mandatory: true,
					properties: [],
					childs: [{
						tagname: 'SOURCE',
						multiple: false,
						mandatory: true,
						properties: [{
							name: 'id',
							type: 'string',
							mandatory: true
						}, {
							name: 'version',
							type: 'string',
							mandatory: false
						}],
						childs: 'text'
					}, {
						tagname: 'MAPMASTER',
						multiple: false,
						mandatory: true,
						properties: [],
						childs: 'text'
					}, {
						tagname: 'DESCRIPTION',
						multiple: false,
						mandatory: false,
						properties: [],
						childs: 'text'
					}]
				}]
			}
		//END DSN
		}
	}

	
	
	JSDAS.Formats = formats;	
}());

 
/*Element
 
{
tagname: '',
multiple: false,
mandatory: false,
properties: [],
childs: []
}		

*/

/*Property
 
{ name:'',
type: 'string',
mandatory: true
}
  
 
 *//* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @author Bernat Gel <bgel@lsi.upc.edu>
 * 
 * url.js - Definition of the JSDAS url parsing and creation code
 */

JSDAS.URL = {
	analyzeUrl: function(url){
		var parts = url.split('/');
		var prefix = "";
		var source = undefined;
		var command = undefined;
		var parameters = undefined;
		var i = 0, len = parts.length
		while (i < len && parts[i] !== 'das') {
			prefix += parts[i] + '/';
			i++;
		}
		if (i < len) 
			i++; //throw away 'das'
		if (i < len) {
			if (parts[i] !== "" &&parts[i] !== 'dsn' && parts[i] !== 'sources') { //if its not a command, it's the source name
				source = parts[i];
			}
			else { //there's no source. It might be command on the server
				command = parts[i];
				if(command == '') command = undefined; 
			}
			i++;
		}
		//the remaining part (if any) is the command and parameters
		if (i < len) {
			var last = parts.slice(i).join('/'); //reconstruct the remaining part as it was (maybe with slashes interleaved).
			var sep = last.indexOf('?');
			if (sep !== -1) {
				command = last.substr(0, sep);
				parameters = last.substr(sep + 1);
			}
		}
		return {
			prefix: prefix,
			source: source,
			command: command,
			parameters: parameters
		};
	},
	getPrefix: function(url) {
		var parts = url.split('/');
		var prefix = "";
		for(var i=0, len=parts.length; i<len; i++) {
			if(parts[i]=='das') return prefix;
			prefix += parts[i]+'/';
		}
		return prefix;
	},
	/**NOte the diference with getSourceURL. This function returns the url of the sources command*/
	getSourcesURL: function(url) {
		return this.getPrefix(url) + 'das/' + 'sources';
	},
	getSourceURL: function(url, source) {
		if (source) {
			var prefix = this.getPrefix(url);
			if(prefix != undefined){
				return prefix + 'das/' + source + (source[source.length - 1] == '/' ? '' : '/');
			}
			JSDAS.addError("No_DAS_URL","It seems like the URL is not formatted acording to DAS specification or maybe undefined URL:"+url);
			return undefined;
			
		}
		else {
			var url_info = this.analyzeUrl(url);
			if(url_info.source && url_info.prefix!=undefined) {
				return url_info.prefix + 'das/' + url_info.source + (url_info.source[url_info.source.length - 1] == '/' ? '' : '/');
			} else {
				JSDAS.addError("No_DAS_URL","It seems like the URL is not formatted acording to DAS specification or maybe undefined  URL:"+url);
				return undefined;
			}
		}
	},
	getEntryPointsURL: function(url, source) {
		return this.getSourceURL(url, source)+'entry_points';
	},
	getTypesURL: function(url, source) {
		return this.getSourceURL(url, source)+'types';
	},
	getSequenceURL: function(url, source) {
		return this.getSourceURL(url, source)+'sequence';
	},
	getFeaturesURL: function(url, source) {
		var something = this.getSourceURL(url, source);
		return something+'features';
	},
	getStylesheetURL: function(url, source) {
		var something = this.getSourceURL(url, source);
		return something+'stylesheet';
	},
	getAlignmentURL: function(url, source) {
		var something = this.getSourceURL(url, source);
		return something+'alignment';
	},
	hasSource: function(url) {
		var splitted = JSDAS.URL.analyzeUrl(url);
		return splitted.source != undefined;
	},
	
	/** Important: 
				transform {segment: '1', start: 100, end: 200, type: 'blah', custom_par: 'custom'}
			into
				          {segment: '1:100,200', type: 'blah', custom_par: 'custom'}
		 * or
		 * 
		 * 				{rows: 'rows', start: 100, end: 200}
			into
				          {rows= '100-200'}
		 */
		paramsURLEncode: function(params) {
			var newparams = ''; 
			
			for (par in params) {
				var obj = params[par];
				if(typeof obj ==  'string'){
					if (params[par]) {
						if(newparams)newparams += "&";
						newparams += par + "=" + params[par];
					}
				}else if(obj instanceof  Array){
					if(newparams)newparams += "&";
					
					var i = 0;
					for(i=0; i<obj.length; i++){
						if (obj[i]) {
							newparams += par + "=" + obj[i];
							if(i != obj.length-1)newparams += ";";
						}
						
					}
				}
			}
			//newparams=newparams.encode();
			//encode(newparams);
			//return escape('?'+newparams);
			return encodeURI('?'+newparams); //The old version (escape('?'+newparams);) gave problems because it encoded ? and &
		}
}
/* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @author Bernat Gel <bgel@lsi.upc.edu>
 * 
 * parser.js - Definition of the JSDAS parsing code

 */
//Some code is based on the code at http://www.webreference.com/programming/javascript/definitive2/4.html

JSDAS.Parser = {
    num_elements: 0,
	checkMandatoryElements: false, //true to raise an error if a mandatory element is not present
	//Private functions (actually not really private. just not API documented
	parseElement: function(xml, format) {
		var out = {};
		//The Document object does not have all the functionality of a standard node (i.e. it can't have attributes).
		//So, if we are in the Document element, move to its ¿¿only?? child, the root.
		if(xml.nodeType == 9) { //detect the Document node type
		  xml = xml.firstChild;
		  while(xml.nodeType != 1 && xml.nextSibling) //Document nodes (9) can't have text (3) nodes as children. Test only for elements (1)
		    xml = xml.nextSibling;
		}
		//get properties
		if (format.properties) {
			var props = format.properties;
			for (var nprop = 0, lenprop = props.length; nprop < lenprop; ++nprop) {
				var f = props[nprop];
				var name = f.jsname || f.name;
				out[name] = this.parseProperty(xml, f);
			}
		}
		//get childs
		if (format.childs) {
			var ch = format.childs;
			if (ch === 'text') { //if thextual child
				/*
				 * Due to browser compatibility the textContent may come from this 3 different methods:
				 * xml.innerText = IE
				 * xml.textContent = Firefox
				 * xml.text = IE
				 */
				out['textContent'] = xml.innerText || xml.textContent || xml.text;

			}
			else { //childs different than text
				for (var i = 0, len = ch.length; i < len; ++i) {
					var f = ch[i];
					//var els = xml.getElementsByTagName(f.tagname);
					//Hack: since getElementsByTagName is case sensitive for XML documents and DAS XMLs can be found 
					//in different casing, use a regular expresion tofilter the elements.
					//FIX: This is an unefficient parsing method. Other ways should be explored.
					var els = [];
					var all_els = xml.getElementsByTagName('*');
					for(var iael=0, lenael=all_els.length; iael<lenael; ++iael) {
					      var curr_node = all_els[iael];
					      if(new RegExp('^'+f.tagname+'$', 'i').test(curr_node.nodeName)) {
						    els.push(curr_node);
					      }
					}
					//End of tag casing hack

					if (f.mandatory && this.checkMandatoryElements && (!els || els.length == 0)) { //if a mandatory element is not present...
						//JSDAS.Console.log("Mandatory element is not present.");
					}
					if (els.length>0) { //if there are elements of the given tagName
						var name = f.jsname || f.tagname;
						if (f.multiple) { //if its a multiple instance child, create an array and push all instances
							out[name] = [];
							for (var iel = 0, lenel = els.length; iel < lenel; ++iel) {
								out[name].push(this.parseElement(els[iel], f));
							}
						}
						else {
							out[name] = this.parseElement(els[0], f);
						}
					}
				}
			}
		}
		return out;
	},
	parseProperty: function(xml, f) {
		//var att = xml.getAttribute(f.name);

		//Hack: since getAttribute is case sensitive for XML documents and DAS XMLs can be found 
		//in different casing, use a regular expresion to filter the attributes
		//FIX: This is an unefficient parsing method. Other ways should be explored.
		var att;
		var all_atts = xml.attributes;
		var found = false;
		for(var iat=0, lenat=all_atts.length; iat<lenat && !found; ++iat) {
		      var curr_att = all_atts[iat];
		      if(new RegExp('^'+f.name+'$', 'i').test(curr_att.name)) {
			    att = curr_att.nodeValue;
			    found = true;
		      }
		}
		//End of tag casing hack


		if(att) {
			switch(f.type) {
				case 'date': return new Date(att); ///DOES IT WORK? NEEDS TESTING
				case 'string':
				default: return att;
			}
		} else {
			return undefined;
		}
	}
};
/* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

//CODI DE http://www.devarticles.com/c/a/JavaScript/JavaScript-and-XML/1/
//Some code from jQuery

JSDAS.XMLLoader = {
	initialize: function() {
		this.initialized = true;
		this.proxyURL = 'proxy.php'; //TODO: this should be settable from the main jsDAS creation function
	},

	//Get a CORS-capable XHR or return null if not available
	xhrCORS: function(method, url) {
		var xhr;
		if(typeof XMLHttpRequest == "undefined"){ //We are at IE 6, return null since it doesn't support CORS
			return null;
		}
  		xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr){ //check if the XMLHttpRequest object is CORS capable
		    xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined"){ //Try to get an IE specific CORS object
		    xhr = new XDomainRequest();
		    xhr.open(method, url);
		} else {
		    xhr = null;
		}
		return xhr;
	},

	// Create the request object; Microsoft failed to properly
	// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
	xhr:function(){
		return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	},
	/**This function loads an external XML using a proxy on the server to comply with the SOP
	 * 
	 * @param {Object} url
	 * @param {Object} callback
	 */
	load: function(url, callback, errorcallback){
		if (!this.initialized) {
			this.initialize();
		}
		var xmlloader = JSDAS.XMLLoader; //get a reference to myself
  
  
		var usingCORS = true;
		var xhr = this.xhrCORS('GET', url);
		if(!xhr) { //if the browser is not CORS capable, fallback to proxy if available
			if(this.proxyURL) {
			    var xhr = this.xhr();
			    xhr.open('GET', this.proxyURL+'?url='+url, true);
			    usingCORS = false;
			} else {
			    errorcallback && errorcallback({id: 'no_proxy', msg: "Cross-Origin requests are not supported but no proxy has been defined"});
			}
		}

		//At this point, we've got a valid XHR
		//xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		//xhr.setRequestHeader("Accept", "application/xml, text/xml");


		var xmlloader = this; //necessary so the closures get the variable
		var change = function(xhr){
			if (xhr && (xhr.readyState == 4)) {
				if (xmlloader.httpSuccess(xhr)) {
					processResponse(xhr);
				}
				else { //if it failed, it mighht be that the source has no CORS enabled. In such case, fallback to proxy before erroring
					if(usingCORS && xmlloader.proxyURL) { //if it failed when using CORS and we've got a proxy, try to get the data via the proxy
					  xhr=undefined;
					  usingCORS = false;
					  var new_xhr = xmlloader.xhr();
					  new_xhr.open('GET', xmlloader.proxyURL+'?url='+url, true);
					  new_xhr.onreadystatechange = function() {change(new_xhr);}
					  new_xhr.send(null);
					} else {
					  errorcallback && errorcallback({id: "xmlhttprequest_error", msg: xhr.status});
					}
				}
				//to prevent IE memory leaks
				xhr = undefined;
			} 
		};
		var processResponse = function(xhr) {
			//WARNING: Since Uniprot (and maybe others) do not respond with a correct content-type, we cannot check it here. Should be reactivated as soon as the servers are updated.
			//var ct = xhr.getResponseHeader("content-type");
			//var xml = ct && ct.indexOf("xml") >= 0;
			//if (xml) {
				var data = xhr.responseXML;
				if(!data) { //This block is here since we cannot rely on content type headers
				     errorcallback && errorcallback({id: 'not_xml', msg: "The response was not XML"});
				}
				if(data.documentElement.nodeName != 'parsererror') {
					callback(data);
					return;
				} 
			//} //if anything went wrong, the document was not XML
			//errorcallback && errorcallback({id: 'not_xml', msg: "The response was not XML"});
		};
	
		xhr.onreadystatechange = function() {change(xhr);};

		// Send the data
		try {
			xhr.send(null);
		} catch(e) {
			//This code will rarely be called. Only when there's a problem on sernding the request.
			if(usingCORS && this.proxyURL) { //if it failed when using CORS and we've got a proxy, try to get the data via the proxy
			      var xhr = this.xhr();
			      xhr.open('GET', this.proxyURL+'?url='+url, true);
			      xhr.onreadystatechange = function() {change(xhr);}
			      try {
				  xhr.send(null);
			      } catch(e) {
				  errorcallback && errorcallback({id: 'sending_error', msg: "There was an error when sending the request"});
			      }
			} else {
			      errorcallback && errorcallback({id: 'sending_error', msg: "There was an error when sending the request"});
			}
		}	
	},
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return (!xhr.status && location.protocol == "file:" && xhr.responseXML) || //an empty responseXML with status=0 is possible with firefox using CORS from a file and failing because of the server
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	}
};
/* JSDAS
* Copyright (C) 2008-2009 Bernat Gel
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**The JSDAS.Simple interface offers an alternative interface to the JSDAS functionality 
 * abstracting out some DAS details from the user (url construction, mainly).
 * 
 *  To use it, get a new client instance calling JSDAS.Simple.getClient(das_server_url) and then just call it's functions:
 *  	- sources
 *   	- features
 *      - types
 *      - entry_points
 *      - sequence
 */ 
JSDAS = JSDAS || {}; 

(function() {
	//Private attributes

	//Private methods

	//Public API
	var simple = {
		//Methods
		getClient: function(url) {
			//Private attributes
			var complete_url = url;
			var url_info = (url)?JSDAS.URL.analyzeUrl(url):undefined;
			var version = undefined;
			
			//Callbacks 
			var _generic_callback = function() {return;};
			
			var client = {
				//Attributes
								
				//Methods
				url: function(val) {
					if(val) {
						complete_url = val;
						url_info = JSDAS.URL.analyzeUrl(url);
					}		
					return val;
				},
				source: function(val) {
					if(!url_info) return undefined;
					url_info.source = val || url_info.source;
					return url_info.source;
				},
				server: function(val) {
					return client.url(val)
				},
				
				//DAS Methods
				sources: function(callback, error_callback, params) {
					
					var sources_url = JSDAS.URL.getSourcesURL(complete_url);
					if (!sources_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					sources_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_sources","Error retrieving sources, see errors log");}; 
					JSDAS.sources(sources_url, callback, error_callback);					
				},
				features: function(params, callback, error_callback) {
					
					var features_url = JSDAS.URL.getFeaturesURL(complete_url, url_info.source);
					if (!features_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					features_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_features","Error retrieving features, see errors log");}; 
					JSDAS.features(features_url,cb,ecb,version);
				},
				types: function(params, callback, error_callback) {
					var types_url = JSDAS.URL.getTypesURL(complete_url, url_info.source);
					if (!types_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					types_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_types","Error retrieving types, see errors log");}; 
					JSDAS.types(types_url,cb,ecb,version);
				},
 				entry_points: function(params, callback, error_callback) {
					var entry_points_url = JSDAS.URL.getEntryPointsURL(complete_url, url_info.source);
					if (!entry_points_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					entry_points_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_entry_points","Error retrieving entry points, see errors log");}; 
					JSDAS.entry_points(entry_points_url,cb,ecb,version);
				},
 				sequence: function(params, callback, error_callback) {
					
					var sequence_url = JSDAS.URL.getSequenceURL(complete_url, url_info.source);
					if (!sequence_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					sequence_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_sequence","Error retrieving sequence, see errors log");}; 
					JSDAS.sequence(sequence_url,cb,ecb,version);			
				},
				alignment: function(params, callback, error_callback) {
					
					var alignment_url = JSDAS.URL.getAlignmentURL(complete_url, url_info.source);
					if (!sequence_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?","simple.js");
						return undefined;
					}
					
					alignment_url += JSDAS.URL.paramsURLEncode(params);
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_alignment","Error retrieving sequence, see errors log");}; 
					JSDAS.alignment(alignment_url,cb,ecb,version);			
				},
				stylesheet: function(callback, error_callback){
					var stylesheet_url = JSDAS.URL.getStylesheetURL(complete_url, url_info.source);
					if (!stylesheet_url) {
						JSDAS.addError("wrong_url","Malformed or Undefined URL?");
						return undefined;
					}
					
					var cb = callback || _generic_callback;
					var ecb = error_callback || function(){JSDAS.addError("error_retrieving_stylesheet","Error retrieving sequence, see errors log");}; 
					JSDAS.stylesheet(stylesheet_url,cb,ecb,version);
				},
				version: function(ver){
					if(ver == undefined)return version;
					version = ver;
				}
			};
			return client;
		}			
	};
	JSDAS.Simple = simple;
}());
