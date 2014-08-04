# grunt-smash

> A grunt task for Mike Bostock's Smash utility.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-smash --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-smash');
```

## The "smash" task

### Overview
In your project's Gruntfile, add a section named `smash` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  smash: {
    your_target: {
      // Target-specific file lists go here.
    },
  },
})
```

### Usage Examples

In this example, import statements in `js/index.js` will be resolved and the result will be written to `dist/bundle.js`.

```js
grunt.initConfig({
  smash: {
    bundle: {
      src: 'js/index.js',
      dest: 'dist/bundle.js'
    },
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-06-03   v0.1.0   Initial release
