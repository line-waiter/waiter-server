var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/:id/job',function(req,res,next){
  queries.getJobsByUser(1)
  .then((data)=>{
    res.json(data);
  });
});



module.exports = router;
