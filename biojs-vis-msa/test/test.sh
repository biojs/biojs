#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 1) run the normal mocha tests
mocha -R spec --compilers coffee:coffee-script/register -u qunit "$DIR"/mocha

# 2) run the client-side phantom stuff

# 2.1) compile coffee

browserify -t coffeeify --extension='.coffee' "$DIR"/tests/*.coffee > "$DIR"/all_test.js

# 2.2) run phantom

mocha-phantomjs "$DIR"/index.html
