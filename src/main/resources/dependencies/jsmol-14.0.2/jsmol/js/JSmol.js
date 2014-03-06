// BH 12/6/2013 10:12:30 AM adding corejmoljsv.z.js
// BH 9/17/2013 10:18:40 AM  file transfer functions moved to JSmolCore 
// BH 3/5/2013 9:54:16 PM added support for a cover image: Info.coverImage, coverScript, coverTitle, deferApplet, deferUncover
 
// BH 1/3/2013 4:54:01 AM mouse binding should return false -- see d.bind(...), and d.bind("contextmenu") is not necessary

// JSmol.js -- Jmol pure JavaScript version
// author: Bob Hanson, hansonr@stolaf.edu	4/16/2012
// author: Takanori Nakane biochem_fan 6/12/2012

// This library requires jQuery and 
//
//	JSmoljQueryExt.js
//	JSmolCore.js
//  JSmolApplet.js
//  JSmolApi.js
//  j2sjmol.js    (Clazz and associated classes)
// prior to JSmol.js

// these two:
//
//  JSmolThree.js
//  JSmolGLmol.js
//  
//  are optional 

;(function (Jmol) {

  Jmol._coreFiles = []; // required for package.js

  Jmol.__execLog = [];
  Jmol.__execStack = [];
  Jmol.__execTimer = 0;
  Jmol.__coreSet = [];
  
  Jmol.showExecLog = function() { return Jmol.__execLog.join("\n") }; 

  Jmol.__addExec = function(e) {
    Jmol.__execLog.push("load " + e[0]._id + " " + e[3]);   
    Jmol.__execStack.push(e);
  }

  Jmol.__addCoreFile = function(type, path) {
    if (Jmol.__coreSet.join("").indexOf(type) >= 0) return;
    Jmol.__coreSet.push(type);
    Jmol.__coreSet.sort();
    var f = Jmol.__coreSet.join("");
    Jmol._coreFiles = [path + "/core/core" + (f == "jmol" ? "" : f) + ".z.js" ];
  }      		

	Jmol.__nextExecution = function(trigger) {
    delete Jmol.__execTimer;
		var es = Jmol.__execStack;
	  if (es.length == 0)
	  	return;
	  if (!trigger) {
		  setTimeout("Jmol.__nextExecution(true)",10)
	  	return;
	  }
	  var e = es.shift();
	  Jmol.__execLog.push("exec " + e[0]._id + " " + e[3]);
		e[1](e[0],e[2]);	
	};

	Jmol.__loadClazz = function(applet) {
		// problems with multiple applets?
	  if (!Jmol.__clazzLoaded) {
  		Jmol.__clazzLoaded = true;
			LoadClazz();
			if (applet._noMonitor)
				ClassLoaderProgressMonitor.showStatus = function() {}
			LoadClazz = null;

			ClazzLoader.globalLoaded = function (file) {
       // not really.... just nothing more yet to do yet
      	ClassLoaderProgressMonitor.showStatus ("Application loaded.", true);
  			if (!Jmol._debugCode || !Jmol.haveCore) {
  				Jmol.haveCore = true;
    			Jmol.__nextExecution();
    		}
      };
			ClazzLoader.packageClasspath ("java", null, true);
      return;
		}
		Jmol.__nextExecution();
	};

	Jmol.__loadClass = function(applet, javaClass) {
	  ClazzLoader.loadClass(javaClass, function() {Jmol.__nextExecution()});
	};

	Jmol._Canvas2D = function(id, Info, type, checkOnly){
    // type: Jmol or JSV
		this._syncId = ("" + Math.random()).substring(3);
		this._id = id;
		this._is2D = true;
    this._isJava = false;
		this._jmolType = "Jmol._Canvas2D (" + type + ")";
    switch (type) {
    case "Jmol":
  		this._platform = "J.awtjs2d.Platform";
      break;
    case "JSV":
      this._isJSV = true;
      this._isLayered = true;
  		this._platform = "JSV.awtjs2d.Platform";
      break;
    }
		if (checkOnly)
			return this;
    window[id] = this;
		this._createCanvas(id, Info);
    if (!Jmol._document || this._deferApplet)
      return this;
    this._init();
		return this;
	};

	Jmol._jsSetPrototype = function(proto) {
    proto._init = function() {
   		this._setupJS();
		  this._showInfo(true); 
		  if (this._disableInitialConsole)
			  this._showInfo(false);
    };
    
    proto._createCanvas = function(id, Info, glmol) {
			Jmol._setObject(this, id, Info);
      if (glmol) {
  			this._GLmol = glmol;
	   		this._GLmol.applet = this;
        this._GLmol.id = this._id;
      }      
      var t = Jmol._getWrapper(this, true);
      if (this._deferApplet) {
      } else if (Jmol._document) {
				Jmol._documentWrite(t);
        this._getCanvas(false);				        
				t = "";
			} else {
        this._deferApplet = true;
				t += '<script type="text/javascript">' + id + '._cover(false)</script>';
			}
			t += Jmol._getWrapper(this, false);
      if (Info.addSelectionOptions)
				t += Jmol._getGrabberOptions(this);
			if (Jmol._debugAlert && !Jmol._document)
				alert(t);
			this._code = Jmol._documentWrite(t);
		};
		                      
    proto._cover = function (doCover) {
      if (doCover || !this._deferApplet) {
        this._displayCoverImage(doCover);
        return;
      }
      // uncovering UNMADE applet upon clicking image
      var s = (this._coverScript ? this._coverScript : "");
      this._coverScript = "";
      if (this._deferUncover)
        s += ";refresh;javascript " + this._id + "._displayCoverImage(false)";
      this._script(s, true);
      if (this._deferUncover && this._coverTitle == "activate 3D model")
        Jmol._getElement(this, "coverimage").title = "3D model is loading...";
      this._start();
      if (!this._deferUncover)
        this._displayCoverImage(doCover);
      if (this._init)
        this._init();
    };
  
    proto._displayCoverImage = function(TF) {
      if (!this._coverImage || this._isCovered == TF) return;
      this._isCovered = TF;
      Jmol._getElement(this, "coverdiv").style.display = (TF ? "block" : "none");
    };

    proto._start = function() {
      if (this._deferApplet)
        this._getCanvas(false);      
      if (this._defaultModel)
        Jmol._search(this, this._defaultModel);
      this._showInfo(false);
    };                      

    proto._getCanvas = function(doReplace) {
      if (this._is2D)
        this._createCanvas2d(doReplace);
      else
        this._GLmol.create();
    };
                      
		proto._createCanvas2d = function(doReplace) {
		  var canvas = document.createElement( 'canvas' );
      var container = Jmol.$(this, "appletdiv");
      if (doReplace) {
        try {
        container[0].removeChild(this._canvas);
        if (this._canvas.topLayer)
          container[0].removeChild(this._canvas.topLayer);
        if (this._canvas.imageLayer)
          container[0].removeChild(this._canvas.imageLayer);
        Jmol._jsUnsetMouse(this._mouseInterface);
        } catch (e) {}
      }
      var w = Math.round(container.width());
	  	var h = Math.round(container.height());
  		canvas.applet = this;
      this._canvas = canvas;
  		canvas.style.width = "100%";
  		canvas.style.height = "100%";
  		canvas.width = w;
  		canvas.height = h; // w and h used in setScreenDimension
  		canvas.id = this._id + "_canvas2d";
  		container.append(canvas);
      if (this._isLayered){
        var img = document.createElement("div");
        canvas.imageLayer = img;
    		img.id = this._id + "_imagelayer";
    		container.append(img);
        $("#" + img.id).css({zIndex:Jmol._z.image,position:"absolute",left:"0px",top:"0px", width:"0px", height:"0px", overflow:"hidden"});
  		  var canvas2 = document.createElement("canvas");
    		canvas.topLayer = canvas2;
    		canvas2.style.width = "100%";
    		canvas2.style.height = "100%";
    		canvas2.id = this._id + "_toplayer";
  		  canvas2.width = w;
  		  canvas2.height = h; // w and h used in setScreenDimension
    		container.append(canvas2);
        canvas2.applet=this;
        $("#" + canvas2.id).css({background:"(0,0,0,0.001)", zIndex: Jmol._z.top,position:"absolute",left:"0px",top:"0px",overflow:"hidden"});
        this._mouseInterface = canvas2;
        img
      } else {
        this._mouseInterface = canvas;
      }
      Jmol._jsSetMouse(this._mouseInterface);
		}

		proto._setupJS = function() {
			window["j2s.lib"] = {
				base : this._j2sPath + "/",
				alias : ".",
				console : this._console,
        monitorZIndex : Jmol._z.monitorZIndex
			};
			
      var isFirst = (Jmol.__execStack.length == 0);
			if (isFirst)
  			Jmol.__addExec([this, Jmol.__loadClazz, null, "loadClazz"]);
      if (this._isJSV) {
        Jmol.__addCoreFile("jsv", this._j2sPath);
        if (Jmol._debugCode) {
        // no min package for that
          Jmol.__addExec([this, Jmol.__loadClass, "JSV.appletjs.JSVApplet", "load JSV"]);
          if (this._isPro)
            Jmol.__addExec([this, Jmol.__loadClass, "JSV.appletjs.JSVAppletPro", "load JSV(signed)"]);
        }
      } else {
        Jmol.__addCoreFile("jmol", this._j2sPath);
  			if (!this._is2D) {
  	   		Jmol.__addExec([this, Jmol.__loadClass, "J.exportjs.JSExporter","load JSExporter"])
  				Jmol.__addExec([this, this.__addExportHook, null, "addExportHook"])
  			}			 			
        if (Jmol._debugCode)
          Jmol.__addExec([this, Jmol.__loadClass, "J.appletjs.Jmol", "load Jmol"]);
      }
			Jmol.__addExec([this, this.__startAppletJS, null, "start applet"])

			this._isSigned = true; // access all files via URL hook
			this._ready = false; 
			this._applet = null;
			this._canScript = function(script) {return true;};
			this._savedOrientations = [];
      Jmol.__execTimer && clearTimeout(Jmol.__execTimer);
      Jmol.__execTimer = setTimeout(Jmol.__nextExecution, 50);// leaving a 50-ms delay for next applet creation initiation
		};

		proto.__addExportHook = function(applet) {
		  GLmol.addExportHook(applet);
			Jmol.__nextExecution();
		};

		proto.__startAppletJS = function(applet) {
			var viewerOptions =  new java.util.Hashtable ();
      Jmol._setJmolParams(viewerOptions, applet.__Info, true);
			viewerOptions.put("appletReadyCallback","Jmol._readyCallback");
			viewerOptions.put("applet", true);
			viewerOptions.put("name", applet._id + "_object");
			viewerOptions.put("syncId", applet._syncId);      
      if (applet._color) 
        viewerOptions.put("bgcolor", applet._color);
      if (!applet._is2D)  
			  viewerOptions.put("script", "set multipleBondSpacing 0.35;");
      else if (applet._startupScript)
        viewerOptions.put("script", applet._startupScript)
			
			if (Jmol._syncedApplets.length) {
		    viewerOptions.put("synccallback", "Jmol._mySyncCallback");
      }
			viewerOptions.put("signedApplet", "true");
			viewerOptions.put("platform", applet._platform);
			if (applet._is2D)
				viewerOptions.put("display",applet._id + "_canvas2d");
  			
			// viewerOptions.put("repaintManager", "J.render");
			viewerOptions.put("documentBase", document.location.href);
      var codePath = applet._j2sPath + "/";
      if (codePath.indexOf("://") < 0) {
        var base = document.location.href.split("#")[0].split("?")[0].split("/");
        base[base.length - 1] = codePath;
        codePath = base.join("/");
      }
			viewerOptions.put ("codePath", codePath);
      
			Jmol._registerApplet(applet._id, applet);
      applet._applet = (!applet._isJSV ? new J.appletjs.Jmol(viewerOptions) 
        : applet._isPro ? new JSV.appletjs.JSVAppletPro(viewerOptions) 
        : new JSV.appletjs.JSVApplet(viewerOptions));
      
      if (!applet._is2D)
				applet._GLmol.applet = applet;
			applet._jsSetScreenDimensions();      
			Jmol.__nextExecution();
		};
		
		proto._jsSetScreenDimensions = function() {
				if (!this._applet)return
				// strangely, if CTRL+/CTRL- are used repeatedly, then the
        // applet div can be not the same size as the canvas if there
        // is a border in place.
				var d = Jmol._getElement(this, (this._is2D ? "canvas2d" : "canvas"));
				this._applet.viewer.setScreenDimension(
				d.width, d.height);
// Math.floor(Jmol.$(this, "appletdiv").height()));

		};

		proto._loadModel = function(mol, params) {
			var script = 'load DATA "model"\n' + mol + '\nEND "model" ' + params;
			this._script(script);
			this._showInfo(false);
		};
	
		proto._show = function(tf) {
			Jmol.$setVisible(Jmol.$(this,"appletdiv"), tf);
			if (tf)
				Jmol._repaint(this, true);
		};
		
		proto._canScript = function(script) {return true};
		
		proto._delay = function(eval, sc, millis) {
		// does not take into account that scripts may be added after this and
		// need to be cached.
			this._delayID = setTimeout(function(){eval.resumeEval(sc,false)}, millis);		
		}
		
		proto._loadFile = function(fileName, params){
			this._showInfo(false);
			params || (params = "");
			this._thisJmolModel = "" + Math.random();
			this._fileName = fileName;
      Jmol._scriptLoad(this, fileName, params, true);
		};
		
		proto._createDomNode = function(id, data) {
			id = this._id + "_" + id;
			var d = document.getElementById(id);
			if (d)
				document.body.removeChild(d);
			if (!data)
				return;
			if (data.indexOf("<?") == 0)
				data = data.substring(data.indexOf("<", 1));
			if (data.indexOf("/>") >= 0) {
				// no doubt there is a more efficient way to do this.
				// Firefox, at least, does not recognize "/>" in HTML blocks
				// that are added this way.
				var D = data.split("/>");
				for (var i = D.length - 1; --i >= 0;) {
					var s = D[i];
					var pt = s.lastIndexOf("<") + 1;
					var pt2 = pt;
					var len = s.length;
					var name = "";
					while (++pt2 < len) {
					  if (" \t\n\r".indexOf(s.charAt(pt2))>= 0) {
							var name = s.substring(pt, pt2);
							D[i] = s + "></"+name+">";
							break;
						}	  	
					}
				}
				data = D.join('');
			}
			d = document.createElement("_xml")
			d.id = id;
			d.innerHTML = data;
			d.style.display = "none";
			document.body.appendChild(d);
			return d;
		}		
	
		proto.equals = function(a) { return this == a };
		proto.clone = function() { return this };
		proto.hashCode = function() { return parseInt(this._syncId) };  
	
  
    proto._processGesture = function(touches) {
      return this._applet.viewer.mouse.processTwoPointGesture(touches);
    }
    
    proto._processEvent = function(type, xym) {
			this._applet.viewer.processMouseEvent(type,xym[0],xym[1],xym[2],System.currentTimeMillis());
    }
    
    proto._resize = function() {
      var s = "__resizeTimeout_" + this._id;
      // only at end
      if (Jmol[s])
        clearTimeout(Jmol[s]);
      var self = this;
      Jmol[s] = setTimeout(function() {Jmol._repaint(self, true);Jmol[s]=null}, 100);
    }
    
    
    return proto;
	};
	
	
	
  Jmol._repaint = function(applet, asNewThread) {
    // asNewThread: true is from RepaintManager.repaintNow()
    // false is from Repaintmanager.requestRepaintAndWait()
    //
		
    // alert("_repaint " + arguments.callee.caller.caller.exName)
		if (!applet || !applet._applet)return;

		// asNewThread = false;
		var container = Jmol.$(applet, "appletdiv");
		var w = Math.round(container.width());
		var h = Math.round(container.height());
    if (applet._is2D && (applet._canvas.width != w || applet._canvas.height != h)) {
      applet._getCanvas(true);
      applet._applet.viewer.setDisplay(applet._canvas);
    }
		applet._applet.viewer.setScreenDimension(w, h);

		if (asNewThread) {
      setTimeout(function(){ applet._applet && applet._applet.viewer.updateJS(0,0)});
  	} else {
  		applet._applet.viewer.updateJS(0,0);
  	}
  	// System.out.println(applet._applet.fullName)
	}

	Jmol._getHiddenCanvas = function(applet, id, width, height, forceNew) {
  	id = applet._id + "_" + id;
		var d = document.getElementById(id);
    if (d && forceNew) {
      d = null;
    }
		if (!d)
	    d = document.createElement( 'canvas' );
	    // for some reason both these need to be set, or maybe just d.width?
		d.width = d.style.width = width;
		d.height = d.style.height = height;
		// d.style.display = "none";
		if (d.id != id) {
			d.id = id;
	  }
	  return d;
	}

  Jmol._loadImage = function(platform, echoNameAndPath, bytes, fOnload, image) {
  // bytes would be from a ZIP file -- will have to reflect those back from
	// server as an image after conversion to base64
  // ah, but that's a problem, because that image would be needed to be
	// posted, but you can't post an image call.
  // so we would have to go with <image data:> which does not work in all
	// browsers. Hmm.
  
    var path = echoNameAndPath[1];
    
    if (image == null) {
      var image = new Image();
      image.onload = function() {Jmol._loadImage(platform, echoNameAndPath, null, fOnload, image)};

      if (bytes != null) {      
        bytes = J.io.Base64.getBase64(bytes).toString();      
        var filename = path.substring(url.lastIndexOf("/") + 1);                                                           
        var mimetype = (filename.indexOf(".png") >= 0 ? "image/png" : filename.indexOf(".jpg") >= 0 ? "image/jpg" : "");
    	   // now what?
      }
      image.src = path;
      return true; // as far as we can tell!
    }
    var width = image.width;
    var height = image.height; 
    var id = "echo_" + echoNameAndPath[0];
    var canvas = Jmol._getHiddenCanvas(platform.viewer.applet, id, width, height, true);
    canvas.imageWidth = width;
    canvas.imageHeight = height;
    canvas.id = id;
    canvas.image=image;
    Jmol._setCanvasImage(canvas, width, height);
    // return a null canvas and the error in path if there is a problem
    fOnload(canvas,path);
  };

  Jmol._setCanvasImage = function(canvas, width, height) {
    canvas.buf32 = null;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(canvas.image, 0, 0, width, height);
  };

		
})(Jmol);
