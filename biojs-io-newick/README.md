Newick-Parser for BioJS 2
----------
Just call Biojs.io.newick.newick(string) for parsing a newick string. 

```javascript
Biojs.io.newick.newick('((A,B),C)');
```

Call Biojs.io.newick.extended(string) for parsing an extended newick format.

```javascript
Biojs.io.newick.extended('((A,B),C)');
```

Example tree (from http://en.wikipedia.org/wiki/Newick_format):

Newick format:

`(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F`

Converted to JSON:

```javascript
{name : "F",
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
```
