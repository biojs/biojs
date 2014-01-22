/**
 * This component allow to visualize a chromosome and its bands. 
 * The bands can be recovered from a DAS source or directly from a javascript model.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 1.0.1
 * @category 2
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://jsdas.googlecode.com/hg/lib/jsdas.0.1.6.min.js'>jsdas 0.1.6</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jsdas.0.1.6.js"></script>
 *  
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.chromosome.css'>Chromosome CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.chromosome.css" />
 * 
 * 
 * @requires <a href='../biojs/Biojs.AreaSelecto.js'>Biojs AreaSelector</a>
 * @dependency <script src="../biojs/Biojs.AreaSelector.js" type="text/javascript"></script>
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
 * 
 * 
 * 
 * @param {Object} options An object with the options for the Chromosome component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string} dasSource
 * 	  URL of the DAS source to obtain the band's information. 
 * 	  For example Ensembl provides the human chromosome information as a DAS source in the 
 *    URL http://www.ensembl.org/das/Homo_sapiens.NCBI36.karyotype/
 * 
 * @option {string} dasSegment
 * 	  DAS segment to query, in case of chromosomes is the chromosome id (eg. 8). 
 *    Optionally DAS sources can be queried for a spwcific region of the chromosome(eg. 8:43100000,49100001)
 *    
 * @option {Object} model
 *    Alternatively to DAS, This component can receive directly a javascript object containing the relevant information. 
 *    Here is an example of the object structure using JSON notation:
 *    {
 *     "id": "8",
 *     "start": 1,
 *     "stop": 199999,
 *     "bands": [
 *         {
 *             "label": "p11",
 *             "type": "acen",
 *             "start": 1,
 *             "stop": "100000"
 *         },
 *         {
 *             "label": "q11",
 *             "type": "gpos75",
 *             "start": 100001,
 *             "stop": "199999"
 *         }
 *     ]
 *    }
 *    
 * @option {boolean} [includeSelector]
 *    Include an area selector that interacts with the coordinate position of the chromosome. default true.
 *       
 * @example 
 *					var instance= new Biojs.Chromosome({
 *						target: "YourOwnDivId",
 *						dasSource: "http://www.ensembl.org/das/Homo_sapiens.NCBI36.karyotype/",
 *						dasSegment: "8"
 *					});
 * 
 */
