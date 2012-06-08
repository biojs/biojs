/** 
 * Table.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://www.datatables.net/'>DataTables Plugin</a>
 * @dependency <script type="text/javascript" src="../biojs/dependencies/jquery.dataTables.min.js"></script>
 * 
 * @requires <a href=''>jQuery UI 1.8.2+</a>
 * @dependency <script type="text/javascript" src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js"></script>
 * 
 * @requires <a href='http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/'>MultiSelect Plugin</a>
 * @dependency <script type="text/javascript" src="../biojs/dependencies/jquery.multiselect.min.js"></script>
 * 
 * @dependency <link href="../biojs/css/biojs.table.css" rel="stylesheet" type="text/css" />
 * @dependency <link href="../biojs/css/smoothness/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" /> 
 * 
 * @param {Object} options 
 *    An object with the options for HelloWorld component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {string[][]|Object} dataSet 
 *    Either 2D string array containing the whole data to be displayed or a plain object defining the data source. 
 *    
 *    <pre class="brush: js" title="Syntax of the plain object:">
 *    {
 * 		url: &lt;url&gt;,
 * 		proxyUrl: &lt;proxy&gt;,
 * 		paramsMap: { "iDisplayStart": &lt;newName1&gt;, "iDisplayLength": &lt;newName2&gt;, ... },
 * 		filter: &lt;flag&gt;
 *    }
 *    </pre>
 *    where:
 *      <ul>
 *        <li><b>url</b> is string containing the url data source.</li>
 *        <li><b>paramsMap</b> Customize the name of the following params which will be passed to server:
 *    			<ul>
 *    				<li>iDisplayStart: index of the first expected record for paging.</li>
 *    				<li>iDisplayLength: size of the fetched data (page size).</li>
 *    				<li>sSearch: filter string entered by the user in case of filter is enabled.</li>
 *    			</ul>
 *        </li>
 *        <li><b>filter</b> is a boolean to show/hide the search box on the table top. 
 *        The entered string will be passed to the server by means of 'sSearch' parameter.
 *        Personalize the parameter name using paramsMap.</li>
 *        <li><b>proxyUrl</b> optional string containing the url of the proxy in case of needing access to server through a proxy.</li>   
 *      </ul>
 *      
 *    <pre class="brush: js" title="Example of plain object: ">
 *    {
 * 		url: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search/query/species:human',
 * 		paramsMap: { "iDisplayStart": "firstResult", "iDisplayLength": "maxResults" },
 * 		filter: false
 *    }
 *    </pre>  
 *  
 *    <pre class="brush: js" title="Example of 2D array of data: ">
 *    [
 *		[ 1, "chi", "China", 1347350000, "December 31, 2011", "0.1925" ],
 *		[ 2, "ind", "India", 1210193422, "March 1, 2011", "0.1729" ],
 *		[ 3, "usa", "United States", 313149000, "March 9, 2012", "0.0447" ],
 *		[ 4, "ino", "Indonesia", 237641326, "May 1, 2010", "0.034" ],
 * 		[ 5, "bra", "Brazil", 192376496, "July 1, 2011", "0.0275" ],
 * 		[ 6, "pak", "Pakistan", 178945000, "March 9, 2012", "0.0256" ],
 * 		[ 7, "nig", "Nigeria", 162471000, "July 1, 2011", "0.0232" ],
 * 		[ 8, "rus", "Russia", 143030106, "January 1, 2012", "0.0204" ],
 * 		[ 9, "ban", "Bangladesh", 142319000, "March 15, 2011", "0.0203" ],
 * 		[ 10, "jap", "Japan", 127770000, "February 1, 2012", "0.0183" ],
 * 		[ 11, "mex", "Mexico", 112336538, "June 12, 2010", "0.016" ],
 * 		[ 12, "phi", "Philippines", 94013200, "July 1, 2010", "0.0134" ],
 * 		[ 13, "vie", "Vietnam", 87840000, "December 31, 2011", "0.0125" ],
 * 		[ 14, "eth", "Ethiopia", 84320987,	"July 1, 2012", "0.012" ],
 * 		[ 15, "ger", "Germany", 81796000, "August 31, 2011", "0.0117" ]
 *    ]
 *    </pre>
 *  
 * @option {(string|Object)[]} columns 
 *    <p>Array containing the column descriptors. A descriptor can be either a string or an object. 
 *    Use a string to define column name only. Use an object to define column name, rendering function and fixed width.
 *    </p>
 *    <pre class="brush: js" title="Syntax of the plain object:">
 *    {
 * 		name: &lt;string&gt;,
 * 		render: &lt;function&gt;,
 * 		width: &lt;string&gt;
 *    }
 *    </pre>
 *    where:
 *      <ul>
 *        <li><b>name</b> will be used for the column title, and 'render'.</li>
 *        <li><b>render</b> is a function to format each row value in that column. 
 *        <br/>Returns a string containing the new formatted value.
 *        <br/>Arguments: 
 *        <ul>
 *    		<li>col: index of the column.</li>
 *    		<li>dataRow: 1D array containing whole row.</li>
 *    		<li>value: current value of the cell.</li>
 *    		</ul>
 *        </li>
 *        <pre class="brush: js" title="Example of render function:">
 *       	// Formats a decimal value in a percentage value. 
 *    		var numberToPercentageFormat = function (col, dataRow, value) {
 *		  		return ( new Number(value) * 100 ).toFixed(2) + "%";
 * 			};
 * 		  </pre>
 *		  <li><b>width</b> of the column using either pixels or percentage.</li>	  
 *    </ul>
 *    <pre class="brush: js" title="Example of columns declaration">
 *    // Three columns: Identifier, Name and Location. 
 *    // Custom rendering function will apply bold to Identifier values.
 *    columns: [
 *		"Name",
 * 		"Location",
 *		{ name: "Population %", render: numberToPercentageFormat }
 *    ]
 *    </pre>
 *     
 * @option {int[]} [hideColumns=[]] 
 *    Indexes (0-based) of the columns to be hided.
 *    
 * @option {array[][int,string]} [orderBy=[]] 
 *    2D array to tell how to order the columns. Each 1D array must contains both column index and ordering direction.
 *    
 *    <pre class="brush: js" title="Example:">
 *    // order column 0 in ascending direction and column 3 in descending direction
 *    orderBy: [ [0,'asc'], [3,'desc'] ]
 *    </pre>
 * 
 * @option {int} [pageLength=10] 
 *    Number of rows per page.
 *    
 * @option {bool} [rowSelection=true] 
 *    Show/hide the first check boxes column used for selecting rows. 
 *    
 * @option {bool} [paginate=true] 
 *    Enable/disable the pagination, so whole the data will be displayed. 
 *    
 * @option {int} [width=597]
 *    Horizontal size of the general container. 
 * 
 * @option {int} [height=400]
 *    Vertical size of the general container.
 * 
 * @example 
 *    // Adds a flag to the cell value.
 *    var flagRender = function (col, dataRow, value) {
 *		  return '<img src="data/biojs.table/' +dataRow[col-1] + '.png" /> ' + value;
 *    };
 * 
 *    // Formats a decimal value in a percentage value. 
 *    var numberToPercentageFormat = function (col, dataRow, value) {
 *		  return ( new Number(value) * 100 ).toFixed(2) + "%";
 *    };
 * 
 *    // Example of instantiation of the Table
 *    var myTable = new Biojs.Table({
 *       target: "YourOwnDivId",
 *       hideColumns: [1],
 *       orderBy:  [ [0,'asc'], [3,'desc'] ],
 *       columns: [
 *	     	"Rank",
 *	     	"Flag",
 *          { name: "Country", render: flagRender },
 *          "Population",
 *          "Date",
 *	    	{ name:"% World Population", render: numberToPercentageFormat }
 *       ],
 *       dataSet: [
 *       	[ 1, "chi", "China", 1347350000, "December 31, 2011", "0.1925" ],
 *  		[ 2, "ind", "India", 1210193422, "March 1, 2011", "0.1729" ],
 *			[ 3, "usa", "United States", 313149000, "March 9, 2012", "0.0447" ],
 *			[ 4, "ino", "Indonesia", 237641326, "May 1, 2010", "0.034" ],
 * 			[ 5, "bra", "Brazil", 192376496, "July 1, 2011", "0.0275" ],
 * 			[ 6, "pak", "Pakistan", 178945000, "March 9, 2012", "0.0256" ],
 * 			[ 7, "nig", "Nigeria", 162471000, "July 1, 2011", "0.0232" ],
 * 			[ 8, "rus", "Russia", 143030106, "January 1, 2012", "0.0204" ],
 * 			[ 9, "ban", "Bangladesh", 142319000, "March 15, 2011", "0.0203" ],
 * 			[ 10, "jap", "Japan", 127770000, "February 1, 2012", "0.0183" ],
 * 			[ 11, "mex", "Mexico", 112336538, "June 12, 2010", "0.016" ],
 * 			[ 12, "phi", "Philippines", 94013200, "July 1, 2010", "0.0134" ],
 * 			[ 13, "vie", "Vietnam", 87840000, "December 31, 2011", "0.0125" ],
 * 			[ 14, "eth", "Ethiopia", 84320987,	"July 1, 2012", "0.012" ],
 * 			[ 15, "ger", "Germany", 81796000, "August 31, 2011", "0.0117" ]
 *       ]
 *       
 *    });
 * 
 */
