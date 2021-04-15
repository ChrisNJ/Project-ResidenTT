const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

// registers user
router.post("/register", async (req, res) => {
  try {
    //destructure data passed from register form
    const {
      firstName,
      lastName,
      userName,
      email,
      DOB,
      sex,
      password,
    } = req.body;

    //check if user exists
    //userName is the same as ---    userName : `${userName}`
    const user = await User.findOne({ where: { userName } });

    if (user !== null) {
      return res.status(409).json("user already exists");
    }

    //encrypt user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter new user in database
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      DOB,
      sex,
      password: bcryptPassword,
      profileImage:
        "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png",
    });

    // creates jwt token
    // const token = jwtGenerator(newUser.id);
    res.status(201).json("user created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    //destructure the req.body
    const { userName, password } = req.body;

    //check if user doesn't exist
    const user = await User.findOne({ where: { userName } });

    if (user === null) {
      return res.status(401).json("Username or Password is invalid");
    }

    //check if incoming password is the same as db password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Password is invalid");
    }

    //send client jwt token
    const token = jwtGenerator(user.id);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Route used to verify jwt tokens and returns username and id, uses the authorization middleware to verify
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.status(200).send(JSON.stringify({ auth: true, userID: req.user }));
    console.log(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
