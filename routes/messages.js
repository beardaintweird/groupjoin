const express = require('express');
const router  = express.Router();
const rp      = require('request-promise');
const db      = require('../models');
const analyze = require('../analytics');

let token = '7b44b74081cb013563c1017d38f64052';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('messages get');
});

//
router.post('/all', (req,res) => {
  db.message.bulkCreate(req.body)
    .then((results) => {
      res.send('post successful');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
})

router.get('/words', (req,res) => {
  db.message.findAll({attributes: ['text']})
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
        if(wordsCount.hasOwnProperty(word) && wordsCount[word] > 100){
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
      res.render('count', { topWords });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/members', (req,res) => {
  db.message.findAll({attributes: ['name']})
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
      res.render('messagesByMembers', {messageCount});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/mostLiked', (req,res) => {
  db.message.findAll({attributes:['name','favorites']})
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
      res.render('mostLiked',{likesCount});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
})

router.get('/mostLikesGiven', (req,res) => {
  let arrayUserIds = [];
  db.message.aggregate('user_id', 'DISTINCT', { plain: false })
    .then((userIds) => {
      arrayUserIds = userIds;
      return db.message.findAll({attributes:['name','user_id','favorited_by']})
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
      res.render('generosity', {generosityList});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })

})
module.exports = router;
