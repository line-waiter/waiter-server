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

// router.get('/job/:id',function(req,res,next){
//
// });

module.exports = router;
