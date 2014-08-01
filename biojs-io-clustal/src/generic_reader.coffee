HttpRequest = require("./http_request")

genReader =
  class GenericReader

    @read: (url, callback) ->
      onret = (text) => @_onRetrieval(text,callback)
      HttpRequest.fetch(url, onret)

    @_onRetrieval: (text, callback) ->
      start = new Date().getTime()
      rText = @parse(text)
      end = new Date().getTime()
      console.log "Parsing time: #{(end - start)} ms"
      callback rText
