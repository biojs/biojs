/** 
 * Component to represent Human Protein Atlas summary protein expression 
 * information from a DAS XML
 * 
 * @class
 * @extends Biojs
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='../biojs/css/Biojs.HpaSummaryFeature.css'>Biojs.HpaSummaryFeature.css</a>
 * @dependency <link href="../biojs/css/Biojs.HpaSummaryFeature.css" rel="stylesheet" type="text/css" />
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} hpaDasUrl
 * 	  Url pointing to an XML including HPA infomration in DAS format
 * 
 * @option {string} width [900px]
 * 	  List of points including summary information for this feature
 * 
 * @option {string} imageWidth [200px]
 * 	  List of points including summary information for this feature
 * 
 * @option {string} [proxyUrl='../biojs/dependencies/proxy/proxy.php']
 *    Since the same origin policy ({@link http://en.wikipedia.org/wiki/Same_origin_policy}) in the browsers 
 *    Biojs include a proxy script in PHP which redirects Ajax requests from local to any other domain.
 *    You can use tour own proxy script by modifying this value. 
 * 
 * @example
 * var instance = new Biojs.GeneProteinSummary({
 * 	  target: 'YourOwnDivId',
 * 	  hpaDasUrl: 'http://www.ebi.ac.uk/~rafael/web/copa/Q9NTI5_hpa_summary.xml',
 * 	  width: '590px',
 * 	  imageWidth: '150px'
 * });
 * 
 */

Biojs.HpaSummaryFeatures = Biojs.extend ({
	constructor: function (options) {
		var self = this;
		self._componentPrefix = "hpaSummaryFeatures_";
		
		/* URL where to get DAS XML */
		self._url;
		if(self.opt.proxyUrl != ""){
			self._url= self.opt.proxyUrl + "?url=" + self.opt.hpaDasUrl;
		} else {
			self._url= self.opt.hpaDasUrl;	
		}

		/* get XML */
	    jQuery.ajax({
		    type: "GET",
		    url: self._url,
		    dataType: "xml",
		    success: processDasHpaXml
	    });
		
		/* process HPA XML */
		function processDasHpaXml(xml)
		{
			var antibodies = getAntibodiesAccessions(xml);
			var html = createHtmlContainer(antibodies);
			jQuery('#'+self.opt.target+'').html(html);
			displayHpaSummaries(xml,antibodies)
		}
		
		/* get antibodies accessions */
		function getAntibodiesAccessions(xml){
			var tempSet = new Object();
			jQuery(xml).find("PARENT").each(function(){
				var antibodyTextSplit = jQuery(this).attr("id").split("_");
				if(antibodyTextSplit.length == 2){
					tempSet[antibodyTextSplit[0]] = true;	
				}
			});
			var antibodies = new Array();
			for (var a in tempSet){
				antibodies.push(a);	
			}
			return antibodies;
		}	
		
		/* create HTML container to later populate HPA data */
		function createHtmlContainer(antibodies) {
			var html = '';
			for (var a in antibodies) {
				html += '<div style="width:'+self.opt.width+';" class="'+self._componentPrefix+'antibodyTitle">Antibody '+antibodies[a]+'</div>'
				html += '<div class="'+self._componentPrefix+'summary" id="'+antibodies[a]+'_cell_line_immunofluorescence_summary"></div>';
				html += '<div class="'+self._componentPrefix+'summary" id="'+antibodies[a]+'_cell_line_immunohistochemistry_summary"></div>';
		        html += '<div class="'+self._componentPrefix+'summary" id="'+antibodies[a]+'_cell_line_immunohistochemistry_summary"></div>';
		        html += '<div class="'+self._componentPrefix+'summary" id="'+antibodies[a]+'_cancer_tissue_immunohistochemistry_summary"></div>';
		        html += '<div class="'+self._componentPrefix+'summary" id="'+antibodies[a]+'_normal_tissue_immunohistochemistry_summary"></div>';					
			}
			return html;
		}
		
		/* Disaply HPA summaries inside the HTML container */
		function displayHpaSummaries(xml){
			jQuery(xml).find("FEATURE").each(function(){
				if (jQuery(this).attr("id").indexOf("_summary") != -1) {
					/* Get notes */
					var notes = new Array();
					var xmlNotes = jQuery(this).find("NOTE");
					xmlNotes.each(function(){
						notes.push(jQuery(this).text());
					});
					/* Get links */
					var imageUrl = "";
					var imageTitle = "";
					var linkUrl = "";
					var linkTitle = "";
					var xmlLinks = jQuery(this).find("LINK");
					xmlLinks.each(function(){
						if (jQuery(this).attr("href").indexOf(".jpg") != -1 || jQuery(this).attr("href").indexOf(".png") != -1) {
							imageUrl = jQuery(this).attr("href");
							imageTitle = jQuery(this).text();
						}
						else 
							if (jQuery(this).text().indexOf("original source") != -1) {
								linkUrl = jQuery(this).attr("href");
								linkTitle = jQuery(this).text();
							}
					});
					new Biojs.HpaSummaryFeature({
						target: jQuery(this).attr("id"),
						title: jQuery(this).attr("label"),
						imageUrl: imageUrl,
						imageTitle: imageTitle,
						notes: notes,
						linkUrl: linkUrl,
						linkTitle: linkTitle,
						width: self.opt.width,
						imageWidth: self.opt.imageWidth
					});
				}
			});
	
		}
	},
	opt: {
		target: 'hpaSummaryFeatues',
		hpaDasUrl: '',
		proxyUrl: '',		
		width: '900px',
		imageWidth: '200px'
	},
	eventTypes: []
	});