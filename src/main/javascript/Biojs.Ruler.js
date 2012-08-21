/**
 *
 * Ruler is a component to deal with the definition and interaction of rules that follow the structure:
 * In [LOCATION] [ACTION] the [TARGET] with [CONDITION] [PARAMETERS]	
 * The component receives a JSON structure defining the values of the different parts of the rule and it 
 * generates forms and lists.
 * The component generates events when rules are created, removed or reordered.
 * 
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 1.0.0
 * 
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI 1.8.2</a>
 * @dependency <script src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
 *
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI CSS 1.8.2</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 * 
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.ruler.css'>Selector CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.ruler.css" />
 * 
 * @requires <a href='https://github.com/claviska/jquery-miniColors'>Color Selector CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/jquery.miniColors.css" />
 * 
 * @requires <a href='https://github.com/claviska/jquery-miniColors'>Color Selector</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery.miniColors.min.js"></script>
 * 
 * 
 * 
 * 
 * @param {Object} options An object with the options for the Ruler component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 *    
 * @option {boolean} [allowOrdering=true]
 *    The list of created rules can be reordered by drag&drop, it requires the jquery ui dependencies
 *    
 * @option {Object} rules
 * 	  A json stucture defining, the rules, possible values, conditions, etc. An example of the structure here:
 * <pre>{
 "location": [ "Some part of the page" ],
 "action": ["Action 1", "Action 2", "Action 3" ],
 "target": [ {
  "name": "First Target",
  "conditions": [ {
   "name": "Select from",
   "type": "selects",
   "amount": 1,
   "values": ["An Option","another option"  ]
  }, {
   "name": "number",
   "type": "numeric_comparison"
  }, {
   "name": "some text",
   "type": "text_comparison"
  } ]
 } ]
} </pre>
 * 
 * @example 
 *					var instance = new Biojs.Ruler({
 *				     target: "YourOwnDivId",
 *				     allowOrdering:true,
 *				     rules:{
 *				    	    "location": [
 *				    	                 "all proteins",
 *				    	                 "protein1",
 *				    	                 "protein2",
 *				    	                 "protein3",
 *				    	                 "protein4"
 *				    	             ],
 *				    	             "action": [
 *				    	                 "Show",
 *				    	                 "Hide",
 *				    	                 "Highlight",
 *				    	                 "Color"
 *				    	             ],
 *				    	             "target": [
 *				    	                 {
 *				    	                     "name": "Proteins",
 *				    	                     "conditions": [
 *				    	                         {
 *				    	                             "name": "interactions with",
 *				    	                             "type": "selects",
 *				    	                             "amount": 1,
 *				    	                             "values": [
 *				    	                                 "protein1",
 *				    	                                 "protein2",
 *				    	                                 "protein3",
 *				    	                                 "protein4"
 *				    	                             ]
 *				    	                         },
 *				    	                         {
 *				    	                             "name": "number of interactions",
 *				    	                             "type": "numeric_comparison"
 *				    	                         },
 *				    	                         {
 *				    	                             "name": "accession number",
 *				    	                             "type": "text_comparison"
 *				    	                         }
 *				    	                     ]
 *				    	                 },
 *				    	                 {
 *				    	                     "name": "Interactions",
 *				    	                     "conditions": [
 *				    	                         {
 *				    	                             "name": "protein",
 *				    	                             "type": "selects",
 *				    	                             "amount": 1,
 *				    	                             "values": [
 *				    	                                 "protein1",
 *				    	                                 "protein2",
 *				    	                                 "protein3",
 *				    	                                 "protein4"
 *				    	                             ]
 *				    	                         },
 *				    	                         {
 *				    	                             "name": "proteins",
 *				    	                             "type": "selects",
 *				    	                             "amount": 2,
 *				    	                             "values": [
 *				    	                                 "protein1",
 *				    	                                 "protein2",
 *				    	                                 "protein3",
 *				    	                                 "protein4"
 *				    	                             ]
 *				    	                         },
 *				    	                         {
 *				    	                             "name": "score",
 *				    	                             "type": "numeric_comparison"
 *				    	                         }
 *				    	                     ]
 *				    	                 }
 *				    	             ]
 *				    	         }
 *				});		
 *
 */
