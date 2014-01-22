/**
 * Main container of the BioJS library. It is the parent class for all the components.
 * 
 * @namespace
 * 
 */
var Biojs = function() {
	// dummy
};

/**
 * @class
 * @param {string} eventType The name of the event.
 */
Biojs.EventHandler = function(eventType) {
	/**
     * The name of the event.
     * @type {string}
     */
	this.eventType = eventType;
	/**
     * Array of the registered listeners.
     * @type {function[]}
     */
	this.listeners = [];
	/**
     * Register action listeners for the event.
     * @param {function} actionPerformed The action listener to be registered.
     */
	this.addListener = function ( actionPerformed ) {
		if ( (typeof actionPerformed) == "function" ) {
			this.listeners.push(actionPerformed);
		}
	};
	/**
     * Executes all listener actions registered in the listeners field.
     * @param {Object} eventObject The event' object to be passed as argument to the listeners.
     */
	this.triggerEvent = function( eventObject ) {
		for ( var i in this.listeners ) {
			this.listeners[i](eventObject);
		}
	}
};

/**
 * @class
 * @param {string} type The name of the event.
 * @param {Object} data An object containing the data for copying it in this event.
 * @param {Biojs} source The component source of the event. 
 */
Biojs.Event = function ( type, data, source ) {
	
	/**
     * The component which did triggered the event.
     * @type {Biojs}
     */
	this.source = source;
	/**
     * The name of the event.
     * @type {string}
     */
	this.type = type;
	
	for ( var key in data ) {
		this[key] = data[key];
	}
};

/**
 * @class
 * 
 */
Biojs.Utils = {
	/**
	 * Clone all members from an object.
	 * @param {object} object The object to be cloned.
	 * @returns {object} A Clone of the object passed as argument.
	 * 
	 */
	clone: function(obj) {
	  var newObj = (obj instanceof Array) ? [] : {};
	  for (i in obj) {
	    if (obj[i] && typeof obj[i] == "object") {
	    	newObj[i] = Biojs.Utils.clone(obj[i]);
	    } else {
	    	newObj[i] = obj[i];
	    }
	  } 
	  return newObj;
	},
	
	/**
	 * Determine if an onject or array is empty.
	 * @param {object|array} o Either object or array to figure out if empty or not.
	 * @returns {bool} true if empty, false if don't 
	 */
	isEmpty: function(o){
		if (o instanceof Array) {
			return (o.length<=0);
		} else {
			for (var i in o) {
		        if (o.hasOwnProperty(i)) {
		            return false;
		        }
		    }
		    return true;
		}
	},
	
	/**
     * Cross-browser console for debugging. 
     * The console is disabled by default. That means, all messages written by means Biojs.console.log("My Message") will be ignored. 
     * Use Biojs.console.enable() to enable it.
     * 
     * @example
     * // Enabling loggin messages 
     * Biojs.console.enable();
     * ... 
     * // Writing a log
     * Biojs.console.log("My Message");
     * 
     * @type {Object}
     */
	console: {
		enable: function() {
			// Define a cross-browser window.console.log method.
			// For IE and FF without Firebug, fallback to using an alert.
			if (window.console) {
				/**
				 * @ignore
				 */
				// In this case, there are a console, perfect!
				this.log = function (msg) { console.log(msg) };
			} else {
				// We have not window.console, but it is Opera browser?
				if (window.opera) {
					/**
					 * @ignore
					 */
					// Right! then lets use window.opera.postError
					this.log = function (msg) { window.opera.postError(msg) };
				} else {
					// None console found! 
					// Try to write the logs somewhere
					// That's it! in a new window, identified by 'Biojs.console'
					var consoleWin = window.open('','myconsole',
					  'width=350,height=250'
					   +',menubar=0'
					   +',toolbar=0'
					   +',status=0'
					   +',scrollbars=1'
					   +',resizable=1'); 
					 
					// We got it?
					if (consoleWin) {
						// Good, build a blank document into with a DIV 'Biojs.console'
						consoleWin.document.writeln(
						  '<html><head><title>BioJS Console</title></head>'
						   +'<body bgcolor=white onLoad="self.focus()">'
						   +'<div id="Biojs.console"></div>'
						   +'</body></html>'
						);
						consoleWin.document.close();
						
						Biojs.console.domDocument = consoleWin.document;
						Biojs.console.domDivNode = consoleWin.document.getElementById("Biojs.console");
						
						/**
						 * @ignore
						 */
						// Finally, the log function will write into the DIV
						this.log = function (msg) {
							var message = '';
							
							if (msg instanceof Array) {
								for ( i=0; i < msg.length; i++ ) {
									message += '[' + i + ']=' + msg[i] + ' ';
								}
								
							} else if (msg instanceof String || typeof msg === "string") {
								message = msg;
								
							} else {
								for (var i in msg) {
									message += '[' + i + ']=' + msg[i] + ' ';
							    }
							}
							
							textNode = Biojs.console.domDocument.createTextNode(message);
							line = Biojs.console.domDocument.createElement('pre');
							line.appendChild(textNode);
							Biojs.console.domDivNode.appendChild(line);
						};
						
					} else {
						// Game over! do not write logs, but let's tell to user by means an alert (sorry!)
						alert("Please activate the pop-up window in this page " +
								"in order to enable the BioJS console");
					}	
				}
			}
		},
		
		log: function (msg) { ; /* Do nothing by default */ }		
	}
};

