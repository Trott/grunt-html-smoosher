'use strict';

const grunt = require('grunt');
const assert = require('assert');

// default_options:
const actual = grunt.file.read('tmp/default_options');
const expected = grunt.file.read('test/expected/default_options');
assert.strictEqual(actual.replace(/\s/g, ''), expected.replace(/\s/g, ''), 'should describe what the default behavior is.');
