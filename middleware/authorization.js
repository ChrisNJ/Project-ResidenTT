const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    //if there was not a jwt token in the header then return a 403 error message
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }
    //Verify the jwtToken using the secretkey in the process.env (dotenv for local, config vars for heroku)
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    //Return the user's id
    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
