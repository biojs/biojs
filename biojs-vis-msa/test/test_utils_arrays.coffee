define ["cs!utils/arrays"], (arrays) ->

  module "arrays"

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

    equal conf.registerMoveOvers, true
    equal conf.visibleElements.labels, false
    equal conf.visibleElements.sequences, true
    equal conf.test, "hi"
