const Notification = require("../models/notification");
const Subscription = require("../models/subscription");
const User = require("../models/user");

exports.createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const notification = await Notification.create({ userId, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, as: "user" }],
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id, {
      include: [{ model: User, as: "user" }],
    });
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    await notification.update({ message });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    await notification.destroy();
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Subscription Logic
exports.manageSubscription = async (req, res) => {
  try {
    const { userId, type, action } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const subscription = await Subscription.findOne({ where: { userId } });

    let notificationMessage = "";

    if (action === "subscribe") {
      if (subscription) {
        return res.status(400).json({ error: "User already has a subscription" });
      }
      const newSubscription = await Subscription.create({ userId, type });

      notificationMessage = `You have successfully subscribed to ${type}.`;
      await Notification.create({ userId, message: notificationMessage });

      return res.status(201).json({ newSubscription, message: notificationMessage });
    } else if (action === "unsubscribe") {
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      await subscription.destroy();

      notificationMessage = `You have successfully unsubscribed from ${type}.`;
      await Notification.create({ userId, message: notificationMessage });

      return res.json({ message: notificationMessage });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
