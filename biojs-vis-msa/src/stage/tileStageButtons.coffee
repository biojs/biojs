module.exports =

  class TileStageButtons

    constructor: (@tiler) ->
      @events = {}

      imgdir = "res/img/"

      @btnFullscreen = new Image()
      @btnFullscreen.src = imgdir + "fullscreen.png"
      @btnFullscreen.onload = =>
        @btnFullscreen.loaded = 1

      @btnZoomIn = new Image()
      @btnZoomIn.src = imgdir + "zoom-in.png"
      @btnZoomIn.onload = =>
        @btnZoomIn.loaded = 1

      @btnZoomOut = new Image()
      @btnZoomOut.src = imgdir + "zoom-out.png"
      @btnZoomOut.onload = =>
        @btnZoomOut.loaded = 1

    # is called on every draw, keep overhead at a minimum
    draw: (ctx) ->
      if @btnZoomIn.loaded? and @btnZoomOut.loaded?
        @drawZooming ctx
      @drawProgressButton ctx
      if @btnFullscreen.loaded?
        @drawFullscreenButton ctx

    # goes through all events all checks for callbacks
    checkForEvents: (mouseX, mouseY) ->
      for name,arr of @events

        if (arr[0] <= mouseX and mouseX <= arr[2]) and
        (arr[1] <= mouseY and mouseY <= arr[3])
          arr[4]()
      false

    setEventWidth: (name,coords,callback) ->
      @setEvent name,[coords[0],coords[1],coords[2] + coords[0], coords[3] +
      coords[1]],callback

    setEvent: (name,coords,callback) ->
      console.log "new event:" + name + ","+ coords.join(",")
      coords.push callback
      @events[name] = coords

    drawZooming: (ctx) ->
      # zoom control
      ctx.globalAlpha = 0.5

      # zoom in
      callback = =>
        @tiler.zoomCanvas @tiler.dblClickVx,@tiler.dblClickVy
        @tiler.draw()

      coordIn = [@tiler.canvas.width - 40, @tiler.canvas.height - 40,15,15]
      @setEventWidth "zoomin",coordIn,callback

      # draw zoom in
      coordIn.unshift @btnZoomIn
      ctx.drawImage.apply ctx, coordIn

      # zoom out
      callback = =>
        @tiler.zoomCanvas 1 / @tiler.dblClickVx,1 / @tiler.dblClickVy
        @tiler.draw()
      coordOut = [@tiler.canvas.width - 40, @tiler.canvas.height - 25,15,15]
      @setEventWidth "zoomout",coordOut,callback

      # draw zoom out
      coordOut.unshift @btnZoomOut
      ctx.drawImage.apply ctx, coordOut

      ctx.globalAlpha = 1

    drawProgressButton: (ctx) ->
      # current progress box
      ctx.fillStyle = "grey"
      ctx.globalAlpha = 0.7
      ratio = @tiler.maxHeight / @tiler.maxWidth
      progressWidth = 20
      progressHeight = 30
      ctx.fillRect @tiler.canvas.width - progressWidth - 50, @tiler.canvas.height - 40,progressWidth,progressHeight

      # current progress position
      pos = Math.round(@tiler.viewportY / @tiler.maxHeight * progressHeight)
      ctx.fillStyle = "red"
      ctx.fillRect @tiler.canvas.width - progressWidth - 50, @tiler.canvas.height - 40 + pos,progressWidth,1

      ctx.globalAlpha = 1

    drawFullscreenButton: (ctx) ->
      ctx.globalAlpha = 0.5

      coords = [@tiler.canvas.width - 90, @tiler.canvas.height - 40,15,15]
      @setEventWidth "fullscreen",coords,@toggleFullscreen

      # draw
      coords.unshift @btnFullscreen
      ctx.drawImage.apply ctx, coords

      ctx.globalAlpha = 1

    toggleFullscreen: =>
      if @tiler.canvasWrapper.style.overflow is "hidden"
        @leaveFullscreen()
      else
        @goFullscreen()

    leaveFullscreen: ->
      @tiler.canvas.width = 500
      @tiler.canvas.height = 500
      @tiler.canvas.style.position = "relative"
      @tiler.canvas.style.left = "0px"
      @tiler.canvas.style.top = "0px"
      @tiler.canvasWrapper.style.overflow = "auto"
      document.body.style.overflow = "auto"
      window.scrollTo 0,0
      @tiler.refreshZoom()
      @tiler.draw()

    goFullscreen: ->
      @tiler.canvas.width = window.innerWidth
      @tiler.canvas.height = window.innerHeight
      @tiler.canvas.style.position = "fixed"
      @tiler.canvas.style.left = "0px"
      @tiler.canvas.style.top = "0px"
      @tiler.canvasWrapper.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
      window.scrollTo 0,0
      @tiler.refreshZoom()
      @tiler.draw()
