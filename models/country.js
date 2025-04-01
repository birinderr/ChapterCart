const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Country = sequelize.define("Country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Country;
