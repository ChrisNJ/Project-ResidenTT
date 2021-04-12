const { Sequelize } = require("sequelize");
const db = require("../db");
const User = require("./User");
const Media = require("./Media");
//UserReport model
const UserReport = db.define("userreports", {
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
});

// UserReport.associate = () => {
//   UserReport.belongsToMany(User, {
//     through: Media,
//     as: "users",
//     foreignKey: "reportId",
//   });
// };

module.exports = UserReport;
