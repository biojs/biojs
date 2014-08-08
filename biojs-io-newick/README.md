Newick-Parser for BioJS 2
----------
Just call Biojs.io.newick.newick() for parsing a newick string.
`Biojs.io.newick.newick('((A,B),C)');`

Call Biojs.io.newick.extended() for parsing an extended newick format.
`Biojs.io.newick.extended('((A,B),C)');`

Example tree (from http://en.wikipedia.org/wiki/Newick_format):

+--0.1--A
F-----0.2-----B            +-------0.3----C
+------------------0.5-----E
                           +---------0.4------D

Newick format:
(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;

Converted to JSON:
{
  name: "F",
  children: [
    {name: "A", branch_length: 0.1},
    {name: "B", branch_length: 0.2},
    {
      name: "E",
      length: 0.5,
      children: [
        {name: "C", branch_length: 0.3},
        {name: "D", branch_length: 0.4}
      ]
    }
  ]
}
 
