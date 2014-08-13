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
