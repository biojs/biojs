var port = 1337;

var express = require("express");
var http = require("http");

var server = express();
server.configure(function () {
    server.use(express.static(__dirname + "/"));
});

server.listen(port);
http.createServer(server);
console.log("Server running at http://localhost:" + port + "/")
