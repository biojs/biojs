Utils = require "../utils/general"
stage = require "../stage/index"

module.exports =

  class DomStage extends stage.stage

    constructor: (@msa) ->
      @elements = []
      @_createElements()

    _createElements: ->
      @elements = []
      if @msa.config.visibleElements.labels
        @elements.push new stage.labelElement @msa

      if @msa.config.visibleElements.seqs
        @elements.push new stage.seqElement @msa

      if @msa.config.visibleElements.features
        @elements.push new stage.featureElement @msa

    _createContainer: ->
      # TODO: remove old canvas
      @canvas = document.createElement "div"
      @canvas.setAttribute "id","#{@globalID}_canvas"
      @canvas.setAttribute "class", "biojs_msa_stage"

    reset: ->
      Utils.removeAllChilds @canvas
      @_createElements()

    drawSeq: (row) ->
      layer = document.createElement "div"

      for el in @elements
        layer.appendChild el.create row

      layer.className = "biojs_msa_layer"
      #layer.style.height = "#{@msa.zoomer.columnHeight}px"

      row.layer = layer

    draw: ->
      # check whether we need to reload the stage
      if @canvas?.childNodes.length > 0
        @recolorStage()
      else
        @_createContainer()
        start = new Date().getTime()
        @drawSeqs()
        end = new Date().getTime()
        console.log "Stage draw time: #{(end - start)} ms"

        orderList = @msa.ordering.getSeqOrder @msa.seqs

        unless orderList?
          console.log "empty seq stage"
          return

        # consistency check
        if orderList.length != Object.size @msa.seqs
          console.log "Length of the input array "+ orderList.length +
            " does not match with the real world " + Object.size @msa.seqs
          return

        # prepare stage
        frag = document.createDocumentFragment()
        for i in[0..orderList.length - 1] by 1
          id = orderList[i]
          @msa.seqs[id].layer.style.paddingTop = "#{@msa.zoomer.columnSpacing}px"
          frag.appendChild @msa.seqs[id].layer

        @canvas.appendChild frag

      return @canvas

    # recolors all subchilds stage
    recolorStage: =>
      @msa.selmanager.cleanup()

      textVisibilityChanged = false
      if @internalTextDisplay isnt @msa.zoomer.isTextVisible()
        textVisibilityChanged = true
        @internalTextDisplay = @msa.zoomer.isTextVisible()

      # all columns
      for key,curRow of @msa.seqs
        currentLayer = curRow.layer
        # TODO: redundant
        #currentLayer.style.height = "#{@msa.zoomer.columnHeight}px"

        for i in [0..@elements.length - 1] by 1
          if currentLayer.childNodes[i]?
            @elements[i].redraw currentLayer.childNodes[i], curRow, textVisibilityChanged
          else
            console.log "a plugin wasn't loaded yet."