Biojs.Table = Biojs.extend (
/** @lends Biojs.Table# */
{
	constructor: function (options) {
		var self = this; 

		//Biojs.console.enable();
		
		// TODO: validate mandatory values

		self._tableId = 'biojs_Table_'+self.getId();
		self._tableSelector = '#'+self._tableId;
		self._topControls = jQuery('<div></div>').appendTo("#"+self.opt.target);
		self._body = jQuery('<div></div>').appendTo("#"+self.opt.target);
		self._table = jQuery('<table id="'+ self._tableId +'" cellpadding="0" cellspacing="0" border="0" class="display"></table>').appendTo(self._body);
		self._columnsOffset = (this.opt.rowSelection)? 1 : 0;

		self._settings = {};
		self._settings.opt = this.opt;
		
		self._initSettings(self._settings);
		self.setDataSource(self.opt.dataSet);
		self._addEvents();

		Biojs.console.log("Biojs.Table constructor has finished");
	},

	/**
	 * Default values for the options
	 * @name Biojs.Table-opt
	 */
	opt: {
		target: "YourOwnDivId",
		hideColumns: [],
		columns: [""],
		dataSet: [],
		paginate: true,
		pageLength: 10,
		width: 597,
		height: 400,
		rowSelection: true,
		orderBy: []
		//mapUrlParams: function ( params ) { ; }
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.Table-eventTypes
	 */
	eventTypes: [
     /**
      * @name Biojs.Table#onCellClicked
      * @event
      * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
      * @eventData {Object} source The component which triggered the event.
      * @eventData {int} rowIndex Row selected (0-based index).
      * @eventData {int} colIndex Column number (0-based index).
      * @eventData {HTMLTableCellElement} cell Instance of the DOM HTMLTableCellElement selected.
      * @example
      * myTable.onCellClicked(
      *    function( e ) {
      *       alert("Cell selected in row "+ e.rowIndex +", column " + e.colIndex + ". Value: " + e.cell.innerText );
      *    }
      * );
      *
      **/
     "onCellClicked",

     /**
      * @name Biojs.Table#onRowSelected
      * @event
      * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
      * @eventData {Object} source The component which triggered the event.
      * @eventData {int} rowIndex Row selected (0-based index).
      * @eventData {HTMLTableRowElement} row Instance of the DOM HTMLTableRowElement selected.
      * @example
      * myTable.onRowSelected(
      *    function( e ) {
      *       alert("Row selected: "+ e.rowIndex );
      *    }
      * );
      *
      **/
     "onRowSelected",

     /**
      * @name Biojs.Table#onHeaderClicked
      * @event
      * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
      * @eventData {Object} source The component which triggered the event.
      * @eventData {string} colName Column name.
      * @eventData {int} colIndex Column number (0-based index).
      * @example
      * myTable.onHeaderClicked(
      *    function( e ) {
      *       alert("Header \""+ e.colName +"\" selected. Column index " + e.colIndex + ". " );
      *    }
      * );
      *
      **/
     "onHeaderClicked",

     /**
      * @name Biojs.Table#onDataArrived
      * @event
      * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
      * @eventData {Object} source The component which triggered the event.
      * @eventData {Object} jsonData Data object just arrived.
      * @example
      * myTable.onDataArrived(
      *    function( e ) {
      *       alert( e.jsonData.aaData.length + " new records has arrived." );
      *    }
      * );
      *
      **/
     "onDataArrived"],

     /**
      * Rebuild the table
      * 
      * @example 
      * myTable.setDataSource({
	  * 	url: 'data/tableJSON.js'
	  * });
      * 
      */
     setDataSource: function ( dataSet ) {

    	this.opt.dataSet = dataSet;
    	
		if ( dataSet instanceof Array ) {
			this._initSettingsForLocalData(this._settings);
		} else {
			this._initSettingsForRemoteData(this._settings);
		}
		
		Biojs.console.log("Drawing..");
		this._settings.bDestroy = true;
    	this._table.dataTable( this._settings ); 
    	this._setColumnSelector( this._table.fnSettings() );
     },
     
     /**
      * Shows the columns indicated by the indexes array.
      * @param {int[]} columns Column indexes to be showed.
      * @param {bool} flag The new value.
      * 
      * @example 
      * myTable.toggleColumns([0,3],true);
      * 
      */
     toggleColumns: function (columns, flag) {
    	 Biojs.console.log("Toggle columns to :"+ flag );
    	 Biojs.console.log(columns);

    	 var checkbox = jQuery('input[name="multiselect_' + this._tableId + '_columns"]');

    	 for ( i=0; i < columns.length; i++ ) {
    		 toToggle = jQuery(checkbox[ columns[i] ]);
    		 if ( toToggle.attr("checked") != flag ) {
    			 toToggle.click();
    		 }
    		 this._table.fnSetColumnVis( columns[i] + this._columnsOffset, flag );
    	 }
     },

     /**
      * Shows the columns indicated by the indexes array.
      * @param {int[]} columns Column indexes to be showed.
      * 
      * @example 
      * myTable.showColumns([0,3]);
      * 
      */
     showColumns: function(columns){
    	 Biojs.console.log("Showing columns:");
    	 Biojs.console.log(columns);

    	 this.toggleColumns(columns,true);
     },

     /**
      * Hides the columns indicated by the indexes array.
      * @param {int[]} columns Column indexes to be hided.
      * 
      * @example 
      * myTable.hideColumns([0,3]);
      * 
      */
     hideColumns: function(columns){
    	 Biojs.console.log("Hiding columns:");
    	 Biojs.console.log(columns);

    	 this.toggleColumns(columns,false);
     },

     /**
      * Sorts by column.
      * @param {int} columnIndex Column indexes to be sorted (0-based index).
      * @param {string} direction Sorting direction; 'asc' for ascending, 'desc' for descending.
      * 
      * @example 
      * myTable.orderBy(1,'desc');
      * 
      */
     orderBy: function (columnIndex, direction) {
    	 this._table.fnSort( [ [columnIndex + this._columnsOffset, direction] ] );
     },

     /**
      * Gets the current selected data.
      * 
      * @returns {string[][]} data current selection.
      * 
      * @example 
      * myTable.getSelectedRows();
      * 
      */
     getSelectedRows: function(){
    	 var self = this;
    	 var selectedRows = [];

    	 jQuery(self._tableSelector + ' tr.selected')
	    	 .each(function(index, e) {
	    		 selectedRows.push(self._table.fnGetData(e));
	    	 });

    	 Biojs.console.log(selectedRows)
    	 return selectedRows;
     },
     
     /* 
      * Function: Biojs.Table._initSettings
      * Purpose:  initialize the settings for DataTables plugin in case of using local data
      * Returns:  -
      * Inputs:   settings -> {Object} where the configuration settings will be added.
      */
     _initSettings: function( settings ) {
    	 Biojs.console.log("initializing settings...");

    	 settings.aoColumnDefs = []; 

    	 this._setColumns(this.opt.columns, settings);
    	 //this._setData(this.opt.dataSet, settings);

    	 // Hide columns 
    	 if ( this.opt.hideColumns.length > 0 ) {
    		 settings.aoColumnDefs.push( { "bVisible": false, "aTargets": this.opt.hideColumns } );
    	 }

    	 // Order by 
    	 if ( this.opt.orderBy.length > 0 ) {
    		 settings.aaSorting = this.opt.orderBy;
    	 }

    	 // Row selection column (checkboxes column) is enabled? 
    	 if (this.opt.rowSelection) { 
    		 var columnsToHide = settings.aoColumnDefs[0].aTargets;

    		 // Shift the index of the columns to hide
    		 for ( i in columnsToHide ) {
    			 columnsToHide[i] += 1;
    		 }

    		 // Shift the index of the columns to order
    		 for ( i in settings.aaSorting ) {
    			 settings.aaSorting[i][0] += 1;
    		 }
    		 
    		 // Disable the ordering on the column 0 (checkboxes column) 
    		 settings.aoColumnDefs.push( { "bSortable": false, "aTargets": [ 0 ] } );
    	 }
    	 
    	 // pagination
    	 if ( !this.opt.paginate ) {
    		 settings.bScrollInfinite = true;
    		 settings.bScrollCollapse = true;

    	 } else {
    		 settings.sPaginationType = "full_numbers"; 
    		 settings.iDisplayLength = this.opt.pageLength;
    		 settings.oLanguage = {
    				 "oPaginate": {
    					 "sPrevious": "<",
    					 "sNext": ">",
    					 "sFirst": "|",
    					 "sLast": "|"
    				 }
    		 };
    	 }
    	 settings.bProcessing = true;
    	 settings.bLengthChange = false;
    	 settings.sScrollX = this.opt.height;
    	 settings.sScrollY = "100%";
     },
     
     /* 
      * Function: Biojs.Table._initSettingsForLocalData
      * Purpose:  initialize the settings for DataTables plugin in case of using local data
      * Returns:  -
      * Inputs:   settings -> {Object} where the configuration settings will be added.
      */
     _initSettingsForLocalData: function( settings ) {
    	 Biojs.console.log("Using local data");
    	 this._setData(this.opt.dataSet, settings);;
    	 // Don't use data source provided by a server 
    	 settings.bServerSide = false;
    	 // Set URL of the data source
    	 settings.sAjaxSource = null;
    	 // Set the function which manages the Ajax requests
    	 settings.fnServerData = null;
    	 // Enable filtering
    	 settings.bFilter = true;
     },
     
     /* 
      * Function: Biojs.Table._initSettingsForRemoteData
      * Purpose:  initialize the settings for DataTables plugin in case of using remote data
      * Returns:  -
      * Inputs:   settings -> {Object} where the configuration settings will be added.
      */
     _initSettingsForRemoteData: function(settings) {
    	 
    	 Biojs.console.log("Using data from remote URL: "+ this.opt.dataSet.url);

    	 // Use data source provided by a server 
    	 settings.bServerSide = true;
    	 // Set URL of the data source
    	 settings.sAjaxSource = this.opt.dataSet.url;
    	 // Set the function which manages the Ajax requests
    	 settings.fnServerData = this._fetchData;
    	 // Enable/disable filtering depending on the support by the server
    	 settings.bFilter = this.opt.dataSet.filter;
     },

     /* 
      * Function: _fetchData
      * Purpose:  do the Ajax request to get the data from server. Note that 'this' will not refered to the Biojs.Table instance
      * 	due to this function will be linked to the internal DataTables object.
      * Returns:  -
      * Inputs:   
      * 	sSource -> {string} HTTP source to obtain the data from (defined in option dataSet.url).
      * 	aoData -> {Object[]} a key/value pair object containing the data to send to the server.
      * 	fnCallback -> {function} to be called on completion of the data get process that will draw the data on the page.
      * 	oSettings -> {object} DataTables settings object.
      */
     _fetchData: function ( sSource, aoData, fnCallback, oSettings ) {

    	 var httpRequest = { url: sSource };
    	 var params = aoData;

    	 // Get the Biojs Table instance 
    	 var biojsId = oSettings.sTableId.substr( "biojs_Table_".length );
    	 var instance = Biojs.getInstance(biojsId);

    	 // Rename param names using those defined in the options instance.opt.dataSet.mapParams
    	 instance._mapUrlParams(aoData);

    	 // Set callback function on success
    	 //httpRequest.success = fnCallback;

    	 // Data type expected 
    	 httpRequest.dataType = 'json';

    	 // Using proxy?
    	 // Redirect using the proxy and encode all params as url data
    	 if ( instance.getProxy() != undefined ) {

    		 // Redirect to proxy url
    		 httpRequest.url = instance.getProxy();

    		 // Encode both url and parameters under the param url
    		 params = [{ name: "url", value: sSource + '?' + jQuery.param(aoData) }];

    		 // Data type 
    		 httpRequest.dataType = instance.getProxyDataType();
    		 
    	 }
    	 
    	// Wrap the callback function 
		 httpRequest.success = 
			 /**
			  * @ignore
			  **/
			 function ( data ) {

			 // Decode data
			 jsonData = instance._decodeToJSON( data );
			 
			 // Set the echo var
			 jsonData.sEcho = this.sEcho;
			 
			 // Add the column of checkboxes in case of using row selection
			 instance._setSelectionColumn( jsonData );
			 
			 // Call the datatables cb function
			 fnCallback( jsonData );

			 // fire event
			 instance.raiseEvent( Biojs.Table.EVT_ON_DATA_ARRIVED, { 
				 "jsonData": jsonData 
			 });
		 }

    	 httpRequest.type = 'GET';
    	 httpRequest.data = params;
    	 httpRequest.sEcho = aoData[0].value;

    	 jQuery.ajax( httpRequest );
     },

     getProxy: function() {
    	 return this.opt.dataSet.proxyUrl;
     },

     getProxyDataType: function() {
    	 return this.opt.dataSet.dataType | "text";
     },

     /**
      * Returns the total records in the dataset.
      * 
      * @example 
      * alert("Total records:" + myTable.getTotalRecords());
      * 
      */
     getTotalRecords: function() {
    	 return this.opt.dataSet.totalRecords;
     },

     _setSelectionColumn: function( jsonData ) {
    	 if ( this.opt.rowSelection && jsonData.aaData instanceof Array ) {
    		 for ( i = 0; i < jsonData.aaData.length; i++ ){
    			 jsonData.aaData[i].unshift('<input type="checkbox" id="'+ i +'" />');
    		 }
    	 }
     },

     /* 
      * Function: Biojs.Table._decodeToJSON
      * Purpose:  Decode the received data to suit it into the expected JSON format. 
      * 		  Override this method in the Biojs.Table's children to suit any raw data into the expected JSON format.
      * Returns:  {Object} formatted in the expected JSON format. 
      * Inputs:   data -> {*} raw data received from the server. 
      */
     _decodeToJSON: function ( data ) {
    	 var jsonData = data;
    	 
    	 if ( Biojs.Utils.isEmpty(data) ) {
    		 Biojs.console.log("Empty data was received");
    		 
    	 } else if ( !(jsonData instanceof Object) || !(jsonData.aaData instanceof Array) ) {
			 jsonData = {};
			 jsonData.aaData = [];
			 jsonData.iTotalRecords = 0;
			 jsonData.iTotalDisplayRecords = 0;
			 Biojs.console.log("Error: data with unknown format was detected.");
		 }
    	 
    	 Biojs.console.log(jsonData);
    	 return jsonData;
     },

     /* 
      * Function: Biojs.Table._mapUrlParams
      * Purpose:  Rename the param names with the customized names declared in the option dataSet.paramsMap 
      * Returns:  -
      * Inputs:   {Object[]} a key/value pair object containing the data to send to the server.
      */
     _mapUrlParams: function ( params ) {
    	 var map = this.opt.dataSet.paramsMap;
    	 for ( key in map ) {
    		 for ( i = 0; i < params.length; i++) {
    			 // rename the parameter name 
    			 if ( params[i].name == key ) {
    				 Biojs.console.log("Renaming param <" + key + "> with <" + map[key] + ">" );
    				 params[i].name = map[key]; 
    			 }
    		 }
    	 }	
     },

     /* 
      * Function: Biojs.Table._setColumnSelector
      * Purpose:  Build the drop down box to hide/show columns by means of the user selection. 
      * Returns:  -
      * Inputs:   oSettings -> {Object} DataTables settings object.
      */
     _setColumnSelector: function( settings ){

    	 var self = this;
    	 var columns = settings.aoColumns;
    	 var select = jQuery('<select id="' + self._tableId + '_columns" name="columns" multiselect="multiselect" />');

    	 for ( i = this._columnsOffset ; i< columns.length; i++) {
    		 select.append('<option value="' + i + '">' + columns[i].sTitle + '</option>'); 
    	 }

    	 // Take selector out of the DOM
    	 jQuery(self._tableSelector+'_wrapper > ' + self._tableId + '_columns').remove();
    	 
    	 // Add selector to the DOM 
    	 select.prependTo(self._tableSelector+'_wrapper');

    	 // Uses the MultiSelect plugin as column selector
    	 self._columnSelector = select.multiselect({ 
    		 header: false,
    		 click: function(event, ui) {
    			 self._table.fnSetColumnVis(ui.value, ui.checked);
    		 }
    	 });

    	 // Changes the icon for the column selector
    	 jQuery(self._tableSelector+'_wrapper > button')
	    	 .html('<span class="ui-icon ui-icon-carat-2-e-w"></span>')
	    	 .css("width","auto")
	    	 .addClass('dataTables_settings')
	    	 .attr("title", "Show/hide columns");

    	 // Set the current selection status
    	 self._columnSelector.multiselect('uncheckAll');

    	 var visibleCols = settings.aiDisplayMaster;
    	 var checkbox = jQuery('input[name="multiselect_' + this._tableId + '_columns"]');

    	 for ( i = 0 ; i < checkbox.length ; i++ ) {
    		 jQuery( checkbox[i] ).attr("checked", settings.aoColumns[ i + this._columnsOffset ].bVisible );
    	 }
     },


     /**
      * Add a single new row or multiple rows of data to the table.
      * @param {array} data 1D array of data - add a single row with the data provided
      * 
      * @example 
      * myTable.addDataRow([ 1, "col", "Colombia", 46420000, "March 12, 2012", "0.0066" ]);
      *  
      */
     addDataRow: function(row) {
    	 if (this.opt.rowSelection) {
    		 row.unshift('<input type="checkbox" id="" />');
    	 }
    	 this._table.fnAddData(row); 
     },

     /**
      * Add a single new row or multiple rows of data to the table.
      * @param {array} data 1D array of data - add a single row with the data provided
      * 
      * @example 
      * myTable.removeDataRow(2);
      * 
      */
     removeDataRow: function(i){
    	 this._table.fnDeleteRow(i)
     },

     /* 
      * Function: Biojs.Table._setColumns
      * Purpose:  Map the columns values defined in the option 'columns' to the columns values for DataTables plugin
      * Returns:  -
      * Inputs:   
      * 	columns -> {(string|Object)[]} columns in the format defined in the option 'columns'.
      * 	oSettings -> {Object} DataTables settings object.
      */
     _setColumns: function ( columns, oSettings ) {
    	 var self = this;
    	 var result = [];

    	 // Add a column of checkbox for selection 
    	 if (this.opt.rowSelection) {
    		 columns.splice(0, 0, { "name": '<input type="checkbox" />' } );
    	 }

    	 for ( j in columns ) {
    		 if ( typeof columns[j] == "string" ) {
    			 result[j] = { "sTitle": columns[j] };
    		 } else {
    			 result[j] = { "sTitle": columns[j].name };
    			 if ( columns[j].render && typeof columns[j].render == "function") {
    				 result[j].fnRender = function ( o, value ) {
    					 return columns[o.iDataColumn].render(o.iDataColumn, o.aData, value);
    				 }
    			 }
    			 if ( columns[j].width && typeof columns[j].width == "string") {
    				 result[j].sWidth = columns[j].width;
    			 }
    		 }
    	 }
    	 oSettings.aoColumns = result;
     },

     /* 
      * Function: Biojs.Table._setData
      * Purpose:  Set the data in case of using local data to initialize the Biojs.Table instance.
      * Returns:  -
      * Inputs:   
      * 	data -> {string[][]} data to be displayed.
      * 	oSettings -> {Object} DataTables settings object.
      */
     _setData: function ( data, oSettings ) {

    	 // Check if row selection is currently activated.
    	 if (this.opt.rowSelection) {
    		 // Adds a column for a checkbox for each row
    		 for ( r in data ) {
    			 data[r].splice(0, 0, '<input type="checkbox" id="'+ r +'" />');
    		 } 
    	 }
    	 // Set the data in DataTables object.
    	 oSettings.aaData = data;
     },

     _showEmptyMessage: function(){
    	 this._body.html("Empty");
     },

     /* 
      * Function: Biojs.Table._addEvents
      * Purpose:  initialize the event triggers for the clicks on the Biojs.Table
      * Returns:  -
      * Inputs:   -
      */
     _addEvents: function(){
    	 var self = this;

    	 // Cell clicked 
    	 jQuery(this._tableSelector)
    	 .click( function (eventData) {
    		 var cell = eventData.target;

    		 while (cell.tagName != "TD" ) {
    			 cell = cell.parentNode;
    		 }

    		 var column = new Number(cell.cellIndex);
    		 var row = new Number(cell.parentNode.rowIndex-1);

    		 if ( self.opt.rowSelection && column == 0 ) {
    			 if( cell.children[0].checked ) {
    				 jQuery(cell).parent().addClass('selected');
    				 self.raiseEvent( Biojs.Table.EVT_ON_ROW_SELECTED , { 
    					 rowIndex: row, 
    					 row: jQuery(cell).parent() 
    				 });
    			 } else {
    				 jQuery(cell).parent().removeClass('selected');
    			 }
    		 } else {
    			 self.raiseEvent( Biojs.Table.EVT_ON_CELL_CLICKED, { 
    				 "cell": cell,
    				 "rowIndex": row,
    				 "colIndex": column 
    			 });
    		 }
    		 Biojs.console.log(eventData);
    	 });

    	 // Header clicked
    	 jQuery(self._tableSelector+'_wrapper table.dataTable thead tr th')
    	 .click( function (eventData) {
    		 var cell = eventData.currentTarget;
    		 var column = cell.cellIndex;

    		 if ( self.opt.rowSelection && column == 0 ) {
    			 if( cell.children[0].checked ) {
    				 jQuery(self._tableSelector + ' tr').addClass('selected');
    				 jQuery(self._tableSelector + ' tr td input').attr('checked',true);
    			 } else {
    				 jQuery(self._tableSelector + ' tr').removeClass('selected');
    				 jQuery(self._tableSelector + ' tr td input').attr('checked',false);
    			 }
    		 } else {
    			 self.raiseEvent( Biojs.Table.EVT_ON_HEADER_CLICKED, { 
    				 "colName": cell.innerHTML,
    				 "colIndex": column 
    			 });
    		 }

    		 Biojs.console.log(eventData);
    	 });
     }

     
     
	//TODO: Render functions to format used data types: date, number, ...

},
/** @static */
/** @lends Biojs.Table */
{
	// Indexes to access the event name in this.eventTypes array
	EVT_ON_CELL_CLICKED:   "onCellClicked",
	EVT_ON_ROW_SELECTED:   "onRowSelected",
	EVT_ON_HEADER_CLICKED: "onHeaderClicked",
	EVT_ON_DATA_ARRIVED:   "onDataArrived"
}


);