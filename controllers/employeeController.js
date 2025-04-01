const Employee = require("../models/employee");
const User = require("../models/user");
const Designation = require("../models/designation");
const Department = require("../models/department");

exports.createEmployee = async (req, res) => {
  try {
    const { userId, designationId, departmentId } = req.body;

    const user = await User.findByPk(userId);
    const designation = await Designation.findByPk(designationId);
    const department = await Department.findByPk(departmentId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!designation) return res.status(404).json({ error: "Designation not found" });
    if (!department) return res.status(404).json({ error: "Department not found" });

    const existingEmployee = await Employee.findOne({ where: { userId } });
    if (existingEmployee) return res.status(400).json({ error: "Employee already exists" });

    const employee = await Employee.create({ userId, designationId, departmentId });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: User, as: "user" },
        { model: Designation, as: "designation" },
        { model: Department, as: "department" }
      ]
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: Designation, as: "designation" },
        { model: Department, as: "department" }
      ]
    });
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { designationId, departmentId } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    if (designationId) {
      const designation = await Designation.findByPk(designationId);
      if (!designation) return res.status(404).json({ error: "Designation not found" });
    }
    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) return res.status(404).json({ error: "Department not found" });
    }

    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
