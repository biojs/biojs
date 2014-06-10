/** 
 * Table to show binary molecular interactions.  
 * 
 * @class
 * @extends Biojs 
 * @author <a href="mailto:rowland.mosbergen@gmail.com">Rowland Mosbergen</a>
 * @version 0.0.1
 * @category 3
 * 
 * @requires <a href='http://d3js.org/d3.v3.min.js'>d3 v3.4.8</a>
 * @dependency <script language="JavaScript" src='http://d3js.org/d3.v3.min.js' type="text/javascript"></script>

 * @requires <a href='http://www.ebi.ac.uk/Tools/biojs/registry/src/Biojs.js'>Biojs</a>
 * @dependency <script language="JavaScript" src='http://www.ebi.ac.uk/Tools/biojs/registry/src/Biojs.js' type="text/javascript"></script>

 * @requires <a href='http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'>jQuery 1.8.2</a>
 * @dependency <script language="JavaScript" src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js' type="text/javascript"></script>

 * @requires <a href='http://d3js.org/queue.v1.min.js'>D3 queue </a>
 * @dependency <script language="JavaScript" src='http://d3js.org/queue.v1.min.js' type="text/javascript"></script>
 * 
 * 
 * 
 * 
 * 
 * @param {int} [height = 800]
 *    Full height of svg 
 *    
 * @param {int} [width =1024]
 *    Full width of svg 
 *    
 * @param {string} [shape = "circle"]
 *    To be passed into d3.svg.symbol eg. circle, square
 *    
 * @param {string} [unique_id = "sample_id"]
 *    Unique id column of the data file.
 *    
 *    
 * @param {string} [x_column = "component1"]
 *    column of the data file that will be used as the x axis. 
 *    
 * @param {string} [y_column  = "component2"]
 *    column of the data file that will be used as the y axis. 
 *    
 * @param {string} [x_axis_title =  "Component 1" ]
 *    title of the x axis. 
 *    
 *    
 * @param {string} [y_axis_title = "Component 2" ]
 *    title of the y axis. 
 *    
 * @param {string} [title_class= "title" ]
 *    class to add to the title. 
 *    
 * @param {string} [tooltip_class= "tooltip" ]
 *    class to add to the tooltip. 
 *    
 * @param {string} [point_class = "dot"]
 *    class to add to the points. 
 *    
 * @param {string} [legend_class = "legend"]
 *    class to add to the legend. 
 *    
 * @param {function} [tooltip_name = "see function below" ]
 *    function to use for the tooltip. defaults to:
 *           function (d,this_object){
 *              name = d[this_object.unique_id] +':' + d[this_object.x_column] + ' ' + d[this_object.y_column];
 *              return name;
 *            }, 
 *    
 * @param {object} [margin= {top: 80, right: 20, bottom: 30, left: 40} ]
 *    margin around the svg graph. 
 *    
 * @param {array} [domain = []]
 *    specific types of values to be used for colours. eg. ['Apple','Orange','Pear','Grape']
 *    
 * @param {array} [domain_colours = [] ];
 *    colours that match the domain array eg. ['blue','green','orange','red'] where blue is Apple
 *    
 *    
 * @example 
 *     data columns are state,type,component1,component2 tab separated
 *     d3.tsv('/usarrests.tsv',function (error,data){
 * 
 *         data.forEach(function(d){
 *             d.component1 = +d.component1;
 *             d.component2 = +d.component2;
 *         });
 * 
 *         target = "#other";
 *         var options = {
 *             target: target,
 *             title: "US Arrests",
 *             unique_id: "state",
 *             domain : ['Republican','Democrat'],
 *             domain_colours:['blue','green'],
 *             margin:{top: 80, right: 20, bottom: 30, left: 40},
 *             height: 600,
 *             width:960,
 *             x_axis_title: "Principal Component #1",
 *             y_axis_title: "Principal Component #2",
 *             shape:'square',
 *             point_class: 'states',
 *             tooltip_name: function (d,this_object){
 *                 name = d[this_object.unique_id] + '| |' + d[this_object.x_column] + ' ' + d[this_object.y_column];
 *                 return name;
 *             },
 * 
 * 
 *             data: data
 *         }
 *         var new_instance = new Biojs.PCAd3(options);
 *     }); 
 *   
 *     
 * #CSS for tool tip with default class tooltip
 * div.tooltip{
 *     @include default_large_text;
 *     padding: 8px;
 *     display: inline-block;
 *     max-width: 300px;
 *     z-index: 11000;
 *     position: absolute;
 *     color: #5a5a5a;
 *     background-color: #FFF;
 *     border: 1px solid #000;
 *     display:block;
 *     word-wrap: break-word;
 * }
 * 
 *   
 *   
 *   
 *   
 *   
 *   
 */

