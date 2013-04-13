/*
 * grunt-html-smoosher
 * https://github.com/motherjones/grunt-html-smoosher
 *
 * Copyright (c) 2013 Ben Breedlove
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('smoosher', 'Turn your distribution into something pastable.', function() {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    // Iterate over all specified file groups.
    grunt.util.async.forEachSeries(this.files, function(f, nextFileObj) {
      var destFile = f.dest;

      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (files.length === 0) {
        // No src files, goto next target. Warn would have been issued above.
        nextFileObj();
      }

      var compiled = [];
      grunt.util.async.concatSeries(files, function(file, next) {
        smoosh(file, options, function(snippet, err) {
          if (!err) {
            compiled.push(snippet);
            next(null);
          } else {
            nextFileObj(false);
          }
        });
      }, function() {
        if (compiled.length < 1) {
          grunt.log.warn('Destination not written because compiled files were empty.');
        } else {
          grunt.file.write(destFile, compiled.join(grunt.util.normalizelf(grunt.util.linefeed)));
          grunt.log.writeln('File ' + destFile.cyan + ' created.');
        }
        nextFileObj();
      });
    }, done);
  });

  var smoosh = function(srcFile, options, callback) {
    try {
      var srcCode = grunt.file.read(srcFile);
      var jsdom = require('jsdom');
      var jQueryLink = "http://code.jquery.com/jquery.js";
      grunt.util.async.series(
        {
          remakehtml: function(cb) {
            jsdom.env(
              srcCode,
              [jQueryLink],
              cb
            );
          }
        },
        function(errors, window) {
          var html = window.remakehtml;
          var $ = window.remakehtml.$;
          $('script').each(function() {
            var jsFile = $(this).attr('src');
            if (jsFile !== jQueryLink) {
              var js = grunt.file.read(srcFile.replace(/\/[^\/]+?$/, '/') + jsFile);
              $(this).replaceWith('<script type="text/javascript">' + js + '</script>');
            }
          });
          $('link').each(function() {
            var cssFile = $(this).attr('href');
            var css = grunt.file.read(srcFile.replace(/\/[^\/]+?$/, '/') + cssFile);
            $(this).replaceWith('<style type="text/css">' + css + '</style>');
          });
          //ugh. linebreaks. this is stupid
          callback($(html.document._documentElement).html() + '\n', null);
        }
      );
    } catch (e) {
      grunt.log.error(e);
      callback(e, true);
    }
  };

};
