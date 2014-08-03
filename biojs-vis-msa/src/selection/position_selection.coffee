Selection = require "./selection"

module.exports =
  class PositionSelection extends Selection

    constructor: (@msa, @id, @column) ->
      if not @id? or not @column?
        throw new Error "invalid selection coordinates"

    getId: ->
      return "x#{@id}y#{@column}"

    select: =>
      tSeq = @msa.seqs[@id].tSeq

      # color the selected residue
      if @msa.seqs[@id].layer.children[1]?
        singleResidue = @msa.seqs[@id].layer.children[1].children[@column]
      else
        singleResidue = @msa.seqs[@id].layer.children[0].children[@column]
      @msa.colorscheme.colorSelectedResidueSingle singleResidue,tSeq,@column

    deselect: =>
      posY = @msa.seqs[@id]
      if posY.layer.childNodes[1]?
        singlePos = posY.layer.childNodes[1].childNodes[@column]
      else
        singlePos = posY.layer.childNodes[0].childNodes[@column]
      tSeq = posY.tSeq
      @msa.colorscheme.colorResidue singlePos,tSeq,@column
