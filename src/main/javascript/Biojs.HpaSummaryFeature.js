/** 
 * Component to represent one summary feature. Originally design to display protein expression information from the Human Protein Atlas (HPA)
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:rafael@ebi.ac.uk">Rafael C Jimenez</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href='http://blog.jquery.com/2011/09/12/jquery-1-6-4-released/'>jQuery Core 1.6.4</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.6.4.js"></script>
 * 
 * @requires <a href='../biojs/css/Biojs.HpaSummaryFeature.css'>Biojs.HpaSummaryFeature.css</a>
 * @dependency <link href="../biojs/css/Biojs.HpaSummaryFeature.css" rel="stylesheet" type="text/css" />
 * 
 * @param {Object} options An object with the options for this component.
 *    
 * @option {string} target 
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {string} title
 * 	  Title of the summary
 * 
 * @option {string} imageUrl
 * 	  URL of an image file with expression data
 * 
 * @option {string} imageTitle
 * 	  Title or description of an image file with expression data
 * 
 * @option {string} notes
 * 	  List of point including summary information for this feature
 *  
 * @option {string} linkUrl
 * 	  List of points including summary information for this feature
 * 
 * @option {string} linkTitle
 * 	  List of points including summary information for this feature
 * 
 * @option {string} width [900px]
 * 	  List of points including summary information for this feature
 * 
 * @option {string} imageWidth [200px]
 * 	  List of points including summary information for this feature
 * 
 * @example
 * var instance = new Biojs.HpaSummaryFeature({
 * 	  target: 'YourOwnDivId',
 * 	  title: 'HPA001012 Normal Tissue immunohistochemistry summary',
 * 	  imageUrl: 'http://www.proteinatlas.org/images/1012/ihc_selected_medium.jpg',
 * 	  imageTitle: 'Immunohistochemical staining of human lymph node shows strong cytoplasmic positivity in lymphoid cells outside reaction centra',
 * 	  notes: ["Lymphoid tissues showed moderate to strong cytoplasmic positivity. Remaining normal cells were generally negative","Two (or more) antibodies yielding similar staining patterns which are consistent with available gene/protein characterization data","Expression summary: Selective cytoplasmic expression in lymphoid cells","Reliable score: High","Validation score: Supportive","67 normal tissues by immunohistochemistry"],
 * 	  linkUrl:'http://www.proteinatlas.org/ENSG00000089820/normal',
 * 	  linkTitle:'HPA original source',
 * 	  width: '585px',
 * 	  imageWidth: '150px'
 * });
 * 
 */

Biojs.HpaSummaryFeature = Biojs.extend (
	/** @lends Biojs.HpaSummaryFeature# */
	{
	constructor: function (options) {
		this._draw();
	},
	/*
     * Function: Biojs.GeneExpressionSummary._draw
     * Purpose:  Draw HPA summary feature
     * Returns:  -
     * Inputs:   opt -> {Object} options object.
     */
	_draw: function(){
		var self = this;
		self._componentPrefix = "hpaSummaryFeature_";
		
		/* Create a component container */
		self._componentDiv = jQuery('<div></div>');
		self._componentDiv.css('width',self.opt.width);
		
		/* Create table */
		self._leftColumn = jQuery('<td class="'+self._componentPrefix+'leftColumn"></td>');
		self._leftColumn.css({
			'width': self.opt.imageWidth,
			'vertical-align': 'top'
		});
		self._rightColumn = jQuery('<td class="'+self._componentPrefix+'rightColumn"></td>');
		self._rightColumn.css({
			'vertical-align': 'top'
		});
		self._mainRow = jQuery('<tr></tr>');
		self._mainRow.append(self._leftColumn);
		self._mainRow.append(self._rightColumn);
		self._table = jQuery('<table class="'+self._componentPrefix+'table"></table>');
		self._table.append(self._mainRow);
		self._table.css('width', '100%');
		
		/* Create container for left column */
		self._leftContainer = jQuery('<div class="'+self._componentPrefix+'leftContainer"></div>');
		
		/* Create image title */
		if (self.opt.imageTitle != "") {
			self._imageTitle = jQuery('<div class="'+self._componentPrefix+'imageTitle">'+self.opt.imageTitle+'</div>');
		}
	
		/* Create image */
		if (self.opt.imageUrl != "") {
			/* HPA image */
			self._image = jQuery('<img src="' + self.opt.imageUrl + '" class="' + self._componentPrefix + 'image" />');
			self._image.css({
				'width': '100%'
			});
			if(self.opt.imageTitle != ""){
				self._image.attr({
					'alt': 'HPA image',
					'title': self.opt.imageTitle
				});
			}
		}
		
		/* Create link icon */
		self._linkImage = jQuery('<div class="' + self._componentPrefix + 'linkImage" ></div>');
		
		/* Create link in left column including: image, link icon and image title  */
		if (self.opt.linkUrl != "") {
			self._link = jQuery('<a target="_blank" href="'+self.opt.linkUrl+'"></a>');
			if(self.opt.linkTitle != ""){
				self._link.attr({
					'title': self.opt.linkTitle
				});
			}
			if (self.opt.imageUrl != "") {
				self._link.append(self._image);
			}
			self._link.append(self._linkImage);
			self._leftContainer.append(self._link);
			if (self.opt.imageTitle != "" && self.opt.imageUrl != "") {
				/* Include image legend in left column */
				self._leftContainer.append(self._imageTitle);
			}
		} else {
			/* Still print image if there is no link */
			self._leftContainer.append(self._image);
			if (self.opt.imageTitle != "" && self.opt.imageUrl != "") {
				/* Include image legend in left column */
				self._leftContainer.appenf(self._imageTitle);
			}
		}
		
		/* Create title in right column */
		self._contentTitle = jQuery('<div class="'+self._componentPrefix+'contentTitle">'+self.opt.title+'</div>');
		
		/* Create notes in right column */
		self._contentNotes = jQuery('<ul class="'+self._componentPrefix+'contentNotes"></ul>');
		jQuery.each(self.opt.notes, function(k, v) {
			self._contentNotes.append(jQuery('<li>' + v + '</li>'))
	    });
		
		/* Put everything together */
		jQuery("#"+self.opt.target).append(self._componentDiv);
		self._componentDiv.append(self._table);	
		self._leftColumn.append(self._leftContainer);
		self._rightColumn.append(self._contentTitle);
		self._rightColumn.append(self._contentNotes);
	},
	/**
	 * Default values for the options
	 * @name Biojs.HpaSummaryFeature-opt
	 */
	opt: {
		target: '',
		title: '',
		imageUrl: '',
		imageTitle: '',
		notes: [],
		linkUrl:'',
		linkTitle:'',
		width: '900px',
		imageWidth: '200px'
	},
   /**
    * Array containing the supported event names
    * @name Biojs.HpaSummaryFeature-eventTypes
    */
	eventTypes: [
	/**
	 * @name Biojs.HpaSummaryFeature#onFeatureSelected
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} textSelected Selected text.
	 * @example 
	 * instance.onTextSelected(
	 *    function( objEvent ) {
	 *       alert(objEvent.textSelected);
	 *    }
	 * ); 
	 * 
	 * */
     "onTextSelected"    
	]
});