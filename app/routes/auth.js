var middleware = require("../middleware");

module.exports = function(app, passport) {
  var logoutRoute = app.route("/logout"),
    loginRoute = app.route("/login"),
    signupRoute = app.route("/signup"),
    connectLocalRoute = app.route("/connect/local"),
    unlinkLocalRoute = app.route("/unlink/local"),
    unlinkFacebookRoute = app.route("/unlink/facebook"),
    unlinkTwitterRoute = app.route("/unlink/twitter"),
    unlinkGoogleRoute = app.route("/unlink/google");

  logoutRoute.get(function(req, res) {
    res.send({
      message: "Success Logout"
    });
    req.logout();
    res.redirect("/");
  });

  loginRoute
    .get(function(req, res) {
      res.send({
        message: "login page"
      });
    })
    .post(
      passport.authenticate("local-login", {
        successRedirect: "/expense",
        failureRedirect: "/login",
        failureFlash: true
      })
    );

  // SIGNUP =================================
  signupRoute
    .get(function(req, res) {
      res.send({
        message: "signup page"
      });
    })
    .post(
      passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/signup",
        failureFlash: true
      })
    );
  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );

  // handle the callback after facebook has authenticated the user
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", { scope: "email" })
  );

  // handle the callback after twitter has authenticated the user
  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authenticated the user
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  connectLocalRoute
    .get(function(req, res) {
      res.send({
        message: req.flash("loginMessage")
      });
    })
    .post(
      passport.authenticate("local-signup", {
        successRedirect: "/", // redirect to the secure profile section
        failureRedirect: "/connect/local", // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
      })
    );

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get(
    "/connect/facebook",
    passport.authorize("facebook", { scope: ["public_profile", "email"] })
  );

  // handle the callback after facebook has authorized the user
  app.get(
    "/connect/facebook/callback",
    passport.authorize("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get(
    "/connect/twitter",
    passport.authorize("twitter", { scope: "email" })
  );

  // handle the callback after twitter has authorized the user
  app.get(
    "/connect/twitter/callback",
    passport.authorize("twitter", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // google ---------------------------------

  // send to google to do the authentication
  app.get(
    "/connect/google",
    passport.authorize("google", { scope: ["profile", "email"] })
  );

  // the callback after google has authorized the user
  app.get(
    "/connect/google/callback",
    passport.authorize("google", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  unlinkLocalRoute.get(middleware.isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect("/");
    });
  });

  // facebook -------------------------------
  unlinkFacebookRoute.get(middleware.isLoggedIn, function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });

  // twitter --------------------------------
  unlinkTwitterRoute.get(middleware.isLoggedIn, function(req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });

  // google ---------------------------------
  unlinkGoogleRoute.get(middleware.isLoggedIn, function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });
};
