module.exports =
  class ZoomBar

    constructor: (@msa, min, max) ->
      zoomForm = document.createElement("form")
      zoomSlider = document.createElement("input")
      zoomSlider.type = "range"
      zoomSlider.name = "points"

      min = 1 unless min?
      max = Math.max 30,@msa.zoomer.level unless max?

      zoomSlider.min = min
      zoomSlider.max = max
      zoomSlider.style.width = "60%"

      zoomSlider.value = @msa.zoomer.level

      zoomForm.appendChild zoomSlider
      @locked = false

      #zoomSlider.addEventListener "change", (evt) =>
      #  @_reDraw()

      zoomSlider.addEventListener "mousedown", (evt) =>
        @firstClick = true
        @_reDraw()

      zoomSlider.addEventListener "mousemove", (evt) =>
        # only update after first click and on value change
        if @lastValue isnt @zoomSlider.value and @firstClick?
          @lastValue = @zoomSlider.value
          unless @locked
            @locked = true
            window.setTimeout @_reDraw,30

      # save for the future
      @zoomSlider = zoomSlider

    _reDraw: =>
      value = @zoomSlider.value
      @msa.zoomer.setZoomLevel(value)
      @msa.config.autofit = false
      @msa.redraw('stage')
      @msa.redraw('marker')
      @locked = false

    draw: ->
      @zoomSlider
