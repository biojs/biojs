define ["cs!utils/strings"], (Str) ->

  module "utils.string"

  test "str contains", ->

    equal false, Str.contains "a", "b"
    equal true, Str.contains "a", "a"

    equal true, Str.contains "xxbaxx", "ba"
    equal false, Str.contains "xxbaxx", "c"

    equal false, Str.contains "", "a"
