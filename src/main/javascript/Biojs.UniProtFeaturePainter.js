

/*
 * Add a tooltip (from http://www.strathausen.eu/en/2010/04/25/raphael-svg-tooltip/)
 * Done by using EXTJS
 */

var Biojs_UniProtFeaturePainter_myself = undefined;

/**
 *
 * UniprotFeaturePainter component
 *
 * @class
 * @extends Biojs
 *
 * @requires <a href='http://code.jquery.com/jquery-1.6.2.min.js/'>jQuery Core 1.6.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 *
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.js'>jQuery.tooltip</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.tooltip.js"></script>
 * 
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.css'>jQuery.tooltip CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery.tooltip.css"/>
 *
 * @requires <a href='https://github.com/brandonaaron/bgiframe/blob/master/jquery.bgiframe.js'>jQuery.bgiframe</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.bgiframe.js"></script>
 *
 * @requires <a href='http://code.google.com/p/jqueryjs/source/browse/trunk/plugins/delegate/jquery.delegate.js?r=4374'>jQuery.delegate</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.delegate.js"></script>
 *
 * @requires <a href='http://code.google.com/p/kaytwo/source/browse/tags/1.0.3/js/jquery.dimensions.js?r=1066'>jQuery.dimensions</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.dimensions.min.js"></script>
 *
 * @requires <a href='https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/jquery.url.js'>jQuery.url</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.url.js"></script>
 *
 * @requires <a href='http://github.com/DmitryBaranovskiy/raphael/raw/master/raphael-min.js'>raphael</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael.js"></script>
 *
 * @requires <a href='http://code.google.com/p/canvg/source/browse/trunk/canvg.js'>canvg</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/canvg.js"></script>
 *
 * @requires <a href='http://code.google.com/p/canvg/source/browse/trunk/rgbcolor.js'>rgbcolor</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/rgbcolor.js"></script>
 * 
 * @requires jQuery UI 1.8.2
 * @dependency <script src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
 * 
 * @requires jQuery UI CSS 1.8.2
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 * 
 * @author <a href="mailto:ljgarcia@ebi.ac.uk">Leyla Jael García Castro</a>
 *
 * @param {Object} options An object with the options for Sequence component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} json
 *    The json object describing the configuration, features, and legend to be displayed.
 *
 * @option {boolean} [showSlider=true]
 *    Should the slider for zooming be displayed?
 *
 * @option {boolean} [showPrintButton=true]
 *    Should the button for printing/exporting to image be displayed?
 *
 * @option {boolean} [showFeaturesTooltip=true]
 *    Should the tooltip for features be displayed?
 *
 * @option {boolean} [highlightFeatures=true]
 *    Should the features be highlighted when mouse on?
 *
 * @option {boolean} [dragSites=true]
 *    Should the sites be draggable?
 *
 * @option {String}
 *    Web service that creates image files for annotation features as those described in the json option
 *    Note: We recommend to use the same Web service that was used to generate the json file if any.
 *
 * @example
 * var jsonObject = {
 *      "featuresArray":[
 *          {"nonOverlappingStyle":{"heightOrRadius":10,"y":90},"type":"rect","featureEnd":336,"fillOpacity":0.5,
 *          "evidenceText":"InterPro","stroke":"#033158","height":10,"path":"","typeLabel":"Domain",
 *          "featureLabel":"HAD-like domain","featureStart":64,"strokeWidth":1,"text":"",
 *          "centeredStyle":{"heightOrRadius":8,"y":80},"fill":"#033158","width":486,
 *          "typeCategory":"inferred from InterPro motif similarity (ECO:0000029)",
 *          "typeCode":"SO:0000417","cy":90,"cx":134,"evidenceCode":"HAD-like domain","r":10,
 *          "featureId":"IPR023214_64_336","rowsStyle":{"heightOrRadius":10,"y":125},
 *          "featureTypeLabel":"polypeptide_domain","y":90,"x":134},
 *          {"nonOverlappingStyle":{"heightOrRadius":5,"y":45},"type":"circle","featureEnd":90,"fillOpacity":0.5,"evidenceText":"UniProt","stroke":"#FF6666","height":5,"path":"","typeLabel":"Metal binding","featureLabel":"Magnesium; via carbonyl oxygen","featureStart":90,"strokeWidth":1,"text":"","centeredStyle":{"heightOrRadius":5,"y":135},"fill":"#FF6666","width":0,"typeCategory":"Site","typeCode":"SO:0001092","cy":45,"cx":181,"evidenceCode":"","r":5,"featureId":"UNIPROTKB_Q9H0P0_METAL_90_90","rowsStyle":{"heightOrRadius":5,"y":40},"featureTypeLabel":"metal_contact","y":45,"x":181},
 *          {"nonOverlappingStyle":{"heightOrRadius":5,"y":55},"type":"circle","featureEnd":88,"fillOpacity":0.5,"evidenceText":"UniProt","stroke":"#FF6666","height":5,"path":"","typeLabel":"Metal binding","featureLabel":"Magnesium","featureStart":88,"strokeWidth":1,"text":"","centeredStyle":{"heightOrRadius":5,"y":125},"fill":"#FF6666","width":0,"typeCategory":"Site","typeCode":"SO:0001092","cy":55,"cx":177,"evidenceCode":"","r":5,"featureId":"UNIPROTKB_Q9H0P0_METAL_88_88","rowsStyle":{"heightOrRadius":5,"y":40},"featureTypeLabel":"metal_contact","y":55,"x":177},
 *          {"nonOverlappingStyle":{"heightOrRadius":5,"y":60},"type":"diamond","featureEnd":90,"fillOpacity":0.5,"evidenceText":"UniProt","stroke":"#760000","height":5,"path":"","typeLabel":"Active site","featureLabel":"Proton donor","featureStart":90,"strokeWidth":1,"text":"","centeredStyle":{"heightOrRadius":5,"y":110},"fill":"#760000","width":0,"typeCategory":"Site","typeCode":"SO:0001104","cy":60,"cx":181,"evidenceCode":"","r":5,"featureId":"UNIPROTKB_Q9H0P0_ACT_SITE_90_90","rowsStyle":{"heightOrRadius":5,"y":45},"featureTypeLabel":"catalytic_residue","y":60,"x":181},
 *          {"nonOverlappingStyle":{"heightOrRadius":5,"y":65},"type":"circle","featureEnd":277,"fillOpacity":0.5,"evidenceText":"UniProt","stroke":"#FF6666","height":5,"path":"","typeLabel":"Metal binding","featureLabel":"Magnesium","featureStart":277,"strokeWidth":1,"text":"","centeredStyle":{"heightOrRadius":5,"y":115},"fill":"#FF6666","width":0,"typeCategory":"Site","typeCode":"SO:0001092","cy":65,"cx":515,"evidenceCode":"","r":5,"featureId":"UNIPROTKB_Q9H0P0_METAL_277_277","rowsStyle":{"heightOrRadius":5,"y":40},"featureTypeLabel":"metal_contact","y":65,"x":515},
 *          {"nonOverlappingStyle":{"heightOrRadius":5,"y":70},"type":"diamond","featureEnd":88,"fillOpacity":0.5,"evidenceText":"UniProt","stroke":"#760000","height":5,"path":"","typeLabel":"Active site","featureLabel":"Nucleophile","featureStart":88,"strokeWidth":1,"text":"","centeredStyle":{"heightOrRadius":5,"y":100},"fill":"#760000","width":0,"typeCategory":"Site","typeCode":"SO:0001104","cy":70,"cx":177,"evidenceCode":"","r":5,"featureId":"UNIPROTKB_Q9H0P0_ACT_SITE_88_88","rowsStyle":{"heightOrRadius":5,"y":45},"featureTypeLabel":"catalytic_residue","y":70,"x":177}
 *          ],
 *      "segment":"Q9H0P0",
 *      "legend":{
 *          "segment":{"yPosCentered":190,"text":"Q9H0P0","yPos":140,"xPos":7,"yPosNonOverlapping":140,"yPosRows":270},
 *          "key":[
 *              {"label":
 *                  {"total":"2","yPosCentered":210,"text":"Active site","yPos":160,"xPos":34,
 *                  "yPosNonOverlapping":160,"yPosRows":290},
 *                "shape":
 *                  {"centeredStyle":{"heightOrRadius":5,"y":150},"text":"",
 *                  "nonOverlappingStyle":{"heightOrRadius":5,"y":150},"width":0,"fill":"#760000","cy":150,
 *                  "cx":14,"type":"diamond","fillOpacity":0.5,"stroke":"#760000","height":5,"r":5,"path":"",
 *                  "rowsStyle":{"heightOrRadius":5,"y":285},"typeLabel":"Active site","y":150,"strokeWidth":1,"x":14}
 *               },
 *              {"label":{"total":"1","yPosCentered":210,"text":"Domain","yPos":160,"xPos":177,"yPosNonOverlapping":160,"yPosRows":290},"shape":{"centeredStyle":{"heightOrRadius":5,"y":155},"text":"","nonOverlappingStyle":{"heightOrRadius":5,"y":155},"width":22,"fill":"#033158","cy":155,"cx":150,"type":"rect","fillOpacity":0.5,"stroke":"#033158","height":5,"r":10,"path":"","rowsStyle":{"heightOrRadius":5,"y":288},"typeLabel":"Domain","y":155,"strokeWidth":1,"x":150}},
 *              {"label":{"total":"3","yPosCentered":210,"text":"Metal binding","yPos":160,"xPos":327,"yPosNonOverlapping":160,"yPosRows":290},"shape":{"centeredStyle":{"heightOrRadius":5,"y":155},"text":"","nonOverlappingStyle":{"heightOrRadius":5,"y":155},"width":0,"fill":"#FF6666","cy":155,"cx":307,"type":"circle","fillOpacity":0.5,"stroke":"#FF6666","height":5,"r":5,"path":"","rowsStyle":{"heightOrRadius":5,"y":290},"typeLabel":"Metal binding","y":155,"strokeWidth":1,"x":307}}]
 *      },
 *      "configuration":{
 *          "requestedStop":336,"requestedStart":1,
 *          "horizontalGridNumLines":6,"sequenceLineYCentered":95,"gridLineHeight":10,"rightMargin":20,
 *          "belowRuler":30,"sequenceLength":336,"horizontalGridNumLinesNonOverlapping":6,
 *          "horizontalGridNumLinesCentered":6,"sizeYNonOverlapping":110,"verticalGridLineLengthRows":240,
 *          "unitSize":1.7857142857142858,"style":"nonOverlapping","sequenceLineYRows":135,"sequenceLineY":90,
 *          "verticalGrid":false,"rulerY":20,"horizontalGrid":false,"pixelsDivision":50,"sizeY":110,"sizeX":640,
 *          "sizeYRows":240,"aboveRuler":10,"rulerLength":600,"verticalGridLineLengthNonOverlapping":100,
 *          "sizeYKey":100,"sizeYCentered":160,"sequenceLineYNonOverlapping":90,"verticalGridLineLength":100,
 *          "leftMargin":20,"horizontalGridNumLinesRows":10,"nonOverlapping":true,
 *          "dasReference":"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot",
 *          "dasSources":"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot,http://www.ebi.ac.uk/das-srv/interpro/das/InterPro-matches-overview",
 *          "verticalGridLineLengthCentered":170}};
 *          
 * var myPainter = new Biojs.UniProtFeaturePainter( {
 * //             json : jsonObject,
 *              target : "YourOwnDivId",
 *              featureImageWebService: "http://172.22.68.146:8080/image"
 * });
 *
 * jQuery.ajax({
 *              url: '../biojs/dependencies/proxy/proxy.php',
 * 				data: 'url=http://172.22.68.146:8080/image?style=nonOverlapping&segment=q9h0p0&width=580',
 * 				dataType: 'text',
 *                 success: function(response, callOptions) {
 *                     Biojs.console.log(response);
 *                     try {
 *                         myPainter.paintFeatures(response);
 *                     } catch (err) {
 *                         Biojs.console.log(err);
 *                         document.getElementById('YourOwnDivId').innerHTML = '';
 *                         document.getElementById('YourOwnDivId').innerHTML = 'No image available. Did you provide a valid UniProt accession or identifier, and valid limits?';
 *                     }
 *                 },
 *                 error: function(response, callOptions) {
 *                     Biojs.console.log(response);
 *                     document.getElementById('YourOwnDivId').innerHTML = '';
 *                     document.getElementById('YourOwnDivId').innerHTML = 'No image available. Did you provide a valid UniProt accession or identifier, and valid limits?';
 *                 }
 *             });
 *
 */

