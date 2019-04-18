var db = require("../models");

module.exports = function (app) {

  // Get all players
  app.get("/api/players", function (req, res) {
    db.Player.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new player
  app.post("/api/players", function (req, res) {
    db.Player.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/players/:name", function (req, res) {
    db.Player.update(req.body, {
      where: {
        name: req.params.name
      }
    }).then(
      function() {
        console.log("updated player")
      }
    )
  })
};
