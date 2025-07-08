const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  status: {
    type: DataTypes.ENUM("placed", "shipped", "delivered", "cancelled"),
    defaultValue: "placed",
  },
});

module.exports = Order;
