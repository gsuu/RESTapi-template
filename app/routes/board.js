var Sampledata = require("../models/sample");

module.exports = function(app, moment) {
  var listRoute = app.route("/board"), // 모든 항목 조회
    createRoute = app.route("/board/create"), // 등록
    resultByIdRoute = app.route("/board/:id"), // 특정 id 조회
    EditRoute = app.route("/board/:id/edit"); // 특정 id 수정

  listRoute.get(function(req, res) {
    Sampledata.find({}, function(err, allPost) {
      var data = {
        posts: allPost,
        currentUser: req.user
      };

      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  createRoute
    .get(function(req, res) {
      var data = {
        currentUser: req.user
      };
      res.json(data);
    })
    .post(function(req, res) {
      var newData = {
        subject: req.body.subject,
        writer: req.user
      };

      Sampledata.create(newData, function(err, post) {
        if (err) {
          res.send(err);
        } else {
          res.json(post);
          res.redirect("/board");
        }
      });
    });

  EditRoute.get(function(req, res) {
    Sampledata.findById(req.params.id, function(err, foundData) {
      if (err) {
        res.send(err);
      } else {
        res.json(foundData);
      }
    });
  });

  resultByIdRoute
    .put(function(req, res) {
      var newData = {
        subject: req.body.subject,
        writer: req.user
      };

      Sampledata.findByIdAndUpdate(req.params.id, newData, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/board");
        }
      });
    })
    .delete(function(req, res) {
      Sampledata.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/board");
        }
      });
    });
};
