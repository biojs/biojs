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


__PLEASE MOVE YOUR PACKAGE FOLDER TO A SEPARATE REPO__ 

(keeping them as a separate folder allows people to install directly from git)


You can browse the [registry](http://biojs.net/registry-ui/client/#/).


Documentation
--------------

We are working on a new platform [edu.biojs.net](http://edu.biojs.net/).
[Pull requests](https://github.com/biojs/tutorials) are welcome.

More detailed *documentation* and *tutorials* follow soo

Upgrading to BioJS 2.0
----

Old Components of BioJS 0.1 can rely on [biojs-legacy](http://edu.biojs.net/tutorials/aQuickGuideForMigrating.html). But we highly encourage you to write your code more modular.


FAQ
----

> What happened with the BioJS event system?

We realised that a custom (buggy) implentation of the Observer pattern is too hard to maintain. For more info see our [wiki](https://github.com/biojs/biojs2/wiki/Event-systems)

> How do I create a new package?

We have a [beginners guide](http://edu.biojs.net/tutorials/02_howtoCreate.html).

> Where should I publish my package on github?

We try to keep popular / "recommended" components under the biojs account (e.g `biojs-events`)
So just start with your own github account and wait until the community says it is "super-duper-mega-awesome-recomended". 

> How to name my package?

You are completely free to choose your own awesome name. However if you are a bit uncreative, you can adapt this naming convention (it helps you to be modular).

`biojs-[io/rest/vis/algo/...]-[name]`

- `io` for components which are responsible for parsing data into a specific format (aka parser)
- `vis` for components which are visualizing data sets
- `rest` for REST apis to databases
- `algo` for server/client side algorithms processing the data (e.g. alignments, neural networks, markov models, graph algorithms)

> How to setup continous integration (or how to get the fancy build badges)?

* new project -> github -> add your project
* choose node
* setup build script
```
npm install --silent
npm test
npm run build-browser
```
* change the nvm to node __0.10__
* artifcats: enter the relative dir of files that should be downloadable (e.g. `build/biojs_io_fasta.min.js`)
* get your badges

If you prefer Travis

Add a `.travis.yml` and add your project on Travis.
```
language: node_js
node_js:
  - "0.11"
  - "0.10"
```
(they automatically run `npm install` and `npm test`)

How to build a BioJS package
---------------

In the package folder

###1. Npm install
```
npm install
```

###2. Run tests

```
npm test
```

###3. Build the file for a browser

```
npm run build-browser
```

Working examples of the component can be found in the `snippets` folder of a package


How to setup npm 
--------------

For Mac Users


###1. Install homebrew

```sh
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

###2. Install node and npm
```sh
brew install node
```

###3. Clone our repository

```sh
git clone https://github.com/biojs/biojs2.git
```

That's it! Now you can build your component!
