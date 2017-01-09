const knex = require('./knex');
const bcrypt = require('bcryptjs');

module.exports = {
    postNewJob: function(body) {
        console.log(body);
        return knex('location')
            .insert({
                name: body.name,
                address: body.address,
                lat: body.lat,
                long: body.long,
                phone_number: body.phone_number
            }, 'id')
            .then((fKey) => {
                let fkey_id = fKey[0];
                return knex('job')
                    .returning('id')
                    .insert({
                        date: body.date,
                        time: body.time,
                        rate: body.rate,
                        status: body.status,
                        start_time: body.start_time,
                        end_time: body.end_time,
                        location_id: fkey_id
                    }, '*')
                    .then((jobID) => {
                        console.log(jobID, typeof jobID.id, typeof body.userID);
                        return knex('user_job')
                            .insert({
                                requester_id: body.userID,
                                job_id: jobID[0].id
                            });
                    });
            });
    },

    postNewUser: function(body) {
        return knex("user")
            .insert({
                fname: body.firstname,
                lname: body.lastname,
                email: body.email,
                address: body.address,
                phone_number: body.phonenumber,
                username: body.username
            }, 'id')
            .then((newIDArray) => {
                var newID = newIDArray[0];
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(body.password, salt);
                console.log(hash);
                return knex('login')
                    .returning('id')
                    .insert({
                        user_id: newID,
                        password_hash: hash,
                        password_salt: salt
                    });
            });
    },
    comparePassword: function(body) {
        if (body.password === body.password2) {
            return true;
        } else {
            return false;
        }
    },
    getPassword: function(body) {
        return knex('user')
            .innerJoin('login', 'user.id', 'login.user_id')
            .where('user.email', body.email)
            .first()
            .then((data) => {
                if (data.length === 0) {
                    return false;
                } else {
                    if (bcrypt.compareSync(body.password, data.password_hash)) {
                        return data.id;
                    } else {
                        return false;
                    }
                }
            });
    },
    getPassword: function(body) {
        return knex('user')
            .innerJoin('login', 'user.id', 'login.user_id')
            .where('user.email', body.email)
            .first()
            .then((data) => {
                console.log(data, 'this');
                if (!data) {
                    return false
                } else if (data.length === 0) {
                    return false;
                } else {
                    if (bcrypt.compareSync(body.password, data.password_hash)) {
                        return data;
                    } else {
                        return false;
                    }
                }
            });
    },

    getAllJobs: function(id) {
        return knex('location')
            .innerJoin('job', 'location.id', 'job.location_id')
            .innerJoin('user_job', 'job.id', 'user_job.job_id')
            .where('job.status', 'Requested')
            .andWhereNot('user_job.requester_id', id)
    },
    getOneJob: function(id) {
        return knex('location')
            .innerJoin('job', 'location.id', 'job.location_id')
            .select()
            .where('job.id', id)
            .first()
    },
    getRequestsByUser: function(id) {
        return knex('user')
            // .innerJoin('user',)
            .innerJoin('user_job', 'user.id', 'user_job.requester_id')
            .innerJoin('job', 'user_job.id', 'job.id')
            .innerJoin('location', 'job.location_id', 'location.id')
            .where('user.id', id[0])
            .then((jobs) => {
                let promises = jobs.map((job) => {
                    if (job.waiter_id) {
                        // get waiter from database
                        return this.getOneUser(job.waiter_id).then((waiter) => {
                            job.waiter = waiter[0];
                        });
                    } else {
                        return Promise.resolve();
                    }
                });
                return Promise.all(promises).then(() => {
                    return jobs;
                });
            });
    },
    getJobsByUser: function(id) {
        return knex('user')
            // .innerJoin('user',)
            .innerJoin('user_job', 'user.id', 'user_job.waiter_id')
            .innerJoin('job', 'user_job.id', 'job.id')
            .innerJoin('location', 'job.location_id', 'location.id')
            .where('user.id', id[0])
            .then((jobs) => {
                let promises = jobs.map((job) => {
                    if (job.waiter_id) {
                        // get waiter from database
                        return this.getOneUser(job.requester_id).then((waiter) => {
                            job.waiter = waiter[0];
                        });
                    } else {
                        return Promise.resolve();
                    }
                });
                return Promise.all(promises).then(() => {
                    return jobs;
                });
            });
    },
    updateJob: function(body, id) {
        return knex('user_job')
            .returning('id')
            .update({
                waiter_id: id
            })
            .where('id', Number(body.id))
            .then((id) => {
                return knex('job')
                    .update({
                        status: 'Accepted'
                    })
                    .where('id', id[0])
            });
    },
    getOneUser: function(id) {
        return knex('user')
            .where('id', id);
    },
    deleteJob: function(id) {
        return knex('job')
            .innerJoin('user_job', 'job.id', 'user_job.id')
            .innerJoin('location', 'job.location_id', 'location.id')
            .where('job.id', id)
            .del();
    },
    updateStartTime: function(body) {
        return knex('job')
            .update({
                status: body.status,
                start_time: body.starting_time
            })
            .where('id', body.id);
    },
    updateEndTime: function(body) {
        return knex('job')
            .update({
                status: body.status,
                end_time: body.starting_time
            })
            .where('id', body.id);
    },
    getBothUsers: function(data) {
        return knex('user')
            .innerJoin('user_job', 'user.id', 'user_job.requester_id')
            .innerJoin('job', 'user_job.job_id', 'job.id')
            .where('user_job.job_id', data.id);
    }
};
