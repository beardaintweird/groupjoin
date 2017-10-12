var express = require('express');
var router = express.Router();
const db      = require('../models');
const jwt       = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://oauth.groupme.com/oauth/authorize?client_id=SeVuZqbwabdg3M9kBXklai4Af8nV7Wy4HCnkNC8CEH9AxicL');
});

router.get('/users', (req,res) => {
  db.user.findAll({
    include: [{
      model: db.group
    }]
  })
  .then((usersWithGroups) => {
    res.json(usersWithGroups)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
})

router.post('/user', (req,res) => {
  token = req.headers.referer.match(/access_token=[\d|\w]+/gi)[0].substr(13);
  req.body.phone_number = Number(req.body.phone_number.match(/\d+$/gi)[0]);
  db.user.findOrCreate({
    where: {
      id: req.body.id
    },
    defaults: {
      id: req.body.id,
      name: req.body.name,
      phone_number: req.body.phone_number,
      image_url: req.body.image_url
    }
  }).then((result) => {
    if(result[1]){
      let finalJWT = signJWT(result[0]);
      res.status(200).json({
        user: result[0],
        jwt: finalJWT
      });
    } else {
      let finalJWT = signJWT(result[0].dataValues);
      console.log(result[0].dataValues)
      res.status(200).json({
        user: result[0].dataValues,
        jwt: finalJWT
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
})
function signJWT(userInfo){
  let newJwt =
    jwt.sign({
      data: {
        token: token,
        name: userInfo.name,
        id: userInfo.id
      }
    }, 'thequickbrownfoxjumpsoverthelazydog', { expiresIn: '24h' });
  return newJwt;
}
module.exports = router;
