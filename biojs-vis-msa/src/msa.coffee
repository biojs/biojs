Colorator = require "./colorator"
Ordering = require "./ordering"
Utils = require "./utils/general"
Eventhandler = require "./eventhandler"
selection = require "./selection/index"
Zoomer = require "./zoomer"
SeqMgr = require "./seqmgr"
Logger = require "./logger"
DomStage = require "./stage/domStage"
CanvasStage = require "./stage/canvasStage"
TilesStage = require "./stage/tileStage"
SeqMarker= require "./seqmarker"
arrays = require "./utils/arrays"

module.exports =
  class MSA

    constructor: (divName, seqsInit, conf) ->

      @_loadDefaultConfig(conf)
      if typeof divName is "string"
        @container = document.getElementById divName
      else
        @container = divName

      @container.className = "" unless @container.className?
      @container.className += " biojs_msa_div"

      @colorscheme = new Colorator()
      @ordering = new Ordering()

      @log = new Logger()
      @events = new Eventhandler @log.log
      @selmanager = new selection.SelectionManager this, @events

      @zoomer = new Zoomer(this)

      @seqs = []
      @seqmgr = new SeqMgr(this)

      @plugs = {}
      @plugsDOM = {}

      # plugins
      if @config.visibleElements.ruler
        @marker = new SeqMarker this
        @plugs["marker"] = @marker

      # essential stage
      if @config.speed
        #@stage =  new CanvasStage this
        @stage =  new TilesStage this
      else
        @stage =  new DomStage this
      @plugs["stage"] = @stage

      @addSeqs seqsInit if seqsInit?

      if @config.allowRectSelect
        @plugs["rect_select"] = new selection.RectangularSelect this

      # post hooks
      if @config.registerMoveOvers
        @container.addEventListener 'mouseout', =>
          @selmanager.cleanup()

      @container.addEventListener 'dblclick', =>
        @selmanager.cleanup()

    addSeqs: (tSeq) ->
      @stage.addSeqs tSeq
      # TODO: do we want to draw the entire MSA not only the stage)
      @_draw()

    # TODO: use a user ordering
    addPlugin: (plugin, key) ->
      @plugs[key] = plugin
      @_draw()

    _draw: ->

      @_nMax = @zoomer.getMaxLength @seqs

      #@zoomer.autofit() if @config.autofit

      frag = document.createDocumentFragment()

      # sort plugs
      plugsSort = []
      plugsSort.push key for key of @plugs
      plugsSort.sort()

      # load plugins
      for key in plugsSort
        entry = @plugs[key]

        start = new Date().getTime()
        node = entry.draw()
        end = new Date().getTime()
        console.log "Plugin[#{key}] drawing time: #{(end - start)} ms"

        if node
          frag.appendChild node
          @plugsDOM[key] = node

      # replace the current container with the new
      Utils.removeAllChilds @container
      @container.appendChild frag

    redraw: (plugin) ->
      newDOM = @plugs[plugin].draw()

      plugDOM= @plugsDOM[plugin]
      # better use container than parentNode
      plugDOM.parentNode.replaceChild newDOM, plugDOM

      @plugsDOM[plugin] = newDOM


    redrawContainer: ->
      @plugs['stage'].reset()
      @_resetContainer()
      @_draw()

    # TODO: do we create memory leaks here?
    _resetContainer: ->
      Utils.removeAllChilds @container

    _loadDefaultConfig: (conf) ->

      @config = conf

      defaultConf = {
        visibleElements: {
          labels: true, seqs: true, menubar: true, ruler: true,
          features: false,
          allowRectSelect: false,
          speed: false,
        },
        registerMoveOvers: false,
        autofit: true,
        keyevents: false,
        prerender: false,
      }

      if @config?
        arrays.recursiveDictFiller defaultConf, @config
      else
        @config = defaultConf

