const pg = require('pg');
const postgresUrl = 'postgres://localhost/dealers_choice';
const client = new pg.Client(postgresUrl);

client.connect();
module.exports = client;