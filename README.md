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

[![Version](http://img.shields.io/badge/npm-v2.0.0_alpha-orange.svg?style=flat)](#) [![Build Status](http://img.shields.io/travis/biojs/edu.svg?style=flat)](https://travis-ci.org/biojs/edu)  [![License: Apache 2](http://img.shields.io/hexpm/l/plug.svg?style=flat)](https://github.com/biojs/biojs/blob/master/LICENSE) [![DOI](https://zenodo.org/badge/6143/biojs/biojs.png)](http://dx.doi.org/10.5281/zenodo.11893)

Announcements
----------------

We recently switched to a new concept, so maybe you are looking for the old [BioJS 1](https://github.com/biojs/biojs1)?

You can already browse the new [registry][registry]. Transition of components from BioJS1 is in progress.

Contents
----------


1. [Essentials](#1-essentials)  
 1.1. [Objectives](#11-objectives)    
 1.2. [What is BioJS](#12-what-is-biojs)  
 1.3. [Why is nothing in this repo](#13-why-is-nothing-in-this-repo)  
* [BioJS 1 vs.  BioJS 2](#2-biojs-1-vs-biojs-2)  
  2.1 [What is different in BioJS 2.0?](21-what-is-different-in-biojs-20)  
  2.2 [Upgrading to BioJS 2.0](#22-upgrading-to-biojs-20)  
* [Packages](#3-packages)  
  3.1. [What is a package?](#31-what-is-a-package)  
  3.2. [How to search for a package](#32-how-to-search-for-a-package)  
  3.3. [What do I need to use a package?](#33-what-do-i-need-to-use-a-package)   
  3.4. [How do I use a package?](#34-how-do-i-use-a-package)  
  3.5. [How to build a BioJS package](#35-how-to-build-a-biojs-package)  
* [Developing packages](#4-developing-packages)  
  4.1. [What do I need to develop?](#41-what-do-i-need-to-develop)  
  4.2. [How to create a package?](#42-how-to-create-a-package)  
  4.3. [How to use snippets?](#43-how-to-use-snippets)  
  4.4. [Guidelines](#44-guidelines)  
  4.5. [Gold standards](#45-gold-standards)  
  4.6. [How to publish a package?](#46-how-to-publish-a-package) 
* [Support](#5-support) 
  5.1  [Get involved](#51-get-involved)
  5.2. [Contact](#52-contact)  
  5.3. [Documentation](#53-documentation)
* [License](#6-license)  

1. Essentials
--------------

### 1.1. Objectives

* Represent consistently biological information across different projects
* Ease discovery, test and integration of graphical components
* Standardize and facilitate components development

### 1.2. What is BioJS?


BioJS builds a infrastructure, guidelines and tools to __avoid the reinvention of the wheel in life sciences__(= "Docker for Bio web components"). Our community builds modules than can be reused by anyone.

### 1.3. Why is nothing in this repo?

For BioJS 2.0 every component is a separate github repository. To search for a package, visit our [registry][registry].
This repo is kept as intro guide and discussion repo. Feel free to open an [issue][issue] (questions, suggestions, proposal or bug reports) here).
However you are still invited to show your interest in this project and to __star__ this repo.

2. BioJS 1 vs.  BioJS 2
-----------------------

### 2.1. What is different in BioJS 2.0?


↝ [Summary presentation](https://docs.google.com/presentation/d/17Q4olwMEd0hFKa0MA01Dx9RHEWbNiI1hJ0Ng2v_1D30/) of the differences between BioJS1 and BioJS 2.0.

### 2.2 Upgrading to BioJS 2.0

Old Components of BioJS 0.1 can rely on [biojs-legacy][migrationguide], but we highly encourage you to write your code more [modular][101].

↝ [Modular migration guide][migration]

We can ensure that if you have contributed with a component in the BioJS1 registry, it will continue to work in BioJS2.
In fact we will script the migration and at some day in November or December migrate all remaining BioJS1 components.
The final update of the EBI registry will be at the end of this year.

3. Packages
-------------

### 3.1. What is a package?

A __tiny building block__ like a FASTA parser or a visualization piece. If it obeys the rule _"do one thing and do it well"_ , then it is (most likely) a package. The BioJS packages are published on the JavaScript package manager [npm](npmjs.org).

## 3.2. How to search for a package

[registry.biojs.net](http://registry.biojs.net)

([Frontend repo][registryui], [backend][registry-workmen]).


### 3.3. What do I need to use a package?

A web browser. For convenience you can grab a recent CDN version of

* [all parsers](https://github.com/biojs/biojs-meta-parser)
* [all visualization components](https://github.com/biojs/biojs-meta-vis)

Normally the author provides also provides you with a minimized version of his component, but you can always easily build it yourself by running "npm run build-browser".

### 3.4. How do I use a package?

In general the `README.md` of each project should explain you how to interact with it.
For visualization components you can just copy the JSBin or Codepen example.

You can also add it as a dependency of your project by using `npm install <package> --save`.

### 3.5. How to build a BioJS package

Clone the package an run

```
npm install # this downloads all the dependencies of a package
npm test # optional
npm run build-browser # this will generate a JS file usuable in every browser (normally in the build folder)
```

Working examples of the component can be found in the [`snippets`](https://github.com/greenify/biojs-sniper) folder of a package.


4. Developing packages
-----------------------

### 4.1. What do I need to develop?

* [git](https://try.github.io/levels/1/challenges/1)
* [npm](http://nodejs.org/download/)


[Detailed installation instructions](http://edu.biojs.net/series/101/20_getting_started.html).

Even tough you can easily install node on Windows, a Unix-like OS is generally a more productive development enviroment.

### 4.2. How to create a package?

↝ read our [guide][101]

To bootstrap a new project you can use the BioJS [slush generator](https://github.com/biojs/slush-biojs).

```
npm install -g slush slush-biojs
mkdir biojsAWesome && cd biojsAwesome
slush biojs
```

### 4.3. How to use snippets?

↝ read our [sniper][sniper].

### 4.4. Guidelines

We have a few guidelines like 

* [biojs-events](https://github.com/biojs/biojs-events) (Convention for the Observer pattern)
* [example snippets][sniper]

Especially the snippets should give you a quick start on how to use a component.

### 4.5. Gold standards

Our [gold standards](http://edu.biojs.net/series/101/70_gold_standard.html) are conventions we highly encourage you to follow (especially for JS beginners). They will help you to create a great package!

### 4.6. How to publish a package?

Publish it on [npm](npmjs.org) and add `biojs` as keyword ([more info][publishit]).
(For visualization snippets, see the [sniper][sniper]).

5. Support
--------

### 5.1. Get involved

Whether you want to [write your own component](#4-developing-packages) and just [submit](#46-how-to-publish-a-package) it onto our BioJS registry or help to increase our ecosystem -  we also __value__ contributions :)

↝ [Get involved](http://biojs.net/get_involved.html)

### 5.2. Contact

↝ [There are many ways to contact us](http://biojs.net/get_involved.html)

For technical queries (questions, suggestions, proposal or bug reports) [Github issues](https://github.com/biojs/biojs/issues) are preferred.

### 5.3. Documentation

* We maintain a learning platform [edu.biojs.net](http://edu.biojs.net/).

[Pull requests](https://github.com/biojs/tutorials) are welcome.

Contents:
  - [BioJS 2 101 tutorial series][101].

There is also a community-based [wiki][wiki]:

 - [Common error messages](https://github.com/biojs/biojs/wiki/Common-error-messages)
 - [FAQ](https://github.com/biojs/biojs/wiki/FAQ)
 - [Migration][migration]

6. License
----------

[Apache 2](http://www.apache.org/licenses/LICENSE-2.0)


[101]: http://edu.biojs.net/categories/101_tutorial/index.html
[issue]: https://github.com/biojs/biojs/issues
[migrationguide]: http://edu.biojs.net/tutorials/aQuickGuideForMigrating.html
[publishit]: http://edu.biojs.net/series/101/60_publish_it.html
[migration]: https://github.com/biojs/biojs/wiki/biojs1-biojs2-migration
[registry]: http://registry.biojs.net/client/
[registryui]: https://github.com/biojs/registry-ui
[registry-workmen]: https://github.com/biojs/registry-workmen
[sniper]: https://github.com/greenify/biojs-sniper
[wiki]: (https://github.com/biojs/biojs/wiki)
