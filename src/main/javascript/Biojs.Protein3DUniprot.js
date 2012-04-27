/**
 *
 * Protein viewer to show the pdb files aligned to an Uniprot Accession
 *
 * @class
 * @extends Biojs.Protein3DWS
 *
 * @param {Object} options An object with the options for the component.
 *
 * @option {string} [proteinId]
 *    Uniprot identifier of the protein.
 *
 * @option {string} [alignmentsUrl="http://www.rcsb.org/pdb/rest/das/pdb_uniprot_mapping/alignment?query="]
 *    Url to obtain the protein's alignments.
 *
 * @example
 *
 * var instance = new Biojs.Protein3DUniprot({
 * 		target: 'YourOwnDivId',
 * 		proteinId: 'P07148'
 * });
 *
 */
Biojs.Protein3DUniprot = Biojs.Protein3DWS.extend(
/** @lends Biojs.Protein3DUniprot# */
{
	constructor: function(options) {
		this.base(options);
        var self = this;
        this.onPdbLoaded(function(e) {
            Biojs.console.log(e.result + " loading the pdb file " + e.file);
            Biojs.console.log("self._aligmentsJustArrived= " + self._alignmentsJustArrived);
            if (self._alignmentsJustArrived) {
                Biojs.console.log("Initialising the alignments selection list");
                self.reset();
                var alignments = self._filterAligmentsBySelection(self._selection);
                var pdbOptions = self._createOptions(alignments);
                if (jQuery('#' + self.opt.target).find('div#pdbStructures').length == 0) {
                    self._addControl('<div id="pdbStructures"></div>');
                }
                jQuery('#' + self.opt.target).find('div#pdbStructures').html('Structures for <b>' + self.opt.proteinId + '</b><br/>' + '<select id="pdbFile_select">' + pdbOptions + '</select>');
                jQuery('#' + self.opt.target + ' #pdbFile_select').val(pdb);
                jQuery('#' + self.opt.target + ' #pdbFile_select').change(function() {
                    self._onAlignmentSelectionChange();
                });
                jQuery('#' + self.opt.target).find('#pdbStructures').show();
                var alignmentId = pdb;
                var pdbId = alignmentId.substring(0, pdb.indexOf('.')).toLowerCase();
                var alignment = self.getAlignmentsByPdb(alignmentId);
                if (alignment.hasOwnProperty(alignmentId)) {
                    var start = alignment[alignmentId][1].start;
                    var end = alignment[alignmentId][1].end;
                    self.raiseEvent('onPdbSelected', {"pdbId": pdbId,"alignmentId": alignmentId,"start": start,"end": end});
                }
                self._alignmentsJustArrived = false;
            }
        });
        if (this.opt.proteinId != undefined) {
            var proteinId = this.opt.proteinId;
            this.opt.proteinId = '';
            this.setProtein(proteinId);
        }
	},
	
	opt: {
		proteinId: undefined,
		alignmentsUrl: 'http://www.rcsb.org/pdb/rest/das/pdb_uniprot_mapping/alignment?query='
	},
	
	eventTypes : [
  		/**
  		 * @name Biojs.Protein3DUniprot#onPdbSelected
  		 * @event
  		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
  		 * @eventData {Object} source The component which did triggered the event.
  		 * @eventData {string} pdbId The name of the loaded file.
  		 * @eventData {string} alignmentId Alignment identifier.
  		 * @eventData {string} start Starting base index.
  		 * @eventData {string} end Ending base index.
  		 * 
  		 * @example 
  		 * instance.onPdbSelected(
  		 *    function( e ) {
  		 *       alert( "Alignment " + e.alignmentId + " selected. Start: " + e.start + " End: " + e.end );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onPdbSelected"
	],
	
	_aligments: undefined,
	
	
	/**
    * Get all pdb files for a given uniprot id.
    * Also triggers the event that a new pdb file was loaded.
    *
    * @option {string} proteinId Uniprot identifier of the protein.
    *
    * @example 
    * instance.setProtein("P99999");
    * 
    */
	setProtein: function(proteinId){
		if (proteinId != this.opt.proteinId) {
			this.opt.proteinId = proteinId;
			this._selection = undefined;
			this._minStart = Number.MAX_VALUE;
			this._maxEnd = 0;
			this._alignments = undefined;
			this._requestAligmentsXML();
		} 
	},
	
	// makes an ajax request to get the pdb files for the given uniprot id
	_requestAligmentsXML: function(){
		var self = this;
		jQuery.ajax({
			url: this.opt.proxyUrl,
			data: 'url=' + self.opt.alignmentsUrl + self.opt.proteinId,
			dataType: "text",
			success: function(xml){
				Biojs.console.log("SUCCESS: data received");
				self._parseResponse(xml);
			},
			async: false,
			error: function(qXHR, textStatus, errorThrown){
				Biojs.console.log("ERROR: requesting "+this.data);
				self.raiseEvent('onRequestError', {message: textStatus});
			}
		});
	},
	
	
	// parses the xml file from the request and stores the information in an easy to access way
	_parseResponse: function(xml){
	    this._alignments = {};
	    var i = 0;
		var self = this;
		
		Biojs.console.log("Decoding " + xml);
		
		xmlDoc = jQuery.parseXML( xml );
		
	    jQuery(xmlDoc).find('block').each( function(){
	        var children = jQuery(this).children();
	        var segment0 = self._createNode(children[0]);
	        var segment1 = self._createNode(children[1]);
	        
	        var arr = [];
	        arr.push(segment0);
	        arr.push(segment1);
	        
	        self._alignments[segment0.intObjectId] = arr || [];
	        i++;
			
		    if (self._minStart > segment1.start) {
		        self._minStart = segment1.start;
		    }
		    
		    if (self._maxEnd < segment1.end) {
		        self._maxEnd = segment1.end;
		    }
	    });
	    
	    Biojs.console.log("Alignments decoded:");
	    Biojs.console.log(self._alignments);
	    this._aligmentsArrived();
	},
	
	// creates a node for the data structure that holds the xml information
	_createNode: function(segment){
		var start = parseInt(jQuery(segment).attr('start'));
	    var end = parseInt(jQuery(segment).attr('end'));
	    var obj = {
	        intObjectId: jQuery(segment).attr('intObjectId') || '',
	        start: start || '',
	        end: end || ''
	    }
	    return obj;
	},
	
	// adds all available pdb files to a dropdown box 
	// or displays the fact that there are no pdb files for the given id
	_aligmentsArrived: function(){
		this._alignmentsJustArrived = true;
        var alignments = this._filterAligmentsBySelection(this._selection);
        if (!Biojs.Utils.isEmpty(alignments)) {
            var pdb = undefined;
            for (pdb in alignments) {
                break;
            }
            Biojs.console.log("Requesting pdb " + pdb);
            this.requestPdb(pdb.substring(0, pdb.indexOf('.')).toLowerCase());
        } else {
            jQuery('#' + this.opt.target).find('#pdbStructures').html("None structure for current selection");
            Biojs.console.log("No structural information available for " + this.opt.proteinId);
            this.raiseEvent('onRequestError', {message: "No structural information available for " + this.opt.proteinId});
        }
	},
	
	_onAlignmentSelectionChange: function(){
		var pdb = jQuery('#pdbFile_select').val();
		
		if ( pdb != undefined ) {
			
			var alignmentId = pdb.substring(0, pdb.indexOf(' '));
			var pdbId = alignmentId.substring(0, pdb.indexOf('.')).toLowerCase();
			
			var alignment = this.getAlignmentsByPdb(alignmentId);
			
			if ( alignment.hasOwnProperty( alignmentId ) ) {
				var start = alignment[alignmentId][1].start;
				var end = alignment[alignmentId][1].end;
				
				this.raiseEvent('onPdbSelected', { 
					"pdbId": pdbId,
					"alignmentId": alignmentId,
					"start": start,
					"end": end
				});
			}
			
			this.requestPdb(pdbId);
			
		} else {
			Biojs.console.log("No structural information available for "+this.opt.proteinId);
		}
	},
	
	/**
    * Get the available alignments for the current protein filtered by selection (PDB files containing a part of the requested region).
    * 
    * @example 
    * // Selection of the region in the interval [100,150].
    * instance.setSelection({start: 120, end: 150});
    * 
    * @example
    * // Get the alignments matching with bases 4, 8 and 100.
    * alert ( instance.filterAlignments([4,8,100]) );
    * 
    * @param {Object|Array} selection Can be either a plain object or an array.  
    *        If object, it must have the fields start and end; Where "start" is greater than or equal to "end".
    *        If array, it must contain numbers representing the positions to be selected.
    */ 
	getAlignmentsBySelection: function ( selection ) {
		
		var alignments = this._alignments;
		
		if ( selection != undefined ) {
			this._filterAligmentsBySelection(selection);
		}
		
		return alignments;
	},
	
	/**
    * Get the available alignments for the current protein filtered by selection (PDB files containing a part of the requested region).
    * 
    * @example
    * // Get the alignments matching with bases 4, 8 and 100.
    * alert ( instance.getAlignmentsByPdb("2F73") );
    * 
    * @param {string} pdb identifier.  
    * @returns {Object} .  
    * 
    */ 
	getAlignmentsByPdb: function ( pdbId ) {
		
		var alignments = {};
		
		for (al in this._alignments) {
			if (  this._alignments[al][0].intObjectId.indexOf( pdbId ) != -1 ) {
				alignments[this._alignments[al][0].intObjectId] = this._alignments[al];
			}
		}
		
		Biojs.console.log("Alignments for pdb " + pdbId );
		Biojs.console.log(alignments);
		
		return alignments;
	},

	/**
    * Filters the alignments available for the current protein: Only PDB files containing a part of the requested region
    * are selectable. The specified region is highlighted in the displayed PDB file.
    *
    * @example 
    * // Selection of the region in the interval [100,150].
    * instance.filterAlignments({start: 120, end: 150});
    * 
    * @param {Object|Array} selection Can be either a plain object or an array.  
    *        If object, it must have the fields start and end; Where "start" is greater than or equal to "end".
    *        If array, it must contain numbers representing the positions to be selected.
    */ 
	filterAlignments: function ( selection ) { 
		
		var alignments = this._filterAligmentsBySelection(selection);
		var selectedAlignment = jQuery('#pdbFile_select').val();
		
		// Update the drop-down box showing the filtered alignments
		jQuery('#pdbFile_select').html(this._createOptions(alignments));
		
		// Select an alignment
		if ( alignments.hasOwnProperty( selectedAlignment.slice(0,selectedAlignment.indexOf(' '))) ) {
			// Select current alignment if it belongs to filtered alignments
			jQuery('#pdbFile_select').val(selectedAlignment);
			
		} else { 
			// Select any alignment
			for ( a in alignments ){
				jQuery('#pdbFile_select').val(a);
				break;
			}
			this._onAlignmentSelectionChange();
		}
		
		// invoke setSelection on the parent 
		this.base(selection);
	},

	_createOptions: function(alignments) {
        var pdbOptions = "";
        for (pdb in alignments) {
            text = pdb + " (" + alignments[pdb][1].start + ".." + alignments[pdb][1].end + ")";
            pdbOptions += '<option value="' + text + '">' + text + '</option>';
        }
        Biojs.console.log("_createOptions: " + pdbOptions);
        return pdbOptions;
    },
	
	_filterAligmentsBySelection: function(selection) {
        var alignments = undefined;
        if (selection instanceof Array) {
            alignments = {};
            for (al in this._alignments) {
                var uniprot = this._alignments[al][1];
                for (i in selection) {
                    if (selection[i] >= uniprot.start && selection[i] <= uniprot.end) {
                        alignments[this._alignments[al][0].intObjectId] = this._alignments[al];
                        break;
                    }
                }
            }
        } else if (selection instanceof Object) {
            alignments = {};
            var i = 0;
            for (al in this._alignments) {
                var uniprot = this._alignments[al][1];
                if ((selection.start >= uniprot.start && selection.start <= uniprot.end) || (selection.end >= uniprot.start && selection.end <= uniprot.end) || (selection.start < uniprot.start && selection.end > uniprot.end)) {
                    alignments[this._alignments[al][0].intObjectId] = this._alignments[al];
                    i++;
                }
            }
        } else {
            alignments = this._alignments;
        }
        Biojs.console.log("Filtered alignments:");
        Biojs.console.log(alignments);
        return alignments;
    },
    
	/**
    * Selection of a region using the uniprot positions.
    *
    * @example 
    * // Selection of the region in the interval [100,150].
    * instance.setSelection({start: 100, end: 150});
    * 
    * @example
    * // Selection of the positions 4, 8 and 100.
    * instance.setSelection([4,8,100]);
    * 
    * @param {Object|Array} selection Can be either a plain object or an array.  
    *        If object, it must have the fields start and end; Where "start" is greater than or equal to "end".
    *        If array, it must contain numbers representing the positions to be selected.
    */ 
	setSelection: function ( s ) {
		
		var selection = Biojs.Utils.clone(s);
		var alignmentId = this.getCurrentAlignmentId();
		var proteinId = this.getCurrentProteinId();
		var segment = this.getAlignmentsByPdb(alignmentId)[alignmentId];
		var offset = 0;
		
		for ( i in segment ) {
			if ( segment[i].intObjectId == alignmentId ) {
				pdbSegment = segment[i];
			} else if ( segment[i].intObjectId == proteinId ) {
				uniprotSegment = segment[i];
			}
		}
		
		offset = uniprotSegment.start - pdbSegment.start;
		
		if ( selection instanceof Array ) {
			for ( i in selection ) {
				selection[i] -= offset;
			}
		} else if ( selection instanceof Object && selection.start <= selection.end ){
			selection.start -= offset;
			selection.end -= offset;
		}
		
		this.base(selection);
	},

	getCurrentAlignmentId: function () {
		var selectedValue = jQuery('#pdbFile_select').val();
		var alignmentId = selectedValue.substring(0, selectedValue.indexOf(' '));
		//var pdbId = alignmentId.substring(0, pdb.indexOf('.')).toLowerCase();
		return alignmentId;
	},
	
	getCurrentProteinId: function () {
		return this.opt.proteinId;
	},
	
	/**
    * Removes selection in the current displayed structure.
    *
    * @example
    * instance.removeSelection();
    */ 
	removeSelection: function() { 
		this.base();
	}
});
