/**
 * @module "biojs-im-list-analysis"
 * @version 0.0.1
 * @author <a href="mailto:alex@intermine.org">Alex Kalderimis</a>
 * @license LGPL
 */
(function(biojs) {

  var ListWidgets = require('list-widgets');

  /**
   * @lends Biojs.InterMine
   */
  var module = (biojs.InterMine || (biojs.InterMine = {}));

  /**
   * @lends Biojs.InterMine.ListAnalysis
   **/
  module.ListAnalysis = ListAnalysis;

  /** Match strings that look like element ids, and not query selectors. **/
  var ELEMENT_ID = /^[a-z0-9_-]+$/i;

  /**
  * InterMine.ListAnalysis - Analyse a Set of Items Stored as an InterMine List
  * ===========================================================================
  *
  * This component wraps the functionality of the InterMine
  * <a href="http://github.com/intermine/intermine-apps-c">apps-c</a> library
  * as a BioJS component. It allows users to analyse groups of objects in
  * aggregate, through statistical analysis, graphical visualisation or
  * simple table display.
  *
  * @constructor
  * @class
  *
  * @requires <a href="https://github.com/intermine/intermine-apps-c">apps-c 2.0.4</a>
  *
  * @dependency <link rel="stylesheet" href="http://cdn.intermine.org/js/intermine/apps-c/list-widgets/2.0.4/app.bundle.prefixed.min.css">
  * @dependency <script src="http://cdn.intermine.org/js/intermine/apps-c/list-widgets/2.0.4/app.bundle.min.js"></script>
  *
  * @option {string|HTMLElement|jQuery} target
  *   The place in the DOM to load the table. The value of this can be anything
  *   you can pass to the jQuery selector. It must resolve to one and only one element.
  *   If the target is a string and contains no whitespace or css selector
  *   characters (<code>.</code>, <code>#</code>, <code>&gt;</code>, etc),
  *   it will be interpreted as an element id.
  * @option {string} [url]
  *   The url of the InterMine compatible service to connect to. If not provided, then the "service"
  *   option MUST be provided.
  * @option {string} [token]
  *   The token of a registered InterMine user. Providing this enables certain features, such
  *   as list creation. Should only be provided if the <code>url</code> option is provided.
  * @option [service]
  *   Information defining the service.
  * @option {string} [service.root]
  *   The url of the InterMine compatible service to connect to. 
  * @option {string} [service.token]
  *   The token of a registered InterMine user.
  * @option {string} tool
  *   The analysis tool to use. This must me a string of the form <code>TYPE:NAME</code>, where
  *   <code>TYPE</code> is one of the known widget types (<code>chart</code>,
  *   <code>enrichment</code>, <code>table</code>), and <code>NAME</code> is one of the
  *   tools registered in the mine. The list of available tools can be obtained by
  *   calls to <code>intermine.Service#fetchWidgets</code>.
  * @option {string} list
  *   The name of a list to analyse. This must be a list the user has access to.
  * 
  * @example
  * var widget = new Biojs.InterMine.ListAnalyis({
  *   target: 'some-element-id',
  *   url:    'http://www.flymine.org/query/service/',
  *   tool:   'enrichment:pathway_enrichment',
  *   list:   'PL FlyTF_putativeTFs'
  * });
  *
  */
  function ListAnalysis(options) {
    var widgets, parts, toolType, toolName, self = this;
    check(options, "No options supplied");
    this.element = resolveTarget(options.target);
    check(this.element, "Could not find " + options.target);
    check(options.url, "No URL supplied");
    check(options.tool, "No tool id supplied");
    check(options.list, "No list name supplied");
    parts = options.tool.split(':');
    check(parts.length === 2, "Tool id must be of the form {type}:{name}.");
    toolType = parts[0];
    toolName = parts[1];
    check(toolName.length, "Tool name not supplied");

    this._cbs = {};
    this._globalListeners = [];

    var config = Object.create(options.config || {});
    config.matchCb = this.fireEvent.bind(this,"onClickMatch");
    config.resultsCb = this.fireEvent.bind(this, "onClickViewResults");
    config.listCb = this.fireEvent.bind(this, "onClickCreateList");

    self.widgets = widgets = new ListWidgets({root: options.url, token: options.token});
    check(widgets[toolType], "Unknown tool type: " + toolType);
    widgets[toolType](toolName, options.list, this.element, config);

  }

  ListAnalysis.prototype = {

    constructor: ListAnalysis

     /** The events that this component may emit. **/
    ,eventTypes: [

      /**
       * Called when the user has clicked on a match.
       * @event
       * @name Biojs.InterMine.ListAnalysis#onClickMatch
       * @param {function} callback The function to call.
       * @eventData {string} identifier The identifier of the object.
       * @eventData {string} type The Type of the object.
       *
       * @example
       * widget.addListener('onClickMatch', function (ident, type) {
       *   alert("User clicked on the " + type + " " + ident);
       * });
       */
      'onClickMatch',

      /**
       * Called when the user has clicked on a button to show results.
       * @event
       * @name Biojs.InterMine.ListAnalysis#onClickViewResults
       * @param {function} callback The function to call.
       * @eventData {Object} query
       *  An InterMine query object (suitable for passing to <code>intermine.Service#query</code>).
       *
       * @example
       * widget.addListener('onClickViewResults', function (query) {
       *   alert("The user wants to view the results of " + query);
       * });
       */
      'onClickViewResults',

      /**
       * Called when the user has clicked on a button to create a list.
       * @event
       * @name Biojs.InterMine.ListAnalysis#onClickCreateList
       * @param {function} callback The function to call.
       * @eventData {Object} query
       *  An InterMine query object (suitable for passing to <code>intermine.Service#query</code>).
       *
       * @example
       * widget.addListener('onClickCreateList', function (query) {
       *   alert("The user wants to save the results of " + query + " as a list");
       * });
       */
      'onClickCreateList'
        ]

    /**
     * Add a event handler for the named event.
     *
     * @param {string} eventName
     *  The name of the event to handle.
     * @param {function} callback
     *  The handler to call when events of this name are received.
     *
     */
   ,addListener: function (eventName, callback) {
     if (!(eventName && callback)) {
       throw new Error("Both eventName and callback are required arguments");
     }
     if ("string" !== typeof eventName) {
       throw new Error(eventName + " is not a string");
     }
     if ("function" !== typeof callback) {
       throw new Error(callback + " is not a function");
     }
     var cbs = this._cbs;
     var cbsForThisEvent = (cbs[eventName] || (cbs[eventName] = []));
     cbsForThisEvent.push(callback);
    }

    /**
     * Receive notification of all events.
     *
     * This function proxies all events to the supplied listener.
     *
     * The event type is not defined, so this listener should be capable of
     * handling variadic arguments.
     *
     * @param {function} callback
     * @eventData {string} eventName The name of the event.
     * @eventData {Object...} args The event arguments.
     */
   ,onAllEvents: function (callback) {
     if ("function" !== typeof callback) {
       throw new Error(callback + " is not a function.");
     }
     this._globalListeners.push(callback);
    }

    /**
     * Remove this component from the DOM and release all its resources.
     * 
     * This method should always be called if the component is to be disposed of,
     * or else event handler callbacks will likely result in memory leaks.
     *
     * @example
     * widget.destroy();
     *
     */
   ,destroy: function () {
     this._cbs = {};
     this._globalListeners = [];
     this.widgets = null;
     this.element && (this.element.innerHTML = '');
     this.element = null;
    }

    /**
     * Fire an event with the given name and event data.
     *
     * @private
     * @param {string} eventName
     *  The name of the event to trigger.
     * @param {Object...} args
     *  The event arguments to send to handlers.
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

  /** @private **/
  function check(test, message) {
    if (!test) throw new Error(message);
  }

  /** @private **/
  function resolveTarget(target) {
    if (!target) throw new Error("No target specified");
    if (typeof target == 'string') {
      if (ELEMENT_ID.test(target)) {
        return document.getElementById(target);
      } else {
        return document.querySelector(target);
      }
    } else {
      if (target.length > 1) throw new Error("Multiple elements in target selection");
      return target;
    }
  }

})(window.Biojs || (window.Biojs = {}));
