const Permission = require("../models/permission");

exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    
    const existingPermission = await Permission.findOne({ where: { name } });
    if (existingPermission) return res.status(400).json({ error: "Permission already exists" });

    const permission = await Permission.create({ name });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      include: [
        {
          model: Role,  
          as: "roles"
        }
      ]
    });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id, {
      include: [
        {
          model: Role,  
          as:"roles"
        }
      ]
    });
    if (!permission) return res.status(404).json({ error: "Permission not found" });

    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) return res.status(404).json({ error: "Permission not found" });

    await permission.update(req.body);
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) return res.status(404).json({ error: "Permission not found" });

    await permission.destroy();
    res.json({ message: "Permission deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
