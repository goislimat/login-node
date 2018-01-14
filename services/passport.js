const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
      profileFields: ["id", "name", "picture", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const user = await User.findOne({ facebookId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = await new User({
        facebookId: profile.id,
        email: profile.emails[0].value,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        photo: profile.photos[0].value
      }).save();
      done(null, newUser);
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });

      if (user) {
        if (!await user.validPassword(password)) {
          return done(null, false, { message: "This user is already taken" });
        }
        return done(null, user);
      }

      const newUser = new User();
      newUser.password = await newUser.generateHash(password);
      newUser.email = email;

      await newUser.save();
      done(null, newUser);
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });

      if (user) {
        if (!await user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      }

      return done(null, false);
    }
  )
);
