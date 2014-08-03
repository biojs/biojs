Utils = {}
Utils.splitNChars = (txt, num) ->
  result = []
  for i in [0..txt.length - 1] by num
    result.push(txt.substr(i, num))
  result
module.exports = Utils
