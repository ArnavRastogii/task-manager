const router = require("express").Router();
const auth = require("../middleware/auth");
const { isAdmin } = require("../middleware/role");
const User = require("../models/User");

// 🔹 GET USERS
router.get("/", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("name email role");
  res.json(users);
});

// 🔹 UPDATE ROLE
router.put("/:id/role", auth, isAdmin, async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  res.json(user);
});

module.exports = router;