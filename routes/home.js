const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');

let token = '7b44b74081cb013563c1017d38f64052';

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req['_parsedOriginalUrl'].query);
  res.render('index', {title: 'groupjoin'});
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
