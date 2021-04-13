const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const UserReport = require("../models/UserReport");
const Media = require("../models/Media");
const authorization = require("../middleware/authorization");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const moment = require("moment");

const getReports = async (range) => {
  let reports;
  reports = await UserReport.findAll({
    where: { date: { [Op.gte]: moment().subtract(range, "months").toDate() } },
    include: [
      {
        model: User,
        attributes: ["id", "userName", "profileImage"],
      },
      {
        model: Media,
        attributes: ["mediaUrl"],
      },
    ],
  });
  return reports;
};

//Return user reports
router.post("/", async (req, res) => {
  try {
    console.log("stufg");
    const { range } = req.body;
    let reports;

    if (range && range != 2020) {
      reports = await getReports(range);
    }

    if (range == 2020) {
      reports = await UserReport.findAll({
        where: {
          date: {
            [Op.gte]: moment("2020-01-01").toDate(),
            [Op.lte]: moment("2020-12-31").toDate(),
          },
        },
        include: [
          {
            model: User,
            attributes: ["id", "userName", "profileImage"],
          },
          {
            model: Media,
            attributes: ["mediaUrl"],
          },
        ],
      });
    }

    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/create", authorization, async (req, res) => {
  try {
    const {
      offences,
      crimeInfo,
      date,
      time,
      location,
      longitude,
      latitude,
      mediaUrl,
    } = req.body;

    const userreport = await UserReport.create({
      offences: offences,
      crimeInfo: crimeInfo,
      date: date,
      time: time,
      location: location,
      longitude: longitude,
      latitude: latitude,
      userId: req.user, //authorization middleware returns the user's id upon verification of jwtToken
    });

    if (
      mediaUrl !=
      "https://cdn2.iconfinder.com/data/icons/picons-essentials/71/gallery-512.png"
    ) {
      Media.create({
        userId: req.user,
        reportId: userreport.id,
        mediaUrl: mediaUrl,
      });
    }

    res.status(200).json("Report added successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/update", authorization, async (req, res) => {
  try {
    const {
      userreportID,
      offences,
      crimeInfo,
      date,
      time,
      location,
      longitude,
      latitude,
      mediaUrl,
    } = req.body;

    //Find the report
    const userreport = await UserReport.findOne({
      where: { id: `${userreportID}`, userId: `${req.user}` },
    });

    if (userreport === null) {
      res.status(500).json("Could not locate report");
    } else {
      userreport.offences = offences;
      userreport.crimeInfo = crimeInfo;
      userreport.date = date;
      userreport.time = time;
      userreport.location = location;
      userreport.longitude = longitude;
      userreport.latitude = latitude;
      await userreport.save();

      if (mediaUrl) {
        const media = await Media.findOne({
          where: { reportId: `${userreportID}`, userId: `${req.user}` },
        });

        media.mediaUrl = mediaUrl;
        await media.save();
      }

      res.status(200).json("Update successful");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.delete("/delete", authorization, async (req, res) => {
  try {
    const { userreportID } = req.body;
    //Find the report that the user wishes to delete
    const userreport = await UserReport.findOne({
      where: { id: `${userreportID}`, userId: `${req.user}` },
    });

    const media = await Media.findOne({
      where: { reportId: `${userreportID}`, userId: `${req.user}` },
    });

    //Destroy media related to user
    if (media) {
      await media.destroy();
    }

    //Destroy the report
    if (userreport) {
      await userreport.destroy();
    }

    res.status(200).json("Report deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
