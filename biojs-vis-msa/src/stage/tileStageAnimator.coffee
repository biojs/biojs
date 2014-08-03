module.exports =

  class TileStageAnimator

    @constructor: (@tiler) ->
      @timestamp = 0

    animate: (timestamp) =>
      console.log "time:" + (timestamp - @timestamp)

      @timestamp = timestamp
      if @tiler.viewportX < 150 or not @vx?
        @vx = 1
      if @tiler.viewportX > 200
        @vx = -1

      if @tiler.msa.zoomer.columnWidth < 2
        @vH = 1

      if not @vH?
        @vH = 1
        @tiler.msa.zoomer.columnWidth = 1
        @tiler.msa.zoomer.columnHeight = 1

      if @tiler.msa.zoomer.columnWidth > 10
        @vH = -1

      @vx = 0
      #@vH = 0

      @tiler.msa.zoomer.columnWidth += @vH
      @tiler.msa.zoomer.columnHeight += @vH

      console.log "columnwidth: " + @msa.zoomer.columnWidth

      @tiler.viewportX += @vx
      @tiler.viewportY += @vx
      #window.requestAnimationFrame @animate
      window.setTimeout @animate, 200
      @tiler.draw()


