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
        newObj[i] = utils.clone(obj[i]);
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
