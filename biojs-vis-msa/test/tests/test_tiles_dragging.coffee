MSA = require "../../src/msa"
Fasta = require("biojs-io-fasta").parse
fs = require "fs"
assert = require("chai").assert

#jsdom = require 'jsdom'
#win = jsdom.jsdom "<html><head></head><body><div id='msa'></div></body></html>"
#document = win.parentWindow.document

stage = null
evtHdlr = null

suite "tiles.dragging"

beforeEach "loading msa", (done) ->
  Fasta.read "./dummy/foo.fasta", (seqs) ->
    debugger
    msa = new MSA "msa", seqs, {speed: true}
    console.log "foo"
    stage = msa.stage
    evtHdlr = stage.evtHdlr
    stage.tileSize = 200
    stage.viewportX = 100
    done()

test "test right", ->
  evtHdlr._onMouseDown {pageX: 0, pageY: 0 }
  evtHdlr._onMouseUp {pageX: 20, pageY: 0 }

  assert.equal stage.viewportX, 80, "toRightDrag"

test "test left", ->
  evtHdlr._onMouseDown {pageX: 0, pageY: 0 }
  evtHdlr._onMouseUp {pageX: -20, pageY: 0 }

  assert.equal stage.viewportX, 120, "toRightDrag"
