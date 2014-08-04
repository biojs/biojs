var vows = require("vows"),
    assert = require("assert"),
    smash = require("../");

var suite = vows.describe("smash.load");

suite.addBatch({
  "load": {
    "on a simple file": {
      topic: function() {
        smash.load(["test/data/forty-two"], "foo", this.callback);
      },
      "returns the evaluated expression": function(foo) {
        assert.strictEqual(foo, 42);
      },
      "does not pollute the global namespace": function(foo) {
        assert.equal(typeof bar, "undefined");
      }
    }
  }
});

suite.export(module);
