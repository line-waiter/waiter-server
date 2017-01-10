var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
    queries.getJob()
        .then((job) => {
            res.json(job);
        });
});

router.get('/jobs', function(req, res) {
    knex('location').innerJoin('job', 'location.id', 'job.location_id')
        .select()
        .first()
        .then((result) => {
            res.json(result);
        });
});


module.exports = router;
