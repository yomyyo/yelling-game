require("dotenv").config();

function databaseConfig(database) {
  return {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || database,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  };
}

module.exports = {
  development: databaseConfig("yelling_game_development"),
  test: databaseConfig("yelling_game_test"),
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
