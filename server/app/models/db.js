const { Client } = require('pg');

// Configurações da conexão
const client = new Client({
  user: 'paulo',
  host: 'localhost',
  database: 'postgres',
  password: '3006paulo',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro ao conectar ao banco de dados', err));

module.exports = client;
