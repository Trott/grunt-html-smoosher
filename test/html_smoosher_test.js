'use strict';

var grunt = require('grunt');
var assert = require('assert');

{
  // default_options: 
    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    assert.strictEqual(actual, expected, 'should describe what the default behavior is.');
}
