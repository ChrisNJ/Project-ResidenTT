const { Sequelize } = require("sequelize");
const db = require("../db");

// User model
const User = db.define("user", {
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  userName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  profileImage: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

module.exports = User;
