(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
Biojs = require('./')

},{"./":7}],2:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys,

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],3:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":2}],4:[function(require,module,exports){
var events = require("backbone-events-standalone");
module.exports = events;

},{"backbone-events-standalone":3}],5:[function(require,module,exports){
/**
 * @class
 * @param {string} type The name of the event.
 * @param {Object} data An object containing the data for copying it in this event.
 * @param {Biojs} source The component source of the event. 
 */
var events = function ( type, data, source ) {
  
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


module.exports = events;

},{}],6:[function(require,module,exports){
var events = require("biojs-events");

/**
 * @class
 * @param {string} eventType The name of the event.
 */
var eventHandler = function(eventType) {

  this.eventType = eventType;

    /**
     * Register action listeners for the event.
     * @param {function} actionPerformed The action listener to be registered.
     */
	this.addListener = function ( actionPerformed ) {
	  events.on(this.eventType, actionPerformed);
	};
    /**
     * Removes an action listener for the event.
     * @param {function} actionPerformed The action listener to be removed.
     */
	this.removeListener = function ( actionPerformed ) {
    events.off(this.eventType, actionPerformed);
	};

	/**
     * Executes all listener actions registered in the listeners field.
     * @param {Object} eventObject The event' object to be passed as argument to the listeners.
     */
	this.triggerEvent = function( eventObject ) {
	  events.trigger(this.eventType, eventObject);
	}
};

module.exports = eventHandler;

},{"biojs-events":4}],7:[function(require,module,exports){
var events = require("./event");
var eventHandler = require("./eventhandler");
var utils = require("./utils");

var Biojs = function(){
    //dummy
}

Biojs.Utils = utils;

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
   * Unregister a function under an event type in order to stop its execution it whenever the event is triggered.
   * @param {string} eventType The event to be listened.
   * @param {function} actionPerformed The action to be unregister. 
   * 
   * 
   * @example 
   * mySequence.removeListener('onSelectionChanged', listener);
   * 
   * // HTML div tag with the id='div0001' must exist in the HTML document 
   * 
   */
  removeListener: function(eventType, actionPerformed) {
    if (this._eventHandlers) {
      // register the listener in this._eventHandlers for the eventType  
      for(var key in this._eventHandlers) {
        if ( eventType == this._eventHandlers[key].eventType ) {
          this._eventHandlers[key].removeListener( actionPerformed );
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
        handler.addListener(actionPerformed);
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
  //  options -> [Object] containing the values
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
  //  source -> [BioJs] the another component 
  //  eventType -> [string] the event to be listened 
  //  callbackFunction -> [function] the action to be executed
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
  
  EventHandler: eventHandler,
  
  Event: events,
  
  Utils: Biojs.Utils
  
});

module.exports = Biojs;

},{"./event":5,"./eventhandler":6,"./utils":8}],8:[function(require,module,exports){
/**
 * @class
 * 
 */
var utils = {
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
     * Searches the array for the specified item, and returns its position.
     * The search will start at the specified position, or at the beginning if no start position is specified,
     * and end the search at the end of the array.
     * 
     * Returns -1 if the item is not found.
     * If the item is present more than once, the indexOf method returns the position of the first occurence.
     *
     * indexOf is not supported in IE < v9
     *
     * @param {array} The array containing the element to look for.
     * @param {object} Required. The item to search for.
     * @param {int} Optional. Where to start the search.
     */
    indexOf : function(elem, arr, i){
        var len;

    if ( arr ) {
      if ( indexOf ) {
        return indexOf.call( arr, elem, i );
      }

      len = arr.length;
      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

      for ( ; i < len; i++ ) {
        // Skip accessing in sparse arrays
        if ( i in arr && arr[ i ] === elem ) {
          return i;
        }
      }
    }

    return -1;
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

module.exports = utils;

},{}]},{},[1])