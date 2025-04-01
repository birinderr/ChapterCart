const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: "id" },
    allowNull: false
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  method: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Payment;
