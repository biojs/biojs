/**
 * This component visualize a div in a upper layer that can be used to select an area of other component. 
 * Although is not biological related component, it is generic enough to be used in other components, that 
 * require to select a region, see chromosome example. Just one selector can be used for a HTML component.
 * <p class="warning">WARNING: The CSS value for the position will be changed to relative.</p>
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href='http://code.jquery.com/query-1.7.2.min.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI 1.8.2</a>
 * @dependency <script src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
 *
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI CSS 1.8.2</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 * 
 * @requires <a href='http://www.west-wind.com/weblog/posts/2008/Sep/12/jQuery-CSS-Property-Monitoring-Plugin-updated'>jquery.watcher.js</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery.watcher.js"></script>
 * 
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.selector.css'>Selector CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.selector.css" />
 * 
 * @param {Object} options An object with the options for the Chromosome component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {boolean} resize_left
 *    to indicate if the selector can be resizable from the left side. default value: true
 * 
 * @option {boolean} resize_right
 *    to indicate if the selector can be resizable from the right side. default value: true
 * 
 * @option {boolean} resize_top
 *    to indicate if the selector can be resizable from the top side. default value: true
 * 
 * @option {boolean} resize_bottom
 *    to indicate if the selector can be resizable from the bottom side. default value: true
 *    
 * @option {array} area
 *    an array with 4 elements(integers) to indicate the start position of the area selector. 
 *    The first two elements indicate the X and Y position of the top-left corner, 
 *    the last 2 elements indicate the bottom-right position.
 *    The position are relative to the target element.  
 * 
 * @example
 * 	var instance = new Biojs.AreaSelector({
 * 		target: "YourOwnDivId",
 * 		area: [10,10,40,40]
 * 	});

 * 
 */

