const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/roles", require("./role.routes"));
router.use("/books", require("./book.routes"));
router.use("/categories", require("./category.routes"));
router.use("/orders", require("./order.routes"));
router.use("/wishlist", require("./wishlist.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/customers", require("./customer.routes"));
router.use("/employees", require("./employee.routes"));
router.use("/reviews", require("./review.routes"));
router.use("/locations", require("./location.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/publishers", require("./publisher.routes"));
router.use("/department", require("./department.routes"));
router.use("/designation", require("./designation.routes"));


module.exports = router;

