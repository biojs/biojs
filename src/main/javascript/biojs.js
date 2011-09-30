/**
 * Main class of the BioJS library. It is the parent class for all the components.
 * 
 * @class
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
	clone : function(obj) {
	  var newObj = (obj instanceof Array) ? [] : {};
	  for (i in obj) {
	    if (obj[i] && typeof obj[i] == "object") {
	    	newObj[i] = Biojs.Utils.clone(obj[i]);
	    } else {
	    	newObj[i] = obj[i]
	    }
	  } 
	  return newObj;
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
 *     VERSION: 3.14.15
 *  });
 * 
 *  alert(Biojs.MyComponent.VERSION);
 * 
 */
Biojs.extend = function(_instance, _static) { // subclass
	var extend = Biojs.prototype.extend;
	
	// build the prototype
	Biojs._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
	proto.base = function() {
		// call this method from any other method to invoke that method's ancestor
	};
	delete Biojs._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Biojs._prototyping) {
			
			if (this._constructing || this.constructor == klass) { // instantiation
				//this._constructing = true;
				var clone = Biojs.Utils.clone(this);
				clone.setOptions(arguments[0]);
				// Set the event handlers
				clone.setEventHandlers(clone.eventTypes);
				// execute the subclass constructor
				constructor.apply(clone, arguments);
				//delete this._constructing;
				return clone;
				
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
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
		if ( typeof eventTypes == "object" ) {
			// Create an event handler for each eventType in eventTypes
			for ( var i in eventTypes ) {
				var handler = new Biojs.EventHandler( eventTypes[i] );
				this._eventHandlers.push( handler );
				// Creates the alias this.<eventType> (<actionPerformed>)
				// as alternative to be used instead of this.addistener(<eventType>, <actionPerformed>)
				this[ eventTypes[i] ] = function(actionPerformed) {
					handler.addListener(actionPerformed);
				};
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
	}
	
};

// initialize
Biojs = Biojs.extend({
		constructor: function() {
			this.extend(arguments[0]);
		}
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
		
		toString: function() {
			return String(this.valueOf());
		},
		
		EventHandler: Biojs.EventHandler,
		
		Event: Biojs.Event,
		
		Utils: Biojs.Utils
		

});


