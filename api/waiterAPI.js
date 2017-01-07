var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/job',function(req,res,next){
  console.log(req.signedCookies.userID,'yo');
  queries.getJobsByUser(req.signedCookies.userID[0])
  .then((data)=>{
    console.log(data,'yo');
    res.json(data);
  });
});



module.exports = router;
