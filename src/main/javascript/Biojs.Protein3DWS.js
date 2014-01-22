/**
 *  
 * Extension of the pdb file viewer getting data from a web service
 * 
 * @class
 * @extends Biojs.Protein3D
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>
 * @version 1.0.0
 * @category 2
 * 
 * @requires <a href=''>Server side proxy</a>
 * 
 * @param {Object} options An object with the options for the component.
 * 
 * @option {string} [pdbUrl="http://www.ebi.ac.uk/pdbe/entry-files"]
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
 * var instance = new Biojs.Protein3DWS({
 * 		target: 'YourOwnDivId',
 * 		id: '3nuc'
 * });	
 * 
 * 
 */
Biojs.Protein3DWS = Biojs.Protein3D.extend(
/** @lends Biojs.Protein3DWS# */
{
	constructor: function(options){
		this.base(options);
		//constructor of Biojs.Protein3DWS
		if (this.opt.id !== undefined) {
			this.requestPdb(this.opt.id);
		}
	},
	
	opt: {
	   id: undefined,
	   pdbUrl: 'http://www.ebi.ac.uk/pdbe/entry-files',
	   proxyUrl: '../biojs/dependencies/proxy/proxy.php'
	},
	
	eventTypes : [
  		/**
  		 * @name Biojs.Protein3DWS#onRequestError
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
	
	/**
    * Request and display a pdb file by means of its identifier.
    * 
    * @param {string} pdbId Pdb file identifier.
    *
    * @example 
    * instance.requestPdb('3t6f');
    * 
    */
	requestPdb: function(pdbId) {
		var self = this;
		
		self.showLoadingImage();
		self.opt.id = pdbId;
		
		jQuery.ajax({
			url: self.opt.proxyUrl,
			data: 'url='+self.opt.pdbUrl+'/pdb'+pdbId+'.ent',
			dataType: 'text',
			success: function (pdbContent) {
				Biojs.console.log("DATA ARRIVED");
				self.setPdb(pdbContent);
			},
			error: function(qXHR, textStatus, errorThrown){
				self.raiseEvent('onRequestError', {message: textStatus});
			}
		});
	},
	
	getPdbId: function(pdb) {
		return opt.id;
	}


});