var express = require('express');
var router = express.Router();
var queryFunctions = require('../db/queries');
var knex = require('knex');

router.post('/jobs/newjob', function(req, res) {
    queryFunctions.postNewJob(req.body)
        .then((all) => {
            res.json(all);
        });
});

router.post('/jobs', function(req, res) {
    let reqData = req.body;
    reqData.userID = req.signedCookies.userID[0];
    queryFunctions.postNewJob(req.body)
        .then((all) => {
            res.json(all);
        });
});

router.get('/jobs', function(req, res) {
    queryFunctions.getAllJobs(req.signedCookies.userID[0])
        .then((jobs) => {
            res.json(jobs);
        });
});

router.put('/jobs', function(req, res) {
    queryFunctions.updateJob(req.body, req.signedCookies.userID[0])
        .then((jobs) => {
            res.json(jobs);
        });
});

router.get('/jobs/:id', function(req, res) {
    queryFunctions.getOneJob(req.params.id)
        .then((job) => {
            res.json(job);
        });
});


module.exports = router;
