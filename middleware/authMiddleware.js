const Role = require("../models/role");

exports.verifySession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Access denied. No active session." });
  }

  req.user = {
    id: req.session.userId,
    email: req.session.email,
    name: req.session.name,
    roleId: req.session.roleId,
  };

  next();
};


exports.verifyAdmin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No active session." });
  }

  const adminRole = await Role.findOne({ where: { name: "admin" } });

  if (!adminRole) {
    return res.status(500).json({ error: "Admin role not found" });
  }

  if (req.session.roleId !== adminRole.id) {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  req.user = {
    id: req.session.userId,
    email: req.session.email,
    name: req.session.name,
    roleId: req.session.roleId,
  };

  next();
};

exports.blockIfLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.status(403).json({ error: "Access denied. You are already logged in." });
  }
  next();
};


