module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    var data = {
      title: "index",
      currentUser: req.user
    };

    res.json(data);
  });
};
