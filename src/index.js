/*
* Welcome to the biojs tutorial. 
* Can you build a parser for counting the number of appearances for each country in the data set?
*/


var biojs = {}

biojs.graduates = function() {
    
    var data = ["greenify:DE","daviddao:HK","mhelvens:NL","timruffles:UK","iriscshih:TW"];
    var graduates = {};

    // count countries
    for (var i = 0; i < data.length; i++) {
        // Please fill in your code here! 
    }

    console.log(graduates); 
}

biojs.graduates(); //Should print {DE: 1, HK: 1, NL: 1, UK: 1, TW: 1}


//module.exports = biojs; //Uncomment this to export the object for other biojs components!