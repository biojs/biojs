Utils = require "./utils/general"

module.exports =
  class Colorator

    scheme: "taylor"

    constructor: () ->

    setScheme: (name) ->
      @scheme = name
      @scheme = name.toLowerCase()

    colorResidue: (aminoGroup, tSeq, pos) =>

      aminoGroup.className = "biojs_msa_single_residue"

      residue = Colorator.getResidue tSeq,pos
      aminoGroup.className += " biojs-msa-aa-" + residue

    colorSelectedResidue: (aminoGroup, tSeq, pos) =>

      aminoGroup.className = "biojs_msa_single_residue"
      residue = Colorator.getResidue tSeq,pos
      aminoGroup.className += " biojs-msa-aa-" + residue + "-selected"

    colorSelectedResidueColumn: (aminoGroup, tSeq, pos) =>
      aminoGroup.className = "biojs_msa_single_residue"
      residue = Colorator.getResidue tSeq,pos
      aminoGroup.className += " biojs-msa-aa-" + residue + "-selected"


    colorSelectedResidueSingle : (aminoGroup, tSeq, pos) ->
      aminoGroup.className = "biojs_msa_single_residue"
      residue = Colorator.getResidue tSeq,pos
      aminoGroup.className += " biojs-msa-aa-" + residue + "-selected"
      aminoGroup.className += " shadowed"

    colorColumn: (columnGroup, columnPos) ->
      columnGroup.style.backgroundColor = "transparent"
      columnGroup.style.color = ""

    colorSelectedColumn: (columnGroup, columnPos) ->
      columnGroup.style.backgroundColor =
        Utils.rgba(Utils.hex2rgb("ff0000"),1.0)
      columnGroup.style.color = "white"

    colorRow: (rowGroup, rowId) ->
      rowGroup.className = "biojs_msa_sequence_block"
      rowGroup.className += " biojs-msa-schemes-" + @scheme

    colorLabel: (labelGroup, tSeq) ->
      if not labelGroup.color?
        color = {}
        color.r = Math.ceil(Math.random() * 255)
        color.g = Math.ceil(Math.random() * 255)
        color.b = Math.ceil(Math.random() * 255)
        labelGroup.color = color
      labelGroup.color = Utils.hex2rgb "ffffff"
      labelGroup.style.backgroundColor = Utils.rgba(labelGroup.color, 0.5)

    colorSelectedLabel: (labelGroup, tSeq) ->
      rect = labelGroup.children[0]
      label = labelGroup.children[1]
      labelGroup.style.textColor = "white"
      labelGroup.color = Utils.hex2rgb "ff0000"
      labelGroup.style.backgroundColor = Utils.rgba(labelGroup.color, 1.0)

    @getResidue: (tSeq,pos) ->
      residue = tSeq.seq.charAt(pos)
      if residue is "-"
        "Gap"
      else
        residue
