const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/bookReviewController");

router.get("/:bookId", reviewController.getBookReview);
router.post("/", reviewController.createBookReview);
router.put("/:id", reviewController.updateBookReview);
router.delete("/:id", reviewController.deleteBookReview);

module.exports = router;
