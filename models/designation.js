const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Designation = sequelize.define("Designation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Designation;
