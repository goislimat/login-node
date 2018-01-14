const passport = require("passport");

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

  app.post("/api/signup", passport.authenticate("local-signup"), (req, res) => {
    res.send(req.user);
  });

  app.post("/api/login", passport.authenticate("local-login"), (req, res) => {
    res.send(req.user);
  });
};
