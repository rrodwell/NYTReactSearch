/**
 * Created by ryanrodwell on 6/9/17.
 */
// Require our dependencies
import express from "express";
import mongoose from "mongoose";
import expressHandlebars from "express-handlebars";
import bodyParser from "body-parser";

// Set up our port to be either the host's designated port, or 3000
let PORT = process.env.PORT || 3000;

// Instantiate our Express App
let app = express();

// Set up an Express Router
let router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
let db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
