module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  });
  return Player;
};
