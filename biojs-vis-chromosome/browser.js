if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.vis === 'undefined') {
  module.exports = biojs.vis = {}
}
biojs.vis.chromosome = require('./')
