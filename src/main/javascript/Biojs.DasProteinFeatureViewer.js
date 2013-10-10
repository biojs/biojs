/**
 * This component uses a DASProtein web service that builds the JSON data object used by FatureViewer component.
 * 
 * @class
 * @extends Biojs.FeatureViewer
 *
 * @author <a href="mailto:ljgarcia@ebi.ac.uk">Leyla Jael Garcia Castro</a>
 * @version 1.0.0
 * @category 2
 *
 *
 * @param {Object} options An object with the options for DASProteinFeatureViewer component.
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
 * @option {boolean} [dragSites=true]
 *    Should the sites be draggable?
 *
 * @option {string} segment
 *    Protein identifier or protein accession
 *
 * @option {string} [dasSources="http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot"]
 *    DAS protein sources used to retrieved the features, if another one is needed, just add something like ",URL"
 *
 * @option {string} featureTypes
 *    In case of more than one source, it is possible to specify only one of them to retrieve a particular feature type.
 *    For instance "feature.DOMAIN=http://www.ebi.ac.uk/das-srv/interpro/das/InterPro-matches-overview", for more
 *    types just add something like "&feature.XXX=URL"
 *    Feature type should be capitalized and can be any of these: DOMAIN, CA_BIND, DNA_BIND, NP_BIND, INTRAMEM, TOPO_DOM, TRANSMEM, ZN_FING, PEPTIDE,
 *    PROPEP, SIGNAL, TRANSIT, ACT_SITE, METAL, CARBOHYD, LIPID, MOD_RES, COILED, COMPBIAS, CONSERVED_MOTIF, REGION,
 *    REPEAT, CHAIN, INIT_MET, BINDING, SITE, NON_STD, DISULFID, CROSSLINK, VAR_SEQ, VARIANT, MUTAGEN, UNSURE,
 *    CONFLICT, NON_CONS, NON_TER, HELIX, TURN, STRAND
 *
 * @option {string} featureNames
 *     Feature names are displayed as part of the legend. In case you want to modify the text associated to a feature
 *     type, you can use this option. For instance name.DOMAIN=Family domains, for more names just add something like
 *     "&name.XXX=any text"
 *    Feature type should be capitalized and can be any of these: DOMAIN, CA_BIND, DNA_BIND, NP_BIND, INTRAMEM, TOPO_DOM, TRANSMEM, ZN_FING, PEPTIDE,
 *    PROPEP, SIGNAL, TRANSIT, ACT_SITE, METAL, CARBOHYD, LIPID, MOD_RES, COILED, COMPBIAS, CONSERVED_MOTIF, REGION,
 *    REPEAT, CHAIN, INIT_MET, BINDING, SITE, NON_STD, DISULFID, CROSSLINK, VAR_SEQ, VARIANT, MUTAGEN, UNSURE,
 *    CONFLICT, NON_CONS, NON_TER, HELIX, TURN, STRAND
 *
 * @option {int} [imageWidth=700]
 *     Image width
 *
 * @option {string} [imageStyle="nonOverlapping"]
 *     Image style, a value from {nonOverlapping, centered, rows}
 *
 * @option {boolean} [hgrid=false]
 *     Should horizontal lines be shown?
 *
 * @option {boolean} [vgrid=false]
 *     Should vertical lines be shown?
 *
 * @option {boolean} [allFeatures=true]
 *     Should all feature types be displayed? or only those defined by default?
 *     Default feature types: DOMAIN, CA_BIND, DNA_BIND, NP_BIND, INTRAMEM, TOPO_DOM, TRANSMEM, ZN_FING, PEPTIDE,
 *     PROPEP, SIGNAL, TRANSIT, ACT_SITE, METAL, CARBOHYD, LIPID, MOD_RES
 *     Other features that will be displayed if allFeatures is true: COILED, COMPBIAS, CONSERVED_MOTIF, REGION,
 *     REPEAT, CHAIN, INIT_MET, BINDING, SITE, NON_STD, DISULFID, CROSSLINK,
 *     VAR_SEQ, VARIANT, MUTAGEN, UNSURE, CONFLICT, NON_CONS, NON_TER, HELIX, TURN, STRAND
 *
 * @option {boolean} [allRectangles=false]
 *     Should all features, including those involving just one amino acid be displayed as rectangles?
 *     If not, some predefined features will be use for ACT_SITE, METAL, CARBOHYD, LIPID, MOD_RES
 *
 * @option {boolean} [allSameSize=false]
 *     If "centered" is the image style option, should all rectangles have the same size?
 *
 * @option {string} [proxyUrl="../biojs/dependencies/proxy/proxy.php"]
 *    Server side proxy server.
 *
 * @example
 * var myPainter = new Biojs.DasProteinFeatureViewer({
 *    target: "YourOwnDivId",
 *    segment: "a4_human"
 * });
 *
 */
