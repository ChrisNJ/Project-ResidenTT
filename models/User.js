const { Sequelize } = require("sequelize");
const db = require("../db");
const UserReport = require("./UserReport");
const Media = require("./Media");

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
  DOB: {
    allowNull: false,
    type: Sequelize.DATEONLY,
  },
  sex: {
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

// User.associate = () => {
//   User.belongsToMany(UserReport, {
//     through: Media,
//     as: "userreports",
//     foreignKey: "userId",
//   });
// };

module.exports = User;
