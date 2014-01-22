// JSmolCore.js -- Jmol core capability  12/6/2013 6:18:48 PM

// see JSmolApi.js for public user-interface. All these are private functions

// BH 12/6/2013 6:18:32 PM cover.htm and coverImage fix
// BH 12/4/2013 7:44:26 PM fix for JME independent search box
// BH 12/3/2013 6:30:08 AM fix for ready function returning Boolean instead of boolean in HTML5 version
// BH 11/30/2013 10:31:37 AM added type:"GET" for jQuery.ajax() requests instead of using defaults
// BH 11/30/2013 10:31:37 AM added cache:true for jQuery.ajax() requests; can override with cache:"NO", not cache:false
// BH 11/28/2013 11:09:27 AM added Jmol._alertNoBinary:true
// BH 11/26/2013 8:19:55 PM fix !xxxx search commmand entry and stop MSIE from duplicating command
// BH 11/25/2013 7:38:31 AM adds Jmol._tracker: option for GoogleAnalytics tracking
// BH 11/25/2013 7:39:03 AM adds URL options _J2S=  _JAR=  _USE=
// BH 11/23/2013 10:51:37 PM  adds JNLP support for local applet
// BH 11/2/2013 12:05:11 PM JSmolJSME fixes; https access fixed
// BH 10/31/2013 7:50:06 PM Jmol.Dialog as SwingController; Jmol._mouseOwner added
// BH 10/19/2013 7:05:04 AM adding Jmol._ajaxCall for Error Contacting Server; database POST method enabled
// BH 10/17/2013 1:40:51 PM  adding javajs/swing and Jmol.Dialog
// BH 9/30/2013 6:42:24 PM: pdb.gz switch  pdb should only be for www.rcsb.org
// BH 9/17/2013 10:17:51 AM: asynchronous file reading and saving
// BH 8/16/2013 12:02:20 PM: JSmoljQueryExt.js pulled out
// BH 8/16/2013 12:02:20 PM: Jmol._touching used properly

// BH 3/22/2013 5:53:02 PM: Adds noscript option, JSmol.min.core.js
// BH 1/17/2013 5:20:44 PM: Fixed problem with console not getting initial position if no first click
// 1/13/2013 BH: Fixed MSIE not-reading-local-files problem.
// 11/28/2012 BH: Fixed MacOS Safari binary ArrayBuffer problem
// 11/21/2012 BH: restructuring of files as JS... instead of J...
// 11/20/2012 BH: MSIE9 cannot do a synchronous file load cross-domain. See Jmol._getFileData
// 11/4/2012 BH: RCSB REST format change "<structureId>" to "<dimStructure.structureId>"
// 9/13/2012 BH: JmolCore.js chfanges for JSmol doAjax() method -- _3ata()
// 6/12/2012 BH: JmolApi.js: adds Jmol.setInfo(applet, info, isShown) -- third parameter optional 
// 6/12/2012 BH: JmolApi.js: adds Jmol.getInfo(applet) 
// 6/12/2012 BH: JmolApplet.js: Fixes for MSIE 8
// 6/5/2012  BH: fixes problem with Jmol "javascript" command not working and getPropertyAsArray not working
// 6/4/2012  BH: corrects problem with MSIE requiring mouse-hover to activate applet
// 5/31/2012 BH: added JSpecView interface and api -- see JmolJSV.js
//               also changed "jmolJarPath" to just "jarPath"
//               jmolJarFile->jarFile, jmolIsSigned->isSigned, jmolReadyFunction->readyFunction
//               also corrects a double-loading issue
// 5/14/2012 BH: added AJAX queue for ChemDoodle option with multiple canvases 
// 8/12/2012 BH: adds support for MSIE xdr cross-domain request (jQuery.iecors.js)

// allows Jmol applets to be created on a page with more flexibility and extendability
// provides an object-oriented interface for JSpecView and syncing of Jmol/JSpecView


// JSmoljQuery modifies standard jQuery to include binary file transfer
// If you are using jQuery already on your page and you do not need any
// binary file transfer, you can  

// required/optional libraries (preferably in the following order):

//    jQuery            -- at least jQuery.1.9
//    JSmoljQueryext.js -- required for binary file transfer; otherwise standard jQuery should be OK
//    JSmolCore.js      -- required;
//    JSmolApplet.js    -- required; internal functions for _Applet and _Image; must be after JmolCore
//    JSmolControls.js  -- optional; internal functions for buttons, links, menus, etc.; must be after JmolCore
//    JSmolApi.js       -- required; all user functions; must be after JmolCore
//    JSmolTHREE.js     -- WebGL library required for JSmolGLmol.js
//    JSmolGLmol.js     -- WebGL version of JSmol.
//    JSmolJSV.js       -- optional; for creating and interacting with a JSpecView applet 
//                          (requires JSpecViewApplet.jar or JSpecViewAppletSigned.jar
//    JSmol.js

// Allows Jmol-like objects to be displayed on Java-challenged (iPad/iPhone)
// or applet-challenged (Android/iPhone) platforms, with automatic switching to 

// For your installation, you should consider putting JmolData.jar and jsmol.php 
// on your own server. Nothing more than these two files is needed on the server, and this 
// allows more options for MSIE and Chrome when working with cross-domain files (such as RCSB or pubChem) 

// The NCI and RCSB databases are accessed via direct AJAX if available (xhr2/xdr).


if(typeof(jQuery)=="undefined") alert("Note -- JSmoljQuery is required for JSmol, but it's not defined.")


if (!self.Jmol)
Jmol = (function(document) {
  var z=9000;
  var http = (document.location.href.indexOf("https") == 0 ? "https" : "http"); 
  return {
    _version: 'JSmol 13.3.9 11/23/2013 10:51:10 PM',
    _alertNoBinary: true,
    // this url is used to Google Analytics tracking of Jmol use. You may remove it or modify it if you wish. 
    _tracker: 'http://chemapps.stolaf.edu/jmol/JmolTracker.htm?id=UA-45940799-1',
    _isLocal: (document.location.protocol.toLowerCase().indexOf("file:") == 0),
    _allowedJmolSize: [25, 2048, 300],   // min, max, default (pixels)
    /*  By setting the Jmol.allowedJmolSize[] variable in the webpage
        before calling Jmol.getApplet(), limits for applet size can be overriden.
        2048 standard for GeoWall (http://geowall.geo.lsa.umich.edu/home.html)
    */
    _jarFile: null,  // can be set in URL using _JAR=
    _j2sPath: null,  // can be set in URL using _J2S=
    _use: null,      // can be set in URL using _USE=
    _j2sLoadMonitorOpacity: 55, // initial opacity for j2s load monitor message
    _applets: {},
    _asynchronous: true,
    _ajaxQueue: [],
    _ajaxTestSite: http + "://google.com",
    _z:{
      header:z,
      main:z++,
      image:z++,
      top:z++,
      dialog:z++,
      menu:z+1000,
      fileOpener:z+1001,
      coverImage:z+2000
    },
    _debugCode: true,  // set false in process of minimization
    db: {
      _databasePrefixes: "$=:",
      _fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
      _nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
      _pubChemLoadScript: "",
      _DirectDatabaseCalls:{
        "cactus.nci.nih.gov": "%URL",
        "www.rcsb.org": "%URL",
        "pubchem.ncbi.nlm.nih.gov":"%URL",
        "$": "http://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf&get3d=True",
        "$$": "http://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf",
        "=": "http://www.rcsb.org/pdb/files/%FILE.pdb",
        "==": "http://www.rcsb.org/pdb/files/ligand/%FILE.cif",
        ":": "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
      },
      _restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
      _restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
      _restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
    },
    _debugAlert: false,
    _document: document,
    _execLog: "",
    _execStack: [],
    _isMsie: (navigator.userAgent.toLowerCase().indexOf("msie") >= 0),
    _isXHTML: false,
    _lastAppletID: null,
    _mousePageX: null,
    _mouseOwner: null,
    _serverUrl: "http://your.server.here/jsmol.php",
    _touching: false,
    _XhtmlElement: null,
    _XhtmlAppendChild: false
  }
})(document);


