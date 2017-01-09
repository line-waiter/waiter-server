var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/request', function(req, res, next) {
    queries.getRequestsByUser(req.signedCookies.userID)
        .then((data) => {
            console.log(data);
            res.json(data);
        });
});

router.get('/job', function(req, res, next) {
    queries.getJobsByUser(req.signedCookies.userID)
        .then((data) => {
            console.log(data);
            res.json(data);
        });
});

router.delete('/job', function(req, res, next) {
    queries.deleteJob(req.body.id)
        .then(() => {
            res.json('Job Deleted');
        });
});

router.get('/', function(req, res, next) {
    queries.getOneUser(req.signedCookies.userID[0])
        .then((data) => {
            res.json(data);
        });
});



module.exports = router;
