const express = require("express");
const router = express.Router();
const designationController = require("../controllers/designationController");

router.post("/", designationController.createDesignation);

router.get("/", designationController.getDesignations);

router.get("/:id", designationController.getDesignation);

router.put("/:id", designationController.updateDesignation);

router.delete("/:id", designationController.deleteDesignation);

module.exports = router;
