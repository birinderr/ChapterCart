const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Notification Routes
router.post("/notifications", notificationController.createNotification);
router.get("/notifications", notificationController.getNotifications);
router.get("/notifications/:id", notificationController.getNotification);
router.put("/notifications/:id", notificationController.updateNotification);
router.delete("/notifications/:id", notificationController.deleteNotification);

// Subscription Routes
router.post("/subscriptions", notificationController.manageSubscription);

module.exports = router;
