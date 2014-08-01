module.exports.newick = require('./newick');
module.exports.extended = require('./extended_newick');

var x = parse_newick('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;');
console.log(x.name);
