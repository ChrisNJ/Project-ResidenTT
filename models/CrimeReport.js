const { Sequelize } = require("sequelize");
const db = require("../db");

//CrimeReport model
const CrimeReport = db.define("crimereport", {
  date: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  time: {
    allowNull: false,
    type: Sequelize.TIME,
  },
  station: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  division: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  location: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  longitude: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  latitude: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  offences: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = CrimeReport;