// later on want to download the svg
// http://stackoverflow.com/questions/18492617/button-to-download-inpage-svg-code-as-an-svg-file


Biojs.PCAd3 = Biojs.extend ({
/** @lends Biojs.PCAd3# */
    constructor: function (options) {
     /* Your constructor code here

       Note: options provided on instantiation time overrides the 
       default values in this.opt, automatically; i.e. ‘options’ 
       argument refers to the provided values and ‘this.opt’ 
       refers to the  the overridden options. For more details, 
       go to section 6.3.2 in the spec. doc. */

        var self = this;

        this._container = jQuery(self.opt.target);
        this._container.addClass('PCA');


        this._init();

        this.setup_graph();
        this.set_points();
        this.setup_legend();



    },

    opt: {
    /* Target DIV
     This mandatory parameter is the identifier of the DIV tag where the
     component should be displayed. Use this value to draw your
     component into. */
        target: "YourOwnDivId",
        title: "Title",
    /* Component Options
     These options defines the input data for your component.
     Must have a default value for each one. Note that, either some or
     all of values might be replaced by the constructor using the values
     provided in instantiation time.

     Define your own options here following the next syntax:
        <option1>: <defaultValue1>,
        <option2>: <defaultValue2>,
        :
        .
        <optionN>: <defaultValueN> */
        height: 800,
        width: 1024,
        shape: "circle",
        unique_id: "sample_id",
        x_column: "component1",
        y_column: "component2",
        x_axis_title: "Component 1",
        y_axis_title: "Component 2",
        title_class: "title",
        tooltip_class: "tooltip",
        point_class: "dot",
        legend_class: "legend",
        tooltip_name: function (d,this_object){
            name = d[this_object.unique_id] +':' + d[this_object.x_column] + ' ' + d[this_object.y_column];
            return name;
        },

        margin: {top: 80, right: 20, bottom: 30, left: 40}
    },

  eventTypes: [

     /* Event Names
        The parent class Biojs build the event handlers automatically
        with the names defined here. Use this.raiseEvent(<eventName>,
        <eventData>) for triggering an event from this component. Where,
        <eventName> is a string (defined in eventTypes) and <eventData> is
        an object which should be passed to the registered listeners.
        
        Define your event names following the syntax:
          “<eventName1>”,
          “<eventName2>”,
             :
             .
          “<eventNameN>”
      */


        /**
         * @name Biojs.PCAd3#interactionClick
         * @event
         * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {Object} interaction the information of the interaction that has been clicked.
         * @example 
         * instance.interactionClick(
         *    function( objEvent ) {
         *       alert("Click on the interaction " + objEvent.interaction.sample_id);
         *    }
         * ); 
         * 
         * */
        "interactionClick"
  ],

  /* Your own attributes  

     _<attrName1>: <defaultValueAttr1>,
     _<attrName2>: <defaultValueAttr2>,
        :
        .
     _<attrNameN>: <defaultValueAttrN>,

     Example:
     _PI: 3.1415, */

    _init: function() {


        this.target = this.opt.target;

        this.page_options = new Object();

        this.unique_id = this.opt.unique_id;
        this.x_column = this.opt.x_column;
        this.y_column = this.opt.y_column;

        this.tooltip_name = this.opt.tooltip_name;   
        this.tooltip_class = this.opt.tooltip_class;   


        if (this.opt.domain != undefined){
            this.page_options.domain = this.opt.domain;
            this.page_options.color = d3.scale.ordinal().domain(this.page_options.domain).range(this.opt.domain_colours);
        } else{
            this.page_options.color = d3.scale.category10();
        }

        this.title = this.opt.title;
        this.title_class = this.opt.title_class;
        this.x_axis_title = this.opt.x_axis_title;
        this.y_axis_title = this.opt.y_axis_title;
        this.page_options.shape = this.opt.shape;
        this.page_options.margin = this.opt.margin;
        this.page_options.width = this.opt.width - this.page_options.margin.left - this.page_options.margin.right;
        this.page_options.height = this.opt.height - this.page_options.margin.top - this.page_options.margin.bottom;
        this.data = this.opt.data;

        columns = new Array();
        for (var name in this.data[0]) {  if (this.data[0].hasOwnProperty(name)) {    columns.push(name);  }}
        this.columns = columns;


        this.point_class = this.opt.point_class; 
        this.legend_class = this.opt.legend_class; 

    },
  /* Your own ‘PUBLIC’ methods  
  
     <methodName1>: function (<argsMethod1>) {<codeOfMethod1>},
     <methodName2>: function (<argsMethod2>) {<codeOfMethod2>},
        :
        .
     <methodNameN>: function (<argsMethodN>) {<codeOfMethodN>}
 
     Example:
     square: function(number) { return number*number } 

     Your own ‘PROTECTED’ methods

    Javascript doesn’t provides visibility mechanism for class members. 
    Use character ‘_’ to identify the private members of your component. 
    For example: ‘_initialize’. 

    NOTE: use this.base(arguments) to invoke parent’s method if apply.

*/


    setup_graph: function (){

        var x = d3.scale.linear()
            .range([0, this.page_options.width]);

        var y = d3.scale.linear()
            .range([this.page_options.height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        $(this.target).html('');

        var svg = d3.select(this.target).append("svg")
            .attr("width", this.page_options.width + this.page_options.margin.left + this.page_options.margin.right)
            .attr("height", this.page_options.height + this.page_options.margin.top + this.page_options.margin.bottom)
          .append("g")
            .attr("transform", "translate(" + this.page_options.margin.left + "," + this.page_options.margin.top + ")");


        svg.append("text")
                .attr("x", (this.page_options.width / 2))             
                .attr("y", 0 - (this.page_options.margin.top / 2))
                .attr("text-anchor", "middle")  
                .text(this.title).attr("class",this.title_class);

        x_column = this.x_column;
        y_column = this.y_column;
        x.domain(d3.extent(this.data, function(d) { return d[x_column]; })).nice();
        y.domain(d3.extent(this.data, function(d) { return d[y_column]; })).nice();


        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.page_options.height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", this.page_options.width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text(this.x_axis_title);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(this.y_axis_title);

        this.x = x;
        this.y = y;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.svg = svg; 

    },

    setup_legend: function (){
      var legend = this.svg.selectAll("."+this.legend_class)
          .data(this.page_options.color.domain())
        .enter().append("g")
          .attr("class", this.legend_class)
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", this.page_options.width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", this.page_options.color);

      legend.append("text")
          .attr("x", this.page_options.width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

        this.legend = legend;
    },

    set_points: function (){

        var self = this;
        // https://github.com/mbostock/d3/wiki/SVG-Shapes
        // For circle (part of the append), cx,cy and r are used


        var tooltip = d3.select(self.target)
            .append("div")
            .attr("class", self.tooltip_class)
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden");

        self.svg.selectAll("."+self.point_class)
          .data(self.data)
        .enter().append("path")
          .attr("class", self.point_class)
          .attr("transform", function(d) { return "translate(" + self.x(d[x_column]) + "," + self.y(d[y_column]) + ")"; })
          .on("mouseover", function(d){tooltip.text(self.tooltip_name(d,self)); return  tooltip.style("visibility", "visible");})
          .on("mousemove", function(d){tooltip.text(self.tooltip_name(d,self)); return  tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          .on("click", function(d){self.raiseEvent('interactionClick', {interaction:d });})
          .on("mouseout", function(d){return tooltip.style("visibility", "hidden");})


        if (jQuery.inArray('size', self.columns) != -1 && jQuery.inArray('self.shape', self.columns) != -1){
            self.svg.selectAll("."+self.point_class)
              .attr("d", d3.svg.symbol().type(function (d) { return d.self.shape;}).size(function(d){ return d.size; }));
        }else if (jQuery.inArray('size', self.columns)!=-1 ){
            self.svg.selectAll("."+self.point_class)
              .attr("d", d3.svg.symbol().type(function (d) { return self.shape;}).size(function(d){ return d.size; }));
        } else if (jQuery.inArray('self.shape', self.columns) !=-1  ){
            self.svg.selectAll("."+self.point_class)
              .attr("d", d3.svg.symbol().type(function (d) { return d.self.shape;}));
        } else {
            self.svg.selectAll("."+self.point_class)
              .attr("d", d3.svg.symbol().type(function (d) { return self.shape;}));

        }


        if ($.inArray('color_type', this.columns)!= -1){
            this.svg.selectAll("."+self.point_class)
              .style("fill", function(d) { return self.page_options.color(d.color_type); });
        } else{
            this.svg.selectAll("."+self.point_class)
              .style("fill", function(d) { return self.page_options.color(d.type); });
        }
    }
});
