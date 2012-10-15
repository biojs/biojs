/** 
 * This is the description of the HelloWorld component. Here you can set any HTML text 
 * for putting on the generated documentation.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.min.js"></script>
 * 
 * @param {Object} options An object with the options for HelloWorld component.
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
 * @example 
 * var instance = new Biojs.HelloWorld({
 * 		target : "YourOwnDivId",
 * 		selectionBackgroundColor : '#99FF00'
 * });	
 * 
 */
Biojs.HelloWorld = Biojs.extend (
/** @lends Biojs.HelloWorld# */
{
  constructor: function (options) {
	  // In JavaScript “this” always refers to the “owner” of the function we're executing (http://www.quirksmode.org/js/this.html)
	  // Let's preserve the reference to 'this' through the variable self. In this way, we can invoke/execute 
	  // our component instead of the object where 'this' is being invoked/executed.
	  var self = this;
	  
	  // For practical use, create an object with the main DIV container 
	  // to be used in all of the code of our component
	  this._container = jQuery("#"+self.opt.target);
	  
	  // Apply options values
	  this._container.css({
		  'font-family': self.opt.fontFamily, // this is one example of the use of self instead of this
		  'background-color': self.opt.backgroundColor,
		  'color': self.opt.fontColor,
		  'font-size': '36px',
		  'text-align': 'center',
		  'vertical-align':'middle',
		  'display': 'table-cell',
		  'width': '597px',
		  'height': '300px'		  
	  });
	
	  // Disable text selection and
	  // Change the selection mouse pointer  
	  // from text to hand.
	  this._container.css({
		  '-moz-user-select':'none',
		  '-webkit-user-select':'none',
		  'user-select':'none'
	  });

	  // Set the content
	  text = 'Hello World!';

	  for( i=0; i< text.length; i++ ) {
		  this._container.append('<span>' + text[i] + '</span>');
	  }	   

	  // Internal method to initialize the event of select 'Hello'  
	  this._addSelectionTrigger();
	  
	  // Internal method to set the onClick event 
	  this._addSimpleClickTrigger();
  },

  /**
   *  Default values for the options
   *  @name Biojs.HelloWorld-opt
   */
  opt: {
     target: "YourOwnDivId",
     fontFamily: '"Andale mono", courier, monospace',
     fontColor: "white",
     backgroundColor: "#7BBFE9",
     selectionFontColor: "black",
     selectionBackgroundColor: "yellow"
  },
  
  /**
   * Array containing the supported event names
   * @name Biojs.HelloWorld-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.HelloWorld#onClick
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
	 * @name Biojs.HelloWorld#onHelloSelected
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
	  if ( size != undefined ){
		  jQuery("#"+this.opt.target).css('font-size', size);
	  }
  },
  
  _addSelectionTrigger: function() {

	  var self = this;
	  var isMouseDown = false;
	  
	  // Create the CSS class called selected to change both background and color 

	  jQuery('<style> .selected { '+
		  	'background-color:' + self.opt.selectionBackgroundColor + ';' +
		  	'color:' + self.opt.selectionFontColor +'; }</style>'
	  		).appendTo('head');
	  
	  //
	  // Add the click event to each character in the content
	  // But remember, we must to figure out when 'Hello' is selected only
	  this._container.find('span')
	  	.mousedown(function() {
	  		
	  		// Turn on the flag 
			isMouseDown = true;
			
			// A new selection is starting
			// Reset all by removing the CSS "selected" class if already applied
			self._container.children('span').removeClass('selected')
			
			// Apply the class for this span/character
			// NOTE: "this" refers to the internal object 'span'
			// NOT to the component's instance
			jQuery(this).addClass('selected');
				
	  	}).mouseover(function() {
	  		// Check if the mouse is being dragged  
			if (isMouseDown) {
				jQuery(this).addClass('selected');
			}	
		})
		.mouseup(function() {
			
			/// Turn off the flag 
			isMouseDown = false;
			
			var textSelected = '';
			
			// Get the entire selected word
			self._container.children('span.selected')
				.each(function(){
					textSelected += jQuery(this).text();
				});
			
			// Since requirements, only "Hello" word should be selected 
			// to raise the event
			if (textSelected == 'Hello') {
				self.raiseEvent('onHelloSelected', {
					textSelected : textSelected
				})
			}
		});
  },
  
  _addSimpleClickTrigger: function () {
	  
	  var self = this;
	  
	  // Add the click event to each character in the content
	  this._container.find('span')
	  	.click( function(e) {
	  		// A letter was clicked!
	  		// Let's discover which one was it
	  		// TIP: e.target contains the clicked DOM node
	  		var selected = jQuery(e.target).text();
	  		
	  		// Create an event object 
	  		var evtObject = { "selected": selected };
	  		
	  		// We're ready to raise the event onClick of our component
	  		self.raiseEvent('onClick', evtObject);
	  	});
  }
  
});







