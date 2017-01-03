'use strict';

var grunt = require('grunt');
var fs = require('fs');

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

exports.referUpdate = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  newRefs: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/newRefs.md');
    var expected = grunt.file.read('test/expected/newRefs.md');
    test.equal(expected, actual, 'should create new file which has its old references updated');

    test.done();
  },
  unprocessedRef: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/unprocessedRef.html');
    var expected =  grunt.file.read('test/expected/unprocessedRef.html');
    test.equal(expected, actual, 'should create new file which has its old references updated, but leave unprocessed references alone');

    test.done();
  },
  noNewRefs: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/noNewRefs.html');
    var expected =  grunt.file.read('test/expected/noNewRefs.html');
    test.equal(expected, actual, 'should create new file which leaves its new references alone');

    test.done();
  },
  noRefs: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/noRefs.html');
    var expected =  grunt.file.read('test/expected/noRefs.html');
    test.equal(expected, actual, 'should create new file but leave data intact');

    test.done();
  },
};
