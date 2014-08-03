module.exports =
  class RegionSelect

    constructor: (@msa, @_y, @_column, @_width, @_height) ->
      if not @_y? or not @_column?
        throw new Error "invalid selection coordinates"

    getId: ->
      return "x{@_id}y{@_column}w{@_width}h{@_height}"

    select: =>
      @_selectResidues @msa.colorscheme.colorSelectedResidueSingle

    deselect: =>
      @_selectResidues @msa.colorscheme.colorResidue

    _selectResidues: (colorCall) ->
      # loop over sequences
      for row in [x .. x + @_height]
        # loop over residues
        curSeq = @msa.seqs[@_id]
        for col in [@_column .. @_column + @_width]

          singleResidue = curSeq.layer.children[1].children[@_column]
          @msa.colorscheme.colorResidue singleResidue,curSeq.tSeq,col
          console.log singleResidue
