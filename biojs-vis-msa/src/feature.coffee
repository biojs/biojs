module.exports =
  class Feature

    xStart: -1
    xEnd: -1
    height: -1
    text: ""
    fillColor: "red"
    fillOpacity: 0.5
    type: "rectangle"
    borderSize: 1
    borderColor: "black"
    borderOpacity: 0.5

    constructor: (@xStart, @xEnd, @text, @fillColor) ->
