var express = require('express');
var router = express.Router();
var queries = require('../db/queries');


router.get('/', function(req, res, next) {
  console.log(req.body);
  queries.getJob()
  .then((job)=>{
    console.log(job);
  });
  res.render('index', { title: 'Express' });
});


module.exports = router;
