var express = require('express');
var router = express.Router();
var queryFunctions = require('../db/queries');
<<<<<<< HEAD
var knex = require('knex');

/* GET users listing. */
router.get('/jobs', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('job')
});

// router.get('/jobs',function(req,res){
//  knex('location').innerJoin('job','location.id','job.location_id')
//  .select()
//  .first()
//  .then((result)=>{
//    res.json(result)
//  })
// })

router.post('/jobs/newjob',function(req,res){
  console.log(req.body);
  queryFunctions.postNewJob(req.body)
  .then((all)=>{
    res.json(all)
  });
});
=======
var knex = require('../db/knex')

/*This is the sign up route*/
>>>>>>> aa9a87459c1ef6f58499866cb384758745db4086

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

/*This route posts new jobs to the data base*/

router.post('/jobs',function(req,res){
  queryFunctions.postNewJob(req.body)
  .then((all)=>{
    res.json(all)
  });
});


/*This route gets all the jobs from the location and the jobs tables*/

router.get('/jobs',function(req,res){
    queryFunctions.getAllJobs()
    .then((jobs)=>{
    res.json(jobs)
  })
})

/*This route gets one job*/

router.get('/jobs/:id',function(req,res){
  queryFunctions.getOneJob(req.params.id)
  .then((job)=>{
    res.json(job)
  })
})

/*some nifty stuff :-P*/
// router.get('/jobs/newjob/:id',function(req,res){
//   knex('location').select().where('id',req.params.id).then((result)=>{
//     knex('job').select().where('location_id',result[0].id).then((result2)=>{
//       //res.json(result2)
//       res.json([result,result2])
//     })
//   })
// })


module.exports = router;
