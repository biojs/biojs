/**
 *
 * This component takes a JSON data object and paints it as a Raphael object.
 * The expected JSON format is specified under the option 'json' of the FeatureViewer options.
 *
 * Please remember to use jQuery in <a href="http://docs.jquery.com/Using_jQuery_with_Other_Libraries">compatibility mode</a>, particularly a good idea if you use other libraries.
 *
 * If you are using JQuery 1.9.x please make sure you also include the jQuery Migrate plugin
 * as tooltips are not compatible with 1.9.x versions, see <a href="http://jquery.com/upgrade-guide/1.9/">http://jquery.com/upgrade-guide/1.9/</a>
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:ljgarcia@ebi.ac.uk">Leyla Jael Garcia Castro</a>, <a href="mailto:gyachdav@gmail.com">Guy Yachdav</a>, <a href="mailto:pmoreno@ebi.ac.uk">Pablo Moreno</a>
 * @version 1.1.0
 * @category 0
 *
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.min.js/'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 *
 * @requires jQuery UI 1.8.2
 * @dependency <script src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
 *
 * @requires jQuery UI CSS 1.8.2
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 *
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.js'>jQuery.tooltip</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery.tooltip.js"></script>
 *
 * @requires <a href='http://jquery.bassistance.de/tooltip/jquery.tooltip.css'>jQuery.tooltip CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery.tooltip.css"/>
 *
 * @requires Raphael 2.1.2
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael-2.1.2.js"></script>
 *
 * @requires <a href='http://code.google.com/p/canvg/source/browse/trunk/canvg.js'>canvg</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/canvg.js"></script>
 *
 * @requires <a href='http://code.google.com/p/canvg/source/browse/trunk/rgbcolor.js'>rgbcolor</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/rgbcolor.js"></script>
 *
 * @requires Image ui-bg_flat_0_aaaaaa_40x100.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_flat_0_aaaaaa_40x100.png" />
 *
 * @requires Image ui-bg_flat_75_ffffff_40x100.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_flat_75_ffffff_40x100.png" />
 *
 * @requires Image ui-bg_glass_65_ffffff_1x400.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_glass_65_ffffff_1x400.png" />
 *
 * @requires Image ui-bg_glass_75_dadada_1x400.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_glass_75_dadada_1x400.png" />
 *
 * @requires ui-bg_glass_75_e6e6e6_1x400.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_glass_75_e6e6e6_1x400.png" />
 *
 * @requires ui-bg_highlight-soft_75_cccccc_1x100.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-bg_highlight-soft_75_cccccc_1x100.png" />
 *
 * @requires ui-icons_222222_256x240.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-icons_222222_256x240.png" />
 *
 * @requires ui-icons_454545_256x240.png (base theme images for jquery-ui-1.8.2)
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/images/ui-icons_454545_256x240.png" />
 *
 * @param {Object} options An object with the options for FeatureViewer component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} json
 *    The JSON object describing the configuration, features, and legend to be displayed.
 *    It must have the following members:
 *       <ul>
 *          <li>segment | <span class="dataType">{string}</span>
 *          	<p>Segment, accession or identification.<p>
 *          </li>
 *          <li>configuration | <span class="dataType">{object}</span>
 *              <p>
 *              General configuration used mainly to paint the ruler, grid lines, and slider.
 *              Elements such as XXXNonOverlapping, XXXCentered, and XXXRows are necessary only it you want to enable changing styles without retrieving the data
 *              from the server again.
 *              </p>
 *              <pre class="brush: js" title="Configuration object">
 *                 aboveRuler: &lt;int&gt;, //pixels above the ruler
 *                 belowRuler: &lt;int&gt;, //pixels below the ruler
 *                 dasReference: &lt;String&gt;, //das reference URL
 *                 dasSources: &lt;String&gt;, //das annotations URLs separated by commas
 *                 gridLineHeight: &lt;int&gt;, //row height (used for rows and nonOverlapping styles)
 *                 horizontalGrid: &lt;boolean&gt;, //should horizontal grid lines be displayed?
 *                 horizontalGridNumLines: &lt;int&gt;, //number of horizontal grid lines
 *                 leftMargin: &lt;int&gt;, //pixels for the holder&#39;s left margin
 *                 nonOverlapping: &lt;boolean&gt;, //is nonOverlapping style requested?
 *                 pixelsDivision: &lt;int&gt;, //number of pixels between every main division in the ruler
 *                 requestedStart: &lt;int&gt;, //requested start position
 *                 requestedStop: &lt;int&gt;, //requested stop position
 *                 rightMargin: &lt;int&gt;, //pixels for the holder&#39;s right margin
 *                 rulerLength: &lt;int&gt;, //ruler length in pixels
 *                 rulerY: &lt;int&gt;, //ruler y position in pixels
 *                 sequenceLength: &lt;int&gt;, //sequence length (number of amino acids)
 *                 sequenceLineY: &lt;int&gt;, //sequence line y position (blue line representing the sequence)
 *                 sizeX: &lt;int&gt;, //holder&#39;s width in pixels
 *                 sizeY: &lt;int&gt;, //holder&#39;s height in pixels
 *                 sizeYKey: &lt;int&gt;, //key holder&#39;s height in pixels
 *                 start: &lt;int&gt;, //first amino acid to show
 *                 stop: &lt;int&gt;, //last amino acid to show
 *                 style: &lt;String&gt;, // style in use from centered, rows, or nonOverlapping
 *                 unitSize: &lt;int&gt;, //number of pixels used to represent one amino acid
 *                 verticalGrid: &lt;boolean&gt; //are vertical grid lines displayed?
 *                 verticalGridLineLength: &lt;int&gt; //vertical grid lines&#39; length
 *                 horizontalGridNumLinesCentered: &lt;int&gt;, //number of horizontal grid line for the centered style
 *                 horizontalGridNumLinesNonOverlapping: &lt;int&gt;, //number of horizontal grid line for the nonOverlapping style
 *                 horizontalGridNumLinesRows: &lt;int&gt;, //number of horizontal grid line for the rows style
 *                 sequenceLineYCentered: &lt;int&gt;, //sequence line y position for centered style (blue line representing the sequence)
 *                 sequenceLineYNonOverlapping: &lt;int&gt;, //sequence line y position for nonOverlapping style (blue line representing the sequence)
 *                 sequenceLineYRows: &lt;int&gt;, //sequence line y position for rows style (blue line representing the sequence)
 *                 sizeYCentered: &lt;int&gt;, //holder&#39;s height in pixels for the centered style
 *                 sizeYNonOverlapping: &lt;int&gt;, //holder&#39;s height in pixels for the nonOverlapping style
 *                 sizeYRows: &lt;int&gt;, //holder&#39;s height in pixels for the rows style
 *                 verticalGridLineLengthCentered: &lt;int&gt; //vertical grid lines&#39; length for the centered style
 *                 verticalGridLineLengthNonOverlapping: &lt;int&gt; //vertical grid lines&#39; length for the nonOverlapping style
 *                 verticalGridLineLengthRows: &lt;int&gt; //vertical grid lines&#39; length for the rows style
 *          	</pre>
 *          </li>
 *          <li>featuresArray | <span class="dataType">{Array}</span>
 *              <p>Each element corresponds to an annotation, it includes elements representing the annotation itself as well as elements representing
 *                 the SVG properties, <em>i.e.</em> those related to the shape. Elements such as XXXNonOverlapping, XXXCentered, and XXXRows are necessary
 *                 only it you want to enable changing styles without retrieving the data from the server again
 *              </p>
 *              <pre class="brush: js" title="featuresArray object">
 *                 cx: &lt;int&gt; //shape x position (for all shapes but rectangles)
 *                 cy: &lt;int&gt; //shape y position (for all shapes but rectangles)
 *                 evidenceCode: &lt;String&gt;, //annotation evidence code, e.g. &quot;ECO:0000001&quot;
 *                 evidenceText: &lt;String&gt;, //annotation evidence text, e.g. &quot;inferred by curator&quot;
 *                 featureEnd: &lt;int&gt; //annotation stop
 *                 featureId: &lt;String&gt; //annotation id, e.g. &quot;UNIPROTKB_P05067_SIGNAL_1_17&quot;
 *                 featureLabel: &lt;String&gt; //annotation label, e.g. &quot;Signal&quot;
 *                 featureStart: &lt;int&gt; //annotation start
 *                 featureTypeLabel: &lt;String&gt; //annotation type label, e.g. &quot;signal_peptide&quot;
 *                 fill: &lt;hexa color&gt; //e.g. &quot;#AA8CF0&quot;
 *                 fillOpacity: &lt;float&gt; //transparency, e.g. 0.5
 *                 height: &lt;int&gt; //shape&#39;s height in pixels (for rectangles)
 *                 path: &lt;String&gt; //shape path (empty if it is not a path)
 *                 r: &lt;radius&gt; //shape&#39;s radius in pixels (all but rectangles)
 *                 stroke: &lt;hexa color&gt; //e.g. #AA8CF0&quot;
 *                 strokeWidth: &lt;int&gt; //stroke width
 *                 text: &lt;String&gt; //for shapes corresponding to text
 *                 type: &lt;String&gt; //shape type (one of: rect, triangle, circle, diamond, wave, hexagon)
 *                 typeCategory: &lt;String&gt;, //type category, e.g. domain
 *                 typeCode: &lt;String&gt; //annotation controlled vocabulary id, e.g. &quot;SO:0000418&quot;
 *                 typeLabel: &lt;String&gt; //annotation label to be displayed in the tool tip
 *                 width: &lt;int&gt; //shape&#39;s width in pixels
 *                 x: &lt;int&gt; //shape x position in pixels
 *                 y: &lt;int&gt; //shape y position in pixels
 *                 centeredStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the centered style
 *                 nonOverlappingStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the nonOverlapping style
 *                 rowsStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the rows style
 *             </pre>
 *          </li>
 *          <li>legend | <span class="dataType">{object}</span>
 *          	<p>Information to be displayed in the keyElements such as XXXNonOverlapping, XXXCentered, and XXXRows are necessary only it you want to enable changing
 *                 styles without retrieving the data from the server again.
 *              </p>
 *              <pre class="brush: js" title="Legend object">
 *                 key: &lt;Array{label object, shape object}&gt; //annotation types with the number of features showed in the segment
 *                 segment: &lt;Object&gt; //requested segment without the limits, just the identifier or accession
 *              </pre>
 *              <p>Detail for elements in the key array</p>
 *              <pre class="brush: js" title="legend.key object">
 *                 label: &lt;Object&gt;, //
 *                 text: &lt;String&gt; //annotation type name
 *                 total: &lt;int&gt; //total annotations displayed for that type
 *                 xPos: &lt;int&gt; //x position in pixels
 *                 yPos: &lt;int&gt; //y position in pixels
 *                 yPosCentered: &lt;int&gt; //y position in pixels for the centered style
 *                 yPosNonOverlapping: &lt;int&gt; //y position in pixels for the nonOverlapping style
 *                 yPosRows: &lt;int&gt; //y position in pixels for the rows style
 *                 shape: &lt;Object&gt; //corresponding shape
 *                 cx:  &lt;int&gt; //shape x position (for all shapes but rectangles)
 *                 cy: &lt;int&gt; //shape y position (for all shapes but rectangles)
 *                 fill: &lt;hexa color&gt; //e.g. &quot;#AA8CF0&quot;
 *                 fillOpacity: &lt;float&gt; //transparency, e.g. 0.5
 *                 height: &lt;int&gt; //shape&#39;s height in pixels (for rectangles)
 *                 path: &lt;String&gt; //shape path (empty if it is not a path)
 *                 r: &lt;radius&gt; //shape&#39;s radius height in pixels (all but rectangles)
 *                 stroke: &lt;hexa color&gt; //e.g. #AA8CF0&quot;
 *                 strokeWidth: &lt;int&gt; //stroke width
 *                 text: &lt;String&gt; //for shapes corresponding to text
 *                 type: &lt;String&gt; //shape type (one of: rect, triangle, circle, diamond, wave, hexagon)
 *                 typeLabel: &lt;String&gt; //annotation type name
 *                 width: &lt;int&gt; //shape&#39;s width in pixels
 *                 x: &lt;int&gt; //shape x position in pixels (it is probably a good idea to keep both cx and x, even for non-rectangles)
 *                 y: &lt;int&gt; //shape y position in pixels (it is probably a good idea to keep both cy and y, even for non-rectangles)
 *                 centeredStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the centered style
 *                 nonOverlappingStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the nonOverlapping style
 *                 rowsStyle: &lt;Object&gt;, //{&quot;heightOrRadius&quot;:&lt;int&gt;,&quot;y&quot;:&lt;int&gt;} height and y position for the rows style
 *              </pre>
 *              <p>Detail for the segment element</p>
 *              <pre class="brush: js" title="legend.segment object">
 *                 text: &lt;String&gt;, //Accession or identifier, e.g. A4_HUMAN
 *                 xPos: &lt;int&gt;, //x position in pixels
 *                 yPos: &lt;int&gt;, //y position in pixels
 *                 yPosCentered:&lt;int&gt;, //y position in pixels for the centered style
 *                 yPosNonOverlapping:&lt;int&gt;, //y position in pixels for the nonOverlapping style
 *                 yPosRows:&lt;int&gt;, //y position in pixels for the rows style
 *             </pre>
 *          </li>
 *   </ul>
 *
 * @option {boolean} [showSlider=true]
 *    Should the slider for zooming be displayed?
 *
 * @option {boolean} [showPrintButton=true]
 *    Should the button for printing/exporting to image be displayed?
 *
 * @option {boolean} [showFeatureTooltipOnMouseOver=true]
 *    Should the tooltip for features be displayed?
 *
 * @option {boolean} [highlightFeatureOnMouseOver=true]
 *    Should the features be highlighted when mouse over?
 *
 * @option {boolean} [selectFeatureOnMouseClick=true]
 *    Should the features remain highlighted, i.e. being selected, after a mouse click,
 *    and deselected after a second click or whenever other feature is selected?
 *
 * @option {boolean} [dragSites=true]
 *    Should the sites be draggable?
 *
 * @option {String} [selectionColor=#ff8c00]
 *    Color in hexa format so the features on mouse-over and click will change to it.
 *    Make sure it does not exist at http://wwwdev.ebi.ac.uk/das-srv/uniprot/das/uniprot/stylesheet as those are the reference colours for protein features.
 *
 * @example
 * var json = {
 *     "featuresArray":[
 *         {
 *             "nonOverlappingStyle":{"heightOrRadius":10,"y":56},"type":"rect","featureEnd":73,"fillOpacity":0.5
 *             ,"evidenceText":"UniProt","stroke":"#9B7057","height":10,"path":"","typeLabel":"Propeptide"
 *             ,"featureLabel":"Propeptide","featureStart":1,"strokeWidth":1,"text":""
 *             ,"centeredStyle":{"heightOrRadius":44,"y":73},"fill":"#9B7057","width":495
 *             ,"typeCategory":"Molecule processing","typeCode":"SO:0001062","cy":56,"cx":27,"evidenceCode":""
 *             ,"r":10,"featureId":"UNIPROTKB_Q8LAX3_PROPEP_1_73","rowsStyle":{"heightOrRadius":10,"y":169}
 *             ,"featureTypeLabel":"propeptide","y":56,"x":27
 *          }
 *         ,{
 *             "nonOverlappingStyle":{"heightOrRadius":10,"y":56},"type":"rect","featureEnd":96,"fillOpacity":0.5
 *             ,"evidenceText":"UniProt","stroke":"#7DBAA4","height":10,"path":"","typeLabel":"Peptide"
 *             ,"featureLabel":"Elicitor peptide 3","featureStart":74,"strokeWidth":1,"text":""
 *             ,"centeredStyle":{"heightOrRadius":40,"y":75},"fill":"#7DBAA4","width":151
 *             ,"typeCategory":"Molecule processing","typeCode":"SO:0001064","cy":56,"cx":529,"evidenceCode":""
 *             ,"r":10,"featureId":"UNIPROTKB_Q8LAX3_PEPTIDE_74_96","rowsStyle":{"heightOrRadius":10,"y":157}
 *             ,"featureTypeLabel":"active_peptide","y":56,"x":529
 *         }
 *     ]
 *     ,"segment":"Q8LAx3"
 *     ,"legend":{
 *         "segment":{"yPosCentered":190,"text":"Q8LAX3","yPos":106,"xPos":15,"yPosNonOverlapping":106,"yPosRows":290}
 *         ,"key":[
 *             {
 *                 "label":{
 *                     "total":"1","yPosCentered":210,"text":"Peptide","yPos":126,"xPos":50
 *                     ,"yPosNonOverlapping":126,"yPosRows":310
 *                 }
 *                 ,"shape":{
 *                     "centeredStyle":{"heightOrRadius":5,"y":208},"text":""
 *                     ,"nonOverlappingStyle":{"heightOrRadius":5,"y":121},"width":30,"fill":"#7DBAA4"
 *                     ,"cy":121,"cx":15,"type":"rect","fillOpacity":0.5,"stroke":"#7DBAA4","height":5,"r":10
 *                     ,"path":"","rowsStyle":{"heightOrRadius":5,"y":305},"typeLabel":"Peptide","y":121
 *                     ,"strokeWidth":1,"x":15
 *                 }
 *             }
 *             ,{
 *                 "label":{
 *                     "total":"1","yPosCentered":210,"text":"Propeptide","yPos":126,"xPos":205
 *                     ,"yPosNonOverlapping":126,"yPosRows":310
 *                 }
 *                 ,"shape":{
 *                     "centeredStyle":{"heightOrRadius":5,"y":208},"text":""
 *                     ,"nonOverlappingStyle":{"heightOrRadius":5,"y":121},"width":30,"fill":"#9B7057"
 *                     ,"cy":121,"cx":170,"type":"rect","fillOpacity":0.5,"stroke":"#9B7057","height":5,"r":10
 *                     ,"path":"","rowsStyle":{"heightOrRadius":5,"y":305},"typeLabel":"Propeptide","y":121
 *                     ,"strokeWidth":1,"x":170
 *                 }
 *             }
 *         ]
 *     }
 *     ,"configuration":{
 *         "requestedStop":96,"horizontalGridNumLines":2,"sequenceLineYCentered":95,"requestedStart":1
 *         ,"gridLineHeight":12,"rightMargin":20,"belowRuler":30,"sequenceLength":96
 *         ,"horizontalGridNumLinesNonOverlapping":2,"horizontalGridNumLinesCentered":6
 *         ,"verticalGridLineLengthRows":284,"unitSize":6.875,"sizeYNonOverlapping":76,"style":"nonOverlapping"
 *         ,"sequenceLineYRows":155,"sequenceLineY":54,"verticalGrid":false,"rulerY":20
 *         ,"dasSources":"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot","horizontalGrid":false
 *         ,"pixelsDivision":50,"sizeY":76,"sizeX":700
 *         ,"dasReference":"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot","sizeYRows":260,"aboveRuler":10
 *         ,"rulerLength":660,"verticalGridLineLengthNonOverlapping":66,"sizeYKey":210,"sizeYCentered":160
 *         ,"sequenceLineYNonOverlapping":54,"verticalGridLineLength":66,"horizontalGridNumLinesRows":8
 *         ,"leftMargin":20,"nonOverlapping":true,"verticalGridLineLengthCentered":172
 *     }
 * };
 *
 * var myPainter = new Biojs.FeatureViewer({
 *    target: "YourOwnDivId",
 *    json: json
 * });
 *
 */
