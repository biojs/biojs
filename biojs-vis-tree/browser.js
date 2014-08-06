//biojs-vis-tree is proudly based on code by Miguel Pignatellis TnT Library and edited for npm using CJS

if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.vis === 'undefined') {
  module.exports = biojs.vis = {}
}
biojs.vis.tree = require('./')
