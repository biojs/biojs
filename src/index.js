/*
* Welcome to the biojs tutorial. 
* Can you build a parser for counting the number of appearances for each country in the data set?
*/


var graduates = {};

graduates.parse = function() {
    
    var data = ["greenify:DE","daviddao:HK","mhelvens:NL","timruffles:UK","iriscshih:TW"];
    var parsed = {};

    // count countries
    for (var i = 0; i < data.length; i++) {
        // Please fill in your code here! 
    }

    console.log(parsed); 

    return parsed;
}

graduates.parse(); //Should print {DE: 1, HK: 1, NL: 1, UK: 1, TW: 1}


module.exports = graduates; // Export the object for other components
