const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./role");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: {
    type: DataTypes.INTEGER,
    references: { model: Role, key: "id" },
    allowNull: false
  }
}, { timestamps: false });


module.exports = User;
