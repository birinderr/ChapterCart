const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Country = require("./country");

const Region = sequelize.define("Region", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  countryId: {
    type: DataTypes.INTEGER,
    references: { model: Country, key: "id" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Region;
