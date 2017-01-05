const knex = require('./knex');
const bcrypt = require('bcryptjs');

module.exports = {
  postNewUser: function(body){
    return knex("user")
    .insert({
      fname:body.firstname,
      lname:body.lastname,
      email:body.email,
      address:body.address,
      phone_number: body.phonenumber,
      username:body.username
    },'id')
    .then((newIDArray)=>{
      var newID = newIDArray[0];
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(body.password, salt);
      return knex('login')
      .insert({
        user_id:newID,
        password_hash:hash,
        password_salt:salt
      });
    });
  },
  comparePassword: function(body){
    if(body.password === body.password2){
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
  getJob: function(){
    return knex('job');
  }
};
