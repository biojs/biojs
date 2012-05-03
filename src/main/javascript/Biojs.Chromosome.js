/**
 * Chromosome Component
 * This component allow to visualize a chromosome and its bands. 
 * The bands can be recovered from a DAS source or directly from a javascript model.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.4.2.js'>jQuery Core 1.4.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://jsdas.googlecode.com/hg/lib/jsdas.0.1.6.min.js'>jsdas 0.1.6</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jsdas.0.1.6.js"></script>
 *  
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.chromosome.css'>Chromosome CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.chromosome.css" />
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
 * @example 
 * 					var instance= new Biojs.Chromosome({
 * 					     target: "YourOwnDivId",
 * 					     dasSource: "http://www.ensembl.org/das/Homo_sapiens.NCBI36.karyotype/",
 * 					     dasSegment: "8"
 * 					});
 * 
 */
Biojs.Chromosome = Biojs.extend (
/** @lends Biojs.Chromosome#  */
{
	constructor: function (options) {
		var self = this;
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
		dasSegment: null
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
		 "onBandSelection"
	],
	
	_error_response: function(){
		alert('Bad response, Wrong URL?, No XML response?');
	},
	
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
		self._process_model(model,self);
	},
	
	_process_model: function(model,self){
		model.bands.sort	( function sortfunc(a,b){
			return a.start-b.start;
		});
		var first="first",last="";
		for (var i in model.bands){
			var band = model.bands[i];
			if (i*1+1==model.bands.length)
				last="last";
			var percentage=100*(band.stop-band.start)/model.stop;
			var band_id=model.id+"_"+band.label;
			$("#"+self.opt.target).append("<div id='"+band_id+"' title='"+band.label+"' class='band "+band.type+" "+first+last+"' style='width: "+percentage.toFixed(1)+"%;'></div>");
			band_id=band_id.replace(/\./gi, "\\.");
			$("#"+band_id).click(function (){
				var band={}
				for (var j in model.bands){
					if ($(this).attr("title")==model.bands[j].label)
						band=model.bands[j];
					
				}
				self.raiseEvent('onBandSelection', {
					chromosome_id : model.id,
					band_id:	band.label,
					band_start:	band.start,
					band_stop:	band.stop,
					band_type:	band.type
				});
			});
			first="";
		}
		
	}
});
