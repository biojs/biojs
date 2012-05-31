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
               self.querySearch(this.opt.miqlQuery, this.opt.checkedServices);
               //self._drawTemplate();
       },

       opt : {
               /* Target DIV
                This mandatory parameter is the identifier of the DIV tag where the
                component should be displayed. Use this value to draw your
                component into. */
               target : 'YourOwnDivId',
               miqlQuery : '*',
               urlRegistry : 'http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS&format=xml',
               queryBoxDisplay : true,
               queryFieldsDisplay : true,
               servicesListDisplay : true,
               checkedServices : [],
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
                               self._updateServicesCount(self.opt.miqlQuery, self.opt.checkedServices);
                       }
                       if(countAndDrawOptions.drawTemplate){
                       		   self._drawTemplate();	
                       }
               }).fail(function(jqXHR, textStatus) {
                       Biojs.console.log("ERROR: " + textStatus);
               });
       },
       querySearch : function(miqlQuery, checkedServices) {
               Biojs.console.log("INFO: miqlQuery: " + miqlQuery);
               Biojs.console.log("INFO: checkedServices: " + checkedServices);
               if(jQuery.isEmptyObject(this._registry) && miqlQuery == "*") {
                       this._queryRegistry({doCountUpdate:false,drawTemplate:true});
               } else if(jQuery.isEmptyObject(this._registry) && miqlQuery != "*") {
                       this._queryRegistry({doCountUpdate:true,drawTemplate:false});
               } else {
                       this._updateServicesCount(miqlQuery, checkedServices);
               }
               //self._drawTemplate();
       },
       _cssStatus : function(status) {

               var self = this;
               //alert(status);
               //self.css("border", "solid");

       },
       _drawQueryFields: function() {
       		var queryFieldsDisplay = jQuery("#queryFieldsDisplay");
       		var andOrOption = '<select id="queryFieldsDisplay_andOrOption">';
			andOrOption += '<option selected="" value="0">AND</option>';
			andOrOption += '<option value="1">OR</option>';
			andOrOption += '</select>';
			var notOption = '<span id="queryFieldsDisplay_notOption">';
			notOption += '<input id="queryFieldsDisplay_notOptionInput" type="checkbox" value="t">';
			notOption += '<label for="queryFieldsDisplay_notOptionLabel">NOT</label>';
			notOption += '</span>';
			var fieldKeyOption = '<select id="newQueryField" class="af_selectOneChoice_content" name="newQueryField">';
			fieldKeyOption += '<option selected="" value="0">All</option>';
			fieldKeyOption += '<option value="1">Participant Id</option>';
			fieldKeyOption += '<option value="2">Interaction Id</option>';
			fieldKeyOption += '<option value="3">Detection method</option>'; 
			fieldKeyOption += '<option value="4">Interaction type</option>';
			fieldKeyOption += '<option value="5">Organism</option>'; 
			fieldKeyOption += '<option value="6">Pubmed Id</option>'; 
			fieldKeyOption += '<option value="7">Author</option>'; 
			fieldKeyOption += '</select>'; 
			var fieldValueOption = '<input id="queryFieldsDisplay_fieldValueOption" type="text" value="" size="50" name="queryFieldsDisplay_fieldValueOption">';
//onclick="submitForm('mainForm',1,{source:'j_id47'});return false;"
			var addSearchButtonOption = '<button id="queryFieldsDisplay_addSearchButtonOption" type="button">';
			addSearchButtonOption += 'Add &amp; Search';
			addSearchButtonOption += '</button>';
			var cancelButtonOption = '<button id="queryFieldsDisplay_cancelButtonOption" onclick="alert(\'Cancel!!!!\');" type="button">';
			cancelButtonOption += 'Cancel';
			cancelButtonOption += '</button>';
			

			queryFieldsDisplay.append(andOrOption);
			queryFieldsDisplay.append(notOption);
			queryFieldsDisplay.append(fieldKeyOption);
			queryFieldsDisplay.append(fieldValueOption);
			queryFieldsDisplay.append(addSearchButtonOption);
			queryFieldsDisplay.append(cancelButtonOption);
       	
       },

       _drawTemplate : function() {

               var self = this;
               // todo: draw regions where we will pouplate the content
               self._queryBoxDisplayDiv = jQuery('<div id="queryBoxDisplay"></div>');
               self._queryBoxDisplayDiv.css("position", "relative").css('width', '100%');
               self._queryFieldsDisplayDiv = jQuery('<div id="queryFieldsDisplay"></div>');
               self._queryFieldsDisplayDiv.css("position", "relative").css('width', '100%');
               self._totalHitsDiv = jQuery('<div id="totalHits"></div>');
               self._totalHitsDiv.css("position", "relative").css('width', '100%');

               self._servicesListDisplayDiv = jQuery('<div id="servicesListDisplay"></div>');
               self._servicesListDisplayDiv.css("position", "relative").css('height', '33%').css('width', '80%');

               var totalHits = 0;
               //alert(this._registry);
               //Biojs.console.log(this._registry);
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
                               checked : true
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
                               if(status != "true") {
                                       //alert(this);
                                       jQuery(this).find("#" + serviceName + "Light").attr("src", "http://localhost/biojs/src/test/data/redLight.png", "alt", "redLight");
                                       jQuery(this).find("#" + serviceName + "Box").attr("checked", false, "disabled", "disabled");
                                       jQuery(this).find("#" + serviceName + "Text").css("color", "grey");
                                       jQuery(this).find("#" + serviceName + "Hit").css("color", "grey");

                               }
                               jQuery(this).css({
                                       border : "solid",
                                       width : '20%',
                                       float : "left"
                               }).children().css({
                                       border : "solid",
                                       float : "left"
                               });

                       }));
               });

               self._totalHitsDiv.html(totalHits).css({
                       "text-align" : "right"
               });
               ;
               //
               // jQuery('#'+self.opt.target+'').html(html);
               jQuery("#" + self.opt.target).append(self._queryBoxDisplayDiv);
               jQuery("#" + self.opt.target).append(self._queryFieldsDisplayDiv);
               jQuery("#" + self.opt.target).append(self._totalHitsDiv);
               jQuery("#" + self.opt.target).append(self._servicesListDisplayDiv);
               
               
               
               this._drawQueryFields();
       },

       _setMiqlQuery : function(miqlQuery) {
               this.opt.miqlQuery = miqlQuery;
       },
       _setCheckedServices : function(checkedServices) {
               this.opt.checkedServices = checkedServices;
       },
       _updateServicesCount : function(miqlQuery, checkedServices) {
               var self = this;
               this._resetServiceCount();
               self._setMiqlQuery(miqlQuery);
               self._setCheckedServices(checkedServices);
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
       _resetServiceCount: function(){
       		this._serviceCount.sent = 0;		
       		this._serviceCount.done = 0;	
       		this._serviceCount.fail = 0;	
       },
       _serviceCount:{
       		sent:-1,
       		done:-1,
       		fail:-1
       },
       _isServiceCountComplete: function(){
       		if(this._serviceCount.sent == (this._serviceCount.done + this._serviceCount.fail)){
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
                       if(self._isServiceCountComplete()){
                       		self._drawTemplate();	
                       }
               }).fail(function(jqXHR, textStatus) {
                       Biojs.console.log("ERROR: " + textStatus);
                       self._serviceCount.fail++;
                       if(self._isServiceCountComplete()){
                       		self._drawTemplate();	
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