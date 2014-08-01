var fs = require('fs')
var split = require('split')

var template = require('../')
var should = require('should')

require('mocha')

describe("Greet", function() {

  var greetings
  var result = [
    {"greeting":"Hello World"},
    {"greeting":"Hello Foo"}
  ]
  function test(cb) {
    return function() {
      greetings.should.eql(result)
      cb()
    }
  }

  it("should take a name argument and return object with greeting", function(done) {
    template.greet('World').on('data', function(data) {
      data.should.eql({"greeting":"Hello World"})
      done()
    })
  })

  it("should write to stream and return objects with greetings", function(done) {
    var greet = template.greet()
    greet.on('data', function(data) { greetings.push(data) })
    greet.on('end', test(done))
    greetings = []
    greet.write('World')
    greet.write('Foo')
    greet.end()
  })

  it("should pipe to stream and return objects with greetings", function(done) {
    var greet = template.greet()
    greet.on('data', function(data) { greetings.push(data) })
    greet.on('end', test(done))
    greetings = []
    fs.createReadStream('./test/names.txt')
    .pipe(split())
    .pipe(greet)
  })
})
