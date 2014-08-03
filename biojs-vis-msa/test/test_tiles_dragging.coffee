define ["cs!input/fasta", "cs!msa/msa"], (Fasta, MSA) ->

  stage = null
  evtHdlr = null

  module "tiles.dragging",
    setup: ->
      stop()
      Fasta.read "../dummy/foo.fasta", (seqs) ->
        msa = new MSA "msa", seqs, {speed: true}
        stage = msa.stage
        evtHdlr = stage.evtHdlr
        stage.tileSize = 200
        stage.viewportX = 100
        start()

  test "test right", ->
    evtHdlr._onMouseDown {pageX: 0, pageY: 0 }
    evtHdlr._onMouseUp {pageX: 20, pageY: 0 }

    equal stage.viewportX, 80, "toRightDrag"

  test "test left", ->
    evtHdlr._onMouseDown {pageX: 0, pageY: 0 }
    evtHdlr._onMouseUp {pageX: -20, pageY: 0 }

    equal stage.viewportX, 120, "toRightDrag"
