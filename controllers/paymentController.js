const Payment = require("../models/payment");
const Order = require("../models/order");

exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, method, status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const payment = await Payment.create({ orderId, amount, method, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Order,
          as: "order"
        }
      ]
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          as: "order"
        }
      ]
    });
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { amount, method, status } = req.body;
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    await payment.update({ amount, method, status });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    await payment.destroy();
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
