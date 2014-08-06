Biojs-vis-tree Component 
----------------

Version: 0.0.1

Biojs-vis-tree provides following methods for usage which can be called by using *biojs.vis.tree* as namespace: 
- Parse_newick(String) allows you to parse newick formatted strings into JSON files
- Tree() creates a tree object, which can be visualized by tree(document.getElementById(div))
- tree.data() binds the tree data (in JSON Format) into the tree
- Currently there are two different layouts available 
  - Radial which is stored in tree.layout.vertical()
  - Vertical which can be accessed in tree.layout.radial()

For further examples please have a look at snippets.
Tutorial is coming soon!

Biojs-vis-tree is based on the TnT Library
