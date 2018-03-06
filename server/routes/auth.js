var express = require("express")
  , router = express.Router();

var auth = require('../modules/authentication');

router.post("/login", function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    auth.isAuthenticated(username, password, res);
});

module.exports = router;
