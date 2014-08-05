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

      var called = false;
      instance.on("eventA", function() {
        called = true;
      });

      assert(called, "event triggered from old API fires new API");
    });

    it("fires old API when event triggered from new API", function() {
      var Class = Biojs.extend();
      var instance = new Class;

      var called = false;
      instance.addListener("eventA", function() {
        called = true;
      });

      assert(called, "event triggered from new API fires old API");
    });
  });
});
