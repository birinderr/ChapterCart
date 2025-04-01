const Order = require("../models/order");
const Customer = require("../models/customer");
const Cart = require("../models/cart");
const Book = require("../models/book");
const OrderItem = require("../models/orderitem");

exports.createOrder = async (req, res) => {
  try {
    const { customerId, status } = req.body;

    const customer = await Customer.findOne({ where: { userId: customerId } });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const cartItems = await Cart.findAll({ where: { customerId }, include: [{ model: Book, as: "book" }] });
    if (!cartItems.length) return res.status(400).json({ error: "Cart is empty" });

    let totalAmount = 0;
    const orderItems = cartItems.map((item) => {
      const totalPriceForItem = item.book.price * item.quantity;
      totalAmount += totalPriceForItem;

      return {
        bookId: item.bookId,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({ customerId, totalAmount, status });

    await OrderItem.bulkCreate(orderItems.map((item) => ({ ...item, orderId: order.id })));

    await Cart.destroy({ where: { customerId } });

    res.status(201).json({ order, message: "Order placed successfully, cart cleared." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: { model: Customer, as: "customer" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: Customer, as: "customer" },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { totalAmount, status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.update({ totalAmount, status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};