
Biojs.Sequence = Biojs.extend({
	
	constructor: function (options) {
		this.init();
	},
	
	// options 
	opt : {
		// The sequence to be displayed
		sequence : "",
		
		id : "",
		
		// Id of the destination DIV element
		target : "",
		
		// Format that sequence must be displayed
		format : "FASTA",

		// Save the current selected region
		selectionStart : 0,
		selectionEnd : 0,
		
		numCols : 40,
		numColsForSpace : 10,

		// Multiple highlighted regions
		// Syntax: [ { start: <startVal1>, end: <endVal1>}, ...,  { start: <startValN>, end: <endValN>} ]
		highlights : [],

		// Styles 
		selectionColor : 'Yellow',
		highlightFontColor : 'red',
		highlightBackgroundColor : 'white',
		defaultFontColor : 'black',
		defaultBackgroundColor : 'white'
	},
	
	// Events to be triggered 
	eventTypes : [
		"onSelectionChanged",
		"onSelectionChange"
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
		self._contentDiv = $('<div></div>').appendTo(self.opt.target);
		
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
		
		self._redraw();
		
		for ( var i in this.opt.highlights ) {
			this.highlight( this.opt.highlights[i].start, this.opt.highlights[i].end );
		}
		
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
		var spans = this._contentDiv.find('span');
		for(var i = 0; i < spans.length; i++) {
			if(i + 1 >= start && i + 1 <= end) {
				$(spans[i]).css("color", this.opt.highlightFontColor);
				$(spans[i]).css("background-color", this.opt.highlightBackgroundColor);
			} 
		}
	},
	
	unHighlight : function (start, end) {
		if (start < end) {
			var spans = this._contentDiv.find('span');
			for(var i = 1; i <= spans.length; i++) {
				if( i >= start && i <= end) {
					$(spans[i-1]).css("color", this.opt.defaultFontColor);
					$(spans[i]).css("background-color", this.opt.defaultBackgroundColor);
				} 
			}
		}
	},
	
	unHighlightAll : function () {
		var self = this;
		self._contentDiv.find('span').each(function(){
			$(this).css("color", self.opt.defaultFontColor);
			$(this).css("background-color", this.opt.defaultBackgroundColor);
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

		var spans = this._contentDiv.find('span');
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
		var highlighted = [];
		var self = this;
		
		// Save the highlighted regions
		this._contentDiv.find('span').each(function(){
			if ( $(this).css("color") == self.opt.highlightFontColor ) {
				highlighted.push(i);	
			}
			i++;
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
		var spans = this._contentDiv.find('span');
		for(var i = 0; i < highlighted.length; i++) {
			$( spans[ highlighted[i] ]).css("color", this.opt.highlightFontColor);
		}

		this._addSpanEvents();
	},
	
	_drawFasta : function() {
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 1;
		var arr = [];
		arr[0] = '>' + this.opt.id + ' ' + a.length + ' bp<br/>';
		while(i <= a.length) {
			if(i % this.opt.numCols == 0) {
				arr[i] = '<span>' + a[i-1] + '</span><br/>';
			} else {
				arr[i] = '<span>' + a[i-1] + '</span>';
			}
			i++;
		}
		pre.html(arr.join(''));
	},
	
	_drawCodata : function() {
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this.opt.id + '<br/>';
		str += 'SEQUENCE<br/>';
		str += '        ';
		for(var x = 1; x < this.opt.numCols; x++) {
			if(x % 5 == 0) {
				str += x;
				if(x == 5) {
					str += ' ';
				}				
			} else {
				str += '  ';
			}
		}
		while(i < a.length) {
			if(i % this.opt.numCols == 0) {
				str += '<br/>';	
				str += this._formatIndex(i+1, 7, ' ');
				str += ' ';
			}
			str += '<span>' + a[i] + ' </span>';
			i++;
		}
		str += '<br/>///'
		pre.html(str);
	},
	
	_drawRaw : function() {
		var a = this.opt.sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = $('<pre></pre>').appendTo(this._contentDiv);
		while(i < a.length) {

			if(((i + 1) % this.opt.numCols) == 0) {
				arr[i] = '<span>' + a[i] + '</span><br/>';
			} else {
				arr[i] = '<span>' + a[i] + '</span>';
			}
			i++;
		}
		pre.html(arr.join(''));
	},
	
	_drawPride : function() {
		var a = this.opt.sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);
		var str = '';
		var i = 1;
		var spaceCount = 1;
		
		str += this._formatIndex(i, 4, '0');
		str += '  ';
		str += '<span>' + a[0] + '</span>';
		
		while(i < a.length) {
			
			if(i % this.opt.numCols == 0) {
				str += '  ';	
				str += this._formatIndex(i, 4, '0');				
				str += '<br/>';
				str += this._formatIndex(i+1, 4, '0');
				str += '  ';
				spaceCount = 0;
				
			} else if ( spaceCount % this.opt.numColsForSpace == 0 ) {
				str += ' ';
			}

			str += '<span>' + a[i] + '</span>';
			i++;
			spaceCount++;
		}
		str += '<br/>'
		pre.html(str);
	},
	
	_formatIndex : function(number,size,fillingChar) {
		var str = number.toString();
		var padding = size - str.length;	
		if ( padding > 0 ) {
			str = '';
			while ( padding-- > 0 ) {
				str += fillingChar;
			}
			str += number;
		}
		return str;
	},
	
	_addSpanEvents : function() {
		var self = this;
		var spans = this._contentDiv.find('span');
		var isMouseDown = false;
		var dragRight = true;
		var currentPos = parseInt($(this).data('selection'));
		
		for(var i = 0; i < spans.length; i++) {
			var $currentSpan = $(spans[i]);

			$currentSpan.data('selection', i + 1);

			// Register the starting position
			$currentSpan.mousedown(function() {
				currentPos = parseInt($(this).data('selection'));
				clickPos = currentPos;
				self._setSelection(clickPos,currentPos);
				isMouseDown = true;
			});
			
			// Update selection
			// Show tooltip containing the position
			$currentSpan.mouseover(function(e) {
				currentPos = parseInt($(this).data('selection'));
				
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
			});
			
			$currentSpan.mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self.raiseEvent('onSelectionChanged', {
					start : self.opt.selectionStart,
					end : self.opt.selectionEnd
				});
			});
			
			$currentSpan.mouseout(function() {
				$('div'+self.opt.target+' > div#tooltip').remove();
			});
			
			$currentSpan.mouseover(function(e) {
         		var tip;
         		
         		if (isMouseDown) {
         			tip = "selected: [" + self.opt.selectionStart +", " + self.opt.selectionEnd + "]";	
         		} else {
         			tip = "position: " + currentPos;
         		}
		         
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
		        $('#tooltip').css('width', "150px" );
		        
		        $('.tipHeader').css('background-color', "#000");
		        $('.tipHeader').css('height', "8px"); 
		        //$('.tipHeader').css('background', "images/tipHeader.gif");  
				
				$('.tipBody').css('background-color', "#000");
				$('.tipBody').css('padding', "3px 3px 3px 10px")

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
		}
	},
	
	_showToolTip : function ( posX, posY, message ) {
		$('div'+this.opt.target+' > div#tooltip').remove();
		$('<div id="tooltip">'+ message +'</div>').appendTo(this.opt.target);
		$('div'+this.opt.target+' > div#tooltip').css('top', posX );
        $('div'+this.opt.target+' > div#tooltip').css('left', posY );
	}
});


