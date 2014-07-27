/** 
 * Display interactive heat maps and let the user sort and filter the displayed data
 * Test the jHeatmap example on this page or at it's official site: <a href="http://jheatmap.github.io/jheatmap/">http://jheatmap.github.io/jheatmap/</a>
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:jordeu@jordeu.net">Jordi Deu-Pons</a>, <a href="mailtomichael.p.schroeder@gmail.com">Michael P Schroeder</a>
 * @version 1.0.0
 * @category 2 
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.10.2.js'>jQuery Core 1.10.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.10.2.js"></script>
 *
 * @requires <a href='http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'>font awesome 4.0.3</a>
 * @dependency <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
 *
 * @requires <a href='http://jheatmap.github.io/jheatmap/css/jheatmap-1.0.0.css'>jheatmap css 1.0.0</a>
 * @dependency <link href="../biojs/dependencies/jheatmap/css/jheatmap-1.0.0-min.css" rel="stylesheet">
 *
 * @requires <a href='http://jheatmap.github.io/jheatmap/js/jheatmap-1.0.0.js'>jheatmap 1.0.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jheatmap/js/jheatmap-1.0.0-min.js"></script>
 * 
 * @param {Object} options An object with the options to display the JHeatmap component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {Object} inputData
 * 	  Parameters for the heatmap function from jHeatmap. See example or JHeatmap documentation at <a href="http://jheatmap.github.io/jheatmap/">http://jheatmap.github.io/jheatmap/</a>
 *     
 * @example 
 * var instance = new Biojs.JHeatmap({
 * 		"target": "YourOwnDivId",
 * 		"inputData": {
 *			
 *                  data: {
 *                     // jHeatmap reads data from external data files. Open them in order to understand the init function.
 *                     //  Also see http://jheatmap.github.io/jheatmap/ for detailed documentation.
 *                     rows: new jheatmap.readers.AnnotationReader({ url: "../biojs/data/jheatmap/genomic-alterations-rows.tsv" }),
 *                     cols: new jheatmap.readers.AnnotationReader({ url: "../biojs/data/jheatmap/genomic-alterations-cols.tsv" }),
 *                     values: new jheatmap.readers.TableHeatmapReader({ url: "../biojs/data/jheatmap/genomic-alterations-data.tsv" })
 *                  },
 *        
 *                  init: function (heatmap) {
 *                     // Selected layer
 *                     heatmap.cells.selectedValue = "Expression";
 *
 *                     // Label to show at rows header
 *                     heatmap.rows.selectedValue = "symbol";
 *
 *                     // Row and columns zoom
 *                     heatmap.cols.zoom = 2;  // width in pixels (minimum = 3)
 *                     heatmap.rows.zoom = 12; // height in pixels (minimum = 3)
 *
 *                      // Sort columns by subtype annotation
 *                      heatmap.cols.sorter = new jheatmap.sorters.AnnotationSorter("subtype", true);
 *
 *                      // Sort rows aggregating all the "Expression" values
 *                      heatmap.rows.sorter = new jheatmap.sorters.AggregationValueSorter("Expression", false, true);
 *        
 *                      // Column annotations
 *                      heatmap.cols.decorators["subtype"] = new jheatmap.decorators.CategoricalRandom();
 *                      heatmap.cols.annotations = ["subtype"];
 *        
 *                      // Rows annotations
 *                      heatmap.rows.decorators["fm-bias"] = new jheatmap.decorators.PValue({ cutoff: 0.05 });
 *                      heatmap.rows.annotations = ["fm-bias"];
 *        
 *                      // Aggregators
 *                      heatmap.cells.aggregators["Mutation"] = new jheatmap.aggregators.AbsoluteAddition();
 *                      heatmap.cells.aggregators["CNA Status"] = new jheatmap.aggregators.AbsoluteAddition();
 *                      heatmap.cells.aggregators["Expression"] = new jheatmap.aggregators.Median();
 *        
 *                      // Decorators
 *                      heatmap.cells.decorators["Mutation"] = new jheatmap.decorators.Categorical({
 *                                      values: ["0","1"],
 *                                      colors : ["white","green"]
 *                      });
 *        
 *                      heatmap.cells.decorators["CNA Status"] = new jheatmap.decorators.Categorical({
 *                                      values: ["-2","2"],
 *                                      colors : ["blue","red"]
 *                      });
 *        
 *                      heatmap.cells.decorators["Expression"] = new jheatmap.decorators.Heat({
 *                                      minValue: -2,
 *                                      midValue: 0,
 *                                      maxValue: 2,
 *                                      minColor: [85, 0, 136],
 *                                      nullColor: [255,255,255],
 *                                      maxColor: [255, 204, 0],
 *                                      midColor: [240,240,240]
 *                      });
 *        
 *                  }
 * 		}
 * });	
 * 
 */
