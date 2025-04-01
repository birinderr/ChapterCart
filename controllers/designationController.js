const Designation = require("../models/designation");

exports.createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll({
      include: [{ all: true, nested: true }] 
    });
    res.json(designations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id, {
      include: [{ all: true, nested: true }]
    });
    if (!designation) return res.status(404).json({ error: "Designation not found" });
    res.json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) return res.status(404).json({ error: "Designation not found" });

    await designation.update(req.body);
    res.json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) return res.status(404).json({ error: "Designation not found" });

    await designation.destroy();
    res.json({ message: "Designation deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
