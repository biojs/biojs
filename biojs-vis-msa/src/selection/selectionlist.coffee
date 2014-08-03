module.exports =
  class SelectionList

    isList: true

    constructor: ->
      @_sels =  {}

    addSelection: (sel) ->
      eId = sel.getId()
      if @_sels[eId]?
        # duplicate selection, remove from selection
        sel.deselect()
        delete @_sels[eId]
      else
        @_sels[eId] = sel
        sel.select()

    select: ->
      undefined

    deselect: ->
      for key, value of @_sels
        value.deselect()
