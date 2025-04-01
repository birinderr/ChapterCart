const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");
const Book = require("./book");

const BookReview = sequelize.define("BookReview", {
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
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review: { type: DataTypes.TEXT }
}, { timestamps: false });

module.exports = BookReview;
