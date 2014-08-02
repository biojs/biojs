module.exports =
  class HttpRequest

    @fetch: (url, callback) ->
      req = HttpRequest.getXMLRequest()
      req.addEventListener 'readystatechange', ->
        if req.readyState is 4
          # 0 is returned by PhantomJS
          successResultCodes = [0,200, 304]
          if req.status in successResultCodes
            end = new Date().getTime()
            console.log "XMLHttpRequest time: #{(end-req.start)} ms"
            callback req.responseText
          else
            console.log req.status
            console.log 'Error loading data...'

      # prevent xml parsing by Firefox
      req.overrideMimeType 'text/plain'
      req.start = new Date().getTime()
      req.open "GET", url,true
      req.send()

    # support for IE
    @getXMLRequest: ->
      if XMLHttpRequest?
        return new XMLHttpRequest()
      else
        console.log 'XMLHttpRequest is undefined'
        HttpRequest.XMLHttpRequest = ->
          try
            return new ActiveXObject "Msxml2.XMLHTTP.6.0"
          catch error
          try
            return new ActiveXObject "Msxml2.XMLHTTP.3.0"
          catch error
          try
            return new ActiveXObject "Microsoft.XMLHTTP"
          catch error
          throw new Error "This browser does not support XMLHttpRequest."
