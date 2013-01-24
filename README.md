# grunt-html-smoosher

> A grunt task which takes a html file, finds all the css and js links, and outputs a version with all the css and js written inline for ease of pasting into a cms

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-html-smoosher --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-html-smoosher');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "html_smoosher" task

### Overview
In your project's Gruntfile, add a section named `smoosher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  smoosher: {
    options: {
      // Task-specific options go here.
    },
    single_target: {
        'distro/smooshed_file.html': ['dev/your_project_file.html']
    },
    multiple_targets: {
        'distro/two_smooshed_files.html': ['dev/your_project_file.html', 'dev/another_project_file.html']
    },
  },
})
```

### Options

None yet.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
_(Nothing yet)_
