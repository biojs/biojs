module.exports =
  class EventHandler
    constructor: (@log) ->
      @subscribers = []

    notifyNewItemReleased: (item) ->
      subscriber.callback(item) for subscriber in @subscribers when subscriber.item is item

    subscribe: (to, onNewItemReleased) ->
      @subscribers.push {'item': to, 'callback': onNewItemReleased}

    # TODO: apply observer pattern and deprecate all callbacks

    onSelectionChanged: (sel) ->
      name = sel.__proto__.constructor.name if sel?
      if sel?
        @log "column was clicked at #{sel.column}" if name is "VerticalSelection"
        @log "row was clicked at #{sel.id}" if name is "HorizontalSelection"
        @log "seq #{sel.id} was clicked at #{sel.column}" if name is "PositionSelection"
        @log "multiple selections available" if name is "SelectionList"
      else
        @log "empty selection"

    onAnnotationClicked: ->
      @log "not implemented yet"

    onRegionSelected: ->
      @log "not implemented yet"

    onZoom: ->
      @log "not implemented yet"

    onScroll: ->
      @log "not implemented yet"

    onColorSchemeChanged: ->
      @log "not implemented yet"

    onDisplayEventChanged: ->
      @log "not implemented yet"
