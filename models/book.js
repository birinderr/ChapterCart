const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");
const Publisher = require("./publisher");

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: "id" },
    allowNull: false
  },
  publisherId: {
    type: DataTypes.INTEGER,
    references: { model: Publisher, key: "id" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Book;
