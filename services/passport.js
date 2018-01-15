const passport = require("passport");
const mongoose = require("mongoose");
const md5 = require("md5");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const isEmail = require("validator/lib/isEmail");

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
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
      profileFields: ["id", "name", "picture", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ facebookId: profile.id });

        if (user) return done(null, user);

        const newUser = await new User({
          facebookId: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          photo: profile.photos[0].value
        }).save();

        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) return done(null, user);

        const newUser = await new User({
          googleId: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          photo: profile.photos[0].value
        }).save();

        done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const errors = (email, password) => {
  if (!isEmail(email)) return "This is not a valid e-mail";

  if (password.length < 8) return "Password should have at least 8 characters";

  return false;
};

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const err = errors(email, password);
      if (err) return done(null, false, { message: err });

      try {
        const user = await User.findOne({ email: email });

        if (user)
          return done(null, false, { message: "This user is already taken" });

        const newUser = new User();

        const formattedEmail = email.toLowerCase().trim();
        newUser.email = formattedEmail;
        newUser.name = req.body.name;
        newUser.password = await newUser.generateHash(password);
        newUser.photo = `https://www.gravatar.com/avatar/${md5(
          formattedEmail
        )}`;

        await newUser.save();

        newUser.password = undefined;

        done(null, newUser);
      } catch (err) {
        return done(err);
      }
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
      const err = errors(email, password);
      if (err) return done(null, false, { message: err });

      try {
        const user = await User.findOne({ email: email });

        if (user && (await user.validPassword(password))) {
          user.password = undefined;
          return done(null, user);
        }

        return done(null, false, {
          message: "Invalid email/password combination"
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
