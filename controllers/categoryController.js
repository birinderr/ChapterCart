const Category = require("../models/category");
const Book = require("../models/book");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: { model: Book, as: "books" },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Book, as: "books" },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
