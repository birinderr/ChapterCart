const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Customer = sequelize.define("Customer", {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Customer;
