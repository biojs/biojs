SelectionList = require "./selectionlist"

module.exports =
  class SelectionManager

    constructor: (@msa, @eventhandler) ->

    changeSel: (sel) ->
      # remove old
      @currentSelection.deselect() if @currentSelection?

      # apply now
      @currentSelection = sel
      sel.select() if sel?

      # broadcast to event handler
      @eventhandler.onSelectionChanged(sel)

    # detects shiftKey
    handleSel: (sel, evt) ->
      if evt.ctrlKey or evt.metaKey
        # check whether we already have a list
        if @currentSelection?.isList?
          selList = @currentSelection
          @currentSelection = undefined
        else
          # create new list
          selList = new SelectionList()

        # add
        selList.addSelection sel
        sel = selList

      @changeSel sel

    cleanup: ->
      @changeSel(undefined)

    # TODO: split int two methods
    getInvolvedSeqs: ->
      if @currentSelection?
        name = @currentSelection.__proto__.constructor.name
        return @msa.seqs if name is "VerticalSelection"
        return [@msa.seqs[@currentSelection.id]] if name is "HorizontalSelection" or name is
        "PositionSelection"

        if name is "SelectionList"
          seqs = []
          for key,sel of @currentSelection._sels
            name = sel.__proto__.constructor.name
            if name is "HorizontalSelection" or name is "PositionSelection"
              seqs.push @msa.seqs[sel.id]
          return seqs
      else
        console.log "no involved seqs"
        return undefined

