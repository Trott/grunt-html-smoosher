/*
 * grunt-html-smoosher
 * https://github.com/motherjones/grunt-html-smoosher
 *
 * Copyright (c) 2013 Ben Breedlove
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  const cheerio = require('cheerio');
  const path = require('path');
  const uglify = require('uglify-js');

  const hasScheme = /^[a-z0-9]+:\/\//;

  grunt.registerMultiTask('smoosher', 'Turn your distribution into something pastable.', function () {
    const options = this.options({
      jsDir: '',
      cssDir: '',
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

    let processInput = function (i) { return i; };

    if (options.minify) {
      processInput = function (input) {
        return uglify.minify(input, { fromString: true }).code;
      };
    }

    this.files.forEach(function (filePair) {
      // Check that the source file exists
      if (filePair.src.length === 0) { return; }

      const filePairSrc = filePair.src[0];

      const $ = cheerio.load(grunt.file.read(filePairSrc));

      grunt.log.writeln('Reading: ' + path.resolve(filePairSrc));

      $('link[rel="stylesheet"]').each(function () {
        const style = $(this).attr('href');
        if (!style) { return; }
        if (style.match(/^\/\//)) { return; }

        // get attributes to keep them on the new element
        const attributes = getAttributes(this);
        if (attributes.href) {
          // don't want to re-include the href
          delete attributes.href;
        }
        if (attributes.rel) {
          // don't want to rel
          delete attributes.rel;
        }

        if (hasScheme.test(style)) { return; }
        const filePath = (style.substr(0, 1) === '/') ? path.resolve(options.cssDir, style.substr(1)) : path.join(path.dirname(filePairSrc), style);
        grunt.log.writeln(('Including CSS: ').cyan + filePath);
        $(this).replaceWith(options.cssTags.start + processInput(grunt.file.read(filePath)) + options.cssTags.end);
      });

      $('script').each(function () {
        const script = $(this).attr('src');
        if (!script) { return; }
        if (script.match(/^\/\//)) { return; }
        if (hasScheme.test(script)) { return; }

        // get attributes to keep them on the new element
        const attributes = getAttributes(this);
        if (attributes.src) {
          delete attributes.src;
        }

        const filePath = (script.substr(0, 1) === '/') ? path.resolve(options.jsDir, script.substr(1)) : path.join(path.dirname(filePairSrc), script);
        grunt.log.writeln(('Including JS: ').cyan + filePath);

        // create and replace script with new scipt tag
        $(this).replaceWith(options.jsTags.start + processInput(grunt.file.read(filePath)) + options.jsTags.end);
      });

      $('img').each(function () {
        const src = $(this).attr('src');
        if (!src) { return; }
        if (src.match(/^\/\//)) { return; }
        if (hasScheme.test(src)) { return; }
        $(this).attr('src', 'data:image/' + src.substr(src.lastIndexOf('.') + 1) + ';base64,' + Buffer.from(grunt.file.read(path.join(path.dirname(filePairSrc), src), { encoding: null })).toString('base64'));
      });

      grunt.file.write(path.resolve(filePair.dest), $.html());
      grunt.log.writeln(('Created ').green + path.resolve(filePair.dest));
    });

    function getAttributes (el) {
      const attributes = {};
      for (const index in el.attribs) {
        const attr = el.attribs[index];
        grunt.log.writeln(('attr: ').green + index + ':' + attr);
        attributes[index] = attr;
      }
      return attributes;
    }
  });
};
