
var $ = require('jquery');

// load everything
require('jquery-ui');

var area_selector = {
	    init:function(input){
	    	var self = this;
	        this.opt = input;
	        this.opt.resize_left=   (input.resize_left)  ? input.resize_left:   true;
	        this.opt.resize_right=  (input.resize_right) ? input.resize_right:  true;
	        this.opt.resize_top=    (input.resize_top)   ? input.resize_top:    true;
	        this.opt.resize_bottom= (input.resize_bottom)? input.resize_bottom: true;
	        $(function() {
	        	self._draw();
	        });
	        
	    },
		_draw: function(){
			var self=this;
			$("#"+self.opt.target).css("position","relative");
			var innerCode="<div class='selector'>";
			if (self.opt.resize_left) 	innerCode += "<div class='scaler left'></div>";
			if (self.opt.resize_right) 	innerCode += "<div class='scaler right'></div>";
			if (self.opt.resize_top)	innerCode += "<div class='scaler top'></div>";
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
					self.trigger('onRegionChanged', {
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
					self.trigger('onRegionChanged', {
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
					self.trigger('onRegionChanged', {
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
					self.trigger('onRegionChanged', {
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
			self.trigger('onRegionChanged', {
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
		_removePx: function(str){
			return 1*str.substr(0,str.length-2);
		}
};
require('biojs-events').mixin(area_selector);
module.exports = area_selector;