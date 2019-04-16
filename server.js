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


// // Handles our socket.io POST request
// app.post("/api/newPlayer", async function (req, res) {
//   db.Player.create({
//     name: req.body.name,
//     wins: 0,
//     losses: 0
//   }).then(function () {
    
//     io.emit('message', req.body);
//     console.log(req.body.name);
//     console.log(req.body.color);
//     res.json(200);

//     console.log("WE ARE IN THE IO SPACE")

//   })
// });




//Set up socket.io connection
io.on("connection", function (socket) {

  console.log("Made socket connection: ", socket.id);

  socket.on("add_player", function(data) {
    io.sockets.emit("receive_player", data);
    console.log("data.name: ", data.name);
  });

})


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
