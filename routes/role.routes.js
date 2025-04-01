const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const permissionController = require("../controllers/permissionController");
const rolePermissionController = require("../controllers/rolePermissionController");

router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRole);
router.post("/", roleController.createRole);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

router.get("/permissions", permissionController.getPermissions);
router.get("/permissions/:id", permissionController.getPermission);
router.post("/permissions", permissionController.createPermission);
router.put("/permissions/:id", permissionController.updatePermission);
router.delete("/permissions/:id", permissionController.deletePermission);

router.post("/roles/:roleId/permissions", rolePermissionController.createRolePermission);
router.get("/roles/:roleId/permissions", rolePermissionController.getRolePermissions);
router.delete("/roles/:roleId/permissions/:permissionId", rolePermissionController.deleteRolePermission);

module.exports = router;
