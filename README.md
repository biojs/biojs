BioJS 2.0
=========

```

88888888ba  88                     88  ad88888ba      ad888888b,  
88      "8b ""                     88 d8"     "8b    d8"     "88  
88      ,8P                        88 Y8,                    a8P  
88aaaaaa8P' 88  ,adPPYba,          88 `Y8aaaaa,           ,d8P"   
88""""""8b, 88 a8"     "8a         88   `"""""8b,       a8P"      
88      `8b 88 8b       d8         88         `8b     a8P'        
88      a8P 88 "8a,   ,a8" 88,   ,d88 Y8a     a8P    d8i"          
88888888P"  88  `"YbbdP"'   "Y8888P"   "Y88888P"     88888888888 

 ```

[![Version](http://img.shields.io/badge/npm-v2.0.0_alpha-orange.svg?style=flat)](#) [![Build Status](http://img.shields.io/travis/biojs/edu.svg?style=flat)](https://travis-ci.org/biojs/edu)  [![License: Apache 2](http://img.shields.io/hexpm/l/plug.svg?style=flat)](https://github.com/biojs/biojs/blob/master/LICENSE) [![DOI](https://zenodo.org/badge/6143/biojs/biojs.png)](http://dx.doi.org/10.5281/zenodo.11893)

[![Slack](https://img.shields.io/badge/slack-join%20chat-E01563.svg)](http://biojs-slackin.herokuapp.com/)
[![Gitter](https://badges.gitter.im/BioJS.png)](https://gitter.im/biojs/biojs)   [![IRC](https://img.shields.io/badge/irc-%23biojs-yellow.svg)](https://kiwiirc.com/client/irc.freenode.net/biojs)


**TL;DR:** you can browse the [registry][registry] at [biojs.net][registry].

*Guy Yachdav, Tatyana Goldberg, Sebastian Wilzbach, David Dao, Iris Shih, Saket Choudhary, Steve Crouch, Max Franz, Alexander García, Leyla J García, Björn A Grüning, Devasena Inupakutika, Ian Sillitoe, Anil S Thanki, Bruno Vieira, José M Villaveces, Maria V Schneider, Suzanna Lewis, Steve Pettifer, Burkhard Rost, and Manuel Corpas*  
__[Anatomy of BioJS, an open source community for the life sciences][BioJS-elife]__  
eLife 2015;4:e07009
[BioJS-elife]: http://elifesciences.org/content/4/e07009

Contents
----------

1. [Essentials](#1-essentials)  
 1.1. [Objectives](#11-objectives)    
 1.2. [What is BioJS](#12-what-is-biojs)  
 1.3. [Why is there nothing in this repo?](#13-why-is-there-nothing-in-this-repo)  
* [Packages](#2-packages)  
  2.1. [What is a package?](#21-what-is-a-package)  
  2.2. [How to search for a package](#22-how-to-search-for-a-package)  
* [Developing packages](#3-developing-packages)  
  3.1. [What do I need to develop?](#31-what-do-i-need-to-develop)  
  3.2. [How to create a package?](#32-how-to-create-a-package)  
  3.3. [How to use snippets/examples?](#33-how-to-use-snippets)  
  3.4. [Guidelines](#34-guidelines)  
  3.5  [I need the functionality X](#35-i-need-the-functionality-x)  
  3.6. [Gold standards](#36-gold-standards)    
  3.7. [How to publish a package?](#37-how-to-publish-a-package)   
* [Support](#4-support)  
  4.1  [Get involved](#41-get-involved)  
  4.2. [Contact](#42-contact)   
  4.3. [More questions?](#43-more-questions)  
  4.4. [Documentation](#44-documentation)  
* [License](#5-license)  

1. Essentials
--------------

### 1.1. Objectives

* Represent consistently biological information across different projects
* Ease discovery, test and integration of graphical components
* Standardize and facilitate components development

### 1.2. What is BioJS?

BioJS builds a infrastructure, guidelines and tools to __avoid the reinvention of the wheel in life sciences__ (= "Docker for Bio web components"). Our community builds modules than can be reused by anyone and makes them available for download via a centralised [registry][registry].

### 1.3. Why is there nothing in this repo?

For BioJS 2.0 every component is a separate github repository. To search for a package, visit our [registry][registry].
This repo is kept as intro guide and discussion repo. Feel free to open an [issue][issue] (questions, suggestions, proposal or bug reports here) or [to submit a component wish][wishlist].

However you are still invited to show your interest in this project by __starring__ this repo.

2. Packages
-------------

### 2.1. What is a package?

A __tiny building block__ like a FASTA parser or a visualization piece. If it obeys the rule _"do one thing and do it well"_ , then it is (most likely) a package. The BioJS packages are published on the JavaScript package manager [npm](npmjs.org).

## 2.2. How to search for a package

Visit the [biojs.net][registry] registry to search for components. 

(Find it on github: [Frontend repo][registryui], [backend repo][registry-workmen]).

3. Developing packages
-----------------------

### 3.1. What do I need to develop?

* [git](https://try.github.io/levels/1/challenges/1)
* [npm](http://nodejs.org/download/)


[Detailed installation instructions](http://edu.biojs.net/101/getting_started).

Even tough you can easily install node on Windows, a Unix-like OS is generally a more productive development enviroment.

### 3.2. How to create a package?

↝ read our [guide][101]

To bootstrap a new project you can use the BioJS [slush generator](https://github.com/biojs/slush-biojs).

```
npm install -g slush slush-biojs
mkdir biojsAWesome && cd biojsAwesome
slush biojs
```

### 3.3. How to use snippets/examples?

↝ read our [sniper][sniper].

### 3.4  Guidelines <a name=guidelines></a>

* [Events](https://github.com/biojs/biojs/wiki/BioJS-events) (Convention for the [Observer](https://github.com/biojs/biojs-events) pattern)
* [CSS dependencies](https://github.com/biojs/biojs/wiki/Adding-CSS-stylesheets)
* [JS dependencies](https://github.com/biojs/biojs/wiki/I-need-a-npm-module-for-X) (=npm packages)
* [Reusable modules](https://github.com/biojs/biojs/wiki/Gotchas-about-reusability)
* [example snippets][sniper]

Especially the snippets should give one a quick start on how to use a component.

### 3.5. I need the functionality X

You are now ready to enjoy the benefits of npm. For common use cases (requests, drag and drop, promises) you will always find plenty of npm modules.

↝ [Learn more](https://github.com/biojs/biojs/wiki/I-need-a-npm-module-for-X)

### 3.6. Gold standards

Our [gold standards](http://edu.biojs.net/details/conventions) are conventions we highly encourage you to follow (especially for JS beginners). They will help you to create a great package!

### 3.7. How to publish a package?

Just publish it on [npm](npmjs.org).

↝ [Learn more](https://github.com/biojs/biojs/wiki/Gotchas-about-the-BioJS-registry)

### 3.8. How can I report defective components?

We'd recommend opening an issue in their repository directly. 

4. Support
----------

### 4.1. Get involved

Whether you want to [write your own component](#4-developing-packages) and just [submit](#46-how-to-publish-a-package) it onto our BioJS registry or help to increase our ecosystem -  we __value__ your contribution(s)!

↝ [Get involved](http://biojs.net/get_involved.html)

Here are some general ideas:

* Browse our [issue list](https://github.com/biojs/organisation/issues)
* Ask on [gitter](https://gitter.im/biojs/biojs)

↝ [more information](./CONTRIBUTING.md)

### 4.2. Contact

↝ [There are many ways to contact us](http://biojs.net/get_involved.html)

For technical queries (questions, suggestions, proposal or bug reports) [Github issues](https://github.com/biojs/biojs/issues) are preferred.

### 4.3. More questions

↝ We have a community-based [wiki][wiki].
Some topics include:

 - [Common error messages](https://github.com/biojs/biojs/wiki/Common-error-messages)
 - [FAQ](https://github.com/biojs/biojs/wiki/FAQ)
 - [Migration][migration]

### 4.4. Documentation

We maintain a learning platform [edu.biojs.net](http://edu.biojs.net/).

[Pull requests](https://github.com/biojs/tutorials) are welcome.

Contents:
  - [BioJS 2 101 tutorial series][101].

5. License
----------

[Apache 2](http://www.apache.org/licenses/LICENSE-2.0)


[101]: http://edu.biojs.net/101/intro
[gitter]: https://gitter.im/biojs/biojs
[groups]: https://groups.google.com/forum/#!forum/biojs
[irc]: http://webchat.freenode.net/?channels=biojs 
[issue]: https://github.com/biojs/biojs/issues
[issues_all]: https://github.com/search?l=&o=desc&q=user%3Abiojs+state%3Aopen&ref=advsearch&s=created&type=Issues&utf8=%E2%9C%93 
[publishit]: http://edu.biojs.net/101/publish_it
[migration]: https://github.com/biojs/biojs/wiki/biojs1-biojs2-migration
[registry]: http://biojs.net
[registryui]: https://github.com/biojs/biojs-frontend
[registry-workmen]: https://github.com/biojs/biojs-backend
[sniper]: https://github.com/greenify/biojs-sniper
[wiki]: https://github.com/biojs/biojs/wiki
[wishlist]: https://github.com/biojs/biojs/issues/new?title=%5BWish%5D&body=%3E+Try+to+be+as+detailed+as+possible.+Why+do+you+need+it%3F+What+data+does+it+use%3F+What+should+the+user+experience%3F%0A%0A%0A%3E+Complexity+%28approx.+estimate+in+dates%29
