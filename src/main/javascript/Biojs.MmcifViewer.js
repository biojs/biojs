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
 * @requires <a href='http://code.jquery.com/jquery-1.4.2.min.js'>jQuery Core 1.4.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 *
 * @requires <a href='http://datatables.net'>jQuery data tables 1.9.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/dataTables/DataTables-1.9.4/media/js/jquery.dataTables.js"></script>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/dataTables/DataTables-1.9.4/media/css/demo_table.css"></link>
 *    
 * @example 
 * var instance = new Biojs.MmcifViewer({
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
		self.mmcif_url = 'http://puck.ebi.ac.uk:4000/mmcif';
		self.mmcif_url = 'http://wwwdev.ebi.ac.uk/pdbe/widgets/topology'; // temporary entry to mmcif parsing backend
		// make the top table with all categories listed
		jQuery("#"+options.divid).html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="catlistTable"></table><br><br><hr><br><br> <table cellpadding="0" cellspacing="0" border="0" class="display" id="categoryTable"></table><br>' );
		self.pdbid = options.pdbid;
		self.catable = null;
		jQuery.ajax({
			url: self.mmcif_url,
			data: {'varname':'catlist', 'pdbid':self.pdbid, 'mmcif_data':"yes", "categories":1},
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
			url: self.mmcif_url,
			data: {'varname':'catinfo', "pdbid":self.pdbid, "category":catname, 'mmcif_data':"yes", "categoryData":1},
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
  ] 
});

