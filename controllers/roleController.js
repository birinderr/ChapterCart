const Role = require("../models/role");
const User = require("../models/user"); 

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Role name is required" });

    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          as: 'users', 
        },
      ],
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'users',  
        },
      ],
    });

    if (!role) return res.status(404).json({ error: "Role not found" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });

    await role.destroy();
    res.json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
