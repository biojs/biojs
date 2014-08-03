Utils = require "../utils/general"
Row = require "../row"

module.exports =
  class Stage

    _init: ->
      @ID =  String.fromCharCode(65 + Math.floor(Math.random() * 26))
      @globalID = 'biojs_msa_' + @ID

    width: (n) ->
      width = 0
      width += el.width n for el in @elements
      return width


    addSeqs: (tSeqs) ->
      @msa.zoomer.autofit tSeqs if @msa.config.autofit
      # check whether array or single seq
      unless tSeqs.id?
        start = new Date().getTime()
        @addSeq e for e in tSeqs
        end = new Date().getTime()
        console.log "Adding seq time: #{(end - start)} ms"
      else
        @addSeq tSeqs

    addSeq: (tSeq) ->
      @msa.seqs[tSeq.id] = new Row tSeq, undefined

    removeSeq: (id) ->
      @msa.seqs[id].layer.destroy()
      delete seqs[id]
      # reorder
      @orderSeqsAfterScheme()
      # TODO: maybe redraw ?

    # execute the action for each single seq
    drawSeqs: ->
      for key,value of @msa.seqs
        @drawSeq value
