MSA = require "../../src/msa"
Fasta = require("biojs-io-fasta").parse
fs = require "fs"
assert = require("chai").assert

stage = null

suite "tiles.viewport"
beforeEach "loading msa", (done) ->
  Fasta.read "dummy/foo.fasta", (seqs) ->
    msa = new MSA "msa", seqs, {speed: true}
    stage = msa.stage
    stage.tileSize = 200
    done()

getTileX = (stage) -> Math.floor stage.viewportX / stage.tileSize
getTileY = (stage) -> Math.floor stage.viewportY / stage.tileSize

test "test tileY", ->
  stage.viewportY = 0
  assert.equal stage.getFirstTile()[3], 0, "tileY"

test "test tileX", ->
  stage.viewportX = -100
  assert.equal stage.getFirstTile()[2], -1, "tileX -100"

  stage.viewportX = -300
  assert.equal stage.getFirstTile()[2], -2, "tileX -300"

  stage.viewportX = 0
  assert.equal stage.getFirstTile()[2], 0, "tileX 0"

  stage.viewportX = 100
  assert.equal stage.getFirstTile()[2], 0, "tileX 100"

  stage.viewportX = 200
  assert.equal stage.getFirstTile()[2], 1, "tileX 200"

  stage.viewportX = 300
  assert.equal stage.getFirstTile()[2], 1, "tileX 300"

test "test more", ->
  for i in[1000..1000]
    stage.viewportX = i
    assert.equal stage.getFirstTile()[2], getTileX(stage), "first tileX"

  for i in[1000..1000]
    stage.viewportY = i
    assert.equal stage.getFirstTile()[3], getTileY(stage), "first tileY"
