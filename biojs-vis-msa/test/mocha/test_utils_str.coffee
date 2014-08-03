Str = require "../../src/utils/strings"
assert = require "assert"
require 'mocha'

suite "utils.string"

test "str contains", ->

  assert.equal false, Str.contains "a", "b"
  assert.equal true, Str.contains "a", "a"

  assert.equal true, Str.contains "xxbaxx", "ba"
  assert.equal false, Str.contains "xxbaxx", "c"

  assert.equal false, Str.contains "", "a"
