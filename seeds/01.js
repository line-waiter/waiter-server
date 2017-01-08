
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user_job"; ALTER SEQUENCE user_job_id_seq RESTART WITH 4')
  .then(function(){
    return knex.raw('DELETE FROM "job"; ALTER SEQUENCE job_id_seq RESTART WITH 4')
  })
  .then(function(){
    return knex.raw('DELETE FROM "location"; ALTER SEQUENCE location_id_seq RESTART WITH 4')
  })
  .then(function(){
    return knex.raw('DELETE FROM "login"; ALTER SEQUENCE login_id_seq RESTART WITH 3')
  })
  .then(function(){
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
  })

    .then(function(){
      const user = [{
        id:1,
        fname:'Dillon',
        lname:'Corkran',
        email:'guest@gmail.com',
        username:'dcorkran',
        phone_number:'2032197227',
        address: '1400 Little Raven Street',
        account_balance:50
      },{
        id:2,
        fname:'Aaron',
        lname:'Goodman',
        email:'gooooodman@gmail.com',
        username:'agoodman',
        phone_number:'7205619842',
        address: '900 Little Raven Street',
        account_balance:55
      }];
      return knex("user").insert(user);
    })
    .then(function(){
      const login = [{
        id:1,
        user_id:1,
        password_hash:'$2a$10$AY5NXbDznuIp1ohjDyGuY.Ll7AdiqQTOKDsu9RuepiN0BZ.HoG9zy',
        password_salt:'test'
      },{
        id:2,
        user_id:2,
        password_hash:'test',
        password_salt:'test'
      }];
      return knex('login').insert(login);
    })
    .then(function(){
      const location = [{
        id:1,
        name:'Galvanize',
        address:'1644 Platte St',
        lat:39.7576,
        long:105.0070,
        phone_number:1231231234
      },{
        id:2,
        name:'McDonalds',
        address:'6590 Wadsworth Blvd',
        lat:39.8576,
        long:109.2070,
        phone_number:4314314321
      },{
        id:3,
        name:'Test Place',
        address:'690 Madssworth Blvd',
        lat:39.8576,
        long:109.2070,
        phone_number:4324314321
      }];
      return knex('location').insert(location);
    })
    .then(function(){
      const job = [{
        id:1,
        date:'2016-12-28',
        time:'13:30:00',
        status:'Accepted',
        rate:12.00,
        start_time:'00:00:00',
        end_time:'00:00:00',
        location_id:1
      },{
        id:2,
        date:'2016-12-29',
        time:'13:45:00',
        status:'Accepted',
        rate:12.00,
        start_time:'00:00:00',
        end_time:'00:00:00',
        location_id:2
      },{
        id:3,
        date:'2016-12-29',
        time:'13:45:00',
        status:'Requested',
        rate:12.00,
        start_time:'00:00:00',
        end_time:'00:00:00',
        location_id:3
      }];
      return knex('job').insert(job);
    })
    .then(function(){
      const user_job = [{
        id:1,
        requester_id:1,
        waiter_id:2,
        job_id:1
      },{
        id:2,
        requester_id:2,
        waiter_id:1,
        job_id:2
      },{
        id:3,
        requester_id:2,
        waiter_id:null,
        job_id:3
      }];
      return knex('user_job').insert(user_job);
    });
};
