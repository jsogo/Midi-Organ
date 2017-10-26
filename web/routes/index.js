var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '205 Directory' });
});

router.get('/terminal', function(req, res, next) {
  res.render('terminal', {title: 'Terminal'});
});

router.get('/organ', function(req, res, next) {
  res.render('organ', {title: 'Pi Organ'});
});

router.get('/links', function(req, res, next) {
  res.render('links', {title:"Awesome Links"});
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: "About Us" });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: "Contact Us" });
});



module.exports = router;
