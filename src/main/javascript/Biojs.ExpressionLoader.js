/**
 * This component allows to load a tab-delimited file on the client. it uses HTML5 to load the file into the browser, 
 * it does not require a server side. 
 * 
 * @class
 * @extends Biojs
 * 
 * @author <a href="mailto:gustavoadolfo.salazar@gmail.com">Gustavo A. Salazar</a>
 * @version 1.0.0
 * @category 1
 * 
 * @requires <a href='http://code.jquery.com/query-1.7.2.min.js'>jQuery Core 1.7.2</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery/jquery-1.7.2.min.js"></script>
 * 
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI 1.8.2</a>
 * @dependency <script src="../biojs/dependencies/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
 *
 * @requires <a href='http://jqueryui.com/download/jquery-ui-1.8.20.custom.zip'>jQuery UI CSS 1.8.2</a>
 * @dependency <link rel="stylesheet" href="../biojs/dependencies/jquery/jquery-ui-1.8.2.css" />
 * 
 * @requires <a href='http://www.ebi.ac.uk/~jgomez/biojs/biojs/css/biojs.expressionLoader.css'>Expression Loader CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/biojs.expressionLoader.css" />
 * 
 * @requires <a href='https://github.com/claviska/jquery-miniColors'>Color Selector CSS</a>
 * @dependency <link rel="stylesheet" href="../biojs/css/jquery.miniColors.css" />
 * 
 * @requires <a href='https://github.com/claviska/jquery-miniColors'>Color Selector</a>
 * @dependency <script language="JavaScript" type="text/javascript" src="../biojs/dependencies/jquery.miniColors.min.js"></script>
 * 
 * @param {Object} options An object with the options for the Expression Loader component.
 * 
 * @option {string} target
 *    Identifier of the DIV tag where the component should be displayed.
 * 
 * @option {String} label
 *    Text for the link that opens the file chooser dialog.
 * 
 * @example
 * 					var instance = new Biojs.ExpressionLoader({
 *					     target: "YourOwnDivId"
 *					});			
 * 
 */
