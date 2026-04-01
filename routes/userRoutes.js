const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const user = await User.findOne({ name, phone });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials ❌",
      });
    }

    res.json({
      message: "Login successful ✅",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;