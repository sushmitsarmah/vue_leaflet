var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'api routes'});
});

module.exports = router;
