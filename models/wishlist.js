const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");
const Book = require("./book");

const Wishlist = sequelize.define("Wishlist", {
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "userId" },
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: Book, key: "id" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Wishlist;
