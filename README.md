# grunt-html-smoosher
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
    options: {
      jsTags: { // optional
        start: '<script type="text/javascript">', // default: <script>
        end: '</script>'                          // default: </script>
      },
    },
    all: {
      files: {
        'dest-index.html': 'source-index.html',
      },
    },
  },
});
```

### Options

#### cssTags

Defaults to 

```js
{
  start: '<style>',
  end: '</style>'
}
```

#### jsTags

Defaults to 

```js
{
  start: '<script>',
  end: '</script>'
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
