const User = require("../models/user");
const Role = require("../models/role");
const { hashPassword, comparePassword } = require("../config/passwordUtils");


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: "Role not found" });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword, roleId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Role, as: 'role' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findByPk(req.params.id, {
      include: { model: Role, as: 'role' }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    const user = await User.findByPk(req.session.userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = password ? await hashPassword(password) : user.password;

    await user.update({ name, email, password: hashedPassword, roleId });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' }
    });

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });


    req.session.userId = user.id;
    req.session.email = user.email;
    req.session.name = user.name;
    req.session.roleId = user.roleId;

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, roleId: user.roleId },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logout = (req, res) => {
  try {

    if (!req.session || !req.session.userId) {
      return res.status(400).json({ error: 'No user is logged in' });
    }


    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to log out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

