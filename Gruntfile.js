/*
 * grunt-html-smoosher
 * https://github.com/Trott/grunt-html-smoosher
 *
 * Copyright (c) 2013 Ben Breedlove
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    smoosher: {
      default_options: {
        files: {
          'tmp/default_options': 'test/fixtures/index.html'
        }
      }
    },

    // Unit tests.
    run: {
      lint: {
        cmd: 'npx',
        args: [ 'semistandard' ]
      },
      test: {
        cmd: 'node',
        args: [ 'test/html_smoosher_test.js' ]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'smoosher', 'run']);

  grunt.registerTask('default', ['test']);
};
