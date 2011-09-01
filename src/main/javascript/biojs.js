

var Biojs = function() {
	// dummy
};

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
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
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
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	
	// class initialization
	if (typeof klass.init == "function") {
		klass.init();
	}
	
	return klass;
};

Biojs.prototype = {	
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
	
	
	// Register a function under an event type
	// in order to execute it whenever the event is raised
	addListener: function(eventType, actionPerformed) {
		
		// register the listener in this._listeners under eventType  
		for(var key in this._listeners) {
			if ( eventType == this._listeners[key].eventType ) {
				this._listeners[key].actionsPerformed.push(actionPerformed);
				return;
			}
		}
		
		// EventType does not exist in this._listeners 
		if ( typeof this.eventTypes == "object" ) {
			// Check if EventType exists (in the subclass) in eventTypes 
			for ( var key in this.eventTypes ) {
				// Register the new EventType
				if ( this.eventTypes[key] == eventType ) {
					var newSize = this._listeners.push( { eventType: eventType, actionsPerformed : [] } );
					this._listeners[newSize-1].actionsPerformed.push(actionPerformed);
					return;
				}
			}
		} 
		
		console.log("The EventType '" + eventType + "' does not exist");
	},
	
	// Trigger the registered functions under an event type
	// 
	raiseEvent : function(eventType, params) {
		var eventObject = { type: eventType, source: this, data: params };
		
		for(var key in this._listeners ) {
			if ( eventType == this._listeners[key].eventType ) {
				for(var j in this._listeners[key].actionsPerformed ) {
					this._listeners[key].actionsPerformed[j](eventObject);
				}
				return;
			}
		}
	},
	
	// Id of the DIV element
	// in order to append other elements into
	_target : "",
	
	// Contains the _listeners (functions) for each event type 
	// The subclass must contain a member named eventTypes
	// i.e.: yoursubclass.eventTypes = { event1: "event1", event2: "event2" }
	_listeners : [{
		eventType : 'onClick',
		actionsPerformed : [ ]
	}],
};

// initialize
Biojs = Biojs.extend({
		constructor: function() {
			this.extend(arguments[0]);
		}
	}, 
	{
		ancestor: Object,
		version: "1.1",
		
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
		}		
});




