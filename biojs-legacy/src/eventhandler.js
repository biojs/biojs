var event = require("./event");

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
	  event.on(this.eventType, actionPerformed);
	};
    /**
     * Removes an action listener for the event.
     * @param {function} actionPerformed The action listener to be removed.
     */
	this.removeListener = function ( actionPerformed ) {
    event.off(this.eventType, actionPerformed);
	};

	/**
     * Executes all listener actions registered in the listeners field.
     * @param {Object} eventObject The event' object to be passed as argument to the listeners.
     */
	this.triggerEvent = function( eventObject ) {
	  event.trigger(this.eventType, eventObject);
	}
};

module.exports = eventHandler;
