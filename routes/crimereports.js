const router = require("express").Router();
const db = require("../db");
const CrimeReport = require("../models/CrimeReport");

//Return all crime reports
router.get("/", async (req, res) => {
  try {
    const reports = await CrimeReport.findAll();
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});



router.post("/add", async (req, res) => {
  try {
    const {
      date,
      time,
      station,
      division,
      location,
      longitude,
      latitude,
      offences,
    } = req.body;

    CrimeReport.create({
      date: date,
      time: time,
      station: station,
      division: division,
      location: location,
      longitude: longitude,
      latitude: latitude,
      offences: offences,
    });

    res.status(201).json("Report added");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
