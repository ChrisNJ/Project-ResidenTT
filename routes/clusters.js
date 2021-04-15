const router = require("express").Router();
const Clusters = require("../models/Clusters");

//Return all cluster points
router.post("/", async (req, res) => {
  try {
    let clusters;

    clusters = await Clusters.findAll();

    res.status(200).json(clusters);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
