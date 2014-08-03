Utils = require "../utils/general"
selection = require "../selection/index"
StageElement = require "./StageElement"

module.exports =

  class SeqElement extends StageElement

    constructor: (@msa) ->
      undefined

    width: (n) ->
      return n * @msa.zoomer.columnWidth

    setResiduePosition: (residue,tSeq) ->

      # pseudo semantic zooming
      if @msa.zoomer.isTextVisible()
        residue.textContent = tSeq.seq[residue.rowPos]
      else
        residue.textContent = ""

      #@msa.colorscheme.colorResidue residue,tSeq, residue.rowPos

    redraw: (el,row,textVisibilityChanged) ->
      tSeq = row.tSeq
      @redrawDiv el, tSeq

      if textVisibilityChanged
        childs = el.childNodes
        for i in [0..childs.length - 1] by 1
          @setResiduePosition childs[i],tSeq

    redrawDiv: (row,tSeq) ->
      row.style.fontSize = "#{@msa.zoomer.residueFontsize}px"
      @msa.colorscheme.colorRow row, tSeq.id
      row.className += " biojs-msa-stage-level" + @msa.zoomer.level

    create: (row) ->
      tSeq = row.tSeq
      residueGroup = document.createDocumentFragment()
      spanGlobal = document.createElement("span")
      n = 0


      for n in [0..tSeq.seq.length - 1] by 1
        residueSpan = document.createElement("span")
        residueSpan.rowPos = n
        @setResiduePosition residueSpan,tSeq

        unless @msa.config.speed
          residueSpan.addEventListener "click", ((evt) =>
            id = evt.target.parentNode.seqid
            selPos = new selection.PositionSelect(@msa, id, evt.target.rowPos)
            @msa.selmanager.handleSel selPos, evt
          ), false

        if @msa.config.registerMoveOvers
          residueSpan.addEventListener "mouseover", ((evt) =>
            id = evt.target.parentNode.seqid
            @msa.selmanager.changeSel new selection.PositionSelect(@msa, id,
              evt.target.rowPos)
          ), false

        # color it nicely
        #unless @msa.config.speed
        @msa.colorscheme.colorResidue residueSpan, tSeq, n
        spanGlobal.appendChild residueSpan

      spanGlobal.seqid = tSeq.id

      @redrawDiv spanGlobal, tSeq
      #residueSpan.appendChild residueGroup

      return spanGlobal
