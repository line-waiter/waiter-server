var express = require('express');
var router = express.Router();
var queryFunctions = require('../db/queries');
var knex = require('../db/knex')

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
