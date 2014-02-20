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

    options.cssTags = this.options().cssTags || {
      start: '<style>',
      end: '</style>'
    };

    options.jsTags = this.options().jsTags || {
      start: '<script>',
      end: '</script>'
    };

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

        //get attributes to keep them on the new element
        var attributes = getAttributes(this[0]);
        if (attributes.href){
          //don't want to re-include the href
          delete attributes.href;
        }
        if (attributes.rel){
          //don't want to rel
          delete attributes.rel;
        }
        
        if(url.parse(style).protocol) { return; }
        var filePath = (style.substr(0,1) === "/") ? path.resolve(options.cssDir, style.substr(1)) : path.join(path.dirname(filePair.src), style);
        grunt.log.writeln(('Including CSS: ').cyan + filePath);
        $(this).replaceWith(options.cssTags.start + processInput(grunt.file.read(filePath)) + options.cssTags.end);
      });

      $('script').each(function () {
        var script = $(this).attr('src');
        if(!script) { return; }
        if(script.match(/^\/\//)) { return; }
        if(url.parse(script).protocol) { return; }

        //get attributes to keep them on the new element
        var attributes = getAttributes(this[0]);
        if (attributes.src){
          delete attributes.src;
        }

        var filePath = (script.substr(0,1) === "/") ? path.resolve(options.jsDir, script.substr(1)) : path.join(path.dirname(filePair.src), script);
        grunt.log.writeln(('Including JS: ').cyan + filePath);

        //create and replace script with new scipt tag
        $(this).replaceWith(options.jsTags.start + processInput(grunt.file.read(filePath)) + options.jsTags.end);
      });

      $('img').each(function () {
        var src = $(this).attr('src');
        if (!src) { return; }
        if (src.match(/^\/\//)) { return; }
        if (url.parse(src).protocol) { return; }
        $(this).attr('src', 'data:image/' + src.substr(src.lastIndexOf('.')+1) + ';base64,' + new Buffer(grunt.file.read(path.join(path.dirname(filePair.src), src), { encoding: null })).toString('base64'));
      });

      grunt.file.write(path.resolve(filePair.dest), $.html());
      grunt.log.writeln(('Created ').green + path.resolve(filePair.dest));
    });

    function getAttributes(el) {
        var attributes = {};
        for (var index in el.attribs) {
            var attr = el.attribs[index];
            grunt.log.writeln(("attr: ").green + index + ":" + attr);
            attributes[ index ] = attr;
        }
        return attributes;
    }
  });
};
