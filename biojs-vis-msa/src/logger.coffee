module.exports =
  class Logger

    setConsole: (name) ->
      @console = document.getElementById(name)

    # quick & dirty logger
    log: (msg) ->
      @console.innerHTML = msg  if typeof @console isnt "undefined"
