const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'grupoServoces',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});

export default knex;