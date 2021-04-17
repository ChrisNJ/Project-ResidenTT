// creates a jwt token for a user
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Creates JWT for a user upon login that expires after 24 hours
 * @param {int} id A user's assigned id from the database table
 */
function jwtGenerator(id) {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "7d" }); // set time period for jwt expiration
}

module.exports = jwtGenerator;
