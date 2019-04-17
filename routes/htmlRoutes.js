var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Player.findAll({}).then((data)=>{
      // console.log(res);
      res.render("index", {
    });
    });
    
  });

  //Load create game page
  app.get("/create-game", function (req, res) {
    res.render("create-game");
  });

  //Load BLOBTEST page
  app.get("/test", function(req, res) {
    res.render("TEST");
  })

  //Load game page
  app.get("/game", function (req, res) {
    res.render("game");
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
