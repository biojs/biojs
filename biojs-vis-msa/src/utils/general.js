var Utils = {};

/**
 * Remove an element and provide a function that inserts it into its original position
 * https://developers.google.com/speed/articles/javascript-dom
 * @param element {Element} The element to be temporarily removed
 * @return {Function} A function that inserts the element into its original position
 **/
Utils.removeToInsertLater = function(element) {
  var parentNode = element.parentNode;
  var nextSibling = element.nextSibling;
  parentNode.removeChild(element);
  return function() {
    if (nextSibling) {
      parentNode.insertBefore(element, nextSibling);
    } else {
      parentNode.appendChild(element);
    }
  };
};

/**
 * fastest possible way to destroy all sub nodes (aka childs) 
 * http://jsperf.com/innerhtml-vs-removechild/15
 * @param element {Element} The element for which all childs should be removed
 */
Utils.removeAllChilds = function (element){
  var count = 0;
  while (element.firstChild) {
    count++;
    element.removeChild(element.firstChild);
  }
};

/*
 * renders the color string nicely
 */
Utils.rgb = function (r,g,b) {
  // we use the overloaded, shorthand form (color)
  if( typeof g === "undefined"){
    return Utils.rgb(r.r,r.g,r.b);
  }
  return ["rgb(", [(r||0),(g||0),(b||0)].join(','), ')'].join();
};

Utils.rgba = function (r,g,b,a) {
  // we use the overloaded, shorthand form (color, a)
  if( typeof b === "undefined"){
    return Utils.rgba(r.r,r.g,r.b,g);
  }
  return ["rgba(", [(r||0),(g||0),(b||0), (a||1)].join(','), ')'].join("");
};

Utils.hex2rgb = function(hex){
  var bigint = parseInt(hex, 16);
  if( !isNaN(bigint)){
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {"r":r ,"g": g ,"b": b};
  }else{
    if( hex === "red"){
      return {"r":255 ,"g": 0 ,"b": 0};
    } else if( hex === "green"){
      return {"r":0,"g": 255 ,"b": 0};
    } else if( hex === "blue"){
      return {"r":0,"g": 0 ,"b": 255};
    }
  }
};

Utils.rgb2hex = function (rgb){
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
};

Utils.splitNChars = function(txt, num) {
  var result = [];
  for (var i = 0; i < txt.length; i += num) {
    result.push(txt.substr(i, num));
  }
  return result;
};

// count a associative array
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)){
      size++;
    }
  }
  return size;
};

module.exports = Utils;
