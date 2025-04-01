const Discount = require("../models/discount");

exports.createDiscount = async (req, res) => {
  try {
    const discount = await Discount.create(req.body);
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.findAll({
      include: [{ all: true, nested: true }]
    });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id, {
      include: [{ all: true, nested: true }]
    });
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount not found" });

    await discount.update(req.body);
    res.json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount not found" });

    await discount.destroy();
    res.json({ message: "Discount deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
