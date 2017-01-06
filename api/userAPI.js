var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/job',function(req,res,next){
  queries.getJobsByUser(req.signedCookies.userID)
  .then((data)=>{
    res.json(data);
  });
});



module.exports = router;
