'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.smash = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  target1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/target1.js');
    var expected = grunt.file.read('test/expected/target1.js');
    test.equal(actual, expected, 'should contain the contents of foo.js and bar.js');

    test.done();
  },
  target2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/target2.js');
    var expected = grunt.file.read('test/expected/target2.js');
    test.equal(actual, expected, 'should contain the contents of foo.js and baz.js');

    test.done();
  },
};
