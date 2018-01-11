const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// the user is the one returned by the callback function in the google strategy
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
      // Credentials to access Google OAuth
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // Method that gets accessed when the user successfully logs in
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have this user in our db

          // first argument it's an error object and the second the result
          done(null, existingUser);
        } else {
          // we don't have this user, create a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
