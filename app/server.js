// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//import routes from "./routes";

// initialize http server
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
// TODO: add routes in routes directory
//app.use(routes);

// temporary route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// launch server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
