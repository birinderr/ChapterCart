const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const discount = sequelize.define("discount", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  percentage: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

module.exports = discount;
