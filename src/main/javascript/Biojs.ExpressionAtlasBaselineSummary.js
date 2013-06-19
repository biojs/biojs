/**
 * This is the ExpressionAtlas component for displaying baseline expression of genes
 *  based on RNA-seq experiments in the ExpressionAtlas database.
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:atlas-developers@ebi.ac.uk">ExpressionAtlas Team</a>
 * @version 1.0.3
 * @category 3
 *
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.min.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 *
 * @param {Object} options An object with the options for ExpressionAtlasBaselineSummary component.
 *
 * @option {string} featuresUrl
 *    The query URL pointing to the ExpressionAtlas for retrieving gene page results
 *    displayed as part of this widget. It is usually composed to include the identifier
 *    of the gene you are interested in, see example.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} [rootContext='../biojs/dependencies/proxy/proxy.php?url%3dhttp://www-test.ebi.ac.uk/gxa']
 *    Specifies the root context path to be used by the widget content,
 *    i.e. this is the location of the content proxy pointing to ExpressionAtlas
 *
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    This component needs to request data from a web service. To bypass the same origin policy
 *    (http://en.wikipedia.org/wiki/Same_origin_policy) this component needs a proxy.
 *    You could use your own proxy by modifying this value or one of the BioJS proxies:
 *    '../biojs/dependencies/proxy/proxy.php' or '../biojs/dependencies/proxy/proxy.jsp'
 *
 * @example
 *    var instance = new Biojs.ExpressionAtlasBaselineSummary({
 *      featuresUrl: 'http://www-test.ebi.ac.uk/gxa/widgets/heatmap/protein?geneQuery=P00846',
 *      target : "YourOwnDivId"
 *    });
 *
 */
Biojs.ExpressionAtlasBaselineSummary = Biojs.extend(
    /** @lends Biojs.ExpressionAtlasBaselineSummary# */
    {

        /**
         * Constructor to initialize the component
         * @name Biojs.ExpressionAtlasBaselineSummary-constructor
         */
        constructor:function (options) {
            //Biojs.console.enable();
            var self = this;

            var containerDiv = jQuery("#" + self.opt.target);
            containerDiv.empty();

            var options = self.opt;
            var url = options.featuresUrl;
            if (this.opt.proxyUrl != "") {
                url = this.opt.proxyUrl + "?url=" + url;
            }

            var httpRequest = {
                url:url,
                data:{rootContext:options.rootContext},
                methid:"GET",
                beforeSend:function () {
                    containerDiv.html("<img src='http://www-test.ebi.ac.uk/gxa/resources/images/loading.gif' />");
                },
                success:function (htmlResponse) {
                    Biojs.console.log("SUCCESS: data received");
                    Biojs.console.log(htmlResponse);
                    containerDiv.html(htmlResponse);
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    Biojs.console.log("ERROR: " + xhr.status);
                    containerDiv.html("An error occurred while retrieving the data: " + xhr.status + " - " + xhr.statusText);
                }
            };

            jQuery.ajax(httpRequest);

        },

        /**
         *  Default values for the options
         *  @name Biojs.ExpressionAtlasBaselineSummary-opt
         */
        opt:{
            /* Features URL
             This mandatory parameter consists of the query for a particular
             gene or genes by given their properties. For a single gene query,
             please use a unique accession (e.g. ENSEMBL gene id or UniProt id).
             For example search with UniProt id P00846 returns the gene mt-atp6,
             a search for REACT_6900 returns genes belonging to this pathway.
             To narrow to search scope of a query term, please provide a type:
             &propertyType=identifier (here only the identifier property is searched)
             An additional parameter (&geneSetMatch=true) can be appended after
             the query term to collapse multiple returned gene profiles into one
             single line of average expression (this feature is still experimental).
             For multiple identifiers of the same species please use:
             geneQuery=ENSG00000187003+ENSG00000185264&propertyType=identifier
             */
            featuresUrl:'http://www-test.ebi.ac.uk/gxa/widgets/heatmap/protein?geneQuery=P00846',
            /* Target DIV
             This mandatory parameter is the identifier of the DIV tag where the
             component should be displayed. Use this value to draw your
             component into. */
            target:"YourOwnDivId",
            /* Root context
             This is an optional parameter to specify the root context path to
             be used by the widget content, i.e. this is pointing to the
             content proxy where required.
             */
            rootContext:'../biojs/dependencies/proxy/proxy.php?url=http://www-test.ebi.ac.uk/gxa',
            /* Proxy URL
             To bypass the same origin policy this component needs a proxy, which
             can be set here.
             */
            proxyUrl:"../biojs/dependencies/proxy/proxy.php"
        },


        /**
         * Array containing the supported event names
         * @name Biojs.ExpressionAtlasBaselineSummary-eventTypes
         */
        eventTypes:[
            /*
             Currently no events are supported.
             */
        ]


    });
