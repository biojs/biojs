/*
 * index.js imports all files which are required in './src/index.js'
 * it is then used by browser.js and browserify to compile a min.js file in the build folder
 */
module.exports = require('./src/jquery.watcher');
module.exports = require('./src/area_selector');