Biojs.DasProteinFeatureViewer = Biojs.FeatureViewer.extend(
    /** @lends Biojs.DasProteinFeatureViewer */
    {
        /*
         * Private variables
         */
        _webservice:"http://wwwdev.ebi.ac.uk/uniprot/featureViewer/image",
        _dasReference:"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot/",
        /**
         * Default values for the options
         * @name Biojs.DasProteinFeatureViewer-constructor
         */
        constructor:function (options) {
            this.base(options);
            var self = this;
            //Biojs.console.enable();
            //create params from options
            var params = "?";
            params = params + "&option=raphael";
            if (!Biojs.Utils.isEmpty(options.segment)) {
                params = params + "&segment=" + options.segment;
            } else {
                throw "A UniProt accession or identifier is mandatory";
            }
            if (!Biojs.Utils.isEmpty(options.dasSources)) {
                params = params + "&dasSources=" + options.dasSources;
            }
            if (!Biojs.Utils.isEmpty(options.featureTypes)) {
                params = params + "&" + options.featureTypes;
            }
            if (!Biojs.Utils.isEmpty(options.featureNames)) {
                params = params + "&" + options.featureNames;
            }
            if ((options.imageWidth != undefined) && (!isNaN(options.imageWidth))) {
                params = params + "&width=" + options.imageWidth;
            }
            if (!Biojs.Utils.isEmpty(options.imageStyle)) {
                params = params + "&style=" + options.imageStyle;
            }
            if ((options.hgrid != undefined) && (options.hgrid == true)) {
                params = params + "&hgrid";
            }
            if ((options.vgrid != undefined) && (options.vgrid == true)) {
                params = params + "&vgrid";
            }
            if ((options.allFeatures != undefined) && (options.allFeatures == true)) {
                params = params + "&allFeatures";
            }
            if ((options.allRectangles != undefined) && (options.allRectangles == true)) {
                params = params + "&allRectangles";
            }
            if ((options.allSameSize != undefined) && (options.allSameSize == true)) {
                params = params + "&allSameSize";
            }
            //complete parent options with defaults defined by the children
            this.opt.json = "";
            //Biojs.console.log("params: " + params);
            //get the json from the web service
            jQuery.ajax({
                //url:this._webservice + params,
                url: self.opt.proxyUrl,
                data: "url=" + this._webservice + params,
                success:function (response, callOptions) {
                    json = jQuery.parseJSON(response);
                    //Biojs.console.log(response);
                    //Biojs.console.log(json);
                    try {
                        self.opt.json = json;
                        //jQuery.noConflict();
                        //self.initRaphael();
                        if (!Biojs.Utils.isEmpty(self.opt.json)) {
                            self.paintFeatures(self.opt.json)
                        }
                    } catch (err) {
                        Biojs.console.log(err);
                        document.getElementById(self.opt.target).innerHTML = '';
                        document.getElementById(self.opt.target).innerHTML = 'No image available. Did you provide a valid UniProt accession or identifier, and valid limits?';
                    }
                },
                error:function (response, callOptions) {
                    Biojs.console.log(error);
                    document.getElementById(self.opt.target).innerHTML = '';
                    document.getElementById(self.opt.target).innerHTML = 'No image available. Did you provide a valid UniProt accession or identifier, and valid limits?';
                }
            });
        },

        /**
         * Default values for the options:
         * target: "",
         * segment: "",
         * showSlider: true,
         * showPrintButton: true,
         * showFeatureTooltipOnMouseOver: true,
         * highlightFeatureOnMouseOver: true,
         * selectFeatureOnMouseClick: true,
         * dragSites: true //beware that dragging implies a click on so the click event will be raised!
         * selectionColor: "#ff8c00"
         * dasSources: "http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot",
         * featureTypes: "",
         * featureNames: "",
         * imageWidth: 700,
         * imageStyle: "nonOverlapping",
         * optionResponse: "raphael",
         * hgrid: false,
         * vgrid: false,
         * allFeatures: true,
         * allRectangles:false,
         * allSameSize: false,
         * proxyUrl: "../biojs/dependencies/proxy/proxy.php"
         * @name Biojs.DasProteinFeatureViewer-opt
         */
        opt:{
            //Parent
            /* target:"YourOwnDivId",
             //json: {}, //is not an option here, it is fixed to _webservice response
             showSlider:true,
             showPrintButton:true,
             showFeatureTooltipOnMouseOver:true,
             highlightFeatureOnMouseOver:true,
             selectFeatureOnMouseClick:true,
             dragSites:true,
             selectionColor:"#ff8c00", //make sure it does not exist at http://wwwdev.ebi.ac.uk/das-srv/uniprot/das/uniprot/stylesheet
             */
            dasSources:"http://www.ebi.ac.uk/das-srv/uniprot/das/uniprot",
            featureTypes:"",
            featureNames:"",
            imageWidth:700,
            imageStyle:"nonOverlapping",
            optionResponse:"raphael",
            hgrid:false,
            vgrid:false,
            allFeatures:true,
            allRectangles:false,
            allSameSize:false,
            proxyUrl: "../biojs/dependencies/proxy/proxy.php"
        },

        /**
         * Array containing the supported event names
         * @name Biojs.DasProteinFeatureViewer-eventTypes
         */
        eventTypes : [],

        /**
         * Opens a new window/tab in the browser with the graphical representation for all feature types.
         *
         * @example
         * myPainter.showGeneralLegend();
         *
         */
        showGeneralLegend: function() {
            var config = this.opt.json.configuration;
            var dataURL = this._webservice + "?";
            window.open(dataURL); //open generated image in new tab/window
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
                dataURL = this._webservice + "?" + arguments;
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
        },

        /**
         * Applies a style, either "centered", "nonOverlapping", or "rows".
         * @param show
         *
         * @example
         * myPainter.applyStyle("centered");
         */
        applyStyle: function(style) {
            if ((style != undefined) && ((style == "centered") || (style == "nonOverlapping") || (style = "rows"))) {
                var config = this.opt.json.configuration;
                this.customize(style, config.horizontalGrid, config.verticalGrid);
            }
        },

        /**
         * Shows/hide the horizontal guide lines.
         * @param show
         *
         * @example
         * myPainter.showHideHorizontalGrid(true);
         */
        showHideHorizontalGrid: function(show) {
            if ((show != undefined) && ((show == true) || (show == false))) {
                var config = this.opt.json.configuration;
                this.customize(config.style, show, config.verticalGrid);
            }
        },

        /**
         * Shows/hide the horizontal guide lines.
         * @param show
         *
         * @example
         * myPainter.showHideVerticalGrid(true);
         */
        showHideVerticalGrid: function(show) {
            if ((show != undefined) && ((show == true) || (show == false))) {
                var config = this.opt.json.configuration;
                this.customize(config.style, config.horizontalGrid, show);
            }
        }
    }
);