Biojs.Ruler = Biojs.extend (
/** @lends Biojs.Ruler# */
{
	_number: 1,
	constructor: function (options) {
		var self=this;
		var target =self.opt.target;
		var innerCode	= '		<section class="ruler">';
		innerCode		+='			<section class="active_rules">';
		innerCode		+='				<header>Created Rules</header>';
		innerCode		+='					<ul id="'+target+'_list" class="sortable"> ';
		innerCode		+='					</ul>';
		innerCode		+='			</section>';
		innerCode		+='			<section class="rules_editor">';
		innerCode		+='				<header>New Rule</header>';
		innerCode		+='				<div id="'+target+'_add_rule" class="add_rule">+ Add Rule</div>';
		innerCode		+='				<ul id="'+target+'_list_to_add">';
		innerCode		+='				</ul>';
		innerCode		+='			</section>';
		innerCode		+='		</section>';
		$("#"+target).append(innerCode);
			if (self.opt.allowOrdering==true){
			$( ".sortable" ).sortable({
				stop: function(event,ui) {
					self.raiseEvent('onOrderChanged', {
						rules : self.getActiveRules()
					});
				}
			});
			$( ".sortable" ).disableSelection();
		}else
			$( ".sortable" ).removeClass("sortable");
			
		$( "#"+target+"_add_rule" ).click(function(){
			self.addRule();
		});
	},

	/**
	 * Default values for the options
	 * @name Biojs.Ruler-opt
	 */
	opt: {
		target: "YourOwnDivId",
		rules: null,
		allowOrdering:true
	},

	/**
	 * Array containing the supported event names
	 * @name Biojs.Ruler-eventTypes
	 */
	eventTypes: [
				/**
				 * @name Biojs.Ruler#onRuleCreated
				 * @event
				 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
				 * object as argument.
				 * @eventData {Object} source The component which did triggered the event.
				 * @eventData {Object} new_rule The rule that has been created. The rule Object contain the fields: location, action, target, condition, parameters(array), id, color
				 * @eventData {Array} rules Array with all the active rules. Each rule is an Object that contain the fields: location, action, target, condition, parameters, id, color
				 * @example 
				 * instance.onRuleCreated(
				 *    function( objEvent ) {
				 *       alert("New rule: In "+objEvent.new_rule.location+" "+objEvent.new_rule.action+" the "+objEvent.new_rule.target+" with "+objEvent.new_rule.condition+" "+objEvent.new_rule.parameters.join()+"");
				 *    }
				 * ); 
				 */ 
 	             "onRuleCreated",
 				/**
 				 * @name Biojs.Ruler#onRuleRemoved
 				 * @event
 				 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
 				 * object as argument.
 				 * @eventData {Object} source The component which did triggered the event.
 				 * @eventData {Object} removed The rule that has been removed. The rule Object contain the fields: location, action, target, condition, parameters(array), id, color
 				 * @eventData {Array} rules Array with all the active rules. Each rule is an Object that contain the fields: location, action, target, condition, parameters, id, color
 				 * @example 
 				 * instance.onRuleRemoved(
 				 *    function( objEvent ) {
 				 *       alert("Rule removed: In "+objEvent.removed.location+" "+objEvent.removed.action+" the "+objEvent.removed.target+" with "+objEvent.removed.condition+" "+objEvent.removed.parameters.join()+"");
 				 *    }
 				 * ); 
 				 */ 
	             "onRuleRemoved",
	 				/**
	 				 * @name Biojs.Ruler#onOrderChanged
	 				 * @event
	 				 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
	 				 * object as argument.
	 				 * @eventData {Object} source The component which did triggered the event.
	 				 * @eventData {Array} rules Array with all the active rules. Each rule is an Object that contain the fields: location, action, target, condition, parameters, id, color
	 				 * @example 
	 				 * instance.onOrderChanged(
	 				 *    function( objEvent ) {
	 				 *       alert("Order has changed");
	 				 *    }
	 				 * ); 
	 				 */ 
	             "onOrderChanged",
	 				/**
	 				 * @name Biojs.Ruler#onRuleEditing
	 				 * @event
	 				 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} 
	 				 * object as argument.
	 				 * @eventData {Object} source The component which did triggered the event.
	 				 * @eventData {Object} editing The rule that has been selected to be edited. The rule Object contain the fields: location, action, target, condition, parameters(array), id, color
	 				 * @eventData {Array} rules Array with all the active rules. Each rule is an Object that contain the fields: location, action, target, condition, parameters, id, color
	 				 * @example 
	 				 * instance.onRuleEditing(
	 				 *    function( objEvent ) {
	 				 *       alert("Editing Rule: In "+objEvent.editing.location+" "+objEvent.editing.action+" the "+objEvent.editing.target+" with "+objEvent.editing.condition+" "+objEvent.editing.parameters.join()+"");
	 				 *    }
	 				 * ); 
	 				 */ 
	             "onRuleEditing"
	             ],

	 /**
	  * Get an array with the active rules
	  * 
	  * @example 
	  * instance.getActiveRules();
	  */
	getActiveRules:function(){
		var self=this;
		var rules= new Array();
		$("#"+self.opt.target+'_list > li').each(function () {
			rules.push($(this).data("rule"))
		});
		return rules;
	},
	 /**
	  * Set the number of affected values by a given rule
	  * 
	  * @param {string} id The id of the rule wich affecte value is going to be set.
	  * @param {integer} number The amount of entities affected by the rule.
	  * 
	  * @example 
	  * instance.setAffectedByRule('YourOwnDivId_rule_1',58);
	  */
	setAffectedByRule:function(ruleId,affected){
		var self=this;
		$("#"+ruleId+" .affected").html(affected);
	},

	/**
	  * Change the Rules' model. Warning: this method does not take care of rules that have been defined with a previous model. 
	  * 
	  * @param {object} rules  A json stucture defining, the rules, possible values, conditions, etc. See the example for the the constructor.
	  * 
	  * @example 
	  * instance.changeRules({
		 "location": [ "Some part of the page" ],
		 "action": ["Action 1", "Action 2", "Action 3" ],
		 "target": [ {
		  "name": "First Target",
		  "conditions": [ {
		   "name": "Select from",
		   "type": "selects",
		   "amount": 1,
		   "values": ["An Option","another option"  ]
		  }, {
		   "name": "number",
		   "type": "numeric_comparison"
		  }, {
		   "name": "some text",
		   "type": "text_comparison"
		  } ]
		 } ]
		});
	  */
	changeRules: function (rules){
		var self=this;
		self.opt.rules=rules;
	},

	/**
	  * Add a rule to the new rule panel. this method can be invoked from an external script, be careful when using to 
	  * create rules that follow the rules' model.
	  * 
	  * @param {object} [rule] A rule with predefined values as an Object that contain the fields: location, action, target, condition, parameters, color
	  * 
	  * @example 
	  * instance.addRule({location:"protein1", action:"Color", target:"Proteins", condition:"number of interactions", parameters:["==","2"], color:"#F00"});
	  */
	addRule: function (rule){
		var self = this;
		var target =self.opt.target;
		var number = self._number;
		var code_rule =	'	<li id="rule_'+number+'"  class="rule_item"><table><tr><td class="rule">In'; 
		var gotRule =!(typeof rule=="undefined");
		code_rule+=	self._getSelect('location_'+number,self.opt.rules.location,"",
				gotRule?rule.location:rule
				);
		code_rule+=	self._getSelect('action_'+number,self.opt.rules.action,"",
				gotRule?rule.action:rule
		);
		code_rule+= '		<span id="action_parameters_'+number+'" > </span>';
		code_rule+=	'		the ';
		code_rule+=	self._getSelect('target_'+number,self.opt.rules.target,"name",
				gotRule?rule.target:rule
		);
		code_rule+=	'		with ';
		
		var visible=gotRule?"none":"inline";
		for (var i in self.opt.rules.target){
			visible=gotRule?
					((self.opt.rules.target[i].name==rule.target)?"inline":"none"):
					visible;
			code_rule+= self._getConditionsSpan(number,self.opt.rules.target[i],visible,rule);
			visible="none";
		}
		code_rule+=	'	</td> ';
		code_rule+=	'		<td><span class="action" id="'+target+'_apply_rule_'+number+'">APPLY</span></td> ';
		code_rule+=	'</tr></table></li>';
		$("#"+target+'_list_to_add').append(code_rule);
		
		
		$( "#"+target+"_apply_rule_"+number ).click(function(){
			self._applyRule($(this));
		});
		
		if (gotRule && rule.action=="Color") 
			self.addColorSelector(number,rule.color);
		
		//Visualizing the right inputs for the selected target
		$( "#target_"+number ).change(function(){
			var n= $(this)[0].id.substr($(this)[0].id.lastIndexOf("_")+1);
			for (var i in self.opt.rules.target){
				var target_name =self.opt.rules.target[i].name;
				var target_id = target_name.replace(/ /g,""); 
				$("#conditions_"+n+"_"+target_id).css("display","none");
			}
			$("#target_"+n+" option:selected").each(function () {
				$("#conditions_"+n+"_"+$(this).text()).css("display","inline");
				$("#condition_params_"+n+"_"+$(this).text()+"_"+($("#condition_"+n+"_"+$(this).text()).val().replace(/ /g,""))).css("display","inline");
			});
		});
		
		//Visualizing the right inputs for the selected action... particularly for the color selector
		$( "#action_"+number ).change(function(){
			var n= $(this)[0].id.substr($(this)[0].id.lastIndexOf("_")+1);
			$("#action_parameters_"+n).html('');
			if ($("#action_"+n).val()=="Color"){
				self.addColorSelector(n);
			}
		});
		
		//Visualizing the right attributes for the selected condition
		for (var i in self.opt.rules.target){
			var target_name =self.opt.rules.target[i].name;
			var target_id = target_name.replace(/ /g,""); 
			$( "#condition_"+number+"_"+target_id ).change(function(){
				var parts= $(this)[0].id.split("_");
				$("#condition_"+parts[1]+"_"+parts[2]+" option").each(function () {
					$("#condition_params_"+parts[1]+"_"+parts[2]+"_"+($(this).text().replace(/ /g,""))).css("display","none");
				});
				$("#condition_"+parts[1]+"_"+parts[2]+" option:selected").each(function () {
					$("#condition_params_"+parts[1]+"_"+parts[2]+"_"+($(this).text().replace(/ /g,""))).css("display","inline");
				});
			});
		}
		self._number++;		
	},
	addColorSelector: function(n,color){
		color  = (typeof color!="undefined")?color:'#56992F';
		$("#action_parameters_"+n).html('<input type="hidden" id="action_parameters_color_'+n+'" name="color4" class="color-picker" size="6" />')
		$("#action_parameters_color_"+n).miniColors({
			letterCase: 'uppercase'
		}).miniColors('value',color);
	},
	/**
	  * Add a rule to the active rules' set. this method can be invoked from an external script, be careful when using by 
	  * following the rules' model.
	  * 
	  * @param {object} [rule] A rule with predefined values as an Object that contain the fields: location, action, target, condition, parameters, color
	  * 
	  * @example 
	  * instance.addActiveRule({location:"protein1", action:"Color", target:"Proteins", condition:"number of interactions", parameters:["==","2"], color:"#F00"});
	  */
	addActiveRule: function(rule,n){
		var self =this;
		var target =self.opt.target;
		if (typeof n == "undefined"){
			n=self._number++;
			rule.id =target+'_rule_'+n;
		}

		var color_span= (rule.action=="Color")?'<span style="color: '+rule.color+'; background-color: '+rule.color+';">_</span>':"";

		$("#"+target+'_list').append('<li id="'+target+'_rule_'+n+'" class="rule_item"><table><tr><td class="rule">In <i>'+rule.location+'</i> <i>'+rule.action+'</i> '+color_span+' the <i>'+rule.target+'</i> with <i>'+rule.condition+' '+rule.parameters.join(" ")+' </i>  </td> <td><span class="action remove">remove</span> <span class="action edit">edit</span></td> <td class="rights"><span class="affected">0</span></td></tr></table></li>');
		$('#'+target+'_rule_'+n).data("rule",rule);//{location:location,action:action,target:target1,condition:condition,parameters:parameters,id:target+'_rule_'+n, color:color})
		$('#'+target+'_rule_'+n+' span.remove').click(function(){
			var removed = $(this).parent().parent().parent().parent().parent().data("rule");
			$(this).parent().parent().parent().parent().parent().remove();
			self.raiseEvent('onRuleRemoved', {
				rules : self.getActiveRules(),
				removed: removed
			});
		});
		$('#'+target+'_rule_'+n+' span.edit').click(function(){
			var editing = $(this).parent().parent().parent().parent().parent().data("rule");
			$(this).parent().parent().parent().parent().parent().remove();
			self.addRule(editing);
			self.raiseEvent('onRuleEditing', {
				rules : self.getActiveRules(),
				editing: editing
			});
		});
		self.raiseEvent('onRuleCreated', {
			rules : self.getActiveRules(),
			new_rule: $('#'+target+'_rule_'+n).data("rule")
		});
		
	},
	_applyRule: function(clicked){
		var self =this;
		var target =self.opt.target;
		var n= clicked[0].id.substr(clicked[0].id.lastIndexOf("_")+1);
		var location = $('#location_'+n).val();
		var action= $('#action_'+n).val();
		var color =$("#action_parameters_color_"+n).val();
		var target1= $('#target_'+n).val();
		var condition= $('#condition_'+n+'_'+target1.replace(/ /g,"")).val();
		var parameters= new Array();
		var par=0;
		while (typeof $('#condition_params_'+n+'_'+target1+'_'+condition.replace(/ /g,"")+'_'+par).val() != "undefined"){
			parameters.push($('#condition_params_'+n+'_'+target1+'_'+condition.replace(/ /g,"")+'_'+par).val());
			par++;
		}
		var rule = {location:location,action:action,target:target1,condition:condition,parameters:parameters,id:target+'_rule_'+n, color:color};
		self.addActiveRule(rule,n);
		clicked.parent().parent().parent().parent().parent().remove();

	},
	_getConditionsSpan: function(n,target,visible,rule){
		var self= this;
		var target_name =target.name;
		var target_id = target_name.replace(/ /g,""); 
		var code_rule =	'		<span id="conditions_'+n+'_'+target_id+'" style="display:'+visible+'"> ';
		var gotRule =!(typeof rule=="undefined");

		code_rule+=	self._getSelect('condition_'+n+'_'+target_id,target.conditions,"name",
				gotRule?rule.condition:rule
		);
		
		var visible_p=gotRule?"none":"inline";
		for (var j in target.conditions){
			visible_p=gotRule?
					((target.conditions[j].name==rule.condition)?"inline":"none"):
					visible_p;
			code_rule += self._getConditionSpan(n,target_id,target.conditions[j],visible_p,rule);
			visible_p="none";
		}
		code_rule+=	'		</span> ';
		return code_rule;

	},
	_getConditionSpan: function(n,target_id,condition,visible_p,rule){
		var self =this;
		var condition_name=condition.name;
		var condition_id = condition_name.replace(/ /g,""); 
		var gotRule =!(typeof rule=="undefined");
		
		var code_rule =	' 	<span id="condition_params_'+n+'_'+target_id+'_'+condition_id+'" style="display:'+visible_p+'"> ';
		switch (condition.type){
			case "selects":
				for (var i=0;i<1*condition.amount;i++)
					code_rule+=self._getSelect('condition_params_'+n+'_'+target_id+'_'+condition_id+'_'+i,condition.values,"",
							gotRule?rule.parameters[i]:rule
					);
				break;
				
			case "numeric_comparison":
				code_rule+=self._getSelect('condition_params_'+n+'_'+target_id+'_'+condition_id+'_0',["==",">","<",">=","<="],"",
						gotRule?rule.parameters[0]:rule
				);
				var value = gotRule?rule.parameters[1]:"";
				code_rule += '		<input type="number" id="condition_params_'+n+'_'+target_id+'_'+condition_id+'_1" value="'+value+'">';
				break;

			case "text_comparison":
				code_rule+=self._getSelect('condition_params_'+n+'_'+target_id+'_'+condition_id+'_0',["equals","contains","different","not contains"],"",
						gotRule?rule.parameters[0]:rule
				);
				var value = gotRule?rule.parameters[1]:"";
				code_rule += '		<input type="text" id="condition_params_'+n+'_'+target_id+'_'+condition_id+'_1"  value="'+value+'">';
				break;
		}
		code_rule +=	' 	</span>';
		return code_rule;
	},
	_getSelect: function(id, options,field,selected){
		var code =	'		<select  id="'+id+'" class="styled-select">';
		for (var i in options){
			var value = options[i];
			if (typeof field != "undefined" && field!="") value= options[i][field];
			var selector=(value==selected)?"selected='selected'":"";
			code +=	'			<option '+selector+'>'+ value +'</option>';
		}
		code  +=	'		</select> ';
		return code;
	}
});