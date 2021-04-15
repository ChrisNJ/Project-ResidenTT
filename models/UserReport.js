const { Sequelize } = require("sequelize");
const db = require("../db");
const User = require("./User");
const Media = require("./Media");
// const moment = require("moment");

//UserReport model
const UserReport = db.define(
  "userreports",
  {
    offences: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    crimeInfo: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    time: {
      allowNull: true,
      type: Sequelize.TIME,
    },
    location: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    longitude: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    latitude: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    userId: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    // createdAt: {
    //   type: Sequelize.DATE,
    //   get() {
    //     return moment(this.getDataValue("createdAt")).format(
    //       "YYYY-MM-DD HH:mm:ss"
    //     );
    //   },
    // },
    // updatedAt: {
    //   type: Sequelize.DATE,
    //   get() {
    //     return moment(this.getDataValue("updatedAt")).format(
    //       "YYYY-MM-DD HH:mm:ss"
    //     );
    //   },
    // },
  }
  // { timestamps: false }
);
module.exports = UserReport;
