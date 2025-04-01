const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");
const Book = require("./book");

const OrderItem = sequelize.define("OrderItem", {
  orderId: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: "id" },
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: Book, key: "id" },
    allowNull: false
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = OrderItem;
