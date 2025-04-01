const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Subscription = sequelize.define("Subscription", {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
    allowNull: false
  },
  type: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Subscription;
