const Publisher = require("../models/publisher");
const Book = require("../models/book");

exports.createPublisher = async (req, res) => {
  try {
    const { name } = req.body;

    const existingPublisher = await Publisher.findOne({ where: { name } });
    if (existingPublisher) return res.status(400).json({ error: "Publisher already exists" });

    const publisher = await Publisher.create({ name });
    res.status(201).json(publisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.findAll({
      include: { model: Book, as: "books" }  
    });
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublisher = async (req, res) => {
  try {
    const { id } = req.params;

    const publisher = await Publisher.findByPk(id, {
      include: { model: Book, as: "books" }  
    });

    if (!publisher) return res.status(404).json({ error: "Publisher not found" });

    res.json(publisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    const publisher = await Publisher.findByPk(id);
    if (!publisher) return res.status(404).json({ error: "Publisher not found" });

    await publisher.update(req.body);
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    const publisher = await Publisher.findByPk(id);
    if (!publisher) return res.status(404).json({ error: "Publisher not found" });

    await publisher.destroy();
    res.json({ message: "Publisher deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};