var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/job', function(req, res, next) {
    queries.getJobsByUser(req.signedCookies.userID[0])
        .then((data) => {
            res.json(data);
        });
});

router.put('/jobs', function(req, res, next) {
    // var status = req.body.status;
    // var starTime = req.body.starting_time;
    if (req.body.status === 'Waiting') {
        queries.updateStartTime(req.body)
            .then(() => {
                res.json('Job Updated');
            });
    } else {
        queries.updateEndTime(req.body)
            .then(() => {
                res.json('Job Updated');
            });
    }
});


module.exports = router;
