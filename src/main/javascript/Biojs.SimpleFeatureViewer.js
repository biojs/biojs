/**
 * This component generates the JSON structure used by the FeatureViewer. It is a simplified version as it only
 * includes a non-overlapping view. Regions are represented as rectangles while one-base/aa are represented as lines.
 * Some few shapes are also supported for one-base/aa features, particularly{"diamond", "triangle", "hexagon",
 * "wave", "circle"}. In proteins, we recommend "diamond" for active sites, "triangle" for PTMs, "hexagon" for glycosylation,
 * "wave" for lipids, and "circle" for metals. Any other shape will be rendered as a rectangle. Bridges can be specified
 * with the type "bridge".
 * The legend is generated based on the first feature of each "typeLabel"; thus, if features with the same "typeLabel"
 * have different colours, only the first one will be used in the legend.
 *
 * @class
 * @extends Biojs.FeatureViewer
 *
 * @author <a href="mailto:ljgarcia@ebi.ac.uk">Leyla Jael Garcia Castro</a>
 * @version 1.0.0
 * @category 2
 *
 *
 * @param {Object} options An object with the options for SimpleFeatureViewer component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
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
 * @option {String} [selectionColor=#ff8c00]
 *    Color in hexa format so the features on mouse-over and click will change to it.
 *    Make sure you do not use that color for any feature.
 *
 * @option {string} sequenceId
 *    Sequence identifier
 *
 * @option {string} sequenceLength
 *    Sequence length
 *
 * @option {Array} features
 *     A JSON array containing the features to be displayed. type element for a feature is optional and can be either of
 *     {"rect", "bridge", "diamond", "triangle", "hexagon", "wave", "circle"}
 *     If you want bridges or one-single-position features to be rendered as rectangles, do not specify any type for the feature
 *     In proteins, we recommend "diamond" for active sites, "triangle" for PTMs, "hexagon" for glycosylation,
 *     "wave" for lipids, and "circle" for metals. Any other shape will be rendered as a rectangle
 *     Colours can be specified in hexa, string, or rgb; if no colour is specified, black will be used.
 *     features = [
 *         {
 *             featureId:"UNIPROTKB_Q8LAX3_PROPEP_1_73",
 *             featureStart:1,featureEnd:73,
 *             typeLabel:"Propeptide",
 *             featureLabel:"Propeptide",
 * 			   typeCategory:"Molecule processing",typeCode:"SO:0001062",
 *             evidenceText:"UniProt",evidenceCode:"none",
 *             color: "red"
 *          },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_PEPTIDE_54_96",
 *             featureStart:54,featureEnd:96,
 *             typeLabel:"Peptide",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             color: "blue"
 *         },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_PEPTIDE_74_96",
 *             featureStart:74,featureEnd:96,
 *             typeLabel:"Active Site",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             type: "diamond"
 *         },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_DISULFID_75_96",
 *             featureStart:75,featureEnd:96,
 *             typeLabel:"Active Site",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             color: "#33FF66",
 *             type: "bridge"
 *         }
 *     ];
 *
 * @option {int} [imageWidth=700]
 *     Image width
 *
 * @example
 * var myFT = [
 *         {
 *             featureId:"UNIPROTKB_Q8LAX3_PROPEP_1_73",
 *             featureStart:1,featureEnd:73,
 *             typeLabel:"Propeptide",
 *             featureLabel:"Propeptide",
 * 			   typeCategory:"Molecule processing",typeCode:"SO:0001062",
 *             evidenceText:"UniProt",evidenceCode:"none",
 *             color: "red"
 *          },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_PEPTIDE_54_96",
 *             featureStart:54,featureEnd:96,
 *             typeLabel:"Peptide",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             color: "blue"
 *         },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_PEPTIDE_74_96",
 *             featureStart:74,featureEnd:96,
 *             typeLabel:"Active Site",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             type: "diamond"
 *         },
 *         {
 * 	           featureId:"UNIPROTKB_Q8LAX3_DISULFID_75_96",
 *             featureStart:75,featureEnd:96,
 *             typeLabel:"Active Site",
 *             featureLabel:"Elicitor peptide 3",
 *             typeCategory:"Molecule processing",typeCode:"SO:0001064",
 *             evidenceText:"UniProt",evidenceCode:"no ECO",
 *             color: "#33FF66",
 *             type: "bridge"
 *         }
 *     ];
 * var myPainter = new Biojs.SimpleFeatureViewer({
 *    target: "YourOwnDivId",
 *    sequenceId: "a4_human",
 *    sequenceLength: 770,
 *    features: myFT
 * });
 *
 */
