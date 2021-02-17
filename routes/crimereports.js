const router = require("express").Router();
const db = require("../db");
const CrimeReport = require("../models/CrimeReport");
const { Op } = require("sequelize");
const moment = require("moment");

//Return all crime reports
router.post("/", async (req, res) => {
  try {
    const { range } = req.body;
    let reports;

    if (range == 1) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(3, "months").toDate() } },
      });
    }
    if (range == 2) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(6, "months").toDate() } },
      });
    }
    if (range == 3) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(1, "years").toDate() } },
      });
    }
    if (range == 4) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(2, "years").toDate() } },
      });
    }
    if (range == 5) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(3, "years").toDate() } },
      });
    }
    if (range == 6) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(4, "years").toDate() } },
      });
    }
    if (range == 7) {
      reports = await CrimeReport.findAll({
        where: { date: { [Op.gte]: moment().subtract(5, "years").toDate() } },
      });
    }

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
