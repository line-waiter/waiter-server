var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.post('/',function(req,res,next){
  console.log(req.body);
  queries.getPassword(req.body)
  .then((data)=>{
    if (data) {
      res.cookie('userID',data,{signed:true});
      res.json('test')
    }else {
      res.json('error');
    }
  });
});

module.exports = router;
