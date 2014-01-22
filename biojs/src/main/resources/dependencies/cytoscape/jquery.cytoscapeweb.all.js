
/* jquery.cytoscapeweb.all.js */

/**
 * This file is part of Cytoscape Web 2.0-prerelease-snapshot-2012.05.14-12.35.01.
 * 
 * Cytoscape Web is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * Cytoscape Web is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Lesser General Public License along with
 * Cytoscape Web. If not, see <http://www.gnu.org/licenses/>.
 */
 

;(function($){
	
	// make the jQuery plugin grab what we define init to be later
	$.cytoscapeweb = function(){
		return $.cytoscapeweb.init.apply(this, arguments);
	};
	
	// define the function namespace here, since it has members in many places
	$.cytoscapeweb.fn = {};
	
})(jQuery);

;(function($, $$){
	
	$$.is = {
		string: function(obj){
			return obj != null && typeof obj == typeof "";
		},
		
		fn: function(obj){
			return obj != null && typeof obj == typeof function(){};
		},
		
		array: function(obj){
			return obj != null && obj instanceof Array;
		},
		
		plainObject: function(obj){
			return obj != null && typeof obj == typeof {} && !$$.is.array(obj);
		},
		
		number: function(obj){
			return obj != null && typeof obj == typeof 1 && !isNaN(obj);
		},
		
		color: function(obj){
			return obj != null && typeof obj == typeof "" && $.Color(obj).toString() != "";
		},
		
		bool: function(obj){
			return obj != null && typeof obj == typeof true;
		},
		
		elementOrCollection: function(obj){
			return $$.is.element(obj) || $$.is.collection(obj);
		},
		
		element: function(obj){
			return obj instanceof $$.CyElement;
		},
		
		collection: function(obj){
			return obj instanceof $$.CyCollection;
		},
		
		emptyString: function(obj){
			if( obj == null ){ // null is empty
				return true; 
			} else if( $$.is.string(obj) ){
				return obj.match(/^\s+$/) != null; // all whitespace is empty
			}
			
			return false; // otherwise, we don't know what we've got
		},
		
		nonemptyString: function(obj){
			return obj != null && $$.is.string(obj) && obj.match(/^\s+$/) == null;
		}
	};	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.util = {
			
		// gets a deep copy of the argument
		copy: function( obj ){
			if( obj == null ){
				return obj;
			} if( $$.is.array(obj) ){
				return $.extend(true, [], obj);
			} else if( $$.is.plainObject(obj) ){
				return $.extend(true, {}, obj);
			} else {
				return obj;
			}
		},
		
		mapEmpty: function( map ){
			var empty = true;

			if( map != null ){
				for(var i in map){
					empty = false;
					break;
				}
			}

			return empty;
		},

		// sets the value in a map (map may not be built)
		setMap: function( options ){
			var obj = options.map;
			
			$.each(options.keys, function(i, key){
				if( i < options.keys.length - 1 ){
					
					// extend the map if necessary
					if( obj[key] == null ){
						obj[key] = {};
					}
					
					obj = obj[key];
				} else {
					// set the value
					obj[key] = options.value;
				}
			});
		},
		
		// gets the value in a map even if it's not built in places
		getMap: function( options ){
			var obj = options.map;
			
			for(var i = 0; i < options.keys.length; i++){
				var key = options.keys[i];
				obj = obj[key];
				
				if( obj == null ){
					return obj;
				}
			}
			
			return obj;
		},
		
		capitalize: function(str){
			if( $$.is.emptyString(str) ){
				return str;
			}
			
			return str.charAt(0).toUpperCase() + str.substring(1);
		}
			
	};
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	var quiet = false;
	var debug = false;
	
	var console = $$.console = {
		option: function(name, val){
			if( name == quiet ){
				return quiet = ( val === undefined ? quiet : val );
			} else if( name == debug ){
				return debug = ( val === undefined ? debug : val );
			}
		},
			
		debug: function(){
			if( quiet || !debug || $.browser.msie ){ return; }
			
			if( window.console != null && window.console.debug != null ){
				window.console.debug.apply(window.console, arguments);
			} else if( window.console != null && window.console.log != null ){
				window.console.log.apply(window.console, arguments);
			}
		},
			
		log: function(){
			if( quiet || $.browser.msie ){ return; }
			
			if( window.console != null && window.console.log != null ){
				window.console.log.apply(window.console, arguments);
			}
		},
		
		warn: function(){
			if( quiet || $.browser.msie ){ return; }
			
			if( window.console != null && window.console.warn != null ){
				window.console.warn.apply(window.console, arguments);
			} else {
				console.log.apply(window.console, arguments);
			}
		},
		
		error: function(){
			if( quiet || $.browser.msie ){ return; }
			
			if( window.console != null && window.console.error != null ){
				window.console.error.apply(window.console, arguments);
				
				if( window.console.trace != null ){
					window.console.trace();
				}
				
			} else {
				console.log.apply(window.console, arguments);
				throw "Cytoscape Web encountered the previously logged error";
				
				if( window.console.trace != null ){
					window.console.trace();
				}
			}
		}
	};
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// registered extensions to cytoweb, indexed by name
	var extensions = {};
	$$.extensions = extensions;
	
	// registered modules for extensions, indexed by name
	var modules = {};
	$$.modules = modules;
	
	function setExtension(type, name, registrant){
		var impl = {};
		impl[name] = registrant;
		
		switch( type ){
		case "core":
		case "collection":
			$$.fn[type]( impl );
		}
		
		return $$.util.setMap({
			map: extensions,
			keys: [ type, name ],
			value: registrant
		});
	}
	
	function getExtension(type, name){
		return $$.util.getMap({
			map: extensions,
			keys: [ type, name ]
		});
	}
	
	function setModule(type, name, moduleType, moduleName, registrant){
		return $$.util.setMap({
			map: modules,
			keys: [ type, name, moduleType, moduleName ],
			value: registrant
		});
	}
	
	function getModule(type, name, moduleType, moduleName){
		return $$.util.getMap({
			map: modules,
			keys: [ type, name, moduleType, moduleName ]
		});
	}
	
	$$.extension = function(){
		// e.g. $$.extension("renderer", "svg")
		if( arguments.length == 2 ){
			return getExtension.apply(this, arguments);
		}
		
		// e.g. $$.extension("renderer", "svg", { ... })
		else if( arguments.length == 3 ){
			return setExtension.apply(this, arguments);
		}
		
		// e.g. $$.extension("renderer", "svg", "nodeShape", "ellipse")
		else if( arguments.length == 4 ){
			return getModule.apply(this, arguments);
		}
		
		// e.g. $$.extension("renderer", "svg", "nodeShape", "ellipse", { ... })
		else if( arguments.length == 5 ){
			return setModule.apply(this, arguments);
		}
		
		else {
			$$.console.error("Invalid extension access syntax");
		}
	
	};
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// allow calls on a jQuery selector by proxying calls to $.cytoscapeweb
	// e.g. $("#foo").cytoscapeweb(options) => $.cytoscapeweb(options) on #foo
	$.fn.cytoscapeweb = function(opts){
		
		// get object
		if( opts == "get" ){
			var data = $(this).data("cytoscapeweb");
			return data.cy;
		}
		
		// bind to ready
		else if( $$.is.fn(opts) ){
			var ready = opts;
			var data = $(this).data("cytoscapeweb");
			
			if( data != null && data.cy != null && data.ready ){
				// already ready so just trigger now
				ready.apply(data.cy, []);
			} else {
				// not yet ready, so add to readies list
				
				if( data == null ){
					data = {}
				}
				
				if( data.readies == null ){
					data.readies = [];
				}
				
				data.readies.push(ready);
				$(this).data("cytoscapeweb", data);
			} 
			
		}
		
		// proxy to create instance
		else if( $$.is.plainObject(opts) ){
			return $(this).each(function(){
				var options = $.extend({}, opts, {
					container: $(this)
				});
			
				$.cytoscapeweb(options);
			});
		}
		
		// proxy a function call
		else {
			var rets = [];
			var args = [];
			for(var i = 1; i < arguments.length; i++){
				args[i - 1] = arguments[i];
			}
			
			$(this).each(function(){
				var data = $(this).data("cytoscapeweb");
				var cy = data.cy;
				var fnName = opts;
				
				if( cy != null && $$.is.fn( cy[fnName] ) ){
					var ret = cy[fnName].apply(cy, args);
					rets.push(ret);
				}
			});
			
			// if only one instance, don't need to return array
			if( rets.length == 1 ){
				rets = rets[0];
			} else if( rets.length == 0 ){
				rets = $(this);
			}
			
			return rets;
		}

	};
	
	// allow functional access to cytoweb
	// e.g. var cytoweb = $.cytoscapeweb({ selector: "#foo", ... });
	//      var nodes = cytoweb.nodes();
	$$.init = function( options ){
		
		// create instance
		if( $$.is.plainObject( options ) ){
			return new $$.CyCore( options );
		} 
		
		// allow for registration of extensions
		// e.g. $.cytoscapeweb("renderer", "svg", SvgRenderer);
		// e.g. $.cytoscapeweb("renderer", "svg", "nodeshape", "ellipse", SvgEllipseNodeShape);
		// e.g. $.cytoscapeweb("core", "doSomething", function(){ /* doSomething code */ });
		// e.g. $.cytoscapeweb("collection", "doSomething", function(){ /* doSomething code */ });
		else if( $$.is.string( options ) ) {
			return $$.extension.apply($$.extension, arguments);
		}
	};
	
	// use short alias (cy) if not already defined
	if( $.fn.cy == null && $.cy == null ){
		$.fn.cy = $.fn.cytoscapeweb;
		$.cy = $.cytoscapeweb;
	}
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core = function( impl, options ){
		$.each(impl, function(name, fn){
			CyCore.prototype[ name ] = fn;
		});
	};
	
	function CyCore( opts ){
		var cy = this;
		
		var defaults = {
			layout: {
				name: "grid"
			},
			renderer: {
				name: "svg"
			},
			style: { // actual default style later specified by renderer
			}
		};
		
		var options = $.extend(true, {}, defaults, opts);
		
		if( options.container == null ){
			$$.console.error("Cytoscape Web must be called on an element; specify `container` in options or call on selector directly with jQuery, e.g. $('#foo').cy({...});");
			return;
		} else if( $(options.container).size() > 1 ){
			$$.console.error("Cytoscape Web can not be called on multiple elements in the functional call style; use the jQuery selector style instead, e.g. $('.foo').cy({...});");
			return;
		}
		
		this._private = {
			options: options, // cached options
			style: options.style,
			nodes: {}, // id => node object
			edges: {}, // id => edge object
			continuousMapperBounds: { // data attr name => { min, max }
				nodes: {},
				edges: {}
			},
			continuousMapperUpdates: [],
			live: {}, // event name => array of callback defns
			selectors: {}, // selector string => selector for live
			listeners: {}, // cy || background => event name => array of callback functions
			animation: { 
				// normally shouldn't use collections here, but animation is not related
				// to the functioning of CySelectors, so it's ok
				elements: null // elements queued or currently animated
			},
			scratch: {}, // scratch object for core
			layout: null,
			renderer: null,
			notificationsEnabled: true, // whether notifications are sent to the renderer
			zoomEnabled: true,
			panEnabled: true
		};

		cy.initRenderer( options.renderer );
		
		// initial load
		cy.load(options.elements, function(){ // onready
			var data = cy.container().data("cytoscapeweb");
			
			if( data == null ){
				data = {};
			}
			data.cy = cy;
			data.ready = true;
			
			if( data.readies != null ){
				$.each(data.readies, function(i, ready){
					cy.bind("ready", ready);
				});
				
				data.readies = [];
			}
			
			$(options.container).data("cytoscapeweb", data);
			
			cy.startAnimationLoop();
			
			if( $$.is.fn( options.ready ) ){
				options.ready.apply(cy, [cy]);
			}
			
			cy.trigger("ready");
		}, options.done);
	}
	$$.CyCore = CyCore; // expose
	
	$$.fn.core({
		container: function(){
			return $( this._private.options.container );
		}
	});
	
	$$.fn.core({
		options: function(){
			return $$.util.copy( this._private.options );
		}
	});

	$$.fn.core({
		
		json: function(params){
			var json = {};
			var cy = this;
			
			json.elements = {};
			cy.elements().each(function(i, ele){
				var group = ele.group();
				
				if( json.elements[group] == null ){
					json.elements[group] = [];
				}
				
				json.elements[group].push( ele.json() );
			});

			json.style = cy.style();
			json.scratch = $$.util.copy( cy.scratch() );
			json.zoomEnabled = cy._private.zoomEnabled;
			json.panEnabled = cy._private.panEnabled;
			json.layout = $$.util.copy( cy._private.options.layout );
			json.renderer = $$.util.copy( cy._private.options.renderer );
			
			return json;
		}
		
	});	
	
})(jQuery, jQuery.cytoscapeweb);

(function($, $$){
	
	$$.fn.core({
		add: function(opts){
			
			var elements;
			var cy = this;
			
			// add the element
			if( $$.is.element(opts) ){
				var element = opts;
				elements = element.collection().restore();
			}
			
			// add the collection
			else if( $$.is.collection(opts) ){
				var collection = opts;
				elements = collection.restore();
			} 
			
			// specify an array of options
			else if( $$.is.array(opts) ){
				var jsons = opts;

				elements = new $$.CyCollection(cy, jsons);
			}
			
			// specify via opts.nodes and opts.edges
			else if( $$.is.plainObject(opts) && ($$.is.array(opts.nodes) || $$.is.array(opts.edges)) ){
				var groups = opts;
				var jsons = [];

				$.each(["nodes", "edges"], function(i, group){
					if( $$.is.array(groups[group]) ){
						$.each(groups[group], function(j, json){
							var mjson = $.extend({}, json, { group: group });
							jsons.push( mjson );
						});
					} 
				});

				elements = new $$.CyCollection(cy, jsons);
			}
			
			// specify options for one element
			else {
				var json = opts;
				elements = (new $$.CyElement( cy, json )).collection();
			}
			
			return elements.filter(function(){
				return !this.removed();
			});
		},
		
		remove: function(collection){
			if( !$$.is.elementOrCollection(collection) ){
				collection = collection;
			} else if( $$.is.string(collection) ){
				var selector = collection;
				collection = this.$( selector );
			}
			
			return collection.remove();
		},
		
		load: function(elements, onload, ondone){
			var cy = this;
			
			// remove old elements
			cy.elements().remove();

			cy.notifications(false);
			
			var processedElements = [];

			if( elements != null ){
				if( $$.is.plainObject(elements) || $$.is.array(elements) ){
					cy.add( elements );
				} 
			}
			
			function callback(){				
				cy.one("layoutready", function(e){
					cy.notifications(true);
					cy.trigger(e); // we missed this event by turning notifications off, so pass it on

					cy.notify({
						type: "load",
						collection: cy.elements(),
						style: cy._private.style
					});

					cy.one("load", onload);
					cy.trigger("load");
				}).one("layoutstop", function(){
					cy.one("done", ondone);
					cy.trigger("done");
				});
				
				cy.layout( cy._private.options.layout );

			}

			// TODO remove timeout when chrome reports dimensions onload properly
			// only affects when loading the html from localhost, i think...
			if( window.chrome ){
				setTimeout(function(){
					callback();
				}, 30);
			} else {
				callback();
			}

			return this;
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		
		startAnimationLoop: function(){
			var cy = this;
			var structs = this._private;
			var stepDelay = 10;
			var useTimeout = false;
			var useRequestAnimationFrame = true;
			
			// initialise the list
			structs.animation.elements = new $$.CyCollection( cy );
			
			// TODO change this when standardised
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			
			if( requestAnimationFrame == null || !useRequestAnimationFrame ){
				requestAnimationFrame = function(fn){
					window.setTimeout(function(){
						fn(+new Date);
					}, stepDelay);
				};
			}
			
			var containerDom = cy.container()[0];
			
			function globalAnimationStep(){
				function exec(){
					requestAnimationFrame(function(now){
						handleElements(now);
						globalAnimationStep();
					}, containerDom);
				}
				
				if( useTimeout ){
					setTimeout(function(){
						exec();
					}, stepDelay);
				} else {
					exec();
				}
				
			}
			
			globalAnimationStep(); // first call
			
			function handleElements(now){
				
				structs.animation.elements.each(function(i, ele){
					
					// we might have errors if we edit animation.queue and animation.current
					// for ele (i.e. by stopping)
					try{
						ele = ele.element(); // make sure we've actually got a CyElement
						var current = ele._private.animation.current;
						var queue = ele._private.animation.queue;
						
						// if nothing currently animating, get something from the queue
						if( current.length == 0 ){
							var q = queue;
							var next = q.length > 0 ? q.shift() : null;
							
							if( next != null ){
								next.callTime = +new Date; // was queued, so update call time
								current.push( next );
							}
						}
						
						// step and remove if done
						var completes = [];
						for(var i = 0; i < current.length; i++){
							var ani = current[i];
							step( ele, ani, now );

							if( current[i].done ){
								completes.push( ani );
								
								// remove current[i]
								current.splice(i, 1);
								i--;
							}
						}
						
						// call complete callbacks
						$.each(completes, function(i, ani){
							var complete = ani.params.complete;

							if( $$.is.fn(complete) ){
								complete.apply( ele, [ now ] );
							}
						});
						
					} catch(e){
						// do nothing
					}
					
				}); // each element
				
				
				// notify renderer
				if( structs.animation.elements.size() > 0 ){
					cy.notify({
						type: "draw",
						collection: structs.animation.elements
					});
				}
				
				// remove elements from list of currently animating if its queues are empty
				structs.animation.elements = structs.animation.elements.filter(function(){
					var ele = this;
					var queue = ele._private.animation.queue;
					var current = ele._private.animation.current;
					
					return current.length > 0 || queue.length > 0;
				});
			} // handleElements
				
			function step( self, animation, now ){
				var properties = animation.properties;
				var params = animation.params;
				var startTime = animation.callTime;
				var percent;
				
				if( params.duration == 0 ){
					percent = 1;
				} else {
					percent = Math.min(1, (now - startTime)/params.duration);
				}
				
				function update(p){
					if( p.end != null ){
						var start = p.start;
						var end = p.end;
						
						// for each field in end, update the current value
						$.each(end, function(name, val){
							if( valid(start[name], end[name]) ){
								self._private[p.field][name] = ease( start[name], end[name], percent );
							}
						});					
					}
				}
				
				if( properties.delay == null ){
					update({
						end: properties.position,
						start: animation.startPosition,
						field: "position"
					});
					
					update({
						end: properties.bypass,
						start: animation.startStyle,
						field: "bypass"
					});
				}
				
				if( $$.is.fn(params.step) ){
					params.step.apply( self, [ now ] );
				}
				
				if( percent >= 1 ){
					animation.done = true;
				}
				
				return percent;
			}
			
			function valid(start, end){
				if( start == null || end == null ){
					return false;
				}
				
				if( $$.is.number(start) && $$.is.number(end) ){
					return true;
				} else if( (start) && (end) ){
					return true;
				}
				
				return false;
			}
			
			function ease(start, end, percent){
				if( $$.is.number(start) && $$.is.number(end) ){
					return start + (end - start) * percent;
				} else if( (start) && (end) ){
					var c1 = $.Color(start).fix().toRGB();
					var c2 = $.Color(end).fix().toRGB();

					function ch(ch1, ch2){
						var diff = ch2 - ch1;
						var min = ch1;
						return Math.round( percent * diff + min );
					}
					
					var r = ch( c1.red(), c2.red() );
					var g = ch( c1.green(), c2.green() );
					var b = ch( c1.blue(), c2.blue() );
					
					return $.Color([r, g, b], "RGB").toHEX().toString();
				}
				
				return undefined;
			}
			
		}
		
	});
	
})(jQuery, jQuery.cytoscapeweb);


	
		

;(function($, $$){
	
	$$.fn.core({	
		one: defineBind({
			target: "cy",
			one: true
		}),
		
		bind: defineBind({
			target: "cy"
		}),
		
		unbind: defineUnbind({
			target: "cy"
		}),
		
		trigger: defineTrigger({
			target: "cy"
		}),
		
		delegate: function(selector, events, data, handler){
			this.$(selector).live(events, data, handler);
			
			return this;
		},
		
		undelegate: function(selector, events, handler){
			this.$(selector).die(events, handler);
			
			return this;
		},
		
		on: function( events, selector, data, handler ){
			if( $$.is.string(selector) ){
				this.$(selector).live(events, data, handler);
			} else {
				selector = undefined;
				data = selector;
				handler = data;
				
				this.bind(events, data, handler);
			}
			
			return this;
		},
		
		off: function(event, selector, handler){
			
			if( $$.is.string(selector) ){
				this.$(selector).live(events, handler);
			} else {
				handler = selector;
				selector = undefined;
				
				this.unbind(events, handler);
			}
				
			return this;
		},
		
		background: function(){
			var cy = this;
			
			if( cy._private.background == null ){
				var fns = ["on", "off", "bind", "unbind", "one", "trigger"];
				
				cy._private.background = {};
				$.each(fns, function(i, fnName){
					cy._private.background[fnName] = function(){
						return cy["bg" + $$.util.capitalize(fnName)].apply(cy, arguments);
					};
				});
			}
			
			return cy._private.background;
		},
		
		bgOne: defineBind({
			target: "bg",
			one: true
		}),
		
		bgOn: defineBind({
			target: "bg"
		}),
		
		bgOff: defineUnbind({
			target: "bg"
		}),
		
		bgBind: defineBind({
			target: "bg"
		}),
		
		bgUnbind: defineUnbind({
			target: "bg"
		}),
		
		bgTrigger: defineTrigger({
			target: "bg"
		})
		
	});
	
	function defineBind( params ){
		var defaults = {
			target: "cy",
			one: false
		};
		params = $.extend( {}, defaults, params );
		
		return function(events, data, handler){
			var cy = this;
			var listeners = cy._private.listeners;
			
			// if data is not defined, switch params
			if( handler === undefined ){
				handler = data;
				data = undefined;
			}
			
			// if we have no handler callback, then we can't really do anything
			if( handler == null ){
				return cy;
			}

			events = events.split(/\s+/);
			$.each(events, function(i, event){
				if( $$.is.emptyString(event) ){ return; }
				
				if( listeners[ params.target ] == null ){
					listeners[ params.target ] = {};
				}
				
				if( listeners[ params.target ][ event ] == null ){
					listeners[ params.target ][ event ] = [];
				}
				
				listeners[ params.target ][ event ].push({
					callback: handler,
					data: data,
					one: params.one
				});
			});
			
			return cy;
		};
	};

	function defineUnbind( params ){
		var defaults = {
			target: "cy"
		};
		params = $.extend({}, defaults, params);
		
		return function(events, handler){
			var cy = this;
			var listeners = cy._private.listeners;
			
			if( listeners[ params.target ] == null ){
				return cy;
			}
			
			events = events.split(/\s+/);
			$.each(events, function(i, event){
				if( $$.is.emptyString(event) ){ return; }
				
				// unbind all
				if( handler === undefined ){
					delete listeners[ params.target ][ event ];
					return cy;
				}
				
				// unbind specific handler
				else {
					for(var i = 0; i < listeners[params.target][event].length; i++){
						var listener = listeners[params.target][event][i];
						
						if( listener.callback == handler ){
							listeners[params.target][event].splice(i, 1);
							i--;
						}
					}
				}
			});
			
			return cy;
		}
	}
	
	function defineTrigger( params ){
		var defaults = {
			target: "cy"
		};
		params = $.extend( {}, defaults, params );
		
		return function( event, data ){
			var cy = this;
			var listeners = cy._private.listeners;
			var target = params.target;
			var type;
			
			if( $$.is.plainObject(event) ){
				type = event.type;
			} else {
				type = event;
			}
			
			if( listeners[target] == null || listeners[target][type] == null ){
				return;
			}
			
			for(var i = 0; i < listeners[target][type].length; i++){
				var listener = listeners[target][type][i];
				
				var eventObj;
				if( $$.is.plainObject(event) ){
					eventObj = event;
				} else {
					eventObj = $.Event(event);
				}
				eventObj.data = listener.data;
				eventObj.cy = eventObj.cytoscapeweb = cy;
				
				var args = [ eventObj ];
				
				if( data != null ){
					if( !$$.is.array(data) ){
						data = [ data ];
					}

					$.each(data, function(i, arg){
						args.push(arg);
					});
				}
				
				if( listener.one ){
					listeners[target][type].splice(i, 1);
					i--;
				}
				
				listener.callback.apply(cy, args);
			}
		}
	}
		
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		
		layout: function( params ){
			var cy = this;
			
			// if no params, use the previous ones
			if( params == null ){
				params = this._private.options.layout;
			}
			
			this.initLayout( params );
			
			cy.trigger("layoutstart");
			
			this._private.layout.run();
			
			return this;
			
		},
		
		initLayout: function( options ){
			if( options == null ){
				$$.console.error("Layout options must be specified to run a layout");
				return;
			}
			
			if( options.name == null ){
				$$.console.error("A `name` must be specified to run a layout");
				return;
			}
			
			var name = options.name;
			var layoutProto = $$.extension("layout", name);
			
			if( layoutProto == null ){
				$$.console.error("Can not apply layout: No such layout `%s` found; did you include its JS file?", name);
				return;
			}
			
			this._private.layout = new layoutProto( $.extend({}, options, {
				renderer: this._private.renderer,
				cy: this
			}) );
			this._private.options.layout = options; // save options
		}
		
	});
	
})(jQuery, jQuery.cytoscapeweb);

(function($, $$){
	
	$$.fn.core({
		notify: function( params ){
			if( !this._private.notificationsEnabled ){ return; } // exit on disabled
			
			var renderer = this.renderer();
			
			if( $$.is.element(params.collection) ){
				var element = params.collection;
				params.collection = new $$.CyCollection(cy, [ element ]);	
			
			} else if( $$.is.array(params.collection) ){
				var elements = params.collection;
				params.collection = new $$.CyCollection(cy, elements);	
			} 
			
			if( this.getContinuousMapperUpdates().length != 0 ){
				params.updateMappers = true;
				this.clearContinuousMapperUpdates();
			}
			
			renderer.notify(params);
		},
		
		notifications: function( bool ){
			var p = this._private;
			
			if( bool === undefined ){
				return p.notificationsEnabled;
			} else {
				p.notificationsEnabled = bool ? true : false;
			}
		},
		
		noNotifications: function( callback ){
			this.notifications(false);
			callback();
			this.notifications(true);
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		
		renderer: function(){
			return this._private.renderer;
		},
		
		initRenderer: function( options ){
			var cy = this;
			
			var rendererProto = $$.extension("renderer", options.name);
			if( rendererProto == null ){
				$$.console.error("Can not initialise: No such renderer `$s` found; did you include its JS file?", options.name);
				return;
			}
			
			this._private.renderer = new rendererProto( $.extend({}, options, {
				cy: cy,
				style: cy._private.style,
				
				styleCalculator: {
					calculate: function(element, styleVal){

						if( $$.is.plainObject(styleVal) ){
							
							var ret;
							
							if( styleVal.customMapper != null ){
								
								ret = styleVal.customMapper.apply( element, [ element.data() ] );
								
							} else if( styleVal.passthroughMapper != null ){
								
								var attrName = styleVal.passthroughMapper;
								ret = element._private.data[attrName];
								
							} else if( styleVal.discreteMapper != null ){
								
								var attrName = styleVal.discreteMapper.attr;
								var entries = styleVal.discreteMapper.mapped;
								var elementVal = element.data(attrName);
								
								$.each(entries, function(attrVal, mappedVal){								
									if( attrVal == elementVal ){
										ret = mappedVal;
									}
								});
								
							} else if( styleVal.continuousMapper != null ){
								
								var map = styleVal.continuousMapper;
								
								if( map.attr.name == null || typeof map.attr.name != typeof "" ){
									$$.console.error("For style.%s.%s, `attr.name` must be defined as a string since it's a continuous mapper", element.group(), styleName);
									return;
								}
								
								var attrBounds = cy._private.continuousMapperBounds[element._private.group][map.attr.name];
								attrBounds = {
									min: attrBounds == null ? 0 : attrBounds.min,
									max: attrBounds == null ? 0 : attrBounds.max
								};
								
								// use defined attr min & max if set in mapper
								if( map.attr.min != null ){
									attrBounds.min = map.attr.min;
								}
								if( map.attr.max != null ){
									attrBounds.max = map.attr.max;
								}
								
								if( attrBounds != null ){
								
									var data = element.data(map.attr.name);
									var percent = ( data - attrBounds.min ) / (attrBounds.max - attrBounds.min);
									
									if( attrBounds.max == attrBounds.min ){
										percent = 1;
									}
									
									if( percent > 1 ){
										percent = 1;
									} else if( percent < 0 || data == null || isNaN(percent) ){
										percent = 0;
									}
									
									if( data == null && styleVal.defaultValue != null ){
										ret = styleVal.defaultValue;
									} else if( $$.is.number(map.mapped.min) && $$.is.number(map.mapped.max) ){
										ret = percent * (map.mapped.max - map.mapped.min) + map.mapped.min;
									} else if( (map.mapped.min) && (map.mapped.max) ){
										
										var cmin = $.Color(map.mapped.min).fix().toRGB();
										var cmax = $.Color(map.mapped.max).fix().toRGB();

										var red = Math.round( cmin.red() * (1 - percent) + cmax.red() * percent );
										var green  = Math.round( cmin.green() * (1 - percent) + cmax.green() * percent );
										var blue  = Math.round( cmin.blue() * (1 - percent) + cmax.blue() * percent );

										ret = $.Color([red, green, blue], "RGB").toHEX().toString();
									} else {
										$$.console.error("Unsupported value used in mapper for `style.%s.%s` with min mapped value `%o` and max `%o` (neither number nor colour)", element.group(), map.styleName, map.mapped.min, map.mapped.max);
										return;
									}
								} else {
									$$.console.error("Attribute values for `%s.%s` must be numeric for continuous mapper `style.%s.%s` (offending %s: `%s`)", element.group(), map.attr.name, element.group(), styleName, element.group(), element.data("id"));
									return;
								}
								
							} // end if
							
							var defaultValue = styleVal.defaultValue;
							if( ret == null ){
								ret = defaultValue;
							}
							
						} else {
							ret = styleVal;
						} // end if
						
						return ret;
					} // end calculate
				} // end styleCalculator
			}) );
			
			
		}
		
	});	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		
		scratch: function( name, value ){
			if( value === undefined ){
				return eval( "this._private.scratch." + name );
			} else {
				eval( "this._private.scratch." + name + " = " + value + ";" );
				return this;
			}
		},
		
		removeScratch: function( name ){
			if( name === undefined ){
				structs.scratch = {};
			} else {
				eval( "delete this._private.scratch." + name + ";" );
			}
			
			return this;
		}
		
	});	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		collection: function( eles ){

			if( $$.is.string(eles) ){
				return this.$( eles );
			} else if( $$.is.elementOrCollection(eles) ){
				return eles.collection();
			}

			return new $$.CyCollection( this );
		},
		
		getElementById: function(id){
			return this._private.nodes[id] || this._private.edges[id] || new $$.CyCollection( this );
		},
		
		nodes: defineSearch({
			addLiveFunction: true,
			group: "nodes"
		}),
		
		edges: defineSearch({
			addLiveFunction: true,
			group: "edges"
		}),
		
		elements: function(){
			return this.$.apply( this, arguments );
		},
		
		$: defineSearch({
			addLiveFunction: true
		}),
		
		filter: function(selector){
			if( $$.is.string(selector) ){
				return this.$(selector);
			} else if( $$.is.fn(selector) ) {
				return this.$(selector).filter(selector);
			}
		}
		
	});	
	
	
	function defineSearch( params ){
		var defaults = {
			group: undefined, // implicit group filter
			addLiveFunction: false
		};
		params = $.extend( {}, defaults, params );
		
		var groups = [];
		if( params.group == null ){
			groups = [ "nodes", "edges" ];
		} else {
			groups = [ params.group ];
		}
		
		return function( selector ){
			var cy = this;
			var elements = [];
			
			if( selector == null ){
				selector = "";
			}
			
			$.each(groups, function(i, group){
				$.each(cy._private[group], function(id, element){
					elements.push( element );
				});
			});
			
			var collection = new $$.CyCollection( cy, elements );
			
			var selector;
			if(params.group != null){
				selector = new $$.CySelector( cy, params.group, selector );
			} else {
				selector = new $$.CySelector( cy, selector );
			}
			
			return selector.filter( collection, params.addLiveFunction );
		};
	};
	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.core({
		
		style: function(val){
			var ret;
			
			if( val === undefined ){
				ret = $$.util.copy( this._private.style );
			} else {
				this._private.style = $$.util.copy( val );
				ret = this;
				
				this.notify({
					type: "style",
					style: this._private.style
				});
			}
			
			return ret;
		},
		
		getContinuousMapperUpdates: function(){
			var cy = this;
			var structs = cy._private;
			
			return structs.continuousMapperUpdates;
		},
		
		clearContinuousMapperUpdates: function(){
			var cy = this;
			var structs = cy._private;
			
			structs.continuousMapperUpdates = [];
		},
		
		// update continuous mapper bounds when new data is added
		addContinuousMapperBounds: function(element, name, val){
			var cy = this;
			var structs = cy._private;
			var group = element._private.group;
			
			if( $$.is.number(val) ){
				if( structs.continuousMapperBounds[ group ][ name ] == null ){
					structs.continuousMapperBounds[ group ][ name ] = {
						min: val,
						max: val,
						vals: []
					};
				}
				
				var bounds = structs.continuousMapperBounds[ group ][ name ];
				var vals = bounds.vals;
				var inserted = false;
				var oldMin = null, oldMax = null;
				
				if( vals.length > 0 ){
					oldMin = vals[0];
					oldMax = vals[ vals.length - 1 ];
				}
				
				for(var i = 0; i < vals.length; i++){
					if( val <= vals[i] ){
						vals.splice(i, 0, val);
						inserted = true;
						break;
					}
				}
				
				if(!inserted){
					vals.push(val);
				}
				
				bounds.min = vals[0];
				bounds.max = vals[vals.length - 1];
				
				if( oldMin != bounds.min || oldMax != bounds.max ){
					structs.continuousMapperUpdates.push({
						group: element.group(),
						element: element
					});
				}
			}
		},
		
		// update continuous mapper bounds for a change in data value
		updateContinuousMapperBounds: function(element, name, oldVal, newVal){
			var cy = this;
			var structs = cy._private;
			var group = element._private.group;
			var bounds = structs.continuousMapperBounds[ group ][ name ];
			
			if( bounds == null ){
				this.addContinuousMapperBounds(element, name, newVal);
				return;
			}
			
			var vals = bounds.vals;
			var oldMin = null, oldMax = null;
			
			if( vals.length > 0 ){
				oldMin = vals[0];
				oldMax = vals[ vals.length - 1 ];
			}
			
			this.removeContinuousMapperBounds(element, name, oldVal);
			this.addContinuousMapperBounds(element, name, newVal);
			
			if( oldMin != bounds.min || oldMax != bounds.max ){
				structs.continuousMapperUpdates.push({
					group: element.group(),
					element: element
				});
			}
		},
		
		// update the continuous mapper bounds for a removal of data
		removeContinuousMapperBounds: function(element, name, val){
			var cy = this;
			var structs = cy._private;
			var group = element._private.group;
			var bounds = structs.continuousMapperBounds[ group ][ name ];
			
			if( bounds == null ){
				return;
			}
			
			var oldMin = null, oldMax = null;
			var vals = bounds.vals;
			
			if( vals.length > 0 ){
				oldMin = vals[0];
				oldMax = vals[ vals.length - 1 ];
			}
			
			
			for(var i = 0; i < vals.length; i++){
				if( val == vals[i] ){
					vals.splice(i, 1);
					break;
				}
			}
			
			if( vals.length > 0 ){
				bounds.min = vals[0];
				bounds.max = vals[vals.length - 1];
			} else {
				bounds.min = null;
				bounds.max = null;
			}
		
			if( oldMin != bounds.min || oldMax != bounds.max ){
				structs.continuousMapperUpdates.push({
					group: element.group(),
					element: element
				});
			}
		}	
	});
	
})(jQuery, jQuery.cytoscapeweb);

		
		
		
		

;(function($, $$){
	
	$$.fn.core({
		
		panning: function(bool){
			if( bool !== undefined ){
				this._private.panEnabled = bool ? true : false;
			} else {
				return this._private.panEnabled;
			}
			
			return this;
		},
		
		zooming: function(bool){
			if( bool !== undefined ){
				this._private.zoomEnabled = bool ? true : false;
			} else {
				return this._private.zoomEnabled;
			}
			
			return this;
		},
		
		pan: function(params){
			var ret = this.renderer().pan(params);
			
			if( ret == null ){
				this.trigger("pan");
				return this;
			}
			
			return ret;
		},
		
		panBy: function(params){
			var ret = this.renderer().panBy(params);
			
			if( ret == null ){
				this.trigger("pan");
				return this;
			}
			
			return ret;
		},
		
		fit: function(elements){
			var ret = this.renderer().fit({
				elements: elements,
				zoom: true
			});
			
			if( ret == null ){
				this.trigger("zoom");
				this.trigger("pan");
				return this;
			}
			
			return ret;
		},
		
		zoom: function(params){
			var ret = this.renderer().zoom(params);
			
			if( ret != null ){
				return ret;
			} else {
				this.trigger("zoom");
				return this;
			}
		},
		
		center: function(elements){
			this.renderer().fit({
				elements: elements,
				zoom: false
			});
			
			this.trigger("pan");
			return this;
		},
		
		centre: function(){ // alias to center
			return this.center.apply(cy, arguments); 
		},
		
		reset: function(){
			this.renderer().pan({ x: 0, y: 0 });
			this.renderer().zoom(1);
			
			this.trigger("zoom");
			this.trigger("pan");
			
			return this;
		}
	});	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// Use this interface to define functions for collections/elements.
	// This interface is good, because it forces you to think in terms
	// of the collections case (more than 1 element), so we don't need
	// notification blocking nonsense everywhere.
	//
	// Other collection-*.js files depend on this being defined first.
	// It's a trade off: It simplifies the code for CyCollection and 
	// CyElement integration so much that it's worth it to create the
	// JS dependency.
	//
	// Having this integration guarantees that we can call any
	// collection function on an element and vice versa.
	$$.fn.collection = function( impl, options ){
		$.each(impl, function(name, fn){
			
			// When adding a function, write it from the perspective of a
			// collection -- it's more generic.
			$$.CyCollection.prototype[ name ] = fn;
			
			// The element version of the function is then the trivial
			// case of a collection of size 1.
			$$.CyElement.prototype[ name ] = function(){
				var self = this.collection();
				return fn.apply( self, arguments );
			};
			
		});
	};
	
	// factory for generating edge ids when no id is specified for a new element
	var idFactory = {
		prefix: {
			nodes: "n",
			edges: "e"
		},
		id: {
			nodes: 0,
			edges: 0
		},
		generate: function(cy, element, tryThisId){
			var json = $$.is.element( element ) ? element._private : element;
			var group = json.group;
			var id = tryThisId != null ? tryThisId : this.prefix[group] + this.id[group];
			
			if( cy.getElementById(id).empty() ){
				this.id[group]++; // we've used the current id, so move it up
			} else { // otherwise keep trying successive unused ids
				while( !cy.getElementById(id).empty() ){
					id = this.prefix[group] + ( ++this.id[group] );
				}
			}
			
			return id;
		}
	};
	
	// CyElement
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// represents a node or an edge
	function CyElement(cy, params, restore){
		var self = this;
		restore = (restore === undefined || restore ? true : false);
		
		if( cy === undefined || params === undefined || !(cy instanceof $$.CyCore) ){
			$$.console.error("An element must have a core reference and parameters set");
			return;
		}
		
		// validate group
		if( params.group != "nodes" && params.group != "edges" ){
			$$.console.error("An element must be of type `nodes` or `edges`; you specified `%s`", params.group);
			return;
		}
		
		this.length = 1;
		this[0] = this;
		
		// NOTE: when something is added here, add also to ele.json()
		this._private = {
			cy: cy,
			data: $$.util.copy( params.data ) || {}, // data object
			position: $$.util.copy( params.position ) || {}, // fields x, y, etc (could be 3d or radial coords; renderer decides)
			listeners: {}, // map ( type => array of function spec objects )
			group: params.group, // string; "nodes" or "edges"
			bypass: $$.util.copy( params.bypass ) || {}, // the bypass object
			style: {}, // the rendered style populated by the renderer
			removed: true, // whether it's inside the vis; true if removed (set true here since we call restore)
			selected: params.selected ? true : false, // whether it's selected
			selectable: params.selectable || params.selectable === undefined ? true : false, // whether it's selectable
			locked: params.locked ? true : false, // whether the element is locked (cannot be moved)
			grabbed: false, // whether the element is grabbed by the mouse; renderer sets this privately
			grabbable: params.grabbable || params.grabbable === undefined ? true : false, // whether the element can be grabbed
			classes: {}, // map ( className => true )
			animation: { // object for currently-running animations
				current: [],
				queue: []
			},
			renscratch: {}, // object in which the renderer can store information
			scratch: {}, // scratch objects
			edges: {}, // map of connected edges ( otherNodeId: { edgeId: { source: true|false, target: true|false, edge: edgeRef } } )
			children: {} // map of children ( otherNodeId: otherNodeRef )
		};
		
		// renderedPosition overrides if specified
		// you shouldn't and can't use this option with cy.load() since we don't have access to the renderer yet
		// AND the initial state of the graph is such that renderedPosition and position are the same
		if( params.renderedPosition != null ){
			this._private.position = this.cy().renderer().modelPoint(params.renderedPosition);
		}
		
		if( $$.is.string(params.classes) ){
			$.each(params.classes.split(/\s+/), function(i, cls){
				if( cls != "" ){
					self._private.classes[cls] = true;
				}
			});
		}
		
		if( restore === undefined || restore ){
			this.restore();
		}
		
	}
	$$.CyElement = CyElement; // expose
	
	CyElement.prototype.cy = function(){
		return this._private.cy;
	};
	
	CyElement.prototype.element = function(){
		return this;
	};
	
	CyElement.prototype.collection = function(){
		return new CyCollection(this.cy(), [ this ]);
	};

	
	// CyCollection
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// represents a set of nodes, edges, or both together
	function CyCollection(cy, elements){
		
		if( cy === undefined || !(cy instanceof $$.CyCore) ){
			$$.console.error("A collection must have a reference to the core");
			return;
		}
		
		var ids = {};
		var uniqueElements = [];
		var createdElements = false;
		
		if( elements == null ){
			elements = [];
		} else if( elements.length > 0 && !$$.is.element( elements[0] ) ){
			createdElements = true;

			// make elements from json and restore all at once later
			var eles = [];
			$.each(elements, function(i, json){
				if( json.data == null ){
					json.data = {};
				}
				
				var data = json.data;

				// make sure newly created elements have valid ids
				if( data.id == null ){
					data.id = idFactory.generate( cy, json );
				} else if( cy.getElementById( data.id ).size() != 0 ){
					$$.console.error("Can not create element: an element in the visualisation already has ID `%s`", data.id);
					return;
				}

				var ele = new $$.CyElement( cy, json, false );
				eles.push( ele );
			});

			elements = eles;
		}
		
		$.each(elements, function(i, element){
			if( element == null ){
				return;
			}
			
			var id = element._private.data.id;
			
			if( ids[ id ] == null ){
				ids[ id ] = true;
				uniqueElements.push( element );
			}
		});

		
		for(var i = 0; i < uniqueElements.length; i++){
			this[i] = uniqueElements[i];
		}
		this.length = uniqueElements.length;
		
		this._private = {
			cy: cy,
			ids: ids
		};

		// restore the elements if we created them from json
		if( createdElements ){
			this.restore();
		}
	}
	$$.CyCollection = CyCollection; // expose

	CyCollection.prototype.cy = function(){
		return this._private.cy;
	};
	
	CyCollection.prototype.element = function(){
		return this[0];
	};
	
	CyCollection.prototype.collection = function(){
		return this;
	};
	
	
	// Functions
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$$.fn.collection({
		json: function(){
			var p = this.element()._private;
			
			var json = $$.util.copy({
				data: p.data,
				position: p.position,
				group: p.group,
				bypass: p.bypass,
				removed: p.removed,
				selected: p.selected,
				selectable: p.selectable,
				locked: p.locked,
				grabbed: p.grabbed,
				grabbable: p.grabbable,
				classes: "",
				scratch: p.scratch
			});
			
			var classes = [];
			$.each(p.classes, function(cls, bool){
				classes.push(cls);
			});
			
			$.each(classes, function(i, cls){
				json.classes += cls + ( i < classes.length - 1 ? " " : "" );
			});
			
			return json;
		}
	});

	$$.fn.collection({
		restore: function( notifyRenderer ){
			var restored = [];
			
			if( notifyRenderer === undefined ){
				notifyRenderer = true;
			}

			function restore(ele, mixin){
				if( !ele.removed() ){
					// don't need to do anything
					return;
				}
				
				var structs = ele.cy()._private; // TODO remove ref to `structs` after refactoring
				var data = ele._private.data;
				var cy = ele.cy();
				
				// set id and validate
				if( data.id == null ){
					data.id = idFactory.generate( cy, ele );
				} else if( ele.cy().getElementById( data.id ).size() != 0 ){
					$$.console.error("Can not create element: an element in the visualisation already has ID `%s`", data.id);
					return;
				}
				
				if( $$.is.fn(mixin) ){
					var ret = mixin(ele);
					
					if( ret !== undefined && !ret ){
						return;
					}
				}
				 
				ele._private.removed = false;
				structs[ ele._private.group ][ data.id ] = ele;
				
				// update mapper structs
				var self = ele;
				$.each(data, function(name, val){
					self.cy().addContinuousMapperBounds(self, name, val);
				});
				
				restored.push( ele );
			}

			var nodes = this.filter(function(){
				return this.isNode();
			}).each(function(){
				restore(this);
			});

			var edges = this.filter(function(){
				return this.isEdge();
			}).each(function(){
				restore(this, function(ele){
					var data = ele._private.data;
					var cy = ele.cy();

					var fields = ["source", "target"];
					for(var i = 0; i < fields.length; i++){
						
						var field = fields[i];
						var val = data[field];
						
						if( val == null || val == "" ){
							$$.console.error("Can not create edge with id `%s` since it has no `%s` attribute set in `data` (must be non-empty value)", data.id, field);
							return false;
						} else if( cy.getElementById(val).empty() ){ 
							$$.console.error("Can not create edge with id `%s` since it specifies non-existant node as its `%s` attribute with id `%s`",  data.id, field, val);
							return false;
						}
					}
					
					var src = ele.cy().getElementById( data.source );
					var tgt = ele.cy().getElementById( data.target );
					
					function connect( node, otherNode, edge ){
						var otherId = otherNode.element()._private.data.id;
						var edgeId = edge.element()._private.data.id;
						
						if( node._private.edges[ otherId ] == null ){
							 node._private.edges[ otherId ] = {};
						}
						
						node._private.edges[ otherId ][ edgeId ] = {
							edge: edge,
							source: src,
							target: tgt
						};
					}
					
					// connect reference to source
					connect( src, tgt, ele );
					
					// connect reference to target
					connect( tgt, src, ele );
				});
			});

			// do compound node sanity checks
			nodes.each(function(){ 
				var parentId = this._private.data.parent;

				if( parentId != null ){
					var parent = this.cy().getElementById( parentId );

					if( parent.empty() ){
						$$.console.error("Node with id `%s` specifies non-existant parent `%s`; hierarchy will be ignored", this.id(), parentId);
					} else {

						var selfAsParent = false;
						var ancestor = parent;
						while( !ancestor.empty() ){
							if( this.same(ancestor) ){
								$$.console.error("Node with id `%s` has self as ancestor; hierarchy will be ignored", this.id());
								
								// mark self as parent and remove from data
								selfAsParent = true;
								delete this.element()._private.data.parent;

								// exit or we loop forever
								break;
							}

							ancestor = ancestor.parent();
						}

						if( !selfAsParent ){
							// connect with children
							parent.element()._private.children[ this.id() ] = this;
						}
					}
				}
			});
			
			restored = new $$.CyCollection( this.cy(), restored );
			if( restored.length > 0 ){
				if( notifyRenderer ){
					restored.rtrigger("add");
				} else {
					restored.trigger("add");
				}
				
			}
			
			return this;
		}
	});
	
	$$.fn.collection({
		removed: function(){
			return this.element()._private.removed;
		},

		inside: function(){
			return !this.removed();
		}
	});
	
	$$.fn.collection({
		remove: function( notifyRenderer ){
			var removed = [];
			var edges = {};
			var nodes = {};
			
			if( notifyRenderer === undefined ){
				notifyRenderer = true;
			}
			
			// make the list of elements to remove
			// (may be removing more than specified due to connected edges etc)
			this.each(function(){
				if( this.isNode() ){
					var node = this.element();
					nodes[ node.id() ] = this;
					
					// add connected edges
					function removeConnectedEdges(node){
						$.each(node._private.edges, function(otherNodeId, map){
							$.each(map, function(edgeId, struct){
								edges[ edgeId ] = struct.edge;
							});
						});
					}
					removeConnectedEdges( node );

					// add descendant nodes
					function addChildren(node){
						if( node.children().nonempty() ){
							$.each(node._private.children, function(childId, child){
								nodes[ childId ] = child;

								// also need to remove connected edges
								removeConnectedEdges( child );

								if( child.children().nonempty() ){
									addChildren( child );
								}
							});
						}
					}
					addChildren( node );
				}
				
				if( this.isEdge() ){
					edges[ this.id() ] = this;
				}
			});
			
			// now actually remove the elements
			$.each( [edges, nodes], function(i, elements){
				$.each(elements, function(id, element){
					var ele = element.element();
					var group = ele._private.group;
					
					// mark self as removed via flag
					ele._private.removed = true;
					
					// remove reference from core
					delete ele.cy()._private[ ele.group() ][ ele.id() ];
					
					// remove mapper bounds for all data removed
					$.each(ele._private.data, function(attr, val){
						ele.cy().removeContinuousMapperBounds(ele, attr, val);
					});
					
					// add to list of removed elements
					removed.push( ele );
					
					// if edge, delete references in nodes
					if( ele.isEdge() ){
						var src = ele.source().element();
						var tgt = ele.target().element();
						
						delete src._private.edges[ tgt.id() ][ ele.id() ];
						delete tgt._private.edges[ src.id() ][ ele.id() ];
					}
				});
			} );
			
			var removedElements = new $$.CyCollection( this.cy(), removed );
			if( removedElements.size() > 0 ){
				// must manually notify since trigger won't do this automatically once removed
				
				if( notifyRenderer ){
					this.cy().notify({
						type: "remove",
						collection: removedElements
					});
				}
				
				removedElements.trigger("remove");
			}
			
			return this;
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);


;(function($, $$){
	
	$$.fn.collection({
		animated: function(){
			return this.element()._private.animation.current.length > 0;
		}
	});
	
	$$.fn.collection({
		clearQueue: function(){
			return this.each(function(){
				this.element()._private.animation.queue = [];
			});
		}
	});
	
	$$.fn.collection({
		delay: function( time, complete ){
			return this.animate({
				delay: time
			}, {
				duration: time,
				complete: complete
			});
		}
	});
	
	$$.fn.collection({
		animate: function( properties, params ){
			var callTime = +new Date;
			
			return this.each(function(){
				var self = this;
				var startPosition = $$.util.copy( self._private.position );
				var startStyle = $$.util.copy( self.style() );
				var structs = this.cy()._private; // TODO remove ref to `structs` after refactoring
				
				params = $.extend(true, {}, {
					duration: 400
				}, params);
				
				switch( params.duration ){
				case "slow":
					params.duration = 600;
					break;
				case "fast":
					params.duration = 200;
					break;
				}
				
				if( properties == null || (properties.position == null && properties.bypass == null && properties.delay == null) ){
					return; // nothing to animate
				}
				
				if( self.animated() && (params.queue === undefined || params.queue) ){
					enqueue();
				} else {
					run();
				}
				
				var q;
				
				function enqueue(){
					q = self._private.animation.queue;
					add();
				}
				
				function run(){
					q = self._private.animation.current;
					add();
				} 
				
				function add(){
					q.push({
						properties: properties,
						params: params,
						callTime: callTime,
						startPosition: startPosition,
						startStyle: startStyle
					});
					
					structs.animation.elements = structs.animation.elements.add( self );
				}
			});
		}
	});
	
	$$.fn.collection({
		stop: function(clearQueue, jumpToEnd){
			this.each(function(){
				var self = this;
				
				$.each(self._private.animation.current, function(i, animation){				
					if( jumpToEnd ){
						$.each(animation.properties, function(propertyName, property){
							$.each(property, function(field, value){
								self._private[propertyName][field] = value;
							});
						});
					}
				});
				
				self._private.animation.current = [];
				
				if( clearQueue ){
					self._private.animation.queue = [];
				}
			});
			
			// we have to notify (the animation loop doesn't do it for us on `stop`)
			this.cy().notify({
				collection: this,
				type: "draw"
			});
			
			return this;
		}
	});
	
	$$.fn.collection({
		show: function(){
			this.cy().renderer().showElements( this.collection() );
			
			return this;
		}
	});
	
	$$.fn.collection({
		hide: function(){
			this.cy().renderer().hideElements( this.collection() );
			
			return this;
		}
	});
	
	$$.fn.collection({
		visible: function(){
			return this.cy().renderer().elementIsVisible( this.element() );
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);	

;(function($, $$){
	
	$$.fn.collection({
		addClass: function(classes){
			classes = classes.split(/\s+/);
			var self = this;
			
			$.each(classes, function(i, cls){
				if( $$.is.emptyString(cls) ){ return; }
				
				self.each(function(){
					this._private.classes[cls] = true;
				});
			});
			
			self.rtrigger("class");
			return self;
		}
	});
	
	$$.fn.collection({	
		hasClass: function(className){
			return this.element()._private.classes[className] == true;
		}
	});
	
	$$.fn.collection({
		toggleClass: function(classesStr, toggle){
			var classes = classesStr.split(/\s+/);
			var self = this;
			var toggledElements = [];
			
			function remove(self, cls){
				var toggled = self._private.classes[cls] !== undefined;
				delete self._private.classes[cls];
				
				if( toggled ){
					toggledElements.push( self );
				}
			}
			
			function add(self, cls){
				var toggled = self._private.classes[cls] === undefined;
				self._private.classes[cls] = true;
				
				if( toggled ){
					toggledElements.push( self );
				}
			}
			
			self.each(function(){
				var self = this;
				
				$.each(classes, function(i, cls){
					if( cls == null || cls == "" ){ return; }
					
					if( toggle === undefined ){
						if( self.hasClass(cls) ){
							remove(self, cls);
						} else {
							add(self, cls);
						}
					} else if( toggle ){
						add(self, cls);
					} else {
						remove(self, cls);
					}
				});
			});
			
			if( toggledElements.length > 0 ){
				var collection = new $$.CyCollection( self.cy(), toggledElements );
				collection.rtrigger("class");
			}
			
			return self;
		}
	});
	
	$$.fn.collection({
		removeClass: function(classes){
			classes = classes.split(/\s+/);
			var self = this;
			var removedElements = [];
			
			$.each(classes, function(i, cls){
				if( cls == null || cls == "" ){ return; }
				
				self.each(function(){
					var removed = this._private.classes[cls] !== undefined;
					delete this._private.classes[cls];
					
					if( removed ){
						removedElements.push( this );
					}
				});
			});
			
			if( removedElements.length > 0 ){
				var collection = new $$.CyCollection( self.cy(), removedElements );
				collection.rtrigger("class");
			}
			
			return self;
		}
	});
	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){

	$$.fn.collection({
		allAre: function(selector){
			return this.filter(selector).size() == this.size();
		},

		is: function(selector){
			return new $$.CySelector(this.cy(), selector).filter(this).size() > 0;
		},

		same: function( collection ){
			collection = this.cy().collection( collection );

			// cheap extra check
			if( this.size() != collection.size() ){
				return false;
			}

			return this.intersect( collection ).size() == this.size();
		},

		allSame: function( collection ){ // just an alias of same
			return this.same.apply( this, arguments );
		},

		anySame: function(collection){
			collection = this.cy().collection( collection );

			return this.intersect( collection ).size() > 0;
		},

		allAreNeighbors: function(collection){
			collection = this.cy().collection( collection );

			return this.neighborhood().intersect( collection ).size() == collection.size();
		},

		allAreNeighbours: function(){ // english spelling variant
			return this.allAreNeighbors.apply( this, arguments );
		}
	});


	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.collection({
		data: defineAccessor({ // defaults serve as example (data)
			attr: "data",
			allowBinding: true,
			bindingEvent: "data",
			settingTriggersEvent: true, 
			settingEvent: "data",
			validKey: { // already guaranteed that key is a string; `this` refers to the element
				forSet: function( key ){
					switch( key ){
					case "id":
					case "source":
					case "target":
					case "parent":
						return false;
					default:
						return true;
					}
				}
			},
			onSet: function( key, oldVal, newVal ){ // callback function to call when setting for an element
				this.cy().updateContinuousMapperBounds(this, key, oldVal, newVal);
			}
		}) 
	});
	
	$$.fn.collection({
		removeData: defineRemover({
			attr: "data",
			event: "data",
			triggerEvent: true,
			onRemove: function( key, val ){ // callback after removing; `this` refers to the element
				this.cy().removeContinuousMapperBounds(this, key, val);
			},
			validKey: function( key ){
				switch(key){
				case "id":
				case "source":
				case "target":
					return false;
				default:
					return true;
				}
			},
			essentialKeys: [ "id", "source", "target", "parent" ] // keys that remain even when deleting all
		}) 
	});
	
	$$.fn.collection({
		id: function(){
			return this.element()._private.data.id;
		}
	});
	
	$$.fn.collection({
		position: defineAccessor({
			attr: "position",
			allowBinding: true,
			bindingEvent: "position",
			settingTriggersEvent: true, 
			settingEvent: "position",
			validKey: {
				forSet: function( key ){
					return this.isNode();
				},
				forGet: function( key ){
					return this.isNode();
				}
			},
			validValue: function( key, val ){
				return true;
			},
			onSet: function( key, oldVal, newVal ){
				// do nothing
			},
			onGet: function( key, val ){
				// do nothing
			}
		})
	});
	
	$$.fn.collection({
		positions: function(pos){
			if( $$.is.plainObject(pos) ){
				
				this.each(function(i, ele){
					$.each(pos, function(key, val){
						ele._private.position[ key ] = val;
					});
				});
				
				this.rtrigger("position");
				
			} else if( $$.is.fn(pos) ){
				var fn = pos;
				
				this.each(function(i, ele){
					var pos = fn.apply(ele, [i, ele]);
					
					$.each(pos, function(key, val){
						ele._private.position[ key ] = val;
					});
				});
				
				this.rtrigger("position");
			}
		}
	});
	
	$$.fn.collection({
		renderedPosition: defineAccessor({
			attr: "position",
			allowBinding: false,
			settingTriggersEvent: true, 
			settingEvent: "position",
			validKey: {
				forSet: function( key ){
					return this.isNode();
				},
				forGet: function( key ){
					return this.isNode();
				}
			},
			validValue: function( key, val ){
				return true;
			},
			override: {
				forSet: function( key, val ){ 
					var rpos = {};
					rpos[ key ] = val;
					
					var mpos = this.cy().renderer().modelPoint( rpos );
					this.element()._private.position[key] = mpos[key];
				},
				forGet: function( key ){
					var mpos = this.position(false);
					var rpos = this.cy().renderer().renderedPoint( mpos );
					return rpos[ key ];
				},
				forObjectGet: function(){
					return this.cy().renderer().renderedPosition( this.element() );
				}
			}
		})
	});
	
	$$.fn.collection({
		renderedStyle: function( property ){
			var ele = this.element();
			var renderer = ele.cy().renderer(); // TODO remove reference after refactoring
			var rstyle = renderer.renderedStyle( ele );
			
			if( property === undefined ){
				return rstyle;
			} else {
				return rstyle[property];
			}
		}
	});
	
	$$.fn.collection({
		style: function( key ){
			var ele = this.element();
			
			if( key === undefined ){
				return $$.util.copy( ele._private.style );
			}
			
			// on false, return whole obj but w/o copying
			else if( key === false ){
				return ele._private.style;
			}
			
			else if( $$.is.string(key) ){
				return $$.util.copy( ele._private.style[key] );
			}
		}
	});
	
	$$.fn.collection({
		bypass: defineAccessor({
			attr: "bypass",
			allowBinding: true,
			bindingEvent: "bypass",
			settingTriggersEvent: true, 
			settingEvent: "bypass"
		})
	});
	
	$$.fn.collection({
		removeBypass: defineRemover({
			attr: "bypass",
			event: "bypass",
			triggerEvent: true
		})
	});
	
	// Generic metacode for defining data function behaviour follows
	//////////////////////////////////////////////////////////////////////////////////////
	
	function defineAccessor( opts ){
		var defaults = { // defaults serve as example (data)
			attr: "foo",
			allowBinding: false,
			bindingEvent: "foo",
			settingTriggersEvent: false, 
			settingEvent: "foo",
			validKey: { // already guaranteed that key is a string; `this` refers to the element
				forGet: function( key ){
					return true;
				},
				forSet: function( key ){
					return true;
				}
			},
			override: {
				forSet: null, // function(key, val){ return val; },
				forGet: null, // function(key){ return val; },
				forObjectGet: null // function( obj ){ return obj; }
			},
			validValue: function( key, val ){
				return true;
			},
			onSet: null, // function( key, oldVal, newVal ){},
			onGet: null, // function( key, val ){}
		};
		var params = $.extend(true, {}, defaults, opts);
				
		return function(key, val){
			var ele = this.element();
			var eles = this;
			
			function getter(key){
				if( params.validKey.forGet.apply(ele, [key]) ){
					var ret;
					
					if( $$.is.fn( params.override.forGet ) ){
						ret = params.override.forGet.apply( ele, [ key ] );
					} else {
						ret = $$.util.copy(  ele._private[ params.attr ] [ key ] );
					}
					
					if( $$.is.fn(params.onGet) ){
						params.onGet.apply( ele, [key, ret] );
					}
					
					return ret;
				} else {
					//$$.console.warn( "Can not access field `%s` for `%s` for collection with element `%s`", key, params.attr, ele._private.data.id );
				}
			}
			
			function setter(key, val){
				eles.each(function(){
					if( params.validKey.forSet.apply(this, [key]) && params.validValue.apply(this, [key, val]) ){
						var oldVal = this.element()._private[ params.attr ][ key ];
						
						if( $$.is.fn( params.override.forSet ) ){
							params.override.forSet.apply( this, [ key, val ] );
						} else {
							this.element()._private[ params.attr ][ key ] = $$.util.copy( val );
						}
						
						if( $$.is.fn(params.onSet) ){
							params.onSet.apply( ele, [key, oldVal, val] );
						}
					} else {
						//$$.console.warn( "Can not set field `%s` for `%s` for element `%s` to value `%o` : invalid value", key, params.attr, ele._private.data.id );
					}
				});
			}
			
			function bind(fn, data){
				if( data === undefined ){
					eles.bind( params.bindingEvent, fn );
				} else {
					eles.bind( params.bindingEvent, data, fn );
				}
			}
			
			function trigger(){
				if( params.settingTriggersEvent ){
					eles.rtrigger( params.settingEvent );
				}
			}
			
			function objGetter( copy ){
				var ret;
				var obj = ele._private[ params.attr ];
				
				if( $$.is.fn( params.override.forObjectGet ) ){
					ret = params.override.forObjectGet.apply( ele, [ ] );
				} else {
					ret = obj;
				}
				
				if( copy || copy === undefined ){
					ret = $$.util.copy( ret );
				}
				
				return ret;
			}
			
			// CASE: no parameters
			// get whole attribute object
			if( key === undefined ){
				return objGetter();
			}
			
			// if passed false, just get the whole object without copying
			else if( key === false ){
				return objGetter(false);
			}
			
			// CASE: single parameter
			else if( val === undefined ){
				
				// get attribute with specified key
				if( $$.is.string(key) ){
					return getter(key);
				}
				
				// set fields with an object
				else if( $$.is.plainObject(key) ) {
					var obj = key;
					
					$.each(obj, function(key, val){
						setter(key, val);
					});
					
					trigger();
				}
				
				// bind with a handler function
				else if( params.allowBinding && $$.is.fn(key) ){
					var fn = key;
					
					bind(fn);
				}
				
				else {
					$$.console.warn("Invalid first parameter for `%s()` for collection with element `%s` : expect a key string or an object" + ( params.allowBinding ?  " or a handler function for binding" : "" ), params.attr, ele._private.data.id);
				}

			}
			
			// CASE: two parameters
			else {
				
				// bind to event with data object
				if( params.allowBinding && $$.is.plainObject(key) && $$.is.fn(val) ){
					var data = key;
					var fn = val;
					
					bind(fn, data);
				}
				
				// set field with key to val
				else if( $$.is.string(key) ){
					setter(key, val);
					trigger();
				}
				
				else {
					$$.console.warn("Invalid parameters for `%s()` for collection with element `%s` : expect a key string and a value" + ( params.allowBinding ?  " or a data object and a handler function for binding" : "" ), params.attr, ele._private.data.id);
				}
				
			}
			
			return this; // chaining
		};
	}
	
	function defineRemover( opts ){
		var defaults = {
			attr: "foo",
			event: "foo",
			triggerEvent: false,
			onRemove: function( key, val ){ // callback after removing; `this` refers to the element
				// do nothing
			},
			validKey: function( key ){
				return true;
			},
			essentialKeys: [  ] // keys that remain even when deleting all
		};
		
		var params = $.extend(true, {}, defaults, opts);
		
		return function(keys){
			var ele = this.element();
			var eles = this;
			
			function removeAll(){
				eles.each(function(){
					var ele = this.element();
					var oldObj = ele._private[ params.attr ];
					var newObj = {};
					
					// copy essential keys to new obj
					$.each( params.essentialKeys, function(i, key){
						if( oldObj[ key ] !== undefined ){
							newObj[ key ] = oldObj[ key ];
						}
					} );
					
					ele._private[ params.attr ] = newObj;
				});
			}
			
			function remove( key ){
				eles.each(function(){
					var ele = this.element();
					
					if( params.validKey.apply(ele, [key]) ){
						var val = ele._private[ params.attr ][ key ];
						delete ele._private[ params.attr ][ key ];
						
						if( $$.is.fn( params.onRemove ) ){
							params.onRemove.apply(ele, [key, val]);
						}
					}
				});
			}
			
			function trigger(){
				if( params.triggerEvent ){
					eles.rtrigger( params.event );
				}
			}
			
			// remove all 
			if( keys === undefined ){
				removeAll();
				trigger();
			}
			
			else if( $$.is.string(keys) ){
				var keysArray = keys.split(/\s+/);
				
				$.each( keysArray, function(i, key){
					if( $$.is.emptyString(key) ) return; // ignore empty keys
					remove( key );
				} );
				
				trigger();
			} 
			
			else {
				$$.console.warn("Invalid parameters to `%s()` for collection with element `%s` : %o", params.attr, ele._private.data.id, arguments);
			}
			
			return this; // chaining
		};
	}

	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// Regular degree functions (works on single element)
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function defineDegreeFunction(callback){
		return function(){
			var self = this.element();
			
			if( self.isNode() && !self.removed() ){
				var degree = 0;
				var node = this;
				
				node.connectedEdges().each(function(i, edge){
					degree += callback( node, edge );
				});
				
				return degree;
			} else {
				return undefined;
			}
		};
	}
	
	$$.fn.collection({
		degree: defineDegreeFunction(function(node, edge){
			if( edge.source().same( edge.target() ) ){
				return 2;
			} else {
				return 1;
			}
		})
	});
	
	$$.fn.collection({
		indegree: defineDegreeFunction(function(node, edge){
			if( edge.target().same(node) ){
				return 1;
			} else {
				return 0;
			}
		})
	});
	
	$$.fn.collection({
		outdegree: defineDegreeFunction(function(node, edge){
			if( edge.source().same(node) ){
				return 1;
			} else {
				return 0;
			}
		})
	});
	
	
	// Collection degree stats
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function defineDegreeBoundsFunction(degreeFn, callback){
		return function(){
			var ret = null;
			
			this.nodes().each(function(i, ele){
				var degree = ele[degreeFn]();
				if( degree != null && (ret == null || callback(degree, ret)) ){
					ret = degree;
				}
			});
			
			return ret;
		};
	}
	
	$$.fn.collection({
		minDegree: defineDegreeBoundsFunction("degree", function(degree, min){
			return degree < min;
		})
	});
	
	$$.fn.collection({
		maxDegree: defineDegreeBoundsFunction("degree", function(degree, max){
			return degree > max;
		})
	});
	
	$$.fn.collection({
		minIndegree: defineDegreeBoundsFunction("indegree", function(degree, min){
			return degree < min;
		})
	});
	
	$$.fn.collection({
		maxIndegree: defineDegreeBoundsFunction("indegree", function(degree, max){
			return degree > max;
		})
	});
	
	$$.fn.collection({
		minOutdegree: defineDegreeBoundsFunction("outdegree", function(degree, min){
			return degree < min;
		})
	});
	
	$$.fn.collection({
		maxOutdegree: defineDegreeBoundsFunction("outdegree", function(degree, max){
			return degree > max;
		})
	});
	
	$$.fn.collection({
		totalDegree: function(){
			var total = 0;
			
			this.nodes().each(function(i, ele){
				total += ele.degree();
			});

			return total;
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);

	

;(function($, $$){
	
	// Functions for binding & triggering events
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$$.fn.collection({
		trigger: function(event, data){
			this.each(function(){
				var self = this;
				var type = $$.is.plainObject(event) ? event.type : event;
				var structs = this.cy()._private; // TODO remove ref to `structs` after refactoring
				
				var listeners = this._private.listeners[type];
				
				function fire(listener, eventData){
					if( listener != null && $$.is.fn(listener.callback) ){
						var eventData = $$.is.plainObject(event) ? event : $.Event(type);
						eventData.data = listener.data;
						eventData.cy = eventData.cytoscapeweb = cy;
						
						var args = [eventData];
						
						if( data != null ){
							if( !$$.is.array(data) ){
								data = [data];
							}

							$.each(data, function(i, arg){
								args.push(arg);
							});
						}
						
						listener.callback.apply(self, args);
					}
				}
				
				// trigger regularly bound listeners
				if( listeners != null ){
					$.each(listeners, function(i, listener){
						fire(listener);
					});
					
					for(var i = 0; i < listeners.length; i++){
						function remove(){
							listeners.splice(i, 1);
							i--;
						}
						
						if( listeners[i].one ){
							remove();
						} else if( listeners[i].once ){
							var listener = listeners[i];
							
							// remove listener for other elements
							listener.collection.each(function(j, ele){
								if( !ele.same(self) ){
									ele.unbind(type, listener.callback);
								}
							});
							
							// remove listener for self
							remove();
						}
					}
				}
				
				// trigger element live events
				if( structs.live[type] != null ){
					$.each(structs.live[type], function(key, callbackDefns){
						
						var selector = new $$.CySelector( self.cy(), key );
						var filtered = selector.filter( self.collection() );
						
						if( filtered.size() > 0 ){
							$.each(callbackDefns, function(i, listener){
								fire(listener);
							});
						}
					});
				}
				
				// bubble up element events to the core
				self.cy().trigger(event, data);
				
			});
			
			return this;
		}
	});
	
	$$.fn.collection({
		rtrigger: function(event, data){
			// notify renderer unless removed
			this.cy().notify({
				type: event,
				collection: this.filter(function(){
					return !this.removed();
				})
			});
			
			this.trigger(event, data);
		}
	});
	
	$$.fn.collection({
		live: function(){
			$$.console.warn("`live()` can be called only on collections made from top-level selectors");
			return this;
		}
	});
	
	$$.fn.collection({
		die: function(){
			$$.console.warn("`die()` can be called only on collections made from top-level selectors");
			return this;
		}
	});
	
	$$.fn.collection({
		bind: defineBinder({
			listener: function(){
				return {};
			}
		})
	});
	
	$$.fn.collection({
		one: defineBinder({
			listener: function(){
				return { one: true };
			}
		})
	});
	
	$$.fn.collection({
		once: defineBinder({
			listener: function( collection, element ){
				return {
					once: true,
					collection: collection
				}
			},
			after: function( collection, callback, data ){
				// do nothing
			}
		})
	});
	
	$$.fn.collection({
		on: function(events, data, callback){
			return this.bind(events, data, callback);
		}
	});
	
	$$.fn.collection({
		off: function(events, callback){
			return this.unbind(events, callback);
		}
	});
	
	$$.fn.collection({
		unbind: function(events, callback){
			var eventsArray = (events || "").split(/\s+/);
			
			this.each(function(){
				var self = this;
				
				if( events === undefined ){
					self._private.listeners = {};
					return;
				}
				
				$.each(eventsArray, function(j, event){
					if( $$.is.emptyString(event) ) return this;
				
					var listeners = self._private.listeners[event];
					
					if( listeners != null ){
						for(var i = 0; i < listeners.length; i++){
							var listener = listeners[i];
							
							if( callback == null || callback == listener.callback ){
								listeners.splice(i, 1);
								i--;
							}
						}
					}
				
				});
			});
			
			return this;
		}
	});
	
	// Metaprogramming to define a bunch of functions
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// add events to the list here IF AND ONLY IF there is no corresponding getter/setter function
	// e.g. it doesn't make sense to have `data` here, since it's also a getter/setter
	var aliases = "mousedown mouseup click mouseover mouseout mousemove touchstart touchmove touchend grab drag free";
	
	$.each(aliases.split(/\s+/), function(i, alias){
		var impl = {};
		impl[ alias ] = defineBindAlias({
			event: alias
		});
		
		$$.fn.collection(impl);
	});
	
	function defineBindAlias( params ){
		var defaults = {
			event: ""
		};
		
		params = $.extend({}, defaults, params);
		
		return function(data, callback){
			if( $$.is.fn(callback) ){
				return this.bind(params.event, data, callback);
			} else if( $$.is.fn(data) ){
				var handler = data;
				return this.bind(params.event, handler);						
			} else {
				return this.rtrigger(params.event, data);
			}
		};
	}
	
	function defineBinder( params ){
		var defaults = {
			listener: function(){},
			after: function(){}
		};
		params = $.extend({}, defaults, params);
		
		return function(events, data, callback){
			var self = this;
			
			// if data is undefined (middle param), then switch param order
			if( callback === undefined ){
				callback = data;
				data = undefined;
			}

			// if there isn't a callback, we can't really do anything
			if( callback == null ){
				return this;
			}
			
			$.each(events.split(/\s+/), function(i, event){
				if( $$.is.emptyString(event) ) return;
				
				self.each(function(){
					if( this._private.listeners[event] == null ){
						this._private.listeners[event] = [];
					}
					
					var listener = params.listener.apply(this, [ self, this ]);
					
					listener.callback = callback; // add the callback
					listener.data = data; // add the data
					this._private.listeners[event].push( listener );
				});
				
				params.after.apply(self, [self, callback, data]);
			});
			
			return this;
		};
	}
	
	
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){

	$$.fn.collection({
		isNode: function(){
			return this.group() == "nodes";
		}
	});
	
	$$.fn.collection({
		isEdge: function(){
			return this.group() == "edges";
		}
	});

	$$.fn.collection({
		isLoop: function(){
			return this.isEdge() && this.source().id() == this.target().id();
		}
	});
	
	$$.fn.collection({
		group: function(){
			return this.element()._private.group;
		}
	});

	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// Functions for iterating over collections
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$$.fn.collection({
		each: function(fn){
			if( $$.is.fn(fn) ){
				for(var i = 0; i < this.size(); i++){
					var ele = this.eq(i).element();
					fn.apply( ele, [ i, ele ] );
				}
			}
			return this;
		},

		toArray: function(){
			var array = [];
			
			for(var i = 0; i < this.size(); i++){
				array.push( this.eq(i).element() );
			}
			
			return array;
		},

		slice: function(start, end){
			var array = [];
			
			if( end == null ){
				end = this.size();
			}
			
			if( start < 0 ){
				start = this.size() + start;
			}
			
			for(var i = start; i >= 0 && i < end && i < this.size(); i++){
				array.push( this.eq(i) );
			}
			
			return new $$.CyCollection(this.cy(), array);
		},

		size: function(){
			return this.length;
		},

		eq: function(i){
			return this[i];
		},

		empty: function(){
			return this.size() == 0;
		},

		nonempty: function(){
			return !this.empty();
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){

	// Functions for scratchpad data for extensions & plugins
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$$.fn.collection({
		scratch: defineAccessor({ attr: "scratch" })
	});
	
	$$.fn.collection({
		removeScratch: defineRemover({ attr: "scratch" })
	});
	
	$$.fn.collection({
		renscratch: defineAccessor({ attr: "renscratch" })
	});

	$$.fn.collection({
		removeRenscratch: defineRemover({ attr: "renscratch" })
	});

	function defineAccessor( params ){
		var defaults = {
			attr: "scratch"
		};
		params = $.extend(true, {}, defaults, params);
		
		return function( name, val ){
			var self = this;
			
			if( name === undefined ){
				return self.element()._private[ params.attr ];
			}
			
			var fields = name.split(".");
			
			function set(){
				self.each(function(){
					var self = this;
					
					var obj = self._private[ params.attr ];
					$.each(fields, function(i, field){
						if( i == fields.length - 1 ){ return; }
						
						obj = obj[field];
					});
					
					var lastField = fields[ fields.length - 1 ];
					obj[ lastField ] = val;
				});
			}
			
			function get(){
				var obj = self.element()._private[ params.attr ];
				$.each(fields, function(i, field){
					obj = obj[field];
				});
				
				return obj;
			}
			
			if( val === undefined ){
				return get(); 
			} else {
				set();
			}
			
			return this;
		};
	}
	
	function defineRemover( params ){
		var defaults = {
			attr: "scratch"
		};
		params = $.extend(true, {}, defaults, params);
		
		return function( name ){
			var self = this;
			
			// remove all
			if( name === undefined ){
				self.each(function(){
					this._private[ params.attr ] = {};
				});
			} 
			
			// remove specific
			else {
				var names = name.split(/\s+/);
				$.each(names, function(i, name){
					self.each(function(){
						eval( "delete this._private." + params.attr + "." + name + ";" );
					});
				});
			}
			
			return this;
		};
	}
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	// Collection functions that toggle a boolean value
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	function defineSwitchFunction(params){
		return function(){
			var args = arguments;
			
			// e.g. cy.nodes().select( data, handler )
			if( args.length == 2 ){
				this.bind( params.event, args[0], args[1] );
			} 
			
			// e.g. cy.nodes().select( handler )
			else if( args.length == 1 ){
				this.bind( params.event, args[0] );
			}
			
			// e.g. cy.nodes().select()
			else if( args.length == 0 ){
				var selected = new $$.CyCollection( this.cy() );
				
				this.each(function(){
					if( params.ableField == null || this.element()._private[params.ableField] ){
						this.element()._private[params.field] = params.value;
						
						selected = selected.add( this );
					}
				});
				selected.rtrigger(params.event);
			}

			return this;
		};
	}
	
	function defineSwitchSet( params ){
		function impl(name, fn){
			var impl = {};
			impl[ name ] = fn;
			
			return impl;
		}
		
		$$.fn.collection(
			impl( params.field, function(){
				return this.element()._private[ params.field ];
			})
		);
		
		$$.fn.collection(
			impl( params.on, defineSwitchFunction({
					event: params.on,
					field: params.field,
					ableField: params.ableField,
					value: true
				})
			)
		);
	
		$$.fn.collection(
			impl( params.off, defineSwitchFunction({
					event: params.off,
					field: params.field,
					ableField: params.ableField,
					value: false
				})
			)
		);
	}
	
	defineSwitchSet({
		field: "locked",
		on: "lock",
		off: "unlock"
	});
	
	defineSwitchSet({
		field: "grabbable",
		on: "grabify",
		off: "ungrabify"
	});
	
	defineSwitchSet({
		field: "selected",
		ableField: "selectable",
		on: "select",
		off: "unselect"
	});
	
	defineSwitchSet({
		field: "selectable",
		on: "selectify",
		off: "unselectify"
	});
	
	$$.fn.collection({
		grabbed: function(){
			return this.element()._private.grabbed;
		}
	});
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	$$.fn.collection({
		nodes: function(selector){
			return this.filter(function(i, element){
				return element.isNode();
			}).filter(selector);
		}
	});

	$$.fn.collection({
		edges: function(selector){
			return this.filter(function(i, element){
				return element.isEdge();
			}).filter(selector);
		}
	});

	$$.fn.collection({
		filter: function(filter){
			var cy = this.cy();
			
			if( $$.is.fn(filter) ){
				var elements = [];
				this.each(function(i, element){
					element = element.element();
					
					if( filter.apply(element, [i, element]) ){
						elements.push(element);
					}
				});
				
				return new $$.CyCollection(this.cy(), elements);
			
			} else if( $$.is.string(filter) || $$.is.elementOrCollection(filter) ){
				return new $$.CySelector(this.cy(), filter).filter(this);
			
			} else if( filter === undefined ){
				return this;
			}

			$$.console.warn("You must pass a function or a selector to cy.filter() et al");
			return new $$.CyCollection( this.cy() );
		}
	});

	$$.fn.collection({	
		not: function(toRemove){
			
			if( toRemove == null ){
				return this;
			} else {
			
				if( $$.is.string(toRemove) ){
					toRemove = this.filter(toRemove);
				}
				
				var elements = [];
				toRemove = toRemove.collection();
				
				this.each(function(i, element){
					
					var remove = toRemove._private.ids[ element.id() ];					
					if( !remove ){
						elements.push( element.element() );
					}
					
				});
				
				return new $$.CyCollection(this.cy(), elements);
			}
			
		}
	});
	
	$$.fn.collection({
		intersect: function( other ){
			var self = this;
			
			// if a selector is specified, then filter by it
			if( $$.is.string(other) ){
				var selector = other;
				return this.filter( selector );
			}
			
			if( $$.is.element(other) ){
				other = other.collection();
			}
			
			var elements = [];
			var col1 = this;
			var col2 = other;
			var col1Smaller = this.size() < other.size();
			var ids1 = col1Smaller ? col1._private.ids : col2._private.ids;
			var ids2 = col1Smaller ? col2._private.ids : col1._private.ids;
			
			$.each(ids1, function(id){
				if( ids2[ id ] ){
					elements.push( self.cy().getElementById(id) );
				}
			});
			
			return new $$.CyCollection( this.cy(), elements );
		}
	});
	
	$$.fn.collection({
		add: function(toAdd){
			var self = this;			
			
			if( toAdd == null ){
				return this;
			}
			
			if( $$.is.string(toAdd) ){
				var selector = toAdd;
				toAdd = this.cy().elements(selector);
			}
			toAdd = toAdd.collection();
			
			var elements = [];
			var ids = {};
		
			function add(element){
				if( element == null ){
					return;
				}
				
				if( ids[ element.id() ] == null ){
					elements.push(element);
					ids[ element.id() ] = true;
				}
			}
			
			// add own
			this.each(function(i, element){
				add(element);
			});
			
			// add toAdd
			var collection = toAdd.collection();
			collection.each(function(i, element){
				add(element);
			});
			
			return new $$.CyCollection(this.cy(), elements);
		}
	});



	// Neighbourhood functions
	//////////////////////////

	$$.fn.collection({
		neighborhood: function(selector){
			var elements = [];
			
			this.nodes().each(function(i, node){
				node.connectedEdges().each(function(j, edge){
					var otherNode = edge.connectedNodes().not(node);

					// need check in case of loop
					if( otherNode.size() > 0 ){
						elements.push( otherNode.element() ); // add node 1 hop away
					}
					
					// add connected edge
					elements.push( edge.element() );
				});
			});
			
			return this.connectedNodes().add( new $$.CyCollection( this.cy(), elements ) ).filter( selector );
		}
	});
	$$.fn.collection({ neighbourhood: function(selector){ return this.neighborhood(selector); } });
	
	$$.fn.collection({
		closedNeighborhood: function(selector){
			return new $$.CySelector(this.cy(), selector).filter( this.neighborhood().add(this) );
		}
	});
	$$.fn.collection({ closedNeighbourhood: function(selector){ return this.closedNeighborhood(selector); } });
	
	$$.fn.collection({
		openNeighborhood: function(selector){
			return this.neighborhood(selector);
		}
	});
	$$.fn.collection({ openNeighbourhood: function(selector){ return this.openNeighborhood(selector); } });
	


	// Edge functions
	/////////////////

	$$.fn.collection({
		source: defineSourceFunction({
			attr: "source"
		})
	});
	
	$$.fn.collection({
		target: defineSourceFunction({
			attr: "target"
		})
	});
	
	function defineSourceFunction( params ){
		return function( selector ){
			var sources = [];

			this.edges().each(function(){
				var src = this.cy().getElementById( this.data(params.attr) ).element();
				sources.push( src );
			});
			
			return new $$.CyCollection( this.cy(), sources ).filter( selector );
		}
	}

	$$.fn.collection({
		edgesWith: defineEdgesWithFunction()
	});
	
	$$.fn.collection({
		edgesTo: defineEdgesWithFunction({
			include: function( node, otherNode, edgeStruct ){
				return edgeStruct.target.same( otherNode );
			}
		})
	});
	
	function defineEdgesWithFunction( params ){
		var defaults = {
			include: function( node, otherNode, edgeStruct ){
				return true;
			}
		};
		params = $.extend(true, {}, defaults, params);
		
		return function(otherNodes){
			var elements = [];

			// get elements if a selector is specified
			if( $$.is.string(otherNodes) ){
				otherNodes = this.cy.$( otherNodes );
			}
			
			this.nodes().each(function(i, node){
				otherNodes.nodes().each(function(j, otherNode){
					var edgesMap = node.element()._private.edges[ otherNode.id() ];
					
					if( edgesMap != null ){
						$.each(edgesMap, function(edgeId, edgeStruct){
							if( params.include( node, otherNode, edgeStruct ) ){
								elements.push( edgeStruct.edge );
							}
						} );
					}
				});
			});
			
			return new $$.CyCollection( this.cy(), elements );
		};
	}
	
	$$.fn.collection({
		connectedEdges: function( selector ){
			var elements = [];
			
			this.nodes().each(function(i, node){
				$.each(node.element()._private.edges, function(otherNodeId, edgesById){
					$.each(edgesById, function(edgeId, edgeStruct){
						elements.push( edgeStruct.edge );
					});
				});
			});
			
			return new $$.CyCollection( this.cy(), elements ).filter( selector );
		}
	});
	
	$$.fn.collection({
		connectedNodes: function( selector ){
			return this.source().add( this.target() ).filter( selector );
		}
	});
	
	$$.fn.collection({
		parallelEdges: defineParallelEdgesFunction()
	});
	
	$$.fn.collection({
		codirectedEdges: defineParallelEdgesFunction({
			include: function( source, target, edgeStruct ){
				return edgeStruct.source.same( source ) &&
					edgeStruct.target.same( target );
			}
		})
	});
	
	function defineParallelEdgesFunction(params){
		var defaults = {
			include: function( source, target, edgeStruct ){
				return true;
			}
		};
		params = $.extend(true, {}, defaults, params);
		
		return function( selector ){
			var elements = [];
			
			this.edges().each(function(i, edge){
				var src = edge.source().element();
				var tgt = edge.target().element();
				
				// look at edges between src and tgt
				$.each( src._private.edges[ tgt.id() ], function(id, edgeStruct){
					if( params.include(src, tgt, edgeStruct) ){
						elements.push( edgeStruct.edge );
					}
				});
			});
			
			return new $$.CyCollection( this.cy(), elements ).filter( selector );
		};
	
	}




	// Compound functions
	/////////////////////

	$$.fn.collection({
		parent: function( selector ){
			var parents = [];

			this.each(function(){
				var parent = this.cy().getElementById( this.data("parent") );

				if( parent.size() > 0 ){
					parents.push( parent.element() );
				}
			});
			
			return new $$.CyCollection( this.cy(), parents ).filter( selector );
		},

		parents: function( selector ){
			var parents = [];

			var eles = this.parent();
			while( eles.nonempty() ){
				eles.each(function(){
					parents.push( this.element() );
				});

				eles = eles.parent();
			}

			return new $$.CyCollection( this.cy(), parents ).filter( selector );
		},

		children: function( selector ){
			var children = [];

			this.each(function(){
				var ele = this.element();

				$.each(ele._private.children, function(id, child){
					children.push( child );
				});
			});

			return new $$.CyCollection( this.cy(), children ).filter( selector );
		},

		siblings: function( selector ){
			return this.parent().children().not( this ).filter( selector );
		},

		descendants: function( selector ){
			var elements = [];

			function add( eles ){
				eles.each(function(){
					elements.push( this.element() );

					if( this.children().nonempty() ){
						add( eles.children() );
					}
				});
			}

			add( this.children() );

			return new $$.CyCollection( this.cy(), elements ).filter( selector );
		}
	});

	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
		
	// CySelector
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	function CySelector(cy, onlyThisGroup, selector){
		
		if( cy === undefined || cy.$ == null ){
			$$.console.error("A selector must have a reference to the core");
			return;
		}
		
		if( selector === undefined && onlyThisGroup !== undefined ){
			selector = onlyThisGroup;
			onlyThisGroup = undefined;
		}
		
		var self = this;
		
		self._private = {
			selectorText: null,
			invalid: true,
			cy: cy
		}
	
		function newQuery(){
			return {
				classes: [],
				colonSelectors: [],
				data: [],
				group: onlyThisGroup,
				ids: [],
				meta: [],
				collection: null,
				filter: null
			};
		}
		
		if( selector == null || ( $$.is.string(selector) && selector.match(/^\s*$/) ) ){
			
			if( onlyThisGroup == null ){
				// ignore
				self.length = 0;
			} else {
				
				// NOTE: need to update this with fields as they are added to logic in else if
				self[0] = newQuery();
				self.length = 1;
			}
							
		} else if( $$.is.element( selector ) ){
			var collection = new $$.CyCollection(self.cy(), [ selector ]);
			
			self[0] = newQuery();
			self[0].collection = collection;
			self.length = 1;
			
		} else if( $$.is.collection( selector ) ){
			self[0] = newQuery();
			self[0].collection = selector;
			self.length = 1;
			
		} else if( $$.is.fn(selector) ) {
			self[0] = newQuery();
			self[0].filter = selector;
			self.length = 1;
			
		} else if( $$.is.string(selector) ){
		
			// these are the actual tokens in the query language
			var metaChar = "[\\!\\\"\\#\\$\\%\\&\\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]"; // chars we need to escape in var names, etc
			var variable = "(?:[\\w-]|(?:\\\\"+ metaChar +"))+"; // a variable name
			var comparatorOp = "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*="; // binary comparison op (used in data selectors)
			var boolOp = "\\?|\\!|\\^"; // boolean (unary) operators (used in data selectors)
			var string = '"(?:\\\\"|[^"])+"' + "|" + "'(?:\\\\'|[^'])+'"; // string literals (used in data selectors) -- doublequotes | singlequotes
			var number = "\\d*\\.\\d+|\\d+|\\d*\\.\\d+[eE]\\d+"; // number literal (used in data selectors) --- e.g. 0.1234, 1234, 12e123
			var value = string + "|" + number; // a value literal, either a string or number
			var meta = "degree|indegree|outdegree"; // allowed metadata fields (i.e. allowed functions to use from $$.CyCollection)
			var separator = "\\s*,\\s*"; // queries are separated by commas; e.g. edge[foo = "bar"], node.someClass
			var className = variable; // a class name (follows variable conventions)
			var id = variable; // an element id (follows variable conventions)
			
			// when a token like a variable has escaped meta characters, we need to clean the backslashes out
			// so that values get compared properly in CySelector.filter()
			function cleanMetaChars(str){
				return str.replace(new RegExp("\\\\(" + metaChar + ")", "g"), "\1");
			}
			
			// add @ variants to comparatorOp
			$.each( comparatorOp.split("|"), function(i, op){
				comparatorOp += "|@" + op;
			} );
			
			// NOTE: add new expression syntax here to have it recognised by the parser;
			// a query contains all adjacent (i.e. no separator in between) expressions;
			// the current query is stored in self[i] --- you can use the reference to `this` in the populate function;
			// you need to check the query objects in CySelector.filter() for it actually filter properly, but that's pretty straight forward
			var exprs = {
				group: {
					regex: "(node|edge)",
					populate: function( group ){
						this.group = group + "s";
					}
				},
				
				state: {
					regex: "(:selected|:unselected|:locked|:unlocked|:visible|:hidden|:grabbed|:free|:removed|:inside|:grabbable|:ungrabbable|:animated|:unanimated)",
					populate: function( state ){
						this.colonSelectors.push( state );
					}
				},
				
				id: {
					regex: "\\#("+ id +")",
					populate: function( id ){
						this.ids.push( cleanMetaChars(id) );
					}
				},
				
				className: {
					regex: "\\.("+ className +")",
					populate: function( className ){
						this.classes.push( cleanMetaChars(className) );
					}
				},
				
				dataExists: {
					regex: "\\[\\s*("+ variable +")\\s*\\]",
					populate: function( variable ){
						this.data.push({
							field: cleanMetaChars(variable)
						});
					}
				},
				
				dataCompare: {
					regex: "\\[\\s*("+ variable +")\\s*("+ comparatorOp +")\\s*("+ value +")\\s*\\]",
					populate: function( variable, comparatorOp, value ){
						this.data.push({
							field: cleanMetaChars(variable),
							operator: comparatorOp,
							value: value
						});
					}
				},
				
				dataBool: {
					regex: "\\[\\s*("+ boolOp +")\\s*("+ variable +")\\s*\\]",
					populate: function( boolOp, variable ){
						this.data.push({
							field: cleanMetaChars(variable),
							operator: boolOp
						});
					}
				},
				
				metaCompare: {
					regex: "\\{\\s*("+ meta +")\\s*("+ comparatorOp +")\\s*("+ number +")\\s*\\}",
					populate: function( meta, comparatorOp, number ){
						this.meta.push({
							field: cleanMetaChars(meta),
							operator: comparatorOp,
							value: number
						});
					}
				}
			};
			
			self._private.selectorText = selector;
			var remaining = selector;
			var i = 0;
			
			// of all the expressions, find the first match in the remaining text
			function consumeExpr(){
				var expr;
				var match;
				var name;
				
				$.each(exprs, function(n, e){
					var m = remaining.match(new RegExp( "^" + e.regex ));
					
					if( m != null ){
						match = m;
						expr = e;
						name = n;
						
						var consumed = m[0];
						remaining = remaining.substring( consumed.length );								
						
						return false;
					}
				});
				
				return {
					expr: expr,
					match: match,
					name: name
				};
			}
			
			// consume all leading whitespace
			function consumeWhitespace(){
				var match = remaining.match(/^\s+/);
				
				if( match ){
					var consumed = match[0];
					remaining = remaining.substring( consumed.length );
				}
			}
			
			// consume query separators
			function consumeSeparators(){
				var match = remaining.match(new RegExp( "^" + separator ));
				
				// if we've matched to a separator, consume it
				if( match ){
					var consumed = match[0];
					remaining = remaining.substring( consumed.length );
					self[++i] = newQuery();
				}
			}
			
			self[0] = newQuery(); // get started
			
			consumeWhitespace(); // get rid of leading whitespace
			for(;;){
				consumeSeparators();
				
				var check = consumeExpr();
				
				if( check.name == "group" && onlyThisGroup != null && self[i].group != onlyThisGroup ){
					$$.console.error("Group `%s` conflicts with implicit group `%s` in selector `%s`", self[i].group, onlyThisGroup, selector);
					return;
				}
				
				if( check.expr == null ){
					$$.console.error("The selector `%s` is invalid", selector);
					return;
				} else {
					var args = [];
					for(var j = 1; j < check.match.length; j++){
						args.push( check.match[j] );
					}
					
					// let the token populate the selector object (i.e. in self[i])
					check.expr.populate.apply( self[i], args );
				}
				
				// we're done when there's nothing left to parse
				if( remaining.match(/^\s*$/) ){
					break;
				}
			}
			
			self.length = i + 1;
			
		} else {
			$$.console.error("A selector must be created from a string; found %o", selector);
			return;
		}

		self._private.invalid = false;
		
	}
	$.cytoscapeweb.CySelector = CySelector; // expose
	
	CySelector.prototype.cy = function(){
		return this._private.cy;
	};
	
	CySelector.prototype.size = function(){
		return this.length;
	};
	
	CySelector.prototype.eq = function(i){
		return this[i];
	};
	
	// get elements from the core and then filter them
	CySelector.prototype.find = function(){
		// TODO impl
	};
	
	// filter an existing collection
	CySelector.prototype.filter = function(collection, addLiveFunction){
		var self = this;
		
		// don't bother trying if it's invalid
		if( self._private.invalid ){
			return new $$.CyCollection( self.cy() );
		}
		
		var selectorFunction = function(i, element){
			for(var j = 0; j < self.length; j++){
				var query = self[j];
				
				// check group
				if( query.group != null && query.group != element._private.group ){
					continue;
				}
				
				// check colon selectors
				var allColonSelectorsMatch = true;
				for(var k = 0; k < query.colonSelectors.length; k++){
					var sel = query.colonSelectors[k];
					var renderer = self.cy().renderer(); // TODO remove reference after refactoring
					
					switch(sel){
					case ":selected":
						allColonSelectorsMatch = element.selected();
						break;
					case ":unselected":
						allColonSelectorsMatch = !element.selected();
						break;
					case ":locked":
						allColonSelectorsMatch = element.locked();
						break;
					case ":unlocked":
						allColonSelectorsMatch = !element.locked();
						break;
					case ":visible":
						allColonSelectorsMatch = renderer.elementIsVisible(element);
						break;
					case ":hidden":
						allColonSelectorsMatch = !renderer.elementIsVisible(element);
						break;
					case ":grabbed":
						allColonSelectorsMatch = element.grabbed();
						break;
					case ":free":
						allColonSelectorsMatch = !element.grabbed();
						break;
					case ":removed":
						allColonSelectorsMatch = element.removed();
						break;
					case ":inside":
						allColonSelectorsMatch = !element.removed();
						break;
					case ":grabbable":
						allColonSelectorsMatch = element.grabbable();
						break;
					case ":ungrabbable":
						allColonSelectorsMatch = !element.grabbable();
						break;
					case ":animated":
						allColonSelectorsMatch = element.animated();
						break;
					case ":unanimated":
						allColonSelectorsMatch = !element.animated();
						break;
					}
					
					if( !allColonSelectorsMatch ) break;
				}
				if( !allColonSelectorsMatch ) continue;
				
				// check id
				var allIdsMatch = true;
				for(var k = 0; k < query.ids.length; k++){
					var id = query.ids[k];
					var actualId = element._private.data.id;
					
					allIdsMatch = allIdsMatch && (id == actualId);
					
					if( !allIdsMatch ) break;
				}
				if( !allIdsMatch ) continue;
				
				// check classes
				var allClassesMatch = true;
				for(var k = 0; k < query.classes.length; k++){
					var cls = query.classes[k];
					
					allClassesMatch = allClassesMatch && element.hasClass(cls);
					
					if( !allClassesMatch ) break;
				}
				if( !allClassesMatch ) continue;
				
				// generic checking for data/metadata
				function operandsMatch(params){
					var allDataMatches = true;
					for(var k = 0; k < query[params.name].length; k++){
						var data = query[params.name][k];
						var operator = data.operator;
						var value = data.value;
						var field = data.field;
						var matches;
						
						if( operator != null && value != null ){
							
							var fieldStr = "" + params.fieldValue(field);
							var valStr = "" + eval(value);
							
							var caseInsensitive = false;
							if( operator.charAt(0) == "@" ){
								fieldStr = fieldStr.toLowerCase();
								valStr = valStr.toLowerCase();
								
								operator = operator.substring(1);
								caseInsensitive = true;
							}
							
							if( operator == "=" ){
								operator = "==";
							}
							
							switch(operator){
							case "*=":
								matches = fieldStr.search(valStr) >= 0;
								break;
							case "$=":
								matches = new RegExp(valStr + "$").exec(fieldStr) != null;
								break;
							case "^=":
								matches = new RegExp("^" + valStr).exec(fieldStr) != null;
								break;
							default:
								// if we're doing a case insensitive comparison, then we're using a STRING comparison
								// even if we're comparing numbers
								if( caseInsensitive ){
									// eval with lower case strings
									var expr = "fieldStr " + operator + " valStr";
									matches = eval(expr);
								} else {
									// just eval as normal
									var expr = params.fieldRef(field) + " " + operator + " " + value;
									matches = eval(expr);
								}
								
							}
						} else if( operator != null ){
							switch(operator){
							case "?":
								matches = params.fieldTruthy(field);
								break;
							case "!":
								matches = !params.fieldTruthy(field);
								break;
							case "^":
								matches = params.fieldUndefined(field);
								break;
							}
						} else { 	
							matches = !params.fieldUndefined(field);
						}
						
						if( !matches ){
							allDataMatches = false;
							break;
						}
					} // for
					
					return allDataMatches;
				} // operandsMatch
				
				// check data matches
				var allDataMatches = operandsMatch({
					name: "data",
					fieldValue: function(field){
						return element._private.data[field];
					},
					fieldRef: function(field){
						return "element._private.data." + field;
					},
					fieldUndefined: function(field){
						return element._private.data[field] === undefined;
					},
					fieldTruthy: function(field){
						if( element._private.data[field] ){
							return true;
						}
						return false;
					}
				});
				
				if( !allDataMatches ){
					continue;
				}
				
				// check metadata matches
				var allMetaMatches = operandsMatch({
					name: "meta",
					fieldValue: function(field){
						return element[field]();
					},
					fieldRef: function(field){
						return "element." + field + "()";
					},
					fieldUndefined: function(field){
						return element[field]() == undefined;
					},
					fieldTruthy: function(field){
						if( element[field]() ){
							return true;
						}
						return false;
					}
				});
				
				if( !allMetaMatches ){
					continue;
				}
				
				// check collection
				if( query.collection != null ){
					var matchesAny = query.collection._private.ids[ element.id() ] != null;
					
					if( !matchesAny ){
						continue;
					}
				}
				
				// check filter function
				if( query.filter != null && element.collection().filter( query.filter ).size() == 0 ){
					continue;
				}
				
				// we've reached the end, so we've matched everything for this query
				return true;
			}
			
			return false;
		};
		
		if( self._private.selectorText == null ){
			selectorFunction = function(){ return true; };
		}
		
		var filteredCollection = collection.filter(selectorFunction);
		
		if(addLiveFunction){
			
			var key = self.selector();
			var structs = self.cy()._private; // TODO remove ref to `structs` after refactoring
			
			filteredCollection.live = function(events, data, callback){
				
				var evts = events.split(/\s+/);
				$.each(evts, function(i, event){
				
					if( $$.is.emptyString(event) ){
						return;
					}
					
					if( callback === undefined ){
						callback = data;
						data = undefined;
					}
					
					if( structs.live[event] == null ){
						structs.live[event] = {};
					}
					
					if( structs.live[event][key] == null ){
						structs.live[event][key] = [];
					}
					
					structs.live[event][key].push({
						callback: callback,
						data: data
					});
					
				});						
				
				return this;
			};
			
			filteredCollection.die = function(event, callback){
				if( event == null ){
					$.each(structs.live, function(event){
						if( structs.live[event] != null ){
							delete structs.live[event][key];
						}
					});
				} else {
					var evts = event.split(/\s+/);
					
					$.each(evts, function(j, event){
						if( callback == null ){
							if( structs.live[event] != null ){
								delete structs.live[event][key];
							}
						} else if( structs.live[event] != null && structs.live[event][key] != null ) {
							for(var i = 0; i < structs.live[event][key].length; i++){
								if( structs.live[event][key][i].callback == callback ){
									structs.live[event][key].splice(i, 1);
									i--;
								}
							}
						}
					});
					
				}
				
				return this;
			};
		}
		
		return filteredCollection;
	};
	
	// ith query to string
	CySelector.prototype.toString = CySelector.prototype.selector = function(){
		
		var str = "";
		
		function clean(obj){
			if( $$.is.string(obj) ){
				return obj;
			} 
			return "";
		}
		
		for(var i = 0; i < this.length; i++){
			var query = this[i];
			
			var group = clean(query.group);
			str += group.substring(0, group.length - 1);
			
			for(var j = 0; j < query.data.length; j++){
				var data = query.data[j];
				str += "[" + data.field + clean(data.operator) + clean(data.value) + "]"
			}
			
			for(var j = 0; j < query.colonSelectors.length; j++){
				var sel = query.colonSelectors[i];
				str += sel;
			}
			
			for(var j = 0; j < query.ids.length; j++){
				var sel = "#" + query.ids[i];
				str += sel;
			}
			
			for(var j = 0; j < query.classes.length; j++){
				var sel = "." + query.classes[i];
				str += sel;
			}
			
			if( this.length > 1 && i < this.length - 1 ){
				str += ", ";
			}
		}
		
		return str;
	};
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
		
	function NullRenderer(options){
		$.cytoscapeweb("debug", "Creating null renderer with options (%o)", options);
	}
	
	NullRenderer.prototype.notify = function(params){
		$.cytoscapeweb("debug", "Notify null renderer with params (%o)", params);
	};
	
	NullRenderer.prototype.zoom = function(params){
		$.cytoscapeweb("debug", "Zoom null renderer with params (%o)", params);
	};
	
	NullRenderer.prototype.fit = function(params){
		$.cytoscapeweb("debug", "Fit null renderer with params (%o)", params);
	};
	
	NullRenderer.prototype.pan = function(params){
		$.cytoscapeweb("debug", "Pan null renderer with params (%o)", params);
	};
	
	NullRenderer.prototype.panBy = function(params){
		$.cytoscapeweb("debug", "Relative pan null renderer with params (%o)", params);
	};
	
	NullRenderer.prototype.showElements = function(element){
	};
	
	NullRenderer.prototype.hideElements = function(element){
	};
	
	NullRenderer.prototype.elementIsVisible = function(element){
		return element._private.visible;
	};
	
	NullRenderer.prototype.renderedDimensions = function(){
		return {};
	};

	NullRenderer.prototype.dimensions = function(){
		return {};
	};
	
	$.cytoscapeweb("renderer", "null", NullRenderer);
	
})(jQuery, jQuery.cytoscapeweb);

(function($, $$){

	var defaults = {
		minZoom: 0.001,
		maxZoom: 1000,
		maxPan: -1 >>> 1,
		minPan: (-(-1>>>1)-1),
		selectionToPanDelay: 500,
		dragToSelect: true,
		dragToPan: true,
			
		style: {
			selectors: {
				"node": {
					fillColor: "#888",
					fillOpacity: 1,
					borderColor: "#666",
					borderOpacity: 1,
					opacity: 1,
					borderWidth: 0,
					borderStyle: "solid",
					height: 10,
					width: 10,
					shape: "ellipse",
					cursor: "pointer",
					visibility: "visible",
					labelValign: "top",
					labelHalign: "middle",
					labelText: {
						defaultValue: "",
						passthroughMapper: "label"
					},
					labelFillColor: "#000",
					labelOutlineColor: "#666",
					labelOutlineWidth: 0,
					labelFontSize: "inherit",
					labelFontStyle: "normal",
					labelFontDecoration: "none", 
					labelFontVariant: "italic", 
					labelFontFamily: "Arial",
					labelFontWeight: "bold",
					labelOpacity: 1,
					labelOutlineOpacity: 1
				},
				"edge": {
					lineColor: "#ccc",
					targetArrowColor: "#ccc",
					sourceArrowColor: "#ccc",
					targetArrowShape: "none",
					sourceArrowShape: "none",
					opacity: 1,
					width: 1,
					style: "solid",
					cursor: "pointer",
					visibility: "visible",
					labelText: {
						defaultValue: "",
						passthroughMapper: "label"
					},
					labelFillColor: "#000",
					labelOutlineColor: "#666",
					labelOutlineWidth: 0,
					labelFontSize: "inherit",
					labelFontStyle: "normal",
					labelFontDecoration: "none", 
					labelFontVariant: "italic", 
					labelFontFamily: "Arial",
					labelFontWeight: "bold",
					labelOutlineOpacity: 1,
					labelOpacity: 1
				}
			},
			global: {
				panCursor: "grabbing",
				selectionFillColor: "#ccc",
				selectionOpacity: 0.5,
				selectionBorderColor: "#888",
				selectionBorderWidth: 1
			}
		}
	};
	
	var lineStyles = {};
	
	var registerLineStyle = function(style){
		$.cytoscapeweb("renderer", "svg", "linestyle", style.name, style);
		delete style.name;
	};
	
	registerLineStyle({
		name: "solid",
		array: undefined
	});
	
	registerLineStyle({
		name: "dot",
		array: [1, 5]
	});
	
	registerLineStyle({
		name: "longdash",
		array: [10, 2]
	});
	
	registerLineStyle({
		name: "dash",
		array: [5, 5]
	});
	
	var registerEdgeArrowShape = function(shape){
		$.cytoscapeweb("renderer", "svg", "edgearrowshape", shape.name, shape);
		delete shape.name;
	};
	
	registerEdgeArrowShape({
		name: "triangle",
		
		// generate the shape svg
		// the top points towards the node
		svg: function(svg, parent, edge, position, style){
			return svg.polygon(parent, [[0, 1], [0.5, 0], [1, 1]]);
		},
		
		// the point within the 1x1 box to line up with the center point at the
		// end of the edge
		centerPoint: {
			x: 0.5,
			y: 0.5
		}
	});
	
	registerEdgeArrowShape({
		name: "square",
		
		// generate the shape svg
		svg: function(svg, parent, edge, position, style){
			return svg.polygon(parent, [[0, 0], [0, 1], [1, 1], [1, 0]]);
		},
		
		centerPoint: {
			x: 0.5,
			y: 0.5
		}
	});
	
	registerEdgeArrowShape({
		name: "circle",
		
		// generate the shape svg
		svg: function(svg, parent, edge, position, style){
			return svg.circle(parent, 0.5, 0.5, 0.5);
		},
		
		centerPoint: {
			x: 0.5,
			y: 0.5
		}
	});

	registerEdgeArrowShape({
		name: "diamond",
		
		// generate the shape svg
		svg: function(svg, parent, edge, position, style){
			return svg.polygon(parent, [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]]);
		},
		
		centerPoint: {
			x: 0.5,
			y: 0.5
		}
	});

	registerEdgeArrowShape({
		name: "tee",
		
		// generate the shape svg
		svg: function(svg, parent, edge, position, style){
			return svg.rect(parent, 0, 0, 1, 0.5);
		},
		
		centerPoint: {
			x: 0.5,
			y: 0.5
		}
	});
	
	var registerNodeShape = function(shape){
		$.cytoscapeweb("renderer", "svg", "nodeshape", shape.name, shape);
		delete shape.name;
	};
	
	// use this as an example for adding more node shapes
	registerNodeShape({
		// name of the shape
		name: "ellipse",
		
		// generate the shape svg
		svg: function(svg, parent, node, position, style){
			return svg.ellipse(parent, position.x, position.y, style.width, style.height);
		},
		
		// update unique style attributes for this shape
		// see http://keith-wood.name/svgRef.html for api reference
		update: function(svg, parent, node, position, style){
			svg.change(node.renscratch("svg"), {
				cx: position.x,
				cy: position.y,
				rx: style.width / 2,
				ry: style.height / 2
			});
		},
		
		// 2D shape in intersection lib
		intersectionShape: Ellipse
	});
	
	registerNodeShape({
		name: "rectangle",
		svg: function(svg, parent, node, position, style){
			return svg.rect(parent, position.x - style.width/2, position.y - style.height/2, style.width, style.height);
		},
		update: function(svg, parent, node, position, style){
			svg.change(node.renscratch("svg"), {
				x: position.x - style.width/2,
				y: position.y - style.height/2,
				width: style.width,
				height: style.height
			});
		},
		
		intersectionShape: Rectangle
	});
	
	registerNodeShape({
		name: "roundrectangle",
		svg: function(svg, parent, node, position, style){
			return svg.rect(parent, position.x - style.width/2, position.y - style.height/2, style.width, style.height, style.width/4, style.height/4);
		},
		update: function(svg, parent, node, position, style){
			svg.change(node.renscratch("svg"), {
				x: position.x - style.width/2,
				y: position.y - style.height/2,
				width: style.width,
				height: style.height
			});
		},
		
		intersectionShape: Rectangle
	});
	
	registerNodeShape({
		name: "triangle",
		svg: function(svg, parent, node, position, style){
			return svg.polygon(parent,
					           [ 
					             [position.x,                 position.y - style.height/2], 
					             [position.x + style.width/2, position.y + style.height/2],
					             [position.x - style.width/2, position.y + style.height/2]
					           ]);
		},
		update: function(svg, parent, node, position, style){
			svg.change(node.renscratch("svg"), {
				points: [ 
			             [position.x,                 position.y - style.height/2], 
			             [position.x + style.width/2, position.y + style.height/2],
			             [position.x - style.width/2, position.y + style.height/2]
			           ]
			});
		},
		
		intersectionShape: Polygon
	});
	
	function visibility(v){
		if( v != null && typeof v == typeof "" && ( v == "hidden" || v == "visible" ) ){
			return v;
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid visibility", v);
		}
	};
	
	function percent(p){
		if( p != null && typeof p == typeof 1 && !isNaN(p) &&  0 <= p && p <= 1 ){
			return p;
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid percent (should be between 0 and 1)", p);
		}
	}
	
	function color(c){
		if( c != null && typeof c == typeof "" && $.Color(c) != "" ){
			return $.Color(c).toHEX();
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid colour", c);
		}
	}
	
	function number(n){
		if( n != null && typeof n == typeof 1 && !isNaN(n) ){
			return n;
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid number", n);
		}
	}
	
	function nodeShape(name){
		var ret = $.cytoscapeweb("renderer", "svg", "nodeshape", name);
		
		if( ret == null ){
			$$.console.error("SVG renderer does not recognise %s as a valid node shape", name);
		}
		
		return ret;
	}
	
	function lineStyle(name){
		var ret = $.cytoscapeweb("renderer", "svg", "linestyle", name);
		
		if( ret == null ){
			$$.console.error("SVG renderer does not recognise %s as a valid line style", name);
		}
		
		return ret;
	}
	
	function edgeArrowShape(name){
		if( name == "none" || name == null ){
			return null;
		}
		
		return $.cytoscapeweb("renderer", "svg", "edgearrowshape", name);
	}
	
	function labelHalign(a){
		if( a != null && typeof a == typeof "" && ( a == "left" || a == "right" || a == "middle" ) ){
			return a;
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid label horizonal alignment", a);
		}	
	}
	
	function labelValign(a){
		if( a != null && typeof a == typeof "" && ( a == "top" || a == "bottom" || a == "middle" ) ){
			return a;
		} else {
			$$.console.error("SVG renderer does not recognise %o as a valid label vertical alignment", a);
		}	
	}
	
	function cursor(name){
		if( name == "grab" ){
			if( $.browser.webkit ){
				return "-webkit-grab";
			} else if( $.browser.mozilla ){
				return "-moz-grab";
			} else {
				return "move";
			}
		} else if( name == "grabbing" ){
			if( $.browser.webkit ){
				return "-webkit-grabbing";
			} else if( $.browser.mozilla ){
				return "-moz-grabbing";
			} else {
				return "move";
			}
		} else {
			return name;
		}
	}
	
	function SvgRenderer(options){
		$$.console.debug("Creating SVG renderer with options (%o)", options);
		this.options = $.extend({}, defaults, options);
		this.setStyle(options.style);
		this.cy = options.cy;
		
		
		$$.console.debug("SVG renderer is using style (%o)", this.style);
	}
	
	SvgRenderer.prototype.init = function(callback){
		var self = this;
		this.cy = this.options.cy;
		var container = this.cy.container();
		var svg = container.svg('get'); 
		
		this.container = container;
		this.svg = svg;
		
		if( svg != null ){
			container.svg('destroy');
		} 
		
		container.css({
			padding: "0 !important"
		});
		
		container.svg({
			onLoad: function(s){
				
				if( self.scale == null ){
					self.scale = 1;
				}
				if( self.translation == null ){
					self.translation = { x: 0, y: 0 };
				}
				
				container.find("svg").css("overflow", "hidden"); // fixes ie overflow
				
				svg = s;
				self.svg = svg;
				
				self.svg.change();
				
				self.svgBg = svg.rect(0, 0, "100%", "100%", {
					fill: "white", // any arbitrary colour
					opacity: 0 // don't show the bg rect but let it bubble up events
				});
				
				self.edgesGroup = svg.group();
				self.nodesGroup = svg.group();
				self.svgRoot = $(self.nodesGroup).parents("svg:first")[0];
				
				
				self.selectedElements = self.cy.collection();
				self.touchingNodes = self.cy.collection();
				
				self.defs = self.svg.defs();
				
				self.makeBackgroundInteractive();
				
				callback();
			},
			settings: {
				height: "100%",
				width: "100%"
			}
		});
		
	};
	
	SvgRenderer.prototype.offsetFix = function(e){
		var self = this;
		
		// firefox fix :(
		if( e.offsetX == null || e.offsetY == null ){
			e.offsetX = e.clientX - self.cy.container().offset().left;
			e.offsetY = e.clientY - self.cy.container().offset().top;
		}
	};
	
	SvgRenderer.prototype.makeBackgroundInteractive = function(){
		
		var self = this;
		
		var svgDomElement = self.svgRoot;
		var panDelay = self.options.selectionToPanDelay;
		
		self.shiftDown = false;
		$(window).bind("keydown keyup", function(e){
			self.shiftDown = e.shiftKey;
		});
		
		function backgroundIsTarget(e){
			return e.target == svgDomElement 
				|| $(e.target).parents("g:last")[0] == self.edgesGroup
				|| $(e.target)[0] == self.svgBg;
		}
		
		$(svgDomElement).bind("mousedown", function(mousedownEvent){

			// ignore right clicks
			if( mousedownEvent.button != 0 ){
				return;
			}
			
			if( backgroundIsTarget(mousedownEvent) ){
				
				mousedownEvent.preventDefault();
				
				self.offsetFix(mousedownEvent);
				
				var selectionSquare = null;
				var selectionBounds = {};
				
				var panning = true;
				var selecting = true;
				
				if( !self.options.dragToSelect ){
					selecting = false;
				}
				
				if( !self.options.dragToPan ){
					panning = false;
				}
				
				if( panning && selecting ){
					panning = false;
					selecting = true;
				}
				
				var originX = mousedownEvent.pageX;
				var originY = mousedownEvent.pageY;
				
				var selectOriginX = mousedownEvent.offsetX;
				var selectOriginY = mousedownEvent.offsetY;
				var selectDx = 0;
				var selectDy = 0;
				
				var _setPanCursor = false;
				function setPanCursor(){
					if( _setPanCursor ){ return; }
					
					_setPanCursor = true;
					self.svg.change(svgDomElement, {
						cursor: cursor(self.style.global.panCursor)
					});
				}
				
				if( self.options.dragToPan ){
					var panDelayTimeout = setTimeout(function(){
						if( !self.cy.panning() ){
							return;
						}
						
						panning = true;
						selecting = false;
						
					}, panDelay);
				}
				
				var dragHandler = function(dragEvent){
					clearTimeout(panDelayTimeout);
					
					var dx = dragEvent.pageX - originX;
					var dy = dragEvent.pageY - originY;
					
					// new origin each event
					originX = dragEvent.pageX;
					originY = dragEvent.pageY;
					
					selectDx += dx;
					selectDy += dy;
					
					if( panning ){	
						self.translation.x += dx;
						self.translation.y += dy;
						
						setPanCursor();
						
						self.pan(self.translation);
					}
					
					if( selecting ){
						if( selectionSquare == null ){
							selectionSquare = self.svg.rect(selectOriginX, selectOriginY, 0, 0, {
								fill: color(self.style.global.selectionFillColor),
								opacity: percent(self.style.global.selectionOpacity),
								stroke: color(self.style.global.selectionBorderColor),
								strokeWidth: number(self.style.global.selectionBorderWidth)
							});
						} else {
							
							var width = Math.abs(selectDx);
							var height = Math.abs(selectDy);
							var x = selectDx >= 0 ? selectOriginX : selectOriginX + selectDx;
							var y = selectDy >= 0 ? selectOriginY : selectOriginY + selectDy;
							
							selectionBounds = {
								x1: x,
								y1: y,
								x2: x + width,
								y2: y + height
							};
							
							self.svg.change(selectionSquare, {
								x: x,
								y: y,
								width: width,
								height: height
							});
						}
					}
				};
				
				$(window).bind("mousemove", dragHandler);
				
				var endHandler = function(mouseupEvent){
					
					// ignore right clicks
					if( mouseupEvent.type == "mouseup" && mouseupEvent.button != 0 ){
						return;
					}
					
					clearTimeout(panDelayTimeout);
					
					$(window).unbind("mousemove", dragHandler);
	
					$(window).unbind("mouseup", endHandler);
					$(window).unbind("blur", endHandler);
					$(svgDomElement).unbind("mouseup", endHandler);
					
					if( panning ){
						self.svg.change(svgDomElement, {
							cursor: null
						});
					}
					
					if( selecting ){
						if( selectionSquare != null && selectionBounds.x1 != null && !isNaN(selectionBounds.x1) ){
							self.selectElementsFromIntersection(selectionSquare, selectionBounds);
							self.svgRemove(selectionSquare);
						} else if( !self.shiftDown ) {
							self.unselectAll();
						}
					}
					
				};
				
				$(window).bind("mouseup", endHandler);
				$(window).bind("blur", endHandler);
				$(svgDomElement).bind("mouseup", endHandler);
			}
		}).bind("mousewheel", function(e, delta, deltaX, deltaY){
			if( !self.cy.panning() || !self.cy.zooming() ){
				return;
			}
			
			self.offsetFix(e.originalEvent);

			var point = {
				x: e.originalEvent.offsetX,
				y: e.originalEvent.offsetY
			};
			
			var deltaFactor = 0.5;
			
			if( $.browser.mozilla || $.browser.msie ){
				deltaFactor = 0.167;
			}
			
			var zoom = self.zoom() * (1 + deltaY * deltaFactor);
			
			self.zoomAboutPoint(point, zoom);
			self.cy.trigger("zoom");
			self.cy.trigger("pan");
			
			e.preventDefault();
		});
		
		// touch functions (& touch support)
		//       |
		//       v
		
		function point(e, i){
			var x, y;
			var offset = self.cy.container().offset();
			var touches = e.originalEvent.touches;
			var touch = touches[ i ];
			
			x = touch.pageX - offset.left;
			y = touch.pageY - offset.top;
			
			return { x: x, y: y };
		}
		
		function centerPoint(e){
			var p1 = point(e, 0);
			var p2 = point(e, 1);
			
			return {
				x: (p1.x + p2.x)/2,
				y: (p1.y + p2.y)/2
			};
		}
		
		function distance(e){
			var p1 = point(e, 0);
			var p2 = point(e, 1);
			
			return self.getDistance(p1, p2);
		}
		
		function numEventPoints(e){
			return e.originalEvent.touches == null ? 0 : e.originalEvent.touches.length;
		}
		
		function pointsAtLeast(e, n){
			return numEventPoints(e) >= n;
		}
		
		function fingers(n){
			if( n >= 2 ){
				twoFingers = true;
				inTwoFingerDelay = true;
				
				clearTimeout(twoFingersTimeout);
				twoFingersTimeout = setTimeout(function(){
					inTwoFingerDelay = false;
				}, delayFrom2FingersTo1);
			} else {
				twoFingers = false;
			}
		}
		
		var delayFrom2FingersTo1 = 100;
		var twoFingers = false;
		var inTwoFingerDelay = false;
		var twoFingersTimeout = null;
		var touchendUnselects = true;
		var center, modelCenter, distance1, point11, point12, point21, point22, movedAfterTouchStart;
		$(svgDomElement).bind("touchstart", function(tsEvent){
			if( !backgroundIsTarget(tsEvent) || self.touchingNodes.size() > 0 ){
				return;	
			}
			
			tsEvent.preventDefault();
			point11 = point(tsEvent, 0);
			
			if( pointsAtLeast(tsEvent, 2) ){
				center = centerPoint(tsEvent);
				modelCenter = self.modelPoint(center);
				distance1 = distance(tsEvent);
				point12 = point(tsEvent, 1);
				fingers(2);
			} else {
				fingers(1);
				touchendUnselects = true;
			}
			
			movedAfterTouchStart = false;
			
		}).bind("touchmove", function(tmEvent){
			if( !backgroundIsTarget(tmEvent) || self.touchingNodes.size() > 0 ){
				return;	
			}
			
			touchendUnselects = false;
			
			if( pointsAtLeast(tmEvent, 2) ){
				fingers(2);
				point22 = point(tmEvent, 1);
			} else {
				fingers(1);
			}
			
			tmEvent.preventDefault();

			var translation = {
				x: 0,
				y: 0
			};
			
			if( pointsAtLeast(tmEvent, 1) && self.cy.panning() ){
				point21 = point(tmEvent, 0);
				
				if( pointsAtLeast(tmEvent, 2) && self.cy.zooming() ){
					var distance2 = distance(tmEvent);
					//center = self.renderedPoint(modelCenter);
					var factor = distance2 / distance1;
					center = self.renderedPoint(modelCenter);
					
					if( factor != 1 ){
						var speed = 1.5;
						
						// delta finger 1
						var d1 = {
							x: point21.x - point11.x,
							y: point21.y - point11.y
						};
						
						// delta finger 2
						var d2 = {
							x: point22.x - point12.x,
							y: point22.y - point12.y
						};
						
						// translation is the normalised vector of the two fingers movement
						// i.e. so pinching cancels out and moving together pans
						translation = {
							x: (d1.x + d2.x) / 2,
							y: (d1.y + d2.y) / 2
						};
						
						if( factor > 1 ){
							factor = (factor - 1) * speed + 1;
						} else {
							factor = 1 - (1 - factor) * speed;
						}
						
						var zoom = self.zoom() * factor;
						
						self.zoomAboutPoint(center, zoom, translation);
						distance1 = distance2;
					}
				} else if( !inTwoFingerDelay ){
					translation = {
						x: point21.x - point11.x,
						y: point21.y - point11.y
					};
					
					self.panBy(translation);
				}
				
				point11 = point21;
				point12 = point22;
			}
		}).bind("touchend", function(teEvent){
			if( touchendUnselects && backgroundIsTarget(teEvent) ){
				self.unselectAll();
			}
		});
		
		$(svgDomElement).bind("mousedown mouseup click mouseover mouseout mousemove touchstart touchmove touchend", function(e){
			
			// only pass along if bg is the target: when an element gets an event, it automatically bubbles up to
			// core and bg via the core (CyElement) logic
			if( backgroundIsTarget(e) ){
				var event = $.extend({}, e, { cyTarget: self.cy });
				self.cy.background().trigger(event);
				self.cy.trigger(event);
			}
		});
		
	};
	
	SvgRenderer.prototype.zoomAboutPoint = function(point, zoom, translation){
		var self = this;
		var cy = self.cy;
		
		if( !cy.panning() || !cy.zooming() ){
			return;
		}
		
		var pan1 = self.pan();
		var zoom1 = self.zoom();
		var zoom2 = zoom;
		
		if( translation == null ){
			translation = {
				x: 0,
				y: 0
			};
		}
		
		var pan2 = {
			x: -zoom2/zoom1 * (point.x - pan1.x - translation.x) + point.x,
			y: -zoom2/zoom1 * (point.y - pan1.y - translation.y) + point.y
		};
		
		self.transform({
			translation: pan2,
			scale: zoom2
		});
	};
	
	SvgRenderer.prototype.zoom = function(scale){
		
		var cy = this.cy;
		
		if( !cy.zooming() ){
			return;
		}
		
		if( scale === undefined ){
			return this.scale;
		} else if( typeof scale == typeof {} ){
			var options = scale;
			var rposition;
			
			if( options.position !== undefined ){
				rposition = this.renderedPoint(options.position);
			} else {
				rposition = options.renderedPosition;
			}
			
			if( rposition !== undefined ){
				this.zoomAboutPoint(rposition, scale.level);
			} else {
				this.transform({
					scale: options.level
				});
			}
			
		} else {
			this.transform({
				scale: scale
			});
		} 

	};
	
	SvgRenderer.prototype.fit = function(params){
		var elements = params.elements;
		var zoom = params.zoom;
		var cy = this.cy;
		
		if( !cy.panning() || (zoom !== undefined && !cy.zooming()) ){
			return;
		}
		
		if( elements == null || elements.size() == 0 ){
			elements = this.cy.elements();
		}
		
		if( elements.is(":removed") ){
			$$.console.debug("SVG renderer does not take into account removed elements when fitting");
			elements = elements.filter(":inside");
		}
		
		$$.console.debug("Fit SVG renderer to view bounds");
		
		var n = this.nodesGroup.getBBox();
		//var e = this.edgesGroup.getBBox();
		
		var x1, y1, x2, y2;
		
		function update(bb){
			if( bb.height == 0 || bb.width == 0 ){ return; }

			var left = bb.x;
			var right = left + bb.width;
			var top = bb.y;
			var bottom = top + bb.height;
			
			if( left < x1 || x1 == null ){
				x1 = left;
			}
			
			if( right > x2 || x2 == null ){
				x2 = right;
			}
			
			if( top < y1 || y1 == null ){
				y1 = top;
			}
			
			if( bottom > y2 || y2 == null ){
				y2 = bottom;
			}
		}

		elements.nodes().each(function(){
			var bb = this.renscratch("svg").getBBox();
			var bbLabel = this.renscratch("svgLabel").getBBox();

			update(bb);
			update(bbLabel);
		});

		// fix for loop edges (their bounding boxes are approx 2x width and height of path
		// they push the bb up and left
		elements.edges().each(function(){
			var src = this.source().id();
			var tgt = this.target().id();
			var loopFactor = lf = 0.4;
			
			if( src == tgt ){
				var bb = this.renscratch("svg").getBBox();
				bb.x2 = bb.x + bb.width;
				bb.y2 = bb.y + bb.height;
				bb.x1 = bb.x;
				bb.y1 = bb.y;

				var bbAdjusted = {};
				bbAdjusted.x = bb.x1 + bb.width * lf;
				bbAdjusted.y = bb.y1 + bb.height * lf;
				bbAdjusted.width = bb.x2 - bbAdjusted.x;
				bbAdjusted.height = bb.y2 - bbAdjusted.y;

				var bbLabel = this.renscratch("svgLabel").getBBox();

				update(bbAdjusted);
				update(bbLabel);
			} else {
				var bb = this.renscratch("svg").getBBox();
				var bbLabel = this.renscratch("svgLabel").getBBox();

				update(bb);
				update(bbLabel);
			}
		});
		
		var w = x2 - x1;
		var h = y2 - y1;

		var width = this.cy.container().width();
		var height = this.cy.container().height();
		
		var scale = Math.min( width/w, height/h );
		
		if( zoom ){
			this.transform({
				translation: {
					x: -x1 * scale - (w*scale - width)/2,
					y: -y1 * scale - (h*scale - height)/2
				},
				scale: scale
			});
		} else {
			var z = this.scale;
			
			this.transform({
				translation: {
					x: -x1*z + width/2 - (x2-x1)/2*z,
					y: -y1*z + height/2 - (y2-y1)/2*z
				}
			});
		}
		
	};
	
	SvgRenderer.prototype.panBy = function(position){
		if( !this.cy.panning() ){
			return;
		}
		
		$$.console.debug("Relatively pan SVG renderer with position (%o)", position);
		
		this.transform({
			translation: {
				x: this.translation.x + number(position.x),
				y: this.translation.y + number(position.y)
			}
		});
	};
	
	SvgRenderer.prototype.pan = function(position){
		if( !this.cy.panning() ){
			return;
		}
		
		$$.console.debug("Pan SVG renderer with position (%o)", position);
		
		if( position === undefined ){
			return {
				x: this.translation.x,
				y: this.translation.y
			};
		}
		
		if( position == null || typeof position != typeof {} ){
			$$.console.error("You can not pan without specifying a proper position object; `%o` is invalid", position);
			return;
		}
		
		this.transform({
			translation: {
				x: number(position.x),
				y: number(position.y)
			}
		});
	};
	
	SvgRenderer.prototype.capTransformation = function(params){
		var translation = params.translation;
		var scale = params.scale;
		var self = this;
		
		var maxScale = self.options.maxZoom;
		var minScale = self.options.minZoom;
		var minTranslation = self.options.minPan;
		var maxTranslation = self.options.maxPan;
		var validScale = true;
		var validTranslation = true;
		
		if( translation != null ){
			if( translation.x < minTranslation ){
				translation.x = minTranslation;
				validTranslation = false;
			} else if( translation.x > maxTranslation ){
				translation.x = maxTranslation;
				validTranslation = false;
			}
			
			if( translation.y < minTranslation ){
				translation.y = minTranslation;
				validTranslation = false;
			} else if( translation.y > maxTranslation ){
				translation.y = maxTranslation;
				validTranslation = false;
			}

		} else {
			translation = self.translation;
		}
		
		if( scale != null ){
			if( scale > maxScale ){
				scale = maxScale;
				validScale = false;
			} else if( scale < minScale ){
				scale = minScale;
				validScale = false;
			}
		} else {
			scale = self.scale;
		}
		
		return {
			scale: scale,
			translation: translation,
			valid: validScale && validTranslation,
			validScale: validScale,
			validTranslation: validTranslation
		};
	};
	
	SvgRenderer.prototype.transform = function(params){
		var self = this;
		
		var capped = self.capTransformation(params);
		
		if( capped.valid ){
			self.translation = capped.translation;
			self.scale = capped.scale;
		} else {
		
			if( params.capScale ){
				$$.console.debug("Capping zoom level %o to %o", self.scale, capped.scale);
				self.scale = capped.scale;
			}
			
			if( params.capTranslation ){
				$$.console.debug("Capping translation %o to %o", self.translation, capped.translation);
				self.translation = capped.translation;
			}
		}
		
		function transform(svgElement){
			if( self.svg == null || svgElement == null ){
				return;
			}
			
			self.svg.change(svgElement, {
				transform: "translate(" + self.translation.x + "," + self.translation.y + ") scale(" + self.scale + ")"
			});
		}
		
		transform(self.nodesGroup);
		transform(self.edgesGroup);
	};
	
	SvgRenderer.prototype.calculateStyleField = function(element, fieldName){
		var self = this;
		var styleCalculator = self.options.styleCalculator;
		var selectors = self.style.selectors;
		
		var field = undefined;
		var bypassField = element.bypass(false)[fieldName];
		
		if( bypassField !== undefined ){
			field = bypassField;
		} else {
			$.each(selectors, function(selector, selStyle){
				var selField = selStyle[fieldName];
				
				if( selField != null && element.is(selector) ){
					field = selField;
				}
			});
		}
		
		return styleCalculator.calculate(element, field);
	};
	
	SvgRenderer.prototype.calculateStyle = function(element){
		var self = this;
		var styleCalculator = self.options.styleCalculator;
		var selectors = self.style.selectors;
		var style = {};
		
		// iteratively set style based on matching selectors
		$.each(selectors, function(selector, selStyle){
			if( element.is(selector) ){
				style = $.extend(style, selStyle);
			}
		});
		
		// apply the bypass
		style = $.extend(style, element.bypass(false));
		
		// compute the individual values (i.e. flatten mappers to actual values)
		$.each(style, function(styleName, styleVal){
			style[styleName] = styleCalculator.calculate(element, styleVal);
		});
		
		// assign to computed style field
		element._private.style = style;
		
		if( element.isEdge() ){
			var source = element.source();
			var target = element.target();
			
			function calculateVisibility(){
				if( source.style("visibility") == "visible" && target.style("visibility") == "visible" ){
					return visibility(style.visibility);
				} else {
					return "hidden";
				}
			}
			
			style.visibility = calculateVisibility();
		}
		
		return style;
	};
	
	SvgRenderer.prototype.svgRemove = function(svg){
		var $svg = $(svg);
		var $container = $(this.svgRoot);
		
		function svgIsInCy( svgDomElement ){
			var $ele = $(svgDomElement);
			var inside = false;
			
			if( $ele.parent().size() == 0 ){
				return false; // more efficient :)
			}
			
			$ele.parents().each(function(){
				if( this == $container[0] ){
					inside = true;
				}
			});
			
			return inside;
		}
		
		if( svg == null || !svgIsInCy(svg) ){
			return;
		}
		
		this.svg.remove( svg );
	};
	
	SvgRenderer.prototype.updateNodePositionFromShape = function(element){
		var style = element.style(false);
		var parent = element.renscratch("svgGroup");
		var position = element.position(false);
		
		nodeShape(style.shape).update(this.svg, parent, element, position, style);
	};
	
	SvgRenderer.prototype.makeSvgEdgeInteractive = function(element){
		var svgDomElement = element.renscratch("svg");
		var targetArrow = element.renscratch("svgTargetArrow");
		var sourceArrow = element.renscratch("svgSourceArrow");
		var svgCanvas = $(svgDomElement).parents("svg:first")[0];
		var self = this;
		
		$(svgDomElement).add(targetArrow).add(sourceArrow).bind("mouseup mousedown click touchstart touchmove touchend mouseover mousemove mouseout", function(e){
			if( self.edgeEventIsValid(element, e) ){
				element.trigger(e);
			}
		}).bind("click touchend", function(e){
			self.selectElement(element);
		});
	};
	
	SvgRenderer.prototype.makeSvgNodeLabelInteractive = function(element){
	};
	

	SvgRenderer.prototype.makeSvgNodeInteractive = function(element){
		var svgDomElement = element.renscratch("svg");
		var svgCanvas = $(svgDomElement).parents("svg:first")[0];
		var self = this;
		var draggedAfterMouseDown = null;
		
		// you need to prevent default event handling to 
		// prevent built-in browser drag-and-drop etc
		
		$(svgDomElement).bind("mousedown touchstart", function(mousedownEvent){
			draggedAfterMouseDown = false;
			
			element.trigger(mousedownEvent);
			
			if( element.grabbed() || element.locked() || !element.grabbable() ){
				mousedownEvent.preventDefault();
				return;
			}
			
			if( mousedownEvent.type == "touchstart" && mousedownEvent.originalEvent.touches.length > 1 ){
				return;
			}
			 
			element._private.grabbed = true;
			element.trigger($.extend({}, mousedownEvent, { type: "grab" }));
			self.touchingNodes = self.touchingNodes.add(element);
			
			var originX, originY;
			
			if( mousedownEvent.type == "touchstart" ){
				var touches = mousedownEvent.originalEvent.touches;
				var touch = touches[touches.length - 1];
				
				originX = touch.pageX;
				originY = touch.pageY;
			} else {
				originX = mousedownEvent.pageX;
				originY = mousedownEvent.pageY;
			}
			
			var elements;
				
			if( element.selected() ){
				elements = self.selectedElements.add(element).filter(":grabbable");
			} else {
				elements = element.collection();
			}

			var justStartedDragging = true;
			var dragHandler = function(dragEvent){
				
				draggedAfterMouseDown = true;
				
				var dragX, dragY;
				
				if( dragEvent.type == "touchmove" ){
					var touches = mousedownEvent.originalEvent.touches;
					var touch = touches[touches.length - 1];
					
					dragX = touch.pageX;
					dragY = touch.pageY;
				} else {
					dragX = dragEvent.pageX;
					dragY = dragEvent.pageY;
				}
				
				var dx = (dragX - originX) / self.zoom();
				var dy = (dragY - originY) / self.zoom();
				
				// new origin each event
				originX = dragX;
				originY = dragY;
				
				elements.each(function(i, e){
					e.element()._private.position.x += dx;
					e.element()._private.position.y += dy;
				});			
				
				self.updatePosition( elements );
				
				if( justStartedDragging ){
					
					// TODO we should be able to do this on iOS too
					if( dragEvent.type != "touchmove" ){
						self.moveToFront(element);
					}
					
					justStartedDragging = false;
					
				} else {
					element.trigger($.extend({}, dragEvent, { type: "position" }));
					element.trigger($.extend({}, dragEvent, { type: "drag" }));
				}
				
				
			};
			
			$(window).bind("mousemove touchmove", dragHandler);
			
			var finishedDragging = false;
			var touchEndCount = 0;
			var endHandler = function(mouseupEvent){
				if( mouseupEvent.type == "touchend" && mouseupEvent.originalEvent.touches.length != 0 ){
					return;
				}
				
				if( !finishedDragging ){
					finishedDragging = true;
				} else {
					return;
				}
				
				$(window).unbind("mousemove touchmove", dragHandler);

				$(window).unbind("mouseup touchend blur", endHandler);
				$(svgDomElement).unbind("mouseup touchend", endHandler);
				
				element._private.grabbed = false;
				self.touchingNodes = self.touchingNodes.not(element);
				
				element.trigger($.extend({}, mouseupEvent, { type: "free" }));
			};
			
			$(window).bind("mouseup touchend blur", endHandler);
			$(svgDomElement).bind("mouseup touchend", endHandler);
			
			mousedownEvent.preventDefault();
		}).bind("mouseup touchend", function(e){
			element.trigger($.extend({}, e));
			
			if( draggedAfterMouseDown == false ){
				draggedAfterMouseDown = null;
				element.trigger($.extend({}, e, { type: "click" }));
				self.selectElement(element);
			}
		}).bind("mouseover mouseout mousemove", function(e){
			// ignore events created falsely for recreated elements
			if( self.nodeEventIsValid(element, e) ){
				element.trigger($.extend({}, e));
			}
		});
		
	};
	

	SvgRenderer.prototype.edgeEventIsValid = function(element, event){
		var $rt = $(event.relatedTarget);
		var self = this;
		
		switch( event.type ){
		case "mouseover":
		case "mouseout":
			return $rt.parent().parent().size() > 0; // don't count when elements were removed
		default:
			return true;
		}		
	};
	
	SvgRenderer.prototype.nodeEventIsValid = function(element, event){
		var $rt = $(event.relatedTarget);
		var self = this;

		switch( event.type ){
		case "mouseover":
		case "mouseout":
			return $rt.parent().parent().size() > 0; // don't count when elements were removed
		default:
			return true;
		}		
	};
	
	SvgRenderer.prototype.modelPoint = function(screenPoint){
		var self = this;
		var mpos = {};

		if( screenPoint.x !== undefined ){
			mpos.x = (screenPoint.x - self.pan().x) / self.zoom();
		}
		
		if( screenPoint.y !== undefined ){
			mpos.y = (screenPoint.y - self.pan().y) / self.zoom();
		}
		
		return mpos;
	};
	
	SvgRenderer.prototype.renderedPoint = function(modelPoint){
		var self = this;
		var rpos = {};
		
		if( modelPoint.x !== undefined ){
			rpos.x = modelPoint.x * self.zoom() + self.pan().x;
		}
		
		if( modelPoint.y !== undefined ){
			rpos.y = modelPoint.y * self.zoom() + self.pan().y;
		}
		
		return rpos;
	};
	
	SvgRenderer.prototype.renderedPosition = function(element){
		var self = this;
		
		return self.renderedPoint( element.position(false) );
	};
	
	SvgRenderer.prototype.hideElements = function(collection){
		collection.each(function(i, element){
			element.bypass(false).visibility = "hidden";
		});
		
		this.updateBypass(collection);
	};
	
	SvgRenderer.prototype.showElements = function(collection){
		var self = this;
		var updated = this.cy.collection();
		
		collection.each(function(i, element){
			element.bypass(false).visibility = "visible";
		});
		
		this.updateBypass(collection);
	};
	
	SvgRenderer.prototype.elementIsVisible = function(element){
		return element.style(false).visibility != "hidden";
	};
	
	SvgRenderer.prototype.renderedStyle = function(element){
		var self = this;
		var style = element.style();
		var fields = ["width", "height", "borderWidth", "labelOutlineWidth"];

		$.each(fields, function(i, field){
			if( style[field] != null ){
				style[field] = style[field] * self.zoom();
			}
		});

		return style;
	};
	
	SvgRenderer.prototype.unselectElements = function(collection){
		collection = collection.collection();
		
		collection.unselect();
		this.selectedElements = this.selectedElements.not(collection);
	};
	
	// by drag select
	SvgRenderer.prototype.selectElementsFromIntersection = function(svgSelectionShape, selectionBounds){
		var self = this;
		var toSelect = this.cy.collection();
		var toUnselect = this.cy.collection();
		
		function nodeInside(element){

			if( !self.elementIsVisible(element) ){
				return false;
			}
			
			// intersect rectangle in the model with the actual node shape in the model
			var shape = nodeShape( element.style("shape") ).intersectionShape;
			var modelRectangleP1 = self.modelPoint({ x: selectionBounds.x1, y: selectionBounds.y1 });
			var modelRectangleP2 = self.modelPoint({ x: selectionBounds.x2, y: selectionBounds.y2 });
			var modelRectangle = self.svg.rect(modelRectangleP1.x, modelRectangleP1.y, modelRectangleP2.x - modelRectangleP1.x, modelRectangleP2.y - modelRectangleP1.y);
			var intersection = Intersection.intersectShapes(new Rectangle(modelRectangle), new shape( element.renscratch("svg") ));
			self.svgRemove(modelRectangle);
			
			// rendered node
			var zoom = self.zoom();
			var x = element.renderedPosition().x;
			var y = element.renderedPosition().y;
			var w = element.renderedStyle().width + element.style("borderWidth") * zoom;
			var h = element.renderedStyle().height + element.style("borderWidth") * zoom;
			
			// rendered selection square
			var x1 = selectionBounds.x1;
			var y1 = selectionBounds.y1;
			var x2 = selectionBounds.x2;
			var y2 = selectionBounds.y2;
			
			var centerPointInside = x1 <= x && x <= x2 && y1 <= y && y <= y2;
			var intersects = intersection.points.length > 0;
			
			return centerPointInside || intersects;
		}
		
		this.cy.elements().each(function(i, element){
			if( element.isNode() ){
				if( nodeInside(element) ){
					toSelect = toSelect.add(element);
				}
			} else {
				// if both node center points are inside, then the edge is inside
				if( self.elementIsVisible(element) &&
					nodeInside( element.source() ) &&
					nodeInside( element.target() ) ){
					
					toSelect = toSelect.add(element);
				}
				
			}
		});
		
		if( !self.shiftDown ){
			toUnselect = toUnselect.add(
				this.cy.elements().filter(function(i, e){
					return e.selected() && !toSelect.allSame(e);
				})
			);
		}
		
		toUnselect.unselect();
		toSelect.select();
		
		self.selectedElements = self.selectedElements.not(toUnselect);
		self.selectedElements = self.selectedElements.add(toSelect);
		
		// TODO do we need this?
		//self.moveToFront(toSelect.nodes());
		
	};
	
	// by clicking
	SvgRenderer.prototype.selectElement = function(element){
		var self = this;
		
		var toUnselect = self.cy.collection();
		var toSelect = self.cy.collection();
		
		if( !self.shiftDown ){
			toUnselect = toUnselect.add(
				self.cy.elements().filter(function(i, e){
					return e.selected() && !element.same(e);
				})
			);
		}
		
		if( self.shiftDown ){
			if( element.selected() ){
				toUnselect = toUnselect.add(element);
			} else {
				toSelect = toSelect.add(element);
			}
		} else if( !element.selected() ){
			toSelect = toSelect.add(element);
		}
		
		toUnselect.unselect();
		toSelect.select();
		
		self.selectedElements = self.selectedElements.not(toUnselect);
		self.selectedElements = self.selectedElements.add(toSelect);
		self.moveToFront(toSelect);
	};
	
	SvgRenderer.prototype.moveToFront = function(collection){
		collection = collection.collection();
		var self = this;
		
		collection.each(function(i, element){
			self.svgRemove( element.renscratch("svgGroup") );
			self.makeSvgElement(element);
			self.updatePosition( collection.closedNeighborhood().edges() );
		});
	};
	
	SvgRenderer.prototype.unselectAll = function(){
		this.unselectElements(this.cy.elements());
	};
	
	SvgRenderer.prototype.makeSvgNode = function(element){		
		var p = element.position(false);
		var self = this;
		
		if( p.x == null || p.y == null ){
			$$.console.debug("SVG renderer is ignoring creating of node `%s` with position (%o, %o)", element.id(), p.x, p.y);
			return;
		}
		
		var svgDomElement;
		var style = this.calculateStyle(element);
		
		var svgDomGroup = this.svg.group(this.nodesGroup);
		element.renscratch("svgGroup", svgDomGroup);
		
		svgDomElement = nodeShape(style.shape).svg(this.svg, svgDomGroup, element, p, style);
		element.renscratch("svg", svgDomElement);
		this.makeSvgNodeLabel(element);
		
		element.renscratch("svg", svgDomElement);
		$$.console.debug("SVG renderer made node `%s` with position (%i, %i)", element.id(), p.x, p.y);
		
		this.makeSvgNodeInteractive(element);
		this.updateElementStyle(element, style);
		return svgDomElement;
	};
	
	SvgRenderer.prototype.makeSvgNodeLabel = function(element){
		var self = this;
		
		var x = element.position("x");
		var y = element.position("y");
		
		element.renscratch().svgLabelGroup = self.svg.group(element.renscratch().svgGroup);
		element.renscratch().svgLabelOutline = self.svg.text(element.renscratch().svgLabelGroup, x, y, "label init");
		element.renscratch().svgLabel = self.svg.text(element.renscratch().svgLabelGroup, x, y, "label init");
	};
	
	SvgRenderer.prototype.positionSvgNodeLabel = function(element){
		var self = this;

		var x = element.position("x");
		var y = element.position("y");
		
		self.svg.change(element.renscratch().svgLabel, {
			x: x,
			y: y
		});
		
		self.svg.change(element.renscratch().svgLabelOutline, {
			x: x,
			y: y
		});
	};
	
	SvgRenderer.prototype.makeSvgEdgePath = function(element){
		var self = this;
		var tgt = element.target();
		var src = element.source();
		var loop = tgt.data("id") == src.data("id");
		var svgPath;
		
		var x1 = src.position("x");
		var y1 = src.position("y");
		var x2 = tgt.position("x");
		var y2 = tgt.position("y");
		
		// if the nodes are directly on top of each other, just make a small difference
		// so we don't get bad calculation states (e.g. divide by zero)
		if( x1 == x2 && y1 == y2 ){
			x2++;
			y2++;
		}
		
		var parallelEdges = element.parallelEdges();
		var size = parallelEdges.size();
		var index;
		var curveIndex;
		var curveDistance = 20;
		var betweenLoopsDistance = 20;
		var cp, cp1, cp2;
		var pDistance = self.getDistance({ x: x1, y: y1 }, { x: x2, y: y2 });
		var maxCurveDistance = 200;
		
		if( !loop && curved ){
			curveDistance = Math.min(20 + 4000/pDistance, maxCurveDistance);
		}
	
		parallelEdges.each(function(i, e){
			if( e == element ){
				index = i;
			}
		});
		
		function makePath(){
			var curved = curveIndex != 0;
			var path = self.svg.createPath();
			
			if( svgPath != null ){
				self.svgRemove(svgPath);
			}
			
			if( loop ){
				svgPath = self.svg.path( element.renscratch("svgGroup"), path.move(x1, y1).curveC(cp1.x, cp1.y, cp2.x, cp2.y, x2, y2) );
			} else if( curved ){
				svgPath = self.svg.path( element.renscratch("svgGroup"), path.move(x1, y1).curveQ(cp.x, cp.y, x2, y2) );
			} else {
				svgPath = self.svg.path( element.renscratch("svgGroup"), path.move(x1, y1).line(x2, y2) );
			}
		}
		
		if( loop ){
			var sh = src.style("height");
			var sw = src.style("width");
			curveDistance += Math.max(sw, sh);
			
			curveIndex = index;
			curveDistance += betweenLoopsDistance * (curveIndex);
			
			var h = curveDistance;
	        cp1 = { x: x1, y: y1 - sh/2 - h };
	        cp2 = { x: x1 - sw/2 - h, y: y1 };
			
			makePath();
		} else {
			// edge between 2 nodes
			
			var even = size % 2 == 0;
			if( even ){
				// even
				curveIndex = index - size/2 + (index < size/2 ? 0 : 1); // add one if on positive size (skip 0)
				
				if( curveIndex > 0 ){
					curveIndex -= 0.5;
				} else {
					curveIndex += 0.5;
				}
			} else {
				// odd
				curveIndex = index - Math.floor(size/2);
			}
			
			var curved = curveIndex != 0;
			
			if( src.id() > tgt.id() ){
				curveIndex *= -1;
			}
			
			if(curved){
				cp = cp1 = cp2 = self.getOrthogonalPoint({ x: x1, y: y1 }, { x: x2, y: y2 }, curveDistance * curveIndex);
			} else {
				cp = cp1 = {
					x: x2,
					y: y2
				};
				
				cp2 = {
					x: x1,
					y: y1
				};
			}
			
			makePath();
		}
		
		var edgeWidth = self.calculateStyleField(element, "width");
		var targetShape = self.calculateStyleField(tgt, "shape");
		var sourceShape = self.calculateStyleField(src, "shape");
		var targetArrowShape = self.calculateStyleField(element, "targetArrowShape");
		var sourceArrowShape = self.calculateStyleField(element, "sourceArrowShape");
		var markerFactor = 3;
		var minArrowSize = 10;
		
		while(markerFactor * edgeWidth < minArrowSize){
			markerFactor++;
		}
		
		var f = markerFactor;
		var markerHeight = f * edgeWidth;
		var targetShape = nodeShape(targetShape).intersectionShape;
		var sourceShape = nodeShape(sourceShape).intersectionShape;
		
		var intersection = Intersection.intersectShapes(new Path(svgPath), new targetShape( tgt.renscratch("svg") ));
		var tgtInt = intersection.points[ intersection.points.length - 1 ];
		
		intersection = Intersection.intersectShapes(new Path(svgPath), new sourceShape( src.renscratch("svg") ));
		var srcInt = intersection.points[0];
		
		var scale = f * edgeWidth;
		var sourceRotation = -1*(this.getAngle(cp1, { x: x1, y: y1 }) - 90);
		var targetRotation = -1*(this.getAngle(cp2, { x: x2, y: y2 }) - 90);
		
		if( tgtInt != null ){
			if( targetArrowShape != "none" ){
				var end = self.getPointAlong(tgtInt, cp2, markerHeight/2, tgtInt);
				x2 = end.x;
				y2 = end.y;
			} else if( tgtInt != null ){
				x2 = tgtInt.x;
				y2 = tgtInt.y;
			}
		}
		
		if( srcInt != null ){
			if( sourceArrowShape != "none" ){
				var start = self.getPointAlong(srcInt, cp1, markerHeight/2, srcInt);
				x1 = start.x;
				y1 = start.y;
			} else {
				x1 = srcInt.x;
				y1 = srcInt.y;
			}
		}
		
		makePath();
		
		if( element.renscratch("svgTargetArrow") != null ){
			this.svgRemove( element.renscratch("svgTargetArrow") );
		}
		
		if( targetArrowShape != "none" ){
			var tgtShapeObj = edgeArrowShape(targetArrowShape);
			var tgtArrowTranslation = {
				x: x2 - tgtShapeObj.centerPoint.x * scale,
				y: y2 - tgtShapeObj.centerPoint.y * scale,
			};
			var targetCenter = tgtShapeObj.centerPoint;
			var targetArrow = tgtShapeObj == null ? null : tgtShapeObj.svg( this.svg, element.renscratch("svgGroup"), element, element.position(false), element.style(false) );
			element.renscratch("svgTargetArrow", targetArrow);

			this.svg.change(targetArrow, {
				transform: "translate(" + tgtArrowTranslation.x + " " + tgtArrowTranslation.y + ") scale(" + scale + ") rotate(" + targetRotation + " " + targetCenter.x + " " + targetCenter.y + ")"
			});
		}
		
		if( element.renscratch("svgSourceArrow") != null ){
			this.svgRemove( element.renscratch("svgSourceArrow") );
		}
		
		if( sourceArrowShape != "none" ){		
			var srcShapeObj = edgeArrowShape(sourceArrowShape);
			var srcArrowTranslation = {
				x: x1 - srcShapeObj.centerPoint.x * scale,
				y: y1 - srcShapeObj.centerPoint.y * scale,
			};
			var sourceCenter = srcShapeObj.centerPoint;
			var sourceArrow = srcShapeObj == null ? null : srcShapeObj.svg(this.svg, element.renscratch("svgGroup"), element, element.position(false), element.style(false) );
			element.renscratch().svgSourceArrow = sourceArrow;
			
			this.svg.change(sourceArrow, {
				transform: "translate(" + srcArrowTranslation.x + " " + srcArrowTranslation.y + ") scale(" + scale + ") rotate(" + sourceRotation + " " + sourceCenter.x + " " + sourceCenter.y + ")"
			});
		}
		
		var labelPosition;
		if( loop ){
			labelPosition = {
				x: (cp1.x + cp2.x)/2*0.85 + tgt.position("x")*0.15,
				y: (cp1.y + cp2.y)/2*0.85 + tgt.position("y")*0.15
			};
		} else if( curved ) {
			labelPosition = {
				x: ( cp.x + (x1+x2)/2 )/2,
				y: ( cp.y + (y1+y2)/2 )/2
			};
		} else {
			labelPosition = {
				x: (x1 + x2)/2,
				y: (y1 + y2)/2
			};
		}
		
		element.renscratch("svgLabelGroup", self.svg.group(element.renscratch().svgGroup) );
		element.renscratch("svgLabelOutline", self.svg.text(element.renscratch().svgLabelGroup, labelPosition.x, labelPosition.y, "label init") );
		element.renscratch("svgLabel", self.svg.text(element.renscratch().svgLabelGroup, labelPosition.x, labelPosition.y, "label init") );
		
		element.renscratch().svg = svgPath;
		return svgPath;
	};
	
	
	SvgRenderer.prototype.markerDrawFix = function(){
		this.forceRedraw();
	};
	
	window.redraw = SvgRenderer.prototype.forceRedraw = function(){
		this.svg.change(this.svgRoot, {
			opacity: 0
		});
		
		this.svg.change(this.svgRoot, {
			opacity: Math.random()
		});
		
		this.svg.change(this.svgRoot, {
			opacity: 1
		});
		
		var rect = this.svg.rect(0, 0, this.cy.container().width(), this.cy.container().height());
		this.svgRemove(rect);
	};
	
	SvgRenderer.prototype.getAngle = function(p1, p2){
		var rad2deg = function(rad){
			return rad * 180/Math.PI;
		};
		
		var h = this.getDistance(p1, p2);
		var dx = p2.x - p1.x;
		var dy = -1*(p2.y - p1.y);
		var acos = rad2deg( Math.acos( dx/h ) );
		
		if( dy < 0 ){
			return 360 - acos;
		} else {
			return acos;
		}

	};
	
	SvgRenderer.prototype.getOrthogonalPoint = function(p1, p2, h){
		var diff = { x: p1.x-p2.x, y: p1.y-p2.y };
	    var normal = this.getNormalizedPoint({ x: diff.y, y: -diff.x }, 1);
	    
	    var mid = { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
	    
	    return {x: mid.x + normal.x * h, y: mid.y + normal.y * h};
	};
	
	SvgRenderer.prototype.getPointAlong = function(p1, p2, h, p0){
		var slope = { x: p2.x-p1.x, y: p2.y-p1.y };
	    var normalSlope = this.getNormalizedPoint({ x: slope.x, y: slope.y }, 1);
	    
	    if( p0 == null ){
	    	p0 = p2;
	    }
	    
	    return {
	    	x: p0.x + normalSlope.x * h,
	    	y: p0.y + normalSlope.y * h
	    };
	};
	
	SvgRenderer.prototype.getNormalizedPoint = function(p, newLength){
		var currentLength = Math.sqrt(p.x*p.x + p.y*p.y);
		var factor = newLength / currentLength;
		
		return {
			x: p.x * factor,
			y: p.y * factor
		};
	};
	
	SvgRenderer.prototype.getDistance = function(p1, p2){
		return Math.sqrt( (p2.x - p1.x)*(p2.x - p1.x) + (p2.y - p1.y)*(p2.y - p1.y) );
	};
	
	SvgRenderer.prototype.makeSvgEdge = function(element){
		var self = this;
		var source = element.source().element();
		var target = element.target().element();
					
		if( source == null || target == null ){
			$$.console.debug("SVG renderer is ignoring creating of edge `%s` with missing nodes");
			return;
		}
		
		var ps = source.position(false);
		var pt = target.position(false);
		
		if( ps.x == null || ps.y == null || pt.x == null || pt.y == null ){
			$$.console.debug("SVG renderer is ignoring creating of edge `%s` with position (%o, %o, %o, %o)", element.id(), ps.x, ps.y, pt.x, pt.y);
			return;
		}
		
		var style = this.calculateStyle(element);
		
		var svgDomGroup = this.svg.group(this.edgesGroup);
		element.renscratch().svgGroup = svgDomGroup;
		this.svg.change(svgDomGroup);
		
		// notation: (x1, y1, x2, y2) = (source.x, source.y, target.x, target.y)
		this.makeSvgEdgePath(element);
		
		$$.console.debug("SVG renderer made edge `%s` with position (%i, %i, %i, %i)", element.id(), ps.x, ps.y, pt.x, pt.y);
		
		this.makeSvgEdgeInteractive(element);
		this.updateElementStyle(element, style);
		return element.renscratch().svg;
	};
	
	SvgRenderer.prototype.makeSvgElement = function(element){
		var svgDomElement;
		
		if( element.group() == "nodes" ){
			svgDomElement = this.makeSvgNode(element);
		} else if( element.group() == "edges" ){
			svgDomElement = this.makeSvgEdge(element);
		}
		
		return svgDomElement;
	};
	
	SvgRenderer.prototype.getSvgElement = function(element){
		if( element.renscratch().svg != null ){
			return element.renscratch().svg;
		} else {
			return this.makeSvgElement(element);
		}
	};
	
	SvgRenderer.prototype.updateSelection = function(collection){
		this.updateElementsStyle(collection);
	};
	
	SvgRenderer.prototype.updateClass = function(collection){
		this.updateElementsStyle(collection);
	};
	
	SvgRenderer.prototype.updateData = function(collection, updateMappers){
		this.updateElementsStyle(collection);
		
		if( updateMappers ){
			this.updateMapperBounds( collection );
		}
	};
	
	SvgRenderer.prototype.updateMapperBounds = function(collection){
		var elements = this.cy.elements();
		
		if( collection.nodes().size() > 0 && collection.edges().size() > 0 ){
			// update both nodes & edges
		} else {
			// update only the group in the collection
			elements = elements.filter(function(){
				return this.group() == collection.eq(0).group();
			});
		}
		
		elements = elements.not(collection);
		this.updateElementsStyle( elements );
	};
	
	SvgRenderer.prototype.updateElementsStyle = function(collection){
		var self = this;
		collection = collection.collection();
		
		// update nodes
		collection.nodes().each(function(i, element){
			self.updateElementStyle(element);
		});
		
		// update edges
		collection.edges().each(function(i, element){
			self.updateElementStyle(element);
		});
		
		// update positions of connected edges but not those already covered by the update for edges above
		collection.nodes().neighborhood().edges().not( collection.edges() ).each(function(i, element){
			self.updatePosition(element);
		});
	};
	
	SvgRenderer.prototype.setStyle = function(style){
		this.style = $.extend(true, {}, defaults.style, style);
	};
	
	SvgRenderer.prototype.updateStyle = function(style){
		var collection = this.cy.elements();
		
		this.setStyle(style);
		
		this.updateElementsStyle(collection);
	};
	
	SvgRenderer.prototype.updateBypass = function(collection){
		var self = this;
		collection = collection.collection();
		
		// update nodes
		collection.nodes().each(function(i, element){
			self.updateElementStyle(element);
		});
		
		// update connected edges
		collection.edges().add( collection.closedNeighborhood().edges() ).each(function(i, edge){
			self.updateElementStyle(edge);
		});
	};
	
	SvgRenderer.prototype.updateElementStyle = function(element, newStyle){
		if( element.isNode() ){
			this.updateNodeStyle(element, newStyle);
		} else if( element.isEdge() ){
			this.updateEdgeStyle(element, newStyle);
		}
	};
	
	SvgRenderer.prototype.updateNodeStyle = function(element, newStyle){
		var oldShape = element.style(false).shape;
		
		element._private.style = newStyle != null ? newStyle : this.calculateStyle(element);
		var style = element.style(false);
		
		var newShape = element.style(false).shape;
		
		if( element.renscratch().svg == null ){
			$$.console.error("SVG renderer can not update style for node `%s` since it has no SVG element", element.id());
			return;
		}
		
		if( newShape != oldShape ){
			this.svgRemove(element.renscratch().svgGroup);
			this.makeSvgNode(element);
			return;
		}
			
		// TODO add more as more styles are added
		// generic styles go here
		this.svg.change(element.renscratch().svg, {
			"pointer-events": "visible", // if visibility:hidden, no events
			fill: color(style.fillColor),
			fillOpacity: percent(style.fillOpacity),
			stroke: number(style.borderWidth) > 0 ? color(style.borderColor) : "none",
			strokeWidth: number(style.borderWidth),
			strokeDashArray: lineStyle(style.borderStyle).array,
			strokeOpacity: percent(style.borderOpacity),
			cursor: cursor(style.cursor),
			"visibility": visibility(style.visibility)
		});
		
		this.svg.change(element.renscratch().svgGroup, {
			opacity: percent(style.opacity)
		});
		
		// styles for label		
		var labelOptions = {
			"visibility": visibility(style.visibility),
			"pointer-events": "none",
			fill: color(style.labelFillColor),
			"font-family": style.labelFontFamily,
			"font-weight": style.labelFontWeight,
			"font-style": style.labelFontStyle,
			"text-decoration": style.labelFontDecoration,
			"font-variant": style.labelFontVariant,
			"font-size": style.labelFontSize,
			"text-rendering": "geometricPrecision"
		};
		
		this.svg.change(element.renscratch().svgLabelGroup, {
			opacity: percent(style.labelOpacity)
		});
		
		this.svg.change(element.renscratch().svgLabelOutline, {
			stroke: color(style.labelOutlineColor),
			strokeWidth: number(style.labelOutlineWidth) * 2,
			fill: "none",
			opacity: percent(style.labelOutlineOpacity)
		});
		
		this.svg.change(element.renscratch().svgLabelOutline, labelOptions);
		this.svg.change(element.renscratch().svgLabel, labelOptions);
		
		var labelText = style.labelText == null ? "" : style.labelText;
		element.renscratch().svgLabel.textContent = labelText;
		element.renscratch().svgLabelOutline.textContent = labelText;
		
		var valign = labelValign(style.labelValign);
		var halign = labelHalign(style.labelHalign);
		
		// styles to the group
		this.svg.change(element.renscratch().svgGroup, {
			fillOpacity: percent(style.fillOpacity)
		});
		
		// update shape specific stuff like position
		nodeShape(style.shape).update(this.svg, this.nodesGroup, element, element.position(false), style);
		
		// update label position after the node itself
		this.updateLabelPosition(element, valign, halign);
		
		$$.console.debug("SVG renderer collapsed mappers and updated style for node `%s` to %o", element.id(), style);
	};
	
	SvgRenderer.prototype.updateLabelPosition = function(element, valign, halign){
		var spacing = 3;
		var dx = 0;
		var dy = 0;
		var height = 0;
		var width = 0;
		var text = element.renscratch().svgLabel.textContent;
		
		// update node label x, y
		if( element.isNode() ){
			this.positionSvgNodeLabel(element);
		}
		
		var textAnchor;
		var styleAttr;
		var transform;
		
		if( text == null || text == "" ){
			return;
		}
		
		if( element.isNode() ){
			height = element.style(false).height;
			width = element.style(false).width;
		}
		
		if( halign == "middle" ){
			textAnchor =  {
				"text-anchor": "middle"
			};
		} else if( halign == "right" ){
			textAnchor =  {
				"text-anchor": "start"
			};
			dx = width/2 + spacing;
		} else if( halign == "left" ){
			textAnchor =  {
				"text-anchor": "end"
			};
			dx = -width/2 - spacing;
		}
		
		// TODO remove this hack to fix IE when it supports baseline properties properly
		var fontSize = parseInt(window.getComputedStyle(element.renscratch().svgLabel)["fontSize"]);
		var ieFix = $.browser.msie ? fontSize/3 : 0;
	
		if( valign == "middle" ){
			styleAttr = {
				"style": "alignment-baseline: central; dominant-baseline: central;"
			};
			dy = 0 + ieFix;
		} else if( valign == "top" ){
			styleAttr = {
				"style": "alignment-baseline: normal; dominant-baseline: normal;"	
			};
			dy = -height/2 - spacing;
		} else if( valign == "bottom" ){
			styleAttr = {
				"style": "alignment-baseline: normal; dominant-baseline: normal;"
			};
			dy = height/2 + fontSize;
		}
		
		transform = {
			transform: "translate("+ dx +","+ dy +")"
		};
		
		var labelOptions = $.extend({}, textAnchor, styleAttr, transform);
		
		this.svg.change(element.renscratch().svgLabelOutline, labelOptions);
		this.svg.change(element.renscratch().svgLabel, labelOptions);
	};
	
	SvgRenderer.prototype.updateEdgeStyle = function(element, newStyle){
		var oldTargetShape = element.style(false).targetArrowShape;
		var oldSourceShape = element.style(false).sourceArrowShape;
		
		element._private.style = newStyle != null ? newStyle : this.calculateStyle(element);
		var style = element.style(false);
		
		if( element.renscratch().svg == null ){
			$$.console.error("SVG renderer can not update style for edge `%s` since it has no SVG element", element.id());
			return;
		}
		
		var newSrcStyle = element.source().style();
		var oldSrcStyle = element.renscratch().oldSourceStyle || newSrcStyle;
		
		var newTgtStyle = element.target().style();
		var oldTgtStyle = element.renscratch().oldTargetStyle || newTgtStyle;
		
		var newTargetShape = element.style(false).targetArrowShape;
		var newSourceShape = element.style(false).sourceArrowShape;
		
		var nodesStyleChanged = newSrcStyle.height != oldSrcStyle.height || newSrcStyle.width != oldSrcStyle.width ||
			newTgtStyle.height != oldTgtStyle.height || newTgtStyle.width != oldTgtStyle.width ||
			newSrcStyle.shape != oldSrcStyle.shape || newTgtStyle.shape != oldTgtStyle.shape ||
			newSrcStyle.borderWidth != oldSrcStyle.borderWidth || newTgtStyle.borderWidth != oldTgtStyle.borderWidth;
		
		var widthChanged = element.renscratch().oldStyle == null || element.renscratch().oldStyle.width != style.width;
		
		element.renscratch().oldSourceStyle = newSrcStyle;
		element.renscratch().oldTargetStyle = newTgtStyle;
		element.renscratch().oldStyle = style;
		
		if( newTargetShape != oldTargetShape || newSourceShape != oldSourceShape || nodesStyleChanged || widthChanged ){
			this.svgRemove(element.renscratch().svgGroup);
			this.makeSvgEdge(element);
			
			return;
		}
		
		// TODO add more as more styles are added
		// generic edge styles go here
		this.svg.change(element.renscratch().svg, {
			"pointer-events": "visibleStroke", // on visibility:hidden, no events
			stroke: color(style.lineColor),
			strokeWidth: number(style.width),
			strokeDashArray: lineStyle(style.style).array,
			"stroke-linecap": "butt", // disable for now for markers to line up nicely
			cursor: cursor(style.cursor),
			fill: "none",
			visibility: visibility(style.visibility)
		});
		
		this.svg.change(element.renscratch().svgGroup, {
			opacity: percent(style.opacity)
		});
		
		this.svg.change(element.renscratch().svgTargetArrow, {
			fill: color(style.targetArrowColor),
			cursor: cursor(style.cursor),
			visibility: visibility(style.visibility)
		});
		
		this.svg.change(element.renscratch().svgSourceArrow, {
			fill: color(style.sourceArrowColor),
			cursor: cursor(style.cursor),
			visibility: visibility(style.visibility)
		});
		
		var labelOptions = {
			"visibility": visibility(style.visibility),
			"pointer-events": "none",
			fill: color(style.labelFillColor),
			"font-family": style.labelFontFamily,
			"font-weight": style.labelFontWeight,
			"font-style": style.labelFontStyle,
			"text-decoration": style.labelFontDecoration,
			"font-variant": style.labelFontVariant,
			"font-size": style.labelFontSize,
			"text-rendering": "geometricPrecision"
		};
		
		this.svg.change(element.renscratch().svgLabel, labelOptions);
		this.svg.change(element.renscratch().svgLabelOutline, $.extend({}, labelOptions, {
			fill: "none",
			stroke: color(style.labelOutlineColor),
			strokeWidth: number(style.labelOutlineWidth) * 2,
			opacity: percent(style.labelOutlineOpacity),
		}) );
		
		this.svg.change(element.renscratch().svgLabelGroup, {
			opacity: percent(style.labelOpacity)
		});
		
		var labelText = style.labelText == null ? "" : style.labelText;
		element.renscratch().svgLabel.textContent = labelText;
		element.renscratch().svgLabelOutline.textContent = labelText;
		this.updateLabelPosition(element, "middle", "middle");
		
		$$.console.debug("SVG renderer collapsed mappers and updated style for edge `%s` to %o", element.id(), style);
	};
	
	SvgRenderer.prototype.addElements = function(collection, updateMappers){
		
		var self = this;
		var cy = this.cy;
		
		collection.nodes().each(function(i, element){
			self.makeSvgElement(element);
		});
		
		collection.edges().each(function(i, element){
			self.makeSvgElement(element);
		});
		
		self.positionEdges( collection.edges().parallelEdges() );

		if( updateMappers ){
			self.updateMapperBounds( collection );
		}
	};
	
	SvgRenderer.prototype.updatePosition = function(collection){
		
		$$.console.debug("SVG renderer is updating node positions");
		
		collection = collection.collection();
		var container = this.cy.container();
		var svg = container.svg('get');
		var self = this;
		var cy = this.options.cy;
		
		// update nodes
		collection.nodes().each(function(i, element){
			var svgEle = self.getSvgElement(element);			
			var p = element.position(false);
			
			self.updateNodePositionFromShape(element);
			self.positionSvgNodeLabel(element);

			$$.console.debug("SVG renderer is moving node `%s` to position (%o, %o)", element.id(), p.x, p.y);
		});
		
		// update connected edges
		self.positionEdges( collection.closedNeighborhood().edges() );
		
	};
	
	SvgRenderer.prototype.positionEdges = function(edges){
		var self = this;
		
		edges.each(function(i, edge){
			if( edge.renscratch().svgGroup != null ){
				self.svgRemove(edge.renscratch().svgGroup);
			}
			self.makeSvgEdge(edge);
			
			var ps = edge.source().position(false);
			var pt = edge.target().position(false);
			
			$$.console.debug("SVG renderer is moving edge `%s` to position (%o, %o, %o, %o)", edge.id(), ps.x, ps.y, pt.x, pt.y);
		});
	};
	
	SvgRenderer.prototype.drawElements = function(collection){
		var self = this;
		
		self.updateElementsStyle( collection );
	};
	
	SvgRenderer.prototype.removeElements = function(collection, updateMappers){
		$$.console.debug("SVG renderer is removing elements");
		
		var container = this.cy.container();
		var svg = container.svg('get');
		var cy = this.options.cy;
		var self = this;
		
		collection.each(function(i, element){
			
			if( element.renscratch().svgGroup != null ){
				// remove the svg element from the dom
				svg.remove( element.renscratch().svgGroup );
				
				element.removeRenscratch("svg");
				element.removeRenscratch("svgGroup");
				element.removeRenscratch("svgSourceArrow");
				element.removeRenscratch("svgTargetArrow");
				element.removeRenscratch("svgLabel");
			} else {
				$$.console.debug("Element with group `%s` and ID `%s` has no associated SVG element", element.group(), element.id());
			}
		});
		
		if( self.selectedElements != null ){
			self.selectedElements = self.selectedElements.not(collection);
		}

		var edgesToReposition = self.cy.collection();
		collection.edges().each(function(i, edge){
			var src = edge.source();
			var tgt = edge.target();

			edgesToReposition = edgesToReposition.add( src.edgesWith( tgt ) );
		});

		self.updatePosition( edgesToReposition );
		
		if( updateMappers ){
			this.updateMapperBounds( collection );
		}
	};
	
	SvgRenderer.prototype.notify = function(params){
		var container = this.options.cy.container();
	
		$$.console.debug("Notify SVG renderer with params (%o)", params);
		
		if( params.type == null ){
			$$.console.error("The SVG renderer should be notified with a `type` field");
			return;
		}
		
		var self = this;
		switch( params.type ){
			case "load":
				self.init(function(){
					self.addElements( params.collection );
				});
				break;
		
			case "add":
				this.addElements( params.collection, params.updateMappers );
				break;
			
			case "remove":
				this.removeElements( params.collection, params.updateMappers );
				break;
			
			case "position":
				this.updatePosition( params.collection );
				break;
			
			case "style":
				this.updateStyle( params.style );
				break;
				
			case "bypass":
				this.updateBypass( params.collection );
				break;
				
			case "class":
				this.updateClass( params.collection );
				break;
				
			case "data":
				this.updateData( params.collection, params.updateMappers );
				break;
				
			case "select":
			case "unselect":
				this.updateSelection( params.collection );
				break;
				
			case "draw":
				this.drawElements( params.collection );
				break;
				
			default:
				$$.console.debug("The SVG renderer doesn't consider the `%s` event", params.type);
				break;
		}
	};

	function SvgExporter(options){
		this.options = options;
		this.cy = options.cy;
		this.renderer = options.renderer;
		
		if( this.renderer.name() != "svg" ){
			$$.console.error("The SVG exporter can be used only if the SVG renderer is used");
		}
	}
	
	SvgExporter.prototype.run = function(){
		return this.options.cy.container().svg("get").toSVG();
	};
	
	$.cytoscapeweb("renderer", "svg", SvgRenderer);
	$.cytoscapeweb("exporter", "svg", SvgExporter);
	
})( jQuery, jQuery.cytoscapeweb );

;(function($, $$){
		
	var defaults = {};

	function NullLayout( options ){
		this.options = $.extend(true, {}, defaults, options); 
	}
	
	// puts all nodes at (0, 0)
	NullLayout.prototype.run = function(){
		var options = this.options;
		var cy = options.cy;
		
		cy.nodes().positions(function(){
			return {
				x: 0,
				y: 0
			};
		});
		
		cy.one("layoutready", options.ready);
		cy.trigger("layoutready");
		
		cy.one("layoutstop", options.stop);
		cy.trigger("layoutstop");
	};

	NullLayout.prototype.stop = function(){
		// not a continuous layout
	};
	
	$.cytoscapeweb("layout", "null", NullLayout);
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	var defaults = {
		ready: undefined, // callback on layoutready
		stop: undefined, // callback on layoutstop
		fit: true // whether to fit to viewport
	};
	
	function RandomLayout( options ){
		this.options = $.extend(true, {}, defaults, options);
	}
	
	RandomLayout.prototype.run = function(){
		var options = this.options;
		var cy = options.cy;
		var nodes = cy.nodes();
		var edges = cy.edges();
		var $container = cy.container(); // the container div for cytoscapeweb
		
		var width = $container.width();
		var height = $container.height();
		

		nodes.positions(function(i, element){
			
			if( element.locked() ){
				return false;
			}

			return {
				x: Math.round( Math.random() * width ),
				y: Math.round( Math.random() * height )
			};
		});
		
		// layoutready should be triggered when the layout has set each node's
		// position at least once
		cy.one("layoutready", options.ready);
		cy.trigger("layoutready");
		
		if( options.fit ){
			cy.fit();
		}
		
		// layoutstop should be triggered when the layout stops running
		cy.one("layoutstop", options.stop);
		cy.trigger("layoutstop");
	};
	
	RandomLayout.prototype.stop = function(){
		// stop the layout if it were running continuously
	};

	// register the layout
	$.cytoscapeweb(
		"layout", // we're registering a layout
		"random", // the layout name
		RandomLayout // the layout prototype
	);
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	var defaults = {
		fit: true,
		rows: undefined,
		columns: undefined
	};
	
	function GridLayout( options ){
		this.options = $.extend({}, defaults, options);
	}
	
	GridLayout.prototype.run = function(){
		var params = options = this.options;
		
		var cy = params.cy;
		var nodes = cy.nodes();
		var edges = cy.edges();
		var $container = cy.container();
		
		$$.console.debug("Running grid layout with options (%o)", options);
		
		var width = $container.width();
		var height = $container.height();

		$$.console.debug("Running grid layout on container of size (w, h) = (%i, %i) with %i nodes", width, height, nodes.size());
		
		if( height == 0 || width == 0){
			$.cytoscapeweb("warn", "Running grid layout on container of size 0");
			
			nodes.positions(function(){
				return { x: 0, y: 0 };
			});
			
		} else {
			
			// width/height * splits^2 = cells where splits is number of times to split width
			var cells = nodes.size();
			var splits = Math.sqrt( cells * height/width );
			var rows = Math.round( splits );
			var cols = Math.round( width/height * splits );
			
			$$.console.debug("Grid layout decided on initial (cols, rows) = (%i, %i)", cols, rows);
			
			function small(val){
				if( val == undefined ){
					return Math.min(rows, cols);
				} else {
					var min = Math.min(rows, cols);
					if( min == rows ){
						rows = val;
						$$.console.debug("Grid layout set small number of rows to %i", rows);
					} else {
						cols = val;
						$$.console.debug("Grid layout set small number of columns to %i", cols);
					}
				}
			}
			
			function large(val){
				if( val == undefined ){
					return Math.max(rows, cols);
				} else {
					var max = Math.max(rows, cols);
					if( max == rows ){
						rows = val;
						$$.console.debug("Grid layout set large number of rows to %i", rows);
					} else {
						cols = val;
						$$.console.debug("Grid layout set large number of columns to %i", cols);
					}
				}
			}
			
			// if rows or columns were set in options, use those values
			if( options.rows != null && options.columns != null ){
				rows = options.rows;
				cols = options.columns;
			} else if( options.rows != null && options.columns == null ){
				rows = options.rows;
				cols = Math.ceil( cells / rows );
			} else if( options.rows == null && options.columns != null ){
				cols = options.columns;
				rows = Math.ceil( cells / cols );
			}
			
			// otherwise use the automatic values and adjust accordingly
			
			// if rounding was up, see if we can reduce rows or columns
			else if( cols * rows > cells ){
				var sm = small();
				var lg = large();
				
				$$.console.debug("Grid layout is looking to make a reduction");
				
				// reducing the small side takes away the most cells, so try it first
				if( (sm - 1) * lg >= cells ){
					small(sm - 1);
				} else if( (lg - 1) * sm >= cells ){
					large(lg - 1);
				} 
			} else {
				
				$$.console.debug("Grid layout is looking to make an increase");
				
				// if rounding was too low, add rows or columns
				while( cols * rows < cells ){
					var sm = small();
					var lg = large();
					
					// try to add to larger side first (adds less in multiplication)
					if( (lg + 1) * sm >= cells ){
						large(lg + 1);
					} else {
						small(sm + 1);
					}
				}
			}
			
			$$.console.debug("Grid layout split area into cells (cols, rows) = (%i, %i)", cols, rows);
			
			var cellWidth = width / cols;
			var cellHeight = height / rows;
			
			var row = 0;
			var col = 0;
			nodes.positions(function(i, element){
				
				if( element.locked() ){
					return false;
				}
				
				var x = col * cellWidth + cellWidth/2;
				var y = row * cellHeight + cellHeight/2;
				
				col++;
				if( col >= cols ){
					col = 0;
					row++;
				}
				
				return { x: x, y: y };
				
			});
		}
		
		if( params.fit ){
			cy.reset();
		} 
		
		cy.one("layoutready", params.ready);
		cy.trigger("layoutready");
		
		cy.one("layoutstop", params.stop);
		cy.trigger("layoutstop");
	};

	GridLayout.prototype.stop = function(){
		// not a continuous layout
	};
	
	$.cytoscapeweb("layout", "grid", GridLayout);
	
})(jQuery, jQuery.cytoscapeweb);

;(function($, $$){
	
	var defaults = {
		fit: true
	};
	
	function PresetLayout( options ){
		this.options = $.extend(true, {}, defaults, options);
	}
	
	PresetLayout.prototype.run = function(){
		var options = this.options;
		var cy = options.cy;
		var nodes = cy.nodes();
		var edges = cy.edges();
		var container = cy.container();
		
		function getPosition(node){
			if( options.positions == null ){
				return null;
			}
			
			if( options.positions[node._private.data.id] == null ){
				return null;
			}
			
			return options.positions[node._private.data.id];
		}
		
		nodes.positions(function(i, node){
			var position = getPosition(node);
			
			if( node.locked() || position == null ){
				return false;
			}
			
			return position;
		});
		
		if( options.pan != null ){
			cy.pan( options.pan );
			cy.zoom( options.zoom );
		}

		cy.one("layoutready", options.ready);
		cy.trigger("layoutready");
		
		if( options.fit ){
			cy.fit();
		}
		
		cy.one("layoutstop", options.stop);
		cy.trigger("layoutstop");
	};
	
	$.cytoscapeweb("layout", "preset", PresetLayout);
	
	$.cytoscapeweb("core", "presetLayout", function(){
		var cy = this;
		var layout = {};
		var elements = {};
		
		cy.nodes().each(function(i, ele){
			elements[ ele.data("id") ] = ele.position();
		});
		
		layout.positions = elements;
		layout.name = "preset";
		layout.zoom = cy.zoom();
		layout.pan = cy.pan();

		return layout;
	});
	
})(jQuery, jQuery.cytoscapeweb);

/**
 * jQuery Colour 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * http://www.adaptavist.com/display/jQuery/Colour+Library
 */
(jQuery.color || (function($) {

$.color = {

	// Compare two colour tuples (must be of the same colour space)
	isEqual: function ( tupleA, tupleB ) {
		if ( tupleA.length !== tupleB.length ) { return false; }
		
		var i = tupleA.length;
		while (i--) {
			if ( tupleA[i] !== tupleB[i] ) { return false; }
		}
		
		return true;
	},
	
	// Fix the values in a colour tuple
	fix: function ( tuple, format ) {
		var i = format.length;
		while (i--) {
			if ( typeof tuple[i] === 'number' ) {
				switch(format.charAt(i)) {
					case 'i': // integer
						tuple[i] = Math.round(tuple[i]);
						break;
					case 'o': // octet; integer 0..255
						tuple[i] = Math.min(255, Math.max(0, Math.round(tuple[i])));
						break;
					case '1': // one: float, 0..1
						tuple[i] = Math.min(1, Math.max(0, tuple[i]));
						break;
				}
			}
		}
		return tuple;
	},
	
	self: function( tuple ) {
		return tuple;
	},
	
	// Common alpha channel retrieval, defaults to 1
	alpha: function( val ) {
		return val === undefined ? 1 : val;
	},
	
	// A collection of colour palettes
	palette: {},
	
	// Registered colour functions
	fns: []
};

})(jQuery)
);

/*
 * jQuery UI Colour Red-Green-Blue 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 */
(jQuery.color && (function($) {

$.color.RGB = {

	fix: function ( rgb ) {
		rgb = $.color.fix(rgb, 'ooo1');
		return rgb;
	},
	
	toRGB: $.color.self,

	// RGB values must be integers in the range 0-255
	toHEX: function ( rgb ) {
		return '#' + (0x1000000 + rgb[0]*0x10000 + rgb[1]*0x100 + rgb[2]).toString(16).slice(-6);
	},

	toCSS: function ( rgb ) {
		if ( $.color.alpha(rgb[3]) === 0 ) {
			// Completely transparent, use the universally supported name
			return 'transparent';
		}
		if ( $.color.alpha(rgb[3]) < 1 ) {
			// Color is not opaque - according to the CSS3 working draft we should
			// not simply treat an RGBA value as an RGB value with opacity ignored.
			return 'rgba(' + rgb.join(',') + ')';
		}
		return 'rgb(' + Array.prototype.slice.call(rgb,0,3).join(',') + ')';
	},
	
	red: function ( rgb ) {
		return rgb[0];
	},
	
	green: function ( rgb ) {
		return rgb[1];
	},
	
	blue: function ( rgb ) {
		return rgb[2];
	},
	
	alpha: function ( rgb ) {
		return $.color.alpha(rgb[3]);
	}
};

$.color.RGB.toString = $.color.RGB.toHEX;

// Register the colour space methods
$.color.fns.push(
	'RGB.toRGB', 'RGB.toHEX', 'RGB.toCSS',
	'RGB.red', 'RGB.green', 'RGB.blue', 'RGB.alpha'
);

})(jQuery)
);

/*
 * jQuery Colour - Common functions for HSV & HSL colour spaces 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 *  color.rgb.js
 */
(jQuery.color && (function($) {

$.color.HueBased = {

	fix: function ( hx ) {
		hx[0] = (hx[0] + 1) % 1;
		return $.color.fix(hx, '1111');
	},

	complementary: function ( hx, offset ) {
		return [ (hx[0] + 0.5 + (offset || 0)) % 1.0, hx[1], hx[2], hx[3] ];
	},

	analogous: function ( hx, offset ) {
		return [ (hx[0] + 1.0 + (offset || 0)) % 1.0, hx[1], hx[2], hx[3] ];
	},

	hue: function ( hx ) {
		return hx[0];
	},

	alpha: function ( hx ) {
		return $.color.alpha(hx[3]);
	}
};

})(jQuery)
);

/*
 * jQuery Colour Hue-Saturation-Value 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 *  color.rgb.js
 *  color.huebased.js
 */
(jQuery.color && (function($) {

$.color.HSV = $.extend({

	toHSV: $.color.self,

	// HSV values are normalized to the range 0..1
	toRGB: function ( hsv ) {
		var ha = hsv[0]*6,
			hb = Math.floor( ha ),
			f = ha - hb,
			s = hsv[1],
			v = hsv[2] * 255,
			a = hsv[3],
			p = Math.round(v * ( 1 - s )),
			q = Math.round(v * ( 1 - f * s)),
			t = Math.round(v * ( 1 - ( 1 - f ) * s ));
		v = Math.round(v);
		switch (hb % 6) {
			case 0: return [v,t,p,a];
			case 1: return [q,v,p,a];
			case 2: return [p,v,t,a];
			case 3: return [p,q,v,a];
			case 4: return [t,p,v,a];
			case 5: return [v,p,q,a];
		}
	},

	// NOTE: the 'V' this is to distingush HSV from HSL which has a differing view of saturation
	saturationV: function ( hsv ) {
		return hsv[1];
	},

	value: function ( hsv ) {
		return hsv[2];
	}

}, $.color.HueBased);

$.color.RGB.toHSV = function ( rgb ) {
	var r = rgb[0]/255,
		g = rgb[1]/255,
		b = rgb[2]/255,
		min = Math.min(r,g,b),
		max = Math.max(r,g,b),
		d = max - min;

	return [
		d === 0 ? 0 :
		(g === max ? (b-r)/d/6 + (1/3) :
		 b === max ? (r-g)/d/6 + (2/3) :
		         (g-b)/d/6 + 1) % 1,
		d === 0 ? 0 : d/max,
		max,
		rgb[3]
	];
};

// Register the colour space methods
$.color.fns.push(
	'HSV.toHSV', 'HSV.toRGB', 'RGB.toHSV',
	'HSV.complementary', 'HSV.analogous',
	'HSV.hue', 'HSV.saturationV', 'HSV.value', 'HSV.alpha'
);

})(jQuery)
);

/*
 * jQuery Colour Hue-Saturation-Lightness 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *	color.core.js
 *  color.rgb.js
 *  color.huebased.js
 */
(jQuery.color && (function($) {

$.color.HSL = $.extend({

	toHSL: $.color.self,

	toRGB: function ( hsl ) {
		var h = hsl[0],
			s = hsl[1],
			l = hsl[2],
			q = l < 0.5 ? l*(1+s) : l+s-(l*s),
			p = 2*l-q;

		function c(x) {
			var t = x < 0 ? x+1 : x > 1 ? x-1 : x;
			return t < 1/6 ? p + (q-p) * 6 * t :
			       t < 1/2 ? q :
			       t < 2/3 ? p + (q-p) * 6 * (2/3 - t) :
			                 p;
		}

		return [
			Math.round(255 * c(h + 1/3)),
			Math.round(255 * c(h)),
			Math.round(255 * c(h - 1/3)),
			hsl[3]
		];
	},

	// NOTE: the 'L' this is to distingush HSL from HSV which has a differing view of saturation
	saturationL: function ( hsl ) {
		return hsl[1];
	},

	lightness: function ( hsl ) {
		return hsl[2];
	}

}, $.color.HueBased);

$.color.RGB.toHSL = function ( rgb ) {
	var r = rgb[0]/255,
		g = rgb[1]/255,
		b = rgb[2]/255,
		min = Math.min(r,g,b),
		max = Math.max(r,g,b),
		d = max - min,
		p = max + min;

	return [
		d === 0 ? 0 :
		(g === max ? (b-r)/d/6 + (1/3) :
		 b === max ? (r-g)/d/6 + (2/3) :
		             (g-b)/d/6 + 1) % 1,

		d === 0 ? 0 :
		p > 1 ? d / (2 - max - min) :
		        d / p,

		p/2,
		rgb[3]
	];
};

$.color.fns.push(
	'HSL.toHSL', 'HSL.toRGB', 'RGB.toHSL',
	'HSL.complementary', 'HSL.analogous',
	'HSL.hue', 'HSL.saturationL', 'HSL.lightness', 'HSL.alpha'
);

})(jQuery)
);

/*
 * jQuery Colour Object 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 *  color.rgb.js
 */
(jQuery.color && jQuery.Color || (function($) {

// Construct a colour object of a given space (eg. 'RGB', 'HSV')
$.Color = function ( color, space, name ) {
	if ( typeof this === 'function' ) {
		return new $.Color(color, space, name);
	}
	
	if ( typeof color === 'string' && $.color.parse ) {
		if (!name) {
			name = color;
		}
		// Attempt to parse the string if the parser is available
		color = $.color.parse(color);
	}
	
	if ( color && color.length ) {
		// Copy channel values
		var i;
		i = this.length = color.length;
		while( i-- ) {
			this[i] = color[i];
		}
	}
	
	if ( color ) {
		this.space = space || color.space || 'RGB';
		this.name = name || color.name;
	}
};

function modify( tuple, relative ) {
	// Ensure the color to be modified is the same space as the argument
	var color = $.Color.isInstance(tuple) && tuple.space !== this.space ?
				this.to(tuple.space) :
				new $.Color(this),
		i = color.length,
		mod = false;
	
	while( i-- ) {
		if ( typeof tuple[i] === 'number' ) {
			var v = relative ? color[i] + tuple[i] : tuple[i];
			if ( v !== color[i] ) {
				color[i] = v;
				mod = true;
			}
		}
	}
	
	return mod ? color.setName() : this;
}

$.Color.fn = $.Color.prototype = {

	color: "0.6",
	
	// Get the utility functions for the colour space
	util: function() {
		return $.color[this.space];
	},
	
	// Convert the colour to a different colour space
	to: function( space ) {
		return this['to'+space]();
	},

	// Ensure colour channels values are within the valid limits
	fix: function() {
		return this.util().fix(this);
	},
	
	// Modify the individual colour channels, returning a new color object
	modify: function( tuple ) {
		return modify.call(this, tuple);
	},
	
	// Adjust the colour channels relative to current values
	adjust: function( tuple ) {
		return modify.call(this, tuple, true);
	},
	
	setName: function( newName ) {
		this.name = newName;
		return this;
	},

	toString: function() {
		if ( !this.space ) { return ''; }
		var util = this.util();
		return util.hasOwnProperty('toString') ? util.toString(this) : this.to('RGB').toString();
	},
	
	join: [].join,
	push: [].push
};

// Check whether the given argument is a valid color object
$.Color.isInstance = function( color ) {
	return color && typeof color === 'object' && color.color === $.Color.fn.color && color.space;
};

// Hold the default colour space for each method
$.Color.fnspace = {};

// Generate the wrapper for colour methods calls
function wrapper( color, subject, fn, space, copyName ) {
	return function() {
		var args = [color];
		Array.prototype.push.apply(args, arguments);
		var result = fn.apply(subject, args);
		return $.isArray(result) ? new $.Color(result, space, copyName ? color.name : undefined) : result;
	};
}

// Generate the prototype for method calls
function method( color, name ) {
	var toSpace = /^to/.test(name) ? name.substring(2) : false;
	
	return function() {
		var color = this,
			util = color.util();
		
		if ( !util[name] ) {
			// Convert to the appropriate colour space
			color = color.to($.Color.fnspace[name]);
			util = color.util();
		}
		
		var fn = wrapper(color, util, util[name], toSpace || color.space, !!toSpace),
			result = fn.apply(color, arguments);
		
		// Override the function for this instance so it can be reused
		// without the overhead of another lookup or conversion.
		if ( toSpace ) {
			// The function will return the same result every time, so cache the result
			this[name] = function() {
				return result;
			};
			if ( $.Color.isInstance(result) ) {
				color = this;
				result['to'+this.space] = function() {
					return color;
				};
			}
		} else {
			this[name] = fn;
		}
		
		return result;
	};
}

// Add colour function to the prototype
function addfn() {
	var s = this.split('.'),
		name = s[1],
		space = s[0];
	
	// Ensure the colour space conversion function isn't associated with it's own space
	if ( !$.Color.fnspace[name] && name !== 'to'+space ) {
		$.Color.fnspace[name] = space;
	}
	
	if ( !$.Color.fn[name] ) {
		$.Color.fn[name] = method(this, name);
	}
}

// Add existing functions
$.each($.color.fns, addfn);

// Override push to catch new functions
$.color.fns.push = function() {
	$.each(arguments, addfn);
	return Array.prototype.push.apply(this, arguments);
};

})(jQuery)
);

/*
 * jQuery Colour Parsing 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 */
(jQuery.color && (function($) {

$.extend($.color, {

	// Color string parsing taken from effects.core.js
	parse: function ( color ) {
		var m;

		if ( typeof color === 'string' ) {

			// Look for rgb(int,int,int) or rgba(int,int,int,float)
			if ( (m = /^\s*rgb(a)?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,\s*([0-9]+(?:\.[0-9]+)?)\s*)?\)\s*$/.exec(color)) && !m[1] === !m[5] ) {
				return [parseInt(m[2],10), parseInt(m[3],10), parseInt(m[4],10), m[5] ? parseFloat(m[5]) : 1];
			}

			// Look for rgb(float%,float%,float%) or rgba(float%,float%,float%,float)
			if ( (m = /^\s*rgb(a)?\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*(?:,\s*([0-9]+(?:\.[0-9]+)?)\s*)?\)\s*$/.exec(color)) && !m[1] === !m[5] ) {
				return [parseFloat(m[2])*255/100, parseFloat(m[3])*255/100, parseFloat(m[4])*255/100, m[5] ? parseFloat(m[5]) : 1];
			}

			// Look for #a0b1c2
			if ( (m = /^\s*#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})\s*$/.exec(color)) ) {
				return [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16), 1];
			}

			// Look for #fff
			if ( (m = /^\s*#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])\s*$/.exec(color)) ) {
				return [parseInt(m[1]+m[1],16), parseInt(m[2]+m[2],16), parseInt(m[3]+m[3],16), 1];
			}

			// Look for hsl(int,float%,float%) or hsla(int,float%,float%,float)
			if ( (m = /^\s*hsl(a)?\(\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*(?:,\s*([0-9]+(?:\.[0-9]+)?)\s*)?\)\s*$/.exec(color)) && !m[1] === !m[5] ) {
				return [parseInt(m[2],10)/360, parseFloat(m[3])/100, parseFloat(m[4])/100, m[5] ? parseFloat(m[5]) : 1];
			}

			// Otherwise, we're most likely dealing with a named color
			return $.color.named(color);
		}

		// Check if we're already dealing with a color tuple
		if ( color && ( color.length === 3 || color.length === 4 ) ) {
			if ( color.length === 3 ) {
				color.push( 1 );
			}
			return color;
		}
	},

	named: function ( color ) {
		var result;
		color = $.trim(color.toLowerCase());

		// Check for transparent
		if ( color === "transparent" ) {
			return [0, 0, 0, 0];
		}

		$.each($.color.palette, function(n, palette) {
			if (palette[color]) {
				result = palette[color];
				return false;
			}
		});
		return result;
	}

});

})(jQuery)
);

/*
 * jQuery Colour Related Palette Generator 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.object.js
 */
(jQuery.Color && (function($) {

// Generate a palette of related colours
$.Color.fn.related = function( offset ) {
	var i18n = $.Color.fn.related.i18n,
		off = offset || $.Color.fn.related.offset,
		offD = Math.round(off * 360) + i18n.deg;
	
	return {
		'anal-': this.analogous(-off).setName(i18n.anal + ' -' + offD),
		'anal0': this.analogous().setName(i18n.orig),
		'anal+': this.analogous(off).setName(i18n.anal + ' +' + offD),
		
		'comp-': this.complementary(-off).setName(i18n.split + ' -' + offD),
		'comp0': this.complementary().setName(i18n.comp),
		'comp+': this.complementary(off).setName(i18n.split + ' +' + offD),
		
		'triad-': this.analogous(-1/3).setName(i18n.triad + ' -120' + i18n.deg),
		'triad0': this.analogous().setName(i18n.orig),
		'triad+': this.analogous(1/3).setName(i18n.triad + ' +120' + i18n.deg)
	};
};

$.Color.fn.related.offset = 30/360;

$.Color.fn.related.i18n = {
	'deg': '°',
	'anal': 'Analogous',
	'orig': 'Original',
	'split': 'Split Complementary',
	'comp': 'Complementary',
	'triad': 'Triadic'
};

})(jQuery)
);

/*
 * jQuery Colour SVG/X11/CSS3 Palette 0.6
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 */
(jQuery.color && (function($) {

$.color.palette.css3 = {
	aliceblue:				[240,248,255],
	antiquewhite:			[250,235,215],
	aqua:					[0,255,255],
	aquamarine:				[127,255,212],
	azure:					[240,255,255],
	beige:					[245,245,220],
	bisque:					[255,228,196],
	black:					[0,0,0],
	blanchedalmond:			[255,235,205],
	blue:					[0,0,255],
	blueviolet:				[138,43,226],
	brown:					[165,42,42],
	burlywood:				[222,184,135],
	cadetblue:				[95,158,160],
	chartreuse:				[127,255,0],
	chocolate:				[210,105,30],
	coral:					[255,127,80],
	cornflowerblue:			[100,149,237],
	cornsilk:				[255,248,220],
	crimson:				[220,20,60],
	cyan:					[0,255,255],
	darkblue:				[0,0,139],
	darkcyan:				[0,139,139],
	darkgoldenrod:			[184,134,11],
	darkgray:				[169,169,169],
	darkgreen:				[0,100,0],
	darkgrey:				[169,169,169],
	darkkhaki:				[189,183,107],
	darkmagenta:			[139,0,139],
	darkolivegreen:			[85,107,47],
	darkorange:				[255,140,0],
	darkorchid:				[153,50,204],
	darkred:				[139,0,0],
	darksalmon:				[233,150,122],
	darkseagreen:			[143,188,143],
	darkslateblue:			[72,61,139],
	darkslategray:			[47,79,79],
	darkslategrey:			[47,79,79],
	darkturquoise:			[0,206,209],
	darkviolet:				[148,0,211],
	deeppink:				[255,20,147],
	deepskyblue:			[0,191,255],
	dimgray:				[105,105,105],
	dimgrey:				[105,105,105],
	dodgerblue:				[30,144,255],
	firebrick:				[178,34,34],
	floralwhite:			[255,250,240],
	forestgreen:			[34,139,34],
	fuchsia:				[255,0,255],
	gainsboro:				[220,220,220],
	ghostwhite:				[248,248,255],
	gold:					[255,215,0],
	goldenrod:				[218,165,32],
	gray:					[128,128,128],
	grey:					[128,128,128],
	green:					[0,128,0],
	greenyellow:			[173,255,47],
	honeydew:				[240,255,240],
	hotpink:				[255,105,180],
	indianred:				[205,92,92],
	indigo:					[75,0,130],
	ivory:					[255,255,240],
	khaki:					[240,230,140],
	lavender:				[230,230,250],
	lavenderblush:			[255,240,245],
	lawngreen:				[124,252,0],
	lemonchiffon:			[255,250,205],
	lightblue:				[173,216,230],
	lightcoral:				[240,128,128],
	lightcyan:				[224,255,255],
	lightgoldenrodyellow:	[250,250,210],
	lightgray:				[211,211,211],
	lightgreen:				[144,238,144],
	lightgrey:				[211,211,211],
	lightpink:				[255,182,193],
	lightsalmon:			[255,160,122],
	lightseagreen:			[32,178,170],
	lightskyblue:			[135,206,250],
	lightslategray:			[119,136,153],
	lightslategrey:			[119,136,153],
	lightsteelblue:			[176,196,222],
	lightyellow:			[255,255,224],
	lime:					[0,255,0],
	limegreen:				[50,205,50],
	linen:					[250,240,230],
	magenta:				[255,0,255],
	maroon:					[128,0,0],
	mediumaquamarine:		[102,205,170],
	mediumblue:				[0,0,205],
	mediumorchid:			[186,85,211],
	mediumpurple:			[147,112,219],
	mediumseagreen:			[60,179,113],
	mediumslateblue:		[123,104,238],
	mediumspringgreen:		[0,250,154],
	mediumturquoise:		[72,209,204],
	mediumvioletred:		[199,21,133],
	midnightblue:			[25,25,112],
	mintcream:				[245,255,250],
	mistyrose:				[255,228,225],
	moccasin:				[255,228,181],
	navajowhite:			[255,222,173],
	navy:					[0,0,128],
	oldlace:				[253,245,230],
	olive:					[128,128,0],
	olivedrab:				[107,142,35],
	orange:					[255,165,0],
	orangered:				[255,69,0],
	orchid:					[218,112,214],
	palegoldenrod:			[238,232,170],
	palegreen:				[152,251,152],
	paleturquoise:			[175,238,238],
	palevioletred:			[219,112,147],
	papayawhip:				[255,239,213],
	peachpuff:				[255,218,185],
	peru:					[205,133,63],
	pink:					[255,192,203],
	plum:					[221,160,221],
	powderblue:				[176,224,230],
	purple:					[128,0,128],
	red:					[255,0,0],
	rosybrown:				[188,143,143],
	royalblue:				[65,105,225],
	saddlebrown:			[139,69,19],
	salmon:					[250,128,114],
	sandybrown:				[244,164,96],
	seagreen:				[46,139,87],
	seashell:				[255,245,238],
	sienna:					[160,82,45],
	silver:					[192,192,192],
	skyblue:				[135,206,235],
	slateblue:				[106,90,205],
	slategray:				[112,128,144],
	slategrey:				[112,128,144],
	snow:					[255,250,250],
	springgreen:			[0,255,127],
	steelblue:				[70,130,180],
	tan:					[210,180,140],
	teal:					[0,128,128],
	thistle:				[216,191,216],
	tomato:					[255,99,71],
	turquoise:				[64,224,208],
	violet:					[238,130,238],
	wheat:					[245,222,179],
	white:					[255,255,255],
	whitesmoke:				[245,245,245],
	yellow:					[255,255,0],
	yellowgreen:			[154,205,50]
};

})(jQuery)
);

/*
 * jQuery CSS Colour Manipulation 0.6
 *
 * Copyright (c) 2010 Mark Gibson
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Depends:
 *  color.core.js
 *  color.object.js
 */
(function($) {

	// Extract a CSS colour property as a Color object from the selection
	$.fn.cssColor = function(prop) {
		return $.Color(this.css(prop));
	};

	// Apply the colour to a CSS property on the selection
	$.Color.fn.applyCSS = function(selector, prop) {
		$(selector).css(prop, this.toCSS());
		return this;
	};

})(jQuery);


/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* SVG manager.
   Use the singleton instance of this class, $.svg, 
   to interact with the SVG functionality. */
function SVGManager() {
	this._settings = []; // Settings to be remembered per SVG object
	this._extensions = []; // List of SVG extensions added to SVGWrapper
		// for each entry [0] is extension name, [1] is extension class (function)
		// the function takes one parameter - the SVGWrapper instance
	this.regional = []; // Localisations, indexed by language, '' for default (English)
	this.regional[''] = {errorLoadingText: 'Error loading',
		notSupportedText: 'This browser does not support SVG'};
	this.local = this.regional['']; // Current localisation
	this._uuid = new Date().getTime();
	this._renesis = detectActiveX('RenesisX.RenesisCtrl');
}

/* Determine whether a given ActiveX control is available.
   @param  classId  (string) the ID for the ActiveX control
   @return  (boolean) true if found, false if not */
function detectActiveX(classId) {
	try {
		return !!(window.ActiveXObject && new ActiveXObject(classId));
	}
	catch (e) {
		return false;
	}
}

var PROP_NAME = 'svgwrapper';

$.extend(SVGManager.prototype, {
	/* Class name added to elements to indicate already configured with SVG. */
	markerClassName: 'hasSVG',

	/* SVG namespace. */
	svgNS: 'http://www.w3.org/2000/svg',
	/* XLink namespace. */
	xlinkNS: 'http://www.w3.org/1999/xlink',

	/* SVG wrapper class. */
	_wrapperClass: SVGWrapper,

	/* Camel-case versions of attribute names containing dashes or are reserved words. */
	_attrNames: {class_: 'class', in_: 'in',
		alignmentBaseline: 'alignment-baseline', baselineShift: 'baseline-shift',
		clipPath: 'clip-path', clipRule: 'clip-rule',
		colorInterpolation: 'color-interpolation',
		colorInterpolationFilters: 'color-interpolation-filters',
		colorRendering: 'color-rendering', dominantBaseline: 'dominant-baseline',
		enableBackground: 'enable-background', fillOpacity: 'fill-opacity',
		fillRule: 'fill-rule', floodColor: 'flood-color',
		floodOpacity: 'flood-opacity', fontFamily: 'font-family',
		fontSize: 'font-size', fontSizeAdjust: 'font-size-adjust',
		fontStretch: 'font-stretch', fontStyle: 'font-style',
		fontVariant: 'font-variant', fontWeight: 'font-weight',
		glyphOrientationHorizontal: 'glyph-orientation-horizontal',
		glyphOrientationVertical: 'glyph-orientation-vertical',
		horizAdvX: 'horiz-adv-x', horizOriginX: 'horiz-origin-x',
		imageRendering: 'image-rendering', letterSpacing: 'letter-spacing',
		lightingColor: 'lighting-color', markerEnd: 'marker-end',
		markerMid: 'marker-mid', markerStart: 'marker-start',
		stopColor: 'stop-color', stopOpacity: 'stop-opacity',
		strikethroughPosition: 'strikethrough-position',
		strikethroughThickness: 'strikethrough-thickness',
		strokeDashArray: 'stroke-dasharray', strokeDashOffset: 'stroke-dashoffset',
		strokeLineCap: 'stroke-linecap', strokeLineJoin: 'stroke-linejoin',
		strokeMiterLimit: 'stroke-miterlimit', strokeOpacity: 'stroke-opacity',
		strokeWidth: 'stroke-width', textAnchor: 'text-anchor',
		textDecoration: 'text-decoration', textRendering: 'text-rendering',
		underlinePosition: 'underline-position', underlineThickness: 'underline-thickness',
		vertAdvY: 'vert-adv-y', vertOriginY: 'vert-origin-y',
		wordSpacing: 'word-spacing', writingMode: 'writing-mode'},

	/* Add the SVG object to its container. */
	_attachSVG: function(container, settings) {
		var svg = (container.namespaceURI == this.svgNS ? container : null);
		var container = (svg ? null : container);
		if ($(container || svg).hasClass(this.markerClassName)) {
			return;
		}
		if (typeof settings == 'string') {
			settings = {loadURL: settings};
		}
		else if (typeof settings == 'function') {
			settings = {onLoad: settings};
		}
		$(container || svg).addClass(this.markerClassName);
		try {
			if (!svg) {
				svg = document.createElementNS(this.svgNS, 'svg');
				svg.setAttribute('version', '1.1');
				if (container.clientWidth > 0) {
					svg.setAttribute('width', container.clientWidth);
				}
				if (container.clientHeight > 0) {
					svg.setAttribute('height', container.clientHeight);
				}
				container.appendChild(svg);
			}
			this._afterLoad(container, svg, settings || {});
		}
		catch (e) {
			if ($.browser.msie) {
				if (!container.id) {
					container.id = 'svg' + (this._uuid++);
				}
				this._settings[container.id] = settings;
				container.innerHTML = '<embed type="image/svg+xml" width="100%" ' +
					'height="100%" src="' + (settings.initPath || '') + 'blank.svg" ' +
					'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>';
			}
			else {
				container.innerHTML = '<p class="svg_error">' +
					this.local.notSupportedText + '</p>';
			}
		}
	},

	/* SVG callback after loading - register SVG root. */
	_registerSVG: function() {
		for (var i = 0; i < document.embeds.length; i++) { // Check all
			var container = document.embeds[i].parentNode;
			if (!$(container).hasClass($.svg.markerClassName) || // Not SVG
					$.data(container, PROP_NAME)) { // Already done
				continue;
			}
			var svg = null;
			try {
				svg = document.embeds[i].getSVGDocument();
			}
			catch(e) {
				setTimeout($.svg._registerSVG, 250); // Renesis takes longer to load
				return;
			}
			svg = (svg ? svg.documentElement : null);
			if (svg) {
				$.svg._afterLoad(container, svg);
			}
		}
	},

	/* Post-processing once loaded. */
	_afterLoad: function(container, svg, settings) {
		var settings = settings || this._settings[container.id];
		this._settings[container ? container.id : ''] = null;
		var wrapper = new this._wrapperClass(svg, container);
		$.data(container || svg, PROP_NAME, wrapper);
		try {
			if (settings.loadURL) { // Load URL
				wrapper.load(settings.loadURL, settings);
			}
			if (settings.settings) { // Additional settings
				wrapper.configure(settings.settings);
			}
			if (settings.onLoad && !settings.loadURL) { // Onload callback
				settings.onLoad.apply(container || svg, [wrapper]);
			}
		}
		catch (e) {
			alert(e);
		}
	},

	/* Return the SVG wrapper created for a given container.
	   @param  container  (string) selector for the container or
	                      (element) the container for the SVG object or
	                      jQuery collection - first entry is the container
	   @return  (SVGWrapper) the corresponding SVG wrapper element, or null if not attached */
	_getSVG: function(container) {
		container = (typeof container == 'string' ? $(container)[0] :
			(container.jquery ? container[0] : container));
		return $.data(container, PROP_NAME);
	},

	/* Remove the SVG functionality from a div.
	   @param  container  (element) the container for the SVG object */
	_destroySVG: function(container) {
		var $container = $(container);
		if (!$container.hasClass(this.markerClassName)) {
			return;
		}
		$container.removeClass(this.markerClassName);
		if (container.namespaceURI != this.svgNS) {
			$container.empty();
		}
		$.removeData(container, PROP_NAME);
	},

	/* Extend the SVGWrapper object with an embedded class.
	   The constructor function must take a single parameter that is
	   a reference to the owning SVG root object. This allows the 
	   extension to access the basic SVG functionality.
	   @param  name      (string) the name of the SVGWrapper attribute to access the new class
	   @param  extClass  (function) the extension class constructor */
	addExtension: function(name, extClass) {
		this._extensions.push([name, extClass]);
	},

	/* Does this node belong to SVG?
	   @param  node  (element) the node to be tested
	   @return  (boolean) true if an SVG node, false if not */
	isSVGElem: function(node) {
		return (node.nodeType == 1 && node.namespaceURI == $.svg.svgNS);
	}
});

/* The main SVG interface, which encapsulates the SVG element.
   Obtain a reference from $().svg('get') */
function SVGWrapper(svg, container) {
	this._svg = svg; // The SVG root node
	this._container = container; // The containing div
	for (var i = 0; i < $.svg._extensions.length; i++) {
		var extension = $.svg._extensions[i];
		this[extension[0]] = new extension[1](this);
	}
}

$.extend(SVGWrapper.prototype, {

	/* Retrieve the width of the SVG object. */
	_width: function() {
		return (this._container ? this._container.clientWidth : this._svg.width);
	},

	/* Retrieve the height of the SVG object. */
	_height: function() {
		return (this._container ? this._container.clientHeight : this._svg.height);
	},

	/* Retrieve the root SVG element.
	   @return  the top-level SVG element */
	root: function() {
		return this._svg;
	},

	/* Configure a SVG node.
	   @param  node      (element, optional) the node to configure
	   @param  settings  (object) additional settings for the root
	   @param  clear     (boolean) true to remove existing attributes first,
	                     false to add to what is already there (optional)
	   @return  (SVGWrapper) this root */
	configure: function(node, settings, clear) {
		if (!node.nodeName) {
			clear = settings;
			settings = node;
			node = this._svg;
		}
		if (clear) {
			for (var i = node.attributes.length - 1; i >= 0; i--) {
				var attr = node.attributes.item(i);
				if (!(attr.nodeName == 'onload' || attr.nodeName == 'version' || 
						attr.nodeName.substring(0, 5) == 'xmlns')) {
					node.attributes.removeNamedItem(attr.nodeName);
				}
			}
		}
		for (var attrName in settings) {
			node.setAttribute($.svg._attrNames[attrName] || attrName, settings[attrName]);
		}
		return this;
	},

	/* Locate a specific element in the SVG document.
	   @param  id  (string) the element's identifier
	   @return  (element) the element reference, or null if not found */
	getElementById: function(id) {
		return this._svg.ownerDocument.getElementById(id);
	},

	/* Change the attributes for a SVG node.
	   @param  element   (SVG element) the node to change
	   @param  settings  (object) the new settings
	   @return  (SVGWrapper) this root */
	change: function(element, settings) {
		if (element) {
			for (var name in settings) {
				if (settings[name] == null) {
					element.removeAttribute($.svg._attrNames[name] || name);
				}
				else {
					element.setAttribute($.svg._attrNames[name] || name, settings[name]);
				}
			}
		}
		return this;
	},

	/* Check for parent being absent and adjust arguments accordingly. */
	_args: function(values, names, optSettings) {
		names.splice(0, 0, 'parent');
		names.splice(names.length, 0, 'settings');
		var args = {};
		var offset = 0;
		if (values[0] != null && values[0].jquery) {
			values[0] = values[0][0];
		}
		if (values[0] != null && !(typeof values[0] == 'object' && values[0].nodeName)) {
			args['parent'] = null;
			offset = 1;
		}
		for (var i = 0; i < values.length; i++) {
			args[names[i + offset]] = values[i];
		}
		if (optSettings) {
			$.each(optSettings, function(i, value) {
				if (typeof args[value] == 'object') {
					args.settings = args[value];
					args[value] = null;
				}
			});
		}
		return args;
	},

	/* Add a title.
	   @param  parent    (element or jQuery) the parent node for the new title (optional)
	   @param  text      (string) the text of the title
	   @param  settings  (object) additional settings for the title (optional)
	   @return  (element) the new title node */
	title: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'title', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/* Add a description.
	   @param  parent    (element or jQuery) the parent node for the new description (optional)
	   @param  text      (string) the text of the description
	   @param  settings  (object) additional settings for the description (optional)
	   @return  (element) the new description node */
	describe: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'desc', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/* Add a definitions node.
	   @param  parent    (element or jQuery) the parent node for the new definitions (optional)
	   @param  id        (string) the ID of this definitions (optional)
	   @param  settings  (object) additional settings for the definitions (optional)
	   @return  (element) the new definitions node */
	defs: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'defs', $.extend(
			(args.id ? {id: args.id} : {}), args.settings || {}));
	},

	/* Add a symbol definition.
	   @param  parent    (element or jQuery) the parent node for the new symbol (optional)
	   @param  id        (string) the ID of this symbol
	   @param  x1        (number) the left coordinate for this symbol
	   @param  y1        (number) the top coordinate for this symbol
	   @param  width     (number) the width of this symbol
	   @param  height    (number) the height of this symbol
	   @param  settings  (object) additional settings for the symbol (optional)
	   @return  (element) the new symbol node */
	symbol: function(parent, id, x1, y1, width, height, settings) {
		var args = this._args(arguments, ['id', 'x1', 'y1', 'width', 'height']);
		return this._makeNode(args.parent, 'symbol', $.extend({id: args.id,
			viewBox: args.x1 + ' ' + args.y1 + ' ' + args.width + ' ' + args.height},
			args.settings || {}));
	},

	/* Add a marker definition.
	   @param  parent    (element or jQuery) the parent node for the new marker (optional)
	   @param  id        (string) the ID of this marker
	   @param  refX      (number) the x-coordinate for the reference point
	   @param  refY      (number) the y-coordinate for the reference point
	   @param  mWidth    (number) the marker viewport width
	   @param  mHeight   (number) the marker viewport height
	   @param  orient    (string or int) 'auto' or angle (degrees) (optional)
	   @param  settings  (object) additional settings for the marker (optional)
	   @return  (element) the new marker node */
	marker: function(parent, id, refX, refY, mWidth, mHeight, orient, settings) {
		var args = this._args(arguments, ['id', 'refX', 'refY',
			'mWidth', 'mHeight', 'orient'], ['orient']);
		return this._makeNode(args.parent, 'marker', $.extend(
			{id: args.id, refX: args.refX, refY: args.refY, markerWidth: args.mWidth, 
			markerHeight: args.mHeight, orient: args.orient || 'auto'}, args.settings || {}));
	},

	/* Add a style node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  styles    (string) the CSS styles
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new style node */
	style: function(parent, styles, settings) {
		var args = this._args(arguments, ['styles']);
		var node = this._makeNode(args.parent, 'style', $.extend(
			{type: 'text/css'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.styles));
		if ($.browser.opera) {
			$('head').append('<style type="text/css">' + args.styles + '</style>');
		}
		return node;
	},

	/* Add a script node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  script    (string) the JavaScript code
	   @param  type      (string) the MIME type for the code (optional, default 'text/javascript')
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new script node */
	script: function(parent, script, type, settings) {
		var args = this._args(arguments, ['script', 'type'], ['type']);
		var node = this._makeNode(args.parent, 'script', $.extend(
			{type: args.type || 'text/javascript'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.script));
		if (!$.browser.mozilla) {
			$.globalEval(args.script);
		}
		return node;
	},

	/* Add a linear gradient definition.
	   Specify all of x1, y1, x2, y2 or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry is
	                     [0] is offset (0.0-1.0 or 0%-100%), [1] is colour, 
						 [2] is opacity (optional)
	   @param  x1        (number) the x-coordinate of the gradient start (optional)
	   @param  y1        (number) the y-coordinate of the gradient start (optional)
	   @param  x2        (number) the x-coordinate of the gradient end (optional)
	   @param  y2        (number) the y-coordinate of the gradient end (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	linearGradient: function(parent, id, stops, x1, y1, x2, y2, settings) {
		var args = this._args(arguments,
			['id', 'stops', 'x1', 'y1', 'x2', 'y2'], ['x1']);
		var sets = $.extend({id: args.id}, 
			(args.x1 != null ? {x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2} : {}));
		return this._gradient(args.parent, 'linearGradient', 
			$.extend(sets, args.settings || {}), args.stops);
	},

	/* Add a radial gradient definition.
	   Specify all of cx, cy, r, fx, fy or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry
	                     [0] is offset, [1] is colour, [2] is opacity (optional)
	   @param  cx        (number) the x-coordinate of the largest circle centre (optional)
	   @param  cy        (number) the y-coordinate of the largest circle centre (optional)
	   @param  r         (number) the radius of the largest circle (optional)
	   @param  fx        (number) the x-coordinate of the gradient focus (optional)
	   @param  fy        (number) the y-coordinate of the gradient focus (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	radialGradient: function(parent, id, stops, cx, cy, r, fx, fy, settings) {
		var args = this._args(arguments,
			['id', 'stops', 'cx', 'cy', 'r', 'fx', 'fy'], ['cx']);
		var sets = $.extend({id: args.id}, (args.cx != null ?
			{cx: args.cx, cy: args.cy, r: args.r, fx: args.fx, fy: args.fy} : {}));
		return this._gradient(args.parent, 'radialGradient', 
			$.extend(sets, args.settings || {}), args.stops);
	},

	/* Add a gradient node. */
	_gradient: function(parent, name, settings, stops) {
		var node = this._makeNode(parent, name, settings);
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			this._makeNode(node, 'stop', $.extend(
				{offset: stop[0], stopColor: stop[1]}, 
				(stop[2] != null ? {stopOpacity: stop[2]} : {})));
		}
		return node;
	},

	/* Add a pattern definition.
	   Specify all of vx, vy, xwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new pattern (optional)
	   @param  id        (string) the ID for this pattern
	   @param  x         (number) the x-coordinate for the left edge of the pattern
	   @param  y         (number) the y-coordinate for the top edge of the pattern
	   @param  width     (number) the width of the pattern
	   @param  height    (number) the height of the pattern
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the pattern (optional)
	   @return  (element) the new pattern node */
	pattern: function(parent, id, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height',
			'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({id: args.id, x: args.x, y: args.y,
			width: args.width, height: args.height}, (args.vx != null ?
			{viewBox: args.vx + ' ' + args.vy + ' ' + args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'pattern', $.extend(sets, args.settings || {}));
	},

	/* Add a clip path definition.
	   @param  parent  (element) the parent node for the new element (optional)
	   @param  id      (string) the ID for this path
	   @param  units   (string) either 'userSpaceOnUse' (default) or 'objectBoundingBox' (optional)
	   @return  (element) the new clipPath node */
	clipPath: function(parent, id, units, settings) {
		var args = this._args(arguments, ['id', 'units']);
		args.units = args.units || 'userSpaceOnUse';
		return this._makeNode(args.parent, 'clipPath', $.extend(
			{id: args.id, clipPathUnits: args.units}, args.settings || {}));
	},

	/* Add a mask definition.
	   @param  parent    (element or jQuery) the parent node for the new mask (optional)
	   @param  id        (string) the ID for this mask
	   @param  x         (number) the x-coordinate for the left edge of the mask
	   @param  y         (number) the y-coordinate for the top edge of the mask
	   @param  width     (number) the width of the mask
	   @param  height    (number) the height of the mask
	   @param  settings  (object) additional settings for the mask (optional)
	   @return  (element) the new mask node */
	mask: function(parent, id, x, y, width, height, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
		return this._makeNode(args.parent, 'mask', $.extend(
			{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
	},

	/* Create a new path object.
	   @return  (SVGPath) a new path object */
	createPath: function() {
		return new SVGPath();
	},

	/* Create a new text object.
	   @return  (SVGText) a new text object */
	createText: function() {
		return new SVGText();
	},

	/* Add an embedded SVG element.
	   Specify all of vx, vy, vwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node
	   @param  y         (number) the y-coordinate for the top edge of the node
	   @param  width     (number) the width of the node
	   @param  height    (number) the height of the node
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	svg: function(parent, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height',
			'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({x: args.x, y: args.y, width: args.width, height: args.height}, 
			(args.vx != null ? {viewBox: args.vx + ' ' + args.vy + ' ' +
			args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'svg', $.extend(sets, args.settings || {}));
	},

	/* Create a group.
	   @param  parent    (element or jQuery) the parent node for the new group (optional)
	   @param  id        (string) the ID of this group (optional)
	   @param  settings  (object) additional settings for the group (optional)
	   @return  (element) the new group node */
	group: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'g', $.extend({id: args.id}, args.settings || {}));
	},

	/* Add a usage reference.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node (optional)
	   @param  y         (number) the y-coordinate for the top edge of the node (optional)
	   @param  width     (number) the width of the node (optional)
	   @param  height    (number) the height of the node (optional)
	   @param  ref       (string) the ID of the definition node
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	use: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		if (typeof args.x == 'string') {
			args.ref = args.x;
			args.settings = args.y;
			args.x = args.y = args.width = args.height = null;
		}
		var node = this._makeNode(args.parent, 'use', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Add a link, which applies to all child elements.
	   @param  parent    (element or jQuery) the parent node for the new link (optional)
	   @param  ref       (string) the target URL
	   @param  settings  (object) additional settings for the link (optional)
	   @return  (element) the new link node */
	link: function(parent, ref, settings) {
		var args = this._args(arguments, ['ref']);
		var node = this._makeNode(args.parent, 'a', args.settings);
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Add an image.
	   @param  parent    (element or jQuery) the parent node for the new image (optional)
	   @param  x         (number) the x-coordinate for the left edge of the image
	   @param  y         (number) the y-coordinate for the top edge of the image
	   @param  width     (number) the width of the image
	   @param  height    (number) the height of the image
	   @param  ref       (string) the path to the image
	   @param  settings  (object) additional settings for the image (optional)
	   @return  (element) the new image node */
	image: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		var node = this._makeNode(args.parent, 'image', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/* Draw a path.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  path      (string or SVGPath) the path to draw
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	path: function(parent, path, settings) {
		var args = this._args(arguments, ['path']);
		return this._makeNode(args.parent, 'path', $.extend(
			{d: (args.path.path ? args.path.path() : args.path)}, args.settings || {}));
	},

	/* Draw a rectangle.
	   Specify both of rx and ry or neither.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x         (number) the x-coordinate for the left edge of the rectangle
	   @param  y         (number) the y-coordinate for the top edge of the rectangle
	   @param  width     (number) the width of the rectangle
	   @param  height    (number) the height of the rectangle
	   @param  rx        (number) the x-radius of the ellipse for the rounded corners (optional)
	   @param  ry        (number) the y-radius of the ellipse for the rounded corners (optional)
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	rect: function(parent, x, y, width, height, rx, ry, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'rx', 'ry'], ['rx']);
		return this._makeNode(args.parent, 'rect', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			(args.rx ? {rx: args.rx, ry: args.ry} : {}), args.settings || {}));
	},

	/* Draw a circle.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the circle
	   @param  cy        (number) the y-coordinate for the centre of the circle
	   @param  r         (number) the radius of the circle
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	circle: function(parent, cx, cy, r, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'r']);
		return this._makeNode(args.parent, 'circle', $.extend(
			{cx: args.cx, cy: args.cy, r: args.r}, args.settings || {}));
	},

	/* Draw an ellipse.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the ellipse
	   @param  cy        (number) the y-coordinate for the centre of the ellipse
	   @param  rx        (number) the x-radius of the ellipse
	   @param  ry        (number) the y-radius of the ellipse
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	ellipse: function(parent, cx, cy, rx, ry, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'rx', 'ry']);
		return this._makeNode(args.parent, 'ellipse', $.extend(
			{cx: args.cx, cy: args.cy, rx: args.rx, ry: args.ry}, args.settings || {}));
	},

	/* Draw a line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x1        (number) the x-coordinate for the start of the line
	   @param  y1        (number) the y-coordinate for the start of the line
	   @param  x2        (number) the x-coordinate for the end of the line
	   @param  y2        (number) the y-coordinate for the end of the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	line: function(parent, x1, y1, x2, y2, settings) {
		var args = this._args(arguments, ['x1', 'y1', 'x2', 'y2']);
		return this._makeNode(args.parent, 'line', $.extend(
			{x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2}, args.settings || {}));
	},

	/* Draw a polygonal line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polyline: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polyline', args.points, args.settings);
	},

	/* Draw a polygonal shape.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the shape
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polygon: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polygon', args.points, args.settings);
	},

	/* Draw a polygonal line or shape. */
	_poly: function(parent, name, points, settings) {
		var ps = '';
		for (var i = 0; i < points.length; i++) {
			ps += points[i].join() + ' ';
		}
		return this._makeNode(parent, name, $.extend(
			{points: $.trim(ps)}, settings || {}));
	},

	/* Draw text.
	   Specify both of x and y or neither of them.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  x         (number or number[]) the x-coordinate(s) for the text (optional)
	   @param  y         (number or number[]) the y-coordinate(s) for the text (optional)
	   @param  value     (string) the text content or
	                     (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	text: function(parent, x, y, value, settings) {
		var args = this._args(arguments, ['x', 'y', 'value']);
		if (typeof args.x == 'string' && arguments.length < 4) {
			args.value = args.x;
			args.settings = args.y;
			args.x = args.y = null;
		}
		return this._text(args.parent, 'text', args.value, $.extend(
			{x: (args.x && isArray(args.x) ? args.x.join(' ') : args.x),
			y: (args.y && isArray(args.y) ? args.y.join(' ') : args.y)}, 
			args.settings || {}));
	},

	/* Draw text along a path.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  path      (string) the ID of the path
	   @param  value     (string) the text content or
	                     (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	textpath: function(parent, path, value, settings) {
		var args = this._args(arguments, ['path', 'value']);
		var node = this._text(args.parent, 'textPath', args.value, args.settings || {});
		node.setAttributeNS($.svg.xlinkNS, 'href', args.path);
		return node;
	},

	/* Draw text. */
	_text: function(parent, name, value, settings) {
		var node = this._makeNode(parent, name, settings);
		if (typeof value == 'string') {
			node.appendChild(node.ownerDocument.createTextNode(value));
		}
		else {
			for (var i = 0; i < value._parts.length; i++) {
				var part = value._parts[i];
				if (part[0] == 'tspan') {
					var child = this._makeNode(node, part[0], part[2]);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else if (part[0] == 'tref') {
					var child = this._makeNode(node, part[0], part[2]);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[1]);
					node.appendChild(child);
				}
				else if (part[0] == 'textpath') {
					var set = $.extend({}, part[2]);
					set.href = null;
					var child = this._makeNode(node, part[0], set);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[2].href);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else { // straight text
					node.appendChild(node.ownerDocument.createTextNode(part[1]));
				}
			}
		}
		return node;
	},

	/* Add a custom SVG element.
	   @param  parent    (element or jQuery) the parent node for the new element (optional)
	   @param  name      (string) the name of the element
	   @param  settings  (object) additional settings for the element (optional)
	   @return  (element) the new custom node */
	other: function(parent, name, settings) {
		var args = this._args(arguments, ['name']);
		return this._makeNode(args.parent, args.name, args.settings || {});
	},

	/* Create a shape node with the given settings. */
	_makeNode: function(parent, name, settings) {
		parent = parent || this._svg;
		var node = this._svg.ownerDocument.createElementNS($.svg.svgNS, name);
		for (var name in settings) {
			var value = settings[name];
			if (value != null && value != null && 
					(typeof value != 'string' || value != '')) {
				node.setAttribute($.svg._attrNames[name] || name, value);
			}
		}
		parent.appendChild(node);
		return node;
	},

	/* Add an existing SVG node to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	                   (string) the jQuery selector for the node or
	                   (jQuery collection) set of nodes to add
	   @return  (SVGWrapper) this wrapper */
	add: function(parent, node) {
		var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
		var svg = this;
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		try {
			if ($.svg._renesis) {
				throw 'Force traversal';
			}
			args.parent.appendChild(args.node.cloneNode(true));
		}
		catch (e) {
			args.node.each(function() {
				var child = svg._cloneAsSVG(this);
				if (child) {
					args.parent.appendChild(child);
				}
			});
		}
		return this;
	},

	/* Clone an existing SVG node and add it to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	                   (string) the jQuery selector for the node or
	                   (jQuery collection) set of nodes to add
	   @return  (element[]) collection of new nodes */
	clone: function(parent, node) {
		var svg = this;
		var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		var newNodes = [];
		args.node.each(function() {
			var child = svg._cloneAsSVG(this);
			if (child) {
				child.id = '';
				args.parent.appendChild(child);
				newNodes.push(child);
			}
		});
		return newNodes;
	},

	/* SVG nodes must belong to the SVG namespace, so clone and ensure this is so.
	   @param  node  (element) the SVG node to clone
	   @return  (element) the cloned node */
	_cloneAsSVG: function(node) {
		var newNode = null;
		if (node.nodeType == 1) { // element
			newNode = this._svg.ownerDocument.createElementNS(
				$.svg.svgNS, this._checkName(node.nodeName));
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				if (attr.nodeName != 'xmlns' && attr.nodeValue) {
					if (attr.prefix == 'xlink') {
						newNode.setAttributeNS($.svg.xlinkNS,
							attr.localName || attr.baseName, attr.nodeValue);
					}
					else {
						newNode.setAttribute(this._checkName(attr.nodeName), attr.nodeValue);
					}
				}
			}
			for (var i = 0; i < node.childNodes.length; i++) {
				var child = this._cloneAsSVG(node.childNodes[i]);
				if (child) {
					newNode.appendChild(child);
				}
			}
		}
		else if (node.nodeType == 3) { // text
			if ($.trim(node.nodeValue)) {
				newNode = this._svg.ownerDocument.createTextNode(node.nodeValue);
			}
		}
		else if (node.nodeType == 4) { // CDATA
			if ($.trim(node.nodeValue)) {
				try {
					newNode = this._svg.ownerDocument.createCDATASection(node.nodeValue);
				}
				catch (e) {
					newNode = this._svg.ownerDocument.createTextNode(
						node.nodeValue.replace(/&/g, '&amp;').
						replace(/</g, '&lt;').replace(/>/g, '&gt;'));
				}
			}
		}
		return newNode;
	},

	/* Node names must be lower case and without SVG namespace prefix. */
	_checkName: function(name) {
		name = (name.substring(0, 1) >= 'A' && name.substring(0, 1) <= 'Z' ?
			name.toLowerCase() : name);
		return (name.substring(0, 4) == 'svg:' ? name.substring(4) : name);
	},

	/* Load an external SVG document.
	   @param  url       (string) the location of the SVG document or
	                     the actual SVG content
	   @param  settings  (boolean) see addTo below or
	                     (function) see onLoad below or
	                     (object) additional settings for the load with attributes below:
	                       addTo       (boolean) true to add to what's already there,
	                                   or false to clear the canvas first
						   changeSize  (boolean) true to allow the canvas size to change,
	                                   or false to retain the original
	                       onLoad      (function) callback after the document has loaded,
	                                   'this' is the container, receives SVG object and
	                                   optional error message as a parameter
	                       parent      (string or element or jQuery) the parent to load
	                                   into, defaults to top-level svg element
	   @return  (SVGWrapper) this root */
	load: function(url, settings) {
		settings = (typeof settings == 'boolean' ? {addTo: settings} :
			(typeof settings == 'function' ? {onLoad: settings} :
			(typeof settings == 'string' ? {parent: settings} : 
			(typeof settings == 'object' && settings.nodeName ? {parent: settings} :
			(typeof settings == 'object' && settings.jquery ? {parent: settings} :
			settings || {})))));
		if (!settings.parent && !settings.addTo) {
			this.clear(false);
		}
		var size = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
		var wrapper = this;
		// Report a problem with the load
		var reportError = function(message) {
			message = $.svg.local.errorLoadingText + ': ' + message;
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper, message]);
			}
			else {
				wrapper.text(null, 10, 20, message);
			}
		};
		// Create a DOM from SVG content
		var loadXML4IE = function(data) {
			var xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.validateOnParse = false;
			xml.resolveExternals = false;
			xml.async = false;
			xml.loadXML(data);
			if (xml.parseError.errorCode != 0) {
				reportError(xml.parseError.reason);
				return null;
			}
			return xml;
		};
		// Load the SVG DOM
		var loadSVG = function(data) {
			if (!data) {
				return;
			}
			if (data.documentElement.nodeName != 'svg') {
				var errors = data.getElementsByTagName('parsererror');
				var messages = (errors.length ? errors[0].getElementsByTagName('div') : []); // Safari
				reportError(!errors.length ? '???' :
					(messages.length ? messages[0] : errors[0]).firstChild.nodeValue);
				return;
			}
			var parent = (settings.parent ? $(settings.parent)[0] : wrapper._svg);
			var attrs = {};
			for (var i = 0; i < data.documentElement.attributes.length; i++) {
				var attr = data.documentElement.attributes.item(i);
				if (!(attr.nodeName == 'version' || attr.nodeName.substring(0, 5) == 'xmlns')) {
					attrs[attr.nodeName] = attr.nodeValue;
				}
			}
			wrapper.configure(parent, attrs, !settings.parent);
			var nodes = data.documentElement.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				try {
					if ($.svg._renesis) {
						throw 'Force traversal';
					}
					parent.appendChild(wrapper._svg.ownerDocument.importNode(nodes[i], true));
					if (nodes[i].nodeName == 'script') {
						$.globalEval(nodes[i].textContent);
					}
				}
				catch (e) {
					wrapper.add(parent, nodes[i]);
				}
			}
			if (!settings.changeSize) {
				wrapper.configure(parent, {width: size[0], height: size[1]});
			}
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper]);
			}
		};
		if (url.match('<svg')) { // Inline SVG
			loadSVG($.browser.msie ? loadXML4IE(url) :
				new DOMParser().parseFromString(url, 'text/xml'));
		}
		else { // Remote SVG
			$.ajax({url: url, dataType: ($.browser.msie ? 'text' : 'xml'),
				success: function(xml) {
					loadSVG($.browser.msie ? loadXML4IE(xml) : xml);
				}, error: function(http, message, exc) {
					reportError(message + (exc ? ' ' + exc.message : ''));
				}});
		}
		return this;
	},

	/* Delete a specified node.
	   @param  node  (element or jQuery) the drawing node to remove
	   @return  (SVGWrapper) this root */
	remove: function(node) {
		node = (node.jquery ? node[0] : node);
		node.parentNode.removeChild(node);
		return this;
	},

	/* Delete everything in the current document.
	   @param  attrsToo  (boolean) true to clear any root attributes as well,
	                     false to leave them (optional)
	   @return  (SVGWrapper) this root */
	clear: function(attrsToo) {
		if (attrsToo) {
			this.configure({}, true);
		}
		while (this._svg.firstChild) {
			this._svg.removeChild(this._svg.firstChild);
		}
		return this;
	},

	/* Serialise the current diagram into an SVG text document.
	   @param  node  (SVG element) the starting node (optional)
	   @return  (string) the SVG as text */
	toSVG: function(node) {
		node = node || this._svg;
		return (typeof XMLSerializer == 'undefined' ? this._toSVG(node) :
			new XMLSerializer().serializeToString(node));
	},

	/* Serialise one node in the SVG hierarchy. */
	_toSVG: function(node) {
		var svgDoc = '';
		if (!node) {
			return svgDoc;
		}
		if (node.nodeType == 3) { // Text
			svgDoc = node.nodeValue;
		}
		else if (node.nodeType == 4) { // CDATA
			svgDoc = '<![CDATA[' + node.nodeValue + ']]>';
		}
		else { // Element
			svgDoc = '<' + node.nodeName;
			if (node.attributes) {
				for (var i = 0; i < node.attributes.length; i++) {
					var attr = node.attributes.item(i);
					if (!($.trim(attr.nodeValue) == '' || attr.nodeValue.match(/^\[object/) ||
							attr.nodeValue.match(/^function/))) {
						svgDoc += ' ' + (attr.namespaceURI == $.svg.xlinkNS ? 'xlink:' : '') + 
							attr.nodeName + '="' + attr.nodeValue + '"';
					}
				}
			}	
			if (node.firstChild) {
				svgDoc += '>';
				var child = node.firstChild;
				while (child) {
					svgDoc += this._toSVG(child);
					child = child.nextSibling;
				}
				svgDoc += '</' + node.nodeName + '>';
			}
				else {
				svgDoc += '/>';
			}
		}
		return svgDoc;
	}
});

/* Helper to generate an SVG path.
   Obtain an instance from the SVGWrapper object.
   String calls together to generate the path and use its value:
   var path = root.createPath();
   root.path(null, path.move(100, 100).line(300, 100).line(200, 300).close(), {fill: 'red'});
   or
   root.path(null, path.move(100, 100).line([[300, 100], [200, 300]]).close(), {fill: 'red'}); */
function SVGPath() {
	this._path = '';
}

$.extend(SVGPath.prototype, {
	/* Prepare to create a new path.
	   @return  (SVGPath) this path */
	reset: function() {
		this._path = '';
		return this;
	},

	/* Move the pointer to a position.
	   @param  x         (number) x-coordinate to move to or
	                     (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	move: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'm' : 'M'), x, y);
	},

	/* Draw a line to a position.
	   @param  x         (number) x-coordinate to move to or
	                     (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	line: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'l' : 'L'), x, y);
	},

	/* Draw a horizontal line to a position.
	   @param  x         (number) x-coordinate to draw to or
	                     (number[]) x-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	horiz: function(x, relative) {
		this._path += (relative ? 'h' : 'H') + (isArray(x) ? x.join(' ') : x);
		return this;
	},

	/* Draw a vertical line to a position.
	   @param  y         (number) y-coordinate to draw to or
	                     (number[]) y-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	vert: function(y, relative) {
		this._path += (relative ? 'v' : 'V') + (isArray(y) ? y.join(' ') : y);
		return this;
	},

	/* Draw a cubic Bézier curve.
	   @param  x1        (number) x-coordinate of beginning control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of beginning control point (omitted if x1 is array)
	   @param  x2        (number) x-coordinate of ending control point (omitted if x1 is array)
	   @param  y2        (number) y-coordinate of ending control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveC: function(x1, y1, x2, y2, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'c' : 'C'), x1, y1, x2, y2, x, y);
	},

	/* Continue a cubic Bézier curve.
	   Starting control point is the reflection of the previous end control point.
	   @param  x2        (number) x-coordinate of ending control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y2        (number) y-coordinate of ending control point (omitted if x2 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x2 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x2 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothC: function(x2, y2, x, y, relative) {
		relative = (isArray(x2) ? y2 : relative);
		return this._coords((relative ? 's' : 'S'), x2, y2, x, y);
	},

	/* Draw a quadratic Bézier curve.
	   @param  x1        (number) x-coordinate of control point or
	                     (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveQ: function(x1, y1, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'q' : 'Q'), x1, y1, x, y);
	},

	/* Continue a quadratic Bézier curve.
	   Control point is the reflection of the previous control point.
	   @param  x         (number) x-coordinate of curve end or
	                     (number[][]) x-/y-coordinates of points to draw to
	   @param  y         (number) y-coordinate of curve end (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothQ: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 't' : 'T'), x, y);
	},

	/* Generate a path command with (a list of) coordinates. */
	_coords: function(cmd, x1, y1, x2, y2, x3, y3) {
		if (isArray(x1)) {
			for (var i = 0; i < x1.length; i++) {
				var cs = x1[i];
				this._path += (i == 0 ? cmd : ' ') + cs[0] + ',' + cs[1] +
					(cs.length < 4 ? '' : ' ' + cs[2] + ',' + cs[3] +
					(cs.length < 6 ? '': ' ' + cs[4] + ',' + cs[5]));
			}
		}
		else {
			this._path += cmd + x1 + ',' + y1 + 
				(x2 == null ? '' : ' ' + x2 + ',' + y2 +
				(x3 == null ? '' : ' ' + x3 + ',' + y3));
		}
		return this;
	},

	/* Draw an arc to a position.
	   @param  rx         (number) x-radius of arc or
	                      (number/boolean[][]) x-/y-coordinates and flags for points to draw to
	   @param  ry         (number) y-radius of arc (omitted if rx is array)
	   @param  xRotate    (number) x-axis rotation (degrees, clockwise) (omitted if rx is array)
	   @param  large      (boolean) true to draw the large part of the arc,
	                      false to draw the small part (omitted if rx is array)
	   @param  clockwise  (boolean) true to draw the clockwise arc,
	                      false to draw the anti-clockwise arc (omitted if rx is array)
	   @param  x          (number) x-coordinate of arc end (omitted if rx is array)
	   @param  y          (number) y-coordinate of arc end (omitted if rx is array)
	   @param  relative   (boolean) true for coordinates relative to the current point,
	                      false for coordinates being absolute
	   @return  (SVGPath) this path */
	arc: function(rx, ry, xRotate, large, clockwise, x, y, relative) {
		relative = (isArray(rx) ? ry : relative);
		this._path += (relative ? 'a' : 'A');
		if (isArray(rx)) {
			for (var i = 0; i < rx.length; i++) {
				var cs = rx[i];
				this._path += (i == 0 ? '' : ' ') + cs[0] + ',' + cs[1] + ' ' +
					cs[2] + ' ' + (cs[3] ? '1' : '0') + ',' +
					(cs[4] ? '1' : '0') + ' ' + cs[5] + ',' + cs[6];
			}
		}
		else {
			this._path += rx + ',' + ry + ' ' + xRotate + ' ' +
				(large ? '1' : '0') + ',' + (clockwise ? '1' : '0') + ' ' + x + ',' + y;
		}
		return this;
	},

	/* Close the current path.
	   @return  (SVGPath) this path */
	close: function() {
		this._path += 'z';
		return this;
	},

	/* Return the string rendering of the specified path.
	   @return  (string) stringified path */
	path: function() {
		return this._path;
	}
});

SVGPath.prototype.moveTo = SVGPath.prototype.move;
SVGPath.prototype.lineTo = SVGPath.prototype.line;
SVGPath.prototype.horizTo = SVGPath.prototype.horiz;
SVGPath.prototype.vertTo = SVGPath.prototype.vert;
SVGPath.prototype.curveCTo = SVGPath.prototype.curveC;
SVGPath.prototype.smoothCTo = SVGPath.prototype.smoothC;
SVGPath.prototype.curveQTo = SVGPath.prototype.curveQ;
SVGPath.prototype.smoothQTo = SVGPath.prototype.smoothQ;
SVGPath.prototype.arcTo = SVGPath.prototype.arc;

/* Helper to generate an SVG text object.
   Obtain an instance from the SVGWrapper object.
   String calls together to generate the text and use its value:
   var text = root.createText();
   root.text(null, x, y, text.string('This is ').
     span('red', {fill: 'red'}).string('!'), {fill: 'blue'}); */
function SVGText() {
	this._parts = []; // The components of the text object
}

$.extend(SVGText.prototype, {
	/* Prepare to create a new text object.
	   @return  (SVGText) this text */
	reset: function() {
		this._parts = [];
		return this;
	},

	/* Add a straight string value.
	   @param  value  (string) the actual text
	   @return  (SVGText) this text object */
	string: function(value) {
		this._parts[this._parts.length] = ['text', value];
		return this;
	},

	/* Add a separate text span that has its own settings.
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	span: function(value, settings) {
		this._parts[this._parts.length] = ['tspan', value, settings];
		return this;
	},

	/* Add a reference to a previously defined text string.
	   @param  id        (string) the ID of the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	ref: function(id, settings) {
		this._parts[this._parts.length] = ['tref', id, settings];
		return this;
	},

	/* Add text drawn along a path.
	   @param  id        (string) the ID of the path
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	path: function(id, value, settings) {
		this._parts[this._parts.length] = ['textpath', value, 
			$.extend({href: id}, settings || {})];
		return this;
	}
});

/* Attach the SVG functionality to a jQuery selection.
   @param  command  (string) the command to run (optional, default 'attach')
   @param  options  (object) the new settings to use for these SVG instances
   @return jQuery (object) for chaining further calls */
$.fn.svg = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && options == 'get') {
		return $.svg['_' + options + 'SVG'].apply($.svg, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			$.svg['_' + options + 'SVG'].apply($.svg, [this].concat(otherArgs));
		}
		else {
			$.svg._attachSVG(this, options || {});
		} 
	});
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && a.constructor == Array);
}

// Singleton primary SVG interface
$.svg = new SVGManager();

})(jQuery);

/*****
*
*   The contents of this file were written by Kevin Lindsey
*   copyright 2002 Kevin Lindsey
*
*   This file was compacted by jscompact
*   A Perl utility written by Kevin Lindsey (kevin@kevlindev.com)
*
*****/

Array.prototype.foreach=function(func){for(var i=0;i<this.length;i++)func(this[i]);};
Array.prototype.map=function(func){var result=new Array();for(var i=0;i<this.length;i++)result.push(func(this[i]));return result;};
Array.prototype.min=function(){var min=this[0];for(var i=0;i<this.length;i++)if(this[i]<min)min=this[i];return min;}
Array.prototype.max=function(){var max=this[0];for(var i=0;i<this.length;i++)if(this[i]>max)max=this[i];return max;}
AntiZoomAndPan.VERSION="1.2"
function AntiZoomAndPan(){this.init();}
AntiZoomAndPan.prototype.init=function(){var svgRoot=svgDocument.documentElement;this.svgNodes=new Array();this.x_trans=0;this.y_trans=0;this.scale=1;this.lastTM=svgRoot.createSVGMatrix();svgRoot.addEventListener('SVGZoom',this,false);svgRoot.addEventListener('SVGScroll',this,false);svgRoot.addEventListener('SVGResize',this,false);};
AntiZoomAndPan.prototype.appendNode=function(svgNode){this.svgNodes.push(svgNode);};
AntiZoomAndPan.prototype.removeNode=function(svgNode){for(var i=0;i<this.svgNodes.length;i++){if(this.svgNodes[i]===svgNode){this.svgNodes.splice(i,1);break;}}};
AntiZoomAndPan.prototype.handleEvent=function(e){var type=e.type;if(this[type]==null)throw new Error("Unsupported event type: "+type);this[type](e);};
AntiZoomAndPan.prototype.SVGZoom=function(e){this.update();};
AntiZoomAndPan.prototype.SVGScroll=function(e){this.update();};
AntiZoomAndPan.prototype.SVGResize=function(e){this.update();};
AntiZoomAndPan.prototype.update=function(){if(this.svgNodes.length>0){var svgRoot=svgDocument.documentElement;var viewbox=(window.ViewBox!=null)?new ViewBox(svgRoot):null;var matrix=(viewbox!=null)?viewbox.getTM():svgRoot.createSVGMatrix();var trans=svgRoot.currentTranslate;matrix=matrix.scale(1.0/svgRoot.currentScale);matrix=matrix.translate(-trans.x,-trans.y);for(var i=0;i<this.svgNodes.length;i++){var node=this.svgNodes[i];var CTM=matrix.multiply(this.lastTM.multiply(node.getCTM()));var transform="matrix("+[CTM.a,CTM.b,CTM.c,CTM.d,CTM.e,CTM.f].join(",")+")";this.svgNodes[i].setAttributeNS(null,"transform",transform);}this.lastTM=matrix.inverse();}};
EventHandler.VERSION=1.0;
function EventHandler(){this.init();};
EventHandler.prototype.init=function(){};
EventHandler.prototype.handleEvent=function(e){if(this[e.type]==null)throw new Error("Unsupported event type: "+e.type);this[e.type](e);};var svgns="http://www.w3.org/2000/svg";
Mouser.prototype=new EventHandler();
Mouser.prototype.constructor=Mouser;
Mouser.superclass=EventHandler.prototype;
function Mouser(){this.init();}
Mouser.prototype.init=function(){this.svgNode=null;this.handles=new Array();this.shapes=new Array();this.lastPoint=null;this.currentNode=null;this.realize();};
Mouser.prototype.realize=function(){if(this.svgNode==null){var rect=svgDocument.createElementNS(svgns,"rect");this.svgNode=rect;rect.setAttributeNS(null,"x","-32767");rect.setAttributeNS(null,"y","-32767");rect.setAttributeNS(null,"width","65535");rect.setAttributeNS(null,"height","65535");rect.setAttributeNS(null,"fill","none");rect.setAttributeNS(null,"pointer-events","all");rect.setAttributeNS(null,"display","none");svgDocument.documentElement.appendChild(rect);}};
Mouser.prototype.register=function(handle){if(this.handleIndex(handle)==-1){var owner=handle.owner;handle.select(true);this.handles.push(handle);if(owner!=null&&this.shapeIndex(owner)==-1)this.shapes.push(owner);}};
Mouser.prototype.unregister=function(handle){var index=this.handleIndex(handle);if(index!=-1){handle.select(false);this.handles.splice(index,1);}};
Mouser.prototype.registerShape=function(shape){if(this.shapeIndex(shape)==-1){shape.select(true);this.shapes.push(shape);}};
Mouser.prototype.unregisterShape=function(shape){var index=this.shapeIndex(shape);if(index!=-1){shape.select(false);shape.selectHandles(false);shape.showHandles(false);shape.unregisterHandles();this.shapes.splice(index,1);}};
Mouser.prototype.unregisterAll=function(){for(var i=0;i<this.handles.length;i++){this.handles[i].select(false);}this.handles=new Array();};
Mouser.prototype.unregisterShapes=function(){for(var i=0;i<this.shapes.length;i++){var shape=this.shapes[i];shape.select(false);shape.selectHandles(false);shape.showHandles(false);shape.unregisterHandles();}this.shapes=new Array();};
Mouser.prototype.handleIndex=function(handle){var result=-1;for(var i=0;i<this.handles.length;i++){if(this.handles[i]===handle){result=i;break;}}return result;};
Mouser.prototype.shapeIndex=function(shape){var result=-1;for(var i=0;i<this.shapes.length;i++){if(this.shapes[i]===shape){result=i;break;}}return result;};
Mouser.prototype.beginDrag=function(e){this.currentNode=e.target;var svgPoint=this.getUserCoordinate(this.currentNode,e.clientX,e.clientY);this.lastPoint=new Point2D(svgPoint.x,svgPoint.y);this.svgNode.addEventListener("mouseup",this,false);this.svgNode.addEventListener("mousemove",this,false);svgDocument.documentElement.appendChild(this.svgNode);this.svgNode.setAttributeNS(null,"display","inline");};
Mouser.prototype.mouseup=function(e){this.lastPoint=null;this.currentNode=null;this.svgNode.removeEventListener("mouseup",this,false);this.svgNode.removeEventListener("mousemove",this,false);this.svgNode.setAttributeNS(null,"display","none");};
Mouser.prototype.mousemove=function(e){var svgPoint=this.getUserCoordinate(this.currentNode,e.clientX,e.clientY);var newPoint=new Point2D(svgPoint.x,svgPoint.y);var delta=newPoint.subtract(this.lastPoint);var updates=new Array();var updateId=new Date().getTime();this.lastPoint.setFromPoint(newPoint);for(var i=0;i<this.handles.length;i++){var handle=this.handles[i];var owner=handle.owner;handle.translate(delta);if(owner!=null){if(owner.lastUpdate!=updateId){owner.lastUpdate=updateId;updates.push(owner);}}else{updates.push(handle);}}for(var i=0;i<updates.length;i++){updates[i].update();}};
Mouser.prototype.getUserCoordinate=function(node,x,y){var svgRoot=svgDocument.documentElement;var pan=svgRoot.getCurrentTranslate();var zoom=svgRoot.getCurrentScale();var CTM=this.getTransformToElement(node);var iCTM=CTM.inverse();var worldPoint=svgDocument.documentElement.createSVGPoint();worldPoint.x=(x-pan.x)/zoom;worldPoint.y=(y-pan.y)/zoom;return worldPoint.matrixTransform(iCTM);};
Mouser.prototype.getTransformToElement=function(node){var CTM=node.getCTM();while((node=node.parentNode)!=svgDocument){CTM=node.getCTM().multiply(CTM);}return CTM;};
ViewBox.VERSION="1.0";
function ViewBox(svgNode){if(arguments.length>0){this.init(svgNode);}}
ViewBox.prototype.init=function(svgNode){var viewBox=svgNode.getAttributeNS(null,"viewBox");var preserveAspectRatio=svgNode.getAttributeNS(null,"preserveAspectRatio");if(viewBox!=""){var params=viewBox.split(/\s*,\s*|\s+/);this.x=parseFloat(params[0]);this.y=parseFloat(params[1]);this.width=parseFloat(params[2]);this.height=parseFloat(params[3]);}else{this.x=0;this.y=0;this.width=innerWidth;this.height=innerHeight;}this.setPAR(preserveAspectRatio);};
ViewBox.prototype.getTM=function(){var svgRoot=svgDocument.documentElement;var matrix=svgDocument.documentElement.createSVGMatrix();var windowWidth=svgRoot.getAttributeNS(null,"width");var windowHeight=svgRoot.getAttributeNS(null,"height");windowWidth=(windowWidth!="")?parseFloat(windowWidth):innerWidth;windowHeight=(windowHeight!="")?parseFloat(windowHeight):innerHeight;var x_ratio=this.width/windowWidth;var y_ratio=this.height/windowHeight;matrix=matrix.translate(this.x,this.y);if(this.alignX=="none"){matrix=matrix.scaleNonUniform(x_ratio,y_ratio);}else{if(x_ratio<y_ratio&&this.meetOrSlice=="meet"||x_ratio>y_ratio&&this.meetOrSlice=="slice"){var x_trans=0;var x_diff=windowWidth*y_ratio-this.width;if(this.alignX=="Mid")x_trans=-x_diff/2;else if(this.alignX=="Max")x_trans=-x_diff;matrix=matrix.translate(x_trans,0);matrix=matrix.scale(y_ratio);}else if(x_ratio>y_ratio&&this.meetOrSlice=="meet"||x_ratio<y_ratio&&this.meetOrSlice=="slice"){var y_trans=0;var y_diff=windowHeight*x_ratio-this.height;if(this.alignY=="Mid")y_trans=-y_diff/2;else if(this.alignY=="Max")y_trans=-y_diff;matrix=matrix.translate(0,y_trans);matrix=matrix.scale(x_ratio);}else{matrix=matrix.scale(x_ratio);}}return matrix;}
ViewBox.prototype.setPAR=function(PAR){if(PAR){var params=PAR.split(/\s+/);var align=params[0];if(align=="none"){this.alignX="none";this.alignY="none";}else{this.alignX=align.substring(1,4);this.alignY=align.substring(5,9);}if(params.length==2){this.meetOrSlice=params[1];}else{this.meetOrSlice="meet";}}else{this.align="xMidYMid";this.alignX="Mid";this.alignY="Mid";this.meetOrSlice="meet";}};
function Intersection(status){if(arguments.length>0){this.init(status);}}
Intersection.prototype.init=function(status){this.status=status;this.points=new Array();};
Intersection.prototype.appendPoint=function(point){this.points.push(point);};
Intersection.prototype.appendPoints=function(points){this.points=this.points.concat(points);};
Intersection.intersectShapes=function(shape1,shape2){var ip1=shape1.getIntersectionParams();var ip2=shape2.getIntersectionParams();var result;if(ip1!=null&&ip2!=null){if(ip1.name=="Path"){result=Intersection.intersectPathShape(shape1,shape2);}else if(ip2.name=="Path"){result=Intersection.intersectPathShape(shape2,shape1);}else{var method;var params;if(ip1.name<ip2.name){method="intersect"+ip1.name+ip2.name;params=ip1.params.concat(ip2.params);}else{method="intersect"+ip2.name+ip1.name;params=ip2.params.concat(ip1.params);}if(!(method in Intersection))throw new Error("Intersection not available: "+method);result=Intersection[method].apply(null,params);}}else{result=new Intersection("No Intersection");}return result;};
Intersection.intersectPathShape=function(path,shape){return path.intersectShape(shape);};
Intersection.intersectBezier2Bezier2=function(a1,a2,a3,b1,b2,b3){var a,b;var c12,c11,c10;var c22,c21,c20;var TOLERANCE=1e-4;var result=new Intersection("No Intersection");a=a2.multiply(-2);c12=a1.add(a.add(a3));a=a1.multiply(-2);b=a2.multiply(2);c11=a.add(b);c10=new Point2D(a1.x,a1.y);a=b2.multiply(-2);c22=b1.add(a.add(b3));a=b1.multiply(-2);b=b2.multiply(2);c21=a.add(b);c20=new Point2D(b1.x,b1.y);var a=c12.x*c11.y-c11.x*c12.y;var b=c22.x*c11.y-c11.x*c22.y;var c=c21.x*c11.y-c11.x*c21.y;var d=c11.x*(c10.y-c20.y)+c11.y*(-c10.x+c20.x);var e=c22.x*c12.y-c12.x*c22.y;var f=c21.x*c12.y-c12.x*c21.y;var g=c12.x*(c10.y-c20.y)+c12.y*(-c10.x+c20.x);var poly=new Polynomial(-e*e,-2*e*f,a*b-f*f-2*e*g,a*c-2*f*g,a*d-g*g);var roots=poly.getRoots();for(var i=0;i<roots.length;i++){var s=roots[i];if(0<=s&&s<=1){var xRoots=new Polynomial(-c12.x,-c11.x,-c10.x+c20.x+s*c21.x+s*s*c22.x).getRoots();var yRoots=new Polynomial(-c12.y,-c11.y,-c10.y+c20.y+s*c21.y+s*s*c22.y).getRoots();if(xRoots.length>0&&yRoots.length>0){checkRoots:for(var j=0;j<xRoots.length;j++){var xRoot=xRoots[j];if(0<=xRoot&&xRoot<=1){for(var k=0;k<yRoots.length;k++){if(Math.abs(xRoot-yRoots[k])<TOLERANCE){result.points.push(c22.multiply(s*s).add(c21.multiply(s).add(c20)));break checkRoots;}}}}}}}return result;};
Intersection.intersectBezier2Bezier3=function(a1,a2,a3,b1,b2,b3,b4){var a,b,c,d;var c12,c11,c10;var c23,c22,c21,c20;var result=new Intersection("No Intersection");a=a2.multiply(-2);c12=a1.add(a.add(a3));a=a1.multiply(-2);b=a2.multiply(2);c11=a.add(b);c10=new Point2D(a1.x,a1.y);a=b1.multiply(-1);b=b2.multiply(3);c=b3.multiply(-3);d=a.add(b.add(c.add(b4)));c23=new Vector2D(d.x,d.y);a=b1.multiply(3);b=b2.multiply(-6);c=b3.multiply(3);d=a.add(b.add(c));c22=new Vector2D(d.x,d.y);a=b1.multiply(-3);b=b2.multiply(3);c=a.add(b);c21=new Vector2D(c.x,c.y);c20=new Vector2D(b1.x,b1.y);var c10x2=c10.x*c10.x;var c10y2=c10.y*c10.y;var c11x2=c11.x*c11.x;var c11y2=c11.y*c11.y;var c12x2=c12.x*c12.x;var c12y2=c12.y*c12.y;var c20x2=c20.x*c20.x;var c20y2=c20.y*c20.y;var c21x2=c21.x*c21.x;var c21y2=c21.y*c21.y;var c22x2=c22.x*c22.x;var c22y2=c22.y*c22.y;var c23x2=c23.x*c23.x;var c23y2=c23.y*c23.y;var poly=new Polynomial(-2*c12.x*c12.y*c23.x*c23.y+c12x2*c23y2+c12y2*c23x2,-2*c12.x*c12.y*c22.x*c23.y-2*c12.x*c12.y*c22.y*c23.x+2*c12y2*c22.x*c23.x+2*c12x2*c22.y*c23.y,-2*c12.x*c21.x*c12.y*c23.y-2*c12.x*c12.y*c21.y*c23.x-2*c12.x*c12.y*c22.x*c22.y+2*c21.x*c12y2*c23.x+c12y2*c22x2+c12x2*(2*c21.y*c23.y+c22y2),2*c10.x*c12.x*c12.y*c23.y+2*c10.y*c12.x*c12.y*c23.x+c11.x*c11.y*c12.x*c23.y+c11.x*c11.y*c12.y*c23.x-2*c20.x*c12.x*c12.y*c23.y-2*c12.x*c20.y*c12.y*c23.x-2*c12.x*c21.x*c12.y*c22.y-2*c12.x*c12.y*c21.y*c22.x-2*c10.x*c12y2*c23.x-2*c10.y*c12x2*c23.y+2*c20.x*c12y2*c23.x+2*c21.x*c12y2*c22.x-c11y2*c12.x*c23.x-c11x2*c12.y*c23.y+c12x2*(2*c20.y*c23.y+2*c21.y*c22.y),2*c10.x*c12.x*c12.y*c22.y+2*c10.y*c12.x*c12.y*c22.x+c11.x*c11.y*c12.x*c22.y+c11.x*c11.y*c12.y*c22.x-2*c20.x*c12.x*c12.y*c22.y-2*c12.x*c20.y*c12.y*c22.x-2*c12.x*c21.x*c12.y*c21.y-2*c10.x*c12y2*c22.x-2*c10.y*c12x2*c22.y+2*c20.x*c12y2*c22.x-c11y2*c12.x*c22.x-c11x2*c12.y*c22.y+c21x2*c12y2+c12x2*(2*c20.y*c22.y+c21y2),2*c10.x*c12.x*c12.y*c21.y+2*c10.y*c12.x*c21.x*c12.y+c11.x*c11.y*c12.x*c21.y+c11.x*c11.y*c21.x*c12.y-2*c20.x*c12.x*c12.y*c21.y-2*c12.x*c20.y*c21.x*c12.y-2*c10.x*c21.x*c12y2-2*c10.y*c12x2*c21.y+2*c20.x*c21.x*c12y2-c11y2*c12.x*c21.x-c11x2*c12.y*c21.y+2*c12x2*c20.y*c21.y,-2*c10.x*c10.y*c12.x*c12.y-c10.x*c11.x*c11.y*c12.y-c10.y*c11.x*c11.y*c12.x+2*c10.x*c12.x*c20.y*c12.y+2*c10.y*c20.x*c12.x*c12.y+c11.x*c20.x*c11.y*c12.y+c11.x*c11.y*c12.x*c20.y-2*c20.x*c12.x*c20.y*c12.y-2*c10.x*c20.x*c12y2+c10.x*c11y2*c12.x+c10.y*c11x2*c12.y-2*c10.y*c12x2*c20.y-c20.x*c11y2*c12.x-c11x2*c20.y*c12.y+c10x2*c12y2+c10y2*c12x2+c20x2*c12y2+c12x2*c20y2);var roots=poly.getRootsInInterval(0,1);for(var i=0;i<roots.length;i++){var s=roots[i];var xRoots=new Polynomial(c12.x,c11.x,c10.x-c20.x-s*c21.x-s*s*c22.x-s*s*s*c23.x).getRoots();var yRoots=new Polynomial(c12.y,c11.y,c10.y-c20.y-s*c21.y-s*s*c22.y-s*s*s*c23.y).getRoots();if(xRoots.length>0&&yRoots.length>0){var TOLERANCE=1e-4;checkRoots:for(var j=0;j<xRoots.length;j++){var xRoot=xRoots[j];if(0<=xRoot&&xRoot<=1){for(var k=0;k<yRoots.length;k++){if(Math.abs(xRoot-yRoots[k])<TOLERANCE){result.points.push(c23.multiply(s*s*s).add(c22.multiply(s*s).add(c21.multiply(s).add(c20))));break checkRoots;}}}}}}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier2Circle=function(p1,p2,p3,c,r){return Intersection.intersectBezier2Ellipse(p1,p2,p3,c,r,r);};
Intersection.intersectBezier2Ellipse=function(p1,p2,p3,ec,rx,ry){var a,b;var c2,c1,c0;var result=new Intersection("No Intersection");a=p2.multiply(-2);c2=p1.add(a.add(p3));a=p1.multiply(-2);b=p2.multiply(2);c1=a.add(b);c0=new Point2D(p1.x,p1.y);var rxrx=rx*rx;var ryry=ry*ry;var roots=new Polynomial(ryry*c2.x*c2.x+rxrx*c2.y*c2.y,2*(ryry*c2.x*c1.x+rxrx*c2.y*c1.y),ryry*(2*c2.x*c0.x+c1.x*c1.x)+rxrx*(2*c2.y*c0.y+c1.y*c1.y)-2*(ryry*ec.x*c2.x+rxrx*ec.y*c2.y),2*(ryry*c1.x*(c0.x-ec.x)+rxrx*c1.y*(c0.y-ec.y)),ryry*(c0.x*c0.x+ec.x*ec.x)+rxrx*(c0.y*c0.y+ec.y*ec.y)-2*(ryry*ec.x*c0.x+rxrx*ec.y*c0.y)-rxrx*ryry).getRoots();for(var i=0;i<roots.length;i++){var t=roots[i];if(0<=t&&t<=1)result.points.push(c2.multiply(t*t).add(c1.multiply(t).add(c0)));}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier2Line=function(p1,p2,p3,a1,a2){var a,b;var c2,c1,c0;var cl;var n;var min=a1.min(a2);var max=a1.max(a2);var result=new Intersection("No Intersection");a=p2.multiply(-2);c2=p1.add(a.add(p3));a=p1.multiply(-2);b=p2.multiply(2);c1=a.add(b);c0=new Point2D(p1.x,p1.y);n=new Vector2D(a1.y-a2.y,a2.x-a1.x);cl=a1.x*a2.y-a2.x*a1.y;roots=new Polynomial(n.dot(c2),n.dot(c1),n.dot(c0)+cl).getRoots();for(var i=0;i<roots.length;i++){var t=roots[i];if(0<=t&&t<=1){var p4=p1.lerp(p2,t);var p5=p2.lerp(p3,t);var p6=p4.lerp(p5,t);if(a1.x==a2.x){if(min.y<=p6.y&&p6.y<=max.y){result.status="Intersection";result.appendPoint(p6);}}else if(a1.y==a2.y){if(min.x<=p6.x&&p6.x<=max.x){result.status="Intersection";result.appendPoint(p6);}}else if(p6.gte(min)&&p6.lte(max)){result.status="Intersection";result.appendPoint(p6);}}}return result;};
Intersection.intersectBezier2Polygon=function(p1,p2,p3,points){var result=new Intersection("No Intersection");var length=points.length;for(var i=0;i<length;i++){var a1=points[i];var a2=points[(i+1)%length];var inter=Intersection.intersectBezier2Line(p1,p2,p3,a1,a2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier2Rectangle=function(p1,p2,p3,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectBezier2Line(p1,p2,p3,min,topRight);var inter2=Intersection.intersectBezier2Line(p1,p2,p3,topRight,max);var inter3=Intersection.intersectBezier2Line(p1,p2,p3,max,bottomLeft);var inter4=Intersection.intersectBezier2Line(p1,p2,p3,bottomLeft,min);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier3Bezier3=function(a1,a2,a3,a4,b1,b2,b3,b4){var a,b,c,d;var c13,c12,c11,c10;var c23,c22,c21,c20;var result=new Intersection("No Intersection");a=a1.multiply(-1);b=a2.multiply(3);c=a3.multiply(-3);d=a.add(b.add(c.add(a4)));c13=new Vector2D(d.x,d.y);a=a1.multiply(3);b=a2.multiply(-6);c=a3.multiply(3);d=a.add(b.add(c));c12=new Vector2D(d.x,d.y);a=a1.multiply(-3);b=a2.multiply(3);c=a.add(b);c11=new Vector2D(c.x,c.y);c10=new Vector2D(a1.x,a1.y);a=b1.multiply(-1);b=b2.multiply(3);c=b3.multiply(-3);d=a.add(b.add(c.add(b4)));c23=new Vector2D(d.x,d.y);a=b1.multiply(3);b=b2.multiply(-6);c=b3.multiply(3);d=a.add(b.add(c));c22=new Vector2D(d.x,d.y);a=b1.multiply(-3);b=b2.multiply(3);c=a.add(b);c21=new Vector2D(c.x,c.y);c20=new Vector2D(b1.x,b1.y);var c10x2=c10.x*c10.x;var c10x3=c10.x*c10.x*c10.x;var c10y2=c10.y*c10.y;var c10y3=c10.y*c10.y*c10.y;var c11x2=c11.x*c11.x;var c11x3=c11.x*c11.x*c11.x;var c11y2=c11.y*c11.y;var c11y3=c11.y*c11.y*c11.y;var c12x2=c12.x*c12.x;var c12x3=c12.x*c12.x*c12.x;var c12y2=c12.y*c12.y;var c12y3=c12.y*c12.y*c12.y;var c13x2=c13.x*c13.x;var c13x3=c13.x*c13.x*c13.x;var c13y2=c13.y*c13.y;var c13y3=c13.y*c13.y*c13.y;var c20x2=c20.x*c20.x;var c20x3=c20.x*c20.x*c20.x;var c20y2=c20.y*c20.y;var c20y3=c20.y*c20.y*c20.y;var c21x2=c21.x*c21.x;var c21x3=c21.x*c21.x*c21.x;var c21y2=c21.y*c21.y;var c22x2=c22.x*c22.x;var c22x3=c22.x*c22.x*c22.x;var c22y2=c22.y*c22.y;var c23x2=c23.x*c23.x;var c23x3=c23.x*c23.x*c23.x;var c23y2=c23.y*c23.y;var c23y3=c23.y*c23.y*c23.y;var poly=new Polynomial(-c13x3*c23y3+c13y3*c23x3-3*c13.x*c13y2*c23x2*c23.y+3*c13x2*c13.y*c23.x*c23y2,-6*c13.x*c22.x*c13y2*c23.x*c23.y+6*c13x2*c13.y*c22.y*c23.x*c23.y+3*c22.x*c13y3*c23x2-3*c13x3*c22.y*c23y2-3*c13.x*c13y2*c22.y*c23x2+3*c13x2*c22.x*c13.y*c23y2,-6*c21.x*c13.x*c13y2*c23.x*c23.y-6*c13.x*c22.x*c13y2*c22.y*c23.x+6*c13x2*c22.x*c13.y*c22.y*c23.y+3*c21.x*c13y3*c23x2+3*c22x2*c13y3*c23.x+3*c21.x*c13x2*c13.y*c23y2-3*c13.x*c21.y*c13y2*c23x2-3*c13.x*c22x2*c13y2*c23.y+c13x2*c13.y*c23.x*(6*c21.y*c23.y+3*c22y2)+c13x3*(-c21.y*c23y2-2*c22y2*c23.y-c23.y*(2*c21.y*c23.y+c22y2)),c11.x*c12.y*c13.x*c13.y*c23.x*c23.y-c11.y*c12.x*c13.x*c13.y*c23.x*c23.y+6*c21.x*c22.x*c13y3*c23.x+3*c11.x*c12.x*c13.x*c13.y*c23y2+6*c10.x*c13.x*c13y2*c23.x*c23.y-3*c11.x*c12.x*c13y2*c23.x*c23.y-3*c11.y*c12.y*c13.x*c13.y*c23x2-6*c10.y*c13x2*c13.y*c23.x*c23.y-6*c20.x*c13.x*c13y2*c23.x*c23.y+3*c11.y*c12.y*c13x2*c23.x*c23.y-2*c12.x*c12y2*c13.x*c23.x*c23.y-6*c21.x*c13.x*c22.x*c13y2*c23.y-6*c21.x*c13.x*c13y2*c22.y*c23.x-6*c13.x*c21.y*c22.x*c13y2*c23.x+6*c21.x*c13x2*c13.y*c22.y*c23.y+2*c12x2*c12.y*c13.y*c23.x*c23.y+c22x3*c13y3-3*c10.x*c13y3*c23x2+3*c10.y*c13x3*c23y2+3*c20.x*c13y3*c23x2+c12y3*c13.x*c23x2-c12x3*c13.y*c23y2-3*c10.x*c13x2*c13.y*c23y2+3*c10.y*c13.x*c13y2*c23x2-2*c11.x*c12.y*c13x2*c23y2+c11.x*c12.y*c13y2*c23x2-c11.y*c12.x*c13x2*c23y2+2*c11.y*c12.x*c13y2*c23x2+3*c20.x*c13x2*c13.y*c23y2-c12.x*c12y2*c13.y*c23x2-3*c20.y*c13.x*c13y2*c23x2+c12x2*c12.y*c13.x*c23y2-3*c13.x*c22x2*c13y2*c22.y+c13x2*c13.y*c23.x*(6*c20.y*c23.y+6*c21.y*c22.y)+c13x2*c22.x*c13.y*(6*c21.y*c23.y+3*c22y2)+c13x3*(-2*c21.y*c22.y*c23.y-c20.y*c23y2-c22.y*(2*c21.y*c23.y+c22y2)-c23.y*(2*c20.y*c23.y+2*c21.y*c22.y)),6*c11.x*c12.x*c13.x*c13.y*c22.y*c23.y+c11.x*c12.y*c13.x*c22.x*c13.y*c23.y+c11.x*c12.y*c13.x*c13.y*c22.y*c23.x-c11.y*c12.x*c13.x*c22.x*c13.y*c23.y-c11.y*c12.x*c13.x*c13.y*c22.y*c23.x-6*c11.y*c12.y*c13.x*c22.x*c13.y*c23.x-6*c10.x*c22.x*c13y3*c23.x+6*c20.x*c22.x*c13y3*c23.x+6*c10.y*c13x3*c22.y*c23.y+2*c12y3*c13.x*c22.x*c23.x-2*c12x3*c13.y*c22.y*c23.y+6*c10.x*c13.x*c22.x*c13y2*c23.y+6*c10.x*c13.x*c13y2*c22.y*c23.x+6*c10.y*c13.x*c22.x*c13y2*c23.x-3*c11.x*c12.x*c22.x*c13y2*c23.y-3*c11.x*c12.x*c13y2*c22.y*c23.x+2*c11.x*c12.y*c22.x*c13y2*c23.x+4*c11.y*c12.x*c22.x*c13y2*c23.x-6*c10.x*c13x2*c13.y*c22.y*c23.y-6*c10.y*c13x2*c22.x*c13.y*c23.y-6*c10.y*c13x2*c13.y*c22.y*c23.x-4*c11.x*c12.y*c13x2*c22.y*c23.y-6*c20.x*c13.x*c22.x*c13y2*c23.y-6*c20.x*c13.x*c13y2*c22.y*c23.x-2*c11.y*c12.x*c13x2*c22.y*c23.y+3*c11.y*c12.y*c13x2*c22.x*c23.y+3*c11.y*c12.y*c13x2*c22.y*c23.x-2*c12.x*c12y2*c13.x*c22.x*c23.y-2*c12.x*c12y2*c13.x*c22.y*c23.x-2*c12.x*c12y2*c22.x*c13.y*c23.x-6*c20.y*c13.x*c22.x*c13y2*c23.x-6*c21.x*c13.x*c21.y*c13y2*c23.x-6*c21.x*c13.x*c22.x*c13y2*c22.y+6*c20.x*c13x2*c13.y*c22.y*c23.y+2*c12x2*c12.y*c13.x*c22.y*c23.y+2*c12x2*c12.y*c22.x*c13.y*c23.y+2*c12x2*c12.y*c13.y*c22.y*c23.x+3*c21.x*c22x2*c13y3+3*c21x2*c13y3*c23.x-3*c13.x*c21.y*c22x2*c13y2-3*c21x2*c13.x*c13y2*c23.y+c13x2*c22.x*c13.y*(6*c20.y*c23.y+6*c21.y*c22.y)+c13x2*c13.y*c23.x*(6*c20.y*c22.y+3*c21y2)+c21.x*c13x2*c13.y*(6*c21.y*c23.y+3*c22y2)+c13x3*(-2*c20.y*c22.y*c23.y-c23.y*(2*c20.y*c22.y+c21y2)-c21.y*(2*c21.y*c23.y+c22y2)-c22.y*(2*c20.y*c23.y+2*c21.y*c22.y)),c11.x*c21.x*c12.y*c13.x*c13.y*c23.y+c11.x*c12.y*c13.x*c21.y*c13.y*c23.x+c11.x*c12.y*c13.x*c22.x*c13.y*c22.y-c11.y*c12.x*c21.x*c13.x*c13.y*c23.y-c11.y*c12.x*c13.x*c21.y*c13.y*c23.x-c11.y*c12.x*c13.x*c22.x*c13.y*c22.y-6*c11.y*c21.x*c12.y*c13.x*c13.y*c23.x-6*c10.x*c21.x*c13y3*c23.x+6*c20.x*c21.x*c13y3*c23.x+2*c21.x*c12y3*c13.x*c23.x+6*c10.x*c21.x*c13.x*c13y2*c23.y+6*c10.x*c13.x*c21.y*c13y2*c23.x+6*c10.x*c13.x*c22.x*c13y2*c22.y+6*c10.y*c21.x*c13.x*c13y2*c23.x-3*c11.x*c12.x*c21.x*c13y2*c23.y-3*c11.x*c12.x*c21.y*c13y2*c23.x-3*c11.x*c12.x*c22.x*c13y2*c22.y+2*c11.x*c21.x*c12.y*c13y2*c23.x+4*c11.y*c12.x*c21.x*c13y2*c23.x-6*c10.y*c21.x*c13x2*c13.y*c23.y-6*c10.y*c13x2*c21.y*c13.y*c23.x-6*c10.y*c13x2*c22.x*c13.y*c22.y-6*c20.x*c21.x*c13.x*c13y2*c23.y-6*c20.x*c13.x*c21.y*c13y2*c23.x-6*c20.x*c13.x*c22.x*c13y2*c22.y+3*c11.y*c21.x*c12.y*c13x2*c23.y-3*c11.y*c12.y*c13.x*c22x2*c13.y+3*c11.y*c12.y*c13x2*c21.y*c23.x+3*c11.y*c12.y*c13x2*c22.x*c22.y-2*c12.x*c21.x*c12y2*c13.x*c23.y-2*c12.x*c21.x*c12y2*c13.y*c23.x-2*c12.x*c12y2*c13.x*c21.y*c23.x-2*c12.x*c12y2*c13.x*c22.x*c22.y-6*c20.y*c21.x*c13.x*c13y2*c23.x-6*c21.x*c13.x*c21.y*c22.x*c13y2+6*c20.y*c13x2*c21.y*c13.y*c23.x+2*c12x2*c21.x*c12.y*c13.y*c23.y+2*c12x2*c12.y*c21.y*c13.y*c23.x+2*c12x2*c12.y*c22.x*c13.y*c22.y-3*c10.x*c22x2*c13y3+3*c20.x*c22x2*c13y3+3*c21x2*c22.x*c13y3+c12y3*c13.x*c22x2+3*c10.y*c13.x*c22x2*c13y2+c11.x*c12.y*c22x2*c13y2+2*c11.y*c12.x*c22x2*c13y2-c12.x*c12y2*c22x2*c13.y-3*c20.y*c13.x*c22x2*c13y2-3*c21x2*c13.x*c13y2*c22.y+c12x2*c12.y*c13.x*(2*c21.y*c23.y+c22y2)+c11.x*c12.x*c13.x*c13.y*(6*c21.y*c23.y+3*c22y2)+c21.x*c13x2*c13.y*(6*c20.y*c23.y+6*c21.y*c22.y)+c12x3*c13.y*(-2*c21.y*c23.y-c22y2)+c10.y*c13x3*(6*c21.y*c23.y+3*c22y2)+c11.y*c12.x*c13x2*(-2*c21.y*c23.y-c22y2)+c11.x*c12.y*c13x2*(-4*c21.y*c23.y-2*c22y2)+c10.x*c13x2*c13.y*(-6*c21.y*c23.y-3*c22y2)+c13x2*c22.x*c13.y*(6*c20.y*c22.y+3*c21y2)+c20.x*c13x2*c13.y*(6*c21.y*c23.y+3*c22y2)+c13x3*(-2*c20.y*c21.y*c23.y-c22.y*(2*c20.y*c22.y+c21y2)-c20.y*(2*c21.y*c23.y+c22y2)-c21.y*(2*c20.y*c23.y+2*c21.y*c22.y)),-c10.x*c11.x*c12.y*c13.x*c13.y*c23.y+c10.x*c11.y*c12.x*c13.x*c13.y*c23.y+6*c10.x*c11.y*c12.y*c13.x*c13.y*c23.x-6*c10.y*c11.x*c12.x*c13.x*c13.y*c23.y-c10.y*c11.x*c12.y*c13.x*c13.y*c23.x+c10.y*c11.y*c12.x*c13.x*c13.y*c23.x+c11.x*c11.y*c12.x*c12.y*c13.x*c23.y-c11.x*c11.y*c12.x*c12.y*c13.y*c23.x+c11.x*c20.x*c12.y*c13.x*c13.y*c23.y+c11.x*c20.y*c12.y*c13.x*c13.y*c23.x+c11.x*c21.x*c12.y*c13.x*c13.y*c22.y+c11.x*c12.y*c13.x*c21.y*c22.x*c13.y-c20.x*c11.y*c12.x*c13.x*c13.y*c23.y-6*c20.x*c11.y*c12.y*c13.x*c13.y*c23.x-c11.y*c12.x*c20.y*c13.x*c13.y*c23.x-c11.y*c12.x*c21.x*c13.x*c13.y*c22.y-c11.y*c12.x*c13.x*c21.y*c22.x*c13.y-6*c11.y*c21.x*c12.y*c13.x*c22.x*c13.y-6*c10.x*c20.x*c13y3*c23.x-6*c10.x*c21.x*c22.x*c13y3-2*c10.x*c12y3*c13.x*c23.x+6*c20.x*c21.x*c22.x*c13y3+2*c20.x*c12y3*c13.x*c23.x+2*c21.x*c12y3*c13.x*c22.x+2*c10.y*c12x3*c13.y*c23.y-6*c10.x*c10.y*c13.x*c13y2*c23.x+3*c10.x*c11.x*c12.x*c13y2*c23.y-2*c10.x*c11.x*c12.y*c13y2*c23.x-4*c10.x*c11.y*c12.x*c13y2*c23.x+3*c10.y*c11.x*c12.x*c13y2*c23.x+6*c10.x*c10.y*c13x2*c13.y*c23.y+6*c10.x*c20.x*c13.x*c13y2*c23.y-3*c10.x*c11.y*c12.y*c13x2*c23.y+2*c10.x*c12.x*c12y2*c13.x*c23.y+2*c10.x*c12.x*c12y2*c13.y*c23.x+6*c10.x*c20.y*c13.x*c13y2*c23.x+6*c10.x*c21.x*c13.x*c13y2*c22.y+6*c10.x*c13.x*c21.y*c22.x*c13y2+4*c10.y*c11.x*c12.y*c13x2*c23.y+6*c10.y*c20.x*c13.x*c13y2*c23.x+2*c10.y*c11.y*c12.x*c13x2*c23.y-3*c10.y*c11.y*c12.y*c13x2*c23.x+2*c10.y*c12.x*c12y2*c13.x*c23.x+6*c10.y*c21.x*c13.x*c22.x*c13y2-3*c11.x*c20.x*c12.x*c13y2*c23.y+2*c11.x*c20.x*c12.y*c13y2*c23.x+c11.x*c11.y*c12y2*c13.x*c23.x-3*c11.x*c12.x*c20.y*c13y2*c23.x-3*c11.x*c12.x*c21.x*c13y2*c22.y-3*c11.x*c12.x*c21.y*c22.x*c13y2+2*c11.x*c21.x*c12.y*c22.x*c13y2+4*c20.x*c11.y*c12.x*c13y2*c23.x+4*c11.y*c12.x*c21.x*c22.x*c13y2-2*c10.x*c12x2*c12.y*c13.y*c23.y-6*c10.y*c20.x*c13x2*c13.y*c23.y-6*c10.y*c20.y*c13x2*c13.y*c23.x-6*c10.y*c21.x*c13x2*c13.y*c22.y-2*c10.y*c12x2*c12.y*c13.x*c23.y-2*c10.y*c12x2*c12.y*c13.y*c23.x-6*c10.y*c13x2*c21.y*c22.x*c13.y-c11.x*c11.y*c12x2*c13.y*c23.y-2*c11.x*c11y2*c13.x*c13.y*c23.x+3*c20.x*c11.y*c12.y*c13x2*c23.y-2*c20.x*c12.x*c12y2*c13.x*c23.y-2*c20.x*c12.x*c12y2*c13.y*c23.x-6*c20.x*c20.y*c13.x*c13y2*c23.x-6*c20.x*c21.x*c13.x*c13y2*c22.y-6*c20.x*c13.x*c21.y*c22.x*c13y2+3*c11.y*c20.y*c12.y*c13x2*c23.x+3*c11.y*c21.x*c12.y*c13x2*c22.y+3*c11.y*c12.y*c13x2*c21.y*c22.x-2*c12.x*c20.y*c12y2*c13.x*c23.x-2*c12.x*c21.x*c12y2*c13.x*c22.y-2*c12.x*c21.x*c12y2*c22.x*c13.y-2*c12.x*c12y2*c13.x*c21.y*c22.x-6*c20.y*c21.x*c13.x*c22.x*c13y2-c11y2*c12.x*c12.y*c13.x*c23.x+2*c20.x*c12x2*c12.y*c13.y*c23.y+6*c20.y*c13x2*c21.y*c22.x*c13.y+2*c11x2*c11.y*c13.x*c13.y*c23.y+c11x2*c12.x*c12.y*c13.y*c23.y+2*c12x2*c20.y*c12.y*c13.y*c23.x+2*c12x2*c21.x*c12.y*c13.y*c22.y+2*c12x2*c12.y*c21.y*c22.x*c13.y+c21x3*c13y3+3*c10x2*c13y3*c23.x-3*c10y2*c13x3*c23.y+3*c20x2*c13y3*c23.x+c11y3*c13x2*c23.x-c11x3*c13y2*c23.y-c11.x*c11y2*c13x2*c23.y+c11x2*c11.y*c13y2*c23.x-3*c10x2*c13.x*c13y2*c23.y+3*c10y2*c13x2*c13.y*c23.x-c11x2*c12y2*c13.x*c23.y+c11y2*c12x2*c13.y*c23.x-3*c21x2*c13.x*c21.y*c13y2-3*c20x2*c13.x*c13y2*c23.y+3*c20y2*c13x2*c13.y*c23.x+c11.x*c12.x*c13.x*c13.y*(6*c20.y*c23.y+6*c21.y*c22.y)+c12x3*c13.y*(-2*c20.y*c23.y-2*c21.y*c22.y)+c10.y*c13x3*(6*c20.y*c23.y+6*c21.y*c22.y)+c11.y*c12.x*c13x2*(-2*c20.y*c23.y-2*c21.y*c22.y)+c12x2*c12.y*c13.x*(2*c20.y*c23.y+2*c21.y*c22.y)+c11.x*c12.y*c13x2*(-4*c20.y*c23.y-4*c21.y*c22.y)+c10.x*c13x2*c13.y*(-6*c20.y*c23.y-6*c21.y*c22.y)+c20.x*c13x2*c13.y*(6*c20.y*c23.y+6*c21.y*c22.y)+c21.x*c13x2*c13.y*(6*c20.y*c22.y+3*c21y2)+c13x3*(-2*c20.y*c21.y*c22.y-c20y2*c23.y-c21.y*(2*c20.y*c22.y+c21y2)-c20.y*(2*c20.y*c23.y+2*c21.y*c22.y)),-c10.x*c11.x*c12.y*c13.x*c13.y*c22.y+c10.x*c11.y*c12.x*c13.x*c13.y*c22.y+6*c10.x*c11.y*c12.y*c13.x*c22.x*c13.y-6*c10.y*c11.x*c12.x*c13.x*c13.y*c22.y-c10.y*c11.x*c12.y*c13.x*c22.x*c13.y+c10.y*c11.y*c12.x*c13.x*c22.x*c13.y+c11.x*c11.y*c12.x*c12.y*c13.x*c22.y-c11.x*c11.y*c12.x*c12.y*c22.x*c13.y+c11.x*c20.x*c12.y*c13.x*c13.y*c22.y+c11.x*c20.y*c12.y*c13.x*c22.x*c13.y+c11.x*c21.x*c12.y*c13.x*c21.y*c13.y-c20.x*c11.y*c12.x*c13.x*c13.y*c22.y-6*c20.x*c11.y*c12.y*c13.x*c22.x*c13.y-c11.y*c12.x*c20.y*c13.x*c22.x*c13.y-c11.y*c12.x*c21.x*c13.x*c21.y*c13.y-6*c10.x*c20.x*c22.x*c13y3-2*c10.x*c12y3*c13.x*c22.x+2*c20.x*c12y3*c13.x*c22.x+2*c10.y*c12x3*c13.y*c22.y-6*c10.x*c10.y*c13.x*c22.x*c13y2+3*c10.x*c11.x*c12.x*c13y2*c22.y-2*c10.x*c11.x*c12.y*c22.x*c13y2-4*c10.x*c11.y*c12.x*c22.x*c13y2+3*c10.y*c11.x*c12.x*c22.x*c13y2+6*c10.x*c10.y*c13x2*c13.y*c22.y+6*c10.x*c20.x*c13.x*c13y2*c22.y-3*c10.x*c11.y*c12.y*c13x2*c22.y+2*c10.x*c12.x*c12y2*c13.x*c22.y+2*c10.x*c12.x*c12y2*c22.x*c13.y+6*c10.x*c20.y*c13.x*c22.x*c13y2+6*c10.x*c21.x*c13.x*c21.y*c13y2+4*c10.y*c11.x*c12.y*c13x2*c22.y+6*c10.y*c20.x*c13.x*c22.x*c13y2+2*c10.y*c11.y*c12.x*c13x2*c22.y-3*c10.y*c11.y*c12.y*c13x2*c22.x+2*c10.y*c12.x*c12y2*c13.x*c22.x-3*c11.x*c20.x*c12.x*c13y2*c22.y+2*c11.x*c20.x*c12.y*c22.x*c13y2+c11.x*c11.y*c12y2*c13.x*c22.x-3*c11.x*c12.x*c20.y*c22.x*c13y2-3*c11.x*c12.x*c21.x*c21.y*c13y2+4*c20.x*c11.y*c12.x*c22.x*c13y2-2*c10.x*c12x2*c12.y*c13.y*c22.y-6*c10.y*c20.x*c13x2*c13.y*c22.y-6*c10.y*c20.y*c13x2*c22.x*c13.y-6*c10.y*c21.x*c13x2*c21.y*c13.y-2*c10.y*c12x2*c12.y*c13.x*c22.y-2*c10.y*c12x2*c12.y*c22.x*c13.y-c11.x*c11.y*c12x2*c13.y*c22.y-2*c11.x*c11y2*c13.x*c22.x*c13.y+3*c20.x*c11.y*c12.y*c13x2*c22.y-2*c20.x*c12.x*c12y2*c13.x*c22.y-2*c20.x*c12.x*c12y2*c22.x*c13.y-6*c20.x*c20.y*c13.x*c22.x*c13y2-6*c20.x*c21.x*c13.x*c21.y*c13y2+3*c11.y*c20.y*c12.y*c13x2*c22.x+3*c11.y*c21.x*c12.y*c13x2*c21.y-2*c12.x*c20.y*c12y2*c13.x*c22.x-2*c12.x*c21.x*c12y2*c13.x*c21.y-c11y2*c12.x*c12.y*c13.x*c22.x+2*c20.x*c12x2*c12.y*c13.y*c22.y-3*c11.y*c21x2*c12.y*c13.x*c13.y+6*c20.y*c21.x*c13x2*c21.y*c13.y+2*c11x2*c11.y*c13.x*c13.y*c22.y+c11x2*c12.x*c12.y*c13.y*c22.y+2*c12x2*c20.y*c12.y*c22.x*c13.y+2*c12x2*c21.x*c12.y*c21.y*c13.y-3*c10.x*c21x2*c13y3+3*c20.x*c21x2*c13y3+3*c10x2*c22.x*c13y3-3*c10y2*c13x3*c22.y+3*c20x2*c22.x*c13y3+c21x2*c12y3*c13.x+c11y3*c13x2*c22.x-c11x3*c13y2*c22.y+3*c10.y*c21x2*c13.x*c13y2-c11.x*c11y2*c13x2*c22.y+c11.x*c21x2*c12.y*c13y2+2*c11.y*c12.x*c21x2*c13y2+c11x2*c11.y*c22.x*c13y2-c12.x*c21x2*c12y2*c13.y-3*c20.y*c21x2*c13.x*c13y2-3*c10x2*c13.x*c13y2*c22.y+3*c10y2*c13x2*c22.x*c13.y-c11x2*c12y2*c13.x*c22.y+c11y2*c12x2*c22.x*c13.y-3*c20x2*c13.x*c13y2*c22.y+3*c20y2*c13x2*c22.x*c13.y+c12x2*c12.y*c13.x*(2*c20.y*c22.y+c21y2)+c11.x*c12.x*c13.x*c13.y*(6*c20.y*c22.y+3*c21y2)+c12x3*c13.y*(-2*c20.y*c22.y-c21y2)+c10.y*c13x3*(6*c20.y*c22.y+3*c21y2)+c11.y*c12.x*c13x2*(-2*c20.y*c22.y-c21y2)+c11.x*c12.y*c13x2*(-4*c20.y*c22.y-2*c21y2)+c10.x*c13x2*c13.y*(-6*c20.y*c22.y-3*c21y2)+c20.x*c13x2*c13.y*(6*c20.y*c22.y+3*c21y2)+c13x3*(-2*c20.y*c21y2-c20y2*c22.y-c20.y*(2*c20.y*c22.y+c21y2)),-c10.x*c11.x*c12.y*c13.x*c21.y*c13.y+c10.x*c11.y*c12.x*c13.x*c21.y*c13.y+6*c10.x*c11.y*c21.x*c12.y*c13.x*c13.y-6*c10.y*c11.x*c12.x*c13.x*c21.y*c13.y-c10.y*c11.x*c21.x*c12.y*c13.x*c13.y+c10.y*c11.y*c12.x*c21.x*c13.x*c13.y-c11.x*c11.y*c12.x*c21.x*c12.y*c13.y+c11.x*c11.y*c12.x*c12.y*c13.x*c21.y+c11.x*c20.x*c12.y*c13.x*c21.y*c13.y+6*c11.x*c12.x*c20.y*c13.x*c21.y*c13.y+c11.x*c20.y*c21.x*c12.y*c13.x*c13.y-c20.x*c11.y*c12.x*c13.x*c21.y*c13.y-6*c20.x*c11.y*c21.x*c12.y*c13.x*c13.y-c11.y*c12.x*c20.y*c21.x*c13.x*c13.y-6*c10.x*c20.x*c21.x*c13y3-2*c10.x*c21.x*c12y3*c13.x+6*c10.y*c20.y*c13x3*c21.y+2*c20.x*c21.x*c12y3*c13.x+2*c10.y*c12x3*c21.y*c13.y-2*c12x3*c20.y*c21.y*c13.y-6*c10.x*c10.y*c21.x*c13.x*c13y2+3*c10.x*c11.x*c12.x*c21.y*c13y2-2*c10.x*c11.x*c21.x*c12.y*c13y2-4*c10.x*c11.y*c12.x*c21.x*c13y2+3*c10.y*c11.x*c12.x*c21.x*c13y2+6*c10.x*c10.y*c13x2*c21.y*c13.y+6*c10.x*c20.x*c13.x*c21.y*c13y2-3*c10.x*c11.y*c12.y*c13x2*c21.y+2*c10.x*c12.x*c21.x*c12y2*c13.y+2*c10.x*c12.x*c12y2*c13.x*c21.y+6*c10.x*c20.y*c21.x*c13.x*c13y2+4*c10.y*c11.x*c12.y*c13x2*c21.y+6*c10.y*c20.x*c21.x*c13.x*c13y2+2*c10.y*c11.y*c12.x*c13x2*c21.y-3*c10.y*c11.y*c21.x*c12.y*c13x2+2*c10.y*c12.x*c21.x*c12y2*c13.x-3*c11.x*c20.x*c12.x*c21.y*c13y2+2*c11.x*c20.x*c21.x*c12.y*c13y2+c11.x*c11.y*c21.x*c12y2*c13.x-3*c11.x*c12.x*c20.y*c21.x*c13y2+4*c20.x*c11.y*c12.x*c21.x*c13y2-6*c10.x*c20.y*c13x2*c21.y*c13.y-2*c10.x*c12x2*c12.y*c21.y*c13.y-6*c10.y*c20.x*c13x2*c21.y*c13.y-6*c10.y*c20.y*c21.x*c13x2*c13.y-2*c10.y*c12x2*c21.x*c12.y*c13.y-2*c10.y*c12x2*c12.y*c13.x*c21.y-c11.x*c11.y*c12x2*c21.y*c13.y-4*c11.x*c20.y*c12.y*c13x2*c21.y-2*c11.x*c11y2*c21.x*c13.x*c13.y+3*c20.x*c11.y*c12.y*c13x2*c21.y-2*c20.x*c12.x*c21.x*c12y2*c13.y-2*c20.x*c12.x*c12y2*c13.x*c21.y-6*c20.x*c20.y*c21.x*c13.x*c13y2-2*c11.y*c12.x*c20.y*c13x2*c21.y+3*c11.y*c20.y*c21.x*c12.y*c13x2-2*c12.x*c20.y*c21.x*c12y2*c13.x-c11y2*c12.x*c21.x*c12.y*c13.x+6*c20.x*c20.y*c13x2*c21.y*c13.y+2*c20.x*c12x2*c12.y*c21.y*c13.y+2*c11x2*c11.y*c13.x*c21.y*c13.y+c11x2*c12.x*c12.y*c21.y*c13.y+2*c12x2*c20.y*c21.x*c12.y*c13.y+2*c12x2*c20.y*c12.y*c13.x*c21.y+3*c10x2*c21.x*c13y3-3*c10y2*c13x3*c21.y+3*c20x2*c21.x*c13y3+c11y3*c21.x*c13x2-c11x3*c21.y*c13y2-3*c20y2*c13x3*c21.y-c11.x*c11y2*c13x2*c21.y+c11x2*c11.y*c21.x*c13y2-3*c10x2*c13.x*c21.y*c13y2+3*c10y2*c21.x*c13x2*c13.y-c11x2*c12y2*c13.x*c21.y+c11y2*c12x2*c21.x*c13.y-3*c20x2*c13.x*c21.y*c13y2+3*c20y2*c21.x*c13x2*c13.y,c10.x*c10.y*c11.x*c12.y*c13.x*c13.y-c10.x*c10.y*c11.y*c12.x*c13.x*c13.y+c10.x*c11.x*c11.y*c12.x*c12.y*c13.y-c10.y*c11.x*c11.y*c12.x*c12.y*c13.x-c10.x*c11.x*c20.y*c12.y*c13.x*c13.y+6*c10.x*c20.x*c11.y*c12.y*c13.x*c13.y+c10.x*c11.y*c12.x*c20.y*c13.x*c13.y-c10.y*c11.x*c20.x*c12.y*c13.x*c13.y-6*c10.y*c11.x*c12.x*c20.y*c13.x*c13.y+c10.y*c20.x*c11.y*c12.x*c13.x*c13.y-c11.x*c20.x*c11.y*c12.x*c12.y*c13.y+c11.x*c11.y*c12.x*c20.y*c12.y*c13.x+c11.x*c20.x*c20.y*c12.y*c13.x*c13.y-c20.x*c11.y*c12.x*c20.y*c13.x*c13.y-2*c10.x*c20.x*c12y3*c13.x+2*c10.y*c12x3*c20.y*c13.y-3*c10.x*c10.y*c11.x*c12.x*c13y2-6*c10.x*c10.y*c20.x*c13.x*c13y2+3*c10.x*c10.y*c11.y*c12.y*c13x2-2*c10.x*c10.y*c12.x*c12y2*c13.x-2*c10.x*c11.x*c20.x*c12.y*c13y2-c10.x*c11.x*c11.y*c12y2*c13.x+3*c10.x*c11.x*c12.x*c20.y*c13y2-4*c10.x*c20.x*c11.y*c12.x*c13y2+3*c10.y*c11.x*c20.x*c12.x*c13y2+6*c10.x*c10.y*c20.y*c13x2*c13.y+2*c10.x*c10.y*c12x2*c12.y*c13.y+2*c10.x*c11.x*c11y2*c13.x*c13.y+2*c10.x*c20.x*c12.x*c12y2*c13.y+6*c10.x*c20.x*c20.y*c13.x*c13y2-3*c10.x*c11.y*c20.y*c12.y*c13x2+2*c10.x*c12.x*c20.y*c12y2*c13.x+c10.x*c11y2*c12.x*c12.y*c13.x+c10.y*c11.x*c11.y*c12x2*c13.y+4*c10.y*c11.x*c20.y*c12.y*c13x2-3*c10.y*c20.x*c11.y*c12.y*c13x2+2*c10.y*c20.x*c12.x*c12y2*c13.x+2*c10.y*c11.y*c12.x*c20.y*c13x2+c11.x*c20.x*c11.y*c12y2*c13.x-3*c11.x*c20.x*c12.x*c20.y*c13y2-2*c10.x*c12x2*c20.y*c12.y*c13.y-6*c10.y*c20.x*c20.y*c13x2*c13.y-2*c10.y*c20.x*c12x2*c12.y*c13.y-2*c10.y*c11x2*c11.y*c13.x*c13.y-c10.y*c11x2*c12.x*c12.y*c13.y-2*c10.y*c12x2*c20.y*c12.y*c13.x-2*c11.x*c20.x*c11y2*c13.x*c13.y-c11.x*c11.y*c12x2*c20.y*c13.y+3*c20.x*c11.y*c20.y*c12.y*c13x2-2*c20.x*c12.x*c20.y*c12y2*c13.x-c20.x*c11y2*c12.x*c12.y*c13.x+3*c10y2*c11.x*c12.x*c13.x*c13.y+3*c11.x*c12.x*c20y2*c13.x*c13.y+2*c20.x*c12x2*c20.y*c12.y*c13.y-3*c10x2*c11.y*c12.y*c13.x*c13.y+2*c11x2*c11.y*c20.y*c13.x*c13.y+c11x2*c12.x*c20.y*c12.y*c13.y-3*c20x2*c11.y*c12.y*c13.x*c13.y-c10x3*c13y3+c10y3*c13x3+c20x3*c13y3-c20y3*c13x3-3*c10.x*c20x2*c13y3-c10.x*c11y3*c13x2+3*c10x2*c20.x*c13y3+c10.y*c11x3*c13y2+3*c10.y*c20y2*c13x3+c20.x*c11y3*c13x2+c10x2*c12y3*c13.x-3*c10y2*c20.y*c13x3-c10y2*c12x3*c13.y+c20x2*c12y3*c13.x-c11x3*c20.y*c13y2-c12x3*c20y2*c13.y-c10.x*c11x2*c11.y*c13y2+c10.y*c11.x*c11y2*c13x2-3*c10.x*c10y2*c13x2*c13.y-c10.x*c11y2*c12x2*c13.y+c10.y*c11x2*c12y2*c13.x-c11.x*c11y2*c20.y*c13x2+3*c10x2*c10.y*c13.x*c13y2+c10x2*c11.x*c12.y*c13y2+2*c10x2*c11.y*c12.x*c13y2-2*c10y2*c11.x*c12.y*c13x2-c10y2*c11.y*c12.x*c13x2+c11x2*c20.x*c11.y*c13y2-3*c10.x*c20y2*c13x2*c13.y+3*c10.y*c20x2*c13.x*c13y2+c11.x*c20x2*c12.y*c13y2-2*c11.x*c20y2*c12.y*c13x2+c20.x*c11y2*c12x2*c13.y-c11.y*c12.x*c20y2*c13x2-c10x2*c12.x*c12y2*c13.y-3*c10x2*c20.y*c13.x*c13y2+3*c10y2*c20.x*c13x2*c13.y+c10y2*c12x2*c12.y*c13.x-c11x2*c20.y*c12y2*c13.x+2*c20x2*c11.y*c12.x*c13y2+3*c20.x*c20y2*c13x2*c13.y-c20x2*c12.x*c12y2*c13.y-3*c20x2*c20.y*c13.x*c13y2+c12x2*c20y2*c12.y*c13.x);var roots=poly.getRootsInInterval(0,1);for(var i=0;i<roots.length;i++){var s=roots[i];var xRoots=new Polynomial(c13.x,c12.x,c11.x,c10.x-c20.x-s*c21.x-s*s*c22.x-s*s*s*c23.x).getRoots();var yRoots=new Polynomial(c13.y,c12.y,c11.y,c10.y-c20.y-s*c21.y-s*s*c22.y-s*s*s*c23.y).getRoots();if(xRoots.length>0&&yRoots.length>0){var TOLERANCE=1e-4;checkRoots:for(var j=0;j<xRoots.length;j++){var xRoot=xRoots[j];if(0<=xRoot&&xRoot<=1){for(var k=0;k<yRoots.length;k++){if(Math.abs(xRoot-yRoots[k])<TOLERANCE){result.points.push(c23.multiply(s*s*s).add(c22.multiply(s*s).add(c21.multiply(s).add(c20))));break checkRoots;}}}}}}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier3Circle=function(p1,p2,p3,p4,c,r){return Intersection.intersectBezier3Ellipse(p1,p2,p3,p4,c,r,r);};
Intersection.intersectBezier3Ellipse=function(p1,p2,p3,p4,ec,rx,ry){var a,b,c,d;var c3,c2,c1,c0;var result=new Intersection("No Intersection");a=p1.multiply(-1);b=p2.multiply(3);c=p3.multiply(-3);d=a.add(b.add(c.add(p4)));c3=new Vector2D(d.x,d.y);a=p1.multiply(3);b=p2.multiply(-6);c=p3.multiply(3);d=a.add(b.add(c));c2=new Vector2D(d.x,d.y);a=p1.multiply(-3);b=p2.multiply(3);c=a.add(b);c1=new Vector2D(c.x,c.y);c0=new Vector2D(p1.x,p1.y);var rxrx=rx*rx;var ryry=ry*ry;var poly=new Polynomial(c3.x*c3.x*ryry+c3.y*c3.y*rxrx,2*(c3.x*c2.x*ryry+c3.y*c2.y*rxrx),2*(c3.x*c1.x*ryry+c3.y*c1.y*rxrx)+c2.x*c2.x*ryry+c2.y*c2.y*rxrx,2*c3.x*ryry*(c0.x-ec.x)+2*c3.y*rxrx*(c0.y-ec.y)+2*(c2.x*c1.x*ryry+c2.y*c1.y*rxrx),2*c2.x*ryry*(c0.x-ec.x)+2*c2.y*rxrx*(c0.y-ec.y)+c1.x*c1.x*ryry+c1.y*c1.y*rxrx,2*c1.x*ryry*(c0.x-ec.x)+2*c1.y*rxrx*(c0.y-ec.y),c0.x*c0.x*ryry-2*c0.y*ec.y*rxrx-2*c0.x*ec.x*ryry+c0.y*c0.y*rxrx+ec.x*ec.x*ryry+ec.y*ec.y*rxrx-rxrx*ryry);var roots=poly.getRootsInInterval(0,1);for(var i=0;i<roots.length;i++){var t=roots[i];result.points.push(c3.multiply(t*t*t).add(c2.multiply(t*t).add(c1.multiply(t).add(c0))));}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier3Line=function(p1,p2,p3,p4,a1,a2){var a,b,c,d;var c3,c2,c1,c0;var cl;var n;var min=a1.min(a2);var max=a1.max(a2);var result=new Intersection("No Intersection");a=p1.multiply(-1);b=p2.multiply(3);c=p3.multiply(-3);d=a.add(b.add(c.add(p4)));c3=new Vector2D(d.x,d.y);a=p1.multiply(3);b=p2.multiply(-6);c=p3.multiply(3);d=a.add(b.add(c));c2=new Vector2D(d.x,d.y);a=p1.multiply(-3);b=p2.multiply(3);c=a.add(b);c1=new Vector2D(c.x,c.y);c0=new Vector2D(p1.x,p1.y);n=new Vector2D(a1.y-a2.y,a2.x-a1.x);cl=a1.x*a2.y-a2.x*a1.y;roots=new Polynomial(n.dot(c3),n.dot(c2),n.dot(c1),n.dot(c0)+cl).getRoots();for(var i=0;i<roots.length;i++){var t=roots[i];if(0<=t&&t<=1){var p5=p1.lerp(p2,t);var p6=p2.lerp(p3,t);var p7=p3.lerp(p4,t);var p8=p5.lerp(p6,t);var p9=p6.lerp(p7,t);var p10=p8.lerp(p9,t);if(a1.x==a2.x){if(min.y<=p10.y&&p10.y<=max.y){result.status="Intersection";result.appendPoint(p10);}}else if(a1.y==a2.y){if(min.x<=p10.x&&p10.x<=max.x){result.status="Intersection";result.appendPoint(p10);}}else if(p10.gte(min)&&p10.lte(max)){result.status="Intersection";result.appendPoint(p10);}}}return result;};
Intersection.intersectBezier3Polygon=function(p1,p2,p3,p4,points){var result=new Intersection("No Intersection");var length=points.length;for(var i=0;i<length;i++){var a1=points[i];var a2=points[(i+1)%length];var inter=Intersection.intersectBezier3Line(p1,p2,p3,p4,a1,a2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectBezier3Rectangle=function(p1,p2,p3,p4,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectBezier3Line(p1,p2,p3,p4,min,topRight);var inter2=Intersection.intersectBezier3Line(p1,p2,p3,p4,topRight,max);var inter3=Intersection.intersectBezier3Line(p1,p2,p3,p4,max,bottomLeft);var inter4=Intersection.intersectBezier3Line(p1,p2,p3,p4,bottomLeft,min);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectCircleCircle=function(c1,r1,c2,r2){var result;var r_max=r1+r2;var r_min=Math.abs(r1-r2);var c_dist=c1.distanceFrom(c2);if(c_dist>r_max){result=new Intersection("Outside");}else if(c_dist<r_min){result=new Intersection("Inside");}else{result=new Intersection("Intersection");var a=(r1*r1-r2*r2+c_dist*c_dist)/(2*c_dist);var h=Math.sqrt(r1*r1-a*a);var p=c1.lerp(c2,a/c_dist);var b=h/c_dist;result.points.push(new Point2D(p.x-b*(c2.y-c1.y),p.y+b*(c2.x-c1.x)));result.points.push(new Point2D(p.x+b*(c2.y-c1.y),p.y-b*(c2.x-c1.x)));}return result;};
Intersection.intersectCircleEllipse=function(cc,r,ec,rx,ry){return Intersection.intersectEllipseEllipse(cc,r,r,ec,rx,ry);};
Intersection.intersectCircleLine=function(c,r,a1,a2){var result;var a=(a2.x-a1.x)*(a2.x-a1.x)+(a2.y-a1.y)*(a2.y-a1.y);var b=2*((a2.x-a1.x)*(a1.x-c.x)+(a2.y-a1.y)*(a1.y-c.y));var cc=c.x*c.x+c.y*c.y+a1.x*a1.x+a1.y*a1.y-2*(c.x*a1.x+c.y*a1.y)-r*r;var deter=b*b-4*a*cc;if(deter<0){result=new Intersection("Outside");}else if(deter==0){result=new Intersection("Tangent");}else{var e=Math.sqrt(deter);var u1=(-b+e)/(2*a);var u2=(-b-e)/(2*a);if((u1<0||u1>1)&&(u2<0||u2>1)){if((u1<0&&u2<0)||(u1>1&&u2>1)){result=new Intersection("Outside");}else{result=new Intersection("Inside");}}else{result=new Intersection("Intersection");if(0<=u1&&u1<=1)result.points.push(a1.lerp(a2,u1));if(0<=u2&&u2<=1)result.points.push(a1.lerp(a2,u2));}}return result;};
Intersection.intersectCirclePolygon=function(c,r,points){var result=new Intersection("No Intersection");var length=points.length;var inter;for(var i=0;i<length;i++){var a1=points[i];var a2=points[(i+1)%length];inter=Intersection.intersectCircleLine(c,r,a1,a2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";else result.status=inter.status;return result;};
Intersection.intersectCircleRectangle=function(c,r,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectCircleLine(c,r,min,topRight);var inter2=Intersection.intersectCircleLine(c,r,topRight,max);var inter3=Intersection.intersectCircleLine(c,r,max,bottomLeft);var inter4=Intersection.intersectCircleLine(c,r,bottomLeft,min);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";else result.status=inter1.status;return result;};
Intersection.intersectEllipseEllipse=function(c1,rx1,ry1,c2,rx2,ry2){var a=[ry1*ry1,0,rx1*rx1,-2*ry1*ry1*c1.x,-2*rx1*rx1*c1.y,ry1*ry1*c1.x*c1.x+rx1*rx1*c1.y*c1.y-rx1*rx1*ry1*ry1];var b=[ry2*ry2,0,rx2*rx2,-2*ry2*ry2*c2.x,-2*rx2*rx2*c2.y,ry2*ry2*c2.x*c2.x+rx2*rx2*c2.y*c2.y-rx2*rx2*ry2*ry2];var yPoly=Intersection.bezout(a,b);var yRoots=yPoly.getRoots();var epsilon=1e-3;var norm0=(a[0]*a[0]+2*a[1]*a[1]+a[2]*a[2])*epsilon;var norm1=(b[0]*b[0]+2*b[1]*b[1]+b[2]*b[2])*epsilon;var result=new Intersection("No Intersection");for(var y=0;y<yRoots.length;y++){var xPoly=new Polynomial(a[0],a[3]+yRoots[y]*a[1],a[5]+yRoots[y]*(a[4]+yRoots[y]*a[2]));var xRoots=xPoly.getRoots();for(var x=0;x<xRoots.length;x++){var test=(a[0]*xRoots[x]+a[1]*yRoots[y]+a[3])*xRoots[x]+(a[2]*yRoots[y]+a[4])*yRoots[y]+a[5];if(Math.abs(test)<norm0){test=(b[0]*xRoots[x]+b[1]*yRoots[y]+b[3])*xRoots[x]+(b[2]*yRoots[y]+b[4])*yRoots[y]+b[5];if(Math.abs(test)<norm1){result.appendPoint(new Point2D(xRoots[x],yRoots[y]));}}}}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectEllipseLine=function(c,rx,ry,a1,a2){var result;var origin=new Vector2D(a1.x,a1.y);var dir=Vector2D.fromPoints(a1,a2);var center=new Vector2D(c.x,c.y);var diff=origin.subtract(center);var mDir=new Vector2D(dir.x/(rx*rx),  dir.y/(ry*ry));var mDiff=new Vector2D(diff.x/(rx*rx), diff.y/(ry*ry));var a=dir.dot(mDir);var b=dir.dot(mDiff);var c=diff.dot(mDiff)-1.0;var d=b*b-a*c;if(d<0){result=new Intersection("Outside");}else if(d>0){var root=Math.sqrt(d);var t_a=(-b-root)/a;var t_b=(-b+root)/a;if((t_a<0||1<t_a)&&(t_b<0||1<t_b)){if((t_a<0&&t_b<0)||(t_a>1&&t_b>1))result=new Intersection("Outside");else result=new Intersection("Inside");}else{result=new Intersection("Intersection");if(0<=t_a&&t_a<=1)result.appendPoint(a1.lerp(a2,t_a));if(0<=t_b&&t_b<=1)result.appendPoint(a1.lerp(a2,t_b));}}else{var t=-b/a;if(0<=t&&t<=1){result=new Intersection("Intersection");result.appendPoint(a1.lerp(a2,t));}else{result=new Intersection("Outside");}}return result;};
Intersection.intersectEllipsePolygon=function(c,rx,ry,points){var result=new Intersection("No Intersection");var length=points.length;for(var i=0;i<length;i++){var b1=points[i];var b2=points[(i+1)%length];var inter=Intersection.intersectEllipseLine(c,rx,ry,b1,b2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectEllipseRectangle=function(c,rx,ry,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectEllipseLine(c,rx,ry,min,topRight);var inter2=Intersection.intersectEllipseLine(c,rx,ry,topRight,max);var inter3=Intersection.intersectEllipseLine(c,rx,ry,max,bottomLeft);var inter4=Intersection.intersectEllipseLine(c,rx,ry,bottomLeft,min);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectLineLine=function(a1,a2,b1,b2){var result;var ua_t=(b2.x-b1.x)*(a1.y-b1.y)-(b2.y-b1.y)*(a1.x-b1.x);var ub_t=(a2.x-a1.x)*(a1.y-b1.y)-(a2.y-a1.y)*(a1.x-b1.x);var u_b=(b2.y-b1.y)*(a2.x-a1.x)-(b2.x-b1.x)*(a2.y-a1.y);if(u_b!=0){var ua=ua_t/u_b;var ub=ub_t/u_b;if(0<=ua&&ua<=1&&0<=ub&&ub<=1){result=new Intersection("Intersection");result.points.push(new Point2D(a1.x+ua*(a2.x-a1.x),a1.y+ua*(a2.y-a1.y)));}else{result=new Intersection("No Intersection");}}else{if(ua_t==0||ub_t==0){result=new Intersection("Coincident");}else{result=new Intersection("Parallel");}}return result;};
Intersection.intersectLinePolygon=function(a1,a2,points){var result=new Intersection("No Intersection");var length=points.length;for(var i=0;i<length;i++){var b1=points[i];var b2=points[(i+1)%length];var inter=Intersection.intersectLineLine(a1,a2,b1,b2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectLineRectangle=function(a1,a2,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectLineLine(min,topRight,a1,a2);var inter2=Intersection.intersectLineLine(topRight,max,a1,a2);var inter3=Intersection.intersectLineLine(max,bottomLeft,a1,a2);var inter4=Intersection.intersectLineLine(bottomLeft,min,a1,a2);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectPolygonPolygon=function(points1,points2){var result=new Intersection("No Intersection");var length=points1.length;for(var i=0;i<length;i++){var a1=points1[i];var a2=points1[(i+1)%length];var inter=Intersection.intersectLinePolygon(a1,a2,points2);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectPolygonRectangle=function(points,r1,r2){var min=r1.min(r2);var max=r1.max(r2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectLinePolygon(min,topRight,points);var inter2=Intersection.intersectLinePolygon(topRight,max,points);var inter3=Intersection.intersectLinePolygon(max,bottomLeft,points);var inter4=Intersection.intersectLinePolygon(bottomLeft,min,points);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.intersectRayRay=function(a1,a2,b1,b2){var result;var ua_t=(b2.x-b1.x)*(a1.y-b1.y)-(b2.y-b1.y)*(a1.x-b1.x);var ub_t=(a2.x-a1.x)*(a1.y-b1.y)-(a2.y-a1.y)*(a1.x-b1.x);var u_b=(b2.y-b1.y)*(a2.x-a1.x)-(b2.x-b1.x)*(a2.y-a1.y);if(u_b!=0){var ua=ua_t/u_b;result=new Intersection("Intersection");result.points.push(new Point2D(a1.x+ua*(a2.x-a1.x),a1.y+ua*(a2.y-a1.y)));}else{if(ua_t==0||ub_t==0){result=new Intersection("Coincident");}else{result=new Intersection("Parallel");}}return result;};
Intersection.intersectRectangleRectangle=function(a1,a2,b1,b2){var min=a1.min(a2);var max=a1.max(a2);var topRight=new Point2D(max.x,min.y);var bottomLeft=new Point2D(min.x,max.y);var inter1=Intersection.intersectLineRectangle(min,topRight,b1,b2);var inter2=Intersection.intersectLineRectangle(topRight,max,b1,b2);var inter3=Intersection.intersectLineRectangle(max,bottomLeft,b1,b2);var inter4=Intersection.intersectLineRectangle(bottomLeft,min,b1,b2);var result=new Intersection("No Intersection");result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length>0)result.status="Intersection";return result;};
Intersection.bezout=function(e1,e2){var AB=e1[0]*e2[1]-e2[0]*e1[1];var AC=e1[0]*e2[2]-e2[0]*e1[2];var AD=e1[0]*e2[3]-e2[0]*e1[3];var AE=e1[0]*e2[4]-e2[0]*e1[4];var AF=e1[0]*e2[5]-e2[0]*e1[5];var BC=e1[1]*e2[2]-e2[1]*e1[2];var BE=e1[1]*e2[4]-e2[1]*e1[4];var BF=e1[1]*e2[5]-e2[1]*e1[5];var CD=e1[2]*e2[3]-e2[2]*e1[3];var DE=e1[3]*e2[4]-e2[3]*e1[4];var DF=e1[3]*e2[5]-e2[3]*e1[5];var BFpDE=BF+DE;var BEmCD=BE-CD;return new Polynomial(AB*BC-AC*AC,AB*BEmCD+AD*BC-2*AC*AE,AB*BFpDE+AD*BEmCD-AE*AE-2*AC*AF,AB*DF+AD*BFpDE-2*AE*AF,AD*DF-AF*AF);};
function IntersectionParams(name,params){if(arguments.length>0)this.init(name,params);}
IntersectionParams.prototype.init=function(name,params){this.name=name;this.params=params;};
function Point2D(x,y){if(arguments.length>0){this.init(x,y);}}
Point2D.prototype.init=function(x,y){this.x=x;this.y=y;};
Point2D.prototype.add=function(that){return new Point2D(this.x+that.x,this.y+that.y);};
Point2D.prototype.addEquals=function(that){this.x+=that.x;this.y+=that.y;return this;};
Point2D.prototype.scalarAdd=function(scalar){return new Point2D(this.x+scalar,this.y+scalar);};
Point2D.prototype.scalarAddEquals=function(scalar){this.x+=scalar;this.y+=scalar;return this;};
Point2D.prototype.subtract=function(that){return new Point2D(this.x-that.x,this.y-that.y);};
Point2D.prototype.subtractEquals=function(that){this.x-=that.x;this.y-=that.y;return this;};
Point2D.prototype.scalarSubtract=function(scalar){return new Point2D(this.x-scalar,this.y-scalar);};
Point2D.prototype.scalarSubtractEquals=function(scalar){this.x-=scalar;this.y-=scalar;return this;};
Point2D.prototype.multiply=function(scalar){return new Point2D(this.x*scalar,this.y*scalar);};
Point2D.prototype.multiplyEquals=function(scalar){this.x*=scalar;this.y*=scalar;return this;};
Point2D.prototype.divide=function(scalar){return new Point2D(this.x/scalar, this.y/scalar);};
Point2D.prototype.divideEquals=function(scalar){this.x/=scalar;this.y/=scalar;return this;};
Point2D.prototype.eq=function(that){return(this.x==that.x&&this.y==that.y);};
Point2D.prototype.lt=function(that){return(this.x<that.x&&this.y<that.y);};
Point2D.prototype.lte=function(that){return(this.x<=that.x&&this.y<=that.y);};
Point2D.prototype.gt=function(that){return(this.x>that.x&&this.y>that.y);};
Point2D.prototype.gte=function(that){return(this.x>=that.x&&this.y>=that.y);};
Point2D.prototype.lerp=function(that,t){return new Point2D(this.x+(that.x-this.x)*t,this.y+(that.y-this.y)*t);};
Point2D.prototype.distanceFrom=function(that){var dx=this.x-that.x;var dy=this.y-that.y;return Math.sqrt(dx*dx+dy*dy);};
Point2D.prototype.min=function(that){return new Point2D(Math.min(this.x,that.x),Math.min(this.y,that.y));};
Point2D.prototype.max=function(that){return new Point2D(Math.max(this.x,that.x),Math.max(this.y,that.y));};
Point2D.prototype.toString=function(){return this.x+","+this.y;};
Point2D.prototype.setXY=function(x,y){this.x=x;this.y=y;};
Point2D.prototype.setFromPoint=function(that){this.x=that.x;this.y=that.y;};
Point2D.prototype.swap=function(that){var x=this.x;var y=this.y;this.x=that.x;this.y=that.y;that.x=x;that.y=y;};
Polynomial.TOLERANCE=1e-6;
Polynomial.ACCURACY=6;
function Polynomial(){this.init(arguments);}
Polynomial.prototype.init=function(coefs){this.coefs=new Array();for(var i=coefs.length-1;i>=0;i--)this.coefs.push(coefs[i]);};
Polynomial.prototype.eval=function(x){var result=0;for(var i=this.coefs.length-1;i>=0;i--)result=result*x+this.coefs[i];return result;};
Polynomial.prototype.multiply=function(that){var result=new Polynomial();for(var i=0;i<=this.getDegree()+that.getDegree();i++)result.coefs.push(0);for(var i=0;i<=this.getDegree();i++)for(var j=0;j<=that.getDegree();j++)result.coefs[i+j]+=this.coefs[i]*that.coefs[j];return result;};
Polynomial.prototype.divide_scalar=function(scalar){for(var i=0;i<this.coefs.length;i++)this.coefs[i]/=scalar;};
Polynomial.prototype.simplify=function(){for(var i=this.getDegree();i>=0;i--){if(Math.abs(this.coefs[i])<=Polynomial.TOLERANCE)this.coefs.pop();else break;}};
Polynomial.prototype.bisection=function(min,max){var minValue=this.eval(min);var maxValue=this.eval(max);var result;if(Math.abs(minValue)<=Polynomial.TOLERANCE)result=min;else if(Math.abs(maxValue)<=Polynomial.TOLERANCE)result=max;else if(minValue*maxValue<=0){var tmp1=Math.log(max-min);var tmp2=Math.log(10)*Polynomial.ACCURACY;var iters=Math.ceil((tmp1+tmp2)/Math.log(2));for(var i=0;i<iters;i++){result=0.5*(min+max);var value=this.eval(result);if(Math.abs(value)<=Polynomial.TOLERANCE){break;}if(value*minValue<0){max=result;maxValue=value;}else{min=result;minValue=value;}}}return result;};
Polynomial.prototype.toString=function(){var coefs=new Array();var signs=new Array();for(var i=this.coefs.length-1;i>=0;i--){var value=this.coefs[i];if(value!=0){var sign=(value<0)?" - ":" + ";value=Math.abs(value);if(i>0)if(value==1)value="x";else value+="x";if(i>1)value+="^"+i;signs.push(sign);coefs.push(value);}}signs[0]=(signs[0]==" + ")?"":"-";var result="";for(var i=0;i<coefs.length;i++)result+=signs[i]+coefs[i];return result;};
Polynomial.prototype.getDegree=function(){return this.coefs.length-1;};
Polynomial.prototype.getDerivative=function(){var derivative=new Polynomial();for(var i=1;i<this.coefs.length;i++){derivative.coefs.push(i*this.coefs[i]);}return derivative;};
Polynomial.prototype.getRoots=function(){var result;this.simplify();switch(this.getDegree()){case 0:result=new Array();break;case 1:result=this.getLinearRoot();break;case 2:result=this.getQuadraticRoots();break;case 3:result=this.getCubicRoots();break;case 4:result=this.getQuarticRoots();break;default:result=new Array();}return result;};
Polynomial.prototype.getRootsInInterval=function(min,max){var roots=new Array();var root;if(this.getDegree()==1){root=this.bisection(min,max);if(root!=null)roots.push(root);}else{var deriv=this.getDerivative();var droots=deriv.getRootsInInterval(min,max);if(droots.length>0){root=this.bisection(min,droots[0]);if(root!=null)roots.push(root);for(i=0;i<=droots.length-2;i++){root=this.bisection(droots[i],droots[i+1]);if(root!=null)roots.push(root);}root=this.bisection(droots[droots.length-1],max);if(root!=null)roots.push(root);}else{root=this.bisection(min,max);if(root!=null)roots.push(root);}}return roots;};
Polynomial.prototype.getLinearRoot=function(){var result=new Array();var a=this.coefs[1];if(a!=0)result.push(-this.coefs[0]/a);return result;};
Polynomial.prototype.getQuadraticRoots=function(){var results=new Array();if(this.getDegree()==2){var a=this.coefs[2];var b=this.coefs[1]/a;var c=this.coefs[0]/a;var d=b*b-4*c;if(d>0){var e=Math.sqrt(d);results.push(0.5*(-b+e));results.push(0.5*(-b-e));}else if(d==0){results.push(0.5*-b);}}return results;};
Polynomial.prototype.getCubicRoots=function(){var results=new Array();if(this.getDegree()==3){var c3=this.coefs[3];var c2=this.coefs[2]/c3;var c1=this.coefs[1]/c3;var c0=this.coefs[0]/c3;var a=(3*c1-c2*c2)/3;var b=(2*c2*c2*c2-9*c1*c2+27*c0)/27;var offset=c2/3;var discrim=b*b/4 + a*a*a/27;var halfB=b/2;if(Math.abs(discrim)<=Polynomial.TOLERANCE)disrim=0;if(discrim>0){var e=Math.sqrt(discrim);var tmp;var root;tmp=-halfB+e;if(tmp>=0)root=Math.pow(tmp,1/3);else root=-Math.pow(-tmp,1/3);tmp=-halfB-e;if(tmp>=0)root+=Math.pow(tmp,1/3);else root-=Math.pow(-tmp,1/3);results.push(root-offset);}else if(discrim<0){var distance=Math.sqrt(-a/3);var angle=Math.atan2(Math.sqrt(-discrim),-halfB)/3;var cos=Math.cos(angle);var sin=Math.sin(angle);var sqrt3=Math.sqrt(3);results.push(2*distance*cos-offset);results.push(-distance*(cos+sqrt3*sin)-offset);results.push(-distance*(cos-sqrt3*sin)-offset);}else{var tmp;if(halfB>=0)tmp=-Math.pow(halfB,1/3);else tmp=Math.pow(-halfB,1/3);results.push(2*tmp-offset);results.push(-tmp-offset);}}return results;};
Polynomial.prototype.getQuarticRoots=function(){var results=new Array();if(this.getDegree()==4){var c4=this.coefs[4];var c3=this.coefs[3]/c4;var c2=this.coefs[2]/c4;var c1=this.coefs[1]/c4;var c0=this.coefs[0]/c4;var resolveRoots=new Polynomial(1,-c2,c3*c1-4*c0,-c3*c3*c0+4*c2*c0-c1*c1).getCubicRoots();var y=resolveRoots[0];var discrim=c3*c3/4-c2+y;if(Math.abs(discrim)<=Polynomial.TOLERANCE)discrim=0;if(discrim>0){var e=Math.sqrt(discrim);var t1=3*c3*c3/4-e*e-2*c2;var t2=(4*c3*c2-8*c1-c3*c3*c3)/(4*e);var plus=t1+t2;var minus=t1-t2;if(Math.abs(plus)<=Polynomial.TOLERANCE)plus=0;if(Math.abs(minus)<=Polynomial.TOLERANCE)minus=0;if(plus>=0){var f=Math.sqrt(plus);results.push(-c3/4 + (e+f)/2);results.push(-c3/4 + (e-f)/2);}if(minus>=0){var f=Math.sqrt(minus);results.push(-c3/4 + (f-e)/2);results.push(-c3/4 - (f+e)/2);}}else if(discrim<0){}else{var t2=y*y-4*c0;if(t2>=-Polynomial.TOLERANCE){if(t2<0)t2=0;t2=2*Math.sqrt(t2);t1=3*c3*c3/4-2*c2;if(t1+t2>=Polynomial.TOLERANCE){var d=Math.sqrt(t1+t2);results.push(-c3/4 + d/2);results.push(-c3/4 - d/2);}if(t1-t2>=Polynomial.TOLERANCE){var d=Math.sqrt(t1-t2);results.push(-c3/4 + d/2);results.push(-c3/4 - d/2);}}}}return results;};
function Vector2D(x,y){if(arguments.length>0){this.init(x,y);}}
Vector2D.prototype.init=function(x,y){this.x=x;this.y=y;};
Vector2D.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y);};
Vector2D.prototype.dot=function(that){return this.x*that.x+this.y*that.y;};
Vector2D.prototype.cross=function(that){return this.x*that.y-this.y*that.x;}
Vector2D.prototype.unit=function(){return this.divide(this.length());};
Vector2D.prototype.unitEquals=function(){this.divideEquals(this.length());return this;};
Vector2D.prototype.add=function(that){return new Vector2D(this.x+that.x,this.y+that.y);};
Vector2D.prototype.addEquals=function(that){this.x+=that.x;this.y+=that.y;return this;};
Vector2D.prototype.subtract=function(that){return new Vector2D(this.x-that.x,this.y-that.y);};
Vector2D.prototype.subtractEquals=function(that){this.x-=that.x;this.y-=that.y;return this;};
Vector2D.prototype.multiply=function(scalar){return new Vector2D(this.x*scalar,this.y*scalar);};
Vector2D.prototype.multiplyEquals=function(scalar){this.x*=scalar;this.y*=scalar;return this;};
Vector2D.prototype.divide=function(scalar){return new Vector2D(this.x/ scalar, this.y /scalar);};
Vector2D.prototype.divideEquals=function(scalar){this.x/=scalar;this.y/=scalar;return this;};
Vector2D.prototype.perp=function(){return new Vector2D(-this.y,this.x);};
Vector2D.fromPoints=function(p1,p2){return new Vector2D(p2.x-p1.x,p2.y-p1.y);};
Shape.prototype=new EventHandler();
Shape.prototype.constructor=Shape;
Shape.superclass=EventHandler.prototype;
function Shape(svgNode){if(arguments.length>0){this.init(svgNode);}}
Shape.prototype.init=function(svgNode){this.svgNode=svgNode;this.locked=false;this.visible=true;this.selected=false;this.callback=null;this.lastUpdate=null;}
Shape.prototype.show=function(state){var display=(state)?"inline":"none";this.visible=state;this.svgNode.setAttributeNS(null,"display",display);};
Shape.prototype.refresh=function(){};
Shape.prototype.update=function(){this.refresh();if(this.owner)this.owner.update(this);if(this.callback!=null)this.callback(this);};
Shape.prototype.translate=function(delta){};
Shape.prototype.select=function(state){this.selected=state;};
Shape.prototype.registerHandles=function(){};
Shape.prototype.unregisterHandles=function(){};
Shape.prototype.selectHandles=function(select){};
Shape.prototype.showHandles=function(state){};
Shape.prototype.mousedown=function(e){if(!this.locked){if(e.shiftKey){if(this.selected){mouser.unregisterShape(this);}else{mouser.registerShape(this);this.showHandles(true);this.selectHandles(true);this.registerHandles();}}else{if(this.selected){this.selectHandles(true);this.registerHandles();}else{mouser.unregisterShapes();mouser.registerShape(this);this.showHandles(true);this.selectHandles(false);}}}};
Circle.prototype=new Shape();
Circle.prototype.constructor=Circle;
Circle.superclass=Shape.prototype;
function Circle(svgNode){if(arguments.length>0){this.init(svgNode);}}
Circle.prototype.init=function(svgNode){if(svgNode.localName=="circle"){Circle.superclass.init.call(this,svgNode);var cx=parseFloat(svgNode.getAttributeNS(null,"cx"));var cy=parseFloat(svgNode.getAttributeNS(null,"cy"));var r=parseFloat(svgNode.getAttributeNS(null,"r"));this.center=new Handle(cx,cy,this);this.last=new Point2D(cx,cy);this.radius=new Handle(cx+r,cy,this);}else{throw new Error("Circle.init: Invalid SVG Node: "+svgNode.localName);}};
Circle.prototype.realize=function(){if(this.svgNode!=null){this.center.realize();this.radius.realize();this.center.show(false);this.radius.show(false);this.svgNode.addEventListener("mousedown",this,false);}};
Circle.prototype.translate=function(delta){this.center.translate(delta);this.radius.translate(delta);this.refresh();};
Circle.prototype.refresh=function(){var r=this.radius.point.distanceFrom(this.center.point);this.svgNode.setAttributeNS(null,"cx",this.center.point.x);this.svgNode.setAttributeNS(null,"cy",this.center.point.y);this.svgNode.setAttributeNS(null,"r",r);};
Circle.prototype.registerHandles=function(){mouser.register(this.center);mouser.register(this.radius);};
Circle.prototype.unregisterHandles=function(){mouser.unregister(this.center);mouser.unregister(this.radius);};
Circle.prototype.selectHandles=function(select){this.center.select(select);this.radius.select(select);};
Circle.prototype.showHandles=function(state){this.center.show(state);this.radius.show(state);};
Circle.prototype.getIntersectionParams=function(){return new IntersectionParams("Circle",[this.center.point,parseFloat(this.svgNode.getAttributeNS(null,"r"))]);};
Ellipse.prototype=new Shape();
Ellipse.prototype.constructor=Ellipse;
Ellipse.superclass=Shape.prototype;
function Ellipse(svgNode){if(arguments.length>0){this.init(svgNode);}}
Ellipse.prototype.init=function(svgNode){if(svgNode==null||svgNode.localName!="ellipse")throw new Error("Ellipse.init: Invalid localName: "+svgNode.localName);Ellipse.superclass.init.call(this,svgNode);var cx=parseFloat(svgNode.getAttributeNS(null,"cx"));var cy=parseFloat(svgNode.getAttributeNS(null,"cy"));var rx=parseFloat(svgNode.getAttributeNS(null,"rx"));var ry=parseFloat(svgNode.getAttributeNS(null,"ry"));this.center=new Handle(cx,cy,this);this.radiusX=new Handle(cx+rx,cy,this);this.radiusY=new Handle(cx,cy+ry,this);};
Ellipse.prototype.realize=function(){this.center.realize();this.radiusX.realize();this.radiusY.realize();this.center.show(false);this.radiusX.show(false);this.radiusY.show(false);this.svgNode.addEventListener("mousedown",this,false);};
Ellipse.prototype.refresh=function(){var rx=Math.abs(this.center.point.x-this.radiusX.point.x);var ry=Math.abs(this.center.point.y-this.radiusY.point.y);this.svgNode.setAttributeNS(null,"cx",this.center.point.x);this.svgNode.setAttributeNS(null,"cy",this.center.point.y);this.svgNode.setAttributeNS(null,"rx",rx);this.svgNode.setAttributeNS(null,"ry",ry);};
Ellipse.prototype.registerHandles=function(){mouser.register(this.center);mouser.register(this.radiusX);mouser.register(this.radiusY);};
Ellipse.prototype.unregisterHandles=function(){mouser.unregister(this.center);mouser.unregister(this.radiusX);mouser.unregister(this.radiusY);};
Ellipse.prototype.selectHandles=function(select){this.center.select(select);this.radiusX.select(select);this.radiusY.select(select);};
Ellipse.prototype.showHandles=function(state){this.center.show(state);this.radiusX.show(state);this.radiusY.show(state);};
Ellipse.prototype.getIntersectionParams=function(){return new IntersectionParams("Ellipse",[this.center.point,parseFloat(this.svgNode.getAttributeNS(null,"rx")),parseFloat(this.svgNode.getAttributeNS(null,"ry"))]);};
Handle.prototype=new Shape();
Handle.prototype.constructor=Handle;
Handle.superclass=Shape.prototype;
Handle.NO_CONSTRAINTS=0;
Handle.CONSTRAIN_X=1;
Handle.CONSTRAIN_Y=2;
function Handle(x,y,owner){if(arguments.length>0){this.init(x,y,owner);}}
Handle.prototype.init=function(x,y,owner){Handle.superclass.init.call(this,null);this.point=new Point2D(x,y);this.owner=owner;this.constrain=Handle.NO_CONSTRAINTS;}
Handle.prototype.realize=function(){if(this.svgNode==null){var svgns="http://www.w3.org/2000/svg";var handle=svgDocument.createElementNS(svgns,"rect");var parent;if(this.owner!=null&&this.owner.svgNode!=null){parent=this.owner.svgNode.parentNode;}else{parent=svgDocument.documentElement;}handle.setAttributeNS(null,"x",this.point.x-2);handle.setAttributeNS(null,"y",this.point.y-2);handle.setAttributeNS(null,"width",4);handle.setAttributeNS(null,"height",4);handle.setAttributeNS(null,"stroke","black");handle.setAttributeNS(null,"fill","white");handle.addEventListener("mousedown",this,false);parent.appendChild(handle);this.svgNode=handle;this.show(this.visible);}};
Handle.prototype.unrealize=function(){this.svgNode.removeEventListener("mousedown",this,false);this.svgNode.parentNode.removeChild(this.svgNode);};
Handle.prototype.translate=function(delta){if(this.constrain==Handle.CONSTRAIN_X){this.point.x+=delta.x;}else if(this.constrain==Handle.CONSTRAIN_Y){this.point.y+=delta.y;}else{this.point.addEquals(delta);}this.refresh();};
Handle.prototype.refresh=function(){this.svgNode.setAttributeNS(null,"x",this.point.x-2);this.svgNode.setAttributeNS(null,"y",this.point.y-2);};
Handle.prototype.select=function(state){Handle.superclass.select.call(this,state);if(state){this.svgNode.setAttributeNS(null,"fill","black");}else{this.svgNode.setAttributeNS(null,"fill","white");}};
Handle.prototype.mousedown=function(e){if(!this.locked){if(e.shiftKey){if(this.selected){mouser.unregister(this);}else{mouser.register(this);mouser.beginDrag(e);}}else{if(!this.selected){var owner=this.owner;mouser.unregisterAll();mouser.register(this);}mouser.beginDrag(e);}}};
Lever.prototype=new Shape();
Lever.prototype.constructor=Lever;
Lever.superclass=Shape.prototype;
function Lever(x1,y1,x2,y2,owner){if(arguments.length>0){this.init(x1,y1,x2,y2,owner);}}
Lever.prototype.init=function(x1,y1,x2,y2,owner){Lever.superclass.init.call(this,null);this.point=new Handle(x1,y1,this);this.lever=new LeverHandle(x2,y2,this);this.owner=owner;};
Lever.prototype.realize=function(){if(this.svgNode==null){var svgns="http://www.w3.org/2000/svg";var line=svgDocument.createElementNS(svgns,"line");var parent;if(this.owner!=null&&this.owner.svgNode!=null){parent=this.owner.svgNode.parentNode;}else{parent=svgDocument.documentElement;}line.setAttributeNS(null,"x1",this.point.point.x);line.setAttributeNS(null,"y1",this.point.point.y);line.setAttributeNS(null,"x2",this.lever.point.x);line.setAttributeNS(null,"y2",this.lever.point.y);line.setAttributeNS(null,"stroke","black");parent.appendChild(line);this.svgNode=line;this.point.realize();this.lever.realize();this.show(this.visible);}};
Lever.prototype.refresh=function(){this.svgNode.setAttributeNS(null,"x1",this.point.point.x);this.svgNode.setAttributeNS(null,"y1",this.point.point.y);this.svgNode.setAttributeNS(null,"x2",this.lever.point.x);this.svgNode.setAttributeNS(null,"y2",this.lever.point.y);};
LeverHandle.prototype=new Handle();
LeverHandle.prototype.constructor=LeverHandle;
LeverHandle.superclass=Handle.prototype;
function LeverHandle(x,y,owner){if(arguments.length>0){this.init(x,y,owner);}}
LeverHandle.prototype.realize=function(){if(this.svgNode==null){var svgns="http://www.w3.org/2000/svg";var handle=svgDocument.createElementNS(svgns,"circle");var parent;if(this.owner!=null&&this.owner.svgNode!=null){parent=this.owner.svgNode.parentNode;}else{parent=svgDocument.documentElement;}handle.setAttributeNS(null,"cx",this.point.x);handle.setAttributeNS(null,"cy",this.point.y);handle.setAttributeNS(null,"r",2.5);handle.setAttributeNS(null,"fill","black");handle.addEventListener("mousedown",this,false);parent.appendChild(handle);this.svgNode=handle;this.show(this.visible);}};
LeverHandle.prototype.refresh=function(){this.svgNode.setAttributeNS(null,"cx",this.point.x);this.svgNode.setAttributeNS(null,"cy",this.point.y);};
LeverHandle.prototype.select=function(state){LeverHandle.superclass.select.call(this,state);this.svgNode.setAttributeNS(null,"fill","black");};
Line.prototype=new Shape();
Line.prototype.constructor=Line;
Line.superclass=Shape.prototype;
function Line(svgNode){if(arguments.length>0){this.init(svgNode);}}
Line.prototype.init=function(svgNode){if(svgNode==null||svgNode.localName!="line")throw new Error("Line.init: Invalid localName: "+svgNode.localName);Line.superclass.init.call(this,svgNode);var x1=parseFloat(svgNode.getAttributeNS(null,"x1"));var y1=parseFloat(svgNode.getAttributeNS(null,"y1"));var x2=parseFloat(svgNode.getAttributeNS(null,"x2"));var y2=parseFloat(svgNode.getAttributeNS(null,"y2"));this.p1=new Handle(x1,y1,this);this.p2=new Handle(x2,y2,this);};
Line.prototype.realize=function(){this.p1.realize();this.p2.realize();this.p1.show(false);this.p2.show(false);this.svgNode.addEventListener("mousedown",this,false);};
Line.prototype.refresh=function(){this.svgNode.setAttributeNS(null,"x1",this.p1.point.x);this.svgNode.setAttributeNS(null,"y1",this.p1.point.y);this.svgNode.setAttributeNS(null,"x2",this.p2.point.x);this.svgNode.setAttributeNS(null,"y2",this.p2.point.y);};
Line.prototype.registerHandles=function(){mouser.register(this.p1);mouser.register(this.p2);};
Line.prototype.unregisterHandles=function(){mouser.unregister(this.p1);mouser.unregister(this.p2);};
Line.prototype.selectHandles=function(select){this.p1.select(select);this.p2.select(select);};
Line.prototype.showHandles=function(state){this.p1.show(state);this.p2.show(state);};
Line.prototype.cut=function(t){var cutPoint=this.p1.point.lerp(this.p2.point,t);var newLine=this.svgNode.cloneNode(true);this.p2.point.setFromPoint(cutPoint);this.p2.update();if(this.svgNode.nextSibling!=null)this.svgNode.parentNode.insertBefore(newLine,this.svgNode.nextSibling);else this.svgNode.parentNode.appendChild(newLine);var line=new Line(newLine);line.realize();line.p1.point.setFromPoint(cutPoint);line.p1.update();};
Line.prototype.getIntersectionParams=function(){return new IntersectionParams("Line",[this.p1.point,this.p2.point]);};
function Token(type,text){if(arguments.length>0){this.init(type,text);}}
Token.prototype.init=function(type,text){this.type=type;this.text=text;};
Token.prototype.typeis=function(type){return this.type==type;}
Path.prototype=new Shape();
Path.prototype.constructor=Path;
Path.superclass=Shape.prototype;
Path.COMMAND=0;
Path.NUMBER=1;
Path.EOD=2;
Path.PARAMS={A:["rx","ry","x-axis-rotation","large-arc-flag","sweep-flag","x","y"],a:["rx","ry","x-axis-rotation","large-arc-flag","sweep-flag","x","y"],C:["x1","y1","x2","y2","x","y"],c:["x1","y1","x2","y2","x","y"],H:["x"],h:["x"],L:["x","y"],l:["x","y"],M:["x","y"],m:["x","y"],Q:["x1","y1","x","y"],q:["x1","y1","x","y"],S:["x2","y2","x","y"],s:["x2","y2","x","y"],T:["x","y"],t:["x","y"],V:["y"],v:["y"],Z:[],z:[]};
function Path(svgNode){if(arguments.length>0){this.init(svgNode);}}
Path.prototype.init=function(svgNode){if(svgNode==null||svgNode.localName!="path")throw new Error("Path.init: Invalid localName: "+svgNode.localName);Path.superclass.init.call(this,svgNode);this.segments=null;this.parseData(svgNode.getAttributeNS(null,"d"));};
Path.prototype.realize=function(){for(var i=0;i<this.segments.length;i++){this.segments[i].realize();}this.svgNode.addEventListener("mousedown",this,false);};
Path.prototype.unrealize=function(){for(var i=0;i<this.segments.length;i++){this.segments[i].unrealize();}this.svgNode.removeEventListener("mousedown",this,false);};
Path.prototype.refresh=function(){var d=new Array();for(var i=0;i<this.segments.length;i++){d.push(this.segments[i].toString());}this.svgNode.setAttributeNS(null,"d",d.join(" "));};
Path.prototype.registerHandles=function(){for(var i=0;i<this.segments.length;i++){this.segments[i].registerHandles();}};
Path.prototype.unregisterHandles=function(){for(var i=0;i<this.segments.length;i++){this.segments[i].unregisterHandles();}};
Path.prototype.selectHandles=function(select){for(var i=0;i<this.segments.length;i++){this.segments[i].selectHandles(select);}};
Path.prototype.showHandles=function(state){for(var i=0;i<this.segments.length;i++){this.segments[i].showHandles(state);}};
Path.prototype.appendPathSegment=function(segment){segment.previous=this.segments[this.segments.length-1];this.segments.push(segment);};
Path.prototype.parseData=function(d){var tokens=this.tokenize(d);var index=0;var token=tokens[index];var mode="BOD";this.segments=new Array();while(!token.typeis(Path.EOD)){var param_length;var params=new Array();if(mode=="BOD"){if(token.text=="M"||token.text=="m"){index++;param_length=Path.PARAMS[token.text].length;mode=token.text;}else{throw new Error("Path data must begin with a moveto command");}}else{if(token.typeis(Path.NUMBER)){param_length=Path.PARAMS[mode].length;}else{index++;param_length=Path.PARAMS[token.text].length;mode=token.text;}}if((index+param_length)<tokens.length){for(var i=index;i<index+param_length;i++){var number=tokens[i];if(number.typeis(Path.NUMBER))params[params.length]=number.text;else throw new Error("Parameter type is not a number: "+mode+","+number.text);}var segment;var length=this.segments.length;var previous=(length==0)?null:this.segments[length-1];switch(mode){case"A":segment=new AbsoluteArcPath(params,this,previous);break;case"C":segment=new AbsoluteCurveto3(params,this,previous);break;case"c":segment=new RelativeCurveto3(params,this,previous);break;case"H":segment=new AbsoluteHLineto(params,this,previous);break;case"L":segment=new AbsoluteLineto(params,this,previous);break;case"l":segment=new RelativeLineto(params,this,previous);break;case"M":segment=new AbsoluteMoveto(params,this,previous);break;case"m":segment=new RelativeMoveto(params,this,previous);break;case"Q":segment=new AbsoluteCurveto2(params,this,previous);break;case"q":segment=new RelativeCurveto2(params,this,previous);break;case"S":segment=new AbsoluteSmoothCurveto3(params,this,previous);break;case"s":segment=new RelativeSmoothCurveto3(params,this,previous);break;case"T":segment=new AbsoluteSmoothCurveto2(params,this,previous);break;case"t":segment=new RelativeSmoothCurveto2(params,this,previous);break;case"Z":segment=new RelativeClosePath(params,this,previous);break;case"z":segment=new RelativeClosePath(params,this,previous);break;default:throw new Error("Unsupported segment type: "+mode);};this.segments.push(segment);index+=param_length;token=tokens[index];if(mode=="M")mode="L";if(mode=="m")mode="l";}else{throw new Error("Path data ended before all parameters were found");}}}
Path.prototype.tokenize=function(d){var tokens=new Array();while(d!=""){if(d.match(/^([ \t\r\n,]+)/)){d=d.substr(RegExp.$1.length);}else if(d.match(/^([aAcChHlLmMqQsStTvVzZ])/)){tokens[tokens.length]=new Token(Path.COMMAND,RegExp.$1);d=d.substr(RegExp.$1.length);}else if(d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)){tokens[tokens.length]=new Token(Path.NUMBER,parseFloat(RegExp.$1));d=d.substr(RegExp.$1.length);}else{throw new Error("Unrecognized segment command: "+d);}}tokens[tokens.length]=new Token(Path.EOD,null);return tokens;}
Path.prototype.intersectShape=function(shape){var result=new Intersection("No Intersection");for(var i=0;i<this.segments.length;i++){var inter=Intersection.intersectShapes(this.segments[i],shape);result.appendPoints(inter.points);}if(result.points.length>0)result.status="Intersection";return result;};
Path.prototype.getIntersectionParams=function(){return new IntersectionParams("Path",[]);};
function AbsolutePathSegment(command,params,owner,previous){if(arguments.length>0)this.init(command,params,owner,previous);};
AbsolutePathSegment.prototype.init=function(command,params,owner,previous){this.command=command;this.owner=owner;this.previous=previous;this.handles=new Array();var index=0;while(index<params.length){var handle=new Handle(params[index],params[index+1],owner);this.handles.push(handle);index+=2;}};
AbsolutePathSegment.prototype.realize=function(){for(var i=0;i<this.handles.length;i++){var handle=this.handles[i];handle.realize();handle.show(false);}};
AbsolutePathSegment.prototype.unrealize=function(){for(var i=0;i<this.handles.length;i++){this.handles[i].unrealize();}};
AbsolutePathSegment.prototype.registerHandles=function(){for(var i=0;i<this.handles.length;i++){mouser.register(this.handles[i]);}};
AbsolutePathSegment.prototype.unregisterHandles=function(){for(var i=0;i<this.handles.length;i++){mouser.unregister(this.handles[i]);}};
AbsolutePathSegment.prototype.selectHandles=function(select){for(var i=0;i<this.handles.length;i++){this.handles[i].select(select);}};
AbsolutePathSegment.prototype.showHandles=function(state){for(var i=0;i<this.handles.length;i++){this.handles[i].show(state);}};
AbsolutePathSegment.prototype.toString=function(){var points=new Array();var command="";if(this.previous==null||this.previous.constructor!=this.constuctor)command=this.command;for(var i=0;i<this.handles.length;i++){points.push(this.handles[i].point.toString());}return command+points.join(" ");};
AbsolutePathSegment.prototype.getLastPoint=function(){return this.handles[this.handles.length-1].point;};
AbsolutePathSegment.prototype.getIntersectionParams=function(){return null;};
AbsoluteArcPath.prototype=new AbsolutePathSegment();
AbsoluteArcPath.prototype.constructor=AbsoluteArcPath;
AbsoluteArcPath.superclass=AbsolutePathSegment.prototype;
function AbsoluteArcPath(params,owner,previous){if(arguments.length>0){this.init("A",params,owner,previous);}}
AbsoluteArcPath.prototype.init=function(command,params,owner,previous){var point=new Array();var y=params.pop();var x=params.pop();point.push(x,y);AbsoluteArcPath.superclass.init.call(this,command,point,owner,previous);this.rx=parseFloat(params.shift());this.ry=parseFloat(params.shift());this.angle=parseFloat(params.shift());this.arcFlag=parseFloat(params.shift());this.sweepFlag=parseFloat(params.shift());};
AbsoluteArcPath.prototype.toString=function(){var points=new Array();var command="";if(this.previous.constructor!=this.constuctor)command=this.command;return command+[this.rx,this.ry,this.angle,this.arcFlag,this.sweepFlag,this.handles[0].point.toString()].join(",");};
AbsoluteArcPath.prototype.getIntersectionParams=function(){return new IntersectionParams("Ellipse",[this.getCenter(),this.rx,this.ry]);};
AbsoluteArcPath.prototype.getCenter=function(){var startPoint=this.previous.getLastPoint();var endPoint=this.handles[0].point;var rx=this.rx;var ry=this.ry;var angle=this.angle*Math.PI/180;var c=Math.cos(angle);var s=Math.sin(angle);var TOLERANCE=1e-6;var halfDiff=startPoint.subtract(endPoint).divide(2);var x1p=halfDiff.x*c+halfDiff.y*s;var y1p=halfDiff.x*-s+halfDiff.y*c;var x1px1p=x1p*x1p;var y1py1p=y1p*y1p;var lambda=(x1px1p/ (rx*rx) ) + ( y1py1p /(ry*ry));if(lambda>1){var factor=Math.sqrt(lambda);rx*=factor;ry*=factor;}var rxrx=rx*rx;var ryry=ry*ry;var rxy1=rxrx*y1py1p;var ryx1=ryry*x1px1p;var factor=(rxrx*ryry-rxy1-ryx1)/(rxy1+ryx1);if(Math.abs(factor)<TOLERANCE)factor=0;var sq=Math.sqrt(factor);if(this.arcFlag==this.sweepFlag)sq=-sq;var mid=startPoint.add(endPoint).divide(2);var cxp=sq*rx*y1p/ry;var cyp=sq*-ry*x1p/rx;return new Point2D(cxp*c-cyp*s+mid.x,cxp*s+cyp*c+mid.y);};
AbsoluteCurveto2.prototype=new AbsolutePathSegment();
AbsoluteCurveto2.prototype.constructor=AbsoluteCurveto2;
AbsoluteCurveto2.superclass=AbsolutePathSegment.prototype;
function AbsoluteCurveto2(params,owner,previous){if(arguments.length>0){this.init("Q",params,owner,previous);}}
AbsoluteCurveto2.prototype.getControlPoint=function(){return this.handles[0].point;};
AbsoluteCurveto2.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier2",[this.previous.getLastPoint(),this.handles[0].point,this.handles[1].point]);};
AbsoluteCurveto3.prototype=new AbsolutePathSegment();
AbsoluteCurveto3.prototype.constructor=AbsoluteCurveto3;
AbsoluteCurveto3.superclass=AbsolutePathSegment.prototype;
function AbsoluteCurveto3(params,owner,previous){if(arguments.length>0){this.init("C",params,owner,previous);}}
AbsoluteCurveto3.prototype.getLastControlPoint=function(){return this.handles[1].point;};
AbsoluteCurveto3.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier3",[this.previous.getLastPoint(),this.handles[0].point,this.handles[1].point,this.handles[2].point]);};
AbsoluteHLineto.prototype=new AbsolutePathSegment();
AbsoluteHLineto.prototype.constructor=AbsoluteHLineto;
AbsoluteHLineto.superclass=AbsolutePathSegment.prototype;
function AbsoluteHLineto(params,owner,previous){if(arguments.length>0){this.init("H",params,owner,previous);}}
AbsoluteHLineto.prototype.init=function(command,params,owner,previous){var prevPoint=previous.getLastPoint();var point=new Array();point.push(params.pop(),prevPoint.y);AbsoluteHLineto.superclass.init.call(this,command,point,owner,previous);};
AbsoluteHLineto.prototype.toString=function(){var points=new Array();var command="";if(this.previous.constructor!=this.constuctor)command=this.command;return command+this.handles[0].point.x;};
AbsoluteLineto.prototype=new AbsolutePathSegment();
AbsoluteLineto.prototype.constructor=AbsoluteLineto;
AbsoluteLineto.superclass=AbsolutePathSegment.prototype;
function AbsoluteLineto(params,owner,previous){if(arguments.length>0){this.init("L",params,owner,previous);}}
AbsoluteLineto.prototype.toString=function(){var points=new Array();var command="";if(this.previous.constructor!=this.constuctor)if(this.previous.constructor!=AbsoluteMoveto)command=this.command;return command+this.handles[0].point.toString();};
AbsoluteLineto.prototype.getIntersectionParams=function(){return new IntersectionParams("Line",[this.previous.getLastPoint(),this.handles[0].point]);};
AbsoluteMoveto.prototype=new AbsolutePathSegment();
AbsoluteMoveto.prototype.constructor=AbsoluteMoveto;
AbsoluteMoveto.superclass=AbsolutePathSegment.prototype;
function AbsoluteMoveto(params,owner,previous){if(arguments.length>0){this.init("M",params,owner,previous);}}
AbsoluteMoveto.prototype.toString=function(){return"M"+this.handles[0].point.toString();};
AbsoluteSmoothCurveto2.prototype=new AbsolutePathSegment();
AbsoluteSmoothCurveto2.prototype.constructor=AbsoluteSmoothCurveto2;
AbsoluteSmoothCurveto2.superclass=AbsolutePathSegment.prototype;
function AbsoluteSmoothCurveto2(params,owner,previous){if(arguments.length>0){this.init("T",params,owner,previous);}}
AbsoluteSmoothCurveto2.prototype.getControlPoint=function(){var lastPoint=this.previous.getLastPoint();var point;if(this.previous.command.match(/^[QqTt]$/)){var ctrlPoint=this.previous.getControlPoint();var diff=ctrlPoint.subtract(lastPoint);point=lastPoint.subtract(diff);}else{point=lastPoint;}return point;};
AbsoluteSmoothCurveto2.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier2",[this.previous.getLastPoint(),this.getControlPoint(),this.handles[0].point]);};
AbsoluteSmoothCurveto3.prototype=new AbsolutePathSegment();
AbsoluteSmoothCurveto3.prototype.constructor=AbsoluteSmoothCurveto3;
AbsoluteSmoothCurveto3.superclass=AbsolutePathSegment.prototype;
function AbsoluteSmoothCurveto3(params,owner,previous){if(arguments.length>0){this.init("S",params,owner,previous);}}
AbsoluteSmoothCurveto3.prototype.getFirstControlPoint=function(){var lastPoint=this.previous.getLastPoint();var point;if(this.previous.command.match(/^[SsCc]$/)){var lastControl=this.previous.getLastControlPoint();var diff=lastControl.subtract(lastPoint);point=lastPoint.subtract(diff);}else{point=lastPoint;}return point;};
AbsoluteSmoothCurveto3.prototype.getLastControlPoint=function(){return this.handles[0].point;};
AbsoluteSmoothCurveto3.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier3",[this.previous.getLastPoint(),this.getFirstControlPoint(),this.handles[0].point,this.handles[1].point]);};
RelativePathSegment.prototype=new AbsolutePathSegment();
RelativePathSegment.prototype.constructor=RelativePathSegment;
RelativePathSegment.superclass=AbsolutePathSegment.prototype;
function RelativePathSegment(command,params,owner,previous){if(arguments.length>0)this.init(command,params,owner,previous);}
RelativePathSegment.prototype.init=function(command,params,owner,previous){this.command=command;this.owner=owner;this.previous=previous;this.handles=new Array();var lastPoint;if(this.previous)lastPoint=this.previous.getLastPoint();else lastPoint=new Point2D(0,0);var index=0;while(index<params.length){var handle=new Handle(lastPoint.x+params[index],lastPoint.y+params[index+1],owner);this.handles.push(handle);index+=2;}};
RelativePathSegment.prototype.toString=function(){var points=new Array();var command="";var lastPoint;if(this.previous)lastPoint=this.previous.getLastPoint();else lastPoint=new Point2D(0,0);if(this.previous==null||this.previous.constructor!=this.constructor)command=this.command;for(var i=0;i<this.handles.length;i++){var point=this.handles[i].point.subtract(lastPoint);points.push(point.toString());}return command+points.join(" ");};
RelativeClosePath.prototype=new RelativePathSegment();
RelativeClosePath.prototype.constructor=RelativeClosePath;
RelativeClosePath.superclass=RelativePathSegment.prototype;
function RelativeClosePath(params,owner,previous){if(arguments.length>0){this.init("z",params,owner,previous);}}
RelativeClosePath.prototype.getLastPoint=function(){var current=this.previous;var point;while(current){if(current.command.match(/^[mMzZ]$/)){point=current.getLastPoint();break;}current=current.previous;}return point;};
RelativeClosePath.prototype.getIntersectionParams=function(){return new IntersectionParams("Line",[this.previous.getLastPoint(),this.getLastPoint()]);};
RelativeCurveto2.prototype=new RelativePathSegment();
RelativeCurveto2.prototype.constructor=RelativeCurveto2;
RelativeCurveto2.superclass=RelativePathSegment.prototype;
function RelativeCurveto2(params,owner,previous){if(arguments.length>0){this.init("q",params,owner,previous);}}
RelativeCurveto2.prototype.getControlPoint=function(){return this.handles[0].point;};
RelativeCurveto2.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier2",[this.previous.getLastPoint(),this.handles[0].point,this.handles[1].point]);};
RelativeCurveto3.prototype=new RelativePathSegment();
RelativeCurveto3.prototype.constructor=RelativeCurveto3;
RelativeCurveto3.superclass=RelativePathSegment.prototype;
function RelativeCurveto3(params,owner,previous){if(arguments.length>0){this.init("c",params,owner,previous);}}
RelativeCurveto3.prototype.getLastControlPoint=function(){return this.handles[1].point;};
RelativeCurveto3.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier3",[this.previous.getLastPoint(),this.handles[0].point,this.handles[1].point,this.handles[2].point]);};
RelativeLineto.prototype=new RelativePathSegment();
RelativeLineto.prototype.constructor=RelativeLineto;
RelativeLineto.superclass=RelativePathSegment.prototype;
function RelativeLineto(params,owner,previous){if(arguments.length>0){this.init("l",params,owner,previous);}}
RelativeLineto.prototype.toString=function(){var points=new Array();var command="";var lastPoint;var point;if(this.previous)lastPoint=this.previous.getLastPoint();else lastPoint=new Point(0,0);point=this.handles[0].point.subtract(lastPoint);if(this.previous.constructor!=this.constuctor)if(this.previous.constructor!=RelativeMoveto)cmd=this.command;return cmd+point.toString();};
RelativeLineto.prototype.getIntersectionParams=function(){return new IntersectionParams("Line",[this.previous.getLastPoint(),this.handles[0].point]);};
RelativeMoveto.prototype=new RelativePathSegment();
RelativeMoveto.prototype.constructor=RelativeMoveto;
RelativeMoveto.superclass=RelativePathSegment.prototype;
function RelativeMoveto(params,owner,previous){if(arguments.length>0){this.init("m",params,owner,previous);}}
RelativeMoveto.prototype.toString=function(){return"m"+this.handles[0].point.toString();};
RelativeSmoothCurveto2.prototype=new RelativePathSegment();
RelativeSmoothCurveto2.prototype.constructor=RelativeSmoothCurveto2;
RelativeSmoothCurveto2.superclass=RelativePathSegment.prototype;
function RelativeSmoothCurveto2(params,owner,previous){if(arguments.length>0){this.init("t",params,owner,previous);}}
RelativeSmoothCurveto2.prototype.getControlPoint=function(){var lastPoint=this.previous.getLastPoint();var point;if(this.previous.command.match(/^[QqTt]$/)){var ctrlPoint=this.previous.getControlPoint();var diff=ctrlPoint.subtract(lastPoint);point=lastPoint.subtract(diff);}else{point=lastPoint;}return point;};
RelativeSmoothCurveto2.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier2",[this.previous.getLastPoint(),this.getControlPoint(),this.handles[0].point]);};
RelativeSmoothCurveto3.prototype=new RelativePathSegment();
RelativeSmoothCurveto3.prototype.constructor=RelativeSmoothCurveto3;
RelativeSmoothCurveto3.superclass=RelativePathSegment.prototype;
function RelativeSmoothCurveto3(params,owner,previous){if(arguments.length>0){this.init("s",params,owner,previous);}}
RelativeSmoothCurveto3.prototype.getFirstControlPoint=function(){var lastPoint=this.previous.getLastPoint();var point;if(this.previous.command.match(/^[SsCc]$/)){var lastControl=this.previous.getLastControlPoint();var diff=lastControl.subtract(lastPoint);point=lastPoint.subtract(diff);}else{point=lastPoint;}return point;};
RelativeSmoothCurveto3.prototype.getLastControlPoint=function(){return this.handles[0].point;};
RelativeSmoothCurveto3.prototype.getIntersectionParams=function(){return new IntersectionParams("Bezier3",[this.previous.getLastPoint(),this.getFirstControlPoint(),this.handles[0].point,this.handles[1].point]);};
Polygon.prototype=new Shape();
Polygon.prototype.constructor=Polygon;
Polygon.superclass=Shape.prototype;
function Polygon(svgNode){if(arguments.length>0){this.init(svgNode);}}
Polygon.prototype.init=function(svgNode){if(svgNode.localName=="polygon"){Polygon.superclass.init.call(this,svgNode);var points=svgNode.getAttributeNS(null,"points").split(/[\s,]+/);this.handles=new Array();for(var i=0;i<points.length;i+=2){var x=parseFloat(points[i]);var y=parseFloat(points[i+1]);this.handles.push(new Handle(x,y,this));}}else{throw new Error("Polygon.init: Invalid SVG Node: "+svgNode.localName);}};
Polygon.prototype.realize=function(){if(this.svgNode!=null){for(var i=0;i<this.handles.length;i++){this.handles[i].realize();this.handles[i].show(false);}this.svgNode.addEventListener("mousedown",this,false);}};
Polygon.prototype.refresh=function(){var points=new Array();for(var i=0;i<this.handles.length;i++){points.push(this.handles[i].point.toString());}this.svgNode.setAttributeNS(null,"points",points.join(" "));};
Polygon.prototype.registerHandles=function(){for(var i=0;i<this.handles.length;i++)mouser.register(this.handles[i]);};
Polygon.prototype.unregisterHandles=function(){for(var i=0;i<this.handles.length;i++)mouser.unregister(this.handles[i]);};
Polygon.prototype.selectHandles=function(select){for(var i=0;i<this.handles.length;i++)this.handles[i].select(select);};
Polygon.prototype.showHandles=function(state){for(var i=0;i<this.handles.length;i++)this.handles[i].show(state);};
Polygon.prototype.pointInPolygon=function(point){var length=this.handles.length;var counter=0;var x_inter;var p1=this.handles[0].point;for(var i=1;i<=length;i++){var p2=this.handles[i%length].point;if(point.y>Math.min(p1.y,p2.y)){if(point.y<=Math.max(p1.y,p2.y)){if(point.x<=Math.max(p1.x,p2.x)){if(p1.y!=p2.y){x_inter=(point.y-p1.y)*(p2.x-p1.x)/(p2.y-p1.y)+p1.x;if(p1.x==p2.x||point.x<=x_inter){counter++;}}}}}p1=p2;}return(counter%2==1);};
Polygon.prototype.getIntersectionParams=function(){var points=new Array();for(var i=0;i<this.handles.length;i++){points.push(this.handles[i].point);}return new IntersectionParams("Polygon",[points]);};
Polygon.prototype.getArea=function(){var area=0;var length=this.handles.length;var neg=0;var pos=0;for(var i=0;i<length;i++){var h1=this.handles[i].point;var h2=this.handles[(i+1)%length].point;area+=(h1.x*h2.y-h2.x*h1.y);}return area/2;};
Polygon.prototype.getCentroid=function(){var length=this.handles.length;var area6x=6*this.getArea();var x_sum=0;var y_sum=0;for(var i=0;i<length;i++){var p1=this.handles[i].point;var p2=this.handles[(i+1)%length].point;var cross=(p1.x*p2.y-p2.x*p1.y);x_sum+=(p1.x+p2.x)*cross;y_sum+=(p1.y+p2.y)*cross;}return new Point2D(x_sum/ area6x, y_sum /area6x);};
Polygon.prototype.isClockwise=function(){return this.getArea()<0;};
Polygon.prototype.isCounterClockwise=function(){return this.getArea()>0;};
Polygon.prototype.isConcave=function(){var positive=0;var negative=0;var length=this.handles.length;for(var i=0;i<length;i++){var p0=this.handles[i].point;var p1=this.handles[(i+1)%length].point;var p2=this.handles[(i+2)%length].point;var v0=Vector2D.fromPoints(p0,p1);var v1=Vector2D.fromPoints(p1,p2);var cross=v0.cross(v1);if(cross<0){negative++;}else{positive++;}}return(negative!=0&&positive!=0);};
Polygon.prototype.isConvex=function(){return!this.isConcave();};
Rectangle.prototype=new Shape();
Rectangle.prototype.constructor=Rectangle;
Rectangle.superclass=Shape.prototype;
function Rectangle(svgNode){if(arguments.length>0){this.init(svgNode);}}
Rectangle.prototype.init=function(svgNode){if(svgNode.localName=="rect"){Rectangle.superclass.init.call(this,svgNode);var x=parseFloat(svgNode.getAttributeNS(null,"x"));var y=parseFloat(svgNode.getAttributeNS(null,"y"));var width=parseFloat(svgNode.getAttributeNS(null,"width"));var height=parseFloat(svgNode.getAttributeNS(null,"height"));this.p1=new Handle(x,y,this);this.p2=new Handle(x+width,y+height,this);}else{throw new Error("Rectangle.init: Invalid SVG Node: "+svgNode.localName);}};
Rectangle.prototype.realize=function(){if(this.svgNode!=null){this.p1.realize();this.p2.realize();this.p1.show(false);this.p2.show(false);this.svgNode.addEventListener("mousedown",this,false);}};
Rectangle.prototype.refresh=function(){var min=this.p1.point.min(this.p2.point);var max=this.p1.point.max(this.p2.point);this.svgNode.setAttributeNS(null,"x",min.x);this.svgNode.setAttributeNS(null,"y",min.y);this.svgNode.setAttributeNS(null,"width",max.x-min.x);this.svgNode.setAttributeNS(null,"height",max.y-min.y);};
Rectangle.prototype.registerHandles=function(){mouser.register(this.p1);mouser.register(this.p2);};
Rectangle.prototype.unregisterHandles=function(){mouser.unregister(this.p1);mouser.unregister(this.p2);};
Rectangle.prototype.selectHandles=function(select){this.p1.select(select);this.p2.select(select);};
Rectangle.prototype.showHandles=function(state){this.p1.show(state);this.p2.show(state);};
Rectangle.prototype.getIntersectionParams=function(){return new IntersectionParams("Rectangle",[this.p1.point,this.p2.point]);};

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
