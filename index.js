const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const BluebirdPromise = require("bluebird");
require("./models/User");
require("./services/passport");

mongoose.Promise = BluebirdPromise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(process.env.PORT);
