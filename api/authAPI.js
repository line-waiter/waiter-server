var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.post('/',function(req,res,next){
  queries.getPassword(req.body)
  .then((data)=>{
    if (data) {
      res.cookie('userID',data.id,{signed:true});
      res.cookie('userName',data.fname);
      // console.log(res);
      res.json('test');
    }else {
      // res.status(404);
      res.json('Incorrect email or password');
    }
  });
});

/*This is the sign up route*/

router.post('/new', function(req, res, next) {
  console.log('server');
  if(queries.comparePassword(req.body)){
    queries.postNewUser(req.body)
    .then((data)=>{
      res.cookie('userID',data,{signed:true});
      res.status(200);
      res.json('done on server!');
    });

  }else{
    res.status(400);
    console.log("passwords don't match");
    res.json(`passwords don't match`);
  }
});

router.get('/logout',function(req,res,next){
  res.clearCookie('userID');
  res.clearCookie('userName');
  res.json('Cookies Cleared');
});

module.exports = router;
