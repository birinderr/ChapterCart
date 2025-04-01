const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const orderItemController = require("../controllers/orderItemController");
const paymentController = require("../controllers/paymentController");

// Order routes
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

//Order Item routes
router.get("/:orderId/items", orderItemController.getOrderItemsByOrder);
router.post("/:orderId/items", orderItemController.createOrderItemForOrder);
router.get("/:orderId/items/:itemId", orderItemController.getOrderItem);
router.put("/:orderId/items/:itemId", orderItemController.updateOrderItem);
router.delete("/:orderId/items/:itemId", orderItemController.deleteOrderItem);

// Payment routes
router.get("/:orderId/payments", paymentController.getPayments);
router.get("/:orderId/payments/:id", paymentController.getPayment);
router.post("/:orderId/payments", paymentController.createPayment);
router.put("/:orderId/payments/:id", paymentController.updatePayment);
router.delete("/:orderId/payments/:id", paymentController.deletePayment);

module.exports = router;