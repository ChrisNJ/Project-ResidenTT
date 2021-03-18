const { Sequelize } = require("sequelize");
const db = require("../db");

//News model
const News = db.define("news", {
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  sourceName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  articleURL: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = News;
