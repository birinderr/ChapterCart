const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { verifyAdmin } = require("../middleware/authMiddleware")

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);
router.post("/",verifyAdmin, bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
