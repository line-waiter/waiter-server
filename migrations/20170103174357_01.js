exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("user",function(table){
      table.increments();
      table.string('fname').notNullable();
      table.string('lname').notNullable();
      table.string('email').unique().notNullable();
      table.string('username').notNullable();
      table.string('phone_number').notNullable();
      table.string('address').notNullable();
      table.float('account_balance').defaultTo(0);
    }),
    knex.schema.createTable('login', function(table){
      table.increments();
      table.integer('user_id').references("user.id").unsigned().onDelete('CASCADE');
      table.string('password_hash').notNullable();
      table.string('password_salt').notNullable();
    }),
    knex.schema.createTable('location',function(table){
      table.increments();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('lat');
      table.string('long');
    }),
    knex.schema.createTable('job',function(table){
      table.increments();
      table.date('date').notNullable();
      table.time('time').notNullable();
      table.string('status').notNullable();
      table.float('rate').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.integer('location_id').references('location.id').unsigned().onDelete('CASCADE');
    }),
    knex.schema.createTable('user_job',function(table){
      table.increments();
      table.integer('requester_id').references("user.id").unsigned().onDelete('CASCADE');
      table.integer('waiter_id').references("user.id").unsigned().onDelete('CASCADE');
      table.integer('job_id').references('job.id').unsigned().onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_job'),
    knex.schema.dropTable('job'),
    knex.schema.dropTable('location'),
    knex.schema.dropTable('login'),
    knex.schema.dropTable("user")
  ]);
};
