var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.post('/',function(req,res,next){
  console.log(req.body);
  queries.getPassword(req.body)
  .then((data)=>{
    if (data) {
      var mine = res.cookie('userID',data,{signed:true});
      console.log(mine);
      res.json('test')
    }else {
      res.json('error');
    }
  });
});

router.get('/set',function(req,res,next){
  console.log('getting');
  req.session.user = { userID:'Dillon', value:11 };
  console.log(req.session);
  var result = JSON.stringify(req.session);
  res.render('index', { title: 'Sessions', result: result });
});
module.exports = router;
