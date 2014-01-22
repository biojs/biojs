/** 
 * This is the description of the RaphaelCanvas component. This component provides pan/zoom functionality over Raphael's paper object,
 * and saves repitition of development effort involved in pan/zoom in other components.
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:swanand@gmail.com">Swanand Gore</a>
 * @version 1.0.0
 * @category 0
 *
 * @requires <a href='http://raphaeljs.com'>Raphael 2.1.0</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/graphics/raphael-2.1.0.js"></script>
 * 
 * @requires <a href='http://code.jquery.com/jquery-1.7.2.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @param {Object} options An object with the options for RaphaelCanvas component.
 *    
 * @option {String} divid
 *    the div in which the canvas should be created.
 *
 * @option {Number} dimension
 *    the side of the square canvas
 *    
 * @example 
 * var instance = new Biojs.RaphaelCanvas({
 *          divid:"YourOwnDivId",   dimension:500
 * });	
 * instance.testSetup();
 * 
 */
Biojs.RaphaelCanvas = Biojs.extend (
/** @lends Biojs.RaphaelCanvas# */
{
  /**
   *  Default values for the options
   *  @name Biojs.RaphaelCanvas-opt
   */
	opt: { divid:"YourOwnDivId",   dimension:500 },
  
	constructor: function (options) {
		var self = this;
		self.dim = options.dimension;
		self.divid = options.divid;
		self.jq = jQuery('#'+self.divid);
		self.mousedownEvent = null;
		self.init();
	},
	init: function() {
		var self = this;
		self.rapha = Raphael(self.divid, self.dim, self.dim);
		self.fullbox = self.rapha.rect(0,0,self.dim,self.dim).attr({fill:'green',stroke:'black', opacity:0.01});
		self.jq.mousedown( function(e) { self.recordMousedown(e); } );
		self.makeZoomPannable();
		self.setVbox(0,0,self.dim);
	},
	testSetup: function() {
		var self = this;
		for(var x=0; x < self.dim; x+=self.dim/10) {
			for(var y=0; y < self.dim; y+=self.dim/10) {
				self.rapha.text(x, y, x+","+y).attr({'text-anchor':'start'});
				self.rapha.circle(x, y, self.dim/50);
			}
		}
	},
	makeZoomPannable: function() {
		var self = this;
		self.jq.mouseup( function(e) { self.zoompan(e); self.zoompanstarted = null; } );
		self.jq.mousemove( function(e) { self.zoompan(e) ;} );
	},
	setVbox: function(x,y,dim) {
		var self = this;
		self.rapha.setViewBox(x,y,dim,dim,true);
		self.curVbox = [x,y,dim];
	},
	zoompan: function(e) {
		var self = this;
		e.preventDefault();
		if(!self.zoompanMouseactivity(e)) return;
		if(self.zoompanstarted != 1) return;
		console.log("zoompan event", e.button, e.buttons, e.which);
		var pxy = self.event2paperxy(e);
		var pxy1 = self.event2paperxy(self.mousedownEvent);
		var dx = e.clientX - self.mousedownEvent.clientX;
		var pdx = pxy[0] - pxy1[0];
		var dy = e.clientY - self.mousedownEvent.clientY;
		var pdy = pxy[1] - pxy1[1];
		console.log("zoompan", pdx.toFixed(1), dx.toFixed(1), self.zoom);
		if(Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
		if(e.shiftKey) { // zoom i.e. enlarge viewbox when zoomed in, and make it small when when zoomed out
			dd = self.curVbox[2] - pdx;
			decr = (dd-self.curVbox[2])/2;
			console.log("viewbox", pxy1, dd);
			self.setVbox(self.curVbox[0]-decr, self.curVbox[1]-decr, dd);
		}
		else if(e.ctrlKey) { // pan i.e. change viewbox in such a way that pxy1 goes onto pxy
			console.log("viewbox", pxy1, self.curVbox[2]);
			dx = pxy1[0]-pxy[0];
			dy = pxy1[1]-pxy[1];
			self.setVbox(self.curVbox[0]+dx, self.curVbox[1]+dy, self.curVbox[2]);
		}
		self.mousedownEvent = e;
	},
	zoompanMouseactivity: function(e) {
		var self = this;
		if(!e.shiftKey && !e.ctrlKey) return false;
		if(e.which != 1) return false;
		return true;
	},
	recordMousedown: function(e) {
		var self = this;
		if(!self.zoompanMouseactivity(e)) return;
		//console.log("mousedown", e);
		e.preventDefault();
		self.mousedownEvent = e;
		self.zoompanstarted = 1;
	},
	event2paperxy: function(e) {
		var self = this;
		// gratefully copied from a http://stackoverflow.com/questions/15257059/how-do-i-get-an-event-in-raphaels-paper-coordinates
		var rect = self.fullbox;
		var bnds = self.jq[0].getBoundingClientRect();
		// adjust mouse x/y
		var mx = e.clientX - bnds.left;
		var my = e.clientY - bnds.top;
		// divide x/y by the bounding w/h to get location %s and apply factor by actual paper w/h
		var fx = mx/bnds.width * rect.attrs.width;
		var fy = my/bnds.height * rect.attrs.height;
		console.log("event2paper", mx.toFixed(1), my.toFixed(1), fx.toFixed(1), fy.toFixed(1));
		return [fx,fy];
		// TODO make this work even when clicked outside raphael in the divid
	},

  /**
   * Array containing the supported event names
   * @name Biojs.RaphaelCanvas-eventTypes
   */
  eventTypes : [
	/**
	 * @name Biojs.RaphaelCanvas#onClick
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} selected Selected character.
	 * @example 
	 * instance.onClick(
	 *    function( objEvent ) {
	 *       alert("The character " + objEvent.selected + " was clicked.");
	 *    }
	 * ); 
	 * 
	 * */
	 "onClick",
	 
	/**
	 * @name Biojs.RaphaelCanvas#onHelloSelected
	 * @event
	 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
	 * @eventData {Object} source The component which did triggered the event.
	 * @eventData {string} type The name of the event.
	 * @eventData {int} textSelected Selected text, will be 'Hello' obviously.
	 * @example 
	 * instance.onHelloSelected(
	 *    function( objEvent ) {
	 *       alert("The word " + objEvent.textSelected + " was selected.");
	 *    }
	 * ); 
	 * 
	 * */
     "onHelloSelected"      
  ] 
});

