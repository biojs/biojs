/** 
 * ProteinPortafolio component shows the description of a protein as well as its PDB alignments if there is any.
 * Component shows the PDBLogos of the selected alignment and ables to play with the sequence and
 * the 3D draw of the alignment.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 3
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 *
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>Raphael 2.1.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael-2.1.0.js"></script>
 *
 * @requires <a href='Biojs.PDBLogos.html'>PDBLogos</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/Biojs.PDBLogos.js"></script>
 *
 * @requires <a href='Biojs.Sequence.html'>Sequence</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/Biojs.Sequence.js"></script>
 *
 * @requires <a href='Biojs.Protein3DWS.html'>Protein3DWS</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/Biojs.Protein3D.js"></script>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/Biojs.Protein3DWS.js"></script>
 *
 * @requires <a href='http://jmol.sourceforge.net/download/'>jMol 12.0.48</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jmol-12.0.48/Jmol.js"></script>
 *
 * @requires <a href='../biojs/css/Protein3D.css'>Protein3D CSS</a>
 * @dependency <link href="../biojs/css/biojs.Protein3D.css" rel="stylesheet" type="text/css" />
 *
 * @requires <a href='../biojs/css/ProteinPortafolio.css'>ProteinPortafolio CSS</a>
 * @dependency <link href="../biojs/css/biojs.ProteinPortafolio.css" rel="stylesheet" type="text/css" />
 *
 * @param {Object} options An object with the options for ProteinPortafolio component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} [fontFamily='"Andale mono", courier, monospace'] 
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
 * @option {string} [pdb3DIcon='../biojs/css/images/3d.png']
 *    The only PDB icon is able to defines the 3D structure. 
 *    Set source URL for 3D icon 
 *     
 * @example 
 * var instance = new Biojs.ProteinPortafolio({
 * 		target : "YourOwnDivId",
 * 		accession : 'P99999'
 * });	
 * 
 */
