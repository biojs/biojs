/**
 * Tooltip for general purpose.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href="../biojs/css/biojs.Tooltip.css">Tooltip CSS</a>
 * @dependency <link href="../biojs/css/biojs.Tooltip.css" rel="stylesheet" type="text/css"></link>
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @param {Object} options 
 *    An object with the options for Article component.
 *    
 * @param {string} targetSelector 
 *    A selector string to match the elements in the document. For more 
 *    information on it, see jQuery <a href="http://api.jquery.com/category/selectors/">selectors</a>.  
 *    
 *    <pre class="brush: js" title="Examples:">
 *       // Select all the links 
 *       targetSelector: "a"
 *       
 *       // Select the element with the id 'target'
 *       targetSelector: "#target"
 *       
 *       // Select all elements whose belong to the class 'here'
 *       targetSelector: ".here"
 *       
 *       // Select all list elements whose belong to the class 'here'
 *       targetSelector: "li.here"
 *    </pre>
 *    
 * @param {function} [cbRender] 
 *    By default, BiojsTooltip uses the 'title' attribute to render the content. 
 *    Set this option to customize the content rendering instead of using the default value. 
 *    
 *    <pre class="brush:js" title:"Example">
 *      cbRender: function( element ) {
 *         return "This is my personalized content for element " + element.tagName;
 *      }
 *    </pre>
 *    
 * @param {static} [arrowType=Biojs.Tooltip.ARROW_LEFT_TOP]
 *    Automatic positioning of the tooltip depends on the arrow direction.
 *    Possible arrow types are:
 *    <ul>
 *       <li>Biojs.Tooltip.ARROW_LEFT_TOP</li>
 *       <li>Biojs.Tooltip.ARROW_LEFT_MIDDLE</li>
 *       <li>Biojs.Tooltip.ARROW_LEFT_BOTTOM</li>
 *       <li>Biojs.Tooltip.ARROW_TOP_LEFT</li>
 *       <li>Biojs.Tooltip.ARROW_TOP_MIDDLE</li>
 *       <li>Biojs.Tooltip.ARROW_TOP_RIGHT</li>
 *       <li>Biojs.Tooltip.ARROW_RIGHT_TOP</li>
 *       <li>Biojs.Tooltip.ARROW_RIGHT_MIDDLE</li>
 *       <li>Biojs.Tooltip.ARROW_RIGHT_BOTTOM</li>
 *       <li>Biojs.Tooltip.ARROW_BOTTOM_LEFT</li>
 *       <li>Biojs.Tooltip.ARROW_BOTTOM_MIDDLE</li>
 *       <li>Biojs.Tooltip.ARROW_BOTTOM_RIGHT</li>
 *    <ul>
 *    
 * @param {static} [position=Biojs.Tooltip.ELEMENT_POSITION] 
 *    Position is calculated through either mouse position or element position.
 *    Allowed values are: Biojs.Tooltip.ELEMENT_POSITION or Biojs.Tooltip.MOUSE_POSITION
 * 
 * @param {int} [delay=200] 
 *    Time interval in milliseconds starting on mouse exiting from element/Tooltip until the Tooltip hides itself.
 *    
 * @example
 *    // These examples use the component's example div 'YourOwnDivId' to draw the links only.
 *    jQuery('#YourOwnDivId')
 *       .append('<a class="example" href="#" title="Simple example of Tooltip showing the title attribute">Pass the mouse over here.<a>')
 *       .css({ 
 *          'display': 'table-cell',
 *          'vertical-align': 'middle',
 *          'text-align': 'center',
 *          'width': '730px',
 *          'height': '400px'
 *       });
 *    
 *    // Tooltip will come out whenever mouse enter to any anchor 'a' with class 'example'
 *    var simpleTip = new Biojs.Tooltip({
 *       targetSelector: "a.example"
 *    });
 *    
 *    //
 *    // Another example using rendering function instead of 'title' attribute
 *    //
 *    jQuery('#YourOwnDivId')
 *       .append('<br/><br/><br/><br/><a class="example render" href="#">This example change the tooltip direction <br/> for each mouse entry.<a>');
 *    
 *    // Tooltip will come out whenever mouse enter to any anchor 'a' with class 'example'
 *    var tipRendered = new Biojs.Tooltip({
 *       targetSelector: "a.example.render",
 *       cbRender: function( element ) {
 *       	return "Tooltip type <strong>Biojs.Tooltip.ARROW_" + this.getArrowType().toUpperCase() + "</strong> using rendering function to build up content dynamically"
 *       }
 *    });
 *    
 *    // Changes the tooltip's direction 
 *    var counter = 0;
 *    var arrowTypes = [ 
 *       Biojs.Tooltip.ARROW_LEFT_TOP,
 *    	 Biojs.Tooltip.ARROW_LEFT_MIDDLE,
 *       Biojs.Tooltip.ARROW_LEFT_BOTTOM,
 *       Biojs.Tooltip.ARROW_TOP_LEFT,
 *       Biojs.Tooltip.ARROW_TOP_MIDDLE,
 *       Biojs.Tooltip.ARROW_TOP_RIGHT,
 *       Biojs.Tooltip.ARROW_RIGHT_TOP,
 *       Biojs.Tooltip.ARROW_RIGHT_MIDDLE,
 *       Biojs.Tooltip.ARROW_RIGHT_BOTTOM,
 *       Biojs.Tooltip.ARROW_BOTTOM_LEFT,
 *       Biojs.Tooltip.ARROW_BOTTOM_MIDDLE,
 *       Biojs.Tooltip.ARROW_BOTTOM_RIGHT
 *    ];
 *    
 *    // Changes the Tooltip arrow type dynamically 
 *    jQuery('#YourOwnDivId a.example.render').mouseover( function() {
 *    	 var arrowType = arrowTypes[ counter++ % 12 ];
 *       tipRendered.setArrowType( arrowType );
 *    });
 *    
 *    //
 *    // Another example using rich content 
 *    //
 *    jQuery('#YourOwnDivId')
 *       .append('<br/><br/><br/><br/><a class="example rich" href="#">Rich content<a>');
 *       
 *    var richContent = 
 *       '<div style="display: table-cell; width: 400px">'+
 *       '<h3>Santiago de Cali</h3>' +
 *       '<img src="http://www.ebi.ac.uk/~jgomez/cali.jpg" style="position:relative;float:left; padding:10px; margin:0px;"/>'+
 *       '<p style="font-family:\'Bookman Old Style\', serif; font-size:1em; font-smooth:always;" > '+
 *       'Simply referred to as Cali, is a city located in western <a href="http://en.wikipedia.org/wiki/Colombia">Colombia</a> '+
 *       'It is the capital of the Valle del Cauca Department. With a population of 2.5 million, '+
 *       'Cali is the third largest city in the country, after Bogota and Medellin. The city '+
 *       'was founded on 25 July 1536.</p></div>';
 *    
 *    var tipRich = new Biojs.Tooltip({
 *       targetSelector: "a.example.rich",
 *       cbRender: function( element ) {
 *       	return richContent;
 *       }, 
 *       arrowType: Biojs.Tooltip.ARROW_BOTTOM_MIDDLE
 *    });
 *    
 *    //
 *    // Last example using mouse position instead of element's 
 *    //
 *    jQuery('#YourOwnDivId')
 *       .append('<br/><br/><br/><br/><a class="example position" href="#" title="I am a cat.">Tooltip changes with mouse positioning.<a>');
 *    
 *    var tipPosition = new Biojs.Tooltip({
 *       targetSelector: "a.example.position",
 *       position: Biojs.Tooltip.MOUSE_POSITION
 *    });
 *    
 **/
