/*
 * grunt-html-smoosher
 * https://github.com/motherjones/grunt-html-smoosher
 *
 * Copyright (c) 2013 Ben Breedlove
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var cheerio = require('cheerio');
  var path = require('path');
  var url = require('url');

  grunt.registerMultiTask('smoosher', 'Turn your distribution into something pastable.', function() {

    this.files.forEach(function(filePair) {
      // Check that the source file exists
      if(filePair.src.length === 0) { return; }

      var $ = cheerio.load(grunt.file.read(filePair.src));

      $('link[rel="stylesheet"]').each(function () {
        var style = $(this).attr('href');
        if(!style) { return; }
        if(style.match(/^\/\//)) { return; }
        if(url.parse(style).protocol) { return; }
        $(this).replaceWith('<style>' + grunt.file.read(path.join(path.dirname(filePair.src), style)) + '</style>');
      });

      $('script').each(function () {
        var script = $(this).attr('src');
        if(!script) { return; }
        if(script.match(/^\/\//)) { return; }
        if(url.parse(script).protocol) { return; }
        $(this).replaceWith('<script>' + grunt.file.read(path.join(path.dirname(filePair.src), script)) + '</script>');
      });

      grunt.file.write(filePair.dest, $.html());
      grunt.log.writeln('File "' + filePair.dest + '" created.');
    });

  });

};