Biojs.Chromosome = Biojs.extend (
/** @lends Biojs.Chromosome#  */
{
	constructor: function (options) {
		var self = this;
		$("#"+self.opt.target).html('<div id="'+self.opt.target+'_chr"></div>');
		$("#"+self.opt.target+'_chr').css('position','relative');
		if (self.opt.dasSource!=null){
			var client = JSDAS.Simple.getClient(self.opt.dasSource);
			client.features({segment: self.opt.dasSegment}, function(res){ 
				self._modelFromDAS(res,self);
			}, self._error_response);
		}else if (self.opt.model!=null){
			this._process_model(self.opt.model,self);
		}
	},
	
	/**
	 * Default values for the options
	 * @name Biojs.Chromosome-opt
	 */
	opt: {
		target: "chromosome",
		model: null,
		dasSource: null,
		dasSegment: null,
		includeSelector: true
	},
	
	/**
	 * Array containing the supported event names
	 * @name Biojs.Chromosome-eventTypes
	 */	
	eventTypes: [
		 /**
		  * @name Biojs.Chromosome#onBandSelection
		  * @event
		  * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
		  * object as argument.
		  * @eventData {Object} source The component which did triggered the event.
		  * @eventData {string} type The name of the event.
		  * @eventData {string} chromosome_id Id of the chromosome that the selected band belongs.
		  * @eventData {string} band_id Id of the band that has been selected.
		  * @eventData {integer} band_start Coordinate of the first nucleotide of the selected band
		  * @eventData {integer} band_stop Coordinate of the last nucleotide of the selected band
		  * @eventData {string} band_type type of the band selected (eg. acen, gpos50, gneg).
		  * @example 
		  * 					instance.onBandSelection(function( objEvent ) {
		  * 						alert("The band " + objEvent.band_id + " of the chromosome " + objEvent.chromosome_id + " has been selected\n[" + objEvent.band_start + "," + objEvent.band_stop + "]");
		  * 					}); 
		  */
		 "onBandSelection",
		 /**
		  * @name Biojs.Chromosome#onSelectorChanged
		  * @event
		  * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
		  * object as argument. Is triggered when the the coordinates of the selector have been changed.
		  * @eventData {Object} source The component which did triggered the event.
		  * @eventData {string} type The name of the event.
		  * @eventData {string} chromosome_id Id of the chromosome that the selected band belongs.
		  * @eventData {integer} selector_start Coordinate of the left side of the selector
		  * @eventData {integer} selector_stop Coordinate of the right side of the selector
		  * @example 
		  * 					instance.onSelectorChanged(function( objEvent ) {
		  * 						alert("The selector has move to the region \n[" + objEvent.selector_start + "," + objEvent.selector_stop + "]");
		  * 					}); 
		  */
		 "onSelectorChanged",
		 /**
		  * @name Biojs.Chromosome#onModelLoaded
		  * @event
		  * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
		  * object as argument. Triggered when he model has been loaded
		  * @eventData {Object} source The component which did triggered the event.
		  * @eventData {string} type The name of the event.
		  * @eventData {Object} model The model after been displayed
		  * @example 
		  * 					instance.onModelLoaded(function( objEvent ) {
		  * 						alert("The model for the chromosome "+objEvent.model.id+" has been loaded");
		  * 					}); 
		  */
		 "onModelLoaded",
		 /**
		  * @name Biojs.Chromosome#onDASLoadFail
		  * @event
		  * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
		  * object as argument. Triggered when the model couldn't be loaded
		  * @eventData {Object} source The component which did triggered the event.
		  * @eventData {string} type The name of the event.
		  * @eventData {string} dasSource URL of the DAS source queried
		  * @eventData {string} dasSegment URL of the DAS source queried
		  * @example 
		  * 					instance.onDASLoadFail(function( objEvent ) {
		  * 						alert("The DAS source "+objEvent.dasSource+" with information of the segment "+objEvent.dasSegment+" couldn't be loaded");
		  * 					}); 
		  */
		 "onDASLoadFail"
	],
	
	 /**
	  * @private
	  * Private: Callback function in case of an error in the DAS query.
	  */
	_error_response: function(){
		var self=this;
		$("#"+self.opt.target).append("ERROR querying the DAS source.");
		self.raiseEvent('onDASLoadFail', {
			dasSource: self.opt.dasSource,
			dasSegment: self.opt.dasSegment
		});
	},
	
	 /**
	  * @private
	  * Private: Callback function when the DAS response is captured. 
	  * It maps the response into the internal model for bands.
	  */
	_modelFromDAS: function(res,parent){
		if(typeof parent != "undefined")
			var self=parent;
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
	_process_model: function(model,self){
		//Sorting the bands by the start coordinate
		model.bands.sort(
		/**
		 * @ignore
		 **/
		function sortfunc(a,b){
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
				self.raiseEvent('onBandSelection', {
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
					self.raiseEvent('onSelectorChanged', {
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
			self.opt.selector = new Biojs.AreaSelector({
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
			self.opt.selector.onRegionChanged(function( objEvent ) {
				if (!self.opt.selector.fromWatcher){
					self.opt.selector.from	= self._getCoordinateFromLeft(objEvent.region[0]);
					self.opt.selector.to	= self._getCoordinateFromLeft(objEvent.region[2]);
					self.raiseEvent('onSelectorChanged', {
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
		self.raiseEvent('onModelLoaded', {
			model: model
		});
		
	},
	/**
	 * AreaSelector component that allows to interact with the chromosome.
	 * Optional feature, that can be disable in the options object by setting the feature includeSelector to false
	 * @private
	 * @name Biojs.Chromosome-selector
	 */	
	selector:null,
	/**
	 * Move the Selector to a specific place in the chromosome
	 * 
	 * @param {integer} from initial chromosome coordinate to locate the selector
	 * @param {integer} to final chromosome coordinate to locate the selector
	 * 
	 * @example
	 * instance.moveSelectorToCoordinates(10000000,20000000);
	 * 
	 */
	moveSelectorToCoordinates: function(from, to){
		var self=this;
		if(self.opt.selector!=null){
			self.opt.selector.from=from;
			self.opt.selector.to=to;
			self._moveSelectorToDivCoordinates(self._getLeftFromCoordinate(from),self._getLeftFromCoordinate(to));
		}else
			return false;
	},
	
	/**
	 * Gives the corresponding value for left in respect of the parent component from a chromosome coordinate
	 * @private
	 * @name Biojs.Chromosome-_getLeftFromCoordinate
	 */	
	_getLeftFromCoordinate: function(coordinate){
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
		
	},	
	/**
	 * Gives the corresponding value for a chromosome coordinate from the left value in respect of the parent component 
	 * @private
	 * @name Biojs.Chromosome-_getCoordinateFromLeft
	 */	
	_getCoordinateFromLeft: function(left){
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
		
	},	
	
	/**
	 * moves the selector to a position in the div using the div relative coordinates 
	 * @private
	 * @name Biojs.Chromosome-_moveSelectorToDivCoordinates
	 */	
	_moveSelectorToDivCoordinates: function(from, to){
		var self=this;
		if (self.opt.includeSelector && self.opt.selector!=null)
			self.opt.selector.setCoveredArea([from,-5,to,20]);
	}
});
