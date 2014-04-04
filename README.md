# Overview
The aim of this project is to create a library of graphical components easy to reuse to represent biological information. A library easy to maintain and develop by identifying minimal functional units that could be used as building blocks for more complex applications. A browser independent JavaScript library easy to integrate in web applications regardless the programming language used to develop the server side.

* [Registry of components](http://www.ebi.ac.uk/Tools/biojs/registry)
* [Documentation for developers](https://github.com/biojs/biojs/wiki/Documentation)

# Objectives
* Represent consistently biological information across different projects
* Ease discovery, test and integration of graphical components
* Standardize and facilitate components development

# Use a BioJS component
* Search and select a component in a BioJS registry. i.e. [EBI BioJS registry](http://www.ebi.ac.uk/Tools/biojs/registry/components.html)
* Look at the "overview" section to see an example of how a component works
* Check the "options", "methods" and "events" sections to see more information about the functionality provided by a component
* Find inside the "installation" section the code and dependencies you will need to make a component working in a web page

# Develop a component
BioJS components are framework agnostic, only requiring the code to be written in JavaScript. The developer of a new component is thus free to use any framework (e.g. [JQuery](http://jquery.com/), [YUI](http://yuilibrary.com/)) and to include any other library (e.g. [Raphael](http://raphaeljs.com/), [D3](http://d3js.org/)).

Any component by definition extends the BioJS reference implementation incorporating the rules provided by the [BioJS specification](https://docs.google.com/document/d/1gG036Bvwl4i-KX5BTHddGzeE_5eospL-864BrnsAS_s/edit). The BioJS specification defines:

* the component architecture
* a protocol to handle events that allows communication between components
* the component extension through Object Oriented Inheritance
* the code documentation format
* documentation on how to include examples to test the component functionality

# Create a new component from scratch

We would recommend you to follow our [tutorials](https://github.com/biojs/biojs/wiki/Documentation#tutorials) and read the [BioJS documentation](https://github.com/biojs/biojs/wiki/Documentation).

Visualization components can be as complex as you want. However we encourage you to identify the minimal parts that make sense to isolate building components that can be reused independently or as a part of another more complex components.

Before coding we suggest to collect [requirements](https://github.com/biojs/biojs/wiki/Documentation#requirements) that will help you to think about how to implement a component. You could use our [template](https://docs.google.com/document/d/1LLyUK0jEc8KXAtlmUc7vX68wvR3k8AoSdkLVSKcK1M0/edit) to collect requirements or you could follow your own. If would like to share your requirements document we will be happy to include it in the list of component requirements.

# Wrap JavaScript functionality as BioJS

If you already have some JavaScript functionality you could make it BioJS creating a wrapper on top of it. A wrapper is simply a new BioJS components using your JavaScript functionality as a dependency. We do not have a specific tutorial for this, but you could use the tutorials we have to create a component.

# Feedback
Please feel free to send us feature requests and/or ideas of what it should be considered in the development of BioJS through the [issue tracker](https://github.com/biojs/biojs/issues) or the [BioJS mailing list](https://groups.google.com/forum/#!forum/biojs).

Join the BioJS mailing list if you would like to send us an email to participate or provide feedback about the project.

# Code license
[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) 