/**
 * Extend this class <tt>Biojs</tt> in order to create a new component.
 * @param {object} instance The subclass.
 * @param {object} interface (optional) A second parameter passed to the extend method of a class defines the class interface.
 * @returns {object} SubClass The class with its own members and the inherited ones from Biojs.
 * 
 * @example 
 * Biojs.MyComponent = Biojs.extend(
 * { // instance 
 *    constructor: function(options) {
 *       // constructor code here  
 *    },
 *  
 *    opt: { target: "divId" },
 *    
 *    eventTypes: [ "myEvent1", "myEvent2" ],
 *      
 *    getVersion: function() {
 *        return Biojs.MyComponent.VERSION;
 *    }
 *  }, 
 *  { // class interface
 *     VERSION: "3.14.15"
 *  });
 * 
 *  alert(Biojs.MyComponent.VERSION);
 * 
 */
Biojs.extend = function(_child, _static) { // subclass
	var extend = Biojs.prototype.extend;
	
	// build the prototype
	Biojs._prototyping = true;
	
	/**
	 * @name proto
	 * @constructs
	 */
	var proto = new this;

	// Inherit parent' events to the child
	if (proto.eventTypes instanceof Array) {
		for ( var i in proto.eventTypes ) {
			_child.eventTypes.push(proto.eventTypes[i]);
		}
	}
	
	// Inherit parent' options to the child
	if (proto.opt instanceof Object) {
		for ( var key in proto.opt ) {
			_child.opt[key] = proto.opt[key];
		}
	}
	
	extend.call(proto, _child);
	
	/**
	 * @ignore
	 */
	proto.base = function() {
		// call this method from any other method to invoke that method's ancestor
	};

	delete Biojs._prototyping;
	
	// create the wrapper for the constructor function
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		
		if (!Biojs._prototyping) {

			if (this.constructor == klass) { // instantiation

				// Create a instance of this class
				function BiojsComponent() {};
				BiojsComponent.prototype = proto;
				var instance = new BiojsComponent();

				// Change the default option's values 
				// in the instance by the provided ones
				instance.setOptions(arguments[0]);
				
				// Set the event handlers
				instance.setEventHandlers(instance.eventTypes);
				
				// Set the unique id for the instance
				instance.biojsObjectId = Biojs.uniqueId();
				
				// register instance
				Biojs.addInstance(instance);
				
				// execute the instance's constructor
				constructor.apply(instance, arguments);
				
				// return the instance
				return instance;
				
			} else { // Calling to ancestor's constructor
				constructor.apply(this,arguments);
			}
		}
	};

	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	/**
	 * @ignore
	 */
	klass.valueOf = function(type) {
		return (type == "object") ? klass : constructor.valueOf();
	};
	klass.toString = this.toString;
	extend.call(klass, _static);
	
	// class initialization
	if (typeof klass.init == "function") {
		klass.init();
	}
	
	return klass;
};

