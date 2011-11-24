/**
 *  
 * Extension of the pdb file viewer getting data from a web service
 * 
 * @class
 * @extends Biojs.PdbViewer
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @param {Object} options An object with the options for the component.
 * 
 * @option {string} [pdbUrl="http://www.ebi.ac.uk/pdbe-srv/view/files"] 
 *    Url of the web service in order to require the pdb file.
 * 
 * @option {string} [id]
 *    Identifier of the pdb to be displayed (i.e. '3nuc' to require 3nuc.pdb file). You can load another pbd by using requestPdb method.
 *    
 * @option {string} [proxyUrl="../biojs/dependencies/proxy/proxy.php"] 
 *    Server side proxy server. 
 * 
 * @example
 * 
 * var instance = new Biojs.PdbViewerWS({
 * 		target: 'YourOwnDivId',
 * 		id: '3nuc'
 * });	
 * 
 * console.log(instance);
 * 
 */
Biojs.PdbViewerWS = Biojs.PdbViewer.extend(
/** @lends Biojs.PdbViewerWS# */
{
	constructor: function(options){
		this.base(options);
		//constructor of Biojs.PdbViewerWS
		if (this.opt.id !== undefined) {
			this.requestPdb(this.opt.id);
		}
	},
	
	opt: {
	   id: undefined,
	   pdbUrl: 'http://www.ebi.ac.uk/pdbe-srv/view/files',
	   proxyUrl: '../biojs/dependencies/proxy/proxy.php'
	},
	
	eventTypes : [
  		/**
  		 * @name Biojs.PdbViewerWS#onRequestError
  		 * @event
  		 * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
  		 * @eventData {Object} source The component which did triggered the event.
  		 * @eventData {string} file The name of the loaded file.
  		 * @eventData {string} result A string with either value 'success' or 'failure'.
  		 * @eventData {string} message Error message in case of result be 'failure'.
  		 * 
  		 * @example 
  		 * instance.onRequestError(
  		 *    function( e ) {
  		 *       alert( e.message );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onRequestError"
	],
	
	requestPdb: function(pdbId) {
		var self = this;
		$.ajax({
			url: self.opt.proxyUrl,
			data: 'url='+self.opt.pdbUrl+'/'+pdbId+'.pdb',
			dataType: 'text',
			success: function (pdbContent) {
				self.setPdb(pdbContent);
			},
			error: function(qXHR, textStatus, errorThrown){
				self.raiseEvent('onRequestError', {message: textStatus});
			}
		});
	},
	
	setPdb: function(pdb) {
		this.base(pdb);
	}


});