Biojs.AreaSelector = Biojs.extend (
/** @lends Biojs.AreaSelector# */
{
	constructor: function (options) {
		var self=this;
		$("#"+self.opt.target).css("position","relative");
		var innerCode="<div class='selector'>";
		if (self.opt.resize_left) 	innerCode += "<div class='scaler left'></div>";
		if (self.opt.resize_right) 	innerCode += "<div class='scaler right'></div>";
		if (self.opt.resize_top)		innerCode += "<div class='scaler top'></div>";
		if (self.opt.resize_bottom)	innerCode += "<div class='scaler bottom'></div>";
		innerCode += "<div>";
		$("#"+self.opt.target).append(innerCode);


		$("#"+self.opt.target+" .selector .right").draggable({
			axis: "x",
			start :function(event) {
				self.updateScalers();
				$(this).parent().css('border-right-width',"0px");
			},
			stop :function(event) {
				$("#"+self.opt.target+" .selector").width(self._removePx($(this).css('left'))+5);
				$(this).parent().css('border-right-width',"1px");
				self.updateScalers();
				self.raiseEvent('onRegionChanged', {
					region : self.getCoveredArea()
				});
			}
		});
		$("#"+self.opt.target+" .selector .left").draggable({
			axis: "x",
			start :function(event) {
				self.updateScalers();
				$(this).parent().css('border-left-width',"0px");
			},
			stop :function(event) {
				var delta=$(this).position().left+5;
				$("#"+self.opt.target+" .selector").width($("#"+self.opt.target+" .selector").width()-delta);
				$("#"+self.opt.target+" .selector").css('left',($(this).parent().position().left+delta)+"px");
				$(this).parent().css('border-left-width',"1px");
				self.updateScalers();
				self.raiseEvent('onRegionChanged', {
					region : self.getCoveredArea()
				});
			}
		});
		$("#"+self.opt.target+" .selector .bottom").draggable({
			axis: "y",
			start :function(event) {
				self.updateScalers();
				$(this).parent().css('border-bottom-width',"0px");
			},
			stop :function(event) {
				$("#"+self.opt.target+" .selector").height(self._removePx($(this).css('top'))+5);
				$(this).parent().css('border-bottom-width',"1px");
				self.updateScalers();
				self.raiseEvent('onRegionChanged', {
					region : self.getCoveredArea()
				});
			}
		});
		$("#"+self.opt.target+" .selector .top").draggable({
			axis: "y",
			start :function(event) {
				self.updateScalers();
				$(this).parent().css('border-top-width',"0px");
			},
			stop :function(event) {
				var delta=$(this).position().top+5;
				$("#"+self.opt.target+" .selector").height($("#"+self.opt.target+" .selector").height()-delta);
				$("#"+self.opt.target+" .selector").css('top',($(this).parent().position().top+delta)+"px");
				$(this).parent().css('border-top-width',"1px");
				self.updateScalers();
				self.raiseEvent('onRegionChanged', {
					region : self.getCoveredArea()
				});
			}
		});

		
		$("#"+self.opt.target).watch("left,top,width,height,display", function() {                         
			self.updateScalers();
		}, 100, "_containerMove");
		
		self.updateScalers();
	    self.setCoveredArea(self.opt.area);
	},

	/**
	 * Default values for the options
	 * @name Biojs.AreaSelector-opt
	 */
	opt: {
		target: "YourOwnDivId",
		resize_left: true,
		resize_right: true,
		resize_top: true,
		resize_bottom: true,
		area: [0,0,50,50]
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.AreaSelector-eventTypes
	 */	
	eventTypes: [
	    		 /**
	    		  * @name Biojs.AreaSelector#onRegionChanged
	    		  * @event
	    		  * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	    		  * 	It gets activated when the covered area has changed
	    		  * @eventData {Object} source The component which did triggered the event.
	    		  * @eventData {string} type The name of the event.
	    		  * @eventData {array} region A 4-element array indicating the current position of the selector.
	    		  * The first two elements indicate the X and Y position of the top-left corner, 
	    		  * the last 2 elements indicate the bottom-right position.
	    		  * The position are relative to the target element.  
				  *    
	    		  * @example 
	    		  * 	instance.onRegionChanged(function( objEvent ) {
	    		  * 		alert("The current area is from the point [" + objEvent.region[0] + "," + objEvent.region[1] + "] to the point [" + objEvent.region[2] + "," + objEvent.region[3] + "] "); 
	    		  * 	}); 
	    		  */
	             "onRegionChanged"
	             ],

	 /**
	  * get the current value of the area
	  * 
	  * @example 
	  * var area = instance.getCoveredArea();
	  * alert("The current area is from the point [" + area.region[0] + "," + area.region[1] + "] to the point [" + area.region[2] + "," + area.region[3] + "] ");	  
	  * 
	  */ 
	getCoveredArea: function(){
		var self=this;
		return [
		        	$("#"+self.opt.target+" .selector").position().left,
		        	$("#"+self.opt.target+" .selector").position().top,
		        	$("#"+self.opt.target+" .selector").position().left + $("#"+self.opt.target+" .selector").width(),
		        	$("#"+self.opt.target+" .selector").position().top + $("#"+self.opt.target+" .selector").height()
		        ];
	},
	 /**
	  * set the value of the area
	  * 
	  * @param {string} area  A 4-element array indicating the position to locate the selector.
	  * The first two elements indicate the X and Y position of the top-left corner, 
	  * the last 2 elements indicate the bottom-right position.
	  * The position are relative to the target element.  
	  * 
	  * @example 
	  * instance.setCoveredArea([ 20,20,50,50]);
	  * 
	  */ 
	setCoveredArea: function(area){
		var self=this;
		$("#"+self.opt.target+" .selector").css('left',area[0]+"px");
		$("#"+self.opt.target+" .selector").css('top',area[1]+"px");
		$("#"+self.opt.target+" .selector").width(area[2]-area[0]);
		$("#"+self.opt.target+" .selector").height(area[3]-area[1]);
		self.updateScalers();
		self.raiseEvent('onRegionChanged', {
			region : self.getCoveredArea()
		});
	},
	
	 /**
	  * @private
	  * Private: update the positions and the limits of the scalers
	  */
	updateScalers: function(){
		var self=this;
		$("#"+self.opt.target+" .selector .left").css("left","-5px");
		$("#"+self.opt.target+" .selector .left").css("top",($("#"+self.opt.target+" .selector").height()/2)-5);
		$("#"+self.opt.target+" .selector .right").css("left",$("#"+self.opt.target+" .selector").width()-5);
		$("#"+self.opt.target+" .selector .right").css("top",($("#"+self.opt.target+" .selector").height()/2)-5);
		$("#"+self.opt.target+" .selector .top").css("left",($("#"+self.opt.target+" .selector").width()/2)-5);
		$("#"+self.opt.target+" .selector .top").css("top","-5px");
		$("#"+self.opt.target+" .selector .bottom").css("left",($("#"+self.opt.target+" .selector").width()/2)-5);
		$("#"+self.opt.target+" .selector .bottom").css("top",$("#"+self.opt.target+" .selector").height()-5);
		$("#"+self.opt.target+" .selector .right").draggable("option","containment",[
			$("#"+self.opt.target+" .selector").offset().left-3,
			$("#"+self.opt.target).offset().top,
			$("#"+self.opt.target).offset().left+$("#"+self.opt.target).width()-4,
			$("#"+self.opt.target).offset().top+$("#"+self.opt.target).height()
		]);
		$("#"+self.opt.target+" .selector .left").draggable("option","containment",[
 			$("#"+self.opt.target).offset().left-4,
 			$("#"+self.opt.target).offset().top,
			$("#"+self.opt.target+" .selector").offset().left+$("#"+self.opt.target+" .selector").width()-5,
 			$("#"+self.opt.target).offset().top+$("#"+self.opt.target).height()
 		]);
		$("#"+self.opt.target+" .selector .bottom").draggable("option","containment",[
 			$("#"+self.opt.target).offset().left,
 			$("#"+self.opt.target+" .selector").offset().top-3,
 			$("#"+self.opt.target).offset().left+$("#"+self.opt.target).width(),
 			$("#"+self.opt.target).offset().top+$("#"+self.opt.target).height()-4
 		]);
 		$("#"+self.opt.target+" .selector .top").draggable("option","containment",[
  			$("#"+self.opt.target).offset().left,
  			$("#"+self.opt.target).offset().top-4,
			$("#"+self.opt.target).offset().left+$("#"+self.opt.target).width()-4,
 			$("#"+self.opt.target+" .selector").offset().top+$("#"+self.opt.target+" .selector").height()-5
  		]);
	},
	 /**
	  * @private
	  * Private: remove the last two characters of a string and return its integer value
	  */
	_removePx: function(str){
		return 1*str.substr(0,str.length-2);
	}
});
