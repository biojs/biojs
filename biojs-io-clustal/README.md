<p align="center">
  <a href="http://bionode.io">
    <img height="200" width="200" title="bionode" alt="bionode logo" src="https://rawgithub.com/bionode/bionode/master/docs/bionode-logo.min.svg"/>
  </a>
  <br/>
  <a href="http://bionode.io/">bionode.io</a>
</p>
# bionode-template [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![DOI][doi-image]][doi-url]


> Template module to use as a base for quickly creating bionode modules.

Principles
----------
This provides a quick template to build a bionode module. A bionode module should follow the [Unix philosophy](http://en.wikipedia.org/wiki/Unix_philosophy) and play nice with [Node.js](http://nodejs.org).

That is:

* Be small, simple and do one thing well;
* Use [Node's CommonJS module pattern](http://nodejs.org/docs/latest/api/modules.html) and be available on [NPM](http://npmjs.org);
* Provide Node.js [Streams](http://nodejs.org/api/stream.html);
* Provide a [Command Line Interface](http://en.wikipedia.org/wiki/Command-line_interface) compatible with [Unix pipes](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29);
* If possible, work client-side (browser) using [browserify](https://github.com/substack/node-browserify);
* Provide testing (preferably with [mocha](https://github.com/visionmedia/mocha) and [should](https://github.com/visionmedia/should.js));
* Provide code coverage (preferably with [istanbul](https://github.com/gotwarlost/istanbul));
* Provide code with comments and documentation (preferably with [docco](https://github.com/jashkenas/docco));
* [KISS](http://en.wikipedia.org/wiki/KISS_principle) and don't [abuse objects](http://timruffles.github.io/you-probably-dont-want-an-object);
* Be [MIT](http://choosealicense.com/licenses/mit/) licensed.

To try to maximize the compatibility of the new module and anticipate possible use cases, the authors of the new bionode module should be aware of the existing bionode modules and other useful projects like [Dat](http://github.com/maxogden/dat).

The following sections should be adapted and included in the README.md file.

Install
-------

Install ```bionode-template``` with [npm](//npmjs.org):

```sh
$ npm install bionode-template
```
To use it as a command line tool, you can install it globally by adding ```-g``` .

Alternatively, just include `bionode-template.min.js` via a `<script/>` in your page.

Usage
-----

If you are using ```bionode-template``` with Node.js, you can require the module:

```js
var template = require('bionode-template')
template.greet('World').on('data', console.log)
//=> {"greeting":"Hello World"}
```

In-browser, bionode is available as a global variable.
```js
bionode.template.greet('World').on('data', console.log)
```

Please read the [documentation](http://rawgit.com/bionode/bionode-template/master/docs/bionode-template.html) for the methods exposed by bionode-template.

### Command line examples
```sh
$ bionode-template greet World
$ echo World | bionode-template greet
```

### Usage with [Dat](http://dat-data.com)
```sh
echo World | bionode-template greet | dat import --json
```

Contributing
------------

To contribute, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
$ npm test
```

Please also check for code coverage:

```sh
$ npm run coverage
```

To rebuild and minify the module for the browser:

```sh
$ npm run build-browser
```

To rebuild the documentation using the comments in the code:

```sh
$ npm run build-docs
```
Check the [issues](http://github.com/bionode/bionode-template/issues) for ways to contribute.

Contacts
--------
Bruno Vieira <[mail@bmpvieira.com](mailto:mail@bmpvieira.com)> [@bmpvieira](//twitter.com/bmpvieira)

Yannick Wurm ([yannick.poulet.org](http://yannick.poulet.org)) [@yannick__](//twitter.com/yannick__)

Licenses
--------

bionode-template is licensed under the [MIT](https://raw.github.com/bionode/bionode-template/master/LICENSE) license.  
Check [ChooseALicense.com](http://choosealicense.com/licenses/mit) for details.

[npm-url]: http://npmjs.org/package/bionode-template
[npm-image]: http://badge.fury.io/js/bionode-template.png
[travis-url]: http://travis-ci.org/bionode/bionode-template
[travis-image]: http://travis-ci.org/bionode/bionode-template.png?branch=master
[coveralls-url]: http://coveralls.io/r/bionode/bionode-template
[coveralls-image]: http://coveralls.io/repos/bionode/bionode-template/badge.png
[depstat-url]: http://david-dm.org/bionode/bionode-template
[depstat-image]: http://david-dm.org/bionode/bionode-template.png
[doi-url]: http://dx.doi.org/10.5281/zenodo.10853
[doi-image]: https://zenodo.org/badge/3959/bionode/bionode-template.png

[![Bitdeli Badge](http://d2weczhvl823v0.cloudfront.net/bionode/bionode-template/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
