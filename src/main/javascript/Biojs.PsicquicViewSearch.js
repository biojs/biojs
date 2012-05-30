Biojs.PsicquicViewSearch = Biojs.extend ({
 constructor: function (options) {
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
	var self = this;
	self._drawTemplate();
	self._queryRegistry();

    
 },
 opt: {
 /* Target DIV
    This mandatory parameter is the identifier of the DIV tag where the
    component should be displayed. Use this value to draw your
    component into. */
    target: 'YourOwnDivId',
    miqlQuery: '*',
    urlRegistry: 'http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS&format=xml',
    queryBoxDisplay: true,
    queryFieldsDisplay: true,
    servicesListDisplay: true,
    checkedServices: []
    
    

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

 eventTypes: [

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
_registry:{},
_queryRegistry: function(){
	var self = this;
	alert(this.opt.urlRegistry);
	/* get XML */
    jQuery.ajax({
	    type: "GET",
	    url: this.opt.urlRegistry,
	    dataType: "xml",
	    success: function(xml){self._processRegistryXml(xml);},
		error: function(e){self._processRegistryErrorRequest(e);}
    });
},
_processRegistryXml: function(xml){
	this._registry = jQuery(xml).find("service");
	// var self = this;
	// var html = '';
	// jQuery(xml).find("service").each(function(){	
		// html += (jQuery(this).find("name").text());	
	// });
	// jQuery('#'+self.opt.target+'').html(html);
},
_processRegistryErrorRequest: function(e){
	var self = this;
	Biojs.console.log("ERROR: " + e );
},

_drawTemplate: function(){
	var self = this;
	// todo: draw regions where we will pouplate the content
	self._queryBoxDisplayDiv = jQuery('<div id="queryBoxDisplay"></div>');
	self._queryBoxDisplayDiv.css('width','100%');
	jQuery("#"+self.opt.target).append(self._queryBoxDisplayDiv);
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
