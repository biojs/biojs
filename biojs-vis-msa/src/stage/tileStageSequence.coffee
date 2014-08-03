CanvasStage = require "./canvasStage"

module.exports =

  class TileStageSequence

    constructor: (@tiler) ->

    drawTile: (i,j) ->

      height = @tiler.msa.zoomer.columnHeight
      width = @tiler.msa.zoomer.columnWidth

      # check 3-D map for dimension and each tile
      @tiler.map[height] = [] unless @tiler.map[height]?
      @tiler.map[height][i] = [] unless @tiler.map[height][i]?

      tileX = i * @tiler.tileSize
      tileY = j * @tiler.tileSize

      cx = @tiler.ctxTile

      if @tiler.maxWidth > tileX and @tiler.maxHeight > tileY and tileX >= 0 and tileY >= 0
        # valid tile

        # calc position of seqs
        seqStartX = Math.floor(tileX / width )
        seqEndX = seqStartX + Math.ceil(@tiler.tileSize  / width )

        seqStartY = Math.floor(tileY / height)
        seqEndY = seqStartY + Math.ceil(@tiler.tileSize  / height)

        # no overflow
        seqEndX = @tiler.maxLength if @tiler.maxLength > seqEndX
        seqEndY = @tiler.msa.seqs.length if seqEndY > @tiler.msa.seqs.length

        # background bg for non-drawed area
        cx.fillStyle = "#eeeeee"
        cx.fillRect 0,0,@tiler.tileSize,@tiler.tileSize

        pos = 0
        for seqNr in [seqStartY..seqEndY- 1] by 1
          id = @tiler.orderList[seqNr]
          seq = @tiler.msa.seqs[id].tSeq.seq
          for index in [seqStartX..seqEndX - 1] by 1
            color = CanvasStage.taylorColors[seq[index]]
            if color is undefined
              color = "111111"
              continue
            cx.fillStyle = "#" + color
            cx.fillRect((index - seqStartX) * width,pos,width,height)

          pos += height
      else
        cx.fillStyle = "grey"
        cx.fillRect 0,0,@tiler.tileSize,@tiler.tileSize

      @_drawDebugInfo cx,i,j if @tiler.debug

      # save tile
      tile = cx.getImageData 0,0,@tiler.tileSize,@tiler.tileSize
      @tiler.map[height][i][j] = tile

      # reset
      cx.clearRect(0, 0, @tiler.canvasTile.width, @tiler.canvasTile.height)
      return tile

    _drawDebugInfo: (cx,i,j) ->
      cx.rect 0,0,@tiler.tileSize,@tiler.tileSize
      cx.stroke()
      cx.font = "30px Georgia"
      cx.fillStyle = "#000000"
      cx.fillText "#{j},#{i}",20,50
      endPos = Math.floor @tiler.tileSize * 3 / 4
      cx.fillText "#{j},#{i}",20,endPos
      cx.fillText "#{j},#{i}",endPos,50
      cx.fillText "#{j},#{i}",endPos,endPos
