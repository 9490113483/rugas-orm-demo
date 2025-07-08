const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  description: DataTypes.TEXT,
  picture_url: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = Product;
