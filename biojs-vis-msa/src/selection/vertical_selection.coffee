Selection = require "./selection"

module.exports =
  class VerticalSelection extends Selection

    constructor: (@msa, @column, @_labelColumn) ->
      if not @_labelColumn?
        @_labelColumn = @column

    getId: ->
      "v" + @column

    select: ->
      @_selectLabel @msa.colorscheme.colorSelectedColumn
      @_selectResidues @msa.colorscheme.colorSelectedResidueColumn

    deselect: ->
      @_selectLabel @msa.colorscheme.colorColumn
      @_selectResidues @msa.colorscheme.colorResidue

    _selectLabel: (colorCall) ->
      if @msa.marker._seqMarkerLayer?.childNodes[@_labelColumn]?
        columnGroup = @msa.marker._seqMarkerLayer.childNodes[@_labelColumn]
        colorCall columnGroup, @_labelColumn
      else
        console.log "warning."

    _selectResidues: (colorCall) ->
      for key,seq of @msa.seqs
        singlePos = seq.layer.children[1].childNodes[@column]
        colorCall singlePos,
          seq.tSeq,singlePos.rowPos
