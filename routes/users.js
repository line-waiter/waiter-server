var express = require('express');
var router = express.Router();
var queryFunctions = require('../db/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  if(queryFunctions.comparePassword(req.body)){
    queryFunctions.postNewUser(req.body);
    res.json('done on server!');
  }else{
    console.log("passwords don't match");
    res.json(`passwords don't match`);
  }
});
module.exports = router;
