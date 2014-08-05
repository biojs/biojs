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
