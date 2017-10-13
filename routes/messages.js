const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');
const db      = require('../models');
const analyze = require('../analytics');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('messages get');
});

// write the unsaved messages to the database
router.post('/saveMessages', (req,res) => {
  console.log('req.body',req.body[0].id);
  db.message.findAll({
    where: {
      id: req.body[0].id
    },
    attributes: ['id']
    })
  .then((message) => {
    // nothing found = []
    // something found = array with 1 element [dataValues]
    console.log('message after find by id',message);
    if(!message.length){
      return   db.message.bulkCreate(req.body)
    } else {
      res.json(message);
    }
  })
  .then((results) => {
    res.json('post successful');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
})

router.get('/words/:group_id', (req,res) => {
  db.message.findAll({
    where:
    {
      group_id: req.params.group_id
    },
    attributes: ['text']
  })
    .then((words) => {
      words = words.map((word) => {
        return word = word.dataValues.text;
      })
      words = words.filter((word) => {
        return word;
      })
      let wordsCount = analyze.frequencyOfTerms(words);
      // console.log(wordsCount);
      let topWords = [];
      for(let word in wordsCount){
        // minimum amount of occurences for each word to be included
        if(wordsCount.hasOwnProperty(word) && wordsCount[word] > 10){
          let obj = {
            [word]: wordsCount[word]
          }
          topWords.push(obj);
        }
      }
      topWords.sort((a,b) => {
        let num1 = null;
        let num2 = null;
        for(let word in a){
          if(a.hasOwnProperty(word)){
            num1 = a[word];
          }
        }
        for(let word in b){
          if(b.hasOwnProperty(word)){
            num2 = b[word];
          }
        }
        return num2 - num1
      });
      res.json(topWords);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/members/:group_id', (req,res) => {
  db.message.findAll({
    where: {
      group_id: req.params.group_id
    },
    attributes: ['name']
  })
    .then((members) => {
      members = members.map((member) => {
        return member = member.dataValues.name;
      })
      let messagesByMembers = analyze.messagesByMembers(members);
      let messageCount = [];
      for(let member in messagesByMembers){
        if(messagesByMembers.hasOwnProperty(member)){
          let obj = {
            [member]: messagesByMembers[member]
          }
          messageCount.push(obj);
        }
      }
      messageCount.sort((a,b) => {
        let num1 = null;
        let num2 = null;
        for(let member in a){
          if(a.hasOwnProperty(member)){
            num1 = a[member];
          }
        }
        for(let member in b){
          if(b.hasOwnProperty(member)){
            num2 = b[member];
          }
        }
        return num2 - num1
      })
      res.json(messageCount);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/mostLiked/:group_id', (req,res) => {
  db.message.findAll({
    where: {
      group_id: req.params.group_id
    },
    attributes:['name','favorites']
  })
    .then((messagesWithLikes) => {
      messagesWithLikes = analyze.mostLikedMessages(messagesWithLikes);
      let likesCount = [];
      for(let member in messagesWithLikes){
        if(messagesWithLikes.hasOwnProperty(member)){
          let obj = {
            [member]: messagesWithLikes[member]
          }
          likesCount.push(obj);
        }
      }
      likesCount.sort((a,b) => {
        let num1 = null;
        let num2 = null;
        for(let member in a){
          if(a.hasOwnProperty(member)){
            num1 = a[member];
          }
        }
        for(let member in b){
          if(b.hasOwnProperty(member)){
            num2 = b[member];
          }
        }
        return num2 - num1
      })
      res.json(likesCount);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/mostLikesGiven/:group_id', (req,res) => {
  let arrayUserIds = [];
  db.message.aggregate('user_id', 'DISTINCT', { plain: false })
    .then((userIds) => {
      arrayUserIds = userIds;
      return db.message.findAll({
        where: {
          group_id: req.params.group_id
        },
        attributes:['name','user_id','favorited_by']
      })
    })
    .then((messagesWithWhoLiked) => {
      messagesWithWhoLiked = analyze.mostGenerous(messagesWithWhoLiked,arrayUserIds);
      generosityList = [];
      for(let member in messagesWithWhoLiked){
        if(messagesWithWhoLiked.hasOwnProperty(member)){
          let obj = {
            [member]: messagesWithWhoLiked[member]
          }
          generosityList.push(obj);
        }
      }
      generosityList.sort((a,b) => {
        let num1 = null;
        let num2 = null;
        for(let member in a){
          if(a.hasOwnProperty(member)){
            num1 = a[member];
          }
        }
        for(let member in b){
          if(b.hasOwnProperty(member)){
            num2 = b[member];
          }
        }
        return num2 - num1
      })
      res.json(generosityList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })

})
module.exports = router;
