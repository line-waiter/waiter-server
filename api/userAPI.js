var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.post('/',function(req,res,next){
  console.log(req.body);
  queries.getPassword(req.body)
  .then((data)=>{
    if (data) {
      res.cookie('userID',data,{signed:true});
      // console.log(res);
      res.json('test');
    }else {
      res.json('error');
    }
  });
});

router.get('/:id/job',function(req,res,next){
  queries.getJobsByUser(1)
  .then((data)=>{
    res.json(data);
  });
});

module.exports = router;
