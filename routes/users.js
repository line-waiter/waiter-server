var express = require('express');
var router = express.Router();
var queryFunctions = require('../db/queries');

/* GET users listing. */
router.get('/jobs', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('job')
});

router.post('/jobs/newjob',function(req,res){
  console.log(req.body);
  queryFunctions.postNewJob(req.body)
  .then((all)=>{
    res.json(all)
  });
});

router.post('/', function(req, res, next) {
  if(queryFunctions.comparePassword(req.body)){
    queryFunctions.postNewUser(req.body);
    res.status(200);
    res.json('done on server!');
  }else{
    res.status(400);
    console.log("passwords don't match");
    res.json(`passwords don't match`);
  }
});
module.exports = router;
