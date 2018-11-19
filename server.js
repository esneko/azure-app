/*
 *  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 *  See LICENSE in the source repository root for complete license information.
 */

var express = require("express");
var fs = require("fs");
var https = require("https");
var morgan = require("morgan");
var path = require("path");

var app = express();
var port = 5000;

// Configure morgan module to log all requests.
app.use(morgan("dev"));

// Set the front-end folder to serve public assets.
app.use(express.static("JavaScriptSPA"));

// Set up our one route to the index.html file.
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Start the server.
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  )
  .listen(port);

console.log("Listening on port " + port + "...");
