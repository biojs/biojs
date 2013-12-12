/**
 * This is a component that provides autocomplete functionality for querying the Ontology Lookup Service (OLS) for any ontology or set of ontologies in this service.
 *  It is based on the jquery Autocomplete widget developed for ArrayExpress and was developed with support from the BioMedBridges project.
 *
 *
 * @class
 * @extends Biojs
 *
 * @author <a href="mailto:dwelter@ebi.ac.uk">Dani Welter</a>, <a href="mailto:jupp@ebi.ac.uk">Simon Jupp</a>, <a href="mailto:kolais@ebi.ac.uk">Nikolay Kolesnikov</a>
 * @version 0.5.0_beta
 * @category 0
 *
 * @requires <a href='http://code.jquery.com/jquery-1.8.2.min.js'>jQuery Core 1.8.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.8.2.min.js"></script>
 *
 * @requires <a href='www.ebi.ac.uk/arrayexpress/assets/scripts/jquery.caret-range-1.0.js'>jQuery Caret-Range 1.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/olstreeview/jquery.caret.range-1.0.js"></script>
 *
 * @requires <a href='jquery-autocomplete-ols.js'>jQuery Autocomplete for OLS </a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/olstreeview/jquery-autocomplete-ols.js"></script>
 *
 * @requires <a href='http://www.ebi.ac.uk/arrayexpress/assets/stylesheets/ae-common-1.0.131017.css'>AE Common CSS</a>
 * @dependency <link rel="stylesheet" href="http://www.ebi.ac.uk/arrayexpress/assets/stylesheets/ae-common-1.0.131017.css" type="text/css">
 *
 *
 *
 * @param {Object} options An object with the options for the Autocomplete component.
 *
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *
 * @option {string} [ontology="EFO"]
 * 	  The ontology to be queried via the component.
 *
 * @example
 *  var instance = new Biojs.AutocompleteOLS({
 *          target: "YourOwnDivId",
 *          ontology: "EFO"
 *  });
 *
 */
Biojs.AutocompleteOLS = Biojs.extend (
    /** @lends Biojs.AutocompleteOLS# */
    {
        constructor: function (options) {
            var self = this;

            this._container = jQuery("#" + self.opt.target);

            if ($ == undefined) {
                throw "jQuery not loaded";
            }
            $(function() {

                var autoCompleteFixSet = function() {
                    $(this).attr('autocomplete', 'off');
                };
                var autoCompleteFixUnset = function() {
                    $(this).removeAttr('autocomplete');
                };

                $("#" + self.opt.target).autocomplete(
                    "http://www.ebi.ac.uk/ontology-lookup/term.view"
                    , { matchContains: false
                        , selectFirst: false
                        , scroll: true
                        , max: 50
                        , requestTreeUrl: "http://www.ebi.ac.uk/ontology-lookup/json/termchildren"
                        , ontologyId: self.opt.ontology
//              change this to "all" to search all ontologies - dont do this for now!
                    }
                ).focus(autoCompleteFixSet).blur(autoCompleteFixUnset).removeAttr('autocomplete');


            });

        },


        /**
         *  Default values for the options
         *  @name Biojs.AutocompleteOLS-opt
         */
        opt: {
            target: "",
            ontology: "EFO"
        }

    }

);