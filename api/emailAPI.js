var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var knex = require('../db/knex');
var nodemailer = require('nodemailer');

router.post('/', handleSayHello);


function handleSayHello(req, res) {
    queries.getBothUsers(req.body)
        .then((data) => {
            console.log(data, 'dicess', data[0].email);



            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'oglinewaiter@gmail.com',
                    pass: process.env.EMAIL_PASS
                }
            });
            var text = `Your request has been updated to ${data[0].status}! Please check your Line-Waiter account to see the Update`;
            var mailOptions = {
                from: 'oglinewaiter@gmail.com', // sender address
                to: data[0].email, // list of receivers
                subject: 'Line-Waiter Update', // Subject line
                text: text

            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        error: error
                    });
                } else {
                    console.log('Message sent: ' + info.response);
                    res.json({
                        yo: info.response
                    });
                }
            });
        });
}

module.exports = router;
