const express = require('express');
const router = express.Router();
const settings = require("../settings");

const player = require('../controllers/player');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '205 Directory' });
});

/* GET terminal page. */
router.get('/terminal', function(req, res, next) {
  res.render('terminal', {title: 'Terminal'});
});

/* GET organ page. */
router.get('/organ', function(req, res, next) {
  res.render('organ', {title: 'Pi Organ'});
});

/* GET queue data */
router.get('/organ/queue', function(req,res, next) {
  var Queue = player.getQueue();
  var Current = player.getCurrent();
  res.send({ message: "Success", queue: Queue, current: Current });
});
/* POST api requests for the server. */
router.post('/organ/add',function(req, res, next) {
  //get the song request from the req.body
  var songName = req.body.songName;
  if (settings.songs[songName]) {
    player.add(songName);
    res.send({ message: "Success", queue: player.getQueue(), current: player.getCurrent() });
  } else {
    res.send({ message: "Invalid Name", queue: player.getQueue(), current: player.getCurrent() }); 
  }
});
router.post('/organ/remove', function (req, res, next) {
  var songIndex = req.body.songIndex;
  if (songIndex >= 0 && songIndex < player.queueLength()) {
    player.add(songIndex);
    res.send({ message: "Success", queue: player.getQueue(), current: player.getCurrent() }); 
  } else {
    res.send({ message: "Invalid Index", queue: player.getQueue(), current: player.getCurrent() });
  }
});
router.post('/organ/restart', function (req, res, next) {
  player.restart();
  res.send({ message: "Success", queue: player.getQueue(), current: player.getCurrent() });
});
router.post('/organ/skip', function (req, res, next) {
  player.skip();
  res.send({ message: "Success", queue: player.getQueue(), current: player.getCurrent() });
});
/* GET links page. */
router.get('/links', function(req, res, next) {
  res.render('links', {title:"Awesome Links"});
});
/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: "About Us" });
});
/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: "Contact Us" });
});



module.exports = router;
