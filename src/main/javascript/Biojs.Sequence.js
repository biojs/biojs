/** 
 * Sequence component 
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, <a href="mailto:secevalliv@gmail.com">Jose Villaveces</a>
 * @version 1.0.0
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download'>jQuery UI 1.8.16</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js"></script>
 * 
 * @param {Object} options An object with the options for Sequence component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} sequence 
 *    The sequence to be displayed.
 *    
 * @option {string} [id] 
 *    Sequence identifier if apply.
 *    
 * @option {string} [format="FASTA"] 
 *    The display format for the sequence representation.
 *    
 * @option {Object[]} [highlights] 
 * 	  For highlighting multiple regions. 
 *    <pre class="brush: js" title="Syntax:"> 
 *    [
 *    	// Highlight aminoacids from 'start' to 'end' of the current strand using the specified 'color' (optional) and 'background' (optional).
 *    	{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt; [, id:&lt;idVal1&gt;] [, color: &lt;HTMLColor&gt;] [, background: &lt;HTMLColor&gt;]}, 
 *    	//
 *    	// Any others highlights
 *    	...,  
 *    	// 
 *    	{ start: &lt;startValN&gt;, end: &lt;endValN&gt; [, id:&lt;idValN&gt;] [, color: &lt;HTMLColor&gt;] [, background: &lt;HTMLColor&gt;]}
 *    ]</pre>
 * 
 * <pre class="brush: js" title="Example:"> 
 * highlights : [
 * 		{ start:30, end:42, color:"white", background:"green", id:"spin1" },
 *		{ start:139, end:140 }, 
 *		{ start:631, end:633, color:"white", background:"blue" }
 *	]
 * </pre>
 * 
 * @option {Object} [columns={size:40,spacedEach:10}] 
 * 	  Options for displaying the columns. Syntax: { size: &lt;numCols&gt;, spacedEach: &lt;numCols&gt;}
 * 
 * @option {Object} [selection] 
 * 	  Positions for the current selected region. Syntax: { start: &lt;startValue&gt;, end: &lt;endValue&gt;}
 * 
 * @option {Object[]} [annotations] 
 *    Set of overlapping annotations. Must be an array of objects following the syntax:
 *     		<pre class="brush: js" title="Syntax:">
 *            [ 
 *              // An annotation:
 *              { name: &lt;name&gt;, 
 *                html: &lt;message&gt;, 
 *                color: &lt;color_code&gt;, 
 *                regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt; color: &lt;HTMLColor&gt;}, ...,{ start: &lt;startValN&gt;, end: &lt;endValN&gt;, color: &lt;HTMLColor&gt;}] 
 *              }, 
 *              
 *              // ...
 *              // more annotations here 
 *              // ...
 *            ]
 *    		 </pre>
 *    where:
 *      <ul>
 *        <li><b>name</b> is the unique name for the annotation</li>
 *        <li><b>html</b> is the message (can be HTML) to be displayed in the tool tip.</li>
 *        <li><b>color</b> is the default HTML color code for all the regions.</li>
 *        <li><b>regions</b> array of objects defining the intervals which belongs to the annotation.</li>
 *        <li><b>regions[i].start</b> is the starting character for the i-th interval.</li>
 *        <li><b>regions[i].end</b> is the ending character for the i-th interval.</li>
 *        <li><b>regions[i].color</b> is an optional color for the i-th interval.   
 *      </ul> 
 *       
 * @example 
 * var theSequence = '"METLCQRLNVCQDKILTHYENDSTDLRDHIDYWKHMRLECAIYYKAREMGFKHINHQVVPTLAVSKNKALQAIELQLTLETIYNSQYSNEKWTLQDVSLEVYLTAPTGCIKKHGYTVEVQFDGDICNTMHYTNWTHIYICEEASVTVVEGQVDYYGLYYVHEGIRTYFVQFKDDAEKYSKNKVWEVHAGGQVILCPTSVFSSNEVSSPEIIRQHLANHPAATHTKAVALGTEETQTTIQRPRSEPDTGNPCHTTKLLHRDSVDSAPILTAFNSSHKGRINCNSNTTPIVHLKGDANTLKCLRYRFKKHCTLYTAVSSTWHWTGHNVKHKSAIVTLTYDSEWQRDQFLSQVKIPKTITVSTGFMSI"';
 * var mySequence = new Biojs.Sequence({
 * 		sequence : theSequence,
 * 		target : "YourOwnDivId",
 * 		format : 'CODATA',
 * 		id : 'P918283',
 * 		annotations: [
 *        { name:"CATH", 
 * 	  		color:"#F0F020", 
 * 	  		html: "Using color code #F0F020 ", 
 * 	  		regions: [{start: 122, end: 135}]
 * 		  },
 *        { name:"TEST", 
 *          html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
 *          color:"green", 
 *          regions: [
 *            {start: 285, end: 292},
 *            {start: 293, end: 314, color: "#2E4988"}]
 *        }
 *      ],
 *      highlights : [
 *      	{ start:30, end:42, color:"white", background:"green", id:"spin1" },
 *      	{ start:139, end:140 }, 
 *      	{ start:631, end:633, color:"white", background:"blue" }
 *      ]
 * });	
 * 
 */

