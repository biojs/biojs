/** 
 * Protein 3D component
 * 
 * @class
 * @extends Biojs
 * @requires jQuery
 * 
 * @author <a href="mailto:johncar@gmail.com">John Gomez</a>, based on the code made 
 * by <a href="mailto:christine.jandrasits@gmail.com">Christine Jandrasits</a>
 * 
 * @param {Object} options An object with the options for Protein3D components.
 * @option {string} target Identifier of the DIV tag where the component should be displayed.
 * @option {int} width (optional) The width of the component (Jmol applet + control elements).
 * @option {int} height (optional) The height of the component.
 * @option {string} jmolFolder The folder where Jmol.js and all other Jmol files can be found.
 * @option {string} warningImageUrl If there is an error while loading a pdb file a warning will be displayed;
 *        set this property and the given image will be shown at the beginning of the text.
 * @option {string} loadingImageUrl (optional) If this property is set, the given image will be shown while loading data.
 * 
 */
Biojs.Protein3D = Biojs.extend(
/** @lends Biojs.Protein3D# */
{ 

	/** 
    * Default options (and its values) for the Protein3D component. 
    * @name Biojs.Protein3D-opt
    * @type Object
    */
   opt: 
   {
      target: 'component',
      width: 200,
      height: 1000,
      proxyUrl: '',
      jmolFolder: '',
      warningImageUrl: '',
      loadingImageUrl: ''
   },
   
   eventTypes: [
	   /**
	    * @name Biojs.Protein3D#onPdbSelection
	    * @event
	    * @param {function} actionPerformed An function which receives an {@link Biojs.Event} object as argument.
	    * @eventData {Object} source The component which did triggered the event.
	    * @eventData {string} type The name of the event.
	    * @eventData {int} start A number indicating the start of the selection.
	    * @eventData {int} end A number indicating the ending of selection.
	    * @example 
	    * myProtein3d.onPdbSelection(
	    *    function( objEvent ) {
	    *       alert("Selected: " + objEvent.start + ", " + objEvent.end );
	    *    }
	    * );  
	    * 
	    * */
	   "onPdbSelection"
   ], 
   
   
   init: function () {
      /* your initialization code here */
   },

   /**
    * Returns the information about the currently selected PDB file.
    * 
    * @example 
    * //Show the selected region in an alert window.
    * var selection = myInstance.getSelectedRegion(); 
    * alert("selected: "+ selection.start +", "+ selection.end);
    *
    * @returns {Object} An plain object containing the fields {proteinId, start, end}
    */
   getSelectedRegion: function (){
	   
   },
	   
   /**
    * Resets all selected regions or positions and removes the displayed PDB file from the applet.
    *
    * @example myInstance.reset(); 
    */
   reset: function (){
	   
   },
	   
   /**
    * Feeds the drop-down box of PDB files related with the given "interactor.id".
    * If the "interactor.name" is provided, then it is used in warning messages and as additionally displayed information.
    *
    * @example
    * // Protein selection using both id and name. 
    * myInstance.selectProtein({id:"", name: ""});
    * 
    * @example 
    * Protein selection using id only.
    * myInstance.selectProtein({id:""}); 
    * 
    * @param {Object} interactor An object in the form {id: String, name: String}. Where, "id" is mandatory and "name" is optional.
    */
   selectProtein: function (interactor){
	   
   },
	   
   /**
    * Filters the currently provided PDB files: Only PDB files containing a part of the requested region
    * are selectable. The specified region is highlighted in the displayed PDB file.
    *
    * @example 
    * // Selection of the region in the interval [100,150].
    * myInstance.selectRegion({start:100, end: 150});
    * 
    * @param {Object} region A plain object containing the fields {start, end}. 
    *        Both are numbers. Where "start" is greater than or equal to "end".
    */ 
   selectRegion: function (region){
	   
   },
	   
   /**
    * Filters the currently provided PDB files: Only PDB files containing a part of the requested region
    * are selectable. The specified positions are highlighted in the displayed PDB file.
    *
    * @example 
    * //Highlighting of the positions 4, 8 and 100 in the displayed instance myInstance.
    * myInstance.selectPositions( [4, 8 , 100] ); 
    * 
    * @param {int[]} positions An array of positions to be highlighted.
    * 
    */
   selectPositions: function ( positions ) {
	   
   },
	   
   /**
    * Unhighlights the currently highlighted region and resets all selected regions or positions.
    *
    * @example 
    * // Clear all the currently selected regions.
    * myInstance.unselectRegion();
    * 
    */
   unselectRegion: function () {
	   
   } 
	   

});