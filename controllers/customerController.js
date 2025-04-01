const Customer = require("../models/customer");
const User = require("../models/user");
const Order = require("../models/order");

exports.createCustomer = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingCustomer = await Customer.findOne({ where: { userId } });
    if (existingCustomer) return res.status(400).json({ error: "Customer already exists" });

    const customer = await Customer.create({ userId });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        { model: User, as: "user" },
        { model: Order, as: "orders" }
      ]
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: Order, as: "orders" }
      ]
    });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    await customer.destroy();
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};