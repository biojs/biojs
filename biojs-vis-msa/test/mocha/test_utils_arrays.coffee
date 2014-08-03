arrays = require "../../src/utils/arrays"
assert = require "assert"

suite "arrays"

test "check default conf", ->

  defaultConf = {
    visibleElements: {
      labels: true, sequences: true, menubar: true, ruler: true
    },
    registerMoveOvers: false,
    test: "hi"
  }

  conf = {
    visibleElements: {
      labels: false,
    },
    registerMoveOvers: true
  }

  arrays.recursiveDictFiller defaultConf, conf

  assert.equal conf.registerMoveOvers, true
  assert.equal conf.visibleElements.labels, false
  assert.equal conf.visibleElements.sequences, true
  assert.equal conf.test, "hi"
