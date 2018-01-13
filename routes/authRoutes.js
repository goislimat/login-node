const passport = require("passport");

module.exports = app => {
  // Route called when the user tries to authenticate
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Route called when the user is redirected
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
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
    // console.log(req);
    res.send(req.user);
  });
};