Biojs.Tooltip = Biojs.extend (
/** @lends Biojs.Tooltip# */
{
  constructor: function (options) {
	  
	  var self = this;
	  var arrowType = this.opt.arrowType;

	  this._container = jQuery('<div id="biojsTooltip' + self.getId() + '"></div>').addClass("Tooltip");
	  
	  this._arrow = jQuery('<div class="arrow"></div>').appendTo( self._container );
	  this._body = jQuery('<div class="body"></div>').appendTo( self._container );
	  
	  this._container.appendTo('body');
	  
	  this._initialize();
  },

  /**
  * Default values for the options
  * @name Biojs.Tooltip-opt
  */
  opt: {
     targetSelector: "a",
     cbRender: undefined,
	 arrowType: "left_top",
	 position: 2, // ELEMENT_POSITION
	 delay: 200
  },

  /**
   * Array containing the supported event names
   * @name Biojs.Tooltip-eventTypes
   */
  eventTypes: [
	/**
	 * @name Biojs.Tooltip#onShowUp
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {string} target Target element.
	 * 
	 * @example 
	 * simpleTip.onShowUp(
	 *    function( e ) {
	 *       alert("Mouse has passed over the first example.");
	 *    }
	 * ); 
	 * 
	 */
     "onShowUp"
  ],

  _initialize: function( ) {

	  var self = this;
      var timer = 0;
      var targetSelector = this.opt.targetSelector;
      var cbRender = this.opt.cbRender;
      var refPos = this.opt.position;
      var target;
      
      // Get the text from the title attribute by default 
      if ( "function" != typeof cbRender ) {
    	  cbRender = function( element ) {
    		  return jQuery( element ).attr('title');
    	  }
      }
      
      // Add the class to the arrow 
      //arrow.addClass( self.opt.arrowType.match(/^(left|top|right|bottom)/g)[0] );
      this.setArrowType( this.opt.arrowType );

      // Positioning 
      this._arrow.css({ 
    	  "position": "absolute", 
    	  "z-index": "99999" 
      });
      
      this._body.css({ 
    	  'position': 'absolute', 
    	  'z-index': '99998', 
    	  'margin': '0px'
      });
      
      if ( refPos == Biojs.Tooltip.MOUSE_POSITION ) {
    	  jQuery( targetSelector ).mousemove( function (e) {
    			
        	  target = jQuery(e.target);
        	  
              if (timer) { 
                  clearTimeout(timer); 
              }
              timer = 0;

              // Set the content
              content = cbRender.call( self, e.target );

              self._body.html( content );
              
              // Show up
              self._show();
              
              // Positioning 
        	  self._setPosition(
        			  { left: e.pageX - 10, top: e.pageY - 10 }, 
        			  { width: 20, height: 20 } 
        	  ); 
              
              // Event triggering 
              self.raiseEvent( Biojs.Tooltip.EVT_ON_SHOW_UP, { 'target': target });
          
          }).mouseout( function() {
              timer = setTimeout( 'Biojs.getInstance(' + self.getId()  + ')._hide()' , self.opt.delay );
          });
    	  
      } else {
    	  jQuery( targetSelector ).mouseover( function (e) {
    			
        	  target = jQuery(e.target);
        	  
              if (timer) { 
                  clearTimeout(timer); 
              }
              timer = 0;

              // Set the content
              content = cbRender.call( self, e.target );

              self._body.html( content );
              
              // Show up
              self._show();
              
              // Positioning 
              self._setPosition(
            			  target.offset(), 
            			  { width: target.width(), height: target.height() } 
              );
              
              // Event triggering 
              self.raiseEvent( Biojs.Tooltip.EVT_ON_SHOW_UP, { 'target': target });
          
          }).mouseout( function() {
              timer = setTimeout( 'Biojs.getInstance(' + self.getId()  + ')._hide()' , self.opt.delay );
          });
      }
      
      self._container.mouseover( function(){
          clearTimeout(timer);
          timer = 0;
          self._show();
      
      }).mouseout( function() {
          timer = setTimeout( 'Biojs.getInstance(' + self.getId()  + ')._hide()' , self.opt.delay );
      });
      
      this._hide();
  },
 
  _hide: function() {
	  this._container.hide();
  },
  
  _show: function() {
	  this._container.show();
  },
  
  _setPosition: function ( offset, dim ) {

	  var arrow = this._arrow;
	  var arrowType = this.opt.arrowType;
	  var arrowPos = { top: offset.top, left: offset.left };

	  var body = this._body;
	  var bodyPos = {};

	  arrow.removeClass();
	  arrow.addClass( 'arrow ' + arrowType.match(/^(left|top|right|bottom)/g)[0] );
	  
	  if ( arrowType == Biojs.Tooltip.ARROW_LEFT_TOP ) {
		  
		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left += arrow.width() + dim.width ;
		  
		  bodyPos.left = arrowPos.left + arrow.width() - 1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()/4);
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_LEFT_MIDDLE ) {

		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left += arrow.width() + dim.width ;
		  
		  bodyPos.left = arrowPos.left + arrow.width() - 1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()/2);
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_LEFT_BOTTOM ) {

		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left += arrow.width() + dim.width ;
		  
		  bodyPos.left = arrowPos.left + arrow.width() - 1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()*(3/4));
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_TOP_LEFT ) {
		  
		  arrowPos.top += dim.height;
		  arrowPos.left += Math.floor(dim.width/2) - Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.height()/2) - Math.floor(body.width()/4);
		  bodyPos.top = arrowPos.top + arrow.height() -1;
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_TOP_MIDDLE ) {
		  
		  arrowPos.top +=  dim.height;
		  arrowPos.left += Math.floor(dim.width/2) - Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.height()/2) - Math.floor(body.width()/2);
		  bodyPos.top = arrowPos.top + arrow.height() -1;
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_TOP_RIGHT ) {

		  arrowPos.top += dim.height;
		  arrowPos.left += Math.floor(dim.width/2) - Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.height()/2) - Math.floor( body.width()*(3/4) );
		  bodyPos.top = arrowPos.top + arrow.height() -1;
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_RIGHT_TOP ) {

		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left -= arrow.width();
		  
		  bodyPos.left = arrowPos.left - body.outerWidth() +1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()/4);
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_RIGHT_MIDDLE ) {
		  
		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left -= arrow.width();
		  
		  bodyPos.left = arrowPos.left - body.outerWidth() +1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()/2);
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_RIGHT_BOTTOM ) {
		  
		  arrowPos.top += Math.floor(dim.height/2) - Math.floor(arrow.height()/2);
		  arrowPos.left -= arrow.width();
		  
		  bodyPos.left = arrowPos.left - body.outerWidth() +1;
		  bodyPos.top = arrowPos.top + Math.floor(arrow.height()/2) - Math.floor(body.height()*(3/4));
		  
	  } else if ( arrowType == Biojs.Tooltip.ARROW_BOTTOM_LEFT ) {
		  
		  arrowPos.top -= arrow.height();
		  arrowPos.left += Math.floor(dim.width/2) + Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.width()/2) - Math.floor(body.width()/4);
		  bodyPos.top = arrowPos.top - body.outerHeight() +1;

	  } else if ( arrowType == Biojs.Tooltip.ARROW_BOTTOM_MIDDLE ) {
		  
		  arrowPos.top -= arrow.height();
		  arrowPos.left += Math.floor(dim.width/2) - Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.width()/2) - Math.floor(body.width()/2);
		  bodyPos.top = arrowPos.top - body.outerHeight() +1;

	  } else if ( arrowType == Biojs.Tooltip.ARROW_BOTTOM_RIGHT ) {
		  
		  arrowPos.top -= arrow.height();
		  arrowPos.left += Math.floor(dim.width/2) - Math.floor(arrow.width()/2);
		  
		  bodyPos.left = arrowPos.left + Math.floor(arrow.width()/2) - Math.floor(body.width()*(3/4));
		  bodyPos.top = arrowPos.top - body.outerHeight() +1;
	  }

	  this._arrow.css( arrowPos );
	  this._body.css( bodyPos );
  },
  
  /**
   * Changes the Tooltip direction. The point of reference is the arrow's type.
   * Choose one of the following available types:
   *   <ul>
   *       <li>Biojs.Tooltip.ARROW_LEFT_TOP</li>
   *       <li>Biojs.Tooltip.ARROW_LEFT_MIDDLE</li>
   *       <li>Biojs.Tooltip.ARROW_LEFT_BOTTOM</li>
   *       <li>Biojs.Tooltip.ARROW_TOP_LEFT</li>
   *       <li>Biojs.Tooltip.ARROW_TOP_MIDDLE</li>
   *       <li>Biojs.Tooltip.ARROW_TOP_RIGHT</li>
   *       <li>Biojs.Tooltip.ARROW_RIGHT_TOP</li>
   *       <li>Biojs.Tooltip.ARROW_RIGHT_MIDDLE</li>
   *       <li>Biojs.Tooltip.ARROW_RIGHT_BOTTOM</li>
   *       <li>Biojs.Tooltip.ARROW_BOTTOM_LEFT</li>
   *       <li>Biojs.Tooltip.ARROW_BOTTOM_MIDDLE</li>
   *       <li>Biojs.Tooltip.ARROW_BOTTOM_RIGHT</li>
   *   <ul>
   * 
   * @param {static} arrowType Static Biojs.Tooltip.ARROW_[TYPE] value.
   * 
   * @example 
   * simpleTip.setArrowType(Biojs.Tooltip.ARROW_BOTTOM_RIGHT);
   * 
   */
  setArrowType: function( arrowType ) {

	  var newClass = arrowType.match(/^(left|top|right|bottom)/g)[0];
	  
	  if ( newClass !== undefined ) {
		  this.opt.arrowType = arrowType;
	  }
  },
  /**
   * Returns the actual arrow type.
   * @returns {static} Static Biojs.Tooltip.ARROW_[TYPE] value.
   * 
   * @example 
   * alert ( "First example is using " + simpleTip.getArrowType() + " arrow." );
   * 
   */
  getArrowType: function( arrowType ) {
	  return this.opt.arrowType;
  },
  
  /**
   * Returns the actual id attribute value.
   * @returns {string} DOM element identifier of this component.
   * 
   * @example 
   * alert ( "Identifier of the second example is " + tipRendered.getIdentifier() + "." );
   * 
   */
  getIdentifier: function( ) {
	  return this._container.attr('id');
  },
  
  /**
   * Sets the id attribute value.
   * @param {string} DOM element identifier for this component.
   * 
   * @example 
   * tipRendered.setIdentifier("MyIdentifier");
   * 
   */
  setIdentifier: function( value ) {
	  return this._container.attr( 'id', value );
  }
  
  
},{
	// Arrows height: 12px width: 7px;
	ARROW_LEFT_TOP:      "left_top",
	ARROW_LEFT_MIDDLE:   "left_middle",
	ARROW_LEFT_BOTTOM:   "left_bottom",
	ARROW_TOP_LEFT:      "top_left",
	ARROW_TOP_MIDDLE:    "top_middle",
	ARROW_TOP_RIGHT:     "top_right",
	ARROW_RIGHT_TOP:     "right_top",
	ARROW_RIGHT_MIDDLE:  "right_middle",
	ARROW_RIGHT_BOTTOM:  "right_bottom",
	ARROW_BOTTOM_LEFT:   "bottom_left",
	ARROW_BOTTOM_MIDDLE: "bottom_middle",
	ARROW_BOTTOM_RIGHT:  "bottom_right",
	
	// Events
	EVT_ON_SHOW_UP: "onShowUp",
	
	MOUSE_POSITION: 1,
	ELEMENT_POSITION: 2

});