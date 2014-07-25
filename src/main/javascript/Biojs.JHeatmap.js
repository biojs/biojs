/** 
 * Component displaying a ENSEMBL gene view summary
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="jordeu@jordeu.net">Jordi Deu-Pons</a>, <a href="michael.p.schroeder@gmail.com">Michael P Schroeder</a>
 * @version 1.0.0
 * @category 0
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.10.2.min.js'>jQuery Core 1.10.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.10.2.min.js"></script>
 *
 * @requires <a href='http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'>font awesome 4.0.3</a>
 * @dependency <link href="../biojs/dependencies/jheatmap/font-awesome-4.0.3.css" rel="stylesheet">
 *
 * @requires <a href='http://jheatmap.github.io/jheatmap/css/jheatmap-1.0.0.css'>jheatmap css 1.0.0</a>
 * @dependency <link href="../biojs/dependencies/jheatmap/css/jheatmap-1.0.0-min.css" rel="stylesheet">
 *
 * @requires <a href='http://jheatmap.github.io/jheatmap/js/jheatmap-1.0.0.js'>jheatmap 1.0.0</a>
 * @dependency <link href="../biojs/dependencies/jheatmap/css/jheatmap-1.0.0-min.css" rel="stylesheet">
 * 
 * @param {Object} options An object with the options to display the component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {Object} initParams
 * 	  Parameters for the heatmap function from jHeatmap
 *     
 * @example 
 * var instance = new Biojs.EnsemblGeneSummaryView({
 * 		"target": "jHeatmapDiv",
 * 		"initParams": {
 *                  data: {
 *                      rows: new jheatmap.readers.AnnotationReader({ url: "quickstart-rows.tsv" }),
 *                      cols: new jheatmap.readers.AnnotationReader({ url: "quickstart-cols.tsv" }),
 *                      values: new jheatmap.readers.TableHeatmapReader({ url: "quickstart-data.tsv" })
 *                  },
 *        
 *                  init: function (heatmap) {
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
    // Print HTML
    $(document).ready(function() {
        $("#"+options.target).heatmap(options.initParams);            
    });
  },


  /**
   *  Default values for the options
   *  @name Biojs.JHeatmap-opt
   */
  opt: {
     target: "jHeatmapDiv",
     initParams: {} 
  }
  
});
