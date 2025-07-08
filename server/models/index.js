const Customer = require("./Customer");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Associations
Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { Customer, Product, Order, OrderItem };