(function (Jmol, $) {

// this library is organized into the following sections:

  // jQuery interface 
  // protected variables
  // feature detection
  // AJAX-related core functionality
  // applet start-up functionality
  // misc core functionality
  // mouse events


  ////////////////////// jQuery interface ///////////////////////
  
  // hooks to jQuery -- if you have a different AJAX tool, feel free to adapt.
  // There should be no other references to jQuery in all the JSmol libraries.

  Jmol.$ = function(objectOrId, subdiv) {
    return $(subdiv ? "#" + objectOrId._id + "_" + subdiv : objectOrId);
  } 
  
  Jmol._$ = function(id) {
    return (typeof id == "string" ? $("#" + id) : id);
  }

  /// special functions:
  
  Jmol.$ajax = function (info) {
    //if (info.url.indexOf("http:") == 0)
      //info.url = Jmol.http + info.url.substring(4);
    // System.out.println(JSON.stringify(info))
    Jmol._ajaxCall = info.url;
    info.cache = (info.cache != "NO"); 
    // don't let jQuery add $_=... to URL unless we 
    // use cache:"NO"; other packages might use $.ajaxSetup() to set this to cache:false 
    return $.ajax(info);
  }

  Jmol.$appEvent = function(app, subdiv, evt, f) {
    var o = Jmol.$(app, subdiv); 
    o.off(evt) && f && o.on(evt, f);
  }   

  //// full identifier expected (could be "body", for example):
  
  Jmol.$after = function (what, s) {
    return $(what).after(s);
  }
  
  Jmol.$bind = function(what, list, f) {
    return (f ? $(what).bind(list, f) : $(what).unbind(list));
  }

  Jmol.$get = function(what, i) {
  return $(what).get(i);
  }
 
  //// div id or jQuery object expected:
  
  Jmol.$attr = function (id, a, val) {
    return Jmol._$(id).attr(a, val);
  }
  
  Jmol.$css = function(id, style) {
    return Jmol._$(id).css(style);
  }
   
  Jmol.$focus = function(id) {
    return Jmol._$(id).focus();
  }
     
  Jmol.$getAncestorDiv = function(id, className) {
    return $("div." + className + ":has(#" + id + ")")[0];
  }
  
  Jmol.$html = function(id, html) {
    return Jmol._$(id).html(html);
  }
   
  Jmol.$offset = function(id) {
    return Jmol._$(id).offset();
  }

  Jmol.$documentOff = function(evt, id) {
    return $(document).off(evt, "#" + id);
  }
  
  Jmol.$documentOn = function(evt, id, f) {
    return $(document).on(evt, "#" + id, f);
  }
    
  Jmol.$windowOn = function(evt, f) {
    return $(window).on(evt, f);
  }

  Jmol.$prop = function(id, p, val) {
    var o = Jmol._$(id);
    return (arguments.length == 3 ? o.prop(p, val) : o.prop(p));
  }
  
  Jmol.$remove = function(id) {
    return Jmol._$(id).remove();
  }
  
  Jmol.$resize = function (f) {
    return $(window).resize(f);
  }
  
  Jmol.$scrollTo = function (id, n) {
    var o = Jmol._$(id);
    return o.scrollTop(n < 0 ? o[0].scrollHeight : n);
  }

  Jmol.$setSize = function(id, w, h) {
    return Jmol._$(id).width(w).height(h);
  }
  
  Jmol.$setVisible = function(id, b) {
    var o = Jmol._$(id);
    return (b ? o.show() : o.hide());  
  }
      
  Jmol.$submit = function(id) {
    return Jmol._$(id).submit();
  }

  Jmol.$supportsIECrossDomainScripting = function() {
    return $.support.iecors;
  }
  
  Jmol.$val = function (id, v) {
    var o = Jmol._$(id);
    return (arguments.length == 1 ? o.val() : o.val(v));
  }
  
  ////////////// protected variables ///////////
  

  Jmol._clearVars = function() {
    // only on page closing -- appears to improve garbage collection
    
    delete jQuery;
    delete $;
    delete Jmol;

    if (!self.Clazz)return; 

    delete J;
    delete JU;
    delete JSV;
    delete JZ;
    delete java;
    delete Clazz;
    delete ClassLoader;
    delete ClassLoaderProgressMonitor;
    delete JavaObject;
    delete c$; // used in p0p; could be gotten rid of
    delete $_A;
    delete $_AB;
    delete $_AC;
    delete $_AD;
    delete $_AF;
    delete $_AI;
    delete $_AL;
    delete $_AS;
    delete $_Ab;
    delete $_B;
    delete $_C;
    delete $_D;
    delete $_E;
    delete $_F;
    delete $_G;
    delete $_H;
    delete $_I;
    delete $_J;
    delete $_K;
    delete $_L;
    delete $_M;
    delete $_N;
    delete $_O;
    delete $_P;
    delete $_Q;
    delete $_R;
    delete $_S;
    delete $_T;
    delete $_U;
    delete $_V;
    delete $_W;
    delete $_X;
    delete $_Y;
    delete $_Z;
    delete $_k;
    delete $_s;
    delete $t$;
  }
  
  ////////////// feature detection ///////////////
  
  Jmol.featureDetection = (function(document, window) {
    
    var features = {};
    features.ua = navigator.userAgent.toLowerCase()
    
    features.os = (function(){
      var osList = ["linux","unix","mac","win"]
      var i = osList.length;

      while (i--){
        if (features.ua.indexOf(osList[i])!=-1) return osList[i]
      }
      return "unknown";
    })();

    features.browser = function(){
      var ua = features.ua;
      var browserList = ["konqueror","webkit","omniweb","opera","webtv","icab","msie","mozilla"];
      for (var i = 0; i < browserList.length; i++)
      if (ua.indexOf(browserList[i])>=0) 
        return browserList[i];
      return "unknown";
    }
    features.browserName = features.browser();
    features.browserVersion= parseFloat(features.ua.substring(features.ua.indexOf(features.browserName)+features.browserName.length+1));
    features.supportsXhr2 = function() {return ($.support.cors || $.support.iecors)}
    features.allowDestroy = (features.browserName != "msie");
    features.allowHTML5 = (features.browserName != "msie" || navigator.appVersion.indexOf("MSIE 8") < 0);
    
    features.getDefaultLanguage = function() {
      return navigator.language || navigator.userLanguage || "en-US";
    };

    features._webGLtest = 0;
  
    features.supportsWebGL = function() {
    if (!Jmol.featureDetection._webGLtest) { 
      var canvas;
      Jmol.featureDetection._webGLtest = ( 
        window.WebGLRenderingContext 
          && ((canvas = document.createElement("canvas")).getContext("webgl") 
        || canvas.getContext("experimental-webgl")) ? 1 : -1);
    }
    return (Jmol.featureDetection._webGLtest > 0);
  };
  
  features.supportsLocalization = function() {
    //<meta charset="utf-8">                                     
    var metas = document.getElementsByTagName('meta'); 
    for (var i= metas.length; --i >= 0;) 
      if (metas[i].outerHTML.toLowerCase().indexOf("utf-8") >= 0) return true;
    return false;
    };
    
  features.supportsJava = function() {
    if (!Jmol.featureDetection._javaEnabled) {
      if (Jmol._isMsie) {
        return true;
          // sorry just can't deal with intentionally turning off Java in MSIE
      } else {
        Jmol.featureDetection._javaEnabled = (navigator.javaEnabled() ? 1 : -1);
      }
    }
    return (Jmol.featureDetection._javaEnabled > 0);
  };
    
  features.compliantBrowser = function() {
    var a = !!document.getElementById;
    var os = features.os;
    // known exceptions (old browsers):
    if (features.browserName == "opera" && features.browserVersion <= 7.54 && os == "mac"
      || features.browserName == "webkit" && features.browserVersion < 125.12
      || features.browserName == "msie" && os == "mac"
      || features.browserName == "konqueror" && features.browserVersion <= 3.3
    ) a = false;
    return a;
  }
  
  features.isFullyCompliant = function() {
    return features.compliantBrowser() && features.supportsJava();
  }
    
  features.useIEObject = (features.os == "win" && features.browserName == "msie" && features.browserVersion >= 5.5);
  features.useHtml4Object = (features.browserName == "mozilla" && features.browserVersion >= 5) ||
    (features.browserName == "opera" && features.browserVersion >= 8) ||
    (features.browserName == "webkit" && features.browserVersion >= 412.2 && features.browserVersion < 500); // 500 is a guess; required for 536.3
  
  features.hasFileReader = (window.File && window.FileReader);
  
  return features;
  
})(document, window);

    
    ////////////// AJAX-related core functionality //////////////

  Jmol._ajax = function(info) {
    if (!info.async) {
      return Jmol.$ajax(info).responseText;
    }
    Jmol._ajaxQueue.push(info)
    if (Jmol._ajaxQueue.length == 1)
      Jmol._ajaxDone()
  }
  Jmol._ajaxDone = function() {
    var info = Jmol._ajaxQueue.shift();
    info && Jmol.$ajax(info);
  }
  
  Jmol._grabberOptions = [
    ["$", "NCI(small molecules)"],
    [":", "PubChem(small molecules)"],
    ["=", "RCSB(macromolecules)"]
  ];
  
  Jmol._getGrabberOptions = function(applet) {
    // feel free to adjust this look to anything you want
    if (Jmol._grabberOptions.length == 0)
      return ""
    var s = '<input type="text" id="ID_query" onkeypress="if(13==event.which){Jmol._applets[\'ID\']._search();return false}" size="32" value="" />';
    var b = '<button id="ID_submit" onclick="Jmol._applets[\'ID\']._search()">Search</button></nobr>'
    if (Jmol._grabberOptions.length == 1) {
      s = '<nobr>' + s + '<span style="display:none">';
      b = '</span>' + b;
    } else {
      s += '<br /><nobr>'
    }
    s += '<select id="ID_select">'
    for (var i = 0; i < Jmol._grabberOptions.length; i++) {
      var opt = Jmol._grabberOptions[i];
      s += '<option value="' + opt[0] + '" ' + (i == 0 ? 'selected' : '') + '>' + opt[1] + '</option>';
    }
    s = (s + '</select>' + b).replace(/ID/g, applet._id);
    return '<br />' + s;
  }

  Jmol._getScriptForDatabase = function(database) {
    return (database == "$" ? Jmol.db._nciLoadScript : database == ":" ? Jmol.db._pubChemLoadScript : Jmol.db._fileLoadScript);
  }
  
   //   <dataset><record><structureId>1BLU</structureId><structureTitle>STRUCTURE OF THE 2[4FE-4S] FERREDOXIN FROM CHROMATIUM VINOSUM</structureTitle></record><record><structureId>3EUN</structureId><structureTitle>Crystal structure of the 2[4Fe-4S] C57A ferredoxin variant from allochromatium vinosum</structureTitle></record></dataset>
      
  Jmol._setInfo = function(applet, database, data) {
    var info = [];
    var header = "";
    if (data.indexOf("ERROR") == 0)
      header = data;
    else
      switch (database) {
      case "=":
        var S = data.split("<dimStructure.structureId>");
        var info = ["<table>"];
        for (var i = 1; i < S.length; i++) {
          info.push("<tr><td valign=top><a href=\"javascript:Jmol.search(" + applet._id + ",'=" + S[i].substring(0, 4) + "')\">" + S[i].substring(0, 4) + "</a></td>");
          info.push("<td>" + S[i].split("Title>")[1].split("</")[0] + "</td></tr>");
        }
        info.push("</table>");
        header = (S.length - 1) + " matches";
        break;      
      case "$": // NCI
      case ":": // pubChem
      break;
      default:
        return;
    }
    applet._infoHeader = header;
    applet._info = info.join("");
    applet._showInfo(true);
  }
  
  Jmol._loadSuccess = function(a, fSuccess) {
    if (!fSuccess)
      return;
    Jmol._ajaxDone();
    fSuccess(a);
  }

  Jmol._loadError = function(fError){
    Jmol._ajaxDone();
    Jmol.say("Error connecting to server: " + Jmol._ajaxCall);  
    null!=fError&&fError()
  }
  
  Jmol._isDatabaseCall = function(query) {
    return (Jmol.db._databasePrefixes.indexOf(query.substring(0, 1)) >= 0);
  }
  
  Jmol._getDirectDatabaseCall = function(query, checkXhr2) {
    if (checkXhr2 && !Jmol.featureDetection.supportsXhr2())
      return query;
    var pt = 2;
    var db;
    var call = Jmol.db._DirectDatabaseCalls[query.substring(0,pt)];
    if (!call)
      call = Jmol.db._DirectDatabaseCalls[db = query.substring(0,--pt)];
    if (call && db == ":") {
      var ql = query.toLowerCase();
      if (!isNaN(parseInt(query.substring(1)))) {
        query = ":cid/" + query.substring(1);
      } else if (ql.indexOf(":smiles:") == 0) {
        call += "?POST?smiles=" + query.substring(8);
        query = ":smiles";
      } else if (ql.indexOf(":cid:") == 0) {
        query = ":cid/" + query.substring(5);
      } else {
        if (ql.indexOf(":name:") == 0)
          query = query.substring(5);
        else if (ql.indexOf(":cas:") == 0)
          query = query.substring(4);
        query = ":name/" + encodeURIComponent(query.substring(1));
      }
    }
    query = (call ? call.replace(/\%FILE/, query.substring(pt)) : query);
    return query;
  }
  
  Jmol._getRawDataFromServer = function(database,query,fSuccess,fError,asBase64,noScript){
    var s = 
      "?call=getRawDataFromDatabase&database=" + database + (query.indexOf("?POST?") >= 0 ? "?POST?" : "")
        + "&query=" + encodeURIComponent(query)
        + (asBase64 ? "&encoding=base64" : "")
        + (noScript ? "" : "&script=" + encodeURIComponent(Jmol._getScriptForDatabase(database)));
    return Jmol._contactServer(s, fSuccess, fError);
  }
  
  Jmol._getInfoFromDatabase = function(applet, database, query){
    if (database == "====") {
      var data = Jmol.db._restQueryXml.replace(/QUERY/,query);
      
      var info = {
        dataType: "text",
        type: "POST",
        contentType:"application/x-www-form-urlencoded",
        url: Jmol.db._restQueryUrl,
        data: encodeURIComponent(data) + "&req=browser",
        success: function(data) {Jmol._ajaxDone();Jmol._extractInfoFromRCSB(applet, database, query, data)},
        error: function() {Jmol._loadError(null)},
        async: Jmol._asynchronous
      }
      return Jmol._ajax(info);
    }   
    query = "?call=getInfoFromDatabase&database=" + database
        + "&query=" + encodeURIComponent(query);
    return Jmol._contactServer(query, function(data) {Jmol._setInfo(applet, database, data)});
  }
  
  Jmol._extractInfoFromRCSB = function(applet, database, query, output) {
    var n = output.length/5;
    if (n == 0)
      return; 
    if (query.length == 4 && n != 1) {
      var QQQQ = query.toUpperCase();
      var pt = output.indexOf(QQQQ);
      if (pt > 0 && "123456789".indexOf(QQQQ.substring(0, 1)) >= 0)
        output = QQQQ + "," + output.substring(0, pt) + output.substring(pt + 5);
      if (n > 50)
        output = output.substring(0, 250);
      output = output.replace(/\n/g,",");
      var url = Jmol._restReportUrl.replace(/IDLIST/,output);
      Jmol._loadFileData(applet, url, function(data) {Jmol._setInfo(applet, database, data) });   
    }
  }

  Jmol._loadFileData = function(applet, fileName, fSuccess, fError){
    if (Jmol._isDatabaseCall(fileName)) {
      Jmol._setQueryTerm(applet, fileName);
      fileName = Jmol._getDirectDatabaseCall(fileName, true);
      
      
      if (Jmol._isDatabaseCall(fileName)) {
        // xhr2 not supported (MSIE)
        fileName = Jmol._getDirectDatabaseCall(fileName, false);
        Jmol._getRawDataFromServer("_",fileName,fSuccess,fError);   
        return;
      }
    } 
    var info = {
      type: "GET",
      dataType: "text",
      url: fileName,
      async: Jmol._asynchronous,
      success: function(a) {Jmol._loadSuccess(a, fSuccess)},
      error: function() {Jmol._loadError(fError)}
    }
    Jmol._checkAjaxPost(info);
    Jmol._ajax(info);
  }

  Jmol._checkAjaxPost = function(info) {
    var pt = info.url.indexOf("?POST?");
    if (pt > 0) {
      info.data = info.url.substring(pt + 6);
      info.url = info.url.substring(0, pt);
      info.type = "POST";
      info.contentType = "application/x-www-form-urlencoded";
    }
  }
  Jmol._contactServer = function(data,fSuccess,fError){
    var info = {
      dataType: "text",
      type: "GET",
      url: Jmol._serverUrl + data,
      success: function(a) {Jmol._loadSuccess(a, fSuccess)},
      error:function() { Jmol._loadError(fError) },
      async:fSuccess ? Jmol._asynchronous : false
    }
    Jmol._checkAjaxPost(info);
    return Jmol._ajax(info);
  }
  
  Jmol._setQueryTerm = function(applet, query) {
    if (!query || !applet._hasOptions || query.substring(0, 7) == "http://")
      return;
    if (Jmol._isDatabaseCall(query)) {
      var database = query.substring(0, 1);
      query = query.substring(1);
      if (query.substring(0,1) == database && "=$".indexOf(database) >= 0)
        query = query.substring(1);
      var d = Jmol._getElement(applet, "select");
      if (d && d.options)
        for (var i = 0; i < d.options.length; i++)
          if (d[i].value == database)
            d[i].selected = true;
    }
    Jmol._getElement(applet, "query").value = query;
  }

  Jmol._search = function(applet, query, script) {
    arguments.length > 1 || (query = null);
    Jmol._setQueryTerm(applet, query);
    query || (query = Jmol._getElement(applet, "query").value);
    if (query.indexOf("!") == 0) {
    // command prompt in this box as well
    // remove exclamation point "immediate" indicator
      applet._script(query.substring(1));
      return;
    } 
    query && (query = query.replace(/\"/g, ""));
    applet._showInfo(false);
    var database;
    if (Jmol._isDatabaseCall(query)) {
      database = query.substring(0, 1);
      query = query.substring(1);
    } else {
      database = (applet._hasOptions ? Jmol._getElement(applet, "select").value : "$");
    }
    if (database == "=" && query.length == 3)
      query = "=" + query; // this is a ligand      
    var dm = database + query;
    if (!query || dm.indexOf("?") < 0 && dm == applet._thisJmolModel) {
      return;    
    }
    applet._thisJmolModel = dm;
    if (database == "$" || database == ":")
      applet._jmolFileType = "MOL";
    else if (database == "=")
      applet._jmolFileType = "PDB";
    applet._searchDatabase(query, database, script);
  }
    
  Jmol._searchDatabase = function(applet, query, database, script) {
    applet._showInfo(false);
    if (query.indexOf("?") >= 0) {
      Jmol._getInfoFromDatabase(applet, database, query.split("?")[0]);
      return true;
    }
    if (Jmol.db._DirectDatabaseCalls[database]) {
      applet._loadFile(database + query, script);
      return true;
    }
    return false;
  }
    
  Jmol._syncBinaryOK="?";
  
  Jmol._canSyncBinary = function() {
    if (self.VBArray) return (Jmol._syncBinaryOK = false);
    if (Jmol._syncBinaryOK != "?") return Jmol._syncBinaryOK;
    Jmol._syncBinaryOK = true;
    try {
      var xhr = new window.XMLHttpRequest();
      xhr.open( "text", Jmol._ajaxTestSite, false );
      if (xhr.hasOwnProperty("responseType")) {
        xhr.responseType = "arraybuffer";
      } else if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
      }
    } catch( e ) {
      var s = "JmolCore.js: synchronous binary file transfer is requested but not available";
      /**System.out.println(s);
      if (Jmol._alertNoBinary)
        alert(s)*/
      return Jmol._syncBinaryOK = false;
    }
    return true;  
  }

  Jmol._binaryTypes = [".gz",".jpg",".png",".zip",".jmol",".bin",".smol",".spartan",".mrc",".pse", ".map", ".omap"];
  
  Jmol._isBinaryUrl = function(url) {
    for (var i = Jmol._binaryTypes.length; --i >= 0;)
      if (url.indexOf(Jmol._binaryTypes[i]) >= 0) return true;
    return false;
  }
  
  Jmol._getFileData = function(fileName) {
    // use host-server PHP relay if not from this host
    var type = (Jmol._isBinaryUrl(fileName) ? "binary" : "text");
    var asBase64 = ((type == "binary") && !Jmol._canSyncBinary());
    if (asBase64 && fileName.indexOf("pdb.gz") >= 0 && fileName.indexOf("http://www.rcsb.org/pdb/files/") == 0) {
      // avoid unnecessary binary transfer
      fileName = fileName.replace(/pdb\.gz/,"pdb");
      asBase64 = false;
      type = "text";
    }
    var isPost = (fileName.indexOf("?POST?") >= 0);
    if (fileName.indexOf("file:/") == 0 && fileName.indexOf("file:///") != 0)
      fileName = "file://" + fileName.substring(5);      /// fixes IE problem
    var isMyHost = (fileName.indexOf("://") < 0 || fileName.indexOf(document.location.protocol) == 0 && fileName.indexOf(document.location.host) >= 0);
    var isDirectCall = Jmol._isDirectCall(fileName);
    var cantDoSynchronousLoad = (!isMyHost && Jmol.$supportsIECrossDomainScripting());
    if (cantDoSynchronousLoad || asBase64 || !isMyHost && !isDirectCall)
      return Jmol._getRawDataFromServer("_",fileName, null, null, asBase64, true);
    fileName = fileName.replace(/file:\/\/\/\//, "file://"); // opera
    var info = {dataType:type,async:false};
    if (isPost) {
      info.type = "POST";
      info.url = fileName.split("?POST?")[0]
      info.data = fileName.split("?POST?")[1]
    } else {
      info.type = "GET";
      info.url = fileName;
    }
    var xhr = Jmol.$ajax(info);
    if (!xhr.responseText || self.Clazz && Clazz.instanceOf(xhr.response, self.ArrayBuffer)) {
      // Safari
      return xhr.response;
    } 
    return xhr.responseText;
  }

  Jmol._isDirectCall = function(url) {
    for (var key in Jmol.db._DirectDatabaseCalls) {
      if (key.indexOf(".") >= 0 && url.indexOf(key) >= 0)
        return true;
    }
    return false;
  }

  Jmol._cleanFileData = function(data) {
    if (data.indexOf("\r") >= 0 && data.indexOf("\n") >= 0) {
      return data.replace(/\r\n/g,"\n");
    }
    if (data.indexOf("\r") >= 0) {
      return data.replace(/\r/g,"\n");
    }
    return data;
  };

  Jmol._getFileType = function(name) {
    var database = name.substring(0, 1);
    if (database == "$" || database == ":")
      return "MOL";
    if (database == "=")
      return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
    // just the extension, which must be PDB, XYZ..., CIF, or MOL
    name = name.split('.').pop().toUpperCase();
    return name.substring(0, Math.min(name.length, 3));
  };

  Jmol._scriptLoad = function(app, file, params, doload) {
    var doscript = (app._isJava || !app._noscript || params.length > 1);
    if (doscript)
      app._script("zap;set echo middle center;echo Retrieving data...");
    if (!doload)
      return false;
    if (doscript)
      app._script("load \"" + file + "\"" + params);
    else
      app._applet.viewer.openFile(file);
    app._checkDeferred("");
    return true;
  }

  Jmol._loadFileAsynchronously = function(fileLoadThread, applet, fileName) {
    // we actually cannot suggest a fileName, I believe.
    if (!Jmol.featureDetection.hasFileReader)
        return fileLoadThread.setData("Local file reading is not enabled in your browser");
    if (!applet._localReader) {
      var div = '<div id="ID" style="z-index:'+Jmol._z.fileOpener + ';position:absolute;background:#E0E0E0;left:10px;top:10px"><div style="margin:5px 5px 5px 5px;"><input type="file" id="ID_files" /><button id="ID_loadfile">load</button><button id="ID_cancel">cancel</button></div><div>'
      Jmol.$after("#" + applet._id + "_appletdiv", div.replace(/ID/g, applet._id + "_localReader"));
      applet._localReader = Jmol.$(applet, "localReader");
    }
    Jmol.$appEvent(applet, "localReader_loadfile", "click");
    Jmol.$appEvent(applet, "localReader_loadfile", "click", function(evt) {
      var file = Jmol.$(applet, "localReader_files")[0].files[0];   
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          Jmol.$css(Jmol.$(applet, "localReader"), {display : "none"});
          fileLoadThread.setData(file.name, Jmol._toBytes(evt.target.result));
        }
      };
      reader.readAsArrayBuffer(file);
    });
    Jmol.$appEvent(applet, "localReader_cancel", "click");
    Jmol.$appEvent(applet, "localReader_cancel", "click", function(evt) {
      Jmol.$css(Jmol.$(applet, "localReader"), {display: "none"});
      fileLoadThread.setData(null, "#CANCELED#");
    });
    Jmol.$css(Jmol.$(applet, "localReader"), {display : "block"});
  }

  Jmol._toBytes = function(data) {
  data = new Uint8Array(data);
  var b = Clazz.newByteArray(data.length, 0);
    for (var i = data.length; --i >= 0;)
      b[i] = data[i];
  return b;
  }
          
  Jmol._doAjax = function(url, postOut, dataOut) {
    // called by org.jmol.awtjs2d.JmolURLConnection.doAjax()
    url = url.toString();
    
    if (dataOut != null) 
      return Jmol._saveFile(url, dataOut);
    if (postOut)
      url += "?POST?" + postOut;
    var data = Jmol._getFileData(url)
    return Jmol._processData(data, Jmol._isBinaryUrl(url));
  }

  // Jmol._localFileSaveFunction --  // do something local here; Maybe try the FileSave interface? return true if successful
   
  Jmol._saveFile = function(filename, data) {
    var url = Jmol._serverUrl;
    if (Jmol._localFileSaveFunction && Jmol._localFileSaveFunction(filename, data))
      return "OK";
    if (!url)
      return "Jmol._serverUrl is not defined";
      
    var isString = (typeof data == "string");
    var encoding = (isString ? "" : "base64");
    if (!isString)
      data = (JU ? JU : J.util).Base64.getBase64(data).toString();
    var filename = filename.substring(filename.lastIndexOf("/") + 1);
    var mimetype = (filename.indexOf(".png") >= 0 ? "image/png" : filename.indexOf(".jpg") >= 0 ? "image/jpg" : "");
    // Asynchronous output - to be reflected as a download
    if (!Jmol._formdiv) {
        var sform = '<div id="__jsmolformdiv__" style="display:none">\
          <form id="__jsmolform__" method="post" target="_blank" action="">\
          <input name="call" value="saveFile"/>\
          <input id="__jsmolmimetype__" name="mimetype" value=""/>\
          <input id="__jsmolencoding__" name="encoding" value=""/>\
          <input id="__jsmolfilename__" name="filename" value=""/>\
          <textarea id="__jsmoldata__" name="data"></textarea>\
          </form>\
          </div>'
      Jmol.$after("body", sform);
      Jmol._formdiv = "__jsmolform__";
    }
    Jmol.$attr(Jmol._formdiv, "action", url + "?" + (new Date()).getMilliseconds());
    Jmol.$val("__jsmoldata__", data);
    Jmol.$val("__jsmolfilename__", filename);
    Jmol.$val("__jsmolmimetype__", mimetype);
    Jmol.$val("__jsmolencoding__", encoding);
    Jmol.$submit("__jsmolform__");
    Jmol.$val("__jsmoldata__", "");
    Jmol.$val("__jsmolfilename__", "");
    return "OK";
  }
  
  Jmol._processData = function(data, isBinary) {
    if (typeof data == "undefined") {
      data = "";
      isBinary = false;
    }
    if (isBinary)
      isBinary = Jmol._canSyncBinary();
    // JU.SB is for Jmol 13.3+; J.util.SB is for Jmol.13.2
    if (!isBinary)
      return (self.JU && JU.SB ? JU.SB.newS(data) : J.util.SB.newS(data));
    var b;
  if (Clazz.instanceOf(data, self.ArrayBuffer))
    return Jmol._toBytes(data);
    b = Clazz.newByteArray(data.length, 0);
    for (var i = data.length; --i >= 0;)
      b[i] = data.charCodeAt(i) & 0xFF;
    return b;
  };


  ////////////// applet start-up functionality //////////////

  Jmol._setConsoleDiv = function (d) {
    if (!self.Clazz)return;
    Clazz.setConsoleDiv(d);
  }

  Jmol._setJmolParams = function(params, Info, isHashtable) {
    var availableValues = ";progressbar;progresscolor;boxbgcolor;boxfgcolor;allowjavascript;boxmessage;\
                  ;messagecallback;pickcallback;animframecallback;appletreadycallback;atommovedcallback;\
                  ;echocallback;evalcallback;hovercallback;language;loadstructcallback;measurecallback;\
                  ;minimizationcallback;resizecallback;scriptcallback;statusform;statustext;statustextarea;\
                  ;synccallback;usecommandthread;syncid;appletid;startupscript;";
    for (var i in Info)
      if(availableValues.indexOf(";" + i.toLowerCase() + ";") >= 0){
        if (i == "language" && !Jmol.featureDetection.supportsLocalization())
          continue;
        if (isHashtable)
          params.put(i, (Info[i] === true ? Boolean.TRUE: Info[i] === false ? Boolean.FALSE : Info[i]))
        else
          params[i] = Info[i];
      }
  }     
   
  Jmol._registerApplet = function(id, applet) {
    return window[id] = Jmol._applets[id] = Jmol._applets[applet] = applet;
  } 

  Jmol._readyCallback = function (appId,fullId,isReady,jmolApp) {
    appId = appId.split("_object")[0];
    isReady = (isReady.booleanValue ? isReady.booleanValue() : isReady);
    // necessary for MSIE in strict mode -- apparently, we can't call 
    // jmol._readyCallback, but we can call Jmol._readyCallback. Go figure...
    
    Jmol._track(Jmol._applets[appId])._readyCallback(appId, fullId, isReady, jmolApp);
  }

  Jmol._getWrapper = function(applet, isHeader) {
      
      // id_appletinfotablediv
      //     id_appletdiv
      //     id_coverdiv
      //     id_infotablediv
      //       id_infoheaderdiv
      //          id_infoheaderspan
      //          id_infocheckboxspan
      //       id_infodiv
      
      
      // for whatever reason, without DOCTYPE, with MSIE, "height:auto" does not work, 
      // and the text scrolls off the page.
      // So I'm using height:95% here.
      // The table was a fix for MSIE with no DOCTYPE tag to fix the miscalculation
      // in height of the div when using 95% for height. 
      // But it turns out the table has problems with DOCTYPE tags, so that's out. 
      // The 95% is a compromise that we need until the no-DOCTYPE MSIE solution is found. 
      // (100% does not work with the JME linked applet)
    var s;
    // ... here are just for clarification in this code; they are removed immediately
    if (isHeader) {
      var img = ""; 
      if (applet._coverImage){
        var more = " onclick=\"Jmol.coverApplet(ID, false)\" title=\"" + (applet._coverTitle) + "\"";
        var play = "<image id=\"ID_coverclickgo\" src=\"" + applet._j2sPath + "/img/play_make_live.jpg\" style=\"width:25px;height:25px;position:absolute;bottom:10px;left:10px;"
          + "z-index:" + (Jmol._z.coverImage)+";opacity:0.5;\"" + more + " />"  
        img = "<div id=\"ID_coverdiv\" style=\"backgoround-color:red;z-index:" + Jmol._z.coverImage+";width:100%;height:100%;display:inline;position:absolute;top:0px;left:0px\"><image id=\"ID_coverimage\" src=\""
         + applet._coverImage + "\" style=\"width:100%;height:100%\"" + more + "/>" + play + "</div>";
      }
      s = "\
...<div id=\"ID_appletinfotablediv\" style=\"width:Wpx;height:Hpx;position:relative;font-size:14px;text-align:left\">IMG\
......<div id=\"ID_appletdiv\" style=\"z-index:" + Jmol._z.header + ";width:100%;height:100%;position:absolute;top:0px;left:0px;\">";
      var height = applet._height;
      var width = applet._width;
      if (typeof height !== "string" || height.indexOf("%") < 0) 
        height += "px";
      if (typeof width !== "string" || width.indexOf("%") < 0)
        width += "px";
      s = s.replace(/IMG/, img).replace(/Hpx/g, height).replace(/Wpx/g, width);
    } else {
      s = "\
......</div>\
......<div id=\"ID_2dappletdiv\" style=\"position:absolute;width:100%;height:100%;overflow:hidden;display:none\"></div>\
......<div id=\"ID_infotablediv\" style=\"width:100%;height:100%;position:absolute;top:0px;left:0px\">\
.........<div id=\"ID_infoheaderdiv\" style=\"height:20px;width:100%;background:yellow;display:none\"><span id=\"ID_infoheaderspan\"></span><span id=\"ID_infocheckboxspan\" style=\"position:absolute;text-align:right;right:1px;\"><a href=\"javascript:Jmol.showInfo(ID,false)\">[x]</a></span></div>\
.........<div id=\"ID_infodiv\" style=\"position:absolute;top:20px;bottom:0px;width:100%;height:100%;overflow:auto\"></div>\
......</div>\
...</div>";
    }
    return s.replace(/\.\.\./g,"").replace(/[\n\r]/g,"").replace(/ID/g, applet._id);
  }

  Jmol._documentWrite = function(text) {
    if (Jmol._document) {
      if (Jmol._isXHTML && !Jmol._XhtmlElement) {
        var s = document.getElementsByTagName("script");
        Jmol._XhtmlElement = s.item(s.length - 1);
        Jmol._XhtmlAppendChild = false;
      }
      if (Jmol._XhtmlElement)
        Jmol._domWrite(text);
      else
        Jmol._document.write(text);
    }
    return text;
  }

  Jmol._domWrite = function(data) {
    var pt = 0
    var Ptr = []
    Ptr[0] = 0
    while (Ptr[0] < data.length) {
      var child = Jmol._getDomElement(data, Ptr);
      if (!child)
        break;
      if (Jmol._XhtmlAppendChild)
        Jmol._XhtmlElement.appendChild(child);
      else
        Jmol._XhtmlElement.parentNode.insertBefore(child, _jmol.XhtmlElement);
    }
  }
  
  Jmol._getDomElement = function(data, Ptr, closetag, lvel) {

    // there is no "document.write" in XHTML
  
    var e = document.createElement("span");
    e.innerHTML = data;
    Ptr[0] = data.length;

/*
  // unnecessary ?  

    closetag || (closetag = "");
    lvel || (lvel = 0);
    var pt0 = Ptr[0];
    var pt = pt0;
    while (pt < data.length && data.charAt(pt) != "<") 
      pt++
    if (pt != pt0) {
      var text = data.substring(pt0, pt);
      Ptr[0] = pt;
      return document.createTextNode(text);
    }
    pt0 = ++pt;
    var ch;
    while (pt < data.length && "\n\r\t >".indexOf(ch = data.charAt(pt)) < 0) 
      pt++;
    var tagname = data.substring(pt0, pt);
    var e = (tagname == closetag  || tagname == "/" ? ""
      : document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', tagname)
      : document.createElement(tagname));
    if (ch == ">") {
      Ptr[0] = ++pt;
      return e;
    }
    while (pt < data.length && (ch = data.charAt(pt)) != ">") {
      while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
        pt++;
      pt0 = pt;
      while (pt < data.length && "\n\r\t =/>".indexOf(ch = data.charAt(pt)) < 0) 
        pt++;
      var attrname = data.substring(pt0, pt).toLowerCase();
      if (attrname && ch != "=")
        e.setAttribute(attrname, "true");
      while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
        pt++;
      if (ch == "/") {
        Ptr[0] = pt + 2;
        return e;
      } else if (ch == "=") {
        var quote = data.charAt(++pt);
        pt0 = ++pt;
        while (pt < data.length && (ch = data.charAt(pt)) != quote) 
          pt++;
        var attrvalue = data.substring(pt0, pt);
        e.setAttribute(attrname, attrvalue);
        pt++;
      }
    }
    Ptr[0] = ++pt;
    while (Ptr[0] < data.length) {
      var child = Jmol._getDomElement(data, Ptr, "/" + tagname, lvel+1);
      if (!child)
        break;
      e.appendChild(child);
    }
*/
    return e;    
  }
  
  Jmol._setObject = function(obj, id, Info) {
    obj._id = id;
    obj.__Info = {};  
    for (var i in Info)
      obj.__Info[i] = Info[i];
    obj._width = Info.width;
    obj._height = Info.height;
    obj._noscript = !obj._isJava && Info.noscript;
    obj._console = Info.console;


    if (!obj._console)
      obj._console = obj._id + "_infodiv";
    if (obj._console == "none")
      obj._console = null;
      
    obj._color = (Info.color ? Info.color.replace(/0x/,"#") : "#FFFFFF");
    obj._disableInitialConsole = Info.disableInitialConsole;
    obj._noMonitor = Info.disableJ2SLoadMonitor;
    Jmol._j2sPath && (Info.j2sPath = Jmol._j2sPath);
    obj._j2sPath = Info.j2sPath;
    obj._deferApplet = Info.deferApplet;
    obj._deferUncover = Info.deferUncover;
    obj._coverImage = !obj._isJava && Info.coverImage;
    obj._isCovered = !!obj._coverImage; 
    obj._coverScript = Info.coverScript;
    obj._coverTitle = Info.coverTitle;

    if (!obj._coverTitle)
      obj._coverTitle = (obj._deferApplet ? "activate 3D model" : "3D model is loading...")
    obj._containerWidth = obj._width + ((obj._width==parseFloat(obj._width))? "px":"");
    obj._containerHeight = obj._height + ((obj._height==parseFloat(obj._height))? "px":"");
    obj._info = "";
    obj._infoHeader = obj._jmolType + ' "' + obj._id + '"'
    obj._hasOptions = Info.addSelectionOptions;
    obj._defaultModel = Info.defaultModel;
    obj._readyScript = (Info.script ? Info.script : "");
    obj._readyFunction = Info.readyFunction;
    if (obj._coverImage && !obj._deferApplet)
      obj._readyScript += ";javascript " + id + "._displayCoverImage(false)";
    obj._src = Info.src;

  }

  Jmol._addDefaultInfo = function(Info, DefaultInfo) {
    for (var x in DefaultInfo)
      if (typeof Info[x] == "undefined")
        Info[x] = DefaultInfo[x];
    Jmol._use && (Info.use = Jmol._use);
    if (Info.use == "SIGNED") {
      if (Info.jarFile.indexOf("Signed") < 0)
        Info.jarFile = Info.jarFile.replace(/Applet/,"AppletSigned");
      Info.use = "JAVA";
      Info.isSigned = true;
    }
  }
  
  Jmol._syncedApplets = [];
  Jmol._syncedCommands = [];
  Jmol._syncedReady = [];
  Jmol._syncReady = false;
  Jmol._isJmolJSVSync = false;

  Jmol._setReady = function(applet) {
    Jmol._syncedReady[applet] = 1;
    var n = 0;
    for (var i = 0; i < Jmol._syncedApplets.length; i++) {
      if (Jmol._syncedApplets[i] == applet._id) {
        Jmol._syncedApplets[i] = applet;
        Jmol._syncedReady[i] = 1;
      } else if (!Jmol._syncedReady[i]) {
        continue;
      }
      n++;
    }
    if (n != Jmol._syncedApplets.length)
      return;
    Jmol._setSyncReady();
  }

  Jmol._setDestroy = function(applet) {
    //MSIE bug responds to any link click even if it is just a JavaScript call
    
    if (Jmol.featureDetection.allowDestroy)
      Jmol.$windowOn('beforeunload', function () { Jmol._destroy(applet); } );
  }
  
  Jmol._destroy = function(applet) {
    try {
      if (applet._applet) applet._applet.destroy();
      applet._applet = null;
      Jmol._unsetMouse(applet._canvas)
      applet._canvas = null;
      var n = 0;
      for (var i = 0; i < Jmol._syncedApplets.length; i++) {
        if (Jmol._syncedApplets[i] == applet)
          Jmol._syncedApplets[i] = null;
        if (Jmol._syncedApplets[i])
          n++;
      }
      if (n > 0)
        return;
      Jmol._clearVars();
    } catch(e){}
  }

  ////////////// misc core functionality //////////////

  Jmol._setSyncReady = function() {
    Jmol._syncReady = true;
    var s = ""
    for (var i = 0; i < Jmol._syncedApplets.length; i++)
      if (Jmol._syncedCommands[i])
        s += "Jmol.script(Jmol._syncedApplets[" + i + "], Jmol._syncedCommands[" + i + "]);"
    setTimeout(s, 50);  
  }

  Jmol._mySyncCallback = function(app,msg) {
    if (!Jmol._syncReady || !Jmol._isJmolJSVSync)
      return 1; // continue processing and ignore me
    for (var i = 0; i < Jmol._syncedApplets.length; i++) {
      if (msg.indexOf(Jmol._syncedApplets[i]._syncKeyword) >= 0) {
        Jmol._syncedApplets[i]._syncScript(msg);
      }
    }
    return 0 // prevents further Jmol sync processing 
  }              

  Jmol._getElement = function(applet, what) {
    var d = document.getElementById(applet._id + "_" + what);
    return (d || {});
  } 
   
  Jmol._evalJSON = function(s,key){
    s = s + "";
    if(!s)
      return [];
    if(s.charAt(0) != "{") {
      if(s.indexOf(" | ") >= 0)
        s = s.replace(/\ \|\ /g, "\n");
      return s;
    }
    var A = (new Function( "return " + s ) )();
    return (!A ? null : key && A[key] != undefined ? A[key] : A);
  }

  Jmol._sortMessages = function(A){
    /*
     * private function
     */
    function _sortKey0(a,b){
      return (a[0]<b[0]?1:a[0]>b[0]?-1:0);
    }

    if(!A || typeof (A) != "object")
      return [];
    var B = [];
    for(var i = A.length - 1; i >= 0; i--)
      for(var j = 0, jj= A[i].length; j < jj; j++)
        B[B.length] = A[i][j];
    if(B.length == 0)
      return;
    B = B.sort(_sortKey0);
    return B;
  }

  //////////////////// mouse events //////////////////////
  
  Jmol._setMouseOwner = function(who, tf) {
    if (who == null || tf)
      Jmol._mouseOwner = who;
    else if (Jmol._mouseOwner == who)
      Jmol._mouseOwner = null;
  }

  Jmol._jsGetMouseModifiers = function(ev) {
    var modifiers = 0;
    switch (ev.button) {
    case 0:
      modifiers = 16;//J.api.Event.MOUSE_LEFT;
      break;
    case 1:
      modifiers = 8;//J.api.Event.MOUSE_MIDDLE;
      break;
    case 2:
      modifiers = 4;//J.api.Event.MOUSE_RIGHT;
      break;
    }
    if (ev.shiftKey)
      modifiers += 1;//J.api.Event.SHIFT_MASK;
    if (ev.altKey)
      modifiers += 8;//J.api.Event.ALT_MASK;
    if (ev.ctrlKey)
      modifiers += 2;//J.api.Event.CTRL_MASK;
    return modifiers;
  }

  Jmol._jsGetXY = function(canvas, ev) {
    if (!canvas.applet._ready || Jmol._touching && ev.type.indexOf("touch") < 0)
      return false;
    ev.preventDefault();
    var offsets = Jmol.$offset(canvas.id);
    var x, y;
    var oe = ev.originalEvent;
    Jmol._mousePageX = ev.pageX;
    Jmol._mousePageY = ev.pageY;
    if (oe.targetTouches && oe.targetTouches[0]) {
      x = oe.targetTouches[0].pageX - offsets.left;
      y = oe.targetTouches[0].pageY - offsets.top;
    } else if (oe.changedTouches) {
      x = oe.changedTouches[0].pageX - offsets.left;
      y = oe.changedTouches[0].pageY - offsets.top;
    } else {
      x = ev.pageX - offsets.left;
      y = ev.pageY - offsets.top;
    }
    return (x == undefined ? null : [Math.round(x), Math.round(y), Jmol._jsGetMouseModifiers(ev)]);
  }

  Jmol._gestureUpdate = function(canvas, ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var oe = ev.originalEvent;
    switch (ev.type) {
    case "touchstart":
      Jmol._touching = true;
      break;
    case "touchend":
      Jmol._touching = false;
      break;
    }
    if (!oe.touches || oe.touches.length != 2) return false;
    switch (ev.type) {
    case "touchstart":
      canvas._touches = [[],[]];
      break;
    case "touchmove":
      var offsets = Jmol.$offset(canvas.id);
      var t0 = canvas._touches[0];
      var t1 = canvas._touches[1];
      t0.push([oe.touches[0].pageX - offsets.left, oe.touches[0].pageY - offsets.top]);
      t1.push([oe.touches[1].pageX - offsets.left, oe.touches[1].pageY - offsets.top]);
      var n = t0.length;
      if (n > 3) {
        t0.shift();
        t1.shift();
      }
      if (n >= 2)
        canvas.applet._processGesture(canvas._touches);
      break;
    }
    return true;
  }
  
  Jmol._jsSetMouse = function(canvas) {
    Jmol.$bind(canvas, 'mousedown touchstart', function(ev) {
      Jmol._setMouseOwner(canvas, true);
      ev.stopPropagation();
      ev.preventDefault();
      canvas.isDragging = true;
      if ((ev.type == "touchstart") && Jmol._gestureUpdate(canvas, ev))
        return false;
      Jmol._setConsoleDiv(canvas.applet._console);
      var xym = Jmol._jsGetXY(canvas, ev);
      if(!xym)
        return false;
      if (ev.button != 2 && canvas.applet._popups)
        Jmol.Menu.hidePopups(canvas.applet._popups);

      canvas.applet._processEvent(501, xym); //J.api.Event.MOUSE_DOWN
      return false;
    });
    Jmol.$bind(canvas, 'mouseup touchend', function(ev) {
      Jmol._setMouseOwner(null);
      ev.stopPropagation();
      ev.preventDefault();
      canvas.isDragging = false;
      if (ev.type == "touchend" && Jmol._gestureUpdate(canvas, ev))
        return false;
      var xym = Jmol._jsGetXY(canvas, ev);
      if(!xym) return false;
      canvas.applet._processEvent(502, xym);//J.api.Event.MOUSE_UP
      return false;

    });
    Jmol.$bind(canvas, 'mousemove touchmove', function(ev) { // touchmove
      ev.stopPropagation();
      ev.preventDefault();
      var isTouch = (ev.type == "touchmove");
      if (isTouch && Jmol._gestureUpdate(canvas, ev))
        return false;
      var xym = Jmol._jsGetXY(canvas, ev);
      if(!xym) return false;
      if (!canvas.isDragging)
        xym[2] = 0;
      canvas.applet._processEvent((canvas.isDragging ? 506 : 503), xym); // J.api.Event.MOUSE_DRAG : J.api.Event.MOUSE_MOVE
      return false;
    });
    Jmol.$bind(canvas, 'DOMMouseScroll mousewheel', function(ev) { // Zoom
      ev.stopPropagation();
      ev.preventDefault();
      // Webkit or Firefox
      canvas.isDragging = false;
      var oe = ev.originalEvent;
      var scroll = (oe.detail ? oe.detail : (Jmol.featureDetection.os == "mac" ? 1 : -1) * oe.wheelDelta); // Mac and PC are reverse; but 
      var modifiers = Jmol._jsGetMouseModifiers(ev);
      canvas.applet._processEvent(-1,[scroll < 0 ? -1 : 1,0,modifiers]);
      return false;
    });

    // context menu is fired on mouse down, not up, and it's handled already anyway.
        
    Jmol.$bind(canvas, "contextmenu", function() {return false;});
    
    Jmol.$bind(canvas, 'mouseout', function(ev) {
      if (canvas.applet._applet)
        canvas.applet._applet.viewer.startHoverWatcher(false);
      canvas.isDragging = false;
    });

    Jmol.$bind(canvas, 'mouseenter', function(ev) {
      if (canvas.applet._applet)
        canvas.applet._applet.viewer.startHoverWatcher(true);
      if (ev.buttons === 0 || ev.which === 0) {
        canvas.isDragging = false;
        var xym = Jmol._jsGetXY(canvas, ev);
        if (!xym) return false;
        canvas.applet._processEvent(502, xym);//J.api.Event.MOUSE_UP
      }
    });

    if (canvas.applet._is2D)
      Jmol.$resize(function() {
        if (!canvas.applet)
          return;
        canvas.applet._resize();
      });
 
    Jmol.$bind('body', 'mouseup touchend', function(ev) {
      if (canvas.applet)
        canvas.isDragging = false;
      Jmol._setMouseOwner(null);
    });

  }

  Jmol._jsUnsetMouse = function(canvas) {
    canvas.applet = null;
    Jmol.$bind(canvas, 'mousedown touchstart mousemove touchmove mouseup touchend DOMMouseScroll mousewheel contextmenu mouseout mouseenter', null);
    Jmol._setMouseOwner(null);
  }

Jmol._setDraggable = function(Obj) {
  var proto = Obj.prototype;
  // for menus and console
  proto.setContainer = function(container) {
    this.container = container;
    container.obj = this;
    this.isDragging = false;
    this.ignoreMouse = false;
    var me = this;
    container.bind('mousedown touchstart', function(ev) {
      if (me.ignoreMouse) {
        me.ignoreMouse = false;
        return true;
      }
      Jmol._setMouseOwner(me, true);
      me.isDragging = true;
      me.pageX = ev.pageX;
      me.pageY = ev.pageY;
      return false;
    });
    container.bind('mousemove touchmove', function(ev) {
      if (me.isDragging && Jmol._mouseOwner == me) {
        me.mouseMove(ev);
        return false;
      }
    });
    container.bind('mouseup touchend', function(ev) {
      me.mouseUp(ev);
      Jmol._setMouseOwner(null);
    });
  };

  proto.mouseUp = function(ev) {
    if (this.isDragging && Jmol._mouseOwner == this) {
      this.pageX0 += (ev.pageX - this.pageX);
      this.pageY0 += (ev.pageY - this.pageY);
      this.isDragging = false;
      return false;
    }
    Jmol._setMouseOwner(null);
  }
  
  proto.setPosition = function() {
    if (Jmol._mousePageX === null) {
      var id = this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas");
      var offsets = Jmol.$offset(id);
      Jmol._mousePageX = offsets.left;
      Jmol._mousePageY = offsets.top;
    }
    this.pageX0 = Jmol._mousePageX;
    this.pageY0 = Jmol._mousePageY;
    var pos = { top: Jmol._mousePageY + 'px', left: Jmol._mousePageX + 'px' };
    this.container.css(pos);
  };
  
  proto.mouseMove = function(ev) {
    if (this.isDragging && Jmol._mouseOwner == this) {
      var x = this.pageX0 + (ev.pageX - this.pageX);
      var y = this.pageY0 + (ev.pageY - this.pageY);
      this.container.css({ top: y + 'px', left: x + 'px' })
    }
  };
    
  proto.dragBind = function(isBind) {
    this.container.unbind('mousemoveoutjsmol');
    this.container.unbind('touchmoveoutjsmol');
    this.container.unbind('mouseupoutjsmol');
    this.container.unbind('touchendoutjsmol');
    Jmol._setMouseOwner(null);
    if (isBind) {
      var me = this;
      this.container.bind('mousemoveoutjsmol touchmoveoutjsmol', function(evspecial, target, ev) {
        me.mouseMove(ev);
      });
      this.container.bind('mouseupoutjsmol touchendoutjsmol', function(evspecial, target, ev) {
        me.mouseUp(ev);
      });
    }
  };
}

////// Jmol.Dialog interface  for Javascript implementation of Swing dialogs

Jmol.Dialog = {
  count:0,
  htDialogs:{}
};

SwingController = Jmol.Dialog; // see javajs.api.SwingController

Jmol.Dialog.JSDialog = function () {
}

Jmol._setDraggable(Jmol.Dialog.JSDialog);

///// calls from javajs and other Java-derived packages /////

Jmol.Dialog.getScreenDimensions = function(d) {
  d.width = $(window).width();
  d.height = $(window).height();
}

Jmol.Dialog.dispose = function(dialog) {
  Jmol.$remove(dialog.id + "_mover");
  delete Jmol.Dialog.htDialogs[dialog.id]
  dialog.container.obj.dragBind(false);
//  var btns = $("#" + dialog.id + " *[id^='J']"); // add descendents with id starting with "J"
//  for (var i = btns.length; --i >= 0;)
//    delete Jmol.Dialog.htDialogs[btns[i].id]
  System.out.println("JmolCore.js: dispose " + dialog.id)
}
 
Jmol.Dialog.register = function(dialog, type) {
  dialog.id = type + (++Jmol.Dialog.count);
  Jmol.Dialog.htDialogs[dialog.id] = dialog;
  System.out.println("JmolCore.js: register " + dialog.id)
  
}

Jmol.Dialog.setDialog = function(dialog) {
  Jmol._setMouseOwner(null);
  Jmol.$remove(dialog.id);
  System.out.println("removed " + dialog.id)
  var id = dialog.id + "_mover";
  var container = Jmol.$("#" + id);
  var jd;
  System.out.println("JmolCore.js: setDialog " + dialog.id);
  if (container[0]) {
    container.html(dialog.html);
    jd = container[0].jd;
  } else {
    Jmol.$after("body","<div id='" + id + "' style='position:absolute;left:0px;top:0px;'>" + dialog.html + "</div>");
    var jd = new Jmol.Dialog.JSDialog();
    container = Jmol.$("#" + id);
    dialog.container = container;
    jd.applet = dialog.manager.viewer.applet;
    jd.setContainer(container);
    jd.dialog = dialog;
    jd.setPosition();  
    jd.dragBind(true);
    container[0].jd = jd; 
  }
  Jmol.$bind("#" + dialog.id + " .JButton", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JComboBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JCheckBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JTextField", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JTable", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JScrollPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
  Jmol.$bind("#" + dialog.id + " .JEditorPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });

}
 
Jmol.Dialog.setSelected = function(chk) {
 Jmol.$prop(chk.id, 'checked', !!chk.selected);
}

Jmol.Dialog.setSelectedIndex = function(cmb) {
 Jmol.$prop(cmb.id, 'selectedIndex', cmb.selectedIndex);
}

Jmol.Dialog.setText = function(btn) {
 Jmol.$prop(btn.id, 'value', btn.text);
}

Jmol.Dialog.setVisible = function(c) {
  Jmol.$setVisible(c.id, c.visible);
}

/// callbacks from the HTML elements ////
 
Jmol.Dialog.click = function(element, keyEvent) {
  var component = Jmol.Dialog.htDialogs[element.id];
  if (component) {
    System.out.println("click " + element + " " + component)
    var info = component.toString();
    // table cells will have an id but are not registered
    if (info.indexOf("JCheck") >= 0) {
        component.selected = element.checked;
    } else if (info.indexOf("JCombo") >= 0) {
      component.selectedIndex = element.selectedIndex;
    } else if (component.text != null) {  // JButton, JTextField
      component.text = element.value;
      if (keyEvent && ((keyEvent.charCode || keyEvent.keyCode) != 13))
        return;
    }    
  }
  var dialog = Jmol.Dialog.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
  var key = (component ? component.name :  dialog.registryKey + "/" + element.id);
  System.out.println("JmolCore.js: click " + key); 
  dialog.manager.actionPerformed(key);
}

Jmol.Dialog.windowClosing = function(element) {
  var dialog = Jmol.Dialog.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
  System.out.println("JmolCore.js: windowClosing " + dialog.registryKey); 
  dialog.manager.processWindowClosing(dialog.registryKey);
}

Jmol._track = function(applet) {
  // this function inserts an iFrame that can be used to track your page's applet use. 
  // By default it tracks to a page at St. Olaf College, but you can change that. 
  if (Jmol._tracker && !Jmol._isLocal){
  try {  
    var url = Jmol._tracker + "&applet=" + applet._jmolType + "&version=" + Jmol._version 
      + "&appver=" + self.___JmolVersion + "&url=" + encodeURIComponent(document.location.href);
    var s = '<iframe style="display:none" width="0" height="0" frameborder="0" tabindex="-1" src="' + url + '"></iframe>'
    Jmol.$after("body", s);
  } catch (e) {
    // ignore
  }}
  delete Jmol._tracker;
  return applet;
}

Jmol.getProfile = function() {
  window["j2s.doProfile"] = true;
  if (self.Clazz) {
    Clazz.profile = self.JSON && {};
    return Clazz.getProfile();
  }
 }
})(Jmol, jQuery);

