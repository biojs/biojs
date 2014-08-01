module.exports =
  class Seq

    constructor: (@seq, @name, @id) ->
      meta = {}

    # Returns the reverse complement sequence.
    #reverse_complement: ->
    #  @seq.split("").reverse().join("")
