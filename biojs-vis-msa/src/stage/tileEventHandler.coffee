module.exports =

  class TileEventHandler

    constructor: (@tiler) ->


    init: ->
      # all events
      @tiler.canvas.addEventListener "mousemove", (e) =>
        @_onMouseMove e

      @tiler.canvas.addEventListener "dblclick", (e) =>
        @_onDblClick e

      @tiler.canvas.addEventListener "contextmenu", (e) =>
        @_onContextMenu e

      @tiler.canvas.addEventListener "mousedown", (e) =>
        @_onMouseDown e

      @tiler.canvas.addEventListener "mouseup", (e) =>
        @_onMouseUp e

      @tiler.canvas.addEventListener "mouseout", (e) =>
        @_onMouseOut e

      if @tiler.msa.config.keyevents
        document.addEventListener "keydown", (e) =>
          @_onKeyDown e


    _onMouseMove: (e) ->
      if @dragStartX? and @draglock?
        @moveCanvasDragEvent e

    _onMouseUp: (e) ->
      if @dragStartX? and @draglock?
        @moveCanvasDragEvent e

      @draglock = undefined

    _onMouseOut: (e) ->
      @draglock = undefined

    _onMouseDown: (e) =>
      [mouseX,mouseY]= @getMouseCoords e

      unless @tiler.control.checkForEvents mouseX,mouseY
        @pauseEvent e
        @dragStartX = e.pageX
        @dragStartY = e.pageY
        @dragViewStartX = @tiler.viewportX
        @dragViewStartY = @tiler.viewportY
        @draglock = true

    _onContextMenu: (e) =>
      #TODO: only on dblclick
      @tiler.zoomCanvas 1 / @tiler.dblClickVx, 1 / @tiler.dblClickVy
      @tiler.refreshZoom()
      @tiler.draw()

    # TODO: move to utils
    getMouseCoords: (e) ->
      # center the view on double click
      mouseX = e.offsetX
      mouseY = e.offsetY

      unless mouseX?
        mouseX = e.layerX
        mouseY = e.layerY

      unless mouseX?
        mouseX = e.pageX
        mouseY = e.pageY

      unless mouseX?
        console.log e
        console.log "no mouse event defined. your browser sucks"
        return

      # TODO: else
      return [mouseX,mouseY]

    _onDblClick: (e) ->
      #if not @rect? or @rect?.left is 0
      #  @rect = @canvas.getBoundingClientRect()
      @draglock = undefined

      [mouseX,mouseY]= @getMouseCoords e

      @tiler.moveCenterTo mouseX,mouseY
      console.log "#EVENT viewix:" + @tiler.viewportX + ",y:" + @tiler.viewportY
      @tiler.zoomCanvas @tiler.dblClickVx,@tiler.dblClickVy
      @tiler.draw()

      console.log "#mouse:" + mouseX + ",y:" + mouseY

    _onKeyDown: (e) ->
      key = e.keyCode
      dist = 100

      switch key
        when 37, 72
          # left, h
          @tiler.moveView -dist,0
        when 38, 75
          # up,k
          @tiler.moveView 0, -dist
        when 39, 76
          # right, l
          @tiler.moveView  +dist,0
        when 40, 74
          # down, j
          @tiler.moveView 0,dist
        when 33
          #pgdown
          @tiler.moveView 0,-@tiler.canvas.height
        when 34
          #pgup
          @tiler.moveView 0,+@tiler.canvas.height
        when 107
          # add
          @tiler.zoomCanvas 2,2
        when 109
          # substract
          @tiler.zoomCanvas 0.5,0.5

      @pauseEvent e
      @tiler.checkPos()
      @tiler.draw()


    moveCanvasDragEvent: (e) ->
      distX = e.pageX - @dragStartX
      distY = e.pageY - @dragStartY

      @tiler.viewportX = @dragViewStartX - distX
      @tiler.viewportY = @dragViewStartY - distY

      @tiler.checkPos()
      @tiler.draw()
      @pauseEvent e

    # TODO: move to utils
    pauseEvent: (e) ->
      e= window.event if not e?
      if e.stopPropagation
        e.stopPropagation()
      if e.preventDefault
        e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      return false


