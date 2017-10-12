const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');
const db      = require('../models');
const jwt       = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

router.post('/', jwtCheck({secret: process.env.JWT_SECRET}),(req,res) => {
  console.log('req users',req.user.data);
  for(let i = 0, x = req.body.length; i < x; i++){
    let group = req.body[i];
    db.group.findOrCreate(
      {
        where: {
          id: group.id
        },
        defaults: {
          id: group.id,
          name: group.name,
          type: group.type,
          description: group.description,
          image_url: group.image_url
        }
    })
    .then((result) => {
      console.log('group find or create result',result[0].dataValues);
      return db.user_group.findOrCreate({
        where: {
          userId: req.user.data.id,
          groupId: result[0].dataValues.id
        },
        defaults: {
          userId: req.user.data.id,
          groupId: result[0].dataValues.id
        }
      })
    })
    .then((joinResult) => {
      console.log('userGroup find or create result',joinResult);
    })
    .catch((err) => {
      console.log('error in find or create',err);
      res.status(500).json(err);
    })
  }
  res.send('post received and everything went well :D')
})


module.exports = router;
