module.exports =
  class RectangularSelect

    constructor: (@msa) ->
      @x1 = @y1 = @x2 = @y2 = 0
      @container = @createElement()

    createElement: ->
      @rectangularSelect = document.createElement "div"
      @rectangularSelect.className = "biojs-rectangular-select"
      @rectangularSelect.hidden = 1

      # TODO: maybe a better approach here
      @msa.container.addEventListener 'mousemove',@onMouseMove
      @msa.container.addEventListener 'mousedown',@onMouseDown
      @msa.container.addEventListener 'mouseup',@onMouseUp

      return @rectangularSelect

    # always returns the same element
    draw: ->
      @container

    calcRectangle: ->
      x3 = Math.min @x1,@x2
      x4 = Math.max @x1,@x2
      y3 = Math.min @y1,@y2
      y4 = Math.max @y1,@y2
      @rectangularSelect.style.left = x3 + 'px'
      @rectangularSelect.style.top = y3 + 'px'
      @rectangularSelect.style.width = x4 - x3 + 'px'
      @rectangularSelect.style.height = y4 - y3 + 'px'

    calcMatches: =>
      bodyRect = document.body.getBoundingClientRect()
      elemRect = @msa.container.getBoundingClientRect()
      offsetY   = elemRect.top - bodyRect.top
      offsetX   = elemRect.left - bodyRect.left

      width = elemRect.right - elemRect.left
      height = elemRect.bottom - elemRect.top

      console.log "offsetX:"+ offsetX + ", offsetY:" + offsetY

      x3 = Math.min @x1,@x2
      x4 = Math.max @x1,@x2
      y3 = Math.min @y1,@y2
      y4 = Math.max @y1,@y2

      console.log "x1:"+ x3 + ", y1:" + y3
      console.log "x2:"+ x4 + ", y2:" + y4

      y3 -= offsetY
      y4 -= offsetY
      x3 -= offsetX
      x4 -= offsetX

      console.log "x1:"+ x3 + ", y1:" + y3
      console.log "x2:"+ x4 + ", y2:" + y4

      if x3 < 0 or y3 < 0
        return

      if x4 > width or x3 > width or y3 > height or y4 > height
        return

      console.log "valid selection"
      x3 -= @msa.seqOffset
      x4 -= @msa.seqOffset

      p1x = x3 / @msa.columnWidth
      p2x = x4 / @msa.columnWidth

      colHeight = @msa.columnHeight + @msa.columSpacing
      p1y = y3 / colHeight
      p2y = y4 / colHeight

      console.log "px1:"+ p1x + ", py1:" + p1y
      console.log "px2:"+ p2x + ", py2:" + p2y



    onMouseDown: (e) =>
      @rectangularSelect.hidden = 0
      @x1 = e.pageX
      @y1 = e.pageY
      @calcRectangle()
      e.preventDefault()

    onMouseMove: (e) =>
      @x2 = e.pageX
      @y2 = e.pageY
      @calcRectangle()
      e.preventDefault()

    onMouseUp: () =>
      console.log "out"
      @calcMatches()
      @rectangularSelect.hidden = 1
