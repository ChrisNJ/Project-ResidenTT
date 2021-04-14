const { Sequelize } = require("sequelize");
const db = require("../db");

//CrimeReport model
const Clusters = db.define(
  "cluster",
  {
    longitude: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    latitude: {
      allowNull: false,
      type: Sequelize.FLOAT,
    }, 
    alerted: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  },
  { timestamps: false }
);

module.exports = Clusters;