Biojs.prototype = 
/** @lends Biojs# */
{
	extend: function(source, value) {	
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Biojs.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Biojs.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Biojs.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Biojs._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Biojs._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);
				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}	
		}
		
		return this;
	},
	
	/**
	 * Register a function under an event type in order to execute it whenever the event is triggered.
	 * @param {string} eventType The event to be listened.
	 * @param {function} actionPerformed The action to be executed whenever the event occurs. it 
	 * 
	 * 
	 * @example 
	 * 
	 * var listener = function(eventObj){
	 *    alert("Selected: "+eventObj.start+", end: "+ eventObj.end);
	 * }
	 * 
	 * var mySequence = new Biojs.Sequence( {
	 *    sequence : "mlpglallllaawtaralevptdgnagllaepqiamfcgrlnmhmnvqngsgtktcidtkegilqy",
	 *    target : "#div0001",
	 *    format : 'CODATA',
	 *    id : 'P918283'	
	 * });
	 * 
	 * mySequence.addListener('onSelectionChanged', listener);
	 * 
	 * // HTML div tag with the id='div0001' must exist in the HTML document 
	 * 
	 */
	addListener: function(eventType, actionPerformed) {
		if (this._eventHandlers) {
			// register the listener in this._eventHandlers for the eventType  
			for(var key in this._eventHandlers) {
				if ( eventType == this._eventHandlers[key].eventType ) {
					this._eventHandlers[key].addListener( actionPerformed );
					return;
				}
			} 
		}
	},
	
	/**
	 * Sets an event handler and an alias method for each string in the array eventTypes.
	 * This method is executed automatically before constructing an instance, using the eventTypes array 
	 * that should be defined as member of subclass. Then, the resulting instance will have methods 
	 * named in the form instance.&lg;eventName&gt;(actionPerformed) for all eventTypes.
	 * 
	 * @param {string[]} eventTypes Array of names of the events to be set.
	 * 
	 */
	setEventHandlers: function (eventTypes) {
		// Supposed that this._eventHandlers does not exist.
		this._eventHandlers = [];
		// Because the event handlers are not initialized yet
		
		var alias = function (handler) {
			return function (actionPerformed) {
				handler.listeners.push(actionPerformed);
			} 
		};
		
		if ( typeof eventTypes == "object" ) {
			// Create an event handler for each eventType in eventTypes
			for ( var i=0; i < eventTypes.length; i++ ) {
				var handler = new Biojs.EventHandler( eventTypes[i] );
				this._eventHandlers.push( handler );
				// Creates the alias this.<eventType> (<actionPerformed>)
				// as alternative to be used instead of this.addistener(<eventType>, <actionPerformed>)
				
				this[ eventTypes[i] ] = new alias(handler);
			}
		} 
	}, 
	
	/**
	 * Trigger the registered functions under an event type.
	 * @param {string} eventType The event to be raised.
	 * @param {Object} params The values to be included into Biojs.Event object. 
	 * 
	 * @example 
	 * 
	 * Biojs.MyComponent = Biojs.extend({
	 *    // ...
	 *    // code before the event 
	 *    
	 *    this.raiseEvent('onSelectionChanged', {start : start, end : end});
	 *    
	 *    // code after the event 
	 *    // ... 
	 * });
	 * 
	 */
	raiseEvent : function(eventType, eventObj) {
		for(var key in this._eventHandlers ) {
			if ( eventType == this._eventHandlers[key].eventType ) {
				this._eventHandlers[key].triggerEvent( eventObj );
				return;
			}
		}
	},
	
	
	//
	// Save the option values to be applied to this component
	// 	options -> [Object] containing the values
	//	
	setOptions : function (options) {
		if ( this.opt instanceof Object )
		{
			this.opt = Biojs.Utils.clone(this.opt);
			for ( var key in options ) {
				this.opt[key] = options[key];
			}
		} 
	},
	
	// 
	// 
	// 	source -> [BioJs] the another component 
	// 	eventType -> [string] the event to be listened 
	// 	callbackFunction -> [function] the action to be executed
	//
	/**
	 * Connect this component with another by means listening its events.
	 * @param {Biojs} source The another component.
	 * @param {string} eventType The event to be listened.	 
	 * @param {function} actionPerformed The action to be executed whenever the event occurs. it 
	 * 
	 * 
	 * @example 
	 * 
	 * var mySequence = new Biojs.Sequence( {
	 *    sequence : "mlpglallllaawtaralevptdgnagllaepqiamfcgrlnmhmnvqngsgtktcidtkegilqy",
	 *    target : "#div0001",
	 *    format : 'CODATA',
	 *    id : 'P918283'	
	 * });
	 * 
	 * var anotherSequence = new Biojs.Sequence({
	 *    sequence : "laawtaralevptmlpglallldgnagllaepqi",
	 *    target : "#div0002",	
	 * });
	 * 
	 * anotherSequence.listen(
	 *    mySequence,
	 *    "onSelectionChange",
	 *    function( eventObj ) {
	 *       anotherSequence.setSelection(eventObj.start, eventObj.end);
	 *    }   
	 * );
	 * 
	 */
	listen: function ( source, eventType, callbackFunction ) {		
		if ( source instanceof Biojs ){
			if ( typeof callbackFunction == "function" ) {
				source.addListener(eventType, callbackFunction);
			} 
		} 
	},
	
	getId: function () {
		return this.biojsObjectId;
	}
	
};

