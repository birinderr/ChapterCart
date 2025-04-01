const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");
const Book = require("./book");

const Cart = sequelize.define("Cart", {
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "userId" },
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: Book, key: "id" },
    allowNull: false
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = Cart;
