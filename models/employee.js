const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Designation = require("./designation");
const Department = require("./department");

const Employee = sequelize.define("Employee", {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
    allowNull: false
  },
  designationId: {
    type: DataTypes.INTEGER,
    references: { model: Designation, key: "id" },
    allowNull: false
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: { model: Department, key: "id" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Employee;