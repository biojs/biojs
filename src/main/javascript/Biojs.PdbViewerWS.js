/**
 *  
 * Extension of the pdb file viewer getting data from a web service
 * 
 * @class
 * @extends Biojs.PdbViewer
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @option {string} [url=http://www.ebi.ac.uk/pdbe-srv/view/files] 
 *    Url of the web service in order to require the pdb file.
 * 
 * @option {string} id
 *    Identifier of the pdb to be displayed (i.e. '3nuc' to require 3nuc.pdb file). You can load another pbd by using setPdb method.
 *    
 * @option {string} [proxy='../biojs/dependencies/proxy/proxy.php']
 *    Server side proxy server. 
 * 
 * @example
 * 
 * var myPdbViewer = new Biojs.PdbViewerWS({
 * 		target: 'YourOwnDivId',
 * 		id: '3nuc'
 * });	
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
	   url: 'http://www.ebi.ac.uk/pdbe-srv/view/files',
	   proxy: '../biojs/dependencies/proxy/proxy.php'
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
  		 * myPdbViewer.onRequestError(
  		 *    function( objEvent ) {
  		 *       alert( objEvent.message );
  		 *    }
  		 * ); 
  		 * 
  		 * */
  		"onRequestError"
	],
	
	requestPdb: function(pdbId) {
		var self = this;
		$.ajax({
			url: self.opt.proxy,
			data: 'url='+self.opt.url+'/'+pdbId+'.pdb',
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