const RolePermission = require("../models/rolePermission");
const Role = require("../models/role");
const Permission = require("../models/permission");

exports.createRolePermission = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionId } = req.body;


    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }


    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }


    const existingRolePermission = await RolePermission.findOne({
      where: { roleId, permissionId },
    });
    if (existingRolePermission) {
      return res.status(400).json({ error: "Permission already assigned to this role" });
    }


    const rolePermission = await RolePermission.create({ roleId, permissionId });
    res.status(201).json(rolePermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;


    const rolePermissions = await RolePermission.findAll({
      where: { roleId },
      include: [
        {
          model: Permission,
          as: 'permission',
        },
      ],
    });

    if (!rolePermissions || rolePermissions.length === 0) {
      return res.status(404).json({ error: "No permissions found for this role" });
    }

    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;


    const rolePermission = await RolePermission.findOne({
      where: { roleId, permissionId },
    });

    if (!rolePermission) {
      return res.status(404).json({ error: "Role-Permission association not found" });
    }


    await rolePermission.destroy();
    res.json({ message: "Role-Permission deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
