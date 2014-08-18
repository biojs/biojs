/**
*
* Human Genetic Variation component to display protein variations on an interactive map
*
* @class
* @extends Biojs
*
* @author <a href="mailto:saketkc@gmail.com">Saket Choudhary</a>
* @version 1.0.0_alpha
* @category 0
*
* @requires <a href="../biojs/css/Biojs.HGVViewer.css">HGVViewer CSS</a>
* @dependency <link href="../biojs/css/Biojs.HGVViewer.css" rel="stylesheet" type="text/css"></link>
* @requires <a href='http://d3js.org/queue.v1.min.js'>Queue.js</a>
* @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/queue.v1.min.js"></script>
* @requires <a href='http://d3js.org/d3.v3.min.js'>d3.js</a>
* @dependency <script language="JavaScript" type="text/javascript"
* src="../biojs/dependencies/d3.v3.min.js"></script>
*
*
* @param {Object} options An object with the options for this component.
*
* @option {string} accession
*    Accession number of the protein to be displayed
*
* @option {string} baseUrl
*   Base Url for fetching the JSON formatted variant data
*
* @option {integer} height
*   Height of the displaying SVG element
*
* @option {integer} width
*   Width of the displaying SVG element
*
* @option {string} target
*   Identifier of the DIV tag where the component should be displayed.
*
* @option {Object} availableScores
*   An Object containing the following information:
*       <pre class="brush: js" title="Syntax:">
*          {
*               'user defined key': 'name of the score column in the JSON response',
*                "MySIFTSCore" : "siftScore"
*
*          }
*       </pre>
*   where:
*           <ul>
*               <li><b>'user defined key'</b>: User defined annotation as displayed in the settings box </li>
*           </ul>
*
* @example
* var instance = new Biojs.HGVViewer({
*    target: "YourOwnDivId",
*    baseUrl: "http://wwwdev.ebi.ac.uk/uniprot/services/variant/",
*    accession: "J3KP33"
* });
*
*/
Biojs.HGVViewer = Biojs.extend(
/** @lends Biojs.HGVViewer# */
{
    constructor: function(){
        /**
         * Constructor, initilaises the data fetching and SVG creation
         **/
        var proteinID = location.href.split("?q=")[1];
        this._init(proteinID);
    },
    opt:{
        accession: null, //accession number of the protein to be fetched
        availableScores: {"SIFT": "siftScore", "Polyphen": "polyphenScore"},
        baseUrl: "http://wwwdev.ebi.ac.uk/uniprot/services/variant/", //Base Url
        height: 170, //SVG Height
        width: 800, //SVG Width
        target: "", //target div
    },
    /**
     * Margins to be set while drawing the ruler
     **/
    aaResidueMap: {"A":"Ala","R":"Arg","N":"Asn","D":"Asp","C":"Cys","E":"Glu","Q":"Gln","G":"Gly",
                    "H":"His","I":"Ile","L":"Leu","K":"Lys","M":"Met","F":"Phe","P":"Pro","S":"Ser",
                    "T":"Thr","W":"Trp","Y":"Tyr","V":"Val"}, //Map to expand short names of residues
    _activeScores: [], //An array containing the 'keys' from opt.availablescores indicating
                        //which scores are currently being used to display the variants
    _arrowRight: "\u25BA", //ASCII for right arrow
    _arrowDown: "\u25BC",  //ASCII for down arrow
    consequenceTypesList : [], //A list to store the 'unique' consequencetypes as reported from the API
    _crossIcon: "\u2716",   //ASCCII for cross icon
    _floatingPointPrecision: 3,//Maximum decimal places to show in the tooltip
    _individualViewSVG: {}, //Memory Object to store the svgs corresponding to each value in the consequenceTypesList
    _isArrowDown: false, //Memory variable to check if the arrow is down i.e the openview is 'open'
    _isRulerDrawn: false, //Memory variable to track if the ruler has already been drawn
    _isZoomActive: false, //Set to true of the current viewing mode is in Zoom mode
    _leftPanelText: "Variations", //Text for left Panel in the closed view
    _minimumZoomedHeight: 13, //Minimum height of the rectangles on zooming
    _mutationTypes: ["benign", "damaging", "mixed"], //NOTE: Classes exist with the same names as _mutationTypes,   so for new mutations, new classes should be defined in css as well
    rulerMargin:{
        left: 20,
        right: 50,
        top: 30,
        bottom: 30
    }, //Margins
    rulerStrokeWidth: 2, //Ruler Line Stroke Width
    _scoreRanges: {"benign":[-2,0.4], "mixed":[0.4,0.6], "damaging":[0.6, 2]}, /**Range values for each
                                                                                *consequence type,
                                                                                *the keys name set here are
                                                                                * used dynamically**/
    sequence: null,  //Sequence string of the fetched protein
    sequenceLength: null, //Sequence length of the protein
    _settingsIcon : "\u2699",
    _shouldInvertScores: ["siftScore"], //The scores which should be read as 1-score
    _tooltipMethod : "html", //"html"/"svg". html should be faster
    _tooltipWidth: 150, //Maximum width of tooltip
    _tooltipHeight: 90, //Maximum height of tooltip
    variantDataObject: {}, //Object for storing positions and scores of variants
    variantsJsonData: null, //JSON response from the API
    _widthPerMutation: 13, //Set width for the rectangle
    _zoomedViewExists: false, //Memory variable to track of zoomed view was already
    /**
     * Array containing the supported event names
     * @name Biojs.HGVViewer-eventTypes
     */
    eventTypes: [
    /**
     * @name Biojs.HGVViewer#onMouseOverVariant
     * @event
     * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
     * @eventData {Object} source The component which triggered the event.
     * @eventData {string} type The name of the event.
     * @eventData {Object} feature A json object with the information for the variant with mouse over.
     * @example
     * instance.onMouseOverVariant(
     *    function( obj ) {
             *    var tooltip = "Residue: " + obj.residue + ", Benign: " + obj.benign + ", Mixed: " + obj.mixed
             *    + ", Damaging: " + obj.damaging;
             *       alert("Mouse On feature: " + tooltip );
             *    }
     * );
     *
     **/
        "onMouseOverVariant",
    /**
     * @name Biojs.HGVViewer#onScoringFunctionChange
     * @event
     * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
     * @eventData {Object} source The component which triggered the event.
     * @eventData {string} type The name of the event.
     * @eventData {Object} feature A json object with the list of the currently selected scoring functions and the current variant data object.
     * @example
     * instance.onScoringFunctionChange(
     *    function( obj ) {
             *    var activeScores = obj.activeScores;
             *    var variantDataObject = obj.variantDataObject;
             *    alert("Selected Features: " + activeScores);
             *    alert("Variant Data Object: " + variantDataObject)
             *    }
     * );
     *
     * */
        "onScoringFunctionChange",
    ],
    /**
     * Method to perform scaling for number of pixels
     * each variant should take.
     * The minimum height is fixed by the varible
     *  _minimumZoomedHeight
     *
     * @return {Object} Object with keys ["minimumFrequency", "maximumFrequency", "availablePlottingHeight",
     *                                    "overviewScaleFactor", "oldRange", "newRange"]
     *
     * @example
     * instance.autoScaler();
     *
     *
     **/
    autoScaler: function() {
        var that = this;
        var startTime  = this._getTime();
        this._createVariantsDataAsArray();
        var endTime = this._getTime();
        Biojs.console.log("Data Array creation: " + String(endTime-startTime) + " ms");
        startTime  = this._getTime();
        this._createVariantInfoArray();
        endTime = this._getTime();
        Biojs.console.log("Variant Info Array creation: " + String(endTime-startTime) + " ms");
        var maxTotalVariants = this.getMaximumByType("total");
        Biojs.console.log("Max total variants: " + maxTotalVariants);
        this._availablePlottingHeight = this.opt.height - this.rulerMargin.top;
        this._scaleFactor = Math.floor(this._availablePlottingHeight/maxTotalVariants);
        /*Calculations for the zoomed view*/
        this.maximumFrequency = this.getMaximumByType("totalFrequency");
        this.minimumFrequency = this.getMinimumFrequency();
        Biojs.console.log("MIN freq: " + this.minimumFrequency);
        this.maximumZoomedHeight = this.opt.height - this.rulerMargin.top - 25;
        this.oldRange = this.maximumFrequency - this.minimumFrequency;
        Biojs.console.log("Max Freq: " + this.maximumFrequency);
        this.newRange = this.maximumZoomedHeight - this._minimumZoomedHeight;
        return {
                "minimumFrequency": this.minimumFrequency,
                "maximumFrequency": this.maximumFrequency,
                "availablePlottingHeight": this._availablePlottingHeight,
                "oldRange": this.oldRange,
                "newRange": this.newRange,
                "overviewScaleFactor": this._scaleFactor
                }
    },
    /**
     * Appends the sourceElementID to targetHolder
     *
     **/
    _cloneSVGContents: function(sourceElementID, targetHolder){
        var copySource = targetHolder.append("use")
                                    .attr("xlink:href", sourceElementID).attr("class", "clonedRuler");
    },
    /**
     * Method to convert the variant data object into an array containing only the values
     * and no keys
     *
     **/
    _createVariantsDataAsArray: function(){
        var that = this;
        this.variantDataArray = Object.keys( that.variantDataObject ).map(function ( key ) {
            return that.variantDataObject[key];
        });
    },
    /**
     * Method to create an array for storing variant specific data such as the mutation,
     * sift/poyophen scores
     *
     **/
    _createVariantInfoArray: function(){
        var that = this;
        this.variantInfo = that.variantDataArray.map(function(object) { return object.variantInfo; });
        this.variantInfoFrequency = [];
        //Extract the 'frequency' object from all variant sites
        //This will be a list of mutations at a particular site
        var variantInfoFrequency = this.variantInfo.map(function(object){
                var x =  object.map(function(o) {
                return o.frequency;});
                return x;
        });
        //For each site, put all the variants to an array
        //This 'unfolds' the lists of objects obtained in the previous step
        for (var i=0; i<variantInfoFrequency.length; i+=1){
            var x = variantInfoFrequency[i];
            for(var j=0; j<x.length; j+=1){
                this.variantInfoFrequency.push(x[j]);
            }
        }
    },
    /**
     * Returns the json response of the webservice
     *
     * @example
     * instance.getData();
     *
     **/
    getData: function(){
        /**
         * Method that makes a synchronous call to fetch the variants
         **/
        var that = this;
        this.sequenceUrl = this.opt.baseUrl + this.opt.accession + ".json";
        this._queue = queue(1);
        this._queue.defer(d3.json, this.sequenceUrl);
        this._queue.await(function(error, results) {
            if(error){
                d3.select("#message").text("Error" + error).style("background", "red");
                Biojs.console.log("Error fetching variants"+error);
                that.raiseEvent("onError", {
                                    "message": "Error fetching variants",
                                    "trace": error
                                });
                //TODO Pass this to a universal error processor;
            }
            else{
                d3.select("#message").style("visibility", "hidden");
                that.onReadComplete(results);
                return results;
            }
        });
    },
    /**
     * Returns return the maximum number(value) of the 'type'
     * in the variant data object
     *
     * @param {string} type Type of key
     *
     * @return {float} Maximum value
     *
     * @example
     * instance.getMaximumByType("totalFrequency");
     *
     **/
    getMaximumByType: function(type){
        var that = this;
        return Math.max.apply(Math, that.variantDataArray.map(function(object){return object[type];}));
    },
    /**
     * Returns the value of maximum frequency
     * for all variants across all mutations
     *
     * @return {float} Maximum frequency value
     *
     * @example
     * instance.getMaximumFrequency();
     **/
    getMaximumFrequency: function(){
        var that = this
        return Math.max.apply(Math, that.variantInfoFrequency)
    },
    /**
     * Returns the value of minimum frequency
     * for all variants across all mutations
     *
     * @return {float} Maximum frequency value
     *
     * @example
     * instance.getMinimumFrequency();
     **/
    getMinimumFrequency: function(){
        var that = this;
        return Math.min.apply(Math, that.variantInfoFrequency)
    },
    /**
     * Returns the three letter residue name
     *
     * @param {int} position Position of the residue in the sequence
     *
     * @return {string} Three letter residue name
     *
     * @example
     * instance.getResidueName(1);
     **/
    getResidueName: function(position){
        var oneLettername = this.sequence[position];
        return this.aaResidueMap[oneLettername];
    },
    /**
     * Method to return current 09:57
     * Used in general for profile testing
     **/
    _getTime: function(){
        var time = new Date().getTime();
        return time;
    },
    /**
     *  Initialiser invoked by constructor
     *  initates data parsing and SVG reation
     *  Data is synchronoulsy downloaded via d3.json
     *  SVG initialisation can happen only after, since we need the
     *  seqeunce length to init the ruler creation
     *
     **/
    _init: function(proteinID){
        var messageBox = d3.select("body").append("div").attr("id", "message").text("Loading...");
        var target = d3.select("#" + this.opt.target);
        var that = this;
        if(proteinID!=undefined){
            this.opt.accession = proteinID;
        }
        this.activeMutationTypes = this._mutationTypes.slice(0);
        this.activeMutationTypes.sort();
        this._arrowDownText = this._arrowDown + " " + this._leftPanelText + " " + this._settingsIcon;
        this._arrowRightText = this._arrowRight + " " + this._leftPanelText + " " + this._settingsIcon;
        this._leftPanelDiv = target.append("div")
                                    .attr("class", "leftPanel")
                                    .style("height", this.opt.height+"px");
        //Initially all scores are active
        this._activeScores = Object.keys(that.opt.availableScores);
        this._scoreKeys = this._activeScores.map(function(key) { return that.opt.availableScores[key] });
        Biojs.console.log("Active Scores: " + this._activeScores);
        d3.select(".leftPanel").append("span").append("span")
                                .attr("class", "leftPanelTitle");
        d3.select(".leftPanelTitle")
            .append("span")
            .attr("class", "icon arrow")
            .html(this._arrowRight)
            .on("click", function(){
                var isActive = d3.select(this).attr("class").split(" ")[2];
                if (isActive){
                    //When arrow is set to right
                    that._isArrowDown = false;
                    d3.select(".openview").style("visibility", "hidden");
                    if(that._isZoomActive){
                        d3.select("#mainSVGContents .zoomedGroup").style("display", "inline-block");
                        d3.select("#mainSVGContents .overviewGroup").style("display", "none");
                    }
                    else{
                        d3.select("#mainSVGContents .overviewGroup").style("display", "inline-block");
                        d3.select("#mainSVGContents .zoomedGroup").style("display", "none");
                    }
                    d3.select(this).html(that._arrowRight);
                    d3.select(this).classed("active", false);
                }
                else{
                    //When arrow is set to down
                    that._isArrowDown = true;
                    d3.selectAll(".openview").style("visibility", "visible");
                    d3.select("#mainSVGContents .zoomedGroup").style("display", "none");
                    d3.select("#mainSVGContents .overviewGroup").style("display", "none");
                    if(that._isZoomActive){
                        d3.selectAll(".variationview .zoomedGroup").style("display", "inline-block");
                    }
                    else{
                        d3.selectAll(".variationview .overviewGroup").style("display", "inline-block");
                    }
                    d3.select(this).html(that._arrowDown);
                    d3.select(this).classed("active", true);
                }
            });
        d3.select(".leftPanelTitle")
            .append("span")
            .attr("class", "icon textdesc")
            .html(this._leftPanelText);
        d3.select(".leftPanelTitle")
            .append("span")
            .attr("class", "icon gear")
            .html(this._settingsIcon)
            .on("click", function(){
                var isActive = d3.select(this).attr("class").split(" ")[2];
                if (isActive){
                    d3.select(this).classed("active", false);
                    d3.select(".leftPanelSettingsBody").classed("leftPanelActive", false)
                        .classed("leftPanelInactive", true)
                        .transition()
                        .duration(2000)
                        .style("visibility", "hidden");
                }
                else{
                    d3.select(this).classed("active", true);
                    d3.select(".leftPanelSettingsBody")
                        .classed("leftPanelActive", true)
                        .classed("leftPanelInactive", false)
                        .transition()
                        .duration(4000)
                        .style("visibility", "visible");
                }
            });
        d3.select(".leftPanel").append("div")
                                .attr("class", "leftPanelSettingsBody");
        d3.select(".leftPanel").append("div")
                                .attr("class", "leftPanelBody");
        d3.select(".leftPanelSettingsBody")
            .append("span")
            .html(this._crossIcon)
            .attr("class", "icon cross")
            .on("click", function(){
                d3.select(".icon.gear").classed("active", false);
                d3.select(".leftPanelSettingsBody")
                    .classed("leftPanelActive", false)
                    .classed("leftPanelInactive", true)
                    .transition().duration(2000)
                    .style("visibility", "hidden");
            });
        d3.select(".leftPanelSettingsBody")
            .selectAll("input")
            .data(Object.keys(that.opt.availableScores))
            .enter().append("label").attr("class", "label")
            .text(function(d) { return d; })
            .append("input")
            .attr("checked", true)
            .attr("type", "checkbox")
            .attr("id", function(d,i) { return d; })
            .on("click", function(){
                that._updateTypeOfScores(this, that);
            });
        d3.select(".leftPanelSettingsBody")
            .append("div")
            .attr("class", "separator")
            .append("div")
            .attr("class", "settingsPostSeparator")
            .selectAll("input")
            .data(Object.keys(that._scoreRanges))//["damaging", "benign", "mixed"])
            .enter().append("label").attr("class", "label")
            .text(function(d) { return d; })
            .append("input")
            .attr("checked", true)
            .attr("type", "checkbox")
            .attr("id", function(d,i) { return d; })
            .on("click", function(){
                that.updateClassOfMutationsVisible(this, that);
            });
        this._overViewDiv = target.append("div")
                                    .attr("class", "overview")
                                    .attr("width", this.opt.width)
                                    .attr("height", this.opt.height);
        this._initSVG();
        this.getData();
    },
    /**
     * Method to intialise the ruler line
     **/
    _initBaseLine: function(){
        var that = this;
        this._rulerScale = d3.scale
                                .linear()
                                .domain([1, this.sequenceLength+1])
                                .range([0, this.opt.width - this.rulerMargin.left]);
        this._ruler = this._overviewGroup
                            .append("g")
                            .append("line")
                            .attr({
                                "x1": this.rulerMargin.left,
                                "y1": this.opt.height,
                                "x2": this.opt.width,
                                "y2": this.opt.height,
                                "stroke-width": this.rulerStrokeWidth,
                                "stroke": "grey"
                            });
        this._xAxis = d3.svg.axis().scale(this._rulerScale);
        this._pixelperAA = this._rulerScale(2)-this._rulerScale(1);
    },
    /**
     * Method to intilaise SVG for overview
     **/
    _initSVG: function(){
        var that = this;
        this.zoomBehavior = d3.behavior.zoom().scaleExtent([1, 100]).on("zoom", that._zoomHandler);
        this.mainSVGContents = this._overViewDiv
                                .append("svg")
                                .attr("id", "overviewSVG")
                                .attr("width", this.opt.width)
                                .attr("height", this.opt.height)
                                .append("g").attr("id", "mainSVGContents");
        this._overviewGroup = this.mainSVGContents
                                    .append("g")
                                    .attr("class", "overviewGroup");
    },
    /**
     * Method to intilaise tooltips
     **/
    _initTooltip: function(){
        var target = d3.select("#" + this.opt.target);
        this._tooltipDiv = target.append("div")
                                    .attr({
                                        "width": this._tooltipWidth,
                                        "height": this._tooltipHeight,
                                        "class": "tooltip"
                                    });
        this._makeObjectTransparent(this._tooltipDiv);
        if (this._tooltipMethod == "svg"){
            this._tooltipDiv.append("svg")
                            .attr("width", this._tooltipWidth)
                            .attr("height", this._tooltipHeight)
                            .attr("id", "tooltipSVG");
            this._tooltipSVG = d3.select("#tooltipSVG")
                                    .append("g")
                                    .attr("class", "tooltipSVG")
                                    .style("opacity", 1e-6);
            this._tooltipSVG.append("rect")
                            .attr("width", this._tooltipWidth)
                            .attr("height", this._tooltipHeight)
                            .attr("x", 0)
                            .attr("y",0)
                            .attr("class", "tooltipSVGRect");
            this._tooltipDivText = this._tooltipSVG.append("text")
                                                    .attr("x", 0)
                                                    .attr("y", 0)
                                                    .attr("class", "tooltipText");
            this._tooltipDivResidue = this._tooltipDivText.append("tspan")
                                                            .attr("x", 0)
                                                            .attr("y", 15);
            this._tooltipDivTotal = this._tooltipDivText.append("tspan")
                                                        .attr("x", 0)
                                                        .attr("y", 30);
            this._tooltipDivStatic = this._tooltipDivText.append("tspan")
                                                            .attr("x", 0)
                                                            .attr("y", 45)
                                                            .text("Predicted Variant Effect");
            this._tooltipDivBenign = this._tooltipDivText.append("tspan")
                                                            .attr("x", 0)
                                                            .attr("y", 60);
            this._tooltipDivDamaging = this._tooltipDivText.append("tspan")
                                                            .attr("x", 0)
                                                            .attr("y", 75);
            this._tooltipDivMixed = this._tooltipDivText.append("tspan")
                                                                .attr("x", 0)
                                                                .attr("y", 90);
        }
    },
    /**
     * Method to initiate Zoom panel
     * and zoom button actions
     **/
    _initZoomPanel: function(){
        var that = this;
        var zoomPanel = d3.select(".leftPanelBody")
            .append("div")
            .attr("id", "zoomPanel");
        zoomPanel
            .append("div")
            .attr("id", "sliderPanel")
            .html(
                "<input type='range' id='slider' name='zoomPosition' value='1' min='1' max='"
                + this.sequenceLength +"'>"
            );
        d3.select("#sliderPanel")
            .append("div")
            .attr("class", "rangeValueDiv")
            .append("div")
            .attr("id", "positionText")
            .html("1");
        d3.select("#slider")
            .on("change", function(){
                var value = this.value;
                d3.select("#positionText").html(value);
                if (that._isZoomActive == true){
                    that.plotZoomedOverview(value);
                }
            });
        zoomPanel
            .append("div")
            .attr("id", "zoomButtonDiv")
            .html("<input type='button' id='zoomToggle' value='Zoom In'>");
        d3.select("#zoomToggle").on("click", function(){
            var name = this.value;
            if (name=="Zoom In" ){
                d3.select("#sliderPanel").style("visibility", "visible");
                this.value = "Zoom Out";
                that._isZoomActive = true;
                var sliderPosition = d3.select("#positionText").html();
                that.plotZoomedOverview(sliderPosition);
                that.plotZoomedIndividualView();
                if(that._isArrowDown){
                    //Hide Overview
                    d3.select("#mainSVGContents .overviewGroup").style("display", "none");
                    d3.select("#mainSVGContents .zoomedGroup").style("display", "none");
                    //Show Zoomed Group for Individual view
                    d3.selectAll(".variationview .zoomedGroup").style("display", "inline-block");
                    d3.selectAll(".variationview .overviewGroup").style("display", "none");
                }
                else{
                    //hide openview
                    d3.selectAll(".variationview .zoomedGroup").style("display", "none");
                    d3.selectAll(".variationview .overviewGroup").style("display", "none");
                    //show overview zoomed
                    d3.select("#mainSVGContents .overviewGroup").style("display", "none");
                    d3.select("#mainSVGContents .zoomedGroup").style("display", "inline-block");
                }
                that._zoomedViewExists = true;
            }
            else {
                d3.select("#sliderPanel").style("visibility", "hidden");
                this.value="Zoom In";
                that._isZoomActive = false;
                that.plotOverview();
                if(that._isArrowDown){
                    //Hide Overview
                    d3.select("#mainSVGContents .overviewGroup").style("display", "none");
                    d3.select("#mainSVGContents .zoomedGroup").style("display", "none");
                    //Show Zoomed Group for Individual view
                    d3.selectAll(".variationview .zoomedGroup").style("display", "none");
                    d3.selectAll(".variationview .overviewGroup").style("display", "inline-block");
                }
                else{
                    //hide openview
                    d3.selectAll(".variationview .zoomedGroup").style("display", "none");
                    d3.selectAll(".variationview .overviewGroup").style("display", "none");
                    //show overview zoomed
                    d3.select("#mainSVGContents .overviewGroup").style("display", "inline-block");
                    d3.select("#mainSVGContents .zoomedGroup").style("display", "none");
                }
            }
        });
    },
    /** Method to return if a number lies between the
     * other two numbers
     *
     * @param {float} number Nummber
     * @param {float} min Lower Cap
     * @param {float} max Upper Cap
     *
     * @example
     * instance.isBetween(4,1.3,6);
     **/
    isBetween: function(number, min, max){
        return number>=min && number<max;
    },
    /**
     * Method to make an input object opaque
     **/
    _makeObjectOpaque: function(object){
        object.style("opacity", 1);
    },
    /**
     * Method to make an input object transparent
     **/
    _makeObjectTransparent: function(object){
        //Should assert if the object has a style element
        object.style("opacity", 1e-6);
    },
    _mouseMoveEvent: function(d){
        if(this._tooltipMethod == "html"){
            this._tooltipDiv.style("left", ( d3.event.pageX + 5 ) + "px")
                           .style("top", ( d3.event.pageY + 5 ) + "px");
        }
        else{
            this._tooltipSVG.style("left", ( d3.event.pageX + 5  ) + "px")
                           .style("top", ( d3.event.pageY + 5 ) + "px");
        }
    },
    /**
     * Method invoked when hovering out from a bar
     * of the overview plot
     *
     **/
    _mouseOutEvent: function(d){
        if (this._tooltipMethod == "html"){
            this._makeObjectTransparent(this._tooltipDiv);
        }
        else if(this._tooltipMethod == "svg"){
            this._makeObjectTransparent(this._tooltipSVG);
        }
        this.raiseEvent( "onMouseLeaveVariant" ,{
                            "residue": d.residue,
                            "total": d.total,
                            "position": d.position,
                            "damaging": d.damaging,
                            "benign": d.benign,
                            "mixed": d.mixed
        });
    },
    /**
     * Method invoked when hovering over a bar
     * of the overview plot
     *
     **/
    _mouseOverEvent: function(d, _isZoomActive){
        var that = this;
        if(this._tooltipMethod == "html"){
            this._makeObjectOpaque(this._tooltipDiv);
           //var SVGtooltip = this._getMaximumTotalVariants()_tooltipDiv;
           //var mouseCoords = d3.mouse(SVGtooltip[0][0].parentElement);
            var html = "";
            if (_isZoomActive == true){
                var keys = ["residue", "mutation", "frequency", "prediction",  "activeScore", "consequenceTypes"];
                keys = keys.concat(that._scoreKeys);
                keys.map(function(key){
                    if(d.hasOwnProperty(key)){
                        html += "<span class='tooltipText'>" + key + ": " + d[key] + "</span>";
                    }
                });
            }
            else {
                var keys = ["residue", "total", "activeScore"];
                keys = keys.concat(that._mutationTypes);
                keys.map(function(key){
                    if(d.hasOwnProperty(key)){
                        html += "<span class='tooltipText'>" + key + ": " + d[key] + "</span>";
                        if (key == "residue") {
                            html += "<span class='tooltipText'>Predicted Variant Effect</span>";
                        }
                    }
                });
            }
            this._tooltipDiv.html(html);
        }
        else {
            this._makeObjectOpaque(this._tooltipSVG);
            this._tooltipDivResidue.text("Residue: " + d.residue);
            this._tooltipDivTotal.text("Total Variants: " + d.total);
            this._tooltipDivBenign.text("Benign: " + d.benign);
            this._tooltipDivDamaging.text("Damaging: " + d.damaging);
            this._tooltipDivMixed.text("Mixed: " + d.mixed);
            this._tooltipDiv.style("left", (d3.event.pageX ) + "px")
                            .style("top", (d3.event.pageY ) + "px");
            this._makeObjectOpaque(this._tooltipDiv);
            this._tooltipSVG.style("opacity", 1);
        }
        this.raiseEvent( "onMouseOverVariant" ,{
                            "residue": d.residue,
                            "total": d.total,
                            "position": d.position,
                            "damaging": d.damaging,
                            "benign": d.benign,
                            "mixed": d.mixed
        });
    },
    /**
     * Method called after data reading is complete
     *
     * @param {Object} results JSON  Object from webservice
     *
     * @example
     * instance.onReadComplete({});
     **/
    onReadComplete: function(results){
        this.sequence = results.sequence;
        this.variantsJsonData = results;
        var length = this.sequence.length;
        this.setSequenceLength(length);
        this._initTooltip();
        this._initBaseLine();
        this.variantParser();
        this.autoScaler();
        this._initZoomPanel();
        this.plotOverview();
        this.plotIndividualView();
        d3.select("#mainSVGContents .overviewGroup").style("display", "inline-block");
    },
    /**
     * Method to plot the indiviaul SVGs based on the consequencetypes
     * @param {bool} update: Should the plots be updated
     *
     * @example
     * instance.plotIndividualView(false);
     *
    **/
    plotIndividualView: function(update){
        var that = this;
        if (!update){
            this.individualViewSVG = {};
            this.individualViewRuler = {};
            this.individualViewOverviewSVG = {}
            this.individualViewZoomedSVG = {};
            var target = d3.select("#" + that.opt.target)
                            .append("div")
                            .attr("class", "openview");
            this.consequenceTypesList.map(function(item){
                variationDiv = target.append("div")
                                        .attr("class", item)
                                        .classed("variationview", true)
                                        .attr("width", 800)
                                        .attr("height", 100);
                d3.select("."+item)
                    .append("div")
                    .attr("class", "leftPanel").style("height", that.opt.height+"px");
                var leftPanel = d3.select("." + item + " .leftPanel")
                    .append("div")
                    .attr("class", "leftPanelTitle");
                var columnName = item.replace(/_/g, " ");
                d3.select("." + item  + " .leftPanelTitle")
                    .append("span")
                    .attr("class", "icon textdesc").html(columnName);
                leftPanel.append("div").attr("class", "leftPanelBody");
                that.individualViewSVG[item] = variationDiv.append("div")
                                                            .attr("class", "overview")
                                                            .append("svg")
                                                            .attr("width", that.opt.width)
                                                            .attr("height", that.opt.height)
                                                            .attr("class", "individualSVG")
                                                            .attr("id", item);
                that.individualViewOverviewSVG[item] = that.individualViewSVG[item]
                                                            .append("g").attr("class", "overviewGroup");
                that.individualViewZoomedSVG[item] = that.individualViewSVG[item]
                                                            .append("g").attr("class", "zoomedGroup");
                that.individualViewRuler[item] = that.individualViewOverviewSVG[item]
                                                        .append("g")
                                                        .append("line")
                                                        .attr({
                                                           "x1": that.rulerMargin.left,
                                                           "y1": that.opt.height,
                                                           "x2": that.opt.width,
                                                           "y2": that.opt.height,
                                                           "stroke-width": that.rulerStrokeWidth,
                                                           "stroke": "grey"
                                                        });
            });
        }
        else{
            Biojs.console.log("removed")
        }
        var that = this;
        for (position in this.variantDataObject){
            var aaData = that.variantDataObject[position];
            var typeOfMutation = that.activeMutationTypes;
            var consequences = that.consequenceTypesList;
            consequences.map(function(item){
                var svg = that.individualViewOverviewSVG[item];
                if(aaData[item]){
                    var shift = 0;
                    typeOfMutation.map(function(mutation){
                        shift += that._scaleFactor * aaData[mutation];
                        if (aaData[mutation]>0){
                            svg.append("rect")
                                .attr("class", mutation + " openmutation")
                                .attr("x", that.rulerMargin.left + that._rulerScale( parseInt(position)))
                                .attr("y", that.opt.height - shift - that.rulerStrokeWidth/2)
                                .attr("width", that._pixelperAA)
                                .attr("height", that._scaleFactor*aaData[mutation])
                                .datum(aaData)
                                .on("mouseover", function(d){
                                    that._mouseOverEvent(d);
                                })
                                .on("mousemove", function(d){
                                    that._mouseMoveEvent(d);
                                })
                                .on("mouseout", function(d){
                                    that._mouseOutEvent(d);
                                });
                        }
                    });
                }
            });
        }
    },
    /**
     * Method to plot the overview(topmost svg)
     *
     *
     * @example
     * instance.plotOverview();
     *
    **/
    plotOverview: function(){
        if(this._zoomedViewExists){
            d3.selectAll("svg").attr("width", this.opt.width);
            d3.select("#mainSVGContents .overviewGroup").style("display", "inline-block");
            return 0;
        }
        var that = this;
        var typeOfMutation = this.activeMutationTypes;
        this._mutationTypes.map(function(mutation){
            d3.selectAll("."+mutation).remove();
        });
        for (position in this.variantDataObject){
            var aaData = this.variantDataObject[position];
            var shift = 0;
            typeOfMutation.map(function(mutation){
                shift += that._scaleFactor * aaData[mutation];
                if (aaData[mutation]!=undefined){
                    that._overviewGroup
                        .append("rect")
                        .attr("class", mutation)
                        .attr("x", that.rulerMargin.left + that._rulerScale( parseInt(position)))
                        .attr("y", that.opt.height - shift - that.rulerStrokeWidth/2)
                        .attr("width", that._pixelperAA)
                        .attr("height", that._scaleFactor*aaData[mutation])
                        .datum(aaData)
                        .on("mouseover", function(d){
                            that._mouseOverEvent(d);
                        })
                        .on("mouseout", function(d){
                            that._mouseOutEvent(d);
                        })
                        .on("mousemove", function(d){
                            that._mouseMoveEvent(d);
                        });
                }
           });
        }
    },
    /**
     * Method to plot the zoomed view for Individal consequence types
     *
     *
     * @example
     * instance.plotZoomedIndividualView();
     *
    **/
    plotZoomedIndividualView: function(){
        var that = this;
        var consequences = that.consequenceTypesList;
        consequences.map(function(consequence){
            var svg = that.individualViewZoomedSVG[consequence];
            var svgtemp = null;
            that._cloneSVGContents("#overviewZoomedRuler", svg);
            that.variantsPlotProcessor(svg, consequence);
        });
    },
    /**
     * Method to plot the zoomed view for Individal consequence types
     *
     *
     * @example
     * instance.plotZoomedIndividualView();
     *
    **/
    plotZoomedOverview: function(position){
        var that = this;
        var variantInfo = null;
        var heightPerMutation = this._minimumZoomedHeight;
        if(this._isArrowDown){
            d3.select(".openview").style("visibility", "visible");
        }
        else{
            d3.select(".openview").style("visibility", "hidden");
        }
        if(this._zoomedViewExists){
            var width = (this.sequenceLength+2)*that._widthPerMutation;
            if(position>0){
                d3.selectAll(".zoomedGroup")
                    .attr("transform", "translate("+ -1*that._widthPerMutation*(position) +",0)");
            }
            d3.select("#overviewSVG").attr("width", width);
            if(that._isArrowDown){
                d3.selectAll(".individualview .zoomedGroup").style("display", "inline-block");
            }
            Biojs.console.log("redrawn");
            return 0;
        }
        else{
            this._zoomedViewExists = true;
        }
        d3.select("#overviewSVG")
            .attr("width", this.sequenceLength*this._widthPerMutation);
        this._zoomedView = d3.select("#mainSVGContents")
                                .append("g")
                                .attr("class", "zoomedGroup");
        startTime = this._getTime();
        this.plotZoomedRulerLine(this._zoomedView, true);
        var svg = that._zoomedView.append("g").attr("class", "zoomedVariants");
        that.variantsPlotProcessor(svg);
        if(position>0){
            d3.selectAll(".zoomedGroup")
                .attr("transform", "translate("+ -1*that._widthPerMutation*(position) +",0)");
        }
        endTime = this._getTime();
        Biojs.console.log("SVG drawing: " + String(endTime-startTime) + "ms");
    },
    /**
     * Method to plot the zoomed ruler line
     *
     *
     * @example
     * instance.plotZoomedRulerLine();
     *
    **/
    plotZoomedRulerLine: function(holder, isOverview){
        var svg = holder.append("g").attr("class", "zoomedRuler");
        if(isOverview){
            svg.attr("id", "overviewZoomedRuler");
        }
         for(var i=1 ; i<this.sequenceLength+1; i+=1){
            var variant = {"position":i};
            svg.append("rect")
                .attr("x", this.rulerMargin.left + (i)*this._widthPerMutation)
                .attr("y", this.opt.height - this._minimumZoomedHeight - this.rulerStrokeWidth/2)
                .attr("width", this._widthPerMutation)
                .attr("height", this._minimumZoomedHeight)
                .style("fill", "white")
                .style("stroke-width", "0")
                .style("stroke", "black")
                .datum(variant)
                .on("mouseover", function(d){
                    Biojs.console.log("position: " + d.position);
                })
                .on("mousemove", function(d){
                    Biojs.console.log("position: " + d.position);
                });
            svg.append("text")
                .attr("x", this.rulerMargin.left + 2.5 + (i)*this._widthPerMutation)
                .attr("y", this.opt.height  - this.rulerStrokeWidth/2)
                .text(this.sequence[i-1]);
            }
    },
    /**
     * Method to plot the zoomed variants
     *
     **/
    _plotZoomedVariants: function(svg, item, shift, textShift, heightMutation, xIndex){
        var that = this;
        var prediction = item["prediction"];
        var mutation = item["mutation"];
        item.residue = this.getResidueName(xIndex-1) + " - " + xIndex;
        svg.append("rect")
            .attr("class", prediction)
            .attr("x", that.rulerMargin.left + xIndex*that._widthPerMutation)
            .attr("y", that.opt.height - shift - that.rulerStrokeWidth/2)
            .attr("width", that._widthPerMutation)
            .attr("height", heightMutation)
            .style("stroke-width", "1")
            .style("stroke", "black")
            .datum(item)
            .on("mouseover", function(d){
                that._mouseOverEvent(d, true);
            })
            .on("mouseout", function(d){
                that._mouseOutEvent(d);
            })
            .on("mousemove", function(d){
                that._mouseMoveEvent(d);
            });
    var textAdjustment = 0;
    if (heightMutation>that._minimumZoomedHeight){
        textAdjustment = (heightMutation-13)/2.0;
    }
    svg.append("text")
        .attr("class", "zoomedText")
        .attr("x", that.rulerMargin.left + that._widthPerMutation/2.0 + xIndex*that._widthPerMutation)
        .attr("y", that.opt.height - textShift - textAdjustment - 2.5 - that.rulerStrokeWidth/2)
        .attr("width", that._widthPerMutation)
        .attr("height", heightMutation)
        .text(mutation)
        .datum(item)
            .on("mouseover", function(d){
                that._mouseOverEvent(d, true);
            })
            .on("mouseout", function(d){
                that._mouseOutEvent(d);
            })
            .on("mousemove", function(d){
                that._mouseMoveEvent(d);
            });;
    },
     /**
      * Method to set the sequence length
      *
      **/
    setSequenceLength: function(length){
        this.sequenceLength = parseInt(length);
    },
    /**
     * Method called on change of activeScores, reddraws
     * the stacked bar plots with the new set of activeScores
     **/
    updateClassOfMutationsVisible: function(obj){
        var that = this;
        var isChecked = obj.checked;
        var id = obj.id;
        if(isChecked){
            this.activeMutationTypes.push(id);
        }
        else{
            //Remove it from active scores
            this.activeMutationTypes.splice(this.activeMutationTypes.indexOf(id), 1);
        }
        this.activeMutationTypes.sort();
        Biojs.console.log("Active types: " + this.activeMutationTypes)
        if (this._isZoomActive){
            this._mutationTypes.map(function(mutation){
                d3.selectAll("."+mutation).remove();
            });
            this._zoomedViewExists = false;
            d3.selectAll(".zoomedGroup").remove();
            var sliderPosition = d3.select("#positionText").html();
            this.plotZoomedOverview(sliderPosition);
            this.plotZoomedIndividualView();
        }
        else{
            //d3.selectAll(".overviewGroup").remove();
            this.plotOverview();
            this.plotIndividualView(true);
        }
    },
    /**
     * Method called on change of activeScores, reddraws
     * the stacked bar plots with the new set of activeScores
     **/
    _updateTypeOfScores: function(obj){
        var that = this;
        var isChecked = obj.checked;
        var id = obj.id;
        if(isChecked){
            this._activeScores.push(id);
        }
        else{
            //Remove it from active scores
            this._activeScores.splice(this._activeScores.indexOf(id), 1);
        }
        this.variantDataObject = [];
        this.variantParser();
        this.autoScaler();
        this.raiseEvent("onScoringFunctionChange",{
            "activeScores": that._activeScores,
            "variantMatrix": that.variantDataObject
        });
        if (this._isZoomActive){
            this._zoomedViewExists = false;
            this.plotZoomedOverview();
            this.plotZoomedIndividualView();
        }
        else{
            this.plotOverview();
            this.plotIndividualView(true);
        }
    },
    /**
     * Method to parse the JSON output
     *
     **/
    variantParser: function(){
        //TODO Better way to handle this??
        var variants = this.variantsJsonData["variants"];
        var that = this;
        var activeScores = this._activeScores.map(function(x){ return that.opt.availableScores[x]});
        if (activeScores.length==0){
            return 0;
        }
        for (d in variants){
            var position = variants[d].position;
            var frequency = + variants[d].frequency;
            var consequenceTypes = variants[d].consequenceTypes.split(",");
            consequenceTypes = consequenceTypes.map(function(consequence){
                return consequence.replace(" ", "_");
            });
            /*Remove spaces and hence read only the first part, capitalising the first word */
            //var consequenceType = (variants[d].consequenceTypes.split(" ")[0]).capitalize();
            var averageScore = 0;
            var score = 0;
            var prediction = null;
            for (s in activeScores){
                score = +variants[d][activeScores[s]];
                if (that._shouldInvertScores.indexOf(activeScores[s])!=-1){
                    score = 1-score;
                }
                averageScore += score;
            }
            averageScore = averageScore/activeScores.length;
            averageScore = +averageScore.toFixed(that._floatingPointPrecision); //Use at max three decimal places
            //Increase counter if the variant position already exists
            if (position in this.variantDataObject){
                this.variantDataObject[position]["total"] += 1;
                this.variantDataObject[position]["totalFrequency"] += frequency;
            }
            //Else create an empty object
            else {
                this.variantDataObject[position] = {
                                                    "total": 1,
                                                    "totalFrequency": frequency,
                                                    "residue": that.getResidueName(position) + " - " + position,
                                                    "variantInfo": []
                                                    };
                that._mutationTypes.map(function(mutationType){
                    var key = mutationType + "TypeVariantsList";
                    that.variantDataObject[position][mutationType] = 0; //damaging, benign, mixed set to 0
                    that.variantDataObject[position][key] = []; //list containing the type of info
                });
            }
            for (key in that._scoreRanges){
                var range = that._scoreRanges[key];
                if (that.isBetween(averageScore, range[0], range[1])){
                    this.variantDataObject[position][key] += 1;
                    prediction = key;
                    break;
                }
            }
            if (prediction == null){
                    Biojs.console.log("ERROR!: prediction null, check: " + position + ", with score:  "  + averageScore + " key " + range  );
            }
            var variantInfo = {};
            variantInfo["activeScore"] = averageScore;
            var temp = Object.keys(that.opt.availableScores)
                                        .map(function (key) {
                                                var value =  that.opt.availableScores[key];
                                                variantInfo[value] =  variants[d][value];
                                        });
            variantInfo["mutation"] = variants[d].mutation;
            variantInfo["frequency"] = +variants[d].frequency;
            variantInfo["prediction"] = prediction;
            variantInfo["consequenceTypes"] = consequenceTypes;
            var predictionKey = prediction + "TypeVariantsList";
            this.variantDataObject[position]["variantInfo"]
                .push(variantInfo);
            this.variantDataObject[position][predictionKey].push(variantInfo);
            consequenceTypes.map(function(consequenceType){
                if (that.consequenceTypesList.indexOf(consequenceType) == -1 && consequenceType != "-"){
                    that.consequenceTypesList.push(consequenceType);
                }
                if(!that.variantDataObject[position].hasOwnProperty(consequenceType)){
                    that.variantDataObject[position][consequenceType] = 0;// [];
                }
                that.variantDataObject[position][consequenceType] += 1;
            });
        }
    },
    variantsPlotProcessor: function(svg, consequence){
        var that = this;
        var widthPerMutation = this._widthPerMutation;
        var heightPerMutation = this._minimumZoomedHeight;
        for(var position in this.variantDataObject){
            var shift = heightPerMutation;
            var textShift = heightPerMutation;
            var typeOfMutation = that.activeMutationTypes;
            var variant = that.variantDataObject[position];
            svgtemp = svg.append("g");
            typeOfMutation.map(function(mutation){
                var predictionKey = mutation + "TypeVariantsList";
                var variantsList = that.variantDataObject[position][predictionKey];
                variantsList.map(function(variantObject){
                    var frequency = variantObject["frequency"];
                    var consequenceTypes = variantObject["consequenceTypes"];
                    var shouldPlot = true;
                    if (consequence!=undefined && consequenceTypes.indexOf(consequence)==-1){
                        shouldPlot = false;
                    }
                    if(shouldPlot){
                        var heightMutation = ((frequency - that.minimumFrequency)*that.newRange/that.oldRange)
                        + that._minimumZoomedHeight;
                        shift +=  heightMutation;
                        var tempsvg = svg.append("g");
                        variantObject.shift = shift;
                        variantObject.heightMutation = heightMutation;
                        that._plotZoomedVariants(tempsvg, variantObject, shift, textShift, heightMutation, position);
                        textShift = textShift + heightMutation;
                    }
                });
            });
        };
    }
});
