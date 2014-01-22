/** 
 * PDBLogos shows a set of icons to give a quick summary of salient features of a PDB entry.
 * See more info on PDBLogos at http://pdbe.org/prints
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez-Carvajal</a>
 * @version 1.0.0
 * @category 2
 *
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>Raphael 2.1.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael-2.1.0.js"></script>
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.6.4.js'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.4.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for PDBLogos component.
 *    
 * @option {string} target
 *    Identifier/HTMLElement of the div container where the component should be rendered.
 *
 * @option {string} identifier
 *    PDB entry id for which prints will be rendered.
 *
 * @option {Object} raphael
 *    A Raphael object instead of div to render PDBprints into.
 *
 * @option {int} startX
 *    X-coordinate of point where rendering the array of PDBprints will start in the Raphael canvas
 *
 * @option {int} startY
 *    Y-coordinate of point point where rendering the array of PDBprints will start in the Raphael canvas
 *
 * @option {int} interval
 *    Gap size between successive PDBprints in a vertical or horizontal array
 *
 * @option {int} size
 *    Length of an icon logo
 * 
 * @option {string} [color="#588FE5"]
 *    Color for background as HTML color code.
 *
 * @option {char} orient
 *    Rendering orientation either vertical or horizontal
 * 
 * @option {string} [pdb3DIcon='biojs/css/images/3d.png']
 *    Image URL to be used as 3D structure's icon
 *    
 * @example 
 * var instance = new Biojs.PDBLogos({
 *    target: "YourOwnDivId",
 *    identifier: "1cbs"
 * });	
 * 
 */
Biojs.PDBLogos = Biojs.extend (
/** @lends Biojs.PDBLogos# */
{
  /**
   *  Default values for the options
   *  @name Biojs.PDBLogos-opt
   */
  opt: {
    target: "YourOwnDivId",
	raphael: null,
	identifier:"",
	startX: 10,
	startY: 10,
	interval: 10,
	size: 40,
	orient: 'h',
	logosURL: 'http://www.ebi.ac.uk/pdbe-apps/widgets/pdbprints',
	logos: [],
	color: "#588FE5",
	pdb3DIcon: 'biojs/css/images/3d.png'
  },

  /**
    * Array containing the supported event names
    * @name Biojs.PDBLogos-eventTypes
    */
  eventTypes : [
    /**
    * @name Biojs.PDBLogos#onClick
    * @event
    * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
    * @eventData {Object} source The component which did triggered the event.
    * @eventData {string} type The name of the event.
    * @eventData {string} identifier PDB actual entry.
    * @eventData {string} category Name of the PDBLogo category clicked.
    * @eventData {string} printsUrl Url of the PDB general information.
    * @example
    * instance.onClick(
    *    function( e ) {
    *       alert("Logo " + e.category + " of PDB " + e.identifier + " was clicked.");
    *    }
    * );
    *
    * */
    "onClick"
  ],

  constructor: function (options) {
    this._initCanvas();
    if( !Biojs.Utils.isEmpty(this.opt.identifier) ) {
        this._doRequest(this.opt.identifier);
    }
  },

  _initCanvas: function() {
    var config = this.opt;

    // Make Raphael object if not provided already
    if ( !Biojs.Utils.isEmpty( config.raphael ) ){
        config.raphael.remove();
        config.raphael = null;
    }

    var sizex = config.startX + config.size * Biojs.PDBLogos.CATEGORY.lenght;
    var sizey = config.startY + (config.interval+config.size);

    if(config.orient == Biojs.PDBLogos.VERTICAL) {
        sizey = config.startY + config.size * Biojs.PDBLogos.CATEGORY.lenght;
        sizex = config.startX + (config.interval+config.size);
    }
    config.raphael = Raphael(config.target, sizex, sizey);
  },

  /**
    * Sets the pdb identifier generating a new request of logos.
    *
    * @param {string} value PDB entry.
    *
    * @example
    * instance.setIdentifier("1j3s");
    *
  */
  setIdentifier: function ( value ) {
    this.opt.identifier = value;
    this._initCanvas();
    this._doRequest(value);
  },

  _doRequest: function(identifier){
     
     var self = this;
     
     jQuery.ajax({
        url: 'http://www.ebi.ac.uk/pdbe-apps/widgets/pdbprints',
        data: { 'varname':'printsdata', 'pdbid': identifier, color: "transparent" },
        dataType: 'script',
        crossDomain: 'true',
        type: 'GET',
        success: function(response, callOptions) { self._printsLayout(printsdata); }
     });
  },


  _printsLayout: function(data) {
    var self = this;
    var config = this.opt;
    var ix = config.startX;
    var iy = config.startY;
    var i=0;
    
    config.logos = [];
	
    data[config.identifier].PDBStructure = [ config.pdb3DIcon, 'structure'];

    for( category in Biojs.PDBLogos.CATEGORY ) {
    	
    	var isizeY = config.size, isizeX = config.size;
        var imgUrl = data[config.identifier][category][0];
        var printsURL = "http://www.pdbe.org";
        
        ix = config.startX;
        iy = config.startY;
        
        if( config.orient == Biojs.PDBLogos.VERTICAL ) {
            iy += config.size * (i++);
        } else {
        	ix += config.size * (i++);
        }

        if(category == "PDBeLogo") {
            config.logos.push(
                config.raphael.text(ix, iy + self.opt.size/4, config.identifier)
                    .attr({
                        'font-family':'Mono',
                        'text-anchor':'start',
                        'font-size': self.opt.size/3,
                        'cursor':'pointer',
                        'title':'View all about PDB ' + config.identifier
                    })
                    .data("identifier", config.identifier)
                    .mouseup( function() {
                        window.open( "http://www.pdbe.org/" + this.data("identifier") );
                    })
            );

            imgUrl = "http://www.ebi.ac.uk/pdbe-apps/widgets/html/PDBeWatermark_horizontal_128.png";
            isizeX = config.size * 0.9;
            isizeY = config.size/2;
            iy += config.size/2;

        } else {
        	
        	printsURL += "/"+config.identifier+"/" + Biojs.PDBLogos.CATEGORY[category];

        	if ( category == "PDBStructure" ) {
        		printsURL = "http://www.ebi.ac.uk/pdbe-srv/view/entry/" + config.identifier + "/openastex";
        	}	
            
            // Add icon background
            config.raphael.rect(ix, iy, isizeX, isizeY, 7).attr({'fill':self.opt.color});
        }

        config.logos.push(
            config.raphael.image(imgUrl, ix, iy, isizeX, isizeY)
                .attr({
                	'cursor':'pointer',
                	'title':'View '+category
                })
                .data({
                    "printsURL": printsURL,
                    "category": category
                })
                .mouseup( function() {
                    self.raiseEvent( Biojs.PDBLogos.EVT_ON_CLICK, {
                        printsURL: this.data("printsURL"),
                        identifier: config.identifier,
                        category: this.data("category")
                    });
                })
                .mouseover( function() { } )
        );

    }
    
  }

},{
    HORIZONTAL: 'h',
    VERTICAL: 'v',

    CATEGORY: {
       "PDBeLogo":        "",
       "PrimaryCitation": "citation",
       "Taxonomy":        "taxonomy",
       "Expressed":       "taxonomy",
       "Experimental":    "experimental",
       "Protein":         "primary",
       "NucleicAcid":     "primary",
       "Ligands":         "ligands",
       "PDBStructure":    "PDBStructure"
    },

    EVT_ON_CLICK: "onClick"

});