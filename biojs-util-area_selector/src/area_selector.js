
var $ = require('jquery');

require('jquery-ui');

var area_selector = function() {
	var area_selector=this;
	area_selector.init = function(input){
		var self = this;
		this.opt = input;
		this.opt.resize_left=   (typeof input.resize_left!= "undefined")   ? input.resize_left:   true;
		this.opt.resize_right=  (typeof input.resize_right!= "undefined")  ? input.resize_right:  true;
		this.opt.resize_top=    (typeof input.resize_top!= "undefined")    ? input.resize_top:    true;
		this.opt.resize_bottom= (typeof input.resize_bottom!= "undefined") ? input.resize_bottom: true;
		$(function() {
			self._draw();
		});
		return self;
	};
	area_selector._draw = function(){
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

	};
	area_selector.getCoveredArea = function(){
		var self=this;
		return [
		        $("#"+self.opt.target+" .selector").position().left,
		        $("#"+self.opt.target+" .selector").position().top,
		        $("#"+self.opt.target+" .selector").position().left + $("#"+self.opt.target+" .selector").width(),
		        $("#"+self.opt.target+" .selector").position().top + $("#"+self.opt.target+" .selector").height()
		        ];
	};
	area_selector.setCoveredArea = function(area){
		var self=this;
		$("#"+self.opt.target+" .selector").css('left',area[0]+"px");
		$("#"+self.opt.target+" .selector").css('top',area[1]+"px");
		$("#"+self.opt.target+" .selector").width(area[2]-area[0]);
		$("#"+self.opt.target+" .selector").height(area[3]-area[1]);
		self.updateScalers();
		self.trigger('onRegionChanged', {
			region : self.getCoveredArea()
		});
	};
	area_selector.updateScalers = function(){
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
	};
	area_selector._removePx = function(str){
		return 1*str.substr(0,str.length-2);
	}
};
require('biojs-events').mixin(area_selector.prototype);
module.exports = area_selector;