// initialize
Biojs = Biojs.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}, 
	
	vaueOf: function () { return "Biojs" }
},
/** @static */
/** @lends Biojs */
{
	/**
     * Ancestor of the Biojs class (Object).
     * @type {Object}
     */
	ancestor: Object,
	/**
     * Version of the Biojs class.
     * @type {string}
     */
	version: "1.0",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
	
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	/**
     * Get string. 
     * @type {function}
     */
	toString: function() {
		return String(this.valueOf());
	},
	/**
     * Get a unique identifier. It is useful to assign the instance' id 
     * @type {function}
     */
	uniqueId: function() {
	    if ( typeof Biojs.prototype.__uniqueid == "undefined" ) {
	    	Biojs.prototype.__uniqueid = 0;
	    }
	    return Biojs.prototype.__uniqueid++;
	},
	/**
     * Register a Biojs instance. 
     * @type {function}
     */
	addInstance: function ( instance ) {
	    if ( typeof Biojs.prototype.__instances == "undefined" ) {
	    	Biojs.prototype.__instances = {};
	    }
	    return Biojs.prototype.__instances[instance.biojsObjectId] = instance;
	},
	/**
     * Get a Biojs instance by means of its id. 
     * @type {function}
     */
	getInstance: function ( id ) {
	    return Biojs.prototype.__instances[id];
	},
	/**
     * Set a variable in the DOM window. 
     * @type {function}
     */
	registerGlobal: function ( key, value ) {
		window[key] = value;
	},
	/**
     * Get a variable value from the DOM window. 
     * @type {function}
     */
	getGlobal: function(key){
		return window[key];
	},	
	/**
     * Cross-browser console for debugging. 
     * This is a shorcut for {@link Biojs.Utils.console}
     * 
     * @type {Object}
     * 
     */
	console: Biojs.Utils.console,
	
	EventHandler: Biojs.EventHandler,
	
	Event: Biojs.Event,
	
	Utils: Biojs.Utils
	
});



