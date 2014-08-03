define ["cs!input/fasta", "cs!msa/msa"], (Fasta, MSA) ->

  stage = null

  xStart = 100
  yStart = 0

  module "tiles.zooming",
    setup: ->
      stop()
      Fasta.read "../dummy/foo.fasta", (seqs) ->
        msa = new MSA "msa", seqs, {speed: true}
        stage = msa.stage
        stage.tileSize = 200
        stage.viewportX = xStart
        stage.viewportY = yStart
        stage.canvas.width = 500
        stage.canvas.height = 500
        stage.dblClickVx = 2
        stage.dblClickVy = 2
        start()

  test "zoom in middle", ->
    stage.evtHdlr._onDblClick {offsetX: stage.canvas.width / 2, offsetY: stage.canvas.height / 2}
    equal stage.viewportX + stage.canvas.width / 2, (xStart + stage.canvas.width / 2 ) * 2 , "xView"
    equal stage.viewportY, stage._checkPos(0,100)[1], "yView"

  test "zoom in and out", ->
    stage.evtHdlr._onDblClick {offsetX: stage.canvas.width / 2, offsetY: stage.canvas.height / 2}
    stage.evtHdlr._onContextMenu {offsetX: stage.canvas.width / 2, offsetY: stage.canvas.height / 2}
    equal stage.viewportX, xStart, "xView"
    equal stage.viewportY, yStart, "yView"

  test "zoom in right", ->
    stage.evtHdlr._onDblClick {offsetX: stage.canvas.width, offsetY: stage.canvas.height}
    equal stage.viewportX + stage.canvas.width / 2, (xStart + stage.canvas.width ) * 2, "xView"
    equal stage.viewportY, (13) * 2, "yView"
