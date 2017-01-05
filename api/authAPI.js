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

/*This is the sign up route*/

router.post('/new', function(req, res, next) {
  console.log('server');
  if(queries.comparePassword(req.body)){
    queries.postNewUser(req.body);
    res.status(200);
    res.json('done on server!');
  }else{
    res.status(400);
    console.log("passwords don't match");
    res.json(`passwords don't match`);
  }
});

module.exports = router;