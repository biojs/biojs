/**
 * Biojs.InterMineTable
 * @version 0.0.1
 */
(function(module, $) {

  module.InterMineTable = InterMineTable;

  var CCS_CHARS = /[\s\.#=>]/;

  try {
    // Try to enable the Location formatter.
    intermine.results.formatsets.genomic["Location.start"] = true;
  } catch (e) {
    // Ignore.
  }

  /**
  * InterMineTable - Display tables of data from an InterMine Data Warehouse
  * ======================================================================
  *
  * This component wraps the functionality of the InterMine im-tables
  * library (http://github.com/intermine/im-tables) as a BioJS component. It allows
  * data to be presented to a user, and manipulated by adding or removing 
  * columns, changing the constraints, sort-order etc. Data can be exported
  * from this widget in a number of formats, or saved on InterMine web-sites as
  * lists, or sent to third party services.
  *
  * @class
  * @lends Biojs.InterMineTable
  * @author <a href="mailto:alex@intermine.org">Alex Kalderimis</a>
  * @requires <a href="https://github.com/intermine/im-tables">im-tables 1.5</a>
  * @dependency <link rel="stylesheet" type="text/css" href="http://cdn.intermine.org/js/intermine/im-tables/latest/imtables.css">
  * @dependency <script charset="UTF-8" type="text/javascript" src="http://cdn.intermine.org/js/intermine/im-tables/latest/imtables-bundled.js">
  * @dependency <a href="http://www.flymine.org">An Intermine Webservice Endpoint, such as FlyMine</a>
  *
  * @option {string|element|jQuery} target
  *   The place in the DOM to load the table. The value of this can be anything
  *   you can pass to the jQuery selector. It must resolve to one and only one element.
  *   If the target is a string and contains no css selector characters (., #, &gt;, etc), it
  *   will be interpreted as an element id.
  * @option {string} [url]
  *   The url of the InterMine compatible service to connect to. If not provided, then the "service"
  *   option MUST be provided.
  * @option {string} [token]
  *   The token of a registered InterMine user. Providing this enables certain features, such
  *   as list creation.
  * @option {intermine.Service} [service]
  *   An instance of intermine.Service to use to connect to a remote InterMine compatible web-service.
  * @option {Object|intermine.Query} query
  *   The query definition, either as a plain javascript object, or as an instance of intermine.Query.
  *   syntax:
  *     <pre class="brush: js" title="Syntax:">
  *       {
  *         from: &lt;root-class&gt;,
  *         select: [&lt;field-0&gt;, &lt;field-1&gt; ..., &lt;field-n&gt;],
  *         where: [&lt;constraint-0&gt;, &ltconstraint-0&gt;, ..., &lt;constraint-n&gt;],
  *         orderBy: [&lt;sort-order-0&gt;, &ltsort-order-0&gt;, ..., &lt;sort-order-n&gt;]
  *       }
  *     </pre>
  *   example:
  *     <pre class="brush: js" title="Example:">
  *       {
  *         from: 'Gene',
  *         select: ['*', 'proteins.*'],
  *         where: [{path: 'proteins.molecularWeight', op: '&lt;', value: 10000}]
  *       }
  *     </pre>
  *   See the InterMine documentation for a complete introduction to query syntax.
  *
  * @example
  * var table = new Biojs.InterMineTable({
  *   target: "table-container",
  *   url: "http://www.flymine.org/query",
  *   query: {
  *     from: 'Organism',
  *     select: ['commonName', 'name', 'taxonId']
  *   }
  * });
  *
  **/
  function InterMineTable (options) {
    var target, $elem, w, that;
    if (!options) {
      throw new Error("No options supplied");
    }
    this._cbs = {};
    this._globalListeners = [];
    this.options = Object.create(options);
    this.options.type = 'table';
    this.options.events || (this.options.events = {});
    this.options.events.all = this.fireEvent.bind(this);

    target = options.target;
    if (typeof target === 'string' && !CCS_CHARS.test(target)) {
      target = document.getElementById(target);
    }
    $elem = $(target);
    if (!$elem.length) {
      throw new Error(options.target + " not found");
    } else if ($elem.length > 1) {
      throw new Error(options.target + " refers to more than one element");
    }

    this.widget = w =$elem.imWidget(this.options);
    that = this;
    w.states.on("add remove reset", function () {
      that.fireEvent("onQueryChanged", w.states.currentQuery);
    });
  }

  InterMineTable.prototype = {

    constructor: InterMineTable

     // There are many events that may be triggered - some are listed here.
    ,eventTypes: [

      /**
       * Called when the query has been changed by the user.
       * @event
       * @name Biojs.InterMineTable#onQueryChanged
       * @param {function} callback The function to call.
       * @eventData {intermine.Query} The current state of the query.
       *
       * @example
       * table.addListener('onQueryChanged', function (query) {
       *   alert("Query is now " + query.toXML());
       * });
       */
      'onQueryChanged',

      /**
       * Called when the query could not be changed due to problems with
       * the input or the service.
       * @event
       * @name Biojs.InterMineTable#onQueryError
       * @param {function} callback The function to call.
       * @eventData {Error} The error encountered.
       *
       * @example
       * table.addListener('onQueryError', function (err) {
       *   alert("Could not change query: " + err);
       * });
       */
      'onQueryError',

      /**
       * Called when the number of rows for a query is known.
       * @event
       * @name Biojs.InterMineTable#count:is
       * @param {function} callback The function to call.
       * @eventData {int} The number of rows this query returns.
       *
       * @example
       * table.addListener('count:is', function (c) {
       *   alert('Total result set size: ' + c);
       * });
       */
      'count:is',

      /**
       * Called when the table has finished rendering a page of rows.
       * @event
       * @name Biojs.InterMineTable#table:filled
       * @param {function} callback The function to call.
       *
       * @example
       * table.addListener('table:filled', function () {
       *   alert("Table filled");
       * });
       */
      'table:filled',

      /**
       * Called when the user has viewed a new page of data.
       * @event
       * @name Biojs.InterMineTable#imtable:change:page
       * @param {function} callback The function to call.
       * @eventData {int} pageNumber The current page number.
       *
       * @example
       * table.addListener('imtable:change:page', function (pn) {
       *   alert("Now on page " + pn);
       * });
       */
      'imtable:change:page',

      /**
       * Called when the user clicks on a cell in the table.
       * @event
       * @name Biojs.InterMineTable#imo:click
       * @param {function} callback The function to call.
       * @eventData {string} className The name of the class of the object (eg: "Gene").
       * @eventData {int} objectId The internal object ID of this object.
       *
       * @example
       * table.addListener('imo:click', function (type, id) {
       *   alert("User clicked on " + type + " " + id);
       * });
       */
      'imo:click',

      /**
       * Called when the user has created a list.
       * @event
       * @name Biojs.InterMineTable#list-creation:success
       * @param {function} callback The function to call.
       * @eventData {intermine.List} The list which was created.
       *
       * @example
       * table.addListener('list-creaton:success', function (list) {
       *   alert("New list: " + list.name + " " + list.size + " " + list.type + "s");
       * });
       */
      'list-creation:success',

      /**
       * Called when the user has failed to create a list.
       * @event
       * @name Biojs.InterMineTable#list-creation:failure
       * @param {function} callback The function to call.
       * @eventData {Error} The error which prevented the list being created.
       *
       * @example
       * table.addListener('list-creation:failure', function (err) {
       *   alert("Could not create list: " + err);
       * });
       */
      'list-creation:failure',

      /**
       * Called when the user has updated a list.
       * @event
       * @name Biojs.InterMineTable#list-update:success
       * @param {function} callback The function to call.
       * @eventData {intermine.List} The list which was updated.
       * @eventData {int} delta The number of items added (may be negative).
       *
       * @example
       * table.addListener('list-update:success', function (list, delta) {
       *   alert("Size of " + list.name + " changed by " + delta);
       * });
       */
      'list-update:success',
      
      /**
       * Called when the user has failed to update a list.
       * @event
       * @name Biojs.InterMineTable#list-update:failure
       * @param {function} callback The function to call.
       * @eventData {Error} The error which prevented the list being updated.
       *
       * @example
       * table.addListener('list-update:failure', function (err) {
       *   alert("Could not update list: " + err);
       * });
       */
      'list-update:failure'
     ]

    /**
     * Change the current query.
     *
     * This sets a given query as the new current state of the table.
     * 
     * @param {Object|intermine.Query} query The new query to set.
     * @param {string} [description="replaced"] The reason why the query was changed.
     * @return {Promise} A promise to make a Query from the given input.
     *
     * @example
     * table.setQuery({
     *   from: 'Gene',
     *   select: ['*', 'chromosomeLocation.*'],
     *   where: {
     *     'proteins.molecularWeight': {lt: 5000 } // kilodaltons
     *   }
     * });
     */
   ,setQuery: function (query, description) {
     var that = this, w = this.widget;
     description = (description || "Replaced manually");
     var promise = w.service.query(query);
     promise.then(function (q) {
       w.states.addStep(description, q);
     }, function (err) {
       that.trigger("onQueryError", err);
     });
     return promise;
    }

    /**
     * Receive notification of changes to the underlying query.
     *
     * The user may change the query underlying the result-table, and thus
     * the results displayed. This may involve changing the columns selected,
     * the constraints on the query, or a number of other things.
     *
     * @param {function} callback The function to call.
     * @eventData {intermine.Query} The current state of the query.
     */
   ,onQueryChanged: function (callback) {
     this.addListener('onQueryChanged', callback);
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
     * @eventData {Object[]...} args The event arguments.
     */
   ,onAllEvents: function (callback) {
     if (!callback || !callback.apply) {
       throw new Error("No callback, or callback is not a function");
     }
     this._globalListeners.push(callback);
    }

    /**
     * Add a event handler for the named event.
     *
     * @param {string} eventName
     *  The name of the event to handle.
     * @param {function} callback
     *  The handler to call when events of this name are received.
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
     */
   ,destroy: function () {
     this._cbs = {};
     this._globalListeners = [];
     this.widget.remove();
     this.widget = null;
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

})(window.Biojs || (window.Biojs = {}), window.jQuery);
