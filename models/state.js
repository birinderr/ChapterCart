const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Region = require("./region");

const State = sequelize.define("State", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  regionId: {
    type: DataTypes.INTEGER,
    references: { model: Region, key: "id" },
    allowNull: false
  }
}, { timestamps: false });


module.exports = State;
