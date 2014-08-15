BioJS Newick Parser 
----------
Just call method `parse_nwk(string)` for parsing a newick string into JSON. 

```javascript
Biojs.io.newick.parse_nwk('((A,B),C)');
```

Call the method `parse_nhx(string)` for parsing an extended newick formats into JSON.

```javascript
Biojs.io.newick.parse_nhx('((A,B),C)');
```

[Example tree](http://en.wikipedia.org/wiki/Newick_format):

Newick format:

```sh
(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F
```

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
