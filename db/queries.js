const knex = require('./knex');
const bcrypt = require('bcryptjs');

module.exports = {
    postNewJob: function(body) {
        return knex('location')
            .insert({
                name: body.name,
                address: body.address,
                lat: body.lat,
                long: body.long
            }, 'id')
            .then((fKey) => {
                let fkey_id = fKey[0];
                return knex('job')
                    .insert({
                        date: body.date,
                        time: body.time,
                        rate: body.rate,
                        status: body.status,
                        start_time: body.start_time,
                        end_time: body.end_time,
                        location_id: fkey_id
                    }, '*')
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
                return knex('login')
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
          }else{
            return false;
          }
  },
  getPassword: function(body){
    return knex('user')
    .innerJoin('login', 'user.id', 'login.user_id')
    .where('user.email',body.email)
    .first()
    .then((data)=>{
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

    getAllJobs: function() {
        return knex('location')
            .innerJoin('job', 'location.id', 'job.location_id')
            .select()
    },
    getOneJob: function(id) {
        return knex('location')
            .innerJoin('job', 'location.id', 'job.location_id')
            .select()
            .where('job.id', id)
            .first()
    },
    getJobsByUser: function(id){
      return knex('user')
      .innerJoin('user_job','user.id','user_job.requester_id')
      .innerJoin('job','user_job.id','job.id')
      .innerJoin('location','job.location_id','location.id')
      .where('user.id',id)
    }
};
