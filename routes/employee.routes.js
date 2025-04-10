const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
