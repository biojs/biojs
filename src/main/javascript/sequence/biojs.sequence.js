/**
 * @author Jhon Gomez Carvajal
 */
Sequence = {

	// Register who is listening
	// events from this object
	events : [{
		name : 'onSelectionChanged',
		listeners : [ ]
	}, {
		name : 'onSelectionChange',
		listeners : [ ]
	}],

	style : {
		selectionColor : 'Yellow',
		highlightFontColor : 'red',
		defaultFontColor : "black"
	},

	// Id of DOM element
	// in order to append components elements
	_target : "",

	// Start with an empty sequence
	_sequence : "",

	// Format that sequence must be displayed
	_format : 'FASTA',

	// Keep track of selected region
	_selectionStart : 0,
	_selectionEnd : 0,

	// Keep track of highlighted regions
	_highlighted : [ ],

	// html elements to draw into
	_headerDiv : null,
	_contentDiv : null,

	// Initialize the component
	init : function(value, target) {
		this._target = target;
		this._sequence = value;
		this.draw();
	},
	
	draw : function() {
		var self = this;

		// Disable text selection
		$(this._target).css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none'
        });

		this._headerDiv = $('<div></div>').appendTo(this._target);
		this._contentDiv = $('<div></div>').appendTo(this._target);
		this._headerDiv.append('Format: ');

		var opt = $('<select> '+
			'<option value="FASTA">FASTA</option>'+
			'<option value="CODATA">CODATA</option>'+
			'<option value="PRIDE">PRIDE</option>'+
			'<option value="RAW">RAW</option></select>').appendTo(this._headerDiv);

		$(opt).change(function(e) {
			self._format = opt.val();
			self._redraw();
		});
		self.setFormat(self._format);
	},
	
	addListener : function(eventType, actionPerformed) {
		var event = null;
		for(index in this.events) {
			event = this.events[index];
			if(eventType == event.name) {
				event.listeners.push(actionPerformed);
				break;
			}
		}
	},
	
	setSelectionColor : function(color) {
		if( typeof this.style.selectionColor != 'undefined' && typeof this.style.selectionColor != 'object') {
			this.style.selectionColor = color;
			if(this._selectionStart > 0 && this._selectionEnd > 0) {
				this._setSelection(this._selectionStart, this._selectionEnd);
			}
		}
	},
	
	setSelection : function(start, end) {
		if(start > end) {
			var aux = end;
			end = start;
			start = aux;

		}

		if(start != this._selectionStart || end != this._selectionEnd) {
			this._setSelection(start, end);
			this._raiseEvent('onSelectionChanged', {
				start : start,
				end : end
			});
		}
	},
	
	highlight : function (start, end) {
		if (start < end) {
			var spans = this._contentDiv.find('span');
			for(var i = 1; i <= spans.length; i++) {
				if( i >= start && i <= end) {
					$(spans[i-1]).css("color", this.style.highlightFontColor);
				} 
			}
			
		}
	},
	
	unHighlight : function (start, end) {
		if (start < end) {
			var spans = this._contentDiv.find('span');
			for(var i = 1; i <= spans.length; i++) {
				if( i >= start && i <= end) {
					$(spans[i-1]).css("color", this.style.defaultFontColor);
				} 
			}
			
		}
	},
	
	unHighlightAll : function () {
		var self = this;
		self._contentDiv.find('span').each(function(){
			$(this).css("color", self.style.defaultFontColor);
		});
	},
	
	setFormat : function(format) {
		if(this._format == format.toUpperCase()) {
			; // do nothing
		} else {
			this._format = format.toUpperCase();
			this._redraw();
		}

		// change option
		var self = this;

		this._headerDiv.find('option').each(function() {
			if($(this).val() == self._format.toUpperCase()) {
				$(this).attr('selected', 'selected');
			}
		});
	},
	
	
	showFormatSelector : function (){
		this._headerDiv.show();
	},
	
	hideFormatSelector : function (){
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
	
	_raiseEvent : function(eventType, params) {
		for(i in this.events ) {
			event = this.events[i];
			if(eventType == event.name) {
				for(j in event.listeners) {
					event.listeners[j](params);
				}
				break;
			}
		}
	},
	_setSelection : function(start, end) {
		this._selectionStart = start;
		this._selectionEnd = end;

		var spans = this._contentDiv.find('span');
		for(var i = 0; i < spans.length; i++) {
			if(i + 1 >= start && i + 1 <= end) {
				$(spans[i]).css("background-color", this.style.selectionColor);
			} else {
				$(spans[i]).css("background-color", "white");
			}
		}
	},
	_redraw : function() {
		var i = 0;	
		var highlighted = [];
		var self = this;
		
		// Save the highlighted regions
		this._contentDiv.find('span').each(function(){
			if ( $(this).css("color") == self.style.highlightFontColor ) {
				highlighted.push(i);	
			}
			i++;
		});
		
		// Reset the content
		this._contentDiv.text('');
		
		// Rebuild the spans of the sequence 
		// according to format
		if(this._format == 'RAW') {
			this._drawRaw();
		} else if(this._format == 'CODATA') {
			this._drawCodata();
		} else if (this._format == 'FASTA'){
			this._drawFasta();
		} else {
			this._format = 'PRIDE';
			this._drawPride();
		}
		this._setSelection(this._selectionStart, this._selectionEnd);
		
		// Restore the highlighted regions
		var spans = this._contentDiv.find('span');
		for(var i = 0; i < highlighted.length; i++) {
			$( spans[ highlighted[i] ]).css("color", this.style.highlightFontColor);
		}
		
		
		this._addSpanEvents();
	},
	
	_drawFasta : function() {
		var a = this._sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 1;
		var arr = [];
		arr[0] = '>' + this._sequenceId + ' ' + a.length + ' bp<br/>';
		while(i <= a.length) {
			if(i % 60 == 0) {
				arr[i] = '<br/><span>' + a[i-1] + '</span>';
			} else {
				arr[i] = '<span>' + a[i-1] + '</span>';
			}
			i++;
		}
		pre.html(arr.join(''));
	},
	
	_drawCodata : function() {
		var a = this._sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);

		var i = 0;
		var str = 'ENTRY           ' + this._sequenceId + '<br/>';
		str += 'SEQUENCE<br/>';
		str += '        ';
		for(var x = 1; x < 31; x++) {
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
			if(i % 30 == 0) {
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
		var a = this._sequence.toLowerCase().split('');
		var i = 0;
		var arr = [];
		var pre = $('<pre></pre>').appendTo(this._contentDiv);
		while(i < a.length) {

			if(((i + 1) % 80) == 0) {
				arr[i] = '<span>' + a[i] + '</span><br/>';
			} else {
				arr[i] = '<span>' + a[i] + '</span>';
			}
			i++;
		}
		pre.html(arr.join(''));
	},
	
	_drawPride : function() {
		var a = this._sequence.toUpperCase().split('');
		var pre = $('<pre></pre>').appendTo(this._contentDiv);
		var str = '';
		var i = 1;
		
		str += this._formatIndex(i, 4, '0');
		str += '  ';
		str += '<span>' + a[0] + '</span>';
		
		while(i < a.length) {
			
			if(i % 80 == 0) {
				str += '  ';	
				str += this._formatIndex(i, 4, '0');				
				str += '<br/>';
				str += this._formatIndex(i+1, 4, '0');
				str += '  ';
				
			} else if ( i % 10 == 0 ) {
				str += ' ';
			}

			str += '<span>' + a[i] + '</span>';
			i++;
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
					self._raiseEvent('onSelectionChange', {
						start : self._selectionStart,
						end : self._selectionEnd
					});
					
				} 
			});
			
			$currentSpan.mouseup(function() {
				isMouseDown = false;
				// Selection is done, raise an event
				self._raiseEvent('onSelectionChanged', {
					start : self._selectionStart,
					end : self._selectionEnd
				});
			});
			
			$currentSpan.mouseout(function() {
				$('div'+this._target+' > div#tooltip').remove();
			});
			
			$currentSpan.mouseover(function(e) {
         		var tip;
         		
         		if (isMouseDown) {
         			tip = "selected: [" + self._selectionStart +", " + self._selectionEnd + "]";	
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
		$('div'+this._target+' > div#tooltip').remove();
		$('<div id="tooltip">'+ message +'</div>').appendTo(this._target);
		$('div'+this._target+' > div#tooltip').css('top', posX );
        $('div'+this._target+' > div#tooltip').css('left', posY );
	}
	
	
};
