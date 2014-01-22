/** 
 * This is the description of the MmcifViewer component. This component shows tabular views of information in PDB's mmcif files.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:swanand@gmail.com">Swanand Gore</a>
 * @version 1.0.0
 * @category 0
 *
 * 
 * @param {Object} options An object with the options for MmcifViewer component.
 *    
 *    
 * @example 
 * var myview = new Biojs.MmcifViewer({
 *     divid:"YourOwnDivId",     pdbid:"1cbs"
 * });	
 * 
 */
Biojs.MmcifViewer = Biojs.extend (
/** @lends Biojs.MmcifViewer# */
{
  /**
   *  Default values for the options
   *  @name Biojs.MmcifViewer-opt
   */
	opt: {
		divid: "YourOwnDivId", pdbid:'1cbs'
	},
  
	constructor: function (options) {
		var self = this;
		// make the top table with all categories listed
		jQuery("#"+options.divid).html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="catlistTable"></table><br><br><hr><br><br> <table cellpadding="0" cellspacing="0" border="0" class="display" id="categoryTable"></table><br>' );
		self.pdbid = options.pdbid;
		self.catable = null;
		jQuery.ajax({
			url: 'http://puck.ebi.ac.uk:4000/mmcif/'+self.pdbid+'/categories',
			data: {'varname':'catlist'},
			dataType: 'script',
			crossDomain: 'true',
			type: 'GET',
			success: function(response, callOptions) { self.showCategoriesList(catlist); }
		});
	},

	showCategoriesList: function(catlist) {
		var self = this;
		for(var ci=0; ci < catlist.length; ci++) catlist[ci] = [catlist[ci]];
 		var dtable = jQuery('#catlistTable').dataTable( {
        	"aaData": catlist,
        	"aoColumns": [ { "sTitle": "Categories" } ]
		} );
		dtable.$('td').click( function () {
			var sData = dtable.fnGetData( this );
			self.showAcategory(sData);
		} );
	},
	standardizeVals: function(vals) {
		if(vals instanceof Array) return vals;
		return [vals];
	},
	showAcategory: function(catname) {
		var self = this;
		console.log( 'Start showing category '+catname );
		jQuery.ajax({
			url: 'http://puck.ebi.ac.uk:4000/mmcif/'+self.pdbid+'/'+catname,
			data: {'varname':'catinfo'},
			dataType: 'script',
			crossDomain: 'true',
			type: 'GET',
			success: function(response, callOptions) { self.showCategoryTable(catinfo); }
		});
 		//var dtable = jQuery('#catlistTable').dataTable( {
        //	"aaData": catlist,
        //	"aoColumns": [ { "sTitle": "Categories" } ]
		//} );
	},

	showCategoryTable: function(catinfo) {
		var self = this;
		var colinfo = [], rows = [];
		for(var item in catinfo) {
			colinfo.push( {"sTitle":item} );
			var vals = self.standardizeVals(catinfo[item]);
			if(rows.length == 0) {
				for(ri=0; ri < vals.length; ri++) rows.push([]);
			}
			for(ri=0; ri < vals.length; ri++)
				rows[ri].push(vals[ri]);
		}
		if(self.catable!=null) { self.catable.fnDestroy(); jQuery("#categoryTable").html(""); }
		//self.catable = null;
 		self.catable = jQuery('#categoryTable').dataTable( {
        	"aaData": rows, "aoColumns": colinfo, bDestroy:true //, "bRetrieve": true, "bDestroy": true
		} );
	},

  /**
   * Array containing the supported event names
   * @name Biojs.MmcifViewer-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.MmcifViewer#onClick
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
	 * @name Biojs.MmcifViewer#onHelloSelected
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
  ] 
});

