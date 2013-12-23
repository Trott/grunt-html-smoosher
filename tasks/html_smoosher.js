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
  var uglify = require('uglifyjs');

  grunt.registerMultiTask('smoosher', 'Turn your distribution into something pastable.', function() {

    var options = this.options({
      jsDir: "",
      cssDir: "",
      minify: false
    }); 
    var processInput = function(i){return i;};

    if (options.minify){
      processInput = function(input){
        return uglify.minify(input, {fromString: true}).code;
      };
    }

    this.files.forEach(function(filePair) {
      // Check that the source file exists
      if(filePair.src.length === 0) { return; }

      var $ = cheerio.load(grunt.file.read(filePair.src));

      grunt.log.writeln('Reading: ' + path.resolve(filePair.src.toString()));

      $('link[rel="stylesheet"]').each(function () {
        var style = $(this).attr('href');
        if(!style) { return; }
        if(style.match(/^\/\//)) { return; }
        if(url.parse(style).protocol) { return; }
        var filePath = (style.substr(0,1) === "/") ? path.resolve(options.cssDir, style.substr(1)) : path.join(path.dirname(filePair.src), style);
        grunt.log.writeln(('Including CSS: ').cyan + filePath);
        $(this).replaceWith('<style>' + processInput(grunt.file.read(filePath)) + '</style>');
      });

      $('script').each(function () {
        var script = $(this).attr('src');
        if(!script) { return; }
        if(script.match(/^\/\//)) { return; }
        if(url.parse(script).protocol) { return; }
        var filePath = (script.substr(0,1) === "/") ? path.resolve(options.jsDir, script.substr(1)) : path.join(path.dirname(filePair.src), script);
        grunt.log.writeln(('Including JS: ').cyan + filePath);
        $(this).replaceWith('<script>' + processInput(grunt.file.read(filePath)) + '</script>');
      });

      grunt.file.write(path.resolve(filePair.dest), $.html());
      grunt.log.writeln(('Created ').green + path.resolve(filePair.dest));
    });

  });

};
