strings = {
  contains: (text, search) ->
    return ''.indexOf.call(text, search, 0) isnt -1
  }
module.exports = strings
