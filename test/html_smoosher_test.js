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

exports.html_smoosher = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  minify: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/min_css');
    var expected = grunt.file.read('test/expected/minify');
    test.equal(actual, expected, 'tests minified css');
    
    test.done();
  },
  include_css_images: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/min_css');
    var expected = grunt.file.read('test/expected/include_css_images');
    test.equal(actual, expected, 'tests inline css images');
    
    test.done();
  },
  include_images: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/min_css');
    var expected = grunt.file.read('test/expected/include_images');
    test.equal(actual, expected, 'tests inline images');
    
    test.done();
  }
};
