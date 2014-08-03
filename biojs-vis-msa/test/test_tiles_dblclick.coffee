define ["cs!input/fasta", "cs!msa/msa"], (Fasta, MSA) ->

  stage = null
  evtHdlr = null
  testRangeStart = 0
  testRangeEnd = 0
  testRangeStep = 5

  module "tiles.dblclick",
    setup: ->
      stop()
      #Fasta.read "../dummy/external/PF00072_rp15.txt", (seqs) =>
      Fasta.read "../dummy/foo.fasta", (seqs) ->
        msa = new MSA "msa", seqs, {speed: true}
        stage = msa.stage
        stage.dblClickVx = 0
        stage.dblClickVy = 0
        evtHdlr = stage.evtHdlr
        start()

  stageTest = (callback) ->
    for width in [101..300] by 167
      for height in [11..40] by 57
        stage.canvas.width = width
        stage.canvas.height = height
        stage.canvas.tileSize = Math.min( stage.canvas.width, stage.canvas.height) / 2
        callback()

  test "test double click left", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX

        # total left
        evtHdlr._onDblClick {offsetX: 0, offsetY: 0}

        valX = Math.round startX - stage.canvas.width / 2
        valY = Math.round startX - stage.canvas.height / 2
        [valX,valY] = stage._checkPos valX,valY

        equal stage.viewportX,valX, "viewportX"
        equal stage.viewportY,valY, "viewportY"

  test "test double click middle", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX

        # middle
        evtHdlr._onDblClick {offsetX: stage.canvas.width / 2, offsetY:
          stage.canvas.height / 2}
        equal stage.viewportX, startX, "viewportX"
        equal stage.viewportY, startX, "viewportY"

  test "test double click right", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX
        # right
        evtHdlr._onDblClick {offsetX: stage.canvas.width, offsetY: stage.canvas.height}

        valX = Math.round( startX + stage.canvas.width / 2 )
        valY = Math.round( startX + stage.canvas.height / 2 )
        [valX,valY] = stage._checkPos valX,valY

        equal stage.viewportY, valY, "viewportY"
        equal stage.viewportX, valX, "viewportX"

  test "test double click over right", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX
        # right
        evtHdlr._onDblClick {offsetX: stage.canvas.width + 200, offsetY: stage.canvas.height + 200}

        valX = Math.round startX + stage.canvas.width / 2 + 200
        valY = Math.round startX + stage.canvas.height / 2 + 200
        [valX,valY] = stage._checkPos valX,valY

        equal stage.viewportX, valX, "viewportX"

  test "test double click canvas uneven width/height", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX
        # right

        randomX = 56
        randomY = 9

        console.log "rvalY" + randomY
        console.log "rvalX" + randomX
        # somewhere
        evtHdlr._onDblClick {offsetX: randomX, offsetY: randomY}

        valX = Math.round(startX + randomX - stage.canvas.width / 2)
        valY = Math.round(startX + randomY - stage.canvas.height / 2)

        console.log "valX:" + valX + "valY:" + valY
        [valX,valY] = stage._checkPos valX,valY

        equal stage.viewportX,valX, "viewportX"
        equal stage.viewportY,valY, "viewportY"

  test "test double click somewhere", ->
    stageTest ->
      for startX in [testRangeStart..testRangeEnd] by testRangeStep
        stage.viewportX = startX
        stage.viewportY = startX

        randomX = Math.floor(Math.random() * (stage.canvas.width + 1))
        randomY = Math.floor(Math.random() * (stage.canvas.height + 1))

        console.log "rvalY" + randomY
        console.log "rvalX" + randomX
        # somewhere
        evtHdlr._onDblClick {offsetX: randomX, offsetY: randomY}

        valX = Math.round(startX + randomX - stage.canvas.width / 2)
        valY = Math.round(startX + randomY - stage.canvas.height / 2)

        console.log "valX:" + valX + "valY:" + valY
        [valX,valY] = stage._checkPos valX,valY

        equal stage.viewportX,valX, "viewportX"
        equal stage.viewportY,valY, "viewportY"
