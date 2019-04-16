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

  var blobs = []

  function Blob (id, name, x, y, color, lifeCounter) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.lifeCounter = lifeCounter;
  }
  
  //Log that a connection was made with a socket
  console.log("Made socket connection: ", socket.id);

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
  socket.on("update", function(data) {

    var blob;
    //Loop through all blobs
    for(var i = 0; i < blobs.length; i++) {

      //select a blob that has a matching id with the user
      if(socket.id === blobs[i].id) {
        blob = blobs[i];
      }
      console.log("92 " ,blob.name);
    }
    // blob.name = data.name;
    // console.log("94 " ,blob);
    // console.log(blob.name + "" + data.keyPressed);


  });

  socket.on("keyPress", function(data) {
    io.sockets.emit("keyPress", data);
  })
    // io.sockets.emit("receive_player", data);
    // console.log("data.name: ", data.name);

    // Assign player one and two names when they join the game
    // if (playerArr.length === 0) {
    //   playerArr.push(data.name)
    //   console.log("player Array: ", playerArr)
    // } else if (playerArr.length === 1) {
    //   playerArr.push(data.name)
    // }
  });

  // socket.on("player_key", function(data) {
  //   io.sockets.emit("player_key", data);
  //   // console.log("Key pressed: ", data);
  // })

// })


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  var server = http.listen(3000, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
module.exports = app;
