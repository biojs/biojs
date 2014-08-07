if (typeof biojs === 'undefined') {
  module.exports = biojs = {}
}
if (typeof biojs.vis === 'undefined') {
  biojs.vis = {}
}
biojs.vis.sequence = require('./');

// legacy code - only add if absolutely needed
if (typeof Biojs === 'undefined') {
  module.exports = Biojs = {}
}

Biojs.Sequence = require('./');