Biojs.UniProtFeaturePainter = Biojs.extend(
/** @lends Biojs.UniProtFeaturePainter */
{
    /**
     * Public variables
     */
    raphael: '',
    connections: [],
    zoomSlider: '',
    slider_stop: 0,
    slider_start: 0,
    context: '',
    /**
     * Private variables
     */
    _UP: "up",
    _DOWN: "down",
    _MIDDLE: "middle",
    _CENTERED: "centered",
    _ROWS: "rows",
    _NON_OVERLAPPING: "nonOverlapping",
    _GRID_OPACITY: 0.3,
    _LIME: "#00ff00",
    _DARK_ORANGE: "#ff8c00",
    _originalColor: "",
    _HOVER_COLOR: "#ff8c00",

    /**
     * Default values for the options
     * @name Biojs.UniProtFeaturePainter-constructor
     */
    constructor: function(options) {
    	Biojs.console.enable();
    	jQuery.noConflict();
    	this.initRaphael();
    },

    /**
     * Default values for the options:
     * target: "",
     * json: {},
     * showSlider: true,
     * showPrintButton: true,
     * showFeaturesTooltip: true,
     * highlightFeatures: true,
     * dragSites: true //beware that dragging implies a click on so the click event will be raised!
     * featureImageWebService: "http://localhost:8080/image"
     * @name Biojs.UniProtFeaturePainter-opt
     */
    opt: {
        target: "YourOwnDivId",
        json: {},
        showSlider: true,
        showPrintButton: true,
        showFeaturesTooltip: true,
        highlightFeatures: true,
        dragSites: true,
        featureImageWebService: "http://localhost:8080/image"
    },

    /**
     * Array containing the supported event names
     * @name Biojs.UniProtFeaturePainter-eventTypes
     */
    eventTypes: [
        /**
         * @name Biojs.UniProtFeaturePainter#onFeatureClick
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {int} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * myPainter.onFeatureClick(
         *    function( obj ) {
         *    var tooltip = obj.featureLabel +
                    " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
                    "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
                    "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
         *       alert("Clicked: " + tooltip );
         *       Biojs.console.log(obj.shape); //raphaël object
         *    }
         * );
         *
         * */
        "onFeatureClick",
        /**
         * @name Biojs.UniProtFeaturePainter#onFeatureOn
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {int} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * // It is not recommended to use this event to display a tooltip or highlight the features on mouse over,
         * // instead set to true the options showFeaturesTooltip and highlightFeatures
         * 
         * myPainter.onFeatureOn(
         *    function( obj ) {
         *    var tooltip = obj.featureLabel +
         *           " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
         *           "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
         *           "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
         *       alert("On feature: " + tooltip );
         *       Biojs.console.log(obj.shape); //raphaël object
         *    }
         * );
         *
         * */
        "onFeatureOn"
    ],

    /**
     * Manual customization of vertical and horizontal grid lines as well as style.
     * Depending on the selected values for the style radio buttons and the vertical and horizontal
     * check buttons, this method changes the current style and adds/removes the gridlines.
     * @param {string} rdbStyle Radio buttons grouping styles, possible values: nonOverlapping, rows, centered.
     * @param {boolean} chkHorizontal Check button for horizontal grid lines.
     * @param {boolean} chkVertical Check button for vertical grid lines.
     * 
     * @example 
     * myPainter.customize("centered",true,true);
     * 
     */
    customize: function(rdbStyle, chkHorizontal, chkVertical) {
        var config = this.opt.json.configuration;

        var style = document.getElementsByName(rdbStyle);
        var selectedStyle = "";
        if(style) {
            var radioLength = style.length;
            if(radioLength == undefined) {
                if(style.checked) {
                    selectedStyle = style.value;
                }
            }
            for (var i = 0; i < radioLength; i++) {
                if(style[i].checked) {
                    selectedStyle = style[i].value;
                }
            }
        }

        var horizontalGrid = document.getElementById(chkHorizontal);
        var paintHorizontalGrid = false;
        if (horizontalGrid) {
            paintHorizontalGrid = horizontalGrid.checked;
        }

        var verticalGrid = document.getElementById(chkVertical);
        var paintVerticalGrid = false;
        if (verticalGrid) {
            paintVerticalGrid = verticalGrid.checked;
        }

        if ((selectedStyle == "") ||
            ((selectedStyle != "") && (selectedStyle == config.style)) ) { //Style did not change
            if (paintVerticalGrid != config.verticalGrid) { //vertical grid changed
                config.verticalGrid = paintVerticalGrid;
                if (paintHorizontalGrid != config.horizontalGrid) { //both vertical and horizontal changed
                    config.horizontalGrid = paintHorizontalGrid;
                    if (paintVerticalGrid && paintHorizontalGrid) { //both are true now, paint lines
                        //Draw the vertical grid lines
                        this._paintVerticalGridLines(config.verticalGridLineLength, config.requestedStop, config.requestedStart, config.rulerLength, config.rulerY, config.pixelsDivision, config.leftMargin, this.raphael);
                        //Draw the horizontal grid lines
                        this._paintHorizontalGridLines(config.horizontalGrid, config.horizontalGridNumLines, config.gridLineHeight, config.nonOverlapping, config.leftMargin, config.rightMargin, config.sequenceLineY, config.rulerY, config.sizeX, this.raphael);
                    } else { //either vertical or horizontal is false, repaint without zoom calculation
                        this._repaint('withoutZoom');
                    }
                } else { //only vertical changed
                    if (paintVerticalGrid) { //vertical is now true, just paint lines
                        //Draw the vertical grid lines
                        this._paintVerticalGridLines(config.verticalGridLineLength, config.requestedStop, config.requestedStart, config.rulerLength, config.rulerY, config.pixelsDivision, config.leftMargin, this.raphael);
                    } else {//vertical in now false, take out the lines --> repaint all without zoom calculations
                        this._repaint('withoutZoom');
                    }
                }
            } else { //vertical did not change
                if (paintHorizontalGrid != config.horizontalGrid) { //only horizontal changed
                    config.horizontalGrid = paintHorizontalGrid;
                    if (paintHorizontalGrid) { //both are true now, paint lines
                        //Draw the horizontal grid lines
                        this._paintHorizontalGridLines(config.horizontalGrid, config.horizontalGridNumLines, config.gridLineHeight, config.nonOverlapping, config.leftMargin, config.rightMargin, config.sequenceLineY, config.rulerY, config.sizeX, this.raphael);
                    } else { //horizontal is false, repaint without zoom calculation
                        this._repaint('withoutZoom');
                    }
                } //else nothing changed then do nothing
            }
        } else {//style changed, recalculate features distribution and repaint
            config.style = selectedStyle;
            config.horizontalGrid = paintHorizontalGrid;
            config.verticalGrid = paintVerticalGrid;
            this._updateFeaturesToStyle(selectedStyle);
            var holder = document.getElementById("uniprotFeaturePainter-holder");
            holder.innerHTML = "";
            holder.style.height = (config.sizeY+config.sizeYKey) + "px";
            holder.style.width = config.sizeX + "px";
            this.raphael = Raphael("uniprotFeaturePainter-holder", config.sizeX, config.sizeY+config.sizeYKey);
            this._repaint('withoutZoom');
        }
    },

    /**
     * Paint the features according to the values specified in the json object defined when creating the object.
     * This method initializes the holder, paints the slider and print button depending on the options, and
     * paints the features and legend.
     * 
     * @param {Object} [json] The json object describing the configuration, features, and legend to be displayed.
     * 
     * @example
     * myPainter.paintFeatures();
     * 
     */
    paintFeatures: function(json) {
    	if ( json )
    	{ 
    	   this.opt.json = json;
    	}
        this._init();
        this._paintSlider();
        this._repaint();
    },

    /**
     * Opens a new window/tab in the browser with the graphical representation as a plain image.
     * Note: For IE it does not reflect the drags/drops on sites
     * 
     * @example
     * myPainter.exportFeaturesToImage();
     * 
     */
    exportFeaturesToImage: function() {
//        if (typeof FlashCanvas != "undefined") {
//            FlashCanvas.initElement(canvas);
//        }
        var config = this.opt.json.configuration;
        var dataURL = "";
        if (jQuery.browser.msie) { //canvas does not work (not even with IE 9)
            var arguments = "segment=" + this.opt.json.segment;
            if ((config.requestedStart != 0) && (config.requestedStop != 0)) {
                arguments = arguments + ":" + config.requestedStart + "," + config.requestedStop;
            }
            arguments = arguments +
                "&dasReference=" + config.dasReference +
                "&dasSources=" + config.dasSources +
                "&width=" + config.sizeX +
                "&option=image" +
                "&hgrid=" + config.horizontalGrid +
                "&vgrid=" + config.verticalGrid +
                "&style=" + config.style;
            dataURL = this.opt.featureImageWebService + "?" + arguments;
            window.open(dataURL); //open generated image in new tab/window
        } else {
            svg = document.getElementById('uniprotFeaturePainter-holder').innerHTML;
            var canvas = document.createElement("canvas");
            canvg(canvas, svg);
            dataURL = canvas.toDataURL();
            this.$imageExported = jQuery('<div id="uniprotFeaturePainter-imageExportedDiv"></div>')
                .html('<img id="uniprotFeaturePainter-imageExported" alt="exported image" src="' + dataURL + '"/>')
                .dialog({
                    autoOpen: true,
                    title: 'Exported image',
                    modal: true,
                    width: config.sizeX+20
                });
        }
//        jQuery('#uniprotFeaturePainter-imageExportedDiv').empty();
//        jQuery('#uniprotFeaturePainter-imageExported').empty();
//        jQuery('#uniprotFeaturePainter-imageExportedDiv').remove();
//        jQuery('#uniprotFeaturePainter-imageExported').remove();

//        window.print();
//        jQuery("#uniprotFeaturePainter-image").attr("src", dataURL);
//        window.open(dataURL);
//        var html="<html>";
//        html+= document.getElementById('uniprotFeaturePainter-divimage').innerHTML;
//        html+="</html>";
//        console.log(html);
//        var printWin = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
//        printWin.document.write(html);
//        printWin.document.close();
//        printWin.focus();
//        printWin.print();
//        printWin.close();
    },

    //
    // Private methods
    //
    /**
     * Private: Initializes the component.
     */
    _init: function() {
        //console.log(this.opt);
        Biojs_UniProtFeaturePainter_myself = this;
        var config = this.opt.json.configuration;
        //First create the slider, button, and holder
        var painter_div = jQuery("#" + this.opt.target);
        painter_div.text('');
        if (this.opt.showSlider && this.opt.showPrintButton) {
            painter_div.append(this._withSliderAndButton(config.sizeX, config.sizeY, config.sizeYKey));
        } else if (this.opt.showPrintButton) {
            painter_div.append(this._withButtonOnly(config.sizeX, config.sizeY, config.sizeYKey));
        } else if (this.opt.showSlider) {
            painter_div.append(this._withSliderOnly(config.sizeX));
        }
        painter_div.append('<br/>');
        painter_div.append('<div id="uniprotFeaturePainter-holder"></div>');

        var holder = document.getElementById("uniprotFeaturePainter-holder");
        if (!holder) {
            this.$errorMsg = jQuery('<div id="uniprotFeaturePainter-errorInit"></div>')
                .html('There was an unexpected failure, the image cannot be displayed.')
                .dialog({
                    autoOpen: true,
                    title: 'Error',
                    modal: true/*,
                    buttons: {
                        Ok: function() { jQuery(this).dialog('close'); }
                    }*/
                });
            //this.$errorMsg.dialog('open');
            throw "Error";
        }
        holder.innerHTML = "";
        holder.style.height = (config.sizeY+config.sizeYKey) + "px";
        holder.style.width = config.sizeX + "px";
        this.raphael = Raphael("uniprotFeaturePainter-holder", config.sizeX, config.sizeY+config.sizeYKey);
    },

    /**
     * Private: Clears all divs content.
     * @param {boolean} [withoutZoom=false] When true, it sets to 0 the total count for all feature types.
     */
    _clear: function(withoutZoom) {
        this.raphael.clear();
        this.connections = [];
        if (!withoutZoom) {
            //console.log(legend.key);
            var keyShapes = this.opt.json.legend.key;
            if (keyShapes) {
                for (var i = 0; i < keyShapes.length; i++) {
                    keyShapes[i].label.total = 0;
                }
            }
        }
    },

    /**
     * Private: Paints the shapes and rectangles.
     * @param {boolean} [withoutZoom=false] When true, this method recalculates the total for each feature type.
     */
    _paintJson: function(withoutZoom) {
        var config = this.opt.json.configuration;
        for (var i = 0; i < this.opt.json.featuresArray.length; i++) {
            var elem = this.opt.json.featuresArray[i];
            if (!((elem.featureEnd < config.requestedStart) || (elem.featureStart > config.requestedStop)))  {//within the range
                this._paint(elem, config.sequenceLineY);
                if (!withoutZoom) {
                    this._increaseKeyTotal(elem.typeLabel);
                }
            }
        }
    },

    /**
     * Private: Paints the legend (segment and key).
     * 
     * 
     */
    _paintKey: function() {
        var legend = this.opt.json.legend;
        //console.log(key);
        var keySegment = legend.segment
        var font = {'text-anchor':'start'};
        var shape = this.raphael.text(keySegment.xPos, keySegment.yPos, keySegment.text).attr(font);
        shape.attr({"stroke": "black", "stroke-width": 0.1});
        var keyShapes = legend.key;
        for (var i = 0; i < keyShapes.length; i++) {
            this._paint(keyShapes[i].shape);
            var shapeText = keyShapes[i].label;
            var font = {'text-anchor':'start'};
            var shape = this.raphael.text(shapeText.xPos, shapeText.yPos, shapeText.text + ' (' + shapeText.total + ')').attr(font);
            shape.attr({"stroke": "black", "stroke-width": 0.1});
        }
    },

    /**
     * Private: Paints the ruler.
     */
    _paintRuler: function() {//holder size, left and right margins of the holder, and number of amino acids
        var config = this.opt.json.configuration;
        //console.log(config);
        //Draw the ruler
        var ruler = this.raphael.path("M" + config.leftMargin + " " + config.rulerY + "L" + (config.sizeX-config.rightMargin) + " " + config.rulerY);
        ruler.attr({fill: "black", stroke: "black", "fill": 1, "stroke-width": 1});
        //Draw the divisions
        var divisions = 1.0 * config.rulerLength / config.pixelsDivision; //number of divisions with label
        var divisionValue = 1.0 * (config.requestedStop-config.requestedStart+1) / divisions;  //seed value for labels
        var divisionSize = config.rulerLength / (divisions*10); //inter-divisions
        divisions = Math.round(divisions);
        divisionValue = Math.round(divisionValue);
        for (var i = 1; i < divisions*10; i++) { //10 inter-divisions for each division
            var posX = Math.round(i*divisionSize + config.leftMargin);
            if ((divisionValue*i/10) < config.requestedStop) {
                if (i%10 == 0) {
                    var line = this.raphael.path("M" + posX + " " + (config.rulerY-6) + "L" + posX + " " + (config.rulerY+6));
                    line.attr({fill: "black", stroke: "black", "fill": 1, "stroke-width": 1});
                    var text = this.raphael.text(posX, config.aboveRuler, "" + ((divisionValue*i/10)+config.requestedStart-1));
                    text.attr({fill: "black"});
                    if ((config.verticalGrid == 'true') || (config.verticalGrid == true)) {
                        var line = this.raphael.path("M" + posX + " " + (config.rulerY+6) + "L" + posX + " " + config.verticalGridLineLength);
                        line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
                    }
                } else if (i%5 == 0) {
                    var line = this.raphael.path("M" + posX + " " + (config.rulerY-4) + "L" + posX + " " + (config.rulerY+4));
                    line.attr({fill: "grey", stroke: "grey", "fill": 1, "stroke-width": 1});
                } /*else {
                    var line = this.raphael.path("M" + posX + " " + (rulerY-2) + "L" + posX + " " + (rulerY+2));
                    line.attr({fill: "grey"});
                }   */
            }
        }
        //always draw the start and the stop
        var text = this.raphael.text(config.leftMargin, config.belowRuler, "" + config.requestedStart);
        text.attr({fill: "blue"});
        var text = this.raphael.text(config.rulerLength + config.leftMargin, config.belowRuler, "" + config.requestedStop);
        text.attr({fill: "blue"});
        if ((config.verticalGrid == 'true') || (config.verticalGrid == true)) {
            var line = this.raphael.path("M" + config.leftMargin + " " + (config.rulerY+6) + "L" + config.leftMargin + " " + config.verticalGridLineLength);
            line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
            var line = this.raphael.path("M" + (config.rulerLength + config.leftMargin) + " " + (config.rulerY+6) + "L" + (config.rulerLength + config.leftMargin) + " " + config.verticalGridLineLength);
            line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
        }
        //Now create the sequence line
        var sequenceLine = this.raphael.path("M" + config.leftMargin + " " + config.sequenceLineY + "L" + (config.sizeX-config.rightMargin) + " " + config.sequenceLineY);
        sequenceLine.attr({fill: "blue", stroke: "blue", "fill": 1, "stroke-width": 1});
        //Paint the horizontal grid lines
        this._paintHorizontalGridLines(config.horizontalGrid, config.horizontalGridNumLines, config.gridLineHeight, config.nonOverlapping, config.leftMargin, config.rightMargin, config.sequenceLineY, config.rulerY, config.sizeX, this.raphael);
    },

    /**
     * Private: Paints the slider
     */
    _paintSlider: function() {//holder size, left and right margins of the holder, and number of amino acids
        if (this.opt.showSlider == true) {
            var config = this.opt.json.configuration;
            var start = config.requestedStart;
            var stop = config.requestedStop;
            var sequenceLength = config.sequenceLength;
            if (!document.getElementById("uniprotFeaturePainter-slider")) {
                return;
            }

            this.slider_start = start;
            this.slider_stop = stop;
            var slider_div = jQuery("#uniprotFeaturePainter-slider");
            slider_div.text('');
            slider_div.append('<label for="uniprotFeaturePainter-slider-values"></label>');
            slider_div.append('<div type="text" id="uniprotFeaturePainter-slider-values" style="margin-bottom:5px" />');
            var myself = this;
            this.zoomSlider = jQuery('<div id="uniprotFeaturePainter-slider-bar" style="width:300px"></div>').appendTo(slider_div);
            
            console.log(jQuery('#uniprotFeaturePainter-slider-bar' ));
            
            jQuery('#uniprotFeaturePainter-slider-bar' ).slider({
                range: true,
                min: 1,
                max: sequenceLength,
                values: [start, stop],
                slide: function(event, ui) {
                    jQuery('#uniprotFeaturePainter-slider-values').html('Zoom - Start: '+ui.values[0] + ', End: ' + ui.values[1]);
                    slider_start = ui.values[0];
                    slider_stop = ui.values[1];
                },
                change: function(event, ui) {
                   myself._repaint(undefined, ui.values[0], ui.values[1]);
                }
            });
            
            jQuery('#uniprotFeaturePainter-slider-values').html('Zoom - Start:' + start + ', End:' + stop);
        }
    },

    /**
     * Private: Repaints everything: ruler, shapes, and legend.
     * @param {boolean} [withoutZoom=false] When false, it zooms according to the slider values.
     * @param {int} [newStart] Zoom from this sequence start value.
     * @param {int} [newStop] Zoom to this sequence end value.
     */
    _repaint: function(withoutZoom, newStart, newStop) {
        //recalculate start and stop
        var config = this.opt.json.configuration;
        if (newStart && newStop){
            this.slider_start = newStart;
            this.slider_stop = newStop;
        }
        if ((this.slider_start != 0) && (this.slider_stop != 0)){
            config.requestedStart = this.slider_start;
            config.requestedStop = this.slider_stop;
        }
        config.unitSize = config.rulerLength / (config.requestedStop-config.requestedStart+1);
        this._clear(withoutZoom);
        this._paintRuler();
        //recalculate cx, x, and width for features within the ranges
        if (!withoutZoom) {
            for (var i = 0; i < this.opt.json.featuresArray.length; i++) {
                var elem = this.opt.json.featuresArray[i];
                if (!((elem.featureEnd < config.requestedStart) || (elem.featureStart > config.requestedStop)))  {//within the range
                    this._applyZoomToFeature(elem);
                }
            }
        }
        this._paintJson(withoutZoom);
        this._paintKey();
    },

    /**
     * Private: Function to create slider and print button.
     * @param {int} sizeX Width.
     * @param {int} sizeY Height for the features holder.
     * @param {int} sizeYKey Height for the legend.
     */
    _withSliderAndButton: function (sizeX, sizeY, sizeYKey) {
        var text =
            '<table width="' + sizeX + 'px">' +
                '<tr>' +
                    '<td width="75%">' +
                    '<div  id="uniprotFeaturePainter-slider" style="margin-left: 10px;"></div>' +
                    '</td>' +
                    '<td valign="bottom" align="right">' +
                    '<div id="uniprotFeaturePainter-printButton">' +
                    '<input type="button" value="Export to image" onclick="Biojs_UniProtFeaturePainter_myself.exportFeaturesToImage();"/>' +
                    '</div> ' +
                    '</td>' +
                '</tr>' +
            '</table>' +
            '<br/>' +
            '<div id="uniprotFeaturePainter-divimage" style="display: none;">' +
                '<img id="uniprotFeaturePainter-image" alt="Features image">' +
            '</div>' +
            '<div id="uniprotFeaturePainter-divcanvas" style="display: none;">' +
                '<canvas id="uniprotFeaturePainter-canvas" ' +
                    'height="' + (sizeY+sizeYKey) +
                    '" width="' + sizeX +
                    '" style="width: ' + sizeX + 'px; ' +
                            'height: ' + sizeX + 'px;">' +
                '</canvas>' +
            '</div>';
        return text;
    },
    /**
     * Private: Function to create slider only.
     * @param {int} sizeX Width.
     */
    _withSliderOnly: function(sizeX) {
        var text =
            '<table width="' + sizeX + 'px">' +
                '<tr>' +
                    '<td width="75%">' +
                    '<div  id="uniprotFeaturePainter-slider" style="margin-left: 10px;"></div>' +
                    '</td>' +
                '</tr>' +
            '</table>' +
            '<br/>';
        return text;
    },
    /**
     * Private: Function to create print button only.
     * @param {int} sizeX Width.
     * @param {int} sizeY Height for the features holder.
     * @param {int} sizeYKey Height for the legend.
     */
    _withButtonOnly: function (sizeX, sizeY, sizeYKey) {
        var myself = this;
        var text =
            '<table width="' + sizeX + 'px">' +
                '<tr>' +
                    '<td valign="bottom" align="right">' +
                    '<div id="uniprotFeaturePainter-printButton">' +
                    '<input type="button" value="Export to image" onclick="Biojs_UniProtFeaturePainter_myself.exportFeaturesToImage();"/>' +
                    '</div> ' +
                    '</td>' +
                '</tr>' +
            '</table>' +
            '<br/>' +
            '<div id="uniprotFeaturePainter-divimage" style="display: none;">' +
                '<img id="uniprotFeaturePainter-image" alt="Features image">' +
            '</div>' +
            '<div id="uniprotFeaturePainter-divcanvas" style="display: none;">' +
                '<canvas id="uniprotFeaturePainter-canvas" ' +
                    'height="' + (sizeY+sizeYKey) +
                    '" width="' + sizeX +
                    '" style="width: ' + sizeX + 'px; ' +
                            'height: ' + sizeX + 'px;">' +
                '</canvas>' +
            '</div>';
        return text;
    },

    /**
     * Private: Gets a JSON element representing SVG-features and creates a Raphaël object and paints features;
     * it also adds tooltip and move, mousein, mouseout, and drag events for features.
     * @param {Object} obj SVG representation for features.
     * @param {int} sequenceLineY Y position for the sequence line.
     */
    _paint: function(obj, sequenceLineY) {
        //console.log(obj);
        var dotRadius = 1;
        var shape;
        if (obj.type == "path") {
            if (obj.featureId || !sequenceLineY) { //feature, must be connected
                shape = this.raphael.path(obj.path);
                shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
            } else { //line
                var path = this.raphael.path(obj.path);
                path.attr({"fill": obj.fill, "stroke": obj.stroke, "stroke-width": obj.strokeWidth});
            }
        } else if (obj.type == "text") {
            if (obj.featureId || !sequenceLineY) {
                shape = this.raphael.text(obj.x, obj.y, obj.text);
                shape.attr({"stroke": obj.stroke, "fill-opacity": obj.fillOpacity, "stroke-width": 2});
            } else {
                var text = this.raphael.text(obj.x, obj.y, obj.text);
                text.attr({"fill": obj.fill});
            }
        } else if (obj.type == "circle") {
            shape = this.raphael.circle(obj.cx, obj.cy, obj.r);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        } else if (obj.type == "rect") {
            if (obj.width == 0) { //For some really long sequences make sure the rectangle has width.
                obj.width = 1;
            }
            shape = this.raphael.rect(obj.x, obj.y, obj.width, obj.height);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        } else if (obj.type == "diamond") {
            shape = this.raphael.uniprotFeaturePainter_diamond(obj.cx, obj.cy, obj.r);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        } else if (obj.type == "triangle") {
            shape = this.raphael.uniprotFeaturePainter_triangle(obj.cx, obj.cy, obj.r);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        } else if (obj.type == "conPath") { //deprecated
            var rad = 4;
            var vert = 8;
            if (obj.text == "N") {
                shape = this.raphael.uniprotFeaturePainter_NPath(obj.x, obj.y, rad, vert);
            } else if (obj.text == "O") {
                shape = this.raphael.uniprotFeaturePainter_OPath(obj.x, obj.y, rad, vert);
            } else if (obj.text == "C") {
                shape = this.raphael.uniprotFeaturePainter_CPath(obj.x, obj.y, rad, vert);
            } else {//C-O-N
                //C
                rad = 2;
                vert = 6;
                var space = 4;
                shape = this.raphael.uniprotFeaturePainter_CONPath(obj.x, obj.y, rad, vert, space);
            }
            shape.attr({"stroke": obj.stroke, "fill-opacity": obj.fillOpacity, "stroke-width": 2});
        } else if (obj.type == "wave") {
            shape = this.raphael.uniprotFeaturePainter_wave(obj.cx, obj.cy, obj.r);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        } else if (obj.type == "hexagon") {
            shape = this.raphael.uniprotFeaturePainter_hexagon(obj.cx, obj.cy, obj.r);
            shape.attr({"fill": obj.fill, "stroke": obj.stroke, "fill-opacity": obj.fillOpacity});
        }
        if (sequenceLineY) {
            var myself = this;
            shape.click(
                function() {
                    myself.raiseEvent('onFeatureClick', {
                        featureId: obj.featureId,
                        featureLabel: obj.featureLabel,
                        featureStart: obj.featureStart,
                        featureEnd: obj.featureEnd,
                        featureTypeLabel: obj.featureTypeLabel,
                        typeCode: obj.typeCode,
                        typeCategory: obj.typeCategory,
                        evidenceText: obj.evidenceText,
                        evidenceCode: obj.evidenceCode,
                        shapeOn: shape
                    });
                }
            );
            if (obj.type != "rect") { //rectangle are not movable nor have a link to the sequence line
                if (this.opt.dragSites) {
                    shape.drag(
                        function (dx, dy) {  //move
                            if (!this.attr("cx") && !this.attr("x")) {//path (http://www.nathancolgate.com/post/2946823151/drag-and-drop-paths-in-raphael-js)
                                var trans_x = dx-this.ox;
                                var trans_y = dy-this.oy;
                                this.translate(trans_x,trans_y);
                                this.ox = dx;
                                this.oy = dy;
                            } else {
                                var att = this.type == "rect" || this.type == "text"
                                    ? {x: this.ox + dx, y: this.oy + dy}
                                    : {cx: this.ox + dx, cy: this.oy + dy};
                                this.attr(att);
                            }
                            //Repaints all connections
                            myself.raphael.uniprotFeaturePainter_connection(myself.connections[this.connectionIndex-1]);
                            myself.raphael.safari();
                        },
                        function () { //dragger
                            if (!this.attr("cx") && !this.attr("x")) { //path (http://www.nathancolgate.com/post/2946823151/drag-and-drop-paths-in-raphael-js)
                                this.ox = 0;
                                this.oy = 0;
                            } else {
                                this.ox = this.type == "rect" || this.type == "text" ? this.attr("x") : this.attr("cx");
                                this.oy = this.type == "rect" || this.type == "text" ? this.attr("y") : this.attr("cy");
                            }
                            this.animate({"fill-opacity": 1.0}, 500);
                        },
                        function () { //up
                            this.animate({"fill-opacity": .5}, 500);
                        }
                    );
                }
                if (this.opt.highlightFeatures) {
                    shape.hover(
                        function() {//on
                            myself._originalColor = this.attrs.stroke;
                            this.attr({stroke: myself._HOVER_COLOR, fill: myself._HOVER_COLOR});
                            this.animate({"fill-opacity": 1.0}, 500);
                            connection = myself.connections[this.connectionIndex-1];
                            shape = connection.from;
                            connection.line.attr({fill: "none", stroke: myself._HOVER_COLOR, "stroke-width": 5});//shape.attrs.stroke
                            myself.raphael.uniprotFeaturePainter_connection(connection);

                            myself.raiseEvent('onFeatureOn', {
                                featureId: obj.featureId,
                                featureLabel: obj.featureLabel,
                                featureStart: obj.featureStart,
                                featureEnd: obj.featureEnd,
                                featureTypeLabel: obj.featureTypeLabel,
                                typeCode: obj.typeCode,
                                typeCategory: obj.typeCategory,
                                evidenceText: obj.evidenceText,
                                evidenceCode: obj.evidenceCode,
                                shapeOn: shape
                            });
                        },
                        function() {//off
                            this.attr({stroke: myself._originalColor, fill: myself._originalColor});
                            this.animate({"fill-opacity": .5}, 500);
                            connection = myself.connections[this.connectionIndex-1];
                            shape = connection.from;
                            connection.line.attr({stroke: "#000", fill: "none", "stroke-width": 1});
                            myself.raphael.uniprotFeaturePainter_connection(connection);
                        }
                    );
                } else {
                    shape.hover(
                        function() {//on
                            myself.raiseEvent('onFeatureOn', {
                                featureId: obj.featureId,
                                featureLabel: obj.featureLabel,
                                featureStart: obj.featureStart,
                                featureEnd: obj.featureEnd,
                                featureTypeLabel: obj.featureTypeLabel,
                                typeCode: obj.typeCode,
                                typeCategory: obj.typeCategory,
                                evidenceText: obj.evidenceText,
                                evidenceCode: obj.evidenceCode,
                                shapeOn: shape
                            });
                        },
                        function() {//off
                        }
                    );
                }
                //dot
                var dot = this.raphael.circle(obj.x, sequenceLineY, dotRadius);
                dot.attr({"fill": 1, stroke: obj.stroke, "stroke-width": 1});
                //connection
                try {
                    //console.log(obj);
                    var connectionLine = this.raphael.uniprotFeaturePainter_connection(dot, shape, "#000");
                    //console.log(connectionLine);
                    this.connections.push(connectionLine);
                    shape.connectionIndex = this.connections.length;
                } catch (err) {/*console.log(err)*/}
            } else {
                if (this.opt.highlightFeatures) {
                    shape.hover(
                        function() { //on
                            myself._originalColor = this.attrs.stroke;
                            this.attr({stroke: myself._HOVER_COLOR, fill: myself._HOVER_COLOR});
                            this.animate({"fill-opacity": 1.0}, 500);

                            myself.raiseEvent('onFeatureOn', {
                                featureId: obj.featureId,
                                featureLabel: obj.featureLabel,
                                featureStart: obj.featureStart,
                                featureEnd: obj.featureEnd,
                                featureTypeLabel: obj.featureTypeLabel,
                                typeCode: obj.typeCode,
                                typeCategory: obj.typeCategory,
                                evidenceText: obj.evidenceText,
                                evidenceCode: obj.evidenceCode,
                                shapeOn: shape
                            });
                        },
                        function() { //off
                            this.attr({stroke: myself._originalColor, fill: myself._originalColor});
                            this.animate({"fill-opacity": .5}, 500);
                        }
                    );
                } else {
                    shape.hover(
                        function() {//on
                            myself.raiseEvent('onFeatureOn', {
                                featureId: obj.featureId,
                                featureLabel: obj.featureLabel,
                                featureStart: obj.featureStart,
                                featureEnd: obj.featureEnd,
                                featureTypeLabel: obj.featureTypeLabel,
                                typeCode: obj.typeCode,
                                typeCategory: obj.typeCategory,
                                evidenceText: obj.evidenceText,
                                evidenceCode: obj.evidenceCode,
                                shapeOn: shape
                            });
                        },
                        function() {//off
                        }
                    );
                }
            }
        }
        //tooltip
        if (this.opt.showFeaturesTooltip == true) {
            if (obj.featureId) {//only features in the sequence have tooltips
            	console.log(obj);
            	console.log(shape);
                obj.featureId = obj.featureId.replace(/:|\./g, "_");
                shape.node.id = "uniprotFeaturePainter_" + obj.featureId;
                //shape.id = shape.node.id;
                var tooltip = obj.featureLabel +
                    " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
                    "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
                    "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
                var myFeatureObj = jQuery("#" + "uniprotFeaturePainter_" + obj.featureId);
                //This one works fine: xph.tooltip.v0.7b
                //myFeatureObj.tooltip({text: tooltip});
                //This one works fine: bassistance.de
                myFeatureObj.tooltip({
                    track: true,
                    delay: 0,
                    showURL: false,
                    bodyHandler: function() {
                        return tooltip;
                    }
                });
            }
        }
        this.raphael.safari();
    },

    /**
     * Private: Counts the features per type so they will be correctly displayed on the legend.
     * @param {string} keyName Feature type.
     */
    _increaseKeyTotal: function(keyName) {
        //console.log(key);
        var keyShapes = this.opt.json.legend.key;
        for (var i = 0; i < keyShapes.length; i++) {
            if (keyShapes[i].label.text == keyName) {
                keyShapes[i].label.total = keyShapes[i].label.total + 1;
                return;
            }
        }
    },

    /**
     * Private: Recalculates (x,y) positions for a particular feature, used when a zoom has been called.
     * @param {Object} el Element whose x, y, and width needs to be recalculated according to the new zoom.
     */
    _applyZoomToFeature: function(el) {
        config = this.opt.json.configuration;
        if (config.requestedStart != 1) {
            fstart = el.featureStart - config.requestedStart;
            fstop = el.featureEnd - config.requestedStart;
        } else {
            fstart = el.featureStart;
            fstop = el.featureEnd;
        }
        xInit = Math.round(fstart*config.unitSize + config.leftMargin);
        xEnd = Math.round(fstop*config.unitSize + config.leftMargin);
        width = xEnd - xInit;
        if (el.type == 'hexagon') { //typeName == 'Glycosilation'
            xInit = xInit - (el.r/2);
        }
        el.cx = xInit;
        el.x = xInit;
        el.width = width;
    },

    /**
     * Private: Paints the horizontal grid lines.
     * @param {boolean} horizontalGrid Should horizontal lines be painted?
     * @param {int} horizontalGridNumLines Number of horizontal grid lines to be painted.
     * @param {int} gridLineHeight Pixels separation between lines.
     * @param {boolean} nonOverlapping Is nonOverlapping style selected?
     * @param {int} leftMargin Pixels to left margin.
     * @param {int} rightMargin Pixels to right margin.
     * @param {int} sequenceLineY Y position for the sequence line.
     * @param {int} rulerY Y position for the ruler.
     * @param {int} sizeX Width.
     * @param {Object} raphael SVG features representation.
     */
    _paintHorizontalGridLines: function(horizontalGrid, horizontalGridNumLines, gridLineHeight, nonOverlapping, leftMargin, rightMargin, sequenceLineY, rulerY, sizeX, raphael) {
        //Draw the grid lines
        if ((horizontalGrid == 'true') || (horizontalGrid == true)) {
            for (i = 1; i <= horizontalGridNumLines; i++) {
                if (!nonOverlapping) {
                    var line = raphael.path("M" + leftMargin + " " + (sequenceLineY + i*gridLineHeight)
                        + "L" + (sizeX-rightMargin) + " " + (sequenceLineY + i*gridLineHeight));
                    line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
                    var lineUp = raphael.path("M" + leftMargin + " " + (sequenceLineY - i*gridLineHeight)
                        + "L" + (sizeX-rightMargin) + " " + (sequenceLineY - i*gridLineHeight));
                    lineUp.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
                } else {
                    var lineUp = raphael.path("M" + leftMargin + " " + (rulerY + (i+1)*gridLineHeight)
                        + "L" + (sizeX-rightMargin) + " " + (rulerY + (i+1)*gridLineHeight));
                    lineUp.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
                }
            }
            if (!nonOverlapping && (horizontalGridNumLines != 0)) { //we need an extra horizontal grid line at the bottom
                var line = raphael.path("M" + leftMargin + " " + (sequenceLineY + (horizontalGridNumLines+1)*gridLineHeight)
                    + "L" + (sizeX-rightMargin) + " " + (sequenceLineY + (horizontalGridNumLines+1)*gridLineHeight));
                line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
            }
            if (nonOverlapping && (horizontalGridNumLines != 0)) { //we need an extra horizontal grid line at the bottom
                var line = raphael.path("M" + leftMargin + " " + (rulerY + (horizontalGridNumLines+2)*gridLineHeight)
                    + "L" + (sizeX-rightMargin) + " " + (rulerY + (horizontalGridNumLines+2)*gridLineHeight));
                line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
            }
        }
    },

    /**
     * Private: Paints the vertical grid lines.
     * @param {int} verticalGridLineLength Vertical grid line length.
     * @param {int} stop Requested stop for the sequence.
     * @param {int} start Requested start for the sequence.
     * @param {int} rulerLength Ruler length.
     * @param {int} rulerY Y position for the ruler.
     * @param {int} pixelsDivision Pixels between amino acids.
     * @param {int} leftMargin Pixels to left margin.
     * @param {Object} raphael SVG features representation.
     */
    _paintVerticalGridLines: function(verticalGridLineLength, stop, start, rulerLength, rulerY, pixelsDivision, leftMargin, raphael) {
        //Draw the vertical grid lines
        var divisions = 1.0 * rulerLength / pixelsDivision; //number of divisions with label
        var divisionValue = 1.0 * (stop-start+1) / divisions;  //seed value for labels
        var divisionSize = rulerLength / (divisions*10); //inter-divisions
        divisions = Math.round(divisions);
        divisionValue = Math.round(divisionValue);
        for (var i = 1; i < divisions*10; i++) { //10 inter-divisions for each division
            var posX = Math.round(i*divisionSize + leftMargin);
            if ((divisionValue*i/10) < stop) {
                if (i%10 == 0) {
                    var line = raphael.path("M" + posX + " " + (rulerY+6) + "L" + posX + " " + verticalGridLineLength);
                    line.attr({stroke: "black", "stroke-width": 0.7, "stroke-opacity": this._GRID_OPACITY});
                }
            }
        }
    },

    /**
     * Modifies the variables in the configuration JSON element related to the style according to the new style to be applied; it also modifies the (x,y)
     * positions for all features and the legend.
     * @param {string} newStyle New style to be applied
     */
    _updateFeaturesToStyle: function (newStyle) {
        if (newStyle == this._ROWS) {
            this.opt.json.configuration.sequenceLineY = this.opt.json.configuration.sequenceLineYRows;
            this.opt.json.configuration.sizeY = this.opt.json.configuration.sizeYRows;
            this.opt.json.configuration.verticalGridLineLength = this.opt.json.configuration.verticalGridLineLengthRows;
            this.opt.json.configuration.horizontalGridNumLines = this.opt.json.configuration.horizontalGridNumLinesRows;
            this.opt.json.legend.segment.yPos = this.opt.json.legend.segment.yPosRows;
            this.opt.json.configuration.nonOverlapping = false;
        } else if (newStyle == this._NON_OVERLAPPING) {
            this.opt.json.configuration.sequenceLineY = this.opt.json.configuration.sequenceLineYNonOverlapping;
            this.opt.json.configuration.sizeY = this.opt.json.configuration.sizeYNonOverlapping;
            this.opt.json.configuration.verticalGridLineLength = this.opt.json.configuration.verticalGridLineLengthNonOverlapping;
            this.opt.json.configuration.horizontalGridNumLines = this.opt.json.configuration.horizontalGridNumLinesNonOverlapping;
            this.opt.json.legend.segment.yPos = this.opt.json.legend.segment.yPosNonOverlapping;
            this.opt.json.configuration.nonOverlapping = true;
        } else { //this._CENTERED
            this.opt.json.configuration.sequenceLineY = this.opt.json.configuration.sequenceLineYCentered;
            this.opt.json.configuration.sizeY = this.opt.json.configuration.sizeYCentered;
            this.opt.json.configuration.verticalGridLineLength = this.opt.json.configuration.verticalGridLineLengthCentered;
            this.opt.json.configuration.horizontalGridNumLines = this.opt.json.configuration.horizontalGridNumLinesCentered;
            this.opt.json.legend.segment.yPos = this.opt.json.legend.segment.yPosCentered;
            this.opt.json.configuration.nonOverlapping = false;
        }
        for (var i = 0; i < this.opt.json.featuresArray.length; i++) {
            var elem = this.opt.json.featuresArray[i];
            if (newStyle == this._ROWS) {
                elem.cy = elem.rowsStyle.y;
                elem.y = elem.rowsStyle.y;
                elem.height = elem.rowsStyle.heightOrRadius;
                elem.r = elem.rowsStyle.heightOrRadius;
            } else if (newStyle == this._NON_OVERLAPPING) {
                elem.cy = elem.nonOverlappingStyle.y;
                elem.y = elem.nonOverlappingStyle.y;
                elem.height = elem.nonOverlappingStyle.heightOrRadius;
                elem.r = elem.nonOverlappingStyle.heightOrRadius;
            } else { //this._CENTERED
                elem.cy = elem.centeredStyle.y;
                elem.y = elem.centeredStyle.y;
                elem.height = elem.centeredStyle.heightOrRadius;
                elem.r = elem.centeredStyle.heightOrRadius;
            }
        }
        for (var i = 0; i < this.opt.json.legend.key.length; i++) {
            var elem = this.opt.json.legend.key[i].shape;
            if (newStyle == this._ROWS) {
                this.opt.json.legend.key[i].label.yPos = this.opt.json.legend.key[i].label.yPosRows;
                elem.cy = elem.rowsStyle.y;
                elem.y = elem.rowsStyle.y;
                elem.height = elem.rowsStyle.heightOrRadius;
                elem.r = elem.rowsStyle.heightOrRadius;
            } else if (newStyle == this._NON_OVERLAPPING) {
                this.opt.json.legend.key[i].label.yPos = this.opt.json.legend.key[i].label.yPosNonOverlapping;
                elem.cy = elem.nonOverlappingStyle.y;
                elem.y = elem.nonOverlappingStyle.y;
                elem.height = elem.nonOverlappingStyle.heightOrRadius;
                elem.r = elem.nonOverlappingStyle.heightOrRadius;
            } else { //this._CENTERED
                this.opt.json.legend.key[i].label.yPos = this.opt.json.legend.key[i].label.yPosCentered;
                elem.cy = elem.centeredStyle.y;
                elem.y = elem.centeredStyle.y;
                elem.height = elem.centeredStyle.heightOrRadius;
                elem.r = elem.centeredStyle.heightOrRadius;
            }
        }
    },
    
    initRaphael: function(){
    	//var uniprotFeaturePainter_el;

    	/*
    	 * Creates an hexagon <_>  (from top to bottom)
    	 * x, y: coordinates of the top vertex
    	 * size: size of the internal square
    	 */
    	Raphael.fn.uniprotFeaturePainter_hexagon = function(x, y, size) {
    	    x = x - (size/2);
    	    var path = ["M", x, y];
    	    path = path.concat(["L", x-size, y+(size/2)]);
    	    path = path.concat(["L", x, y+size]);
    	    path = path.concat(["L", x+size, y+size]);
    	    path = path.concat(["L", x+size+size, y+(size/2)]);
    	    path = path.concat(["L", x+size, y]);
    	    return this.path(path.concat(["Z"]).join(" "));
    	};
    	/*
    	 * Creates a triangle /_\  (fro top to bottom)
    	 * x, y: coordinates of the top vertex
    	 * size: size of the bottom edge
    	 */
    	Raphael.fn.uniprotFeaturePainter_triangle = function(x, y, size) {
    	        var path = ["M", x, y];
    	        path = path.concat(["L", (x + size / 2), (y + size)]);
    	        path = path.concat(["L", (x - size / 2), (y + size)]);
    	        return this.path(path.concat(["Z"]).join(" "));
    	};
    	/*
    	 * Creates a wave (from top to bottom)
    	 *  /\/\
    	 * |/\/\|
    	 * x, y: coordinates of the lowest top centered vertex /\./\
    	 * size: size of the bottom edge of the sub-triangles /_\
    	 */
    	Raphael.fn.uniprotFeaturePainter_wave = function(x, y, size) {
    		var path = ["M", x, y];
    		path = path.concat(["L", x-(size/2), y-size]); // \
    		path = path.concat(["L", x-size, y]); // /
    		path = path.concat(["L", x-size, y+size]); // |
    		path = path.concat(["L", x-(size/2), y+(size/2)]); // /
    		path = path.concat(["L", x, y+size]); // \ first wave
    		path = path.concat(["L", x+(size/2), y+(size/2)]); // /
    		path = path.concat(["L", x+size, y+size]); // \
    		path = path.concat(["L", x+size, y]); // |
    		path = path.concat(["L", x+(size/2), y-size]); // \
    		return this.path(path.concat(["Z"]).join(" "));
    	}
    	/*
    	 * Creates a diamond (from top to bottom)
    	 * x, y: coordinates of the top vertex
    	 * r: radius from the center
    	 */
    	Raphael.fn.uniprotFeaturePainter_diamond = function(x, y, r) {
    		var path = ["M", x, y];
    		path = path.concat(["L", x-r, y+r]);
    		path = path.concat(["L", x, y+(r*2)]);
    		path = path.concat(["L", x+r, y+r]);
    		return (this.path(path.concat(["Z"].join(" "))));
    	}
    	/*
    	 * Creates an N path
    	 * x, y: coordinates of the letter (as it would be painted as a String)
    	 * width
    	 * height
    	 */
    	Raphael.fn.uniprotFeaturePainter_NPath = function(x, y, width, height) {
    	    var path = ["M", (x-width),(y+height)];
    	    path = path.concat(["L", (x-width), y]);
    	    path = path.concat(["L", (x+width), (y+height-1)]);
    	    path = path.concat(["L", (x+width),(y-1)]);
    		return (this.path(path));
    	}
    	/*
    	 * Creates an O path
    	 * x, y: coordinates of the letter (as it would be painted as a String)
    	 * width
    	 * height
    	 */
    	Raphael.fn.uniprotFeaturePainter_OPath = function(x, y, width, height) {
    	    var path = ["M", (x), (y)];
    		path = path.concat(["C", (x-width), (y), (x-width), (y+height), (x), (y+height)]);
    		path = path.concat(["M", (x), (y)]);
    		path = path.concat(["C", (x+width), (y), (x+width), (y+height), (x), (y+height)]);
    		return (this.path(path));
    	}
    	/*
    	 * Creates a C path
    	 * x, y: coordinates of the letter (as it would be painted as a String)
    	 * width
    	 * height
    	 */
    	Raphael.fn.uniprotFeaturePainter_CPath = function(x, y, width, height) {
    	    var path = ["M", (x+width), (y)];
    		path = path.concat(["C", (x-width), (y), (x-width), (y+height), (x+width), (y+height)]);
    		return (this.path(path));
    	}
    	/*
    	 * Creates a C-O-N path
    	 * x, y: coordinates of the letter (as it would be painted as a String)
    	 * width
    	 * height
    	 */
    	Raphael.fn.uniprotFeaturePainter_CONPath = function(x, y, width, height, space) {
    	    //C
    	    var path = ["M", (x-width-space), (y)];
    		path = path.concat(["C", (x-width-space-(width*2)), (y), (x-width-space-(width*2)), (y+height), (x-width-space), (y+height)]);
    		//-
    		path = path.concat(["M", (x-width-space+1), (y+height/2)]);
    		path = path.concat(["L", (x-width-1), (y+height/2)]);
    		//O
    		path = path.concat(["M", (x), (y)]);
    		path = path.concat(["C", (x-width), (y), (x-width), (y+height), (x), (y+height)]);
    		path = path.concat(["M", (x), (y)]);
    		path = path.concat(["C", (x+width), (y), (x+width), (y+height), (x), (y+height)]);
    		//-
    		path = path.concat(["M", (x+width+1), (y+height/2)]);
    		path = path.concat(["L", (x+width+space-1), (y+height/2)]);
    		//N
    		path = path.concat(["M", (x+width+space), (y+height)]);
    		path = path.concat(["L", (x+width+space), y-2]);
    		path = path.concat(["L", (x+width*3+space), (y+height)]);
    		path = path.concat(["L", (x+width*3+space), (y-2)]);
    		return (this.path(path));
    	}
    	/*
    	 * Creates a dynamic connection (from http://raphaeljs.com/graffle.html)
    	 */
    	Raphael.fn.uniprotFeaturePainter_connection = function (obj1, obj2, line, bg) {
    	    //console.log('connection');
    	    //console.log(obj1);
    	    //console.log(obj2);
    	    if (obj1.line && obj1.from && obj1.to) {
    	        //console.log('if');
    	        line = obj1;
    	        obj1 = line.from;
    	        obj2 = line.to;
    	    }
    	    var bb1 = obj1.getBBox(); //console.log('bb1'); console.log(bb1);
    	    if ((!bb1.x) && (obj1.type == "circle")) { //it should not be necessary but it fails to get the BBox the first time the widget is called by ajax
    	        //console.log('!bb1 and circle');
    	        bb1 = {height: obj1.attrs.r*2, width: obj1.attrs.r*2, x: obj1.attrs.cx-obj1.attrs.r, y:obj1.attrs.cy-obj1.attrs.r};
    	        //console.log(bb1);
    	    }
    	    var bb2 = obj2.getBBox(); //console.log('bb2'); //console.log(bb2);
    	    if ((!bb2.x) && (obj2.type == "circle")) { //it should not be necessary but it fails to get the BBox the first time the widget is called by ajax
    	        //console.log('!bb2 and circle');
    	        bb2 = {height: obj2.attrs.r*2, width: obj2.attrs.r*2, x: obj2.attrs.cx-obj2.attrs.r, y:obj2.attrs.cy-obj2.attrs.r};
    	        //console.log(bb1);
    	    }
    	    var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
    	        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
    	        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
    	        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
    	        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
    	        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
    	        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
    	        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
    	        d = {}, dis = [];
    	    //console.log('p'); console.log(p);
    	    for (var i = 0; i < 4; i++) {
    	        for (var j = 4; j < 8; j++) {
    	            var dx = Math.abs(p[i].x - p[j].x),
    	                dy = Math.abs(p[i].y - p[j].y);
    	            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
    	                dis.push(dx + dy);
    	                d[dis[dis.length - 1]] = [i, j];
    	            }
    	        }
    	    }
    	    if (dis.length == 0) {
    	        var res = [0, 4];
    	    } else {
    	        res = d[Math.min.apply(Math, dis)];
    	    }
    	    var x1 = p[res[0]].x,
    	        y1 = p[res[0]].y,
    	        x4 = p[res[1]].x,
    	        y4 = p[res[1]].y;
    	    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    	    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    	    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
    	        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
    	        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
    	        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    	    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    	    if (line && line.line) {
    	        line.bg && line.bg.attr({path: path});
    	        line.line.attr({path: path});
    	    } else {
    	        var color = typeof line == "string" ? line : "#000";
    	        return {
    	            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
    	            line: this.path(path).attr({stroke: color, fill: "none"}),
    	            from: obj1,
    	            to: obj2
    	        };
    	    }
    	};
    }
    
    
    
});