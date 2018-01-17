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
  res.render('organ', {title: 'Pi Organ', songs: settings.songs});
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
var currentIP = '';
/* GET PI GLOVE DATA */
router.get('/glove', function(req, res, next) {
  res.send(currentIP);
});
router.post('/glove', function(req, res, next) {
  console.log(req.query);
  if (req.query.newIP) {
    currentIP = req.query.newIP;
    res.send('success');
  } else {
    res.send('failed');
  }
});


module.exports = router;
