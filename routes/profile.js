const router = require("express").Router();
const User = require("../models/User");
const authorization = require("../middleware/authorization");

//Return username and profile image to profile
router.post("/", authorization, async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["userName", "profileImage"],
      where: { id: `${req.user}` },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
