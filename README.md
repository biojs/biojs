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

You can already browse the new [registry](http://biojs.net/registry-ui/client/#/). Transition of components from BioJS1 is in progress.

We recently switched to a new concept, so maybe you are looking for the old [BioJS 1](https://github.com/biojs/biojs1)?


Documentation
--------------

We are working on a new platform [edu.biojs.net](http://edu.biojs.net/).
[Pull requests](https://github.com/biojs/tutorials) are welcome.

For beginners there is a [BioJS 2 101 tutorial series](http://edu.biojs.net/categories/101_tutorial/index.html).
For a quick migration to BioJS 2 we created [this document](http://edu.biojs.net/tutorials/aQuickGuideForMigrating.html).


What do I need?
---------------

* [git](https://try.github.io/levels/1/challenges/1)
* npm


How to use a package?
---------------------

Normally the author provides you with a minimized version of his component, for convenience we also maintain meta packages where we bundle several packages and put them on a CDN for super-fast loading (coming soon).

In general the README.md of each project should explain you how to interact with it. Furthermore we have a few guidelines like 

* (biojs-events)[https://github.com/biojs/biojs-events] (Convention for the Observer pattern)
* (example snippets)[https://github.com/greenify/biojs-sniper] (coming soon: snippets on JSBin)

Especially the snippets should give you a quick start on how to use a component.

How to build a BioJS package
----------------------------

In the package folder

```
npm install # this downloads all the dependencies of a package
npm test # optional
npm run build-browser # this will generate a JS file usuable in every browser (normally in build)
```

Working examples of the component can be found in the [`snippets`](https://github.com/greenify/biojs-sniper) folder of a package.


How to create a package?
-------------------------

-> read our [guide](http://edu.biojs.net/).


How to publish a package?
-------------------------

Publish it on [npm](npmjs.org) and just send us a pull request to the [index.toml](https://github.com/biojs/registry/blob/master/index.toml).


Install npm
--------------

Mac Users


```sh
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"  # this installs homebrew (package manager)
brew install node # now we install the npm package
```

[Extended guide](http://edu.biojs.net/series/101_graduate/02_getting_started.html)


Upgrading to BioJS 2.0
----

Old Components of BioJS 0.1 can rely on [biojs-legacy](http://edu.biojs.net/tutorials/aQuickGuideForMigrating.html). But we highly encourage you to write your code more modular.
