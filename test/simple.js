var assert = require("chai").assert;
var tutorial = require("../");

// you can find more docu about mocha here
// https://visionmedia.github.io/mocha/

describe('Graduates', function(){
  // do any init stuff here
  beforeEach(function(){
    graduates = tutorial.parse;
  });
  describe('parse', function(){
    it('should return match with default object', function(){
      dummyObj = {DE: 1, HK: 1, NL: 1, UK: 1, TW: 1};
      assert.deepEqual(graduates(), dummyObj);
    });
  });
});
