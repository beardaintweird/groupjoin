var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://oauth.groupme.com/oauth/authorize?client_id=SeVuZqbwabdg3M9kBXklai4Af8nV7Wy4HCnkNC8CEH9AxicL');
});

module.exports = router;
