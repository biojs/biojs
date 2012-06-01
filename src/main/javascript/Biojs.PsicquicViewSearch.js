Biojs.PsicquicViewSearch = Biojs.extend({
	constructor : function(options) {
		/* Your constructor code here
		Note: options provided on instantiation time overrides the
		default values in this.opt, automatically; i.e. ‘options’
		argument refers to the provided values and ‘this.opt’
		refers to the  the overridden options. For more details,
		go to section 6.3.2 in the spec. doc. */
		// Get MIQL query (default:*)
		// Query registry
		// Get selected services (default:all)
		// Fire onQueryReady
		// Query services (count)
		// Display
		Biojs.console.enable();
		var self = this;

		this._selector = "#" + this.opt.target;
		this._container = jQuery(this._selector);

		this._container.addClass("PsicquicViewSearch");

		self._drawHeader();
		self._drawQueryFields();
		self.querySearch(self.opt.miqlQuery, self.opt.defaultCheckedServices);

	},
	opt : {
		/* Target DIV
		 This mandatory parameter is the identifier of the DIV tag where the
		 component should be displayed. Use this value to draw your
		 component into. */
		target : 'YourOwnDivId',
		miqlQuery : '*:*',
		urlRegistry : 'http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS&format=xml',
		queryBoxDisplay : true,
		queryFieldsDisplay : true,
		servicesListDisplay : true,
		defaultCheckedServices : [],
		displayedServices : [],
		proxyUrl : '../biojs/dependencies/proxy/proxy.php'

		/* Component Options
		 These options defines the input data for your component.
		 Must have a default value for each one. Note that, either some or
		 all of values might be replaced by the constructor using the values
		 provided in instantiation time.

		 Define your own options here following the next syntax:
		 <option1>: <defaultValue1>,
		 <option2>: <defaultValue2>,
		 :
		 .
		 <optionN>: <defaultValueN> */
	},

	eventTypes : [

	/* Event Names
	 The parent class Biojs build the event handlers automatically
	 with the names defined here. Use this.raiseEvent(<eventName>,
	 <eventData>) for triggering an event from this component. Where,
	 <eventName> is a string (defined in eventTypes) and <eventData> is
	 an object which should be passed to the registered listeners.

	 Define your event names following the syntax:
	 “<eventName1>”,
	 “<eventName2>”,
	 :
	 .
	 “<eventNameN>”
	 */
	],

	/*
	 * this draws the upper part of the component which displays the
	 * query input box , the advanced search fileds and related button(s)
	 *
	 *
	 */
	_draw : function() {
		if($('#servicesListDisplay').length == 0) {
			alert('hoho');
			this._drawTemplate();
		} else {
			this._updateTemplate();
		}
		Biojs.console.log("draw wrapper");
	},

	_drawHeader : function() {
		var self = this;
		self._searchHeaderDiv = jQuery('<div id="searchHeader"></div>');
		self._queryBoxDisplayDiv = jQuery('<div id="queryBoxDisplay"></div>');

		if(jQuery.isEmptyObject(self.opt.miqlQuery)) {
			self._setMiqlQuery("*:*");
		}

		self._queryBoxDisplayDiv.append('<label>Query</label>' + '<input type="text" name="textbox" id="textbox" value=' + self.opt.miqlQuery + '>');

		jQuery('<button id = "searchButton">Search</button>').appendTo(self._queryBoxDisplayDiv).click(function(event) {
			self._setMiqlQuery($('#textbox').attr('value'));
			self.querySearch(self.opt.miqlQuery, self.getCheckedServices());
		});

		self._queryBoxDisplayDiv.css("position", "relative").css('width', '100%');
		self._queryFieldsDisplayDiv = jQuery('<div id="queryFieldsDisplay"></div>');
		self._queryFieldsDisplayDiv.css("position", "relative").css('width', '100%');

		jQuery("#" + self.opt.target).append(self._searchHeaderDiv);
		jQuery(self._searchHeaderDiv).append(self._queryBoxDisplayDiv);
		jQuery(self._searchHeaderDiv).append(self._queryFieldsDisplayDiv);

	},

	_updateTemplate : function() {
		self = this;
		Biojs.console.log("updating");
		/*update traffic lights*/
		$('#servicesListDisplay :checked').//attr("src","http://localhost/biojs/src/test/data/greenLight.png").
		siblings('img').attr("src", "http://localhost/biojs/src/test/data/greenLight.png");
		//each(function(){Biojs.console.log(this)});
		//	$('#servicesListDisplay :input:not(:checked)[disabled != disabled]').//attr("src","http://localhost/biojs/src/test/data/greyLight.png").
		//siblings('img').attr("src", "http://localhost/biojs/src/test/data/greyLight.png");

		/*refresh hit number*/
		Biojs.console.log(self._registry);
		Biojs.console.log("browsing");
		self._registry.each(function() {
			var name = jQuery(this).find("name").text();
			var count = jQuery(this).find("count").text();
			Biojs.console.log('#' + name + 'Hit[serviceName=' + name + ']');
			$('#servicesListDisplay').find('#' + name + 'Hit').html(count);
			/*if(name.toLowerCase() == serviceName){
			 *
			 * ,{id:serviceName + "Hit"}).html(count)

			 var count = jQuery(this).find("count").text();
			 jQuery(this).find("count").text(serviceCount);
			 */
		});
		Biojs.console.log("done");
	},

	_registry : {},

	_queryRegistry : function(countAndDrawOptions) {
		//var countAndDrawOptions = {doCountUpdate:false,drawTemplate:true};
		var self = this;
		/* get XML */
		jQuery.ajax({
			type : "GET",
			url : this.opt.urlRegistry,
			dataType : "xml",
		}).done(function(xml) {
			self._registry = jQuery(xml).find("service");
			if(countAndDrawOptions.doCountUpdate) {
				Biojs.console.log("INFO: " + self._registry.length + " services retrieved from the registry! ");
				self._updateServicesCount(self.opt.miqlQuery, self.getCheckedServices());
			}
			if(countAndDrawOptions.drawTemplate) {
				self._draw();
			}
		}).fail(function(jqXHR, textStatus) {
			Biojs.console.log("ERROR: " + textStatus);
		});
	},
	/*
	 *
	 * wrap checked boxes matching service names id
	 * populate an array with service names if their box is checked
	 *
	 */

	getCheckedServices : function() {
		Biojs.console.log("getting checked services..");
		var servicesList = [];
		$('#servicesListDisplay').find(':checked').each(function() {
			servicesList.push(jQuery(this).attr('serviceName').toLowerCase());
		});
		Biojs.console.log(servicesList);

		/* populate array with id element */
		return servicesList;
	},

	querySearch : function(miqlQuery, checkedServices) {
		Biojs.console.log("INFO: miqlQuery: " + miqlQuery);
		Biojs.console.log("INFO: checkedServices: " + checkedServices);
		if(jQuery.isEmptyObject(this._registry) && miqlQuery == "*:*") {
			this._queryRegistry({
				doCountUpdate : false,
				drawTemplate : true
			});
		} else if(jQuery.isEmptyObject(this._registry) && miqlQuery != "*:*") {
			this._queryRegistry({
				doCountUpdate : true,
				drawTemplate : false
			});
		} else {
			this._updateServicesCount(miqlQuery, this.getCheckedServices());
		}
		//self._drawTemplate();
	},

	_drawQueryFields : function() {
		var self = this;
		var queryFieldsDisplay = jQuery("#queryFieldsDisplay");

		var andOr = '<select id="queryFieldsDisplay_andOr">';
		andOr += '<option selected="" value="AND">AND</>';
		andOr += '<option value="OR">OR</>';
		andOr += '</select>';

		var not = '<span id="queryFieldsDisplay_not">';
		not += '<input id="queryFieldsDisplay_notInput" type="checkbox" value="NOT">';
		not += '<label for="queryFieldsDisplay_notLabel">NOT</label>';
		not += '</span>';

		var fieldKey = '<select id="newQueryField" class="af_selectOneChoice_content" name="newQueryField">';
		fieldKey += '<selected="" value="0">All</>';
		fieldKey += '<option value="identifier">Participant Id</>';
		fieldKey += '<option value="interaction_id">Interaction Id</>';
		fieldKey += '<option value="detmethod">Detection method</>';
		fieldKey += '<option value="type">Interaction type</>';
		fieldKey += '<option value="species">Organism</>';
		fieldKey += '<option value="pubid">Pubmed Id</>';
		fieldKey += '<option value="pubauth">Author</>';
		fieldKey += '</select>';

		var fieldValue = '<input id="queryFieldsDisplay_fieldValue" type="text" value="" size="50" name="queryFieldsDisplay_fieldValue">';
		var addSearchButton = '<button id="queryFieldsDisplay_addSearchButton" type="button">';
		addSearchButton += 'Add &amp; Search';
		addSearchButton += '</button>';
		addSearchButton = jQuery(addSearchButton).click(function() {

			var searchBoxVal = jQuery("#textbox");
			//alert(jQuery(searchBoxVal).val());
			var andOrOptValue = jQuery("#queryFieldsDisplay_andOr");
			//alert(jQuery(andOrOptValue).val());
			var notOptValue = "";
			var notOptValue_ = jQuery("#queryFieldsDisplay_not :checked").each(function() {
				//alert(jQuery(this).val());
				notOptValue = jQuery(this).val();

			});

			//alert(notOptValue);
			var fieldKeyValue = jQuery("#newQueryField");
			//alert(jQuery(fieldKeyValue).val());
			var querytoAdd = jQuery("#queryFieldsDisplay_fieldValue");
			//alert(jQuery(querytoAdd).val());
			var completeQuery = jQuery(searchBoxVal).val() + " " + jQuery(andOrOptValue).val() + " " + notOptValue + " " + jQuery(fieldKeyValue).val() + ":" + jQuery(querytoAdd).val();

			searchBoxVal.val(completeQuery);

			self._setMiqlQuery($('#textbox').attr('value'));
			self.querySearch(self.opt.miqlQuery, self.getCheckedServices());
		});
		var cancelButton = '<button id="queryFieldsDisplay_cancelButton" onclick="alert(\'Cancel!!!!\');" type="button">';
		cancelButton += 'Cancel';
		cancelButton += '</button>';

		queryFieldsDisplay.append(andOr);
		queryFieldsDisplay.append(not);
		queryFieldsDisplay.append(fieldKey);
		queryFieldsDisplay.append(fieldValue);
		queryFieldsDisplay.append(addSearchButton);
		queryFieldsDisplay.append(cancelButton);

	},

	_drawTemplate : function() {

		var self = this;
		// todo: draw regions where we will pouplate the content
		self._totalHitsDiv = jQuery('<div id="totalHits"></div>');
		self._totalHitsDiv.css("position", "relative").css('width', '100%');
		self._servicesListDisplayDiv = jQuery('<div id="servicesListDisplay"></div>');
		self._servicesListDisplayDiv.css("position", "relative").css('height', '33%').css('width', '80%');

		var totalHits = 0;
		alert("we must wait a little bit");
		Biojs.console.log(this._registry);
		this._registry.each(function() {

			var serviceName = jQuery(this).find("name").text();
			var count = jQuery(this).find("count").text();
			var status = jQuery(this).find("active").text();
			//alert(serviceName + count + status);
			totalHits += parseInt(count);
			self._servicesListDisplayDiv.append(jQuery('<div id=' + serviceName + '></div>').append(jQuery('<img/>', {
				src : 'http://localhost/biojs/src/test/data/greenLight.png',
				alt : "greenLight",
				id : serviceName + "Light",
				width : "10%"
			}), jQuery('<input/>', {
				id : serviceName + "Box",
				type : "checkbox",
				checked : true,
				serviceName : serviceName
			}).css({
				position : "relative",
				top : "5px",
				left : "5px"
			}), jQuery('<div/>', {
				id : serviceName + "Text"
			}).html(serviceName).css({
				position : "relative",
				width : "35%",
				top : "5px",
				left : "5px"
			}), jQuery('<div/>', {
				id : serviceName + "Hit"
			}).html(count).css({
				position : "relative",
				width : "35%",
				top : "5px",
				left : "5px",
				"text-align" : "right"
			})).each(function() {
				if(status == "false") {
					//alert(this);
					jQuery(this).find("#" + serviceName + "Light").attr("src", "http://localhost/biojs/src/test/data/redLight.png", "alt", "redLight");
					jQuery(this).find("#" + serviceName + "Box").attr("checked", false, "disabled", "disabled");
					jQuery(this).find("#" + serviceName + "Text").css("color", "grey");
					jQuery(this).find("#" + serviceName + "Hit").css("color", "grey");

				}
				if(status == "warning") {
					//alert(this);
					jQuery(this).find("#" + serviceName + "Light").attr("src", "http://localhost/biojs/src/test/data/orangeLight.png", "alt", "redLight");
					jQuery(this).find("#" + serviceName + "Box").attr("checked", false, "disabled", "disabled");
					jQuery(this).find("#" + serviceName + "Text").css("color", "grey");
					jQuery(this).find("#" + serviceName + "Hit").css("color", "grey");

				}
				jQuery(this).css({
					width : '20%',
					float : "left"
				}).children().css({
					float : "left"
				});

			}));
		});

		self._totalHitsDiv.html(totalHits).css({
			"text-align" : "right"
		});
		;

		// jQuery('#'+self.opt.target+'').html(html);
		jQuery("#" + self.opt.target).append(self._totalHitsDiv);
		jQuery("#" + self.opt.target).append(self._servicesListDisplayDiv);

	},

	_setMiqlQuery : function(miqlQuery) {
		this.opt.miqlQuery = miqlQuery;
	},

	_updateServicesCount : function(miqlQuery, checkedServices) {
		var self = this;
		this._resetServiceCount();
		self._registry.each(function() {
			var serviceUrl = jQuery(this).find("restUrl").text();
			var serviceName = jQuery(this).find("name").text().toLowerCase();
			var queryUrl = serviceUrl + 'query/';
			queryUrl += miqlQuery;
			queryUrl += '?format=count'
			queryUrl = self.opt.proxyUrl + "?url=" + queryUrl;
			//Biojs.console.log(url)
			if('-1' != jQuery.inArray(serviceName, checkedServices)) {
				//Biojs.console.log(serviceName);
				self._serviceCount.sent++;
				var count = self._queryService(serviceName, queryUrl);
			}

		});
	},
	_resetServiceCount : function() {
		this._serviceCount.sent = 0;
		this._serviceCount.done = 0;
		this._serviceCount.fail = 0;
	},
	_serviceCount : {
		sent : -1,
		done : -1,
		fail : -1
	},
	_isServiceCountComplete : function() {
		if(this._serviceCount.sent == (this._serviceCount.done + this._serviceCount.fail)) {
			return true;
		}
	},
	_queryService : function(serviceName, queryUrl) {
		var self = this;
		jQuery.ajax({
			type : "GET",
			url : queryUrl,
			dataType : "text",
		}).done(function(result) {
			//Biojs.console.log("INFO: successful query to " + serviceName + "! ... " + queryUrl);
			self._updateRegistry(serviceName, result);
			self._serviceCount.done++;
			if(self._isServiceCountComplete()) {
				self._draw();
			}
		}).fail(function(jqXHR, textStatus) {
			Biojs.console.log("ERROR: " + textStatus);
			self._serviceCount.fail++;
			if(self._isServiceCountComplete()) {
				self._draw();
			}
		});
	},

	_updateRegistry : function(serviceName, serviceCount) {
		var self = this;
		self._registry.each(function() {
			var name = jQuery(this).find("name").text().toLowerCase();
			if(name.toLowerCase() == serviceName) {
				var count = jQuery(this).find("count").text();
				jQuery(this).find("count").text(serviceCount);
				Biojs.console.log("INFO: " + serviceName + " updated from " + count + " to " + serviceCount + " interactions");
			}

		});
	}
	/* Your own attributes

	 _<attrName1>: <defaultValueAttr1>,
	 _<attrName2>: <defaultValueAttr2>,
	 :
	 .
	 _<attrNameN>: <defaultValueAttrN>,

	 Example:
	 _PI: 3.1415, */

	/* Your own ‘PUBLIC’ methods

	 <methodName1>: function (<argsMethod1>) {<codeOfMethod1>},
	 <methodName2>: function (<argsMethod2>) {<codeOfMethod2>},
	 :
	 .
	 <methodNameN>: function (<argsMethodN>) {<codeOfMethodN>}

	 Example:
	 square: function(number) { return number*number }

	 Your own ‘PROTECTED’ methods

	 Javascript doesn’t provides visibility mechanism for class members.

	 Use character ‘_’ to identify the private members of your component.

	 For example: ‘_initialize’.

	 NOTE: use this.base(arguments) to invoke parent’s method if apply.

	 */
});

/* COMMENTS */
// _registry:{name:'',id:'',tags:[],url:''}