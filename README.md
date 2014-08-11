BioJS 2.0
=========

```

88888888ba  88                     88  ad88888ba      ad888888b,  
88      "8b ""                     88 d8"     "8b    d8"     "88  
88      ,8P                        88 Y8,                    a8P  
88aaaaaa8P' 88  ,adPPYba,          88 `Y8aaaaa,           ,d8P"   
88""""""8b, 88 a8"     "8a         88   `"""""8b,       a8P"      
88      `8b 88 8b       d8         88         `8b     a8P'        
88      a8P 88 "8a,   ,a8" 88,   ,d88 Y8a     a8P    d8"          
88888888P"  88  `"YbbdP"'   "Y8888P"   "Y88888P"     88888888888 

 ```

__WARNING__: this is work in progress and NOT in production yet.


Currently every folder is a seperate npm package (to ease development). Every folder will be __moved to a seperate repo__ soon.



Version
----

2.0

Current Features of BioJS 2.0
----
- REST APIs can be found in biojs-rest
 - REST API for Ensembl 
- Parsers can be found in biojs-io
 - Newick parser
 - Extended Newick parser
 - Clustal parser
 - Fasta parser
- Visualizations can be found in biojs-vis
 - HPA Feature Viewer 
 - Multiple Sequence Alignment Viewer
 - Phylogenetic Tree Viewer
 - Gene Track Viewer (under construction)

Old Components of BioJS 0.1 will rely on biojs-legacy

How to setup BioJS 
--------------

For Mac Users

###1. Clone our repository

```sh
git clone https://github.com/biojs/biojs2.git
```

 
###2. Install homebrew

```sh
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

###3. Install node and npm
```sh
brew install node
```

That's it! Now you can build your component!

----

How to build a BioJS package
---------------

###1. Go into the package folder
```sh
cd [Package Destination]
```

###2. Npm install
```
npm install
```

###3. Run tests

```
npm test
```

###4. Build the file for a browser

```
npm run build-browser
```

Working examples of the component can be found in the *snippet folder* of each package


Demos
----------------

###[Sample for biojs-vis-tree](http://edu.biojs.net/treeviewer.html)


###[Sample for biojs-vis-msa](http://edu.biojs.net/msa.html)


Documentation & Tutorials
-----------------

More detailed *Documentation* and *Tutorials* follow soon on [edu.biojs.net](http://edu.biojs.net/)
