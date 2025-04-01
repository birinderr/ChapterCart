const Department = require("../models/department");

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [{ all: true, nested: true }]
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [{ all: true, nested: true }]
    });
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: "Department not found" });

    await department.update(req.body);
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: "Department not found" });

    await department.destroy();
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