Biojs.ExpressionLoader = Biojs.extend (
	/** @lends Biojs.ExpressionLoader# */
	{
		expressions:null,
		min:99999,
		max:-99999,
		column:-1,
		colorData:null,

		constructor: function (options) {
			var self 	= this;
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				$("#"+self.opt.target).html('<input type="file" name="files[]" class="button-link" /><div class="fake-file">'+self.opt.label+'</div><br/><output></output>');
				$("#"+self.opt.target+' .fake-file').click(function(){
					$("#"+self.opt.target+" .button-link").click();
				});
				$("#"+self.opt.target+" .button-link").change(function(evt){
					self._handleFileSelect(evt);
				});
			} else {
				self.raiseEvent('onError', {
					error: 'Expression data can\'t be loaded in your browser.'
				});
			}
		},
		/**
		 *  Default values for the options
		 *  @name Biojs.ExpressionLoader-opt
		 */
		opt: {
			target: "YourOwnDivId",
			label: "Color by Expression File..."
		},

		/**
		 * Array containing the supported event names
		 * @name Biojs.ExpressionLoader-eventTypes
		 */
		eventTypes : [
		  			/**
					 * @name Biojs.ExpressionLoader#onFileLoaded
					 * @event
					 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
					 * @eventData {Object} source The component which did triggered the event.
					 * @eventData {Object} expressions a hash array containing the values loaded with the protein id(first column in the file) as the key and an array of numbers(expression data) as the value.
					 * @example 
					 * instance.onFileLoaded(function( objEvent ) {
					    alert("File loaded");
						var expression =objEvent.expressions,
							color=objEvent.colorData;
						var i=0;
						$('output').append("<br/><br/>");
						for (var p in expression){
							if (i++==40) break;
							var value=1*expression[p][objEvent.column*1];
							$('output').append("<br/>"+p+" (<span style='color:"+instance.getRGBString(value)+"'>"+value+"</span>)");
						}						
					}); 
					 * 
					 * */
					"onFileLoaded",
		  			/**
					 * @name Biojs.ExpressionLoader#onFileRemoved
					 * @event
					 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
					 * @eventData {Object} source The component which did triggered the event.
					 * @example 
					instance.onFileRemoved(function( objEvent ) {
					    alert("File removed");
						$('output').html("");
					}); 
					 * 
					 * */
					"onFileRemoved",
		  			/**
					 * @name Biojs.ExpressionLoader#onError
					 * @event
					 * @param {function} actionPerformed A function which receives an {@link Biojs.Event} object as argument.
					 * @eventData {Object} source The component which did triggered the event.
					 * @eventData {String} error a string describing the type of error.
					 * @example 
					 * instance.onError(
					 *    function( objEvent ) {
					 *    	alert("ERROR: "+ objEvent.error);
					 *    }
					 * ); 
					 * 
					 * */
					"onError",
					
				], 
		_handleFileSelect: function(evt){
			var self = this;
			var files = evt.target.files; // FileList object
			
			// files is a FileList of File objects. List some properties.
			var column = 1;
			for (var i = 0, f; f = files[i]; i++) {
				if (!f.type.match('text.*')) {
					$('#'+self.opt.target+' output').html("The selected file is not text, its type is "+f.type);
					self.raiseEvent('onError', {
						error: "The selected file is not text, its type is "+f.type
					});
					continue;
				}
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					return function(e) {
						var exp = self.parseTabDelimitedString(e.target.result);
						if (exp!=null){
							self.startWizzard();
						}
					};
				})(f);
				reader.readAsText(f);
			}

		},
		 /**
		  * Parse a String with tab delimited format into a hash, where the first column is treated as the key, 
		  * and the value are all the other columns grouped as an array 
		  * 
		  * @param {string} text the tab delimited string
		  * 
		  * @example 
		  * instance.parseTabDelimitedString('p1\t0.5\t0.3\t0.2\np2\t0.4\t0.2\t0.9');
		  */
		parseTabDelimitedString: function(text){
			var self = this;
			self.expressions ={};
			self.min =99999;
			self.max = -99999;
			self.column=-1;
			self.colorData=null;
			
			var lines = text.split("\n");
			var columns =-1;
			for (var i=0; i< lines.length; i++){
				if (lines[i].indexOf("#")==0)
					continue;
				var line = lines[i].split("\t");
				if (columns==-1){
					columns = line.length;
					if (columns<2){
						self.raiseEvent('onError', {
							error: "The file at requires at least 2 columns (Id and Expression)"
						});
						$('#'+self.opt.target+' output').html("The file at requires at least 2 columns (Id and Expression)");
						self.expressions =null;
						break;
					}
				}else if (columns!=line.length){
					self.raiseEvent('onError', {
						error: "The number of columns is different between lines "+i+" and "+(i+1)
					});
					$('#'+self.opt.target+' output').html("The number of columns is different between lines "+i+" and "+(i+1));
					self.expressions =null;
					columns=-1;
					break;
				}
				var exps =line.splice(1);
				self.expressions[line[0]] = exps;
				for (var j=0;j<exps.length;j++){
					if (self.min>(exps[j]*1)) self.min = exps[j]*1;
					if (self.max<(exps[j]*1)) self.max = exps[j]*1;
				}
			}
			return self.expressions;
		},
		 /**
		  * Build a HTML string that displays a given number of rows as a table, including a last row of radio buttons 
		  * to select a column
		  * 
		  * @param {int} rows the number of rows to be included in the table.
		  * 
		  * @example 
		  * instance.getFormatedTable(3);
		  */
		getFormatedTable: function(rows){
			var self=this;
			var i=0;
			var loadedText="<table>"
			var columns =0;
			for (var p in self.expressions){
				if (rows==i++) break;
				loadedText += "<tr><th>"+p+"</th><td>"+self.expressions[p].join("</td><td>")+"</td></tr>";
				columns = self.expressions[p].length;
			}
			loadedText += "<tr><th>Column to Use:</th>";
			var col = (self.column!=-1)?self.column:0;
			for (var i=0; i< columns; i++){
				var selected=(i==col)?"checked":"";
				loadedText += '<td><input type="radio" name="column" value="'+i+'" '+selected+' /></td>';
				selected="";
			}
			loadedText += "</tr></table>";
			return loadedText;
		},
		 /**
		  * Open the first parameter dialog to choose which column of the file should be loaded. It requires that a file(or a string) have 
		  * been parsed previously because it uses the value in the attribute expressions.
		  * 
		  * @example 
		  * instance.startWizzard();
		  */
		startWizzard: function(){
			var self =this;
			$('#'+self.opt.target+' output').html('<div class="dialog-modal" title="Select Column"><p>'+self.getFormatedTable(5)+'</p></div>');
			$('#'+self.opt.target+" .dialog-modal" ).dialog({
				height: 400,
				width: 600,
				modal: true, 
				buttons: {
					Next: function() {
						self.column = 1*$('.dialog-modal input[name="column"]:checked').val();
						$( this ).dialog( "destroy" );
						self.wizzardStep2();
					}
				}
			});
		},
		 /**
		  * Open the second parameter dialog to choose the range of expression values and their correspondent colors. It requires that a file(or a string) have 
		  * been parsed previously because it uses the value in the attribute expressions.
		  * 
		  * @example 
		  * instance.startWizzard();
		  */
		wizzardStep2: function(){
			var self =this;
			var min = (self.colorData!=null)?self.colorData.min:self.min,
				max = (self.colorData!=null)?self.colorData.max:self.max,
				center = (self.colorData!=null)?self.colorData.center:0,
				colorMin = (self.colorData!=null)?self.colorData.colorMin:"#FF0000",
				colorMax = (self.colorData!=null)?self.colorData.colorMax:"#00FF00",
				colorCenter = (self.colorData!=null)?self.colorData.colorCenter:"#000000";
			var loadedText = "<table><tr><th>Min:</th><td><input type='text' id='min' value='"+min+"'/></td><td>";
			loadedText +='<input type="hidden" id="colorMin" name="colorMin" class="color-picker" size="6" />';
			loadedText +="</td></tr><tr><th>Center:</th><td><input type='text' id='center' value='"+center+"'/></td><td>";
			loadedText +='<input type="hidden" id="colorCenter" name="colorCenter" class="color-picker" size="6" />';
			loadedText +="</td></tr><tr><th>Max:</th><td><input type='text' id='max' value='"+max+"'/></td><td>";
			loadedText +='<input type="hidden" id="colorMax" name="colorMax" class="color-picker" size="6" />';
			loadedText +="</td></tr></table>";

			$('#'+self.opt.target+' output').html('<div class="dialog-modal" title="Select Range and Colors"><p>'+loadedText+'</p></div>');

			$("#colorMax").miniColors({
				letterCase: 'uppercase'
			}).miniColors('value',colorMax);
			$("#colorCenter").miniColors({
				letterCase: 'uppercase'
			}).miniColors('value',colorCenter);
			$("#colorMin").miniColors({
				letterCase: 'uppercase'
			}).miniColors('value',colorMin);
			
			$('#'+self.opt.target+" .dialog-modal" ).dialog({
				height: 400,
				width: 600,
				modal: true,
				buttons: {
					Apply: function() {
						self.colorData = {
								min:		$("#min").val(), 
								center: 	$("#center").val(), 
								max: 		$("#max").val(), 
								colorMin:	$("#colorMin").val(), 
								colorCenter:$("#colorCenter").val(), 
								colorMax:	$("#colorMax").val()
						};
						self.calculateExtrapolingData(self.colorData);
						$("#colorCenter").miniColors('destroy');
						$("#colorMin").miniColors('destroy');
						$("#colorMax").miniColors('destroy');
						$( this ).dialog( "destroy" );
						$(" .dialog-modal" ).remove();
						$("#"+self.opt.target+" .fake-file").html("Change File...");
						$("#"+self.opt.target+" .exp-edit").remove();
						$("#"+self.opt.target+" .exp-remove").remove();
						$("#"+self.opt.target+" .fake-file").after("<div class='exp-remove'></div>");
						$("#"+self.opt.target+" .exp-remove").click(function() {
							self.expressions =null;
							self.min =99999;
							self.max = -99999;
							self.column=-1;
							self.colorData=null;

							$("#"+self.opt.target+" .exp-edit").remove();
							$("#"+self.opt.target+" .exp-remove").remove();
							$("#"+self.opt.target+" .fake-file").html(self.opt.label);
							$("#"+self.opt.target+" .button-link").val('');
							self.raiseEvent('onFileRemoved', {});
						});
						$("#"+self.opt.target+" .fake-file").after("<div class='exp-edit'></div>");
						$("#"+self.opt.target+" .exp-edit").click(function() {
							self.startWizzard();
						});

						self.raiseEvent('onFileLoaded', {
							expressions: self.expressions,
							column: self.column,
							colorData: self.colorData
						});
					}
				}
			});
		},
		_hexToR: function (h) {
			var self=this;
			return parseInt((self._cutHex(h)).substring(0,2),16)
		},
		_hexToG: function (h) {
			var self=this;
			return parseInt((self._cutHex(h)).substring(2,4),16)
		},
		_hexToB: function (h) {
			var self=this;
			return parseInt((self._cutHex(h)).substring(4,6),16)
		},
		_cutHex: function (h) {return (h.charAt(0)=="#") ? h.substring(1,7):h},			
		_getM: function (x1,y1,x2,y2) {
			return (y1-y2)/(x1-x2);
		},
		_getB: function (m,x,y){
			return y - m*x;
		},
		_getY: function (m,b,x){
			return parseInt(m*x + b);
		},

		calculateExtrapolingData: function(colorData){
			var self=this;
			var minRed = self._hexToR(colorData.colorMin),
				centerRed = self._hexToR(colorData.colorCenter),
				maxRed = self._hexToR(colorData.colorMax),
				minGreen = self._hexToG(colorData.colorMin),
				centerGreen = self._hexToG(colorData.colorCenter),
				maxGreen = self._hexToG(colorData.colorMax),
				minBlue = self._hexToB(colorData.colorMin),
				centerBlue = self._hexToB(colorData.colorCenter),
				maxBlue = self._hexToB(colorData.colorMax);
			
			var mRedN = self._getM(colorData.min,minRed,colorData.center,centerRed),
				mGreenN = self._getM(colorData.min,minGreen,colorData.center,centerGreen),
				mBlueN = self._getM(colorData.min,minBlue,colorData.center,centerBlue);
			var mRedP = self._getM(colorData.center,centerRed,colorData.max,maxRed),
				mGreenP = self._getM(colorData.center,centerGreen,colorData.max,maxGreen),
				mBlueP = self._getM(colorData.center,centerBlue,colorData.max,maxBlue);
			var bRedN = self._getB(mRedN,colorData.min,minRed),
				bGreenN = self._getB(mGreenN,colorData.min,minGreen),
				bBlueN = self._getB(mBlueN,colorData.min,minBlue);
			var bRedP = self._getB(mRedP,colorData.max,maxRed),
				bGreenP = self._getB(mGreenP,colorData.max,maxGreen),
				bBlueP = self._getB(mBlueP,colorData.max,maxBlue);
			
			colorData.mRedN=mRedN;
			colorData.mGreenN=mGreenN;
			colorData.mBlueN=mBlueN;
			colorData.mRedP=mRedP;
			colorData.mGreenP=mGreenP;
			colorData.mBlueP=mBlueP;
			colorData.bRedN=bRedN;
			colorData.bGreenN=bGreenN;
			colorData.bBlueN=bBlueN;
			colorData.bRedP=bRedP;
			colorData.bGreenP=bGreenP;
			colorData.bBlueP=bBlueP;
			return colorData;
		},
		 /**
		  * Extrapolates a value using the minimum and maximum values and colors given as parameters. 
		  * It returns a string in the format: "rgb([valRed],[valGreen],[valBlue])"
		  * 
		  * @example 
		  * instance.getRGBString(0.6);
		  * instance.getRGBString(0.8);
		  * instance.getRGBString(0.1);
		  */
		getRGBString:function(value){
			var self=this;
			if (value>self.colorData.center)
				return "rgb("+self._getY(self.colorData.mRedP,self.colorData.bRedP,value)+","+self._getY(self.colorData.mGreenP,self.colorData.bGreenP,value)+","+self._getY(self.colorData.mBlueP,self.colorData.bBlueP,value)+")";
			else
				return "rgb("+self._getY(self.colorData.mRedN,self.colorData.bRedN,value)+","+self._getY(self.colorData.mGreenN,self.colorData.bGreenN,value)+","+self._getY(self.colorData.mBlueN,self.colorData.bBlueN,value)+")";
		}
	});
