const { Sequelize } = require("sequelize");
const db = require("../db");
const User = require("./User");
const UserReport = require("./UserReport");

//Media model
const Media = db.define("media", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  reportId: {
    type: Sequelize.INTEGER,
    references: {
      model: UserReport,
      key: "id",
    },
  },
  mediaUrl: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Media;