Biojs.JHeatmap = Biojs.extend (
/** @lends Biojs.JHeatmap# */
{
  constructor: function (options) {
      this.opt.target = options.target
      //this.opt.inputData = options.inputData;
      this.setInputData(options.inputData);

  },

  /**
   *  Default values for the options
   *  @name Biojs.JHeatmap-opt
   */
  opt: {
     target: "YourOwnDivId",
     inputData: {}
  },
  /**
   * Function: Biojs.EnsemblGeneSummaryView._drawData
   * Purpose:  Draw different sections of the display
   * Returns:  -
   * Inputs:  -
   */
  _drawData: function(){
       this._container.heatmap(this.opt.inputData);
   },
  /**
  * Set a new input.
  * @param {object} inputData Input Data.
  * 
  * @example 
  * //Simple example
  * instance.setInputData( {
  *      data: {
  *          values: new jheatmap.readers.TableHeatmapReader({ url: "../biojs/data/jheatmap/genomic-alterations-data.tsv" })
  *      },
  *
  *      init: function (heatmap) {
  *
  *          // Decorators
  *          heatmap.cells.decorators["Mutation"] = new jheatmap.decorators.Categorical({
  *                          values: ["0","1"],
  *                          colors : ["white","green"]
  *          });
  *
  *          heatmap.cells.decorators["CNA Status"] = new jheatmap.decorators.Categorical({
  *                          values: ["-2","2"],
  *                          colors : ["blue","red"]
  *          });
  *
  *          heatmap.cells.decorators["Expression"] = new jheatmap.decorators.Heat({
  *                          minValue: -2,
  *                          midValue: 0,
  *                          maxValue: 2,
  *                          minColor: [85, 0, 136],
  *                          nullColor: [255,255,255],
  *                          maxColor: [255, 204, 0],
  *                          midColor: [240,240,240]
  *          });
  *      } 
  *   });
  *  
  * @example
  * //Simple example with data annotation 
  * instance.setInputData( {
  *			
  *    data: {
  *        rows: new jheatmap.readers.AnnotationReader({ url: "../biojs/data/jheatmap/genomic-alterations-rows.tsv" }),
  *        cols: new jheatmap.readers.AnnotationReader({ url: "../biojs/data/jheatmap/genomic-alterations-cols.tsv" }),
  *        values: new jheatmap.readers.TableHeatmapReader({ url: "../biojs/data/jheatmap/genomic-alterations-data.tsv" })
  *    },
  *
  *    init: function (heatmap) {
  *
  *        // Column annotations
  *        heatmap.cols.decorators["subtype"] = new jheatmap.decorators.CategoricalRandom();
  *        heatmap.cols.annotations = ["subtype"];
  *
  *        // Rows annotations
  *        heatmap.rows.decorators["fm-bias"] = new jheatmap.decorators.PValue({ cutoff: 0.05 });
  *        heatmap.rows.annotations = ["fm-bias"];
  *
  *        // Aggregators
  *        heatmap.cells.aggregators["Mutation"] = new jheatmap.aggregators.AbsoluteAddition();
  *        heatmap.cells.aggregators["CNA Status"] = new jheatmap.aggregators.AbsoluteAddition();
  *        heatmap.cells.aggregators["Expression"] = new jheatmap.aggregators.Median();
  *
  *        // Decorators
  *        heatmap.cells.decorators["Mutation"] = new jheatmap.decorators.Categorical({
  *                        values: ["0","1"],
  *                        colors : ["white","green"]
  *        });
  *
  *        heatmap.cells.decorators["CNA Status"] = new jheatmap.decorators.Categorical({
  *                        values: ["-2","2"],
  *                        colors : ["blue","red"]
  *        });
  *
  *        heatmap.cells.decorators["Expression"] = new jheatmap.decorators.Heat({
  *                        minValue: -2,
  *                        midValue: 0,
  *                        maxValue: 2,
  *                        minColor: [85, 0, 136],
  *                        nullColor: [255,255,255],
  *                        maxColor: [255, 204, 0],
  *                        midColor: [240,240,240]
  *        });
  *
  *    }
  * });	
  **/
  setInputData: function(inputData){
		this.opt.inputData = inputData;
		this._container = jQuery("#"+this.opt.target);
		//this._clearData();	
		this._drawData();
	}
});
