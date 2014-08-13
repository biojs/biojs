if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.vis === 'undefined') {
  module.exports = biojs.util = {}
}
biojs.util.area_selector = require('./')
