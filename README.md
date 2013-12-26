{
    jsDir: "../../js/",
    cssDir: "../../css/",
    minify: true
}# grunt-html-smoosher
[![Build Status](https://api.travis-ci.org/motherjones/grunt-html-smoosher.png?branch=master)](https://travis-ci.org/motherjones/grunt-html-smoosher)
[![NPM version](https://badge.fury.io/js/grunt-html-smoosher.png)](http://badge.fury.io/js/grunt-html-smoosher)

> A grunt task which takes a html file, finds all the css and js links, and outputs a version with all the css and js written inline for ease of pasting into a cms

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-smoosher --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-smoosher');
```

## The "smoosher" task

### Overview
In your project's Gruntfile, add a section named `smoosher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  smoosher: {
    all: {
      files: {
        'dest-index.html': 'source-index.html',
      },
    },
  },
});
```

### Options

#### Script Minification

Minify scripts with UglifyJS.

```js

grunt.initConfig({
  smoosher: {
    all: {
      options: {
        minify: true
      },
      files: {
        'dest-index.html': 'source-index.html',
      },
    },
  },
});
```

#### Path config

When you have absolute paths for your external assets, it helps to add the local address of your asset files; relative to uncompiled HTML file.

```js
grunt.initConfig({
  smoosher: {
    all: {
      options: {
        jsDir: "../js/",
        cssDir: "/Library/documents/sharedAssets/"
      },
      files: {
        'dest-index.html': 'source-index.html',
      },
    },
  },
});
```
**Example**

If the local cwd for your uncompiled file is `/Library/documents/server/src/html` then the above settings would resolve to:

`/assets/js/script.js` will use a local file at `/Library/documents/server/src/js/script.js`

`/assets/css/styles.css` will use a local file at `/Library/documents/sharedAssets/css/styles.css`


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
