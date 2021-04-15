const { Sequelize } = require("sequelize");
const db = require("../db");

//CrimeReport model
const CrimeReport = db.define("crimereport", {
  date: {
    allowNull: true,
    type: Sequelize.DATEONLY,
  },
  time: {
    allowNull: true,
    type: Sequelize.TIME,
  },
  station: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  division: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  location: {
    allowNull: true,
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
  offences: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = CrimeReport;