Biojs.Sequence = Biojs.extend(
/** @lends Biojs.Sequence# */
{	
	constructor: function (options) {
		var self = this;

		this._container = jQuery( "#" + this.opt.target );
		
		// Lazy initialization 
		this._container.ready(function() {
			self._initialize();
		});
	},
	
	/**
	 * Default values for the options
	 * @name Biojs.Sequence-opt
	 */
	opt : {
		
		sequence : "",
		id : "",
		target : "",
		format : "FASTA",
		selection: { start: 0, end: 0 },
		columns: { size: 35, spacedEach: 10 },
		highlights : [],
		annotations: [],
		sequenceUrl: 'http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/sequence',
		
		// Styles 
		selectionColor : 'Yellow',
		selectionFontColor : 'black',
		highlightFontColor : 'red',
		highlightBackgroundColor : 'white',
		fontFamily: '"Andale mono", courier, monospace',
		fontSize: '12px',
		fontColor : 'inherit',
		backgroundColor : 'inherit',
		width: undefined,
		height: undefined,
		formatSelectorVisible: true
	},
	
	/**
	 * Array containing the supported event names
	 * @name Biojs.Sequence-eventTypes
	 */
	eventTypes : [
		/**
		 * @name Biojs.Sequence#onSelectionChanged
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {int} start A number indicating the start of the selection.
		 * @eventData {int} end A number indicating the ending of selection.
		 * @example 
		 * mySequence.onSelectionChanged(
		 *    function( objEvent ) {
		 *       alert("Selected: " + objEvent.start + ", " + objEvent.end );
		 *    }
		 * ); 
		 * 
		 * */
		"onSelectionChanged",
		
		/**
		 * @name Biojs.Sequence#onSelectionChange
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {int} start A number indicating the start of the selection.
		 * @eventData {int} end A number indicating the ending of selection.
		 * @example 
		 * mySequence.onSelectionChange(
		 *    function( objEvent ) {
		 *       alert("Selection in progress: " + objEvent.start + ", " + objEvent.end );
		 *    }
		 * );  
		 * 
		 * 
		 * */
		"onSelectionChange",
		
		/**
		 * @name Biojs.Sequence#onAnnotationClicked
		 * @event
		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
		 * @eventData {Object} source The component which did triggered the event.
		 * @eventData {string} type The name of the event.
		 * @eventData {string} name The name of the selected annotation.
		 * @eventData {int} pos A number indicating the position of the selected amino acid.
		 * @example 
		 * mySequence.onAnnotationClicked(
		 *    function( objEvent ) {
		 *       alert("Clicked " + objEvent.name + " on position " + objEvent.pos );
		 *    }
		 * );  
		 * 
		 * */
		"onAnnotationClicked"
	],

	// internal members
	_headerDiv : null,
	_contentDiv : null,
	
	// Methods

	_initialize: function () {
		
		if ( this.opt.width !== undefined ) {
			this._container.width( this.opt.width );
		}
		
		if ( this.opt.height !== undefined ) {
			this._container.height( this.opt.height );
		}
		
		// Disable text selection
		
		this._container.css({
			'-moz-user-select':'none',
			'-webkit-user-select':'none',
			'user-select':'none'
        });
		
		// DIV for the format selector
		this._buildFormatSelector();
		
		// DIV for the sequence
		this._contentDiv = jQuery('<div></div>').appendTo(this._container);
		this._contentDiv.css({
				'font-family': this.opt.fontFamily,
				'font-size': this.opt.fontSize,
				'text-align': 'left'
			});
		
		// Initialize highlighting 
		this._highlights = this.opt.highlights;
		
		// Initialize annotations
		this._annotations = this.opt.annotations;
		
		//Initialize tooltip
		jQuery('<div id="sequenceTip' + this.getId() + '"></div>') 
	        .css({	
	        	'position': "absolute",
	        	'z-index': "999999",
	        	'color': "#fff",
	        	'font-size': "12px",
	        	'width': "auto",
	        	'display': 'none'
	        })
	        .addClass("tooltip")
	        .appendTo("body")
	        .hide();

		if ( ! Biojs.Utils.isEmpty(this.opt.sequence) ) {
			this._redraw();
			
		} else if ( ! Biojs.Utils.isEmpty(this.opt.id) ) {
			this._requestSequence( this.opt.id );
			
		} else {
			this.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
		}
		
	},
	
	
	/**
	 * Shows the columns indicated by the indexes array.
	 * @param {string} seq The sequence strand.
	 * @param {string} [identifier] Sequence identifier.
	 * 
	 * @example 
	 * mySequence.setSequence("P99999");
	 * 
	 */
    setSequence: function ( seq, identifier ) {

    	if ( seq.match(/^[A-z]([0-9])*$/g) ) {
    		this._requestSequence( arguments[0] );
    		
    	} else {
    		this.opt.sequence = seq;
        	this.opt.id = identifier; 
        	this._highlights = [];
    		this._highlightsCount = 0;
    		this.opt.selection = { start: 0, end: 0 };
    		this._annotations = [];
    		
    		this._contentDiv.children().remove();
    		this._redraw();
    	}
    },
    
    _requestSequence: function ( accession ) {
		var self = this;
    	
    	Biojs.console.log("Requesting sequence for: " + accession );

		jQuery.ajax({ 
			url: self.opt.sequenceUrl,
			dataType: "xml",
			data: { segment: accession },
			success: function ( xml  ) {
				try {
					
					var sequenceNode = jQuery(xml).find('SEQUENCE:first');
					self.setSequence( sequenceNode.text(), sequenceNode.attr("id"), sequenceNode.attr("label") );
					
				} catch (e) {
					Biojs.console.log("Error decoding response data: " + e.message );
					self.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
				}

			},
			error: function (jqXHR, textStatus, errorThrown) {
				Biojs.console.log("Error decoding response data: " + textStatus );
				self.clearSequence("Error requesting the sequence to the server " + this.url , "../biojs/css/images/warning_icon.png");
			}
		});
    },
	
    /**
	 * Shows the columns indicated by the indexes array.
	 * @param {string} [showMessage] Message to be showed.
	 * @param {string} [icon] Icon to be showed a side of the message
	 * 
	 * @example 
	 * mySequence.clearSequence("No sequence available", "../biojs/css/images/warning_icon.png");
	 * 
	 */
    clearSequence: function ( showMessage, icon ) {
    	
    	var message = undefined;
    		
    	this.opt.sequence = "";
    	this.opt.id = ""; 
    	this._highlights = [];
		this._highlightsCount = 0;
		this.opt.selection = { start: 0, end: 0 };
		this._annotations = [];
		this._contentDiv.children().remove();
		
		this._headerDiv.hide();
		
		if ( undefined !== showMessage ) {
			message = jQuery('<div>' + showMessage + '</div>')
				.appendTo(this._contentDiv)
				.addClass("message");
			
			if ( undefined !== icon ) {
				message.css({
					'background': 'transparent url("' + icon + '") no-repeat center left',
					'padding-left': '20px'
				});
			}
		}
    },
	
	/**
    * Set the current selection in the sequence causing the event {@link Biojs.Sequence#onSelectionChanged}
    *
    * @example
    * // set selection from the position 100 to 150 
    * mySequence.setSelection(100, 150);
    * 
    * @param {int} start The starting character of the selection.
    * @param {int} end The ending character of the selection
    */
	setSelection : function(start, end) {
		if(start > end) {
			var aux = end;
			end = start;
			start = aux;

		}

		if(start != this.opt.selection.start || end != this.opt.selection.end) {
			this._setSelection(start, end);
			this.raiseEvent(
					Biojs.Sequence.EVT_ON_SELECTION_CHANGED, 
					{ "start" : start, "end" : end }
			);
		}
	},
	
	_buildFormatSelector: function () {
		var self = this;
		
		this._headerDiv = jQuery('<div></div>').appendTo(this._container);
		this._headerDiv.css({
			'font-family': '"Heveltica Neue", Arial, "sans serif"',
			'font-size': '14px'	
		}).append('Format: ');
		
		this._formatSelector = jQuery('<select> '+
				'<option value="FASTA">FASTA</option>'+
				'<option value="CODATA">CODATA</option>'+
				'<option value="PRIDE">PRIDE</option>'+
				'<option value="RAW">RAW</option></select>').appendTo(self._headerDiv);

		this._formatSelector.change(function(e) {
			self.opt.format = jQuery(this).val();
			self._redraw();
		});
		
		this._formatSelector.val(self.opt.format);	
		
		this.formatSelectorVisible( this.opt.formatSelectorVisible );
	},
	
	/**
    * Highlights a region using the font color defined in {Biojs.Protein3D#highlightFontColor} by default is red.
    *
    * @deprecated use addHighlight instead.
    * 
    * @param {int} start The starting character of the highlighting.
    * @param {int} end The ending character of the highlighting.
    * @param {string} [color] HTML color code.
    * @param {string} [background] HTML color code.
    * @param {string} [id] Custom identifier.
    * 
    * @return {int} representing the id of the highlight on the internal array. Returns -1 on failure  
    */
	highlight : function (start, end, color, background, id ) {
		return this.addHighlight({ "start": start, "end": end, "color": color, "background": background, "id": id });
	},
	
	/**
    * Highlights a region using the font color defined in {Biojs.Sequence#highlightFontColor} by default is red.
    *
    * @example
    * // highlight the characters within the position 100 to 150, included.
    * mySequence.addHighlight( { "start": 100, "end": 150, "color": "white", "background": "red", "id": "aaa" } );
    * 
    * @param {Object} h The highlight defined as follows:
    * 	
    * 
    * @return {int} representing the id of the highlight on the internal array. Returns -1 on failure  
    */
	addHighlight : function ( h ) {
		var id = '-1';
		var color = "";
		var background = "";
		var highlight = {};
		
		if ( h instanceof Object && h.start <= h.end ) {
			
			color = ( "string" == typeof h.color )? h.color : this.opt.highlightFontColor;
			background = ( "string" == typeof h.background )? h.background : this.opt.highlightBackgroundColor;
			id = ( "string" == typeof h.id )? h.id : (new Number(this._highlightsCount++)).toString();
			
			highlight = { "start": h.start, "end": h.end, "color": color, "background": background, "id": id };
			
			this._highlights.push(highlight);
			this._applyHighlight(highlight);
			this._restoreSelection(h.start,h.end);
		} 
		
		return id;
	},
	/* 
     * Function: Biojs.Sequence._applyHighlight
     * Purpose:  Apply the specified color and background to a region between 'start' and 'end'.
     * Returns:  -
     * Inputs: highlight -> {Object} An object containing the fields start (int), end (int), 
     * 						color (HTML color string) and background (HTML color string).
     */
	_applyHighlight: function ( highlight ) {		
		var seq = this._contentDiv.find('.sequence');
		for ( var i = highlight.start - 1; i < highlight.end; i++ ){
			jQuery(seq[i])
				.css({ 
					"color": highlight.color,
					"background-color": highlight.background})
				.addClass("highlighted");
		}
	},
	/* 
     * Function: Biojs.Sequence._applyHighlights
     * Purpose:  Apply the specified highlights.
     * Returns:  -
     * Inputs: highlights -> {Object[]} An array containing the highlights to be applied.
     */
	_applyHighlights: function ( highlights ) {
		for ( var i in highlights ) {
			this._applyHighlight(highlights[i]);
		}
	},
	/* 
     * Function: Biojs.Sequence._restoreHighlights
     * Purpose:  Repaint the highlights in the specified region.
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be restored.
     * 		   end -> {int} End of the region to be restored.
     */
	_restoreHighlights: function ( start, end ) {
		var h = this._highlights;
		
		// paint the region using default blank settings
		this._applyHighlight({
			"start": start, 
			"end": end, 
			"color": this.opt.fontColor, 
			"background": this.opt.backgroundColor 
		});
		// restore highlights in that region
		for ( var i in h ) {
			// interval intersects with highlight i ?
			if ( !( h[i].start > end || h[i].end < start ) ) {
				a = ( h[i].start < start ) ? start : h[i].start;
				b = ( h[i].end > end ) ? end : h[i].end;
				this._applyHighlight({
					"start": a, 
					"end": b, 
					"color": h[i].color, 
					"background": h[i].background 
				});
			}
		}
	},
	/* 
     * Function: Biojs.Sequence._restoreSelection
     * Purpose:  Repaint the current selection in the specified region. 
     * 			 It is used in the case of any highlight do overriding of the current selection. 
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be restored.
     * 		   end -> {int} End of the region to be restored.
     */
	_restoreSelection: function ( start, end ) {
		var sel = this.opt.selection;
		// interval intersects with current selection ?
		// restore selection
		if ( !( start > sel.end || end < sel.start ) ) {
			a = ( start < sel.start ) ? sel.start : start;
			b = ( end > sel.end ) ? sel.end : end;
			this._applyHighlight({
				"start": a, 
				"end": b, 
				"color": this.opt.selectionFontColor, 
				"background": this.opt.selectionColor
			});
		}
	},
	
	/**
    * Clear a highlighted region using.
    *
    * @deprecated use removeHighlight instead.
    * 
    * @param {int} id The id of the highlight on the internal array. This value is returned by method highlight.
    */
	unHighlight : function (id) {	
		this.removeHighlight(id);
	},
	
	/**
    * Remove a highlight.
    *
    * @example
    * // Clear the highlighted characters within the position 100 to 150, included.
    * mySequence.removeHighlight("spin1");
    * 
    * @param {string} id The id of the highlight on the internal array. This value is returned by method highlight.
    */
	removeHighlight : function (id) {	
		var h = this._highlights;
		for ( i in h ) {
			if ( h[i].id == id ) {
				start = h[i].start;
				end = h[i].end;
				h.splice(i,1);
				
				this._restoreHighlights(start,end);
				this._restoreSelection(start,end);
				
				break;
			}
		}
	},
	
	/**
    * Clear the highlights of whole sequence.
    * @deprecated use removeAllHighlights instead.
    */
	unHighlightAll : function () {
		this.removeAllHighlights();
	},
	
	/**
    * Remove all the highlights of whole sequence.
    *
    * @example
    * mySequence.removeAllHighlights();
    */
	removeAllHighlights : function () {
		this._highlights = [];
		this._restoreHighlights(1,this.opt.sequence.length);
		this._restoreSelection(1,this.opt.sequence.length);
	},
	
	/**
    * Changes the current displaying format of the sequence.
    *
    * @example
    * // Set format to 'FASTA'.
    * mySequence.setFormat('FASTA');
    * 
    * @param {string} format The format for the sequence to be displayed.
    */
	setFormat : function(format) {
		if ( this.opt.format != format.toUpperCase() ) {
			this.opt.format = format.toUpperCase();
			this._redraw();
		}

		var self = this;
		// Changes the option in the combo box
		this._headerDiv.find('option').each(function() {
			if(jQuery(this).val() == self.opt.format.toUpperCase()) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	},
	
	/**
    * Changes the current number of columns in the displayed sequence.
    *
    * @example
    * // Set the number of columns to 70.
    * mySequence.setNumCols(70);
    * 
    * @param {int} numCols The number of columns.
    */
	setNumCols : function(numCols) {
		this.opt.columns.size = numCols;
		this._redraw();
	},
	
	/**
    * Set the visibility of the drop-down list of formats.
    * 
    * @param {boolean} visible true: show; false: hide.
    */
	formatSelectorVisible : function (visible){
		if (visible) {
			this._headerDiv.show();
		} else {
			this._headerDiv.hide();
		}
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'true' argument.
    *
    * @example
    * // Shows the format selector.
    * mySequence.showFormatSelector();
    * 
    */
	showFormatSelector : function() {
		this._headerDiv.show();
	},
	
	/**
    * This is similar to a {Biojs.Protein3D#formatSelectorVisible} with the 'false' argument.
    * 
    * @example
    * // Hides the format selector.
    * mySequence.hideFormatSelector();
    * 
    */
	hideFormatSelector : function() {
		this._headerDiv.hide();
	},
	
	/**
    * Hides the whole component.
    * 
    */
	hide : function () {
		this._headerDiv.hide();
		this._contentDiv.hide();
	},

	/**
    * Shows the whole component.
    * 
    */
	show : function () {
		this._headerDiv.show();
		this._contentDiv.show();
	},
	/* 
     * Function: Biojs.Sequence._setSelection
     * Purpose:  Update the current selection. 
     * Returns:  -
     * Inputs: start -> {int} Start of the region to be selected.
     * 		   end -> {int} End of the region to be selected.
     */
	_setSelection : function(start, end) {
		
		var current = this.opt.selection;
		var change = {};
		
		// Which is the change on selection?
		if ( current.start == start ) {
			// forward?
			if ( current.end < end ) {
				change.start = current.end;
				change.end = end;
			} else {
				this._restoreHighlights(end, current.end);
			}
		} else if ( current.end == end ) {
			// forward?
			if ( current.start < start ) {
				this._restoreHighlights(current.start, start);
			} else {
				change.start = start;
				change.end = current.start;
			}
		} else {
			this._restoreHighlights(current.start, current.end);
			change.start = start;
			change.end = end;
		}

		current.start = start;
		current.end = end;

		if ( change.start != undefined ) {
			this._applyHighlight({
				"start": change.start, 
				"end": change.end, 
				"color": this.opt.selectionFontColor, 
				"background": this.opt.selectionColor 
			});
		}
		
	},
	/* 
     * Function: Biojs.Sequence._repaintSelection
     * Purpose:  Repaint the whole current selection. 
     * Returns:  -
     * Inputs: -
     */
	_repaintSelection: function(){
		var s = Biojs.Utils.clone(this.opt.selection);
		this._setSelection(0,0);
		this._setSelection(s.start,s.end);
	},
	
	/* 
     * Function: Biojs.Sequence._redraw
     * Purpose:  Repaint the current sequence. 
     * Returns:  -
     * Inputs: -
     */
	_redraw : function() {
		var i = 0;	
		var self = this;
		
		// Reset the content
		//this._contentDiv.text('');
		this._contentDiv.children().remove();
		
		// Rebuild the spans of the sequence 
		// according to format
		if(this.opt.format == 'RAW') {
			this._drawRaw();
		} else if(this.opt.format == 'CODATA') {
			this._drawCodata();
		} else if (this.opt.format == 'FASTA'){
			this._drawFasta();
		} else {
			this.opt.format = 'PRIDE';
			this._drawPride();
		}
		
		// Restore the highlighted regions
		this._applyHighlights(this._highlights);
		this._repaintSelection();
		this._addSpanEvents();
	},
	/* 
     * Function: Biojs.Sequence._drawFasta
     * Purpose:  Repaint the current sequence using FASTA format.  
     * Returns:  -
     * Inputs: -
     */
	_drawFasta : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);

		var i = 1;
		var arr = [];
	    var str = '>' + this.opt.id + ' ' + a.length + ' bp<br/>';
	    
	    var opt = {
			numCols: self.opt.columns.size,
		    numColsForSpace: self.opt.columns.spacedEach
		};

		str += this._drawSequence(a, opt);
		pre.html(str);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Biojs.Sequence._drawCodata
     * Purpose:  Repaint the current sequence using CODATA format.  
     * Returns:  -
     * Inputs: -
     */
	_drawCodata : function() {
		
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre style="white-space:pre"></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this.opt.id + '<br/>';
		str += 'SEQUENCE<br/>';
		
		var opt = {
				numLeft: true,
				numLeftSize: 7,
				numLeftPad:' ',
				numTop: true,
				numTopEach: 5,
				numCols: self.opt.columns.size,
			    numColsForSpace: 0,
			    spaceBetweenChars: true
		};
		
		str += this._drawSequence(a, opt);

		str += '<br/>///'
		pre.html(str);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Biojs.Sequence._drawAnnotations
     * Purpose:  Paint the annotations on the sequence.  
     * Returns:  -
     * Inputs: settings -> {object} 
     */
    _drawAnnotations: function ( settings ){ 
    	
    	var self = this;
    	var a = this.opt.sequence.toLowerCase().split('');    	
    	var annotations = this._annotations;
    	var leftSpaces = '';
    	var row = '';
    	var annot = '';
    	
    	// Index at the left?
		if ( settings.numLeft ) {
			leftSpaces += this._formatIndex(' ', settings.numLeftSize+2, ' ');
		}

		for ( var i = 0; i < a.length; i += settings.numCols ){
			row = '';
			for ( var key in annotations ){
				annotations[key].id = key;
				annot = this._getHTMLRowAnnot(i+1, annotations[key], settings);				
				if (annot.length > 0) {
					row += '<br/>';
					row += leftSpaces;
					row += annot;
					row += '<br/>';
				} 
			}
			
			if ( settings.numRight ) {
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#numRight'+ (i + settings.numCols) );
			} else {
				jQuery(row).insertAfter('div#'+self.opt.target+' div pre span#'+ (i + settings.numCols) );
			}
		}
		
		// add tool tips and background' coloring effect
		jQuery(this._contentDiv).find('.annotation').each( function(){
			self._addToolTip( this, function() {
				return self._getAnnotationString( jQuery(this).attr("id") );
			});
			
			jQuery(this).mouseover(function(e) {
				jQuery('.annotation.'+jQuery(e.target).attr("id")).each(function(){
					jQuery(this).css("background-color", jQuery(this).attr("color") );
				});
		    }).mouseout(function() {
		    	jQuery('.annotation').css("background-color", "white"); 
		    	
		    }).click(function(e) {
		    	self.raiseEvent( Biojs.Sequence.EVT_ON_ANNOTATION_CLICKED, {
		    		"name": self._annotations[ jQuery(e.target).attr("id") ].name,
		    		"pos": parseInt( jQuery(e.target).attr("pos") )
		    	});
		    });
			
		});

    },
    /* 
     * Function: Biojs.Sequence._getAnnotationString
     * Purpose:  Get the annotation text message for the tooltip 
     * Returns:  {string} Annotation text for the annotation
     * Inputs:   id -> {int} index of the internal annotation array
     */
    _getAnnotationString: function ( id ) {
		var annotation = this._annotations[id];
		return annotation.name + "<br/>" + ((annotation.html)? annotation.html : '');
    },
    
    /* 
     * Function: Biojs.Sequence._getHTMLRowAnnot
     * Purpose:  Build an annotation
     * Returns:  HTML of the annotation
     * Inputs:   currentPos -> {int}
     * 			 annotation -> {Object} 
     *  		 settings -> {Object}
     */
    _getHTMLRowAnnot : function (currentPos, annotation, settings) {
    	var styleBegin = 'border-left:1px solid; border-bottom:1px solid; border-color:';
    	var styleOn = 'border-bottom:1px solid; border-color:';
    	var styleEnd = 'border-bottom:1px solid; border-right:1px solid; border-color:';
    	
    	var row = [];
    	var end = (currentPos + settings.numCols);
    	var spaceBetweenChars = (settings.spaceBetweenChars)? ' ' : '';    	
    	var defaultColor = annotation.color;
    	var id = annotation.id;
    	for ( var pos=currentPos; pos < end ; pos++ ) {
			// regions
			for ( var r in annotation.regions ) {
				region = annotation.regions[r];
				
				spaceAfter = '';
				spaceAfter += (pos % settings.numColsForSpace == 0 )? ' ' : '';
				spaceAfter += spaceBetweenChars;
				
				color = ((region.color)? region.color : defaultColor);
				data = 'class="annotation '+id+'" id="'+id+'" color="'+color+'" pos="'+pos+'"';
				
				if ( pos == region.start ) {
					row[pos] = '<span style="'+styleBegin+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos == region.end ) {
					row[pos] = '<span style="'+styleEnd+color+' " '+data+'> ';
					//row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if ( pos > region.start && pos < region.end ) {
					row[pos] = '<span style="'+styleOn+color+'" '+data+'> ';
					row[pos] += spaceAfter;
					row[pos] += '</span>';
				} else if (!row[pos]) {
					row[pos] = ' ';
					row[pos] += spaceAfter;
				}
			}
		}

       	var str = row.join("");
    	
    	return ( str.indexOf("span") == -1 )? "" : str;
    },
    /* 
     * Function: Biojs.Sequence._drawRaw
     * Purpose:  Repaint the current sequence using RAW format.  
     * Returns:  -
     * Inputs: -
     */
	_drawRaw : function() {
		var self = this;
		var a = this.opt.sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);

		var opt = {
			numCols: self.opt.columns.size
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Biojs.Sequence._drawPride
     * Purpose:  Repaint the current sequence using PRIDE format.  
     * Returns:  -
     * Inputs: -
     */
	_drawPride : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = jQuery('<pre></pre>').appendTo(this._contentDiv);
	
		opt = {
			numLeft: true,
			numLeftSize: 5,
			numLeftPad:'0',
			numRight: true,
			numRightSize: 5,
			numRightPad: '0',
			numCols: self.opt.columns.size,
		    numColsForSpace: self.opt.columns.spacedEach
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	/* 
     * Function: Biojs.Sequence._drawSequence
     * Purpose:  Repaint the current sequence using CUSTOM format.  
     * Returns:  -
     * Inputs:   a -> {char[]} a The sequence strand.
     * 			 opt -> {Object} opt The CUSTOM format.
     */
	_drawSequence : function(a, opt) {
		var str = '';

		var spaceStyle =  "white-space: pre;";
		
		// Index at top?
		if( opt.numTop )
		{
			str += '<span style="'+spaceStyle+'" class="numTop">'
			var size = (opt.spaceBetweenChars)? opt.numTopEach*2: opt.numTopEach;
			
			if (opt.numLeft) {
				str += this._formatIndex(' ', opt.numLeftSize, ' ');
			}
			
			str += this._formatIndex(' ', size, ' ');
			
			for(var x = opt.numTopEach; x < opt.numCols; x += opt.numTopEach) {
				str += this._formatIndex(x, size, ' ', true);
			}
			str += '</span><br/>'
		}
		
		
		// Index at the left?
		if (opt.numLeft) {
			str += this._formatIndex(1, opt.numLeftSize, opt.numLeftPad);
			str += '  ';
		}

		var j=1;
		for (var i=1; i <= a.length; i++) {

			if( i % opt.numCols == 0) {	
				str += '<span class="sequence" id="'+i+'">' + a[i-1] + '</span>';
				
				if (opt.numRight) {
					str += '<span style="'+spaceStyle+'" id="numRight'+i+'">';
					str += '  ';
					str += this._formatIndex(i, opt.numRightSize, opt.numRightPad);	
					str += '</span>';
				}
				
				str += '<br/>';
				
				if (opt.numLeft) {
					str += '<span id="numLeft'+i+'">';
					str += this._formatIndex(i+1, opt.numLeftSize, opt.numLeftPad);
					str += '  ';
					str += '</span>';
				}
				
				j = 1;
				
			} else {
				str += '<span class="sequence" style="'+spaceStyle+'" id="'+i+'">' + a[i-1];
				str += ( j % opt.numColsForSpace == 0)? ' ' : '';
				str += (opt.spaceBetweenChars)? ' ' : '';
				str += '</span>';
				j++;
			}
		}
		
		str += '<br/>'	
			
		if (jQuery.browser.msie) {
			str = "<pre>" + str + "</pre>";
		}	
			
		return str;
	},
	/* 
     * Function: Biojs.Sequence._formatIndex
     * Purpose:  Build the HTML corresponding to counting numbers (top, left, right) in the strand.
     * Returns:  -
     * Inputs:   number -> {int} The number 
     * 			 size -> {int} Number of bins to suit the number.
     * 			 fillingChar -> {char} Character to be used for filling out blank bins.
     * 			 alignLeft -> {bool} Tell if aligned to the left.
     */
	_formatIndex : function( number, size, fillingChar, alignLeft) {
		var str = number.toString();
		var filling = '';
		var padding = size - str.length;	
		if ( padding > 0 ) {
			while ( padding-- > 0 ) {
				filling += ("<span>"+fillingChar+"</span>");
			}
			if (alignLeft){
				str = number+filling;
			} else {
				str = filling+number;
			}
		}
		return str;
	},
	/* 
     * Function: Biojs.Sequence._addSpanEvents
     * Purpose:  Add the event handlers to the strand.
     * Returns:  -
     * Inputs:   -
     */
	_addSpanEvents : function() {
		var self = this;
		var isMouseDown = false;
		var currentPos;

		self._contentDiv.find('.sequence').each( function () {	
			
			// Register the starting position
			jQuery(this).mousedown(function() {
				currentPos = parseInt(jQuery(this).attr('id'));
				clickPos = currentPos;
				self._setSelection(clickPos,currentPos);
				isMouseDown = true;
				
				// Selection is happening, raise an event
				self.raiseEvent(
					Biojs.Sequence.EVT_ON_SELECTION_CHANGE, 
					{ 
						"start" : self.opt.selection.start, 
						"end" : self.opt.selection.end 
					}
				);
			
			}).mouseover(function() {
				// Update selection
				// Show tooltip containing the position
				
				currentPos = parseInt(jQuery(this).attr('id'));
				
				if(isMouseDown) {
					if( currentPos > clickPos ) {
						self._setSelection(clickPos, currentPos);
					} else {
						self._setSelection(currentPos, clickPos);
					}
					
					// Selection is happening, raise an event
					self.raiseEvent( Biojs.Sequence.EVT_ON_SELECTION_CHANGE, { 
						"start" : self.opt.selection.start, 
						"end" : self.opt.selection.end 
					});
				} 
				
			}).mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self.raiseEvent( Biojs.Sequence.EVT_ON_SELECTION_CHANGED, { 
					"start" : self.opt.selection.start, 
					"end" : self.opt.selection.end 
				});
			});
			
			// Add a tooltip for this sequence base.
			self._addToolTip.call( self, this, function( ) {
				if (isMouseDown) {
	     			return "[" + self.opt.selection.start +", " + self.opt.selection.end + "]";
	     		} else {
	     			return currentPos;
	     		}
			});
			
		})
		.css('cursor', 'pointer');
	},
	/* 
     * Function: Biojs.Sequence._addTooltip
     * Purpose:  Add a tooltip around the target DOM element provided as argument
     * Returns:  -
     * Inputs:   target -> {Element} DOM element wich is the targeted focus for the tooltip.
     * 			 cbGetMessageFunction -> {function} A callback function wich returns the message to be displayed in the tip.
     */
	_addToolTip : function ( target, cbGetMessageFunction ) {
		
 		var tipId = '#sequenceTip' + this.getId();
		
		jQuery(target).mouseover(function(e) {
			
	 		var offset = jQuery(e.target).offset();

			if ( ! jQuery( tipId ).is(':visible') ) {
		        jQuery( tipId ) 
		        	.css({
		        		'background-color': "#000",
		        		'padding': "3px 10px 3px 10px",
		        		'top': offset.top + jQuery(e.target).height() + "px",
		        		'left': offset.left + jQuery(e.target).width() + "px"
		        	})
			        .animate( {opacity: '0.85'}, 10)
			        .html( cbGetMessageFunction.call( target ) )
			        .show();
			}

	    }).mouseout(function() {
	        //Remove the appended tooltip template
	        jQuery( tipId ).hide();	         
	    });
	},
	
   /**
    * Annotate a set of intervals provided in the argument.
	* 
	* @deprecated Use addAnnotation() instead.
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	setAnnotation: function ( annotation ) {
		this.addAnnotation(annotation);
	},
	
	/**
    * Annotate a set of intervals provided in the argument.
    * 
    * @example
    * // Annotations using regions with different colors.
    * mySequence.addAnnotation({
	*    name:"UNIPROT", 
	*    html:"&lt;br&gt; Example of &lt;b&gt;HTML&lt;/b&gt;", 
	*    color:"green", 
	*    regions: [
	*       {start: 540, end: 560},
	*       {start: 561, end:580, color: "#FFA010"}, 
	*       {start: 581, end:590, color: "red"}, 
	*       {start: 690, end:710}]
	* });
	* 
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	addAnnotation: function ( annotation ) {
		this._annotations.push(annotation);
		this._redraw();
	},
	
	/**
    * Removes an annotation by means of its name.
    * 
    * @example 
    * // Remove the UNIPROT annotation.
    * mySequence.removeAnnotation('UNIPROT'); 
    * 
    * @param {string} name The name of the annotation to be removed.
    * 
    */
	removeAnnotation: function ( name ) {
		for (var i=0; i < this._annotations.length ; i++ ){
			if(name != this._annotations[i].name){
				this._annotations.splice(i,1);
				this._redraw();
				break;
			}
		}
	},
	/**
    * Removes all the current annotations.
    * 
    * @example 
    * mySequence.removeAllAnnotations(); 
    * 
    */
	removeAllAnnotations: function () {
		this._annotations = [];
		this._redraw();
	}
	
},
{
	EVT_ON_SELECTION_CHANGE: "onSelectionChange",
	EVT_ON_SELECTION_CHANGED: "onSelectionChanged",
	EVT_ON_ANNOTATION_CLICKED: "onAnnotationClicked"

});


