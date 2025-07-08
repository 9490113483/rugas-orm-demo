const { Order, Customer, Product } = require("../models");

exports.createOrder = async (req, res) => {
  const { customerId, products } = req.body;

  try {
    // Step 1: Create the Order with the associated customer
    const order = await Order.create({ CustomerId: customerId });

    // Step 2: Associate products with quantities via OrderItem
    for (const item of products) {
      await order.addProduct(item.productId, {
        through: { quantity: item.quantity }
      });
    }

    res.json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Customer, Product],
    });
    res.json(orders);
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Update Order Status Error:", err);
    res.status(500).json({ error: err.message });
  }
};
