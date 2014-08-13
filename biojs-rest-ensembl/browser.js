if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.rest === 'undefined') {
  module.exports = biojs.rest = {}
}
biojs.rest.ensembl = require('./')
