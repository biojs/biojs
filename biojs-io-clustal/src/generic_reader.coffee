#HttpRequest = require("HTTPRequest")
#HttpRequest = require("./http_request")
if window?
  request = require('browser-request')

module.exports =
class GenericReader

  @read: (url, callback) ->
    onret = (err, response, text) => @_onRetrieval(text,callback)
    request(url, 'GET',onret)
    #HttpRequest.get(url, onret)

  @_onRetrieval: (text, callback) ->
    start = new Date().getTime()
    rText = @parse(text)
    end = new Date().getTime()
    console.log "Parsing time: #{(end - start)} ms"
    callback rText
