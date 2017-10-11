const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');
const db      = require('../models');

let token = '';

/* GET users listing. */
router.get('/', function(req, res, next) {
  token = req['_parsedOriginalUrl'].query.match(/access_token=[\d|\w]+/gi)[0].substr(13);
  res.render('index', {title: 'groupjoin', token: token});
});

router.post('/', (req,res) => {
  let option = {
    uri: `https://api.groupme.com/v3/groups/13814179/messages?token=${token}&limit=100&before_id=150630823216303233`,
    json: true
  }
  rp(option)
  .then((data) => {
    //
    // for(let group in data.response){
    //   console.log('data.response[group].messages', data.response[group].messages)
    //   console.log('group: ',group);
    // }
    res.json(data)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;
