/*
* Welcome to the biojs tutorial. 
* You can find the documentation about this tutorial here
* http://edu.biojs.net/categories/101_tutorial/index.html
*
* Can you build a parser to analyze this snippet file?
*/


var snipspector = {};

snipspector.parse = function() {
    
    var data = ["rs5747620	20	15412698	TT",
    "rs9605903	20	15434720	CC",
    "rs2236639	20	15452483	GC",
    "rs5747999	21	15455353	AA",
    "rs11089263	21	15467656	A-",
    "rs2096537	21	15474749	AC",
    "rs9604959	22	15479107	CG",
    "rs9604967	22	15492342	CC"];

    var parsed = {};

    // analyze snippets
    // homo(zygous): AA
    // hetero(zygous): AC
    // del(etion): A-, -A or --
    for (var i = 0; i < data.length; i++) {
        // Please fill in your code here! 
    }

    console.log(parsed); 

    return parsed;
}

snipspector.parse(); //Should print [{name: "20", homo: 2, hetero: 1, del: 0,
                     // {name: "21", homo: 1, hetero: 1, del: 1}, 
                     // {name: "22", homo 1, hetero: 1, del: 0 }]


module.exports = snipspector; // Export the object for other components
