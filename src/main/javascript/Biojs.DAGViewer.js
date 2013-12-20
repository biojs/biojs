/**
 * @module "biojs-dag-viewer"
 * @version 0.0.1
 * @author <a href="mailto:alex@intermine.org">Alex Kalderimis</a>
 * @license LGPL
 */
(function (module) {
  /**
   * @lends Biojs.DAGViewer
   **/
  module.DAGViewer = DAGViewer;

  // A plain alpha-numeric string with underscores and hyphens.
  var ID_RE = /^[a-z0-9_-]+$/i;

  /**
   * DAGViewer - Convenient Display of Directed Acyclic Graphs
   * ============================================================
   *
   * A component for displaying directed acyclic graphs (DAGs)
   * in a visually clear manner.
   *
   * @constructor
   * @class
   *
   * @requires <a href="https://github.com/alexkalderimis/dagify">Dagify</a>
   * @requires <a href="http://foundation.zurb.com/">Foundation 5</a>
   * @requires <a href="http://jquery.com/download/">jQuery 1.9.1</a>
   * @requires <a href="http://jqueryui.com/download/">jQuery-UI 1.10.3</a>
   *
   * @dependency <link rel="stylesheet" href="http://cdn.intermine.org/css/foundation/5.0/css/foundation.css">
   * @dependency <link rel="stylesheet" href="http://cdn.intermine.org/css/font-awesome/3.0.2/css/font-awesome.css">
   * @dependency <script src="http://cdn.intermine.org/css/foundation/5.0/js/modernizr.js"></script>
   * @dependency <script src="http://cdn.intermine.org/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
   * @dependency <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
   * @dependency <link rel="stylesheet" type="text/css" href="http://cdn.intermine.org/js/intermine/dag-viewer/0.0.1-pre/style.css">
   * @dependency <script charset="UTF-8" type="text/javascript" src="http://cdn.intermine.org/js/intermine/dag-viewer/0.0.1-pre/index.js"></script></script>
   * @dependency <script src="http://cdn.intermine.org/css/foundation/5.0/js/foundation/foundation.js"></script>
   *
   * @option {string|element|jQuery} target
   *  A reference to the element into which the component should be rendered.
   * @option {String[]} [nodeLabels=["name", "value", "label", "class"]]
   *  The properties of each node object that should be read for a label to display, in order of priority.
   * @option {String[]} [edgeLabels=["name", "value", "label", "class"]]
   *  The properties of each edge object that should be read for a label to display, in order of priority.
   * @option {Number[]} [rankScale=[1,1]]
   *  The opacity gradient to apply to each node in the graph, from leaf to highest level. As opacity levels,
   *  each value must be within the range 0 <= x <= 1.
   * @option {function} [isClosable=function (node) { return true; }]
   *  A handler to determine if a node is closable.
   * @option {String} [termTemplate="<%- name %> (<%- identifier %>)"]
   *  A string to render a node in the filter section of the controls.
   * @option {function} [termKey=function (t) { return t.identifier }]
   *  Return the integration key for nodes.
   * @option {function} [getEnds]
   *  Return the source and target of an edge. The default implementation is to 
   *  call the current nodeKey function on the source and target properties (also
   *  configurable) of the edge.
   * @option {function} [edgeKey]
   *  A function that returns a unique identifier for each edge.
   * @option {function} [nodeKey]
   *  A function that returns a unique identifier for each node.
   * @option {function} [getNodeClass]
   *  A function that returns a string to be used as a class name for each node.
   */
  function DAGViewer (options) {
    var element, w;
    if (!options) {
      throw new Error("No options provided");
    }
    element = resolveElement(options.target);
    if (!element) {
      throw new Error(options.target + " not found");
    }
    this._cbs = {};
    this._globalListeners = [];
    this._widget = w = new DAGWidget(options);
    w.setElement(element);
    w.render();

    // Proxy all events.
    w.on('all', this.fireEvent.bind(this));
  }

  DAGViewer.prototype = {

     constructor: DAGViewer

    ,eventTypes: [

      /**
       * Called when a node in the Graph has been clicked on.
       * @event
       * @name Biojs.InterMineTable#click:node
       * @param {function} callback The function to call.
       * @eventData {String} id The id of the node.
       * @eventData {Backbone.Model} node The model representing the node.
       *
       * @example
       * table.addListener('click:node', function (id, node) {
       *   alert(node.get('name'));
       * });
       */
      'onQueryChanged',

      /**
       * Called when an edge in the Graph has been clicked on.
       * @event
       * @name Biojs.InterMineTable#click:edge
       * @param {function} callback The function to call.
       * @eventData {Graph} graph The current graph.
       * @eventData {String} edgeId The id of the current edge.
       *
       * @example
       * table.addListener('click:edge', function (graph, edge) {
       *   var src = graph.node(edge.get('source'));
       *   var tgt = graph.node(edge.get('target'));
       *   alert(src.get('name') + ' are ' + tgt.get('name'));
       * });
       */
      'onQueryError'
      ]
    
     /**
      * Set the graph model that this viewer presents.
      *
      * This method sets this graph as the current graph, and triggers
      * the viewer to render the data. The graph should be an object
      * with "nodes" and "edges" properties, which must be arrays of
      * objects. The precise interface of the node and edge objects
      * is flexible - see the constructor options above.
      *
      * @param {Object} graph The graph to view.
      *
      * @example
      * var graph = {
      *   nodes: [
      *     {id: 1, name: "Animals"},
      *     {id: 2, name: "Fish"},
      *     {id: 3, name: "Reptiles"},
      *     {id: 4, name: "Dinosaurs"},
      *     {id: 5, name: "Mammals"},
      *     {id: 6, name: "Birds"}
      *   ],
      *   edges: [
      *     {source: 2, target: 1},
      *     {source: 3, target: 2},
      *     {source: 4, target: 3},
      *     {source: 5, target: 3},
      *     {source: 6, target: 4}
      *   ]
      * };
      * viewer.setGraph(graph);
      *
      */
    ,setGraph: function (graph) {
        this._widget.setGraph(graph);
     }

    /**
     * Add a event handler for the named event.
     *
     * @param {string} eventName
     *  The name of the event to handle.
     * @param {function} callback
     *  The handler to call when events of this name are received.
     *
     * @example
     * viewer.addListener('event:happened', function(why, when) {
     *   alert("An event happened at " + when + " because " + why);
     * });
     */
    ,addListener: function (eventName, callback) {
      if (!(eventName && callback)) {
        throw new Error("Both eventName and callback are required arguments");
      }
      var cbs = this._cbs;
      var cbsForThisEvent = (cbs[eventName] || (cbs[eventName] = []));
      cbsForThisEvent.push(callback);
     }

    /**
     * Remove this component from the DOM and release all its resources.
     * 
     * This method should always be called if the component is to be disposed of,
     * or else event handler callbacks will likely result in memory leaks.
     *
     * @example
     * viewer.destroy();
     *
     */
    ,destroy: function () {
      this._cbs = {};
      this._globalListeners = [];
      this._widget.remove();
      this._widget = null;
      this.options = null;
     }

    /**
     * Fire an event with the given name and event data.
     *
     * @private
     * @param {string} eventName
     *  The name of the event to trigger.
     * @param {Object...} args
     *  The event arguments to send to handlers.
     *
     * @example
     * viewer.fireEvent('event:happened', 'because reasons', new Date());
     *
     */
    ,fireEvent: function (eventName) {
      if (!eventName) {
        throw new Error("Not enough arguments - at least one is required.");
      }
      var args = [].slice.call(arguments, 1)
        , cbs = this._cbs
        , cbsForThisEvent = (cbs[eventName] || (cbs[eventName] = [])).slice()
        , globalListeners = this._globalListeners.slice()
        , cb;

      while (cb = globalListeners.shift()) {
        cb.apply(null, arguments);
      }

      while (cb = cbsForThisEvent.shift()) {
        cb.apply(null, args);
      }
     }

  };
  
  /**
   * Resolve a target parameter to an element.
   * @private
   */
  function resolveElement (target) {
    if (typeof target === 'string') {
      if (ID_RE.test(target)) {
        return document.getElementById(target);
      } else {
        return download.querySelector(target);
      }
    } else if (target && target.appendChild) {
      return target; // It is an element
    } else if (target && target.append && target.length) {
      // A jqueryish thing.
      if (target.length > 1) {
        throw new Error(target + " refers to more than one element");
      }
      return target[0];
    }
    throw new Error("Could not interpret '" + target + "' as an element");
  }

})(window.Biojs || (window.Biojs = {}), window.jQuery || window.$);
