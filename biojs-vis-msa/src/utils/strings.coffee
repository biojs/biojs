module.exports =
  {
    contains: (text, search) ->
      return ''.indexOf.call(text, search, 0) isnt -1
  }
