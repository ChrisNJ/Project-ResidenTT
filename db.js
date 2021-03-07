const Sequelize = require("sequelize");

//connects db to the server
const db = new Sequelize(
  "postgres://clxnfpth:Ee6-sV6vbpSbZPyxQZ00iy64RS0zVfii@ziggy.db.elephantsql.com:5432/clxnfpth",
  {
    pool: {
      max: 4,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
  }
);

// test DB connection when the server starts
db.authenticate()
  .then(() => console.log("Database connected...."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;
