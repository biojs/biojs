Utils = require "../utils/general"
selection = require "../selection/index"
StageElement = require "./StageElement"

module.exports =
  class LabelElement extends StageElement

    constructor: (@msa) ->
      undefined

    width: (n) ->
      return @msa.zoomer.seqOffset

    _setLabelPosition: (label,tSeq) ->
      label.style.width = "#{@msa.zoomer.seqOffset}px"
      label.style.height = "#{@msa.zoomer.columnHeight}px"
      label.style.fontSize = "#{@msa.zoomer.labelFontsize}px"
      if @msa.zoomer.isTextVisible()
        label.textContent = tSeq.name
      else
        label.textContent = ""

      if tSeq.special? is true
        label.className += " biojs_msa_labels-special"

      @msa.colorscheme.colorLabel label,tSeq

    redraw: (el,row,textVisibilityChanged) ->
      @_setLabelPosition el,row.tSeq

    create: (row) ->
      tSeq = row.tSeq

      labelGroup = document.createElement("span")
      labelGroup.seqid = tSeq.id
      labelGroup.className = "biojs_msa_labels"

      @_setLabelPosition labelGroup,tSeq

      labelGroup.addEventListener "click", ((evt) =>
        id = evt.target.seqid
        @msa.selmanager.handleSel new selection.HorizontalSelection(@msa, id), evt
        return
      ), false

      if @msa.config.registerMoveOvers
        labelGroup.addEventListener "mouseover", ((evt) =>
          id = evt.target.seqid
          @msa.selmanager.changeSel new selection.HorizontalSelection(@msa, id)
          return
        ), false

      labelGroup
