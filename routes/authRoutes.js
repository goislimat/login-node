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
  app.get("/auth/google/callback", passport.authenticate("google"));
};
