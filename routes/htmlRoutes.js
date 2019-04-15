var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Player.findAll({}).then((res)=>{
      console.log(res);
    });
    res.render("index", {
    });
  });

  //Load create game page
  app.get("/create-game", function (req, res) {
    res.render("create-game");
  });

<<<<<<< HEAD
  //Load BLOBTEST page
  app.get("/blobTest", function(req, res) {
    res.render("blobTest");
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

=======
>>>>>>> 4fbf10b905a78a38459c3eb910264f42a66d2736
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
