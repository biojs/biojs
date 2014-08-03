define ["cs!input/fasta", "cs!msa/msa"], (Fasta, MSA) ->

  stage = null

  module "tiles.viewport",
    setup: ->
      stop()
      Fasta.read "../dummy/foo.fasta", (seqs) ->
        msa = new MSA "msa", seqs, {speed: true}
        stage = msa.stage
        stage.tileSize = 200
        start()

  getTileX = (stage) -> Math.floor stage.viewportX / stage.tileSize
  getTileY = (stage) -> Math.floor stage.viewportY / stage.tileSize

  test "test tileY", ->
    stage.viewportY = 0
    equal stage.getFirstTile()[3], 0, "tileY"

  test "test tileX", ->
    stage.viewportX = -100
    equal stage.getFirstTile()[2], -1, "tileX -100"

    stage.viewportX = -300
    equal stage.getFirstTile()[2], -2, "tileX -300"

    stage.viewportX = 0
    equal stage.getFirstTile()[2], 0, "tileX 0"

    stage.viewportX = 100
    equal stage.getFirstTile()[2], 0, "tileX 100"

    stage.viewportX = 200
    equal stage.getFirstTile()[2], 1, "tileX 200"

    stage.viewportX = 300
    equal stage.getFirstTile()[2], 1, "tileX 300"

  test "test more", ->
    for i in[1000..1000]
      stage.viewportX = i
      equal stage.getFirstTile()[2], getTileX(stage), "first tileX"

    for i in[1000..1000]
      stage.viewportY = i
      equal stage.getFirstTile()[3], getTileY(stage), "first tileY"
