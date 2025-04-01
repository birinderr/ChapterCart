const OrderItem = require("../models/orderitem");
const Order = require("../models/order");
const Book = require("../models/book");

exports.getOrderItemsByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItem.findAll({
      where: { orderId },
      include: [{ model: Book, as: "book" }],
    });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrderItemForOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const orderItem = await OrderItem.create({ orderId, bookId, quantity });
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.itemId, {
      include: [{ model: Book, as: "book" }],
    });
    if (!orderItem) return res.status(404).json({ error: "OrderItem not found" });

    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.itemId);
    if (!orderItem) return res.status(404).json({ error: "OrderItem not found" });

    await orderItem.update(req.body);
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.itemId);
    if (!orderItem) return res.status(404).json({ error: "OrderItem not found" });

    await orderItem.destroy();
    res.json({ message: "OrderItem deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};