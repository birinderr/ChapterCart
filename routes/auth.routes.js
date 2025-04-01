const express = require("express");

const router = express.Router();
require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const { blockIfLoggedIn } = require("../middleware/authMiddleware");

router.post("/login",blockIfLoggedIn, userController.login);
router.post("/logout", userController.logout);  
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


router.post("/check-auth", (req, res) => {

    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "User is not authenticated" });
    }
  
    res.json({
      message: "User is authenticated",
      user: {
        id: req.session.userId,
        email: req.session.email,
        name: req.session.name,
        roleId: req.session.roleId,
      },
    });
  });
  

module.exports = router;

