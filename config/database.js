const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("libdata", "myuser", "mypassword", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
