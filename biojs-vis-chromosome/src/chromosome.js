var $ = require('jquery');
var AreaSelector = require('area_selector');
var JSDAS = require('biojs-rest-jsdas');

var chromosome = function ()  {
	var chromosome=this;
	chromosome.init = function(input){
		var self = this;
        this.opt = input;
        self.opt.includeSelector=   (typeof input.includeSelector != "undefined")  ? input.includeSelector:   true;
        $(function() {
        	self._draw();
        });
        return self;
	};
	chromosome._draw = function(){
		var self=this;
		$("#"+self.opt.target).html('<div id="'+self.opt.target+'_chr"></div>');
		$("#"+self.opt.target+'_chr').css('position','relative');
		if (self.opt.dasSource!=null){
			var client = JSDAS.Simple.getClient(self.opt.dasSource);
			client.features({segment: self.opt.dasSegment}, function(res){ 
				self._modelFromDAS(res,self);
			}, self._error_response);
		}else if (self.opt.model!=null){
			this._process_model(self.opt.model);//,self);
		}
	};
	chromosome._error_response= function(){
		var self=this;
		$("#"+self.opt.target).append("ERROR querying the DAS source.");
		self.trigger('onDASLoadFail', {
			dasSource: self.opt.dasSource,
			dasSegment: self.opt.dasSegment
		});
	};
	 /**
	  * @private
	  * Private: Callback function when the DAS response is captured. 
	  * It maps the response into the internal model for bands.
	  */
	chromosome._modelFromDAS= function(res){//,parent){
		var self = this;
//		if(typeof parent != "undefined")
//			var self=parent;
		var annotations = res.GFF.SEGMENT[0].FEATURE, chr_start=res.GFF.SEGMENT[0].start, chr_stop=res.GFF.SEGMENT[0].stop;
		var model = {
				id:		res.GFF.SEGMENT[0].id,
				start:	res.GFF.SEGMENT[0].start*1, 
				stop:	res.GFF.SEGMENT[0].stop,
				bands:null 
			};
		var bands=[];
		var first="first",last="";
		for (var i in annotations){
			var ann = annotations[i],type=ann.TYPE.id.substr(5);
			if (type=="acen"){
				if (ann.id[0]=="p") type="p_acen";
				else if (ann.id[0]=="q") type="q_acen";
			}
			bands.push({start:ann.START.textContent*1,stop:ann.END.textContent*1,label:ann.id,type:type});
		}
		model.bands=bands;
		self.opt.model=model;
		self._process_model(model,self);
	},
	 /**
	  * @private
	  * Private: Creates a div element for each band in the model; the width of the band is calculated as a percentage 
	  * of the relationship between the number of nucleotides in the band and the number of nucleotides of the chromosome. 
	  */
	chromosome._process_model = function(model){//,self){
		var self = this;
		//Sorting the bands by the start coordinate
		model.bands.sort(function (a,b){
			return a.start-b.start;
		});
		var first="first",last="",firstid=null,firstW=null;
		for (var i in model.bands){
			var band = model.bands[i];
			if (i*1+1==model.bands.length)
				last="last";
			var percentage=94*(band.stop-band.start)/model.stop;// no using the 100% of the width, so there is an extra space for the borders
			var band_id=model.id+"_"+band.label;
			$("#"+self.opt.target+'_chr').append("<div id='"+band_id+"' title='"+band.label+"' class='band "+band.type+" "+first+last+"' style='width: "+percentage.toFixed(3)+"%;'></div>");
			band_id=band_id.replace(/\./gi, "\\.");
			$("#"+band_id).click(function (){
				//Finding the band in the model
				var band={}
				for (var j in model.bands){
					if ($(this).attr("title")==model.bands[j].label)
						band=model.bands[j];
				}
				//arising an event with the ban info
				self.trigger('onBandSelection', {
					chromosome_id : model.id,
					band_id:	band.label,
					band_start:	band.start,
					band_stop:	band.stop,
					band_type:	band.type
				});
				//If the selector is included then its position gets updated to the selected band
				if (self.opt.includeSelector){
					self.opt.selector.from=band.start;
					self.opt.selector.to=band.stop;
					self.trigger('onSelectorChanged', {
						chromosome_id : model.id,
						selector_start:	band.stop,
						selector_stop:	band.type
					});
					self._moveSelectorToDivCoordinates($(this).position().left,$(this).position().left+$(this).width());
				}
			});
			if(first!="") {
				firstid=band_id; //id of the first band
				firstW=band.stop;
			}
			first="";
		}
		//Setting up the selector in case is included
		if (self.opt.includeSelector){
			//The selector just allows horizontal interaction and is preseted in the first band
			self.opt.selector = new AreaSelector();
			self.opt.selector.init({
				target: self.opt.target+'_chr',
				resize_top: false,
				resize_bottom: false,
				area:[0,-5,$('#'+firstid).width(),20]
			});
			//Creating two more attributes in the object to save chromosome coordinates where is visible, starting in the first band
			self.opt.selector.from = 0; 
			self.opt.selector.to = firstW; 
			self.opt.selector.fromWatcher=false;
			//When the selector change its position the chromosome coordinates have to be updated
			self.opt.selector.on("onRegionChanged", function( objEvent ) {
				if (!self.opt.selector.fromWatcher){
					self.opt.selector.from	= self._getCoordinateFromLeft(objEvent.region[0]);
					self.opt.selector.to	= self._getCoordinateFromLeft(objEvent.region[2]);
					self.trigger('onSelectorChanged', {
						chromosome_id : self.opt.model.id,
						selector_start:	self.opt.selector.from,
						selector_stop:	self.opt.selector.to
					});
				}
			}); 
			//if the div containing the chromosome is resized or moved the selector is modified with
			$("#"+self.opt.target).watch("left,top,width,height,display", function() {
				self.opt.selector.fromWatcher=true;
				if (self.opt.selector.from!=null && self.opt.selector.to!=null )
					self.moveSelectorToCoordinates(self.opt.selector.from,self.opt.selector.to);
				self.opt.selector.fromWatcher=false;
			}, 100, "_containerMove");
		}
		self.trigger('onModelLoaded', {
			model: model
		});
		
	};
	chromosome.selector=null;
	chromosome.moveSelectorToCoordinates= function(from, to){
		var self=this;
		if(self.opt.selector!=null){
			self.opt.selector.from=from;
			self.opt.selector.to=to;
			self._moveSelectorToDivCoordinates(self._getLeftFromCoordinate(from),self._getLeftFromCoordinate(to));
		}else
			return false;
	};
	chromosome._getLeftFromCoordinate= function(coordinate){
		var self=this;
		var band=null
		for (var j in self.opt.model.bands){
			var b=self.opt.model.bands[j];
			if (coordinate>=b.start && coordinate<=b.stop){
				band=b;
				break;
			}
		}
		if (band!=null){
			var band_id=self.opt.model.id+"_"+band.label;
			band_id=band_id.replace(/\./gi, "\\.");
			var leftDiv = $("#"+band_id).position().left,
				widthDiv= $("#"+band_id).width(),
				leftBand=band.start,
				widthBand=band.stop-band.start;
			return  leftDiv+ (((coordinate-leftBand)*widthDiv)/widthBand);
		}else 
			return false;
		
	};
	chromosome._getCoordinateFromLeft = function(left){
		var self=this;
		var band=null
		for (var j in self.opt.model.bands){
			var b=self.opt.model.bands[j];
			var band_id=self.opt.model.id+"_"+b.label;
			band_id=band_id.replace(/\./gi, "\\.");
			
			if (left>=$("#"+band_id).position().left && left<=$("#"+band_id).position().left + $("#"+band_id).width()){
				var leftDiv = $("#"+band_id).position().left,
				widthDiv= $("#"+band_id).width(),
				leftBand=b.start,
				widthBand=b.stop-b.start;
			return  leftBand+ (((left-leftDiv)*widthBand)/widthDiv);
			}
		}
		return false;
		
	};
	chromosome._moveSelectorToDivCoordinates= function(from, to){
		var self=this;
		if (self.opt.includeSelector && self.opt.selector!=null)
			self.opt.selector.setCoveredArea([from,-5,to,20]);
	}
};
require('biojs-events').mixin(chromosome.prototype);
module.exports = chromosome;