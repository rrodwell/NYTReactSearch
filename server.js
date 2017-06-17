/**
 * Created by ryanrodwell on 6/9/17.
 */
// Require our dependecies
let express = require("express");
let mongoose = require("mongoose");
let bluebird = require("bluebird");
let bodyParser = require("body-parser");

let routes = require("./routes/routes");

// Set up a default port, configure mongoose, configure our middleware
let PORT = process.env.PORT || 3000;

mongoose.Promise = bluebird;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/", routes);

let db = process.env.MONGODB_URI || "mongodb://heroku_zwtrswz4:aedjl79n37a7egi0evvj6u30jo@ds127872.mlab.com:27872/heroku_zwtrswz4";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
    // Log any errors connecting with mongoose
    if (error) {
        console.error(error);
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
