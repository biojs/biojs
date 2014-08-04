/*
 * grunt-smash
 * https://github.com/cvisco/grunt-smash
 *
 * Copyright (c) 2013 Casey Visco
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('smash', 'Smash together files.', function() {

    var smash = require("smash");
    var queue = require("queue-async");

    // Let grunt know this is an asynchronous task
    var done = this.async();

    // Create a queue with a parallelism of 1, so we'll process each
    // target one at a time.
    var q = queue(1);

    // Iterate over the file targets
    this.files.forEach(function(f) {

      // Smash returns a readable stream object. We'll queue it so that
      // we can read the data as it comes in and write our output file
      // to disk once complete.
      q.defer(function (callback) {

        var s = smash(f.src);
        var content = "";

        s.on('data', function (chunk) {
          content += chunk;
        });

        s.on('end', function () {
          grunt.file.write(f.dest, content);
          grunt.log.writeln('File "' + f.dest + '" created.');
          callback();
        });

      });

    });

    // Notify grunt that we're done only when everything in the queue
    // has finished
    q.awaitAll(done);

  });

};
