/** 
 * Table.  
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @requires <a href='http://www.datatables.net/'>DataTables Plugin</a>
 * @dependency <script type="text/javascript" src="../biojs/dependencies/jquery.dataTables.js"></script>
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
 * @option {string[][]} [dataSet] 
 *    2D string array containing the data.
 *  
 * @option {string|object[]} columns 
 *    <p>Array containing the column descriptors. A descriptor can be either a 
 *    string or an object. If string, it will be used as column name. If object, it must have the fields name and render.
 *    </p><p>
 *    Where, 'name' will be used for the column name, and 'render' will format each value in the column. 'Render' value must 
 *    be a function which receives three values (column index as int, row data array as 1D string[], cell value as string) and 
 *    returns a string containing the new formatted value. 
 *    </p>
 *    Example: 
 *    <pre class="brush: js">
 *    // Three columns: Identifier, Name and Location. 
 *    // Custom rendering function will apply bold to Identifier values.
 *    columns: [
 *    	{  name: "Identifier", 
 *       	render: function (col, dataRow, value) {
 *       		return '<strong>' + value + '</strong>';
 *       	}
 *    	},
 *    	"Name",
 *     	"Location"
 *    ]
 *    </pre>
 *     
 * @option {int[]} [hideColumns=[]] 
 *    Indexes of the columns to be hided.
 * 
 * @option {int} [pageLength=10] 
 *    Number of rows per page.
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
 *	     	{ name: "Rank", width: "5%" },
 *	     	"Flag",
 *          { name: "Country", render: flagRender, width: "25%" },
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
	  //if ( Biojs.Utils.isEmpty(columns) )

	  self._tableId = 'biojs_Table_'+self.getId();
	  self._tableSelector = '#'+self._tableId;
	  self._topControls = $('<div></div>').appendTo("#"+self.opt.target);
	  self._body = $('<div></div>').appendTo("#"+self.opt.target);
	  self._table = $('<table id="'+ self._tableId +'" cellpadding="0" cellspacing="0" border="0" class="display"></table>').appendTo(self._body);
	  self._columnsOffset = (this.opt.rowSelection)? 1 : 0;
	  self._buildTable();
	  self._addEvents();
	  
	  Biojs.console.log("Biojs.Table constructor has finished");
	  //Biojs.console.log(self._table);
  },

  /**
   * Default values for the options
   * @name Biojs.Table-opt
   */
  opt: {
     target: "YourOwnDivId",
     hideColumns: [],
     columns: [],
     dataSet: [],
     paginate: true,
     pageLength: 10,
     width: 597,
     height: 400,
     rowSelection: true,
     orderBy: []
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
	 "onDataArrived"
  ],
  
  /**
   * Shows the columns indicated by the indexes array.
   * @param {int[]} columns Column indexes to be showed.
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
   * Shows the columns indicated by the indexes array.
   * @param {int[]} columns Column indexes to be showed.
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
  
  /**
   * Sets the data.
   * @param {string[][]} data Data
   * 
   * @example 
   * myTable.setData({});
   * 
   */
  _buildTable: function() {
	  var self = this;
	  var settings = {};
	  
	  if ( typeof (self._table.fnDestroy) == "function"  ) {
		  self._table.fnDestroy();
	  }
  
	  // Row selection active 
	  if (self.opt.rowSelection) {
		 self._addCheckboxesColumn(self.opt.columns, self.opt.dataSet);
		 settings.aoColumnDefs = [ { "bSortable": false, "aTargets": [ 0 ] } ];
	  }
	  
	  // Order by 
	  if ( self.opt.orderBy.length > 0 ) {
		  if (self.opt.rowSelection) {
			  for ( i in self.opt.orderBy ) {
				  self.opt.orderBy[i][0] += 1;
			  }
		  }
		  settings.aaSorting = self.opt.orderBy;
	  }
	  
	  settings.aaData = self.opt.dataSet;
	  settings.aoColumns = self._getColumns(self.opt.columns);
	  
	  if ( !this.opt.paginate ) {
		  settings.bScrollInfinite = true;
		  settings.bScrollCollapse = true;
	  } else {
		  settings.sPaginationType = "full_numbers"; 
		  settings.iDisplayLength = this.opt.pageLength;
	  }
	  	  
	  settings.oLanguage = {
	      "oPaginate": {
	        "sPrevious": "<",
	        "sNext": ">",
	        "sFirst": "|",
	        "sLast": "|"
	      }
	  };
	  
	  settings.sScrollX = this.opt.height;
	  settings.sScrollY = "100%";
	  
	  // Uses the DataTables plugin
	  self._table.dataTable(settings);
	  jQuery(self._tableSelector+'_length').remove();
	  
	  self._setColumnSelector(self.opt.columns);
  },
  
  _addCheckboxesColumn: function(columns, dataSet) {
	  var self = this;
	  
	  column = { name: '<input type="checkbox" />' };
	  columns.splice(0,0,column);
	  
	  for ( r in dataSet ) {
		  dataSet[r].splice(0, 0, '<input type="checkbox" id="'+ r +'" />');
	  }
  },
  
  _setColumnSelector: function(columns){
	  var self = this;
	  
	  var select = jQuery('<select id="' + self._tableId + '_columns" name="columns" multiselect="multiselect" />');
	  
	  // 
	  for ( i = this._columnsOffset ; i< columns.length; i++) {
		  columnName = (typeof columns[i] == "string")? columns[i]: columns[i].name;
		  select.append('<option value="' + i + '">' + columnName + '</option>'); 
	  }
	  
	  select.insertBefore(self._tableSelector+'_filter');

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
	  
	  self._columnSelector.multiselect('checkAll');
	  
	  this.hideColumns(this.opt.hideColumns);
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
  
  /**
   * Add a header names to the table.
   * @param {array} data 1D array of data - add a single row with the column names 
   * 
   */
  _getColumns: function(columns){
	 var self = this;
	 var result = [];
	 for ( j in columns ) {
		 Biojs.console.log(typeof columns[j]);
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
	 return result;
  },
  
  _showEmptyMessage: function(){
	  this._body.html("Empty");
  },
  
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
		  			self.raiseEvent( self.eventTypes[1], { // "onRowSelected"
		  				rowIndex: row, 
		  				row: jQuery(cell).parent() 
		  			});
		  		} else {
		  			jQuery(cell).parent().removeClass('selected');
		  		}
	  		} else {
	  			self.raiseEvent(self.eventTypes[0], { // "onCellClicked"
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
  				self.raiseEvent(self.eventTypes[2], { // "onHeaderClicked"
  	  				"colName": cell.innerHTML,
  	  				"colIndex": column 
  	  			});
  			}
  			
  			Biojs.console.log(eventData);
	  	});
  }
  
  //TODO: Render functions to format used data types: date, number, ...

});