Biojs.FeatureViewer = Biojs.extend(
    /** @lends Biojs.FeatureViewer */
    {
        /*
         * Public variables
         */
        raphael: '',
        connections: [],
        zoomSlider: '',
        slider_stop: 0,
        slider_start: 0,
        context: '',
        instance: undefined,
        /*
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
        _previousClickedColor: "",
        _previousClickedFillColor: "",
        _previousClickedShape: "",
        _previousClickedFeature: "",
        _clickCounter: 0,

        /**
         * Default values for the options
         * @name Biojs.FeatureViewer-constructor
         */
        constructor: function(options) {
            //Biojs.console.enable();
            //jQuery.noConflict();
            Biojs_FeatureViewer_array.push(this);
            this.instance = Biojs_FeatureViewer_array.length-1;
            Biojs_FeatureViewer_array[this.instance].opt.json = jQuery.extend(true, {}, this.opt.json);

            Biojs_FeatureViewer_array[this.instance].initRaphael();

            if (!Biojs.Utils.isEmpty(Biojs_FeatureViewer_array[this.instance].opt.json)) {
                Biojs_FeatureViewer_array[this.instance].paintFeatures(Biojs_FeatureViewer_array[this.instance].opt.json)
            }
        },

        /**
         * Default values for the options:
         * target: "",
         * json: {},
         * showSlider: true,
         * showPrintButton: true,
         * showFeatureTooltipOnMouseOver: true,
         * highlightFeatureOnMouseOver: true,
         * selectFeatureOnMouseClick: true,
         * dragSites: true //beware that dragging implies a click on so the click event will be raised!
         * selectionColor: "#ff8c00"
         * @name Biojs.FeatureViewer-opt
         */
        opt: {
            target: "YourOwnDivId",
            json: {},
            showSlider: true,
            showPrintButton: true,
            showFeatureTooltipOnMouseOver: true,
            highlightFeatureOnMouseOver: true,
            selectFeatureOnMouseClick: true,
            dragSites: true,
            selectionColor: "#ff8c00" //make sure it does not exist at http://wwwdev.ebi.ac.uk/das-srv/uniprot/das/uniprot/stylesheet
        },

        /**
         * Array containing the supported event names
         * @name Biojs.FeatureViewer-eventTypes
         */
        eventTypes: [
        /**
         * @name Biojs.FeatureViewer#onFeatureClick
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {Object} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * //It is not recommended to use this event to highlight and sustain that highlight after a click on a
         * //feature, instead set to ture the options selectFeatureOnMouseClick.
         * myPainter.onFeatureClick(
         *    function( obj ) {
	         *    var tooltip = obj.featureLabel +
	         *          " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
	         *          "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
	         *          "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
	         *       alert("Clicked: " + tooltip );
	         *       Biojs.console.log(obj.shape); //rapha�l object
	         *    }
         * );
         *
         * */
            "onFeatureClick",
        /**
         * @name Biojs.FeatureViewer#onFeatureOn
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {Object} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * // It is not recommended to use this event to display a tooltip or highlight the features on mouse over,
         * // instead set to true the options showFeatureTooltipOnMouseOver and highlightFeatureOnMouseOver
         *
         * myPainter.onFeatureOn(
         *    function( obj ) {
	         *    var tooltip = obj.featureLabel +
	         *           " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
	         *           "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
	         *           "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
	         *       alert("On feature: " + tooltip );
	         *       Biojs.console.log(obj.shape); //rapha�l object
	         *    }
         * );
         *
         * */
            "onFeatureOn",
        /**
         * @name Biojs.FeatureViewer#onFeatureOff
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {Object} featureInfo A json object with the information for the selected feature, including id.
         * @example
         *
         * myPainter.onFeatureOff(
         *    function( obj ) {
	         *    var tooltip = obj.featureLabel +
	         *           " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
	         *           "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
	         *           "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
	         *       alert("Off feature: " + tooltip );
	         *       Biojs.console.log(obj.shape); //rapha�l object
	         *    }
         * );
         *
         * */
            "onFeatureOff",
        /**
         * @name Biojs.FeatureViewer#onFeatureSelected
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {Object} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * //Will only be raised if selectFeatureOnMouseClick is true
         * myPainter.onFeatureSelected(
         *    function( obj ) {
	         *    var tooltip = obj.featureLabel +
	         *           " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
	         *           "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
	         *           "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
	         *       alert("Selected feature: " + tooltip );
	         *       Biojs.console.log(obj.shape); //rapha�l object
	         *    }
         * );
         *
         * */
            "onFeatureSelected",
        /**
         * @name Biojs.FeatureViewer#onFeatureUnselected
         * @event
         * @param {function} actionPerformed A function which receives a {@link Biojs.Event} object as argument.
         * @eventData {Object} source The component which triggered the event.
         * @eventData {string} type The name of the event.
         * @eventData {Object} featureInfo A json object with the information for the selected feature, including id.
         * @example
         * //Will only be raised if selectFeatureOnMouseClick is true
         * myPainter.onFeatureUnselected(
         *    function( obj ) {
	         *    var tooltip = obj.featureLabel +
	         *           " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
	         *           "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
	         *           "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
	         *       alert("Unselected feature: " + tooltip );
	         *       Biojs.console.log(obj.shape); //rapha�l object
	         *    }
         * );
         *
         * */
            "onFeatureUnselected"
        ],

        /**
         * Private: Finds an element within the target div for this component,
         * search is expanded to all descendants in the target.
         * @param {String} {idToFind} Element id
         * */
        _getElementWithinTarget: function(idToFind) {
            return jQuery("#"+this.opt.target).find("#"+idToFind);
        },

        /**
         * Private: Finds the first child element within the target div;
         * this element corresponds to the Raphaël canvas holder.
         * */
        _getHolder: function() {
            return jQuery('#'+this.opt.target).children("#uniprotFeaturePainter-holder")[0];
        },

        /**
         *
         * @param {string} newSelectionColor New selection color
         */
        setSelectionColor: function(newSelectionColor) {
            this.opt.selectionColor = newSelectionColor;
        },

        /**
         * Manual customization of vertical and horizontal grid lines as well as style.
         * Depending on the selected values for the style radio buttons and the vertical and horizontal
         * check buttons, this method changes the current style and adds/removes the gridlines.
         *
         * @example
         * myPainter.customize("centered",true,true);
         *
         * @param {string} rdbStyle Radio buttons grouping styles, possible values: nonOverlapping, rows, centered.
         * @param {boolean} chkHorizontal Check button for horizontal grid lines.
         * @param {boolean} chkVertical Check button for vertical grid lines.
         */
        customize: function(selectedStyle, paintHorizontalGrid, paintVerticalGrid) {
            var config = this.opt.json.configuration;

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
                var holder = this._getHolder();
                holder.innerHTML = "";
                holder.style.height = (config.sizeY+config.sizeYKey) + "px";
                holder.style.width = config.sizeX + "px";
                this.raphael = Raphael(holder, config.sizeX, config.sizeY+config.sizeYKey);
                this._repaint('withoutZoom');
            }
        },

        /**
         * Paint the features according to the values specified in the json object defined when creating the object.
         * This method initializes the holder, paints the slider and print button depending on the options, and
         * paints the features and legend.
         *
         * @example
         * myPainter.paintFeatures();
         *
         * @param {Object} [json] The json object describing the configuration, features, and legend to be displayed.
         */
        paintFeatures: function(json) {
            if ( json ) {
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
         * //It only works in Firefox or Chrome, IE may require a web service to handle this (which is not supported in this component).
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
                this.$imageExported = jQuery('<div id="uniprotFeaturePainter-imageExportedDiv"></div>')
                    .html('Image export is not supported for IE')
                    .dialog({
                        autoOpen: true,
                        title: 'Exported image',
                        modal: true,
                        width: config.sizeX+20
                    });
            } else {
                svg = this._getHolder().innerHTML;
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

        /**
         * Applies a zoom in or zoom out; it should not be used if the slider is available.
         *
         * @example
         * myPainter.zoom(2,10);
         *
         * @param init
         * @param end
         */
        zoom: function(init, end) {
            var config = this.opt.json.configuration;
            var sequenceLength = config.sequenceLength;
            if ((init >= 1) && (end <= sequenceLength)) {
                this._repaint(undefined, init, end);
            }
        },

        //
        // Private methods
        //
        /*
         * Private: Initializes the component.
         */
        _init: function() {
            //console.log(this.opt);
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

            var holder = this._getHolder();
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
            this.raphael = Raphael(holder, config.sizeX, config.sizeY+config.sizeYKey);
        },

        /**
         * Private: Clears all divs content.
         * @param {boolean} [withoutZoom=false] When true, it sets to 0 the total count for all feature types.
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
         */
        _paintSlider: function() {//holder size, left and right margins of the holder, and number of amino acids
            if (this.opt.showSlider == true) {
                var config = this.opt.json.configuration;
                var start = config.requestedStart;
                var stop = config.requestedStop;
                var sequenceLength = config.sequenceLength;
                var slider_div = this._getElementWithinTarget('uniprotFeaturePainter-slider');
                if (!slider_div) {
                    return;
                }

                this.slider_start = start;
                this.slider_stop = stop;
                slider_div.text('');
                slider_div.append('<label for="uniprotFeaturePainter-slider-values"></label>');
                slider_div.append('<div type="text" id="uniprotFeaturePainter-slider-values" style="margin-bottom:5px" />');
                var myself = this;
                this.zoomSlider = jQuery('<div id="uniprotFeaturePainter-slider-bar" style="width:300px"></div>').appendTo(slider_div);

                //console.log(jQuery('#uniprotFeaturePainter-slider-bar' ));

                this._getElementWithinTarget('uniprotFeaturePainter-slider-bar').slider({
                    range: true,
                    min: 1,
                    max: sequenceLength,
                    values: [start, stop],
                    slide: function(event, ui) {
                        myself._getElementWithinTarget('uniprotFeaturePainter-slider-values').html('Zoom - Start: '+ui.values[0] + ', End: ' + ui.values[1]);
                        slider_start = ui.values[0];
                        slider_stop = ui.values[1];
                    },
                    change: function(event, ui) {
                        myself._repaint(undefined, ui.values[0], ui.values[1]);
                    }
                });

                this._getElementWithinTarget('uniprotFeaturePainter-slider-values').html('Zoom - Start:' + start + ', End:' + stop);
            }
        },

        /**
         * Private: Repaints everything: ruler, shapes, and legend.
         * @param {boolean} [withoutZoom=false] When false, it zooms according to the slider values.
         * @param {int} [newStart] Zoom from this sequence start value.
         * @param {int} [newStop] Zoom to this sequence end value.
         * @ignore
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
         * @ignore
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
                    '<input type="button" value="Export to image" ' +
                    'onclick="Biojs_FeatureViewer_array['+this.instance+'].exportFeaturesToImage();"/>' +
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
         * @ignore
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
         * @ignore
         */
        _withButtonOnly: function (sizeX, sizeY, sizeYKey) {
            var text =
                '<table width="' + sizeX + 'px">' +
                    '<tr>' +
                    '<td valign="bottom" align="right">' +
                    '<div id="uniprotFeaturePainter-printButton">' +
                    '<input type="button" value="Export to image" ' +
                    'onclick="Biojs_FeatureViewer_array['+this.instance+'].exportFeaturesToImage();"/>' +
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
         * Private: click only rectangle event
         * @param myself this object is raising the event.
         * @param shapeRectangle Container for shapes, or the shape itself for rectangles.
         * @param obj feature object.
         * @param eventName Name of the event to be raised.
         * @ignore
         */
        _raiseEvent: function(myself, shapeRectangle, obj, eventName) {
            connection = myself.connections[shapeRectangle.connectionIndex-1];
            if (connection) {//will not enter if undefined in chrome and firefox
                try {
                    shapeRectangle = connection.from;
                } catch (error) {} //will be catched in IE
            }
            myself.raiseEvent(eventName, {
                featureId: obj.featureId,
                featureLabel: obj.featureLabel,
                featureStart: obj.featureStart,
                featureEnd: obj.featureEnd,
                featureTypeLabel: obj.featureTypeLabel,
                typeCode: obj.typeCode,
                typeCategory: obj.typeCategory,
                evidenceText: obj.evidenceText,
                evidenceCode: obj.evidenceCode,
                shape: shapeRectangle
            });
        },

        _featureClick: function(onlySelect, myself, raphaelObj, featureObj) {
            myself._clickCounter = myself._clickCounter + 1;
            if (onlySelect) {
                myself._originalColor = raphaelObj.attrs.stroke;
                myself._originalFillColor = raphaelObj.attrs.fill;
            } else {//both highlight and select
                if (myself._clickCounter > 1) {//mouse has not leave the feature (it is down now but up is true already
                    myself._originalColor = raphaelObj.attrs.stroke;
                    myself._originalFillColor = raphaelObj.attrs.fill;
                }
            }
            raphaelObj.animate({"fill-opacity": 1.0}, 500);
            if (raphaelObj == myself._previousClickedShape) {//the second click will deselect
                if (myself._originalColor == myself.opt.selectionColor) { //it is selected, will be deselected
                    myself._originalColor = myself._previousClickedColor;
                    myself._originalFillColor = myself._previousClickedFillColor;
                    raphaelObj.attr({stroke: myself._previousClickedColor, fill: myself._previousClickedFillColor});
                    //only select this.animate({"fill-opacity": 1.0}, 500);
                    featureObj.isSelected = false;
                    myself._raiseEvent(myself, raphaelObj, featureObj, 'onFeatureUnselected');
                } else { //it is deselected (even counter), will be selected
                    if (onlySelect || (myself._clickCounter%2 != 0)) {
                        raphaelObj.attr({stroke: myself.opt.selectionColor, fill: myself.opt.selectionColor});
                        raphaelObj.animate({"fill-opacity": 1.0}, 500);
                    }
                    featureObj.isSelected = true;
                    myself._raiseEvent(myself, raphaelObj, featureObj, 'onFeatureSelected');
                }
            } else {
                //deselect the previous feature
                if (myself._previousClickedShape && (myself._previousClickedShape != "")) {
                    try {
                        myself._previousClickedShape.attr({stroke: myself._previousClickedColor, fill: myself._previousClickedFillColor});
                        myself._previousClickedShape.animate({"fill-opacity": .5}, 500);
                        myself._previousClickedFeature.isSelected = false;
                        myself._raiseEvent(myself, myself._previousClickedShape, featureObj, 'onFeatureUnselected');
                    } catch (error) {Biojs.console.log(error);}
                }
                //keep the last clicked shape info
                myself._previousClickedColor = myself._originalColor;
                myself._previousClickedFillColor = myself._originalFillColor;
                myself._previousClickedShape = raphaelObj;
                myself._previousClickedFeature = featureObj;
                //change colour to highlight colour
                if (onlySelect) {
                    raphaelObj.attr({stroke: myself.opt.selectionColor, fill: myself.opt.selectionColor});
                    raphaelObj.animate({"fill-opacity": 1.0}, 500);
                } //else : it was already done by the hover function
                featureObj.isSelected = true;
                myself._raiseEvent(myself, raphaelObj, featureObj, 'onFeatureSelected');
            }
            //raise CLICK event
            myself._raiseEvent(myself, raphaelObj, featureObj, 'onFeatureClick');
        },

        /**
         * Private: Gets a JSON element representing SVG-features and creates a Rapha�l object and paints features;
         * it also adds tooltip and move, mousein, mouseout, and drag events for features.
         * @param {Object} obj SVG representation for features.
         * @param {int} sequenceLineY Y position for the sequence line.
         * @ignore
         */
        _paint: function(obj, sequenceLineY) {
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
            } else if (obj.type == "bridge") {
                shape = this.raphael.uniprotFeaturePainter_bridge(obj.cx, obj.cy, obj.width, obj.height);
                obj.fill = "none";
                shape.attr({
                    "fill": obj.fill,
                    "stroke": obj.stroke,
                    "fill-opacity": 0.0
                });
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
            if (obj.isSelected) {
                this._previousClickedShape = shape;
                this._previousClickedColor = shape.attrs.stroke;
                this._previousClickedFeature = obj;
                shape.attr({"fill": this.opt.selectionColor, "stroke": this.opt.selectionColor, "fill-opacity": this.opt.selectionColor});
            }
            if (sequenceLineY) {
                var myself = this;
                if (this.opt.selectFeatureOnMouseClick) {//events are the same for both shapes and rectangles
                    if (this.opt.highlightFeatureOnMouseOver) { //highlight, select, and raise both over and click events
                        _clickedShape = false;
                        shape.click(
                            function() {
                                _clickedShape = true;
                                myself._featureClick(false, myself, this, obj);
                            }
                        );
                        shape.hover(
                            function() {//on
                                myself._originalColor = shape.attrs.stroke;
                                myself._originalFillColor = shape.attrs.fill;
                                this.attr({stroke: myself.opt.selectionColor, fill: myself.opt.selectionColor});
                                this.animate({"fill-opacity": 1.0}, 500);
                                //raise ON event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOn');
                            },
                            function() {//off
                                if (!_clickedShape) { //return to the original colour
                                    this.attr({stroke: myself._originalColor, fill: myself._originalFillColor});
                                }
                                _clickedShape = false;
                                myself._clickCounter = 0;
                                this.animate({"fill-opacity": .5}, 500);
                                //raise OFF event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOff');
                            }
                        );
                    } else { //only select, and raise both over and click events
                        shape.click(
                            function() {
                                myself._featureClick(true, myself, this, obj);
                            }
                        );
                        shape.hover(
                            function() {//on
                                //raise ON event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOn');
                            },
                            function() {//off
                                this.animate({"fill-opacity": .5}, 500);
                                //raise OFF event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOff');
                            }
                        );
                    }
                } else {
                    if (this.opt.highlightFeatureOnMouseOver) { //only highlight, and raise both over and click events
                        shape.click(
                            function() {
                                //raise CLICK event
                                myself._raiseEvent(myself, this, obj, 'onFeatureClick');
                            }
                        );
                        shape.hover(
                            function() {//on
                                myself._originalColor = this.attrs.stroke;
                                myself._originalFillColor = shape.attrs.fill;
                                this.attr({stroke: myself.opt.selectionColor, fill: myself.opt.selectionColor});
                                this.animate({"fill-opacity": 1.0}, 500);
                                //raise ON event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOn');
                            },
                            function() {//off
                                this.attr({stroke: myself._originalColor, fill: myself._originalFillColor});
                                this.animate({"fill-opacity": .5}, 500);
                                //raise OFF event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOff');
                            }
                        );
                    } else { //raise both over and click events
                        shape.click(
                            function() {
                                //raise CLICK event
                                myself._raiseEvent(myself, this, obj, 'onFeatureClick');
                            }
                        );
                        shape.hover(
                            function() {//on
                                //raise ON event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOn');
                            },
                            function() {//off
                                //raise OFF event
                                myself._raiseEvent(myself, this, obj, 'onFeatureOff');
                            }
                        );
                    }
                }
                if ((obj.type != "rect") && ((obj.type != "bridge"))){ //shapes are movable and have a link to the sequence line
                    //dragging
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
                    } catch (err) {Biojs.console.log(err);}
                }
            }
            //tooltip
            if (this.opt.showFeatureTooltipOnMouseOver == true) {
                if (obj.featureId) {//only features in the sequence have tooltips
                    //console.log(obj);
                    //console.log(shape);
                    obj.featureId = obj.featureId.replace(/:|\./g, "_");
                    shape.node.id = "uniprotFeaturePainter_" + obj.featureId;
                    //shape.id = shape.node.id;
                    var tooltip = obj.featureLabel +
                        " (" + obj.featureStart + ", " + obj.featureEnd + "; length " + (obj.featureEnd-obj.featureStart+1) + ")" +
                        "<br/>Type: " + obj.featureTypeLabel + " - " + obj.typeCode + " - " + obj.typeCategory +
                        "<br/>Evidence: " + obj.evidenceText + " - " + obj.evidenceCode;
                    var myFeatureObj = myself._getElementWithinTarget("uniprotFeaturePainter_" + obj.featureId);
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
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
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
         * @ignore
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

        /**
         * @ignore
         **/
        initRaphael: function(){
            //var uniprotFeaturePainter_el;

            /*
             * Creates an hexagon <_>  (from top to bottom)
             * x, y: coordinates of the top vertex
             * size: size of the internal square
             */
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
            Raphael.fn.uniprotFeaturePainter_diamond = function(x, y, r) {
                var path = ["M", x, y];
                path = path.concat(["L", x-r, y+r]);
                path = path.concat(["L", x, y+(r*2)]);
                path = path.concat(["L", x+r, y+r]);
                return (this.path(path.concat(["Z"].join(" "))));
            }
            /**
             * Creates a bridge
             * @param x coordinate
             * @param y coordinate
             * @param width
             * @param height
             * @returns {*|Array}
             */
            Raphael.fn.uniprotFeaturePainter_bridge = function (x, y,  width, height) {
                //console.log(x,y,width, height);
                var path = ["M", x, y-1];
                path = path.concat(["L", x , y - 1 - height]);
                path = path.concat(["L", x + width , y - 1 - height ]);
                path = path.concat(["L", x+ width, y - 1 ]);
                return (this.path(path));
            }
            /*
             * Creates an N path
             * x, y: coordinates of the letter (as it would be painted as a String)
             * width
             * height
             */
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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
            /**
             * @ignore
             **/
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

var Biojs_FeatureViewer_array = new Array();
