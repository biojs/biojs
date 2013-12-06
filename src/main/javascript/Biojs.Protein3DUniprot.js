/**
 *
 * Protein viewer to show the pdb files aligned to an Uniprot Accession
 *
 * @class
 * @extends Biojs.Protein3DWS
 *
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 2
 *
 * @param {Object} options An object with the options for the component.
 *
 * @option {string} [proteinId]
 *    Uniprot identifier of the protein.
 *
 * @option {string} [mapping=Biojs.Protein3DUniprot.ALIGNMENTS_UNIPROT_MAPPING]
 *    Mapping function to obtain the protein's alignments:
 *    <ul>
 *      <li>Biojs.Protein3DUniprot.ALIGNMENTS_UNIPROT_MAPPING</li>
 *      <li>Biojs.Protein3DUniprot.ALIGNMENTS_PDBe_MAPPING</li>
 *    </ul>
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
                jQuery('#' + self.opt.target).find('div#pdbStructures').html('<h1>Structures for <b>' + self.opt.proteinId + '</b></h1><br/>' + '<select id="pdbFile_select">' + pdbOptions + '</select>');
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
		mapping: 'http://www.ebi.ac.uk/pdbe-apps/widgets/unipdb?uniprot=',
		proxyUrl: '../biojs/dependencies/proxy/proxy.php'
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

			if ( this.opt.mapping == Biojs.Protein3DUniprot.ALIGNMENTS_UNIPROT_MAPPING ) {
			    this._requestAligmentsFromUniprot();
			} else if ( this.opt.mapping == Biojs.Protein3DUniprot.ALIGNMENTS_PDBe_MAPPING ) {
                this._requestAligmentsFromPdbe();
			} else {
			    throw "Error in mapping function. this.opt.mapping="+this.opt.mapping;
			}
		}
	},

	// makes an ajax request to get the pdb files for the given uniprot id
	_requestAligmentsFromUniprot: function(){
		var self = this;
		jQuery.ajax({
			url: self.opt.mapping + self.opt.proteinId,
			data: {biojsmapping:'1', varname:'pdbmappings'},
			dataType: "script",
			crossDomain: true,
			success: function(){
				Biojs.console.log("SUCCESS: data received");
				self._alignments = pdbmappings;
                //change proteinId to the one retrieved from pdbmappings (in case it is a protein id rather than an accession)
                //Warning: Here we suppose that position [0] always give the info for the pdb and position [1] always give the info for the accession
                for (obj in pdbmappings) {
                    if ( pdbmappings[obj][1].intObjectId != self.opt.proteinId ) {
                        self.opt.proteinId = pdbmappings[obj][1].intObjectId;
                    }
                    break;
                }
                self._aligmentsArrived();
			},
			async: false,
			error: function(qXHR, textStatus, errorThrown){
				Biojs.console.log("ERROR: requesting "+this.data);
				self.raiseEvent('onRequestError', {message: textStatus});
			}
		});
	},

	// makes an ajax request to get the pdb files for the given uniprot id
    _requestAligmentsFromPdbe: function(){
        var self = this;

        jQuery.ajax({
            url: self.opt.proxyUrl,
            dataType: "text",
            data: { url: self.opt.mapping + self.opt.proteinId + '/'},
            success: function(data){
                Biojs.console.log("SUCCESS: data received");
                self._parseResponse(data);
            },
            async: false,
            error: function(qXHR, textStatus, errorThrown){
                Biojs.console.log("ERROR: requesting "+this.data);
                self.raiseEvent('onRequestError', { message: textStatus});
            }
        });
    },

	// parses the xml file from the request and stores the information in an easy to access way
	_parseResponse: function (text) {
	    this._alignments = {};
	    var i = 0;
		var self = this;
		var data;

		Biojs.console.log("Decoding " + text);

		if ( !Biojs.Utils.isEmpty(text) ) {

            try {
		        data = jQuery.parseJSON(text);

		    } catch (e) {
                Biojs.console.log("Error decoding response: " + e.message );
            }

            for ( var i in data )  {

                try {
                    var segments = [];

                    segments.push({
                        "start": data[i].pdb_range[0],
                        "end": data[i].pdb_range[1],
                        "intObjectId": data[i].pdbid + '.' + data[i].chain } );

                    segments.push({
                        "start": data[i].uniprot_range[0],
                        "end": data[i].uniprot_range[1],
                        "intObjectId": data[i].uniprot_acc } );

                    self._alignments[ segments[0].intObjectId ] = segments;

                    if (self._minStart > segment[1].start) {
                        self._minStart = segment[1].start;
                    }

                    if (self._maxEnd < segment[1].end) {
                        self._maxEnd = segment[1].end;
                    }

                } catch (e) {
                    Biojs.console.log("Error decoding alignment: " + e.message );
                }
            }
		}

	    Biojs.console.log("Alignments decoded:");
	    Biojs.console.log(self._alignments);
	    this._aligmentsArrived();
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
            this._container.html("No structural information for " + this.opt.proteinId );
            this.raiseEvent('onRequestError', { message: "No structural information available for " + this.opt.proteinId });
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
         * Request and display a pdb file by means of its identifier.
         *
         * @param {string} pdbId Pdb file identifier.
         *
         * @example
         * instance.requestPdb('3t6f');
         *
         */
        requestPdb: function(pdbId) {
            var self = this;

            self.showLoadingImage();
            self.opt.id = pdbId;

            jQuery.ajax({
                url: self.opt.proxyUrl,
                data: 'url='+self.opt.pdbUrl+'/pdb'+pdbId+'.ent',
                dataType: 'text',
                success: function (pdbContent) {
                    Biojs.console.log("DATA ARRIVED");
                    //reset the PDB selected area if a uniprot selection has been made already
                    if (self._uniprotSelection != undefined) {
                        self._selection = self._translateSelection(self._uniprotSelection);
                    }
                    self.setPdb(pdbContent);
                },
                error: function(qXHR, textStatus, errorThrown){
                    self.raiseEvent('onRequestError', {message: textStatus});
                }
            });
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
        this._uniprotSelection = Biojs.Utils.clone(s);
        var selection = this._translateSelection(s);
        this.base(selection);
    },

    _translateSelection: function (s) {
        //Selection in Uniprot regions needs to be translated into PDB regions
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
            var toDelete = new Array(selection.length);
            for ( i in selection ) {
                if (selection[i] instanceof Object) {//a range
                    if ( (selection[i].start > uniprotSegment.end) || (selection[i].end < uniprotSegment.start) ){
                        //we first check whether it is completely out of the range
                        selection[i].start = 0;
                        selection[i].end = 0;
                        toDelete[i] = true;
                    } else if ( (selection[i].start >= uniprotSegment.start) && (selection[i].end <= uniprotSegment.end) ){
                        selection.start -= offset;
                        selection.end -= offset;
                        toDelete[i] = false;
                    } else if ( (selection[i].start < uniprotSegment.start) && (selection[i].end <= uniprotSegment.end) ){
                        selection[i].start = pdbSegment.start - 0;
                        selection[i].end -= offset;
                        toDelete[i] = false;
                    } else if ( (selection[i].start >= uniprotSegment.start) && (selection[i].end > uniprotSegment.end) ){
                        selection[i].start -= offset;
                        selection[i].end = pdbSegment.end - 0;
                        toDelete[i] = false;
                    } else if ( (selection[i].start < uniprotSegment.start) && (selection[i].end > uniprotSegment.end) ){
                        selection[i].start = pdbSegment.start - 0
                        selection[i].end = pdbSegment.end - 0;
                        toDelete[i] = false;
                    }
                } else { //a position
                    if ( (uniprotSegment.start <= selection[i]) && (selection[i] <= uniprotSegment.end) ) {
                        selection[i] -= offset;
                        toDelete[i] = false;
                    } else {
                        toDelete[i] = true;
                    }
                }
            }
            var deleted = 0;
            for (j in toDelete) {
                if (toDelete[j] == true) {
                    selection.splice(j-deleted,j-deleted);
                    deleted += 1;
                }
            }
        } else if ( selection instanceof Object && selection.start <= selection.end ){
            if ( (selection.start > uniprotSegment.end) || (selection.end < uniprotSegment.start) ){
                //we first check whether it is completely out of the range
                selection.start = 0;
                selection.end = 0;
                this.removeSelection();
            } else if ( (selection.start >= uniprotSegment.start) && (selection.end <= uniprotSegment.end) ){
                selection.start -= offset;
                selection.end -= offset;
            } else if ( (selection.start < uniprotSegment.start) && (selection.end <= uniprotSegment.end) ){
                selection.start = pdbSegment.start - 0;
                selection.end -= offset;
            } else if ( (selection.start >= uniprotSegment.start) && (selection.end > uniprotSegment.end) ){
                selection.start -= offset;
                selection.end = pdbSegment.end - 0;
            } else if ( (selection.start < uniprotSegment.start) && (selection.end > uniprotSegment.end) ){
                selection.start = pdbSegment.start - 0
                selection.end = pdbSegment.end - 0;
            }
        }
        return (selection);
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
}, {

    // Mapping services
    ALIGNMENTS_UNIPROT_MAPPING: 'http://www.ebi.ac.uk/pdbe-apps/widgets/unipdb?uniprot=',
    ALIGNMENTS_PDBe_MAPPING: 'http://wwwdev.ebi.ac.uk/pdbe-apps/jsonizer/mappings/best/all/'

});
