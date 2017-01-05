var express = require('express');
var router = express.Router();
var queries = require('../db/queries');


router.get('/', function(req, res, next) {
  queries.getJob()
  .then((job)=>{
  res.json(job);
  });

});


module.exports = router;
