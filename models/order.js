const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "userId" },
    allowNull: false
  },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Order;
