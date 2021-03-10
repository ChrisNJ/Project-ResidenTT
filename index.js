const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const pool = require("./db");

//port either uses heroku's port when deployed or 5000 for localhost
const PORT = process.env.PORT || 5000;

//Models
const Crime = require("./models/CrimeReport");
const User = require("./models/User");

// app connection
app.use(cors());
app.use(express.json()); //req.body

//if in production (deployment) then change main client path to build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//Routes

/* Crime Reports*/
//route for crime data
app.use("/crimereports", require("./routes/crimereports"));

/* News Scrapper*/
//route for news feed
app.use("/scrape", require("./routes/scrapper"));

/* User */
// user register and login
app.use("/auth", require("./routes/jwtAuth"));

// route for user functions
app.use("/profile", require("./routes/profile"));

//if a route is requested that doesnt exist
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
