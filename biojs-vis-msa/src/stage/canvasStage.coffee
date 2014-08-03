Utils = require "../utils/general"
stage = require "../stage/index"

module.exports =
  class CanvasStage extends stage.stage

    constructor: (@msa) ->
      @msa.zoomer.setZoomLevel 1

    width: ->
      0

    draw: ->


      #if @canvas?
      if false
        console.log "canvas is there"
      else
        @_createCanvas()
        #@drawSeqs()
        #return @canvasWrapper
        colors = {}
        CanvasStage.taylorColors.undef = "444444"

        keys = CanvasStage.taylorColors

        start = new Date().getTime()

        for key of CanvasStage.taylorColors
          colors[key] = []

        pos = 0
        seqs = @msa.seqs.slice 0,1999
        console.log seqs[0].tSeq.name

        for key,value of seqs
          seq = value.tSeq.seq

          pre = "?"
          width = 1

          for index in [0..seq.length - 1] by 1
            el = seq[index]

            if pre is el
              width += 1
              #console.log el
            else
              # update previous
              colorArr = colors[pre]

              # this is the fastest lookup operation to search for an element in a
              # array
              if colorArr is undefined
                pre = "?"

              unless pre is "?"
                colorArr.push [pos,index - width,width]
                #console.log width

              pre = el
              width = 1

          pos = pos + 1

        console.log "Calc rects: #{(new Date().getTime() - start)} ms"
        start = new Date().getTime()


        height = @msa.zoomer.columnHeight
        width = @msa.zoomer.columnWidth

        #height = 1
        #width = 1

        for residue,color of CanvasStage.taylorColors
          @ctx.fillStyle = "#" + color
          for singleColor in colors[residue]
            if singleColor?
              @ctx.fillRect singleColor[1] * width,singleColor[0] * height,singleColor[2] * width,height

        console.log "Draw rects: #{(new Date().getTime() - start)} ms"


      return @canvasWrapper

    drawSeq: (row) ->
      tSeq = row.tSeq.seq
      @pos += 2
      @ctx.fillStyle = "#ff0000"
      for index in [0..tSeq.length - 1] by 1
        @ctx.fillStyle = "#" + CanvasStage.taylorColors[tSeq[index]]
        @ctx.fillRect index,@pos,1,1

    _createCanvas: ->
      @canvas = document.createElement "canvas"
      @canvas.width = @msa.zoomer.getMaxLength()
      @canvas.height = @msa.seqs.length
      @canvas.height = 1000
      @ctx = @canvas.getContext "2d"
      @canvas.setAttribute "id","#{@globalID}_canvas"

      @canvasWrapper = document.createElement "div"
      @canvasWrapper.appendChild @canvas
      @canvasWrapper.style.overflow = "scroll"
      @canvasWrapper.style.height = "500px"

    @taylorColors = {
      V: "99ff00"
      I: "66ff00"
      L: "33ff00"
      F: "00ff66"
      Y: "00ffcc"
      W: "00ccff"
      H: "0066ff"
      R: "0000ff"
      K: "6600ff"
      N: "cc00ff"
      Q: "ff00cc"
      E: "ff0066"
      D: "ff0000"
      S: "ff3300"
      T: "ff6600"
      G: "ff9900"
      P: "ffcc00"
      C: "ffff00"
    }
