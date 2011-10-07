/** 
 * Sequence component 
 * 
 * @class
 * @extends Biojs
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @requires <a href='http://jqueryui.com/download'>jQuery UI 1.8.16</a>
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, based on the code made 
 * by <a href="mailto:secevalliv@gmail.com">Jose Villaveces</a>
 * 
 * @param {Object} options An object with the options for Sequence component.
 * @option {string} target Identifier of the DIV tag where the component should be displayed.
 * @option {string} sequence The sequence to be displayed.
 * @option {int} id (optional) Sequence identifier if apply.
 * @option {int} format (optional) The display format for the sequence representation.
 * @option {Object[]} highlights (Optional) For highlighting multiple regions. Syntax: [ { start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;} ]
 */

Biojs.Sequence = Biojs.extend(
/** @lends Biojs.Sequence# */
{	
	constructor: function (options) {
		this.init();
	},
	
   /** 
    * Default options (and its values) for the Protein3D component. 
    * @name Biojs.Sequence-opt
    * @type Object
    */
	opt : {
		sequence : "",
		id : "",
		target : "",
		format : "FASTA",
		selectionStart : 0,
		selectionEnd : 0,
		numCols : 40,
		numColsForSpace : 10,
		highlights : [],
		
		
//		[ 
//		  {
//			  name:"UNIPROT", html:"<br> Example of HTML <ul><li>Example 1</li><li>Example 2</li></ul>", color:"green", 
//			  regions: [{start: 11, end: 120},
//			            {start: 140, end:147, color: "#FFA010"}, 
//			            {start: 148, end:150, color: "red"}, 
//			            {start: 151, end:165}
//			  ] 
//		  },
//         {
//			  name:"CATH", color:"#F0F020", html: "<br>Using color code #F0F020 ", 
//       	  regions: [{start: 20, end: 200}]
//		  }
//		],
		annotations: [],
		

		// Styles 
		selectionColor : 'Yellow',
		highlightFontColor : 'red',
		highlightBackgroundColor : 'white',
		defaultFontColor : 'black',
		defaultBackgroundColor : 'white'
	},
	
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
		 * // Alternative:
		 * mySequence.addListener("onSelectionChanged",
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
		 * // Alternative:
		 * mySequence.addListener("onSelectionChange",
		 *    function( objEvent ) {
		 *       alert("Selection in progress: " + objEvent.start + ", " + objEvent.end );
		 *    }
		 * );
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
		 * // Alternative:
		 * mySequence.addListener("onAnnotationClicked",
		 *    function( objEvent ) {
		 *       alert("Clicked " + objEvent.name + " on position " + objEvent.pos );
		 *    }
		 * );
		 * 
		 * */
		"onAnnotationClicked"
	],
	
	// Initialize the component
	init : function() {
		var self = this;
		
		// Disable text selection
		$(self.opt.target).css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none'
        });

		self._headerDiv = $('<div></div>').appendTo(self.opt.target);
		self._contentDiv = $('<div style="white-space:pre-wrap"></div>').appendTo(self.opt.target);
		
		self._headerDiv.append('Format: ');

		var comboBox = $('<select> '+
			'<option value="FASTA">FASTA</option>'+
			'<option value="CODATA">CODATA</option>'+
			'<option value="PRIDE">PRIDE</option>'+
			'<option value="RAW">RAW</option></select>').appendTo(self._headerDiv);

		$(comboBox).change(function(e) {
			self.opt.format = comboBox.val();
			self._redraw();
		});
		
		for (var i in this.opt.highlights){
			this.highlight(this.opt.highlights[i].start, this.opt.highlights[i].end);
		}
		
		self._redraw();
	},

	// internal members
	_headerDiv : null,
	_contentDiv : null,
	
	// Methods
	
	setSelectionColor : function(color) {
		if( typeof this.opt.selectionColor != 'undefined' && typeof this.opt.selectionColor != 'object') {
			this.opt.selectionColor = color;
			if(this.opt.selectionStart > 0 && this.opt.selectionEnd > 0) {
				this._setSelection(this.opt.selectionStart, this.opt.selectionEnd);
			}
		}
	},
	
	setSelection : function(start, end) {
		if(start > end) {
			var aux = end;
			end = start;
			start = aux;

		}

		if(start != this.opt.selectionStart || end != this.opt.selectionEnd) {
			this._setSelection(start, end);
			this.raiseEvent('onSelectionChanged', {
				start : start,
				end : end
			});
		}
	},
	
	highlight : function (start, end) {
		if ( start <= end ) {
			for ( var i=start; i <= end; i++ ){
				this._contentDiv.find('.sequence#'+i)
					.css("color", this.opt.highlightFontColor)
					.addClass("highlighted");
			}
		}
	},
	
	unHighlight : function (start, end) {	
		for( var i=start; i <= end; i++ ) {
			this._contentDiv.find('span.sequence.highlighted#'+i)
				.removeClass("highlighted")
				.css("color", this.opt.defaultFontColor);
		}
	},
	
	unHighlightAll : function () {
		this._contentDiv.find('span.sequence.highlighted').each( function() {
			$(this).removeClass("highlighted").css("color", this.opt.defaultFontColor);
		});
	},
	
	setFormat : function(format) {
		if ( this.opt.format != format.toUpperCase() ) {
			this.opt.format = format.toUpperCase();
			this._redraw();
		}

		var self = this;
		// Changes the option in the combo box
		this._headerDiv.find('option').each(function() {
			if($(this).val() == self.opt.format.toUpperCase()) {
				$(this).attr('selected', 'selected');
			}
		});
	},
	
	setNumCols : function(numCols) {
		this.opt.numCols = numCols;
		this._redraw();
	},
	
	formatSelectorVisible : function (visible){
		if (visible) {
			this._headerDiv.show();
		} else {
			this._headerDiv.hide();
		}
	},
	
	showFormatSelector : function() {
		this._headerDiv.show();
	},
	
	hideFormatSelector : function() {
		this._headerDiv.hide();
	},
	
	hide : function () {
		this._headerDiv.hide();
		this._contentDiv.hide();
	},
	
	show : function () {
		this._headerDiv.show();
		this._contentDiv.show();
	},
	
	_setSelection : function(start, end) {
		var self = this;
		
		self.opt.selectionStart = start;
		self.opt.selectionEnd = end;

		var spans = this._contentDiv.find('.sequence');
		for(var i = 0; i < spans.length; i++) {
			if(i + 1 >= start && i + 1 <= end) {
				$(spans[i]).css("background-color", self.opt.selectionColor);
			} else {
				$(spans[i]).css("background-color", self.opt.defaultBackgroundColor);
			}
		}
	},
	
	_redraw : function() {
		var i = 0;	
		var self = this;
		var highlighted = [];

		this._contentDiv.find('.sequence.highlighted').each( function(){
			highlighted.push($(this).attr("id"));
		});
		
		// Reset the content
		this._contentDiv.text('');
		
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
		this._setSelection(this.opt.selectionStart, this.opt.selectionEnd);
		
		// Restore the highlighted regions
		for ( var i in highlighted ) {
			this._contentDiv.find('.sequence#'+highlighted[i]).each( function(){
				$(this).css("color", self.opt.highlightFontColor).addClass("highlighted");
			});	
		}

		this._addSpanEvents();
	},
	
	_drawFasta : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 1;
		var arr = [];
	    var str = '>' + this.opt.id + ' ' + a.length + ' bp<br/>';
		
	    this.opt.numLeft = false;
	    this.opt.numRight = false;
	    this.opt.numTop = false;
	    
		str += this._drawSequence(a, this.opt);
		pre.html(str);
		
		this._drawAnnotations(this.opt);
	},
	
	_drawCodata : function() {
		
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this.opt.id + '<br/>';
		str += 'SEQUENCE<br/>';
		
		var opt = {
				numLeft: true,
				numLeftSize: 7,
				numLeftPad:' ',
				numTop: true,
				numTopEach: 5,
				numCols: self.opt.numCols,
			    numColsForSpace: 0,
			    spaceBetweenChars: true
		};
		
		str += this._drawSequence(a, opt);

		str += '<br/>///'
		pre.html(str);
		
		this._drawAnnotations(opt);
	},
	
    _drawAnnotations: function(opt){ 
    	
    	var self = this;
    	var a = this.opt.sequence.toLowerCase().split('');    	
    	var annotations = this.opt.annotations;
    	var leftSpaces = '';
    	var row = '';
    	var annot = '';
    	
    	// Index at the left?
		if (opt.numLeft) {
			leftSpaces += this._formatIndex(' ', opt.numLeftSize+2, ' ');
		}

		for ( var i = 0; i < a.length; i += opt.numCols ){
			row = '';
			for ( var key in annotations ){
				annotations[key].id = key;
				annot = this._getHTMLRowAnnot(i+1, annotations[key], opt);				
				if (annot.length > 0) {
					row += '<br/>';
					row += leftSpaces;
					row += annot;
					row += '<br/>';
				} 
			}
			
			if ( opt.numRight ) {
				$(row).insertAfter('div'+self.opt.target+' > div > pre > span#numRight'+ (i+opt.numCols) );
			} else {
				$(row).insertAfter('div'+self.opt.target+' > div > pre > span#'+ (i+opt.numCols) );
			}
		}
		
		// add tool tips and background' coloring effect
		$(this._contentDiv).find('.annotation').each(function(){
			self._addToolTip($(this), function(a) {
				var annotation = self.opt.annotations[a.attr("id")];
				return annotation.name + "<br/>" + ((annotation.html)? annotation.html : '');
			});
			
			$(this).mouseover(function(eventObj) {
				$('.annotation.'+$(eventObj.srcElement).attr("id")).each(function(){
					$(this).css("background-color", $(this).attr("color") );
				});
		    }).mouseout(function() {
		    	$('.annotation').css("background-color", "white"); 
		    }).click(function(e) {
		    	var a = self.opt.annotations[$(e.srcElement).attr("id")];
		    	self.raiseEvent('onAnnotationClicked', {
		    		name: a.name,
		    		pos: $(e.srcElement).attr("pos")
		    	});
		    });
			
		});

    },
    
    _getHTMLRowAnnot : function (currentPos, annotation, opt) {
    	var styleBegin = 'border-left:1px solid; border-bottom:1px solid; border-color:';
    	var styleOn = 'border-bottom:1px solid; border-color:';
    	var styleEnd = 'border-bottom:1px solid; border-right:1px solid; border-color:';
    	
    	var row = [];
    	var endPos = (currentPos + opt.numCols);
    	var spaceBetweenChars = (opt.spaceBetweenChars)? ' ' : '';    	
    	var defaultColor = annotation.color;
    	var id = annotation.id;
    	for ( var pos=currentPos; pos < endPos ; pos++ ) {
			// regions
			for ( var r in annotation.regions ) {
				region = annotation.regions[r];
				
				spaceAfter = '';
				spaceAfter += (pos % opt.numColsForSpace == 0 )? ' ' : '';
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
	
	_drawRaw : function() {
		var self = this;
		var a = this.opt.sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var opt = {
			numCols: self.opt.numCols
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	
	_drawPride : function() {
		var self = this;
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);
	
		opt = {
			numLeft: true,
			numLeftSize: 5,
			numLeftPad:'0',
			numRight: true,
			numRightSize: 5,
			numRightPad: '0',
			numCols: self.opt.numCols,
		    numColsForSpace: self.opt.numColsForSpace
		};
		
		pre.html(
			this._drawSequence(a, opt)
		);
		
		this._drawAnnotations(opt);
	},
	
	_drawSequence : function(a, opt) {
		var str = '';
		// Index at top?
		if( opt.numTop )
		{
			var size = (opt.spaceBetweenChars)? opt.numTopEach*2: opt.numTopEach;
			
			if (opt.numLeft) {
				str += this._formatIndex(' ', opt.numLeftSize, ' ');
			}
			
			str += this._formatIndex(' ', size, ' ');
			
			for(var x = opt.numTopEach; x < opt.numCols; x += opt.numTopEach) {
				str += this._formatIndex(x, size, ' ', true);
			}
			str += '<br/>'
		}
		
		
		// Index at the left?
		if (opt.numLeft) {
			str += this._formatIndex(1, opt.numLeftSize, opt.numLeftPad);
			str += '  ';
		}

		for (var i=1; i <= a.length; i++) {
			if( i % opt.numCols == 0) {	
				str += '<span class="sequence" id="'+i+'">' + a[i-1] + '</span>';
				
				if (opt.numRight) {
					str += '  ';
					str += '<span id="numRight'+i+'">'
					str += this._formatIndex(i, opt.numRightSize, opt.numRightPad);	
					str += '</span>';
				}
				
				str += '<br/>';
				
				if (opt.numLeft) {
					str += this._formatIndex(i+1, opt.numLeftSize, opt.numLeftPad);
					str += '  ';
				}
				
			} else {
				str += '<span class="sequence" id="'+i+'">' + a[i-1];
				str += (i % opt.numColsForSpace == 0)? ' ' : '';
				str += (opt.spaceBetweenChars)? ' ' : '';
				str += '</span>';
			}
		}
		
		str += '<br/>'	
		return str;
	},
	
	
	_formatIndex : function( number, size, fillingChar, alignLeft) {
		var str = number.toString();
		var filling = '';
		var padding = size - str.length;	
		if ( padding > 0 ) {
			while ( padding-- > 0 ) {
				filling += fillingChar;
			}
			if (alignLeft){
				str = number+filling;
			} else {
				str = filling+number;
			}
		}
		return str;
	},
	
	_addSpanEvents : function() {
		var self = this;
		var isMouseDown = false;
		var currentPos;

		self._contentDiv.find('.sequence').each( function () {	
			
			// Register the starting position
			$(this).mousedown(function() {
				currentPos = parseInt($(this).attr('id'));
				clickPos = currentPos;
				self._setSelection(clickPos,currentPos);
				isMouseDown = true;
			
			}).mouseover(function() {
				// Update selection
				// Show tooltip containing the position
				
				currentPos = parseInt($(this).attr('id'));
				
				if(isMouseDown) {
					if( currentPos > clickPos ) {
						self._setSelection(clickPos, currentPos);
					} else {
						self._setSelection(currentPos, clickPos);
					}
					
					// Selection is happening, raise an event
					self.raiseEvent('onSelectionChange', {
						start : self.opt.selectionStart,
						end : self.opt.selectionEnd
					});
				} 
				
			}).mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self.raiseEvent('onSelectionChanged', {
					start : self.opt.selectionStart,
					end : self.opt.selectionEnd
				});
			});
			
			self._addToolTip($(this), function(e) {
				if (isMouseDown) {
	     			return "selected: [" + self.opt.selectionStart +", " + self.opt.selectionEnd + "]";	
	     		} else {
	     			return "position: " + currentPos;
	     		}
			});
		});
	},
	
	_addToolTip : function ( target, msgFunction ) {
		$(target).mouseover(function(e) {
     		var tip = msgFunction( $(this) );
	         
	        //Append the tooltip template and its value
	        $(this).append('<div id="tooltip"><div class="tipHeader"></div><div class="tipBody">' + tip + '</div><div class="tipFooter"></div></div>');     
	         
	        //Set the X and Y axis of the tooltip
	        $('#tooltip').css('top', e.pageY + 10 );
	        $('#tooltip').css('left', e.pageX + 20 );
	        
	        // Style values 
	        // Would be nice to have it in a css file 
	        $('#tooltip').css('position', "absolute" );
	        $('#tooltip').css('z-index', "9999" );
	        $('#tooltip').css('color', "#fff" );
	        $('#tooltip').css('font-size', "10px" );
	        $('#tooltip').css('width', "auto" );
	        
	        $('.tipHeader').css('background-color', "#000");
	        $('.tipHeader').css('height', "8px"); 
	        //$('.tipHeader').css('background', "images/tipHeader.gif");  
			
			$('.tipBody').css('background-color', "#000");
			$('.tipBody').css('padding', "3px 10px 3px 10px")

			$('.tipFooter').css('background-color', "#000");
	        $('.tipFooter').css('height', "8px"); 
	        //$('.tipFooter').css('background', "images/tipHeader.gif no-repeat");  
	         
	        //Show the tooltip with faceIn effect
	        $('#tooltip').fadeIn('500');
	        $('#tooltip').fadeTo('10',0.8);
	        
	        $(this).css('cursor', "pointer");
	         
	    }).mouseout(function() {
	        //Remove the appended tooltip template
	        $(this).children('div#tooltip').remove();	         
	    });
	},
	
   /**
    * Annotate a set of intervals provided in the argument.
    * 
    * @example 
    * // One simple annotation for region from 20 to 200.
    * myInstance.setAnnotation({
	*    name:"CATH", 
	*    color:"#F0F020", 
	*    html: "<br>Using color code #F0F020 ", 
    *    regions: [{start: 20, end: 200}]
	* }); 
    * 
    * @example
    * // Annotations using regions with different colors.
    * myInstance.setAnnotation({
	*    name:"UNIPROT", 
	*    html:"&lt;br&gt; Example of HTML &lt;ul&gt;&lt;li&gt;Example 1&lt;/li&gt;&lt;li&gt;Example 2&lt;/li&gt;&lt;/ul&gt;", 
	*    color:"green", 
	*    regions: [
	*       {start: 11, end: 120},
	*       {start: 140, end:147, color: "#FFA010"}, 
	*       {start: 148, end:150, color: "red"}, 
	*       {start: 151, end:165}]
	* });
	* 
    * 
    * @param {Object} annotation The intervals belonging to the same annotation. 
    * Syntax: { name: &lt;value&gt;, color: &lt;HTMLColorCode&gt;, html: &lt;HTMLString&gt;, regions: [{ start: &lt;startVal1&gt;, end: &lt;endVal1&gt;}, ...,  { start: &lt;startValN&gt;, end: &lt;endValN&gt;}] }
    */
	setAnnotation: function ( annotation ) {
		annotations.push(annotation);
	},
	
	removeAnnotation: function ( name ) {
		for (var i=0; i < this.opt.annotations.length ; i++ ){
			if(name == annotation.name){
				annotations.remove(i);
				return;
			}
		}
	}
	
	
	
});


