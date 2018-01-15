const passport = require("passport");

const localOptions = {
  badRequestMessage: "E-mail/Password cant't be blank"
};

module.exports = app => {
  // Route called when the user tries to authenticate with Google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Route called when the user is redirected from Google
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  // Route called when the user tries to authenticate with Facebook
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  // Route called when the user is redirected from Facebook
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // Route to get the current user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/signup", (req, res, next) => {
    passport.authenticate("local-signup", localOptions, (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.send({ user, info });

      req.logIn(user, err => {
        if (err) return next(err);

        return res.send({ user, info });
      });
    })(req, res, next);
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local-login", localOptions, (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.send({ user, info });

      req.logIn(user, err => {
        if (err) return next(err);

        return res.send({ user, info });
      });
    })(req, res, next);
  });
};