Biojs.SimpleFeatureViewer = Biojs.FeatureViewer.extend(
    /** @lends Biojs.SimpleFeatureViewer */
    {
        /**
         * Default values for the options
         * @name Biojs.SimpleFeatureViewer-constructor
         */
        constructor:function (options) {
            this.base(options);
            //Biojs.console.enable();
            this._generatesJSON();
            this.paintFeatures(this.opt.json);
        },

        /**
         * Default values for the options:
         * target: "",
         * showSlider: true,
         * showPrintButton: true,
         * showFeatureTooltipOnMouseOver: true,
         * highlightFeatureOnMouseOver: true,
         * selectFeatureOnMouseClick: true,
         * selectionColor: "#ff8c00"
         * imageWidth: 700,
         * sequenceId: "none"
         * sequenceLength: 0
         * features: {}
         *
         * @name Biojs.SimpleFeatureViewer-opt
         */
        opt:{
            //Parent
            /* target:"YourOwnDivId",
             json: {}, //will be created by this component
             showSlider:true,
             showPrintButton:true,
             showFeatureTooltipOnMouseOver:true,
             highlightFeatureOnMouseOver:true,
             selectFeatureOnMouseClick:true,
             selectionColor:"#ff8c00",
             */
            dragSites: false,
            imageWidth:700
        },

        /**
         * Array containing the supported event names
         * @name Biojs.SimpleFeatureViewer-eventTypes
         */
        eventTypes : [],

        /**
         * Opens a new window/tab in the browser with the graphical representation as a plain image.
         * Note: For IE it does not reflect the drags/drops on sites
         *
         * @example
         * myPainter.exportFeaturesToImage();
         *
         */
        exportFeaturesToImage: function() {
            var config = this.opt.json.configuration;
            var dataURL = "";
            if (jQuery.browser.msie) { //canvas does not work (not even with IE 9)
                alert("Operation not supported for IE, please try from a different browser");
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
        },
        //Default height for rectangles
        _rectangleHeight: 10,
        _tracks: 0,

        /*
         * Generates a json file with all configuration and raphaël related info from a simple features json
         * INPUT (example)
         * sequenceId, sequenceLength,
         * features = [
         *         {
         *             featureEnd:73,
         *             evidenceText:"UniProt",typeLabel:"Propeptide",
         *             featureLabel:"Propeptide",featureStart:1,
         *             typeCategory:"Molecule processing",typeCode:"SO:0001062",evidenceCode:"none",
         *             featureId:"UNIPROTKB_Q8LAX3_PROPEP_1_73",
         *             color: "#7DBAA4"
         *          }
         *         ,{
         *             featureEnd:96,
         *             evidenceText:"UniProt",typeLabel:"Peptide",
         *             featureLabel:"Elicitor peptide 3",featureStart:74,
         *             typeCategory:"Molecule processing",typeCode:"SO:0001064",evidenceCode:"no ECO",
         *             featureId:"UNIPROTKB_Q8LAX3_PEPTIDE_74_96",
         *             color: "#9B7057"
         *         }
         *     ];
         *
         * OUTPUT (example)
         * var json = {
         *     "featuresArray":[
         *         {
         *             featureEnd:73,
         *             evidenceText:"UniProt",typeLabel:"Propeptide",
         *             featureLabel:"Propeptide",featureStart:1,
         *             typeCategory:"Molecule processing",typeCode:"SO:0001062",evidenceCode:"none,
         *             featureId:"UNIPROTKB_Q8LAX3_PROPEP_1_73",
         *             color: "#000000",
         *             type:"rect",fillOpacity:0.5
         *             ,stroke:"#9B7057",height:10,path:""
         *             ,strokeWidth:1,text:""
         *             ,fill:"#9B7057",width:495
         *             ,cy:56,cx:27
         *             ,r:10
         *             ,y:56,x:27
         *          }
         *         ,{
         *             featureEnd":96,
         *             evidenceText":"UniProt","typeLabel":"Peptide",
         *             featureLabel":"Elicitor peptide 3",featureStart:74,
         *             typeCategory":"Molecule processing",typeCode:"SO:0001064",evidenceCode:"no ECO"
         *             featureId":"UNIPROTKB_Q8LAX3_PEPTIDE_74_96",
         *             color": "#000000",
         *             type":"rect",fillOpacity:0.5
         *             ,stroke":"#7DBAA4",height:10,path:""
         *             ,strokeWidth":1,text:""
         *             ,fill":"#7DBAA4",width:151
         *             ,cy:56,cx:529
         *             ,r:10,
         *             ,y:56,x:529
         *         }
         *     ]
         *     ,"segment":"Q8LAx3"  //same as sequenceId
         *     ,"legend":{
         *         "segment":{"text":"Q8LAX3","yPos":106,"xPos":15}
         *         ,"key":[
         *             {
         *                 "label":{
         *                     "total":"1","text":"Peptide","yPos":126,"xPos":50
         *                 }
         *                 ,"shape":{
         *                     "text":""
         *                     ,"width":30,"fill":"#7DBAA4"
         *                     ,"cy":121,"cx":15,"type":"rect","fillOpacity":0.5,"stroke":"#7DBAA4","height":5,"r":10
         *                     ,"path":"","typeLabel":"Peptide","y":121
         *                     ,"strokeWidth":1,"x":15
         *                 }
         *             }
         *             ,{
         *                 "label":{
         *                     "total":"1","text":"Propeptide","yPos":126,"xPos":205
         *                 }
         *                 ,"shape":{
         *                     "text":""
         *                     ,"width":30,"fill":"#9B7057"
         *                     ,"cy":121,"cx":170,"type":"rect","fillOpacity":0.5,"stroke":"#9B7057","height":5,"r":10
         *                     ,"path":"","typeLabel":"Propeptide","y":121
         *                     ,"strokeWidth":1,"x":170
         *                 }
         *             }
         *         ]
         *     }
         *     ,"configuration":{
         *         "requestedStop":96 //same as sequenceLength
         *         ,"requestedStart":1 //always 1
         *         ,"rightMargin":20 //always 20
         *         ,"belowRuler":30 //always 30
         *         ,"sequenceLength":96 //same as sequenceLength
         *         ,"unitSize":6.875 //rulerLength/sequenceLength
         *         ,"style":"nonOverlapping" //always "nonOverlapping"
         *         ,"sequenceLineY":54
         *         ,"verticalGrid":false //always false
         *         ,"rulerY":20 //always 20
         *         ,"horizontalGrid":false //always false
         *         ,"pixelsDivision":50 //always 50
         *         ,"sizeY":76
         *         ,"sizeX":700 //same as imageWidth
         *         ,"aboveRuler":10 //always 10
         *         ,"rulerLength":660 //imageWidth-rightMargin-leftMargin
         *         ,"sizeYKey":210
         *         ,"leftMargin":20 //always 20
         *         ,"nonOverlapping":true //always true
         *     }
         * };
         */
        _generatesJSON: function() {
            this.opt.json.segment = this.opt.sequenceId;

            this.opt.json = {};
            this.opt.json.configuration = {};
            this.opt.json.configuration.requestedStart = 1;
            this.opt.json.configuration.requestedStop = this.opt.sequenceLength;
            this.opt.json.configuration.sequenceLength = this.opt.sequenceLength;
            this.opt.json.configuration.rightMargin = 20;
            this.opt.json.configuration.leftMargin = 20;
            this.opt.json.configuration.rulerLength = this.opt.imageWidth - this.opt.json.configuration.rightMargin - this.opt.json.configuration.leftMargin;
            this.opt.json.configuration.belowRuler = 30;
            this.opt.json.configuration.aboveRuler = 10;
            this.opt.json.configuration.rulerY = 20;
            this.opt.json.configuration.unitSize = this.opt.json.configuration.rulerLength / this.opt.sequenceLength;
            this.opt.json.configuration.style = "nonOverlapping";
            this.opt.json.configuration.nonOverlapping = true;
            this.opt.json.configuration.verticalGrid = false;
            this.opt.json.configuration.horizontalGrid = false
            this.opt.json.configuration.sizeX = this.opt.imageWidth;
            this.opt.json.configuration.sequenceLineY = 4 + this.opt.json.configuration.rulerY + this.opt.json.configuration.belowRuler;
            this.opt.json.configuration.pixelsDivision = 50;

            this._organizeTracks(this.opt.features);
            if (this._trackShapes != 0) {
                this.opt.json.configuration.sizeY = this.opt.json.configuration.sequenceLineY + (this._tracks+1)*(this._rectangleHeight+2) + this._rectangleHeight;
                this.opt.json.configuration.sequenceLineY = this.opt.json.configuration.sequenceLineY + (this._trackShapes + 1)*this._rectangleHeight;
            } else {
                this.opt.json.configuration.sizeY = this.opt.json.configuration.sequenceLineY + this._tracks*(this._rectangleHeight+2) + this._rectangleHeight;
            }
            this._renderFeatures(this.opt.features);
            this.opt.json.featuresArray = this.opt.features;
            console.log(this.opt.json.featuresArray);

            sizeKey = this._generateLegend(this.opt.features);
            this.opt.json.configuration.sizeYKey = sizeKey + this.opt.json.configuration.sizeY;
        },

        /*
         * Organizes the features in non-overlapping tracks and defines the shape corresponding to each feature.
         */
        _organizeTracks: function (features) {
            tracks = new Array();
            trackShapes = new Array();
            //features[0].track = 0;
            //tracks[0] = new Array(features[0]);
            for (var i = 0; i < features.length; i++) {
                //console.log('feature ' + i);
                var tryShape = false;
                var found = false;
                if (features[i].type != undefined) {
                    if ( (features[i].type != "rect") && (features[i].type != "bridge") && (features[i].type != "circle")
                        && (features[i].type != "diamond") && (features[i].type != "hexagon")
                        && (features[i].type != "triangle") && (features[i].type != "wave")) {
                        features[i].type = "rect";
                    }
                    if ( features[i].featureStart ==  features[i].featureEnd) {
                        if ((features[i].type != "rect") && (features[i].type != "bridge")) {
                            tryShape = true;
                        }
                    }
                    if (features[i].type == "bridge") {
                        features[i].track = 0;
                        continue;
                    }
                } else {
                    features[i].type = "rect";
                }
                if (!tryShape) { //rectangles
                    for (var j = 0; j < tracks.length; j++) {
                        var overlapping = false;
                        for (var m = 0; m < tracks[j].length; m++) {
                            if ( features[i].featureStart ==  features[i].featureEnd) {
                                if ( (features[i].featureStart < tracks[j][m].featureStart)
                                    && (features[i].featureEnd < tracks[j][m].featureStart) ) { //starts and ends before
                                    overlapping = false;
                                } else if (features[i].featureStart > tracks[j][m].featureEnd) { //starts after
                                    overlapping = false;
                                } else {
                                    overlapping = true;
                                    break;
                                }
                            } else {
                                if ( (features[i].featureStart < tracks[j][m].featureStart) //starts and ends before
                                    && (features[i].featureEnd <= tracks[j][m].featureStart) ){
                                    overlapping = false;
                                } else if ( (features[i].featureStart >= tracks[j][m].featureEnd)
                                    && (features[i].featureEnd > tracks[j][m].featureStart )) {
                                    overlapping = false;
                                } else {
                                    overlapping = true;
                                    break;
                                }
                            }
                        }
                        if (!overlapping) {
                            //console.log('tracks j ' + j);
                            features[i].track = j;
                            tracks[j][tracks[j].length] = features[i];
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        //console.log('tracks.length ' + tracks.length);
                        features[i].track = tracks.length;
                        tracks[tracks.length] = new Array(features[i]);
                    }
                } else { //shapes
                    for (var j = 0; j < trackShapes.length; j++) {
                        var overlapping = false;
                        for (var m = 0; m < trackShapes[j].length; m++) {
                            if ( features[i].featureStart ==  features[i].featureEnd) {
                                if ( ((features[i].featureStart-3) < trackShapes[j][m].featureStart)
                                    && ((features[i].featureEnd+3) < trackShapes[j][m].featureStart) ) { //starts and ends before
                                    overlapping = false;
                                } else if ((features[i].featureStart-3) > trackShapes[j][m].featureEnd) { //starts after
                                    overlapping = false;
                                } else {
                                    overlapping = true;
                                    break;
                                }
                            }
                        }
                        if (!overlapping) {
                            //console.log('tracks j ' + j);
                            features[i].track = j;
                            trackShapes[j][trackShapes[j].length] = features[i];
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        //console.log('tracks.length ' + tracks.length);
                        features[i].track = trackShapes.length;
                        trackShapes[trackShapes.length] = new Array(features[i]);
                    }
                }
            }
            this._tracks = tracks.length + trackShapes.length;
            this._trackRects = tracks.length;
            this._trackShapes = trackShapes.length;
        },

        /*
         * Adds SVG information to the features
         *
         * OUTPUT (example of one feature with position, shape, and color)
         * "featureEnd":73,
         *             "evidenceText":"UniProt","typeLabel":"Propeptide",
         *             "featureLabel":"Propeptide","featureStart":1,
         *             "typeCategory":"Molecule processing","typeCode":"SO:0001062","evidenceCode":"",
         *             "featureId":"UNIPROTKB_Q8LAX3_PROPEP_1_73",
         *             "featureTypeLabel":"propeptide",
         *             "color": "#000000",
         *             "type":"rect","fillOpacity":0.5
         *             ,"stroke":"#9B7057","height":10,"path":""
         *             ,"strokeWidth":1,"text":""
         *             ,"fill":"#9B7057","width":495
         *             ,"cy":56,"cx":27
         *             ,"r":10
         *             ,"y":56,"x":27
         */
        _renderFeatures: function(features) {
            for (i=0; i < features.length; i++) {
                if (features[i].type == undefined) {
                    features[i].type = "rect";
                }
                if (features[i].color == undefined) {
                    features[i].color = "black";
                }
                features[i].fillOpacity = 0.5;
                features[i].path = "";
                features[i].text = "";
                features[i].fill = features[i].color;
                features[i].stroke = features[i].color;
                features[i].strokeWidth = 1;
                features[i].width = this.opt.json.configuration.unitSize * (features[i].featureEnd - features[i].featureStart + 1);
                if (features[i].type == "rect") {
                    features[i].height = this._rectangleHeight;
                    features[i].cy = this.opt.json.configuration.sequenceLineY + features[i].track * (this._rectangleHeight) + (features[i].track+1)*2;
                } else if (features[i].type == "bridge") {
                    features[i].height = this._rectangleHeight;
                    features[i].cy = this.opt.json.configuration.sequenceLineY;
                } else {
                    features[i].cy = this.opt.json.configuration.sequenceLineY - (features[i].track+2) * (this._rectangleHeight)// + (features[i].track+1)*2 -20;
                    if (features[i].type == "triangle") {
                        features[i].height = 10;
                    } else if (features[i].type == "hexagon") {
                        features[i].height = 7;
                    } else {
                        features[i].height = 5;
                    }
                }
                features[i].r = features[i].height;
                features[i].cx = this.opt.json.configuration.unitSize * (features[i].featureStart-1) + this.opt.json.configuration.leftMargin;
                features[i].x = features[i].cx;
                features[i].y = features[i].cy;
            }
        },

        /*
         * Generates the legend.
         * {
         "segment":{"text":"Q8LAX3","yPos":106,"xPos":15}
         ,"key":[
         {
         "label":{
         "total":"1","text":"Peptide","yPos":126,"xPos":50
         }
         ,"shape":{
         "text":""
         ,"width":30,"fill":"#7DBAA4"
         ,"cy":121,"cx":15,"type":"rect","fillOpacity":0.5,"stroke":"#7DBAA4","height":5,"r":10
         ,"path":"","typeLabel":"Peptide","y":121
         ,"strokeWidth":1,"x":15
         }
         }
         ,{
         "label":{
         "total":"1","text":"Propeptide","yPos":126,"xPos":205
         }
         ,"shape":{
         "text":""
         ,"width":30,"fill":"#9B7057"
         ,"cy":121,"cx":170,"type":"rect","fillOpacity":0.5,"stroke":"#9B7057","height":5,"r":10
         ,"path":"","typeLabel":"Propeptide","y":121
         ,"strokeWidth":1,"x":170
         }
         }
         ]
         }
         */
        _generateLegend: function(features) {
            mykey = [];
            for (i=0; i < features.length; i++) {
                found = false;
                for (j=0; j < mykey.length; j++) {
                    if (features[i].typeLabel == mykey[j].label.text) {
                        mykey[j].label.total = mykey[j].label.total + 1;
                        mykey[j].label.text = mykey[j].label.text;// + "(" + mykey[j].label.total + ")";
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    mykey[mykey.length] = {};
                    mykey[mykey.length-1].label = {}; //later yPos, xPos
                    mykey[mykey.length-1].label.total = 1;
                    mykey[mykey.length-1].label.text = features[i].typeLabel;
                    mykey[mykey.length-1].shape = {}; //later cy, cx, y, x
                    mykey[mykey.length-1].shape.text = "";
                    mykey[mykey.length-1].shape.width = 30;
                    mykey[mykey.length-1].shape.fill = features[i].fill;
                    mykey[mykey.length-1].shape.type = "rect";
                    mykey[mykey.length-1].shape.fillOpacity = 0.5;
                    mykey[mykey.length-1].shape.stroke = features[i].stroke;
                    mykey[mykey.length-1].shape.height = 5;
                    mykey[mykey.length-1].shape.r = this._rectangleHeight;
                    mykey[mykey.length-1].shape.path = "";
                    mykey[mykey.length-1].shape.typeLabel = features[i].typeLabel;
                    mykey[mykey.length-1].shape.strokeWidth = 1;
                }
            }

            this.opt.json.legend = {};
            yCell = this.opt.json.configuration.sizeY + this.opt.json.configuration.belowRuler;
            cellWidth = 200;
            cellsByRow = this.opt.json.configuration.sizeX / cellWidth;
            cellHeight = 20;

            this.opt.json.legend.segment = {};
            this.opt.json.legend.segment.text = this.opt.sequenceId;
            this.opt.json.legend.segment.yPos = yCell;
            this.opt.json.legend.segment.xPos =  this.opt.json.configuration.leftMargin;

            yCell = yCell + cellHeight;
            cell = 0;
            totalRows = 1;
            for (i=0; i < mykey.length; i++) {
                xPos = 0;
                if (cell == 0) {
                    xPos = this.opt.json.configuration.leftMargin;
                } else {
                    xPos = cell * cellWidth;
                }
                mykey[i].label.yPos = yCell;
                mykey[i].label.xPos = xPos + cellHeight + 15;
                mykey[i].shape.y = yCell;
                mykey[i].shape.cy = yCell;
                mykey[i].shape.x = xPos;
                mykey[i].shape.cx = xPos;
                if (mykey[i].label.text.length > 21) {
                    cell = Math.min(cell+2, cellsByRow);
                } else {
                    cell = Math.min(cell+1, cellsByRow);
                }
                if (cell == cellsByRow) {
                    yCell = yCell + cellHeight;
                    cell = 0;
                    totalRows++;
                }
            }

            this.opt.json.legend.key = mykey;
            return ((totalRows+1) * cellHeight);
        }
    }
);