var Biojs = require("../src/biojs");

describe("biojs core", function() {
  describe("old events API", function() {
    // seems to work, add tests if we hit any bugs
  });

  describe("new events API", function() {
    // tested via Backbone
  });

  describe("legacy code supports new API", function() {
    it("fires new API when event triggered from old API", function() {
      var Class = Biojs.extend();
      var instance = new Class;

      var listenerSpy = sinon.spy();
      instance.on("eventA", listenerSpy);

      var id = "aaff22";
      instance.raiseEvent("eventA", { id: id });

      assert(listenerSpy.calledWithArgs({ id: id }), "event triggered from old API fires new API");
    });

    // events fired from new API for firing events ( .trigger(name, arg1 ... argN ) 
    // should never be listened for via the old API for listening to them, as positional
    // event args are incompatible with an event object.
    //
    // so: old events + new listeners = :) and there's no other interaction between the two APIs
  });
});
