const router = require("express").Router();
const db = require("../db");
const CrimeReport = require("../models/CrimeReport");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");

const getCrimeReports = async (range) => {
  let reports;
  reports = await CrimeReport.findAll({
    where: { date: { [Op.gte]: moment().subtract(range, "months").toDate() } },
  });
  return reports;
};

//Return all crime reports
router.post("/", async (req, res) => {
  try {
    const { range } = req.body;
    let reports;

    if (range && range != 2020) {
      reports = await getCrimeReports(range);
    }

    if (range == 2020) {
      reports = await CrimeReport.findAll({
        where: {
          date: {
            [Op.gte]: moment("2020-01-01").toDate(),
            [Op.lte]: moment("2020-12-31").toDate(),
          },
        },
      });

      if (reports) {
        var results = [];
        var crimes = Object.values(reports);
        results.push(crimes.length);

        results.push(
          crimes.filter((crime) => crime.offences === "WOUNDING/SHOOTING")
            .length,
          crimes.filter((crime) => crime.offences === "ROBBERY").length,
          crimes.filter(
            (crime) => crime.offences === "POSS OF NARCOTICS FOR TRAFFICKING"
          ).length,
          crimes.filter((crime) => crime.offences === "FRAUD OFFENCES").length,
          crimes.filter((crime) => crime.offences === "GENERAL LARCENY").length,
          crimes.filter((crime) => crime.offences === "LARCENY MOTOR VEHICLE")
            .length,
          crimes.filter((crime) => crime.offences === "LARCENY DWELLING HOUSE")
            .length,
          crimes.filter((crime) => crime.offences === "BREAKING OFFENCES")
            .length,
          crimes.filter((crime) => crime.offences === "OTHER SERIOUS CRIMES")
            .length
        );
        reports = results;
      }
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
