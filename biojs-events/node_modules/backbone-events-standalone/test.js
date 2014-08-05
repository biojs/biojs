/* global chai, describe, it */
/* jshint expr:true */
var expect = require("chai").expect;
var _ = require("underscore");
var BackboneEvents = require("./index");

describe("BackboneEvents", function() {
  // added by backbone-events-standalone
  describe("#mixin", function() {
    it("should add the Events mixin to passed prototype", function() {
      var target = {};
      BackboneEvents.mixin(target);
      var expected = "on,once,off,trigger,stopListening".split(",");
      expect(target).to.include.keys(expected);
    });

    it("should return augmented object", function(done) {
      BackboneEvents.mixin({}).on("foo", function(message) {
        expect(message).eql("hello emitter");
        done();
      }).trigger("foo", "hello emitter");
    });

    it("should augment an existing prototype", function(done) {
      function Plop() {}
      BackboneEvents.mixin(Plop.prototype);
      (new Plop()).on("foo", function(message) {
        expect(message).eql("hello emitter");
        done();
      }).trigger("foo", "hello emitter");
    });

    it("should only augment prototype with expected methods", function() {
      function Plop() {}
      Plop.prototype.foo = function(){};
      BackboneEvents.mixin(Plop.prototype);
      expect(Plop.prototype).to.have.keys(['foo', 'on','once', 'off', 'trigger',
        'stopListening', 'listenTo', 'listenToOnce', 'bind', 'unbind']);
      });
  });

  // ported from Backbone.Events tests
  it("#on, #trigger", function() {
    var obj = { counter: 0 };
    BackboneEvents.mixin(obj);
    obj.on('event', function() { obj.counter += 1; });
    obj.trigger('event');
    expect(obj.counter).to.equal(1);
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    expect(obj.counter).to.equal(5);
  });

  it("binding and triggering multiple events", function() {
    var obj = { counter: 0 };
    BackboneEvents.mixin(obj);

    obj.on('a b c', function() { obj.counter += 1; });

    obj.trigger('a');
    expect(obj.counter).eql(1);

    obj.trigger('a b');
    expect(obj.counter).eql(3);

    obj.trigger('c');
    expect(obj.counter).eql(4);

    obj.off('a c');
    obj.trigger('a b c');
    expect(obj.counter).eql(5);
  });

  it("binding and triggering with event maps", function() {
    var obj = { counter: 0 };
    BackboneEvents.mixin(obj);

    var increment = function() {
      this.counter += 1;
    };

    obj.on({
      a: increment,
      b: increment,
      c: increment
    }, obj);

    obj.trigger('a');
    expect(obj.counter).eql(1);

    obj.trigger('a b');
    expect(obj.counter).eql(3);

    obj.trigger('c');
    expect(obj.counter).eql(4);

    obj.off({
      a: increment,
      c: increment
    }, obj);
    obj.trigger('a b c');
    expect(obj.counter).eql(5);
  });

  it("listenTo and stopListening", function() {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    a.listenTo(b, 'all', function(){ expect(true).ok; });
    b.trigger('anything');
    a.listenTo(b, 'all', function(){ expect(false).ok; });
    a.stopListening();
    b.trigger('anything');
  });

  it("listenTo and stopListening with event maps", function() {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    var cb = function(){ expect(true).ok; };
    a.listenTo(b, {event: cb});
    b.trigger('event');
    a.listenTo(b, {event2: cb});
    b.on('event2', cb);
    a.stopListening(b, {event2: cb});
    b.trigger('event event2');
    a.stopListening();
    b.trigger('event event2');
  });

  it("stopListening with omitted args", function () {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    var cb = function () { expect(true).ok; };
    a.listenTo(b, 'event', cb);
    b.on('event', cb);
    a.listenTo(b, 'event2', cb);
    a.stopListening(null, {event: cb});
    b.trigger('event event2');
    b.off();
    a.listenTo(b, 'event event2', cb);
    a.stopListening(null, 'event');
    a.stopListening();
    b.trigger('event2');
  });

  it("listenToOnce and stopListening", function() {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    a.listenToOnce(b, 'all', function() { expect(true).ok; });
    b.trigger('anything');
    b.trigger('anything');
    a.listenToOnce(b, 'all', function() { expect(false).ok; });
    a.stopListening();
    b.trigger('anything');
  });

  it("listenTo, listenToOnce and stopListening", function() {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    a.listenToOnce(b, 'all', function() { expect(true).ok; });
    b.trigger('anything');
    b.trigger('anything');
    a.listenTo(b, 'all', function() { expect(false).ok; });
    a.stopListening();
    b.trigger('anything');
  });

  it("listenTo and stopListening with event maps", function() {
    var a = _.extend({}, BackboneEvents);
    var b = _.extend({}, BackboneEvents);
    a.listenTo(b, {change: function(){ expect(true).ok; }});
    b.trigger('change');
    a.listenTo(b, {change: function(){ expect(false).ok; }});
    a.stopListening();
    b.trigger('change');
  });

  it("listenTo yourself", function(){
    var e = _.extend({}, BackboneEvents);
    e.listenTo(e, "foo", function(){ expect(true).ok; });
    e.trigger("foo");
  });

  it("listenTo yourself cleans yourself up with stopListening", function(){
    var e = _.extend({}, BackboneEvents);
    e.listenTo(e, "foo", function(){ expect(true).ok; });
    e.trigger("foo");
    e.stopListening();
    e.trigger("foo");
  });

  it("listenTo with empty callback doesn't throw an error", function(){
    var e = _.extend({}, BackboneEvents);
    e.listenTo(e, "foo", null);
    e.trigger("foo");
    expect(true).ok;
  });

  it("trigger all for each event", function() {
    var a, b, obj = { counter: 0 };
    BackboneEvents.mixin(obj);
    obj.on('all', function(event) {
      obj.counter++;
      if (event == 'a') a = true;
      if (event == 'b') b = true;
    })
    .trigger('a b');
    expect(a).ok;
    expect(b).ok;
    expect(obj.counter).eql(2);
  });

  it("on, then unbind all functions", function() {
    var obj = { counter: 0 };
    _.extend(obj,BackboneEvents);
    var callback = function() { obj.counter += 1; };
    obj.on('event', callback);
    obj.trigger('event');
    obj.off('event');
    obj.trigger('event');
    expect(obj.counter).eql(1);
  });

  it("bind two callbacks, unbind only one", function() {
    var obj = { counterA: 0, counterB: 0 };
    _.extend(obj,BackboneEvents);
    var callback = function() { obj.counterA += 1; };
    obj.on('event', callback);
    obj.on('event', function() { obj.counterB += 1; });
    obj.trigger('event');
    obj.off('event', callback);
    obj.trigger('event');
    expect(obj.counterA, 1);
    expect(obj.counterB, 2);
  });

  it("unbind a callback in the midst of it firing", function() {
    var obj = {counter: 0};
    BackboneEvents.mixin(obj);
    var callback = function() {
      obj.counter += 1;
      obj.off('event', callback);
    };
    obj.on('event', callback);
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    expect(obj.counter).eql(1, 'the callback should have been unbound.');
  });

  it("two binds that unbind themselves", function() {
    var obj = { counterA: 0, counterB: 0 };
    _.extend(obj,BackboneEvents);
    var incrA = function(){ obj.counterA += 1; obj.off('event', incrA); };
    var incrB = function(){ obj.counterB += 1; obj.off('event', incrB); };
    obj.on('event', incrA);
    obj.on('event', incrB);
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    expect(obj.counterA, 1);
    expect(obj.counterB, 1);
  });

  it("bind a callback with a supplied context", function () {
    var TestClass = function () {
      return this;
    };
    TestClass.prototype.assertTrue = function () {
      expect(true).ok;
    };

    var obj = _.extend({},BackboneEvents);
    obj.on('event', function () { this.assertTrue(); }, (new TestClass()));
    obj.trigger('event');
  });

  it("nested trigger with unbind", function () {
    var obj = { counter: 0 };
    BackboneEvents.mixin(obj);
    var incr1 = function(){ obj.counter += 1; obj.off('event', incr1); obj.trigger('event'); };
    var incr2 = function(){ obj.counter += 1; };
    obj.on('event', incr1);
    obj.on('event', incr2);
    obj.trigger('event');
    expect(obj.counter).eql(3, 'counter should have been incremented three times');
  });

  it("callback list is not altered during trigger", function () {
    var counter = 0, obj = _.extend({}, BackboneEvents);
    var incr = function(){ counter++; };
    obj.on('event', function(){ obj.on('event', incr).on('all', incr); })
    .trigger('event');
    expect(counter).eql(0);
    obj.off()
    .on('event', function(){ obj.off('event', incr).off('all', incr); })
    .on('event', incr)
    .on('all', incr)
    .trigger('event');
    expect(counter).eql(2);
  });

  it("#1282 - 'all' callback list is retrieved after each event.", function() {
    var counter = 0;
    var obj = BackboneEvents.mixin({});
    var incr = function(){ counter++; };
    obj.on('x', function() {
      obj.on('y', incr).on('all', incr);
    })
    .trigger('x y');
    expect(counter).eql(2);
  });

  it("if no callback is provided, `on` is a noop", function() {
    _.extend({}, BackboneEvents).on('test').trigger('test');
  });

  it("if callback is truthy but not a function, `on` should throw an error" +
     " just like jQuery",
    function() {
      var view = _.extend({}, BackboneEvents).on('test', 'noop');
      expect(function() {
        view.trigger('test');
      }).to.Throw(Error);
    });

  it("remove all events for a specific context", function() {
    var obj = BackboneEvents.mixin({});
    obj.on('x y all', function() { expect(true).ok; });
    obj.on('x y all', function() { expect(false).ok; }, obj);
    obj.off(null, null, obj);
    obj.trigger('x y');
  });

  it("remove all events for a specific callback", function() {
    var obj = BackboneEvents.mixin({});
    var success = function() { expect(true).ok; };
    var fail = function() { expect(false).ok; };
    obj.on('x y all', success);
    obj.on('x y all', fail);
    obj.off(null, fail);
    obj.trigger('x y');
  });

  it("#1310 - off does not skip consecutive events", function() {
    var obj = BackboneEvents.mixin({});
    obj.on('event', function() { expect(false).ok; }, obj);
    obj.on('event', function() { expect(false).ok; }, obj);
    obj.off(null, null, obj);
    obj.trigger('event');
  });

  it("once", function() {
    // Same as the previous test, but we use once rather than having to explicitly unbind
    var obj = { counterA: 0, counterB: 0 };
    BackboneEvents.mixin(obj);
    var incrA = function(){ obj.counterA += 1; obj.trigger('event'); };
    var incrB = function(){ obj.counterB += 1; };
    obj.once('event', incrA);
    obj.once('event', incrB);
    obj.trigger('event');
    expect(obj.counterA, 1, 'counterA should have only been incremented once.');
    expect(obj.counterB, 1, 'counterB should have only been incremented once.');
  });

  it("once variant one", function() {
    var f = function(){ expect(true).ok; };

    var a = _.extend({}, BackboneEvents).once('event', f);
    var b = _.extend({}, BackboneEvents).on('event', f);

    a.trigger('event');

    b.trigger('event');
    b.trigger('event');
  });

  it("once variant two", function() {
    var f = function(){ expect(true).ok; };
    var obj = BackboneEvents.mixin({});

    obj
      .once('event', f)
      .on('event', f)
      .trigger('event')
      .trigger('event');
  });

  it("once with off", function() {
    var f = function(){ expect(true).ok; };
    var obj = BackboneEvents.mixin({});

    obj.once('event', f);
    obj.off('event', f);
    obj.trigger('event');
  });

  it("once with event maps", function() {
    var obj = { counter: 0 };
    BackboneEvents.mixin(obj);

    var increment = function() {
      this.counter += 1;
    };

    obj.once({
      a: increment,
      b: increment,
      c: increment
    }, obj);

    obj.trigger('a');
    expect(obj.counter).eql(1);

    obj.trigger('a b');
    expect(obj.counter).eql(2);

    obj.trigger('c');
    expect(obj.counter).eql(3);

    obj.trigger('a b c');
    expect(obj.counter).eql(3);
  });

  it("once with off only by context", function() {
    var context = {};
    var obj = BackboneEvents.mixin({});
    obj.once('event', function(){ expect(false).ok; }, context);
    obj.off(null, null, context);
    obj.trigger('event');
  });

  it("once with asynchronous events", function(done) {
    var func = _.debounce(done, 50);
    var obj = _.extend({}, BackboneEvents).once('async', func);

    obj.trigger('async');
    obj.trigger('async');
  });

  it("once with multiple events.", function() {
    var obj = BackboneEvents.mixin({});
    obj.once('x y', function() { expect(true).ok; });
    obj.trigger('x y');
  });

  it("Off during iteration with once.", function() {
    var obj = BackboneEvents.mixin({});
    var f = function(){ this.off('event', f); };
    obj.on('event', f);
    obj.once('event', function(){});
    obj.on('event', function(){ expect(true).ok; });

    obj.trigger('event');
    obj.trigger('event');
  });

  it("once without a callback is a noop", function() {
    _.extend({}, BackboneEvents).once('event').trigger('event');
  });

  it("event functions are chainable", function() {
    var obj = BackboneEvents.mixin({});
    var obj2 = _.extend({}, BackboneEvents);
    var fn = function() {};
    expect(obj).eql(obj.trigger('noeventssetyet'));
    expect(obj).eql(obj.off('noeventssetyet'));
    expect(obj).eql(obj.stopListening('noeventssetyet'));
    expect(obj).eql(obj.on('a', fn));
    expect(obj).eql(obj.once('c', fn));
    expect(obj).eql(obj.trigger('a'));
    expect(obj).eql(obj.listenTo(obj2, 'a', fn));
    expect(obj).eql(obj.listenToOnce(obj2, 'b', fn));
    expect(obj).eql(obj.off('a c'));
    expect(obj).eql(obj.stopListening(obj2, 'a'));
    expect(obj).eql(obj.stopListening());
  });
});