Biojs.ProteinPortafolio = Biojs.extend (
/** @lends Biojs.ProteinPortafolio# */
{
    constructor: function (options) {
        // In JavaScript "this" always refers to the owner of the function we're executing (http://www.quirksmode.org/js/this.html)
        // Let's preserve the reference to 'this' through the variable self. In this way, we can invoke/execute
        // our component instead of the object where 'this' is being invoked/executed.
        var self = this;

        Biojs.console.enable();

        // For practical use, create an object with the main DIV container
        // to be used in all of the code of our component
        this._container = jQuery("#"+self.opt.target);

        this._initialize();

        if ( !Biojs.Utils.isEmpty( options.accession ) ) {
            this.setProtein(options.accession);
        }

    },

    /**
    *  Default values for the options
    *  @name Biojs.ProteinPortafolio-opt
    */
    opt: {
        target: "YourOwnDivId",
        accession: "",
        mappingUrl: 'http://www.ebi.ac.uk/pdbe-apps/widgets/unipdb?uniprot=',
        featuresUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot-summary/features',
        proxyUrl: '../biojs/dependencies/proxy/proxy.php',
        jmolFolder: '../biojs/dependencies/jmol-12.0.48',
        pdb3DIcon: '../biojs/css/images/3d.png',
        pdbIconSize: 40
    },
  
    /**
    * Array containing the supported event names
    * @name Biojs.ProteinPortafolio-eventTypes
    */
    eventTypes : [
       /**
        * @name Biojs.ProteinPortafolio#onClick
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
        * @name Biojs.ProteinPortafolio#onPdbSelected
        * @event
        * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
        * @eventData {Object} source The component which did triggered the event.
        * @eventData {string} alignmentId Identifier .
        * @eventData {string} pdbId Selected pdb entry.
        * @eventData {int} start Start position of the alignment.
        * @eventData {int} end End position of the alignment.
        * @example
        * instance.onPdbSelected(
        *    function( e ) {
        *       alert("Selected " + e.alignmentId + " alignment.");
        *    }
        * );
        *
        * */
        "onPdbSelected"
    ],
  
    /**
    * Change the font size. Do nothing it no value is provided.
    *
    * @param {string} [size] The new font size in pixels.
    *
    * @example
    * instance.setSize("72px");
    */
    setSize: function(size) {

    },

    _initialize: function() {
        
    	this._alpha = jQuery('<div class="alpha"></div>').appendTo( this._container );
    	this._beta = jQuery('<div class="beta"></div>').appendTo( this._container );
    	
    	this._header = jQuery('<div class="header"></div>').appendTo( this._alpha );
        this._toolbar = jQuery('<div class="toolbar"></div>').appendTo( this._alpha );
        this._content = jQuery('<div class="content"></div>').appendTo( this._alpha );

        this._content.attr('id', 'ProteinPortafolio_content_' + this.getId() );
        
        this._container.addClass('ProteinPortafolio');
    },

    _clearAll: function () {
        this._header.children().remove();
        this._toolbar.children().remove();
        this._content.children().remove();
    },

    /**
    * Sets the protein accession which changes everything to reflect the new protein information
    *
    * @param {string} accession The new protein identifier
    *
    * @example
    * instance.setProtein("P07148");
    *
    * @example
    * instance.setProtein("P12345");
    */
    setProtein: function( accession ) {

        this.opt.accession = accession;

        this._requestAligments(accession, function(alignments){

            this._alignments = alignments;

            this._container.removeClass('loading');

            if (!Biojs.Utils.isEmpty(alignments)) {
               // Alignments found
               this._setHeader( this.opt.accession, this._createPDBSelect(alignments) );

            } else {
               // none alignment found
               this._setHeader( this.opt.accession );
            }
        });

        this._showFeatures(accession);
    },

    _requestAligments: function( accession, action ){
        var self = this;

        this._clearAll();
        this._container.addClass('loading');

        var xhr = jQuery.ajax({
            url: self.opt.mappingUrl + accession,
            data: {biojsmapping:'1', varname:'pdbmappings'},
            dataType: "script",
            crossDomain: true,
            timeout: 5000,
            success: function(){
                Biojs.console.log("SUCCESS: data received");
                self._alignments = pdbmappings;
                action.call(self,pdbmappings);
            },
            async: true,
            error: function(qXHR, textStatus, errorThrown){
                Biojs.console.log("ERROR: " + textStatus );
                self.raiseEvent('onRequestError', {message: textStatus});
                action.call(self,{});
            }
        });
    },

    _createPDBSelect: function(alignments) {
        var pdbOptions = "";
        for (pdb in alignments) {
            text = pdb + " (" + alignments[pdb][1].start + ".." + alignments[pdb][1].end + ")";
            pdbOptions += '<option value="' + text + '">' + text + '</option>';
        }
        Biojs.console.log("_createOptions: " + pdbOptions);
        return pdbOptions;
    },

    _setHeader: function( accession, mappingsSelector ) {
        var self = this;

        if ( mappingsSelector !== undefined ) {
            this._header.html("Accession: "+ accession + ", PDB Alignments: <select>"+ mappingsSelector + "</select>" );
            this._onAlignmentSelectionChange();
            this._header.children('select').change( function(){ self._onAlignmentSelectionChange() });
        } else {
            this._header.html("Accession: "+ accession + ", No PDB alignments found." );
        }
        
        this._adjustContentSize();

    },

    _onAlignmentSelectionChange: function(){

        var alignment = this.getCurrentAlignment();

        if ( !Biojs.Utils.isEmpty(alignment) ) {

            this.raiseEvent('onPdbSelected', {
                                "pdbId": alignment.pdbId,
                                "alignmentId": alignment.alignmentId,
                                "start": alignment.start,
                                "end": alignment.end
                            });

            this._showPDBPrints(alignment.pdbId);
            this._showImage(alignment.pdbId);
            this._showFeatures(this.opt.accession);

        } else {
            Biojs.console.log("No structural information available for " + this.opt.accession );
        }
    },

    _showPDBPrints: function(pdbId) {

        var self = this;
        this._toolbar.children().remove();
        this._toolbar.attr('id', 'PDBLogos_toolbar_' + this.getId() );

        var myprints = new Biojs.PDBLogos({
            target: this._toolbar.attr('id'),
            identifier: pdbId,
            size: self.opt.pdbIconSize,
            pdb3DIcon: self.opt.pdb3DIcon
        });

        myprints.onClick( function(e) {
        	if ( e.category == "PDBStructure" ) {
        		self._showProtein3D();
        	} else {
        		window.open( e.printsURL );
        	}
        });

        this._adjustContentSize();
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

    getCurrentAlignment: function(){

        var result = {};
        var pdbSelectedValue = this._header.find('select').val();

        if ( pdbSelectedValue != undefined ) {

            result.accession = this.opt.accession;
            result.alignmentId = pdbSelectedValue.substring(0, pdbSelectedValue.indexOf(' '));
            result.pdbId = pdbSelectedValue.substring(0, pdbSelectedValue.indexOf('.')).toLowerCase();


            var alignment = this.getAlignmentsByPdb(result.alignmentId);

            result.start = alignment[result.alignmentId][1].start;
            result.end = alignment[result.alignmentId][1].end;
            result.offset = 0;

            if ( alignment.hasOwnProperty( result.alignmentId ) ) {
                result.offset = result.start - alignment[result.alignmentId][0].start;
            }

            result.alignment = alignment;
        }

        Biojs.console.log("Current alignment");
        Biojs.console.log(result);

        return result;
    },

    _showProtein3D: function( ){

        var self = this;
        var alignment = this.getCurrentAlignment();
        var height = this._container.height() - this._header.height() - this._toolbar.height();

        self._content.children().remove();
        self._beta.children().remove();

        self._beta.attr('id','biojs_protein3D_' + self._content.attr('id') );

        // Calculate character width
        var test = jQuery("<span>X</span>").appendTo(self._content);
        var columns = Math.round( self._content.width() * (1/test.width()) );
        test.remove();

        var sequence = new Biojs.Sequence({
            target : self._content.attr('id'),
            format : 'FASTA',
            id : alignment.accession,
            formatSelectorVisible: false,
            columns: { size: columns, spacedEach: 10 }
        });

        var proteinStructure = new Biojs.Protein3DWS({
            id: alignment.pdbId,
            target: self._beta.attr('id'),
            width: Math.round( self._beta.width() ),
            height: self._container.height(),
            proxyUrl: self.opt.proxyUrl,
            jmolFolder: self.opt.jmolFolder
        });

        sequence.onSelectionChange( function (e) {
            // [e.start, e.end] from the event data corresponds to the protein sequence positions
            // which need to be aligned with PDB structure
            var selection = {start: e.start, end: e.end};

            selection.start -= alignment.offset;
            selection.end -= alignment.offset;

            proteinStructure.setSelection( selection );
        });

    },

    _showSequence: function( accession ){

        var self = this;

        this._content.children().remove();

        var sequence = new Biojs.Sequence({
            target : this._content.attr('id'),
            format : 'FASTA',
            id : accession,
            formatSelectorVisible: false,
            columns: { size: Math.round( self._content.width()/20 ), spacedEach: 10 }
        });
    },

    _showImage: function( pdbId ){

        this._beta.children().remove();

        var img = jQuery('<img src="http://www.ebi.ac.uk/pdbe-srv/view/images/entry/'+ pdbId + '_cbc600.png"/>')
            .appendTo(this._beta)
            .addClass('crop');

    },

    _showFeatures: function( accession ) {

        var self = this;

        this._content.children().remove();
        this._adjustContentSize();

        this._requestFeatures( accession, function(xml){

            Biojs.console.log("Features received " + xml );

            var xmlDoc = "";

            try {
                xmlDoc = jQuery.parseXML( xml );
            } catch (e) {
                Biojs.console.log("XML parser error" + e);
            }

            var features = jQuery('<ul class="features"></ul>').appendTo(self._content);
            var label="", value="";

            jQuery(xmlDoc).find('FEATURE')
                .each( function(){
                    //features.push( self._decodeFeature(this) );
                    label = '<span class="label">' + jQuery(this).attr('label') + '</span>';
                    value = '<span class="value">' + jQuery(this).children('NOTE:first').text() + '</span>';

                    features.append('<li>' + label + value + '</li>');
                });
        });
    },

    /*
     * Function: Biojs.ProteinPortafolio._requestFeatures
     * Purpose:  Request data to the server
     * Returns:  -
     * Inputs:   opt -> {Object} options object.
     */
    _requestFeatures: function( accession, action ){

        var self = this;

        Biojs.console.log("Requesting features for '" + accession + "'" );

        var httpRequest = {
            url: self.opt.proxyUrl,
            data: [{ name: "url", value: self.opt.featuresUrl + "?segment=" + accession }],
            method: "GET",
            dataType: "text",
            success: action,
            error: function(e) {
                Biojs.console.log("Error requesting features for " + accession );
            }
        };

        jQuery.ajax(httpRequest);

    },
    
    _adjustContentSize: function() {

    	if ( this._beta.children().length > 0 ) {
    		this._alpha.addClass('alpha');
    		this._beta.addClass('beta');
    		this._content.height(this._container.height() - this._header.height() - this._toolbar.height());
    		
    	} else {
    		this._alpha.removeClass('alpha');
    		this._beta.removeClass('beta');
    		this._content.height('auto');
    	}
    }

});







