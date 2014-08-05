backbone-events-standalone
==========================

[![Build Status](https://travis-ci.org/n1k0/backbone-events-standalone.png)](https://travis-ci.org/n1k0/backbone-events-standalone)

This is an extraction of the [Events] module of [Backbone] which can be used
standalone (no external dependency), in the browser or in a nodejs environment.

## Oh dear. Why another EventEmitter?

This project started because I appreciate the `Backbone.Events` interface &
features while I wanted to keep using it within non-DOM environments (think a
[Social API Web Worker] for example).

I've ported the [original Backbone.Events tests] to [mocha] & [chai] so I can
run them within a [nodejs] environment and ensure the extracted API actually
works as expected without the burden of setting up continuous integration of
browser tests.

## Installation

### Bower (for browser use)

```
$ bower install backbone-events-standalone
```

### NPM (node)

```
$ npm install backbone-events-standalone
```

## Usage

### Standard browser use

```html
<script src="backbone-events-standalone.js"></script>
<script>
  // use BackboneEvents
</script>
```

**Notes:**

- You may want to use the minified version stored in `backbone-events-standalone.min.js`.
- Using Bower, files are usually available within `bower_components/backbone-events-standalone`

### AMD

```js
require(["backbone-events-standalone"], function(BackboneEvents) {
  // ...
});
```

### In nodejs/browserify

```js
var BackboneEvents = require("backbone-events-standalone");
```

### API

The `BackboneEvents#mixin` method helps extending any object or prototype to add eventing
support to it:

```js
var myEventEmitter = BackboneEvents.mixin({});
myEventEmitter.on("foo", console.log).trigger("foo", "hello emitter");

// alternatively
function Plop() {}
BackboneEvents.mixin(Plop.prototype);
(new Plop()).on("foo", console.log).trigger("foo", "hello emitter");
```

`BackboneEvents` API & usage is the same as [Backbone.Events].

## Test

```
$ npm test
```

## License

MIT

## Credits

[Jeremy Ashkenas](http://ashkenas.com/), Backbone author

[Events]: http://backbonejs.org/#Events
[Backbone.Events]: http://backbonejs.org/#Events
[Backbone]: http://backbonejs.org/
[mocha]: (http://visionmedia.github.io/mocha/)
[chai]: http://chaijs.com/
[nodejs]: nodejs.org/
[original Backbone.Events tests]: https://github.com/jashkenas/backbone/blob/699fe3271262043bb137bae97bd0003d6d193f27/test/events.js
[Social API Web Worker]: https://developer.mozilla.org/en-US/docs/Social_API/Service_worker_API_reference
