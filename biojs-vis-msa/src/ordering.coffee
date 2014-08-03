module.exports =
  class Ordering

    constructor: ->
      @type = "numeric"

    # TODO: do some error checking?
    setType: (type) ->
      @type = type
      return

    # using last known ordering type
    getSeqOrder: (seqs) =>
      Ordering.orderSeqsAfterScheme seqs, @type

    setOrdering: (seqOrdering) ->
      @type = "own"
      @seqOrdering = seqOrdering

    #
    # * uses a predefined schema to order sequences
    # * e.g. alphabatic or numeric
    #
    @orderSeqsAfterScheme = (seqs, type) ->
      ordering = []
      if type is "numeric"
        for seq of seqs
          ordering.push seqs[seq].tSeq.id
      else if type is "reverse-numeric"
        for seq of seqs
          ordering.unshift seqs[seq].tSeq.id
      else if type is "alphabetic"
        tuples = Ordering.sortSeqArrayAlphabetically(seqs)
        i = 0

        while i < tuples.length
          ordering.push tuples[i][0]
          i++
      else if type is "reverse-alphabetic"
        tuples = Ordering.sortSeqArrayAlphabetically(seqs)
        i = 0

        while i < tuples.length
          ordering.unshift tuples[i][0]
          i++
      else if type is "own"
        ordering = @seqOrdering
      if ordering.length is 0
        console.log "invalid type selected"
      else
        ordering

    @sortSeqArrayAlphabetically = (seqs) ->
      tuples = []
      for key of seqs
        tuples.push key

      tuples.sort (a, b) ->
        nameA = a[1]
        nameB = b[1]
        if nameA < nameB
          -1
        else if nameA > nameB
          1
        else
          0
      tuples
