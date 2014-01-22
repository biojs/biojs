 /*
  * This is the description of the cInteractionTable component.
  * Construct or refresh a dataTable of biomolecule interaction
  * and provides a right click contextual menu for cell elements
  *
  * @class
  * @extends Biojs
  * 
  * @author <a href="mailto:pitooon@gmail.com">Guillaume Launay</a>
  */

Biojs.InteractiveInteractionTable =  Biojs.extend (
    /*
     * @lends Biojs.InteractiveInteractionTable 
     * @requires <a href='http://jquery.com/download'>jQuery core</a>
     * @dependency <script language="JavaScript" type="text/javascript" ...
     * @requires <a href='http://jqueryui.com/download'>jQuery UI 1.8.16</a>
     * @dependency <script language="JavaScript" type="text/javascript" ...
     * @requires <a href='http://datatables.net/download/'>DataTables 1.9.4</a>
     * @dependency <script language="JavaScript" type="text/javascript" ...
     * @requires <a href='http://craigsworks.com/projects/qtip2/download/'>qTip2</a>
     * @dependency <script language="JavaScript" type="text/javascript" ...
     */
    {
	constructor: function (options) {
	    var self = this;

	    this._container = jQuery ("#" + this.opt.target);
	    
	    //Lazy initalialization
	    this._container.ready (function() {
				       self._initialize();
				       });
	    },

	/*
	 * @option {string} target
	 *         Identifier of the DIV tag where the component should be displayed 
	 * @option {json object} interactionSetObject
	 *         object storing the interaction data, expected structure is the following:
	 *         {aaData : [arrayOne, ...,  arrayN ]}
	 *         where arrayN is an inner array of length 11 storing the following ordered strings:
	 *         interactorA id, interactorA common name, interactor A gene name, interactor A Taxon id,   
	 *         interactorB id, interactorB common name, interactor B gene name, interactor B Taxon id,
	 *         database provider
	 * @option {string} dasRegistryUrl
	 *          adress of a valid das registry server
	 * @option {json object} converterUrl
	 *          adress to a document specifying developper's defined biomoleculeID litteral comments relationships
	 * @option {json object} proteinAnnotationUrl
	 *          set of key,value pairs referencing the biomolecule annotation services 
	 *          eg: { "uniprot" : "www.uniprot.org/" }
	 * @option {json object} geneAnnotationUrl
	 *          set of key,value pairs referencing the gene annotation services 
	 *          eg: { "unigene" : "http://www.ncbi.nlm.nih.gov/unigene/" }
	 * @option {json object} interactionProviderUrl
	 *         set of key,value pairs referencing the psicquic members may need to redirect to 
	 *         eg: {"DIP" : "http://dip.doe-mbi.ucla.edu/dip/" }
	 * * @option {string} provider
	 *    A string to identify yourself 
	 */

/*
 * @example 
 * var instance = new Biojs.InteractiveInteractionTable({
 * 		target : "YourOwnDivId",
 * 		interactionSetObject : { "aaData" : ["O15146", "Muscle, skeletal receptor tyrosine-protein kinase", "musk", "Receptor tyrosine kinase that is a key mediator of agrin's action and is involved in neuromuscular junction (NMJ) organization. (by similarity)", "9606", "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "matrixdb"],
	[
 "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "O75400", "Pre-mRNA-processing factor 40 homolog A", "PRPF40A", "Binds to WASL/N-WASP and suppresses its translocation from the nucleus to the cytoplasm, thereby inhibiting its cytoplasmic function (By similarity). May be involved in pre-mRNA splicing.", "9606", "matrixdb"],
	[
 "O94985", "Calsyntenin-1", "CLSTN1", "Induces KLC1 association with vesicles and functions as a cargo in axonal anterograde transport. Complex formation with APBA2 and APP, stabilizes APP metabolism and enhances APBA2-mediated suppression of beta-APP40 secretion, due to the retardation of intracellular APP maturation. In complex with APBA2 and C99, a C-terminal APP fragment, abolishes C99 interaction with PSEN1 and thus APP C99 cleavage by gamma-secretase, most probably through stabilization of the direct interaction between APBA2 and APP. The intracellular fragment AlcICD suppresses APBB1-dependent transactivation stimulated by APP C-terminal intracellular fragment (AICD), most probably by competing with AICD for APBB1-binding. May modulate calcium-mediated postsynaptic signals. (by similarity)", "9606", "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "matrixdb"],
	[
 "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "P01127", "Platelet-derived growth factor subunit B", "PDGFB", "Platelet-derived growth factor is a potent mitogen for cells of mesenchymal origin. Binding of this growth factor to its affinity receptor elicits a variety of cellular responses. It is released by platelets upon wounding and plays an important role in stimulating adjacent cells to grow and thereby heals the wound.", "9606", "matrixdb"],
	[
 "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "P02751", "Fibronectin", "FN1", "Fibronectins bind cell surfaces and various compounds including collagen, fibrin, heparin, DNA, and actin. Fibronectins are involved in cell adhesion, cell motility, opsonization, wound healing, and maintenance of cell shape.", "9606", "matrixdb"],
	[
 "P02766", "Transthyretin", "TTR", "Thyroid hormone-binding protein. Probably transports thyroxine from the bloodstream to the brain.", "9606", "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "matrixdb"],
	[
 "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "P04085", "Platelet-derived growth factor subunit A", "PDGFA", "Platelet-derived growth factor is a potent mitogen for cells of mesenchymal origin. Binding of this growth factor to its affinity receptor elicits a variety of cellular responses. It is released by platelets upon wounding and plays an important role in stimulating adjacent cells to grow and thereby heals the wound.", "9606", "matrixdb"],
	[
 "P98160", "Basement membrane-specific heparan sulfate proteoglycan core protein", "HSPG2", "Integral component of basement membranes. Component of the glomerular basement membrane (GBM), responsible for the fixed negative electrostatic membrane charge, and which provides a barrier which is both size- and charge-selective. It serves as an attachment substrate for cells. Plays essential roles in vascularization. Critical for normal heart development and for regulating the vascular response to injury. Also required for avascular cartilage development.", "9606", "P05067", "Amyloid beta A4 protein", "APP", "Functions as a cell surface receptor and performs physiological functions on the surface of neurons relevant to neurite growth, neuronal adhesion and axonogenesis. Involved in cell mobility and transcription regulation through protein-protein interactions. Can promote transcription activation through binding to APBB1-KAT5 and inhibits Notch signaling through interaction with Numb. Couples to apoptosis-inducing pathways such as those mediated by G(O) and JIP. Inhibits G(o) alpha ATPase activity (By similarity). Acts as a kinesin I membrane receptor, mediating the axonal transport of beta-secretase and presenilin 1. Involved in copper homeostasis/oxidative stress through copper ion reduction. In vitro, copper-metallated APP induces neuronal death directly or is potentiated through Cu(2+)-mediated low-density lipoprotein oxidation. Can regulate neurite outgrowth through binding to components of the extracellular matrix such as heparin and collagen I and IV. The splice isoforms that contain the BPTI domain possess protease inhibitor activity. Induces a AGER-dependent pathway that involves activation of p38 MAPK, resulting in internalization of amyloid-beta peptide and leading to mitochondrial dysfunction in cultured cortical neurons.", "9606", "matrixdb"]
* ]}
 * });
 * 
 */
	

	opt : {
	    target : "", // the DIV name
	    interactionSetObject : {}, // the json object storing interaction data
	    dasRegistryUrl : "http://www.dasregistry.org/das/sources",
	    converterUrl : "http://matrixdb.ibcp.fr/matrixdbSpecifics.json",
	    proteinAnnotationUrl : { "uniprot" : "www.uniprot.org/" },
	    geneAnnotationUrl : { "unigene" : "http://www.ncbi.nlm.nih.gov/unigene/" },
	    interactionProviderUrl : { "DIP" : "http://dip.doe-mbi.ucla.edu/dip/" },
            provider : "matrixdb"               
	},
	
	eventYpes : ["onCellClick"],

	// internal members
	_headers : null,
	_headersDef : null,
	_converter : null,

	//Methods
	
	// Private methods
	_initialize: function (){
	    var self = this;
	    
	    //console.log(this.opt.interactionSetObject);
	    //console.dir(this.opt.interactionSetObject);
	    this._setConverter (this.opt.converterUrl);	    
            this.headers =  [{
				 "sTitle" : "Interactor A"
			     }, {
				 "sTitle" : "Common name A"
			     }, {
				 "sTitle" : "Gene name A"
			     }, {
				 "sTitle" : "A Biological Role"
			     }, {
				 "sTitle" : "A Tax ID"
			     }, {
				 "sTitle" : "Interactor B"
			     }, {
				 "sTitle" : "Common name B"
			     }, {
				 "sTitle" : "Gene name B"
			     }, {
				 "sTitle" : "B Biological Role"
			     }, {
				 "sTitle" : "B TaxID"
			     }, {
				 "sTitle" : "Source database"
			     }		
			    ];	    
	    this.headersDef = [
		{ "sWidth": "5%", "aTargets": [ 0 ] },
		{ "sWidth": "15%", "aTargets": [ 1 ] },
		{ "sWidth": "5%", "aTargets": [ 2 ] },
		{ "sWidth": "15%", "aTargets": [ 3 ] },
		{ "sWidth": "2.5%", "aTargets": [ 4 ] },
		{ "sWidth": "10%", "aTargets": [ 5 ] },
		{ "sWidth": "15%", "aTargets": [ 6 ] },
		{ "sWidth": "5%", "aTargets": [ 7 ] },
		{ "sWidth": "15%", "aTargets": [ 8 ] },
		{ "sWidth": "2.5%", "aTargets": [ 9 ] },
		{ "sWidth": "5%", "aTargets": [ 10 ] }
	    ];
	    
	    //this.centerColumns([0, 5]);
	    this._contentTable = jQuery('<table cellpadding="0" cellspacing="0" border="0" class="display" id="example" width="100%"></table>').appendTo(this._container);
	    
	    this._contentTable.dataTable({
					  "sScrollX": "100%",
					  "bAutoWidth": true,
					  "bJQueryUI" : true,
					  "bRetrieve": true, // trying to access object later on
					  "oTableTools" : {
					      "sRowSelect" : "multi",
					      "aButtons" : ["select_all", "select_none"]
					  },
					  "aaData" : this.opt.interactionSetObject.aaData,				
					  "aoColumns" : this.headers,
					     
					  "fnInitComplete" : function () {	 
					     // $.unblockUI();
					      self._formatCells ();
					  }
					 });
	    var oTable = $(this._contentTable).dataTable();
	    this._contentTable.show(oTable);	    
	},						
	_formatCells : function () {
	    var self = this;
	    var oTable = self._contentTable.dataTable ();
//	    console.dir (oTable);
	    oTable.$('td').each( function () {
				      var index = oTable.fnGetPosition(this);
				      var nrow = index[0];
				      var ncol = index[1];				  
				      var text =  this.innerHTML;
				      this.innerHTML = 0;				   
				      this.innerHTML = "<div class = \"dataTables_cellWrapper\">" + text + "</div>";

				      var cell = this;
				      /*Trying to implement right click contextual menu on cell elements*/
				      self._generateContextualMenuDataTable (oTable, cell);

				      if (ncol == 0 || ncol == 5) {
					  jQuery(this).draggable({   cursor: "crosshair",
								     appendTo: "body",
								     helper: "clone"
								 })
					      .css("cursor", "pointer");
				      }
				  });//.bind('hover',function(event){ displayCellFullText(this);});	
	     oTable.find('[class=dataTables_cellWrapper]').each (function (){ 
								     var text = jQuery(this).html();
								     jQuery(this).qtip({
											   content: text,
											   events: {
											       show: function(event, api) {
												   $('.qtip').each(function(){
														       $(this).qtip('hide');
														   });
											       }}});
								 });
	     oTable.bind( 'draw', self.refreshQtip);       	    
	 },
	 // A mapper between data type and ressources location and how to handle them
	 _setConverter : function () {
	    // if (self.converter != undefined) {			    
	     $.getJSON(this.opt.converterUrl, function(json) {		
			   self.converter = json;		  
		       }).complete(function() { 			      
				   })
		 .error (function () {
			     self.converter = {
				 "GAG_1": {
				     "type": "Glycosaminoglycan",
				     "name": "Heparin",
				     "comments": "Defined by the disaccharide unit (GlcNAc[alpha]1-4GlcA[beta]1-4IdoA[alpha] 1-4)n, containing N- and O-sulfate esters at various positions that has the highest amount of iduronic acid and of N- and O-sulfate residues. Made by mast cells.",
				     "chebiRef": "CHEBI:28304"
				 }
				 ,
				 "GAG_2": {
				     "type": "Glycosaminoglycan",
				     "name": "Heparan_Sulfate",
				     "comments": "Defined by the disaccharide unit (GlcNAc[alpha]1-4GlcA[beta]1-4IdoA[alpha] 1-4)n, containing N- and O-sulfate esters at various positions, and typically found covalently linked to a proteoglycan core protein.",
				     "chebiRef": "CHEBI:28815"
				 }
				 ,
				 "GAG_3": {
				     "type": "Glycosaminoglycan",
				     "name": "Dermatan_Sulfate",
				     "comments": "A modified form of chondroitin sulfate  (defined by the disaccharide unit (GalNAc[beta]1-4GlcA[beta] 1-3)n, modified with ester-linked sulfate at certain positions) in which a portion of the D-glucuronate residues are epimerized to L-iduronates. Typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:18376"
				 }
				 ,
				 "GAG_4": {
				     "type": "Glycosaminoglycan",
				     "name": "Chondroitin_Sulfate_A",
				     "comments": "Defined by the disaccharide unit (GalNAc[beta]1-4GlcA[beta] 1-3)n, modified with ester-linked sulfate at certain positions and typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:18250"
				 }
				 ,
				 "GAG_5": {
				     "type": "Glycosaminoglycan",
				     "name": "Chondroitin_Sulfate_C",
				     "comments": "Defined by the disaccharide unit (GalNAc[beta]1-4GlcA[beta] 1-3)n, modified with ester-linked sulfate at certain positions and typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:18296"
				 }
				 ,
				 "GAG_6": {
				     "type": "Glycosaminoglycan",
				     "name": "Chondroitin_Sulfate_D",
				     "comments": "Defined by the disaccharide unit (GalNAc[beta]1-4GlcA[beta] 1-3)n, modified with ester-linked sulfate at certain positions and typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:37397"
				 }
				 ,
				 "GAG_7": {
				     "type": "Glycosaminoglycan",
				     "name": "Chondroitin_Sulfate_E",
				     "comments": "Defined by the disaccharide unit (GalNAc[beta]1-4GlcA[beta] 1-3)n, modified with ester-linked sulfate at certain positions and typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:52562"
				 }
				 ,
				 "GAG_8": {
				     "type": "Glycosaminoglycan",
				     "name": "Keratan_Sulfate",
				     "comments": "A poly-N-acetyllactosamine (Gal[beta]1-4GlcNAc[beta] 1-3)n with sulfate esters at C-6 of N-acetylglucosamine and galactose residues, typically found covalently linked to a core protein to form a proteoglycan.",
				     "chebiRef": "CHEBI:18331"
				 }
				 ,
				 "GAG_9": {
				     "type": "Glycosaminoglycan",
				     "name": "Hyaluronan",
				     "comments": "Defined by the disaccharide unit (GlcNAc[beta]1-4GlcA[beta] 1-3)n that is neither sulfated nor covalently linked to protein.",
				     "chebiRef": "CHEBI:16336"
				 }
				 ,
				 "MULT_1_human": {
				     "type": "Multimer",
				     "name": "Laminin-111",
				     "components": ["P25391", "P07942", "P11047"],
				     "ebiRef": "EBI-2529702",
				     "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_1_human&class=Multimer#bottom",
				     "Stoichiometry": "1 P25391 + 1 P07942 + 1 P11047"}
				 
				 ,
				 "MULT_2_human": {
				     "type": "Multimer",
				     "name": "Laminin -1_Nidogen-1",
				     "components": ["MULT_1_human", "P14543"],
				     "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_2_human&class=Multimer#bottom"}
				 
				 ,
				 "MULT_3_human": {
				     "type": "Multimer",
				     "name": "Collagen-I",
				     "components": ["P02452", "P08123"],
				     "ebiRef": "EBI-2325312",
				     "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_3_human&class=Multimer#bottom",
				     "Stoichiometry": "2 P02452 + 1 P08123"}
				 
				 ,
				 "MULT_4_VAR1_human": {
				     "type": "Multimer",
				     "name": "Collagen-IV v1",
				     "components": ["P02462", "P08572"],
				     "ebiRef": "EBI-2461395",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_4_VAR1_human&class=Multimer#bottom",
"Stoichiometry": "2 P02462 + 1 P08572"}

,
"MULT_4_VAR2_human": {
"type": "Multimer",
"name": "Collagen-IV v2",
"components": ["P29400", "Q14031"],
"ebiRef": "EBI-2461418",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_4_VAR2_human&class=Multimer#bottom",
"Stoichiometry": "2 P29400 + 1 Q14031"}

,
"MULT_4_VAR3_human": {
"type": "Multimer",
"name": "Collagen-IV v3",
"components": ["Q01955", "P53420", "P29400"],
"ebiRef": "EBI-2461456",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_4_VAR3_human&class=Multimer#bottom",
"Stoichiometry": "1 Q01955 + 1 P53420 + 1 P29400"}

,
"MULT_5_VAR1_human": {
"type": "Multimer",
"name": "Collagen-V heterotrimer 2 different chains",
"components": ["P20908", "P05997"],
"ebiRef": "EBI-2464572",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_5_VAR1_human&class=Multimer#bottom",
"Stoichiometry": "2 P20908 + 1 P05997"}

,
"MULT_5_VAR2_human": {
"type": "Multimer",
"name": "Collagen-V heterotrimer 3 different chains",
"components": ["P20908", "P05997", "P25940"],
"ebiRef": "EBI-2464603",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_5_VAR2_human&class=Multimer#bottom",
"Stoichiometry": "1 P20908 + 1 P05997 + 1 P25940"}

,
"MULT_5_VAR3_human": {
"type": "Multimer",
"name": "Collagen-V homotrimer",
"components": ["P20908"],
"ebiRef": "EBI-2464615",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_5_VAR3_human&class=Multimer#bottom",
"Stoichiometry": "3 P20908"}

,
"MULT_6_human": {
"type": "Multimer",
"name": "Collagen-IX",
"components": ["P20849", "Q14055", "Q14050"],
"ebiRef": "EBI-2528296",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_6_human&class=Multimer#bottom",
"Stoichiometry": "1 P20849 + 1 Q14055 + 1 Q14050"}

,
"MULT_7_VAR1_human": {
"type": "Multimer",
"name": "Collagen-XI v1",
"components": ["P12107", "P13942", "P02458"],
"ebiRef": "EBI-2528381",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_7_VAR1_human&class=Multimer#bottom",
"Stoichiometry": "1 P12107 + 1 P13942 + 1 P02458"}

,
"MULT_7_VAR2_human": {
"type": "Multimer",
"name": "Collagen-XI v2",
"components": ["P12107", "P05997"],
"ebiRef": "EBI-2528394",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_7_VAR2_human&class=Multimer#bottom",
"Stoichiometry": "2 P12107 + 1 P05997"}

,
"MULT_7_VAR3_human": {
"type": "Multimer",
"name": "Collagen-XI v3",
"components": ["P20908", "P12107", "P05997"],
"ebiRef": "EBI-2528403",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_7_VAR3_human&class=Multimer#bottom",
"Stoichiometry": "1 P20908 + 1 P12107 + 1 P05997"}

,
"MULT_8_human": {
"type": "Multimer",
"name": "Collagen-VI",
"components": ["P12109", "P12110", "P12111"],
"ebiRef": "EBI-2465980",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_8_human&class=Multimer#bottom",
"Stoichiometry": "1 P12109 + 1 P12110 + 1 P12111"}

,
"MULT_9_human": {
"type": "Multimer",
"name": "Collagen-II",
"components": ["P02458"],
"ebiRef": "EBI-2431477",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_9_human&class=Multimer#bottom",
"Stoichiometry": "3 P02458"}

,
"MULT_10_human": {
"type": "Multimer",
"name": "Collagen-III",
"components": ["P02461"],
"ebiRef": "EBI-2431547",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_10_human&class=Multimer#bottom",
"Stoichiometry": "3 P02461"}

,
"MULT_11_human": {
"type": "Multimer",
"name": "Collagen-XII",
"components": ["Q99715"],
"ebiRef": "EBI-2528413",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_11_human&class=Multimer#bottom",
"Stoichiometry": "3 Q99715"}

,
"MULT_12_human": {
"type": "Multimer",
"name": "Collagen-XIII",
"components": ["Q5TAT6"],
"ebiRef": "EBI-2528478",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_12_human&class=Multimer#bottom",
"Stoichiometry": "3 Q5TAT6"}

,
"MULT_13_human": {
"type": "Multimer",
"name": "Collagen-XIV",
"components": ["Q05707"],
"ebiRef": "EBI-2528588",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_13_human&class=Multimer#bottom",
"Stoichiometry": "3 Q05707"}

,
"MULT_15_human": {
"type": "Multimer",
"name": "Integrin-alpha5beta1",
"components": ["P05556", "P08648"],
"ebiRef": "EBI-2550721",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_15_human&class=Multimer#bottom",
"Stoichiometry": "1 P08648 + 1 P05556"}

,
"MULT_16_human": {
"type": "Multimer",
"name": "Integrin-alphavbeta3",
"components": ["P05106", "P06756"],
"ebiRef": "EBI-2550735",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_16_human&class=Multimer#bottom",
"Stoichiometry": "1 P06756 + 1 P05106"}

,
"MULT_17_human": {
"type": "Multimer",
"name": "Integrin-alphavbeta5",
"components": ["P18084", "P06756"],
"ebiRef": "EBI-2550754",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_17_human&class=Multimer#bottom",
"Stoichiometry": "1 P06756 + 1 P18084"}

,
"MULT_18_human": {
"type": "Multimer",
"name": "Integrin-alpha3beta1",
"components": ["P05556", "P26006"],
"ebiRef": "EBI-2550808",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_18_human&class=Multimer#bottom",
"Stoichiometry": "1 P26006 + 1 P05556"}

,
"MULT_19_human": {
"type": "Multimer",
"name": "Integrin-alpha1beta1",
"components": ["P05556", "P56199"],
"ebiRef": "EBI-2554495",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_19_human&class=Multimer#bottom",
"Stoichiometry": "1 P56199 + 1 P05556"}

,
"MULT_22_human": {
"type": "Multimer",
"name": "Collagen-X",
"components": ["Q03692"],
"ebiRef": "EBI-2528323",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_22_human&class=Multimer#bottom",
"Stoichiometry": "3 Q03692"}

,
"MULT_23_human": {
"type": "Multimer",
"name": "Fibrinogen",
"components": ["P02671", "P02675", "P02679"],
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_23_human&class=Multimer#bottom",
"Stoichiometry": "2 P02671+ 2 P02675 + 2 P02679"}

,
"MULT_24_human": {
"type": "Multimer",
"name": "Integrin-alphaIIbbeta3",
"components": ["P05106", "P08514"],
"ebiRef": "EBI-2554508",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_24_human&class=Multimer#bottom",
"Stoichiometry": "1 P08514 + 1 P05106"}

,
"MULT_25_human": {
"type": "Multimer",
"name": "Integrin-alpha2beta1",
"components": ["P05556", "P17301"],
"ebiRef": "EBI-2565102",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_25_human&class=Multimer#bottom",
"Stoichiometry": "1 P17301 + 1 P05556"}

,
"MULT_26_human": {
"type": "Multimer",
"name": "Integrin-alpha4beta1",
"components": ["P05556", "P13612"],
"ebiRef": "EBI-2565117",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_26_human&class=Multimer#bottom",
"Stoichiometry": "1 P13612 + 1 P05556"}

,
"MULT_27_human": {
"type": "Multimer",
"name": "Laminin-211",
"components": ["P24043", "P07942", "P11047"],
"ebiRef": "EBI-2529716",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_27_human&class=Multimer#bottom",
"Stoichiometry": "1 P24043 + 1 P07942 + 1 P11047"}

,
"MULT_28_human": {
"type": "Multimer",
"name": "Laminin-121",
"components": ["P25391", "P55268", "P11047"],
"ebiRef": "EBI-2529791",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_28_human&class=Multimer#bottom",
"Stoichiometry": "1 P25391 + 1 P55268 + 1 P11047"}

,
"MULt_29_human": {
"type": "Multimer",
"name": "Laminin-221",
"components": ["P24043", "P55268", "P11047"],
"ebiRef": "EBI-2529805",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULt_29_human&class=Multimer#bottom",
"Stoichiometry": "1 P24043 + 1 P55268 + 1 P11047"}

,
"MULT_30_human": {
"type": "Multimer",
"name": "Laminin-332",
"components": ["Q16787", "Q13751", "Q13753"],
"ebiRef": "EBI-2529819",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_30_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16787 + 1 Q13751 + 1 Q13753"}

,
"MULT_31_human": {
"type": "Multimer",
"name": "Laminin-311",
"components": ["Q16787", "P07942", "P11047"],
"ebiRef": "EBI-2529903",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_31_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16787 + 1 P07942 + 1 P11047"}

,
"MULT_32_human": {
"type": "Multimer",
"name": "Laminin-321",
"components": ["Q16787", "P55268", "P11047"],
"ebiRef": "EBI-2529917",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_32_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16787 + 1 P55268 + 1 P11047"}

,
"MULT_33_human": {
"type": "Multimer",
"name": "Laminin-411",
"components": ["Q16363", "P07942", "P11047"],
"ebiRef": "EBI-2529931",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_33_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16363 + 1 P07942 + 1 P11047"}

,
"MULt_34_human": {
"type": "Multimer",
"name": "Laminin-421",
"components": ["Q16363", "P55268", "P11047"],
"ebiRef": "EBI-2529945",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULt_34_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16363 + 1 P55268 + 1 P11047"}

,
"MULT_35_human": {
"type": "Multimer",
"name": "Laminin-511",
"components": ["O15230", "P07942", "P11047"],
"ebiRef": "EBI-2529959",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_35_human&class=Multimer#bottom",
"Stoichiometry": "1 O15230 + 1 P07942 + 1 P11047"}

,
"Mult_36_human": {
"type": "Multimer",
"name": "Laminin-521",
"components": ["O15230", "P55268", "P11047"],
"ebiRef": "EBI-2529973",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=Mult_36_human&class=Multimer#bottom",
"Stoichiometry": "1 O15230 + 1 P55268 + 1 P11047"}

,
"MULT_37_human": {
"type": "Multimer",
"name": "Laminin-213",
"components": ["P24043", "P07942", "Q9Y6N6"],
"ebiRef": "EBI-2520006",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_37_human&class=Multimer#bottom",
"Stoichiometry": "1 P24043 + 1 P07942 + 1 Q9Y6N6"}

,
"MULT_38_human": {
"type": "Multimer",
"name": "Laminin-423",
"components": ["Q16363", "P55268", "Q9Y6N6"],
"ebiRef": "EBI-2520020",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_38_human&class=Multimer#bottom",
"Stoichiometry": "1 Q16363+ 1 P55268 + 1 Q9Y6N6"}

,
"MULT_39_human": {
"type": "Multimer",
"name": "Laminin-522",
"components": ["O15230", "P55268", "Q13753"],
"ebiRef": "EBI-2520034",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_39_human&class=Multimer#bottom",
"Stoichiometry": "1 O15230 + 1  P55268 + 1 Q13753"}

,
"MULT_40_human": {
"type": "Multimer",
"name": "Laminin-523",
"components": ["O15230", "P55268", "Q9Y6N6"],
"ebiRef": "EBI-2520049",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_40_human&class=Multimer#bottom",
"Stoichiometry": "1 O15230 + 1  P55268 + 1 Q9Y6N6"}

,
"MULT_41_human": {
"type": "Multimer",
"name": "Collagen-VII",
"components": ["Q02388"],
"ebiRef": "EBI-2466039",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_41_human&class=Multimer#bottom",
"Stoichiometry": "3 Q02388"}

,
"MULT_42_VAR1_human": {
"type": "Multimer",
"name": "Collagen-VIII v1",
"components": ["P27658", "P25067"],
"ebiRef": "EBI-2528208",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_42_VAR1_human&class=Multimer#bottom",
"Stoichiometry": "2 P27658 + 1 P25067"}

,
"MULT_42_VAR2_human": {
"type": "Multimer",
"name": "Collagen-VIII v2",
"components": ["P27658"],
"ebiRef": "EBI-2528219",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_42_VAR2_human&class=Multimer#bottom",
"Stoichiometry": "3 P27658"}

,
"MULT_42_VAR3_human": {
"type": "Multimer",
"name": "Collagen-VIII v3",
"components": ["P25067"],
"ebiRef": "EBI-2528228",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_42_VAR3_human&class=Multimer#bottom",
"Stoichiometry": "3 P25067"}

,
"MULT_43_human": {
"type": "Multimer",
"name": "Collagen-XV",
"components": ["P39059"],
"ebiRef": "EBI-2528649",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_43_human&class=Multimer#bottom",
"Stoichiometry": "3 P39059"}

,
"MULT_44_human": {
"type": "Multimer",
"name": "Collagen-XVI",
"components": ["Q07092"],
"ebiRef": "EBI-2528687",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_44_human&class=Multimer#bottom",
"Stoichiometry": "3 Q07092"}

,
"MULT_45_human": {
"type": "Multimer",
"name": "Collagen-XVII",
"components": ["Q9UMD9"],
"ebiRef": "EBI-2528731",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_45_human&class=Multimer#bottom",
"Stoichiometry": "3 Q9UMD9"}

,
"MULT_46_human": {
"type": "Multimer",
"name": "Collagen-XVIII",
"components": ["P39060"],
"ebiRef": "EBI-2528782",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_46_human&class=Multimer#bottom",
"Stoichiometry": "3 P39060"}

,
"MULT_47_human": {
"type": "Multimer",
"name": "Collagen-XIX",
"components": ["Q14993"],
"ebiRef": "EBI-2529092",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_47_human&class=Multimer#bottom",
"Stoichiometry": "3 Q14993"}

,
"MULT_48_human": {
"type": "Multimer",
"name": "Collagen-XX",
"components": ["Q9P218"],
"ebiRef": "EBI-2529132",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_48_human&class=Multimer#bottom",
"Stoichiometry": "3 Q9P218"}

,
"MULT_49_human": {
"type": "Multimer",
"name": "Collagen-XXI",
"components": ["Q96P44"],
"ebiRef": "EBI-2529143",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_49_human&class=Multimer#bottom",
"Stoichiometry": "3 Q96P44"}

,
"MULT_50_human": {
"type": "Multimer",
"name": "Collagen-XXII",
"components": ["Q8NFW1"],
"ebiRef": "EBI-2529189",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_50_human&class=Multimer#bottom",
"Stoichiometry": "3 Q8NFW1"}

,
"MULT_51_human": {
"type": "Multimer",
"name": "Collagen-XXIII",
"components": ["Q86Y22"],
"ebiRef": "EBI-2529234",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_51_human&class=Multimer#bottom",
"Stoichiometry": "3 Q86Y22"}

,
"MULT_52_human": {
"type": "Multimer",
"name": "Collagen-XXIV",
"components": ["Q17RW2"],
"ebiRef": "EBI-2529258",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_52_human&class=Multimer#bottom",
"Stoichiometry": "3 Q17RW2"}

,
"MULT_53_human": {
"type": "Multimer",
"name": "Collagen_XXV",
"components": ["Q9BXS0"],
"ebiRef": "EBI-2529312",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_53_human&class=Multimer#bottom",
"Stoichiometry": "3 Q9BXS0"}

,
"MULT_54_human": {
"type": "Multimer",
"name": "Collagen-XXVI",
"components": ["Q96A83"],
"ebiRef": "EBI-2529362",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_54_human&class=Multimer#bottom",
"Stoichiometry": "3 Q96A83"}

,
"MULT_55_human": {
"type": "Multimer",
"name": "Collagen-XXVII",
"components": ["Q8IZC6"],
"ebiRef": "EBI-2529377",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_55_human&class=Multimer#bottom",
"Stoichiometry": "3 Q8IZC6"}

,
"MULT_56_human": {
"type": "Multimer",
"name": "Collagen-XXVIII",
"components": ["Q2UY09"],
"ebiRef": "EBI-2529426",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_56_human&class=Multimer#bottom",
"Stoichiometry": "3 Q2UY09"}

,
"MULT_57_human": {
"type": "Multimer",
"name": "Thrombospondin-1",
"components": ["P07996"],
"ebiRef": "EBI-2530370",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_57_human&class=Multimer#bottom",
"Stoichiometry": "3 P07996"}

,
"MULT_58_human": {
"type": "Multimer",
"name": "Thrombospondin-2",
"components": ["P35442"],
"ebiRef": "EBI-2530917",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_58_human&class=Multimer#bottom",
"Stoichiometry": "3 P35442"}

,
"MULT_59_human": {
"type": "Multimer",
"name": "Thrombospondin-3",
"components": ["P49746"],
"ebiRef": "EBI-2530961",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_59_human&class=Multimer#bottom",
"Stoichiometry": "5 P49746"}

,
"MULT_60_human": {
"type": "Multimer",
"name": "Thrombospondin-4",
"components": ["P35443"],
"ebiRef": "EBI-2530975",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_60_human&class=Multimer#bottom",
"Stoichiometry": "5 P35443"}

,
"MULT_61_human": {
"type": "Multimer",
"name": "Thrombospondin_5",
"components": ["P49747"],
"ebiRef": "EBI-2531058",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_61_human&class=Multimer#bottom",
"Stoichiometry": "5 P49747"}

,
"MULT_62_human": {
"type": "Multimer",
"name": "Integrin-alpha6beta1",
"components": ["P23229", "P05556"],
"ebiRef": "EBI-2565268",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_62_human&class=Multimer#bottom",
"Stoichiometry": "1 P23229 + 1 P05556"}

,
"MULT_63_human": {
"type": "Multimer",
"name": "Integrin-alpha7beta1",
"components": ["Q13683", "P05556"],
"ebiRef": "EBI-2565379",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_63_human&class=Multimer#bottom",
"Stoichiometry": "1 Q13683 + 1 P05556"}

,
"MULT_64_human": {
"type": "Multimer",
"name": "Integrin-alpha8beta1",
"components": ["P53708", "P05556"],
"ebiRef": "EBI-2567920",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_64_human&class=Multimer#bottom",
"Stoichiometry": "1 P53708 + 1 P05556"}

,
"MULT_65_human": {
"type": "Multimer",
"name": "Integrin-alpha9beta1",
"components": ["Q13797", "P05556"],
"ebiRef": "EBI-2567957",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_65_human&class=Multimer#bottom",
"Stoichiometry": "1 Q13797 + 1 P05556"}

,
"MULT_66_human": {
"type": "Multimer",
"name": "Integrin-alpha10beta1",
"components": ["O75578", "P05556"],
"ebiRef": "EBI-2568006",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_66_human&class=Multimer#bottom",
"Stoichiometry": "1 O75578 + 1 P05556"}

,
"MULT_67_human": {
"type": "Multimer",
"name": "Integrin-alpha11beta1",
"components": ["Q9UKX5", "P05556"],
"ebiRef": "EBI-2568044",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_67_human&class=Multimer#bottom",
"Stoichiometry": "1 Q9UKX5 + 1 P05556"}

,
"MULT_68_human": {
"type": "Multimer",
"name": "Integrin-alphavbeta1",
"components": ["P06756", "P05556"],
"ebiRef": "EBI-2568057",
"getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_68_human&class=Multimer#bottom",
"Stoichiometry": "1 P06756 + 1 P05556"}

,
				 "MULT_69_human": {
				     "type": "Multimer",
				     "name": "Integrin-alphavbeta6",
				     "components": ["P06756", "P18564"],
				     "ebiRef": "EBI-2568099",
				     "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_69_human&class=Multimer#bottom",
				     "Stoichiometry": "1 P06756 + 1 P18564"}
				 
				 ,
				 "MULT_70_human": {
    "type": "Multimer",
    "name": "Integrin-alphavbeta8",
    "components": ["P06756", "P26012"],
    "ebiRef": "EBI-2568170",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_70_human&class=Multimer#bottom",
    "Stoichiometry": "1 P06756 + 1 P26012"}
				 
				 ,
				 "MULT_71_human": {
    "type": "Multimer",
    "name": "Integrin-alpha6beta4",
    "components": ["P23229", "P16144"],
    "ebiRef": "EBI-2568184",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_71_human&class=Multimer#bottom",
    "Stoichiometry": "1 P23229 + 1 P16144"}
				 
				 ,
				 "MULT_72_human": {
    "type": "Multimer",
    "name": "Integrin-alpha4beta7",
    "components": ["P13612", "P26010"],
    "ebiRef": "EBI-2568198",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_72_human&class=Multimer#bottom",
    "Stoichiometry": "1 P13612 + 1 P26010"}
				 
				 ,
				 "MULT_73_human": {
				     "type": "Multimer",
				     "name": "Integrin-alphaEbeta7",
    "components": ["P38570", "P26010"],
    "ebiRef": "EBI-2568216",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_73_human&class=Multimer#bottom",
    "Stoichiometry": "1 P38570 + 1 P26010"}
				 
				 ,
				 "MULT_74_human": {
    "type": "Multimer",
    "name": "Integrin-alphaLbeta2",
    "components": ["P20701", "P05107"],
    "ebiRef": "EBI-2568233",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_74_human&class=Multimer#bottom",
    "Stoichiometry": "1 P20701 + 1 P05107"}
				 
				 ,
				 "MULT_75_human": {
    "type": "Multimer",
    "name": "Integrin-alphaMbeta2",
    "components": ["P11215", "P05107"],
    "ebiRef": "EBI-2568294",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_75_human&class=Multimer#bottom",
    "Stoichiometry": "1 P11215 + 1 P05107"}
				 
				 ,
				 "MULT_76_human": {
    "type": "Multimer",
    "name": "Integrin-alphaXbeta2",
    "components": ["P20702", "P05107"],
    "ebiRef": "EBI-2568341",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_76_human&class=Multimer#bottom",
    "Stoichiometry": "1 P20702 + 1 P05107"}
				 
				 ,
				 "MULT_77_human": {
    "type": "Multimer",
    "name": "Integrin-alphaDbeta2",
    "components": ["Q13349", "P05107"],
    "ebiRef": "EBI-2568341",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_77_human&class=Multimer#bottom",
    "Stoichiometry": "1 Q13349 + 1 P05107"}
				 
				 ,
				 "MULT_78_human": {
    "type": "Multimer",
    "name": "PDGF-BB",
    "components": ["P01127"],
    "ebiRef": "EBI-2881451",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_78_human&class=Multimer#bottom",
    "Stoichiometry": "2 P01127"}
				 
				 ,
				 "MULT_79_human": {
    "type": "Multimer",
    "name": "PDGF-AB",
    "components": ["P04085", "P01127"],
    "ebiRef": "EBI-2881436",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_79_human&class=Multimer#bottom",
    "Stoichiometry": "1 P04085 + 1 P01127"}
				 
				 ,
				 "MULT_80_human": {
    "type": "Multimer",
    "name": "PDGF-AA",
    "components": ["P04085"],
    "ebiRef": "EBI-2881443",
    "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_80_human&class=Multimer#bottom",
    "Stoichiometry": "2 P04085"}
				 
				 ,
				 "MULT_81_VAR1_human": {
				     "type": "Multimer",
				     "name": "VEGF-A165",
				     "components": ["P15692"],
				     "getUrl": "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=MULT_81_VAR1_human&class=Multimer#bottom",
				     "Stoichiometry": "2 P15692"}
			     };
			     
			 });
	     
//	     console.log ("converter " + typeof (self.converter));
//	     console.dir (self.converter);		
	     //}
	 },
	 _generateContextualMenuDataTable :function (dataTable, cell) {
	     var self = this;
//	     console.log ("Generating contextual menu");
//	     console.dir (cell);

	     jQuery(cell).qtip({
				   
				   
				   /*style: {
				    widget:true
				    },*/		       
				   
				   content: {
				       text: function(api) {
					   var qtipContent = self._qtipGenerateContent (api, dataTable, cell); //"this is some content";
					   $(this).attr('qtip-content', qtipContent.text);
					   return $(this).attr('qtip-content');
				       },
				       
				       title: function(api) {								
					   var qtipContent = self._qtipGenerateContent (api, dataTable, cell); //"this is some content";
					   $(this).attr('qtip-content', qtipContent.title);
					   return $(this).attr('qtip-content');
				       }
				   },
				   position: {
				       target: 'mouse', // Position it where the click was...
				       adjust: { mouse: false } // ...but don't follow the mouse
				   },
				   show: 'mousedown', // Can't use click event for this, sorry!
				   events: {
				       show: function(event, api) {
					   $('.qtip').each(function(){
							       $(this).qtip('hide');
							   });
					   /*
					    * event.originalEvent contains the event that caused the callback to be fired.
					    * event.originalEvent.button tells us which button was clicked e.g. 1= left, 2 = right;
					    */
					   
					   if(event.originalEvent.button !== 2) {
					       // IE might throw an error calling preventDefault(), so use a try/catch block.
					       try { event.preventDefault(); } catch(e) {}
					   }
				      }
				   }
			       })
	     // Little snippet that stops the regular right-click menu from appearing
		 .bind('contextmenu', function(){ return false; });
	 },
	_qtipGenerateContent :function (api, dataTable, cell) {           
	    
	    var index = dataTable.fnGetPosition(cell);
	    var nrow = index[0];
	    var ncol = index[1];	
	    var cellText = cell.innerHTML;
	    
	    var qtipContent;
   
	    var aceClass = undefined;
 
	    
	    // Biomolecule Context
	    if (ncol == 0 || ncol == 5) {
		aceClass = "BioMolecule";
		var rawText = jQuery(cellText).text();
		var content;
		var getUrl;
		if( rawText in self.converter ) {	   
		    aceClass = self.converter[rawText].type;
		    content = $('<div></div>');	   
		    $(content).append(jQuery("<p id = qtipContextContent></p>"));
		    $(content).find('#qtipContextContent').append("<h4 id=qtTitle>" +  self.converter[rawText].name  + "</h4>");
		    //		    $(content).log("see me?");
		    if ("chebiRef" in self.converter[rawText]) {
			var chebiUrl="http://www.ebi.ac.uk/chebi/searchId.do?chebiId=" + self.converter[rawText].chebiRef;
			$(content).find('#qtTitle').append("<a class=\"alink\" href = \"" + chebiUrl + "\" target=\"_blank\">" + 
							   "<img src = \"../images/chebiLogo.png\" alt=\"chebiLogo\" class=\"qtipLogo2\"/>"
							   + "</a>");
		    }
		    
		    if ("comments" in converter[rawText]) {
			$(content).find('#qtipContextContent').append(self.converter[rawText].comments);
		    }
		    if ("Stoichiometry" in converter[rawText]) {
			$(content).find('#qtipContextContent').append("Stoichiometry: " + self.converter[rawText].Stoichiometry);
		    }
		    if ("ebiRef" in self.converter[rawText]) {
			
		    }
		    
		    /*add some comments here*/
		    /*...*/
		    /*list subunits if required*/
		    
		    if ("components" in self.converter[rawText]) {
			jQuery(content).append(jQuery("<h4><img src = \"../images/icon_uniprotkb.png\" alt=\"uniprotkb\" class=\"qtipLogo\"/>Component subunits<h4>"
						      + "<p id=\"compounds\"></p>"));
			var componentList = jQuery('<ul></ul>');
			for (var i = 0; i < self.converter[rawText].components.length; i++) {
			    var name = self.converter[rawText].components[i];
			    var url = "http://www.uniprot.org/uniprot/" + name;
		    jQuery(componentList).append(jQuery("<li><a class=\"alink\" href = \"" + url + "\" target=\"_blank\">" + name + "</a></li>"));
			}
			
			jQuery(content).find('#compounds').append(jQuery(componentList));
		    }
		    
		    
		} else {
		    
		    var text = "http://www.uniprot.org/uniprot/" + rawText;
		    getUrl = "http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=" + rawText + "&class=" + aceClass + "#bottom";
		    content = jQuery ("<div>"
				      + "<p><a class=\"alink\" href = \"" + text + "\" target=\"_blank\">"
				      + "<img src = \"../images/icon_uniprotkb.png\" alt=\"uniprotkb\" class=\"qtipLogo\"/></a></p>"
				      + "<p><a class=\"alink\" href = \"" + getUrl + "\" target=\"_blank\">"
				      + "\"visit matrixdb\"</a></p>"
				      + "</div>");
		}	
		
		/*set global style for all hyperlink*/
		
		qtipContent = { text :  content.html() , title :   aceClass };
		
		return qtipContent;
	    } else if (ncol == 1) {
		// catch database provider

		// create contextal menu with proper link to annotator db			
		
		//var urll = "http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=<dip identifier>";

	    }
//	    console.log (qtipContent);
	    return qtipContent;
	    //return content.html();
	},

	// Public method, documented

	/**
	 * redraw is a method to refresh the content of a pre existing instance of this component
	 * @param {Object} interactionSetObject a json object storing inteaction data to display
	 */
	redraw : function (opt){
	    
	    var oTable = this._contentTable.dataTable();
	    oTable.fnClearTable();
	    //alert (typeof opt.interactionSetObject);
	    oTable.fnAddData(opt.interactionSetObject.aaData);
	    this._formatCells ();

	},
	// Following methods will have to be implement to use biojs qtip library
	displayQtip : function () {	  
	},
	refreshQtip : function (){	    
	}	
	    
    });
