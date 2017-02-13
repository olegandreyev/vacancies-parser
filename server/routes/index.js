const express = require('express');
const router = express.Router();
const vacancies = require('./vacancies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/vacancies', vacancies);

module.exports = router;
