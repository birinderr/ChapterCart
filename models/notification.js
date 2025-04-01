const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const notification = sequelize.define("notification", {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
    allowNull: false
  },
  message: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: false });

module.exports = notification;
