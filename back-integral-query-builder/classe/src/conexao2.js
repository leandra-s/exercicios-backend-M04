const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'exercicio_aula_1'
    }
});

module.exports = knex