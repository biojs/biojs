/*
 * BioJS 2 Template
 * written by David Dao
 *
 * browser.js compiles your final BioJS component! 
 * Run the npm script 'build browser' via the command line : npm run build-browser
 * The compiled file biojs-template.min.js can be then found in the build folder
 * */

if (typeof biojs === 'undefined') {
  module.exports = biojs = {} //Creates namespace biojs
}

biojs.template = require('./') //Looks up the ./index.js file and add all functionality to biojs.template
