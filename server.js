require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Set up socket.io connection
io.on("connection", function (socket) {

  //Fire off when player is added
  socket.on("add_player", function(data) {

    //Create blob object and set it's values to the ones provided
    var blob = new Blob(socket.id, data.name, 0, 0, data.color, 3);
    // Push this new blob to the blobs array
    blobs.push(blob);

    // Log all blobs
    // console.log("Blobs: ", blobs)'
     io.sockets.emit("receive_player", blob);
  });

  //Fires when the blob's values get updated
  // socket.on("update", function(data) {

  //   var blob;
  //   //Loop through all blobs
  //   for(var i = 0; i < blobs.length; i++) {

  //     //select a blob that has a matching id with the user
  //     if(socket.id === blobs[i].id) {
  //       blob = blobs[i];
  //     }
  //     // console.log("92 " ,blob.name);
  //   }
  //   // blob.name = data.name;
  //   // console.log("94 " ,blob);
  //   // console.log(blob.name + "" + data.keyPressed);


  // });

  //Fires off on keypress
  socket.on("keyPress", function(data) {
    io.sockets.emit("updateLocation", data);
    console.log("emitting key press")
  });


  // //Listen for game position update
  // socket.on("tellServerPosition", function(data) {
   
  // })
  
  //Listener for startGame call
  socket.on("startGame", function() {
    //Tell all clients to start game
    io.sockets.emit("startGame");
  })
  });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  var server = http.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
module.exports = app;
