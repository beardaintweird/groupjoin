const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');
const db      = require('../models');
const jwt       = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

router.post('/', jwtCheck({secret: process.env.JWT_SECRET}),(req,res) => {
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
      res.json(result);
    })
    .catch((err) => {
      console.log('error in find or create',err);
      res.status(500).json(err);
    })
  }
})

module.exports = router;
