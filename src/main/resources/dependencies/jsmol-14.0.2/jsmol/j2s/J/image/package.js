var path = ClazzLoader.getClasspathFor ("J.image.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "JpgEncoder.js", [
"J.image.Huffman",
"$.JpgEncoder",
"$.DCT",
"$.JpegObj"]);
